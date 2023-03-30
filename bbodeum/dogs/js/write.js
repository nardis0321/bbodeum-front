$(()=>{
var now = new Date();
$('div.dogBday>input[name=dogBday]').attr('max', now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate())
// now.setFullYear(now.getFullYear()-20)
// $('div.dogBday>input[name=dogBday]').attr('min', now)
// console.log($('div.dogAddBox').html())

//--등록 클릭 되었을때 할일 START--
let $form = $('div.dogAddBox>form')
// console.log($form[0])
$form.on('click', 'input[name=dogInfoWriteBtn]', ()=>{
    let dogBdayInput=$('div.dogBday>input[name=dogBday]').val()
    let dogBdayDate = new Date(dogBdayInput)
    let dogBday = dogBdayDate.getFullYear()+'년 '+dogBdayDate.getMonth()+'월 '+dogBdayDate.getDate()+'일'
   //에이작스 통신
   let data = {
       'dogName':   $('div.dogName>input').val(),
       'dogWeight':  $('div.dogWeight>input').val(),
       'dogBday': dogBday,
       'dogBreed': $('div.dogBreed>input').val()
   }
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'dogs',
        method: 'post',
        data : JSON.stringify(data),
        contentType: 'application/json',
        success: function(){
            alert('등록이 완료되었습니다.')
            window.location.reload();
        },
        error: function(xhr){
           let jsonObj = JSON.parse(xhr.responseText)
            alert(jsonObj.msg)
        } 
    })
})
//--등록 클릭 되었을때 할일 END--
})