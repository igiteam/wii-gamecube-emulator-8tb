$(window).on("load",function(){$(function(){function a(){function d(f){f=f.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var e="[\\?&]"+f+"=([^&#]*)";
var h=new RegExp(e);
var g=h.exec(window.location.href);
if(g==null){return""
}else{return decodeURIComponent(g[1].replace(/\+/g," "))
}}if(location.hash&&location.hash.split("#")[1]==="reviews"){$(".spinner-container").css({display:"block"});
var c=false||!!document.documentMode?8000:5000;
$("html, body").animate({scrollTop:$(location.hash).offset().top-50},0);
var b=setInterval(function(){try{if($("#BVRRSearchContainer").length>0&&($("#BVRRContainer .bv-write-review.bv-submission-button").length>0||$("#BVRRContainer .bv-write-review-label.bv-submission-button").length>0)){$("#BVRRContainer .bv-write-review-label.bv-submission-button").removeClass("bv-submission-button").text("Share your product experience").attr({"data-link_cat":"rating and reviews","data-link_id":"share your product experience ","data-link_meta":"link_name:share your product experience","data-link_position":"reviews","data-event_name":"reviews_share your product experience_click"});
$("#BVRRContainer .bv-write-review.bv-submission-button").removeClass("bv-submission-button").text("Share your product experience").attr({"data-link_cat":"rating and reviews","data-link_id":"share your product experience ","data-link_meta":"link_name:share your product experience","data-link_position":"reviews","data-event_name":"reviews_share your product experience_click"});
$("#BVRRContainer .bv-write-review, #BVRRContainer .bv-write-review-label").on("click",function(g){if(d("usertoken")||d("cid").indexOf("eml-")>-1||d("CID").indexOf("eml-")>-1){$(".write-review-container.write-review").show();
$("html body").addClass("no-scroll");
window.iAdvize&&window.iAdvize.navigate&&window.iAdvize.navigate("/reviews")
}else{if(!window.Cookies("xsdcxyn")){window.Cookies("openReview","true",{domain:".samsung.com",path:"/"});
window.location.href="/us/account/signin/?options=write-review&redirect="+encodeURIComponent(window.location.href)
}else{$(".write-review-container.write-review").show();
$("html body").addClass("no-scroll");
$('#write-review-input-phase0 input[name="name"]').change();
window.iAdvize&&window.iAdvize.navigate&&window.iAdvize.navigate("/reviews")
}}$(".write-review-container.write-review input").each(function(h,e){if($(this).val()){$(this).siblings("label").addClass("filled")
}})
});
clearInterval(b);
$(".spinner-container").css({display:"none"})
}}catch(f){console.log('No such hash key "'+location.hash+'" founded!')
}},500)
}else{var b=setInterval(function(){try{if($("#BVRRContainer .bv-write-review.bv-submission-button").length>0||$("#BVRRContainer .bv-write-review-label.bv-submission-button").length>0){$("#BVRRContainer .bv-write-review.bv-submission-button").removeClass("bv-submission-button").text("Share your product experience").attr({"data-link_cat":"rating and reviews","data-link_id":"share your product experience ","data-link_meta":"link_name:share your product experience","data-link_position":"reviews","data-event_name":"reviews_share your product experience_click"});
$("#BVRRContainer .bv-write-review-label.bv-submission-button").removeClass("bv-submission-button").text("Share your product experience").attr({"data-link_cat":"rating and reviews","data-link_id":"share your product experience ","data-link_meta":"link_name:share your product experience","data-link_position":"reviews","data-event_name":"reviews_share your product experience_click"});
$("#BVRRContainer .bv-write-review, #BVRRContainer .bv-write-review-label").on("click",function(g){if(d("usertoken")||d("cid").indexOf("eml-")>-1||d("CID").indexOf("eml-")>-1){$(".write-review-container.write-review").show();
$("html body").addClass("no-scroll");
window.iAdvize&&window.iAdvize.navigate&&window.iAdvize.navigate("/reviews")
}else{if(!window.Cookies("xsdcxyn")){window.Cookies("openReview","true",{domain:".samsung.com",path:"/"});
window.location.href="/us/account/signin/?options=write-review&redirect="+encodeURIComponent(window.location.href)
}else{$(".write-review-container.write-review").show();
$("html body").addClass("no-scroll");
$('#write-review-input-phase0 input[name="name"]').change();
window.iAdvize&&window.iAdvize.navigate&&window.iAdvize.navigate("/reviews")
}}$(".write-review-container.write-review input").each(function(h,e){if($(this).val()){$(this).siblings("label").addClass("filled")
}})
});
clearInterval(b)
}}catch(f){}},500)
}}a();
window.AEMapp=window.AEMapp||{};
window.AEMapp.tvPdpConf=window.AEMapp.tvPdpConf||{};
window.AEMapp.tvPdpConf.productReviewInit=a
})
});