import { Component } from '@angular/core';
import { ManagementService } from 'src/app/services/management.service';

@Component({
  selector: 'app-management-charts',
  templateUrl: './management-charts.component.html',
  styleUrls: ['./management-charts.component.css']
})
export class ManagementChartsComponent {
  chartOptions: any[] = [];
  equipementsData: any[] = [];
  constructor(private managementService: ManagementService){
    this.managementService.calculateManagementStatistics().subscribe((pieData: any) => {
      const pieDataPoints = [];
      console.log(pieData);
      for (const type in pieData) {
        if (pieData.hasOwnProperty(type)) {
          console.log(type);
          console.log(pieData[type]);
          pieDataPoints.push({ y: pieData[type], label: type });
        }
      }
      const pieChartOptions = {
        animationEnabled: true,
     //   theme: "light2",
        title: {
          text: "Classroom usage "
        },
        data: [
          {
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
  }
}
