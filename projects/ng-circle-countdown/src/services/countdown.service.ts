import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CountdownService {
    private countdownTimer$: Observable<number> = new Observable<number>();
    private countdownSubject: Subject<void>;

    constructor() {
        this.countdownSubject = new Subject<void>();
    }

    public startCountdown(duration: number): Observable<number> {
        const intervalDuration = 10;

        this.countdownTimer$ = interval(intervalDuration).pipe(
            map(time => duration - (time * intervalDuration)),
            takeWhile(time => time >= 0)
        );

        return this.countdownTimer$;
    }

    stopCountdown(): void {
        this.countdownSubject.next();
    }
}
