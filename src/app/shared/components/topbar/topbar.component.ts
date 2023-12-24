import {ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Store} from "@ngrx/store";
import {combineLatest} from "rxjs";
import {selectCurrentUser} from "../../../authentication/store/auth.reducers";

@Component({
  selector: 'topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent {
  data$ = combineLatest({
    currentUser : this.store.select(selectCurrentUser)
  })

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
  }
}
