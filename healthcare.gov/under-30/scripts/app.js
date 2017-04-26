"use strict";var app=angular.module("youngAdults",["Util","Session","Config","Question","ngRoute","ui.router"]);app.config(["$routeProvider","$locationProvider","$stateProvider",function(e,t,o){e.when("","/").otherwise("/"),o.state("intro",{url:"/",templateUrl:"views/intro.html",controller:["$rootScope","$scope","$state","underscore","config","session",function(e,t,o,n,a,l){if(n.isUndefined(e.introData)||n.isNull(e.introData)){var r=new a("configs/intro.json");e.$on("$configLoaded",function(){r.get(l.get("lang")).then(function(o){e.introData=o,t.t=o})})}else t.t=e.introData}]}).state("questions",{resolve:{contentPromise:["config",function(e){return new e("configs/translation.json")}]},url:"/questions",templateUrl:"views/questions.html",controller:"appController"}).state("results",{url:"/results/:data",controller:"resultsController"}).state("result",{url:"/:id",controller:"endController",templateUrl:function(e){var t={"covered-by-parent-plan":"Result-A-covered-by-parent-plan.html","dependent-not-eligible-for-job-based-coverage-options":"Result-B-dependent-not-eligible-for-job-based-coverage-options.html","dependent-eligible-for-job-based-coverage-options":"Result-C-dependent-eligible-for-job-based-coverage-options.html","join-parent-job-based-coverage":"Result-F-join-parent-job-based-coverage.html","join-parent-Marketplace-plan-files-taxes":"Result-G-join-parent-Marketplace-plan-files-taxes.html","parent-on-Medicaid-or-Medicare":"Result-H-parent-on-Medicaid-or-Medicare.html","other-options-not-eligible-for-job-based-coverage-options":"Result-I-other-options-not-eligible-for-job-based-coverage-options.html","not-covered-eligible-for-job-based-plan":"Result-J-not-covered-eligible-for-job-based-plan.html","eligible-for-job-based-plan":"Result-K-eligible-for-job-based-plan.html","has-job-based-coverage":"Result-L-has-job-based-coverage.html","has-other-coverage":"Result-M-has-other-coverage.html","has-Marketplace-coverage":"Result-N-has-Marketplace-coverage.html","other-options-files-taxes":"Result-O-other-options-files-taxes.html","join-parent-Marketplace-plan-not-dependent":"Result-P-join-parent-Marketplace-plan-not-dependent.html","join-parent-Marketplace-plan":"Result-Q-join-parent-Marketplace-plan.html","other-options-not-interested-in-lower-costs":"Result-R-other-options-not-interested-in-lower-costs.html","not-eligible-for-job-based-plan":"Result-S-not-eligible-for-job-based-plan.html","other-options-does-not-file-taxes":"Result-T-other-options-does-not-file-taxes.html","not-covered-not-eligible-for-job-based-plan":"Result-U-not-covered-not-eligible-for-job-based-plan.html"},o=-1==window.location.host.indexOf("cuidadodesalud.gov")&&-1==window.location.pathname.indexOf("/es/")?"en":"es";return"data/results/html_files/"+o+"/"+t[e.id]}})}]),app.run(["$rootScope","$state","session",function(e,t,o){var n=-1==window.location.host.indexOf("cuidadodesalud.gov")&&-1==window.location.pathname.indexOf("/es/")?"en":"es";angular.element("html").attr("lang",n),o.set("lang",n),t.go("intro")}]);