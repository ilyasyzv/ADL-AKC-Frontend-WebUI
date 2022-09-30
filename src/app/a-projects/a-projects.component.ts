import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-a-projects',
  templateUrl: './a-projects.component.html',
  styleUrls: ['./a-projects.component.scss']
})
export class AProjectsComponent implements OnInit {

  /* dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]); */
  dataSource = [{"id": "1", "pro_name": "Artificial Intelligence", "created_at": "02/21/2022 10.29 AM"},{"id": "1", "pro_name": "My Projects", "created_at": "06/01/2022 10.49 AM"},{"id": "1", "pro_name": "Eye Care", "created_at": "05/11/2022 12.09 AM"},{"id": "1", "pro_name": "Health Details", "created_at": "04/14/2022 10.15 AM"},{"id": "1", "pro_name": "My Experts", "created_at": "01/09/2022 11.12 AM"},{"id": "1", "pro_name": "Projects Author", "created_at": "04/17/2022 04.58 AM"},{"id": "1", "pro_name": "Publications", "created_at": "03/30/2022 09.45 AM"},]
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ["inst_name", "inst_place", "experts_count"];
  constructor(public readonly _appService: AppService) { }

  ngOnInit(): void {
  }

}
