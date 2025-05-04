import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService } from '../availability/services/availability.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'


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
      right: 'dayGridMonth,dayGridWeek'
    },
    plugins: [dayGridPlugin, interactionPlugin],
    
  };

  constructor(private _availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this._availabilityService.getMyAvailability().subscribe({
      next: (data) => {
        this.calendarOptions.events = [{
          title: data.userEmail,
          start: data.startTime,
          end: data.endTime
        }];
      },
      error: (err) => console.error('Erreur chargement disponibilité', err)
    });
  }
}
