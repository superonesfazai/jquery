$(function () {

	//1.获取元素
	var $username = $('#user_name');
	var $pwd = $('#pwd');
	var $cpwd = $('#cpwd');
	var $email = $("#email");
	var $allowBtn = $('#allow');

	//记录判断条件
	var bUser = true;
	var bPwd = true;
	var bCpwd = true;
	var bEmail = true;
	var bAllow = false;

	//2.判断每个元素的内容

	//2.1判断用户名
	$username.blur(function () {
		var reg = /^\w{6,15}$/;
		var sTitle = "用户名是5到15个英文或数字，还可包含“_”";
		var sNull = "用户名不能为空"
		bUser = fnJudge(($username.val()),$username,reg,sNull,sTitle,bUser);
	})
	$username.focus(function () {
		
		$(this).next().hide();
	})

	//2.2判断密码
	$pwd.blur(function () {
		var reg = /^[\w@!#$%&^*]{6,15}$/;
		var sTitle = "'密码是6到15位字母、数字、或下划线或者特殊字符'";
		var sNull = "密码不能为空"
	bPwd = fnJudge(($(this).val()),$(this),reg,sNull,sTitle,bPwd);
	})
	$pwd.click(function () {
		
		$(this).next().hide();
	})

	//2.3确认密码
	$cpwd.blur(function () {
		var reg = /^[\w@!#$%&^*]{6,15}$/;
		if($pwd.val() == $cpwd.val()){
			$cpwd.next().hide();
			bCpwd = false;
		}else{//不相等
			$cpwd.next().html("两次密码不一致");
			$cpwd.next().show();
			return;
		}
		var sTitle = "'密码是6到15位字母、数字、或下划线或者特殊字符'";
		var sNull = "确认密码不能为空"
	 bCpwd = fnJudge(($(this).val()),$(this),reg,sNull,sTitle,bCpwd);
	})
	$cpwd.click(function () {
		
		$(this).next().hide();
	})

	//2.4邮箱
	$email.blur(function () {
		var reg = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/i;
		var sTitle = "'邮箱格式不正确'";
		var sNull = "邮箱不能为空"
	 bEmail = fnJudge(($(this).val()),$(this),reg,sNull,sTitle,bEmail);
	})
	$email.click(function () {
		
		$(this).next().hide();
	})


	//2.5 勾选按钮
	$allowBtn.click(function() {

		bAllow = false;
		if ($(this).is(":checked")) {
			
			$(this).siblings("span").hide();
			bAllow = false;

		}else{
			$(this).siblings("span").html("请勾选同意!");
			$(this).siblings('span').show();
		}
	});

	//2.6判断是否提交
	$(".reg_form").submit(function () {
			console.log(bUser);
			console.log(bPwd);
			console.log(bCpwd);
			console.log(bEmail);
			console.log(bAllow); 
		//如果都满足条件才允许提交
		if (bUser==false && bPwd==false && bCpwd==false && bEmail==false && bAllow==false) {
		
			return true;
		}else{
			
			return false;
		}
		

	})


	//2.1判断是否为空
	//2.2判断是否符合要求
	function fnJudge(value,$obj,judgeStr,sNull,sTitle,judgeBool) {
		if (value == "") {
			$obj.next().html(sNull);
			$obj.next().show();
			return;
		}
		if(judgeStr.test(value)){
			$obj.next().hide();
			judgeBool = false;

			return false;
		}else{
			$obj.next().html(sTitle);
			$obj.next().show();

			return true;
		}

	}
	
})
