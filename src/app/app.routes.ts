import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeaturesComponent } from './features/features.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    // {path:"products",component:ProductsComponent},
     { path: "products", component: ProductsComponent},
    // {path:"products",loadComponent:()=>import('./products/products.component').then(c=>c.ProductsComponent)},
    {path:"login",component:LoginComponent},
    {path:"About",component:AboutComponent},
    {path:"Contact-us",component:ContactUsComponent},
    {path:"Features",component:FeaturesComponent},
     {path:"prof",component:ProfileComponent},
     { path: 'room', component: RoomDetailComponent }

]