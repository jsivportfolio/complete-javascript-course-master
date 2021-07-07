'use strict';

// DEFAULT PARAMETERS
    // do not have to manually pass paramters if we dont change default parameters
    // cannot skip arguments when we call the function

    // create array to store eObjectFlightBooking data
    const eArrayFlightBooking = [];
    // create a booking airlfight function
    const functionCreateFlightBooking = function(eFlightNumber, eFlightPassengerNumber = 1, eFlightPrice = 199 * eFlightPassengerNumber) { // set default parameters, MODERN ES6+, can contain expressions
        
        // create object with enhanced object literal syntax
        // eFlightPassengerNumber = eFlightPassengerNumber || 1; // legacy way to set default parameters, ES5
        const eObjectFlightBooking = {
            // define variable that will create a new property with the name, and have the value that's in the parameter
            eFlightNumber,
            eFlightPassengerNumber,
            eFlightPrice
        }
        console.log('eArrayFlightBooking = ' + eArrayFlightBooking);
        console.log(eArrayFlightBooking);
        // push data to eArrayFlightBooking each time therSe is a flight booking
        eArrayFlightBooking.push(eObjectFlightBooking);
        console.log('eArrayFlightBooking = ' + eArrayFlightBooking);
        console.log(eArrayFlightBooking);
    };

    functionCreateFlightBooking('LH123', 2, 199);
    functionCreateFlightBooking('LH123', 2); // price is dynamically evaluated
    functionCreateFlightBooking('LH123', undefined, 800); // setting parameter to undefined is a way to skip a default parameter

// HOW PASSING ARGUMENTS WORKS IN FUNCTIONS: PRIMITIVE VALUE VS REFERENCE
    // passing primtitive arugment/parameter to a function is the copy of the original being passed in
    // passing object arugment/parameter to a function will modify the original being passed in
        // accessing the object directy, and then accessing its proprty keys can be modified
    // PASSING BY VALUE
        // JS ONLY HAS THIS
        // OBJECT IS STILL A VALUE
    // PASSING BY REFERENCE
        // JS DOES NOT HAVE THIS

const ePrimitiveFlightNumber = 'LH123';
const eObjectPassenger = {
    ePassengerName: 'Example Passenger',
    ePassengerPassportNumber: 12345678910
};

// create Passenger Checked In function when Passenger has already bought the flight
const functionPassengerCheckedIn = function(ePrimitiveFlightNumber, eObjectPassenger) {
    // not best practice to change parameters of a function
    console.log(ePrimitiveFlightNumber);
    console.log(eObjectPassenger);

    if (eObjectPassenger.ePassengerPassportNumber === 12345678910) {
        alert(`${eObjectPassenger.ePassengerName} checked in for the flight number, ${ePrimitiveFlightNumber}.`);
    } else {
        alert(`${eObjectPassenger.ePassengerName} was unable to check in for the flight number, ${ePrimitiveFlightNumber}.`);
    }
};

// call functionPassengerCheckedIn() with ePrimitiveFlightNumber and eObjectPassenger
functionPassengerCheckedIn(ePrimitiveFlightNumber, eObjectPassenger);
console.log(ePrimitiveFlightNumber);
console.log(eObjectPassenger);

// create function for a new passport that accepts any individual and change their passport number
const functionNewPassport = function(ePerson) {
    ePerson.ePassengerPassportNumber = Math.trunc(Math.random() * 1000000000);
};

functionNewPassport(eObjectPassenger);
functionPassengerCheckedIn(ePrimitiveFlightNumber, eObjectPassenger);

// FIRST-CLASS AND HIGHER-ORDER FUNCTIONS
    // FIRST-CLASS FUNCTIONS
        // JavaSript treats functions as first-class citizens
        // This means that functions are simply values
        // Functions are just another "type" of object
        // can store function in variables or properties
        // can pass functions as arguments to other functions
        // can return functions from functions
        // call methods on functions
        // makes it possible to create HIGHER-ORDER FUNCTIONS

    // HIGHER-ORDER FUNCTIONS
        // a function that receives another function as an argument, that returns a new function, or both
        // this is only possible because of FIRST-CLASS FUNCTIONS
        // function that receives another function another function as input (call back function that is called later by the higher order funtion)
        // function that returns new function

