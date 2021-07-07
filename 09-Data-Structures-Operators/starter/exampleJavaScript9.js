'use strict';

// ARRAY DESTRUCTURING ARRAYS
  // is unpacking a values from an array or object into separate variables
  // breaking down a complex data structure into a smaller data structure
  // used to retrieve elements from the array and store them into variables
    // not all variables have to be retrieved

  // legacy way to retrieve elements
  const exampleArray1 = [2,3,4];
  const ae = exampleArray1[0];
  const be = exampleArray1[1];
  const ce = exampleArray1[2];

  // modern way to retrieve all variables at the same time 
    // declare all variables at the same time
  // destructuring array assignment
  const [x,y,z] = exampleArray1; // unpack the array
  console.log(exampleArray1);
  console.log(x, y, z);
  console.log('exampleArray1 x = ', x);
  console.log('exampleArray1 y = ', y);
  console.log('exampleArray1 z = ', z);
  
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // function return array, and use it to destruct the result into different variables
  // return multiple values from a function and write a functio to order food
  // accept two parameters (index for each menu)
  methodOrder: function (indexStarterMenu, indexMainMenu) {
    // return content of the array on given index
    return [this.starterMenu[indexStarterMenu], this.mainMenu[indexMainMenu]]
  },

  // pass object into function as argument to immediately destructure the object
  methodOrderDelivery: function ({indexStarterMenu = 1, indexMainMenu = 0, time = '20:00', address}) { // destructured and created 4 variable names to represent object data (variable argument names must match object data being passed)
    console.log(`Order Received! ${this.starterMenu[indexStarterMenu]}
    and ${this.mainMenu[indexMainMenu]}
    will be devlivered to ${address} at ${time}`
    );
  },

  // write function that accepts multiple arguments, and use spread operator to pass multiple arguments
  methodOrderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(`You ordered pasta with the following ingredients:
    ${ingredient1}, ${ingredient2}, and ${ingredient3}.
    `)
  },

  // pizza must have one ingredient, others are optional
  methodOrderPizza: function (pizzaIngredientMain, ...pizzaIngredientOthers) {
    console.log(pizzaIngredientMain);
    console.log(pizzaIngredientOthers);

  }
};

// REST PATTERN EDGE CASES
restaurant.methodOrderPizza('mushrooms', 'spinach', 'garlic');
restaurant.methodOrderPizza('garlic');

// get ingredients from prompt window to the user
const collectPastaIngredients = [
  // prompt('Ingredient 1?'),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?')
];
console.log(collectPastaIngredients);
// call methodOrderPasta
restaurant.methodOrderPasta(...collectPastaIngredients);

// EXAMPLE WITH OBJECTS
  // create new restaurant object with existing and new additional data
  const objectRestaurantNew = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
  console.log(objectRestaurantNew);

  const objectCopyRestaurant = {...restaurant};
  objectCopyRestaurant.name = 'Ristorante Roma';
  console.log(objectCopyRestaurant);
  console.log(objectCopyRestaurant.name);

// call methodDelivery
restaurant.methodOrderDelivery({
  // pass in object data as argument 
  time: '22:30',
  address: 'Via del Sole, 21',
  indexMainMenu: 2,
  indexStarterMenu: 2
});

// call methodDelivery 
restaurant.methodOrderDelivery({
  // pass in object data as argument 
  address: 'Via del Sole, 21',
  indexStarterMenu: 1
});

