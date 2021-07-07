'use strict';

// HIGH LEVEL OVERVIEW OF JAVASCRIPT

    // JAVASCRIPT
        // is a high-level objected-oriented, multi-paradigm programming language
        // is a high-level, prototype-based object-oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single-threaded, garbage-colllected programming language with first-class functions and a non-blocking event loop concurrency model

    // HIGH-LEVEL
        // every program needs hardware resources for memory and storage 
        // low-level c requires developer to manually manage resourcs manually
        // high-level like JavaScript does not require developer to ask computer for memory to make a new varaible, (abstractions take that work away from us)

    // GARBAGE-COLLECTED
        // algorithm inside javascript engine, which removes old and unused objects from memory

    // INTERPRETED OR JUST-IN-TIME COMPILED
        // computer processor understands ones and zeros (1s and 0s)
            // this is also called machine code
            // not practical code to write
            // JavaScript is an abstraction of machine code
            // is then translated back to machine code (compiling or interpreting)
            // this happens inside the JavaScript engine

    // MULTI-PARADIGM
        // paradigm
            // is an approach and mindset of structuring code, which will direct your coding style and technique
            // imperative vs declarative
        // 3 paradigms:
            // 1) Procedural Programming - (PP)
                // organizing the code in a linear way with little to no functions
            // 2) Object-Oriented Programming - (OOP)
                // 
            // 3) Functional Programming - (FP)
                //
        //


    // PROTOTYPE-BASED OBJECT-ORIENTED
        // almost everythin in JS is an object except for primitives
        // prototypal inheritance - built from template prototypes
            // code is inherited from the blue print template 

    // FIRST-CLASS FUNCTIONS
        // in a language with first-class functions, functions are simply treated as variables
        // we can pass them into other functions and return them from other functions
        
    // DYNAMIC 
        // Dynamically-Typed Language
        // No data type definitions assinged to varaibles, types become known at runtime
        // Data type of variable is automatically changed as we re-assign them

    // SINGE-THREADED
        // a thread is a set of instructions that is executed in the computer's CPU (processor)

    // NON-BLOCKING EVENT LOOP

    // concurrency model = how the JavaScript engine handles multiple tasks happening at the same time
        // this is good beause (why we need it bcause)
            // JavaScript runs in one single thread, so it can only do one thing at a time
                // what about long running tasks? sounds like it would block the single thread, so we would need non-blocking behavior
                    // we achieve this by using an event loop
                        // event loop = takes long running tasks, executes them in the "background", and puts them back in the main thread once they are finshed

// The JavaScript Engine and Runtime
    // JavaScript Engine = program that executes JavaScript code
    // Every browser has its own JS engine
    // V8 Engine by Google, powers chrome and node.js (backend server side applications)

    // Components of an Engine 
        // Call Stack
            // where code is executed using execution context
        // HEAP
            // unstructured memory pool that stores objects in memory that the applications need
    // COMPILATION VS INTERPRETATION
        // COMPILATION
            // Entire code is converted into machine code at once, and written to a binary file that can be executred by a computer
            // Source Code => STEP 1 (COMPILATION) => Portable file: machine code => STEP 2 (ECECUTION) => Program Running
                // execution can happen way after compilation
        // INTERPRETATION
            // Interpreter runs through the source code and executes it line by line
            // Source Code => STEP 1 (Execution Line By Line) => Running Program
                // code still needs to be converted to machine code
            // Slower than compiled languages
    // Modern JavaScript engine uses mix between compilation and interpreation
        // This is called, Just-In-Time (JIT) compilation
            // Entire code is converted into machine code at once, then executred immediately
            // Source Code => STEP 1 (COMPILATION) => Machine Code => STEP 2 (ECECUTION) => Program Running
                // machine code is not a portable file
                // execution happens immediately

    // Enters Engine
        // Parses 
            // the code (reads the code) into a data structure Abstract Syntax Tree (AST)
            // checks for syntax errors and resulting tree is used to generate machine code
            // not related to the DOM tree in anyway, it represents the code in the engine
        // Compilation
            // takes generated AST and compiles it into machine code and gets executed right away
                // occurs in Call Stack and is possible because of Just-in-time compilations (JIT)
        // Optimization
            // create un optimized version of machine code in the beginning so it can execute as fast as possible
            // is passed around and re-optimized while the program is running in the background
            // can be done multiple times without stopping execution, helps with speed
            // this occurs in special threads that we cannot access from our code

    // JavaScript Runtime in the Browser
        // imagine a container that contains everything we need to use JavaScript (the browser)
        // without an engine, there is no runtime or javascript
        // we also need access to WEB APIs
            // WEB APIs are functionalities provided to the engine and accessible on the global window object (not part of the JS language)
                // DOM
                // Timers
                // Fetch API
                // ... 
        // CALLBACK QUEUE
            // is a data structure that contains all the call back functions that are ready to be executed
                // event handlers funcitions to dom elements to react to events, also called callback functions
            // call back function is put into the call back queue, when call stack is empty
            // call back function is passed into the call stack so it can be executed
                // possible by the event looper
                    // takes call back functions from the queue and adds them to the stack
                    // event loop is how the non blocking concurreny is implemented 
    // Node.js runtime is similar, but has no browser so no web apis, instead has
        // multiple c++ bindings and thread pool
        
