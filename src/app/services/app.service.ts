import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
/* import { searchAutor } from "../interfaces/route-history.interface"; */

@Injectable({
  providedIn: 'root'
})
export class AppService {

  input: string = '';
  invokeEvent: Subject<any> = new Subject(); 
  searchAutor: Subject<any> = new Subject();
  pageTitle : string = '';
  userName: any = '';
  tokenId: any = '';
  
  searchResults : any[] = [];
  refreshSearch () {
    this.invokeEvent.next();
  }
}
