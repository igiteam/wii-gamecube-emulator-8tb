(function(){function a(){function b(g,e){var g=$(g);
var e=e;
var k=g.find(".icon-x");
var l=g.find(".model-cancel-button");
var i=g.find(".model-continue-button");
var h=g.find(".model-accept-button");
var f=g.find(".product-support__model-content1");
var d=g.find(".product-support__model-content2");
var j=g.find("#downloadAcceptChx");
k.click(function(){g.removeClass("open");
f.addClass("active");
d.removeClass("active");
i.addClass("active");
h.removeClass("active");
j.prop("checked",false);
h.find("button").attr("disabled","")
});
l.click(function(){g.removeClass("open");
f.addClass("active");
d.removeClass("active");
i.addClass("active");
h.removeClass("active");
j.prop("checked",false);
h.find("button").attr("disabled","")
});
i.click(function(){f.removeClass("active");
d.addClass("active");
i.removeClass("active");
h.addClass("active");
k.focus()
});
j.click(function(){if(j.is(":checked")){h.find("button").removeAttr("disabled")
}else{h.find("button").attr("disabled","")
}});
h.click(function(){g.removeClass("open");
f.addClass("active");
d.removeClass("active");
i.addClass("active");
h.removeClass("active");
j.prop("checked",false);
h.find("button").attr("disabled","")
})
}if($(".product-support__warranty").length){var c=$(".product-support__warranty").find(".ec-btn");
if(c.attr("target")=="_blank"&&c.attr("href").indexOf("pdf")>-1){c.click(function(d){d.preventDefault();
$(".product-support__model-wrapper").addClass("open");
$(".product-support__model-wrapper").find(".icon-x").focus();
$(".product-support__model-wrapper").find(".model-accept-button").unbind("click");
$(".product-support__model-wrapper").find(".model-accept-button").click(function(){window.open($(".product-support__warranty").find(".ec-btn").attr("href"),"_blank")
});
b(".product-support__model-wrapper",$(".product-support__warranty").find(".ec-btn").attr("href"))
})
}}if($(".product-support__manual").length){var c=$(".product-support__manual").find(".ec-btn");
if(c.attr("target")=="_blank"&&c.attr("href").indexOf("pdf")>-1){c.click(function(d){d.preventDefault();
$(".product-support__model-wrapper").addClass("open");
$(".product-support__model-wrapper").find(".icon-x").focus();
$(".product-support__model-wrapper").find(".model-accept-button").unbind("click");
$(".product-support__model-wrapper").find(".model-accept-button").click(function(){window.open($(".product-support__manual").find(".ec-btn").attr("href"),"_blank")
});
b(".product-support__model-wrapper",$(".product-support__manual").find(".ec-btn").attr("href"))
})
}}}a();
window.AEMapp=window.AEMapp||{};
window.AEMapp.tvPdpConf=window.AEMapp.tvPdpConf||{};
window.AEMapp.tvPdpConf.productSupportInit=a
})();