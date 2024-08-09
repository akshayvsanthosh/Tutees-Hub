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
  uploadFile:any = null
  existingFile:any=""
  image: any = "../assets/addImage.png"
  SERVER_URL:any=""
  
  editForm = this.fb.group({
    studImage: [''],
    studId: ['',[Validators.pattern('[A-z0-9]*'),Validators.required]],
    studName: ['',[Validators.pattern('[a-zA-Z0-9 ]*'),Validators.required]],
    studCourse: ['',[Validators.required]],
    studStatus: ['',[Validators.required]]
  })
  

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private fb: FormBuilder,private toastr:ToastrService) { 
    this.SERVER_URL = api.server_url
  }

  ngOnInit(): void {
    this.route.params.subscribe((result: any) => {
      const { id } = result
      this.getAStudent(id)
    })
  }

  getFile(event: any) {
    this.uploadFile = event.target.files[0]
    if (this.uploadFile?.type == "image/png" || this.uploadFile?.type == "image/jpg" || this.uploadFile?.type == "image/jpeg") {
      let fr = new FileReader()
      fr.readAsDataURL(this.uploadFile)
      fr.onload = (event: any) => {
        this.image = event.target.result
      }
    } else {
      this.image = "../assets/addImage.png"
      this.uploadFile = null;
    }
  }

  getAStudent(id: any) {
    this.api.getAStudentAPI(id).subscribe((result: any) => {
      this.student = result
      this.existingFile=this.student.studImage
      this.editForm.patchValue({
        studId: this.student.studId,
        studName: this.student.studName,
        studCourse: this.student.studCourse,
        studStatus: this.student.studStatus
      })
      this.image=`${this.SERVER_URL}/uploads/${this.existingFile}`
      // console.log(this.student);
      console.log(this.editForm.value);
      
    })
  }

  updateStudent(){
    if (sessionStorage.getItem("token")) {
      if (this.editForm.valid) {

        const reqbody = new FormData()
        this.uploadFile ? reqbody.append("studImage", this.uploadFile) : reqbody.append("studImage", this.existingFile)
        reqbody.append("studId", this.editForm.value.studId as string)
        reqbody.append("studName", this.editForm.value.studName  as string)
        reqbody.append("studCourse", this.editForm.value.studCourse  as string)
        reqbody.append("studStatus", this.editForm.value.studStatus  as string)
        console.log(reqbody);

        this.api.updateAStudentAPI(reqbody).subscribe({
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

  cancel(){
    this.router.navigateByUrl("home")
  }

}