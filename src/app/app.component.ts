import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showSidebar: boolean = true;
  showFooter: boolean = true;
  showRouter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;

        // Afficher le sidebar sur toutes les pages sauf sur les pages spécifiques
        this.showSidebar = !(
          url.includes('/error') ||
          url.includes('/login') ||
          url.includes('/ClubRegister') ||
          url.includes('/register') ||
          url.includes('/home') ||
          url.includes('/forgetpassword') ||
          url.includes('/resetpassword')
        );
        this.showFooter = !(
          url.includes('/error') ||
          url.includes('/login') ||
          url.includes('/ClubRegister') ||
          url.includes('/register') ||
          url.includes('/home') ||
          url.includes('/forgetpassword') ||
          url.includes('/resetpassword')
        );
        // Afficher le footer sur toutes les pages
        this.showRouter = true;
      }
    });
  }
}
