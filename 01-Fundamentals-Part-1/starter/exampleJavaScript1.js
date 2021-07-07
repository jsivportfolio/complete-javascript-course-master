// PLEASE NOTE THAT ALL HARDCODED VALUES && EXCESSIVE CONSOLE LOGS ARE FOR EDUCATIONAL PURPOSES ONLY // 

// link this script to the html file
alert("Hello JS World!");

let js = 'jsHelloWorld'; 

if (js === 'jsHelloWorld') {
alert('JavaScript is FUN!');
} else {
console.log("js != jsHelloWolrd")
}

// javascript executes procedurally 
// let with no value is undefined
// constants cant be re-assigned a value
// let allows a value to be manipulated 
// JS does not require types to be declared or maintained, JS does not care, we can dynamically move from type to type

// store data values into variables so we can re-use them, these are usually the smallest unit in js
// declare and initialize a variable to assign a value 
// if structured correctly, one variable can change all references to that variable object
// varaible convention is camelCasingIsBestPractice for naming variables 
// variable names can only contain numbers, letters, _, and $
// cannot use keywords for naming convetions such as RESERVED KEYWORDS
// variable names should be descriptive for clean code, THIS HELPS ALL DEVELOPERS, VERBOSE IS NOT BAD

// create string
    // string needs to be surrounded by quotes
    // will throw a syntax error in the console debug tool
const myName = "John";
console.log("myname = " + myName);
console.log();

const aGreeting = "Hello" + " " + myName;
console.log("aGreeting = " + aGreeting);
console.log();

const aWelcomeMessage = "Welcome Back";
console.log("aWelcomeMessage = " + aWelcomeMessage);
console.log();

// Template Literal Strings ${instertStringHere}
    // use `` backticks for Template Literal Strings 
const aSentence = `Hello ${myName}, ${aWelcomeMessage}!`;
console.log("aSentence = " + aSentence);
console.log();

// DATA TYPES IN JAVASCRIPT
// IN JS,
    // All values are objects OR primitive data types
    // JavaScript has dynamic typing
        // Dynamic Typing = do NOT have to manually define the data type of the stored value in a variable, we can instead trust JS to determine this automatically when stored into a variable
        // VARIABLES do not have a TYPE
        // VALUES have a type and are stored into variables 

// Data Type: Number = Floating point numbers, used for decimals and integers."
let age = 25;

// Data Type String = Sequence of characters, used for text
let exampleString = "Sequence of characters, used for text";

// Data Type Boolean = logial type that can only be TRUE or FALSE, used for making decisions with code
let exampleBooleanTrue = true;
let exampleBooleanFalse = false;

// Data Type UNDEFINED = value taken by a variable that is not yet defined or an ('empty value')
// let exampleUNDEFINED;

// Data Type NULL = also means 'empty value'

// Symbol (ES2015) = a value that is unique and cannot be changed [not useful for now]

// BigInt (ES2020) = for larger integers than what the Number DATA TYPE can hold

// THERE ARE 3 DIFFERENT WAYS TO CREATE A VARIABLE 
    // let
        // mutations, empty variables 
        // only use let if we are really sure the variable is supposed to change 
        // BLOCK SCOPED
    // const
        // used when we do not want value of the variable to change 
        // cannot start with an empty value
        // should be initialized
    // var
        // completely avoid this, as it is LEGACY
        // FUNCTION SCOPED 

let exampleLet = 1;
exampleLet = "String"; // exampleLet was mutated from a Number to a String 

const exampleConst = 1;
// exampleConst = 2; // throws error because const is immutable, meaning it cannot be changed 

// It is best practice to have as little variable changes as possible to MITIGATE BUGS

// OPERATORS
    // allows us to transform and combine, mutate values 
    // typeof operator gives us the type of a value 

// Math Operators
const monthlyRent = 800;
console.log("monthlyRent = " + monthlyRent);
console.log();

const yearlyRent = monthlyRent * 12;
console.log("yearlyRent = " + yearlyRent);
console.log("yearlyRent to the 6th power = " + (yearlyRent ** 3));
console.log();

// Assignment Operators
let x = 1 + 1; // x is assigned the value of 2 from plus operator
console.log("x = " + x);
x += 1; // x from previous x is added to one and the result is assigned to x
console.log("x = " + x);
x *= 1; // x from previous x is multiplied to one and the result is assigned to x
console.log("x = " + x);
x++; // x = x + 1
console.log("x = " + x);
x--; // x = x - 1
console.log("x = " + x);

// Comparison Operators
    // >, <, >=, <=
console.log(1 > 2); // false
console.log(1 < 2); // true 

