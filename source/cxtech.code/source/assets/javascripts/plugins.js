// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());


// Собираем все нужные плагины в нужном порядке
// Подробнее https://www.npmjs.com/package/gulp-include

//////////////////////////////////////////////////////////////////////////////
// Important plugins
//////////////////////////////////////////////////////////////////////////////

// Modernizr
// Browser feature detection library for HTML5/CSS3
/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-inlinesvg-placeholder-svg-svgclippaths-touchevents-addtest-domprefixes-hasevent-mq-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles-dontmin-cssclassprefix:modernizr_
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  var classes = [];
  

  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': "modernizr_",
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  
/*!
{
  "name": "SVG",
  "property": "svg",
  "caniuse": "svg",
  "tags": ["svg"],
  "authors": ["Erik Dahlstrom"],
  "polyfills": [
    "svgweb",
    "raphael",
    "amplesdk",
    "canvg",
    "svg-boilerplate",
    "sie",
    "dojogfx",
    "fabricjs"
  ]
}
!*/
/* DOC
Detects support for SVG in `<embed>` or `<object>` elements.
*/

  Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);


  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['','']);

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  ;

/**
  * @optionName html5shiv
  * @optionProp html5shiv
  */

  // Take the html5 variable out of the html5shiv scope so we can return it.
  var html5;
  if (!isSVG) {
    /**
     * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
      /*jshint evil:true */
      /** version */
      var version = '3.7.3';

      /** Preset options */
      var options = window.html5 || {};

      /** Used to skip problem elements */
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

      /** Not all elements can be cloned in IE **/
      var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

      /** Detect whether the browser supports default html5 styles */
      var supportsHtml5Styles;

      /** Name of the expando, to work with multiple documents or to re-shiv one document */
      var expando = '_html5shiv';

      /** The id for the the documents expando */
      var expanID = 0;

      /** Cached data for each document */
      var expandoData = {};

      /** Detect whether the browser supports unknown elements */
      var supportsUnknownElements;

      (function() {
        try {
          var a = document.createElement('a');
          a.innerHTML = '<xyz></xyz>';
          //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
          supportsHtml5Styles = ('hidden' in a);

          supportsUnknownElements = a.childNodes.length == 1 || (function() {
            // assign a false positive if unable to shiv
            (document.createElement)('a');
            var frag = document.createDocumentFragment();
            return (
              typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
            );
          }());
        } catch(e) {
          // assign a false positive if detection fails => unable to shiv
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

      /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
      function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

      /**
       * Extends the built-in list of html5 elements
       * @memberOf html5
       * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
       * @param {Document} ownerDocument The context document.
       */
      function addElements(newElements, ownerDocument) {
        var elements = html5.elements;
        if(typeof elements != 'string'){
          elements = elements.join(' ');
        }
        if(typeof newElements != 'string'){
          newElements = newElements.join(' ');
        }
        html5.elements = elements +' '+ newElements;
        shivDocument(ownerDocument);
      }

      /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
          data = {};
          expanID++;
          ownerDocument[expando] = expanID;
          expandoData[expanID] = data;
        }
        return data;
      }

      /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document|DocumentFragment} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
      function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if(supportsUnknownElements){
          return ownerDocument.createElement(nodeName);
        }
        if (!data) {
          data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
          node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
          node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
          node = data.createElem(nodeName);
        }

        // Avoid adding some elements to fragments in IE < 9 because
        // * Attributes like `name` or `type` cannot be set/changed once an element
        //   is inserted into a document/fragment
        // * Link elements with `src` attributes that are inaccessible, as with
        //   a 403 response, will cause the tab/window to crash
        // * Script elements appended to fragments will execute when their `src`
        //   or `text` property is set
        return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
      }

      /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
      function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if(supportsUnknownElements){
          return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
        for(;i<l;i++){
          clone.createElement(elems[i]);
        }
        return clone;
      }

      /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
      function shivMethods(ownerDocument, data) {
        if (!data.cache) {
          data.cache = {};
          data.createElem = ownerDocument.createElement;
          data.createFrag = ownerDocument.createDocumentFragment;
          data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
          //abort shiv
          if (!html5.shivMethods) {
            return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                        'var n=f.cloneNode(),c=n.createElement;' +
                                                        'h.shivMethods&&(' +
                                                        // unroll the `createElement` calls
                                                        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
          ');return n}'
                                                       )(html5, data.frag);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
      function shivDocument(ownerDocument) {
        if (!ownerDocument) {
          ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
                                        // corrects block display not defined in IE6/7/8/9
                                        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                        // adds styling not present in IE6/7/8/9
                                        'mark{background:#FF0;color:#000}' +
                                        // hides non-rendered elements
                                        'template{display:none}'
                                       );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
      var html5 = {

        /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

        /**
         * current version of html5shiv
         */
        'version': version,

        /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
        'shivCSS': (options.shivCSS !== false),

        /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
        'supportsUnknownElements': supportsUnknownElements,

        /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
        'shivMethods': (options.shivMethods !== false),

        /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
        'type': 'default',

        // shivs the document according to the specified `html5` object options
        'shivDocument': shivDocument,

        //creates a shived element
        createElement: createElement,

        //creates a shived documentFragment
        createDocumentFragment: createDocumentFragment,

        //extends list of elements
        addElements: addElements
      };

      /*--------------------------------------------------------------------------*/

      // expose html5
      window.html5 = html5;

      // shiv the document
      shivDocument(document);

      if(typeof module == 'object' && module.exports){
        module.exports = html5;
      }

    }(typeof window !== "undefined" ? window : this, document));
  }
;

  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;
  

  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  


   // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        /* jshint -W053 */
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      /* jshint -W041 */
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
      /* jshint +W041 */

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  


  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;

  /**
   * Modernizr.hasEvent() detects support for a given event
   *
   * @memberof Modernizr
   * @name Modernizr.hasEvent
   * @optionName Modernizr.hasEvent()
   * @optionProp hasEvent
   * @access public
   * @function hasEvent
   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
   * @returns {boolean}
   * @example
   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
   *  By default, it does this detection on a div element
   *
   * ```js
   *  hasEvent('blur') // true;
   * ```
   *
   * However, you are able to give an object as a second argument to hasEvent to
   * detect an event on something other than a div.
   *
   * ```js
   *  hasEvent('devicelight', window) // true;
   * ```
   *
   */

  var hasEvent = (function() {

    // Detect whether event support can be detected via `in`. Test on a DOM element
    // using the "blur" event b/c it should always exist. bit.ly/event-detection
    var needsFallback = !('onblur' in document.documentElement);

    function inner(eventName, element) {

      var isSupported;
      if (!eventName) { return false; }
      if (!element || typeof element === 'string') {
        element = createElement(element || 'div');
      }

      // Testing via the `in` operator is sufficient for modern browsers and IE.
      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
      // "resize", whereas `in` "catches" those.
      eventName = 'on' + eventName;
      isSupported = eventName in element;

      // Fallback technique for old Firefox - bit.ly/event-detection
      if (!isSupported && needsFallback) {
        if (!element.setAttribute) {
          // Switch to generic element if it lacks `setAttribute`.
          // It could be the `document`, `window`, or something else.
          element = createElement('div');
        }

        element.setAttribute(eventName, '');
        isSupported = typeof element[eventName] === 'function';

        if (element[eventName] !== undefined) {
          // If property was created, "remove it" by setting value to `undefined`.
          element[eventName] = undefined;
        }
        element.removeAttribute(eventName);
      }

      return isSupported;
    }
    return inner;
  })();


  ModernizrProto.hasEvent = hasEvent;
  
/*!
{
  "name": "placeholder attribute",
  "property": "placeholder",
  "tags": ["forms", "attribute"],
  "builderAliases": ["forms_placeholder"]
}
!*/
/* DOC
Tests for placeholder attribute in inputs and textareas
*/

  Modernizr.addTest('placeholder', ('placeholder' in createElement('input') && 'placeholder' in createElement('textarea')));

/*!
{
  "name": "Inline SVG",
  "property": "inlinesvg",
  "caniuse": "svg-html5",
  "tags": ["svg"],
  "notes": [{
    "name": "Test page",
    "href": "https://paulirish.com/demo/inline-svg"
  }, {
    "name": "Test page and results",
    "href": "https://codepen.io/eltonmesquita/full/GgXbvo/"
  }],
  "polyfills": ["inline-svg-polyfill"],
  "knownBugs": ["False negative on some Chromia browsers."]
}
!*/
/* DOC
Detects support for inline SVG in HTML (not within XHTML).
*/

  Modernizr.addTest('inlinesvg', function() {
    var div = createElement('div');
    div.innerHTML = '<svg/>';
    return (typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
  });


  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * Object.prototype.toString can be used with every object and allows you to
   * get its class easily. Abstracting it off of an object prevents situations
   * where the toString property has been overridden
   *
   * @access private
   * @function toStringFn
   * @returns {function} An abstracted toString function
   */

  var toStringFn = ({}).toString;
  
/*!
{
  "name": "SVG clip paths",
  "property": "svgclippaths",
  "tags": ["svg"],
  "notes": [{
    "name": "Demo",
    "href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"
  }]
}
!*/
/* DOC
Detects support for clip paths in SVG (only, not on HTML content).

See [this discussion](https://github.com/Modernizr/Modernizr/issues/213) regarding applying SVG clip paths to HTML content.
*/

  Modernizr.addTest('svgclippaths', function() {
    return !!document.createElementNS &&
      /SVGClipPath/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')));
  });


  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * Modernizr.mq tests a given media query, live against the current state of the window
   * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
   * gist.github.com/786768
   *
   * @memberof Modernizr
   * @name Modernizr.mq
   * @optionName Modernizr.mq()
   * @optionProp mq
   * @access public
   * @function mq
   * @param {string} mq - String of the media query we want to test
   * @returns {boolean}
   * @example
   * Modernizr.mq allows for you to programmatically check if the current browser
   * window state matches a media query.
   *
   * ```js
   *  var query = Modernizr.mq('(min-width: 900px)');
   *
   *  if (query) {
   *    // the browser window is larger than 900px
   *  }
   * ```
   *
   * Only valid media queries are supported, therefore you must always include values
   * with your media query
   *
   * ```js
   * // good
   *  Modernizr.mq('(min-width: 900px)');
   *
   * // bad
   *  Modernizr.mq('min-width');
   * ```
   *
   * If you would just like to test that media queries are supported in general, use
   *
   * ```js
   *  Modernizr.mq('only all'); // true if MQ are supported, false if not
   * ```
   *
   *
   * Note that if the browser does not support media queries (e.g. old IE) mq will
   * always return false.
   */

  var mq = (function() {
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
      return function(mq) {
        var mql = matchMedia(mq);
        return mql && mql.matches || false;
      };
    }

    return function(mq) {
      var bool = false;

      injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function(node) {
        bool = (window.getComputedStyle ?
                window.getComputedStyle(node, null) :
                node.currentStyle).position == 'absolute';
      });

      return bool;
    };
  })();


  ModernizrProto.mq = mq;

  

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  
/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC
Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.
*/

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function() {
    var bool;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      // include the 'heartz' as a way to have a non matching MQ to help terminate the join
      // https://git.io/vznFH
      var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function(node) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });


  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined;
    }

    if (!prop) {
      return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;

  


  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return getComputedStyle(node, null).position == 'absolute';
      });
    }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testProp() investigates whether a given style property is recognized
   * Property names can be provided in either camelCase or kebab-case.
   *
   * @memberof Modernizr
   * @name Modernizr.testProp
   * @access public
   * @optionName Modernizr.testProp()
   * @optionProp testProp
   * @function testProp
   * @param {string} prop - Name of the CSS property to check
   * @param {string} [value] - Name of the CSS value to check
   * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
   * @returns {boolean}
   * @example
   *
   * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
   * version of the string.
   *
   * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
   *
   * ```js
   * Modernizr.testProp('pointerEvents')  // true
   * ```
   *
   * You can also provide a value as an optional second argument to check if a
   * specific value is supported
   *
   * ```js
   * Modernizr.testProp('pointerEvents', 'none') // true
   * Modernizr.testProp('pointerEvents', 'penguin') // false
   * ```
   */

  var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
    return testProps([prop], undefined, value, useValue);
  };
  

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;
  

  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);


// FastclickJS
// Remove delay between a physical tap and the firing of a click event on mobile browsers.
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());



