import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {



  subcripcion!: Subscription;
  @Input() toggle!:boolean;
  @ViewChild('drawer') drawer!:MatDrawer;
  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {

  }

   getElement(){

     console.log(this.drawer.opened)
   }

}
