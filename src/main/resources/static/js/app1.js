window.onload = () => {
    $("#btnSearch").click();
}

$("#btnCacheInit").on("click", function(e) {
    commonUtil.initCache();
    commonUtil.fnAlertSuccess("캐시 초기화가 완료 되었습니다.");
})

function btnDisabled(str, flag) {
    $("#btnSave").attr("disabled", flag);
    $("#btnDel").attr("disabled", flag);
    $("#btnCacheInit").attr("disabled", flag);
    $("#btnEdit").attr("disabled", flag);

    $("#" + str).attr("disabled", false);
}

$("#btnEdit").on("click", function (e) {

    e.preventDefault();
    btnDisabled("btnEdit", true);

    if ($(this).text() === "수정") {

        $(this).text("완료");
        $("#formEdit").attr("style","display:inline");
        formItemDisabled(false);

        let name = prompt("수정할 name을 입력 하시요") || "";

        if (name === "") {
            btnDisabled("false", false);
            fnEditFormInit();
            return;
        }

        fnDetail(name, (data) => {
            if (data.code === -1) {
                btnDisabled("false", false);
                fnEditFormInit();
                return;
            }
            $("#formEdit").attr("style","display:inline");
            $("#txtId").val(data.id);
            $("#txtName").val(data.name).focus();
            $("#txtPhone").val(data.phone);
            $("#txtCorp").val(data.corp);
        })
        return;
    } else if ($(this).text() === "완료") {

        let id = $("#txtId").val();
        if (!id) {
            commonUtil.fnAlertDanger("id가 존재하지 않습니다.");
            fnEditFormInit();
            return;
        }

        let name = $("#txtName").val();
        let phone = $("#txtPhone").val();
        let corp = $("#txtCorp").val();
        let form = {
            id: id, name: name, phone: phone, corp: corp
        };

        fnEdit(form, (data) => {
           $("#btnSearch").click();
           btnDisabled("false", false);
           fnEditFormInit();
        });
    }

});

$("#btnDel").on("click", function(e) {
   let q = confirm("삭제 하시겠습니까?");
   if (q) {
       let name = prompt("삭제할 이름을 입력 하시오.");
       fnDel(name);
   }
});

$("#btnSave").on("click", function (e) {
    e.preventDefault();

    if ($(this).text() === "저장") {
        $(this).text("완료");
        formItemDisabled(false);
        $("#txtName").focus();
        return;
    }

    let name = $("#txtName").val();
    let phone = $("#txtPhone").val();
    let corp = $("#txtCorp").val();

    if (name === "" || phone === "" || corp === "" ) {
        commonUtil.fnAlertDanger("데이터 입력을 하세요.");
        if (!name) {
            $("#txtName").focus();
            return;
        }
        if (!phone) {
            $("#txtPhone").focus();
            return;
        }
        if (!corp) {
            $("#txtCorp").focus();
            return;
        }
        return;
    }

    console.log(`[debug][formInput] ${name},${phone},${corp}`);

    let formData = {
        name: name, phone: phone, corp: corp, id: 0
    }

    let localDataFormData = {
        ...formData,
        state: 'WAIT'
    }
    let bizCard = commonUtil.localRead("bizCard") || [];
    bizCard.push(localDataFormData);
    commonUtil.localSave("bizCard", bizCard);

    // ajax called
    $.ajax({
        type: "POST",
        url: commonUtil.getContextPath() + "/biz/save",
        dataType: "json",
        data: formData,
        success: function (data) {
            commonUtil.fnAlertSuccess("저장이 정상 처리 되었습니다.");
            fnSearch(listDraw);
            fnEditFormInit();
            formItemDisabled(true);

            let bizCard = commonUtil.localRead("bizCard") || [];
            bizCard = bizCard.map(b => {
                b.state = "SUCCESS";
                return b;
            });
            commonUtil.localSave("bizCard", bizCard);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
            commonUtil.fnBatchSave();
            fnEditFormInit();
        }
    });

    $(this).text("저장");

});

$("#btnSearch").on("click", function (e) {
    e.preventDefault();
    fnSearch(listDraw);
    commonUtil.fnAlertSuccess("조회가 완료 되었습니다.");
});

function formItemDisabled(flag) {
    $("#txtName").attr('disabled', flag);
    $("#txtPhone").attr('disabled', flag);
    $("#txtCorp").attr('disabled', flag);
}

function fnEdit(form, callback) {
    $.ajax({
        type: "POST",
        url: commonUtil.getContextPath() + "/biz/edit",
        dataType: "json",
        data: form,
        success: function (data) {
            commonUtil.fnAlertSuccess("수정이 정상 처리 되었습니다.");
            callback(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
            fnEditFormInit();
        }
    });
}

function fnDetail(name, res) {
    $.ajax({
        type: "GET",
        url: commonUtil.getContextPath() + "/biz/detail",
        dataType: "html", // 데이터 받을때는 html으로 받아야 한다. json으로 하면 못받음.
        data: "name=" + name,
        success: function (data) {
            res(JSON.parse(data));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
            fnEditFormInit();
            res({code: -1})
        }
    });
}

function fnDel(name) {
    $.ajax({
        type: "POST",
        url: commonUtil.getContextPath() + "/biz/deleteName",
        dataType: "json",
        data: "name=" + name,
        success: function (data) {
            commonUtil.fnAlertSuccess("삭제가 정상 처리 되었습니다.");
            $("#btnSearch").click();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            commonUtil.fnAlertDanger(xhr.status);
            fnEditFormInit();
        }
    });
}

function fnSearch(res) {
    commonUtil.TTL = 3000;
    if (commonUtil.getCache(commonUtil.getContextPath() + "/biz/search") === "") {
        $.get(commonUtil.getContextPath() + "/biz/search", function(data, status){
            commonUtil.getCache(commonUtil.getContextPath() + "/biz/search", data);
            console.log("[$.get::fnSearch]: " + JSON.stringify(data) + "\nStatus: " + status);
            res(data);
        });
    } else {
        res(commonUtil.getCache(commonUtil.getContextPath() + "/biz/search"));

    }
}

function fnEditFormInit() {
    $("#formEdit").attr("style","display:none");
    $("#btnEdit").text("수정");
    formItemDisabled(true);
    $("#txtId").val("");
    $("#txtName").val("");
    $("#txtPhone").val("");
    $("#txtCorp").val("");
}

function listDraw(data) {
    console.log("[listDraw]: " + JSON.stringify(data));
    let liHtml = "";
    data.map(i => {
        liHtml += `
            <li>${i.name} | ${i.phone} | ${i.corp}</li>
        `
    });
    $("#searchList").html("");
    $("#searchList").html(liHtml);
}



