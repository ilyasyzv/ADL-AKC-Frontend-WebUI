import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "aws-amplify";

import { AppService } from "../services/app.service";
import { forkJoin } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class SKoldataService {
  private REST_URL =
    "https://dkkj5bhx4f.execute-api.us-east-1.amazonaws.com/Stage/hello";

  private LOCAL_JSON_URL = "../assets/data/koldata-2.json";
  private GENERAL_REST_URL = "https://jsonplaceholder.typicode.com/posts";
  public apiUrl;
  /* public REST_URL_KOL_SEARCH ="https://dkkj5bhx4f.execute-api.us-east-1.amazonaws.com/Stage/estoauthors"; */

  private token = "";
  public loading: boolean = false;
  public userID: string = '';
  public historyArray: any = [];
  public expertsArray: any = [];
  public places: any = [];
  
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private readonly _appService: AppService) {
    if(window.location.origin === 'https://deep-akc.dev.apps.alconcloud.com' || window.location.origin === 'http://localhost:4200'){
      this.apiUrl = "https://api-akc.deep-akc.dev.apps.alconcloud.com"
    }else if(window.location.origin === 'https://deep-akc.qa.apps.alconcloud.com'){
      this.apiUrl = "https://api-akc.deep-akc.qa.apps.alconcloud.com"
    }else if(window.location.origin === 'https://deep-akc.apps.alconcloud.com'){
      this.apiUrl = "https://api-akc.deep-akc.apps.alconcloud.com"
    }
    //this.getAllLocations()
  }

  public getSearchHistory(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    this.httpClient.get(this.apiUrl+'/history', {headers: apiheaders}).subscribe(data=>{      
      this.historyArray = data;      
    })
  }
  public getJsonDataFromServer(searchKey?: string) {
    /* ** Function parseQueryParam to parse the Key value pair from query parameters
     ** @return the Json object with key value pair
     **   Example parseQueryParam(hash)  returns JsonObject: {"id_token":"xxxxx","expires_in":"xxxx","token_type":"xxx"}
     ** @Input parameters
     **   hash - hashinfo
     **   Example xxxxxx=xxxxx&xxxx=xxx&xx=x
     ** @output parameter
     **    jsonKeyValue - { xxxxx : "xxxx"}
     */
    this.loading = true;
    const parseQueryParam = (hash: any) => {
      var jsonKeyValue: any = {};
      return (jsonKeyValue = hash
        .split("&")
        .reduce((jsonKeyValue: any, item: any) => {
          let parts: any = item.split("=");
          jsonKeyValue[parts[0]] = parts[1];
          return jsonKeyValue;
        }, {}));
    };
    /* ** Function getKeyValue to get the user info from the json object
     ** @return the value retrieved from the key-value pair
     **   Example getKeyValuejsonObj, "preferred_username" returns xxxx
     ** @Input parameters
     **   jsonObj - Object with list of json key value pairs.
     **       Example JsonObject: {"id_token":"xxxxx"}
     **   Key - The key for which the value has to be reterived.
     **       Example Key "id_token"}
     */
    const getKeyValue = (jsonObj: any, key: string) => jsonObj[key] || null;
    const hashinfo = window.location.hash.substring(1);

    const parsedQueryParameter = parseQueryParam(hashinfo);

    this.token = getKeyValue(parsedQueryParameter, "id_token");
    this.token = this.token ? this.token.trim() : "";

    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    const parsedSearchKey = this._appService.input && this._appService.input.toString();
    let page = 1;
    var expertData = this.httpClient.get<any>(this.apiUrl+'/experts?search_query='+this._appService.input+'&page='+page, {headers: apiheaders});
    var searchData = this.httpClient.get<any>(this.apiUrl+'/publications?search_query='+this._appService.input, {headers: apiheaders})
    var solutions = forkJoin([searchData,expertData])
    return solutions;
  }


  public getJsonDataFromServerRefresh(page:any, place:any[]) {
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    let location = place.join('&location=');
    var pageNumber = 1;
    if(page.previousPageIndex < page.pageIndex){
      pageNumber = page.pageIndex + pageNumber
    }else{
      pageNumber = page.previousPageIndex
      if(pageNumber <= 0){
        pageNumber = 1
      }
    }
    if(place.length!==0){
      var expertData = this.httpClient.get<any>(this.apiUrl+'/experts?search_query='+this._appService.input+'&page='+pageNumber+'&location='+location, {headers: apiheaders});
    }else{
      var expertData = this.httpClient.get<any>(this.apiUrl+'/experts?search_query='+this._appService.input+'&page='+pageNumber, {headers: apiheaders});
    }
    
    var searchData = this.httpClient.get<any>(this.apiUrl+'/publications?search_query='+this._appService.input, {headers: apiheaders})
    var solutions = forkJoin([searchData,expertData])
    return solutions;
    
  }  
  public getAllPublicationsInit(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    let sort_type = 'relevant';
    let sort_direction = 'desc';
    var pubsData = this.httpClient.get<any>(this.apiUrl+'/publications?search_query='+this._appService.input+'&sort_type='+sort_type+'&sort_direction='+sort_direction, {headers: apiheaders})
    return pubsData
  }
  public getAllPublications(page:any,sortValue:string){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    let sort_type = 'relevant';
    if(sortValue==='Most recent'){
      sort_type = 'recent';
    }else{
      sort_type = 'relevant';
    }
    var pageNumber = 1;
    if(page.previousPageIndex < page.pageIndex){
      pageNumber = page.pageIndex + pageNumber
    }else{
      pageNumber = page.previousPageIndex
      if(pageNumber <= 0){
        pageNumber = 1
      }
    }
    let sort_direction = 'desc';
    var pubsData = this.httpClient.get<any>(this.apiUrl+'/publications?search_query='+this._appService.input+'&sort_type='+sort_type+'&sort_direction='+sort_direction+'&page='+pageNumber, {headers: apiheaders})
    return pubsData
  }
  public getExpertDetails(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId
    
    ;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    this.httpClient.get(this.apiUrl+'/experts?search_query='+this._appService.input, {headers: apiheaders}).subscribe(data=>{  
      this.expertsArray = data;
      this.expertsArray = this.expertsArray.experts;
    })
  }
  public getAllExpertsDetails(name:string){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var recentData = this.httpClient.get(this.apiUrl+'/expert_recent?expert_name='+name, {headers: apiheaders})
    
    var facetsData = this.httpClient.get(this.apiUrl+'/expert_facets?expert_name='+name, {headers: apiheaders})
    
    var expertCards = forkJoin([recentData,facetsData])
    return expertCards;
  
  }
  public getAllLocations(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var places = this.httpClient.get<any>(this.apiUrl+'/locations?search_query='+this._appService.input, {headers: apiheaders})
    return places
  }
  public getAllAffiliationsInit(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var pageNumber = 1;
    var affiliations = this.httpClient.get<any>(this.apiUrl+'/affiliations?search_query='+this._appService.input+'&page='+pageNumber, {headers: apiheaders})
    return affiliations
  }
  public getAllAffiliationsOnSearch(page:any){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var pageNumber = 1;
    if(page.previousPageIndex < page.pageIndex){
      pageNumber = page.pageIndex + pageNumber
    }else{
      pageNumber = page.previousPageIndex
      if(pageNumber <= 0){
        pageNumber = 1
      }
    }
    var affiliations = this.httpClient.get<any>(this.apiUrl+'/affiliations?search_query='+this._appService.input+'&page='+pageNumber, {headers: apiheaders})
    return affiliations
  }
  
  public getAllRelationInit(){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var pageNumber = 1;
    var relations = this.httpClient.get<any>(this.apiUrl+'/experts?search_query='+this._appService.input+'&page_size=36', {headers: apiheaders});
    return relations
  }
  public getAllRelationOnSearch(page:any){
    
    const TOKEN_HEADER_KEY = "Authorization";
    const TOKEN_HEADER_VALUE = "Bearer " + this._appService.tokenId;

    const apiheaders = new HttpHeaders().set(
      TOKEN_HEADER_KEY,
      TOKEN_HEADER_VALUE
    );
    var pageNumber = 1;
    if(page.previousPageIndex < page.pageIndex){
      pageNumber = page.pageIndex + pageNumber
    }else{
      pageNumber = page.previousPageIndex
      if(pageNumber <= 0){
        pageNumber = 1
      }
    }
    var relations = this.httpClient.get<any>(this.apiUrl+'/experts?search_query='+this._appService.input+'&page_size=36', {headers: apiheaders});
    return relations
  }
}
