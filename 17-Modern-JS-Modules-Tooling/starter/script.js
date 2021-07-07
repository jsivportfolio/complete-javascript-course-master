// ANOVERVIEW OF MODERN JAVASCRIPT DEVELOPMENT
    // Projects are now divided into multiple modules
        // share data between them and help with maintainability
        // can include pacakges and 3rd party modules
        // open source packages to include 3rd-party code in our code
            // react, jQuery, Leaflet, etc
            // npm
                // where packages live and how we install them
        // Javascript Bundle is the file that goes to production
        // bundling - join all modules into one file
            // better for performance
        // transpiling/polyfilling 
            // done with babel tool, converts code to ES5 for legacy browsers
        // JS bundlers
            // webpack or parcel
                // requires a lot of configuration
            // transforms it into JS bundle 
                // works out of the box

// AN OVERVIEW OF MODULES IN JAVASCRIPT
    // MODULES
        // re-usable piece of code that encapsulates implementation details
        // usually a standalone file, but it does not have to be
        // can have code, imports, and exports
            // export can export values out of modules and functions too, what we export is known as public API
                // consumed by importing values and functions into a module
                    // these are called dependencies
        // compose softare
            // modules are small buidling blocks that we put together to build complex applications
        // isolate components
            // modules can be developed in isolation without thinking about the entire code base
        // abstract code
            // implement low-level code in modules and import these abstractions into other modules
        // organize code
            // modules naturally lead to a more organize codebase
        // re-use code 
            // modules allow us to easily re-use the same code, even across multiple projects

    // NATIVE JAVASCRIPT (ES6) MODULES
        // Modules store in files
            // exactly one module per file

        // Difference between script and modules
            // ES6 Module
                // Top-level variables = scoped to module
                // Default Mode = 'strict mode'
                // Top-level this = undefined
                // Imports and exports = YES
                // HTML linking = <script type="module">
                // File downloading = Asynchronous
            // Script
                // Top-level variables = Global
                // Default Mode = "Sloppy" mode
                // Top-level this = window
                // Imports and exports = NO
                // HTML linking = <script>
                // File downloading = Synchronous
        
        // Parsing index.js
            // read code without executing
            // where imports are hoisted
            // modules are imorted synchronously (only import operation) - exports are linked to index js
            // possbile thanks to top-level "static" imports, which make imports known before execution
            // this makes nundling andead code elimination possible 

///////////////////////////////////////
// Exporting and Importing in ES6 Modules

// Importing module
    // import data from module location
    // specify type attribute in script tag like, type="module" 
    // imports are hoisted at the top of the file (variables names must match export name)
    // change import name by using export name then use the as keyword then the name of new variable name
        // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
        // addToCart('bread', 5);
        // console.log(price, tq);

    console.log('Importing module');
    // console.log(shippingCost);

    // import all exports of module at the same time with * as desired name from desired export module
        // import * as ShoppingCart from './shoppingCart.js';
        // ShoppingCart.addToCart('bread', 5);
        // console.log(ShoppingCart.totalPrice);

    // import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
    // console.log(price);

    // import the default export with any name
    import add, { cart } from './shoppingCart.js';
    add('pizza', 2);
    add('bread', 5);
    add('apples', 4);

    // imports are not copies of exports
        // they are a live connection pointing to the same place in memory
    console.log(cart);

    ///////////////////////////////////////
    // The Module Pattern
        // main goal is to encapsulate functionality to have private data and expose a public API
        // BEST way is to use functions because they give us private data by default and allow us to return values (our public API)

    // define function (immediately invoked function that is only called once)
    // create a new scope and return data once
    const ShoppingCart2 = (function () {
        const cart = [];
        const shippingCost = 10;
        const totalPrice = 237;
        const totalQuantity = 23;
    
        const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(
            `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
        );
        };
    
        const orderStock = function (product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
        };
    
        // all data is privat to inside scope of function
        // return object data (public API)
        // returns nothing if we dont define the function to a variable
        // CLOSURES
            // allow function have access to all variables at their birth place
        return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
        };
    })();


    // can access function in variable becaue of CLOSURES
    // 
    ShoppingCart2.addToCart('apple', 4);
    ShoppingCart2.addToCart('pizza', 2);
    console.log(ShoppingCart2);
    console.log(ShoppingCart2.shippingCost);

    ///////////////////////////////////////
    // CommonJS Modules
    // // Export
    // export.addTocart = function (product, quantity) {
    //     cart.push({ product, quantity });
    //     console.log(
    //     `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    //     );
    // };
    
    // // Import
    // const { addTocart } = require('./shoppingCart.js');

    ///////////////////////////////////////
    // Introduction to NPM
        // COMMANDS
            // ls and dir show files in current folder
            // cd .. allows naviation back
            // cd forward or down
            // cd ../.. move two levels
            // rm or del will delete file

    // NPM (Node Packaging Manager)
        // each project for npm needs to be initialized (npm init)


    // import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
    // // import cloneDeep from 'lodash-es';

    // const state = {
    // cart: [
    //     { product: 'bread', quantity: 5 },
    //     { product: 'pizza', quantity: 5 },
    // ],
    // user: { loggedIn: true },
    // };
    // const stateClone = Object.assign({}, state);
    // const stateDeepClone = cloneDeep(state);

    // state.user.loggedIn = false;
    // console.log(stateClone);

    // console.log(stateDeepClone);

    // if (module.hot) {
    // module.hot.accept();
    // }

    // class Person {
    // #greeting = 'Hey';
    // constructor(name) {
    //     this.name = name;
    //     console.log(`${this.#greeting}, ${this.name}`);
    // }
    // }
    // const jonas = new Person('Jonas');

    // console.log('Jonas' ?? null);

    // console.log(cart.find(el => el.quantity >= 2));
    // Promise.resolve('TEST').then(x => console.log(x));

    // // import 'core-js/stable';
    // // import 'core-js/stable/array/find';
    // // import 'core-js/stable/promise';

    // // Polifilling async functions
    // // import 'regenerator-runtime/runtime';


            


