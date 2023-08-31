import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UtilsService} from "../../utils/utils.service";


@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  pagesCount: number = 1
  pages: number[] = []

  @Input() total: number = 0
  @Input() limit: number = 20
  @Input() currentPage: number = 1
  @Input() url: string = ''
  constructor(private utilsService: UtilsService, private router: Router) {
  }

  ngOnInit() {
    this.pagesCount = Math.ceil(this.total / this.limit)
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount): []

  }

}
