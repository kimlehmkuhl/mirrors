"use strict";var gov=gov||{};gov.hc=gov.hc||{},gov.hc.survey={selector:"#q-survey",interceptEvent:"intercept-display",destinationSelector:"#survey-container",zoneId:"",hasRun:!1,lang:"en",started:!1,gone:!1,init:function(e){if(!this.hasRun){this.hasRun=!0;var t=this;e&&(this.lang=e.lang||this.lang),$.ajax({type:"GET",url:"configs/config.json",dataType:"json",success:function(e){if(e.zoneId){t.zoneId=e.zoneId,t.setDivId();var n=gov.hc.survey.interceptEvent,o=$(gov.hc.survey.selector);o.on(n,function(){gov.hc.survey.insertSurvey(this)})}}})}},go:function(){gov.hc.domLoaded&&gov.hc.survey.q&&!gov.hc.survey.gone&&gov.hc.survey.q.go()},setDivId:function(){},startQualtrics:function(){var e=this;(function(){var t=function(t,n,o,r){e.q=this,this.get=function(e){for(var e=e+"=",t=document.cookie.split(";"),n=0,o=t.length;o>n;n++){for(var r=t[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(e))return r.substring(e.length,r.length)}return null},this.set=function(e,t){var n="",n=new Date;n.setTime(n.getTime()+6048e5),n="; expires="+n.toGMTString(),document.cookie=e+"="+t+n+"; path=/; "},this.check=function(){var e=this.get(o);if(e)e=e.split(":");else{if(100==t)return!0;"v"==n&&(t=Math.random()>=t/100?0:100),e=[n,t,0],this.set(o,e.join(":"))}var r=e[1];if(100==r)return!0;switch(e[0]){case"v":return!1;case"r":return r=e[2]%Math.floor(100/r),e[2]++,this.set(o,e.join(":")),!r}return!0},this.go=function(){if(e.gone=!0,this.check()){var t=document.createElement("script");t.type="text/javascript",t.src=r+"&t="+(new Date).getTime(),document.body&&document.body.appendChild(t)}},this.start=function(){e.started=!0;var t=this;window.addEventListener?window.addEventListener("load",function(){t.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){t.go()}),e.go()}};try{new t(100,"r","QSI_S_"+gov.hc.survey.zoneId,"//"+gov.hc.survey.zoneId+"-healthcare.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID="+gov.hc.survey.zoneId+"&Q_LOC="+encodeURIComponent(window.location.href)).start()}catch(n){}})()},getDestination:function(e){return e=e||document,$(e).find(gov.hc.survey.destinationSelector)},cleanContent:function(e){var t;if(e)return e=$(e),t=function(e){return e.removeAttr("style").removeAttr("class")},t(e),t(e.find("div")),e},insertSurvey:function(e){var t;if(e=$(e),t=gov.hc.survey.cleanContent(e.children())){var n=gov.hc.survey.getDestination();n.empty(),n.append(t),e.empty()}}},gov.hc.survey.init();