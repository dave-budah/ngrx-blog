import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedComponent} from "../shared/components/feed/feed.component";
import {ErrormessageComponent} from "../shared/components/errormessage/errormessage.component";
import {PopulartagsComponent} from "../shared/components/populartgs/populartags.component";
import {FeedtogglerComponent} from "../shared/components/feedtoggler/feedtoggler.component";

@Component({
  selector: 'yourfeed',
  standalone: true,
  imports: [CommonModule, FeedComponent, ErrormessageComponent, PopulartagsComponent, FeedtogglerComponent],
  templateUrl: './yourfeed.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourfeedComponent implements OnInit {
  apiUrl = '/articles/feed'
  constructor() {
  }

  ngOnInit(): void {

    }

}
