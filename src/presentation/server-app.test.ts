import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
describe('Server App',()=>{

    const options ={
        base:2,
        limit:10,
        showTable:false,
        fileDestination:'test-destination',
        fileName:'test-filename',
    };

    beforeEach(()=>{
        jest.clearAllMocks();
    });


    test('should create ServerApp instance',()=>{
            const serverApp = new ServerApp();

            expect(serverApp).toBeInstanceOf(ServerApp);
            expect(typeof ServerApp.run).toBe('function');
    });


    test('should run ServerApp with options',()=>{
        //Arrange, actions, asserts

        //vamos a mandarle un ninja espia
        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');

       

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server runnig...');
        expect(logSpy).toHaveBeenLastCalledWith('File created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith( {base: options.base, limit:options.limit});

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

    });

    test('should run with custom values mocked',()=>{

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('2 x 1 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);


        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);


        expect(logMock).toHaveBeenCalledWith('Server runnig...');
        // expect(logErrorMock).toHaveBeenCalledWith('File not created!');
        expect(createMock).toHaveBeenCalledWith( {base: options.base, limit: options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
                fileContent: '2 x 1 = 2', 
                fileDestination: options.fileDestination, 
                fileName: options.fileName,
        });

        expect(logErrorMock).not.toHaveBeenCalledWith('File not created!');
        expect(logMock).toHaveBeenCalledWith('File created!');

    });
});