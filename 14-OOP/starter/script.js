'use strict';

// WHAT IS OBJECT-ORIENTED PROGRAMMING
    // oBJECT-ORIENTED PROGRAMMING (OOP) is a programming paradigm based on the concept of objects
    // we use objects to model (describe) real-world abstract (html component or data structure) features 
    // objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding behavior into one block;
    // In OOP, objects are self-contained pieces/blocks of code
    // objects are buiding blocks of applications, and interact with one another
    // interactions happen through a public interface (API): methods that the code outside of the object can access and use to communicate with the object;
    // exists to make code more flexible and easier to maintain (spaghetti code)
    // OOP is most popular large scale paradigm
    // functional programming is another popular paradigm

    // CLASS
        // blueprint used to create new objects based on the rule we describe in the class
        // abstract plan with a set of rules
        // JavaScript does not support class syntax
        
        // INTANCE
            // objects created from a class that we can use in our code

        // 4 FUNDAMENTALS OF OBJECT-ORIENTED PROGRAMMING (OOP)
            // 1) ABSTRACTION
                // ignoring or hiding details that do not matter, allowing us to get an overview perspective of the thing we're implemnting, instead of messing with details that dontreally matter to our implementation
            // 2) ENCAPSULATION
                // keeping properties and methods private inside the class, not accessible from outside the class
                // some methods can be exposed as a public interface (API)
                // prevents external code from accidentally manipulating internal properties/state (state is object data)
                // public interface are methods not private 
                // allows us to change internal implementation without the risk of breaking external code
            // 3) INHERITANCE
                // have one parent class and one parent class
                // child class extends the parent class
                // child inherits all properties and methods from its parent class
                // making all properties and methods of a certain class available to a child class, forming a hierachical relationship between classes.
                // this allows us to reuse common logic and to model real-world relationships
            // 4) POLYMORPHISM
                // a child class can overwrite a method it inherited from a parent class

// OOP IN JavaScript
    // PROTOTYPES
        // all objects in JS are linked to a prototype object (each object has a prototype)
        // objects are linked to a prototype 
        
        // PROTOTYPAL INHERITANCE
            // the prototype contains methods (behavior) that are accessible to all objects linked to that protoype;
            // instance inheriting from a class
            // DELEGATION: behavior is delegated to the linked prototype object
            // objects 
    
            // 1) CONSTRUCTOR FUNCTIONS
                // technique to create objects from a function
                // this is how built-in objects like Arrays, Maps, or Sets are actually implemented
            // 2) ES6 CLASSES
                // modern alternative to constructor function syntax;
                // "Synthetic Sugar": behind the scenes, ES6 classes work exactly like constructor functions;
                // ES6 classes dod NOT behave like classes in "classical OOP"
            // 3) Object.create()
                // The easiest and most straightforward way of linking an object to a prototype object

// CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
   // CONSTRUCTOR FUNCTIONS
        // can build an object using a function 
        // constructor functions are called with the new operator
        // constructor syntax starts with a capital letter
        // arrow functions will not work becuase we need the this keyword

        const EPerson = function (personFirstName, personBirthYear){
            console.log(this);
            console.log('this = ' + this);
            // create property for each value passed in (instance properties)
            this.personFirstName = personFirstName;
            this.personBirthYear = personBirthYear;

            // create a method inside of constructor function
                // BAD PRACTICE: NEVER DO THIS
            // this.calcAge = function (){
            //     console.log( 2037- this.personBirthYear);
            // };
        };

        // new operator calls the EPerson function
        const john = new EPerson('John', 1991);
            // BEHIND THE SCENES
            // 1) New {} empty object is created
            // 2) function is called, this keyword = {} the new empty object
            // 3) {} new object is linked to prototype (constructor functions prototype property)
            // 4) return {} new object is automatically returned to the constructor function

        const zane = new EPerson ('Zane', 1991);
        const ember = new EPerson ('Ember', 1991);
        console.log(zane, ember);

        const isla = 'Isla';

        // we created 3 objects from constructor functions
            // these simulate classes
            // so each object is an instance of EPerson
            // we can check with the below
                console.log(john instanceof EPerson);
                console.log(zane instanceof EPerson);
                console.log(ember instanceof EPerson);
                console.log(isla instanceof EPerson);

