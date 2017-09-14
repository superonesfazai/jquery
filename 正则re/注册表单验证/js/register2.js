$(function () {
    //判断条件
    var bUser = false;
    var bPwd = false;
    var bCpwd = false;
    var bEmail = false;
    var bAllow = true;
    
    //1.用户名var reUser = /^\w{6,20}$/;
    $("#user_name").blur(function () {
        var sNullStr = "用户名输入不能为空!";
        var sRegStr = /^\w{6,20}$/;
        var sRemindStr = "用户名是6到20个英文或数字，还可包含“_”";
        bUser =  fnJudgeMethod($(this),sNullStr,sRegStr,sRemindStr);
    });

    $("#user_name").focus(function () {
        $(this).next().hide(); 
    });

    //2.密码/^[\w!@#$%^&*]{6,20}$/; 
    //密码:密码是6到20位字母、数字，还可包含@!#$%^&*字
    $("#pwd").blur(function () {
        var sNullStr = "密码输入不能为空!";
        var sRegStr = /^[\w!@#$%^&*]{6,20}$/;
        var sRemindStr = "密码是6到20位字母、数字，还可包含@!#$%^&*字";
        bPwd = fnJudgeMethod($(this),sNullStr,sRegStr,sRemindStr);
    });

    $("#pwd").focus(function () {
        $(this).next().hide();
    });

    //3.确认密码
    $("#cpwd").blur(function () {
       //判断两次的密码是否一致
       if(!($(this).val() == $("#pwd").val())){
            $(this).next().html("两次密码不一致");
            $(this).next().show(); 
       }else{
           bCpwd = true;
       }
    });

   $("#cpwd").focus(function () {
       $(this).next().hide(); 
   });

    //4.邮箱 /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/i;
    $("#email").blur(function () {
        var sNullStr = "邮箱输入不能为空!";
        var sRegStr = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/i;
        var sRemindStr = "邮箱格式不正确";
      bEmail = fnJudgeMethod($(this),sNullStr,sRegStr,sRemindStr);
   });

   $("#email").focus(function () {
       $(this).next().hide(); 
   });

    //5.是否同意 勾选
    $("#allow").click(function () {
        if ($(this).is(":checked")) {//选中
            $(this).siblings("span").hide();
            bAllow = true;
        } else {//没有选中
            $(this).siblings("span").html("请勾选同意!");
            $(this).siblings("span").show();
            bAllow = false;
        }
    });

    //6.注册按钮的点击 判断是否提交
    $(".reg_form").submit(function () {
        //如果上面的条件都满足就允许提交 否则不提交
        if (bUser == true && bPwd == true && bCpwd == true && bEmail == true && bAllow == true) {
            return true;
        } else {
            return false;
        }
    });


  //封装验证的方法
  function fnJudgeMethod(obj,sNullStr,sRegStr,sRemindStr) {
    //1.用户名输入不能为空!
    if (obj.val() == "") {
        
        obj.next().html(sNullStr);
        obj.next().show();
        return;
    } 
    
    //2.用户名是6到20个英文或数字，还可包含“_”
    
    if(sRegStr.test(obj.val())){//满足正则条件
        return true;
    }else{
        obj.next().html(sRemindStr);
        obj.next().show(); 
    }
}

});