// Placeholders polyfill
/* 
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Defines the global Placeholders object along with various utility methods
(function (global) {

    "use strict";

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn, false);
        }
        if (elem.attachEvent) {
            return elem.attachEvent("on" + event, fn);
        }
    }

    // Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative)
    function inArray(arr, item) {
        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    // Move the caret to the index position specified. Assumes that the element has focus
    function moveCaret(elem, index) {
        var range;
        if (elem.createTextRange) {
            range = elem.createTextRange();
            range.move("character", index);
            range.select();
        } else if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(index, index);
        }
    }

    // Attempt to change the type property of an input element
    function changeType(elem, type) {
        try {
            elem.type = type;
            return true;
        } catch (e) {
            // You can't change input type in IE8 and below
            return false;
        }
    }

    // Expose public methods
    global.Placeholders = {
        Utils: {
            addEventListener: addEventListener,
            inArray: inArray,
            moveCaret: moveCaret,
            changeType: changeType
        }
    };

}(this));

(function (global) {

    "use strict";

    var validTypes = [
            "text",
            "search",
            "url",
            "tel",
            "email",
            "password",
            "number",
            "textarea"
        ],

        // The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
        badKeys = [

            // The following keys all cause the caret to jump to the end of the input value
            27, // Escape
            33, // Page up
            34, // Page down
            35, // End
            36, // Home

            // Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
            37, // Left
            38, // Up
            39, // Right
            40, // Down

            // The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
            8, // Backspace
            46 // Delete
        ],

        // Styling variables
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),

        // These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
        inputs, textareas,

        // The various data-* attributes used by the polyfill
        ATTR_CURRENT_VAL = "data-placeholder-value",
        ATTR_ACTIVE = "data-placeholder-active",
        ATTR_INPUT_TYPE = "data-placeholder-type",
        ATTR_FORM_HANDLED = "data-placeholder-submit",
        ATTR_EVENTS_BOUND = "data-placeholder-bound",
        ATTR_OPTION_FOCUS = "data-placeholder-focus",
        ATTR_OPTION_LIVE = "data-placeholder-live",
        ATTR_MAXLENGTH = "data-placeholder-maxlength",

        // Various other variables used throughout the rest of the script
        test = document.createElement("input"),
        head = document.getElementsByTagName("head")[0],
        root = document.documentElement,
        Placeholders = global.Placeholders,
        Utils = Placeholders.Utils,
        hideOnInput, liveUpdates, keydownVal, styleElem, styleRules, placeholder, timer, form, elem, len, i;

    // No-op (used in place of public methods when native support is detected)
    function noop() {}

    // Avoid IE9 activeElement of death when an iframe is used.
    // More info:
    // http://bugs.jquery.com/ticket/13393
    // https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    // Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place)
    function hidePlaceholder(elem, keydownValue) {
        var type,
            maxLength,
            valueChanged = (!!keydownValue && elem.value !== keydownValue),
            isPlaceholderValue = (elem.value === elem.getAttribute(ATTR_CURRENT_VAL));

        if ((valueChanged || isPlaceholderValue) && elem.getAttribute(ATTR_ACTIVE) === "true") {
            elem.removeAttribute(ATTR_ACTIVE);
            elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), "");
            elem.className = elem.className.replace(classNameRegExp, "");

            // Restore the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (parseInt(maxLength, 10) >= 0) { // Old FF returns -1 if attribute not set (see GH-56)
                elem.setAttribute("maxLength", maxLength);
                elem.removeAttribute(ATTR_MAXLENGTH);
            }

            // If the polyfill has changed the type of the element we need to change it back
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = type;
            }
            return true;
        }
        return false;
    }

    // Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible)
    function showPlaceholder(elem) {
        var type,
            maxLength,
            val = elem.getAttribute(ATTR_CURRENT_VAL);
        if (elem.value === "" && val) {
            elem.setAttribute(ATTR_ACTIVE, "true");
            elem.value = val;
            elem.className += " " + placeholderClassName;

            // Store and remove the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (!maxLength) {
                elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength);
                elem.removeAttribute("maxLength");
            }

            // If the type of element needs to change, change it (e.g. password inputs)
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = "text";
            } else if (elem.type === "password") {
                if (Utils.changeType(elem, "text")) {
                    elem.setAttribute(ATTR_INPUT_TYPE, "password");
                }
            }
            return true;
        }
        return false;
    }

    function handleElem(node, callback) {

        var handleInputsLength, handleTextareasLength, handleInputs, handleTextareas, elem, len, i;

        // Check if the passed in node is an input/textarea (in which case it can't have any affected descendants)
        if (node && node.getAttribute(ATTR_CURRENT_VAL)) {
            callback(node);
        } else {

            // If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
            handleInputs = node ? node.getElementsByTagName("input") : inputs;
            handleTextareas = node ? node.getElementsByTagName("textarea") : textareas;

            handleInputsLength = handleInputs ? handleInputs.length : 0;
            handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

            // Run the callback for each element
            for (i = 0, len = handleInputsLength + handleTextareasLength; i < len; i++) {
                elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength];
                callback(elem);
            }
        }
    }

    // Return all affected elements to their normal state (remove placeholder value if present)
    function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder);
    }

    // Show the placeholder value on all appropriate elements
    function enablePlaceholders(node) {
        handleElem(node, showPlaceholder);
    }

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem) {
        return function () {

            // Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
            if (hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {

                // Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
                Utils.moveCaret(elem, 0);

            } else {

                // Remove the placeholder
                hidePlaceholder(elem);
            }
        };
    }

    // Returns a function that is used as a blur event handler
    function makeBlurHandler(elem) {
        return function () {
            showPlaceholder(elem);
        };
    }

    // Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
    function makeKeydownHandler(elem) {
        return function (e) {
            keydownVal = elem.value;

            //Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
            if (elem.getAttribute(ATTR_ACTIVE) === "true") {
                if (keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && Utils.inArray(badKeys, e.keyCode)) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                }
            }
        };
    }
    function makeKeyupHandler(elem) {
        return function () {
            hidePlaceholder(elem, keydownVal);

            // If the element is now empty we need to show the placeholder
            if (elem.value === "") {
                elem.blur();
                Utils.moveCaret(elem, 0);
            }
        };
    }
    function makeClickHandler(elem) {
        return function () {
            if (elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {
                Utils.moveCaret(elem, 0);
            }
        };
    }

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(form) {
        return function () {

            // Turn off placeholders on all appropriate descendant elements
            disablePlaceholders(form);
        };
    }

    // Bind event handlers to an element that we need to affect with the polyfill
    function newElement(elem) {

        // If the element is part of a form, make sure the placeholder string is not submitted as a value
        if (elem.form) {
            form = elem.form;

            // If the type of the property is a string then we have a "form" attribute and need to get the real form
            if (typeof form === "string") {
                form = document.getElementById(form);
            }

            // Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
            if (!form.getAttribute(ATTR_FORM_HANDLED)) {
                Utils.addEventListener(form, "submit", makeSubmitHandler(form));
                form.setAttribute(ATTR_FORM_HANDLED, "true");
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        Utils.addEventListener(elem, "focus", makeFocusHandler(elem));
        Utils.addEventListener(elem, "blur", makeBlurHandler(elem));

        // If the placeholder should hide on input rather than on focus we need additional event handlers
        if (hideOnInput) {
            Utils.addEventListener(elem, "keydown", makeKeydownHandler(elem));
            Utils.addEventListener(elem, "keyup", makeKeyupHandler(elem));
            Utils.addEventListener(elem, "click", makeClickHandler(elem));
        }

        // Remember that we've bound event handlers to this element
        elem.setAttribute(ATTR_EVENTS_BOUND, "true");
        elem.setAttribute(ATTR_CURRENT_VAL, placeholder);

        // If the element doesn't have a value and is not focussed, set it to the placeholder string
        if (hideOnInput || elem !== safeActiveElement()) {
            showPlaceholder(elem);
        }
    }

    Placeholders.nativeSupport = test.placeholder !== void 0;

    if (!Placeholders.nativeSupport) {

        // Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
        inputs = document.getElementsByTagName("input");
        textareas = document.getElementsByTagName("textarea");

        // Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
        hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS) === "false";
        liveUpdates = root.getAttribute(ATTR_OPTION_LIVE) !== "false";

        // Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
        styleElem = document.createElement("style");
        styleElem.type = "text/css";

        // Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; }");

        // Append style rules to newly created stylesheet
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
        } else {
            styleElem.appendChild(styleRules);
        }

        // Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
        head.insertBefore(styleElem, head.firstChild);

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
            placeholder = elem.attributes.placeholder;
            if (placeholder) {

                // IE returns an empty object instead of undefined if the attribute is not present
                placeholder = placeholder.nodeValue;

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                if (placeholder && Utils.inArray(validTypes, elem.type)) {
                    newElement(elem);
                }
            }
        }

        // If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
        timer = setInterval(function () {
            for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                placeholder = elem.attributes.placeholder;
                if (placeholder) {
                    placeholder = placeholder.nodeValue;
                    if (placeholder && Utils.inArray(validTypes, elem.type)) {

                        // If the element hasn't had event handlers bound to it then add them
                        if (!elem.getAttribute(ATTR_EVENTS_BOUND)) {
                            newElement(elem);
                        }

                        // If the placeholder value has changed or not been initialised yet we need to update the display
                        if (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE))) {

                            // Attempt to change the type of password inputs (fails in IE < 9)
                            if (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE) && Utils.changeType(elem, "text")) {
                                elem.setAttribute(ATTR_INPUT_TYPE, "password");
                            }

                            // If the placeholder value has changed and the placeholder is currently on display we need to change it
                            if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL)) {
                                elem.value = placeholder;
                            }

                            // Keep a reference to the current placeholder value in case it changes via another script
                            elem.setAttribute(ATTR_CURRENT_VAL, placeholder);
                        }
                    }
                } else if (elem.getAttribute(ATTR_ACTIVE)) {
                    hidePlaceholder(elem);
                    elem.removeAttribute(ATTR_CURRENT_VAL);
                }
            }

            // If live updates are not enabled cancel the timer
            if (!liveUpdates) {
                clearInterval(timer);
            }
        }, 100);
    }

    Utils.addEventListener(global, "beforeunload", function () {
        Placeholders.disable();
    });

    // Expose public methods
    Placeholders.disable = Placeholders.nativeSupport ? noop : disablePlaceholders;
    Placeholders.enable = Placeholders.nativeSupport ? noop : enablePlaceholders;

}(this));

(function ($) {

    "use strict";

    var originalValFn = $.fn.val,
        originalPropFn = $.fn.prop;

    if (!Placeholders.nativeSupport) {

        $.fn.val = function (val) {
            var originalValue = originalValFn.apply(this, arguments),
                placeholder = this.eq(0).data("placeholder-value");
            if (val === undefined && this.eq(0).data("placeholder-active") && originalValue === placeholder) {
                return "";
            }
            return originalValue;
        };

        $.fn.prop = function (name, val) {
            if (val === undefined && this.eq(0).data("placeholder-active") && name === "value") {
                return "";
            }
            return originalPropFn.apply(this, arguments);
        };
    }

}(jQuery));



// SVG4Everybody
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof exports ? module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.0 | github.com/jonathantneal/svg4everybody */
    function embed(svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.getAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            svg.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], svg = use.parentNode;
                if (svg && /svg/i.test(svg.nodeName)) {
                    var src = use.getAttribute("xlink:href");
                    if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
                        // remove the <use> element
                        svg.removeChild(use);
                        // parse the src and get the url and id
                        var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                        // if the link is external
                        if (url.length) {
                            // get the cached xhr request
                            var xhr = requests[url];
                            // ensure the xhr request exists
                            xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                            xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                            xhr._embeds.push({
                                svg: svg,
                                id: id
                            }), // prepare the xhr ready state change event
                            loadreadystatechange(xhr);
                        } else {
                            // embed the local id into the svg
                            embed(svg, document.getElementById(id));
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use");
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    return svg4everybody;
});


//////////////////////////////////////////////////////////////////////////////
// Optionals plugins
//////////////////////////////////////////////////////////////////////////////

// Basic table
// Responsive tables
// ---------------------------------------------------------------------------
/*
 * jQuery Basic Table
 * Author: Jerry Low
 */

