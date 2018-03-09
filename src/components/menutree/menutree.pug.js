function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function menutreeTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug":"\u002F\u002F- Declaration\n\nmixin list(data)\n\tul(class= blockName + '__section')\n\t\teach obj in data\n\t\t\t+item(obj)\n\t\tli(class= blockName + '__placeholder') Ваш список пуст\n\nmixin item(obj)\n\tif obj.name\n\t\tli(class= blockName + '__item' data-idx=obj.address.join('.') )\n\t\t\tspan(class= blockName + '__item_del') &times;\n\t\t\tif obj.url\n\t\t\t\t+link(obj)\n\t\t\telse\n\t\t\t\t+title(obj)\n\t\t\tif obj.children\n\t\t\t\t\t+list(obj.children)\n\nmixin link(obj)\n\ta(href= obj.url class= blockName + '__link' target='_blank')= obj.name\n\nmixin title(obj)\n\n\tspan(class= blockName + '__item_add') &plus;\n\tspan(\n\t\tclass= blockName + '__title')(\n\t\tclass= (obj.children && obj.children.length && obj.state == 'open') ? blockName + '__section_title_open' : '' )(\n\t\tclass= (obj.children && obj.children.length) ? blockName + '__section_title' : '' )\n\t\t\t= obj.name\n\n\u002F\u002F- Use\n\n+list(data)\n"};
;var locals_for_with = (locals || {});(function (blockName, data) {var pug_indent = [];
;pug_debug_line = 3;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_mixins["list"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 4;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug_attr("class", pug_classes([blockName + '__section'], [true]), false, false)) + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var obj = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('  ');
pug_mixins["item"](obj);
pug_indent.pop();
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var obj = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('  ');
pug_mixins["item"](obj);
pug_indent.pop();
    }
  }
}).call(this);

;pug_debug_line = 7;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug_attr("class", pug_classes([blockName + '__placeholder'], [true]), false, false)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "Ваш список пуст\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
;pug_debug_line = 9;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_mixins["item"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 10;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
if (obj.name) {
;pug_debug_line = 11;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug_attr("class", pug_classes([blockName + '__item'], [true]), false, false)+pug_attr("data-idx", obj.address.join('.'), true, false)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes([blockName + '__item_del'], [true]), false, false)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "&times;\u003C\u002Fspan\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
if (obj.url) {
;pug_debug_line = 14;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('  ');
pug_mixins["link"](obj);
pug_indent.pop();
}
else {
;pug_debug_line = 16;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('  ');
pug_mixins["title"](obj);
pug_indent.pop();
}
;pug_debug_line = 17;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
if (obj.children) {
;pug_debug_line = 18;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('  ');
pug_mixins["list"](obj.children);
pug_indent.pop();
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
}
};
;pug_debug_line = 20;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_mixins["link"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 21;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([blockName + '__link'], [true]), false, false)+pug_attr("href", obj.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = obj.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
};
;pug_debug_line = 23;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_mixins["title"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 25;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes([blockName + '__item_add'], [true]), false, false)) + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "&plus;\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes([blockName + '__title',(obj.children && obj.children.length && obj.state == 'open') ? blockName + '__section_title_open' : '',(obj.children && obj.children.length) ? blockName + '__section_title' : ''], [true,true,true]), false, false)) + "\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = obj.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
;pug_debug_line = 34;pug_debug_filename = "src\u002Fcomponents\u002Fmenutree\u002Fmenutree.pug";
pug_indent.push('');
pug_mixins["list"](data);
pug_indent.pop();}.call(this,"blockName" in locals_for_with?locals_for_with.blockName:typeof blockName!=="undefined"?blockName:undefined,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}