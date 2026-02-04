//tealium universal tag - utag.46 ut4.0.202601291031, Copyright 2026 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,"link":1};u.initialized=false;u.map={};u.extend=[function(a,b){try{if(1){var getHookLogicUserId=function getUserId(){var AMCV_MATCH=/AMCV_[0-9A-Z%]+AdobeOrg=([0-9a-zA-Z%\-_]+)/g.exec(document.cookie)
var S_VI_MATCH=/s_vi=([0-9a-zA-Z%\-|[\]]+)/g.exec(document.cookie)
if(S_VI_MATCH){return S_VI_MATCH[1]}
return AMCV_MATCH?AMCV_MATCH[1]:'unidentified'}
if(b.mobileApp===true){b.sviAmcvRegexCookieValue=b["cp.NativeAppVID"]}else{b.sviAmcvRegexCookieValue=getHookLogicUserId()}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={"base_url":"//retail-eu.productads.hlserve.com/Delivery/ClientPaths/Library/hook.js?apiKey=d3b53863-2511-4dce-9cd6-de1f7c02201a"
};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;try{var sku=b["js_page.digitalData.product[0].productInfo.productID"];var price=b["js_page.digitalData.product[0].attributes.unitPriceWithTax"];var inStock=b["js_page.digitalData.product[0].attributes.collectionStockCode"]
var shopper_browser_id=decodeURIComponent(b.sviAmcvRegexCookieValue)
HLLibrary.newUpdate()
.setProperty("shopper-browser-id",shopper_browser_id)
.setProperty("hlPageType","P")
.setProperty("sku",sku)
.setProperty("price",price)
.setProperty("inStock",inStock)
.submit();}catch(exception){utag.DB('This error happened: '+exception.message)}
};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_46'});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("46","argos.main");}catch(error){utag.DB(error);}
