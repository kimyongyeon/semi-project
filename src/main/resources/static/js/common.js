class Common {

    constructor() {
        this.subMenuFlag = false;
        this.cacheList = {};
        this.TTL = 1000 * 60;
        // this.fnBatchSave();

        $("#btnTop").on("click", function(e) {
            $('body,html').animate({scrollTop: 0}, 800);
        });

        // @ch4. 서비스 워커 등록
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register(this.getContextPath() + '/service-worker.js')
                // , { scope: '/web1/js/'})
                .then((register) => {
                    // 등록 완료
                    // console.log('serviceWorker register complete ', register);
                });
        }

        window.addEventListener('online', this.updateOnlineState);
        window.addEventListener('offline', this.updateOnlineState);
        this.updateOnlineState();

    }

    updateOnlineState() {
        console.log('updateOnlineState', navigator.onLine);
        // 네트워크 상태 체크
        if (navigator.onLine) {
            this.fnAlertSuccess("온라인 상태 입니다.");
        } else {
            this.fnAlertDanger("오프라인 상태 입니다.");
        }

    }

    fnBatchSave() {
        setTimeout(() => {
            console.log("fnBatchSave start");
            let bizCard = this.localRead("bizCard") || [];
            console.log(bizCard);

            bizCard = bizCard.filter(b => b.state === "WAIT");
            console.log(bizCard);

            bizCard.map(b => {
                $.post(this.getContextPath() + "/biz/save", b, (d, s) => {
                    bizCard.filter(waitBizCard => waitBizCard.name === b.name)
                        .map(waitBizCard => waitBizCard.state = "SUCCESS")
                    bizCard = [...bizCard];
                    this.localSave("bizCard", bizCard);
                });
            })

            // this.fnBatchSave();
            // bizCard
            //     .filter(b => b.state === "WAIT")
            //     .map(b => {
            //         $.post(this.getContextPath() + "/biz/save", b, (d, s) => {
            //             let bizCard = this.localRead("bizCard") || [];
            //             for (let i=0; i<bizCard.length; i++) {
            //                 if (bizCard[i].name === d.name) {
            //                     bizCard[i].state = "SUCCESS";
            //                     bizCard.push(bizCard[i]);
            //                 }
            //             }
            //             this.localSave("bizCard", bizCard);
            //             console.log("fnBatchSave complete");
            //             //commonUtil.localSave("bizCard", bizCard);
            //         });
            //     });

        }, 5000);
    }

    fnAlertSuccess(str) {

        setTimeout(() => {
            $("#alert__show").html('');
        }, 10000);

        str = str || 'Indicates a successful or positive action.';
        let htmlDraw = `
         <div class="alert alert-success alert-dismissible" >
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> ${str}
        </div>
        `;

        $("#alert__show").append(htmlDraw);
    }

    fnAlertDanger(str) {

        setTimeout(() => {
            $("#alert__show").html('');
        }, 10000);

        str = str || 'This alert box could indicate a dangerous or potentially negative action.';
        let htmlDraw = `
        <div class="alert alert-danger alert-dismissible" >
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Danger!</strong> ${str}
        </div>
        `;

        $("#alert__show").append(htmlDraw);
    }

    localSave(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    localRead(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    localRemove(key) {
        return localStorage.removeItem(key);
    }

    getContextPath() {
        let hostIndex = location.href.indexOf( location.host ) + location.host.length;
        return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
    };

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

    subMenuShow(str) {
        if (str === 'app3') {
            if (!this.subMenuFlag) {
                $("#subMenu__app3").attr('style', "display:visible;");
                this.subMenuFlag = true;
            } else {
                $("#subMenu__app3").attr('style', "display:none;");
                this.subMenuFlag = false;
            }

        }
    }

    encode (str) {
        return btoa(str);
    }

    decode (str) {
        return atob(str);
    }
}

window.commonUtil = new Common();