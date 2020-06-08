
function iscroller(o){
	function loaded(o) {
		var myScroll = new iScroll(o,{ hScrollbar:false, vScrollbar:false});
//		var myScroll = new iScroll(o);
	}
	document.addEventListener('DOMContentLoaded', loaded(o), false);
}
$(function(){
	banner();
	
	$('body').bind({
        'touchmove': function(){  }
    })
	$(window).scroll(function() {
		var a = $(document).scrollTop();
		if(a>=200){
			$(".g-top").show();
		}else{
			$(".g-top").hide()
		}
	});
	$(".g-top").bind("click",function() {
 		 $("body, html").stop().animate({"scrollTop":"0px"});
	});
	
	//navBtn
	$(".navBtn").click(function(){
	    if($(".subNav").hasClass("subNavShow2")){
	    	layout(0);
	    }else{
	    	layout(1);
	    }
		$(".subNav").toggleClass("subNavShow2");
		$(this).toggleClass("close");
	});
	//goBack
	$(".goBack").click(function(){ 
		// history.back();
		history.go(-1);  
    });
    if($(".menu").find(".hover .box a").length){
    	$(".menuCon").css("height","1.7rem");
    }
});
/* banner */
function banner(){
	if($("#banner .item").length < 2){ return false; }
	var $a = $("#banner"), length = $a.find(".item").length, vi = 0, wid, t, autoPlayTime = 8000, autoAnimateTime = 500, loop = true;
	// 克隆元素
	var clone = $a.find(".item").eq(0).clone().addClass("clone"), tipHtml = "";;
	$a.find(".list").append(clone);
	// 生成Tip
	if(length > 1){
		for(var i=0; i<length; i++){
			i == 0 ? tipHtml += "<span class='cur'></span>" : tipHtml += "<span></span>";
		}
		$a.find(".tip").show();
	}
	$a.find(".tip").html(tipHtml);
	// 自适应宽度
	var _init = function(){
		wid = $a.width();
		$a.find(".list").width(wid*(length+1));
		$a.find(".item").width(wid);
		$a.find("img").css({"width":wid});
		$a.css({"opacity":1});
	}
	// 滚动效果函数
	var _func = function(){
		if(vi >= length){
			vi = 0;
		}else{
			vi++;
			$a.find(".list").css({"-webkit-transform":"translate3d(-" + wid*vi + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
			if(vi == length){
				$a.find(".tip").children("span").eq(0).addClass("cur").siblings().removeClass("cur");
				setTimeout(function(){
					$a.find(".list").css({"-webkit-transform":"translate3d(0px, 0px, 0px)", "-webkit-transition":"-webkit-transform 0ms linear"});
				}, autoAnimateTime);
			}else{
				$a.find(".tip").children("span").eq(vi).addClass("cur").siblings().removeClass("cur");
			}
		}
	}
	// 滑动触发效果
	var _touch = function(){
		var o_pagex = 0, o_pagey = 0,   // 接触记录值
			e_pagex = 0, e_pagey = 0;   // 离开记录值
		$a.bind({
			"touchstart":function(e){
				clearInterval(t);
				o_pagex = e.originalEvent.targetTouches[0].pageX;
				o_pagey = e.originalEvent.targetTouches[0].pageY;
			},
			"touchstart":function(e){
				clearInterval(t);
				o_pagex = e.originalEvent.targetTouches[0].pageX;
				o_pagey = e.originalEvent.targetTouches[0].pageY;
			},
			"touchmove":function(e){
				e_pagex = e.originalEvent.changedTouches[0].pageX;
				e_pagey = e.originalEvent.changedTouches[0].pageY;
				var xpage = e_pagex - o_pagex;   //::负数-向左边滑动::正数-向右边滑动
				var ypage = e_pagey - o_pagey;
				if(Math.abs(xpage) > Math.abs(ypage)){
					if(xpage >= 0){
						if(vi <= 0){
							$a.find(".list").css({'transform':'translate3d(-' + (wid*length - xpage) + 'px, 0px, 0px)', 'transition':'transform 0ms linear'});
							vi = length;
						}
					}else{
						if(vi >= length){
							$a.find(".list").css({'transform':'translate3d(0px, 0px, 0px)', 'transition':'transform 0ms linear'});
							vi = 0;
						}
					}
					$a.find(".list").css({'transform':'translate3d(-' + (wid*vi - xpage) + 'px, 0px, 0px)', 'transition':'transform 0ms linear'});
					e.preventDefault();
				}
			},
			'touchend':function(e){
				$a.find(".list").css({'transition':'transform ' + autoAnimateTime + 'ms linear'});
				e_pagex = e.originalEvent.changedTouches[0].pageX
				e_pagey = e.originalEvent.changedTouches[0].pageY
				if(Math.abs(e_pagey - o_pagey) > 0 && Math.abs(e_pagex - o_pagex) < 50){
					vi -=1;
					_func();
				}else{
					if(e_pagex - o_pagex > 0){  // 手指向右边滑动
						vi-=2;
						_func();
					}else if(e_pagex - o_pagex < 0){  // 手指向左边滑动
						_func();
					}
				}
//				t = setInterval(_func, autoPlayTime);
			}
		});
	}
	_touch();  // 手指滑动触发
	_init();  // 自适应宽度
	t = setInterval(_func, autoPlayTime);
	$(window).resize(_init);  // 改变浏览器宽度
	window.onorientationchange = function() {
        _init();
    }
}
//layout
function layout(u){
	var $obj = $('<div class="dialog-layout"></div>');
	if(u == 0){
		$('.dialog-layout').remove();
	}else{
		if(!$('.dialog-layout').length){
			$obj.appendTo('body').show();
		}
	}
}
    if (!$(".cateList .box").find("a").length) {
        $(".cateList .box").remove();
        //		$(".cateList h3 s").remove();
    } else {
        $(".cateList h3").click(function () {
            $(".cateList h3 s").toggleClass('rotate1', "");
        });
    }
	
	if($('.box > *').length){
     $('.icon').show();
}

$('.cateList h3').bind('click', function(){
    if($('.box').is(':hidden')){
        $('.box').slideDown();
    }else{
        $('.box').slideUp();
    }
})
/* 微信提示 */
	var btn=document.getElementById('btn');
	var clipboard=new Clipboard(btn);
	clipboard.on('success', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
	clipboard.on('error', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
/* 微信弹窗 */
function dkcf(){$('#wxnr').fadeIn("fast");$('#fdwx').fadeOut("fast");}
function gbcf(){$('#fdwx').fadeIn("slow");$('#wxnr').fadeOut("fast");}