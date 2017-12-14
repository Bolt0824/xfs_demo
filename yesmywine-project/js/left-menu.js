// JSON数据请求
$.ajax({
	url: "../json/left-menu.json",
	type: "get",
	dataType: "json",
	success: function(data) {
		//console.log(data.show);//数据返回成功
		// menuShowDom(data.show);	//显示数据	
		// menuHideDom(data.hide);	//隐藏数据
	}, 
	error: function(wrong){
		alert("this is wrong????");
	}	
});
//左侧显示
var wine_item_show = '';
//右侧隐藏
var wine_item_hide = '';
//显示数据加载
function menuShowDom(da) {	//da 是形参	
	for(var i = 0; i < da.length; i++) {
		var item_show_list = '';
		for(var j=0 ; j < da[i].li[j].length; j++){
			item_show_list += '<li><h4>'+ da[i].li[j].title1 + '<a href=" ' + da[i].li[j].href1 + ' "</h4></li>'
		}
		$('.wine-group .item-show-list').html(item_show_list);
	};

	$('.wine-group .item-show').html(wine_item_show); //添加显示栏
}
//隐藏数据加载
function menuHideDom(da) {	//da 是形参	
	for(var i = 0; i < da.length; i++) {
		var item_hide_list = '';
		for(var j=0 ; j < da[i].list[j].length; j++){
			item_hide_list += '<li><h5>'+ da[i].list[j].title1 + '<a href=" ' + da[i].list[j].href1 + ' "</h5></li>'
		}
		$('.wine-group .item-hide-list').html(item_hide_list);
	};

	$('.wine-group .item-hide').html(wine_item_hide); //添加隐藏栏
}



//动态效果实现
function wineOver(){
	$(".item-show li").hover(
		function(){
		var _index = $(this).index();
		//console.log(_index);
		$(this).css("background","#C4D1DB");
		$(".item-hide").addClass("active");
		$(".item-hide li").eq(_index).addClass("active").siblings().removeClass("active");
		$(".item-hide li").animate({top:_index*(95)},0);
		// $(".item-hide li").fadeTo("slow",0.9);
		//console.log(_index);
	},function(){
		$(this).css("background","#ffffff");
		// $(".wine-group").find(".item-hide").removeClass("active");
	})
	$(".wine-group").mouseleave(function(){
		$(this).find(".item-hide").removeClass("active");
	})
}
 wineOver();



















