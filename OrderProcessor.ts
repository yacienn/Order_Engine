import type { Order } from "./Order.ts";
import { Queue } from "./Queue.ts";
export class OrderProcessing{
   private queue = new Queue<Order>();
   addOrder(order:Order):void{
     this.queue.enqueue(order);
     console.log(`The oder whitch contain ${order.id} - ${order.name} - ${order.price} was Added!`);
   }
   processOrder():Promise<string | null>{
    return new Promise((resolve , reject)=>{
      const order = this.queue.dequeue();
      if (!order){
            reject("no orders");
            return ;
        } 
     setTimeout(()=>{
       resolve(
      `Order ${order.id} - ${order.name} - ${order.price} was processed`
    );
     },2500)
    })
    
    
   }
   showOrders():void{
      const orders = this.queue.getAll();
      console.log("------------------\nPending orders:\n");
      orders.forEach((o)=>{
        console.log(`${o.id} - ${o.name} - ${o.price}`);
      });
   }
   noOrder():boolean{ 
   return this.queue.isEmpty();
}

}
