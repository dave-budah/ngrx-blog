import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularTagType} from "../../types/populartag.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'taglist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './taglist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaglistComponent {
  @Input() tags: PopularTagType[] = []
}
