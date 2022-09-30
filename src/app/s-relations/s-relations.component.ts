import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { SKoldataService } from '../services/s-koldata.service';

@Component({
  selector: 'app-s-relations',
  templateUrl: './s-relations.component.html',
  styleUrls: ['./s-relations.component.scss']
})
export class SRelationsComponent implements OnInit {
  opened?: boolean;
  pageEvent: PageEvent = new PageEvent;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  loadtime: number = 0;  
  paginationCount: number = 0;
  ElementData = this.dataService
    .getJsonDataFromServer()
    .subscribe((data:any)=>{
    data[1].experts.forEach((element:any) => {
      this.dataService.getAllExpertsDetails(element.name).subscribe(experts=>{
        element.expert_recent = experts[0]
        element.expert_facets = experts[1]
      })
    })
    this.dataSource.data = data[1].experts;
    this.paginationCount = data[1].experts_count
    if (this.dataSource && this.paginator) {
      //this.dataSource.paginator = this.paginator;
      this.dataService.loading = false
    }
  });

  constructor(
    public dataService: SKoldataService,
    public readonly _appService: AppService
  ) {}

  ngOnInit(): void {
  }



}
