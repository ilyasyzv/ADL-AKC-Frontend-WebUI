import { Component, OnInit, Input } from '@angular/core';
import { SKoldataService } from "../services/s-koldata.service";

@Component({
  selector: 'app-s-activity-card',
  templateUrl: './s-activity-card.component.html',
  styleUrls: ['./s-activity-card.component.scss']
})
export class SActivityCardComponent implements OnInit {

  @Input() data: any = {};
  @Input() tabValue: number = 0;  
  id: string = "";
  Name?: string = "";
  Title?: string = "";
  Date?: string = "";
  Keywords?: string = "";
  link?: string = "";
  constructor(public dataService: SKoldataService) { }

  parseDate(date: any) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateParsed = new Date(date);

    if (months[dateParsed.getMonth()] === undefined) {
      return ''
    } else {
      return `${ dateParsed.getDate() } ${ months[dateParsed.getMonth()] } ${ dateParsed.getFullYear() }`
    }
  }

  limitAuthors(authors: any) {
    return authors.slice(0, 3)
  }

  countLastAuthors(authors: any) {
    return authors.length > 3 ? ` and ${ authors.slice(3).length } other authors` : ''
  }

  ngOnInit(): void {
    this.Title = this.data?.title ? this.data?.title : "";
    this.Date = this.data?.posted_date ? this.data?.posted_date : "";
    this.link = this.data?.website_link ? this.data?.website_link: "";
  }

}
