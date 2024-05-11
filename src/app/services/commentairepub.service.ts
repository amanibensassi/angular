import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentairepubService {
  readonly API_URL = 'http://sql-service:8089/espritgather/commentaire';

  constructor(private router: Router,private httpClient: HttpClient) { }
  getAllCommentaire() {
    return this.httpClient.get(`${this.API_URL}/commentaires`)
  }
  getAllCommentaireByPublication(idPub:number) {
    return this.httpClient.get(`${this.API_URL}/commentaires/${idPub}`)
  }
  addCommentaire(commentaire : any) {
    return this.httpClient.post(`${this.API_URL}/add-commentaire`, commentaire)
  }
  getCommentaire(idCommentaire : any){
    return this.httpClient.get(`${this.API_URL}/retrieve-commentaire/${idCommentaire}`)
  }
 
  editCommentaire(commentaire : any){
    return this.httpClient.put(`${this.API_URL}/modify-commentaire`, commentaire)
  }
  
  deletCommentaire(idCommentaire : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-commentaire/${idCommentaire}`)
  }
}
