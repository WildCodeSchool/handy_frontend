import { Component } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendars/components/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';

@Component({
  selector: 'app-provider-home',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent],
  templateUrl: './provider-home.component.html',
  styleUrl: './provider-home.component.scss',
})
export class ProviderHomeComponent {}
