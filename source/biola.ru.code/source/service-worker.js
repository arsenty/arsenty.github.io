/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/favicons/android-chrome-192x192.png","af76368aa371db343a68cce4b0f81d7f"],["/assets/favicons/android-chrome-512x512.png","307e7fd4bd9fc576ba6d703e0c33925b"],["/assets/favicons/apple-touch-icon.png","e873539f5ea348382901f01ce84045a4"],["/assets/favicons/favicon-16x16.png","64229d67d6f6589953db010c8c8b017c"],["/assets/favicons/favicon-32x32.png","732e84c597f16640254ac2dac16c20ad"],["/assets/favicons/mstile-150x150.png","112dfe8815fbf0145321672c446c1895"],["/assets/favicons/safari-pinned-tab.svg","1e9365cff12e550ed3b0a38e7cea337f"],["/assets/fonts/DIN Alternate Bold.ttf","e4ba58f4d540c308fe55685512ccdbd1"],["/assets/fonts/noto/sans/bold.eot","6d27c9e30f53c4e18c27ca9929185d9f"],["/assets/fonts/noto/sans/bold.ttf","42eac3cb16ee69c3bcccda035fa8a848"],["/assets/fonts/noto/sans/bold.woff","0cc5e5cd08dc3b381d4b3a4efd2409c9"],["/assets/fonts/noto/sans/bold.woff2","438a757fc3ce5b783c9d9b62ee659a48"],["/assets/fonts/noto/sans/bolditalic.eot","8165785e298cf5ebb24ed9c7849482d7"],["/assets/fonts/noto/sans/bolditalic.ttf","c26114d53c547d276208e36443e26a2e"],["/assets/fonts/noto/sans/bolditalic.woff","3d71f2fffe2feb6a850c3de8fa4864a3"],["/assets/fonts/noto/sans/bolditalic.woff2","a456aaeaf876887c9d4ee7a15df772f6"],["/assets/fonts/noto/sans/italic.eot","8c522570c442c90d7094190d23e27c19"],["/assets/fonts/noto/sans/italic.ttf","223ba7ee2df0bea6f9f60dccd01ffbfb"],["/assets/fonts/noto/sans/italic.woff","8635da48b87c23d61dfdfd05eae215a6"],["/assets/fonts/noto/sans/italic.woff2","face791ba1a323792beeddf662a570b9"],["/assets/fonts/noto/sans/regular.eot","b3a11473e7ab11bab7ac99d7dce8621e"],["/assets/fonts/noto/sans/regular.ttf","2915a204d1a48ed7b612c1e6254c9ce2"],["/assets/fonts/noto/sans/regular.woff","eb7c455e89813982187a41c37effad54"],["/assets/fonts/noto/sans/regular.woff2","27843ab7350fee6d9385dacc4e7aa0dc"],["/assets/fonts/noto/serif/bold.eot","e30959f2e1900824961c9fdab2d97193"],["/assets/fonts/noto/serif/bold.ttf","aee15fd0eb82f6b7abd3a0d3a4a516b3"],["/assets/fonts/noto/serif/bold.woff","56db9cfc7180f73c615cd06ac6955a62"],["/assets/fonts/noto/serif/bold.woff2","507d78470d75cca7025da2944af30572"],["/assets/fonts/noto/serif/bolditalic.eot","42d3da50743c27ee4acad520be3fcc28"],["/assets/fonts/noto/serif/bolditalic.ttf","e9fc8c42ed0234af934115ce01f95cde"],["/assets/fonts/noto/serif/bolditalic.woff","4e466aaae170b391b266c767f60ee9c1"],["/assets/fonts/noto/serif/bolditalic.woff2","3eee15611013dcb9f8f245b2d5897142"],["/assets/fonts/noto/serif/italic.eot","286d6ea63c10db78c23084e6520ca3d4"],["/assets/fonts/noto/serif/italic.ttf","1456f5d056b03129d7df7db4081aa480"],["/assets/fonts/noto/serif/italic.woff","2d55102d732ef2b7fa7a93ffe1a57318"],["/assets/fonts/noto/serif/italic.woff2","ae3bd4111f51405d37e55e7c7474bb16"],["/assets/fonts/noto/serif/regular.eot","2d62da2e64f151f29179ec278e23d1ce"],["/assets/fonts/noto/serif/regular.ttf","d36e024ce0bd1a83e8c2367055dae8a9"],["/assets/fonts/noto/serif/regular.woff","4b93d9ac0d50c8214375ef2b62a57de9"],["/assets/fonts/noto/serif/regular.woff2","23d0687e2da1690af7579ff1fe35059e"],["/assets/images/card__media.jpg","1d53fc2b9b81d3d9fe256a58c2972418"],["/assets/images/card__user.jpg","8b7ee00b8829e0fa4717cdbefef1a586"],["/assets/images/content/eeg-2.png","08b5bfbacb9a6ee90e290ffea7434951"],["/assets/images/content/eurosmed.png","d07039e9fe2c60c5af9d027e862eb3fb"],["/assets/images/content/goods_small.png","d98d5ca410730319ca3aa6f8c82c7eb8"],["/assets/images/content/medalnet.png","958725bdd09abe84c9bff5e663ecf0bb"],["/assets/images/form__captcha.png","e9537ddb0465f58ac10afcee1fc690e1"],["/assets/images/icons.svg","5afa07e10c440f185df40e483d1aaf06"],["/assets/images/icons8-great_britain.svg","686ff4bbe2d284cc83d6bb9b5911c455"],["/assets/images/icons8-russian_federation.svg","888c7a0ae82d64bf37761da1432d28a0"],["/assets/images/input__eye_close.svg","ac7f6d715a1a41c82e8e980a7397e141"],["/assets/images/input__eye_open.svg","e953a00498da7048eeccafb2c17db1f2"],["/assets/images/logo.svg","9d2ea8ae77d1656766811cba05006636"],["/assets/images/notification__error.svg","dc5d1c9421b7e8ee9284cec867dd8a71"],["/assets/images/notification__info.svg","af04ceb69c991fd5d58ea52ad3c92f7b"],["/assets/images/notification__notice.svg","b6436ca7d783b631ff207e9edd2ccce2"],["/assets/images/notification__success.svg","b3efa1d5be25d80ca6d2e37e2db2bbb3"],["/assets/images/notification__warning.svg","2374e651eaa0db8ca44be7913943f2f9"],["/assets/images/sprite.png","2d28ff324e4ccdb92cbc3c4d88e612c9"],["/assets/images/sprite@2x.png","2659a452e09ea7027cd3a76c7003d0ac"],["/assets/images/star-rating__star-grey.svg","a7e6d111a4169bae18ac3446de5860f9"],["/assets/images/star-rating__star.svg","b44cc4be24651e4101eebbef3f1bd881"],["/assets/images/tabs__preloader.svg","ef88b3ba366972f1863edef5c0553aae"],["/assets/javascripts/main.js","206204327882b23d86c03c1d37ba989a"],["/assets/javascripts/vendor.js","097f582f6bf0eec7d554d70f58873a09"],["/assets/stylesheets/bootstrap.css","0c1cd0d7d12d7e23abf5f35b4676b4ff"],["/assets/stylesheets/main.css","3e03417578ff34c760692fc8902d9c7f"],["/assets/stylesheets/reset.css","233748b884cd090d50a4c3f2eeb7b6e6"],["/catalog.html","367257d855b8d3fc93c00c97fd066133"],["/contacts.html","6e4b475e5ba13e86fd6a7865706e7055"],["/docs.html","2bf741dfc14e8153556705baa6670d5e"],["/goods.html","66a94171ff15c048e0ea5417e6a15bfa"],["/index.html","3930b2bd368cc64ab347ef373db5062b"],["/partners.html","62c60ecc9b196ed1d2801ec12a0f8555"],["/research.html","c7851e3fab4101311e4e55e32f4e2003"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







