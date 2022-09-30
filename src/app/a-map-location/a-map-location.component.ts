import { Component, OnInit } from '@angular/core';
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-a-map-location',
  templateUrl: './a-map-location.component.html',
  styleUrls: ['./a-map-location.component.scss']
})
export class AMapLocationComponent implements OnInit {

  
  public markers: any[];
  public zoom: number;

  constructor(public readonly _appService: AppService) {
    this.markers = [];
    this.zoom = 2;
  }

  ngOnInit() {
    this.markers.push({
      position: {
        lat: 40.4381311,
        lng: -3.8196233
      },
      label: {
        color: "black",
        text: "Madrid"
      }
    });

    this.markers.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233
      },
      label: {
        color: "black",
        text: "Paris"
      }
    });
  }

}
