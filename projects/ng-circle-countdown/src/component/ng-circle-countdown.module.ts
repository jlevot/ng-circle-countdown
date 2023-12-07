import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CircleCountdownComponent } from './ng-circle-countdown.component';
import { SeamanNamePipe } from '../pipe/name.pipe';


@NgModule({
    declarations: [ CircleCountdownComponent, SeamanNamePipe ],
    imports: [ CommonModule ],
    exports: [ CircleCountdownComponent ]
})
export class CircleCountdownModule {
}