// DESTRUCTURING OBJECTS
  // use {}
  // provide variable name of the property name that we want to retrieve from the object
  // order does not matter like arrays
  // useful when dealing with API calls (getting data from another web application) and 3rd party data
    // get object data, then destructure it

  const {name, openingHours, categories} = restaurant;
  console.log(name, openingHours, categories);

  // rename variable name to be different than the property name
    // const {exampleObjectKeyProperty: exampleNewVariableName} = exampleObject;
  const {name: restaruantName, 
        openingHours: restaruantOpeningHours,
        categories: restaruantCategoryTags
  } = restaurant;
  console.log(restaruantName, restaruantOpeningHours, restaruantCategoryTags);

  // set default value when trying to read a property that does not exist
    // menu does not exist (will throw undefined)
    // starters does exist, so default value will not apply
    // helpful when data is not hardcoded
  const { menu = [], starterMenu: starters = []} = restaurant;
  console.log(menu, starters);

  // Mutating Variables
    let a2 = 111;
    let b2 = 999;
    const objectExampleMutatingVariables = {a2: 23, b2: 7, c2: 14};
    // destructure  
      // use () to wrap in order to mutate variables because JS expects a code block
    ({a2,b2} = objectExampleMutatingVariables);
    console.log(objectExampleMutatingVariables.a2,objectExampleMutatingVariables.b2);

  // NESTED OBJECTS
    // create two variables for open and close hours
    const {fri: {open: o, close: c} } = openingHours; // further destruct object with this syntax
    console.log('open = ' + open, 'open = ' + close);
    console.log(o, c);

  // extract data from restaruant array
    // use x,,y,,z sytnax to skip variables that are not needed

  let [main, secondary] = restaurant.categories;
  console.log(main, secondary);

  // legacy way to re-assign and switch variables
  // const temporaryVariable = main;
  // main = secondary;
  // secondary = temporaryVariable;
  // console.log(main, secondary);

  [main, secondary] = [secondary, main]
  console.log(main, secondary);

  // Receive 2 return values from a function
  // order element 2 from starter menu, and element 0 from the main menu using destructure technique
  const [starterCourse, mainCourse] = restaurant.methodOrder(2, 0);
  console.log(starterCourse, mainCourse);

  // Example of Nested Array Destructure
  const exampleArrayNested = [2,4,[5,6]];
  // const [i, ,j] = exampleArrayNested;
  // console.log(i, j);
  const [i, , [j,k]] = exampleArrayNested;
  console.log(i,j,k);

  // set default values for variables when we extract them
    // useful when we do not know the length of the array
  const [p = 1, q = 1, r = 1] = [8,9];
  console.log(p,q,r);

// THE SPREAD OPERATOR (...)
  // expands an array into all of its elements
  // packing all array elements into one
  // take all of the values of the attached array, to individually write them 
  // prevents nested arrays 
  // can be used to pass multiple arguments into functions
  // does not create new variables
  // can only use it when we would use it when writing indivudual values
  // works on all so called iterables (arrays, strings, maps, sets, etc, not objects though)
  // to buid new arrays or to pass multiple values into a function
  // SPRED OPERATOR is on the RIGHT SIDE OF "="

  // legacy way
  const exampleArray2 = [7,8,9];
  const legacyNewArray = [1,2,exampleArray2[0], exampleArray2[1], exampleArray2[2]];
  console.log(legacyNewArray);

  // Modern Way
  const modernArray = [1,2, ...exampleArray2];
  console.log(modernArray);
  console.log(...modernArray); // same as 1,2,3,4,5
  console.log();

  // create array with one more food item
  const newMenu = [...restaurant.mainMenu, 'Gnocci'];
  console.log(newMenu);
  console.log('newMenu' + newMenu);

  // 2 Use Cases
    // create shallow copies
      const copyMainMenu = [...restaurant.mainMenu];
      console.log(copyMainMenu);

    // merge arrays together
      const mergeMainMenuAndStarterMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
      console.log(mergeMainMenuAndStarterMenu);

// spread operator with iterables
const aStr = 'aStr';
// create array that contains all leters 
const letters = [...aStr, '', 'S.'];
console.log(letters); // expanded a string 
console.log(...aStr);


