let btnEditState = true;
$("#btnEdit").on("click", function (e) {
    e.preventDefault();
    if (btnEditState) {
        let name = $("#txtName").val();
        fnDetail(name, (data) => {
            console.log(data);
            $(this).text("완료");
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

});

$("#btnSave").on("click", function (e) {
    e.preventDefault();

    let name = $("#txtName").val();
    let phone = $("#txtPhone").val();
    let corp = $("#txtCorp").val();

    console.log(`[debug][formInput] ${name},${phone},${corp}`);

    let formData = {
        name: name, phone: phone, corp: corp
    }

    // ajax called
    $.post("/biz/save", formData,
        function (data, status) {
            console.log(typeof status, status);
            fnSeach(listDraw);
            console.log("formInput save end");
        });

});

$("#btnSearch").on("click", function (e) {
    e.preventDefault();
    fnSeach(listDraw);
});

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

function fnSeach(res) {
    $.get("/biz/search", function(data, status){
        console.log("[fnSeach]: " + JSON.stringify(data) + "\nStatus: " + status);
        res(data);
    });
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


