function loadData(): Promise<string>{
    return new Promise((resolve , reject)=>{
       const intervale = setInterval(() => {
         let secc = true ;
         if (secc){
            resolve("Data is loading ......");
         }else{
            reject("Error 404 ......");
         }
         clearInterval(intervale);
       }, 3500);
    })
}
async function main() {
   
    try{
      const result = await loadData();
       console.log(result)
    }catch(e){
     console.log(`there is an error ${e}`);
    }
    console.log("End program");
}
main();
