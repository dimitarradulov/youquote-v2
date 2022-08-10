import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-links',
  templateUrl: './navbar-links.component.html',
  styleUrls: ['./navbar-links.component.scss'],
})
export class NavbarLinksComponent implements OnInit {
  @Input() isHorizontal = true;

  constructor() {}

  ngOnInit(): void {}
}
