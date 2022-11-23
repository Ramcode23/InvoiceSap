import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';

import { StoreModule } from '@ngrx/store';
import { uiReducer } from '../store/reducers/ui.reducer';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MainRoutingModule } from '../pages/main/main-routing.module';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogMessageComponent,
    SidebarComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    StoreModule.forFeature('ui', uiReducer),

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    DialogMessageComponent,
    SidebarComponent,
    MenuItemComponent,

  ]
})
export class ComponenstModule { }
