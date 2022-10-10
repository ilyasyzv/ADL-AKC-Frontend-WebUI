import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ModalService } from '../s-modal';
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-a-projects',
  templateUrl: './a-projects.component.html',
  styleUrls: ['./a-projects.component.scss']
})
export class AProjectsComponent implements OnInit {
  sortBy: string = 'Recent activity'
  deleteProjectName: string | undefined = ''

  /* dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]); */
  dataSource = [
    {"id": "1", "pro_name": "LA workshop September", "experts_quan": "0", "created_at": "Aug 3, 2022", "updated": false},
    {"id": "2", "pro_name": "Atlanta conference 2022", "experts_quan": "8", "created_at": "Jul 22, 2022", "updated": true},
    {"id": "3", "pro_name": "Best KOLs in Glaucoma", "experts_quan": "12", "created_at": "Jan 10, 2022", "updated": true},
  ]
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ["inst_name", "inst_place", "experts_count"];
  constructor(public readonly _appService: AppService, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal(id: string, name?: string): void {
    this.modalService.open(id);
    this.deleteProjectName = name
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }

}
