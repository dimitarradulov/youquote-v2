import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: any;

  @HostListener('window:resize', ['$event']) onResize() {
    this.configureSideNav();
  }

  configureSideNav() {
    const smallScreen = window.innerWidth < 768 ? true : false;
    if (!smallScreen && this.sidenav.opened) this.sidenav.opened = false;
  }
}
