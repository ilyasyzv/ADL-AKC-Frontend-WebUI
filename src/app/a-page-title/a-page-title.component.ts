import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-a-page-title',
  templateUrl: './a-page-title.component.html',
  styleUrls: ['./a-page-title.component.scss']
})
export class APageTitleComponent implements OnInit {

  
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
