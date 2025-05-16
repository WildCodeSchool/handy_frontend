import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnChanges {
  @Input() userId!: number;
  feedbacks: Feedback[] = [];

  constructor(private _feedbackService: FeedbackService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this._feedbackService.getFeedbacksByUserId(this.userId).subscribe({
        next: feedbacks => (this.feedbacks = feedbacks),
        error: err => console.error('Erreur chargement feedbacks:', err),
      });
    }
  }
}