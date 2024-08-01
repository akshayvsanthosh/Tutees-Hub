import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studId: string = ''
  studName: string = ''
  studCourse: string = ''
  studStatus: string = ''

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  addStudent() {
    if (sessionStorage.getItem("token")) {
      if (this.studId && this.studName && this.studCourse && this.studStatus) {
        const student = { studId: this.studId, studName: this.studName, studCourse: this.studCourse, studStatus: this.studStatus }
        this.api.addStudentAPI(student).subscribe({
          next: (result: any) => {
            console.log(result);
            this.toastr.success(`Added Successfully`)
            this.router.navigateByUrl("home")
          },
          error: (reason: any) => {
            console.log(reason);
            this.toastr.warning(reason.error)
          }
        })
      } else {
        this.toastr.warning("Fill the form completely")
      }
    } else {
      this.toastr.warning("Please Login!!")
    }
  }

  
}