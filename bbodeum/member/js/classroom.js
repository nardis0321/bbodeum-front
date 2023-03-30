$(() => {
    $('aside>ul>li.info').on('click',()=>{
        $('section').load("./info.html");
    })
    $('aside>ul>li.doglist').on('click',()=>{
        $('section').load("../dogs/list.html");
    })
    $('aside>ul>li.applylist').on('click',()=>{
        $('section').load("../dogs/applies.html");
    })

    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 START--
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'user/check',
        error: function(xhr){
            alert('로그인 먼저 하세요')
        location.href=frontURL+'member/login.html'
        }
    });
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 END--
})