// STRICT MODE
    // is special mode to activate in JS that enables us to write secure javascript code 
    // activate by writing string and beginning of script 'use strict';
    // this statement has to be thery first in the script file
        // any code before the strict statement will not be strictly secured or activated
    // can be activated for specific funtions and blocks
        // better practice to use at the beginning of the script 
    // makes it easier to avoid bugs
        // it forbids us to do certain things
        // creates visible errors that normally wouldnt alert and fail silently
            // creates visible errors in the js console

'use strict';

let hasAccess = false;
const accessGranted = true;

if (!accessGranted) {
    // hasAcess = true; // throws Uncaught ReferenceError: is not defined 
    console.log("The user have access.")
} else {
    hasAccess = false;
    console.log("The user does not have access.")
}

if (accessGranted) {
    hasAccess = true;
    console.log("The user have access.")
} else {
    hasAccess = false;
    console.log("The user does not have access.")
}

// const interface = 'Audio'; // throws Uncaught SyntaxError: Unexpected strict mode reserved word
// const if = 'Unexpected token'; throws Uncaught SyntaxError: Unexpected token
// reserved words cannot be used for variables 

// FUNCTIONS 
    // Functions are the fundamental building block of front end applications in JavaScript
    // a piece of code that we can re-use over and over again, like a variable except with lines or blocks of code
    // great for making dry code, re-usable code 

// declare a function
    // function keyword
    // function name ()
    // {} for the function body
function exampleFunctionName () {
    // function body code to be executed
    console.log("function body code executed for the function exampleFunctionName log");
}
// function is created, now use it by
    // invoking the function
    // calling the function
    // running the function
// functions are used by writing the function name followed by ()
exampleFunctionName();
exampleFunctionName();
exampleFunctionName();
exampleFunctionName();

// Pass Data into functions && Return Data from functions (to give us data back that we can use for something else in the program)
// functions are like machines, feed the machine data, and the machine returns processed data 

    // PARAMETERS IN FUNCTIONS 
        // PARAMETERS are like variables that are specific to this function, and are defined when we call the function
            // PARAMETERS are defined when the function is called 

// declare function with two parameters
function exampleFruitMachineProcessor (kiwi, mango) {
    // BEGIN FUNCTION
    // Simulate a Fruit Smoothie Machine
    console.log(kiwi, mango); // undefined if parameters are not passed data to return 
    const juiceProcessed = `You produced a smoothie using juices, ${kiwi} kiwi and ${mango} mango.`;
    console.log("juiceProcessed" + juiceProcessed);
    console.log();

    // return the value that we procuced from the function to be used elsewhere in the code
    return juiceProcessed; // the result of executing this function
}

// call|run|invoke the function we just created, exampleFruitMachineProcessor
    // specify the values for the parameters as 5 kiwi and 3 mango by passing data values
        // these are the inputs of the exampleFruitMachineProcessor function, called arguments
            // these input values are called arguments 
            // store these returned values in a variable if we want to use it
const juiceSmoothie = exampleFruitMachineProcessor(5,3);
console.log("juiceSmoothie" + juiceSmoothie);
// called function with two arguments, 5 kiwi and 3 mango.
// These are the actual values of the function parameters, kiwi and mango. 
// Use these values to build juiceProcessed string variable and return that value from the function.
// Save or "capture" that value to a variable. 

console.log(exampleFruitMachineProcessor(5,4)); // execute and log the value without capturing the return value to a variable and directly to the console

