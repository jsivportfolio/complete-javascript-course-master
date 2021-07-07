'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// BANKIST APP

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Data
  // Data from APIS usualy come in the form of objects (JSON)

// ACCOUNT OBJECTS
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// ARRAY CONTAINING ALL THE ACCOUNT OBJECTS (ARRAY OF OBJECTS)
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// function to display for each movement create an element and display it
  // receive the data as argument to parameter to display on the UI
    // two parameters
      // movements array and default sort value as false 
const functionDisplayPropertyKeyMovements = function (eMovementsArray, sort = false) {
    containerMovements.innerHTML = ''; // empty the entire container and add new elements, innerHTML IS A SETTER
    // create copy using slice method 
    const filtereMovementsArraySortAscending = sort ? eMovementsArray.slice().sort((a, b) => a - b) : eMovementsArray;
   
    console.log(eMovementsArray);
    console.log('eMovementsArray = ' + eMovementsArray);
    filtereMovementsArraySortAscending.forEach(function(aMovement, index) {
      console.log(`aMovement = ${aMovement} | index = ${index}`);
      // template string literal easy to create multiline string
        // replace hardcoded data with dynamic data ${}
        // ternary operator to determine withdrawal or deposit
          // use for value and class name
      const aMovementType = aMovement > 0 ? 'deposit' : 'withdrawal';

      // Create DOM Element with insertAdjacentHTML() method on the container we want to add the row to
      const htmlTemplateStringLiteral = `
        <div class="movements__row">
          <div class="movements__type movements__type--${aMovementType}">${index + 1} ${aMovementType}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${aMovement}€</div>
        </div>
      `;
      // select DOM element and add to HTML
        // accepts to strings
          // 1) position in container (parent, child, sibling)
          // 2) string containing the HTML that we want to insert
      containerMovements.insertAdjacentHTML('afterbegin', htmlTemplateStringLiteral);
  });
};
functionDisplayPropertyKeyMovements(account1.movements);
// console.log(containerMovements.innerHTML);

// function display balance
const functionDisplayCalculatedBalance = function (anAccount) {
  const balance = anAccount.movements.reduce((accumulator, aMovement) => accumulator + aMovement, 0);
  console.log(balance);
  anAccount.balance = balance;
  labelBalance.textContent = `${anAccount.balance}€`;

};
// functionDisplayCalculatedBalance(account1.movements);

// function to display summary balances
const functionCalculateDisplaySummary = function(accountCurrent) {
  const incomingAmount = accountCurrent.movements.filter(aMovement => aMovement > 0).reduce((accumulator, aMovement) => accumulator + aMovement, 0);
  console.log('incomingAmount = ' + incomingAmount);
  labelSumIn.textContent = `$${incomingAmount}€`;

  const outgoingAmount = accountCurrent.movements.filter(aMovement => aMovement < 0).reduce((accumulator, aMovement) => accumulator + aMovement, 0);
  console.log('outgoingAmount = ' + outgoingAmount);
  labelSumOut.textContent = `$${outgoingAmount}€`;

  // interst if only one 1 euro, exclude interests less than one euro
  const interestAmount = accountCurrent.movements.filter(aMovement => aMovement > 0).map(aDeposit => (aDeposit * accountCurrent.interestRate)/100)
  .filter((interests, index, arrayInterests) => {
    console.log(arrayInterests);
    return interests >= 1;
  })
  .reduce((accumulator, anInterest) => accumulator + anInterest, 0);
  console.log('outgoingAmount = ' + interestAmount);
  labelSumInterest.textContent = `$${interestAmount}€`;
};
// functionCalculateDisplaySummary(account1.movements);

// function to create usernames
// modify objects that already exist in accounts array, loop over it, and do something with foreach
// receive all accounts (receive array of accounts) |||| each function should receive data that it works with instead of using a global variable
const functionCreateUsernames = function (arrayAccounts) {
  // do not create a new array, mutate the original accounts array
  arrayAccounts.forEach(function (anAccount) {
  anAccount.username = anAccount.owner.toLowerCase().split(' ').map( name => name[0]).join('');
  console.log(anAccount.username);
  console.log(anAccount);
});

};
// pass accounts object array into the function 
functionCreateUsernames(accounts);

// // loop array, take first letter, put into new array 
// const aUser = 'Steven Thomas Williams'; // stw
// const username = aUser.toLowerCase().split(' ').map( name => name[0]).join('');
// console.log(username);

const functionUpdateUI = function (accountCurrent) {
    // Display Movements
    functionDisplayPropertyKeyMovements(accountCurrent.movements);
    // Display Balance
    functionDisplayCalculatedBalance(accountCurrent);
    // Display Summary
    functionCalculateDisplaySummary(accountCurrent);
};

