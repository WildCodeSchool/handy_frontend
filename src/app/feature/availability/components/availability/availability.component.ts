import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly _destroyRef = inject(DestroyRef);
  today: Date = new Date();

  constructor(private _availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this._availabilityService
      .getMyAvailability()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => (this.availability = data),
      });
    this.today.setHours(0, 0, 0, 0);
  }

  createAvailability(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this._isValidDateRange(this.newStartTime, this.newEndTime)) {
      this.errorMessage = "La disponibilité ajoutée doit être à partir de la date d'aujourd'hui et les horaires doivent concerner la même journée ";
      return;
    }

    if (this._isAvailabilityTaken(this.newStartTime, this.newEndTime)) {
      this.errorMessage = 'Cette disponibilité existe déjà.';
      return;
    }

    this._availabilityService
      .createMyAvailability(this.newStartTime, this.newEndTime)
      .pipe(
        switchMap(() => this._availabilityService.getMyAvailability().pipe(take(1))),
        tap(data => {
          this.availability = data;
          this.successMessage = 'Disponibilité ajoutée avec succès.';
          this.newStartTime = '';
          this.newEndTime = '';
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
  private _isValidDateRange(startTime: string, endTime: string): boolean {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start < this.today || end < this.today || start >= end) {
      return false;
    }

    const startDay = start.getDate();
    const endDay = end.getDate();
    return startDay === endDay;
  }

  private _isAvailabilityTaken(startTime: string, endTime: string): boolean {
    const newStart = new Date(startTime).getTime();
    const newEnd = new Date(endTime).getTime();

    return !!this.availability?.some((slot: any) => {
      const slotStart = new Date(slot.startTime).getTime();
      const slotEnd = new Date(slot.endTime).getTime();

      return newStart < slotEnd && newEnd > slotStart;
    });
  }

  deleteAvailability(id: number): void {
    this._availabilityService
      .deleteAvailability(id)
      .pipe(
        switchMap(() => this._availabilityService.getMyAvailability()),
        tap(data => {
          this.availability = data;
          this.successMessage = 'Disponibilité supprimée avec succès.';
          this.errorMessage = '';
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        error: () => {
          this.errorMessage = 'Erreur lors de la suppression de la disponibilité.';
          this.successMessage = '';
        },
      });
  }
}
