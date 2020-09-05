let btnEditState = true;
$("#btnCacheInit").on("click", function(e) {
    commonUtil.initCache();
})
$("#btnEdit").on("click", function (e) {
    e.preventDefault();

    if ($(this).text() === "수정") {
        $(this).text("완료");
        $("#formEdit").attr("style","display:inline");
        formItemDisabled(false);
        return;
    }

    let id = $("#txtId").val();
    if (!id) {
        alert("id가 존재하지 않습니다.");
        formItemDisabled(true);
        $("#formEdit").attr("style","display:none");
        $(this).text("수정");
        return;
    }

    if (btnEditState) {
        let name = $("#txtName").val();
        fnDetail(name, (data) => {
            console.log(data);
            $(this).text("수정");
            $("#formEdit").attr("style","display:inline");
            $("#txtId").val(data.id);
            $("#txtName").val(data.name).focus();
            $("#txtPhone").val(data.phone);
            $("#txtCorp").val(data.corp);
        })
        btnEditState = false;
    } else {
        fnEditFormInit();
    }

    $(this).text("수정");

});

$("#btnDel").on("click", function(e) {
   let q = confirm("삭제 하시겠습니까?");
   if (q) {
       let name = $("#txtName").val();
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
        alert("반드시 값을 입력하시오.");
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
        name: name, phone: phone, corp: corp
    }

    // ajax called
    $.post("/biz/save", formData,
        function (data, status) {
            console.log(typeof status, status);
            fnSearch(listDraw);
            console.log("formInput save end");
            formItemDisabled(true);
        });

    $(this).text("저장");

});

$("#btnSearch").on("click", function (e) {
    e.preventDefault();
    fnSearch(listDraw);
});

function formItemDisabled(flag) {
    $("#txtName").attr('disabled', flag);
    $("#txtPhone").attr('disabled', flag);
    $("#txtCorp").attr('disabled', flag);
}

function fnDetail(name, res) {
    $.ajax({
        type: "GET",
        url: "/biz/detail",
        dataType: "html",
        data: "name=" + name,
        success: function (data) {
            res(JSON.parse(data));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            fnEditFormInit();
        }
    });
}

function fnDel(name) {
    $.ajax({
        type: "POST",
        url: "/biz/deleteName",
        dataType: "json",
        data: "name=" + name,
        success: function (data) {
            alert("삭제가 성공 하였습니다.");
            $("#btnSearch").click();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            fnEditFormInit();
        }
    });
}

function fnSearch(res) {
    commonUtil.TTL = 3000;
    if (commonUtil.getCache("/biz/search") === "") {
        $.get("/biz/search", function(data, status){
            commonUtil.getCache("/biz/search", data);
            console.log("[$.get::fnSearch]: " + JSON.stringify(data) + "\nStatus: " + status);
            res(data);
        });
    } else {
        res(commonUtil.getCache("/biz/search"));

    }
}

function fnEditFormInit() {
    $("#formEdit").attr("style","display:none");
    $(this).text("수정");
    $("#txtId").val("");
    $("#txtName").val("");
    $("#txtPhone").val("");
    $("#txtCorp").val("");
    btnEditState = true;
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


