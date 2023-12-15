import { ChangeDetectionStrategy, Component, computed, ContentChild, inject, Input, OnChanges, Signal, TemplateRef } from '@angular/core';
import { CountdownService } from '../services/countdown.service';
import { SvgUtils } from '../utils/svg-utils';
import { RotationType } from '../model/rotation-type';
import { PathOptions } from '../model/path-options.model';
import { CountDown } from '../model/countdown';
import { CountDownData } from '../model/countdown-data';

@Component({
    selector: 'ng-circle-countdown',
    templateUrl: 'ng-circle-countdown.component.html',
    styleUrls: [ 'ng-circle-countdown.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CircleCountdownComponent implements OnChanges {
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

    protected countdownService = inject(CountdownService);
    public pathOptions: PathOptions = new PathOptions();

    public countDown: Signal<CountDown> = this.countdownService.getCounter();
    public countDownData: Signal<CountDownData> = computed(() => this.getCountDownData(this.countDown().remainingTime));

    ngOnChanges() {
        this.countdownService.setRemainingTime(this.duration);
        this.pathOptions = SvgUtils.getPathProps(this.size, this.strokeWidth, this.rotation)
    }

    public start(): void {
        this.countdownService.start();
    }

    public pause(): void {
        this.countdownService.stop();
    }

    public reload(): void {
        this.countdownService.setRemainingTime(this.duration)
        this.start();
    }

    private getCountDownData(time: number): CountDownData {
        return {
            currentColor: this.getStrokeColor(time),
            offset: SvgUtils.linearEase(this.duration - time, 0, this.pathOptions.length, this.duration)
        }
    }

    private getStrokeColor(time: number): string {
        if (this.colors.length === 0 && this.color) return this.color;

        const remainingTime = time / 1000;

        const currentColorIndex = this.colorsTime?.findIndex((time, i) =>
            time >= remainingTime && remainingTime >= this.colorsTime[i + 1]);

        if (!this.colorsTime || currentColorIndex === -1) return this.colors[0];

        const currentTime = this.colorsTime[currentColorIndex] - remainingTime;
        const currentDuration = this.colorsTime[currentColorIndex] - this.colorsTime[currentColorIndex + 1];
        const startColorRGB = SvgUtils.getRGB(this.colors[currentColorIndex]);
        const endColorRGB = SvgUtils.getRGB(this.colors[(currentColorIndex + 1 <= this.colors.length - 1) ? currentColorIndex + 1 : this.colors.length - 1]);
        return `rgb(${ startColorRGB.map((color: any, index: any) =>
            SvgUtils.linearEase(currentTime, color, endColorRGB[index] - color, currentDuration)).join(',') })`;
    }
}