// FUNCTION DECLARATION VS EXPRESSIONS
    // DECLARATION
        // function declarations can be called before they are defined in the code 
        // birth year input as argument variable to calculate age
        function exampleFunctionDeclarationCalculateAge1(aBirthYear) {
            console.log(aBirthYear);
            const calculateAge1WithBirthYear = 2021 - aBirthYear;
            return calculateAge1WithBirthYear;
        }
        const calculatedAge1 = exampleFunctionDeclarationCalculateAge1(1995); // is the argument to fill the parameter with a value 
        console.log(calculatedAge1);
        console.log();
    // EXPRESSION
        // write function without a name, define parameter, define function body aka ANONYMOUS FUNCTION
            // store all of this into a variable
                // this variable is the function
        // expression produces value, use the value and store into the const varaible as a function
        const calculateAge2 = function (aBirthYear2) {
            return 2021 - aBirthYear2;
        }
        // create a variable to hold a function, functions are also considered values
        // if this varaible is called before being defined, it will throw Uncaught ReferenceError: Cannot access before initialization
        const calculatedAge2 = calculateAge2(1995);
        console.log(calculatedAge2);

        console.log(calculatedAge1, calculatedAge2);
    
// It is a matter of preference, some prefer to use function expressions becuase
    // forces a nice code structure
    // define functions first at top of code
    // then call them

// ARROW FUNCTIONS =>
        // a special form of function expression that is shorter and faster to write
        // curly braces {} are not needed and the return happens implicitly
            // automatically be returned without having to explicitly writing the return keyword
const exampleArrowFunctionCalculateAge3 = aBirthYear3 => 2021 - aBirthYear3;
// call the arrow function,exampleArrowFunctionCalculatedAge3
// exampleArrowFunctionCalculatedAge3();
console.log("exampleArrowFunctionCalculateAge3 = " + exampleArrowFunctionCalculateAge3);
const calculatedAge3 = exampleArrowFunctionCalculateAge3(1995);
console.log("calculatedAge3 = " + calculatedAge3);
console.log();

const yearsUntilRetirement = (aFirstName, aBirthYear4) => {
    const anAge = 2021 - aBirthYear4;
    const aRetirementAge = 67 - anAge;
    return `${aFirstName} retires in ${aRetirementAge} years.`;
}
console.log("yearsUntilRetirement = " + yearsUntilRetirement);
const calculatedRetirementAge = yearsUntilRetirement('John', 1995);
console.log("calculatedRetirementAge = " + calculatedRetirementAge);

// If multiple parameters exist, we need to wrap the paparameters with parenthesis 
    // (aParameter1, aParameter2)

// FUNCTIONS CALLING OTHER FUNCTIONS

function exampleMachineCutFruitPieces (aFruit) {
    return aFruit * 4;
}

function exampleFruitMachineProcessor2 (kiwi, mango) {
    const fruitPiecesKiwi = exampleMachineCutFruitPieces(kiwi);
    const fruitPiecesMango = exampleMachineCutFruitPieces(mango);
    const juiceProcessed = `You produced a smoothie using juices, ${fruitPiecesKiwi} kiwi pieces and ${fruitPiecesMango} mango pieces.`;
    console.log("juiceProcessed" + juiceProcessed);
    console.log();
    return juiceProcessed;
}
const juiceSmoothie2 = exampleFruitMachineProcessor2(5,3);
console.log("juiceSmoothie" + juiceSmoothie2);
console.log(exampleFruitMachineProcessor2(10,10));

// Function name
// Parameters
    // are place holders to receive input values
    // like local varaibles of a function
// Function Body
    // block of code that we want to reuse
    // processes the functions input data 
// Calling, running, invoking the function, using ()
// Arguments 
    // actual values of function parameters, to input data
// Variable 
    // to save returned value (function output)

// INTRODUCTION TO ARRAYS 
    // Arrays are DATA STRUCTURES
    // a conainer in which we can store variables and later reference them 
    // get data, store data, process data, give data back
    // data values inside of an array separated by commas
    // arrays can hold as many values as we want
    // arrays can hold any data type
    // arrays are ZERO BASED, starting at element [0]
    // not a primitive value, so we can change and mutate array values

// Use illiteral syntax to create and array []
const exampleArrayUsers = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
console.log(exampleArrayUsers);
console.log('exampleArrayUsers = ' + exampleArrayUsers);
console.log();

