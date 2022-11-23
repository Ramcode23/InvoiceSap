import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/types/AppRoutes';
import { MenuIcons } from 'src/app/types/MenuIcons';
import { MenuItem } from 'src/app/types/MenuItem.type';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      name: 'Companies',
      icon: MenuIcons.COMPANY,
      path: AppRoutes.COMPANY
    },
    {
      name: 'Invoices',
      icon: MenuIcons.INVOICE,
      path: AppRoutes.INVOICE
    },

    {
      name: 'Logout',
      icon: MenuIcons.LOGOUT,
      path: AppRoutes.LOGOUT
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
