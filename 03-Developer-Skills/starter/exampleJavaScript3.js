// ALWAYS USE STRICT MODE
'use strict';

// CONFIGURING VS CODE

    // PRETTIER
        // opinionated code formatter, makes assumptions how good code should appear
        // available as vs code extension
            // STEP 1:
                // Click Extenstion Icon > search prettier > Prettier - Code formatter > install > enable
            // STEP 2: Define Prettier as default formatter of the code
                // Preferences > Settings > Search in Settings for 'default formatter' > select esbenp.prettier-vscode
                // Preferences > Settings > Search in Settings for 'format on save' > select checkbox
            // STEP 3: create ".prettierrc" configuration file
                // create {}
                // enter api configuration options from prettier.io/docs in {} body
                // go through the list to configure to you coding style
            // STEP 4: create user snippets
                // references > User Snippets > New Global Snippets file... > create a file name > create code snippets

// INSTALLING NODE.JS AND SETTING UP A DEVELOPMENT ENVIRONMENT
    
    // Live Server
        // automatically reload server on save
        // exists as VS CODE EXTENSTION or more professional way with node.js and npm package
    
    // Installing Node.js and Live Server
        // run js outside of the browser using node.js and way of running DEV ENV tools
        // STEP 1: https://nodejs.org/en/download/ and download compatible version
            // now node.js is available in the terminal/CLI
        // STEP 2: vscode > terminal > new terminal > node -v (verify node.js version) > sudo npm install live-server -g
            // enter password to install, password characters do not show
        // STEP 3: terminal > live-server > *enter*

// APPROACHING PROBLEMS
    // STEP 1:
        // Make sure to understand 100% of the problem.
        // Ask the right questions to get a clear picture of the scenario.
    // STEP 2:
        // DIVIDE and CONQUER
        // Break problems into smaller problems 
    // STEP 3:
        // Don't be afraid to do as much research as you have to
    // STEP 4:
        // WRITE PSEUDOCODE
    // STEP 5: 
        // APPLY THE SOLUTION TO THE INDUSTRY

// DEBUGGING (FIXING ERRORS)
    // Software bug: Defect or problem in a computer program.
        // Basically, and unexpected behavior of a computer program is a software bug.
    // FINDING FIXING AND PREVENTING BUGS
    // STEP 1) IDENTIFY = BECOME AWARE THERE IS A BUG
        // During Development
        // Testing software
        // User reports during production
        // Context of the Bug: browsers, users, etc
    // STEP 2) FIND = Isolating where exactly the big is happening in the code
        // Developer Console used for simple code 
        // Debugger Software is used for complex code
    // STEP 3) FIX = resolving the issue (correct the bug)
        // replace wrong solution with the new correct solution
    // STEP 4) PREVENT = stop it from happening again
        // searching for the same bug in a similar code
        // writing tests using testing software 

// DEBUGGING WITH THE CONSOLE AND BREAKPOINTS
    // console.log();
    // console.warn();
    // console.error();

    // good idea to start with the entire object being used

    // Browser > Sources > script file > set breakpoint (reload page stops execution at this moment in time) 
        // resume, step into, step over, next line (one line at a time)

    // degubugger;
        // opens browser console deubber when it reaches the statement debugger;