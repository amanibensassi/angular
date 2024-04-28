export class Publication {
    idPublication!: number;
    body!: string;
    datePublication!: Date;
    interactions!: any[]; // Update to match the structure of Interaction model if available
    event!: any; // Update to match the structure of Event model if available
    user!: any; // Update to match the structure of User model if available

   
}
