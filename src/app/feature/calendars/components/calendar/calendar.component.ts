import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService } from '../../../availability/services/availability.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityComponent } from '../../../availability/components/availability/availability.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule, AvailabilityComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    plugins: [dayGridPlugin, interactionPlugin],
  };
  newBookedCount: number = 0;
  bookedIdsSeen: Set<number> = new Set<number>();
  toastMessages: { id: number; message: string; type: 'info' | 'success' | 'error' }[] = [];
  // toastMessages: { id: number; message: string; type: string }[] = [];

  dismissedToastIds: Set<number> = new Set<number>();

  constructor(private _availabilityService: AvailabilityService, private _toastr: ToastrService) {}
  
  ngOnInit(): void {
    const savedDismissed = localStorage.getItem('dismissedToastIds');
    if (savedDismissed) {
      const ids = JSON.parse(savedDismissed);
      this.dismissedToastIds = new Set<number>(ids); 
      this._availabilityService.setDismissedToastIds(ids); 
    }
  
    this._availabilityService.getCalendarOptions().subscribe(options => {
      this.calendarOptions = options;
    });
  
    this._availabilityService.toastMessages$.subscribe(messages => {
      this.toastMessages = messages.filter(toast => !this.dismissedToastIds.has(toast.id));
    });
  }

  removeToast(index: number): void {
    const dismissedToast = this.toastMessages[index];
    if (dismissedToast?.id !== undefined) {
      this.dismissedToastIds.add(dismissedToast.id);
      localStorage.setItem('dismissedToastIds', JSON.stringify([...this.dismissedToastIds]));
    }
    this.toastMessages.splice(index, 1);
  }
  getVisibleToasts(): { id: number; message: string; type: 'info' | 'success' | 'error' }[] {
    return this.toastMessages.filter(toast => !this.dismissedToastIds.has(toast.id));
  }
}
