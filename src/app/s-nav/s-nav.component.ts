import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { MatRippleModule } from "@angular/material/core";
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { AppService } from "../services/app.service";

@Component({
  selector: "app-s-nav",
  templateUrl: "./s-nav.component.html",
  styleUrls: ["./s-nav.component.scss"],
})
export class SNavComponent {
  activeBtn = '';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute, public _appService: AppService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.activeBtn = event.url 
        this._appService.pageTitle = this.activeBtn.split('/')[1]
        if(this._appService.pageTitle === 'dashboard'){
          this._appService.pageTitle = 'Dashboard'
        }else if(this._appService.pageTitle === 'recentactivity'){
          this._appService.pageTitle = 'Recent publications'
        }else if(this._appService.pageTitle === 'recenthistory'){
          this._appService.pageTitle = 'Recent history'
        }else if(this._appService.pageTitle === 'projects'){
          this._appService.pageTitle = 'Projects'
        }
      };
    });
  }
  activeRouter(link:string){
    this.activeBtn = link
  }

}
