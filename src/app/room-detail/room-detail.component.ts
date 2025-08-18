import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RoomDetailComponent implements OnInit {
  
  room: any = {};
  showBookingForm = false;
  bookingDetails = {
    name: '',
    email: ''
  };
  isLoading = false;

  // Notification properties
  showNotification = false;
  notificationMessage = '';
  notificationType = '';

  // Make sure to use consistent API URL
  private readonly API_BASE_URL = 'http://localhost:8000'; // Change this to match your backend

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  aboutt() {
    this.router.navigate(['products']);
  }

  ngOnInit(): void {
    // Scroll to top when component loads
    window.scrollTo(0, 0);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadRoom(id);
    }
  }

  /** Show notification method */
  private showNotificationToast(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    
    // Hide after 4 seconds
    setTimeout(() => {
      this.showNotification = false;
    }, 4000);
  }

  /** Load room data from API */
  private loadRoom(id: string): void {
    this.isLoading = true;
    this.http.get(`${this.API_BASE_URL}/Rooms/${id}`).subscribe({
      next: (data) => {
        this.room = data;
        this.isLoading = false;
        console.log('Room loaded:', this.room);
      },
      error: (error) => {
        console.error('Error loading room:', error);
        this.isLoading = false;
        this.showNotificationToast('Failed to load room details', 'error');
      }
    });
  }

  /** Show the booking form */
  startBooking() {
    this.showBookingForm = true;
  }

  /** Confirm booking and update backend */
  confirmBooking() {
    if (!this.bookingDetails.name || !this.bookingDetails.email) {
      this.showNotificationToast('Please fill all details', 'error');
      return;
    }

    if (!this.room.id) {
      this.showNotificationToast('Room data not loaded properly', 'error');
      return;
    }

    this.isLoading = true;
    const updatedRoom = { 
      ...this.room, 
      isAvailable: false, 
      bookingDetails: this.bookingDetails 
    };

    this.http.put(`${this.API_BASE_URL}/Rooms/${this.room.id}`, updatedRoom)
      .subscribe({
        next: () => {
          this.room.isAvailable = false;
          this.showBookingForm = false;
          this.isLoading = false;
          this.showNotificationToast('🎉 Booking confirmed successfully!', 'success');
          // Reset form
          this.bookingDetails = { name: '', email: '' };
        },
        error: (error) => {
          console.error('Booking error:', error);
          this.isLoading = false;
          this.showNotificationToast('Failed to confirm booking. Please try again.', 'error');
        }
      });
  }

  /** Cancel booking form */
  cancelBooking() {
    this.showBookingForm = false;
    // Reset form data
    this.bookingDetails = { name: '', email: '' };
  }
}
