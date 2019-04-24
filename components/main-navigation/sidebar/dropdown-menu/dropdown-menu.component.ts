import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.sass']
})
export class DropdownMenuComponent implements OnInit {

  @Input() menus;

  constructor() { }

  ngOnInit() {
  }
}
