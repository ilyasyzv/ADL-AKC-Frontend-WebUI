import { Component, OnInit, AfterViewInit } from "@angular/core";

declare var Plotly: any;

@Component({
  selector: "app-s-kol-chart",
  templateUrl: "./s-kol-chart.component.html",
  styleUrls: ["./s-kol-chart.component.scss"],
})
export class SKolChartComponent implements OnInit {
  //   public graph = {
  //     data: [
  //         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
  //         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
  //     ],
  //     layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  // };
  id?: string = "";
  constructor() {}

  ngOnInit(): void {
    //SAMPLE
    //     var barchart = {
    //     x: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    //     y: [142, 41, 19, 15, 13, 11, 8, 6, 4, 3],
    //     type: 'bar',
    //     carpet: '#ff0000',
    //     text: ['X', 'Y', 'Z'],
    //     marker: {
    //         color: ['#e14cd7',
    //             '#6767ef',
    //             '#d39e00',
    //             '#17a2b8',
    //             '#e14cd7',
    //             '#d39e00',
    //             '#28a745',
    //             '#d39e00',
    //             '#f16875',
    //             '#17a2b8'
    //         ],
    //     },
    //     showscale: true
    // };

    // TODO get variables for JSON.
    // Hardcoded values
    // var xname = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    // var scatterchart = {
    //     x: xname,
    //     y: [143.5, 52.5, 18.5, 31.5, 20.5, 28.5, 8.5, 28.5, 20.5, 19.5],
    //     type: 'scatter',
    //     marker: {
    //         color: ['rgba(152,124,180,0.9)']
    //     },
    //     mode: 'markers+lines',
    //     name: 'Number of unique investigators',
    //     line: { color: 'black' },
    // };
    // var data = [barchart, scatterchart];

    // var layout = {
    //     showlegend: false,
    //     plot_bgcolor: "#e9e9e9",
    //     xaxis: {
    //         tickangle: 45,
    //         gridwidth: 2,
    //         title: 'Product',
    //     },
    //     yaxis: {
    //         zeroline: true,
    //         gridwidth: 2,
    //         title: 'Total Citations',
    //     },
    //     bargap: 0.05,

    // };

    // var config = { responsive: true }

    // Plotly.newplot("#kol-chart",data,layout,config);
    // var data = [
    //   {
    //     x: ["2015", "2016", "2017", "2018", "2019", "2020"],
    //     y: [20, 14, 23, 15, 45,30],
    //     type: "bar",
    //   },
    // ];
    // var  layout = [{width: "320", height: "240"}];

    // SAMPLE 2
    //     var barchart = {
    //     x: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    //     y: [142, 41, 19, 15, 13, 11, 8, 6, 4, 3],
    //     type: 'bar',
    //     // carpet: '#ff0000',
    //     text: ['X', 'Y', 'Z'],
    //     marker: {
    //         color: ['#e14cd7',
    //             '#6767ef',
    //             '#d39e00',
    //             '#17a2b8',
    //             '#e14cd7',
    //             '#d39e00',
    //             '#28a745',
    //             '#d39e00',
    //             '#f16875',
    //             '#17a2b8'
    //         ],
    //     },
    //     // showscale: true
    // };

    // TODO get variables for JSON.
    // Hardcoded values
    // var xname = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    // var scatterchart = {
    //     x: xname,
    //     y: [143.5, 52.5, 18.5, 31.5, 20.5, 28.5, 8.5, 28.5, 20.5, 19.5],
    //     type: 'scatter',
    //     marker: {
    //         color: ['rgba(152,124,180,0.9)']
    //     },
    //     mode: 'markers+lines',
    //     name: 'Number of unique investigators',
    //     line: { color: 'blue' },
    // };
    // var data = [barchart, scatterchart];

    // var layout = {
    //     showlegend: true,
    //     plot_bgcolor: "FFFFFF",
    //     xaxis: {
    //         tickangle: 45,
    //         gridwidth: 2,
    //         title: 'Product',
    //     },
    //     yaxis: {
    //         zeroline: true,
    //         gridwidth: 2,
    //         title: 'Total Citations',
    //     },
    //     bargap: 0.05,

    // };

    // var config = { responsive: true };

    // Plotly.newPlot("myDiv", data, "", config );
    // Plotly.newPlot("myDiv", data, layout, config);

    // SAMPLE 3
    var trace1 = {
      type: "bar",
      x: [1, 2, 3, 4],
      y: [5, 10, 2, 8],
      marker: {
        color: "#003595",
        line: {
          width: 2.5,
        },
      },
    };

    var data = [trace1];

    var layout = {
      font: { size: 18 },
    };

    var config = { responsive: true };

    Plotly.newPlot("myDiv", data, layout, config);
  }

  ngAfterViewInit() {
    // Plotly.newPlot(
    //     ,
    //     this.rideShareGraph.data,
    //     this.rideShareGraph.layout,
    //     this.rideShareGraph.config
    //   );
  }
}
