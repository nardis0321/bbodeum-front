$(()=>{
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 ajax START--
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + '/user/check',
            success: function () {
                alert('이미 로그인 되어 있습니다')
                location.href=frontURL+'common/main.html'
            }
        });
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 ajax END--

    //-- 로그인 버튼 클릭 되었을때 할일 START--
    let $form = $('div.loginBox>form')
    $form.on('click', 'input[name=loginBtn]', ()=>{
        let memId = $('input[name=memId]').val()
        if(memId.startsWith('TR')){
            if(!memId.includes('@')){
                //트레이너 로그인
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: backURL + 'trainer/signin',
                    method: 'post',
                    data : JSON.stringify({
                        "trId": $('input[name=memId]').val(),
                        "trPwd": $('input[name=memPwd]').val()
                    }),
                    contentType: 'application/json',
                    success: function(jsonObj){
                            alert(jsonObj.trName+'님 환영합니다')
                            location.href=frontURL+'course/write.html'
                    },
                    error: function(xhr){
                        alert('오류' + xhr.responseText)
                    } 
                })
            }else {
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: backURL + 'user/signin',
                    method: 'post',
                    data : JSON.stringify({
                        "memEmail": $('input[name=memId]').val(),
                        "memPwd": $('input[name=memPwd]').val()
                    }),
                    contentType: 'application/json',
                    success: function(jsonObj){
                        alert(jsonObj.memName+'님 환영합니다')
                        localStorage.setItem('name', jsonObj.memName)
                        localStorage.setItem('email', jsonObj.memEmail)
                        location.href=frontURL+'common/main.html'
                    },
                    error: function(xhr){
                        alert(xhr.responseText)
                    } 
                })
            }
        }
    })
    //-- 로그인 버튼 클릭 되었을때 할일 END--
})