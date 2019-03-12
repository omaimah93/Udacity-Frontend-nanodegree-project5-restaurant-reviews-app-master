// Define the Cache
var staticCacheName = 'restaurant-cache';
// Set URLS to be cached
let urlsToCache = [
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

// Service Worker Installation
self.addEventListener('install', function(event) {
  console.log('Service Worker is installed');

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('Service Worker is caching');
      return cache.addAll(urlsToCache);
    })
  );
});

// Service Worker Activation
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            ).then(function() {
              console.log('Service Worker is activated');
            });
        })
    );
});

//Fetch contents from cache for offline browsing
self.addEventListener('[ServiceWorker] Fetch', function(event) {
  console.log('test');
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        }).catch (function(err) {
          console.log('Error:' + err)
        })
    );
});
