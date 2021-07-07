'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
// create function to formant movments
const functionFormatMovementsDate = function (aDate, aLocale) {
    const functionCalculateDaysPassed = (aDate1, aDate2) => Math.round(Math.abs(aDate2 - aDate1) / (1000 * 60 * 60 * 24));
    const daysPassed = functionCalculateDaysPassed(new Date(), aDate);
    console.log(daysPassed);
    if (daysPassed === 0) {
      return 'Today';
    }
    if (daysPassed === 1) {
      return 'Yesterday';
    }
    if (daysPassed <= 3) {
      return 'a few days ago... ';
    }
    if (daysPassed >= 3) {
      return `${daysPassed} days ago...`;
    }
    if (daysPassed > 30 || daysPassed > 31) {
      return 'a month ago...';
    }
    else {
      // const iYear = aDate.getFullYear();
      // const iMonth = `${aDate.getMonth()}`.padStart(2,0);
      // const iDay = `${aDate.getDate()}`.padStart(2,0);
      // return `${iDay}/${iMonth}/${iYear}`;
      return new Intl.DateTimeFormat(aLocale).format(aDate);
    }
};

// format the currencies
// create universal function not reliant on internal data
const functionFormatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {style: 'currency', currency: currency}).format(value);
};


// pass in entire account
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const iDate = new Date(acc.movementsDates[i]);
    const iDisplayDate = functionFormatMovementsDate(iDate, acc.locale);

    // const formattedMovement = new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(mov);
    const formattedMovement = functionFormatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${iDisplayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMovement = functionFormatCurrency(acc.balance, acc.locale, acc.currency);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formattedMovement;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  const formattedMovement = functionFormatCurrency(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = formattedMovement;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  labelSumOut.textContent = functionFormatCurrency(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = functionFormatCurrency(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
const functionStartLogoutTimer = function() {
  const functionTicker =  function(){
    const minute = String(Math.trunc(time / 60)).padStart(2,0);
    const second = String(time % 60).padStart(2,0);
    // labelTimer.textContent = time;

  // in each call, print the remaining time to the UI
  labelTimer.textContent = `${minute}:${second}`;

  // when 0 seconds, stop timer and log out the user
  if (time === 0) {
    clearInterval(functionTimer);
    labelWelcome.textContent = `Login to get started`;
    containerApp.style.opacity = 0;
  }
  // decrease by 1 second
  time--;
};
    // set time to 5 minutes
    // let time = 120;


    // call the timer every second and display on the UI
    functionTicker();
    const timer = setInterval(functionTicker, 1000);
    return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE LOGIN FOR DEVELOPMENT
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity= 100;

// create current date
  // day/month/year
    // const dateCurrent = new Date();
    // const dayCurrent = `${dateCurrent.getDate()}`.padStart(2,0); // 2 characters long and pad with 0
    // const monthCurrent = `${dateCurrent.getMonth() + 1}`.padStart(2,0);
    // const yearCurrent = dateCurrent.getFullYear();
    // const hourCurrent = dateCurrent.getHours();
    // const minuteCurernt = dateCurrent.getMinutes();
    // labelDate.textContent = `${dayCurrent}/${monthCurrent}/${yearCurrent}, ${hourCurrent}:${minuteCurernt}`;


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const dateINTL = new Date();
    const objectConfigurationTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      // weekday: 'long'
    };

    const timeLocale = navigator.language;
    console.log(timeLocale);

    labelDate.textContent = new Intl.DateTimeFormat(timeLocale, objectConfigurationTimeOptions).format(dateINTL);
    // create current date and time
      // const dateCurrent = new Date();
      // const dayCurrent = `${dateCurrent.getDate()}`.padStart(2,0); // 2 characters long and pad with 0
      // const monthCurrent = `${dateCurrent.getMonth() + 1}`.padStart(2,0);
      // const yearCurrent = dateCurrent.getFullYear();
      // const hourCurrent = dateCurrent.getHours();
      // const minuteCurernt = dateCurrent.getMinutes();
      // labelDate.textContent = `${dayCurrent}/${monthCurrent}/${yearCurrent}, ${hourCurrent}:${minuteCurernt}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) {
      clearInterval(timer);
    }
    timer = functionStartLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date 
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = functionStartLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // round 
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function(){// Add movement
      currentAccount.movements.push(amount);

      // add loan date 
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = functionStartLogoutTimer();
      
    }, 3000);
  };
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// CONVERTING AND CHECKING NUMBERS
  // all numbers are represented eternally as a floating point number (always as decimals)
  // stored in binary format 64 based


  console.log(23 === 23.0);

  // Base 10 - 0 to 9 ||| 1/10 = 0.1 ||| 3/10 = 3.33333333
  // Binary base 2 - 0 1
  console.log(0.1 + 0.2);
  console.log(0.1 + 0.2 === 0.3); // false 
  
  // string to number
  console.log(Number('01'));
  console.log((+'01'));

  // parsing numbers from a string
    // extracts number from the string
    // string has to start with a number, will throw NaN otherwise
    // takes second argument, 10 (will reduce bugs)
    // global functions, so do not have to include the NumberObject
  console.log(Number.parseInt('30px'));
  console.log(Number.parseInt('30px', 10));
  console.log();

  console.log(Number.parseInt('2.5rem'));
  console.log(Number.parseFloat('2.5rem'));

  console.log(Number.isNaN(20));
  console.log(Number.isNaN('20'));
  console.log(Number.isNaN(+'20X'));
  console.log(23 / 0); // infinity

  // check if number 
  console.log(Number.isFinite(20));
  console.log(Number.isFinite('20'));
  console.log(Number.isFinite(+'20X'));
  console.log(Number.isFinite(23 / 0)); // infinity

// MATH AND ROUNDING

// sqaure rooot sqrt() method
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // square root
console.log(8 ** (1 / 3)); // cubic root 

// max() method
  // does not parse 
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

// calculate area of circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// random numbers
console.log(Math.trunc(Math.random() * 6) + 1); // random number between one and 6

// function for random number with range
const randomINT = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomINT(10,20));
console.log(randomINT(10,20));
// 0...1 -> 0...(max - min) -> min...max

