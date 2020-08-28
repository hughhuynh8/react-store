const staticCacheName = 'site-static-v1';  // our cache variable
const dynamicCacheName = 'site-dynamic-v1';
const assets = [    // array of URLs of files we want to store in cache
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/js/bundle.js',
    '/static/js/3.chunk.js',
    '/static/js/4.chunk.js',
    '/index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js',
    'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin',
    '/pages/fallback.html',
    '/'
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {    // while the length is greater than our pre-defined size,
                cache.delete(keys[0]).then(limitCacheSize(name, size))  // we delete the first item and call the function again
            }
        })
    })
}

// install service worker
self.addEventListener('install', evt => {
    /*--- cache our core (App shell) files ---*/
    evt.waitUntil(      
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);     // cache all assets from our assets array
        })
    );
})

// activate evt service worker
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    /*--- delete all caches apart from our current one ---*/
    evt.waitUntil(
        caches.keys().then(keys => {    // show all the keys that we have in cache. This returns a promise
            return Promise.all(keys     // Promise.all() takes in an array of promises. When all of those promises are resolved, then Promise.all() will also resolve
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)     // if it's not equal to our current key name, we keep that key in the array
                .map(key => caches.delete(key))                // iterate over the array using map() and delete those keys from cache. caches.delete() also returns a promise
            )
        })
    )
})

// fetch event
self.addEventListener('fetch', evt => {
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1) {    // do not cache any files related to firestore.googleapi
        // load files from cache. If it's not in cache, load file from server
        evt.respondWith(    // we give our own custom response for the fetch event 
            caches.match(evt.request).then( cacheRes => { // check to see if any of the items being fetched matches what we have in our cache
                return cacheRes || fetch(evt.request).then(fetchRes => {    // fetch() gets the file from server. When the response comes back from the server, we take that response (fetchRes) and
                    return caches.open(dynamicCacheName).then(cache => {        // open up dynamicCacheName 
                        console.log('caching dynamic assets');
                        cache.put(evt.request.url, fetchRes.clone());     // cache new assets into dynamicCacheName using cache.put(key, value). fetchRes can only be used once when we return it, so to use it here we need to clone it
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    });
                });
            }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1){
                    return caches.match('/pages/fallback.html');    //  error from promise then we take the user to the fallback page
                }
            })
        );
    }

})