// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-room-detail-component',
//   imports: [FormsModule,CommonModule],
//   templateUrl: './room-detail-component.component.html',
//   styleUrl: './room-detail-component.component.css'
// })

// export class RoomDetailComponentComponent implements OnInit {
//   room: any = {};
//   showForm = false;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   about() {
//     this.router.navigate(['products']);
//   }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     this.http.get(`http://localhost:3000/Rooms/${id}`).subscribe((data) => {
//       this.room = data;
//     });
//   }

//   openForm() {
//     this.showForm = true;
//   }

//   submitForm() {
//     alert('Booking submitted!');
//     this.showForm = false;
//   }
// }