// get the number of elements in array using property length
    // great to get the last element of an Array;
console.log('exampleArrayUsers.length = ' + exampleArrayUsers.length);
console.log('exampleArrayUsers last element = ' + (exampleArrayUsers[exampleArrayUsers.length - 1]));
exampleArrayUsers[3] = 'exampleUserReplaced';
console.log('exampleArrayUsers last element = ' + (exampleArrayUsers[exampleArrayUsers.length - 1]));

// print 1st index of exampleArrayUsers
console.log('print 1st index of exampleArrayUsers = ' + exampleArrayUsers[0]);
// print 2nd index of exampleArrayUsers
console.log('print 2nd index of exampleArrayUsers = ' + exampleArrayUsers[1]);
// print 3rd index of exampleArrayUsers
console.log('print 3rd index of exampleArrayUsers = ' + exampleArrayUsers[2]);

// Use Array Function to create an array
const exampleArrayUserSinceYear = new Array (2000, 2021, 2021, 2006 , 2013);
console.log(exampleArrayUserSinceYear);
console.log('exampleArrayUserSinceYear = ' + exampleArrayUserSinceYear);
console.log();

console.log('exampleArrayUserSinceYear.length = ' + exampleArrayUserSinceYear.length);
console.log('exampleArrayUserSinceYear last element = ' + (exampleArrayUserSinceYear[exampleArrayUserSinceYear.length - 1]));
exampleArrayUserSinceYear[4] = 20222221;
console.log('exampleArrayUserSinceYear last element = ' + (exampleArrayUserSinceYear[exampleArrayUserSinceYear.length - 1]));

// print 1st index of exampleArrayUserSinceYear
console.log('print 1st index of exampleArrayUsers = ' + exampleArrayUserSinceYear[0]);
// print 2nd index of exampleArrayUserSinceYear
console.log('print 2nd index of exampleArrayUsers = ' + exampleArrayUserSinceYear[1]);
// print 3rd index of exampleArrayUserSinceYear
console.log('print 3rd index of exampleArrayUsers = ' + exampleArrayUserSinceYear[2]);
// print 4th index of exampleArrayUserSinceYear
console.log('print 4th index of exampleArrayUsers = ' + exampleArrayUserSinceYear[3]);
// print 5th index of exampleArrayUserSinceYear
console.log('print 5th index of exampleArrayUsers = ' + exampleArrayUserSinceYear[4]);

// ARRAYS CAN HOLD VALUES OF DIFFERENT DATA TYPES
const exampleVariable = '';
const exampleArrayDifferentDataTypes = ['', exampleVariable, 1]
console.log(exampleArrayDifferentDataTypes);
console.log('exampleArrayDifferentDataTypes = ' + exampleArrayDifferentDataTypes);

// ARRAY EXERCISE
const calculateAge5WithBirthYear = function (aBirthYear5) {
    return 2021 - aBirthYear5;
}
const exampleArrayBirthYears = [1990, 1967, 2002, 2010, 2018];

const resutltAge1 =  calculateAge5WithBirthYear(exampleArrayBirthYears[0]);
const resutltAge2 =  calculateAge5WithBirthYear(exampleArrayBirthYears[1]);
const resutltAge3 =  calculateAge5WithBirthYear(exampleArrayBirthYears[2]);
const resutltAge4 =  calculateAge5WithBirthYear(exampleArrayBirthYears[3]);
const resutltAge5 =  calculateAge5WithBirthYear(exampleArrayBirthYears[4]);

console.log(resutltAge1, resutltAge2, resutltAge3, resutltAge4, resutltAge5);

const exampleArrayResultAge = [resutltAge1, resutltAge2, resutltAge3, resutltAge4, resutltAge5];
console.log(exampleArrayResultAge);

