
/*放大镜*/
/*鼠标移入大图区域放大镜显示*/
/*鼠标移动hover事件会重新执行一次，所以会闪屏，解决办法暂时还没有啊 ！！！(估计是样式获取方式不对)*/
$(".main .alone .pic-area").hover(function(){	/*$(".main .alone .big-pic-list li").hover(function(){*/
	var bigList_index = $(this).index();
	$(".main .alone .mirror").addClass("active");
	$(".main .alone .max-pic").addClass("active");
	$(".main .alone .max-pic .max-pic-list li").eq(bigList_index).addClass("active");
},function(){
	$(".main .alone .mirror").removeClass("active");
	$(".main .alone .max-pic").removeClass("active");
	$(".main .alone .max-pic .max-pic-list li").removeClass("active");
})


$(".main .alone .mirror").mousemove(function(e){
	var x = e.pageX - $(".main .alone .pic-area").offset().left - $(".main .alone .mirror").width()/2;
	var y = e.pageY - $(".main .alone .pic-area").offset().top - $(".main .alone .mirror").height()/2;

	if(x<0){
		x = 0;
	}
	if(x>$(".main .alone .pic-area").width() - $(".main .alone .mirror").width()){
		x=$(".main .alone .pic-area").width() - $(".main .alone .mirror").width()
	}
	if(y<0){
		y = 0;
	}
	if(y>$(".main .alone .pic-area").height() - $(".main .alone .mirror").height()){
		y=$(".main .alone .pic-area").height() - $(".main .alone .mirror").height()
	}
	
	$(".main .alone .mirror").css("left",x);
	$(".main .alone .mirror").css("top",y);
	
	$(".max-pic img").css("left",-x*2);
	$(".max-pic img").css("top",-y*2);
})
	
/*tab 切换图片*/
$(".alone .small-pic-list li").mouseenter(function(){

	var smallList_index = $(this).index();

	$(".main .alone .big-pic-list li").eq(smallList_index).addClass("active").siblings().removeClass("active");
	$(".main .alone .max-pic-list li").eq(smallList_index).addClass("active").siblings().removeClass("active");
})






























