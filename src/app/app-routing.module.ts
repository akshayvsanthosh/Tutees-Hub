import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"",component:LoginComponent
  },
  {
    path:"home",canActivate:[authGuard],component:HomeComponent
  },
  {
    path:"addStudent",canActivate:[authGuard],component:AddStudentComponent
  },
  {
    path:":id/editStudent",canActivate:[authGuard],component:EditStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
