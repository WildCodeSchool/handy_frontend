import { Component } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';

@Component({
  selector: 'app-provider-profil',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent],
  templateUrl: './provider-profil.component.html',
  styleUrl: './provider-profil.component.scss',
})
export class ProviderProfilComponent {}