// REST PATTERN AND PARAMETERS 
  // looks like the spread operator but does the opposite
  // uses the exact same syntax of spread operator; however, to collect multiple elements and CONDENSE them into an array
  // REST PATTERN is on the LEFT SIDE OF "="
  // takes remaining elements of the array, and puts them into another array
  // collects unused elements
  // collects all of the elements after the last variable and puts them into an array
  // Rest Pattern must be the last element
  // There can ONLY BE 1 Rest Assignment in any destructuring assignment 
  // works for objects and arrays
  
  const eArr = [1,2,...[3,4]];

  // REST SYNTAX is on the LEFT SIDE of "="
  const [aERI,bERI,...eRestPattern] = [1,2,3,4,5];
  console.log(aERI,bERI, eRestPattern);
  
  // example with SPREAD OPERATOR AND REST PATTERN
  // destructure right side 
  // pick pizza and risotta
  const [ePizza,, eRisotto, ...eOtherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
  console.log(ePizza, eRisotto, eOtherFood);

  // REST PATTERN with Objects
  // openening hours, only pick satruday, and put the rest of the elements into a weekday object
  const {sat, ...eOHWeekdays} = restaurant.openingHours;
  console.log(sat, eOHWeekdays);

  // REST PATTERN with FUNCTIONS
    // pass arguments by packing all elements into one array
    // take arbitray ammount of arguments and add them together
    // example with EST PARAMETERS and simple add function
    const eAdd = function (...eRestParameters) {
      console.log(eRestParameters); // 3 arrays for each call with all arguments passed into the function
      let eSum = 0;
      for (let i = 0; i < eRestParameters.length; i++)
      eSum += eRestParameters[i];
      console.log('eSum = ' + eSum);
    };

    eAdd(2,3);
    eAdd(5,3,7,2);
    eAdd(8,2,5,3,2,1,4);

    const eAX = [23,5,7]; // call add function with values in the array by using spread
    eAdd(...eAX);

// LOGICAL OPERATORS
    // 1) use any data type
    // 2) return any data type
    // 3) short circuiting (short circuit evaluation)
        // SHORT CIRCUITING (&& AND ||)
            // AND && OR || OPERATORS
            // if first value (operand) is truthy, then it returns that value and does not look at the other operand

        console.log(3 || 'John'); // truthy
        console.log('' || 'John'); // falsey
        console.log(true || 0); // truthy
        console.log(undefined || null); // undefined is falsey

        console.log(undefined || 0 || '' || 'Hello' || 23 || null); // prints 'Hello' because it is the first truthy value
        console.log();

        restaurant.numberGuests = 0;

        // dont know if it exists, want to define variable on this property and set default value if it does not exists
        const eNumberGuests1 = restaurant.numberGuests ? restaurant.numberGuests : 10;
        console.log(eNumberGuests1); // 10 if property is not set or undefined

        const eNumberGuests2 = restaurant.numberGuests || 10;
        console.log(eNumberGuests2);

        // AND OPERATOR works the opposite of OR OPERATOR
          // short circuits on the first false operator
        console.log(0 && 'John'); // 0
        console.log(7 && 'John'); // John
        console.log('Hello' && 23 && null && 'jonas'); // short circuits at null

        // check if method exists, if so, then call it and execute
        if (restaurant.methodOrderPizza) {
          restaurant.methodOrderPizza('spinach', 'garlic');
          console.log('Pizza was ordered.');
        } else {
          console.log('Pizza was not ordered.');
        }

        restaurant.methodOrderPizza && restaurant.methodOrderPizza('spinach', 'garlic');
  
// The NULLISH COALESCING OPERATOR (??)
        // restaurant.numbGuests = 0;
        // dont know if it exists, want to define variable on this property and set default value if it does not exists
        const eNumberGuests3 = restaurant.numbGuests ? restaurant.numbGuests : 10;
        console.log(eNumberGuests3); // 10 if property is not set or undefined

        // Nullish values are  : null and undefined (NOT 0 or '')
        const eNumberGuestsCorrect = restaurant.numbGuests ?? 10;
        console.log(eNumberGuestsCorrect);
        
// LOOPING ARRAYS: THE FOR-OF LOOP
        // for item variable of array
        // each iteration will give us access to the current array element specified in the variable
        // no counters and conditions
        // continue and break keywords can still be used
        // index is a pain to get in this loop

        const menuAllItems = [...restaurant.starterMenu, ...restaurant.mainMenu];
        console.log(menuAllItems);
        for (const exampleForOfLoopIndex of menuAllItems) {
          console.log(exampleForOfLoopIndex);
        }; // code block not needed but i like it

        // exampleObject.entries()
        // legacy way
        for (const exampleForOfLoopGetIndex of menuAllItems.entries()) {
          console.log(exampleForOfLoopGetIndex);
          // start the menu at one by adding one to the index with the item itself
          console.log(`${exampleForOfLoopGetIndex[0] + 1}: ${exampleForOfLoopGetIndex[1]}`);
        };

        // Modern Way
        // use destructuring assignent, and create two variables 
        for (const [index, element] of menuAllItems.entries()) {
          // console.log(index, element);
          // start the menu at one by adding one to the index with the item itself
          console.log(`${index + 1}: ${element}`);
        };

// ENHANCED OBJECT LITERALS
  // 3 Ways to more easily write object literals
    // do not need to declare object and then assign that varaible to the object key property
      // must share the same name syntax
    // Writing Methods 
      // no longer have to create a property and then set it to a function expression
      // can remove the function keyword and colon on methods in an object
    
      // can compute property names instead of having to write them manually
      const weekdays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      const openingHours1 = {
        [weekdays1[3]]: {
          open: 12,
          close: 22,
        },
        [weekdays1[4]]: {
          open: 11,
          close: 23,
        },
        [weekdays1[5]]: {
          open: 0, // Open 24 hours
          close: 24,
        },
      };

// OPTIONAL CHAINING (.?)
  // get opening hours of restaruant for monday
  // console.log(restaurant.openingHours.mon.open); // this propery does not exist (Undfined)
  // simulate data came from web service api, and multiple restaruants exist, but not all are open on monday
      // check if exists 
      // legacy way 
        // can get out of hand when there are deeploy nested objects and many options
      if (restaurant.openingHours && restaurant.openingHours.mon) {
        console.log(restaurant.openingHours.mon.open);
      } else {
        console.log('restaurant.openingHours.mon.open = does not exist');
      }
      // Modern Way
      // OPTIONAL CHAINING
        // if a certain property does not exist, then undefined will return immediately to resolve the does not exist error
        // only if all the the property that is before the question mark then open property will be read, if not, then undefined will be returned
        // if not null or undefined
      console.log(restaurant.openingHours && restaurant.openingHours.mon?.open);
      console.log(restaurant.openingHours && restaurant.openingHours?.mon?.open);

      // Example 
      // loop over array and log whether the restaurant is opened or closed
      // set default value if undefined
      const eDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      for (const eDay of eDays) {
        console.log(eDay);
        const eDayOH = restaurant.openingHours[eDay]?.open ?? 'Restaurant is closed.';
        console.log(`Open Hours at ${eDayOH}`);
      };

      // OPTIONAL CHAINING WITH METHODS
        // we can check if a method exists before we call it 
        console.log(restaurant.methodDNE?.(0,1) ?? 'Method does not exist.');
        console.log(restaurant.methodOrderRisotto?.(0,1) ?? 'Method does not exist.');
        console.log();

      // OPTIONAL CHAINING WITH ARRAYS
        // we can check if an array exists or is empty before we call it 
      const eUsersArray = [{username: 'exampleUsername', email: 'example@example.example'}];
      // get first element, only if it exists (optional chaining), get username, else log is empty
      console.log(eUsersArray[0]?.username ?? 'eUsersArray is empty.');

      if (eUsersArray.length > 0) {
        console.log(eUsersArray[0].username);
      } else {
        console.log('eUsersArray is empty.');
      };
      
// LOOPING OBJECTS: OBJECT KEYS, OBJECT VALUES, AND OBJECT ENTRIES
      // objects are not iterables, but we can loop through them in an indirect way

      const aProperties = Object.keys(openingHours);
      console.log(aProperties);
      console.log(`Restaurant is open on ${aProperties.length} days.`);
      let stringROH = `Restaurant is open on ${aProperties.length} days: `;

      // Loop over property names (OBJECT KEYS)
      for (const aDay of aProperties) {
        console.log('Object.keys() = ' + aDay);
        stringROH +=  `${aDay}, `;
      }
      console.log(stringROH);

      // Loop over property values
      const eObjectPropertyValue = Object.values(openingHours);
      console.log(eObjectPropertyValue);
      // to simulate and loop over the entire object, we need the entries
        // entries are the name and values together
        // entries return index number and the element itself
      const eObjectEntries = Object.entries(openingHours);
      console.log(eObjectEntries); // we use this too loop over the object
      for (const [key, {open, close}] of eObjectEntries) {
        console.log(key, open, close);
        console.log(`On ${key}, we open at ${open} and close at ${close}`);
      };

// SETS AND MAPS
      // SETS
        // SET is a collection of unique values
        // they can never have any duplicate values
        // all duplicate values will be gone
        // a bunch of values grouped together in a set, an iterable
        // order in a SET is irrelevant
        // main use case for a Set is to remove duplicate values of arrays
        // Sets are not intended to replace arrays

        // create new set and pass in an iterable (an array)
        const exampleSetOrders = new Set([
        'Pasta',
        'Pizza',
        'Pizza',
        'Risotto',
        'Pasta',
        'Pizza'
      ]);
      console.log(exampleSetOrders);
      // strings are also iterables, so we can pass a string into a set
      console.log(new Set('John'));

      // get size of a set
      console.log(exampleSetOrders.size);
      // check if element is in a set
      console.log(exampleSetOrders.has('Pizza'));
      console.log(exampleSetOrders.has('Bread'));
      // add element to a set
      console.log(exampleSetOrders.add('Garlic Bread'));
      console.log(exampleSetOrders);
      // delete element from a set
      console.log(exampleSetOrders.delete('Risotto'));
      console.log(exampleSetOrders);
      // retreive value from a set
        // no index in a set, no way to get a value from a set
      console.log();
      // delete all elements from the set
      // console.log(exampleSetOrders.clear);
      // SETS are also iterables
      for (const aSetOrder of exampleSetOrders){
        console.log(aSetOrder);
      };

      // main use case for a Set is to remove duplicate values of arrays
      const eStaff = [
        'Waiter',
        'Chef',
        'Waiter',
        'Manager',
        'Chef',
        'Waiter'
      ];
      console.log(new Set(eStaff).size); // check size of set using array
      // create set to remove duplicate in array
      const eSetUniqueStaff = [...new Set(eStaff)]; // convert from set to array, by using spread operator to unpack elements into a newly constructed array
      console.log(eSetUniqueStaff);
      // console.log(eSetUniqueStaff.size);

// MAPS: Fundamentals
      // MAPS are more useful than Sets
      // A map is a data structure that we can use to map values to keys
        // data is stored in key value pairs in maps
        // object keys are always strings, but in MAPS, we can have any type of key
        // READ data from a MAP using get() method

        // create empty map with no parameters
        const mapRestaurant = new Map();
        // pass in two arguments as parameters (keyname, element)
        mapRestaurant.set('name', 'Classico Italiano');
        console.log(mapRestaurant);
        // add new element to map data structure
        // two locations for example
        mapRestaurant.set(1, 'Firenze, Italy');
        mapRestaurant.set(2, 'Lisbon, Portugal');
        console.log(mapRestaurant);
        // set method returns the updated map and allows us to chain it
        mapRestaurant.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open, 11').set('close', 23);
        console.log(mapRestaurant);
        // use booleans 
        mapRestaurant.set(true, 'Restaurant is open.').set(false, 'Restaurant is closed.');
        console.log(mapRestaurant);
        // read data from a map
        console.log(mapRestaurant.get('name'));
        console.log(mapRestaurant.get(true));
        console.log(mapRestaurant.get(1));

        const eTime = 21;
        // pass in key to get value
        console.log(mapRestaurant.get(eTime > mapRestaurant.get('open') && eTime < mapRestaurant.get('close')));
        // check if map contains a certain key
        console.log(mapRestaurant.has('categories'));
        // delete from map
        console.log(mapRestaurant.delete(2));
        console.log(mapRestaurant);
        // get size or length
        console.log(mapRestaurant.size);
        // clear or remove all elements from the map
        // console.log(mapRestaurant.clear);

        // use array and objects as map keys
          // useful with dom elements (special types of objects)
          // create an array, pass into set as argument to parameter, and read that same variable
        const eMapArray = [1,2];
        mapRestaurant.set(eMapArray, 'Test');
        mapRestaurant.set(document.querySelector('h1'), 'Heading');
        console.log(mapRestaurant);
        console.log(mapRestaurant.size);
        console.log(mapRestaurant.get(eMapArray));
        console.log(eMapArray);

// MAPS: ITERATION
      // populate a map without using the set() method
      // pass array in as argument to parameter 
        // contain multiple arrays with first position as key, and second position as the value
      const mapQuestion = new Map ([
        ['question', 'What is my favorite programming language?'],
        [1, 'Python'],
        [2, 'Java'],
        [3, 'JavaScript'],
        [4, 'None of the above'],
        ['answerCorrect', 3],
        [true, 'Correct!'],
        [false, 'Wrong... Try again.']
      ]);
      console.log(mapQuestion); // same array structure that is returned from calling Object.entries()
      // easy way to convert from objects to maps
      console.log(Object.entries(openingHours));
      const mapHours = new Map (Object.entries(openingHours));
      console.log(mapHours); // when you need a map and already have an object

      // for loop is also available for map iteration
        // only print element if key is a Number
      console.log(mapQuestion.get('question'));
      for (const [key, value] of mapQuestion) {
        if (typeof key === 'number') {
          console.log(key, value);
          console.log(`Answer ${key}: ${value}`);
        }
      };
      const userAnswer = Number(prompt('Your Answer:'));
      console.log('userAnswer = ' + userAnswer);
      console.log(mapQuestion.get('answerCorrect') === userAnswer);

      // convert map back to an array
      console.log([...mapQuestion]);
      console.log([...mapQuestion.entries()]);
      console.log([...mapQuestion.keys()]);
      console.log([...mapQuestion.values()]);
      console.log();

// SUMMARY: Which Data Structure to Use?
      // ARRAYS
        // when need values in order and duplicates, 
        // when need to manipulating data
      // OBJECTS
        // more traditional key/value store
        // easier to write and access values with . and []
        // use when need to include functions and methods
        // use when working with JSON, can convert to map
      // SETS
        // only when working with unique values
        // high performance scenarios
        // remove duplicate values from array (unique values)
      // MAPS
        // better performance
        // keys can have any data type
        // easy to iterate
        // easy to compute size
        // use when you simply need to map key to value
        // use when need keys that are not strings
  // 3 Sources of Data
      // 1) From the program itself: Data written directly in source code (e.g. status messages)
      // 2) From the UI: Data input from the user or data written in DOM (e.g tasks in todo app)
      // 3) From external sources: Data fetched for example from a web API
        // API = Application Programming Interface
        // APIs are used to get data from other web applications (weather, movies, currency conversion rates, etc.)
        // most common source of data is JSON Data format
          // JSON is essentially text (a long string) that can be easily converted to JavaScript objects because it uses same formatting as JS objects and arrays
  // Store Collections of Data with Data Structures
      // Need A Simple List, then use
        // Arrays or Sets
        // have values with no description
      // Need Key/Value Pairs
        // Objects or Maps
        // we have a way of describing the values
        // array of objects is extremely common as a professional developer

// Working With Strings - Part 1
const eAirline = 'TAP Air Portugal';
const ePlane = 'A320';

console.log(ePlane[0]); // get string index
console.log(ePlane[1]);
console.log(ePlane[2]);

console.log('B737'[0]);

console.log(eAirline.length);
console.log(ePlane.length);

// indexOf() method
// first occurence of index
console.log(eAirline.indexOf('r'));

// last occurence of index
console.log(eAirline.lastIndexOf('r'));
// index of string or word 
console.log(eAirline.indexOf('Portugal')); // case sensitive 

// extract part of a string using the slice method, and the slice method takes arguments
      // index is included of the start of the sliced string
      // does not change the underlying String because, they are immutable
console.log(eAirline.slice(4));
console.log(eAirline.slice(4, 7)); // stops extracting before it reaches 

// many times we do not know the user data received
      // indexOf methods are useful to not hard code data
console.log(eAirline.slice(0, eAirline.indexOf(' ')));
console.log(eAirline.slice(eAirline.lastIndexOf(' ') + 1)); // add one to remove the space

console.log(eAirline.slice(-2));

console.log(eAirline.slice(-2));
console.log(eAirline.slice(1, -1)); // start at position one, cut off the left character

// function that receives an airline ticket seat, and logs whether or not it is the middle seat
const functionCheckMiddleSeat = function(aSeat){
  console.log(aSeat);
  // B and E are middle seats
    // take last character of string and test letter
  const s = aSeat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('This is a middle seat.');
  } else {
    console.log(' This is not a middle seat.');
  };
};

