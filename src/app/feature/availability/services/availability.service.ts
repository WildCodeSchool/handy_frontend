import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Availability } from '../models/Availability';
import { CalendarOptions } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private _baseUrl = 'http://localhost:8080/availabilities';
  private _bookedIdsSeen = new Set<number>();
  private _dismissedToastIds = new Set<number>();
  private _toastMessagesSubject = new BehaviorSubject<{ id: number; message: string; type: 'info' | 'success' | 'error' }[]>([]);

  toastMessages$ = this._toastMessagesSubject.asObservable();
  toastMessages: { id: number; message: string; type: 'info' | 'success' | 'error' }[] = [];

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
  getCalendarOptions(): Observable<CalendarOptions> {
    return this.getMyAvailability().pipe(
      tap(data => {
        const bookedSlots = Array.isArray(data) ? data.filter(a => a.status === 'booked') : [];
        bookedSlots.forEach(slot => {
          if (slot.id !== undefined && !this._bookedIdsSeen.has(slot.id) && !this._dismissedToastIds.has(slot.id)) {
            this._bookedIdsSeen.add(slot.id);
            const message = `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`;
            this.toastMessages = [...this.toastMessages, { id: slot.id, message, type: 'info' }];
            this._toastMessagesSubject.next(this.toastMessages);
          }
        });
      }),
      map(data => {
        const availableSlots = Array.isArray(data) ? data.filter(a => a.status === 'available') : [];
        const bookedSlots = Array.isArray(data) ? data.filter(a => a.status === 'booked') : [];

        const events = [
          ...bookedSlots.map(a => ({
            title: `Réservé par: ${a.bookedByEmail}`,
            start: a.startTime,
            end: a.endTime,
            color: 'red',
          })),
          ...availableSlots.map(a => ({
            title: 'Disponible',
            start: a.startTime,
            end: a.endTime,
            color: 'green',
          })),
        ];

        return {
          initialView: 'dayGridMonth',
          events,
        } as CalendarOptions;
      })
    );
  }

  setDismissedToastIds(ids: number[]): void {
    this._dismissedToastIds = new Set<number>(ids);
  }
}
