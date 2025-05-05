import { Component } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendar/calendar.component';

@Component({
  selector: 'app-provider-home',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './provider-home.component.html',
  styleUrl: './provider-home.component.scss',
})
export class ProviderHomeComponent {}
