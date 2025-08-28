import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { ROLES } from 'src/app/core/enum/constants';

@Component({
  selector: 'app-delete-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-feedback.component.html',
  styleUrl: './delete-feedback.component.scss',
})
export class DeleteFeedbackComponent {
  @Input() feedbackId!: number;
  @Output() deleted = new EventEmitter<number>();

  private _feedbackService = inject(FeedbackService);
  private _userStore = inject(UserStoreService);

  isAdmin$ = this._userStore.hasRole$(ROLES.ADMIN);

  deleteFeedback(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this._feedbackService.deleteFeedback(this.feedbackId).subscribe({
        next: () => this.deleted.emit(this.feedbackId),
        error: err => console.error('Erreur suppression feedback:', err),
      });
    }
  }
}
