import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student: any = {}

  editForm = this.fb.group({
    studId: ['',[Validators.pattern('[A-z0-9]*'),Validators.required]],
    studName: ['',[Validators.pattern('[a-zA-Z0-9 ]*'),Validators.required]],
    studCourse: ['',[Validators.required]],
    studStatus: ['',[Validators.required]]
  })
  

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private fb: FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((result: any) => {
      const { id } = result
      this.getAStudent(id)
    })
  }

  getAStudent(id: any) {
    this.api.getAStudentAPI(id).subscribe((result: any) => {
      this.student = result
      this.editForm.patchValue({
        studId: this.student.studId,
        studName: this.student.studName,
        studCourse: this.student.studCourse,
        studStatus: this.student.studStatus
      })
      console.log(this.student); 
      console.log(this.editForm.value);
      
    })
  }

  updateStudent(){
    if (sessionStorage.getItem("token")) {
      if (this.editForm.valid) {
        const studId = this.editForm.value.studId
        const studName = this.editForm.value.studName
        const studCourse = this.editForm.value.studCourse
        const studStatus = this.editForm.value.studStatus
        const user = {studId,studName,studCourse,studStatus}
        this.api.updateAStudentAPI(user).subscribe({
          next: (result: any) => {
            console.log(result);
            this.toastr.success(`Updated Successfully`)
            this.router.navigateByUrl("home")
          },
          error: (reason: any) => {
            console.log(reason);
            this.toastr.warning(reason.error)
          }
        })
      } else {
        this.toastr.warning("Invalid Details")
      }
    } else {
      this.toastr.warning("Please Login!!")
    }
  }


}