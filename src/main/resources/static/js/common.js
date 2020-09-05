class Common {

    constructor() {
        this.cacheList = {};
        this.TTL = 1000 * 60;
    }

    localSave(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    localRead(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * key: url, value: jsonList
     * @param key
     * @param value
     * @returns {*}
     */
    getCache(key, value) {
        const resultError = {
            code: 1, msg: "error"
        }
        try {

            // 기본 TTL 주기는 1분인데... 만약 필요시 트리거를 통해서 초기화 하라.
            setTimeout(()=> this.initCache(), this.TTL);
            if (value === undefined) {
                if (this.cacheList[key] === undefined) {
                    return "";
                }
                return JSON.parse(this.cacheList[key]);
            }
            if (typeof value === "object") {
                value = JSON.stringify(value); // {'usr/path', '{key:1, value:2}'} => {'usr/path', '[Object object]'
            }
            if (this.cacheList[key] !== value) {
                this.cacheList[key] = value;
            }
            return JSON.parse(this.cacheList[key]); // string -> json object
        } catch (e) {
            console.error(e);
            return resultError.msg(e);
        }
    }

    initCache() {
        this.cacheList = {};
    }
}

window.commonUtil = new Common();