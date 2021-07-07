'use strict';

// HTML implements the UserInterface
    // HTML is broken into smaller HTML elements

// SELECTING HTML ELEMENTS IN JAVASCRIPT
    // select HTML elements by targeting the class or id
        // use document.querySelector() method on the document object
        // pass selector element string into document.querySelector()
            // use '.exampleSelector' for element class
            // ues '#exampleSelector' for element id 

        // get element by class
        // document.querySelector('.message');
        // console.log(document.querySelector('.message'));

        // get element string text content by class
        // document.querySelector('.message').textContent;
        // console.log(document.querySelector('.message').textContent);

// THE DOM AND DOM MANIPULATION
    // making JavaScript interact with a web-page
    // DOM = Document Object Model
        // a structured representation of HTML documents that allows JS to access HTML elements and styles to manipulate them
        // the connection between HTML documents and JavaScript code
        // created by the browser as soon as the HTML page loads and stored ina tree structure where each HTML element is an object
        // document object = special object that serves as entry point into the DOM
            // html element = first child to document object, usually the root element in all HTML documents
                // head = 
                    //
                // body = 
                    //
    // rule is, if it exists in HTML document, then it has to be in the DOM

    // DOM !== JAVASCRIPT
        // DOM Methods and Properties for DOM Manipulation are not part of Javascript!
            // JS is dialect of ecma, and DOM does not exist there 
        // DOM and DOM Methods are a part of WEB APIs
            // WEB APIs are libraries that browsers implement that can interact with out JavaScript code,

// SELECTING AND MANIPULATING ELEMENTS
    
    // SELECTING HTML ELEMENTS IN JAVASCRIPT
    // select HTML elements by targeting the class or id
        // use document.querySelector() method on the document object
        // pass selector element string into document.querySelector()
            // use '.exampleSelector' for element class
            // ues '#exampleSelector' for element id 

        // get element by class
        // document.querySelector('.message');
        // console.log(document.querySelector('.message'));

        // get element string text content by class
        // document.querySelector('.message').textContent;
        // console.log(document.querySelector('.message').textContent);

        // set the content of the element by getting element string text content by class
        // document.querySelector('.message').textContent = ('Correct Number!');
        // console.log(document.querySelector('.message').textContent);

        // get element by class
        // document.querySelector('.number').textContent = 13;
        // console.log(document.querySelector('.number').textContent);
        // document.querySelector('.score').textContent = 10;
        // console.log(document.querySelector('.score').textContent);

        // get data with input field value using the .value property
        // document.querySelector('.guess');
        // document.querySelector('.guess').value;
        // console.log(document.querySelector('.guess'));
        // console.log('input .guess value = ' + (document.querySelector('.guess').value));

        // set data with input field value by using the .value property 
        // document.querySelector('.guess');
        // document.querySelector('.guess').value = 15;
        // console.log(document.querySelector('.guess'));
        // console.log('input .guess value = ' + (document.querySelector('.guess').value));

// HANDLING CLICK EVENTS 
    // code will react to something that happens in the DOM
    // use an event listener
        // an event is something that happens on the web-page
        // wait for a specific event to happen, and then react to it

    // Listen for event
        // select the element for where the event will occur
        // select Check button, add event listener
            // addEventListener() method
                // pass in the type of event as argument 
            // tell the event listener what to do
                // specify reaction to the event by defining a function
                // event handler = this function contains the code to be executed on the click event of this check button
                    // event handler function value is passed into the addEventListener() method as second argument
                        // javascript egnine calls this function when the event occurs 
    
    // MANIPULATING CSS FILES
        // access style property
        // then specify css property
            // specifify in camelCase is more than one word
            // must be entered as a string data type value

// Implementing LOGIC (HOW THE CODE WORKS)
        
        // Define variables
        // create a number between 1 and 20
        let mySecretNumber = Math.trunc(Math.random() * 20) + 1;
        // create state variable
        let playerScore = 20;
        let playerHighScore = 0;
            
        document.querySelector('.check').addEventListener('click', function () {
            console.log('Begin Check Button Function Block');
            console.log('Button CHECK click event handler value = ' + (document.querySelector('.guess').value));
            const guessNumber = Number(document.querySelector('.guess').value);
            console.log('guess typeOf = ' + typeof guessNumber);
            console.log('guess = ' + guessNumber, typeof guessNumber);

            // when input is invalid
            if (!guessNumber) {
                document.querySelector('.message').textContent = 'Input NaN!';
                console.log('User input is invalid.');
                console.log();

              // when player wins
            } else if (guessNumber === mySecretNumber) {
                document.querySelector('.message').textContent = 'Correct Number!';
                console.log('User input is correct.');
                console.log();
                document.querySelector('.number').textContent = mySecretNumber;

                document.querySelector('body').style.backgroundColor = '#60b347';
                document.querySelector('.number').style.width = '30rem';

                // when NEW HIGHSCORE 
                if (playerScore > playerHighScore) {
                    playerHighScore = playerScore;
                    document.querySelector('.highscore').textContent = playerHighScore;
                }

              // when player guess is too low
            } else if (guessNumber > mySecretNumber) {
                if(playerScore > 1){
                document.querySelector('.message').textContent = 'Too High!';
                console.log('User input is too high.');
                playerScore--;
                document.querySelector('.score').textContent = playerScore;
                console.log();

                  // when GAME OVER
                } else {
                    document.querySelector('.message').textContent = 'Game Over!';
                    console.log('The game has ended for the user. The use lost.');
                    document.querySelector('.score').textContent = 0;
                }

              // when player guess is too high
            } else if (guessNumber < mySecretNumber) {
                if (playerScore > 1) {
                document.querySelector('.message').textContent = 'Too Low!';
                console.log('User input is too low.');
                playerScore--;
                document.querySelector('.score').textContent = playerScore;
                console.log();

                  // when GAME OVER
                } else {
                    document.querySelector('.message').textContent = 'Game Over!';
                    console.log('The game has ended for the user. The use lost.');
                    document.querySelector('.score').textContent = 0;
                }
            }
        });

        // when PLAY AGAIN
        document.querySelector('.again').addEventListener('click', function () {
            console.log('Begin Play Again Button Function Block');
            mySecretNumber = Math.trunc(Math.random() * 20) + 1;
            playerScore = 20;
            document.querySelector('.message').textContent = 'Start guessing...';
            document.querySelector('.score').textContent = playerScore;
            document.querySelector('.number').textContent = '?';
            document.querySelector('.guess').value = '';
            document.querySelector('body').style.backgroundColor = '#222';
            document.querySelector('.number').style.width = '15rem';
        }); 

// THIS PROJECT IS NOT DRY FOR EDUCATIONAL PURPOSES