(function($) {
	$.fn.basictable = function(options) {

		var setup = function(table, data) {
			var headings = [];

			if (data.tableWrap) {
				table.wrap('<div class="' + data.baseClass + '__wrapper"></div>');
			}

			var format = '';

			if (table.find('thead tr th').length) {
				format = 'thead th';
			}
			else if (table.find('tbody tr th').length) {
				format = 'tbody tr th';
			}
			else if (table.find('th').length) {
				format = 'tr:first th';
			}
			else {
				format = 'tr:first td';
			}

			$.each(table.find(format), function() {
				var $heading = $(this);
				var colspan = parseInt($heading.attr('colspan'), 10) || 1;
				var row = $heading.closest('tr').index();

				if (!headings[row]) {
					headings[row] = [];
				}

				for (var i = 0; i < colspan; i++) {
					headings[row].push($heading);
				}
			});

			// Table Body
			$.each(table.find('tbody tr'), function() {
				setupRow($(this), headings, data);
			});

			// Table Footer
			$.each(table.find('tfoot tr'), function() {
				setupRow($(this), headings, data);
			});
		};

		var setupRow = function($row, headings, data) {
			$row.children().each(function() {
				var $cell = $(this);

				if (($cell.html() === '' || $cell.html() === '&nbsp;') && (!data.showEmptyCells)) {
					$cell.addClass(data.baseClass + '__hide');
				}
				else {
					var cellIndex = $cell.index();
					var headingText = '';

					for (var j = 0; j < headings.length; j++) {
						if (j != 0) {
							headingText += ': ';
						}

						var $heading = headings[j][cellIndex];
						headingText += $heading.text();
					}

					$cell.attr('data-th', headingText);

					if (data.contentWrap && !$cell.children().hasClass(data.baseClass + '__content')) {
						$cell.wrapInner('<span class="' + data.baseClass + '__content" />');
					}
				}
			});
		};

		var unwrap = function(table) {
			$.each(table.find('td'), function() {
				var $cell = $(this);
				var content = $cell.children('.' + data.baseClass + '__content').html();
				$cell.html(content);
			});
		};

		var check = function(table, data) {
			// Only change when table is larger than parent if force
			// responsive is turned off.
			if (!data.forceResponsive) {
				if (table.removeClass(data.baseClass + '_responsive').outerWidth() > table.parent().width()) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
			else {
				if ($(window).width() <= data.breakpoint) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
		};

		var start = function(table, data) {
			table.addClass(data.baseClass + '_responsive');

			if (data.tableWrap) {
				table.parent('.' + data.baseClass + 'wrapper').addClass(data.baseClass + '__wrapper_active');
			}
		};

		var end = function(table, data) {
			table.removeClass(data.baseClass + '_responsive');

			if (data.tableWrap) {
				table.parent('.' + data.baseClass + '__wrapper').removeClass(data.baseClass + '__wrapper_active');
			}
		};

		var destroy = function(table, data) {
			table.find('td').removeAttr('data-th');

			if (data.tableWrap) {
				table.unwrap();
			}

			if (data.contentWrap) {
				unwrap(table);
			}

			table.removeData('basictable');
		};

		var resize = function(table) {
			if (table.data('basictable')) {
				check(table, table.data('basictable'));
			}
		};

		// Get table.
		this.each(function() {
			var table = $(this);

			// If table has already executed.
			if (table.length === 0 || table.data('basictable')) {
				if (table.data('basictable')) {
					// Destroy basic table.
					if (options == 'destroy') {
						destroy(table, table.data('basictable'));
					}
					// Start responsive mode.
					else if (options === 'start') {
						start(table, table.data('basictable'));
					}
					else if (options === 'stop') {
						end(table, table.data('basictable'));
					}
					else {
						check(table, table.data('basictable'));
					}
				}
				return false;
			}

			// Extend Settings.
			var settings = $.extend({}, $.fn.basictable.defaults, options);

			var vars = {
				breakpoint: settings.breakpoint,
				contentWrap: settings.contentWrap,
				forceResponsive: settings.forceResponsive,
				noResize: settings.noResize,
				tableWrap: settings.tableWrap,
				showEmptyCells: settings.showEmptyCells,
				baseClass: settings.baseClass
			};

			// Initiate
			table.data('basictable', vars);

			setup(table, table.data('basictable'));

			if (!vars.noResize) {
				check(table, table.data('basictable'));

				$(window).bind('resize.basictable', function() {
					resize(table);
				});
			}
		});
	};

	$.fn.basictable.defaults = {
		breakpoint: 568,
		contentWrap: true,
		forceResponsive: true,
		noResize: false,
		tableWrap: false,
		showEmptyCells: false,
		baseClass: 'bt'
	};
})(jQuery);



// Remodal
// Css modal windows
// ---------------------------------------------------------------------------
/*
 *  Remodal - v1.1.0
 *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */

!(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else if (typeof exports === 'object') {
    factory(root, require('jquery'));
  } else {
    factory(root, root.jQuery || root.Zepto);
  }
})(this, function(global, $) {

  'use strict';

  /**
   * Name of the plugin
   * @private
   * @const
   * @type {String}
   */
  var PLUGIN_NAME = 'remodal';

  /**
   * Namespace for CSS and events
   * @private
   * @const
   * @type {String}
   */
  var NAMESPACE = global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE || PLUGIN_NAME;

  /**
   * Animationstart event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONSTART_EVENTS = $.map(
    ['animationstart', 'webkitAnimationStart', 'MSAnimationStart', 'oAnimationStart'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Animationend event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONEND_EVENTS = $.map(
    ['animationend', 'webkitAnimationEnd', 'MSAnimationEnd', 'oAnimationEnd'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Default settings
   * @private
   * @const
   * @type {Object}
   */
  var DEFAULTS = $.extend({
    hashTracking: true,
    closeOnConfirm: true,
    closeOnCancel: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    modifier: '',
    appendTo: null
  }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);

  /**
   * States of the Remodal
   * @private
   * @const
   * @enum {String}
   */
  var STATES = {
    CLOSING: 'closing',
    CLOSED: 'closed',
    OPENING: 'opening',
    OPENED: 'opened'
  };

  /**
   * Reasons of the state change.
   * @private
   * @const
   * @enum {String}
   */
  var STATE_CHANGE_REASONS = {
    CONFIRMATION: 'confirmation',
    CANCELLATION: 'cancellation'
  };

  /**
   * Is animation supported?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_ANIMATION = (function() {
    var style = document.createElement('div').style;

    return style.animationName !== undefined ||
      style.WebkitAnimationName !== undefined ||
      style.MozAnimationName !== undefined ||
      style.msAnimationName !== undefined ||
      style.OAnimationName !== undefined;
  })();

  /**
   * Is iOS?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);

  /**
   * Current modal
   * @private
   * @type {Remodal}
   */
  var current;

  /**
   * Scrollbar position
   * @private
   * @type {Number}
   */
  var scrollTop;

  /**
   * Returns an animation duration
   * @private
   * @param {jQuery} $elem
   * @returns {Number}
   */
  function getAnimationDuration($elem) {
    if (
      IS_ANIMATION &&
      $elem.css('animation-name') === 'none' &&
      $elem.css('-webkit-animation-name') === 'none' &&
      $elem.css('-moz-animation-name') === 'none' &&
      $elem.css('-o-animation-name') === 'none' &&
      $elem.css('-ms-animation-name') === 'none'
    ) {
      return 0;
    }

    var duration = $elem.css('animation-duration') ||
      $elem.css('-webkit-animation-duration') ||
      $elem.css('-moz-animation-duration') ||
      $elem.css('-o-animation-duration') ||
      $elem.css('-ms-animation-duration') ||
      '0s';

    var delay = $elem.css('animation-delay') ||
      $elem.css('-webkit-animation-delay') ||
      $elem.css('-moz-animation-delay') ||
      $elem.css('-o-animation-delay') ||
      $elem.css('-ms-animation-delay') ||
      '0s';

    var iterationCount = $elem.css('animation-iteration-count') ||
      $elem.css('-webkit-animation-iteration-count') ||
      $elem.css('-moz-animation-iteration-count') ||
      $elem.css('-o-animation-iteration-count') ||
      $elem.css('-ms-animation-iteration-count') ||
      '1';

    var max;
    var len;
    var num;
    var i;

    duration = duration.split(', ');
    delay = delay.split(', ');
    iterationCount = iterationCount.split(', ');

    // The 'duration' size is the same as the 'delay' size
    for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
      num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);

      if (num > max) {
        max = num;
      }
    }

    return max;
  }

  /**
   * Returns a scrollbar width
   * @private
   * @returns {Number}
   */
  function getScrollbarWidth() {
    if ($(document.body).height() <= $(window).height()) {
      return 0;
    }

    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var widthNoScroll;
    var widthWithScroll;

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    widthNoScroll = outer.offsetWidth;

    // Force scrollbars
    outer.style.overflow = 'scroll';

    // Add inner div
    inner.style.width = '100%';
    outer.appendChild(inner);

    widthWithScroll = inner.offsetWidth;

    // Remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  /**
   * Locks the screen
   * @private
   */
  function lockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if (!$html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.addClass(lockedClass);
    }
  }

  /**
   * Unlocks the screen
   * @private
   */
  function unlockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if ($html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.removeClass(lockedClass);
    }
  }

  /**
   * Sets a state for an instance
   * @private
   * @param {Remodal} instance
   * @param {STATES} state
   * @param {Boolean} isSilent If true, Remodal does not trigger events
   * @param {String} Reason of a state change.
   */
  function setState(instance, state, isSilent, reason) {

    var newState = namespacify('is', state);
    var allStates = [namespacify('is', STATES.CLOSING),
                     namespacify('is', STATES.OPENING),
                     namespacify('is', STATES.CLOSED),
                     namespacify('is', STATES.OPENED)].join(' ');

    instance.$bg
      .removeClass(allStates)
      .addClass(newState);

    instance.$overlay
      .removeClass(allStates)
      .addClass(newState);

    instance.$wrapper
      .removeClass(allStates)
      .addClass(newState);

    instance.$modal
      .removeClass(allStates)
      .addClass(newState);

    instance.state = state;
    !isSilent && instance.$modal.trigger({
      type: state,
      reason: reason
    }, [{ reason: reason }]);
  }

  /**
   * Synchronizes with the animation
   * @param {Function} doBeforeAnimation
   * @param {Function} doAfterAnimation
   * @param {Remodal} instance
   */
  function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
    var runningAnimationsCount = 0;

    var handleAnimationStart = function(e) {
      if (e.target !== this) {
        return;
      }

      runningAnimationsCount++;
    };

    var handleAnimationEnd = function(e) {
      if (e.target !== this) {
        return;
      }

      if (--runningAnimationsCount === 0) {

        // Remove event listeners
        $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
          instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
        });

        doAfterAnimation();
      }
    };

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName]
        .on(ANIMATIONSTART_EVENTS, handleAnimationStart)
        .on(ANIMATIONEND_EVENTS, handleAnimationEnd);
    });

    doBeforeAnimation();

    // If the animation is not supported by a browser or its duration is 0
    if (
      getAnimationDuration(instance.$bg) === 0 &&
      getAnimationDuration(instance.$overlay) === 0 &&
      getAnimationDuration(instance.$wrapper) === 0 &&
      getAnimationDuration(instance.$modal) === 0
    ) {

      // Remove event listeners
      $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
        instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
      });

      doAfterAnimation();
    }
  }

  /**
   * Closes immediately
   * @private
   * @param {Remodal} instance
   */
  function halt(instance) {
    if (instance.state === STATES.CLOSED) {
      return;
    }

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
    });

    instance.$bg.removeClass(instance.settings.modifier);
    instance.$overlay.removeClass(instance.settings.modifier).hide();
    instance.$wrapper.hide();
    unlockScreen();
    setState(instance, STATES.CLOSED, true);
  }

  /**
   * Parses a string with options
   * @private
   * @param str
   * @returns {Object}
   */
  function parseOptions(str) {
    var obj = {};
    var arr;
    var len;
    var val;
    var i;

    // Remove spaces before and after delimiters
    str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',');

    // Parse a string
    arr = str.split(',');
    for (i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].split(':');
      val = arr[i][1];

      // Convert a string value if it is like a boolean
      if (typeof val === 'string' || val instanceof String) {
        val = val === 'true' || (val === 'false' ? false : val);
      }

      // Convert a string value if it is like a number
      if (typeof val === 'string' || val instanceof String) {
        val = !isNaN(val) ? +val : val;
      }

      obj[arr[i][0]] = val;
    }

    return obj;
  }

  /**
   * Generates a string separated by dashes and prefixed with NAMESPACE
   * @private
   * @param {...String}
   * @returns {String}
   */
  function namespacify() {
    var result = NAMESPACE;

    for (var i = 0; i < arguments.length; ++i) {
      result += '-' + arguments[i];
    }

    return result;
  }

  /**
   * Handles the hashchange event
   * @private
   * @listens hashchange
   */
  function handleHashChangeEvent() {
    var id = location.hash.replace('#', '');
    var instance;
    var $elem;

    if (!id) {

      // Check if we have currently opened modal and animation was completed
      if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
        current.close();
      }
    } else {

      // Catch syntax error if your hash is bad
      try {
        $elem = $(
          '[data-' + PLUGIN_NAME + '-id="' + id + '"]'
        );
      } catch (err) {}

      if ($elem && $elem.length) {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];

        if (instance && instance.settings.hashTracking) {
          instance.open();
        }
      }

    }
  }

  /**
   * Remodal constructor
   * @constructor
   * @param {jQuery} $modal
   * @param {Object} options
   */
  function Remodal($modal, options) {
    var $body = $(document.body);
    var $appendTo = $body;
    var remodal = this;

    remodal.settings = $.extend({}, DEFAULTS, options);
    remodal.index = $[PLUGIN_NAME].lookup.push(remodal) - 1;
    remodal.state = STATES.CLOSED;

    remodal.$overlay = $('.' + namespacify('overlay'));

    if (remodal.settings.appendTo !== null && remodal.settings.appendTo.length) {
      $appendTo = $(remodal.settings.appendTo);
    }

    if (!remodal.$overlay.length) {
      remodal.$overlay = $('<div>').addClass(namespacify('overlay') + ' ' + namespacify('is', STATES.CLOSED)).hide();
      $appendTo.append(remodal.$overlay);
    }

    remodal.$bg = $('.' + namespacify('bg')).addClass(namespacify('is', STATES.CLOSED));

    remodal.$modal = $modal
      .addClass(
        NAMESPACE + ' ' +
        namespacify('is-initialized') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .attr('tabindex', '-1');

    remodal.$wrapper = $('<div>')
      .addClass(
        namespacify('wrapper') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .hide()
      .append(remodal.$modal);
    $appendTo.append(remodal.$wrapper);

    // Add the event listener for the close button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="close"]', function(e) {
      e.preventDefault();

      remodal.close();
    });

    // Add the event listener for the cancel button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="cancel"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);

      if (remodal.settings.closeOnCancel) {
        remodal.close(STATE_CHANGE_REASONS.CANCELLATION);
      }
    });

    // Add the event listener for the confirm button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="confirm"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);

      if (remodal.settings.closeOnConfirm) {
        remodal.close(STATE_CHANGE_REASONS.CONFIRMATION);
      }
    });

    // Add the event listener for the overlay
    remodal.$wrapper.on('click.' + NAMESPACE, function(e) {
      var $target = $(e.target);

      if (!$target.hasClass(namespacify('wrapper'))) {
        return;
      }

      if (remodal.settings.closeOnOutsideClick) {
        remodal.close();
      }
    });
  }

  /**
   * Opens a modal window
   * @public
   */
  Remodal.prototype.open = function() {
    var remodal = this;
    var id;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    id = remodal.$modal.attr('data-' + PLUGIN_NAME + '-id');

    if (id && remodal.settings.hashTracking) {
      scrollTop = $(window).scrollTop();
      location.hash = id;
    }

    if (current && current !== remodal) {
      halt(current);
    }

    current = remodal;
    lockScreen();
    remodal.$bg.addClass(remodal.settings.modifier);
    remodal.$overlay.addClass(remodal.settings.modifier).show();
    remodal.$wrapper.show().scrollTop(0);
    remodal.$modal.focus();

    syncWithAnimation(
      function() {
        setState(remodal, STATES.OPENING);
      },

      function() {
        setState(remodal, STATES.OPENED);
      },

      remodal);
  };

  /**
   * Closes a modal window
   * @public
   * @param {String} reason
   */
  Remodal.prototype.close = function(reason) {
    var remodal = this;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    if (
      remodal.settings.hashTracking &&
      remodal.$modal.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
    ) {
      location.hash = '';
      $(window).scrollTop(scrollTop);
    }

    syncWithAnimation(
      function() {
        setState(remodal, STATES.CLOSING, false, reason);
      },

      function() {
        remodal.$bg.removeClass(remodal.settings.modifier);
        remodal.$overlay.removeClass(remodal.settings.modifier).hide();
        remodal.$wrapper.hide();
        unlockScreen();

        setState(remodal, STATES.CLOSED, false, reason);
      },

      remodal);
  };

  /**
   * Returns a current state of a modal
   * @public
   * @returns {STATES}
   */
  Remodal.prototype.getState = function() {
    return this.state;
  };

  /**
   * Destroys a modal
   * @public
   */
  Remodal.prototype.destroy = function() {
    var lookup = $[PLUGIN_NAME].lookup;
    var instanceCount;

    halt(this);
    this.$wrapper.remove();

    delete lookup[this.index];
    instanceCount = $.grep(lookup, function(instance) {
      return !!instance;
    }).length;

    if (instanceCount === 0) {
      this.$overlay.remove();
      this.$bg.removeClass(
        namespacify('is', STATES.CLOSING) + ' ' +
        namespacify('is', STATES.OPENING) + ' ' +
        namespacify('is', STATES.CLOSED) + ' ' +
        namespacify('is', STATES.OPENED));
    }
  };

  /**
   * Special plugin object for instances
   * @public
   * @type {Object}
   */
  $[PLUGIN_NAME] = {
    lookup: []
  };

  /**
   * Plugin constructor
   * @constructor
   * @param {Object} options
   * @returns {JQuery}
   */
  $.fn[PLUGIN_NAME] = function(opts) {
    var instance;
    var $elem;

    this.each(function(index, elem) {
      $elem = $(elem);

      if ($elem.data(PLUGIN_NAME) == null) {
        instance = new Remodal($elem, opts);
        $elem.data(PLUGIN_NAME, instance.index);

        if (
          instance.settings.hashTracking &&
          $elem.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
        ) {
          instance.open();
        }
      } else {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
      }
    });

    return instance;
  };

  $(document).ready(function() {

    // data-remodal-target opens a modal window with the special Id
    $(document).on('click', '[data-' + PLUGIN_NAME + '-target]', function(e) {
      e.preventDefault();

      var elem = e.currentTarget;
      var id = elem.getAttribute('data-' + PLUGIN_NAME + '-target');
      var $target = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]');

      $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open();
    });

    // Auto initialization of modal windows
    // They should have the 'remodal' class attribute
    // Also you can write the `data-remodal-options` attribute to pass params into the modal
    $(document).find('.' + NAMESPACE).each(function(i, container) {
      var $container = $(container);
      var options = $container.data(PLUGIN_NAME + '-options');

      if (!options) {
        options = {};
      } else if (typeof options === 'string' || options instanceof String) {
        options = parseOptions(options);
      }

      $container[PLUGIN_NAME](options);
    });

    // Handles the keydown event
    $(document).on('keydown.' + NAMESPACE, function(e) {
      if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
        current.close();
      }
    });

    // Handles the hashchange event
    $(window).on('hashchange.' + NAMESPACE, handleHashChangeEvent);
  });
});



// ion.tabs.js
// ---------------------------------------------------------------------------
// Ion.Tabs
// version 1.0.2 Build: 17
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.tabs/en.html
// GitHub page:     https://github.com/IonDen/ion.tabs
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================