functionCheckMiddleSeat('11B');
functionCheckMiddleSeat('23C');
functionCheckMiddleSeat('3E');

// boxing, string is boxed which is the object
console.log(new String('John'));
console.log(typeof new String('John')); 
// all string methods return primitives even if called on an object
console.log(typeof new String('John').slice(1));

// SIMPLE STRING METHODS
console.log(eAirline.toLocaleLowerCase());
console.log(eAirline.toLocaleUpperCase());

// Fix Capitalization in passenger name
const ePassenger = 'jOhN'; // John
console.log(ePassenger);
const ePassengerLowerCase = ePassenger.toLowerCase();
console.log(ePassengerLowerCase);
const ePassengerCorrect = ePassengerLowerCase[0].toUpperCase() + ePassengerLowerCase.slice(1);
console.log(ePassengerCorrect);

// Comparing emails
const eEmail = 'example@example.example';
console.log(eEmail);
const eLoginEmail = '   Example@Example.Example \n';
console.log(eLoginEmail);
// convert to lowercase
const eEmailLower = eLoginEmail.toLocaleLowerCase();
console.log(eEmailLower);
const eEmailTrimmed = eEmailLower.trim();
console.log(eEmailTrimmed);
// above can be done in one step
const eEmailNormalized = eLoginEmail.toLowerCase().trim();
console.log(eEmailNormalized);
console.log(eEmail === eEmailNormalized);

