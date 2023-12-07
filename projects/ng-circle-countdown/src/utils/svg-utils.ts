import { RotationType } from '../model/rotation-type';
import { PathOptions } from '../model/path-options.model';

export class SvgUtils {
    static getRGB(color: string): number[] {
        const formattedColor = color.replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${ r }${ r }${ g }${ g }${ b }${ b }`
        );

        const strippedColor = formattedColor.substring(1);
        const colorChunks = strippedColor.match(/.{2}/g);

        if (colorChunks) return colorChunks.map(x => parseInt(x, 16));

        return [];
    }

    static linearEase(time: number, start: number, goal: number, duration: number): number {
        if (duration === 0) return start;
        const currentTime = time / duration;
        return start + goal * currentTime;
    }

    static getPathProps(size: number, strokeWidth: number, rotation: RotationType): PathOptions {
        const halfSize = size / 2;
        const halfStrokeWith = strokeWidth / 2;
        const arcRadius = halfSize - halfStrokeWith;
        const arcDiameter = 2 * arcRadius;
        const rotationIndicator = rotation === 'clockwise' ? '1,0' : '0,1';

        const length = Math.round(2 * Math.PI * arcRadius);
        const path = `m ${ halfSize },${ halfStrokeWith } a ${ arcRadius },${ arcRadius } 0 ${ rotationIndicator } 0,${ arcDiameter } a ${ arcRadius },${ arcRadius } 0 ${ rotationIndicator } 0,-${ arcDiameter }`;

        return { path, length };
    }
}
