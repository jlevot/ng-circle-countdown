import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'format_time',
    standalone: true
})
export class FormatTimePipe implements PipeTransform {
    transform(time: number) {
        return Math.round(time / 1000);
    }
}
