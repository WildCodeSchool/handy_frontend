// import { CommonModule, NgClass } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-calendar',
//   standalone: true,
//   imports: [NgClass, FormsModule, CommonModule],
//   templateUrl: './calendar.component.html',
//   styleUrl: './calendar.component.scss'
// })
// export class CalendarComponent implements OnInit {

//   currentDate: Date = new Date();
//   daysOfWeek: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
//   daysInMonth: number[] = [];
//   monthName: string = '';

//   constructor() { }

//   ngOnInit(): void {
//     this.updateCalendar(this.currentDate);
//   }

//   // Met à jour le calendrier pour le mois de la date donnée
//   updateCalendar(date: Date): void {
//     this.currentDate = date;

//     // Nom du mois
//     const months: string[] = [
//       'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
//     ];
//     this.monthName = months[this.currentDate.getMonth()];

//     // Premier jour du mois
//     const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
//     const startingDay = firstDayOfMonth.getDay(); // Le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)

//     // Nombre de jours dans le mois
//     const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
//     const totalDaysInMonth = lastDayOfMonth.getDate();

//     // Tableau des jours à afficher
//     this.daysInMonth = [];
//     for (let i = 1; i <= totalDaysInMonth; i++) {
//       this.daysInMonth.push(i);
//     }

//     // Ajouter les cases vides au début pour aligner le premier jour sur le bon jour de la semaine
//     while (this.daysInMonth.length < (startingDay + totalDaysInMonth)) {
//       this.daysInMonth.unshift(null); // Ajouter une valeur null pour remplir les cases vides
//     }
//   }

//   // Naviguer vers le mois précédent
//   previousMonth(): void {
//     this.currentDate.setMonth(this.currentDate.getMonth() - 1);
//     this.updateCalendar(this.currentDate);
//   }

//   // Naviguer vers le mois suivant
//   nextMonth(): void {
//     this.currentDate.setMonth(this.currentDate.getMonth() + 1);
//     this.updateCalendar(this.currentDate);
//   }

// }
