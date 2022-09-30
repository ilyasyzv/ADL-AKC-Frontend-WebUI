import { Component, OnInit, ViewChild, OnChanges, } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {Router} from '@angular/router';
import { SKoldataService } from "../services/s-koldata.service";
import { AppService } from "../services/app.service";
import {PageEvent} from '@angular/material/paginator';
import { ModalService } from '../s-modal/s-modal.service';
@Component({
  selector: 'app-s-activity',
  templateUrl: './s-activity.component.html',
  styleUrls: ['./s-activity.component.scss']
})
export class SActivityComponent implements OnInit {
  pageEvent: PageEvent = new PageEvent;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  paginationCount: number = 0;
  selectedValue: string = 'Most relevant';
  //dataSource = [{"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Evaluation of choroidal lesions with swept-source optical coherence tomography.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}, {"id": "Joan_W_Miller", "Name": ["Joan W Miller", "Alesaka Tom", "Tommy Wilson"], "Title": "Novel grid combined with peripheral distortion correction for ultra-widefield image.", "Date":"2010-10", "Keywords": "Lastis"}]
  applyFilter(event: any) {
    var filterValue = event.target.value;
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    /* this.dataSource = this.dataSource.filter(element => {
      return element.Title === filterValue;
    }) */
  }
  
  ElementData = this.dataService
  .getAllPublicationsInit()
  .subscribe((data:any)=>{
    this.dataSource.data = data.publications;
    this.paginationCount = data.total_value
    if (this.dataSource && this.paginator) {
      //this.dataSource.paginator = this.paginator;
      this.dataService.loading = false
    }
  });
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ["id", "name", "Koldetail", "title"];

  displayedColumns = ["id", "Name", "Koldetail", "Title"];

  constructor(public dataService: SKoldataService,public readonly _appService: AppService, private router: Router, public modalService: ModalService) {
    this._appService.invokeEvent.subscribe(() => {
      this.refreshSearchPubs();      
    });
   }
  
  setFilter(text: string) {
    this.selectedValue = text;
    this.refreshSearchPubs();    
  }

  ngOnInit(): void {
    this.dataService.loading = true;
  }
  refreshSearchPubs() {   
    let pageDetails = {
      length: 100,
      pageIndex: 0,
      pageSize: 10,
      previousPageIndex: 0
    }
    this.dataService.loading = true;
    this.dataService.getAllPublications(pageDetails,this.selectedValue)
      .subscribe((data: any) => {  
        this.dataSource.data = data.publications;
        this.paginationCount = data.total_value
        if (this.dataSource && this.paginator) {
          //this.dataSource.paginator = this.paginator;
          this.dataService.loading = false
        }
      });
    
  }
  onPaginateChange(evt:any){
    if(evt.pageIndex<50){
      this.dataService.loading = true;
      this.dataService.getAllPublications(evt,this.selectedValue)
        .subscribe((data: any) => {  
          this.dataSource.data = data.publications;
          this.paginationCount = data.total_value
          if (this.dataSource && this.paginator) {
            //this.dataSource.paginator = this.paginator;
            this.dataService.loading = false
          }
        });
    }else{
      if (this.dataSource && this.paginator) {
        this.paginator.pageIndex = 49;
      }
      this.openModal('maxPublications-modal')
    }
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }
}
