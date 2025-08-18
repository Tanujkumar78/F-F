import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskmanagerService } from '../taskmanager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  logoText = 'Flatbee';
  message: string = '';
  showFirstDiv = true;

  LoginPage = {
    username: '',
    password: ''
  };

  SignUp = {
    Fullname: '',
    Email: '',
    passwordd: '',
    Cpasswordd: ''
  };

  constructor(private router: Router, private taskmanagerService: TaskmanagerService) { }

  ngOnInit(): void {
    // Clear any existing messages
    this.message = '';
  }

  // LOGIN FUNCTION
  login() {
    if (!this.LoginPage.username || !this.LoginPage.password) {
      this.message = 'Please fill all login details';
      return;
    }

    this.taskmanagerService.login(this.LoginPage).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        
        // Store user data in localStorage for profile access
        const userData = res.message?.user || res.user || res.data;
        
        if (userData) {
          localStorage.setItem('loggedInUser', JSON.stringify(userData));
          this.message = '✅ Login successful!';
          
          
          setTimeout(() => {
            this.router.navigate(['/products']); // Redirect to profile to see user data
          }, 1000);
        } else {
          this.message = '❌ Login failed - Invalid response';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.message = '❌ ' + (err.error?.message || 'Login failed');
      }
    });
  }

  // SIGNUP FUNCTION
  signUp() {
    const { Fullname, Email, passwordd, Cpasswordd } = this.SignUp;

    // Validation
    if (!Fullname || !Email || !passwordd || !Cpasswordd) {
      this.message = 'Please fill all signup details';
      return;
    }

    if (!Email.includes('@') || !Email.endsWith('.com')) {
      this.message = 'Please enter a valid email address';
      return;
    }

    if (passwordd !== Cpasswordd) {
      this.message = '❌ Password and Confirm Password should match';
      return;
    }

    if (passwordd.length < 6) {
      this.message = '❌ Password should be at least 6 characters';
      return;
    }

    // Call service
    this.taskmanagerService.signup(this.SignUp).subscribe({
      next: (res: any) => {
        console.log('Signup response:', res);
        
        // Store signup data immediately in localStorage
        const userData = {
          Fullname: this.SignUp.Fullname,
          Email: this.SignUp.Email,
          username: this.SignUp.Fullname, // For consistency
          // Don't store passwords in localStorage for security
        };
        
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        localStorage.setItem('signupData', JSON.stringify(userData));
        
        this.message = '✅ Signup successful!';
        
        // Reset form
        this.SignUp = {
          Fullname: '',
          Email: '',
          passwordd: '',
          Cpasswordd: ''
        };

        setTimeout(() => {
          this.router.navigate(['/products']); // Redirect to profile
        }, 1000);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.message = '❌ ' + (err.error?.message || 'Signup failed');
      }
    });
  }

  Login() {
    this.showFirstDiv = true;
    this.message = '';
  }

  signup() {
    this.showFirstDiv = false;
    this.message = '';
  }
}
