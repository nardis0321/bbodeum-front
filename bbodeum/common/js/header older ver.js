$(() => {
    console.log($('header>nav>ul>li.login'))
    checkLogined()
    
     //--로그인상태의 메뉴들 보여주기 함수 START--
     function showMenuAtLogined() {
        $('header>nav>ul>li.login').hide()
        $('header>nav>ul>li.logout').show()
        $('header>nav>ul>li.signup').hide()
        $('header>nav>ul>li.myclassroom').show()
    }
    //--로그인상태의 메뉴들 보여주기 함수 END--

    //--로그아웃상태의 메뉴들 보여주기 함수 START--
    function showMenuAtLogouted() {
        $('header>nav>ul>li.login').show()
        $('header>nav>ul>li.signup').show()
        $('header>nav>ul>li.logout').hide()
        $('header>nav>ul>li.myclassroom').hide()
    }
    //--로그아웃상태의 메뉴들 보여주기 함수 END--

    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 START--
    function checkLogined() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + '/user/check',
            success: function () {
                showMenuAtLogined()
            },
            error: function(xhr){
                showMenuAtLogouted()
            }
        });
    }
    //--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 END--
    
    //--5초간격으로 로그인여부확인하기 함수 START--    
    function checkIntervalLogined() {
        window.setInterval(checkLogined, 5000);
    }
    //--5초간격으로 로그인여부확인하기 함수 END--

    //-- 로그아웃 버튼 클릭 되었을때 할일 START--
    $('nav>ul>li.logout').on('click', () => {
        console.log('로그아웃 클릭됨')
        logout()
    })
    function logout() {
        $.ajax({
            url: 'http://192.168.0.176:8888/bbodeum/' + 'user/signout',
            method: 'get',
            success: function (result) {
                location.href='http://192.168.0.176:5500/bbodeum/'+'common/main.html'
            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })
    }
    //-- 로그아웃 버튼 클릭 되었을때 할일 END--
})