// CREATE HIGHER-ORDER FUNCTIONS
    // FUNCTIONS ACCEPTING CALL BACK FUNCTIONS 

    const functionWordRemoveAllSpacess = function (eString) {
        // select all spaces, then replace with empty string, convert to lower case
        return eString.replace(/ /g, '').toLowerCase();
    };
    
    // convert first word of input string to uppercase
    const functionUpperCaseFirstWord = function (eString) {
        const [eWordFirst, ...eWordOthers]= eString.split(' ');
        return [eWordFirst.toUpperCase(), ...eWordOthers].join(' ');
    };

    // create functions that accept other functions as input, higher-order function (transformer) 
    const functionExampleTransformer = function(eString, eHOF) {
        console.log('BEGIN functionExampleTransformer()');
        console.log(eString);
        console.log(eHOF);
        console.log(`Transformed string: ${eHOF(eString)}`);
        console.log();
        console.log('END functionExampleTransformer()');
    };

    functionExampleTransformer('JavaScript is my favorite programming language!', functionUpperCaseFirstWord); // call this later in the block its being passed to

    functionExampleTransformer('JavaScript is my favorite programming language!', functionWordRemoveAllSpacess);

    const functionExampleCallBack = function () {
        console.log('BEGIN functionExample()');
        console.log('END functionExample()');
    };
    document.body.addEventListener('click', functionExampleCallBack); // addEventListener is the higher-order function receiving functio as input, functionExampleCallBack is the call back function

    // create array
    ['John', 'Josh', 'Zach'].forEach(functionExampleCallBack);

    // CALLBACK FUNCTIONS
        // make it easier to design re-usable code with DRY best practices
        // allow us to create abstraction
        // abstraction, is hiding the detail of code implementation, allowing us to think in a higher abstract level
        // think of abstracting code away from code into their own separate functions
        // trasnformers delegate a task to other functions
        // vital part of JS language
        // carry out a task delegated to it

// FUNCTIONS RETURNING FUNCTIONS

const functionExampleGreeting = function (eGreeting) { // pass in greeting
    // return a new function with parameter to receive arguments
    return function (eName) {
        console.log(`${eGreeting} ${eName}!`);
    }
};

// call functionExampleGreeting()
const eGreeter = functionExampleGreeting('Hello'); // return value of functionExampleGreeting (a function) is returned as assigned to eGreeter()
eGreeter('John'); // pass to the nested function in functionExampleGreeting, possible because of closures
eGreeter('Josh'); // pass to the nested function in functionExampleGreeting, possible because of closures
// do it all in one line 
functionExampleGreeting('Hello')('Zane'); // useful when using functional programming paradigm
// same thing with arrow functions
const functionArrowGreet = eGreeting => eName => console.log(`${eGreeting} ${eName}!`);
functionArrowGreet('Hello')('Isla');

// THE CALL AND APPLY METHODS with THIS KEYWORD
    // this keyword refers to the current object

const eObjectAirlineGroup = {
    eAirlineGroupName: 'Example Airline',
    eAirlineGroupCode: 12345678910,
    eAirlineGroupBookings: [],
    eMethodAirlineGroupBook: function (eFlightNumber, eName) {
        console.log(`${eName} booked a seat on ${this.eAirlineGroupName}, FLIGHT: ${this.eAirlineGroupCode}${eFlightNumber}.`);
        this.eAirlineGroupBookings.push({eFlight: `${this.eAirlineGroupCode}`, eName});
        console.log(this.eAirlineGroupBookings);
    }
};

eObjectAirlineGroup.eMethodAirlineGroupBook(239, 'Example Passenger1');
eObjectAirlineGroup.eMethodAirlineGroupBook(635, 'Example Passenger2');

const eObjectAirlineNewGroupFlightWings = {
    eAirlineGroupName: 'New AirlineGroup',
    eAirlineGroupCode: 'EOAGFW',
    eAirlineGroupBookings: [],
    
}

// Bad Practice to copy and paste functions and methods 
// lets take the exisitng method and store it in an internal function that we can use for all airlines
    // this is possible because JS has first class functions 
const functionAirlineGroupBook = eObjectAirlineGroup.eMethodAirlineGroupBook;
// regular function call, this keyword will be undefined
// it is no longer a method, it is now a function call , so explicitly say what key word should point to manually
    // 3 methods to acheive this
        // Call 
        // Apply
        // Bind

