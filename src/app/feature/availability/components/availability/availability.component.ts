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

  constructor(private _availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this._availabilityService.getMyAvailability().subscribe({
      next: data => (this.availability = data),
      error: err => console.error('Erreur:', err),
    });
  }
  //   createAvailability(): void {
  //     if (!this.newStartTime || !this.newEndTime) return;

  //     this._availabilityService.createMyAvailability(this.newStartTime, this.newEndTime).subscribe({
  //       next: () => {
  //         this.newStartTime = '';
  //         this.newEndTime = '';
  //         this._availabilityService.getMyAvailability().subscribe({
  //           next: data => (this.availability = data),
  //           error: err => console.error('Erreur:', err),
  //         });
  //       },
  //       error: err => console.error('Erreur lors de la création:', err),
  //     });
  //   }

  createAvailability(): void {
    this._availabilityService
      .createMyAvailability(this.newStartTime, this.newEndTime)
      .pipe(
        switchMap(() => {
          this.newStartTime = '';
          this.newEndTime = '';
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