// EXECUTION CONTEXTS AND THE CALL STACK
    // COMPILATION has OCCURED
        // Creation of Global Execution Context (for top-level code) = code that is not in a function (only code outside of functions is executed)
            // Execution Context = Environment in which a piece of JavaScript is executed AND stores all the necessary information for some code to be executed
            // there is ALWAYS EXACTLY ONE GLOBAL EXECUTION CONTEXT (is default context where top level code executes)
        // EXECUTION OF TOP LEVEL CODE 
            // computer cpu processing the machine code that it receives
        // Execution of FUNCTIONS WAITING FOR CALLBACKS
            // One execution context (EC) per function: For each function call, a new execution context is created
        // All of this makes up the CALL STACK, just waiting for a call back

    // WHAT IS INSIDE OF EXECUTION CONTEXT
        // VARIABLE ENVIRONMENT
            // where all variables and function declarations are stored
            // arguments object (all arguments passed into the function that the current execution context belongs to)
            // each function gets its own execution context as soon as it is called
        // SCOPE CHAIN
            // consists of references to variables that are located outside of the current function
            // to keep track of the scope chain it is stored in each EC
            // each EC gets a special varaible called the this keyword
        // this keyword

        // all of the above is generated during the "creation phase" right before execution
        // arrow functions do not get their own argument keyword or this keyword
            // instead arrow functions get their arguments object and this keyword from their closest regular function parent

        // call stack with memory heap make up the js engine
            // CALL STACK
                // like a map for the JS engine, to ensure JS does not get lost
                // place where execution contexts get stacked on top of each other, to keep track of where we are in the execution
                // EC on top of stack is the one currently running, and removed from the call stack when it is finished running

                // code is compiled
                // top level compiled code starts execution
                // global EC is created for code not in a function
                // it is put in the call stack to be executed
                // call function (new ec is created), then store in call stack, it is the new current EC
                // another function call in the previous function, new EC is created and pushed to call stack to become new current active AC
                // the first function is the only one being executed, so others are paused, because of single threaded JS
                // anothe function returns, is finished, and popped off call stack so the previous function call is now resumed

// SCOPE AND THE SCOPE CHAIN

    // Execution Context (EC)
        // Variable Environment
        // Scope Chain
        // this keyword 
    
    // SCOPE concepts
        // Scoping
            // How our program's variables are organized and accessed by the JS engine
                // Where can we access and not access variables
        // Lexical Scoping
            // Is scoping is controlled by placement of functions and blocks in the code
                // function inside of another function has access to the parent function variables
                // siblings do not have access to each other
        // SCOPE
            // is the space or environment in which a certain variable is declared (variable environment in case of functions)
                // Global Scope
                    // Variables Outside of any function or block
                    // variables decalred in global scope  are accessible everywhere in the program
                // Function Scope
                    // Also called local scope
                    // variables are accesbile only INSIDE of the function, NOT outside
                    // errors occur when outside of scope
                    // applies to all types of functions
                // Block Scope (ES6)
                    // variables are accesible only INSIDE the code block (block scoped)
                        // HOWEVER, this only applies to let and const variables
                        // var is still accessible outside of the block
                    // functions are also block scoped (onlyin 'use strict' mode)
        // Scope of a Variable
            // Region of our code where a certain variable can be accessed 

    // THE SCOPE CHAIN
        // Nested Structure of Scope
        // every scope has access to its outer parent scopes providing access to variables 
            // Global Scope 
                // (considering only variable declarations also works for functions)
            // function scope
                // each function creates its own scope (local scope)
            // block scope
                // only works for let and const variables 
                // do not apply to var 
        // variable lookup, scopes look up into the chain until they find the variable it needs to use

        // do not have access to inner scopes 
    
    // DIFFERENCE BETWEEN SCOPE CHAIN VS CALL STACK 
        // functions are called and stacked in reverse order in the call stack execution context
            // each function has its own variable environmant variable 
        // scope chain is about in which order they are written in the code, but not how the order of which they were called
    
    // different functions can have same parameter names
        // because each parameter is only defined in the scope of that function
        // functions can have same parameter and variable names 

