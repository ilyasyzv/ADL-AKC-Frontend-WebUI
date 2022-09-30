// import { DataSource } from "@angular/cdk/collections";
// import { MatPaginator } from "@angular/material/paginator";
// import { MatSort } from "@angular/material/sort";
// import { map } from "rxjs/operators";
// import { Observable, of as observableOf, merge } from "rxjs";
// import { SKoldataService } from "../s-koldata.service";
// import { HttpClient } from "@angular/common/http";

// // TODO: Replace this with your own data model type
// export interface SKolTableItem {
//   id?: number;
//   name?: string;
//   koldetail?: string;
//   title?: string;
//   userId?: number;
// }

// export interface SKolAPITableItem {}

// // TODO: replace this with real data from your application
// const EXAMPLE_DATA = [
//   {
//     id: 1,
//     name: "Hydrogen",
//     koldetail:
//       "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
//     title:
//       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     userId: 1,
//   },

//   {
//     id: 2,
//     name: "Helium",
//     koldetail:
//       "et iusto sed quo iure↵voluptatem occaecati omnis eligendi aut ad↵voluptatem doloribus vel accusantium quis pariatur↵molestiae porro eius odio et labore et velit aut",
//     title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     userId: 1,
//   },
// ];

// const EXAMPLE_DATA1 = [
//   { id: 3, name: "Lithium" },
//   { id: 4, name: "Beryllium" },
//   { id: 5, name: "Boron" },
// ];

// // JSON DATA
// const EX_API_RESPONSE_DATA = [
//   {
//     Name: "Himnashu Matalia",
//     Article_Presentation: ["10.3928/1081597X-20180607-02"],
//     Type: ["publication"],
//     Year: [2018],
//     Title: [
//       "Wavefront-Guided LASIK Has Comparable Ocular and Corneal Aberrometric Outcomes but Better Visual Acuity Outcomes Than SMILE in Myopic Eyes.",
//     ],
//     FirstAuthor_Presenter: [false],
//     LastAuthor: [false],
//     Coauthors: [
//       "Rohit Shetty",
//       "Chinnappaiah Nandini",
//       "Ashwatha Shetty",
//       "Pooja Khamar",
//       "Tushar Grover",
//       "Abhijit Sinha Roy",
//     ],
//     Affiliation: ["unknown"],
//     Organizations: [
//       [
//         "WFG",
//         "Narayana Nethralaya Eye Hospital",
//         "Flarex",
//         "Tracey Technologies",
//         "Vigamox",
//         "Carl Zeiss Meditec",
//         "SMILE Groupa",
//         "Alcon Laboratories, Inc.",
//         "HM",
//         "Oculus Optikgeräte GmbH",
//         "MedCalc, Inc.",
//         "Allergan, Inc.",
//         "Abbott Medical Optics",
//       ],
//     ],
//     Products: [["iTrace", "STAR S4IR", "VisuMax"]],
//     Conditions: [
//       [
//         "high myopia",
//         "keratoconus",
//         "diabetes mellitus",
//         "collagen vascular disease",
//         "corneal surface aberration",
//         "RMS of HOAs",
//         "coma",
//         "myopia",
//         "high astigmatism",
//         "ocular coma",
//         "pregnancy",
//       ],
//     ],
//     NumPapers: 1,
//     NumPresentations: 0,
//     NumGrants: 0,
//     NetworkSize: 6,
//     Payments: [],
//     PublicationHistory: [
//       {
//         Title:
//           "Wavefront-Guided LASIK Has Comparable Ocular and Corneal Aberrometric Outcomes but Better Visual Acuity Outcomes Than SMILE in Myopic Eyes.",
//         DOI: "10.3928/1081597X-20180607-02",
//         Date: "05/2018",
//       },
//     ],
//     MostRecent:
//       "Wavefront-Guided LASIK Has Comparable Ocular and Corneal Aberrometric Outcomes but Better Visual Acuity Outcomes Than SMILE in Myopic Eyes.",
//   },
//   {
//     Name: "Anders Gyldenkerne",
//     Article_Presentation: [
//       "10.1016/j.jcrs.2018.08.026",
//       "10.1097/j.jcrs.0000000000000083",
//     ],
//     Type: ["publication", "publication"],
//     Year: [2019, 2020],
//     Title: [
//       "Optical and visual quality after small-incision lenticule extraction.",
//       "Astigmatism prediction in small-incision lenticule extraction.",
//     ],
//     FirstAuthor_Presenter: [true, true],
//     LastAuthor: [false, false],
//     Coauthors: ["Anders Ivarsen", "Jesper Hjortdal"],
//     Affiliation: [
//       "Department of Ophthalmology, Aarhus University Hospital, Aarhus, Denmark. Electronic address: agy@dadlnet.dk.",
//       "From the Department of Ophthalmology, Aarhus University Hospital, Aarhus, Denmark.",
//     ],
//     Organizations: [
//       [
//         "Danish Data Protection Agency",
//         "Ethical Committee of Central Region Denmark",
//         "Carl Zeiss Meditec AG",
//         "Department of Ophthalmology",
//         "Optical Society of America",
//         "Oculus Optikgerate GmbH",
//         "Stata Corp.",
//         "Aarhus University Hospital",
//         "Graphpad Software,",
//         "Pentacam",
//       ],
//       [
//         "Optical Society of America",
//         "Carl Zeiss Meditec AG",
//         "GraphPad Software, Inc.",
//         "Department of Ophthalmology",
//         "Stata Corp.",
//         "NIDEK, Inc.",
//         "Oculus Optikgerate GmbH",
//         "Aarhus University Hospital",
//         "Pentacam",
//       ],
//     ],
//     Products: [[], []],
//     Conditions: [
//       ["myopia", "wound-healing processes affect UDVA"],
//       ["myopic astigmatism", "high myopia", "myopia", "Diabetic Retinopathy"],
//     ],
//     NumPapers: 9,
//     NumPresentations: 0,
//     NumGrants: 0,
//     NetworkSize: 2,
//     Payments: [],
//     PublicationHistory: [
//       {
//         Title: "Astigmatism prediction in small-incision lenticule extraction.",
//         DOI: "10.1097/j.jcrs.0000000000000083",
//         Date: "4/2020",
//       },
//       {
//         Title:
//           "The visual image quality after small-incision lenticule extraction (SMILE) compared to spectacles and contact lenses.",
//         DOI: "10.1097/j.jcrs.0000000000000501",
//         Date: "11/2020",
//       },
//       {
//         Title:
//           "Impact on binocular visual function of small-incision lenticule extraction for high myopia.",
//         DOI: "10.1097/j.jcrs.0000000000000480",
//         Date: "11/2020",
//       },
//       {
//         Title:
//           "Optical and visual quality after small-incision lenticule extraction.",
//         DOI: "10.1016/j.jcrs.2018.08.026",
//         Date: "08/2018",
//       },
//       {
//         Title:
//           "Correction of astigmatism with small-incision lenticule extraction: Impact of against-the-rule and with-the-rule astigmatism.",
//         DOI: "10.1016/j.jcrs.2018.06.029",
//         Date: "06/2018",
//       },
//       {
//         Title:
//           "Assessing the corneal power change after refractive surgery using Scheimpflug imaging.",
//         DOI: "10.1111/opo.12202",
//         Date: "01/2015",
//       },
//       {
//         Title:
//           "Comparison of corneal shape changes and aberrations induced By FS-LASIK and SMILE for myopia.",
//         DOI: "10.3928/1081597X-20150303-01",
//         Date: "01/2015",
//       },
//       {
//         Title:
//           "Factors affecting the decision for refractive surgery in patients with high degrees of ametropia.",
//         DOI: "S0886-3350(14)00678-6",
//         Date: "11/2013",
//       },
//     ],
//     MostRecent:
//       "The visual image quality after small-incision lenticule extraction (SMILE) compared to spectacles and contact lenses.",
//   },
// ];

