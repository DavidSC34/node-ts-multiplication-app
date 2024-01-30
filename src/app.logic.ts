import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";


let outputMessage = '';
const base =yarg.b;
const headerMessage =`
    =============================================================
                            Tabla del ${base}
    =============================================================
`;


for (let index = 1; index <= yarg.l; index++) {
    // console.log(`5 x ${index} = ${5*index}`);
    outputMessage +=`${base} x ${index} = ${base*index}\n`;
    
}


outputMessage = headerMessage + outputMessage;

if(yarg.s){
   console.log(outputMessage);
}

const outputPath = `outputs/`;
fs.mkdirSync(outputPath, {recursive:true})
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
// const message:string= 'Hola mundo';
 console.log('File created!');