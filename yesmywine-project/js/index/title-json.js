//我的账户
$.ajax({
	url: '../json/index/title.json',
	type: 'get',
	dataType: 'json',
	success: function(data){
		//console.log(data);
		accountDom(data.myAccountInformation);
		//var data = data.myAccountInformation;
		//var account = '';

		/*for(var i=0; i < data.length; i++){
			account += '<li><a href="'+
						data[i].href+ '>' +
						data[i].title+
						'"</a></li>'
		}
		$(".my-account-list").html(account);*/
	},
	error: function(wrong){
		alert("This is wrong!!!")
	}
});
var account = '';
function accountDom(da){
	for(var i=0; i < da.length; i++){
			account += '<li><a href="'+da[i].href + '">' +da[i].title+'</a></li>'
		};
	$(".my-account-list").html(account);
}

/************************大海报上面列表的表头*******************************************/
/*$.ajax({
	url:"../json/index/title.json",
	type: "get",
	dataType: "json",
	success:function(data){
		//var d = data.adverRight
		console.log(data);
		adverRightTitle(data.adverRight)		
	},
	error:function(){
		alert("This is wrong!!!")
	}
});
var adver_right_title = '';
function adverRightTitle(d){
	for(var i = 0; i < d; i++){
			adver_right_title += '<li><a href="'+d[i].href+'"><h1>'+d[i].title1+
								'</h1><p>'+d[i].title2+'</p></a></li>'
		};
	$(".adver-right .title ul").html(adver_right_title);
}*/








