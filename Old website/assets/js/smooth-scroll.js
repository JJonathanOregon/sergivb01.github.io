!function(a, b) {
    "function" == typeof define && define.amd ? define("smoothScroll", b(a)) : "object" == typeof exports ? module.smoothScroll = b(a) : a.smoothScroll = b(a)
}(this, function(a) {
    "use strict";
    var d, b = {}, c = !!document.querySelector && !!a.addEventListener, e = {
        speed: 500,
        easing: "easeInOutCubic",
        offset: 0,
        updateURL: !1,
        callbackBefore: function() {},
        callbackAfter: function() {}
    }, f = function(a, b, c) {
        if ("[object Object]" === Object.prototype.toString.call(a))
            for (var d in a)
                Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a);
        else
            for (var e = 0, f = a.length; e < f; e++)
                b.call(c, a[e], e, a)
    }
    , g = function(a, b) {
        var c = {};
        return f(a, function(b, d) {
            c[d] = a[d]
        }),
        f(b, function(a, d) {
            c[d] = b[d]
        }),
        c
    }
    , h = function(a, b) {
        var c;
        return "easeInQuad" === a && (c = b * b),
        "easeOutQuad" === a && (c = b * (2 - b)),
        "easeInOutQuad" === a && (c = b < .5 ? 2 * b * b : -1 + (4 - 2 * b) * b),
        "easeInCubic" === a && (c = b * b * b),
        "easeOutCubic" === a && (c = --b * b * b + 1),
        "easeInOutCubic" === a && (c = b < .5 ? 4 * b * b * b : (b - 1) * (2 * b - 2) * (2 * b - 2) + 1),
        "easeInQuart" === a && (c = b * b * b * b),
        "easeOutQuart" === a && (c = 1 - --b * b * b * b),
        "easeInOutQuart" === a && (c = b < .5 ? 8 * b * b * b * b : 1 - 8 * --b * b * b * b),
        "easeInQuint" === a && (c = b * b * b * b * b),
        "easeOutQuint" === a && (c = 1 + --b * b * b * b * b),
        "easeInOutQuint" === a && (c = b < .5 ? 16 * b * b * b * b * b : 1 + 16 * --b * b * b * b * b),
        c || b
    }
    , i = function(a, b, c) {
        var d = 0;
        if (a.offsetParent)
            do
                d += a.offsetTop,
                a = a.offsetParent;
            while (a);return d = d - b - c,
        d >= 0 ? d : 0
    }
    , j = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
    }
    , k = function(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }
    , l = function(a) {
        var b = {};
        return a && (a = a.split(";"),
        a.forEach(function(a) {
            a = k(a),
            "" !== a && (a = a.split(":"),
            b[a[0]] = k(a[1]))
        })),
        b
    }
    , m = function(a, b) {
        history.pushState && (b || "true" === b) && history.pushState({
            pos: a.id
        }, "", a)
    }
    ;
    return b.animateScroll = function(b, c, d, f) {
        var k = g(k || e, d || {})
          , n = l(b ? b.getAttribute("data-options") : null );
        k = g(k, n);
        var s, w, x, o = document.querySelector("[data-scroll-header]"), p = null === o ? 0 : o.offsetHeight + o.offsetTop, q = a.pageYOffset, r = i(document.querySelector(c), p, parseInt(k.offset, 10)), t = r - q, u = j(), v = 0;
        b && "a" === b.tagName.toLowerCase() && f && f.preventDefault(),
        m(c, k.updateURL);
        var y = function(d, e, f) {
            var g = a.pageYOffset;
            (d == e || g == e || a.innerHeight + g >= u) && (clearInterval(f),
            k.callbackAfter(b, c))
        }
          , z = function() {
            v += 16,
            w = v / parseInt(k.speed, 10),
            w = w > 1 ? 1 : w,
            x = q + t * h(k.easing, w),
            a.scrollTo(0, Math.floor(x)),
            y(x, r, s)
        }
          , A = function() {
            k.callbackBefore(b, c),
            s = setInterval(z, 16)
        }
        ;
        0 === a.pageYOffset && a.scrollTo(0, 0),
        A()
    }
    ,
    b.init = function(a) {
        if (c) {
            d = g(e, a || {});
            var h = document.querySelectorAll("[data-scroll]");
            f(h, function(a) {
                a.addEventListener("click", b.animateScroll.bind(null , a, a.hash, d), !1)
            })
        }
    }
    ,
    b
});
