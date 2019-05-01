var num = 5;
var staticCacheName = 'jeff-static-v12';
var cacheFiles = [
    'skeleton.html',
    'assets/vendor/bootstrap/css/bootstrap.min.css'
]

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate',(e)=>{
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.filter(cacheName=>{
                    return cacheName.startsWith('jeff-') && cacheName != staticCacheName;
                }).map(cacheName=>{
                    //return cache.delete(cacheName);
                    return caches.delete(cacheName);
                })
            )
        })
    )
})

self.addEventListener('fetch',(e)=>{
    if(navigator.onLine){

    } else{
        e.respondWith(
            caches.match('/skeleton.html').then(response=>{
                return response;
            })
        )
    }
});