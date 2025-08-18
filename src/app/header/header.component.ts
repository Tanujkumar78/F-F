import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { Console } from 'console';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentRoute: any;
  isMenuOpen: boolean = false; // New property for the menu state

  constructor(private router: Router){}
  
  // New method to toggle the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  back(){
    this.router.navigate(['/login']);
  }
  toAbout(){
    this.router.navigate(['/About']);
    console.log('toabout')
  }
  toFeatures(){
    this.router.navigate(['/Features']);
  }
  toContactus(){
    this.router.navigate(['/Contact-us'])
  }
  toprofile(){
    this.router.navigate(['prof']);
  }
  Flatbeeclick(){
    this.router.navigate(['products']);
  }
}