/**********************首页头部标题********************************************************************/
	//我的账户
$(".head-title .infor-center .my-account").hover(
	function(){
		$(".my-account-list").addClass("active")
	},function(){
		$(".my-account-list").removeClass("active");
	})

	//手机版
$(".head-title .infor-center .phone-ver").hover(
	function(){
		$(".phone-ver-list").addClass("active")
	},function(){
		$(".phone-ver-list").removeClass("active");
	})
	
	//也买服务
$(".head-title .infor-center .yesmy-serve").hover(
	function(){
		$(".yesmy-serve-list").addClass("active")
	},function(){
		$(".yesmy-serve-list").removeClass("active");
	})

//首页头部购物车
$(".head-find-right .shopping-car").hover(
	function(){
		$(".shopping-car-hide").addClass("active");
		$(".shopping-car-show").addClass("active");
	},function(){
		$(".shopping-car-hide").removeClass("active");
		$(".shopping-car-show").removeClass("active");
	})

/************侧边栏******************/
//动态效果实现
function wineListOver(){
	$(".check-wine-center h3").hover(
		function(){
		//console.log(_index);
		$(this).css("background","#774F43");
		$(".item-show").addClass("active");
	},function(){
		$(this).css("background","#624B40");
	})
	$(".check-wine-center .item-show li").hover(function(){
		var _index = $(this).index();
		$(".item-hide li").eq(_index).addClass("active").siblings().removeClass("active");
		$(".item-hide li").animate({top:_index*(100)},0);
		$(".item-hide li").eq(_index).animate({left:0},500);
	},function(){
		var _index = $(this).index();
		$(".item-hide li").eq(_index).removeClass("active");
		$(".item-hide li").eq(_index).animate({left:-200},500);
	})

	$(".wine-group").mouseleave(function(){
		$(".item-show").removeClass("active");
		$(".item-hide li").removeClass("active")
	})
}
 wineListOver();

/*左侧边栏所有分类*/

$(".all-classify .classify-list .title p").click(function(){
	$(this).toggleClass("active");
	$(this).parent().next(".kind").toggleClass("active");
})
/*一周销量排行*/
$(".week-consider .week-consider-list").hover(function(){
	$(this).find("h5").toggleClass("active");
	$(this).find(".list-content").toggleClass("active");
},function(){
	$(this).find("h5").toggleClass("active");
	$(this).find(".list-content").toggleClass("active");
})


/******商品加载**********************************/

var path = '../images/goods-list/';

$.get('../json/goodList.json', function(data){
	goodsListProduct(data);

	$(".all-product .first-page li").hover(function(){
		$(this).animate({top:-3,left:-3},300).siblings().finish();
		/*$(this).css({border:function(){
			$(this).fadeTo(500,1.0)
		}})*/
	// console.log(i);
		},function(){
		$(this).animate({top:0,left:0},300).siblings().stop();
	})

})

// 数据加载函数封装
function goodsListProduct(arr){
	for(var i = 0, len = arr.length; i < len; i++){
		var productList = '<dl><dt><a href="#"><img src="'+ 
							path+arr[i].imgSrc+'"</a></dt>'+
							'<dd class="base"><a href="#">'+
							'<span class="cn">'+arr[i].pName+'</span>'+
							'<span class="en">'+ arr[i].pName1+'</span>'+
							'<span class="promo">'+arr[i].desc+'</span>'+
							'<p class="price">￥<b>'+arr[i].price+'</b></p></a></dd>'+
							'<dd class="join-car">加入购物车</dd>'+
							'<dd class="xinxi"><span class="haoping"><strong>'+
							arr[i].hp+'</strong>好评度</span><span class="pinglun"><strong><a href="#">'+
							arr[i].pl+'</a></strong>评论</span><span =class="shouchu"><strong>'+
							arr[i].sc+'</strong>售出</span></dd>'+
							'</dl>';
	$('<li pid ="'+ arr[i].pid+'"></li>').html(productList).appendTo($("#list"));
	}
}
/***************购物车的简单实现*******************/

// 页面加载完后计算商品总数量

$("#count").html(getTotal());
$("#ccount").html(getTotal());
//实现购物车添加产品功能
$("#list").on("click",".join-car",function(){
	var li = $(this).parents("li");
	var pid = li.attr("pid");

	var isHas = checkIsHasGoodById(pid);	//根据商品编号pid检测本地是否有该商品 函数名
	if(isHas){
		updateGoodCountById(pid,1);
	}else{
		var imgSrc = li.children().children().children().eq(0).find("img").attr("src");
		var pName = li.children().children().eq(0).html();
		var price = Number(li.children().eq(1).children().children().eq(3).find("p").html());
		var good = {
			pid:pid,
			imgSrc:imgSrc,
			pName:pName,
			price:price,
			count:1
		}
		addGoodToCar(good);
	}
	$("#count").html(getTotal());
	$("#ccount").html(getTotal());
})

