$(()=>{
    //--Course Info 목록 로드 START--
    let $parent = $('div.form>form>select')
    let $origin = $('div.form>form>select>option')
    $.ajax({
        url: backURL+'courses/info',
        method: 'get',
        success: function(jsonObj){
            $(jsonObj).each((index, info)=>{
                let $copy = $origin.clone()
                $copy.attr('value', info.courseInfoId)
                $copy.html(info.courseTitle)
                $parent.append($copy)
            })
        },
         function(xhr){
             let jsonObj = JSON.parse(xhr.responseText)
             alert(jsonObj.msg)
         } 
    })
    //--Course Info 로드 END--

    //--첨부파일이 변경되었을때 할일 START--
    let $divShow = $('div.show')
    $('div.form>form>input[type=file]').change((e)=>{
        $divShow.empty()
        $(e.target.files).each(( index, imgFileObj)=>{
            //blob타입의 이미지파일객체내용을 문자열로 변환
            let blobStr = URL.createObjectURL(imgFileObj)
            let img = $('<img>').attr('src', blobStr).css('width', '300px')
            $divShow.append(img)
        })
    })
    //--첨부파일이 변경되었을때 할일 END--

    //--폼 서브밋되었을때 할일 START--
    let $form = $('div.form>form')
    $form.submit(()=>{
        let url = backURL + 'courses/classes'
        let formData = new FormData($form[0])
        // formData.forEach((value, key)=>{
        //     console.log(key)
        //     console.log(value)
        //     console.log('------')
        // })
        $.ajax({
            xhrFields: {withCredentials: true},
            url: url,
            method: 'post',//파일업로드용 설정
            data : formData, //파일업로드용 설정
            processData : false,//파일업로드용 설정
            contentType: false,//파일업로드용 설정
            success: function(newId){
                alert('업로드 성공')
                location.href=frontURL+'course/detail.html?id='+newId
            },
            error: function(xhr){
                // alert(xhr.status)
                // alert(xhr.body)
                // alert(xhr.header)
                // alert(JSON.parse(xhr.body))
                alert(xhr.responseText)
                // let jsonObj = JSON.parse(xhr.responseText)
                // alert(jsonObj)
           }
        })
        return false
    })
    //--폼 서브밋되었을때 할일 END--
})