// Array Operations (Array Methods)
// JS has built in functions that we can apply directly on arrays, called methods or array operations
    // PUSH METHOD 
        // adds element to the end of an array, push();
        // push is a function, so we can return a value is the length of the new array
        
        const exampleArrayUsers2 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers2);
        exampleArrayUsers2.push('exampleUser4Push');
        console.log(exampleArrayUsers2);
        console.log('exampleArrayUsers = ' + exampleArrayUsers2);
        console.log();

    // UNSHIFT METHOD unshift();
        // adds element to the beginning of an array
        // can also return the length of the new array

        const exampleArrayUsers3 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers3);
        exampleArrayUsers3.push('exampleUser4Push');
        exampleArrayUsers3.unshift('exampleUserUnshift');
        console.log(exampleArrayUsers3);
        console.log('exampleArrayUsers = ' + exampleArrayUsers3);
        console.log();

    // remove element from an array
        // POP METHOD pop();
        // removes the last element of an array
        const exampleArrayUsers4 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers4);
        exampleArrayUsers4.push('exampleUser4Push');
        exampleArrayUsers4.unshift('exampleUserUnshift');
        exampleArrayUsers4.pop();
        console.log(exampleArrayUsers4);
        console.log('exampleArrayUsers4 = ' + exampleArrayUsers4);
        console.log();
        
        // SHIFT METHOD shift();
        // removes the first element of an array
        const exampleArrayUsers5 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers5);
        exampleArrayUsers5.push('exampleUser4Push');
        exampleArrayUsers5.unshift('exampleUserUnshift');
        exampleArrayUsers5.pop();
        exampleArrayUsers5.shift();
        console.log(exampleArrayUsers5);
        console.log('exampleArrayUsers5 = ' + exampleArrayUsers5);
        console.log();

    // INDEX OF METHOD idexOf()
        // tell us position of certain element in an array

        const exampleArrayUsers6 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers6);
        exampleArrayUsers6.push('exampleUser4Push');
        exampleArrayUsers6.unshift('exampleUserUnshift');
        exampleArrayUsers6.pop();
        exampleArrayUsers6.shift();
        console.log(exampleArrayUsers6.indexOf('exampleUser2'));
        console.log(exampleArrayUsers6);
        console.log('exampleArrayUsers6 = ' + exampleArrayUsers6);
        console.log();

    // INCLUDES METHOD includes();
        // return true if element is in the array
        // return false if element is not in the array
        // ES6 METHOD
        
        const exampleArrayUsers7 = ['exampleUser1', 'exampleUser2', 'exampleUser3'];
        console.log(exampleArrayUsers7);
        exampleArrayUsers7.push('exampleUser4Push');
        exampleArrayUsers7.unshift('exampleUserUnshift');
        exampleArrayUsers7.pop();
        exampleArrayUsers7.shift();
        console.log(exampleArrayUsers7.indexOf('exampleUser2'));
        console.log(exampleArrayUsers7.includes('exampleUser4Push'));
        console.log(exampleArrayUsers7.includes('exampleUserUnshift'));
        console.log(exampleArrayUsers7.includes('exampleUser1'));
        console.log(exampleArrayUsers7.includes('exampleUser3'));
        console.log(exampleArrayUsers7);
        console.log('exampleArrayUsers7 = ' + exampleArrayUsers7);
        console.log();

