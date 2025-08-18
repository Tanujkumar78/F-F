import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-about',
  imports: [HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

 constructor(private router: Router){}
  aboutt(){
    this.router.navigate(['products']);
  }
}
