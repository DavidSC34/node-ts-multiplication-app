import { SaveFile } from './save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase',()=>{
   const customOptions={
      fileContent:'custom content',
      fileDestination:'custom-outputs',
      fileName:'custom-table-name'
     }
     
   const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
   

   afterEach(()=>{

       const outputFolderExists = fs.existsSync('outputs');
       if(outputFolderExists)  fs.rmSync('outputs',{recursive:true});

       const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
       if(customOutputFolderExists)   fs.rmSync(customOptions.fileDestination,{recursive:true});
      // fs.rmSync('custom-outputs',{recursive:true});
   });
  

  test('should save file with default values',()=>{

     //Arrange, action, assert

     const saveFile = new SaveFile();//nuestro sujeto de pruebas
     const filePath = 'outputs/table.txt';
     const options={
        fileContent:'test content'
     }

     const result = saveFile.execute(options);
     const fileExists = fs.existsSync(filePath);//pued dar falso psotivo, por eso se borrar al final del ciclo de vida
     const fileContent = fs.readFileSync(filePath,{encoding:'utf-8'});


     expect(result).toBe(true);
     expect(fileExists).toBe(true);
     expect(fileContent).toBe(options.fileContent);

  });


  test('should save file with custom values',()=>{
     const saveFile = new SaveFile();//nuestro sujeto de pruebas
     
     const result = saveFile.execute(customOptions);
     const fileExists = fs.existsSync(customFilePath);//pued dar falso psotivo, por eso se borrar al final del ciclo de vida
     const fileContent = fs.readFileSync(customFilePath, {encoding:'utf-8'});


     expect(result).toBe(true);
     expect(fileExists).toBe(true);
     expect(fileContent).toBe(customOptions.fileContent);

  })

  test('Should return false if directory could not be created',()=>{
       

   const saveFile = new SaveFile();
   const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      ()=>{ throw new Error('This is a custoim error messafe form testing')}
   ); //Sobreescribe el metodo con una implementacion espia o ficiticia que nos de un error

   const result = saveFile.execute(customOptions);
   expect(result).toBe(false);
   //restaura la funcion de fs a su funcionalidad original vaya lo dicho
   mkdirSpy.mockRestore();

  });


  test('should return false if file could not be created',()=>{
     const saveFile = new SaveFile();

   
     const writefileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      ()=>{ throw new Error('This is a custom error message tryng to  write a file')}
   ); //Sobreescribe el metodo con una implementacion espia o ficiticia que nos de un error
     
   
     const result= saveFile.execute({fileContent:'Hola'});
     
     expect(result).toBe(false);

     writefileSpy.mockRestore();
  })

});