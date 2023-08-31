import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedComponent} from "../shared/components/feed/feed.component";
import {ErrormessageComponent} from "../shared/components/errormessage/errormessage.component";
import {PopulartagsComponent} from "../shared/components/populartgs/populartags.component";
import {FeedtogglerComponent} from "../shared/components/feedtoggler/feedtoggler.component";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'tagfeed',
  standalone: true,
  imports: [CommonModule, FeedComponent, ErrormessageComponent, PopulartagsComponent, FeedtogglerComponent],
  templateUrl: './tagfeed.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagfeedComponent implements OnInit {
  apiUrl: string = ''
  tagName: string = ''
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.tagName = params['slug']
        this.apiUrl = `/articles?tag=${this.tagName}`
      })
    }

}
