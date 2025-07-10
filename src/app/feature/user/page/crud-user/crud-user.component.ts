import { Component } from '@angular/core';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { ProviderSignUpComponent } from '../../components/provider-sign-up/provider-sign-up.component';
import { ClientSignUpComponent } from '../../components/client-sign-up/client-sign-up.component';

@Component({
  selector: 'app-crud-user',
  standalone: true,
  imports: [UsersListComponent, ProviderSignUpComponent, ClientSignUpComponent],
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.scss',
})
export class CrudUserComponent {activeComponent: 'list' | 'client' | 'provider' | null = null;

  show(component: 'list' | 'client' | 'provider'):void {
    this.activeComponent = component;
  }}
