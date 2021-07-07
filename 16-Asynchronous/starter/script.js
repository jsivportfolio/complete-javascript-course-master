'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// SYNCHRONOUS JAVASCRIPT
    // executed line by line in the exact order we define
    // most code is synchronous 
    // happens in the execution thread
        // part of the execution context that actuay executes the code in computer's CPU
    // each line of code waits for the previous line of code to finish
    // long running operations of block code execution


// ASYNCHRONOUS JAVASCRIPT
    // deal with long running tasks that are in the background
    // fetch data from remote servers using AJAX calls, 
    // is executed after a task that runs inthe background finishes 
    // code is non-blocking
    // execution doesnt wait for an asynchronous task to finish its work (not occuring at the same time)
    // coordinating the behavior of a program over a period of time
    // callback functions alone do not make code asynchronous 
    
    // AJAX
        // Asynchronous JavaScript And XML: Allows us to communicate with remote web servers in an asynchronous way. With AJAX calls, we can request data from web servers dynaically
        // requesting data from web-server dynamically 
        // client sends request, web server provides data back via respnse
            // get to recieve 
            // post to send data
        // web API sends us data
        // API
            // Application Programming Interface
            // Piece of software that can be used by another piece of software, in order to allow applications to talk to each other
            // many types of API
                // DOM API
                // api from other sources
                // own clas API
                // online API
                    // application running on aserver, that receives requests for data, and sends data back as a response
                // we can build our own web APIs (requires back-end development, e.g with node.js), or use 3rd party APIs
                // API data format 
                    // XML used to be data format 
                    // we use JSON format now 
                        // JS Object converted to a String
                            // easy to send and use 

    // HOW THE WEB WORKS: REQUESTS AND RESPONSE
        // request response model | client server architecture
        // all url gets the protocol http or https
        // domain name
        // resource

        // DNS (Domain Name Server)
            // browser makes request, matches address of server to real IP address
        
        // TCP/IP socket connection is established between the client and web server (internet fundamental control system)
        // make the request as http request (hyper text transfer protocol) protocol that allows clients and servers to communicate
        // request headers, has information about the request itself
        // request body, contains the data we are sending
        // each file makes a new request (can have multipe happening at the same time)

