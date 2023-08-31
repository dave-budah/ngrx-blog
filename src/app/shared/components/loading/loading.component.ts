import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

}
