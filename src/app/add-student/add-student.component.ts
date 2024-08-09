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
  image: any = "../assets/addImage.png"
  studImage: any = ""
  uploadFile:any = null

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  getFile(event: any) {
    this.uploadFile = event.target.files[0]
    console.log(this.uploadFile);
    
    if (this.uploadFile?.type == "image/png" || this.uploadFile?.type == "image/jpg" || this.uploadFile?.type == "image/jpeg") {
      let fr = new FileReader()
      fr.readAsDataURL(this.uploadFile)
      fr.onload = (event: any) => {
        this.image = event.target.result
        this.studImage = event.target.result
      }
    } else {
      this.image = "../assets/addImage.png"
      this.studImage = ""
    }
  }

  addStudent() {
    if (sessionStorage.getItem("token")) {
      if (this.studId && this.studName && this.studCourse && this.studStatus && this.studImage) {
        const reqbody = new FormData()
        reqbody.append("studImage", this.uploadFile)
        reqbody.append("studId", this.studId)
        reqbody.append("studName", this.studName)
        reqbody.append("studCourse", this.studCourse)
        reqbody.append("studStatus", this.studStatus)
        console.log(reqbody);
        // const student = { studId: this.studId, studName: this.studName, studCourse: this.studCourse, studStatus: this.studStatus }
        this.api.addStudentAPI(reqbody).subscribe({
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

  cancel(){
    this.router.navigateByUrl("home")
  }


}