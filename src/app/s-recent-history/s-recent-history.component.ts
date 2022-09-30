import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from "../services/app.service";
import { SKoldataService } from '../services/s-koldata.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-s-recent-history',
  templateUrl: './s-recent-history.component.html',
  styleUrls: ['./s-recent-history.component.scss']
})
export class SRecentHistoryComponent implements OnInit {

  constructor(public readonly _appService: AppService, private router: Router, public dataservice: SKoldataService, public httpClient: HttpClient) {
    this.dataservice.getSearchHistory()
  }
  
  public refresh(name:string): void {
    this._appService.input = name;
    this.router.navigate(['/dashboard']).then(()=>{
      this._appService.refreshSearch();
    });
  }

  ngOnInit(): void {
    
  }

}