// Replace parts of Strings
const ePriceGB = '288,87£';
// replace £ with $, and , with .
const ePriceUS = ePriceGB.replace('£', '$').replace(',', '.');
console.log(ePriceUS);

const eAnnouncement = 'All passengers come to boarding door 23. Boarding door 23!'
// replace 'door' with 'gate'
console.log(eAnnouncement.replace('door', 'gate'));
// console.log(eAnnouncement.replaceAll('door', 'gate')); // modern way
// make string regular expression, and add g for global to replace all
console.log(eAnnouncement.replace(/door/g, 'gate'));

// BOOLEAN STRING METHODS
const ePlane1 = 'Airbus A320neo';
console.log(ePlane1.includes('A320'));
console.log(ePlane1.includes('Boeing'));
console.log(ePlane1.startsWith('Air'));
console.log(ePlane1.startsWith('Arb'));

if (ePlane1.startsWith('Airbus') && ePlane1.endsWith('neo')) {
  console.log('Part of new Airbus family.');
};

// Practice Exercise
  // if baggage is allowed in the plane
const functionCheckBaggage = function (aItems) {
  console.log(aItems);
  const aBaggage = aItems.toLowerCase();
  if (aBaggage.includes('weapon')) {
    console.log('Passenger is not allowed in the airport. Call authorities.');
  } else {
    console.log('Passenger is allowed in the airport.');
  }
};
functionCheckBaggage('I have electronics.');
functionCheckBaggage('Weapon');
functionCheckBaggage('Socks and Camera');

