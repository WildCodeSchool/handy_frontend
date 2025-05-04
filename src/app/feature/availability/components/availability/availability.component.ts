import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent implements OnInit {
  availability: any;

  constructor(private _availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this._availabilityService.getMyAvailability().subscribe({
      next: (data) => this.availability = data,
      error: (err) => console.error('Erreur:', err)
    });
  }
}
