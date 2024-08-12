import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  insideLogin:boolean=false

  loginForm = this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*'),Validators.required]]
  })


  constructor(private fb:FormBuilder,private toastr: ToastrService,private api:ApiService,private router:Router){

  }

  login(){
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = {email,password}
      this.api.loginAPI(user).subscribe({
        next:(result:any)=>{
          this.toastr.success('Login Successfull')
          this.loginForm.reset()
          sessionStorage.setItem("user",JSON.stringify(result.user))
          sessionStorage.setItem("token",result.token)
          this.router.navigateByUrl('home')
        }
      })
    } else {
      this.toastr.warning("Invalid Details")
    }
  }

}
