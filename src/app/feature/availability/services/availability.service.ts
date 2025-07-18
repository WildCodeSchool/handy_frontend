import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Availability } from '../models/Availability';
import { CalendarOptions } from '@fullcalendar/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private _baseUrl = `${environment.apiUrl}/availabilities`;

  private _bookedIdsSeen = new Set<number>();
  private _dismissedToastIds = new Set<number>();
  private _toastMessagesSubject = new BehaviorSubject<{ id: number; message: string; type: 'info' | 'success' | 'error' }[]>([]);
  toastMessages$ = this._toastMessagesSubject.asObservable();
  toastMessages: { id: number; message: string; type: 'info' | 'success' | 'error' }[] = [];

  private _http = inject(HttpClient);
  getMyAvailability(): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/self`);
  }

  getAvailabilityByProviderId(userId: number): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/user/${userId}`);
  }

  updateAvailability(availability: Availability): Observable<any> {
    return this._http.put(`${this._baseUrl}/${availability.id}`, availability);
  }

  createMyAvailability(startTime: string, endTime: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/self`, { startTime, endTime });
  }

  getCalendarOptions(): Observable<CalendarOptions> {
    return this.getMyAvailability().pipe(
      tap(data => this._handleNewBookedSlots(data)),
      map(data => this._mapToCalendarEvents(data))
    );
  }

  private _handleNewBookedSlots(data: any[]): void {
    const bookedSlots = data.filter(a => a.status === 'booked');

    bookedSlots.forEach(slot => {
      if (slot.id !== undefined && !this._bookedIdsSeen.has(slot.id) && !this._dismissedToastIds.has(slot.id)) {
        this._bookedIdsSeen.add(slot.id);
        const message = `Un créneau du ${new Date(slot.startTime).toLocaleString()} a été réservé`;
        this.toastMessages = [...this.toastMessages, { id: slot.id, message, type: 'info' }];
        this._toastMessagesSubject.next(this.toastMessages);
      }
    });
  }

  private _mapToCalendarEvents(data: any[]): CalendarOptions {
    const availableSlots = data.filter(a => a.status === 'available');
    const bookedSlots = data.filter(a => a.status === 'booked');

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
  }
  setDismissedToastIds(ids: number[]): void {
    this._dismissedToastIds = new Set<number>(ids);
  }

  deleteAvailability(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
}
