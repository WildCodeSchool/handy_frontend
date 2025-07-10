import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { DeleteFeedbackComponent } from '../delete-feedback/delete-feedback.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, DeleteFeedbackComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnChanges {
  @Input() userId!: number;
  feedbacks: Feedback[] = [];
  feedbacks$!: Observable<Feedback[]>;

  private readonly _feedbackService = inject(FeedbackService);
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.feedbacks$ = this._feedbackService.getFeedbacksByUserId(this.userId).pipe(
        catchError(err => {
          console.error('Erreur chargement feedbacks:', err);
          return of([]);
        })
      );
    }
  }
  onFeedbackDeleted(deletedId: number): void {
    this.feedbacks$ = this.feedbacks$.pipe(
      catchError(() => of([])),
      map(feedbacks => feedbacks.filter(fb => fb.id !== deletedId))
    );
  }

}
