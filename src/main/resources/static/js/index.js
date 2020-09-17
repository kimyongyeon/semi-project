class Index {
    constructor() {
        console.log('class Index start');
        this.userList = [
            {id: 'user01', age: 5, name: 'Jhon'},
            {id: 'user02', age: 16, name: 'Amy'},
            {id: 'user03', age: 11, name: 'Tom'},
            {id: 'user04', age: 20, name: 'Jessica'},
            {id: 'user05', age: 18, name: 'Ellis'},
        ];

        this.dbInit();
    }

    dbInit() {
        let db = null;
        const DB_VERSION = 1;
        const userList = this.userList;
        // 버전 1인 데이터베이스 오픈
        // 생성된 이름으로 데이터베이스 없을때 새로 만든다.
        const request = window.indexedDB.open('user-db', DB_VERSION);

        request.onerror = function(event) {
            console.error(event);
        };

        request.onsuccess = function(event) {
            db = request.result;
        }

        request.onupgradeneeded = function(event) {
            const db = request.result;
            const userStore = db.createObjectStore('user', {keyPath: 'id'});

            // 유저 데이터 객체 저장소에 저장
            console.log(userList);
            userList.map((user) => {
                userStore.add(user);
            });

            console.log('OLD', event.oldVersion);
            console.log('NEW', DB_VERSION);
        }
    }
}

let index = new Index();