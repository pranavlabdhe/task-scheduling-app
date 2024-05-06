import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggle(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  isOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  open(): void {
    this.isOpenSubject.next(true);
  }

  close(): void {
    this.isOpenSubject.next(false);
  }
}
