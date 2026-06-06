import { Order } from "./Order";
import { Queue } from "./Queue";
export class OrderProcessising{
   private queue = new Queue<Order>();
   addOrder(order:Order):void{
     this.queue.enqueue(order)
   }
   processOreder(){

   }
}
