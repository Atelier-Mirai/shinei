$("#pc-nav a, #g-nav a").on("click",()=>{let t=$(this).attr("href");let a=$("#header").outerHeight(!0);let o=Math.round($(t).offset().top-a);$("body,html").animate({scrollTop:o},500);return!1});