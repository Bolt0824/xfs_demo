// console.log("1.头部标题箭头；2.背景分割线（图片整合）；3.轮播图右侧用户信息登记栏背景图片；4.高度塌陷，同级div加clear:both;5.左右轮播图;6.函数命名规范（怎么防止函数名和变量名重复？？？闭包！！！）")

/**********************首页头部标题********************************************************************/
	//我的账户
$(".site-bar .my-account").hover(
	function(){
		$(".my-account-list").addClass("active")
	},function(){
		$(".my-account-list").removeClass("active");
	})

	//手机版
$(".site-bar .phone-ver").hover(
	function(){
		$(".phone-ver-list").addClass("active")
	},function(){
		$(".phone-ver-list").removeClass("active");
	})
	
	//也买服务
$(".site-bar .yesmy-serve").hover(
	function(){
		$(".yesmy-serve-list").addClass("active")
	},function(){
		$(".yesmy-serve-list").removeClass("active");
	})

//首页头部购物车
$(".header-main .shopping-car").hover(
	function(){
		$(".shopping-car-hide").addClass("active");
		$(".shopping-car-show").addClass("active");
	},function(){
		$(".shopping-car-hide").removeClass("active");
		$(".shopping-car-show").removeClass("active");
	})

/****************首页头部轮播图**************************************************************************************/
$.ajax({
	url: "../json/index/header.json",
	type: "get",
	dataType: "json",
	success: function(data) {
		
		bindDom(data.pic);	/*pic是json键值对的键名*/
		bingdEvent();
		autoPlay();
		onclickRight();
		onclickLeft();
		tabOver();
	}, 
	error: function(wrong){
		alert("this is wrong");
	}	
});
// var data =function(data){};
var content_lbt = '';
var list_tab = '';
var _index = 0;
var path = "http://127.0.0.1:80/yesmywine-project/images/index/"
//加载数据
function bindDom(da) {	//da 是形参		
	for(var i = 0; i < da.length; i++) {
		content_lbt += '<li><a href="' + da[i].href + '"><img src="' + path + da[i].imgSrc + '"/></a></li>';
		list_tab += '<li>' + (i + 1) + '</li>';
	};

	$('.content').html(content_lbt); //添加图片
	$('.list').html(list_tab); //添加tab键
	//初始状态
	$(".content li").eq(0).addClass("active");
	$(".list li").eq(0).addClass("active");
}
//绑定dom操作
function bingdEvent() {
	//左右按钮显示
	$(".header-pic").hover(
		function() {
			$(".btns").addClass("active");
			//$(".content li").animate(($(this).index().find("img")),{width: 2500, height: 6000,marginTop: -50, marginLeft: -50},500);
			clearInterval(timer);
		},
		function() {
			$(".btns").removeClass("active");
			autoPlay();
		}
	)
}
//点击右键
function onclickRight() {
	$(".control-right").click(function() {
		Li = $(".content li");
		var length = Li.size();
		_index++;
		if(_index >= length) {
			_index = 0
		};
		$(".content li").eq(_index).fadeIn(500).siblings().fadeOut(500);
		$(".list li").eq(_index).addClass("active").siblings().removeClass("active");
	})
}

//点击左键
function onclickLeft() {
	$(".control-left").click(function() {
		Li = $(".content li");
		var length = Li.size();
		_index--;
		if(_index < 0) {
			_index = length - 1;
		};
		$(".content li").eq(_index).fadeIn(500).siblings().fadeOut(500);
		$(".list li").eq(_index).addClass("active").siblings().removeClass("active");
	})
}

//tab键控制
function tabOver() {
	$(".list li").hover(
		//clearInterval(timer),
		function() {
			$(this).addClass("active").siblings().removeClass("active");
			$(".content li").eq($(this).index()).fadeIn(700).siblings().fadeOut(700);
			clearInterval(timer);
		},
		function() {
			//$(this).removeClass("active");
			$(".content li").eq($(this).index()).fadeIn(700).siblings().fadeOut(700);
			//autoPlay();
		}
	)
}

//定时器的封装
function autoPlay() {
	timer = setInterval(function() {
		$(".control-right").click();
	}, 3000)
}

/************头部轮播图下广告******************************************************************/
//左侧 +- 号点击
/*var flag = true;
$(".header-adver .adver-left-space span").click(function(){
	if(flag){
		$(".header-adver .adver-left-space").removeClass("hide");
		$(".header-adver .adver-left-notice").addClass("hide");
		return flag = false;
	}else{
		$(".header-adver .adver-left-space").addClass("hide");
		$(".header-adver .adver-left-notice").removeClass("hide");
		return flag = true;
	}	
})*/
$(".header-adver .adver-left-space span").click(function(){
	$(".header-adver .adver-left-space").toggleClass("hide");
	$(".header-adver .adver-left-notice").toggleClass("hide");
})

//左侧动态新闻
$(".header-adver .adver-left-news li").mouseenter(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(".header-adver .adver-left-news div").eq($(this).index()).addClass("active").siblings().removeClass("active");
	//console.log($(this).index())	//这里的this到底指的是谁啊？？？？？
})

//右侧推荐产品
				
$(".header-adver .title li").mouseenter(function(){
	$(this).addClass("active").siblings().removeClass("active");
	var v = $(".header-adver .title li").index(this);
	$(".header-adver .adver-right .product ul").eq(v).addClass("active").siblings().removeClass("active");
	//console.log(v)
	/*var v = 0;		//var index = $('#id li').index(this)  //获取li下标的值
	var H = 0;			//$("#hql").html($("#id li a:eq("+index+")").html());	
	$(".header-adver .title li").index();
	var v = $(".header-adver .title li").index(this);
	var H = $(".header-adver .adver-right .product").height();
	var vHeight =Number(v*H);	
	$(".header-adver .adver-right .product ul").eq(v).css({"top":"vHeight"},300);
	console.log(v);
	console.log({top:vHeight});*/
})















