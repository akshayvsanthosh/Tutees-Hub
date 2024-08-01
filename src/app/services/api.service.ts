import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url ="http://localhost:3000"

  constructor(private http:HttpClient) { }

  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }
 
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  addStudentAPI(student:any){
    return this.http.post(`${this.server_url}/addStudent`,student,this.appendToken())
  }

  getStudentsAPI(){
    return this.http.get(`${this.server_url}/allStudents`,this.appendToken())
  }

  getAStudentAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/student`,this.appendToken())
  }

  updateAStudentAPI(student:any){
    return this.http.put(`${this.server_url}/${student.studId}/updateStudent`,student,this.appendToken())
  }

  deleteAStudentAPI(id:any){
    return this.http.delete(`${this.server_url}/${id}/deleteStudent`,this.appendToken())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem('user')
  }
}