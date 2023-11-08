export default class Performance {
    private startTime: number = 0;
    private endTime: number = 0;
    constructor(){}

    public start(): void {
        this.startTime = performance.now();
    }
    public end(): void {
        this.endTime = performance.now();
    }
    public getDuration(): number {
        return this.endTime - this.startTime;
    }
}