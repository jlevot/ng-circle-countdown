export class PathOptions {
    path: string;
    length: number;

    constructor(path?: string, length?: number) {
        this.path = path ?? '';
        this.length = length ?? 0;
    }
}
