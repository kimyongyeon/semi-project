class App4 {

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }

    constructor() {

        this.eventListener();

        console.log('app4.js start');

        let temp = JSON.parse(commonUtil.localRead('temp')) || '';
        console.log(typeof temp);
        if (typeof temp !== 'string') {
            $('#txtUserName').val(temp['name']);
            $('#txtEmail').val(temp['email']);
            $('#txtId').val(temp['id']);
            $('#txtBirth').val(temp['birth']);
            $('#txtStartDate').val(temp['startDate']);
            $('#txtStartDateTime').val(temp['startDateTime']);
            $('#txtEndDate').val(temp['endDate']);
            $('#txtEndDateTime').val(temp['endDateTime']);
        }

        let param = this.getUrlParams();
        if (param.id) // 상세보기와 입력 화면 구분
            this.fnFindById(param.id);
    }

    fnFindById(id) {
        $.ajax({
            type: "GET",
            url: commonUtil.getContextPath() + "/booking/findId",
            data: {id:id},
            success: (data) => {
                commonUtil.fnAlertSuccess("조회가 정상 처리 되었습니다.");
                console.log(data);
                this.fnDetail(data);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                commonUtil.fnAlertDanger(xhr.status);
            }
        });
    }

    eventListener() {

        $("#btnSave").on("click", (e) => {

            e.preventDefault();

            let name = $("#txtUserName").val();
            let email = $("#txtEmail").val();
            let id = $("#txtId").val();
            let birth = $("#txtBirth").val();
            let startDate = $("#txtStartDate").val();
            let startDateTime = $("#txtStartDateTime").val();
            let endDate = $("#txtEndDate").val();
            let endDateTime = $("#txtEndDateTime").val();

            let formData = {
                name: name,
                email: email,
                userId: id,
                birth: birth,
                startDate: startDate,
                startDateTime: startDateTime,
                endDate: endDate,
                endDateTime: endDateTime
            };

            // 서버 전송?
            // ajax called
            $.ajax({
                type: "POST",
                url: commonUtil.getContextPath() + "/booking/post",
                // dataType: "json",
                data: formData,
                success: function (data) {
                    commonUtil.fnAlertSuccess("저장이 정상 처리 되었습니다.");
                    commonUtil.localRemove('temp');
                    // 화면이동
                    location.replace('/web1/page/app3')
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    commonUtil.fnAlertDanger(xhr.status);
                }
            });
        });

        $("#btnTempSave").on('click', (e) => {

            // 임시저장
            let name = $("#txtUserName").val();
            let email = $("#txtEmail").val();
            let id = $("#txtId").val();
            let birth = $("#txtBirth").val();
            let startDate = $("#txtStartDate").val();
            let startDateTime = $("#txtStartDateTime").val();
            let endDate = $("#txtEndDate").val();
            let endDateTime = $("#txtEndDateTime").val();

            let temp = {
                name, email, id, birth, startDate, startDateTime, endDate, endDateTime
            }
            ;
            commonUtil.localRemove('temp');
            commonUtil.localSave('temp', JSON.stringify(temp));

            commonUtil.fnAlertSuccess('임시 저장이 처리 되었습니다.');
        });

        $("#btnInit").on('click', (e) => {
            // 초기화
            $('#txtUserName').val('');
            $('#txtEmail').val('');
            $('#txtId').val('');
            $('#txtBirth').val('');
            $('#txtStartDateTime').val('');
            $('#txtStartDate').val('');
            $('#txtEndDateTime').val('');
            $('#txtEndDate').val('');

            commonUtil.localRemove('temp');
        });
    }

    fnDetail(data) {
        $('#txtUserName').val(data.userName);
        $('#txtEmail').val(data.userEmail);
        $('#txtId').val(data.userId);
        $('#txtBirth').val(data.userBirth);
        $('#txtStartDateTime').val(data.startTime);
        $('#txtStartDate').val(data.startDate);
        $('#txtEndDateTime').val(data.endTime);
        $('#txtEndDate').val(data.endDate);
    }
}

let app4 = new App4();