// STATIC METHOD
        // only called 
        // the object calling the method will be the this keyword (constructor function)
        EPerson.hey = function () {
            console.log('Hey!');
            console.log(this);
        };
        console.log(EPerson.hey());


// PROTOTYPES 
        // all functions in JS have property called prototype
        // add method to the prototype property
        // this is set to the object calling the method
        EPerson.prototype.calcAge = function () {
            console.log(2037 - this.personBirthYear);
        };

        john.calcAge();
        zane.calcAge();
        ember.calcAge();

        // this is the prototype 
        // essentially is the prototype property of the constructor function
        console.log(john.__proto__);
        // prototype property of object to prototype property of constructor function
        console.log(john.__proto__ === EPerson.prototype);

        // prototype of john
        console.log(EPerson.prototype.isPrototypeOf(john));
        console.log(EPerson.prototype.isPrototypeOf(EPerson));

        // think .prototypeOfLinkedObjects

        // set properties on a prototype
            // not its own property (not inherited), those must be set on the object or this keyword
        EPerson.prototype.species = 'Homo Sapiens';
        console.log(john, zane, ember);

// PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN
        // EPerson.prototype, it is a prototype of all objects created through the EPerson constructor function

        // THE PROTOTYPE CHAIN
            // ability to look at method and properties in prototype is called prototype chain
            // object and property form prototype chain (does not end here)
            // series of links between objects, linked through prototypes

            // EPerson.prototype -> Object.prototype (top of chain, its prototype is null) [similar to scope chain but with prototypes]

            console.log(john.hasOwnProperty('personFirstName'));
            console.log(john.hasOwnProperty('species'));
// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
        // is a mechanism for re-using code

        console.log(john.__proto__);
        // Object.protoype (top of prototype chain)
        console.log(john.__proto__.__proto__);
        console.log(john.__proto__.__proto__.__proto__) // null
        console.dir(EPerson.prototype.constructor);

        // functions are also objects, so they also have prototypes
        // each array inherits methods from its prototype
        const eArray = [3,6,4,5,6,9,3,9]; // new Array === []
        console.log(eArray);
        console.log(eArray.__proto__ === Array.prototype);
        console.log(eArray.__proto__.__proto__);

        // add method to Array so all array prototypes inherit this function
        // add new method to prototype property of array constructor, so all arrays inherit this method
        Array.prototype.unique = function () {
            // get unique values of array
            // return array with unique values
            return [...new Set(this)];
        };
        console.log(eArray.unique());

// ES6 CLASSES
        // classes are still functions
        // 1) Classes are NOT hoisted (use them before they are declared in the code)
        // 2) Classes are first-class citizens (we can pass the into functions and return them from functions)
        // 3) Classes are executed in strict mode

        // class expression
        // const PersonCLASS = class {}

        // class declaration
        class ClassPerson {
            // constructor method() of this class
                // constructor is automatically called on the instance
            constructor(personFullName, personBirthYear) { // pass in properties that we want object to have
                // set properties in new object we want to create
                this.personFullName = personFullName;
                this.personBirthYear = personBirthYear;
            } ;

            // Instance methods()
            // create and add methods()
            // methods in class out side of constructor are on prototype of object, and not on the object itself
            calcAge() {
                console.log(2037 - this.personBirthYear);
            };

            greet() {
                console.log(`Hey ${this.personFirstName}`);
            };

            // create getter method, use getter to read age of any object 
            get getAge(){
                return 2037 - this.personBirthYear;
            };

            // create a setter for existing property
            set personFullName(aFullName) {
                if (aFullName.includes(' ')) {
                    this._personFullName = aFullName;
                } else {
                    alert(`${aFullName} is not a full name.`)
                };
            };

            // create getter 
            get personFullName() {
                return this._personFullName;
            };

            // create a static method
                // static keyword
            static hey () {
                console.log('Hey!');
                console.log(this);
            };
        };
        const jessica = new ClassPerson('Jessica Davis', 1996);
        // console.log(jessica);
        // jessica.calcAge();
        // console.log(jessica.__proto__ === ClassPerson.prototype);
        jessica.greet();
        console.log(jessica.getAge);

        // 1) Classes are NOT hoisted (use them before they are declared in the code)
        // 2) Classes are first-class citizens (we can pass the into functions and return them from functions)
        // 3) Classes are executed in strict mode

        const walter = new ClassPerson('Walter White', 1995);
        console.log(walter);

        ClassPerson.hey();
        console.log(ClassPerson.hey());

