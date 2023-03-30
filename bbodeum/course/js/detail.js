$(() => {
    let queryStr = location.search.substring(1) //id=courseId
    let queryArr = queryStr.split('=')
    let path = queryArr[1]
    if(path==null||''){
        alert('잘못된 접근입니다')
        location.href=frontURL+'course/list.html'
        return;
    }
    let url = backURL + 'courses/classes/';
    let coursePrice;

    //---ajax 시작---
    $.ajax({
        url: url + path,
        method: 'get',
        success: function (dto) {
            // let blobStr = URL.createObjectURL(result)
            // $('div.download>img').attr('src', blobStr)

            // let bArr = jsonObj.bArr
            // let dto = jsonObj.dto

            let id = dto.courseId
            // let courseInfoId = dto.courseInfo.courseInfoId
            let courseTitle = dto.courseInfo.courseTitle;
            let courseContent = dto.courseInfo.courseContent;
            let coursePrep = dto.courseInfo.coursePrep;
            let courseRecomm = dto.courseInfo.courseRecomm;
            let trainer = dto.trainer;
            let trName = trainer.trName;
            let courseLocation = dto.courseLocation;
            let courseDate = dto.courseDate;
            coursePrice = dto.coursePrice;
            let courseVacancy = dto.courseVacancy;
            let appliesCnt = dto.applyCnt
            let courseStatus = dto.courseStatus;
            if (courseStatus == 'RECRUITING') {
                courseStatus = "모집중"
                if(courseVacancy-appliesCnt<=3){
                    courseStatus = "마감임박"
                }
            } else {
                courseStatus = "모집 마감"
                $('button.apply').hide()
            }
            if(coursePrep == null){
                coursePrep = "없음"
            }

            $('img').attr('src',)
            $('div.courseTitle').html(courseTitle)
            $('div.courseContent').html(courseContent)
            $('div.coursePrep').html('준비물<br> '+coursePrep)
            $('div.courseRecomm').html('추천 대상<br> '+ courseRecomm)
            $('div.trName').html(trName+' 트레이너')
            $('div.courseLocation').html('장소:     '+courseLocation)
            $('div.courseDate').html('날짜:  '+courseDate)
            $('div.coursePrice').html('가격: '+coursePrice+'만 원')
            $('div.courseVacancy').html('정원: '+courseVacancy + '명')
            // $('div.progRecruit').html('정원 ' + progRecruit + '명')
            $('div.courseStatus').html(courseStatus)
        },
        error: function (xhr) {
            alert(xhr.responseText)
            // let jsonObj = JSON.parse(xhr.responseText)
            // alert(jsonObj.msg)
        }
    })
    //---ajax 끝---

    //---이미지 다운 ajax 시작---
    $.ajax({
        xhrFields:{
            responseType: 'blob' //이미지다운로드용 설정
        },
        cache : false,  //이미지다운로드용 설정
        url: url + path+'/img',
        method: 'get',
        success: function (result) {
            console.log(result)
            let blobStr = URL.createObjectURL(result)
            console.log(blobStr)
            $('div.courseDetail>div.img>img').attr('src', blobStr)
        },
        error: function(){
            $('div.courseDetail>div.img>img').attr('src', './resource/default-img.jpg')
        }
    })
    //---이미지 다운 ajax 끝---

    //------신청하기 버튼 클릭 START -----
    $('button.apply').on('click',()=>{
        // if(coursePrice)
        if(localStorage.getItem('name')==null){
            alert('로그인 먼저 하세요')
            return
        }
        location.href=frontURL+'course/apply.html?'+queryStr+'&price='+coursePrice
    })
    //------신청하기 버튼 클릭 END -----
})