// split String Method 
console.log('an+example+string'.split('+'));
console.log('Firstname Lastname'.split(' '));
// create an array with 2 elements
const [eFirstName, eLastName] = 'Firstname Lastname'.split(' ');
console.log(eFirstName, eLastName);

// join String Method
const eNewName = ['Mr.', eFirstName, eLastName.toUpperCase()].join(' ');
console.log(eNewName);

const functionNameCapitalize = function (aName) {
  console.log(aName);
  const aNames = aName.split(' ');
  console.log(aNames);
  const namesUpperCase = [];
  console.log(namesUpperCase);
  for (const n of aNames) {
    console.log(n);
    // namesUpperCase.push(n[0].toUpperCase() + n.slice(1));
    namesUpperCase.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpperCase.join(' '));
};

functionNameCapitalize('jessica ann smith davis');

// padding a string 
  // adding a number of characters to a string until it is a desired length 
  const eMessage = 'Go to gate 23!'
  // take result and pad the end of the string 
  console.log(eMessage.padStart(25, '+').padEnd(35, '+')); // length of string is filled to reach 25 characters with '+' sign

  // real world credit card example
  // create a function that masks cc number
  const functionCreditCardMask = function (aCCNumber) {
    console.log(aCCNumber);
    const aCCNumberStr = aCCNumber + ''; // when one operand is a string, all operands are converted to a string
    console.log(aCCNumberStr);
    const aCCNumberStrLast4Char = aCCNumberStr.slice(-4);
    console.log(aCCNumberStrLast4Char);
    const aCCNumberStrLast4CharSalted = aCCNumberStrLast4Char.padStart(aCCNumberStr.length, '*');
    console.log(aCCNumberStrLast4CharSalted);
  };
  functionCreditCardMask(453657544324566);

// repeat String Method
  const eMessageRepeat = 'Bad weather... All Departures Delayed.';
  console.log(eMessageRepeat.repeat(5));

  const functionPlanesToFly = function (n) {
    console.log(`There are ${n} planes to fly ${'!'.repeat(n)}`);
  };
  functionPlanesToFly(5);

// there are more that exist than the above




        





