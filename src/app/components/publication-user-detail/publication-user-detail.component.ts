import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import { InteractionComponent } from '../interaction/interaction.component';
import { InteractionService } from 'src/app/services/interaction.service';
import { Interaction } from 'src/app/models/interaction';

@Component({
  selector: 'app-publication-user-detail',
  templateUrl: './publication-user-detail.component.html',
  styleUrls: ['./publication-user-detail.component.css']
})
export class PublicationUserDetailComponent implements OnInit  {

  id!:any;
  publication!:any;
  interaction:any;
  idU!:any;
  role : any;
  likeC:Boolean=false;
  dislikeC:Boolean=false;
  interaction1:Interaction=new Interaction();
  newInteraction: Interaction = new Interaction();
  constructor(private publicationService: PublicationService,private interactionService: InteractionService, private router: Router,private route: ActivatedRoute) {   
    this.getUserFromLocalStorage();

  }

  ngOnInit(): void {
    this.idU=this.id;
    this.id = this.route.snapshot.params['id']; 
    console.log(this.id,"AAA")
    this.getPublication(this.id);
    this.getInteractionByPublication(this.id,this.idU);
  }

  getPublication(id:Number){
    this.publicationService.getPublication(id).subscribe(data => {
      this.publication = data;
      console.log(data)

    });
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
    this.role = user? user.role :"";
  }
  like(){
    const newInteraction = {
      liked: true,
     // interactions: this.newPublication.interactions ,
      dislike: false,
      //publication: publication,

    }
    this.interaction1.dislike=false
    this.interaction1.liked=true
    this.interaction1.publication=this.publication

    console.log(this.newInteraction)

    this.interactionService.addInteraction(this.interaction1,this.id,this.idU).subscribe((response: any) => {
      // Assuming the response contains the newly created publication
      console.log(response)
        this.interaction1=response;
      //this.newInteraction = new Interaction(); // Reset the newPublication object
    });
    console.log(this.newInteraction)
   // location.reload();
  }

  getInteractionByPublication(idP:any,idU:any){
    this.interactionService.retrieveInteractionByPublication(idP,this.idU).subscribe((response: any) => {
      // Assuming the response contains the newly created publication
      if(response!=null){
        this.likeC=response["liked"]
        this.dislikeC=response["dislike"]
        this.interaction1=response;
        this.interaction1.publication=this.publication

      }
      else{
        this.interaction1=new Interaction();
        this.interaction1.publication=this.publication
      }
      console.log(this.likeC,"LIKE")
      console.log(this.dislikeC,"DISLIKE")
      console.log(this.interaction,"aaaa")
    });
  }
  
  dislike(){
    this.interaction1.dislike=true
    this.interaction1.liked=false
    this.interaction1.publication=this.publication

//publication: this.publication,
    this.interactionService.addInteraction(this.interaction1,this.id,this.idU).subscribe((response: any) => {
      // Assuming the response contains the newly created publication
      this.interaction1=response; // Reset the newPublication object
    });
    console.log(this.newInteraction)
  }

  removelike(){
    this.interaction1.dislike=false
    this.interaction1.liked=false
    this.interaction1.publication=this.publication

//publication: this.publication,
    this.interactionService.addInteraction(this.interaction1,this.id,this.idU).subscribe((response: any) => {
      // Assuming the response contains the newly created publication
      this.interaction1=response; // Reset the newPublication object
    });
    console.log(this.newInteraction)
  }
//this.interactionService.modifyInteraction(this.newInteraction).subscribe(() => {
  //alert("Interaction Updated Successfully");


  }


