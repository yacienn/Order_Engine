import { Order } from "./Order";
import { Queue } from "./Queue";
export class OrderProcessing{
   private queue = new Queue<Order>();
   addOrder(order:Order):void{
     this.queue.enqueue(order);
     console.log(`The oder whitch contain ${order.id} - ${order.name} - ${order.price} was Added!`);
   }
   processOrder(){
    const order = this.queue.dequeue();
    if (!order){
      console.log("there is no orders");
      return ;
    }
      console.log(
      `Order ${order.id} - ${order.name} - ${order.price} was processed`
    );
   }
   showOrders():void{
      const orders = this.queue.getAll();
      console.log("Pending orders:\n");
      orders.forEach((o)=>{
        console.log(`${o.id} - ${o.name} - ${o.price}`);
      })
      
   }
}
