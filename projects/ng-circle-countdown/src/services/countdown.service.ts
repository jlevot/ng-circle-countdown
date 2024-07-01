import { computed, effect, Injectable, signal } from '@angular/core';
import { CountDown } from '../model/countdown';
import { clearInterval, setInterval } from 'worker-timers';

const DEFAULT_COUNTER: CountDown = {
    isActive: false,
    isCompleted: false,
    speed: 1000,
    remainingTime: 0
};

@Injectable({
    providedIn: 'root'
})
export class CountdownService {
    private counter = signal(DEFAULT_COUNTER);
    private isActive = computed(() => this.counter().isActive);

    private interval = 0;

    constructor() {
        effect(() => this.tick(this.isActive()));
    }

    public start = () => this.counter.update((v) => ({ ...v, isActive: true }))

    public stop = () => this.counter.update((v) => ({ ...v, isActive: false }));

    public setRemainingTime = (remainingTime: number) => this.counter.update((c: CountDown) => ({ ...c, remainingTime }));

    public resetCounter = (remainingTime: number) => this.counter.update((c: CountDown) => ({ ...c, remainingTime, isCompleted: false }));

    getCounter = () => {
        return this.counter.asReadonly()
    };

    private tick(isActive: boolean) {
        clearInterval(this.interval);
        if (isActive && this.counter().remainingTime !== 0) {
            this.interval = setInterval(
                () =>
                    this.counter.set({
                        ...this.counter(),
                        remainingTime: this.counter().remainingTime - this.counter().speed,
                        isCompleted: (this.counter().remainingTime - this.counter().speed) === 0
                    }),
                this.counter().speed
            );
        }
    }
}
