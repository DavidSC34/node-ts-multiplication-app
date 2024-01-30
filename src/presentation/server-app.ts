import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions{
   base:number;
   limit:number;
   name:string;
   destination:string;
   showTable: boolean;
}


export class ServerApp{

   static run({base,limit,name,destination,showTable}:RunOptions){
    console.log('Server runnig...');
   //  console.log({options});
   const table = new CreateTable().execute({base,limit});
   const wasCreated = new SaveFile().execute({fileContent: table, fileDestination:destination, fileName:name});

   if(showTable) console.log(table);

   (wasCreated) ? console.log('File created') : console.log('File not created!');
      
   }


}