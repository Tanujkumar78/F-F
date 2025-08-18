import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-features',
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  constructor(private router: Router){}
  cus(){
      this.router.navigate(['products']);
  }
 features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3103/3103451.png',
      title: 'Various Room Types',
      description: 'Choose from AC, non-AC, single, or shared rooms as per your comfort and budget.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/709/709790.png',
      title: 'Verified Flats',
      description: 'All flats are verified and reviewed for your peace of mind.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
      title: 'Real Photos',
      description: 'Every listing includes actual photos of the room or flat to help you choose easily.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
      title: 'Location-Based Search',
      description: 'Quickly find rooms near colleges, workplaces, or metro stations.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png',
      title: 'Instant Booking',
      description: 'Book your favorite flat or room instantly without broker delays.'
    }
  ];
}
