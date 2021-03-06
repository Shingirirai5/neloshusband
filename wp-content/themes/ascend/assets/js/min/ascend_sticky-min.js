! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    var e = Array.prototype.slice,
        i = Array.prototype.splice,
        n = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: "",
            widthFromWrapper: !0,
            responsiveWidth: !1,
            zIndex: "auto"
        },
        r = t(window),
        s = t(document),
        o = [],
        a = r.height(),
        c = function() {
            for (var e = r.scrollTop(), i, n = s.height() - a, c = e > n ? n - e : 0, p = 0, d = o.length; p < d; p++) {
                var l = o[p],
                    h, u = parseInt(Math.max(0, l.stickyWrapper.offset().top), 10) - l.topSpacing - c;
                if (u <= 0 && (u = 0), e <= u) null !== l.currentTop && (l.stickyElement.css({
                    width: "",
                    position: "",
                    top: "",
                    "z-index": ""
                }), l.stickyElement.parent().removeClass(l.className), l.stickyElement.trigger("sticky-end", [l]), l.currentTop = null);
                else {
                    var g = s.height() - l.stickyElement.outerHeight() - l.topSpacing - l.bottomSpacing - e - c,
                        m;
                    if (g < 0 ? g += l.topSpacing : g = l.topSpacing, l.currentTop !== g) l.getWidthFrom ? m = t(l.getWidthFrom).width() || null : l.widthFromWrapper && (m = l.stickyWrapper.width()), null == m && (m = l.stickyElement.width()), l.stickyElement.css("width", m).css("position", "fixed").css("top", g).css("z-index", l.zIndex), l.stickyElement.parent().addClass(l.className), null === l.currentTop ? l.stickyElement.trigger("sticky-start", [l]) : l.stickyElement.trigger("sticky-update", [l]), l.currentTop === l.topSpacing && l.currentTop > g || null === l.currentTop && g < l.topSpacing ? l.stickyElement.trigger("sticky-bottom-reached", [l]) : null !== l.currentTop && g === l.topSpacing && l.currentTop < g && l.stickyElement.trigger("sticky-bottom-unreached", [l]), l.currentTop = g;
                    var y = l.stickyWrapper.parent(),
                        f;
                    l.stickyElement.offset().top + l.stickyElement.outerHeight() >= y.offset().top + y.outerHeight() && l.stickyElement.offset().top <= l.topSpacing ? l.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0).css("z-index", "") : l.stickyElement.css("position", "fixed").css("top", g).css("bottom", "").css("z-index", l.zIndex)
                }
            }
        },
        p = function() {
            a = r.height();
            for (var e = 0, i = o.length; e < i; e++) {
                var n = o[e],
                    s = null;
                n.getWidthFrom ? n.responsiveWidth && (s = t(n.getWidthFrom).width()) : n.widthFromWrapper && (s = n.stickyWrapper.width()), null != s && n.stickyElement.css("width", s)
            }
        },
        d = {
            init: function(e) {
                return this.each(function() {
                    var i = t.extend({}, n, e),
                        r = t(this),
                        s = r.attr("id"),
                        a = s ? s + "-" + n.wrapperClassName : n.wrapperClassName,
                        c = t("<div></div>").attr("id", a).addClass(i.wrapperClassName);
                    r.wrapAll(function() {
                        if (0 == t(this).parent("#" + a).length) return c
                    });
                    var p = r.parent();
                    i.center && p.css({
                        width: r.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" === r.css("float") && r.css({
                        float: "none"
                    }).parent().css({
                        float: "right"
                    }), i.stickyElement = r, i.stickyWrapper = p, i.currentTop = null, o.push(i), d.setWrapperHeight(this), d.setupChangeListeners(this)
                })
            },
            setWrapperHeight: function(e) {
                var i = t(e),
                    n = i.parent();
                n && n.css("height", i.outerHeight())
            },
            setupChangeListeners: function(e) {
                if (window.MutationObserver) {
                    var i = new window.MutationObserver(function(t) {
                        (t[0].addedNodes.length || t[0].removedNodes.length) && d.setWrapperHeight(e)
                    });
                    i.observe(e, {
                        subtree: !0,
                        childList: !0
                    }), t(e).data("sticky.mutationObserver", i)
                } else window.addEventListener ? (e.addEventListener("DOMNodeInserted", function() {
                    d.setWrapperHeight(e)
                }, !1), e.addEventListener("DOMNodeRemoved", function() {
                    d.setWrapperHeight(e)
                }, !1)) : window.attachEvent && (e.attachEvent("onDOMNodeInserted", function() {
                    d.setWrapperHeight(e)
                }), e.attachEvent("onDOMNodeRemoved", function() {
                    d.setWrapperHeight(e)
                }))
            },
            update: c,
            unstick: function(e) {
                return this.each(function() {
                    for (var e = this, n = t(this), r = -1, s = o.length, a; s-- > 0;) o[s].stickyElement.get(0) === this && (i.call(o, s, 1), r = s); - 1 !== r && (t(n).data("sticky.mutationObserver").disconnect(), n.unwrap(), n.css({
                        width: "",
                        position: "",
                        top: "",
                        float: "",
                        "z-index": ""
                    }))
                })
            }
        };
    window.addEventListener ? (window.addEventListener("scroll", c, !1), window.addEventListener("resize", p, !1)) : window.attachEvent && (window.attachEvent("onscroll", c), window.attachEvent("onresize", p)), t.fn.ktsticky = function(i) {
        return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.init.apply(this, arguments)
    }, t.fn.unstick = function(i) {
        return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.unstick.apply(this, arguments)
    }, t(function() {
        setTimeout(c, 0)
    })
});