import {OrderProcessing} from './OrderProcessor.ts'

const processor = new OrderProcessing();
processor.addOrder({ id: 1, name: "Laptop", price: 1200 });
processor.addOrder({ id: 2, name: "Phone", price: 800 });
processor.addOrder({ id: 3, name: "Keyboard", price: 100 });

processor.showOrders();

const intervalId = setInterval(() => {
   processor.processOrder();
   console.log("\n");
   if (processor.noOrder()) {
      console.log("No more orders");
      clearInterval(intervalId);
      return;
   }
   processor.showOrders();
}, 1800);

