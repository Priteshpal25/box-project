import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  zIndex = 0;
  // toggleText = 'Turn on Keyboard Gestures';
  toggleStatus = false;
  color :any = '';
  // Id = 0;
  boxArr:any = [];

  constructor(private _toggleService : ToggleService) { }

  ngOnInit() {
    this._toggleService.RemoveId
        .subscribe(id =>{
         
          if(id){
            const removeId = id;
            this.boxArr = this.boxArr.filter(item => item.id !== removeId);
          }
         
        })
  }

  addBox(){
    this.zIndex ++;
    // this.Id ++; 
    this.boxArr.push({
      'id': 'box-'+this.zIndex,
      'zIndex' : this.zIndex,
      'color' : '#'+Math.random().toString(16).substr(2,6)
    });
  }

  trackByFn(index,element){
    return element.id;
  }

  toggleListener(){
    this.toggleStatus = !this.toggleStatus;

    this._toggleService.setListener(this.toggleStatus);
    // if(this.toggleStatus){
    //   // this._document.addEventListener
    //   // add a service and subscribe to the changes
    // }
  }

}
