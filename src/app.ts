import { yarg } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';


// console.log(process.argv);

// console.log(yarg.b);


(async()=>{
  // console.log('funcion autoinvocada');
  await main();
})();


async function main(){

  const {b:base, l:limit,n:name,d:destination ,s:showTable} = yarg;
  ServerApp.run({base, limit,name,destination, showTable});
}