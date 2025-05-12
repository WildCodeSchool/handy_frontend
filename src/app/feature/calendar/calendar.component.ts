import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService } from '../availability/services/availability.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule],
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
  toastMessages: { message: string; type: 'info' | 'success' | 'error' }[] = [];


  constructor(private _availabilityService: AvailabilityService, private _toastr: ToastrService) {}
ngOnInit(): void {
  this.checkBookedSlots();
}

checkBookedSlots(): void {
  this._availabilityService.getMyAvailability().subscribe({
    next: data => {
      const availableSlots = Array.isArray(data) ? data.filter(a => a.status === 'available') : [];
      const bookedSlots = Array.isArray(data) ? data.filter(a => a.status === 'booked') : [];

      // bookedSlots.forEach(slot => {
      //   if (slot.id !== undefined && !this.bookedIdsSeen.has(slot.id)) {
      //     this.bookedIdsSeen.add(slot.id);
      //     this._toastr.info(
      //       `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`,
      //       '📅 Nouvelle réservation'
      //     );
      //   }
      // });
      bookedSlots.forEach(slot => {
        if (slot.id !== undefined && !this.bookedIdsSeen.has(slot.id)) {
          this.bookedIdsSeen.add(slot.id);
      
          const message = `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`;
      
          this.toastMessages.push({ message, type: 'info' });
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
      }))
    ];
  }
  });
}
removeToast(index: number): void {
  this.toastMessages.splice(index, 1);
}
}