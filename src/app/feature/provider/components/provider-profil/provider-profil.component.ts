import { Component } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendars/components/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-profil',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent, CommonModule, FormsModule],
  templateUrl: './provider-profil.component.html',
  styleUrl: './provider-profil.component.scss',
})
export class ProviderProfilComponent  {

  
}