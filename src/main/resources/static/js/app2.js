window.onload = () => {
    fnSearch();
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

$("#btnSave").on("click", function (e) {

    e.preventDefault();

    let txtName = $("#txtName").val();
    let txtMemo = $("#txtMemo").val();

    let formData = {
        id:0, name: txtName, memo: txtMemo
    };

    // ajax called
    $.ajax({
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

function fnDraw(data) {

    data = JSON.parse(data);
    $("#formList ul").html('');
    data.map(l => {
        $("#formList ul").append(`
            <li class="list-group-item">
                <p>제목: ${l.name}</p>
                <p>내용: ${l.memo}</p>
            </li>
        `)
    });
    var scrollHeight = $(document).height();
    $('body,html').animate({scrollTop: scrollHeight}, 800);

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