// GETTERS AND SETTERS
        // are called accessor properties
        // useful for data validation

        const eObjectAccount = {
            owner: 'John',
            movements: [200,530,120,300],

            // create getter 
            get latest() {
                return this.movements.slice(-1).pop();
            },

            // create setter 
            set latest(aMovement) {
                this.movements.push(aMovement);
            }
        };
        console.log(eObjectAccount.latest);
        eObjectAccount.latest = 50;
        console.log(eObjectAccount.movements);

        // GETTERS
            // keyword get 
        // SETTERS
            // keyword set
            // has at least one parameter

// STATIC METHODS 
        // used as helpers to a certain constructor

// Oject.create function
        // 3rd way to impement prototypal inheritance or delegation
        // no prototype properties invlolved
        // no constuctor functions
        // no new keyword operator 
        // we can set the prototype to any object we want
        // CREATES NEW OBJECT, PROTOTYPE OF THAT OBJECT IS THE OBJECT WE PASS IN

        // create prototype for all of the person objects

        // put what we want the person object to inherit when we create the prototypes
        const ProtoPerson = {
            calcAge() {
                console.log(2037 - this.personBirthYear);
            },
             
            init(personFirstName, personBirthYear) {
                this.personFirstName = personFirstName;
                this.personBirthYear = personBirthYear;
            }
        };

        // create person object with person prototype object
        // pass in prototype object of new object
        // return new object that is linked to the prototype object we passed in
        // can set the prototype object manually to any object we want
        // no constructor function or prototype property is needed
        const steven = Object.create(ProtoPerson);
        console.log(steven);

        steven.name = 'Steven';
        steven.personBirthYear = 2000;
        steven.calcAge();

        console.log(steven.__proto__ === ProtoPerson);
        const sarah = Object.create(ProtoPerson);
        sarah.init('Sarah', 1979);
        sarah.calcAge();

// INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS
        // STUDENT WILL INHERIT THE PERSON CLASS
            // STUDENT IS SUBTYPE OF PERSON
            // STUDENT IS CHILD CLASS
            // student will have its own methods, but can also use generic methods from its parent 
            // works the same as ES6 classes internally, we just use different syntax

            // inherit from classes using constructor functions
            // ES6 Classes
            // Object.create()

            // create constructor function for student
            const EStudent = function(personFirstName, personBirthYear, studentCourse) {
                console.log(this);
                console.log('this = ' + this);
                // duplicate code from parent class EPerson
                // this.personFirstName = personFirstName;
                // this.personBirthYear = personBirthYear;
                // we need to manually set this keyword (get keyword from parent function into child)
                EPerson.call(this, personFirstName, personBirthYear)
                this.studentCourse = studentCourse;
            };

            // create prototype manually 
            // EStudent.prototype inherits from EPerson.prototype 
            // it empty, we need to add methods and link it
            // we need to inherit from the object without it being the same object (why we use Object.create())
            EStudent.prototype = Object.create(EPerson.prototype);

            // create method
            EStudent.prototype.introduce = function () {
                console.log(`My name is ${this.personFirstName}, and I study ${this.studentCourse}`);
            };

            // create a new student
            const taylor = new EStudent('Taylor', 2020, 'Computer Science');
            console.log(taylor);
            taylor.introduce();
            taylor.calcAge();

            console.log(taylor.__proto__);
            console.log(taylor.__proto__.__proto__);
            console.log(taylor instanceof EStudent);
            console.log(taylor instanceof EPerson);
            EStudent.prototype.constructor - EStudent;
            console.dir(EStudent.prototype.constructor);

// INHERITANCE BETWEEN "CLASSES": ES6 CLASSES
        // we need two things
            // 1) extend keyword
                // links prototype behind the scenes
            // 2) super() function

        class ClassStudent extends ClassPerson {
            // create constructor with same arguments as the parent class, with additional
            constructor (personFullName, personBirthYear, studentCourse) {
                // super() is the constructor function of the parent class (uses parent arguments) -- MUST HAPPEN FIRST IN CONSTRUCTOR (only needed if not adding/using new properties)
                super(personFullName, personBirthYear);
                this.studentCourse = studentCourse;
            };
            // override introduce() from parent class 
            introduce() {
                console.log(`My name is ${this.personFirstName}, and I study ${this.studentCourse}`);
            };
            // overrides parents class (shadows it)
            calcAge() {
                console.log(`I'm ${2037 - this.personBirthYear}, and I will take this course about  ${this.studentCourse}.`);
            };
        };
        const carey = new ClassStudent('Carey Smith', 2012, 'Computer Science');
        carey.introduce();
        carey.calcAge();