// BEGIN EVENT HANDLER FUNCTIONS
// LOGIN ACTION
let accountCurrent;
btnLogin.addEventListener('click', function (anEvent) {
  anEvent.preventDefault(); // prevent form from submitting
  console.log('BEGIN LOGIN');

  // find account from accounts array with the username that was input
  accountCurrent = accounts.find(anAccount => anAccount.username === inputLoginUsername.value);
  console.log(accountCurrent);

  if(accountCurrent?.pin === Number(inputLoginPin.value)) {
    console.log('Valid Login Credentials. Access Granted.');
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${accountCurrent.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // // Display Movements
    // functionDisplayPropertyKeyMovements(accountCurrent.movements);
    // // Display Balance
    // functionDisplayCalculatedBalance(accountCurrent);
    // // Display Summary
    // functionCalculateDisplaySummary(accountCurrent);
    functionUpdateUI(accountCurrent);

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); // blur() makes field lose its focus

  } else {
    console.log('Invalid Login Credentials. Access Denied.');
  };
  console.log('END LOGIN');
});

// TRANSFER ACTION
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const aAmountTransfer = Number(inputTransferAmount.value);
  console.log('aAmountTransfer' + aAmountTransfer);
  const aReceiveTransferAccount = accounts.find(accountCurrent => accountCurrent.username === inputTransferTo.value);
  console.log('aReceiveTransferAccount' + aReceiveTransferAccount);
  console.log(aAmountTransfer, aReceiveTransferAccount);

  inputTransferAmount.value = inputTransferTo.value = '';

  if ((aAmountTransfer > 0) && (aReceiveTransferAccount) && (accountCurrent.balance >= aAmountTransfer) && (aReceiveTransferAccount?.username !== accountCurrent.username)) {
    console.log('Transfer valid.');
    // Execute the Transfer
    accountCurrent.movements.push(-aAmountTransfer);
    aReceiveTransferAccount.movements.push(aAmountTransfer);
    functionUpdateUI(accountCurrent);
  } else {
    console.log('Transaction failed.');
  }
});

// LOAN ACTION
btnLoan.addEventListener('click', function (e){
  e.preventDefault();
  const aAmountLoan = Number(inputLoanAmount.value);

  if (aAmountLoan > 0 && accountCurrent.movements.some(aMovement => aMovement >= aAmountLoan * 0.1)){
    // ADD movement
    accountCurrent.movements.push(aAmountLoan);

    // UPDATE UI
    functionUpdateUI(accountCurrent);
  }
  inputLoanAmount.value = '';
});

// close account action
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Begin Delete');

  if ((inputCloseUsername.value === accountCurrent.username) && Number(inputClosePin.value) === accountCurrent.pin) {
    const accountIndex = accounts.findIndex(accountCurrent => accountCurrent.username === accountCurrent.username);
    console.log('accountIndex = ' + accountIndex);
    // DELETE ACCOUNT
    const accountDelete = accounts.splice(accountIndex, 1);
    console.log(accountDelete);
    console.log(accounts);
    // HIDE UI
    containerApp.style.opacity = 0;
  } else {
    inputCloseUsername.value = inputClosePin.value = '';
  };

  console.log('END Delete');
});

