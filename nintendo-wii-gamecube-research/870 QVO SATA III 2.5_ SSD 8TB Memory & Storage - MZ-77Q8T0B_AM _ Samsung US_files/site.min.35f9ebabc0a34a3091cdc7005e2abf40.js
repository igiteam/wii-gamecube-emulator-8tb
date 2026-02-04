$(window).on("load",function(){$(function(){function a(){$(".product-specs.section").each(function(){var f=$(this);
var e=f.find(".ns-control-button--expand > .tl-btn-expand");
var c=f.find(".ns-control-button--hide > .tl-btn-hide");
var b=f.find(".spec-details.container-wrapper");
var d=$(".product-specs-i18n").attr("data-i18n-see-all-specs");
var g=$(".product-specs-i18n").attr("data-i18n-hide-all-specs");
$(e).click(function(){var h=this;
if($(this).hasClass("tl-btn-expand")){setTimeout(function(){$(h).text(g).removeClass("tl-btn-expand").addClass("tl-btn-hide");
console.log("switch to hide")
},500);
$(b).velocity("slideDown",{duration:500});
console.log(f);
f.find(".ns-control-button--expand").velocity("scroll",{duration:500})
}else{$(b).velocity("slideUp",{duration:500});
setTimeout(function(){$(h).text(d).removeClass("tl-btn-hide").addClass("tl-btn-expand")
},500);
f.velocity("scroll",{duration:500})
}});
$(this).find(".container .row:first-child").equalize({children:".spec-card__description",reset:true,equalize:"height"});
$(this).find(".spec-download").hide();
$(this).find(".spec-download").first().show();
$(c).click(function(){console.log("click");
$(b).velocity("slideUp",{duration:500});
f.velocity("scroll",{duration:500});
setTimeout(function(){$(e).text(d).removeClass("tl-btn-hide").addClass("tl-btn-expand")
},500)
})
});
$(".ns-product-spec-tooltip").tooltip()
}$(document).mouseup(function(c){var d=$(".tooltip-root").find(".tooltip__radio:checkbox:checked");
var b=$(d).parent();
if(!$(b).find(".tooltip__icon").is(c.target)&&!$(b).find(".tooltip__box").is(c.target)&&$(b).find(".tooltip__box").has(c.target).length===0){$(d).prop("checked",false)
}});
a();
window.AEMapp=window.AEMapp||{};
window.AEMapp.tvPdpConf=window.AEMapp.tvPdpConf||{};
window.AEMapp.tvPdpConf.productSpecsInit=a
})
});