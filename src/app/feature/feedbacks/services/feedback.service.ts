import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly _baseUrl = 'http://localhost:8080/feedbacks';

  constructor(private _http: HttpClient) {}

  getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this._http.get<Feedback[]>(`${this._baseUrl}/user/${userId}`);
  }
}
