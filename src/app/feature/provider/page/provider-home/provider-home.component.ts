import { Component } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendars/components/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';
import { ProviderProfilComponent } from '../../components/provider-profil/provider-profil.component';
import { AvailabilityComponent } from 'src/app/feature/availability/components/availability/availability.component';

@Component({
  selector: 'app-provider-home',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent, ProviderProfilComponent, AvailabilityComponent],
  templateUrl: './provider-home.component.html',
  styleUrl: './provider-home.component.scss',
})
export class ProviderHomeComponent {}
