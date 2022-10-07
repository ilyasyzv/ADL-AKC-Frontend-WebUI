import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { SKoldataService } from '../services/s-koldata.service';
import { ModalService } from '../s-modal/s-modal.service';

@Component({
  selector: 'app-s-relations',
  templateUrl: './s-relations.component.html',
  styleUrls: ['./s-relations.component.scss']
})
export class SRelationsComponent implements OnInit {
  cardName: string = '';
  opened?: boolean = false;
  pageEvent: PageEvent = new PageEvent;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  loadtime: number = 0;  
  paginationCount: number = 0;
  ElementData = this.dataService
    .getAllRelationInit()
    .subscribe((data:any)=>{
    this.dataSource.data = data.experts;
    this.paginationCount = data.experts_count
    if (this.dataSource && this.paginator) {
      this.dataService.loading = false
    }
  });
expertDetails: any = [];
authorDetails: any = [];
  constructor(
    public dataService: SKoldataService,
    public readonly _appService: AppService,
    public modalService: ModalService
  ) {
    this._appService.invokeEvent.subscribe(() => {
      this.refreshSearch(); 
    });
  }

  ngOnInit(): void {
    this.dataService.loading = true;
  }

  onPaginateAuthorChange(evt:any){
    this.cardName = '';
    this.opened = false;
    if(evt.pageIndex<14){
      this.dataService.loading = true;
      this.dataService.getAllRelationOnSearch(evt)
        .subscribe((data: any) => {  
          this.dataSource.data = data.experts;
          this.paginationCount = data.experts_count
          if (this.dataSource && this.paginator) {
            this.dataService.loading = false
          }
        });
    }else{
      if (this.dataSource && this.paginator) {
        this.paginator.pageIndex = 13;
      }
      this.openModal('maxRelations-modal')
    }
  }
  refreshSearch() {   
    let pageDetails = {
      length: 100,
      pageIndex: 0,
      pageSize: 10,
      previousPageIndex: 0
    }    
    this.dataService.loading = true;
    this.dataService.getAllRelationOnSearch(pageDetails)
      .subscribe((data: any) => {  
        data.experts.forEach((element:any) => {
          this.dataService.getAllExpertsDetails(element.name).subscribe(experts=>{
            element.expert_recent = experts[0]
            element.expert_facets = experts[1]
          })
        })
        this.dataSource.data = data.experts;
        this.paginationCount = data.experts_count
        if (this.dataSource && this.paginator) {
            this.paginator.pageIndex = 0;
          this.dataService.loading = false
        }
      });
    
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }
  getAuthorsDetails(data:any): void{
    this.opened = !this.opened;  
    this.expertDetails=[]
    this.authorDetails=[]
    this.cardName = data.name;
    this.authorDetails.push(this.cardName)
    this.dataService.getAllExpertsDetails(data.name).subscribe(experts=>{
      this.expertDetails = experts;
    })
    data.relevant_co_authors.forEach((author:any) => {
      this.dataSource.data.forEach((expert:any) => {
       if(author.name === expert.name){
        this.authorDetails.push(author.name)
        }
      })
    })
  }
}