// INTRODUCTION TO OBJECTS - another DATA STRUCTURE
    // object {} with key value pairs 

    const exampleUserArray = [
        'exampleUserName',
        'exampleUserFirstName',
        'exampleUserLastName',
        'exampleUserEmail',
        'exampleUserPassword',
        1991,
        false
    ];
    console.log(exampleUserArray);
    console.log('exampleUserArray = ' + exampleUserArray);

    // object
        // has 3 keys
        // each key has a value
        // each key is also called a property
        // has 3 properties
        // most fundamental concept in JavaScript language
        // use objects to group together different data and variables that belong together
        // order of data value does not matter in object when we want to retreive them like an array
            // objects are better for unstructured data
            // arrays are better for structured data

    const exampleUserObject = {
        exampleUserUsername: 'exampleUserUsername',
        exampleUserFirstName: 'exampleUserFirstName',
        exampleUserLastName: 'exampleUserLastName',
        exampleUserEmail: 'exampleUserEmail',
        exampleUserPassword: 'exampleUserPassword',
        exampleUserBirthYear: 1991,
        exampleUserIsAdmin: false,

        // function attached to an object is called a method
        // calculateExampleUserAge: function (aExampleUserBirthYear) {
        //     return 2021 - aExampleUserBirthYear;
        // }
        // this variable 
            // equal to the object calling the method
            // read birth year directly from the object itself without having to pass it into the function
            // calculateExampleUserAge: function () {
            //     console.log(this);
            //     return 2021 - this.exampleUserBirthYear;
            // }
            // THIS KEYWORD TO STORE VALUE INTO VARIABLE AND STORE THAT AS PART OF THIS OBJECT
            calculateExampleUserAge: function () {
                console.log(this);
                const calculatedExampleUserAge = 2021 - this.exampleUserBirthYear;
                console.log(calculatedExampleUserAge);
                this.exampleUserAge = calculatedExampleUserAge;
                return this.exampleUserAge;
            },

            getExampleUserSummary: function () {
                return `${this.exampleUserUsername} was born in ${this.exampleUserBirthYear}, and is ${this.calculateExampleUserAge()} years of age.This user is ${this.exampleUserIsAdmin ? 'an' : 'not an'} admin.`;
            }
    };
    console.log(exampleUserObject);
    console.log('exampleUserObject = ' + exampleUserObject);

// RETRIEVE AND CHANGE DATA FROM OBECTS 
    // DOT VS BRACKET NOTATION
        // DOT
            // operator that goes to object to retrieve the property
            // use real final property name
        console.log(exampleUserObject.exampleUserUsername);
        console.log(exampleUserObject.exampleUserFirstName);
        console.log(exampleUserObject.exampleUserLastName);
        console.log(exampleUserObject.exampleUserEmail);
        console.log(exampleUserObject.exampleUserPassword);
        console.log(exampleUserObject.exampleUserBirthYear);
        console.log(exampleUserObject.exampleUserIsAdmin);

        // BRACKET NOTATION
            // can add any expression so we dont explicitly write the string, and compute it
            // can use computed property name
        console.log(exampleUserObject["exampleUserUsername"]);
        console.log(exampleUserObject["exampleUserFirstName"]);
        console.log(exampleUserObject["exampleUserLastName"]);
        console.log(exampleUserObject["exampleUserEmail"]);
        console.log(exampleUserObject["exampleUserPassword"]);
        console.log(exampleUserObject["exampleUserBirthYear"]);
        console.log(exampleUserObject["exampleUserIsAdmin"]);

        // create variable key with common part of key property names
        // uses this to access the object values and retrieve the key property value
        const nameKey = 'Name';
        console.log(exampleUserObject['exampleUserFirst' + nameKey]);
        console.log(exampleUserObject['exampleUserLast' + nameKey]);

        // prompt()
            // create pop up with input field
            // PROMPT function returns string, so we store it into a variable
        const examplePromptTest = prompt('What test data do you want to see about the exampleUser? Choose between exampleUserUsername, exampleUserFirstName, exampleUserLastName, exampleUserEmail.');
        console.log('examplePromptTest = ' + examplePromptTest);
        console.log(exampleUserObject[examplePromptTest]);

        if (exampleUserObject[examplePromptTest]) {
            console.log(exampleUserObject[examplePromptTest]);
        } else {
            console.log('User test data does not exist.');
        }

        // add new properties to an object 
        exampleUserObject.exampleUserLocation = 'exampleUserLocation'; // DOT NOTATION
        console.log(exampleUserObject);
        console.log('exampleUserObject = ' + exampleUserObject);
        exampleUserObject['exampleUserTwitter'] = '@exampleUserTwitter'; // BRACKET NOTATION
        console.log(exampleUserObject);
        console.log('exampleUserObject = ' + exampleUserObject);
        console.log();

        // CHALLENGE
        // DNYAMIC CHALLENGE with example user data object
        console.log(`${exampleUserObject.exampleUserUsername} has the following key properties: ${exampleUserObject.exampleUserFirstName}, ${exampleUserObject.exampleUserLastName}, ${exampleUserObject.exampleUserEmail}, ${exampleUserObject.exampleUserLocation}, ${exampleUserObject.exampleUserTwitter}`);
        console.log();

