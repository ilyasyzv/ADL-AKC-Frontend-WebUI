import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { SKoldataService } from "../services/s-koldata.service";
import { AppService } from "../services/app.service";
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '../s-modal/s-modal.service';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: "app-s-kol-table",
  templateUrl: "./s-kol-table.component.html",
  styleUrls: ["./s-kol-table.component.scss"],
})
export class SKolTableComponent implements OnInit, OnChanges, OnDestroy {
  title = 'highlight-text';
  pageEvent: PageEvent = new PageEvent;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  itemCount: number = 0;  
  paginationCount: number = 0;
  applyFilter(event: any) {
    var filterValue = event.target.value;
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
     if(this.dataSource.filter !== ''){
      this.paginationCount = this.dataSource.filteredData.length
    }else{
      this.paginationCount = this.itemCount
    }
  }
  activeBtnType = 'Work';
  activeTabLoader: number = 0;
  displayedColumns = ["id", "Name", "Koldetail", "Title"];
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
    this.paginationCount = data[1].experts_count;
    this.itemCount = data[1].experts_count;
    if (this.dataSource && this.paginator) {
      //this.dataSource.paginator = this.paginator;
      this.dataService.loading = false
    }
  });
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  menuActive:boolean = false
  inputActive: boolean = false;
  selectedOptions: any[] = []
  input: string = "";
  selectedDetails: string = 'Publications';
  selectedPerPage: number = 10;
  location: any[] = [];
  filterStatus: string = 'Filtering';
  locationStatus: string = ''

  constructor(
    public dataService: SKoldataService,
    public readonly _appService: AppService,
    public modalService: ModalService
  ) {
    this._appService.invokeEvent.subscribe(() => {
      this.refreshSearch(); 
    });
    this._appService.searchAutor.subscribe((val) => {
      if(!this._appService.searchResults.includes(val.name) && val.name !== ''){
        this._appService.searchResults.unshift(val);    
       }      
      });this.dataService.getAllLocations().subscribe((val:any) => {
        this.options = val.locations
      });
  }

  public get value(): string {
    return this._appService.input;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter(option => this._normalizeValue(option).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  
  refreshSearch() {   
    let pageDetails = {
      length: 100,
      pageIndex: 0,
      pageSize: 100,
      previousPageIndex: 0
    }
    this.dataService.loading = true;
    this.dataService.getJsonDataFromServerRefresh(pageDetails,this.location)
      .subscribe((data: any) => {  
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
            this.paginator.pageIndex = 0;
          this.dataService.loading = false
        }
      });
    
  }

  activeTabs(tab:string, value:number){
    this.activeTabLoader = value;
    this.activeBtnType = tab
  }

  onPaginateChange(evt:any){
    if(evt.pageIndex<50){
      this.dataService.loading = true;
      this.dataService.getJsonDataFromServerRefresh(evt,this.location)
        .subscribe((data: any) => {  
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
    }else{
      if (this.dataSource && this.paginator) {
        this.paginator.pageIndex = 49;
      }
      this.openModal('maxExpert-modal')
    }
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    if (this.menuActive === false) {
      this.inputActive = false
    }
  }

  addOption(option: string) {
    this.selectedOptions = [...this.selectedOptions, { id: this.selectedOptions.length, title: option }]
    this.location = this.selectedOptions.map(val=>val.title)
    this.myControl.reset()
    this.refreshSearch();
    this.filterStatus = 'Filters applied';
  }

  removeOption(id: number) {
    this.selectedOptions = this.selectedOptions.filter((el) => {
      return el.id !== id
    })
    this.location = this.selectedOptions.map(val=>val.title)
    this.refreshSearch();
    if(this.location.length===0){
      this.filterStatus = 'Filtering';
    }
  }

  showInput() {
    this.inputActive = true
  }

  onInput(a_oEvent:any): void {
    this.input = a_oEvent.currentTarget.value;
  }

  clear() {
    this.dataSource.filter = ""
  }

  setDetails(text: string) {
    this.selectedDetails = text;
  }

  setPerPage(perPage: number) {
    this.selectedPerPage = perPage;
  }

  setFilter(event: any) {
    this.filterStatus = event.target.value
  }
  
  ngOnChanges() {
  }

  ngOnDestroy(){
    
  }
}