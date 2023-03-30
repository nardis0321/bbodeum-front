$(() => {
    let queryStr = location.search.substring(1)
    let queryArr = queryStr.split('=')
    let courseQuery = queryArr[1]
    let courseArray = courseQuery.split('&')
    let courseId = courseArray[0]
    if (courseId == null || '') {
        alert('잘못된 경로입니다. 교육 먼저 선택해주세요.')
        location.href = frontURL + 'course/list.html'
        return
    }
    let price = queryArr[2]
    if (price == null || '') {
        alert('잘못된 경로입니다.')
        location.href = frontURL + 'course/list.html'
        return
    } else {
        price = price * 10000
    }

    // -- 목록 요청 START --
    showList()
    // -- 목록 요청 END --

    // -- 페이지 번호 클릭 START --
    function showDog(dogId) {
        let $dog = $('#' + dogId + "'")//.first()
        // console.log('보여줄' + $dog)
    }


    // -- 페이지 번호 클릭 END --

    //---ajax함수 시작---
    function showList() {
        let $origin = $('div.dog').first()
        $('div.dog').not(':first-child').remove()
        $origin.show() //원본 보이게 하기

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'dog',
            method: 'get',
            success: function (jsonObj) {
                let list = jsonObj

                let $origin = $('div.dog').first()
                let $parent = $('div.doglist')
                // let idList = [];
                $(list).each((index, elementP) => {
                    let id = elementP.dogId
                    // idList.push(id);
                    let dogName = elementP.dogName;
                    let dogWeight = elementP.dogWeight;
                    let dogBday = elementP.dogBday;
                    let dogBreed = elementP.dogBreed;

                    let $copy = $origin.clone()
                    // $copy.attr('onclick', 'location.href="'+frontURL+'course/detail.html?'+id+'"')
                    // $copy.attr('id', id)
                    let originHtml = $copy.html()
                    $copy.html('🐾' + dogName + originHtml)
                    // $copy.find('div.dogName').html(dogName) 
                    $copy.find('div.dogId').html(id)
                    $copy.find('div.dogWeight').html(dogWeight + 'kg') //'⚖️'
                    $copy.find('div.dogBday').html(dogBday + '생') //'🎂'+
                    $copy.find('div.dogBreed').html(dogBreed)
                    $copy.find('div').hide()
                    let $doginfo = $('div.doginfo')
                    $parent.append($copy)
                    $doginfo.append($copy)
                })
                $origin.hide()

                //------- 반려견 이름 클릭 Start ------
                $('div.dog').on('click', (e) => {
                    let id = $(e.target).attr('id')
                    let $dog = $(e.target)
                    let $clone = $dog.clone()
                    let $doginfo = $('span.doginfo')
                    $clone.find('div').show()
                    $clone.find('div.dogId').hide()
                    $doginfo.html($clone)
                })
                //------- 반려견 이름 클릭 end ------

                //-------- 신청 버튼 클릭 start --------
                $('div.dogListBox>button').on('click', (e) => {
                    let $doginfo = $('span.doginfo')
                    let dogId = $doginfo.find('div.dogId').html()
                    // let dogId = $('span.doginfo>div.dogId').html()
                    // alert(dogId)
                    let data = {
                        "d": dogId,
                        "c": courseId,
                    }
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        url: backURL + 'applies/check',
                        method: 'post',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (jsonObj) {
                            requestPay(dogId)
                        },
                        error: function (xhr) {
                            if(xhr.status==500){
                                alert('반려견을 선택해주세요')
                                return
                            }
                            alert(xhr.responseText)
                        }
                    })

                    // if(dogId == null){
                    //     alert('반려견을 선택해주세요')
                    //     return
                    // }
                    // let data = {
                    //     "d" : dogId,
                    //     "c" : courseId 
                    // }
                    // $.ajax({
                    //     xhrFields: {
                    //         withCredentials: true
                    //     },
                    //     url: backURL + 'applies/classes',
                    //     method: 'post',
                    //     data: JSON.stringify(data),
                    //     contentType: 'application/json',
                    //     success: function (jsonObj) {
                    //         alert("신청 되었습니다")
                    //     },
                    //     error: function(xhr){
                    //         // let jsonObj = JSON.parse(xhr.responseText)
                    //         // alert(jsonObj.msg)
                    //         alert(xhr.responseText)
                    //     } 
                    // })            
                })
                //-------- 신청 버튼 클릭 end --------
            },
            error: function (xhr) {
               
                alert(xhr.responseText)
                location.href = frontURL+'member/login.html'
            }
        })
    }
    //---ajax함수 끝---

    //------ 신청 버튼 클릭시 실행할 결제 함수 START ------
    // function pay() {
    // console.log('클릭은됨?')
    //결제 초기화
    var IMP = window.IMP;
    IMP.init("imp51202044");

    function requestPay(dogId) {
        //결제 고유번호 만들기
        var today = new Date();
        var yr = String(today.getFullYear());
        var month = String(today.getMonth());
        var date = String(today.getDate());
        var hours = String(today.getHours()); // 시
        var minutes = String(today.getMinutes());  // 분
        var seconds = String(today.getSeconds());  // 초
        var milliseconds = String(today.getMilliseconds());
        var makeMerchantUid = yr + month + date + hours + minutes + seconds + milliseconds;
        // console.log(makeMerchantUid)
        /** 결제 사전 검증 **/
        let data = {
            "merchant_uid": "IMP" + makeMerchantUid, // 가맹점 주문번호
            amount: price, // 결제 예정금액
            // "amount" : 1004, // 테스트용
        }
        $.ajax({
            url: backURL + 'payment/verify/pre',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (jsonObj) {
                // alert('결제 사전검증 성공')
                // alert(jsonObj.merchant_uid)

                /* 결제 요청 */
                IMP.request_pay({
                    pg: 'html5_inicis',     //결제PG
                    pay_method: 'card',
                    merchant_uid: jsonObj.merchant_uid, //사전검증 결제번호
                    name: '뽀듬 교육',
                    amount: jsonObj.amount, //사전검증 가격
                    buyer_email: localStorage.getItem('email'),
                    buyer_name: localStorage.getItem('name'),
                    notice_url : backURL+'payment/verify/webhook',   //웹훅수신 URL 설정
                }, function (rsp) { // callback
                    // alert('결제요청 성공')

                    if (rsp.success) { //결제 성공
                        /* 결제 사후 검증 */
                        data = {
                            "imp_uid": rsp.imp_uid,
                            "merchant_uid": rsp.merchant_uid,
                        }
                        $.ajax({
                            url: backURL + 'payment/verify/post',
                            method: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(data),
                            success: function (response) { //사후검증 성공
                                // alert('사후검증 성공')
                                
                                /** DB 작업 */
                                data = {
                                    "imp_uid": response.imp_uid,
                                    "merchant_uid": response.merchant_uid,
                                    "d": dogId,
                                    "c": courseId,
                                }
                                $.ajax({
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    url: backURL + 'applies/class',
                                    method: "POST",
                                    // header:{"Content-Type":"application/json"},
                                    contentType: "application/json",
                                    data: JSON.stringify(data),
                                    success: function () { //신청 db 작업
                                        alert('신청되셨습니다')
                                        window.location.reload();
                                    },
                                    error: function (xhr) { //db 실패
                                        // alert(xhr.status)
                                        alert(xhr.responseText)
                                    }
                                })
                            },
                            error: function () {
                                alert('잘못된 결제입니다 002') //사후검증 실패
                            }
                        })
                    } else {
                        alert(rsp.error_msg); //결제 실패
                    }
                })
            }, error: function () {
                alert('잘못된 결제입니다 001') //사전검증 실패
            }
        })
    }
    //------ 신청 버튼 클릭시 실행할 결제 함수 END ------
})