// functionAirlineGroupBook(23, 'Example Passenger3'); // undefined because of this keyword is no longer the object method
// function is an object, object have methods, so functions can have methods too
functionAirlineGroupBook.call(eObjectAirlineNewGroupFlightWings, 23, 'Example Passenger4');
console.log(eObjectAirlineNewGroupFlightWings);
// The above code did the following: 
    // called the call() method that calls the functionAirlineGroupBook,
    // and the this key word will be set to the first argument object passed in
    // manually set keyword in dynamic reusable function
    // DRY PRACTICES 

    functionAirlineGroupBook.call(eObjectAirlineGroup, 239, 'Example Passenger5');
    console.log(eObjectAirlineGroup);

    // create more airline group object that can be passed as first argument to set this keyword
    const eObjectAirlineNewGroupUS = {
        eAirlineGroupName: 'US AirlineGroup',
        eAirlineGroupCode: 'EOAGUS',
        eAirlineGroupBookings: [],
        
    };
    const eObjectAirlineNewGroupSWISS = {
        eAirlineGroupName: 'SWISS AirlineGroup',
        eAirlineGroupCode: 'EOAGSWISS',
        eAirlineGroupBookings: [],
        
    };

    functionAirlineGroupBook.call(eObjectAirlineNewGroupUS, 454, 'Example Passenger6');
    console.log(eObjectAirlineNewGroupUS);

    functionAirlineGroupBook.call(eObjectAirlineNewGroupSWISS, 178, 'Example Passenger7');
    console.log(eObjectAirlineNewGroupSWISS);

    // the apply() method
        // legacy way in JavaScript
        // does not receive a list of arguments after the this keyword, instead it takes an array of arguments after this keyword
        // elements in the array are then passed into the functiom

        const eAirlineGroupFlightData = [583, 'Example Passenger8']; // create array 
        functionAirlineGroupBook.apply(eObjectAirlineNewGroupUS, eAirlineGroupFlightData);
        console.log(eObjectAirlineNewGroupUS);

        // modern way is use the call method and use the spread operator of on the array of data (object property keys)
        functionAirlineGroupBook.call(eObjectAirlineNewGroupSWISS, ...eAirlineGroupFlightData);

// THE BIND() METHOD 
    // manually set the this keyword for any function call
    // does not immediately call the function, instead returns a new function where this key word is bound (set to whatever we pass)

    // bind method to create new function
    // this keyword will always be set to eObjectAirlineNewGroupFlightWings
    const functionAirlineGroopBookSwiss = functionAirlineGroupBook.bind(eObjectAirlineNewGroupSWISS);
    functionAirlineGroopBookSwiss(23, 'Example Passenger9');
    console.log('functionAirlineGroopBookSwiss()');

    // its now easy to create an internal library of code
        // break down flow into reusable dynamic functions

    // create bind for one book function specific to airline group
    const functionAirlineGroopBookUS = functionAirlineGroupBook.bind(eObjectAirlineNewGroupUS);
    functionAirlineGroopBookSwiss(23, 'Example Passenger10');
    console.log('END functionAirlineGroopBookUS()');

    // create bind for one book function specific to airline group
    const functionAirlineGroopBookFlightWings = functionAirlineGroupBook.bind(eObjectAirlineNewGroupFlightWings);
    functionAirlineGroopBookSwiss(23, 'Example Passenger11');
    console.log('END functionAirlineGroopBookFlightWings()');

    // define arguments and the function will always be called with the same arguments
    // create bind for one specific airline and flight number
        // partial application
            // part of the original function is already applied or set
            // function with arguments pre-defined
    const functionBookFlightWing23 = functionAirlineGroupBook.bind(eObjectAirlineNewGroupFlightWings, 23);
    functionBookFlightWing23('Example Passenger12');
    functionBookFlightWing23('Example Passenger13');

    // Objects togther with event listeners and bind
    eObjectAirlineNewGroupFlightWings.eAirlineGroupPlanes = 300;
    eObjectAirlineNewGroupFlightWings.methodAirlineGroupBuyPlane = function () {
        console.log(this);
        console.log(this.eAirlineGroupPlanes);
        this.eAirlineGroupPlanes++
        console.log(this.eAirlineGroupPlanes);
    };

    // calling function on its own
    eObjectAirlineNewGroupFlightWings.methodAirlineGroupBuyPlane();

    // event handler function, this keyword always points to the element that event handler is attached to('.buy')
        // manually define this keyword to point to desired object 
            // pass in function bind() method because it returns new function
                // object is now poitning to object and not the html element
    document.querySelector('.buy').addEventListener('click', eObjectAirlineNewGroupFlightWings.methodAirlineGroupBuyPlane.bind(eObjectAirlineNewGroupFlightWings)); // click event and high order call back function

    // PARTIAL APPLICATION (USE CASE FOR BIND METHOD)
        // can preset and define arguments to parameters 
        const functionAddTax = (eRate, eValue) => (eValue + (eValue * eRate));
        console.log(functionAddTax(0.10, 200));

        // function for one tax that we always use 
            // use bind method on functionAddTax() to create a function to preset the eRate value on the eTax() function 
            // this key word is defined in function so use null to prefill
            // create specific function on a general function
        const eFunctionAddTaxVAT = functionAddTax.bind(null, 0.23);
        // eFunctionAddTaxVAT = eValue => eValue + eValue * 0.23; // same as above code 
        console.log(eFunctionAddTaxVAT(100));
        console.log(eFunctionAddTaxVAT(23));

        const functionAddTaxRate = function (eRate) { // takes eRate as paremeter
            return function (eValue) { // return a new function that takes the eValue
                return eValue + eValue * eRate;
            }
        };
        const eFunctionAddTaxVAT2 = functionAddTaxRate(0.23);
        console.log(eFunctionAddTaxVAT2(100));
        console.log(eFunctionAddTaxVAT2(23));

