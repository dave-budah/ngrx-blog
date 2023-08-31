import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../authentication/store/auth.reducers";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'feedtoggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './feedtoggler.component.html',
  styleUrls: ['./feedtoggler.component.css']
})
export class FeedtogglerComponent {
  @Input() tagName?: string

  currentUser$ = this.store.select(selectCurrentUser)
  constructor(private store: Store) {}

}
