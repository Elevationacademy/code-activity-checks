let Classes
let Document
let Employee
let Manager
let Cleaner
let Office

try {
  console.log("hello?")
  Classes = require("../../src/main")
  Document = Classes.Document
  Employee = Classes.Employee
  Manager = Classes.Manager
  Cleaner = Classes.Cleaner
  Office = Classes.Office
} catch (error) {
  describe("Bad file", function () {
    console.log("i")
    expect(1, "Make sure you define all the classes").toBe(2)
  })
}

describe("Document class", function () {
  it("should create an object with an attribute called - EmployeeName and it should be initialized in the constructor", function () {
    let doc = new Document("elevation");
    expect(doc.EmployeeName, "EmployeeName was not initialized in the contructor").toEqual("elevation");
  });
});

describe("Employee class", function () {
  it("should create an object with an attribute called - name and it should be initialized in the constructor", function () {
    let employee = new Employee("elevation");
    expect(employee.name, "the 'name' of the employee was not initialized in the constructor - make sure you're using `this`").toEqual("elevation");
  });
  it("should have a function called - work", function () {
    let employee = new Employee("elevation");
    expect(employee.work, "there should be a function called 'work' in the Employee class - p.s. it should be outside of the constructor").toEqual(jasmine.any(Function));
  });
});

describe("Manager class", function () {

  var manager;

  beforeEach(function () {
    manager = new Manager("elevation");
  });

  it("should create an object with an attribute called - name and it should be initialized in the constructor", function () {
    expect(manager.name, "name was not initialized in the constructor - don't forget to use 'this'").toEqual("elevation");
  });
  it("should create an object with an attribute called - employees that is initialized with an empty array", function () {
    expect(manager.employees, "'employees' is not initialized as an array in the constructor - make sure to use 'this' and make sure it's empty").toEqual(jasmine.any(Array));
  });
  it("should have a function called - hireEmployee that pushes a new employee to the employees array", function () {
    manager.employees.length = 0;
    manager.hireEmployee("Hadas");
    expect(manager.employees[0].name, "hireEmployee function does not push a new employee to the 'employees' array - remember the array 'push' method").toEqual("Hadas");
  });
  it("should have a function called - hireEmployee that pushes a new employee to the *end* of the employess array", function () {
    manager.employees.length = 0;
    manager.hireEmployee("Hadas");
    manager.hireEmployee("Brandon");
    manager.hireEmployee("Omer");
    expect(manager.employees[0].name, "hireEmployee function did not push a new employee to the end of the 'employees' array - don't forget to use the 'push' method").toEqual("Hadas");
    expect(manager.employees[1].name, "hireEmployee function did not push a new employee to the end of the 'employees' array - don't forget to use the 'push' method").toEqual("Brandon");
    expect(manager.employees[2].name, "hireEmployee function did not push a new employee to the end of the 'employees' array - don't forget to use the 'push' method").toEqual("Omer");
  });
  it("should have a function called - askEmployeesToWork that invokes each employee's work function", function () {
    manager.employees.length = 0;
    manager.hireEmployee("Hadas");
    manager.hireEmployee("Brandon");

    manager.employees[0].work = manager.employees[1].work = jasmine.createSpy("'work'");

    manager.askEmployeesToWork();

    expect(manager.employees[0].work, "askEmployeesToWork function did not call each employees work function").toHaveBeenCalled();
    expect(manager.employees[1].work, "askEmployeesToWork function did not call each employees work function").toHaveBeenCalled();

  });
});


describe("Cleaner class", function () {
  it("should create an object with an attribute called - name and it should be initialized in the constructor", function () {
    let cleaner = new Cleaner("elevation");
    expect(cleaner.name, "name of cleaner was not initialized in the constructor - don't forget to use the 'this' keyword").toEqual("elevation");
  });
  it("should have an function called - clean and it should console.log 'Clean'", function () {
    let cleaner = new Cleaner("elevation");

    console.log = jasmine.createSpy("log");
    var person = cleaner.clean();

    expect(console.log, "console.log did not print 'Clean' - make sure to use the correct capitalization").toHaveBeenCalledWith("Clean");
  });
});


describe("Office class", function () {

  var office;

  beforeEach(function () {
    office = new Office();
  });

  it("should create an object with an attribute called - documents that is initialized with an empty array", function () {
    expect(office.documents, "the documents array was not initialized in the constructor - don't forget to use the 'this' keyword").toEqual(jasmine.any(Array));
  });
  it("should create an object with an attribute called - managers that is initialized with an empty array", function () {
    expect(office.managers, "the managers array was not initialized in the constructor - don't forget to use the 'this' keyword").toEqual(jasmine.any(Array));
  });
  it("should create an object with an attribute called - cleaners that is initialized with an empty array", function () {
    expect(office.cleaners, "the cleaners array was not initialized in the constructor - don't forget to use the 'this' keyword").toEqual(jasmine.any(Array));
  });
  it("should have a function called - hireManager that pushes a new manager to the managers array", function () {
    office.hireManager("elevation");
    expect(office.managers[0].name, "the hireManager function did not push a new manager into the managers array - remember to use the 'push' method").toEqual("elevation");
  });
  it("should have a function called - hireCleaner that pushes a new cleaner to the cleaners array", function () {
    office.hireCleaner("bob");
    expect(office.cleaners[0].name, "the hireCleaner function did not push a new manager into the cleaners array - remember to use the 'push' method").toEqual("bob");
  });
});


describe("Employee class", function () {
  it("should have a function called - work. that pushes 10 new documents to the office's documents array.", function () {
    let office = new Office();
    let employee = new Employee("elevation");
    employee.work(office);
    expect(office.documents.length, "the work method did not push 10 new documents to the offices 'documents' array - you can try this with a for loop").toEqual(10);
  });
  it("should have a function called - work. The new documents created by the employee should have the employee name on it", function () {
    let office = new Office();
    let employee = new Employee("elevation");
    employee.work(office);
    expect(office.documents[0].EmployeeName, "the documents in the office do not have the employee's name on it").toEqual("elevation");
    expect(office.documents[9].EmployeeName, "the documents in the office do not have the employee's name on it").toEqual("elevation");
  });
});

describe("Office class", function () {
  it("should have a function called - startWorkDay that will start the working day - after this function invokation the office's documents array should have 10 * (the number of total employees) new documents", function () {
    let office = new Office();
    office.hireManager("elevation");
    office.hireManager("elevation");

    office.managers[0].hireEmployee("Hadas");
    office.managers[1].hireEmployee("Brandon");
    office.managers[1].hireEmployee("Omer");

    office.startWorkDay();

    expect(office.documents.length, "the doucments array in the office object does not have 10 documents for each employee").toEqual(30);

    expect(office.documents[0].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Hadas");
    expect(office.documents[9].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Hadas");
    expect(office.documents[10].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Brandon");
    expect(office.documents[19].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Brandon");
    expect(office.documents[20].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Omer");
    expect(office.documents[29].EmployeeName, "the documents array in the office object does not have the employee's name on each document").toEqual("Omer");
  });
});