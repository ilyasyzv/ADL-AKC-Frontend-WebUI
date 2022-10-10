import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Toast } from './toast.interface';

@Component({
  selector: 's-toaster',
  templateUrl: './s-toaster.component.html',
  styleUrls: ['./s-toaster.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToasterComponent {
  @Input() toast?: Toast;
  @Input() i?: number;

  @Output() remove = new EventEmitter<number>();
}