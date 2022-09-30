
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from "../services/app.service";
import {PageEvent} from '@angular/material/paginator';
import { ModalService } from '../s-modal/s-modal.service';
import { SKoldataService } from "../services/s-koldata.service";

@Component({
  selector: 'app-a-affiliations',
  templateUrl: './a-affiliations.component.html',
  styleUrls: ['./a-affiliations.component.scss']
})
export class AAffiliationsComponent implements OnInit {
  pageEvent: PageEvent = new PageEvent;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  paginationCount: number = 0;
  ElementData = this.dataService
  .getAllAffiliationsInit()
  .subscribe((data:any)=>{
    this.dataSource.data = data.affiliations;
    this.paginationCount = data.affiliations_count
    if (this.dataSource && this.paginator) {
      this.dataService.loading = false
    }
  });
  displayedColumns = ["id"];
  constructor(public readonly _appService: AppService, public dataService: SKoldataService, public modalService: ModalService) { 
    this._appService.invokeEvent.subscribe(() => {
      this.refreshSearchAffiliations();      
    });
  }

  ngOnInit(): void {    
    this.dataService.loading = true;
  }

  refreshSearchAffiliations() {   
    let pageDetails = {
      length: 100,
      pageIndex: 0,
      pageSize: 10,
      previousPageIndex: 0
    }
    this.dataService.loading = true;
    this.dataService.getAllAffiliationsOnSearch(pageDetails)
      .subscribe((data: any) => {  
        this.dataSource.data = data.affiliations;
        this.paginationCount = data.affiliations_count
        if (this.dataSource && this.paginator) {
          this.dataService.loading = false
        }
      });
    
  }
  onPaginateItemsChange(evt:any){
    if(evt.pageIndex<50){
      this.dataService.loading = true;
      this.dataService.getAllAffiliationsOnSearch(evt)
        .subscribe((data: any) => {  
          this.dataSource.data = data.affiliations;
          this.paginationCount = data.affiliations_count
          if (this.dataSource && this.paginator) {
            this.dataService.loading = false
          }
        });
    }else{
      if (this.dataSource && this.paginator) {
        this.paginator.pageIndex = 49;
      }
      this.openModal('maxAffiliations-modal')
    }
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }
}