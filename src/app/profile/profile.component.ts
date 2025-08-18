import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isEditing = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Try to get user data from localStorage
    this.loadUserData();
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }


  private loadUserData(): void {
    try {
      // First try logged-in user data
      let userData = localStorage.getItem('loggedInUser');
      
      // If no logged-in user, try signup data
      if (!userData) {
        userData = localStorage.getItem('signupData');
      }
      
      if (userData) {
        this.user = JSON.parse(userData);
        console.log('User data loaded:', this.user);
      } else {
        console.log('No user data found');
        this.user = null;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.user = null;
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.user) {
      // Update both localStorage keys
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      localStorage.setItem('signupData', JSON.stringify(this.user));
      
      this.isEditing = false;
      alert('Profile updated successfully!');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    // Reload original data
    this.loadUserData();
  }

  logout(): void {
    // Remove all user data from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('signupData');
    
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}
