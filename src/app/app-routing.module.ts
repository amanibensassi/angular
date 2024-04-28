import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { EventUserComponent } from './components/event-user/event-user.component';
import { EventDetailsUserComponent } from './components/event-details-user/event-details-user.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketAdminComponent } from './components/ticket-admin/ticket-admin.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './components/user/user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LoginComponent } from './components/login/login.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';
import { ClubComponent } from './components/club/club.component';
import { ClubRegestrationComponent } from './components/club-regestration/club-regestration.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { EventClubComponent } from './components/event-club/event-club.component';
import { RecrutementComponent } from './components/recrutement/recrutement.component';
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
import { EquipementHistoryUserComponent } from './components/equipement-history-user/equipement-history-user.component';
import { EquipementUserComponent } from './components/equipement-user/equipement-user.component';
import { EquipementComponent } from './components/equipement/equipement.component';
import { FeedbackHistoryUserComponent } from './components/feedback-history-user/feedback-history-user.component';
import { FeedbackUserComponent } from './components/feedback-user/feedback-user.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ManagementComponent } from './components/management/management.component';
import { VolunteerTaskComponent } from './components/volunteertask/volunteertask.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { TaskComponent } from './components/task/task.component';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { DetailsUserComponent } from './components/task-details-user/task-details-user.component';
import { VolunteerUserComponent } from './components/volunteer-user/volunteer-user.component';
import { VolunteerDetailsUserComponent } from './components/volunteer-details-user/volunteer-details-user.component';

const routes: Routes = [

  { path: 'events', component: EventComponent },
  { path: 'eventsuser', component: EventUserComponent },
  { path: 'event/:idEvent', component: EventDetailsUserComponent },
  { path: 'buyticket/:idEvent', component: TicketComponent },
  { path: 'tickets/:idEvent', component: TicketAdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'club', component: ClubComponent },
  { path: 'user', component: SimpleUserComponent },
  { path: 'ClubRegister', component: ClubRegestrationComponent },
  { path: 'eventsclub', component: EventClubComponent },
  { path: 'recrutement', component: RecrutementComponent },
  { path: 'recrutementprocess', component: RecrutementprocessComponent },
  { path: 'recrutementuser', component: RecrutementUserComponent },
  { path: 'clubrecrutement', component: RecrutementClubComponent },
  { path: 'process/:idRecrutement', component: ProcessClubComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'interactions', component: InteractionComponent },
  { path: 'publication/user/:id', component: PublicationUserComponent },
  { path: 'publication/users/:id', component: PublicationUserDetailComponent },
  { path: 'recrutementprocessuser/:idRecrutement', component: RecrutementprocessUserComponent },
  { path: 'recrutementprocessdetailsuser/:idProcess', component: RecrutementprocessDetailsUserComponent },
  { path: 'recrutementuserdetails/:idRecrutement', component: RecrutementDetailsUserComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'equipement', component: EquipementComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'management-user/:idEvent', component: ManagementUserComponent },
  { path: 'equipement-user', component: EquipementUserComponent },
  { path: 'equipement-history-user/:idEvent', component: EquipementHistoryUserComponent },
  { path: 'feedback-history-user', component: FeedbackHistoryUserComponent },
  { path: 'feedback-user', component: FeedbackUserComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'tasksuser/:idEvent', component: TaskUserComponent },
  { path: 'task/:idTask', component: DetailsUserComponent },
  { path: 'volunteers', component: VolunteerComponent },
  { path: 'volunteersuser', component: VolunteerUserComponent },
  { path: 'volunteer/:idVolunteer', component: VolunteerDetailsUserComponent },
  { path: 'volunteerstask/:idTask', component: VolunteerTaskComponent },
  { path: 'home', component: HomeComponent },


  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
