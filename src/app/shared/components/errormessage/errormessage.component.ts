import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'errormessage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errormessage.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrormessageComponent {
  @Input() message: string = 'Something went wrong'

}
