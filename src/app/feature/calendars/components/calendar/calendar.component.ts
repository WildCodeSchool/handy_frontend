import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService } from '../../../availability/services/availability.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityComponent } from '../../../availability/components/availability/availability.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private readonly _availabilityService = inject(AvailabilityService);
  private readonly _toastr = inject(ToastrService);
  private readonly _destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //   const savedDismissed = localStorage.getItem('dismissedToastIds');
  //   if (savedDismissed) {
  //     const ids = JSON.parse(savedDismissed);
  //     this.dismissedToastIds = new Set<number>(ids);
  //     this._availabilityService.setDismissedToastIds(ids);
  //   }

  //   this._availabilityService.getCalendarOptions().subscribe(options => {
  //     this.calendarOptions = options;
  //     this._toastr.info('Calendrier chargé.', 'Info');
  //   });

  //   this._availabilityService.toastMessages$.subscribe(messages => {
  //     this.toastMessages = messages.filter(toast => !this.dismissedToastIds.has(toast.id));
  //   });
  // }
  ngOnInit(): void {
    this._loadDismissedToastIds();
    this._fetchCalendarOptions();
    this._loadToastMessages();
  }

  private _loadDismissedToastIds(): void {
    const savedDismissed = localStorage.getItem('dismissedToastIds');
    if (savedDismissed) {
      const ids = JSON.parse(savedDismissed);
      this.dismissedToastIds = new Set<number>(ids);
      this._availabilityService.setDismissedToastIds(ids);
    }
  }

  private _fetchCalendarOptions(): void {
    this._availabilityService
      .getCalendarOptions()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(options => {
        this.calendarOptions = options;
      });
  }

  private _loadToastMessages(): void {
    this._availabilityService.toastMessages$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(messages => {
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
