import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Availability } from '../../models/Availability';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
})
export class AvailabilityComponent implements OnInit {
  private readonly _availabilityService = inject(AvailabilityService);
  private readonly _destroyRef = inject(DestroyRef);

  availability: Availability[] = [];
  newStartTime = '';
  newEndTime = '';
  successMessage = '';
  errorMessage = '';
  today = new Date(new Date().setHours(0, 0, 0, 0));
  ngOnInit(): void {
    this._loadAvailability();
  }

  createAvailability(): void {
    this._resetMessages();

    if (!this._isValidRange()) {
      this.errorMessage = "La disponibilité doit être à partir d'aujourd'hui et sur une seule journée.";
      return;
    }

    if (this._alreadyExistsInAvailability()) {
      this.errorMessage = 'Cette disponibilité existe déjà.';
      return;
    }

    this._availabilityService
      .createMyAvailability(this.newStartTime, this.newEndTime)
      .pipe(
        switchMap(() => this._availabilityService.getMyAvailability()),
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
          this.errorMessage = 'Erreur lors de la suppression.';
          this.successMessage = '';
        },
      });
  }
  private _loadAvailability(): void {
    this._availabilityService
      .getMyAvailability()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => (this.availability = data));
  }

  private _isValidRange(): boolean {
    const start = new Date(this.newStartTime);
    const end = new Date(this.newEndTime);
    return start >= this.today && end >= this.today && start < end && start.getDate() === end.getDate();
  }

  private _alreadyExistsInAvailability(): boolean {
    const start = new Date(this.newStartTime).getTime();
    const end = new Date(this.newEndTime).getTime();

    return this.availability.some(slot => {
      const slotStart = new Date(slot.startTime).getTime();
      const slotEnd = new Date(slot.endTime).getTime();
      return start < slotEnd && end > slotStart;
    });
  }

  private _resetMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
