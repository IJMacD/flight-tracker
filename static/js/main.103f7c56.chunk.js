(window["webpackJsonpflight-tracker"]=window["webpackJsonpflight-tracker"]||[]).push([[0],{11:function(t,e,n){t.exports=n(19)},16:function(t,e,n){},18:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),l=(n(16),n(8)),c=n(1),u=n.n(c),s=n(2),h=n(5),f=n(6),v=n(9),y=n(7),d=n(10);n(18);function m(t,e,n){return{x:(e-t.min_lon)/(t.max_lon-t.min_lon)*t.width,y:(n-t.min_lat)/(t.max_lat-t.min_lat)*t.height}}var g={min_lon:113.8,min_lat:22.1,max_lon:114.5,max_lat:22.6,width:1086,height:842};function p(t){var e=t.aircraft,n=t.history,a=t.myLocation,i=t.coastline,o=r.a.useRef(),l=r.a.useRef();return r.a.useEffect(function(){if(o.current){var t=o.current.getContext("2d");if(t.clearRect(0,0,g.width,g.height),a){var r=m(g,a.longitude,a.latitude),i=r.x,l=r.y;t.fillStyle="#F00",t.beginPath(),t.arc(i,g.height-l,1,0,2*Math.PI),t.fill()}t.strokeStyle="#C0F0C0",t.fillStyle="#F0F0C0";var c=!0,u=!1,s=void 0;try{for(var h,f=e[Symbol.iterator]();!(c=(h=f.next()).done);c=!0){var v=h.value,y=m(g,v.longitude,v.latitude),d=y.x,p=y.y,w=v.true_track*Math.PI/180,x=5*Math.sin(w),_=5*Math.cos(w),b=Math.sin(w)*v.velocity*.1,k=Math.cos(w)*v.velocity*.1;t.lineWidth=1,t.beginPath(),t.moveTo(d+x,g.height-p-_),t.lineTo(d+b,g.height-p-k),t.stroke();var S=n[v.icao24];if(S){t.lineWidth=.5,t.beginPath();var j=!0,E=!0,O=!1,T=void 0;try{for(var C,M=S[Symbol.iterator]();!(E=(C=M.next()).done);E=!0){var P=C.value,I=m(g,P.longitude,P.latitude),W=I.x,F=I.y;j?t.moveTo(W,g.height-F):t.lineTo(W,g.height-F),j=!1}}catch(R){O=!0,T=R}finally{try{E||null==M.return||M.return()}finally{if(O)throw T}}t.stroke()}t.fillText(v.callsign,d+10,g.height-p),t.fillText("".concat((L=v.geo_altitude,String(.0328084*L|0).padStart(3,"0"))).concat(v.vertical_rate>2.5?"\ud83e\udc69":v.vertical_rate<-2.5?"\ud83e\udc6b":"="," ").concat(.194384*v.velocity|0),d+10,g.height-p+12),t.save(),t.translate(d,g.height-p),t.rotate(w),t.fillText("\ud83d\udee7\ufe0f",-5,4),t.restore()}}catch(R){u=!0,s=R}finally{try{c||null==f.return||f.return()}finally{if(u)throw s}}}var L}),r.a.useEffect(function(){if(l.current&&i){var t=l.current.getContext("2d");t.strokeStyle="#80C080";var e=!0,n=!1,a=void 0;try{for(var r,o=i.features[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var c=r.value;t.beginPath();var u=!0,s=!0,h=!1,f=void 0;try{for(var v,y=c.geometry.coordinates[Symbol.iterator]();!(s=(v=y.next()).done);s=!0){var d=v.value,p=m(g,d[0],d[1]),w=p.x,x=p.y;u?t.moveTo(w,g.height-x):t.lineTo(w,g.height-x),u=!1}}catch(_){h=!0,f=_}finally{try{s||null==y.return||y.return()}finally{if(h)throw f}}t.stroke()}}catch(_){n=!0,a=_}finally{try{e||null==o.return||o.return()}finally{if(n)throw a}}}},[i]),r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("canvas",{ref:l,width:g.width,height:g.height,style:{position:"absolute"}}),r.a.createElement("canvas",{ref:o,width:g.width,height:g.height}))}var w={min_lon:113.8,min_lat:22.1,max_lon:114.5,max_lat:22.6,width:543,height:421},x=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(v.a)(this,Object(y.a)(e).call(this,t))).state={aircraft:[],history:{}},n}return Object(d.a)(e,t),Object(f.a)(e,[{key:"componentDidMount",value:function(){var t=Object(s.a)(u.a.mark(function t(){var e,a,r=this;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(e=function(){var t=Object(s.a)(u.a.mark(function t(){var e,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_(w);case 2:e=t.sent,n=S(r.state.history,e),r.setState({aircraft:e,history:n});case 5:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}())(),this.timeout=setInterval(e,1e4),navigator.geolocation.getCurrentPosition(function(t){r.setState({myLocation:t.coords})}),t.next=6,n.e(3).then(n.t.bind(null,20,3));case 6:a=t.sent.default,this.setState({coastline:a});case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearInterval(this.timeout)}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(p,{aircraft:this.state.aircraft,history:this.state.history,myLocation:this.state.myLocation,coastline:this.state.coastline}))}}]),e}(r.a.Component);function _(t){return b.apply(this,arguments)}function b(){return(b=Object(s.a)(u.a.mark(function t(e){var n,a,r;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://opensky-network.org/api/states/all?lamin=".concat(e.min_lat,"&lomin=").concat(e.min_lon,"&lamax=").concat(e.max_lat,"&lomax=").concat(e.max_lon));case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,r=["icao24","callsign","origin_country","time_position","last_contact","longitude","latitude","baro_altitude","on_ground","velocity","true_track","vertical_rate","sensors","geo_altitude","squawk","spi","position_source"],t.abrupt("return",a.states.map(function(t){return k(r,t)}));case 8:case"end":return t.stop()}},t)}))).apply(this,arguments)}function k(t,e){for(var n={},a=0;a<t.length&&a<e.length;a++)n[t[a]]=e[a];return n}function S(t,e){var n={},a=!0,r=!1,i=void 0;try{for(var o,c=e[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var u=o.value,s=t[u.icao24]||[],h=u.longitude,f=u.latitude;n[u.icao24]=[].concat(Object(l.a)(s),[{longitude:h,latitude:f}])}}catch(v){r=!0,i=v}finally{try{a||null==c.return||c.return()}finally{if(r)throw i}}return n}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[11,1,2]]]);
//# sourceMappingURL=main.103f7c56.chunk.js.map