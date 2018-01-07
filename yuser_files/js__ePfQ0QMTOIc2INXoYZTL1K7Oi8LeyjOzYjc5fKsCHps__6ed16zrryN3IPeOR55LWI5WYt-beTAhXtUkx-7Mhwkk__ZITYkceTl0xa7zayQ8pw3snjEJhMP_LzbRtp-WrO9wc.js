/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/memcache/memcache_admin/memcache.js. */
if(Drupal.jsEnabled)$(document).ready(function(){$("body").append($("#memcache-devel"))});;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/memcache/memcache_admin/memcache.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/prevent_js_alerts/prevent_js_alerts.js. */
(function($){Drupal.behaviors.prevent_js_alerts={attach:function(context,settings){window.alert=function(text){if(typeof console!="undefined")console.error("Module 'prevent_js_alerts' prevented the following alert: "+text);return true}}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/prevent_js_alerts/prevent_js_alerts.js. */
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;/**/
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/flag/theme/flag.js. */
(function($){Drupal.flagLink=function(context){function updateLink(element,newHtml){var $newLink=$(newHtml);$('.flag-message',$newLink).css('display','none');var $nucleus=$newLink.is('a')?$newLink:$('a.flag',$newLink);$nucleus.addClass('flag-processed').click(flagClick);var $wrapper=$(element).parents('.flag-wrapper:first');$wrapper.after($newLink).remove();Drupal.attachBehaviors($newLink.get(0));$('.flag-message',$newLink).fadeIn();setTimeout(function(){$('.flag-message.flag-auto-remove',$newLink).fadeOut()},3e3);return $newLink.get(0)}
function flagClick(event){event.preventDefault();var element=this,$wrapper=$(element).parents('.flag-wrapper');if($wrapper.is('.flag-waiting'))return false;$wrapper.addClass('flag-waiting');$('span.flag-message:visible').fadeOut();$.ajax({type:'POST',url:element.href,data:{js:true},dataType:'json',success:function(data){data.link=$wrapper.get(0);$.event.trigger('flagGlobalBeforeLinkUpdate',[data]);if(!data.preventDefault)data.link=updateLink(element,data.newLink);var $wrappers=$('.flag-wrapper.flag-'+data.flagName.flagNameToCSS()+'-'+data.contentId).not(data.link),$newLink=$(data.newLink);$('.flag-message',$newLink).hide();$wrappers=$newLink.replaceAll($wrappers);Drupal.attachBehaviors($wrappers.parent());$.event.trigger('flagGlobalAfterLinkUpdate',[data])},error:function(xmlhttp){alert('An HTTP error '+xmlhttp.status+' occurred.\n'+element.href);$wrapper.removeClass('flag-waiting')}})};$('a.flag-link-toggle:not(.flag-processed)',context).addClass('flag-processed').click(flagClick)};Drupal.flagAnonymousLinks=function(context){$('a.flag:not(.flag-anonymous-processed)',context).each(function(){this.href+=(this.href.match(/\?/)?'&':'?')+'has_js=1';$(this).addClass('flag-anonymous-processed')})};String.prototype.flagNameToCSS=function(){return this.replace(/_/g,'-')};Drupal.flagAnonymousLinkTemplates=function(context){var templates=Drupal.settings.flag.templates,userFlags=Drupal.flagCookie('flags');if(userFlags){userFlags=userFlags.split('+');for(var n in userFlags){var flagInfo=userFlags[n].match(/(\w+)_(\d+)/),flagName=flagInfo[1],contentId=flagInfo[2];if(templates[flagName+'_'+contentId])$('.flag-'+flagName.flagNameToCSS()+'-'+contentId,context).after(templates[flagName+'_'+contentId]).remove()}};var globalFlags=document.cookie.match(/flag_global_(\w+)_(\d+)=([01])/g);if(globalFlags)for(var n in globalFlags){var flagInfo=globalFlags[n].match(/flag_global_(\w+)_(\d+)=([01])/),flagName=flagInfo[1],contentId=flagInfo[2],flagState=(flagInfo[3]=='1')?'flag':'unflag';if(templates[flagName+'_'+contentId])$('.flag-'+flagName.flagNameToCSS()+'-'+contentId,context).each(function(){if($(this).find('.'+flagState+'-action').size())$(this).after(templates[flagName+'_'+contentId]).remove()})}};Drupal.flagCookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1};var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1e3))}else date=options.expires;expires='; expires='+date.toUTCString()};var path=options.path?'; path='+(options.path):'',domain=options.domain?'; domain='+(options.domain):'',secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}};return cookieValue}};Drupal.behaviors.flagLink={};Drupal.behaviors.flagLink.attach=function(context){if(Drupal.settings.flag&&Drupal.settings.flag.templates)Drupal.flagAnonymousLinkTemplates(context);if(Drupal.settings.flag&&Drupal.settings.flag.anonymous)Drupal.flagAnonymousLinks(context);Drupal.flagLink(context)}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/flag/theme/flag.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/libraries/timeago/jquery.timeago.js. */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module==='object'&&typeof module.exports==='object'){factory(require('jquery'))}else factory(jQuery)}(function($){$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp)}else if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp))}else if(typeof timestamp==="number"){return inWords(new Date(timestamp))}else return inWords($.timeago.datetime(timestamp))};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:6e4,allowPast:true,allowFuture:false,localeTitle:false,cutoff:0,autoDispose:true,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",inPast:'any moment now',seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(distanceMillis){if(!this.settings.allowPast&&!this.settings.allowFuture)throw'timeago allowPast and allowFuture settings can not both be set to false.';var $l=this.settings.strings,prefix=$l.prefixAgo,suffix=$l.suffixAgo;if(this.settings.allowFuture)if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow};if(!this.settings.allowPast&&distanceMillis>=0)return this.settings.strings.inPast;var seconds=Math.abs(distanceMillis)/1e3,minutes=seconds/60,hours=minutes/60,days=hours/24,years=days/365
function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction,value=($l.numbers&&$l.numbers[number])||number;return string.replace(/%d/i,value)};var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<42&&substitute($l.day,1)||days<30&&substitute($l.days,Math.round(days))||days<45&&substitute($l.month,1)||days<365&&substitute($l.months,Math.round(days/30))||years<1.5&&substitute($l.year,1)||substitute($l.years,Math.round(years)),separator=$l.wordSeparator||"";if($l.wordSeparator===undefined)separator=" ";return $.trim([prefix,words,suffix].join(separator))},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/\.\d+/,"");s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");s=s.replace(/([\+\-]\d\d)$/," $100");return new Date(s)},datetime:function(elem){var iso8601=$t.isTime(elem)?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601)},isTime:function(elem){return $(elem).get(0).tagName.toLowerCase()==="time"}});var functions={init:function(){functions.dispose.call(this);var refresh_el=$.proxy(refresh,this);refresh_el();var $s=$t.settings;if($s.refreshMillis>0)this._timeagoInterval=setInterval(refresh_el,$s.refreshMillis)},update:function(timestamp){var date=(timestamp instanceof Date)?timestamp:$t.parse(timestamp);$(this).data('timeago',{datetime:date});if($t.settings.localeTitle)$(this).attr("title",date.toLocaleString());refresh.apply(this)},updateFromDOM:function(){$(this).data('timeago',{datetime:$t.parse($t.isTime(this)?$(this).attr("datetime"):$(this).attr("title"))});refresh.apply(this)},dispose:function(){if(this._timeagoInterval){window.clearInterval(this._timeagoInterval);this._timeagoInterval=null}}};$.fn.timeago=function(action,options){var fn=action?functions[action]:functions.init;if(!fn)throw new Error("Unknown function name '"+action+"' for timeago");this.each(function(){fn.call(this,options)});return this}
function refresh(){var $s=$t.settings;if($s.autoDispose&&!$.contains(document.documentElement,this)){$(this).timeago("dispose");return this};var data=prepareData(this);if(!isNaN(data.datetime))if($s.cutoff===0||Math.abs(distance(data.datetime))<$s.cutoff){$(this).text(inWords(data.datetime))}else if($(this).attr('title').length>0)$(this).text($(this).attr('title'));return this}
function prepareData(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if($t.settings.localeTitle){element.attr("title",element.data('timeago').datetime.toLocaleString())}else if(text.length>0&&!($t.isTime(element)&&element.attr("title")))element.attr("title",text)};return element.data("timeago")}
function inWords(date){return $t.inWords(distance(date))}
function distance(date){return(new Date().getTime()-date.getTime())};document.createElement("abbr");document.createElement("time")}));;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/libraries/timeago/jquery.timeago.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/ctools/js/ajax-responder.js. */
(function($){Drupal.CTools=Drupal.CTools||{};Drupal.CTools.AJAX=Drupal.CTools.AJAX||{};Drupal.CTools.AJAX.warmCache=function(){$this=$(this);var old_url=$this.attr('href');if($this.hasClass('ctools-fetching')||Drupal.CTools.AJAX.commandCache[old_url])return false;var $objects=$('a[href="'+old_url+'"]');$objects.addClass('ctools-fetching');try{url=old_url.replace(/\/nojs(\/|$)/g,'/ajax$1');$.ajax({type:"POST",url:url,data:{js:1,ctools_ajax:1},global:true,success:function(data){Drupal.CTools.AJAX.commandCache[old_url]=data;$objects.addClass('ctools-cache-warmed').trigger('ctools-cache-warm',[data])},complete:function(){$objects.removeClass('ctools-fetching')},dataType:'json'})}catch(err){$objects.removeClass('ctools-fetching');return false};return false};Drupal.CTools.AJAX.clickAJAXCacheLink=function(){$this=$(this);if($this.hasClass('ctools-fetching')){$this.bind('ctools-cache-warm',function(event,data){Drupal.CTools.AJAX.respond(data)});return false}else if($this.hasClass('ctools-cache-warmed')&&Drupal.CTools.AJAX.commandCache[$this.attr('href')]){Drupal.CTools.AJAX.respond(Drupal.CTools.AJAX.commandCache[$this.attr('href')]);return false}else return Drupal.CTools.AJAX.clickAJAXLink.apply(this)};Drupal.CTools.AJAX.findURL=function(item){var url='',url_class='.'+$(item).attr('id')+'-url';$(url_class).each(function(){var $this=$(this);if(url&&$this.val())url+='/';url+=$this.val()});return url};$(function(){Drupal.ajax.prototype.commands.attr=function(ajax,data,status){$(data.selector).attr(data.name,data.value)};Drupal.ajax.prototype.commands.redirect=function(ajax,data,status){if(data.delay>0){setTimeout(function(){location.href=data.url},data.delay)}else location.href=data.url};Drupal.ajax.prototype.commands.reload=function(ajax,data,status){location.reload()};Drupal.ajax.prototype.commands.submit=function(ajax,data,status){$(data.selector).submit()}})})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/ctools/js/ajax-responder.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/themes/boron/widgets/arrows/arrows.js. */
(function($){Drupal.behaviors.vud_widget_thumbs={attach:function(context){if(!$('.vud-widget').hasClass('vud-widget-processed'))$('.vote-thumb').click(function(){if($(this).hasClass('up-active')||$(this).hasClass('down-active'))$(this).parents('.vud-widget').find('.vud-link-reset').click()})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/themes/boron/widgets/arrows/arrows.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/timeago/timeago.js. */
(function($){Drupal.behaviors.timeago={attach:function(context){$.extend($.timeago.settings,Drupal.settings.timeago);$('abbr.timeago, span.timeago, time.timeago',context).timeago()}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/timeago/timeago.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/views/js/base.js. */
(function($){Drupal.Views={};Drupal.behaviors.viewsTabs={attach:function(context){if($.viewsUi&&$.viewsUi.tabs)$('#views-tabset').once('views-processed').viewsTabs({selectedClass:'active'});$('a.views-remove-link').once('views-processed').click(function(event){var id=$(this).attr('id').replace('views-remove-link-','');$('#views-row-'+id).hide();$('#views-removed-'+id).attr('checked',true);event.preventDefault()});$('a.display-remove-link').addClass('display-processed').click(function(){var id=$(this).attr('id').replace('display-remove-link-','');$('#display-row-'+id).hide();$('#display-removed-'+id).attr('checked',true);return false})}};Drupal.Views.parseQueryString=function(query){var args={},pos=query.indexOf('?');if(pos!=-1)query=query.substring(pos+1);var pairs=query.split('&');for(var i in pairs)if(typeof(pairs[i])=='string'){var pair=pairs[i].split('=');if(pair[0]!='q'&&pair[1])args[decodeURIComponent(pair[0].replace(/\+/g,' '))]=decodeURIComponent(pair[1].replace(/\+/g,' '))};return args};Drupal.Views.parseViewArgs=function(href,viewPath){var returnObj={},path=Drupal.Views.getPath(href);if(viewPath&&path.substring(0,viewPath.length+1)==viewPath+'/'){var args=decodeURIComponent(path.substring(viewPath.length+1,path.length));returnObj.view_args=args;returnObj.view_path=path};return returnObj};Drupal.Views.pathPortion=function(href){var protocol=window.location.protocol;if(href.substring(0,protocol.length)==protocol)href=href.substring(href.indexOf('/',protocol.length+2));return href};Drupal.Views.getPath=function(href){href=Drupal.Views.pathPortion(href);href=href.substring(Drupal.settings.basePath.length,href.length);if(href.substring(0,3)=='?q=')href=href.substring(3,href.length);var chars=['#','?','&'];for(i in chars)if(href.indexOf(chars[i])>-1)href=href.substr(0,href.indexOf(chars[i]));return href}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/views/js/base.js. */
/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/views/js/ajax_view.js. */
(function($){Drupal.behaviors.ViewsAjaxView={};Drupal.behaviors.ViewsAjaxView.attach=function(){if(Drupal.settings&&Drupal.settings.views&&Drupal.settings.views.ajaxViews)$.each(Drupal.settings.views.ajaxViews,function(i,settings){Drupal.views.instances[i]=new Drupal.views.ajaxView(settings)})};Drupal.views={};Drupal.views.instances={};Drupal.views.ajaxView=function(settings){var selector='.view-dom-id-'+settings.view_dom_id;this.$view=$(selector);var ajax_path=Drupal.settings.views.ajax_path;if(ajax_path.constructor.toString().indexOf("Array")!=-1)ajax_path=ajax_path[0];var queryString=window.location.search||'';if(queryString!==''){var queryString=queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/,'');if(queryString!=='')queryString=((/\?/.test(ajax_path))?'&':'?')+queryString};this.element_settings={url:ajax_path+queryString,submit:settings,setClick:true,event:'click',selector:selector,progress:{type:'throbber'}};this.settings=settings;this.$exposed_form=$('#views-exposed-form-'+settings.view_name.replace(/_/g,'-')+'-'+settings.view_display_id.replace(/_/g,'-'));this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax,this));this.$view.filter(jQuery.proxy(this.filterNestedViews,this)).once(jQuery.proxy(this.attachPagerAjax,this));var self_settings=this.element_settings;self_settings.event='RefreshView';this.refreshViewAjax=new Drupal.ajax(this.selector,this.$view,self_settings)};Drupal.views.ajaxView.prototype.attachExposedFormAjax=function(){var button=$('input[type=submit], button[type=submit], input[type=image]',this.$exposed_form);button=button[0];this.exposedFormAjax=new Drupal.ajax($(button).attr('id'),button,this.element_settings)};Drupal.views.ajaxView.prototype.filterNestedViews=function(){return!this.$view.parents('.view').size()};Drupal.views.ajaxView.prototype.attachPagerAjax=function(){this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a').each(jQuery.proxy(this.attachPagerLinkAjax,this))};Drupal.views.ajaxView.prototype.attachPagerLinkAjax=function(id,link){var $link=$(link),viewData={},href=$link.attr('href');$.extend(viewData,this.settings,Drupal.Views.parseQueryString(href),Drupal.Views.parseViewArgs(href,this.settings.view_base_path));$.extend(viewData,Drupal.Views.parseViewArgs(href,this.settings.view_base_path));this.element_settings.submit=viewData;this.pagerAjax=new Drupal.ajax(false,$link,this.element_settings)};Drupal.ajax.prototype.commands.viewsScrollTop=function(ajax,response,status){var offset=$(response.selector).offset(),scrollTarget=response.selector;while($(scrollTarget).scrollTop()==0&&$(scrollTarget).parent())scrollTarget=$(scrollTarget).parent();if(offset.top-10<$(scrollTarget).scrollTop())$(scrollTarget).animate({scrollTop:(offset.top-10)},500)}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/views/js/ajax_view.js. */
