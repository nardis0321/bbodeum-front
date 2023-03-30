$(() => {
    let url = backURL + 'courses/classes';

    // -- 목록 요청 START --
    showList(url, 1)
    // -- 목록 요청 END --

    // -- 페이지 번호 클릭 START --
    $('div.pagegroup').on('click', 'span:not(.current)', (e) => {
        // console.log('페이지번호 클릭')
        let page = $(e.target).attr('class')
        // console.log('페이지번호 : '+page)
        showList(url, page)
        // console.log('페이지그룹 '+$('div.pagegroup').html())
    })
    // -- 페이지 번호 클릭 END --

    //---ajax함수 시작---
    function showList(url, page) {
        let $origin = $('div.program').first()
        $('div.program').not(':first-child').remove()
        $origin.show() //원본 보이게 하기

        $.ajax({
            url: url,
            method: 'get',
            data: 'page=' + page,
            success: function (jsonObj) {
                let list = jsonObj.list;
                let totalCnt = jsonObj.totalCnt;
                let totalPage = jsonObj.totalPage;
                let startPage = jsonObj.startPage;
                let endPage = jsonObj.endPage;
                let currentPage = jsonObj.page;
                let cntPerPage = jsonObj.cntPerPage;

                let $origin = $('div.program').first()
                let $parent = $('div.courselist')
                $(list).each((index, elementP) => {
                    let id = elementP.courseId
                    let progTitle = elementP.courseInfo.courseTitle;
                    let trainer = elementP.trainer;
                    let trName = trainer.trName;
                    let progLoc = elementP.courseLocation;
                    let courseDate = elementP.courseDate;
                    let coursePrice = elementP.coursePrice;
                    let progRecruit = elementP.courseVacancy;
                    let progRsvStatus = elementP.courseStatus;
                    let appliesCnt = elementP.applyCnt
                    let $copy = $origin.clone()
                    if (progRsvStatus == 'RECRUITING') {
                        // progRsvStatus = "모집중"
                        $copy.find('div.coursePrice').html(coursePrice+'0,000원')
                    } else {
                        // progRsvStatus = "마감"
                        $copy.find('div.coursePrice').html('마감')
                    }
                    
                    $copy.attr('onclick', 'location.href="'+frontURL+'course/detail.html?id='+id+'"')
                    $copy.find('div.progTitle').html(progTitle)
                    $copy.find('div.trName').html(trName+' 훈련사')
                    $copy.find('div.progLoc').html(progLoc)
                    $copy.find('div.courseDate').html(courseDate)
                    $copy.find('div.progRecruit').html('모집인원 ' + progRecruit + '명')
                    // $copy.find('div.coursePrice').html(coursePrice+'0,000원')
                    // $copy.find('div.progRecruit').html(appliesCnt+ '/' + progRecruit)
                    // $copy.find('div.progRsvStatus').html(progRsvStatus)
                    $parent.append($copy)
                    
                    //------리스트에 이미지 불러오기 START------
                    $.ajax({
                        xhrFields: {
                            responseType: 'blob' //이미지다운로드용 설정
                        },
                        cache: false,  //이미지다운로드용 설정
                        url: url +'/'+ id + '/img',
                        method: 'get',
                        success: function (result) {
                            let blobStr = URL.createObjectURL(result)
                            $copy.find('img').attr('src',blobStr)
                            $('div.courseDetail>div.img>img').attr('src', blobStr)
                        },
                        error: function () {
                            $copy.find('img').attr('src', './resource/default-img.jpg')
                        }
                    })
                    //------리스트에 이미지 불러오기 END------
                })
                $origin.hide()

                //--- 리스트에 따른 하단 페이징 START ---
                let $pageGroup = $('div.pagegroup')
                let pageGroupStr = '';
                if (startPage > 1) {
                    pageGroupStr += '<span class="' + (startPage - 1) + '"> [PREV] </span>'
                }
                if (endPage > totalPage) {
                    endPage = totalPage;
                }
                for (let i = startPage; i <= endPage; i++) {
                    if (i == currentPage) {
                        pageGroupStr += '<span class="current ' + i + '"> [' + i + '] </span>'
                    } else {
                        pageGroupStr += '<span class="' + i + '"> [' + i + '] </span>'
                    }
                }
                if (endPage < totalPage) {
                    pageGroupStr += '<span class="' + (endPage + 1) + '"> [NEXT] </span>'
                }
                $pageGroup.html(pageGroupStr)
                //--- 리스트에 따른 하단 페이징 END ---
            },
            error: function (xhr) {
                let jsonObj = JSON.parse(xhr.responseText)
                alert(jsonObj.msg)
            }
        })
    }
    //---ajax함수 끝---
})