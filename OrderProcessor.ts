import type { Order } from "./Order.ts";
import { Queue } from "./Queue.ts";
import { Status } from './Order.ts';

export class OrderProcessing{
  private queue = new Queue<Order>();

  addOrder(order: Order): void{
    this.queue.enqueue(order);
    console.log(`The order which contains ${order.id} - ${order.name} - ${order.price} was Added!`);
  }

  processOrder(): Promise<string | null>{
    return new Promise((resolve, reject) => {
      const order = this.queue.dequeue();
      if (!order) {
        reject("No orders");
        return;
      }
      order.status = Status.PROCESSING;
      console.log(`Order ${order.id} status : ${order.status}`);

      setTimeout(() => {
        order.status = Status.COMPLETED;
        console.log(`Order ${order.id} status changed to: ${order.status}`); 
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
