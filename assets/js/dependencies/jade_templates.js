(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};


    // mixins.jade compiled template
    templatizer["mixins"] = function tmpl_mixins(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(JSON, data, name, post, sails, user) {}).call(this, "JSON" in locals_for_with ? locals_for_with.JSON : typeof JSON !== "undefined" ? JSON : undefined, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "post" in locals_for_with ? locals_for_with.post : typeof post !== "undefined" ? post : undefined, "sails" in locals_for_with ? locals_for_with.sails : typeof sails !== "undefined" ? sails : undefined, "user" in locals_for_with ? locals_for_with.user : typeof user !== "undefined" ? user : undefined);
        return buf.join("");
    };

    // mixins.jade:PasteInlineData compiled template
    templatizer["mixins"]["PasteInlineData"] = function tmpl_mixins_PasteInlineData(args) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        name = args[0];
        data = args[1];
        if (typeof name !== "undefined" && typeof data !== "undefined") {
            buf.push('<script>window["' + jade.escape((jade_interp = name) == null ? "" : jade_interp) + '"] = ' + ((jade_interp = JSON.stringify(data).replace(/<\//g, "<\\/")) == null ? "" : jade_interp) + ";\n</script>");
        }
        return buf.join("");
    };


    // mixins.jade:renderPost compiled template
    templatizer["mixins"]["renderPost"] = function tmpl_mixins_renderPost(item) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="panel panel-default my-panel"><div class="panel-body"><h3 class="text-center"><a' + jade.attr("href", "/post/watch/" + item.id + "", true, false) + ">" + jade.escape((jade_interp = item.title) == null ? "" : jade_interp) + '</a></h3><article class="fr-view">' + ((jade_interp = item.description) == null ? "" : jade_interp) + '</article><small class="created"><span><i class="fa fa-calendar"></i>&nbsp;\n' + jade.escape((jade_interp = sails.moment(item.createdAt).format("DD-MM-YYYY")) == null ? "" : jade_interp) + '</span><span><i class="fa fa-user"></i>&nbsp;\n' + jade.escape((jade_interp = item.author.username) == null ? "" : jade_interp) + '</span><span><i class="fa fa-comments"></i>&nbsp;\n' + jade.escape((jade_interp = item.comments.length) == null ? "" : jade_interp) + '</span><span><i class="fa fa-tags"></i>&nbsp;');
        (function() {
            var $obj = item.tags;
            if ("number" == typeof $obj.length) {
                for (var index = 0, $l = $obj.length; index < $l; index++) {
                    var tag = $obj[index];
                    buf.push("<span>");
                    if (index == item.tags.length - 1) {
                        buf.push("" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + "");
                    } else {
                        buf.push("" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + ",");
                    }
                    buf.push("</span>");
                }
            } else {
                var $l = 0;
                for (var index in $obj) {
                    $l++;
                    var tag = $obj[index];
                    buf.push("<span>");
                    if (index == item.tags.length - 1) {
                        buf.push("" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + "");
                    } else {
                        buf.push("" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + ",");
                    }
                    buf.push("</span>");
                }
            }
        }).call(this);
        buf.push('</span></small></div><div class="panel-footer"><a' + jade.attr("href", "/post/watch/" + item.id + "", true, false) + ' class="btn btn-info">Learn more</a></div></div>');
        return buf.join("");
    };


    // mixins.jade:renderWriteComment compiled template
    templatizer["mixins"]["renderWriteComment"] = function tmpl_mixins_renderWriteComment() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<form><textarea rows="3" name="content" placeholder="Введите текст" class="form-control"></textarea><input type="hidden" name="com_author"' + jade.attr("value", "" + user.id + "", true, false) + ' class="com_author"/><input type="hidden" name="post_id"' + jade.attr("value", "" + post.id + "", true, false) + ' class="post_id"/><br/><button class="btn btn-info send">Отправить</button></form>');
        return buf.join("");
    };


    // mixins.jade:renderCurrentPost compiled template
    templatizer["mixins"]["renderCurrentPost"] = function tmpl_mixins_renderCurrentPost() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="panel panel-default"><div class="panel-body"><h3 class="text-center">' + jade.escape((jade_interp = arguments[0]) == null ? "" : jade_interp) + '</h3><article class="fr-view">' + jade.escape((jade_interp = arguments[1]) == null ? "" : jade_interp) + '</article></div><div class="panel-footer"><a' + jade.attr("href", "/post/watch/" + arguments[2] + "", true, false) + ' class="btn btn-info">Learn more</a></div></div>');
        return buf.join("");
    };


    // mixins.jade:renderComment compiled template
    templatizer["mixins"]["renderComment"] = function tmpl_mixins_renderComment(comments, author) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        (function() {
            var $obj = comments;
            if ("number" == typeof $obj.length) {
                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                    var item = $obj[$index];
                    buf.push("<div" + jade.attr("data-id", "" + item.id + "", true, false) + ' class="panel panel-default comment clearfix"><div class="panel-body col-md-12 row">');
                    if (item.author && item.author.image) {
                        buf.push('<div class="ava col-md-1"><img' + jade.attr("src", item.author.image ? "/uploads/tmp/profile/" + item.author.id + "/" + item.author.image : "/images/avatar.png", true, false) + ' class="img-fluid"/></div>');
                    }
                    buf.push('<div class="comment-box col-md-11"><h5>');
                    if (author) {
                        buf.push("<span>" + jade.escape((jade_interp = item.author.username) == null ? "" : jade_interp) + '</span>&nbsp;<small class="retvit fa fa-share"></small>&nbsp;<span>' + jade.escape((jade_interp = author) == null ? "" : jade_interp) + "</span>");
                    } else {
                        buf.push("<span>" + jade.escape((jade_interp = item.author.username) == null ? "" : jade_interp) + " написал:</span>");
                    }
                    buf.push("</h5><article>" + jade.escape((jade_interp = item.content) == null ? "" : jade_interp) + '</article><div class="panel-footer"><small>' + jade.escape((jade_interp = sails.moment(item.createdAt).format("DD-MM-YYYY")) == null ? "" : jade_interp) + "</small><br/>");
                    if (user.username) {
                        buf.push('<div class="comment-buttons"><button' + jade.attr("data-id", "" + item.id + "", true, false) + ' data-toggle="collapse"' + jade.attr("data-target", "#comment" + item.id + "", true, false) + ' aria-expanded="false" class="btn btn-default label label-info answer_comment">ответить</button>');
                        if (user.admin) {
                            buf.push("<button" + jade.attr("data-id", "" + item.id + "", true, false) + ' class="btn btn-default label label-danger remove_comment">удалить</button>');
                        }
                        buf.push("<div" + jade.attr("id", "comment" + item.id + "", true, false) + ' class="collapse answer-wrapper">');
                        buf.push(templatizer["mixins"]["renderWriteComment"](item.comment));
                        buf.push("</div></div>");
                    }
                    buf.push("</div></div></div>");
                    if (item.childs) {
                        buf.push(templatizer["mixins"]["renderComment"](item.childs, item.author.username));
                    }
                    buf.push("</div>");
                }
            } else {
                var $l = 0;
                for (var $index in $obj) {
                    $l++;
                    var item = $obj[$index];
                    buf.push("<div" + jade.attr("data-id", "" + item.id + "", true, false) + ' class="panel panel-default comment clearfix"><div class="panel-body col-md-12 row">');
                    if (item.author && item.author.image) {
                        buf.push('<div class="ava col-md-1"><img' + jade.attr("src", item.author.image ? "/uploads/tmp/profile/" + item.author.id + "/" + item.author.image : "/images/avatar.png", true, false) + ' class="img-fluid"/></div>');
                    }
                    buf.push('<div class="comment-box col-md-11"><h5>');
                    if (author) {
                        buf.push("<span>" + jade.escape((jade_interp = item.author.username) == null ? "" : jade_interp) + '</span>&nbsp;<small class="retvit fa fa-share"></small>&nbsp;<span>' + jade.escape((jade_interp = author) == null ? "" : jade_interp) + "</span>");
                    } else {
                        buf.push("<span>" + jade.escape((jade_interp = item.author.username) == null ? "" : jade_interp) + " написал:</span>");
                    }
                    buf.push("</h5><article>" + jade.escape((jade_interp = item.content) == null ? "" : jade_interp) + '</article><div class="panel-footer"><small>' + jade.escape((jade_interp = sails.moment(item.createdAt).format("DD-MM-YYYY")) == null ? "" : jade_interp) + "</small><br/>");
                    if (user.username) {
                        buf.push('<div class="comment-buttons"><button' + jade.attr("data-id", "" + item.id + "", true, false) + ' data-toggle="collapse"' + jade.attr("data-target", "#comment" + item.id + "", true, false) + ' aria-expanded="false" class="btn btn-default label label-info answer_comment">ответить</button>');
                        if (user.admin) {
                            buf.push("<button" + jade.attr("data-id", "" + item.id + "", true, false) + ' class="btn btn-default label label-danger remove_comment">удалить</button>');
                        }
                        buf.push("<div" + jade.attr("id", "comment" + item.id + "", true, false) + ' class="collapse answer-wrapper">');
                        buf.push(templatizer["mixins"]["renderWriteComment"](item.comment));
                        buf.push("</div></div>");
                    }
                    buf.push("</div></div></div>");
                    if (item.childs) {
                        buf.push(templatizer["mixins"]["renderComment"](item.childs, item.author.username));
                    }
                    buf.push("</div>");
                }
            }
        }).call(this);
        return buf.join("");
    };

    return templatizer;
}));
