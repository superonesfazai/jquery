$(function () {

    /*
    * 1. 获取相关元素
    * */
        //容器div
    var $divSlide = $(".slide");
        //列表中li标签
    var $lis = $(".slide_list li");
        //左右按钮
    var $leftBtn = $(".prev");
    var $rightBtn = $(".next");
        //小圆点列表
    var $pointsList = $(".points");

    /*
    * 2.根据图片个数 添加小圆点 li
    * */
        // 获取图片的个数
    var iPicCount = $lis.length;

    for(var index = 0; index < iPicCount; index++) {
        // 创建节点
        var $pointli = $("<li>");

        // 默认选中第一个
        if (index == 0) {
            $($pointli).addClass("active");
        }
        // 添加到 小圆点列表
        $pointsList.append($pointli);
    }

    /*
    * 3. 监听小圆点的点击
    * */
        //切换图片的准备工作
    $lis.not(":first").css({"left":760});
    // 全局角标变量
    var iNowIndex = 0;
    var iPreIndex = 0;

    $pointsList.delegate("li","click",function () {
        //1.选中的添加 红色
        $(this).addClass("active");
        //2.其他的去除红色
        $(this).siblings().removeClass("active");
        //3.切换图片(准备工作做好, 除了第一张显示之外, 其余都放在右边 760px)
            // 因为选中的当前角标 不光小圆点要用,左右按钮也需要设置成全局变量
        iNowIndex = $(this).index();
        fnAnimation();
    });

    /*
    * 4. 监听左右两个按钮的点击
    * */
    //记录动画是否结束的标识
    var bIsOver = false;
    $leftBtn.click(function () {//图片 往左滑动
        if(bIsOver){
            return;
        }
        bIsOver = true;
        // 角标累加
        iNowIndex++;

        fnAnimation();
        //小圆点切换 红色
        //注意 上面 pointsList 变量是 小圆点列表的 不是 4个li标签
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
    });

    $rightBtn.click(function () {
        if(bIsOver){
            return;
        }
        bIsOver = true;

        //角标减小
        iNowIndex--;
        //小圆点切换 红色
        fnAnimation();

         //小圆点切换 红色
        //注意 上面 pointsList 变量是 小圆点列表的 不是 4个li标签
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
    });

    /*
    * 5.自动播放 默认 左滑动
    * */
    function fnAutoPlay() {
         //角标累加
         iNowIndex++;
         console.log(iNowIndex);
         fnAnimation();
         //切换小圆点
         $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
    }
    var timer = setInterval(fnAutoPlay,2000);

    /*
    * 6. 监听鼠标 事件
    * */
    $divSlide.mouseenter(function () {
        clearInterval(timer);   //暂停
    });
    $divSlide.mouseleave(function () {
        timer = setInterval(fnAutoPlay,2000);   //离开重新开始动画
    });

    /*
    * 7. 切换图片的动画功能能
    * */
    function fnAnimation() {
        //监听左边按钮的判断
        if(iNowIndex >iPicCount-1){//往左边滑动已经到底了 头尾互换
            if (bIsOver) {
                bIsOver = false;
                iNowIndex = 0;
                iPreIndex = iPicCount - 1;

                //当前这张 先放到右边 760位置 无动画
                $lis.eq(iNowIndex).css({"left":760});
                //1.让上一张 动画左 移动出去 - 760;
                $lis.eq(iPreIndex).animate({"left":-760});

                $lis.eq(iNowIndex).animate({"left":0},function () {
                    //动画结束
                    bIsOver = false;
                });

                iPreIndex = iNowIndex;
                return;     //添加return 避免动画重复执行

            }
        }

        //监听右边按钮的点击判断
        if(iNowIndex < 0){//右边滑动 露头了 头尾互换
            iNowIndex = iPicCount - 1;
            iPreIndex = 0;

            //1.将最后一张先放到左边 -760
            $lis.eq(iNowIndex).css({"left":-760});
            //2.让上一张 右滑动到 760
            $lis.eq(iPreIndex).animate({"left":760});
            //3.让当前这张 动画显示
            $lis.eq(iNowIndex).animate({"left":0});
            //记录角标
            iPreIndex = iNowIndex;
            return;
        }

        //有两个条件 需要判断 iNowIndex > ipreIndex
                        //  iNowIndex < ipreIndex
        if(iNowIndex > iPreIndex){
            // 由于跳跃点击导致的bug
            //解决BUG 让当前这张图片无论现在在什么位置, 先放到右边 760位置 无动画
            $lis.eq(iNowIndex).css({"left":760});
            //1.让上一张 动画左 移动出去 - 760;
            $lis.eq(iPreIndex).animate({"left":-760});
        }

        if(iNowIndex < iPreIndex){
            //解决BUG 让当前这张图片无论现在在什么位置, 先放到左边 -760位置 无动画
            $lis.eq(iNowIndex).css({"left":-760});
            //1.让上一张 动画右 移动出去  760;
            $lis.eq(iPreIndex).animate({"left":760});
        }

        //2.让当前图片  动画 出现     0;
        $lis.eq(iNowIndex).animate({"left":0},function () {
            //动画结束
            bIsOver = false;
        });
        //记录上一张的角标
        iPreIndex = iNowIndex;
    }
});