// rounding intergers
  // all of these do type coercion to ('23')
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.trunc(23.3));
console.log(Math.trunc(23.9));

// rounding works better becuase it works for positive and negative numbers
console.log(Math.floor(-23.3));
console.log(Math.floor(-23.9));

// Rounding decimals
// toFixed() always returns a string, not a Number
console.log((2.7).toFixed(0)); 
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // convert string value to Number with type coercion string to number with +('')

// THE REMINDER OPERATOR
  // REMINDER OPERATOR = %
  console.log(5 % 2); 
  console.log(5 / 2); // 5 = 2 * 2 + 1

  console.log(8 * 3);
  console.log(8 / 3); // 8 - 2 * 3 + 2

  // check if Number is even or odd
  console.log(6 % 2);
  console.log(6 / 2);

  console.log(7 % 2);
  console.log(7 / 2);

  // create function isEven()
  const functionIsEven = n => n % 2 === 0;
  console.log(functionIsEven(8));
  console.log(functionIsEven(81));


  // example for every nth iteration or time with
  // select all elements, and convert returned node list into a real array
  // spread the elements into the new array
  // color every second row of the movements by checking if the current index is divisible by 2
  // color every third row of the movements by checking if the current index is divisible by 3
  labelBalance.addEventListener('click', function (e){
    e.preventDefault();
    [...document.querySelectorAll('.movements__row')].forEach(function(aRow, indexRow){
      if (indexRow % 2 === 0) {
        aRow.style.backgroundColor = 'orangered';
        aRow.style.opacity = '22';
      };
      if (indexRow % 3 === 0) {
        aRow.style.backgroundColor = 'blue';
        aRow.style.opacity = '22';
      };
    });
  });

