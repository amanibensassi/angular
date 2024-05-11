import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.css']
})
export class SimpleUserComponent {
  selectedUser: any = {};
role :any;
  constructor(private router : Router) {
    this.getrole();
    this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
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

}
