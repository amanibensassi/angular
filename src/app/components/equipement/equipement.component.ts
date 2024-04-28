import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from "src/app/models/event";
import { EquipementService } from 'src/app/services/equipement.service';
import { Equipement } from 'src/app/models/equipement';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent {
  event : Event = new Event();
  equipement : any;
  newEquipement : Equipement = new Equipement();
  creatingMode: boolean = true;
  equipementChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  
  constructor(private equipementService: EquipementService, private router: Router) {
    this.getAllEquipement();
  }
    getAllEquipement() {
        this.equipementService.getAllEquipement().subscribe(data => {
          this.equipement = data;
         // this.divideEquipementsIntoChunks();
        });
    }
  
   /* openModel(equipement : Equipement = new Equipement()) {
      if (this.equipement.idEquipement == 0) {
        this.newEquipement = new Equipement();
      } else {
        this.creatingMode = false;
        this.newEquipement = equipement;
      }
    }*/
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
        idEvent : "1"
      }
      const newEquipement = {
        equipement: this.newEquipement.equipement,
        typeequip: this.newEquipement.typeequip,
        other: this.newEquipement.typeequip == "other"? this.newEquipement.other:"",
        datemeeting : this.newEquipement.datemeeting,
        quantite : this.newEquipement.quantite,
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

    EditApprouvement(equip: Equipement = new Equipement()){
      equip.approuvement = true;
      this.equipementService.addEquipementAdmin(equip).subscribe(() => {
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
