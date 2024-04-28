import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  userList : User[] = [];
  userToModify : User = new User(); 
  creatingMode : boolean = true;
  selectedUser: any = {};
  showFooter = true; // Set to true by default
  role : any;
  constructor(private router: Router,private userService: UserService) {
    
    this.getUsers();
    this.getUserFromLocalStorage();

  




    }

  
  getUsers(){
    this.userService.getUsers().subscribe((response : User[])=>{
      this.userList = response;
      //console.log(response.map(user => user.idUser)); // Log userIds to console
    });
  }

  @Input() sidebarData:any;
  logout() {
   
    this.router.navigateByUrl('/login'); 
  }
  modifyUser() {
    this.userService.modifyUser(this.userToModify).subscribe((data) => {
      alert("User Updated Successfully");
      this.getUsers();
      localStorage.setItem('user', JSON.stringify(data));
      window.location.reload();
    }, (error) => {
      console.error("Error modifying user:", error);
      // Handle error appropriately, e.g., show error message to the user
    });
  }
  
  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }

   // function to verify the event
   openModel(user: User = new User()) {
    if (user.idUser == 0) {
        this.userToModify = new User();
    } else {
        this.creatingMode = false;
        this.userToModify = user;
    }
}

}
