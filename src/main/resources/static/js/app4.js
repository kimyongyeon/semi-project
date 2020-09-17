class App4 {

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
}

let app4 = new App4();
