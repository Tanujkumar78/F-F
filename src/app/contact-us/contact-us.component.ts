import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private router: Router) {}

  showForm = false;

  contact = {
    name: '',
    email: '',
    message: ''
  };

  cus() {
    this.router.navigate(['products']);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitMessage() {
    const { name, email, message } = this.contact;

    if (name.trim() && email.trim() && message.trim()) {
      alert(`Thank you, ${name}, for reaching out! We'll get back to you soon.`);
      // Reset form
      this.contact = { name: '', email: '', message: '' };
      this.showForm = false;
    } else {
      alert("Please fill in all the fields before submitting.");
    }
  }
}
