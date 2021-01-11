import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoxComponent } from './shared/box/box.component';
import { ListenerDirective } from './directives/listener.directive';
import { ActionsComponent } from './shared/actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    ListenerDirective,
    ActionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
