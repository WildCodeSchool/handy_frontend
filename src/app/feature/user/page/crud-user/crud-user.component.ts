import { Component } from '@angular/core';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';

@Component({
  selector: 'app-crud-user',
  standalone: true,
  imports: [UsersListComponent, CreateUserComponent],
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.scss'
})
export class CrudUserComponent {

}
