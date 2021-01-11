import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private listenerSubject:BehaviorSubject<any>;
  private removeSubject:BehaviorSubject<any>;
  private toggleStatus : boolean = false;
  removeId: any = 0;
  constructor() { 
    this.init();
  }

  init(){
    this.toggleStatus = false;
    this.removeId = 0;
    this.listenerSubject = new BehaviorSubject(this.toggleStatus);
    this.removeSubject = new BehaviorSubject(this.removeId);
  }

  setListener(value){
    this.toggleStatus = value;
    this.listenerSubject.next(this.toggleStatus);
  }

  get toggleStat():any | Observable<any> {
      return this.listenerSubject.asObservable();
  }

  removeElement(id){
    this.removeId = id;
    this.removeSubject.next(this.removeId);
  }

  get RemoveId():any | Observable<any>{
    return this.removeSubject.asObservable();
  }

}
