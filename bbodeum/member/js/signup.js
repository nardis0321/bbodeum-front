$(() => {
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 ajax START--
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + '/user/check',
        success: function () {
            location.href = frontURL + 'common/main.html'
            alert('이미 로그인 되어 있습니다')
        }
    });
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 ajax END--

    //--가입완료 클릭 되었을때 할일 START--
    let $form = $('div.signupBox>form')
    // console.log($form.html())
    $form.on('click', 'input[name=signUpBtn]', () => {
        // let formData = new FormData($form[0])
        // console.log(formData)
        // console.log(JSON.stringify(formData))
        //id 중복 체크
        let checkResult = $('div.idcheck').html()
        if (checkResult != "사용 가능한 아이디입니다.") {
            alert('id 중복체크를 해주세요')
            return;
        }
        // console.log(formData)
        // console.log(JSON.stringify(formData))
        //에이작스 통신
        let data = {
            'memEmail': $('div.memEmail>input').val(),
            'memPwd':   $('div.memPwd>input').val(),
            'memName':  $('div.memName>input').val(),
            'memPhone': $('div.memTel>input').val()
        }
        console.log(data)
        $.ajax({
            url: backURL + 'user/account/signup',
            method: 'post',
            data : JSON.stringify(data),
            //  data : JSON.stringify(formData),
            // data: formData,
            contentType: 'application/json',
            // processData : false,
            // contentType: false,
            success: function () {
                alert('회원가입이 완료되었습니다.')
                //강아지 정보 입력 페이지로 이동!
                location.href = frontURL + 'member/login.html'
            },
            error: function (xhr) {
                alert('왜 에러지')
                alert(xhr.status)
                // let jsonObj = JSON.parse(xhr.responseText)
                alert(xhr.responseText)
            }
        })
    })
    //--가입완료 클릭 되었을때 할일 END--

    //--아이디 중복체크 클릭 되었을때 할일 START--
    $form.on('click', 'input[name=idCheckBtn]', () => {
    // $form.on('change', 'input[name=memEmail]', () => {
        let id = $('div.memEmail>input[type=text]')
        // 이메일 유효성 검사
        var check_email = RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
        if (!check_email.test(id.val())) {
            alert('정확한 이메일을 입력해주세요.');
            $(id).val("");
            $(id).focus();
            $('div.idcheck').html('')
            return false;
        }
        // 이메일 중복 검사 에이작스
        $.ajax({
            url: backURL + 'user/account/check/' + id.val(),
            method: 'get',
            success: function (jsonObj) {
                if (jsonObj == false) {
                    $('div.idcheck').html('사용 가능한 아이디입니다.')
                } else {
                    $('div.idcheck').html('사용 불가능한 아이디입니다.')
                    $(id).val("");
                    $(id).focus();
                }
            },
            error: function (xhr) {
                let jsonObj = JSON.parse(xhr.responseText)
                alert(jsonObj.msg)
            }
        })
    })
    //--아이디 중복체크 클릭 되었을때 할일 END--
})