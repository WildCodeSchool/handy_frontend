import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
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

  constructor(private _feedbackService: FeedbackService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this._feedbackService
        .getFeedbacksByUserId(this.userId)
        .pipe(
          tap(feedbacks => (this.feedbacks = feedbacks)),
          tap(() => console.log('Feedbacks chargés avec succès', this.feedbacks))
        )
        .subscribe({
          error: err => console.error('Erreur chargement feedbacks:', err),
        });
    }
  }
  onFeedbackDeleted(deletedId: number): void {
    this.feedbacks = this.feedbacks.filter(fb => fb.id !== deletedId);
  }
}
