$(() => {
    let $origin = $('div.dog').first()
    let $parent = $('div.doglist')
    $('div.dog').not(':first-child').remove()
    let $second = $('div.dog').children(':first-child').next()
   
    
    let $applyOrigin = $('div.applylist>div.apply').first()
    let $applyParent = $('div.applylist')
    $('div.apply').not(':first-child').remove()
    $applyOrigin.hide() //원본 숨기기
    

    //----강아지 목록 불러오는 에이작스 START----
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'dog',
        method: 'get',
        success: function (jsonObj) {
            let list = jsonObj

            // let $origin = $('div.dog').first()
            // let $parent = $('div.doglist')
            // let idList = [];
            $(list).each((index, elementP) => {
                let id = elementP.dogId
                // idList.push(id);
                let dogName = elementP.dogName;
                // let dogWeight = elementP.dogWeight;
                // let dogBday = elementP.dogBday;
                // let dogBreed = elementP.dogBreed;

                let $copy = $origin.clone()
                // $copy.attr('onclick', 'location.href="'+frontURL+'course/detail.html?'+id+'"')
                $copy.attr('id', id)
                let originHtml = $copy.html()
                $copy.html('🐾' + dogName + originHtml)
                // $copy.find('div.dogName').html(dogName) 
                // $copy.find('div.dogId').html(id)
                $parent.append($copy)
                // console.log($parent.html())
            })
            $origin.hide()
            
            //------- 반려견 이름 클릭 Start ------
            $('div.dog').on('click', (e) => {
                // let $parent = $('div.applylist')
                let dogId = $(e.target).attr('id')
                // let $dog = $(e.target)
                // let $clone = $dog.clone()
                // $clone.find('div').show()
                // $clone.find('div.dogId').hide()
                // $doginfo.html($clone)

                $applyParent.html($applyOrigin)
                // let dogId = 1;
                let $applyshow = $('div.applyshow')
                let page = 1;
                $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        url: backURL + 'applies/dogs/'+dogId+'/'+page,
                        method: 'get',
                        success: function (jsonObj) {
                            let list = jsonObj.list
                            // console.log(list)
                            // console.log($(list).length)
                            if(list==null || $(list).length==0){
                                $applyParent.html('아직 신청한 교육이 없습니다')
                                return;
                            }
                            $applyOrigin.show() //원본 보이게 하기
                            $(list).each((index, element) => {
                                // console.log(list)
                                let $copy = $applyOrigin.clone()
                                let courseId = element.course.courseId
                                // console.log(courseId)
                                let courseInfo = element.course.courseInfo
                                let courseTitle = courseInfo.courseTitle
                                let courseDate = element.course.courseDate
                                let trName = element.course.trainer.trName
                                let createdDate = element.createdDate
                                // $copy.find('div.courseId').html(courseId)
                                $copy.find('div.courseTitle').html(courseTitle)
                                $copy.find('div.trName').html(trName+' 훈련사')
                                $copy.find('div.courseDate').html(courseDate)
                                $copy.find('div.appliedDate').html(createdDate)
                                $copy.attr('OnClick', "location.href ='"+frontURL+"course/detail.html?id="+courseId+"'")
                                $copy.attr('style', "cursor:pointer;")
                                $applyParent.append($copy)
                                // console.log($applyParent.html())
                            })
                            // $applyOrigin.hide() //원본 숨기기
                            $('div.courseId').hide()
                            // $applyshow.html($applyParent)
                            // $applyParent.find('div.apply').hide()
                        }, error: function(xhr){
                            console.log(xhr.responseText)
                        }
                })
            })
            //------- 반려견 이름 클릭 end ------
        },
        error: function (xhr) {
            alert(xhr.responseText)
            location.href = frontURL+'member/login.html'
        }
    })
    //----강아지 목록 불러오는 에이작스 END----
})