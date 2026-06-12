import { OrderProcessing } from './OrderProcessor.ts';
import { Status } from './Order.ts';  
import type { Worker } from './Worker.ts';
import { Wstatus } from './Worker.ts';
const processor = new OrderProcessing();

processor.addOrder({ id: 1, name: "Laptop", price: 1200, status: Status.PENDING });
processor.addOrder({ id: 2, name: "Phone", price: 800 , status : Status.PENDING});
processor.addOrder({ id: 3, name: "Keyboard", price: 100 , status : Status.PENDING});

processor.showOrders();

 function startWorker(worker: Worker) {
  setInterval(async () => {
    if (worker.status === Wstatus.BUSY){
      console.log(`${worker.name} is busy`);
      return ; 
    }
    try {
      const result = await processor.processOrder(worker);

      if (result) {
        console.log(`${worker.name} processed:`, result);
      } else {
        console.log(`${worker.name} no orders`);
      }
    } catch (e) {
      console.log(worker.name, "error:", e);
    }
  }, 1500);
}
setTimeout(() => {
   processor.addOrder({ id: 5, name: "tablet", price: 1200 , status : Status.PENDING});
   processor.addOrder({ id: 6, name: "pc", price: 3233 , status : Status.PENDING});
}, 5000);
processor.addOrder({ id: 4, name: "screen", price: 1200 , status : Status.PENDING});
const worker2 : Worker  = {
  name : "W2",
  status : Wstatus.IDLE 
}
const worker3 : Worker  = {
  name : "W3",
  status : Wstatus.IDLE 
}
const worker1 : Worker  = {
  name : "W1",
  status : Wstatus.IDLE 
}
startWorker(worker1);
startWorker(worker2);
startWorker(worker3);

setTimeout(() => {
   processor.addOrder({ id: 7, name: "screen", price: 243 , status : Status.PENDING});
}, 1000);
