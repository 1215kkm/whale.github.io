$(document).ready(function(){

    /* 비쥬얼 작은글자 */
    /* let textValue = $('#visual .text_box .small').text();
    $('#visual .text_box .small').text('');

    for(let i = 0; i < textValue.length; i++){
        let txt = textValue.charAt(i);
        $('.small').append('<span>'+txt+'</span>');
        $('.small span').eq(i).delay(i*100).animate({top:'0', opacity:'1'}, 1000).animate({top:'-10px'}).animate({top:'0'})
    } */
    
    /* 비쥬얼 큰글자 */
    /* let textValue2 = $('#visual .text_box .big').text();
    $('#visual .text_box .big').text('');

    for(let i = 0; i < textValue2.length; i++){
        let txt = textValue2.charAt(i);
        $('.big').append('<span>'+txt+'</span>');
        $('.big span').eq(i).delay(i*100).animate({top:'0', opacity:'1'}, 1000).animate({top:'20px'}).animate({top:'0'})
    } */


    $('header nav li').click(function(){
        let navIndex = $(this).index()
        let secTop = $('#section_box section').eq(navIndex).offset().top;
        $('html').animate({scrollTop:secTop})
    })


    waveText('.small', '-10');
    waveText('.big', '20');

    function waveText(target, topVal){
        let textValue2 = $('#visual .text_box '+target).text();
        $('#visual .text_box '+target).text('');

        for(let i = 0; i < textValue2.length; i++){
            let txt = textValue2.charAt(i);
            $(target).append('<span>'+txt+'</span>');
            $(target+' span').eq(i).delay(i*100).animate({top:'0', opacity:'1'}, 1000).animate({top:topVal+'px'}).animate({top:'0'})
        };
    };


    /* 비쥬얼 고래 */
    $('.visual_menu a').eq(0).click(function(){
        $('.whale img.gray').fadeIn().siblings().fadeOut(700);
        return false
    })
    $('.visual_menu a').eq(1).click(function(){
        $('.whale img.color').fadeIn().siblings().fadeOut(700);
        return false
    })
    


    $('.visual_menu a').eq(2).click(function(){
        $('#visual').css({backgroundImage:'url(images/visual1_color1.jpg)'});
    })


    let bgNum = 0;
    $('.visual_menu a').eq(3).click(function(){
        bgNum++
        
        if(bgNum == 1){
            $('#visual').css({backgroundImage:'url(images/visual1_color2.jpg)'});
        }
        else if(bgNum == 2){
            $('#visual').css({backgroundImage:'url(images/visual1_color3.jpg)'});
        }
        else {
            $('#visual').css({backgroundImage:'url(images/visual1_gray.jpg)'});

            bgNum = 0;
        };
    });

    
    whaleMove()

    function whaleMove(moveCheck){
        $(window).mousemove(function(e){
            let mouseX = e.pageX/10*moveCheck;
            let mouseY = e.pageY/10*moveCheck;

            $('.whale').css({transform:'translate(-'+(mouseX*1.2)+'px,-'+(mouseY*1.2)+'px)'});
            $('.smartphone').css({transform:'translate(-'+mouseX+'px,-'+mouseY+'px)'});
            $('.visual_menu').css({transform:'translate(-'+mouseX*3+'px,-'+(mouseY*2)+'px)'});
            $('#visual').css({backgroundPosition:(-mouseX/10)+'px '+(-mouseY/10)+'px'});
        });
    };


    $(document).mousemove(function(e){
        $('#whale_sound').css({top:(e.pageY-20)+'px'})

        if(e.pageX < 200){
            $('#whale_sound').addClass('on');
        } else {
            $('#whale_sound').removeClass('on');
        };

        // let winWBan = $(window).width()/2;
        // let winHBan = $(window).height()/2;

        // $('.sample img').css({transform:'rotateY('+((e.pageX-winWBan)/200)+'deg) rotateX('+(-(e.pageY-winHBan)/200)+'deg)'})
    });

    $('#whale_sound .play').click(function(){
        whaleMove(1);
        $('#whale_sound .play').hide();
        $('#whale_sound .pause').show();

        $('body').prepend('<div id="youtube_sound"><iframe src="https://www.youtube.com/embed/BZzuOqBC9M0?autoplay=1" allow="autoplay;"></iframe></div>')
        
        $('.whale img.color').fadeIn(1000).css({transform:'scale(1.1)'}).siblings().fadeOut(700);
    });
    $('#whale_sound .pause').click(function(){
        whaleMove(0);
        $('#whale_sound .play').show();
        $('#whale_sound .pause').hide();

        $('#youtube_sound').remove();
    });


    /* section1 */
    let date = new Date(); //날짜시~~작
    let year = date.getFullYear(); //년도
    let month = date.getMonth()+1; //월
    let day = date.getDate();  //일

    //$('#section1 span.date').text(year+'년 '+month+'월 '+day+'일 기준');
    $('#section1 span.date').text(`${year}년 ${month}월 ${day}일`)
    

    let contLength = $('#section1 .cont_box').length;
    
    let firstView = 1;
    let lastView = 1;
    $('.btn_more').click(function(){

        if(firstView < contLength){
            for(let i = firstView; i < firstView+lastView; i++){
                $('#section1 .cont_box').eq(i).fadeIn();
            }
            firstView = firstView + lastView
        };
        if(firstView >= contLength){
            $('.btn_more').hide();
        };

        console.log(firstView)

    });







    /* 첫번째방법 */
    /* let int = 0;
    
    setInterval(function(){
        int++
        $('#section1 strong span').each(function(){
            let textNumber = $(this).attr('data-num');
            
            if(int <= textNumber){
                $(this).text(int)
            }
        })
    }, 10) */


    function numberIncrease(){        
        /* 두번째방법 */
        $('#section1 strong span').each(function(){
            let textNumber = $(this).attr('data-num');
            let $spanNum = $(this);
        
            $({val : 0}).animate({val : textNumber},{
                duration : 1000,
                step : function(){
                    $spanNum.text(    numberWithCommas(Math.ceil(this.val))    )
                },
                complete : function(){
                    $spanNum.text(    numberWithCommas(Math.ceil(this.val))    )
                }
            })
        });

        function numberWithCommas(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            /* 
                \B 63개 문자에 일치하는 경계
                (?=) 앞쪽 일치
                \d   숫자
                (?!) 부정앞쪽 일치
             */
        }
    }


    let kimhyoen = true
    $(window).scroll(function(){
        let scrT = $(window).scrollTop();
        let winH = $(window).height();

        let sec1Top = $('#section1').offset().top;
        let sec2Top = $('#section2').offset().top;

        if(scrT >= sec1Top-winH/1.5){
            if(kimhyoen != false){
                kimhyoen = false;
                numberIncrease();
            }
        } else {
            kimhyoen = true;
            $('#section1 strong span').text('0')
        }

        if(scrT >= sec2Top-winH/3){
            $('#section2 .figure_box').addClass('on');
        } else {
            $('#section2 .figure_box').removeClass('on');
        }

        // $('#visual .whale').css({transform:'translateX('+(-scrT)+'px)'})
    })

    

    // window.onload = () => {
    //     // 카운트를 적용시킬 요소
    //     const $counter = document.querySelector("#section1 strong span");
        
    //     // 목표 수치
    //     const max = 300;
        
    //     setTimeout(() => counter($counter, max), 3000);
    //     }
    // const counter = ($counter, max) => {
    //     let now = max;
    
    //     const handle = setInterval(() => {
    //         $counter.innerHTML = Math.ceil(max - now);
        
    //         // 목표수치에 도달하면 정지
    //         if (now < 1) {
    //         clearInterval(handle);
    //         }
            
    //         // 증가되는 값이 계속하여 작아짐
    //         const step = now / 10;
            
    //         // 값을 적용시키면서 다음 차례에 영향을 끼침
    //         now -= step;
    //     }, 50);
    // }
    




    // setInterval(function(){        
    //     let date = new Date(); //날짜시~~작
    //     let hour = date.getHours()-12;  //
    //     let min = date.getMinutes();  //
    //     let sec = date.getSeconds();  //

    //     $('#section1 strong span').text(hour+'시 ' +min+'분 '+sec+'초')
    // },1000)




    /* section2 */
    let viewNum = 0;
    let exLength = $('.ex').length;

    // let liW = $('.monitor ul li img').width()
    // $('.monitor ul').width(liW * exLength+'px')

    $('.figure_box div ul').each(function(){
        let divW = $(this).parent('div').width();
        $(this).width(divW * exLength+'px')
    })
    
    
    
    $('#section2 button.next').click(function(){
        viewNum++;
        if(viewNum > exLength-1){
            viewNum = exLength-1
        }
        sec2Slide()
    })
    $('#section2 button.prev').click(function(){
        viewNum--;
        if(viewNum < 0){
            viewNum = 0
        }
        sec2Slide()
    })

    function sec2Slide(){
        $('.explain_box .ex').eq(viewNum).fadeIn().addClass('on').siblings().fadeOut().removeClass('on');
        
        $('.figure_box div ul').each(function(){
            let divW = $(this).parent('div').width();
            $(this).css({marginLeft:-divW * viewNum + 'px'})
        })    
    }



    /* section3 */

    $('#section3 nav li').click(function(){
        let sec3NavIdx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');

        let textBoxH = $('.cont').height();
        $('#section3 .text_box').css({marginTop:-sec3NavIdx * textBoxH + 'px'})
        $('#section3 .img_box').css({marginTop:-sec3NavIdx * textBoxH + 'px'})

        return false;
    });



    $( ".map_direction .call" ).draggable();




   /* 화면밝기모드 */ 
    if( document.cookie.indexOf('light') > -1 ){
        $('body').addClass('sun');
        $('.fa-moon').show().siblings().hide();
        $('#visual').css({backgroundImage:'url(images/visual1_gray_light.jpg)'});
        $('.imgtop').css({backgroundImage:'url(images/bg_body_light.jpg)'});
        $('#section2').css({background:'#ddd'});
        $('.bg_top').hide();

        } else {
            $('body').removeClass('sun');
            $('.fa-sun').show().siblings().hide();
            $('#visual').css({backgroundImage:'url(images/visual1_color3.jpg)'});
            $('.imgtop').css({backgroundImage:'url(images/bg_body.jpg)'});
            $('#section2').css({background:''});
            $('.bg_top').show();

        };
        
    $('.fa-sun').click(function(){
        $('body').addClass('sun');
        $(this).hide().siblings().show();
        $('#visual').css({backgroundImage:'url(images/visual1_gray_light.jpg)'});
        $('.imgtop').css({backgroundImage:'url(images/bg_body_light.jpg)'});
        $('#section2').css({background:'#ddd'});
        $('.bg_top').hide();

        document.cookie = 'birghtMode = light'
    });
    $('.fa-moon').click(function(){
        $('body').removeClass('sun');
        $(this).hide().siblings().show();
        $('#visual').css({backgroundImage:'url(images/visual1_color3.jpg)'});
        $('.imgtop').css({backgroundImage:'url(imagesbg_body.jpg)'});
        $('#section2').css({background:''});
        $('.bg_top').show();

        document.cookie = 'birghtMode = dark'
    });

});