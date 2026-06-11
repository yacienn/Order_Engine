export class Queue<T>{
    private data: T[] = [] ;
    private head:number = 0 ;
    enqueue(value :T){
          this.data.push(value);
    }
    dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const value = this.data[this.head];
    this.data[this.head] = undefined as any; 
    this.head++;
    this.cleanUp();
    return value;
}
    peek(): T | undefined{
        if(this.isEmpty()) return undefined ;
        return this.data[this.head];
    }
    isEmpty():boolean{
        return this.head >= this.data.length ;
    }
    size(): number{
        return this.data.length - this.head ;
    }
    getAll(): T[] {
        return this.data.slice(this.head);
    }
    private cleanUp(): void {
    if (this.head > 50) {
        this.data = this.data.slice(this.head);
        this.head = 0;
    }
}
}
