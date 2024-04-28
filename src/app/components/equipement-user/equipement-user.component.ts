import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from "src/app/models/event";
import { EquipementService } from 'src/app/services/equipement.service';
import { Equipement } from 'src/app/models/equipement';

@Component({
  selector: 'app-equipement-user',
  templateUrl: './equipement-user.component.html',
  styleUrls: ['./equipement-user.component.css']
})
export class EquipementUserComponent {
  event : Event = new Event();
  equipement : any;
  newEquipement : Equipement = new Equipement();
  creatingMode: boolean = true;
  equipementChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  idEvent !:any;
  constructor(private equipementService: EquipementService, private router: Router, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvent')?.charAt(0);
    console.log(this.idEvent);
    this.getAllEquipement();
  }
    getAllEquipement() {
        this.equipementService.getAllEquipement().subscribe(data => {
          this.equipement = data;
         // this.divideEquipementsIntoChunks();
        });
    }
  
    openModel(equip: Equipement = new Equipement()) {
      if (equip.idEquipement == 0) {
        this.creatingMode = true;
        this.newEquipement = new Equipement();
      } else {
        this.creatingMode = false;
        this.newEquipement = equip;
      }
    }
    

    deleteEquipement(equipementId: string) {
      this.equipementService.deletEequipement(equipementId).subscribe(() => {
        this.getAllEquipement();
        window.location.reload();
      });
    }
  
    createEquipement() {
      const event = {
        idEvent : this.idEvent
      }
      const newEquipement = {
        equipement: this.newEquipement.equipement,
        typeequip: this.newEquipement.typeequip,
        other: this.newEquipement.metric == "all"? this.newEquipement.other:"",
        datemeeting : this.newEquipement.datemeeting,
        quantite : this.newEquipement.quantite,
        metric : this.newEquipement.metric,
        details : this.newEquipement.details,
        approuvement: true,
        price: this.newEquipement.price,
        event: event,
  
      }
      this.equipementService.addEquipement(newEquipement).subscribe(() => {
        this.getAllEquipement();
        window.location.reload();
      });
    }
  
    modifyEquipement() {
      this.equipementService.editEquipement(this.newEquipement).subscribe(() => {
        this.getAllEquipement();
        window.location.reload();
      });
    }
  
    changePage(pageNumber: number) {
      this.currentPage = pageNumber;
    }
  
    getEquipementsForPage(pageNumber: number): any[] {
      const equipementsPerPage = 2;
      const startIndex = (pageNumber - 1) * equipementsPerPage;
      const endIndex = startIndex + equipementsPerPage;
      return this.equipement.slice(startIndex, endIndex);
    }
    
  
    incrementPage() {
      if (this.currentPage < this.equipementChunks.length) {
        this.currentPage++;
      }
    }
    
    decrementPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    divideequipementsIntoChunks() {
      const chunkSize = 2;
      this.equipementChunks = [];
      for (let i = 0; i < this.equipement.length; i += chunkSize) {
        this.equipementChunks.push(this.equipement.slice(i, i + chunkSize));
    }
    }



    handleTypeChange() {
    
      if (this.newEquipement.equipement == "other" ) {
        this.newEquipement.other = "";
      }
    }
}
