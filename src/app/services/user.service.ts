import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:8089/espritgather/user';

  constructor(private router: Router,private httpClient: HttpClient) { }

  getUsers():Observable<any> {
    return this.httpClient.get(`${this.URL}/users`)
  }
  getUserById(idUser : any) : Observable<any> {
    return this.httpClient.get(`${this.URL}/retrieve-user/${idUser}`)
  }
  retrieveByMail(mail : any){
    return this.httpClient.get(`${this.URL}/retrieve-user-by-mail/${mail}`)
  }
  retrieveUser(idUser : any){
    return this.httpClient.get(`${this.URL}/retrieve-user/${idUser}`)
  }
  removeUser(idUser : any) : Observable<any>{
    return  this.httpClient.delete(`${this.URL}/remove-user/${idUser}`)
  }
  modifyUser(user : any){
    return this.httpClient.put(`${this.URL}/modify-user`, user)
  }



}