// INHERITANCE BETWEEN "CLASSES": Object.create();
        // ProtoPerson becomes prototype of ProtoStudent, so student inherits from person
        // use this to create new students
            // will be prototype of Jay
        const ProtoStudent = Object.create(ProtoPerson);
        // create student object that inherits from ProtoStudent

        ProtoStudent.init = function (personFirstName, personBirthYear, studentCourse) {
            ProtoPerson.init.call(this, personFirstName, personBirthYear);
            this.studentCourse = studentCourse;
        };


        ProtoStudent.introduce = function () {
            // console.log(`My name is ${this.personFirstName}, and I study ${this.studentCourse}`);
            // this.personFirstName = personFirstName;
        };

        const jay = Object.create(ProtoStudent);
        jay.init('Jay', 2010, 'Computer Science');
        jay.calcAge();


// ENCAPSULATION: PROTECTED AND METHODS
        // to keep some properties private inside of the class so they are not available outside
        // creates a public interface for items not protected
        // prevent code from outside a class to accidentally manipulate data inside of the class
        // a small interface/api, we can change internal code with more confidence

// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)
        // notavailable on all instances but on the class itself (helper functions)

class Account {
    // 1) Public fields (instances)
    locale = navigator.language;
  
    // 2) Private fields (instances)
        // # is the syntax for private field (this changes actual property name to this decalred #)
        // create empty variables and redifine them in the access level 
    #movements = [];
    #pin;
  

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;
  
      // Protected property
      // this._movements = []; // not truly private // signal not to touch it outside of the class
      // this.locale = navigator.language;
  
      console.log(`Thanks for opening an account, ${owner}`);
    }
  
    // 3) Public methods
        // give access from the outside by creating public methods
  
    // Public interface
    getMovements() {
      return this.#movements;
    }
  
    deposit(val) {
      this.#movements.push(val);
      return this;
    }
  
    withdraw(val) {
      this.deposit(-val);
      return this;
    }
  
    requestLoan(val) {
      // if (this.#approveLoan(val)) {
      if (this._approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
        return this;
      }
    }
  
    static helper() {
      console.log('Helper');
    }
  
    // 4) Private methods
        // hide implementation details from the outside
    // #approveLoan(val) {
    _approveLoan(val) {
      return true;
    }
  }
  
  const acc1 = new Account('Jonas', 'EUR', 1111);
  
  // acc1._movements.push(250);
  // acc1._movements.push(-140);
  // acc1.approveLoan(1000);
  
  acc1.deposit(250);
  acc1.withdraw(140);
  acc1.requestLoan(1000);
  console.log(acc1.getMovements());
  console.log(acc1);
  Account.helper();
  
  // console.log(acc1.#movements);
  // console.log(acc1.#pin);
  // console.log(acc1.#approveLoan(100));

// CHAINING METHODS
  // add return stament to methods to make them chainable (we need a return value to chain)
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// ES6 CLASS SUMMARY
    // child class extends parent class 
        // inheritance automatically creates a prototype
    // public field
        // property available on all created objects from class
        // private fields are not accessible outside of the class (data privacy and encapsulation)
        // static public field (available only on class)
    // constructor method
        // called by new operator 
        // mandatory in regular class, might be ommitted in a child class
    // call to the parent class with super() class 
        // necessarry whenever we are writing a child class with extends keyword
        // needs to happen before we can access the this keyword in the constructor 
    // instance property
        // available on created object
    // redifining private field
    // public method
    // reference private field and method
    // getter method
        // get value out of object, by writing a property and not a method
    // setter method
        // property already defined in conctructor needs new property with underscore
    // static method
        // available only on the class 
        // cannot access properties or methods, only static methods
    // create new objectwith new operator

    // Classes are "syntactic suger" over constructor functions
    // Classes are not hoisted
    // Class body is always executed in 'strict mode'
    



            








