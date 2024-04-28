import { Component } from '@angular/core';
import { EquipementService } from 'src/app/services/equipement.service';

@Component({
  selector: 'app-equipement-charts',
  templateUrl: './equipement-charts.component.html',
  styleUrls: ['./equipement-charts.component.css']
})
export class EquipementChartsComponent {
  chartOptions: any[] = [];
  equipementsData: any[] = [];
  constructor(private equipementService: EquipementService){
    this.equipementService.calculateEquipmentStatistics().subscribe((pieData: any) => {
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
          text: "Costs per equipement"
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

