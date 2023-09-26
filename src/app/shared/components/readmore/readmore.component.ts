import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'readmore',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div [innerHTML]="text" [class.collapsed]="isCollapsed" [style.height]="isCollapsed ? maxHeight+'px' : 'auto'">
        </div>
            <a *ngIf="isCollapsable" (click)="isCollapsed =! isCollapsed">Read {{isCollapsed? 'more':'less'}}</a>
    `,
  styles: [`
        div.collapsed {
            overflow: hidden;
        }
    `]
})
export class ReadmoreComponent implements AfterViewInit {
  //the text that need to be put in the container
  @Input() text: string | undefined;

  //maximum height of the container
  @Input() maxHeight: number = 10;

  //set these to false to get the height of the expended container
  public isCollapsed: boolean = false;
  public isCollapsable: boolean = false;
  constructor(private elementRef: ElementRef) {

  }
  ngAfterViewInit(): void {
    let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
    //collapsable only if the contents make container exceed the max height
    console.log(currentHeight)
    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  }

}