// IMMEDIATELY INVOKED FUNTION EXPRESSIONS (IIFE)
    // sometimes we only need a function that executes once but never again
    // essentially a function that disappears right after it's called 
    // functions create scope, one scope does have access to inner scope
        // all data inside of scope is private (encapsulated)
            // very important for data privacy and integrity


    // const functionRunOnceIIFE = function () {
    //     console.log('This is the only time we will run functionRunOnceIIFE().');
    // };
    // functionRunOnceIIFE();

    // we trick JS into thinking it is an expression
    // transform the statement into an expression by by wrapping it into ()
        // it still wont execute so we have to immediately call/invoke the function by using ();  
    (function functionRunOnceIIFE () {
        console.log('This is the only time we will run functionRunOnceIIFE().');
    })();

    // we can do the same as above, also for arrow functions
    (() =>  console.log('This is the only time we will run functionRunOnceIIFE().'))();



// CLOSURES
    // 'an almost mystical feature of JavaScript'
    // closures are not features we create manually use (explicitely)
    // happens automatically in certain situations
    // a function always has access to the variable environment in which it was created even when it do not exist anymore
    // it is a VE attached to the function, exactly as it was at the time and palce the function was created 
    // CLOSURE has priority over scope chain 
    // CLOSURE Formal Definiton: 
        // A closure is the closed-over variable environment of the execution context in which a function was created, evfen after that execution context is gone
    // CLOSURE In-Formal Definiton: 
        // a closure gives a function access to all the varaibles of its parent function, even after that parent function has returned
        // the function keeps a reference to its outer scope, which preserves the scope chain throughout times
    // a closur makes sure that function does not lose connection to varaibles that existed atthe function's "birh place"
    // a closure is likea backpack that a function carries around wherever it goes. This backpack has all the varaibles that were present in the environment where the fucntion ws created
    // we do not have to manually create closures, this is a JavaAAcript feature that happens automatically. We cannot access closed-over variables explicitly.
    // A closure is not a tangible JavaScript object 

    // simulate a closure situation
    const functionSecureAirlineGroupBooking = function() {
        console.log('BEGIN functionSecureAirlineGroupBooking()');

        let eAirlinePassengerCount = 0;
        console.log('eAirlinePassengerCount = ' + eAirlinePassengerCount);

        return function () {
            eAirlinePassengerCount++
            console.log('eAirlinePassengerCount = ' + eAirlinePassengerCount);
        }
    };

    // functionSecureAirlineGroupBooking() returns a new function that is store into efSecureAirlineGroupBooking()
        // this function exists in the global scope and its environment that it was created no longer exists, the count variable
        // closure remembers all variables that existed at the functions birth place - functionSecureAirlineGroupBooking
    const efSecureAirlineGroupBooking = functionSecureAirlineGroupBooking();
    console.log(efSecureAirlineGroupBooking());
    console.log(efSecureAirlineGroupBooking());
    console.log(efSecureAirlineGroupBooking());