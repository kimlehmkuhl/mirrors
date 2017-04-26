/* Source and licensing information for the line(s) below can be found at https://aspe.hhs.gov/sites/all/modules/custom/aspe_nodes/theme/js/aspe_nodes.footable.js. */
(function($){$.extend($.fn.dataTableExt.oSort,{"formattedNum-pre":function(a){a=(a==="n/a"||a==="")?0:a.replace(/[^\d\-\.]/g,'');return parseFloat(a)},"formattedNum-asc":function(a,b){return a-b},"formattedNum-desc":function(a,b){return b-a}});$.fn.DataTable.ext.type.search.formattedNum=function(data){return!data?'':typeof data==='string'?data+data.replace(/[ \,]/g,''):data};$.extend($.fn.dataTableExt.oSort,{"customDate-pre":function(a){if(a){var array=a.match(/\d[\d]/g),m=array[0],d=array[1],y=array[2]+array[3],newData=y+m+d;return parseInt(newData)}else return 0},"customDate-asc":function(a,b){return((a<b)?-1:((a>b)?1:0))},"customDate-desc":function(a,b){return((a<b)?1:((a>b)?-1:0))}});$.extend($.fn.dataTableExt.oSort,{"number-pre":function(a){return parseInt(a)},"number-asc":function(a,b){return((a<b)?-1:((a>b)?1:0))},"number-desc":function(a,b){return((a<b)?1:((a>b)?-1:0))}});$.fn.collectIntRows=function(){var rowsLen;if($(this).find('thead tr').length>1){var arr=[];$(this).find('thead tr').each(function(){arr.push($(this).find('th').length)});rowsLen=Math.max.apply(null,arr)}else if($(this).find('thead tr').length==1)rowsLen=$(this).find('th').length;var elements=[];for(var i=0;i<rowsLen;i++){var text=$(this).find('tbody').children('tr').children('td').eq(i).text(),matches=text.match(/\d*[,|.]+\d*/ig);if(matches)elements.push(i)};return elements};Drupal.behaviors.ASPETables={attach:function(context,settings){var tables=[];if($('.footable:not(".dataTable")',context).length){$('.footable:not(".dataTable, .nofilter, .databook")',context).once(function(){var tbody=$(this).find('tbody'),thead=$(this).find('thead'),table_colspans=tbody.find('td[colspan], td[rowspan]').length,header_colspans=thead.find('th[colspan]').length;if(header_colspans==0&&table_colspans==0){var intRows=$(this).collectIntRows(),tableSettings={retrieve:true,paging:false,info:false,aaSorting:[],responsive:$(this).hasClass('not-responsive')?false:true,bFilter:$(this).find('tbody tr').length>4?true:false,language:{searchPlaceholder:"Search in table for..."}};if($(this).hasClass('sort-date'))tableSettings.order=[(thead.find('th').length-1),'desc'];if($(this).hasClass('sort-title'))tableSettings.order=[1,'asc'];var columnDefs=[{targets:"datatable-nosort",orderable:false}];if(header_colspans==0)columnDefs.push({targets:intRows,type:'formattedNum'});if($(this).hasClass('hide-keywords'))columnDefs.push({targets:[-2],visible:false,className:'hidden'},{type:"customDate",className:'cd',targets:-1});tableSettings.columnDefs=columnDefs;tableSettings.bSort=($(this).hasClass('sort-disable')||$(this).hasClass('nofilter'))?false:true;$(this).dataTable(tableSettings)}});$('.nofilter',context).once(function(){var settings={retrieve:true,paging:false,info:false,aaSorting:[],responsive:true,bFilter:false,language:{searchPlaceholder:"Search in table for..."}},columnDefs=[];if($('body',context).hasClass('page-key-staff'))columnDefs.push({targets:[0],orderable:false},{targets:[1],width:"240px"},{targets:[2],width:"400px"},{targets:[3],width:"280px"});settings.columnDefs=columnDefs;var t=$(this).dataTable(settings);tables.push(t)})};$('.dt-ajax',context).once(function(){var dateTarget;if($('body').hasClass('page-datasets')){dateTarget=6}else if($('body').hasClass('page-visualizations')){dateTarget=5}else dateTarget=4;var re=/page\-([a-zA-Z]\w+)/g,page=re.exec($('body').attr('class'))[1],ajaxUrl='/export-json/'+page,order=4,titleData,columns=[{data:"Image",render:function(data,type,full,meta){return'<a href="'+full.Link+'"><img src="'+full.Image.src+'" alt="'+full.Image.alt+'" title="'+full.Image.title+'"/></a>'},className:"text-center col-xs-1",width:"10%"},{data:"ID",type:"number",visible:"false",className:"hidden",searchable:false},{data:"Title",render:function(data,type,full,meta){return'<a href="'+full.Link+'">'+data+'</a>'}},{data:"Description",visible:"false",className:"hidden description"},{data:"Date",type:"customDate",className:"date",width:"140px"}];if(page=='datasets'){var actionColumn={data:"Actions",className:"actions",render:function(data,type,full,meta){var nodeLink=full.Link.replace(/\w+\//,'');return'<ul class="tablefield-export-link list-inline"><li><a href="/tablefield/export/node/'+full.ID+'/field_chart_data_table/und/0" class="export export-csv btn btn-sm btn-default download-file"><img src="/sites/all/themes/stability/stability_aspe/images/fa-share-grey.png" alt="export-csv">CSV</a></li><li><a href="/export/dataset/retrieve'+nodeLink+'.json" class="export export-json btn btn-sm btn-default download-file"><img src="/sites/all/themes/stability/stability_aspe/images/fa-share-grey.png" alt="export-json">JSON</a></li><li><a href="/export/dataset/retrieve'+nodeLink+'.xml" class="export export-xml btn btn-sm btn-default download-file"><img src="/sites/all/themes/stability/stability_aspe/images/fa-share-grey.png" alt="export-xml">XML</a></li></ul>'}};titleData='Datasets';var fromColumn={data:"From",className:"from hidden",render:function(data,type,full,meta){if(data.link!==''){return"From: <a href='"+data.link+"'>"+$.trimStr(data.title,43)+"</a>"}else return''}};columns.splice(-2,0,actionColumn);columns.splice(-3,0,fromColumn);order+=2};if(page=='visualizations'){titleData='Interactives';var fromColumn={data:"From",className:"from hidden",render:function(data,type,full,meta){if(data.link!==''){return"From: <a href='"+data.link+"'>"+$.trimStr(data.title,43)+"</a>"}else return''}};columns.splice(-2,0,fromColumn)};if(page=='reports'||page=='evaluations')titleData='Publications';var aTable=$(this).dataTable({processing:true,serverSide:true,ajax:{url:ajaxUrl,type:"POST"},columns:columns,order:[order,'desc'],retrieve:true,paging:true,info:false,pageLength:16,bLengthChange:false,responsive:true,language:{searchPlaceholder:"Filter "+titleData+"..."}});aTable.fnSortListener(document.getElementById('byName'),2);aTable.fnSortListener(document.getElementById('byDate'),dateTarget);if($('.dt-ajax').length&&$('#sort-by').length){var table=$('.dt-ajax');table.find('thead th').click(function(){var index=$('table thead th').index($(this)),target,dir;if(index==dateTarget){target='Date'}else if(index==2)target='Name';if($(this).hasClass('sorting_asc')){dir='asc'}else dir='desc';$('#sort-by a i').addClass('transparent');$('#sort-by #by'+target+' i').removeClass('transparent').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc')})}});$('#sort-by a').click(function(){var carret=$(this).find('i');if($(this).attr('id')=='byDate'&&carret.hasClass('transparent')){carret.removeClass('fa-sort-desc');carret.addClass('fa-sort-asc')}else{carret.toggleClass('fa-sort-asc');carret.toggleClass('fa-sort-desc')};$('#sort-by a i').addClass('transparent');carret.removeClass('transparent')})}};Drupal.behaviors.ASPETableHighlight={attach:function(context){$('.dataTables_filter input',context).on('input',function(){var text=$(this).val(),elementsToHighlight=['p','td','li','div'],tableToHighlight=$(this).parent().parent().next('.footable').attr('id');$('#'+tableToHighlight).removeHighlight();if(text.length>2){$.each(elementsToHighlight,function(index,value){$('#'+tableToHighlight+' '+value).highlight(text)});return false}})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://aspe.hhs.gov/sites/all/modules/custom/aspe_nodes/theme/js/aspe_nodes.footable.js. */
