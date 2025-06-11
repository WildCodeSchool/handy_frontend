import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
})
export class AvailabilityComponent implements OnInit {
  availability: any;
  newStartTime: string = '';
  newEndTime: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(private _availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this._availabilityService.getMyAvailability().subscribe({
      next: data => (this.availability = data),
    });
  }

  createAvailability(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const newStart = new Date(this.newStartTime).getTime();
    const newEnd = new Date(this.newEndTime).getTime();

    const isTaken = this.availability?.some((slot: any) => {
      const slotStart = new Date(slot.startTime).getTime();
      const slotEnd = new Date(slot.endTime).getTime();

      return (
        (newStart >= slotStart && newStart < slotEnd) || (newEnd > slotStart && newEnd <= slotEnd) || (newStart <= slotStart && newEnd >= slotEnd)
      );
    });

    if (isTaken) {
      this.errorMessage = 'Cette plage de disponibilité existe déjà.';
      return;
    }
    this._availabilityService
      .createMyAvailability(this.newStartTime, this.newEndTime)
      .pipe(
        switchMap(() => {
          this.newStartTime = '';
          this.newEndTime = '';
          this.successMessage = 'Disponibilité ajoutée avec succès.';
          return this._availabilityService.getMyAvailability().pipe(take(1));
        })
      )
      .subscribe({
        next: data => {
          this.availability = data;
        },
      });
  }
}
