import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackendErrorsInterface} from "../../types/backenderrors.interface";

@Component({
  selector: 'errormsg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errormsg.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrormsgComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {}

  errorMsgs: string[] = [];
  constructor() {
  }
  ngOnInit() {
    this.errorMsgs = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join('')
      return `${name} ${messages}`
    })
  }

}
