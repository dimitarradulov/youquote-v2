import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
