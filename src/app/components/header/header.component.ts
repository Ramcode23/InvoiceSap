import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { closeSidebar, openSeidebar } from 'src/app/store/actions/ui.actions';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  toggle = true;
  subcripcion!: Subscription;

  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {

  }

  toggleSidebar() {
    if (!this.toggle) {
      this.store.dispatch(openSeidebar());
      return;
    }
    this.store.dispatch(closeSidebar());
  }

  ngOnDestroy(): void {
    this.subcripcion.unsubscribe();
  }
}
