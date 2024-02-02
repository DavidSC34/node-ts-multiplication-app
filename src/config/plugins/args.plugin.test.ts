// import { yarg } from './args.plugin';

const runCommand = async( args:string[])=>{
  process.argv = [...process.argv, ...args];//  esparce los argumentos del proceso y aparte agregale los nuevos

//   const defaultExport = await import('./args.plugin'); //es la exportacion por defecto pero para mejor entedimiento
  const {yarg} = await import('./args.plugin');
  return yarg;
}

describe('Test args.plugin.ts',()=>{
    //esto hace una limpieza o lo regresa a como estaba originalmente para que pasen las pruebas
    const originalArgv = process.argv;

    beforeEach(()=>{
        process.argv = originalArgv;
        jest.resetModules();
    })
   
   test('should return default values',async()=>{
        //arrange, action assets

    const argv = await runCommand(['-b','5','-l','6','-s','true','-n','tablota','-d','tablas']);
    // console.log(argv);
    //    console.log(yarg);

    expect(argv).toEqual(expect.objectContaining( {
      
            b: 5,     
            l: 6,      
            s: true,      
            n: 'tablota',     
            d: 'tablas',   

            })
    );

   });


   test('should return configuration with default values',async()=>{
        //arrange, action assets
        const argv = await runCommand(['-b','5']);

        expect(argv).toEqual(expect.objectContaining( {
      
            b: 5,     
            l: 10,      
            s: false,      
            n: 'multiplication-table',     
            d: 'outputs',    

            })
    );

   })


});