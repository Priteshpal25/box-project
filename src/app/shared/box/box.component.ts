import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'box-component',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  
  @Input('zIndex') zIndex;
  @Input('id') Id;
  @Input('color') color:any = '';
  isSelected:boolean = false;
  toggleListener = false;
  element:ElementRef;

  constructor(private el : ElementRef,
              private _toggleService : ToggleService,
              @Inject(DOCUMENT) private _document: HTMLDocument) { }

  ngOnInit() {
    this.element = this.el;
    this._toggleService.toggleStat
        .subscribe((toggleStatus) => {
          this.toggleListener = toggleStatus;
          if(this.toggleListener){
            // add the event listener
            this.addEventListener();
          }else{
            // remove the event listner
            this.removeEventListener();
          }
        });
  }


  selected(){
    this.isSelected = true;
    console.log(this.isSelected);
  }

  
  checkPosition(cord,dir){
      const fence = this._document.getElementById('fence')
      const fenceCords = fence.getBoundingClientRect();

      let animate = false;
      if(dir == 'right'){
        animate = fenceCords.right > cord ? true : false;
      }

      if(dir == 'left'){
        animate = fenceCords.left < cord ? true : false;
      }

      if(dir == 'top'){
        animate = fenceCords.top < cord ? true : false;
      }

      if(dir == 'bottom'){
        animate = fenceCords.bottom > cord ? true : false;
      }

      if(!animate){
        fence.classList.add('alert');
        setTimeout(function(){
          fence.classList.remove('alert');
        },2000);
      }
      return animate;
  }

  @HostListener('document:click',['$event'])
  clickout(event:any) {

    if(event.target.id != this.Id){
      this.isSelected = false;
    }
  }

  @HostListener('window:keyup',['$event'])
  handleKeypress(event:any):void{}
 
  addEventListener(){
    // const self = this;
    this.handleKeypress = (event:any) =>{
        console.log(event);
        event.preventDefault();
        const keyCode = event.keyCode;
        const el:HTMLElement = this.element.nativeElement.querySelector('.box.selected');
        // const fence = this._document.getElementById('fence');
        const currentCordinates = el.getBoundingClientRect();
        el.style.position = 'absolute';

        var move:any = 0;

        if(keyCode === 39 || keyCode === 68){  //arrow right  
          move =  el.style.left.replace('px','');
          move = Number(move) + 10;
          if(this.checkPosition(currentCordinates.right+10,'right')){
            el.style.left = move + 'px';
          }
          
          
        }

        if(keyCode === 37 || keyCode === 65){ // arrow left
          move  = el.style.left.replace('px','');
          move = Number(move) - 10;
          if(this.checkPosition(currentCordinates.left-10,'left')){
            el.style.left = move + 'px';
          }
         
        }


        if(keyCode === 40 || keyCode === 83){ //arrow down
          move  = el.style.top.replace('px','');
          move = Number(move) + 10;
          
          if(this.checkPosition(currentCordinates.bottom +10,'bottom')){
            el.style.top = move + 'px';
          }
          
        }

        if(keyCode === 38 || keyCode === 87){ //arrow up
          move = el.style.top.replace('px','');
          move = Number(move) - 10;
        
          if(this.checkPosition(currentCordinates.top -10,'top')){
            el.style.top = move + 'px';
          }
        }

        if(keyCode === 46){ // delete
            // let id = el.getAttribute('id');
            this._toggleService.removeElement(el.getAttribute('id'));
        }
      }
  }

  removeEventListener(){
    this.handleKeypress = function (event:any):void{}
  }
  
}
