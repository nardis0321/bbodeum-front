$(() => {

    //----반려견 정보 추가 버튼 클릭 START-----
    $('div.dogaddbtn').on('click',()=>{
        $('section').load("../dogs/write.html");
    })
    //----반려견 정보 추가 버튼 클릭 END-----

    //---ajax함수 시작---
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
                let idList = [];
                $(list).each((index, elementP) => {
                    let id = elementP.dogId
                    idList.push(id);
                    let dogName = elementP.dogName;
                    let dogWeight = elementP.dogWeight;
                    let dogBday = elementP.dogBday;
                    let dogBreed = elementP.dogBreed;

                    let $copy = $origin.clone()
                    // $copy.attr('onclick', 'location.href="'+frontURL+'course/detail.html?'+id+'"')
                    // $copy.attr('id', id)
                    let originHtml = $copy.html()
                    $copy.html('🐾'+dogName + originHtml)
                    // $copy.find('div.dogName').html(dogName) 
                    $copy.find('div.dogId').html(id)
                    $copy.find('div.dogWeight').html(dogWeight+'kg')
                    $copy.find('div.dogBday').html(dogBday+'생')
                    $copy.find('div.dogBreed').html(dogBreed)
                    $copy.find('div').hide()
                    let $doginfo = $('div.doginfo')
                    $parent.append($copy)
                    $doginfo.append($copy)
                })
                $origin.hide()

                //------- 반려견 이름 클릭 Start ------
                // $('div.dog').on('click', (e) => {
                //     let $target = $(e.target).find('div')
                //     let $doginfo = $('div.doginfo')
                //     if ($target.first().css('display') == 'none') {
                //         $target.show()
                //         $doginfo.show()
                //     } else {
                //         $(e.target).find('div').hide()
                //     }
                // })
                //------- 반려견 이름 클릭 end ------
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
    
                    if(dogId == null){
                        alert('반려견을 선택해주세요')
                        return
                    }
                    let data = {
                        "d" : dogId,
                        "c" : queryStr 
                    }
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        url: backURL + 'applies/classes',
                        method: 'post',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (jsonObj) {
                            alert("신청 되었습니다")
                        },
                        error: function(xhr){
                            // let jsonObj = JSON.parse(xhr.responseText)
                            // alert(jsonObj.msg)
                            alert(xhr.responseText)
                        } 
                    })            
                })    
                //-------- 신청 버튼 클릭 end --------
            },
            error: function (xhr) {
                alert(xhr.responseText)
                location.href = frontURL+'member/login.html'
            }
        })
    // }
    //---ajax함수 끝---
})