// WORKING WITH BIG INT
  // special type of integer
  // 64 bits are given to store the numbers, but only 53 bits are for the number
  // there is a limit how big numbers can be

  console.log(2 ** 52 -1);
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);
  console.log(2 ** 52 + 1);

  // working with database id's or APIs 
  // new primitive is added to JS, called BigInt using n
  console.log(47839657486754545465598347584785643746574865438432894656894589824786758664n);
  console.log(47839657486754545465598347584785643746574865438432894656894589824786758664n);

  // operations
  console.log(10000n * 10000n);

  // exceptions
  console.log(20n > 15); // ture
  console.log(20n === 20); // false 
  console.log(typeof 20n); // bigint
  console.log(20n == '20'); // true because of type coercion

  // divisions 
  console.log(10n / 3n);
  console.log(10 / 3);

  // CREATING DATES AND TIMES

    // new Date() constructor
    const timeCurrent = new Date();
    console.log('timeCurrent' + timeCurrent);

    // parse date from date string
    console.log(new Date('Jun 17 2021 19:52:07 GMT-0500'));
    console.log(new Date ('December 24, 2015'));

    console.log(new Date(account1.movementsDates[0]));

    console.log(new Date(2037, 10, 19, 15, 23, 5));
    console.log(new Date(2037, 10, 33));

    // pass in the amount of milliseconds
    console.log(new Date(0));
    // how to convert milliseconds
    console.log(new Date(3 * 24 * 60 * 60 * 1000));

    // working with dates 
    const timeFuture = new Date((2037, 10, 19, 15, 23));
    console.log(timeFuture);
    console.log('timeFuture = ' + timeFuture);
    console.log(timeFuture.getFullYear());
    console.log(timeFuture.getMonth());
    console.log(timeFuture.getDate());
    console.log(timeFuture.getDay());
    console.log(timeFuture.getHours());
    console.log(timeFuture.getMinutes());
    console.log(timeFuture.getSeconds());
    console.log(timeFuture.getMilliseconds());
    // convert date object to string to store somewhere
    console.log(timeFuture.toISOString());

    console.log(timeFuture.getTime());

    // get Timestamp using Date.now()
    console.log(Date.now());

    timeFuture.setFullYear(2040);
    console.log('timeFuture setFullYear() = ' + timeFuture);

// OPERATIONS WITH DATES 
  // we can do calculations with dates
  // to calculate how many dates have passed
  // reuslt is timestamp in millisecons, and we can use these to perform calculations

  const aNumberFuture = new Date((2037, 10, 19, 15, 23));
  console.log(+aNumberFuture);

  const functionCalculateDaysPassed = (aDate1, aDate2) => Math.abs(aDate2 - aDate1) / (1000 * 60 * 60 * 24);
  functionCalculateDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

  const aDate1 =  functionCalculateDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
  console.log('aDate1 = ' + aDate1);

  // moment.js is the best free open source for JS developers

// INTERNATIONALIZING DATES 
  // formatting dates for users around the world

// INTERNATIONALIZING NUMBERS 
  // formatting numbers

  const aNum = 388843543543.332;
  const objectConfigurationStyleUnit = {
    style: 'currency',
    // style: 'percent',
    // style: 'currency',
    unit: 'mile-per-hour',
    // unit: 'celsius'
    currency: 'EUR',
    // useGrouping: false,
  };
  console.log(aNum);
  console.log('US: ', new Intl.NumberFormat('en-US', objectConfigurationStyleUnit).format(aNum));
  console.log('Germany: ', new Intl.NumberFormat('de-DE', objectConfigurationStyleUnit).format(aNum));
  console.log('Syria: ', new Intl.NumberFormat('ar-SY', objectConfigurationStyleUnit).format(aNum));
  console.log('Germany: ', new Intl.NumberFormat('de-DE', objectConfigurationStyleUnit).format(aNum));
  console.log(navigator.language, new Intl.NumberFormat(navigator.language).format(aNum));

// TIMERS SETTIMEOUT() AND SETINTERVAL()
  // SETTIMEOUT() 
    // runs once
    // does not halt other code from running
    // keeps counting the time in background and then calls it after
    // possible with asynchronous javascript

  // SETINTERVAL()
    // runs forever until we stop it

    // callback is the first argument of the setTimeout() function
    // second argument is the milliseconds for it to run, 1000ms = 1s
    const ingredients = ['spinach', 'garlic']
    const functionPizzaTimer = setTimeout((ingredient1, ingredient2) => console.log(`Here is your pizza made with ${ingredient1} and ${ingredient2}.`),3000, ...ingredients); // scheduled call for 3 seconds

    if (ingredients.includes('spinach')) {
      clearTimeout(functionPizzaTimer);
    };
  

    // setTimeout
    // 
    // setInterval(function(){
    //   const now = new Date();
    //   console.log(now);
    // }, 10000);