// // const EX_JSON_SERVICES = SKoldataService.sendGetRequest();
// /**
// * Data source for the SKolTable view. This class should
// * encapsulate all logic for fetching and manipulating the displayed data
// * (including sorting, pagination, and filtering).
// */
// export class SKolTableDataSource extends DataSource<SKolTableItem> {
//   // data: SKolTableItem[] = EXAMPLE_DATA;
//   // data: SKolAPITableItem[] = EX_API_RESPONSE_DATA;
//   data: SKolTableItem[] = getAPIData();
//   paginator: MatPaginator;
//   sort: MatSort;

//   constructor(dataService: SKoldataService) {
//     super();
    
//   }
  
//   // ngOnInit() {
//   // const items = this.dataService.sendGetRequest().subscribe((data: any[]) => {
//   //   console.log(data);
//   //   return data;
    
//   // }

//   /**
//   * Connect this data source to the table. The table will only update when
//   * the returned stream emits new items.
//   * @returns A stream of the items to be rendered.
//   */
//   connect(): Observable<SKolTableItem[]> {
//     // Combine everything that affects the rendered data into one update
//     // stream for the data-table to consume.
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange,
//     ];

//     return merge(...dataMutations).pipe(
//       map(() => {
//         return this.getPagedData(this.getSortedData([...this.data]));
//       })
//     );
//   }

//   /**
//   *  Called when the table is being destroyed. Use this function, to clean up
//   * any open connections or free any held resources that were set up during connect.
//   */
//   disconnect() {}

//   /**
//   * Paginate the data (client-side). If you're using server-side pagination,
//   * this would be replaced by requesting the appropriate data from the server.
//   */
//   private getPagedData(data: SKolTableItem[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }

//   /**
//   * Sort the data (client-side). If you're using server-side sorting,
//   * this would be replaced by requesting the appropriate data from the server.
//   */
//   private getSortedData(data: SKolTableItem[]) {
//     if (!this.sort.active || this.sort.direction === "") {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === "asc";
//       switch (this.sort.active) {
//         case "Name":
//           return compare(a.name, b.name, isAsc);
//         case "id":
//           return compare(+a.id, +b.id, isAsc);
//         default:
//           return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }

// function getAPIData() {
//   const items = this.dataService.sendGetRequest().subscribe((data: any[]) => {
//     console.log(data);
//     return data;
//   });
//   return items;
// }
