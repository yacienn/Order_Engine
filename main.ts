import { OrderProcessing } from './OrderProcessor.ts';

const processor = new OrderProcessing();

processor.addOrder({ id: 1, name: "Laptop", price: 1200 });
processor.addOrder({ id: 2, name: "Phone", price: 800 });
processor.addOrder({ id: 3, name: "Keyboard", price: 100 });

processor.showOrders();

async function main() {
   try{
     
      while(true){
          const result = await processor.processOrder();
          console.log(result);
           console.log("\n");
          processor.showOrders();
      }
   }catch(e){
      console.log(e);
   }
   console.log("End");
}

main()
