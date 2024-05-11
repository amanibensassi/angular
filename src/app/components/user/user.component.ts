import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasJS } from '@canvasjs/angular-charts';
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
  chartOptions: any[] = [];
  userCountsDataPoints: { label: string, y: number }[] = [];
  role : any;

  constructor(private userService: UserService,private router : Router){
    this.getrole()
    this.getUsers();
    this.userService.countUsersByNiveau().subscribe((pieData: any) => {
      const pieDataPoints = [];
      for (const type in pieData) {
        if (pieData.hasOwnProperty(type)) {
          pieDataPoints.push({ y: pieData[type], label: type });
        }
      }
      const pieChartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "User By Grade"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          startAngle: -90,
          indexLabel: "{label}",
          yValueFormatString: "#",
          dataPoints: pieDataPoints
        }],
        margin: {
          top: 20,
          bottom: 50,
          left: 20,
          right: 20
        }
      };
  
      this.chartOptions.push(pieChartOptions);
    });



   
    // Bar chart setup
    this.userService.countUsersByCreationMonth().subscribe((data: any) => {
      console.log(data);
      
      this.userCountsDataPoints = Object.keys(data).map(month => ({ label: month, y: data[month] }));
      
      const barChartOptions = {
        theme: "light2",
        title: {
          text: "User Counts by Creation Month"
        },
        axisX: {
          title: "Month",
         // labelFontSize: 10
        },
        axisY: {
          title: "User Count",
          interval: 1 
        },
        data: [{
          type: "column",
          dataPoints: this.userCountsDataPoints
        }]
      };

      this.chartOptions.push(barChartOptions);

      // Render the chart
      const chart = new CanvasJS.Chart("bar-chart-container", {
        animationEnabled: true,
        exportEnabled: true,
        ...barChartOptions
      });
      chart.render();
    });
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


getrole(){
  const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
     this.role = user ? user.role : "";
     if(this.role !='admin'){
      this.router.navigateByUrl('/error')
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
