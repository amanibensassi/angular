import { Component, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';

@Component({
  selector: 'app-process-chart',
  templateUrl: './process-chart.component.html',
  styleUrls: ['./process-chart.component.css']
})
export class ProcessChartComponent implements OnInit {
  
  pieChartOptions: any;
  columnChartOptions: any;
  barChartOptions: any;
  skillDataPoints: any[];

  constructor(private processService: RecrutementprocessService) {
    this.skillDataPoints = [];
  }

  ngOnInit(): void {
    // Calculer le pourcentage d'approuvement et de non-approuvement
    this.processService.getApprovedProcessCount().subscribe(approvedCount => {
      this.processService.getNonApprovedProcessCount().subscribe(nonApprovedCount => {
        const totalProcesses = approvedCount + nonApprovedCount;
        const approvalPercentage = (approvedCount / totalProcesses) * 100;
        const nonApprovalPercentage = (nonApprovedCount / totalProcesses) * 100;

        // Options du graphique en camembert
        this.pieChartOptions = {
          animationEnabled: true,
          title: {
            text: "Approval Status"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}: {y}%",
            indexLabel: "{label} - {y}%",
            dataPoints: [
              { label: "Approved", y: approvalPercentage },
              { label: "Non-Approved", y: nonApprovalPercentage }
            ]
          }]
        };

        // Afficher le graphique à camembert une fois que les données sont prêtes
        const pieChart = new CanvasJS.Chart("pie-chart-container", this.pieChartOptions);
        pieChart.render();
      });
    });

    // Récupérer les données de pourcentage de sélection des compétences et créer les options du graphique à colonnes
    this.processService.getSkillSelectionPercentage().subscribe((data: any) => {
      console.log(data);
      this.skillDataPoints = Object.keys(data).map(skill => ({ label: skill, y: data[skill] }));
      
      this.barChartOptions = {
        animationEnabled: true,
        title: {
          text: "Skill Selection Percentage"        },
        axisX: {
          title: "Skill",
          labelFontSize: 8
        },
        axisY: {
          title: "Percentage",
          suffix: "%"
        },
        data: [{
          type: "column",
          dataPoints: this.skillDataPoints
        }]
      };
      
      const barChart = new CanvasJS.Chart("bar-chart-container", this.barChartOptions);
      barChart.render();
    });
  }
}