// OBJECT METHODS
        // Objects can hold different types of data
            // can hold objects, arrays, and other data 
        // function is another type of value
        // can add functions to objects as key value pair
        console.log(exampleUserObject);
        console.log('exampleUserObject = ' + exampleUserObject);
        console.log(exampleUserObject.calculateExampleUserAge(exampleUserObject.exampleUserBirthYear)); // not DRY
        console.log(exampleUserObject.calculateExampleUserAge()); // DRY
        console.log(exampleUserObject.exampleUserAge); // created object property in function from existing key properties and calculation

        if (exampleUserObject.calculateExampleUserAge(exampleUserObject.exampleUserBirthYear > 18)) {
            console.log('exampleUserAge > 18');
            console.log(exampleUserObject.getExampleUserSummary());
        } else {
            console.log('exampleUserAge < 18');
        }

// ITERATION: THE FOR LOOP - CONTROL STRUCTURE
    // Loops are fundamental aspect of every programming language
    // automate repetitive tasks 
    // For Loop has a counter
        // 3 Parts
            // 1) initial value of counter 
            // 2) logical condition that is evaluated before each iteration of the loop
                // loop runs while the condition is true
                // loop will stop executing when the condition is false
            // 3) increment the counter
                // prevents infitine loops
        
    for (let exampleForLoopI = 1; exampleForLoopI <= 10; exampleForLoopI++) {
        console.log(exampleForLoopI);
        console.log('exampleForLoopI = ' + exampleForLoopI);
    }
    console.log();

// create a new array
// create a new array that will contain the type for each element using the loop below
 const exampleArrayUserElementTypes = [];
// LOOPING ARRAYS, BREAKING AND CONTINUING 
    // using exampleObjectStructure.length() dynamically to read values from array
    for (let i = 0; i <= exampleUserArray.length; i++) {
        console.log(i);
        console.log("exampleUserArray element = " + exampleUserArray[i], "exampleUserArray type = " + typeof exampleUserArray[i]);
        
        exampleArrayUserElementTypes[i] = typeof exampleUserArray[i]; // traditional way
        // exampleArrayUserElementTypes.push(typeof exampleUserArray[i]); // using push method
        console.log(exampleArrayUserElementTypes);
    }

    console.log("exampleArrayUserElementTypes = " + exampleArrayUserElementTypes);

