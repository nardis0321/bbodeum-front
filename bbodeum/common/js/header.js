//--- 헤더 메뉴 링크 START ---
$('a#mainlogo').attr('href', frontURL+'common/main.html')
$('li.courselist').html('<a href="'+frontURL+'course/list.html">교육 목록</a>')
$('li.myclassroom').html('<a href="'+frontURL+'member/classroom.html">내 강의실</a>')
$('li.login').html('<a href="'+frontURL+'member/login.html">로그인</a>')
$('li.signup').html('<a href="'+frontURL+'member/signup.html">회원가입</a>')
//--- 헤더 메뉴 링크 END ---

//-- 로그아웃 버튼 클릭 되었을때 할일 START--
$('li.logout').on('click',()=>{
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + '/user/signout',
        success: function () {
            location.href=frontURL+'common/main.html'
            localStorage.removeItem('name')
            // showMenuAtLogouted()
        }
    })
})
 //-- 로그아웃 버튼 클릭 되었을때 할일 END--

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
        url: backURL + 'user/check',
        success: function () {
            showMenuAtLogined()
            return true;
        },
        error: function(xhr){
            showMenuAtLogouted()
            return false;
        }
    });
}
//--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 END--

//--5분 간격으로 로그인여부확인하기 함수 START--    
function checkIntervalLogined() {
    window.setInterval(checkLogined, 300000); 
}
//--5분 간격으로 로그인여부확인하기 함수 END--

$(() => {
    checkLogined()
    checkIntervalLogined()
})