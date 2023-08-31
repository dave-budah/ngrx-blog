import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {TopbarComponent} from "./shared/components/topbar/topbar.component";
import {authActions} from "./authentication/store/auth.actions";
import {Store} from "@ngrx/store";
import {TruncatePipe} from "./shared/types/truncate.pipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, TopbarComponent],

})
export class AppComponent implements OnInit {
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
