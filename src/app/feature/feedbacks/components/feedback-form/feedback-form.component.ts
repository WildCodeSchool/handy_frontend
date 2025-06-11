import { Component, Input } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent {
  @Input() userId!: number;

  content: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(private _feedbackService: FeedbackService) {}

  submitFeedback(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.content.trim()) {
      this.errorMessage = 'Le commentaire ne peut pas être vide.';
      return;
    }

    this._feedbackService
      .createFeedback({
        content: this.content,
        userId: this.userId,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.successMessage = 'Feedback envoyé avec succès !';
          this.content = '';
        },
        error: err => {
          console.error('Erreur lors de l’envoi du feedback :', err);
          this.errorMessage = 'Échec de l’envoi du feedback.';
        },
      });
  }
}
