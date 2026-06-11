import { OrderProcessing } from './OrderProcessor.ts';
import { Status } from './Order.ts';  
const processor = new OrderProcessing();

processor.addOrder({ id: 1, name: "Laptop", price: 1200, status: Status.PENDING });
processor.addOrder({ id: 2, name: "Phone", price: 800 , status : Status.PENDING});
processor.addOrder({ id: 3, name: "Keyboard", price: 100 , status : Status.PENDING});

processor.showOrders();

 function  startWorker(name: string) {
  setInterval(async () => {
    try {
      const result = await processor.processOrder();
      if (result) {
        console.log(`${name} Processed:, ${result}`);
        processor.showOrders();
      } else {
        console.log("No orders");
      }
    } catch (e) {
      console.log(`${name} error` , e);
    }
  }, 1500);
}
setTimeout(() => {
   processor.addOrder({ id: 5, name: "tablet", price: 1200 , status : Status.PENDING});
   processor.addOrder({ id: 6, name: "pc", price: 3233 , status : Status.PENDING});
}, 5000);
processor.addOrder({ id: 4, name: "screen", price: 1200 , status : Status.PENDING});

startWorker("worker1");
startWorker("worker2");
startWorker("worker3");

setTimeout(() => {
   processor.addOrder({ id: 7, name: "screen", price: 243 , status : Status.PENDING});
}, 1000);
