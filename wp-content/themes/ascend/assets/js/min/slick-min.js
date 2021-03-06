! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function($) {
    "use strict";
    var i = window.Slick || {};
    i = function() {
        function i(i, t) {
            var o = this,
                s;
            o.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: $(i),
                appendDots: $(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(i, e) {
                    return $('<button type="button" />').text(e + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 0,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, o.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, $.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = $(i), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, s = $(i).data("slick") || {}, o.options = $.extend({}, o.defaults, t, s), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = $.proxy(o.autoPlay, o), o.autoPlayClear = $.proxy(o.autoPlayClear, o), o.autoPlayIterator = $.proxy(o.autoPlayIterator, o), o.changeSlide = $.proxy(o.changeSlide, o), o.clickHandler = $.proxy(o.clickHandler, o), o.selectHandler = $.proxy(o.selectHandler, o), o.setPosition = $.proxy(o.setPosition, o), o.swipeHandler = $.proxy(o.swipeHandler, o), o.dragHandler = $.proxy(o.dragHandler, o), o.keyHandler = $.proxy(o.keyHandler, o), o.instanceUid = e++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
        }
        var e = 0;
        return i
    }(), i.prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, i.prototype.addSlide = i.prototype.slickAdd = function(i, e, t) {
        var o = this;
        if ("boolean" == typeof e) t = e, e = null;
        else if (e < 0 || e >= o.slideCount) return !1;
        o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? $(i).appendTo(o.$slideTrack) : t ? $(i).insertBefore(o.$slides.eq(e)) : $(i).insertAfter(o.$slides.eq(e)) : !0 === t ? $(i).prependTo(o.$slideTrack) : $(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
            $(e).attr("data-slick-index", i)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, i.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, i.prototype.animateSlide = function(i, e) {
        var t = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (i = -i), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: i
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: i
        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), $({
            animStart: o.currentLeft
        }).animate({
            animStart: i
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === o.options.vertical ? (t[o.animType] = "translate(" + i + "px, 0px)", o.$slideTrack.css(t)) : (t[o.animType] = "translate(0px," + i + "px)", o.$slideTrack.css(t))
            },
            complete: function() {
                e && e.call()
            }
        })) : (o.applyTransition(), i = Math.ceil(i), !1 === o.options.vertical ? t[o.animType] = "translate3d(" + i + "px, 0px, 0px)" : t[o.animType] = "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(t), e && setTimeout(function() {
            o.disableTransition(), e.call()
        }, o.options.speed))
    }, i.prototype.getNavTarget = function() {
        var i = this,
            e = i.options.asNavFor;
        return e && null !== e && (e = $(e).not(i.$slider)), e
    }, i.prototype.asNavFor = function(i) {
        var e = this,
            t = e.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var e = $(this).slick("getSlick");
            e.unslicked || e.slideHandler(i, !0)
        })
    }, i.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, i.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, i.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, i.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, i.prototype.buildArrows = function() {
        var i = this;
        !0 === i.options.arrows && (i.$prevArrow = $(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = $(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), !0 !== i.options.infinite && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, i.prototype.buildDots = function() {
        var i = this,
            e, t;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), t = $("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append($("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
        }
    }, i.prototype.buildOut = function() {
        var i = this;
        i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
            $(e).attr("data-slick-index", i).data("originalStyling", $(e).attr("style") || "")
        }), i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? $('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), !0 !== i.options.centerMode && !0 !== i.options.swipeToSlide || (i.options.slidesToScroll = 1), $("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), !0 === i.options.draggable && i.$list.addClass("draggable")
    }, i.prototype.buildRows = function() {
        var i = this,
            e, t, o, s, n, r, l;
        if (s = document.createDocumentFragment(), r = i.$slider.children(), i.options.rows > 0) {
            for (l = i.options.slidesPerRow * i.options.rows, n = Math.ceil(r.length / l), e = 0; e < n; e++) {
                var d = document.createElement("div");
                for (t = 0; t < i.options.rows; t++) {
                    var a = document.createElement("div");
                    for (o = 0; o < i.options.slidesPerRow; o++) {
                        var c = e * l + (t * i.options.slidesPerRow + o);
                        r.get(c) && a.appendChild(r.get(c))
                    }
                    d.appendChild(a)
                }
                s.appendChild(d)
            }
            i.$slider.empty().append(s), i.$slider.children().children().children().css({
                width: 100 / i.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, i.prototype.checkResponsive = function(i, e) {
        var t = this,
            o, s, n, r = !1,
            l = t.$slider.width(),
            d = window.innerWidth || $(window).width();
        if ("window" === t.respondTo ? n = d : "slider" === t.respondTo ? n = l : "min" === t.respondTo && (n = Math.min(d, l)), t.options.responsive && t.options.responsive.length && null !== t.options.responsive) {
            s = null;
            for (o in t.breakpoints) t.breakpoints.hasOwnProperty(o) && (!1 === t.originalSettings.mobileFirst ? n < t.breakpoints[o] && (s = t.breakpoints[o]) : n > t.breakpoints[o] && (s = t.breakpoints[o]));
            null !== s ? null !== t.activeBreakpoint ? (s !== t.activeBreakpoint || e) && (t.activeBreakpoint = s, "unslick" === t.breakpointSettings[s] ? t.unslick(s) : (t.options = $.extend({}, t.originalSettings, t.breakpointSettings[s]), !0 === i && (t.currentSlide = t.options.initialSlide), t.refresh(i)), r = s) : (t.activeBreakpoint = s, "unslick" === t.breakpointSettings[s] ? t.unslick(s) : (t.options = $.extend({}, t.originalSettings, t.breakpointSettings[s]), !0 === i && (t.currentSlide = t.options.initialSlide), t.refresh(i)), r = s) : null !== t.activeBreakpoint && (t.activeBreakpoint = null, t.options = t.originalSettings, !0 === i && (t.currentSlide = t.options.initialSlide), t.refresh(i), r = s), i || !1 === r || t.$slider.trigger("breakpoint", [t, r])
        }
    }, i.prototype.changeSlide = function(i, e) {
        var t = this,
            o = $(i.currentTarget),
            s, n, r;
        switch (o.is("a") && i.preventDefault(), o.is("li") || (o = o.closest("li")), r = t.slideCount % t.options.slidesToScroll != 0, s = r ? 0 : (t.slideCount - t.currentSlide) % t.options.slidesToScroll, i.data.message) {
            case "previous":
                n = 0 === s ? t.options.slidesToScroll : t.options.slidesToShow - s, t.slideCount > t.options.slidesToShow && t.slideHandler(t.currentSlide - n, !1, e);
                break;
            case "next":
                n = 0 === s ? t.options.slidesToScroll : s, t.slideCount > t.options.slidesToShow && t.slideHandler(t.currentSlide + n, !1, e);
                break;
            case "index":
                var l = 0 === i.data.index ? 0 : i.data.index || o.index() * t.options.slidesToScroll;
                t.slideHandler(t.checkNavigable(l), !1, e), o.children().trigger("focus");
                break;
            default:
                return
        }
    }, i.prototype.checkNavigable = function(i) {
        var e = this,
            t, o;
        if (t = e.getNavigableIndexes(), o = 0, i > t[t.length - 1]) i = t[t.length - 1];
        else
            for (var s in t) {
                if (i < t[s]) {
                    i = o;
                    break
                }
                o = t[s]
            }
        return i
    }, i.prototype.cleanUpEvents = function() {
        var i = this;
        i.options.dots && null !== i.$dots && ($("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", $.proxy(i.interrupt, i, !0)).off("mouseleave.slick", $.proxy(i.interrupt, i, !1)), !0 === i.options.accessibility && i.$dots.off("keydown.slick", i.keyHandler)), i.$slider.off("focus.slick blur.slick"), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow && i.$prevArrow.off("keydown.slick", i.keyHandler), i.$nextArrow && i.$nextArrow.off("keydown.slick", i.keyHandler))), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), $(document).off(i.visibilityChange, i.visibility), i.cleanUpSlideEvents(), !0 === i.options.accessibility && i.$list.off("keydown.slick", i.keyHandler), !0 === i.options.focusOnSelect && $(i.$slideTrack).children().off("click.slick", i.selectHandler), $(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), $(window).off("resize.slick.slick-" + i.instanceUid, i.resize), $("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), $(window).off("load.slick.slick-" + i.instanceUid, i.setPosition)
    }, i.prototype.cleanUpSlideEvents = function() {
        var i = this;
        i.$list.off("mouseenter.slick", $.proxy(i.interrupt, i, !0)), i.$list.off("mouseleave.slick", $.proxy(i.interrupt, i, !1))
    }, i.prototype.cleanUpRows = function() {
        var i = this,
            e;
        i.options.rows > 0 && (e = i.$slides.children().children(), e.removeAttr("style"), i.$slider.empty().append(e))
    }, i.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, i.prototype.destroy = function(i) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), $(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            $(this).attr("style", $(this).data("originalStyling"))
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
    }, i.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, i.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, i.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, i.prototype.filterSlides = i.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, i.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(e) {
            var t = $(this);
            setTimeout(function() {
                i.options.pauseOnFocus && t.is(":focus") && (i.focussed = !0, i.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function(e) {
            var t = $(this);
            i.options.pauseOnFocus && (i.focussed = !1, i.autoPlay())
        })
    }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, i.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, i.prototype.getLeft = function(i) {
        var e = this,
            t, o, s = 0,
            n, r;
        return e.slideOffset = 0, o = e.$slides.first().outerHeight(!0), !0 === e.options.infinite ? (e.slideCount > e.options.slidesToShow && (e.slideOffset = e.slideWidth * e.options.slidesToShow * -1, r = -1, !0 === e.options.vertical && !0 === e.options.centerMode && (2 === e.options.slidesToShow ? r = -1.5 : 1 === e.options.slidesToShow && (r = -2)), s = o * e.options.slidesToShow * r), e.slideCount % e.options.slidesToScroll != 0 && i + e.options.slidesToScroll > e.slideCount && e.slideCount > e.options.slidesToShow && (i > e.slideCount ? (e.slideOffset = (e.options.slidesToShow - (i - e.slideCount)) * e.slideWidth * -1, s = (e.options.slidesToShow - (i - e.slideCount)) * o * -1) : (e.slideOffset = e.slideCount % e.options.slidesToScroll * e.slideWidth * -1, s = e.slideCount % e.options.slidesToScroll * o * -1))) : i + e.options.slidesToShow > e.slideCount && (e.slideOffset = (i + e.options.slidesToShow - e.slideCount) * e.slideWidth, s = (i + e.options.slidesToShow - e.slideCount) * o), e.slideCount <= e.options.slidesToShow && (e.slideOffset = 0, s = 0), !0 === e.options.centerMode && e.slideCount <= e.options.slidesToShow ? e.slideOffset = e.slideWidth * Math.floor(e.options.slidesToShow) / 2 - e.slideWidth * e.slideCount / 2 : !0 === e.options.centerMode && !0 === e.options.infinite ? e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth : !0 === e.options.centerMode && (e.slideOffset = 0, e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2)), t = !1 === e.options.vertical ? i * e.slideWidth * -1 + e.slideOffset : i * o * -1 + s, !0 === e.options.variableWidth && (n = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(i) : e.$slideTrack.children(".slick-slide").eq(i + e.options.slidesToShow), t = !0 === e.options.rtl ? n[0] ? -1 * (e.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === e.options.centerMode && (n = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(i) : e.$slideTrack.children(".slick-slide").eq(i + e.options.slidesToShow + 1), t = !0 === e.options.rtl ? n[0] ? -1 * (e.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, t += (e.$list.width() - n.outerWidth()) / 2)), t
    }, i.prototype.getOption = i.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, i.prototype.getNavigableIndexes = function() {
        var i = this,
            e = 0,
            t = 0,
            o = [],
            s;
        for (!1 === i.options.infinite ? s = i.slideCount : (e = -1 * i.options.slidesToScroll, t = -1 * i.options.slidesToScroll, s = 2 * i.slideCount); e < s;) o.push(e), e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        return o
    }, i.prototype.getSlick = function() {
        return this
    }, i.prototype.getSlideCount = function() {
        var i = this,
            e, t, o, s;
        return s = !0 === i.options.centerMode ? Math.floor(i.$list.width() / 2) : 0, o = -1 * i.swipeLeft + s, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function(e, s) {
            var n, r, l;
            if (n = $(s).outerWidth(), r = s.offsetLeft, !0 !== i.options.centerMode && (r += n / 2), l = r + n, o < l) return t = s, !1
        }), e = Math.abs($(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
    }, i.prototype.goTo = i.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, i.prototype.init = function(i) {
        var e = this;
        $(e.$slider).hasClass("slick-initialized") || ($(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), i && e.$slider.trigger("init", [e]), !0 === e.options.accessibility && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
    }, i.prototype.initADA = function() {
        var i = this,
            e = Math.ceil(i.slideCount / i.options.slidesToShow),
            t = i.getNavigableIndexes().filter(function(e) {
                return e >= 0 && e < i.slideCount
            });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
            var o = t.indexOf(e);
            if ($(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + i.instanceUid + e,
                    tabindex: -1
                }), -1 !== o) {
                var s = "slick-slide-control" + i.instanceUid + o;
                $("#" + s).length && $(this).attr({
                    "aria-describedby": s
                })
            }
        }), i.$dots.attr("role", "tablist").find("li").each(function(o) {
            var s = t[o];
            $(this).attr({
                role: "presentation"
            }), $(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + o,
                "aria-controls": "slick-slide" + i.instanceUid + s,
                "aria-label": o + 1 + " of " + e,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = i.currentSlide, s = o + i.options.slidesToShow; o < s; o++) i.options.focusOnChange ? i.$slides.eq(o).attr({
            tabindex: "0"
        }) : i.$slides.eq(o).removeAttr("tabindex");
        i.activateADA()
    }, i.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, i.prototype.initDotEvents = function() {
        var i = this;
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && ($("li", i.$dots).on("click.slick", {
            message: "index"
        }, i.changeSlide), !0 === i.options.accessibility && i.$dots.on("keydown.slick", i.keyHandler)), !0 === i.options.dots && !0 === i.options.pauseOnDotsHover && i.slideCount > i.options.slidesToShow && $("li", i.$dots).on("mouseenter.slick", $.proxy(i.interrupt, i, !0)).on("mouseleave.slick", $.proxy(i.interrupt, i, !1))
    }, i.prototype.initSlideEvents = function() {
        var i = this;
        i.options.pauseOnHover && (i.$list.on("mouseenter.slick", $.proxy(i.interrupt, i, !0)), i.$list.on("mouseleave.slick", $.proxy(i.interrupt, i, !1)))
    }, i.prototype.initializeEvents = function() {
        var i = this;
        i.initArrowEvents(), i.initDotEvents(), i.initSlideEvents(), i.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), $(document).on(i.visibilityChange, $.proxy(i.visibility, i)), !0 === i.options.accessibility && i.$list.on("keydown.slick", i.keyHandler), !0 === i.options.focusOnSelect && $(i.$slideTrack).children().on("click.slick", i.selectHandler), $(window).on("orientationchange.slick.slick-" + i.instanceUid, $.proxy(i.orientationChange, i)), $(window).on("resize.slick.slick-" + i.instanceUid, $.proxy(i.resize, i)), $("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), $(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), $(i.setPosition)
    }, i.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, i.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, i.prototype.lazyLoad = function() {
        function i(i) {
            $("img[data-lazy]", i).each(function() {
                var i = $(this),
                    t = $(this).attr("data-lazy"),
                    o = $(this).attr("data-srcset"),
                    s = $(this).attr("data-sizes") || e.$slider.attr("data-sizes"),
                    n = document.createElement("img");
                n.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (i.attr("srcset", o), s && i.attr("sizes", s)), i.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), e.$slider.trigger("lazyLoaded", [e, i, t])
                    })
                }, n.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), e.$slider.trigger("lazyLoadError", [e, i, t])
                }, n.src = t
            })
        }
        var e = this,
            t, o, s, n;
        if (!0 === e.options.centerMode ? !0 === e.options.infinite ? (s = e.currentSlide + (e.options.slidesToShow / 2 + 1), n = s + e.options.slidesToShow + 2) : (s = Math.max(0, e.currentSlide - (e.options.slidesToShow / 2 + 1)), n = e.options.slidesToShow / 2 + 1 + 2 + e.currentSlide) : (s = e.options.infinite ? e.options.slidesToShow + e.currentSlide : e.currentSlide, n = Math.ceil(s + e.options.slidesToShow), !0 === e.options.fade && (s > 0 && s--, n <= e.slideCount && n++)), t = e.$slider.find(".slick-slide").slice(s, n), "anticipated" === e.options.lazyLoad)
            for (var r = s - 1, l = n, d = e.$slider.find(".slick-slide"), a = 0; a < e.options.slidesToScroll; a++) r < 0 && (r = e.slideCount - 1), t = t.add(d.eq(r)), t = t.add(d.eq(l)), r--, l++;
        i(t), e.slideCount <= e.options.slidesToShow ? (o = e.$slider.find(".slick-slide"), i(o)) : e.currentSlide >= e.slideCount - e.options.slidesToShow ? (o = e.$slider.find(".slick-cloned").slice(0, e.options.slidesToShow), i(o)) : 0 === e.currentSlide && (o = e.$slider.find(".slick-cloned").slice(-1 * e.options.slidesToShow), i(o))
    }, i.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, i.prototype.next = i.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, i.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, i.prototype.pause = i.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, i.prototype.play = i.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, i.prototype.postSlide = function(i) {
        var e = this;
        if (!e.unslicked && (e.$slider.trigger("afterChange", [e, i]), e.animating = !1, e.slideCount > e.options.slidesToShow && e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && (e.initADA(), e.options.focusOnChange))) {
            $(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()
        }
    }, i.prototype.prev = i.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, i.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, i.prototype.progressiveLazyLoad = function(i) {
        i = i || 1;
        var e = this,
            t = $("img[data-lazy]", e.$slider),
            o, s, n, r, l;
        t.length ? (o = t.first(), s = o.attr("data-lazy"), n = o.attr("data-srcset"), r = o.attr("data-sizes") || e.$slider.attr("data-sizes"), l = document.createElement("img"), l.onload = function() {
            n && (o.attr("srcset", n), r && o.attr("sizes", r)), o.attr("src", s).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === e.options.adaptiveHeight && e.setPosition(), e.$slider.trigger("lazyLoaded", [e, o, s]), e.progressiveLazyLoad()
        }, l.onerror = function() {
            i < 3 ? setTimeout(function() {
                e.progressiveLazyLoad(i + 1)
            }, 500) : (o.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), e.$slider.trigger("lazyLoadError", [e, o, s]), e.progressiveLazyLoad())
        }, l.src = s) : e.$slider.trigger("allImagesLoaded", [e])
    }, i.prototype.refresh = function(i) {
        var e = this,
            t, o;
        o = e.slideCount - e.options.slidesToShow, !e.options.infinite && e.currentSlide > o && (e.currentSlide = o), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), t = e.currentSlide, e.destroy(!0), $.extend(e, e.initials, {
            currentSlide: t
        }), e.init(), i || e.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, i.prototype.registerBreakpoints = function() {
        var i = this,
            e, t, o, s = i.options.responsive || null;
        if ("array" === $.type(s) && s.length) {
            i.respondTo = i.options.respondTo || "window";
            for (e in s)
                if (o = i.breakpoints.length - 1, s.hasOwnProperty(e)) {
                    for (t = s[e].breakpoint; o >= 0;) i.breakpoints[o] && i.breakpoints[o] === t && i.breakpoints.splice(o, 1), o--;
                    i.breakpoints.push(t), i.breakpointSettings[t] = s[e].settings
                }
            i.breakpoints.sort(function(e, t) {
                return i.options.mobileFirst ? e - t : t - e
            })
        }
    }, i.prototype.reinit = function() {
        var i = this;
        i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.cleanUpSlideEvents(), i.initSlideEvents(), i.checkResponsive(!1, !0), !0 === i.options.focusOnSelect && $(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.setPosition(), i.focusHandler(), i.paused = !i.options.autoplay, i.autoPlay(), i.$slider.trigger("reInit", [i])
    }, i.prototype.resize = function() {
        var i = this;
        $(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
            i.windowWidth = $(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
        }, 50))
    }, i.prototype.removeSlide = i.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if ("boolean" == typeof i ? (e = i, i = !0 === e ? 0 : o.slideCount - 1) : i = !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, i.prototype.setCSS = function(i) {
        var e = this,
            t = {},
            o, s;
        !0 === e.options.rtl && (i = -i), o = "left" == e.positionProp ? Math.ceil(i) + "px" : "0px", s = "top" == e.positionProp ? Math.ceil(i) + "px" : "0px", t[e.positionProp] = i, !1 === e.transformsEnabled ? e.$slideTrack.css(t) : (t = {}, !1 === e.cssTransitions ? (t[e.animType] = "translate(" + o + ", " + s + ")", e.$slideTrack.css(t)) : (t[e.animType] = "translate3d(" + o + ", " + s + ", 0px)", e.$slideTrack.css(t)))
    }, i.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, i.prototype.setFade = function() {
        var i = this,
            e;
        i.$slides.each(function(t, o) {
            e = i.slideWidth * t * -1, !0 === i.options.rtl ? $(o).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : $(o).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, i.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, i.prototype.setOption = i.prototype.slickSetOption = function() {
        var i = this,
            e, t, o, s, n = !1,
            r;
        if ("object" === $.type(arguments[0]) ? (o = arguments[0], n = arguments[1], r = "multiple") : "string" === $.type(arguments[0]) && (o = arguments[0], s = arguments[1], n = arguments[2], "responsive" === arguments[0] && "array" === $.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) i.options[o] = s;
        else if ("multiple" === r) $.each(o, function(e, t) {
            i.options[e] = t
        });
        else if ("responsive" === r)
            for (t in s)
                if ("array" !== $.type(i.options.responsive)) i.options.responsive = [s[t]];
                else {
                    for (e = i.options.responsive.length - 1; e >= 0;) i.options.responsive[e].breakpoint === s[t].breakpoint && i.options.responsive.splice(e, 1), e--;
                    i.options.responsive.push(s[t])
                }
        n && (i.unload(), i.reinit())
    }, i.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, i.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
            "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, i.prototype.setSlideClasses = function(i) {
        var e = this,
            t, o, s, n;
        if (o = e.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), e.$slides.eq(i).addClass("slick-current"), !0 === e.options.centerMode) {
            var r = e.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(e.options.slidesToShow / 2), !0 === e.options.infinite && (i >= t && i <= e.slideCount - 1 - t ? e.$slides.slice(i - t + r, i + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = e.options.slidesToShow + i, o.slice(s - t + 1 + r, s + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? o.eq(o.length - 1 - e.options.slidesToShow).addClass("slick-center") : i === e.slideCount - 1 && o.eq(e.options.slidesToShow).addClass("slick-center")), e.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= e.slideCount - e.options.slidesToShow ? e.$slides.slice(i, i + e.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : o.length <= e.options.slidesToShow ? o.addClass("slick-active").attr("aria-hidden", "false") : (n = e.slideCount % e.options.slidesToShow, s = !0 === e.options.infinite ? e.options.slidesToShow + i : i, e.options.slidesToShow == e.options.slidesToScroll && e.slideCount - i < e.options.slidesToShow ? o.slice(s - (e.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : o.slice(s, s + e.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== e.options.lazyLoad && "anticipated" !== e.options.lazyLoad || e.lazyLoad()
    }, i.prototype.setupInfinite = function() {
        var i = this,
            e, t, o;
        if (!0 === i.options.fade && (i.options.centerMode = !1), !0 === i.options.infinite && !1 === i.options.fade && (t = null, i.slideCount > i.options.slidesToShow)) {
            for (o = !0 === i.options.centerMode ? i.options.slidesToShow + 1 : i.options.slidesToShow, e = i.slideCount; e > i.slideCount - o; e -= 1) t = e - 1, $(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - i.slideCount).prependTo(i.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + i.slideCount; e += 1) t = e, $(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + i.slideCount).appendTo(i.$slideTrack).addClass("slick-cloned");
            i.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                $(this).attr("id", "")
            })
        }
    }, i.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, i.prototype.selectHandler = function(i) {
        var e = this,
            t = $(i.target).is(".slick-slide") ? $(i.target) : $(i.target).parents(".slick-slide"),
            o = parseInt(t.attr("data-slick-index"));
        if (o || (o = 0), e.slideCount <= e.options.slidesToShow) return void e.slideHandler(o, !1, !0);
        e.slideHandler(o)
    }, i.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l = null,
            d = this,
            a;
        if (e = e || !1, !(!0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === i)) {
            if (!1 === e && d.asNavFor(i), o = i, l = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (i < 0 || i > d.getDotCount() * d.options.slidesToScroll)) return void(!1 === d.options.fade && (o = d.currentSlide, !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(r, function() {
                d.postSlide(o)
            }) : d.postSlide(o)));
            if (!1 === d.options.infinite && !0 === d.options.centerMode && (i < 0 || i > d.slideCount - d.options.slidesToScroll)) return void(!1 === d.options.fade && (o = d.currentSlide, !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(r, function() {
                d.postSlide(o)
            }) : d.postSlide(o)));
            if (d.options.autoplay && clearInterval(d.autoPlayTimer), s = o < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = d.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade) return !0 !== t ? (d.fadeSlideOut(n), d.fadeSlide(s, function() {
                d.postSlide(s)
            })) : d.postSlide(s), void d.animateHeight();
            !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(l, function() {
                d.postSlide(s)
            }) : d.postSlide(s)
        }
    }, i.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, i.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, i.prototype.swipeEnd = function(i) {
        var e = this,
            t, o;
        if (e.dragging = !1, e.swiping = !1, e.scrolling) return e.scrolling = !1, !1;
        if (e.interrupted = !1, e.shouldClick = !(e.touchObject.swipeLength > 10), void 0 === e.touchObject.curX) return !1;
        if (!0 === e.touchObject.edgeHit && e.$slider.trigger("edge", [e, e.swipeDirection()]), e.touchObject.swipeLength >= e.touchObject.minSwipe) {
            switch (o = e.swipeDirection()) {
                case "left":
                case "down":
                    t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide + e.getSlideCount()) : e.currentSlide + e.getSlideCount(), e.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide - e.getSlideCount()) : e.currentSlide - e.getSlideCount(), e.currentDirection = 1;
                    break;
                default:
            }
            "vertical" != o && (e.slideHandler(t), e.touchObject = {}, e.$slider.trigger("swipe", [e, o]))
        } else e.touchObject.startX !== e.touchObject.curX && (e.slideHandler(e.currentSlide), e.touchObject = {})
    }, i.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i);
                break
        }
    }, i.prototype.swipeMove = function(i) {
        var e = this,
            t = !1,
            o, s, n, r, l, d;
        return l = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!e.dragging || e.scrolling || l && 1 !== l.length) && (o = e.getLeft(e.currentSlide), e.touchObject.curX = void 0 !== l ? l[0].pageX : i.clientX, e.touchObject.curY = void 0 !== l ? l[0].pageY : i.clientY, e.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(e.touchObject.curX - e.touchObject.startX, 2))), d = Math.round(Math.sqrt(Math.pow(e.touchObject.curY - e.touchObject.startY, 2))), !e.options.verticalSwiping && !e.swiping && d > 4 ? (e.scrolling = !0, !1) : (!0 === e.options.verticalSwiping && (e.touchObject.swipeLength = d), s = e.swipeDirection(), void 0 !== i.originalEvent && e.touchObject.swipeLength > 4 && (e.swiping = !0, i.preventDefault()), r = (!1 === e.options.rtl ? 1 : -1) * (e.touchObject.curX > e.touchObject.startX ? 1 : -1), !0 === e.options.verticalSwiping && (r = e.touchObject.curY > e.touchObject.startY ? 1 : -1), n = e.touchObject.swipeLength, e.touchObject.edgeHit = !1, !1 === e.options.infinite && (0 === e.currentSlide && "right" === s || e.currentSlide >= e.getDotCount() && "left" === s) && (n = e.touchObject.swipeLength * e.options.edgeFriction, e.touchObject.edgeHit = !0), !1 === e.options.vertical ? e.swipeLeft = o + n * r : e.swipeLeft = o + n * (e.$list.height() / e.listWidth) * r, !0 === e.options.verticalSwiping && (e.swipeLeft = o + n * r), !0 !== e.options.fade && !1 !== e.options.touchMove && (!0 === e.animating ? (e.swipeLeft = null, !1) : void e.setCSS(e.swipeLeft))))
    }, i.prototype.swipeStart = function(i) {
        var e = this,
            t;
        if (e.interrupted = !0, 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow) return e.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (t = i.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== t ? t.pageX : i.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== t ? t.pageY : i.clientY, e.dragging = !0
    }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, i.prototype.unload = function() {
        var i = this;
        $(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, i.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, i.prototype.updateArrows = function() {
        var i = this,
            e;
        e = Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, i.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, i.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, $.fn.slick = function() {
        var e = this,
            t = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            s = e.length,
            n, r;
        for (n = 0; n < s; n++)
            if ("object" == typeof t || void 0 === t ? e[n].slick = new i(e[n], t) : r = e[n].slick[t].apply(e[n].slick, o), void 0 !== r) return r;
        return e
    }
});