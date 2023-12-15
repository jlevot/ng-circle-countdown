import { computed, effect, Injectable, signal } from '@angular/core';
import { CountDown } from '../model/countdown';

const DEFAULT_COUNTER: CountDown = {
    isActive: false,
    isCompleted: false,
    speed: 10,
    diff: 10,
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

    public reset = (remainingTime: number) => this.counter.update((c: CountDown) => ({ ...c, remainingTime }));

    public setRemainingTime = (remainingTime: number) => this.counter.update((c: CountDown) => ({ ...c, remainingTime }));

    getCounter = () => {
        return this.counter.asReadonly()
    };

    private tick(isActive: boolean) {
        clearInterval(this.interval);
        if (isActive && this.counter().remainingTime !== 0) {
            this.interval = setInterval(
                () => this.counter.update((c) => (
                    {
                        ...c,
                        remainingTime: c.remainingTime - this.counter().diff,
                        isCompleted: (c.remainingTime - this.counter().diff) === 0
                    })),
                this.counter().speed
            );
        }
    }
}
