! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
}(function(e) {
    var t = "Close",
        i = "BeforeClose",
        n = "AfterClose",
        o = "BeforeAppend",
        r = "MarkupParse",
        a = "Open",
        s = "Change",
        c = "mfp",
        l = "." + c,
        u = "mfp-ready",
        p = "mfp-removing",
        d = "mfp-prevent-close",
        f, h = function() {},
        m = !!window.jQuery,
        g, v = e(window),
        y, w, b, C, I = function(e, t) {
            f.ev.on(c + e + l, t)
        },
        k = function(t, i, n, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, n && (r.innerHTML = n), o ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
        },
        x = function(t, i) {
            f.ev.triggerHandler(c + t, i), f.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), f.st.callbacks[t] && f.st.callbacks[t].apply(f, e.isArray(i) ? i : [i]))
        },
        T = function(t) {
            return t === C && f.currTemplate.closeBtn || (f.currTemplate.closeBtn = e(f.st.closeMarkup.replace("%title%", f.st.tClose)), C = t), f.currTemplate.closeBtn
        },
        S = function() {
            e.magnificPopup.instance || ((f = new h).init(), e.magnificPopup.instance = f)
        },
        _ = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    h.prototype = {
        constructor: h,
        init: function() {
            var t = navigator.appVersion;
            f.isLowIE = f.isIE8 = document.all && !document.addEventListener, f.isAndroid = /android/gi.test(t), f.isIOS = /iphone|ipad|ipod/gi.test(t), f.supportsTransition = _(), f.probablyMobile = f.isAndroid || f.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), y = e(document), f.popupsCache = {}
        },
        open: function(t) {
            var i;
            if (!1 === t.isObj) {
                f.items = t.items.toArray(), f.index = 0;
                var n = t.items,
                    o;
                for (i = 0; i < n.length; i++)
                    if ((o = n[i]).parsed && (o = o.el[0]), o === t.el[0]) {
                        f.index = i;
                        break
                    }
            } else f.items = e.isArray(t.items) ? t.items : [t.items], f.index = t.index || 0;
            if (!f.isOpen) {
                f.types = [], b = "", t.mainEl && t.mainEl.length ? f.ev = t.mainEl.eq(0) : f.ev = y, t.key ? (f.popupsCache[t.key] || (f.popupsCache[t.key] = {}), f.currTemplate = f.popupsCache[t.key]) : f.currTemplate = {}, f.st = e.extend(!0, {}, e.magnificPopup.defaults, t), f.fixedContentPos = "auto" === f.st.fixedContentPos ? !f.probablyMobile : f.st.fixedContentPos, f.st.modal && (f.st.closeOnContentClick = !1, f.st.closeOnBgClick = !1, f.st.showCloseBtn = !1, f.st.enableEscapeKey = !1), f.bgOverlay || (f.bgOverlay = k("bg").on("click" + l, function() {
                    f.close()
                }), f.wrap = k("wrap").attr("tabindex", -1).on("click" + l, function(e) {
                    f._checkIfClose(e.target) && f.close()
                }), f.container = k("container", f.wrap)), f.contentContainer = k("content"), f.st.preloader && (f.preloader = k("preloader", f.container, f.st.tLoading));
                var s = e.magnificPopup.modules;
                for (i = 0; i < s.length; i++) {
                    var c = s[i];
                    c = c.charAt(0).toUpperCase() + c.slice(1), f["init" + c].call(f)
                }
                x("BeforeOpen"), f.st.showCloseBtn && (f.st.closeBtnInside ? (I(r, function(e, t, i, n) {
                    i.close_replaceWith = T(n.type)
                }), b += " mfp-close-btn-in") : f.wrap.append(T())), f.st.alignTop && (b += " mfp-align-top"), f.fixedContentPos ? f.wrap.css({
                    overflow: f.st.overflowY,
                    overflowX: "hidden",
                    overflowY: f.st.overflowY
                }) : f.wrap.css({
                    top: v.scrollTop(),
                    position: "absolute"
                }), (!1 === f.st.fixedBgPos || "auto" === f.st.fixedBgPos && !f.fixedContentPos) && f.bgOverlay.css({
                    height: y.height(),
                    position: "absolute"
                }), f.st.enableEscapeKey && y.on("keyup" + l, function(e) {
                    27 === e.keyCode && f.close()
                }), v.on("resize" + l, function() {
                    f.updateSize()
                }), f.st.closeOnContentClick || (b += " mfp-auto-cursor"), b && f.wrap.addClass(b);
                var p = f.wH = v.height(),
                    d = {};
                if (f.fixedContentPos && f._hasScrollBar(p)) {
                    var h = f._getScrollbarSize();
                    h && (d.marginRight = h)
                }
                f.fixedContentPos && (f.isIE7 ? e("body, html").css("overflow", "hidden") : d.overflow = "hidden");
                var m = f.st.mainClass;
                return f.isIE7 && (m += " mfp-ie7"), m && f._addClassToMFP(m), f.updateItemHTML(), x("BuildControls"), e("html").css(d), f.bgOverlay.add(f.wrap).prependTo(f.st.prependTo || e(document.body)), f._lastFocusedEl = document.activeElement, setTimeout(function() {
                    f.content ? (f._addClassToMFP(u), f._setFocus()) : f.bgOverlay.addClass(u), y.on("focusin" + l, f._onFocusIn)
                }, 16), f.isOpen = !0, f.updateSize(p), x(a), t
            }
            f.updateItemHTML()
        },
        close: function() {
            f.isOpen && (x(i), f.isOpen = !1, f.st.removalDelay && !f.isLowIE && f.supportsTransition ? (f._addClassToMFP(p), setTimeout(function() {
                f._close()
            }, f.st.removalDelay)) : f._close())
        },
        _close: function() {
            x(t);
            var i = p + " " + u + " ";
            if (f.bgOverlay.detach(), f.wrap.detach(), f.container.empty(), f.st.mainClass && (i += f.st.mainClass + " "), f._removeClassFromMFP(i), f.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                f.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            y.off("keyup.mfp focusin" + l), f.ev.off(l), f.wrap.attr("class", "mfp-wrap").removeAttr("style"), f.bgOverlay.attr("class", "mfp-bg"), f.container.attr("class", "mfp-container"), f.st.showCloseBtn && (!f.st.closeBtnInside || !0 === f.currTemplate[f.currItem.type]) && f.currTemplate.closeBtn && f.currTemplate.closeBtn.detach(), f.st.autoFocusLast && f._lastFocusedEl && e(f._lastFocusedEl).focus(), f.currItem = null, f.content = null, f.currTemplate = null, f.prevHeight = 0, x(n)
        },
        updateSize: function(e) {
            if (f.isIOS) {
                var t = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * t;
                f.wrap.css("height", i), f.wH = i
            } else f.wH = e || v.height();
            f.fixedContentPos || f.wrap.css("height", f.wH), x("Resize")
        },
        updateItemHTML: function() {
            var t = f.items[f.index];
            f.contentContainer.detach(), f.content && f.content.detach(), t.parsed || (t = f.parseEl(f.index));
            var i = t.type;
            if (x("BeforeChange", [f.currItem ? f.currItem.type : "", i]), f.currItem = t, !f.currTemplate[i]) {
                var n = !!f.st[i] && f.st[i].markup;
                x("FirstMarkupParse", n), f.currTemplate[i] = !n || e(n)
            }
            w && w !== t.type && f.container.removeClass("mfp-" + w + "-holder");
            var o = f["get" + i.charAt(0).toUpperCase() + i.slice(1)](t, f.currTemplate[i]);
            f.appendContent(o, i), t.preloaded = !0, x(s, t), w = t.type, f.container.prepend(f.contentContainer), x("AfterChange")
        },
        appendContent: function(e, t) {
            f.content = e, e ? f.st.showCloseBtn && f.st.closeBtnInside && !0 === f.currTemplate[t] ? f.content.find(".mfp-close").length || f.content.append(T()) : f.content = e : f.content = "", x(o), f.container.addClass("mfp-" + t + "-holder"), f.contentContainer.append(f.content)
        },
        parseEl: function(t) {
            var i = f.items[t],
                n;
            if (i.tagName ? i = {
                    el: e(i)
                } : (n = i.type, i = {
                    data: i,
                    src: i.src
                }), i.el) {
                for (var o = f.types, r = 0; r < o.length; r++)
                    if (i.el.hasClass("mfp-" + o[r])) {
                        n = o[r];
                        break
                    }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = n || f.st.type || "inline", i.index = t, i.parsed = !0, f.items[t] = i, x("ElementParse", i), f.items[t]
        },
        addGroup: function(e, t) {
            var i = function(i) {
                i.mfpEl = this, f._openClick(i, e, t)
            };
            t || (t = {});
            var n = "click.magnificPopup";
            t.mainEl = e, t.items ? (t.isObj = !0, e.off(n).on(n, i)) : (t.isObj = !1, t.delegate ? e.off(n).on(n, t.delegate, i) : (t.items = e, e.off(n).on(n, i)))
        },
        _openClick: function(t, i, n) {
            var o;
            if ((void 0 !== n.midClick ? n.midClick : e.magnificPopup.defaults.midClick) || !(2 === t.which || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey)) {
                var r = void 0 !== n.disableOn ? n.disableOn : e.magnificPopup.defaults.disableOn;
                if (r)
                    if (e.isFunction(r)) {
                        if (!r.call(f)) return !0
                    } else if (v.width() < r) return !0;
                t.type && (t.preventDefault(), f.isOpen && t.stopPropagation()), n.el = e(t.mfpEl), n.delegate && (n.items = i.find(n.delegate)), f.open(n)
            }
        },
        updateStatus: function(e, t) {
            if (f.preloader) {
                g !== e && f.container.removeClass("mfp-s-" + g), !t && "loading" === e && (t = f.st.tLoading);
                var i = {
                    status: e,
                    text: t
                };
                x("UpdateStatus", i), e = i.status, t = i.text, f.preloader.html(t), f.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), f.container.addClass("mfp-s-" + e), g = e
            }
        },
        _checkIfClose: function(t) {
            if (!e(t).hasClass(d)) {
                var i = f.st.closeOnContentClick,
                    n = f.st.closeOnBgClick;
                if (i && n) return !0;
                if (!f.content || e(t).hasClass("mfp-close") || f.preloader && t === f.preloader[0]) return !0;
                if (t === f.content[0] || e.contains(f.content[0], t)) {
                    if (i) return !0
                } else if (n && e.contains(document, t)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            f.bgOverlay.addClass(e), f.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), f.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (f.isIE7 ? y.height() : document.body.scrollHeight) > (e || v.height())
        },
        _setFocus: function() {
            (f.st.focus ? f.content.find(f.st.focus).eq(0) : f.wrap).focus()
        },
        _onFocusIn: function(t) {
            if (t.target !== f.wrap[0] && !e.contains(f.wrap[0], t.target)) return f._setFocus(), !1
        },
        _parseMarkup: function(t, i, n) {
            var o;
            n.data && (i = e.extend(n.data, i)), x(r, [t, i, n]), e.each(i, function(i, n) {
                if (void 0 === n || !1 === n) return !0;
                if ((o = i.split("_")).length > 1) {
                    var r = t.find(l + "-" + o[0]);
                    if (r.length > 0) {
                        var a = o[1];
                        "replaceWith" === a ? r[0] !== n[0] && r.replaceWith(n) : "img" === a ? r.is("img") ? r.attr("src", n) : r.replaceWith(e("<img>").attr("src", n).attr("class", r.attr("class"))) : r.attr(o[1], n)
                    }
                } else t.find(l + "-" + i).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === f.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), f.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return f.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: h.prototype,
        modules: [],
        open: function(t, i) {
            return S(), (t = t ? e.extend(!0, {}, t) : {}).isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(t, i) {
        S();
        var n = e(this);
        if ("string" == typeof t)
            if ("open" === t) {
                var o, r = m ? n.data("magnificPopup") : n[0].magnificPopup,
                    a = parseInt(i, 10) || 0;
                r.items ? o = r.items[a] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), f._openClick({
                    mfpEl: o
                }, n, r)
            } else f.isOpen && f[t].apply(f, Array.prototype.slice.call(arguments, 1));
        else t = e.extend(!0, {}, t), m ? n.data("magnificPopup", t) : n[0].magnificPopup = t, f.addGroup(n, t);
        return n
    };
    var P = "inline",
        E, z, O, A = function() {
            O && (z.after(O.addClass(E)).detach(), O = null)
        };
    e.magnificPopup.registerModule(P, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                f.types.push(P), I(t + "." + P, function() {
                    A()
                })
            },
            getInline: function(t, i) {
                if (A(), t.src) {
                    var n = f.st.inline,
                        o = e(t.src);
                    if (o.length) {
                        var r = o[0].parentNode;
                        r && r.tagName && (z || (E = n.hiddenClass, z = k(E), E = "mfp-" + E), O = o.after(z).detach().removeClass(E)), f.updateStatus("ready")
                    } else f.updateStatus("error", n.tNotFound), o = e("<div>");
                    return t.inlineElement = o, o
                }
                return f.updateStatus("ready"), f._parseMarkup(i, {}, t), i
            }
        }
    });
    var M = "ajax",
        F, j = function() {
            F && e(document.body).removeClass(F)
        },
        H = function() {
            j(), f.req && f.req.abort()
        };
    e.magnificPopup.registerModule(M, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                f.types.push(M), F = f.st.ajax.cursor, I(t + "." + M, H), I("BeforeChange." + M, H)
            },
            getAjax: function(t) {
                F && e(document.body).addClass(F), f.updateStatus("loading");
                var i = e.extend({
                    url: t.src,
                    success: function(i, n, o) {
                        var r = {
                            data: i,
                            xhr: o
                        };
                        x("ParseAjax", r), f.appendContent(e(r.data), M), t.finished = !0, j(), f._setFocus(), setTimeout(function() {
                            f.wrap.addClass(u)
                        }, 16), f.updateStatus("ready"), x("AjaxContentAdded")
                    },
                    error: function() {
                        j(), t.finished = t.loadError = !0, f.updateStatus("error", f.st.ajax.tError.replace("%url%", t.src))
                    }
                }, f.st.ajax.settings);
                return f.req = e.ajax(i), ""
            }
        }
    });
    var N, B = function(t) {
        if (t.data && void 0 !== t.data.title) return t.data.title;
        var i = f.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(f, t);
            if (t.el) return t.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = f.st.image,
                    n = ".image";
                f.types.push("image"), I(a + n, function() {
                    "image" === f.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), I(t + n, function() {
                    i.cursor && e(document.body).removeClass(i.cursor), v.off("resize" + l)
                }), I("Resize" + n, f.resizeImage), f.isLowIE && I("AfterChange", f.resizeImage)
            },
            resizeImage: function() {
                var e = f.currItem;
                if (e && e.img && f.st.image.verticalFit) {
                    var t = 0;
                    f.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", f.wH - t)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, N && clearInterval(N), e.isCheckingImgSize = !1, x("ImageHasSize", e), e.imgHidden && (f.content && f.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var t = 0,
                    i = e.img[0],
                    n = function(o) {
                        N && clearInterval(N), N = setInterval(function() {
                            i.naturalWidth > 0 ? f._onImageHasSize(e) : (t > 200 && clearInterval(N), 3 === ++t ? n(10) : 40 === t ? n(50) : 100 === t && n(500))
                        }, o)
                    };
                n(1)
            },
            getImage: function(t, i) {
                var n = 0,
                    o = function() {
                        t && (t.img[0].complete ? (t.img.off(".mfploader"), t === f.currItem && (f._onImageHasSize(t), f.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, x("ImageLoadComplete")) : ++n < 200 ? setTimeout(o, 100) : r())
                    },
                    r = function() {
                        t && (t.img.off(".mfploader"), t === f.currItem && (f._onImageHasSize(t), f.updateStatus("error", a.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0)
                    },
                    a = f.st.image,
                    s = i.find(".mfp-img");
                if (s.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", t.el && t.el.find("img").length && (c.alt = t.el.find("img").attr("alt")), t.img = e(c).on("load.mfploader", o).on("error.mfploader", r), c.src = t.src, s.is("img") && (t.img = t.img.clone()), (c = t.img[0]).naturalWidth > 0 ? t.hasSize = !0 : c.width || (t.hasSize = !1)
                }
                return f._parseMarkup(i, {
                    title: B(t),
                    img_replaceWith: t.img
                }, t), f.resizeImage(), t.hasSize ? (N && clearInterval(N), t.loadError ? (i.addClass("mfp-loading"), f.updateStatus("error", a.tError.replace("%url%", t.src))) : (i.removeClass("mfp-loading"), f.updateStatus("ready")), i) : (f.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, i.addClass("mfp-loading"), f.findImageSize(t)), i)
            }
        }
    });
    var L, W = function() {
        return void 0 === L && (L = void 0 !== document.createElement("p").style.MozTransform), L
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e = f.st.zoom,
                    n = ".zoom",
                    o;
                if (e.enabled && f.supportsTransition) {
                    var r = e.duration,
                        a = function(t) {
                            var i = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + e.duration / 1e3 + "s " + e.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n, i.css(o), i
                        },
                        s = function() {
                            f.content.css("visibility", "visible")
                        },
                        c, l;
                    I("BuildControls" + n, function() {
                        if (f._allowZoom()) {
                            if (clearTimeout(c), f.content.css("visibility", "hidden"), !(o = f._getItemToZoom())) return void s();
                            (l = a(o)).css(f._getOffset()), f.wrap.append(l), c = setTimeout(function() {
                                l.css(f._getOffset(!0)), c = setTimeout(function() {
                                    s(), setTimeout(function() {
                                        l.remove(), o = l = null, x("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), I(i + n, function() {
                        if (f._allowZoom()) {
                            if (clearTimeout(c), f.st.removalDelay = r, !o) {
                                if (!(o = f._getItemToZoom())) return;
                                l = a(o)
                            }
                            l.css(f._getOffset(!0)), f.wrap.append(l), f.content.css("visibility", "hidden"), setTimeout(function() {
                                l.css(f._getOffset())
                            }, 16)
                        }
                    }), I(t + n, function() {
                        f._allowZoom() && (s(), l && l.remove(), o = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === f.currItem.type
            },
            _getItemToZoom: function() {
                return !!f.currItem.hasSize && f.currItem.img
            },
            _getOffset: function(t) {
                var i, n = (i = t ? f.currItem.img : f.st.zoom.opener(f.currItem.el || f.currItem)).offset(),
                    o = parseInt(i.css("padding-top"), 10),
                    r = parseInt(i.css("padding-bottom"), 10);
                n.top -= e(window).scrollTop() - o;
                var a = {
                    width: i.width(),
                    height: (m ? i.innerHeight() : i[0].offsetHeight) - r - o
                };
                return W() ? a["-moz-transform"] = a.transform = "translate(" + n.left + "px," + n.top + "px)" : (a.left = n.left, a.top = n.top), a
            }
        }
    });
    var q = "iframe",
        D = "//about:blank",
        U = function(e) {
            if (f.currTemplate[q]) {
                var t = f.currTemplate[q].find("iframe");
                t.length && (e || (t[0].src = D), f.isIE8 && t.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(q, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                f.types.push(q), I("BeforeChange", function(e, t, i) {
                    t !== i && (t === q ? U() : i === q && U(!0))
                }), I(t + "." + q, function() {
                    U()
                })
            },
            getIframe: function(t, i) {
                var n = t.src,
                    o = f.st.iframe;
                e.each(o.patterns, function() {
                    if (n.indexOf(this.index) > -1) return this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1
                });
                var r = {};
                return o.srcAction && (r[o.srcAction] = n), f._parseMarkup(i, r, t), f.updateStatus("ready"), i
            }
        }
    });
    var R = function(e) {
            var t = f.items.length;
            return e > t - 1 ? e - t : e < 0 ? t + e : e
        },
        Q = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = f.st.gallery,
                    n = ".mfp-gallery";
                if (f.direction = !0, !i || !i.enabled) return !1;
                b += " mfp-gallery", I(a + n, function() {
                    i.navigateByImgClick && f.wrap.on("click" + n, ".mfp-img", function() {
                        if (f.items.length > 1) return f.next(), !1
                    }), y.on("keydown" + n, function(e) {
                        37 === e.keyCode ? f.prev() : 39 === e.keyCode && f.next()
                    })
                }), I("UpdateStatus" + n, function(e, t) {
                    t.text && (t.text = Q(t.text, f.currItem.index, f.items.length))
                }), I(r + n, function(e, t, n, o) {
                    var r = f.items.length;
                    n.counter = r > 1 ? Q(i.tCounter, o.index, r) : ""
                }), I("BuildControls" + n, function() {
                    if (f.items.length > 1 && i.arrows && !f.arrowLeft) {
                        var t = i.arrowMarkup,
                            n = f.arrowLeft = e(t.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(d),
                            o = f.arrowRight = e(t.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(d);
                        n.click(function() {
                            f.prev()
                        }), o.click(function() {
                            f.next()
                        }), f.container.append(n.add(o))
                    }
                }), I(s + n, function() {
                    f._preloadTimeout && clearTimeout(f._preloadTimeout), f._preloadTimeout = setTimeout(function() {
                        f.preloadNearbyImages(), f._preloadTimeout = null
                    }, 16)
                }), I(t + n, function() {
                    y.off(n), f.wrap.off("click" + n), f.arrowRight = f.arrowLeft = null
                })
            },
            next: function() {
                f.direction = !0, f.index = R(f.index + 1), f.updateItemHTML()
            },
            prev: function() {
                f.direction = !1, f.index = R(f.index - 1), f.updateItemHTML()
            },
            goTo: function(e) {
                f.direction = e >= f.index, f.index = e, f.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e = f.st.gallery.preload,
                    t = Math.min(e[0], f.items.length),
                    i = Math.min(e[1], f.items.length),
                    n;
                for (n = 1; n <= (f.direction ? i : t); n++) f._preloadItem(f.index + n);
                for (n = 1; n <= (f.direction ? t : i); n++) f._preloadItem(f.index - n)
            },
            _preloadItem: function(t) {
                if (t = R(t), !f.items[t].preloaded) {
                    var i = f.items[t];
                    i.parsed || (i = f.parseEl(t)), x("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, x("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var Y = "retina";
    e.magnificPopup.registerModule(Y, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = f.st.retina,
                        t = e.ratio;
                    (t = isNaN(t) ? t() : t) > 1 && (I("ImageHasSize." + Y, function(e, i) {
                        i.img.css({
                            "max-width": i.img[0].naturalWidth / t,
                            width: "100%"
                        })
                    }), I("ElementParse." + Y, function(i, n) {
                        n.src = e.replaceSrc(n, t)
                    }))
                }
            }
        }
    }), S()
}),
function(e, t) {
    "use strict";
    var i = function() {
        var t = "sf-breadcrumb",
            i = "sf-js-enabled",
            n = "sf-with-ul",
            o = "sf-arrows",
            r = function() {
                var t = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
                return t && e("html").css("cursor", "pointer").on("click", e.noop), t
            }(),
            a = function() {
                var e = document.documentElement.style;
                return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
            }(),
            s = function(e, t, n) {
                var r = i,
                    a;
                t.cssArrows && (r += " " + o), e[a = n ? "addClass" : "removeClass"](r)
            },
            c = function(i, n) {
                return i.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + t).filter(function() {
                    return e(this).children(n.popUpSelector).hide().show().length
                }).removeClass(n.pathClass)
            },
            l = function(e, t) {
                var i = t ? "addClass" : "removeClass";
                e.children("a")[i](n)
            },
            u = function(e) {
                var t = e.css("ms-touch-action"),
                    i = e.css("touch-action");
                i = "pan-y" === (i = i || t) ? "auto" : "pan-y", e.css({
                    "ms-touch-action": i,
                    "touch-action": i
                })
            },
            p = function(e) {
                return e.closest("." + i)
            },
            d = function(e) {
                return p(e).data("sfOptions")
            },
            f = function() {
                var t = e(this),
                    i = d(t);
                clearTimeout(i.sfTimer), t.siblings().ktsuperfish("hide").end().ktsuperfish("show")
            },
            h = function(t) {
                t.retainPath = e.inArray(this[0], t.$path) > -1, this.ktsuperfish("hide"), this.parents("." + t.hoverClass).length || (t.onIdle.call(p(this)), t.$path.length && e.proxy(f, t.$path)())
            },
            m = function() {
                var t = e(this),
                    i = d(t);
                r ? e.proxy(h, t, i)() : (clearTimeout(i.sfTimer), i.sfTimer = setTimeout(e.proxy(h, t, i), i.delay))
            },
            g = function(t) {
                var i = e(this),
                    n = d(i),
                    o = i.siblings(t.data.popUpSelector);
                return !1 === n.onHandleTouch.call(o) ? this : void(o.length > 0 && o.is(":hidden") && (i.one("click.ktsuperfish", !1), "MSPointerDown" === t.type || "pointerdown" === t.type ? i.trigger("focus") : e.proxy(f, i.parent("li"))()))
            },
            v = function(t, i) {
                var n = "li:has(" + i.popUpSelector + ")";
                e.fn.hoverIntent && !i.disableHI ? t.hoverIntent(f, m, n) : t.on("mouseenter.ktsuperfish", n, f).on("mouseleave.ktsuperfish", n, m);
                var o = "MSPointerDown.ktsuperfish";
                r || (o += " touchend.ktsuperfish"), a && (o += " mousedown.ktsuperfish"), t.on("focusin.ktsuperfish", "li", f).on("focusout.ktsuperfish", "li", m).on(o, "a", i, g)
            };
        return {
            hide: function(t) {
                if (this.length) {
                    var i = this,
                        n = d(i);
                    if (!n) return this;
                    var o = !0 === n.retainPath ? n.$path : "",
                        r = i.find("li." + n.hoverClass).add(this).not(o).removeClass(n.hoverClass).children(n.popUpSelector),
                        a = n.speedOut;
                    if (t && (r.show(), a = 0), n.retainPath = !1, !1 === n.onBeforeHide.call(r)) return this;
                    r.stop(!0, !0).animate(n.animationOut, a, function() {
                        var t = e(this);
                        n.onHide.call(t)
                    })
                }
                return this
            },
            show: function() {
                var e = d(this);
                if (!e) return this;
                var t, i = this.addClass(e.hoverClass).children(e.popUpSelector);
                return !1 === e.onBeforeShow.call(i) ? this : (i.stop(!0, !0).animate(e.animation, e.speed, function() {
                    e.onShow.call(i)
                }), this)
            },
            destroy: function() {
                return this.each(function() {
                    var i = e(this),
                        n = i.data("sfOptions"),
                        o;
                    return !!n && (o = i.find(n.popUpSelector).parent("li"), clearTimeout(n.sfTimer), s(i, n), l(o), u(i), i.off(".ktsuperfish").off(".hoverIntent"), o.children(n.popUpSelector).attr("style", function(e, t) {
                        return t.replace(/display[^;]+;?/g, "")
                    }), n.$path.removeClass(n.hoverClass + " " + t).addClass(n.pathClass), i.find("." + n.hoverClass).removeClass(n.hoverClass), n.onDestroy.call(i), void i.removeData("sfOptions"))
                })
            },
            init: function(i) {
                return this.each(function() {
                    var n = e(this);
                    if (n.data("sfOptions")) return !1;
                    var o = e.extend({}, e.fn.ktsuperfish.defaults, i),
                        r = n.find(o.popUpSelector).parent("li");
                    o.$path = c(n, o), n.data("sfOptions", o), s(n, o, !0), l(r, !0), u(n), v(n, o), r.not("." + t).ktsuperfish("hide", !0), o.onInit.call(this)
                })
            }
        }
    }();
    e.fn.ktsuperfish = function(t, n) {
        return i[t] ? i[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.ktsuperfish") : i.init.apply(this, arguments)
    }, e.fn.ktsuperfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop,
        onHandleTouch: e.noop
    }
}(jQuery, window),
function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var n = document.head || document.getElementsByTagName("head")[0],
                o = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                r = document.createElement("div");
            r.innerHTML = '<p>x</p><style id="fit-vids-style">' + o + "</style>", n.appendChild(r.childNodes[1])
        }
        return t && e.extend(i, t), this.each(function() {
            var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && t.push(i.customSelector);
            var n = ".fitvidsignore";
            i.ignore && (n = n + ", " + i.ignore);
            var o = e(this).find(t.join(","));
            (o = (o = o.not("object object")).not(n)).each(function() {
                var t = e(this);
                if (!(t.parents(n).length > 0 || "embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9), t.attr("width", 16));
                    var i, o, r = ("object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()) / (isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10));
                    if (!t.attr("name")) {
                        var a = "fitvid" + e.fn.fitVids._count;
                        t.attr("name", a), e.fn.fitVids._count++
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * r + "%"), t.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, e.fn.fitVids._count = 0
}(window.jQuery || window.Zepto),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    var t = "waitForImages";
    e.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
        hasImageAttributes: ["srcset"]
    }, e.expr[":"]["has-src"] = function(t) {
        return e(t).is('img[src][src!=""]')
    }, e.expr[":"].uncached = function(t) {
        return !!e(t).is(":has-src") && !t.complete
    }, e.fn.waitForImages = function(i, n, o) {
        var r, a, s, c = 0,
            l = 0,
            u = e.Deferred();
        if (e.isPlainObject(i) ? (s = i.waitForAll, a = i.each, r = i.finished) : 1 === arguments.length && "boolean" === e.type(i) ? s = i : (r = i, a = n, s = o), r = r || e.noop, a = a || e.noop, s = !!s, !e.isFunction(r) || !e.isFunction(a)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function() {
            var i = e(this),
                n = [],
                o = e.waitForImages.hasImageProperties || [],
                p = e.waitForImages.hasImageAttributes || [],
                d = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            s ? i.find("*").addBack().each(function() {
                var t = e(this);
                t.is("img:has-src") && !t.is("[srcset]") && n.push({
                    src: t.attr("src"),
                    element: t[0]
                }), e.each(o, function(e, i) {
                    var o, r = t.css(i);
                    if (!r) return !0;
                    for (; o = d.exec(r);) n.push({
                        src: o[2],
                        element: t[0]
                    })
                }), e.each(p, function(e, i) {
                    var o;
                    return !t.attr(i) || void n.push({
                        src: t.attr("src"),
                        srcset: t.attr("srcset"),
                        element: t[0]
                    })
                })
            }) : i.find("img:has-src").each(function() {
                n.push({
                    src: this.src,
                    element: this
                })
            }), c = n.length, l = 0, 0 === c && (r.call(i[0]), u.resolveWith(i[0])), e.each(n, function(n, o) {
                var s = new Image,
                    p = "load." + t + " error." + t;
                e(s).one(p, function t(n) {
                    var s = [l, c, "load" == n.type];
                    if (l++, a.apply(o.element, s), u.notifyWith(o.element, s), e(this).off(p, t), l == c) return r.call(i[0]), u.resolveWith(i[0]), !1
                }), o.srcset && (s.srcset = o.srcset), s.src = o.src
            })
        }), u.promise()
    }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    var t = -1,
        i = -1,
        n = function(e) {
            return parseFloat(e) || 0
        },
        o = function(t) {
            var i = 1,
                o = e(t),
                r = null,
                a = [];
            return o.each(function() {
                var t = e(this),
                    i = t.offset().top - n(t.css("margin-top")),
                    o = a.length > 0 ? a[a.length - 1] : null;
                null === o ? a.push(t) : Math.floor(Math.abs(r - i)) <= 1 ? a[a.length - 1] = o.add(t) : a.push(t), r = i
            }), a
        },
        r = function(t) {
            var i = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof t ? e.extend(i, t) : ("boolean" == typeof t ? i.byRow = t : "remove" === t && (i.remove = !0), i)
        },
        a = e.fn.matchHeight = function(t) {
            var i = r(t);
            if (i.remove) {
                var n = this;
                return this.css(i.property, ""), e.each(a._groups, function(e, t) {
                    t.elements = t.elements.not(n)
                }), this
            }
            return this.length <= 1 && !i.target ? this : (a._groups.push({
                elements: this,
                options: i
            }), a._apply(this, i), this)
        };
    a.version = "master", a._groups = [], a._throttle = 80, a._maintainScroll = !1, a._beforeUpdate = null, a._afterUpdate = null, a._rows = o, a._parse = n, a._parseOptions = r, a._apply = function(t, i) {
        var s = r(i),
            c = e(t),
            l = [c],
            u = e(window).scrollTop(),
            p = e("html").outerHeight(!0),
            d = c.parents().filter(":hidden");
        return d.each(function() {
            var t = e(this);
            t.data("style-cache", t.attr("style"))
        }), d.css("display", "block"), s.byRow && !s.target && (c.each(function() {
            var t = e(this),
                i = t.css("display");
            "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"), t.data("style-cache", t.attr("style")), t.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), l = o(c), c.each(function() {
            var t = e(this);
            t.attr("style", t.data("style-cache") || "")
        })), e.each(l, function(t, i) {
            var o = e(i),
                r = 0;
            if (s.target) r = s.target.outerHeight(!1);
            else {
                if (s.byRow && o.length <= 1) return void o.css(s.property, "");
                o.each(function() {
                    var t = e(this),
                        i = t.attr("style"),
                        n = t.css("display");
                    "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                    var o = {
                        display: n
                    };
                    o[s.property] = "", t.css(o), t.outerHeight(!1) > r && (r = t.outerHeight(!1)), i ? t.attr("style", i) : t.css("display", "")
                })
            }
            o.each(function() {
                var t = e(this),
                    i = 0;
                s.target && t.is(s.target) || ("border-box" !== t.css("box-sizing") && (i += n(t.css("border-top-width")) + n(t.css("border-bottom-width")), i += n(t.css("padding-top")) + n(t.css("padding-bottom"))), t.css(s.property, r - i + "px"))
            })
        }), d.each(function() {
            var t = e(this);
            t.attr("style", t.data("style-cache") || null)
        }), a._maintainScroll && e(window).scrollTop(u / p * e("html").outerHeight(!0)), this
    }, a._applyDataApi = function() {
        var t = {};
        e("[data-match-height], [data-mh]").each(function() {
            var i = e(this),
                n = i.attr("data-mh") || i.attr("data-match-height");
            t[n] = n in t ? t[n].add(i) : i
        }), e.each(t, function() {
            this.matchHeight(!0)
        })
    };
    var s = function(t) {
        a._beforeUpdate && a._beforeUpdate(t, a._groups), e.each(a._groups, function() {
            a._apply(this.elements, this.options)
        }), a._afterUpdate && a._afterUpdate(t, a._groups)
    };
    a._update = function(n, o) {
        if (o && "resize" === o.type) {
            var r = e(window).width();
            if (r === t) return;
            t = r
        }
        n ? -1 === i && (i = setTimeout(function() {
            s(o), i = -1
        }, a._throttle)) : s(o)
    }, e(a._applyDataApi), e(window).bind("load", function(e) {
        a._update(!1, e)
    }), e(window).bind("resize orientationchange", function(e) {
        a._update(!0, e)
    })
}),
function(e) {
    "use strict";
    var t = function(t, i) {
        this.el = e(t), this.options = e.extend({}, e.fn.typed.defaults, i), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    t.prototype = {
        constructor: t,
        init: function() {
            var e = this;
            e.timeout = setTimeout(function() {
                for (var t = 0; t < e.strings.length; ++t) e.sequence[t] = t;
                e.shuffle && (e.sequence = e.shuffleArray(e.sequence)), e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos)
            }, e.startDelay)
        },
        build: function() {
            var t = this;
            if (!0 === this.showCursor && (this.cursor = e('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                t.strings = [], this.stringsElement.hide();
                var i = this.stringsElement.find("p");
                e.each(i, function(i, n) {
                    t.strings.push(e(n).html())
                })
            }
            this.init()
        },
        typewrite: function(e, t) {
            if (!0 !== this.stop) {
                var i = Math.round(70 * Math.random()) + this.typeSpeed,
                    n = this;
                n.timeout = setTimeout(function() {
                    var i = 0,
                        o = e.substr(t);
                    if ("^" === o.charAt(0)) {
                        var r = 1;
                        /^\^\d+/.test(o) && (r += (o = /\d+/.exec(o)[0]).length, i = parseInt(o)), e = e.substring(0, t) + e.substring(t + r)
                    }
                    if ("html" === n.contentType) {
                        var a = e.substr(t).charAt(0);
                        if ("<" === a || "&" === a) {
                            var s = "",
                                c = "";
                            for (c = "<" === a ? ">" : ";"; e.substr(t).charAt(0) !== c;) s += e.substr(t).charAt(0), t++;
                            t++, s += c
                        }
                    }
                    n.timeout = setTimeout(function() {
                        if (t === e.length) {
                            if (n.options.onStringTyped(n.arrayPos), n.arrayPos === n.strings.length - 1 && (n.options.callback(), n.curLoop++, !1 === n.loop || n.curLoop === n.loopCount)) return;
                            n.timeout = setTimeout(function() {
                                n.backspace(e, t)
                            }, n.backDelay)
                        } else {
                            0 === t && n.options.preStringTyped(n.arrayPos);
                            var i = e.substr(0, t + 1);
                            n.attr ? n.el.attr(n.attr, i) : n.isInput ? n.el.val(i) : "html" === n.contentType ? n.el.html(i) : n.el.text(i), t++, n.typewrite(e, t)
                        }
                    }, i)
                }, i)
            }
        },
        backspace: function(e, t) {
            if (!0 !== this.stop) {
                var i = Math.round(70 * Math.random()) + this.backSpeed,
                    n = this;
                n.timeout = setTimeout(function() {
                    if ("html" === n.contentType && ">" === e.substr(t).charAt(0)) {
                        for (var i = "";
                            "<" !== e.substr(t).charAt(0);) i -= e.substr(t).charAt(0), t--;
                        t--, i += "<"
                    }
                    var o = e.substr(0, t);
                    n.attr ? n.el.attr(n.attr, o) : n.isInput ? n.el.val(o) : "html" === n.contentType ? n.el.html(o) : n.el.text(o), t > n.stopNum ? (t--, n.backspace(e, t)) : t <= n.stopNum && (n.arrayPos++, n.arrayPos === n.strings.length ? (n.arrayPos = 0, n.shuffle && (n.sequence = n.shuffleArray(n.sequence)), n.init()) : n.typewrite(n.strings[n.sequence[n.arrayPos]], t))
                }, i)
            }
        },
        shuffleArray: function(e) {
            var t, i, n = e.length;
            if (n)
                for (; --n;) t = e[i = Math.floor(Math.random() * (n + 1))], e[i] = e[n], e[n] = t;
            return e
        },
        reset: function() {
            var e = this;
            clearInterval(e.timeout);
            var t = this.el.attr("id");
            this.el.after('<span id="' + t + '"/>'), this.el.remove(), void 0 !== this.cursor && this.cursor.remove(), e.options.resetCallback()
        }
    }, e.fn.typed = function(i) {
        return this.each(function() {
            var n = e(this),
                o = n.data("typed"),
                r = "object" == typeof i && i;
            o || n.data("typed", o = new t(this, r)), "string" == typeof i && o[i]()
        })
    }, e.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery),
function(e) {
    e.fn.appear = function(t, i) {
        var n = e.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, i);
        return this.each(function() {
            var i = e(this);
            if (i.appeared = !1, t) {
                var o = e(window),
                    r = function() {
                        if (i.is(":visible")) {
                            var e = o.scrollLeft(),
                                t = o.scrollTop(),
                                r = i.offset(),
                                a = r.left,
                                s = r.top,
                                c = n.accX,
                                l = n.accY,
                                u = i.height(),
                                p = o.height(),
                                d = i.width(),
                                f = o.width();
                            s + u + l >= t && s <= t + p + l && a + d + c >= e && a <= e + f + c ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
                        } else i.appeared = !1
                    },
                    a = function() {
                        if (i.appeared = !0, n.one) {
                            o.unbind("scroll", r);
                            var a = e.inArray(r, e.fn.appear.checks);
                            a >= 0 && e.fn.appear.checks.splice(a, 1)
                        }
                        t.apply(this, arguments)
                    };
                n.one ? i.one("appear", n.data, a) : i.bind("appear", n.data, a), o.scroll(r), e.fn.appear.checks.push(r), r()
            } else i.trigger("appear", n.data)
        })
    }, e.extend(e.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var t = e.fn.appear.checks.length;
            if (t > 0)
                for (; t--;) e.fn.appear.checks[t]()
        },
        run: function() {
            e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout), e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    }), e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(t, i) {
        var n = e.fn[i];
        n && (e.fn[i] = function() {
            var t = n.apply(this, arguments);
            return e.fn.appear.run(), t
        })
    })
}(jQuery),
function(e) {
    var t, i, n = e.event;
    t = n.special.debouncedresize = {
        setup: function() {
            e(this).on("resize", t.handler)
        },
        teardown: function() {
            e(this).off("resize", t.handler)
        },
        handler: function(e, o) {
            var r = this,
                a = arguments,
                s = function() {
                    e.type = "debouncedresize", n.dispatch.apply(r, a)
                };
            i && clearTimeout(i), o ? s() : i = setTimeout(s, t.threshold)
        },
        threshold: 150
    }
}(jQuery),
function(e) {
    e.fn.kt_fitText = function(t, i) {
        var n = t || 1,
            o = e.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY,
                minWidth: Number.NEGATIVE_INFINITY,
                maxWidth: Number.POSITIVE_INFINITY
            }, i);
        return this.each(function() {
            var t = e(this),
                i = function() {
                    var e = t.width();
                    o.maxWidth > e && o.minWidth < e ? t.css("font-size", Math.max(Math.min(t.width() / (10 * n), parseFloat(o.maxFontSize)), parseFloat(o.minFontSize))) : o.minWidth > e ? t.css("font-size", o.minFontSize) : t.css("font-size", o.maxFontSize)
                };
            i(), e(window).on("resize.fittext orientationchange.fittext", i)
        })
    }
}(jQuery);