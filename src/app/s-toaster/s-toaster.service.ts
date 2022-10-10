import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Toast } from './toast.interface';
import { ToastType } from './toast.type';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    this.subject = new BehaviorSubject<Toast>(null!);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show(type: ToastType, expert_name?: string,  project_name?: string, delay?: number) {
    this.subject.next({ type, expert_name, project_name, delay });
  }
}