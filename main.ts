import {OrderProcessing} from './OrderProcessor.js'

const processor = new OrderProcessing();

processor.addOrder({ id: 1, name: "Laptop", price: 1200 });
processor.addOrder({ id: 2, name: "Phone", price: 800 });
processor.addOrder({ id: 3, name: "Keyboard", price: 100 });

processor.showOrders();

processor.processOrder();
processor.processOrder();
processor.processOrder();

processor.processOrder(); // empty case
