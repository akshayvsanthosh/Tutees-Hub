import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allStudents:any=[]
  searchKey:string=""
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents(){
    this.api.getStudentsAPI().subscribe((result:any)=>{
      this.allStudents=result 
    })  
  }

  deleteStudent(id:any){
    this.api.deleteAStudentAPI(id).subscribe((result:any)=>{
      this.getAllStudents()
    })
  }

  sortbyName(){
    this.allStudents.sort((stud1:any,stud2:any)=>stud1.studName.localeCompare(stud2.studName))
    console.log(this.allStudents);
  }

  sortbyId(){
    this.allStudents.sort((stud1:any,stud2:any)=>stud1.studId.localeCompare(stud2.studId))
    console.log(this.allStudents);
  }

  sortbyCourse(){
    this.allStudents.sort((stud1:any,stud2:any)=>stud1.studCourse-stud2.studCourse)
    console.log(this.allStudents);
  }

}