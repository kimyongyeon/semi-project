window.onload = () => {

    this.likeCnt = 0;
    this.dislikeCnt = 0;

    fnSearch();
    $("#formData").draggable();
}

$("#btnDel").on("click", function (e) {

    e.preventDefault();
    // ajax called
    $.ajax({
        type: "POST",
        url: commonUtil.getContextPath() + "/guestbook/del",
        // dataType: "json", // 받는 타입을 동적으로 받는 경우
        data: {},
        success: function (data) {
            commonUtil.fnAlertSuccess("삭제가 정상 처리 되었습니다.");
            $("#formList ul").html('');
            fnSearch();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
            $("#formList ul").html('');
        }
    });
});

function getPersonName() {
    // ajax called
    return $.ajax({
        type: "GET",
        url: commonUtil.getContextPath() + "/js/dumy.json",
        // dataType: "json",
        data: {},
        success: function (data) {
            commonUtil.fnAlertSuccess("저장이 정상 처리 되었습니다.");
            fnSearch();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
        }
    });
}

function fnPost(formData) {
    return $.ajax({
        type: "POST",
        url: commonUtil.getContextPath() + "/guestbook/save",
        // dataType: "json",
        data: formData,
        success: function (data) {
            commonUtil.fnAlertSuccess("저장이 정상 처리 되었습니다.");
            fnSearch();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
        }
    });
}

$("#btnSave").on("click", async function (e) {

    e.preventDefault();

    let rndName = await getPersonName();

    let txtName = $("#txtName").val() || rndName['person'][rando(1000)]['first_name'];
    let txtMemo = $("#txtMemo").val() || rndName['person'][rando(1000)]['email'];

    let formData = {
        id: 0, name: txtName, memo: txtMemo
    };
    // ajax called
    await fnPost(formData);
});

// $(document).ready(function () {
//     $(function () {
//         $('#homeup').click(function () {
//             $('body,html').animate({scrollTop: 0}, 800);
//             return false;
//         });
//         var scrollHeight = $(document).height();
//         $('#homedown').click(function () {
//             $('body,html').animate({scrollTop: scrollHeight}, 800);
//             return false;
//         });
//     });
// });

function fnEvent(e, n, uid) {
    commonUtil.fnAlertSuccess(`event: ${e}, name: ${n}`, uid);

    if (this.likeCnt <= 0) {
        this.likeCnt = 0;
    }
    if (this.dislikeCnt <= 0) {
        this.dislikeCnt = 0;
    }

    function liDraw(item) {
        $(`#feel_id_${item.uid}`).html('');
        if (item === '') {
            return `
                    <i class="far fa-thumbs-up" onclick='fnEvent("L", "${item.n}", "${item.uid}");'> 0</i>  
                    <i class="far fa-thumbs-down" onclick='fnEvent("D", "${item.n}", "${item.uid}");'> 0</i>
                    <i class="fas fa-share"> 공유</i> 
                    <i class="far fa-bookmark"> 북마크</i>
                `;
        } else {
            return `
                     <i class="${item.up} fa-thumbs-up" onclick='fnEvent("L", "${item.n}", "${item.uid}");'> ${item.upCnt}</i>  
                     <i class="${item.down} fa-thumbs-down" onclick='fnEvent("D", "${item.n}", "${item.uid}");'> ${item.downCnt}</i> 
                     <i class="fas fa-share"> 공유</i> 
                     <i class="far fa-bookmark"> 북마크</i>
                `;
        }
    }

    function fnFeel(fas, n, uid) {

        let like = {
            up: '',
            down: '',
            upCnt: '',
            downCnt: '',
            n: '',
            uid: '',
        }

        let dis = {
            up: '',
            down: '',
            upCnt: '',
            downCnt: '',
            n: '',
            uid: '',
        }

        if (fas === 'L') {
            if ($(`#feel_id_${uid} > i:nth-child(1)`).attr('class').indexOf('far') > -1) {
                like.up = 'fas';
                like.down = 'far';
                like.upCnt = this.likeCnt + 1;
                like.downCnt = (this.dislikeCnt - 1) < 0 ? 0 : this.dislikeCnt - 1;
                like.n = n;
                like.uid = uid;
            } else {
                like.up = 'far';
                like.down = 'far';
                like.upCnt = (this.likeCnt - 1) < 0 ? 0 : this.likeCnt - 1;
                like.downCnt = this.dislikeCnt;
                like.n = n;
                like.uid = uid;
            }
            return liDraw(like);

        } else if (fas === 'D') {
            if ($(`#feel_id_${uid} > i:nth-child(2)`).attr('class').indexOf('far') > -1) {
                dis.up = 'far';
                dis.down = 'fas';
                dis.upCnt = (this.likeCnt - 1) < 0 ? 0 : this.likeCnt - 1;
                dis.downCnt = this.dislikeCnt + 1;
                dis.n = n;
                dis.uid = uid;
            } else {
                dis.up = 'far';
                dis.down = 'far';
                dis.upCnt = this.likeCnt;
                dis.downCnt = (this.dislikeCnt - 1) < 0 ? 0 : this.dislikeCnt - 1;
                dis.n = n;
                dis.uid = uid;
            }
            return liDraw(dis);

        } else {
            return liDraw('');

        }
    }

    if (e === 'L') {
        // console.log( $(`#feel_id_${n} > i:nth-child(1)`).attr('class').indexOf('far') > -1 ); // 좋아요 누르기 전
        // 좋아요 버튼 색을 채운다.
        // 좋아요 값 증가+1, 싫어요 값 감소-1
        $(`#feel_id_${uid}`).html(fnFeel('L', n, uid));

    } else if (e === 'D') {

        // 싫어요 버튼 색을 채운다.
        // 싫어요 값 증가+1, 좋아요 값 감소-1
        $(`#feel_id_${uid}`).html(fnFeel('D', n, uid));
    }
}

function fnShare(n) {
    commonUtil.fnAlertSuccess(`${n} 공유 합니다.`);
}

function fnBookmark(n) {
    commonUtil.fnAlertSuccess(`${n} 북마크 합니다.`);
}

function fnDraw(data) {

    data = JSON.parse(data);
    $("#formList ul").html('');
    data.map(l => {
        let uid = guid();
        $("#formList ul").append(`
            <li class="list-group-item">
                <p><i class="fas fa-user-circle"></i> <strong>${l.name}</strong> 1초전</p>
                <p>${l.memo}</p>
                <p id="feel_id_${uid}">
                    <i class="far fa-thumbs-up" onclick="fnEvent('L', '${l.name}', '${uid}');"> ${this.likeCnt}</i>  
                    <i class="far fa-thumbs-down" onclick="fnEvent('D', '${l.name}', '${uid}');"> ${this.dislikeCnt}</i> 
                    <i class="fas fa-share" onclick="fnShare('${l.name}')"> 공유</i> 
                    <i class="far fa-bookmark" onclick="fnBookmark('${l.name}')"> 북마크</i> 
                </p>
            </li>
        `)
    });
    if ($('#formList ul li').length > 3) {
        $('#formList ul').attr('style', 'flex-direction:column-reverse');
    } else {
        $('#formList ul').attr('style', 'flex-direction:column');
    }
    $('#formList ul').animate({scrollTop: 0}, 100);
}

function guid() {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


function fnSearch() {

    // ajax called
    $.ajax({
        type: "GET",
        url: commonUtil.getContextPath() + "/guestbook/find",
        dataType: "html",
        data: {},
        success: function (data) {
            commonUtil.fnAlertSuccess("조회가 정상 처리 되었습니다.");
            fnDraw(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
        }
    });
}