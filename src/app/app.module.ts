import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventUserComponent } from './components/event-user/event-user.component';
import { EventDetailsUserComponent } from './components/event-details-user/event-details-user.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketAdminComponent } from './components/ticket-admin/ticket-admin.component';
import { TicketChartsComponent } from './components/ticket-charts/ticket-charts.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './components/user/user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ClubComponent } from './components/club/club.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClubRegestrationComponent } from './components/club-regestration/club-regestration.component';
import { HomeComponent } from './components/home/home.component';
import { EventClubComponent } from './components/event-club/event-club.component';
import { RecrutementComponent } from './components/recrutement/recrutement.component';
import { ProcessChartComponent } from './components/process-chart/process-chart.component';
import { RecrutementDetailsUserComponent } from './components/recrutement-details-user/recrutement-details-user.component';
import { RecrutementUserComponent } from './components/recrutement-user/recrutement-user.component';
import { RecrutementprocessDetailsUserComponent } from './components/recrutementprocess-details-user/recrutementprocess-details-user.component';
import { RecrutementprocessUserComponent } from './components/recrutementprocess/recrutementprocess-user.component';
import { RecrutementprocessComponent } from './components/recrutementprocessuser/recrutementprocess.component';
import { RecrutementClubComponent } from './components/recrutement-club/recrutement-club.component';
import { ProcessClubComponent } from './components/process-club/process-club.component';
import { PublicationComponent } from './components/publication/publication.component';
import { InteractionComponent } from './components/interaction/interaction.component';
import { PublicationUserDetailComponent } from './components/publication-user-detail/publication-user-detail.component';
import { PublicationUserComponent } from './components/publication-user/publication-user.component';
import { CommonModule } from '@angular/common';
import { EquipementHistoryUserComponent } from './components/equipement-history-user/equipement-history-user.component';
import { EquipementUserComponent } from './components/equipement-user/equipement-user.component';
import { EquipementComponent } from './components/equipement/equipement.component';
import { FeedbackHistoryUserComponent } from './components/feedback-history-user/feedback-history-user.component';
import { FeedbackUserComponent } from './components/feedback-user/feedback-user.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ManagementHistoryUserComponent } from './components/management-history-user/management-history-user.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ManagementComponent } from './components/management/management.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { VolunteerUserComponent } from './components/volunteer-user/volunteer-user.component';
import { VolunteerDetailsUserComponent } from './components/volunteer-details-user/volunteer-details-user.component';
import { TaskComponent } from './components/task/task.component';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { DetailsUserComponent } from './components/task-details-user/task-details-user.component';
import { VolunteerTaskComponent } from './components/volunteertask/volunteertask.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EquipementChartsComponent } from './components/equipement-charts/equipement-charts.component';
import { ManagementChartsComponent } from './components/management-charts/management-charts.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestPasswordComponent } from './components/rest-password/rest-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    EventComponent,
    EventUserComponent,
    EventDetailsUserComponent,
    TicketComponent,
    TicketAdminComponent,
    TicketChartsComponent,
    ErrorComponent,
    FooterComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    ClubComponent,
    SimpleUserComponent,
    AdminComponent,
    ClubRegestrationComponent,
    HomeComponent,
    EventClubComponent,
    RecrutementComponent,
    RecrutementprocessComponent,
    RecrutementUserComponent,
    RecrutementDetailsUserComponent,
    RecrutementprocessDetailsUserComponent,
    RecrutementprocessUserComponent,
    ProcessChartComponent,
    RecrutementClubComponent,
    ProcessClubComponent,
    PublicationComponent,
    InteractionComponent,
    PublicationComponent,
    PublicationUserComponent,
    PublicationUserDetailComponent,
    FeedbackComponent,
    ManagementComponent,
    EquipementComponent,
    EquipementUserComponent,
    FeedbackUserComponent,
    ManagementUserComponent,
    ManagementHistoryUserComponent,
    EquipementHistoryUserComponent,
    FeedbackHistoryUserComponent,
    DetailsUserComponent,
    VolunteerComponent,
    VolunteerUserComponent,
    VolunteerDetailsUserComponent,
    TaskComponent,
    TaskUserComponent,
    TaskComponent,
    VolunteerTaskComponent,
    CalendarComponent,
    EquipementChartsComponent,
    ManagementChartsComponent,
    ForgetPasswordComponent,
    RestPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    CanvasJSAngularChartsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
