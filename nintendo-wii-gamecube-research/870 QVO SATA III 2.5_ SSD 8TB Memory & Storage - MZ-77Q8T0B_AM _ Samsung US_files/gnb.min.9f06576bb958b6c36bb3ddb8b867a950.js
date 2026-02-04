/**
 * Copyright (c) 2005 - 2010, James Auldridge
 * All rights reserved.
 *
 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
 *  http://code.google.com/p/cookies/wiki/License
 *
 */
var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};jaaulde.utils.cookies=(function(){var resolveOptions,assembleOptionsString,parseCookies,constructor,defaultOptions={expiresAt:null,path:'/',domain:null,secure:false};resolveOptions=function(options){var returnValue,expireDate;if(typeof options!=='object'||options===null){returnValue=defaultOptions;}else
{returnValue={expiresAt:defaultOptions.expiresAt,path:defaultOptions.path,domain:defaultOptions.domain,secure:defaultOptions.secure};if(typeof options.expiresAt==='object'&&options.expiresAt instanceof Date){returnValue.expiresAt=options.expiresAt;}else if(typeof options.hoursToLive==='number'&&options.hoursToLive!==0){expireDate=new Date();expireDate.setTime(expireDate.getTime()+(options.hoursToLive*60*60*1000));returnValue.expiresAt=expireDate;}if(typeof options.path==='string'&&options.path!==''){returnValue.path=options.path;}if(typeof options.domain==='string'&&options.domain!==''){returnValue.domain=options.domain;}if(options.secure===true){returnValue.secure=options.secure;}}return returnValue;};assembleOptionsString=function(options){options=resolveOptions(options);return((typeof options.expiresAt==='object'&&options.expiresAt instanceof Date?'; expires='+options.expiresAt.toGMTString():'')+'; path='+options.path+(typeof options.domain==='string'?'; domain='+options.domain:'')+(options.secure===true?'; secure':''));};parseCookies=function(){var cookies={},i,pair,name,value,separated=document.cookie.split(';'),unparsedValue;for(i=0;i<separated.length;i=i+1){pair=separated[i].split('=');name=pair[0].replace(/^\s*/,'').replace(/\s*$/,'');try
{value=decodeURIComponent(pair[1]);}catch(e1){value=pair[1];}if(typeof JSON==='object'&&JSON!==null&&typeof JSON.parse==='function'){try
{unparsedValue=value;value=JSON.parse(value);}catch(e2){value=unparsedValue;}}cookies[name]=value;}return cookies;};constructor=function(){};constructor.prototype.get=function(cookieName){var returnValue,item,cookies=parseCookies();if(typeof cookieName==='string'){returnValue=(typeof cookies[cookieName]!=='undefined')?cookies[cookieName]:null;}else if(typeof cookieName==='object'&&cookieName!==null){returnValue={};for(item in cookieName){if(typeof cookies[cookieName[item]]!=='undefined'){returnValue[cookieName[item]]=cookies[cookieName[item]];}else
{returnValue[cookieName[item]]=null;}}}else
{returnValue=cookies;}return returnValue;};constructor.prototype.filter=function(cookieNameRegExp){var cookieName,returnValue={},cookies=parseCookies();if(typeof cookieNameRegExp==='string'){cookieNameRegExp=new RegExp(cookieNameRegExp);}for(cookieName in cookies){if(cookieName.match(cookieNameRegExp)){returnValue[cookieName]=cookies[cookieName];}}return returnValue;};constructor.prototype.set=function(cookieName,value,options){if(typeof options!=='object'||options===null){options={};}if(typeof value==='undefined'||value===null){value='';options.hoursToLive=-8760;}else if(typeof value!=='string'){if(typeof JSON==='object'&&JSON!==null&&typeof JSON.stringify==='function'){value=JSON.stringify(value);}else
{throw new Error('cookies.set() received non-string value and could not serialize.');}}var optionsString=assembleOptionsString(options);document.cookie=cookieName+'='+encodeURIComponent(value)+optionsString;};constructor.prototype.del=function(cookieName,options){var allCookies={},name;if(typeof options!=='object'||options===null){options={};}if(typeof cookieName==='boolean'&&cookieName===true){allCookies=this.get();}else if(typeof cookieName==='string'){allCookies[cookieName]=true;}for(name in allCookies){if(typeof name==='string'&&name!==''){this.set(name,null,options);}}};constructor.prototype.test=function(){var returnValue=false,testName='cT',testValue='data';this.set(testName,testValue);if(this.get(testName)===testValue){this.del(testName);returnValue=true;}return returnValue;};constructor.prototype.setOptions=function(options){if(typeof options!=='object'){options=null;}defaultOptions=resolveOptions(options);};return new constructor();})();(function(){if(window.jQuery){(function($){$.cookies=jaaulde.utils.cookies;var extensions={cookify:function(options){return this.each(function(){var i,nameAttrs=['name','id'],name,$this=$(this),value;for(i in nameAttrs){if(!isNaN(i)){name=$this.attr(nameAttrs[i]);if(typeof name==='string'&&name!==''){if($this.is(':checkbox, :radio')){if($this.attr('checked')){value=$this.val();}}else if($this.is(':input')){value=$this.val();}else
{value=$this.html();}if(typeof value!=='string'||value===''){value=null;}$.cookies.set(name,value,options);break;}}}});},cookieFill:function(){return this.each(function(){var n,getN,nameAttrs=['name','id'],name,$this=$(this),value;getN=function(){n=nameAttrs.pop();return!!n;};while(getN()){name=$this.attr(n);if(typeof name==='string'&&name!==''){value=$.cookies.get(name);if(value!==null){if($this.is(':checkbox, :radio')){if($this.val()===value){$this.attr('checked','checked');}else
{$this.removeAttr('checked');}}else if($this.is(':input')){$this.val(value);}else
{$this.html(value);}}break;}}});},cookieBind:function(options){return this.each(function(){var $this=$(this);$this.cookieFill().change(function(){$this.cookify(options);});});}};$.each(extensions,function(i){$.fn[i]=this;});})(window.jQuery);}})();/* END FILE */

// jQuery Mask Plugin v1.14.10
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp={scope:{},findInternal:function(a,f,c){a instanceof String&&(a=String(a));for(var l=a.length,g=0;g<l;g++){var b=a[g];if(f.call(c,b,g,a))return{i:g,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,f,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[f]=c.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,f,c,l){if(f){c=$jscomp.global;a=a.split(".");for(l=0;l<a.length-1;l++){var g=a[l];g in c||(c[g]={});c=c[g]}a=a[a.length-1];l=c[a];f=f(l);f!=l&&null!=f&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:f})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6-impl","es3");
(function(a,f,c){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(f||c)})(function(a){var f=function(b,h,e){var d={invalid:[],getCaret:function(){try{var a,n=0,h=b.get(0),e=document.selection,k=h.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-d.val().length),n=a.text.length;else if(k||"0"===k)n=k;return n}catch(A){}},setCaret:function(a){try{if(b.is(":focus")){var p,
d=b.get(0);d.setSelectionRange?d.setSelectionRange(a,a):(p=d.createTextRange(),p.collapse(!0),p.moveEnd("character",a),p.moveStart("character",a),p.select())}}catch(z){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val())}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",d.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",
function(){c===d.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){c=d.val()}).on("focus.mask",function(b){!0===e.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!g.test(d.val())&&d.val("")})},getRegexMask:function(){for(var a=[],b,d,e,k,c=0;c<h.length;c++)(b=m.translation[h.charAt(c)])?(d=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),e=b.optional,(b=b.recursive)?(a.push(h.charAt(c)),k={digit:h.charAt(c),pattern:d}):
a.push(e||b?d+"?":d)):a.push(h.charAt(c).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");k&&(a=a.replace(new RegExp("("+k.digit+"(.*"+k.digit+")?)"),"($1)?").replace(new RegExp(k.digit,"g"),k.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var d=b.is("input")?"val":"text";if(0<arguments.length){if(b[d]()!==a)b[d](a);d=b}else d=b[d]();return d},calculateCaretPosition:function(a,d){var h=
d.length,e=b.data("mask-previus-value")||"",k=e.length;8===b.data("mask-keycode")&&e!==d?a-=d.slice(0,a).length-e.slice(0,a).length:e!==d&&(a=a>=k?h:a+(d.slice(0,a).length-e.slice(0,a).length));return a},behaviour:function(e){e=e||window.event;d.invalid=[];var h=b.data("mask-keycode");if(-1===a.inArray(h,m.byPassKeys)){var h=d.getMasked(),c=d.getCaret();setTimeout(function(a,b){d.setCaret(d.calculateCaretPosition(a,b))},10,c,h);d.val(h);d.setCaret(c);return d.callbacks(e)}},getMasked:function(a,b){var c=
[],p=void 0===b?d.val():b+"",k=0,g=h.length,f=0,l=p.length,n=1,v="push",w=-1,r,u;e.reverse?(v="unshift",n=-1,r=0,k=g-1,f=l-1,u=function(){return-1<k&&-1<f}):(r=g-1,u=function(){return k<g&&f<l});for(var y;u();){var x=h.charAt(k),t=p.charAt(f),q=m.translation[x];if(q)t.match(q.pattern)?(c[v](t),q.recursive&&(-1===w?w=k:k===r&&(k=w-n),r===w&&(k-=n)),k+=n):t===y?y=void 0:q.optional?(k+=n,f-=n):q.fallback?(c[v](q.fallback),k+=n,f-=n):d.invalid.push({p:f,v:t,e:q.pattern}),f+=n;else{if(!a)c[v](x);t===x?
f+=n:y=x;k+=n}}p=h.charAt(r);g!==l+1||m.translation[p]||c.push(p);return c.join("")},callbacks:function(a){var f=d.val(),p=f!==c,g=[f,a,b,e],k=function(a,b,d){"function"===typeof e[a]&&b&&e[a].apply(this,d)};k("onChange",!0===p,g);k("onKeyPress",!0===p,g);k("onComplete",f.length===h.length,g);k("onInvalid",0<d.invalid.length,[f,a,b,d.invalid,e])}};b=a(b);var m=this,c=d.val(),g;h="function"===typeof h?h(d.val(),void 0,b,e):h;m.mask=h;m.options=e;m.remove=function(){var a=d.getCaret();d.destroyEvents();
d.val(m.getCleanVal());d.setCaret(a);return b};m.getCleanVal=function(){return d.getMasked(!0)};m.getMaskedVal=function(a){return d.getMasked(!1,a)};m.init=function(c){c=c||!1;e=e||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,e.translation);m=a.extend(!0,{},m,e);g=d.getRegexMask();if(c)d.events(),d.val(d.getMasked());else{e.placeholder&&b.attr("placeholder",e.placeholder);b.data("mask")&&b.attr("autocomplete",
"off");c=0;for(var f=!0;c<h.length;c++){var l=m.translation[h.charAt(c)];if(l&&l.recursive){f=!1;break}}f&&b.attr("maxlength",h.length);d.destroyEvents();d.events();c=d.getCaret();d.val(d.getMasked());d.setCaret(c)}};m.init(!b.is("input"))};a.maskWatchers={};var c=function(){var b=a(this),c={},e=b.attr("data-mask");b.attr("data-mask-reverse")&&(c.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(c.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(c.selectOnFocus=!0);if(l(b,e,c))return b.data("mask",
new f(this,e,c))},l=function(b,c,e){e=e||{};var d=a(b).data("mask"),h=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof c&&(c=c(b)),"object"!==typeof d||h(d.options)!==h(e)||d.mask!==c}catch(u){}},g=function(a){var b=document.createElement("div"),c;a="on"+a;c=a in b;c||(b.setAttribute(a,"return;"),c="function"===typeof b[a]);return c};a.fn.mask=function(b,c){c=c||{};var e=this.selector,d=a.jMaskGlobals,h=d.watchInterval,d=c.watchInputs||d.watchInputs,g=function(){if(l(this,b,
c))return a(this).data("mask",new f(this,b,c))};a(this).each(g);e&&""!==e&&d&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(g)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};
a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(c)};g={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&g("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},
S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};g=a.jMaskGlobals=a.extend(!0,{},g,a.jMaskGlobals);g.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},g.watchInterval)},window.jQuery,window.Zepto);
/*
 *  samsung.com v5 - r5.5.0
 *  Fri Nov 01 2013 17:37:06 GMT-0400 (EDT)
 */
function keyCodeNumberOnly(a){a="undefined"!=typeof a?a:event;var b=a.keyCode,c=!1;8==b||9==b?c=!0:b>=48&&57>=b?c=!0:b>=96&&105>=b&&(c=!0),1==a.ctrlKey&&86==b&&(c=!1),c||(a.preventDefault?a.preventDefault():a.returnValue=!1)}function isCustomPassword(a){if(0==a.length)return!0;var b=!1;return-1!=a.search(/^[a-zA-Z0-9\~\`\!\@\\\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\]\{\}\;\:\'\"\,\.\/\<\>\?]+$/)&&(b=!0),b}
function isCustomSameEmailPassword(a,b){
	var result = false;
	if( a.length == 0 || b.length == 0 ) result = true;
	else if(a.indexOf(b) == -1) result = true;
	return result;
	/*
	return		0==a.length
			||	0==b.length
			||	0>=a.indexOf("@")
			||	a.substring(0,a.indexOf("@")).toUpperCase()!=b.toUpperCase()?!0:!1
	*/
}
function isCustomSameCharPassword(a){if(3>a.length)return!0;for(var b=a.split(""),c=a=1;c<b.length&&(b[c-1].toUpperCase()==b[c].toUpperCase()?a++:a=1,!(a>=3));c++);return b=!1,3>a&&(b=!0),b}function isCustomAscDescPassword(a){if(3>a.length)return!0;var b=a.split("");a=1;for(var c="",d=1;d<b.length;d++){var e="1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(b[d-1].toUpperCase()),f="1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(b[d].toUpperCase());if(e+1==f?("ASC"==c?a++:a=2,c="ASC"):e-1==f?("DESC"==c?a++:a=2,c="DESC"):a=1,a>=3)break}return b=!1,3>a&&(b=!0),b}!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){if(a(this[0]).is("form"))return this.validate().form();var b=!0,c=a(this[0].form).validate();return this.each(function(){b=b&&c.element(this)}),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d=this[0];if(b){var e=a.data(d.form,"validator").settings,f=e.rules,g=a.validator.staticRules(d);switch(b){case"add":a.extend(g,a.validator.normalizeRule(c)),delete g.messages,f[d.name]=g,c.messages&&(e.messages[d.name]=a.extend(e.messages[d.name],c.messages));break;case"remove":if(!c)return delete f[d.name],g;var h={};return a.each(c.split(/\s/),function(a,b){h[b]=g[b],delete g[b]}),h}}var i=a.validator.normalizeRules(a.extend({},a.validator.classRules(d),a.validator.attributeRules(d),a.validator.dataRules(d),a.validator.staticRules(d)),d);if(i.required){var j=i.required;delete i.required,i=a.extend({required:j},i)}return i}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,"");c.settings[d]&&c.settings[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c=this.groups={};a.each(this.settings.groups,function(b,d){"string"==typeof d&&(d=d.split(/\s/)),a.each(d,function(a,d){c[d]=b})});var d=this.settings.rules;a.each(d,function(b,c){d[b]=a.validator.normalizeRule(c)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){b=this.validationTargetFor(this.clean(b)),this.lastElement=b,this.prepareElement(b),this.currentElements=a(b);var c=this.check(b)!==!1;return c?delete this.invalid[b.name]:this.invalid[b.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),c},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0;for(var c in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.replace(" ",".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c=a(b).attr("type"),d=a(b).val();return"radio"===c||"checkbox"===c?a("input[name='"+a(b).attr("name")+"']:checked").val():"string"==typeof d?d.replace(/\r/g,""):d},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d=a(b).rules(),e=!1,f=this.elementValue(b);for(var g in d){var h={method:g,parameters:d[g]};try{if(c=a.validator.methods[g].call(this,f,b,h.parameters),"dependency-mismatch"===c){e=!0;continue}if(e=!1,"pending"===c)return this.toHide=this.toHide.not(this.errorsFor(b)),void 0;if(!c)return this.formatAndAdd(b,h),!1}catch(i){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+h.method+"' method.",i),i}}return e?void 0:(this.objectLength(d)&&this.successList.push(b),!0)},customDataMessage:function(b,c){return a(b).data("msg-"+c.toLowerCase())||b.attributes&&a(b).attr("data-msg-"+c.toLowerCase())},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;arguments.length>a;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b;for(a=0;this.errorList[a];a++){var c=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c={},d=a(b),e=d[0].getAttribute("type");for(var f in a.validator.methods){var g;"required"===f?(g=d.get(0).getAttribute(f),""===g&&(g=!0),g=!!g):g=d.attr(f),/min|max/.test(f)&&(null===e||/number|range|text/.test(e))&&(g=Number(g)),g?c[f]=g:e===f&&"range"!==e&&(c[f]=!0)}return c.maxlength&&/-1|2147483647|524288/.test(c.maxlength)&&delete c.maxlength,c},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule-"+c.toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return delete b[d],void 0;if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],3>c.length&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(""+new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c=0,d=0,e=!1;a=a.replace(/\D/g,"");for(var f=a.length-1;f>=0;f--){var g=a.charAt(f);d=parseInt(g,10),e&&(d*=2)>9&&(d-=9),c+=d,e=!e}return 0===c%10},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&d[1]>=e},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&c[1]>=a},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e=this.previousValue(c);if(this.settings.messages[c.name]||(this.settings.messages[c.name]={}),e.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=e.message,d="string"==typeof d&&{url:d}||d,e.old===b)return e.valid;e.old=b;var f=this;this.startRequest(c);var g={};return g[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:g,success:function(d){f.settings.messages[c.name].remote=e.originalMessage;var g=d===!0||"true"===d;if(g){var h=f.formSubmitted;f.prepareElement(c),f.formSubmitted=h,f.successList.push(c),delete f.invalid[c.name],f.showErrors()}else{var i={},j=d||f.defaultMessage(c,"remote");i[c.name]=e.message=a.isFunction(j)?j(b):j,f.invalid[c.name]=!0,f.showErrors(i)}e.valid=g,f.stopRequest(c,g)}},d)),"pending"}}}),a.format=a.validator.format}(jQuery),function(a){var b={};if(a.ajaxPrefilter)a.ajaxPrefilter(function(a,c,d){var e=a.port;"abort"===a.mode&&(b[e]&&b[e].abort(),b[e]=d)});else{var c=a.ajax;a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(b[f]&&b[f].abort(),b[f]=c.apply(this,arguments),b[f]):c.apply(this,arguments)}}}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery),function(a){a.fn.alphanumeric=function(b){return b=a.extend({ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},b),this.each(function(){for(b.nocaps&&(b.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"),b.allcaps&&(b.nchars+="abcdefghijklmnopqrstuvwxyz"),s=b.allow.split(""),i=0;i<s.length;i++)-1!=b.ichars.indexOf(s[i])&&(s[i]="\\"+s[i]);b.allow=s.join("|");var c=b.ichars+b.nchars,c=c.replace(RegExp(b.allow,"gi"),"");a(this).keypress(function(a){k=a.charCode?String.fromCharCode(a.charCode):String.fromCharCode(a.which),-1!=c.indexOf(k)&&a.preventDefault(),a.ctrlKey&&"v"==k&&a.preventDefault()}),a(this).bind("contextmenu",function(){return!1})})},a.fn.numeric=function(b){var c="abcdefghijklmnopqrstuvwxyz",c=c+c.toUpperCase(),b=a.extend({nchars:c},b);return this.each(function(){a(this).alphanumeric(b)})},a.fn.alpha=function(b){return b=a.extend({nchars:"1234567890"},b),this.each(function(){a(this).alphanumeric(b)})}}(jQuery),function(a){var b=new function(){this.countRegexp=function(a,b){var c=a.match(b);return c?c.length:0},this.getStrength=function(a,b){var c=a.length;if(b>c||0==isCustomSameCharPassword(a)||0==isCustomAscDescPassword(a))return 0;var d=this.countRegexp(a,/\d/g),e=this.countRegexp(a,/[a-z]/g),f=this.countRegexp(a,/[A-Z]/g),g=c-d-e-f;if(d==c||e==c||f==c||g==c)return 1;var h=0;return d&&(h+=2),e&&(h+=f?4:3),f&&(h+=e?4:3),g&&(h+=5),c>10&&(h+=1),h},this.getStrengthLevel=function(a,b){var c=this.getStrength(a,b),a=1;return 0>=c?a=1:c>0&&4>=c?a=2:c>4&&8>=c?a=3:c>8&&12>=c?a=4:c>12&&(a=5),a}};a.fn.password_strength=function(c){var d=a.extend({container:null,bar:null,minLength:6,texts:{1:"Too weak",2:"Weak password",3:"Normal strength",4:"Strong password",5:"Very strong password"},onCheck:null},c);return this.each(function(){var c=null,e=null;d.container?c=a(d.container):(c=a("<span/>").attr("class","password_strength"),a(this).after(c)),d.bar&&(e=a(d.bar)),a(this).bind("keyup.password_strength",function(){var f=a(this).val(),g=b.getStrengthLevel(f,d.minLength);if(0<f.length){var f="password_strength_"+g,h="password_bar_"+g;!c.hasClass(f)&&g in d.texts&&c.text(d.texts[g]).attr("class","password_strength "+f),e&&!e.hasClass(h)&&e.attr("class","password_bar "+h)}else c.text("").attr("class","password_strength"),e&&e.attr("class","password_bar");d.onCheck&&d.onCheck.call(this,g)}),""!=a(this).val()&&a(this).trigger("keyup.password_strength")})}}(jQuery),function(a){function b(){a.each(c,function(){this.refresh(!0)})}var c=[],d=/^url\(["']?([^"'\)]*)["']?\);?$/i,e=/\.png$/i,f=!!window.createPopup&&"undefined"==document.documentElement.currentStyle.minWidth;a(window).resize(b),a.Poshytip=function(b,c){this.$elm=a(b),this.opts=a.extend({},a.fn.poshytip.defaults,c),this.$tip=a(['<div class="',this.opts.className,'">','<div class="tip-inner tip-bg-image"></div>','<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',"</div>"].join("")).appendTo(document.body),this.$arrow=this.$tip.find("div.tip-arrow"),this.$inner=this.$tip.find("div.tip-inner"),this.disabled=!1,this.content=null,this.init()},a.Poshytip.prototype={init:function(){c.push(this);var b=this.$elm.attr("title");if(this.$elm.data("title.poshytip",void 0!==b?b:null).data("poshytip",this),"none"!=this.opts.showOn)switch(this.$elm.bind({"mouseenter.poshytip":a.proxy(this.mouseenter,this),"mouseleave.poshytip":a.proxy(this.mouseleave,this)}),this.opts.showOn){case"hover":"cursor"==this.opts.alignTo&&this.$elm.bind("mousemove.poshytip",a.proxy(this.mousemove,this)),this.opts.allowTipHover&&this.$tip.hover(a.proxy(this.clearTimeouts,this),a.proxy(this.mouseleave,this));break;case"focus":this.$elm.bind({"focus.poshytip":a.proxy(this.showDelayed,this),"blur.poshytip":a.proxy(this.hideDelayed,this)})}},mouseenter:function(){return this.disabled?!0:(this.$elm.attr("title",""),"focus"==this.opts.showOn?!0:(this.showDelayed(),void 0))},mouseleave:function(a){if(this.disabled||this.asyncAnimating&&(this.$tip[0]===a.relatedTarget||jQuery.contains(this.$tip[0],a.relatedTarget)))return!0;if(!this.$tip.data("active")){var b=this.$elm.data("title.poshytip");null!==b&&this.$elm.attr("title",b)}return"focus"==this.opts.showOn?!0:(this.hideDelayed(),void 0)},mousemove:function(a){return this.disabled?!0:(this.eventX=a.pageX,this.eventY=a.pageY,this.opts.followCursor&&this.$tip.data("active")&&(this.calcPos(),this.$tip.css({left:this.pos.l,top:this.pos.t}),this.pos.arrow&&(this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow)),void 0)},show:function(){this.disabled||this.$tip.data("active")||(this.reset(),this.update(),this.content&&(this.display(),this.opts.timeOnScreen&&this.hideDelayed(this.opts.timeOnScreen)))},showDelayed:function(b){this.clearTimeouts(),this.showTimeout=setTimeout(a.proxy(this.show,this),"number"==typeof b?b:this.opts.showTimeout)},hide:function(){!this.disabled&&this.$tip.data("active")&&this.display(!0)},hideDelayed:function(b){this.clearTimeouts(),this.hideTimeout=setTimeout(a.proxy(this.hide,this),"number"==typeof b?b:this.opts.hideTimeout)},reset:function(){this.$tip.queue([]).detach().css("visibility","hidden").data("active",!1),this.$inner.find("*").poshytip("hide"),this.opts.fade&&this.$tip.css("opacity",this.opacity),this.$arrow[0].className="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left",this.asyncAnimating=!1},update:function(a,b){if(!this.disabled){var c=void 0!==a;if(c){if(b||(this.opts.content=a),!this.$tip.data("active"))return}else a=this.opts.content;var d=this,e="function"==typeof a?a.call(this.$elm[0],function(a){d.update(a)}):"[title]"==a?this.$elm.data("title.poshytip"):a;this.content!==e&&(this.$inner.empty().append(e),this.content=e),this.refresh(c)}},refresh:function(b){if(!this.disabled){if(b){if(!this.$tip.data("active"))return;var c={left:this.$tip.css("left"),top:this.$tip.css("top")}}this.$tip.css({left:0,top:0}).appendTo(document.body),void 0===this.opacity&&(this.opacity=this.$tip.css("opacity"));var g=this.$tip.css("background-image").match(d),h=this.$arrow.css("background-image").match(d);if(g){var i=e.test(g[1]);f&&i?(this.$tip.css("background-image","none"),this.$inner.css({margin:0,border:0,padding:0}),g=i=!1):this.$tip.prepend('<table class="tip-table" border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({border:0,padding:0,"background-image":"none","background-color":"transparent"}).find(".tip-bg-image").css("background-image",'url("'+g[1]+'")').end().find("td").eq(3).append(this.$inner),i&&!a.support.opacity&&(this.opts.fade=!1)}h&&!a.support.opacity&&(f&&e.test(h[1])&&(h=!1,this.$arrow.css("background-image","none")),this.opts.fade=!1);var j=this.$tip.find("> table.tip-table");if(f){this.$tip[0].style.width="",j.width("auto").find("td").eq(3).width("auto");var k=this.$tip.width(),l=parseInt(this.$tip.css("min-width")),m=parseInt(this.$tip.css("max-width"));!isNaN(l)&&l>k?k=l:!isNaN(m)&&k>m&&(k=m),this.$tip.add(j).width(k).eq(0).find("td").eq(3).width("100%")}else j[0]&&j.width("auto").find("td").eq(3).width("auto").end().end().width(document.defaultView&&document.defaultView.getComputedStyle&&parseFloat(document.defaultView.getComputedStyle(this.$tip[0],null).width)||this.$tip.width()).find("td").eq(3).width("100%");if(this.tipOuterW=this.$tip.outerWidth(),this.tipOuterH=this.$tip.outerHeight(),this.calcPos(),h&&this.pos.arrow&&(this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow,this.$arrow.css("visibility","inherit")),b&&this.opts.refreshAniDuration){this.asyncAnimating=!0;var n=this;this.$tip.css(c).animate({left:this.pos.l,top:this.pos.t},this.opts.refreshAniDuration,function(){n.asyncAnimating=!1})}else this.$tip.css({left:this.pos.l,top:this.pos.t})}},display:function(b){var c=this.$tip.data("active");if(!(c&&!b||!c&&b)){if(this.$tip.stop(),(this.opts.slide&&this.pos.arrow||this.opts.fade)&&(b&&this.opts.hideAniDuration||!b&&this.opts.showAniDuration)){var d={},e={};if(this.opts.slide&&this.pos.arrow){var f,g;"bottom"==this.pos.arrow||"top"==this.pos.arrow?(f="top",g="bottom"):(f="left",g="right");var h=parseInt(this.$tip.css(f));d[f]=h+(b?0:this.pos.arrow==g?-this.opts.slideOffset:this.opts.slideOffset),e[f]=h+(b?this.pos.arrow==g?this.opts.slideOffset:-this.opts.slideOffset:0)+"px"}this.opts.fade&&(d.opacity=b?this.$tip.css("opacity"):0,e.opacity=b?0:this.opacity),this.$tip.css(d).animate(e,this.opts[b?"hideAniDuration":"showAniDuration"])}if(b?this.$tip.queue(a.proxy(this.reset,this)):this.$tip.css("visibility","inherit"),c){var i=this.$elm.data("title.poshytip");null!==i&&this.$elm.attr("title",i)}this.$tip.data("active",!c)}},disable:function(){this.reset(),this.disabled=!0},enable:function(){this.disabled=!1},destroy:function(){this.reset(),this.$tip.remove(),delete this.$tip,this.content=null,this.$elm.unbind(".poshytip").removeData("title.poshytip").removeData("poshytip"),c.splice(a.inArray(this,c),1)},clearTimeouts:function(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=0),this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=0)},calcPos:function(){var b,c,d,e,f,g,h={l:0,t:0,arrow:""},i=a(window),j={l:i.scrollLeft(),t:i.scrollTop(),w:i.width(),h:i.height()};if("cursor"==this.opts.alignTo)b=c=d=this.eventX,e=f=g=this.eventY;else{var k=this.$elm.offset(),l={l:k.left,t:k.top,w:this.$elm.outerWidth(),h:this.$elm.outerHeight()};b=l.l+("inner-right"!=this.opts.alignX?0:l.w),c=b+Math.floor(l.w/2),d=b+("inner-left"!=this.opts.alignX?l.w:0),e=l.t+("inner-bottom"!=this.opts.alignY?0:l.h),f=e+Math.floor(l.h/2),g=e+("inner-top"!=this.opts.alignY?l.h:0)}switch(this.opts.alignX){case"right":case"inner-left":h.l=d+this.opts.offsetX,this.opts.keepInViewport&&h.l+this.tipOuterW>j.l+j.w&&(h.l=j.l+j.w-this.tipOuterW),("right"==this.opts.alignX||"center"==this.opts.alignY)&&(h.arrow="left");
break;case"center":h.l=c-Math.floor(this.tipOuterW/2),this.opts.keepInViewport&&(h.l+this.tipOuterW>j.l+j.w?h.l=j.l+j.w-this.tipOuterW:h.l<j.l&&(h.l=j.l));break;default:h.l=b-this.tipOuterW-this.opts.offsetX,this.opts.keepInViewport&&h.l<j.l&&(h.l=j.l),("left"==this.opts.alignX||"center"==this.opts.alignY)&&(h.arrow="right")}switch(this.opts.alignY){case"bottom":case"inner-top":h.t=g+this.opts.offsetY,h.arrow&&"cursor"!=this.opts.alignTo||(h.arrow="top"),this.opts.keepInViewport&&h.t+this.tipOuterH>j.t+j.h&&(h.t=e-this.tipOuterH-this.opts.offsetY,"top"==h.arrow&&(h.arrow="bottom"));break;case"center":h.t=f-Math.floor(this.tipOuterH/2),this.opts.keepInViewport&&(h.t+this.tipOuterH>j.t+j.h?h.t=j.t+j.h-this.tipOuterH:h.t<j.t&&(h.t=j.t));break;default:h.t=e-this.tipOuterH-this.opts.offsetY,h.arrow&&"cursor"!=this.opts.alignTo||(h.arrow="bottom"),this.opts.keepInViewport&&h.t<j.t&&(h.t=g+this.opts.offsetY,"bottom"==h.arrow&&(h.arrow="top"))}this.pos=h}},a.fn.poshytip=function(b){if("string"==typeof b){var c=arguments,d=b;return Array.prototype.shift.call(c),"destroy"==d&&(this.die?this.die("mouseenter.poshytip").die("focus.poshytip"):a(document).undelegate(this.selector,"mouseenter.poshytip").undelegate(this.selector,"focus.poshytip")),this.each(function(){var b=a(this).data("poshytip");b&&b[d]&&b[d].apply(b,c)})}var e=a.extend({},a.fn.poshytip.defaults,b);if(a("#poshytip-css-"+e.className)[0]||a(['<style id="poshytip-css-',e.className,'" type="text/css">',"div.",e.className,"{visibility:hidden;position:absolute;top:0;left:0;}","div.",e.className," table.tip-table, div.",e.className," table.tip-table td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;vertical-align:middle;}","div.",e.className," td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:",e.bgImageFrameSize,"px;width:",e.bgImageFrameSize,"px;overflow:hidden;}","div.",e.className," td.tip-right{background-position:100% 0;}","div.",e.className," td.tip-bottom{background-position:100% 100%;}","div.",e.className," td.tip-left{background-position:0 100%;}","div.",e.className," div.tip-inner{background-position:-",e.bgImageFrameSize,"px -",e.bgImageFrameSize,"px;}","div.",e.className," div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}","</style>"].join("")).appendTo("head"),e.liveEvents&&"none"!=e.showOn){var f,g=a.extend({},e,{liveEvents:!1});switch(e.showOn){case"hover":f=function(){var b=a(this);b.data("poshytip")||b.poshytip(g).poshytip("mouseenter")},this.live?this.live("mouseenter.poshytip",f):a(document).delegate(this.selector,"mouseenter.poshytip",f);break;case"focus":f=function(){var b=a(this);b.data("poshytip")||b.poshytip(g).poshytip("showDelayed")},this.live?this.live("focus.poshytip",f):a(document).delegate(this.selector,"focus.poshytip",f)}return this}return this.each(function(){new a.Poshytip(this,e)})},a.fn.poshytip.defaults={content:"[title]",className:"tip-yellow",bgImageFrameSize:10,showTimeout:500,hideTimeout:100,timeOnScreen:0,showOn:"hover",liveEvents:!1,alignTo:"cursor",alignX:"right",alignY:"top",offsetX:-22,offsetY:18,keepInViewport:!0,allowTipHover:!0,followCursor:!1,fade:!0,slide:!0,slideOffset:8,showAniDuration:300,hideAniDuration:300,refreshAniDuration:200}}(jQuery);
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function(){if("undefined"!==typeof window&&window.addEventListener){var e=Object.create(null),l,d=function(){clearTimeout(l);l=setTimeout(n,100)},m=function(){},t=function(){window.addEventListener("resize",d,!1);window.addEventListener("orientationchange",d,!1);if(window.MutationObserver){var k=new MutationObserver(d);k.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0});m=function(){try{k.disconnect(),window.removeEventListener("resize",d,!1),window.removeEventListener("orientationchange",
d,!1)}catch(v){}}}else document.documentElement.addEventListener("DOMSubtreeModified",d,!1),m=function(){document.documentElement.removeEventListener("DOMSubtreeModified",d,!1);window.removeEventListener("resize",d,!1);window.removeEventListener("orientationchange",d,!1)}},u=function(k){function e(a){if(void 0!==a.protocol)var c=a;else c=document.createElement("a"),c.href=a;return c.protocol.replace(/:/g,"")+c.host}if(window.XMLHttpRequest){var d=new XMLHttpRequest;var m=e(location);k=e(k);d=void 0===
d.withCredentials&&""!==k&&k!==m?XDomainRequest||void 0:XMLHttpRequest}return d};var n=function(){function d(){--q;0===q&&(m(),t())}function l(a){return function(){!0!==e[a.base]&&(a.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+a.hash),a.useEl.hasAttribute("href")&&a.useEl.setAttribute("href","#"+a.hash))}}function p(a){return function(){var c=document.body,b=document.createElement("x");a.onload=null;b.innerHTML=a.responseText;if(b=b.getElementsByTagName("svg")[0])b.setAttribute("aria-hidden",
"true"),b.style.position="absolute",b.style.width=0,b.style.height=0,b.style.overflow="hidden",c.insertBefore(b,c.firstChild);d()}}function n(a){return function(){a.onerror=null;a.ontimeout=null;d()}}var a,c,q=0;m();var f=document.getElementsByTagName("use");for(c=0;c<f.length;c+=1){try{var g=f[c].getBoundingClientRect()}catch(w){g=!1}var h=(a=f[c].getAttribute("href")||f[c].getAttributeNS("http://www.w3.org/1999/xlink","href")||f[c].getAttribute("xlink:href"))&&a.split?a.split("#"):["",""];var b=
h[0];h=h[1];var r=g&&0===g.left&&0===g.right&&0===g.top&&0===g.bottom;g&&0===g.width&&0===g.height&&!r?(f[c].hasAttribute("href")&&f[c].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a),b.length&&(a=e[b],!0!==a&&setTimeout(l({useEl:f[c],base:b,hash:h}),0),void 0===a&&(h=u(b),void 0!==h&&(a=new h,e[b]=a,a.onload=p(a),a.onerror=n(a),a.ontimeout=n(a),a.open("GET",b),a.send(),q+=1)))):r?b.length&&e[b]&&setTimeout(l({useEl:f[c],base:b,hash:h}),0):void 0===e[b]?e[b]=!0:e[b].onload&&(e[b].abort(),
delete e[b].onload,e[b]=!0)}f="";q+=1;d()};var p=function(){window.removeEventListener("load",p,!1);l=setTimeout(n,0)};"complete"!==document.readyState?window.addEventListener("load",p,!1):p()}})();
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(c){var f=0;return function(){return f<c.length?{done:!1,value:c[f++]}:{done:!0}}};$jscomp.arrayIterator=function(c){return{next:$jscomp.arrayIteratorImpl(c)}};$jscomp.makeIterator=function(c){var f="undefined"!=typeof Symbol&&Symbol.iterator&&c[Symbol.iterator];return f?f.call(c):$jscomp.arrayIterator(c)};$jscomp.arrayFromIterator=function(c){for(var f,a=[];!(f=c.next()).done;)a.push(f.value);return a};
$jscomp.arrayFromIterable=function(c){return c instanceof Array?c:$jscomp.arrayFromIterator($jscomp.makeIterator(c))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,f,a){c!=Array.prototype&&c!=Object.prototype&&(c[f]=a.value)};
$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(c,f){this.$jscomp$symbol$id_=c;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:f})};
$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function c(a){if(this instanceof c)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(a||"")+"_"+f++,a)}var f=0;return c}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.asyncIterator;c||(c=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};
$jscomp.iteratorFromArray=function(c,f){$jscomp.initSymbolIterator();c instanceof String&&(c+="");var a=0,e={next:function(){if(a<c.length){var b=a++;return{value:f(b,c[b]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};
$jscomp.polyfill=function(c,f,a,e){if(f){a=$jscomp.global;c=c.split(".");for(e=0;e<c.length-1;e++){var b=c[e];b in a||(a[b]={});a=a[b]}c=c[c.length-1];e=a[c];f=f(e);f!=e&&null!=f&&$jscomp.defineProperty(a,c,{configurable:!0,writable:!0,value:f})}};$jscomp.polyfill("Array.prototype.keys",function(c){return c?c:function(){return $jscomp.iteratorFromArray(this,function(c){return c})}},"es6","es3");
$jscomp.checkEs6ConformanceViaProxy=function(){try{var c={},f=Object.create(new $jscomp.global.Proxy(c,{get:function(a,e,b){return a==c&&"q"==e&&b==f}}));return!0===f.q}catch(a){return!1}};$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS=!1;$jscomp.ES6_CONFORMANCE=$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS&&$jscomp.checkEs6ConformanceViaProxy();$jscomp.owns=function(c,f){return Object.prototype.hasOwnProperty.call(c,f)};
$jscomp.polyfill("WeakMap",function(c){function f(){if(!c||!Object.seal)return!1;try{var d=Object.seal({}),b=Object.seal({}),a=new c([[d,2],[b,3]]);if(2!=a.get(d)||3!=a.get(b))return!1;a.delete(d);a.set(b,4);return!a.has(d)&&4==a.get(b)}catch(n){return!1}}function a(){}function e(d){var b=typeof d;return"object"===b&&null!==d||"function"===b}function b(b){if(!$jscomp.owns(b,d)){var c=new a;$jscomp.defineProperty(b,d,{value:c})}}function h(d){var c=Object[d];c&&(Object[d]=function(d){if(d instanceof
a)return d;b(d);return c(d)})}if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(c&&$jscomp.ES6_CONFORMANCE)return c}else if(f())return c;var d="$jscomp_hidden_"+Math.random();h("freeze");h("preventExtensions");h("seal");var g=0,k=function(d){this.id_=(g+=Math.random()+1).toString();if(d){d=$jscomp.makeIterator(d);for(var b;!(b=d.next()).done;)b=b.value,this.set(b[0],b[1])}};k.prototype.set=function(a,c){if(!e(a))throw Error("Invalid WeakMap key");b(a);if(!$jscomp.owns(a,d))throw Error("WeakMap key fail: "+
a);a[d][this.id_]=c;return this};k.prototype.get=function(b){return e(b)&&$jscomp.owns(b,d)?b[d][this.id_]:void 0};k.prototype.has=function(b){return e(b)&&$jscomp.owns(b,d)&&$jscomp.owns(b[d],this.id_)};k.prototype.delete=function(b){return e(b)&&$jscomp.owns(b,d)&&$jscomp.owns(b[d],this.id_)?delete b[d][this.id_]:!1};return k},"es6","es3");
$jscomp.findInternal=function(c,f,a){c instanceof String&&(c=String(c));for(var e=c.length,b=0;b<e;b++){var h=c[b];if(f.call(a,h,b,c))return{i:b,v:h}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(c){return c?c:function(c,a){return $jscomp.findInternal(this,c,a).v}},"es6","es3");

if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    },
    configurable: true
  });
}

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
"use strict";
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
  return Array.from(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
  return Array.from(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
(window.Granite = window.Granite || {}),
  (function (e, t) {
    e.Util = (function () {
      var e = {
        patchText: function (e, n) {
          if (n)
            if (t.isArray(n))
              for (var a = 0; a < n.length; a++)
                e = e.replace("{" + a + "}", n[a]);
            else e = e.replace("{0}", n);
          return e;
        },
      };
      return e;
    })();
  })(Granite, jQuery),
  (function (Granite, util, $) {
    Granite.HTTP = (function () {
      var contextPath = null,
        SCRIPT_URL_REGEXP =
          /^(?:http|https):\/\/[^\/]+(\/.*)\/(?:etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs).*\.js(\?.*)?$/,
        ENCODE_PATH_REGEXP = /[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/,
        loginRedirected = !1,
        self = {};
      return (
        (self.getSchemeAndAuthority = function (e) {
          var t;
          try {
            return -1 === e.indexOf("://")
              ? ""
              : ((t = e.indexOf("/", e.indexOf("://") + 3)),
                -1 === t ? e : e.substring(0, t));
          } catch (n) {
            return "";
          }
        }),
        (self.getContextPath = function () {
          return contextPath;
        }),
        (self.detectContextPath = function () {
          try {
            if (window.CQURLInfo) contextPath = CQURLInfo.contextPath || "";
            else {
              for (
                var e = document.getElementsByTagName("script"), t = 0;
                t < e.length;
                t++
              ) {
                var n = SCRIPT_URL_REGEXP.exec(e[t].src);
                if (n) return void (contextPath = n[1]);
              }
              contextPath = "";
            }
          } catch (a) {}
        }),
        (self.externalize = function (e) {
          try {
            0 === e.indexOf("/") &&
              contextPath &&
              0 !== e.indexOf(contextPath + "/") &&
              (e = contextPath + e);
          } catch (t) {}
          return e;
        }),
        (self.internalize = function (e, t) {
          if ("/" === e.charAt(0))
            return contextPath === e
              ? ""
              : contextPath && 0 === e.indexOf(contextPath + "/")
              ? e.substring(contextPath.length)
              : e;
          t || (t = document);
          var n = self.getSchemeAndAuthority(t.location.href),
            a = self.getSchemeAndAuthority(e);
          return n === a
            ? e.substring(a.length + (contextPath ? contextPath.length : 0))
            : e;
        }),
        (self.getPath = function (e) {
          if (e) (e = self.removeParameters(e)), (e = self.removeAnchor(e));
          else {
            if (window.CQURLInfo && CQURLInfo.requestPath)
              return CQURLInfo.requestPath;
            e = window.location.pathname;
          }
          e = self.internalize(e);
          var t = e.indexOf(".", e.lastIndexOf("/"));
          return -1 !== t && (e = e.substring(0, t)), e;
        }),
        (self.removeAnchor = function (e) {
          return -1 !== e.indexOf("#") ? e.substring(0, e.indexOf("#")) : e;
        }),
        (self.removeParameters = function (e) {
          return -1 !== e.indexOf("?") ? e.substring(0, e.indexOf("?")) : e;
        }),
        (self.encodePathOfURI = function (e) {
          var t, n;
          return (
            -1 !== e.indexOf("?")
              ? ((t = e.split("?")), (n = "?"))
              : -1 !== e.indexOf("#")
              ? ((t = e.split("#")), (n = "#"))
              : (t = [e]),
            ENCODE_PATH_REGEXP.test(t[0]) && (t[0] = self.encodePath(t[0])),
            t.join(n)
          );
        }),
        (self.encodePath = function (e) {
          return (
            (e = encodeURI(e).replace(/%5B/g, "[").replace(/%5D/g, "]")),
            (e = e.replace(/\+/g, "%2B")),
            (e = e.replace(/\?/g, "%3F")),
            (e = e.replace(/;/g, "%3B")),
            (e = e.replace(/#/g, "%23")),
            (e = e.replace(/=/g, "%3D")),
            (e = e.replace(/\$/g, "%24")),
            (e = e.replace(/,/g, "%2C")),
            (e = e.replace(/'/g, "%27")),
            (e = e.replace(/"/g, "%22"))
          );
        }),
        (self.handleLoginRedirect = function () {
          if (!loginRedirected) {
            (loginRedirected = !0),
              alert(
                Granite.I18nSearch.get(
                  "Your request could not be completed because you have been signed out."
                )
              );
            var e = util.getTopWindow().document.location;
            e.href =
              self.externalize(sling.LOGIN_URL) +
              "?resource=" +
              encodeURIComponent(e.pathname + e.search + e.hash);
          }
        }),
        (self.getXhrHook = function (e, t, n) {
          if (
            ((t = t || "GET"), window.G_XHR_HOOK && $.isFunction(G_XHR_HOOK))
          ) {
            var a = { url: e, method: t };
            return n && (a.params = n), G_XHR_HOOK(a);
          }
          return null;
        }),
        (self.eval = function (response) {
          "object" != typeof response &&
            (response = $.ajax({ url: response, type: "get", async: !1 }));
          try {
            return eval(
              "(" +
                (response.body ? response.body : response.responseText) +
                ")"
            );
          } catch (e) {}
          return null;
        }),
        self
      );
    })();
  })(Granite, Granite.Util, jQuery),
  (function (e, t, n, a, i) {
    t.I18nSearch = (function () {
      var t = {},
        s = "/aemapi/v6/common/i18n/dict.",
        o = ".b2c",
        r = ".json",
        c = void 0,
        l = !1,
        h = null,
        d = {},
        u = !1,
        g = function (e) {
          if (
            (i("#i18nAppsParam").val() &&
              i("#i18nAppsParam").val().length > -1 &&
              (o += "." + i("#i18nAppsParam").val()),
            u)
          )
            return s + e + o + r;
          var t = i("html").attr("data-i18n-dictionary-src");
          return t
            ? t
                .replace("{locale}", encodeURIComponent(e))
                .replace("{+locale}", e)
            : s + e + o + r;
        };
      return (
        (d.LOCALE_DEFAULT = "en"),
        (d.PSEUDO_LANGUAGE = "zz"),
        (d.PSEUDO_PATTERN_KEY = "_pseudoPattern_"),
        (d.init = function (e) {
          (e = e || {}),
            this.setLocale(e.locale),
            this.setUrlPrefix(e.urlPrefix),
            this.setUrlSuffix(e.urlSuffix);
        }),
        (d.setLocale = function (t) {
          t && (c = e.documentElement.lang);
        }),
        (d.getLocale = function () {
          return (
            i.isFunction(c) && (c = c()),
            e.documentElement.lang || d.LOCALE_DEFAULT
          );
        }),
        (d.setUrlPrefix = function (e) {
          e && ((s = e), (u = !0));
        }),
        (d.setUrlSuffix = function (e) {
          e && ((r = e), (u = !0));
        }),
        (d.getDictionary = function (e) {
          if (((e = e || d.getLocale()), !t[e])) {
            l = 0 === e.indexOf(d.PSEUDO_LANGUAGE);
            try {
              var n = i.ajax(g(e), { async: !1, dataType: "json" });
              t[e] = i.parseJSON(n.responseText);
            } catch (a) {}
            t[e] || (t[e] = {});
          }
          return t[e];
        }),
        (d.get = function (e, t, a) {
          var i, s, o;
          return (
            (i = {
              "search.comp.snsArticles.facebook": "Facebook",
              "search.comp.searchFilter.aboutUsVision": "Vision",
              Popular: "Popular",
              "search.comp.searchFilter.mdeFamilyConnection":
                "Family Connection",
              "search.comp.resultItem.product.rating": "Product Ratings",
              "search.common.labels.close": "Close",
              "search.comp.relatedSearches.titleCopy": "Related Searches",
              "search.common.sort.date_desc": "Newest",
              "search.comp.resultPagenation.next": "next",
              "search.comp.storeLocator.label.searchForm": "Search form",
              "search.comp.noResult.defaultTitleCopy":
                "Sorry, no results were found. ",
              "search.comp.gnbSearch.matchedContents": "Matched Contents",
              "search.comp.storeLocator.searchButton": "Search",
              "search.comp.gnbSearch.label.clearAll": "Clear All",
              "search.comp.resultItem.common.cta.getStockAlerts":
                "Get stock alerts",
              "Open in a new window": "Open in a New Window",
              "search.comp.gnbSearch.suggestedSearches": "Suggested Searches",
              "My Account": "My Account",
              "search.comp.resultItem.common.cta.download": "Download App",
              "search.comp.filterSelection.support.solutions": "Solutions",
              "search.comp.snsArticles.youtube": "Youtube",
              "search.comp.resultList.keywordSearchResults.a2":
                "{0} Results for {1}",
              "Open in a new window : {0}": "Open in a New Window : {0}",
              "search.comp.resultItem.product.summarySpec":
                "Product Summary Specification",
              "search.comp.resultItem.product.price": "Product Price",
              "CO05_Learn More": "Buy now",
              "best seller": "Best Seller",
              "search.comp.gnbSearch.noSuggestions": "No Suggestions",
              "search.comp.resultItem.product.listPrice": "Product List Price",
              "search.common.category.others": "Others",
              "search.comp.snsArticles.twitter": "Twitter",
              "search.comp.resultPagenation.nextBlock": "next block",
              "search.comp.resultItem.product.numOfRatings":
                "Number of Ratings",
              "search.comp.resultItem.common.label.productFiche":
                "Product Fiche",
              "search.comp.searchFilter.exploreEntertainment": "Entertainment",
              "search.comp.queryInput.label.searchForm": "Search form",
              "search.comp.storeLocator.placeholder": "Zip code / Address",
              "search.common.labels.less": "Less",
              "search.comp.searchFilter.mdeSeamlessEntertaining":
                "Seamless Entertaining",
              "search.common.category.aboutUs": "About Us",
              "search.comp.gnbSearch.product.cta.ownersManual": "Owners Manual",
              "search.comp.searchFilter.exploreExperience": "Experience",
              "search.comp.searchFilter.exploreHow-To": "How-To",
              "search.comp.searchFilter.exploreHealth": "Health",
              "search.comp.searchFilter.mde": "Connected Living",
              "Log In": "Sign in / Create Account",
              "search.common.labels.expand": "Expand",
              "search.common.sort.price_asc": "Price: Low to High",
              "search.comp.resultItem.common.cta.preOreder": "Pre order",
              "search.comp.resultItem.store.enableGps": "Enable GPS",
              "search.common.labels.viewMore": "View More",
              "Log Out": "Log Out",
              "Account Info": "My Account",
              "search.common.category.store": "Store",
              "search.comp.gnbSearch.product.cta.register": "Register",
              "search.comp.queryInput.searchButton": "Search",
              "search.comp.queryInput.didYouMean.a1": 'Did you mean "{0}"?',
              "search.common.category.product": "Products",
              "search.comp.storeLocator.distanceUnit": "MILE",
              "search.common.category.appServices": "Apps &amp; Services",
              "search.comp.filterSelection.label.viewResult": "View Result",
              "search.comp.resultItem.common.cta.learnMore": "Learn more",
              "search.comp.searchFilter.aboutUsOthers": "Others",
              "search.comp.searchFilter.aboutUsCompany": "Company",
              "search.common.labels.cancel": "Cancel",
              "search.comp.searchFilter.aboutUsNews": "News",
              "search.comp.resultItem.common.cta.buyNow": "Buy now",
              "search.common.sort.price_desc": "Price: High to Low ",
              "search.comp.gnbSearch.product.productRating": "Product Ratings",
              "search.comp.snsArticles.feedList": "Feed list",
              "search.common.labels.home": "Home",
              "search.comp.resultItem.promotion.eventsPeriod": "Events Period",
              "Sign Up": "Sign-Up",
              "search.common.sort.text_desc": "Z-A",
              "search.comp.resultPagenation.current": "current",
              "search.common.category.explore": "Explore",
              "search.comp.resultItem.common.cta.whereToBuy": "Where to buy",
              "search.comp.supportAdditionalInfoSummary.titleCopy":
                "Find Additional Info",
              All: "All",
              "search.comp.filterSelection.support.products": "Products",
              "search.comp.resultItem.common.label.category": "Category",
              "search.comp.resultItem.common.cta.findSupport": "Find support",
              "search.common.labels.starNonActive": "star non-active",
              "search.comp.searchFilter.exploreSamsungWithin": "Samsung Within",
              "My Wishlist": "Wishlist",
              "search.comp.queryInput.label.relatedSearches":
                "Related Searches",
              "search.common.labels.learnMore": "Learn More",
              "search.comp.gnbSearch.product.cta.support": "Support",
              "search.comp.filterSelection.label.clearAll": "Clear All",
              "search.comp.searchFilter.explore": "Explore",
              "search.common.sort.popularity": "Most Clicked",
              "search.comp.filterSelection.label.filters": "Filters",
              "search.comp.storeLocator.productCategoriesTitleCopy":
                "Product Categories in Store",
              "search.common.labels.next": "Next",
              "search.common.sort.text_asc": "A-Z",
              "search.comp.searchFilter.explorePhotography": "Photography",
              "search.common.labels.starActive": "star active",
              "Buy now": "Buy now",
              "search.comp.filterSelection.support.productInSolutions":
                "Product",
              "search.comp.resultPagenation.prevBlock": "prev block",
              "search.common.labels.seeMore": "See More",
              "search.common.category.promotion": "Offer",
              "search.common.category.mde": "Connected Living",
              "search.comp.gnbSearch.titleCopy": "Can we help find anything?",
              "search.common.sort.enddate": "Ending Soon",
              Value: "Value",
              "search.common.labels.call.a1": "Call {0}",
              "search.common.labels.ok": "OK",
              "search.comp.searchFilter.aboutUsCommunity": "Community",
              "search.comp.searchFilter.mdeWork-Life Balance":
                "Work-Life Balance",
              "search.common.category.all": "All",
              "search.comp.resultList.label.sortBy": "Sort by",
              "search.common.sort.relevance": "Relevance",
              "search.common.sort.rating": "Ratings",
              "search.comp.resultItem.store.distanceFromMyLocation":
                "Distance from my location",
              "search.comp.resultItem.store.needLocationInfoUsageAgreement":
                "You need a location information usage agreement.",
              "search.comp.queryInput.defaultPlaceholder":
                "Please input keyword",
              "search.comp.resultItem.product.modelName": "Model Name",
              "search.common.category.support": "Support",
              "search.comp.contactUs.defatulTitleCopy": "General Support",
              "search.comp.searchFilter.aboutUs": "About Us",
              Recent: "Recent",
              "search.comp.searchFilter.exploreProductivity": "Productivity",
              "search.comp.searchFilter.aboutUsBusiness Area": "Business Area",
              "search.comp.filterSelection.selectedFilters": "Selected filters",
              "My Orders": "My Orders",
              "search.common.labels.prev": "Previous",
              "search.comp.gnbSearch.searchHistory": "Search History",
              "search.comp.filterSelection.support.news": "News",
              "search.comp.resultItem.common.cta.outOfStock": "Out of stock",
              "search.comp.filterSelection.searchByFilters":
                "Search by selected filters",
              "search.common.sort.date_asc": "Oldest",
              "Track your order": "Track your orders",
              "search.common.labels.searchBy.a1": "Search by search term {0}",
              "search.comp.searchFilter.aboutUsSustainability":
                "Sustainability",
              "search.comp.resultItem.common.cta.notForSale": "Not for sale",
              "search.comp.resultPagenation.prev": "prev",
              "What are you looking for?": "What are you looking for?",
              "search.comp.searchFilter.aboutUsInvestor Relations":
                "Investor Relations",
              "search.comp.storeLocator.label.store": "Store",
              "search.comp.searchFilter.aboutUsCareers": "Careers",
              "search.comp.resultItem.common.label.playVideo": "Play video",
              "search.common.labels.more": "More",
            }),
            (o = l ? d.PSEUDO_PATTERN_KEY : a ? e + " ((" + a + "))" : e),
            i && (s = i[o]),
            s || (s = e),
            l &&
              (s = s.replace("{string}", e).replace("{comment}", a ? a : "")),
            n.patchText(s, t)
          );
        }),
        (d.getVar = function (e, t) {
          return e ? d.get(e, null, t) : null;
        }),
        (d.getLanguages = function () {
          if (!h)
            try {
              var e = a.eval(
                "/libs/wcm/core/resources/languages.overlay.infinity.json"
              );
              i.each(e, function (e, t) {
                (t.title = d.getVar(t.language)),
                  t.title &&
                    t.country &&
                    "*" !== t.country &&
                    (t.title += " (" + d.getVar(t.country) + ")");
              }),
                (h = e);
            } catch (t) {
              h = {};
            }
          return h;
        }),
        (d.parseLocale = function (e) {
          if (!e) return null;
          var t = e.indexOf("_");
          0 > t && (t = e.indexOf("-"));
          var n, a;
          return (
            0 > t
              ? ((n = e), (a = null))
              : ((n = e.substring(0, t)), (a = e.substring(t + 1))),
            { code: e, language: n, country: a }
          );
        }),
        d
      );
    })();
  })(document, Granite, Granite.Util, Granite.HTTP, jQuery),
  Granite.HTTP.detectContextPath();
var _createClass = (function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var a = t[n];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        "value" in a && (a.writable = !0),
        Object.defineProperty(e, a.key, a);
    }
  }
  return function (t, n, a) {
    return n && e(t.prototype, n), a && e(t, a), t;
  };
})();
!(function () {
  (window.sg = window.sg || {}),
    (window.sg.common = window.sg.common || {}),
    (window.sg.components = window.sg.components || {});
  var e = {
      BREAKPOINTS: { DESKTOP: 1440, MOBILE: 767, MOBILE_UNDER: 360 },
      SELECTOR: {
        RES_IMG: ".responsive-img",
        VIDEO: ".video",
        LAZY_LOAD: ".lazy-load",
        PREVIEW_IMG: ".preview",
        INDICATOR: ".indicator",
      },
      KEY_CODE: {
        TAB: 9,
        ENTER: 13,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ESC: 27,
      },
    },
    t = void 0,
    n = void 0,
    a = {
      getViewPort: function () {
        var e = window,
          t = "inner";
        return (
          "innerWidth" in window ||
            ((t = "client"), (e = document.documentElement || document.body)),
          { width: e[t + "Width"], height: e[t + "Height"] }
        );
      },
      getCurrentDevice: function () {
        var t = a.getViewPort().width;
        return t > e.BREAKPOINTS.MOBILE ? "desktop" : "mobile";
      },
      getCurrentMediaType: function () {
        var t = a.getViewPort().width;
        return t > e.BREAKPOINTS.MOBILE
          ? t > e.BREAKPOINTS.DESKTOP
            ? "desktop-over"
            : "desktop"
          : t > e.BREAKPOINTS.MOBILE_UNDER
          ? "mobile"
          : "mobile-under";
      },
      isInVerticalViewPort: function (e) {
        var t = e.getBoundingClientRect();
        return t.top < a.getViewPort().height && t.bottom > 0;
      },
      isInHorizontalViewPort: function (e) {
        var t = e.getBoundingClientRect();
        return t.left < a.getViewPort().width && t.right > 0;
      },
      isVerticalVisible: function (e) {
        return (
          a.isInVerticalViewPort(e) && "none" !== getComputedStyle(e).display
        );
      },
      isHorizontalVisible: function (e) {
        return (
          a.isInHorizontalViewPort(e) && "none" !== getComputedStyle(e).display
        );
      },
      isInViewPort: function (e) {
        return a.isInVerticalViewPort(e) && a.isInHorizontalViewPort(e);
      },
      isVisible: function (e) {
        return a.isInViewPort(e) && "none" !== getComputedStyle(e).display;
      },
      scrollTo: function (e, n) {
        var i = document.documentElement,
          s = i.scrollLeft,
          o = i.scrollTop,
          r = i.scrollHeight,
          c = i.clientHeight,
          l = s;
        e > r - c && (e = r - c);
        var h = void 0;
        h = isNaN(n) ? o : n;
        var d = 7;
        (h += (e - o) / d), 0 > h ? (h = 0) : h > r - c && (h = r - c);
        var u = Math.ceil(h);
        window.scrollTo(l, u),
          u !== e
            ? (t = setTimeout(function () {
                a.scrollTo(e, h);
              }, 15))
            : clearTimeout(t);
      },
      setImageSpecGuide: function (e, t) {
        var n = document.createElement("span");
        (n.innerHTML = t),
          (n.style.position = "absolute"),
          (n.style.display = "inline-block"),
          (n.style.top = "50%"),
          (n.style.right = "50%"),
          (n.style.width = "100%"),
          (n.style.textAlign = "center"),
          (n.style.fontStyle = "italic"),
          (n.style.transform = "translateX(50%) translateY(-50%)"),
          (n.style.color = "#fff"),
          (n.style.fontSize = "30px"),
          n.classList.add("media-size-guide"),
          e.appendChild(n);
      },
      extend: function (e, t) {
        return (
          Object.keys(t).forEach(function (n) {
            e[n] = t[n];
          }),
          e
        );
      },
      setCookie: function (e, t, n) {
        var a = new Date();
        a.setTime(a.getTime() + 60 * n * 60 * 24 * 1e3),
          (document.cookie =
            e + "=" + t + "; expires=" + a.toUTCString() + "; path=/");
      },
      getCookie: function (e) {
        var t = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
        return t ? t[2] : null;
      },
      triggerEvent: function (e, t) {
        var n =
            arguments.length <= 2 || void 0 === arguments[2]
              ? null
              : arguments[2],
          a =
            arguments.length <= 3 || void 0 === arguments[3]
              ? !1
              : arguments[3],
          i =
            arguments.length <= 4 || void 0 === arguments[4]
              ? !0
              : arguments[4],
          s = void 0;
        null === n
          ? ((s = document.createEvent("HTMLEvents")), s.initEvent(t, a, i))
          : ((s = document.createEvent("CustomEvent")),
            s.initCustomEvent(t, a, i, n)),
          e.dispatchEvent(s);
      },
      hiddenScroll: function () {
        (this.scrollFlag = !0),
          (this.currentPos =
            window.scrollY || document.documentElement.scrollTop);
        var e = document.querySelector("body"),
          t = void 0;
        (t = this.currentPos > 0 ? "-" + this.currentPos + "px" : 0),
          (e.style.position = "fixed"),
          (e.style.width = "100%"),
          (e.style.top = t);
      },
      visibleScroll: function () {
        if (this.scrollFlag === !0) {
          this.scrollFlag = !1;
          var e = document.querySelector("body");
          (e.style.position = ""),
            (e.style.width = ""),
            (e.style.top = ""),
            window.scrollTo(0, this.currentPos);
        }
      },
      getDirection: function () {
        return window.getComputedStyle(document.body).direction;
      },
      addEventListener: function (e, t, a) {
        if (e) {
          n || (n = new WeakMap());
          var i = void 0;
          (i = n.has(e) ? n.get(e) : {}),
            i[t] || (i[t] = []),
            i[t].push(a),
            n.set(e, i),
            e.addEventListener(t, a);
        }
      },
      removeAllEventListeners: function (e, t) {
        if (e && n) {
          var a = void 0;
          n.has(e) &&
            ((a = n.get(e)),
            a[t] &&
              (a[t].forEach(function (n) {
                e.removeEventListener(t, n);
              }),
              n["delete"](e)));
        }
      },
      closest: function (e, t) {
        do {
          if (e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e;
          e = e.parentElement || e.parentNode;
        } while (null !== e && 1 === e.nodeType);
        return null;
      },
      popupControl: {
        closeParam: null,
        popstateHandler: function () {
          window.history.state
            ? "popOpen" === window.history.state.page &&
              (window.sg.common.utils.popupControl.closeParam(),
              window.sg.common.utils.popupControl.close())
            : (window.sg.common.utils.popupControl.closeParam(),
              window.sg.common.utils.popupControl.close());
        },
        open: function (e) {
          (this.closeParam = e),
            window.removeEventListener("popstate", this.popstateHandler),
            window.addEventListener("popstate", this.popstateHandler),
            window.history.pushState(
              { page: "popOpen" },
              "",
              "" + window.location.href
            );
        },
        close: function () {
          (this.closeParam = null),
            window.history.state &&
              "popOpen" === window.history.state.page &&
              (window.history.forward(),
              window.removeEventListener("popstate", this.popstateHandler));
        },
      },
      setSwiperIndicatorTaggingAttributes: function (e, t) {
        var n = JSON.parse(e);
        []
          .concat(
            _toConsumableArray(t.querySelectorAll(".swiper-pagination-bullet"))
          )
          .forEach(function (e, t) {
            e.setAttribute("an-tr", n.anTr),
              e.setAttribute("an-ca", n.anCa),
              e.setAttribute("an-ac", n.anAc),
              e.setAttribute("an-la", "" + n.anLa + (t + 1));
          });
      },
      isEnglish: function (e) {
        var t = /^[a-zA-Z]*$/;
        return t.test(e);
      },
      isNumber: function (e) {
        var t = /^[0-9]*$/;
        return t.test(e);
      },
      isEngNum: function (e) {
        var t = /^[a-zA-Z0-9]*$/;
        return t.test(e);
      },
      isEmail: function (e) {
        var t =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return t.test(e);
      },
    };
  (window.sg.common.constants = e), (window.sg.common.utils = a);
})(),
  (function () {
    var e = window.sg.common.utils.getCurrentDevice,
      t = (function () {
        function t(e) {
          _classCallCheck(this, t), (this.el = e), this.init();
        }
        return (
          _createClass(t, [
            {
              key: "init",
              value: function () {
                t.instances.has(this.el) ||
                  (t.instances.set(this.el, this),
                  this.setResponsiveImage(),
                  this.bindEvents());
              },
            },
            {
              key: "load",
              value: function () {
                (this.el.src = this.el.dataset.src),
                  this.el.removeAttribute("data-src");
              },
            },
            {
              key: "bindImageLoad",
              value: function () {
                var e = this;
                this.el.classList.contains("image__main") &&
                  !(function () {
                    var t = e.el.previousElementSibling;
                    t &&
                      e.el.addEventListener("load", function () {
                        (t.style.visibility = "hidden"),
                          (e.el.style.visibility = "");
                      });
                  })();
              },
            },
            {
              key: "bindResponsive",
              value: function () {
                this.el.dataset.desktopSrc !== this.el.dataset.mobileSrc &&
                  ((this.setResponsiveImage =
                    this.setResponsiveImage.bind(this)),
                  window.addEventListener("resize", this.setResponsiveImage));
              },
            },
            {
              key: "bindEvents",
              value: function () {
                this.el.classList.contains("responsive-img") &&
                  this.bindResponsive(),
                  this.bindImageLoad(this.el);
              },
            },
            {
              key: "setResponsiveImage",
              value: function () {
                if (this.el.classList.contains("responsive-img")) {
                  var t = e();
                  if (this.device !== t) {
                    if (
                      this.el.classList.contains("image__main") &&
                      !this.el.classList.contains("lazy-load")
                    ) {
                      var n = this.el.previousElementSibling;
                      n &&
                        ((n.style.visibility = "visible"),
                        (this.el.style.visibility = "hidden"));
                    }
                    this.device = t;
                    var a = this.el.dataset[this.device + "Src"];
                    a
                      ? this.el.style.removeProperty("display")
                      : (this.el.style.display = "none"),
                      this.el.classList.contains("lazy-load") ||
                      this.el.classList.contains("lazy-load-man")
                        ? ((this.el.dataset.src =
                            void 0 === this.el.dataset.src
                              ? ""
                              : this.el.dataset.src),
                          this.el.dataset.src.indexOf(a) < 0 &&
                            (this.el.dataset.src = a))
                        : this.el.src.indexOf(a) < 0 && (this.el.src = a);
                  }
                }
              },
            },
          ]),
          t
        );
      })();
    t.instances = new WeakMap();
    var n = {
      initAll: function () {
        var e = [].concat(
          _toConsumableArray(document.querySelectorAll(".responsive-img"))
        );
        e.forEach(function (e) {
          t.instances.has(e) || new t(e);
        });
      },
      load: function (e) {
        t.instances.has(e) ? t.instances.get(e).load() : new t(e).load();
      },
      delete: function (e) {
        t.instances["delete"](e);
      },
    };
    (window.sg.common.image = n),
      "loading" === document.readyState
        ? document.addEventListener("DOMContentLoaded", n.initAll)
        : n.initAll();
  })(),
  (function () {
    var e = window.sg.common.utils.isVerticalVisible,
      t = window.sg.common.utils.isHorizontalVisible,
      n = (function () {
        function n() {
          var e =
            arguments.length <= 0 || void 0 === arguments[0]
              ? document
              : arguments[0];
          _classCallCheck(this, n),
            (this.el = e),
            (this.lazyEls = []),
            (this.active = !1),
            this.init();
        }
        return (
          _createClass(n, [
            {
              key: "init",
              value: function () {
                this.setLazyLoad(), this.bindEvents();
              },
            },
            {
              key: "getEls",
              value: function () {
                this.lazyEls = [].concat(
                  _toConsumableArray(this.el.querySelectorAll(".lazy-load"))
                );
              },
            },
            {
              key: "reInit",
              value: function () {
                this.getEls();
              },
            },
            {
              key: "handleLazyLoad",
              value: function () {
                this.setLazyLoad();
              },
            },
            {
              key: "setLazyLoad",
              value: function () {
                var e = this,
                  t =
                    arguments.length <= 0 || void 0 === arguments[0]
                      ? 200
                      : arguments[0],
                  n = function () {
                    e.getEls(),
                      e.lazyEls.forEach(function (t) {
                        e.load(t), 0 === e.lazyEls.length && e.unBindEvents();
                      });
                  };
                this.active ||
                  (t > 0
                    ? ((this.active = !0),
                      setTimeout(function () {
                        n(), (e.active = !1);
                      }, t))
                    : n());
              },
            },
            {
              key: "setPreviewImageLoaded",
              value: function (t) {
                var n = this,
                  a = function i() {
                    e(t) &&
                      ([]
                        .concat(
                          _toConsumableArray(
                            t.querySelectorAll(".image__preview")
                          )
                        )
                        .forEach(function (e) {
                          e.classList.contains("lazy-load") && n.loadImage(e);
                        }),
                      document.removeEventListener("scroll", i),
                      window.removeEventListener("resize", i),
                      window.removeEventListener("orientationchange", i));
                  };
                document.addEventListener("scroll", a),
                  window.addEventListener("resize", a),
                  window.addEventListener("orientationchange", a);
              },
            },
            {
              key: "setLazyLoadManually",
              value: function (e) {
                var t = this;
                []
                  .concat(
                    _toConsumableArray(e.querySelectorAll(".lazy-load-man"))
                  )
                  .forEach(function (e) {
                    e.classList.contains("image__preview") ||
                    e.classList.contains("image__main") ||
                    e.classList.contains("image__hover-image--hover")
                      ? t.loadImage(e)
                      : e.classList.contains("video") && t.loadVideo(e),
                      e.classList.remove("lazy-load-man");
                  });
              },
            },
            {
              key: "load",
              value: function (n) {
                e(n) &&
                  (n.classList.contains("image__preview")
                    ? this.loadImage(n)
                    : t(n) &&
                      (n.classList.contains("image__main") ||
                      n.classList.contains("image__hover-image--hover")
                        ? this.loadImage(n)
                        : n.classList.contains("video") && this.loadVideo(n)));
              },
            },
            {
              key: "clearLazy",
              value: function (e) {
                e.classList.remove("lazy-load"),
                  (this.lazyEls = this.lazyEls.filter(function (t) {
                    return t !== e;
                  }));
              },
            },
            {
              key: "loadImage",
              value: function (e) {
                var t = window.sg.common.image;
                t && t.load(e), this.clearLazy(e);
              },
            },
            {
              key: "loadVideo",
              value: function (e) {
                var t = window.sg.common.video;
                t && t.load(e), this.clearLazy(e);
              },
            },
            {
              key: "bindEvents",
              value: function () {
                (this.handleLazyLoad = this.handleLazyLoad.bind(this)),
                  document.addEventListener("scroll", this.handleLazyLoad),
                  window.addEventListener("resize", this.handleLazyLoad),
                  window.addEventListener(
                    "orientationchange",
                    this.handleLazyLoad
                  );
              },
            },
            {
              key: "unBindEvents",
              value: function () {
                document.removeEventListener("scroll", this.handleLazyLoad),
                  window.removeEventListener("resize", this.handleLazyLoad),
                  window.removeEventListener(
                    "orientationchange",
                    this.handleLazyLoad
                  );
              },
            },
          ]),
          n
        );
      })();
    n.instance = null;
    var a = {
      initAll: function () {
        n.instance || (n.instance = new n());
      },
      reInit: function () {
        n.instance ? n.instance.reInit() : (n.instance = new n());
      },
      setLazyLoad: function () {
        n.instance || (n.instance = new n()), n.instance.setLazyLoad(0);
      },
      setPreviewImageLoaded: function (e) {
        n.instance || (n.instance = new n()),
          n.instance.setPreviewImageLoaded(e);
      },
      setLazyLoadManually: function (e) {
        n.instance || (n.instance = new n()), n.instance.setLazyLoadManually(e);
      },
    };
    (window.sg.common.lazyLoad = a),
      "loading" === document.readyState
        ? document.addEventListener("DOMContentLoaded", a.initAll)
        : a.initAll();
  })(),
  (function () {
    var e = {
        keyCode: {
          TAB_KEY: 9,
          ENTER: 13,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
        },
        extend: function (e, t) {
          return (
            Object.keys(t).forEach(function (n) {
              e[n] = t[n];
            }),
            e
          );
        },
      },
      t = (function () {
        function e(t) {
          _classCallCheck(this, e),
            (this.target =
              "object" == typeof t
                ? Array.isArray(t)
                  ? t
                  : [t]
                : t
                ? Array.prototype.slice.call(document.querySelectorAll(t))
                : []);
        }
        return (
          _createClass(e, [
            {
              key: "find",
              value: function (t) {
                var n = [];
                return (
                  this.target.forEach(function (e) {
                    n = n.concat(
                      Array.prototype.slice.call(e.querySelectorAll(t))
                    );
                  }),
                  new e(n)
                );
              },
            },
            {
              key: "eq",
              value: function (t) {
                var n = this.target[t],
                  a = n ? [n] : "";
                return new e(a);
              },
            },
            {
              key: "parent",
              value: function () {
                if (0 === this.target.length) return new e("");
                var t = this.target[0].parentNode,
                  n = t ? [this.target[0].parentNode] : "";
                return new e(n);
              },
            },
            {
              key: "children",
              value: function () {
                var t =
                    arguments.length <= 0 || void 0 === arguments[0]
                      ? null
                      : arguments[0],
                  n = [];
                return (
                  this.target.forEach(function (e) {
                    n = n.concat(
                      t
                        ? Array.prototype.slice.call(e.querySelectorAll(t))
                        : Array.prototype.slice.call(e.children)
                    );
                  }),
                  new e(n)
                );
              },
            },
            {
              key: "closest",
              value: function (t) {
                function n(e) {
                  for (var n = !0; n; ) {
                    var a = e;
                    n = !1;
                    var i = void 0;
                    if (
                      (i = a.matches
                        ? a.matches(t)
                        : a.webkitMatchesSelector
                        ? a.webkitMatchesSelector(t)
                        : a.msMatchesSelector(t))
                    )
                      return a;
                    if (a === document.body) return null;
                    (e = a.parentNode), (n = !0), (i = void 0);
                  }
                }
                function a(e) {
                  for (var n = !0; n; ) {
                    var a = e;
                    if (((n = !1), a === t)) return a;
                    if (a === document.body) return null;
                    (e = a.parentNode), (n = !0);
                  }
                }
                if (0 === this.target.length) return this;
                if (!this.target[0].parentElement) return new e([this.target]);
                var i = [],
                  s = "string" == typeof t;
                return (
                  this.target.forEach(function (e) {
                    var t = s ? n(e) : a(e);
                    null !== t && i.push(t);
                  }),
                  new e(i)
                );
              },
            },
            {
              key: "css",
              value: function (e) {
                var t = this.target[0];
                if (t)
                  return "string" == typeof e
                    ? window.getComputedStyle(t)[e]
                    : void this.target.forEach(function (t) {
                        Object.keys(e).forEach(function (n) {
                          t.style[n] = e[n];
                        });
                      });
              },
            },
            {
              key: "show",
              value: function () {
                var e = this.target;
                e &&
                  e.forEach(function (e) {
                    n(e).css({ display: "block" });
                  });
              },
            },
            {
              key: "hide",
              value: function () {
                var e = this.target;
                e &&
                  e.forEach(function (e) {
                    n(e).css({ display: "none" });
                  });
              },
            },
            {
              key: "scrollTop",
              value: function (e) {
                var t = this.target[0];
                if (t)
                  return void 0 === e ? t.scrollTop : void (t.scrollTop = e);
              },
            },
            {
              key: "animate",
              value: function (e, t) {
                var n = this,
                  a =
                    arguments.length <= 2 || void 0 === arguments[2]
                      ? null
                      : arguments[2],
                  i =
                    arguments.length <= 3 || void 0 === arguments[3]
                      ? null
                      : arguments[3];
                "string" != typeof a && ((i = a), (a = null));
                var s = [
                  "webkitTransitionEnd",
                  "oTransitionEnd",
                  "otransitionend",
                  "mozTransitionEnd",
                  "moztransitionend",
                  "transitionend",
                  "transitionEnd",
                ];
                this.target.forEach(function (n) {
                  function o(e) {
                    (void 0 === e || e.target === n) &&
                      (null !== i && i(n),
                      (n.style.transition = c),
                      s.forEach(function (e) {
                        n.removeEventListener(e, o), (n.animateComplete = null);
                      }));
                  }
                  var r = window.getComputedStyle(n);
                  Object.keys(e).forEach(function (e) {
                    n.style[e] = r[e];
                  });
                  var c = n.style.transition;
                  (n.style.transitionDuration = t / 1e3 + "s"),
                    null !== a && (n.style.transitionTimingFunction = a),
                    ["o", "ms", "moz", "webkit"].forEach(function (e) {
                      (n.style[e + "TransitionDuration"] = t / 1e3 + "s"),
                        null !== a &&
                          (n.style[e + "transitionTimingFunction"] = a);
                    }),
                    (n.animateComplete = o),
                    s.forEach(function (e) {
                      n.addEventListener(e, o);
                    });
                }),
                  setTimeout(
                    function () {
                      n.css(e);
                    }.bind(this),
                    30
                  );
              },
            },
            {
              key: "finish",
              value: function () {
                return (
                  this.target.forEach(function (e) {
                    e.animateComplete && e.animateComplete();
                  }),
                  this
                );
              },
            },
            {
              key: "stop",
              value: function () {
                return (
                  this.target.forEach(function (e) {
                    for (
                      var t = 0, n = window.getComputedStyle(e);
                      e.style.length > t;

                    ) {
                      t++;
                      var a = e.style[t - 1];
                      a.indexOf("transition") > -1 || (e.style[a] = n[a]);
                    }
                    (e.style.transitionDuration = "0s"),
                      ["o", "ms", "moz", "webkit"].forEach(function (t) {
                        e.style[t + "TransitionDuration"] = "0s";
                      });
                    var i = [
                        "webkitTransitionEnd",
                        "oTransitionEnd",
                        "otransitionend",
                        "mozTransitionEnd",
                        "moztransitionend",
                        "transitionend",
                        "transitionEnd",
                      ],
                      s = e.animateComplete;
                    i.forEach(function (t) {
                      e.removeEventListener(t, s), (e.animateComplete = null);
                    });
                  }),
                  this
                );
              },
            },
            {
              key: "isAnimate",
              value: function () {
                return this.target.some(function (e) {
                  return "function" == typeof e.animateComplete ? !0 : void 0;
                });
              },
            },
            {
              key: "slideDown",
              value: function (e, t) {
                var n = this;
                this.target.forEach(function (a) {
                  function i() {
                    (a.style.display = o),
                      (a.style.height = s),
                      (a.style.overflow = c),
                      void 0 !== t && t();
                  }
                  var s = a.style.height,
                    o = a.style.display;
                  a.style.display = "block";
                  var r = window.getComputedStyle(a).height;
                  a.style.height = "0px";
                  var c = a.style.overflow;
                  (a.style.overflow = "hidden"),
                    n.css({ overflow: "hidden" }),
                    n.animate({ height: r }, e, i);
                });
              },
            },
            {
              key: "slideUp",
              value: function (e, t) {
                var n = this;
                this.target.forEach(function (a) {
                  function i() {
                    (a.style.height = s.height),
                      (a.style.overflow = s.overflow),
                      (a.style.padding = s.padding),
                      void 0 !== t && t();
                  }
                  var s = {
                    height: a.style.height,
                    overflow: a.style.overflow,
                    padding: a.style.padding,
                  };
                  (a.style.height = window.getComputedStyle(a).height),
                    setTimeout(
                      function () {
                        n.animate(
                          {
                            overflow: "hidden",
                            height: "0px",
                            paddingTop: "0px",
                            paddingBottom: "0px",
                          },
                          e,
                          i
                        );
                      }.bind(n),
                      30
                    );
                });
              },
            },
            {
              key: "index",
              value: function t() {
                var e = this.target[0];
                if (e) {
                  var t = 0;
                  return (
                    Array.prototype.slice
                      .call(e.parentNode.children)
                      .forEach(function (n, a) {
                        e === n && (t = a);
                      }),
                    t
                  );
                }
              },
            },
            {
              key: "offset",
              value: function () {
                var e = this.target[0];
                if (e) return e.getBoundingClientRect();
              },
            },
            {
              key: "width",
              value: function () {
                var e = this.target[0];
                if (e) {
                  var t = window.getComputedStyle(e);
                  return (
                    e.offsetWidth -
                    parseInt(t.paddingLeft, 10) -
                    parseInt(t.paddingRight, 10) -
                    parseInt(t.borderLeftWidth, 10) -
                    parseInt(t.borderRightWidth, 10)
                  );
                }
              },
            },
            {
              key: "innerWidth",
              value: function () {
                var e = this.target[0];
                if (e) {
                  var t = window.getComputedStyle(e);
                  return (
                    e.offsetWidth -
                    parseInt(t.borderLeftWidth, 10) -
                    parseInt(t.borderRightWidth, 10)
                  );
                }
              },
            },
            {
              key: "outerWidth",
              value: function () {
                var e = this.target[0];
                if (e) return e.clientWidth;
              },
            },
            {
              key: "height",
              value: function () {
                var e = this.target[0];
                if (e) {
                  var t = window.getComputedStyle(e);
                  return (
                    e.offsetHeight -
                    parseInt(t.paddingTop, 10) -
                    parseInt(t.paddingBottom, 10) -
                    parseInt(t.borderTopWidth, 10) -
                    parseInt(t.borderBottomWidth, 10)
                  );
                }
              },
            },
            {
              key: "innerHeight",
              value: function () {
                var e = this.target[0];
                if (e) {
                  var t = window.getComputedStyle(e);
                  return (
                    e.offsetHeight -
                    parseInt(t.borderTopWidth, 10) -
                    parseInt(t.borderBottomWidth, 10)
                  );
                }
              },
            },
            {
              key: "outerHeight",
              value: function () {
                var e = this.target[0];
                if (e) return e.clientHeight;
              },
            },
            {
              key: "isImageLoad",
              value: function () {
                return this.target[0].naturalWidth > 0 &&
                  this.target[0].naturalHeight
                  ? !0
                  : !1;
              },
            },
            {
              key: "hasClass",
              value: function (e) {
                var t = this.target[0];
                if (t)
                  return new RegExp("(\\s|^)" + e + "(\\s|$)").test(
                    t.className
                  );
              },
            },
            {
              key: "addClass",
              value: function (e) {
                var t = this.target;
                t &&
                  t.forEach(function (t) {
                    t.classList.add(e);
                  });
              },
            },
            {
              key: "removeClass",
              value: function (e) {
                var t = this.target;
                t &&
                  t.forEach(function (t) {
                    t.classList.remove(e);
                  });
              },
            },
            {
              key: "toggleClass",
              value: function (e) {
                var t = this.target;
                t &&
                  t.forEach(function (t) {
                    t.classList.toggle(e);
                  });
              },
            },
            {
              key: "attr",
              value: function (e, t) {
                if (this.target) {
                  var n = arguments.length;
                  if (!(n > 1)) {
                    var a = this.target[0];
                    return a ? a.getAttribute(e) : !1;
                  }
                  return (
                    this.target.forEach(function (n) {
                      n.setAttribute && n.setAttribute(e, t);
                    }),
                    this
                  );
                }
              },
            },
            {
              key: "removeAttr",
              value: function (e) {
                this.target &&
                  this.target.forEach(function (t) {
                    t.removeAttribute(e);
                  });
              },
            },
            {
              key: "text",
              value: function (e) {
                this.target.forEach(function (t) {
                  t.textContent = e;
                });
              },
            },
            {
              key: "innerHTML",
              value: function (e) {
                this.target && (this.target[0].innerHTML = e);
              },
            },
            {
              key: "append",
              value: function (e) {
                this.target.forEach(function (t) {
                  Array.isArray(e)
                    ? e.forEach(function (e) {
                        "string" == typeof e
                          ? t.insertAdjacentHTML("beforeend", e)
                          : t.appendChild(e);
                      })
                    : "string" == typeof e
                    ? t.insertAdjacentHTML("beforeend", e)
                    : t.appendChild(e);
                });
              },
            },
            {
              key: "after",
              value: function (e) {
                this.target.forEach(function (t) {
                  Array.isArray(e)
                    ? ((e = [].concat(_toConsumableArray(e)).reverse()),
                      e.forEach(function (e) {
                        "string" == typeof e
                          ? t.insertAdjacentHTML("afterend", e)
                          : t.insertAdjacentElement("afterend", e);
                      }))
                    : "string" == typeof e
                    ? t.insertAdjacentHTML("afterend", e)
                    : t.insertAdjacentElement("afterend", e);
                });
              },
            },
            {
              key: "prepend",
              value: function (e) {
                this.target.forEach(function (t) {
                  Array.isArray(e)
                    ? e.forEach(function (e) {
                        "string" == typeof e
                          ? t.insertAdjacentHTML("beforebegin", e)
                          : t.insertBefore(e, t.firstChild);
                      })
                    : "string" == typeof e
                    ? t.insertAdjacentHTML("beforebegin", e)
                    : t.insertBefore(e, t.firstChild);
                });
              },
            },
            { key: "before", value: function () {} },
            {
              key: "clone",
              value: function () {
                if (this.target[0]) {
                  var e = [];
                  return (
                    this.target.forEach(function (t) {
                      e.push(t.cloneNode(!0));
                    }),
                    e
                  );
                }
              },
            },
            {
              key: "remove",
              value: function () {
                this.target[0] &&
                  this.target.forEach(function (e) {
                    e.parentNode.removeChild(e);
                  });
              },
            },
            {
              key: "focus",
              value: function () {
                var e = this.target[0];
                if (e && e.focus) return e.focus(), this;
              },
            },
            {
              key: "blur",
              value: function () {
                var e = this.target[0];
                if (e) return e.blur(), this;
              },
            },
            {
              key: "on",
              value: function (t, n) {
                var a = this.target;
                a &&
                  a.forEach(function (a) {
                    e.instances.has(a) ||
                      e.instances.set(a, { event: [], handler: [] }),
                      e.instances.get(a).handler.push({ event: t, handler: n }),
                      a.addEventListener(t, n);
                  });
              },
            },
            {
              key: "off",
              value: function (t, n) {
                var a = this.target;
                if (a)
                  return (
                    a.forEach(function (a) {
                      if (e.instances.has(a)) {
                        var i = e.instances.get(a);
                        t && n
                          ? !(function () {
                              var e = [];
                              i.handler.forEach(function (i) {
                                i.event === t && i.handler === n
                                  ? a.removeEventListener(i.event, i.handler)
                                  : e.push({
                                      event: i.event,
                                      handler: i.handler,
                                    });
                              }),
                                (i.handler = e);
                            })()
                          : t
                          ? !(function () {
                              var e = [];
                              i.handler.forEach(function (n) {
                                n.event === t && a !== window
                                  ? a.removeEventListener(n.event, n.handler)
                                  : e.push({
                                      event: n.event,
                                      handler: n.handler,
                                    });
                              }),
                                (i.handler = e);
                            })()
                          : a !== window &&
                            (i.handler.forEach(function (e) {
                              a.removeEventListener(e.event, e.handler);
                            }),
                            (i.handler = []));
                      }
                    }),
                    this
                  );
              },
            },
            {
              key: "trigger",
              value: function (e) {
                var t = this.target[0];
                if (t) {
                  var n = document.createEvent("Event");
                  n.initEvent(e, !1, !0), t.dispatchEvent(n);
                }
              },
            },
            {
              key: "moveScroll",
              value: function (e) {
                var t = this,
                  n =
                    arguments.length <= 1 || void 0 === arguments[1]
                      ? 500
                      : arguments[1],
                  a =
                    arguments.length <= 2 || void 0 === arguments[2]
                      ? null
                      : arguments[2],
                  i = new Date().getTime();
                return 0 === this.target.length
                  ? !1
                  : void ("HTML" !== this.target[0].tagName &&
                    "BODY" !== this.target[0].tagName
                      ? !(function () {
                          var s = e,
                            o = t.target[0],
                            r = o.scrollTop,
                            c = s - r,
                            l = n,
                            h = Math.ceil(Math.abs(c) / Math.ceil(l / 16));
                          requestAnimationFrame(function d() {
                            var e = new Date().getTime() - i,
                              t = 0;
                            c > 0
                              ? ((t = o.scrollTop + h),
                                (o.scrollTop = o.scrollTop > s ? s : t))
                              : ((t = o.scrollTop - h),
                                (o.scrollTop = o.scrollTop < s ? s : t)),
                              l > e
                                ? requestAnimationFrame(d)
                                : null !== a && a();
                          });
                        })()
                      : !(function () {
                          var t = Math.round(e),
                            i =
                              document.body.scrollTop ||
                              document.documentElement.scrollTop,
                            s = t - i,
                            o = Math.ceil(Math.abs(s) / (n / 16)),
                            r =
                              document.body.scrollLeft ||
                              document.documentElement.scrollLeft,
                            c = null;
                          requestAnimationFrame(function l() {
                            var e =
                              document.body.scrollTop ||
                              document.documentElement.scrollTop;
                            if (c === e) return void (null !== a && a());
                            var n = 0;
                            s > 0
                              ? ((n = e + o), n > t && (n = t))
                              : ((n = e - o), t > n && (n = t)),
                              window.scrollTo(r, n),
                              (c = e),
                              t !== n
                                ? requestAnimationFrame(l)
                                : null !== a && a();
                          });
                        })());
              },
            },
          ]),
          e
        );
      })();
    t.instances = new WeakMap();
    var n = function (e) {
      return new t(e);
    };
    (n.ready = function (e) {
      "loading" === document.readyState
        ? document.addEventListener("DOMContentLoaded", e)
        : e();
    }),
      (n.load = function (e) {
        document.addEventListener("readystatechange", function (t) {
          "complete" === t.target.readyState && e();
        });
      }),
      (window.sg.common.libs = e),
      (window.sg.common.$q = n);
  })();
var $jscomp$this = void 0;
!(function () {
  var e = window.sg.common.$q,
    t = window.sg.common.utils,
    n = window.sg.common.constants.KEY_CODE,
    a = window.sg.common.lazyLoad,
    i = { section: ".gnb" },
    s = { window: null, component: null },
    o = (function () {
      function s(t) {
        _classCallCheck(this, s),
          (this.selector = {
            gnbMenuWrap: ".gnb__menu-wrap",
            depth1: ".gnb__depth1",
            depth1Menu: ".gnb__depth1-menu",
            depth1Link: ".gnb__depth1-link",
            depth2: ".gnb__depth2",
            depth2Wrap: ".gnb__depth2-wrap",
            depth2Inner: ".gnb__depth2-inner",
            depth2Menu: ".gnb__depth2-menu",
            depth2Link: ".gnb__depth2-link",
            depth2Close: ".gnb__depth2-close",
            depth3Wrap: ".gnb__depth3-wrap",
            depth3Inner: ".gnb__depth3-inner",
            depth3Menu: ".gnb__depth3-menu",
            depth3Link: ".gnb__depth3-link",
            featureContainer: ".gnb__feature-container",
            loginBtn: ".gnb__logout-btn, .gnb__login-btn",
            loginLayer: ".gnb__login-layer",
            cartBtn: ".gnb__cart-btn",
            layerOpenBtn: ".js-layer-open",
            layerCloseBtn: ".layer-popup__close, .gnb-js-layer-close",
            layerWrap: ".layer-popup",
            layerDim: ".layer-popup-dim",
            hasDepthMenu: "has-depth-menu",
            gnbDim: ".gnb__dimmed",
            gnbNavi: ".gnb__nav",
          }),
          (this.mobileSelector = {
            gnbContainer: ".gnb__depth1-container",
            gnbMenuBtn: ".gnb__menu-btn",
            gnbMenuClose: ".gnb__menu-close",
            gnbDepthBack: ".gnb__depth-back",
            utilLink: ".gnb__utility-mobile .gnb__utility-link",
          }),
          (this.el = { body: null, window: null, component: e(t) }),
          (this.mobileEl = { gnbMenuBtn: null }),
          (this.handler = { resize: this.resize.bind(this) }),
          s.instances.set(t, this),
          this.setElement(),
          this.init();
      }
      return (
        _createClass(s, [
          {
            key: "setElement",
            value: function () {
              (this.el.body = e("body")),
                (this.el.window = e(window)),
                (this.el.depth1 = this.el.component.find(this.selector.depth1)),
                (this.el.gnbMenuWrap = this.el.component.find(
                  this.selector.gnbMenuWrap
                )),
                (this.el.depth1Menu = this.el.component.find(
                  this.selector.depth1Menu
                )),
                (this.el.depth1Link = this.el.component.find(
                  this.selector.depth1Link
                )),
                (this.el.depth2Wrap = this.el.component.find(
                  this.selector.depth2Wrap
                )),
                (this.el.depth2Inner = this.el.component.find(
                  this.selector.depth2Inner
                )),
                (this.el.depth2Menu = this.el.component.find(
                  this.selector.depth2Menu
                )),
                (this.el.depth2Link = this.el.component.find(
                  this.selector.depth2Link
                )),
                (this.el.depth3Link = this.el.component.find(
                  this.selector.depth3Link
                )),
                (this.el.depth2Close = this.el.component.find(
                  this.selector.depth2Close
                )),
                (this.el.depth3Wrap = this.el.component.find(
                  this.selector.depth3Wrap
                )),
                (this.el.loginBtn = this.el.component.find(
                  this.selector.loginBtn
                )),
                (this.el.loginLayer = this.el.component.find(
                  this.selector.loginLayer
                )),
                (this.el.cartBtn = this.el.component.find(
                  this.selector.cartBtn
                )),
                (this.el.layerOpenBtn = this.el.component.find(
                  this.selector.layerOpenBtn
                )),
                (this.el.layerCloseBtn = this.el.component.find(
                  this.selector.layerCloseBtn
                )),
                (this.el.layerDim = this.el.component.find(
                  this.selector.layerDim
                )),
                (this.el.gnbDim = this.el.component.find(this.selector.gnbDim)),
                (this.el.depth1First = this.el.depth1Menu
                  .eq(0)
                  .find(this.selector.depth1Link)),
                (this.el.featureContainer = this.el.component.find(
                  this.selector.featureContainer
                )),
                (this.el.gnbNavi = this.el.component.find(
                  this.selector.gnbNavi
                )),
                (this.mobileEl.gnbContainer = this.el.component.find(
                  this.mobileSelector.gnbContainer
                )),
                (this.mobileEl.gnbMenuBtn = this.el.component.find(
                  this.mobileSelector.gnbMenuBtn
                )),
                (this.mobileEl.gnbMenuClose = this.el.component.find(
                  this.mobileSelector.gnbMenuClose
                )),
                (this.mobileEl.gnbDepthBack = this.el.component.find(
                  this.mobileSelector.gnbDepthBack
                )),
                (this.mobileEl.utilLink = this.el.component.find(
                  this.mobileSelector.utilLink
                )),
                (this.breakpoint = 1279),
                (this.viewPortSize = 1440),
                (this.depth2Flag = !1),
                (this.desktopFlag = !1),
                (this.mobileFlag = !1),
                (this.dimShowFlag = null),
                (this.dimHideFlag = null),
                (this.loginFlag = null),
                (this.dimEventFlag = !1),
                (this.animateTime = null),
                (this.subOpenFlag = !1);
            },
          },
          {
            key: "init",
            value: function () {
              this.bindEvents();
            },
          },
          {
            key: "reInit",
            value: function () {
              this.setElement(), this.bindEvents();
            },
          },
          {
            key: "resize",
            value: function () {
              var e = this;
              this.breakpoint < t.getViewPort().width
                ? this.desktopFlag === !1 &&
                  ((this.desktopFlag = !0),
                  (this.mobileFlag = !1),
                  this.el.gnbMenuWrap.css({ transition: "none" }),
                  this.deactiveMobileGnb(),
                  this.resetGnb(),
                  this.unbindEvents(),
                  this.bindEvents(),
                  setTimeout(function () {
                    e.el.gnbMenuWrap.css({ transition: "" });
                  }, 50))
                : this.mobileFlag === !1 &&
                  ((this.desktopFlag = !1),
                  (this.mobileFlag = !0),
                  this.el.gnbMenuWrap.css({ transition: "none" }),
                  this.deactiveGnb(),
                  this.deactiveSnb(),
                  this.resetGnb(),
                  this.unbindEvents(),
                  this.bindEvents(),
                  setTimeout(function () {
                    e.el.gnbMenuWrap.css({ transition: "" });
                  }, 50));
            },
          },
          {
            key: "toggleGnb",
            value: function (e) {
              e.parent().hasClass("active") ||
                (this.deactiveGnb(e),
                e.closest(".gnb__depth1-menu").hasClass("has-depth-menu") &&
                  this.activeGnb(e));
            },
          },
          {
            key: "deactiveGnb",
            value: function (t) {
              var n = this,
                a =
                  void 0 !== t
                    ? !t.parent().hasClass(this.selector.hasDepthMenu)
                    : !1;
              (this.subOpenFlag = !1),
                null !== this.dimShowFlag &&
                  (clearTimeout(this.dimShowFlag), (this.dimShowFlag = null)),
                null !== this.animateTime &&
                  (clearTimeout(this.animateTime), (this.animateTime = null)),
                this.el.depth1Link.target.forEach(function (t) {
                  var i = e(t).parent(),
                    s = i.find(n.selector.depth2Inner),
                    o = s.find(n.selector.depth2),
                    r = i.find(n.selector.depth2Close),
                    c = function () {
                      s.removeAttr("style"),
                        s.removeClass("active"),
                        i
                          .find(n.selector.depth2Wrap)
                          .css({ visibility: "hidden" }),
                        i.find(n.selector.depth2Menu).removeClass("active"),
                        "visible" === r.css("visibility") &&
                          r.css({ visibility: "hidden" });
                    },
                    l = function () {
                      i.removeClass("active");
                    },
                    h = function () {
                      r.finish().animate(
                        { opacity: 0 },
                        400,
                        "cubic-bezier(.4,0,.2,1)",
                        function () {
                          r.css({ visibility: "hidden" });
                        }
                      );
                    };
                  i.hasClass("active") &&
                    (o.removeClass("active"),
                    i.find(n.selector.depth1Link).removeClass("active"),
                    n.el.gnbMenuWrap.removeClass("active"),
                    a
                      ? (n.setHeight(s, 0, "animate", c),
                        h(),
                        l(),
                        n.el.gnbDim.hasClass("open")
                          ? (n.el.gnbDim.removeClass("open"),
                            (n.dimHideFlag = setTimeout(function () {
                              n.el.gnbDim.hide();
                            }, 600)))
                          : n.el.gnbDim.hasClass("open") ||
                            "block" !== n.el.gnbDim.css("display") ||
                            (n.el.gnbDim.hide(), c()),
                        (n.depth2Flag = !1))
                      : (c(),
                        h(),
                        l(),
                        setTimeout(function () {
                          n.setHeight(s, 0, "css");
                        }, 30)));
                }),
                e(this.selector.depth2Link + " > svg.icon--next").css({
                  "transition-delay": ".2s, .2s",
                }),
                (this.dimEventFlag = !1);
            },
          },
          {
            key: "activeGnb",
            value: function (t) {
              var n = this;
              null !== this.dimHideFlag &&
                (clearTimeout(this.dimHideFlag), (this.dimHideFlag = null));
              var i = t.parent(),
                s = i.find(this.selector.depth2Inner),
                o = s.find(this.selector.depth2),
                r = null;
              this.openFlag === !1 &&
                e(".gnb__depth2-link > svg.icon").css({
                  "transition-delay": ".2s, .2s",
                }),
                (r =
                  i.find(this.selector.depth2Menu).target.length > 0 &&
                  i.find(
                    this.selector.depth2Menu + ":not(.gnb-api--mobile-only)"
                  ).target.length < 1
                    ? i
                        .find(this.selector.depth2Menu)
                        .eq(0)
                        .find(this.selector.depth2Link)
                    : i
                        .find(
                          this.selector.depth2Menu +
                            ":not(.gnb-api--mobile-only)"
                        )
                        .eq(0)
                        .find(this.selector.depth2Link)),
                this.activeSnb(r),
                this.el.depth2Close.target.forEach(function (t) {
                  var n = e(t);
                  "0" === n.css("opacity") &&
                    "visible" === n.css("visibility") &&
                    n.css({ visibility: "hidden" });
                }),
                t.addClass("active"),
                i.addClass("active"),
                s.addClass("active"),
                o.addClass("active"),
                i
                  .find(this.selector.depth2Close)
                  .finish()
                  .css({ visibility: "visible" }),
                i
                  .find(this.selector.depth2Close)
                  .animate({ opacity: 1 }, 400, "cubic-bezier(.4,0,.2,1)"),
                this.el.gnbMenuWrap.addClass("active"),
                i.find(this.selector.depth2Wrap).css({ visibility: "visible" }),
                e(this.selector.depth2Link + " > svg.icon--next").css({
                  "transition-delay": "",
                }),
                a.setLazyLoad(),
                this.el.gnbDim.hasClass("open") ||
                  (this.el.gnbDim.show(),
                  (this.dimShowFlag = setTimeout(function () {
                    n.el.gnbDim.addClass("open");
                  }, 50))),
                (this.depth2Flag = !0);
            },
          },
          {
            key: "deactiveSnb",
            value: function () {
              var t = this;
              this.el.depth2Link.target.forEach(function (n) {
                var a = e(n).parent();
                a.hasClass("active") && a.removeClass("active"),
                  a.closest(t.selector.depth2Wrap).addClass("one-col"),
                  a.closest(t.selector.depth2Wrap).removeClass("all"),
                  e(".gnb__feature-container").removeClass("active"),
                  document
                    .querySelectorAll(".gnb__feature-container")
                    .forEach(function (e) {
                      e.innerHTML = "";
                    });
              });
            },
          },
          {
            key: "activeSnb",
            value: function (e, t) {
              var n = this,
                a = 672,
                i = e.parent(),
                s = i.closest(this.selector.depth2Inner),
                o = i.find(this.selector.depth3Wrap),
                r = e
                  .closest(this.selector.depth2Inner)
                  .find(this.selector.depth2Menu);
              if ((this.deactiveSnb(), !i.hasClass("active"))) {
                !t && i.addClass("active"),
                  !t &&
                    i.closest(this.selector.depth2Wrap).removeClass("one-col"),
                  !t && i.closest(this.selector.depth2Wrap).addClass("all");
                var c =
                    e
                      .closest(this.selector.depth2Inner)
                      .find(".gnb__depth2-title-wrap")
                      .outerHeight() + 24,
                  l = r.parent().outerHeight() + c,
                  h = o.target.length ? o.outerHeight() + 6 + c : 0;
                (a = l > h ? (l > a ? l : a) : h > a ? h : a),
                  this.depth2Flag === !1 || this.subOpenFlag === !0
                    ? (this.setHeight(s, a, "animate"),
                      (this.animateTime = setTimeout(function () {
                        n.dimEventFlag = !0;
                      }, 500)))
                    : (this.setHeight(s, a, "css"), (this.dimEventFlag = !0)),
                  this.activeDepth2Img(e);
              }
            },
          },
          {
            key: "activeDepth2Img",
            value: function (e, t) {
              !t &&
                e
                  .closest(this.selector.depth2Inner)
                  .find(".gnb__feature-container")
                  .addClass("active");
              var n = e
                  .closest(this.selector.depth2Inner)
                  .find(".gnb__depth2-title-text").target[0]
                  ? e
                      .closest(this.selector.depth2Inner)
                      .find(".gnb__depth2-title-text").target[0].textContent
                  : "",
                i = document.createElement("div");
              if (
                (i.setAttribute("class", "hybrid-class"),
                (i.innerHTML = e.attr("data-flyout-img")
                  ? '\n      <div class="glide">\n        <div class="glide__track" data-glide-el="track">\n          <ul class="glide__slides">\n            <li class="glide__slide">\n              <a class="gnb__feature-container-link" href="' +
                    e.attr("data-flyout-url") +
                    '" data-link_cat="navigation" data-link_id="' +
                    e.target[0].text +
                    '" data-link_meta="link_name:' +
                    e.target[0].text +
                    '" data-link_position="navigation>gnb>' +
                    n +
                    ">" +
                    e.target[0].text +
                    '" data-event_name="select_' +
                    e.target[0].text +
                    '_click">\n            <div class="image">\n              <img class="image__main image--loaded" src="' +
                    e.attr("data-flyout-img") +
                    '"/>\n            </div>\n            <div class="gnb__feature-container-contents">\n              <p class="gnb__feature-container-description ' +
                    e.attr("data-flyout-theme") +
                    '">' +
                    e.attr("data-flyout-text") +
                    '</p>\n              <span class="cta cta--contained hidden cta--black">' +
                    e.target[0].text +
                    "</span>\n            </div>\n          </a>\n            </li>\n          </ul>\n        </div>\n      </div>"
                  : ""),
                t)
              ) {
                var s = document.querySelector(
                  ".gnb__depth2-menu.has-depth-menu.open .gnb__depth3 .hybrid-class"
                );
                s ||
                  document
                    .querySelector(
                      ".gnb__depth2-menu.has-depth-menu.open .gnb__depth3"
                    )
                    .appendChild(i);
              } else
                document.querySelector(".gnb__feature-container.active") &&
                  ((document.querySelector(
                    ".gnb__feature-container.active"
                  ).textContent = ""),
                  document
                    .querySelector(".gnb__feature-container.active")
                    .appendChild(i));
              a.setLazyLoad();
            },
          },
          {
            key: "setHeight",
            value: function (e, t, n, a) {
              var i = 0;
              0 !== t && (i = t + "px"),
                "css" === n
                  ? e.css({ transition: "none", height: i })
                  : (e.css({ transition: "" }),
                    e
                      .stop()
                      .animate(
                        { height: i },
                        500,
                        "Cubic-bezier (0.4, 0, 0.2, 1)",
                        a
                      ));
            },
          },
          {
            key: "deactiveLoginMenu",
            value: function () {
              this.el.loginLayer.removeClass("active"), (this.loginFlag = null);
            },
          },
          {
            key: "activeLoginMenu",
            value: function () {
              this.el.loginLayer.addClass("active");
            },
          },
          {
            key: "moveActiveMenu",
            value: function () {
              var t = this,
                n = [];
              this.el.depth1Menu.target.forEach(function (a) {
                var i = e(a);
                i.hasClass("active-first") &&
                  (n.push(i.find(t.selector.depth1Link)),
                  i.find(t.selector.depth2Menu).target.forEach(function (a) {
                    var i = e(a);
                    i.hasClass("active-second") &&
                      n.push(i.find(t.selector.depth2Link));
                  }));
              }),
                n.length > 0 && this.activeMobileFirstMenu(n[0], n[1]);
            },
          },
          {
            key: "activeMobileGnb",
            value: function () {
              e(i.section).css({ position: "fixed", width: "100%" }),
                e("#content").css({ "padding-top": "56px" }),
                this.el.gnbMenuWrap.addClass("open"),
                this.el.depth1.addClass("open"),
                this.mobileEl.gnbDepthBack.attr("tabindex", "-1"),
                this.el.component.hasClass("js-mobile-open") &&
                  this.moveActiveMenu(),
                t.hiddenScroll();
            },
          },
          {
            key: "deactiveMobileGnb",
            value: function (n) {
              var a = this;
              this.mobileEl.gnbContainer.removeClass("slide"),
                this.el.gnbMenuWrap.removeClass("open"),
                this.el.depth1.removeClass("open"),
                e(i.section).css({ position: "", width: "" }),
                e("#content").css({ "padding-top": "" }),
                this.el.depth1Menu.target.forEach(function (t, n) {
                  var i = e(t);
                  i.hasClass("open") &&
                    ((a.activeFirst = n),
                    i.removeClass("open"),
                    i.find(a.selector.depth2Wrap).hide(),
                    i.find(a.selector.depth2Wrap).removeClass("open"),
                    i
                      .find(a.selector.depth2Menu)
                      .target.forEach(function (t, n) {
                        var i = e(t);
                        i.hasClass("open") &&
                          ((a.activeSecond = n), i.removeClass("open"));
                      }));
                }),
                this.el.depth1Link.removeAttr("tabindex"),
                this.mobileEl.utilLink.removeAttr("tabindex"),
                t.visibleScroll(),
                n && this.mobileEl.gnbMenuBtn.focus();
            },
          },
          {
            key: "activeMobileFirstMenu",
            value: function (t, n) {
              var i = this,
                s = t.parent();
              this.mobileEl.gnbDepthBack.removeAttr("tabindex"),
                s.hasClass(this.selector.hasDepthMenu) &&
                  (s.addClass("open"),
                  this.mobileEl.gnbContainer.addClass("slide"),
                  s.find(this.selector.depth2Wrap).css({ display: "block" }),
                  this.el.depth2Menu.target.forEach(function (t) {
                    var n = e(t);
                    if (n.hasClass(i.selector.hasDepthMenu)) {
                      var a = n.find(i.selector.depth3Inner).height();
                      0 ==
                        n.find(".hybrid-class .gnb__feature-container-link")
                          .target.length && (a += 400),
                        n.find(i.selector.depth3Inner).attr("data-height", a),
                        n.hasClass("open") ||
                          n.find(i.selector.depth3Wrap).css({ height: "0" });
                    }
                  }),
                  s.find(this.selector.depth2Wrap).addClass("open"),
                  this.el.depth1Link.attr("tabindex", "-1"),
                  this.mobileEl.utilLink.attr("tabindex", "-1"),
                  s.find(this.selector.depth2Inner).scrollTop(0)),
                void 0 !== n &&
                  setTimeout(function () {
                    i.activeMobileSecondMenu(n);
                  }, 600),
                a.setLazyLoad();
            },
          },
          {
            key: "activeMobileSecondMenu",
            value: function (t) {
              var n = this,
                a = t.parent(),
                i = a.find(".icon--dropdown");
              i.target.length > 0 &&
                !(function () {
                  var i = 56 * a.index();
                  a.hasClass("open")
                    ? (a.hasClass(n.selector.hasDepthMenu) &&
                        (a.find(n.selector.depth3Wrap).css({ height: "0" }),
                        setTimeout(function () {
                          a.closest(n.selector.depth2Inner).moveScroll(0, 100);
                        }, 200),
                        setTimeout(function () {
                          a.find(n.selector.depth3Wrap).css({
                            visibility: "hidden",
                          });
                        }, 300)),
                      a.removeClass("open"))
                    : !(function () {
                        var s = null;
                        if (
                          (n.el.depth2Menu.target.forEach(function (t) {
                            var a = e(t);
                            a.hasClass("open") &&
                              ((s = a.find(n.selector.depth3Wrap)),
                              s.css({
                                "transition-duration": ".2s",
                                visibility: "hidden",
                                height: "0",
                              }),
                              a.removeClass("open"));
                          }),
                          a.addClass("open"),
                          n.activeDepth2Img(t, !0),
                          a.hasClass(n.selector.hasDepthMenu))
                        ) {
                          var o = parseInt(
                            a.find(n.selector.depth3Inner).attr("data-height")
                          );
                          a
                            .find(n.selector.depth3Wrap)
                            .css({
                              visibility: "visible",
                              height: o + 17 + "px",
                            }),
                            setTimeout(function () {
                              null !== s &&
                                (s.css({ "transition-duration": "" }),
                                (s = null)),
                                a
                                  .closest(n.selector.depth2Inner)
                                  .moveScroll(i, 100);
                            }, 200);
                        }
                      })();
                })();
            },
          },
          {
            key: "backDepthMobile",
            value: function (t) {
              var n = this,
                a = 0;
              this.el.depth1Link.removeAttr("tabindex"),
                this.mobileEl.utilLink.removeAttr("tabindex"),
                this.el.depth1Menu.target.forEach(function (t, i) {
                  var s = e(t);
                  s.hasClass("open") &&
                    ((a = i),
                    n.mobileEl.gnbContainer.removeClass("slide"),
                    s.removeClass("open"),
                    s.find(n.selector.depth2Link).removeClass("open"),
                    s.find(n.selector.depth2Menu).removeClass("open"),
                    s.find(n.selector.depth2Wrap).removeClass("open"),
                    s.find(n.selector.depth2Inner).scrollTop(0),
                    setTimeout(function () {
                      s.find(n.selector.depth2Wrap).css({ display: "none" });
                    }, 200),
                    s.find(n.selector.depth3Wrap).target.forEach(function (t) {
                      var n = e(t);
                      n.css({ height: "" });
                    }));
                }),
                this.el.depth1Menu.eq(a).find(this.selector.depth1Link).focus(),
                this.mobileEl.gnbContainer.trigger("scroll");
            },
          },
          {
            key: "setFocusFoward",
            value: function (t) {
              var a = this,
                i = !1;
              t.keyCode === n.TAB &&
                t.shiftKey === !1 &&
                (this.el.depth1Menu.target.forEach(function (t) {
                  var n = e(t);
                  n.hasClass("open") &&
                    (n.find(a.mobileSelector.gnbDepthBack).focus(), (i = !0));
                }),
                i === !1 && this.el.depth1First.focus()),
                t.preventDefault();
            },
          },
          {
            key: "setFocusReverse",
            value: function (e) {
              e.keyCode === n.TAB &&
                e.shiftKey === !0 &&
                (this.mobileEl.gnbMenuClose.focus(), e.preventDefault());
            },
          },
          {
            key: "setCloseFocus",
            value: function (t) {
              var a = this,
                i = !1;
              t.keyCode === n.TAB && t.shiftKey === !1
                ? (this.el.depth1Menu.target.forEach(function (t) {
                    var n = e(t);
                    n.hasClass("open") &&
                      (n.find(a.mobileSelector.gnbDepthBack).focus(), (i = !0));
                  }),
                  i === !1 && this.el.depth1First.focus(),
                  t.preventDefault())
                : t.keyCode === n.ENTER &&
                  (this.deactiveMobileGnb(!0), t.preventDefault());
            },
          },
          {
            key: "openPopup",
            value: function (t) {
              var n = t.dataset.divId,
                a = e("" + n);
              "none" === a.css("display")
                ? (this.el.layerDim.show(),
                  a.attr("tabindex", "0"),
                  a.show(),
                  a.focus())
                : this.closePopup();
            },
          },
          {
            key: "closePopup",
            value: function (t) {
              var n = e(t.closest(this.selector.layerWrap)),
                a = n.attr("id");
              this.el.layerDim.hide(),
                n.hide(),
                n.removeAttr("tabindex"),
                this.el.layerOpenBtn.target.forEach(function (e) {
                  e.dataset.divId === "#" + a && e.focus();
                });
            },
          },
          {
            key: "unbindEvents",
            value: function () {
              this.el.depth1Link.off("mouseenter"),
                this.el.depth1Link.off("keydown"),
                this.el.depth1Link.off("click"),
                this.el.depth2Close.off("click"),
                this.el.depth2Link.off("mouseenter"),
                this.el.depth2Link.off("keydown"),
                this.el.depth2Link.off("focus"),
                this.el.depth2Link.off("click"),
                this.el.loginBtn.off("mouseenter"),
                this.el.loginBtn.off("mouseleave"),
                this.el.loginBtn.off("keydown"),
                this.el.loginLayer.off("mouseenter"),
                this.el.loginLayer.off("mouseleave"),
                this.el.cartBtn.off("focus"),
                this.el.gnbDim.off("mouseenter"),
                this.el.gnbNavi.off("mouseleave"),
                this.mobileEl.gnbMenuBtn.off("click"),
                this.mobileEl.gnbMenuClose.off("click"),
                this.mobileEl.gnbMenuClose.off("keydown"),
                this.mobileEl.gnbDepthBack.off("click"),
                this.mobileEl.gnbDepthBack.off("keydown"),
                this.el.depth1First.off("keydown"),
                this.el.featureContainer.off("keydown");
            },
          },
          {
            key: "resetGnb",
            value: function () {
              var e = this;
              this.el.depth2Wrap.removeAttr("style"),
                this.el.depth3Wrap.css({ visibility: "", height: "" }),
                this.el.depth2Close.css({ visibility: "hidden" }),
                this.el.gnbDim.removeClass("open"),
                this.el.gnbDim.hide(),
                setTimeout(function () {
                  e.el.depth2Inner.removeAttr("style");
                }, 500);
            },
          },
          {
            key: "bindEvents",
            value: function () {
              var n = this;
              this.breakpoint < t.getViewPort().width
                ? this.desktopEvents()
                : this.mobileEvents(),
                this.el.window
                  .off("resize", this.handler.resize)
                  .on("resize", this.handler.resize),
                this.el.layerOpenBtn.target.forEach(function (t) {
                  var a = e(t);
                  a.off("click").on("click", function () {
                    n.openPopup(t);
                  });
                }),
                this.el.layerCloseBtn.target.forEach(function (t) {
                  var a = e(t);
                  a.off("click").on("click", function () {
                    n.closePopup(t);
                  });
                });
            },
          },
          {
            key: "mobileEvents",
            value: function () {
              var t = this;
              this.mobileEl.gnbMenuBtn.target.forEach(function (n) {
                var a = e(n);
                a.off("click").on("click", function () {
                  t.activeMobileGnb();
                });
              }),
                this.mobileEl.gnbMenuClose.target.forEach(function (n) {
                  var a = e(n);
                  a.off("click").on("click", function () {
                    t.deactiveMobileGnb(!0);
                  }),
                    a.off("keydown").on("keydown", function (e) {
                      t.setCloseFocus(e);
                    });
                }),
                this.el.depth1Link.target.forEach(function (n) {
                  var a = e(n);
                  a.off("click").on("click", function () {
                    t.activeMobileFirstMenu(a);
                  });
                }),
                this.mobileEl.gnbDepthBack.target.forEach(function (n) {
                  var a = e(n);
                  a.off("click").on("click", function () {
                    t.backDepthMobile(a);
                  }),
                    a.off("keydown").on("keydown", function (e) {
                      t.setFocusReverse(e);
                    });
                }),
                this.el.depth2Link.target.forEach(function (n) {
                  var a = e(n);
                  a.off("click").on("click", function () {
                    t.activeMobileSecondMenu(a);
                  });
                }),
                this.el.depth1First.off("keydown").on("keydown", function (e) {
                  t.setFocusReverse(e);
                });
            },
          },
          {
            key: "desktopEvents",
            value: function () {
              var a = this;
              this.el.depth1Link.target.forEach(function (t) {
                var i = e(t);
                i.off("mouseenter").on("mouseenter", function () {
                  a.toggleGnb(i);
                }),
                  i.off("keydown").on("keydown", function (e) {
                    e.keyCode === n.ENTER &&
                      (a.toggleGnb(i),
                      i.parent().hasClass("has-depth-menu") &&
                        e.preventDefault());
                  });
              }),
                this.el.depth2Close.target.forEach(function (t) {
                  var n = e(t);
                  n.off("click").on("click", function () {
                    a.deactiveGnb(n);
                  });
                }),
                this.el.gnbDim.off("mouseenter").on("mouseenter", function () {
                  a.dimEventFlag === !0 && a.deactiveGnb(a.el.gnbDim);
                }),
                this.el.gnbNavi.off("mouseleave").on("mouseleave", function () {
                  a.breakpoint < t.getViewPort().width &&
                    "block" === a.el.gnbDim.target[0].style.display &&
                    a.deactiveGnb(a.el.gnbDim);
                }),
                this.el.depth2Link.target.forEach(function (t) {
                  var n = e(t);
                  n
                    .find(".gnb__depth2-link-text, .icon--next")
                    .off("mouseenter")
                    .on("mouseenter", function () {
                      (a.subOpenFlag = !0),
                        a.activeSnb(n),
                        a.activeDepth2Img(n);
                    }),
                    n
                      .find(".gnb__depth2-link-text, .icon--next")
                      .off("focus")
                      .on("focus", function () {
                        (a.subOpenFlag = !0),
                          a.activeSnb(n),
                          a.activeDepth2Img(n);
                      }),
                    n
                      .find(".gnb__depth2-link-text, .icon--next")
                      .off("click")
                      .on("click", function (e) {
                        n.parent().hasClass("has-depth-menu") &&
                          e.preventDefault();
                      });
                }),
                this.el.loginBtn.target.forEach(function (t) {
                  var i = e(t);
                  i.off("focus").on("focus", function () {
                    a.activeLoginMenu();
                  }),
                    i.off("mouseenter").on("mouseenter", function () {
                      null === a.loginFlag
                        ? a.activeLoginMenu()
                        : (clearTimeout(a.loginFlag), (a.loginFlag = null));
                    }),
                    i.off("mouseleave").on("mouseleave", function () {
                      null !== a.loginFlag &&
                        (clearTimeout(a.loginFlag), (a.loginFlag = null)),
                        (a.loginFlag = setTimeout(function () {
                          a.deactiveLoginMenu();
                        }, 200));
                    }),
                    i.off("keydown").on("keydown", function (e) {
                      e.keyCode === n.TAB &&
                        e.shiftKey === !0 &&
                        (a.el.depth1Menu
                          .eq(a.el.depth1Menu.target.length - 1)
                          .find(a.selector.depth1Link)
                          .focus(),
                        a.deactiveLoginMenu(),
                        e.preventDefault());
                    });
                }),
                this.el.loginLayer.target.forEach(function (t) {
                  var n = e(t);
                  n.off("mouseenter").on("mouseenter", function () {
                    null !== a.loginFlag && clearTimeout(a.loginFlag);
                  }),
                    n.off("mouseleave").on("mouseleave", function () {
                      null !== a.loginFlag && clearTimeout(a.loginFlag),
                        (a.loginFlag = setTimeout(function () {
                          a.deactiveLoginMenu();
                        }, 200));
                    });
                }),
                this.el.cartBtn.target.forEach(function (t) {
                  var n = e(t);
                  n.off("focus").on("focus", function () {
                    a.deactiveLoginMenu();
                  });
                });
            },
          },
        ]),
        s
      );
    })(),
    r = function () {
      (s.component = e(i.section)),
        s.component.target.length &&
          s.component.target.forEach(function (e) {
            o.instances.has(e) || new o(e);
          });
    },
    c = function () {
      "loading" === document.readyState
        ? document.addEventListener("DOMContentLoaded", r)
        : ((s.component = e(i.section)),
          s.component.target.forEach(function (e) {
            if (o.instances.has(e)) {
              var t = o.instances.get(e);
              t.reInit();
            } else new o(e);
          }));
    };
  (o.instances = new WeakMap()),
    (window.sg.components.gnb = { init: r, reInit: c });
})();
var _createClass = (function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var a = t[n];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        "value" in a && (a.writable = !0),
        Object.defineProperty(e, a.key, a);
    }
  }
  return function (t, n, a) {
    return n && e(t.prototype, n), a && e(t, a), t;
  };
})();
!(function () {
  function e() {
    n(o.section).target.forEach(function (e) {
      r.instances.has(e) || new r(e);
    });
  }
  function t() {
    n(o.section).target.forEach(function (e) {
      if (r.instances.has(e)) {
        var t = r.instances.get(e);
        t.reInit();
      }
    });
  }
  var n = window.sg.common.$q,
    a = window.sg.common.libs,
    i = window.sg.common.constants.BREAKPOINTS,
    s = window.sg.common.utils,
    o = { section: ".footer" },
    r = (function () {
      function e(t) {
        _classCallCheck(this, e),
          (this.selector = {
            section: o.section,
            category: ".footer-category__anchor",
            categoryActive: "footer-category__anchor--active",
            categoryList: ".footer-category__list-wrap",
            categoryItem: ".footer-column__item",
            language: ".footer-language__anchor",
            languagePanel: ".footer-language__panel .footer-language__content",
            languageActive: "footer-language__anchor--active",
            languageTopTarget: ".footer-copyright-align",
            topBtn: ".footer-back-to-top__cta",
          }),
          (this.ele = { window: n(window), section: n(t), wrap2list: [] }),
          this.setProperty(),
          (this.isPCmode = i.MOBILE < s.getViewPort().width),
          (this.handler = {
            resize: this.resize.bind(this),
            focusLock: this.focusLock.bind(this),
            outClick: this.outClick.bind(this),
          }),
          e.instances.set(t, this),
          this.init();
      }
      return (
        _createClass(e, [
          {
            key: "setProperty",
            value: function () {
              var e = this;
              this.ele.topBtn = this.ele.section
                .find(this.selector.topBtn)
                .eq(0);
              var t = this.ele.section.find("." + this.selector.categoryActive);
              (this.ele.categoryActive = t.target.length <= 0 ? null : t),
                (this.ele.category = this.ele.section.find(
                  this.selector.category
                )),
                (this.ele.language = this.ele.section.find(
                  this.selector.language
                )),
                (this.ele.languagePanel = this.ele.section.find(
                  this.selector.languagePanel
                )),
                (this.ele.languageTopTarget = this.ele.section.find(
                  this.selector.languageTopTarget
                )),
                (this.ele.wrap2list = []),
                this.ele.section
                  .find(this.selector.categoryList)
                  .target.forEach(function (t) {
                    var n = t.querySelectorAll(".footer-category__list");
                    n.length > 1 &&
                      e.ele.wrap2list.push([].concat(_toConsumableArray(n)));
                  });
            },
          },
          {
            key: "focusLock",
            value: function (e) {
              var t = this;
              e.keyCode === a.keyCode.TAB_KEY &&
                setTimeout(
                  function () {
                    var e =
                      n(document.activeElement).closest(
                        t.ele.languagePanel.target[0]
                      ).target.length <= 0;
                    e && t.closeLanguage();
                  }.bind(this),
                  30
                );
            },
          },
          {
            key: "outClick",
            value: function (e) {
              var t =
                n(e.target).closest(this.ele.languagePanel.target[0]).target
                  .length <= 0;
              (t || e.target === document.documentElement) &&
                this.closeLanguage();
            },
          },
          {
            key: "init",
            value: function () {
              var e = this;
              this.setLengthTop(), this.bindEvents();
              var t = this.ele.section.find(".image__preview");
              t.target.length > 0 &&
                t.eq(t.target.length - 1).on("load", function () {
                  e.setLengthTop();
                });
            },
          },
          {
            key: "reInit",
            value: function () {
              this.setProperty(), this.bindEvents(), this.resize();
            },
          },
          {
            key: "resize",
            value: function () {
              (this.isPCmode = i.MOBILE < s.getViewPort().width),
                this.setLengthTop(),
                this.isPCmode &&
                  null !== this.ele.categoryActive &&
                  this.closeCategory(this.ele.categoryActive, !0),
                this.setWrap2list();
            },
          },
          {
            key: "bindEvents",
            value: function () {
              var e = this;
              this.ele.topBtn
                .off("click")
                .on("click", this.moveScroll.bind(this)),
                this.ele.category.off("click").on("click", function (t) {
                  var a = n(t.currentTarget);
                  a.hasClass(e.selector.categoryActive)
                    ? e.closeCategory(a)
                    : e.openCategory(a);
                }),
                this.ele.language.off("click").on("click", function () {
                  e.ele.language.hasClass(e.selector.languageActive)
                    ? e.closeLanguage()
                    : e.openLanguage();
                }),
                this.ele.window
                  .off("resize", this.handler.resize)
                  .on("resize", this.handler.resize);
            },
          },
          {
            key: "moveScroll",
            value: function () {
              s.scrollTo(0);
            },
          },
          {
            key: "openLanguage",
            value: function () {
              var e = this;
              this.ele.language.addClass(this.selector.languageActive),
                setTimeout(function () {
                  e.ele.window
                    .off("keydown", e.handler.focusLock)
                    .on("keydown", e.handler.focusLock),
                    e.ele.window
                      .off("click", e.handler.outClick)
                      .on("click", e.handler.outClick);
                }, 30);
            },
          },
          {
            key: "setWrap2list",
            value: function () {
              var e = this;
              this.ele.wrap2list.forEach(function (t) {
                var a = n(t),
                  i = 0;
                a.css({ height: "" }),
                  e.isPCmode &&
                    (t.forEach(function (e) {
                      var t = e.getBoundingClientRect().height;
                      t > i && (i = t);
                    }),
                    a.css({ height: i + "px" }));
              });
            },
          },
          {
            key: "closeLanguage",
            value: function () {
              this.ele.language.removeClass(this.selector.languageActive),
                this.ele.window.off("keydown", this.handler.focusLock),
                this.ele.window.off("click", this.handler.outClick),
                this.ele.language.focus();
            },
          },
          {
            key: "openCategory",
            value: function (e) {
              if (null !== this.ele.categoryActive) {
                this.ele.categoryActive.removeClass(
                  this.selector.categoryActive
                ),
                  e.addClass(this.selector.categoryActive);
                var t = e
                  .closest(this.selector.categoryItem)
                  .target[0].getBoundingClientRect();
                if (t.top < -1 * e.height()) {
                  var n =
                      document.body.scrollTop ||
                      document.documentElement.scrollTop,
                    a =
                      document.body.scrollLeft ||
                      document.documentElement.scrollLeft;
                  window.scrollTo(a, n + t.top);
                }
                this.ele.categoryActive.addClass(this.selector.categoryActive),
                  e.removeClass(this.selector.categoryActive),
                  this.closeCategory(this.ele.categoryActive);
              }
              e.addClass(this.selector.categoryActive),
                e.parent().find(this.selector.categoryList).slideDown(500),
                (e.find(".hidden").target[0].innerHTML = "close"),
                (this.ele.categoryActive = e);
            },
          },
          {
            key: "closeCategory",
            value: function (e) {
              var t = this,
                n =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? !1
                    : arguments[1],
                a = e.parent().find(this.selector.categoryList);
              n
                ? (e.removeClass(this.selector.categoryActive),
                  (e.find(".hidden").target[0].innerHTML = "open"))
                : !(function () {
                    var n = a.isAnimate();
                    a.stop().slideUp(500, function () {
                      e.removeClass(t.selector.categoryActive),
                        (e.find(".hidden").target[0].innerHTML = "open"),
                        n && a.css({ height: "", display: "", overflow: "" });
                    });
                  })(),
                (this.ele.categoryActive = null);
            },
          },
          {
            key: "setLengthTop",
            value: function () {
              if ((this.ele.language.css({ top: "" }), !this.isPCmode)) {
                var e = this.ele.language.target[0].getBoundingClientRect(),
                  t =
                    this.ele.languageTopTarget.target[0].getBoundingClientRect(),
                  n = -1 * (e.top - t.bottom);
                this.ele.language.css({ top: n + "px" });
              }
            },
          },
        ]),
        e
      );
    })();
  (r.instances = new WeakMap()),
    (window.sg.components.footer = { reInit: t }),
    n.ready(e);
})(),
  (function () {
    function e() {
      l = {
        gnbSearch: document.querySelector(".gnb-search"),
        gnbSearchForm: document.querySelector(".gnb-search__form"),
        gnbSearchInput: document.querySelector(".gnb-search__input"),
        gnbSearchPlaceholder: document.querySelector(
          ".gnb-search__placeholder"
        ),
        gnbSearchTrendingSearch: document.querySelector(
          ".gnb-search__trending_search"
        ),
        gnbSearchInputCancelButton: document.querySelector(
          ".gnb-search__input-btn--cancel"
        ),
        gnbSearchResultWrap: document.querySelector(".gnb-search__result-wrap"),
        gnbSearchHistory: document.querySelector(".gnb-search__history"),
        gnbSearchSuggested: document.querySelector(".gnb-search__suggested"),
        gnbSearchRelated: document.querySelector(".gnb-search__related"),
        gnbSearchMatched: document.querySelector(".gnb-search__matched"),
        gnbSearchNoSuggestions: document.querySelector(
          ".gnb-search__no-suggestions"
        ),
        gnbSearchInputCloseButton: document.querySelector(
          ".gnb-search__input-btn--close"
        ),
        gnbSearchCloseBtn: document.querySelector(".gnb-search__btn--close"),
      };
    }
    function t() {
      e(), l.gnbSearch && (a(), i());
    }
    function n(e) {
      var t = /[\{\}\[\]\/?,;:|\)*~`!^_<>@\#$%&\\\=\(\'\"]/gi;
      return e.replace(t, "");
    }
    function a() {
      l.gnbSearchForm.addEventListener("submit", function () {
        (l.gnbSearchInput.value = n(l.gnbSearchInput.value)),
          l.gnbSearchInput.focus();
      }),
        l.gnbSearchInputCancelButton.addEventListener("click", function () {
          s();
        }),
        l.gnbSearchInputCloseButton.addEventListener("click", function () {
          o();
        }),
        l.gnbSearchCloseBtn.addEventListener("click", function () {
          o();
        }),
        window.addEventListener("resize", function () {
          i();
        });
    }
    function i() {
      (l.gnbSearchResultWrap.style.maxHeight =
        window.innerHeight -
        l.gnbSearchForm.getBoundingClientRect().bottom +
        "px"),
        (l.gnbSearchResultWrap.style.overflow = "auto");
    }
    function s() {
      (l.gnbSearchInput.value = ""),
        l.gnbSearchInputCancelButton.classList.remove(
          "gnb-search__input-btn--cancel--show"
        ),
        l.gnbSearchPlaceholder.classList.remove(
          "gnb-search__placeholder--hide"
        ),
        l.gnbSearchHistory.classList.add("gnb-search__history--hide"),
        l.gnbSearchSuggested.classList.add("gnb-search__suggested--hide"),
        l.gnbSearchRelated.classList.add("gnb-search__related--hide"),
        l.gnbSearchMatched.classList.add("gnb-search__matched--hide"),
        l.gnbSearchNoSuggestions.classList.add(
          "gnb-search__no-suggestions--hide"
        );
    }
    function o() {
      s(),
        (l.gnbSearch.style.display = "none"),
        document.body.removeAttribute("style");
    }
    function r() {
      i();
    }
    var c = window.sg.common.$q,
      l = {};
    (window.sg.components.gnbSearch = { init: t, reInit: r }),
      c.ready(function () {
        return t();
      });
  })(),
  (function (e) {
    "undefined" == typeof e.cookies && (e.cookies = {});
    var t = e("#siteCode").val(),
      n = "/content/samsung";
    (e.cookies.data = e.cookies.data || {}),
      (e.cookies.data.SEARCH_NAME = "sk"),
      (e.cookies.getDefaultOption = function (e, t) {
        return (
          (e && e instanceof Date) ||
            ((e = new Date()), e.setTime(e.getTime() + 864e5)),
          t
            ? window.location.pathname.indexOf(n) > -1 && (t = n + t)
            : (t = "/"),
          { expiresAt: e, path: t, domain: ".samsung.com", secure: !1 }
        );
      }),
      (e.cookies.setSearchKeyword = function (n, a) {
        var i = this.data.SEARCH_NAME,
          s = 4,
          o = this.get(i);
        if (o) {
          if (e.inArray(n, o) >= 0) return;
          o.length >= s && o.splice(0, 1), o.push(n);
        } else o = [n];
        this.set(i, o, this.getDefaultOption(a, "/" + t + "/"));
      }),
      (e.cookies.getSearchKeyword = function () {
        var t = this.get(this.data.SEARCH_NAME);
        return t && e.isArray(t) ? t : [];
      }),
      (e.cookies.clearSearchKeyword = function (e) {
        this.del(
          this.data.SEARCH_NAME,
          this.getDefaultOption(e, "/" + t + "/")
        );
      });
  })(window.jQuery),
  (function (e) {
    function t() {
      W.gnbSearchSuggested.addClass("gnb-search__suggested--hide"),
        W.gnbSearchHistory.addClass("gnb-search__history--hide"),
        W.gnbSearchRelated.addClass("gnb-search__related--hide"),
        W.gnbSearchMatched.addClass("gnb-search__matched--hide"),
        W.gnbSearchNoSuggestions.addClass("gnb-search__no-suggestions--hide");
    }
    function n() {
      if (0 < B.length) {
        var t = "";
        e.each(B, function (e) {
          (t += '<li class="gnb-search__result-item">'),
            (t +=
              '<a href="javascript:;" keyword="' + encodeURIComponent(B[e])),
            (t +=
              '" an-tr="search layer--text-link" an-ca="search" an-ac="search layer" an-la="search history:' +
              B[e] +
              '"  data-link_cat="search" data-link_id="search_term:' +
              B[e] +
              '" data-link_meta="search_term:' +
              B[e] +
              '" data-link_position="search>search layer>history" data-event_name="search_matched contents">'),
            (t += B[e]),
            (t += "</a>"),
            (t += "</li>");
        }),
          W.gnbSearchHistory.find("ul").html(t);
      }
    }
    function a() {
      n(),
        W.gnbSearchSuggested.addClass("gnb-search__suggested--hide"),
        W.gnbSearchHistory.removeClass("gnb-search__history--hide"),
        W.gnbSearchRelated.addClass("gnb-search__related--hide"),
        W.gnbSearchMatched.addClass("gnb-search__matched--hide"),
        W.gnbSearchNoSuggestions.addClass("gnb-search__no-suggestions--hide");
    }
    function i() {
      "us" != P &&
        (W.gnbSearchSuggested.removeClass("gnb-search__suggested--hide"),
        W.gnbSearchHistory.addClass("gnb-search__history--hide"),
        W.gnbSearchRelated.addClass("gnb-search__related--hide"),
        W.gnbSearchMatched.addClass("gnb-search__matched--hide")),
        W.gnbSearchNoSuggestions.addClass("gnb-search__no-suggestions--hide");
    }
    function s() {
      W.gnbSearchSuggested.addClass("gnb-search__suggested--hide"),
        W.gnbSearchHistory.addClass("gnb-search__history--hide"),
        W.gnbSearchRelated.addClass("gnb-search__related--hide"),
        W.gnbSearchMatched.addClass("gnb-search__matched--hide"),
        W.gnbSearchNoSuggestions.removeClass(
          "gnb-search__no-suggestions--hide"
        ),
                window.utag &&
          window.utag.link({
            link_cat: "search",
            link_id: e(".gnb-search__input").val(),
            link_meta:
              "no suggestions:search_term:" + e(".gnb-search__input").val(),
            link_position: "no suggestion>results count:0",
            event_name: "no suggestion"+" "+ e(".gnb-search__input").val(),
            page_type:"B2C"
          });
    }
    function o() {
      W.gnbSearchSuggested.addClass("gnb-search__suggested--hide"),
        W.gnbSearchHistory.addClass("gnb-search__history--hide"),
        W.gnbSearchRelated.removeClass("gnb-search__related--hide"),
        W.gnbSearchMatched.removeClass("gnb-search__matched--hide"),
        W.gnbSearchNoSuggestions.addClass("gnb-search__no-suggestions--hide"),
        window.utag &&
          window.utag.link({
            link_cat: "search",
            link_id: e(".gnb-search__input").val(),
            link_meta:
              "related searches and matched content:search_term:" +
              e(".gnb-search__input").val(),
              link_position:"suggestion>related searches count:"+matchedAndSearchRelatedCount.relatedCount +"> matched contents:"+ matchedAndSearchRelatedCount.matchedCount,
              event_name:"suggestion_"+e(".gnb-search__input").val(),
              page_type:"B2C"
          });
    }
    function r() {
      W.gnbSearchResultWrap.removeClass("gnb-search__result-wrap--hide"),
        W.gnbSearchChipWrap.addClass("gnb-search__chip-wrap--hide");
    }
    function c() {
      W.gnbSearchResultWrap.addClass("gnb-search__result-wrap--hide"),
        W.gnbSearchChipWrap.removeClass("gnb-search__chip-wrap--hide");
        W.gnbSearchTrendingSearch.addClass("gnb-search__trending_search--hide");
    }
    function getCookie(cookieName){
      var cookieValue = document.cookie.match("(^|;) ?" + cookieName + "=([^;]*)(;|$)");
      return cookieValue ? cookieValue[2] : null;
    }
    function showTrendingSearch(isShowTredingSearch) {
      if(isShowTredingSearch&& getCookie("trendingTest"))   
         W.gnbSearchTrendingSearch.removeClass("gnb-search__trending_search--hide");
      else  W.gnbSearchTrendingSearch.addClass("gnb-search__trending_search--hide");
     }
     function getTredingSearchData(){
      e.ajax({
        type: "GET",
        crossDomain: !0,
        dataType: "json",
        jsonCallback: "samsungcallback",
        url: "/us/api/es_search_global/global/trending_contents.json",
        error: function (er) {
          console.log('getTredingSearchData==>_err',er)

        },
        success: function (e) {
          if(e&& e["Trending contents"]&&e["Trending contents"].length > 0){
            let trending_content = ''
            e["Trending contents"].forEach(key=>{
              console.log("result=>",key)
              if(key){
                trending_content += '<p class="gnb-search__result-item gnb-search__trending_search__result-item">      <span class="gnb-search__rending_search-item" > <img class="gnb-search__trending_search-icon image__main lazy-load" src="//image-us.samsung.com/SamsungUS/outlink_icon/regular/Outlink.png">'+key+'</span></p>'
              }
            })
            $(".gnb-search__trending_search .gnb-search__result-list").html(trending_content);

          }
        },
      });
     }
    function l(e) {
      return (e = e
        .split("<")
        .join("")
        .split(">")
        .join("")
        .split("&lt")
        .join("")
        .split("&gt")
        .join(""));
    }
    function h(e, t) {
      return e.split(t).join("<b>" + t + "</b>");
    }
    function d(e) {
      var t = e
        .split('"')
        .join("&quot;")
        .split("<b>")
        .join("")
        .split("</b>")
        .join("");
      return t;
    }
    function u(e) {
      return (
        (e = d(e)),
        Granite.I18nSearch.get("search.common.labels.searchBy.a1", [e])
      );
    }
    function g(e) {
      var t = e;
      return (
        e.lastIndexOf("/") === e.length - 1 && (t = e.substr(0, e.length - 1)),
        t
      );
    }
    function p(e) {
      var t =
        /(?:\/\/)([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi;
      return t.test(e) || (e = F + e), e;
    }
    function m() {
      var t = "";
      0 < N.length
        ? (e.each(N, function (e) {
            var n = N[e];
            7 > e &&
              (t +=
                '<li class="gnb-search__result-item"><a href="' +
                O +
                encodeURIComponent(l(n)) +
                '" title="' +
                u(n) +
                '" an-tr="search layer--text-suggested" an-ca="search" an-ac="search layer" an-la="suggested searches:' +
                d(n) +
                '">' +
                N[e] +
                "</a></li>");
          }),
          W.gnbSearchSuggested.find("ul").html(t),
          i())
        : 0 < B.length
        ? a()
        : s();
    }
    function f() {
      if ("us" !== P) {
        var t = { siteCd: P, stage: U.stage, searchValue: "" };
        e.ajax({
          type: "GET",
          crossDomain: !0,
          data: t,
          dataType: "json",
          jsonCallback: "samsungcallback",
          url: g(U.domain) + z,
          error: function () {
            s();
          },
          success: function (e) {
            var t = e.response.resultData;
            if (t && t.common)
              if (t.common.suggestedKeywords) {
                for (
                  var n = t.common.suggestedKeywords, a = 0;
                  a < n.length;
                  a++
                ) {
                  var i = n[a];
                  N.indexOf(i) < 0 && N.length < 7 && N.push(i);
                }
                m();
              } else s();
          },
        });
      }
    }
    function v(t, n) {
      var a = "",
        i = e(".gnb-search__input").val();
      if (0 < t.length) {
        for (var s = 0; s < t.length; s++) {
          var o = t[s];
          4 > s &&
            (a +=
              '<li class="gnb-search__result-item"><a href="' +
              O +
              encodeURIComponent(l(o)) +
              '" title="' +
              u(o) +
              '" an-tr="search layer--text-related" an-ca="search" data-link_cat="search" data-link_id="' +
              i +
              '"data-link_meta="search_term:' +
              i +
              '" data-link_position="submit>related Searches>'+s+'>'+ o+'" data-event_name="submit_'+i+'" data-page_type="B2C" an-ac="search layer" an-la="related searches:' +
              d(o) +
              '">' +
              h(o, n) +
              "</a></li>");
        }
        return (
          W.gnbSearchRelated.find("ul").html(a),
          W.gnbSearchRelated.removeClass("gnb-search__related--hide"),
          "Y"
        );
      }
      return W.gnbSearchRelated.addClass("gnb-search__related--hide"), "N";
    }
    function b(e, t) {
      var n = "",
        a = e.title;
      if (e.contentSource.indexOf("Support") > -1) {
        var i = e.scmsContentSource.toUpperCase();
        (a = e.scTitle), "PRODUCT" === i && (a = e.dispNm);
      }
      var s = "";
      return (
        (s =
          "ConnectedLiving" === e.contentSource
            ? "search.common.category.mde"
            : "AppsServices" === e.contentSource
            ? "search.common.category.appServices"
            : "search.common.category." + e.contentSource.toLowerCase()),
        (n +=
          '<li class="gnb-search__result-item"><a href="' +
          e.linkUrl +
          '" title="' +
          u(a) +
          '" data-search-data="' +
          encodeURIComponent(a) +
          '" an-tr="search layer--text-matched" an-ca="search" an-ac="search layer" an-la="matched contents:support:' +
          d(a) +
          '"><span class="gnb-search__result-item-anchor">[' +
          Granite.I18nSearch.get(s) +
          ']</span><span class="gnb-search__result-item-title">' +
          h(a, t) +
          "</span></a></li>")
      );
    }
    function y(e, t) {
      var n = "",
        a = parseFloat(e.reviewsCount || "0");
      if (a > 0) {
        for (
          var i = parseFloat(e.ratings), s = "", o = 0;
          o < Math.floor(i);
          o++
        )
          s +=
            '<span class="gnb-search__result-product-rating-star gnb-search__result-product-rating-star--active"><svg class="icon" focusable="false"><use xlink:href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#star-rating-full-bold" href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#star-rating-full-bold"></use></svg></span>';
        for (var r = 0; r < 5 - Math.floor(i); r++)
          s +=
            '<span class="gnb-search__result-product-rating-star"><svg class="icon" focusable="false"><use xlink:href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#star-rating-full-bold" href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#star-rating-full-bold"></use></svg></span>';
        n +=
          '<a class="gnb-search__result-product-rating" href="' +
          e.linkUrlReview +
          '" title="' +
          Granite.I18nSearch.get("{0} Reviews", [d(t)]) +
          '" data-modelcode="' +
          e.modelCode +
          '" data-modelname="' +
          e.modelName +
          '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:review">' +
          s +
          '<span class="gnb-search__result-product-rating-star-count">' +
          i +
          '</span><span class="gnb-search__result-product-rating-review-count">(' +
          a +
          ")</span></a>";
      }
      return n;
    }
    function _(e, t) {
      var n = "";
      if (
        e &&
        ("" !== e.supportLinkUrl ||
          "" !== e.supportLinkUrlManuals ||
          "" !== e.regLinkUrl)
      ) {
        var a =
          '<svg class="icon" focusable="false"><use xlink:href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#next-bold" href="/us/smg/etc.clientlibs/samsung/clientlibs/us/common/clientlib-dependencies/resources/images/icons/p6-footer.svg#next-bold"></use></svg>';
        (n += '<div class="gnb-search__result-product-cta-wrap">'),
          "" !== e.supportLinkUrlManuals &&
            (n +=
              '<a href="' +
              e.supportLinkUrlManuals +
              '" class="gnb-search__result-product-cta" title="' +
              d(t) +
              ":" +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.ownersManual"
              ) +
              '" data-modelcode="' +
              e.modelCode +
              '" data-modelname="' +
              e.modelName +
              '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:manual">' +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.ownersManual"
              ) +
              a +
              "</a>"),
          "" !== e.supportLinkUrl &&
            (n +=
              '<a href="' +
              e.supportLinkUrl +
              '" class="gnb-search__result-product-cta" title="' +
              d(t) +
              ":" +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.support"
              ) +
              '" data-modelcode="' +
              e.modelCode +
              '" data-modelname="' +
              e.modelName +
              '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:support">' +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.support"
              ) +
              a +
              "</a>"),
          "" !== e.regLinkUrl &&
            (n +=
              '<a href="' +
              e.regLinkUrl +
              '" class="gnb-search__result-product-cta" title="' +
              d(t) +
              ":" +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.register"
              ) +
              '" data-modelcode="' +
              e.modelCode +
              '" data-modelname="' +
              e.modelName +
              '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:register">' +
              Granite.I18nSearch.get(
                "search.comp.gnbSearch.product.cta.register"
              ) +
              a +
              "</a>"),
          "us" == P &&
            window.innerWidth > 768 &&
            (n +=
              '<a href="javascript:void(0)" class="gnb-search__result-product-cta shop-with-expert-search" title="Chat with expert" data-modelcode="' +
              e.modelCode +
              '" data-modelname="' +
              e.modelName +
              '" an-tr="search layer--product-shop-with-expert" an-ca="search" an-ac="search layer" an-la="matched contents:product:shop-with-expert">Shop with an Expert' +
              a +
              "</a>"),
          (n += "</div>");
      }
      return n;
    }
    function w(e, t) {
      var n = "",
        a = {},
        i = "",
        s = "",
        o = "",
        r = e.thumbnailUrl,
        c = e.thumbnailUrlAlt || "",
        l = e.displaySortTitle;
      if (e.modelList) {
        for (var d = 0; d < e.modelList.length; d++)
          "M" === e.modelList[d].mdlRegTypeCd && (a = e.modelList[d]);
        "Y" === a.shopYN && (s = y(a, l));
      }
      return (
        r &&
          (i +=
            '<img src="' +
            p(r) +
            '?$SRP_PRD_THUM_GRID_PNG$" alt="' +
            c +
            '" class="gnb-search__result-item-img">'),
        (o = _(a, l)),
        (n +=
          '<li class="gnb-search__result-item gnb-search__result-item--products">' +
          i +
          '<div class="gnb-search__result-product-wrap"><a href="' +
          a.pdpURL +
          '" title="' +
          u(l) +
          '" data-modelcode="' +
          a.modelCode +
          '" data-modelname="' +
          a.modelName +
          '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:product click"><span class="gnb-search__result-item-anchor">[' +
          Granite.I18nSearch.get("search.common.category.product") +
          ']</span><span class="gnb-search__result-item-title">' +
          h(l, t) +
          "</span></a>" +
          s +
          o +
          "</div></li>")
      );
    }
    function k(t, n,position) {
      var a = "",
        i = {},
        s = "",
        o = "",
        r = "",
        c = t.MediumImage ? t.MediumImage[0] : "",
        l = t.Title ? t.Title[0] : "";
      (i.reviewsCount = t.ReviewsCount ? t.ReviewsCount[0] : ""),
        (i.ratings = t.Ratings_display ? t.Ratings_display[0] : ""),
        (i.linkUrlReview = t.LinkUrl ? t.LinkUrl[0] + "/#reviews" : ""),
        (i.modelName = ""),
        (i.modelCode = t.ModelCode ? t.ModelCode[0] : ""),
        (i.regLinkUrl = "/us/support/register/"),
        (i.supportLinkUrl = t["Support.LinkUrl"]
          ? t["Support.LinkUrl"][0]
          : ""),
        (i.supportLinkUrlManuals = t["Support.LinkUrl"]
          ? t["Support.LinkUrl"][0] + "#manuals"
          : ""),
        (i.linkUrl = t.LinkUrl ? t.LinkUrl[0] : ""),
        (o = y(i, l)),
        c &&
          (s +=
            '<img src="' +
            p(c) +
            '?$SRP_PRD_THUM_GRID_PNG$" class="gnb-search__result-item-img">'),
        (r = _(i, l));
      var d = e(".gnb-search__input").val();
      return (a +=
        '<li class="gnb-search__result-item gnb-search__result-item--products">' +
        s +
        '<div class="gnb-search__result-product-wrap"><a href="' +
        i.linkUrl +
        '" title="' +
        u(l) +
        '" an-tr="search layer--product-link" an-ca="search" an-ac="search layer" an-la="matched contents:product:product click" data-link_cat="search" data-link_id="' +
        d +
        '" data-link_meta="' +
        d +
        '" data-link_position="submit>matched Contents>'+position+'>'+ l+'" data-event_name="submit'+d+'" data-page_type="B2C" ><span class="gnb-search__result-item-anchor">[' +
        Granite.I18nSearch.get("search.common.category.product") +
        ']</span><span class="gnb-search__result-item-title">' +
        h(l, n) +
        "</span></a>" +
        o +
        r +
        "</div></li>");
    }
    function C(e, t) {
      var n = "",
        a = "";
      if (0 < e.length) {
        for (var i = 0, s = 0, o = 0; o < e.length; o++)
          4 > i && "Products" !== e[o].contentSource
            ? ((n += b(e[o], t)), i++)
            : 1 > s &&
              "Products" === e[o].contentSource &&
              ((a += w(e[o], t)), s++);
        return (
          (n += a),
          W.gnbSearchMatched.find("ul").html(n),
          "" !== n
            ? (W.gnbSearchMatched.removeClass("gnb-search__matched--hide"), "Y")
            : (W.gnbSearchMatched.addClass("gnb-search__matched--hide"), "N")
        );
      }
      return W.gnbSearchMatched.addClass("gnb-search__matched--hide"), "N";
    }
    function S(t) {
      var n = "",
        a = t.Suggestions.Suggestion,
        i = t.Recommend,
        s = t.q;
      if (a.length) {
        var o = a[0];
        if (i[o]) {
          var r = i[o][0],
            c = 0;
            var position = 0
          for (var l in r)
            if (
              r[l] &&
              "N" === r[l][0].IsHidden[0] &&
              ((n += k(r[l][0], s,position++)), c++, c > 1)
            )
              break;
        }
      }
      return (
        1 == a.length &&
          window.utag &&
          window.utag.link({
            link_cat: "search",
            link_id: "search_term:" + e(".gnb-search__input").val(),
            link_meta: "search_term:" + e(".gnb-search__input").val(),
            link_position: "search>results>exact match",
            event_name: "search_exact_match",
          }),
        W.gnbSearchMatched.find("ul").html(n),
        "" !== n
          ? (W.gnbSearchMatched.removeClass("gnb-search__matched--hide"), "Y")
          : (W.gnbSearchMatched.addClass("gnb-search__matched--hide"), "N")
      );
    }
    var matchedAndSearchRelatedCount ={
      relatedCount:0,matchedCount:0
    }
    function E(e) {
      matchedAndSearchRelatedCount.relatedCount = e.Suggestions.Suggestion.length
      matchedAndSearchRelatedCount.matchedCount =Object.keys((e.Recommend&&Object.keys(e.Recommend))? e.Recommend[Object.keys(e.Recommend)[0]][0]:{}).length|| 0
     
      var t = "N",
        n = "N";
      "us" !== P
        ? ("Y" === H.related &&
            e.common.relatedKeywords &&
            (t = v(e.common.relatedKeywords, e.q)),
          "Y" === H.matched &&
            e.resultList &&
            e.resultList.length > 0 &&
            e.resultList[0].contentList &&
            e.resultList[0].contentList.length > 0 &&
            (n = C(e.resultList[0].contentList, e.q)))
        : e.Suggestions &&
          e.Suggestions.Suggestion &&
          ("Y" === H.related && (t = v(e.Suggestions.Suggestion, e.q)),
          "Y" === H.matched && e.Recommend && (n = S(e))),
        o(),
        "N" === t && W.gnbSearchRelated.addClass("gnb-search__related--hide"),
        "N" === n && W.gnbSearchMatched.addClass("gnb-search__matched--hide"),
        "N" === t &&
          "N" === n &&
          (0 < B.length ? a() : 0 < N.length ? i() : s());
    }
   
    function L(t) {
      if ("us" === P) A(t);
      else {
        var n = { siteCd: P, stage: U.stage, searchValue: t };
        e.ajax({
          type: "GET",
          crossDomain: !0,
          data: n,
          dataType: "json",
          jsonCallback: "samsungcallback",
          url: g(U.domain) + z,
          error: function () {
            s();
          },
          success: function (e) {
                                    var n = e.response.resultData;
            (n.q = t), n && n.common.searchCount > 0 ? E(n) : s();
          },
        });
      }
    }
    function A(t) {
      var n = { searchTerm: t };
      e.ajax({
        type: "GET",
        data: n,
        url: g(U.domain),
        error: function () {
          s();
        },
        success: function (e) {
                    (e.q = t), "object" == typeof e.Recommend ? E(e) : s();
        },
      });
    }
    function M(t) {
      var n = new Date();
      n.setTime(n.getTime() + 72576e5),
        e.cookies.setSearchKeyword(decodeURIComponent(t), n);
    }
    function I() {
      (U.domain = e.trim(e("#esapiSearchDomain").val())),
        "us" === P &&
          ((R = "listType=g&searchTerm"),
          (U.domain = "/us/search/global/es/typeahead")),
        (U.stage = e.trim(e("#apiStageInfo").val())),
        W.gnbSearchSuggested.find("li").each(function () {
          var t = e.trim(e(this).text());
          N.indexOf(t) < 0 && N.push(t);
        }),
        (O += O.indexOf(".html") > -1 ? "?" + R + "=" : "/?" + R + "=");
    }
    var T = e("section.gnb-search");
    let isTrendingSearchShow =true;
    let isClickedInputCloseButton = false;
    if (T) {
      var P = e("#siteCode").val(),
        x = "qa",
        R = "searchvalue",
        F = e("#scene7domain").val(),
        O = e("#sc_gnb_searchURL").val();
      "us" === P && (O = "/us/search/searchMain");
      var D = e("#sc_gnb_placeholder").val(),
        B = e.cookies.getSearchKeyword(),
        N = [],
        z = "/search/suggest/v6";
      Granite.I18nSearch.setLocale(e("#language").val());
      var U = { domain: null, stage: x },
        H = {
          suggest: "Y",
          related: "Y",
          matched: e("#sc_gnb_matchedcontentsusable").val() || "Y",
        },
        W = {
          gnbSearchForm: T.find(".gnb-search__form"),
          gnbSearchInputWrap: T.find(".gnb-search__input-wrap"),
          gnbSearchInput: T.find(".gnb-search__input"),
          gnbSearchPlaceholder: T.find(".gnb-search__placeholder"),
          gnbSearchTrendingSearch: T.find(".gnb-search__trending_search"),
          gnbSearchInputCancelButton: T.find(".gnb-search__input-btn--cancel"),
          gnbSearchInputSubmitButton: T.find(".gnb-search__input-btn--search"),
          gnbSearchResultWrap: T.find(".gnb-search__result-wrap"),
          gnbSearchHistory: T.find(".gnb-search__history"),
          gnbSearchHistoryClearButton: T.find(
            ".gnb-search__btn--history-clear"
          ),
          gnbSearchSuggested: T.find(".gnb-search__suggested"),
          gnbSearchRelated: T.find(".gnb-search__related"),
          gnbSearchMatched: T.find(".gnb-search__matched"),
          gnbSearchNoSuggestions: T.find(".gnb-search__no-suggestions"),
          gnbSearchChipWrap: T.find(".gnb-search__chip-wrap"),
          gnbSearchCloseBtn: T.find(".gnb-search__btn--close"),
        };
      T.on("focus", ".gnb-search__input", function () {
        var t = l(e.trim(e(this).val()));
        (B = e.cookies.getSearchKeyword()),
          t && t.length > 1
            ? L(t)
            : 0 < B.length
            ? a()
            : (i(), N.length < 7 && f()),
          ("us" != P || (t && t.length > 0)) && r(),
          window.sg.components.gnbSearch.reInit();
          if(t)isTrendingSearchShow= false;
          if(isClickedInputCloseButton&&!t) isTrendingSearchShow= true;
          isClickedInputCloseButton = false
          getTredingSearchData()
      }),
        T.on("click", ".gnb-search__contents", function (t) {
          if(isTrendingSearchShow)showTrendingSearch(true);
          if(0 === e(".gnb-search__search-wrap").has(t.target).length) isTrendingSearchShow= true;
          0 === e(".gnb-search__search-wrap").has(t.target).length && c();
        }),
        T.on("click", ".gnb-search__input-btn--cancel", function () {
          c();
          isClickedInputCloseButton = true;
        }), 
        T.on("click", ".gnb-search__btn--close", function () {
          isTrendingSearchShow= true;
        }),
        T.on("click", ".gnb-search__trending_search__result-item", function () {
         console.log('search__trending_search__result==>', e(this).text());
         const selectedTrendingSearch = e(this).text()
         window.utag &&
         window.utag.link({
           link_cat: "search",
           link_id: "trending_search :"+ selectedTrendingSearch,
           link_meta:"trending_search:" + selectedTrendingSearch,
           link_position: "trendingkeyword_"+selectedTrendingSearch,
           event_name: "trending_search_"+selectedTrendingSearch,
         });
         window.location.href = O + selectedTrendingSearch ;     
        }),
        T.on("input", ".gnb-search__input", function () {
          showTrendingSearch(false);
          isTrendingSearchShow=false
          var t = e.trim(e(this).val()),
            n = /[\{\}\[\]?,;:|\)*~`!^_<>@\#$%&\\\=\(\'\"]/gi;
          n.test(t) && e(this).val(t.replace(n, "")),
            (B = e.cookies.getSearchKeyword()),
            t && t.length > 1
              ? ("us" === P && r(),
                W.gnbSearchPlaceholder.addClass(
                  "gnb-search__placeholder--hide"
                ),
                W.gnbSearchInputCancelButton.addClass(
                  "gnb-search__input-btn--cancel--show"
                ),
                L(t))
              : (W.gnbSearchPlaceholder.removeClass(
                  "gnb-search__placeholder--hide"
                ),
                W.gnbSearchInputCancelButton.removeClass(
                  "gnb-search__input-btn--cancel--show"
                ),
                0 < B.length ? a() : f(),
                W.gnbSearchRelated.find("ul").empty(),
                W.gnbSearchMatched.find("ul").empty()),
            t &&
              t.length > 0 &&
              (W.gnbSearchPlaceholder.addClass("gnb-search__placeholder--hide"),
              W.gnbSearchInputCancelButton.addClass(
                "gnb-search__input-btn--cancel--show"
              )),
            t &&
              0 === t.length &&
              (W.gnbSearchPlaceholder.removeClass(
                "gnb-search__placeholder--hide"
              ),
              W.gnbSearchInputCancelButton.removeClass(
                "gnb-search__input-btn--cancel--show"
              ));
                        }),
        T.on(
          "click",
          ".gnb-search__related a, .gnb-search__suggested a",
          function () {
            var t = e(this).text();
            M(t);
          }
        ),
        T.on("click", ".gnb-search__history a", function () {
          var t = l(e(this).html());
          window.location.href = O + t;
        }),
        T.on("click", ".gnb-search__btn--history-clear", function () {
          t(),
            i(),
            e.cookies.clearSearchKeyword(),
            (B = []),
            N.length < 7 && f();
        }),
        T.on("click", ".gnb-search__input-btn--search", function (t) {
          window.utag &&
          window.utag.link({
            link_cat: "search",
            link_id: e(".gnb-search__input").val(),
            link_position: "submit>related searches count:"+matchedAndSearchRelatedCount.relatedCount +"> matched contents:"+ matchedAndSearchRelatedCount.matchedCount,
            event_name: "submit_"+ e(".gnb-search__input").val(),
            page_type:"B2C"
          });
          t.preventDefault();
          var n = l(e.trim(W.gnbSearchInput.val()));
          n || (n = D),
            n &&
              (M(n),
              (window.location.href = O + encodeURIComponent(n)),
              (window.gmap = null));
        }),
        e(document).on("click", ".gnb-search__chip", function () {
          var t = e(this).text();
          M(t), (window.location.href = O + t);
        }),
        // e(document).on("click", ".gnb__search-btn-js", function () {
        //   T.show(),
        //     W.gnbSearchInput.focus(),
        //     (document.body.style.overflow = "hidden");
        // }),
        e(function () {
          O && "" !== O && I();
        });
    }
  })(window.jQuery);

function spopOpen() {
  (spopSlide = function () {
    $("#spop-overlay.active").slideDown();
  }),
    spopSlide(),
    $("#spop-overlay .spop-close").click(function () {
      $("#spop-overlay.active").slideUp();
    });
}
function spopOpen2() {
  (spopSlide = function () {
    window.scrollY > 107
      ? $("#spop-overlay2.active").slideDown()
      : $("#spop-overlay2.active").slideUp();
  }),
    spopSlide(),
    $("#spop-overlay2 .spop-close").click(function () {
      $("#spop-overlay2.active").slideUp();
    });
}
function sappOpen() {
  $("#sapp-overlay").addClass("load"),
    $(".sapp-close-btn").click(function () {
      $("#sapp-overlay").removeClass("load");
    }),
    (window.sessionStorage.sappClose = "true");
}
function tagOnce() {
  var e = 0;
  if (!poptag)
    var o = setInterval(function () {
      e++,
        "undefined" != typeof utag
          ? (utag.link({
              link_cat: "mobile shop app extender",
              link_id: "mobile_shop_app_extender_impression",
              link_meta: "link_name:extender impression",
              link_position: "mobile shop app",
            }),
            (poptag = !0),
            clearInterval(o))
          : e >= 20 && clearInterval(o);
    }, 500);
}
function setLoginPath() {
  $(
    '.gnb-b2c-user-container a[href="/us/login/"], .gnb-b2c-soverlay a[href="/us/login/"]'
  ).on("click", function (e) {
    if ((e.preventDefault(), "/us/login/" !== window.location.pathname)) {
      var o = encodeURIComponent(window.location.href);
      window.location.href = "/us/login/?redirect=" + o;
    }
  });
}
function deleteCookie(e, o, t) {
  (t = "samsung.com"),
    getCookie(e) &&
      (document.cookie =
        e +
        "=" +
        (o ? ";path=" + o : "") +
        (t ? ";domain=" + t : "") +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT");
}
function isLogin() {
  var e = getCookie("xsdcxyn"),
    o = getCookie("iPlanetDirectoryProOptVal");
  return null != e && "" != e
    ? !0
    : null == o || "" == o
    ? !1
    : void loginUser(o);
}
function loginUser(e) {
  saLogin++;
  var o = "//sso-us.samsung.com/sso/profile/saLoginUser?optVal=" + e;
  1 == saLogin &&
    $.ajax({
      type: "POST",
      url: o,
      dataType: "jsonp",
      async: !1,
      cache: !1,
      jsonpCallback: "callbackSso",
      jsonp: "callback",
    });
}
function logoutCallback(e) {
  e &&
    e.result &&
    "success" == e.result &&
    (deleteCookie("prof_fname2", "/", ".samsung.com"),
    dropCookiesHistory($(".logoutSMG").attr("href")),
    window.location.reload());
}
function callbackSso(e) {
  if (e.login) {
    var o = $(".login"),
      t = $(".logoutSMG");
    o.text("HI, " + getUserName()),
      $(".login-trigger").hover(
        function () {
          o.addClass("account-open"),
            $(".myaccount-dropdown").css({ opacity: 1, display: "block" });
        },
        function () {
          o.removeClass("account-open"),
            $(".myaccount-dropdown").css({ opacity: 0, display: "none" }),
            (open = !1);
        }
      ),
      hostName(),
      t.click(function () {
        dropCookiesHistory(t.attr("href"));
      });
  }
}
function hostName() {
  var e = location.hostname,
    o = $(".logoutSMG");
  -1 !== e.indexOf("www")
    ? o.attr("href", "//sso-us.samsung.com/sso/logout")
    : o.attr("href", "//sso-stg.us.samsung.com/sso/logout");
}
function deleteLoginRequestCookie() {
  $.cookies.del("estoreLoginRequesting"),
    $.cookies.del("estoreLoginRequesting", { domain: ".samsung.com" });
}
function deleteSignCookie() {
  $.cookies.del("snsSessionId"),
    $.cookies.del("snsSessionId", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("isStoreLogedIn"),
    $.cookies.del("sa_em"),
    $.cookies.del("sa_em", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("eVar67"),
    $.cookies.del("eVar67", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("lastName", { domain: ".samsung.com" }),
    $.cookies.del("firstName", { domain: ".samsung.com" }),
    $.cookies.del("guid", { domain: ".samsung.com" }),
    $.cookies.del("ReD", { domain: ".samsung.com" }),
    $.cookies.del("directCallFl", { expires: null, domain: ".samsung.com" }),
    $.cookies.del("directCallFlv2", { expires: null, domain: ".samsung.com" }),
    $.cookies.del("returnURL", { domain: ".samsung.com" }),
    deleteLoginRequestCookie();
}
function deleteSACookie() {
  $.cookies.del("xsdcxyn"),
    $.cookies.del("xsdcxyn", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("xsdcbxyn"),
    $.cookies.del("xsdcbxyn", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("iPlanetDirectoryPro"),
    $.cookies.del("iPlanetDirectoryPro", { path: "/", domain: ".samsung.com" }),
    $.cookies.del("iPlanetDirectoryProOptVal"),
    $.cookies.del("iPlanetDirectoryProOptVal", {
      path: "/",
      domain: ".samsung.com",
    });
}
function dropCookiesHistory(e) {
  if (e) {
    var o = e;
    $(".logoutSMG").attr("href", o),
      setCookie("targetUrl", window.location.href, 0, "/", "samsung.com", "");
  }
  return (
    deleteCookie("prof_country", "/", document.domain),
    deleteCookie("prof_prolist_saved", "/", ""),
    deleteCookie("prof_id", "/", document.domain),
    deleteCookie("prof_lname", "/", document.domain),
    deleteCookie("prof_bpno_s", "/", document.domain),
    deleteCookie("prof_fname", "/", document.domain),
    deleteCookie("prof_login_success", "/", document.domain),
    deleteCookie("bvdisplaycode", "/", ""),
    deleteCookie("bvproductid", "/", ""),
    deleteCookie("bvpage", "/", ""),
    deleteCookie("bvcontenttype", "/", ""),
    deleteCookie("bvauthenticateuser", "/", ""),
    deleteCookie("bzv_url", "/", ""),
    deleteCookie("auth_flag", "/", ""),
    deleteCookie("iPlanetDirectoryProOptVal", "/", document.domain),
    deleteCookie("iPlanetDirectoryPro", "/", document.domain),
    deleteCookie("tppid", "/", document.domain),
    deleteCookie("tmktid", "/", document.domain),
    deleteCookie("tmktname", "/", document.domain),
    deleteCookie("tlgimg", "/", document.domain),
    deleteCookie("taccessrtype", "/", document.domain),
    deleteCookie("dr_a_token", "/", document.domain),
    deleteCookie("dr_r_token", "/", document.domain),
    deleteCookie("work_email", "/", document.domain),
    deleteCookie("work_pin", "/", document.domain),
    deleteCookie("remoteId", "/", document.domain),
    deleteCookie("grp_id", "/", document.domain),
    deleteCookie("grp_nm", "/", document.domain),
    deleteCookie("crown", "/", document.domain),
    deleteCookie("jwt_USA", "/", document.domain),
    deleteCookie("epp_verified", "/", document.domain),
    deleteCookie("tsgmt", "/", document.domain),
    deleteCookie("isUSGuestUser", "/", document.domain),
    sessionStorage.removeItem("eppPlanId"),
    sessionStorage.removeItem("eppMarketId"),
    sessionStorage.removeItem("finderPrdIaCd"),
    deleteSignCookie(),
    deleteSACookie(),
    deleteCookie("ecom_vi", "/", document.domain),
    deleteCookie("s_ecom_session", "/", document.domain),
    !0
  );
}
function getUserName() {
  var e = fortune("prof_fname");
  return e;
}
function getCookie(e) {
  return window.Cookies.get(e);
}
function setCookie(e, o, t, n, a, i) {
  var s = new Date();
  s.setTime(s.getTime()), t && (t = 1e3 * t * 60 * 60 * 24);
  var r = new Date(s.getTime() + t);
  document.cookie =
    e +
    "=" +
    o +
    (t ? ";expires=" + r.toGMTString() : "") +
    (n ? ";path=" + n : "") +
    (a ? ";domain=" + a : "") +
    (i ? ";secure" : "");
}
function endsWith(e, o) {
  return -1 !== e.indexOf(o, e.length - o.length);
}
function fortune(e) {
  return String(window.Cookies.get(e))
    .replace(/<script>/g, "")
    .replace(/<\/script>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function logoutCallbackForWindowClose(e) {
  e &&
    e.result &&
    "success" == e.result &&
    (deleteCookie("prof_id", "/", ".samsung.com"),
    dropCookiesHistory(),
    window.location.reload());
}
!(function (e, o) {
  e(function () {
    "use strict";
    function e(e, o) {
      return null != e && null != o && e.toLowerCase() === o.toLowerCase();
    }
    function t(e, o) {
      var t,
        n,
        a = e.length;
      if (!a || !o) return !1;
      for (t = o.toLowerCase(), n = 0; a > n; ++n)
        if (t === e[n].toLowerCase()) return !0;
      return !1;
    }
    function n(e) {
      for (var o in e) r.call(e, o) && (e[o] = new RegExp(e[o], "i"));
    }
    function a(e, o) {
      (this.ua = e || ""), (this._cache = {}), (this.maxPhoneWidth = o || 600);
    }
    var i = {};
    (i.mobileDetectRules = {
      phones: {
        iPhone: "\\biPhone\\b|\\biPod\\b",
        BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
        HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
        Nexus:
          "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
        Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
        Motorola:
          "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
        Samsung:
          "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350",
        LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
        Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
        Asus: "Asus.*Galaxy|PadFone.*Mobile",
        Micromax:
          "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
        Palm: "PalmSource|Palm",
        Vertu:
          "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
        Pantech:
          "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
        Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
        Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
        iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
        SimValley:
          "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
        Wolfgang:
          "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
        Alcatel: "Alcatel",
        Nintendo: "Nintendo 3DS",
        Amoi: "Amoi",
        INQ: "INQ",
        GenericPhone:
          "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser",
      },
      tablets: {
        iPad: "iPad|iPad.*Mobile",
        NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
        SamsungTablet:
          "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561",
        Kindle:
          "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b",
        SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
        HPTablet:
          "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
        AsusTablet:
          "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C",
        BlackBerryTablet: "PlayBook|RIM Tablet",
        HTCtablet:
          "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
        MotorolaTablet:
          "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
        NookTablet:
          "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
        AcerTablet:
          "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b",
        ToshibaTablet:
          "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
        LGTablet:
          "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
        FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
        PrestigioTablet:
          "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
        LenovoTablet:
          "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
        DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
        YarvikTablet:
          "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
        MedionTablet:
          "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
        ArnovaTablet:
          "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
        IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
        IRUTablet: "M702pro",
        MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
        EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
        AllViewTablet:
          "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
        ArchosTablet:
          "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
        AinolTablet:
          "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
        SonyTablet:
          "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
        PhilipsTablet:
          "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
        CubeTablet:
          "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
        CobyTablet:
          "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
        MIDTablet:
          "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
        MSITablet:
          "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
        SMiTTablet:
          "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
        RockChipTablet:
          "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
        FlyTablet: "IQ310|Fly Vision",
        bqTablet:
          "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
        HuaweiTablet:
          "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
        NecTablet: "\\bN-06D|\\bN-08D",
        PantechTablet: "Pantech.*P4100",
        BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
        VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
        ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
        PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
        NabiTablet: "Android.*\\bNabi",
        KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
        DanewTablet:
          "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
        TexetTablet:
          "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
        PlaystationTablet: "Playstation.*(Portable|Vita)",
        TrekstorTablet:
          "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
        PyleAudioTablet:
          "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
        AdvanTablet:
          "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
        DanyTechTablet:
          "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
        GalapadTablet: "Android.*\\bG1\\b",
        MicromaxTablet:
          "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
        KarbonnTablet:
          "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
        AllFineTablet:
          "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
        PROSCANTablet:
          "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
        YONESTablet:
          "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
        ChangJiaTablet:
          "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
        GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
        PointOfViewTablet:
          "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
        OvermaxTablet:
          "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
        HCLTablet:
          "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
        DPSTablet: "DPS Dream 9|DPS Dual 7",
        VistureTablet:
          "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
        CrestaTablet:
          "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
        MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
        ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
        GoCleverTablet:
          "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
        ModecomTablet:
          "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
        VoninoTablet:
          "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
        ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
        StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
        VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",
        EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
        RossMoorTablet:
          "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
        iMobileTablet: "i-mobile i-note",
        TolinoTablet: "tolino tab [0-9.]+|tolino shine",
        AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
        AMPETablet: "Android.* A78 ",
        SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
        TecnoTablet: "TECNO P9",
        JXDTablet:
          "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
        iJoyTablet:
          "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
        FX2Tablet: "FX2 PAD7|FX2 PAD10",
        XoroTablet:
          "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
        ViewsonicTablet:
          "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
        OdysTablet:
          "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
        CaptivaTablet: "CAPTIVA PAD",
        IconbitTablet:
          "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
        TeclastTablet:
          "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
        OndaTablet:
          "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
        JaytechTablet: "TPC-PA762",
        BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
        DigmaTablet:
          "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
        EvolioTablet:
          "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
        LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
        AocTablet: "MW0811|MW0812|MW0922|MTK8382",
        MpmanTablet:
          "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
        CelkonTablet:
          "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
        WolderTablet:
          "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
        MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
        NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
        NexoTablet:
          "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
        LeaderTablet:
          "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
        UbislateTablet: "UbiSlate[\\s]?7C",
        PocketBookTablet: "Pocketbook",
        Hudl: "Hudl HT7S3|Hudl 2",
        TelstraTablet: "T-Hub2",
        GenericTablet:
          "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b",
      },
      oss: {
        AndroidOS: "Android",
        BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
        PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
        SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
        WindowsMobileOS:
          "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
        WindowsPhoneOS:
          "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
        iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
        MeeGoOS: "MeeGo",
        MaemoOS: "Maemo",
        JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
        webOS: "webOS|hpwOS",
        badaOS: "\\bBada\\b",
        BREWOS: "BREW",
      },
      uas: {
        Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
        Dolfin: "\\bDolfin\\b",
        Opera:
          "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
        Skyfire: "Skyfire",
        IE: "IEMobile|MSIEMobile",
        Firefox:
          "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
        Bolt: "bolt",
        TeaShark: "teashark",
        Blazer: "Blazer",
        Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
        Tizen: "Tizen",
        UCBrowser: "UC.*Browser|UCWEB",
        baiduboxapp: "baiduboxapp",
        baidubrowser: "baidubrowser",
        DiigoBrowser: "DiigoBrowser",
        Puffin: "Puffin",
        Mercury: "\\bMercury\\b",
        ObigoBrowser: "Obigo",
        NetFront: "NF-Browser",
        GenericBrowser:
          "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
      },
      props: {
        Mobile: "Mobile/[VER]",
        Build: "Build/[VER]",
        Version: "Version/[VER]",
        VendorID: "VendorID/[VER]",
        iPad: "iPad.*CPU[a-z ]+[VER]",
        iPhone: "iPhone.*CPU[a-z ]+[VER]",
        iPod: "iPod.*CPU[a-z ]+[VER]",
        Kindle: "Kindle/[VER]",
        Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
        Coast: ["Coast/[VER]"],
        Dolfin: "Dolfin/[VER]",
        Firefox: "Firefox/[VER]",
        Fennec: "Fennec/[VER]",
        IE: [
          "IEMobile/[VER];",
          "IEMobile [VER]",
          "MSIE [VER];",
          "Trident/[0-9.]+;.*rv:[VER]",
        ],
        NetFront: "NetFront/[VER]",
        NokiaBrowser: "NokiaBrowser/[VER]",
        Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
        "Opera Mini": "Opera Mini/[VER]",
        "Opera Mobi": "Version/[VER]",
        "UC Browser": "UC Browser[VER]",
        MQQBrowser: "MQQBrowser/[VER]",
        MicroMessenger: "MicroMessenger/[VER]",
        baiduboxapp: "baiduboxapp/[VER]",
        baidubrowser: "baidubrowser/[VER]",
        Iron: "Iron/[VER]",
        Safari: ["Version/[VER]", "Safari/[VER]"],
        Skyfire: "Skyfire/[VER]",
        Tizen: "Tizen/[VER]",
        Webkit: "webkit[ /][VER]",
        Gecko: "Gecko/[VER]",
        Trident: "Trident/[VER]",
        Presto: "Presto/[VER]",
        iOS: " \\bi?OS\\b [VER][ ;]{1}",
        Android: "Android [VER]",
        BlackBerry: [
          "BlackBerry[\\w]+/[VER]",
          "BlackBerry.*Version/[VER]",
          "Version/[VER]",
        ],
        BREW: "BREW [VER]",
        Java: "Java/[VER]",
        "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
        "Windows Phone": "Windows Phone [VER]",
        "Windows CE": "Windows CE/[VER]",
        "Windows NT": "Windows NT [VER]",
        Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
        webOS: ["webOS/[VER]", "hpwOS/[VER];"],
      },
      utils: {
        Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
        MobileBot:
          "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
        DesktopMode: "WPDesktop",
        TV: "SonyDTV|HbbTV",
        WebKit: "(webkit)[ /]([\\w.]+)",
        Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
        Watch: "SM-V700",
      },
    }),
      (i.detectMobileBrowsers = {
        fullPattern:
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        shortPattern:
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        tabletPattern: /android|ipad|playbook|silk/i,
      });
    var s,
      r = Object.prototype.hasOwnProperty;
    return (
      (i.FALLBACK_PHONE = "UnknownPhone"),
      (i.FALLBACK_TABLET = "UnknownTablet"),
      (i.FALLBACK_MOBILE = "UnknownMobile"),
      (s =
        "isArray" in Array
          ? Array.isArray
          : function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            }),
      (function () {
        var e,
          o,
          t,
          a,
          l,
          c,
          d = i.mobileDetectRules;
        for (e in d.props)
          if (r.call(d.props, e)) {
            for (
              o = d.props[e], s(o) || (o = [o]), l = o.length, a = 0;
              l > a;
              ++a
            )
              (t = o[a]),
                (c = t.indexOf("[VER]")),
                c >= 0 &&
                  (t =
                    t.substring(0, c) + "([\\w._\\+]+)" + t.substring(c + 5)),
                (o[a] = new RegExp(t, "i"));
            d.props[e] = o;
          }
        n(d.oss),
          n(d.phones),
          n(d.tablets),
          n(d.uas),
          n(d.utils),
          (d.oss0 = {
            WindowsPhoneOS: d.oss.WindowsPhoneOS,
            WindowsMobileOS: d.oss.WindowsMobileOS,
          });
      })(),
      (i.findMatch = function (e, o) {
        for (var t in e) if (r.call(e, t) && e[t].test(o)) return t;
        return null;
      }),
      (i.findMatches = function (e, o) {
        var t = [];
        for (var n in e) r.call(e, n) && e[n].test(o) && t.push(n);
        return t;
      }),
      (i.getVersionStr = function (e, o) {
        var t,
          n,
          a,
          s,
          l = i.mobileDetectRules.props;
        if (r.call(l, e))
          for (t = l[e], a = t.length, n = 0; a > n; ++n)
            if (((s = t[n].exec(o)), null !== s)) return s[1];
        return null;
      }),
      (i.getVersion = function (e, o) {
        var t = i.getVersionStr(e, o);
        return t ? i.prepareVersionNo(t) : 0 / 0;
      }),
      (i.prepareVersionNo = function (e) {
        var o;
        return (
          (o = e.split(/[a-z._ \/\-]/i)),
          1 === o.length && (e = o[0]),
          o.length > 1 && ((e = o[0] + "."), o.shift(), (e += o.join(""))),
          Number(e)
        );
      }),
      (i.isMobileFallback = function (e) {
        return (
          i.detectMobileBrowsers.fullPattern.test(e) ||
          i.detectMobileBrowsers.shortPattern.test(e.substr(0, 4))
        );
      }),
      (i.isTabletFallback = function (e) {
        return i.detectMobileBrowsers.tabletPattern.test(e);
      }),
      (i.prepareDetectionCache = function (e, t, n) {
        if (e.mobile === o) {
          var s, r, l;
          return (r = i.findMatch(i.mobileDetectRules.tablets, t))
            ? ((e.mobile = e.tablet = r), void (e.phone = null))
            : (s = i.findMatch(i.mobileDetectRules.phones, t))
            ? ((e.mobile = e.phone = s), void (e.tablet = null))
            : void (i.isMobileFallback(t)
                ? ((l = a.isPhoneSized(n)),
                  l === o
                    ? ((e.mobile = i.FALLBACK_MOBILE),
                      (e.tablet = e.phone = null))
                    : l
                    ? ((e.mobile = e.phone = i.FALLBACK_PHONE),
                      (e.tablet = null))
                    : ((e.mobile = e.tablet = i.FALLBACK_TABLET),
                      (e.phone = null)))
                : i.isTabletFallback(t)
                ? ((e.mobile = e.tablet = i.FALLBACK_TABLET), (e.phone = null))
                : (e.mobile = e.tablet = e.phone = null));
        }
      }),
      (i.mobileGrade = function (e) {
        var o = null !== e.mobile();
        return (e.os("iOS") && e.version("iPad") >= 4.3) ||
          (e.os("iOS") && e.version("iPhone") >= 3.1) ||
          (e.os("iOS") && e.version("iPod") >= 3.1) ||
          (e.version("Android") > 2.1 && e.is("Webkit")) ||
          e.version("Windows Phone OS") >= 7 ||
          (e.is("BlackBerry") && e.version("BlackBerry") >= 6) ||
          e.match("Playbook.*Tablet") ||
          (e.version("webOS") >= 1.4 && e.match("Palm|Pre|Pixi")) ||
          e.match("hp.*TouchPad") ||
          (e.is("Firefox") && e.version("Firefox") >= 12) ||
          (e.is("Chrome") && e.is("AndroidOS") && e.version("Android") >= 4) ||
          (e.is("Skyfire") &&
            e.version("Skyfire") >= 4.1 &&
            e.is("AndroidOS") &&
            e.version("Android") >= 2.3) ||
          (e.is("Opera") &&
            e.version("Opera Mobi") > 11 &&
            e.is("AndroidOS")) ||
          e.is("MeeGoOS") ||
          e.is("Tizen") ||
          (e.is("Dolfin") && e.version("Bada") >= 2) ||
          ((e.is("UC Browser") || e.is("Dolfin")) &&
            e.version("Android") >= 2.3) ||
          e.match("Kindle Fire") ||
          (e.is("Kindle") && e.version("Kindle") >= 3) ||
          (e.is("AndroidOS") && e.is("NookTablet")) ||
          (e.version("Chrome") >= 11 && !o) ||
          (e.version("Safari") >= 5 && !o) ||
          (e.version("Firefox") >= 4 && !o) ||
          (e.version("MSIE") >= 7 && !o) ||
          (e.version("Opera") >= 10 && !o)
          ? "A"
          : (e.os("iOS") && e.version("iPad") < 4.3) ||
            (e.os("iOS") && e.version("iPhone") < 3.1) ||
            (e.os("iOS") && e.version("iPod") < 3.1) ||
            (e.is("Blackberry") &&
              e.version("BlackBerry") >= 5 &&
              e.version("BlackBerry") < 6) ||
            (e.version("Opera Mini") >= 5 &&
              e.version("Opera Mini") <= 6.5 &&
              (e.version("Android") >= 2.3 || e.is("iOS"))) ||
            e.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") ||
            (e.version("Opera Mobi") >= 11 && e.is("SymbianOS"))
          ? "B"
          : (e.version("BlackBerry") < 5 ||
              e.match("MSIEMobile|Windows CE.*Mobile") ||
              e.version("Windows Mobile") <= 5.2,
            "C");
      }),
      (i.detectOS = function (e) {
        return (
          i.findMatch(i.mobileDetectRules.oss0, e) ||
          i.findMatch(i.mobileDetectRules.oss, e)
        );
      }),
      (i.getDeviceSmallerSide = function () {
        return window.screen.width < window.screen.height
          ? window.screen.width
          : window.screen.height;
      }),
      (a.prototype = {
        constructor: a,
        mobile: function () {
          return (
            i.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
            this._cache.mobile
          );
        },
        phone: function () {
          return (
            i.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
            this._cache.phone
          );
        },
        tablet: function () {
          return (
            i.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
            this._cache.tablet
          );
        },
        userAgent: function () {
          return (
            this._cache.userAgent === o &&
              (this._cache.userAgent = i.findMatch(
                i.mobileDetectRules.uas,
                this.ua
              )),
            this._cache.userAgent
          );
        },
        userAgents: function () {
          return (
            this._cache.userAgents === o &&
              (this._cache.userAgents = i.findMatches(
                i.mobileDetectRules.uas,
                this.ua
              )),
            this._cache.userAgents
          );
        },
        os: function () {
          return (
            this._cache.os === o && (this._cache.os = i.detectOS(this.ua)),
            this._cache.os
          );
        },
        version: function (e) {
          return i.getVersion(e, this.ua);
        },
        versionStr: function (e) {
          return i.getVersionStr(e, this.ua);
        },
        is: function (o) {
          return (
            t(this.userAgents(), o) ||
            e(o, this.os()) ||
            e(o, this.phone()) ||
            e(o, this.tablet()) ||
            t(i.findMatches(i.mobileDetectRules.utils, this.ua), o)
          );
        },
        match: function (e) {
          return (
            e instanceof RegExp || (e = new RegExp(e, "i")), e.test(this.ua)
          );
        },
        isPhoneSized: function (e) {
          return a.isPhoneSized(e || this.maxPhoneWidth);
        },
        mobileGrade: function () {
          return (
            this._cache.grade === o &&
              (this._cache.grade = i.mobileGrade(this)),
            this._cache.grade
          );
        },
      }),
      (a.isPhoneSized =
        "undefined" != typeof window && window.screen
          ? function (e) {
              return 0 > e ? o : i.getDeviceSmallerSide() <= e;
            }
          : function () {}),
      (a._impl = i),
      a
    );
  });
})(
  (function (e) {
    if ("undefined" != typeof module && module.exports)
      return function (e) {
        module.exports = e();
      };
    if ("function" == typeof define && define.amd) return define;
    if ("undefined" != typeof window)
      return function (e) {
        window.MobileDetect = e();
      };
    throw new Error("unknown environment");
  })()
),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(
          "object" == typeof module && module.exports
            ? require("jquery")
            : jQuery
        );
  })(function (e) {
    function o(o) {
      var t = {},
        n = /^jQuery\d+$/;
      return (
        e.each(o.attributes, function (e, o) {
          o.specified && !n.test(o.name) && (t[o.name] = o.value);
        }),
        t
      );
    }
    function t(o, t) {
      var n = this,
        i = e(this);
      if (
        n.value === i.attr(r ? "placeholder-x" : "placeholder") &&
        i.hasClass(m.customClass)
      )
        if (
          ((n.value = ""),
          i.removeClass(m.customClass),
          i.data("placeholder-password"))
        ) {
          if (
            ((i = i
              .hide()
              .nextAll('input[type="password"]:first')
              .show()
              .attr("id", i.removeAttr("id").data("placeholder-id"))),
            o === !0)
          )
            return (i[0].value = t), t;
          i.focus();
        } else n == a() && n.select();
    }
    function n(n) {
      var a,
        i = this,
        s = e(this),
        l = i.id;
      if (!n || "blur" !== n.type || !s.hasClass(m.customClass))
        if ("" === i.value) {
          if ("password" === i.type) {
            if (!s.data("placeholder-textinput")) {
              try {
                a = s.clone().prop({ type: "text" });
              } catch (c) {
                a = e("<input>").attr(e.extend(o(this), { type: "text" }));
              }
              a
                .removeAttr("name")
                .data({
                  "placeholder-enabled": !0,
                  "placeholder-password": s,
                  "placeholder-id": l,
                })
                .bind("focus.placeholder", t),
                s
                  .data({ "placeholder-textinput": a, "placeholder-id": l })
                  .before(a);
            }
            (i.value = ""),
              (s = s
                .removeAttr("id")
                .hide()
                .prevAll('input[type="text"]:first')
                .attr("id", s.data("placeholder-id"))
                .show());
          } else {
            var d = s.data("placeholder-password");
            d &&
              ((d[0].value = ""),
              s
                .attr("id", s.data("placeholder-id"))
                .show()
                .nextAll('input[type="password"]:last')
                .hide()
                .removeAttr("id"));
          }
          s.addClass(m.customClass),
            (s[0].value = s.attr(r ? "placeholder-x" : "placeholder"));
        } else s.removeClass(m.customClass);
    }
    function a() {
      try {
        return document.activeElement;
      } catch (e) {}
    }
    var i,
      s,
      r = !1,
      l =
        "[object OperaMini]" ===
        Object.prototype.toString.call(window.operamini),
      c = "placeholder" in document.createElement("input") && !l && !r,
      d = "placeholder" in document.createElement("textarea") && !l && !r,
      u = e.valHooks,
      p = e.propHooks,
      m = {};
    c && d
      ? ((s = e.fn.placeholder =
          function () {
            return this;
          }),
        (s.input = !0),
        (s.textarea = !0))
      : ((s = e.fn.placeholder =
          function (o) {
            var a = { customClass: "placeholder" };
            return (
              (m = e.extend({}, a, o)),
              this.filter(
                (c ? "textarea" : ":input") +
                  "[" +
                  (r ? "placeholder-x" : "placeholder") +
                  "]"
              )
                .not("." + m.customClass)
                .not(":radio, :checkbox, [type=hidden]")
                .bind({ "focus.placeholder": t, "blur.placeholder": n })
                .data("placeholder-enabled", !0)
                .trigger("blur.placeholder")
            );
          }),
        (s.input = c),
        (s.textarea = d),
        (i = {
          get: function (o) {
            var t = e(o),
              n = t.data("placeholder-password");
            return n
              ? n[0].value
              : t.data("placeholder-enabled") && t.hasClass(m.customClass)
              ? ""
              : o.value;
          },
          set: function (o, i) {
            var s,
              r,
              l = e(o);
            return (
              "" !== i &&
                ((s = l.data("placeholder-textinput")),
                (r = l.data("placeholder-password")),
                s
                  ? (t.call(s[0], !0, i) || (o.value = i), (s[0].value = i))
                  : r && (t.call(o, !0, i) || (r[0].value = i), (o.value = i))),
              l.data("placeholder-enabled")
                ? ("" === i
                    ? ((o.value = i), o != a() && n.call(o))
                    : (l.hasClass(m.customClass) && t.call(o), (o.value = i)),
                  l)
                : ((o.value = i), l)
            );
          },
        }),
        c || ((u.input = i), (p.value = i)),
        d || ((u.textarea = i), (p.value = i)),
        e(function () {
          e(document).delegate("form", "submit.placeholder", function () {
            var o = e("." + m.customClass, this).each(function () {
              t.call(this, !0, "");
            });
            setTimeout(function () {
              o.each(n);
            }, 10);
          });
        }),
        e(window).bind("beforeunload.placeholder", function () {
          var o = !0;
          try {
            "javascript:void(0)" === document.activeElement.toString() &&
              (o = !1);
          } catch (t) {}
          o &&
            e("." + m.customClass).each(function () {
              this.value = "";
            });
        }));
  }),
  (function () {
    if (window.matchMedia && window.matchMedia("all").addListener) return !1;
    var e = window.matchMedia,
      o = e("only all").matches,
      t = !1,
      n = 0,
      a = [],
      i = function (o) {
        clearTimeout(n),
          (n = setTimeout(function () {
            for (var o = 0, t = a.length; t > o; o++) {
              var n = a[o].mql,
                i = a[o].listeners || [],
                s = e(n.media).matches;
              if (s !== n.matches) {
                n.matches = s;
                for (var r = 0, l = i.length; l > r; r++) i[r].call(window, n);
              }
            }
          }, 30));
      };
    window.matchMedia = function (n) {
      var s = e(n),
        r = [],
        l = 0;
      return (
        (s.addListener = function (e) {
          o &&
            (t || ((t = !0), window.addEventListener("resize", i, !0)),
            0 === l && (l = a.push({ mql: s, listeners: r })),
            r.push(e));
        }),
        (s.removeListener = function (e) {
          for (var o = 0, t = r.length; t > o; o++)
            r[o] === e && r.splice(o, 1);
        }),
        s
      );
    };
  })(),
  window.matchMedia ||
    (window.matchMedia = (function () {
      "use strict";
      var e = window.styleMedia || window.media;
      if (!e) {
        var o = document.createElement("style"),
          t = document.getElementsByTagName("script")[0],
          n = null;
        (o.type = "text/css"),
          (o.id = "matchmediajs-test"),
          t.parentNode.insertBefore(o, t),
          (n =
            ("getComputedStyle" in window &&
              window.getComputedStyle(o, null)) ||
            o.currentStyle),
          (e = {
            matchMedium: function (e) {
              var t = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
              return (
                o.styleSheet ? (o.styleSheet.cssText = t) : (o.textContent = t),
                "1px" === n.width
              );
            },
          });
      }
      return function (o) {
        return { matches: e.matchMedium(o || "all"), media: o || "all" };
      };
    })()),
  (function (e, o, t) {
    "use strict";
    (t.fn.typeAhead3 = function (o) {
      function n() {
        t.cookie(i.b2b ? "searchHistB2B" : "searchHist", "", {
          expires: -1e4,
          path: "/",
        });
      }
      function a() {
        _.on("mouseover", function () {
          "" == d.val()
            ? t(".searchHist").slideDown(300)
            : t(".searchHist").slideUp(300);
        }),
          t("#headerSearch")
            .keyup(function () {
              t(this).val().length >= 1 &&
                Modernizr.mq("(min-width: 980px)") &&
                (y.show().css("display", "inline-block"),
                t(this).parent().find(y).css("width", g.width()),
                i.b2b &&
                  Modernizr.mq("(max-width: 1024px)") &&
                  t(this).parent().find(y).css("width", "100%")),
                t(".searchSuggestions .suggestion").on(
                  "mouseover",
                  function () {
                    "" == C.html()
                      ? C.hide()
                      : (t(this).parent().css("display", "inline-block"),
                        Modernizr.mq("(min-width: 980px)") && C.show());
                  }
                );
            })
            .on("focus", function () {
              h = !0;
            });
      }
      var i = t.extend({}, t.fn.typeAhead3.defaults, o),
        s = e.location.href,
        r = s.split("/"),
        l = r[0] + "//" + r[2],
        c = l + "/us/search/global/es/typeahead?searchTerm=",
        d = t("#headerSearch, #fluidSearch, #mobileSearch"),
        u = i.typeAheadFl,
        p =
          (i.b2b ? "B2BFamilyID" : "FamilyID",
          i.b2b ? "/business" : "",
          i.b2b ? "Y" : "N"),
        m = l + "/us/search/autoComplete.us?b2b=" + p + "&pageType=&keyword=",
        g = t("#desktop_search_form"),
        T = t(".searchHist"),
        h = (t(".clear-button"), !1),
        b =
          '<div class="typeahead"><div class="searchProducts"></div><div class="searchSuggestions"></div></div>',
        S = t(".gnb-b2c-search-results-container");
      S.append(b);
      var _ = t(".gnb-b2c-icons-search"),
        f = t(".typeahead"),
        y = t(".searchSuggestions"),
        C = t(".searchProducts"),
        v = function () {
          t(".gnb-b2c-searchoverlay").append(
            (B(), '<div class="searchHist"></div>')
          );
          var e = t.cookie(i.b2b ? "searchHistB2B" : "searchHist");
          if (null != e) {
            for (
              var o = e.split(","),
                s =
                  '<div id="searchHist" class="searchHist"><div class="historyTitle">Search History <div class="clear-button" data-link_id="search_predictive_clear" data-link_meta="link_name:clear history" data-link_position="search flyout" data-link_cat="clear history">CLEAR HISTORY</div></div>',
                r = 0;
              r < o.length;
              r++
            ) {
              var l = A(o[r]);
              s +=
                '<span class="ta-history" data-search_category="predictive>history" data-search_term="' +
                l +
                '" data-search_location="internal search" data-search_type="predictive>history">' +
                l +
                "</span>";
            }
            (s += "</div>"),
              t(".ta-history").click(function () {
                d.val(t(this).text()), t("#desktop_search_form").submit();
              });
            var c = setInterval(function () {
              t(".searchHist").replaceWith(s),
                (T = t("#desktop_search_form .searchHist")),
                t(g).find(T).css("width", g.width()),
                t(".ta-history").click(function () {
                  d.val(t(this).text()), t("#desktop_search_form").submit();
                }),
                clearInterval(c),
                t(".searchHist .clear-button").on("click", function () {
                  n(), v();
                });
            }, 500);
            a();
          } else t(".searchHist").remove();
        },
        P = function (e) {
          var o = t.cookie(i.b2b ? "searchHistB2B" : "searchHist");
          if (null != e && "" != e)
            if (null != o) {
              for (var n = o.split(","), a = !1, s = 0; s < n.length; s++)
                n[s].toString() === e && (a = !0);
              if (0 == a) {
                var r = [e];
                n.length > 3
                  ? (n.splice(3, 4), r.push.apply(r, n))
                  : r.push.apply(r, n),
                  t.cookie(i.b2b ? "searchHistB2B" : "searchHist", r.join(), {
                    expires: 12,
                    path: "/",
                  });
              }
            } else
              t.cookie(i.b2b ? "searchHistB2B" : "searchHist", e, {
                expires: 12,
                path: "/",
              });
        },
        A = function (e) {
          return String(e)
            .replace(/<script>/g, "")
            .replace(/<\/script>/g, "")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        },
        w = function (e, o) {
          var t = "",
            n = 0,
            a = "",
            s = "",
            r = (i.b2b ? "/business" : "", []);
          if (-1 != Object.keys(e).indexOf("ShopIn")) {
            var l = e.ShopIn;
            for (var c in l)
              "ShopKeyword" == c && (a = l[c]), "LinkUrl" == c && (s = l[c]);
            (t +=
              '<div class="shop-in" data-id="ta-' +
              H(Object.keys(l).toString()).replace(/[\W_]+/g, "-") +
              '"><a href="' +
              s +
              '" data-search_category="predictive>general" data-search_term="' +
              a +
              '" data-search_location="internal search" data-search_type="predictive>general">' +
              M(a) +
              "</a></div>"),
              n++;
          }
          if (-1 != Object.keys(e).indexOf("Categories"))
            for (var d = e.Categories.Category, u = 0; u < d.length; u++)
              for (var c in d[u]) r.push(Object.keys(d[u]).toString());
          if (-1 != Object.keys(e).indexOf("SearchIn")) {
            var p = e.SearchIn;
            for (var m in p)
              for (var u = 0; u < r.length; u++) {
                var g = "";
                u == r.length - 1 && (g = " last"),
                  (t +=
                    '<div class="search-in' +
                    g +
                    '"><a href="/us/search/searchMain?' +
                    p[m] +
                    '" data-search_category="predictive>general" data-search_term="' +
                    r[u] +
                    '" data-search_location="internal search" data-search_type="predictive>general">' +
                    k(r[u], o) +
                    ' in <span class="blue">' +
                    m +
                    "</span></a></div>"),
                  n++;
              }
            t += '<div class="spacer"></div>';
          }
          if (-1 != Object.keys(e).indexOf("Suggestions")) {
            var T = e.Suggestions.Suggestion;
            if (null != T)
              for (var u = 0; u < T.length && (!B() || 10 != n); u++) {
                var h = H(T[u]);
                (t +=
                  '<div class="suggestion" data-search_category="predictive>general" data-search_term="' +
                  H(T[u]) +
                  '" data-search_location="internal search" data-search_type="predictive>general" data-id="ta-' +
                  H(h).replace(/[\W_]+/g, "-") +
                  '">' +
                  k(H(T[u]), o) +
                  "</div>"),
                  n++;
              }
          }
          return (
            0 == n && (t += '<p class="ta-none" data-id="">No Suggestions</p>'),
            t
          );
        },
        G = function (e, o) {
          var t = "";
          if ((u = Object.keys(e).indexOf("Recommend") < 0 ? !1 : !0)) {
            var n = e.Recommend;
            if ("false" != n) {
              for (var a in n)
                for (var s in n[a])
                  if (Object.keys(n[a][s]).length > 0) {
                    var r = n[a];
                    t +=
                      '<div id="ta-' +
                      a.replace(/[\W_]+/g, "-") +
                      '" class="searchProduct"><div class="recommendedTitle">Recommended Results for <span><strong>&quot;' +
                      a +
                      "&quot;</strong></span></div>";
                    for (var l in r[s]) {
                      var c = r[s][l][0],
                        d = i.b2b ? c["B2B.LinkUrl"] : c.LinkUrl,
                        p =
                          void 0 != c["Support.LinkUrl"]
                            ? c["Support.LinkUrl"]
                            : "";
                      void 0 == d && (d = c["B2B.LinkUrl"]);
                      var m = (Math.round(2 * c.Ratings_display) / 2).toFixed(
                          1
                        ),
                        g = (1 * c.Ratings_display).toFixed(1),
                        T = "stars_" + m.toString().replace(".", "_"),
                        h = c.MediumImage;
                      (h =
                        "undefined" != typeof h
                          ? h.toString().split("|")[0]
                          : ""),
                        (t +=
                          '<div class="recItem"><table><tr><td><a href="' +
                          d +
                          '" data-search_category="predictive>' +
                          c.ModelCode +
                          '>product image" data-search_term="' +
                          a +
                          '" data-search_location="internal search" data-search_type="predictive>' +
                          c.ModelCode +
                          '>product image"><img src="' +
                          h +
                          '"/></a></td><td><div class="ta-recommended"><a href="' +
                          d +
                          '" data-search_category="predictive>' +
                          c.ModelCode +
                          '>product text" data-search_term="' +
                          a +
                          '" data-search_location="internal search" data-search_type="predictive>' +
                          c.ModelCode +
                          '>product text">' +
                          l +
                          "</a></div>"),
                        (t +=
                          c.ReviewsCount > 0
                            ? '<div class="rating"><span class="stars ' +
                              T +
                              '">' +
                              m +
                              '</span><a href="' +
                              d +
                              '/#reviews" data-search_category="predictive>' +
                              c.ModelCode +
                              '>product review" data-search_term="' +
                              a +
                              '" data-search_location="internal search" data-search_type="predictive>' +
                              c.ModelCode +
                              '>product review">' +
                              g +
                              " (" +
                              c.ReviewsCount +
                              ")</a></div>"
                            : '<div class="rating"><a href="' +
                              d +
                              '/#reviews" data-search_category="predictive>' +
                              c.ModelCode +
                              '>product review" data-search_term="' +
                              a +
                              '" data-search_location="internal search" data-search_type="predictive>' +
                              c.ModelCode +
                              '>product review">Be the first to write a review</a></div>'),
                        (t +=
                          '<div class="supportLinks"><a href="' +
                          p +
                          '#manuals" data-search_category="predictive>' +
                          c.ModelCode +
                          '>product manual" data-search_term="' +
                          a +
                          '" data-search_location="internal search" data-search_type="predictive>' +
                          c.ModelCode +
                          '>product manual">Owners Manual<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/us/resources/navigation/assets/images/sprite.symbol.svg#angle-right"></use></svg></a><a href="' +
                          p +
                          '" data-search_category="predictive>' +
                          c.ModelCode +
                          '>product support" data-search_term="' +
                          a +
                          '" data-search_location="internal search" data-search_type="predictive>' +
                          c.ModelCode +
                          '>product support">Support<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/us/resources/navigation/assets/images/sprite.symbol.svg#angle-right"></use></svg></a><a class="registerDevice" href="/us/support/register/" data-search_category="predictive>' +
                          c.ModelCode +
                          '>product register" data-search_term="' +
                          a +
                          '" data-search_location="internal search" data-search_type="predictive>' +
                          c.ModelCode +
                          '>product register">Register<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/us/resources/navigation/assets/images/sprite.symbol.svg#angle-right"></use></svg></a></div></td></tr></table></div>');
                    }
                    t += "</div>";
                  }
            } else u = !1;
          }
          if (!u && e.length > 0) {
            t =
              '<div id="ta-' +
              o.replace(/[\W_]+/g, "-") +
              '" class="searchProduct"><div id="ta-recommended" class="recommendedTitle searchProduct">Recommended Results for <span><strong>&quot;' +
              o +
              "&quot;</strong></span></div>";
            for (var b = 0; b < e.length; b++)
              if ("recommand" == e[b].type) {
                var m = (Math.round(2 * e[b].ratingsDisplay) / 2).toFixed(1),
                  g = (1 * e[b].ratingsDisplay).toFixed(1),
                  T = "stars_" + m.toString().replace(".", "_");
                (t +=
                  '<div class="recItem"><table border=0><tr><td><a href="' +
                  e[b].linkUrl +
                  '"><img src="' +
                  e[b].imgUrl +
                  '"/></a></td><td><div class="ta-recommended"><a href="' +
                  e[b].linkUrl +
                  '">' +
                  e[b].title +
                  "</a></div>"),
                  (t +=
                    e[b].reviewsCount > 0
                      ? '<div class="rating"><span class="stars ' +
                        T +
                        '">' +
                        m +
                        '</span><a href="' +
                        e[b].linkUrl +
                        '#reviews">' +
                        g +
                        " (" +
                        e[b].reviewsCount +
                        ")</a></div>"
                      : '<div class="rating"><a href="' +
                        e[b].linkUrl +
                        '#reviews">Be the first to write a review</a></div>'),
                  (t +=
                    '<div class="supportLinks"><a href="/us/support/owners/product/' +
                    e[b].prdMdlCd +
                    '#manuals"><img src="/us/support/images/icon-owners-manual.png">Owners Manual</a><a href="/us/support/owners/product/' +
                    e[b].prdMdlCd +
                    '"><img src="/us/support/images/icon-support.png">Support</a><a class="registerDevice" href="/us/support/register/"><img src="/us/images/support/iconCollapsed.png">Register</a></div></td></tr></table></div>');
              }
            t += "</div>";
          }
          return t;
        },
        M = function (e) {
          return e.replace(/\w\S*/g, function (e) {
            return e.charAt(0).toUpperCase() + e.substr(1);
          });
        },
        k = function (e, o) {
          if (e.toLowerCase().indexOf(o.toLowerCase()) > -1) {
            var t = "<strong>",
              n = "</strong>",
              a = e.toLowerCase().indexOf(o.toLowerCase());
            e = e.splice(a, 0, t);
            var i = e.toLowerCase().indexOf(o.toLowerCase()) + o.length;
            e = e.splice(i, 0, n);
          }
          return e;
        },
        H = function (e) {
          return e
            .replace(/<endeca_term>/g, "")
            .replace(/<\/endeca_term>/g, "");
        },
        B = function () {
          return "mobile" == t("meta[device]").attr("device") ||
            e.innerWidth < 769
            ? !0
            : !1;
        },
        I = function (e) {
          f.show(),
            t(g).find(y).css("width", g.width()),
            (y = t(".searchSuggestions")),
            t(".gnb-b2c-searchoverlay").addClass(
              "gnb-b2c-searchoverlay-with-results"
            ),
            t(y, g).one("mouseover", function () {
              g.find(y).css("width", g.width());
            }),
            t(
              ".searchSuggestions>.suggestion:not(.shop-in,.search-in), .autoSuggest"
            )
              .on("mouseover", function (e) {
                e.preventDefault(),
                  C.children().hide(),
                  B() || "" == C.html()
                    ? C.hide()
                    : (t(this)
                        .parents()
                        .find("#headerSearch")
                        .val(t(this).text()),
                      t(this)
                        .parent()
                        .parent()
                        .find(".searchProducts")
                        .show()
                        .css("display", "inline-block"),
                      t(this)
                        .parent()
                        .parent()
                        .find(".searchProducts #" + t(this).attr("data-id"))
                        .show());
              })
              .on("mouseout", function () {
                "" != C.html() &&
                  (t(this).parents().find("#headerSearch").val(e),
                  t(C, ">div:first-child").show());
              }),
            B()
              ? (S.show(), t(".searchSuggestions").show())
              : (t(".searchProduct").hide(),
                S.show(),
                t(".searchProducts, .searchSuggestions")
                  .show()
                  .css("display", "inline-block"),
                "" == C.html()
                  ? C.hide()
                  : (t(
                      "#" +
                        t("#desktop_search_form .suggestion:first").data("id"),
                      g
                    ).show(),
                    t("#" + t(".suggestion:first", S).data("id"), S).show(),
                    t(".shop-in, .search-in").on("mouseover", function () {
                      t(".searchProduct").hide(),
                        C.show().css("display", "inline-block"),
                        t(
                          "#" +
                            t("#desktop_search_form .suggestion:first").data(
                              "id"
                            ),
                          g
                        ).show(),
                        t("#" + t(".suggestion:first", S).data("id"), S).show();
                    }))),
            t(".suggestion").click(function (e) {
              d.val(t(this).text()), d.closest("form.search-form").submit();
            }),
            t(".recItem a").click(function () {
              P(
                t(this)
                  .parents(".searchProduct")
                  .find(".recommendedTitle span")
                  .text()
                  .replace(/"/g, "")
              );
            });
        },
        E = function () {
          var e,
            o = d.attr("data-link_meta") + ">";
          t(".gnb-b2c-btn-close").on("click", function () {
            y.empty(), C.empty();
          }),
            d.on("keyup", function (n) {
              e && e.abort();
              var a = t(this).val().trim();
              a.length > 1
                ? (t(this).next("button").removeAttr("disabled"),
                  "none" != t(".searchHist").css("display") &&
                    t(".searchHist").hide(),
                  (e = t.ajax({
                    url: c + encodeURIComponent(a),
                    type: "GET",
                    success: function (e) {
                      0 == y.size()
                        ? (y.append(w(e, a)), B() || C.append(G(e, a)))
                        : (y.html(w(e, a)), B() || C.html(G(e, a))),
                        I(a),
                        u ||
                          B() ||
                          t(".suggestion").one("mouseover", function (e) {
                            var o = t(this).text(),
                              n = t("#ta-" + o.replace(/\s/g, "-"));
                            0 == n.size() &&
                              t.ajax({
                                url: m + o,
                                type: "GET",
                                success: function (e) {
                                  C.append(G(e, o)), I(o);
                                },
                              });
                          });
                    },
                  })),
                  t(this).attr("data-link_meta", o + a))
                : (t(this).next("button").attr("disabled", "true"),
                  f.children().hide(),
                  t(".searchHist").size() > 0
                    ? "none" == t(".searchHist").css("display") &&
                      t(".searchHist").slideDown()
                    : t(".searchHist").slideUp(300));
            }),
            d.closest("form").on("submit", function () {
              var e = d.val().trim();
              "undefined" != typeof utag &&
                utag.link({
                  link_cat: "Predictive Search",
                  link_id: "search_term:" + e,
                  link_meta: "link_name: Click" + e,
                  link_position: "Predictive Search",
                  search_selected_position: "-1:-1",
                  seExp: "es",
                  page_type: "b2c|search results",
                }),
                P(t(this).find(d).val());
            });
        };
      return { init: E(), setHist: v() };
    }),
      (t.fn.typeAhead3.defaults = { typeAheadFl: !0, b2b: !1 }),
      t(function () {
        var e = t("form.search-form"),
          o =
            (t("form.search-form:first").attr("action"),
            t(".footer-search .search-form")),
          n = t(".search", o);
        n.on("keyup", function () {
          t(this).val().length > 1
            ? t(".icons-search-gray", o).removeAttr("disabled")
            : t(".icons-search-gray", o).attr("disabled", "disabled");
        }),
          e.find(".icons-search-gray").attr("disabled", "disabled");
        var a = t(".gnb-b2c #headerSearch");
        a.length && a.typeAhead3();
      });
  })(window, document, $),
  $("#desktop_search_form, .footer-search .search-form").on(
    "submit",
    function (e) {
      $("input[type='text']:last", this).val().length < 2 && e.preventDefault();
    }
  ),
  (String.prototype.splice = function (e, o, t) {
    return this.slice(0, e) + t + this.slice(e + Math.abs(o));
  }),
  !(function (e, o) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return (e.svg4everybody = o());
        })
      : "object" == typeof exports
      ? (module.exports = o())
      : (e.svg4everybody = o());
  })(this, function () {
    function e(e, o) {
      if (o) {
        var t = document.createDocumentFragment(),
          n = !e.getAttribute("viewBox") && o.getAttribute("viewBox");
        n && e.setAttribute("viewBox", n);
        for (var a = o.cloneNode(!0); a.childNodes.length; )
          t.appendChild(a.firstChild);
        e.appendChild(t);
      }
    }
    function o(o) {
      (o.onreadystatechange = function () {
        if (4 === o.readyState) {
          var t = o._cachedDocument;
          t ||
            ((t = o._cachedDocument =
              document.implementation.createHTMLDocument("")),
            (t.body.innerHTML = o.responseText),
            (o._cachedTarget = {})),
            o._embeds.splice(0).map(function (n) {
              var a = o._cachedTarget[n.id];
              a || (a = o._cachedTarget[n.id] = t.getElementById(n.id)),
                e(n.svg, a);
            });
        }
      }),
        o.onreadystatechange();
    }
    function t(t) {
      function n() {
        for (var t = 0; t < u.length; ) {
          var s = u[t],
            r = s.parentNode;
          if (r && /svg/i.test(r.nodeName)) {
            var l = s.getAttribute("xlink:href");
            if (a && (!i.validate || i.validate(l, r, s))) {
              r.removeChild(s);
              var p = l.split("#"),
                m = p.shift(),
                g = p.join("#");
              if (m.length) {
                var T = c[m];
                T ||
                  ((T = c[m] = new XMLHttpRequest()),
                  T.open("GET", m),
                  T.send(),
                  (T._embeds = [])),
                  T._embeds.push({ svg: r, id: g }),
                  o(T);
              } else e(r, document.getElementById(g));
            }
          } else ++t;
        }
        d(n, 67);
      }
      var a,
        i = Object(t),
        s = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        r = /\bAppleWebKit\/(\d+)\b/,
        l = /\bEdge\/12\.(\d+)\b/;
      a =
        "polyfill" in i
          ? i.polyfill
          : s.test(navigator.userAgent) ||
            (navigator.userAgent.match(l) || [])[1] < 10547 ||
            (navigator.userAgent.match(r) || [])[1] < 537;
      var c = {},
        d = window.requestAnimationFrame || setTimeout,
        u = document.getElementsByTagName("use");
      a && n();
    }
    return t;
  });
var poptag = !1,
  p = location.search,
  t = "",
  ct = 0;
if (
  "" != p &&
  (p.indexOf("?redir=") > -1
    ? (t = p.substr(p.indexOf("?redir=") + 7))
    : p.indexOf("&redir=") > -1 && (t = p.substr(p.indexOf("&redir=") + 7)),
  "" != t)
)
  var checkRedir = setInterval(function () {
    "undefined" != typeof utag
      ? (utag.link({
          search_category: "internal search",
          search_term: t,
          search_location: "internal search",
          search_type: "redirect",
        }),
        clearInterval(checkRedir))
      : ct >= 20
      ? clearInterval(checkRedir)
      : ct++;
  }, 500);
$(function () {
  $(".irNotice").click(function (e) {
    e.preventDefault(), $("#ir_overlay").fadeIn();
  }),
    $("#ir_overlay .cancel,#ir_overlay .cta-button.continue").click(
      function () {
        $("#ir_overlay").fadeOut();
      }
    ),
    $("#printer-exit .cancel,#printer-exit .cta-button.continue").click(
      function () {
        $("#printer-exit").fadeOut();
      }
    );
});
var saLogin = 0;
(window.forceHAShow = "active"),
  $("body").append('<div id="configurator-s7-preSelect"></div>'),
  $(document).ready(function () {
    if (Cookies("xsdcxyn"))
      for (
        var e = 0;
        e < $('li a[href$="/us/support/account/order/#/order-lookup"]').length;
        e++
      )
        $('li a[href$="/us/support/account/order/#/order-lookup"]').attr(
          "href",
          "/us/support/account/order/"
        );
    $(document).on(
      "GNBInitialized onLogInComplete  onSignUpComplete",
      function () {
        if (Cookies("xsdcxyn"))
          for (
            var e = 0;
            e <
            $('li a[href$="/us/support/account/order/#/order-lookup"]').length;
            e++
          )
            $('li a[href$="/us/support/account/order/#/order-lookup"]').attr(
              "href",
              "/us/support/account/order/"
            );
      }
    ),
      hostName(),
      $(document).on("click", ".logoutSMG", function (e) {
        e.preventDefault();
        var o =
            window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
            window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
              ? "https://sso-us.samsung.com"
              : "https://sso-stg.us.samsung.com",
          t =
            window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
            window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
              ? "https://account.samsung.com/accounts/v1/samsung_com_us/signOutGate"
              : "https://stg-account.samsung.com/accounts/v1/samsung_com_us/signOutGate",
          n = btoa(window.location.href);

        window.location.href =
          t +
          "?client_id=kv5di1wr19&signOutURL=" +
          o +
          "/sso/sa/auth&state=" +
          n;
      }),
      window.location.pathname.match("/us/support/account$") ||
        window.location.pathname.match("/us/support/account/$") ||
        $(document).trigger("initLogin"),
      "undefined" == typeof getCookie("tppid")
        ? $(".eppFaq").remove()
        : $(".eppFaq").show();
    var o = /^\/us\/checkout\//.test(window.location.pathname),
      t = $(".gnb-login-container__group-image"),
      n = $(".gnb-login-container .sign-in-phase"),
      a = $(".gnb-login-container .sign-up-phase");
    o &&
      ($(".gnb-login-inner__left__title", n).text(
        "Please log into your Samsung account"
      ),
      $(".gnb-login-inner__left__subtitle", n).text(""),
      $(".gnb-login-inner__left__title--signup", a).text(
        "Get the products you love now and pay over time."
      ),
      $(".gnb-login-inner__left__subtitle", a).text(
        "Create a Samsung account to gain access to exclusive offers, world-class customer support and to apply for special financing to pay for your purchases over time."
      ),
      $(".gnb-login-inner__left__link a", n).text(
        "Create your Samsung account now"
      ),
      t.show());
    var i = getCookie("xsdcxyn");
    (null == i || "" == i) &&
      (deleteCookie("SSO_SESSIONID", "/", ".samsung.com"),
      deleteCookie("SSO_TOKEN", "/", ".samsung.com")),
      $(
        "nav a[href*='/us/computing/printers'],footer a[href*='/us/computing/printers'],footer a[href*='/us/computing/computing-accessories/printers']"
      ).on("click", function (e) {
        e.preventDefault(), $("#printer-exit").fadeIn();
      });
  }),
  (window.callbackLogout = function (e) {}),
  window.location.href.indexOf("all-deals") > -1 &&
    window.Cookies.get("xsdcxyn") &&
    $.removeCookie("teppaccess", { domain: ".samsung.com" }),
  $(function () {
    function e() {
      $(".span12 .column>h6").click(function () {
        o(),
          "none" == $(this).next("ul").css("display") &&
            ($(this).next("ul").slideToggle(),
            $("i", this).hasClass("inverted") ||
              $("i", this).addClass("inverted"));
      }),
        $(".footer-store>h6").click(function () {
          o(),
            "none" == $(this).next("div").css("display") &&
              ($(this).next("div").slideToggle(),
              $("i", this).hasClass("inverted") ||
                $("i", this).addClass("inverted"));
        }),
        $(".footer-store .span6>h6").click(function () {
          t(),
            "none" == $(this).next("ul").css("display") &&
              ($(this).next("ul").slideToggle(),
              $("i", this).hasClass("inverted") ||
                $("i", this).addClass("inverted"));
        }),
        o();
    }
    function o() {
      t(),
        $(".span12 .column>h6>i, .footer-store>h6>i").removeClass("inverted"),
        $(".span12 .column>ul, .footer-store-body")
          .not($(">ul", this))
          .slideUp();
    }
    function t() {
      $(".footer-store .span6>h6>i").removeClass("inverted"),
        $(".footer-store .span6>ul").not($(">ul", this)).slideUp();
    }
    function n() {
      $(".footer-store-body, .footer-store-body ul, .span12 .column ul").show();
    }
    if (
      window.location.href.indexOf("/us/support/account") > -1 &&
      !window.Cookies.get("xsdcxyn") &&
      window.Cookies.get("taccessrtype") &&
      "EmailDomain" == window.Cookies.get("taccessrtype")
    )
      setCookie(
        "targetUrl",
        document.location.protocol +
          "//" +
          document.domain +
          "/us/shop/all-deals/",
        0,
        "/",
        "samsung.com",
        ""
      );
    else if ("prc" == window.Cookies.get("fromPage")) {
      var a = window.location.href.split("/us")[0];
      setCookie(
        "targetUrl",
        a + "/us/support/account",
        0,
        "/",
        "samsung.com",
        ""
      );
    } else if (window.location.href.indexOf("marsLinkCategory") > -1)
      setCookie("targetUrl", window.location.href, 0, "/", "samsung.com", "");
    else {
      var i = document.referrer;
      if (
        i &&
        endsWith(i, "/us/mobile/phones/upgrade/") &&
        null != window.Cookies.get("sUPurl")
      ) {
        if (
          (setCookie(
            "targetUrl",
            window.location.origin + window.Cookies.get("sUPurl"),
            0,
            "/",
            "samsung.com",
            ""
          ),
          $("#support_iframe").attr("src"))
        ) {
          var s = $("#support_iframe")
            .attr("src")
            .split("/sso/secure/urlAction?targetUrl=")[0];
          s && $("#support_iframe").attr("src", s + "/sso/secure/urlAction");
        }
      } else if (
        (!i ||
        i.indexOf("/us/support/account") > -1 ||
        "http://sso-us.samsung.com/sso/logout?url=http://www.samsung.com/us/support/account/" ==
          i
          ? setCookie(
              "targetUrl",
              document.location.protocol +
                "//" +
                document.domain +
                "/us/support/account",
              0,
              "/",
              "samsung.com",
              ""
            )
          : ("/" == i.slice(-1) && (i = i.slice(0, -1)),
            i.indexOf("//www") > -1 &&
              -1 == i.indexOf("https") &&
              (i = i.replace("http", "https")),
            setCookie("targetUrl", i, 0, "/", "samsung.com", "")),
        $("#support_iframe").attr("src"))
      ) {
        var s = $("#support_iframe")
            .attr("src")
            .split("/sso/secure/urlAction?targetUrl=")[0],
          r = $("#support_iframe")
            .attr("src")
            .split("/sso/secure/urlAction?targetUrl=http://")[1];
        s &&
          r &&
          $("#support_iframe").attr(
            "src",
            s + "/sso/secure/urlAction?targetUrl=https://" + r
          );
      }
    }
    "DEALER" == window.Cookies.get("STA_USER_TYPE") &&
      $(".account .dropdown>ul>li>a").attr(
        "href",
        "http://support-us.samsung.com/stacyber/b2b/review_20/sta_b2b_index.jsp"
      ),
      $(window).on("load", function () {
        $(".span12 .column>h6,.footer-store>h6,.footer-store .span6>h6").unbind(
          "click"
        ),
          window.matchMedia("(min-width: 768px)").matches ? n() : e();
      }),
      (window.footerIsDesktop = $(window).innerWidth() > 768),
      $(window).on("resize", function (o) {
        var t = $(window).innerWidth() > 768;
        window.footerIsDesktop ^ t &&
          ((window.footerIsDesktop = t),
          $(
            ".span12 .column>h6,.footer-store>h6,.footer-store .span6>h6"
          ).unbind("click"),
          window.matchMedia("(min-width: 768px)").matches ? n() : e());
      }),
      void 0 != window.Cookies.get("spromoClose")
        ? $("#gnb-promo-wrapper").removeClass("gnb-active-promo-").hide()
        : $("#gnb-promo-wrapper").addClass("gnb-active-promo-"),
      $(".gnb-promo-close").click(function () {
        var e = $(".gnb-promo-text").text(),
          o = $(".gnb-promo-text a").text();
        utag.link({
          link_cat: "close",
          link_id: "gnb_extender_close",
          link_meta: "link_name: close",
          link_position: "gnb_extender > " + e + " > " + o,
        }),
          $("#gnb-promo-wrapper").removeClass("gnb-active-promo-").slideUp(),
          window.Cookies.get("spromoClose", "closed", {
            domain: ".samsung.com",
            path: "/",
          });
      });
  });
var hideSamsungAppOverlay = function () {
    window.location.href.indexOf("/us/checkout") >= 0 &&
      ($("#spop-overlay").length > 0 && $("#spop-overlay").hide(),
      $("#spop-overlay2").length > 0 && $("#spop-overlay2").hide());
  },
  checkIfUserClosedTag = function () {
    !getCookie("xsdcxyn") &&
      getCookie("prof_id") &&
      (deleteCookie("prof_id", "/", ".samsung.com"),
      dropCookiesHistory(),
      window.location.reload());
  };
hideSamsungAppOverlay(),
  $(window).on("load", function () {
    function e(e) {
      for (
        var o = e + "=",
          t = decodeURIComponent(document.cookie),
          n = t.split(";"),
          a = 0;
        a < n.length;
        a++
      ) {
        for (var i = n[a]; " " == i.charAt(0); ) i = i.substring(1);
        if (0 == i.indexOf(o)) return i.substring(o.length, i.length);
      }
      return "";
    }
    "prc" == e("fromPage") &&
      location.href.indexOf("/us/support/account") > -1 &&
      deleteCookie("fromPage", "/", ".samsung.com"),
      checkIfUserClosedTag(),
      "es" === e("seExp")
        ? ($("#desktop_search_form").find('[name="Dy"]').remove(),
          $("#desktop_search_form").find('[name="Nty"]').remove(),
          $("#desktop_search_form")
            .find('[name="Ntt"]')
            .attr("name", "searchTerm"))
        : "en" === e("seExp")
        ? $("#desktop_search_form")
            .find('[name="searchTerm"]')
            .attr("name", "Ntt")
        : ($("#desktop_search_form").find('[name="Dy"]').remove(),
          $("#desktop_search_form").find('[name="Nty"]').remove(),
          $("#desktop_search_form")
            .find('[name="Ntt"]')
            .attr("name", "searchTerm"));
  }),
  (function (e, o) {
    "es" === o.Cookies("seExp")
      ? (e('.footer-search input[name="Nty"]').remove(),
        e('.footer-search input[name="Dy"]').attr({
          name: "listType",
          value: "g",
        }),
        e(".footer-search input#footerSearch").attr({ name: "searchTerm" }))
      : "en" === getCookie("seExp")
      ? e('.footer-search input[name="searchTerm"]').attr("name", "Ntt")
      : (e('.footer-search input[name="Nty"]').remove(),
        e('.footer-search input[name="Dy"]').attr({
          name: "listType",
          value: "g",
        }),
        e(".footer-search input#footerSearch").attr({ name: "searchTerm" }));
  })(jQuery, window),
  $(window).on("load", function () {
    document.referrer.indexOf("/sso/sa/auth") > -1 &&
      document.referrer.indexOf("result=true") < 0 &&
      window.utag &&
      window.utag.link({
        link_cat: "sign in",
        link_id: "signin success",
        link_meta: "link_name:signin success",
        link_position: "sign in samsung account",
      });
  }),
  $(window).on("load", function () {
    $(document).on("click", ".shop-with-expert-search", function (e) {
      e.preventDefault();
      var o = "https://www.samsung.com/us/expert-chat/?search_instant";
      $(window).width() < 768
        ? window.open(o, "newwindow")
        : window.open(
            o,
            "newwindow",
            "height=700, width=440, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
          );
    });
  }),
  $(function () {
    function e(e, o) {
      var t = new Date();
      t.setDate(t.getDate() + o),
        (document.cookie =
          "_common_saveEmail=" +
          encodeURIComponent(e) +
          "; path=/; domain=.samsung.com; expires=" +
          t.toGMTString() +
          ";");
    }
    function o(o) {
      $("#signInForm").attr("action", i),
        (returnURL = o || window.location.href);
      var t = $("#redirect_uri", s).val(),
        n = "",
        a = window.location.port;
      if (
        ((n =
          null == a || "" === a || "80" === a || "8080" === a
            ? "https://" + window.location.host
            : "http://" + window.location.host),
        t.indexOf(window.location.hostname) < 0)
      ) {
        var l = n + t;
        $("#redirect_uri", s).val(l);
      }
      var c = "GLB" + Math.random().toString(36).substr(2, 11);
      var newSALoginCookie = $.cookies.get("new_sa_login", {domain : ".samsung.com"});
      if(newSALoginCookie) {
				var encodedState = btoa(window.location.href + '?state=' + c);
        c = encodedState;
      }
      $.cookies.set("glbState", c, { domain: ".samsung.com" }),
        $("#response_type", s).val("code"),
        $("#countryCode", s).val($("#countryCode", s).val()),
        $("#redirect_uri", s).val($("#redirect_uri", s).val()),
        $("#signInState", s).val(c),
        $("#signInGoBackURL", s).val(returnURL),
        $(".goBackURL").val(returnURL),
        $("#scope", s).val("");
      var d = $("#loginAccountServiceId").val();
      if (d) {
        var u = d;
        $("#client_id", s).val(u);
      }
      var p = $("#languageCode").val(),
        m = $("#countryCode").val();
      if (p && m) {
        var g = p + "_" + m;
        $("#locale", s).val(g);
      }
      $.cookies.set("returnURL", returnURL, { domain: ".samsung.com" }),
        s.submit();
      var T = r.is(":checked");
      T ? e($.trim($idInput.val()), 7) : e(null, -1), (returnURL = void 0);
    }
    window.dsprocessCallback = function () {};
    var t = function () {
        if (window.Cookies("tppid")) {
          var e =
              (window.Cookies("xsdcxyn") || window.Cookies("remoteId"),
              window.Cookies("tlgimg")),
            o = window.Cookies("tmktname");
          if (
            window.AEMapp &&
            window.AEMapp.eppStore &&
            window.AEMapp.eppStore.isUnverifiedEppUser()
          )
            window.AEMapp.eppStore.updateGNB(o);
          else {
            if (window.Cookies("xsdcxyn") || window.Cookies("remoteId")) {
              var t = window.Cookies(
                window.Cookies("firstName") && window.Cookies("firstName")
                  ? "firstName"
                  : "tmktname"
              );
              $(".epp-bar-logo img").remove(),
                $(".epp-bar-logo").append('<img src="' + e + '"/>');
              var n = !!(
                  window.location.href.indexOf(
                    "/us/televisions-home-theater/"
                  ) > -1
                ),
                a =
                  'Welcome to the <div class="epp-bar-username">' +
                  o +
                  " Store.</div> Please enjoy our special offers for you",
                i =
                  '<span style="font-weight: 700;display: block;margin-bottom: 10px;">Restrictions apply</span>All prices are available for a limited time only, and cannot be combined with any other offer. These prices are not available at retail locations or online sites other than this site. If a verified user requests a retailer to match a price available to the verified user through the Samsung Offer Programs ("Program"), or shares the pricing or offer on any third-party website or with anyone who is not authorized to receive such pricing or offers, the verified user and/or the verified user\'s participating company may be subject to removal from the Program, at Samsung\'s sole discretion. The prices and all other terms and conditions associated with the Program and Samsung.com are subject to change at any time without prior notice. There is a purchase limit of two (2) products per product category, per email address and/or shipping address within any Calendar year period to avail this special pricing and benefits.';
              n &&
                (a =
                  'Welcome to the <div class="epp-bar-username">' +
                  o +
                  ' Store.</div> Shop with exclusive offers and extra savings. Restrictions apply. <a href="javascript:void();" class="gnb-tooltip"><span class="gnb-tooltip-icon">i</span><div class="gnb-tooltip-tri"></div><div class="gnb-tooltip-popup">' +
                  i +
                  "</div></a>"),
                $(".epp-bar-msg").html(
                  t
                    ? a
                    : 'Welcome <div class="epp-bar-username">' +
                        o +
                        '!</div> Please <a href="#" id="openLogin" style="color:#1428a0;font-weight: bold">login</a> to enjoy our special offers for you'
                ),
                window.Cookies("tmktid") && window.Cookies("tmktname") ? $(".epp-bar-wrap").slideDown() : $(".epp-bar-wrap").hide(),
                $(".gnb-tooltip").on("click", function (e) {
                  e.stopPropagation(),
                    $(".epp-bar-wrap").addClass("active"),
                    $(".gnb-tooltip-popup").show();
                }),
                $("body").on("click", function (e) {
                  $(".epp-bar-wrap").removeClass("active"),
                    $(".gnb-tooltip-popup").hide();
                });
            } else
              (window.Cookies("xsdcxyn") || window.Cookies("remoteId")) &&
              "4145500" === window.Cookies("tmktid") &&
              "17593200" === window.Cookies("tppid")
                ? ($(".epp-bar-logo img").remove(),
                  $(".epp-bar-logo").append('<img src="' + e + '"/>'),
                  $(".epp-bar-msg").html(
                    "Welcome to Samsung's Friends and Family Store! Enjoy special pricing. Please <a href='#' id='openLogin' style='font-size:12px;font-weight: bold'>login/signup</a> to make a purchase."
                  ),
                  $(".epp-bar-wrap").slideDown())
                :(
                  window.AEMapp?.eppStore?.isTMOGuestUser() ? ($('.benfit-wrap').hide(),$(".epp-bar-wrap").slideDown()) : ($(".epp-bar-logo img").remove(),
                  $(".epp-bar-logo").append('<img src="' + e + '"/>'),
                  $(".epp-bar-msg").html(
                    'Welcome to the <div class="epp-bar-username" style="color:#1428a0;">' +
                      o +
                      " Store!</div> Please <a href='#' id='openLogin' style='color:#1428a0;font-weight: bold'>login</a> to enjoy our special pricing."
                  ),
                  $("#openLogin").click(function (e) {
                    e.preventDefault(), $(".gnb-login").trigger("click");
                  }),
                  o ? $(".epp-bar-wrap").slideDown() : $(".epp-bar-wrap").hide())
                );
            window.AEMapp &&
              window.AEMapp.eppStore &&
              window.AEMapp.eppStore.updateGNBCartSaving();
          }
        } else if (window.AEMapp?.eppStore?.isTMOGuestUser()) {
          var tname = window.Cookies("tmktname");
          if (tname) {
            $(".epp-bar-logo img").remove();
            $('.benfit-wrap').remove();
            $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">' + tname + ' Store' + '.</div>');
            $(".epp-bar-wrap").slideDown();
          } else {
            $(".epp-bar-wrap").hide();
          }
        } else $(".epp-bar-wrap").hide();
      },
      n = function () {
        var e = $(".gnb__login-layer .gnb__user-name .gnb__user-image"),
          o = $(".gnb__logout .gnb__logout-btn"),
          t = $(".gnb__utility-mobile .gnb__logout .default-svg"),
          n = e.length && e.find(".gnb_user-image-svg"),
          a = e.length && e.find(".js-gnb-afterlogin-image img");
        if (
          (o.length && o.addClass("extend-logout-icon"),
          window.Cookies("mVal11"))
        ) {
          var i = decodeURIComponent(window.Cookies("mVal11"));
          o.length && o.find(".default-svg").attr("src", i),
            t.length && t.attr("src", i),
            n.length && n.removeClass("active"),
            a.attr("src", i);
        } else
          a.length && a.parent().removeClass("active"),
            o.length &&
              o
                .find(".default-svg")
                .attr(
                  "src",
                  "//image-us.samsung.com/us/gnb/after-login-default.svg"
                ),
            t.length &&
              t.attr(
                "src",
                "//image-us.samsung.com/us/gnb/after-login-default.svg"
              );
      },
      a = function () {
        window.Cookies("xsdcxyn") || window.Cookies("remoteId")
          ? (window.Cookies("firstName") &&
              ($(
                ".gnb__utility .gnb__login, .gnb__utility-mobile .gnb__login"
              ).remove(),
              $(
                ".gnb__utility .gnb__logout, .gnb__utility-mobile .gnb__logout"
              ).removeClass("hidden"),
              n(),
              $(".gnb__user-name-inner").text(
                window.Cookies("firstName") +
                  " " +
                  window.Cookies("lastName") +
                  "!"
              )),
            window.Cookies("tppid") &&
              window.Cookies("tmktname") &&
              (t(),
              "16568500" === window.Cookies("tppid") &&
                $(".gnb__utility-link.sea").removeClass("hidden"),
              $(".epp-bar-wrap").show()),
            $(".gnb__utility-link.logout").on("click", function (e) {
              function o() {
                var e =
                    window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
                    window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
                      ? "https://sso-us.samsung.com"
                      : "https://sso-stg.us.samsung.com",
                  o =
                    window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
                    window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
                      ? "https://account.samsung.com/accounts/v1/samsung_com_us/signOutGate"
                      : "https://stg-account.samsung.com/accounts/v1/samsung_com_us/signOutGate",
                  t = btoa(window.location.href);
                window.location.href =
                  o +
                  "?client_id=kv5di1wr19&signOutURL=" +
                  e +
                  "/sso/sa/auth&state=" +
                  t;
              }
              e.preventDefault(),
                $.ajax({
                  headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-ecom-jwt": window.Cookies("jwt_USA"),
                  },
                  url: "/us/api/v2/sso/user/logout",
                  type: "GET",
                  dataType: "json",
                  xhrFields: { withCredentials: !0 },
                  crossDomain: !0,
                  success: function (e) {
                    dropCookiesHistory(),
                      setTimeout(function () {
                        o();
                      }, 200);
                  },
                  error: function (e, t, n) {
                    dropCookiesHistory(),
                      setTimeout(function () {
                        o();
                      }, 200);
                  },
                  complete: function () {
                    dropCookiesHistory();
                  },
                });
            }),
            $(document).trigger("loginFinished"))
          : ($(
              ".gnb__utility .gnb__logout, .gnb__utility-mobile .gnb__logout"
            ).remove(),
            $(
              ".gnb__utility .gnb__login, .gnb__utility-mobile .gnb__login"
            ).removeClass("hidden"),
            t());
      },
      i = $("#loginLinkURL").val(),
      s = $("#signInForm"),
      r = $("#save-mail"),
      l = function () {
        var e = $.cookies.get("xsdcxyn", { domain: ".samsung.com" }),
          o = $.cookies.get("jwt_USA", { domain: ".samsung.com" }),
          n = function () {
            var e,
              o,
              t,
              n,
              i,
              s = $.cookies.get("ReD", { domain: ".samsung.com" });
            if (null != s) {
              (e = s.split("|")),
                (o = e[0]),
                (t = e[2]),
                (n = e[1]),
                (i = e[4]);
              var r = {
                  access_token: o,
                  api_server_url: t,
                  user_id: n,
                  app_id: i,
                  encrypted: "access_token,api_server_url,user_id,app_id",
                },
                l = JSON.stringify(r),
                c = JSON.stringify({ data: btoa(l) }),
                d = $.cookies.get("jwt_USA", { domain: ".samsung.com" }),
                u = {
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                };
              d && (u["x-ecom-jwt"] = d),
                $.ajax({
                  headers: u,
                  url: "/us/api/v4/sso/sa/login",
                  type: "POST",
                  data: c,
                  dataType: "json",
                  xhrFields: { withCredentials: !0 },
                  crossDomain: !0,
                  success: function (e) {
                    var i = $.cookies.get("jwt_USA", {
                      domain: ".samsung.com",
                    });
                    window.storeId = e && e.store_info && e.store_info.store_id;
                    var s = e.epp_verified;
                    if (
                      ($.cookies.set("epp_verified", s, {
                        domain: ".samsung.com",
                      }),
                      s)
                    ) {
                      var r = "emaildomain",
                        l = e.store_info && e.store_info.store_id,
                        c = e.store_info && e.store_info.store_disp_name,
                        d = e.store_info && e.store_info.image_logo_url,
                        u = e.store_info && e.store_info.store_segment,
                        p = e.store_info && e.store_info.legacy_plan_id;
                      $.cookies.set("taccessrtype", r, {
                        domain: ".samsung.com",
                      }),
                        $.cookies.set("tmktid", l, { domain: ".samsung.com" }),
                        $.cookies.set("tmktname", c, {
                          domain: ".samsung.com",
                        }),
                        $.cookies.set("tlgimg", d, { domain: ".samsung.com" }),
                        $.cookies.set("tsgmt", u, { domain: ".samsung.com" }),
                        $.cookies.set("tppid", p, { domain: ".samsung.com" });
                    }
                    if (i) {
                      var m = {
                          access_token: o,
                          api_server_url: t,
                          user_id: n,
                        },
                        g = JSON.stringify(m),
                        T = { data: btoa(g) };
                      $.ajax({
                        headers: {
                          "Cache-Control": "no-cache",
                          "Content-Type": "application/json",
                          "Access-Control-Request-Headers":
                            "access-control-allow-origin",
                          "Access-Control-Allow-Origin": "*",
                        },
                        url: "https://us.ecom.samsung.com/v3/sso/sa/ds-process-watchdog",
                        type: "GET",
                        cache: !0,
                        data: T,
                        dataType: "jsonp",
                        async: !1,
                        xhrFields: { withCredentials: !0 },
                        crossDomain: !0,
                        success: function (e) {
                          a();
                        },
                        error: function (e, o, t) {
                          a();
                        },
                      });
                    }
                  },
                  error: function (e, o, t) {
                    dropCookiesHistory();
                  },
                });
            }
          };
        e
          ? o
            ? $.ajax({
                headers: {
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                url: "/us/api/v1/sso/user/validate",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                  jwt: o,
                  store_id: Cookies("tmktid") || window.storeId,
                }),
                xhrFields: { withCredentials: !0 },
                success: function (e) {
                  if (200 !== e.statusCode && "200" !== e.statusCode)
                    $.cookies.del("jwt_USA", { domain: ".samsung.com" }), n();
                  else {
                    var o = e.user_info;
                    window.Cookies.set("firstName", o.firstname),
                      window.Cookies.set("lastName", o.lastname),
                      a();
                  }
                },
                error: function (e, o, t) {
                  $.cookies.del("jwt_USA", { domain: ".samsung.com" }), n();
                },
              })
            : n()
          : t();
      },
      c = function () {
        $(".gnb-login").on("click", function (e) {
          e.preventDefault(),
            window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
            window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
              ? o()
              : (window.location.href =
                  window.location.host.indexOf("stgwebus.samsung.com") > -1 ||
                  window.location.host.indexOf("stgwwwus.samsung.com") > -1
                    ? "https://stg-account.samsung.com/accounts/v1/samsung_com_us/signInGate?response_type=code&client_id=kv5di1wr19&locale=en_US&countryCode=US&redirect_uri=https:%2F%2Fsso-stg.us.samsung.com%2Fsso%2Fsa%2Fauth&state=ABCD&goBackURL=https:%2F%2Fsso-stg.us.samsung.com%2Fsso%2Fsa%2Fauth"
                    : "/us/account/signin/?redirect=" +
                      encodeURIComponent(window.location.href));
        }),
          $(document).on("triggerLogin", function (e, t) {
            window.location.host.indexOf("www.samsung.com") > -1 || window.location.host.indexOf("origincl") > -1 ||
            window.location.host.indexOf("prodcl") > -1 || window.location.host.indexOf("pre-prod") > -1
              ? o(t)
              : (window.location.href =
                  window.location.host.indexOf("stgwebus.samsung.com") > -1 ||
                  window.location.host.indexOf("stgwwwus.samsung.com") > -1
                    ? "https://stg-account.samsung.com/accounts/v1/samsung_com_us/signInGate?response_type=code&client_id=kv5di1wr19&locale=en_US&countryCode=US&redirect_uri=https:%2F%2Fsso-stg.us.samsung.com%2Fsso%2Fsa%2Fauth&state=ABCD&goBackURL=https:%2F%2Fsso-stg.us.samsung.com%2Fsso%2Fsa%2Fauth"
                    : "/us/account/signin/?redirect=" +
                      encodeURIComponent(window.location.href));
          });
      },
      d = function () {
        var e = $.cookie("s_ecom_sc_cnt");
        (e = e ? ("0" == e ? "" : e) : ""),
          e && $(".gnb__cart-in-number").removeClass("hidden").text(e);
      };
    d(),
      c(),
      window.location.host.indexOf("www.samsung.com") > -1 ? l() : a(),
      $(window).on("epp__store exit__store", function () {
        t();
      });
  }),
  $(function () {
    function e() {
      var e = document.getElementById("gnb-header-json")
        ? document.getElementById("gnb-header-json").value
        : "/us/smg/content/samsung/content-library/gnb/gnb-header/json/pub/gnb-header-menu.json";
      $.ajax({ url: e, dataType: "json" })
        .then(function (e) {
          if (e && e.menuOptions && e.menuOptions.length > 0) {
            $(".gnb").addClass("isHybrid"),
              $(".gnb__depth1-menu").each(function (o, t) {
                if (
                  ($(t).find(".gnb__depth2-wrap").addClass("isHybrid one-col"),
                  $(t)
                    .find(".gnb__depth2-wrap .gnb__depth-back")
                    .append('<span class="gnb__depth1-name"></span>'),
                  $(t).hasClass("has-depth-menu"))
                ) {
                  var n = e.menuOptions[o];
                  if (!n) return;
                  var a = "";
                  a = n.titleTaburl
                    ? '<a class="gnb__depth2-title-link" href="' +
                      n.titleTaburl +
                      '">' +
                      (n.titleTabHeadline ? n.titleTabHeadline : "") +
                      "</a>"
                    : '<span class="gnb__depth2-title-text">' +
                      (n.titleTabHeadline ? n.titleTabHeadline : "") +
                      "</span>";
                  var i =
                      '<div class="gnb__depth2-title-wrap"><strong class="gnb__depth2-title">' +
                      a +
                      "</strong></div>",
                    s = "cta--contained hidden",
                    r = "hybrid-accordion",
                    l = n.foImg
                      ? '<div class="gnb__feature-container"> <a class="gnb__feature-container-link" data-link_cat="navigation ' +
                        r +
                        '" data-link_id="' +
                        n.fiHeadline +
                        '" data-link_meta="link_name:' +
                        n.fiHeadline +
                        '" data-link_position="navigation>gnb>' +
                        n.titleTabHeadline +
                        '" data-event_name="select_' +
                        n.titleTabHeadline +
                        '_click" href="' +
                        (n.foLinkUrl ? n.foLinkUrl : "javascript:void(0);") +
                        '"><div class="image"> <img class="image__main responsive-img lazyload image--loaded" data-src="' +
                        n.foImg +
                        '" data-mobile-src="' +
                        n.foImg +
                        '" alt="' +
                        (n.foImgAlt ? n.foImgAlt : "") +
                        '"></div><div class="gnb__feature-container-contents"><p class="gnb__feature-container-description">' +
                        (n.fiHeadline ? n.fiHeadline : "") +
                        '</p> <span class="cta ' +
                        s +
                        ' cta--black">' +
                        (n.fiCtaText ? n.fiCtaText : "") +
                        "</span></div></a></div>"
                      : "",
                    c = "";
                  if (n.children) {
                    var d = "isHybrid";
                    (c += '<ul class="gnb__depth2 ' + d + '" role="menu">'),
                      $.each(n.children, function (e, o) {
                        var t = o.children ? "has-depth-menu" : "",
                          a = "B" == o.linkTarget ? "_blank" : "_self",
                          i = o.linkUrl ? o.linkUrl : "javascript:void(0);",
                          s =
                            o.flyOutSections && o.flyOutSections[0].flyOutImage
                              ? o.flyOutSections
                              : void 0,
                          r = s
                            ? s[0].flyOutBlackTextTheme
                              ? ""
                              : "text-color--white"
                            : "",
                          l =
                            "B" == o.linkTarget
                              ? '<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>'
                              : "",
                          d = o.displayIconLabel
                            ? '<span class="badge-icon badge-icon--label badge-icon--bg-color-blue">' +
                              o.displayIconLabel +
                              "</span>"
                            : "",
                          u = s
                            ? 'data-flyout-url="' +
                              s[0].flyOutLink +
                              '" data-flyout-text="' +
                              s[0].flyOutTitle +
                              '" data-flyout-img="' +
                              s[0].flyOutImage +
                              '" data-flyout-theme="' +
                              r +
                              '"'
                            : 'data-flyout-url="' +
                              (n.foLinkUrl || "") +
                              '" data-flyout-text="' +
                              (n.fiHeadline || "") +
                              '" data-flyout-img="' +
                              (n.foImg || "") +
                              '"',
                          p =
                            '<li class="gnb__depth2-menu ' +
                            t +
                            '" role="presentation">',
                          m = t
                            ? '<svg class="icon icon--next" id="next-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M31.828 16.306l3.457-3.612L72.172 48 35.285 83.306l-3.457-3.612L64.941 48z"></path></svg>'
                            : "";
                        p +=
                          '<a class="gnb__depth2-link" target="' +
                          a +
                          '" href="' +
                          i +
                          '" role="menuitem" ' +
                          u +
                          '><span class="gnb__depth2-link-text">' +
                          o.displayName +
                          l +
                          d +
                          "</span>" +
                          m +
                          "</a>";
                        var g = t
                          ? '<a class="gnb__depth2-dropdown-cta" href="javascript:void(0)"><span class="hidden">Open Menu</span><svg class="icon icon--dropdown" id="open-down-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M48 73.254L11.651 36.361l5.698-5.614L48 61.855l30.651-31.108 5.698 5.614z"></path></svg></a>'
                          : "";
                        if (((p += g), t)) {
                          (p +=
                            '<div class="gnb__depth3-wrap "><div class="gnb__depth3-inner"><ul class="gnb__depth3" role="menu">'),
                            $.each(o.children, function (e, o) {
                              var t = "B" == o.linkTarget ? "_blank" : "_self",
                                n =
                                  (o.linkUrl,
                                  o.fimageL3url
                                    ? o.fimageL3url.replace(/ /g, "%20")
                                    : ""),
                                a = n ? "" : "no-img",
                                i =
                                  n || "B" != o.linkTarget
                                    ? ""
                                    : '<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>',
                                s = o.displayIconLabel
                                  ? '<span class="badge-icon badge-icon--label badge-icon--bg-color-blue">' +
                                    o.displayIconLabel +
                                    "</span>"
                                  : "",
                                r = n
                                  ? '<img class="lazyload image--loaded" data-src="' +
                                    n +
                                    '" >'
                                  : "",
                                l = "isHybrid ",
                                c =
                                  '<li class="gnb__depth3-menu" role="presentation"><a class="gnb__depth3-link ' +
                                  l +
                                  '" href="' +
                                  o.linkUrl +
                                  '" target="' +
                                  t +
                                  '"  role="menuitem"><div class="gnb__depth3-link-text ' +
                                  l +
                                  a +
                                  '">' +
                                  r +
                                  o.displayName +
                                  i +
                                  s +
                                  "</div></a></li>";
                              p += c;
                            });
                          var T = o.shopAllLinkUrl,
                            h = o.shopAllLinkTextDesktop,
                            b =
                              (o.shopAllLinkTextMobile
                                ? o.shopAllLinkTextMobile
                                : o.shopAllLinkTextDesktop,
                              T
                                ? '<li class="gnb__depth3-menu" role="presentation"><a class="gnb__depth3-link isHybrid shop-all" href="' +
                                  T +
                                  '" target="_self" role="menuitem"><div class="gnb__depth3-link-text isHybrid shop-all">' +
                                  h +
                                  '<svg class="icon icon--next" id="next-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" style="width: 20px;"><path d="M31.828 16.306l3.457-3.612L72.172 48 35.285 83.306l-3.457-3.612L64.941 48z"></path></svg></div></a></li>'
                                : "");
                          (p += b), (p += "</ul></div></div>");
                        }
                        (p += "</li>"), (c += p);
                      }),
                      (c += "</ul>");
                  }
                  $(i + c + l).appendTo($(t).find(".gnb__depth2-inner"));
                }
              }),
              window.sg.components.gnb.init();
            var o = "hybrid-accordion";
            $(".gnb").on("click", ".gnb__depth3-link", function (e) {
              var t =
                  $(".gnb__depth1-menu.open .gnb__depth1-link-text").text() ||
                  $(".gnb__depth1-menu.active .gnb__depth1-link-text").text(),
                n = $(".gnb__depth2-menu.active .gnb__depth2-link-text").text(),
                a = $(this).find(".gnb__depth3-link-text").text();
              window.utag &&
                window.utag.link({
                  link_cat: "navigation " + o,
                  link_id: t + ":" + n + ":" + a,
                  link_meta: "link_name:" + a,
                  link_position: "navigation>gnb>" + t + ">" + n,
                  event_name: "select_" + a + "_click",
                });
            }),
              $(".gnb").on("click", ".gnb__depth2-link", function (e) {
                var t =
                    $(".gnb__depth1-menu.open .gnb__depth1-link-text").text() ||
                    $(".gnb__depth1-menu.active .gnb__depth1-link-text").text(),
                  n = $(this).find(".gnb__depth2-link-text").text();
                window.utag &&
                  window.utag.link({
                    link_cat: "navigation " + o,
                    link_id: t + ":" + n,
                    link_meta: "link_name:" + n,
                    link_position: "navigation>gnb>" + t,
                    event_name: "select_" + n + "_open",
                  });
              }),
              $(".gnb").on("click", ".gnb__menu-btn", function (e) {
                window.utag &&
                  window.utag.link({
                    link_cat: "navigation " + o,
                    link_id: "mobile hamburger menu",
                    link_meta: "link_name: hamburger menu",
                    link_position: "navigation>gnb>hamburger menu",
                    event_name: "select_hamburger menu_click",
                  }),
                  $(".epp-bar-wrap").removeClass("active");
              }),
              $(".gnb").on("click", ".gnb__depth2-dropdown-cta", function (e) {
                $(this)
                  .siblings(".gnb__depth2-link")
                  .find(".gnb__depth2-link-text")
                  .click();
              }),
              $(document).trigger("GNBInitialized");
          }
        })
        .fail(function (e) {});
    }
   // e();
  }),
  $(document).ready(function () {
    //AEMCL-2738 Double header and footer issue, Hiding GNB header and footer
    if(window.EcommFlutterClient != null) {
      $(".gnb").hide()
      $(".footer").hide()
    }
    $(document).on("onPromptLogin", function (e, o, t, n) {
      $(".gnb-login").trigger("click");
    }),
      $(document).on("onPromptSignUp", function () {
        $(".gnb-login").trigger("click");
      }),
      $(document).on("onPromptForgotEmail", function () {
        $(".gnb-login").trigger("click");
      });

      //Start of SCOM-16281
      // search icon click event for analytics tracking
      // $(document).on("click", ".gnb__search-btn-js", function () {
      //   window.utag && window.utag.link({
      //       'link_cat':'navigation' , 
      //       'link_id': 'search', 
      //       'link_position': 'navigation>gnb',
      //       'event_name': 'select_search_click'
      //   });
      // });
      // Add to cart cta click event for analytics tracking
      $(document).on("click", ".js-gp-cart-btn", function () {
        window.utag && window.utag.link({
          'link_cat':'navigation' , 
          'link_id': 'cart', 
          'link_position': 'navigation>gnb',
          'event_name': 'select_cart_click'
        });
      });

      // User navigation anchor click event for analytics tracking
      // $(document).on("click", "a.nv00-gnb__utility-user-menu-link", function () {
      //   window.utag && window.utag.link({
      //     'link_cat':'navigation' , 
      //     'link_id': 'account', 
      //     'link_position': 'navigation>gnb>nv00_gnb-1depth-navigation2',
      //     'event_name': 'select_account_click'
      //   });
      // });

      // Trending now & Deals for you next button click event for analytics tracking
      $(document).on("click", ".gnb .swiper-button-next", function () {
        window.utag && window.utag.link({
          'link_cat':'search' , 
          'link_id': 'trending now', 
          'link_position': 'navigation>search>next arrow',
          'event_name': 'select_trending_now_click'
        });
      });

      // Trending now & Deals for you previous button click event for analytics tracking
      $(document).on("click", ".gnb .swiper-button-prev", function () {
        window.utag && window.utag.link({
          'link_cat':'search' , 
          'link_id': 'trending now', 
          'link_position': 'navigation>search>previous arrow',
          'event_name': 'select_trending_now_click'
        });
      });
      //End of SCOM-16281
  }),
  (function (e, o, t) {
    "use strict";
    function n(e) {
      var o = "",
        t =
          '.product-details__info .epp-product[data-eppmdlcd^="{{model}}"] .product-details__info-add{ display:none}.product-anchor-nav .product-anchor-nav__anchor a[data-link_position^="{{model}}"] {display: none}.search_results .product[data-prdmdlcd^="{{model}}"] .cta .cta {visibility: hidden; pointer-events: none;}section[class^="ProductCard-root"][data-modelcode^="{{model}}"] .Product-card__button-main{ visibility:hidden;pointer-events: none;}';
      return (
        e.forEach(function (e) {
          o += t.replace(new RegExp("{{model}}", "g"), e);
        }),
        o
      );
    }
    if (
      o.location.href.indexOf("mobile") > -1 ||
      o.location.href.indexOf("search/searchMain") > -1
    ) {
      var a = n([
          "SM-F900UZSDXAA",
          "SM-F900UZKDXAA",
          "SM-F900UZSDATT",
          "SM-F900UZKDATT",
        ]),
        i = document.head || document.getElementsByTagName("head")[0],
        s = document.createElement("style");
      (s.type = "text/css"),
        s.styleSheet
          ? (s.styleSheet.cssText = a)
          : s.appendChild(document.createTextNode(a)),
        i.appendChild(s);
    }
  })(jQuery, window),
  window.addEventListener("load", function () {
    !(function (e, o) {
      "use strict";
      "undefined" == typeof e.smg && (e.smg = {}),
        "undefined" == typeof e.smg.aem && (e.smg.aem = {}),
        "undefined" == typeof e.smg.aem.common && (e.smg.aem.common = {});
      {
        var t = e.smg.aem.common,
          n =
            (e.smg.aem.varStatic,
            (function () {
              return {
                winSize: function () {
                  var e = { w: window.innerWidth, h: window.innerHeight };
                  return e;
                },
              };
            })());
        e.smg.aem.customEvent;
      }
      (t.cookieGeoNew = (function () {
        var t = "us",
          a = {
            closeBtn: ".js-geo-close",
            countryNameWrap: ".js-country-name",
            geoSelectWrap: ".cm-cookie-geo__select",
            visitBtnsWrap: ".js-visit-btns",
            selectListWrap: ".js-list-wrap",
            selectListHead: ".js-list-head",
            selectListOpenClass: "s-select-open",
            selectListToggleBtn: ".js-list-toogle",
            geoMsgCookie: ".cm-cookie-geo__msg",
            geoMsgCookieSebn: ".cm-cookie-geo__sebn",
            cookies: {
              commonaccepted: "cookiesaccepted",
              accepted: "cookiesaccepted-geo",
              acceptedCountries: "cookiesaccepted-countries",
              countryCodes: "country_codes",
              siteCode: "site_cd",
            },
          },
          i = [
            {
              site_code: "CA_FR",
              global: { country_name: "Canada", lang: "French" },
              local: { country_name: "Canada", lang: "Français" },
              country_codes: ["ca"],
            },
            {
              site_code: "CA",
              global: { country_name: "Canada", lang: "English" },
              local: { country_name: "Canada", lang: "English" },
              country_codes: ["ca"],
            },
            {
              site_code: "MX",
              global: { country_name: "Mexico", lang: "Spanish" },
              local: { country_name: "México", lang: "Españo" },
              country_codes: ["mx"],
            },
            {
              site_code: "BR",
              global: { country_name: "Brazil", lang: "Portuguese" },
              local: { country_name: "Brasil", lang: "Português" },
              country_codes: ["br"],
            },
            {
              site_code: "LATIN",
              global: { country_name: "Latin America", lang: "Spanish" },
              local: { country_name: "Latin", lang: "Español" },
              country_codes: [
                "gt",
                "ni",
                "do",
                "bo",
                "ec",
                "sv",
                "cr",
                "pa",
                "hn",
              ],
            },
            {
              site_code: "LATIN_EN",
              global: { country_name: "Latin America", lang: "English" },
              local: { country_name: "Latin", lang: "English" },
              country_codes: [
                "gy",
                "gp",
                "mq",
                "bb",
                "bm",
                "bz",
                "lc",
                "sr",
                "aw",
                "ht",
                "ag",
                "jm",
                "ky",
                "tt",
              ],
            },
            {
              site_code: "CO",
              global: { country_name: "Colombia", lang: "Spanish" },
              local: { country_name: "Colombia", lang: "Español" },
              country_codes: ["co"],
            },
            {
              site_code: "AR",
              global: { country_name: "Argentina", lang: "Spanish" },
              local: { country_name: "Argentina", lang: "Español" },
              country_codes: ["ar"],
            },
            {
              site_code: "UY",
              global: { country_name: "Uruguay", lang: "Spanish" },
              local: { country_name: "Uruguay", lang: "Español" },
              country_codes: ["uy"],
            },
            {
              site_code: "PY",
              global: { country_name: "Paraguay", lang: "Spanish" },
              local: { country_name: "Paraguay", lang: "Español" },
              country_codes: ["py"],
            },
            {
              site_code: "CL",
              global: { country_name: "Chile", lang: "Spanish" },
              local: { country_name: "Chile", lang: "Español" },
              country_codes: ["cl"],
            },
            {
              site_code: "PE",
              global: { country_name: "Peru", lang: "Spanish" },
              local: { country_name: "Perú ", lang: "Español" },
              country_codes: ["pe"],
            },
            {
              site_code: "SG",
              global: { country_name: "Singapore", lang: "English" },
              local: { country_name: "Singapore", lang: "English" },
              country_codes: ["sg"],
            },
            {
              site_code: "AU",
              global: { country_name: "Australia", lang: "English" },
              local: { country_name: "Australia", lang: "English" },
              country_codes: ["au"],
            },
            {
              site_code: "NZ",
              global: { country_name: "New Zealand", lang: "English" },
              local: { country_name: "New Zealand", lang: "English" },
              country_codes: ["nz"],
            },
            {
              site_code: "ID",
              global: { country_name: "Indonesia", lang: "Indonesian" },
              local: { country_name: "Indonesia", lang: "Bahasa Indonesia" },
              country_codes: ["id"],
            },
            {
              site_code: "TH",
              global: { country_name: "Thailand", lang: "Thai" },
              local: { country_name: "ประเทศไทย", lang: "ไทย" },
              country_codes: ["th"],
            },
            {
              site_code: "VN",
              global: { country_name: "Vietnam", lang: "Vietnamese" },
              local: { country_name: "Việt Nam", lang: "Tiếng Việt" },
              country_codes: ["vn"],
            },
            {
              site_code: "MY",
              global: { country_name: "Malaysia", lang: "English" },
              local: { country_name: "Malaysia", lang: "English" },
              country_codes: ["my"],
            },
            {
              site_code: "MM",
              global: { country_name: "Myanmar", lang: "Burmese" },
              local: { country_name: "Myanmar", lang: "Burmese" },
              country_codes: ["mm"],
            },
            {
              site_code: "JP",
              global: { country_name: "Japan", lang: "Japanese" },
              local: { country_name: "日本", lang: "日本語" },
              country_codes: ["jp"],
            },
            {
              site_code: "IN",
              global: { country_name: "India", lang: "English" },
              local: { country_name: "India", lang: "English" },
              country_codes: ["in", "np", "bd", "lk"],
            },
            {
              site_code: "UK",
              global: { country_name: "United Kingdom", lang: "English" },
              local: { country_name: "United Kingdom", lang: "English" },
              country_codes: ["gb", "uk"],
            },
            {
              site_code: "IE",
              global: { country_name: "Ireland", lang: "English" },
              local: { country_name: "Ireland", lang: "English" },
              country_codes: ["ie"],
            },
            {
              site_code: "IT",
              global: { country_name: "Italy", lang: "Italian" },
              local: { country_name: "Italia", lang: "taliano" },
              country_codes: ["it", "mt"],
            },
            {
              site_code: "ES",
              global: { country_name: "Spain", lang: "Spanish" },
              local: { country_name: "Espana", lang: "Espanol" },
              country_codes: ["es"],
            },
            {
              site_code: "HU",
              global: { country_name: "Hungary", lang: "Hungarian" },
              local: { country_name: "Magyarország", lang: "Magyar" },
              country_codes: ["hu"],
            },
            {
              site_code: "DE",
              global: { country_name: "Germany", lang: "German" },
              local: { country_name: "Deutschland", lang: "Deutsch" },
              country_codes: ["de"],
            },
            {
              site_code: "SE",
              global: { country_name: "Sweden", lang: "Swedish" },
              local: { country_name: "Sverige", lang: "Svenska" },
              country_codes: ["se"],
            },
            {
              site_code: "DK",
              global: { country_name: "Denmark", lang: "Danish" },
              local: { country_name: "Danmark", lang: "Dansk" },
              country_codes: ["dk"],
            },
            {
              site_code: "FI",
              global: { country_name: "Finland", lang: "Finnish" },
              local: { country_name: "Suomi", lang: "Suomi" },
              country_codes: ["fi"],
            },
            {
              site_code: "NO",
              global: { country_name: "Norway", lang: "Norwegian" },
              local: { country_name: "Norge", lang: "Norsk" },
              country_codes: ["no"],
            },
            {
              site_code: "FR",
              global: { country_name: "France", lang: "French" },
              local: { country_name: "France", lang: "Français" },
              country_codes: ["fr"],
            },
            {
              site_code: "PT",
              global: { country_name: "Portugal", lang: "Portuguese" },
              local: { country_name: "Portugal", lang: "Português" },
              country_codes: ["pt"],
            },
            {
              site_code: "PL",
              global: { country_name: "Poland", lang: "Polish" },
              local: { country_name: "Polska", lang: "Polski" },
              country_codes: ["pl"],
            },
            {
              site_code: "GR",
              global: { country_name: "Greece", lang: "Greek" },
              local: { country_name: "Ελλάδα", lang: "Ελληνικά" },
              country_codes: ["gr"],
            },
            {
              site_code: "CZ",
              global: { country_name: "Czech", lang: "Czech" },
              local: { country_name: "Česká republika", lang: "Čeština" },
              country_codes: ["cz"],
            },
            {
              site_code: "SK",
              global: { country_name: "Slovakia", lang: "Slovakian" },
              local: { country_name: "Slovensko", lang: "Slovenčina" },
              country_codes: ["sk"],
            },
            {
              site_code: "RO",
              global: { country_name: "Romania", lang: "Romanian" },
              local: { country_name: "Romania", lang: "Romanian" },
              country_codes: ["ro"],
            },
            {
              site_code: "BG",
              global: { country_name: "Bulgaria", lang: "Bulgarian" },
              local: { country_name: "България", lang: "Български" },
              country_codes: ["bg"],
            },
            {
              site_code: "AT",
              global: { country_name: "Austria", lang: "German" },
              local: { country_name: "Österreich", lang: "Deutsch" },
              country_codes: ["at"],
            },
            {
              site_code: "CH",
              global: { country_name: "Switzerland", lang: "German" },
              local: { country_name: "Schweiz", lang: "Deutsch" },
              country_codes: ["ch"],
            },
            {
              site_code: "CH_FR",
              global: { country_name: "Switzerland", lang: "French" },
              local: { country_name: "Suisse", lang: "Francaise" },
              country_codes: ["ch"],
            },
            {
              site_code: "BE",
              global: { country_name: "Belgium", lang: "Dutch" },
              local: { country_name: "België", lang: "Nederlands" },
              country_codes: ["be"],
            },
            {
              site_code: "BE_FR",
              global: { country_name: "Belgium", lang: "French" },
              local: { country_name: "Belgium", lang: "French" },
              country_codes: ["lu"],
            },
            {
              site_code: "NL",
              global: { country_name: "Netherlands", lang: "Dutch" },
              local: { country_name: "Nederland", lang: "Nederlands" },
              country_codes: ["nl"],
            },
            {
              site_code: "LV",
              global: { country_name: "Latvia", lang: "Latvian" },
              local: { country_name: "Latvija", lang: "Latviešu" },
              country_codes: ["lv"],
            },
            {
              site_code: "LT",
              global: { country_name: "Lithuania", lang: "Lithuanian" },
              local: { country_name: "Lietuva", lang: "Lietuvių" },
              country_codes: ["lt"],
            },
            {
              site_code: "EE",
              global: { country_name: "Estonia", lang: "Estonian" },
              local: { country_name: "Eesti", lang: "Eesti" },
              country_codes: ["ee"],
            },
            {
              site_code: "RS",
              global: { country_name: "Serbia", lang: "Serbian" },
              local: { country_name: "Cрбија", lang: "Cрпски" },
              country_codes: ["rs"],
            },
            {
              site_code: "HR",
              global: { country_name: "Croatia", lang: "Croatian" },
              local: { country_name: "Hrvatska", lang: "Hrvatski" },
              country_codes: ["hr"],
            },
            {
              site_code: "SI",
              global: { country_name: "Slovenia", lang: "Slovenijan" },
              local: { country_name: "Slovenija", lang: "Slovenščina" },
              country_codes: ["sl"],
            },
            {
              site_code: "AL",
              global: { country_name: "Albania", lang: "Albania" },
              local: { country_name: "Shqipëri", lang: "Shqi" },
              country_codes: ["al"],
            },
            {
              site_code: "RU",
              global: { country_name: "Russia", lang: "Russian" },
              local: { country_name: "Россия", lang: "Русский" },
              country_codes: ["ru"],
            },
            {
              site_code: "UA",
              global: { country_name: "Ukraine", lang: "Ukrainian" },
              local: { country_name: "Україна", lang: "Українська" },
              country_codes: ["ua"],
            },
            {
              site_code: "UA_RU",
              global: { country_name: "Ukraine", lang: "Russian" },
              local: { country_name: "Украина", lang: "Pусский" },
              country_codes: ["ua"],
            },
            {
              site_code: "KZ_RU",
              global: { country_name: "Kazakhstan", lang: "Russian" },
              local: { country_name: "Kazakhstan", lang: "Pусский" },
              country_codes: ["kz"],
            },
            {
              site_code: "KZ_KZ",
              global: { country_name: "Kazakhstan", lang: "Kazakh" },
              local: { country_name: "Kazakhstan", lang: "Қазақ" },
              country_codes: ["kz"],
            },
            {
              site_code: "AE",
              global: { country_name: "UAE", lang: "English" },
              local: { country_name: "UAE", lang: "English" },
              country_codes: ["bh", "ae", "ye", "om", "qa", "kw"],
            },
            {
              site_code: "AE_AR",
              global: { country_name: "UAE", lang: "Arabic" },
              local: { country_name: "الإمارات ", lang: "العربية" },
              country_codes: ["ae"],
            },
            {
              site_code: "IL",
              global: { country_name: "Israel", lang: "Hebrew" },
              local: { country_name: "ישראל", lang: "עברית" },
              country_codes: ["il"],
            },
            {
              site_code: "SA",
              global: { country_name: "Saudi Arabia", lang: "Arabic" },
              local: { country_name: "المملكة العربية السعودية", lang: "عربي" },
              country_codes: ["sa", "ly"],
            },
            {
              site_code: "SA_EN",
              global: { country_name: "Saudi Arabia", lang: "English" },
              local: { country_name: "Saudi Arabia", lang: "English" },
              country_codes: ["sa"],
            },
            {
              site_code: "TR",
              global: { country_name: "Turkey", lang: "Turkish" },
              local: { country_name: "Türkiye", lang: "Türkçe" },
              country_codes: ["tr"],
            },
            {
              site_code: "IRAN",
              global: { country_name: "Iran", lang: "Persian" },
              local: { country_name: "ایران", lang: "فارسي" },
              country_codes: ["lr"],
            },
            {
              site_code: "LEVANT",
              global: { country_name: "Levant", lang: "English" },
              local: { country_name: "Levant", lang: "English" },
              country_codes: ["lb", "jo", "iq"],
            },
            {
              site_code: "PK",
              global: { country_name: "Pakistan", lang: "English" },
              local: { country_name: "Pakistan", lang: "English" },
              country_codes: ["pk", "af"],
            },
            {
              site_code: "EG",
              global: { country_name: "Egypt", lang: "Arabic" },
              local: { country_name: "البلد مصر", lang: "العربية" },
              country_codes: ["eg", "so", "er"],
            },
            {
              site_code: "LB",
              global: { country_name: "Lebanon", lang: "Lebanon" },
              local: { country_name: "Lebanon", lang: "English" },
              country_codes: ["lb"],
            },
            {
              site_code: "N_AFRICA",
              global: { country_name: "Africa", lang: "French" },
              local: { country_name: "Maroc", lang: "Français" },
              country_codes: ["ma", "dz", "tn"],
            },
            {
              site_code: "AFRICA_EN",
              global: { country_name: "Africa Pan", lang: "English" },
              local: { country_name: "Africa", lang: "English" },
              country_codes: [
                "gh",
                "gm",
                "na",
                "ng",
                "lr",
                "mw",
                "bw",
                "sz",
                "sl",
                "et",
                "ug",
                "zm",
                "zw",
                "ke",
                "tz",
              ],
            },
            {
              site_code: "AFRICA_FR",
              global: { country_name: "Africa Pan", lang: "French" },
              local: { country_name: "Afrique", lang: "Français" },
              country_codes: [
                "ga",
                "gn",
                "ne",
                "rw",
                "re",
                "mg",
                "yt",
                "ml",
                "mu",
                "mr",
                "bj",
                "bi",
                "bf",
                "sn",
                "sc",
                "cf",
                "dj",
                "td",
                "cm",
                "km",
                "ci",
                "cg",
                "cd",
                "tg",
              ],
            },
            {
              site_code: "AFRICA_PT",
              global: { country_name: "Africa Pan", lang: "Portuguese" },
              local: { country_name: "África", lang: "Português" },
              country_codes: ["gw", "mz", "ao", "cv"],
            },
            {
              site_code: "ZA",
              global: { country_name: "South Africa", lang: "English" },
              local: { country_name: "South Africa", lang: "English" },
              country_codes: ["za"],
            },
            {
              site_code: "US",
              global: { country_name: "USA", lang: "English" },
              local: { country_name: "USA", lang: "English" },
              country_codes: ["us"],
            },
            {
              site_code: "CN",
              global: { country_name: "China", lang: "Chinese" },
              local: { country_name: "中国", lang: "中文" },
              country_codes: ["cn"],
            },
            {
              site_code: "SEC",
              global: { country_name: "Korea", lang: "Korean" },
              local: { country_name: "대한민국", lang: "한국어" },
              country_codes: ["kr"],
            },
            {
              site_code: "PH",
              global: { country_name: "Philippines", lang: "English" },
              local: { country_name: "Philippines", lang: "English" },
              country_codes: ["ph"],
            },
            {
              site_code: "VE",
              global: { country_name: "Venezuela", lang: "English" },
              local: { country_name: "Venezuela", lang: "English" },
              country_codes: ["sg", "ve"],
            },
          ];
        return {
          init: function (e, o) {
            (this.$container = e).length &&
              !this.$container.data("initialized") &&
              t &&
              ((this.options = _.extend(a, o || {})),
              this.assignedHTMLElements(),
              this.initProperties(),
              this.bindEvents(),
              (this.isAcceptedGeo() || this.isLocalLanguageSite()) &&
                this.$geoSelectWrap.remove(),
              this.isAcceptedCountries() &&
                (this.$geoMsgCookie.remove(), this.$geoMsgCookieSebn.remove()),
              this.setCountryInfo(),
              this.append(),
              this.onSlide(),
              this.$container.attr("data-initialized", !0));
          },
          assignedHTMLElements: function () {
            var e = this.$container,
              t = this.options;
            (this.$body = o("body")),
              (this.$contryNameWrap = e.find(t.countryNameWrap)),
              (this.$visitBtnsWrap = e.find(t.visitBtnsWrap)),
              (this.$cookieGeoClose = e.find(t.closeBtn)),
              (this.$selectBtnWrap = e.find(t.selectListWrap)),
              (this.$selectListHead = e.find(t.selectListHead)),
              (this.$geoSelectWrap = e.find(t.geoSelectWrap)),
              (this.$selectListToggleBtn = e.find(t.selectListToggleBtn)),
              (this.$geoMsgCookie = e.find(t.geoMsgCookie)),
              (this.$geoMsgCookieSebn = e.find(t.geoMsgCookieSebn));
          },
          initProperties: function () {
            var o = this.options.cookies;
            (this.testSiteCd = this.getParam(o.siteCode)),
              (this.currentSiteCode = t.toLowerCase()),
              (this.visitCountryCode = this.testSiteCd
                ? this.testSiteCd
                : e.Cookies(o.countryCodes)
                ? e.Cookies(o.countryCodes).toLowerCase()
                : "us"),
              (this.currentCountrySiteInfo = []),
              (this.visitCountrySiteInfo = []),
              (this.selectedSiteCode = ""),
              (this.acceptedCountries = []),
              e.Cookies(o.acceptedCountries) &&
                (this.acceptedCountries = e
                  .Cookies(o.acceptedCountries)
                  .split(","));
          },
          isLocalLanguageSite: function () {
            return this.currentSiteCode === this.visitCountryCode;
          },
          isSameSiteGroup: function () {
            var e = this.visitCountrySiteInfo,
              t = this.currentCountrySiteInfo[0],
              n = !1;
            return (
              t &&
                o.each(t.country_codes, function (t, a) {
                  var i = a;
                  o.each(e, function (e, t) {
                    o.inArray(i, t.country_codes) >= 0 && (n = !0);
                  });
                }),
              n
            );
          },
          setCountryInfo: function () {
            o.each(
              i,
              o.proxy(function (e, t) {
                var n = t.country_codes,
                  a = t.site_code.toLowerCase(),
                  i = t;
                o.each(
                  n,
                  o.proxy(function (e, o) {
                    a === this.currentSiteCode &&
                      this.currentCountrySiteInfo.push(i),
                      o === this.visitCountryCode &&
                        this.visitCountrySiteInfo.push(i);
                  }, this)
                );
              }, this)
            );
          },
          append: function () {
            var e = this.visitCountrySiteInfo,
              t = this.currentCountrySiteInfo[0];
            return e.length && t
              ? (this.$contryNameWrap.text(e[0].global.country_name),
                this.isSameSiteGroup()
                  ? (t = e[0])
                  : this.$visitBtnsWrap.html(
                      '<button type="button" site_cd="' +
                        t.site_code.toLowerCase() +
                        '" data-link_id="cookie_bar_choose_contry" data-link_position="cookie_bar>country_code>' +
                        t.site_code.toLowerCase() +
                        '"  data-link_cat="cookie-bar"data-link_meta="link_name:Visit ' +
                        t.local.country_name +
                        "/" +
                        t.local.lang +
                        '" title="Visit ' +
                        t.local.country_name +
                        "/" +
                        t.local.lang +
                        ' site" class="cm-cookie-geo__list-cta"><span>' +
                        t.local.country_name +
                        ' <span class="lang">/ ' +
                        t.local.lang +
                        "</span></span></button>"
                    ),
                this.$selectListHead.html(
                  t.local.country_name +
                    ' <span class="lang">/ ' +
                    t.local.lang +
                    "</span>"
                ),
                o.each(
                  e,
                  o.proxy(function (e, o) {
                    this.$visitBtnsWrap.append(
                      '<button type="button" site_cd="' +
                        o.site_code.toLowerCase() +
                        '" data-link_id="cookie_bar_choose_contry" data-link_position="cookie_bar>country_code>' +
                        o.site_code.toLowerCase() +
                        '"  data-link_cat="cookie-bar"data-link_meta="link_name:Visit ' +
                        o.local.country_name +
                        "/" +
                        o.local.lang +
                        '" title="Visit ' +
                        o.local.country_name +
                        "/" +
                        o.local.lang +
                        ' site" class="cm-cookie-geo__list-cta"><span>' +
                        o.local.country_name +
                        ' <span class="lang">/ ' +
                        o.local.lang +
                        "</span></span></button>"
                    );
                  }, this)
                ),
                void (
                  this.$visitBtnsWrap.find("button").length > 2 &&
                  this.$container.addClass("cm-cookie-geo--selectbox")
                ))
              : void this.$geoSelectWrap.remove();
          },
          bindEvents: function () {
            this.$cookieGeoClose.on(
              "click",
              o.proxy(this.onCloseBtnClick, this)
            ),
              this.$visitBtnsWrap.on(
                "click",
                "button",
                o.proxy(this.onSelectBtnsClick, this)
              ),
              this.$selectListToggleBtn.on(
                "click",
                o.proxy(this.selectListOpen, this)
              );
          },
          onCloseBtnClick: function () {
            var t = this.options.cookies;
            o.inArray(this.currentSiteCode, this.acceptedCountries) < 0 &&
              this.acceptedCountries.push(this.currentSiteCode),
              e.Cookies(t.accepted, "true", { expires: 90, path: "/" }),
              e.Cookies(t.commonaccepted, "true", { expires: 90, path: "/" }),
              e.Cookies(t.acceptedCountries, this.acceptedCountries.join(","), {
                expires: 90,
                path: "/",
              }),
              this.offSlide();
          },
          onSelectBtnsClick: function (t) {
            var n = this.options.cookies;
            (this.selectedSiteCode = o(t.currentTarget).attr(n.siteCode)),
              o.inArray(this.currentSiteCode, this.acceptedCountries) < 0 &&
                this.acceptedCountries.push(this.currentSiteCode),
              e.Cookies(n.accepted, "true", { expires: 90, path: "/" }),
              e.Cookies(n.commonaccepted, "true", { expires: 90, path: "/" }),
              e.Cookies(n.acceptedCountries, this.acceptedCountries.join(","), {
                expires: 90,
                path: "/",
              }),
              this.setParamsCookie(n.siteCode, this.selectedSiteCode, {
                expires: 999,
                path: "/",
              });
          },
          isAcceptedGeo: function () {
            return !!e.Cookies(this.options.cookies.accepted);
          },
          isAcceptedCommon: function () {
            return !!e.Cookies(this.options.cookies.commonaccepted);
          },
          isAcceptedCountries: function () {
            return o.inArray(this.currentSiteCode, this.acceptedCountries) < 0
              ? !1
              : !0;
          },
          setParamsCookie: function (e, o, t) {
            var n = new Date(),
              a = "https://www.samsung.com/" + this.selectedSiteCode;
            n.setDate(n.getDate() + parseInt(t)),
              (document.cookie =
                e +
                "=" +
                escape(o) +
                "; path=/; expires=" +
                n.toGMTString() +
                ";"),
              (window.location.href = a);
          },
          getParam: function (e) {
            var o = {};
            return (
              document.location.search.replace(
                /\??(?:([^=]+)=([^&]*)&?)/g,
                function () {
                  function e(e) {
                    return decodeURIComponent(e.split("+").join(" "));
                  }
                  o[e(arguments[1])] = e(arguments[2]);
                }
              ),
              o[e]
            );
          },
          onSlide: function () {
            this.$body.addClass("cookie-warning");
          },
          offSlide: function () {
            this.$body.removeClass("cookie-warning");
          },
          selectListToggle: function () {
            this.$selectBtnWrap.toggleClass("s-select-open");
          },
          selectListOpen: function () {
            var e = this.options.selectListOpenClass,
              t = this.$selectBtnWrap;
            if (t.is(o("." + e))) return void this.selectListClose();
            this.$selectBtnWrap.addClass(e);
            var a = n.winSize().h - t.offset().top + o(window).scrollTop(),
              i =
                this.$visitBtnsWrap.find("button").outerHeight() *
                this.$visitBtnsWrap.find("button").length;
            i > a && t.addClass("s-fixed"),
              this.$visitBtnsWrap.find("button").eq(0).focus();
          },
          selectListClose: function () {
            this.$selectBtnWrap.removeClass(this.options.selectListOpenClass),
              this.$selectBtnWrap.removeClass("s-fixed");
          },
        };
      })()),
        o(function () {});
    })(window, jQuery);
  });
try {
  !(function (e, o) {
    o(function () {
      var e = (function () {
        var e = {
            psmetaTag:
              '<meta name="ps-key" content="955"><meta name="ps-country" content="US" /><meta name="ps-language" content="en" />',
            psScript:
              '<script src="//cdn.pricespider.com/1/lib/ps-widget.js" async></script>',
            psHtml:
              '<div class="ps-widget" ps-sku="$" ps-config="5d4487f469b5470013581604"></div>',
          },
          t = o(".omni-lead-gen"),
          n = o(".omni-lead-gen__wrap__button-wrap__right__cta"),
          a = o(".omni-lead-gen-checkbox"),
          i = o(".omni-lead-gen .success-step"),
          s = o(".omni-lead-gen .form-step"),
          r = {
            fullname: { value: "", isValid: !1, regex: /^[A-Za-z\s]+$/ },
            email: {
              value: "",
              isValid: !1,
              regex:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
            phone: { value: "", isValid: !0, regex: /^$|\d{3}-\d{3}-\d{4}/ },
          },
          l = {
            formSend: !1,
            createDate: new Date().getTime(),
            config: { number: 0, score: 0, name: "configurator" },
            offers: { number: 0, score: 0, name: "offer" },
            pdp: { number: 0, score: 0, name: "pdp" },
            srp: { number: 0, score: 0, name: "search result page" },
            mkt: { number: 0, score: 0, name: "marketing" },
          },
          c = {
            NON: "Galaxy Note 10",
            NON1: "Galaxy Note 9",
            SN: "Galaxy S10/S10E",
            SN1: "Galaxy S9",
            SPN: "Galaxy S10+/S10 5G",
            SPN1: "Galaxy S9+",
          },
          d = "",
          u = 1,
          p = "meet representative for purchase",
          m = "Galaxy S10",
          g =
            (window.Cookies("tgt_bbmobile")
              ? c[window.Cookies("tgt_bbmobile").split("|")[1]]
              : "",
            "https://elite-service.ecom-mobile-samsung.com/proxy/"),
          T = { type: "E", qualifying: !1 };
        !(function () {
          window.location.href.indexOf("www.samsung.com") < 0 &&
            (g =
              "https://int-01-ue1-elite-service-app.ecom.gin-dev.com/proxy/");
        })();
        var h = function (e) {
            return o.ajax({
              url: g + "api/v1/oauth2/" + e + "/storerepprofile",
              type: "GET",
            });
          },
          b = function (e) {
            return o.ajax({
              url: g + "api/v1/oauth2/leadevents",
              type: "POST",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(e),
            });
          },
          S = function () {
            return "undefined" != typeof localStorage ? !0 : !1;
          },
          f = function () {
            var e = _.cloneDeep(l);
            S() &&
              localStorage.getItem("leadGen") &&
              (e = _.merge(
                _.cloneDeep(l),
                JSON.parse(localStorage.getItem("leadGen"))
              ));
            var n =
              Math.floor((new Date().getTime() - e.createDate) / 864e5) < 1;
            if (
              (n || (e = _.cloneDeep(l)),
              o("#pdp-page").length > 0 &&
              (/^SM-G97((?!TMB).)*$/.test(o("#pdp-page").data("prodid")) ||
                /^SM-N97((?!TMB).)*$/.test(o("#pdp-page").data("prodid")) ||
                /^SM-F900/.test(o("#pdp-page").data("prodid")))
                ? ((d = "pdp"),
                  (u = 15),
                  o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                    "data-link_position",
                    o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                      "data-link_position"
                    ) +
                      ">poi:" +
                      o("#pdp-page").data("prodid")
                  ),
                  /^SM-N97.*[^TMB]$/.test(o("#pdp-page").data("prodid")) &&
                    ((m = "Galaxy Note10"),
                    t.find(".galaxy-series").text("Note10"),
                    t.addClass("sales-pitch-show"),
                    t
                      .find('[data-link_position^="Galaxy s10"]')
                      .each(function (e, t) {
                        var n = this;
                        o(n).attr(
                          "data-link_position",
                          _.replace(
                            o(n).attr("data-link_position"),
                            "Galaxy s10",
                            "Galaxy Note10"
                          )
                        );
                      })),
                  /^SM-F900/.test(o("#pdp-page").data("prodid")) &&
                    ((m = "Galaxy Fold"),
                    t.find(".galaxy-series").text("Fold"),
                    t
                      .find('[data-link_position^="Galaxy s10"]')
                      .each(function (e, t) {
                        var n = this;
                        o(n).attr(
                          "data-link_position",
                          _.replace(
                            o(n).attr("data-link_position"),
                            "Galaxy s10",
                            "Galaxy Fold"
                          )
                        );
                      })))
                : o("#offers-page").length > 0
                ? ((d = "offers"), (u = 10))
                : o("#config-page").length > 0
                ? ((d = "config"),
                  (u = 10),
                  /^SM-N97.*[^TMB]$/.test(o("#config-page").data("prodid")) &&
                    ((m = "Galaxy Note10"),
                    t.addClass("sales-pitch-show"),
                    t.find(".galaxy-series").text("Note10"),
                    o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                      "data-link_position",
                      o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                        "data-link_position"
                      ) +
                        ">poi:" +
                        o("#config-page").data("prodid")
                    ),
                    t
                      .find('[data-link_position^="Galaxy s10"]')
                      .each(function (e, t) {
                        var n = this;
                        o(n).attr(
                          "data-link_position",
                          _.replace(
                            o(n).attr("data-link_position"),
                            "Galaxy s10",
                            "Galaxy Note10"
                          )
                        );
                      })),
                  o(".StoreLocator__ctaStore___2FjmZ[data-modelcode]").length >
                    0 &&
                    o("#config-page").attr(
                      "data",
                      o(".StoreLocator__ctaStore___2FjmZ[data-modelcode]").data(
                        "modelcode"
                      )
                    ))
                : o("#srp-page").length > 0
                ? (d = "srp")
                : o("#mkt-page").length > 0 &&
                  ((d = "mkt"),
                  (u = o("#mkt-page").data("weight")),
                  o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                    "data-link_position",
                    o(".omni-lead-gen__wrap__button-wrap__right__cta").attr(
                      "data-link_position"
                    ) +
                      ">poi:" +
                      o("#mkt-page").data("prodid")
                  ),
                  /^SM-N97.*[^TMB]$/.test(o("#mkt-page").data("prodid")) &&
                    ((m = "Galaxy Note10"),
                    t.addClass("sales-pitch-show"),
                    t.find(".galaxy-series").text("Note10"),
                    t
                      .find('[data-link_position^="Galaxy s10"]')
                      .each(function (e, t) {
                        var n = this;
                        o(n).attr(
                          "data-link_position",
                          _.replace(
                            o(n).attr("data-link_position"),
                            "Galaxy s10",
                            "Galaxy Note10"
                          )
                        );
                      })),
                  /^SM-F900/.test(o("#mkt-page").data("prodid")) &&
                    ((m = "Galaxy Fold"),
                    t.find(".galaxy-series").text("Fold"),
                    t
                      .find('[data-link_position^="Galaxy s10"]')
                      .each(function (e, t) {
                        var n = this;
                        o(n).attr(
                          "data-link_position",
                          _.replace(
                            o(n).attr("data-link_position"),
                            "Galaxy s10",
                            "Galaxy Fold"
                          )
                        );
                      }))),
              d && window.Cookies("tgt_bbmobile"))
            ) {
              e[d].number++,
                (e[d].score = e[d].score + u),
                (e.createDate = new Date().getTime());
              var a = e.mkt.score + e.pdp.score + e.config.score,
                i = function () {
                  window.utag
                    ? window.utag.view({
                        leadgenscore: "lgs:" + a + " | lgt:" + e[d].name,
                        leadgencookie: window.Cookies("tgt_bbmobile"),
                        cartEmpty: o(".cart-basket").text() ? "false" : "true",
                      })
                    : setTimeout(i, 500);
                };
              i();
            }
            localStorage.setItem("leadGen", JSON.stringify(e));
          },
          y = function () {
            var e = JSON.parse(localStorage.getItem("leadGen")),
              t =
                !o(".cart-basket").text() &&
                parseInt(window.Cookies("lead-gen") || "0") < 3 &&
                e.mkt.score + e.pdp.score + e.config.score > 15 &&
                !e.formSend &&
                window.Cookies("tgt_bbmobile");
            return t;
          },
          C = function () {
            y() &&
              ("pdp" === d || "config" === d
                ? ((T.type = "P"), t.addClass("potential"), (T.qualifying = !0))
                : "mkt" === d &&
                  ((T.type = "E"),
                  t.addClass("explore"),
                  (p = "meet representative for try out"),
                  (T.qualifying = !0),
                  t.find(".galaxy-series").text("device")));
          },
          v = function () {
            var t = e.psHtml.replace(
              "$",
              o("[data-prodid]").data("prodid") || ""
            );
            o(".omni-lead-gen__wrap__content__ps")
              .append(t)
              .ready(function () {
                o("head").append(e.psmetaTag).append(e.psScript);
              });
          },
          P = function () {
            window.checkAddress = setInterval(function () {
              o(".ps-map-pushpin-select").length > 0 &&
                (A(), clearInterval(window.checkAddress));
            }, 500);
          },
          A = function () {
            o(".ps-radio-button:checked")
              .closest(".ps-map-pushpin-select")
              .data("store")
              ? h(
                  o(".ps-radio-button:checked")
                    .closest(".ps-map-pushpin-select")
                    .data("store")
                )
                  .success(function (e) {
                    if (e) {
                      t
                        .find(".omni-lead-gen__wrap__sub__avatar")
                        .attr("src", e.RepAvatarUrl),
                        t.find(".rep-name").text(e.RepFullName),
                        t.find(".store-name").text(e.StoreName),
                        s.removeClass("nolocation"),
                        t.find(".form-step").attr("data-eliteid", e.StoreId),
                        t.find(".omni-lead-gen-close").each(function (e, t) {
                          var n = this;
                          o(n).attr(
                            "data-link_position",
                            _.replace(
                              o(n).attr("data-link_position"),
                              "share zip code",
                              "customer info"
                            )
                          );
                        });
                      var n = {
                        pagename_v2: m + ">" + p + ">customer info overlay",
                      };
                      G(n, !0);
                    } else s.addClass("nolocation"), t.find(".omni-lead-gen__wrap__sub__subtitle").text("Samsung representatives unavailable at this store right now. Try a different store.");
                  })
                  .fail(function (e) {})
              : (t
                  .find(".omni-lead-gen__wrap__sub__subtitle")
                  .html(
                    "A Samsung expert at Best Buy will call to schedule your " +
                      m +
                      " try out. <br>Please share your ZIP Code to find a nearby Best Buy to try out your next phone."
                  ),
                s.addClass("nolocation"));
          },
          w = function (e, t) {
            (r[e].value = t),
              (r[e].isValid = r[e].regex.test(t)),
              r[e].isValid
                ? o(
                    '.omni-lead-gen__wrap__content__form__input[name="' +
                      e +
                      '"]'
                  ).removeClass("invalid")
                : o(
                    '.omni-lead-gen__wrap__content__form__input[name="' +
                      e +
                      '"]'
                  ).addClass("invalid");
            var a =
              _.filter(r, function (e) {
                return e.isValid === !0;
              }).length === _.size(r);
            a ? n.attr("disabled", !1) : n.attr("disabled", !0);
          },
          G = function (e, o) {
            o
              ? window.utag && window.utag.view({ pagename_v2: e.pagename_v2 })
              : window.utag &&
                window.utag.link({
                  link_cat: e.cat,
                  link_id: e.id,
                  link_meta: e.meta,
                  link_position: e.position,
                });
          },
          M = function () {
            o(".omni-lead-gen-close").on("click", function (e) {
              e.preventDefault(),
                t.removeClass("active"),
                o("body, html").removeClass("fixed-lead-gen"),
                window.Cookies("lead-gen")
                  ? window.Cookies(
                      "lead-gen",
                      parseInt(window.Cookies("lead-gen")) + 1,
                      { expires: 1, path: "/", domain: ".samsung.com" }
                    )
                  : window.Cookies("lead-gen", 1, {
                      expires: 1,
                      path: "/",
                      domain: ".samsung.com",
                    });
            }),
              o(".omni-lead-gen__wrap__content__form__input[name=phone]").mask(
                "000-000-0000"
              ),
              o(".omni-lead-gen__wrap__content__form__input").on(
                "input",
                function (e) {
                  o(".omni-lead-gen .server-error").text("").hide(),
                    w(e.target.name, e.target.value);
                }
              ),
              o(".omni-lead-gen__wrap__content__form__input").on(
                "click",
                function (e) {
                  var o = {
                      fullname: "enter name",
                      email: "enter email",
                      phone: "enter phone number",
                    },
                    t = o[e.target.name];
                  G({
                    cat: p,
                    id: t,
                    meta: "link_name:" + t,
                    position: m + ">" + p + ">customer info",
                  });
                }
              ),
              n.on("click", function () {
                n.attr("disabled", !0),
                  o(".omni-lead-gen .spinnerHolder").show();
                var e = a.is(":checked"),
                  l =
                    (t.find(".form-step").data("eliteid").toString(),
                    o(".ps-radio-button:checked")
                      .closest(".ps-map-pushpin-select")
                      .data("store")
                      .toString()),
                  c = m;
                o("#pdp-page").length > 0 &&
                  (c = o(".ps-radio-button:checked")
                    .closest(".ps-map-pushpin-select")
                    .data("name"));
                var d =
                    (o(".ps-radio-button:checked")
                      .closest(".ps-map-pushpin-select")
                      .data("retailer"),
                    "E" === T.type
                      ? c + "|"
                      : c + "|" + o("[data-prodid]").data("prodid") || ""),
                  u =
                    (o(".ps-radio-button:checked")
                      .closest(".ps-map-pushpin-select")
                      .find(".ps-address"),
                    {
                      name: r.fullname.value,
                      email: r.email.value,
                      phone: r.phone.value,
                      userOptIn: e,
                      storeId: l,
                      interestedProducts: [d],
                      persona: "E" === T.type ? "Explorer" : "Buyer",
                      visitorId: visitor
                        ? visitor.getMarketingCloudVisitorID()
                        : "",
                    });
                "Galaxy Note10" === m &&
                  ((u.promotion = {}),
                  (u.promotion.Name = "Spotify promotion"),
                  (u.promotion.Description =
                    "Buy the Samsung Galaxy Note10/Note10+ and get 6 months of Spotify Premium for free.")),
                  b(u)
                    .success(function (e) {
                      if (200 === e.HttpStatus) {
                        o(".omni-lead-gen .spinnerHolder").hide();
                        var t = o(".ps-radio-button:checked")
                          .closest(".ps-map-pushpin-select")
                          .find(".ps-address")
                          .children()
                          .first();
                        t.children("a").remove(),
                          o(".omni-lead-gen__wrap__sub__msg.second").html(t),
                          s.hide(),
                          i.show();
                        var n = e.RelatedData || "",
                          a = {
                            pagename_v2:
                              m +
                              ">" +
                              p +
                              ">meet confirmation overlay | lgi:" +
                              n,
                          };
                        G(a, !0);
                      } else o(".omni-lead-gen .spinnerHolder").hide(), o(".omni-lead-gen .server-error").text("Oops, something went wrong, please try later.").show();
                    })
                    .fail(function (e) {
                      o(".omni-lead-gen .spinnerHolder").hide(),
                        o(".omni-lead-gen .server-error")
                          .text("Oops, something went wrong, please try later.")
                          .show();
                    });
              });
          },
          k = function () {
            T.qualifying &&
              (o('.gnb-header a[href]:not(a[href^="#"])').on(
                "click",
                function (e) {
                  if (
                    (e.preventDefault(),
                    o("body").hasClass("lead-gen-generated"))
                  )
                    window.location.href = o(this).attr("href");
                  else {
                    v(),
                      t.addClass("active"),
                      o("body").addClass("lead-gen-generated"),
                      o("body, html").addClass("fixed-lead-gen"),
                      P();
                    var n = JSON.parse(localStorage.getItem("leadGen")),
                      a = n.mkt.score + n.pdp.score + n.config.score,
                      i = {
                        pagename_v2:
                          m + ">" + p + ">share zip code overlay | lgs:" + a,
                      };
                    G(i, !0);
                  }
                }
              ),
              setTimeout(function () {
                if (!o("body").hasClass("lead-gen-generated")) {
                  v(),
                    t.addClass("active"),
                    o("body").addClass("lead-gen-generated"),
                    o("body, html").addClass("fixed-lead-gen"),
                    P();
                  var e = JSON.parse(localStorage.getItem("leadGen")),
                    n = e.mkt.score + e.pdp.score + e.config.score,
                    a = {
                      pagename_v2:
                        m + ">" + p + ">share zip code overlay | lgs:" + n,
                    };
                  G(a, !0);
                }
              }, 15e3));
          },
          H = function () {
            o(".omni-lead-gen__wrap__content__ps").on(
              "keydown",
              ".ps-map-location-textbox",
              function (e) {
                13 == e.which &&
                  setTimeout(function () {
                    A(),
                      G({
                        cat: p,
                        id: o(".ps-map-location-textbox").val(),
                        meta:
                          "link_name:" + o(".ps-map-location-textbox").val(),
                        position: m + ">" + p + ">share zip code",
                      });
                  }, 1e3);
              }
            ),
              o(".omni-lead-gen__wrap__content__ps").on(
                "click",
                ".ps-map-location-button",
                function () {
                  setTimeout(function () {
                    G({
                      cat: p,
                      id: o(".ps-map-location-textbox").val(),
                      meta: "link_name:" + o(".ps-map-location-textbox").val(),
                      position: m + ">" + p + ">share zip code",
                    });
                  }, 500),
                    setTimeout(function () {
                      A();
                    }, 1e3);
                }
              ),
              o(".omni-lead-gen__wrap__content__ps").on(
                "click",
                ".ps-radio-button",
                function () {
                  G({
                    cat: p,
                    id: o(this).closest(".ps-map-pushpin-select").data("store"),
                    meta:
                      "link_name:" +
                      o(this).closest(".ps-map-pushpin-select").data("store"),
                    position: m + ">" + p + ">customer info",
                  }),
                    setTimeout(function () {
                      A();
                    }, 1e3);
                }
              ),
              o(".omni-lead-gen-checkbox-label input").on("click", function () {
                var e = o(this).is(":checked") ? "selected" : "unselected";
                G({
                  cat: p,
                  id: "checkbox " + e,
                  meta: "link_name:checkbox " + e,
                  position: m + ">" + p + ">customer info",
                });
              });
          },
          B = function () {
            f(), C(), T.qualifying && (M(), k(), H());
          };
        return { init: B };
      })();
      o(window).on("load", function () {
        try {
          o(".omni-lead-gen").length > 0 && e.init();
        } catch (t) {}
      });
    });
  })(window, window.jQuery);
} catch (e) {}

window.Granite = window.Granite || {};

(function(Granite, $) {
    Granite.Util = (function() {

        var self = {
            patchText: function(text, snippets) {
                if (snippets) {
                    if (!$.isArray(snippets)) {
                        text = text.replace("{0}", snippets);
                    } else {
                        for (var i = 0; i < snippets.length; i++) {
                            text = text.replace(("{" + i + "}"), snippets[i]);
                        }
                    }
                }
                return text;
            }

        };

        return self;

    }());

}(Granite, jQuery));


(function (Granite, util, $) {
    Granite.HTTP = (function() {
        var contextPath = null,
            SCRIPT_URL_REGEXP = /^(?:http|https):\/\/[^\/]+(\/.*)\/(?:etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs).*\.js(\?.*)?$/,
            ENCODE_PATH_REGEXP = /[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/,
            loginRedirected = false,
            self = {};
        self.getSchemeAndAuthority = function (url) {
            var end;

            try {
                if (url.indexOf("://") === -1) return ""; // e.g. url was /en.html
                end = url.indexOf("/", url.indexOf("://") + 3);

                return (end === -1) ?
                    url :   // e.g. url was http://www.day.com
                    url.substring(0, end);  // e.g. url was http://www.day.com/en.html
            }
            catch (e) {
                return "";
            }
        };
        self.getContextPath = function () {
            return contextPath;
        };
        self.detectContextPath = function () {
            try {
                if (window.CQURLInfo) {
                    contextPath = CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        // in IE the first script is not the expected widgets js: loop
                        // until it is found
                        var result = SCRIPT_URL_REGEXP.exec(scripts[i].src);
                        if (result) {
                            contextPath = result[1];
                            return;
                        }
                    }
                    contextPath = "";
                }
            } catch (e) {
            }
        };
        self.externalize = function (url) {
            try {
                if (url.indexOf("/") === 0 && contextPath &&
                    url.indexOf(contextPath + "/") !== 0) {
                    url = contextPath + url;
                }
            }
            catch (e) {
            }
            return url;
        };
        self.internalize = function (url, doc) {
            if (url.charAt(0) === '/') {
                if (contextPath === url) {
                    return '';
                }
                else if (contextPath && url.indexOf(contextPath + "/") === 0) {
                    return url.substring(contextPath.length);
                } else {
                    return url;
                }
            }

            if (!doc) doc = document;
            var docHost = self.getSchemeAndAuthority(doc.location.href);
            var urlHost = self.getSchemeAndAuthority(url);
            if (docHost === urlHost) {
                return url.substring(urlHost.length + (contextPath ? contextPath.length : 0));
            }
            else {
                return url;
            }
        };
        self.getPath = function (url) {

            if (!url) {
                if (window.CQURLInfo && CQURLInfo.requestPath) {
                    return CQURLInfo.requestPath;
                } else {
                    url = window.location.pathname;
                }
            } else {
                url = self.removeParameters(url);
                url = self.removeAnchor(url);
            }

            url = self.internalize(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i !== -1) {
                url = url.substring(0, i);
            }
            return url;
        };
        self.removeAnchor = function (url) {
            if (url.indexOf("#") !== -1) {
                return url.substring(0, url.indexOf("#"));
            }
            return url;
        };
        self.removeParameters = function (url) {
            if (url.indexOf("?") !== -1) {
                return url.substring(0, url.indexOf("?"));
            }
            return url;
        };
        self.encodePathOfURI = function (url) {
            var parts, delim;
            if (url.indexOf("?") !== -1) {
                parts = url.split("?");
                delim = "?";
            }
            else if (url.indexOf("#") !== -1) {
                parts = url.split("#");
                delim = "#";
            }
            else {
                parts = [url];
            }
            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = self.encodePath(parts[0]);
            }
            return parts.join(delim);
        };
       self.encodePath = function (path) {
            path = encodeURI(path).replace(/%5B/g, '[').replace(/%5D/g, ']');
            path = path.replace(/\+/g, "%2B");
            path = path.replace(/\?/g, "%3F");
            path = path.replace(/;/g, "%3B");
            path = path.replace(/#/g, "%23");
            path = path.replace(/=/g, "%3D");
            path = path.replace(/\$/g, "%24");
            path = path.replace(/,/g, "%2C");
            path = path.replace(/'/g, "%27");
            path = path.replace(/"/g, "%22");
            return path;
       };
        self.handleLoginRedirect = function () {
            if (!loginRedirected) {
                loginRedirected = true;
                alert(Granite.I18n.get("Your request could not be completed because you have been signed out."));
                var l = util.getTopWindow().document.location;
                l.href = self.externalize(sling.LOGIN_URL) +
                    "?resource=" + encodeURIComponent(l.pathname + l.search + l.hash);
            }
        };
        self.getXhrHook = function (url, method, params) {
            method = method || "GET";
            if (window.G_XHR_HOOK && $.isFunction(G_XHR_HOOK)) {
                var p = {
                    "url": url,
                    "method": method
                };
                if (params) {
                    p["params"] = params;
                }
                return G_XHR_HOOK(p);
            }
            return null;
        };

        self.eval = function(response) {
            if (typeof response !== "object") {
                response = $.ajax({
                    url: response,
                    type: 'get',
                    async: false
                });
            }
            try {
                return eval("(" + (response.body ? response.body :
                    response.responseText) + ")");
            } catch (e) {
            }
            return null;
        };

        return self;
    }());

}(Granite, Granite.Util, jQuery));

(function(document, Granite, util, http, $) {

    Granite.I18n = (function() {

         var dicts = {},

            //urlPrefix = "/libs/cq/i18n/dict.",
            urlPrefix = "/aemapi/v6/common/i18n/dict.",	// UPDATE 2019.07.18 i18n export url 변경 ex)/aemapi/v6/common/i18n/dict.uk.b2c.json

            urlBaseNameSelector = ".b2c",

            urlSuffix = ".json",

            manualLocale = undefined,

            pseudoTranslations = false,

            languages = null,

            self = {},

            manualDictionary = false,

            getDictionaryUrl = function(locale) {
                if($("#i18nAppsParam").val() && $("#i18nAppsParam").val().length > -1){
                    urlBaseNameSelector +=  "." + $("#i18nAppsParam").val();
	     	 	}

                if (manualDictionary) {
                    return urlPrefix + locale + urlBaseNameSelector + urlSuffix;
                }

                var dictionarySrc = $("html").attr("data-i18n-dictionary-src");

                if (!dictionarySrc) {
                    return urlPrefix + locale + urlBaseNameSelector + urlSuffix;
                }

                return dictionarySrc.replace("{locale}", encodeURIComponent(locale)).replace("{+locale}", locale);
            };

        self.LOCALE_DEFAULT = "en";

        self.PSEUDO_LANGUAGE = "zz";

        self.PSEUDO_PATTERN_KEY = "_pseudoPattern_";

        self.init = function(config) {
            config = config || {};

            this.setLocale(config.locale);
            this.setUrlPrefix(config.urlPrefix);
            this.setUrlSuffix(config.urlSuffix);
        };

        self.setLocale = function(locale) {
            if (!locale) return;

            manualLocale = $('#language').val() || locale;
        };

        self.getLocale = function() {
            if ($.isFunction(manualLocale)) {
                manualLocale = manualLocale();
            }

            return $('#language').val() || self.LOCALE_DEFAULT;
        };

        self.setUrlPrefix = function(prefix) {
            if (!prefix) return;

            urlPrefix = prefix;
            manualDictionary = true;
        };

        self.setUrlSuffix = function(suffix) {
            if (!suffix) return;

            urlSuffix = suffix;
            manualDictionary = true;
        };

        self.getDictionary = function(locale) {
            locale = locale || self.getLocale();

            if (!dicts[locale]) {
                pseudoTranslations = (locale.indexOf(self.PSEUDO_LANGUAGE) === 0);

                try {
                    var response = $.ajax(getDictionaryUrl(locale), {
                        async: false,
                        dataType: "json"
                    });
                    dicts[locale] = $.parseJSON(response.responseText);
                } catch (e) {}
                if (!dicts[locale]) {
                    dicts[locale] = {};
                }
            }
            return dicts[locale];
        };

        self.get = function(text, snippets, note) {
            var dict, newText, lookupText;

            dict = self.getDictionary();

            lookupText = pseudoTranslations ? self.PSEUDO_PATTERN_KEY :
                note ? text + " ((" + note + "))" :
                text;
            if (dict) {
                newText = dict[lookupText];
            }
            if (!newText) {
                newText = text;
            }
            if (pseudoTranslations) {
                newText = newText.replace("{string}", text).replace("{comment}", note ? note : "");
            }
            return util.patchText(newText, snippets);
        };

        self.getVar = function(text, note) {
            if (!text) {
                return null;
            }
            return self.get(text, null, note);
        };

        self.getLanguages = function() {
            if (!languages) {
                try {
                    var json = http.eval("/libs/wcm/core/resources/languages.overlay.infinity.json");
                    $.each(json, function(name, lang) {
                        lang.title = self.getVar(lang.language);
                        if (lang.title && lang.country && lang.country !== "*") {
                            lang.title += " (" + self.getVar(lang.country) + ")";
                        }
                    });
                    languages = json;
                } catch (e) {
                    languages = {};
                }
            }
            return languages;
        };

        self.parseLocale = function(langCode) {
            if (!langCode) {
                return null;
            }
            var pos = langCode.indexOf("_");
            if (pos < 0) {
                pos = langCode.indexOf("-");
            }

            var language, country;
            if (pos < 0) {
                language = langCode;
                country = null;
            } else {
                language = langCode.substring(0, pos);
                country = langCode.substring(pos + 1);
            }
            return {
                code: langCode,
                language: language,
                country: country
            };
        };

        return self;

    }());

}(document, Granite, Granite.Util, Granite.HTTP, jQuery));

Granite.HTTP.detectContextPath();

/**
 * Copyright (c) 2005 - 2010, James Auldridge
 * All rights reserved.
 *
 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
 *  http://code.google.com/p/cookies/wiki/License
 *
 */
var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};jaaulde.utils.cookies=(function(){var resolveOptions,assembleOptionsString,parseCookies,constructor,defaultOptions={expiresAt:null,path:'/',domain:null,secure:false};resolveOptions=function(options){var returnValue,expireDate;if(typeof options!=='object'||options===null){returnValue=defaultOptions;}else
{returnValue={expiresAt:defaultOptions.expiresAt,path:defaultOptions.path,domain:defaultOptions.domain,secure:defaultOptions.secure};if(typeof options.expiresAt==='object'&&options.expiresAt instanceof Date){returnValue.expiresAt=options.expiresAt;}else if(typeof options.hoursToLive==='number'&&options.hoursToLive!==0){expireDate=new Date();expireDate.setTime(expireDate.getTime()+(options.hoursToLive*60*60*1000));returnValue.expiresAt=expireDate;}if(typeof options.path==='string'&&options.path!==''){returnValue.path=options.path;}if(typeof options.domain==='string'&&options.domain!==''){returnValue.domain=options.domain;}if(options.secure===true){returnValue.secure=options.secure;}}return returnValue;};assembleOptionsString=function(options){options=resolveOptions(options);return((typeof options.expiresAt==='object'&&options.expiresAt instanceof Date?'; expires='+options.expiresAt.toGMTString():'')+'; path='+options.path+(typeof options.domain==='string'?'; domain='+options.domain:'')+(options.secure===true?'; secure':''));};parseCookies=function(){var cookies={},i,pair,name,value,separated=document.cookie.split(';'),unparsedValue;for(i=0;i<separated.length;i=i+1){pair=separated[i].split('=');name=pair[0].replace(/^\s*/,'').replace(/\s*$/,'');try
{value=decodeURIComponent(pair[1]);}catch(e1){value=pair[1];}if(typeof JSON==='object'&&JSON!==null&&typeof JSON.parse==='function'){try
{unparsedValue=value;value=JSON.parse(value);}catch(e2){value=unparsedValue;}}cookies[name]=value;}return cookies;};constructor=function(){};constructor.prototype.get=function(cookieName){var returnValue,item,cookies=parseCookies();if(typeof cookieName==='string'){returnValue=(typeof cookies[cookieName]!=='undefined')?cookies[cookieName]:null;}else if(typeof cookieName==='object'&&cookieName!==null){returnValue={};for(item in cookieName){if(typeof cookies[cookieName[item]]!=='undefined'){returnValue[cookieName[item]]=cookies[cookieName[item]];}else
{returnValue[cookieName[item]]=null;}}}else
{returnValue=cookies;}return returnValue;};constructor.prototype.filter=function(cookieNameRegExp){var cookieName,returnValue={},cookies=parseCookies();if(typeof cookieNameRegExp==='string'){cookieNameRegExp=new RegExp(cookieNameRegExp);}for(cookieName in cookies){if(cookieName.match(cookieNameRegExp)){returnValue[cookieName]=cookies[cookieName];}}return returnValue;};constructor.prototype.set=function(cookieName,value,options){if(typeof options!=='object'||options===null){options={};}if(typeof value==='undefined'||value===null){value='';options.hoursToLive=-8760;}else if(typeof value!=='string'){if(typeof JSON==='object'&&JSON!==null&&typeof JSON.stringify==='function'){value=JSON.stringify(value);}else
{throw new Error('cookies.set() received non-string value and could not serialize.');}}var optionsString=assembleOptionsString(options);document.cookie=cookieName+'='+encodeURIComponent(value)+optionsString;};constructor.prototype.del=function(cookieName,options){var allCookies={},name;if(typeof options!=='object'||options===null){options={};}if(typeof cookieName==='boolean'&&cookieName===true){allCookies=this.get();}else if(typeof cookieName==='string'){allCookies[cookieName]=true;}for(name in allCookies){if(typeof name==='string'&&name!==''){this.set(name,null,options);}}};constructor.prototype.test=function(){var returnValue=false,testName='cT',testValue='data';this.set(testName,testValue);if(this.get(testName)===testValue){this.del(testName);returnValue=true;}return returnValue;};constructor.prototype.setOptions=function(options){if(typeof options!=='object'){options=null;}defaultOptions=resolveOptions(options);};return new constructor();})();(function(){if(window.jQuery){(function($){$.cookies=jaaulde.utils.cookies;var extensions={cookify:function(options){return this.each(function(){var i,nameAttrs=['name','id'],name,$this=$(this),value;for(i in nameAttrs){if(!isNaN(i)){name=$this.attr(nameAttrs[i]);if(typeof name==='string'&&name!==''){if($this.is(':checkbox, :radio')){if($this.attr('checked')){value=$this.val();}}else if($this.is(':input')){value=$this.val();}else
{value=$this.html();}if(typeof value!=='string'||value===''){value=null;}$.cookies.set(name,value,options);break;}}}});},cookieFill:function(){return this.each(function(){var n,getN,nameAttrs=['name','id'],name,$this=$(this),value;getN=function(){n=nameAttrs.pop();return!!n;};while(getN()){name=$this.attr(n);if(typeof name==='string'&&name!==''){value=$.cookies.get(name);if(value!==null){if($this.is(':checkbox, :radio')){if($this.val()===value){$this.attr('checked','checked');}else
{$this.removeAttr('checked');}}else if($this.is(':input')){$this.val(value);}else
{$this.html(value);}}break;}}});},cookieBind:function(options){return this.each(function(){var $this=$(this);$this.cookieFill().change(function(){$this.cookify(options);});});}};$.each(extensions,function(i){$.fn[i]=this;});})(window.jQuery);}})();/* END FILE */

/**
 * 디볼트 language 설정
 */
Granite.I18n.setLocale($('#language').val());

/**
 * currencyComma
 * 
 * @return currencyComma
 */
var currencyComma= function (num, currency) {
    if(currency != null){
        currency = currency.toLowerCase();
    }
    if(num === null || num === ""){
        return "";
    }
    var numStr = String(num);
    var siteCd = $("#siteCode").val();
    if (numStr.indexOf(".") > -1) {
        var numSplit = numStr.split(".");
        if(numSplit.length >1 && numSplit[1].length < 2){
            numStr += "0";
        }else if(numSplit[1].length > 2){
            numStr = Number(numStr).toFixed(2);
        }
    }
    var returnValue = "";
    var multistoreSiteCode = '';
    
    if( siteCd === 'levant' ){
        multistoreSiteCode = 'jo';
    } else if( siteCd === 'levant_ar' ){
        multistoreSiteCode = 'jo_ar';
    } else if( siteCd === 'ae' || siteCd === 'ae_ar' ){
		if($.cookies.get("estoreSitecode")) {
			tempMultistoreSiteCode = $.cookies.get("estoreSitecode").toString();
			//NOTICE : dotcomMultistore 값이 존재 하는 경우 ae, ae_ar, kw, kw_ar, om, om_ar, bh, bh_ar 인 경우만 세팅 
			if(tempMultistoreSiteCode === "ae" || tempMultistoreSiteCode === "ae_ar" || tempMultistoreSiteCode === "kw" || tempMultistoreSiteCode === "kw_ar" || tempMultistoreSiteCode === "om" || tempMultistoreSiteCode === "om_ar" || tempMultistoreSiteCode === "bh" || tempMultistoreSiteCode === "bh_ar" || tempMultistoreSiteCode === "qa" || tempMultistoreSiteCode === "qa_ar") {
				multistoreSiteCode = tempMultistoreSiteCode;
			} else {
				multistoreSiteCode = siteCd;
			}
		} else {
			multistoreSiteCode = siteCd;
		}
    }
    
    switch (currency) {
        case "usd":
            if(siteCd === "n_africa"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ".00";
                }
                return returnValue + " DH";
            }else{
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "$" + returnValue;
            }
        case "cad":
            if (siteCd === "ca_fr") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    returnValue = returnValue.replace(".", ",");
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
                }
                return returnValue + " $";
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "$" + returnValue;
            }
        case "eur":
            var tempSepNum;
            if (siteCd === "de" || siteCd === "es" || siteCd === "be_fr" || siteCd === "it" || siteCd === "pt") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
                
                if( siteCd === "be_fr" ){
                    return returnValue;
                } else {
                    return returnValue + " €";
                }
                
            } else if (siteCd === "fi" || siteCd === "fr" || siteCd === "sk" || siteCd === "at"
                || siteCd === "ee" || siteCd === "lt" || siteCd === "lv" || siteCd === "si" || siteCd === "hr") {
                //ee 에스토니아,lt 리투아니아,lv 라트비아
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
                }
                return returnValue + " €";
            } else if(siteCd === "gr"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "€" + returnValue;
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
                if( siteCd === "be" || siteCd === "nl" ){
                    return returnValue;
                } else {
                    return "€ " + returnValue;
                }
            }
        case "gbp":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "£" + returnValue;
        case "sek":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "dkk":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "nok":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "brl":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
            }
            return "R$ " + returnValue;
        case "inr":
            //var lastThree = "";
            //var otherNumbers = "";
            var naturalNumbers = "";
            var decimalNumbers = ".00";
            if (numStr.indexOf(".") > -1) {
                naturalNumbers = numStr.substring(0, numStr.indexOf("."));
                decimalNumbers = numStr.substring(numStr.indexOf("."));
            } else {
                naturalNumbers = numStr;
            }
            /* // CRHQ-1612 [B2C] 인도 가격내 , 제거 건 => 인도 사이트내 노출되는 가격에 콤마 제거
            if (naturalNumbers.length > 3 && !isNaN(naturalNumbers)) {
                lastThree = "," + naturalNumbers.substring(naturalNumbers.length - 3);
                otherNumbers = naturalNumbers.substring(0, naturalNumbers.length - 3);
            } else {
                lastThree = naturalNumbers;
            }
            returnValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + decimalNumbers;
            */
            returnValue = naturalNumbers + decimalNumbers;
            return "₹" + returnValue;
        case "krw":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return returnValue + "원";
        case "aed":
            if (siteCd === "ae_ar") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                
                if(multistoreSiteCode == 'kw_ar') {
                    return returnValue + " د.ك";
                }else if(multistoreSiteCode == 'om_ar') {
                    return returnValue + " ر.ع.";
                }else if(multistoreSiteCode == 'bh_ar') {
                    return returnValue + " .د.ب";
                }else if(multistoreSiteCode == 'qa_ar') {
                    return returnValue + " ر.ق";
                }else{
                    return returnValue + " د.إ";
                }
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                
                if(multistoreSiteCode == 'kw') {
                    return returnValue + " KD";
                } else if(multistoreSiteCode == 'bh') {
                    return returnValue + " BD";
                } else if(multistoreSiteCode == 'om') {
                    return returnValue + " RO";
                } else if(multistoreSiteCode == 'qa') {
                    return returnValue + " QAR";
                } else {
                    return returnValue + " AED";
                }
            }
        case "rub":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return returnValue + " ₽";
        case "twd":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return "NT$" + returnValue;
        case "czk"://체코
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return returnValue+" Kč";
        case "myr"://말레이시아
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "RM " + returnValue;
        case "idr"://인도네시아
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "Rp " + returnValue;
        case "pln"://폴란드
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
            }
            return returnValue + " zł";
        case "ron"://루마니아
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
            }
            return returnValue + " lei";
        case "php"://필리핀
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "₱" + returnValue;
        case "sar"://sa
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            
            if("sa" == siteCode){
                return returnValue + " ر.س";
            } else {
                return returnValue + " SAR";
            }
        case "pab":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            //returnValue = parseFloat(returnValue).toFixed(2);
            
            return "US$ " + returnValue;
        case "mxn": //México
        	if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "$ " + returnValue;
            break;
        case "ars": //Argentina
            // 20200310
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "$ " + returnValue;
        case "pen": //Perú
            // 20200310
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "s/ " + returnValue;
        case "clp": //Chile
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "$ " + returnValue;
        case "cop": //Colombia
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "$ " + returnValue;
        case "vnd": //동
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return returnValue + " ₫";
        case "chf": //프랑
            if(siteCd === "ch" || siteCd === "ch_fr"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
                return returnValue +" CHF" ;
            }else{
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '\'') + ".00";
                }
                return "CHF " + returnValue;
            }
        case "hkd": //hk, hk_en국가
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "HK$ " + returnValue;
        case "lbp"://levant
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            
            if (multistoreSiteCode == "jo") {
                return returnValue + " JD";
            }else if(multistoreSiteCode == "jo_ar"){
                return returnValue + " د.ا";
            }
            break;
        case "pkr": //pk
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
			return "Rs. " + returnValue;
		case "ils": //il
			if (numStr.indexOf(".") > -1) {
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} else {
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
			}
			return returnValue + " ₪";
		case "kzt":
			/* kz_kz, kz_ru */
			returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
			return returnValue + " ₸";
			break;
		case "egp": //eg
			if(numStr.indexOf(".") > -1){
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}else{
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
			}
			return returnValue + " ج.م.";
			break;
		case "huf":
			returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
			return returnValue + " Ft";
			break;
        default:
            try {
                returnValue = parseFloat(numStr).toLocaleString($("#localLang").val(), { style: 'currency', currency: currency.toUpperCase() });
            } catch(e) {
                returnValue = numStr;
            }
            return returnValue;
    }
};
//new-hybris (SEBN 예외처리)
var currencyCommaExcep= function (num, currency) {
    if(currency != null){
        currency = currency.toLowerCase();
    }
    if(num === null || num === ""){
        return "";
    }
    var numStr = String(num);
    var siteCd = $("#siteCode").val();
    if (numStr.indexOf(".") > -1) {
        var numSplit = numStr.split(".");
        if(numSplit.length >1 && numSplit[1].length < 2){
            numStr += "0";
        }else if(numSplit[1].length > 2){
        	if(siteCd !== "id" ) {
        		numStr = Number(numStr).toFixed(2);
        	}  
            
        }
    }
    var returnValue = "";
    var multistoreSiteCode = '';
    
    if( siteCd === 'levant' ){
        multistoreSiteCode = 'jo';
    } else if( siteCd === 'levant_ar' ){
        multistoreSiteCode = 'jo_ar';
    } else if( siteCd === 'ae' || siteCd === 'ae_ar' ){
		if($.cookies.get("estoreSitecode")) {
			tempMultistoreSiteCode = $.cookies.get("estoreSitecode").toString();
			//NOTICE : dotcomMultistore 값이 존재 하는 경우 ae, ae_ar, kw, kw_ar, om, om_ar, bh, bh_ar 인 경우만 세팅 
			if(tempMultistoreSiteCode === "ae" || tempMultistoreSiteCode === "ae_ar" || tempMultistoreSiteCode === "kw" || tempMultistoreSiteCode === "kw_ar" || tempMultistoreSiteCode === "om" || tempMultistoreSiteCode === "om_ar" || tempMultistoreSiteCode === "bh" || tempMultistoreSiteCode === "bh_ar" || tempMultistoreSiteCode === "qa" || tempMultistoreSiteCode === "qa_ar") {
				multistoreSiteCode = tempMultistoreSiteCode;
			} else {
				multistoreSiteCode = siteCd;
			}
		} else {
			multistoreSiteCode = siteCd;
		}
    }
    
    switch (currency) {
        case "usd":
            if(siteCd === "n_africa"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ".00";
                }
                return returnValue + " DH";
            }else{
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "$" + returnValue;
            }
        case "dollar":
            if (siteCd === "ca_fr") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    returnValue = returnValue.replace(".", ",");
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
                }
                return returnValue + " $";
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "$" + returnValue;
            }
        case "eur":
            var tempSepNum;
            if (siteCd === "de" || siteCd === "es" || siteCd === "be_fr" || siteCd === "it" || siteCd === "pt") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
                
                 return returnValue + " €";
                
            } else if (siteCd === "fi" || siteCd === "fr" || siteCd === "sk" || siteCd === "at"
                || siteCd === "ee" || siteCd === "lt" || siteCd === "lv" || siteCd === "si") {
                //ee 에스토니아,lt 리투아니아,lv 라트비아
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
                }
                return returnValue + " €";
            } else if(siteCd === "gr"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                return "€" + returnValue;
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
               
                if( siteCd === "be" || siteCd === "nl" ){
                    return returnValue;
                } else {
                    return "€ " + returnValue;
                }
                
            }
        case "gbp":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "£" + returnValue;
        case "sek":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "dkk":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "nok":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return returnValue + " kr";
        case "brl":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
            }
            return "R$ " + returnValue;
        case "inr":
            //var lastThree = "";
            //var otherNumbers = "";
            var naturalNumbers = "";
            var decimalNumbers = ".00";
            if (numStr.indexOf(".") > -1) {
                naturalNumbers = numStr.substring(0, numStr.indexOf("."));
                decimalNumbers = numStr.substring(numStr.indexOf("."));
            } else {
                naturalNumbers = numStr;
            }
            /* // CRHQ-1612 [B2C] 인도 가격내 , 제거 건 => 인도 사이트내 노출되는 가격에 콤마 제거
            if (naturalNumbers.length > 3 && !isNaN(naturalNumbers)) {
                lastThree = "," + naturalNumbers.substring(naturalNumbers.length - 3);
                otherNumbers = naturalNumbers.substring(0, naturalNumbers.length - 3);
            } else {
                lastThree = naturalNumbers;
            }
            returnValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + decimalNumbers;
            */
            returnValue = naturalNumbers + decimalNumbers;
            return "₹" + returnValue;
        case "krw":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return returnValue + "원";
        case "aed":
            if (siteCd === "ae_ar") {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                
                if(multistoreSiteCode == 'kw_ar') {
                    return returnValue + " د.ك";
                }else if(multistoreSiteCode == 'om_ar') {
                    return returnValue + " ر.ع.";
                }else if(multistoreSiteCode == 'bh_ar') {
                    return returnValue + " .د.ب";
                }else if(multistoreSiteCode == 'qa_ar') {
                    return returnValue + " ر.ق";
                }else{
                    return returnValue + " د.إ";
                }
            } else {
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                }
                
                if(multistoreSiteCode == 'kw') {
                    return returnValue + " KD";
                } else if(multistoreSiteCode == 'bh') {
                    return returnValue + " BD";
                } else if(multistoreSiteCode == 'om') {
                    return returnValue + " RO";
                } else if(multistoreSiteCode == 'qa') {
                    return returnValue + " QAR";
                } else {
                    return returnValue + " AED";
                }
            }
        case "rub":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return returnValue + " ₽";
        case "twd":
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return "NT$" + returnValue;
        case "czk"://체코
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return returnValue+" Kč";
        case "myr"://말레이시아
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "RM " + returnValue;
        case "idr"://인도네시아
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "Rp " + returnValue;
        case "pln"://폴란드
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ",00";
            }
            return returnValue + " zł";
        case "ron"://루마니아
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(".", ",");
                returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
            }
            return returnValue + " lei";
        case "php"://필리핀
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "₱" + returnValue;
        case "sar"://sa
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            
            if("sa" == siteCode){
                return returnValue + " ر.س";
            } else {
                return returnValue + " SAR";
            }
        case "pab":
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            //returnValue = parseFloat(returnValue).toFixed(2);
            
            return "US$ " + returnValue;
        case "mxn": //México
            return "$ " + num;
        case "ars": //Argentina
            // 20200310
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "$ " + returnValue;
        case "pen": //Perú
            // 20200310
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "s/ " + returnValue;
        case "clp": //Chile
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "$ " + returnValue;
        case "cop": //Colombia
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return "$ " + returnValue;
        case "vnd": //동
            returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return returnValue + " ₫";
        case "chf": //프랑
            if(siteCd === "ch" || siteCd === "ch_fr"){
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(".", ",");
                    returnValue = returnValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00";
                }
                return returnValue +" CHF" ;
            }else{
                if (numStr.indexOf(".") > -1) {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
                } else {
                    returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '\'') + ".00";
                }
                return "CHF " + returnValue;
            }
        case "hkd": //hk, hk_en국가
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            return "HK$ " + returnValue;
        case "lbp"://levant
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
            
            if (multistoreSiteCode == "jo") {
                return returnValue + " JD";
            }else if(multistoreSiteCode == "jo_ar"){
                return returnValue + " د.ا";
            }
            break;
        case "pkr": //pk
            if (numStr.indexOf(".") > -1) {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
            }
			return "Rs. " + returnValue;
		case "ils": //il
			if (numStr.indexOf(".") > -1) {
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} else {
				returnValue = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
			}
			return returnValue + " ₪";
        default:
            try {
                returnValue = parseFloat(numStr).toLocaleString($("#localLang").val(), { style: 'currency', currency: currency.toUpperCase() });
            } catch(e) {
                returnValue = numStr;
            }
            return returnValue;
    }
};

/** 
 * priceDisplay 에서 숫자+소수점만 반환
 */
var deleteCurrencyComma = function(text, currency){
    var returnValue = '';
    var siteCd = $("#siteCode").val();
    
    if(currency != null){
        currency = currency.toLowerCase();
    }
    if(fnIsNull(text)){
        return "";
    } else {
        if(siteCd === "ca_fr" || (currency==="eur" && siteCd !== "gr") || currency === "rub"
                || currency === "brl" || currency === "pln" || currency === "ron" 
                || currency === "krw" || currency === "twd" || siteCd === "ch" || siteCd === "ch_fr"){
            if (text.indexOf(",") > -1) {
                var numSplit = text.split(",");
                if(numSplit[0] != null && numSplit[0] != ""){
                    returnValue = numSplit[0].replace(/[^0-9]/g, "");
                }
                if(numSplit[1] != null && numSplit[1] != ""){
                    returnValue += '.'+numSplit[1].replace(/[^0-9]/g, "");
                }
            } else {
                returnValue = text.replace(/[^0-9]/g, "");
            }
        } else if(siteCd === "pk") {
            if (text.indexOf(".") > -1) {
                var numSplit = text.split(".");
                if(numSplit[1] != null && numSplit[1] != ""){
                    returnValue = numSplit[1].replace(/[^0-9]/g, "");
                }
                if(numSplit[2] != null && numSplit[2] != ""){
                    returnValue += '.'+numSplit[2].replace(/[^0-9]/g, "");
                }
            }
        } else {
            if (text.indexOf(".") > -1) {
                var numSplit = text.split(".");
                if(numSplit[0] != null && numSplit[0] != ""){
                    returnValue = numSplit[0].replace(/[^0-9]/g, "");
                }
                if(numSplit[1] != null && numSplit[1] != ""){
                    returnValue += '.'+numSplit[1].replace(/[^0-9]/g, "");
                }
            } else {
                returnValue = text.replace(/[^0-9]/g, "");
            }
        }

        return returnValue;
    }
};



var deleteCurrency= function (text, currency) {

	if(fnIsNull(text)){
		return "";
	} else {
		// 20200305
		if(siteCode == "cl" || siteCode == "py"){
			text = text.replace(/[^0-9]/g, "");
		}else if(siteCode == "pe" || siteCode == "ar"  || siteCode == "co" || siteCode === "pk"){
			// 3,499.00 -> 3499
			if (text.indexOf(".") > -1) {
				var numSplit = text.split(".");
				if(siteCode === "pk"){
					if(numSplit[1] != null && numSplit[1] != ""){
						text = numSplit[1].replace(/[^0-9]/g, "");
					}
				}else{
					if(numSplit[0] != null && numSplit[0] != ""){
						text = numSplit[0].replace(/[^0-9]/g, "");
					}
				}
			}
		}else if(siteCode == "latin"){
			// US$999.00
		}
		
		var returnValue = text;
		
		if(currency != null){
			currency = currency.toLowerCase();
		}
		
		switch (currency) {
			case "usd":
				if(text.indexOf("$") > -1){
					returnValue = text.replace("$", '');
				}
				return returnValue;
				break;
			case "dollar":
				if (siteCd === "ca_fr") {
					if(text.indexOf("$") > -1){
						returnValue = text.replace("$", '');
					}
					return returnValue;
				} else {
					if(text.indexOf("$") > -1){
						returnValue = text.replace("$", '');
					}
					return returnValue;
				}
				break;
			case "eur":
				var tempSepNum;
				if (siteCode === "de" || siteCode === "es" || siteCode === "be_fr" || siteCode === "at") {
					if(text.indexOf("€") > -1){
						returnValue = text.replace("€", '');
					}
					return returnValue ;
				} else if (siteCode === "fi" || siteCode === "fr" || siteCode === "sk" 
					|| siteCode === "ee" || siteCode === "lt" || siteCode === "lv" || siteCd === "si") {
					if(text.indexOf("€") > -1){
						returnValue = text.replace("€", '');
					}
					return returnValue;
				} else {
					if(text.indexOf("€") > -1){
						returnValue = text.replace("€", '');
					}
					return returnValue;
				}
				break;
			case "gbp":
				if(text.indexOf("£") > -1){
					returnValue = text.replace("£", '');
				}
				return returnValue;
				break;
			case "sek":
				if(text.indexOf("kr") > -1){
					returnValue = text.replace("kr", '');
				}
				return returnValue;
				break;
			case "dkk":
				if(text.indexOf("kr") > -1){
					returnValue = text.replace("kr", '');
				}
				return returnValue;
				break;
			case "nok":
				if(text.indexOf("kr") > -1){
					returnValue = text.replace("kr", '');
				}
				return returnValue;
				break;
			case "brl":
				if(text.indexOf("R$") > -1){
	                returnValue = text.replace(".", '').replace("R$", '').replace(" ", '').replace(",", '.');
				}
				return returnValue;
				break;

			case "inr":
				if(text.indexOf("₹") > -1){
					returnValue = text.replace("₹", '');
				}
				return "₹" + returnValue;
				break;

			case "krw":
				if(text.indexOf("원") > -1){
					returnValue = text.replace("원", '');
				}
				return returnValue;
				break;

			case "ae":
				if (siteCode === "ae_ar") {
					if(text.indexOf("د.إ") > -1){
						returnValue = text.replace("د.إ", '');
					}
					return returnValue;

				} else {
					if(text.indexOf("AED") > -1){
						returnValue = text.replace("AED", '');
					}
					return returnValue;
				}

				break;

			case "rub":
				if(text.indexOf("₽") > -1){
					returnValue = text.replace("₽", '');
				}

				return returnValue;
				break;
			case "twd":
				if(text.indexOf("NT$") > -1){
					returnValue = text.replace("NT$", '');
				}

				return "NT$" + returnValue;
				break;
			case "czk":
				//체코
				if(text.indexOf("Kč") > -1){
					returnValue = text.replace("Kč", '');
				}

				return returnValue;
				break;
			case "myr":
				//말레이시아
				if(text.indexOf("RM") > -1){
					returnValue = text.replace("RM", '');
				}

				return returnValue;
				break;
			case "aed"://ae-ar
				if(text.indexOf(" د.إ") > -1){
					returnValue = text.replace(" د.إ", '');
				}
				
				return returnValue;
				break;	
			case "pab": //latin
				if(text.indexOf("U$S") > -1){
					returnValue = text.replace("U$S", '').replace(",", '').replace(" ", '');
				} else if(text.indexOf("US$") > -1) {
					returnValue = text.replace("US$", '').replace(",", '').replace(" ", '');
				}
				return returnValue;
				break;	
			case "mxn": //México
				if(text.indexOf("$") > -1){
					returnValue = text.replace("$", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "ars": //Argentina
				if(text.indexOf("$") > -1){
					returnValue = text.replace("$", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "pen": //Perú
				if(text.indexOf("s/") > -1){
					returnValue = text.replace("s/", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "clp": //Chile
				if(text.indexOf("$") > -1){
					returnValue = text.replace("$", '').replace(" ", '');
				}
				return returnValue;
				break;			
			case "cop": //Colombia
				if(text.indexOf("$") > -1){
					returnValue = text.replace("$", '').replace(" ", '');
				}
				return returnValue;
				break;	
			case "pyg": //py
				if(text.indexOf("₲") > -1){
					returnValue = text.replace("₲", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "hkd": //hk, hk_en
				if(text.indexOf("HK$") > -1){
					returnValue = text.replace("HK$", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "pkr":	//pk
				if (text.indexOf("Rs.") > -1) {
					//returnValue = text.replace("Rs.", '').replace(" ", '');
				}
				return returnValue;
				break;
			case "ils": //il
				if (text.indexOf("₪") > -1) {
					returnValue = text.replace("₪", '').replace(" ", '');
				}
				return returnValue;
			default:
				return text;
				break;
		}
	}
};

var imagePreset = function (parmImgSrc) {
    if (parmImgSrc.indexOf("jpg") > -1) {
        return "?$ORIGIN_JPG$";
    } else if (parmImgSrc.indexOf("jpeg") > -1) {
        return "?$ORIGIN_JPG$";
    } else if (parmImgSrc.indexOf("png") > -1) {
        return "?$ORIGIN_PNG$";
    } else if (parmImgSrc.indexOf("gif") > -1) {
        return "?$ORIGIN_GIF$";
    } else {
        return "?$ORIGIN_PNG$";
    }
};

var imgDomain = function (imgUrl, iconFl) {
    var newUrl = "";
    var useScene7domain = $('#scene7domain').val();
    if (imgUrl !== null) {
        if (imgUrl.indexOf("image.samsung.com") > -1) {
            newUrl = imgUrl + imagePreset(imgUrl);
        } else if (imgUrl.indexOf("http:") > -1 || imgUrl === "") {
            newUrl = imgUrl;
        } else {
            if (iconFl) useScene7domain = useScene7domain.replace('/image/', '/content/');
            newUrl = useScene7domain + imgUrl + imagePreset(imgUrl);
        }
    }
    return newUrl;
};

var jqueryImgsrc = function (imgsrc, crunmode, crunmode2) {
    if (imgsrc === null) {
        return "";
    }
    if (imgsrc.indexOf("/content/dam/samsung") > -1) {
        if (crunmode === "qa") {
            if (crunmode2 === "stg") {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//stg-images.samsung.com/is/image/samsung/assets");
            } else if (crunmode2 === "prod") {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//stg-images.samsung.com/is/image/samsung/assets");
            } else {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//stg-images.samsung.com/is/image/samsungdev/assets");
            }
            imgsrc += imagePreset(imgsrc);
        } else if (crunmode === "live") {
            if (crunmode2 === "stg") {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//images.samsung.com/is/image/samsungstg/assets");
            } else if (crunmode2 === "prod") {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//images.samsung.com/is/image/samsung/assets");
            } else {
                imgsrc = imgsrc.replace("/content/dam/samsung", "//images.samsung.com/is/image/samsungdev/assets");
            }
            imgsrc += imagePreset(imgsrc);
        }
    }
    
    return imgsrc;
};

/*
 * Anil Singh
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;
        var originDate = date;
        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) {
        	if(originDate) return originDate;
        	throw SyntaxError("invalid date");        	
        }

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};


var loginJwtApiCal = function (storeDomain, buyingHreflang, countryIsoCode) {

    var validateParamObj = {"jwt": loginJwt};
    //us 국가 만 있음
    if(siteCode==="us"){
        var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
        
        var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
        var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
        
        if(epp_verified != null){
            epp_verified = epp_verified.toString();
            if(epp_verified=="true" && tmktid != null && tmktid != ''){
                validateParamObj["store_id"] = tmktid.toString();
            } else if(validateStoreId != null && validateStoreId != ""){
                validateParamObj["store_id"] = validateStoreId.toString();
            }
        }
    }
    $.ajax({
        headers : {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        url : storeDomain + "/v1/sso/user/validate",
        type : "POST",
        dataType : "json",
        data : JSON.stringify (validateParamObj),
        timeout : 10000,
        xhrFields: { withCredentials: true },
        async : false,
        beforeSend : function(xhr){
            /* multi language 사이트 헤더값 추가 */
            if(buyingMultiLanguageYn === "Y"){ 
                xhr.setRequestHeader("x-ecom-locale", buyingHreflang);
            }
        },
        success : function (data) {
            if(data.statusCode !== 200 && data.statusCode !== "200"){
                $.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
                return {"isValidJwtToken":false};
            }
        },
        error : function(jqXHR, textStatus, errorThrown){
            console.error(textStatus);
            //2019.10.10 epp jwt 토큰 쿠키 삭제 방지 로직 추가
            if(jqXHR.responseJSON == null || jqXHR.responseJSON.error !== "StoreIdNotPresent"){
                $.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
                return {"isValidJwtToken":false};
            } else {
                return {"loginFlag":false};
            }
        }
    });
};


var isValidJwtTokenApiCal = function (storeDomain, buyingHreflang, countryIsoCode, buyingMultiLanguageYn) {

	var redCookie = $.cookies.get("ReD", {domain : ".samsung.com"});

	var siteCd = $("#siteCode").val();

	var returnVal = false;
		
	$.ajax({
		url: "/aemapi/v6/data-login/callSALogin."+siteCd+".json",
		type: "GET",
		dataType : "json",
		success: function (data) {
			if(data.statusCode===200){
				if(data.redCookieChk === "Y" && $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"})){
					returnVal = true;
				}
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
		}
	});
	return returnVal;
};

var loginJwtValidateApiCal = function (storeDomain, buyingHreflang, countryIsoCode, buyingMultiLanguageYn, loginJwt) {
	var returnVal = false;
	// jwt validate 체크

	var validateParamObj = {"jwt": loginJwt};
	//us 국가 만 있음
	if(siteCode==="us"){
		var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
		
		var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
		var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
		
		if(epp_verified != null){
			epp_verified = epp_verified.toString();
			if(epp_verified=="true" && tmktid != null && tmktid != ''){
				validateParamObj["store_id"] = tmktid.toString();
			} else if(validateStoreId != null && validateStoreId != ""){
				validateParamObj["store_id"] = validateStoreId.toString();
			}
		}
	}
	$.ajax({
		headers : {
			"Cache-Control": "no-cache",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin" : "*"
		},
		url : storeDomain + "/v1/sso/user/validate",
		type : "POST",
		dataType : "json",
		data: JSON.stringify (validateParamObj),
		xhrFields: { withCredentials: true },
		async : false,
		beforeSend : function(xhr){
			/* multi language 사이트 헤더값 추가 */
			if(buyingMultiLanguageYn === "Y"){ 
				xhr.setRequestHeader("x-ecom-locale", buyingHreflang);
			}
		},
		success : function (data) {
			if(data.statusCode === 200 || data.statusCode === "200"){
				returnVal = true;
				$('#loginValidateYnForGPv2').val("Y");
			} else {
				$('#loginValidateYnForGPv2').val("N");
			}
		},
		error : function() {
			$('#loginValidateYnForGPv2').val("N");
		}
	});
	return returnVal;
};
/**
 * 각 Product Page 및 Offer Page 에서 공통 Login Check
 */
var commonLoginCheck = function(callbackFn){
	var shopIntegrationFlag = $("#shopIntegrationFlag").val();
	var isGPv2 = shopIntegrationFlag === "GPv2" ? true : false;

	var failLogin = function(){
		$('#loginValidateYnForGPv2').val("N");
		return false;
	};
	var successLogin = function(){
		$('#loginValidateYnForGPv2').val("Y");
		return true;
	};
	
	//[EPP] epp 일 때 login check 로직 분기 추가
    if(checkEppSite()){
        if(window.sg.epp != null && window.sg.epp.common != null){
            if (callbackFn && typeof (callbackFn) === "function") {
                callbackFn(window.sg.epp.common.isLogged);
            } else {
                return window.sg.epp.common.isLogged;
            }
        } else {
            return false;
        }
    } else if(isGPv2){
		var storeDomain = $("#storeDomain").val();
		var countryIsoCode = $("#countryIsoCode").val();
		var buyingMultiLanguageYn = $("#multiLanguageYn").val();
		var buyingHreflang = $("#localLang").val();
		var token = $.cookies.get("xsdcxyn", {domain : ".samsung.com"});
		var loginJwt = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
		var isLoginValidateYn = $('#loginValidateYnForGPv2').val(); // "GNB 에서 로그인 처리 된 경우" 혹은 "이미 commonLoginCheck 한 경우"
		var loginFlag = false;
		var isValidJwtToken = true;

		if(isLoginValidateYn){
			if(isLoginValidateYn === "Y"){
				return true;
			} else if(isLoginValidateYn === "N"){
				return false;
			}
		} else {
			// Account Login 토큰 값이 있을 경우에만 로그인 체크
			if(loginJwt != null){
				// jwt validate 체크
				var validateParamObj = {"jwt": loginJwt};
				var isUSEppGuestUser = false;
				//us 국가 만 있음
				if(siteCode==="us"){
					var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
					
					var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
					var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
					if(epp_verified != null){
						epp_verified = epp_verified.toString();
						if(epp_verified=="true" && tmktid != null && tmktid != ''){
							validateParamObj["store_id"] = tmktid.toString();
						} else if(validateStoreId != null && validateStoreId != ""){
							validateParamObj["store_id"] = validateStoreId.toString();
						}
					}
					
					$.ajax({
			    		headers: {
					         "Cache-Control": "no-cache",
					         "Content-Type": "application/json",
					         "Access-Control-Allow-Origin" : "*"
			    		},
					    url: storeDomain + "/v1/sso/jwt/details",
		    			type: "POST",
		    			async: false,
			    		dataType : "json",
				    	data: JSON.stringify (validateParamObj),
						xhrFields : {
							withCredentials: true
						},
					    success: function (data) {
					    	if(data != null && data !== "" && data.login_type != null && (data.login_type === "guest_epp_store"|| data.login_type === "referral_url")){
					    		isUSEppGuestUser = true;
					    	 }
					     }
			    	 });
				}
				if(!isUSEppGuestUser){
					$.ajax({
						headers : {
							"Cache-Control": "no-cache",
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin" : "*"
						},
						url : storeDomain + "/v1/sso/user/validate",
						type : "POST",
						dataType : "json",
						data: JSON.stringify (validateParamObj),
						async : false,
						xhrFields : {
							withCredentials: true
						},
						beforeSend : function(xhr){
							if(buyingMultiLanguageYn === "Y"){
								xhr.setRequestHeader("x-ecom-locale", buyingHreflang);
							}
						},
						success : function (data) {
							if(data.statusCode !== 200 && data.statusCode !== "200"){
								isValidJwtToken = false;
							}
						},
						error : function(jqXHR, textStatus, errorThrown){
							console.error(textStatus);
							isValidJwtToken = false;
						}
					});
				} else {
					loginFlag = failLogin();
				}
				
				if(!isValidJwtToken){
					if(isValidJwtTokenApiCal(storeDomain,buyingHreflang,countryIsoCode,buyingMultiLanguageYn)){
						var newJWT = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"}).toString();
						loginFlag = loginJwtValidateApiCal(storeDomain, buyingHreflang, countryIsoCode,buyingMultiLanguageYn,newJWT);
					} else {
						loginFlag = failLogin();
					}
				}else{
					loginFlag = successLogin();
				}
			}else{
				if(token != null){
					if(isValidJwtTokenApiCal(storeDomain,buyingHreflang,countryIsoCode,buyingMultiLanguageYn)){
						var newJWT = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"}).toString();
						loginFlag = loginJwtValidateApiCal(storeDomain, buyingHreflang, countryIsoCode,buyingMultiLanguageYn,newJWT);
					} else {
						loginFlag = failLogin();
					}
				} else {
					loginFlag = failLogin();
				}
			}
			return loginFlag;
		}
		
	} else {
		//new-hybris
		return ss.Auth.checkSignIn(callbackFn);
	}
};

/**
 * 페이지 로딩 시 get wishlist api call function
 */
var addedWishList = [];
var commonGetWishlist = function (callbackFn) {
    
	var shopIntegrationFlag = $("#shopIntegrationFlag").val();
    var isNewHybris = shopIntegrationFlag === "Hybris-new" ? true : false;				//new-hybris
    var storeDomain = $("#storeDomain").val();
    const b2bFlag = $('#b2bFlag').val();
    const storeSiteCode = $('#store_sitecode').val();
    
    let isEppLogged = false;
    let siteCodeWithEpp = storeSiteCode;
    if(checkEppSite()){
        if(window.sg.epp != null && window.sg.epp.common != null){
            siteCodeWithEpp = window.sg.epp.common.companyCode;
            isEppLogged = window.sg.epp.common.isLogged;
        }
    }
    
    addedWishList = [];
    //new-hybris
    if ( isNewHybris || (b2bFlag && shopIntegrationFlag =='true')){
        var guid = $.cookies.get("guid",{domain:".samsung.com"});
        if( guid != null || isEppLogged) {
            $.ajax({
                url: storeDomain + "/tokocommercewebservices/v2/" + siteCodeWithEpp + "/users/current/wishlist?loadEntries=true",
                type: "GET",
                dataType: "json",
                timeout: 20000,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data != null && data.wishlists != null && data.wishlists.length > 0) {
                        for( wishlist in data.wishlists){
                            const wishlistItem = data.wishlists[wishlist];
                            if( wishlistItem != null && wishlistItem.isDefault){
                                if(wishlistItem.entries != null && wishlistItem.entries.length > 0){
                                    for(entry in wishlistItem.entries){
                                        const entItem = wishlistItem.entries[entry];
                                        if(entItem.product != null && entItem.product.code != null){
                                            let wishlistItemObj = {};
                                            wishlistItemObj.sku = entItem.product.code;
                                            wishlistItemObj.deleted = false;

                                            addedWishList.push(wishlistItemObj);
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }
                },
                error: function (e) {
                    addedWishList = [];
                },
                complete : function () {
                    if (callbackFn && typeof (callbackFn) === "function") {
                        callbackFn();
                    }
                }
            });
        } else if (callbackFn && typeof (callbackFn) === "function") {
            callbackFn();
        }
    } else if(shopIntegrationFlag === "GPv2"){
        var countryIsoCode = $("#countryIsoCode").val();
        var loginJwt = $.cookies.get("jwt_" + countryIsoCode, {
            domain: ".samsung.com"
        });
        
        //[EPP] store_id 파라미터 추가
        let param = {};
        if(isEppLogged){
            if(window.sg.epp!= null && window.sg.epp.common != null){
                param["store_id"] = window.sg.epp.common.storeId;
            }
        }
        //[EPP] store_id 파라미터 추가
        
        /* 20190219 US GPv2 api 호출 시  헤더 추가 관련 변수 : S*/
        var multiLanguageYN = $("#multiLanguageYn").val(),
        hreflang = $("#hreflang").val();
        /* 20190219 US GPv2 api 호출 시  헤더 추가 관련 변수 : E*/
        if (loginJwt != null) {
            $.ajax({
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-ecom-app-id": "identity-store-global",
                    "x-ecom-jwt": loginJwt
                },
                url: storeDomain + "/v4/identity/wishlist",
                type: "GET",
                data: param,
                dataType: "json",
                timeout: 20000,
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    if (multiLanguageYN === "Y") {
                        xhr.setRequestHeader("x-ecom-locale", hreflang);
                    }
                },
                success: function (data) {
                    if (data != null) {
                        addedWishList = data;
                    }
                },
                error: function (e) {
                    addedWishList = [];
                },
                complete : function () {
                    if (callbackFn && typeof (callbackFn) === "function") {
                        callbackFn();
                    }
                }
            });
        } else if (callbackFn && typeof (callbackFn) === "function") {
            callbackFn();
        }
    }
        
};


/**
 * null 체크
 * @param item : 체크대상
 **/
function fnIsNull(item) {
    return (item === '' || item === undefined || item === null);
}

/**
 * p5 window.smg.aem.util.def
 */
function def(org, src) {
    for (var prop in src) {
        if (!Object.prototype.hasOwnProperty.call(src, prop)) continue;
        if ('object' === $.type(org[prop])) {
            org[prop] = (this.isArray(org[prop]) ? src[prop].slice(0) : this.def(org[prop], src[prop]));
        } else {
            org[prop] = src[prop];
        }
    }
    return org;
}

/**
 * p5 window.smg.aem.util.cookies
 */
var cookies = (function () {
    var defParams = {
        expires: '',
        path: '/',
        domain: '',
        secure: ''
    };
    return {
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + ((exdays || 0) * 24 * 60 * 60 * 1000));

            var opt = def(defParams, {
                expires: d
            });
            document.cookie = [
                cname, '=', cvalue,
                opt.expires ? '; expires=' + opt.expires.toUTCString() : '',
                opt.path ? '; path=' + opt.path : '',
                opt.domain ? '; domain=' + opt.domain : '',
                opt.secure ? '; secure' : ''
            ].join('');
        },
        getCookie: function (cname) {
            var name = cname + '=',
                ca = document.cookie.split(';'),
                c;

            for (var i = 0, leng = ca.length; i < leng; i++) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) !== -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },
        setCookieMailForm : function ( form ) {
            for( var name in form ){
                var isPossible = this.checkMailName( name );
                if( isPossible && form[name] != null){
                    var valueChane = form[name].replace(';','||@||')
                    this.setCookie('mail_form_'+name, valueChane, 1);
                }
                
            }
            
        },
        checkMailName : function( name ){
            return name && ( name === 'CompanyName' || name === 'ContactFirstName'  || name === 'ContactName' || 
                             name === 'EmailAddress' || name === 'CompanyAddress' || name === 'CompanyInterest' || name === 'JobTitle' ||
                             name === 'Employee' || name === 'City' || name === 'Zipcode' || name === 'Telephone')
        },
        getCookieMailForm : function () {
            var cookies = document.cookie.split(';');
            var result = {};
            for( var item of cookies ){
                if( item.indexOf('mail_form_') > 0){
                    var data = item.replace('mail_form_','').trim().split("=");
                    var name = data[0];
                    var value = data[1].replace('||@||',';');
                    result[name] = value;
                }
            }
            return result;
        }
    };
})();


/**
 * PF 공통 Function
 */
if(window.sg === undefined){
    window.sg = {};
}
if(window.sg.components === undefined){
    window.sg.components = {};
}

window.sg.components.pfdevfn = {
        afterAddWishlist : function(wishBtnEl, elClass, tooltipText, shopFl, modelCode, arialabelText){
            if(!fnIsNull(wishBtnEl)){
                if(!wishBtnEl.hasClass(elClass)){
                    wishBtnEl.addClass(elClass);
                } else if ( shopFl === "GPv2"){
                    wishBtnEl.removeClass(elClass);
                }
                
                let arialabel = tooltipText;
                if(arialabelText && arialabelText != ''){
                    arialabel = arialabelText;
                }

                if(shopFl==="hybrisIntg"){
    //					wishBtnEl.attr("disabled", "disabled");
                    wishBtnEl.prop("disabled", true);
                    wishBtnEl.attr("data-add-text",tooltipText);
                    wishBtnEl.removeAttr("aria-label");
                    wishBtnEl.addClass("cta--disabled");
                } else if(shopFl==="GPv2"){
                    if(wishBtnEl.hasClass('js-delete-wishlist-btn')){
                        wishBtnEl.removeClass("js-delete-wishlist-btn");

                        wishBtnEl.removeAttr("data-added-text");
                        wishBtnEl.attr("data-add-text",tooltipText);

                        wishBtnEl.attr("an-la","add to wishlist");
                        
                        wishBtnEl.find('span').text(tooltipText);
                        
                        wishBtnEl.blur();
                        
                    } else {
                        wishBtnEl.addClass("js-delete-wishlist-btn");

                        wishBtnEl.removeAttr("data-add-text");
                        wishBtnEl.attr("data-added-text",tooltipText);

                        wishBtnEl.attr("an-la","remove from wishlist");
                        
                        wishBtnEl.find('span').text(tooltipText);

                        //처음 페이지 로딩시만 addedWishList 를 생성하므로 그 후 wishlist 에 추가된 제품은 임시로 addedWishList 에 추가함.
                        var wishlistItemObj = {};
                        wishlistItemObj.sku = modelCode;
                        wishlistItemObj.deleted = false;
                        
                        addedWishList.push(wishlistItemObj);
                    }
        
                    window.sg.components.wishlistIcon.reInit();
                }
                wishBtnEl.removeAttr("aria-label").attr("aria-label", arialabel);
            }
        },
		
		/**
		 * addedWishList 중 tempProductCode 에 해당하는 제품 정보 제거 function
		 */
		spliceAddedWishList : function(tempProductCode){
			if(addedWishList.length > 0){
				for(var idx = 0; idx < addedWishList.length; idx++){
					var addedWishlistInfo = addedWishList[idx];
					if(addedWishlistInfo.sku === tempProductCode){
						addedWishList.splice(idx,1);
						break;
					}
				}
			}
		}
	};

/**
 * p6 모델코드 seletor로 들어갈 시 치환로직
 */
function modelCodeToSelector( modelCode ) {
	var result = '';
	if( modelCode ){
		result = modelCode.replace(/\//g,"@$");
	}
	return result;
}
/**
 * NewHybris Cart 공통 로직 
 * new-hybris
 */
function addToCartNewHybris( modelCode, goCartUrl='', callbackFn, services, returnParam = {}, isB2B = false, $btnEl ){
   // getNewCartId ( ( isSuccess, returnParam )=>{
  //      if( isSuccess ){
            const storeDomain = $("#storeDomain") ? $("#storeDomain").val()+'/tokocommercewebservices/v2' : '';
            const storeWebDomain = $("#storeWebDomain").val();
            const storeSiteCode = $("#store_sitecode").val();
            const siteCode = $("#siteCode") ? $("#siteCode").val() : '';
            const pageType = $("#tempTitle").val();
            const cartSiteCode = isB2B ? storeSiteCode : siteCode;
            const wbcRef = $("#tempTitle").val() === 'page-wearable-bc' ? '&ref=wbc' : ''; 
            
            // epp shop분기 추가
            const siteCodeWithEpp = checkEppSite() ? (window.sg.epp != null && window.sg.epp.common != null ? window.sg.epp.common.companyCode : "") : cartSiteCode;
            
            let cartUrl = `${storeDomain}/${siteCodeWithEpp}/addToCart/multi/?fields=BASIC`+wbcRef;
            let param =[];
            let isNewCart = false;
            let result = '';
            let isSuccess = false;
            if( services ){
            	// addon 공용 컴포넌트
            	if( services.isAddonComponent ){
            		param = services.filter(function(elem){
        				return elem;
            		});
            	}
            	
                //bezel세팅
            	if( services.bezelCode && !services.isContinue ){
                    param.push({
                        "productCode": services.bezelCode,
                        "qty": 1,
                    });
                }
            	
            	// embed addon세팅
        		if( services.embedaddon && services.embedaddon.length > 0 ){
        			for( const itemCode of services.embedaddon ){
        				param.push({
        					'productCode' : itemCode,
        					'qty' : 1,
        				});
        			}
        		}
                
                //addon세팅
                if( services.addon && services.addon.modelCodeList && services.addon.modelCodeList.length > 0 ){
                    for( const itemCode of services.addon.modelCodeList ){
                        param.push({
                            "productCode": itemCode,
                            "qty": 1,
                        });
                    }
                }

                //gift세팅
                if( services.gift && services.gift.modelCode ){
                	for(let i = 0; i < services.gift.modelCode.length; i++){
                		 param.push({
                             "productCode": services.gift.modelCode[i],
                             "qty": 1,
                         })
                	}
                   
                }

                //combo세팅
                if( services.combo && services.combo.modelCodeList && services.combo.modelCodeList.length > 0 ){
                    for( const itemCode of services.combo.modelCodeList ){
                        param.push({
                            "productCode": itemCode,
                            "qty": 1,
                        });
                        if(itemCode.indexOf("SIM") > -1)
                        	isNewCart = true;
                    }
                }

                //공통에서 사용할 multi제품 세팅
                if( services.multi && services.multi.modelCodeList && services.multi.modelCodeList.length > 0 ){
                    for( const itemCode of services.multi.modelCodeList ){
                        param.push({
                            "productCode": itemCode,
                            "qty": 1,
                        });
                    }
                }
            }

            if( modelCode ){
                const originParam = {
                    "productCode": modelCode,
                    "qty": 1,
                }

                if( services ){

                    //band 세팅
                    if( services.band && services.band.bandCode ){
                        originParam.childProducts = [];
                        originParam.childProducts.push( {'product' : {'code':services.band.bandCode}, 'quantity' : 1 } );
                    }

                    originParam.services = [];
                    
                    // tiered 제품 수량 선택 
                     if( services.orignalQuantity ){
                        originParam.qty = services.orignalQuantity.quantity;
                     }
                     
                    //tradeIn세팅
                    if( services.tradeIn && services.tradeIn.plan_id ){
                        if( services.tradeIn && services.tradeIn.plan_id ){
                        	originParam.services.push( {'exchangeId' : services.tradeIn.plan_id} );
                        }
                    }
                    
                    //care세팅
                    if( services.care && services.care.modelCode ){
                        if( services.care && services.care.modelCode ){
                        	originParam.services.push( {'serviceCode' : services.care.modelCode} );
                        }
                    }
                    
                    //upgrade세팅
                    if( services.upgrade && services.upgrade.modelCode ){
                        originParam.services.push( {'serviceCode' : services.upgrade.modelCode } );
                        isNewCart = true;
                    }
                    
                    //tariff세팅
                    if( services.tariff && services.tariff.modelCode && services.tariff.simSkuCode ){
                        originParam.services.push( {'planId' : services.tariff.modelCode, 'serviceCode' : services.tariff.simSkuCode } );
                        isNewCart = true;
                    }
                }

                param.push(originParam);
            }
            if(!isB2B && (pageType == 'page-pf' || pageType == 'page-standard-pd' || pageType == 'page-buying-pd' || wbcRef) && commonNetFunnelUseYn == "Y"){
            	var buyPageId = '';
                var addPageId = '';
                var cartActionId = '';
				buyPageId = COMMON_NETFUNNEL_ACTIONID.AEM_BUY != undefined && COMMON_NETFUNNEL_ACTIONID.AEM_BUY != "" ? COMMON_NETFUNNEL_ACTIONID.AEM_BUY : "AddtoCart_aem1";
    			addPageId = COMMON_NETFUNNEL_ACTIONID.AEM_ADD != undefined && COMMON_NETFUNNEL_ACTIONID.AEM_ADD != "" ? COMMON_NETFUNNEL_ACTIONID.AEM_ADD : "AddtoCart_aem";
    			cartActionId = buyPageId;
    			if($(".pdd16-step-buying").is(':visible')){
    				if($(".hubble-addon-page").hasClass("pdd16-step-buying--free-gift"))
    					cartActionId = addPageId;
    				else
    					cartActionId = addPageId;
    			}
    			NetFunnel_Action({action_id: cartActionId},function(ev, ret){
		            $.ajax({
		                url: cartUrl,
		                type: "POST",
		                dataType: "json",
		                cache: true,
		                crossDomain: true,
		                contentType: 'application/json',
		                timeout: 30000,
		                xhrFields : {
		                    withCredentials: true
		                },
		                data: JSON.stringify(param),
		                success: function (data) {
		                    result = data;
		                    isSuccess = true;
		                },
		                error : function(error){
		                    var errorText = "";
		                    if ( error.responseJSON && error.responseJSON.message ) {
		                        errorText = error.responseJSON.message;
		                    }
		                    confirmPopup(errorText, null, null, $btnEl);
		                },
		                complete : function (){
		                	if( isSuccess ){
		                        if( goCartUrl ){
		                            location.href = goCartUrl; 
		                        } else if( callbackFn && typeof callbackFn ==='function' ){
		                            callbackFn(result, isSuccess, returnParam );
		                        }
		                        
			                    // CRHQ-4280 수정이 필요한 경우 ( Cart 페이지로 바로 넘기는 경우, 토큰 반납 불 필요 )
			                    if(!goCartUrl) {
			                    	NetFunnel_Complete();
			                    }
			                    
		                    }
		                }
		            });
    			});
            }else{
                if( param.length === 0 ){
                    if( goCartUrl ){
                        location.href = goCartUrl; 
                    } else if( callbackFn && typeof callbackFn ==='function' ){
                        callbackFn(result, isSuccess, returnParam );
                    }
                } else {
                    if( isB2B && siteCode !== "uk" ){
                        let quantity = 1;
                        let productIndex = 0;
                        let paramNg = [];
                        //POST용 !!!
                		var postParam = {
                				'products' : []
                		};
                		
                		let postApiURL =`${storeWebDomain}/servicesv2/addToCart`;
                		
                        if( services ){
                             // tiered 제품 수량 선택 
                             if( services.orignalQuantity ){
                                quantity = services.orignalQuantity.quantity;
                             }
                             
                             //addOn제품
                             if( services.addon && services.addon.modelCodeList && services.addon.modelCodeList.length > 0 ){
                                for( const itemCode of services.addon.modelCodeList ){
                                    paramNg.push(`products[${productIndex}].productCode=${itemCode}&products[${productIndex}].quantity=1`);
                                    productIndex++;
                                    
                                    //post style
                    				postParam['products'].push({
                    					'productCode' : itemCode,
                    					'quantity' : 1,
                    				})
                    				
                    				 
                                }
                            }
                        }
                        
                        if( modelCode ){
                            paramNg.push(`products[${productIndex}].productCode=${modelCode}&products[${productIndex}].quantity=${quantity}`);
                            productIndex++;
                            
                 			//  Post 방식으로 cart 변경
                  			postParam['products'].push({
                  				'productCode' : modelCode,
                  				'quantity' : quantity
                  			});
 
                        }
                        
                        $.ajax({
                            url: postApiURL,
                            type: 'POST',
                            cache: false,
                            crossDomain: true,
                            xhrFields: { withCredentials: true },
                            contentType: 'application/json',
                            dataType: 'json',
                            data : JSON.stringify (postParam),
                            timeout: 20000,
                            success : function ( data) {
                            	if(data.resultCode === "0000") {
                                    result = data;
                                    isSuccess = true;
                            	}
                            },
                            error : function(error){
                                var errorText = "";
                                if ( error.responseJSON && error.responseJSON.message ) {
                                    errorText = error.responseJSON.message;
                                }
                                confirmPopup(errorText, null, null, $btnEl);
                            },
                            complete : function (){
                                if( isSuccess ){
                                    if( goCartUrl ){
                                        location.href = goCartUrl; 
                                    } else if( callbackFn && typeof callbackFn ==='function' ){
                                        callbackFn(result, isSuccess, returnParam );
                                    }
                                }
                            } 
                        });
                    } else {
                        $.ajax({
                            url: cartUrl,
                            type: "POST",
                            dataType: "json",
                            cache: true,
                            crossDomain: true,
                            contentType: 'application/json',
                            timeout: 30000,
                            xhrFields : {
                                withCredentials: true
                            },
                            data: JSON.stringify(param),
                            success: function (data) {
                                result = data;
                                isSuccess = true;
                            },
                            error : function(error){
                                var errorText = "";
                                if ( error.responseJSON && error.responseJSON.message ) {
                                    errorText = error.responseJSON.message;
                                }
                                confirmPopup(errorText, null, null, $btnEl);
                            },
                            complete : function (){
                                if( isSuccess ){
                                    if( goCartUrl ){
                                        location.href = goCartUrl; 
                                    } else if( callbackFn && typeof callbackFn ==='function' ){
                                        callbackFn(result, isSuccess, returnParam );
                                    }
                                }
                            }
                            
                        });
                    }
                }
            }
       // }

   //},returnParam);
}


/**
 * 쿠기 생성 공통함수  
 */
function setCookieData ( name, value, exfireHour, cookiePath ) {
    const day = new Date();
    let path = '';
    day.setTime(day.getTime() + ((exfireHour || 0) * 60 * 60 * 1000));
    if( cookiePath ){
        path = `; path=${cookiePath}`;
    }
    document.cookie = `${name}=${value}; domain=samsung.com; expires=${day.toUTCString()}` + path;
}

/**
 * cartID 신규 세팅 로직
 * new-hybris
 */
function getNewCartId ( callbackFn, returnParam = {} ){
	
    const loginFlag = commonLoginCheck();
    const storeDomain = $("#storeDomain") ? $("#storeDomain").val()+'/tokocommercewebservices/v2' : '';
	const siteCode = $("#siteCode") ? $("#siteCode").val() : '';
	const store_sitecode = $("#store_sitecode").val();
	const b2bFlag = $("#b2bFlag").val();
	
    let guid = $.cookies.get('hybriscartID-guid');
    let code = $.cookies.get('hybriscartID-code');

    let setAPI = false;
    let user = '';
    let isSuccess = false;

    if( loginFlag && !code ){
        setAPI = true;
        user = 'current';
    } else if ( !loginFlag && !guid ){
        setAPI = true;
        user = 'anonymous';
    } else {
    	isSuccess = true;
        if( callbackFn && typeof callbackFn ==='function' ){
            callbackFn( isSuccess, returnParam );
        }
    }

    if( setAPI ){
        let apiURL = `${storeDomain}/${siteCode}/users/${user}/carts?fields=BASIC`;
        if('Y'=== b2bFlag){
        	apiURL = `${storeDomain}/${store_sitecode}/users/${user}/carts?fields=BASIC`;
        }
        const ajaxObj = {
            url: apiURL,
            type: "POST",
            dataType: "json",
            cache: true,
            crossDomain: true,
            timeout: 5000,
            xhrFields : {
                withCredentials: true
            },
            success: function (data) {
                if( data && ( data.code || data.guid )  ){
                    const path = location.href.indexOf('/content/samsung') > -1 ? `/content/samsung/${siteCode}` : `${siteCode}`;
                    if(user === 'current'){
                        isSuccess = true;
                        const code = data.code;
                        setCookieData('hybriscartID-code',code,1, path);
                    } else {
                        isSuccess = true;
                        const guid = data.guid;
                        setCookieData('hybriscartID-guid',guid,1, path);
                    }
                }
            },
             error : function(error){
                var errorText = "";
                if ( error.responseJSON && error.responseJSON.message ) {
                    errorText = error.responseJSON.message;
                }
                confirmPopup(errorText);
            },
            complete : function (){
                if( callbackFn && typeof callbackFn ==='function' ){
                    callbackFn( isSuccess, returnParam );
                }
            }
        }
        
        $.ajax(ajaxObj);
    }
    
}

/**
 * [B2B] PF / PD SMB Register 버튼 클릭 시 호출
 *  
 *  - 로그인이 되어있지않을 때 로그인 페이지 이동
 *  - 로그인이 되어있을 때 register 페이지 이동
 */
function goToSMBRegister(smbRegisterUrl, isLoginFl){
    
    const smbCookiePath = '/' + SITE_CD + '/';
    $.cookies.del("isSMBRegisteredUserYN", {path:smbCookiePath, domain:'.samsung.com'});

    if(isLoginFl){
        document.location.href = smbRegisterUrl;
    } else {
        $.cookies.set("goSMBRegisterYN", "Y", {domain : ".samsung.com"});
        $.cookies.set("smbRegisterUrl", smbRegisterUrl, {domain : ".samsung.com"});
        ss.Auth.callSaSignInGate();
    }
}

/**
 * [EPP]
 * EPP 페이지 여부 체크
 * page path 에서 multistore 유무를 확인하여 Epp 페이지인지 판단한다.
 */
function checkEppSite() {
    let tmpStr = "";
    let p = document.location.pathname;
    p = p.replace(".html","/");

    let arr = p.split("/");
    if (arr.length >= 5 && "content" == arr[1] && "samsung" == arr[2]) {
        tmpStr = arr[4];
    } else if (arr.length >= 3) {
        tmpStr = arr[2];
    }
    return (tmpStr=="multistore");
}
(function ($) {
    "use strict";

    if (typeof $.cookies === "undefined") {
        $.cookies = {};
    }

    var CONTENT = "/content/samsung";
    var siteCode = $("#siteCode").val();
    var cookiePath = '/' + siteCode + '/';
    if (cookiePath === "/global_nw/") {
        cookiePath = "/global/business/networks/";
    } else if (cookiePath === "/global_cps/") {
        cookiePath = "/global/business/compressor/";
    }

    /**
     * 쿠키 데이터
     */
    $.cookies.data = $.cookies.data || {};
    $.cookies.data.SEARCH_NAME = "sk";
    $.cookies.data.ACCESSORY_SEARCH_NAME = "ask";

    /**
     * 쿠키의 Default Option return
     */
    $.cookies.getDefaultOption = function (expires, path) {
        // expires 값이 없을 경우 default 1일
        if (!expires || !(expires instanceof Date)) {
            expires = new Date();
            expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24);
        }
        // path 값이 없을 경우 '/'
        if (!path) {
            path = '/';
        } else if (window.location.pathname.indexOf(CONTENT) > -1) {
            path = CONTENT + path;
        }

        // SITE CODE 별로 저장
        return {
            expiresAt: expires,
            path: path,
            domain: ".samsung.com",
            secure: false
        };
    };

    /**
     * 검색 키워드 저장
     * @param keyword, expires
     */
    $.cookies.setSearchKeyword = function (keyword, expires) {
        var cookieNm = this.data.SEARCH_NAME;
        var searchMaxSize = 4;
        var cookieVal = this.get(cookieNm);

        if (!cookieVal) {
            cookieVal = [keyword];
        } else {
            // 중복 체크
            if ($.inArray(keyword, cookieVal) >= 0) {
                return;
            }
            if (cookieVal.length >= searchMaxSize) {
                cookieVal.splice(0, 1);
            }
            cookieVal.push(keyword);
        }
        this.set(cookieNm, cookieVal, this.getDefaultOption(expires, cookiePath));
    };

    /**
     * 검색 키워드 조회
     * @returns Array
     */
    $.cookies.getSearchKeyword = function () {
        var cookieVal = this.get(this.data.SEARCH_NAME);
        return (cookieVal && $.isArray(cookieVal) ? cookieVal : []);
    };

    $.cookies.clearSearchKeyword = function (expires) {
        this.del(this.data.SEARCH_NAME, this.getDefaultOption(expires, cookiePath));
    }
    /**
     * Accessories 검색 키워드 저장
     * @param keyword, expires
     */
    $.cookies.setAccessorySearchKeyword = function (keyword, expires) {
        var cookieNm = this.data.ACCESSORY_SEARCH_NAME;
        var searchMaxSize = 4;
        var cookieVal = this.get(cookieNm);

        if (!cookieVal) {
            cookieVal = [keyword];
        } else {
            // 중복 체크
            if ($.inArray(keyword, cookieVal) >= 0) {
                return;
            }
            if (cookieVal.length >= searchMaxSize) {
                cookieVal.splice(0, 1);
            }
            cookieVal.push(keyword);
        }
        this.set(cookieNm, cookieVal, this.getDefaultOption(expires, cookiePath));
    };
    /**
     * 검색 키워드 조회
     * @returns Array
     */
    $.cookies.getAccessorySearchKeyword = function () {
        var cookieVal = this.get(this.data.ACCESSORY_SEARCH_NAME);
        return (cookieVal && $.isArray(cookieVal) ? cookieVal : []);
    };

    $.cookies.clearAccessorySearchKeyword = function (expires) {
        this.del(this.data.ACCESSORY_SEARCH_NAME, this.getDefaultOption(expires, cookiePath));
    }
    
	$(function () {
		//My Page 쿠키 설정
		if('live'=== $("#runmodeInfo").val() && 'Y' === $("#b2bFlag").val()){
			var filterType = '';
			if('business solution detail' === digitalData.page.pageInfo.pageTrack
					|| 'business solutions detail' === digitalData.page.pageInfo.pageTrack){
				filterType = 'solution';
			}else if('business insight detail' === digitalData.page.pageInfo.pageTrack
					||'business insights detail' === digitalData.page.pageInfo.pageTrack){
				filterType = 'insight';
			}
			if('' !== filterType){
				if(window.sg.components.util !== undefined){
					this.cookieUtil = new window.sg.components.util.CookieUtil();
					this.cookieUtil.addHistory(filterType, $("#pathString").val(), $("#pageUrl").val());
				}			
			}
		}
	});    
})(window.jQuery);
!function(t,e){"object"==typeof exports?module.exports=exports=e():"function"==typeof define&&define.amd?define([],e):t.CryptoJS=e()}(this,function(){var n,o,s,a,h,t,e,l,r,i,c,f,d,u,p,S,x,b,A,H,z,_,v,g,y,B,w,k,m,C,D,E,R,M,F,P,W,O,I,U=U||function(h){var i;if("undefined"!=typeof window&&window.crypto&&(i=window.crypto),"undefined"!=typeof self&&self.crypto&&(i=self.crypto),!(i=!(i=!(i="undefined"!=typeof globalThis&&globalThis.crypto?globalThis.crypto:i)&&"undefined"!=typeof window&&window.msCrypto?window.msCrypto:i)&&"undefined"!=typeof global&&global.crypto?global.crypto:i)&&"function"==typeof require)try{i=require("crypto")}catch(t){}var r=Object.create||function(t){return e.prototype=t,t=new e,e.prototype=null,t};function e(){}var t={},n=t.lib={},o=n.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),(e.init.prototype=e).$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},l=n.WordArray=o.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=s<<24-(i+o)%4*8}else for(var c=0;c<n;c+=4)e[i+c>>>2]=r[c>>>2];return this.sigBytes+=n,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=h.ceil(e/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(function(){if(i){if("function"==typeof i.getRandomValues)try{return i.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof i.randomBytes)try{return i.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")}());return new l.init(e,t)}}),s=t.enc={},c=s.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new l.init(r,e/2)}},a=s.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new l.init(r,e)}},f=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},d=n.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new l.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e,r=this._data,i=r.words,n=r.sigBytes,o=this.blockSize,s=n/(4*o),c=(s=t?h.ceil(s):h.max((0|s)-this._minBufferSize,0))*o,n=h.min(4*c,n);if(c){for(var a=0;a<c;a+=o)this._doProcessBlock(i,a);e=i.splice(0,c),r.sigBytes-=n}return new l.init(e,n)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),u=(n.Hasher=d.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(r){return function(t,e){return new r.init(e).finalize(t)}},_createHmacHelper:function(r){return function(t,e){return new u.HMAC.init(r,e).finalize(t)}}}),t.algo={});return t}(Math);function K(t,e,r){return t&e|~t&r}function X(t,e,r){return t&r|e&~r}function L(t,e){return t<<e|t>>>32-e}function j(t,e,r,i){var n,o=this._iv;o?(n=o.slice(0),this._iv=void 0):n=this._prevBlock,i.encryptBlock(n,0);for(var s=0;s<r;s++)t[e+s]^=n[s]}function T(t){var e,r,i;return 255==(t>>24&255)?(r=t>>8&255,i=255&t,255===(e=t>>16&255)?(e=0,255===r?(r=0,255===i?i=0:++i):++r):++e,t=0,t+=e<<16,t+=r<<8,t+=i):t+=1<<24,t}function N(){for(var t=this._X,e=this._C,r=0;r<8;r++)E[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<E[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<E[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<E[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<E[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<E[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<E[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<E[6]>>>0?1:0)|0,this._b=e[7]>>>0<E[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],n=65535&i,o=i>>>16;R[r]=((n*n>>>17)+n*o>>>15)+o*o^((4294901760&i)*i|0)+((65535&i)*i|0)}t[0]=R[0]+(R[7]<<16|R[7]>>>16)+(R[6]<<16|R[6]>>>16)|0,t[1]=R[1]+(R[0]<<8|R[0]>>>24)+R[7]|0,t[2]=R[2]+(R[1]<<16|R[1]>>>16)+(R[0]<<16|R[0]>>>16)|0,t[3]=R[3]+(R[2]<<8|R[2]>>>24)+R[1]|0,t[4]=R[4]+(R[3]<<16|R[3]>>>16)+(R[2]<<16|R[2]>>>16)|0,t[5]=R[5]+(R[4]<<8|R[4]>>>24)+R[3]|0,t[6]=R[6]+(R[5]<<16|R[5]>>>16)+(R[4]<<16|R[4]>>>16)|0,t[7]=R[7]+(R[6]<<8|R[6]>>>24)+R[5]|0}function q(){for(var t=this._X,e=this._C,r=0;r<8;r++)O[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<O[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<O[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<O[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<O[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<O[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<O[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<O[6]>>>0?1:0)|0,this._b=e[7]>>>0<O[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],n=65535&i,o=i>>>16;I[r]=((n*n>>>17)+n*o>>>15)+o*o^((4294901760&i)*i|0)+((65535&i)*i|0)}t[0]=I[0]+(I[7]<<16|I[7]>>>16)+(I[6]<<16|I[6]>>>16)|0,t[1]=I[1]+(I[0]<<8|I[0]>>>24)+I[7]|0,t[2]=I[2]+(I[1]<<16|I[1]>>>16)+(I[0]<<16|I[0]>>>16)|0,t[3]=I[3]+(I[2]<<8|I[2]>>>24)+I[1]|0,t[4]=I[4]+(I[3]<<16|I[3]>>>16)+(I[2]<<16|I[2]>>>16)|0,t[5]=I[5]+(I[4]<<8|I[4]>>>24)+I[3]|0,t[6]=I[6]+(I[5]<<16|I[5]>>>16)+(I[4]<<16|I[4]>>>16)|0,t[7]=I[7]+(I[6]<<8|I[6]>>>24)+I[5]|0}return F=(M=U).lib,n=F.Base,o=F.WordArray,(M=M.x64={}).Word=n.extend({init:function(t,e){this.high=t,this.low=e}}),M.WordArray=n.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:8*t.length},toX32:function(){for(var t=this.words,e=t.length,r=[],i=0;i<e;i++){var n=t[i];r.push(n.high),r.push(n.low)}return o.create(r,this.sigBytes)},clone:function(){for(var t=n.clone.call(this),e=t.words=this.words.slice(0),r=e.length,i=0;i<r;i++)e[i]=e[i].clone();return t}}),"function"==typeof ArrayBuffer&&(P=U.lib.WordArray,s=P.init,(P.init=function(t){if((t=(t=t instanceof ArrayBuffer?new Uint8Array(t):t)instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):t)instanceof Uint8Array){for(var e=t.byteLength,r=[],i=0;i<e;i++)r[i>>>2]|=t[i]<<24-i%4*8;s.call(this,r,e)}else s.apply(this,arguments)}).prototype=P),function(){var t=U,n=t.lib.WordArray,t=t.enc;t.Utf16=t.Utf16BE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n+=2){var o=e[n>>>2]>>>16-n%4*8&65535;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=t.charCodeAt(i)<<16-i%2*16;return n.create(r,2*e)}};function s(t){return t<<8&4278255360|t>>>8&16711935}t.Utf16LE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n+=2){var o=s(e[n>>>2]>>>16-n%4*8&65535);i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=s(t.charCodeAt(i)<<16-i%2*16);return n.create(r,2*e)}}}(),a=(w=U).lib.WordArray,w.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<r;o+=3)for(var s=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,c=0;c<4&&o+.75*c<r;c++)n.push(i.charAt(s>>>6*(3-c)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(t){var e=t.length,r=this._map;if(!(i=this._reverseMap))for(var i=this._reverseMap=[],n=0;n<r.length;n++)i[r.charCodeAt(n)]=n;var o=r.charAt(64);return!o||-1!==(o=t.indexOf(o))&&(e=o),function(t,e,r){for(var i=[],n=0,o=0;o<e;o++){var s,c;o%4&&(s=r[t.charCodeAt(o-1)]<<o%4*2,c=r[t.charCodeAt(o)]>>>6-o%4*2,c=s|c,i[n>>>2]|=c<<24-n%4*8,n++)}return a.create(i,n)}(t,e,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},h=(F=U).lib.WordArray,F.enc.Base64url={stringify:function(t,e=!0){var r=t.words,i=t.sigBytes,n=e?this._safe_map:this._map;t.clamp();for(var o=[],s=0;s<i;s+=3)for(var c=(r[s>>>2]>>>24-s%4*8&255)<<16|(r[s+1>>>2]>>>24-(s+1)%4*8&255)<<8|r[s+2>>>2]>>>24-(s+2)%4*8&255,a=0;a<4&&s+.75*a<i;a++)o.push(n.charAt(c>>>6*(3-a)&63));var h=n.charAt(64);if(h)for(;o.length%4;)o.push(h);return o.join("")},parse:function(t,e=!0){var r=t.length,i=e?this._safe_map:this._map;if(!(n=this._reverseMap))for(var n=this._reverseMap=[],o=0;o<i.length;o++)n[i.charCodeAt(o)]=o;e=i.charAt(64);return!e||-1!==(e=t.indexOf(e))&&(r=e),function(t,e,r){for(var i=[],n=0,o=0;o<e;o++){var s,c;o%4&&(s=r[t.charCodeAt(o-1)]<<o%4*2,c=r[t.charCodeAt(o)]>>>6-o%4*2,c=s|c,i[n>>>2]|=c<<24-n%4*8,n++)}return h.create(i,n)}(t,r,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"},function(a){var t=U,e=t.lib,r=e.WordArray,i=e.Hasher,e=t.algo,A=[];!function(){for(var t=0;t<64;t++)A[t]=4294967296*a.abs(a.sin(t+1))|0}();e=e.MD5=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,n=t[i];t[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}var o=this._hash.words,s=t[e+0],c=t[e+1],a=t[e+2],h=t[e+3],l=t[e+4],f=t[e+5],d=t[e+6],u=t[e+7],p=t[e+8],_=t[e+9],y=t[e+10],v=t[e+11],g=t[e+12],B=t[e+13],w=t[e+14],k=t[e+15],m=H(m=o[0],b=o[1],x=o[2],S=o[3],s,7,A[0]),S=H(S,m,b,x,c,12,A[1]),x=H(x,S,m,b,a,17,A[2]),b=H(b,x,S,m,h,22,A[3]);m=H(m,b,x,S,l,7,A[4]),S=H(S,m,b,x,f,12,A[5]),x=H(x,S,m,b,d,17,A[6]),b=H(b,x,S,m,u,22,A[7]),m=H(m,b,x,S,p,7,A[8]),S=H(S,m,b,x,_,12,A[9]),x=H(x,S,m,b,y,17,A[10]),b=H(b,x,S,m,v,22,A[11]),m=H(m,b,x,S,g,7,A[12]),S=H(S,m,b,x,B,12,A[13]),x=H(x,S,m,b,w,17,A[14]),m=z(m,b=H(b,x,S,m,k,22,A[15]),x,S,c,5,A[16]),S=z(S,m,b,x,d,9,A[17]),x=z(x,S,m,b,v,14,A[18]),b=z(b,x,S,m,s,20,A[19]),m=z(m,b,x,S,f,5,A[20]),S=z(S,m,b,x,y,9,A[21]),x=z(x,S,m,b,k,14,A[22]),b=z(b,x,S,m,l,20,A[23]),m=z(m,b,x,S,_,5,A[24]),S=z(S,m,b,x,w,9,A[25]),x=z(x,S,m,b,h,14,A[26]),b=z(b,x,S,m,p,20,A[27]),m=z(m,b,x,S,B,5,A[28]),S=z(S,m,b,x,a,9,A[29]),x=z(x,S,m,b,u,14,A[30]),m=C(m,b=z(b,x,S,m,g,20,A[31]),x,S,f,4,A[32]),S=C(S,m,b,x,p,11,A[33]),x=C(x,S,m,b,v,16,A[34]),b=C(b,x,S,m,w,23,A[35]),m=C(m,b,x,S,c,4,A[36]),S=C(S,m,b,x,l,11,A[37]),x=C(x,S,m,b,u,16,A[38]),b=C(b,x,S,m,y,23,A[39]),m=C(m,b,x,S,B,4,A[40]),S=C(S,m,b,x,s,11,A[41]),x=C(x,S,m,b,h,16,A[42]),b=C(b,x,S,m,d,23,A[43]),m=C(m,b,x,S,_,4,A[44]),S=C(S,m,b,x,g,11,A[45]),x=C(x,S,m,b,k,16,A[46]),m=D(m,b=C(b,x,S,m,a,23,A[47]),x,S,s,6,A[48]),S=D(S,m,b,x,u,10,A[49]),x=D(x,S,m,b,w,15,A[50]),b=D(b,x,S,m,f,21,A[51]),m=D(m,b,x,S,g,6,A[52]),S=D(S,m,b,x,h,10,A[53]),x=D(x,S,m,b,y,15,A[54]),b=D(b,x,S,m,c,21,A[55]),m=D(m,b,x,S,p,6,A[56]),S=D(S,m,b,x,k,10,A[57]),x=D(x,S,m,b,d,15,A[58]),b=D(b,x,S,m,B,21,A[59]),m=D(m,b,x,S,l,6,A[60]),S=D(S,m,b,x,v,10,A[61]),x=D(x,S,m,b,a,15,A[62]),b=D(b,x,S,m,_,21,A[63]),o[0]=o[0]+m|0,o[1]=o[1]+b|0,o[2]=o[2]+x|0,o[3]=o[3]+S|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32;var n=a.floor(r/4294967296),r=r;e[15+(64+i>>>9<<4)]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),e[14+(64+i>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(e.length+1),this._process();for(var e=this._hash,o=e.words,s=0;s<4;s++){var c=o[s];o[s]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}return e},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});function H(t,e,r,i,n,o,s){s=t+(e&r|~e&i)+n+s;return(s<<o|s>>>32-o)+e}function z(t,e,r,i,n,o,s){s=t+(e&i|r&~i)+n+s;return(s<<o|s>>>32-o)+e}function C(t,e,r,i,n,o,s){s=t+(e^r^i)+n+s;return(s<<o|s>>>32-o)+e}function D(t,e,r,i,n,o,s){s=t+(r^(e|~i))+n+s;return(s<<o|s>>>32-o)+e}t.MD5=i._createHelper(e),t.HmacMD5=i._createHmacHelper(e)}(Math),P=(M=U).lib,t=P.WordArray,e=P.Hasher,P=M.algo,l=[],P=P.SHA1=e.extend({_doReset:function(){this._hash=new t.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=0;a<80;a++){a<16?l[a]=0|t[e+a]:(h=l[a-3]^l[a-8]^l[a-14]^l[a-16],l[a]=h<<1|h>>>31);var h=(i<<5|i>>>27)+c+l[a];h+=a<20?1518500249+(n&o|~n&s):a<40?1859775393+(n^o^s):a<60?(n&o|n&s|o&s)-1894007588:(n^o^s)-899497514,c=s,s=o,o=n<<30|n>>>2,n=i,i=h}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=Math.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=e.clone.call(this);return t._hash=this._hash.clone(),t}}),M.SHA1=e._createHelper(P),M.HmacSHA1=e._createHmacHelper(P),function(n){var t=U,e=t.lib,r=e.WordArray,i=e.Hasher,e=t.algo,o=[],p=[];!function(){function t(t){return 4294967296*(t-(0|t))|0}for(var e=2,r=0;r<64;)!function(t){for(var e=n.sqrt(t),r=2;r<=e;r++)if(!(t%r))return;return 1}(e)||(r<8&&(o[r]=t(n.pow(e,.5))),p[r]=t(n.pow(e,1/3)),r++),e++}();var _=[],e=e.SHA256=i.extend({_doReset:function(){this._hash=new r.init(o.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=r[5],h=r[6],l=r[7],f=0;f<64;f++){f<16?_[f]=0|t[e+f]:(d=_[f-15],u=_[f-2],_[f]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+_[f-7]+((u<<15|u>>>17)^(u<<13|u>>>19)^u>>>10)+_[f-16]);var d=i&n^i&o^n&o,u=l+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&a^~c&h)+p[f]+_[f],l=h,h=a,a=c,c=s+u|0,s=o,o=n,n=i,i=u+(((i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22))+d)|0}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0,r[5]=r[5]+a|0,r[6]=r[6]+h|0,r[7]=r[7]+l|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=n.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});t.SHA256=i._createHelper(e),t.HmacSHA256=i._createHmacHelper(e)}(Math),r=(w=U).lib.WordArray,F=w.algo,i=F.SHA256,F=F.SHA224=i.extend({_doReset:function(){this._hash=new r.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var t=i._doFinalize.call(this);return t.sigBytes-=4,t}}),w.SHA224=i._createHelper(F),w.HmacSHA224=i._createHmacHelper(F),function(){var t=U,e=t.lib.Hasher,r=t.x64,i=r.Word,n=r.WordArray,r=t.algo;function o(){return i.create.apply(i,arguments)}var t1=[o(1116352408,3609767458),o(1899447441,602891725),o(3049323471,3964484399),o(3921009573,2173295548),o(961987163,4081628472),o(1508970993,3053834265),o(2453635748,2937671579),o(2870763221,3664609560),o(3624381080,2734883394),o(310598401,1164996542),o(607225278,1323610764),o(1426881987,3590304994),o(1925078388,4068182383),o(2162078206,991336113),o(2614888103,633803317),o(3248222580,3479774868),o(3835390401,2666613458),o(4022224774,944711139),o(264347078,2341262773),o(604807628,2007800933),o(770255983,1495990901),o(1249150122,1856431235),o(1555081692,3175218132),o(1996064986,2198950837),o(2554220882,3999719339),o(2821834349,766784016),o(2952996808,2566594879),o(3210313671,3203337956),o(3336571891,1034457026),o(3584528711,2466948901),o(113926993,3758326383),o(338241895,168717936),o(666307205,1188179964),o(773529912,1546045734),o(1294757372,1522805485),o(1396182291,2643833823),o(1695183700,2343527390),o(1986661051,1014477480),o(2177026350,1206759142),o(2456956037,344077627),o(2730485921,1290863460),o(2820302411,3158454273),o(3259730800,3505952657),o(3345764771,106217008),o(3516065817,3606008344),o(3600352804,1432725776),o(4094571909,1467031594),o(275423344,851169720),o(430227734,3100823752),o(506948616,1363258195),o(659060556,3750685593),o(883997877,3785050280),o(958139571,3318307427),o(1322822218,3812723403),o(1537002063,2003034995),o(1747873779,3602036899),o(1955562222,1575990012),o(2024104815,1125592928),o(2227730452,2716904306),o(2361852424,442776044),o(2428436474,593698344),o(2756734187,3733110249),o(3204031479,2999351573),o(3329325298,3815920427),o(3391569614,3928383900),o(3515267271,566280711),o(3940187606,3454069534),o(4118630271,4000239992),o(116418474,1914138554),o(174292421,2731055270),o(289380356,3203993006),o(460393269,320620315),o(685471733,587496836),o(852142971,1086792851),o(1017036298,365543100),o(1126000580,2618297676),o(1288033470,3409855158),o(1501505948,4234509866),o(1607167915,987167468),o(1816402316,1246189591)],e1=[];!function(){for(var t=0;t<80;t++)e1[t]=o()}();r=r.SHA512=e.extend({_doReset:function(){this._hash=new n.init([new i.init(1779033703,4089235720),new i.init(3144134277,2227873595),new i.init(1013904242,4271175723),new i.init(2773480762,1595750129),new i.init(1359893119,2917565137),new i.init(2600822924,725511199),new i.init(528734635,4215389547),new i.init(1541459225,327033209)])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=r[5],h=r[6],l=r[7],f=i.high,d=i.low,u=n.high,p=n.low,_=o.high,y=o.low,v=s.high,g=s.low,B=c.high,w=c.low,k=a.high,m=a.low,S=h.high,x=h.low,b=l.high,r=l.low,A=f,H=d,z=u,C=p,D=_,E=y,R=v,M=g,F=B,P=w,W=k,O=m,I=S,U=x,K=b,X=r,L=0;L<80;L++){var j,T,N=e1[L];L<16?(T=N.high=0|t[e+2*L],j=N.low=0|t[e+2*L+1]):($=(q=e1[L-15]).high,J=q.low,G=(Q=e1[L-2]).high,V=Q.low,Z=(Y=e1[L-7]).high,q=Y.low,Y=(Q=e1[L-16]).high,T=(T=(($>>>1|J<<31)^($>>>8|J<<24)^$>>>7)+Z+((j=(Z=(J>>>1|$<<31)^(J>>>8|$<<24)^(J>>>7|$<<25))+q)>>>0<Z>>>0?1:0))+((G>>>19|V<<13)^(G<<3|V>>>29)^G>>>6)+((j+=J=(V>>>19|G<<13)^(V<<3|G>>>29)^(V>>>6|G<<26))>>>0<J>>>0?1:0),j+=$=Q.low,N.high=T=T+Y+(j>>>0<$>>>0?1:0),N.low=j);var q=F&W^~F&I,Z=P&O^~P&U,V=A&z^A&D^z&D,G=(H>>>28|A<<4)^(H<<30|A>>>2)^(H<<25|A>>>7),J=t1[L],Q=J.high,Y=J.low,$=X+((P>>>14|F<<18)^(P>>>18|F<<14)^(P<<23|F>>>9)),N=K+((F>>>14|P<<18)^(F>>>18|P<<14)^(F<<23|P>>>9))+($>>>0<X>>>0?1:0),J=G+(H&C^H&E^C&E),K=I,X=U,I=W,U=O,W=F,O=P,F=R+(N=(N=(N=N+q+(($=$+Z)>>>0<Z>>>0?1:0))+Q+(($=$+Y)>>>0<Y>>>0?1:0))+T+(($=$+j)>>>0<j>>>0?1:0))+((P=M+$|0)>>>0<M>>>0?1:0)|0,R=D,M=E,D=z,E=C,z=A,C=H,A=N+(((A>>>28|H<<4)^(A<<30|H>>>2)^(A<<25|H>>>7))+V+(J>>>0<G>>>0?1:0))+((H=$+J|0)>>>0<$>>>0?1:0)|0}d=i.low=d+H,i.high=f+A+(d>>>0<H>>>0?1:0),p=n.low=p+C,n.high=u+z+(p>>>0<C>>>0?1:0),y=o.low=y+E,o.high=_+D+(y>>>0<E>>>0?1:0),g=s.low=g+M,s.high=v+R+(g>>>0<M>>>0?1:0),w=c.low=w+P,c.high=B+F+(w>>>0<P>>>0?1:0),m=a.low=m+O,a.high=k+W+(m>>>0<O>>>0?1:0),x=h.low=x+U,h.high=S+I+(x>>>0<U>>>0?1:0),r=l.low=r+X,l.high=b+K+(r>>>0<X>>>0?1:0)},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[30+(128+i>>>10<<5)]=Math.floor(r/4294967296),e[31+(128+i>>>10<<5)]=r,t.sigBytes=4*e.length,this._process(),this._hash.toX32()},clone:function(){var t=e.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:32});t.SHA512=e._createHelper(r),t.HmacSHA512=e._createHmacHelper(r)}(),P=(M=U).x64,c=P.Word,f=P.WordArray,P=M.algo,d=P.SHA512,P=P.SHA384=d.extend({_doReset:function(){this._hash=new f.init([new c.init(3418070365,3238371032),new c.init(1654270250,914150663),new c.init(2438529370,812702999),new c.init(355462360,4144912697),new c.init(1731405415,4290775857),new c.init(2394180231,1750603025),new c.init(3675008525,1694076839),new c.init(1203062813,3204075428)])},_doFinalize:function(){var t=d._doFinalize.call(this);return t.sigBytes-=16,t}}),M.SHA384=d._createHelper(P),M.HmacSHA384=d._createHmacHelper(P),function(l){var t=U,e=t.lib,f=e.WordArray,i=e.Hasher,d=t.x64.Word,e=t.algo,A=[],H=[],z=[];!function(){for(var t=1,e=0,r=0;r<24;r++){A[t+5*e]=(r+1)*(r+2)/2%64;var i=(2*t+3*e)%5;t=e%5,e=i}for(t=0;t<5;t++)for(e=0;e<5;e++)H[t+5*e]=e+(2*t+3*e)%5*5;for(var n=1,o=0;o<24;o++){for(var s,c=0,a=0,h=0;h<7;h++)1&n&&((s=(1<<h)-1)<32?a^=1<<s:c^=1<<s-32),128&n?n=n<<1^113:n<<=1;z[o]=d.create(c,a)}}();var C=[];!function(){for(var t=0;t<25;t++)C[t]=d.create()}();e=e.SHA3=i.extend({cfg:i.cfg.extend({outputLength:512}),_doReset:function(){for(var t=this._state=[],e=0;e<25;e++)t[e]=new d.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(t,e){for(var r=this._state,i=this.blockSize/2,n=0;n<i;n++){var o=t[e+2*n],s=t[e+2*n+1],o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8);(m=r[n]).high^=s=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),m.low^=o}for(var c=0;c<24;c++){for(var a=0;a<5;a++){for(var h=0,l=0,f=0;f<5;f++)h^=(m=r[a+5*f]).high,l^=m.low;var d=C[a];d.high=h,d.low=l}for(a=0;a<5;a++)for(var u=C[(a+4)%5],p=C[(a+1)%5],_=p.high,p=p.low,h=u.high^(_<<1|p>>>31),l=u.low^(p<<1|_>>>31),f=0;f<5;f++)(m=r[a+5*f]).high^=h,m.low^=l;for(var y=1;y<25;y++){var v=(m=r[y]).high,g=m.low,B=A[y];l=B<32?(h=v<<B|g>>>32-B,g<<B|v>>>32-B):(h=g<<B-32|v>>>64-B,v<<B-32|g>>>64-B);B=C[H[y]];B.high=h,B.low=l}var w=C[0],k=r[0];w.high=k.high,w.low=k.low;for(a=0;a<5;a++)for(f=0;f<5;f++){var m=r[y=a+5*f],S=C[y],x=C[(a+1)%5+5*f],b=C[(a+2)%5+5*f];m.high=S.high^~x.high&b.high,m.low=S.low^~x.low&b.low}m=r[0],k=z[c];m.high^=k.high,m.low^=k.low}},_doFinalize:function(){var t=this._data,e=t.words,r=(this._nDataBytes,8*t.sigBytes),i=32*this.blockSize;e[r>>>5]|=1<<24-r%32,e[(l.ceil((1+r)/i)*i>>>5)-1]|=128,t.sigBytes=4*e.length,this._process();for(var n=this._state,e=this.cfg.outputLength/8,o=e/8,s=[],c=0;c<o;c++){var a=n[c],h=a.high,a=a.low,h=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8);s.push(a=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)),s.push(h)}return new f.init(s,e)},clone:function(){for(var t=i.clone.call(this),e=t._state=this._state.slice(0),r=0;r<25;r++)e[r]=e[r].clone();return t}});t.SHA3=i._createHelper(e),t.HmacSHA3=i._createHmacHelper(e)}(Math),Math,F=(w=U).lib,u=F.WordArray,p=F.Hasher,F=w.algo,S=u.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),x=u.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),b=u.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),A=u.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),H=u.create([0,1518500249,1859775393,2400959708,2840853838]),z=u.create([1352829926,1548603684,1836072691,2053994217,0]),F=F.RIPEMD160=p.extend({_doReset:function(){this._hash=u.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,n=t[i];t[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}for(var o,s,c,a,h,l,f=this._hash.words,d=H.words,u=z.words,p=S.words,_=x.words,y=b.words,v=A.words,g=o=f[0],B=s=f[1],w=c=f[2],k=a=f[3],m=h=f[4],r=0;r<80;r+=1)l=o+t[e+p[r]]|0,l+=r<16?(s^c^a)+d[0]:r<32?K(s,c,a)+d[1]:r<48?((s|~c)^a)+d[2]:r<64?X(s,c,a)+d[3]:(s^(c|~a))+d[4],l=(l=L(l|=0,y[r]))+h|0,o=h,h=a,a=L(c,10),c=s,s=l,l=g+t[e+_[r]]|0,l+=r<16?(B^(w|~k))+u[0]:r<32?X(B,w,k)+u[1]:r<48?((B|~w)^k)+u[2]:r<64?K(B,w,k)+u[3]:(B^w^k)+u[4],l=(l=L(l|=0,v[r]))+m|0,g=m,m=k,k=L(w,10),w=B,B=l;l=f[1]+c+k|0,f[1]=f[2]+a+m|0,f[2]=f[3]+h+g|0,f[3]=f[4]+o+B|0,f[4]=f[0]+s+w|0,f[0]=l},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(e.length+1),this._process();for(var e=this._hash,n=e.words,o=0;o<5;o++){var s=n[o];n[o]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return e},clone:function(){var t=p.clone.call(this);return t._hash=this._hash.clone(),t}}),w.RIPEMD160=p._createHelper(F),w.HmacRIPEMD160=p._createHmacHelper(F),P=(M=U).lib.Base,_=M.enc.Utf8,M.algo.HMAC=P.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=_.parse(e));var r=t.blockSize,i=4*r;(e=e.sigBytes>i?t.finalize(e):e).clamp();for(var t=this._oKey=e.clone(),e=this._iKey=e.clone(),n=t.words,o=e.words,s=0;s<r;s++)n[s]^=1549556828,o[s]^=909522486;t.sigBytes=e.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,t=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(t))}}),F=(w=U).lib,M=F.Base,v=F.WordArray,P=w.algo,F=P.SHA1,g=P.HMAC,y=P.PBKDF2=M.extend({cfg:M.extend({keySize:4,hasher:F,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=this.cfg,i=g.create(r.hasher,t),n=v.create(),o=v.create([1]),s=n.words,c=o.words,a=r.keySize,h=r.iterations;s.length<a;){var l=i.update(e).finalize(o);i.reset();for(var f=l.words,d=f.length,u=l,p=1;p<h;p++){u=i.finalize(u),i.reset();for(var _=u.words,y=0;y<d;y++)f[y]^=_[y]}n.concat(l),c[0]++}return n.sigBytes=4*a,n}}),w.PBKDF2=function(t,e,r){return y.create(r).compute(t,e)},M=(P=U).lib,F=M.Base,B=M.WordArray,w=P.algo,M=w.MD5,k=w.EvpKDF=F.extend({cfg:F.extend({keySize:4,hasher:M,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r,i=this.cfg,n=i.hasher.create(),o=B.create(),s=o.words,c=i.keySize,a=i.iterations;s.length<c;){r&&n.update(r),r=n.update(t).finalize(e),n.reset();for(var h=1;h<a;h++)r=n.finalize(r),n.reset();o.concat(r)}return o.sigBytes=4*c,o}}),P.EvpKDF=function(t,e,r){return k.create(r).compute(t,e)},U.lib.Cipher||function(){var t=U,e=t.lib,r=e.Base,s=e.WordArray,i=e.BufferedBlockAlgorithm,n=t.enc,o=(n.Utf8,n.Base64),c=t.algo.EvpKDF,a=e.Cipher=i.extend({cfg:r.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){i.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(i){return{encrypt:function(t,e,r){return h(e).encrypt(i,t,e,r)},decrypt:function(t,e,r){return h(e).decrypt(i,t,e,r)}}}});function h(t){return"string"==typeof t?p:u}e.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=t.mode={},n=e.BlockCipherMode=r.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),n=l.CBC=((l=n.extend()).Encryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;f.call(this,t,e,i),r.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),l.Decryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);r.decryptBlock(t,e),f.call(this,t,e,i),this._prevBlock=n}}),l);function f(t,e,r){var i,n=this._iv;n?(i=n,this._iv=void 0):i=this._prevBlock;for(var o=0;o<r;o++)t[e+o]^=i[o]}var l=(t.pad={}).Pkcs7={pad:function(t,e){for(var e=4*e,r=e-t.sigBytes%e,i=r<<24|r<<16|r<<8|r,n=[],o=0;o<r;o+=4)n.push(i);e=s.create(n,r);t.concat(e)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},d=(e.BlockCipher=a.extend({cfg:a.cfg.extend({mode:n,padding:l}),reset:function(){var t;a.reset.call(this);var e=this.cfg,r=e.iv,e=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=e.createEncryptor:(t=e.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(e,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),e.CipherParams=r.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),l=(t.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,t=t.salt,e=t?s.create([1398893684,1701076831]).concat(t).concat(e):e;return e.toString(o)},parse:function(t){var e,r=o.parse(t),t=r.words;return 1398893684==t[0]&&1701076831==t[1]&&(e=s.create(t.slice(2,4)),t.splice(0,4),r.sigBytes-=16),d.create({ciphertext:r,salt:e})}},u=e.SerializableCipher=r.extend({cfg:r.extend({format:l}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),e=n.finalize(e),n=n.cfg;return d.create({ciphertext:e,key:r,iv:n.iv,algorithm:t,mode:n.mode,padding:n.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),t=(t.kdf={}).OpenSSL={execute:function(t,e,r,i){i=i||s.random(8);t=c.create({keySize:e+r}).compute(t,i),r=s.create(t.words.slice(e),4*r);return t.sigBytes=4*e,d.create({key:t,iv:r,salt:i})}},p=e.PasswordBasedCipher=u.extend({cfg:u.cfg.extend({kdf:t}),encrypt:function(t,e,r,i){r=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize);i.iv=r.iv;i=u.encrypt.call(this,t,e,r.key,i);return i.mixIn(r),i},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);r=i.kdf.execute(r,t.keySize,t.ivSize,e.salt);return i.iv=r.iv,u.decrypt.call(this,t,e,r.key,i)}})}(),U.mode.CFB=((F=U.lib.BlockCipherMode.extend()).Encryptor=F.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;j.call(this,t,e,i,r),this._prevBlock=t.slice(e,e+i)}}),F.Decryptor=F.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);j.call(this,t,e,i,r),this._prevBlock=n}}),F),U.mode.CTR=(M=U.lib.BlockCipherMode.extend(),P=M.Encryptor=M.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,o=this._counter;n&&(o=this._counter=n.slice(0),this._iv=void 0);var s=o.slice(0);r.encryptBlock(s,0),o[i-1]=o[i-1]+1|0;for(var c=0;c<i;c++)t[e+c]^=s[c]}}),M.Decryptor=P,M),U.mode.CTRGladman=(F=U.lib.BlockCipherMode.extend(),P=F.Encryptor=F.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,o=this._counter;n&&(o=this._counter=n.slice(0),this._iv=void 0),0===((n=o)[0]=T(n[0]))&&(n[1]=T(n[1]));var s=o.slice(0);r.encryptBlock(s,0);for(var c=0;c<i;c++)t[e+c]^=s[c]}}),F.Decryptor=P,F),U.mode.OFB=(M=U.lib.BlockCipherMode.extend(),P=M.Encryptor=M.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,o=this._keystream;n&&(o=this._keystream=n.slice(0),this._iv=void 0),r.encryptBlock(o,0);for(var s=0;s<i;s++)t[e+s]^=o[s]}}),M.Decryptor=P,M),U.mode.ECB=((F=U.lib.BlockCipherMode.extend()).Encryptor=F.extend({processBlock:function(t,e){this._cipher.encryptBlock(t,e)}}),F.Decryptor=F.extend({processBlock:function(t,e){this._cipher.decryptBlock(t,e)}}),F),U.pad.AnsiX923={pad:function(t,e){var r=t.sigBytes,e=4*e,e=e-r%e,r=r+e-1;t.clamp(),t.words[r>>>2]|=e<<24-r%4*8,t.sigBytes+=e},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},U.pad.Iso10126={pad:function(t,e){e*=4,e-=t.sigBytes%e;t.concat(U.lib.WordArray.random(e-1)).concat(U.lib.WordArray.create([e<<24],1))},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},U.pad.Iso97971={pad:function(t,e){t.concat(U.lib.WordArray.create([2147483648],1)),U.pad.ZeroPadding.pad(t,e)},unpad:function(t){U.pad.ZeroPadding.unpad(t),t.sigBytes--}},U.pad.ZeroPadding={pad:function(t,e){e*=4;t.clamp(),t.sigBytes+=e-(t.sigBytes%e||e)},unpad:function(t){for(var e=t.words,r=t.sigBytes-1,r=t.sigBytes-1;0<=r;r--)if(e[r>>>2]>>>24-r%4*8&255){t.sigBytes=r+1;break}}},U.pad.NoPadding={pad:function(){},unpad:function(){}},m=(P=U).lib.CipherParams,C=P.enc.Hex,P.format.Hex={stringify:function(t){return t.ciphertext.toString(C)},parse:function(t){t=C.parse(t);return m.create({ciphertext:t})}},function(){var t=U,e=t.lib.BlockCipher,r=t.algo,h=[],l=[],f=[],d=[],u=[],p=[],_=[],y=[],v=[],g=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;for(var r=0,i=0,e=0;e<256;e++){var n=i^i<<1^i<<2^i<<3^i<<4;h[r]=n=n>>>8^255&n^99;var o=t[l[n]=r],s=t[o],c=t[s],a=257*t[n]^16843008*n;f[r]=a<<24|a>>>8,d[r]=a<<16|a>>>16,u[r]=a<<8|a>>>24,p[r]=a,_[n]=(a=16843009*c^65537*s^257*o^16843008*r)<<24|a>>>8,y[n]=a<<16|a>>>16,v[n]=a<<8|a>>>24,g[n]=a,r?(r=o^t[t[t[c^o]]],i^=t[t[i]]):r=i=1}}();var B=[0,1,2,4,8,16,32,64,128,27,54],r=r.AES=e.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,i=4*(1+(this._nRounds=6+r)),n=this._keySchedule=[],o=0;o<i;o++)o<r?n[o]=e[o]:(a=n[o-1],o%r?6<r&&o%r==4&&(a=h[a>>>24]<<24|h[a>>>16&255]<<16|h[a>>>8&255]<<8|h[255&a]):(a=h[(a=a<<8|a>>>24)>>>24]<<24|h[a>>>16&255]<<16|h[a>>>8&255]<<8|h[255&a],a^=B[o/r|0]<<24),n[o]=n[o-r]^a);for(var s=this._invKeySchedule=[],c=0;c<i;c++){var a,o=i-c;a=c%4?n[o]:n[o-4],s[c]=c<4||o<=4?a:_[h[a>>>24]]^y[h[a>>>16&255]]^v[h[a>>>8&255]]^g[h[255&a]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,f,d,u,p,h)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,_,y,v,g,l);r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,s,c){for(var a=this._nRounds,h=t[e]^r[0],l=t[e+1]^r[1],f=t[e+2]^r[2],d=t[e+3]^r[3],u=4,p=1;p<a;p++)var _=i[h>>>24]^n[l>>>16&255]^o[f>>>8&255]^s[255&d]^r[u++],y=i[l>>>24]^n[f>>>16&255]^o[d>>>8&255]^s[255&h]^r[u++],v=i[f>>>24]^n[d>>>16&255]^o[h>>>8&255]^s[255&l]^r[u++],g=i[d>>>24]^n[h>>>16&255]^o[l>>>8&255]^s[255&f]^r[u++],h=_,l=y,f=v,d=g;_=(c[h>>>24]<<24|c[l>>>16&255]<<16|c[f>>>8&255]<<8|c[255&d])^r[u++],y=(c[l>>>24]<<24|c[f>>>16&255]<<16|c[d>>>8&255]<<8|c[255&h])^r[u++],v=(c[f>>>24]<<24|c[d>>>16&255]<<16|c[h>>>8&255]<<8|c[255&l])^r[u++],g=(c[d>>>24]<<24|c[h>>>16&255]<<16|c[l>>>8&255]<<8|c[255&f])^r[u++];t[e]=_,t[e+1]=y,t[e+2]=v,t[e+3]=g},keySize:8});t.AES=e._createHelper(r)}(),function(){var t=U,e=t.lib,i=e.WordArray,r=e.BlockCipher,e=t.algo,h=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],l=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],f=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],d=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],n=e.DES=r.extend({_doReset:function(){for(var t=this._key.words,e=[],r=0;r<56;r++){var i=h[r]-1;e[r]=t[i>>>5]>>>31-i%32&1}for(var n=this._subKeys=[],o=0;o<16;o++){for(var s=n[o]=[],c=f[o],r=0;r<24;r++)s[r/6|0]|=e[(l[r]-1+c)%28]<<31-r%6,s[4+(r/6|0)]|=e[28+(l[r+24]-1+c)%28]<<31-r%6;s[0]=s[0]<<1|s[0]>>>31;for(r=1;r<7;r++)s[r]=s[r]>>>4*(r-1)+3;s[7]=s[7]<<5|s[7]>>>27}for(var a=this._invSubKeys=[],r=0;r<16;r++)a[r]=n[15-r]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._subKeys)},decryptBlock:function(t,e){this._doCryptBlock(t,e,this._invSubKeys)},_doCryptBlock:function(t,e,r){this._lBlock=t[e],this._rBlock=t[e+1],p.call(this,4,252645135),p.call(this,16,65535),_.call(this,2,858993459),_.call(this,8,16711935),p.call(this,1,1431655765);for(var i=0;i<16;i++){for(var n=r[i],o=this._lBlock,s=this._rBlock,c=0,a=0;a<8;a++)c|=d[a][((s^n[a])&u[a])>>>0];this._lBlock=s,this._rBlock=o^c}var h=this._lBlock;this._lBlock=this._rBlock,this._rBlock=h,p.call(this,1,1431655765),_.call(this,8,16711935),_.call(this,2,858993459),p.call(this,16,65535),p.call(this,4,252645135),t[e]=this._lBlock,t[e+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});function p(t,e){e=(this._lBlock>>>t^this._rBlock)&e;this._rBlock^=e,this._lBlock^=e<<t}function _(t,e){e=(this._rBlock>>>t^this._lBlock)&e;this._lBlock^=e,this._rBlock^=e<<t}t.DES=r._createHelper(n);e=e.TripleDES=r.extend({_doReset:function(){var t=this._key.words;if(2!==t.length&&4!==t.length&&t.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var e=t.slice(0,2),r=t.length<4?t.slice(0,2):t.slice(2,4),t=t.length<6?t.slice(0,2):t.slice(4,6);this._des1=n.createEncryptor(i.create(e)),this._des2=n.createEncryptor(i.create(r)),this._des3=n.createEncryptor(i.create(t))},encryptBlock:function(t,e){this._des1.encryptBlock(t,e),this._des2.decryptBlock(t,e),this._des3.encryptBlock(t,e)},decryptBlock:function(t,e){this._des3.decryptBlock(t,e),this._des2.encryptBlock(t,e),this._des1.decryptBlock(t,e)},keySize:6,ivSize:2,blockSize:2});t.TripleDES=r._createHelper(e)}(),function(){var t=U,e=t.lib.StreamCipher,r=t.algo,i=r.RC4=e.extend({_doReset:function(){for(var t=this._key,e=t.words,r=t.sigBytes,i=this._S=[],n=0;n<256;n++)i[n]=n;for(var n=0,o=0;n<256;n++){var s=n%r,s=e[s>>>2]>>>24-s%4*8&255,o=(o+i[n]+s)%256,s=i[n];i[n]=i[o],i[o]=s}this._i=this._j=0},_doProcessBlock:function(t,e){t[e]^=n.call(this)},keySize:8,ivSize:0});function n(){for(var t=this._S,e=this._i,r=this._j,i=0,n=0;n<4;n++){var r=(r+t[e=(e+1)%256])%256,o=t[e];t[e]=t[r],t[r]=o,i|=t[(t[e]+t[r])%256]<<24-8*n}return this._i=e,this._j=r,i}t.RC4=e._createHelper(i);r=r.RC4Drop=i.extend({cfg:i.cfg.extend({drop:192}),_doReset:function(){i._doReset.call(this);for(var t=this.cfg.drop;0<t;t--)n.call(this)}});t.RC4Drop=e._createHelper(r)}(),F=(M=U).lib.StreamCipher,P=M.algo,D=[],E=[],R=[],P=P.Rabbit=F.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=0;r<4;r++)t[r]=16711935&(t[r]<<8|t[r]>>>24)|4278255360&(t[r]<<24|t[r]>>>8);for(var i=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],n=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],r=this._b=0;r<4;r++)N.call(this);for(r=0;r<8;r++)n[r]^=i[r+4&7];if(e){var o=e.words,s=o[0],c=o[1],e=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),o=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),s=e>>>16|4294901760&o,c=o<<16|65535&e;n[0]^=e,n[1]^=s,n[2]^=o,n[3]^=c,n[4]^=e,n[5]^=s,n[6]^=o,n[7]^=c;for(r=0;r<4;r++)N.call(this)}},_doProcessBlock:function(t,e){var r=this._X;N.call(this),D[0]=r[0]^r[5]>>>16^r[3]<<16,D[1]=r[2]^r[7]>>>16^r[5]<<16,D[2]=r[4]^r[1]>>>16^r[7]<<16,D[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)D[i]=16711935&(D[i]<<8|D[i]>>>24)|4278255360&(D[i]<<24|D[i]>>>8),t[e+i]^=D[i]},blockSize:4,ivSize:2}),M.Rabbit=F._createHelper(P),F=(M=U).lib.StreamCipher,P=M.algo,W=[],O=[],I=[],P=P.RabbitLegacy=F.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],i=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],n=this._b=0;n<4;n++)q.call(this);for(n=0;n<8;n++)i[n]^=r[n+4&7];if(e){var o=e.words,s=o[0],t=o[1],e=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),o=16711935&(t<<8|t>>>24)|4278255360&(t<<24|t>>>8),s=e>>>16|4294901760&o,t=o<<16|65535&e;i[0]^=e,i[1]^=s,i[2]^=o,i[3]^=t,i[4]^=e,i[5]^=s,i[6]^=o,i[7]^=t;for(n=0;n<4;n++)q.call(this)}},_doProcessBlock:function(t,e){var r=this._X;q.call(this),W[0]=r[0]^r[5]>>>16^r[3]<<16,W[1]=r[2]^r[7]>>>16^r[5]<<16,W[2]=r[4]^r[1]>>>16^r[7]<<16,W[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)W[i]=16711935&(W[i]<<8|W[i]>>>24)|4278255360&(W[i]<<24|W[i]>>>8),t[e+i]^=W[i]},blockSize:4,ivSize:2}),M.RabbitLegacy=F._createHelper(P),U});
var COMMON_NETFUNNEL_ACTIONID;
(function ($, doc) {
	COMMON_NETFUNNEL_ACTIONID = (function () {
		var sap=function () {
			var sapdata="";
			
			//quere-fra : SMN / SMN2 / SMN3 / SMI / SMR
			//queue-syd : SMA
			//queue-sin : SMS
			//queue-yvr : SMC
			/*
			if(siteCode == "at" || siteCode == "es" || siteCode == "dk" || siteCode == "fi" || siteCode == "it" || siteCode == "no" 
				|| siteCode == "pt" || siteCode == "se" || siteCode == "ch" || siteCode == "ch_fr"){
				sapdata ="SME";
			}else if(siteCode == "ae" || siteCode == "ae_ar" || siteCode == "bh" || siteCode == "bh_ar" || siteCode == "kw" || siteCode == "kw_ar" || siteCode == "om" || siteCode == "om_ar" || siteCode == "sa" || siteCode == "sa_en" || siteCode == "za" || siteCode == "eg" || siteCode == "il" || siteCode == "n_africa" || siteCode == "levant" || siteCode == "levant_ar" || siteCode == "pk"){
				sapdata ="SMM";
			}else if(siteCode == "ru"){
				sapdata ="SMR";
			}else if(siteCode == "au"){
				sapdata ="SAM1";
			}else if(siteCode == "nz" || siteCode == "vn" || siteCode == "th" || siteCode == "my" || siteCode == "sg" || siteCode == "tw" || siteCode == "hk" || siteCode == "hk_en"){
				sapdata ="SAM2";
			}else if(siteCode == "ca" || siteCode == "ca_fr"){
				sapdata ="SMC";
			}
			*/
			
			//commonNetFunnelJsStringArea가 없는 곳에서 호출되는 경우 commonNetFunnelJsStringArea is not defined 방지
			if(typeof commonNetFunnelJsStringArea != "undefined") {
				sapdata = commonNetFunnelJsStringArea; //meta에 정의된 값을 가져옴
			}
			
			return sapdata;
		};
		return  {
			AEM_BUY : "Buy_"+sap(),
			AEM_ADD : "BuyAdd_"+sap()
		}
	})();
})(window.jQuery, window.document);
;
(function() {

	"use strict";

	const SEL_ALL_VIDEO = "script[data-object-type='VideoObject']";

	const ATTR_THUMBNAIL_URL = "thumbnailUrl";
	const ATTR_CONTENT_URL = "contentUrl";

	const DTYPE_DESKTOP = "desktop";
	const DTYPE_MOBILE = "mobile";

	const SFX_DESKTOP = "_" + DTYPE_DESKTOP;
	const SFX_MOBILE = "_" + DTYPE_MOBILE;

	// Client functions from clientlibs-common: window.sg.common.utils.getCurrentDevice()
	//
	const BREAKPOINTS = {
		DESKTOP : 1440,
		MOBILE : 767,
		MOBILE_UNDER : 360,
	};
	function _getViewPort() {
		let doc = window;
		let pre = 'inner';

		if (!('innerWidth' in window)) {
			pre = 'client';
			doc = document.documentElement || document.body;
		}

		return {
			width : doc[pre + "Width"],
			height : doc[pre + "Height"],
		};
	}
	function _getCurrentDevice() {
		const width = _getViewPort().width;
		return width > BREAKPOINTS.MOBILE ? 'desktop' : 'mobile';
	}

	let _deviceType = _getCurrentDevice();

	function _arrangeVideoObjects() {
		let tags = document.querySelectorAll(SEL_ALL_VIDEO);
		if (tags && tags.length > 0) {
			for (let i = 0, nTags = tags.length; i < nTags; i++) {
				let t = tags[i], obj = JSON.parse(tags[i].innerText);
				_arrangeField(obj, ATTR_THUMBNAIL_URL);
				_arrangeField(obj, ATTR_CONTENT_URL);
				tags[i].innerText = JSON.stringify(obj);
			}
		}
	}

	function _arrangeField(obj, target) {

		function _checkAndSet(o, a, b, target) {
			if (a && a.length > 0) {
				o[target] = a;
			} else {
				if (!o[target] && b && b.length > 0) {
					obj[target] = b;
				}
			}
		}

		let dKey = target + SFX_DESKTOP, d = obj[dKey];
		let mKey = target + SFX_MOBILE, m = obj[mKey];

		if (_deviceType === DTYPE_MOBILE) {
			_checkAndSet(obj, m, d, target);
		} else if (_deviceType === DTYPE_DESKTOP) {
			_checkAndSet(obj, d, m, target);
		}

		delete obj[dKey];
		delete obj[mKey];
	}

	// execute on load time
	//
	_arrangeVideoObjects();

})();

;
(function($) {

	"use strict";

	function _arrangeAccessibilityElements(tagSelector, attr) {
		$(tagSelector).each(function(i, elem) {
			_setEmptyAttribute(elem, attr);
		});
	}

	function _setEmptyAttribute(elem, attr) {
		if (!elem.hasAttribute(attr)) {
			elem.setAttribute(attr, "");
		}
	}

	$(function() {
		// _arrangeAccessibilityElements("a", "title");
		_arrangeAccessibilityElements("img", "alt");
	});

})(jQuery);


/**
 * GNB Util 내부 스크립트 Jquery 오류로 인한 위치 변경
 */

 var SITE_CD = "";
 if ($("#siteCode").val() !== '' && $("#siteCode").val() !== undefined) {
	 SITE_CD = $("#siteCode").val();
 } else {
	 SITE_CD = 'sec';
 }
 
 var USE_ESTORE = true;
 
 var DOMAIN = "";
 if ($("#domain").val() !== '' && $("#domain").val() !== undefined) {
	 DOMAIN = $("#domain").val();
 } else {
	 DOMAIN = 'www.samsung.com';
 }
 
 var STORE_DOMAIN = '';
 
 if($("#useStore").val() === 'N') {
	 USE_ESTORE = false;
 }
 
 if ($("#storeDomain").val() !== '') {
	 STORE_DOMAIN = $("#storeDomain").val();
 } else {
	 STORE_DOMAIN = location.protocol+'shop.samsung.com';
 }

function checkEppSite() {
    var a = ""
      , h = document.location.pathname;
    h = h.replace(".html", "/");
    h = h.split("/");
    5 <= h.length && "content" == h[1] && "samsung" == h[2] ? a = h[4] : 3 <= h.length && (a = h[2]);
    return "multistore" == a
}
Granite.I18n = Granite.I18nSearch;
siteCode = 'us';
function fnIsNull(a) {
    return "" === a || void 0 === a || null === a
}
window.sg = window.sg || {};
window.sg.common = window.sg.common || {};
window.sg.common.utils = window.sg.common.utils || {};
window.sg.common.utils.isRtl = window.sg.common.utils.isRtl || function () {
  return "RTL" === getComputedStyle(document.body).direction.toUpperCase()
}

 // Store API 호출 시 사용하는 SiteCode
 const STORE_SITE_CODE = $('#store_sitecode').val();
 // [P6 B2B] b2b 여부 체크
 const IS_B2B = $('#b2bFlag').val() === "Y" ? true : false;
 //[EPP] EPP 관련 변수 추가
 const IS_EPP = checkEppSite();
 let EPP_COMPANYCODE = "";
 if(window.sg!= null && window.sg.epp != null && window.sg.epp.common != null){
	EPP_COMPANYCODE = window.sg.epp.common.companyCode;
 }

 var SEC_LOCAL_URL_CHECKMEMBERSTATE = 'http://local.sec.samsung.com/comLocal/checkMemberStateAjax.do';
 var SEC_LOCAL_URL_SIGNIN = 'http://local.sec.samsung.com/comLocal/loginCheck.do';
 
 var login_user_info = {};
 
 $("#signInForm input[name=domain]").val(DOMAIN);
 $("#joinForm input[name=domain]").val(DOMAIN);
 $("#findAccountForm input[name=domain]").val(DOMAIN);
 
 
	function hideHeaderFooterBySaleApplicationCookie() {
		console.log("[js] call hideHeaderFooterBySaleApplicationCookie !");
			$('.gnb').hide();

			$('.breadcrumb').hide();
			$('.footer-column').hide();
			$('.footer-language').hide();
			$('.footer-sns').hide();
			$('.footer-terms').hide();
			$('#teconsent').hide();
			$('#QSIFeedbackButton-btn').hide();
			
			if (window.location.href.indexOf("/mypage/myproducts/") > -1 || window.location.href.indexOf("/mypage/myrepair/") > -1 || window.location.href.indexOf("/mypage/rewards/") > -1) {
				$('.explore-lnb-navigation').hide();
			}
	}
	
	let startTimeByCookie = new Date().valueOf();
	console.log("★[SaleApplication] startTimeByCookie:", startTimeByCookie);
	var cookieSaleApplication =  $.cookies.get('SaleApplication', {domain : ".samsung.com"});
	let getTimeByCookie = new Date().valueOf();
	console.log("★[SaleApplication] getTimeByCookie:", getTimeByCookie);
	if(cookieSaleApplication != undefined && cookieSaleApplication != null){
		console.log("[js] cookieSaleApplication=[" +cookieSaleApplication+ "]");
		//쿠키가 존재하는 경우 
		if(cookieSaleApplication.indexOf("GlobalShopApp") > -1) {
			let responseByCookie = new Date().valueOf();
			console.log("★[SaleApplication] responseTime:", responseByCookie);
		    console.log("★[SaleApplication] responseTime-startTime:", responseByCookie-startTimeByCookie);
			///////hideHeaderFooterBySaleApplicationCookie();
		}
		 
	}
	

 (function($, win) {
	 'use strict';
 
	 $(function(){
		 $('.layer_popup .close, .layer_popup .icon-close-x, .layer_popup .alert-ok-button').click(function(){
			 if( $(this).data('popup') === 'close' ){
				 $('.accesseFocusTarget').trigger('focus');
			 }
 
			 $('.layer_popup').hide();
			 $('.lightbox-skrim').hide();
 
			 return false;
		 });
	 });
 })(jQuery, window);
/*!************************************************
 * jquery.cookies.2.2.0.min.js Cookie Util
 **************************************************/
/**
 * 쿠키 데이터
 */
$.cookies.data = {
	// Cookie Name
	'SEARCH_NAME' : 'sk',
	'ACCESSORY_SEARCH_NAME' : 'ask',
	'NAVIGATION_NAME' : 'nh',
	'PRIVATECODE_NAME' : 'pv',
	'COMPARELIST_NAME' : 'cl',
	'WISHLIST_NAME' : 'wl',
	'INSTORE_PRIVATECODE_NAME' : 'ipv',
	'STORE_REGION_NUM' : "cnregionnum",
	'STORE_REGION_CODE' : "cnregion",
	'STORE_REGION_NAME' : "cnregionname",
	'STORE_CITY_NUM' : "cncitynamenum",
	'STORE_CITY_CODE' : "cncity",
	'STORE_CITY_NAME' : "cncityname",
	// Cookie Value Max Length
	'SEARCH_MAX_SIZE' : 4,
	'PRIVATECODE_MAX_SIZE' : 5,
	'WISHLIST_MAX_SIZE' : 6,
	'STORE_REGION_MAX_SIZE' : 1,
	'STORE_CITY_MAX_SIZE' : 1
};

var CONTENT = "/content/samsung";

/**
 * 쿠키의 Default Option return
 */
$.cookies.getDefaultOption = function(expires, path) {
	// expires 값이 없을 경우 default 1일
	if(!expires || !(expires instanceof Date)) {
		expires = new Date();
		expires.setTime(expires.getTime() + 1000*60*60*24);
	}
	// path 값이 없을 경우 '/'
	if (!path) {
		path = '/';
	} else if (window.location.pathname.indexOf(CONTENT) > -1) {
		path = CONTENT + path;
	}
	// SITE CODE 별로 저장
	var defaultOptions = {
		expiresAt: expires,
		path: path,
		domain: '.samsung.com',
		secure: false
	};
	
	return defaultOptions;
};

/**************************************************
 * WishList - START
 **************************************************/

/**
 * 위시리스트 제품 저장
 * @param id, expires
 */
$.cookies.setWishList = function(id, expires) {
	var cookieNm = this.data.WISHLIST_NAME;
	var cookieVal = this.get(cookieNm);

	if(!cookieVal) {
		cookieVal = [id];
	} else {
		if($.inArray(id, cookieVal) >= 0) {
			return;
		}
		if(cookieVal.length >= this.data.WISHLIST_MAX_SIZE) {
			cookieVal.splice(0,1);
		}
		cookieVal.push(id);
	}
	this.set(cookieNm, cookieVal, this.getDefaultOption(expires));
};

/**
 * 위시리스트 제품 수 조회
 * @returns int 제품 수
 */
$.cookies.getWishListCnt = function() {
	var cookieVal = this.get(this.data.WISHLIST_NAME);
	return (cookieVal && $.isArray(cookieVal) ? cookieVal.length : 0);
};

/**
 * 위시리스트 제품 조회
 * @returns Array 위시리스트 저장된 제품ID 리스트
 */
$.cookies.getWishList = function() {
	var cookieVal = this.get(this.data.WISHLIST_NAME);
	return (cookieVal && $.isArray(cookieVal) ? cookieVal : []);
};

/**
 * 위시리스트 제품 존재 여부
 * @param id
 * @returns boolean 제품 존재 여부
 */
$.cookies.isAddedWishList = function(id) {
	var cookieNm = this.data.WISHLIST_NAME;
	var cookieVal = this.get(cookieNm);

	if(cookieVal && $.isArray(cookieVal)) {
		for(var i=0,iSize=cookieVal.length ; i < iSize ; i++) {
			if(cookieVal[i] === id) {
				return true;
			}
		}
	}
	return false;
};

/**
 * 위시리스트 제품 삭제
 * @param id
 * @returns boolean 삭제성공여부
 */
$.cookies.deleteWishProduct = function(id, expires) {
	var cookieNm = this.data.WISHLIST_NAME;
	var cookieVal = this.get(cookieNm);

	if(cookieVal && $.isArray(cookieVal)) {
		var num = $.inArray(id, cookieVal);
		if(num >= 0) {
			cookieVal.splice(num, 1);
			if(cookieVal.length <= 0) {
				this.del(cookieNm, this.getDefaultOption(expires));
			} else {
				this.set(cookieNm, cookieVal, this.getDefaultOption(expires));
			}
			return true;
		}
	}
	return false;
};

/**
 * 위시리스트 제품 전체 삭제
 * @returns boolean 삭제성공여부
 */
$.cookies.deleteWishList = function(expires) {
	this.del(this.data.WISHLIST_NAME, this.getDefaultOption(expires));
};

/**************************************************
 * WishList - END
 **************************************************/


/**
 * SITE CODE 변경 시 현재 SITE CODE의 모든 쿠키 내용 제거
 */
try {
	if(!$.cookies.get('cookie_country') || '' === $.cookies.get('cookie_country')) {
		$.cookies.set('cookie_country', SITE_CD, $.cookies.getDefaultOption());
	} else if(SITE_CD !== $.cookies.get('cookie_country')) {
		var deleteOption = $.cookies.getDefaultOption();
		$.cookies.del($.cookies.data.NAVIGATION_NAME, deleteOption);
		$.cookies.del($.cookies.data.PRIVATECODE_NAME, deleteOption);
		$.cookies.del($.cookies.data.COMPARELIST_NAME, deleteOption);
		$.cookies.del($.cookies.data.WISHLIST_NAME, deleteOption);
		$.cookies.del($.cookies.data.INSTORE_PRIVATECODE_NAME, deleteOption);
		$.cookies.set('cookie_country', SITE_CD, $.cookies.getDefaultOption());
	}
} catch (e) {}
var ss = $;

(function ($) {

	ss.EstoreIfQueue = {

		// Estore API 호출 시 큐에 담을 것인지 바로 호출 할 것인지 판단
		setQueue : function(callbackFunction) {
			// 토큰 값이 있을 경우 로그인 되었다고 판단
			var token = $.cookies.get("iPlanetDirectoryPro", {domain : ".samsung.com"});
			var snsSessionId = $.cookies.get("snsSessionId", {domain : ".samsung.com"});

			// 토큰 값이 있고 ESTORE 연계 사이트일 경우에 큐에 쌓아둠
			if (token || snsSessionId) {
				if (USE_ESTORE) {
					if (this.getIsSignReady()) {
						this.callFunction(callbackFunction, arguments);
					} else {
						this.queue.push(arguments);
					}
				} else {
					this.callFunction(callbackFunction, arguments);
				}
			} else {
				this.callFunction(callbackFunction, arguments);
			}
		},

		// 함수 실행
		callFunction : function(callbackFunction, args) {
			if (callbackFunction && typeof (callbackFunction) == "function") {
				var params = [];

				for (var i = 1; i < args.length; i++) {
					params.push(args[i]);
				}
				callbackFunction.apply(null, params);
			}
		},

		// 로그인 판단 시점 set
		setIsSignReady : function(result) {
			this.isSignReady = result;

			if (result === true || result === 'true') {
				for (var i = 0; i < this.queue.length; i++) {
					if (this.queue[i].length)
						this.callFunction(this.queue[i][0], this.queue[i]);
				}
			}
		},

		// 로그인 판단 시점 get
		getIsSignReady : function() {
			return this.isSignReady;
		},

		// set properties
		setProperties : function() {
			this.isSignReady = false;
			this.queue = [];

		},

		// initialize
		init : function() {
			this.setProperties();
		}

	};

	ss.EstoreIfQueue.init();

} (jQuery));

/*!************************************************
 * E-Store Interface 관련 공통 Util
 * 인터페이스명세서(NG_to_Store)_20140226-v.3.0 적용
 **************************************************/
//var jQuery1910499421933433041_1385598221584 = function(data){ };
var estore = (function(){

	/**
	 * JSON 을 URL Parameter 로 변경
	 */
	var jsonToStringParameter = function( jsonParam ) {
		var strParam = '?';
		var idx = 0;
		var value;
		for( var key in jsonParam ) {
			if( idx != 0 ){
				strParam += '&';
			}
			value = jsonParam[key];
			if( $.isArray(value) ) {
				$.each(value, function(idx, data){
					strParam += key + '=' + data;
					if( idx < value.length-1 ) strParam += '&';
				});
			} else {
				strParam += key + '=' + value;
			}
			idx++;
		}
		return strParam;
	};

	/**
	 * ESTORE ERROR MESSAGE Alert Show
	 */
	var errorMsgShow = function( message ) {
		
		//sec 레이어 팝업이 안뜨는 문제 때문에 주석 2016-11-23 lsh0032.lee@partner.samsung.com 
		/*
	    var body = $('.ss_samsung');
	    var isWow = body.hasClass('pdp_wow') || body.hasClass('instore') || body.hasClass('business') ? true : false;
		if(isWow && SITE_CD == 'sec'){
			alert(message);
			return;
		}

 
		if (SITE_CD == 'sec') {
			if ($('#dummy-popup-container').text().length > 0 && !isWow ) {
				alert(message);
				return;
			}
		}
		*/

		var $layer = $('#popup_alert');
		$layer.find('.msg-text').html( message );

		if(SITE_CD === 'sec'){
			$layer.find('.pop-btn').find('.button').text("확인");
		}

		$(".layer_popup").hide();
		$layer.parent().show();
		if(SITE_CD === 'sec'){
			$('.lightbox-skrim').show();
		}else{
			$('.lightbox-skrim').hide();
		}
		var l = parseInt(($('body').width() - $layer.width())/2);
		var t = parseInt( $(window).scrollTop() + (($(window).height()-$layer.height())/2) );
		if($(window).height()<$layer.height()){
			t = $(window).scrollTop() + 10;
		}

		$layer.css({ "top":t+"px", "left":l+"px"});
		//web accessibility
		$("#popup_alert .popup_wrap .pop-btn").find('a').focus();
	};

	/*************************
	 * ajax call
	 *************************/
	var send = function( service, param, returnCallback ) {
		var currLoc = location.href;
		var isConsumer = false;
		if(currLoc.indexOf('/consumer') > -1 ) {
			isConsumer = true;
		}
		var hybrisApiJson = $("#hybrisApiJson").val();
		//new-hybris
		var isNewHybris = ($('#shopIntegrationFlag').val() === 'Hybris-new')?true:false;
		
		
		var shopSiteCd = '';
		if(SITE_CD == "ae" || SITE_CD=="ae_ar"){
			let dotcom_multistore = $.cookies.get("dotcom_multistore") ? $.cookies.get("dotcom_multistore").toString() : '';
			shopSiteCd = !fnIsNull(dotcom_multistore) ? dotcom_multistore : SITE_CD;
		} else if(SITE_CD == "levant"){
	    	shopSiteCd = "jo";
	    } else if(SITE_CD == "levant_ar"){
	    	shopSiteCd = "jo_ar";
	    } else if(SITE_CD == "n_africa"){
	    	shopSiteCd = "ma";
	    }
		// [Epp] epp store api 처리
		if(IS_EPP && shopSiteCd != ''){
			shopSiteCd = EPP_COMPANYCODE;
		}

		const storeSiteCodeWithEpp = IS_EPP ? EPP_COMPANYCODE : STORE_SITE_CODE;
		const siteCodeWithEpp = IS_EPP ? EPP_COMPANYCODE : SITE_CD;
		// [Epp] epp store api 처리
		
		
		var url = '';
		
		//VTEX 국가 add cart 분기 로직 
		if(service === "addCart"){
			if(SITE_CD==="ar"|| SITE_CD==="br"){
				var storeurl= STORE_DOMAIN + "/" + SITE_CD + "/getServicesProduct"+( param ? jsonToStringParameter(param) : '' );
				window.location.href = storeurl;
			}else if( SITE_CD==="py"){
				var storeurl;
				storeurl= STORE_DOMAIN + "/getServicesProduct"+( param ? jsonToStringParameter(param) : '' );
				window.location.href = storeurl;
			}
		}
		//new-hybris
		if(((isNewHybris && SITE_CD =='uk') || IS_B2B) && service === "getCartCount"){ //20210402 SEBN old hybris 적용
			url = STORE_DOMAIN + '/tokocommercewebservices/v2/' + storeSiteCodeWithEpp + "/minicart/totalProducts";			
		} else if( (SITE_CD === 'ar' || SITE_CD === 'br') && service === "getCartCount" ){
			url = STORE_DOMAIN + '/' + SITE_CD + '/_v/private/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
		} else if(SITE_CD === 'py'){
			if(service === "getCartCount" && (SITE_CD === 'py')) {
				url = STORE_DOMAIN + '/_v/private/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
			} else if(service === "getRealTimeProductSimpleInfo") {
				url = STORE_DOMAIN + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
			} else {
				url = STORE_DOMAIN + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
			}
		} else if(shopSiteCd != ''){
			url = STORE_DOMAIN + '/' + shopSiteCd + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
		} else {
			//new-hybris
			if((isNewHybris && SITE_CD !='uk') || IS_B2B){ 
				var storeWebDomain = $("#storeWebDomain").val();
				url =  storeWebDomain + '/' + siteCodeWithEpp + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
				if(IS_B2B){
					url =  storeWebDomain + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
				}
			}else
				url = STORE_DOMAIN + '/' + storeSiteCodeWithEpp + '/ng/p4v1/' + service + ( param ? jsonToStringParameter(param) : '' );
		}
		//new-hybris
		if((isNewHybris || IS_B2B) && service === "getCartCount"){
			if(url != ''){
				$.ajax({
					url: url,
					type: 'GET',
					dataType : 'json',
					crossDomain : true,
					xhrFields: {
						withCredentials: true
					},
					success: function (data) {
						if( $.isFunction(returnCallback) ) {
							returnCallback( data );
						}
					}
				});
			}
		} else if(service === "getRealTimeProductSimpleInfo" && isConsumer && SITE_CD !== 'br' && hybrisApiJson !== "Y"){
			$.ajax({
				url: url,
				type: 'GET',
				dataType : 'jsonp',
				jsonpCallback : 'jQuery1910499421933433041_1385598221584',
				jsonp : 'callback',
				success: function (data) {
					// 쿠키/세션간 사용자 정보가 일치하지 않을 경우
					if( '2100' === data.resultCode || 2100 === data.resultCode) {

						//store 세션없음. 로그아웃처리
						if( param && param.hasOwnProperty('returnUrl') && '' !== param.returnUrl ) {
							$.Auth.signOut( param.returnUrl );
						} else {
							$.Auth.signOut();
						}
						// cn 사이트일 경우 코드값이 2000 ~ 3000번 일때만 경고창 노출
					} else if(SITE_CD === "cn" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if(SITE_CD === "sec" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								'2002' !== data.resultCode && 2002 !== data.resultCode && // 판매불가상품 2015.04.17
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if( SITE_CD !== "cn" && SITE_CD !== "sec" && 
							'0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
															9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
							// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
							'2110' !== data.resultCode && 2110 !== data.resultCode ) {
						errorMsgShow( data.resultMessage );
					}
					// return callback
					if( $.isFunction(returnCallback) ) {
						returnCallback( data );
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					//console.log("e");
				}
			});
		} else if (service === "getRealTimeProductSimpleInfo" && SITE_CD === 'sec'){
			$.ajax({
				url: url,
				type: 'GET',
				dataType : 'jsonp',
				jsonpCallback : 'jQuery1910499421933433041_1385598221584',
				jsonp : 'callback',
				timeout : 10000,
				success: function (data) {
					// 쿠키/세션간 사용자 정보가 일치하지 않을 경우
					if( '2100' === data.resultCode || 2100 === data.resultCode ) {
						//store 세션없음. 로그아웃처리
						if( param && param.hasOwnProperty('returnUrl') && '' !== param.returnUrl ) {
							$.Auth.signOut( param.returnUrl );
						} else {
							$.Auth.signOut();
						}
						// cn 사이트일 경우 코드값이 2000 ~ 3000번 일때만 경고창 노출
					} else if(SITE_CD === "cn" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if(SITE_CD === "sec" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								'2002' !== data.resultCode && 2002 !== data.resultCode && // 판매불가상품 2015.04.17
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
									//에러 메시지의 내용 변화 (정확하게 아래의 문구가 맞아 떨어질 때 메시지 조작) dong_won.lee
									if (data.resultMessage.indexOf('구매 한도를 초과하여 구매가 불가능합니다.<br />')!==-1) {
										data.resultMessage =  '구매 한도' + data.resultMessage.split('구매 한도')[1].replace('<br />','\n');
									}
						errorMsgShow( data.resultMessage );
					} else if( SITE_CD !== "cn" && SITE_CD !== "sec" && 
							'0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
															9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
							// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
							'2110' !== data.resultCode && 2110 !== data.resultCode ) {
						errorMsgShow( data.resultMessage );
					}
					// return callback
					if( $.isFunction(returnCallback) ) {
						returnCallback( data );
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
					//returnCallback();
					if (SITE_CD === 'au' || SITE_CD === 'nz' || SITE_CD === 'sec') { // 금주 DB 작업 영향 국가만 
						if (window.location.pathname === '/' + SITE_CD + '/wishlist') {      // wishlist 페이지에서 에러처리 
							//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
							returnCallback();
						}
					}
					//한총 타임아웃 시 미판매 문구 노출 (20180510)
                    if(SITE_CD === 'sec'&& errorThrown === 'timeout' && $("#product-detail-current-modelcode").val()){
                        $('#BT_shop .BT_txt').html('해당 상품을 판매 준비하고 있습니다. 구매 가능 여부는<br />가까운 매장이나 삼성전자 공식 판매처에 문의하시기 바랍니다.');
                        $('#BT_shop').show();						
                        $('#BT_shop .product-details__link.s-cta-retailer.js-cta-buy-sec').hide(); 		//상품보유매장 찾기는 숨김 
                        $('#BT_shop .BT_help').hide();      		//툴팁 링크 가림 
                        $('#BT_shop .BT_help-content').hide();	//툴팁의 내용 가림
                        $('#BT_shop .BT_txt').show();			//판매준비 또는 판매종료 상품으로 구매가능여부는<br />삼성전자 공식판매처에 문의하시기 바랍니다. 표시 
                        $('#find-store-shopmain').show();        //매장찾기 표시
                        $('#store-reservation').hide();
                    }
					//console.log("e");
				}
			});
		} else if(service === "getRealTimeProductSimpleInfo" && isConsumer && hybrisApiJson === "Y"){
			$.ajax({
				url: url,
				type: 'GET',
				dataType : 'json',
				xhrFields: { withCredentials: true },
				contentType : "application/x-www-form-urlencoded",
				crossDomain : true,
				success: function (data) {
					// 쿠키/세션간 사용자 정보가 일치하지 않을 경우
					if( '2100' === data.resultCode || 2100 === data.resultCode ) {

						//store 세션없음. 로그아웃처리
						if( param && param.hasOwnProperty('returnUrl') && '' !== param.returnUrl ) {
							$.Auth.signOut( param.returnUrl );
						} else {
							$.Auth.signOut();
						}
						// cn 사이트일 경우 코드값이 2000 ~ 3000번 일때만 경고창 노출
					} else if(SITE_CD === "cn" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001!== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if(SITE_CD === "sec" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								'2002' !== data.resultCode && 2002 !== data.resultCode && // 판매불가상품 2015.04.17
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if( SITE_CD !== "cn" && SITE_CD !== "sec" && 
							'0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
															9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
							// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
							'2110' !== data.resultCode && 2110 !== data.resultCode ) {
						errorMsgShow( data.resultMessage );
					}
					// return callback
					if( $.isFunction(returnCallback) ) {
						returnCallback( data );
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					//console.log("e");
				}
			});
		} else if(service !== "getRealTimeProductSimpleInfo" && !isConsumer && hybrisApiJson === "Y"){
			$.ajax({
				url: url,
				type: 'GET',
				dataType : 'json',
				xhrFields: { withCredentials: true },
				contentType : "application/x-www-form-urlencoded",
				crossDomain : true,
				success: function (data) {
					// 쿠키/세션간 사용자 정보가 일치하지 않을 경우
					if( '2100' === data.resultCode || 2100 === data.resultCode ) {
						//store 세션없음. 로그아웃처리
						if( param && param.hasOwnProperty('returnUrl') && '' !== param.returnUrl ) {
							$.Auth.signOut( param.returnUrl );
						} else {
							$.Auth.signOut();
						}
						// cn 사이트일 경우 코드값이 2000 ~ 3000번 일때만 경고창 노출
					} else if(SITE_CD === "cn" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if(SITE_CD === "sec" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								'2002' !== data.resultCode && 2002 !== data.resultCode && // 판매불가상품 2015.04.17
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
									//에러 메시지의 내용 변화 (정확하게 아래의 문구가 맞아 떨어질 때 메시지 조작) dong_won.lee
									if (data.resultMessage.indexOf('구매 한도를 초과하여 구매가 불가능합니다.<br />')!==-1) {
										data.resultMessage =  '구매 한도' + data.resultMessage.split('구매 한도')[1].replace('<br />','\n');
									}
						errorMsgShow( data.resultMessage );
					} else if( SITE_CD !== "cn" && SITE_CD !== "sec" && 
							'0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
															9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
							// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
							'2110' !== data.resultCode && 2110 !== data.resultCode ) {
						errorMsgShow( data.resultMessage );
					}
					// return callback
					if( $.isFunction(returnCallback) ) {
						returnCallback( data );
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
					//returnCallback();
					if (SITE_CD === 'au' || SITE_CD === 'nz' || SITE_CD === 'sec') { // 금주 DB 작업 영향 국가만 
						if (window.location.pathname === '/' + SITE_CD + '/wishlist') {      // wishlist 페이지에서 에러처리 
							//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
							returnCallback();
						}
					}
					//console.log("e");
				}
			});
		} else {
			$.ajax({
				url: url,
				type: 'GET',
				dataType : 'jsonp',
				jsonp : 'callback',
				success: function (data) {
					// 쿠키/세션간 사용자 정보가 일치하지 않을 경우
					if( '2100' === data.resultCode ) {
						//store 세션없음. 로그아웃처리
						if( param && param.hasOwnProperty('returnUrl') && '' !== param.returnUrl ) {
							$.Auth.signOut( param.returnUrl );
						} else {
							$.Auth.signOut();
						}
						// cn 사이트일 경우 코드값이 2000 ~ 3000번 일때만 경고창 노출
					} else if(SITE_CD === "cn" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
						errorMsgShow( data.resultMessage );
					} else if(SITE_CD === "sec" && 
							 '0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
							 								9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
								// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
								'2110' !== data.resultCode && 2110 !== data.resultCode &&
								'2002' !== data.resultCode && 2002 !== data.resultCode && // 판매불가상품 2015.04.17
								(data.resultCode.length === 4 && ('2' === data.resultCode.charAt(0) || '3' === data.resultCode.charAt(0)))){
									//에러 메시지의 내용 변화 (정확하게 아래의 문구가 맞아 떨어질 때 메시지 조작) dong_won.lee
									if (data.resultMessage.indexOf('구매 한도를 초과하여 구매가 불가능합니다.<br />')!==-1) {
										data.resultMessage =  '구매 한도' + data.resultMessage.split('구매 한도')[1].replace('<br />','\n');
									}
						errorMsgShow( data.resultMessage );
					} else if( SITE_CD !== "cn" && SITE_CD !== "sec" && 
							'0000' !== data.resultCode && '9000' !== data.resultCode && '9001' !== data.resultCode && '9002' !== data.resultCode &&
															9000 !== data.resultCode && 9001 !== data.resultCode && 9002 !== data.resultCode &&
							// 2014.05.08. 로그인 중일 때 호출하게 되면 '2110' 반환
							'2110' !== data.resultCode && 2110 !== data.resultCode ) {
						errorMsgShow( data.resultMessage );
					}
					// return callback
					if( $.isFunction(returnCallback) ) {
						returnCallback( data );
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
					//returnCallback();
					if (SITE_CD === 'au' || SITE_CD === 'nz' || SITE_CD === 'sec') { // 금주 DB 작업 영향 국가만 
						if (window.location.pathname === '/' + SITE_CD + '/wishlist') {      // wishlist 페이지에서 에러처리 
							//errorMsgShow( ESTORE_FAULT_MSG ); // e-store 작업 관련 
							returnCallback();
						}
					}
					//console.log("e");
				}
			});
		}
	};

	/*************************
	 * public network service
	 *************************/
	var estoreConstructor = function(){};

	/**
	 * buyNow(isBuyNowCartActive) 쿠키 생성
	 * @param callback function
	 */
	estoreConstructor.prototype.makeBuyNowCookie = function( returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'makeBuyNowCookie', null, returnCallback);
	};

	/**
	 * 장바구니 상품 추가
	 * @param
	 * {
	 * 		productCode : 상품코드 [필수],
	 * 		quantity : 수량,
	 * 		returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addCart = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'addCart', param, returnCallback);
	};

	/**
	 * Cart 건수 조회
	 * @param callback function
	 */
	estoreConstructor.prototype.getCartCount = function( returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getCartCount', null, returnCallback);
	};

	/**
	 * 실시간 상품 정보 조회(가격, 재고, 주문 Min/Max 수량, Promotion 여부)
	 * @param
	 * {
	 * 		 productCode : 상품코드 [필수],
	 * 		 guid : 글로벌유저아이디
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getRealTimeProductSimpleInfo = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getRealTimeProductSimpleInfo', param, returnCallback);
	};

	/**
	 * 리스트용 실시간 상품 정보 조회
	 * @param
	 * {
	 * 		 guid : 글로벌유저아이디,
	 * 		 productCode (Array<string>) : 상품 모델코드 배열
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getRealTimeProductListInfo = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getRealTimeProductListInfo', param, returnCallback);
	};

	/**
	 * 위시리스트 추가
	 * @param
	 * {
	 * 		 productCode : 상품코드
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addWishListItem = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'addWishListItem', param, returnCallback);
	};

	/**
	 * 위시리스트 추가(queue에 담을 필요 없는 경우-로그인 직후 cookie에 있는 wishlist 저장 시)
	 * @param
	 * {
	 * 		 productCode : 상품코드
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addWishListItemForce = function( param, returnCallback ) {
		send('addWishListItem', param, returnCallback);
	};

	/**
	 * 위시리스트 삭제
	 * @param
	 * {
	 * 		productCode : 상품코드,
	 * 		returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.delWishListItem = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'delWishListItem', param, returnCallback);
	};

	/**
	 * 위시리스트 가져오기
	 * @param
	 * {
	 * 		 page (int) : 페이지번호[default:0],
	 * 		 pageSize (int) : 페이지사이즈[default:5],
	 * 		 returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getWishList = function( param, returnCallback ) {
		// defaultParam setting
		var defaultParam = {
			page : 1,
			pageSize : 5
		};
		if( param && !$.isFunction(param) ) defaultParam = $.extend( defaultParam, param );
		$.EstoreIfQueue.setQueue(send, 'getWishList', defaultParam, returnCallback);
	};

	/**
	 * Store Login
	 * @param callback function
	 */
	estoreConstructor.prototype.login = function( returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'login', null, returnCallback);
	};

	/**
	 * Store Logout
	 * @param
	 * {
	 * 		 returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.logout = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'logout', param, returnCallback);
	};

	/**
	 * 위시리스트용 실시간 상품 정보 조회
	 * @param
	 * {
	 * 		 guid : 글로벌유저아이디,
	 * 		 productCode (Array<string>) : 상품 모델코드 배열,
	 * 		 returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getRealTimeWishProductListInfo = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getRealTimeWishProductListInfo', param, returnCallback);
	};

	/**
	 * 비회원 주문정보 존재여부 조회
	 * @param
	 * {
	 * 		 orderCode : 주문코드 [필수],
	 * 		 email : 주문자이메일 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getGuestOrderExistYn = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getGuestOrderExistYn', param, returnCallback);
	};

	/**
	 * SNS Login 사용자 정보 조회
	 * @param
	 * {
	 * 		 snsSessionId : SNS Session ID [필수],
	 * 		 returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getSnsUserInfo = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getSnsUserInfo', param, returnCallback);
	};

	/**
	 * Store 개인정보보호정책 동의
	 * @param
	 * {
	 * 		 receiveEmail : 메일수신여부 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.setAgreeStorePolicy = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'setAgreeStorePolicy', param, returnCallback);
	};

	/**
	 * Store Session 체크
	 * @param
	 * {
	 * 		 returnUrl : 세션 종료시 redirect URL
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getSessionCheck = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getSessionCheck', param, returnCallback);
	};

	/**
	 * Estore Category목록 가져오기
	 * @param callback function
	 */
	estoreConstructor.prototype.getEstoreCategoryList = function( returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getEstoreCategoryList', null, returnCallback);
	};

	/**
	 * 스토어 사용자 정보
	 * @param
	 * {
	 * 		storeSessionId : SNS Session ID [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getCurrentUserInfo = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getCurrentUserInfo', param, returnCallback);
	};

	/**
	 * 장바구니 상품 추가
	 * @param
	 * {
	 * 		productCode : 상품코드 [필수],
	 * 		quantity : 수량
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.buyNow = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'buyNow', param, returnCallback);
	};

	/**
	 * 리뷰 조회
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		pageNum : List 시작 페이지 [필수],
	 * 		rowNum : List 개수 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		sort : 정렬타입 [옵션],
	 * 		userListYn : Y일 경우 사용자가 입력한 Review를 같이 보여줌 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getReviews = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getReviewList', param, returnCallback);
	};

	/**
	 * 나의 리뷰 조회
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품 코드 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getMyReview = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getMyReview', param, returnCallback);
	};

	/**
	 * 나의 리뷰 등록
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		rating : Review 평가 [필수],
	 * 		headline : Review 제목 [필수],
	 * 		comment : Review 내용 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addReview = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'addReview', param, returnCallback);
	};

	/**
	 * 나의 리뷰 수정
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		reviewId : Review ID [필수],
	 * 		headline : Review 제목 [필수],
	 * 		comment : Review 내용 [필수],
	 * 		rating : Review 평가 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.updateReview = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'updateReview', param, returnCallback);
	};

	/**
	 * 나의 리뷰 삭제
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		reviewId : Review ID [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.deleteReview = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'deleteReview', param, returnCallback);
	};

	/**
	 * 리뷰 추천
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		reviewId : Review ID [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addReviewHelpful = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'setReviewHelpful', param, returnCallback);
	};

	/**
	 * 리뷰 추천 등록
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		reviewId : Review ID [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addReviewHelpful = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'setReviewHelpful', param, returnCallback);
	};

	/**
	 * 리뷰 비추천 등록
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		reviewId : Review ID [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addReviewUnHelpful = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'setReviewUnHelpful', param, returnCallback);
	};

	/**
	 * 전문가 리뷰 조회
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		page : 페이지 번호 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addReviewAbuse = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'setReviewAbuse', param, returnCallback);
	};

	/**
	 * 리뷰신고
	 * @param
	 * {
	 * 		siteCode : 국가코드 [필수],
	 * 		productCode : 상품코드 [필수],
	 * 		review ID : Review ID [필수],
	 * 		issueDescription : Abuse comment [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getExpertReviewList = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getExpertReviewList', param, returnCallback);
	};

	/**
	 * 대물상품 중국의 성 조회( 성 코드, 성 이름 )
	 * @param
	 * {
	 * 
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getProductDetailRegion = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getProductDetailRegion', param, returnCallback);
	};

	/**
	 * 대물상품 중국의 시 조회( 시 코드, 시 이름 )
	 * @param
	 * {
	 * 		 region : 지역코드 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getProductDetailCity = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getProductDetailCity', param, returnCallback);
	};

	/**
	 * 개통폰 예상금액 조회
	 * @param
	 * {
	 *       productCode   : 상품 코드 [옵션]
	 *       makerx           : 통신사 사업자 코드 [옵션]
	 *       charge             : 요금제 [옵션]
	 *       contract          : 약정기간 [옵션]
	 *       jointype           : 가입유형 [옵션]
	 *       monthly          : 단말기할부기간 [옵션]
	 *       subside            : 추가할인 [옵션]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.showProductOpenphoneOption = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'showProductOpenphoneOption', param, returnCallback);
	};

	/**
	 * 미리계산기 금액 조회
	 * @param
	 * {
	 *  productCodePost  : 상품코드 [필수]
	 *  quantity                : 수량 [옵션]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.preCalc = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'preCalc', param, returnCallback);
	};

	/**
	 * 미리계산기 재계산 금액 조회
	 * @param
	 * {
	 *  cartCode 					 : 주문 번호	[필수]
	 *  qty            				     : 수량 [필수]
	 *  voucherCode              : 바우처, 이벤트 코드 [필수]
	 *  releaseYn             		 : 쿠폰 철회 여부 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.preCalcApply = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'preCalcApply', param, returnCallback);
	};

	/**
	 * 매장픽업 상품 조회
	 * @param
	 * {
	 *  searchall 					 : 전체 검색 여부	 [옵션]
	 *  addr            				 : 주소 [옵션]
	 *  page                            : 페이지 번호 [옵션]
	 *  productCode              	: 상품 코드 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.stores = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'stores', param, returnCallback);
	};

	/**
	 * 상품평 사용자 정보 조회
	 * @param
	 * {
	 *  productCode              	: 상품 코드 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.getReviewStatus = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'getReviewStatus', param, returnCallback);
	};

	/**
	 * 상품의 experience 정보 조회수 증가
	 * @param
	 * {
	 *  id              			: Exeperience 아이디 [필수]
	 *  baseModelCode              	: 상품 베이스 모델 코드 [필수]
	 * }
	 * @param callback function
	 */
	estoreConstructor.prototype.addViewCount = function( param, returnCallback ) {
		$.EstoreIfQueue.setQueue(send, 'addViewCount', param, returnCallback);
	};

	return new estoreConstructor();

})();

$(document).ready(function () {
  const $q = window.sg.common.$q;
  const KEY_CODE = window.sg.common.constants.KEY_CODE;
  let isKeyboardOpening = false;
  
  class Nv00Gnb {
    constructor(el) {
      this.els = {
        el,
        innerWrapEl: el.querySelector('.nv00-gnb__inner-wrap'),
        logoWrapEl: el.querySelector('.nv00-gnb__logo-wrap'),
        logoEl: el.querySelector('.nv00-gnb__logo'),
        searchWrapEl: el.querySelector('.nv00-gnb__search-wrap'),
        backwardButtonEl: el.querySelector('.nv00-gnb__backward-btn'),
        searchButtonEl: el.querySelector('.nv00-gnb__search-btn'),
        closeButtonEl: el.querySelector('.nv00-gnb__close-btn'),
        userAccountWrapEl: el.querySelector('.nv00-gnb__user-account-wrap'),
        l0MenuWrapEl: el.querySelector('.nv00-gnb__l0-menu-wrap'),
        l0MenuEls: el.querySelectorAll('.nv00-gnb__l0-menu'),
        l1MenuLinkEls: el.querySelectorAll('.nv00-gnb__l1-menu-link'),
        l1MenuButtonEls: el.querySelectorAll('.nv00-gnb__l1-menu-btn'),
        l2MenuLinkEls: el.querySelectorAll('.nv00-gnb__l2-menu-link'),
        utilityWrapEl: el.querySelector('.nv00-gnb__utility-wrap'),
        hamburgerButtonEl: el.querySelector('.hamburger'),
        dimWrapEl: el.querySelector('.nv00-gnb__dim-wrap'),
        layerPopupOpenButtonEls: el.querySelectorAll('.js-layer-open'),
        layerPopupWrapEl: el.querySelector('.nv00-gnb__layer-popup-wrap'),
        layerPopupCloseButtonEls: el.querySelectorAll('.layer-popup__close'),
        layerPopupLoopingStartEl: el.querySelector('.nv00-gnb__layer-popup-looping--start'),
        layerPopupLoopingEndEl: el.querySelector('.nv00-gnb__layer-popup-looping--end'),
      };
      //this.showMenuTimer = null;
      //this.endMenuTimer = null;
      this.utils = window.sg.common.utils;
      this.isRtl = window.sg.common.utils.isRtl;
      this.activeL0Menu = false;
      this.activeL1Menu = false;
      this.isSwiperInit = false;
      this.currentDevice = this.getCurrentDevice();

      this.init();
    }

    init() {
      if (Nv00Gnb.instances.has(this.els.el)) {
        return;
      }

      Nv00Gnb.instances.set(this.els.el, this);

      this.bindEvents();
    }

    isRtlCommon() {
      return window.getComputedStyle(document.body).direction.toUpperCase() === 'RTL';
    }

    l1MenuShowEventForDesktop(e) {
      const isKeyboard = e.type === 'keydown';
      const isMouse = e.type === 'mouseenter';
    
      let buttonEl = e.target.closest('.nv00-gnb__l0-menu-toggle-btn');
      let el = null;
    
      if (isKeyboard) {
        const key = e.keyCode;
        
        el = e.target.closest('.nv00-gnb__l0-menu');
        if (!el) return;

        const isToggleBtn = e.target.closest('.nv00-gnb__l0-menu-toggle-btn') || e.target.closest('.nv00-gnb__l0-icon-wrapper');
        const isMainLink = e.target.closest('.nv00-gnb__l0-menu-btn');
        const isSupport = el.textContent.trim().toLowerCase().includes("support");

        if (isMainLink && !isToggleBtn && !isSupport && key === KEY_CODE.ENTER) {
          return;
        }

        if (key === KEY_CODE.ENTER || key === KEY_CODE.DOWN) {
            setTimeout(() => {
              const targetMenu = el.querySelector('.nv00-gnb__l1-menu-container');
              const focusable = targetMenu?.querySelector('a, button');
              if (focusable) focusable.focus();
            }, 200);

          e.preventDefault();
        } else {
          return;
        }
    
      }else if (isMouse) {
        el = e.currentTarget; // .nv00-gnb__l0-menu
        buttonEl = el.querySelector('.nv00-gnb__l0-menu-btn');
        if (!buttonEl) return;
      }
    
      const l1Container = el.querySelector('.nv00-gnb__l1-menu-container');
      if (!l1Container) return;

      this.els.dimWrapEl.style.top = `${this.els.el.getBoundingClientRect().bottom}px`;
      this.els.dimWrapEl.classList.add('show');
      this.els.el.classList.add('show');
      // el.querySelector('.nv00-gnb__l0-menu-btn').setAttribute('aria-expanded', 'true');
      if(buttonEl)buttonEl.setAttribute('aria-expanded', 'true');


      if (el.parentElement.classList.contains('left-menu')) {
        l1Container.style.top = `${el.getBoundingClientRect().bottom}px`;
        // l1Container.style.left = `${this.els.innerWrapEl.getBoundingClientRect().left + 48}px`;
        l1Container.style.left = `0`;
      } else if (el.parentElement.classList.contains('right-menu')) {
        l1Container.style.top = `${el.getBoundingClientRect().bottom + 68.5}px`;
        // l1Container.style.right = `${this.els.el.getBoundingClientRect().right - this.els.innerWrapEl.getBoundingClientRect().right + 48}px`;
        l1Container.style.right = `0`;
      }

      if (($(".nv00-gnb__l1-menu-container").hasClass("show") && !$(".nv00-gnb__l1-menu-container.show").is(l1Container))) {
        $(".nv00-gnb__l1-menu-container.show").removeAttr("style");
        $(".nv00-gnb__l1-menu-container.show").removeClass("show");
      }

      if (!$(".nv00-gnb__l1-menu-container").hasClass("show") || ($(".nv00-gnb__l1-menu-container").hasClass("show") && !$(".nv00-gnb__l1-menu-container.show").is(l1Container))) {

        l1Container.style.visibility = 'hidden';
        l1Container.style.display = 'flex';
        //this.showMenuTimer = setTimeout(() => {
          requestAnimationFrame(() => {
            l1Container.classList.add('show');
            const l1ContainerHeight = l1Container.getBoundingClientRect().height;
            requestAnimationFrame(() => {
              l1Container.style.height = '0';
              requestAnimationFrame(() => {
                l1Container.style.visibility = 'visible';
                //l1Container.style.height = `${l1ContainerHeight}px`;
                l1Container.style.height = `auto`;
              });
            });
          });
        //}, 0);
      }
      window.sg.common.lazyLoad.setLazyLoad();
    }

    l1MenuHideEventForDesktop(e) {
      //this.endMenuTimer && clearTimeout(this.endMenuTimer);
      var upperMenuContainer = document.querySelector('.nv00-gnb__up-wrap');
      var hoverMenuContainer = document.querySelector('.nv00-gnb__l1-menu-container');
      var loginMenuElement = document.querySelector('.nv00-gnb__utility.before-login');

      if (isKeyboardOpening) {
        return;
      }

      if (upperMenuContainer.matches(':hover') || hoverMenuContainer.matches(':hover')) {
        if (e && e.target.parentElement.classList.contains("right-menu") && !loginMenuElement.matches(':hover')) {
          return;
        }
      }

      let l1Container = false;
      let el = false;

      if (e) {
        l1Container = e.target.querySelector('.nv00-gnb__l1-menu-container');
        el = e.target;
      } else {
        l1Container = $('.nv00-gnb__l1-menu-container.show');
        el = l1Container.parent();
      }

      $(l1Container).css('height', '0');
      //this.endMenuTimer = setTimeout(() => {
        $(l1Container).removeAttr('style');
        $(l1Container).removeClass('show');
      //}, 200);
      this.els.dimWrapEl.classList.remove('show');
      this.els.el.classList.remove('show');
      $(el).find('.nv00-gnb__l0-menu-btn').attr('aria-expanded', 'false');

      // reset L0 focus arrow when mouse leaves
      $(".nv00-gnb__l0-icon-wrapper").each(function () {
        const $iconWrapper = $(this);
        const $menu = $iconWrapper.closest(".nv00-gnb__l0-menu");
        const $menuContainer = $menu.find(".nv00-gnb__l1-menu-container");
      
        if ($menuContainer.data("open") === true) {
          $menuContainer.data("open", false);
          $iconWrapper.removeClass("rotated");
      
          $menu.find(".nv00-gnb__l0-menu-btn").attr("aria-expanded", "false");
      
          $menuContainer.removeClass("show").css({
            display: "none",
            visibility: "hidden",
            height: "0",
          });
      
          $(".nv00-gnb__dim-wrap").removeClass("show");
        }
      });
      $('.nv00-gnb__l0-menu-toggle-btn').each(function(){
        this.setAttribute("aria-expanded","false");
      })
    }

    l1MenuShowEventForMobile(e) {
      const el = this.utils.closest(e.target, '.nv00-gnb__l0-menu');
      const isMobileBanner = el.classList.contains('nv00-gnb__l0-menu-mobile-banner');
      if (!isMobileBanner) {
        // L0, Utility 메뉴 숨기기
        this.els.innerWrapEl.style.overflowY = 'hidden';
        [...this.els.l0MenuEls].forEach((l0) => {
          l0.querySelector('.nv00-gnb__l0-menu-btn, .nv00-gnb__l0-menu-link').style.opacity = '0';
        });
        this.els.userAccountWrapEl.style.opacity = '0';
        this.els.utilityWrapEl.style.opacity = '0';

        // 선택된 L0, L1 메뉴 등장
        const selectedL0El = el.querySelector('.nv00-gnb__l1-menu-container');
        selectedL0El.classList.add('show');
        requestAnimationFrame(() => {
          if (!this.isRtlCommon()) {
            selectedL0El.style.right = '0';
          } else {
            selectedL0El.style.left = '0';
          }
        });

        // Backward 버튼 등장
        this.els.backwardButtonEl.classList.add('show');
        this.els.backwardButtonEl.focus();
        setTimeout(() => {
          this.els.backwardButtonEl.focus();
        }, 500);

        //search section
        $('.nv00-gnb__search-btn.gnb__search-btn-js').css({ 'visibility': 'hidden', 'opacity': 0 });
        $('.nv00-gnb__utility-btn-text').css('display', 'none');

        // Active L0 메뉴 저장
        this.activeL0Menu = el;

        // featured-products-thumbnail 의 경우, scrollbar 생성
        // if (el.querySelector('.nv00-gnb__featured-products-thumbnail-item-container') && !this.isSwiperInit) {
        //   el.querySelector('.nv00-gnb__featured-products-thumbnail-item-container').classList.add('swiper-container');
        //   el.querySelector('.nv00-gnb__featured-products-thumbnail-item-wrap').classList.add('swiper-wrapper');
        //   [...el.querySelectorAll('.nv00-gnb__featured-products-thumbnail-item')].forEach((item) => {
        //     item.classList.add('swiper-slide');
        //   });

        //   // eslint-disable-next-line no-undef
        //   this.swiper = new Swiper(el.querySelector('.nv00-gnb__featured-products-thumbnail-item-container'), {
        //     speed: 400,
        //     slidesPerView: 'auto',
        //     centeredSlides: true,
        //     centeredSlidesBounds: true,
        //     navigation: {
        //       prevEl: '.nv00-gnb__featured-products-thumbnail-item--previous',
        //       nextEl: '.nv00-gnb__featured-products-thumbnail-item--next',
        //       disabledClass: 'disabled',
        //     },
        //   });

        //   this.swiper.on('slideChange', () => {
        //     window.sg.common.lazyLoad.setLazyLoad();
        //   });

        //   this.isSwiperInit = true;
        //   setTimeout(() => {
        //     window.sg.common.lazyLoad.setLazyLoad();
        //   }, 400);
        // }

        el.querySelector('.nv00-gnb__l0-menu-btn').setAttribute('aria-expanded', 'true');
      } else {
        const mobileBannerLink = el.getAttribute("data-mobile-banner-link");
        if (mobileBannerLink) {
          window.location.href = mobileBannerLink;
        }
      }
    }

    l2MenuShowEventForMobile(e) {
      const l1 = this.utils.closest(e.target, '.nv00-gnb__l1-menu');
      if (l1.classList.contains('show')) {
        // 열려있는 경우
        const beforeActiveL1Menu = this.activeL1Menu;
        this.activeL1Menu = false;
        setTimeout(() => {
          beforeActiveL1Menu.nextElementSibling.removeAttribute('style');
          beforeActiveL1Menu.classList.remove('show');
          beforeActiveL1Menu.querySelector('.nv00-gnb__l1-menu-btn').setAttribute('aria-expanded', 'false');
        }, 200)

      } else {
        // 닫혀있는 경우
        if (this.activeL1Menu) {
          // 열려있는 L1 메뉴가 있는 경우
          const beforeActiveL1Menu = this.activeL1Menu;
          this.activeL1Menu = false;
          beforeActiveL1Menu.nextElementSibling.style.maxHeight = '0';
          setTimeout(() => {
            beforeActiveL1Menu.classList.remove('show');
            beforeActiveL1Menu.nextElementSibling.removeAttribute('style');
            beforeActiveL1Menu.querySelector('.nv00-gnb__l1-menu-btn').setAttribute('aria-expanded', 'false');
          }, 200);
        }

        this.activeL1Menu = l1;
        const l1MenuContainer = l1.parentElement.parentElement;

        // L2 메뉴 열어줌
        this.activeL1Menu.classList.add('show');
        this.activeL1Menu.nextElementSibling.style.visibility = 'hidden';
        this.activeL1Menu.nextElementSibling.style.marginBottom = '8px';

        requestAnimationFrame(() => {
          const l2MenuListHeight = this.activeL1Menu.nextElementSibling.scrollHeight;
          requestAnimationFrame(() => {
            this.activeL1Menu.nextElementSibling.style.maxHeight = '0';
            requestAnimationFrame(() => {
              this.activeL1Menu.nextElementSibling.style.visibility = 'visible';
              this.activeL1Menu.nextElementSibling.style.maxHeight = `${l2MenuListHeight}px`;
              // this.activeL1Menu.nextElementSibling.style.height = `auto`;
              setTimeout(() => {
                // 열려진 L1 메뉴가 상단 두번째에 위치할 수 있도록 스크롤 이동
                l1MenuContainer.scroll({
                  top: this.activeL1Menu.getBoundingClientRect().top - l1MenuContainer.querySelector('.nv00-gnb__l1-menu').getBoundingClientRect().top - 48,
                  behavior: 'smooth',
                });
              }, 200);
            });
          });
        });

        l1.querySelector('.nv00-gnb__l1-menu-btn').setAttribute('aria-expanded', 'true');
      }
    }

    bindEvents() {
      this.l1MenuShowEventForDesktop = this.l1MenuShowEventForDesktop.bind(this);
      this.l1MenuHideEventForDesktop = this.l1MenuHideEventForDesktop.bind(this);
      this.l1MenuShowEventForMobile = this.l1MenuShowEventForMobile.bind(this);
      this.l2MenuShowEventForMobile = this.l2MenuShowEventForMobile.bind(this);

      this.els.utilityWrapEl.querySelector('.nv00-gnb__utility.before-login')?.addEventListener('mouseover', (event) => {
        if ($(".nv00-gnb__l1-menu-container").hasClass("show")) {
          $(".nv00-gnb__l1-menu-container.show").removeAttr("style");
          $(".nv00-gnb__l1-menu-container.show").removeClass("show");
          $(".nv00-gnb__dim-wrap.show").removeClass("show");
        }
      });

      this.els.l0MenuWrapEl.querySelector('.nv00-gnb__l0-menu-link')?.addEventListener('mouseover', (event) => {
        if ($(".nv00-gnb__l1-menu-container").hasClass("show")) {
          $(".nv00-gnb__l1-menu-container.show").removeAttr("style");
          $(".nv00-gnb__l1-menu-container.show").removeClass("show");
          $(".nv00-gnb__dim-wrap.show").removeClass("show");
        }
      });

      this.els.utilityWrapEl.querySelector('.nv00-gnb__utility.after-login')?.addEventListener('mouseover', (event) => {
        if ($(".nv00-gnb__l1-menu-container").hasClass("show")) {
          $(".nv00-gnb__l1-menu-container.show").removeAttr("style");
          $(".nv00-gnb__l1-menu-container.show").removeClass("show");
          $(".nv00-gnb__dim-wrap.show").removeClass("show");
        }
      });

      if (!this.els.userAccountWrapEl.querySelector('.nv00-gnb__user-account.before-login')) {
        this.els.userAccountWrapEl.classList.add('without-account');
      }

      if (this.els.utilityWrapEl.querySelector('.nv00-gnb__utility.before-login')) {
        if (this.els.utilityWrapEl.querySelector('.nv00-gnb__utility.before-login').classList.contains('hide')) {
          if (this.els.utilityWrapEl.querySelectorAll('.nv00-gnb__utility.after-login .nv00-gnb__utility-user-menu').length === 1) {
            this.els.utilityWrapEl.classList.add('without-user-menu');
          }
        } else {
          if (this.els.utilityWrapEl.querySelectorAll('.nv00-gnb__utility.before-login .nv00-gnb__utility-user-menu').length === 1) {
            this.els.utilityWrapEl.classList.add('without-user-menu');
          }
        }
      } else {
        this.els.utilityWrapEl.classList.add('without-account');
      }

      if (this.getCurrentDevice() === 'mobile') {
        this.els.innerWrapEl.insertAdjacentElement('beforebegin', this.els.logoWrapEl);
      }

      [...this.els.l0MenuEls].forEach((el) => {
        if (this.getCurrentDevice() === 'desktop') {
          if (el.querySelector('.nv00-gnb__l0-menu-btn')) {
            el.addEventListener('mouseenter', this.l1MenuShowEventForDesktop);
            //el.querySelector('.nv00-gnb__l0-menu-btn').addEventListener('keydown', this.l1MenuShowEventForDesktop);
            el.addEventListener('mouseleave', this.l1MenuHideEventForDesktop);
          }
        } else if (this.getCurrentDevice() === 'mobile') {
          if (el.querySelector('.nv00-gnb__l0-menu-btn')) {
            // 하위 메뉴가 있는 L0 메뉴 클릭 시
            [...el.querySelectorAll('.nv00-gnb__l1-menu-btn')].forEach((l1) => {
              l1.setAttribute('aria-expanded', 'false');
              l1.setAttribute('aria-haspopup', 'true');

              // 하위 메뉴가 있는 L1 메뉴 클릭 시
              l1.addEventListener('click', this.l2MenuShowEventForMobile);
            });
          }
        }
        //common events for mobile/desktop
        if(el.querySelector('.nv00-gnb__l0-menu-btn')){
          const currentDevice = () =>{
            return this.getCurrentDevice();
          };
          const toggleBtn = el.querySelector('.nv00-gnb__l0-menu-toggle-btn');
          const currentL1Container = el.querySelector('.nv00-gnb__l1-menu-container');
          if (toggleBtn) {
              toggleBtn.addEventListener('keydown', (e)=>{
                if(currentDevice() ==="desktop"){
                  if (currentL1Container.classList.contains('show') && (e.keyCode !== KEY_CODE.TAB)) {
                    currentL1Container.classList.remove('show');
                    currentL1Container.removeAttribute('style');
                    this.els.dimWrapEl.classList.remove('show');
                    this.els.el.classList.remove('show');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                  } else {
                    this.l1MenuShowEventForDesktop(e);
                  }
                }
              });
              toggleBtn.addEventListener('click', (e)=>{
                if(currentDevice() === 'mobile')this.l1MenuShowEventForMobile(e);
                return;
              });
          }
          const l1MenuShowEventForMobile = this.l1MenuShowEventForMobile;
          const l1MenuShowEventForDesktop= this.l1MenuShowEventForDesktop;
          el.querySelector('.nv00-gnb__l0-menu-btn').addEventListener('click',function(e){
            if(currentDevice() === 'mobile'){
              const isSupport = this.textContent.trim().toLowerCase().includes("support")
              if(isSupport){
                l1MenuShowEventForMobile(e);
                return;
              }
              const targetUrl = this.getAttribute('href');
              if (targetUrl && targetUrl !== '#' && targetUrl !== 'javascript:;') {
                window.location.href = targetUrl;
              }
            }
          });
          el.querySelector('.nv00-gnb__l0-menu-btn').addEventListener('keydown',function(e){
            if(currentDevice() === 'mobile'){
              const isSupport = this.textContent.trim().toLowerCase().includes("support");
              if(isSupport && e.keyCode !== KEY_CODE.TAB){
                l1MenuShowEventForMobile(e);
              }
            }else{
              const isSupport = this.textContent.trim().toLowerCase().includes("support");
              if(isSupport && e.keyCode === KEY_CODE.ENTER){
                l1MenuShowEventForDesktop(e);
              }
            }
          })
        }
      });

      [...this.els.l1MenuLinkEls].forEach((el) => {
        el.addEventListener('keydown', (e) => {
          if (e.keyCode === KEY_CODE.RIGHT || e.keyCode === KEY_CODE.DOWN) {
            if (el.parentElement.nextElementSibling) {
              el.parentElement.nextElementSibling.querySelector('.nv00-gnb__l1-menu-link').focus();
            }
          } else if (e.keyCode === KEY_CODE.LEFT || e.keyCode === KEY_CODE.UP) {
            if (el.parentElement.previousElementSibling) {
              el.parentElement.previousElementSibling.querySelector('.nv00-gnb__l1-menu-link').focus();
            }
          }

          if(e.keyCode !== KEY_CODE.TAB && e.keyCode !== KEY_CODE.ENTER){ 
            e.preventDefault();
          }
        });
      });

      [...this.els.l1MenuButtonEls].forEach((el) => {
        el.addEventListener('keydown', (e) => {
          if (e.keyCode === KEY_CODE.RIGHT || e.keyCode === KEY_CODE.DOWN) {
            el.parentElement.nextElementSibling.querySelector('.nv00-gnb__l2-menu-link').focus();
            e.preventDefault();
          }
        });
      });

      [...this.els.l2MenuLinkEls].forEach((el) => {
        el.addEventListener('keydown', (e) => {
          if (e.keyCode === KEY_CODE.RIGHT || e.keyCode === KEY_CODE.DOWN) {
            if (el.parentElement.nextElementSibling) {
              el.parentElement.nextElementSibling.querySelector('.nv00-gnb__l2-menu-link').focus();
            } else if (this.utils.closest(el, '.nv00-gnb__l1-menu-wrap').nextElementSibling) {
              this.utils.closest(el, '.nv00-gnb__l1-menu-wrap').nextElementSibling.querySelector('.nv00-gnb__l1-menu-btn').focus();
            } else {
              this.utils.closest(el, '.nv00-gnb__l0-menu').nextElementSibling.querySelector('.nv00-gnb__l1-menu-link, .nv00-gnb__l0-menu-btn').focus();
              this.l1MenuHideEventForDesktop();
            }

            e.preventDefault();
          } else if (e.keyCode === KEY_CODE.LEFT || e.keyCode === KEY_CODE.UP) {
            if (el.parentElement.previousElementSibling) {
              el.parentElement.previousElementSibling.querySelector('.nv00-gnb__l2-menu-link').focus();
            } else {
              this.utils.closest(el, '.nv00-gnb__l1-menu-wrap').querySelector('.nv00-gnb__l1-menu-btn').focus();
            }

            e.preventDefault();
          }
        });
      });

      // Backward 버튼 클릭 시
      this.els.backwardButtonEl.addEventListener('click', () => {
        // 열려진 L0 메뉴 이동
        this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').removeAttribute('style');

        setTimeout(() => {
          // 열려진 L1 메뉴를 닫아줌
          if (this.activeL1Menu) {
            this.activeL1Menu.classList.remove('show');
            this.activeL1Menu.nextElementSibling.removeAttribute('style');
            this.activeL1Menu.querySelector('.nv00-gnb__l1-menu-btn').setAttribute('aria-expanded', 'false');
            this.activeL1Menu = false;
          }

          // 열려진 L0 메뉴 닫아줌
          this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').classList.remove('show');
          this.activeL0Menu.querySelector('.nv00-gnb__l0-menu-btn').setAttribute('aria-expanded', 'false');
          this.activeL0Menu.querySelector('.nv00-gnb__l0-menu-btn').focus();
          this.activeL0Menu = false;
        }, 400);

        // Backward 버튼 숨김
        $('.nv00-gnb__search-btn.gnb__search-btn-js').css({ 'visibility': 'visible', 'opacity': 1 });
        $('.nv00-gnb__utility-btn-text').css('display', 'block');
        this.els.backwardButtonEl.classList.remove('show');

        // L0, Utility 메뉴 노출
        [...this.els.l0MenuEls].forEach((l0) => {
          l0.querySelector('.nv00-gnb__l0-menu-btn, .nv00-gnb__l0-menu-link').removeAttribute('style');
        });
        this.els.userAccountWrapEl.removeAttribute('style');
        this.els.utilityWrapEl.removeAttribute('style');
        this.els.innerWrapEl.style.overflowY = 'auto';
      });

      // 햄버거 버튼 클릭 시
      this.els.hamburgerButtonEl.addEventListener('click', () => {
        this.els.utilityWrapEl.classList.add('show');
        this.els.searchWrapEl.classList.add('show');
        $('.nv00-gnb__search-btn.gnb__search-btn-js').css({ 'visibility': 'visible', 'opacity': 1 });
        $('.nv00-gnb__utility-btn-text').css('display', 'block');
        $('.nv00-gnb__l0-menu-wrap').css('display', 'block');
        this.els.userAccountWrapEl.classList.add('show');
        this.els.l0MenuWrapEl.classList.add('show');
        this.els.dimWrapEl.classList.add('show');
        this.els.innerWrapEl.classList.add('show');
        var notificationBar = document.querySelector('.epp-bar-wrap');
        var style = window.getComputedStyle(notificationBar);
        // if(style.display !== 'none'){
        //   var searchWrap = document.querySelector('.nv00-gnb__search-wrap');
        //   console.log("style.height", style.height)
        //   searchWrap.style.marginTop = style.height;
        // }
        requestAnimationFrame(() => {
          if (!this.isRtlCommon()) {
            this.els.innerWrapEl.style.right = 0;
          } else {
            this.els.innerWrapEl.style.left = 0;
          }
        });

        this.els.searchButtonEl.focus();
        this.utils.hiddenScroll();
      });

      this.els.dimWrapEl.addEventListener('click', () => {
        if(isMobileDevice()){
          this.els.dimWrapEl.classList.remove("show")
          this.els.closeButtonEl.click()
        }
      })

      // 닫기 버튼 클릭 시
      this.els.closeButtonEl.addEventListener('click', () => {
        // L0, Utility 메뉴 이동
        this.els.innerWrapEl.removeAttribute('style');

        // 열려진 L0 메뉴 이동
        if (this.activeL0Menu) {
          if (!this.isRtlCommon()) {
            this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').style.right = '-360px';
          } else {
            this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').style.left = '-360px';
          }
          this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').style.transitionDuration = '.3s';
        }

        setTimeout(() => {
          // 열려진 L0 메뉴가 있는 경우
          if (this.activeL0Menu) {
            // 열려진 L1 메뉴가 있는 경우
            if (this.activeL1Menu) {
              // 열려진 L1 메뉴 닫아줌
              this.activeL1Menu.classList.remove('show');
              this.activeL1Menu.nextElementSibling.removeAttribute('style');
              this.activeL1Menu.querySelector('.nv00-gnb__l1-menu-btn').setAttribute('aria-expanded', 'false');
              this.activeL1Menu = false;
            }
            // 열려진 L0 메뉴 닫아줌
            this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').classList.remove('show');
            this.activeL0Menu.querySelector('.nv00-gnb__l0-menu-btn').setAttribute('aria-expanded', 'false');
            this.activeL0Menu = false;

            // Backward 버튼 숨김
            this.els.backwardButtonEl.classList.remove('show');
          }

          [...this.els.l0MenuEls].forEach((l0) => {
            l0.querySelector('.nv00-gnb__l0-menu-btn, .nv00-gnb__l0-menu-link').removeAttribute('style');
          });
          this.els.utilityWrapEl.removeAttribute('style');
          this.els.utilityWrapEl.classList.remove('show');
          this.els.searchWrapEl.classList.remove('show');
          this.els.userAccountWrapEl.removeAttribute('style');
          this.els.userAccountWrapEl.classList.remove('show');
          this.els.l0MenuWrapEl.classList.remove('show');
          this.els.dimWrapEl.classList.remove('show');
          this.els.innerWrapEl.classList.remove('show');
          this.els.hamburgerButtonEl.querySelector('.nv00-gnb__utility-btn').focus();
          $('.nv00-gnb__l0-menu-wrap').css('display', 'none');
          $('.nv00-gnb__utility-btn-text').css('display', 'none');
        }, 300);

        this.utils.visibleScroll();
      });

      // Layer Popup Open Button 클릭 시
      [...this.els.layerPopupOpenButtonEls].forEach((el) => {
        el.addEventListener('click', () => {
          this.els.layerPopupWrapEl.classList.add('show');
          this.els.layerPopupWrapEl.querySelector(el.dataset.targetPopup).classList.add('show');
          this.els.layerPopupWrapEl.querySelector(el.dataset.targetPopup).querySelector('.layer-popup__close').focus();
          this.utils.hiddenScroll();
        });
      });

      // Layer Popup Close Button 클릭 시
      [...this.els.layerPopupCloseButtonEls].forEach((el) => {
        el.addEventListener('click', () => {
          this.closeLayerPopup(el);
        });
      });

      this.els.layerPopupLoopingStartEl.addEventListener('focus', () => {
        this.els.layerPopupWrapEl.querySelector('.layer-popup.show .layer-popup__close').focus();
      });

      this.els.layerPopupLoopingEndEl.addEventListener('focus', () => {
        this.els.layerPopupWrapEl.querySelector('.layer-popup.show').querySelector('a, input, button').focus();
      });

      document.addEventListener('scroll', () => {
        if (this.currentDevice === 'desktop' && this.els.dimWrapEl.classList.contains('show')) {
          // this.l1MenuHideEventForDesktop();
          this.els.dimWrapEl.style.top = `${this.els.el.getBoundingClientRect().bottom}px`;
          if (this.els.el.querySelector('.nv00-gnb__l1-menu-container.show, .nv00-gnb__l1-menu-container.show')) {
            this.els.el.querySelector('.nv00-gnb__l1-menu-container.show, .nv00-gnb__l1-menu-container.show').style.top = `${this.els.el.getBoundingClientRect().bottom}px`;
          }
        }
      });

      window.addEventListener('resize', () => {
        if (this.currentDevice !== this.getCurrentDevice()) {
          if (this.getCurrentDevice() === 'desktop') {
            this.els.searchWrapEl.insertAdjacentElement('beforebegin', this.els.logoWrapEl);
            $('.nv00-gnb__l0-menu-wrap').css('display', 'block');
            $('.nv00-gnb__utility-btn-text').css('display', 'block');
            if (this.els.dimWrapEl.classList.contains('show')) {
              if (this.activeL1Menu) {
                this.activeL1Menu.classList.remove('show');
                this.activeL1Menu.nextElementSibling.removeAttribute('style');
                this.activeL1Menu = false;
              }

              if (this.activeL0Menu) {
                this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').removeAttribute('style');
                this.activeL0Menu.querySelector('.nv00-gnb__l1-menu-container').classList.remove('show');
                this.activeL0Menu.querySelector('.nv00-gnb__l0-menu-btn').setAttribute('aria-expanded', 'false');
                this.activeL0Menu = false;
              }

              this.els.backwardButtonEl.classList.remove('show');
              this.els.utilityWrapEl.removeAttribute('style');
              this.els.utilityWrapEl.classList.remove('show');
              this.els.searchWrapEl.classList.remove('show');
              this.els.userAccountWrapEl.removeAttribute('style');
              this.els.userAccountWrapEl.classList.remove('show');
              this.els.l0MenuWrapEl.classList.remove('show');
              this.els.dimWrapEl.classList.remove('show');
              this.els.innerWrapEl.removeAttribute('style');
              this.els.innerWrapEl.classList.remove('show');

              this.utils.visibleScroll();
            }

            // featured-products-thumbnail 의 경우, 생성된 swiper 제거
            // if (this.isSwiperInit) {
            //   this.swiper.destroy();

            //   this.els.el.querySelector('.nv00-gnb__featured-products-thumbnail-item-container').classList.remove('swiper-container');
            //   this.els.el.querySelector('.nv00-gnb__featured-products-thumbnail-item-wrap').classList.remove('swiper-wrapper');
            //   [...this.els.el.querySelectorAll('.nv00-gnb__featured-products-thumbnail-item')].forEach((item) => {
            //     item.classList.remove('swiper-slide');
            //   });

            //   this.isSwiperInit = false;
            // }

            [...this.els.l0MenuEls].forEach((el) => {
              el.querySelector('.nv00-gnb__l0-menu-btn, .nv00-gnb__l0-menu-link').removeAttribute('style');

              if (el.querySelector('.nv00-gnb__l0-menu-btn')) {
                // 하위 메뉴가 있는 L0 메뉴 클릭 시
                el.querySelector('.nv00-gnb__l0-menu-btn').removeEventListener('click', this.l1MenuShowEventForMobile);

                [...el.querySelectorAll('.nv00-gnb__l1-menu-btn')].forEach((l1) => {
                  l1.removeAttribute('aria-expanded');
                  l1.removeAttribute('aria-haspopup');

                  // 하위 메뉴가 있는 L1 메뉴 클릭 시
                  l1.removeEventListener('click', this.l2MenuShowEventForMobile);
                });

                el.addEventListener('mouseenter', this.l1MenuShowEventForDesktop);
                el.addEventListener('mouseleave', this.l1MenuHideEventForDesktop);
              }
            });
          } else {
            this.els.innerWrapEl.insertAdjacentElement('beforebegin', this.els.logoWrapEl);
            this.els.dimWrapEl.removeAttribute('style');
            $('.nv00-gnb__l0-menu-wrap').css('display', 'none');
            $('.nv00-gnb__utility-btn-text').css('display', 'none');
            [...this.els.l0MenuEls].forEach((el) => {
              if (el.querySelector('.nv00-gnb__l0-menu-btn')) {
                el.removeEventListener('mouseenter', this.l1MenuShowEventForDesktop);
                el.removeEventListener('mouseleave', this.l1MenuHideEventForDesktop);

                // 하위 메뉴가 있는 L0 메뉴 클릭 시
                //el.querySelector('.nv00-gnb__l0-menu-btn').addEventListener('click', this.l1MenuShowEventForMobile);

                [...el.querySelectorAll('.nv00-gnb__l1-menu-btn')].forEach((l1) => {
                  l1.setAttribute('aria-expanded', 'false');
                  l1.setAttribute('aria-haspopup', 'true');

                  // 하위 메뉴가 있는 L1 메뉴 클릭 시
                  l1.addEventListener('click', this.l2MenuShowEventForMobile);
                });
              }
            });
          }
          this.currentDevice = this.getCurrentDevice();
        }
      });

      //Discover section show hide on mobileView
      $('.nv00-gnb__featured-products-thumbnail-title').on('click', function (e) {
        e.preventDefault();
        const closestLinksCont = $(this).next()[0];
        const icon = $(this).find('.icon');
        if (window.innerWidth > 1297) {
          $(closestLinksCont).css('max-height', 'auto');
        } else {
          if ($(closestLinksCont).hasClass('expandThumb')) {
            $(closestLinksCont).removeClass('expandThumb');
            $(closestLinksCont).css({ 'max-height': '0px', 'overflow': 'hidden' });
            $(icon).css('transform', 'translateY(-50%) rotate(0deg)');
            if (window.utag && utag.link) {
              utag.link({
                link_cat: 'navigation', 
                link_id: `${$(this).attr('data-header-title').toLowerCase()}_close`, 
                event_name : `select_${$(this).attr('data-header-title').toLowerCase()}_close_click`,
                link_position: "navigation>gnb"
              }); 
          }
          } else {
            $(closestLinksCont).css({ 'max-height': `${closestLinksCont.scrollHeight}px`, 'overflow': 'auto' });
            $(icon).css('transform', 'translateY(-50%) rotate(180deg)');
            $(closestLinksCont).addClass('expandThumb')
            if (window.utag && utag.link) {
              utag.link({
                link_cat: 'navigation', 
                link_id: `${$(this).attr('data-header-title').toLowerCase()}_open`, 
                event_name : `select_${$(this).attr('data-header-title').toLowerCase()}_open_click`,
                link_position: "navigation>gnb"
              }); 
          }
          }
        }
      });

      //focus state event on mouse over for l0
      $(".nv00-gnb__l0-menu-btn").each(function () {
        $(this).on("mouseenter", function () {
          $(this).focus();
        });
        $(this).on("mouseleave", function () {
          $(this).blur();
        });
      });
    }

    getCurrentDevice() {
      const width = this.utils.getViewPort().width;
      return width > 1279 ? 'desktop' : 'mobile';
    }

    openLayerPopup(targetPopupId) {
      this.els.layerPopupWrapEl.classList.add('show');
      this.els.layerPopupWrapEl.querySelector(targetPopupId).classList.add('show');
      this.els.layerPopupWrapEl.querySelector(targetPopupId).querySelector('.layer-popup__close').focus();
      this.utils.hiddenScroll();
    }

    closeLayerPopup(el) {
      this.els.layerPopupWrapEl.classList.remove('show');

      if (el) {
        let layerPopupEl;

        if (el instanceof Element) {
          layerPopupEl = this.utils.closest(el, '.layer-popup');
        } else {
          layerPopupEl = this.els.el.querySelector(el);
        }

        layerPopupEl.classList.remove('show');

        if (this.els.el.querySelector(`[data-target-popup="#${layerPopupEl.id}"]`)) {
          this.els.el.querySelector(`[data-target-popup="#${layerPopupEl.id}"]`).focus();
        } else {
          this.els.logoEl.focus();
        }
      }

      this.utils.visibleScroll();
    }
  }

  Nv00Gnb.instances = new WeakMap();

  const nv00Gnb = {
    initAll() {
      [...document.querySelectorAll('.nv00-gnb')].forEach((el) => {
        if (!Nv00Gnb.instances.has(el)) {
          new Nv00Gnb(el);
        }
      });
    },
    openLayerPopup(targetPopupId) {
      Nv00Gnb.instances.get(document.querySelector('.nv00-gnb')).openLayerPopup(targetPopupId);
    },
    closeLayerPopup(el) {
      Nv00Gnb.instances.get(document.querySelector('.nv00-gnb')).closeLayerPopup(el);
    },
  };

  window.sg.components.nv00Gnb = nv00Gnb;
  // $q.ready(() => nv00Gnb.initAll());

  const openNewWin = 'Open in a new window';

  function isMobileDevice() {
    const width = window.sg.common.utils.getViewPort().width;
    return width > 1279 ? false : true;
  }

  function lv0NoChildren(lv0model,l0Index) {
    const isForBusiness = lv0model.displayName.toLowerCase().includes("business")

    return `<!--/* 하위 L1 Menu 가 없는 경우, 아래 마크업 적용 S */-->
      <!--/* L0 S */-->
      <li class="nv00-gnb__l0-menu${lv0model.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}">
        <a class="nv00-gnb__l0-menu-link ${lv0model.linkType == 'new' ? "has-icon" : ''}"
          href="${lv0model.linkUrl}" 
          target="${lv0model.linkType == 'new' ? '_blank' : ''}" 
          aria-label="${lv0model.linkType == 'new' ? openNewWin : ''}"
          ${isForBusiness ? `
          data-link_cat="navigation" 
          data-link_id="${lv0model.displayName ||lv0model.englishName}" 
          data-event_name="Select_${lv0model.displayName ||lv0model.englishName}_click" 
          data-link_position="navigation>gnb"
          role="menuitem"
            ` : ""}
          >
          ${lv0model.displayName}
          ${lv0model.linkType === 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : ""}
        </a>
      </li>
      <!--/* L0 E */-->
      <!--/* 하위 L1 Menu 가 없는 경우, 아래 마크업 적용 E */-->`;
  }

  function isBadgeInTimePeriod(lv2model) {
    var isShowBadge = false;
    const timePeriod = lv2model.badgePeriod;
    if (timePeriod) {
      const timeArray = timePeriod.split("|");
      if (timeArray.length > 0 && timeArray[0] && timeArray[1]) {
        const startDate = Date.parse(timeArray[0].replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1'));
        const endDate = Date.parse(timeArray[1].replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1'));
        const today = Date.parse(new Date().toLocaleString("en-US", { timeZone: 'America/New_York', dateStyle: "short" }));
        if (today >= startDate && today <= endDate) {
          isShowBadge = true;
        }
      }
    }
    return isShowBadge;
  }

  function lv2MenuItem(lv2model, lv1model, lv0model,l0Index, l1Index,l2Index) {
    const newL1Idx = l1Index -1 ; // we already have + 1 from params so need to balance.
    const isSupport = lv0model.displayName.toLowerCase().includes("support")
    let badgeIcon = ((lv2model.badgeFlag === 'true' && lv2model.badgeEnabled === true) && isBadgeInTimePeriod(lv2model)) ? `<span class="badge-icon badge-icon--label badge-icon--bg-color-${lv2model.badgeType == 'new' ? 'blue' : ''}${lv2model.badgeType == 'hot' ? 'red' : ''}${lv2model.badgeType == 'eco' ? 'green' : ''}">${lv2model.badgeText}</span>` : '';
    let shopLive = lv2model.shopLivePeriod ? `<span class="live-commerce-badge" data-live-streaming-time='${lv2model.shopLivePeriod}'>live commerce OnAir</span>` : '';
    let linkSVG = lv2model.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';

    const getPosition = (idx) => (idx+1 <= 9) ? `0${idx+1}` : `${idx+1}`

    return `<li class="nv00-gnb__l2-menu${lv2model.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}">
      <a class="nv00-gnb__l2-menu-link" 
        href="${lv2model.linkUrl}" 
        target="${lv2model.linkType == 'new' ? '_blank' : ''}" 
        aria-label="${!lv2model.shopLivePeriod ? 'Samsung Live Streaming' : ''}${lv2model.linkType == 'new' ? openNewWin : ''}" 
        ${isSupport ? `
          data-link_cat="navigation" 
          data-link_id="${lv0model.displayName ||lv0model.englishName}>${lv1model.displayName ||lv1model.englishName}>${lv2model.displayName ||lv2model.englishName}"
          data-event_name="Select_${lv0model.displayName ||lv0model.englishName}>${lv1model.displayName ||lv1model.englishName}>${lv2model.displayName ||lv2model.englishName}_click"
          data-link_position="navigation>gnb"
          `: `
          ${isMobileDevice() ? `
          data-link_cat="navigation" 
          data-link_id="L0_${getPosition(l0Index)}_${lv0model.displayName ||lv0model.englishName}>L1_${getPosition(newL1Idx)}_${lv1model.displayName ||lv1model.englishName}>L2_${getPosition(l2Index)}_${lv2model.displayName ||lv2model.englishName}"
          data-event_name="Select_L0_${getPosition(l0Index)}_${lv0model.displayName ||lv0model.englishName}>L1_${getPosition(newL1Idx)}_${lv1model.displayName ||lv1model.englishName}>L2_${getPosition(l2Index)}_${lv2model.displayName ||lv2model.englishName}_click"
          data-link_position="navigation>gnb"
          `:``}
          `}
       
        >
        ${lv2model.displayName}
        ${badgeIcon}        
        ${shopLive}
        ${linkSVG}
      </a>
    </li>`
  }

  function l1l2SpreadMenuItem(lv1model, lv0model, isTypeEMenu,l1Index,l0Index) {
    let lv2MenuList = '';
    let linkSVG = lv1model.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';
    let featureBadge = ((lv1model.badgeFlag === 'true' || lv1model.badgeFlag === true) && isBadgeInTimePeriod(lv1model)) ? `<span class="badge-icon badge-icon--label badge-icon--bg-color-${lv1model.badgeType === 'new' ? 'blue' : ''}${lv1model.badgeType == 'hot' ? 'red' : ''}${lv1model.badgeType == 'eco' ? 'green' : ''}">${lv1model.badgeText}</span>` : '';


    if (lv1model.level2MenuList && lv1model.level2MenuList.length > 0) {
      let lv2MenuItems = '';
      lv1model.level2MenuList.forEach((lv2model,l2Index) => {
        lv2MenuItems += lv2MenuItem(lv2model, lv1model, lv0model, l0Index, l1Index,l2Index);
      })

      lv2MenuList = `<ul class="nv00-gnb__l2-menu-list">
        ${lv2MenuItems}
      </ul>`;
    }

    return `${lv1model.nextRowClass ? `<div class="nv00-gnb__l1-menu-break"></div>` : ""}
    <div class="nv00-gnb__l1-menu ${lv2MenuList ? "nv00-gnb__l1-menu-hasl2" : ""} ${isTypeEMenu ? "nv00-gnb__l1-menu-two-row" : ""}">
        <button class="nv00-gnb__l1-menu-btn nv00-gnb__l1-menu-btn-mode-button"
            data-engname="${lv0model.displayName ||lv0model.englishName}:${lv1model.displayName ||lv1model.englishName}" 
            data-evar_104="configurator"
            data-evar_105="_${lv1model.displayName ||lv1model.englishName}"
            data-evar_106="select"
            data-evar_11="gnb_menu"
            >
          ${!isTypeEMenu ? `<img class="nv00-gnb__l1-menu-btn-image" src="${lv1model.imageUrl}" loading="lazy" data-desktop-src="${lv1model.imageUrl}" data-mobile-src="${lv1model.imageUrl}" alt="${lv1model.imageAlt}" role="img" data-comp-name="image" />` : ""}
          ${lv1model.displayName}
          <svg class="icon icon--dropdown" id="open-down-bold" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path id="Icon_Regular_Navigation_Open_down" data-name="Icon / Regular / Navigation / Open_down" d="M13.958,0,14.7.731,7.35,8.191,0,.731.742,0,7.35,6.707Z" transform="translate(2.65 6.738)"/>
          </svg>
        </button>

        <a class="nv00-gnb__l1-menu-btn nv00-gnb__l1-menu-btn-mode-anchorlink"             
            ${lv1model.linkUrl ? `href="${lv1model.linkUrl}"` : ''}
            ${lv1model.linkUrl && lv1model.linkType == 'new' ? `target="_blank"` : ''}
            data-engname="${lv0model.englishName}:${lv1model.englishName}" 
            data-link_cat="navigation" 
            data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${l1Index <= 9 ? `0${l1Index}` : `${l1Index}`}_${lv1model.displayName ||lv1model.englishName}"
            data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${l1Index <= 9 ? `0${l1Index}` : `${l1Index}`}_${lv1model.displayName ||lv1model.englishName}_click" 
            data-link_position="navigation>gnb"
            >
          ${!isTypeEMenu ? `<img class="nv00-gnb__l1-menu-btn-image" src="${lv1model.imageUrl}" loading="lazy" data-desktop-src="${lv1model.imageUrl}" data-mobile-src="${lv1model.imageUrl}" alt="${lv1model.imageAlt}" role="img" data-comp-name="image" />` : ""}
          ${lv1model.displayName}
          ${featureBadge}
        </a>
      </div>
      ${lv2MenuList}
      `
  }

  function l1l2SpreadMenu(lv0model, positionRight, nextRowIndex, l0Index) {
    let lv1Collection = {};
    const isTypeEMenu = lv0model.layoutType && lv0model.layoutType.toLowerCase() === 'typee';
    const withoutFeatureSecData = lv0model.level1MenuList.sort((a, b) => {
      if (a.layoutRow < b.layoutRow) {
        return -1;
      }
      if (a.layoutRow > b.layoutRow) {
        return 1;
      }
      return 0;
    });

    let isNextRowClassApplied = false;
    withoutFeatureSecData.forEach((lv1model, index) => {
      lv1Collection[lv1model.layoutColumn] = lv1Collection[lv1model.layoutColumn] || [];
      if ((!isNextRowClassApplied && lv1model.layoutRow === "2" && nextRowIndex >= index) || (!isNextRowClassApplied && nextRowIndex === index)) {
        isNextRowClassApplied = true;
        lv1model["nextRowClass"] = true;
      }
      lv1Collection[lv1model.layoutColumn].push(lv1model);
    });

    let sortKeysOflvlColl = Object.keys(lv1Collection).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

    let sortedlv1CollObj = {};
    sortKeysOflvlColl.forEach(key => {
      sortedlv1CollObj[key] = lv1Collection[key];
    });

    let lv1MenuWrap = ''
    Object.keys(sortedlv1CollObj).forEach(column => {
      let lv1MenuItemWithL2 = ''
      let lv1MenuItemWithoutL2 = ''
      let lv1List = lv1Collection[column];
      let lv1ListWithL2 = [];
      let lv1ListWithOutL2 = [];

      lv1List.forEach(lv1model => {
        if (lv1model.level2MenuList.length > 0) {
          lv1ListWithL2.push(lv1model);
        } else {
          lv1ListWithOutL2.push(lv1model);
        }
      })

      lv1ListWithOutL2.forEach((lv1model, l1Index) => {
        lv1MenuItemWithoutL2 += l1OnlyMenuItem(lv0model, lv1model,l1Index, l0Index)
      })

      lv1ListWithL2.forEach((lv1model, l1Index) => {
        lv1MenuItemWithL2 += l1l2SpreadMenuItem(lv1model, lv0model, isTypeEMenu,l1Index+lv1ListWithOutL2.length+1,l0Index)
      })
      // debugger;
      lv1MenuWrap += `<div class="nv00-gnb__l1-menu-wrap l1-l2-spread ${lv1List[0].mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}">
          ${lv1MenuItemWithoutL2}
          <div class="nv00-gnb__l1-menu-wrap-mobile-break"></div>
          ${lv1MenuItemWithL2}
      </div>`;
    });
    let alignmentClass = positionRight ? 'right-side' : 'left-side';

    let featureThumbnails = featureBenefitsCards({ item: lv0model.banners, l0Index : l0Index }, lv0model);

    let discoverMobileMenu = [];
    let discoverMobileHtml = '';
    let buyingGuideMobileMenu = [];
    let buyingGuideMobileHtml = '';
    Object(lv0model).hasOwnProperty("banners") && lv0model.banners.forEach(element => {
      if (element.vdBannerFlag) {
        if (element.groupType === "VD-D") {
          discoverMobileMenu.push(element);
        } else {
          buyingGuideMobileMenu.push(element);
        }
      }
    });

    if (discoverMobileMenu && discoverMobileMenu.length > 0) {
      discoverMobileHtml = featureBenefitsCards({ item: discoverMobileMenu }, lv0model, 'Discover', true);
    }

    if (buyingGuideMobileMenu && buyingGuideMobileMenu.length > 0) {
      buyingGuideMobileHtml = featureBenefitsCards({ item: buyingGuideMobileMenu }, lv0model, 'Buying Guide', true);
    }

    return `<div class="nv00-gnb__l1-menu-container ${Object.keys(lv1Collection).length > 2 ? ' ' + alignmentClass : ''}">
    <p class="nv00-gnb__l1-menu-container-title">${lv0model.displayName}<!-- 44 --></p>
    <div class="nv00-gnb__l1-menu-wrap-container ${!isTypeEMenu ? 'nv00-gnb__nv00-gnb__l0-menu-v2' : ''}">
      <div class="nv00-gnb__l1-menu-wrap__inner">  
        ${lv1MenuWrap}
      </div>
        ${featureThumbnails && `<div class="nv00-gnb__featured-products-container">
          <div class="nv00-gnb__featured-products-container-inner">
            ${featureThumbnails}
          </div>
          <div class="nv00-gnb__featured-products-container-inner-mobile">
            ${featureThumbnails}
          </div>
        </div>`}
        ${(discoverMobileHtml || buyingGuideMobileHtml) && `
          <div class="nv00-gnb__featured-products-container-inner-mobile nv00-gnb__mobile-banner-l1-menu-banners">
            ${discoverMobileHtml}
            ${buyingGuideMobileHtml}
          </div>`}
        </div>
    </div>`;
  }

  function l1OnlyMenuItem(lv0model, lv1model,l1Index, l0Index) {
    let linkSVG = lv1model.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';
    let featureBadge = ((lv1model.badgeFlag === 'true' || lv1model.badgeFlag === true) && isBadgeInTimePeriod(lv1model)) ? `<span class="badge-icon badge-icon--label badge-icon--bg-color-${lv1model.badgeType === 'new' ? 'blue' : ''}${lv1model.badgeType == 'hot' ? 'red' : ''}${lv1model.badgeType == 'eco' ? 'green' : ''}">${lv1model.badgeText}</span>` : '';

    return `${lv1model.nextRowClass ? `<div class="nv00-gnb__l1-menu-break"></div>` : ""}
      <div class="nv00-gnb__l1-menu ${lv1model.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}" role="menuitem">
        <a class="nv00-gnb__l1-menu-link" 
          href="${lv1model.linkUrl}" 
          target="${lv1model.linkType == 'new' ? '_blank' : ''}"
          aria-label="${lv1model.linkType == 'new' ? openNewWin : ''}" 
          data-engname="${lv0model.englishName}:${lv1model.englishName}"
          data-link_cat="navigation" 
          data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${l1Index+1 <= 9 ? `0${l1Index+1}` : `${l1Index+1}`}_${lv1model.displayName ||lv1model.englishName}"
          data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${l1Index+1 <= 9 ? `0${l1Index+1}` : `${l1Index+1}`}_${lv1model.displayName ||lv1model.englishName}_click" 
          data-link_position="navigation>gnb"
          >
          <img class="nv00-gnb__l1-menu-btn-image" src="${lv1model.imageUrl}" loading="lazy" data-desktop-src="${lv1model.imageUrl}" data-mobile-src="${lv1model.imageUrl}" alt="${lv1model.imageAlt}" role="img" data-comp-name="image">
          <span class="nv00-gnb__l1-menu-btn-title-container">${lv1model.displayName}${linkSVG}</span>
        </a>
        ${featureBadge}
      </div>`
  }

  function l1OnlyMenu(lv0model, positionRight, nextRowIndex,l0Index) {
    const withoutFeatureSecData = lv0model.level1MenuList.sort((a, b) => {
      if (a.layoutRow < b.layoutRow) {
        return -1;
      }
      if (a.layoutRow > b.layoutRow) {
        return 1;
      }
      return 0;
    });
    let gridClass = 'grid-column--seven';

    //based on layoutType arranging the img grid
    const layOutType = lv0model.layoutType.toLowerCase();
    if (layOutType === "typed" || layOutType === "typeb") {
      gridClass = 'grid-column--six';
    }

    let lv1OnlyMenuList = '';
    if (withoutFeatureSecData.length > 0 && withoutFeatureSecData.length < 19) {
      let lv1OnlyMenuItems = '';
      let isNextRowClassApplied = false;
      let nextRowClass = "";
      withoutFeatureSecData.forEach((lv1model, index) => {
        let linkSVG = lv1model.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';
        let featureBadge = ((lv1model.badgeFlag === 'true' || lv1model.badgeFlag === true) && isBadgeInTimePeriod(lv1model)) ? `<span class="badge-icon badge-icon--label badge-icon--bg-color-${lv1model.badgeType === 'new' ? 'blue' : ''}${lv1model.badgeType == 'hot' ? 'red' : ''}${lv1model.badgeType == 'eco' ? 'green' : ''}">${lv1model.badgeText}</span>` : '';
        if (!isNextRowClassApplied && lv1model.layoutRow === "2" && nextRowIndex >= index) {
          nextRowClass = "new-row-start";
          isNextRowClassApplied = true;
        }
        lv1OnlyMenuItems += `<li class="nv00-gnb__l1-menu ${lv1model.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''} ${nextRowClass}" role="menuitem">
          <a class="nv00-gnb__l1-menu-link" 
            href="${lv1model.linkUrl}" 
            target="${lv1model.linkType == 'new' ? '_blank' : ''}"
            aria-label="${lv1model.linkType == 'new' ? openNewWin : ''}" 
            data-engname="${lv0model.englishName}:${lv1model.englishName}"
            data-link_cat="navigation" 
            data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${index+1 <= 9 ? `0${index+1}` : `${index+1}`}_${lv1model.displayName ||lv1model.englishName}"
            data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}>L1_${index+1 <= 9 ? `0${index+1}` : `${index+1}`}_${lv1model.displayName ||lv1model.englishName}_click" 
            data-link_position="navigation>gnb"
            >
            <img class="nv00-gnb__l1-menu-btn-image" src="${lv1model.imageUrl}" loading="lazy" data-desktop-src="${lv1model.imageUrl}" data-mobile-src="${lv1model.imageUrl}" alt="${lv1model.imageAlt}" role="img" data-comp-name="image">
            <span class="nv00-gnb__l1-menu-btn-title-container">${lv1model.displayName}${linkSVG}</span>
          </a>
          ${featureBadge}
        </li>`
        nextRowClass = "";
      })
      lv1OnlyMenuList = `<ul class="nv00-gnb__l1-menu-list ${gridClass}" role="menu">
        ${lv1OnlyMenuItems}
      </ul>`;
    }

    let featureThumbnails = featureBenefitsCards({ item: lv0model.banners, l0Index : l0Index }, lv0model);
    const isSupport = lv0model.displayName.toLowerCase().includes("support");
    
    function getL1TaggingData(){
      return `
            data-link_cat="navigation" 
            data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}`: `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}"
            data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}`: `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}_click" 
            data-link_position="navigation>gnb"
            `;
    }

    return `<div class="nv00-gnb__l1-menu-container nv00-gnb__nv00-gnb__l0-menu-v2">
          ${isSupport
      ?`<p class="nv00-gnb__l1-menu-container-title">${lv0model.displayName}<!-- 90 --></p>`
      :`<a ${lv0model.linkUrl || lv0model.mobileBannerLinkUrl ? `href="${lv0model.linkUrl || lv0model.mobileBannerLinkUrl}"` : ''} 
        tabindex="0" 
        class="nv00-gnb__l1-menu-container-title" 
       ${getL1TaggingData()}>${lv0model.displayName}</a>`}
      <div class="nv00-gnb__l1-menu-wrap l1-only nv00-gnb__l1-menu-wrap-container ${!featureThumbnails ? "container--center" : ""}">
        <div class="nv00-gnb__l1-menu-wrap__inner">  
          ${lv1OnlyMenuList}
        </div>
        ${featureThumbnails ?
        `<div class="nv00-gnb__featured-products-container">
            <div class="nv00-gnb__featured-products-container-inner">
              ${featureThumbnails}
            </div>
        </div>`
        : ""}
      </div>
    </div>`
  }

  function userMenuListItem(item) {
    let linkSVG = item.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';
    return `<li class="nv00-gnb__utility-user-menu ${item.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}" role="menuitem">
						<a 
            aria-label="${item.displayName}"
            class="nv00-gnb__utility-user-menu-link" 
            target="${item.linkType == 'new' ? '_blank' : ''}" 
            href="${item.linkUrl}" 
            data-link_cat="navigation" 
            data-link_id="acct>${item.displayName}" 
            data-event_name="select_acct>${item.displayName}_click" 
            data-link_position="navigation>gnb" 
            >
            ${item.displayName} ${linkSVG}
            </a>
					</li>`
  }

  function addSignInMenu(loginLinkUrl) {
    return `<li class="nv00-gnb__utility-user-menu desktop-only" role="menuitem">
					<a class="nv00-gnb__utility-user-menu-link loginBtn gnb-login" href="javascript:;" data-linkinfo="${loginLinkUrl}" 
           data-link_cat="navigation" 
            data-link_id="acct>Sign In/Sign-Up" 
            data-event_name="select_acct>Sign In/Sign-Up_click" 
            data-link_position="navigation>gnb" 
          >
						Sign In/Sign-Up
					</a>
				</li>`
  }

  function addWhySamsungAccountMenu(item) {
    let linkSVG = `<svg class="icon" id="next-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1">
              <path d="M35.757 84.389l-5.533-5.778 31.982-30.612L30.224 17.39l5.533-5.779 38.018 36.388z"></path>
          </svg>`;
    return `<li class="nv00-gnb__utility-user-menu nv00-gnb__utility-why-samsung-account desktop-only" role="menuitem">
					<a class="nv00-gnb__utility-user-menu-link" href="${item.linkUrl}" 
            aria-label="${item.displayName}"
            data-link_cat="navigation" 
            data-link_id="acct>${item.displayName}" 
            data-event_name="select_acct>${item.displayName}_click" 
            data-link_position="navigation>gnb" 
          >
            ${item.displayName} ${linkSVG}
					</a>
				</li>`
  }

  function addWhySamsungAccountMenuForMobileMenu(item) {
    let linkSVG = item.linkType == 'new' ? `<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>` : '';
    return `<a class="nv00-gnb__user-account-link" href="${item.linkUrl}" aria-label="${item.displayName}">
            ${item.displayName} ${linkSVG}
					</a>`
  }

  // function addUserProfileMenu () {
  //   return `<li class="nv00-gnb__utility-user-menu user desktop-only" role="menuitem">
  // 				<a class="nv00-gnb__utility-user-menu-link js-user-name" aria-label="Manage Account" href="https://account.samsung.com/membership/contents/profile/profile-gate" >
  // 					<!--/* Preset: 32*32 */-->
  // 					<div class="image js-gnb-afterlogin-image">
  // 						<img class="image__main" src="" alt="alternative-text" role="img" data-comp-name="image">
  // 					</div>
  // 					<span class="account-icon js-gnb-afterlogin-no-image">
  // 						<svg class="icon" id="user-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="presentation" aria-hidden="true" tabindex="-1">
  //               <path d="M48 50c17.346 0 32 14.221 32 31.054V89c0 2.757-2.243 5-5 5H21c-2.757 0-5-2.243-5-5v-7.946C16 64.221 30.654 50 48 50zm0 8c-12.785 0-24 10.773-24 23.054V86h48v-4.946C72 68.773 60.785 58 48 58zm-.002-56c12.133 0 22.003 9.87 22.003 22.001C70 36.131 60.13 46 47.998 46c-12.13 0-21.997-9.869-21.997-21.999C26 11.87 35.867 2 47.998 2zm0 8c-7.718 0-13.997 6.281-13.997 14.001C34 31.72 40.28 38 47.998 38 55.718 38 62 31.72 62 24.001 62 16.281 55.719 10 47.998 10z"></path>
  //            	</svg>
  // 					</span>
  // 					<p class="user-name"></p>
  // 				</a>
  // 			</li>`
  // }

  function addLogoutMenu(useSignInBtn) {
    return `<li data-sly-test="${useSignInBtn}" class="nv00-gnb__utility-user-menu" role="menuitem" >
					<a href="javascript:;" class="nv00-gnb__utility-user-menu-link logoutBtn" data-event_name="select_logout_click" data-link_cat="navigation" data-link_position="navigation>logout" data-link_id="logout" aria-label="Log Out">Log Out</a>
				</li>`
  }

  function lv0HasChildren(lv0model, positionRight, l0Index) {
    const isSupport = lv0model.displayName.toLowerCase().includes("support")
    let l1MenuContainer = '';
    const hasl1l2menus = lv0model.level1MenuList.some(item => item.level2MenuList && item.level2MenuList.length > 0)
    const menuType = lv0model.layoutType && lv0model.layoutType.toLowerCase();
    const isMobileBannerFlag = (isMobileDevice() && (lv0model.mobileBannerUseFlag === true || lv0model.mobileBannerUseFlag === "true")) ? true : false;
    const nextRowIndex = (menuType === "typea" || menuType === "typee") ? 7 : (menuType === "typeb" || menuType === "typec") ? 6 : "";
    if (hasl1l2menus) {
      l1MenuContainer += l1l2SpreadMenu(lv0model, positionRight, nextRowIndex,l0Index);
    } else {
      l1MenuContainer += l1OnlyMenu(lv0model, positionRight, nextRowIndex,l0Index);
    }


    function getL0TaggingData (){
      return isSupport  ? `
            data-link_cat="navigation" 
            data-link_id="${lv0model.displayName ||lv0model.englishName}"
            data-event_name="Select_${lv0model.displayName ||lv0model.englishName}_click" 
            data-link_position="navigation>gnb"
            ` : `
            data-link_cat="navigation" 
            data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}`: `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}"
            data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}`: `${l0Index+1}`}_${lv0model.displayName ||lv0model.englishName}_click" 
            data-link_position="navigation>gnb"
            `
    }

    return `<li class="nv00-gnb__l0-menu ${lv0model.mobileOnlyFlag == 'Y' ? ' mobile-only' : ''}" data-mobile-banner-link="${lv0model.mobileBannerLinkUrl}">
        <div class="nv00-gnb__l0-menu-title">
            <a ${lv0model.linkUrl || lv0model.mobileBannerLinkUrl ? `href="${lv0model.linkUrl || lv0model.mobileBannerLinkUrl}"` : ''} tabindex="0" class="nv00-gnb__l0-menu-btn" role="menuitem" aria-expanded="false" aria-haspopup="true"
              ${getL0TaggingData()}>
              <span class="nv00-gnb__l0-menu-text">${isMobileBannerFlag ? lv0model.mobileBannerTitle : lv0model.displayName}</span>
            </a>
            <button class="nv00-gnb__l0-menu-toggle-btn ${isSupport ? 'no-separator' : ''}" role="menuitem" aria-expanded="false" aria-haspopup="true" aria-label="Open Menu">
              <span class="hidden">${lv0model.displayName}</span>
            </button>
        </div>
        ${l1MenuContainer}
      </li>`
  }

  function Lv0MenuItem(lv0model, positionRight, l0Index) {
    if (lv0model.level1MenuList && lv0model.level1MenuList.length > 0) {
      return lv0HasChildren(lv0model, positionRight,l0Index)
    } else {
      return lv0NoChildren(lv0model,l0Index);
    }
  }

  function featureBenefitsCards({ item, l0Index=null }, lv0model, headerTitle, isMobileBanner) {
    const openNewWin = 'Open in a new window'; 
    const isSupport = lv0model.displayName.toLowerCase().includes("support");

    if (item && item.length > 0) {
      let featureLinks = '';
      let featureItems = '';
      let featureThumbnails = '';
      let gridClass = 'grid-column--two';
      const isTypeEMenu = lv0model.layoutType && lv0model.layoutType.toLowerCase() === 'typee';
  
      if (isTypeEMenu && !isSupport) {
        gridClass = 'grid-column--three';
      } else if (isTypeEMenu && isSupport) {
        gridClass = 'grid-column--three grid-support';
      }
  
      if (isSupport) {
        item.forEach((ftData, idx) => {
          featureItems += `<li class="nv00-gnb__featured-products-thumbnail-item ${(ftData.mobileOnlyFlag == 'Y' || ftData.mobileOnlyFlag == true) ? 'mobile-only' : ''} ${(!isMobileBanner && (ftData.vdBannerFlag === true || ftData.vdBannerFlag === "true")) ? 'nv00-gnb__featured-products-thumbnail-item-hide-mobile' : ''}  ${isSupport ? "nv00-gnb__featured-products-thumbnail-item-support" : ""}" role="menuitem">
            <a class="${isSupport ? "nv00-gnb__featured-product-thumbnail-wrapper-support" : "nv00-gnb__featured-product-thumbnail-wrapper"}" href="${ftData.linkUrl}" target="${ftData.linkType === 'new' ? '_blank' : ''}"
                  aria-label="${ftData.linkType === 'new' ? openNewWin : ''}"
                  ${headerTitle && headerTitle.length && headerTitle === "Discover Shop" ? `
                  data-link_cat="navigation" 
                  data-link_id="${headerTitle.toLowerCase()}>${ftData.description.toLowerCase()}"
                  data-event_name="select_${headerTitle.toLowerCase()}>${ftData.description.toLowerCase()}_click"
                  data-link_position="navigation>gnb"
                    ` : `
                  data-link_cat="navigation" 
                  data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.description}"
                  data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.description}_click"
                  data-link_position="navigation>gnb"
                    `} 
                  
                  >
            ${!isMobileBanner ? `<div class="${`nv00-gnb__featured-products-thumbnail-item-link ${lv0model.fullBleedFlag === 'true' ? 'featured-products-thumbnail__fullBleed' : ''}`}">
                  <div class="image">
                    <img class="image__main" src="${ftData.imageUrl}" loading="lazy" data-desktop-src="${ftData.imageUrl}" data-mobile-src="${ftData.imageUrl}" alt="${ftData.imageAlt}" role="img" data-comp-name="image">
                  </div>
                </div>` : ""}
                <div class="nv00-gnb__featured-products-thumbnail-item-name">${ftData.description}</div>
                </a>
              </li>`;
        });
  
        featureThumbnails = `<div class="nv00-gnb__l1-menu-wrap featured-products-thumbnail">
                  <div class="nv00-gnb__featured-products-thumbnail-item-container isSupport">
                   <p class="nv00-gnb__featured-products-thumbnail-title" data-header-title="${headerTitle}">
                     ${headerTitle || isMobileBanner ? `${headerTitle}
                     <svg class="icon icon--dropdown" id="open-down-bold" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                       <path id="Icon_Regular_Navigation_Open_down" data-name="Icon / Regular / Navigation / Open_down" d="M13.958,0,14.7.731,7.35,8.191,0,.731.742,0,7.35,6.707Z" transform="translate(2.65 6.738)"/>
                     </svg>
                     `: ''}
                     </p>
                   
                     <ul class="nv00-gnb__featured-products-thumbnail-item-wrap ${gridClass} ${isTypeEMenu ? 'nv00-gnb__featured-products-thumbnail-item-menu-d' : ''}" role="menu">
                      ${featureItems}
                     </ul>
                  </div>
               </div>`;
  
        return featureThumbnails;
      } else {
      item.forEach((ftData, idx) => {
        let analyticsAttributes = '';
        if(headerTitle && headerTitle.length && headerTitle === "Discover Shop") {
             analyticsAttributes = `
              data-link_cat="navigation" 
              data-link_id="${headerTitle.toLowerCase()}>${ftData.description.toLowerCase()}"
              data-event_name="select_${headerTitle.toLowerCase()}>${ftData.description.toLowerCase()}_click"
              data-link_position="navigation>gnb"
             `;
        } else {
             analyticsAttributes = `
              data-link_cat="navigation" 
              data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.description}"
              data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.description}_click"
              data-link_position="navigation>gnb"
             `;
        }

        featureLinks += `<a class="nv00-gnb__l1-featured-link" href="${ftData.linkUrl}" role="menuitem"
                           target="${ftData.linkType === 'new' ? '_blank' : ''}"
                           aria-label="${ftData.description} ${ftData.linkType === 'new' ? openNewWin : ''}"
                           ${analyticsAttributes}>
                            ${ftData.description}
                        </a>`;
      });

      return `<div class="nv00-gnb__l1-featured-list nv00-gnb__l1-featured-list--text" role="menu" aria-label="${lv0model.englishName || lv0model.displayName} banner">
                <p class="nv00-gnb__l1-featured-title">${headerTitle || 'Discover'}</p>
                <div class="nv00-gnb__l1-featured">
                  ${featureLinks}
                </div>
              </div>`;
      }
    }

    return '';
  }

  function getMobileFeaturedSection(items, lv0model, headerTitle, l0Index) {
      if (!items || items.length === 0) return '';
      
      const openNewWin = 'Open in a new window';
      let slides = '';

      items.forEach((ftData, idx) => {
          // Analytics Tagging
          const analyticsAttributes = `
            data-link_cat="navigation" 
            data-link_id="L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.displayName}"
            data-event_name="Select_L0_${l0Index+1 <= 9 ? `0${l0Index+1}` : `${l0Index+1}`}_${lv0model.englishName}>banner_${idx+1 <= 9 ? `0${idx+1}` : `${idx+1}`}_${ftData.displayName}_click"
            data-link_position="navigation>gnb"
          `;

          const badgeHtml = ftData.badgeEnabled === "true" ? 
              `<span class="badge-icon badge-icon--label 
                  ${ftData.badgeType == 'new' ? ' badge-icon--bg-color-blue' : ''} 
                  ${ftData.badgeType == 'hot' ? ' badge-icon--bg-color-red' : ''} 
                  ${ftData.badgeType == 'eco' ? ' badge-icon--bg-color-green' : ''}">
                  ${ftData.badgeText}
              </span>` : '';

          slides += `
          <div class="nv00-gnb__featured-item swiper-slide">
              ${badgeHtml}
              <a class="nv00-gnb__featured-item-thumb" 
                 href="${ftData.linkUrl}" 
                 target="${ftData.linkType === 'new' ? '_blank' : ''}"
                 aria-label="${ftData.displayName} ${ftData.linkType === 'new' ? openNewWin : ''}"
                 ${analyticsAttributes}>
                  <div class="image">
                      <img class="image__main" src="${ftData.imageUrl}" alt="${ftData.imageAlt}" role="img">
                  </div>
              </a>
              <a class="nv00-gnb__featured-item-name" 
                 href="${ftData.linkUrl}" 
                 target="${ftData.linkType === 'new' ? '_blank' : ''}"
                 aria-label="${ftData.displayName} ${ftData.linkType === 'new' ? openNewWin : ''}"
                 ${analyticsAttributes}>
                  ${ftData.displayName}
              </a>
          </div>`;
      });

      return `
      <div class="nv00-gnb__featured-wrap nv00-gnb--mobile-only">
          <p class="nv00-gnb__featured-title">${headerTitle || 'FEATURED'}</p>
          <div class="nv00-gnb__featured-list swiper-container basic-swiper" 
               data-swiper-option='{ "slidesPerView": "auto", "keepWrapper": true, "pagination":true, "offTxtAccesibility": true, "componentEl": ".nv00-gnb" }'>
              <div class="nv00-gnb__featured-list-inner swiper-wrapper" role="list">
                  ${slides}
              </div>
              <div class="screen-indicator-wrap">
                  <button class="screen-indicator screen-indicator--prev">
                      <div class="screen-indicator--icon"><span class="hidden">Previous</span><svg class="icon"><use xlink:href="#previous-regular" href="#previous-regular"></use></svg></div>
                  </button>
                  <button class="screen-indicator screen-indicator--next">
                      <div class="screen-indicator--icon"><span class="hidden">Next</span><svg class="icon"><use xlink:href="#next-regular" href="#next-regular"></use></svg></div>
                  </button>
              </div>
          </div>
      </div>`;
  }

  function initMobileBannerSwiper() {
    // Prevent duplicate initialization
    if (this.mobileBannerSwiper) return;

    // Target the new container class we added in the HTML
    const swiperEl = document.querySelector('.nv00-gnb__featured-list.swiper-container');

    if (swiperEl && typeof Swiper !== 'undefined') {
      this.mobileBannerSwiper = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        pagination:true,
        offTextAccesibility:true,
        centeredSlides: false,
        navigation: {
          prevEl: swiperEl.querySelector('.screen-indicator--prev'),
          nextEl: swiperEl.querySelector('.screen-indicator--next'),
          disabledClass: 'disabled',
        },
      });
    }
  }

  function checkTimePeriod(timePeriod) {
    let isShowBadge = false;
    if (timePeriod) {
      const timeArray = timePeriod.split("|");
      if (timeArray.length > 1 && timeArray[0] && timeArray[1]) {
        const startDate = new Date(
          timeArray[0].slice(0, 4),
          parseInt(timeArray[0].slice(4, 6), 10) - 1,
          timeArray[0].slice(6, 8),
          timeArray[0].slice(8, 10),
          timeArray[0].slice(10, 12)
        );

        const endDate = new Date(
          timeArray[1].slice(0, 4),
          parseInt(timeArray[1].slice(4, 6), 10) - 1,
          timeArray[1].slice(6, 8),
          timeArray[1].slice(8, 10),
          timeArray[1].slice(10, 12)
        );

        // Get today's date in 'America/New_York' timezone
        const now = new Date();
        const today = new Date(
          now.toLocaleString("en-US", { timeZone: "America/New_York" })
        );
        if (today >= startDate && today <= endDate) {
          isShowBadge = true;
        } else {
          isShowBadge = false;
        }
      }
    }
    return isShowBadge;
  }

  function isJsonString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  // Live Commerce Badge 노출
  function handleLiveStreaming() {
    document.querySelectorAll('[data-live-streaming-time]').forEach((el) => {
      let isLive = false;
      if (isJsonString(el.dataset.liveStreamingTime)) {
        JSON.parse(el.dataset.liveStreamingTime).some((dates) => {
          const timeStatus = checkTimePeriod(dates);
          if (timeStatus) {
            isLive = true;
          } else {
            isLive = false;
          }
        });
      } else {
        const timeStatus = checkTimePeriod(el.dataset.liveStreamingTime);
        if (timeStatus) {
          isLive = true;
        } else {
          isLive = false;
        }
      }

      if (isLive) {
        $(el).css("display", "inline-block");
      } else {
        $(el).css("display", "none");
      }
    });
  }

  function renderGNBfromJSON() {
    let self = {};
    self.selector = '.nv00-gnb';
    self.$gnb = $(self.selector);
    self.$l0Wrap = self.$gnb.find('.nv00-gnb__l0-menu-wrap');
    self.$beforeLoginMenuWrapper = self.$gnb.find('.nv00-gnb__utility.before-login');
    self.$beforeLoginMenu = self.$beforeLoginMenuWrapper.find('.nv00-gnb__utility-user-menu-list');
    self.$afterLoginMenuWrapper = self.$gnb.find('.nv00-gnb__utility.after-login');
    self.$afterLoginMenu = self.$afterLoginMenuWrapper.find('.nv00-gnb__utility-user-menu-list');
    self.$mobilewhySamsungMenuWrapper = self.$gnb.find('.nv00-gnb__why-samsung-account');
    self.$l0Featured = self.$l0Wrap.find('.mobile-gnb-featured-list')
    self.$l0Left = self.$l0Wrap.find('.left-menu');
    self.$l0Right = self.$l0Wrap.find('.right-menu');
    let jsonUrl = (window.location.host.indexOf('www') > -1 || window.location.host.indexOf("origincl") > -1) ? '/aemapi/v6/siteia2025/data.b2c.us.json' : 'https://stgcl.us.samsung.com/aemapi/v6/siteia2025/data.b2c.us.json';    
    
    $.ajax({
      url: jsonUrl,
      dataType: 'json'
    }).then(function (json) {
      let leftList = [];
      let rightList = [];

      if (json && json.resultData && json.resultData.iaModel) {
        json.resultData.iaModel.leftModels.length > 0 && json.resultData.iaModel.leftModels.forEach(function (lv0model) {
          if (lv0model.displayFlag === 'Y') {
            leftList.push(lv0model);
          }
        });

        json.resultData.iaModel.rightModels.length > 0 && json.resultData.iaModel.rightModels.forEach(function (lv0model) {
          if (lv0model.displayFlag === 'Y') {
            rightList.push(lv0model);
          }
        })

        self.$l0Left.empty();
        let mobileBannerMenu = "";
        leftList.forEach(function (lv0model,l0Index) {
          if (lv0model.mobileBannerUseFlag === true || lv0model.mobileBannerUseFlag === "true") {
            mobileBannerMenu = lv0model;
          }
          // if (lv0model.englishName === 'shop' && lv0model.level1MenuList && lv0model.level1MenuList.length > 0) {
          //   // Call the helper function we created in the previous step
          //   const mobileFeaturedSection = getMobileFeaturedSection(lv0model.level1MenuList, lv0model, 'FEATURED', l0Index);
          //   self.$l0Featured.empty();
          //   self.$l0Featured.append(mobileFeaturedSection);
          //   initMobileBannerSwiper();
          // }
          self.$l0Left.append(Lv0MenuItem(lv0model, false, l0Index))
        });
        if (false) {
          let featureThumbnails = featureBenefitsCards({ item: mobileBannerMenu.banners }, mobileBannerMenu, 'Discover Shop', true);
          self.$l0Left.append(`<div class="nv00-gnb__mobile-banner-l1-menu-banners">${featureThumbnails}</div>`);
        }


        self.$l0Right.empty();
        rightList.forEach(function (lv0model) {
          self.$l0Right.append(Lv0MenuItem(lv0model, true))
        });

        self.$beforeLoginMenu.empty();
        self.$beforeLoginMenu.append(addSignInMenu(self.$beforeLoginMenu.attr('data-login-linkinfo')));
        if (json.resultData.iaModel.whySamsungAccountLink && Object.keys(json.resultData.iaModel.whySamsungAccountLink).length > 0 && json.resultData.iaModel.whySamsungAccountLink.displayFlag == 'Y') {
          self.$beforeLoginMenu.append(addWhySamsungAccountMenu(json.resultData.iaModel.whySamsungAccountLink));
        }
        json.resultData.iaModel.beforeLoginModel && json.resultData.iaModel.beforeLoginModel.level1MenuList.length > 0 && json.resultData.iaModel.beforeLoginModel.level1MenuList.forEach(function (item) {
          if (item.displayFlag == 'Y') {
            self.$beforeLoginMenu.append(userMenuListItem(item));
          }
        })

        self.$afterLoginMenu.find("li:not(:first)").remove()
        // self.$afterLoginMenu.append(addUserProfileMenu());
        if (json.resultData.iaModel.whySamsungAccountLink && Object.keys(json.resultData.iaModel.whySamsungAccountLink).length > 0 && json.resultData.iaModel.whySamsungAccountLink.displayFlag == 'Y') {
          self.$afterLoginMenu.append(addWhySamsungAccountMenu(json.resultData.iaModel.whySamsungAccountLink));
        }
        json.resultData.iaModel.afterLoginModel && json.resultData.iaModel.afterLoginModel.level1MenuList.length > 0 && json.resultData.iaModel.afterLoginModel.level1MenuList.forEach(function (item) {
          if (item.displayFlag == 'Y') {
            self.$afterLoginMenu.append(userMenuListItem(item));
          }
        })
        self.$afterLoginMenu.append(addLogoutMenu(self.$afterLoginMenu.attr('data-use-sign-btn')));

        self.$mobilewhySamsungMenuWrapper.empty();
        if (json.resultData.iaModel.whySamsungAccountLink && Object.keys(json.resultData.iaModel.whySamsungAccountLink).length > 0 && json.resultData.iaModel.whySamsungAccountLink.displayFlag == 'Y') {
          self.$mobilewhySamsungMenuWrapper.append(addWhySamsungAccountMenuForMobileMenu(json.resultData.iaModel.whySamsungAccountLink));
        }
        handleLiveStreaming();
        $q.ready(() => nv00Gnb.initAll());

        if (!$('.gnb').hasClass('isHybrid')) {
          $('.gnb').addClass('isHybrid');
        }
      }
    });
  }

  window.onload = function () {
    var container = document.getElementById('inner_wrap_hamburger_menu');
    var menuWrap = document.querySelector('.nv00-gnb__l0-menu-wrap');
    var utilityWrap = document.querySelector('.nv00-gnb__utility-wrap');
    var searchWrap = document.querySelector('.nv00-gnb__search-wrap');
    var accountWrap = document.querySelector('.nv00-gnb__user-account-wrap');
    var backdropWrap = document.querySelector('.nv00-gnb__dim-wrap');
    document.onclick = function (e) {
      //Removing this code to match live site exp. to new design
      // if (!!container) {
      //   if (!container.contains(e.target)) {
      //         menuWrap.classList.remove('show');
      //         container.classList.remove('show');
      //         utilityWrap.classList.remove('show'); 
      //         searchWrap.classList.remove('show'); 
      //         accountWrap.classList.remove('show'); 
      //         backdropWrap.classList.remove('show'); 
      //         container.removeAttribute('style');
      //         utilityWrap.style.opacity = '1';
      //         $('.nv00-gnb__l0-menu-wrap').css('display','none');
      //   }
      // }  
    };
  };

  // Handles hiding the search overlay when focusing on the "For Business" Tab
  $(document).on('focus', '.nv00-gnb__l0-menu-list .nv00-gnb__l0-menu-link:first', function () {
    const container = $(".nv00-gnb__l1-menu-container");
    container.removeClass("show");
    container.removeAttr("style");

  });

 (function handleL0NavigationWhenClicked () {
    $(document).on('click', '.nv00-gnb__l0-menu-btn', function (e) {
      const isSupport = e.target.textContent.trim().toLowerCase().includes("support")

      if(isMobileDevice() || isSupport){
        e.preventDefault(); // stop L0 anchor tags to redirect on mobile
        return;
      }      
    });
  })()

  // Handles L0 Focus
  $(document).on("keydown", ".nv00-gnb__l0-icon-wrapper", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        isKeyboardOpening = true; 
  
        const $iconWrapper = $(this);
        const $menu = $iconWrapper.closest(".nv00-gnb__l0-menu");
        const $menuContainer = $menu.find(".nv00-gnb__l1-menu-container");
  
        const isOpen = $menuContainer.data("open") === true;
        const newOpenState = !isOpen;
        $menuContainer.data("open", newOpenState);
  
        // Toggle rotation
        $iconWrapper.toggleClass("rotated", !isOpen);
  
        // Toggle L1 menu
        if (!isOpen) {
          // Open it
          $menu.find(".nv00-gnb__l0-menu-btn").attr("aria-expanded", "true");
          $menuContainer.addClass("show").css({
            display: "flex",
            visibility: "visible",
            height: "auto",
          });
          $(".nv00-gnb__dim-wrap").addClass("show");
        } else {
          // Close it
          $menu.find(".nv00-gnb__l0-menu-btn").attr("aria-expanded", "false");
          $menuContainer.removeClass("show").css({
            display: "none",
            visibility: "hidden",
            height: "0",
          });
          $(".nv00-gnb__dim-wrap").removeClass("show");
        }
  
        // Re-focus to remain on the icon
        setTimeout(() => $iconWrapper.focus(), 0);
      }
    });  

    // resetting the L0 focus for below 2 cases
    $(document).on('mouseenter', '.nv00-gnb__up-wrap, .nv00-gnb__l0-menu-btn', () => {
      isKeyboardOpening = false;
    });

    $(document).on("mouseleave", ".nv00-gnb__l1-menu-container",  () => {
     setTimeout(() => {
      isKeyboardOpening = false;
     }, 100);
    });

    // Handling focus on profile icon and opening of options menu
    $(document).on('keydown', '.nv00-gnb__utility-wrap .nv00-gnb__utility.before-login .nv00-gnb__utility-btn', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        
        const $utilityBtn = $(this);
        const $userMenu = $('.nv00-gnb__utility-user-menu-list');
        const isExpanded = $utilityBtn.attr('aria-expanded') === 'true';
        
        $utilityBtn.attr('aria-expanded', !isExpanded);
        $userMenu.css('display', isExpanded ? 'none' : 'block');
      }
    });

  // Handle rotation of the L0 icon when L1 menu opened / closed through L0 mouse-enter OR L0 mouse-leave
  $(document).on("mouseenter", ".nv00-gnb__down-wrap .nv00-gnb__l0-menu-wrap .nv00-gnb__l0-menu", function () {
    $(this).find(".nv00-gnb__l0-icon-wrapper").addClass("rotated");
  });

  $(document).on("mouseleave", ".nv00-gnb__down-wrap .nv00-gnb__l0-menu-wrap .nv00-gnb__l0-menu", function () {
    $(this).find(".nv00-gnb__l0-icon-wrapper").removeClass("rotated");
  });

  // Handling L1 tagging for TV by Size & TV by resolution button expand & collapse
  $(document).on('click', 'button.nv00-gnb__l1-menu-btn.nv00-gnb__l1-menu-btn-mode-button', function() {
    var $button = $(this); // The clicked button L1
    
    setTimeout(function() {
      const isExpanded = $button.attr('aria-expanded') === 'true';
      if (window.utag && utag.link) {
            utag.link({
              link_cat: $button.attr('data-evar_104'),
              link_id: `${isExpanded ? `expand_${$button.attr('data-evar_105')}` : `collapse_${$button.attr('data-evar_105')}`}`,
              event_name: $button.attr('data-evar_106'),
              link_position: $button.attr('data-evar_11'),
          });
      }
    }, 300);
  });
  

  renderGNBfromJSON()
});
var ss = $;
var reservationUserData = null;
// Store Login callback function
function nextGenLoginResult(data){
}

(function ($) {

	ss.Sign = function () {
		var searchParams = new URLSearchParams(window.location.search);
		var browser = navigator.userAgent;
		var _domain = window.location.hostname.indexOf('stgcl.us') > -1 ?  searchParams.get('qa') === 'live' ? 'https://www.samsung.com/us/api' : 'https://us.ecom-qa.samsung.com': 'https://www.samsung.com/us/api';
		var _newsadomain =  window.location.hostname.indexOf('stgcl.us') > -1 ?  searchParams.get('qa') === 'live' ? 'https://account.samsung.com/accounts/v1/samsung_com_us' : 'https://stg-account.samsung.com/accounts/v1/samsung_com_us' : 'https://account.samsung.com/accounts/v1/samsung_com_us';
		
		// in 국가 MyGalaxy App 접근 판단
		var inMyGalaxyAppflag = "N";
		if (SITE_CD === "in"){
			if ( browser.indexOf("MyGalaxy") > -1 || browser.indexOf("SamsungShopSDK") > -1 ){
				inMyGalaxyAppflag = "Y";
			}
		}
		
		Granite.I18n.setLocale($('#language').val());
		
		var runmodeInfo = $('#runmodeInfo').val();
		
		var policyCheckSite = SITE_CD === "es" ? true : false;
		var receiveEmailChecked = false;

		var userData = null;
		var estoreLive = true;

		var returnURL = "";
		var loginLinkURL = $("#loginLinkURL").val();
		var logoutURL = $("#logoutURL").val();
		
		var $cartCountEl = $('.gnb-cart-count');
		var $userNameEl = $('.nv00-gnb__inner-wrap').find('.js-user-name');

		var $beforeLoginContext = $('.before-login');
		
		var scene7domain = $('#scene7domain').val();

		var guid = $.cookies.get("guid",{domain:".samsung.com"});
		var flpe = $.cookies.get("flpe", {domain : ".samsung.com"});
		var jsonflpe = {};
		if(flpe && guid) {
			// CryptoJS 암호화 하는 부분
			const keyone = "cedc6238tqcf1t4f0vl7g50mc70d6a5a";
			var parsekeyone = CryptoJS.enc.Utf8.parse(keyone); // 키는 utf8로 파싱 1회 수행
			
			// 1차 키와 guid를 암호화하여 2차 키를 생성한다 
			var enkeyone = CryptoJS.AES.encrypt(guid, parsekeyone,{
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			
			// CryptoJS 복호화 하는 부분
			const keytwo = (enkeyone+keyone).substring(0, 32); // 2차 키 길이를 AES256에 사용되는 32Byte로 조절하기 위하여 추가로 덧붙여서 자름 
			var parsekeytwo = CryptoJS.enc.Utf8.parse(keytwo); // 키는 utf8로 파싱 1회 수행

			// 쿠키에 암호화하여 전달된 값을 2차 키로 복호화한다.
			var dekeytwo = CryptoJS.AES.decrypt(flpe, parsekeytwo,{
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			var deflpe = CryptoJS.enc.Utf8.stringify(dekeytwo);
			
			// 복호화된 개인정보를 url 디코딩하고서 json포멧으로 저장 
			jsonflpe = JSON.parse(decodeURIComponent(deflpe));
		}
		
		var firstName = jsonflpe.firstName ? jsonflpe.firstName : $.cookies.get("firstName");
		var lastName = jsonflpe.lastName ? jsonflpe.lastName : $.cookies.get("lastName");
		var profilePicture = jsonflpe.picturePath ? jsonflpe.picturePath : $.cookies.get("mVal11", {domain : ".samsung.com"});
		if(profilePicture != null && profilePicture != ''){
			profilePicture = decodeURI(profilePicture.toString());
		}
		
		/* + 비스토어 로그인 */
		var isLoginWithNoStore = $("#isLoginWithNoStore").val(); 
		isLoginWithNoStore = (isLoginWithNoStore === "Y") ? true : false;

		/* 20180528 신규 샵 통합 국가 common property :: S */
		var myAccountUrl = $("#gnbMyAccountUrl").val();
		var isNewHybris = $("#shopIntegrationFlag").val() === "Hybris-new" ? true : false;		//new-hybris
		var gnbUsApiUse = $('#shopIntegrationFlag').val() === "GPv2" ? true : false;
		var newShopCountryYN = (gnbUsApiUse || isNewHybris|| $("#shopIntegrationFlag").val() === "Hybris-intg")?"Y":"";
		var countryIsoCode = $("#countryIsoCode").val();
		var storeWebDomain = $("#storeWebDomain").val();										//new-hybris
		/* 20180528 신규 샵 통합 국가 common property :: E */
		
		// VTEX 국가 ar/cl/co/mx/pe 국가 스토어 SSO 연계 제거 -- 2021.06.24
		var isVtexStore = false; // TEST pre-qa
		if (SITE_CD === "ar" || SITE_CD === "co" || SITE_CD === "py" || SITE_CD === "mx" || SITE_CD === "uy") {
			// 스토어 호출하지 않고 로그인 완료처리하기 위함
			isVtexStore = true;
		}
		if (SITE_CD === "es") {
			// 스페인은 TEST pre-qa에서 예외처리
			isVtexStore = false;
		}

		// 20231208 Update the cart count element
		function updateCartCounter(cartCountValue) {
			if(cartCountValue != null && cartCountValue !== ""){
				//const prdCountText = $("#productCountText").val();
				//const $prdCountSpan = $("<span>").addClass("hidden").text(prdCountText);

				$cartCountEl.attr("role","alert");
        		$cartCountEl.attr("aria-label", "Number of products in the cart is " + cartCountValue);
				$cartCountEl.empty().text(cartCountValue);
				//$cartCountEl.prepend($prdCountSpan);

				if(cartCountValue === 0){
					$cartCountEl.hide();
				}else {
					$cartCountEl.show();
				}
			}
		}

		/* 20180808 US Cart Count :: S */
		if(gnbUsApiUse){
			var usCartCount = $.cookies.get("s_ecom_sc_cnt", {domain : ".samsung.com"});
			updateCartCounter(usCartCount);
		}
		/* 20180808 US Cart Count :: E */

		/* 20190219 US GPv2 api 호출 시  헤더 추가 관련 변수 : S*/
		var multiLanguageYN = $("#multiLanguageYn").val(),
		hreflang = $("#localLang").val();
		if(hreflang != null){
			hreflang = hreflang.toLowerCase();
		}
		/* 20190219 US GPv2 api 호출 시  헤더 추가 관련 변수 : E*/
		

		/* us 국가 로그인 후 dsprocess 호출 용 도메인 : S */
		var serverType = $("#serverType").val();
		var usSSOApiDomain = "https://sso-stg.us.samsung.com/sso";
		if(serverType === "prod"){
			usSSOApiDomain = "https://sso-us.samsung.com/sso";
		}
		/* us 국가 로그인 후 dsprocess 호출 용 도메인 : E */
		
		// 2018.11.30 us shop 정책동의 spec 변경
		var consentsId = new Array();
		
		var userLoginBtn = ".loginBtn";
		var userLogoutBtn = ".logoutBtn";
		
		var hybrisApiJson = $("#hybrisApiJson").val(); //common에 설정이 되어 있는 경우(Y)는 json타입 아닌 경우는 기존 처럼 jsonp

		var $showLayer = null;
		var $loginLayerPopup = null;

		var $joinForm = null;
		var $findAccountForm = null;
		var $signInForm = null;
		var $signOutForm = null;
		
		var $signInBtn = null;
		var $signUpBtn = null;
		var $findAccountBtn = null;
		var $signToggleArrow = null;
		var $loginLeaveBtn = null;
		
		var $privacyCheck1 = null;
		var $privacyCheck2 = null;
		var $errorPrivacy = null;

		var $idInput = null;
		var $pwInput = null;
		var $rememberCheck = null;
		var $rememberCheckLabel = null;
		var $errorIdText = null;
		var $errorPwText = null;

		var $loginCloseBtn = null;

		/* 팝업 */
		var $privacyPopup = null;
		var $preferencePopup = null;
		var $confirmPopup = null;

		var $privacyBtn = null;
		var $preferenceCheckBtn = null;
		var $privacyCloseBtn = null;
		
		var $loginValidateYnForGPv2 = $('#loginValidateYnForGPv2'); 

		// 로그인 창을 띄운 개체(팝업 닫기 시 포커스를 주기 위함)
		var closeReturnFocusElem = null;

		var updateProfileUrl = $("#updateProfileURL").val();
		// 공통 제공을 위한 object
		ss.Auth = {};

		//date format setting
		Date.prototype.format = function(f) {
			if (!this.valueOf()){
				return " ";
			}
			var d = this;

			return f.replace(/(yyyy|MM|dd|HH|mm|ss)/gi, function($1) {
				switch ($1) {
					case "yyyy": return d.getFullYear();
					case "MM": return (d.getMonth() + 1).zf(2);
					case "dd": return d.getDate().zf(2);
					case "HH": return d.getHours().zf(2);
					case "mm": return d.getMinutes().zf(2);
					case "ss": return d.getSeconds().zf(2);
					default: return $1;
				}
			});
		};

		String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
		String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
		Number.prototype.zf = function(len){return this.toString().zf(len);};
		String.prototype.escapeHtml = function(){ 
			return this.replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/>/g, "&gt;").replace(/\'/g, "&#039;"); 
		}; 
		// String 파라미터를 오브젝트로 변환
		// SNS 로그인 시 스토어에서 보내주는 파라미터를 읽기 위함
		function getQueryParams(qs) {
			qs = qs.split("+").join(" ");

			var params = {}, tokens,
				re = /[?&]?([^=]+)=([^&]*)/g;

			while (tokens = re.exec(qs)) {
				params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}

			return params;
		}

		// 스토어 로그인 요청 쿠키 삭제
		function deleteLoginRequestCookie() {
			$.cookies.del("estoreLoginRequesting");
			$.cookies.del("estoreLoginRequesting", {domain:".samsung.com"});

		}

		function deleteUSCookie() {
			if (window.location.hostname.indexOf('www.samsung.com') > -1 || window.location.host.indexOf("origincl.us.samsung.com") > -1) {
			$.cookies.del("prof_id", {path:'/', domain:'.samsung.com'});
			$.cookies.del("remoteId", {path:'/', domain:'.samsung.com'});
			$.cookies.del("prof_bpno", {path:'/', domain:'.samsung.com'});
			$.cookies.del("prof_bpno_s", {path:'/', domain:'.samsung.com'});
			}
			$.cookies.del("prof_lname", {path:'/', domain:'.samsung.com'});
			$.cookies.del("rew_enr", {path:'/', domain:'.samsung.com'});
			$.cookies.del("prof_fname", {path:'/', domain:'.samsung.com'});
			$.cookies.del("tppid", {path:'/', domain:'.samsung.com'});
			$.cookies.del("tmktid", {path:'/', domain:'.samsung.com'});
			$.cookies.del("tmktname", {path:'/', domain:'.samsung.com'});
			$.cookies.del("tlgimg", {path:'/', domain:'.samsung.com'});
			$.cookies.del("taccessrtype", {path:'/', domain:'.samsung.com'});
			$.cookies.del("tsgmt", {path:'/', domain:'.samsung.com'});
			$.cookies.del("epp_verified", {path:'/', domain:'.samsung.com'});
			$.cookies.del("store_id", {path:'/', domain:'.samsung.com'});
		}
		
		// 2014.02.21 로그아웃 시 쿠키만 삭제
		function deleteSignCookie() {
			$.cookies.del("snsSessionId");
			$.cookies.del("snsSessionId", {path:'/', domain:'.samsung.com'});
			$.cookies.del("isStoreLogedIn");
			$.cookies.del("sa_em");
			$.cookies.del("sa_em", {path:'/', domain:'.samsung.com'});
			$.cookies.del("eVar67");
			$.cookies.del("eVar67", {path:'/', domain:'.samsung.com'});
			$.cookies.del("lastName",{domain:".samsung.com"});
			$.cookies.del("firstName",{domain:".samsung.com"});
			$.cookies.del("guid",{domain:".samsung.com"});
			$.cookies.del("ReD",{domain:".samsung.com"});
			$.cookies.del("directCallFl",{expires: null, domain : ".samsung.com"});
			$.cookies.del("directCallFlv2",{expires: null, domain : ".samsung.com"});
			$.cookies.del("returnURL",{domain:".samsung.com"});
			$.cookies.del("mVal10",{domain:".samsung.com"});
			$.cookies.del("mVal11",{domain:".samsung.com"});
			$.cookies.del("flpe",{domain:".samsung.com"});

			// 2021.04.12 B2B 로그인 추가
			if(IS_B2B){
				const issmbcookiePath = '/'+SITE_CD +'/';
				$.cookies.del("emailId",{domain:".samsung.com"});
				$.cookies.del("emailAddr",{domain:".samsung.com"});
				$.cookies.del("phone",{domain:".samsung.com"});
				$.cookies.del("userAccount",{domain:".samsung.com"});
				$.cookies.del("dotcomReturnURL",{domain:".samsung.com"});
				$.cookies.del("isSMBRegisteredUserYN",{path:issmbcookiePath,domain:".samsung.com"});
			}

			deleteLoginRequestCookie();
			deleteUSCookie();
            // 초기화
            login_user_info = {};
		}

		/* AU store 6.0 : dotcom taken SA logout */
		function deleteSACookie() {
			if (window.location.hostname.indexOf('www.samsung.com') > -1 || window.location.host.indexOf("origincl.us.samsung.com") > -1) {
			$.cookies.del("xsdcxyn");
			$.cookies.del("xsdcxyn", {path:'/', domain:'.samsung.com'});
			}
			$.cookies.del("xsdcbxyn");
			$.cookies.del("xsdcbxyn", {path:'/', domain:'.samsung.com'});
			$.cookies.del("iPlanetDirectoryPro");
			$.cookies.del("iPlanetDirectoryPro", {path:'/', domain:'.samsung.com'});
			$.cookies.del("iPlanetDirectoryProOptVal");
			$.cookies.del("iPlanetDirectoryProOptVal", {path:'/', domain:'.samsung.com'});
		}

		function updateUsEppGNB(details) {
			var offerMap = {
				'education': '/us/shop/offer-program/education/',
				'first responder': '/us/shop/offer-program/first-responders/',
				'government': '/us/shop/offer-program/government/',
				'workplace': '/us/shop/offer-program/workplace/',
				'military': '/us/shop/offer-program/military/',
			};
			var eppLogo = $.cookies.get('tlgimg');
			var eppName = $.cookies.get('tmktname');
			var eppId = $.cookies.get('tmktid');
			var eppSegment = $.cookies.get('tsgmt');
			var eppRemoteId = $.cookies.get('xsdcxyn');
			var eppLogin;

			if (details) {
				var store = details.store_info;

				if (store) {
					if (store.image_logo_url) {
						eppLogo = store.image_logo_url;
					}
					if (store.store_disp_name) {
						eppName = store.store_disp_name;
					}
					if (store.store_id) {
						eppId = store.store_id;
					}
					if (store.store_segment) {
						eppSegment = store.store_segment;
					}
				}

				if (details.login_type === 'sa_login') {
					eppLogin = true;
					window.isSaLogin = true;
				} else {
					eppLogin = false;
					window.isSaLogin = false;
				}
			}
			var offerUrl = (eppSegment && offerMap[eppSegment.toLowerCase()]) || '/us/shop/offer-program/';

			if (window.EcommFlutterClient) {
				window.EcommFlutterClient.onmessage = ({ data }) => {
					const { name, data: { status } } = JSON.parse(data);
					if (name === "isSignedInStatus") {
						window.isShopSignedIn = status;
					}
				};

				window.EcommFlutterClient.postMessage(
					JSON.stringify({
						name: "isSignedIn",
						params: { callbackEvent: "isSignedInStatus" }
					})
				);
			}

			var gnb = $('.epp-bar-wrap');
			gnb.show();

			gnb.addClass('gnb-edited');
			var msg = gnb.find('.epp-bar-msg');
			msg.empty();
			var benfit = gnb.find('.benfit-wrap');
			benfit.empty();
			var logo = gnb.find('.epp-bar-logo');
			logo.empty();
			if (eppLogo) {
				logo.append('<img src=' + eppLogo + ' />');
			}

			if (eppName) {
				if (eppRemoteId) {
					if (eppLogin || window.isShopSignedIn) {
						msg.append('Welcome to the <div class="epp-bar-username">' + eppName + ' Store!</div> Please enjoy our special offers for you.');
					} else {
						msg.append('Welcome to the <div class="epp-bar-username">' + eppName + ' Store!</div> Please <a href="#" class="epp-login">login</a> to access your special pricing.');
					}
				} else if (eppRemoteId && eppId === "4145500" && $.cookies.get("tppid") === "17593200") {
					$(".epp-bar-logo img").remove();
					$(".epp-bar-logo").append('<img src="' + eppLogo + '"/>');
					$(".epp-bar-msg").html("Welcome to Samsung's Friends and Family Store! Enjoy special pricing. Please <a href='#' id='openLogin' style='font-size:12px;font-weight: bold'>login/signup</a> to make a purchase.");
					$(".epp-bar-wrap").slideDown();
				} else if (window.AEMapp?.eppStore?.isTMOGuestUser() || eppId == "900297" || eppId == "4789760653") {
					$(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">' + eppName + ' Store' + '.</div>');
					$(".epp-bar-wrap").slideDown();
				} else {
					$(".epp-bar-logo img").remove();
					$(".epp-bar-logo").append('<img src="' + eppLogo + '"/>');
					$(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username" style="color:#1428a0;">' + eppName + ' Store' + "!</div> Please <a href='#' id='openLogin' style='color:#1428a0;font-weight: bold'>login</a> to enjoy our special pricing.");
					$("#openLogin").click(function (e) { e.preventDefault(); $('.gnb-login').trigger('click') });
					$(".epp-bar-wrap").slideDown();
				}


				if (!window.AEMapp?.eppStore?.isTMOGuestUser()) {
					benfit.append('<a class="benfit-wrap__offers" href="' + offerUrl + '">SPECIAL OFFERS</a>');
					if (!eppLogin) {
						benfit.append('<span class="benfit-wrap__gap"></span><a class="benfit-wrap__exit">EXIT STORE</a>');
					}
				} else {
					benfit.hide();
				}
				gnb.find('.epp-login').click((e) => {
					e.preventDefault();
					$('.nv00-gnb__utility-user-menu-link.loginBtn').trigger('click');
				});
				benfit.find('.benfit-wrap__exit').click(() => {
					window.AEMapp.eppStore.exitStore()
					$(document).trigger('exit__store');
				});
			} else {
				gnb.hide();
			}
		}

		// 로그아웃 요청
		function signOut() {
			deleteSignCookie();
			deleteSACookie();

			userData = null;

			// AU Hybris 6.0  // DE Hybris 6.0  // FR Hybris 6.0
			if(USE_ESTORE || isLoginWithNoStore){ /* + 비스토어 로그인 */
				setMyMenu(false);
			}

			return false;
		}
		
		var imagePreset = function(presetStr, imgUrl){
	    	var preset = "?$"+presetStr;
	    	var tempImgUrl = imgUrl.toLowerCase();

	        if (tempImgUrl.indexOf(".jpg") > -1) {
	        	preset += "_JPG$";
	        } else if (tempImgUrl.indexOf(".jpeg") > -1) {
	        	preset += "_JPG$";
	        } else if (tempImgUrl.indexOf(".png") > -1) {
	        	preset += "_PNG$";
	        } else if (tempImgUrl.indexOf(".gif") > -1) {
	        	preset += "_GIF$";
	        } else {
	        	preset += "_PNG$";
	        }
	    	 
	        return preset;
	    	
	    };

		function setUserName(userNameTxt, isLogin, isOtpLogin) {

			var $userImageEl = $userNameEl.find('.image__main');
			var $userNameElP = $userNameEl.find('.user-name');
			
			var $useImageEl = $('.js-gnb-afterlogin-image');
			var $nonUseImageEl = $('.js-gnb-afterlogin-no-image');
			
//			profilePicture = "https://stg-account.samsung.com/membership/assets/images/layout/profile-icon-1.png";
			
			if(profilePicture!='' && profilePicture != null && isLogin){
				var profilePicturePreview = profilePicture + imagePreset("LazyLoad_Home",profilePicture);
				var profilePictureMain = profilePicture;
				//$useImageEl.find('.image__preview').attr("data-src", profilePicturePreview);
				//$useImageEl.find('.image__main').attr("data-src", profilePictureMain);
				$useImageEl.find('.image__main').attr("src", profilePictureMain);
				
				$useImageEl.show();
				$nonUseImageEl.remove();
				
			} else {
				$useImageEl.remove();
			}
			
			if(isOtpLogin){
				var profileLinkUrl = "https://account.samsung.com/membership/contents/profile/profile-gate";

				$userNameEl.attr("href", profileLinkUrl);
			}
			
			$userNameElP.html(userNameTxt);
			
			//window.sg.components.gnb.reInit(); new gnb
			window.sg.common.lazyLoad.setLazyLoadManually($useImageEl[0]);
		}

		// Hybris 6.0
		function setMyMenu(isLogedIn){
			if(firstName == null || lastName == null){
				setUserName("",false);
			}else{
				if(SITE_CD === "vn"){
					setUserName(lastName,false);
				}else{
					setUserName(firstName,false);
				}
			}
		}
		
		// to HEX func
		function toHex(str) {
			var result = '';
			for (var i=0; i<str.length; i++) {
			  result += str.charCodeAt(i).toString(16);
			}
			return result;
		}

		// Find Account
		function findAccount() {
			returnURL = window.location.href;

			$("#findReturnURL", $findAccountForm).val(returnURL);
			$("#findGoBackURL", $findAccountForm).val(returnURL);
			
			//20200319 :: _satellite 임시 주석처리 
//			_satellite.setVar('account','account:find sign in info');
//			_satellite.track('account');

			$findAccountForm.submit();

			return false;
		}

		// 회원 가입 -> 미사용
		function signUp() {
			returnURL = "http://" + window.location.host + "/" + SITE_CD + "/";

			// Omniture
			//20200319 :: _satellite 임시 주석처리 
//			_satellite.setVar('account','account:sign up');
//			_satellite.track('account');

			$("#joinReturnURL", $joinForm).val(returnURL);
			$("#joinGoBackURL", $joinForm).val(returnURL);

			var registCheckUrl = $("#joinRegistURL", $joinForm).val();
			var domainTemp = "";
			var winPort = window.location.port;
			// port가 없거나 80, 8080 일 경우에는 https://로 호출
			if(winPort == null || winPort === "" || winPort === "80" || winPort === "8080"){
				domainTemp = "https://" + window.location.host;
			}else{
				domainTemp = "http://" + window.location.host;
			}
			
			if(registCheckUrl.indexOf(window.location.hostname) < 0){
				var registFullUrl = domainTemp + registCheckUrl;
				$("#joinRegistURL", $joinForm).val(registFullUrl);
			}
			var emailCheckUrl = $("#joinEmailActivationURL", $joinForm).val();
			if(emailCheckUrl.indexOf(window.location.hostname) < 0){
				var emailFullUrl = window.location.protocol + "//" + window.location.host + emailCheckUrl;
				$("#joinEmailActivationURL", $joinForm).val(emailFullUrl);
			}

			$joinForm.submit();

			return false;
		}

		// input elements 초기화
		function inputInit(isFirstUrl) {
			$idInput.val("");
			$pwInput.val("");
			$rememberCheck.attr("checked", false);
			$rememberCheckLabel.removeClass();

			$errorIdText.hide();
			$errorPwText.hide();

			if (isFirstUrl) {

				// 최초 로딩시 snsiframe 삽입 dong_won.lee
				if ("snsIframe".indexOf($('div.connect_wrap >div.sns-wrap > iframe').attr('id')) == -1) {
					$('div.connect_wrap >div.sns-wrap').append('<iframe src="" id="snsIframe" width="100%" height="40" frameborder="0" scrolling="no"></iframe>');
				}
//				var goUrl = returnURL.indexOf("http://") < 0 ? "http://" + DOMAIN + returnURL : returnURL;
			}
		}

		// 쿠키에 ID 저장
		function setRememberId(value, expiredays) {
			var today = new Date();
			today.setDate(today.getDate() + expiredays);
			document.cookie = "_common_saveEmail=" + encodeURIComponent(value) + "; path=/; domain=.samsung.com; expires=" + today.toGMTString() + ";";
		}

		// 쿠키에 저장된 ID 가져오기
		function getRememberId() {
			// userid 쿠키에서 id 값을 가져온다.
			var cook = document.cookie + ";";
			var idx = cook.indexOf("_common_saveEmail", 0);
			var val = "";
			var begin, end;

			if (idx != -1) {
				cook = cook.substring(idx, cook.length);
				begin = cook.indexOf("=", 0) + 1;
				end = cook.indexOf(";", begin);
				val = decodeURIComponent(cook.substring(begin, end));
			}

			// 가져온 쿠키값이 있으면
			if (val !== "") {
				// id setting
				$idInput.next().css({ 'visibility' : 'hidden' });
				$idInput.val(val);
				// checkbox check
				$rememberCheck.attr('checked', 'checked');
				$rememberCheck.prop('checked', true);
				$rememberCheck.next().addClass($rememberCheck.next().attr("data-acc-onclass"));
			}
		}
		
		// 로그인 태깅용 함수 호출 - directCallFlv2 == N인 경우만
		function callGAdirect() {
			if($.cookies.get("directCallFlv2") === "N"){//쿠키 없을때만 호출
				//20200319 :: _satellite 임시 주석처리 
				//_satellite.setVar('GUID', $.cookies.get("guid", {domain : ".samsung.com"}));
				
				// AA Direct call 호출
				//20200319 :: _satellite 임시 주석처리 
//				_satellite.track('login');

				//GA Direct call 호출
				if(typeof dataLayer != "undefined" && typeof dataLayer == "object"){
					dataLayer.push({
					    'event' : 'login',
					    'eventNonInteraction' : true

					});
				}
				$.cookies.set("directCallFlv2", "Y", {expires: null, domain : ".samsung.com"});
			}
		}

		// sign 버튼 텍스트 처리
		function setSignButtonText(isLogedIn){
			if (isLogedIn) {
				// user 정보 가져온 후 text 셋팅
				ss.Auth.getUserProfile(function(userData){
					if(userData != null && userData !== ""){
						if(SITE_CD === "vn") {
							setUserName(userData.lastName, true);
						}else{
							setUserName(userData.firstName + " " + userData.lastName, true);
						}
					}else{
						setUserName("", true);
					}
				});

				$beforeLoginContext.addClass('hide');
		    } else {
		    	$beforeLoginContext.removeClass('hide');
			}
		}

		// wishlist 동기화 - 로그인 시에 쿠키에 쌓아뒀던 wishlist 를 사용자 정보에 넣어줘야함
		// addWishlist가 완료 되어야 제대로 getWishlist를 할 수 있음
		function syncWishlist() {
			var wishlist = $.cookies.getWishList();
			var wishlistIndex = 0;

			function addWishListCallback(data) {

				if (wishlistIndex < wishlist.length) {
					estore.addWishListItemForce({ 'productCode' : wishlist[wishlistIndex] }, addWishListCallback);

					wishlistIndex++;
				} else {
					$.cookies.deleteWishList();

					// sign complete
					if ($.EstoreIfQueue)
						$.EstoreIfQueue.setIsSignReady(true);
				}

			}

			if (wishlist.length > 0) {
				addWishListCallback();
			} else {
				// sign complete
				if ($.EstoreIfQueue)
					$.EstoreIfQueue.setIsSignReady(true);
			}
		}

		// 레이어 팝업 닫기
		function closeLayer() {
			// $(".gnb-layer_popup-js").hide();
            window.sg.components.nv00Gnb.closeLayerPopup('#'+$privacyPopup.attr('id'));
            window.sg.components.nv00Gnb.closeLayerPopup('#'+$preferencePopup.attr('id'));
		}

		// 레이어 팝업 띄우기
		// param : noAccessType - 자격 제한 타입
		function popupLayer(noAccessType) {

			// 자격 제한 타입이면 일반 메시지 팝업
			if (noAccessType) {
				var title = LOGIN.msg.errorTitleText; // 메시지 팝업의 title text
				var description = ""; // 메시지 팝업의 description text

				switch (noAccessType) {
					case "DW": // 임의 탈퇴
					case "AW": // 직권 탈퇴
					case "WP": // 탈퇴 처리중
						description = LOGIN.msg.errorText1;
						break;
					case "BA": // 자격 정지
						description = LOGIN.msg.errorText2;
						break;
					case "UK": // UnKnown
						description = LOGIN.msg.errorText3;
						break;
					case "ES": // estore shutdown
						description = LOGIN.msg.errorText4;
						break;
					default :
						break;
				}

				$showLayer = $confirmPopup;

				// 팝업 레이어 태그 삽입 dong_won.lee
				if ("pop-tit".indexOf($('#confirmPopup >div> div.popup_wrap').find('h2').attr('class')) == -1) {
					$confirmPopup.append('<h2 class="pop-tit">');
					$confirmPopup.append('<p class="msg-text tc">');
				}

				$(".pop-tit", $confirmPopup).text(title);
				$(".msg-text", $confirmPopup).text(description);
			}

			// 다른 레이어 팝업 hide
//			ss.Popover.hideActive(ss.Popover.activePopover);

			closeLayer();

			if(gnbUsApiUse && SITE_CD !== "in"){
				$("#privacy-terms").parent().find(".checkbox-v2__label-text").empty();
				$("#privacy-terms2").parent().find(".checkbox-v2__label-text").remove();
				$("#privacy-terms2").parent().find(".layer-popup__checkbox-desc").remove();

				var consentsData1,consentsData2;
				if(consentsId.length > 0){
					consentsData1 = consentsId[0].data.content;
					if(consentsId[1] != null){
						consentsData2 = consentsId[1].data.content;
						consentsData2 = consentsData2.replace("checkbox-v2__label-text", "checkbox-radio__label-text checkbox-v2__label-text")
					}
				}

				$("#privacy-terms").parent().find(".checkbox-v2__label-text").append(consentsData1);
				if(consentsData2 != null){
					$("#privacy-terms2").parent().append(consentsData2);
				}

			}

			if ($showLayer && $showLayer.length > 0) {
				// $showLayer.show();
                window.sg.components.nv00Gnb.openLayerPopup('#'+$showLayer.attr('id'));

//				document.getElementById($showLayer.children("div").attr("id")).popAlign();
			}
		}

		// US 정책 동의 업데이트
		function updateUsAgreePolicy(data){
			var setAgreeUsPolicyUrl = "";
			var jwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
			
			if(gnbUsApiUse){
				setAgreeUsPolicyUrl = _domain + "/v4/identity/preferences";
			}
			
			var putData = data;
			if(SITE_CD === "in") {
				putData = JSON.stringify(data);
			}
			
			$.ajax({
				headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin" : "*",
					"x-ecom-app-id" : "identity-store",
					"x-ecom-jwt" : jwtToken
				},
				url: setAgreeUsPolicyUrl,
				type: "PUT",
				dataType : "json",
				data: putData,
//				async: false,
				xhrFields : {
					withCredentials: true
				},
				beforeSend : function(xhr){
					if(multiLanguageYN === "Y"){
						xhr.setRequestHeader("x-ecom-locale", hreflang);
					}
				},
				success: function (data) {
						closeLayer();
						
						if (inMyGalaxyAppflag === "Y"){
							$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
						} else {
							$showLayer = $preferencePopup;
						}
						
						popupLayer();
				},
				error:function(jqXHR, textStatus, errorThrown){
					console.error(textStatus);
				}
			});
			

		}

		// 정책 동의 업데이트
		function updateAgreePolicy() {
			var  setAgreeStorePolicyUrl = "";
			var guid = $.cookies.get("guid",{domain:".samsung.com"});
			if(IS_B2B){
				setAgreeStorePolicyUrl = storeWebDomain + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
			}else if(SITE_CD === "au" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "uk" || SITE_CD === "ru" || SITE_CD === "ae" || SITE_CD === "ae_ar" 
				|| SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz" || SITE_CD === "uk"
				|| SITE_CD === "ca" || SITE_CD === "ca_fr" || SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at" 
				|| SITE_CD === "my" || SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD == "eg" || SITE_CD == "za" || SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu"
				|| SITE_CD === "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
				|| isNewHybris) {							//new-hybris
				// AU Hybris 6.0 // DE Hybris 6.0 // LATIN Hybris 6.0 // TW Hybris 6.0 // UK Hybris 6.0 // RU Hybris 6.0 // AE Hybris 6.0 // AE_AR Hybris 6.0 // VN Hybris 6.0 // TH Hybris 6.0 // SA Hybris 6.0 // SA_EN Hybris 6.0 // NZ Hybris 6.0 // FR Hybris 6.0 // NL Hybris 6.0 // BE Hybris 6.0 // BE_FR Hybris 6.0 // SE,DK,FI,NO,AT,MY,SK,CZ Shop Integration Hybris 6.0
				setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
			}else if(SITE_CD === "es" || SITE_CD === "it"){
				if(STORE_DOMAIN.indexOf("https://") > -1){
					// Hybris 6.0
					setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
				}else{
					// Hybris 5.0
					setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/setAgreeStorePolicy?receiveEmail=" + receiveEmailChecked;
				}
			} else if(SITE_CD === "levant"){
	        	setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + "jo" + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
	        } else if(SITE_CD === "levant_ar"){
	        	setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + "jo_ar" + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
			} else if(SITE_CD === "n_africa"){
	        	setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + "ma" + "/ng/p4v1/agreeStorePolicy?receiveEmail=" + receiveEmailChecked;
			} else { 
				setAgreeStorePolicyUrl = STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/setAgreeStorePolicy?receiveEmail=" + receiveEmailChecked;
			}

			if(hybrisApiJson) {		// jsonp -> json 으로 분기
				$.ajax({
					url: setAgreeStorePolicyUrl,
					type: "GET",
					data : {
						"ssoID" : guid
					},
					dataType : "json",
					xhrFields: { withCredentials: true },
					contentType : "application/x-www-form-urlencoded",
					crossDomain : true,
					beforeSend: function () {},
					success: function (data) {
						closeLayer();
	
						if (data.resultCode === "0000") {	
							if (inMyGalaxyAppflag === "Y"){
								$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
							} else {
								$showLayer = $preferencePopup;
							}
	
							popupLayer();
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
					}
				});
			} else {
				$.ajax({
					url: setAgreeStorePolicyUrl,
					type: "GET",
					dataType : "jsonp",
					data : {
						"ssoID" : guid
					},
					jsonp : "callback",
					beforeSend: function () {},
					success: function (data) {
						closeLayer();

						if (data.resultCode === "0000") {

							if (inMyGalaxyAppflag === "Y"){
								$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
							} else {
								$showLayer = $preferencePopup;
							}

							popupLayer();
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
					}
				});
			}
		}

		/**
		 * US 로그인 체크
		 */
		ss.Auth.checkSignInUs = function(){

			// 토큰 값이 있을 경우 로그인 되었다고 판단
			var xsdcxyn = $.cookies.get("xsdcxyn", {domain : ".samsung.com"});
			var jwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
			var guid = $.cookies.get("guid",{domain:".samsung.com"});
			
			var reDCheckFn = function(){
				$.ajax({
					url: "/aemapi/v6/data-login/callSALogin."+siteCode+".json",
					type: "GET",
					dataType : "json",
					success: function (data) {
						if(data.statusCode===200){
							if(data.redCookieChk === "N"){
								deleteSignCookie();
								deleteSACookie();
								
								saSignInGate();
							} else {
								if ( !$.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"}) ) {
									deleteSignCookie();
									deleteSACookie();

									saSignInGate();
								}else{
	                                location.reload(true);
								}
							}
						} else {
							deleteSignCookie();
							deleteSACookie();

							saSignInGate();
						}
						
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
                       	// 스토어에서 로그인 실패면 로그아웃 처리
						deleteSignCookie();
						deleteSACookie();

						saSignInGate();
					}
				});
					
			};
		
			if ( jwtToken ) { 
				// jwt validate 체크
				var validateParamObj = {"jwt": jwtToken};
				var isUSEppGuestUser = false; 
				//us 국가 만 있음
				if(siteCode==="us"){
					var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
					
					var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
					var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
					
					if(epp_verified != null){
						epp_verified = epp_verified.toString();
						if(epp_verified=="true" && tmktid != null && tmktid != ''){
							validateParamObj["store_id"] = tmktid.toString();
						} else if(validateStoreId != null && validateStoreId != ""){
							validateParamObj["store_id"] = validateStoreId.toString();
						}
					}
					
					// [US] epp guest user 체크
					$.ajax({
			    		headers: {
					         "Cache-Control": "no-cache",
					         "Content-Type": "application/json",
					         "Access-Control-Allow-Origin" : "*"
			    		},
					    url: STORE_DOMAIN + "/v1/sso/jwt/details",
		    			type: "POST",
		    			async: false,
			    		dataType : "json",
			    		data: JSON.stringify ({"jwt": jwtToken}),
						xhrFields : {
							withCredentials: true
						},
					    success: function (data) {
							if (data) {
								updateUsEppGNB(data);
							}
					    	if(data != null && data !== "" && data.login_type != null && (data.login_type === "guest_epp_store"|| data.login_type === "referral_url")){
					    		isUSEppGuestUser = true;
					    		$.cookies.set("isUSGuestUser", "Y");
					    	 } else {
					    		$.cookies.set("isUSGuestUser", "N");
					    	 }
					     }
			    	 });
				}
				if(!isUSEppGuestUser){
					// var _domain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://us.ecom-qa.samsung.com': 'https://www.samsung.com/us/api'
					$.ajax({
						headers: {
						      "Cache-Control": "no-cache",
						      "Content-Type": "application/json",
						      "Access-Control-Allow-Origin" : "*"
				        },
						url: _domain + "/v1/sso/user/validate",
						type: "POST",
						dataType : "json",
						data: JSON.stringify (validateParamObj),
//							async: false,
						xhrFields : {
							withCredentials: true
						},
						beforeSend : function(xhr){
							if(multiLanguageYN === "Y"){
								xhr.setRequestHeader("x-ecom-locale", hreflang);
							}
						},
						success: function (data) {
							
							if ( data.statusCode !== 200 && data.statusCode !== "200" ) {
//								$.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
								reDCheckFn();
							} else if ( data.user_info.firstname != null && data.user_info.firstname !== "" ) {
					    		$beforeLoginContext.addClass('hide');
								
								if(fnIsNull(guid)){ // otp login user
									setUserName(data.user_info.firstname + " " + data.user_info.lastname,true, true);
								} else {
									setUserName(data.user_info.firstname + " " + data.user_info.lastname,true);
								}
								var rewardDomain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://sso-stg.us.samsung.com' : 'https://sso-us.samsung.com';
								if ($.cookie("rewards_tier") == null && $.cookie("rewards_tier") == undefined) {
									$.ajax({
										url: "https://www.samsung.com/us/api/ecom/v4/rewards/reward-points",
										method: 'GET',
										headers: {
											'x-ecom-jwt': $.cookies.get("jwt_USA", {domain : ".samsung.com"}),
										},
										crossDomain : true,
										xhrFields: {
										    withCredentials: true
									    },
									});
								}
							}
						},
						error:function(jqXHR, textStatus, errorThrown){
							console.error(textStatus);
//							$.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
							reDCheckFn();
						}
					});
				} else {
					saSignInGate();
				}
			} else {
		    	// sa login 일 경우 jwt cookie 가 유효 하지 않으면 cookie 재발급
			    if(xsdcxyn){
			    	reDCheckFn();
		    	} else {
					saSignInGate();
		    	}
		    }
		};
		/**
		 * 로그인 체크
		 * param : callback 로그인 체크 후 호출 될 함수
		 * param : validate 쿠키 값이 있는지만 체크할 지, 쿠키 값이 유효한 것인지 까지 체크할지 여부 (true / false)
		 * 			true 일 경우 스토어 or SA로 유효한지 체크
		 * param : popupLogin 로그인이 안되있으면 로그인 팝업 띄울지 여부 (true / false)
		 */
		ss.Auth.checkSignIn = function(callback, validate, popupLogin) {

		// Account V03 버젼 반영 2018/12/06
			var isLogedIn = false;
			if(!IS_B2B || (loginLinkURL != null && loginLinkURL != '' && IS_B2B)){ // [B2B] Login Icon 만 존재하는 사이트의 경우 미로그인 처리

			//var token = $.cookies.get("iPlanetDirectoryPro", {domain : ".samsung.com"});
			var xsdcxyn = $.cookies.get("xsdcxyn", {domain : ".samsung.com"});
			var guid = $.cookies.get("guid",{domain:".samsung.com"});
			
			// 2021.04.12 B2B 로그인 추가
			var xsdcbxyn = $.cookies.get("xsdcbxyn", {domain : ".samsung.com"});
			var snsToken = $.cookies.get("snsSessionId", {domain : ".samsung.com"});
			
			
			// 토큰 값이 있을 경우에만 로그인 체크
			// 2021.04.12 B2B 로그인 추가
			if ((!IS_B2B && xsdcxyn) || (IS_B2B && (xsdcbxyn || snsToken))) {
				if (validate) {
					// 스토어 연계 사이트
					if (USE_ESTORE && !isVtexStore) {
						var sessionCheckUrl = "";
						var storeDomainTemp = STORE_DOMAIN.split("/")[2];
						//new-hybris
						if(isNewHybris || IS_B2B) storeDomainTemp = storeWebDomain.split("/")[2];
						
						if(SITE_CD === "au" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "ru" || SITE_CD === "ae" || SITE_CD === "ae_ar" 
							|| SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz" || SITE_CD === "uk"
							|| SITE_CD === "ca" || SITE_CD === "ca_fr" || SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at"
							|| SITE_CD === "my" || SITE_CD === "es" || SITE_CD === "it" || SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD == "eg" || SITE_CD == "za"
							|| SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu" || SITE_CD == "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
							|| isNewHybris || IS_B2B) {					//new-hybris
							// AU, DE, LATIN, TW, UK, RU, AE, AE_AR, VN, TH, SA, SA_EN, NZ, FR, NL, BE, BE_FR, SE, DK, FI, NO, AT, MY, SK, CZ, ES, IT Shop Integration Hybris 6.0
							sessionCheckUrl = "https://" + storeDomainTemp + "/" + SITE_CD + "/ng/p4v1/sessionCheck";
							if(IS_B2B){
								sessionCheckUrl = storeWebDomain + "/ng/p4v1/sessionCheck";
							}
						} else if(SITE_CD === "levant"){
				        	sessionCheckUrl = "https://" + storeDomainTemp + "/" + "jo" + "/ng/p4v1/sessionCheck";
				        } else if(SITE_CD === "levant_ar"){
				        	sessionCheckUrl = "https://" + storeDomainTemp + "/" + "jo_ar" + "/ng/p4v1/sessionCheck";
						} else if(SITE_CD === "n_africa"){
				        	sessionCheckUrl = "https://" + storeDomainTemp + "/" + "ma" + "/ng/p4v1/sessionCheck";
					    } else {
							sessionCheckUrl = "https://" + storeDomainTemp + "/" + SITE_CD + "/ng/p4v1/getSessionCheck";
						}

						if(hybrisApiJson){		// jsonp -> json 으로 분기
							$.ajax({
								url : sessionCheckUrl,
								type : "GET",
								data : {
									"ssoID" : guid
								},
								dataType : "json",
								xhrFields: { withCredentials: true },
								contentType : "application/x-www-form-urlencoded",
								crossDomain : true,
								success : function(data) {
									if (callback && typeof (callback) == "function") {
										var isLogedIn = data.resultCode === "0000" ? true : false;
										
										// 스토어에서 로그인 실패면 로그아웃 처리
										if (isLogedIn == false) {
											signOut();
	
											if (popupLogin){
												saSignInGate();
											}
										}
										callback(isLogedIn);
									}
								},
								error : function(jqXHR, textStatus, errorThrown) {}
							});
						} else {
							$.ajax({
								url : sessionCheckUrl,
								type : "GET",
								dataType : "jsonp",
								data : {
									"ssoID" : guid
								},
								jsonp : "callback",
								success : function(data) {
									if (callback && typeof (callback) == "function") {
										var isLogedIn = data.resultCode === "0000" ? true : false;
										
										// 스토어에서 로그인 실패면 로그아웃 처리
										if (isLogedIn == false) {
											signOut();
	
											if (popupLogin){
												saSignInGate();
											}
										}
										callback(isLogedIn);
									}
								},
								error : function(jqXHR, textStatus, errorThrown) {}
							});
						}
					} else {
						// 스토어를 안쓰는 사이트
						/* validate 불필요하여 제외처리
						$.ajax({
							url : "/aemapi/v6/data-login/checkLogin",
							type : "POST",
							dataType : "json",
							data : {
								"siteCode" : SITE_CD
							},
							success: function(data){
								if (callback && typeof(callback) == "function") {
									isLogedIn = data.result;

									if (isLogedIn == false) {
										signOut();
									}

									callback(isLogedIn);

									if (popupLogin && !isLogedIn){
										saSignInGate();
									}
								}
							},
							error : function() {
								signOut();

								callback(false);

								if (popupLogin){
									saSignInGate();
								}
							}
						});
						*/
					}	// end USE_STORE
				} else {
					// 쿠키 있는지만 체크 하기 때문에 
					isLogedIn = true;

					if (callback && typeof(callback) == "function") {
						callback(isLogedIn);
					}
				}	// end validate
			} else {
				if (callback && typeof(callback) == "function") {
					callback(isLogedIn);

//					if (popupLogin && !isLogedIn){
					if (popupLogin){
						saSignInGate();
					}
				}
				setSignButtonText(false);
			}	// xsdcxyn
			}
			return isLogedIn;
		};

		
		function saSignInGate(destinationUrl) {
			// Account V03 버젼 반영 2018/12/06
			if(!IS_B2B || (loginLinkURL != null && loginLinkURL != '' && IS_B2B) ){ // [P6 B2B] loginLinkURL 이 없는 경우 오류 수정
			$("#signInForm").attr("action",loginLinkURL);

			returnURL = destinationUrl || window.location.href;
			
			var registCheckUrl = $("#redirect_uri", $signInForm).val();
			var domainTemp = "";
			var winPort = window.location.port;
			// port가 없거나 80, 8080 일 경우에는 https://로 호출
			if(winPort == null || winPort === "" || winPort === "80" || winPort === "8080"){
				domainTemp = "https://" + window.location.host;
			}else{
				domainTemp = "http://" + window.location.host;
			}
			
			if(registCheckUrl.indexOf(window.location.hostname) < 0){
				var registFullUrl = domainTemp + registCheckUrl;
				if (window.location.hostname.indexOf('stgweb') > -1 || window.location.hostname.indexOf('stgcl.us') > -1) {
					registFullUrl = "https://sso-stg.us.samsung.com/sso/sa/auth"
				}
				$("#redirect_uri", $signInForm).val(registFullUrl);
			}
			var glbState = "GLB" + Math.random().toString(36).substr(2,11);
			$.cookies.set("glbState", glbState, {domain : ".samsung.com"});
			
			$("#response_type", $signInForm).val("code");
			$("#countryCode", $signInForm).val($("#countryCode", $signInForm).val());
			$("#redirect_uri", $signInForm).val($("#redirect_uri", $signInForm).val());
			$("#signInState", $signInForm).val(glbState);
			$("#signInGoBackURL", $signInForm).val(returnURL);
			$('.goBackURL').val(returnURL);
			$("#scope", $signInForm).val("");

			// Start of AEMCL-3025
			var newSALoginCookie = $.cookies.get("new_sa_login", {domain : ".samsung.com"});
			if(newSALoginCookie) {
				var encodedState = btoa(window.location.href + '?state=' + glbState);
				$("#signInState", $signInForm).val(encodedState);
				var redirectURI = window.location.host.indexOf("stgcl.us") > -1 ?  searchParams.get('qa') === 'live' ? 'https://www.samsung.com/us/api/v4/sso/sa/login' : 'https://us.ecom-qa.samsung.com/v4/sso/sa/login' : 'https://www.samsung.com/us/api/v4/sso/sa/login';
				$("#redirect_uri", $signInForm).val(redirectURI);
			}
			// End of AEMCL-3025

			var client_idCheck = $("#loginAccountServiceId").val();
			if(client_idCheck){
				var client_id = client_idCheck;
				$("#client_id", $signInForm).val(client_id);
			}
			var languageCodeCheck = $("#languageCode").val();
			var countryCodeCheck = $("#countryCode").val()
			if(languageCodeCheck && countryCodeCheck){
				var locale = languageCodeCheck + "_" + countryCodeCheck;
				$("#locale", $signInForm).val(locale);
			}

			$.cookies.set("returnURL", returnURL, {domain : ".samsung.com"});
			if(IS_B2B){ // 2021.04.12 B2B 로그인 추가
				$.cookies.set("dotcomReturnURL", returnURL, {domain : ".samsung.com"});
			}
			$signInForm.submit();
			
			var rememberChecked = $rememberCheck.is(":checked");

			if (rememberChecked) {
				setRememberId($.trim($idInput.val()), 7);
			} else {
				setRememberId(null, -1);
			}

			returnURL = undefined;
			}
		};

		ss.Auth.callSaSignInGate = function() {
			saSignInGate();
		};
		
		/**
		 * 유저 정보 가져오기
		 * param : callback 유저 정보 가져온 후 호출 될 함수
		 */
		ss.Auth.getUserProfile = function(callback) {
			if (!userData) {
				var xsdcxyn = $.cookies.get("xsdcxyn", { domain : ".samsung.com" });
				var snsToken = $.cookies.get("snsSessionId", { domain : ".samsung.com" });
				//2021.04.12 B2B 로그인 추가
				var xsdcbxyn = $.cookies.get("xsdcbxyn", { domain : ".samsung.com" });

				if ( (!IS_B2B && !xsdcxyn && snsToken) || (IS_B2B && !xsdcbxyn && snsToken) ) {
					// snsToken 만 있을 경우

					if(hybrisApiJson){		// jsonp -> json 으로 분기
						$.ajax({
							url : STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/getSnsUserInfo?snsSessionId=" + snsToken,
							type : 'GET',
							dataType : "json",
							xhrFields: { withCredentials: true },
							contentType : "application/x-www-form-urlencoded",
							crossDomain : true,
							beforeSend : function() {
							},
							success : function(data) {
								if (data) {
									var givenName = data.givenName;
									var familyName = data.familyName;
									
									userData = {
										"firstName"	: givenName,
										"lastName" : familyName
									};
								} else {
									userData = null;
								}
	
								if (callback && typeof (callback) == "function") {
									callback(userData);
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.error(textStatus);
							}
						});
					} else {
						$.ajax({
							url : STORE_DOMAIN + "/" + STORE_SITE_CODE + "/ng/p4v1/getSnsUserInfo?snsSessionId=" + snsToken,
							type : 'GET',
							dataType : "jsonp",
							jsonp : "callback",
							beforeSend : function() {
							},
							success : function(data) {
								if (data) {
									var givenName = data.givenName;
									var familyName = data.familyName;
									
									userData = {
										"firstName"	: givenName,
										"lastName" : familyName
									};
								} else {
									userData = null;
								}

								if (callback && typeof (callback) == "function") {
									callback(userData);
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.error(textStatus);
							}
						});
					}
				} else if(xsdcxyn && !IS_B2B) {  // V03 로그인 되었다면,, 
					setUserName(firstName + " " + lastName,true);
					
					userData = {
						"firstName"	: firstName,
						"lastName" : lastName
					};
					
					reservationUserData = {
							"firstName" : firstName,
							"lastName" : lastName
					};
				} else if(xsdcbxyn && IS_B2B){ // 2021.04.12 B2B 로그인 추가
					var emailId = $.cookies.get("emailId",{domain:".samsung.com"});
					
					setUserName(firstName + " " + lastName,true);
					
					userData = {
						"firstName"	: firstName,
						"lastName" : lastName,
						"emailId" : emailId
					};
				} else {
					function getUserInfo() {
						console.log("get user profile Success");
						
						if(firstName != null || lastName != null) {
							
							userData = {
									"firstName"	: firstName,
									"lastName" : lastName
								};
							
							reservationUserData = {
									"firstName" : firstName,
									"lastName" : lastName
								};
							// 2021.04.12 B2B 로그인 추가
							if(IS_B2B){
								var emailId = $.cookies.get("emailId",{domain:".samsung.com"});
								var emailAddrText = $.cookies.get("emailAddrText",{domain:".samsung.com"});
								var phone = $.cookies.get("phone",{domain:".samsung.com"});
								var userAccount = $.cookies.get("userAccount",{domain:".samsung.com"});
								userData = {
									"firstName"	: firstName,
									"lastName" : lastName,
									"emailId" : emailId
								};
							
								reservationUserData = {
									"firstName" : firstName,
									"lastName" : lastName,
									"emailAddr" : emailAddrText,
									"phone" : phone,
									"userAccount" : userAccount
								};
							}
							
							// AU Hybris 6.0 // DE Hybris 6.0 // FR Hybris 6.0
							if(USE_ESTORE || isLoginWithNoStore){ /* + 비스토어 로그인 */
								if(SITE_CD === "vn"){
									setUserName(lastName,true);
								}else{
									setUserName(firstName + " " + lastName,true);
								}
							}
						}else {
							userData = null;
							// AU Hybris 6.0 // DE Hybris 6.0 // FR Hybris 6.0
							if(USE_ESTORE || isLoginWithNoStore){ /* + 비스토어 로그인 */
								setUserName("",true);
							}
						}
						
						// 왜 호출하는 거지??
						if (callback && typeof (callback) == "function") {
							callback(userData);
						}
					}

					// 2014.03.23 - ESTORE 연계 사이트일 경우 스토어 로그인이 완료 된 후 SA에 요청
					if($("#useLogin").val() === "Y"){
						if (USE_ESTORE) {
							ss.EstoreIfQueue.setQueue(getUserInfo);
						} else {
							getUserInfo();
						}
					}
				}
			} else {
				if (callback && typeof (callback) == "function") {
					callback(userData);
				}
			}
		};
		
		function saSignOutGate() {
			// Account V03 버젼 반영 2018/12/06
			$("#signOutForm").attr("action",logoutURL);

			returnURL = window.location.href;
			if($("#tempTitle").val() 
					&& ("page-my-samsung" === $("#tempTitle").val() || "page-my-products" === $("#tempTitle").val() || "page-my-rewards" === $("#tempTitle").val() || "page-my-referrals" === $("#tempTitle").val() )) {
				// My Samsung Page에서 로그아웃하는 경우 ReturnUrl를 Home로 지정
				returnURL = window.location.protocol + "//" + window.location.host + '/'+SITE_CD +'/';
			}
			$.cookies.set("returnURL", returnURL, {domain : ".samsung.com"});
			if(IS_B2B){ // 2021.04.12 B2B 로그인 추가
				$.cookies.set("dotcomReturnURL", returnURL, {domain : ".samsung.com"});
				const siteCookiePath = '/'+SITE_CD+'/';
				$.cookies.del("useTaxExPriceYN", {path:siteCookiePath, domain :".samsung.com"});
				
				const smbCookiePaths = $.cookies.get("useSMBCookiePaths");
				$.cookies.del("useSMBCookiePaths", {path:'/', domain :".samsung.com"});

				if(smbCookiePaths != null){
					const pathList = smbCookiePaths.split(";");
					for(const path in pathList){
						if(pathList[path] != '' && pathList[path] != null){
							$.cookies.del("isSMBRegisteredUserYN", {path:pathList[path], domain : ".samsung.com"});
						}
					}
				} else {
					$.cookies.del("isSMBRegisteredUserYN", {path:siteCookiePath, domain : ".samsung.com"});
				}
			}
			
			var signOutURL = $("#signOutURL", $signOutForm).val();
			var domainTemp = "";
			var winPort = window.location.port;
			// port가 없거나 80, 8080 일 경우에는 https://로 호출
			if(winPort == null || winPort === "" || winPort === "80" || winPort === "8080"){
				domainTemp = "https://" + window.location.host;
			}else{
				domainTemp = "http://" + window.location.host;
			}
			
			if(signOutURL.indexOf(window.location.hostname) < 0){
				var signOutFullUrl = domainTemp + signOutURL;
				$("#signOutURL", $signOutForm).val(signOutFullUrl);
			}
			
			var glbState = "GLB" + Math.random().toString(36).substr(2,11);
			$.cookies.set("glbState", glbState, {domain : ".samsung.com"});
			$("#signOutState", $signOutForm).val(glbState);
			// Start of AEMCL-3023
			var newSALogoutCookie = $.cookies.get("new_sa_logout", {domain : ".samsung.com"});
			var encodedState = btoa(window.location.href + '?state=' + btoa(glbState));
			$("#signOutState", $signOutForm).val(encodedState);
			var newSignOutURL = window.location.host.indexOf("stgcl.us") > -1 ? 'https://us.ecom-stg.samsung.com/v2/sso/user/logout' : 'https://www.samsung.com/us/api/v2/sso/user/logout'
			$("#signOutURL", $signOutForm).val(newSignOutURL);
			// End of AEMCL-3023

			var client_idCheck = $("#loginAccountServiceId").val();
			if(client_idCheck){
				var client_id = client_idCheck;
				$("#client_id", $signOutForm).val(client_id);
			}

			$signOutForm.submit();

			//deleteSACookie();
			returnURL = undefined;
		};
		
		ss.Auth.signOutUs = function(goUrl){
			if (!goUrl){
				returnURL = window.location.href;
			} else {
				returnURL = goUrl;
			}
			returnURL = returnURL.escapeHtml();

			var __domain = window.location.hostname.indexOf('stgcl.us') > -1 ? 'https://us.ecom-stg.samsung.com': 'https://www.samsung.com/us/api';

			const state = btoa(`${window.location.href}?state=${Math.random().toString(36).substr(2,11)}`);
			const client_id = $("#loginAccountServiceId").val();
			const signOutURL = __domain + "/v2/sso/user/logout";
			
			var jwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain : ".samsung.com"});

			const url = `${_newsadomain}/signOutGate?client_id=${client_id}&signOutURL=${signOutURL}&state=${state}`;

			window.location.href = url;

			return;

			if(jwtToken){
				$.ajax({
					headers: {
						"Cache-Control": "no-cache",
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin" : "*"
					},
					url: _domain + "/v2/sso/user/logout",
					type: "GET",
					dataType : "json",
					xhrFields: { withCredentials: true },
 					crossDomain: true,
 					async : false,
					beforeSend : function(xhr){
						if(multiLanguageYN === "Y"){
							xhr.setRequestHeader("x-ecom-locale", hreflang);
						}
						if(siteCode==="us"){
							xhr.setRequestHeader("x-ecom-jwt", jwtToken);
						}
					},
					success: function (data) {
						if (data.statusCode === 200 || data.statusCode === "200") {
							if(siteCode==="us"){
								$.ajax({
									headers: {
										"Cache-Control": "no-cache",
										"Content-Type": "application/json",
										"Access-Control-Request-Headers": "access-control-allow-origin",
										"Access-Control-Allow-Origin" : "*"
									},
									url: usSSOApiDomain + "/apiservices/logout",
									type: "GET",
									dataType : "jsonp",
									async : false,
									crossDomain: true,
									xhrFields: { withCredentials: true },
									success: function (data) {
										window.location.replace("/" + SITE_CD);
									},error: function(jqXHR, textStatus, errorThrown){
										console.error(textStatus);
										$.cookies.del("jwt_"+countryIsoCode, {domain : ".samsung.com"});
										window.location.replace("/" + SITE_CD);
									}
								});
							} else {
								window.location.replace("/" + SITE_CD);
							}
						}else{
							$.cookies.del("jwt_"+countryIsoCode, {domain : ".samsung.com"});
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
						$.cookies.del("jwt_"+countryIsoCode, {domain : ".samsung.com"});
						window.location.replace("/" + SITE_CD);
					},
					complete : function() {
						saSignOutGate();
				    }
				});
				
				$beforeLoginContext.removeClass('hide');
				
				setUserName("", false);
			}else{
				location.href = returnURL;
			}
			
			returnURL = undefined;
		};
		
		// 스토어 쪽에서 에러코드 반환시 로그아웃 처리
		// 2014.02.21 무조건 스토어에 로그아웃 요청
		//new-hybris
		ss.Auth.signOut = function(goUrl){
			if (!goUrl){
				returnURL = window.location.href;
			} else {
				returnURL = goUrl;
			}

			returnURL = returnURL.escapeHtml();
			
			//deleteSignCookie();
			// 2021.04.14 B2B 로그아웃 로직 추가
			if ((USE_ESTORE || isLoginWithNoStore || isVtexStore || IS_B2B) && estoreLive) { /* + 비스토어 로그인 */
				// AU Hybris 6.0 // DE Hybris 6.0 // LATIN Hybris 6.0 // TW Hybris 6.0 // UK Hybris 6.0 // RU Hybris 6.0 // AE Hybris 6.0 // AE_AR Hybris 6.0 // VN Hybris 6.0 // TH Hybris 6.0 // SA Hybris 6.0 // SA_EN Hybris 6.0 // NZ Hybris 6.0 // FR Hybris 6.0 // NL Hybris 6.0 // BE Hybris 6.0 // BE_FR Hybris 6.0 // SE,DK,FI,NO,AT,MY,SK,CZ Shop Integration Hybris 6.0
				//PE login
				if (SITE_CD === "au" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "ru" || SITE_CD === "ae" || SITE_CD === "ae_ar" 
					|| SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz"  || SITE_CD === "uk"
					|| isLoginWithNoStore /* + 비스토어 로그인 */ || isVtexStore || SITE_CD === "ca" || SITE_CD === "ca_fr" || SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at" 
					|| SITE_CD === "my" || ((SITE_CD === "es" || SITE_CD === "it") && STORE_DOMAIN.indexOf("https://") > -1) || SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD == "za" || SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu" || SITE_CD == "eg"
					|| SITE_CD == "levant" || SITE_CD == "levant_ar" || SITE_CD == "n_africa" || SITE_CD == "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
					|| isNewHybris || IS_B2B){ 			//isNewHybris 추가					
					saSignOutGate();
					setMyMenu(false);
				}else{
					location.href = STORE_DOMAIN + "/" + SITE_CD + "/ng/logout?goUrl=" + encodeURIComponent(returnURL);
				}
				
			} else {
				location.href = returnURL;
			}

			returnURL = undefined;
			userData = null;
		};

		/**
		 * cart element set 
		 * cart count 가 변경 된 후 cart element 를 셋팅 해준다
		 * 
		 * param : count 가 표시 되면 true, count 가 0 이면 false
		 * 
		 */
		ss.Auth.setCartEl = function(useCartCount){

			var $cartIconEl = $('.js-global-cart-btn');
			if(useCartCount){
				$cartIconEl.each(function(){
					if($(this).hasClass('.js-has-carturl')){
						$(this).attr("an-tr", "nv00_gnb--cart-depth1");
					}
					
				});
				$cartIconEl.removeClass("js-layer-open");
				$cartIconEl.removeAttr("data-target-popup");
				
				var thisCartUrl = $cartIconEl.data("cart-url");
				$cartIconEl.attr("href", thisCartUrl);
			} else {
				$cartIconEl.addClass("js-layer-open");
				$cartIconEl.attr("data-target-popup", "#layerEmptyCart");
				$cartIconEl.attr("an-tr", "nv00_gnb--text-depth1");
				$cartIconEl.attr("href", "javascript:;");
			}
			//window.sg.components.gnb.reInit(); new gnb
		};
		
		// Cart Count 호출
		ss.Auth.getGlobalCartCount = function(callback) {
			if (!USE_ESTORE || $.cookies.get("estoreLoginRequesting", {	domain : ".samsung.com"	}) === "Y") {
				return;
			}

			// Set Cart Count
			function setGlobalCartCount(result) {
				var useCartCount = false;
				var resultCartCount = 0;
				if((isNewHybris && SITE_CD =='uk') || IS_B2B){		//20210402  SEBN old Hybris 사용 20210408 id/ph 동일 //new-hybris
					if (result){
						result = parseInt(result);
						if(!isNaN(result) && result > 0){
							resultCartCount = result > 99 ? 99 : result; 
							useCartCount = true;
						} else {
							useCartCount = false;
						}
					} else {
						useCartCount = false;
					}
				} else {
					if (result) {
					if (result.resultCode === '0000') {
						resultCartCount = parseInt(result.cartCount) > 99 ? 99 : parseInt(result.cartCount); 
						if(resultCartCount > 0){
							useCartCount = true;
						}
					} else {
						useCartCount = false;
					}
				} else {
						useCartCount = false;
					}
				}

                updateCartCounter(useCartCount ? resultCartCount : 0);

				ss.Auth.setCartEl(useCartCount);

				if (callback && typeof (callback) == "function") {
					callback(result);
				}
			}
			function getCartCountFn(isLogedIn) {
				if (isLogedIn) {
					estore.getCartCount(setGlobalCartCount);
				} else {
					var addCartCookie = ss.cookies.get("everAddCart", { domain : ".samsung.com" });

					// AU Hybris 6.0 // DE Hybris 6.0 // LATIN Hybris 6.0 // TW Hybris 6.0 // UK Hybris 6.0 // RU Hybris 6.0 // AE Hybris 6.0 // AE_AR Hybris 6.0 // VN Hybris 6.0 // TH Hybris 6.0 // SA Hybris 6.0 // SA_EN Hybris 6.0 // NZ Hybris 6.0 // FR Hybris 6.0 // NL Hybris 6.0 // BE Hybris 6.0 // BE_FR Hybris 6.0 // SEC Hybris 6.0
					/*if (SITE_CD == "sec" || SITE_CD == "br" || SITE_CD == "au" || SITE_CD == "de" || SITE_CD == "latin" || SITE_CD == "tw" || SITE_CD == "uk" || SITE_CD == "ru" || SITE_CD == "ae" || SITE_CD == "ae_ar" || SITE_CD == "vn" || SITE_CD == "th" || SITE_CD == "sa" || SITE_CD == "sa_en" || SITE_CD == "nz" || SITE_CD == "fr" || SITE_CD == "nl" || SITE_CD == "be" || SITE_CD == "be_fr" || ((SITE_CD == "es" || SITE_CD == "it") && STORE_DOMAIN.indexOf("https://") > -1)) {
						addCartCookie = "Y";
					}*/
					if (SITE_CD === "br" || SITE_CD === "ar" || SITE_CD === "mx" || SITE_CD === "co" || SITE_CD === "py" || SITE_CD === "uy") {
						addCartCookie = "Y";
					}
					// addCartCookie 스토어 쿠키 미발급시 로직 보강 dong_won.lee
					// 스토어부하에 따라서 everAddCart 쿠키 없을시에 무조건 N 처리 - 20180829
					if(SITE_CD === 'sec'){
						if(addCartCookie === undefined || addCartCookie === null) addCartCookie = "N"; 
					}
					if (addCartCookie === "Y") {
						estore.getCartCount(setGlobalCartCount);
					} else {
						updateCartCounter(0);

						ss.Auth.setCartEl(false);
					}
				}
			}

			// 비로그인 시에 everAddCart cookie 값이 있을 경우에만 호출
			// 2021.04.12 B2B 로그인 추가 ( B2B cart count 미사용)
			// [EPP] epp cartCount 로직 추가
			if(IS_EPP){
				if(window.sg.epp.common.isLogged){
					getCartCountFn(true);
				} else {
					getCartCountFn(false);
				}
			} else {
				ss.Auth.checkSignIn(getCartCountFn);
			}
		};

		ss.Auth.setReturnURL = function(returnURL) {
			if (!returnURL)
				returnURL = window.location.href;
		};

		// 엘리먼트 등록
		function setElement() {
			$joinForm = $("#joinForm"); // 회원가입 폼
			$findAccountForm = $("#findAccountForm"); // find account 폼
			$signInForm = $("#signInForm"); // SA 로그인호출 폼
			$signOutForm = $("#signOutForm"); // SA 로그아웃호출 폼

			$loginLayerPopup = $("#loginLayerPopup"); // layer 팝업

			$idInput = $("#email"); // ID input
			$pwInput = $("#password"); // PW input
			$rememberCheck = $("#save-mail"); // ID 기억 체크박스
			$rememberCheckLabel = $("label[for='save-mail']"); // ID 기억 체크박스 Label

			$errorIdText = $("#errorId"); // ID error message
			$errorPwText = $("#errorPw"); // PW error message

			$signInBtn = $("input[type='submit'].sign-in__btn-submit"); // 로그인 버튼
			$signUpBtn = $(".sign-in__btn-submit__black"); // 회원가입 버튼
			$findAccountBtn = $(".sign-in__form-forgot-password a"); // Find Account 버튼

			$signToggleArrow = $('#signToggleArrow'); // social sign in? 토글 버튼

			$loginCloseBtn = $("#loginLayerPopup .login-close-btn"); // 닫기 버튼
			$loginLeaveBtn = $(".login-leave-btn"); // 닫기 버튼(클릭 시 로그아웃)

			/* 팝업 */
			$privacyPopup = $("#layerPrivacy"); // privacyPopup
			if(gnbUsApiUse){
				$privacyPopup = $("#layerPrivacyGPV2");
			}
			$preferencePopup = $("#layerPreference"); // preferencePopup
			$confirmPopup = $("#confirmPopup"); // confirmPopup

			$privacyBtn = $("#privacyBtn", $privacyPopup); // privacy popup YES button
			$privacyCheck1 = $("#privacy-terms", $privacyPopup); // privacy popup check1
			$privacyCheck2 = $("#privacy-terms2", $privacyPopup); // privacy popup check2
			$errorPrivacy = $("#errorPrivacy", $privacyPopup); // privacy popup error text
			
			$preferenceCheckBtn = $("#preferenceCheckBtn", $preferencePopup); // preference popup OK button
			$privacyCloseBtn = $("#privacyCloseBtn"); // privacy popup 닫기 버튼

			/* iframe */
			// $storeLoginIframe = $("#storeLoginIframe"); // storeLoginIframe
		}

		// 이벤트 등록
		function setEvent() {
			// 로그인 버튼 클릭
			$signInBtn.click(function() {
				signIn();
			});

			// 회원가입 버튼 클릭
			$signUpBtn.click(function() {
				signUp();
			});

			// find account 버튼 클릭
			$findAccountBtn.click(function() {
				findAccount();
			});

			// 닫기 버튼 클릭
			$loginCloseBtn.click(function() {
				if ($(this).closest('#loginLayerPopup').is(':visible')) {
					$('body').removeClass('gb-login-open');
					$('#loginLayerPopup .popAlign').trigger('clickoutside', 'touchstartoutside');
				}
			});

			// 닫기 버튼 클릭(로그아웃)
			$loginLeaveBtn.click(function() {
				if(SITE_CD === "es"){
					ss.Auth.signOut();
				}
				closeLayer();
				return false;
			});
			// 정책 동의 X 버튼 내용 추가(추가) :: 확인 후 제거 필요
//			$("#popup_privacy").find('button').on('click', function(){
//			  $("#layerPrivacy").attr('style', 'display:none');
//			  $("#dimContainer").html(''); 
//			})
//			
//			$("#popup_privacy").find('a.button.login-leave-btn').on('click', function(){
//			  $("#layerPrivacy").attr('style', 'display:none');
//			  $("#dimContainer").html(''); 
//			})
//			

			// Log-In 버튼 클릭
			$(document).on("click",	userLoginBtn, function(event) {
				event.preventDefault();

				if(SITE_CD === "br"){
					window.location.href = $(this).data("linkinfo");
				}else if(SITE_CD === "in"){
					// To-Be : https://도메인 /in/web/login?redirect_uri={이전 방문 페이지주소}
					var returnURL = window.location.href;
					var domainTemp = window.location.protocol + "//" + window.location.host +"/in/web/login?redirect_uri="+ returnURL;
					window.location.href = domainTemp;
				}else if(gnbUsApiUse){
					ss.Auth.checkSignInUs();
				}else{
					// 로그인 체크
					ss.Auth.checkSignIn(callback);
				}
			});

			// 사용자 sign out button 클릭
			$(document).on("click",	userLogoutBtn, function(event) {
	            event.preventDefault();
				var _self = this;
				var url = $(_self).attr("data-return-url"); // 버튼에 명시된 return url
	
				if(gnbUsApiUse && !IS_B2B){
					if(runmodeInfo==="dev"){
						returnURL = window.location.protocol + "//" + window.location.host + '/content/samsung/'+ SITE_CD +'.html';
						if(IS_B2B){
							returnURL = window.location.protocol + "//" + window.location.host + '/content/samsung/'+ SITE_CD +'/business.html';
						}
					} else if(runmodeInfo==="qa"){
						returnURL = window.location.protocol + "//" + window.location.host + '/'+SITE_CD +'.html';
						if(IS_B2B){
							returnURL = window.location.protocol + "//" + window.location.host + '/'+ SITE_CD +'/business.html';
						}
					} else if(runmodeInfo==="live"){
						returnURL = window.location.protocol + "//" + window.location.host + '/'+SITE_CD +'/';
						if(IS_B2B){
							returnURL = window.location.protocol + "//" + window.location.host + '/'+ SITE_CD +'/business/';
						}
					}
					
					ss.Auth.signOutUs();
				} else {
//					if(SITE_CD !== "ca" && SITE_CD !== "ca_fr"){
						if (url != null && url !== "") {
							returnURL = url;
						} else {
							if(runmodeInfo==="dev"){
								returnURL = window.location.protocol + "//" + window.location.host + '/content/samsung/'+ SITE_CD +'.html';
								if(IS_B2B){
									returnURL = window.location.protocol + "//" + window.location.host + '/content/samsung/'+ SITE_CD +'/business.html';
								}
							} else if(runmodeInfo==="qa"){
								returnURL = window.location.protocol + "//" + window.location.host + '/'+SITE_CD +'.html';
								if(IS_B2B){
									returnURL = window.location.protocol + "//" + window.location.host + '/'+ SITE_CD +'/business.html';
								}
							} else if(runmodeInfo==="live"){
								returnURL = window.location.protocol + "//" + window.location.host + '/'+SITE_CD +'/';
								if(IS_B2B){
									returnURL = window.location.protocol + "//" + window.location.host + '/'+ SITE_CD +'/business/';
								}
							}
						}
//					}else{//for ca, ca_fr
//						window.location.href = $(this).attr("href");
//					}
	
					// 로그인 체크
					ss.Auth.checkSignIn(callback);
				}
				return false;
			});

			// 로그인 체크(checkSignIn) 중 호출
			// param : isLogedIn - 로그인 유효성 체크 후 결과
			function callback(isLogedIn) {
				// 로그인 안되어있는 경우
				if(!isLogedIn){
					saSignInGate();
				// 로그인 되어있는 경우
				}else{
					ss.Auth.signOut(returnURL);
				}
			}

			// My Samsung Button Click
			/*
			$(document).on("click",	mySamsungBtn, function(event) {
				// My Samsung 추후 변경 예정
				_satellite.setVar('account', 'my samsung:shopping support:my info');
				_satellite.track('account');

				window.location.href = "https://store.samsung.com/"+SITE_CD+"/ng/my-samsung/my-summary";
			});
			*/

			// input text focus in(id / password)
			$(".sign_input").focusin(function() {
				switch ($(this).attr("id")) {
				case $idInput.attr("id"):
					$errorIdText.hide();
					break;
				case $pwInput.attr("id"):
					$errorPwText.hide();
					break;
				default :
					break;
				}
			});

			// input text keypress (id / password)
			$(".sign-in__form-text").unbind('keydown').bind('keydown', function(e) {

				if (e.keyCode === "13") {
					e.preventDefault();

					switch ($(this).attr("id")) {
					case $idInput.attr("id"):
					case $pwInput.attr("id"):
						signIn();
						break;
					default :
						break;
					}
				}
			});

			$rememberCheck.focusin(function(e) {
				e.preventDefault();

				$rememberCheckLabel.addClass("fs-boarder");
			});

			$rememberCheck.focusout(function(e) {
				e.preventDefault();

				$rememberCheckLabel.removeClass();
			});

			// privacy popup YES button click
			$privacyBtn.click(function() {
				var privacyChecked = $privacyCheck1.is(":checked");
				var consentsIdData1, consentsIdData2;

				if (!privacyChecked) {
					$errorPrivacy.show();
					return false;
				}

				// omniture - 계정등록 완료 후 최초로그인시 팝업에서 proceed 클릭 시
				//20200319 :: _satellite 임시 주석처리 
//				_satellite.setVar('account','account:email verification');
//				_satellite.track('account');

				receiveEmailChecked = $privacyCheck2.is(":checked");

				if(consentsId.length > 0){
					consentsIdData1 = consentsId[0].id;
					if(consentsId[1] != null){
						consentsIdData2 = consentsId[1].id;
					}
				}
				
				if (!policyCheckSite) {
					if(gnbUsApiUse){
						// 2018.11.30 us shop 정책동의 변경
						var data = "";
						var accept_1 = $privacyCheck1.is(":checked") ? true : false;
						var accept_2 = (consentsIdData2 != null) ? ($privacyCheck2.is(":checked") ? true : false) : false;
						
						if ( SITE_CD === "in" ) {
							data = {
								"terms_and_conditions": {
									"is_accepted": accept_1
								},
								"email_consent": accept_2
							};	
						} else {
							data = '{"consents": {"'+consentsIdData1+'" : {"is_accepted" : '+accept_1+'}';
							if(consentsIdData2 != null){
								data += ',"'+consentsIdData2+'" : {"is_accepted" : '+accept_2+'}';
							}
							data += '}}';
						}
						return updateUsAgreePolicy(data);
					}else {
						return updateAgreePolicy();
					}
				} else {
					// cookie set
					$.cookies.set('shopPrivacyPolicyAgreeYN', 'Y', {
						domain : ".samsung.com"
					});
					return init();
				}
			});

			// privacy policy checkbox change
			$privacyCheck1.change(function() {
				$errorPrivacy.hide();
			});

			// preference popup OK button click
			$preferenceCheckBtn.click(function() {
				if(newShopCountryYN === "Y"){
					if(gnbUsApiUse){
						// US Profile Url
						$("#accountModifyForm").attr("target", "");
						$("#accountModifyForm").submit();
					}else{
						window.location.href = myAccountUrl;
					}
				}else{
					if(updateProfileUrl != null && updateProfileUrl !== ""){
						if(SITE_CD === "ca" || SITE_CD === "ca_fr"){
							var prof_id = $.cookies.get("prof_id", {domain : ".samsung.com"});
							var prof_country = $.cookies.get("prof_country", {domain : ".samsung.com"});
							
							//https://support-ca.samsung.com/seca/myaccount/ap/premodify/go?prof_id=a66c80da93091c360a437bfb5c71e70d99bab76b031d9b580067d4966d972fc2&lang=ca&page=myaccount
							window.location.href = "https://support-ca.samsung.com/seca/myaccount/ap/premodify/go?prof_id=" + prof_id + "&lang=" + prof_country + "&page=myaccount"
						}else{
							window.location.href = STORE_DOMAIN + updateProfileUrl;
						}
					}else if(IS_B2B){
						window.location.href = storeWebDomain + "/ng/my-samsung/updatemyprofile";
					}else{
						window.location.href = STORE_DOMAIN + "/" + SITE_CD + "/ng/my-samsung/updatemyprofile";
					}
				}
			});

			$privacyCloseBtn.click(function() {
				if ($(this).closest('#layerPreference').is(':visible')) {
					$(this).closest('#layerPreference').hide();
				}
			});

			$signToggleArrow.click(function() {
				$('.icon-down-arrow', $loginLayerPopup).toggleClass('icon-up-arrow');
			});

			$(document).on('triggerLogin', function(event, returnUrl) {
	      saSignInGate(returnUrl);
	    });
		}
		
		//[EPP] setUserName, cartcount, 로그인/로그아웃 버튼 처리 
		function initEpp(){
			if(window.sg.epp == null){
				window.sg.epp = {};
				window.sg.epp.common = {};
			}

			const isEppLogged = window.sg.epp.common.isLogged;
			const eppJwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});

			function setEppCartCount(){
				if(gnbUsApiUse){
					$.ajax({
						headers: {
								"Cache-Control": "no-cache",
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin" : "*"
						},
						url: STORE_DOMAIN + "/v4/shopping-carts/",
						type: "POST",
						data: JSON.stringify ({}),
						dataType : "json",
						xhrFields : {
							withCredentials: true
						},
						beforeSend : function(xhr){
							/* jwtToken 있으면  헤더값 추가 */
							if(eppJwtToken != null && eppJwtToken != ""){
								xhr.setRequestHeader("x-ecom-jwt", eppJwtToken);
							}
						},
						success: function(){
							var usCartCount = $.cookies.get("s_ecom_sc_cnt", {domain : ".samsung.com"});
							updateCartCounter(usCartCount);
						}
					});
				} else {
					ss.Auth.getGlobalCartCount();
				}
			};
			
			//Partner Bar Exit  버튼 클릭 이벤트
			$('.js-epp-partner-bar-exit').on("click", function(){
				window.sg.epp.common.signOut(true);
			});

			if(isEppLogged){
				if(firstName && lastName) {
					setUserName(firstName + " "+lastName, true, false);
				}
				setEppCartCount();
				$beforeLoginContext.addClass('hide');

				$(document).on("click",	userLogoutBtn, function(event) {
					event.preventDefault();
	
					window.sg.epp.common.signOut();
				});

			} else {
				$beforeLoginContext.removeClass('hide');
				
				setEppCartCount();

				$(document).on("click", userLoginBtn, function(event) {
					event.preventDefault();
					window.sg.epp.common.signIn();
				});
			}
		};

		function initUs(xsdcxyn) {
			if(xsdcxyn){
				// sa login
				jwtTokenInit(xsdcxyn);
			}else{
				// otp login
				jwtTokenInit();
			}
		};
		
		function checkUsPreferences( jwtToken ) {
			// 2018.11.30 us shop 정책동의 spec 변경
			var isAccepted = true, apiUrl;

			if(SITE_CD !== "in") {
				apiUrl = _domain + "/v4/identity/preferences?display_context=pre_purchase";
			}else{
				apiUrl = STORE_DOMAIN + "/v4/identity/preferences";
			}

			$.ajax({
				headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin" : "*",
					"x-ecom-app-id" : "identity-store",
					"x-ecom-jwt" : jwtToken
					},
					url: apiUrl,
					type: "GET",
					dataType : "json",
					cache : true,
					xhrFields : {
						withCredentials: true
					},
					beforeSend : function(xhr){
						if(multiLanguageYN === "Y"){
							xhr.setRequestHeader("x-ecom-locale", hreflang);
						}
						
					},
					success: function (data) {
						if(data != null && data !== ""){
							if(SITE_CD === "pl"){ // pl 스토어 정책 동의 팝업 제거
								isAccepted = true;
							}else if(SITE_CD === "in"){
								if(data.terms_and_conditions.is_accepted !== true){
									isAccepted = false;
								}
							}else{
								if(data.consents != null && data.consents !== ""){
									consentsId = new Array(data.consents.length);
									for(var i = 0; i < data.consents.length; i++){
										var tempConsents = data.consents[i];
										consentsId[i] = tempConsents;
										if(tempConsents.data.is_required === true && tempConsents.is_accepted !== true){
											isAccepted = false;
										}
									}
								}
							}
							if(isAccepted === false){
								closeLayer();
								
								if (inMyGalaxyAppflag === "Y" || SITE_CD === "de"){
									$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
								} else {
									$showLayer = $privacyPopup;
								}
								
								popupLayer();
							}
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
					}
			});
		}

		function jwtTokenInit(xsdcxyn){
			
			var jwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
			var failLogin = function(){
				//20200319 :: _satellite 임시 주석처리 
//				_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "28");
//				_satellite.track("account");

				deleteSignCookie();
				deleteSACookie();
				
				$loginValidateYnForGPv2.val("N");
			};
			
			var getSAInfo = function(newJwtToken){
				// 새로 발급 받은 jwt cookie 유효성 체크
				var validateParamObj = {"jwt": newJwtToken};
				//us 국가 만 있음
				if(siteCode==="us"){
					var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
					
					var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
					var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
					
					if(epp_verified != null){
						epp_verified = epp_verified.toString();
						if(epp_verified=="true" && tmktid != null && tmktid != ''){
							validateParamObj["store_id"] = tmktid.toString();
						} else if(validateStoreId != null && validateStoreId != ""){
							validateParamObj["store_id"] = validateStoreId.toString();
						}
					}
					
					
				}
				var isJwtDetailsUse = false;
				// var _domain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://us.ecom-qa.samsung.com': 'https://www.samsung.com/us/api'
				$.ajax({
					headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin" : "*"
					},
					url: _domain + "/v1/sso/user/validate",
	    			type: "POST",
		    		dataType : "json",
			    	data: JSON.stringify (validateParamObj),
//					    async: false,
						xhrFields : {
						withCredentials: true
					},
					beforeSend : function(xhr){
						if(multiLanguageYN === "Y"){
							xhr.setRequestHeader("x-ecom-locale", hreflang);
						}
					},
				    success: function (data) {
					    if ( data.statusCode === 200 || data.statusCode === "200" ) {
					    	var validaJwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
					    	$loginValidateYnForGPv2.val("Y");
					    	
								var initSignin = function() {
								  if ($.cookies.get('xsdcxyn')) {
								      // user logged in
								      if ($.cookies.get('tppid') && $.cookies.get('tmktname')) {
								          // user is epp user
								          var eppIcon = $('<img src="' + $.cookies.get('tlgimg') + '">');
								          $('.epp-bar-logo').append(eppIcon);
								          var eppStoreName = $.cookies.get('tmktname') + ' Store';
								          $('.epp-bar-username').text(eppStoreName);
								          if ($.cookies.get('tppid') === '16568500') {
								              $('.gnb__utility-link.sea').removeClass('hidden');
								          }
								        $(".epp-bar-wrap").show();
								      }
								  } else {
								    if ($.cookies.get("tppid")) {
								      var mkt=$.cookies.get("xsdcxyn");
								      var timg=$.cookies.get("tlgimg");
								      var tname=$.cookies.get("tmktname");
								      if($.cookies.get("xsdcxyn")){
								        var uname=$.cookies.get("prof_fname")&&$.cookies.get("prof_fname")?$.cookies.get("prof_fname"):$.cookies.get("tmktname");
								        $(".epp-bar-logo img").remove();
								        $(".epp-bar-logo").append('<img src="'+timg+'"/>');
								        if(uname!="null"){
								          $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">'+tname+' Store'+'.</div> Please enjoy our special offers for you');
								        }else{
								          $(".epp-bar-msg").html('Welcome <div class="epp-bar-username">'+tname+'!</div> Please <div class="epp-bar-username"><a href="#" id="openLogin">login</a></div> to enjoy our special offers for you');
								        }
								        $(".epp-bar-wrap").slideDown();

								      }else if($.cookies.get("xsdcxyn") && $.cookies.get("tmktid")==="4145500" && $.cookies.get("tppid")==="17593200"){
								          $(".epp-bar-logo img").remove();
								          $(".epp-bar-logo").append('<img src="'+timg+'"/>');
								          $(".epp-bar-msg").html("Welcome to Samsung's Friends and Family Store! Enjoy special pricing. Please <div class='epp-bar-username'><a href='#' id='openLogin' style='font-size:12px;'>login/signup</a></div> to make a purchase.");
								          $(".epp-bar-wrap").slideDown();
									  } else if (window.AEMapp?.eppStore?.isTMOGuestUser()) {
										  $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">' + tname + ' Store' + '.</div>');
										  $(".epp-bar-wrap").slideDown();
									  } else {
								        $(".epp-bar-logo img").remove();
								        $(".epp-bar-logo").append('<img src="'+timg+'"/>');
								        $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username" style="color:#1428a0;">'+tname+' Store'+"!</div> Please <div class='epp-bar-username' style='color:#1428a0;'><a href='#' id='openLogin' style='color:#1428a0;'>login</a></div> to enjoy our special pricing.");

								        $(".epp-bar-wrap").slideDown();
								      }
								    }else{
								      $(".epp-bar-wrap").hide();
								    }
								  }
								}
								// check if it is US pages
								if(window.location.href.indexOf('/us/')> -1) {
									initSignin();
								}
								var rewardDomain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://sso-stg.us.samsung.com' : 'https://sso-us.samsung.com';
								if ($.cookie("rewards_tier") == null && $.cookie("rewards_tier") == undefined) {
									$.ajax({
										url: "https://www.samsung.com/us/api/ecom/v4/rewards/reward-points",
										method: 'GET',
										headers: {
											'x-ecom-jwt': $.cookies.get("jwt_USA", {domain : ".samsung.com"}),
										},
										crossDomain : true,
										xhrFields: {
										    withCredentials: true
									    },
									});
								}
					    	$.ajax({
					    		headers: {
							         "Cache-Control": "no-cache",
							         "Content-Type": "application/json",
							         "Access-Control-Allow-Origin" : "*",
							         "x-ecom-jwt" : validaJwtToken
					    		},
							    url: STORE_DOMAIN + "/v4/shopping-carts/",
				    			type: "POST",
					    		dataType : "json",
	                            data: JSON.stringify ({}),
	//							    async: false,
									xhrFields : {
										withCredentials: true
									},
									beforeSend : function(xhr){
										if(multiLanguageYN === "Y"){
											xhr.setRequestHeader("x-ecom-locale", hreflang);
										}
									},
									success: function(){
										var usCartCount = $.cookies.get("s_ecom_sc_cnt", {domain : ".samsung.com"});
										updateCartCounter(usCartCount);
									}
					    	});
					    	if ( data.user_info.firstname != null && data.user_info.firstname !== "" ) {
					    		$beforeLoginContext.addClass('hide');

									setUserName(data.user_info.firstname + " " + data.user_info.lastname,true);
						    }else{
						    	$.ajax({
						    		headers: {
								         "Cache-Control": "no-cache",
								         "Content-Type": "application/json",
								         "Access-Control-Allow-Origin" : "*"
						    		},
								    url: _domain + "/v1/sso/jwt/details",
					    			type: "POST",
						    		dataType : "json",
							    	data: JSON.stringify ({"jwt": validaJwtToken}),
//									    async: false,
									xhrFields : {
										withCredentials: true
									},
									beforeSend : function(xhr){
										if(multiLanguageYN === "Y"){
											xhr.setRequestHeader("x-ecom-locale", hreflang);
										}
									},
								    success: function (data) {
								    	if(data != null && data !== ""){
								    		if ( data.user_info.firstname != null && data.user_info.firstname !== "" ) {
								    			$beforeLoginContext.addClass('hide');
  												setUserName(data.user_info.firstname + " " + data.user_info.lastname,true);
												
										    }else{
										    	$beforeLoginContext.addClass('hide');
  												setUserName("User",true);
										    }
											isJwtDetailsUse = true;
											login_user_info.user_info = data.user_info;
                                            login_user_info.login_type = data.login_type;
                                            login_user_info.user_identity = data.user_identity;
								    	 }
								     }
						    	 });
						    }
							//in인경우 detail user info 
                            if(siteCode === "in" && !isJwtDetailsUse){
                                $.ajax({
                                    headers: {
                                         "Cache-Control": "no-cache",
                                         "Content-Type": "application/json",
                                         "Access-Control-Allow-Origin" : "*"
                                    },
                                    url: STORE_DOMAIN + "/v1/sso/jwt/details",
                                    type: "POST",
                                    dataType : "json",
                                    data: JSON.stringify ({"jwt": valideJwtToken}),
								  //async: false,
                                    xhrFields : {
                                        withCredentials: true
                                    },
                                    beforeSend : function(xhr){
                                        if(multiLanguageYN === "Y"){
                                            xhr.setRequestHeader("x-ecom-locale", hreflang);
                                        }
                                    },
                                    success: function (data) {
                                        if(data != null && data !== ""){
                                            login_user_info.user_info = data.user_info;
                                            login_user_info.login_type = data.login_type;
                                            login_user_info.user_identity = data.user_identity;
                                         }
                                     }
                                 });
                            }
						    // 정책동의 여부 체크
					    	// 2018.11.30 us shop 정책동의 spec 변경
					    	checkUsPreferences( newJwtToken );
					    } else {
					    	$.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
					    	// hide US EPP when invalid;
					    	$('.epp-bar-wrap').hide();
					    	failLogin();
					    }
				    },
				    error:function(jqXHR, textStatus, errorThrown){
				    	console.error(textStatus);
					    $.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
					    failLogin();
				    }
			    });
			};
			var reDCheck = function(){
				$.ajax({
					url: "/aemapi/v6/data-login/callSALogin."+siteCode+".json",
					type: "GET",
					dataType : "json",
					success: function (data) {

						var newJwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
						
				    	// 로그인 태깅용 함수 호출 - directCallFlv2 == N인 경우만
						callGAdirect();
						if(data.statusCode===200 && data.redCookieChk==="Y"){
							if ( newJwtToken ) {
								getSAInfo(newJwtToken);
  							} else {
							    failLogin();			
  							}
						} else if (data.redCookieChk === "N" && xsdcxyn){
							deleteSignCookie();
							deleteSACookie();
							
		                	saSignInGate();
		                } else {
		                	failLogin();
		                }
						
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.error(textStatus);
					    failLogin();
					}
				});
			};
			// var _domain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://us.ecom-qa.samsung.com': 'https://www.samsung.com/us/api'
			if (jwtToken) {
				var validateParamObj = {"jwt": jwtToken};
				//us 국가 만 있음
				var isUSEppGuestUser = false;
                var isJwtDetailsUse = false;
				if(siteCode==="us"){
					var epp_verified = $.cookies.get("epp_verified",{domain:".samsung.com"});
					
					var tmktid = $.cookies.get("tmktid",{domain:".samsung.com"});
					var validateStoreId = $.cookies.get("store_id", {domain:".samsung.com"});
					
					if(epp_verified != null){
						epp_verified = epp_verified.toString();
						if(epp_verified=="true" && tmktid != null && tmktid != ''){
							validateParamObj["store_id"] = tmktid.toString();
						} else if(validateStoreId != null && validateStoreId != ""){
							validateParamObj["store_id"] = validateStoreId.toString();
						}
					}
					
					// [US] epp guest user 체크
					$.ajax({
			    		headers: {
					         "Cache-Control": "no-cache",
					         "Content-Type": "application/json",
					         "Access-Control-Allow-Origin" : "*"
			    		},
					    url: _domain + "/v1/sso/jwt/details",
		    			type: "POST",
		    			async: false,
			    		dataType : "json",
			    		data: JSON.stringify ({"jwt": jwtToken}),
						xhrFields : {
							withCredentials: true
						},
					    success: function (data) {
							if (data) {
								updateUsEppGNB(data);
							}
					    	if(data != null && data !== "" && data.login_type != null && (data.login_type === "guest_epp_store"|| data.login_type === "referral_url")){
					    		isUSEppGuestUser = true;
					    		$.cookies.set("isUSGuestUser", "Y");
					    		$.cookies.del("snsSessionId");
					    		$.cookies.del("snsSessionId", {path:'/', domain:'.samsung.com'});
					    		$.cookies.del("isStoreLogedIn");
					    		$.cookies.del("sa_em");
					    		$.cookies.del("sa_em", {path:'/', domain:'.samsung.com'});
					    		$.cookies.del("eVar67");
					    		$.cookies.del("eVar67", {path:'/', domain:'.samsung.com'});
					    		$.cookies.del("lastName",{domain:".samsung.com"});
					    		$.cookies.del("firstName",{domain:".samsung.com"});
					    		$.cookies.del("guid",{domain:".samsung.com"});
					    		$.cookies.del("ReD",{domain:".samsung.com"});
					    		$.cookies.del("directCallFl",{expires: null, domain : ".samsung.com"});
					    		$.cookies.del("directCallFlv2",{expires: null, domain : ".samsung.com"});
					    		$.cookies.del("returnURL",{domain:".samsung.com"});
					    		$.cookies.del("mVal10",{domain:".samsung.com"});
					    		$.cookies.del("mVal11",{domain:".samsung.com"});
					    		$.cookies.del("flpe",{domain:".samsung.com"});

					    		deleteLoginRequestCookie();
					    		deleteSACookie();
					    		
					    		$loginValidateYnForGPv2.val("N");
					    	 } else {
					    		$.cookies.set("isUSGuestUser", "N");
					    	 }
					     }
			    	 });
				}
				if(!isUSEppGuestUser){
					// jwt cookie 가 있으면 유효성 체크
						
				    $.ajax({
					    headers: {
					          "Cache-Control": "no-cache",
					          "Content-Type": "application/json",
					          "Access-Control-Allow-Origin" : "*"
			            },
					    url: _domain + "/v1/sso/user/validate",
		    			type: "POST",
			    		dataType : "json",
				    	data: JSON.stringify (validateParamObj),
//					    async: false,
						xhrFields : {
							withCredentials: true
						},
						beforeSend : function(xhr){
							if(multiLanguageYN === "Y"){
								xhr.setRequestHeader("x-ecom-locale", hreflang);
							}
						},
					    success: function (data) {
						    if ( data.statusCode === 200 || data.statusCode === "200" ) {
						    	var valideJwtToken = $.cookies.get("jwt_"+countryIsoCode, {domain:".samsung.com"});
						    	$loginValidateYnForGPv2.val("Y");
						    	// 로그인 태깅용 함수 호출 - directCallFlv2 == N인 경우만
									callGAdirect();
						    	
						    	if ( data.user_info.firstname != null && data.user_info.firstname !== "" ) {
						    		$beforeLoginContext.addClass('hide');
									
										var guid = $.cookies.get("guid",{domain:".samsung.com"});
										if(fnIsNull(guid)){ // otp login user
											setUserName(data.user_info.firstname + " " + data.user_info.lastname,true, true);
										} else {
											setUserName(data.user_info.firstname + " " + data.user_info.lastname,true);
										}
							    }else{
                                    
							    	$.ajax({
							    		headers: {
									         "Cache-Control": "no-cache",
									         "Content-Type": "application/json",
									         "Access-Control-Allow-Origin" : "*"
							    		},
									    url: _domain + "/v1/sso/jwt/details",
						    			type: "POST",
							    		dataType : "json",
								    	data: JSON.stringify ({"jwt": valideJwtToken}),
//									    async: false,
											xhrFields : {
											withCredentials: true
										},
										beforeSend : function(xhr){
											if(multiLanguageYN === "Y"){
												xhr.setRequestHeader("x-ecom-locale", hreflang);
											}
										},
								    success: function (data) {
								    	if(data != null && data !== ""){
								    		if ( data.user_info.firstname != null && data.user_info.firstname !== "" ) {
								    			$beforeLoginContext.addClass('hide');
  												setUserName(data.user_info.firstname + " " + data.user_info.lastname,true, true);
                                                  
										    }else{
										    	$beforeLoginContext.addClass('hide');
  												setUserName("User",true, true);
										    }
												isJwtDetailsUse = true;
                        login_user_info.user_info = data.user_info;
                        login_user_info.login_type = data.login_type;
                        login_user_info.user_identity = data.user_identity;
								    	}
							     	}
						    	 });
							    }
                  //in인경우 detail user info 
                  if(siteCode === "in" && !isJwtDetailsUse){
                      $.ajax({
                          headers: {
                               "Cache-Control": "no-cache",
                               "Content-Type": "application/json",
                               "Access-Control-Allow-Origin" : "*"
                          },
                          url: STORE_DOMAIN + "/v1/sso/jwt/details",
                          type: "POST",
                          dataType : "json",
                          data: JSON.stringify ({"jwt": valideJwtToken}),
//                                      async: false,
                          xhrFields : {
                              withCredentials: true
                          },
                          beforeSend : function(xhr){
                              if(multiLanguageYN === "Y"){
                                  xhr.setRequestHeader("x-ecom-locale", hreflang);
                              }
                          },
                          success: function (data) {
                              if(data != null && data !== ""){
                                  login_user_info.user_info = data.user_info;
                                  login_user_info.login_type = data.login_type;
                                  login_user_info.user_identity = data.user_identity;
                               }
                           }
                       });
                  }
						    	// 정책동의 여부 체크
						    	// 2018.11.30 us shop 정책동의 spec 변경
						    	checkUsPreferences( jwtToken );
						    	var rewardDomain = window.location.hostname.indexOf('stgwebus') > -1 ? 'https://sso-stg.us.samsung.com' : 'https://sso-us.samsung.com';
								if ($.cookie("rewards_tier") == null && $.cookie("rewards_tier") == undefined) {
									$.ajax({
										url: "https://www.samsung.com/us/api/ecom/v4/rewards/reward-points",
										method: 'GET',
										headers: {
											'x-ecom-jwt': $.cookies.get("jwt_USA", {domain : ".samsung.com"}),
										},
										crossDomain : true,
										xhrFields: {
										    withCredentials: true
									    },
									});
								}
						    }else{
//						    	$.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});

						    	reDCheck();
						    }
					    },
					    error:function(jqXHR, textStatus, errorThrown){
						    console.error(textStatus);
						    console.log(jqXHR);
						    
						    //2019.10.10 epp jwt 토큰 쿠키 삭제 방지 로직 추가
						    if(jqXHR.responseJSON == undefined || jqXHR.responseJSON.error !== "StoreIdNotPresent"){
//							    $.cookies.del("jwt_"+countryIsoCode, {domain:".samsung.com"});
						    	reDCheck();
						    } else {
						    	$loginValidateYnForGPv2.val("N");
						    }
					    }
				    });
				}
		    } else {
		    	// sa login 일 경우 jwt cookie 가 유효 하지 않으면 cookie 재발급
 		    	if(xsdcxyn){
			    	reDCheck();
		    	} else {
		    		$loginValidateYnForGPv2.val("N");
		    	}
		    }
		    
		}
		
		// 초기화
		//new-hybris
		function init() {
			var useLogin = (!IS_B2B || (IS_B2B && $("#useLogin").val() == "Y" && loginLinkURL != null && loginLinkURL != '')) ? true : false;
			// 토큰 값이 있을 경우 로그인 되었다고 판단해서 아이콘의 text 변경
			//var token = $.cookies.get("iPlanetDirectoryPro", {domain : ".samsung.com"});
			var snsSessionId = $.cookies.get("snsSessionId", {domain : ".samsung.com"});
			var xsdcxyn = $.cookies.get("xsdcxyn", {domain : ".samsung.com"});
			// 2021.04.12 B2B 로그인 추가
			var xsdcbxyn = $.cookies.get("xsdcbxyn", {domain : ".samsung.com"});
			
			
			// estoreLoginRequesting 쿠키 값이 있으면 로그인 요청
			var estoreLoginRequesting = $.cookies.get("estoreLoginRequesting", {domain : ".samsung.com"}) === "Y" ? true : false;
			
			// 쿠키에 저장된 ID 가져오기
			getRememberId();
			
			// 로그인 태깅용 함수 호출 - directCallFlv2 == N인 경우만
			callGAdirect();
			
			// mx, co mobile 페이지 이슈로 먼저 초기화 수행(임시)
			$beforeLoginContext.removeClass('hide');
			
			// 닷컴에서 로그인처리된 경우(YG) => 로그인아이콘 및 이름 표시
			// 2021.04.12 B2B 로그인 추가
			if(useLogin){
			if ((!IS_B2B && (xsdcxyn === "YG" || xsdcxyn === "YH") && firstName && lastName) || (IS_B2B && xsdcbxyn)) {
				if (USE_ESTORE && !isVtexStore) {
					var exceptionReferrerDomain = false;

					if (!estoreLoginRequesting) {
						var exceptionDomains = [".samsung.com"];

						for (var i = 0; i < exceptionDomains.length; i++) {
							if (document.referrer.indexOf(exceptionDomains[i]) > -1) {
								exceptionReferrerDomain = true;
								break;
							}
						}

						// ex) www.samsung.com/uk 로 접속 시 home으로 리다이렉팅 되어서 이전 페이지가 samsung.com 페이지가 되기 때문에 이 경우에 예외 처리
						if (exceptionReferrerDomain) {
							var dotcomSites = ["www.samsung.com", "dev.samsung.com", "p4.samsung.com", "stgweb4.samsung.com", "ptcweb4.samsung.com", "local.dev.my.eu.samsung.com", "dev.my.eu.samsung.com", "stg.my.eu.samsung.com", "my.eu.samsung.com","www.eumysamsung.com","stg-account.samsung.com","account.samsung.com", "local.sec.samsung.com", "dev-aem.samsung.com", "stg-aem.samsung.com", "itg-aem.samsung.com", "aem.samsung.com", "org-aem.samsung.com", "qaweb.samsung.com", "org-qaweb.samsung.com", "org-ap.samsung.com","org-eu.samsung.com", "org-aem-eu.samsung.com", "aem-eu.samsung.com", "org-qashop.samsung.com", "qashop.samsung.com", "pre-qa.samsung.com", "pre-qa2.samsung.com", "p6-pre-qa.samsung.com", "p6-pre-qa2.samsung.com"];
							var refererPage = document.referrer.replace(/http(s)?:\/\//, "");
							var indexPage = "";
							for (var j = 0; j < dotcomSites.length; j++) {
								if (SITE_CD === "es" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "ru" || SITE_CD === "ae" || SITE_CD === "ae_ar"  || SITE_CD === "uk"
									|| SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz" || SITE_CD === "it"
									|| SITE_CD === "au" || SITE_CD === "cn" || SITE_CD === "ca" || SITE_CD === "ca_fr" || SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at" 
									|| SITE_CD === "my" || SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD == "eg" || SITE_CD == "levant" || SITE_CD == "levant_ar" || SITE_CD == "za" || SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu"
									|| SITE_CD == "n_africa" || SITE_CD == "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
									|| isNewHybris || IS_B2B) {					//new-hybris
									if(dotcomSites[j] === "account.samsung.com" || dotcomSites[j] === "stg-account.samsung.com"){
										indexPage = dotcomSites[j] + "/";
									}else{
										indexPage = dotcomSites[j] + "/" + SITE_CD + "/";
									}

									if (refererPage.indexOf(indexPage) > -1 && $.cookies.get("isStoreLogedIn") !== "Y") {
										exceptionReferrerDomain = false;
										break;
									}
								} else {
									indexPage = dotcomSites[j] + "/" + SITE_CD + "/";

									if (indexPage.indexOf(refererPage) > -1 && $.cookies.get("isStoreLogedIn") !== "Y") {
										exceptionReferrerDomain = false;
										break;
									}
								}
							}
						}
					}

					// 외부에서 접속 시 스토어 로그인 요청
					if (!exceptionReferrerDomain) {
						// Store Login 후 콜백 함수
						nextGenLoginResult = function(data) {

							// 자격 제한 유저
							if (data.resultCode !== "0000") {
								// blacklist 일 경우
								if (data.resultCode === "903" || data.resultCode === 903) {
									popupLayer("BA");
								} else {
									if (data.customerStatus)
										popupLayer(data.customerStatus);
									else
										popupLayer("UK");
								}

								// estoreLoginRequesting 쿠키 삭제
								deleteLoginRequestCookie();

								return;
							}

							// 처음 접속 유저
							// AU, DE, LATIN, TW, UK, RU, AE, AE_AR, VN, TH, SA, SA_EN, NZ, FR, NL, BE, BE_FR, SE,DK,FI,NO,AT,MY,SK,CZ Shop Integration Hybris 6.0
							if ((!data.hasAddInfo && (SITE_CD === "au" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "ru" 
								|| SITE_CD === "ae" || SITE_CD === "ae_ar" || SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz"
								|| SITE_CD === "ca" || SITE_CD === "ca_fr"  || SITE_CD === "uk"
								|| SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at" || SITE_CD === "my"
								|| SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD == "eg" || SITE_CD == "levant" || SITE_CD == "levant_ar" || SITE_CD == "za" || SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu"
								|| SITE_CD == "n_africa" || SITE_CD == "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
								|| isNewHybris || IS_B2B								//new-hybris
								|| ((SITE_CD === "es" || SITE_CD === "it") && STORE_DOMAIN.indexOf("https://") > -1))) || (!data.hasAddInfo && SITE_CD !== "cn")) {
								if (policyCheckSite) {
									// 2014.06.13 스페인 요청으로 스토어 로그인 요청하기전 정책 동의 프로세스 변경
									updateAgreePolicy();
								} else {
									if (inMyGalaxyAppflag === "Y" || SITE_CD === "de"){
										$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
									} else {
										$showLayer = $privacyPopup;
									}
									popupLayer();
								}
							}

							setSignButtonText(true);

							// 해당 쿠키가 있으면 getCartCount 호출
							if ($.cookies.get("estoreLoginRequesting", {domain : ".samsung.com"}) === "Y") {
								// estoreLoginRequesting 쿠키 삭제
								deleteLoginRequestCookie();

								ss.Auth.getGlobalCartCount();
							}

							// wishlist 동기화
							syncWishlist();

							// index 페이지로 들어왔을 경우 store 로그인이 되어 있는지 판단 하기 위한 쿠키
							$.cookies.set("isStoreLogedIn", "Y");
						};

						// 스토어 로그인 요청 중을 나타내는 쿠키 생성
						$.cookies.set("estoreLoginRequesting", "Y", {domain : ".samsung.com"});
						
						var storeDomainTemp = "";
						var sessionCheckUrl = "";
						storeDomainTemp = STORE_DOMAIN.split("/")[2];
						//new-hybris
						if(isNewHybris || IS_B2B) storeDomainTemp = storeWebDomain.split("/")[2];
						sessionCheckUrl = "https://" + storeDomainTemp + "/" + SITE_CD + "/ng/p4v1/sessionCheck";

						if(IS_B2B){
							sessionCheckUrl = storeWebDomain + "/ng/p4v1/sessionCheck";
						}

						if(SITE_CD == "levant"){
							sessionCheckUrl = "https://" + storeDomainTemp + "/" + "jo" + "/ng/p4v1/sessionCheck";
						} else if(SITE_CD == "levant_ar"){
							sessionCheckUrl = "https://" + storeDomainTemp + "/" + "jo_ar" + "/ng/p4v1/sessionCheck";
						} else if(SITE_CD == "n_africa"){
							sessionCheckUrl = "https://" + storeDomainTemp + "/" + "ma" + "/ng/p4v1/sessionCheck";
						}
							
						if(hybrisApiJson){		// jsonp -> json 으로 분기
							try {
								$.ajax({
									url: sessionCheckUrl,
									type: "GET",
									data : {
										"ssoID" : guid
									},
									dataType : "json",
									xhrFields: { withCredentials: true },
									contentType : "application/x-www-form-urlencoded",
									crossDomain : true,
									success: function (data) {
										var isLogedIn = data.resultCode === "0000" ? true : false;
																				
										if (!isLogedIn) { // 스토어로그인 안되어 있을때
											//20200319 :: _satellite 임시 주석처리 
//											_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "28");
//											_satellite.track("account");

											ss.Auth.signOut();
										} else { // 스토어로그인 되어 있을때
											nextGenLoginResult(data);
										}
									},
									error:function(jqXHR, textStatus, errorThrown){
										//20200319 :: _satellite 임시 주석처리 
//										_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "29");
//										_satellite.track("account");

										estoreLive = false;
										}
								});

								if (!estoreLive) {
									ss.Auth.signOut();
								}
							} catch (e) {
								//20200319 :: _satellite 임시 주석처리 
//								_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "29");
//								_satellite.track("account");

								estoreLive = false;
							}
						} else if(SITE_CD === "es" || SITE_CD === "latin" || SITE_CD === "tw" || SITE_CD === "ru" || SITE_CD === "ae" || SITE_CD === "ae_ar" 
							|| SITE_CD === "vn" || SITE_CD === "th" || SITE_CD === "sa" || SITE_CD === "sa_en" || SITE_CD === "nz" || SITE_CD === "it" || SITE_CD === "au" 
							|| SITE_CD === "se" || SITE_CD === "dk" || SITE_CD === "fi" || SITE_CD === "no" || SITE_CD === "at"  || SITE_CD === "uk"
							|| SITE_CD === "my" || SITE_CD === "pt" || SITE_CD === "sg" || SITE_CD === "us" || SITE_CD === "eg" || SITE_CD == "levant" || SITE_CD == "levant_ar" || SITE_CD == "za" || SITE_CD == "hk" || SITE_CD == "hk_en" || SITE_CD == "hu"
							|| SITE_CD == "n_africa" || SITE_CD == "pk" || SITE_CD == "ch" || SITE_CD == "ch_fr" || SITE_CD == "il"
							|| isNewHybris || IS_B2B) {			//new-hybris
							// ES, DE, LATIN, TW, UK, RU, AE, AE_AR, VN, TH, SA, SA_EN, NZ, IT, FR, NL, AU, BE, BE_FR, SE, DK, FI, NO, AT, MY, SK, CZ Shop Integration Hybris 6.0
							try {
								$.ajax({
									url: sessionCheckUrl,
									type: "GET",
									dataType : "jsonp",
									data : {
										"ssoID" : guid
									},
									jsonp : "callback",
									success: function (data) {
										var isLogedIn = data.resultCode === "0000" ? true : false;
										
										if(SITE_CD === "latin") {
											isLogedIn = true;
											data.hasAddInfo = true;
										}
																				
										if (!isLogedIn) { // 스토어로그인 안되어 있을때
											//20200319 :: _satellite 임시 주석처리 
//											_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "28");
//											_satellite.track("account");

											ss.Auth.signOut();
										} else { // 스토어로그인 되어 있을때
											nextGenLoginResult(data);
										}
									},
									error:function(jqXHR, textStatus, errorThrown){
										//20200319 :: _satellite 임시 주석처리 
//										_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "29");
//										_satellite.track("account");

										estoreLive = false;
										}
								});

								if (!estoreLive) {
									ss.Auth.signOut();
								}
							} catch (e) {
								//20200319 :: _satellite 임시 주석처리 
//								_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm") + "29");
//								_satellite.track("account");

								estoreLive = false;
							}
						} else if(SITE_CD === "cn"){
							$("body").append("<iframe id='storeLoginIframe' src='" + STORE_DOMAIN + "/" + SITE_CD + "/ng/p4v1/login' style='display:block;width:0px;height:0px;border:none;'></iframe>");

							// 스토어 서버 살아 있는지 체크
							$("#storeLoginIframe").load(function() {
								$("#storeLoginIframe").unbind("load");

								try {
									var storeLoginIframcContentWindow = document.getElementById("storeLoginIframe").contentWindow;
									storeLoginIframcContentWindow.postMessage("","*");
									var timeCount = 0;
									storeDomainTemp = STORE_DOMAIN.split("/")[2];

									$.ajax({
										url: "https://" + storeDomainTemp + "/" + SITE_CD + "/ng/p4v1/getSessionCheck",
										type: "GET",
										dataType : "jsonp",
										jsonp : "callback",
										success: function (data) {
											var isLogedIn = data.resultCode === "0000" ? true : false;
											var loginF = "N";
											timeCount ++;

											if (!isLogedIn) { // 스토어로그인 안되어 있을때
												//20200319 :: _satellite 임시 주석처리 
//												_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm")+"|case1");
//												_satellite.track("account");

												setTimeout((function(data) {
													return function() {
														Time(data);
													};
												})(data) , 6000);

												function Time(data) {
													timeCount ++;

													$.ajax({
														url: "https://" + storeDomainTemp + "/" + SITE_CD + "/ng/p4v1/getSessionCheck",
														type: "GET",
														dataType : "jsonp",
														jsonp : "callback",
														success: function (data) {
															var isLogedIn = data.resultCode === "0000" ? true : false;
																loginF = "N";
																if (!isLogedIn) { // 스토어로그인 안되어 있을때
																	//20200319 :: _satellite 임시 주석처리 
//																	_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm")+"|case2");
//																	_satellite.track("account");

																	if(timeCount = 1 && loginF === "Y"){
																		loginF = "N";

																		setTimeout((function(data) {
																			timeCount = 2;
																			return function() {
																				Time(data);
																			};
																		})(data) , 5000);
																	}else if(loginF === "N"){
																		ss.Auth.signOut();
																	}else{
																		ss.Auth.signOut();
																	}
																} else { // 스토어로그인 되어 있을때
																	timeCount = 0;
																	nextGenLoginResult(data);
																}
														},
														error:function(jqXHR, textStatus, errorThrown){
															//20200319 :: _satellite 임시 주석처리 
//															_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm")+"|case3");
//															_satellite.track("account");

															estoreLive = false;
														}
													});
												}
											} else { // 스토어로그인 되어 있을때
												timeCount = 0;
												nextGenLoginResult(data);
											}
										},
										error:function(jqXHR, textStatus, errorThrown){
//											_satellite.setVar("account","login:samsung account|fail:" + new Date().format("yyyyMMddHHmm")+"|case3");
//											_satellite.track("account");
											
											estoreLive = false;
										}
									});

									if (!estoreLive) {
										ss.Auth.signOut();
									}
								} catch (e) {
									estoreLive = false;
									ss.Auth.signOut();
								}
							});
						}
					// end !exceptionReferrerDomain
					} else {
						if(SITE_CD === "es"){
							closeLayer();
						}
						setSignButtonText(true);

						// sign complete
						if ($.EstoreIfQueue)
							$.EstoreIfQueue.setIsSignReady(true);
					}
				// end USE_ESTORE
				} else if(isLoginWithNoStore || isVtexStore) { /* + 비스토어 로그인 */
					setSignButtonText(true);
				}
			// end check token
			} else if(xsdcxyn && !IS_B2B) {// YG 아닌 다른 사이트 로그인된 상태에서는 SignInGate 호출
//				if(SITE_CD === "br" || SITE_CD === "ca" || SITE_CD === "ca_fr"){ // 독자적인 로그인 보유국
				if(SITE_CD === "br"){ // 독자적인 로그인 보유국
					returnURL = window.location.href;
					//$.cookies.del("xsdcxyn");
					//$.cookies.del("xsdcxyn", {path:'/', domain:'.samsung.com'});
					deleteSACookie();
					$.cookies.set("returnURL", returnURL, {domain : ".samsung.com"});
					
//					if(SITE_CD === "ca") {
//						window.location.href = "https://www.samsung.com/ca/samsungaccount/?gohome=Y";
//					} else if (SITE_CD === "ca_fr") {
//						window.location.href = "https://www.samsung.com/ca_fr/samsungaccount/?gohome=Y";
//					} else {
						window.location.href = loginLinkURL;
//					}
				}else {
					saSignInGate();
				}
			} else if (snsSessionId) {
				setSignButtonText(true);

				// wishlist 동기화
				if (USE_ESTORE)
					syncWishlist();
			} // end check snsSessionId

			/**
			 * [B2B] SMB check cookie 생성 :: S 
			 * 
			 * isSMBRegisterdUserYN : SMB USER Check Cookie
			 * goSMBREgisterYN : PF / PD / Offer 에서 register user 버튼 클릭 여부 ( Y 일 경우 > smb user 가 아니면 register 페이지로 이동 )
			 * useSMBCookiePaths : isSMBRegisterUserYN 쿠키를 셋팅한 path 리스트 > 로그아웃 시 쿠키 제거를 위해 사용함 
			 * 
			*/
			if(IS_B2B && xsdcbxyn && guid != null && $("#shopIntegrationFlag").val() === "true"){
				const isSMBRegisteredUserYN = $.cookies.get("isSMBRegisteredUserYN");
				const goSMBRegisterYN = $.cookies.get("goSMBRegisterYN");
				const smbRegisterUrl = $.cookies.get("smbRegisterUrl");

				let useSMBCookiePaths = $.cookies.get("useSMBCookiePaths");
				if(useSMBCookiePaths == null){
					useSMBCookiePaths = '';
				}

				$.cookies.del("goSMBRegisterYN", {path:'/', domain:'.samsung.com'});
				$.cookies.del("smbRegisterUrl", {path:'/', domain:'.samsung.com'});

				if(!isSMBRegisteredUserYN || goSMBRegisterYN =='Y'){
					const getCustomerUrl = STORE_DOMAIN+ "/tokocommercewebservices/v2/"+STORE_SITE_CODE+"/users/current/getCustomer"
	
					$.ajax({
						url: getCustomerUrl,
						type: "GET",
						dataType : "json",
						async: false,
						xhrFields: { withCredentials: true },
						crossDomain: true,
						beforeSend: function () {},
						success: function (data) {
							if(data != null && data.customer != null ){
								const customerDataJson = data.customer;
								const isSMBUser = customerDataJson.isSMBRegisteredUser;
								const smbCookiePath = '/' + SITE_CD + '/';
								if(isSMBUser==true){
									$.cookies.set("isSMBRegisteredUserYN", "Y", {path : smbCookiePath, domain : ".samsung.com"});
									useSMBCookiePaths += smbCookiePath + ';';
								} else {
									if(goSMBRegisterYN == 'Y'){
										document.location.href = smbRegisterUrl;
									} else {
										$.cookies.set("isSMBRegisteredUserYN", "N", {path : smbCookiePath, domain : ".samsung.com"});
										useSMBCookiePaths += smbCookiePath + ';';
									}
								}
								
								$.cookies.set("useSMBCookiePaths", useSMBCookiePaths, {path : '/', domain : ".samsung.com"}); // 로그아웃시 쿠키 제거
	
							}
						},
						error:function(req){
							if(req.status=='401'){  
								ss.Auth.signOut();
							}
						}
					});
				}
				
			}
			/*[B2B] SMB check cookie 생성 :: E */
			if($.cookies.get("isSMBRegisteredUserYN") =='Y'){
				$('li.js-smb-user-only-menu').show();
			} else {
				$('li.js-smb-user-only-menu').remove();
			}

			}

			
			// getCartCount 호출
			ss.Auth.getGlobalCartCount();

			// AU Hybris 6.0 // DE Hybris 6.0 // FR Hybris 6.0
//			if(USE_ESTORE){
//				setMyMenu(true);
//			}

			var query = getQueryParams(document.location.search);

			// 자격 제한 유저
			if (query.customerStatus != null || query.isblock != null) {
				// blacklist 일 경우
				if (query.isblock && query.isblock === "true") {
					popupLayer("BA");
				} else {
					if (data.customerStatus)
						popupLayer(data.customerStatus);
					else
						popupLayer("UK");
				}
			}
		}

		// 2014.06.13 스페인 요청으로 스토어 로그인 요청하기전 정책 동의 프로세스 변경
		function policyCheck() {
			// 토큰 값이 있을 경우 로그인 되었다고 판단해서 아이콘의 text 변경
			//var token = $.cookies.get("iPlanetDirectoryPro", {domain:".samsung.com"});
			var xsdcxyn = $.cookies.get("xsdcxyn", {domain : ".samsung.com"});
			var guid = $.cookies.get("guid",{domain:".samsung.com"});
			// 2021.04.12 B2B 로그인 추가
			var xsdcbxyn = $.cookies.get("xsdcbxyn", {domain : ".samsung.com"});
			
			if ( gnbUsApiUse && !IS_B2B) {
				// 토큰 값이 있을 경우에만 로그인 체크
				if(xsdcxyn){
					initUs(xsdcxyn);
				}else{
					initUs();
				}
			} else {
				if (((xsdcxyn && !IS_B2B) || (xsdcbxyn && IS_B2B)) && policyCheckSite) {
					var storeUrl = STORE_DOMAIN + "/" + STORE_SITE_CODE;
					if(IS_B2B){
						storeUrl = storeWebDomain;
					}

					$.ajax({
						url: storeUrl + "/ng/p4v1/getGuidCheckInfo",
						type: "GET",
						dataType : "jsonp",
						data : {
							"ssoID" : guid
						},
						jsonp : "callback",
						beforeSend: function () {},
						success: function (data) {
							if (data.resultCode === "0000") {
								// 처음 접속 유저
								if (data.resultValue === "N") {
									closeLayer();
	
									if (inMyGalaxyAppflag === "Y" || SITE_CD === "de"){
										$showLayer = null; // in이면서 user-agent 정보중에 MyGalaxy 또는 SamsungShopSDK 라는 string이 있는 경우 팝업을 띄우지 않음
									} else {
										$showLayer = $privacyPopup;
									}
									
									popupLayer();
								} else {
									init();
								}
							} else {
								ss.Auth.signOut();
							}
						},
						error:function(jqXHR, textStatus, errorThrown){
							console.error(textStatus);
						}
					});
				} else {
					init();
				}
			}
		}
		setElement();
		if(!IS_EPP){
			setEvent();
			policyCheck();
		} else {
			initEpp();
		}
	};

} (jQuery));

new ss.Sign();
(() => {
  window.AEMapp = window.AEMapp || {};
  window.AEMapp.eppStore = window.AEMapp.eppStore || {};

  window.AEMapp.eppStore.isRealEppUser = () => {
    var jwt_usa = $.cookies.get('jwt_USA');
    var tmktId = $.cookies.get('tmktid');
    var accessType = $.cookies.get('taccessrtype') || '';
    return !!jwt_usa && !!tmktId && !!~accessType.toLowerCase().indexOf('email');
  };

  window.AEMapp.eppStore.isUnverifiedEppUser = () => {
    var tmktId = $.cookies.get('tmktid');
    var accessType = $.cookies.get('taccessrtype') || '';
    var jwt_usa = $.cookies.get('jwt_USA');
    return !!jwt_usa && !!tmktId && accessType.toLowerCase().indexOf('email') == -1;
  };

  window.AEMapp.eppStore.setEppStoreCookie = (apiResponse) => {
    var store = apiResponse && apiResponse.store_info;
    var cookieOption = {path: '/', domain: '.samsung.com'};
    $.cookies.set('jwt_USA', apiResponse.jwt, cookieOption);
    $.cookies.set('epp_verified', apiResponse.epp_verified, cookieOption);
    $.cookies.set('tmktname', store.store_disp_name, cookieOption);
    $.cookies.set('tmktid', store.store_id, cookieOption);
    $.cookies.set('tlgimg', store.image_logo_url, cookieOption);
    $.cookies.set('tppid', store.legacy_plan_id, cookieOption);
    $.cookies.set('tsgmt', store.store_segment, cookieOption);
  };

  window.AEMapp.eppStore.clearEppStoreCookie = () => {
    var cookieOption = {path: '/', domain: '.samsung.com'};
    $.cookies.del('tmktname', cookieOption);
    $.cookies.del('tmktid', cookieOption);
    $.cookies.del('tlgimg', cookieOption);
    $.cookies.del('tppid', cookieOption);
    $.cookies.del('tsgmt', cookieOption);
    $.cookies.del('epp_verified', cookieOption);
    //$.cookies.del('jwt_USA');
  }

  window.AEMapp.eppStore.getEcomURL = () => {
    var url = 'https://www.samsung.com/us/api/ecom';
    if (~window.location.href.indexOf('stgwwwus')) url = 'https://us.ecom-qa.samsung.com';
    if (~window.location.href.indexOf('stgwebus')) url = 'https://us.ecom-stg.samsung.com';
    if (~window.location.href.indexOf('stgcl')) url = 'https://us.ecom-stg.samsung.com';
    return url;
  }

  window.AEMapp.eppStore.getEppStore = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/us/smg/content/samsung/content-library/prepurchase/eppdiscount/epp-discount.json',
        method: 'GET',
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          resolve({"eppDiscounts":[{"storeId":"4789741110","label":"Education Discounts"},{"storeId":"654345","label":"First Responders Discounts"},{"storeId":"4789760945","label":"Government Discounts"},{"storeId":"3485000","label":"Workplace Discounts"},{"storeId":"4789760940","label":"Military Discounts"}]});
        }
      })
    });
  }

  window.AEMapp.eppStore.exitStore = () => {
    if ($.cookies.get('jwt_USA')) {
      $.ajax({
        url: window.AEMapp.eppStore.getEcomURL() + '/v1/sso/user/private-store/exit-store',
        method: 'GET',
        headers: {
          'x-ecom-jwt': $.cookies.get('jwt_USA')
        },
        success: function(res) {
          if (res && res.jwt) {
            $.cookies.set('jwt_USA', res.jwt, {path: '/', domain: '.samsung.com'});
          } else {
            $.cookies.del('jwt_USA', {path: '/', domain: '.samsung.com'});
          }
        },
        fail: function() {
          $.cookies.del('jwt_USA', {path: '/', domain: '.samsung.com'});
        }
      })  
    }
    window.AEMapp.eppStore.clearEppStoreCookie();
  }

  window.AEMapp.eppStore.updateGNBCartSaving = () => {
    function calcCartSaving(ltms, total) {
      _.each(ltms, function(ltm) {
        var qty = ltm.quantity;
        var saving = (ltm.line_item_cost.unit_list_price * 100 - ltm.line_item_cost.unit_price * 100) / 100;
        total = (100 * saving * 1000 * qty / 1000 + 100 * total) / 100;
        if (ltm.line_items && Object.keys(ltm.line_items).length > 0) {
          total = calcCartSaving(ltm.line_items, total);
        }
      });
      return total;
    }

    if(!location.href.includes("/web/app/cart") && !location.href.includes("/web/app/checkout") && !location.href.includes("/web/express/assisted-checkout")){
      if (($.cookies.get('remoteId') || $.cookies.get('xsdcxyn')) && $.cookies.get('tppid') && $.cookies.get('s_ecom_sc_cnt') >= 1) {
        $.ajax({ 
          type: 'POST', 
          url: window.AEMapp.eppStore.getEcomURL() + '/v4/shopping-carts/fetch-cart', 
          headers: {
            'x-ecom-jwt': $.cookies.get('jwt_USA'),
            'x-ecom-app-id': 'temp'
          },
          contentType: 'application/json',
          data:  JSON.stringify({}),
          xhrFields: {
            withCredentials: true,
            crossDomain: true,
          }
        }).then((res) => {
          var cartSavings = calcCartSaving(res.line_items, 0);
          if (cartSavings) {
            if ($('.epp-bar-save').length > 0) {
              $('.epp-bar-save').html('You will save <b>$' + cartSavings.toFixed(2) + '</b> on this purchase.')
            } else {
              $('.epp-bar-msg').after('<span class="epp-bar-save">You will save <b>$' + cartSavings.toFixed(2) + '</b> on this purchase.</span>')
            }
          }
        })
      } else {
        $('.epp-bar-save').remove();
      }
    } else {
      $('.epp-bar-save').remove();
    }
  }

  window.AEMapp.eppStore.updateEppGNB = (programName, pageTrack) => {
    var offerMap = {
      'education': '/us/shop/discount-program/education/',
      'first responder': '/us/shop/discount-program/first-responders/',
      'government': '/us/shop/discount-program/government/',
      'employee': '/us/shop/discount-program/workplace/',
      'military': '/us/shop/discount-program/military/',
    };
    var segment = $.cookies.get('tsgmt') || '';
    var offerUrl = offerMap[segment.toLowerCase()] || '/us/shop/discount-program/';

    var gnb = $('.epp-bar-wrap');
    gnb.show();

    gnb.addClass('gnb-edited');
    var msg = gnb.find('.epp-bar-msg');
    msg.empty();
    var benfit = gnb.find('.benfit-wrap');
    benfit.empty();
    var logo = gnb.find('.epp-bar-logo');
    logo.empty();
    if ($.cookies.get('tlgimg')) {
      logo.append('<img src=' + $.cookies.get('tlgimg') + ' />');
    }

    if (window.EcommFlutterClient) {
      window.EcommFlutterClient.onmessage = ({ data }) => {
        const { name, data: { status } } = JSON.parse(data);
        if (name === "isSignedInStatus") {
          window.isShopSignedIn = status;
        }
      };

      window.EcommFlutterClient.postMessage(
        JSON.stringify({
            name: "isSignedIn",
            params: { callbackEvent: "isSignedInStatus" }
        })
      );
    }

    if ($.cookies.get('remoteId') || $.cookies.get('xsdcxyn') || window.isShopSignedIn || window.AEMapp?.eppStore?.isTMOGuestUser()) {
      msg.append('Welcome to the <div class="epp-bar-username">' + programName + ' Store!</div>');
    } else {
      msg.append('Welcome to the <div class="epp-bar-username">' + programName + ' Store!</div> Please <a href="#" class="epp-login">login</a> to access your special pricing.');
    }
    var referralsText = "Refer Friends & Co-Workers Now";
    if (segment && segment.toLowerCase() == "education") {
      referralsText = "Refer Friends & Fellow Students";
    }   
    if(!window.AEMapp?.eppStore?.isTMOGuestUser()){
      benfit.append('<a href="/us/web/account/my-referrals" class="benfit-wrap__offers">' + referralsText + '</a><span class="benfit-wrap__gap"></span><a class="benfit-wrap__offers" href="' + offerUrl + '">SPECIAL OFFERS</a><span class="benfit-wrap__gap"></span><a class="benfit-wrap__exit">EXIT STORE</a>');
    }
    
    gnb.find('.epp-login').click((e) => {
      e.preventDefault();
      $('.gnb__utility-link.loginBtn, .nv00-gnb__utility-user-menu-link.loginBtn').trigger('click');
    });
    benfit.find('.benfit-wrap__exit').click(() => {
      window.AEMapp.eppStore.exitStore()
      $(document).trigger('exit__store');
    });
    if (($.cookies.get('remoteId') || $.cookies.get('xsdcxyn')) && $.cookies.get('tppid') && $.cookies.get('s_ecom_sc_cnt') >= 1) {
      window.AEMapp.eppStore.updateGNBCartSaving();
    }
    // tagging
    var exit = gnb.find('.benfit-wrap__exit');
    exit.attr('an-tr', `epp discount-${pageTrack}-text-link`);
    exit.attr('an-ca', 'content click');
    exit.attr('an-ac', 'feature');
    exit.attr('an-la', 'epp:bar:exit store');
    var offer = gnb.find('.benfit-wrap__offers');
    offer.attr('an-tr', `epp discount-${pageTrack}-text-link`);
    offer.attr('an-ca', 'content click');
    offer.attr('an-ac', 'feature');
    offer.attr('an-la', 'epp:bar:special offer');
  }

  if (siteCode==="us") {
    if ($.cookies.get("tmktid") || $.cookies.get("tppid")) {
      var mkt = $.cookies.get("xsdcxyn") || $.cookies.get("remoteId");
      var timg = $.cookies.get("tlgimg");
      var tname = $.cookies.get("tmktname");
      if (tname) {
        if (window.AEMapp && window.AEMapp.eppStore && window.AEMapp.eppStore.isUnverifiedEppUser() && !window.isSaLogin) {
          window.AEMapp.eppStore.updateEppGNB(tname, window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo && window.digitalData.page.pageInfo.pageTrack || '');
        } else {
          if ($.cookies.get("xsdcxyn") || $.cookies.get("remoteId")) {
            var guid = $.cookies.get("guid",{domain:".samsung.com"});
        var flpe = $.cookies.get("flpe", {domain : ".samsung.com"});
        var jsonflpe = {};
        if(flpe && guid) {
          // CryptoJS 암호화 하는 부분
          const keyone = "cedc6238tqcf1t4f0vl7g50mc70d6a5a";
          var parsekeyone = CryptoJS.enc.Utf8.parse(keyone); // 키는 utf8로 파싱 1회 수행
          
          // 1차 키와 guid를 암호화하여 2차 키를 생성한다 
          var enkeyone = CryptoJS.AES.encrypt(guid, parsekeyone,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          
          // CryptoJS 복호화 하는 부분
          const keytwo = (enkeyone+keyone).substring(0, 32); // 2차 키 길이를 AES256에 사용되는 32Byte로 조절하기 위하여 추가로 덧붙여서 자름 
          var parsekeytwo = CryptoJS.enc.Utf8.parse(keytwo); // 키는 utf8로 파싱 1회 수행
  
          // 쿠키에 암호화하여 전달된 값을 2차 키로 복호화한다.
          var dekeytwo = CryptoJS.AES.decrypt(flpe, parsekeytwo,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          var deflpe = CryptoJS.enc.Utf8.stringify(dekeytwo);
          
          // 복호화된 개인정보를 url 디코딩하고서 json포멧으로 저장 
          jsonflpe = JSON.parse(decodeURIComponent(deflpe));
        }
  
        var firstName = jsonflpe.firstName;
            
            var uname = firstName ? firstName : $.cookies.get("tmktname");
            $(".epp-bar-logo img").remove();
            $(".epp-bar-logo").append('<img src="'+timg+'"/>');
            if (uname != "null" && (window.isSaLogin || window.isShopSignedIn)) {
              $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">'+tname+' Store'+'.</div> Please enjoy our special offers for you');
            } else {
              $(".epp-bar-msg").html('Welcome <div class="epp-bar-username">'+tname+'!</div> Please <a href="#" id="openLogin" style="color:#1428a0;font-weight: bold">login</a> to enjoy our special offers for you');
            }
            $(".epp-bar-wrap").slideDown();
          } else if (($.cookies.get("xsdcxyn") || $.cookies.get("remoteId")) && $.cookies.get("tmktid")==="4145500" && $.cookies.get("tppid")==="17593200"){
            $(".epp-bar-logo img").remove();
            $(".epp-bar-logo").append('<img src="'+timg+'"/>');
            $(".epp-bar-msg").html("Welcome to Samsung's Friends and Family Store! Enjoy special pricing. Please <a href='#' id='openLogin' style='font-size:12px;font-weight: bold'>login/signup</a> to make a purchase.");
            $(".epp-bar-wrap").slideDown();
          }else if(window.AEMapp?.eppStore?.isTMOGuestUser()){
            $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username">'+tname+' Store'+'.</div>');
            $(".epp-bar-wrap").slideDown();
          } else {
            $(".epp-bar-logo img").remove();
            $(".epp-bar-logo").append('<img src="'+timg+'"/>');
            $(".epp-bar-msg").html('Welcome to the <div class="epp-bar-username" style="color:#1428a0;">'+tname+' Store'+"!</div> Please <a href='#' id='openLogin' style='color:#1428a0;font-weight: bold'>login</a> to enjoy our special pricing.");
            $("#openLogin").click(function(e){e.preventDefault();$('.gnb-login').trigger('click')});
            $(".epp-bar-wrap").slideDown();
          }
          // window.AEMapp && window.AEMapp.eppStore && window.AEMapp.eppStore.updateGNBCartSaving();
        }
      } else {
        $(".epp-bar-wrap").hide();
      }
    } else {
      $(".epp-bar-wrap").hide();
    }
  }
})();

(function (win, $) {

	var gnbFn = function(){
		var typeCodeForGNB = $("#typeCodeForGNB").val();
		var groupCodeForGNB = $("#groupCodeForGNB").val();
		var $gnbMenuBtn = $(".js-gnb-menu-btn");
		
		if(!fnIsNull(typeCodeForGNB) || !fnIsNull(groupCodeForGNB)){
			
			var $depth2menu = $(".gnb__depth2-menu").filter("[data-type-code='"+typeCodeForGNB+"']");
			if(fnIsNull($depth2menu)){
				$depth2menu = $(".gnb__depth2-menu").filter("[data-group-code='"+groupCodeForGNB+"']");
			}
			
			if(!fnIsNull($depth2menu)){
				$depth2menu.each(function(idx){
					if(idx === 0){
						var $depth1menu = $depth2menu.closest(".gnb__depth1-menu");
						$depth1menu.addClass("active-first");
						$depth2menu.addClass("active-second");
					}
				});
			}
		}
	};
	
	$(function() {
		gnbFn();
	});
	
	// Site Error Page (Home Link Event)
	$("div.s-page-error div.s-page-error__wrap a.s-link-text").on("click", function(){
		if(location.pathname.indexOf("/" + $("#siteCode").val() + "/multistore/") > -1) {
			// EPP 경로롤 접근하여 오류가 발생된 경우, Home Link 클릭시 해당 Store Home 으로 이동 
			var paths = location.pathname.substring(location.pathname.indexOf("/" + $("#siteCode").val() + "/multistore/"), location.pathname.length).split("/");
			if(paths.length > 4 && paths[4]) {
				$(this).attr("href", "/" + $("#siteCode").val() + "/multistore/" + paths[3]);
			}
		}
		return;
	});
}(window, $));

$(function(){
  function init() {
    var jsonUrl =(window.location.href.indexOf('www.samsung.com') > -1 || window.location.host.indexOf("origincl.us.samsung.com") > -1) ? '/us/smg/content/samsung/content-library/gnb/gnb-header/json/pub/gnb-header-menu.json': '/us/smg/content/samsung/content-library/gnb/gnb-header/json/pub/gnb-header-menu.json';
    $.ajax({
      url: jsonUrl,
      dataType : 'json'
    }).then(function(json) {
      if(json && json.menuOptions && json.menuOptions.length > 0) {
      	$('.gnb__depth2-title-wrap, .gnb__depth2, .gnb__feature-container').remove();
        $('.gnb').addClass('isHybrid');
        // var isHybrid = $.cookies.get('hybrid')? true: false;
        var taggingStringModify = function(string) {
          var result = string || '';
          result = result.replace(/\+/gi, 'plus').replace(/\&/gi, 'and').replace(/\$/gi, 'dollar').replace(/\%/gi, 'percentage').replace(/\"/gi, 'inches');
          result = result.replace(/\||\-|\~|\,|\.|\!|\?|\@|\=|\#|\*|\'/gi, '');
          return result.toLowerCase();
        };
        $('.gnb__depth1-menu').each(function(index, ele){
          //each 
          $(ele).find('.gnb__depth2-wrap').addClass('isHybrid one-col');
          $(ele).find('.gnb__depth2-wrap .gnb__depth-back').append('<span class="gnb__depth1-name"></span>');
          if($(ele).hasClass('has-depth-menu')) {
            // var dropDownInfo = _.filter(json.menuOptions, function(l1Ele) {
            //   return l1Ele.nodeId === $(ele).data('nodeid');
            // })[0];
            var dropDownInfo = json.menuOptions[index];
            if(!dropDownInfo) return;


             var t1Title = '';
             if(dropDownInfo.titleTaburl) {
              t1Title = '<a class="gnb__depth2-title-link" href="' + dropDownInfo.titleTaburl + '">' + (dropDownInfo.titleTabHeadline? dropDownInfo.titleTabHeadline: '') + '</a>';
             } else {
                t1Title = '<span class="gnb__depth2-title-text">' + (dropDownInfo.titleTabHeadline? dropDownInfo.titleTabHeadline: '') + '</span>';
             }
            // title wrap for title text
            var titleWrap = '<div class="gnb__depth2-title-wrap"><strong class="gnb__depth2-title">' + t1Title + '</strong></div>';

            //image wrap

            var hybridFlyOutClass= 'cta--contained hidden';
            var utagFlag = 'hybrid-accordion';
            var imageWrap = dropDownInfo.foImg?'<div class="gnb__feature-container"> <a class="gnb__feature-container-link" an-tr="nv00_gnb--cta-feature" an-ca="navigation" an-la="feature image:' + (dropDownInfo.titleTabHeadline? taggingStringModify(dropDownInfo.titleTabHeadline): '') + ':' + (dropDownInfo.fiHeadline? taggingStringModify(dropDownInfo.fiHeadline): '') + ':' + (dropDownInfo.fiCtaText? taggingStringModify(dropDownInfo.fiCtaText): '') + '" an-ac="gnb" data-link_cat="navigation ' + utagFlag +'" data-link_id="' + dropDownInfo.fiHeadline +'" data-link_meta="link_name:' + dropDownInfo.fiHeadline + '" data-link_position="navigation>gnb>' + dropDownInfo.titleTabHeadline + '" data-event_name="select_' + dropDownInfo.titleTabHeadline +'_click" href="' + (dropDownInfo.foLinkUrl? dropDownInfo.foLinkUrl: 'javascript:void(0);') + '"><div class="image"> <img class="image__main responsive-img lazy-load image__main" data-src="' + dropDownInfo.foImg + '" data-mobile-src="' + dropDownInfo.foImg + '" alt="' + (dropDownInfo.foImgAlt? dropDownInfo.foImgAlt: '') + '"></div><div class="gnb__feature-container-contents"><p class="gnb__feature-container-description">' + (dropDownInfo.fiHeadline? dropDownInfo.fiHeadline: '') + '</p> <span class="cta ' + hybridFlyOutClass + ' cta--black">' + (dropDownInfo.fiCtaText? dropDownInfo.fiCtaText: '') + '</span></div></a></div>': '';
            var depth2Wrap = '';
            // ul depth 2 start
            if(dropDownInfo.children) {
              var hybridClass= 'isHybrid';
              depth2Wrap += '<ul class="gnb__depth2 ' + hybridClass +  '" role="menu">';
            $.each(dropDownInfo.children, function(idx, l2Ele) {
              var hasL3 = l2Ele.children? 'has-depth-menu': '';
              var l2Target = l2Ele.linkTarget == 'B'? '_blank': '_self';
              var l2LinkUrl = l2Ele.linkUrl? l2Ele.linkUrl: 'javascript:void(0);';
              var l2FlyoutObj = l2Ele.flyOutSections? l2Ele.flyOutSections[0].flyOutImage? l2Ele.flyOutSections : undefined: undefined;
              var l2FlyoutTheme = l2FlyoutObj? l2FlyoutObj[0].flyOutBlackTextTheme? '': 'text-color--white': '';

              var flyoutString = l2FlyoutObj? 'data-flyout-url="' + l2FlyoutObj[0].flyOutLink + '" data-flyout-text="' + l2FlyoutObj[0].flyOutTitle + '" data-flyout-img="' + l2FlyoutObj[0].flyOutImage + '" data-flyout-theme="' + l2FlyoutTheme + '"': 'data-flyout-url="' + (dropDownInfo.foLinkUrl || '') + '" data-flyout-text="' + (dropDownInfo.fiHeadline || '') + '" data-flyout-img="' + (dropDownInfo.foImg || '') + '"';

              var l2Wrapper = '<li class="gnb__depth2-menu ' + hasL3 + '" role="presentation">';

              var l2DropDownCtaDesk = hasL3? '<svg class="icon icon--next" id="next-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M31.828 16.306l3.457-3.612L72.172 48 35.285 83.306l-3.457-3.612L64.941 48z"></path></svg>': '';

              l2Wrapper += '<a class="gnb__depth2-link" target="' +  l2Target + '" href="' + l2LinkUrl + '" role="menuitem" ' + flyoutString + '><span class="gnb__depth2-link-text">' + l2Ele.displayName + '</span>' + l2DropDownCtaDesk + '</a>';

              var l2DropDownCtaMobile = hasL3? '<a class="gnb__depth2-dropdown-cta" href="javascript:void(0)"><span class="hidden">Open Menu</span><svg class="icon icon--dropdown" id="open-down-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M48 73.254L11.651 36.361l5.698-5.614L48 61.855l30.651-31.108 5.698 5.614z"></path></svg></a>': '';
              l2Wrapper += l2DropDownCtaMobile;

              if(hasL3) {
                l2Wrapper += '<div class="gnb__depth3-wrap "><div class="gnb__depth3-inner"><ul class="gnb__depth3" role="menu">';
                $.each(l2Ele.children, function(idx, l3Ele) {
                  var l3Target = l3Ele.linkTarget == 'B'? '_blank': '_self';
                  var l3LinkUrl = l3Ele.linkUrl;
                  var l3LinkImg = l3Ele.fimageL3url? l3Ele.fimageL3url.replace(/ /g,"%20"): '';
                  var noImgClass = l3LinkImg? '': 'no-img'; 
                  var openNewWindowIcon = l3Ele.linkTarget == 'B'? '<svg class="icon" id="outlink-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"> <path d="M81.436 14.564v54.285h-8V28.221L18.22 83.436l-5.656-5.656L67.78 22.563l-40.629.001v-8z"></path> </svg>': '';
                  var hybridImg = l3LinkImg?'<img class="lazy-load image__main" data-src="'+ l3LinkImg + '" >': '';
                  var hybridImgClass= 'isHybrid ';
                  var l3EleStr = '<li class="gnb__depth3-menu" role="presentation"><a an-tr="nv00_gnb--text-depth3" an-ca="navigation" an-ac="gnb" an-la="' + (dropDownInfo.titleTabHeadline? taggingStringModify(dropDownInfo.titleTabHeadline): '') + ':' + taggingStringModify(l2Ele.displayName) + ':' + taggingStringModify(l3Ele.displayName) + '" class="gnb__depth3-link ' + hybridImgClass + '" href="' + l3Ele.linkUrl + '" target="' + l3Target + '"  role="menuitem"><div class="gnb__depth3-link-text ' + hybridImgClass + noImgClass +'">'+ hybridImg + l3Ele.displayName + openNewWindowIcon +'</div></a></li>';
                  l2Wrapper += l3EleStr;
                });
                var l2LinkShopAllUrl = l2Ele.shopAllLinkUrl;
                var l2LinkShopAllDt = l2Ele.shopAllLinkTextDesktop;
                var l2LinkShopAllMb = l2Ele.shopAllLinkTextMobile? l2Ele.shopAllLinkTextMobile: l2Ele.shopAllLinkTextDesktop;

                var shopAllLink = l2LinkShopAllUrl? '<li class="gnb__depth3-menu" role="presentation"><a class="gnb__depth3-link isHybrid shop-all" href="' + l2LinkShopAllUrl + '" target="_self" role="menuitem" an-tr="nv00_gnb--text-depth3" an-ca="navigation" an-ac="gnb" an-la="' + (dropDownInfo.titleTabHeadline? taggingStringModify(dropDownInfo.titleTabHeadline): '') + ':' + taggingStringModify(l2Ele.displayName) + ':' + taggingStringModify(l2LinkShopAllDt) + '"><div class="gnb__depth3-link-text isHybrid shop-all">' + l2LinkShopAllDt + '<svg class="icon icon--next" id="next-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" style="width: 20px;"><path d="M31.828 16.306l3.457-3.612L72.172 48 35.285 83.306l-3.457-3.612L64.941 48z"></path></svg></div></a></li>': '';
                l2Wrapper += shopAllLink;
                l2Wrapper+= '</ul></div></div>'
              }
              // close l2 wrapper
              l2Wrapper += '</li>';
              depth2Wrap += l2Wrapper;
            });
            depth2Wrap += '</ul>';
            }
            $(titleWrap + depth2Wrap + imageWrap).appendTo($(ele).find('.gnb__depth2-inner'));
          }

        });
        window.sg.components.gnb.init();
        window.sg.common.lazyLoad.initAll();
        // var utagFlag = 'hybrid-accordion';
        // $('.gnb').on('click', '.gnb__depth3-link', function(e) {
        //   var l1text = $('.gnb__depth1-menu.open .gnb__depth1-link-text').text() || $('.gnb__depth1-menu.active .gnb__depth1-link-text').text();
        //   var l2text = $('.gnb__depth2-menu.active .gnb__depth2-link-text').text();
        //   var l3text = $(this).find('.gnb__depth3-link-text').text();

        //   window.utag && window.utag.link({
        //     'link_cat':'navigation ' + utagFlag, 
        //     'link_id': l1text + ':' + l2text + ':' + l3text, 
        //     'link_meta': 'link_name:' + l3text, 
        //     'link_position': 'navigation>gnb>' + l1text + '>' + l2text,
        //     'event_name': 'select_' + l3text + '_click'
        //   });
        // });
        // $('.gnb').on('click', '.gnb__depth2-link', function(e) {
        //   var l1text = $('.gnb__depth1-menu.open .gnb__depth1-link-text').text() || $('.gnb__depth1-menu.active .gnb__depth1-link-text').text();
        //   var l2text = $(this).find('.gnb__depth2-link-text').text();

        //   window.utag && window.utag.link({
        //     'link_cat':'navigation ' + utagFlag , 
        //     'link_id': l1text + ':' + l2text, 
        //     'link_meta': 'link_name:' + l2text, 
        //     'link_position': 'navigation>gnb>' + l1text,
        //     'event_name': 'select_' + l2text + '_open'
        //   });
        // });
        // $('.gnb').on('click', '.gnb__menu-btn', function(e) {
        //   window.utag && window.utag.link({
        //     'link_cat':'navigation ' + utagFlag , 
        //     'link_id': 'mobile hamburger menu', 
        //     'link_meta': 'link_name: hamburger menu', 
        //     'link_position': 'navigation>gnb>hamburger menu',
        //     'event_name': 'select_hamburger menu_click'
        //   });
        // });

        $('.gnb').on('click','.nv00-gnb__l0-menu',function(){
          var navName = $(this).find('.nv00-gnb__l0-menu-btn').attr('an-la').toLowerCase()
         
          window.utag && window.utag.link({
            'link_name':'nv00_gnb-1depth-navigation2',
            'link_cat':'navigation ', 
            'link_id': navName, 
            'link_meta': 'link_name'+navName, 
            'link_position': 'navigation>gnb',
            'event_name': 'select_'+ navName + '_click'
          });
        }) 

        $('.gnb').on('click','.nv00-gnb__l1-menu-btn',function(e){
          e.stopPropagation()
          var navName = $(this).attr('an-la').toLowerCase()
          window.utag && window.utag.link({
            'link_name':'nv00_gnb-2depth-navigation2',
            'link_cat':'navigation', 
            'link_id': navName, 
            'link_meta': 'link_name'+navName, 
            'link_position': 'navigation>gnb',
            'event_name': 'select_'+ navName + '_click'
          });
        }) 
      
        $('.gnb').on('click','.nv00-gnb__l2-menu-link',function(){
          var navName = $(this).attr('an-la').toLowerCase()
          var idName = $(this).contents().get(0).nodeValue.trim().toLowerCase()
          window.utag && window.utag.link ({
            'link_name':'nv00_gnb-3depth-navigation2',
            'link_cat':'navigation', 
            'link_id': idName, 
            'link_meta': '', 
            'link_position': 'navigation>gnb',
            'event_name': 'select_'+ navName + '_click'
          });
        }) 

        $('.gnb').on('click', '.gnb__depth2-dropdown-cta', function(e) {
          $(this).siblings('.gnb__depth2-link').find('.gnb__depth2-link-text').click();
        });

        $(document).trigger("GNBInitialized");
      } else {
        console.log('gnb json is invalid');
        window.sg.components.gnb.init();
      }
    }).fail(function(error) {
      console.log('error', error);
      window.sg.components.gnb.init();
    });
  }
  
  if(siteCode==='us') {
  	//init();
  }

  
});


function getNextApiDomain() {
//	var nextGenDomain = STORE_DOMAIN;
//	var protocal_ = getProtocal();
//	var domain_ = protocal_ + "://" + nextGenDomain;
	var domain_ = STORE_DOMAIN;
	var port = "";

	return domain_;
}

// Update Cart Count
function updateTotalCartCount(cnt) {
	var pattern = /^[0-9]+$/;
	if(!pattern.test(cnt)){	cnt = 0; }
	if(cnt > 99){ cnt = 99; }
	const $gnbCartCountEl = $('.gnb-cart-count');
	$gnbCartCountEl.attr("role","alert");
	$gnbCartCountEl.attr("aria-label", "Number of products in the cart is " + cnt);
	//const prdCountText = $("#productCountText").val();
	//const $prdCountSpan = $("<span>").addClass("hidden").text(prdCountText);

	$gnbCartCountEl.empty().text(cnt);
	//$gnbCartCountEl.prepend($prdCountSpan);
	if(cnt > 0){
		$gnbCartCountEl.show();
		ss.Auth.setCartEl(true);
	} else {
		$gnbCartCountEl.hide();
		ss.Auth.setCartEl(false);
	}
}

// Hide minicart
function hideMiniCart() {
	navigation.miniCartHide();
}

// View Popup Layer
function nextViewPopup(v) {
	var obj=$("#"+v.split("#")[1]);

	$(".layer_popup, .layer_popup_ng").hide();
	obj.parent().show();

	$(".lightbox-skrim").show();
	var layer = document.getElementById(obj.attr("id"));

	setTimeout(function(){layer.popAlign();}, 100);

	return false;
}

// Hide Popup Layer
function hidePopup() {
	$(".layer_popup, .layer_popup_ng").hide();
	$(".lightbox-skrim").hide();
	return false;
}

// Show Gloval Error Message
function viewGlovalMessagePopup(message) {
	var obj = $("#gloval_message_popup");
	obj.find(".msg-text").text(message);
	obj.find(".button").attr('tabindex','1');
	obj.find(".button").attr('data-focus-id','shop-popover-ok');
	obj.find(".button").attr('data-tab-next','shop-popover-close');
	obj.find('.icon-close-x').attr('data-tab-next','shop-popover-ok');
	obj.attr('data-tab-next','nav-cart-link');

	obj.find(".button").focus();

	nextViewPopup("#"+obj.attr("id"));
	obj.find(".button").focus();
	obj.find(".pop-btn>.button").click(function(){
		hidePopup();
		$('.cartbutton.item').focus();

		return false;
	});
}

function getProtocal() {
	var url = document.location.href;
	var protocal = url.split("://")[0];
	return protocal;
}

(() => {
  const $q = window.sg.common.$q;
  const utils = window.sg.common.utils;
  const selector = {
    section: '.gnb',
  };

  class GnbTagging {
    constructor(element) {
      this.selector = {
        gnbMenu: '.gnb__depth1-menu.has-depth-menu .gnb__depth1-link, .gnb__depth2-menu.has-depth-menu .gnb__depth2-link',
      };

      this.el = {
        window: $q(window),
        component: $q(element),
      };

      this.handler = {
        resize: this.resize.bind(this),
      };

      GnbTagging.instances.set(element, this);

      this.setElements();

      this.init();
    }

    setElements() {
      this.el.gnbMenu = this.el.component.find(this.selector.gnbMenu);
      
      this.breakpoint = 1279;
      this.desktopFlag = false;
      this.mobileFlag = false;
    }
    
    init() {
      this.bindEvents();

      this.resize();
    }

    reInit() {
      this.setElements();

      this.bindEvents();

      this.resize();
    }

    removeTagging() {
      this.el.gnbMenu.removeAttr('an-tr');
      this.el.gnbMenu.removeAttr('an-la');
      this.el.gnbMenu.removeAttr('an-ca');
      this.el.gnbMenu.removeAttr('an-ac');
    }

    setTagging() {
      this.el.gnbMenu.target.forEach((item) => {
        const $item = $q(item);
        const engName = item.dataset.engname !== undefined ? item.dataset.engname : '';
        const clickName = $item.hasClass('gnb__depth1-link') ? 'nv00_gnb--click-depth1' : 'nv00_gnb--click-depth2';

        $item.attr('an-tr', clickName);
        $item.attr('an-la', engName);
        $item.attr('an-ca', 'navigation');
        $item.attr('an-ac', 'gnb');
      });
    }

    resize() {
      if (this.breakpoint < utils.getViewPort().width) {
        if (this.desktopFlag === false) {
          this.desktopFlag = true;
          this.mobileFlag = false;

          this.removeTagging();
        }
      } else {
        if (this.mobileFlag === false) {
          this.mobileFlag = true;
          this.desktopFlag = false;

          this.setTagging();
        }
      }
    }

    bindEvents() {
      this.el.window.off('resize', this.handler.resize).on('resize', this.handler.resize);
    }
  }

  GnbTagging.instances = new WeakMap();

  const init = () => {
    $q(selector.section).target.forEach((element) => {
      if (!GnbTagging.instances.has(element)) {
        new GnbTagging(element);
      }
    });
  };

  const reInit = () => {
    $q(selector.section).target.forEach((element) => {
      if (GnbTagging.instances.has(element)) {
        GnbTagging.instances.get(element).reInit();
      } else {
        new GnbTagging(element);
      }
    });
  };

  $q.ready(init);

  window.sg.components.gnbTagging = {
    init,
    reInit,
  };
})();

(() => {
  window.sg = window.sg || {};
  window.sg.common = window.sg.common || {};
  window.sg.components = window.sg.components || {};

  const constants = {
    BREAKPOINTS: {
      DESKTOP: 1440,
      MOBILE: 767,
      MOBILE_UNDER: 360,
    },
    SELECTOR: {
      RES_IMG: '.responsive-img',
      VIDEO: '.video',
      LAZY_LOAD: '.lazy-load',
      PREVIEW_IMG: '.preview',
      INDICATOR: '.indicator',
    },
    KEY_CODE: {
      TAB: 9,
      ENTER: 13,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      ESC: 27,
    },
  };

  let scrollTimer;
  let listenersMap;

  const utils = {
    getViewPort() {
      let doc = window;
      let pre = 'inner';

      if (!('innerWidth' in window)) {
        pre = 'client';
        doc = document.documentElement || document.body;
      }

      return {
        width: doc[`${pre}Width`],
        height: doc[`${pre}Height`],
      };
    },
    getCurrentDevice() {
      const width = utils.getViewPort().width;
      return width > constants.BREAKPOINTS.MOBILE ? 'desktop' : 'mobile';
    },
    getCurrentMediaType() {
      const width = utils.getViewPort().width;
      return width > constants.BREAKPOINTS.MOBILE ? width > constants.BREAKPOINTS.DESKTOP ? 'desktop-over' : 'desktop' : width > constants.BREAKPOINTS.MOBILE_UNDER ? 'mobile' : 'mobile-under';
    },
    isInVerticalViewPort(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < utils.getViewPort().height && rect.bottom > 0;
    },
    isInHorizontalViewPort(el) {
      const rect = el.getBoundingClientRect();
      return rect.left < utils.getViewPort().width && rect.right > 0;
    },
    isVerticalVisible(el) {
      return utils.isInVerticalViewPort(el) && getComputedStyle(el).display !== 'none';
    },
    isHorizontalVisible(el) {
      return utils.isInHorizontalViewPort(el) && getComputedStyle(el).display !== 'none';
    },
    isInViewPort(el) {
      return utils.isInVerticalViewPort(el) && utils.isInHorizontalViewPort(el);
    },
    isVisible(el) {
      return utils.isInViewPort(el) && getComputedStyle(el).display !== 'none';
    },
    scrollTo(oriY, desY) {
      const { scrollLeft, scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const posX = scrollLeft;

      if (oriY > scrollHeight - clientHeight) {
        oriY = scrollHeight - clientHeight;
      }

      let tmpDesY;
      if (isNaN(desY)) {
        tmpDesY = scrollTop;
      } else {
        tmpDesY = desY;
      }

      const speed = 7;
      tmpDesY += (oriY - scrollTop) / speed;
      if (tmpDesY < 0) {
        tmpDesY = 0;
      } else if (tmpDesY > scrollHeight - clientHeight) {
        tmpDesY = scrollHeight - clientHeight;
      }

      const posY = Math.ceil(tmpDesY);

      window.scrollTo(posX, posY);

      if (posY !== oriY) {
        scrollTimer = setTimeout(() => {
          utils.scrollTo(oriY, tmpDesY);
        }, 15);
      } else {
        clearTimeout(scrollTimer);
      }
    },
    setImageSpecGuide(targetElement, guideSpecText) {
      const mediaSizeGuide = document.createElement('span');
      mediaSizeGuide.innerHTML = guideSpecText;
      mediaSizeGuide.style.position = 'absolute';
      mediaSizeGuide.style.display = 'inline-block';
      mediaSizeGuide.style.top = '50%';
      mediaSizeGuide.style.right = '50%';
      mediaSizeGuide.style.width = '100%';
      mediaSizeGuide.style.textAlign = 'center';
      mediaSizeGuide.style.fontStyle = 'italic';
      mediaSizeGuide.style.transform = 'translateX(50%) translateY(-50%)';
      mediaSizeGuide.style.color = '#fff';
      mediaSizeGuide.style.fontSize = '30px';
      mediaSizeGuide.classList.add('media-size-guide');
      targetElement.appendChild(mediaSizeGuide);
    },
    extend(de, add) {
      Object.keys(add).forEach((key) => {
        de[key] = add[key];
      });

      return de;
    },
    setCookie(name, value, day) {
      const date = new Date();
      date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    },
    getCookie(name) {
      const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
      return value ? value[2] : null;
    },
    triggerEvent(el, eventName, detail = null, bubbles = false, cancelable = true) {
      let event;
      if (detail === null) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, bubbles, cancelable);
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, bubbles, cancelable, detail);
      }
      el.dispatchEvent(event);
    },
    hiddenScroll() {
      this.scrollFlag = true;
      this.currentPos = window.scrollY || document.documentElement.scrollTop;
      const $body = document.querySelector('body');
      let fixedPos;

      if (this.currentPos > 0) {
        fixedPos = `-${this.currentPos}px`;
      } else {
        fixedPos = 0;
      }

      $body.style.position = 'fixed';
      $body.style.width = '100%';
      $body.style.top = fixedPos;
    },
    visibleScroll() {
      if (this.scrollFlag === true) {
        this.scrollFlag = false;
        const $body = document.querySelector('body');
        
        $body.style.position = '';
        $body.style.width = '';
        $body.style.top = '';

        window.scrollTo(0, this.currentPos);
      }
    },
    getDirection() {
      return window.getComputedStyle(document.body).direction;
    },
    addEventListener(el, type, fn) {
      if (!el) {
        return;
      }

      if (!listenersMap) {
        listenersMap = new WeakMap();
      }

      let listeners;
      if(!listenersMap.has(el)) {
        listeners = {};
      } else {
        listeners = listenersMap.get(el);
      }

      if (!listeners[type]) {
        listeners[type] = [];
      }

      listeners[type].push(fn);
      listenersMap.set(el, listeners);

      el.addEventListener(type, fn);
    },
    removeAllEventListeners(el, type) {
      if (!el || !listenersMap) {
        return;
      }

      let listeners;
      if(listenersMap.has(el)) {
        listeners = listenersMap.get(el);
        if (listeners[type]) {
          listeners[type].forEach((listener) => {
            el.removeEventListener(type, listener);
          });

          listenersMap.delete(el);
        }
      }
    },
    closest(el, selector) {
      do {
        if (el.matches ? el.matches(selector) : el.msMatchesSelector(selector)) {
          return el;
        }

        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    },

    popupControl: {
      closeParam: null,
      popstateHandler: () => {
        if (!window.history.state) {
          window.sg.common.utils.popupControl.closeParam();
          window.sg.common.utils.popupControl.close();
          // return;
        } else if (window.history.state.page === 'popOpen') {
          window.sg.common.utils.popupControl.closeParam();
          window.sg.common.utils.popupControl.close();
        }
      },
      open(param) {
        this.closeParam = param;
        window.removeEventListener('popstate', this.popstateHandler);
        window.addEventListener('popstate', this.popstateHandler);

        window.history.pushState({
          page: 'popOpen',
        },'',`${window.location.href}`);  
      },
      close(){
        this.closeParam = null;
        if (!window.history.state) {
          return;
        }
        if (window.history.state.page === 'popOpen') {
          window.history.forward();
          window.removeEventListener('popstate', this.popstateHandler);
        }
      },
    },
    setSwiperIndicatorTaggingAttributes(taggingAttributes, target) {
      const taggingAttributesDetail = JSON.parse(taggingAttributes);

      [...target.querySelectorAll('.swiper-pagination-bullet')].forEach((el, index) => {
        el.setAttribute('an-tr', taggingAttributesDetail.anTr);
        el.setAttribute('an-ca', taggingAttributesDetail.anCa);
        el.setAttribute('an-ac', taggingAttributesDetail.anAc);
        el.setAttribute('an-la', `${taggingAttributesDetail.anLa}${index + 1}`);
      });
    },
    isEnglish(str) {
      const regExp = /^[a-zA-Z]*$/;
      return regExp.test(str);
    },

    isNumber(str) {
      const regExp = /^[0-9]*$/;
      return regExp.test(str);
    },

    isEngNum(str) {
      const regExp = /^[a-zA-Z0-9]*$/;
      return regExp.test(str);
    },

    isEmail(str) {
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str);
    },
  };

  window.sg.common.constants = constants;
  window.sg.common.utils = utils;
})();
(() => {
  const getCurrentDevice = window.sg.common.utils.getCurrentDevice;

  class Image {
    constructor(el) {
      this.el = el;
      this.init();
    }

    init() {
      if (Image.instances.has(this.el)) {
        return;
      }

      Image.instances.set(this.el, this);

      this.setResponsiveImage();
      this.bindEvents();
    }

    load() {
      this.el.src = this.el.dataset.src;
      this.el.removeAttribute('data-src');
    }

    bindImageLoad() {
      if (this.el.classList.contains('image__main')) {
        const previewEl = this.el.previousElementSibling;
        if (previewEl) {
          this.el.addEventListener('load', () => {
            previewEl.style.visibility = 'hidden';
            this.el.style.visibility = '';
          });
        }
      }
    }

    bindResponsive() {
      // eslint-disable-next-line dot-notation
      if (this.el.dataset['desktopSrc'] !== this.el.dataset['mobileSrc']) {
        this.setResponsiveImage = this.setResponsiveImage.bind(this);
        window.addEventListener('resize', this.setResponsiveImage);
      }
    }

    bindEvents() {
      if (this.el.classList.contains('responsive-img')) {
        this.bindResponsive();
      }

      this.bindImageLoad(this.el);
    }

    setResponsiveImage() {
      if (this.el.classList.contains('responsive-img')) {
        const device = getCurrentDevice();
        if (this.device !== device) {
          if (this.el.classList.contains('image__main') && !this.el.classList.contains('lazy-load')) {
            const previewEl = this.el.previousElementSibling;
            if (previewEl) {
              previewEl.style.visibility = 'visible';
              this.el.style.visibility = 'hidden';
            }
          }

          this.device = device;
          const src = this.el.dataset[`${this.device}Src`];

          if (!src) {
            this.el.style.display = 'none';
          } else {
            this.el.style.removeProperty('display');
          }

          if (this.el.classList.contains('lazy-load') || this.el.classList.contains('lazy-load-man')) {
            this.el.dataset.src = this.el.dataset.src === undefined ? '' : this.el.dataset.src;
            if (this.el.dataset.src.indexOf(src) < 0) {
              this.el.dataset.src = src;
            }
          } else {
            if (this.el.src.indexOf(src) < 0) {
              this.el.src = src;
            }
          }
        }
      }
    }
  }

  Image.instances = new WeakMap();

  const image = {
    initAll() {
      const imageEls = [...document.querySelectorAll('.responsive-img')];
      imageEls.forEach((el) => {
        if (!Image.instances.has(el)) {
          new Image(el);
        }
      });
    },
    load(el) {
      if (Image.instances.has(el)) {
        Image.instances.get(el).load();
      } else {
        new Image(el).load();
      }
    },
    delete(el) {
      Image.instances.delete(el);
    },
  };

  window.sg.common.image = image;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', image.initAll);
  } else {
    image.initAll();
  }
})();

(() => {
  const isVerticalVisible = window.sg.common.utils.isVerticalVisible;
  const isHorizontalVisible = window.sg.common.utils.isHorizontalVisible;

  class LazyLoad {
    constructor(el = document) {
      this.el = el;
      this.lazyEls = [];
      this.active = false;
      this.init();
    }

    init() {
      this.setLazyLoad();
      this.bindEvents();
    }

    getEls() {
      this.lazyEls = [...this.el.querySelectorAll('.lazy-load')];
    }

    reInit() {
      this.getEls();
    }

    handleLazyLoad() {
      this.setLazyLoad();
    }

    setLazyLoad(delay = 200) {
      const lazyLoad = () => {
        this.getEls();
        this.lazyEls.forEach((el) => {
          this.load(el);

          if (this.lazyEls.length === 0) {
            this.unBindEvents();
          }
        });
      };

      if (!this.active) {
        if (delay > 0) {
          this.active = true;
          setTimeout(() => {
            lazyLoad();
            this.active = false;
          }, delay);
        } else {
          lazyLoad();
        }
      }
    }

    setPreviewImageLoaded(el) {
      const loadPreviewImage = () => {
        if (isVerticalVisible(el)) {
          [...el.querySelectorAll('.image__preview')].forEach((imageEl) => {
            if (imageEl.classList.contains('lazy-load')) {
              this.loadImage(imageEl);
            }
          });

          document.removeEventListener('scroll', loadPreviewImage);
          window.removeEventListener('resize', loadPreviewImage);
          window.removeEventListener('orientationchange', loadPreviewImage);
        }
      };

      document.addEventListener('scroll', loadPreviewImage);
      window.addEventListener('resize', loadPreviewImage);
      window.addEventListener('orientationchange', loadPreviewImage);
    }

    setLazyLoadManually(el) {
      [...el.querySelectorAll('.lazy-load-man')].forEach((el) => {
        if (el.classList.contains('image__preview') || el.classList.contains('image__main') || el.classList.contains('image__hover-image--hover')) {
          this.loadImage(el);
        } else if (el.classList.contains('video')) {
          this.loadVideo(el);
        }

        el.classList.remove('lazy-load-man');
      });
    }

    load(el) {
      if (isVerticalVisible(el)) {
        if (el.classList.contains('image__preview')) {
          this.loadImage(el);
        } else {
          if (isHorizontalVisible(el)) {
            if (el.classList.contains('image__main') || el.classList.contains('image__hover-image--hover')) {
              this.loadImage(el);
            } else if (el.classList.contains('video')){
              this.loadVideo(el);
            }
          }
        }
      }
    }

    clearLazy(lazyEl) {
      lazyEl.classList.remove('lazy-load');
      this.lazyEls = this.lazyEls.filter((el) => el !== lazyEl);
    }

    loadImage(imageEl) {
      const image = window.sg.common.image;
      if (image) {
        image.load(imageEl);
      }

      this.clearLazy(imageEl);
    }

    loadVideo(videoEl) {
      const video = window.sg.common.video;
      if (video) {
        video.load(videoEl);
      }

      this.clearLazy(videoEl);
    }

    bindEvents() {
      this.handleLazyLoad = this.handleLazyLoad.bind(this);

      document.addEventListener('scroll', this.handleLazyLoad);
      window.addEventListener('resize', this.handleLazyLoad);
      window.addEventListener('orientationchange', this.handleLazyLoad);
    }

    unBindEvents() {
      document.removeEventListener('scroll', this.handleLazyLoad);
      window.removeEventListener('resize', this.handleLazyLoad);
      window.removeEventListener('orientationchange', this.handleLazyLoad);
    }
  }

  LazyLoad.instance = null;

  const lazyLoad = {
    initAll() {
      if (!LazyLoad.instance) {
        LazyLoad.instance = new LazyLoad();
      }
    },
    reInit() {
      if (!LazyLoad.instance) {
        LazyLoad.instance = new LazyLoad();
      } else {
        LazyLoad.instance.reInit();
      }
    },
    setLazyLoad() {
      if (!LazyLoad.instance) {
        LazyLoad.instance = new LazyLoad();
      }

      LazyLoad.instance.setLazyLoad(0);
    },
    setPreviewImageLoaded(el) {
      if (!LazyLoad.instance) {
        LazyLoad.instance = new LazyLoad();
      }

      LazyLoad.instance.setPreviewImageLoaded(el);
    },
    setLazyLoadManually(el) {
      if (!LazyLoad.instance) {
        LazyLoad.instance = new LazyLoad();
      }

      LazyLoad.instance.setLazyLoadManually(el);
    },
  };

  window.sg.common.lazyLoad = lazyLoad;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoad.initAll);
  } else {
    lazyLoad.initAll();
  }
})();

(() => {
  const libs = {
    // keyCode
    'keyCode': { 'TAB_KEY': 9,'ENTER': 13,'SPACE': 32,'PAGE_UP': 33,'PAGE_DOWN': 34,'END': 35 ,'HOME': 36,'LEFT': 37,'UP': 38,'RIGHT': 39,'DOWN': 40 },
    // object exted
    extend(de , add) {
      Object.keys(add).forEach((key) => {
        de[key] = add[key];
      });
      return de;
    },
  };

  /**
  /  @author      : geuni
  /  @discription : javascript selector libray
  **/
 
  class Selector {
    constructor(element) {
      if (typeof element === 'object') {
        this.target = Array.isArray(element) ? element : [element];
      } else if (!element) {
        this.target = [];
      } else {
        this.target = Array.prototype.slice.call(document.querySelectorAll(element));
      }
    }

    /**
     * Get the descendants of each element in the current set of matched elements
     * @param {string} element containing a querySelector expression to match elements against.
     * @return  {instance}   (optional) return description...
     * @private
     */
    find (element) {
      let tarr = [];
      this.target.forEach((_target) => {
        tarr = tarr.concat(Array.prototype.slice.call(_target.querySelectorAll(element)));
      });

      return new Selector(tarr);
    }

    /**
     * Description...
     * @param {number} num  (optional) param description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    eq(num) {
      const value = this.target[num];
      const temp = value ? [value] : '';
      return new Selector(temp);
    }

    /**
     * Description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    parent() {
      if (this.target.length === 0) {
        return new Selector('');
      }

      const value = this.target[0].parentNode;
      const temp = value ? [this.target[0].parentNode] : '';
      return new Selector(temp);
    }

    /**
     * Description...
     * @param {string} selector=null  (optional) param description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    children(selector = null) {
      let tarr = [];
      this.target.forEach((_target) => {
        if (selector) {
          tarr = tarr.concat(Array.prototype.slice.call(_target.querySelectorAll(selector)));
        } else {
          tarr = tarr.concat(Array.prototype.slice.call(_target.children));
        }
      });

      return new Selector(tarr);
    }

    /**
     * Description...
     * @param {string} selector  (optional) param description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    closest(selector) {
      if (this.target.length === 0) {
        return this;
      } else if (!this.target[0].parentElement) {
        return new Selector([this.target]);
      }

      const rtnElement = [];
      const isQuery = typeof selector === 'string';

      function roop(current) {
        let matchCheck;
        if (current.matches) {
          matchCheck = current.matches(selector);
        } else if (current.webkitMatchesSelector) {
          matchCheck = current.webkitMatchesSelector(selector);
        } else {
          matchCheck = current.msMatchesSelector(selector);
        }

        if (matchCheck) {
          return current;
        } else if (current === document.body) {
          return null;
        }

        return current.parentNode !== null ? roop(current.parentNode) : null;
      }

      function roopEl(current) {
        if (current === selector) {
          return current;
        } else if (current === document.body) {
          return null;
        }

        return roopEl(current.parentNode);
      }

      this.target.forEach((element) => {
        const parent = isQuery ? roop(element) : roopEl(element);
        if (parent !== null) {
          rtnElement.push(parent);
        }
      });

      return new Selector(rtnElement);
    }

    /**
     * Description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    siblings() {
      const siblingsFunc = (t) => [...t.parentElement.children].filter((e) => e !== t);
      return new Selector(siblingsFunc(this.target[0]));
    }

    setLayerFocus(firstStr, endStr, setTabIndex = true) {
      const selctor = {
        first: 'layer-popup__looping--first',
        end: 'layer-popup__looping--end',
      };

      const firstEl = this.find(firstStr);
      if (setTabIndex) {
        firstEl.attr('tabindex', 0);
      }
      firstEl.addClass('layer-popup__looping');

      if (!this.find(`.${selctor.first}`).target.length) {
        if (setTabIndex) {
          firstEl.prepend(`<button class="${selctor.first} hidden"></button>`);
        } else {
          this.target[0].insertAdjacentHTML('afterbegin', `<button class="${selctor.first} hidden"></button>`);
        }
      }

      const endEl = this.find(endStr);
      if (!this.find(`.${selctor.end}`).target.length) {
        if (setTabIndex) {
          endEl.after(`<button class="${selctor.end} hidden"></button>`);
        } else {
          this.append(`<button class="${selctor.end} hidden"></button>`);
        }
      }

      const loopingFirst = this.find(`.${selctor.first}`);
      const loopingEnd = this.find(`.${selctor.end}`);

      loopingFirst.off('focus').on('focus', () => {
        endEl.focus();
      });

      loopingEnd.off('focus').on('focus', () => {
        firstEl.focus();
      });

      firstEl.focus();
      // loopingFirst.focus();
    }

    /**
     * Description...
     * @private
     */
    offLayerFocus() {
      this.find('.layer-popup__looping').removeAttr('tabindex');
      this.find('.layer-popup__looping--first').off('focus').remove();
      this.find('.layer-popup__looping--end').off('focus').remove();
    }

    /**
     * css 스타일을 적용하거나 적용된 스타일 값을 얻어낸다.
     * @param {object|string} obj  ex) {left:10px} , get string style
     * @return  {string|null}   style value
     * @private
     */
    css(obj) {
      const el = this.target[0];
      if (!el) {
        return;
      }

      if (typeof obj === 'string') {
        return window.getComputedStyle(el)[obj];
      } else {
        this.target.forEach((element) => {
          Object.keys(obj).forEach((key) => {
            element.style[key] = obj[key];
          });
        });
      }
    }

    /**
     * display:block
     * @private
     */
    show() {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        $q(element).css({
          'display': 'block',
        });
      });
    }

    /**
     * display:none
     * @private
     */
    hide() {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        $q(element).css({
          'display': 'none',
        });
      });
    }

    /**
     * Description...
     * @param {string} pos (optional) param description...
     * @private
     */
    scrollTop(pos) {
      const el = this.target[0];
      if (!el) {
        return;
      }

      if (pos === undefined) {
        return el.scrollTop;
      } else {
        el.scrollTop = pos;
      }
    }

    /**
     * Description...
     * @author  kejmail
     * @param {object} css  get string style. ex) {left:'10px'}
     * @param {number} speed  미리세컨드 단위. ex) 1000
     * @param {string|undefined} easing=null  이징 https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp. ex) 'ease-in-out'
     * @param {function|undefined} callBack=null  애니메이션완료후 실행할 콜백함수
     * @private
     */
    animate(css, speed, easing = null, callBack = null) {
      if (typeof easing !== 'string') {
        callBack = easing;
        easing = null;
      }

      const eventName = ['webkitTransitionEnd' , 'oTransitionEnd' , 'otransitionend' , 'mozTransitionEnd', 'moztransitionend' , 'transitionend', 'transitionEnd'];

      this.target.forEach((element) => {
        const nowStyle = window.getComputedStyle(element);
        Object.keys(css).forEach((key) => {
          element.style[key] = nowStyle[key];
          // element.setAttribute( 'animate', 'true' );
        });

        const orgTransition = element.style.transition;
        element.style.transitionDuration = `${speed / 1000}s`;

        if (easing !== null) {
          element.style.transitionTimingFunction = easing;
        }

        ['o' , 'ms' , 'moz', 'webkit'].forEach((name) => {
          element.style[`${name}TransitionDuration`] = `${speed / 1000}s`;

          if (easing !== null) {
            element.style[`${name}transitionTimingFunction`] = easing;
          }
        });

        function complete(event) {
          if(event !== undefined && event.target !== element){
            return;
          }

          if (callBack !== null) {
            callBack(element);
          }

          element.style.transition = orgTransition;

          eventName.forEach((name) => {
            element.removeEventListener(name, complete);
            element.animateComplete = null;
            // element.removeAttribute( 'animate');
          });
        }

        element.animateComplete = complete;

        eventName.forEach((name) => {
          element.addEventListener(name, complete);
        });
      });

      setTimeout((() => {
        this.css(css);
      }).bind(this), 30);
    }

    /**
     * Description...
     * @return  {instance|null}   (optional) return description...
     * @private
     */
    finish(){
      const el = this.target[0];
      if (!el) {
        return;
      }

      const evt = document.createEvent('Event');

      ['webkitTransitionEnd' , 'oTransitionEnd' , 'otransitionend' , 'mozTransitionEnd', 'moztransitionend' , 'transitionend', 'transitionEnd'].forEach((event) => {
        evt.initEvent(event, false, true);
        this.target.forEach((element) => {
          element.dispatchEvent(evt);
        });
      });

      return this;
    }

    /**
     * Description...
     * @return  {instance}   (optional) return description...
     * @private
     */
    stop() {
      this.target.forEach((element) => {
        let i = 0;
        const style = window.getComputedStyle(element);
        while (element.style.length > i) {
          i++;
          const name = element.style[i - 1];
          if (name.indexOf('transition') > -1) continue;
          element.style[name] = style[name];
        }

        element.style.transitionDuration = '0s';

        ['o', 'ms', 'moz', 'webkit'].forEach((name) => {
          element.style[`${name}TransitionDuration`] = '0s';
        });

        const eventName = ['webkitTransitionEnd' , 'oTransitionEnd' , 'otransitionend' , 'mozTransitionEnd' , 'moztransitionend' , 'transitionend' , 'transitionEnd'];
        const eventFn = element.animateComplete;
        eventName.forEach((name) => {
          element.removeEventListener(name, eventFn);
          element.animateComplete = null;
          // element.removeAttribute( 'animate');
        });
      });

      return this;
    }

    /**
     * Description...
     * @return  {boolean}   (optional) return description...
     * @private
     */
    isAnimate() {
      return this.target.some((element) => {
        if (typeof element.animateComplete === 'function') return true;
      });
    }

    /**
     * Description...
     * @param {number} duration  (optional) param description...
     * @param {function} complete  (optional) param description...
     * @private
     */
    slideDown(duration, complete) {
      this.target.forEach((element) => {
        const orgHeight = element.style.height;

        const orgDisplay = element.style.display;
        element.style.display = 'block';

        const goHeight = window.getComputedStyle(element).height;
        element.style.height = '0px';

        const orgOverflow = element.style.overflow;
        element.style.overflow = 'hidden';


        function callBack() {
          element.style.display = orgDisplay;
          element.style.height = orgHeight;
          element.style.overflow = orgOverflow;

          if (complete !== undefined) {
            complete();
          }
        }

        this.css({
          overflow: 'hidden',
        });

        this.animate({
          height: goHeight,
        },
        duration, callBack);
      });
    }

    /**
     * Description...
     * @param {number} duration  (optional) param description...
     * @param {function} complete  (optional) param description...
     * @private
     */
    slideUp(duration, complete) {
      this.target.forEach((element) => {
        const orgCss = {
          height: element.style.height,
          overflow: element.style.overflow,
          padding: element.style.padding,
        };

        function callBack() {
          element.style.height = orgCss.height;
          element.style.overflow = orgCss.overflow;
          element.style.padding = orgCss.padding;

          if (complete !== undefined) {
            complete();
          }
        }

        element.style.height = window.getComputedStyle(element).height;

        setTimeout((() => {
          this.animate({
            overflow: 'hidden',
            height: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }, duration, callBack);
        }).bind(this), 30);
      });
    }

    /**
     * Description...
     * @return {number} (optional) return description...
     * @private
     */
    index() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      let index = 0;
      Array.prototype.slice.call(el.parentNode.children).forEach((ele , idx) => {
        if (el === ele) {
          index = idx;
        }
      });

      return index;
    }

    /**
     * position. a DOMRect object providing information about the size of an element and its position relative to the viewport.
     * @return {object|null} a DOMRect object
     * @private
     */
    offset() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      return el.getBoundingClientRect();
    }

    /**
     * size.
     * @return {number|null}  (optional) return description...
     * @private
     */
    width() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      const style = window.getComputedStyle(el);
      return el.offsetWidth - parseInt(style.paddingLeft, 10) - parseInt(style.paddingRight, 10) - parseInt(style.borderLeftWidth, 10) - parseInt(style.borderRightWidth, 10);
    }

    /**
     * Description...
     * @return {number|null}  (optional) return description...
     * @private
     */
    innerWidth() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      const style = window.getComputedStyle(el);
      return el.offsetWidth - parseInt(style.borderLeftWidth, 10) - parseInt(style.borderRightWidth, 10);
    }

    /**
     * Description...
     * @return {number|null}  (optional) return description...
     * @private
     */
    outerWidth() {
      // const style = window.getComputedStyle(this.target[0]);
      // return parseInt(style.width,10);
      const el = this.target[0];
      if (!el) {
        return;
      }

      return el.clientWidth;
    }

    /**
     * Description...
     * @return {number|null}  (optional) return description...
     * @private
     */
    height() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      const style = window.getComputedStyle(el);
      return el.offsetHeight - parseInt(style.paddingTop, 10) - parseInt(style.paddingBottom, 10) - parseInt(style.borderTopWidth, 10) - parseInt(style.borderBottomWidth, 10);
    }

    /**
     * Description...
     * @return {number|null}  (optional) return description...
     * @private
     */
    innerHeight() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      const style = window.getComputedStyle(el);
      return el.offsetHeight - parseInt(style.borderTopWidth, 10) - parseInt(style.borderBottomWidth, 10);
    }

    /**
     * Description...
     * @return {number|null}  (optional) return description...
     * @private
     */
    outerHeight() {
      const el = this.target[0];
      if (!el) {
        return;
      }

      return el.clientHeight;
    }

    /**
     * Description...
     * @return {boolean}  (optional) return description...
     * @private
     */
    isImageLoad() {
      return (this.target[0].naturalWidth > 0 && this.target[0].naturalHeight) ? true : false;
    }

    /**
     * Description...
     * @return {boolean}  (optional) return description...
     * @private
     */
    hasClass(className) {
      const el = this.target[0];
      if (!el) {
        return;
      }

      return new RegExp(`(\\s|^)${className}(\\s|$)`).test(el.className);
    }

    /**
     * Description...
     * @param {string} className (optional) param description...
     * @private
     */
    addClass(className) {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        element.classList.add(className);
      });
    }

    /**
     * Description...
     * @param {string} className (optional) param description...
     * @private
     */
    removeClass(className) {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        element.classList.remove(className);
      });
    }

    /**
     * Description...
     * @param {string} className (optional) param description...
     * @private
     */
    toggleClass(className) {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        element.classList.toggle(className);
      });
    }

    /**
     * attribute control
     * @param {string} attribute (optional) param description...
     * @param {string} value (optional) param description...
     * @return  {instance|null}   (optional) return description...
     * @private
     */
    attr(attribute , value) {
      if (!this.target){
        return;
      }

      const arg = arguments.length;
      if (arg > 1) {
        this.target.forEach((element) => {
          if (!element.setAttribute) {
            return;
          }

          element.setAttribute(attribute, value);
        });
      } else {
        const ele = this.target[0];
        if (ele) {
          return ele.getAttribute(attribute);
        } else {
          return false;
        }
      }

      return this;
    }

    /**
     * Description...
     * @param {string} attribute (optional) param description...
     * @private
     */
    removeAttr(attribute) {
      if (!this.target) {
        return;
      }

      this.target.forEach((element) => {
        element.removeAttribute(attribute);
      });
    }

    /**
     * text control
     * @param {string} string (optional) param description...
     * @private
     */
    text(string) {
      this.target.forEach((element) => {
        element.textContent = string;
      });
    }

    /**
     * Description...
     * @param {string} str (optional) param description...
     * @private
     */
    innerHTML(str) {
      if (!this.target) {
        return;
      }
      this.target[0].innerHTML = str;
    }

    /**
     * html element insert
     * @param {array|string} insert (optional) param description...
     * @private
     */
    append(insert) {
      this.target.forEach((element) => {
        if (Array.isArray(insert)) {
          insert.forEach((add) => {
            if (typeof add === 'string') {
              element.insertAdjacentHTML('beforeend', add);
            } else {
              element.appendChild(add);
            }
          });
        } else {
          if (typeof insert === 'string') {
            element.insertAdjacentHTML('beforeend', insert);
          } else {
            element.appendChild(insert);
          }
        }
      });
    }

    /**
     * html element insert
     * @param {array|string} insert (optional) param description...
     * @private
     */
    after(insert) {
      this.target.forEach((element) => {
        if (Array.isArray(insert)) {
          insert = [...insert].reverse();
          insert.forEach((add) => {
            if (typeof add === 'string') {
              element.insertAdjacentHTML('afterend', add);
            } else {
              element.insertAdjacentElement('afterend', add);
            }
          });
        } else {
          if (typeof insert === 'string') {
            element.insertAdjacentHTML('afterend', insert);
          } else {
            element.insertAdjacentElement('afterend', insert);
          }
        }
      });
    }

    /**
     * html element insert
     * @param {array|string} insert (optional) param description...
     * @private
     */
    prepend(insert) {
      this.target.forEach((element) => {
        if (Array.isArray(insert)) {
          insert.forEach((add) => {
            if (typeof add === 'string') {
              element.insertAdjacentHTML('beforebegin', add);
            } else {
              if (add) {
                element.insertBefore(add , element.firstChild);
              }
            }
          });
        }else{
          if (typeof insert === 'string') {
            element.insertAdjacentHTML('beforebegin', insert);
          } else {
            if (insert) {
              element.insertBefore(insert, element.firstChild);
            }
          }
        }
      });
    }

    before(){}

    /**
     * Description...
     * @return {array|null} (optional) return description...
     * @private
     */
    clone() {
      if (!this.target[0]) {
        return;
      }

      const arr = [];
      this.target.forEach((element) => {
        arr.push(element.cloneNode(true));
      });

      return arr;
    }

    /**
     * Description...
     * @private
     */
    remove() {
      if (!this.target[0]) {
        return;
      }

      this.target.forEach((element) => {
        element.parentNode.removeChild(element);
      });
    }

    /**
     * Description...
     * @return {instance|null} (optional) return description...
     * @private
     */
    focus(){
      const el = this.target[0];
      if (! el || !el.focus) {
        return;
      }

      el.focus();

      return this;
    }

    /**
     * Description...
     * @return {array|null} (optional) return description...
     * @private
     */
    blur(){
      const el = this.target[0];
      if (!el) {
        return;
      }

      el.blur();

      return this;
    }

    /**
     * bind
     * @private
     */
    on(event, handler) {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        if (!Selector.instances.has(element)) {
          Selector.instances.set(element, {
            event: [],
            handler: [],
          });
        }

        Selector.instances.get(element).handler.push({
          'event': event,
          'handler': handler,
        });

        element.addEventListener(event, handler);
      });
    }

    /**
     * bind off
     * @param {string} event (optional) param description...
     * @param {function} handler (optional) param description...
     * @return {instance|null} (optional) return description...
     * @private
     */
    off(event, handler) {
      const el = this.target;
      if (!el) {
        return;
      }

      el.forEach((element) => {
        if (Selector.instances.has(element)) {
          const object = Selector.instances.get(element);

          if (event && handler) {
            const tarr = [];
            object.handler.forEach((obj) => {
              if (obj.event === event && obj.handler === handler) {
                element.removeEventListener(obj.event, obj.handler);
              } else {
                tarr.push({
                  'event': obj.event,
                  'handler': obj.handler,
                });
              }
            });

            object.handler = tarr;
          } else if (event) {
            const tarr = [];
            object.handler.forEach((obj) => {
              if (obj.event === event && element !== window) {
                element.removeEventListener(obj.event, obj.handler);
              } else {
                tarr.push({
                  'event': obj.event,
                  'handler': obj.handler,
                });
              }
            });

            object.handler = tarr;
          }else{
            if (element !== window) {
              object.handler.forEach((obj) => {
                element.removeEventListener(obj.event, obj.handler);
              });

              object.handler = [];
            }
          }
        }
      });
      return this;
    }

    /**
     * event trigger ie11 support
     * @param {string} event (optional) param description...
     * @private
     */
    trigger(event) {
      const el = this.target[0];
      if (!el) {
        return;
      }

      const evt = document.createEvent('Event');
      evt.initEvent(event, false, true);
      this.target.forEach((element) => {
        element.dispatchEvent(evt);
      });

      // el.dispatchEvent(evt);
    }

    /**
     * 바디 스크롤 혹은 태그 내 스크롤을 원하는 위치로 이동 (Move the body scroll or scroll within the tag to the desired position)
     * @author eunji park
     * @param {number} movePos ex) 500 , 픽셀(px) 단위
     * @param {number} delayTime=500 ex) 1000 , 미리세컨드(ms) 단위
     * @param {function} callBack=null 애니메이션 이후 실행할 콜백 (after scroll callback)
     * @return {boolean|null} (optional) return description...
     * @private
     */
    moveScroll(movePos, delayTime = 500, callBack = null) {
      const startTime = new Date().getTime();
      if (this.target.length === 0) {
        return false;
      }
      if (this.target[0].tagName !== 'HTML' && this.target[0].tagName !== 'BODY') {
        const endScrollPosition = movePos;
        const scrollingElement = this.target[0];
        const startPos = scrollingElement.scrollTop;
        const distance = endScrollPosition - startPos;
        const timeInMS = delayTime;
        const ratio = Math.ceil(Math.abs(distance) / Math.ceil(timeInMS / 16));

        requestAnimationFrame(function animate() {
          const now = new Date().getTime() - startTime;
          let movePos2 = 0;

          if (distance > 0) {
            movePos2 = scrollingElement.scrollTop + ratio;
            scrollingElement.scrollTop = scrollingElement.scrollTop > endScrollPosition ? endScrollPosition : movePos2;
          } else {
            movePos2 = scrollingElement.scrollTop - ratio;
            scrollingElement.scrollTop = scrollingElement.scrollTop < endScrollPosition ? endScrollPosition : movePos2;
          }

          if (now <= timeInMS) {
            requestAnimationFrame(animate);
          } else {
            if (distance > 0) {
              if (scrollingElement.scrollTop < endScrollPosition) {
                scrollingElement.scrollTop = endScrollPosition;
              }
            } else {
              if (scrollingElement.scrollTop > endScrollPosition) {
                scrollingElement.scrollTop = endScrollPosition;
              }
            }

            if (callBack !== null) {
              callBack();
            }
          }
        });
      } else {
        const endScrollPosition = Math.round(movePos);
        const startPos = document.body.scrollTop || document.documentElement.scrollTop;
        const distance = endScrollPosition - startPos;
        const ratio = Math.ceil(Math.abs(distance) / (delayTime / 16));
        const left = document.body.scrollLeft || document.documentElement.scrollLeft;
        let oldTop = null;

        requestAnimationFrame(function animate() {
          const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          if (oldTop === scrollTop) {
            if (callBack !== null) {
              callBack();
            }
            return;
          }

          let movePos2 = 0;

          if (distance > 0) {
            movePos2 = scrollTop + ratio;
            if (movePos2 > endScrollPosition) {
              movePos2 = endScrollPosition;
            }
          } else {
            movePos2 = scrollTop - ratio;
            if (movePos2 < endScrollPosition) {
              movePos2 = endScrollPosition;
            }
          }

          window.scrollTo(left, movePos2);
          oldTop = scrollTop;

          if (endScrollPosition !== movePos2) {
            requestAnimationFrame(animate);
          } else {
            if (callBack !== null) {
              callBack();
            }
          }
        });
      }
    }

    /**
     * 태그 내 스크롤X를 원하는 위치로 이동 (scroll within the tag to the desired position)
     * @author eunji85.kim
     * @param {number} movePos ex) 500 , 픽셀(px) 단위
     * @param {number} delayTime=500 ex) 1000 , 미리세컨드(ms) 단위
     * @param {function} callBack=null 애니메이션 이후 실행할 콜백 (after scroll callback)
     * @return {boolean|null} (optional) return description...
     * @private
     */
    moveScrollX(movePos, delayTime = 500, callBack = null) {
      const startTime = new Date().getTime();
      if (this.target.length === 0) {
        return false;
      }
      const endScrollPosition = movePos;
      const scrollingElement = this.target[0];
      const startPos = scrollingElement.scrollLeft;
      const distance = endScrollPosition - startPos;
      const timeInMS = delayTime;
      const ratio = Math.ceil(Math.abs(distance) / Math.ceil(timeInMS / 16));

      function finish(){
        scrollingElement.scrollLeft = endScrollPosition;
        if (callBack !== null) {
          callBack();
        }
      }

      requestAnimationFrame(function animate() {
        const now = new Date().getTime() - startTime;
        let movePos2 = 0;

        if (distance > 0) {
          movePos2 = scrollingElement.scrollLeft + ratio;
          if (scrollingElement.scrollLeft > endScrollPosition) {
            finish();
            return;
          } else {
            scrollingElement.scrollLeft = movePos2;
          }
        } else {
          movePos2 = scrollingElement.scrollLeft - ratio;
          if (scrollingElement.scrollLeft < endScrollPosition) {
            finish();
            return;
          } else {
            scrollingElement.scrollLeft = movePos2;
          }
        }

        if (now <= timeInMS) {
          requestAnimationFrame(animate);
        } else {
          if (distance > 0) {
            if (scrollingElement.scrollLeft < endScrollPosition) {
              finish();
            }
          } else {
            if (scrollingElement.scrollLeft > endScrollPosition) {
              finish();
            }
          }
        }
      });
    }
  }


  Selector.instances = new WeakMap();

  const $q = function(element) {
    return new Selector(element);
  };

  $q.ready = (handler) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handler);
    } else {
      handler();
    }
  };

  $q.load = (handler) => {
    document.addEventListener('readystatechange', (event) => {
      if (event.target.readyState === 'complete') {
        handler();
      }
    });
  };

  window.sg.common.libs = libs;
  window.sg.common.$q = $q;
})();

var $jscomp$this = this;
(() => {
  const $q = window.sg.common.$q;
  const utils = window.sg.common.utils;
  const KEY_CODE = window.sg.common.constants.KEY_CODE;
  const lazyLoad = window.sg.common.lazyLoad;

  const selector = {
    section: '.gnb',
  };

  const el = {
    window: null,
    component: null,
  };
  class Gnb {
    constructor(component) {
      this.selector = {
        gnbMenuWrap: '.gnb__menu-wrap',
        depth1: '.gnb__depth1',
        depth1Menu: '.gnb__depth1-menu',
        depth1Link: '.gnb__depth1-link',
        depth2: '.gnb__depth2',
        depth2Wrap: '.gnb__depth2-wrap',
        depth2Inner: '.gnb__depth2-inner',
        depth2Menu: '.gnb__depth2-menu',
        depth2Link: '.gnb__depth2-link',
        depth2Close: '.gnb__depth2-close',
        depth3Wrap: '.gnb__depth3-wrap',
        depth3Inner: '.gnb__depth3-inner',
        depth3Menu: '.gnb__depth3-menu',
        depth3Link: '.gnb__depth3-link',
        featureContainer: '.gnb__feature-container',
        loginBtn: '.gnb__logout-btn, .gnb__login-btn',
        loginLayer: '.gnb__login-layer',
        cartBtn: '.gnb__cart-btn',
        layerOpenBtn: '.js-layer-open',
        layerCloseBtn: '.layer-popup__close, .gnb-js-layer-close',
        layerWrap: '.layer-popup',
        layerDim: '.layer-popup-dim',
        hasDepthMenu: 'has-depth-menu',
        gnbDim: '.gnb__dimmed',
        gnbNavi: '.gnb__nav',
      };

      this.mobileSelector = {
        gnbContainer: '.gnb__depth1-container',
        gnbMenuBtn: '.gnb__menu-btn',
        gnbMenuClose: '.gnb__menu-close',
        gnbDepthBack: '.gnb__depth-back',
        utilLink: '.gnb__utility-mobile .gnb__utility-link',
      };

      this.el = {
        body: null,
        window: null,
        component: $q(component),
      };

      this.mobileEl = {
        gnbMenuBtn: null,
      };

      this.handler = {
        resize: this.resize.bind(this),
      };

      Gnb.instances.set(component, this);

      this.setElement();
      
      this.init();
    }

    setElement() {
      this.el.body = $q('body');
      this.el.window = $q(window);
      this.el.depth1 = this.el.component.find(this.selector.depth1);
      this.el.gnbMenuWrap = this.el.component.find(this.selector.gnbMenuWrap);
      this.el.depth1Menu = this.el.component.find(this.selector.depth1Menu);
      this.el.depth1Link = this.el.component.find(this.selector.depth1Link);
      this.el.depth2Wrap = this.el.component.find(this.selector.depth2Wrap);
      this.el.depth2Inner = this.el.component.find(this.selector.depth2Inner);
      this.el.depth2Menu = this.el.component.find(this.selector.depth2Menu);
      this.el.depth2Link = this.el.component.find(this.selector.depth2Link);
      this.el.depth3Link = this.el.component.find(this.selector.depth3Link);
      this.el.depth2Close = this.el.component.find(this.selector.depth2Close);
      this.el.depth3Wrap = this.el.component.find(this.selector.depth3Wrap);
      this.el.loginBtn = this.el.component.find(this.selector.loginBtn);
      this.el.loginLayer = this.el.component.find(this.selector.loginLayer);
      this.el.cartBtn = this.el.component.find(this.selector.cartBtn);
      this.el.layerOpenBtn = this.el.component.find(this.selector.layerOpenBtn);
      this.el.layerCloseBtn = this.el.component.find(this.selector.layerCloseBtn);
      this.el.layerDim = this.el.component.find(this.selector.layerDim);
      this.el.gnbDim = this.el.component.find(this.selector.gnbDim);
      this.el.depth1First = this.el.depth1Menu.eq(0).find(this.selector.depth1Link);
      this.el.featureContainer = this.el.component.find(this.selector.featureContainer);
      this.el.gnbNavi = this.el.component.find(this.selector.gnbNavi);
      
      this.mobileEl.gnbContainer = this.el.component.find(this.mobileSelector.gnbContainer);
      this.mobileEl.gnbMenuBtn = this.el.component.find(this.mobileSelector.gnbMenuBtn);
      this.mobileEl.gnbMenuClose = this.el.component.find(this.mobileSelector.gnbMenuClose);
      this.mobileEl.gnbDepthBack = this.el.component.find(this.mobileSelector.gnbDepthBack);
      this.mobileEl.utilLink = this.el.component.find(this.mobileSelector.utilLink);

      this.breakpoint = 1279;
      this.viewPortSize = 1440;

      this.depth2Flag = false; // whether gnb is open and closed
      this.desktopFlag = false;
      this.mobileFlag = false;
      this.dimShowFlag = null;
      this.dimHideFlag = null;
      this.loginFlag = null;
      this.dimEventFlag = false;
      this.animateTime = null;
      this.subOpenFlag = false;
    }

    init() {
      this.bindEvents();
    }

    reInit() {
      this.setElement();

      this.bindEvents();
    }

    resize() {
      if (this.breakpoint < utils.getViewPort().width) {
        if (this.desktopFlag === false) {
          this.desktopFlag = true;
          this.mobileFlag = false;

          this.el.gnbMenuWrap.css({
            'transition': 'none',
          });

          this.deactiveMobileGnb();

          this.resetGnb();

          this.unbindEvents();

          this.bindEvents();

          setTimeout(() => {
            this.el.gnbMenuWrap.css({
              'transition': '',
            });
          }, 50);
        }
      } else {
        if (this.mobileFlag === false) {
          this.desktopFlag = false;
          this.mobileFlag = true;

          this.el.gnbMenuWrap.css({
            'transition': 'none',
          });

          this.deactiveGnb();

          this.deactiveSnb();

          this.resetGnb();

          this.unbindEvents();

          this.bindEvents();

          setTimeout(() => {
            this.el.gnbMenuWrap.css({
              'transition': '',
            });
          }, 50);
        }
      }
    }

    // desktop handler
    toggleGnb(activeItem) {
      if (!activeItem.parent().hasClass('active')) {
        this.deactiveGnb(activeItem);

        if (activeItem.closest('.gnb__depth1-menu').hasClass('has-depth-menu')) {
          this.activeGnb(activeItem);
          
        }
      }
    }

    deactiveGnb(activeItem) {
      const isActiveParent = activeItem !== undefined ? !activeItem.parent().hasClass(this.selector.hasDepthMenu) : false;
      this.subOpenFlag = false;

      if (this.dimShowFlag !== null) {
        clearTimeout(this.dimShowFlag);
        
        this.dimShowFlag = null;
      }

      if (this.animateTime !== null) {
        clearTimeout(this.animateTime);

        this.animateTime = null;
      }
      
      this.el.depth1Link.target.forEach((item) => {
        const $item = $q(item).parent();
        const $itemInner = $item.find(this.selector.depth2Inner);
        const $itemInnerList = $itemInner.find(this.selector.depth2);
        const $itemClose = $item.find(this.selector.depth2Close);

        const removeInnerCls = () => {
          $itemInner.removeAttr('style');
          $itemInner.removeClass('active');

          $item.find(this.selector.depth2Wrap).css({
            'visibility': 'hidden',
          });

          $item.find(this.selector.depth2Menu).removeClass('active');

          if ($itemClose.css('visibility') === 'visible') {
            $itemClose.css({
              'visibility': 'hidden',
            });
          }
        };

        const removeCls = () => {
          $item.removeClass('active');
        };

        const fadeClose = () => {
          $itemClose.finish().animate({
            'opacity': 0,
          }, 400, 'cubic-bezier(.4,0,.2,1)', () => {
            $itemClose.css({
              'visibility': 'hidden',
            });
          });
        };

        if ($item.hasClass('active')) {
          $itemInnerList.removeClass('active');
          $item.find(this.selector.depth1Link).removeClass('active');
          this.el.gnbMenuWrap.removeClass('active');

          if (isActiveParent) {
            this.setHeight($itemInner, 0, 'animate', removeInnerCls);

            fadeClose();

            removeCls();

            if (this.el.gnbDim.hasClass('open')) {
              this.el.gnbDim.removeClass('open');
    
              this.dimHideFlag = setTimeout(() => {
                this.el.gnbDim.hide();
              }, 600);
            } else if (!this.el.gnbDim.hasClass('open') && this.el.gnbDim.css('display') === 'block') {
              this.el.gnbDim.hide();
              removeInnerCls();
            }

            this.depth2Flag = false;
          } else {
            removeInnerCls();

            fadeClose();

            removeCls();

            setTimeout(() => {
              this.setHeight($itemInner, 0, 'css');
            },30);
          }
        }
      });

      $q(`${this.selector.depth2Link} > svg.icon--next`).css({
        'transition-delay': '.2s, .2s',
      });

      this.dimEventFlag = false;
    }

    activeGnb(activeItem) {
      if (this.dimHideFlag !== null) {
        clearTimeout(this.dimHideFlag);

        this.dimHideFlag = null;
      }

      const $item = activeItem.parent();
      const $itemInner = $item.find(this.selector.depth2Inner);
      const $itemInnerList = $itemInner.find(this.selector.depth2);
      let $firstActiveSnb = null;

      if (this.openFlag === false) {
        $q('.gnb__depth2-link > svg.icon').css({
          'transition-delay': '.2s, .2s',
        });
      }

      if ($item.find(this.selector.depth2Menu).target.length > 0 && $item.find(`${this.selector.depth2Menu}:not(.gnb-api--mobile-only)`).target.length < 1) {
        $firstActiveSnb = $item.find(this.selector.depth2Menu).eq(0).find(this.selector.depth2Link);
      } else {
        $firstActiveSnb = $item.find(`${this.selector.depth2Menu}:not(.gnb-api--mobile-only)`).eq(0).find(this.selector.depth2Link);
      }
      this.activeSnb($firstActiveSnb);
      
      

      this.el.depth2Close.target.forEach((item) => {
        const $item = $q(item);

        if ($item.css('opacity') === '0' && $item.css('visibility') === 'visible') {
          $item.css({
            'visibility': 'hidden',
          });
        }
      });
      
      activeItem.addClass('active');
      $item.addClass('active');
      $itemInner.addClass('active');
      $itemInnerList.addClass('active');

      $item.find(this.selector.depth2Close).finish().css({
        'visibility': 'visible',
      });

      $item.find(this.selector.depth2Close).animate({
        'opacity': 1,
      }, 400, 'cubic-bezier(.4,0,.2,1)');

      this.el.gnbMenuWrap.addClass('active');

      $item.find(this.selector.depth2Wrap).css({
        'visibility': 'visible',
      });

      $q(`${this.selector.depth2Link} > svg.icon--next`).css({
        'transition-delay': '',
      });

      lazyLoad.setLazyLoad();

      if (!this.el.gnbDim.hasClass('open')) {
        this.el.gnbDim.show();

        this.dimShowFlag = setTimeout(() => {
          this.el.gnbDim.addClass('open');
        }, 50);
      }

      this.depth2Flag = true;
    }

    deactiveSnb() {
      this.el.depth2Link.target.forEach((item) => {
        const $item = $q(item).parent();

        if ($item.hasClass('active')) {
          $item.removeClass('active');
        }
        $item.closest(this.selector.depth2Wrap).addClass('one-col');
        $item.closest(this.selector.depth2Wrap).removeClass('all');
        $q('.gnb__feature-container').removeClass('active');
        document.querySelectorAll('.gnb__feature-container').forEach(el => {
          el.innerHTML = '';
        });
      });
    }

    activeSnb(activeItem, noActiveClass) {
      let innerHeight = 672;
      const $item = activeItem.parent();
      const $itemInner = $item.closest(this.selector.depth2Inner);
      const $itemInnerList = $item.find(this.selector.depth3Wrap);
      // const $itemInnerMenu = $item.find(this.selector.depth3Menu);
      const $depth2Menu = activeItem.closest(this.selector.depth2Inner).find(this.selector.depth2Menu);

      this.deactiveSnb();

      if (!$item.hasClass('active')) {
        !noActiveClass && $item.addClass('active');
        !noActiveClass && $item.closest(this.selector.depth2Wrap).removeClass('one-col');
        !noActiveClass && $item.closest(this.selector.depth2Wrap).addClass('all');


        const addHeight = activeItem.closest(this.selector.depth2Inner).find('.gnb__depth2-title-wrap').outerHeight() + 24;
        const depth2Height = $depth2Menu.parent().outerHeight() + addHeight;
        const depth3Height = $itemInnerList.target.length ? ($itemInnerList.outerHeight() + 6) + addHeight : 0;

        if (depth2Height > depth3Height) {
          innerHeight = depth2Height > innerHeight ? depth2Height : innerHeight;
        } else {
          innerHeight = depth3Height > innerHeight ? depth3Height : innerHeight;
        }

        if (this.depth2Flag === false || this.subOpenFlag === true) {
          this.setHeight($itemInner, innerHeight, 'animate');

          this.animateTime = setTimeout(() => {
            this.dimEventFlag = true;
          }, 500);
        } else {
          this.setHeight($itemInner, innerHeight, 'css');
          this.dimEventFlag = true;
        }

        this.activeDepth2Img(activeItem);
      }
    }
    activeDepth2Img($item, isMobile) {
      !isMobile && $item.closest(this.selector.depth2Inner).find('.gnb__feature-container').addClass('active');
      const subTitle = $item.closest(this.selector.depth2Inner).find('.gnb__depth2-title-text').target[0]? $item.closest(this.selector.depth2Inner).find('.gnb__depth2-title-text').target[0].textContent : '';
      const element = document.createElement('div');
      element.setAttribute('class', 'hybrid-class');
      element.innerHTML = $item.attr('data-flyout-img')? `
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide">
              <a class="gnb__feature-container-link" href="${$item.attr('data-flyout-url')}" data-link_cat="navigation" data-link_id="${$item.target[0].text}" data-link_meta="link_name:${$item.target[0].text}" data-link_position="navigation>gnb>${subTitle}>${$item.target[0].text}" data-event_name="select_${$item.target[0].text}_click">
            <div class="image">
              <img class="image__main image--loaded" src="${$item.attr('data-flyout-img')}"/>
            </div>
            <div class="gnb__feature-container-contents">
              <p class="gnb__feature-container-description ${$item.attr('data-flyout-theme')}">${$item.attr('data-flyout-text')}</p>
              <span class="cta cta--contained hidden cta--black">${$item.target[0].text}</span>
            </div>
          </a>
            </li>
          </ul>
        </div>
      </div>`: '';
      if(isMobile) {
        var imgContainer = document.querySelector('.gnb__depth2-menu.has-depth-menu.open .gnb__depth3 .hybrid-class');
        if(!imgContainer) {
          document.querySelector('.gnb__depth2-menu.has-depth-menu.open .gnb__depth3').appendChild(element);
        }

      } else {
        if(document.querySelector('.gnb__feature-container.active')) {
          document.querySelector('.gnb__feature-container.active').innerHTML = '';
          document.querySelector('.gnb__feature-container.active').appendChild(element);
        }
      }
      
      lazyLoad.setLazyLoad();
      // const sliders = document.querySelectorAll('.glide')
      // sliders.forEach(item => {
      //   new Glide(item, {autoplay: 3000}).mount();
      // })
    }
    setHeight(itemInner, innerHeight, type, callback) {
      let setInnerHeight = 0;

      if (innerHeight !== 0) {
        setInnerHeight = `${innerHeight}px`;
      }

      if (type === 'css') {
        itemInner.css({
          'transition': 'none',
          'height': setInnerHeight,
        });
      } else {
        itemInner.css({
          'transition': '',
        });

        itemInner.stop().animate({
          'height': setInnerHeight,
        }, 500, 'Cubic-bezier (0.4, 0, 0.2, 1)', callback);
      }
    }

    deactiveLoginMenu() {
      this.el.loginLayer.removeClass('active');

      this.loginFlag = null;
    }

    activeLoginMenu() {
      this.el.loginLayer.addClass('active');
    }

    // mobile handler
    moveActiveMenu() {
      const activeMenu = [];

      this.el.depth1Menu.target.forEach((firstItem) => {
        const $firstItem = $q(firstItem);

        if ($firstItem.hasClass('active-first')) {
          activeMenu.push($firstItem.find(this.selector.depth1Link));

          $firstItem.find(this.selector.depth2Menu).target.forEach((secondItem) => {
            const $secondItem = $q(secondItem);

            if ($secondItem.hasClass('active-second')) {
              activeMenu.push($secondItem.find(this.selector.depth2Link));
            }
          });
        }
      });

      if (activeMenu.length > 0) {
        this.activeMobileFirstMenu(activeMenu[0], activeMenu[1]);
      }
    }

    activeMobileGnb() {
      // S : IE bug
      $q(selector.section).css({
        'position': 'fixed',
        'width': '100%',
      });

      $q('#content').css({
        'padding-top': '56px',
      });
      // E : IE bug
      
      this.el.gnbMenuWrap.addClass('open');
      this.el.depth1.addClass('open');
      this.mobileEl.gnbDepthBack.attr('tabindex', '-1');

      if (this.el.component.hasClass('js-mobile-open')) {
        this.moveActiveMenu();
      }

      utils.hiddenScroll();
    }

    deactiveMobileGnb(closeFlag) {
      this.mobileEl.gnbContainer.removeClass('slide');
      this.el.gnbMenuWrap.removeClass('open');
      this.el.depth1.removeClass('open');

      // S : IE bug
      $q(selector.section).css({
        'position': '',
        'width': '',
      });

      $q('#content').css({
        'padding-top': '',
      });
      // E : IE bug

      this.el.depth1Menu.target.forEach((menu, idx) => {
        const $menu = $q(menu);

        if ($menu.hasClass('open')) {
          this.activeFirst = idx;

          $menu.removeClass('open');
          $menu.find(this.selector.depth2Wrap).hide();
          $menu.find(this.selector.depth2Wrap).removeClass('open');
          
          $menu.find(this.selector.depth2Menu).target.forEach((a, index) => {
            const $a = $q(a);

            if ($a.hasClass('open')) {
              this.activeSecond = index;

              $a.removeClass('open');
            }
          });
        }
      });

      this.el.depth1Link.removeAttr('tabindex');
      this.mobileEl.utilLink.removeAttr('tabindex');

      utils.visibleScroll();

      if (closeFlag) {
        this.mobileEl.gnbMenuBtn.focus();
      }
    }

    activeMobileFirstMenu(item, callback) {
      const $item = item.parent();

      this.mobileEl.gnbDepthBack.removeAttr('tabindex');

      if ($item.hasClass(this.selector.hasDepthMenu)) {
        $item.addClass('open');
        this.mobileEl.gnbContainer.addClass('slide');

        $item.find(this.selector.depth2Wrap).css({
          'display': 'block',
        });

        this.el.depth2Menu.target.forEach((menu) => {
          const $menu = $q(menu);
  
          if ($menu.hasClass(this.selector.hasDepthMenu)) {
            let activeHeight = $menu.find(this.selector.depth3Inner).height();
            if($menu.find('.hybrid-class .gnb__feature-container-link').target.length == 0) {
              activeHeight += 400;
            }
            $menu.find(this.selector.depth3Inner).attr('data-height', activeHeight);
            
            if (!$menu.hasClass('open')) {
              $menu.find(this.selector.depth3Wrap).css({
                'height': '0',
              });
            }
          }
        });

        $item.find(this.selector.depth2Wrap).addClass('open');

        this.el.depth1Link.attr('tabindex', '-1');
        this.mobileEl.utilLink.attr('tabindex', '-1');

        $item.find(this.selector.depth2Inner).scrollTop(0);
      }

      if (callback !== undefined) {
        setTimeout(() => {
          this.activeMobileSecondMenu(callback);
        }, 600);
      }

      lazyLoad.setLazyLoad();

    }
    activeMobileSecondMenu(item) {
      const $activeItem = item.parent();
      const $dropdownCta = $activeItem.find('.icon--dropdown');

      if ($dropdownCta.target.length > 0) {
        const scrollPos = $activeItem.index() * 56;

        if (!$activeItem.hasClass('open')) {
          let $closeDepth = null;

          this.el.depth2Menu.target.forEach((element) => {
            const $element = $q(element);

            if ($element.hasClass('open')) {
              $closeDepth = $element.find(this.selector.depth3Wrap);

              $closeDepth.css({
                'transition-duration': '.2s',
                'visibility': 'hidden',
                'height': '0',
              });

              $element.removeClass('open');
            }
          });
          $activeItem.addClass('open');
          this.activeDepth2Img(item, true);
          if ($activeItem.hasClass(this.selector.hasDepthMenu)) {
            const innerHeight = parseInt($activeItem.find(this.selector.depth3Inner).attr('data-height'));

            $activeItem.find(this.selector.depth3Wrap).css({
              'visibility': 'visible',
              'height': `${innerHeight + 17}px`,
            });
            setTimeout(() => {
                if ($closeDepth !== null) {
                  $closeDepth.css({
                    'transition-duration': '',
                  });
    
                  $closeDepth = null;
                }

                $activeItem.closest(this.selector.depth2Inner).moveScroll(scrollPos, 100);
              }, 200);
            
          }
        } else {
          if ($activeItem.hasClass(this.selector.hasDepthMenu)) {
            $activeItem.find(this.selector.depth3Wrap).css({
              'height': '0',
            });

            setTimeout(() => {
              $activeItem.closest(this.selector.depth2Inner).moveScroll(0, 100);
            }, 200);

            setTimeout(() => {
              $activeItem.find(this.selector.depth3Wrap).css({
                'visibility': 'hidden',
              });
            }, 300);
          }
          $activeItem.removeClass('open'); 
        }
      }
    }

    backDepthMobile(item) {
      let activeIdx = 0;

      this.el.depth1Link.removeAttr('tabindex');
      this.mobileEl.utilLink.removeAttr('tabindex');

      this.el.depth1Menu.target.forEach((menu, idx) => {
        const $menu = $q(menu);

        if ($menu.hasClass('open')) {
          activeIdx = idx;
          this.mobileEl.gnbContainer.removeClass('slide');
          
          $menu.removeClass('open');
          $menu.find(this.selector.depth2Link).removeClass('open');
          $menu.find(this.selector.depth2Menu).removeClass('open');
          $menu.find(this.selector.depth2Wrap).removeClass('open');
          $menu.find(this.selector.depth2Inner).scrollTop(0);

          setTimeout(() => {
            $menu.find(this.selector.depth2Wrap).css({
              'display': 'none',
            });
          }, 200);

          $menu.find(this.selector.depth3Wrap).target.forEach((item) => {
            const $item = $q(item);
    
            $item.css({
              'height': '',
            });
          });
        }
      });

      this.el.depth1Menu.eq(activeIdx).find(this.selector.depth1Link).focus();

      this.mobileEl.gnbContainer.trigger('scroll');
    }

    setFocusFoward(e) {
      let activeNum = false;

      if (e.keyCode === KEY_CODE.TAB && e.shiftKey === false) {
        this.el.depth1Menu.target.forEach((item) => {
          const $item = $q(item);

          if ($item.hasClass('open')) {
            $item.find(this.mobileSelector.gnbDepthBack).focus();
            activeNum = true;
          }
        });

        if (activeNum === false) {
          this.el.depth1First.focus();
        }
      }

      e.preventDefault();
    }

    setFocusReverse(e) {
      if (e.keyCode === KEY_CODE.TAB && e.shiftKey === true) {
        this.mobileEl.gnbMenuClose.focus();

        e.preventDefault();
      }
    }

    setCloseFocus(e) {
      let activeNum = false;

      if (e.keyCode === KEY_CODE.TAB && e.shiftKey === false) {
        this.el.depth1Menu.target.forEach((item) => {
          const $item = $q(item);

          if ($item.hasClass('open')) {
            $item.find(this.mobileSelector.gnbDepthBack).focus();
            activeNum = true;
          }
        });

        if (activeNum === false) {
          this.el.depth1First.focus();
        }

        e.preventDefault();
      } else if (e.keyCode === KEY_CODE.ENTER) {
        this.deactiveMobileGnb(true);

        e.preventDefault();
      }
    }

    // common handler
    openPopup(item) {
      const layerId = item.dataset.divId;
      const $activePopup = $q(`${layerId}`);

      if ($activePopup.css('display') === 'none') {
        this.el.layerDim.show();

        $activePopup.attr('tabindex', '0');
        $activePopup.show();
        $activePopup.focus();
      } else {
        this.closePopup();
      }
    }

    closePopup(item) {
      const $unactivePopup = $q(item.closest(this.selector.layerWrap));
      const layerId = $unactivePopup.attr('id');

      this.el.layerDim.hide();

      $unactivePopup.hide();
      $unactivePopup.removeAttr('tabindex');

      this.el.layerOpenBtn.target.forEach((element) => {
        if (element.dataset.divId === `#${layerId}`) {
          element.focus();
        }
      });


    }

    unbindEvents() {
      this.el.depth1Link.off('mouseenter');
      this.el.depth1Link.off('keydown');
      this.el.depth1Link.off('click');
      this.el.depth2Close.off('click');
      this.el.depth2Link.off('mouseenter');
      this.el.depth2Link.off('keydown');
      this.el.depth2Link.off('focus');
      this.el.depth2Link.off('click');
      this.el.loginBtn.off('mouseenter');
      this.el.loginBtn.off('mouseleave');
      this.el.loginBtn.off('keydown');
      this.el.loginLayer.off('mouseenter');
      this.el.loginLayer.off('mouseleave');
      this.el.cartBtn.off('focus');
      this.el.gnbDim.off('mouseenter');
      this.el.gnbNavi.off('mouseleave');

      this.mobileEl.gnbMenuBtn.off('click');
      this.mobileEl.gnbMenuClose.off('click');
      this.mobileEl.gnbMenuClose.off('keydown');
      this.mobileEl.gnbDepthBack.off('click');
      this.mobileEl.gnbDepthBack.off('keydown');
      this.el.depth1First.off('keydown');
      this.el.featureContainer.off('keydown');
    }

    resetGnb() {
      this.el.depth2Wrap.removeAttr('style');

      this.el.depth3Wrap.css({
        'visibility': '',
        'height': '',
      });

      this.el.depth2Close.css({
        'visibility': 'hidden',
      });

      this.el.gnbDim.removeClass('open');
      this.el.gnbDim.hide();

      setTimeout(() => {
        this.el.depth2Inner.removeAttr('style');
      }, 500);
    }

    bindEvents() {
      if (this.breakpoint < utils.getViewPort().width) {
        this.desktopEvents();
      } else {
        this.mobileEvents();
      }

      this.el.window.off('resize', this.handler.resize).on('resize', this.handler.resize);

      // open layer popup
      this.el.layerOpenBtn.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.openPopup(item);
        });
      });

      // close layer popup
      this.el.layerCloseBtn.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.closePopup(item);
        });
      });
    }

    mobileEvents() {
      // gnb active
      this.mobileEl.gnbMenuBtn.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.activeMobileGnb();
        });
      });

      // gnb close
      this.mobileEl.gnbMenuClose.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.deactiveMobileGnb(true);
        });

        $item.off('keydown').on('keydown', (event) => {
          this.setCloseFocus(event);
        });
      });

      this.el.depth1Link.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.activeMobileFirstMenu($item);
        });
      });

      this.mobileEl.gnbDepthBack.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.backDepthMobile($item);
        });

        $item.off('keydown').on('keydown', (event) => {
          this.setFocusReverse(event);
        });
      });

      this.el.depth2Link.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.activeMobileSecondMenu($item);
          
        });
      });

      this.el.depth1First.off('keydown').on('keydown', (event) => {
        this.setFocusReverse(event);
      });
    }

    desktopEvents() {
      // gnb active
      this.el.depth1Link.target.forEach((item) => {
        const $item = $q(item);

        $item.off('mouseenter').on('mouseenter', () => {
          this.toggleGnb($item);
        });

        $item.off('keydown').on('keydown', (event) => {
          if (event.keyCode === KEY_CODE.ENTER) {
            this.toggleGnb($item);

            if ($item.parent().hasClass('has-depth-menu')) {
              event.preventDefault();
            }
          }
        });
      });

      // gnb close
      this.el.depth2Close.target.forEach((item) => {
        const $item = $q(item);

        $item.off('click').on('click', () => {
          this.deactiveGnb($item);
        });
      });

      this.el.gnbDim.off('mouseenter').on('mouseenter', () => {
        if (this.dimEventFlag === true) {
          this.deactiveGnb(this.el.gnbDim);
        }
      });

	  this.el.gnbNavi.off('mouseleave').on('mouseleave', () => {
        if (this.breakpoint < utils.getViewPort().width && this.el.gnbDim.target[0].style.display === 'block') {
          this.deactiveGnb(this.el.gnbDim);
        }
      });
      
      // 2depth active
      this.el.depth2Link.target.forEach((item) => {
        const $item = $q(item);

        $item.find('.gnb__depth2-link-text, .icon--next').off('mouseenter').on('mouseenter', () => {
          this.subOpenFlag = true;

          this.activeSnb($item);
          this.activeDepth2Img($item);
        });

        $item.find('.gnb__depth2-link-text, .icon--next').off('focus').on('focus', () => {
          this.subOpenFlag = true;

          this.activeSnb($item);
          this.activeDepth2Img($item);
        });

        $item.find('.gnb__depth2-link-text, .icon--next').off('click').on('click', (event) => {
          if ($item.parent().hasClass('has-depth-menu')) {
            event.preventDefault();
          }
        });
      });


      // login area active
      this.el.loginBtn.target.forEach((item) => {
        const $item = $q(item);

        $item.off('focus').on('focus', () => {
          this.activeLoginMenu();
        });

        $item.off('mouseenter').on('mouseenter', () => {
          if (this.loginFlag === null) {
            this.activeLoginMenu();
          } else {
            clearTimeout(this.loginFlag);

            this.loginFlag = null;
          }
        });

        $item.off('mouseleave').on('mouseleave', () => {
          if (this.loginFlag !== null) {
            clearTimeout(this.loginFlag);

            this.loginFlag = null;
          }
          
          this.loginFlag = setTimeout(() => {
            this.deactiveLoginMenu();
          }, 200);
        });

        $item.off('keydown').on('keydown', (event) => {
          if (event.keyCode === KEY_CODE.TAB && event.shiftKey === true) {
            this.el.depth1Menu.eq(this.el.depth1Menu.target.length - 1).find(this.selector.depth1Link).focus();
            this.deactiveLoginMenu();
    
            event.preventDefault();
          }
        });
      });

      this.el.loginLayer.target.forEach((item) => {
        const $item = $q(item);

        $item.off('mouseenter').on('mouseenter', () => {
          if (this.loginFlag !== null) {
            clearTimeout(this.loginFlag);
          }
        });

        $item.off('mouseleave').on('mouseleave', () => {
          if (this.loginFlag !== null) {
            clearTimeout(this.loginFlag);
          }

          this.loginFlag = setTimeout(() => {
            this.deactiveLoginMenu();
          }, 200);
        });
      });

      // focus on cart button
      this.el.cartBtn.target.forEach((item) => {
        const $item = $q(item);

        $item.off('focus').on('focus', () => {
          this.deactiveLoginMenu();
        });
      });
    }
  }

  const init = () => {
    el.component = $q(selector.section);
    
    if (!el.component.target.length) {
      return;
    }

    el.component.target.forEach((element) => {
      if (!Gnb.instances.has(element)) {
        new Gnb(element);
      }
    });
  };

  const reInit = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      el.component = $q(selector.section);
      
      el.component.target.forEach((element) => {
        if (Gnb.instances.has(element)) {
          const instances = Gnb.instances.get(element);
          instances.reInit();
        } else {
          new Gnb(element);
        }
      });
    }
  };

  Gnb.instances = new WeakMap()

  window.sg.components.gnbV2 = {
    init,
    reInit,
  };
})();







(function ($) {
    "use strict";

    var $gnbSearch = $("section.gnb-search-v2");

    if (!$gnbSearch) {
        return;
    }

    var siteCode = $("#siteCode").val();
    var clientCode = 'b2c'

    //sds api
    var esapiDomain = $.trim($("#esapiSearchDomain").val());
    //ai api
    var aiSearchDomain = "https://sribsrch.ecom.samsung.com/estoresearch-api/v1/scom";
    var sribSearchDomain = "https://sribsrch.ecom.samsung.com/estoresearch-api/v1/scom";
    var recommendedBridgeDomain = (window.location.host.indexOf('www') > -1 || window.location.host.indexOf("origincl") > -1) ? "/us/api/v1/bridge/cacheable/ecom-data"  : "https://us.ecom-stg.samsung.com/v1/bridge/cacheable/ecom-data";
    var popularSearchDomain = "/us/api/es_search_global/global/popular_search.json";
    var apiStage = $.trim($("#apiStageInfo").val());
    //TODO 12/18 배포시에는 /aisearch 값으로 변경
    var linkSearchURL = $("#sc_gnb_searchURL").val();
    var gPriceCurrency = $("#gPriceCurrency").val();
    let AI_SEARCH_URL = $("#sc_gnb_AI_searchURL").val()

    var placeholder = $('#sc_gnb_placeholder').val();
    var aiSearchUseYn = $('#sc_gnb_aiSearchUseYn').val();
    var bdcApiUseYn = $('#sc_gnb_bdcApiUseYn').val();
    var storeID = $('#siteCode').val();

    var searchKeywords = $.cookies.getSearchKeyword();
    var popularKeywords = [];
    var recommendedKeywords = [];
    var preSearchKeyword = "";
    var keySendTimeOut = null;

    var isPopularSearched = false;
    var isSearching = false;
    var isAiSearch = aiSearchUseYn === "Y";
    var isBdcApiUse = bdcApiUseYn === "Y";
    let url = document.location.href;
    let metricsCount = 0;
    let metricsQuery = "";
    let isUSRecommendedLoading = false;

    var pageTrack = (window?.digitalData?.page?.pageInfo?.pageTrack || "").toLowerCase();

    var apiConfig = {
        keywordKey: '',
        url: null,
        data: {}
    };
    var maxCnt = {
        recommend: 4,
        popular: 4,
        suggest: 4
    };
    var gnbSearchEl = {
        gnbSearchInput: $gnbSearch.find(".gnb-search-v2__input"),                        //검색키워드
        gnbSearchInputClearButton: $gnbSearch.find(".gnb-search-v2__clear"),             //검색키워드 삭제
        gnbSearchInputSubmitButton: $gnbSearch.find(".gnb-search-v2__btn-search"),       //검색돋보기
        gnbSearchResultWrap: $gnbSearch.find(".gnb-search-v2__result-wrap"),             //결과 바닥
        gnbSearchRecent: $gnbSearch.find(".gnb-search-v2__recent"),                      //최근검색(구History)
        gnbSearchPopular: $gnbSearch.find(".gnb-search-v2__popular"),                    //인기검색
        gnbSearchSuggested: $gnbSearch.find(".gnb-search-v2__suggested"),                //관련검색 : Suggested
        gnbSearchRelatedThumb: $gnbSearch.find(".gnb-search-v2__related"),               //썸네일 : Related
        gnbSearchRecommendedThumb: $gnbSearch.find(".gnb-search-v2__recommended"),       //썸네일 : Recommendation
        gnbSearchNoSuggestions: $gnbSearch.find(".gnb-search-v2__no-suggestions"),       //결과없음
        gnbSearchCloseBtn: $gnbSearch.find(".gnb-search-v2__btn--close"),                //닫기버튼
        gnbSearchRecommendedTitle: $gnbSearch.find(".gnb-search-v2__recommended .gnb-search-v2__thumb-title") //Recommendation Title
    };

    function _hideAll() {
        gnbSearchEl.gnbSearchRecent.addClass("gnb-search-v2__list-wrap--hide");
        gnbSearchEl.gnbSearchSuggested.addClass("gnb-search-v2__list-wrap--hide");
        gnbSearchEl.gnbSearchNoSuggestions.addClass("gnb-search-v2__list-wrap--hide");
        gnbSearchEl.gnbSearchPopular.addClass("gnb-search-v2__list-wrap--hide");
    }


    // 입력X 히스토리 있는경우 O History | Recommended
    // 입력X 히스토리 없는경우 X Popular(AI) | Recommended - BDC
    //                     X Popular(ES) | Recommended - BDC

    // 입력중 검색 결과 있는경우 O Suggested(SRIB) | Related(SRIB AI 타이핑에 대한 갱신)
    //                      O Suggested(ES)   | Recommended(BDC 초기 호출 후 데이터 저장) - SDS
    // 입력중 검색 결과 없는경우 X NoSuggested,
    //                        Popular(AI)
    //                      X NoSuggested,
    //                        Popular(ES 초기 호출 후 데이터 저장)

    function _showHistory() {
        _hideAll()
        _drawHistoryHtml();
        gnbSearchEl.gnbSearchRecent.removeClass("gnb-search-v2__list-wrap--hide");
        $('.gnb-search-v2__searches').removeClass('full-width');
    }
    function _showPopular() {
        _hideAll();
        if (popularKeywords.length > 0) {
            _drawHistoryHtml(popularKeywords);
            gnbSearchEl.gnbSearchPopular.removeClass("gnb-search-v2__list-wrap--hide");
            $('.gnb-search-v2__searches').removeClass('full-width');
        }
    }
    function _showNoSuggested(relatedCnt) {
        _showPopular();
        gnbSearchEl.gnbSearchNoSuggestions.removeClass("gnb-search-v2__list-wrap--hide");
        if (!relatedCnt || relatedCnt == 0) {
            $('.gnb-search-v2__searches').addClass('full-width');
        } else {
            $('.gnb-search-v2__searches').removeClass('full-width');
        }
    }

    function _showSuggested() {
        gnbSearchEl.gnbSearchSuggested.removeClass("gnb-search-v2__list-wrap--hide");
        $('.gnb-search-v2__searches').removeClass('full-width');
    }
    function _hideSuggested() {
        gnbSearchEl.gnbSearchSuggested.addClass("gnb-search-v2__list-wrap--hide");
    }
    function _showRecommendedTitle() {
        gnbSearchEl.gnbSearchRecommendedTitle.removeClass("gnb-search-v2__list-wrap--hide");
    }
    function _showRecommendedThumb() {
        gnbSearchEl.gnbSearchRelatedThumb.addClass("gnb-search-v2__list-wrap--hide");
        gnbSearchEl.gnbSearchRecommendedThumb.removeClass("gnb-search-v2__list-wrap--hide");
    }
    function _showRelatedThumb() {
        gnbSearchEl.gnbSearchRecommendedThumb.addClass("gnb-search-v2__list-wrap--hide");
        gnbSearchEl.gnbSearchRelatedThumb.removeClass("gnb-search-v2__list-wrap--hide");
    }
    function _hideRecommendedThumb() {
        gnbSearchEl.gnbSearchRecommendedThumb.addClass("gnb-search-v2__list-wrap--hide");
    }
    function _hideRelatedThumb() {
        gnbSearchEl.gnbSearchRelatedThumb.addClass("gnb-search-v2__list-wrap--hide");
    }
    function _hideRecommendedTitle() {
        gnbSearchEl.gnbSearchRecommendedTitle.addClass("gnb-search-v2__list-wrap--hide");
    }

    function _drawHistoryHtml() {
        if (0 < searchKeywords.length) {
            var template = "";
            $.each(searchKeywords, function (idx, keyword) {
                template += '<li class="gnb-search-v2__list-item" role="listitem">';
                template += '   <a class="gnb-search-v2__list-link" title="Search" href="' + linkSearchURL + encodeURIComponent(stripTags(keyword)) + '" data-event_name="search layer-' + pageTrack + '-search history-search" data-link_cat="search" data-link_position="search layer" data-link_id="search history:' + exceptionCharacter(keyword) + '">';
                template += '       <span class="gnb-search-v2__list-link-text">' + keyword + '</span>';
                template += '   </a>';
                template += '</li>';
            });
            gnbSearchEl.gnbSearchRecent.find("ul").html(template);
        }
    }
    async function _getRecommended() {
        if (isUSRecommendedLoading) return;
        isUSRecommendedLoading = true;

        try {
            const mboxes = ["target-search-recs-scom51498"];
            let params = {};
            const pageURL = window.location.href;

            const getPageName = () => {
              var pageType =
                window.analytics_data?.page_type ??
                window.utag_data?.page_type ??
                window.utag_data?.es_page_title ??
                "other";

                if (pageType === "us:web:p6:b2c:home") {
                    return "home";
                } else if (pageType.indexOf("us:web:p6:b2c:pcd") > -1) {
                    if (pageType.indexOf("flagship pdp") > -1) {
                        return "marketing_landing_page";
                    } else {
                        return "product_category_detail";
                    }
                } else if (pageType.toLowerCase() === "pdp" || pageType.toLowerCase() === "product_detail_page") {
                    return "product_detail_page";
                } else if (pageType.toLowerCase() === "pfp" || pageType.toLowerCase() === "product_finder_page") {
                    return "product_finder_page";
                } else if (pageType.toLowerCase() === "marketing_landing_page") {
                    return "marketing_landing_page";
                } else if (pageType.toLowerCase() === "lob adp" || pageType.toLowerCase() === "all_deals_page") {
                    if (pageURL.split('/').filter(_ => _).pop() === 'all-deals') {
                        return "all_deals_page";
                    } else {
                        return "all_deals_category_page";
                    }
                } else if (pageType === "support") {
                    return "support";
                } else if (pageType === "us:web:p5:b2c:cart") {
                    return "cart";
                } else {
                    return pageType;
                }
            };

            const getSku = () => {
                return window.AEMapp.haPdpConf
                    .getMainSku()
                    ?.replaceAll("/", "")
                    ?.trim();
            };

            if (getPageName() === "PDP") {
                params = {
                    pageName: getPageName(),
                    productSku: getSku(),
                    pageURL,
                };
            } else {
                params = {
                    pageName: getPageName(),
                    pageURL,
                };
            }

            const resp = await customMboxRender({ mboxes, params });
            if (resp && resp.length) {
                window.RECOMMENDATIONS_DATA = {};
                resp.forEach((_) => {
                    const recommendedData = JSON.parse(_.content);
                    const recommendProducts = recommendedData?.tgtRecommendations?.items ?? [];
                    window.RECOMMENDATIONS_DATA[_.decisionScope] = recommendProducts;
                    _getRecommendedData(recommendProducts)
                })
            }
        } catch (err) {
            console.log("Error in getting Recommendation data from PZN" + err);
        }
        finally{
            isUSRecommendedLoading = false;
        }
    }

 function hasValidPriceType(priceType) {
   if (
     priceType === null ||
     priceType === undefined ||
     priceType === "null" ||
     priceType === "undefined" ||
     priceType === ""
   ) {
     return false;
   }
   const num = parseFloat(String(priceType).trim());
   return !isNaN(num) && num !== 0;
 }

 function _getRecommendedData(recProductsList) {
   if (Array.isArray(recProductsList) && recProductsList.length) {
     let result = [];
     recProductsList.forEach((item) => {
       const validValue = hasValidPriceType(item?.value || null);
       const validPromoPrice = hasValidPriceType(item?.promoPrice || null);
       const validStockType = item?.stockFlag !== "N";

       /**
        * As per Jira comment : https://jira-na.secext.samsung.net/browse/SCOM-91402?focusedId=4242946&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-4242946
        * If value and promoPrice both are $0 / null / empty => skip from adding into UI
        * If stockFlag is not valid => skip from adding into UI
        * promoPrice will be used as the price of the product, if promoPrice is invalid then use value
        */

       // Skip if both value and promoPrice are invalid
       if (!validValue && !validPromoPrice) return;

       // Skip if stock is invalid
       if (!validStockType) return;

       // Assign displayValue from FED side
       item.customDisplayValue = validPromoPrice ? item.promoPrice : item.value;
       result.push(item);
     });
     recommendedKeywords = result;
     _drawRecommendedHtml(result);
     _showRecommendedTitle();
   }
 }

    function _drawRecommendedHtml(data) {
        var template = "";

        data.forEach((el, idx) => {
            if (idx < maxCnt.recommend) {
                template +=
                    `<li class="gnb-search-v2__thumb-item">
                  <a data-link_cat="search" data-link_id="pzn>recommended>card ${idx + 1}>${el.name?.replaceAll('"', '')}" data-link_position="search>search layer" data-event_name="select_search_recommended_${el.name?.replaceAll('"', '')}_card${idx + 1}_click"  href="${el?.pageUrl}" class="gnb-search-v2__thumb-link gnb-tagging-trigger">
                    <div class="gnb-search-v2__thumb-image">
                      <div class="image">
                        <img class="image__main lazy-load-man responsive-img hover-scale" data-desktop-src="${el.thumbnailUrl}" data-mobile-src="${el.thumbnailUrl}" alt="${el.name}" role="img" data-comp-name="image">
                      </div>
                    </div>
                    <p class="gnb-search-v2__thumb-name">${el.name}</p>
                    <p class="gnb-search-v2__thumb-price">$${el.customDisplayValue}</p>
                  </a>
                </li>`;
            }
        });
        gnbSearchEl.gnbSearchRecommendedThumb.find("ul").html(template);
        window.sg.components.GnbSearchV2.reInit();
        if (data.length == 0) {
            _hideRecommendedThumb();
            _hideRecommendedTitle();
        }
    }

    function _getSearchPopular() {

        isPopularSearched = true;

        $.ajax({
            type: "GET",
            dataType: "json",
            url: popularSearchDomain,
            error: function () {
            },
            success: function (data) {
                var resData = data.popularSearches;
                if (resData && resData.length > 0) {
                    popularKeywords = resData;
                    _drawPopularHtml(popularKeywords)
                    if (searchKeywords.length <= 0) {
                        _showPopular();
                    }
                }
            },
            complete: function () {
                setInputTagging("");
            }
        });
    }
    function _getUSSearchPopular(thisObj) {

        isPopularSearched = true;

        let baseURL = window.location.pathname.split(siteCode)[1];
        if (baseURL.indexOf("/content/samsung") > -1) {
            baseURL = baseURL.split(".html")[0];
        }

        $.ajax({
            type: "POST",
            crossDomain: true,
            headers: apiConfig.headers,
            data: {
                clientCode: "b2c",
                clientName: 'scom',
                countryCode: siteCode,
                storeID: storeID,
                baseURL: baseURL
            },
            dataType: "json",
            url: apiConfig.domain  + "/" + siteCode +  "/popularSearch",
            success: function (data) {
                if (data.statusCode == "OK") {
                    var resData = data.popularSearchResults;
                    popularKeywords = resData.resultSet;
                    if (resData.resultCount > 0) {
                        _drawPopularHtml(resData.resultSet);
                        _showPopular();
                    }

                    _setPopularMetricsAPI(resData.resultCount, baseURL);
                }
            },
            complete: function () {
                setInputTagging("");
                window.sg.components.GnbSearchV2.show(thisObj);
            }
        });
    }
    function _getAiSearchPopular(thisObj) {

        isPopularSearched = true;

        let baseURI = url.split(siteCode)[1];
        let baseURL = "";
        if (url.indexOf("/content/samsung") > -1) {
            baseURL = baseURI.split(".html")[0];
        } else {
            baseURL = baseURI.split("/")[0];
        }

        $.ajax({
            type: "POST",
            crossDomain: true,
            headers: apiConfig.headers,
            data: {
                clientCode: "b2c",
                countryCode: siteCode,
                storeID: storeID,
                baseURL: baseURL
            },
            dataType: "json",
            url: apiConfig.domain + "/popularSearch",
            success: function (data) {
                if (data.statusCode == "OK") {
                    var resData = data.popularSearchResults;
                    if (resData.resultCount > 0) {
                        _drawPopularHtml(resData.resultSet);
                    }
                }
            },
            complete: function () {
                setInputTagging("");
                window.sg.components.GnbSearchV2.show(thisObj);
            }
        });
    }
    function _drawPopularHtml(data) {
        let template = "";
        $.each(data, function (idx, q) {
            if (idx < maxCnt.popular) {
                template += '<li class="gnb-search-v2__list-item" role="listitem">';
                template += '<a class="gnb-search-v2__list-link" href="' + linkSearchURL + encodeURIComponent(stripTags(q)) + '" title="Search" data-event_name="select_popular searches>'+`${q}:${idx+1}`+'_click" data-link_cat="search" data-link_position="search>search layer" data-link_id="popular searches>' + `${q}:${idx+1}` + '">';
                template += '<span class="gnb-search-v2__list-link-text">' + q + '</span>';
                template += '</a>';
                template += '</li>';
            }
        });
        gnbSearchEl.gnbSearchPopular.find("ul").html(template);
    }

    function _formatRelatedData(data) {
        const result = []
        data.forEach((_) => {
            const dataObj = _[0];
            const obj = {}

            Object.entries(dataObj).forEach(([key, value]) => {
                obj[key] = value[0]
            })

            result.push(obj)
        })

        return result;
    }

    function checkTyping(){

        clearTimeout(keySendTimeOut);
        keySendTimeOut = setTimeout(function(){
            apiConfig.data.isTyping = "N";
            var query = stripTags($.trim(gnbSearchEl.gnbSearchInput.val()));
            if(query){
                _getSearchKeyword(query,true);
            }
        },500);
    }

    function _getSearchKeyword(query, notTyping) {

        //요청 keyword key 값이 달라 key 값 으로 호출
        apiConfig.data[apiConfig.keywordKey] = query;

        if (!notTyping){
            checkTyping();
        }

        $.ajax({
            type: apiConfig.type,
            crossDomain: true,
            dataType: "json",
            data: apiConfig.data,
            url: apiConfig.domain + apiConfig.uri,
            headers: apiConfig.headers,
            success: function (data) {
                if (isSearching) {
                    _hideAll();
                    let suggestedData = {};
                    let relatedData = {};
                    let suggestedCnt = 0;
                    let relatedCnt = 0;
                    //국가코드 분기

                    if (siteCode === "us") {
                        suggestedData = data.resultData.suggestedSearches;
                        relatedData = data.resultData.relatedProducts;

                        suggestedCnt = suggestedData.results.length;
                        metricsCount = suggestedCnt;
                        metricsQuery = query;
                        relatedCnt = relatedData.results.length;

                        _drawSuggestedHtml(suggestedData.results, query);
                        if (relatedData && relatedData.results && relatedData.results.length > 0) {
                            _hideRecommendedThumb();
                            _hideRecommendedTitle();
                            _showRelatedThumb();
                            _showRecommendedTitle();
                            _drawRelatedHtml(relatedData.results, query)
                        } else {
                            _hideRelatedThumb();
                            _hideRecommendedTitle();
                        }
                        _setMetricsAPI(suggestedCnt, query);
                        // if (data.Suggestions) {
                        //     suggestedData = data.Suggestions.Suggestion;
                        //     suggestedCnt = suggestedData.length;
                        //     _drawSuggestedHtml(suggestedData, query);
                        // }

                        // if (data.Recommend && data.Recommend != "False") {
                        //     relatedData = data?.Recommend;
                        //     const layer1 = Object.values(relatedData)[0]
                        //     const layer2 = Object.values(layer1[0])
                        //     const formatedData = _formatRelatedData(layer2);
                        //     if(formatedData && formatedData.length > 0){
                        //         _hideRecommendedThumb();
                        //         _hideRecommendedTitle();
                        //         _showRelatedThumb();
                        //         _showRecommendedTitle();
                        //         _drawRelatedHtml(formatedData, query)
                        //     } else {
                        //         _hideRelatedThumb();
                        //         _hideRecommendedTitle();
                        //     }
                        // } else {
                        //     _hideRelatedThumb();
                        //     _hideRecommendedTitle();
                        // }
                    } else {
                        //API 분기
                        if (isAiSearch) {
                            suggestedData = data.resultData.suggestedSearches;
                            relatedData = data.resultData.relatedProducts;

                            suggestedCnt = suggestedData.count;

                            _drawAISuggestedHtml(suggestedData.results, query);
                            //BdcApiUse 국가만 이미지 표시
                            if (isBdcApiUse) {
                                _drawRelatedHtml(relatedData.results, query)
                            }
                            _setMetricsAPI(suggestedCnt, query);
                            //_drawRecommendedHtml(recommendedData); // 1회로 한정 최소에 실행
                        } else {

                            suggestedData = data.response.resultData;

                            suggestedCnt = suggestedData.common.searchCount;
                            _drawSuggestedHtml(suggestedData.common.relatedKeywords, query);
                        }
                    }


                    if (suggestedCnt > 0) {
                        _showSuggested();
                    } else {
                        _showNoSuggested(relatedCnt);
                        _hideSuggested();
                        _hideRecommendedThumb();
                        _hideRecommendedTitle();
                    }
                }
            },
            error: function () {
                _showNoSuggested();
                _hideRecommendedThumb();
                _hideRecommendedTitle();
            }

        });
    }
    function _drawSuggestedHtml(results, q) {
        var template = '';

        $.each(results, function (idx, res) {
            let name = res.name;
            let category = res.category;

            if (idx < maxCnt.suggest) {
                let highLightText = highlight(name, q);
                template +=
                    '<li class="gnb-search-v2__list-item" role="listitem">' +
                    '<a class="gnb-search-v2__suggested-list-link" href="' + linkSearchURL + encodeURIComponent(stripTags(name)) + '" title=Search"' +
                    '" data-event_name="select_ search_SUGGESTED SEARCHES_'+`${_getLinkTitle(name).toLowerCase()}:${idx+1}`+'_click" data-link_cat="Search" data-link_position="search>search layer" data-link_id="SUGGESTED SEARCHES>' + `${_getLinkTitle(name).toLowerCase()}:${idx+1}` + '">' +
                    categoryHighlight(highLightText, category) +
                    '</a>' +
                    '</li>';
            }

        });
        gnbSearchEl.gnbSearchSuggested.find("ul").html(template);
        // var template = '';
        // for (var i = 0; i < results.length; i++) {
        //     var relatedKey = results[i] || "";
        //     if (i < maxCnt.suggest) {
        //         let highLightText = highlight(relatedKey, q);
        //         template +=
        //             '<li class="gnb-search-v2__list-item" role="listitem">' +
        //             '<a class="gnb-search-v2__suggested-list-link" href="' + linkSearchURL + encodeURIComponent(stripTags(relatedKey)) + '" title="Search" data-event_name="select_ search_SUGGESTED SEARCHES_'+`${_getLinkTitle(relatedKey).toLowerCase()}:${i+1}`+'_click" data-link_cat="Search" data-link_position="search>search layer" data-link_id="SUGGESTED SEARCHES>' + `${_getLinkTitle(relatedKey).toLowerCase()}:${i+1}` + '">' +
        //             categoryHighlight(highLightText, q) +
        //             '</a>' +
        //             '</li>';
        //     }
        // }
        // gnbSearchEl.gnbSearchSuggested.find("ul").html(template);
    }
    function _drawAISuggestedHtml(results, q) {
        var template = '';

        $.each(results, function (idx, res) {
            let name = res.name;
            let category = res.category;

            if (idx < maxCnt.suggest) {
                let highLightText = highlight(name, q);
                template +=
                    '<li class="gnb-search-v2__list-item" role="listitem">' +
                    '<a class="gnb-search-v2__list-link" href="' + linkSearchURL + encodeURIComponent(stripTags(name)) + '" title=Search"' +
                    '" data-event_name="select_ search_SUGGESTED SEARCHES_'+`${_getLinkTitle(relatedKey).toLowerCase()}:${i+1}`+'_click" data-link_cat="Search" data-link_position="search>search layer" data-link_id="SUGGESTED SEARCHES>' + `${_getLinkTitle(relatedKey).toLowerCase()}:${i+1}` + '">' +
                    categoryHighlight(highLightText, category) +
                    '</a>' +
                    '</li>';
            }

        });
        gnbSearchEl.gnbSearchSuggested.find("ul").html(template);
    }
    // aiApi Related html
    function _drawRelatedHtml(data) {

        var template = "";
        $.each(data, function (idx, res) {
            if (idx < maxCnt.recommend) {
                let laImage = '';
                let smImage = '';
                if(res.images){
                    laImage = res.images.laImage;
                    smImage = res.images.smImage;
                }
                template +=
                    `<li class="gnb-search-v2__thumb-item">
                  <a href="${res.pdpURL}" data-event_name="select_ search_Related_${res?.name?.replaceAll('"', '')}:${idx+1}_click" data-link_cat="Search" data-link_position="search>search layer" data-link_id="Related SEARCHES>${res?.name?.replaceAll('"', '')}:${idx+1}"  class="gnb-search-v2__thumb-link" data-feedback="${res?.feedbackParam ?? ''}"
                  data-modelcode="${res.sku}"  data-modelname="${res.modelName}" data-modeldisplay="${res.name}" data-modelprice="${res.msrp}" data-modelrevenue="${res.salePrice}" data-pvisubtype="${res.classification}">
                    <div class="gnb-search-v2__thumb-image">
                      <div class="image">
                        <img class="image__main lazy-load-man responsive-img hover-scale" data-desktop-src="${laImage}" data-mobile-src="${laImage}" alt="alt text" role="img" data-comp-name="image">
                      </div>
                    </div>
                    <p class="gnb-search-v2__thumb-name">${res.name}</p>
                    <p class="gnb-search-v2__thumb-price">$${currencyComma(res?.salePrice ?? 0, gPriceCurrency)}</p>
                  </a>
                </li>`;
            }
        });
        gnbSearchEl.gnbSearchRelatedThumb.find("ul").html(template);
        window.sg.components.GnbSearchV2.reInit();

        if (data.length == 0) {
            _hideRelatedThumb();
            _showRecommendedThumb();
        }
    }
    // ai search STR


    //AI
    function _setMetricsAPI(cnt, query) {
        var pf = window.navigator.userAgent.match(/(Windows\sNT|iOS|iPhone\sOS|Android)\s([\d_]+)/);
        var metricsParam =
            "si=" + generateRandomID() +
            "&qt=" + query.replace(/ /ig, "_") +
            "&cn=scom&ch=" + storeID +
            "&cc=" + siteCode +
            "&lc=" + $("#languageCode").val() +
            "&sc=" + cnt +
            "&ff=" + (pf, pf ? pf[1].split(' ')[0].toLowerCase() : "") +
            "&ui=" + generateRandomID() +
            "&ti=" + generateRandomID() +
            "&qi=" + generateRandomID();
        window.ssMetrics = metricsParam;

        $.ajax({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            type: "POST",
            data: {
                metricsParam
            },
            url: apiConfig.domain + "/" + siteCode + "/metrics/suggestedSearch"
        });
    }

    function _setPopularMetricsAPI(cnt, query) {
        var pf = window.navigator.userAgent.match(/(Windows\sNT|iOS|iPhone\sOS|Android)\s([\d_]+)/);
        var metricsParam =
            "si=" + generateRandomID() +
            "&qt=" + query.replace(/ /ig, "_") +
            "&cn=scom&ch=" + storeID +
            "&cc=" + siteCode +
            "&lc=" + $("#languageCode").val() +
            "&sc=" + cnt +
            "&ff=" + (pf, pf ? pf[1].split(' ')[0].toLowerCase() : "") +
            "&ui=" + generateRandomID() +
            "&ti=" + generateRandomID() +
            "&qi=" + generateRandomID();
        window.ssMetrics = metricsParam;

        $.ajax({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            type: "POST",
            data: {
                metricsParam
            },
            url: apiConfig.domain + "/" + siteCode + "/metrics/popularSearch"
        });
    }

    //자동완성 결과 클릭시 호출
    function _setFeedbackAPI(qt, index, feedbackParam) {

        var feedbackData = window.ssMetrics;
        var ui_val = feedbackData.match(/(ui=)([^\&]+)/)[2];
        var qi_val = feedbackData.match(/(qi=)([^\&]+)/)[2];
        var si_val = feedbackData.match(/(si=)([^\&]+)/)[2];
        var ti_val = feedbackData.match(/(ti=)([^\&]+)/)[2];
        var st = feedbackData.match(/(ch=)([^\&]+)/)[2];
        var tr = feedbackData.match(/(sc=)([^\&]+)/)[2];
        var paramData = $.extend({
            feedbackParam:
                "st=" + st +
                "&ct=" + siteCode +
                "&qt=" + qt.replace(/ /ig, "_") +
                "&cn=scom&ui=" + ui_val +
                "&si=" + si_val +
                "&ti=" + ti_val +
                "&qi=" + qi_val +
                "&ft=SS" +
                "&tr=" + tr +
                "&dr=" + index,
            actionType: "click"
        }, { feedbackParam: feedbackParam });

        $.ajax({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            type: "POST",
            url: apiConfig.domain + '/' + siteCode + "/feedback/click",
            data: paramData
        });
    }
    // ai search END
    function stripTags(s) {
        var d = s;
        if (s != null) {
            d = d.split('"').join('"').split('<b>').join('').split('</b>').join('');
            d = d.split(' in ')[0];
        }
        return d;
    }
    function exceptionCharacter(s) {
        var regExp = /[\{\}\[\]?,;:|\)*~`!^_<>@\#$%&\\\=\(\'\"]/gi;
        if (siteCode === "cn") {
            regExp = /[\{\}\[\]?,;:|\)*~`!^_<>@\#$%&\\\=\(\"]/gi;
        }
        if (regExp.test(s)) {
            s = s.replace(regExp, "");
        }
        return s;
    }
    function highlight(s, q) {
        if (s != null) {
            var regExp = new RegExp(`(${q})`, 'i');
            s = s.replace(regExp, `<strong>$1</strong>`);
        }
        return s;
    }
    function maxLengthCheck(contents, length) {
        if (!contents) {
            return '';
        }
        let str_character;
        let int_char_count = 0;
        let int_contents_length = contents.length;

        let str = '';

        for (let k = 0; k < int_contents_length; k++) {
            str_character = contents.charAt(k);
            if (encodeURI(str_character).length > 4) {
                int_char_count += 2;
            } else {
                int_char_count++
            };
            if (int_char_count > length) {
                str += '...';
                break;
            }
            str += str_character;
        }
        return str;
    }

    function categoryHighlight(s, q) {
        let suggested = s;
        if (s) {
            if (s.includes('in')) {
            const d = s.split(' in ')
                if (d.length > 1) {
                    suggested = d[0] + ' ' + '<em class="gnb-search-v2__list-category">in ' + d[1] + '</em>'
                }
            } else {
                suggested = s + ' ' + '<em class="gnb-search-v2__list-category">in ' + q + '</em>'
            }
        }
        return suggested;
    }
    function _getLinkTitle(s) {
        if (s != null) {
            s = s.split('"').join('&quot;').split('<b>').join('').split('</b>').join('');
        }
        return s;
    }

    function validateUrl(url) {
        var result = url;
        if (url.lastIndexOf('/') === url.length - 1) {
            result = url.substr(0, url.length - 1);
        }
        return result;
    }
    function generateRandomID() {
        var i = window.crypto || window.msCrypto;
        return ([10000000] + -1000 + -4000 + -8000 + -100000000000).replace(/[018]/g, function (j) {
            return (j ^ i.getRandomValues(new Uint8Array(1))[0] & 15 >> j / 4).toString(16)
        })
    };
    function setInputTagging(q) {
        // gnbSearchEl.gnbSearchInput.attr("data-link_id", "start typing" + q);
    }

    function checkSearchKeywordChange(q) {
        if (preSearchKeyword === q) {
            return false;
        } else {
            preSearchKeyword = q;
        }
        return true;
    }
    function clearSearchInput() {
        gnbSearchEl.gnbSearchInput.val("");
        gnbSearchEl.gnbSearchInput.trigger("input");
        gnbSearchEl.gnbSearchInput.focus();
    }

    function getCookieValueByCookieName(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }

    $gnbSearch.on("focus", ".gnb-search-v2__input", function () {
        var q = stripTags($.trim($(this).val()));
        if (checkSearchKeywordChange(q) || q == '') {
            searchKeywords = $.cookies.getSearchKeyword();
            _hideAll();

            if (q && q.length > 0) {
                _getSearchKeyword(q);
            } else {
                if (0 < searchKeywords.length) {
                    _showHistory();
                } else {
                    // Popular Keyword
                    _showPopular();
                }
            }
            window.sg.components.GnbSearchV2.reInit();
        }
    });

    $gnbSearch.on("click", ".gnb-search-v2__clear", function () {
        clearSearchInput();
    });
    
    $gnbSearch.on("keyup", ".gnb-search-v2__input", function onFirstKeyDown(){
        if(typeof window !== undefined && window.utag){
            window.utag.link({
                event_name: "Search_start_typing_search_overlay",
                link_cat:"search",
                link_position:"search layer",
                link_id:"start typing"
            })
        }
        $gnbSearch.off("keyup", ".gnb-search-v2__input", onFirstKeyDown)
    })

    // let searchTimeOut;
    $gnbSearch.on("propertychange change keyup paste input", ".gnb-search-v2__input", function () {
        var q = $(this).val();
        if (checkSearchKeywordChange(q)) {
            $(this).val(exceptionCharacter(q));
            q = $.trim(q);
            searchKeywords = $.cookies.getSearchKeyword();
            setInputTagging(q);
            if (q && q.length > 1) {
                isSearching = true;
                gnbSearchEl.gnbSearchInputClearButton.addClass("gnb-search-v2__clear--show");
                _getSearchKeyword(q);
            } else {
                isSearching = false;
                gnbSearchEl.gnbSearchInputClearButton.removeClass("gnb-search-v2__clear--show");
                if (searchKeywords.length > 0) {
                    _showHistory();
                } else {
                    _showPopular();
                }
                if (gnbSearchEl.gnbSearchRecommendedThumb.find("ul").children().length > 0) {
                    _showRecommendedThumb();
                    _showRecommendedTitle();
                    _hideRelatedThumb();
                } else {
                    _hideRecommendedThumb();
                    _hideRecommendedTitle();
                    _hideRelatedThumb();
                }
                gnbSearchEl.gnbSearchSuggested.find("ul").empty();
            }
        }
    });

    $gnbSearch.find(".gnb-search-v2__clear").on("click", function () {
        gnbSearchEl.gnbSearchInputClearButton.removeClass("gnb-search-v2__clear--show");
        clearSearchInput();
        _showRecommendedThumb();
        if (gnbSearchEl.gnbSearchRecommendedThumb.find("ul").children().length > 0) {
            _showRecommendedTitle();
        } else {
            _hideRecommendedTitle();
        }
    })

    $gnbSearch.on("click", ".gnb-search-v2__suggested a", function () {
        var value = $(this).text();
        $.cookies.setSearchKeyword(decodeURIComponent(value));
        // ai search code
        var index = [...this.parentElement.parentElement.children].indexOf(this.parentElement);
        _setFeedbackAPI(preSearchKeyword, index + 1);
    });


    $gnbSearch.on("click", ".gnb-search-v2__related .gnb-search-v2__thumb-item a", function () {
        var feedbackParam = $(this).attr("data-feedback");
        _setFeedbackAPI('', '', feedbackParam);
    });

    $gnbSearch.on("click", ".gnb-search-v2__btn-search", function (e) {
        e.preventDefault();
        var q = stripTags($.trim(gnbSearchEl.gnbSearchInput.val()));
        if (!q) q = placeholder;
        if(typeof window !== undefined && window.utag){
            window.utag.link({
                event_name: "Search_finish_typing_search_overlay",
                link_cat:"search",
                link_position:"search>search layer",
                link_id:"finish typing",
                global_search_term:`${q}`
            })
        }
        if (q) {
            _setMetricsAPI(metricsCount, metricsQuery);
            $.cookies.setSearchKeyword(decodeURIComponent(q));

            // [AEMCL-5637] : AI search implementations
            // const AI_SEARCH_COOKIE_VALUE = getCookieValueByCookieName('aisearch'); // name of AI-search cookie is "aisearch"
            // if(AI_SEARCH_COOKIE_VALUE === "true" || AI_SEARCH_COOKIE_VALUE === true){
            //     window.location.href = `${AI_SEARCH_URL}/?searchvalue=${encodeURIComponent(q)}`;
            // }else{
            //     window.location.href = linkSearchURL + encodeURIComponent(q);
            // }
            window.location.href = `${AI_SEARCH_URL}/?searchvalue=${encodeURIComponent(q)}`;
            window.gmap = null;
        }
    });

    $(document).on("click", ".nv00-gnb__utility.search .nv00-gnb__utility-btn, .nv00-gnb__search-btn.gnb__search-btn-js", function () {
      // making sure that the GNB search click gets fired during page loads and sub-sequent clicks
      (function fireGnbClick() {
        const GNB_CLICK_RETRY_DELAY_MS = 3000;
        const gnbSearchClickData = {
          event_name: "select_search_click",
          link_id: "search",
          link_cat: "navigation",
          link_position: "navigation>gnb",
        };

        const triggerGnbUtagEvent = () => {
          if (typeof window !== "undefined" && window.utag) {
            window.utag.link(gnbSearchClickData);
            return true;
          }
          return false;
        };

        if (!triggerGnbUtagEvent()) {
          setTimeout(() => {
            if (!triggerGnbUtagEvent()) {
              console.error(
                "GNB search click event failed due to unavailability of UTAG"
              );
            }
          }, GNB_CLICK_RETRY_DELAY_MS);
        }
      })();

      clearSearchInput();
      if (siteCode !== "us" && !isPopularSearched) {
        if (isAiSearch) {
          _getAiSearchPopular(this);
        } else {
          _getSearchPopular();
        }
      } else {
        setInputTagging("");
        if (popularKeywords && popularKeywords.length > 0) {
          _showPopular();
        } else {
        //   _getSearchPopular();
          _getUSSearchPopular(this);
        }

        if (recommendedKeywords && recommendedKeywords.length > 0) {
          _drawRecommendedHtml(recommendedKeywords);
          _showRecommendedTitle();
        } else {
          const recProductsList =
            window &&
            window.RECOMMENDATIONS_DATA &&
            window.RECOMMENDATIONS_DATA["target-search-recs-scom51498"];
          if (recProductsList && recProductsList.length > 0) {
            _getRecommendedData(recProductsList);
          }else{
            _getRecommended() // Added to test faster loading
        }
        }
        window.sg.components.GnbSearchV2.show(this);
      }
    });

    $(document).on('click', '.shop-with-expert-search', function (e) {
        e.preventDefault();
        var chatUrl = 'https://www.samsung.com/us/expert-chat/?search_instant';
        if ($(window).width() < 768) {
            window.open(chatUrl, 'newwindow');
        } else {
            window.open(chatUrl, 'newwindow', 'height=700, width=440, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
        }
    });

    function _init() {

        Granite.I18n.setLocale($("#language").val());

        var searchParam = "searchvalue";

        let apiHeaders = {
            "Content-type": "application/x-www-form-urlencoded",
        }
        if (siteCode === "us") {
            // if (getCookieValueByCookieName('aisearch') === "true" || getCookieValueByCookieName('aisearch') === true) {
            //     searchParam = "searchvalue";
            // } else {
            //     searchParam = "listType=g&searchTerm";
            // }
            searchParam = "searchvalue";
            apiConfig = {
                type: "POST",
                uri:  "/" + siteCode + "/suggestedSearch",
                domain: sribSearchDomain,
                keywordKey: 'query',
                data: {
                    countryCode: siteCode,
                    clientName: 'scom',
                    storeID: 0,
                    isTyping: 'N',
                    clientCode: clientCode,
                    query: '',
                },
                headers: apiHeaders
            };

            // apiConfig = {
            //     type: "GET",
            //     uri: "/us/search/global/es/typeahead",
            //     domain: "",
            //     keywordKey: 'searchTerm',
            //     data: {
            //         searchTerm: '',
            //     },
            //     headers: {}
            // };
            // if (getCookieValueByCookieName('aisearch') === "true" || getCookieValueByCookieName('aisearch') === true) {
            //     linkSearchURL = AI_SEARCH_URL
            // } else {
            //     linkSearchURL = linkSearchURL + "/searchMain";
            // }
            linkSearchURL = AI_SEARCH_URL || linkSearchURL; //this piece of code also pulled in b2b pages where AI_SEARCH_URL is undefined.
            _getRecommended();

        } else {
            if (isAiSearch) {
                apiConfig = {
                    type: "POST",
                    uri: "/suggestedSearch",
                    domain: aiSearchDomain,
                    keywordKey: 'query',
                    data: {
                        countryCode: siteCode,
                        storeID: storeID,
                        isTyping: 'N',
                        clientCode: clientCode,
                        query: '',
                    },
                    headers: apiHeaders
                };
            } else {
                apiConfig = {
                    type: "GET",
                    uri: "/search/suggest/v6",
                    domain: validateUrl(esapiDomain),
                    keywordKey: 'searchValue',
                    data: {
                        siteCd: siteCode,
                        stage: apiStage,
                        searchValue: ''
                    },
                    headers: {}
                };
            }
        }
        if (linkSearchURL.indexOf('.html') > -1) {
            linkSearchURL += '?' + searchParam + '=';
        } else {
            linkSearchURL += '/?' + searchParam + '=';
        }
    }

    //to override other code that is freezing body overflow
    $(document).on("click", ".gnb-search-v2__close", function () {  
        document.body.style.overflow = "auto"; 
    });

    $(function () {
        if (linkSearchURL && linkSearchURL !== "") {
            _init();
        }
    });

})(window.jQuery);

(() => {
  const $q = window.sg.common.$q;
  // const utils = window.sg.common.utils;
  const lazyLoad = window.sg.common.lazyLoad;

  const selector = {
    section: '.gnb-search-v2',
  };

  class GnbSearchV2 {
    constructor(element) {
      this.selector = {
        focusLoopingStart: '.gnb-search-v2__looping--start',
        focusLoopingEnd: '.gnb-search-v2__looping--end',
        searchInput: '.gnb-search-v2__input',
        searchInputWrap: '.gnb-search-v2__input-wrap',
        btnSearch: '.nv00-gnb-v3__utility-btn',
        btnClose: '.gnb-search-v2__close',
      };

      this.class = {
        searchShowClass: 'gnb-search-v2--show',
        searchCloseClass: 'gnb-search-v2--close',
        searchShowBodyClass: 'gnb-search-v2--layer-open',
        searchInputOverflowClass: 'gnb-search-v2__input--overflow',
      };

      this.els = {
        window: $q(window),
        body: $q('body'),
        section: $q(element),
      };

      this.returnFocusEl = false;

      this.handler = {
        handleInputText: this.handleInputText.bind(this),
        handleResize: this.handleResize.bind(this),
        close: this.close.bind(this),
      };

      this.init();

      GnbSearchV2.instance.set(element, this);
    }

    init() {
      this.setElements();
      this.bindEvents();
    }

    reInit() {
      this.init();
      this.loadImages();
    }

    setElements() {
      this.els.searchInput = this.els.section.find(this.selector.searchInput);
      this.els.searchInputWrap = this.els.section.find(this.selector.searchInputWrap);
      this.els.btnClose = this.els.section.find(this.selector.btnClose);
      this.els.focusLoopingStart = this.els.section.find(this.selector.focusLoopingStart);
      this.els.focusLoopingEnd = this.els.section.find(this.selector.focusLoopingEnd);
    }

    bindEvents() {
      this.els.searchInput.off('input',this.handler.handleInputText).on('input',this.handler.handleInputText);
      this.els.btnClose.off('click',this.handler.close).on('click',this.handler.close);

      this.els.window.off('resize', this.handler.handleResize).on('resize', this.handler.handleResize);
    }

    show(returnFocusEl) {
      window.sg.components.gnbV2.init();
      this.returnFocusEl = returnFocusEl;

      this.els.body.addClass(this.class.searchShowBodyClass);
      this.els.section.css({ 'display': 'block' });
      this.els.section.setLayerFocus(this.selector.focusLoopingStart, this.selector.focusLoopingEnd);

      setTimeout(() => {
        this.els.section.addClass(this.class.searchShowClass);
        this.els.searchInput.focus();
        this.loadImages();
      }, 10);
    }

    close() {
      const scope = this;

      this.els.section.on('transitionend', displayNone);
      this.els.section.addClass(this.class.searchCloseClass);
      this.els.section.removeClass(this.class.searchShowClass);

      function displayNone() {
        scope.els.body.removeClass(scope.class.searchShowBodyClass);
        scope.els.section.off('transitionend', displayNone);
        setTimeout(() => {
          scope.els.section.css({ 'display': 'none' });
          scope.els.section.removeClass(scope.class.searchCloseClass);

          if( scope.returnFocusEl ) {
            scope.returnFocusEl.focus();
          }
        }, 500);
      }
    }

    loadImages() {
      const images = this.els.section.find('.image');
      images.target.forEach((el) => {
        lazyLoad.setLazyLoadManually(el);
      });
    }

    handleResize() {
      this.handleInputText();
    }

    handleInputText() {
      const isChrome = window.navigator.userAgent.includes("Chrome");
      if( this.els.searchInput.target[0].scrollWidth > (isChrome ? (this.els.searchInput.target[0].clientWidth + 1) : this.els.searchInput.target[0].clientWidth) ) {
        this.els.searchInputWrap.addClass(this.class.searchInputOverflowClass);
      } else {
        this.els.searchInputWrap.removeClass(this.class.searchInputOverflowClass);
      }
    }
  }

  GnbSearchV2.instance = new WeakMap();

  function init() {
    $q(selector.section).target.forEach((element) => {
      if(!GnbSearchV2.instance.has(element)) {
        new GnbSearchV2(element);
      }
    });
  }

  function reInit() {
    $q(selector.section).target.forEach((element) => {
      if(GnbSearchV2.instance.has(element)) {
        GnbSearchV2.instance.get(element).reInit();
      } else {
        new GnbSearchV2(element);
      }
    });
  }

  function show(returnFocusEl = false) {
    $q(selector.section).target.forEach((element) => {
      if(GnbSearchV2.instance.has(element)) {
        GnbSearchV2.instance.get(element).show(returnFocusEl);
      }
    });
  }

  window.sg.components.GnbSearchV2 = {
    init,
    reInit,
    show,
  };

  $q.ready(init);
})();
