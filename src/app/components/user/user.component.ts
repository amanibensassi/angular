import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userList : User[] = [];
  userToModify : User = new User(); 
  creatingMode : boolean = true;
  

  constructor(private userService: UserService,){
    this.getUsers();
  }
  getUsers(){
    this.userService.getUsers().subscribe((response : User[])=>{
      this.userList = response;
      //console.log(response.map(user => user.idUser)); // Log userIds to console
    });
  }

    //Delete User
    deleteUser(userId : number){
      if(confirm("Are you sure you want to delete this user !!!")){
        this.userService.removeUser(userId).subscribe(()=>{
          alert("User Deleted Successfully");
          window.location.reload();
        });
      }
    }

    modifyUser(){
      this.userService.modifyUser(this.userToModify).subscribe(()=>{
        //alert("User Updated Successfully");
        this.getUsers();
        window.location.reload();
      })


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
