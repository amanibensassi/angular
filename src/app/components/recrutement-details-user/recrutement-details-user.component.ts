import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutementService } from 'src/app/services/recrutement.service';

@Component({
  selector: 'app-recrutement-details-user',
  templateUrl: './recrutement-details-user.component.html',
  styleUrls: ['./recrutement-details-user.component.css']
})
export class RecrutementDetailsUserComponent implements OnInit {
  recrutement: any;
  idRecrutement: number | undefined;
  id : any;
role : any;
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private recrutementService: RecrutementService
  ) {
    this.getrole();
    this.getUserFromLocalStorage();
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  ngOnInit() {
    const idRecrutementParam = this.route.snapshot.paramMap.get('idRecrutement');
    if (idRecrutementParam !== null) {
      this.idRecrutement = parseInt(idRecrutementParam, 10);
      this.getRecrutement(this.idRecrutement);
    }
  }
  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='user'){
        this.router.navigateByUrl('/error')
       }
  }
  
  
  getRecrutement(idRecrutement: number) {
    this.recrutementService.getRecrutement(idRecrutement).subscribe(data => {
      this.recrutement = data;
    });
  }
}
