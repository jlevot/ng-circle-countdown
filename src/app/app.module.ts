import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CircleCountdownModule } from '../../projects/ng-circle-countdown/src/component/ng-circle-countdown.module';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        CircleCountdownModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
