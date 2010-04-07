/*
 * g.Raphael 0.4 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.piechart=function(e,d,o,b,l){l=l||{};var k=this,m=[],g=this.set(),n=this.set(),j=this.set(),v=[],x=b.length,y=0,C=0,A=0,c=9,z=true;n.covers=g;if(x==1){j.push(this.circle(e,d,o).attr({fill:this.g.colors[0],stroke:opt.stroke||"#fff","stroke-width":l.strokewidth==null?1:l.strokewidth}));g.push(this.circle(e,d,o).attr(this.g.shim));C=b[0];b[0]={value:b[0],order:0,valueOf:function(){return this.value}};j[0].middle={x:e,y:d};j[0].mangle=180}else{function u(H,G,i,J,F,O){var L=Math.PI/180,D=H+i*Math.cos(-J*L),p=H+i*Math.cos(-F*L),I=H+i/2*Math.cos(-(J+(F-J)/2)*L),N=G+i*Math.sin(-J*L),M=G+i*Math.sin(-F*L),E=G+i/2*Math.sin(-(J+(F-J)/2)*L),K=["M",H,G,"L",D,N,"A",i,i,0,+(Math.abs(F-J)>180),1,p,M,"z"];K.middle={x:I,y:E};return K}for(var w=0;w<x;w++){C+=b[w];b[w]={value:b[w],order:w,valueOf:function(){return this.value}}}b.sort(function(p,i){return i.value-p.value});for(var w=0;w<x;w++){if(z&&b[w]*360/C<=1.5){c=w;z=false}if(w>c){z=false;b[c].value+=b[w];b[c].others=true;A=b[c].value}}x=Math.min(c+1,b.length);A&&b.splice(x)&&(b[c].others=true);for(var w=0;w<x;w++){var t=y-360*b[w]/C;var B=function(i){return l.start_angle+i||i/2};var f=B(t);if(!w){y=90-f;f=B(t)}if(l.init){var h=u(e,d,1,y,t).join(",")}var s=u(e,d,o,y,y-=360*b[w]/C);var q=this.path(l.init?h:s).attr({fill:l.colors&&l.colors[w]||this.g.colors[w]||"#666",stroke:l.stroke||"#fff","stroke-width":(l.strokewidth==null?1:l.strokewidth),"stroke-linejoin":"round"});q.value=b[w];q.middle=s.middle;q.mangle=f;m.push(q);j.push(q);l.init&&q.animate({path:s.join(",")},(+l.init-1)||1000,">")}for(var w=0;w<x;w++){var q=k.path(m[w].attr("path")).attr(this.g.shim);l.href&&l.href[w]&&q.attr({href:l.href[w]});q.attr=function(){};g.push(q);j.push(q)}}n.hover=function(E,r){r=r||function(){};var D=this;for(var p=0;p<x;p++){(function(F,G,i){var H={sector:F,cover:G,cx:e,cy:d,mx:F.middle.x,my:F.middle.y,mangle:F.mangle,r:o,value:b[i],total:C,label:D.labels&&D.labels[i]};G.mouseover(function(){E.call(H)}).mouseout(function(){r.call(H)})})(j[p],g[p],p)}return this};n.each=function(D){var r=this;for(var p=0;p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:e,cy:d,x:E.middle.x,y:E.middle.y,mangle:E.mangle,r:o,value:b[i],total:C,label:r.labels&&r.labels[i]};D.call(G)})(j[p],g[p],p)}return this};n.click=function(D){var r=this;for(var p=0;p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:e,cy:d,mx:E.middle.x,my:E.middle.y,mangle:E.mangle,r:o,value:b[i],total:C,label:r.labels&&r.labels[i]};F.click(function(){D.call(G)})})(j[p],g[p],p)}return this};n.inject=function(i){i.insertBefore(g[0])};var a=function(I,D,r,p){var M=e+o+o/5,L=d,H=L+10;I=I||[];p=(p&&p.toLowerCase&&p.toLowerCase())||"east";r=k.g.markers[r&&r.toLowerCase()]||"disc";n.labels=k.set();for(var G=0;G<x;G++){var N=j[G].attr("fill"),E=b[G].order,F;b[G].others&&(I[E]=D||"Others");I[E]=k.g.labelise(I[E],b[G],C);n.labels.push(k.set());n.labels[G].push(k.g[r](M+5,H,5).attr({fill:N,stroke:"none"}));n.labels[G].push(F=k.text(M+20,H,I[E]||b[E]).attr(k.g.txtattr).attr({fill:l.legendcolor||"#000","text-anchor":"start"}));g[G].label=n.labels[G];H+=F.getBBox().height*1.2}var J=n.labels.getBBox(),K={east:[0,-J.height/2],west:[-J.width-2*o-20,-J.height/2],north:[-o-J.width/2,-o-J.height-10],south:[-o-J.width/2,o+10]}[p];n.labels.translate.apply(n.labels,K);n.push(n.labels)};if(l.legend){a(l.legend,l.legendothers,l.legendmark,l.legendpos)}n.push(j,g);n.series=j;n.covers=g;return n};