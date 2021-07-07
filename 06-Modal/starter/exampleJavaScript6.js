'use strict';

// BUILD UI COMPONENT
    // modal window

// STEP 1) 
    // SELECT ELEMENTS NEEDED AND STORE THEM INTO VARIABLES
    
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.close-modal');

// STEP 2)
    // define function(s)
    // function to Open Modal
    const functionOpenModal = function () {
        console.log('Button show-modal clicked');
        modal.classList.remove('hidden'); // get selected element, read .classList property, utilize remove() method to remove a class without the dot
        overlay.classList.remove('hidden'); // remove the overlay hidden class 
        console.log('Opened Modal.');
    };

    // function to Close Modal
    const functionCloseModal = function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        console.log('Closed Modal.');
    };

// STEP 3) 
    // IMPLEMENT CORE LOGIC
    // Query Selecter with Multiple Elements, only the first is selected, so we use .querySelectorAll()
        // creates a node list (acts as an array)
            // loop through the node list to use them
    const btnsOpenModal = document.querySelectorAll('.show-modal');
    console.log('btnsOpenModal = ' + btnsOpenModal);
    console.log(btnsOpenModal);

    for (let i = 0; i < btnsOpenModal.length; i++) {
        console.log(btnsOpenModal[i].textContent); // current element of btnsOpenModal node list iteration
        btnsOpenModal[i].addEventListener('click', functionOpenModal) // function will attach to all buttons with the same class
    }

    // Close Modal on Button Close Modal
    btnCloseModal.addEventListener('click', functionCloseModal);
    // Clode Modal on Overlay
    overlay.addEventListener('click', functionCloseModal);

    // Keyboard events
        // are global events, they do not happen on a specific element
            // keydown = occurs press of any key on the keyboard
            // keypress = continuously fires with finger pressed on a key
            // keyup = occurs on release of finger from key
        // are usually located on the document
    document.addEventListener('keydown', function (anEventExampleArgument){
        // when keydown event occurs, pass the event object as an argument into this function
        console.log(anEventExampleArgument);
        console.log('anEventExampleArgument key = ' + anEventExampleArgument.key);
        console.log('A key was pressed ' + anEventExampleArgument);

        if((anEventExampleArgument.key === 'Escape') && (!modal.classList.contains('hidden'))) {
            console.log('Escape key was pressed.');
            functionCloseModal();
            console.log('Modal Closed by Escape Key.');
        }
    });