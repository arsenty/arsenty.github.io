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

var precacheConfig = [["/assets/favicons/android-chrome-144x144.png","3433174e52acd47b5d4204e4e98f2b96"],["/assets/favicons/android-chrome-192x192.png","50a91e144ec186c6d92c4da3e8d8ccd6"],["/assets/favicons/android-chrome-256x256.png","6dd1679040129d1d8595f9ce4514040a"],["/assets/favicons/android-chrome-36x36.png","eee03c8fbbb448ac99ac2395c835c854"],["/assets/favicons/android-chrome-384x384.png","f3ca13093c643d473a800b5713f23fce"],["/assets/favicons/android-chrome-48x48.png","b7701976e164a4abd73d5437b03572bb"],["/assets/favicons/android-chrome-512x512.png","15cfd2a392c50c58138862506af4a539"],["/assets/favicons/android-chrome-72x72.png","3923695a58f90d6cb8754b36343704b1"],["/assets/favicons/android-chrome-96x96.png","21eeb74a3502bd1fbe8f29dfa26ec1a7"],["/assets/favicons/apple-touch-icon.png","04c3be9d5003016a7f4a220f0b0f2165"],["/assets/favicons/favicon-16x16.png","624739c60ac9aa2c6f59f7ec67afc31a"],["/assets/favicons/favicon-32x32.png","a66d3db28cb8124d0efc1b995f88c3f5"],["/assets/favicons/favicon.ico","469c622e70f673257aec02bc61c82aa4"],["/assets/favicons/mstile-144x144.png","94420bb527dad44f1f80b349a8014ffd"],["/assets/favicons/mstile-150x150.png","80f30454bcff82b7d3801283aab8d1a4"],["/assets/favicons/mstile-310x150.png","5b31530883cb6d5fc8292bd95002c898"],["/assets/favicons/mstile-310x310.png","392182db7a55eac608dde22fd62bf126"],["/assets/favicons/mstile-70x70.png","d53cac1ea2ee665ae68460592e9ed6ef"],["/assets/favicons/safari-pinned-tab.svg","cdd20d9e7c5e410b946339819d9b4769"],["/assets/fonts/noto/sans/bold.eot","6d27c9e30f53c4e18c27ca9929185d9f"],["/assets/fonts/noto/sans/bold.ttf","42eac3cb16ee69c3bcccda035fa8a848"],["/assets/fonts/noto/sans/bold.woff","0cc5e5cd08dc3b381d4b3a4efd2409c9"],["/assets/fonts/noto/sans/bold.woff2","438a757fc3ce5b783c9d9b62ee659a48"],["/assets/fonts/noto/sans/bolditalic.eot","8165785e298cf5ebb24ed9c7849482d7"],["/assets/fonts/noto/sans/bolditalic.ttf","c26114d53c547d276208e36443e26a2e"],["/assets/fonts/noto/sans/bolditalic.woff","3d71f2fffe2feb6a850c3de8fa4864a3"],["/assets/fonts/noto/sans/bolditalic.woff2","a456aaeaf876887c9d4ee7a15df772f6"],["/assets/fonts/noto/sans/italic.eot","8c522570c442c90d7094190d23e27c19"],["/assets/fonts/noto/sans/italic.ttf","223ba7ee2df0bea6f9f60dccd01ffbfb"],["/assets/fonts/noto/sans/italic.woff","8635da48b87c23d61dfdfd05eae215a6"],["/assets/fonts/noto/sans/italic.woff2","face791ba1a323792beeddf662a570b9"],["/assets/fonts/noto/sans/regular.eot","b3a11473e7ab11bab7ac99d7dce8621e"],["/assets/fonts/noto/sans/regular.ttf","2915a204d1a48ed7b612c1e6254c9ce2"],["/assets/fonts/noto/sans/regular.woff","eb7c455e89813982187a41c37effad54"],["/assets/fonts/noto/sans/regular.woff2","27843ab7350fee6d9385dacc4e7aa0dc"],["/assets/fonts/noto/serif/bold.eot","e30959f2e1900824961c9fdab2d97193"],["/assets/fonts/noto/serif/bold.ttf","aee15fd0eb82f6b7abd3a0d3a4a516b3"],["/assets/fonts/noto/serif/bold.woff","56db9cfc7180f73c615cd06ac6955a62"],["/assets/fonts/noto/serif/bold.woff2","507d78470d75cca7025da2944af30572"],["/assets/fonts/noto/serif/bolditalic.eot","42d3da50743c27ee4acad520be3fcc28"],["/assets/fonts/noto/serif/bolditalic.ttf","e9fc8c42ed0234af934115ce01f95cde"],["/assets/fonts/noto/serif/bolditalic.woff","4e466aaae170b391b266c767f60ee9c1"],["/assets/fonts/noto/serif/bolditalic.woff2","3eee15611013dcb9f8f245b2d5897142"],["/assets/fonts/noto/serif/italic.eot","286d6ea63c10db78c23084e6520ca3d4"],["/assets/fonts/noto/serif/italic.ttf","1456f5d056b03129d7df7db4081aa480"],["/assets/fonts/noto/serif/italic.woff","2d55102d732ef2b7fa7a93ffe1a57318"],["/assets/fonts/noto/serif/italic.woff2","ae3bd4111f51405d37e55e7c7474bb16"],["/assets/fonts/noto/serif/regular.eot","2d62da2e64f151f29179ec278e23d1ce"],["/assets/fonts/noto/serif/regular.ttf","d36e024ce0bd1a83e8c2367055dae8a9"],["/assets/fonts/noto/serif/regular.woff","4b93d9ac0d50c8214375ef2b62a57de9"],["/assets/fonts/noto/serif/regular.woff2","23d0687e2da1690af7579ff1fe35059e"],["/assets/images/content/preview.png","ff1012b64b99ec24e101316d10de47e3"],["/assets/images/content/preview_small.png","cc96feb94a18ba5732ae40ad178fb8fb"],["/assets/images/form__captcha.png","faa9290788c1fdbb1d4f0382013de328"],["/assets/images/icons.svg","392bac2a6a179c9d20838ccfbb93efcd"],["/assets/images/sprite.png","2ea7d19516e9ef2bbabb63862b45bee3"],["/assets/images/sprite@2x.png","0bba8102a9bef925c4f69df6a9c913f2"],["/assets/images/tabs__preloader.svg","e27798d9322a4f4d293eabf9d1b92ed1"],["/assets/javascripts/main.js","d1761dd77796f0a6712ae60152e74711"],["/assets/javascripts/vendor.js","3768b056f8733f1996109ed36ecf7222"],["/assets/stylesheets/bootstrap.min.css","4616756c400b3383840fd35a80954a0f"],["/assets/stylesheets/main.css","68b329da9893e34099c7d8ad5cb9c940"],["/assets/stylesheets/reset.css","0c19a02775ed9fb145457b2d4b70911a"],["/home.html","b63fa739e7a808a0d7992d9470333c36"],["/index.html","68b329da9893e34099c7d8ad5cb9c940"],["/news-item.html","e4817d6409325fcfec89375175743118"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');




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