//添加商品到购物车
function addGoodToCar(good){
	var list = getGoodsList();
	list.push(good);
	var jsonStr = JSON.stringify(list);
	$.cookie("goods",jsonStr/*,{expires:7}*/);
}

// 需要返回数据为数组格式

function getGoodsList(){
	var jsonStr = $.cookie("goods");
	if(!jsonStr){	//本地没有cookie存在
		$.cookie("goods","[]"/*,{expires:7}*/);
		jsonStr = $.cookie("goods");
	}

	var list = JSON.parse(jsonStr);
	return list;
}

//计算本地购物车商品的总数量

function getTotal(){
	var list = getGoodsList();
	var total = 0;  //总数量初始值是0
	// 对每一个商品列表数量进行遍历
	for(var i=0, len = list.length; i<len; i++){
		total += list[i].count;	//相当于total = total + list[i].count;
	}
	return total;	//返回总数量
}

//根据商品编号pid检测本地是否有该商品
function checkIsHasGoodById(id){
	var list = getGoodsList();
	var isHas = false;
	for(var i = 0,len = list.length; i < len; i++){
		if(list[i].pid == id){
			isHas = true;
			break;
		}
	}
	return isHas;
}

//添加商品到购物车(暂时没有实现，购物车网页还没有写)
function addGoodToCar(good){
	var list = getGoodsList();
	list.push(good);
	var jsonStr = JSON.stringify(list);
	$.cookie("goods",jsonStr/*,{expires:7}*/);
}

//根据商品编号更新本地商品的数量 + -1
function updateGoodCountById(id, num){
	var list = getGoodsList();
	for(var i = 0,len = list.length; i<len; i++){
		if(list[i].pid == id){
			list[i].count = list[i].count + num;
			break;
		}
	}
	var jsonStr = JSON.stringify(list);
	$.cookie("goods",jsonStr/*,{expires:7}*/);
}

//表格的隐藏和显示
var num = getTotal();
if(num){	//本地有商品，如果num 不是0，就会执行下面的语句，就这么记住就行了
	$(".right-side .buycar .nogoods").removeClass("active");
	$(".right-side .buycar .havegoods").addClass("active");
}else{	//本地没有商品
	$(".right-side .buycar .nogoods").addClass("active");
	$(".right-side .buycar .havegoods").removeClass("active");
}

//根据商品编码删除指定商品（需要结合购物车页面）
function deleteGoodById(id){
	var list = getGoodsList();
	for(var i = 0,len = list.length; i<len; i++){
		if(list[i].pid == id){
			list.splice(i,1);
			break;
		}
	}
	var jsonStr = JSON.stringify(list);
	$.cookie("goods",jsonStr/*,{expires:7}*/);
}





// 下标页码
$(".page-count li").hover(function(){
	$(this).addClass("active").siblings().removeClass("active");
},function(){
	$(this).siblings().removeClass("active");
})
/*******右侧边栏**********************************************/
// 个人信息（小人头）
$(".right-side .personal").hover(function(){
	$(this).find("h3").css({"background":"#080808"});
	$(this).find(".dlbg").addClass("active");
},function(){
	$(this).find("h3").css({"background":"#7E0001"});
	$(this).find(".dlbg").removeClass("active");
})

// 购物车
$(".right-side .buycar").hover(function(){
	$(this).find(".show").css({"background":"#080808"});
	$(this).find(".hide").addClass("active");
},function(){
	$(this).find(".show").css({"background":"#7E0001"});
	$(this).find(".hide").removeClass("active");
})

// 我的资产
$(".right-side .zichan").hover(function(){
	$(this).find("h3").css({"background":"#080808"});
	$(this).find("div").addClass("active");
},function(){
	$(this).find("h3").css({"background":"#7E0001"});
	$(this).find("div").removeClass("active");
})

// 账户充值
$(".right-side .chongzhi").hover(function(){
	$(this).find("h3").css({"background":"#080808"});
	$(this).find("div").addClass("active");
},function(){
	$(this).find("h3").css({"background":"#7E0001"});
	$(this).find("div").removeClass("active");
})

// 二维码
$(".right-side .weima").hover(function(){
	$(this).find("h3").css({"background":"#080808"});
	$(this).find("div").addClass("active");
},function(){
	$(this).find("h3").css({"background":"#7E0001"});
	$(this).find("div").removeClass("active");
})

// 回到顶部
$(".right-side .back-top").hover(function(){
	$(this).find("h3").css({"background":"#080808"});
},function(){
	$(this).find("h3").css({"background":"#7E0001"});
})

	//判断滚动高度 
$(document).ready(function(){
	$(window).scroll(function(){
		if($(window).scrollTop()>800){
			$(".right-side .back-top").addClass("active");
		}else{
			$(".right-side .back-top").removeClass("active");
		}
	})
})
	
	//点击回到顶部
$(".right-side .back-top").click(function(){
	$("html, body").animate({scrollTop:0},500);
})








































































