(function ($, document, window, location) {

    if ($.ionTabs) {
        return;
    }



    var settings = {},
        tabs = {},
        url = {},
        urlString,
        i,
        temp,

        $window = $(window);



    // Local Storage
    var storage = (function () {
        try {
            if (window.localStorage && window.localStorage !== null) {
                return {
                    save: function (param, key) {
                        if (typeof key === "object") {
                            key = JSON.stringify(key);
                        }
                        try {
                            localStorage.setItem(param, key);
                        } catch (e) {
                            if (e === "QUOTA_EXCEEDED_ERR") {
                                localStorage.clear();
                                localStorage.setItem(param, key);
                            }
                        }
                    },
                    load: function (param) {
                        try {
                            return JSON.parse(localStorage.getItem(param));
                        } catch (e) {
                            return localStorage.getItem(param);
                        }
                    },
                    del: function (param) {
                        localStorage.removeItem(param);
                    }
                };
            }
        } catch (e) {
            return {
                save: function () {
                    return null;
                },
                load: function () {
                    return null;
                },
                del: function () {
                    return null;
                }
            };
        }
        return null;
    }());




    // Url
    var getUrl = function () {
        if (settings.type === "hash") {
            urlString = location.hash;
        }
        if (settings.type === "storage") {
            urlString = storage.load(location.hostname + "__ionTabsPosition");
        }

        if (urlString) {
            urlString = urlString.split("|");

            if (urlString.length > 1) {
                for (i = 1; i < urlString.length; i += 1) {
                    temp = urlString[i].split(":");
                    url[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
                }
            }

            urlString = "";
        }
    };




    // Tabs engine
    var Tabs = function (container) {
        this.container = container;
    };
    Tabs.prototype = {
        init: function () {
            var $container = this.container,
                $tabs = $container.find("." + settings.baseClass + "__tab"),
                $items = $container.find("." + settings.baseClass + "__item"),
                $preloader = $container.find("." + settings.baseClass + "__preloader"),
                $this,

                name = $container.data("name"),
                id;

            $tabs.each(function () {
                $this = $(this);
                id = "Button__" + name + "__" + $this.data("target");
                $this.prop("id", id);
            });

            $items.each(function () {
                $this = $(this);
                id = "Tab__" + name + "__" + $this.data("name");
                $this.prop("id", id);
            });


            $tabs.on("click.ionTabs", function(e){
                e.preventDefault();
                showPreloader();
                setTab($(this).data("target"));
            });


            var setTab = function (target) {
                target = decodeURIComponent(target);
                id = "#Button__" + name + "__" + target;
                $(id).addClass(settings.baseClass + "__tab_state_active").siblings().removeClass(settings.baseClass + "__tab_state_active");

                id = "#Tab__" + name + "__" + target;
                $(id).addClass(settings.baseClass + "__item_state_active").siblings().removeClass(settings.baseClass + "__item_state_active");

                hidePreloader();
                setUrl(target);


                // trigger event and execute callback
                $window.trigger("ionTabsChange", {
                    group: name,
                    tab: target,
                    tabId: id
                });

                if (typeof settings.onChange === "function") {
                    settings.onChange({
                        group: name,
                        tab: target,
                        tabId: id
                    });
                }
            };

            var setUrl = function (target) {
                var prop;
                url[name] = target;
                urlString = "tabs";

                for (prop in url) {
                    if (url.hasOwnProperty(prop)) {
                        urlString += "|" + encodeURIComponent(prop) + ":" + encodeURIComponent(url[prop]);
                    }
                }

                if (settings.type === "hash") {
                    location.hash = urlString;
                }
                if (settings.type === "storage") {
                    storage.save(location.hostname + "__ionTabsPosition", urlString);
                }
            };

            var showPreloader = function () {
                $preloader[0].style.display = "block";
            };

            var hidePreloader = function () {
                $preloader[0].style.display = "none";
            };


            // Set tabs at start
            if (url[name]) {
                setTab(url[name]);
            } else {
                setTab($tabs.eq(0).data("target"));
            }

            // Public
            this.setTab = function (name) {
                setTab(name);
            };
        }
    };



    // Plugin methods
    $.ionTabs = function (selector, options) {
        if (!selector) {
            return;
        }

        var $this;

        settings = $.extend({
            type: "hash",
            onChange: null,
            baseClass: "tabs"
        }, options);

        getUrl();

        $(selector).each(function () {
            $this = $(this);
            var name = encodeURIComponent($this.data("name"));
            tabs[name] = new Tabs($this);
            tabs[name].init();
        });
    };



    // Plugin Public methods
    $.ionTabs.setTab = function (group, name) {
        tabs[group].setTab(name);
    };

}(jQuery, document, window, location));



// holder.js
// ---------------------------------------------------------------------------
/*!

Holder - client side image placeholders
Version 2.9.2+30qun
© 2016 Ivan Malopinsky - http://imsky.co

Site:     http://holderjs.com
Issues:   https://github.com/imsky/holder/issues
License:  MIT

*/
(function (window) {
  if (!window.document) return;
  var document = window.document;

  //https://github.com/inexorabletash/polyfill/blob/master/web.js
    if (!document.querySelectorAll) {
      document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
          element = document._qsa.shift();
          element.style.removeAttribute('x-qsa');
          elements.push(element);
        }
        document._qsa = null;
        return elements;
      };
    }

    if (!document.querySelector) {
      document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
      };
    }

    if (!document.getElementsByClassName) {
      document.getElementsByClassName = function (classNames) {
        classNames = String(classNames).replace(/^|\s+/g, '.');
        return document.querySelectorAll(classNames);
      };
    }

  //https://github.com/inexorabletash/polyfill
  // ES5 15.2.3.14 Object.keys ( O )
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = function (o) {
      if (o !== Object(o)) { throw TypeError('Object.keys called on non-object'); }
      var ret = [], p;
      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o, p)) {
          ret.push(p);
        }
      }
      return ret;
    };
  }

  // ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
  // From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /*, thisp */) {
      if (this === void 0 || this === null) { throw TypeError(); }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") { throw TypeError(); }

      var thisp = arguments[1], i;
      for (i = 0; i < len; i++) {
        if (i in t) {
          fun.call(thisp, t[i], i, t);
        }
      }
    };
  }

  //https://github.com/inexorabletash/polyfill/blob/master/web.js
  (function (global) {
    var B64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    global.atob = global.atob || function (input) {
      input = String(input);
      var position = 0,
          output = [],
          buffer = 0, bits = 0, n;

      input = input.replace(/\s/g, '');
      if ((input.length % 4) === 0) { input = input.replace(/=+$/, ''); }
      if ((input.length % 4) === 1) { throw Error('InvalidCharacterError'); }
      if (/[^+/0-9A-Za-z]/.test(input)) { throw Error('InvalidCharacterError'); }

      while (position < input.length) {
        n = B64_ALPHABET.indexOf(input.charAt(position));
        buffer = (buffer << 6) | n;
        bits += 6;

        if (bits === 24) {
          output.push(String.fromCharCode((buffer >> 16) & 0xFF));
          output.push(String.fromCharCode((buffer >>  8) & 0xFF));
          output.push(String.fromCharCode(buffer & 0xFF));
          bits = 0;
          buffer = 0;
        }
        position += 1;
      }

      if (bits === 12) {
        buffer = buffer >> 4;
        output.push(String.fromCharCode(buffer & 0xFF));
      } else if (bits === 18) {
        buffer = buffer >> 2;
        output.push(String.fromCharCode((buffer >> 8) & 0xFF));
        output.push(String.fromCharCode(buffer & 0xFF));
      }

      return output.join('');
    };

    global.btoa = global.btoa || function (input) {
      input = String(input);
      var position = 0,
          out = [],
          o1, o2, o3,
          e1, e2, e3, e4;

      if (/[^\x00-\xFF]/.test(input)) { throw Error('InvalidCharacterError'); }

      while (position < input.length) {
        o1 = input.charCodeAt(position++);
        o2 = input.charCodeAt(position++);
        o3 = input.charCodeAt(position++);

        // 111111 112222 222233 333333
        e1 = o1 >> 2;
        e2 = ((o1 & 0x3) << 4) | (o2 >> 4);
        e3 = ((o2 & 0xf) << 2) | (o3 >> 6);
        e4 = o3 & 0x3f;

        if (position === input.length + 2) {
          e3 = 64; e4 = 64;
        }
        else if (position === input.length + 1) {
          e4 = 64;
        }

        out.push(B64_ALPHABET.charAt(e1),
                 B64_ALPHABET.charAt(e2),
                 B64_ALPHABET.charAt(e3),
                 B64_ALPHABET.charAt(e4));
      }

      return out.join('');
    };
  }(window));

  //https://gist.github.com/jimeh/332357
  if (!Object.prototype.hasOwnProperty){
      /*jshint -W001, -W103 */
      Object.prototype.hasOwnProperty = function(prop) {
      var proto = this.__proto__ || this.constructor.prototype;
      return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
    };
      /*jshint +W001, +W103 */
  }

  // @license http://opensource.org/licenses/MIT
  // copyright Paul Irish 2015


  // Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
  //   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
  // as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

  // if you want values similar to what you'd get with real perf.now, place this towards the head of the page
  // but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed


  (function(){

    if ('performance' in window === false) {
        window.performance = {};
    }
    
    Date.now = (Date.now || function () {  // thanks IE8
      return new Date().getTime();
    });

    if ('now' in window.performance === false){
      
      var nowOffset = Date.now();
      
      if (performance.timing && performance.timing.navigationStart){
        nowOffset = performance.timing.navigationStart;
      }

      window.performance.now = function now(){
        return Date.now() - nowOffset;
      };
    }

  })();

  //requestAnimationFrame polyfill for older Firefox/Chrome versions
  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame && window.webkitCancelAnimationFrame) {
    //https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/requestAnimationFrame/polyfill-webkit.js
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return webkitRequestAnimationFrame(function () {
          callback(global.performance.now());
        });
      };

      global.cancelAnimationFrame = global.webkitCancelAnimationFrame;
    }(window));
    } else if (window.mozRequestAnimationFrame && window.mozCancelAnimationFrame) {
      //https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/requestAnimationFrame/polyfill-moz.js
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return mozRequestAnimationFrame(function () {
          callback(global.performance.now());
        });
      };

      global.cancelAnimationFrame = global.mozCancelAnimationFrame;
    }(window));
    } else {
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return global.setTimeout(callback, 1000 / 60);
      };

      global.cancelAnimationFrame = global.clearTimeout;
    })(window);
    }
  }
})(this);

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Holder"] = factory();
	else
		root["Holder"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Holder.js - client side image placeholders
	(c) 2012-2015 Ivan Malopinsky - http://imsky.co
	*/

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	Holder.js - client side image placeholders
	(c) 2012-2015 Ivan Malopinsky - http://imsky.co
	*/

	//Libraries and functions
	var onDomReady = __webpack_require__(2);
	var querystring = __webpack_require__(3);

	var SceneGraph = __webpack_require__(10);
	var utils = __webpack_require__(11);
	var SVG = __webpack_require__(12);
	var DOM = __webpack_require__(13);
	var Color = __webpack_require__(14);
	var constants = __webpack_require__(15);

	var svgRenderer = __webpack_require__(16);
	var sgCanvasRenderer = __webpack_require__(19);

	var extend = utils.extend;
	var dimensionCheck = utils.dimensionCheck;

	//Constants and definitions
	var SVG_NS = constants.svg_ns;

	var Holder = {
	    version: constants.version,

	    /**
	     * Adds a theme to default settings
	     *
	     * @param {string} name Theme name
	     * @param {Object} theme Theme object, with foreground, background, size, font, and fontweight properties.
	     */
	    addTheme: function(name, theme) {
	        name != null && theme != null && (App.settings.themes[name] = theme);
	        delete App.vars.cache.themeKeys;
	        return this;
	    },

	    /**
	     * Appends a placeholder to an element
	     *
	     * @param {string} src Placeholder URL string
	     * @param el A selector or a reference to a DOM node
	     */
	    addImage: function(src, el) {
	        //todo: use jquery fallback if available for all QSA references
	        var nodes = DOM.getNodeArray(el);
	        nodes.forEach(function (node) {
	            var img = DOM.newEl('img');
	            var domProps = {};
	            domProps[App.setup.dataAttr] = src;
	            DOM.setAttr(img, domProps);
	            node.appendChild(img);
	        });
	        return this;
	    },

	    /**
	     * Sets whether or not an image is updated on resize.
	     * If an image is set to be updated, it is immediately rendered.
	     *
	     * @param {Object} el Image DOM element
	     * @param {Boolean} value Resizable update flag value
	     */
	    setResizeUpdate: function(el, value) {
	        if (el.holderData) {
	            el.holderData.resizeUpdate = !!value;
	            if (el.holderData.resizeUpdate) {
	                updateResizableElements(el);
	            }
	        }
	    },

	    /**
	     * Runs Holder with options. By default runs Holder on all images with "holder.js" in their source attributes.
	     *
	     * @param {Object} userOptions Options object, can contain domain, themes, images, and bgnodes properties
	     */
	    run: function(userOptions) {
	        //todo: split processing into separate queues
	        userOptions = userOptions || {};
	        var engineSettings = {};
	        var options = extend(App.settings, userOptions);

	        App.vars.preempted = true;
	        App.vars.dataAttr = options.dataAttr || App.setup.dataAttr;

	        engineSettings.renderer = options.renderer ? options.renderer : App.setup.renderer;
	        if (App.setup.renderers.join(',').indexOf(engineSettings.renderer) === -1) {
	            engineSettings.renderer = App.setup.supportsSVG ? 'svg' : (App.setup.supportsCanvas ? 'canvas' : 'html');
	        }

	        var images = DOM.getNodeArray(options.images);
	        var bgnodes = DOM.getNodeArray(options.bgnodes);
	        var stylenodes = DOM.getNodeArray(options.stylenodes);
	        var objects = DOM.getNodeArray(options.objects);

	        engineSettings.stylesheets = [];
	        engineSettings.svgXMLStylesheet = true;
	        engineSettings.noFontFallback = options.noFontFallback ? options.noFontFallback : false;

	        stylenodes.forEach(function (styleNode) {
	            if (styleNode.attributes.rel && styleNode.attributes.href && styleNode.attributes.rel.value == 'stylesheet') {
	                var href = styleNode.attributes.href.value;
	                //todo: write isomorphic relative-to-absolute URL function
	                var proxyLink = DOM.newEl('a');
	                proxyLink.href = href;
	                var stylesheetURL = proxyLink.protocol + '//' + proxyLink.host + proxyLink.pathname + proxyLink.search;
	                engineSettings.stylesheets.push(stylesheetURL);
	            }
	        });

	        bgnodes.forEach(function (bgNode) {
	            //Skip processing background nodes if getComputedStyle is unavailable, since only modern browsers would be able to use canvas or SVG to render to background
	            if (!global.getComputedStyle) return;
	            var backgroundImage = global.getComputedStyle(bgNode, null).getPropertyValue('background-image');
	            var dataBackgroundImage = bgNode.getAttribute('data-background-src');
	            var rawURL = dataBackgroundImage || backgroundImage;

	            var holderURL = null;
	            var holderString = options.domain + '/';
	            var holderStringIndex = rawURL.indexOf(holderString);

	            if (holderStringIndex === 0) {
	                holderURL = rawURL;
	            } else if (holderStringIndex === 1 && rawURL[0] === '?') {
	                holderURL = rawURL.slice(1);
	            } else {
	                var fragment = rawURL.substr(holderStringIndex).match(/([^\"]*)"?\)/);
	                if (fragment !== null) {
	                    holderURL = fragment[1];
	                } else if (rawURL.indexOf('url(') === 0) {
	                    throw 'Holder: unable to parse background URL: ' + rawURL;
	                }
	            }

	            if (holderURL != null) {
	                var holderFlags = parseURL(holderURL, options);
	                if (holderFlags) {
	                    prepareDOMElement({
	                        mode: 'background',
	                        el: bgNode,
	                        flags: holderFlags,
	                        engineSettings: engineSettings
	                    });
	                }
	            }
	        });

	        objects.forEach(function (object) {
	            var objectAttr = {};

	            try {
	                objectAttr.data = object.getAttribute('data');
	                objectAttr.dataSrc = object.getAttribute(App.vars.dataAttr);
	            } catch (e) {}

	            var objectHasSrcURL = objectAttr.data != null && objectAttr.data.indexOf(options.domain) === 0;
	            var objectHasDataSrcURL = objectAttr.dataSrc != null && objectAttr.dataSrc.indexOf(options.domain) === 0;

	            if (objectHasSrcURL) {
	                prepareImageElement(options, engineSettings, objectAttr.data, object);
	            } else if (objectHasDataSrcURL) {
	                prepareImageElement(options, engineSettings, objectAttr.dataSrc, object);
	            }
	        });

	        images.forEach(function (image) {
	            var imageAttr = {};

	            try {
	                imageAttr.src = image.getAttribute('src');
	                imageAttr.dataSrc = image.getAttribute(App.vars.dataAttr);
	                imageAttr.rendered = image.getAttribute('data-holder-rendered');
	            } catch (e) {}

	            var imageHasSrc = imageAttr.src != null;
	            var imageHasDataSrcURL = imageAttr.dataSrc != null && imageAttr.dataSrc.indexOf(options.domain) === 0;
	            var imageRendered = imageAttr.rendered != null && imageAttr.rendered == 'true';

	            if (imageHasSrc) {
	                if (imageAttr.src.indexOf(options.domain) === 0) {
	                    prepareImageElement(options, engineSettings, imageAttr.src, image);
	                } else if (imageHasDataSrcURL) {
	                    //Image has a valid data-src and an invalid src
	                    if (imageRendered) {
	                        //If the placeholder has already been render, re-render it
	                        prepareImageElement(options, engineSettings, imageAttr.dataSrc, image);
	                    } else {
	                        //If the placeholder has not been rendered, check if the image exists and render a fallback if it doesn't
	                        (function(src, options, engineSettings, dataSrc, image) {
	                            utils.imageExists(src, function(exists) {
	                                if (!exists) {
	                                    prepareImageElement(options, engineSettings, dataSrc, image);
	                                }
	                            });
	                        })(imageAttr.src, options, engineSettings, imageAttr.dataSrc, image);
	                    }
	                }
	            } else if (imageHasDataSrcURL) {
	                prepareImageElement(options, engineSettings, imageAttr.dataSrc, image);
	            }
	        });

	        return this;
	    }
	};

	var App = {
	    settings: {
	        domain: 'holder.js',
	        images: 'img',
	        objects: 'object',
	        bgnodes: 'body .holderjs',
	        stylenodes: 'head link.holderjs',
	        themes: {
	            'gray': {
	                bg: '#EEEEEE',
	                fg: '#AAAAAA'
	            },
	            'social': {
	                bg: '#3a5a97',
	                fg: '#FFFFFF'
	            },
	            'industrial': {
	                bg: '#434A52',
	                fg: '#C2F200'
	            },
	            'sky': {
	                bg: '#0D8FDB',
	                fg: '#FFFFFF'
	            },
	            'vine': {
	                bg: '#39DBAC',
	                fg: '#1E292C'
	            },
	            'lava': {
	                bg: '#F8591A',
	                fg: '#1C2846'
	            }
	        }
	    },
	    defaults: {
	        size: 10,
	        units: 'pt',
	        scale: 1 / 16
	    }
	};

	/**
	 * Processes provided source attribute and sets up the appropriate rendering workflow
	 *
	 * @private
	 * @param options Instance options from Holder.run
	 * @param renderSettings Instance configuration
	 * @param src Image URL
	 * @param el Image DOM element
	 */
	function prepareImageElement(options, engineSettings, src, el) {
	    var holderFlags = parseURL(src.substr(src.lastIndexOf(options.domain)), options);
	    if (holderFlags) {
	        prepareDOMElement({
	            mode: null,
	            el: el,
	            flags: holderFlags,
	            engineSettings: engineSettings
	        });
	    }
	}

	/**
	 * Processes a Holder URL and extracts configuration from query string
	 *
	 * @private
	 * @param url URL
	 * @param instanceOptions Instance options from Holder.run
	 */
	function parseURL(url, instanceOptions) {
	    var holder = {
	        theme: extend(App.settings.themes.gray, null),
	        stylesheets: instanceOptions.stylesheets,
	        instanceOptions: instanceOptions
	    };

	    var firstQuestionMark = url.indexOf('?');
	    var parts = [url];

	    if (firstQuestionMark !== -1) {
	        parts = [url.slice(0, firstQuestionMark), url.slice(firstQuestionMark + 1)];
	    }

	    var basics = parts[0].split('/');

	    holder.holderURL = url;

	    var dimensions = basics[1];
	    var dimensionData = dimensions.match(/([\d]+p?)x([\d]+p?)/);

	    if (!dimensionData) return false;

	    holder.fluid = dimensions.indexOf('p') !== -1;

	    holder.dimensions = {
	        width: dimensionData[1].replace('p', '%'),
	        height: dimensionData[2].replace('p', '%')
	    };

	    if (parts.length === 2) {
	        var options = querystring.parse(parts[1]);

	        // Colors

	        if (options.bg) {
	            holder.theme.bg = utils.parseColor(options.bg);
	        }

	        if (options.fg) {
	            holder.theme.fg = utils.parseColor(options.fg);
	        }

	        //todo: add automatic foreground to themes without foreground
	        if (options.bg && !options.fg) {
	            holder.autoFg = true;
	        }

	        if (options.theme && holder.instanceOptions.themes.hasOwnProperty(options.theme)) {
	            holder.theme = extend(holder.instanceOptions.themes[options.theme], null);
	        }

	        // Text

	        if (options.text) {
	            holder.text = options.text;
	        }

	        if (options.textmode) {
	            holder.textmode = options.textmode;
	        }

	        if (options.size) {
	            holder.size = options.size;
	        }

	        if (options.font) {
	            holder.font = options.font;
	        }

	        if (options.align) {
	            holder.align = options.align;
	        }

	        if (options.lineWrap) {
	            holder.lineWrap = options.lineWrap;
	        }

	        holder.nowrap = utils.truthy(options.nowrap);

	        // Miscellaneous

	        holder.auto = utils.truthy(options.auto);

	        holder.outline = utils.truthy(options.outline);

	        if (utils.truthy(options.random)) {
	            App.vars.cache.themeKeys = App.vars.cache.themeKeys || Object.keys(holder.instanceOptions.themes);
	            var _theme = App.vars.cache.themeKeys[0 | Math.random() * App.vars.cache.themeKeys.length];
	            holder.theme = extend(holder.instanceOptions.themes[_theme], null);
	        }
	    }

	    return holder;
	}

	/**
	 * Modifies the DOM to fit placeholders and sets up resizable image callbacks (for fluid and automatically sized placeholders)
	 *
	 * @private
	 * @param settings DOM prep settings
	 */
	function prepareDOMElement(prepSettings) {
	    var mode = prepSettings.mode;
	    var el = prepSettings.el;
	    var flags = prepSettings.flags;
	    var _engineSettings = prepSettings.engineSettings;
	    var dimensions = flags.dimensions,
	        theme = flags.theme;
	    var dimensionsCaption = dimensions.width + 'x' + dimensions.height;
	    mode = mode == null ? (flags.fluid ? 'fluid' : 'image') : mode;
	    var holderTemplateRe = /holder_([a-z]+)/g;
	    var dimensionsInText = false;

	    if (flags.text != null) {
	        theme.text = flags.text;

	        //<object> SVG embedding doesn't parse Unicode properly
	        if (el.nodeName.toLowerCase() === 'object') {
	            var textLines = theme.text.split('\\n');
	            for (var k = 0; k < textLines.length; k++) {
	                textLines[k] = utils.encodeHtmlEntity(textLines[k]);
	            }
	            theme.text = textLines.join('\\n');
	        }
	    }

	    if (theme.text) {
	        var holderTemplateMatches = theme.text.match(holderTemplateRe);

	        if (holderTemplateMatches !== null) {
	            //todo: optimize template replacement
	            holderTemplateMatches.forEach(function (match) {
	                if (match === 'holder_dimensions') {
	                    theme.text = theme.text.replace(match, dimensionsCaption);
	                }
	            });
	        }
	    }

	    var holderURL = flags.holderURL;
	    var engineSettings = extend(_engineSettings, null);

	    if (flags.font) {
	        /*
	        If external fonts are used in a <img> placeholder rendered with SVG, Holder falls back to canvas.

	        This is done because Firefox and Chrome disallow embedded SVGs from referencing external assets.
	        The workaround is either to change the placeholder tag from <img> to <object> or to use the canvas renderer.
	        */
	        theme.font = flags.font;
	        if (!engineSettings.noFontFallback && el.nodeName.toLowerCase() === 'img' && App.setup.supportsCanvas && engineSettings.renderer === 'svg') {
	            engineSettings = extend(engineSettings, {
	                renderer: 'canvas'
	            });
	        }
	    }

	    //Chrome and Opera require a quick 10ms re-render if web fonts are used with canvas
	    if (flags.font && engineSettings.renderer == 'canvas') {
	        engineSettings.reRender = true;
	    }

	    if (mode == 'background') {
	        if (el.getAttribute('data-background-src') == null) {
	            DOM.setAttr(el, {
	                'data-background-src': holderURL
	            });
	        }
	    } else {
	        var domProps = {};
	        domProps[App.vars.dataAttr] = holderURL;
	        DOM.setAttr(el, domProps);
	    }

	    flags.theme = theme;

	    //todo consider using all renderSettings in holderData
	    el.holderData = {
	        flags: flags,
	        engineSettings: engineSettings
	    };

	    if (mode == 'image' || mode == 'fluid') {
	        DOM.setAttr(el, {
	            'alt': theme.text ? (dimensionsInText ? theme.text : theme.text + ' [' + dimensionsCaption + ']') : dimensionsCaption
	        });
	    }

	    var renderSettings = {
	        mode: mode,
	        el: el,
	        holderSettings: {
	            dimensions: dimensions,
	            theme: theme,
	            flags: flags
	        },
	        engineSettings: engineSettings
	    };

	    if (mode == 'image') {
	        if (!flags.auto) {
	            el.style.width = dimensions.width + 'px';
	            el.style.height = dimensions.height + 'px';
	        }

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            render(renderSettings);

	            if (flags.textmode == 'exact') {
	                el.holderData.resizeUpdate = true;
	                App.vars.resizableImages.push(el);
	                updateResizableElements(el);
	            }
	        }
	    } else if (mode == 'background' && engineSettings.renderer != 'html') {
	        render(renderSettings);
	    } else if (mode == 'fluid') {
	        el.holderData.resizeUpdate = true;

	        if (dimensions.height.slice(-1) == '%') {
	            el.style.height = dimensions.height;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.height = dimensions.height + 'px';
	        }
	        if (dimensions.width.slice(-1) == '%') {
	            el.style.width = dimensions.width;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.width = dimensions.width + 'px';
	        }
	        if (el.style.display == 'inline' || el.style.display === '' || el.style.display == 'none') {
	            el.style.display = 'block';
	        }

	        setInitialDimensions(el);

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            App.vars.resizableImages.push(el);
	            updateResizableElements(el);
	        }
	    }
	}

	/**
	 * Core function that takes output from renderers and sets it as the source or background-image of the target element
	 *
	 * @private
	 * @param renderSettings Renderer settings
	 */
	function render(renderSettings) {
	    var image = null;
	    var mode = renderSettings.mode;
	    var el = renderSettings.el;
	    var holderSettings = renderSettings.holderSettings;
	    var engineSettings = renderSettings.engineSettings;

	    switch (engineSettings.renderer) {
	        case 'svg':
	            if (!App.setup.supportsSVG) return;
	            break;
	        case 'canvas':
	            if (!App.setup.supportsCanvas) return;
	            break;
	        default:
	            return;
	    }

	    //todo: move generation of scene up to flag generation to reduce extra object creation
	    var scene = {
	        width: holderSettings.dimensions.width,
	        height: holderSettings.dimensions.height,
	        theme: holderSettings.theme,
	        flags: holderSettings.flags
	    };

	    var sceneGraph = buildSceneGraph(scene);

	    function getRenderedImage() {
	        var image = null;
	        switch (engineSettings.renderer) {
	            case 'canvas':
	                image = sgCanvasRenderer(sceneGraph, renderSettings);
	                break;
	            case 'svg':
	                image = svgRenderer(sceneGraph, renderSettings);
	                break;
	            default:
	                throw 'Holder: invalid renderer: ' + engineSettings.renderer;
	        }

	        return image;
	    }

	    image = getRenderedImage();

	    if (image == null) {
	        throw 'Holder: couldn\'t render placeholder';
	    }

	    //todo: add <object> canvas rendering
	    if (mode == 'background') {
	        el.style.backgroundImage = 'url(' + image + ')';
	        el.style.backgroundSize = scene.width + 'px ' + scene.height + 'px';
	    } else {
	        if (el.nodeName.toLowerCase() === 'img') {
	            DOM.setAttr(el, {
	                'src': image
	            });
	        } else if (el.nodeName.toLowerCase() === 'object') {
	            DOM.setAttr(el, {
	                'data': image,
	                'type': 'image/svg+xml'
	            });
	        }
	        if (engineSettings.reRender) {
	            global.setTimeout(function () {
	                var image = getRenderedImage();
	                if (image == null) {
	                    throw 'Holder: couldn\'t render placeholder';
	                }
	                //todo: refactor this code into a function
	                if (el.nodeName.toLowerCase() === 'img') {
	                    DOM.setAttr(el, {
	                        'src': image
	                    });
	                } else if (el.nodeName.toLowerCase() === 'object') {
	                    DOM.setAttr(el, {
	                        'data': image,
	                        'type': 'image/svg+xml'
	                    });
	                }
	            }, 150);
	        }
	    }
	    //todo: account for re-rendering
	    DOM.setAttr(el, {
	        'data-holder-rendered': true
	    });
	}

	/**
	 * Core function that takes a Holder scene description and builds a scene graph
	 *
	 * @private
	 * @param scene Holder scene object
	 */
	//todo: make this function reusable
	//todo: merge app defaults and setup properties into the scene argument
	function buildSceneGraph(scene) {
	    var fontSize = App.defaults.size;
	    if (parseFloat(scene.theme.size)) {
	        fontSize = scene.theme.size;
	    } else if (parseFloat(scene.flags.size)) {
	        fontSize = scene.flags.size;
	    }

	    scene.font = {
	        family: scene.theme.font ? scene.theme.font : 'Arial, Helvetica, Open Sans, sans-serif',
	        size: textSize(scene.width, scene.height, fontSize, App.defaults.scale),
	        units: scene.theme.units ? scene.theme.units : App.defaults.units,
	        weight: scene.theme.fontweight ? scene.theme.fontweight : 'bold'
	    };

	    scene.text = scene.theme.text || Math.floor(scene.width) + 'x' + Math.floor(scene.height);

	    scene.noWrap = scene.theme.nowrap || scene.flags.nowrap;

	    scene.align = scene.theme.align || scene.flags.align || 'center';

	    switch (scene.flags.textmode) {
	        case 'literal':
	            scene.text = scene.flags.dimensions.width + 'x' + scene.flags.dimensions.height;
	            break;
	        case 'exact':
	            if (!scene.flags.exactDimensions) break;
	            scene.text = Math.floor(scene.flags.exactDimensions.width) + 'x' + Math.floor(scene.flags.exactDimensions.height);
	            break;
	    }

	    var lineWrap = scene.flags.lineWrap || App.setup.lineWrapRatio;
	    var sceneMargin = scene.width * lineWrap;
	    var maxLineWidth = sceneMargin;

	    var sceneGraph = new SceneGraph({
	        width: scene.width,
	        height: scene.height
	    });

	    var Shape = sceneGraph.Shape;

	    var holderBg = new Shape.Rect('holderBg', {
	        fill: scene.theme.bg
	    });

	    holderBg.resize(scene.width, scene.height);
	    sceneGraph.root.add(holderBg);

	    if (scene.flags.outline) {
	        var outlineColor = new Color(holderBg.properties.fill);
	        outlineColor = outlineColor.lighten(outlineColor.lighterThan('7f7f7f') ? -0.1 : 0.1);
	        holderBg.properties.outline = {
	            fill: outlineColor.toHex(true),
	            width: 2
	        };
	    }

	    var holderTextColor = scene.theme.fg;

	    if (scene.flags.autoFg) {
	        var holderBgColor = new Color(holderBg.properties.fill);
	        var lightColor = new Color('fff');
	        var darkColor = new Color('000', {
	            'alpha': 0.285714
	        });

	        holderTextColor = holderBgColor.blendAlpha(holderBgColor.lighterThan('7f7f7f') ? darkColor : lightColor).toHex(true);
	    }

	    var holderTextGroup = new Shape.Group('holderTextGroup', {
	        text: scene.text,
	        align: scene.align,
	        font: scene.font,
	        fill: holderTextColor
	    });

	    holderTextGroup.moveTo(null, null, 1);
	    sceneGraph.root.add(holderTextGroup);

	    var tpdata = holderTextGroup.textPositionData = stagingRenderer(sceneGraph);
	    if (!tpdata) {
	        throw 'Holder: staging fallback not supported yet.';
	    }
	    holderTextGroup.properties.leading = tpdata.boundingBox.height;

	    var textNode = null;
	    var line = null;

	    function finalizeLine(parent, line, width, height) {
	        line.width = width;
	        line.height = height;
	        parent.width = Math.max(parent.width, line.width);
	        parent.height += line.height;
	    }

	    if (tpdata.lineCount > 1) {
	        var offsetX = 0;
	        var offsetY = 0;
	        var lineIndex = 0;
	        var lineKey;
	        line = new Shape.Group('line' + lineIndex);

	        //Double margin so that left/right-aligned next is not flush with edge of image
	        if (scene.align === 'left' || scene.align === 'right') {
	            maxLineWidth = scene.width * (1 - (1 - lineWrap) * 2);
	        }

	        for (var i = 0; i < tpdata.words.length; i++) {
	            var word = tpdata.words[i];
	            textNode = new Shape.Text(word.text);
	            var newline = word.text == '\\n';
	            if (!scene.noWrap && (offsetX + word.width >= maxLineWidth || newline === true)) {
	                finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	                holderTextGroup.add(line);
	                offsetX = 0;
	                offsetY += holderTextGroup.properties.leading;
	                lineIndex += 1;
	                line = new Shape.Group('line' + lineIndex);
	                line.y = offsetY;
	            }
	            if (newline === true) {
	                continue;
	            }
	            textNode.moveTo(offsetX, 0);
	            offsetX += tpdata.spaceWidth + word.width;
	            line.add(textNode);
	        }

	        finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo(scene.width - line.width, null, null);
	            }

	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo((holderTextGroup.width - line.width) / 2, null, null);
	            }

	            holderTextGroup.moveTo((scene.width - holderTextGroup.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - holderTextGroup.height) / 2, null);

	        //If the text exceeds vertical space, move it down so the first line is visible
	        if ((scene.height - holderTextGroup.height) / 2 < 0) {
	            holderTextGroup.moveTo(null, 0, null);
	        }
	    } else {
	        textNode = new Shape.Text(scene.text);
	        line = new Shape.Group('line0');
	        line.add(textNode);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            holderTextGroup.moveTo((scene.width - tpdata.boundingBox.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - tpdata.boundingBox.height) / 2, null);
	    }

	    //todo: renderlist
	    return sceneGraph;
	}

	/**
	 * Adaptive text sizing function
	 *
	 * @private
	 * @param width Parent width
	 * @param height Parent height
	 * @param fontSize Requested text size
	 * @param scale Proportional scale of text
	 */
	function textSize(width, height, fontSize, scale) {
	    var stageWidth = parseInt(width, 10);
	    var stageHeight = parseInt(height, 10);

	    var bigSide = Math.max(stageWidth, stageHeight);
	    var smallSide = Math.min(stageWidth, stageHeight);

	    var newHeight = 0.8 * Math.min(smallSide, bigSide * scale);
	    return Math.round(Math.max(fontSize, newHeight));
	}

	/**
	 * Iterates over resizable (fluid or auto) placeholders and renders them
	 *
	 * @private
	 * @param element Optional element selector, specified only if a specific element needs to be re-rendered
	 */
	function updateResizableElements(element) {
	    var images;
	    if (element == null || element.nodeType == null) {
	        images = App.vars.resizableImages;
	    } else {
	        images = [element];
	    }
	    for (var i = 0, l = images.length; i < l; i++) {
	        var el = images[i];
	        if (el.holderData) {
	            var flags = el.holderData.flags;
	            var dimensions = dimensionCheck(el);
	            if (dimensions) {
	                if (!el.holderData.resizeUpdate) {
	                    continue;
	                }

	                if (flags.fluid && flags.auto) {
	                    var fluidConfig = el.holderData.fluidConfig;
	                    switch (fluidConfig.mode) {
	                        case 'width':
	                            dimensions.height = dimensions.width / fluidConfig.ratio;
	                            break;
	                        case 'height':
	                            dimensions.width = dimensions.height * fluidConfig.ratio;
	                            break;
	                    }
	                }

	                var settings = {
	                    mode: 'image',
	                    holderSettings: {
	                        dimensions: dimensions,
	                        theme: flags.theme,
	                        flags: flags
	                    },
	                    el: el,
	                    engineSettings: el.holderData.engineSettings
	                };

	                if (flags.textmode == 'exact') {
	                    flags.exactDimensions = dimensions;
	                    settings.holderSettings.dimensions = flags.dimensions;
	                }

	                render(settings);
	            } else {
	                setInvisible(el);
	            }
	        }
	    }
	}

	/**
	 * Sets up aspect ratio metadata for fluid placeholders, in order to preserve proportions when resizing
	 *
	 * @private
	 * @param el Image DOM element
	 */
	function setInitialDimensions(el) {
	    if (el.holderData) {
	        var dimensions = dimensionCheck(el);
	        if (dimensions) {
	            var flags = el.holderData.flags;

	            var fluidConfig = {
	                fluidHeight: flags.dimensions.height.slice(-1) == '%',
	                fluidWidth: flags.dimensions.width.slice(-1) == '%',
	                mode: null,
	                initialDimensions: dimensions
	            };

	            if (fluidConfig.fluidWidth && !fluidConfig.fluidHeight) {
	                fluidConfig.mode = 'width';
	                fluidConfig.ratio = fluidConfig.initialDimensions.width / parseFloat(flags.dimensions.height);
	            } else if (!fluidConfig.fluidWidth && fluidConfig.fluidHeight) {
	                fluidConfig.mode = 'height';
	                fluidConfig.ratio = parseFloat(flags.dimensions.width) / fluidConfig.initialDimensions.height;
	            }

	            el.holderData.fluidConfig = fluidConfig;
	        } else {
	            setInvisible(el);
	        }
	    }
	}

	/**
	 * Iterates through all current invisible images, and if they're visible, renders them and removes them from further checks. Runs every animation frame.
	 *
	 * @private
	 */
	function visibilityCheck() {
	    var renderableImages = [];
	    var keys = Object.keys(App.vars.invisibleImages);
	    var el;

	    keys.forEach(function (key) {
	        el = App.vars.invisibleImages[key];
	        if (dimensionCheck(el) && el.nodeName.toLowerCase() == 'img') {
	            renderableImages.push(el);
	            delete App.vars.invisibleImages[key];
	        }
	    });

	    if (renderableImages.length) {
	        Holder.run({
	            images: renderableImages
	        });
	    }

	    // Done to prevent 100% CPU usage via aggressive calling of requestAnimationFrame
	    setTimeout(function () {
	        global.requestAnimationFrame(visibilityCheck);
	    }, 10);
	}

	/**
	 * Starts checking for invisible placeholders if not doing so yet. Does nothing otherwise.
	 *
	 * @private
	 */
	function startVisibilityCheck() {
	    if (!App.vars.visibilityCheckStarted) {
	        global.requestAnimationFrame(visibilityCheck);
	        App.vars.visibilityCheckStarted = true;
	    }
	}

	/**
	 * Sets a unique ID for an image detected to be invisible and adds it to the map of invisible images checked by visibilityCheck
	 *
	 * @private
	 * @param el Invisible DOM element
	 */
	function setInvisible(el) {
	    if (!el.holderData.invisibleId) {
	        App.vars.invisibleId += 1;
	        App.vars.invisibleImages['i' + App.vars.invisibleId] = el;
	        el.holderData.invisibleId = App.vars.invisibleId;
	    }
	}

	//todo: see if possible to convert stagingRenderer to use HTML only
	var stagingRenderer = (function() {
	    var svg = null,
	        stagingText = null,
	        stagingTextNode = null;
	    return function(graph) {
	        var rootNode = graph.root;
	        if (App.setup.supportsSVG) {
	            var firstTimeSetup = false;
	            var tnode = function(text) {
	                return document.createTextNode(text);
	            };
	            if (svg == null || svg.parentNode !== document.body) {
	                firstTimeSetup = true;
	            }

	            svg = SVG.initSVG(svg, rootNode.properties.width, rootNode.properties.height);
	            //Show staging element before staging
	            svg.style.display = 'block';

	            if (firstTimeSetup) {
	                stagingText = DOM.newEl('text', SVG_NS);
	                stagingTextNode = tnode(null);
	                DOM.setAttr(stagingText, {
	                    x: 0
	                });
	                stagingText.appendChild(stagingTextNode);
	                svg.appendChild(stagingText);
	                document.body.appendChild(svg);
	                svg.style.visibility = 'hidden';
	                svg.style.position = 'absolute';
	                svg.style.top = '-100%';
	                svg.style.left = '-100%';
	                //todo: workaround for zero-dimension <svg> tag in Opera 12
	                //svg.setAttribute('width', 0);
	                //svg.setAttribute('height', 0);
	            }

	            var holderTextGroup = rootNode.children.holderTextGroup;
	            var htgProps = holderTextGroup.properties;
	            DOM.setAttr(stagingText, {
	                'y': htgProps.font.size,
	                'style': utils.cssProps({
	                    'font-weight': htgProps.font.weight,
	                    'font-size': htgProps.font.size + htgProps.font.units,
	                    'font-family': htgProps.font.family
	                })
	            });

	            //Get bounding box for the whole string (total width and height)
	            stagingTextNode.nodeValue = htgProps.text;
	            var stagingTextBBox = stagingText.getBBox();

	            //Get line count and split the string into words
	            var lineCount = Math.ceil(stagingTextBBox.width / rootNode.properties.width);
	            var words = htgProps.text.split(' ');
	            var newlines = htgProps.text.match(/\\n/g);
	            lineCount += newlines == null ? 0 : newlines.length;

	            //Get bounding box for the string with spaces removed
	            stagingTextNode.nodeValue = htgProps.text.replace(/[ ]+/g, '');
	            var computedNoSpaceLength = stagingText.getComputedTextLength();

	            //Compute average space width
	            var diffLength = stagingTextBBox.width - computedNoSpaceLength;
	            var spaceWidth = Math.round(diffLength / Math.max(1, words.length - 1));

	            //Get widths for every word with space only if there is more than one line
	            var wordWidths = [];
	            if (lineCount > 1) {
	                stagingTextNode.nodeValue = '';
	                for (var i = 0; i < words.length; i++) {
	                    if (words[i].length === 0) continue;
	                    stagingTextNode.nodeValue = utils.decodeHtmlEntity(words[i]);
	                    var bbox = stagingText.getBBox();
	                    wordWidths.push({
	                        text: words[i],
	                        width: bbox.width
	                    });
	                }
	            }

	            //Hide staging element after staging
	            svg.style.display = 'none';

	            return {
	                spaceWidth: spaceWidth,
	                lineCount: lineCount,
	                boundingBox: stagingTextBBox,
	                words: wordWidths
	            };
	        } else {
	            //todo: canvas fallback for measuring text on android 2.3
	            return false;
	        }
	    };
	})();

	//Helpers

	/**
	 * Prevents a function from being called too often, waits until a timer elapses to call it again
	 *
	 * @param fn Function to call
	 */
	function debounce(fn) {
	    if (!App.vars.debounceTimer) fn.call(this);
	    if (App.vars.debounceTimer) global.clearTimeout(App.vars.debounceTimer);
	    App.vars.debounceTimer = global.setTimeout(function() {
	        App.vars.debounceTimer = null;
	        fn.call(this);
	    }, App.setup.debounce);
	}

	/**
	 * Holder-specific resize/orientation change callback, debounced to prevent excessive execution
	 */
	function resizeEvent() {
	    debounce(function() {
	        updateResizableElements(null);
	    });
	}

	//Set up flags

	for (var flag in App.flags) {
	    if (!App.flags.hasOwnProperty(flag)) continue;
	    App.flags[flag].match = function(val) {
	        return val.match(this.regex);
	    };
	}

	//Properties set once on setup

	App.setup = {
	    renderer: 'html',
	    debounce: 100,
	    ratio: 1,
	    supportsCanvas: false,
	    supportsSVG: false,
	    lineWrapRatio: 0.9,
	    dataAttr: 'data-src',
	    renderers: ['html', 'canvas', 'svg']
	};

	//Properties modified during runtime

	App.vars = {
	    preempted: false,
	    resizableImages: [],
	    invisibleImages: {},
	    invisibleId: 0,
	    visibilityCheckStarted: false,
	    debounceTimer: null,
	    cache: {}
	};

	//Pre-flight

	(function() {
	    var canvas = DOM.newEl('canvas');

	    if (canvas.getContext) {
	        if (canvas.toDataURL('image/png').indexOf('data:image/png') != -1) {
	            App.setup.renderer = 'canvas';
	            App.setup.supportsCanvas = true;
	        }
	    }

	    if (!!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect) {
	        App.setup.renderer = 'svg';
	        App.setup.supportsSVG = true;
	    }
	})();

	//Starts checking for invisible placeholders
	startVisibilityCheck();

	if (onDomReady) {
	    onDomReady(function() {
	        if (!App.vars.preempted) {
	            Holder.run();
	        }
	        if (global.addEventListener) {
	            global.addEventListener('resize', resizeEvent, false);
	            global.addEventListener('orientationchange', resizeEvent, false);
	        } else {
	            global.attachEvent('onresize', resizeEvent);
	        }

	        if (typeof global.Turbolinks == 'object') {
	            global.document.addEventListener('page:change', function() {
	                Holder.run();
	            });
	        }
	    });
	}

	module.exports = Holder;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	 * onDomReady.js 1.4.0 (c) 2013 Tubal Martin - MIT license
	 *
	 * Specially modified to work with Holder.js
	 */

	function _onDomReady(win) {
	    //Lazy loading fix for Firefox < 3.6
	    //http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
	    if (document.readyState == null && document.addEventListener) {
	        document.addEventListener("DOMContentLoaded", function DOMContentLoaded() {
	            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
	            document.readyState = "complete";
	        }, false);
	        document.readyState = "loading";
	    }
	    
	    var doc = win.document,
	        docElem = doc.documentElement,
	    
	        LOAD = "load",
	        FALSE = false,
	        ONLOAD = "on"+LOAD,
	        COMPLETE = "complete",
	        READYSTATE = "readyState",
	        ATTACHEVENT = "attachEvent",
	        DETACHEVENT = "detachEvent",
	        ADDEVENTLISTENER = "addEventListener",
	        DOMCONTENTLOADED = "DOMContentLoaded",
	        ONREADYSTATECHANGE = "onreadystatechange",
	        REMOVEEVENTLISTENER = "removeEventListener",
	    
	        // W3C Event model
	        w3c = ADDEVENTLISTENER in doc,
	        _top = FALSE,
	    
	        // isReady: Is the DOM ready to be used? Set to true once it occurs.
	        isReady = FALSE,
	    
	        // Callbacks pending execution until DOM is ready
	        callbacks = [];
	    
	    // Handle when the DOM is ready
	    function ready( fn ) {
	        if ( !isReady ) {
	    
	            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
	            if ( !doc.body ) {
	                return defer( ready );
	            }
	    
	            // Remember that the DOM is ready
	            isReady = true;
	    
	            // Execute all callbacks
	            while ( fn = callbacks.shift() ) {
	                defer( fn );
	            }
	        }
	    }
	    
	    // The ready event handler
	    function completed( event ) {
	        // readyState === "complete" is good enough for us to call the dom ready in oldIE
	        if ( w3c || event.type === LOAD || doc[READYSTATE] === COMPLETE ) {
	            detach();
	            ready();
	        }
	    }
	    
	    // Clean-up method for dom ready events
	    function detach() {
	        if ( w3c ) {
	            doc[REMOVEEVENTLISTENER]( DOMCONTENTLOADED, completed, FALSE );
	            win[REMOVEEVENTLISTENER]( LOAD, completed, FALSE );
	        } else {
	            doc[DETACHEVENT]( ONREADYSTATECHANGE, completed );
	            win[DETACHEVENT]( ONLOAD, completed );
	        }
	    }
	    
	    // Defers a function, scheduling it to run after the current call stack has cleared.
	    function defer( fn, wait ) {
	        // Allow 0 to be passed
	        setTimeout( fn, +wait >= 0 ? wait : 1 );
	    }
	    
	    // Attach the listeners:
	    
	    // Catch cases where onDomReady is called after the browser event has already occurred.
	    // we once tried to use readyState "interactive" here, but it caused issues like the one
	    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	    if ( doc[READYSTATE] === COMPLETE ) {
	        // Handle it asynchronously to allow scripts the opportunity to delay ready
	        defer( ready );
	    
	    // Standards-based browsers support DOMContentLoaded
	    } else if ( w3c ) {
	        // Use the handy event callback
	        doc[ADDEVENTLISTENER]( DOMCONTENTLOADED, completed, FALSE );
	    
	        // A fallback to window.onload, that will always work
	        win[ADDEVENTLISTENER]( LOAD, completed, FALSE );
	    
	    // If IE event model is used
	    } else {
	        // Ensure firing before onload, maybe late but safe also for iframes
	        doc[ATTACHEVENT]( ONREADYSTATECHANGE, completed );
	    
	        // A fallback to window.onload, that will always work
	        win[ATTACHEVENT]( ONLOAD, completed );
	    
	        // If IE and not a frame
	        // continually check to see if the document is ready
	        try {
	            _top = win.frameElement == null && docElem;
	        } catch(e) {}
	    
	        if ( _top && _top.doScroll ) {
	            (function doScrollCheck() {
	                if ( !isReady ) {
	                    try {
	                        // Use the trick by Diego Perini
	                        // http://javascript.nwbox.com/IEContentLoaded/
	                        _top.doScroll("left");
	                    } catch(e) {
	                        return defer( doScrollCheck, 50 );
	                    }
	    
	                    // detach all dom ready events
	                    detach();
	    
	                    // and execute any waiting functions
	                    ready();
	                }
	            })();
	        }
	    }
	    
	    function onDomReady( fn ) {
	        // If DOM is ready, execute the function (async), otherwise wait
	        isReady ? defer( fn ) : callbacks.push( fn );
	    }
	    
	    // Add version
	    onDomReady.version = "1.4.0";
	    // Add method to check if DOM is ready
	    onDomReady.isReady = function(){
	        return isReady;
	    };

	    return onDomReady;
	}

	module.exports = typeof window !== "undefined" && _onDomReady(window);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//Modified version of component/querystring
	//Changes: updated dependencies, dot notation parsing, JSHint fixes
	//Fork at https://github.com/imsky/querystring

	/**
	 * Module dependencies.
	 */

	var encode = encodeURIComponent;
	var decode = decodeURIComponent;
	var trim = __webpack_require__(4);
	var type = __webpack_require__(5);

	var arrayRegex = /(\w+)\[(\d+)\]/;
	var objectRegex = /\w+\.\w+/;

	/**
	 * Parse the given query `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api public
	 */

	exports.parse = function(str){
	  if ('string' !== typeof str) return {};

	  str = trim(str);
	  if ('' === str) return {};
	  if ('?' === str.charAt(0)) str = str.slice(1);

	  var obj = {};
	  var pairs = str.split('&');
	  for (var i = 0; i < pairs.length; i++) {
	    var parts = pairs[i].split('=');
	    var key = decode(parts[0]);
	    var m, ctx, prop;

	    if (m = arrayRegex.exec(key)) {
	      obj[m[1]] = obj[m[1]] || [];
	      obj[m[1]][m[2]] = decode(parts[1]);
	      continue;
	    }

	    if (m = objectRegex.test(key)) {
	      m = key.split('.');
	      ctx = obj;
	      
	      while (m.length) {
	        prop = m.shift();

	        if (!prop.length) continue;

	        if (!ctx[prop]) {
	          ctx[prop] = {};
	        } else if (ctx[prop] && typeof ctx[prop] !== 'object') {
	          break;
	        }

	        if (!m.length) {
	          ctx[prop] = decode(parts[1]);
	        }

	        ctx = ctx[prop];
	      }

	      continue;
	    }

	    obj[parts[0]] = null == parts[1] ? '' : decode(parts[1]);
	  }

	  return obj;
	};

	/**
	 * Stringify the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api public
	 */

	exports.stringify = function(obj){
	  if (!obj) return '';
	  var pairs = [];

	  for (var key in obj) {
	    var value = obj[key];

	    if ('array' == type(value)) {
	      for (var i = 0; i < value.length; ++i) {
	        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
	      }
	      continue;
	    }

	    pairs.push(encode(key) + '=' + encode(obj[key]));
	  }

	  return pairs.join('&');
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  if (typeof Buffer != 'undefined' && Buffer.isBuffer(val)) return 'buffer';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(7)
	var ieee754 = __webpack_require__(8)
	var isArray = __webpack_require__(9)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 8 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	var SceneGraph = function(sceneProperties) {
	    var nodeCount = 1;

	    //todo: move merge to helpers section
	    function merge(parent, child) {
	        for (var prop in child) {
	            parent[prop] = child[prop];
	        }
	        return parent;
	    }

	    var SceneNode = function(name) {
	        nodeCount++;
	        this.parent = null;
	        this.children = {};
	        this.id = nodeCount;
	        this.name = 'n' + nodeCount;
	        if (typeof name !== 'undefined') {
	            this.name = name;
	        }
	        this.x = this.y = this.z = 0;
	        this.width = this.height = 0;
	    };

	    SceneNode.prototype.resize = function(width, height) {
	        if (width != null) {
	            this.width = width;
	        }
	        if (height != null) {
	            this.height = height;
	        }
	    };

	    SceneNode.prototype.moveTo = function(x, y, z) {
	        this.x = x != null ? x : this.x;
	        this.y = y != null ? y : this.y;
	        this.z = z != null ? z : this.z;
	    };

	    SceneNode.prototype.add = function(child) {
	        var name = child.name;
	        if (typeof this.children[name] === 'undefined') {
	            this.children[name] = child;
	            child.parent = this;
	        } else {
	            throw 'SceneGraph: child already exists: ' + name;
	        }
	    };

	    var RootNode = function() {
	        SceneNode.call(this, 'root');
	        this.properties = sceneProperties;
	    };

	    RootNode.prototype = new SceneNode();

	    var Shape = function(name, props) {
	        SceneNode.call(this, name);
	        this.properties = {
	            'fill': '#000000'
	        };
	        if (typeof props !== 'undefined') {
	            merge(this.properties, props);
	        } else if (typeof name !== 'undefined' && typeof name !== 'string') {
	            throw 'SceneGraph: invalid node name';
	        }
	    };

	    Shape.prototype = new SceneNode();

	    var Group = function() {
	        Shape.apply(this, arguments);
	        this.type = 'group';
	    };

	    Group.prototype = new Shape();

	    var Rect = function() {
	        Shape.apply(this, arguments);
	        this.type = 'rect';
	    };

	    Rect.prototype = new Shape();

	    var Text = function(text) {
	        Shape.call(this);
	        this.type = 'text';
	        this.properties.text = text;
	    };

	    Text.prototype = new Shape();

	    var root = new RootNode();

	    this.Shape = {
	        'Rect': Rect,
	        'Text': Text,
	        'Group': Group
	    };

	    this.root = root;
	    return this;
	};

	module.exports = SceneGraph;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Shallow object clone and merge
	 *
	 * @param a Object A
	 * @param b Object B
	 * @returns {Object} New object with all of A's properties, and all of B's properties, overwriting A's properties
	 */
	exports.extend = function(a, b) {
	    var c = {};
	    for (var x in a) {
	        if (a.hasOwnProperty(x)) {
	            c[x] = a[x];
	        }
	    }
	    if (b != null) {
	        for (var y in b) {
	            if (b.hasOwnProperty(y)) {
	                c[y] = b[y];
	            }
	        }
	    }
	    return c;
	};

	/**
	 * Takes a k/v list of CSS properties and returns a rule
	 *
	 * @param props CSS properties object
	 */
	exports.cssProps = function(props) {
	    var ret = [];
	    for (var p in props) {
	        if (props.hasOwnProperty(p)) {
	            ret.push(p + ':' + props[p]);
	        }
	    }
	    return ret.join(';');
	};

	/**
	 * Encodes HTML entities in a string
	 *
	 * @param str Input string
	 */
	exports.encodeHtmlEntity = function(str) {
	    var buf = [];
	    var charCode = 0;
	    for (var i = str.length - 1; i >= 0; i--) {
	        charCode = str.charCodeAt(i);
	        if (charCode > 128) {
	            buf.unshift(['&#', charCode, ';'].join(''));
	        } else {
	            buf.unshift(str[i]);
	        }
	    }
	    return buf.join('');
	};

	/**
	 * Checks if an image exists
	 *
	 * @param src URL of image
	 * @param callback Callback to call once image status has been found
	 */
	exports.imageExists = function(src, callback) {
	    var image = new Image();
	    image.onerror = function() {
	        callback.call(this, false);
	    };
	    image.onload = function() {
	        callback.call(this, true);
	    };
	    image.src = src;
	};

	/**
	 * Decodes HTML entities in a string
	 *
	 * @param str Input string
	 */
	exports.decodeHtmlEntity = function(str) {
	    return str.replace(/&#(\d+);/g, function(match, dec) {
	        return String.fromCharCode(dec);
	    });
	};


	/**
	 * Returns an element's dimensions if it's visible, `false` otherwise.
	 *
	 * @param el DOM element
	 */
	exports.dimensionCheck = function(el) {
	    var dimensions = {
	        height: el.clientHeight,
	        width: el.clientWidth
	    };

	    if (dimensions.height && dimensions.width) {
	        return dimensions;
	    } else {
	        return false;
	    }
	};


	/**
	 * Returns true if value is truthy or if it is "semantically truthy"
	 * @param val
	 */
	exports.truthy = function(val) {
	    if (typeof val === 'string') {
	        return val === 'true' || val === 'yes' || val === '1' || val === 'on' || val === '✓';
	    }
	    return !!val;
	};

	/**
	 * Parses input into a well-formed CSS color
	 * @param val
	 */
	exports.parseColor = function(val) {
	    var hexre = /(^(?:#?)[0-9a-f]{6}$)|(^(?:#?)[0-9a-f]{3}$)/i;
	    var rgbre = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
	    var rgbare = /^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0\.\d{1,}|1)\)$/;

	    var match = val.match(hexre);
	    var retval;

	    if (match !== null) {
	        retval = match[1] || match[2];
	        if (retval[0] !== '#') {
	            return '#' + retval;
	        } else {
	            return retval;
	        }
	    }

	    match = val.match(rgbre);

	    if (match !== null) {
	        retval = 'rgb(' + match.slice(1).join(',') + ')';
	        return retval;
	    }

	    match = val.match(rgbare);

	    if (match !== null) {
	        retval = 'rgba(' + match.slice(1).join(',') + ')';
	        return retval;
	    }

	    return null;
	};

	/**
	 * Provides the correct scaling ratio for canvas drawing operations on HiDPI screens (e.g. Retina displays)
	 */
	exports.canvasRatio = function () {
	    var devicePixelRatio = 1;
	    var backingStoreRatio = 1;

	    if (global.document) {
	        var canvas = global.document.createElement('canvas');
	        if (canvas.getContext) {
	            var ctx = canvas.getContext('2d');
	            devicePixelRatio = global.devicePixelRatio || 1;
	            backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	        }
	    }

	    return devicePixelRatio / backingStoreRatio;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var DOM = __webpack_require__(13);

	var SVG_NS = 'http://www.w3.org/2000/svg';
	var NODE_TYPE_COMMENT = 8;

	/**
	 * Generic SVG element creation function
	 *
	 * @param svg SVG context, set to null if new
	 * @param width Document width
	 * @param height Document height
	 */
	exports.initSVG = function(svg, width, height) {
	    var defs, style, initialize = false;

	    if (svg && svg.querySelector) {
	        style = svg.querySelector('style');
	        if (style === null) {
	            initialize = true;
	        }
	    } else {
	        svg = DOM.newEl('svg', SVG_NS);
	        initialize = true;
	    }

	    if (initialize) {
	        defs = DOM.newEl('defs', SVG_NS);
	        style = DOM.newEl('style', SVG_NS);
	        DOM.setAttr(style, {
	            'type': 'text/css'
	        });
	        defs.appendChild(style);
	        svg.appendChild(defs);
	    }

	    //IE throws an exception if this is set and Chrome requires it to be set
	    if (svg.webkitMatchesSelector) {
	        svg.setAttribute('xmlns', SVG_NS);
	    }

	    //Remove comment nodes
	    for (var i = 0; i < svg.childNodes.length; i++) {
	        if (svg.childNodes[i].nodeType === NODE_TYPE_COMMENT) {
	            svg.removeChild(svg.childNodes[i]);
	        }
	    }

	    //Remove CSS
	    while (style.childNodes.length) {
	        style.removeChild(style.childNodes[0]);
	    }

	    DOM.setAttr(svg, {
	        'width': width,
	        'height': height,
	        'viewBox': '0 0 ' + width + ' ' + height,
	        'preserveAspectRatio': 'none'
	    });

	    return svg;
	};

	/**
	 * Converts serialized SVG to a string suitable for data URI use
	 * @param svgString Serialized SVG string
	 * @param [base64] Use base64 encoding for data URI
	 */
	exports.svgStringToDataURI = function() {
	    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
	    var base64Prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

	    return function(svgString, base64) {
	        if (base64) {
	            return base64Prefix + btoa(global.unescape(encodeURIComponent(svgString)));
	        } else {
	            return rawPrefix + encodeURIComponent(svgString);
	        }
	    };
	}();

	/**
	 * Returns serialized SVG with XML processing instructions
	 *
	 * @param svg SVG context
	 * @param stylesheets CSS stylesheets to include
	 */
	exports.serializeSVG = function(svg, engineSettings) {
	    if (!global.XMLSerializer) return;
	    var serializer = new XMLSerializer();
	    var svgCSS = '';
	    var stylesheets = engineSettings.stylesheets;

	    //External stylesheets: Processing Instruction method
	    if (engineSettings.svgXMLStylesheet) {
	        var xml = DOM.createXML();
	        //Add <?xml-stylesheet ?> directives
	        for (var i = stylesheets.length - 1; i >= 0; i--) {
	            var csspi = xml.createProcessingInstruction('xml-stylesheet', 'href="' + stylesheets[i] + '" rel="stylesheet"');
	            xml.insertBefore(csspi, xml.firstChild);
	        }

	        xml.removeChild(xml.documentElement);
	        svgCSS = serializer.serializeToString(xml);
	    }

	    var svgText = serializer.serializeToString(svg);
	    svgText = svgText.replace(/\&amp;(\#[0-9]{2,}\;)/g, '&$1');
	    return svgCSS + svgText;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Generic new DOM element function
	 *
	 * @param tag Tag to create
	 * @param namespace Optional namespace value
	 */
	exports.newEl = function(tag, namespace) {
	    if (!global.document) return;

	    if (namespace == null) {
	        return global.document.createElement(tag);
	    } else {
	        return global.document.createElementNS(namespace, tag);
	    }
	};

	/**
	 * Generic setAttribute function
	 *
	 * @param el Reference to DOM element
	 * @param attrs Object with attribute keys and values
	 */
	exports.setAttr = function (el, attrs) {
	    for (var a in attrs) {
	        el.setAttribute(a, attrs[a]);
	    }
	};

	/**
	 * Creates a XML document
	 * @private
	 */
	exports.createXML = function() {
	    if (!global.DOMParser) return;
	    return new DOMParser().parseFromString('<xml />', 'application/xml');
	};

	/**
	 * Converts a value into an array of DOM nodes
	 *
	 * @param val A string, a NodeList, a Node, or an HTMLCollection
	 */
	exports.getNodeArray = function(val) {
	    var retval = null;
	    if (typeof(val) == 'string') {
	        retval = document.querySelectorAll(val);
	    } else if (global.NodeList && val instanceof global.NodeList) {
	        retval = val;
	    } else if (global.Node && val instanceof global.Node) {
	        retval = [val];
	    } else if (global.HTMLCollection && val instanceof global.HTMLCollection) {
	        retval = val;
	    } else if (val instanceof Array) {
	        retval = val;
	    } else if (val === null) {
	        retval = [];
	    }

	    retval = Array.prototype.slice.call(retval);

	    return retval;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	var Color = function(color, options) {
	    //todo: support rgba, hsla, and rrggbbaa notation
	    //todo: use CIELAB internally
	    //todo: add clamp function (with sign)
	    if (typeof color !== 'string') return;

	    this.original = color;

	    if (color.charAt(0) === '#') {
	        color = color.slice(1);
	    }

	    if (/[^a-f0-9]+/i.test(color)) return;

	    if (color.length === 3) {
	        color = color.replace(/./g, '$&$&');
	    }

	    if (color.length !== 6) return;

	    this.alpha = 1;

	    if (options && options.alpha) {
	        this.alpha = options.alpha;
	    }

	    this.set(parseInt(color, 16));
	};

	//todo: jsdocs
	Color.rgb2hex = function(r, g, b) {
	    function format (decimal) {
	        var hex = (decimal | 0).toString(16);
	        if (decimal < 16) {
	            hex = '0' + hex;
	        }
	        return hex;
	    }

	    return [r, g, b].map(format).join('');
	};

	//todo: jsdocs
	Color.hsl2rgb = function (h, s, l) {
	    var H = h / 60;
	    var C = (1 - Math.abs(2 * l - 1)) * s;
	    var X = C * (1 - Math.abs(parseInt(H) % 2 - 1));
	    var m = l - (C / 2);

	    var r = 0, g = 0, b = 0;

	    if (H >= 0 && H < 1) {
	        r = C;
	        g = X;
	    } else if (H >= 1 && H < 2) {
	        r = X;
	        g = C;
	    } else if (H >= 2 && H < 3) {
	        g = C;
	        b = X;
	    } else if (H >= 3 && H < 4) {
	        g = X;
	        b = C;
	    } else if (H >= 4 && H < 5) {
	        r = X;
	        b = C;
	    } else if (H >= 5 && H < 6) {
	        r = C;
	        b = X;
	    }

	    r += m;
	    g += m;
	    b += m;

	    r = parseInt(r * 255);
	    g = parseInt(g * 255);
	    b = parseInt(b * 255);

	    return [r, g, b];
	};

	/**
	 * Sets the color from a raw RGB888 integer
	 * @param raw RGB888 representation of color
	 */
	//todo: refactor into a static method
	//todo: factor out individual color spaces
	//todo: add HSL, CIELAB, and CIELUV
	Color.prototype.set = function (val) {
	    this.raw = val;

	    var r = (this.raw & 0xFF0000) >> 16;
	    var g = (this.raw & 0x00FF00) >> 8;
	    var b = (this.raw & 0x0000FF);

	    // BT.709
	    var y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	    var u = -0.09991 * r - 0.33609 * g + 0.436 * b;
	    var v = 0.615 * r - 0.55861 * g - 0.05639 * b;

	    this.rgb = {
	        r: r,
	        g: g,
	        b: b
	    };

	    this.yuv = {
	        y: y,
	        u: u,
	        v: v
	    };

	    return this;
	};

	/**
	 * Lighten or darken a color
	 * @param multiplier Amount to lighten or darken (-1 to 1)
	 */
	Color.prototype.lighten = function(multiplier) {
	    var cm = Math.min(1, Math.max(0, Math.abs(multiplier))) * (multiplier < 0 ? -1 : 1);
	    var bm = (255 * cm) | 0;
	    var cr = Math.min(255, Math.max(0, this.rgb.r + bm));
	    var cg = Math.min(255, Math.max(0, this.rgb.g + bm));
	    var cb = Math.min(255, Math.max(0, this.rgb.b + bm));
	    var hex = Color.rgb2hex(cr, cg, cb);
	    return new Color(hex);
	};

	/**
	 * Output color in hex format
	 * @param addHash Add a hash character to the beginning of the output
	 */
	Color.prototype.toHex = function(addHash) {
	    return (addHash ? '#' : '') + this.raw.toString(16);
	};

	/**
	 * Returns whether or not current color is lighter than another color
	 * @param color Color to compare against
	 */
	Color.prototype.lighterThan = function(color) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    return this.yuv.y > color.yuv.y;
	};

	/**
	 * Returns the result of mixing current color with another color
	 * @param color Color to mix with
	 * @param multiplier How much to mix with the other color
	 */
	/*
	Color.prototype.mix = function (color, multiplier) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    var r = this.rgb.r;
	    var g = this.rgb.g;
	    var b = this.rgb.b;
	    var a = this.alpha;

	    var m = typeof multiplier !== 'undefined' ? multiplier : 0.5;

	    //todo: write a lerp function
	    r = r + m * (color.rgb.r - r);
	    g = g + m * (color.rgb.g - g);
	    b = b + m * (color.rgb.b - b);
	    a = a + m * (color.alpha - a);

	    return new Color(Color.rgbToHex(r, g, b), {
	        'alpha': a
	    });
	};
	*/

	/**
	 * Returns the result of blending another color on top of current color with alpha
	 * @param color Color to blend on top of current color, i.e. "Ca"
	 */
	//todo: see if .blendAlpha can be merged into .mix
	Color.prototype.blendAlpha = function(color) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    var Ca = color;
	    var Cb = this;

	    //todo: write alpha blending function
	    var r = Ca.alpha * Ca.rgb.r + (1 - Ca.alpha) * Cb.rgb.r;
	    var g = Ca.alpha * Ca.rgb.g + (1 - Ca.alpha) * Cb.rgb.g;
	    var b = Ca.alpha * Ca.rgb.b + (1 - Ca.alpha) * Cb.rgb.b;

	    return new Color(Color.rgb2hex(r, g, b));
	};

	module.exports = Color;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
	  'version': '2.9.2',
	  'svg_ns': 'http://www.w3.org/2000/svg'
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var shaven = __webpack_require__(17);

	var SVG = __webpack_require__(12);
	var constants = __webpack_require__(15);
	var utils = __webpack_require__(11);

	var SVG_NS = constants.svg_ns;

	var templates = {
	  'element': function (options) {
	    var tag = options.tag;
	    var content = options.content || '';
	    delete options.tag;
	    delete options.content;
	    return  [tag, content, options];
	  }
	};

	//todo: deprecate tag arg, infer tag from shape object
	function convertShape (shape, tag) {
	  return templates.element({
	    'tag': tag,
	    'width': shape.width,
	    'height': shape.height,
	    'fill': shape.properties.fill
	  });
	}

	function textCss (properties) {
	  return utils.cssProps({
	    'fill': properties.fill,
	    'font-weight': properties.font.weight,
	    'font-family': properties.font.family + ', monospace',
	    'font-size': properties.font.size + properties.font.units
	  });
	}

	function outlinePath (bgWidth, bgHeight, outlineWidth) {
	  var outlineOffsetWidth = outlineWidth / 2;

	  return [
	    'M', outlineOffsetWidth, outlineOffsetWidth,
	    'H', bgWidth - outlineOffsetWidth,
	    'V', bgHeight - outlineOffsetWidth,
	    'H', outlineOffsetWidth,
	    'V', 0,
	    'M', 0, outlineOffsetWidth,
	    'L', bgWidth, bgHeight - outlineOffsetWidth,
	    'M', 0, bgHeight - outlineOffsetWidth,
	    'L', bgWidth, outlineOffsetWidth
	  ].join(' ');
	}

	module.exports = function (sceneGraph, renderSettings) {
	  var engineSettings = renderSettings.engineSettings;
	  var stylesheets = engineSettings.stylesheets;
	  var stylesheetXml = stylesheets.map(function (stylesheet) {
	    return '<?xml-stylesheet rel="stylesheet" href="' + stylesheet + '"?>';
	  }).join('\n');

	  var holderId = 'holder_' + Number(new Date()).toString(16);

	  var root = sceneGraph.root;
	  var textGroup = root.children.holderTextGroup;

	  var css = '#' + holderId + ' text { ' + textCss(textGroup.properties) + ' } ';

	  // push text down to be equally vertically aligned with canvas renderer
	  textGroup.y += textGroup.textPositionData.boundingBox.height * 0.8;

	  var wordTags = [];

	  Object.keys(textGroup.children).forEach(function (lineKey) {
	    var line = textGroup.children[lineKey];

	    Object.keys(line.children).forEach(function (wordKey) {
	      var word = line.children[wordKey];
	      var x = textGroup.x + line.x + word.x;
	      var y = textGroup.y + line.y + word.y;

	      var wordTag = templates.element({
	        'tag': 'text',
	        'content': word.properties.text,
	        'x': x,
	        'y': y
	      });

	      wordTags.push(wordTag);
	    });
	  });

	  var text = templates.element({
	    'tag': 'g',
	    'content': wordTags
	  });

	  var outline = null;

	  if (root.children.holderBg.properties.outline) {
	    var outlineProperties = root.children.holderBg.properties.outline;
	    outline = templates.element({
	      'tag': 'path',
	      'd': outlinePath(root.children.holderBg.width, root.children.holderBg.height, outlineProperties.width),
	      'stroke-width': outlineProperties.width,
	      'stroke': outlineProperties.fill,
	      'fill': 'none'
	    });
	  }

	  var bg = convertShape(root.children.holderBg, 'rect');

	  var sceneContent = [];

	  sceneContent.push(bg);
	  if (outlineProperties) {
	    sceneContent.push(outline);
	  }
	  sceneContent.push(text);

	  var scene = templates.element({
	    'tag': 'g',
	    'id': holderId,
	    'content': sceneContent
	  });

	  var style = templates.element({
	    'tag': 'style',
	    //todo: figure out how to add CDATA directive
	    'content': css,
	    'type': 'text/css'
	  });

	  var defs = templates.element({
	    'tag': 'defs',
	    'content': style
	  });

	  var svg = templates.element({
	    'tag': 'svg',
	    'content': [defs, scene],
	    'width': root.properties.width,
	    'height': root.properties.height,
	    'xmlns': SVG_NS,
	    'viewBox': [0, 0, root.properties.width, root.properties.height].join(' '),
	    'preserveAspectRatio': 'none'
	  });

	  var output = shaven(svg);
	  
	  output = stylesheetXml + output[0];

	  var svgString = SVG.svgStringToDataURI(output, renderSettings.mode === 'background');
	  return svgString;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var escape = __webpack_require__(18)

	// TODO: remove namespace

	module.exports = function shaven (array, namespace, returnObject) {

		'use strict'

		var i = 1
		var doesEscape = true
		var HTMLString
		var attributeKey
		var callback
		var key


		returnObject = returnObject || {}


		function createElement (sugarString) {

			var tags = sugarString.match(/^[\w-]+/)
			var element = {
				tag: tags ? tags[0] : 'div',
				attr: {},
				children: []
			}
			var id = sugarString.match(/#([\w-]+)/)
			var reference = sugarString.match(/\$([\w-]+)/)
			var classNames = sugarString.match(/\.[\w-]+/g)


			// Assign id if is set
			if (id) {
				element.attr.id = id[1]

				// Add element to the return object
				returnObject[id[1]] = element
			}

			if (reference)
				returnObject[reference[1]] = element

			if (classNames)
				element.attr.class = classNames.join(' ').replace(/\./g, '')

			if (sugarString.match(/&$/g))
				doesEscape = false

			return element
		}

		function replacer (key, value) {

			if (value === null || value === false || value === undefined)
				return

			if (typeof value !== 'string' && typeof value !== 'object')
				return String(value)

			return value
		}

		function escapeAttribute (string) {
			return (string || string === 0) ?
				String(string)
					.replace(/&/g, '&amp;')
					.replace(/"/g, '&quot;') :
				''
		}

		function escapeHTML (string) {
			return String(string)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&apos;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
		}


		if (typeof array[0] === 'string')
			array[0] = createElement(array[0])

		else if (Array.isArray(array[0]))
			i = 0

		else
			throw new Error(
				'First element of array must be a string, ' +
				'or an array and not ' + JSON.stringify(array[0])
			)


		for (; i < array.length; i++) {

			// Don't render element if value is false or null
			if (array[i] === false || array[i] === null) {
				array[0] = false
				break
			}

			// Continue with next array value if current value is undefined or true
			else if (array[i] === undefined || array[i] === true) {
				continue
			}

			else if (typeof array[i] === 'string') {
				if (doesEscape)
					array[i] = escapeHTML(array[i])

				array[0].children.push(array[i])
			}

			else if (typeof array[i] === 'number') {

				array[0].children.push(array[i])
			}

			else if (Array.isArray(array[i])) {

				if (Array.isArray(array[i][0])) {
					array[i].reverse().forEach(function (subArray) {
						array.splice(i + 1, 0, subArray)
					})

					if (i !== 0)
						continue
					i++
				}

				shaven(array[i], namespace, returnObject)

				if (array[i][0])
					array[0].children.push(array[i][0])
			}

			else if (typeof array[i] === 'function')
				callback = array[i]


			else if (typeof array[i] === 'object') {
				for (attributeKey in array[i])
					if (array[i].hasOwnProperty(attributeKey))
						if (array[i][attributeKey] !== null &&
							array[i][attributeKey] !== false)
							if (attributeKey === 'style' &&
								typeof array[i][attributeKey] === 'object')
								array[0].attr[attributeKey] = JSON
									.stringify(array[i][attributeKey], replacer)
									.slice(2, -2)
									.replace(/","/g, ';')
									.replace(/":"/g, ':')
									.replace(/\\"/g, '\'')

							else
								array[0].attr[attributeKey] = array[i][attributeKey]
			}

			else
				throw new TypeError('"' + array[i] + '" is not allowed as a value.')
		}


		if (array[0] !== false) {

			HTMLString = '<' + array[0].tag

			for (key in array[0].attr)
				if (array[0].attr.hasOwnProperty(key))
					HTMLString += ' ' + key + '="' +
						escapeAttribute(array[0].attr[key]) + '"'

			HTMLString += '>'

			array[0].children.forEach(function (child) {
				HTMLString += child
			})

			HTMLString += '</' + array[0].tag + '>'

			array[0] = HTMLString
		}

		// Return root element on index 0
		returnObject[0] = array[0]

		if (callback)
			callback(array[0])

		// returns object containing all elements with an id and the root element
		return returnObject
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * escape-html
	 * Copyright(c) 2012-2013 TJ Holowaychuk
	 * Copyright(c) 2015 Andreas Lubbe
	 * Copyright(c) 2015 Tiancheng "Timothy" Gu
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var DOM = __webpack_require__(13);
	var utils = __webpack_require__(11);

	module.exports = (function() {
	    var canvas = DOM.newEl('canvas');
	    var ctx = null;

	    return function(sceneGraph) {
	        if (ctx == null) {
	            ctx = canvas.getContext('2d');
	        }

	        var dpr = utils.canvasRatio();
	        var root = sceneGraph.root;
	        canvas.width = dpr * root.properties.width;
	        canvas.height = dpr * root.properties.height ;
	        ctx.textBaseline = 'middle';

	        var bg = root.children.holderBg;
	        var bgWidth = dpr * bg.width;
	        var bgHeight = dpr * bg.height;
	        //todo: parametrize outline width (e.g. in scene object)
	        var outlineWidth = 2;
	        var outlineOffsetWidth = outlineWidth / 2;

	        ctx.fillStyle = bg.properties.fill;
	        ctx.fillRect(0, 0, bgWidth, bgHeight);

	        if (bg.properties.outline) {
	            //todo: abstract this into a method
	            ctx.strokeStyle = bg.properties.outline.fill;
	            ctx.lineWidth = bg.properties.outline.width;
	            ctx.moveTo(outlineOffsetWidth, outlineOffsetWidth);
	            // TL, TR, BR, BL
	            ctx.lineTo(bgWidth - outlineOffsetWidth, outlineOffsetWidth);
	            ctx.lineTo(bgWidth - outlineOffsetWidth, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(outlineOffsetWidth, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(outlineOffsetWidth, outlineOffsetWidth);
	            // Diagonals
	            ctx.moveTo(0, outlineOffsetWidth);
	            ctx.lineTo(bgWidth, bgHeight - outlineOffsetWidth);
	            ctx.moveTo(0, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(bgWidth, outlineOffsetWidth);
	            ctx.stroke();
	        }

	        var textGroup = root.children.holderTextGroup;
	        ctx.font = textGroup.properties.font.weight + ' ' + (dpr * textGroup.properties.font.size) + textGroup.properties.font.units + ' ' + textGroup.properties.font.family + ', monospace';
	        ctx.fillStyle = textGroup.properties.fill;

	        for (var lineKey in textGroup.children) {
	            var line = textGroup.children[lineKey];
	            for (var wordKey in line.children) {
	                var word = line.children[wordKey];
	                var x = dpr * (textGroup.x + line.x + word.x);
	                var y = dpr * (textGroup.y + line.y + word.y + (textGroup.properties.leading / 2));

	                ctx.fillText(word.properties.text, x, y);
	            }
	        }

	        return canvas.toDataURL('image/png');
	    };
	})();

/***/ }
/******/ ])
});
;
(function(ctx, isMeteorPackage) {
    if (isMeteorPackage) {
        Holder = ctx.Holder;
    }
})(this, typeof Meteor !== 'undefined' && typeof Package !== 'undefined');

