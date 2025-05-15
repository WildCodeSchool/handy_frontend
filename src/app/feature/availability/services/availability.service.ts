import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Availability } from '../models/Availability';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private _baseUrl = 'http://localhost:8080/availabilities';
  private _bookedIdsSeen = new Set<number>();
  private _dismissedToastIds = new Set<number>();
  private _toastMessagesSubject = new BehaviorSubject<{ id: number; message: string; type: string }[]>([]);
  toastMessages$ = this._toastMessagesSubject.asObservable();

  constructor(private _http: HttpClient) {}

  getMyAvailability(): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/me`);
  }

  getAvailabilityByProviderId(userId: number): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/user/${userId}`);
  }

  updateAvailability(availability: Availability): Observable<any> {
    return this._http.put(`${this._baseUrl}/${availability.id}`, availability);
  }

  createMyAvailability(startTime: string, endTime: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/me`, { startTime, endTime });
  }
  // getCalendarOptions(): Observable<CalendarOptions> {
  //   return this.getMyAvailability().pipe(
  //     tap(data => {
  //       const bookedSlots = data.filter(a => a.status === 'booked');
  //       const newToasts = bookedSlots
  //         .filter(slot => slot.id !== undefined && !this.bookedIdsSeen.has(slot.id) && !this.dismissedToastIds.has(slot.id))
  //         .map(slot => {
  //           this.bookedIdsSeen.add(slot.id);
  //           return {
  //             id: slot.id,
  //             message: `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`,
  //             type: 'info',
  //           };
  //         });

  //       if (newToasts.length > 0) {
  //         this.toastMessagesSubject.next([
  //           ...this.toastMessagesSubject.value,
  //           ...newToasts,
  //         ]);
  //       }
  //     }),
  //     map(data => {
  //       const availableSlots = data.filter(a => a.status === 'available');
  //       const bookedSlots = data.filter(a => a.status === 'booked');

  //       return {
  //         initialView: 'timeGridWeek',
  //         events: [
  //           ...bookedSlots.map(a => ({
  //             title: `Réservé par: ${a.bookedByEmail}`,
  //             start: a.startTime,
  //             end: a.endTime,
  //             color: 'red',
  //           })),
  //           ...availableSlots.map(a => ({
  //             title: 'Disponible',
  //             start: a.startTime,
  //             end: a.endTime,
  //             color: 'green',
  //           })),
  //         ],
  //       } as CalendarOptions;
  //     })
  //   );
  // }
}
