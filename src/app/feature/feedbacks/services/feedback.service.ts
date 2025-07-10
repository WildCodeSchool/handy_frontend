import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly _baseUrl = `${environment.apiUrl}/feedbacks`;

private _http = inject(HttpClient);

  getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this._http.get<Feedback[]>(`${this._baseUrl}/user/${userId}`);
  }
  createFeedback(feedback: { content: string; userId: number }): Observable<Feedback> {
    return this._http.post<Feedback>(`${this._baseUrl}/user/${feedback.userId}`, {
      content: feedback.content,
      userId: feedback.userId,
    });
  }

  deleteFeedback(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
}