// ASYNCHRONOUS JAVASCRIPT: PROMISES, ASYNC/AWAIT, AND AJAX

    // CORS 
        // Cross Origin Resource Sharing
            // this is required to access 3rd party API from our code
        // API endpoint
            // the URL that we need
            // AJAX call to URL

        

    // // AJAX Call: XMLHttpRequest

    // // function to reuse code for multiple countries 
    // const getCountryData = function (country) {
    //     // legacy way to create AJAX call

    //     const request = new XMLHttpRequest();
    //     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    //     // ajax call, send the request, fetches data 
    //     request.send();
    
    //     // ajax call, receive data, wait for the load event
    //     request.addEventListener('load', function () {
    //     // response is set when the data arrives
    //     // destructure to get the object for use in code 
    //     const [data] = JSON.parse(this.responseText);
    //     // result of ajax call
    //     console.log(data);
    
    //     // create template literal where we want data in the html
    //     const html = `
    //     <article class="country">
    //     <img class="country__img" src="${data.flag}" />
    //     <div class="country__data">
    //         <h3 class="country__name">${data.name}</h3>
    //         <h4 class="country__region">${data.region}</h4>
    //         <p class="country__row"><span>👫</span>${(
    //         +data.population / 1000000
    //         ).toFixed(1)} people</p>
    //         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    //         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    //     </div>
    //     </article>
    //     `;
    //     // add data to the html
    //     countriesContainer.insertAdjacentHTML('beforeend', html);
    //     // set the stlye of the container
    //     countriesContainer.style.opacity = 1;
    //     });
    // };
    // // pass input string to the function
    // getCountryData('portugal');
    // getCountryData('usa');
    // getCountryData('germany');

    // AJAX Call: XMLHttpRequest

    const renderCountry = function(data, className = '') {
        // create template literal where we want data in the html
        const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
        `;
        // add data to the html
        countriesContainer.insertAdjacentHTML('beforeend', html);
        // set the stlye of the container
        countriesContainer.style.opacity = 1;
    }

    // // function to reuse code for multiple countries 
    // const getCountryDataAndNeighbour = function (country) {
    //     // legacy way to create AJAX call
    //     const request = new XMLHttpRequest();
    //     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    //     // ajax call, send the request, fetches data 
    //     request.send();
    
    //     // ajax call, receive data, wait for the load event
    //     request.addEventListener('load', function () {
    //     // response is set when the data arrives
    //     // destructure to get the object for use in code 
    //     const [data] = JSON.parse(this.responseText);
    //     // result of ajax call
    //     console.log(data);
    //     renderCountry(data);
    //     });
    // };
    // // pass input string to the function
    // getCountryDataAndNeighbour('portugal');
    // getCountryDataAndNeighbour('usa');
    // getCountryDataAndNeighbour('germany');

    // // Welcome to Callback Hell
    //     // many nested callbacks to execute asynchronous tasks in sequence
    //     // makes code hard to undertstand, hard to read, harder to maintain, increases chance for bugs

    // const getCountryAndNeighbour = function (country) {
    // // AJAX call country 1
    // const request = new XMLHttpRequest();
    // request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    // request.send();

    // request.addEventListener('load', function () {
    //     const [data] = JSON.parse(this.responseText);
    //     console.log(data);

    //     // Render country 1
    //     renderCountry(data);

    //     // Get neighbour country 2
    //     // destructure the data into the array
    //     const [neighbour] = data.borders;

    //     // gaurd clause 
    //     // check for countries with no neighbours
    //     if (!neighbour) return;

    //     // AJAX call country 2
    //     // this is dependent on the first call because it is a nestd callback
    //     const request2 = new XMLHttpRequest();
    //     // search for the code
    //     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    //     request2.send();

    //     request2.addEventListener('load', function () {
    //     // no need descture the response because it is not an array
    //     const data2 = JSON.parse(this.responseText);
    //     console.log(data2);

    //     renderCountry(data2, 'neighbour');
    //     });
    // });
    // };

    //     // getCountryAndNeighbour('portugal');
    //     getCountryAndNeighbour('usa');

    //     setTimeout(() => {
    //         console.log('1 second passed');
    //             setTimeout(() => {
    //             console.log('2 seconds passed');
    //                 setTimeout(() => {
    //                 console.log('3 second passed');
    //                 setTimeout(() => {
    //                 console.log('4 second passed');
    //                 }, 1000);
    //             }, 1000);
    //         }, 1000);
    //     }, 1000);


// PROMISES AND FETCH API
    // modern way to use promieses
    // call fetch, with url, with requested data, and immeidately returns a promise
    // pass the url and store the request into a variable 
    // PROMISE: 
        // an object that is used as a placeholder for the future result of an asynchronous operation
        // a container for asynchronous value
        // a container for a future value (response from ajax call)
        // handles future value 
        // advantages of using promises
            // we no longer need to rely on events and callbacks passed into asynchronous functuons to handle asynchronous results
            // instead of nesting, we can chain promises for a sequene of asynchronous operations
        // Promise pending (before future is available)
        // promise settled
            // fulfilled promise (successfully resulted in fetched data from api tp use )
            // rejected promise (error on the asynchronous task) example not connecting to a server 
            // promise is settled once, and not possible to change that state
            // state is useful for consuming a promise
                // we can consume a promise when we have a fullfilled rpomise
        // we can ghandle thes different states in our code

    
// Consuming Promises
    // then method allows us to handle promise where we pass in callback function as soon as the result is fulfilled
        // then method always returns a promise no matter if we return anything or not
        // this is the fulfillment promise
        // the fullfilled value from this return will be used in the next promise chain 
        // always return the promise and handle it outside to the chain 
    // these function will receive one function (the result/future value from fetch)
    // call json() method that is available on the fetch method (it is asynchronous function that returns a new promise)
        // return this promise and handle it
            // call another then method() as sibling with the data
    // fetch, get response that is transformed to json, and render that to the dom with html ${}
// Chaining Promises
    // 
// Handling Rejected Promises
    // pass second call back function into the then method to handle rejections (not the best way)
    // handling the error is called catching the error
    // handle errors no matter where they appear in the promise chain by adding the a catch() method
    // finally() method function is called no matter what if fulfilled or rejected 
    // way to display error message to user
    // use catch() and finally()
// Throwing Errors Manually

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('usa');

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

// returns a promise 
const getJSON = function (url, errorMsg = 'Something went wrong.') {
    return fetch(url).then(response => {
      // mannually handle the error
      if (!response.ok)  // if response is false
      // throw will terminate the function
      throw new Error(`${errorMsg} (${response.status})`); // throw new error
      return response.json(); 
      // rejected promise returned down the chain to the catch method where we handle it to display
    });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       // mannually handle the error
//       if (!response.ok)  // if response is false
//         // throw will terminate the function
//         throw new Error(`Country not found (${response.status})`); // throw new error
//       return response.json(); 
//       // rejected promise returned down the chain to the catch method where we handle it to display
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     // use finally() for something that always needs to happen (use case is loading spinners)
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
    // Country 1
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found.')
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
        // const neighbour = 'dfsdfdef';
  
        // we throw an error to catch in the error handler 
        if (!neighbour) throw new Error('No neighbour found!');
  
        // Country 2
        return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, `Country not found`);
      })
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      // use finally() for something that always needs to happen (use case is loading spinners)
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    getCountryData('usa');
  });
getCountryData('australia');

// ASYNCHRONOUS BEHIND THE SCENES: THE LOOP EVENT

  // JS has only one thread of execution, it can only do one thing at a time
  // EVENT LOOP: 
    // holds all the ready to be called callback functions
    // takes callbacks from the queue and puts them in the callstack so they can be executed
    // allows asynchronous behavior possible in JS
    // we can have non-blocking concurrency model in JS (handle multipe things at the same time)
    // coordinates between callstack and callback queue (decides when call backs are executed)
    // JS has no sense of time (runtime manages the async behavior)
    // callbacks of promises, have a special queue for themselves called the MicroTasks Queue, has priority of callback queue

// THE EVENT LOOP IN PRACTICE
  // synchrnoys start and end will occurr first
  // time and promise will finish at the same time
  // microtasks have priority over regular call backs
  // 0 seconds are not a guarantee 

console.log('Test start'); // 1
// timer is called after 0 seconds
setTimeout(() => console.log('0 sec timer'), 0); // 5
// build a promise that resolves immediately
  // one with a success value fullfilled
Promise.resolve('Resolved promise 1') // 3
// handle the promise with the then method()
.then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => { // 4
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end'); // 2

// BUILDING A SIMPLE PROMISE

// create a promise using the promise constructor 
    // takes one argument called the executor function
        // as it executres, it passes in two other arguments 
            // resolve function
            // reject function
        // produces a result value (future value of the promise)
    // in practive we usually just consume promises 
    // we only build promises to convert callback based async behavior to promise based behavior

const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lotter draw is happening 🔮');
    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve('You WIN 💰'); // call resolve function that was passed into the executor function (fulfilled promise with fulfilled value, so we can consume it with the then() method - handling the promise)
      } else {
        reject(new Error('You lost your money 💩')); // call reject function that was passed into the executor function, with new Error object
      }
    }, 2000);
  });
  
  // then method() is called with the result of the promise, and catch any errors if they exist
    // success = res
    // reject = err
  lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
  
  // Promisifying setTimeout
  // function with seconds parameter
  // create function, return promise to encapsulate async promise 
  // pass in executor function
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  // consume promise
    // call wait() function, then resolve, then handle
  wait(1)
    .then(() => {
      console.log('1 second passed');
      return wait(1);
    })
    .then(() => {
      console.log('2 second passed');
      return wait(1);
    })
    .then(() => {
      console.log('3 second passed');
      return wait(1);
    })
    .then(() => console.log('4 second passed'));
  
  // setTimeout(() => {
  //   console.log('1 second passed');
  //   setTimeout(() => {
  //     console.log('2 seconds passed');
  //     setTimeout(() => {
  //       console.log('3 second passed');
  //       setTimeout(() => {
  //         console.log('4 second passed');
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }, 1000);
  
  // create promise immediately 
    // static method on promise constructor where we pass in values to then handle
  Promise.resolve('abc').then(x => console.log(x));
  Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// CONSUMING PROMISES WITH ASYNC / AWAIT
    // async keyword creates a special function
        // function will run in the background while performing the code that is inside of it and automatically returns a promise when finished
        // we can have more than await statement 
            // await (waits for the result of promise) - stops code execution of function at this point until the promise is fulfilled - code will run in the backgrond, and does not block the main thread of execution (call stack)
            // promise with fetch ()
    // syntactic sugar over the then method in promises, just a different way of consuming them over then()
    // call json() on response and store data into a variable

// Consuming Promises with Async/Await
// Error Handling With try...catch
    // cant use catch with async await with catch
    // we will use try catch to accomplish catching errors in async await functions
    // wrap code in try block, JS will try to execute the code
    // catch block will have access to the error that occurs in the try block, we handle the error here 
    // always handle errors in asynchronous code 

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
//   };
  
//   // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))
  

//   const whereAmI = async function () {
//     try {
//       // Geolocation
//       // await and store into a variable
//       const pos = await getPosition();
//       const { latitude: lat, longitude: lng } = pos.coords;
  
//       // Reverse geocoding
//       const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//       if (!resGeo.ok) throw new Error('Problem getting location data');
  
//       const dataGeo = await resGeo.json();
//       console.log(dataGeo);
  
//       // Country data
//       const res = await fetch(
//         `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//       );
      
//       // BUG in video:
//       // if (!resGeo.ok) throw new Error('Problem getting country');
      
//       // FIX:
//       if (!res.ok) throw new Error('Problem getting country');
  
//       const data = await res.json();
//       console.log(data);
//       renderCountry(data[0]);
//     } catch (err) { // handle errors like we can in the catch() method
//       console.error(`${err} 💥`);
//       renderError(`💥 ${err.message}`);
//     }
//   };
//   whereAmI();
//   whereAmI();
//   whereAmI();
//   console.log('FIRST');
  
//   // try {
//   //   let y = 1;
//   //   const x = 2;
//   //   y = 3;
//   // } catch (err) {
//   //   alert(err.message);
//   // }

// Returning Values from Async Functions
const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  
  const whereAmI = async function () {
    try {
      // Geolocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
  
      // Reverse geocoding
      const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (!resGeo.ok) throw new Error('Problem getting location data');
      const dataGeo = await resGeo.json();
  
      // Country data
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
      );
      if (!resGeo.ok) throw new Error('Problem getting country');
      const data = await res.json();
      renderCountry(data[0]);
  
      return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
      console.error(`${err} 💥`);
      renderError(`💥 ${err.message}`);
  
      // Reject promise returned from async function
      // propegate the error down by re-throwing an error 
      throw err;
    }
  };
  
  console.log('1: Will get location');
  // const city = whereAmI(); // returns a promise and not a value because the function is still running 
  // console.log(city);
  
  // whereAmI()
  //   .then(city => console.log(`2: ${city}`))
  //   .catch(err => console.error(`2: ${err.message} 💥`))
  //   .finally(() => console.log('3: Finished getting location'));
  
  (async function () {
    try {
      const city = await whereAmI();
      console.log(`2: ${city}`);
    } catch (err) {
      console.error(`2: ${err.message} 💥`);
    }
    console.log('3: Finished getting location');
  })();