// CONTINUE AND BREAK STATEMENTS
    // CONTINUE STATEMENT
        // IS TO EXIT THE CURRENT ITERATION OF THE LOOP AND CONTINUE TO THE NEXT ITERATION OF THE LOOP

    // BREAK STATEMENT
        // IS USED TO COMPLETELY TERMINATE THE WHOLE LOOP
        
            // build only strings array
            const exampleArrayUserElementTypeString = [];
            for (let i = 0; i <= exampleUserArray.length; i++) {
                if (typeof exampleUserArray[i] !== 'string') continue;
                console.log(i);
                console.log("exampleUserArray element = " + exampleUserArray[i], "exampleUserArray type = " + typeof exampleUserArray[i]);
                
                exampleArrayUserElementTypeString[i] = typeof exampleUserArray[i]; // traditional way
                // exampleArrayUserElementTypes.push(typeof exampleUserArray[i]); // using push method
                console.log(exampleArrayUserElementTypeString);
            }
        
            console.log("exampleArrayUserElementTypeString = " + exampleArrayUserElementTypeString);

            // break with a number, stop when numbers are found
            const exampleArrayUserElementTypeNumber = [];
            for (let i = 0; i <= exampleUserArray.length; i++) {
                if (typeof exampleUserArray[i] === 'number') break;
                console.log(i);
                console.log("exampleUserArray element = " + exampleUserArray[i], "exampleUserArray type = " + typeof exampleUserArray[i]);
                
                exampleArrayUserElementTypeNumber[i] = typeof exampleUserArray[i]; // traditional way
                // exampleArrayUserElementTypes.push(typeof exampleUserArray[i]); // using push method
                console.log(exampleArrayUserElementTypeNumber);
            }
            console.log("exampleArrayUserElementTypeNumber = " + exampleArrayUserElementTypeNumber);

// LOOPING BACKWARS AND LOOPS INSIDE OF LOOPS (NESTED LOOPS)
    // using exampleObjectStructure.length() dynamically to read values from array
for (let i = exampleUserArray.length - 1; i >= 0; i--) {
    console.log(i);
    console.log("exampleUserArray element = " + exampleUserArray[i], "exampleUserArray type = " + typeof exampleUserArray[i]);
}
console.log("exampleArrayUserElementTypes = " + exampleArrayUserElementTypes);

// The WHILE LOOP        
    // 3 Parts
        // 1) initial value of counter 
        // 2) logical condition that is evaluated before each iteration of the loop
            // loop runs while the condition is true
            // loop will stop executing when the condition is false
        // 3) increment the counter
            // prevents infitine loops
    // More versatile than the for loop
        // more useful in a variety of scenarios
        // it does not need a counter, just a condition that needs to be true to keep running, can be any condition

let exampleWhileLoopI = 1;
while (exampleWhileLoopI <= 10) {
    console.log(exampleWhileLoopI);
    console.log('exampleWhileLoopI = ' + exampleWhileLoopI);
    exampleWhileLoopI++;
}

let diceRoll = Math.trunc(Math.random() * 6) + 1;
console.log('diceRoll = ' + diceRoll);

while (diceRoll !== 6) {
    if (diceRoll !== 6) {
        console.log(`You rolled a ${diceRoll}`);
        diceRoll = Math.trunc(Math.random() * 6) + 1;
    }
}
    console.log(`You rolled a ${diceRoll}`);
    console.log('NO MORE DICE ROLLS.');
    console.log('GAME OVER.');


let numberOfSubscribers = 0;
console.log("numberOfSubscribers = " + numberOfSubscribers);
console.log();
// take previous value of numberOfUsers, add 1, re-assign the value
// the following is bad practice, we use loops to accomplish the same result 
// numberOfLikes = numberOfLikes + 1;
// numberOfLikes = numberOfLikes + 1;
// numberOfLikes = numberOfLikes + 1;
// console.log("numberOfLikes = " + numberOfLikes);
// console.log();

// execute block of code while condition is true 
while (numberOfSubscribers < 10){
    // take previous value of numberOfUsers, add 1, re-assign the value
    numberOfSubscribers = numberOfSubscribers + 1;
    console.log(numberOfSubscribers);
}
console.log("numberOfSubscribers = " + numberOfSubscribers);
console.log();

// INCREMENTING 
    // Below are ways to increment
// numberOfSubscribers = numberOfSubscribers + 1;
// numberOfSubscribers += 1;
// numberOfSubscribers++
// ++numberOfSubscribers

// control variable; control statement; increment
// add to the while loop that is above 
for (let i = 0; i <= 10; i++) {
    numberOfSubscribers++;
    console.log(numberOfSubscribers);
}
console.log("numberOfSubscribers = " + numberOfSubscribers);
console.log();
    