// btnSort action
let sorted = false; // change from false to true on each click
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  functionDisplayPropertyKeyMovements(accountCurrent.movements, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// BEGIN LECTURES

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// // SIMPLE ARRAY METHODS
  
//   // Why arrays have methods
//     // methods are functions we can call on objects
//     // they are functions attached to objects
//     // Arrays are objects, so arrays can have functions attached to them called methods 
//     // special built in methods and libraries 

//     // define array
//     let arrayTest = ['a', 'b', 'c', 'd', 'e'];
//     // the slice() method available on strings
//       // extract any part of any array without modifying the original array
//       console.log(arrayTest.slice(2)); // extract c and after
//       console.log(arrayTest.slice(2, 4)); // extract only what is specicifed in the range
//       console.log(arrayTest.slice(-1)); // inverse, start to extract from the end of the array
//       console.log(arrayTest.slice(-2)); // // extract d and e
//       console.log(arrayTest.slice(1, -2)); // extract up until the last two 
//       console.log(arrayTest.slice()); // extract all from the arra
//       console.log([...arrayTest]); // create array of all individual elements 

//     // splice() method
//       // similar to slice
//       // fundamental difference is that it changes or mutates the original array 
//       // takes part of the original array into the new array
//       // we mostly use this method to remove elements from the original array
//       // begin and end parameters function the same as the slice method

//       console.log(arrayTest.splice(2)); // extract c and after
//       console.log(arrayTest); // splice deletes the elements 
//       console.log(arrayTest.splice(1, 2)); // start at position one and delete two elements
//       console.log(arrayTest);

//     // reverse() method
//       // creates a new array && mutates the original array
      
//       arrayTest = ['a', 'b', 'c', 'd', 'e'];
//       console.log(arrayTest);

//       const arrayTest2 = ['j','i', 'h', 'g', 'f'];
//       console.log(arrayTest2);
//       console.log(arrayTest2.reverse());
//       console.log(arrayTest2);

//     // concat() method
//       // used to concatonate two arrays 
//       // first array is the one that the method is called
//       // the second is the array we pass into the concat method
//       // does not mutate the original array

//       const aLetters = arrayTest.concat(arrayTest2);
//       console.log(aLetters);
//       console.log([...arrayTest, ...arrayTest2]);

//     // join() method
//       // join everthing together with specified 

//       console.log(aLetters.join('-'));

  
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// LOOPING ARRAYS: forEach() method
  // easier than for of loop
  // acts as a higher a order function so it requires a callback function in order to tell it what to do
  // calls the callback function
  // loop over the array and each iteration
    // in each iteration it passes in the current element of the array as an argument
  // give forEach() method instructions to tell it what to do, and callback function has those instructions
  // passes current element, index, and entire array ||| MUST BE IN THIS ORDER !!!
  // CANNOT BREAK OUT OF FOR EACH LOOP (WILL ALWAYS LOOP OVER THE ENTIRE ARRAY)

  // print tracing history
  console.log('array movements = ' + movements);

    // example with FOR OF LOOP

    for (const aMovement of movements) {
      if(aMovement > 0) {
        console.log(`${aMovement} was deposited.`);
      } else {
        console.log(`${Math.abs(aMovement)} was withdrawn.`);
      }
    };

    // example with FOR EACH LOOP
      // 0: function(200)
      // 1: function(450)
      // 2: function(400)
      // ... and so on... 
      
    movements.forEach(function(aMovement, anIndex, anArray) {
      console.log('aMovement = ' + aMovement);
      console.log('anIndex = ' + anIndex);
      console.log('anArray = ' + anArray);
      if(aMovement > 0) {
        console.log(`${aMovement} was deposited.`);
      } else {
        console.log(`${Math.abs(aMovement)} was withdrawn.`);
      }
    });

    // entries() method and accessing the counter variable 
      // returns an array of arrays
    for (const [i, aMovement] of movements.entries()) {
      console.log('index = ' + i , 'aMovement = ' + aMovement);
      if(aMovement > 0) {
        console.log(`${aMovement} was deposited.`);
      } else {
        console.log(`${Math.abs(aMovement)} was withdrawn.`);
      }
    };

// forEach() with Maps and Sets
    // can be called on a Map
      // has 3 parameters, and is called with 3 arguments
        // 1) value
        // 2) key
        // 3) array 

// define and create currency Map
    // array of arrays
      // each element is one entry of the map
        // 1) key
        // 2) value
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// get key of each map entry with their value
currencies.forEach(function(currentValue, currentKey, entireArray) {
  console.log(`${currentValue}: ${currentKey}: ${entireArray}`);
});

const setCurrenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(setCurrenciesUnique);
setCurrenciesUnique.forEach(function(currentValue, _, entireArray){ // _ is convention for throw away variables
console.log(`${currentValue}: ${entireArray}`); // key is the same as the value because sets do not have keys or indexes
});

// ARRAY METHODS FOR DATA TRANSFORMATIONS WITH ARRAYS
  // MAP
    // use loop over arrays, similar to forEach()
    // creates new array based over the original array
    // applies callback function specified to current array element
    // maps values of the original array to the new array
    // map returns a new array containing the results of applying an operation
    // methods with callback functions

    const eConversionEURO2USD = 1.1;
    // multiple each element of movements array by 1.1
    // functional programming, use function to solve the problem
    const movementsUSD = movements.map(function(aMovement){
      // return value that we want the new array to have in the current position
      return aMovement * eConversionEURO2USD;
    });
    console.log(movements);
    console.log(movementsUSD);
    
    // loop over one array and manually create new array
    const forofMovementsUSD = [];
    for (const mov of movements) {
      forofMovementsUSD.push(mov * eConversionEURO2USD)
    };
    console.log(forofMovementsUSD);

    const movementsDescriptions = movements.map((aMovement, i) => {
      if(aMovement > 0) {
        // return to the new array
        return (`Movement ${i + 1}: ${aMovement} was deposited.`);
      } else {
        // return to the new array
        return (`Movement ${i + 1}: ${Math.abs(aMovement)} was withdrawn.`);
      }
    });
    console.log(movementsDescriptions);

  // FILTER
    // used to filter for elements in original array that satisfy a certain condition
    // filter returns new array containing the array elements that passedd a specified test condition

    // specify condition with callback function
    const functionDeposits = movements.filter(function(aMovement) {
      console.log(aMovement);
      return aMovement > 0; // return boolean, only return what meets condition
    });
    console.log(movements);
    console.log(functionDeposits);

    // specify condition with callback function
    const functionWithdrawals = movements.filter(aMovement => {
      console.log(aMovement);
      return aMovement < 0; // return boolean, only return what meets condition
    });
    console.log(movements);
    console.log(functionWithdrawals);

    
  // REDUCE 
    // reduce boils ("reduce") all array elements down to one single value (e.g adding elements together)
    // accumulator variable, like a snowball that gets bigger rolling down a hill
    // as reduce method loops over the array, it adds current element to the accumulator
    // first parameter is call back function, second parameter is the initial value of the accumulator
    // most powerful array method and the hardest to use 

    console.log(movements);
    const functionAccountBalance = movements.reduce(function (accumulator, currentValue, currentIndex, entireArray) {
      console.log(`Iteration ${currentIndex}: ${accumulator}`);
      return accumulator + currentValue;
    }, 0);
    console.log(functionAccountBalance); // essentially the accumulator 

    // Reduce MAX value
    const reduceMAX = movements.reduce((acc, mov) => {
      if (acc > mov) {
        return acc;
      } else {
        return mov;
      }
    }, movements[0]);
    console.log(reduceMAX);

// THE MAGIC OF CHAINING METHODS
    // operations can be done in one go
    // can chain as many methods as you want as long as they return an array
    // chaining creates diffculty in debugging, resolve this by using index and array parameters
    // can inspect current array at any sage of the pipeline using the 3rd parameter of the call back function
    // do not over use chaining because it can cause performance issues with large amounts of data and user traffic 
    // bad practice to chain methods that mutate the original array (splice() and reverse() method)

    // PIPELINE
    // const accountBalanceTotalUSD = movements.filter(aMovement => aMovement > 0).map(aMovement => aMovement * eConversionEURO2USD).reduce((accumulator, currentMovement) => accumulator + currentMovement, 0);
    const accountBalanceTotalUSD = movements
    .filter(aMovement => aMovement < 0)
    .map((aMovement, index, array) => {
      // console.log(array);
      return aMovement * eConversionEURO2USD;
    })
      .reduce((accumulator, currentMovement) => accumulator + currentMovement, 0);
    console.log('accountBalanceTotalUSD = ' + accountBalanceTotalUSD);

// THE FIND() METHOD
    // use find() method to retreive one element of an array based on a condition
    // call back returns boolean, and returns first element in array that satisfies the condition
    // does not return array, only the element itself
    // find an object in the array based off of a property of the object
    
    const functionFindWithdrawalFirst = movements.find(aMovement => aMovement < 0);
    console.log(movements);
    console.log(functionFindWithdrawalFirst);
    console.log(accounts);

    const account = accounts.find(anAccount => anAccount.owner === 'Jessica Davis');
    console.log(account);

// THE FINDINDEX() METHOD 
    // returns the index of the found element and not the element itself
    //  delete element from an array using the splice() method, by using the findindex() method
    // get access to the current element and the current entire array

// SOME() METHOD AND EVERY() METHOD AND INCLUDES()
    // inlcudes()
      // returns true if this value is equality
      console.log(movements);
      console.log(movements.includes(-130));

    // some() method
      // checks condition
      // returns true or false
    const depositsAll = movements.some(aMovement => aMovement > 0);
    console.log(depositsAll);

    // every() method
      // only returns true if all the elements in the array satisfy the condition
      // returns true or false 
    console.log(movements.every(aMovement => aMovement > 0));
    console.log(account4.movements.every(aMovement => aMovement > 0));

    // Separate Callback function
    const scfDeposit = aMovement => aMovement > 0;
    console.log(movements.some(scfDeposit));

// FLAT() METHOD AND FLATMAP() METHOD

  // flat() method
    // only goes one level deep into nesting
    const eArray = [[1,2,3],[4,5,6],7,8];
    console.log(eArray.flat());
    const eArrayDeep = [[[1,2],3],[4,[5,6]],7,8];
    console.log(eArray.flat(2)); // can specify depth of nest with parameter

    // const accountMovements = accounts.map(anAccount => anAccount.movements);
    // console.log(accountMovements);
    // const movementsAll = accountMovements.flat();
    // console.log(movementsAll);
    // const balanceOverall = movementsAll.reduce((anAccount, aMovement) => anAccount + aMovement, 0);

    const balanceOverallFlat = accounts.map(anAccount => anAccount.movements).flat().reduce((anAccount, aMovement) => anAccount + aMovement, 0);
    console.log(balanceOverallFlat);

    // // flatmap() method
    //   // using a map and flattening the result
    // const eArrayDeep2 = [[[1,2],3],[4,[5,6]],7,8];

    // const balanceOverallFlatMap = accounts.flatmap(anAccount => anAccount.movements).reduce(anAccount, aMovement => anAccount + aMovement, 0);
    // console.log(balanceOverallFlatMap);

// SORTING ARRAYS 
    // sorts alphabetically
    // mutates the original array
    // does not work with mixed type arrays

    // example with strings
    const eOwners = ['John', 'Zane', 'Isla', 'Gabriel'];
    console.log(eOwners.sort());

    // example with numbers
    console.log(movements);
    // console.log(movements.sort()); does not work

    // sort with callback function and two parameters
    // return < 0: A,B (keep order)
    // return > 0: B,A (switch order)

    // example in ascending order
    movements.sort((valueCurrent, valueNext) => {
      if (valueCurrent > valueNext) {
        return 1;
      }
      if (valueCurrent > valueNext) {
        return -1;
      }
    });
    console.log(movements); // mutated array

    // example in descending order 
    movements.sort((valueCurrent, valueNext) => {
      if (valueCurrent > valueNext) {
        return -1;
      }
      if (valueCurrent > valueNext) {
        return 1;
      }
    });
    console.log(movements); // mutated array

    // modern exaxmple ascending order
    movements.sort((valueCurrent, valueNext) => valueCurrent - valueNext);
    console.log(movements); // mutated array

    // modern exaxmple descending order
    movements.sort((valueCurrent, valueNext) =>  valueNext - valueCurrent);
    console.log(movements); // mutated array

// Programattically CREATING AND FILLING ARRAYS
const arrayX = new Array(7); // creates an array with 7 empty elements
console.log(arrayX);
console.log(arrayX.map(() => 5));

// fill() method 
// arrayX.fill(1);
arrayX.fill(1, 3, 5); // fill and start at beginning index and then has end parameter also
console.log(arrayX); // mutated array full of ones

// Array.from() method
    // used on the array constructor 
    // pass in object with length property
    // create arrays from array like structures
      // result of querySelector all (returns a node list that contains all selected elements)
      // it is not an array so we need to convert it before being able to use array methods

const arrayY = Array.from({length: 7}, () => 1);
console.log(arrayY);

const arrayZ = Array.from({length: 7}, (currentElement, currentIndex) => currentIndex + 1);
console.log(arrayZ);

// used Array.from() to create an array from the result querySelectorAll array like structure (nodelist)
// can convert this into an array, then using mapping function to transform the raw element to its text content and replacing the symbol with nothing

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
  console.log(movementsUI);
  console.log(movementsUI.map(element => Number(element.textContent.replace('€', ''))));
  const movementsUI2 =[document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

// KNOWING WHICH ARRAY METHODS TO USE

  // TO MUTATE THE ORIGINAL ARRAY
    // add to the original array
      // .push() method - end
      // .unshift() method - start
    
    // remove from original array
      // .pop() - end
      // .shift() - start
      // .splice() - any

    // others
      // .reverse()
      // .sort()
      // .fill()

  // A NEW ARRAY
    // computed from original array
      // .map() - loop
    
    // filetred using condition
      // .filter()

    // portion of original array
      // .slice()

    // adding original to other array
      // .concat()

    // flattening the original array
      // .flat()
      // .flatmap()

  // AN ARRAY INDEX
    // based on value
      // .indexOf()

    // based on test condition 
      // .findIndex()

  // AN ARRAY ELEMENT
    // based on test condition
      // .find()

  // KNOW IF ARRAY INLCUDES
    // based on value
      // .includes()

    // based on test condition 
      // .some()
      // .every()

    // a new string
      // based on separator string
        // .join() method


  // TO TRANSFORM TO VALUE
    // bsed on accumulator 
      // .reduce() - boil down array to single value of any type: number, string, boolean, or even new array or object

  // TO JUST LOOP ARRAY
    // based on callback function
      // .forEach() - does not create a new array, just loops over it