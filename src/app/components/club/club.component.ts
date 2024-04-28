import { Component } from '@angular/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  selectedUser: any = {};

  constructor() {
    this.getUserFromLocalStorage();
    //window.location.reload();
  }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }

}
