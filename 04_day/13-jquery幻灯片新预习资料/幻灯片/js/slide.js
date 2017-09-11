$(function () {

    var iNowIndex = 0;//现在的角标
    var iPreIndex = 0;//上一次的角标
    var bIsOver = false;//记录动画是否结束
    
    // 1.根据图片的个数,添加小圆点
    //1.1获取图片的个数
    var $pictureLis = $(".slide_list li");
        // 动画切换图片(前提除了第一章之外,其他的都left:760)
        $pictureLis.not(":first").css({"left":760});

    var iPointCount = $pictureLis.length;
    //1.2根据个数创建添加小圆点到列表中
    for (var i = 0; i < iPointCount; i++) {
        var $pointLi = $("<li>");
        if (i==0) {//默认第一个选中
            $pointLi.addClass("active");
        }
        
        //添加到当前的列表
        $pointLi.appendTo($(".points"));
    }

    // 2.监听点击小圆点切换图片
    var $points = $(".points li");
    $points.click(function () {
        //2.1点击 切换选中状态
        $(this).addClass("active").siblings().removeClass("active");
        //2.2 动画切换图片(前提除了第一章之外,其他的都left:760)
        iNowIndex = $(this).index();
        fnAnimation();
    })

    // 3.监听左右两边的按钮
    $(".prev").click(function () {

        if(bIsOver){
            return;
        }
        bIsOver = true;
        //角标减少
        iNowIndex--;
        //动画切换
        fnAnimation();

        //改变小园点的选中
         $points.eq(iNowIndex).addClass("active").siblings().removeClass("active");
    })
    $(".next").click(function () {
         if(bIsOver){
            return;
        }
        bIsOver = true;

        //角标增加
        iNowIndex++;
        //动画切换
        fnAnimation();

        //改变小园点的选中
         $points.eq(iNowIndex).addClass("active").siblings().removeClass("active");
        
    })
    

    // 4.自动播放
    function fnAutoPlay() {
        iNowIndex++;
        //动画切换
        fnAnimation();
         //改变小园点的选中
         $points.eq(iNowIndex).addClass("active").siblings().removeClass("active");
    }
    var timer = setInterval(fnAutoPlay,2000);

    // 5.鼠标悬浮和移开
    $(".slide").mouseenter(function () {
        clearInterval(timer);
    })
     $(".slide").mouseleave(function () {
        timer = setInterval(fnAutoPlay,2000);
    })



    //专门用来动画切换图片的方法
    function fnAnimation(){

        //3.在监听左右按钮的时候, 判断范围
        //3.1判断开头
        if (iNowIndex<0) {
            //将现在的角标变成最后一个图片
            iNowIndex = iPointCount - 1;
            //上一个角标应该记录0
            iPreIndex = 0;

            //实现动画
            //先让当前选中的 跑到左边-760(没有动画)
            $pictureLis.eq(iNowIndex).css({"left":-760});
            //让以前的图片右滑动760
            $pictureLis.eq(iPreIndex).animate({"left":760});
            $pictureLis.eq(iNowIndex).animate({"left":0},function () {
                bIsOver=false;//标识动画结束了
            });

            //记录上一次的角标
            iPreIndex = iNowIndex;
            return;
            
        }
        //3.2判断结尾
        if (iNowIndex > iPointCount-1) {
            //将现在的角标变成第一个图片
            iNowIndex = 0;
            //上一个角标应该记录0
            iPreIndex = iPointCount - 1;

            //实现动画
            //先让当前选中的 跑到左边760(没有动画)
            $pictureLis.eq(iNowIndex).css({"left":760});
            //让以前的左滑到760;
            $pictureLis.eq(iPreIndex).animate({"left":-760}); 
            $pictureLis.eq(iNowIndex).animate({"left":0},function () {
                bIsOver=false;//标识动画结束了
            });

            //记录上一次的角标
            iPreIndex = iNowIndex;
            return;
            
        }
        


        //1.角标从小变大
        if(iNowIndex > iPreIndex){

            //先让当前选中的 跑到左边760(没有动画)
            $pictureLis.eq(iNowIndex).css({"left":760});
            //让以前的左滑到760;
            $pictureLis.eq(iPreIndex).animate({"left":-760}); 
        }

        //2.角标从大变小
        if (iNowIndex < iPreIndex) {
            //先让当前选中的 跑到左边-760(没有动画)
            $pictureLis.eq(iNowIndex).css({"left":-760});
            //让以前的图片右滑动760
            $pictureLis.eq(iPreIndex).animate({"left":760});

        }

         //让当前的左滑 0
            $pictureLis.eq(iNowIndex).animate({"left":0},function () {
                bIsOver=false;//标识动画结束了
            });
            //记录当前的角标
            iPreIndex = iNowIndex;

    }
    

 


})