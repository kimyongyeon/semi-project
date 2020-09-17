// bootstrap + jquery
class App3 {
    constructor() {
        this.eventListner();

        let formData = {
            searchCondition: '',
            searchKeyword: ''
        }
        this.fnSearch(formData);
    }

    eventListner() {
        commonUtil.fnAlertSuccess('App3 class start');
        $('#btnSearch').on('click', (e) => {
            e.preventDefault();
            commonUtil.fnAlertSuccess('btnSearch 클릭');

            let formData = {
                searchCondition: '',
                searchKeyword: ''
            }
            this.fnSearch(formData);

        });

        $('#btnSelect').on('click', (e) => {
            e.preventDefault();
            commonUtil.fnAlertSuccess('btnSelect 클릭');


        });
    }

    fnSelect(name) {
        commonUtil.fnAlertSuccess(name + ' 선택 하셨습니다.');
    }

    fnSearch(formData) {
        $.ajax({
            type: "GET",
            url: commonUtil.getContextPath() + "/booking/find",
            data: formData,
            success: function (data) {
                commonUtil.fnAlertSuccess("조회가 정상 처리 되었습니다.");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                commonUtil.fnAlertDanger(xhr.status);
            }
        });
    }
}

let app3 = new App3();