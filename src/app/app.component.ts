import { Component, computed, effect, inject, Signal } from '@angular/core';
import { CountdownService } from '../../projects/ng-circle-countdown/src/services/countdown.service';
import { CountDown } from '../../projects/ng-circle-countdown/src/model/countdown';
import { CircleCountdownComponent } from '../../projects/ng-circle-countdown/src/component/ng-circle-countdown.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, CircleCountdownComponent]
})
export class AppComponent {
    protected countdownService = inject(CountdownService);

    public countDown: Signal<CountDown> = this.countdownService.getCounter();
    public isCompleted: Signal<boolean> = computed(() => this.countDown().isCompleted);

    completed = effect(() => {
        console.log(this.isCompleted());
    })
}
