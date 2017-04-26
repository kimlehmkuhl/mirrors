"use strict";var app=angular.module("youngAdults");app.controller("resultsController",["$scope","$rootScope","$http","$state","$stateParams","underscore","session",function(e,t,o,n,r,a,i){e.pageHtml="";var s=JSON.parse(r.data),l=i.data.profile,c=s.previousQuestion;this.getResultId=function(e){var t="",o="yes-insurance"===a.property("individual-coverage")(l),n="group1"===a.property("age-group")(l)||"group2"===a.property("age-group")(l),r="has-parent-coverage"===a.property("parental-coverage")(l),i="yes-add"===a.property("addTo-plan")(l),s="yes-marketplace"===a.property("dependent-child")(l),c="yes-claim"===a.property("second-parent-claim")(l),d="yes-dependent"===a.property("parent-claim")(l),u="yes-alternates"!==a.property("different-options")(l),p="yes-credits"===a.property("get-tax-credits")(l);switch(e.id){case"alternate-options":"yes-alternates"===e.selected&&(t="A");break;case"dependent-child":"yes-job-private"===e.selected?t="F":"yes-medicade-medicare"===e.selected&&(t="H");break;case"second-parent-claim":"yes-claim"===e.selected&&(t="Q");break;case"taxes":if("yes-file"===e.selected){var g=!0,v=!0;g=n&&!r&&i&&s&&!c,v=n&&r&&u&&p&&!d,t=g?"G":v?"O":""}else if("no-file"===e.selected){var h=!0,f=!0;h=n&&!r&&i&&s&&!c,f=n&&r&&u&&p&&!d,t=h?"P":f?"T":""}break;case"individual_source":"yes-job"===e.selected?t="L":"yes-other"===e.selected?t="M":"yes-market"===e.selected&&(t="N");break;case"coverage_job":if("yes-job-based"===e.selected){var b=!0,y=!0,m=!0,w=!0;b=n&&r&&u&&p&&d,w=n&&r&&u&&!p,y=!n&&!o,m=n&&!r&&!i&&!o,t=w?"I":b?"C":y?"J":m?"K":""}else if("no-job-based"===e.selected){var j=!0,$=!0,S=!0,k=!0;j=n&&r&&u&&p&&d,k=n&&r&&u&&!p,$=n&&!r&&!i&&!o,S=!n&&!o,t=j?"B":k?"R":$?"S":S?"U":""}}return a.isEmpty(t)?(window.alert("No possible result found."),void 0):t};var d=this.getResultId(c),u={A:"covered-by-parent-plan",B:"dependent-not-eligible-for-job-based-coverage-options",C:"dependent-eligible-for-job-based-coverage-options",F:"join-parent-job-based-coverage",G:"join-parent-Marketplace-plan-files-taxes",H:"parent-on-Medicaid-or-Medicare",I:"other-options-not-eligible-for-job-based-coverage-options",J:"not-covered-eligible-for-job-based-plan",K:"eligible-for-job-based-plan",L:"has-job-based-coverage",M:"has-other-coverage",N:"has-Marketplace-coverage",O:"other-options-files-taxes",P:"join-parent-Marketplace-plan-not-dependent",Q:"join-parent-Marketplace-plan",R:"other-options-not-interested-in-lower-costs",S:"not-eligible-for-job-based-plan",T:"other-options-does-not-file-taxes",U:"not-covered-not-eligible-for-job-based-plan"};n.go("result",{id:u[d]})}]);