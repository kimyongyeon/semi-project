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
        $('#btnSave').on('click', (e) => {
           e.preventDefault();
           commonUtil.fnAlertSuccess('btnSave 클릭');
        });
        $('#btnSort').on('click', (e) => {
           e.preventDefault();
        });
    }

    fnSort(name) {
        commonUtil.fnAlertSuccess(name + ' 선택 하셨습니다.');
        let val = '';
        if (name === 'userName') {
            val = '이름';
        } else if (name === 'userId') {
            val = '아이디';
        } else if (name === 'userIdx') {
            val = '순번';
        } else if (name === 'userSort') {
            val = '정렬';
        }
        $('#btnSort').text(val);
        this.fnSortSearch({
            sort: name === 'userSort' ? '' : name
        });
    }

    fnSortSearch(formData) {
        $.ajax({
            type: "GET",
            url: commonUtil.getContextPath() + "/booking/findBySort",
            data: formData,
            success: (data) => {
                commonUtil.fnAlertSuccess("조회가 정상 처리 되었습니다.");
                console.log(data);
                this.fnListDraw(data);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                commonUtil.fnAlertDanger(xhr.status);
            }
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
            success: (data) => {
                commonUtil.fnAlertSuccess("조회가 정상 처리 되었습니다.");
                console.log(data);
                this.fnListDraw(data);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                commonUtil.fnAlertDanger(xhr.status);
            }
        });
    }

    fnSelect(data) {
        return `
            <select class='state__sel'>
                <option value="${data === 'WAIT' ? 'selected' : ''}">대기</option>
                <option value="${data === 'ONGOING' ? 'selected' : ''}">처리중</option>
                <option value="${data === 'COMPLETE' ? 'selected' : ''}">완료</option>
            </select>
        `;
    }

    fnListDraw(data) {
        $('#tbl_result_list').html('');
        let trHtml = '';
        data.map(b => {
            trHtml += `
                <tr>
                    <td><a href=${commonUtil.getContextPath() + '/page/app4?id=' + b.id}>${b.id}</a></td>
                    <td>${b.userName}</td>
                    <td>${b.userEmail}</td>
                    <td>${b.userId}</td>
                    <td>${b.userBirth}</td>
                    <td>${this.fnSelect(b.currentState)}</td>
                    <td>${b.regDate}</td>
                </tr>
            `;
        });
        $('#tbl_result_list').html(trHtml);
    }
}

let app3 = new App3();