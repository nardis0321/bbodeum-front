$(()=>{
    //-- info 가져오기 START--
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url:backURL+'user/account',
        method: 'get',
        success: function(jsonObj){
            //응답 읽기
            let memPwd = jsonObj.memPwd;
            let memName = jsonObj.memName;
            let memPhone = jsonObj.memPhone;
            let memEmail = jsonObj.memEmail;

            //응답 쓰기
            $('div.memPwd').find('input').attr('value', memPwd)
            $('div.memName').find('input').attr('value', memName)
            $('div.memPhone').find('input').attr('value', memPhone)
            $('div.memEmail').find('input').attr('value', memEmail)
            console.log($('div.memId>input').val())
            // console.log($('div.memInfoBox>form>div.memId>input').val())
            
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })
    //-- info 가져오기 END--
    
    //-- 수정 버튼 클릭 되었을때 할일 START--
    let $form = $('div.memInfoBox>form')
    $form.on('click', 'input[name=editBtn]', ()=>{
        let newId = $('div.memId>input').val()
        // let newPwd = $('div.memPwd>input').val()
        let newName = $('div.memName>input').val()
        let newTel = $('div.memTel>input').val()
        let newEmail = $('div.memEmail>input').val()
        let data = {
            'memId': newId
            // ,'memPwd':newPwd
            ,'memName':newName
            ,'memTel':newTel
            ,'memEmail':newEmail
        } 

        $.ajax({
            url: backURL + 'user/account',
            method: 'patch',
            data : JSON.stringify(data),
            contentType: 'application/json',
            success: function(jsonObj){
                alert('회원정보 수정이 완료되었습니다.')
            },
            error: function(xhr){
                alert('오류' + xhr.status)
            } 
        })
    })
    //-- 수정 버튼 클릭 되었을때 할일 END--

    //-- 삭제 버튼 클릭 되었을때 할일 START --
    $form.on('click', 'input[name=accountCloseBtn]', ()=>{
        if(confirm('정말 탈퇴하시겠습니까?')){
        let id = 'memId='+$('input[name=memId]').val()
        $.ajax({
            url: backURL + 'member/delete',
            method: 'post',
            data : id,
            success: function(jsonObj){
                alert('지금까지 뽀듬을 이용해주셔서 감사합니다.')
                location.href=frontURL+'main/html/index.html'
            },
            error: function(xhr){
                alert('오류' + xhr.status)
            } 
        })
        }
    })
    //-- 삭제 버튼 클릭 되었을때 할일 END --
})