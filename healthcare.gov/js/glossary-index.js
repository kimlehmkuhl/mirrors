$(function(){function iterateAlphabet(job){var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var i=0;i<alphabet.length;i++){var nextChar=alphabet.charAt(i);if(job==="index"){$("#glossary-index").append('<li><a class="inactive '+nextChar+'letter" href="#'+nextChar+'anchor">'+nextChar+"</a></li>")}else if(job==="cards"){if($("."+nextChar).length>0){$("."+nextChar).wrapAll('<div class="row"><div class="col-sm-12"><ul class="list-inline">').first().parent("ul").parent().prepend('<h2 id="'+nextChar+'anchor">'+nextChar+"</h2>").parent().append('<div class="clearfix"></div><hr />')}else{$("."+nextChar+"letter").each(function(i,e){var html="<span>"+$(e).text()+"</span>";$(e).parent().html(html)})}}}$(".row .col-sm-12 hr").last().css("borderTop","1px solid transparent")}iterateAlphabet("index");$(".gpost").each(function(){var secondLetter=$(this).text().substr(1,1);var letter=$(this).text().substr(0,1).replace(/Á/g,"A").replace(/É/g,"E").replace(/Ó/g,"O").replace(/Í/g,"I").replace(/Ú/g,"U").replace(/\W/g,secondLetter);$(this).addClass(letter);$(".inactive"+letter).addClass("active")});iterateAlphabet("cards")});