// OPERATOR PRECEDENCE
    // Math Laws with LOGIC 
console.log();

// CONTROL FLOW 
    // control structures = allow us to have more control over the way that code is executed
    // control which blocks of code execute

// if / else Statements 
    // IF STATEMENTS STAND ALONE ONLY DO NOT NEED {}
// Else If Statement
const numberOfUsers = 1000;
console.log("numberOfUsers = " + numberOfUsers);
console.log();

if (numberOfUsers > 0){
    console.log("numberOfUsers = " + numberOfUsers);
    console.log();
    if (numberOfUsers === 0){
        console.log("numberOfUsers = " + numberOfUsers);
        console.log("The project needs marketing.");
        console.log();
    } else if (numberOfUsers >= 500 && numberOfUsers < 1000){
        console.log("numberOfUsers = " + numberOfUsers);
        console.log("The project marketing is starting to work.");
        console.log();
    } else if (numberOfUsers >= 1000){
        console.log("numberOfUsers = " + numberOfUsers);
        console.log("The project marketing is paying off.");
        console.log();
    } else {
        console.log("BUG FOUND! For some reason numberOfUsers did not meet any of the conditional statements");
        console.log();
    }
} else {
    console.log("numberOfUsers = " + numberOfUsers);
    console.log("This project has 0 users.");
    console.log();
}

// if else doesnt exist, then js will continue to move on with the code even if it is false or true

// TYPE CONVERSION AND COERCION
    // TYPE CONVERSION = IS MANUALLY CONVERTING FROM ONE TYPE TO ANOTHER 
    // TYPE COERCION = JS automatically converts types behind the scenes, it is hidden
    // NaN (Not a Number) when js fails to produce a number, aka invalid number

// Conversion
const exampleInputFieldNumber = '1';
console.log("exampleInputFieldNumber = " + exampleInputFieldNumber);
console.log(Number(exampleInputFieldNumber), exampleInputFieldNumber); // convert string to a number
console.log(Number(exampleInputFieldNumber) + 10); // convert to add, if not then it will just append a string

// Coercion
// happens when operator is dealing with two values of different types
    // JS behind the scenes converts one value type to the other so the operation can be executed
        // strings to numbers
        // numbers to strings 
    // Bad Practice and can lead to many unexpected bugs 
let eTC = '1' + 1; // 11
console.log("eTC = " + eTC);
eTC = eTC - 1; // 10
console.log("eTC = " + eTC);
console.log();

// Truthy and Falsy Values
    // Falsy = values that are not exactly false, will still be false
        // 1) 0
        // 2) ''
        // 3) undefined
        // 4) null
        // 5) NaN

    // Truthy = values that are not exactly true, will still be true
        // 1) 0
        // 2) ''
        // 3) undefined
        // 4) null
        // 5) NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('fALSEY value string')); // truthy
console.log(Boolean({})); // truthy
console.log(Boolean(''));
console.log();

// Type Coercion happens with logical operators and statements 

let exampleFalsey = 0;
console.log("exampleFalsey = " + exampleFalsey);
if (exampleFalsey) {
    console.log("exampleFalsey = " + exampleFalsey); // false, print this line
} else {
    console.log("exampleFalsey = " + exampleFalsey);
}

let exampleFalseyUndefined;
console.log("exampleFalseyUndefined = " + exampleFalseyUndefined);
if (exampleFalsey) {
    console.log("exampleFalseyUndefined = " + exampleFalseyUndefined);
} else {
    console.log("exampleFalseyUndefined = " + exampleFalseyUndefined); // false, print this line
}

// MAKE SURE TO ALWAYS CONSIDER EVERY SCENARIO, OR ELSE... BUGS!

// Equality Comparisions 
    // 1 eequal sign means it is assigned
    // 3 equal signs is asking if this is equal to this, a boolean TRUE OR FALSE value | aka straight equality operator and comparison must be exactly the same
    // DOUBLE == is for coercion 
    if (2 + 2 === 4) {
        console.log("2 + 2 IS EQUAL TO 4.")
    } else {
        console.log("2 + 2 IS NOT EQUAL TO 4.");
    }

// get a value from a webpage and user and assign it to a variable
const examplePromptData = prompt("This is a prompt to gather data from the user.");
if (examplePromptData != '') {
    console.log("examplePromptData = " + examplePromptData);
    console.log();
} else {
    console.log("examplePromptData = " + examplePromptData);
    console.log("examplePromptData IS EMPTY.");
    console.log();
}

// BOOLEAN LOGIC
    // is branch of CS, that uses true or false values to solve problems
    // uses logical operators to combine boolean values

    // && = AND
    // || = OR
    // ! = NOT (this operator takes precedence, and will always invert first)
