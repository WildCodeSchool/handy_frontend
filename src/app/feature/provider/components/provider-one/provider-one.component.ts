import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProvidersService } from '../../service/providers.service';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from 'src/app/feature/feedbacks/components/feedback/feedback.component';
import { FeedbackFormComponent } from 'src/app/feature/feedbacks/components/feedback-form/feedback-form.component';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-provider-one',
  standalone: true,
  imports: [CommonModule, FeedbackComponent, FeedbackFormComponent, RouterModule],
  templateUrl: './provider-one.component.html',
  styleUrl: './provider-one.component.scss',
})
export class ProviderOneComponent {
  private _route = inject(ActivatedRoute);
  private _providerService = inject(ProvidersService);
  error: string | null = null;

  provider$ = this._route.paramMap.pipe(
    map(params => params.get('id')),
    switchMap(id => {
      if (!id) return of(null);
      return this._providerService.getProviderWithServices(+id).pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    })
  );
}
