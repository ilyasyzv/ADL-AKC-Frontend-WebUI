import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { AppService } from "../services/app.service";
import { BaseChartDirective} from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType,ChartOptions,ChartDataSets,Chart } from "chart.js";
import { Subject, BehaviorSubject } from "rxjs";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ModalService } from "../s-modal";
import { MatMenuTrigger } from "@angular/material/menu";
import { ToasterService } from "../s-toaster/s-toaster.service";
import { Toast } from "../s-toaster/toast.interface";
@Component({
  selector: "app-s-kol-card",
  templateUrl: "./s-kol-card.component.html",
  styleUrls: ["./s-kol-card.component.scss"],
})
export class SKolCardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  [x: string]: any;
  @Input() data: any = {};
  @Input() tabValue: number = 0;
  id: string = "";
  Name?: string = "";
  Title?: string = "";
  NumPapers?: number = 0;
  NumPresentations?: number = 0;
  NumGrants?: number = 0;
  NetworkSize?: number = 0;
  MostRecent?: string = "";
  MostRecent2?: string = "";
  MostRecent3?: string = "";
  MostRecentURL?: string = "";
  MostRecentURL2?: string = "";
  MostRecentURL3?: string = "";
  PubFigure?: SafeResourceUrl = "";
  OrgFigure?: SafeResourceUrl = "";
  NworkFigure?: SafeResourceUrl = "";
  expertActiveTab: string = 'Publications';
  rows: number = 1;
  colors: string = 'blue';
  locations:any[]=[];
  public chartColors: Array<any> = [{
    backgroundColor: '#00AEEF',
    hoverBackgroundColor: '#003595'}]
  public chartOptions: ChartOptions = {
       responsive: true,
       maintainAspectRatio: false,
     tooltips: {
      enabled: true,
      mode: 'index',
    },
     scales: {
       xAxes: [{
         stacked: true,
         ticks: {
           fontColor: 'black',
           beginAtZero: true,
         },
         gridLines: {
           color: '#fff'
         }
       }],
       yAxes: [{
         stacked: true,
         ticks: {
           fontColor: 'black',
           min: 0,
           max: 40,
           stepSize:20,
           beginAtZero: true,
   
         },
         gridLines: {
           color: '#dbd9d9'
         }
       }]
     },
     legend: {
       display: true,
       labels: {
         fontColor: 'black'
       }
     },

     animation: {
      duration: 0,
     },
     };
     public chartType: string = 'bar';
     public chartLabels: string[] = ['2017', '2018', '2019', '2020', '2021', '2022'];
     public chartData:  any[] = [
      {
      data: [0,1,10,0,0,0]
    }];
     public testingSubject$ = new BehaviorSubject(this.chartData);
     public chartColors$ = new BehaviorSubject(this.chartColors);
     public chartOption$ = new BehaviorSubject(this.chartOptions);
     public barChartLegend = false;	
  yearsArray = [{year:"2001", pub:0},{year:"2002", pub:0},{year:"2003", pub:0},{year:"2004", pub:0},{year:"2005", pub:0},{year:"2006", pub:0},{year:"2007", pub:0},{year:"2008", pub:0},{year:"2009", pub:0},{year:"2010", pub:0},{year:"2011", pub:0},{year:"2012", pub:0},{year:"2013", pub:0},{year:"2014", pub:0},{year:"2015", pub:0},{year:"2016", pub:0},{year:"2017", pub:0},{year:"2018", pub:0},{year:"2019", pub:0},{year:"2020", pub:0},{year:"2021", pub:0},{year:"2022", pub:0}]
  pageSlice: any[] = this.data.expert_facets?.co_authors.slice(0, 10)
  searchText?: string = ""
  dataSource = [
    {"id": "1", "pro_name": "LA workshop September", "experts_quan": "0", "created_at": "Aug 3, 2022", "updated": false},
    {"id": "2", "pro_name": "Atlanta conference 2022", "experts_quan": "8", "created_at": "Jul 22, 2022", "updated": true},
    {"id": "3", "pro_name": "Best KOLs in Glaucoma", "experts_quan": "12", "created_at": "Jan 10, 2022", "updated": true},
  ]

  constructor(
    public sanitizer: DomSanitizer,
    public readonly _appService: AppService, 
    private modalService: ModalService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.Name = this.data.name ? this.data.name : "";
    this.Title = this.data.Title ? this.data.Title[0] : "";
    this.locations = this.data
    this.MostRecent = this.data.MostRecent ? this.data.MostRecent : "";
    this.MostRecent2 = this.data.MostRecent2 ? this.data.MostRecent2 : "";
    this.MostRecent3 = this.data.MostRecent3 ? this.data.MostRecent3 : "";
    this.NumPapers = this.data.number_of_relevant_publications ? this.data.number_of_relevant_publications : 0;
    this.NumPresentations = this.data.NumPresentations
      ? this.data.NumPresentations
      : 0;
    this.NumGrants = this.data.NumGrants ? this.data.NumGrants : 0;
    this.NetworkSize = this.data.NetworkSize ? this.data.NetworkSize : 0;
    this.MostRecentURL = this.data.MostRecentURL ? this.data.MostRecentURL : "";
    this.MostRecentURL2 = this.data.MostRecentURL2
      ? this.data.MostRecentURL2
      : "";
    this.MostRecentURL3 = this.data.MostRecentURL3
      ? this.data.MostRecentURL3
      : "";

    this.PubFigure = this.data.PubFigure
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.PubFigure)
      : "";
    this.OrgFigure = this.data.OrgFigure
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.OrgFigure)
      : "";
    this.NworkFigure = this.data.OrgFigure
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.NworkFigure)
      : "";

    this.pageSlice = this.data.expert_facets?.co_authors.slice(0, 10)

    this.searchText = this._appService.input

    // this.testData = [
    //   {name: "Alcon", percentage: 20},
    //   {name: "Carl Zeis", percentage: 30},
    //   {name: "Schwind", percentage: 20},
    //   {name: "Bausch & Lomb", percentage: 20},
    //   {name: "Jhonson & Jhonson", percentage: 6.7},
    //   {name: "Nidek", percentage: 6.7},
    // ]
  }
  loadData(arr:any){
    //this.chartData = [{data:[]}]
    let graph : any[] = [
      {
        data:[0,0,0,0,0,0]
    }];
    arr.forEach((ele:any) => {
          let getidx;
          if(ele.year === '2020'){
            getidx = 3
          }else{
            getidx = Number(Number(ele.year.split('20')[1]) - 17)
          }
          graph[0].data.splice(getidx, 0, ele.number)
      });
      this.chartColors = [{
        backgroundColor: '#00AEEF',
        hoverBackgroundColor: '#003595'}]
      this.chartOptions = {
           responsive: false,
         tooltips: {
          enabled: true,
          mode: 'index',
        },
         scales: {
           xAxes: [{
             stacked: true,
             ticks: {
               fontColor: 'black',
               beginAtZero: true,
             },
             gridLines: {
               color: '#fff'
             }
           }],
           yAxes: [{
             stacked: true,
             ticks: {
               fontColor: 'black',
               min: 0,
               max: 40,
               stepSize:20,
               beginAtZero: true,
       
             },
             gridLines: {
               color: '#dbd9d9'
             }
           }]
         },
         legend: {
           display: true,
           labels: {
             fontColor: 'black'
           }
         },
    
         animation: {
          duration: 0
         },
         };
    this.chartData = graph
    this.testingSubject$ = new BehaviorSubject(this.chartData);
    this.chartColors$ = new BehaviorSubject(this.chartColors);
    this.chartOption$ = new BehaviorSubject(this.chartOptions);
    let style = {
      'display': 'block'
    }
    return style
  }
  barTop(arr:any){
    var styles;
    this.data?.expert_facets?.publications_by_years.forEach((element:any) => {
      if(arr?.year === element.year){        
        styles = {
          'top': 184 - ( 2.8 * element.number) + 'px'
        };
      }
    });
    return styles;
  }
  onPaginateChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize

    if (endIndex > this.data.expert_facets?.co_authors?.length) {
      endIndex = this.data.expert_facets?.co_authors?.length
    }

    this.pageSlice = this.data.expert_facets?.co_authors.slice(startIndex, endIndex)
  }
  epertTabs(tab:string){
    this.pageSlice = this.data.expert_facets?.co_authors.slice(0, 10)
    this.expertActiveTab = tab;
  }
  calculateWidth(vendors:any, count:any){
    const countSum = vendors.reduce((accumulator:any, object:any) => {
      return accumulator + object.count;
    }, 0);

    // console.log(this.data.expert_facets.vendors)
    return count*100/countSum+'%'
  }
  background(vendors:any, count:any){
    const countSum = vendors.reduce((accumulator:any, object:any) => {
      return accumulator + object.count;
    }, 0);

    const percentage = count*100/countSum

    return `rgba(0, 53, 149, ${percentage < 34 ? '40%' : percentage+'%'})`
  }
  percentageValue(vendors:any, count:any){
    const countSum = vendors.reduce((accumulator:any, object:any) => {
      return accumulator + object.count;
    }, 0);

    return Math.round(count*100/countSum)
  }

  openModal(id: string, name?: string): void {
    this.modalService.open(id);
    this.deleteProjectName = name
    this.trigger?.closeMenu()
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }

  showSuccessToaster(expert_name: string | undefined, project_name: string) {
    this.toaster.show('success', expert_name, project_name);
  }
  // showErrorToaster() {
  //   this.toaster.show('error', 'Check it out!', 'This is a error alert');
  // }
  // showWarningToaster() {
  //   this.toaster.show('warning', 'Check it out!', 'This is a warning alert', 3000);
  // }
}
