$(()=>{
    //-- 로그인 버튼 클릭 되었을때 할일 START--
    let $form = $('div.loginBox>form')
    $form.on('click', 'input[name=loginBtn]', ()=>{
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
                if(jsonObj.trName != null){
                    alert(jsonObj.trName+'님 환영합니다')
                    location.href=frontURL+'main/html/index.html'
                } else {
                    alert(jsonObj.msg)
                    console.log(jsonObj.msg)
                }
            },
            error: function(xhr){
                alert('오류' + xhr.status)
            } 
        })
    })
    //-- 로그인 버튼 클릭 되었을때 할일 END--
})