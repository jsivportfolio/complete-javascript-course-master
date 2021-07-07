// Exporting module
// specifying type="module" allows modules to work
// code will be executed before code in the importing module
console.log('Exporting module');

// define variables that are scoped to this module, think private keyword
// using them in the import requires an export from the module to the import
    // export
        // 1) named exports
            // simplest way, just use export keyword
            // main use-case = when we want to export multiple things at the same time 
        // 2) default exports
            // used when we only want to export one thing per a module
            //

const shippingCost = 10;
export const cart = [];

// export to enable import in another file/module
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// named exports, export multiple things at the same
export { totalPrice, totalQuantity as tq };

// default export 
// exporting the value (in this case a function)
// import can have any name now
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
