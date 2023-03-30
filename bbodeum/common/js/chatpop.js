$(()=>{
    $('#chatbtn').on('click',()=>{
        // $('#map').hide()
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'user/check',
            success: function () {
                showMenuAtLogined()
                window.open(frontURL+'common/chat.html','뽀듬 채팅', 'width=350, height=500, scrollbars=yes, top=150px, left=300px');
            },
            error: function(xhr){
                alert('로그인 먼저 하세요')
                showMenuAtLogouted()
            }
        });
    })

})