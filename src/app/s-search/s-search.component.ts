import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-s-search",
  templateUrl: "./s-search.component.html",
  styleUrls: ["./s-search.component.scss"],
})
export class SSearchComponent implements OnInit {
  public searchKeywords: string = "";

  constructor(public readonly _appService: AppService) {}

  public input: string = "";

  public onInput(a_oEvent:any): void {
    this.input = a_oEvent.currentTarget.value;
    this._appService.input = a_oEvent.currentTarget.value;
  }
  
  public refresh(): void {
    this._appService.refreshSearch();
  }

  ngOnInit(): void {
    
    this.input = this._appService.input;
    this._appService.refreshSearch();
  }

  clear() {
    this._appService.input = ""
    this.refresh()
  }
}
