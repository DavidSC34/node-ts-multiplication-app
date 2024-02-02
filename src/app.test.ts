// process.argv = ['node','app.ts','-b','10']; //antes para que pase la prueba
// import './app'
import { ServerApp } from './presentation/server-app';


describe('Test App.ts',()=>{

  test('should call Server.run with values',async()=>{
    //Definiedo el process argv en este momento ya es tarde, por la importacion de arriba llam a un funcion autoinvocada
    // process.argv = ['node','app.ts','-b','10'];

   const serverRunMock = jest.fn();
   ServerApp.run = serverRunMock; // la sobre ewscribe y con los argumentos que espero

   process.argv =['node','app.ts','-b','10','-l','5','-s','-n','test-file','-d','test-destination'];

   //Action

   await import('./app');

   //Asserts

   expect(serverRunMock).toHaveBeenCalledWith({
   base: 10,
   limit:5,
   showTable: true,
   fileName: 'test-file',
   fileDestination:'test-destination'
  });


  });

});