$(function () {
    
    //1.获取相关的元素
        //div
        var $divSlide = $(".slide");
        //列表中li标签
        var $lis = $(".slide_list li");
        //左右按钮
        var $leftBtn = $(".prev");
        var $rightBtn = $(".next");
        //小圆点列表
        var $pointsList = $(".points");

    //2.根据图片个数添加小圆点
        //2.1获取图片的个数
        var iPicCount = $lis.length;
        //2.2 创建节点
        for (var index = 0; index < iPicCount; index++) {
            var $pointli = $("<li>");

            //默认选中第一个
            if(index == 0){
                $($pointli).addClass("active");
            }
             //2.3添加到 小圆点列表
            $pointsList.append($pointli);
        }
});