/*
 Galleria Folio Theme 2011-03-21
 http://galleria.aino.se

 Copyright (c) 2011, Aino
*/
(function (d) {
    Galleria.addTheme({
        name: "folio",
        author: "Galleria",
        version: "1.0",
        css: "galleria.folio.css",
        defaults: {
            transition: "pulse",
            thumbCrop: "width",
            imageCrop: false,
            carousel: false,
            show: false,
            easing: "galleriaOut",
            thumbEventType: Galleria.TOUCH ? "mousedown" : "click",
            _webkitCursor: true,
            _animate: true
        },
        init: function (e) {
            this.addElement("preloader", "loaded", "close").append({
                container: "preloader",
                preloader: "loaded",
                stage: "close"
            });
            var i = this,
                u = this.$("stage"),
                j = this.$("thumbnails"),
                r = this.$("images"),
                m = this.$("info"),
                v = this.$("loader"),
                o = this.$("target"),
                s = 0,
                w = o.width(),
                p = 0,
                x = e.show,
                t = false,
                B = Galleria.TOUCH ? "mousedown" : "click",
                y = function (a) {
                    i.$("info").css({
                        left: Math.max(20, d(window).width() / 2 - a / 2 + 10)
                    })
                },
                A = function (a, b) {
                    b = d.extend({
                        speed: 400,
                        width: 190,
                        onbrick: function () {},
                        onheight: function () {},
                        delay: 0,
                        debug: false
                    }, b);
                    a = d(a);
                    var c = a.children(),
                        k = a.width(),
                        l = Math.floor(k / b.width),
                        f = [],
                        g, q, n;
                    k = {
                        "float": "none",
                        position: "absolute",
                        display: d.browser.safari ? "inline-block" : "block"
                    };
                    if (a.data("colCount") !== l) {
                        a.data("colCount", l);
                        if (c.length) {
                            for (g = 0; g < l; g++) f[g] = 0;
                            a.css("position", "relative");
                            c.css(k).each(function (C, h) {
                                h = d(h);
                                for (g = l - 1; g > -1; g--) if (f[g] === Math.min.apply(window, f)) q = g;
                                n = {
                                    top: f[q],
                                    left: b.width * q
                                };
                                if (!(typeof n.top !== "number" || typeof n.left !== "number")) {
                                    if (b.speed) window.setTimeout(function (D, z, E) {
                                        return function () {
                                            D.animate(E, {
                                                easing: "galleriaOut",
                                                duration: z.speed,
                                                complete: z.onbrick
                                            })
                                        }
                                    }(h, b, n), C * b.delay);
                                    else {
                                        h.css(n);
                                        b.onbrick.call(h)
                                    }
                                    h.data("height") || h.data("height", h.outerHeight(true));
                                    f[q] += h.data("height")
                                }
                            });
                            c = Math.max.apply(window, f);
                            if (!(c < 0)) if (typeof c === "number") if (b.speed) a.animate({
                                height: Math.max.apply(window, f)
                            }, b.speed, b.onheight);
                            else {
                                a.height(Math.max.apply(window, f));
                                b.onheight.call(a)
                            }
                        }
                    }
                };
            Galleria.OPERA && this.$("stage").css("display", "none");
            this.bind("fullscreen_enter", function () {
                r.css("visibility", "hidden");
                u.show();
                this.$("container").css("height", "100%");
                t = true
            });
            this.bind("fullscreen_exit", function () {
                u.hide();
                j.show();
                m.hide();
                t = false
            });
            this.bind("thumbnail", function (a) {
                this.addElement("plus");
                var b = a.thumbTarget,
                    c = this.$("plus").css({
                        display: "block"
                    }).insertAfter(b),
                    k = 0;
                e.showInfo && this.hasInfo(a.index) && c.append("<span>" + this.getData(a.index).title + "</span>");
                p = p || d(b).parent().outerWidth(true);
                d(b).css("opacity", 0);
                Galleria.IE ? c.hide() : c.css("opacity", 0);
                d(b).parent().hover(function () {
                    Galleria.IE ? c.show() : c.stop().css("opacity", 1)
                }, function () {
                    Galleria.IE ? c.hide() : c.stop().animate({
                        opacity: 0
                    }, 300)
                }).data("index", a.index);
                s++;
                this.$("loaded").css("width", s / this.getDataLength() * 100 + "%");
                if (s === this.getDataLength()) {
                    this.$("preloader").fadeOut(100);
                    A(j, {
                        width: p,
                        speed: e._animate ? 400 : 0,
                        onbrick: function () {
                            var l = this;
                            window.setTimeout(function () {
                                d(l).find("img").animate({
                                    opacity: 1
                                }, e.transition_speed).parent().bind(B, function () {
                                    j.hide();
                                    m.hide();
                                    var f = d(this);
                                    i.enterFullscreen(function () {
                                        if (f.data("index") === x) {
                                            r.css("visibility", "visible");
                                            m.toggle(i.hasInfo())
                                        }
                                    })
                                })
                            }, e._animate ? k * 100 : 0);
                            k++
                        },
                        onheight: function () {
                            o.height(j.height())
                        }
                    })
                }
            });
            this.bind("loadstart", function (a) {
                a.cached || v.show()
            });
            this.bind("loadfinish", function (a) {
                m.hide();
                x = this.getIndex();
                r.css("visibility", "visible");
                v.hide();
                if (this.hasInfo() && e.showInfo) m.fadeIn(e.transition ? e.transitionSpeed : 0);
                y(a.imageTarget.width)
            });
            this.bind("image", function (a) {
                d(a.imageTarget).click(function () {
                    i.exitFullscreen()
                })
            });
            if (!Galleria.TOUCH) {
                this.addIdleState(this.get("image-nav-left"), {
                    left: -100
                });
                this.addIdleState(this.get("image-nav-right"), {
                    right: -100
                });
                this.addIdleState(this.get("info"), {
                    opacity: 0
                });
                this.addIdleState(this.get("close"), {
                    top: -50
                })
            }
            this.$("container").css({
                width: e.width,
                height: "auto"
            });
            e._webkitCursor && Galleria.WEBKIT && this.$("image-nav-right,image-nav-left").addClass("cur");
            this.$("close").click(function () {
                i.exitFullscreen()
            });
            d(window).resize(function () {
                if (t) i.getActiveImage() && y(i.getActiveImage().width);
                else {
                    var a = o.width();
                    if (a !== w) {
                        w = a;
                        A(j, {
                            width: p,
                            delay: 50,
                            debug: true,
                            onheight: function () {
                                o.height(j.height())
                            }
                        })
                    }
                }
            })
        }
    })
})(jQuery);
