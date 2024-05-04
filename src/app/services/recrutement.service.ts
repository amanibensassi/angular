import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecrutementComponent } from '../components/recrutement/recrutement.component';
import { Recrutement } from '../models/recrutement';
@Injectable({
  providedIn: 'root'
})
export class RecrutementService {
  readonly API_URL = 'http://angular-service:8089/espritgather/recrutement';

  constructor(private router: Router,private httpClient: HttpClient) { }
    getAllRecrutements() {
      return this.httpClient.get(`${this.API_URL}/retrieve-all-recrutements`)
    }



    retrieveRecssByUser(userId: any) {
      return this.httpClient.get(`${this.API_URL}/retrieve-recs-by-user/${userId}`)
    }
    
    addRecrutement(recrutement : any) {
      return this.httpClient.post(`${this.API_URL}/add-recrutement`, recrutement)
    }

    addRecrutementByUser(recrutement : any,userId: any) {
      return this.httpClient.post(`${this.API_URL}/add-rec-by-user/${userId}`, recrutement)
    }
    
  
  
    getRecrutement(idRecrutement : Number){
      return this.httpClient.get(`${this.API_URL}/retrieve-recrutement/${idRecrutement}`)
    }
    editRecrutement(recrutement : any){
      return this.httpClient.put(`${this.API_URL}/modify-recrutement`, recrutement)
    }
    deleteRecrutement(idRecrutement : any){
      return  this.httpClient.delete(`${this.API_URL}/remove-recrutement/${idRecrutement}`)
    }
  
  }





