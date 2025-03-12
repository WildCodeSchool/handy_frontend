// le premier



// import { TestBed } from '@angular/core/testing';
// import { UserStoreService } from '../../core/services/user-store.service';
// import { take } from 'rxjs';

// describe('UserStoreService', () => {
//   let service: UserStoreService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [UserStoreService],
//     });
//     service = TestBed.inject(UserStoreService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should set and get user roles from an array', () => {
//     const rolesArray = ['USER', 'ADMIN'];
//     service.setRolesFromStore(rolesArray);

//     service.getRolesFromStore().subscribe((roles) => {
//       expect(roles).toEqual(rolesArray);
//     });
//   });

//   it('should set and get user roles from an object', (done) => {
//     const userData = { id: 1, name: 'John Doe', roles: ['USER', 'ADMIN'] };
//     service.setRolesFromStore(userData);

//     service.getRolesFromStore().pipe(take(1)).subscribe((res) => {
//       expect(res).toEqual(['USER', 'ADMIN']);
//       done(); // Finit bien le test
//     });
//   });

//   it('should handle invalid data gracefully', () => {
//     service.setRolesFromStore({ id: 1, name: 'John Doe' });

//     service.getRolesFromStore().subscribe((roles) => {
//       expect(roles).toEqual([]); // Pas de rôles valides
//     });
//   });

//   it('should handle non-object data', () => {
//     service.setRolesFromStore('invalid');

//     service.getRolesFromStore().subscribe((roles) => {
//       expect(roles).toEqual([]); // Donnée incorrecte
//     });
//   });
// });