// Running Promises in Parallel
  // always use async functions with try catch blocks!
const get3Countries = async function (c1, c2, c3) {
    try {
      // these are not dependent on each other so there is no reason to make them wait!
      // const [data1] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c1}`
      // );
      // const [data2] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c2}`
      // );
      // const [data3] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c3}`
      // );
      // console.log([data1.capital, data2.capital, data3.capital]);
  
      // instead of running promises in sequence, lets run them in parallel
      // helper function on promise constructor, takes an array of promises and returns a new promise to run promises in parallel
        // takes an array an receives an array
      // Promise.all() will short circuit when one promise rejects
      const data = await Promise.all([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.error(err);
    }
  };
  get3Countries('portugal', 'canada', 'tanzania');

// Other Promise Combinators: race, allSettled and any
// Promise.race
// receives an array of promises and returns a promise
// settle means value is available whether it is rejected or fulfilled
// rejected promise can win the race
(async function () {
    const res = await Promise.race([
      getJSON(`https://restcountries.eu/rest/v2/name/italy`),
      getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
      getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);
    console.log(res[0]);
  })();
  
  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error('Request took too long!'));
      }, sec * 1000);
    });
  };
  
  Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
    timeout(5),
  ])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));
  
  // Promise.allSettled
    // takes an array of promisese and returns an array of all settled promies whether they are rejected or not 
    // this will never short circuit
  Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ]).then(res => console.log(res));
  
  Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ])
    .then(res => console.log(res))
    .catch(err => console.error(err));
  
  // Promise.any [ES2021]
    // takes an array of promises and return the first fulfilled promise and ignore rejected promises
    // result is always fulfilled unless they all reject
  Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ])
    .then(res => console.log(res))
    .catch(err => console.error(err));
  