// ask a question, or create condition
const isSkyBlue = false;
console.log("isSkyBlue = " + isSkyBlue);
console.log();

if (isSkyBlue) {
    console.log("isSkyBlue = " + isSkyBlue);
    console.log("The Sky IS Blue.");
    console.log();
} else {
    console.log("isSkyBlue = " + isSkyBlue);
    console.log("The Sky IS NOT Blue.");
    console.log();
}

// LOGICAL OPERATORS

const isAdmin = true; // A
console.log("isAdmin = " + isAdmin);
console.log();
const isSubscriber = true; // B
console.log("isSubscriber = " + isSubscriber);
console.log();
const hasAccessPartial = true; // C
console.log("hasAccessPartial = " + hasAccessPartial);
console.log();
const hasAccessFull = true; // D
console.log("hasAccessFull = " + hasAccessFull);

console.log(isAdmin);
console.log(!isAdmin);

console.log(isSubscriber);
console.log(!isSubscriber);

console.log(isSubscriber && hasAccessPartial);
console.log(isAdmin && hasAccessFull);

const accessAdmin = (isAdmin && hasAccessFull);
console.log("accessAdmin = " + accessAdmin);
console.log();
const accessSubscriber = (isSubscriber && hasAccessPartial);
console.log("accessSubscriber = " + accessSubscriber);
console.log();


if (!accessAdmin && !accessSubscriber) {
    console.log("User is not an Admind && User is not a Subscriber.");
    console.log();
} else {
    console.log("User is an Admin || User is a Subscriber.");
    console.log();
}
console.log();

// SWITCH STATEMENTS
    // alternative way of writing if else statement, especially when comparing one value to multiple options
    // if a case matches, then execute case code and then break from the switch statement
    // default statement is what will run by default at the end if no cases match
    // designed for equality not comparisons

const aDay = '';

switch(aDay) {
    case 'sunday':
        console.log('The day is Sunday.');
        console.log();
        break;
    case 'monday':
        console.log('The day is Monday.');
        console.log();
        break;
    case 'tuesday':
        console.log('The day is Tuesday.');
        console.log();
        break;
    case 'wednesday':
        console.log('The day is Wednesday.');
        console.log();
        break;
    case 'thursday':
        console.log('The day is Thursday.');
        console.log();
        break;
    case 'friday':
            console.log('The day is Friday.');
            console.log();
            break;
    case 'saturday':
            console.log('The day is Saturday.');
            console.log();
            break;
    default:
        console.log('The Switch Statement did not match any cases.');
        console.log();
}

// STATEMENTS VS EXPRESSIONS (HIGH LEVEL SUMMARY)
    // expression = piece of code that produces a value
    // statement = do not produce a value on itself, are like full sentences that translate to actions

// Ternary Operator (Conditional)
    // has 3 parts
        // 1) condition part
        // 2) if part
        // 3) else part
    // useful when to conditionally declare variables

const exampleOperatorTernary = 0;
const exampleOperatorTernaryCondition = 1;
const exampleOperatorTernaryIf = 'exampleOperatorTernaryIf';
const exampleOperatorTernaryElse = 'exampleOperatorTernaryElse';

exampleOperatorTernary <= exampleOperatorTernaryCondition ? console.log(exampleOperatorTernaryIf) : console.log(exampleOperatorTernaryElse);

// JavaScript is BACKWARDS COMPATIBLE TO ES1 
    // nothing is never really removed, but only added
    // DONT BREAK THE WEB, websites will keep working forver
        // incremental updates (releases)
    // FORWARD COMPATIBILITY DOES NOT EXIST (using old browsers)

// TWO PHASES ARE DEVELOPMENT AND PRODUCTION
    // DEVELOPMENT 
        // During DEVELOPMENT: use the latest google chrome browser when building to ensure all modern browser features worK
    // PRODUCTION: Web-App is finished and deployed on internet to run on the user's browser
        // this where problems might appear, because this is what we can control
        // we cannot control what browser the user chooses, and we cannot assume they are always using the latest browsers
            // SOLUTION:
                // Using Babel to transpile and polyfill your code
                    // (converting back to ES5 to ensure browser compatibility for all users)
                    // BABEL IS THE TOOL TO DO THIS

// ES5
    // is FULLY SUPPORTED in all browsers (down to IE9 from 2011);
    // Ready to be used today 
// ES6/ES2015 - ES2020
    // ES6+ IS SUPPORTED in all modern browsers
    // there is no support in older browsers
    // Can use most features in production with transpiling and polyfilling 
// NEXT JS


