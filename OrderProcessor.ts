import type { Order } from "./Order.ts";
import { Queue } from "./Queue.ts";
import { Status } from './Order.ts';
import type { Worker } from './Worker.ts';
import { Wstatus } from './Worker.ts';

export class OrderProcessing{
  private queue = new Queue<Order>();

  addOrder(order: Order): void{
    this.queue.enqueue(order);
    console.log(`The order which contains ${order.id} - ${order.name} - ${order.price} was Added!`);
  }

  processOrder(worker : Worker): Promise<string | null>{
    return new Promise((resolve, reject) => {
      const order = this.queue.dequeue();
      if (!order) {
        reject("No orders");
        return;
      }
      order.status = Status.PROCESSING;
      worker.status = Wstatus.BUSY;
      console.log(`${worker.name} Order ${order.id} status : ${order.status} ---- ${worker.name} ${worker.status}` );
      setTimeout(() => {
        order.status = Status.COMPLETED;
        worker.status = Wstatus.IDLE;
       
        console.log(`Order ${order.id} status changed to: ${order.status} ---${worker.name}+ ${worker.status} `); 
        resolve(
          `Order ${order.id} - ${order.name} - ${order.price}  - ${order.status} `
        );
      }, 3500);
    });
  }
  showOrders(): void{
    const orders = this.queue.getAll();
    console.log("------------------\nPending orders:\n");
    if (orders.length === 0) {
      console.log("No pending orders");
    }
    orders.forEach((o) => {
      console.log(`${o.id} - ${o.name} - ${o.price} - ${o.status}`);
    });
  }

  noOrder(): boolean{
    return this.queue.isEmpty();
  }
}
