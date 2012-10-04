// entry point
(function(){var a=window.cdb={};window.cdb.config={},window.cdb.core={},window.cdb.geo={},window.cdb.geo.ui={},window.cdb.ui={},window.cdb.ui.common={},window.cdb.vis={},window.cdb.decorators={},window.JST=window.JST||{},a.files=["../vendor/jquery.min.js","../vendor/underscore-min.js","../vendor/backbone.js","../vendor/leaflet.js","../vendor/wax.leaf.js","../vendor/cartodb-leaflet.js","core/decorator.js","core/config.js","core/log.js","core/profiler.js","core/template.js","core/view.js","geo/map.js","geo/ui/zoom.js","geo/ui/legend.js","geo/ui/switcher.js","geo/ui/infowindow.js","geo/ui/header.js","geo/leaflet.js","ui/common/dialog.js","ui/common/notification.js","ui/common/table.js","vis/vis.js","vis/overlays.js","vis/layers.js"],a.init=function(b){var c=a.Class=function(){};_.extend(c.prototype,Backbone.Events),a._loadJST(),window.cdb.god=new Backbone.Model,b&&b()},a.load=function(b,c){var d=0,e=function(){var f=document.createElement("script");f.src=b+a.files[d],document.body.appendChild(f),++d,d==a.files.length?c&&(f.onload=c):f.onload=e};e()}})(),cdb.decorators.super=function(){var a=Backbone.Router.extend,b=function(a,b){var c=null;if(this.parent!=null){var d=this.parent;this.parent=this.parent.parent,d.hasOwnProperty(a)?c=d[a].call(this,b):c=d.super.call(this,a,b),this.parent=d}return c},c=function(c,d){var e=a.call(this,c,d);return e.prototype.parent=this.prototype,e.prototype.super=function(a,c){return a?b.call(this,a,c):e.prototype.parent},e},d=function(a){a.extend=c,a.prototype.super=function(){},a.prototype.parent=null};return d}(),cdb.decorators.super(Backbone.Model),cdb.decorators.super(Backbone.View),cdb.decorators.super(Backbone.Collection),function(){Config=Backbone.Model.extend({VERSION:2,REPORT_ERROR_URL:"/api/v0/error",ERROR_TRACK_ENABLED:!1}),cdb.config=new Config}(),function(){cdb.core.Error=Backbone.Model.extend({url:cdb.config.REPORT_ERROR_URL,initialize:function(){this.set({browser:JSON.stringify($.browser)})}}),cdb.core.ErrorList=Backbone.Collection.extend({model:cdb.core.Error}),cdb.errors=new cdb.core.ErrorList,cdb.config.ERROR_TRACK_ENABLED&&(window.onerror=function(a,b,c){cdb.errors.create({msg:a,url:b,line:c})});var a=function(){};a.prototype.error=function(){},a.prototype.log=function(){},typeof console!="undefined"?_console=console:_console=new a,cdb.core.Log=Backbone.Model.extend({error:function(){_console.error.apply(_console,arguments),cdb.errors.create({msg:Array.prototype.slice.call(arguments).join("")})},log:function(){_console.log.apply(_console,arguments)},info:function(){_console.log.apply(_console,arguments)},debug:function(){_console.log.apply(_console,arguments)}})}(),cdb.log=new cdb.core.Log({tag:"cdb"}),function(){function a(){}function c(a,b){this.el=document.createElement("canvas"),this.el.width=a,this.el.height=b,this.el.style.float="left",this.el.style.border="3px solid rgba(0,0,0, 0.2)",this.ctx=this.el.getContext("2d");var c=a;this.value=0,this.max=0,this.min=0,this.pos=0,this.values=[],this.reset=function(){for(var a=0;a<c;++a)this.values[a]=0},this.set_value=function(a){this.value=a,this.values[this.pos]=a,this.pos=(this.pos+1)%c,this.max=a;for(var b=0;b<c;++b){var d=this.values[b];this.max=Math.max(this.max,d)}this.scale=this.max,this.render()},this.render=function(){this.el.width=this.el.width;for(var a=0;a<c;++a){var d=c-a-1,e=(this.pos+d)%c;e=.9*b*this.values[e]/this.scale,this.ctx.fillRect(d,b-e,1,e)}},this.reset()}a.times={},a.new_time=function(b,c){var d=a.times[b]=a.times[b]||{max:0,min:1e7,avg:0,total:0,count:0};d.max=Math.max(d.max,c),d.total+=c,d.min=Math.min(d.min,c),++d.count,d.avg=d.total/d.count,this.callbacks&&this.callbacks[b]&&this.callbacks[b](b,c)},a.new_value=a.new_time,a.print_stats=function(){for(k in a.times){var b=a.times[k];console.log(" === "+k+" === "),console.log(" max: "+b.max),console.log(" min: "+b.min),console.log(" avg: "+b.avg),console.log(" total: "+b.total)}},a.get=function(b){return{t0:null,start:function(){this.t0=(new Date).getTime()},end:function(){this.t0!==null&&(a.new_time(b,this.time=(new Date).getTime()-this.t0),this.t0=null)}}},typeof cdb!="undefined"?cdb.core.Profiler=a:window.Profiler=a;var b=b||function(a){var b={};return a.el?b.el=a.el:a.clientWidth?b.el=a:b.el=a[0]==="<"?document.createElement(a.substr(1,a.length-2)):document.getElementById(a),b.append=function(a){return a.el?b.el.appendChild(a.el):b.el.innerHTML+=a,b},b.attr=function(a,b){return this.el.setAttribute(a,b),this},b.css=function(a){for(var c in a)b.el.style[c]=a[c];return b},b.width=function(){return this.el.clientWidth},b.html=function(a){return b.el.innerHTML=a,this},b};a.ui=function(){a.callbacks={};var d;d||(d=b("<div>").css({position:"fixed",bottom:10,left:10,zIndex:2e4,width:b(document.body).width()-80,border:"1px solid #CCC",padding:"10px 30px",backgroundColor:"#fff",fontFamily:"helvetica neue,sans-serif",fontSize:"14px",lineHeight:"1.3em"}),b(document.body).append(d)),this.el=d;var e=function(){for(k in a.times){var e="_prof_time_"+k,f=b(e);if(!f.el){f=b("<div>").attr("id",e),f.css({margin:"0 0 20px 0","border-bottom":"1px solid #EEE"});var g=a.times[k],h=b("<div>").append("<h1>"+k+"</h1>").css({"font-weight":"bold",margin:"10px 0 30px 0"});for(var i in g)f.append(h.append(b("<div>").append('<span style="display: inline-block; width: 60px;font-weight: 300;">'+i+'</span><span style="font-size: 21px" id="'+k+"-"+i+'"></span>').css({padding:"5px 0"})));d.append(f);var j=new c(250,100);f.append(j),a.callbacks[k]=function(a,b){j.set_value(b)}}var g=a.times[k];for(var i in g)b(k+"-"+i).html(g[i].toFixed(2))}};setInterval(function(){e()},1e3)}}(),cdb.core.Template=Backbone.Model.extend({initialize:function(){this.bind("change",this._invalidate),this._invalidate()},url:function(){return this.get("template_url")},parse:function(a){return{template:a}},_invalidate:function(){this.compiled=null,this.get("template_url")&&this.fetch()},compile:function(){var a=this.get("type")||"underscore",b=cdb.core.Template.compilers[a];return b?b(this.get("template")):(cdb.log.error("can't get rendered for "+a),null)},render:function(a){var b=this.compiled=this.compiled||this.get("compiled")||this.compile(),c=cdb.core.Profiler.get("template_render");c.start();var d=b(a);return c.end(),d},asFunction:function(){return _.bind(this.render,this)}},{compilers:{underscore:_.template,mustache:typeof Mustache=="undefined"?null:Mustache.compile},compile:function(a,b){var c=new cdb.core.Template({template:a,type:b||"underscore"});return _.bind(c.render,c)}}),cdb.core.TemplateList=Backbone.Collection.extend({model:cdb.core.Template,getTemplate:function(a){this.namespace&&(a=this.namespace+a);var b=this.find(function(b){return b.get("name")===a});return b?_.bind(b.render,b):(cdb.log.error(a+" not found"),null)}}),cdb.templates=new cdb.core.TemplateList,cdb._loadJST=function(){typeof window.JST!==undefined&&cdb.templates.reset(_(JST).map(function(a,b){return{name:b,compiled:a}}))},function(){var a=cdb.core.View=Backbone.View.extend({constructor:function(b){this._models=[],this._subviews={},Backbone.View.call(this,b),a.viewCount++,a.views[this.cid]=this,this._created_at=new Date,cdb.core.Profiler.new_value("total_views",a.viewCount)},add_related_model:function(a){this._models.push(a)},addView:function(a){this._subviews[a.cid]=a,a._parent=this},removeView:function(a){delete this._subviews[a.cid]},clearSubViews:function(){_(this._subviews).each(function(a){a.clean()}),this._subviews={}},clean:function(){var b=this;this.trigger("clean"),this.clearSubViews(),this._parent&&this._parent.removeView(this),this.remove(),this.unbind(),_(this._models).each(function(a){a.unbind(null,null,b)}),this._models=[],a.viewCount--,delete a.views[this.cid]},getTemplate:function(a){return this.options.template?_.template(this.options.template):cdb.templates.getTemplate(a)},show:function(){this.$el.show()},hide:function(){this.$el.hide()}},{viewCount:0,views:{},extendEvents:function(a){return function(){return _.extend(a,this.constructor.__super__.events)}},runChecker:function(){_.each(cdb.core.View.views,function(a){_.each(a,function(b,c){c!=="_parent"&&a.hasOwnProperty(c)&&b instanceof cdb.core.View&&a._subviews[b.cid]===undefined&&(console.log("========="),console.log("untracked view: "),console.log(b.el),console.log("parent"),console.log(a.el),console.log(" "))})})}})}(),cdb.geo.MapLayer=Backbone.Model.extend({defaults:{visible:!0,type:"Tiled"}}),cdb.geo.TileLayer=cdb.geo.MapLayer.extend({getTileLayer:function(){}}),cdb.geo.PlainLayer=cdb.geo.MapLayer.extend({defaults:{type:"Plain",color:"#FFFFFF"}}),cdb.geo.CartoDBLayer=cdb.geo.MapLayer.extend({defaults:{type:"CartoDB",active:!0,query:null,opacity:.99,auto_bound:!1,interactivity:null,debug:!1,visible:!0,tiler_domain:"cartodb.com",tiler_port:"80",tiler_protocol:"http",sql_domain:"cartodb.com",sql_port:"80",sql_protocol:"http",extra_params:{},cdn_url:null},activate:function(){this.set({active:!0,opacity:.99,visible:!0})},deactivate:function(){this.set({active:!1,opacity:0,visible:!1})},toggle:function(){this.get("active")?this.deactivate():this.activate()}}),cdb.geo.Layers=Backbone.Collection.extend({model:cdb.geo.MapLayer,clone:function(){var a=new cdb.geo.Layers;return this.each(function(b){b.clone?a.add(b.clone()):a.add(_.clone(b.attributes))}),a}}),cdb.geo.Map=Backbone.Model.extend({defaults:{center:[0,0],zoom:3,minZoom:0,maxZoom:20,bounding_box_sw:[0,0],bounding_box_ne:[0,0],provider:"leaflet"},initialize:function(){this.layers=new cdb.geo.Layers},setView:function(a,b){this.set({center:a,zoom:b},{silent:!0}),this.trigger("set_view")},setZoom:function(a){this.set({zoom:a})},getZoom:function(){return this.get("zoom")},setCenter:function(a){this.set({center:a})},clone:function(){var a=new cdb.geo.Map(_.clone(this.attributes));return a.set({center:_.clone(this.attributes.center),bounding_box_sw:_.clone(this.attributes.bounding_box_sw),bounding_box_ne:_.clone(this.attributes.bounding_box_ne)}),a.layers=this.layers.clone(),a},setOptions:function(a){if(typeof a!="object"||a.length){if(this.options.debug)throw a+" options has to be an object";return}L.Util.setOptions(this,a)},getLayerAt:function(a){return this.layers.at(a)},getLayerByCid:function(a){return this.layers.getByCid(a)},addLayer:function(a,b){return this.layers.add(a,b),a.cid},removeLayer:function(a){this.layers.remove(a)},removeLayerByCid:function(a){var b=this.layers.getByCid(a);b?this.removeLayer(b):cdb.log.error("There's no layer with cid = "+a+".")},removeLayerAt:function(a){var b=this.layers.at(a);b?this.removeLayer(b):cdb.log.error("There's no layer in that position.")},clearLayers:function(){while(this.layers.length>0)this.removeLayer(this.layers.at(0))},getBaseLayer:function(){return this.layers.at(0)},setBaseLayer:function(a){var b=this.layers.at(0);return this.layers.remove(b),this.layers.add(a,{at:0}),b}}),cdb.geo.MapView=cdb.core.View.extend({initialize:function(){if(this.options.map===undefined)throw new Exception("you should specify a map model");this.map=this.options.map,this.add_related_model(this.map)},render:function(){return this},addInfowindow:function(a){this.$el.append(a.render().el),this.addView(a)},showBounds:function(a){throw"to be implemented"}}),cdb.geo.ui.Zoom=cdb.core.View.extend({id:"zoom",events:{"click .zoom_in":"zoom_in","click .zoom_out":"zoom_out"},default_options:{timeout:0,msg:""},initialize:function(){this.map=this.model,_.defaults(this.options,this.default_options),this.template=this.options.template?this.options.template:cdb.templates.getTemplate("geo/zoom")},render:function(){return this.$el.html(this.template(this.options)),this},zoom_in:function(a){if(this.map.get("maxZoom")<=this.map.getZoom())return;a.preventDefault(),a.stopPropagation(),this.map.setZoom(this.map.getZoom()+1)},zoom_out:function(a){if(this.map.get("minZoom")>=this.map.getZoom())return;a.preventDefault(),a.stopPropagation(),this.map.setZoom(this.map.getZoom()-1)}}),cdb.geo.ui.LegendItemModel=Backbone.Model.extend({}),cdb.geo.ui.LegendItems=Backbone.Collection.extend({model:cdb.geo.ui.LegendItemModel}),cdb.geo.ui.LegendItem=cdb.core.View.extend({tagName:"li",initialize:function(){_.bindAll(this,"render"),this.template=cdb.templates.getTemplate("templates/map/legend/item")},render:function(){return this.$el.html(this.template(this.model.toJSON())),this.$el}}),cdb.geo.ui.Legend=cdb.core.View.extend({id:"legend",default_options:{},initialize:function(){this.map=this.model,this.add_related_model(this.model),_.bindAll(this,"render","show","hide"),_.defaults(this.options,this.default_options),this.collection&&(this.model.collection=this.collection),this.template=this.options.template?this.options.template:cdb.templates.getTemplate("geo/legend")},show:function(){this.$el.fadeIn(250)},hide:function(){this.$el.fadeOut(250)},render:function(){var a=this;return this.model!=undefined&&this.$el.html(this.template(this.model.toJSON())),this.collection&&this.collection.each(function(b){var c=new cdb.geo.ui.LegendItem({className:b.get("className"),model:b});a.$el.find("ul").append(c.render())}),this}}),cdb.geo.ui.SwitcherItemModel=Backbone.Model.extend({}),cdb.geo.ui.SwitcherItems=Backbone.Collection.extend({model:cdb.geo.ui.SwitcherItemModel}),cdb.geo.ui.SwitcherItem=cdb.core.View.extend({tagName:"li",events:{"click a":"select"},initialize:function(){_.bindAll(this,"render"),this.template=cdb.templates.getTemplate("templates/map/switcher/item"),this.parent=this.options.parent,this.model.on("change:selected",this.render)},select:function(a){a.preventDefault(),this.parent.toggle(this);var b=this.model.get("callback");b&&b()},render:function(){return this.model.get("selected")==!0?this.$el.addClass("selected"):this.$el.removeClass("selected"),this.$el.html(this.template(this.model.toJSON())),this.$el}}),cdb.geo.ui.Switcher=cdb.core.View.extend({id:"switcher",default_options:{},initialize:function(){this.map=this.model,this.add_related_model(this.model),_.bindAll(this,"render","show","hide","toggle"),_.defaults(this.options,this.default_options),this.collection&&(this.model.collection=this.collection),this.template=this.options.template?this.options.template:cdb.templates.getTemplate("geo/switcher")},show:function(){this.$el.fadeIn(250)},hide:function(){this.$el.fadeOut(250)},toggle:function(a){this.collection&&this.collection.each(function(a){a.set("selected",!a.get("selected"))})},render:function(){var a=this;return this.model!=undefined&&this.$el.html(this.template(this.model.toJSON())),this.collection&&this.collection.each(function(b){var c=new cdb.geo.ui.SwitcherItem({parent:a,className:b.get("className"),model:b});a.$el.find("ul").append(c.render())}),this}}),cdb.geo.ui.InfowindowModel=Backbone.Model.extend({defaults:{template_name:"geo/infowindow",latlng:[0,0],offset:[0,0],autoPan:!0,content:"",visibility:!1,fields:null},clearFields:function(){this.set({fields:[]})},_cloneFields:function(){return _(this.get("fields")).map(function(a){return _.clone(a)})},addField:function(a,b){if(!this.containsField(a)){var c=this._cloneFields()||[];c.push({name:a,title:!0,position:b}),c.sort(function(a,b){return a.position-b.position}),this.set({fields:c})}return this},getFieldProperty:function(a,b){if(this.containsField(a)){var c=this.get("fields")||[],d=_.indexOf(_(c).pluck("name"),a);return c[d][b]}return null},setFieldProperty:function(a,b,c){if(this.containsField(a)){var d=this._cloneFields()||[],e=_.indexOf(_(d).pluck("name"),a);d[e][b]=c,this.set({fields:d})}return this},containsField:function(a){var b=this.get("fields")||[];return _.contains(_(b).pluck("name"),a)},removeField:function(a){if(this.containsField(a)){var b=this._cloneFields()||[],c=_.indexOf(_(b).pluck("name"),a);c>=0&&b.splice(c,1),this.set({fields:b})}return this}}),cdb.geo.ui.Infowindow=cdb.core.View.extend({className:"infowindow",initialize:function(){var a=this;_.bindAll(this,"render","setLatLng","changeTemplate","_updatePosition","_update","toggle","show","hide"),this.mapView=this.options.mapView,this.map=this.mapView.map_leaflet,this.template=this.options.template?this.options.template:cdb.templates.getTemplate(this.model.get("template_name")),this.add_related_model(this.model),this.model.bind("change:content",this.render,this),this.model.bind("change:template_name",this.changeTemplate,this),this.model.bind("change:latlng",this.render,this),this.model.bind("change:visibility",this.toggle,this),this.mapView.map.bind("change",this._updatePosition,this),this.map.on("drag",this._updatePosition,this),this.map.on("zoomstart",this.hide,this),this.map.on("zoomend",this.show,this),this.map.on("click",function(){a.model.set("visibility",!1)}),this.render(),this.$el.hide()},changeTemplate:function(a){this.template=cdb.templates.getTemplate(this.model.get("template_name")),this.render()},render:function(){return this.template&&(this.$el.html($(this.template(_.clone(this.model.attributes)))),this._update()),this},toggle:function(){this.model.get("visibility")?this.show():this.hide()},setLatLng:function(a){return this.model.set("latlng",a),this},showInfowindow:function(){this.model.set("visibility",!0)},show:function(){var a=this;this.model.get("visibility")&&(a.$el.css({left:-5e3}),a.$el.fadeIn(250,function(){a._update()}))},isHidden:function(){return!this.model.get("visibility")},hide:function(a){(a||!this.model.get("visibility"))&&this.$el.fadeOut(250)},_update:function(){this._adjustPan(),this._updatePosition()},_updatePosition:function(){var a=this.model.get("offset"),b=this.mapView.latLonToPixel(this.model.get("latlng")),c=this.$el.position().left,d=this.$el.position().top,e=this.$el.outerHeight(!0),f=this.$el.width(),g=b.x-a[0],h=this.map.getSize(),i=-1*(b.y-a[1]-h.y);this.$el.css({bottom:i,left:g})},_adjustPan:function(){var a=this.model.get("offset");if(!this.model.get("autoPan"))return;var b=this.map,c=this.$el.position().left,d=this.$el.position().top,e=this.$el.outerHeight(!0),f=this.$el.width(),g=new L.Point(c,d),h=this.mapView.latLonToPixel(this.model.get("latlng")),i=new L.Point(0,0),j=b.getSize();h.x-a[0]<0&&(i.x=h.x-a[0]-10),h.x-a[0]+f>j.x&&(i.x=h.x+f-j.x-a[0]+10),h.y-e<0&&(i.y=h.y-e-10),h.y-e>j.y&&(i.y=h.y+e-j.y),(i.x||i.y)&&b.panBy(i)}}),cdb.geo.ui.Header=cdb.core.View.extend({className:"header",initialize:function(){},render:function(){return this.$el.html(this.options.template(this.options)),this}}),function(){var a=L.TileLayer.extend({initialize:function(a){L.Util.setOptions(this,a)},_redrawTile:function(a){a.style["background-color"]=this.options.color},_createTileProto:function(){var a=this._divProto=L.DomUtil.create("div","leaflet-tile leaflet-tile-loaded"),b=this.options.tileSize;a.style.width=b+"px",a.style.height=b+"px"},_loadTile:function(a,b,c){},_createTile:function(){var a=this._divProto.cloneNode(!1);return a.onselectstart=a.onmousemove=L.Util.falseFn,this._redrawTile(a),a}}),b=function(a,b,c){this.leafletLayer=b,this.leafletMap=c,this.model=a,this.model.bind("change",this._update,this)};_.extend(b.prototype,Backbone.Events),_.extend(b.prototype,{remove:function(){this.leafletMap.removeLayer(this.leafletLayer),this.model.unbind(null,null,this),this.unbind()}});var c=function(c,d){var e=new a(c.attributes);b.call(this,c,e,d)};_.extend(c.prototype,b.prototype,{_update:function(){}}),cdb.geo.LeafLetPlainLayerView=c;var d=function(a,c){var d=new L.TileLayer(a.get("urlTemplate"));b.call(this,a,d,c)};_.extend(d.prototype,b.prototype,{_update:function(){_.defaults(this.leafletLayer.options,_.clone(this.model.attributes)),this.leafletLayer.setUrl(this.model.get("urlTemplate"))}}),cdb.geo.LeafLetTiledLayerView=d;var e=function(a,c){var d=this;_.bindAll(this,"featureOut","featureOver","featureClick");var e=_.clone(a.attributes);e.map=c;var f=e.featureOver,g=e.featureOut,h=e.featureClick;e.featureOver=function(){f&&f.apply(this,arguments),d.featureOver&&d.featureOver.apply(this,arguments)},e.featureOut=function(){g&&g.apply(this,arguments),d.featureOut&&d.featureOut.apply(this,arguments)},e.featureClick=function(){h&&h.apply(this,arguments),d.featureClick&&d.featureClick.apply(e,arguments)},leafletLayer=new L.CartoDBLayer(e),b.call(this,a,leafletLayer,c)};_.extend(e.prototype,b.prototype,{_update:function(){this.leafletLayer.setOptions(_.clone(this.model.attributes))},featureOver:function(a,b,c,d){this.trigger("featureOver",a,[b.lat,b.lng],c,d)},featureOut:function(a){this.trigger("featureOut",a)},featureClick:function(a,b,c,d){this.trigger("featureClick",a,[b.lat,b.lng],c,d)}}),cdb.geo.LeafLetLayerCartoDBView=e,cdb.geo.LeafletMapView=cdb.geo.MapView.extend({initialize:function(){_.bindAll(this,"_addLayer","_removeLayer","_setZoom","_setCenter","_setView"),cdb.geo.MapView.prototype.initialize.call(this);var a=this,b=this.map.get("center");this.map_leaflet=new L.Map(this.el,{zoomControl:!1,center:new L.LatLng(b[0],b[1]),zoom:this.map.get("zoom"),minZoom:this.map.get("minZoom"),maxZoom:this.map.get("maxZoom"),maxBounds:[this.map.get("bounding_box_ne"),this.map.get("bounding_box_sw")]}),this.layerTypeMap={tiled:cdb.geo.LeafLetTiledLayerView,cartodb:cdb.geo.LeafLetLayerCartoDBView,plain:cdb.geo.LeafLetPlainLayerView},this.layers={},this.map.bind("set_view",this._setView,this),this.map.layers.bind("add",this._addLayer,this),this.map.layers.bind("remove",this._removeLayer,this),this.map.layers.bind("reset",this._addLayers,this),this._bindModel(),this._addLayers(),this.map_leaflet.on("layeradd",function(b){this.trigger("layeradd",b,a)},this),this.map_leaflet.on("zoomend",function(){a._setModelProperty({zoom:a.map_leaflet.getZoom()})},this),this.map_leaflet.on("move",function(){var b=a.map_leaflet.getCenter();a._setModelProperty({center:[b.lat,b.lng]})}),this.map_leaflet.on("drag",function(){var b=a.map_leaflet.getCenter();a._setModelProperty({center:[b.lat,b.lng]})},this)},_bindModel:function(){this.map.bind("change:zoom",this._setZoom,this),this.map.bind("change:center",this._setCenter,this)},_unbindModel:function(){this.map.unbind("change:zoom",this._setZoom,this),this.map.unbind("change:center",this._setCenter,this)},_setModelProperty:function(a){this._unbindModel(),this.map.set(a),this._bindModel()},_setZoom:function(a,b){this.map_leaflet.setZoom(b)},_setCenter:function(a,b){this.map_leaflet.panTo(new L.LatLng(b[0],b[1]))},addInteraction:function(a,b,c){return wax.leaf.interaction().map(this.map_leaflet).tilejson(a).on("on",b).on("off",c)},getLayerByCid:function(a){var b=this.layers[a];return b||cdb.log.error("layer with cid "+a+" can't be get"),b},_removeLayer:function(a){this.layers[a.cid].remove(),delete this.layers[a.cid]},_setView:function(){this.map_leaflet.setView(this.map.get("center"),this.map.get("zoom"))},_addLayers:function(){var a=this;this.map.layers.each(function(b){a._addLayer(b)})},_addLayer:function(a,b,c){var d,e,f=this.layerTypeMap[a.get("type").toLowerCase()];f?e=new f(a,this.map_leaflet):cdb.log.error("MAP: "+a.get("type")+" can't be created"),this.layers[a.cid]=e;if(e){var g=this.layers.length===1||c&&c.index===0;this.map_leaflet.addLayer(e.leafletLayer,g),this.trigger("newLayerView",e,this)}else cdb.log.error("layer type not supported")},latLonToPixel:function(a){var b=this.map_leaflet.latLngToLayerPoint(new L.LatLng(a[0],a[1]));return this.map_leaflet.layerPointToContainerPoint(b)},getBounds:function(){var a=this.map_leaflet.getBounds(),b=a.getSouthWest(),c=a.getNorthEast();return[[b.lat,b.lng],[c.lat,c.lng]]},showBounds:function(a){var b=a[0],c=a[1],d=new L.LatLng(b[0],b[1]),e=new L.LatLng(c[0],c[1]);this.map_leaflet.fitBounds(new L.LatLngBounds(d,e))}})}(),cdb.ui.common.Dialog=cdb.core.View.extend({tagName:"div",className:"dialog",events:{"click .ok":"_ok","click .cancel":"_cancel","click .close":"_cancel"},default_options:{title:"title",description:"",ok_title:"Ok",cancel_title:"Cancel",width:300,height:200,clean_on_hide:!1,template_name:"common/views/dialog_base",ok_button_classes:"button green",cancel_button_classes:"",modal_type:"",modal_class:"",include_footer:!0},initialize:function(){_.defaults(this.options,this.default_options),_.bindAll(this,"render","_keydown"),$(document).bind("keydown",this._keydown),this.template_base=this.options.template_base?_.template(this.options.template_base):cdb.templates.getTemplate(this.options.template_name)},render:function(){var a=this.$el;return a.html(this.template_base(this.options)),a.find(".modal").css({width:this.options.width}),this.render_content&&this.$(".content").append(this.render_content()),this.options.modal_class&&this.$el.addClass(this.options.modal_class),this},_keydown:function(a){a.keyCode===27&&this._cancel()},appendToBody:function(){return $("body").append(this.render().el),this},_ok:function(a){a&&a.preventDefault(),this.ok&&this.ok(),this.hide()},_cancel:function(a){a&&(a.preventDefault(),a.stopPropagation()),this.cancel&&this.cancel(),this.hide()},hide:function(){this.$el.hide(),this.options.clean_on_hide&&this.clean()},open:function(){this.$el.show()}}),cdb.ui.common.Notification=cdb.core.View.extend({tagName:"div",className:"dialog",events:{"click .close":"hide"},default_options:{timeout:0,msg:""},initialize:function(){this.closeTimeout=-1,_.defaults(this.options,this.default_options),this.template=this.options.template?_.template(this.options.template):cdb.templates.getTemplate("common/notification"),this.$el.hide()},render:function(){var a=this.$el;return a.html(this.template(this.options)),this.render_content&&this.$(".content").append(this.render_content()),this},hide:function(a){a&&a.preventDefault(),clearTimeout(this.closeTimeout),this.$el.hide(),this.remove()},open:function(){this.render(),this.$el.show(),this.options.timeout&&(this.closeTimeout=setTimeout(_.bind(this.hide,this),this.options.timeout))}}),cdb.ui.common.Row=Backbone.Model.extend({}),cdb.ui.common.TableData=Backbone.Collection.extend({model:cdb.ui.common.Row,getCell:function(a,b){var c=this.at(a);return c?c.get(b):null}}),cdb.ui.common.TableProperties=Backbone.Model.extend({columnNames:function(){return _.map(this.get("schema"),function(a){return a[0]})},columnName:function(a){return this.columnNames()[a]}}),cdb.ui.common.RowView=cdb.core.View.extend({tagName:"tr",initialize:function(){this.model.bind("change",this.render,this),this.model.bind("destroy",this.clean,this),this.model.bind("remove",this.clean,this),this.add_related_model(this.model),this.order=this.options.order},valueView:function(a,b){return b},render:function(){var a=this,b=this.$el;b.html("");var c=this.model;b.attr("id","row_"+c.id);var d=0;if(this.options.row_header){var e=$("<td>");e.append(a.valueView("","")),e.attr("data-x",d),d++,b.append(e)}var f=this.order||_.keys(c.attributes);return _(f).each(function(e){var f=c.attributes[e];if(f!==undefined){var g=$("<td>");g.attr("id","cell_"+c.id+"_"+e),g.attr("data-x",d),d++,g.append(a.valueView(e,f)),b.append(g)}}),this},getCell:function(a){var b=a;return this.options.row_header&&++a,this.$("td:eq("+a+")")},getTableView:function(){return this.tableView}}),cdb.ui.common.Table=cdb.core.View.extend({tagName:"table",rowView:cdb.ui.common.RowView,events:{"click td":"_cellClick"},default_options:{},initialize:function(){_.defaults(this.options,this.default_options),this.dataModel=this.options.dataModel,this.rowViews=[],this.setDataSource(this.dataModel),this.model.bind("change",this.render,this),this.model.bind("change:dataSource",this.setDataSource,this),this.bind("clean",this.clear_rows,this),this.add_related_model(this.dataModel),this.add_related_model(this.model)},headerView:function(a){return a[0]},setDataSource:function(a){this.dataModel&&this.dataModel.unbind(null,null,this),this.dataModel=a,this.dataModel.bind("reset",this._renderRows,this),this.dataModel.bind("add",this.addRow,this)},_renderHeader:function(){var a=this,b=$("<thead>"),c=$("<tr>");return this.options.row_header&&c.append($("<th>").append(a.headerView(["","header"]))),_(this.model.get("schema")).each(function(b){c.append($("<th>").append(a.headerView(b)))}),b.append(c),b},clear_rows:function(){while(this.rowViews.length)this.rowViews[0].clean();this.rowViews=[]},addRow:function(a,b,c){var d=this,e=new d.rowView({model:a,order:this.model.columnNames(),row_header:this.options.row_header});e.tableView=this,e.bind("clean",function(){var a=_.indexOf(d.rowViews,this);d.rowViews.splice(a,1);for(var b=a;b<d.rowViews.length;++b)d.rowViews[b].$el.attr("data-y",b)}),e.render();if(c&&c.index!==undefined&&c.index!=d.rowViews.length){e.$el.insertBefore(d.rowViews[c.index].$el),d.rowViews.splice(c.index,0,e);for(var f=c.index;f<d.rowViews.length;++f)d.rowViews[f].$el.attr("data-y",f)}else e.$el.attr("data-y",d.rowViews.length),d.$el.append(e.el),d.rowViews.push(e)},_renderRows:function(){var a=this;this.clear_rows(),this.dataModel.each(function(b){a.addRow(b)})},render:function(){var a=this;return a.$el.html(""),a.$el.append(a._renderHeader()),a._renderRows(),this},getCell:function(a,b){return this.options.row_header&&++b,this.rowViews[b].getCell(a)},_cellClick:function(a){a.preventDefault();var b=$(a.currentTarget||a.target),c=parseInt(b.attr("data-x"),10),d=parseInt(b.parent().attr("data-y"),10);this.trigger("cellClick",a,b,c,d)}});var Overlay={_types:{},register:function(a,b){Overlay._types[a]=b},create:function(a,b,c){var d=Overlay._types[a];d||cdb.log.error("Overlay: "+a+" does not exist");var e=d(c,b);return e}};cdb.vis.Overlay=Overlay;var Layers={_types:{},register:function(a,b){this._types[a]=b},create:function(a,b,c){if(!a)return cdb.log.error("creating a layer without type"),null;var d=this._types[a.toLowerCase()];return new d(b,c)}};cdb.vis.Layers=Layers;var Vis=cdb.core.View.extend({initialize:function(){},load:function(a){a.maxZoom||(a.maxZoom=20),a.minZoom||(a.minZoom=0),a.bounding_box_sw||(a.bounding_box_sw=[0,0]),a.bounding_box_ne||(a.bounding_box_ne=[0,0]);var b=new cdb.geo.Map({title:a.title,description:a.description,maxZoom:a.maxZoom,minZoom:a.minZoom,bounding_box_sw:a.bounding_box_sw,bounding_box_ne:a.bounding_box_ne}),c=$("<div>").css({width:"100%",height:"100%"});this.$el.append(c);var d=new cdb.geo.LeafletMapView({el:c,map:b});this.map=b,this.mapView=d;for(var e in a.overlays){var f=a.overlays[e];f.map=b;var g=Overlay.create(f.type,this,f);this.addView(g),this.mapView.$el.append(g.el)}for(var e in a.layers){var h=a.layers[e],i=b.addLayer(Layers.create(h.type,this,h));if(h.type.toLowerCase()=="cartodb"&&h.infowindow){var j=Overlay.create("infowindow",this,h.infowindow,!0);d.addInfowindow(j);var k=d.getLayerByCid(i);k.cid=i,k.bind("featureClick",function(a,c,d,e){var f=b.layers.getByCid(this.cid);if(f.get("active")){var g=[],h=f.get("infowindow").fields;for(var i=0;i<h.length;++i){var k=h[i];g.push({title:k.title?k.name:null,value:e[k.name]})}j.model.set({content:{fields:g}}),j.setLatLng(c).showInfowindow()}})}}a.bounds?d.showBounds(a.bounds):(b.setCenter(a.center||[0,0]),b.setZoom(a.zoom||4))}});cdb.vis.Vis=Vis,cdb.vis.Overlay.register("zoom",function(a){var b=new cdb.geo.ui.Zoom({model:a.map,template:cdb.core.Template.compile(a.template)});return b.render()}),cdb.vis.Overlay.register("header",function(a){var b=cdb.core.Template.compile(a.template||"{{#title}}<h1>{{title}}</h1>{{/title}} {{#description}}<p>{{description}}</p>{{/description}}","mustache"),c=new cdb.geo.ui.Header({title:a.map.get("title"),description:a.map.get("description"),template:b});return c.render()}),cdb.vis.Overlay.register("infowindow",function(a,b){var c=new cdb.geo.ui.InfowindowModel({fields:a.fields}),d=new cdb.geo.ui.Infowindow({model:c,mapView:b.mapView,template:(new cdb.core.Template({template:a.template,type:"mustache"})).asFunction()});return d}),Layers.register("tilejson",function(a,b){return new cdb.geo.TileLayer({urlTemplate:b.tiles[0]})}),Layers.register("cartodb",function(a,b){if(b.infowindow&&b.infowindow.fields){var c=[],d=b.infowindow.fields;for(var e=0;e<d.length;++e)c.push(d[e].name);b.interactivity?b.interactivity=b.interactivity+","+c.join(","):b.interactivity=c.join(",")}return new cdb.geo.CartoDBLayer(b)})