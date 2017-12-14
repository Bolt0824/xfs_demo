/****登录页面********************************/

	
	var flag = false;
	function isRegister(name, value){
		if($.cookie('username')){
			var arrName = $.cookie('username').split(' ');
			var arrPwd = $.cookie('password').split(' ');
			var n = arrName.indexOf(name);
			if (n != -1) {
				flag = true;
				// 当传入第二参数时，判断密码是否正确
				if(arguments[1]){
					if (arrPwd[n] == value) {
						flag = true;
					}else{
						flag = false;
					}
				}
			}else{
				flag = false;
			}
		}
		return flag;
	}
	// 用户名失去光标时判断cookie中有没有用户名
	$('.login-user').blur(function(){
		var logName = $(this).val();
		if(isRegister(logName)){
			$(this).next().html('输入正确√').css('color', 'green');
		}else{
			$(this).next().html('用户名不存在哦，赶紧去注册吧！').css('color', 'red');
		}
	});
	// 判断密码是否正确
	$('.login-pwd').blur(function(){
		var logName = $('.login-user').val();
		var logPwd = $(this).val();
		if (isRegister(logName, logPwd)) {
			$(this).next().html('输入正确√').css('color', 'green');
		}else{
			$(this).next().html('密码错误，请核对后输入！').css('color', 'red');
		}
	});

	// 点击登陆按钮，跳转到首页
	$('form').submit(function(){
		// 点击记住我,将当前账号存入cookie
		var checked = $('.remindMe input').attr('checked');
		if ($(this).get(0).checked) {
			$.cookie('currentName', $('.login-user').val(), {expires: 7});
			$.cookie('currentPwd', $('.login-pwd').val(), {expires: 7});
		}else{
			$.cookie('currentName', $('.login-user').val());
			$.cookie('currentPwd', $('.login-pwd').val());
		}
		// 是否登陆成功
		if(flag){
			alert('登陆成功');
		}else{
			alert('信息输入错误，请仔细核对');
			return false;
		}
	});



