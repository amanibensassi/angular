import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const  Base_URL = ["http://sql-service:8089/espritgather/"]


@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor(private http: HttpClient) { }
  clubregister(signRequest: any): Observable<any> {
    return this.http.post(Base_URL + 'signup/club', signRequest)
  }

  register(signRequest: any): Observable<any> {
    return this.http.post(Base_URL + 'signup', signRequest)
  }
  
  login(loginRequest: any): Observable<any> {
    return this.http.post(Base_URL + 'login', loginRequest)
  }
  logout(): void {
    localStorage.removeItem('jwtToken');
  }
  isAuthenticated(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return !!jwtToken; 
  }

  hello(): Observable<any> {
    return this.http.get(Base_URL + 'api/hello',{
      headers: this.createAuthoriazationHeader()
    })
  }

  private createAuthoriazationHeader(){
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken){
        console.log("JWT TOKEN FOUND IN LOCAL STORAGE", jwtToken);
        return new HttpHeaders().set(
          "Authorization", "Bearer " + jwtToken
        )
      } else{
        console.log("JWT TOKEN NOT FOUND IN LOCAL STORAGE");


      }
     return undefined ;

  }

   }






