import { Component } from "@angular/core";
import { TicketService } from "../../services/ticket.service";
import { interval } from "rxjs";

@Component({
  selector: 'app-ticket-charts',
  templateUrl: './ticket-charts.component.html',
  styleUrls: ['./ticket-charts.component.css']
})
export class TicketChartsComponent {

  chartOptions: any[] = [];
  eventsData: any[] = [];

  constructor(private ticketService: TicketService) { 
    this.ticketService.getTotalTicketsByDateAchat().subscribe((data: any) => {
      const dataPoints = [];
      const last30Days = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        last30Days.push(date.toISOString().split('T')[0]);
      }
      for (const date of last30Days) {
        const tickets = data[date] || 0;
        dataPoints.push({ y: tickets, label: date });
      }
          const lineChartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Tickets sold in the last 30 days"
        },
        axisX: {
          title: "Date",
          interval: 4 
        },
        axisY: {
          title: "Tickets",
          tickLength: 0,

        },
        data: [{
          type: "spline",
          dataPoints: dataPoints
        }],
        margin: {
          top: 20,
          bottom: 50,
          left: 20,
          right: 20
        }
      };
    
      this.chartOptions.push(lineChartOptions); 
      this.ticketService.getTotalTicketsByTypeAchat().subscribe((pieData: any) => {
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
            text: "Tickets sold by type of purchase"
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
      this.ticketService.getTotalPricesByEvent().subscribe((data: any) => {
        for (const eventId in data) {
          if (data.hasOwnProperty(eventId)) {
            const a = eventId;
            const totalPrice = data[eventId]; 
            this.eventsData.push({ name: a, totalPrice: totalPrice });
          }
        }
      });
    });
  }
}
