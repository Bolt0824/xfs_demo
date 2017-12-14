/*******************刚刚轮播图数据************************/
$.ajax({
	url: "../json/index/main.json",
	type: "get",
	dataType: "json",
	success: function(data) {
		//console.log(data);//数据返回成功
		bindDom1(data.justLeft);	/*justLeft是json键值对的键名*/
		 mainAutoPlay();
		 justOver();
		 justTab();
		
	}, 
	error: function(wrong){
		alert("this is wrong");
	}	
});
//刚刚左侧轮播图
var just_lbt_li = '';
var just_lbt_tab = '';
var path = "http://127.0.0.1:80/yesmywine-project/images/index/"
//加载数据
function bindDom1(da) {	//da 是形参		//函数名不能和当前页面其他封装函数名一样。
	for(var i = 0; i < da.length; i++) {
		just_lbt_li += '<li><a href="'+da[i].imgHref+'"><img src="'+path+da[i].img+'"/></a><div class = "li-price">'+da[i].price +
						'</div><a href="'+da[i].imgHref + '"><h2>' + da[i].title1 + '</h2><p>'+ da[i].title2 + 
						'</p><span class = "discuss">评论：<strong>'+ da[i].count1 + '</strong></span>' +
						'<span class = "sales-count">销量：<strong>' + da[i].count2 +'</strong></span></a></li>';
		just_lbt_tab += '<li></li>';
	};

	$('.just-content .lbt-li').html(just_lbt_li); //添加图片
	$('.just-content .lbt-tab').html(just_lbt_tab); //添加tab键
	//初始状态
	$(".just-content .lbt-li li").eq(0).addClass("active");
	$(".just-content .lbt-tab li").eq(0).addClass("active");
}

//定时器的封装
var just_index = 0;
var just_flag = true;
function mainAutoPlay() {
	just_timer = setInterval(function() {
		var Li = $(".main-just .lbt-li li");
		var Wid = $(".main-just .lbt-li li").innerWidth();
		var length = Li.size()-1;
		if(just_flag){	
			just_index ++;
			if(just_index > length-1){
				just_flag = false;
			}
		//console.log(length);
		}else{
			just_index --;
			if(just_index == 0){	//if判断要用 "==" 号
				just_flag = true;
			}
		}
		// console.log(just_index);
		
		$(".main-just .lbt-li").animate({marginLeft:just_index*(-Wid)},500)
		$(".main-just .lbt-tab li").eq(just_index).addClass("active").siblings().removeClass("active");
	}, 3000)
}
//移入事件
function justOver(){
	$(".main-just .lbt-li li").hover(function(){
		clearInterval(just_timer);
	},function(){
		mainAutoPlay();
	})
}
//tab键控制
function justTab() {
	var Wid = $(".main-just .lbt-li li").innerWidth();
	//console.log(just_index)
	$(".main-just .lbt-tab li").hover(
		//clearInterval(timer),
		function() {
			var lbt_tab_index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".main-just .lbt-li").animate({marginLeft:lbt_tab_index*(-Wid)},500)			
			clearInterval(just_timer);
		},
		function() {
			$(".main-just .lbt-li li").eq($(this).index()).addClass("active").siblings().removeClass("active");
			mainAutoPlay();
		}
	)
}

/*************品牌汇js实现***********************/

// 上部
// 定时器封装
var brand_index = 0;
function brandAutoPlay(){
	brand_timer = setInterval(function(){
		var Li = $(".brand-top li");
		var length = Li.size();
		brand_index++;
		if(brand_index >= length){
			brand_index = 0;
		};
		$(".brand-top li").eq(brand_index).animate({width:"450px"},300).siblings().animate({width:"150px"},300)
	},3000)
}
 brandAutoPlay();
//移入事件
$(".brand-top li").hover(function(){
	 $(this).animate({width:"450px"},300).siblings().animate({width:"150px"},300);
	clearInterval(brand_timer);
},function(){
	 brandAutoPlay();
})

// 下面
// 移入事件		/*************有bug***********************/
$(".brand-down li img").hover(function(){
	 $(this).animate({left:"-100px"},300).parent().siblings().find("img").stop()/*.animate({left:"0px"},300)*/;
},function(){
	$(this).finish().animate({left:"0px"},300)/*.stop().siblings().stop()*/;/*finish()*/
})

/****************葡萄酒系列**************************/
// 轮播图
var grape_index = 0;
function grapeAutoPlay() {
	grape_timer = setInterval(function() {
		var Li = $(".main-grape .grape-lbt li");
		var Wid = $(".main-grape .grape-lbt li").innerWidth();
		var length = Li.size()-1;
		
		// console.log(just_index);
		if(grape_index < length){
			grape_index ++;
			//console.log(grape_index);
		}else if(grape_index = length){
			grape_index --
		};
		$(".main-grape .grape-lbt").animate({marginLeft:grape_index*(-Wid)},800)
		$(".main-grape .grape-tabs li").eq(grape_index).addClass("active").siblings().removeClass("active");
	}, 3000)
}
grapeAutoPlay();
//移入事件
$(".grape-lbt").hover(function(){
	// var gra_index = $(this).index();
	// $(this).addClass("active").siblings().removeClass("active");
	// $(".main-grape .grape-lbt").animate({marginLeft:grape_index*(-Wid)},500);
	clearInterval(grape_timer);
},function(){
	// $(".grape-tabs li").eq($(this).index()).addClass("active").siblings().removeClass("active");
	 grapeAutoPlay();
})
























