import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService } from '../availability/services/availability.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityComponent } from '../availability/components/availability/availability.component';

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

  dismissedToastIds: Set<number> = new Set<number>();

  constructor(
    private _availabilityService: AvailabilityService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const savedDismissed = localStorage.getItem('dismissedToastIds');
    if (savedDismissed) {
      this.dismissedToastIds = new Set<number>(JSON.parse(savedDismissed));
    }
    this.checkBookedSlots();
  }
  checkBookedSlots(): void {
    this._availabilityService.getMyAvailability().subscribe({
      next: data => {
        const availableSlots = Array.isArray(data) ? data.filter(a => a.status === 'available') : [];
        const bookedSlots = Array.isArray(data) ? data.filter(a => a.status === 'booked') : [];

        bookedSlots.forEach(slot => {
          if (slot.id !== undefined && !this.bookedIdsSeen.has(slot.id) && !this.dismissedToastIds.has(slot.id)) {
            this.bookedIdsSeen.add(slot.id);

            const message = `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`;
            this.toastMessages.push({ id: slot.id, message, type: 'info' });
          }
        });
        this.calendarOptions.events = [
          ...bookedSlots.map(a => ({
            title: `Réservé par: ${a.bookedByEmail}`,
            start: a.startTime,
            end: a.endTime,
            color: 'red',
          })),
          ...availableSlots.map(a => ({
            title: 'Disponible',
            start: a.startTime,
            end: a.endTime,
            color: 'green',
          })),
        ];
      },
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
