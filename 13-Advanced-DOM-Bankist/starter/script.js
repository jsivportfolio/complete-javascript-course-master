'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// attach button event listener for all buttons alike
// Legacy way with For-Loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// Moder way with ForEach loop method
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// EVENT DELEGATION
    // implement smooth scrolling in the navigation to its corresponding section
    
    btnScrollTo.addEventListener('click', function(e){
      e.preventDefault();
      const section1Coordinates = section1.getBoundingClientRect();
      console.log(section1Coordinates);
      console.log(e.target.getBoundingClientRect());
      // get current scroll position
      console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  
      // see viewport (current view of the page)
      console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  
      // scrolling 
        // every element position is relative to the viewport 
        // need to add current scroll position to the top of the page 
        // window.scrollTo(section1Coordinates.left + window.pageXOffset, section1Coordinates.top + window.pageYOffset);
  
      // make the scroll smooth
        // window.scrollTo({
        // left: section1Coordinates.left + window.pageXOffset,
        // top: section1Coordinates.top + window.pageYOffset,
        // behavior: 'smooth'
        // })
  
      // MODERN WAY
      section1.scrollIntoView({
        behavior: 'smooth'
      });
    });
  

    // return node list and use forEach() method 
    // this technique is not good for many elements, and negatively impact performance
    // document.querySelectorAll('.nav__link').forEach(function(element){
    //   element.addEventListener('click', function(e){
    //   e.preventDefault();
      // const hrefID = this.getAttribute('href');
      // console.log(hrefID);
      // document.querySelector(hrefID).scrollIntoView({
      //   behavior: 'smooth'});
    //   });
    // });

    // example with event delegation
      // great when working with elements that are not yet there when the page loads (runtime), like elements that are dynamically loaded
      // 1. Add event listener to common parent element
      // 2. Determine what element originated the event
      document.querySelector('.nav__links').addEventListener('click', function(e){
        e.preventDefault();
        console.log(e.target);
        // matching strategy
        if (e.target.classList.contains('nav__link')) {
          // console.log('LINK');
          const hrefID = e.target.getAttribute('href');
          console.log(hrefID);
          document.querySelector(hrefID).scrollIntoView({
          behavior: 'smooth'});
        }
      });

// BUILDING A TABBED COMPONENT
      // button element is needed to read the data-tab attribute (great for storing info in the DOM)
      // dynamically get the element 
const componentTabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
  const aBtnClicked = e.target.closest('.operations__tab');
  console.log(aBtnClicked);

  // gaurd clause = if statement that returns early if condition not met
  if (!aBtnClicked) {
    return;
  }
  // active tab
  componentTabs.forEach(aTab => aTab.classList.remove('operations__tab--active'));
  tabsContent.forEach(aTabContent => aTabContent.classList.remove('operations__content--active'));
  
  aBtnClicked.classList.add('operations__tab--active');

  // activate content area for each tab component
  document.querySelector(`.operations__content--${aBtnClicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
  // JavaScript expects argument as function
    // bind() method, creates copy of function its called on and sets this keyword into the functioncall
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation: Intersection Observer API
  // ntersection Observer API
    // observes the way target elements intersects other elements or the viewport
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // element is intersected by the target element
  threshold: 0.00000000001, // percentage of intersection that the observer will be called
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// observe each section as multiple targets
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// loop over each node list with forEach
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
  // great for users that do not have the highest end technology 
  // lazy loaded images have the data-src attribute where high resolution images are stored
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // on image event listener is load event
  entry.target.addEventListener('load', function () {
    // on target element, remove class 
    entry.target.classList.remove('lazy-img');
  });
  // end observe after lazy load
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER
// get elements by selecting classes from html
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // declare current slide
  let curSlide = 0;
  // max slide is the length of the node list  
  const maxSlide = slides.length;

  // Functions
  // create one dot for each slide when function is called
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // highlight the active slide
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // loop through each slide and set the style on each of them (make them appear side by side horizontally)
    // 0%, 100%, 200%, 300%
      // set transform property on x axis
        // value = multiply 100% by current index - current slide 
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  // increase slide by one
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // decrease slide by one 
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  // go to other slide by changing the transform percentage value
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // enable slider functionlaity with keyboard events
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });


  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // destructure into slide 
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

// HOW THE DOM REALLY WORKS AND STRUCTURED BEHIND THE SCENES
  // DOM is the interface between the JavaScript and Browser
  // html documents are rendered in and by the browser
  // web pages are built with the dom
  // work with the DOM to create dynamic effects and interact with the browser
  // we can write JavaScript to create, modify, and delete HTML elements; set styles, classes and attributes; and lsiten and respind to events
  // DOM tree is generated from an HTML document, which we can then interact with
  // DOM is a very complex API that contains a lot of methods and properties to interact with the DOM tree
  // some DOM objects are types of html or types of txt
  // All nodes in the DOM tree are typeof Node (represented by an object)
    // gives access to special node methods and properties
      // .textContent
      // .childNodes
      // .parentNode
      // .cloneNode()
    // node type has child types
      // element type
        // one different type of HTML element per HTML element
        // gives each html element access to...
          // .innerHTML
          // .classList
          // .children
          // .parentElement
          // .append()
          // .remove()
          // .insertAdjacentHTML()
          // .querySelector()
          // .closest()
          // .matches()
          // .scrollIntoView()
          // .setAttribute()
      // text type
      // comment type
      // document type
        // is another type of node
          // .querySelector
          // .createElement()
          // .getElementByID()
  // INHERITANCE OF METHODS AND PROPERITES 
    // is why all of this works
    // all child types get access to methods and properties from its parent type
  // DOM API allows all node types to listen to events
    // we call an addEventListener
      // this works because of EventTarget and Window
        // EventTarget
          // .addEventListener()
        // Window
          // .removeEventListener()

// SELECTING, CREATING, AND DELETING ELEMENTS IN JAVASCRIPT

// select entire document by using documentElement
// document is not the real dom element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// select element
// const header = document.querySelector('.header');

// select multiple elements
const uiSectionsAll = document.querySelectorAll('.section');
console.log(uiSectionsAll);

// get element by its id getElementById('')
  // id name without selector
console.log(document.getElementById('section--1'));

// returns an html collection, HTMLCollection
const uiButtonsAll = document.getElementsByTagName('button');
console.log(uiButtonsAll);

// get element by its class getElementsByClassName
document.getElementsByClassName('btn');

// creating and inserting elements
// .insertAdjacentHTML

// creates DOM object that is not yet in the DOM or webpage
const uiMessage = document.createElement('div');
// add css class
uiMessage.classList.add('cookie-message');
// set text content
// uiMessage.textContent = 'We use cookies for improved functionality and analytics.'
// read and set content
uiMessage.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// to move elements
  // add element as first child of element
  // header.prepend(uiMessage); // add to bottom

  // add element as last child of element
  header.append(uiMessage);

// insert multiple copies of the same element
// header.append(uiMessage.cloneNode(true)); // copy all child elements

// creating sibling elements
  // header.before(uiMessage);
  // header.after(uiMessage);

// delete elements 
  // modern way
  document.querySelector('.btn--close-cookie').addEventListener('click', function(e) {
    e.preventDefault();
    uiMessage.remove();
      // legacy way
      // uiMessage.parentElement.removeChild(uiMessage);
  });

// STYLES ATTRIBUTES CLASSES
  // inline styles
  // set style on element 
  uiMessage.style.backgroundColor = '#37383D'
  uiMessage.style.width = '100%';
  // console.log(getComputedStyle(uiMessage)); // gives us access to all real computed styles
  uiMessage.style.height = Number.parseFloat(getComputedStyle(uiMessage).height, 10) + 30 + 'px';

  console.log(getComputedStyle(uiMessage).color);

  // css custom properties (variables)
    // defined in document root (document element)
    // can change values in many places on the webpage and css files by using one :root{}
    
    document.documentElement.style.setProperty('--color-primary', 'turquoise');

  // attributes
  const uiLogo = document.querySelector('.nav__logo');
  console.log(uiLogo.alt);
  console.log(uiLogo.src);
  console.log(uiLogo.className);

  uiLogo.alt = 'Beautiful minimalist logo';
  console.log(uiLogo.alt);

  // non-standard

    console.log(uiLogo.getAttribute('designer'));
    console.log(uiLogo.setAttribute('company', 'Bankist'));

    console.log(uiLogo.src);
    console.log(uiLogo.getAttribute('src')); // returns relative version

    const uiLink = document.querySelector('.twitter-link');
    console.log(uiLink);
    console.log(uiLink.href); // returns url
    console.log(uiLink.getAttribute('href')); // returns url as written in the html

  // data attributes
    // attributes that start with the word data
    console.log(uiLogo.dataset.versionNumber);

  // working with classes
    // uiLogo.classList.add('')
    // uiLogo.classList.remove('');
    // uiLogo.classList.toggle('')
    // uiLogo.classList.contains(''); // not includes() like when working with arrays

  // DO NOT USE THIS BELOW
  // uiLogo.className = '';
  // IT WILL OVERRIDE EVERYTHING 

// IMPLEMENTING SMOOTH SCROLLING
  // LECACY WAY
  // const btnScrollTo = document.querySelector('.btn--scroll-to');
  // const section1 = document.querySelector('#section--1');

  // event listener to button
  // btnScrollTo.addEventListener('click', function(e){
  //   e.preventDefault();
  //   const section1Coordinates = section1.getBoundingClientRect();
  //   console.log(section1Coordinates);
  //   console.log(e.target.getBoundingClientRect());
  //   // get current scroll position
  //   console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //   // see viewport (current view of the page)
  //   console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  //   // scrolling 
  //     // every element position is relative to the viewport 
  //     // need to add current scroll position to the top of the page 
  //     // window.scrollTo(section1Coordinates.left + window.pageXOffset, section1Coordinates.top + window.pageYOffset);

  //   // make the scroll smooth
  //     // window.scrollTo({
  //     // left: section1Coordinates.left + window.pageXOffset,
  //     // top: section1Coordinates.top + window.pageYOffset,
  //     // behavior: 'smooth'
  //     // })

  //   // MODERN WAY
  //   section1.scrollIntoView({
  //     behavior: 'smooth'
  //   });
  // });

// TYPE OF EVENTS AND EVENT HANDLERS
  // EVENT
    // is a single that something has happened on the webpage will generate 
    // we can listen for these events using event listeners to handle the event
    // we can add multiple events
    
    // mouseenter event
    const h1 = document.querySelector('h1');
    const functionAlertH1 = function (e) {
      e.preventDefault();
      alert('addEventListener: mouseenter event'); 
      // remove event listener in the same vent handler function, great for only 1 time events
      h1.removeEventListener('mouseenter', functionAlertH1)
    };
    h1.addEventListener('mouseenter', functionAlertH1);

    // another remove patter with timer 
    // setTimeout(() => h1.removeEventListener('mouseenter', functionAlertH1), 3000);

    

    // legacy way
    // // onmousevent
    // // another way to attach event listener to an element
    // h1.onmouseenter = function(e) {
    //   alert('addEventListener: mouseenter event')
    // };

    // removing event handler incase we do not need it anymore
      // export function into a named function

// EVENT PROPAGATION: BUBBLING AND CAPTURING
    // event is generated at the root of the document (top of the DOM tree)
    // event travels down the tree to the target element 
    // event listeners wait for events on an element, and runs the attached callback function
    // after reaching the target, the bubble phase begins (going back through all the parent elements to the root)
      // 1) capturing phase - does not listen to events
      // 2) target phase
      // 3) bubbling phase - listens for events, useful for event delegation

    // target is where the event happens (where the click occurs)
    // current target is the element that the event handler is attached

    // const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    // const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

    // document.querySelector('.nav__link').addEventListener('click', function (e) {
    //   this.style.backgroundColor = randomColor();
    //   console.log('LINK', e.target, e.currentTarget);
    //   console.log(e.currentTarget === this);

    //   // Stop propagation
    //     // stops parents from getting the event because we stopped the propagation
    //     // e.stopPropagation();
    // });

    // document.querySelector('.nav__links').addEventListener('click', function (e) {
    //   this.style.backgroundColor = randomColor();
    //   console.log('CONTAINER', e.target, e.currentTarget);
    // });

    // document.querySelector('.nav').addEventListener('click', function (e) {
    //   this.style.backgroundColor = randomColor();
    //   console.log('NAV', e.target, e.currentTarget);
    // }, true); // no longer listens for bubling events

// DOM TRAVERSING
    // like walking through the DOM
    // selecting an element based on or relative to another element like child, parent, sibling

    // // Going downwards: child
    // console.log(h1.querySelectorAll('.highlight'));
    // console.log(h1.childNodes);
    // console.log(h1.children);
    // h1.firstElementChild.style.color = 'white';
    // h1.lastElementChild.style.color = 'orangered';

    // // Going upwards: parents
    // console.log(h1.parentNode);
    // console.log(h1.parentElement);

    // h1.closest('.header').style.background = 'var(--gradient-secondary)';

    // h1.closest('h1').style.background = 'var(--gradient-primary)';

    // // Going sideways: siblings
    // console.log(h1.previousElementSibling);
    // console.log(h1.nextElementSibling);

    // console.log(h1.previousSibling);
    // console.log(h1.nextSibling);

    // console.log(h1.parentElement.children);
    // [...h1.parentElement.children].forEach(function (el) {
    //   if (el !== h1) el.style.transform = 'scale(0.5)';
    // });

    // LIFECYLCE DOM Events
      // scripts are generally the last item read in the html
      // DOMContentLoaded
        // fired as soon as the HTML has been downloaded and converted to the DOM tree (parsed)
        // equivalent to legacy document.ready
      document.addEventListener('DOMContentLoaded', function (e) {
        console.log('HTML parsed and DOM tree built!', e);
      });

      // load
        // after the page has completed loading, then this event is fired
      window.addEventListener('load', function (e) {
        console.log('Page fully loaded', e);
      });

      // // beforeunload
      //   // created immediately before a user leaves a page
      // window.addEventListener('beforeunload', function (e) {
      //   e.preventDefault(); // not necessary for chrome
      //   console.log(e);
      //   e.returnValue = '';
      // });
      // only prompt user if they are leaving a page if data is going to be lost like mid-form

// EFFICIENT SCRIPT LOADING: DEFER AND ASYNC 
      // this is html feature, so old browsers do not support them, refer to end of document body to resolve this
      // useally write script tag at end of document head, or document body end 
      // // REGULAR
        // HEAD
          // parsing the html
          // find script tag, fetch it, execute script (parsing is paused in this state)
          // at end of parsing, DOMContentLoaded gets fired
          // THIS IS BAD PRACTICE
        // BODY END
          // html is parsed, 
          // find script tag, fetch it, execute script
      // <script src=""></script>
      // // ASYNC
        // HEAD
          // script is loaded at the same time the html is parsed
          // script is downloaded async and execued immiediately in a sync way
          // html parsing still stops for script execution
          // makes loading time a little shorter
          // scripts are fetched asynchronously and executed immediately
          // usually the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So DOMContentLoaded does not wait for an async script
        // BODY END
          // does not make sense to have h
      // <script async src=""></script>
      // // DEFER
        // HEAD
          // script is async, but execution of script is defered until the end after the html parsing so it is never interrupted
          // scripts are fetched asynchronously and executed after the html is completely parsed
          // DOMContentLoaded event fires after defer script is executed
          // Scripts are executed in order
          // This is overall the best solution. Use for your own scripts, and when order matters (using library scripts from 3rd parties before are own scripts)
        // BODY END
          // does not make sense to have here 
      // <script defer src=""></script>



    


