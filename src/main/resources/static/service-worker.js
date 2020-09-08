const VERSION = 'v4';
const CACHE_NAME = 'paper-cache_' + VERSION;
const IMMUTABLE_APPSHELL = [
    getContextPath() + '/favicon.ico',
    getContextPath() + '/webjars/bootstrap/4.5.2/css/bootstrap.min.css',
    getContextPath() + '/webjars/jquery/3.5.1/jquery.min.js',
    getContextPath() + '/webjars/bootstrap/4.5.2/js/bootstrap.min.js',
];
const MUTABLE_APPSHELL = [
    getContextPath() + '/'
];

const CACHE_LIST = [...IMMUTABLE_APPSHELL, ...MUTABLE_APPSHELL];

// self = ServiceWorkerGlobalScope , self => window , 일반 스크립트와 웹 워커의 실행 컨텍스트 차이로 self는 서로 다른 객체임.
self.addEventListener('install', (event) => {
    console.log('Sevice Worker - install', VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_LIST);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker - activate', VERSION);

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                // 캐시 이름이 CACHE_NAME이 아닌 경우 삭제
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    )
});

// 네트워크 및 캐시 업데이트
self.addEventListener('fetch', (event) => {
    // event.respondWith(
    //     caches.open(CACHE_NAME).then((cache) => {
    //         return fetch(event.request).then((networkResponse) => {
    //             // 응답 복제 후 캐시 업데이트
    //             cache.put(event.request, networkResponse.clone());
    //             return networkResponse;
    //         }).catch(()=> {
    //             // 네트워크 문제 발생 시 캐시에서 응답
    //             return cache.match(event.request);
    //         })
    //     })
    // )
});

// 선캐시, 후 네트워크 응답
// self.addEventListener('fetch', (event) => {
//     console.log('Service Worker - fetch', event.request.url);
//
//     const url = new URL(event.request.url);
//
//     // 자주 변경되지 않는 리소스의 경우
//     if (IMMUTABLE_APPSHELL.includes(url.pathname)) {
//         // 선캐시, 후 네트워크 응답
//         event.respondWith( // 브라우저의 기본 요청을 막고 서비스 워커에서 리소스를 대신 응답하기 위해 사용하는 메서드
//             caches.match(event.request).then((response) => {
//                 // request : 브라우저에서 요청한 정보를 나타내는 객체
//                 // response 가 존재할 경우 response를 존재하지 않을겨우 request를 반환
//                 return response || fetch(event.request);
//             })
//         );
//     }
//
// });

function getContextPath() {
    let hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
};