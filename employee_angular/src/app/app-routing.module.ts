import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PayslipPdfComponent } from './payslip-pdf/payslip-pdf.component';
import { PayslipComponent } from './payslip/payslip.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginPageComponent,
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'about',
    component:AboutComponent,
    data:{
      page: 'about'
    }
  },
  {
    path:'contact',
    component:ContactComponent,
    data:{
      page: 'contact'
    }
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'leave-request',
    component:LeaveRequestComponent,
  },
  {
    path:'payslip',
    component:PayslipComponent,
  },
  {
    path:'payslip-pdf',
    component:PayslipPdfComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
