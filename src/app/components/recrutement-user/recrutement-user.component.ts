import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Recrutement } from 'src/app/models/recrutement';
import { RecrutementService } from 'src/app/services/recrutement.service';
@Component({
  selector: 'app-recrutement-user',
  templateUrl: './recrutement-user.component.html',
  styleUrls: ['./recrutement-user.component.css'],
})
export class RecrutementUserComponent {
  recrutements: any;
  recrutement: any;
  constructor(
    private recrutementService: RecrutementService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.getAllRecrutements();
  }

  getAllRecrutements(): void {
    this.recrutementService.getAllRecrutements().subscribe((data: any) => {
      this.recrutements = data.filter(
        (recrutement: { archive: any }) => !recrutement.archive
      );
    });
  }
}
