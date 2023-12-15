import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'format_time'
})
export class SeamanNamePipe implements PipeTransform {
    transform(time: number) {
        return Math.round(time / 1000);
    }
}
