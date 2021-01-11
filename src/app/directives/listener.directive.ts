import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[KeyPressListener]'
})
export class ListenerDirective {

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument,) { }

  
  checkPosition(cord,dir){
    const fenceCords = this._document.getElementById('fence').getBoundingClientRect();

    if(dir == 'right'){
      return fenceCords.right > cord ? true : false;
    }

    if(dir == 'left'){
      return fenceCords.left < cord ? true : false;
    }

    if(dir == 'top'){
      return fenceCords.top < cord ? true : false;
    }

    if(dir == 'bottom'){
      return fenceCords.bottom > cord ? true : false;
    }
  }



  @HostListener('window:keyup',['$event'])
  handleKeypress(event:any){
    console.log(event);
    event.preventDefault();
    const keyCode = event.keyCode;
    const el:HTMLElement = this._document.querySelector('.box.selected');
    // const fenceCords = this._document.getElementById('fence').getBoundingClientRect();
    // const fenceCords = this.fence.nativeElement.getBoundingClientRect();
    // const fenceCords = fencingDiv.getBoundingClientRect();

    // console.log(el.getBoundingClientRect());
    const currentCordinates = el.getBoundingClientRect();
    el.style.position = 'absolute';

    var move:any = 0;

    if(keyCode === 39 || keyCode === 68){  //arrow right  
      move = currentCordinates.x + 10;
      if(this.checkPosition(currentCordinates.right+10,'right')){
        el.style.left = move +'px';
      }
    }

    if(keyCode === 37 || keyCode === 65){ // arrow left
      move = currentCordinates.x - 10;
      if(this.checkPosition(currentCordinates.left-10,'left')){
        el.style.left = move + 'px';
      }
    }

    if(keyCode === 40 || keyCode === 83){ //arrow down
      move = currentCordinates.y + 10;
      if(this.checkPosition(currentCordinates.bottom +10,'bottom')){
        el.style.top = move + 'px';
      }
      
    }

    if(keyCode === 38 || keyCode === 87){ //arrow up
      move = currentCordinates.y - 10;
      if(this.checkPosition(currentCordinates.top-10,'top')){
        el.style.top = move + 'px';
      }
    }
  }

}
