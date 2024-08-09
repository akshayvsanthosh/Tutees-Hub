import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url ="https://tutees-hub-server.onrender.com"

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

  addStudentAPI(reqbody:any){
    return this.http.post(`${this.server_url}/addStudent`,reqbody,this.appendToken())
  }

  getStudentsAPI(){
    return this.http.get(`${this.server_url}/allStudents`,this.appendToken())
  }

  getAStudentAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/student`,this.appendToken())
  }

  updateAStudentAPI(reqbody:any){
    return this.http.put(`${this.server_url}/${reqbody.get("studId")}/updateStudent`,reqbody,this.appendToken())
  }

  deleteAStudentAPI(id:any){
    return this.http.delete(`${this.server_url}/${id}/deleteStudent`,this.appendToken())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem('user')
  }
}