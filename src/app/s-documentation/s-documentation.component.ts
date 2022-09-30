import { Component, OnInit } from '@angular/core';
import { ModalService } from '../s-modal';

@Component({
  selector: 'app-s-documentation',
  templateUrl: './s-documentation.component.html',
  styleUrls: ['./s-documentation.component.scss']
})
export class SDocumentationComponent implements OnInit {

  constructor(private modalService: ModalService) {
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  ngOnInit(): void {
    
  }

}