// VARIABLE ENVIRONMENT: HOISTING AND THE TDZ
    // A closer look at the variable environment
        // HOISTING
            // makes some types of variables accessible/usable in the code before they are actually declared in the code
            // "variables are magically lifted to the top of their scope"
                // BEHIND THE SCENES
                    // Before execution, code is scanned for variable declarations
                    // and for each variable, a new property is created in the variable environemnt object
            
            // function declarations
                // HOISTED = YES 
                // INITIAL VALUE = ACTUAL FUNCTION
                // SCOPE = BLOCK
            // var variables
                // HOISTED = YES
                // INITIAL VALUE = undefined
                // SCOPE = FUNCTION
            // let and const variables
                // HOISTED = NO
                // INITIAL VALUE = <unitialize>,TDZ (Temporal Dead Zone) - cant access variables between beginning of scope and where they are declared
                // SCOPE = BLOCK
            // function expressiosn and arrows (acts as normal variables would)
                // HOISTED = depends if using ar or let/const
                // INITIAL VALUE = depends if using ar or let/const
                // SCOPE = depends if using ar or let/const

            // TDZ (Temporal Dead Zone)
                // ReferenceError: Cannot access variable before intialization
                // ReferenceError: variable is not defined 
                // starts from beginning of scope until to where it is defined
                // Make it easier to avoid and catch errors: accessing variables before declaration is bad practice and should be avoided
                // Makes const variables work how they were designed 

            // Why hoisting?
                // so we can use functions before actual declaration

// THE THIS KEYWORD
    // this keyword/variable = Special varaible that is created for everyexecution context (every function)
    // takes the value of (points to) the "owner" of the function in whic hthe this keyword is used
    // is not static. it depends on how the function is called, and its value is only assigned when the function is actually called
    
    // 4 WAYS TO CALL A FUNCTION
        // 1) Method - this = <Object that is calling the method>
            // function attached to an object
            // this points to the object on which the method is called
            // points to the object calling the method
        // 2) Simple Function Call - this = undefined ('strict mode')
            // not attached to any object
        // 3) Arrow Functions - this = <this of surrounding function (lexical this)>
            // do not get their own this keyword
            // this variable will be the assigned the parent (outer lexixal scope of arrow function)
        // 4) Event Listener - this = <DOM element that the handler is attached to>
    
    // this will never point to the function it is being used or the environment variable of the function

    // new, call, apply, bind methods

    // this keyword in the global scope is the window object

    // method borrowing 

// REGULAR FUNCTIONS VS ARROW FUNCTIONS
    // accessing a property on an object that does not exist produces 'undefined'
        // this is dangerous behavior when using var becauese it creates properties that we do not want on the global object or not the object being called
    // REGULAR FUNCTIONS
        // rule states that a regular function call this keyword is undefined 
            // const self = this; can be used above the regular function so self/this can be used in the regular function
            // this must be assgned to a declared const 
                // const self
                // const that 
        // arguments keyword
            // arguments keyword is only available in a regular function
            // gives us access to the parameters of the function passed in as arguments
    // ARROW FUNCTIONS
        // does not get its own this keyword
        // it uses its parent scope this keyword
        // NEVER USE ARROW FUNCTION AS A METHOD
        // does not have arguments keyword
        //

// PRIMITIVES VS OBJECTS (PRIMITVE VS REFERENCE TYPES)
    // Primitives (Primitive Data Types)
        // are Numbers, Strings, Booleans, Undefined, Null, Symbol, BigInt
        // stored in the call stack (Execution Context in which they are declared)
            // JS creates a unique id with variable name (points to memory address)
            // piece of memory with address 
            // value stored at specified address (value is immutable)
                // new value produces a new memory address 
    // Object (Reference Types)
        // are Object literal, Arrays, Functions, etc.
        // stored directly in the memory heap
            // memory address
                // creates new piece of memery
                // points to the heap address from the call stack value 
                    // object is found in the heap from the address of thecall stack to change an object property key

// Object.assign({}, exampleObject)
    // merges two objects to create another object
        // const exampleObjectCopy = Object.assign({}, exampleObject)