function e(){$(".bgLRextendTrigger").each(function(){let e=$(this).offset().top-50;$(window).scrollTop()>=e-$(window).height()?$(this).addClass("bgLRextend"):$(this).removeClass("bgLRextend")}),$(".bgappearTrigger").each(function(){let e=$(this).offset().top-50;$(window).scrollTop()>=e-$(window).height()?$(this).addClass("bgappear"):$(this).removeClass("bgappear")}),$(".fadeUpTrigger").each(function(){let e=$(this).offset().top-50;$(window).scrollTop()>=e-$(window).height()?$(this).addClass("fadeUp"):$(this).removeClass("fadeUp")}),$(".flipLeftTrigger").each(function(){let e=$(this).offset().top-50;$(window).scrollTop()>=e-$(window).height()?$(this).addClass("flipLeft"):$(this).removeClass("flipLeft")})}$(window).on("scroll",()=>{PageTopAnime();e()}),$(window).on("load",function(){$(".scrollgress").addClass("hidden"),$("#footer").addClass("hidden"),$("#splash-logo").delay(1200).fadeOut("slow"),$("#splash").delay(500).fadeOut("slow",function(){$("body").addClass("appear"),PageTopAnime(),$(".scrollgress").delay(1e3).queue(function(){$(".scrollgress").removeClass("hidden")}),$("#footer").delay(1500).queue(function(){$("#footer").removeClass("hidden")})}),$(".splashbg").on("animationend",()=>{e()})});