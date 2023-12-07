import { Component, ContentChild, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from '../services/countdown.service';
import { SvgUtils } from '../utils/svg-utils';
import { RotationType } from '../model/rotation-type';
import { PathOptions } from '../model/path-options.model';

@Component({
    selector: 'ng-circle-countdown',
    templateUrl: 'ng-circle-countdown.component.html',
    styleUrls: [ 'ng-circle-countdown.component.scss' ]
})

export class CircleCountdownComponent implements OnDestroy, OnChanges {
    @ContentChild('counter')
    // @ts-ignore
    public counterTemplate: TemplateRef<any> | null;

    // Countdown duration
    @Input() duration = 0;
    // Primary color for the countdown displaying
    @Input() color = '#004777'
    // Colors for the countdown displaying
    @Input() colors: string[] = [];
    // Time interval to dertermine when the countdown should change color
    @Input() colorsTime: number[] = [];
    // Stroke width
    @Input() strokeWidth: number = 6;
    // Define the component size to match with your UI
    @Input() size: number = 180;
    // Direction of the countdown rotation
    @Input() rotation: RotationType = 'clockwise'
    // Event when sent when remaining time is equal to 0
    @Output() onComplete = new EventEmitter<boolean>();

    protected countdownService = inject(CountdownService);
    private countdownSubscription: Subscription = new Subscription();
    public offset: number = 0;
    public remainingTime: number = 0;
    public currentColor: string = '';
    public pathOptions: PathOptions = new PathOptions();

    ngOnDestroy() {
        this.countdownSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.pathOptions = SvgUtils.getPathProps(this.size, this.strokeWidth, this.rotation)
    }

    public start(remainingTime?: number): void {
        this.countdownSubscription = this.countdownService.startCountdown(remainingTime ?? this.duration).subscribe({
            next: (time: number) => {
                this.remainingTime = time / 1000;
                this.currentColor = this.getStroke();
                this.offset = SvgUtils.linearEase(this.duration - time, 0, this.pathOptions.length, this.duration)
            },
            complete: () => this.onComplete.emit(true)
        });
    }

    public pause(): void {
        this.countdownService.stopCountdown();
        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
        }
    }

    public continue(): void {
        this.start(this.remainingTime);
    }

    private getStroke(): string {
        if (this.colors.length === 0 && this.color) return this.color;

        const currentColorIndex = this.colorsTime?.findIndex((time, i) =>
            time >= this.remainingTime && this.remainingTime >= this.colorsTime[i + 1]);

        if (!this.colorsTime || currentColorIndex === -1) return this.colors[0];

        const currentTime = this.colorsTime[currentColorIndex] - this.remainingTime;
        const currentDuration = this.colorsTime[currentColorIndex] - this.colorsTime[currentColorIndex + 1];
        const startColorRGB = SvgUtils.getRGB(this.colors[currentColorIndex]);
        const endColorRGB = SvgUtils.getRGB(this.colors[(currentColorIndex + 1 <= this.colors.length - 1) ? currentColorIndex + 1 : this.colors.length - 1]);

        return `rgb(${ startColorRGB.map((color: any, index: any) =>
            SvgUtils.linearEase(currentTime, color, endColorRGB[index] - color, currentDuration)).join(',') })`;
    }
}
