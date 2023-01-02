﻿/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function() {
  function ka(a, e) {
    CKEDITOR.tools.extend(this, e, {
      editor: a,
      id: "cke-" + CKEDITOR.tools.getUniqueId(),
      area: a._.notificationArea
    });
    e.type || (this.type = "info");
    this.element = this._createElement();
    a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
  }

  function la(a) {
    var e = this;
    this.editor = a;
    this.notifications = [];
    this.element = this._createElement();
    this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this);
    this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout,
      this);
    a.on("destroy", function() {
      e._removeListeners();
      e.element.remove()
    })
  }
  window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
      var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
        e = {
          timestamp: "H9D6",
          version: "4.8.0 (Full)",
          revision: "6102c2b",
          rnd: Math.floor(900 * Math.random()) + 100,
          _: {
            pending: [],
            basePathSrcPattern: a
          },
          status: "unloaded",
          basePath: function() {
            var c = window.CKEDITOR_BASEPATH || "";
            if(!c)
              for(var b = document.getElementsByTagName("script"), e = 0; e < b.length; e++) {
                var d = b[e].src.match(a);
                if(d) {
                  c = d[1];
                  break
                }
              } - 1 == c.indexOf(":/") && "//" != c.slice(0, 2) && (c = 0 === c.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + c : location.href.match(/^[^\?]*\/(?:)/)[0] + c);
            if(!c) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
            return c
          }(),
          getUrl: function(a) {
            -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
            this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ?
              "\x26" : "?") + "t\x3d" + this.timestamp);
            return a
          },
          domReady: function() {
            function a() {
              try {
                document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), c()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), c())
              } catch(d) {}
            }

            function c() {
              for(var a; a = b.shift();) a()
            }
            var b = [];
            return function(d) {
              function c() {
                try {
                  document.documentElement.doScroll("left")
                } catch(g) {
                  setTimeout(c, 1);
                  return
                }
                a()
              }
              b.push(d);
              "complete" === document.readyState && setTimeout(a,
                1);
              if(1 == b.length)
                if(document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                else if(document.attachEvent) {
                document.attachEvent("onreadystatechange", a);
                window.attachEvent("onload", a);
                d = !1;
                try {
                  d = !window.frameElement
                } catch(m) {}
                document.documentElement.doScroll && d && c()
              }
            }
          }()
        },
        b = window.CKEDITOR_GETURL;
      if(b) {
        var c = e.getUrl;
        e.getUrl = function(a) {
          return b.call(e, a) || c.call(e, a)
        }
      }
      return e
    }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn =
      function(a) {
        var e = CKEDITOR.event.prototype,
          b;
        for(b in e) null == a[b] && (a[b] = e[b])
      }, CKEDITOR.event.prototype = function() {
        function a(a) {
          var f = e(this);
          return f[a] || (f[a] = new b(a))
        }
        var e = function(a) {
            a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
            return a.events || (a.events = {})
          },
          b = function(a) {
            this.name = a;
            this.listeners = []
          };
        b.prototype = {
          getListenerIndex: function(a) {
            for(var b = 0, e = this.listeners; b < e.length; b++)
              if(e[b].fn == a) return b;
            return -1
          }
        };
        return {
          define: function(c, b) {
            var e = a.call(this, c);
            CKEDITOR.tools.extend(e,
              b, !0)
          },
          on: function(c, b, e, h, d) {
            function k(a, g, d, k) {
              a = {
                name: c,
                sender: this,
                editor: a,
                data: g,
                listenerData: h,
                stop: d,
                cancel: k,
                removeListener: m
              };
              return !1 === b.call(e, a) ? !1 : a.data
            }

            function m() {
              n.removeListener(c, b)
            }
            var g = a.call(this, c);
            if(0 > g.getListenerIndex(b)) {
              g = g.listeners;
              e || (e = this);
              isNaN(d) && (d = 10);
              var n = this;
              k.fn = b;
              k.priority = d;
              for(var p = g.length - 1; 0 <= p; p--)
                if(g[p].priority <= d) return g.splice(p + 1, 0, k), {
                  removeListener: m
                };
              g.unshift(k)
            }
            return {
              removeListener: m
            }
          },
          once: function() {
            var a = Array.prototype.slice.call(arguments),
              b = a[1];
            a[1] = function(a) {
              a.removeListener();
              return b.apply(this, arguments)
            };
            return this.on.apply(this, a)
          },
          capture: function() {
            CKEDITOR.event.useCapture = 1;
            var a = this.on.apply(this, arguments);
            CKEDITOR.event.useCapture = 0;
            return a
          },
          fire: function() {
            var a = 0,
              b = function() {
                a = 1
              },
              l = 0,
              h = function() {
                l = 1
              };
            return function(d, k, m) {
              var g = e(this)[d];
              d = a;
              var n = l;
              a = l = 0;
              if(g) {
                var p = g.listeners;
                if(p.length)
                  for(var p = p.slice(0), t, A = 0; A < p.length; A++) {
                    if(g.errorProof) try {
                      t = p[A].call(this, m, k, b, h)
                    } catch(u) {} else t = p[A].call(this,
                      m, k, b, h);
                    !1 === t ? l = 1 : "undefined" != typeof t && (k = t);
                    if(a || l) break
                  }
              }
              k = l ? !1 : "undefined" == typeof k ? !0 : k;
              a = d;
              l = n;
              return k
            }
          }(),
          fireOnce: function(a, b, l) {
            b = this.fire(a, b, l);
            delete e(this)[a];
            return b
          },
          removeListener: function(a, b) {
            var l = e(this)[a];
            if(l) {
              var h = l.getListenerIndex(b);
              0 <= h && l.listeners.splice(h, 1)
            }
          },
          removeAllListeners: function() {
            var a = e(this),
              b;
            for(b in a) delete a[b]
          },
          hasListeners: function(a) {
            return(a = e(this)[a]) && 0 < a.listeners.length
          }
        }
      }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
      CKEDITOR._.pending.push([this,
        arguments
      ]);
      CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function(a, e) {
      a in {
        instanceReady: 1,
        loaded: 1
      } && (this[a] = !0);
      return CKEDITOR.event.prototype.fire.call(this, a, e, this)
    }, CKEDITOR.editor.prototype.fireOnce = function(a, e) {
      a in {
        instanceReady: 1,
        loaded: 1
      } && (this[a] = !0);
      return CKEDITOR.event.prototype.fireOnce.call(this, a, e, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
      var a = navigator.userAgent.toLowerCase(),
        e = a.match(/edge[ \/](\d+.?\d*)/),
        b = -1 < a.indexOf("trident/"),
        b = !(!e && !b),
        b = {
          ie: b,
          edge: !!e,
          webkit: !b && -1 < a.indexOf(" applewebkit/"),
          air: -1 < a.indexOf(" adobeair/"),
          mac: -1 < a.indexOf("macintosh"),
          quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
          mobile: -1 < a.indexOf("mobile"),
          iOS: /(ipad|iphone|ipod)/.test(a),
          isCustomDomain: function() {
            if(!this.ie) return !1;
            var a = document.domain,
              b = window.location.hostname;
            return a != b && a != "[" + b + "]"
          },
          secure: "https:" == location.protocol
        };
      b.gecko = "Gecko" == navigator.product &&
        !b.webkit && !b.ie;
      b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
      var c = 0;
      b.ie && (c = e ? parseFloat(e[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
      b.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), c = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
      b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
      b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
      b.version =
        c;
      b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c);
      b.hidpi = 2 <= window.devicePixelRatio;
      b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
      b.needsNbspFiller = b.ie && 11 > c;
      b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
      b.quirks && (b.cssClass += " cke_browser_quirks");
      b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
      b.air && (b.cssClass += " cke_browser_air");
      b.iOS && (b.cssClass += " cke_browser_ios");
      b.hidpi && (b.cssClass += " cke_hidpi");
      return b
    }()), "unloaded" == CKEDITOR.status && function() {
      CKEDITOR.event.implementOn(CKEDITOR);
      CKEDITOR.loadFullCore = function() {
        if("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
        else {
          delete CKEDITOR.loadFullCore;
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.src = CKEDITOR.basePath + "ckeditor.js";
          document.getElementsByTagName("head")[0].appendChild(a)
        }
      };
      CKEDITOR.loadFullCoreTimeout = 0;
      CKEDITOR.add = function(a) {
        (this._.pending || (this._.pending = [])).push(a)
      };
      (function() {
        CKEDITOR.domReady(function() {
          var a =
            CKEDITOR.loadFullCore,
            e = CKEDITOR.loadFullCoreTimeout;
          a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : e && setTimeout(function() {
            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
          }, 1E3 * e))
        })
      })();
      CKEDITOR.status = "basic_loaded"
    }(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function(a, e) {
      CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
        type: "warn",
        errorCode: a,
        additionalData: e
      })
    }, CKEDITOR.error =
    function(a, e) {
      CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", {
        type: "error",
        errorCode: a,
        additionalData: e
      })
    }, CKEDITOR.on("log", function(a) {
      if(window.console && window.console.log) {
        var e = console[a.data.type] ? a.data.type : "log",
          b = a.data.errorCode;
        if(a = a.data.additionalData) console[e]("[CKEDITOR] Error code: " + b + ".", a);
        else console[e]("[CKEDITOR] Error code: " + b + ".");
        console[e]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" +
          b)
      }
    }, null, null, 999), CKEDITOR.dom = {},
    function() {
      var a = [],
        e = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
        b = /&/g,
        c = />/g,
        f = /</g,
        l = /"/g,
        h = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
        d = {
          lt: "\x3c",
          gt: "\x3e",
          amp: "\x26",
          quot: '"',
          nbsp: " ",
          shy: "­"
        },
        k = function(a, g) {
          return "#" == g[0] ? String.fromCharCode(parseInt(g.slice(1), 10)) : d[g]
        };
      CKEDITOR.on("reset", function() {
        a = []
      });
      CKEDITOR.tools = {
        arrayCompare: function(a, g) {
          if(!a && !g) return !0;
          if(!a || !g || a.length != g.length) return !1;
          for(var d =
              0; d < a.length; d++)
            if(a[d] != g[d]) return !1;
          return !0
        },
        getIndex: function(a, g) {
          for(var d = 0; d < a.length; ++d)
            if(g(a[d])) return d;
          return -1
        },
        clone: function(a) {
          var g;
          if(a && a instanceof Array) {
            g = [];
            for(var d = 0; d < a.length; d++) g[d] = CKEDITOR.tools.clone(a[d]);
            return g
          }
          if(null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
          g = new a.constructor;
          for(d in a) g[d] = CKEDITOR.tools.clone(a[d]);
          return g
        },
        capitalize: function(a,
          g) {
          return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase())
        },
        extend: function(a) {
          var g = arguments.length,
            d, b;
          "boolean" == typeof(d = arguments[g - 1]) ? g-- : "boolean" == typeof(d = arguments[g - 2]) && (b = arguments[g - 1], g -= 2);
          for(var c = 1; c < g; c++) {
            var k = arguments[c],
              f;
            for(f in k)
              if(!0 === d || null == a[f])
                if(!b || f in b) a[f] = k[f]
          }
          return a
        },
        prototypedCopy: function(a) {
          var g = function() {};
          g.prototype = a;
          return new g
        },
        copy: function(a) {
          var g = {},
            d;
          for(d in a) g[d] = a[d];
          return g
        },
        isArray: function(a) {
          return "[object Array]" ==
            Object.prototype.toString.call(a)
        },
        isEmpty: function(a) {
          for(var g in a)
            if(a.hasOwnProperty(g)) return !1;
          return !0
        },
        cssVendorPrefix: function(a, g, d) {
          if(d) return e + a + ":" + g + ";" + a + ":" + g;
          d = {};
          d[a] = g;
          d[e + a] = g;
          return d
        },
        cssStyleToDomStyle: function() {
          var a = document.createElement("div").style,
            g = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
          return function(a) {
            return "float" == a ? g : a.replace(/-./g, function(a) {
              return a.substr(1).toUpperCase()
            })
          }
        }(),
        buildStyleHtml: function(a) {
          a = [].concat(a);
          for(var g, d = [], b = 0; b < a.length; b++)
            if(g = a[b]) /@import|[{}]/.test(g) ? d.push("\x3cstyle\x3e" + g + "\x3c/style\x3e") : d.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + g + '"\x3e');
          return d.join("")
        },
        htmlEncode: function(a) {
          return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(f, "\x26lt;")
        },
        htmlDecode: function(a) {
          return a.replace(h, k)
        },
        htmlEncodeAttr: function(a) {
          return CKEDITOR.tools.htmlEncode(a).replace(l, "\x26quot;")
        },
        htmlDecodeAttr: function(a) {
          return CKEDITOR.tools.htmlDecode(a)
        },
        transformPlainTextToHtml: function(a, g) {
          var d = g == CKEDITOR.ENTER_BR,
            b = this.htmlEncode(a.replace(/\r\n/g, "\n")),
            b = b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
            c = g == CKEDITOR.ENTER_P ? "p" : "div";
          if(!d) {
            var k = /\n{2}/g;
            if(k.test(b)) var f = "\x3c" + c + "\x3e",
              e = "\x3c/" + c + "\x3e",
              b = f + b.replace(k, function() {
                return e + f
              }) + e
          }
          b = b.replace(/\n/g, "\x3cbr\x3e");
          d || (b = b.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + c + "\x3e)"), function(a) {
            return CKEDITOR.tools.repeat(a, 2)
          }));
          b = b.replace(/^ | $/g, "\x26nbsp;");
          return b = b.replace(/(>|\s) /g,
            function(a, g) {
              return g + "\x26nbsp;"
            }).replace(/ (?=<)/g, "\x26nbsp;")
        },
        getNextNumber: function() {
          var a = 0;
          return function() {
            return ++a
          }
        }(),
        getNextId: function() {
          return "cke_" + this.getNextNumber()
        },
        getUniqueId: function() {
          for(var a = "e", g = 0; 8 > g; g++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
          return a
        },
        override: function(a, g) {
          var d = g(a);
          d.prototype = a.prototype;
          return d
        },
        setTimeout: function(a, g, d, b, c) {
          c || (c = window);
          d || (d = c);
          return c.setTimeout(function() {
              b ? a.apply(d, [].concat(b)) : a.apply(d)
            },
            g || 0)
        },
        trim: function() {
          var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
          return function(g) {
            return g.replace(a, "")
          }
        }(),
        ltrim: function() {
          var a = /^[ \t\n\r]+/g;
          return function(g) {
            return g.replace(a, "")
          }
        }(),
        rtrim: function() {
          var a = /[ \t\n\r]+$/g;
          return function(g) {
            return g.replace(a, "")
          }
        }(),
        indexOf: function(a, g) {
          if("function" == typeof g)
            for(var d = 0, b = a.length; d < b; d++) {
              if(g(a[d])) return d
            } else {
              if(a.indexOf) return a.indexOf(g);
              d = 0;
              for(b = a.length; d < b; d++)
                if(a[d] === g) return d
            }
          return -1
        },
        search: function(a, g) {
          var d = CKEDITOR.tools.indexOf(a,
            g);
          return 0 <= d ? a[d] : null
        },
        bind: function(a, g) {
          return function() {
            return a.apply(g, arguments)
          }
        },
        createClass: function(a) {
          var g = a.$,
            d = a.base,
            b = a.privates || a._,
            c = a.proto;
          a = a.statics;
          !g && (g = function() {
            d && this.base.apply(this, arguments)
          });
          if(b) var k = g,
            g = function() {
              var a = this._ || (this._ = {}),
                g;
              for(g in b) {
                var d = b[g];
                a[g] = "function" == typeof d ? CKEDITOR.tools.bind(d, this) : d
              }
              k.apply(this, arguments)
            };
          d && (g.prototype = this.prototypedCopy(d.prototype), g.prototype.constructor = g, g.base = d, g.baseProto = d.prototype, g.prototype.base =
            function() {
              this.base = d.prototype.base;
              d.apply(this, arguments);
              this.base = arguments.callee
            });
          c && this.extend(g.prototype, c, !0);
          a && this.extend(g, a, !0);
          return g
        },
        addFunction: function(d, g) {
          return a.push(function() {
            return d.apply(g || this, arguments)
          }) - 1
        },
        removeFunction: function(d) {
          a[d] = null
        },
        callFunction: function(d) {
          var g = a[d];
          return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
        },
        cssLength: function() {
          var a = /^-?\d+\.?\d*px$/,
            g;
          return function(d) {
            g = CKEDITOR.tools.trim(d + "") + "px";
            return a.test(g) ?
              g : d || ""
          }
        }(),
        convertToPx: function() {
          var a;
          return function(g) {
            a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
            return /%$/.test(g) ? g : (a.setStyle("width", g), a.$.clientWidth)
          }
        }(),
        repeat: function(a, g) {
          return Array(g + 1).join(a)
        },
        tryThese: function() {
          for(var a, g = 0, d = arguments.length; g < d; g++) {
            var b = arguments[g];
            try {
              a = b();
              break
            } catch(c) {}
          }
          return a
        },
        genKey: function() {
          return Array.prototype.slice.call(arguments).join("-")
        },
        defer: function(a) {
          return function() {
            var g = arguments,
              d = this;
            window.setTimeout(function() {
              a.apply(d, g)
            }, 0)
          }
        },
        normalizeCssText: function(a, g) {
          var d = [],
            b, c = CKEDITOR.tools.parseCssText(a, !0, g);
          for(b in c) d.push(b + ":" + c[b]);
          d.sort();
          return d.length ? d.join(";") + ";" : ""
        },
        convertRgbToHex: function(a) {
          return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, d, m, b) {
            a = [d, m, b];
            for(d = 0; 3 > d; d++) a[d] = ("0" + parseInt(a[d], 10).toString(16)).slice(-2);
            return "#" + a.join("")
          })
        },
        normalizeHex: function(a) {
          return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function(a, d, m, b) {
            a = d.toLowerCase();
            3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
            return "#" + a + b
          })
        },
        parseCssText: function(a, g, d) {
          var b = {};
          d && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
          a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
          if(!a || ";" == a) return b;
          a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
            function(a, d, m) {
              g && (d = d.toLowerCase(), "font-family" == d && (m = m.replace(/\s*,\s*/g, ",")), m = CKEDITOR.tools.trim(m));
              b[d] = m
            });
          return b
        },
        writeCssText: function(a, g) {
          var d, b = [];
          for(d in a) b.push(d + ":" + a[d]);
          g && b.sort();
          return b.join("; ")
        },
        objectCompare: function(a, g, d) {
          var b;
          if(!a && !g) return !0;
          if(!a || !g) return !1;
          for(b in a)
            if(a[b] != g[b]) return !1;
          if(!d)
            for(b in g)
              if(a[b] != g[b]) return !1;
          return !0
        },
        objectKeys: function(a) {
          var g = [],
            d;
          for(d in a) g.push(d);
          return g
        },
        convertArrayToObject: function(a, g) {
          var d = {};
          1 ==
            arguments.length && (g = !0);
          for(var b = 0, c = a.length; b < c; ++b) d[a[b]] = g;
          return d
        },
        fixDomain: function() {
          for(var a;;) try {
            a = window.parent.document.domain;
            break
          } catch(g) {
            a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
            if(!a) break;
            document.domain = a
          }
          return !!a
        },
        eventsBuffer: function(a, g, d) {
          function b() {
            k = (new Date).getTime();
            c = !1;
            d ? g.call(d) : g()
          }
          var c, k = 0;
          return {
            input: function() {
              if(!c) {
                var g = (new Date).getTime() - k;
                g < a ? c = setTimeout(b, a - g) : b()
              }
            },
            reset: function() {
              c && clearTimeout(c);
              c = k = 0
            }
          }
        },
        enableHtml5Elements: function(a,
          g) {
          for(var d = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), b = d.length, c; b--;) c = a.createElement(d[b]), g && a.appendChild(c)
        },
        checkIfAnyArrayItemMatches: function(a, g) {
          for(var d = 0, b = a.length; d < b; ++d)
            if(a[d].match(g)) return !0;
          return !1
        },
        checkIfAnyObjectPropertyMatches: function(a, g) {
          for(var d in a)
            if(d.match(g)) return !0;
          return !1
        },
        keystrokeToString: function(a, g) {
          var d = this.keystrokeToArray(a,
            g);
          d.display = d.display.join("+");
          d.aria = d.aria.join("+");
          return d
        },
        keystrokeToArray: function(a, g) {
          var d = g & 16711680,
            b = g & 65535,
            c = CKEDITOR.env.mac,
            k = [],
            f = [];
          d & CKEDITOR.CTRL && (k.push(c ? "⌘" : a[17]), f.push(c ? a[224] : a[17]));
          d & CKEDITOR.ALT && (k.push(c ? "⌥" : a[18]), f.push(a[18]));
          d & CKEDITOR.SHIFT && (k.push(c ? "⇧" : a[16]), f.push(a[16]));
          b && (a[b] ? (k.push(a[b]), f.push(a[b])) : (k.push(String.fromCharCode(b)), f.push(String.fromCharCode(b))));
          return {
            display: k,
            aria: f
          }
        },
        transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
        getCookie: function(a) {
          a = a.toLowerCase();
          for(var g = document.cookie.split(";"), d, b, c = 0; c < g.length; c++)
            if(d = g[c].split("\x3d"), b = decodeURIComponent(CKEDITOR.tools.trim(d[0]).toLowerCase()), b === a) return decodeURIComponent(1 < d.length ? d[1] : "");
          return null
        },
        setCookie: function(a, g) {
          document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(g) + ";path\x3d/"
        },
        getCsrfToken: function() {
          var a = CKEDITOR.tools.getCookie("ckCsrfToken");
          if(!a || 40 != a.length) {
            var a = [],
              g = "";
            if(window.crypto && window.crypto.getRandomValues) a =
              new Uint8Array(40), window.crypto.getRandomValues(a);
            else
              for(var d = 0; 40 > d; d++) a.push(Math.floor(256 * Math.random()));
            for(d = 0; d < a.length; d++) var b = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[d] % 36),
              g = g + (.5 < Math.random() ? b.toUpperCase() : b);
            a = g;
            CKEDITOR.tools.setCookie("ckCsrfToken", a)
          }
          return a
        },
        escapeCss: function(a) {
          return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : ""
        },
        getMouseButton: function(a) {
          var g = (a = a.data) && a.$;
          return a &&
            g ? CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 4 === g.button ? CKEDITOR.MOUSE_BUTTON_MIDDLE : 1 === g.button ? CKEDITOR.MOUSE_BUTTON_LEFT : CKEDITOR.MOUSE_BUTTON_RIGHT : g.button : !1
        },
        style: {
          parse: {
            _colors: {
              aliceblue: "#F0F8FF",
              antiquewhite: "#FAEBD7",
              aqua: "#00FFFF",
              aquamarine: "#7FFFD4",
              azure: "#F0FFFF",
              beige: "#F5F5DC",
              bisque: "#FFE4C4",
              black: "#000000",
              blanchedalmond: "#FFEBCD",
              blue: "#0000FF",
              blueviolet: "#8A2BE2",
              brown: "#A52A2A",
              burlywood: "#DEB887",
              cadetblue: "#5F9EA0",
              chartreuse: "#7FFF00",
              chocolate: "#D2691E",
              coral: "#FF7F50",
              cornflowerblue: "#6495ED",
              cornsilk: "#FFF8DC",
              crimson: "#DC143C",
              cyan: "#00FFFF",
              darkblue: "#00008B",
              darkcyan: "#008B8B",
              darkgoldenrod: "#B8860B",
              darkgray: "#A9A9A9",
              darkgreen: "#006400",
              darkgrey: "#A9A9A9",
              darkkhaki: "#BDB76B",
              darkmagenta: "#8B008B",
              darkolivegreen: "#556B2F",
              darkorange: "#FF8C00",
              darkorchid: "#9932CC",
              darkred: "#8B0000",
              darksalmon: "#E9967A",
              darkseagreen: "#8FBC8F",
              darkslateblue: "#483D8B",
              darkslategray: "#2F4F4F",
              darkslategrey: "#2F4F4F",
              darkturquoise: "#00CED1",
              darkviolet: "#9400D3",
              deeppink: "#FF1493",
              deepskyblue: "#00BFFF",
              dimgray: "#696969",
              dimgrey: "#696969",
              dodgerblue: "#1E90FF",
              firebrick: "#B22222",
              floralwhite: "#FFFAF0",
              forestgreen: "#228B22",
              fuchsia: "#FF00FF",
              gainsboro: "#DCDCDC",
              ghostwhite: "#F8F8FF",
              gold: "#FFD700",
              goldenrod: "#DAA520",
              gray: "#808080",
              green: "#008000",
              greenyellow: "#ADFF2F",
              grey: "#808080",
              honeydew: "#F0FFF0",
              hotpink: "#FF69B4",
              indianred: "#CD5C5C",
              indigo: "#4B0082",
              ivory: "#FFFFF0",
              khaki: "#F0E68C",
              lavender: "#E6E6FA",
              lavenderblush: "#FFF0F5",
              lawngreen: "#7CFC00",
              lemonchiffon: "#FFFACD",
              lightblue: "#ADD8E6",
              lightcoral: "#F08080",
              lightcyan: "#E0FFFF",
              lightgoldenrodyellow: "#FAFAD2",
              lightgray: "#D3D3D3",
              lightgreen: "#90EE90",
              lightgrey: "#D3D3D3",
              lightpink: "#FFB6C1",
              lightsalmon: "#FFA07A",
              lightseagreen: "#20B2AA",
              lightskyblue: "#87CEFA",
              lightslategray: "#778899",
              lightslategrey: "#778899",
              lightsteelblue: "#B0C4DE",
              lightyellow: "#FFFFE0",
              lime: "#00FF00",
              limegreen: "#32CD32",
              linen: "#FAF0E6",
              magenta: "#FF00FF",
              maroon: "#800000",
              mediumaquamarine: "#66CDAA",
              mediumblue: "#0000CD",
              mediumorchid: "#BA55D3",
              mediumpurple: "#9370DB",
              mediumseagreen: "#3CB371",
              mediumslateblue: "#7B68EE",
              mediumspringgreen: "#00FA9A",
              mediumturquoise: "#48D1CC",
              mediumvioletred: "#C71585",
              midnightblue: "#191970",
              mintcream: "#F5FFFA",
              mistyrose: "#FFE4E1",
              moccasin: "#FFE4B5",
              navajowhite: "#FFDEAD",
              navy: "#000080",
              oldlace: "#FDF5E6",
              olive: "#808000",
              olivedrab: "#6B8E23",
              orange: "#FFA500",
              orangered: "#FF4500",
              orchid: "#DA70D6",
              palegoldenrod: "#EEE8AA",
              palegreen: "#98FB98",
              paleturquoise: "#AFEEEE",
              palevioletred: "#DB7093",
              papayawhip: "#FFEFD5",
              peachpuff: "#FFDAB9",
              peru: "#CD853F",
              pink: "#FFC0CB",
              plum: "#DDA0DD",
              powderblue: "#B0E0E6",
              purple: "#800080",
              rebeccapurple: "#663399",
              red: "#FF0000",
              rosybrown: "#BC8F8F",
              royalblue: "#4169E1",
              saddlebrown: "#8B4513",
              salmon: "#FA8072",
              sandybrown: "#F4A460",
              seagreen: "#2E8B57",
              seashell: "#FFF5EE",
              sienna: "#A0522D",
              silver: "#C0C0C0",
              skyblue: "#87CEEB",
              slateblue: "#6A5ACD",
              slategray: "#708090",
              slategrey: "#708090",
              snow: "#FFFAFA",
              springgreen: "#00FF7F",
              steelblue: "#4682B4",
              tan: "#D2B48C",
              teal: "#008080",
              thistle: "#D8BFD8",
              tomato: "#FF6347",
              turquoise: "#40E0D0",
              violet: "#EE82EE",
              wheat: "#F5DEB3",
              white: "#FFFFFF",
              whitesmoke: "#F5F5F5",
              yellow: "#FFFF00",
              yellowgreen: "#9ACD32"
            },
            _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "),
            _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,
            _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
            _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
            background: function(a) {
              var g = {},
                d = this._findColor(a);
              d.length && (g.color = d[0], CKEDITOR.tools.array.forEach(d,
                function(g) {
                  a = a.replace(g, "")
                }));
              if(a = CKEDITOR.tools.trim(a)) g.unprocessed = a;
              return g
            },
            margin: function(a) {
              function g(a) {
                d.top = b[a[0]];
                d.right = b[a[1]];
                d.bottom = b[a[2]];
                d.left = b[a[3]]
              }
              var d = {},
                b = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
              switch(b.length) {
                case 1:
                  g([0, 0, 0, 0]);
                  break;
                case 2:
                  g([0, 1, 0, 1]);
                  break;
                case 3:
                  g([0, 1, 2, 1]);
                  break;
                case 4:
                  g([0, 1, 2, 3])
              }
              return d
            },
            border: function(a) {
              var g = {};
              a = a.split(/\s+/);
              CKEDITOR.tools.array.forEach(a, function(a) {
                if(!g.color) {
                  var d = CKEDITOR.tools.style.parse._findColor(a);
                  if(d.length) {
                    g.color = d[0];
                    return
                  }
                }
                g.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !g.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (g.width = a) : g.style = a
              });
              return g
            },
            _findColor: function(a) {
              var g = [],
                d = CKEDITOR.tools.array,
                g = g.concat(a.match(this._rgbaRegExp) || []),
                g = g.concat(a.match(this._hslaRegExp) || []);
              return g = g.concat(d.filter(a.split(/\s+/), function(a) {
                return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors
              }))
            }
          }
        },
        array: {
          filter: function(a, g, d) {
            var b = [];
            this.forEach(a, function(c, k) {
              g.call(d, c, k, a) && b.push(c)
            });
            return b
          },
          forEach: function(a, g, d) {
            var b = a.length,
              c;
            for(c = 0; c < b; c++) g.call(d, a[c], c, a)
          },
          map: function(a, g, d) {
            for(var b = [], c = 0; c < a.length; c++) b.push(g.call(d, a[c], c, a));
            return b
          },
          reduce: function(a, g, d, b) {
            for(var c = 0; c < a.length; c++) d = g.call(b, d, a[c], c, a);
            return d
          }
        },
        object: {
          findKey: function(a, g) {
            if("object" !== typeof a) return null;
            for(var d in a)
              if(a[d] === g) return d;
            return null
          }
        }
      };
      CKEDITOR.tools.array.indexOf =
        CKEDITOR.tools.indexOf;
      CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray;
      CKEDITOR.MOUSE_BUTTON_LEFT = 0;
      CKEDITOR.MOUSE_BUTTON_MIDDLE = 1;
      CKEDITOR.MOUSE_BUTTON_RIGHT = 2
    }(), CKEDITOR.dtd = function() {
      var a = CKEDITOR.tools.extend,
        e = function(a, g) {
          for(var d = CKEDITOR.tools.clone(a), b = 1; b < arguments.length; b++) {
            g = arguments[b];
            for(var c in g) delete d[c]
          }
          return d
        },
        b = {},
        c = {},
        f = {
          address: 1,
          article: 1,
          aside: 1,
          blockquote: 1,
          details: 1,
          div: 1,
          dl: 1,
          fieldset: 1,
          figure: 1,
          footer: 1,
          form: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          header: 1,
          hgroup: 1,
          hr: 1,
          main: 1,
          menu: 1,
          nav: 1,
          ol: 1,
          p: 1,
          pre: 1,
          section: 1,
          table: 1,
          ul: 1
        },
        l = {
          command: 1,
          link: 1,
          meta: 1,
          noscript: 1,
          script: 1,
          style: 1
        },
        h = {},
        d = {
          "#": 1
        },
        k = {
          center: 1,
          dir: 1,
          noframes: 1
        };
      a(b, {
        a: 1,
        abbr: 1,
        area: 1,
        audio: 1,
        b: 1,
        bdi: 1,
        bdo: 1,
        br: 1,
        button: 1,
        canvas: 1,
        cite: 1,
        code: 1,
        command: 1,
        datalist: 1,
        del: 1,
        dfn: 1,
        em: 1,
        embed: 1,
        i: 1,
        iframe: 1,
        img: 1,
        input: 1,
        ins: 1,
        kbd: 1,
        keygen: 1,
        label: 1,
        map: 1,
        mark: 1,
        meter: 1,
        noscript: 1,
        object: 1,
        output: 1,
        progress: 1,
        q: 1,
        ruby: 1,
        s: 1,
        samp: 1,
        script: 1,
        select: 1,
        small: 1,
        span: 1,
        strong: 1,
        sub: 1,
        sup: 1,
        textarea: 1,
        time: 1,
        u: 1,
        "var": 1,
        video: 1,
        wbr: 1
      }, d, {
        acronym: 1,
        applet: 1,
        basefont: 1,
        big: 1,
        font: 1,
        isindex: 1,
        strike: 1,
        style: 1,
        tt: 1
      });
      a(c, f, b, k);
      e = {
        a: e(b, {
          a: 1,
          button: 1
        }),
        abbr: b,
        address: c,
        area: h,
        article: c,
        aside: c,
        audio: a({
          source: 1,
          track: 1
        }, c),
        b: b,
        base: h,
        bdi: b,
        bdo: b,
        blockquote: c,
        body: c,
        br: h,
        button: e(b, {
          a: 1,
          button: 1
        }),
        canvas: b,
        caption: c,
        cite: b,
        code: b,
        col: h,
        colgroup: {
          col: 1
        },
        command: h,
        datalist: a({
          option: 1
        }, b),
        dd: c,
        del: b,
        details: a({
          summary: 1
        }, c),
        dfn: b,
        div: c,
        dl: {
          dt: 1,
          dd: 1
        },
        dt: c,
        em: b,
        embed: h,
        fieldset: a({
          legend: 1
        }, c),
        figcaption: c,
        figure: a({
            figcaption: 1
          },
          c),
        footer: c,
        form: c,
        h1: b,
        h2: b,
        h3: b,
        h4: b,
        h5: b,
        h6: b,
        head: a({
          title: 1,
          base: 1
        }, l),
        header: c,
        hgroup: {
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1
        },
        hr: h,
        html: a({
          head: 1,
          body: 1
        }, c, l),
        i: b,
        iframe: d,
        img: h,
        input: h,
        ins: b,
        kbd: b,
        keygen: h,
        label: b,
        legend: b,
        li: c,
        link: h,
        main: c,
        map: c,
        mark: b,
        menu: a({
          li: 1
        }, c),
        meta: h,
        meter: e(b, {
          meter: 1
        }),
        nav: c,
        noscript: a({
          link: 1,
          meta: 1,
          style: 1
        }, b),
        object: a({
          param: 1
        }, b),
        ol: {
          li: 1
        },
        optgroup: {
          option: 1
        },
        option: d,
        output: b,
        p: b,
        param: h,
        pre: b,
        progress: e(b, {
          progress: 1
        }),
        q: b,
        rp: b,
        rt: b,
        ruby: a({
          rp: 1,
          rt: 1
        }, b),
        s: b,
        samp: b,
        script: d,
        section: c,
        select: {
          optgroup: 1,
          option: 1
        },
        small: b,
        source: h,
        span: b,
        strong: b,
        style: d,
        sub: b,
        summary: a({
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1
        }, b),
        sup: b,
        table: {
          caption: 1,
          colgroup: 1,
          thead: 1,
          tfoot: 1,
          tbody: 1,
          tr: 1
        },
        tbody: {
          tr: 1
        },
        td: c,
        textarea: d,
        tfoot: {
          tr: 1
        },
        th: c,
        thead: {
          tr: 1
        },
        time: e(b, {
          time: 1
        }),
        title: d,
        tr: {
          th: 1,
          td: 1
        },
        track: h,
        u: b,
        ul: {
          li: 1
        },
        "var": b,
        video: a({
          source: 1,
          track: 1
        }, c),
        wbr: h,
        acronym: b,
        applet: a({
          param: 1
        }, c),
        basefont: h,
        big: b,
        center: c,
        dialog: h,
        dir: {
          li: 1
        },
        font: b,
        isindex: h,
        noframes: c,
        strike: b,
        tt: b
      };
      a(e, {
        $block: a({
          audio: 1,
          dd: 1,
          dt: 1,
          figcaption: 1,
          li: 1,
          video: 1
        }, f, k),
        $blockLimit: {
          article: 1,
          aside: 1,
          audio: 1,
          body: 1,
          caption: 1,
          details: 1,
          dir: 1,
          div: 1,
          dl: 1,
          fieldset: 1,
          figcaption: 1,
          figure: 1,
          footer: 1,
          form: 1,
          header: 1,
          hgroup: 1,
          main: 1,
          menu: 1,
          nav: 1,
          ol: 1,
          section: 1,
          table: 1,
          td: 1,
          th: 1,
          tr: 1,
          ul: 1,
          video: 1
        },
        $cdata: {
          script: 1,
          style: 1
        },
        $editable: {
          address: 1,
          article: 1,
          aside: 1,
          blockquote: 1,
          body: 1,
          details: 1,
          div: 1,
          fieldset: 1,
          figcaption: 1,
          footer: 1,
          form: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          header: 1,
          hgroup: 1,
          main: 1,
          nav: 1,
          p: 1,
          pre: 1,
          section: 1
        },
        $empty: {
          area: 1,
          base: 1,
          basefont: 1,
          br: 1,
          col: 1,
          command: 1,
          dialog: 1,
          embed: 1,
          hr: 1,
          img: 1,
          input: 1,
          isindex: 1,
          keygen: 1,
          link: 1,
          meta: 1,
          param: 1,
          source: 1,
          track: 1,
          wbr: 1
        },
        $inline: b,
        $list: {
          dl: 1,
          ol: 1,
          ul: 1
        },
        $listItem: {
          dd: 1,
          dt: 1,
          li: 1
        },
        $nonBodyContent: a({
          body: 1,
          head: 1,
          html: 1
        }, e.head),
        $nonEditable: {
          applet: 1,
          audio: 1,
          button: 1,
          embed: 1,
          iframe: 1,
          map: 1,
          object: 1,
          option: 1,
          param: 1,
          script: 1,
          textarea: 1,
          video: 1
        },
        $object: {
          applet: 1,
          audio: 1,
          button: 1,
          hr: 1,
          iframe: 1,
          img: 1,
          input: 1,
          object: 1,
          select: 1,
          table: 1,
          textarea: 1,
          video: 1
        },
        $removeEmpty: {
          abbr: 1,
          acronym: 1,
          b: 1,
          bdi: 1,
          bdo: 1,
          big: 1,
          cite: 1,
          code: 1,
          del: 1,
          dfn: 1,
          em: 1,
          font: 1,
          i: 1,
          ins: 1,
          label: 1,
          kbd: 1,
          mark: 1,
          meter: 1,
          output: 1,
          q: 1,
          ruby: 1,
          s: 1,
          samp: 1,
          small: 1,
          span: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          time: 1,
          tt: 1,
          u: 1,
          "var": 1
        },
        $tabIndex: {
          a: 1,
          area: 1,
          button: 1,
          input: 1,
          object: 1,
          select: 1,
          textarea: 1
        },
        $tableContent: {
          caption: 1,
          col: 1,
          colgroup: 1,
          tbody: 1,
          td: 1,
          tfoot: 1,
          th: 1,
          thead: 1,
          tr: 1
        },
        $transparent: {
          a: 1,
          audio: 1,
          canvas: 1,
          del: 1,
          ins: 1,
          map: 1,
          noscript: 1,
          object: 1,
          video: 1
        },
        $intermediate: {
          caption: 1,
          colgroup: 1,
          dd: 1,
          dt: 1,
          figcaption: 1,
          legend: 1,
          li: 1,
          optgroup: 1,
          option: 1,
          rp: 1,
          rt: 1,
          summary: 1,
          tbody: 1,
          td: 1,
          tfoot: 1,
          th: 1,
          thead: 1,
          tr: 1
        }
      });
      return e
    }(), CKEDITOR.dom.event = function(a) {
      this.$ = a
    }, CKEDITOR.dom.event.prototype = {
      getKey: function() {
        return this.$.keyCode || this.$.which
      },
      getKeystroke: function() {
        var a = this.getKey();
        if(this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
        this.$.shiftKey && (a += CKEDITOR.SHIFT);
        this.$.altKey && (a += CKEDITOR.ALT);
        return a
      },
      preventDefault: function(a) {
        var e = this.$;
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
        a && this.stopPropagation()
      },
      stopPropagation: function() {
        var a = this.$;
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
      },
      getTarget: function() {
        var a = this.$.target || this.$.srcElement;
        return a ? new CKEDITOR.dom.node(a) : null
      },
      getPhase: function() {
        return this.$.eventPhase || 2
      },
      getPageOffset: function() {
        var a = this.getTarget().getDocument().$;
        return {
          x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
          y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
        }
      }
    }, CKEDITOR.CTRL = 1114112,
    CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(a) {
      a && (this.$ = a)
    }, CKEDITOR.dom.domObject.prototype = function() {
      var a = function(a, b) {
        return function(c) {
          "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c))
        }
      };
      return {
        getPrivate: function() {
          var a;
          (a = this.getCustomData("_")) || this.setCustomData("_", a = {});
          return a
        },
        on: function(e) {
          var b = this.getCustomData("_cke_nativeListeners");
          b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
          b[e] || (b = b[e] = a(this, e), this.$.addEventListener ? this.$.addEventListener(e, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, b));
          return CKEDITOR.event.prototype.on.apply(this, arguments)
        },
        removeListener: function(a) {
          CKEDITOR.event.prototype.removeListener.apply(this, arguments);
          if(!this.hasListeners(a)) {
            var b = this.getCustomData("_cke_nativeListeners"),
              c = b && b[a];
            c && (this.$.removeEventListener ? this.$.removeEventListener(a,
              c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
          }
        },
        removeAllListeners: function() {
          var a = this.getCustomData("_cke_nativeListeners"),
            b;
          for(b in a) {
            var c = a[b];
            this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
            delete a[b]
          }
          CKEDITOR.event.prototype.removeAllListeners.call(this)
        }
      }
    }(),
    function(a) {
      var e = {};
      CKEDITOR.on("reset", function() {
        e = {}
      });
      a.equals = function(a) {
        try {
          return a && a.$ === this.$
        } catch(c) {
          return !1
        }
      };
      a.setCustomData = function(a,
        c) {
        var f = this.getUniqueId();
        (e[f] || (e[f] = {}))[a] = c;
        return this
      };
      a.getCustomData = function(a) {
        var c = this.$["data-cke-expando"];
        return(c = c && e[c]) && a in c ? c[a] : null
      };
      a.removeCustomData = function(a) {
        var c = this.$["data-cke-expando"],
          c = c && e[c],
          f, l;
        c && (f = c[a], l = a in c, delete c[a]);
        return l ? f : null
      };
      a.clearCustomData = function() {
        this.removeAllListeners();
        var a = this.$["data-cke-expando"];
        a && delete e[a]
      };
      a.getUniqueId = function() {
        return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
      };
      CKEDITOR.event.implementOn(a)
    }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(a) {
      return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT =
    3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
      appendTo: function(a, e) {
        a.append(this, e);
        return a
      },
      clone: function(a, e) {
        function b(c) {
          c["data-cke-expando"] && (c["data-cke-expando"] = !1);
          if(c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            if(e ||
              c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) {
              c = c.childNodes;
              for(var f = 0; f < c.length; f++) b(c[f])
            }
        }

        function c(b) {
          if(b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
            if(b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var f = b.getName();
              ":" == f[0] && b.renameNode(f.substring(1))
            }
            if(a)
              for(f = 0; f < b.getChildCount(); f++) c(b.getChild(f))
          }
        }
        var f = this.$.cloneNode(a);
        b(f);
        f = new CKEDITOR.dom.node(f);
        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type ==
          CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(f);
        return f
      },
      hasPrevious: function() {
        return !!this.$.previousSibling
      },
      hasNext: function() {
        return !!this.$.nextSibling
      },
      insertAfter: function(a) {
        a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
        return a
      },
      insertBefore: function(a) {
        a.$.parentNode.insertBefore(this.$, a.$);
        return a
      },
      insertBeforeMe: function(a) {
        this.$.parentNode.insertBefore(a.$, this.$);
        return a
      },
      getAddress: function(a) {
        for(var e = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
          var f = c.parentNode;
          f && e.unshift(this.getIndex.call({
            $: c
          }, a));
          c = f
        }
        return e
      },
      getDocument: function() {
        return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
      },
      getIndex: function(a) {
        function e(a, d) {
          var c = d ? a.nextSibling : a.previousSibling;
          return c && c.nodeType == CKEDITOR.NODE_TEXT ? b(c) ? e(c, d) : c : null
        }

        function b(a) {
          return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
        }
        var c = this.$,
          f = -1,
          l;
        if(!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !e(c) && !e(c, !0)) return -1;
        do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (l || b(c)) || (f++, l = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
        return f
      },
      getNextSourceNode: function(a, e, b) {
        if(b && !b.call) {
          var c = b;
          b = function(a) {
            return !a.equals(c)
          }
        }
        a = !a && this.getFirst && this.getFirst();
        var f;
        if(!a) {
          if(this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
          a = this.getNext()
        }
        for(; !a && (f = (f || this).getParent());) {
          if(b && !1 === b(f, !0)) return null;
          a = f.getNext()
        }
        return !a || b && !1 === b(a) ? null : e && e != a.type ? a.getNextSourceNode(!1,
          e, b) : a
      },
      getPreviousSourceNode: function(a, e, b) {
        if(b && !b.call) {
          var c = b;
          b = function(a) {
            return !a.equals(c)
          }
        }
        a = !a && this.getLast && this.getLast();
        var f;
        if(!a) {
          if(this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
          a = this.getPrevious()
        }
        for(; !a && (f = (f || this).getParent());) {
          if(b && !1 === b(f, !0)) return null;
          a = f.getPrevious()
        }
        return !a || b && !1 === b(a) ? null : e && a.type != e ? a.getPreviousSourceNode(!1, e, b) : a
      },
      getPrevious: function(a) {
        var e = this.$,
          b;
        do b = (e = e.previousSibling) && 10 != e.nodeType && new CKEDITOR.dom.node(e);
        while (b && a && !a(b));
        return b
      },
      getNext: function(a) {
        var e = this.$,
          b;
        do b = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (b && a && !a(b));
        return b
      },
      getParent: function(a) {
        var e = this.$.parentNode;
        return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || a && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null
      },
      getParents: function(a) {
        var e = this,
          b = [];
        do b[a ? "push" : "unshift"](e); while (e = e.getParent());
        return b
      },
      getCommonAncestor: function(a) {
        if(a.equals(this)) return this;
        if(a.contains && a.contains(this)) return a;
        var e = this.contains ? this : this.getParent();
        do
          if(e.contains(a)) return e; while (e = e.getParent());
        return null
      },
      getPosition: function(a) {
        var e = this.$,
          b = a.$;
        if(e.compareDocumentPosition) return e.compareDocumentPosition(b);
        if(e == b) return CKEDITOR.POSITION_IDENTICAL;
        if(this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
          if(e.contains) {
            if(e.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
            if(b.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
          }
          if("sourceIndex" in
            e) return 0 > e.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
        }
        e = this.getAddress();
        a = a.getAddress();
        for(var b = Math.min(e.length, a.length), c = 0; c < b; c++)
          if(e[c] != a[c]) return e[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
        return e.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
      },
      getAscendant: function(a, e) {
        var b =
          this.$,
          c, f;
        e || (b = b.parentNode);
        "function" == typeof a ? (f = !0, c = a) : (f = !1, c = function(b) {
          b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
          return "string" == typeof a ? b == a : b in a
        });
        for(; b;) {
          if(c(f ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
          try {
            b = b.parentNode
          } catch(l) {
            b = null
          }
        }
        return null
      },
      hasAscendant: function(a, e) {
        var b = this.$;
        e || (b = b.parentNode);
        for(; b;) {
          if(b.nodeName && b.nodeName.toLowerCase() == a) return !0;
          b = b.parentNode
        }
        return !1
      },
      move: function(a, e) {
        a.append(this.remove(), e)
      },
      remove: function(a) {
        var e =
          this.$,
          b = e.parentNode;
        if(b) {
          if(a)
            for(; a = e.firstChild;) b.insertBefore(e.removeChild(a), e);
          b.removeChild(e)
        }
        return this
      },
      replace: function(a) {
        this.insertBefore(a);
        a.remove()
      },
      trim: function() {
        this.ltrim();
        this.rtrim()
      },
      ltrim: function() {
        for(var a; this.getFirst && (a = this.getFirst());) {
          if(a.type == CKEDITOR.NODE_TEXT) {
            var e = CKEDITOR.tools.ltrim(a.getText()),
              b = a.getLength();
            if(e) e.length < b && (a.split(b - e.length), this.$.removeChild(this.$.firstChild));
            else {
              a.remove();
              continue
            }
          }
          break
        }
      },
      rtrim: function() {
        for(var a; this.getLast &&
          (a = this.getLast());) {
          if(a.type == CKEDITOR.NODE_TEXT) {
            var e = CKEDITOR.tools.rtrim(a.getText()),
              b = a.getLength();
            if(e) e.length < b && (a.split(e.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
            else {
              a.remove();
              continue
            }
          }
          break
        }
        CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
      },
      isReadOnly: function(a) {
        var e = this;
        this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent());
        CKEDITOR.env.edge && e && e.is("textarea", "input") && (a = !0);
        if(!a && e && "undefined" != typeof e.$.isContentEditable) return !(e.$.isContentEditable || e.data("cke-editable"));
        for(; e;) {
          if(e.data("cke-editable")) return !1;
          if(e.hasAttribute("contenteditable")) return "false" == e.getAttribute("contenteditable");
          e = e.getParent()
        }
        return !0
      }
    }), CKEDITOR.dom.window = function(a) {
      CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
      focus: function() {
        this.$.focus()
      },
      getViewPaneSize: function() {
        var a =
          this.$.document,
          e = "CSS1Compat" == a.compatMode;
        return {
          width: (e ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
          height: (e ? a.documentElement.clientHeight : a.body.clientHeight) || 0
        }
      },
      getScrollPosition: function() {
        var a = this.$;
        if("pageXOffset" in a) return {
          x: a.pageXOffset || 0,
          y: a.pageYOffset || 0
        };
        a = a.document;
        return {
          x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
          y: a.documentElement.scrollTop || a.body.scrollTop || 0
        }
      },
      getFrame: function() {
        var a = this.$.frameElement;
        return a ? new CKEDITOR.dom.element.get(a) :
          null
      }
    }), CKEDITOR.dom.document = function(a) {
      CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
      type: CKEDITOR.NODE_DOCUMENT,
      appendStyleSheet: function(a) {
        if(this.$.createStyleSheet) this.$.createStyleSheet(a);
        else {
          var e = new CKEDITOR.dom.element("link");
          e.setAttributes({
            rel: "stylesheet",
            type: "text/css",
            href: a
          });
          this.getHead().append(e)
        }
      },
      appendStyleText: function(a) {
        if(this.$.createStyleSheet) {
          var e = this.$.createStyleSheet("");
          e.cssText = a
        } else {
          var b = new CKEDITOR.dom.element("style", this);
          b.append(new CKEDITOR.dom.text(a, this));
          this.getHead().append(b)
        }
        return e || b.$.sheet
      },
      createElement: function(a, e) {
        var b = new CKEDITOR.dom.element(a, this);
        e && (e.attributes && b.setAttributes(e.attributes), e.styles && b.setStyles(e.styles));
        return b
      },
      createText: function(a) {
        return new CKEDITOR.dom.text(a, this)
      },
      focus: function() {
        this.getWindow().focus()
      },
      getActive: function() {
        var a;
        try {
          a = this.$.activeElement
        } catch(e) {
          return null
        }
        return new CKEDITOR.dom.element(a)
      },
      getById: function(a) {
        return(a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
      },
      getByAddress: function(a, e) {
        for(var b = this.$.documentElement, c = 0; b && c < a.length; c++) {
          var f = a[c];
          if(e)
            for(var l = -1, h = 0; h < b.childNodes.length; h++) {
              var d = b.childNodes[h];
              if(!0 !== e || 3 != d.nodeType || !d.previousSibling || 3 != d.previousSibling.nodeType)
                if(l++, l == f) {
                  b = d;
                  break
                }
            } else b = b.childNodes[f]
        }
        return b ? new CKEDITOR.dom.node(b) : null
      },
      getElementsByTag: function(a, e) {
        CKEDITOR.env.ie && 8 >= document.documentMode || !e || (a = e + ":" +
          a);
        return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
      },
      getHead: function() {
        var a = this.$.getElementsByTagName("head")[0];
        return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
      },
      getBody: function() {
        return new CKEDITOR.dom.element(this.$.body)
      },
      getDocumentElement: function() {
        return new CKEDITOR.dom.element(this.$.documentElement)
      },
      getWindow: function() {
        return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
      },
      write: function(a) {
        this.$.open("text/html",
          "replace");
        CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
        this.$.write(a);
        this.$.close()
      },
      find: function(a) {
        return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))
      },
      findOne: function(a) {
        return(a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
      },
      _getHtml5ShivFrag: function() {
        var a = this.getCustomData("html5ShivFrag");
        a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
        return a
      }
    }), CKEDITOR.dom.nodeList = function(a) {
      this.$ = a
    }, CKEDITOR.dom.nodeList.prototype = {
      count: function() {
        return this.$.length
      },
      getItem: function(a) {
        return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
      },
      toArray: function() {
        return CKEDITOR.tools.array.map(this.$, function(a) {
          return new CKEDITOR.dom.node(a)
        })
      }
    }, CKEDITOR.dom.element = function(a, e) {
      "string" == typeof a && (a = (e ? e.$ : document).createElement(a));
      CKEDITOR.dom.domObject.call(this,
        a)
    }, CKEDITOR.dom.element.get = function(a) {
      return(a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(a, e) {
      var b = new CKEDITOR.dom.element("div", e);
      b.setHtml(a);
      return b.getFirst().remove()
    }, CKEDITOR.dom.element.setMarker = function(a, e, b, c) {
      var f = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
        l = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
      a[f] = e;
      l[b] = 1;
      return e.setCustomData(b, c)
    }, CKEDITOR.dom.element.clearAllMarkers = function(a) {
      for(var e in a) CKEDITOR.dom.element.clearMarkers(a, a[e], 1)
    }, CKEDITOR.dom.element.clearMarkers = function(a, e, b) {
      var c = e.getCustomData("list_marker_names"),
        f = e.getCustomData("list_marker_id"),
        l;
      for(l in c) e.removeCustomData(l);
      e.removeCustomData("list_marker_names");
      b && (e.removeCustomData("list_marker_id"),
        delete a[f])
    },
    function() {
      function a(a, b) {
        return -1 < (" " + a + " ").replace(l, " ").indexOf(" " + b + " ")
      }

      function e(a) {
        var b = !0;
        a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
        return function() {
          b || a.removeAttribute("id")
        }
      }

      function b(a, b) {
        var c = CKEDITOR.tools.escapeCss(a.$.id);
        return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ")
      }

      function c(a) {
        for(var b = 0, c = 0, g = h[a].length; c < g; c++) b += parseFloat(this.getComputedStyle(h[a][c]) || 0, 10) || 0;
        return b
      }
      var f = document.createElement("_").classList,
        f = "undefined" !==
        typeof f && null !== String(f.add).match(/\[Native code\]/gi),
        l = /[\n\t\r]/g;
      CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_ELEMENT,
        addClass: f ? function(a) {
          this.$.classList.add(a);
          return this
        } : function(d) {
          var b = this.$.className;
          b && (a(b, d) || (b += " " + d));
          this.$.className = b || d;
          return this
        },
        removeClass: f ? function(a) {
          var b = this.$;
          b.classList.remove(a);
          b.className || b.removeAttribute("class");
          return this
        } : function(d) {
          var b = this.getAttribute("class");
          b && a(b, d) && ((b = b.replace(new RegExp("(?:^|\\s+)" +
            d + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class"));
          return this
        },
        hasClass: function(d) {
          return a(this.$.className, d)
        },
        append: function(a, b) {
          "string" == typeof a && (a = this.getDocument().createElement(a));
          b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
          return a
        },
        appendHtml: function(a) {
          if(this.$.childNodes.length) {
            var b = new CKEDITOR.dom.element("div", this.getDocument());
            b.setHtml(a);
            b.moveChildren(this)
          } else this.setHtml(a)
        },
        appendText: function(a) {
          null !=
            this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
        },
        appendBogus: function(a) {
          if(a || CKEDITOR.env.needsBrFiller) {
            for(a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
            a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
          }
        },
        breakParent: function(a, b) {
          var c = new CKEDITOR.dom.range(this.getDocument());
          c.setStartAfter(this);
          c.setEndAfter(a);
          var g = c.extractContents(!1, b || !1),
            f;
          c.insertNode(this.remove());
          if(CKEDITOR.env.ie && !CKEDITOR.env.edge) {
            for(c = new CKEDITOR.dom.element("div"); f = g.getFirst();) f.$.style.backgroundColor && (f.$.style.backgroundColor = f.$.style.backgroundColor), c.append(f);
            c.insertAfter(this);
            c.remove(!0)
          } else g.insertAfterNode(this)
        },
        contains: document.compareDocumentPosition ? function(a) {
          return !!(this.$.compareDocumentPosition(a.$) & 16)
        } : function(a) {
          var b = this.$;
          return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) :
            b != a.$ && b.contains(a.$)
        },
        focus: function() {
          function a() {
            try {
              this.$.focus()
            } catch(d) {}
          }
          return function(b) {
            b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
          }
        }(),
        getHtml: function() {
          var a = this.$.innerHTML;
          return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
        },
        getOuterHtml: function() {
          if(this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
          var a = this.$.ownerDocument.createElement("div");
          a.appendChild(this.$.cloneNode(!0));
          return a.innerHTML
        },
        getClientRect: function() {
          var a = CKEDITOR.tools.extend({},
            this.$.getBoundingClientRect());
          !a.width && (a.width = a.right - a.left);
          !a.height && (a.height = a.bottom - a.top);
          return a
        },
        setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function(a) {
          try {
            var b = this.$;
            if(this.getParent()) return b.innerHTML = a;
            var c = this.getDocument()._getHtml5ShivFrag();
            c.appendChild(b);
            b.innerHTML = a;
            c.removeChild(b);
            return a
          } catch(g) {
            this.$.innerHTML = "";
            b = new CKEDITOR.dom.element("body", this.getDocument());
            b.$.innerHTML = a;
            for(b = b.getChildren(); b.count();) this.append(b.getItem(0));
            return a
          }
        } : function(a) {
          return this.$.innerHTML = a
        },
        setText: function() {
          var a = document.createElement("p");
          a.innerHTML = "x";
          a = a.textContent;
          return function(b) {
            this.$[a ? "textContent" : "innerText"] = b
          }
        }(),
        getAttribute: function() {
          var a = function(a) {
            return this.$.getAttribute(a, 2)
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
            switch(a) {
              case "class":
                a = "className";
                break;
              case "http-equiv":
                a = "httpEquiv";
                break;
              case "name":
                return this.$.name;
              case "tabindex":
                return a = this.$.getAttribute(a,
                  2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
              case "checked":
                return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
              case "hspace":
              case "value":
                return this.$[a];
              case "style":
                return this.$.style.cssText;
              case "contenteditable":
              case "contentEditable":
                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
            }
            return this.$.getAttribute(a, 2)
          } : a
        }(),
        getAttributes: function(a) {
          var b = {},
            c = this.$.attributes,
            g;
          a = CKEDITOR.tools.isArray(a) ?
            a : [];
          for(g = 0; g < c.length; g++) - 1 === CKEDITOR.tools.indexOf(a, c[g].name) && (b[c[g].name] = c[g].value);
          return b
        },
        getChildren: function() {
          return new CKEDITOR.dom.nodeList(this.$.childNodes)
        },
        getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) {
          var b = this.getWindow().$.getComputedStyle(this.$, null);
          return b ? b.getPropertyValue(a) : ""
        } : function(a) {
          return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
        },
        getDtd: function() {
          var a = CKEDITOR.dtd[this.getName()];
          this.getDtd =
            function() {
              return a
            };
          return a
        },
        getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
        getTabIndex: function() {
          var a = this.$.tabIndex;
          return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1
        },
        getText: function() {
          return this.$.textContent || this.$.innerText || ""
        },
        getWindow: function() {
          return this.getDocument().getWindow()
        },
        getId: function() {
          return this.$.id || null
        },
        getNameAtt: function() {
          return this.$.name || null
        },
        getName: function() {
          var a = this.$.nodeName.toLowerCase();
          if(CKEDITOR.env.ie && 8 >= document.documentMode) {
            var b = this.$.scopeName;
            "HTML" != b && (a = b.toLowerCase() + ":" + a)
          }
          this.getName = function() {
            return a
          };
          return this.getName()
        },
        getValue: function() {
          return this.$.value
        },
        getFirst: function(a) {
          var b = this.$.firstChild;
          (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
          return b
        },
        getLast: function(a) {
          var b = this.$.lastChild;
          (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
          return b
        },
        getStyle: function(a) {
          return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
        },
        is: function() {
          var a = this.getName();
          if("object" == typeof arguments[0]) return !!arguments[0][a];
          for(var b = 0; b < arguments.length; b++)
            if(arguments[b] == a) return !0;
          return !1
        },
        isEditable: function(a) {
          var b = this.getName();
          return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
            CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
        },
        isIdentical: function(a) {
          var b = this.clone(0, 1);
          a = a.clone(0, 1);
          b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
          a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
          if(b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
          b = b.getOuterHtml();
          a =
            a.getOuterHtml();
          if(CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
            var c = this.getParent();
            c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml())
          }
          return b == a
        },
        isVisible: function() {
          var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
            b, c;
          a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
          return !!a
        },
        isEmptyInlineRemoveable: function() {
          if(!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
          for(var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
            var g = a.getItem(b);
            if(g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark"))
              if(g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText())) return !1
          }
          return !0
        },
        hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
          for(var a = this.$.attributes, b = 0; b < a.length; b++) {
            var c = a[b];
            switch(c.nodeName) {
              case "class":
                if(this.getAttribute("class")) return !0;
              case "data-cke-expando":
                continue;
              default:
                if(c.specified) return !0
            }
          }
          return !1
        } : function() {
          var a = this.$.attributes,
            b = a.length,
            c = {
              "data-cke-expando": 1,
              _moz_dirty: 1
            };
          return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName])
        },
        hasAttribute: function() {
          function a(b) {
            var c = this.$.attributes.getNamedItem(b);
            if("input" == this.getName()) switch(b) {
              case "class":
                return 0 < this.$.className.length;
              case "checked":
                return !!this.$.checked;
              case "value":
                return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value
            }
            return c ?
              c.specified : !1
          }
          return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function(b) {
            return "name" == b ? !!this.$.name : a.call(this, b)
          } : a : function(a) {
            return !!this.$.attributes.getNamedItem(a)
          }
        }(),
        hide: function() {
          this.setStyle("display", "none")
        },
        moveChildren: function(a, b) {
          var c = this.$;
          a = a.$;
          if(c != a) {
            var g;
            if(b)
              for(; g = c.lastChild;) a.insertBefore(c.removeChild(g), a.firstChild);
            else
              for(; g = c.firstChild;) a.appendChild(c.removeChild(g))
          }
        },
        mergeSiblings: function() {
          function a(b, c, g) {
            if(c && c.type == CKEDITOR.NODE_ELEMENT) {
              for(var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)
                if(d.push(c), c = g ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return;
              if(b.isIdentical(c)) {
                for(var f = g ? b.getLast() : b.getFirst(); d.length;) d.shift().move(b, !g);
                c.moveChildren(b, !g);
                c.remove();
                f && f.type == CKEDITOR.NODE_ELEMENT && f.mergeSiblings()
              }
            }
          }
          return function(b) {
            if(!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious())
          }
        }(),
        show: function() {
          this.setStyles({
            display: "",
            visibility: ""
          })
        },
        setAttribute: function() {
          var a = function(a, b) {
            this.$.setAttribute(a, b);
            return this
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) {
            "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
            return this
          } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
            if("src" == b && c.match(/^http:\/\//)) try {
              a.apply(this,
                arguments)
            } catch(g) {} else a.apply(this, arguments);
            return this
          } : a
        }(),
        setAttributes: function(a) {
          for(var b in a) this.setAttribute(b, a[b]);
          return this
        },
        setValue: function(a) {
          this.$.value = a;
          return this
        },
        removeAttribute: function() {
          var a = function(a) {
            this.$.removeAttribute(a)
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
            "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
            this.$.removeAttribute(a)
          } : a
        }(),
        removeAttributes: function(a) {
          if(CKEDITOR.tools.isArray(a))
            for(var b =
                0; b < a.length; b++) this.removeAttribute(a[b]);
          else
            for(b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
        },
        removeStyle: function(a) {
          var b = this.$.style;
          if(b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
          else {
            var c = ["top", "left", "right", "bottom"],
              g;
            "border" == a && (g = ["color", "style", "width"]);
            for(var b = [], f = 0; f < c.length; f++)
              if(g)
                for(var e =
                    0; e < g.length; e++) b.push([a, c[f], g[e]].join("-"));
              else b.push([a, c[f]].join("-"));
            for(a = 0; a < b.length; a++) this.removeStyle(b[a])
          }
        },
        setStyle: function(a, b) {
          this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
          return this
        },
        setStyles: function(a) {
          for(var b in a) this.setStyle(b, a[b]);
          return this
        },
        setOpacity: function(a) {
          CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
        },
        unselectable: function() {
          this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
            "none"));
          if(CKEDITOR.env.ie) {
            this.setAttribute("unselectable", "on");
            for(var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++) a = b.getItem(c), a.setAttribute("unselectable", "on")
          }
        },
        getPositionedAncestor: function() {
          for(var a = this;
            "html" != a.getName();) {
            if("static" != a.getComputedStyle("position")) return a;
            a = a.getParent()
          }
          return null
        },
        getDocumentPosition: function(a) {
          var b = 0,
            c = 0,
            g = this.getDocument(),
            f = g.getBody(),
            e = "BackCompat" == g.$.compatMode;
          if(document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
              8 !== CKEDITOR.env.version : 1)) {
            var h = this.$.getBoundingClientRect(),
              l = g.$.documentElement,
              u = l.clientTop || f.$.clientTop || 0,
              r = l.clientLeft || f.$.clientLeft || 0,
              v = !0;
            CKEDITOR.env.ie && (v = g.getDocumentElement().contains(this), g = g.getBody().contains(this), v = e && g || !e && v);
            v && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = f.$.scrollLeft || l.scrollLeft, c = f.$.scrollTop || l.scrollTop) : (c = e ? f.$ : l, b = c.scrollLeft, c = c.scrollTop), b = h.left + b - r, c = h.top + c - u)
          } else
            for(u = this, r = null; u && "body" != u.getName() &&
              "html" != u.getName();) {
              b += u.$.offsetLeft - u.$.scrollLeft;
              c += u.$.offsetTop - u.$.scrollTop;
              u.equals(this) || (b += u.$.clientLeft || 0, c += u.$.clientTop || 0);
              for(; r && !r.equals(u);) b -= r.$.scrollLeft, c -= r.$.scrollTop, r = r.getParent();
              r = u;
              u = (h = u.$.offsetParent) ? new CKEDITOR.dom.element(h) : null
            }
          a && (h = this.getWindow(), u = a.getWindow(), !h.equals(u) && h.$.frameElement && (a = (new CKEDITOR.dom.element(h.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
          document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
            e || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
          return {
            x: b,
            y: c
          }
        },
        scrollIntoView: function(a) {
          var b = this.getParent();
          if(b) {
            do
              if((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
                var c = b.getWindow();
                try {
                  var g = c.$.frameElement;
                  g && (b = new CKEDITOR.dom.element(g))
                } catch(f) {}
              }
            while(b = b.getParent())
          }
        },
        scrollIntoParent: function(a, b, c) {
          var g, f, e, h;

          function l(b, g) {
            /body|html/.test(a.getName()) ?
              a.getWindow().$.scrollBy(b, g) : (a.$.scrollLeft += b, a.$.scrollTop += g)
          }

          function u(a, b) {
            var g = {
              x: 0,
              y: 0
            };
            if(!a.is(v ? "body" : "html")) {
              var c = a.$.getBoundingClientRect();
              g.x = c.left;
              g.y = c.top
            }
            c = a.getWindow();
            c.equals(b) || (c = u(CKEDITOR.dom.element.get(c.$.frameElement), b), g.x += c.x, g.y += c.y);
            return g
          }

          function r(a, b) {
            return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
          }!a && (a = this.getWindow());
          e = a.getDocument();
          var v = "BackCompat" == e.$.compatMode;
          a instanceof CKEDITOR.dom.window && (a = v ? e.getBody() : e.getDocumentElement());
          CKEDITOR.env.webkit && (e = this.getEditor(!1)) && (e._.previousScrollTop = null);
          e = a.getWindow();
          f = u(this, e);
          var w = u(a, e),
            B = this.$.offsetHeight;
          g = this.$.offsetWidth;
          var q = a.$.clientHeight,
            z = a.$.clientWidth;
          e = f.x - r(this, "left") - w.x || 0;
          h = f.y - r(this, "top") - w.y || 0;
          g = f.x + g + r(this, "right") - (w.x + z) || 0;
          f = f.y + B + r(this, "bottom") - (w.y + q) || 0;
          (0 > h || 0 < f) && l(0, !0 === b ? h : !1 === b ? f : 0 > h ? h : f);
          c && (0 > e || 0 < g) && l(0 > e ? e : g, 0)
        },
        setState: function(a, b, c) {
          b = b || "cke";
          switch(a) {
            case CKEDITOR.TRISTATE_ON:
              this.addClass(b + "_on");
              this.removeClass(b +
                "_off");
              this.removeClass(b + "_disabled");
              c && this.setAttribute("aria-pressed", !0);
              c && this.removeAttribute("aria-disabled");
              break;
            case CKEDITOR.TRISTATE_DISABLED:
              this.addClass(b + "_disabled");
              this.removeClass(b + "_off");
              this.removeClass(b + "_on");
              c && this.setAttribute("aria-disabled", !0);
              c && this.removeAttribute("aria-pressed");
              break;
            default:
              this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
          }
        },
        getFrameDocument: function() {
          var a = this.$;
          try {
            a.contentWindow.document
          } catch(b) {
            a.src = a.src
          }
          return a && new CKEDITOR.dom.document(a.contentWindow.document)
        },
        copyAttributes: function(a, b) {
          var c = this.$.attributes;
          b = b || {};
          for(var g = 0; g < c.length; g++) {
            var f = c[g],
              e = f.nodeName.toLowerCase(),
              h;
            if(!(e in b))
              if("checked" == e && (h = this.getAttribute(e))) a.setAttribute(e, h);
              else if(!CKEDITOR.env.ie || this.hasAttribute(e)) h = this.getAttribute(e), null === h && (h = f.nodeValue), a.setAttribute(e, h)
          }
          "" !== this.$.style.cssText &&
            (a.$.style.cssText = this.$.style.cssText)
        },
        renameNode: function(a) {
          if(this.getName() != a) {
            var b = this.getDocument();
            a = new CKEDITOR.dom.element(a, b);
            this.copyAttributes(a);
            this.moveChildren(a);
            this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
            a.$["data-cke-expando"] = this.$["data-cke-expando"];
            this.$ = a.$;
            delete this.getName
          }
        },
        getChild: function() {
          function a(b, c) {
            var g = b.childNodes;
            if(0 <= c && c < g.length) return g[c]
          }
          return function(b) {
            var c = this.$;
            if(b.slice)
              for(b = b.slice(); 0 < b.length && c;) c = a(c,
                b.shift());
            else c = a(c, b);
            return c ? new CKEDITOR.dom.node(c) : null
          }
        }(),
        getChildCount: function() {
          return this.$.childNodes.length
        },
        disableContextMenu: function() {
          function a(b) {
            return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu")
          }
          this.on("contextmenu", function(b) {
            b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault()
          })
        },
        getDirection: function(a) {
          return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
            "ltr" : this.getStyle("direction") || this.getAttribute("dir")
        },
        data: function(a, b) {
          a = "data-" + a;
          if(void 0 === b) return this.getAttribute(a);
          !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
          return null
        },
        getEditor: function(a) {
          var b = CKEDITOR.instances,
            c, g, f;
          a = a || void 0 === a;
          for(c in b)
            if(g = b[c], g.element.equals(this) && g.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (f = g.editable()) && (f.equals(this) || f.contains(this))) return g;
          return null
        },
        find: function(a) {
          var c = e(this);
          a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
            a)));
          c();
          return a
        },
        findOne: function(a) {
          var c = e(this);
          a = this.$.querySelector(b(this, a));
          c();
          return a ? new CKEDITOR.dom.element(a) : null
        },
        forEach: function(a, b, c) {
          if(!(c || b && this.type != b)) var g = a(this);
          if(!1 !== g) {
            c = this.getChildren();
            for(var f = 0; f < c.count(); f++) g = c.getItem(f), g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g)
          }
        }
      });
      var h = {
        width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
        height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
      };
      CKEDITOR.dom.element.prototype.setSize = function(a, b, f) {
        "number" == typeof b && (!f || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px"))
      };
      CKEDITOR.dom.element.prototype.getSize = function(a, b) {
        var f = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
        b && (f -= c.call(this, a));
        return f
      }
    }(), CKEDITOR.dom.documentFragment = function(a) {
      a = a || CKEDITOR.document;
      this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
      CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function(a) {
          a = a.$;
          a.parentNode.insertBefore(this.$, a.nextSibling)
        },
        getHtml: function() {
          var a = new CKEDITOR.dom.element("div");
          this.clone(1, 1).appendTo(a);
          return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
        }
      }, !0, {
        append: 1,
        appendBogus: 1,
        clone: 1,
        getFirst: 1,
        getHtml: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
      }),
    function() {
      function a(a, b) {
        var g = this.range;
        if(this._.end) return null;
        if(!this._.start) {
          this._.start = 1;
          if(g.collapsed) return this.end(), null;
          g.optimize()
        }
        var c, d = g.startContainer;
        c = g.endContainer;
        var f = g.startOffset,
          m = g.endOffset,
          e, k = this.guard,
          h = this.type,
          n = a ? "getPreviousSourceNode" : "getNextSourceNode";
        if(!a && !this._.guardLTR) {
          var l = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(),
            C = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(m) : c.getNext();
          this._.guardLTR = function(a,
            b) {
            return(!b || !l.equals(a)) && (!C || !a.equals(C)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
          }
        }
        if(a && !this._.guardRTL) {
          var D = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
            H = d.type == CKEDITOR.NODE_ELEMENT ? f ? d.getChild(f - 1) : null : d.getPrevious();
          this._.guardRTL = function(a, b) {
            return(!b || !D.equals(a)) && (!H || !a.equals(H)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
          }
        }
        var E = a ? this._.guardRTL : this._.guardLTR;
        e = k ? function(a, b) {
          return !1 === E(a, b) ? !1 : k(a, b)
        } : E;
        this.current ? c = this.current[n](!1,
          h, e) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < m ? c.getChild(m - 1) : !1 === e(c, !0) ? null : c.getPreviousSourceNode(!0, h, e)) : (c = d, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(f)) || (c = !1 === e(d, !0) ? null : d.getNextSourceNode(!0, h, e)))), c && !1 === e(c) && (c = null));
        for(; c && !this._.end;) {
          this.current = c;
          if(!this.evaluator || !1 !== this.evaluator(c)) {
            if(!b) return c
          } else if(b && this.evaluator) return !1;
          c = c[n](!1, h, e)
        }
        this.end();
        return this.current = null
      }

      function e(b) {
        for(var g, c = null; g = a.call(this, b);) c = g;
        return c
      }
      CKEDITOR.dom.walker =
        CKEDITOR.tools.createClass({
          $: function(a) {
            this.range = a;
            this._ = {}
          },
          proto: {
            end: function() {
              this._.end = 1
            },
            next: function() {
              return a.call(this)
            },
            previous: function() {
              return a.call(this, 1)
            },
            checkForward: function() {
              return !1 !== a.call(this, 0, 1)
            },
            checkBackward: function() {
              return !1 !== a.call(this, 1, 1)
            },
            lastForward: function() {
              return e.call(this)
            },
            lastBackward: function() {
              return e.call(this, 1)
            },
            reset: function() {
              delete this.current;
              this._ = {}
            }
          }
        });
      var b = {
          block: 1,
          "list-item": 1,
          table: 1,
          "table-row-group": 1,
          "table-header-group": 1,
          "table-footer-group": 1,
          "table-row": 1,
          "table-column-group": 1,
          "table-column": 1,
          "table-cell": 1,
          "table-caption": 1
        },
        c = {
          absolute: 1,
          fixed: 1
        };
      CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) {
        return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0
      };
      CKEDITOR.dom.walker.blockBoundary = function(a) {
        return function(b) {
          return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
        }
      };
      CKEDITOR.dom.walker.listItemBoundary =
        function() {
          return this.blockBoundary({
            br: 1
          })
        };
      CKEDITOR.dom.walker.bookmark = function(a, b) {
        function g(a) {
          return a && a.getName && "span" == a.getName() && a.data("cke-bookmark")
        }
        return function(c) {
          var d, f;
          d = c && c.type != CKEDITOR.NODE_ELEMENT && (f = c.getParent()) && g(f);
          d = a ? d : d || g(c);
          return !!(b ^ d)
        }
      };
      CKEDITOR.dom.walker.whitespaces = function(a) {
        return function(b) {
          var g;
          b && b.type == CKEDITOR.NODE_TEXT && (g = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
          return !!(a ^ g)
        }
      };
      CKEDITOR.dom.walker.invisible = function(a) {
        var b = CKEDITOR.dom.walker.whitespaces(),
          g = CKEDITOR.env.webkit ? 1 : 0;
        return function(c) {
          b(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = c.$.offsetWidth <= g);
          return !!(a ^ c)
        }
      };
      CKEDITOR.dom.walker.nodeType = function(a, b) {
        return function(g) {
          return !!(b ^ g.type == a)
        }
      };
      CKEDITOR.dom.walker.bogus = function(a) {
        function b(a) {
          return !l(a) && !h(a)
        }
        return function(g) {
          var c = CKEDITOR.env.needsBrFiller ? g.is && g.is("br") : g.getText && f.test(g.getText());
          c && (c = g.getParent(),
            g = g.getNext(b), c = c.isBlockBoundary() && (!g || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()));
          return !!(a ^ c)
        }
      };
      CKEDITOR.dom.walker.temp = function(a) {
        return function(b) {
          b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
          b = b && b.hasAttribute("data-cke-temp");
          return !!(a ^ b)
        }
      };
      var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
        l = CKEDITOR.dom.walker.whitespaces(),
        h = CKEDITOR.dom.walker.bookmark(),
        d = CKEDITOR.dom.walker.temp(),
        k = function(a) {
          return h(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)
        };
      CKEDITOR.dom.walker.ignored = function(a) {
        return function(b) {
          b = l(b) || h(b) || d(b);
          return !!(a ^ b)
        }
      };
      var m = CKEDITOR.dom.walker.ignored();
      CKEDITOR.dom.walker.empty = function(a) {
        return function(b) {
          for(var g = 0, c = b.getChildCount(); g < c; ++g)
            if(!m(b.getChild(g))) return !!a;
          return !a
        }
      };
      var g = CKEDITOR.dom.walker.empty(),
        n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) {
          var b = {},
            g;
          for(g in a) CKEDITOR.dtd[g]["#"] && (b[g] = 1);
          return b
        }(CKEDITOR.dtd.$block), {
          caption: 1,
          td: 1,
          th: 1
        });
      CKEDITOR.dom.walker.editable =
        function(a) {
          return function(b) {
            b = m(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1;
            return !!(a ^ b)
          }
        };
      CKEDITOR.dom.element.prototype.getBogus = function() {
        var a = this;
        do a = a.getPreviousSourceNode(); while (k(a));
        return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : !1
      }
    }(), CKEDITOR.dom.range = function(a) {
      this.endOffset = this.endContainer =
        this.startOffset = this.startContainer = null;
      this.collapsed = !0;
      var e = a instanceof CKEDITOR.dom.document;
      this.document = e ? a : a.getDocument();
      this.root = e ? a.getBody() : a
    },
    function() {
      function a(a) {
        a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
      }

      function e(a, b, c, d, f) {
        function e(a, b, g, c) {
          var d = g ? a.getPrevious() : a.getNext();
          if(c && h) return d;
          q || c ? b.append(a.clone(!0, f), g) : (a.remove(), l && b.append(a, g));
          return d
        }

        function m() {
          var a, b, g, c = Math.min(M.length,
            F.length);
          for(a = 0; a < c; a++)
            if(b = M[a], g = F[a], !b.equals(g)) return a;
          return a - 1
        }

        function k() {
          var b = Q - 1,
            c = E && I && !z.equals(y);
          b < N - 1 || b < R - 1 || c ? (c ? a.moveToPosition(y, CKEDITOR.POSITION_BEFORE_START) : R == b + 1 && H ? a.moveToPosition(F[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(F[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = M[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b),
            b.mergeSiblings(!1), a.moveToBookmark({
              startNode: c
            }))) : a.collapse(!0)
        }
        a.optimizeBookmark();
        var h = 0 === b,
          l = 1 == b,
          q = 2 == b;
        b = q || l;
        var z = a.startContainer,
          y = a.endContainer,
          x = a.startOffset,
          C = a.endOffset,
          D, H, E, I, G, J;
        if(q && y.type == CKEDITOR.NODE_TEXT && (z.equals(y) || z.type === CKEDITOR.NODE_ELEMENT && z.getFirst().equals(y))) c.append(a.document.createText(y.substring(x, C)));
        else {
          y.type == CKEDITOR.NODE_TEXT ? q ? J = !0 : y = y.split(C) : 0 < y.getChildCount() ? C >= y.getChildCount() ? (y = y.getChild(C - 1), H = !0) : y = y.getChild(C) : I = H = !0;
          z.type ==
            CKEDITOR.NODE_TEXT ? q ? G = !0 : z.split(x) : 0 < z.getChildCount() ? 0 === x ? (z = z.getChild(x), D = !0) : z = z.getChild(x - 1) : E = D = !0;
          for(var M = z.getParents(), F = y.getParents(), Q = m(), N = M.length - 1, R = F.length - 1, K = c, U, ca, ba, fa = -1, O = Q; O <= N; O++) {
            ca = M[O];
            ba = ca.getNext();
            for(O != N || ca.equals(F[O]) && N < R ? b && (U = K.append(ca.clone(0, f))) : D ? e(ca, K, !1, E) : G && K.append(a.document.createText(ca.substring(x))); ba;) {
              if(ba.equals(F[O])) {
                fa = O;
                break
              }
              ba = e(ba, K)
            }
            K = U
          }
          K = c;
          for(O = Q; O <= R; O++)
            if(c = F[O], ba = c.getPrevious(), c.equals(M[O])) b && (K = K.getChild(0));
            else {
              O != R || c.equals(M[O]) && R < N ? b && (U = K.append(c.clone(0, f))) : H ? e(c, K, !1, I) : J && K.append(a.document.createText(c.substring(0, C)));
              if(O > fa)
                for(; ba;) ba = e(ba, K, !0);
              K = U
            }
          q || k()
        }
      }

      function b() {
        var a = !1,
          b = CKEDITOR.dom.walker.whitespaces(),
          c = CKEDITOR.dom.walker.bookmark(!0),
          d = CKEDITOR.dom.walker.bogus();
        return function(f) {
          return c(f) || b(f) ? !0 : d(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(l) ? !1 : !0
        }
      }

      function c(a) {
        var b =
          CKEDITOR.dom.walker.whitespaces(),
          c = CKEDITOR.dom.walker.bookmark(1);
        return function(d) {
          return c(d) || b(d) ? !0 : !a && h(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
        }
      }

      function f(a) {
        return function() {
          var b;
          return this[a ? "getPreviousNode" : "getNextNode"](function(a) {
            !b && m(a) && (b = a);
            return k(a) && !(h(a) && a.equals(b))
          })
        }
      }
      var l = {
          abbr: 1,
          acronym: 1,
          b: 1,
          bdo: 1,
          big: 1,
          cite: 1,
          code: 1,
          del: 1,
          dfn: 1,
          em: 1,
          font: 1,
          i: 1,
          ins: 1,
          label: 1,
          kbd: 1,
          q: 1,
          samp: 1,
          small: 1,
          span: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          tt: 1,
          u: 1,
          "var": 1
        },
        h = CKEDITOR.dom.walker.bogus(),
        d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
        k = CKEDITOR.dom.walker.editable(),
        m = CKEDITOR.dom.walker.ignored(!0);
      CKEDITOR.dom.range.prototype = {
        clone: function() {
          var a = new CKEDITOR.dom.range(this.root);
          a._setStartContainer(this.startContainer);
          a.startOffset = this.startOffset;
          a._setEndContainer(this.endContainer);
          a.endOffset = this.endOffset;
          a.collapsed = this.collapsed;
          return a
        },
        collapse: function(a) {
          a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
            this.startOffset = this.endOffset);
          this.collapsed = !0
        },
        cloneContents: function(a) {
          var b = new CKEDITOR.dom.documentFragment(this.document);
          this.collapsed || e(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
          return b
        },
        deleteContents: function(a) {
          this.collapsed || e(this, 0, null, a)
        },
        extractContents: function(a, b) {
          var c = new CKEDITOR.dom.documentFragment(this.document);
          this.collapsed || e(this, 1, c, a, "undefined" == typeof b ? !0 : b);
          return c
        },
        createBookmark: function(a) {
          var b, c, d, f, e = this.collapsed;
          b = this.document.createElement("span");
          b.data("cke-bookmark", 1);
          b.setStyle("display", "none");
          b.setHtml("\x26nbsp;");
          a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (e ? "C" : "S")));
          e || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), f = this.clone(), f.collapse(), f.insertNode(c));
          f = this.clone();
          f.collapse(!0);
          f.insertNode(b);
          c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
          return {
            startNode: a ? d + (e ? "C" : "S") : b,
            endNode: a ? d + "E" : c,
            serializable: a,
            collapsed: e
          }
        },
        createBookmark2: function() {
          function a(b) {
            var g =
              b.container,
              d = b.offset,
              f;
            f = g;
            var e = d;
            f = f.type != CKEDITOR.NODE_ELEMENT || 0 === e || e == f.getChildCount() ? 0 : f.getChild(e - 1).type == CKEDITOR.NODE_TEXT && f.getChild(e).type == CKEDITOR.NODE_TEXT;
            f && (g = g.getChild(d - 1), d = g.getLength());
            if(g.type == CKEDITOR.NODE_ELEMENT && 0 < d) {
              a: {
                for(f = g; d--;)
                  if(e = f.getChild(d).getIndex(!0), 0 <= e) {
                    d = e;
                    break a
                  }
                d = -1
              }
              d += 1
            }
            if(g.type == CKEDITOR.NODE_TEXT) {
              f = g;
              for(e = 0;
                (f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;) e += f.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
              f = e;
              g.getText() ? d += f : (e = g.getPrevious(c), f ? (d = f, g = e ? e.getNext() : g.getParent().getFirst()) : (g = g.getParent(), d = e ? e.getIndex(!0) + 1 : 0))
            }
            b.container = g;
            b.offset = d
          }

          function b(a, c) {
            var g = c.getCustomData("cke-fillingChar");
            if(g) {
              var d = a.container;
              g.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent()))
            }
          }
          var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
          return function(c) {
            var d = this.collapsed,
              f = {
                container: this.startContainer,
                offset: this.startOffset
              },
              e = {
                container: this.endContainer,
                offset: this.endOffset
              };
            c && (a(f), b(f, this.root), d || (a(e), b(e, this.root)));
            return {
              start: f.container.getAddress(c),
              end: d ? null : e.container.getAddress(c),
              startOffset: f.offset,
              endOffset: e.offset,
              normalized: c,
              collapsed: d,
              is2: !0
            }
          }
        }(),
        moveToBookmark: function(a) {
          if(a.is2) {
            var b = this.document.getByAddress(a.start, a.normalized),
              c = a.startOffset,
              d = a.end && this.document.getByAddress(a.end, a.normalized);
            a = a.endOffset;
            this.setStart(b, c);
            d ? this.setEnd(d, a) : this.collapse(!0)
          } else b =
            (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
        },
        getBoundaryNodes: function() {
          var a = this.startContainer,
            b = this.endContainer,
            c = this.startOffset,
            d = this.endOffset,
            f;
          if(a.type == CKEDITOR.NODE_ELEMENT)
            if(f = a.getChildCount(), f > c) a = a.getChild(c);
            else if(1 > f) a = a.getPreviousSourceNode();
          else {
            for(a = a.$; a.lastChild;) a = a.lastChild;
            a = new CKEDITOR.dom.node(a);
            a =
              a.getNextSourceNode() || a
          }
          if(b.type == CKEDITOR.NODE_ELEMENT)
            if(f = b.getChildCount(), f > d) b = b.getChild(d).getPreviousSourceNode(!0);
            else if(1 > f) b = b.getPreviousSourceNode();
          else {
            for(b = b.$; b.lastChild;) b = b.lastChild;
            b = new CKEDITOR.dom.node(b)
          }
          a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
          return {
            startNode: a,
            endNode: b
          }
        },
        getCommonAncestor: function(a, b) {
          var c = this.startContainer,
            d = this.endContainer,
            c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) :
            c : c.getCommonAncestor(d);
          return b && !c.is ? c.getParent() : c
        },
        optimize: function() {
          var a = this.startContainer,
            b = this.startOffset;
          a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
          a = this.endContainer;
          b = this.endOffset;
          a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
        },
        optimizeBookmark: function() {
          var a = this.startContainer,
            b = this.endContainer;
          a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
          b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
        },
        trim: function(a, b) {
          var c = this.startContainer,
            d = this.startOffset,
            f = this.collapsed;
          if((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) {
            if(d)
              if(d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
              else {
                var e = c.split(d),
                  d = c.getIndex() + 1,
                  c = c.getParent();
                this.startContainer.equals(this.endContainer) ? this.setEnd(e, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
              }
            else d = c.getIndex(), c = c.getParent();
            this.setStart(c, d);
            if(f) {
              this.collapse(!0);
              return
            }
          }
          c = this.endContainer;
          d = this.endOffset;
          b || f || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
        },
        enlarge: function(a, b) {
          function c(a) {
            return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
          }
          var d = new RegExp(/[^\s\ufeff]/);
          switch(a) {
            case CKEDITOR.ENLARGE_INLINE:
              var f = 1;
            case CKEDITOR.ENLARGE_ELEMENT:
              var e = function(a, b) {
                var c = new CKEDITOR.dom.range(k);
                c.setStart(a, b);
                c.setEndAt(k, CKEDITOR.POSITION_BEFORE_END);
                var c = new CKEDITOR.dom.walker(c),
                  g;
                for(c.guard = function(a) {
                    return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
                  }; g = c.next();) {
                  if(g.type != CKEDITOR.NODE_TEXT) return !1;
                  D = g != a ? g.getText() : g.substring(b);
                  if(d.test(D)) return !1
                }
                return !0
              };
              if(this.collapsed) break;
              var m = this.getCommonAncestor(),
                k = this.root,
                h, l, q, z, y, x = !1,
                C, D;
              C = this.startContainer;
              var H = this.startOffset;
              C.type == CKEDITOR.NODE_TEXT ? (H && (C = !CKEDITOR.tools.trim(C.substring(0, H)).length &&
                C, x = !!C), C && ((z = C.getPrevious()) || (q = C.getParent()))) : (H && (z = C.getChild(H - 1) || C.getLast()), z || (q = C));
              for(q = c(q); q || z;) {
                if(q && !z) {
                  !y && q.equals(m) && (y = !0);
                  if(f ? q.isBlockBoundary() : !k.contains(q)) break;
                  x && "inline" == q.getComputedStyle("display") || (x = !1, y ? h = q : this.setStartBefore(q));
                  z = q.getPrevious()
                }
                for(; z;)
                  if(C = !1, z.type == CKEDITOR.NODE_COMMENT) z = z.getPrevious();
                  else {
                    if(z.type == CKEDITOR.NODE_TEXT) D = z.getText(), d.test(D) && (z = null), C = /[\s\ufeff]$/.test(D);
                    else if((z.$.offsetWidth > (CKEDITOR.env.webkit ? 1 :
                        0) || b && z.is("br")) && !z.data("cke-bookmark"))
                      if(x && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
                        D = z.getText();
                        if(d.test(D)) z = null;
                        else
                          for(var H = z.$.getElementsByTagName("*"), E = 0, I; I = H[E++];)
                            if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) {
                              z = null;
                              break
                            }
                        z && (C = !!D.length)
                      } else z = null;
                    C && (x ? y ? h = q : q && this.setStartBefore(q) : x = !0);
                    if(z) {
                      C = z.getPrevious();
                      if(!q && !C) {
                        q = z;
                        z = null;
                        break
                      }
                      z = C
                    } else q = null
                  }
                q && (q = c(q.getParent()))
              }
              C = this.endContainer;
              H = this.endOffset;
              q = z = null;
              y = x = !1;
              C.type == CKEDITOR.NODE_TEXT ?
                CKEDITOR.tools.trim(C.substring(H)).length ? x = !0 : (x = !C.getLength(), H == C.getLength() ? (z = C.getNext()) || (q = C.getParent()) : e(C, H) && (q = C.getParent())) : (z = C.getChild(H)) || (q = C);
              for(; q || z;) {
                if(q && !z) {
                  !y && q.equals(m) && (y = !0);
                  if(f ? q.isBlockBoundary() : !k.contains(q)) break;
                  x && "inline" == q.getComputedStyle("display") || (x = !1, y ? l = q : q && this.setEndAfter(q));
                  z = q.getNext()
                }
                for(; z;) {
                  C = !1;
                  if(z.type == CKEDITOR.NODE_TEXT) D = z.getText(), e(z, 0) || (z = null), C = /^[\s\ufeff]/.test(D);
                  else if(z.type == CKEDITOR.NODE_ELEMENT) {
                    if((0 < z.$.offsetWidth ||
                        b && z.is("br")) && !z.data("cke-bookmark"))
                      if(x && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
                        D = z.getText();
                        if(d.test(D)) z = null;
                        else
                          for(H = z.$.getElementsByTagName("*"), E = 0; I = H[E++];)
                            if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) {
                              z = null;
                              break
                            }
                        z && (C = !!D.length)
                      } else z = null
                  } else C = 1;
                  C && x && (y ? l = q : this.setEndAfter(q));
                  if(z) {
                    C = z.getNext();
                    if(!q && !C) {
                      q = z;
                      z = null;
                      break
                    }
                    z = C
                  } else q = null
                }
                q && (q = c(q.getParent()))
              }
              h && l && (m = h.contains(l) ? l : h, this.setStartBefore(m), this.setEndAfter(m));
              break;
            case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
            case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
              q =
                new CKEDITOR.dom.range(this.root);
              k = this.root;
              q.setStartAt(k, CKEDITOR.POSITION_AFTER_START);
              q.setEnd(this.startContainer, this.startOffset);
              q = new CKEDITOR.dom.walker(q);
              var G, J, M = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                  br: 1
                } : null),
                F = null,
                Q = function(a) {
                  if(a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
                    if(F) {
                      if(F.equals(a)) {
                        F = null;
                        return
                      }
                    } else F = a;
                  else if(F) return;
                  var b = M(a);
                  b || (G = a);
                  return b
                },
                f = function(a) {
                  var b = Q(a);
                  !b && a.is && a.is("br") &&
                    (J = a);
                  return b
                };
              q.guard = Q;
              q = q.lastBackward();
              G = G || k;
              this.setStartAt(G, !G.is("br") && (!q && this.checkStartOfBlock() || q && G.contains(q)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
              if(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                q = this.clone();
                q = new CKEDITOR.dom.walker(q);
                var N = CKEDITOR.dom.walker.whitespaces(),
                  R = CKEDITOR.dom.walker.bookmark();
                q.evaluator = function(a) {
                  return !N(a) && !R(a)
                };
                if((q = q.previous()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("br")) break
              }
              q = this.clone();
              q.collapse();
              q.setEndAt(k,
                CKEDITOR.POSITION_BEFORE_END);
              q = new CKEDITOR.dom.walker(q);
              q.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : Q;
              G = F = J = null;
              q = q.lastForward();
              G = G || k;
              this.setEndAt(G, !q && this.checkEndOfBlock() || q && G.contains(q) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
              J && this.setEndAfter(J)
          }
        },
        shrink: function(a, b, c) {
          var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0,
            f = c && c.skipBogus;
          if(!this.collapsed) {
            a = a || CKEDITOR.SHRINK_TEXT;
            var e = this.clone(),
              m =
              this.startContainer,
              k = this.endContainer,
              h = this.startOffset,
              l = this.endOffset,
              q = c = 1;
            m && m.type == CKEDITOR.NODE_TEXT && (h ? h >= m.getLength() ? e.setStartAfter(m) : (e.setStartBefore(m), c = 0) : e.setStartBefore(m));
            k && k.type == CKEDITOR.NODE_TEXT && (l ? l >= k.getLength() ? e.setEndAfter(k) : (e.setEndAfter(k), q = 0) : e.setEndBefore(k));
            var e = new CKEDITOR.dom.walker(e),
              z = CKEDITOR.dom.walker.bookmark(),
              y = CKEDITOR.dom.walker.bogus();
            e.evaluator = function(b) {
              return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
            };
            var x;
            e.guard = function(b, c) {
              if(f && y(b) || z(b)) return !0;
              if(a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(x) || !1 === d && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1;
              c || b.type != CKEDITOR.NODE_ELEMENT || (x = b);
              return !0
            };
            c && (m = e[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(m, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
            q && (e.reset(), (e = e[a == CKEDITOR.SHRINK_ELEMENT ?
              "lastBackward" : "previous"]()) && this.setEndAt(e, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
            return !(!c && !q)
          }
        },
        insertNode: function(a) {
          this.optimizeBookmark();
          this.trim(!1, !0);
          var b = this.startContainer,
            c = b.getChild(this.startOffset);
          c ? a.insertBefore(c) : b.append(a);
          a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
          this.setStartBefore(a)
        },
        moveToPosition: function(a, b) {
          this.setStartAt(a, b);
          this.collapse(!0)
        },
        moveToRange: function(a) {
          this.setStart(a.startContainer, a.startOffset);
          this.setEnd(a.endContainer, a.endOffset)
        },
        selectNodeContents: function(a) {
          this.setStart(a, 0);
          this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
        },
        setStart: function(b, c) {
          b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
          this._setStartContainer(b);
          this.startOffset = c;
          this.endContainer || (this._setEndContainer(b), this.endOffset = c);
          a(this)
        },
        setEnd: function(b, c) {
          b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() +
            1, b = b.getParent());
          this._setEndContainer(b);
          this.endOffset = c;
          this.startContainer || (this._setStartContainer(b), this.startOffset = c);
          a(this)
        },
        setStartAfter: function(a) {
          this.setStart(a.getParent(), a.getIndex() + 1)
        },
        setStartBefore: function(a) {
          this.setStart(a.getParent(), a.getIndex())
        },
        setEndAfter: function(a) {
          this.setEnd(a.getParent(), a.getIndex() + 1)
        },
        setEndBefore: function(a) {
          this.setEnd(a.getParent(), a.getIndex())
        },
        setStartAt: function(b, c) {
          switch(c) {
            case CKEDITOR.POSITION_AFTER_START:
              this.setStart(b, 0);
              break;
            case CKEDITOR.POSITION_BEFORE_END:
              b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
              break;
            case CKEDITOR.POSITION_BEFORE_START:
              this.setStartBefore(b);
              break;
            case CKEDITOR.POSITION_AFTER_END:
              this.setStartAfter(b)
          }
          a(this)
        },
        setEndAt: function(b, c) {
          switch(c) {
            case CKEDITOR.POSITION_AFTER_START:
              this.setEnd(b, 0);
              break;
            case CKEDITOR.POSITION_BEFORE_END:
              b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
              break;
            case CKEDITOR.POSITION_BEFORE_START:
              this.setEndBefore(b);
              break;
            case CKEDITOR.POSITION_AFTER_END:
              this.setEndAfter(b)
          }
          a(this)
        },
        fixBlock: function(a, b) {
          var c = this.createBookmark(),
            d = this.document.createElement(b);
          this.collapse(a);
          this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
          this.extractContents().appendTo(d);
          d.trim();
          this.insertNode(d);
          var f = d.getBogus();
          f && f.remove();
          d.appendBogus();
          this.moveToBookmark(c);
          return d
        },
        splitBlock: function(a, b) {
          var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
            d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
            f = c.block,
            e = d.block,
            m = null;
          if(!c.blockLimit.equals(d.blockLimit)) return null;
          "br" != a && (f || (f = this.fixBlock(!0, a), e = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), e || (e = this.fixBlock(!1, a)));
          c = f && this.checkStartOfBlock();
          d = e && this.checkEndOfBlock();
          this.deleteContents();
          f && f.equals(e) && (d ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), e = null) : c ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f,
            CKEDITOR.POSITION_BEFORE_START), f = null) : (e = this.splitElement(f, b || !1), f.is("ul", "ol") || f.appendBogus()));
          return {
            previousBlock: f,
            nextBlock: e,
            wasStartOfBlock: c,
            wasEndOfBlock: d,
            elementPath: m
          }
        },
        splitElement: function(a, b) {
          if(!this.collapsed) return null;
          this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
          var c = this.extractContents(!1, b || !1),
            d = a.clone(!1, b || !1);
          c.appendTo(d);
          d.insertAfter(a);
          this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
          return d
        },
        removeEmptyBlocksAtEnd: function() {
          function a(g) {
            return function(a) {
              return b(a) ||
                c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || g.is("table") && a.is("caption") ? !1 : !0
            }
          }
          var b = CKEDITOR.dom.walker.whitespaces(),
            c = CKEDITOR.dom.walker.bookmark(!1);
          return function(b) {
            for(var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, e; f && !f.equals(d.root) && !f.getFirst(a(f));) e = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = e;
            this.moveToBookmark(c)
          }
        }(),
        startPath: function() {
          return new CKEDITOR.dom.elementPath(this.startContainer,
            this.root)
        },
        endPath: function() {
          return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
        },
        checkBoundaryOfElement: function(a, b) {
          var d = b == CKEDITOR.START,
            f = this.clone();
          f.collapse(d);
          f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
          f = new CKEDITOR.dom.walker(f);
          f.evaluator = c(d);
          return f[d ? "checkBackward" : "checkForward"]()
        },
        checkStartOfBlock: function() {
          var a = this.startContainer,
            c = this.startOffset;
          CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0,
            c)), d.test(a) && this.trim(0, 1));
          this.trim();
          a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
          c = this.clone();
          c.collapse(!0);
          c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
          a = new CKEDITOR.dom.walker(c);
          a.evaluator = b();
          return a.checkBackward()
        },
        checkEndOfBlock: function() {
          var a = this.endContainer,
            c = this.endOffset;
          CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), d.test(a) && this.trim(1, 0));
          this.trim();
          a = new CKEDITOR.dom.elementPath(this.endContainer,
            this.root);
          c = this.clone();
          c.collapse(!1);
          c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
          a = new CKEDITOR.dom.walker(c);
          a.evaluator = b();
          return a.checkForward()
        },
        getPreviousNode: function(a, b, c) {
          var d = this.clone();
          d.collapse(1);
          d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
          c = new CKEDITOR.dom.walker(d);
          c.evaluator = a;
          c.guard = b;
          return c.previous()
        },
        getNextNode: function(a, b, c) {
          var d = this.clone();
          d.collapse();
          d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
          c = new CKEDITOR.dom.walker(d);
          c.evaluator = a;
          c.guard = b;
          return c.next()
        },
        checkReadOnly: function() {
          function a(b, c) {
            for(; b;) {
              if(b.type == CKEDITOR.NODE_ELEMENT) {
                if("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
                if(b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break
              }
              b = b.getParent()
            }
            return 1
          }
          return function() {
            var b = this.startContainer,
              c = this.endContainer;
            return !(a(b, c) && a(c, b))
          }
        }(),
        moveToElementEditablePosition: function(a, b) {
          if(a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a,
            b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
          for(var c = 0; a;) {
            if(a.type == CKEDITOR.NODE_TEXT) {
              b && this.endContainer && this.checkEndOfBlock() && d.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
              c = 1;
              break
            }
            if(a.type == CKEDITOR.NODE_ELEMENT)
              if(a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
              else if(b && a.is("br") && this.endContainer &&
              this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
            else if("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0;
            var f = a,
              e = c,
              k = void 0;
            f.type == CKEDITOR.NODE_ELEMENT && f.isEditable(!1) && (k = f[b ? "getLast" : "getFirst"](m));
            e || k || (k = f[b ? "getPrevious" : "getNext"](m));
            a = k
          }
          return !!c
        },
        moveToClosestEditablePosition: function(a, b) {
          var c, d = 0,
            f, e, m = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
          a ? (c = new CKEDITOR.dom.range(this.root),
            c.moveToPosition(a, m[b ? 0 : 1])) : c = this.clone();
          if(a && !a.is(CKEDITOR.dtd.$block)) d = 1;
          else if(f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (e = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && e && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(f, 0), c.collapse()) : c.moveToPosition(f, m[b ? 1 : 0]);
          d && this.moveToRange(c);
          return !!d
        },
        moveToElementEditStart: function(a) {
          return this.moveToElementEditablePosition(a)
        },
        moveToElementEditEnd: function(a) {
          return this.moveToElementEditablePosition(a, !0)
        },
        getEnclosedNode: function() {
          var a = this.clone();
          a.optimize();
          if(a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
          var a = new CKEDITOR.dom.walker(a),
            b = CKEDITOR.dom.walker.bookmark(!1, !0),
            c = CKEDITOR.dom.walker.whitespaces(!0);
          a.evaluator = function(a) {
            return c(a) && b(a)
          };
          var d = a.next();
          a.reset();
          return d && d.equals(a.previous()) ? d : null
        },
        getTouchedStartNode: function() {
          var a = this.startContainer;
          return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
        },
        getTouchedEndNode: function() {
          var a = this.endContainer;
          return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
        },
        getNextEditableNode: f(),
        getPreviousEditableNode: f(1),
        _getTableElement: function(a) {
          a = a || {
            td: 1,
            th: 1,
            tr: 1,
            tbody: 1,
            thead: 1,
            tfoot: 1,
            table: 1
          };
          var b = this.startContainer,
            c =
            this.endContainer,
            d = b.getAscendant("table", !0),
            f = c.getAscendant("table", !0);
          return CKEDITOR.env.safari && d && c.equals(this.root) ? b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && f && (d.equals(f) || d.contains(f) || f.contains(d)) ? b.getAscendant(a, !0) : null
        },
        scrollIntoView: function() {
          var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
            b, c, d, f = this.clone();
          f.optimize();
          (d = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = f.startContainer.getText(),
            b = f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a);
          a.scrollIntoView();
          d && (f.startContainer.setText(c), b.remove());
          a.remove()
        },
        _setStartContainer: function(a) {
          this.startContainer = a
        },
        _setEndContainer: function(a) {
          this.endContainer = a
        },
        _find: function(a, b) {
          var c = this.getCommonAncestor(),
            d = this.getBoundaryNodes(),
            f = [],
            e, m, k, h;
          if(c && c.find)
            for(m = c.find(a), e = 0; e < m.count(); e++)
              if(c = m.getItem(e), b || !c.isReadOnly()) k = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING ||
                d.startNode.equals(c), h = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || d.endNode.equals(c), k && h && f.push(c);
          return f
        }
      };
      CKEDITOR.dom.range.mergeRanges = function(a) {
        return CKEDITOR.tools.array.reduce(a, function(a, b) {
          var c = a[a.length - 1],
            d = !1;
          b = b.clone();
          b.enlarge(CKEDITOR.ENLARGE_ELEMENT);
          if(c) {
            var g = new CKEDITOR.dom.range(b.root),
              d = new CKEDITOR.dom.walker(g),
              f = CKEDITOR.dom.walker.whitespaces();
            g.setStart(c.endContainer, c.endOffset);
            g.setEnd(b.startContainer, b.startOffset);
            for(g = d.next(); f(g) || b.endContainer.equals(g);) g = d.next();
            d = !g
          }
          d ? c.setEnd(b.endContainer, b.endOffset) : a.push(b);
          return a
        }, [])
      }
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict",
    function() {
      function a(a) {
        1 >
          arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
      }

      function e(a) {
        var b = [];
        a.forEach(function(a) {
          if("true" == a.getAttribute("contenteditable")) return b.push(a), !1
        }, CKEDITOR.NODE_ELEMENT, !0);
        return b
      }

      function b(a, c, d, f) {
        a: {
          null == f && (f = e(d));
          for(var k; k = f.shift();)
            if(k.getDtd().p) {
              f = {
                element: k,
                remaining: f
              };
              break a
            }
          f = null
        }
        if(!f) return 0;
        if((k = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !k.check(c)) return b(a, c, d, f.remaining);
        c = new CKEDITOR.dom.range(f.element);c.selectNodeContents(f.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = k;a._.nestedEditable = {
          element: f.element,
          container: d,
          remaining: f.remaining,
          iterator: c
        };
        return 1
      }

      function c(a, b, c) {
        if(!b) return !1;
        a = a.clone();
        a.collapse(!c);
        return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
      }
      var f = /^[\r\n\t ]+$/,
        l = CKEDITOR.dom.walker.bookmark(!1, !0),
        h = CKEDITOR.dom.walker.whitespaces(!0),
        d = function(a) {
          return l(a) &&
            h(a)
        },
        k = {
          dd: 1,
          dt: 1,
          li: 1
        };
      a.prototype = {
        getNextParagraph: function(a) {
          var g, e, h, t, A;
          a = a || "p";
          if(this._.nestedEditable) {
            if(g = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g;
            this.activeFilter = this.filter;
            if(b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
            this._.nestedEditable = null
          }
          if(!this.range.root.getDtd()[a]) return null;
          if(!this._.started) {
            var u = this.range.clone();
            e = u.startPath();
            var r = u.endPath(),
              v = !u.collapsed && c(u, e.block),
              w = !u.collapsed && c(u, r.block, 1);
            u.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
            v && u.setStartAt(e.block, CKEDITOR.POSITION_BEFORE_END);
            w && u.setEndAt(r.block, CKEDITOR.POSITION_AFTER_START);
            e = u.endContainer.hasAscendant("pre", !0) || u.startContainer.hasAscendant("pre", !0);
            u.enlarge(this.forceBrBreak && !e || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
            u.collapsed || (e = new CKEDITOR.dom.walker(u.clone()),
              r = CKEDITOR.dom.walker.bookmark(!0, !0), e.evaluator = r, this._.nextNode = e.next(), e = new CKEDITOR.dom.walker(u.clone()), e.evaluator = r, e = e.previous(), this._.lastNode = e.getNextSourceNode(!0, null, u.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (r = this.range.clone(), r.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), r.checkEndOfBlock() && (r = new CKEDITOR.dom.elementPath(r.endContainer,
                r.root), this._.lastNode = (r.block || r.blockLimit).getNextSourceNode(!0))), this._.lastNode && u.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = u.document.createText(""), this._.lastNode.insertAfter(e)), u = null);
            this._.started = 1;
            e = u
          }
          r = this._.nextNode;
          u = this._.lastNode;
          for(this._.nextNode = null; r;) {
            var v = 0,
              w = r.hasAscendant("pre"),
              B = r.type != CKEDITOR.NODE_ELEMENT,
              q = 0;
            if(B) r.type == CKEDITOR.NODE_TEXT && f.test(r.getText()) && (B = 0);
            else {
              var z = r.getName();
              if(CKEDITOR.dtd.$block[z] && "false" == r.getAttribute("contenteditable")) {
                g =
                  r;
                b(this, a, g);
                break
              } else if(r.isBlockBoundary(this.forceBrBreak && !w && {
                  br: 1
                })) {
                if("br" == z) B = 1;
                else if(!e && !r.getChildCount() && "hr" != z) {
                  g = r;
                  h = r.equals(u);
                  break
                }
                e && (e.setEndAt(r, CKEDITOR.POSITION_BEFORE_START), "br" != z && (this._.nextNode = r));
                v = 1
              } else {
                if(r.getFirst()) {
                  e || (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
                  r = r.getFirst();
                  continue
                }
                B = 1
              }
            }
            B && !e && (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
            h = (!v || B) && r.equals(u);
            if(e && !v)
              for(; !r.getNext(d) && !h;) {
                z =
                  r.getParent();
                if(z.isBlockBoundary(this.forceBrBreak && !w && {
                    br: 1
                  })) {
                  v = 1;
                  B = 0;
                  h || z.equals(u);
                  e.setEndAt(z, CKEDITOR.POSITION_BEFORE_END);
                  break
                }
                r = z;
                B = 1;
                h = r.equals(u);
                q = 1
              }
            B && e.setEndAt(r, CKEDITOR.POSITION_AFTER_END);
            r = this._getNextSourceNode(r, q, u);
            if((h = !r) || v && e) break
          }
          if(!g) {
            if(!e) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
            g = new CKEDITOR.dom.elementPath(e.startContainer, e.root);
            r = g.blockLimit;
            v = {
              div: 1,
              th: 1,
              td: 1
            };
            g = g.block;
            !g && r && !this.enforceRealBlocks && v[r.getName()] &&
              e.checkStartOfBlock() && e.checkEndOfBlock() && !r.equals(e.root) ? g = r : !g || this.enforceRealBlocks && g.is(k) ? (g = this.range.document.createElement(a), e.extractContents().appendTo(g), g.trim(), e.insertNode(g), t = A = !0) : "li" != g.getName() ? e.checkStartOfBlock() && e.checkEndOfBlock() || (g = g.clone(!1), e.extractContents().appendTo(g), g.trim(), A = e.splitBlock(), t = !A.wasStartOfBlock, A = !A.wasEndOfBlock, e.insertNode(g)) : h || (this._.nextNode = g.equals(u) ? null : this._getNextSourceNode(e.getBoundaryNodes().endNode, 1, u))
          }
          t && (t =
            g.getPrevious()) && t.type == CKEDITOR.NODE_ELEMENT && ("br" == t.getName() ? t.remove() : t.getLast() && "br" == t.getLast().$.nodeName.toLowerCase() && t.getLast().remove());
          A && (t = g.getLast()) && t.type == CKEDITOR.NODE_ELEMENT && "br" == t.getName() && (!CKEDITOR.env.needsBrFiller || t.getPrevious(l) || t.getNext(l)) && t.remove();
          this._.nextNode || (this._.nextNode = h || g.equals(u) || !u ? null : this._getNextSourceNode(g, 1, u));
          return g
        },
        _getNextSourceNode: function(a, b, c) {
          function d(a) {
            return !(a.equals(c) || a.equals(f))
          }
          var f = this.range.root;
          for(a = a.getNextSourceNode(b, null, d); !l(a);) a = a.getNextSourceNode(b, null, d);
          return a
        }
      };
      CKEDITOR.dom.range.prototype.createIterator = function() {
        return new a(this)
      }
    }(), CKEDITOR.command = function(a, e) {
      this.uiItems = [];
      this.exec = function(b) {
        if(this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
        this.editorFocus && a.focus();
        return !1 === this.fire("exec") ? !0 : !1 !== e.exec.call(this, a, b)
      };
      this.refresh = function(a, b) {
        if(!this.readOnly && a.readOnly) return !0;
        if(this.context && !b.isContextFor(this.context) ||
          !this.checkAllowed(!0)) return this.disable(), !0;
        this.startDisabled || this.enable();
        this.modes && !this.modes[a.mode] && this.disable();
        return !1 === this.fire("refresh", {
          editor: a,
          path: b
        }) ? !0 : e.refresh && !1 !== e.refresh.apply(this, arguments)
      };
      var b;
      this.checkAllowed = function(c) {
        return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b
      };
      CKEDITOR.tools.extend(this, e, {
        modes: {
          wysiwyg: 1
        },
        editorFocus: 1,
        contextSensitive: !!e.context,
        state: CKEDITOR.TRISTATE_DISABLED
      });
      CKEDITOR.event.call(this)
    }, CKEDITOR.command.prototype = {
      enable: function() {
        this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
      },
      disable: function() {
        this.setState(CKEDITOR.TRISTATE_DISABLED)
      },
      setState: function(a) {
        if(this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
        this.previousState = this.state;
        this.state = a;
        this.fire("state");
        return !0
      },
      toggleState: function() {
        this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
          this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
      }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
      customConfig: "config.js",
      autoUpdateElement: !0,
      language: "",
      defaultLanguage: "en",
      contentsLangDirection: "",
      enterMode: CKEDITOR.ENTER_P,
      forceEnterMode: !1,
      shiftEnterMode: CKEDITOR.ENTER_BR,
      docType: "\x3c!DOCTYPE html\x3e",
      bodyId: "",
      bodyClass: "",
      fullPage: !1,
      height: 200,
      contentsCss: CKEDITOR.getUrl("contents.css"),
      extraPlugins: "",
      removePlugins: "",
      protectedSource: [],
      tabIndex: 0,
      width: "",
      baseFloatZIndex: 1E4,
      blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    },
    function() {
      function a(a, b, c, d, g) {
        var f, e;
        a = [];
        for(f in b) {
          e = b[f];
          e = "boolean" == typeof e ? {} : "function" == typeof e ? {
            match: e
          } : E(e);
          "$" != f.charAt(0) && (e.elements = f);
          c && (e.featureName = c.toLowerCase());
          var m = e;
          m.elements = h(m.elements, /\s+/) || null;
          m.propertiesOnly = m.propertiesOnly || !0 === m.elements;
          var k = /\s*,\s*/,
            l = void 0;
          for(l in J) {
            m[l] = h(m[l],
              k) || null;
            var r = m,
              n = M[l],
              q = h(m[M[l]], k),
              z = m[l],
              y = [],
              F = !0,
              w = void 0;
            q ? F = !1 : q = {};
            for(w in z) "!" == w.charAt(0) && (w = w.slice(1), y.push(w), q[w] = !0, F = !1);
            for(; w = y.pop();) z[w] = z["!" + w], delete z["!" + w];
            r[n] = (F ? !1 : q) || null
          }
          m.match = m.match || null;
          d.push(e);
          a.push(e)
        }
        b = g.elements;
        g = g.generic;
        var D;
        c = 0;
        for(d = a.length; c < d; ++c) {
          f = E(a[c]);
          e = !0 === f.classes || !0 === f.styles || !0 === f.attributes;
          m = f;
          l = n = k = void 0;
          for(k in J) m[k] = v(m[k]);
          r = !0;
          for(l in M) {
            k = M[l];
            n = m[k];
            q = [];
            z = void 0;
            for(z in n) - 1 < z.indexOf("*") ? q.push(new RegExp("^" +
              z.replace(/\*/g, ".*") + "$")) : q.push(z);
            n = q;
            n.length && (m[k] = n, r = !1)
          }
          m.nothingRequired = r;
          m.noProperties = !(m.attributes || m.classes || m.styles);
          if(!0 === f.elements || null === f.elements) g[e ? "unshift" : "push"](f);
          else
            for(D in m = f.elements, delete f.elements, m)
              if(b[D]) b[D][e ? "unshift" : "push"](f);
              else b[D] = [f]
        }
      }

      function e(a, c, g, f) {
        if(!a.match || a.match(c))
          if(f || d(a, c))
            if(a.propertiesOnly || (g.valid = !0), g.allAttributes || (g.allAttributes = b(a.attributes, c.attributes, g.validAttributes)), g.allStyles || (g.allStyles = b(a.styles,
                c.styles, g.validStyles)), !g.allClasses) {
              a = a.classes;
              c = c.classes;
              f = g.validClasses;
              if(a)
                if(!0 === a) a = !0;
                else {
                  for(var e = 0, m = c.length, k; e < m; ++e) k = c[e], f[k] || (f[k] = a(k));
                  a = !1
                }
              else a = !1;
              g.allClasses = a
            }
      }

      function b(a, b, c) {
        if(!a) return !1;
        if(!0 === a) return !0;
        for(var d in b) c[d] || (c[d] = a(d));
        return !1
      }

      function c(a, b, c) {
        if(!a.match || a.match(b)) {
          if(a.noProperties) return !1;
          c.hadInvalidAttribute = f(a.attributes, b.attributes) || c.hadInvalidAttribute;
          c.hadInvalidStyle = f(a.styles, b.styles) || c.hadInvalidStyle;
          a = a.classes;
          b = b.classes;
          if(a) {
            for(var d = !1, g = !0 === a, e = b.length; e--;)
              if(g || a(b[e])) b.splice(e, 1), d = !0;
            a = d
          } else a = !1;
          c.hadInvalidClass = a || c.hadInvalidClass
        }
      }

      function f(a, b) {
        if(!a) return !1;
        var c = !1,
          d = !0 === a,
          g;
        for(g in b)
          if(d || a(g)) delete b[g], c = !0;
        return c
      }

      function l(a, b, c) {
        if(a.disabled || a.customConfig && !c || !b) return !1;
        a._.cachedChecks = {};
        return !0
      }

      function h(a, b) {
        if(!a) return !1;
        if(!0 === a) return a;
        if("string" == typeof a) return a = I(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
        if(CKEDITOR.tools.isArray(a)) return a.length ?
          CKEDITOR.tools.convertArrayToObject(a) : !1;
        var c = {},
          d = 0,
          g;
        for(g in a) c[g] = a[g], d++;
        return d ? c : !1
      }

      function d(a, b) {
        if(a.nothingRequired) return !0;
        var c, d, g, f;
        if(g = a.requiredClasses)
          for(f = b.classes, c = 0; c < g.length; ++c)
            if(d = g[c], "string" == typeof d) {
              if(-1 == CKEDITOR.tools.indexOf(f, d)) return !1
            } else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(f, d)) return !1;
        return k(b.styles, a.requiredStyles) && k(b.attributes, a.requiredAttributes)
      }

      function k(a, b) {
        if(!b) return !0;
        for(var c = 0, d; c < b.length; ++c)
          if(d = b[c], "string" ==
            typeof d) {
            if(!(d in a)) return !1
          } else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1;
        return !0
      }

      function m(a) {
        if(!a) return {};
        a = a.split(/\s*,\s*/).sort();
        for(var b = {}; a.length;) b[a.shift()] = "cke-test";
        return b
      }

      function g(a) {
        var b, c, d, g, f = {},
          e = 1;
        for(a = I(a); b = a.match(F);)(c = b[2]) ? (d = n(c, "styles"), g = n(c, "attrs"), c = n(c, "classes")) : d = g = c = null, f["$" + e++] = {
          elements: b[1],
          classes: c,
          styles: d,
          attributes: g
        }, a = a.slice(b[0].length);
        return f
      }

      function n(a, b) {
        var c = a.match(Q[b]);
        return c ? I(c[1]) : null
      }

      function p(a) {
        var b = a.styleBackup = a.attributes.style,
          c = a.classBackup = a.attributes["class"];
        a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1));
        a.classes || (a.classes = c ? c.split(/\s+/) : [])
      }

      function t(a, b, d, g) {
        var f = 0,
          m;
        g.toHtml && (b.name = b.name.replace(N, "$1"));
        if(g.doCallbacks && a.elementCallbacks) {
          a: {
            m = a.elementCallbacks;
            for(var k = 0, h = m.length, l; k < h; ++k)
              if(l = m[k](b)) {
                m = l;
                break a
              }
            m = void 0
          }
          if(m) return m
        }
        if(g.doTransform && (m = a._.transformations[b.name])) {
          p(b);
          for(k = 0; k < m.length; ++k) z(a, b, m[k]);
          u(b)
        }
        if(g.doFilter) {
          a: {
            k =
            b.name;h = a._;a = h.allowedRules.elements[k];m = h.allowedRules.generic;k = h.disallowedRules.elements[k];h = h.disallowedRules.generic;l = g.skipRequired;
            var n = {
                valid: !1,
                validAttributes: {},
                validClasses: {},
                validStyles: {},
                allAttributes: !1,
                allClasses: !1,
                allStyles: !1,
                hadInvalidAttribute: !1,
                hadInvalidClass: !1,
                hadInvalidStyle: !1
              },
              q, y;
            if(a || m) {
              p(b);
              if(k)
                for(q = 0, y = k.length; q < y; ++q)
                  if(!1 === c(k[q], b, n)) {
                    a = null;
                    break a
                  }
              if(h)
                for(q = 0, y = h.length; q < y; ++q) c(h[q], b, n);
              if(a)
                for(q = 0, y = a.length; q < y; ++q) e(a[q], b, n, l);
              if(m)
                for(q =
                  0, y = m.length; q < y; ++q) e(m[q], b, n, l);
              a = n
            } else a = null
          }
          if(!a || !a.valid) return d.push(b), 1;y = a.validAttributes;
          var F = a.validStyles;m = a.validClasses;
          var k = b.attributes,
            w = b.styles,
            h = b.classes;l = b.classBackup;
          var v = b.styleBackup,
            D, M, x = [],
            n = [],
            E = /^data-cke-/;q = !1;delete k.style;delete k["class"];delete b.classBackup;delete b.styleBackup;
          if(!a.allAttributes)
            for(D in k) y[D] || (E.test(D) ? D == (M = D.replace(/^data-cke-saved-/, "")) || y[M] || (delete k[D], q = !0) : (delete k[D], q = !0));
          if(!a.allStyles || a.hadInvalidStyle) {
            for(D in w) a.allStyles ||
              F[D] ? x.push(D + ":" + w[D]) : q = !0;
            x.length && (k.style = x.sort().join("; "))
          } else v && (k.style = v);
          if(!a.allClasses || a.hadInvalidClass) {
            for(D = 0; D < h.length; ++D)(a.allClasses || m[h[D]]) && n.push(h[D]);
            n.length && (k["class"] = n.sort().join(" "));
            l && n.length < l.split(/\s+/).length && (q = !0)
          } else l && (k["class"] = l);q && (f = 1);
          if(!g.skipFinalValidation && !r(b)) return d.push(b), 1
        }
        g.toHtml && (b.name = b.name.replace(R, "cke:$1"));
        return f
      }

      function A(a) {
        var b = [],
          c;
        for(c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
        return b.length ?
          new RegExp("^(?:" + b.join("|") + ")$") : null
      }

      function u(a) {
        var b = a.attributes,
          c;
        delete b.style;
        delete b["class"];
        if(c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
        a.classes.length && (b["class"] = a.classes.sort().join(" "))
      }

      function r(a) {
        switch(a.name) {
          case "a":
            if(!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
            break;
          case "img":
            if(!a.attributes.src) return !1
        }
        return !0
      }

      function v(a) {
        if(!a) return !1;
        if(!0 === a) return !0;
        var b = A(a);
        return function(c) {
          return c in a || b && c.match(b)
        }
      }

      function w() {
        return new CKEDITOR.htmlParser.element("br")
      }

      function B(a) {
        return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || H.$block[a.name])
      }

      function q(a, b, c) {
        var d = a.name;
        if(H.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(w()) : (a.parent && c.push({
          check: "it",
          el: a.parent
        }), a.remove());
        else if(H.$block[d] || "tr" == d)
          if("br" == b) a.previous && !B(a.previous) && (b = w(), b.insertBefore(a)), a.next && !B(a.next) && (b = w(), b.insertAfter(a)), a.replaceWithChildren();
          else {
            var d = a.children,
              g;
            b: {
              g = H[b];
              for(var f = 0, e = d.length, m; f < e; ++f)
                if(m = d[f], m.type == CKEDITOR.NODE_ELEMENT &&
                  !g[m.name]) {
                  g = !1;
                  break b
                }
              g = !0
            }
            if(g) a.name = b, a.attributes = {}, c.push({
              check: "parent-down",
              el: a
            });
            else {
              g = a.parent;
              for(var f = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, k, h, e = d.length; 0 < e;) m = d[--e], f && (m.type == CKEDITOR.NODE_TEXT || m.type == CKEDITOR.NODE_ELEMENT && H.$inline[m.name]) ? (k || (k = new CKEDITOR.htmlParser.element(b), k.insertAfter(a), c.push({
                check: "parent-down",
                el: k
              })), k.add(m, 0)) : (k = null, h = H[g.name] || H.span, m.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || m.type != CKEDITOR.NODE_ELEMENT ||
                h[m.name] || c.push({
                  check: "el-up",
                  el: m
                }));
              a.remove()
            }
          }
        else d in {
          style: 1,
          script: 1
        } ? a.remove() : (a.parent && c.push({
          check: "it",
          el: a.parent
        }), a.replaceWithChildren())
      }

      function z(a, b, c) {
        var d, g;
        for(d = 0; d < c.length; ++d)
          if(g = c[d], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) {
            g.right(b, K);
            break
          }
      }

      function y(a, b) {
        var c = b.getDefinition(),
          d = c.attributes,
          g = c.styles,
          f, e, m, k;
        if(a.name != c.element) return !1;
        for(f in d)
          if("class" == f)
            for(c = d[f].split(/\s+/), m = a.classes.join("|"); k = c.pop();) {
              if(-1 == m.indexOf(k)) return !1
            } else if(a.attributes[f] !=
              d[f]) return !1;
        for(e in g)
          if(a.styles[e] != g[e]) return !1;
        return !0
      }

      function x(a, b) {
        var c, d;
        "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]);
        return [{
          element: c,
          left: d,
          right: function(a, c) {
            c.transform(a, b)
          }
        }]
      }

      function C(a) {
        return function(b) {
          return y(b, a)
        }
      }

      function D(a) {
        return function(b, c) {
          c[a](b)
        }
      }
      var H = CKEDITOR.dtd,
        E = CKEDITOR.tools.copy,
        I = CKEDITOR.tools.trim,
        G = ["", "p", "br", "div"];
      CKEDITOR.FILTER_SKIP_TREE = 2;
      CKEDITOR.filter = function(a) {
        this.allowedContent = [];
        this.disallowedContent = [];
        this.elementCallbacks = null;
        this.disabled = !1;
        this.editor = null;
        this.id = CKEDITOR.tools.getNextNumber();
        this._ = {
          allowedRules: {
            elements: {},
            generic: []
          },
          disallowedRules: {
            elements: {},
            generic: []
          },
          transformations: {},
          cachedTests: {},
          cachedChecks: {}
        };
        CKEDITOR.filter.instances[this.id] = this;
        if(a instanceof CKEDITOR.editor) {
          a = this.editor = a;
          this.customConfig = !0;
          var b = a.config.allowedContent;
          !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra",
            1), this.allow(G[a.enterMode] + " " + G[a.shiftEnterMode], "default", 1), this.disallow(a.config.disallowedContent))
        } else this.customConfig = !1, this.allow(a, "default", 1)
      };
      CKEDITOR.filter.instances = {};
      CKEDITOR.filter.prototype = {
        allow: function(b, c, d) {
          if(!l(this, b, d)) return !1;
          var f, e;
          if("string" == typeof b) b = g(b);
          else if(b instanceof CKEDITOR.style) {
            if(b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
            f = b.getDefinition();
            b = {};
            d = f.attributes;
            b[f.element] = f = {
              styles: f.styles,
              requiredStyles: f.styles &&
                CKEDITOR.tools.objectKeys(f.styles)
            };
            d && (d = E(d), f.classes = d["class"] ? d["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete d["class"], f.attributes = d, f.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
          } else if(CKEDITOR.tools.isArray(b)) {
            for(f = 0; f < b.length; ++f) e = this.allow(b[f], c, d);
            return e
          }
          a(this, b, c, this.allowedContent, this._.allowedRules);
          return !0
        },
        applyTo: function(a, b, c, d) {
          if(this.disabled) return !1;
          var g = this,
            f = [],
            e = this.editor && this.editor.config.protectedSource,
            m, k = !1,
            h = {
              doFilter: !c,
              doTransform: !0,
              doCallbacks: !0,
              toHtml: b
            };
          a.forEach(function(a) {
            if(a.type == CKEDITOR.NODE_ELEMENT) {
              if("off" == a.attributes["data-cke-filter"]) return !1;
              if(!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
                if(m = t(g, a, f, h), m & 1) k = !0;
                else if(m & 2) return !1
            } else if(a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
              var c;
              a: {
                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
                var l, r, q;
                if(e)
                  for(r = 0; r < e.length; ++r)
                    if((q = d.match(e[r])) &&
                      q[0].length == d.length) {
                      c = !0;
                      break a
                    }
                d = CKEDITOR.htmlParser.fragment.fromHtml(d);1 == d.children.length && (l = d.children[0]).type == CKEDITOR.NODE_ELEMENT && t(g, l, c, h);c = !c.length
              }
              c || f.push(a)
            }
          }, null, !0);
          f.length && (k = !0);
          var l;
          a = [];
          d = G[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
          for(var n; c = f.pop();) c.type == CKEDITOR.NODE_ELEMENT ? q(c, d, a) : c.remove();
          for(; l = a.pop();)
            if(c = l.el, c.parent) switch(n = H[c.parent.name] || H.span, l.check) {
              case "it":
                H.$removeEmpty[c.name] && !c.children.length ? q(c, d, a) : r(c) ||
                  q(c, d, a);
                break;
              case "el-up":
                c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || q(c, d, a);
                break;
              case "parent-down":
                c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || q(c.parent, d, a)
            }
          return k
        },
        checkFeature: function(a) {
          if(this.disabled || !a) return !0;
          a.toFeature && (a = a.toFeature(this.editor));
          return !a.requiredContent || this.check(a.requiredContent)
        },
        disable: function() {
          this.disabled = !0
        },
        disallow: function(b) {
          if(!l(this, b, !0)) return !1;
          "string" == typeof b && (b = g(b));
          a(this, b, null, this.disallowedContent,
            this._.disallowedRules);
          return !0
        },
        addContentForms: function(a) {
          if(!this.disabled && a) {
            var b, c, d = [],
              g;
            for(b = 0; b < a.length && !g; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (g = c);
            if(g) {
              for(b = 0; b < a.length; ++b) d.push(x(a[b], g));
              this.addTransformations(d)
            }
          }
        },
        addElementCallback: function(a) {
          this.elementCallbacks || (this.elementCallbacks = []);
          this.elementCallbacks.push(a)
        },
        addFeature: function(a) {
          if(this.disabled || !a) return !0;
          a.toFeature && (a = a.toFeature(this.editor));
          this.allow(a.allowedContent,
            a.name);
          this.addTransformations(a.contentTransformations);
          this.addContentForms(a.contentForms);
          return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
        },
        addTransformations: function(a) {
          var b, c;
          if(!this.disabled && a) {
            var d = this._.transformations,
              g;
            for(g = 0; g < a.length; ++g) {
              b = a[g];
              var f = void 0,
                e = void 0,
                m = void 0,
                k = void 0,
                h = void 0,
                l = void 0;
              c = [];
              for(e = 0; e < b.length; ++e) m = b[e], "string" == typeof m ? (m = m.split(/\s*:\s*/), k = m[0], h = null, l = m[1]) : (k = m.check, h = m.left,
                l = m.right), f || (f = m, f = f.element ? f.element : k ? k.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element), h instanceof CKEDITOR.style && (h = C(h)), c.push({
                check: k == f ? null : k,
                left: h,
                right: "string" == typeof l ? D(l) : l
              });
              b = f;
              d[b] || (d[b] = []);
              d[b].push(c)
            }
          }
        },
        check: function(a, b, c) {
          if(this.disabled) return !0;
          if(CKEDITOR.tools.isArray(a)) {
            for(var d = a.length; d--;)
              if(this.check(a[d], b, c)) return !0;
            return !1
          }
          var f, e;
          if("string" == typeof a) {
            e = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
            if(e in this._.cachedChecks) return this._.cachedChecks[e];
            d = g(a).$1;
            f = d.styles;
            var k = d.classes;
            d.name = d.elements;
            d.classes = k = k ? k.split(/\s*,\s*/) : [];
            d.styles = m(f);
            d.attributes = m(d.attributes);
            d.children = [];
            k.length && (d.attributes["class"] = k.join(" "));
            f && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
            f = d
          } else d = a.getDefinition(), f = d.styles, k = d.attributes || {}, f && !CKEDITOR.tools.isEmpty(f) ? (f = E(f), k.style = CKEDITOR.tools.writeCssText(f, !0)) : f = {}, f = {
            name: d.element,
            attributes: k,
            classes: k["class"] ? k["class"].split(/\s+/) : [],
            styles: f,
            children: []
          };
          var k =
            CKEDITOR.tools.clone(f),
            h = [],
            l;
          if(!1 !== b && (l = this._.transformations[f.name])) {
            for(d = 0; d < l.length; ++d) z(this, f, l[d]);
            u(f)
          }
          t(this, k, h, {
            doFilter: !0,
            doTransform: !1 !== b,
            skipRequired: !c,
            skipFinalValidation: !c
          });
          b = 0 < h.length ? !1 : CKEDITOR.tools.objectCompare(f.attributes, k.attributes, !0) ? !0 : !1;
          "string" == typeof a && (this._.cachedChecks[e] = b);
          return b
        },
        getAllowedEnterMode: function() {
          var a = ["p", "div", "br"],
            b = {
              p: CKEDITOR.ENTER_P,
              div: CKEDITOR.ENTER_DIV,
              br: CKEDITOR.ENTER_BR
            };
          return function(c, d) {
            var g = a.slice(),
              f;
            if(this.check(G[c])) return c;
            for(d || (g = g.reverse()); f = g.pop();)
              if(this.check(f)) return b[f];
            return CKEDITOR.ENTER_BR
          }
        }(),
        clone: function() {
          var a = new CKEDITOR.filter,
            b = CKEDITOR.tools.clone;
          a.allowedContent = b(this.allowedContent);
          a._.allowedRules = b(this._.allowedRules);
          a.disallowedContent = b(this.disallowedContent);
          a._.disallowedRules = b(this._.disallowedRules);
          a._.transformations = b(this._.transformations);
          a.disabled = this.disabled;
          a.editor = this.editor;
          return a
        },
        destroy: function() {
          delete CKEDITOR.filter.instances[this.id];
          delete this._;
          delete this.allowedContent;
          delete this.disallowedContent
        }
      };
      var J = {
          styles: 1,
          attributes: 1,
          classes: 1
        },
        M = {
          styles: "requiredStyles",
          attributes: "requiredAttributes",
          classes: "requiredClasses"
        },
        F = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
        Q = {
          styles: /{([^}]+)}/,
          attrs: /\[([^\]]+)\]/,
          classes: /\(([^\)]+)\)/
        },
        N = /^cke:(object|embed|param)$/,
        R = /^(object|embed|param)$/,
        K;
      K = CKEDITOR.filter.transformationsTools = {
        sizeToStyle: function(a) {
          this.lengthToStyle(a,
            "width");
          this.lengthToStyle(a, "height")
        },
        sizeToAttribute: function(a) {
          this.lengthToAttribute(a, "width");
          this.lengthToAttribute(a, "height")
        },
        lengthToStyle: function(a, b, c) {
          c = c || b;
          if(!(c in a.styles)) {
            var d = a.attributes[b];
            d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
          }
          delete a.attributes[b]
        },
        lengthToAttribute: function(a, b, c) {
          c = c || b;
          if(!(c in a.attributes)) {
            var d = a.styles[b],
              g = d && d.match(/^(\d+)(?:\.\d*)?px$/);
            g ? a.attributes[c] = g[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
          }
          delete a.styles[b]
        },
        alignmentToStyle: function(a) {
          if(!("float" in
              a.styles)) {
            var b = a.attributes.align;
            if("left" == b || "right" == b) a.styles["float"] = b
          }
          delete a.attributes.align
        },
        alignmentToAttribute: function(a) {
          if(!("align" in a.attributes)) {
            var b = a.styles["float"];
            if("left" == b || "right" == b) a.attributes.align = b
          }
          delete a.styles["float"]
        },
        splitBorderShorthand: function(a) {
          function b(d) {
            a.styles["border-top-width"] = c[d[0]];
            a.styles["border-right-width"] = c[d[1]];
            a.styles["border-bottom-width"] = c[d[2]];
            a.styles["border-left-width"] = c[d[3]]
          }
          if(a.styles.border) {
            var c = a.styles.border.match(/([\.\d]+\w+)/g) || ["0px"];
            switch(c.length) {
              case 1:
                a.styles["border-width"] = c[0];
                break;
              case 2:
                b([0, 1, 0, 1]);
                break;
              case 3:
                b([0, 1, 2, 1]);
                break;
              case 4:
                b([0, 1, 2, 3])
            }
            a.styles["border-style"] = a.styles["border-style"] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0];
            a.styles["border-style"] || delete a.styles["border-style"];
            delete a.styles.border
          }
        },
        listTypeToStyle: function(a) {
          if(a.attributes.type) switch(a.attributes.type) {
            case "a":
              a.styles["list-style-type"] =
                "lower-alpha";
              break;
            case "A":
              a.styles["list-style-type"] = "upper-alpha";
              break;
            case "i":
              a.styles["list-style-type"] = "lower-roman";
              break;
            case "I":
              a.styles["list-style-type"] = "upper-roman";
              break;
            case "1":
              a.styles["list-style-type"] = "decimal";
              break;
            default:
              a.styles["list-style-type"] = a.attributes.type
          }
        },
        splitMarginShorthand: function(a) {
          function b(d) {
            a.styles["margin-top"] = c[d[0]];
            a.styles["margin-right"] = c[d[1]];
            a.styles["margin-bottom"] = c[d[2]];
            a.styles["margin-left"] = c[d[3]]
          }
          if(a.styles.margin) {
            var c =
              a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
            switch(c.length) {
              case 1:
                b([0, 0, 0, 0]);
                break;
              case 2:
                b([0, 1, 0, 1]);
                break;
              case 3:
                b([0, 1, 2, 1]);
                break;
              case 4:
                b([0, 1, 2, 3])
            }
            delete a.styles.margin
          }
        },
        matchesStyle: y,
        transform: function(a, b) {
          if("string" == typeof b) a.name = b;
          else {
            var c = b.getDefinition(),
              d = c.styles,
              g = c.attributes,
              f, e, m, k;
            a.name = c.element;
            for(f in g)
              if("class" == f)
                for(c = a.classes.join("|"), m = g[f].split(/\s+/); k = m.pop();) - 1 == c.indexOf(k) && a.classes.push(k);
              else a.attributes[f] = g[f];
            for(e in d) a.styles[e] =
              d[e]
          }
        }
      }
    }(),
    function() {
      CKEDITOR.focusManager = function(a) {
        if(a.focusManager) return a.focusManager;
        this.hasFocus = !1;
        this.currentActive = null;
        this._ = {
          editor: a
        };
        return this
      };
      CKEDITOR.focusManager._ = {
        blurDelay: 200
      };
      CKEDITOR.focusManager.prototype = {
        focus: function(a) {
          this._.timer && clearTimeout(this._.timer);
          a && (this.currentActive = a);
          this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
        },
        lock: function() {
          this._.locked = 1
        },
        unlock: function() {
          delete this._.locked
        },
        blur: function(a) {
          function e() {
            if(this.hasFocus) {
              this.hasFocus = !1;
              var a = this._.editor.container;
              a && a.removeClass("cke_focus");
              this._.editor.fire("blur")
            }
          }
          if(!this._.locked) {
            this._.timer && clearTimeout(this._.timer);
            var b = CKEDITOR.focusManager._.blurDelay;
            a || !b ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
              delete this._.timer;
              e.call(this)
            }, b, this)
          }
        },
        add: function(a, e) {
          var b = a.getCustomData("focusmanager");
          if(!b ||
            b != this) {
            b && b.remove(a);
            var b = "focus",
              c = "blur";
            e && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
            var f = {
              blur: function() {
                a.equals(this.currentActive) && this.blur()
              },
              focus: function() {
                this.focus(a)
              }
            };
            a.on(b, f.focus, this);
            a.on(c, f.blur, this);
            e && (CKEDITOR.event.useCapture = 0);
            a.setCustomData("focusmanager", this);
            a.setCustomData("focusmanager_handlers", f)
          }
        },
        remove: function(a) {
          a.removeCustomData("focusmanager");
          var e = a.removeCustomData("focusmanager_handlers");
          a.removeListener("blur",
            e.blur);
          a.removeListener("focus", e.focus)
        }
      }
    }(), CKEDITOR.keystrokeHandler = function(a) {
      if(a.keystrokeHandler) return a.keystrokeHandler;
      this.keystrokes = {};
      this.blockedKeystrokes = {};
      this._ = {
        editor: a
      };
      return this
    },
    function() {
      var a, e = function(b) {
          b = b.data;
          var f = b.getKeystroke(),
            e = this.keystrokes[f],
            h = this._.editor;
          a = !1 === h.fire("key", {
            keyCode: f,
            domEvent: b
          });
          a || (e && (a = !1 !== h.execCommand(e, {
            from: "keystrokeHandler"
          })), a || (a = !!this.blockedKeystrokes[f]));
          a && b.preventDefault(!0);
          return !a
        },
        b = function(b) {
          a && (a = !1, b.data.preventDefault(!0))
        };
      CKEDITOR.keystrokeHandler.prototype = {
        attach: function(a) {
          a.on("keydown", e, this);
          if(CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this)
        }
      }
    }(),
    function() {
      CKEDITOR.lang = {
        languages: {
          af: 1,
          ar: 1,
          az: 1,
          bg: 1,
          bn: 1,
          bs: 1,
          ca: 1,
          cs: 1,
          cy: 1,
          da: 1,
          de: 1,
          "de-ch": 1,
          el: 1,
          "en-au": 1,
          "en-ca": 1,
          "en-gb": 1,
          en: 1,
          eo: 1,
          es: 1,
          "es-mx": 1,
          et: 1,
          eu: 1,
          fa: 1,
          fi: 1,
          fo: 1,
          "fr-ca": 1,
          fr: 1,
          gl: 1,
          gu: 1,
          he: 1,
          hi: 1,
          hr: 1,
          hu: 1,
          id: 1,
          is: 1,
          it: 1,
          ja: 1,
          ka: 1,
          km: 1,
          ko: 1,
          ku: 1,
          lt: 1,
          lv: 1,
          mk: 1,
          mn: 1,
          ms: 1,
          nb: 1,
          nl: 1,
          no: 1,
          oc: 1,
          pl: 1,
          "pt-br": 1,
          pt: 1,
          ro: 1,
          ru: 1,
          si: 1,
          sk: 1,
          sl: 1,
          sq: 1,
          "sr-latn": 1,
          sr: 1,
          sv: 1,
          th: 1,
          tr: 1,
          tt: 1,
          ug: 1,
          uk: 1,
          vi: 1,
          "zh-cn": 1,
          zh: 1
        },
        rtl: {
          ar: 1,
          fa: 1,
          he: 1,
          ku: 1,
          ug: 1
        },
        load: function(a, e, b) {
          a && CKEDITOR.lang.languages[a] || (a = this.detect(e, a));
          var c = this;
          e = function() {
            c[a].dir = c.rtl[a] ? "rtl" : "ltr";
            b(a, c[a])
          };
          this[a] ? e() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), e, this)
        },
        detect: function(a, e) {
          var b = this.languages;
          e = e || navigator.userLanguage || navigator.language || a;
          var c = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
            f = c[1],
            c = c[2];
          b[f + "-" + c] ? f = f + "-" + c : b[f] || (f = null);
          CKEDITOR.lang.detect = f ? function() {
            return f
          } : function(a) {
            return a
          };
          return f || a
        }
      }
    }(), CKEDITOR.scriptLoader = function() {
      var a = {},
        e = {};
      return {
        load: function(b, c, f, l) {
          var h = "string" == typeof b;
          h && (b = [b]);
          f || (f = CKEDITOR);
          var d = b.length,
            k = [],
            m = [],
            g = function(a) {
              c && (h ? c.call(f, a) : c.call(f, k, m))
            };
          if(0 === d) g(!0);
          else {
            var n = function(a, b) {
                (b ? k : m).push(a);
                0 >= --d && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), g(b))
              },
              p = function(b, c) {
                a[b] = 1;
                var d = e[b];
                delete e[b];
                for(var g = 0; g < d.length; g++) d[g](b, c)
              },
              t = function(b) {
                if(a[b]) n(b, !0);
                else {
                  var d = e[b] || (e[b] = []);
                  d.push(n);
                  if(!(1 < d.length)) {
                    var g = new CKEDITOR.dom.element("script");
                    g.setAttributes({
                      type: "text/javascript",
                      src: b
                    });
                    c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function() {
                      if("loaded" == g.$.readyState || "complete" == g.$.readyState) g.$.onreadystatechange = null, p(b, !0)
                    } : (g.$.onload = function() {
                      setTimeout(function() {
                        p(b, !0)
                      }, 0)
                    }, g.$.onerror = function() {
                      p(b, !1)
                    }));
                    g.appendTo(CKEDITOR.document.getHead())
                  }
                }
              };
            l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
            for(var A = 0; A < d; A++) t(b[A])
          }
        },
        queue: function() {
          function a() {
            var b;
            (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
          }
          var c = [];
          return function(f, e) {
            var h = this;
            c.push({
              scriptUrl: f,
              callback: function() {
                e && e.apply(this, arguments);
                c.shift();
                a.call(h)
              }
            });
            1 == c.length && a.call(this)
          }
        }()
      }
    }(), CKEDITOR.resourceManager = function(a, e) {
      this.basePath = a;
      this.fileName = e;
      this.registered = {};
      this.loaded = {};
      this.externals = {};
      this._ = {
        waitingList: {}
      }
    }, CKEDITOR.resourceManager.prototype = {
      add: function(a, e) {
        if(this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
        var b = this.registered[a] = e || {};
        b.name = a;
        b.path = this.getPath(a);
        CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
        return this.get(a)
      },
      get: function(a) {
        return this.registered[a] || null
      },
      getPath: function(a) {
        var e = this.externals[a];
        return CKEDITOR.getUrl(e && e.dir || this.basePath +
          a + "/")
      },
      getFilePath: function(a) {
        var e = this.externals[a];
        return CKEDITOR.getUrl(this.getPath(a) + (e ? e.file : this.fileName + ".js"))
      },
      addExternal: function(a, e, b) {
        a = a.split(",");
        for(var c = 0; c < a.length; c++) {
          var f = a[c];
          b || (e = e.replace(/[^\/]+$/, function(a) {
            b = a;
            return ""
          }));
          this.externals[f] = {
            dir: e,
            file: b || this.fileName + ".js"
          }
        }
      },
      load: function(a, e, b) {
        CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
        for(var c = this.loaded, f = this.registered, l = [], h = {}, d = {}, k = 0; k < a.length; k++) {
          var m = a[k];
          if(m)
            if(c[m] || f[m]) d[m] = this.get(m);
            else {
              var g = this.getFilePath(m);
              l.push(g);
              g in h || (h[g] = []);
              h[g].push(m)
            }
        }
        CKEDITOR.scriptLoader.load(l, function(a, g) {
          if(g.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + h[g[0]].join(",") + '" was not found at "' + g[0] + '".');
          for(var f = 0; f < a.length; f++)
            for(var m = h[a[f]], k = 0; k < m.length; k++) {
              var l = m[k];
              d[l] = this.get(l);
              c[l] = 1
            }
          e.call(b, d)
        }, this)
      }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
      var e = {};
      return function(b, c, f) {
        var l = {},
          h = function(b) {
            a.call(this, b, function(a) {
              CKEDITOR.tools.extend(l, a);
              var b = [],
                d;
              for(d in a) {
                var n = a[d],
                  p = n && n.requires;
                if(!e[d]) {
                  if(n.icons)
                    for(var t = n.icons.split(","), A = t.length; A--;) CKEDITOR.skin.addIcon(t[A], n.path + "icons/" + (CKEDITOR.env.hidpi && n.hidpi ? "hidpi/" : "") + t[A] + ".png");
                  e[d] = 1
                }
                if(p)
                  for(p.split && (p = p.split(",")), n = 0; n < p.length; n++) l[p[n]] || b.push(p[n])
              }
              if(b.length) h.call(this, b);
              else {
                for(d in l) n = l[d], n.onLoad && !n.onLoad._called && (!1 === n.onLoad() && delete l[d],
                  n.onLoad._called = 1);
                c && c.call(f || window, l)
              }
            }, this)
          };
        h.call(this, b)
      }
    }), CKEDITOR.plugins.setLang = function(a, e, b) {
      var c = this.get(a);
      a = c.langEntries || (c.langEntries = {});
      c = c.lang || (c.lang = []);
      c.split && (c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, e) && c.push(e);
      a[e] = b
    }, CKEDITOR.ui = function(a) {
      if(a.ui) return a.ui;
      this.items = {};
      this.instances = {};
      this.editor = a;
      this._ = {
        handlers: {}
      };
      return this
    }, CKEDITOR.ui.prototype = {
      add: function(a, e, b) {
        b.name = a.toLowerCase();
        var c = this.items[a] = {
          type: e,
          command: b.command ||
            null,
          args: Array.prototype.slice.call(arguments, 2)
        };
        CKEDITOR.tools.extend(c, b)
      },
      get: function(a) {
        return this.instances[a]
      },
      create: function(a) {
        var e = this.items[a],
          b = e && this._.handlers[e.type],
          c = e && e.command && this.editor.getCommand(e.command),
          b = b && b.create.apply(this, e.args);
        this.instances[a] = b;
        c && c.uiItems.push(b);
        b && !b.type && (b.type = e.type);
        return b
      },
      addHandler: function(a, e) {
        this._.handlers[a] = e
      },
      space: function(a) {
        return CKEDITOR.document.getById(this.spaceId(a))
      },
      spaceId: function(a) {
        return this.editor.id +
          "_" + a
      }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui),
    function() {
      function a(a, g, f) {
        CKEDITOR.event.call(this);
        a = a && CKEDITOR.tools.clone(a);
        if(void 0 !== g) {
          if(!(g instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
          if(!f) throw Error("One of the element modes must be specified.");
          if(CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
          if(!b(g, f)) throw Error('The specified element mode is not supported on element: "' +
            g.getName() + '".');
          this.element = g;
          this.elementMode = f;
          this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (g.getId() || g.getNameAtt())
        } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
        this._ = {};
        this.commands = {};
        this.templates = {};
        this.name = this.name || e();
        this.id = CKEDITOR.tools.getNextId();
        this.status = "unloaded";
        this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
        this.ui = new CKEDITOR.ui(this);
        this.focusManager = new CKEDITOR.focusManager(this);
        this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
        this.on("readOnly", c);
        this.on("selectionChange", function(a) {
          l(this, a.data.path)
        });
        this.on("activeFilterChange", function() {
          l(this, this.elementPath(), !0)
        });
        this.on("mode", c);
        this.on("instanceReady", function() {
          this.config.startupFocus && this.focus()
        });
        CKEDITOR.fire("instanceCreated", null, this);
        CKEDITOR.add(this);
        CKEDITOR.tools.setTimeout(function() {
          "destroyed" !== this.status ? d(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
        }, 0, this)
      }

      function e() {
        do var a = "editor" + ++A; while (CKEDITOR.instances[a]);
        return a
      }

      function b(a, b) {
        return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1
      }

      function c() {
        var a = this.commands,
          b;
        for(b in a) f(this, a[b])
      }

      function f(a, b) {
        b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
      }

      function l(a, b, c) {
        if(b) {
          var d, g, f = a.commands;
          for(g in f) d = f[g], (c || d.contextSensitive) && d.refresh(a, b)
        }
      }

      function h(a) {
        var b = a.config.customConfig;
        if(!b) return !1;
        var b = CKEDITOR.getUrl(b),
          c = u[b] || (u[b] = {});
        c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() {
          c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
          h(a)
        });
        return !0
      }

      function d(a, b) {
        a.on("customConfigLoaded", function() {
          if(b) {
            if(b.on)
              for(var c in b.on) a.on(c, b.on[c]);
            CKEDITOR.tools.extend(a.config, b, !0);
            delete a.config.on
          }
          c = a.config;
          a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ?
            a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
          a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
          a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
          a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
          a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
          c.skin && (CKEDITOR.skinName = c.skin);
          a.fireOnce("configLoaded");
          a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
          a.filter = a.activeFilter = new CKEDITOR.filter(a);
          k(a)
        });
        b && null != b.customConfig && (a.config.customConfig = b.customConfig);
        h(a) || a.fireOnce("customConfigLoaded")
      }

      function k(a) {
        CKEDITOR.skin.loadPart("editor", function() {
          m(a)
        })
      }

      function m(a) {
        CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b,
          c) {
          var d = a.config.title;
          a.langCode = b;
          a.lang = CKEDITOR.tools.prototypedCopy(c);
          // a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
          a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
          a.fire("langLoaded");
          g(a)
        })
      }

      function g(a) {
        a.getStylesSet(function(b) {
          a.once("loaded", function() {
            a.fire("stylesSet", {
              styles: b
            })
          }, null, null, 1);
          n(a)
        })
      }

      function n(a) {
        var b = a.config,
          c = b.plugins,
          d = b.extraPlugins,
          g =
          b.removePlugins;
        if(d) var f = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
          c = c.replace(f, ""),
          c = c + ("," + d);
        if(g) var e = new RegExp("(?:^|,)(?:" + g.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
          c = c.replace(e, "");
        CKEDITOR.env.air && (c += ",adobeair");
        CKEDITOR.plugins.load(c.split(","), function(c) {
          var d = [],
            g = [],
            f = [];
          a.plugins = c;
          for(var m in c) {
            var k = c[m],
              h = k.lang,
              l = null,
              q = k.requires,
              n;
            CKEDITOR.tools.isArray(q) && (q = q.join(","));
            if(q && (n = q.match(e)))
              for(; q = n.pop();) CKEDITOR.error("editor-plugin-required", {
                plugin: q.replace(",", ""),
                requiredBy: m
              });
            h && !a.lang[m] && (h.split && (h = h.split(",")), 0 <= CKEDITOR.tools.indexOf(h, a.langCode) ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(h, l) ? l : 0 <= CKEDITOR.tools.indexOf(h, "en") ? "en" : h[0]), k.langEntries && k.langEntries[l] ? (a.lang[m] = k.langEntries[l], l = null) : f.push(CKEDITOR.getUrl(k.path + "lang/" + l + ".js")));
            g.push(l);
            d.push(k)
          }
          CKEDITOR.scriptLoader.load(f, function() {
            for(var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++)
              for(var e =
                  0; e < d.length; e++) {
                var m = d[e];
                0 === f && g[e] && m.lang && m.langEntries && (a.lang[m.name] = m.langEntries[g[e]]);
                if(m[c[f]]) m[c[f]](a)
              }
            a.fireOnce("pluginsLoaded");
            b.keystrokes && a.setKeystroke(a.config.keystrokes);
            for(e = 0; e < a.config.blockedKeystrokes.length; e++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] = 1;
            a.status = "loaded";
            a.fireOnce("loaded");
            CKEDITOR.fire("instanceLoaded", null, a)
          })
        })
      }

      function p() {
        var a = this.element;
        if(a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
          var b = this.getData();
          this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
          a.is("textarea") ? a.setValue(b) : a.setHtml(b);
          return !0
        }
        return !1
      }

      function t(a, b) {
        function c(a) {
          var b = a.startContainer,
            d = a.endContainer;
          return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1
        }

        function d(a) {
          var b = a.startContainer;
          return b.is("tr") ? a.cloneContents() : b.clone(!0)
        }
        for(var g = new CKEDITOR.dom.documentFragment, f, e, m, k = 0; k < a.length; k++) {
          var h = a[k],
            l = h.startContainer.getAscendant("tr", !0);
          c(h) ? (f ||
            (f = l.getAscendant("table").clone(), f.append(l.getAscendant({
              thead: 1,
              tbody: 1,
              tfoot: 1
            }).clone()), g.append(f), f = f.findOne("thead, tbody, tfoot")), e && e.equals(l) || (e = l, m = l.clone(), f.append(m)), m.append(d(h))) : g.append(h.cloneContents())
        }
        return f ? g : b.getHtmlFromRange(a[0])
      }
      a.prototype = CKEDITOR.editor.prototype;
      CKEDITOR.editor = a;
      var A = 0,
        u = {};
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        addCommand: function(a, b) {
          b.name = a.toLowerCase();
          var c = new CKEDITOR.command(this, b);
          this.mode && f(this, c);
          return this.commands[a] =
            c
        },
        _attachToForm: function() {
          function a(b) {
            c.updateElement();
            c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
          }

          function b(a) {
            return !!(a && a.call && a.apply)
          }
          var c = this,
            d = c.element,
            g = new CKEDITOR.dom.element(d.$.form);
          d.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function(b) {
            return function() {
              a();
              b.apply ? b.apply(this) : b()
            }
          })), c.on("destroy", function() {
            g.removeListener("submit", a)
          }))
        },
        destroy: function(a) {
          this.fire("beforeDestroy");
          !a && p.call(this);
          this.editable(null);
          this.filter && (this.filter.destroy(), delete this.filter);
          delete this.activeFilter;
          this.status = "destroyed";
          this.fire("destroy");
          this.removeAllListeners();
          CKEDITOR.remove(this);
          CKEDITOR.fire("instanceDestroyed", null, this)
        },
        elementPath: function(a) {
          if(!a) {
            a = this.getSelection();
            if(!a) return null;
            a = a.getStartElement()
          }
          return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
        },
        createRange: function() {
          var a = this.editable();
          return a ? new CKEDITOR.dom.range(a) : null
        },
        execCommand: function(a,
          b) {
          var c = this.getCommand(a),
            d = {
              name: a,
              commandData: b || {},
              command: c
            };
          return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
        },
        getCommand: function(a) {
          return this.commands[a]
        },
        getData: function(a) {
          !a && this.fire("beforeGetData");
          var b = this._.data;
          "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() :
            "");
          b = {
            dataValue: b
          };
          !a && this.fire("getData", b);
          return b.dataValue
        },
        getSnapshot: function() {
          var a = this.fire("getSnapshot");
          "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
          return a
        },
        loadSnapshot: function(a) {
          this.fire("loadSnapshot", a)
        },
        setData: function(a, b, c) {
          var d = !0,
            g = b;
          b && "object" == typeof b && (c = b.internal, g = b.callback, d = !b.noSnapshot);
          !c && d && this.fire("saveSnapshot");
          if(g || !c) this.once("dataReady", function(a) {
            !c &&
              d && this.fire("saveSnapshot");
            g && g.call(a.editor)
          });
          a = {
            dataValue: a
          };
          !c && this.fire("setData", a);
          this._.data = a.dataValue;
          !c && this.fire("afterSetData", a)
        },
        setReadOnly: function(a) {
          a = null == a || a;
          this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
        },
        /** 增加是否focus支持 by caoyun **/
        insertHtml: function(a, b, c, d) {
          this.fire("insertHtml", {
            dataValue: a,
            mode: b,
            range: c,
            beFocus: typeof(d) === 'undefined' ? true : d
          })
        },
        insertText: function(a) {
          this.fire("insertText", a)
        },
        insertElement: function(a) {
          this.fire("insertElement",
            a)
        },
        getSelectedHtml: function(a) {
          var b = this.editable(),
            c = this.getSelection(),
            c = c && c.getRanges();
          if(!b || !c || 0 === c.length) return null;
          b = t(c, b);
          return a ? b.getHtml() : b
        },
        extractSelectedHtml: function(a, b) {
          var c = this.editable(),
            d = this.getSelection().getRanges(),
            g = new CKEDITOR.dom.documentFragment,
            f;
          if(!c || 0 === d.length) return null;
          for(f = 0; f < d.length; f++) g.append(c.extractHtmlFromRange(d[f], b));
          b || this.getSelection().selectRanges([d[0]]);
          return a ? g.getHtml() : g
        },
        focus: function() {
          this.fire("beforeFocus")
        },
        checkDirty: function() {
          return "ready" ==
            this.status && this._.previousValue !== this.getSnapshot()
        },
        resetDirty: function() {
          this._.previousValue = this.getSnapshot()
        },
        updateElement: function() {
          return p.call(this)
        },
        setKeystroke: function() {
          for(var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
              [].slice.call(arguments, 0)
            ], c, d, g = b.length; g--;) c = b[g], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
        },
        getCommandKeystroke: function(a) {
          if(a = "string" === typeof a ? this.getCommand(a) : a) {
            var b = CKEDITOR.tools.object.findKey(this.commands,
                a),
              c = this.keystrokeHandler.keystrokes,
              d;
            if(a.fakeKeystroke) return a.fakeKeystroke;
            for(d in c)
              if(c.hasOwnProperty(d) && c[d] == b) return d
          }
          return null
        },
        addFeature: function(a) {
          return this.filter.addFeature(a)
        },
        setActiveFilter: function(a) {
          a || (a = this.filter);
          this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
        },
        setActiveEnterMode: function(a,
          b) {
          a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
          b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
          if(this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
        },
        showNotification: function(a) {
          alert(a)
        }
      })
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
      this._ = {
        htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
      }
    },
    function() {
      var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
        e = {
          checked: 1,
          compact: 1,
          declare: 1,
          defer: 1,
          disabled: 1,
          ismap: 1,
          multiple: 1,
          nohref: 1,
          noresize: 1,
          noshade: 1,
          nowrap: 1,
          readonly: 1,
          selected: 1
        };
      CKEDITOR.htmlParser.prototype = {
        onTagOpen: function() {},
        onTagClose: function() {},
        onText: function() {},
        onCDATA: function() {},
        onComment: function() {},
        parse: function(b) {
          for(var c, f, l = 0, h; c = this._.htmlPartsRegex.exec(b);) {
            f = c.index;
            if(f > l)
              if(l = b.substring(l, f), h) h.push(l);
              else this.onText(l);
            l = this._.htmlPartsRegex.lastIndex;
            if(f = c[1])
              if(f = f.toLowerCase(), h && CKEDITOR.dtd.$cdata[f] && (this.onCDATA(h.join("")), h = null), !h) {
                this.onTagClose(f);
                continue
              }
            if(h) h.push(c[0]);
            else if(f = c[3]) {
              if(f = f.toLowerCase(), !/="/.test(f)) {
                var d = {},
                  k, m = c[4];
                c = !!c[5];
                if(m)
                  for(; k = a.exec(m);) {
                    var g = k[1].toLowerCase();
                    k = k[2] || k[3] || k[4] || "";
                    d[g] = !k && e[g] ? g : CKEDITOR.tools.htmlDecodeAttr(k)
                  }
                this.onTagOpen(f, d, c);
                !h && CKEDITOR.dtd.$cdata[f] && (h = [])
              }
            } else if(f = c[2]) this.onComment(f)
          }
          if(b.length > l) this.onText(b.substring(l,
            b.length))
        }
      }
    }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
      $: function() {
        this._ = {
          output: []
        }
      },
      proto: {
        openTag: function(a) {
          this._.output.push("\x3c", a)
        },
        openTagClose: function(a, e) {
          e ? this._.output.push(" /\x3e") : this._.output.push("\x3e")
        },
        attribute: function(a, e) {
          "string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e));
          this._.output.push(" ", a, '\x3d"', e, '"')
        },
        closeTag: function(a) {
          this._.output.push("\x3c/", a, "\x3e")
        },
        text: function(a) {
          this._.output.push(a)
        },
        comment: function(a) {
          this._.output.push("\x3c!--",
            a, "--\x3e")
        },
        write: function(a) {
          this._.output.push(a)
        },
        reset: function() {
          this._.output = [];
          this._.indent = !1
        },
        getHtml: function(a) {
          var e = this._.output.join("");
          a && this.reset();
          return e
        }
      }
    }), "use strict",
    function() {
      CKEDITOR.htmlParser.node = function() {};
      CKEDITOR.htmlParser.node.prototype = {
        remove: function() {
          var a = this.parent.children,
            e = CKEDITOR.tools.indexOf(a, this),
            b = this.previous,
            c = this.next;
          b && (b.next = c);
          c && (c.previous = b);
          a.splice(e, 1);
          this.parent = null
        },
        replaceWith: function(a) {
          var e = this.parent.children,
            b = CKEDITOR.tools.indexOf(e, this),
            c = a.previous = this.previous,
            f = a.next = this.next;
          c && (c.next = a);
          f && (f.previous = a);
          e[b] = a;
          a.parent = this.parent;
          this.parent = null
        },
        insertAfter: function(a) {
          var e = a.parent.children,
            b = CKEDITOR.tools.indexOf(e, a),
            c = a.next;
          e.splice(b + 1, 0, this);
          this.next = a.next;
          this.previous = a;
          a.next = this;
          c && (c.previous = this);
          this.parent = a.parent
        },
        insertBefore: function(a) {
          var e = a.parent.children,
            b = CKEDITOR.tools.indexOf(e, a);
          e.splice(b, 0, this);
          this.next = a;
          (this.previous = a.previous) && (a.previous.next =
            this);
          a.previous = this;
          this.parent = a.parent
        },
        getAscendant: function(a) {
          var e = "function" == typeof a ? a : "string" == typeof a ? function(b) {
              return b.name == a
            } : function(b) {
              return b.name in a
            },
            b = this.parent;
          for(; b && b.type == CKEDITOR.NODE_ELEMENT;) {
            if(e(b)) return b;
            b = b.parent
          }
          return null
        },
        wrapWith: function(a) {
          this.replaceWith(a);
          a.add(this);
          return a
        },
        getIndex: function() {
          return CKEDITOR.tools.indexOf(this.parent.children, this)
        },
        getFilterContext: function(a) {
          return a || {}
        }
      }
    }(), "use strict", CKEDITOR.htmlParser.comment =
    function(a) {
      this.value = a;
      this._ = {
        isBlockLike: !1
      }
    }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
      type: CKEDITOR.NODE_COMMENT,
      filter: function(a, e) {
        var b = this.value;
        if(!(b = a.onComment(e, b, this))) return this.remove(), !1;
        if("string" != typeof b) return this.replaceWith(b), !1;
        this.value = b;
        return !0
      },
      writeHtml: function(a, e) {
        e && this.filter(e);
        a.comment(this.value)
      }
    }), "use strict",
    function() {
      CKEDITOR.htmlParser.text = function(a) {
        this.value = a;
        this._ = {
          isBlockLike: !1
        }
      };
      CKEDITOR.htmlParser.text.prototype =
        CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
          type: CKEDITOR.NODE_TEXT,
          filter: function(a, e) {
            if(!(this.value = a.onText(e, this.value, this))) return this.remove(), !1
          },
          writeHtml: function(a, e) {
            e && this.filter(e);
            a.text(this.value)
          }
        })
    }(), "use strict",
    function() {
      CKEDITOR.htmlParser.cdata = function(a) {
        this.value = a
      };
      CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_TEXT,
        filter: function() {},
        writeHtml: function(a) {
          a.write(this.value)
        }
      })
    }(), "use strict",
    CKEDITOR.htmlParser.fragment = function() {
      this.children = [];
      this.parent = null;
      this._ = {
        isBlockLike: !0,
        hasInlineStarted: !1
      }
    },
    function() {
      function a(a) {
        return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
      }
      var e = CKEDITOR.tools.extend({
          table: 1,
          ul: 1,
          ol: 1,
          dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
        b = {
          ol: 1,
          ul: 1
        },
        c = CKEDITOR.tools.extend({}, {
          html: 1
        }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
          style: 1,
          script: 1
        }),
        f = {
          ul: "li",
          ol: "li",
          dl: "dd",
          table: "tbody",
          tbody: "tr",
          thead: "tr",
          tfoot: "tr",
          tr: "td"
        };
      CKEDITOR.htmlParser.fragment.fromHtml = function(l, h, d) {
        function k(a) {
          var b;
          if(0 < r.length)
            for(var c = 0; c < r.length; c++) {
              var d = r[c],
                g = d.name,
                f = CKEDITOR.dtd[g],
                e = w.name && CKEDITOR.dtd[w.name];
              e && !e[g] || a && f && !f[a] && CKEDITOR.dtd[a] ? g == w.name && (n(w, w.parent, 1), c--) : (b || (m(), b = 1), d = d.clone(), d.parent = w, w = d, r.splice(c, 1), c--)
            }
        }

        function m() {
          for(; v.length;) n(v.shift(), w)
        }

        function g(a) {
          if(a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
            var b =
              a.children.length,
              c = a.children[b - 1],
              d;
            c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1)
          }
        }

        function n(b, c, f) {
          c = c || w || u;
          var e = w;
          void 0 === b.previous && (p(c, b) && (w = c, A.onTagOpen(d, {}), b.returnPoint = c = w), g(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (q = !1), "textarea" == b.name && (B = !1));
          b.returnPoint ? (w = b.returnPoint, delete b.returnPoint) : w = f ? c : e
        }

        function p(a, b) {
          if((a == u || "body" == a.name) && d && (!a.name || CKEDITOR.dtd[a.name][d])) {
            var c, g;
            return(c = b.attributes &&
              (g = b.attributes["data-cke-real-element-type"]) ? g : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
          }
        }

        function t(a, b) {
          return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1
        }
        var A = new CKEDITOR.htmlParser,
          u = h instanceof CKEDITOR.htmlParser.element ? h : "string" == typeof h ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment,
          r = [],
          v = [],
          w = u,
          B = "textarea" == u.name,
          q = "pre" == u.name;
        A.onTagOpen =
          function(d, g, f, h) {
            g = new CKEDITOR.htmlParser.element(d, g);
            g.isUnknown && f && (g.isEmpty = !0);
            g.isOptionalClose = h;
            if(a(g)) r.push(g);
            else {
              if("pre" == d) q = !0;
              else {
                if("br" == d && q) {
                  w.add(new CKEDITOR.htmlParser.text("\n"));
                  return
                }
                "textarea" == d && (B = !0)
              }
              if("br" == d) v.push(g);
              else {
                for(; !(h = (f = w.name) ? CKEDITOR.dtd[f] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, g.isUnknown || w.isUnknown || h[d]);)
                  if(w.isOptionalClose) A.onTagClose(f);
                  else if(d in b && f in b) f = w.children, (f = f[f.length - 1]) && "li" == f.name || n(f = new CKEDITOR.htmlParser.element("li"),
                  w), !g.returnPoint && (g.returnPoint = w), w = f;
                else if(d in CKEDITOR.dtd.$listItem && !t(d, f)) A.onTagOpen("li" == d ? "ul" : "dl", {}, 0, 1);
                else if(f in e && !t(d, f)) !g.returnPoint && (g.returnPoint = w), w = w.parent;
                else if(f in CKEDITOR.dtd.$inline && r.unshift(w), w.parent) n(w, w.parent, 1);
                else {
                  g.isOrphan = 1;
                  break
                }
                k(d);
                m();
                g.parent = w;
                g.isEmpty ? n(g) : w = g
              }
            }
          };
        A.onTagClose = function(a) {
          for(var b = r.length - 1; 0 <= b; b--)
            if(a == r[b].name) {
              r.splice(b, 1);
              return
            }
          for(var c = [], g = [], f = w; f != u && f.name != a;) f._.isBlockLike || g.unshift(f), c.push(f),
            f = f.returnPoint || f.parent;
          if(f != u) {
            for(b = 0; b < c.length; b++) {
              var e = c[b];
              n(e, e.parent)
            }
            w = f;
            f._.isBlockLike && m();
            n(f, f.parent);
            f == w && (w = w.parent);
            r = r.concat(g)
          }
          "body" == a && (d = !1)
        };
        A.onText = function(a) {
          if(!(w._.hasInlineStarted && !v.length || q || B) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
          var b = w.name,
            g = b ? CKEDITOR.dtd[b] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
          if(!B && !g["#"] && b in e) A.onTagOpen(f[b] || ""), A.onText(a);
          else {
            m();
            k();
            q || B || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
            a =
              new CKEDITOR.htmlParser.text(a);
            if(p(w, a)) this.onTagOpen(d, {}, 0, 1);
            w.add(a)
          }
        };
        A.onCDATA = function(a) {
          w.add(new CKEDITOR.htmlParser.cdata(a))
        };
        A.onComment = function(a) {
          m();
          k();
          w.add(new CKEDITOR.htmlParser.comment(a))
        };
        A.parse(l);
        for(m(); w != u;) n(w, w.parent, 1);
        g(u);
        return u
      };
      CKEDITOR.htmlParser.fragment.prototype = {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        add: function(a, b) {
          isNaN(b) && (b = this.children.length);
          var c = 0 < b ? this.children[b - 1] : null;
          if(c) {
            if(a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value),
                0 === c.value.length)) {
              this.children.pop();
              this.add(a);
              return
            }
            c.next = a
          }
          a.previous = c;
          a.parent = this;
          this.children.splice(b, 0, a);
          this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
        },
        filter: function(a, b) {
          b = this.getFilterContext(b);
          a.onRoot(b, this);
          this.filterChildren(a, !1, b)
        },
        filterChildren: function(a, b, c) {
          if(this.childrenFilteredBy != a.id) {
            c = this.getFilterContext(c);
            if(b && !this.parent) a.onRoot(c, this);
            this.childrenFilteredBy = a.id;
            for(b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a, c) && b--
          }
        },
        writeHtml: function(a, b) {
          b && this.filter(b);
          this.writeChildrenHtml(a)
        },
        writeChildrenHtml: function(a, b, c) {
          var f = this.getFilterContext();
          if(c && !this.parent && b) b.onRoot(f, this);
          b && this.filterChildren(b, !1, f);
          b = 0;
          c = this.children;
          for(f = c.length; b < f; b++) c[b].writeHtml(a)
        },
        forEach: function(a, b, c) {
          if(!(c || b && this.type != b)) var f = a(this);
          if(!1 !== f) {
            c = this.children;
            for(var e = 0; e < c.length; e++) f = c[e], f.type == CKEDITOR.NODE_ELEMENT ? f.forEach(a,
              b) : b && f.type != b || a(f)
          }
        },
        getFilterContext: function(a) {
          return a || {}
        }
      }
    }(), "use strict",
    function() {
      function a() {
        this.rules = []
      }

      function e(b, c, f, e) {
        var h, d;
        for(h in c)(d = b[h]) || (d = b[h] = new a), d.add(c[h], f, e)
      }
      CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
        $: function(b) {
          this.id = CKEDITOR.tools.getNextNumber();
          this.elementNameRules = new a;
          this.attributeNameRules = new a;
          this.elementsRules = {};
          this.attributesRules = {};
          this.textRules = new a;
          this.commentRules = new a;
          this.rootRules = new a;
          b && this.addRules(b, 10)
        },
        proto: {
          addRules: function(a, c) {
            var f;
            "number" == typeof c ? f = c : c && "priority" in c && (f = c.priority);
            "number" != typeof f && (f = 10);
            "object" != typeof c && (c = {});
            a.elementNames && this.elementNameRules.addMany(a.elementNames, f, c);
            a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, f, c);
            a.elements && e(this.elementsRules, a.elements, f, c);
            a.attributes && e(this.attributesRules, a.attributes, f, c);
            a.text && this.textRules.add(a.text, f, c);
            a.comment && this.commentRules.add(a.comment, f, c);
            a.root && this.rootRules.add(a.root,
              f, c)
          },
          applyTo: function(a) {
            a.filter(this)
          },
          onElementName: function(a, c) {
            return this.elementNameRules.execOnName(a, c)
          },
          onAttributeName: function(a, c) {
            return this.attributeNameRules.execOnName(a, c)
          },
          onText: function(a, c, f) {
            return this.textRules.exec(a, c, f)
          },
          onComment: function(a, c, f) {
            return this.commentRules.exec(a, c, f)
          },
          onRoot: function(a, c) {
            return this.rootRules.exec(a, c)
          },
          onElement: function(a, c) {
            for(var f = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], e, h = 0; 3 > h; h++)
              if(e = f[h]) {
                e =
                  e.exec(a, c, this);
                if(!1 === e) return null;
                if(e && e != c) return this.onNode(a, e);
                if(c.parent && !c.name) break
              }
            return c
          },
          onNode: function(a, c) {
            var f = c.type;
            return f == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : f == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : f == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null
          },
          onAttribute: function(a, c, f, e) {
            return(f = this.attributesRules[f]) ? f.exec(a, e, c, this) : e
          }
        }
      });
      CKEDITOR.htmlParser.filterRulesGroup = a;
      a.prototype = {
        add: function(a, c, f) {
          this.rules.splice(this.findIndex(c), 0, {
            value: a,
            priority: c,
            options: f
          })
        },
        addMany: function(a, c, f) {
          for(var e = [this.findIndex(c), 0], h = 0, d = a.length; h < d; h++) e.push({
            value: a[h],
            priority: c,
            options: f
          });
          this.rules.splice.apply(this.rules, e)
        },
        findIndex: function(a) {
          for(var c = this.rules, f = c.length - 1; 0 <= f && a < c[f].priority;) f--;
          return f + 1
        },
        exec: function(a, c) {
          var f = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
            e = Array.prototype.slice.call(arguments, 1),
            h = this.rules,
            d = h.length,
            k, m, g, n;
          for(n = 0; n < d; n++)
            if(f && (k = c.type, m = c.name), g = h[n], !(a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) {
              g = g.value.apply(null, e);
              if(!1 === g || f && g && (g.name != m || g.type != k)) return g;
              null != g && (e[0] = c = g)
            }
          return c
        },
        execOnName: function(a, c) {
          for(var f = 0, e = this.rules, h = e.length, d; c && f < h; f++) d = e[f], a.nonEditable && !d.options.applyToAll || a.nestedEditable && d.options.excludeNestedEditable || (c = c.replace(d.value[0], d.value[1]));
          return c
        }
      }
    }(),
    function() {
      function a(a,
        d) {
        function g(a) {
          return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
            "data-cke-bogus": 1
          })
        }

        function e(a, d) {
          return function(f) {
            if(f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var e = [],
                k = b(f),
                h, q;
              if(k)
                for(m(k, 1) && e.push(k); k;) l(k) && (h = c(k)) && m(h) && ((q = c(h)) && !l(q) ? e.push(h) : (g(n).insertAfter(h), h.remove())), k = k.previous;
              for(k = 0; k < e.length; k++) e[k].remove();
              if(e = !a || !1 !== ("function" == typeof d ? d(f) : d)) n || CKEDITOR.env.needsBrFiller || f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
                n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (e = b(f), e = !e || "form" == f.name && "input" == e.name) : e = !1 : e = !1;
              e && f.add(g(a))
            }
          }
        }

        function m(a, b) {
          if((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
          var c;
          return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(r)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller &&
            n && (!b || a.parent.name in F) || !n && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
        }
        var k = {
            elements: {}
          },
          n = "html" == d,
          F = CKEDITOR.tools.extend({}, q),
          y;
        for(y in F) "#" in w[y] || delete F[y];
        for(y in F) k.elements[y] = e(n, a.config.fillEmptyBlocks);
        k.root = e(n, !1);
        k.elements.br = function(a) {
          return function(b) {
            if(b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var d = b.attributes;
              if("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
              else {
                for(d = b.next; d && f(d);) d = d.next;
                var e = c(b);
                !d && l(b.parent) ? h(b.parent,
                  g(a)) : l(d) && e && !l(e) && g(a).insertBefore(d)
              }
            }
          }
        }(n);
        return k
      }

      function e(a, b) {
        return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
      }

      function b(a) {
        for(a = a.children[a.children.length - 1]; a && f(a);) a = a.previous;
        return a
      }

      function c(a) {
        for(a = a.previous; a && f(a);) a = a.previous;
        return a
      }

      function f(a) {
        return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
      }

      function l(a) {
        return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
          q || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
      }

      function h(a, b) {
        var c = a.children[a.children.length - 1];
        a.children.push(b);
        b.parent = a;
        c && (c.next = b, b.previous = c)
      }

      function d(a) {
        a = a.attributes;
        "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
        a.contenteditable = "false"
      }

      function k(a) {
        a = a.attributes;
        switch(a["data-cke-editable"]) {
          case "true":
            a.contenteditable = "true";
            break;
          case "1":
            delete a.contenteditable
        }
      }

      function m(a) {
        return a.replace(D, function(a, b, c) {
          return "\x3c" + b + c.replace(H,
            function(a, b) {
              return E.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
            }) + "\x3e"
        })
      }

      function g(a, b) {
        return a.replace(b, function(a, b, c) {
          0 === a.indexOf("\x3ctextarea") && (a = b + t(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
          return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
        })
      }

      function n(a) {
        return a.replace(J, function(a, b) {
          return decodeURIComponent(b)
        })
      }

      function p(a) {
        return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
          function(a) {
            return "\x3c!--" + v + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e"
          })
      }

      function t(a) {
        return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b) {
          return decodeURIComponent(b)
        })
      }

      function A(a, b) {
        var c = b._.dataStore;
        return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b) {
          return decodeURIComponent(b)
        }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
          return c && c[b] || ""
        })
      }

      function u(a, b) {
        var c = [],
          d = b.config.protectedSource,
          g = b._.dataStore || (b._.dataStore = {
            id: 1
          }),
          f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
          d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
        a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a) {
          return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e"
        });
        for(var e = 0; e < d.length; e++) a = a.replace(d[e], function(a) {
          a = a.replace(f, function(a, b, d) {
            return c[d]
          });
          return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e"
        });
        a = a.replace(f, function(a, b, d) {
          return "\x3c!--" + v + (b ? "{C}" :
            "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
        });
        a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a) {
          return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b) {
            g[g.id] = decodeURIComponent(b);
            return "{cke_protected_" + g.id++ + "}"
          })
        });
        return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, g) {
          return "\x3c" + c + d + "\x3e" + A(t(g), b) + "\x3c/" + c + "\x3e"
        })
      }
      CKEDITOR.htmlDataProcessor = function(b) {
        var c,
          d, f = this;
        this.editor = b;
        this.dataFilter = c = new CKEDITOR.htmlParser.filter;
        this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
        this.writer = new CKEDITOR.htmlParser.basicWriter;
        c.addRules(z);
        c.addRules(y, {
          applyToAll: !0
        });
        c.addRules(a(b, "data"), {
          applyToAll: !0
        });
        d.addRules(x);
        d.addRules(C, {
          applyToAll: !0
        });
        d.addRules(a(b, "html"), {
          applyToAll: !0
        });
        b.on("toHtml", function(a) {
          a = a.data;
          var c = a.dataValue,
            d, c = u(c, b),
            c = g(c, G),
            c = m(c),
            c = g(c, I),
            c = c.replace(M, "$1cke:$2"),
            c = c.replace(Q, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
            c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
            c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
          d = a.context || b.editable().getName();
          var f;
          CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == d && (d = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", f = 1);
          d = b.document.createElement(d);
          d.setHtml("a" + c);
          c = d.getHtml().substr(1);
          c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
          f && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
          c = c.replace(F, "$1$2");
          c = n(c);
          c = t(c);
          d = !1 === a.fixForBody ? !1 :
            e(a.enterMode, b.config.autoParagraph);
          c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, d);
          d && (f = c, !f.children.length && CKEDITOR.dtd[f.name][d] && (d = new CKEDITOR.htmlParser.element(d), f.add(d)));
          a.dataValue = c
        }, null, null, 5);
        b.on("toHtml", function(a) {
          a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered")
        }, null, null, 6);
        b.on("toHtml", function(a) {
          a.data.dataValue.filterChildren(f.dataFilter, !0)
        }, null, null, 10);
        b.on("toHtml", function(a) {
          a = a.data;
          var b = a.dataValue,
            c = new CKEDITOR.htmlParser.basicWriter;
          b.writeChildrenHtml(c);
          b = c.getHtml(!0);
          a.dataValue = p(b)
        }, null, null, 15);
        b.on("toDataFormat", function(a) {
          var c = a.data.dataValue;
          a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
          a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, e(a.data.enterMode, b.config.autoParagraph))
        }, null, null, 5);
        b.on("toDataFormat", function(a) {
          a.data.dataValue.filterChildren(f.htmlFilter, !0)
        }, null, null, 10);
        b.on("toDataFormat", function(a) {
          a.data.filter.applyTo(a.data.dataValue, !1, !0)
        }, null, null, 11);
        b.on("toDataFormat", function(a) {
          var c = a.data.dataValue,
            d = f.writer;
          d.reset();
          c.writeChildrenHtml(d);
          c = d.getHtml(!0);
          c = t(c);
          c = A(c, b);
          a.data.dataValue = c
        }, null, null, 15)
      };
      CKEDITOR.htmlDataProcessor.prototype = {
        toHtml: function(a, b, c, d) {
          var f = this.editor,
            g, e, m, k;
          b && "object" == typeof b ? (g = b.context, c = b.fixForBody, d = b.dontFilter, e = b.filter, m = b.enterMode, k = b.protectedWhitespaces) : g = b;
          g || null === g || (g = f.editable().getName());
          return f.fire("toHtml", {
            dataValue: a,
            context: g,
            fixForBody: c,
            dontFilter: d,
            filter: e || f.filter,
            enterMode: m || f.enterMode,
            protectedWhitespaces: k
          }).dataValue
        },
        toDataFormat: function(a, b) {
          var c, d, g;
          b && (c = b.context, d = b.filter, g = b.enterMode);
          c || null === c || (c = this.editor.editable().getName());
          return this.editor.fire("toDataFormat", {
            dataValue: a,
            filter: d || this.editor.filter,
            context: c,
            enterMode: g || this.editor.enterMode
          }).dataValue
        }
      };
      var r = /(?:&nbsp;|\xa0)$/,
        v = "{cke_protected}",
        w = CKEDITOR.dtd,
        B = "caption colgroup col thead tfoot tbody".split(" "),
        q = CKEDITOR.tools.extend({}, w.$blockLimit,
          w.$block),
        z = {
          elements: {
            input: d,
            textarea: d
          }
        },
        y = {
          attributeNames: [
            [/^on/, "data-cke-pa-on"],
            [/^srcdoc/, "data-cke-pa-srcdoc"],
            [/^data-cke-expando$/, ""]
          ],
          elements: {
            iframe: function(a) {
              if(a.attributes && a.attributes.src) {
                var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, "");
                if(0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src
              }
            }
          }
        },
        x = {
          elements: {
            embed: function(a) {
              var b = a.parent;
              if(b && "object" == b.name) {
                var c = b.attributes.width,
                  b = b.attributes.height;
                c && (a.attributes.width = c);
                b && (a.attributes.height = b)
              }
            },
            a: function(a) {
              var b = a.attributes;
              if(!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1
            }
          }
        },
        C = {
          elementNames: [
            [/^cke:/, ""],
            [/^\?xml:namespace$/, ""]
          ],
          attributeNames: [
            [/^data-cke-(saved|pa)-/, ""],
            [/^data-cke-.*/, ""],
            ["hidefocus", ""]
          ],
          elements: {
            $: function(a) {
              var b = a.attributes;
              if(b) {
                if(b["data-cke-temp"]) return !1;
                for(var c = ["name", "href", "src"], d, g = 0; g < c.length; g++) d = "data-cke-saved-" + c[g], d in b && delete b[c[g]]
              }
              return a
            },
            table: function(a) {
              a.children.slice(0).sort(function(a, b) {
                var c, d;
                a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(B, a.name), d = CKEDITOR.tools.indexOf(B, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
                return c > d ? 1 : -1
              })
            },
            param: function(a) {
              a.children = [];
              a.isEmpty = !0;
              return a
            },
            span: function(a) {
              "Apple-style-span" == a.attributes["class"] && delete a.name
            },
            html: function(a) {
              delete a.attributes.contenteditable;
              delete a.attributes["class"]
            },
            body: function(a) {
              delete a.attributes.spellcheck;
              delete a.attributes.contenteditable
            },
            style: function(a) {
              var b = a.children[0];
              b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
              a.attributes.type || (a.attributes.type = "text/css")
            },
            title: function(a) {
              var b = a.children[0];
              !b && h(a, b = new CKEDITOR.htmlParser.text);
              b.value = a.attributes["data-cke-title"] || ""
            },
            input: k,
            textarea: k
          },
          attributes: {
            "class": function(a) {
              return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
            }
          }
        };
      CKEDITOR.env.ie && (C.attributes.style = function(a) {
        return a.replace(/(^|;)([^\:]+)/g,
          function(a) {
            return a.toLowerCase()
          })
      });
      var D = /<(a|area|img|input|source)\b([^>]*)>/gi,
        H = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
        E = /^(href|src|name)$/i,
        I = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
        G = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
        J = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
        M = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
        F = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
        Q = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(),
    "use strict", CKEDITOR.htmlParser.element = function(a, e) {
      this.name = a;
      this.attributes = e || {};
      this.children = [];
      var b = a || "",
        c = b.match(/^cke:(.*)/);
      c && (b = c[1]);
      b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
      this.isEmpty = !!CKEDITOR.dtd.$empty[a];
      this.isUnknown = !CKEDITOR.dtd[a];
      this._ = {
        isBlockLike: b,
        hasInlineStarted: this.isEmpty || !b
      }
    }, CKEDITOR.htmlParser.cssStyle = function(a) {
      var e = {};
      ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, f) {
        "font-family" == c && (f = f.replace(/["']/g, ""));
        e[c.toLowerCase()] = f
      });
      return {
        rules: e,
        populate: function(a) {
          var c = this.toString();
          c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
        },
        toString: function() {
          var a = [],
            c;
          for(c in e) e[c] && a.push(c, ":", e[c], ";");
          return a.join("")
        }
      }
    },
    function() {
      function a(a) {
        return function(b) {
          return b.type ==
            CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
        }
      }
      var e = function(a, b) {
          a = a[0];
          b = b[0];
          return a < b ? -1 : a > b ? 1 : 0
        },
        b = CKEDITOR.htmlParser.fragment.prototype;
      CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_ELEMENT,
        add: b.add,
        clone: function() {
          return new CKEDITOR.htmlParser.element(this.name, this.attributes)
        },
        filter: function(a, b) {
          var e = this,
            h, d;
          b = e.getFilterContext(b);
          if(b.off) return !0;
          if(!e.parent) a.onRoot(b, e);
          for(;;) {
            h = e.name;
            if(!(d =
                a.onElementName(b, h))) return this.remove(), !1;
            e.name = d;
            if(!(e = a.onElement(b, e))) return this.remove(), !1;
            if(e !== this) return this.replaceWith(e), !1;
            if(e.name == h) break;
            if(e.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(e), !1;
            if(!e.name) return this.replaceWithChildren(), !1
          }
          h = e.attributes;
          var k, m;
          for(k in h) {
            for(d = h[k];;)
              if(m = a.onAttributeName(b, k))
                if(m != k) delete h[k], k = m;
                else break;
            else {
              delete h[k];
              break
            }
            m && (!1 === (d = a.onAttribute(b, e, m, d)) ? delete h[m] : h[m] = d)
          }
          e.isEmpty || this.filterChildren(a, !1,
            b);
          return !0
        },
        filterChildren: b.filterChildren,
        writeHtml: function(a, b) {
          b && this.filter(b);
          var l = this.name,
            h = [],
            d = this.attributes,
            k, m;
          a.openTag(l, d);
          for(k in d) h.push([k, d[k]]);
          a.sortAttributes && h.sort(e);
          k = 0;
          for(m = h.length; k < m; k++) d = h[k], a.attribute(d[0], d[1]);
          a.openTagClose(l, this.isEmpty);
          this.writeChildrenHtml(a);
          this.isEmpty || a.closeTag(l)
        },
        writeChildrenHtml: b.writeChildrenHtml,
        replaceWithChildren: function() {
          for(var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
          this.remove()
        },
        forEach: b.forEach,
        getFirst: function(b) {
          if(!b) return this.children.length ? this.children[0] : null;
          "function" != typeof b && (b = a(b));
          for(var f = 0, e = this.children.length; f < e; ++f)
            if(b(this.children[f])) return this.children[f];
          return null
        },
        getHtml: function() {
          var a = new CKEDITOR.htmlParser.basicWriter;
          this.writeChildrenHtml(a);
          return a.getHtml()
        },
        setHtml: function(a) {
          a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
          for(var b = 0, e = a.length; b < e; ++b) a[b].parent = this
        },
        getOuterHtml: function() {
          var a = new CKEDITOR.htmlParser.basicWriter;
          this.writeHtml(a);
          return a.getHtml()
        },
        split: function(a) {
          for(var b = this.children.splice(a, this.children.length - a), e = this.clone(), h = 0; h < b.length; ++h) b[h].parent = e;
          e.children = b;
          b[0] && (b[0].previous = null);
          0 < a && (this.children[a - 1].next = null);
          this.parent.add(e, this.getIndex() + 1);
          return e
        },
        find: function(a, b) {
          void 0 === b && (b = !1);
          var e = [],
            h;
          for(h = 0; h < this.children.length; h++) {
            var d = this.children[h];
            "function" == typeof a && a(d) ? e.push(d) : "string" == typeof a && d.name === a && e.push(d);
            b && d.find && (e = e.concat(d.find(a,
              b)))
          }
          return e
        },
        addClass: function(a) {
          if(!this.hasClass(a)) {
            var b = this.attributes["class"] || "";
            this.attributes["class"] = b + (b ? " " : "") + a
          }
        },
        removeClass: function(a) {
          var b = this.attributes["class"];
          b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
        },
        hasClass: function(a) {
          var b = this.attributes["class"];
          return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1
        },
        getFilterContext: function(a) {
          var b = [];
          a || (a = {
            off: !1,
            nonEditable: !1,
            nestedEditable: !1
          });
          a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
          a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
          if(b.length) {
            a = CKEDITOR.tools.copy(a);
            for(var e = 0; e < b.length; e += 2) a[b[e]] = b[e + 1]
          }
          return a
        }
      }, !0)
    }(),
    function() {
      var a = /{([^}]+)}/g;
      CKEDITOR.template = function(a) {
        this.source = String(a)
      };
      CKEDITOR.template.prototype.output =
        function(e, b) {
          var c = this.source.replace(a, function(a, b) {
            return void 0 !== e[b] ? e[b] : a
          });
          return b ? b.push(c) : c
        }
    }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function(a) {
      CKEDITOR.instances[a.name] = a;
      a.on("focus", function() {
        CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"))
      });
      a.on("blur", function() {
        CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
      });
      CKEDITOR.fire("instance", null, a)
    }, CKEDITOR.remove = function(a) {
      delete CKEDITOR.instances[a.name]
    },
    function() {
      var a = {};
      CKEDITOR.addTemplate = function(e, b) {
        var c = a[e];
        if(c) return c;
        c = {
          name: e,
          source: b
        };
        CKEDITOR.fire("template", c);
        return a[e] = new CKEDITOR.template(c.source)
      };
      CKEDITOR.getTemplate = function(e) {
        return a[e]
      }
    }(),
    function() {
      var a = [];
      CKEDITOR.addCss = function(e) {
        a.push(e)
      };
      CKEDITOR.getCss = function() {
        return a.join("\n")
      }
    }(), CKEDITOR.on("instanceDestroyed", function() {
      CKEDITOR.tools.isEmpty(this.instances) &&
        CKEDITOR.fire("reset")
    }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0,
    function() {
      CKEDITOR.inline = function(a, e) {
        if(!CKEDITOR.env.isCompatible) return null;
        a = CKEDITOR.dom.element.get(a);
        if(a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
        var b = new CKEDITOR.editor(e, a, CKEDITOR.ELEMENT_MODE_INLINE),
          c = a.is("textarea") ? a : null;
        c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' +
          !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
        b.on("loaded", function() {
          b.fire("uiReady");
          b.editable(a);
          b.container = a;
          b.ui.contentsElement = a;
          b.setData(b.getData(1));
          b.resetDirty();
          b.fire("contentDom");
          b.mode = "wysiwyg";
          b.fire("mode");
          b.status = "ready";
          b.fireOnce("instanceReady");
          CKEDITOR.fire("instanceReady", null, b)
        }, null, null, 1E4);
        b.on("destroy", function() {
          c && (b.container.clearCustomData(),
            b.container.remove(), c.show());
          b.element.clearCustomData();
          delete b.element
        });
        return b
      };
      CKEDITOR.inlineAll = function() {
        var a, e, b;
        for(b in CKEDITOR.dtd.$editable)
          for(var c = CKEDITOR.document.getElementsByTag(b), f = 0, l = c.count(); f < l; f++) a = c.getItem(f), "true" == a.getAttribute("contenteditable") && (e = {
            element: a,
            config: {}
          }, !1 !== CKEDITOR.fire("inline", e) && CKEDITOR.inline(a, e.config))
      };
      CKEDITOR.domReady(function() {
        !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
      })
    }(), CKEDITOR.replaceClass = "ckeditor",
    function() {
      function a(a,
        f, l, h) {
        if(!CKEDITOR.env.isCompatible) return null;
        a = CKEDITOR.dom.element.get(a);
        if(a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
        var d = new CKEDITOR.editor(f, a, h);
        h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), d._.required = a.hasAttribute("required"), a.removeAttribute("required"));
        l && d.setData(l, null, !0);
        d.on("loaded", function() {
          b(d);
          h == CKEDITOR.ELEMENT_MODE_REPLACE && d.config.autoUpdateElement && a.$.form && d._attachToForm();
          d.setMode(d.config.startupMode, function() {
            d.resetDirty();
            d.status = "ready";
            d.fireOnce("instanceReady");
            CKEDITOR.fire("instanceReady", null, d)
          })
        });
        d.on("destroy", e);
        return d
      }

      function e() {
        var a = this.container,
          b = this.element;
        a && (a.clearCustomData(), a.remove());
        b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
      }

      function b(a) {
        var b = a.name,
          e = a.element,
          h = a.elementMode,
          d = a.fire("uiSpace", {
            space: "top",
            html: ""
          }).html,
          k = a.fire("uiSpace", {
            space: "bottom",
            html: ""
          }).html,
          m = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
          b = CKEDITOR.dom.element.createFromHtml(m.output({
            id: a.id,
            name: b,
            langDir: a.lang.dir,
            langCode: a.langCode,
            voiceLabel: a.title,
            topHtml: d ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + d + "\x3c/span\x3e" : "",
            contentId: a.ui.spaceId("contents"),
            bottomHtml: k ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + k + "\x3c/span\x3e" : "",
            outerEl: CKEDITOR.env.ie ? "span" : "div"
          }));
        h == CKEDITOR.ELEMENT_MODE_REPLACE ?
          (e.hide(), b.insertAfter(e)) : e.append(b);
        a.container = b;
        a.ui.contentsElement = a.ui.space("contents");
        d && a.ui.space("top").unselectable();
        k && a.ui.space("bottom").unselectable();
        e = a.config.width;
        h = a.config.height;
        e && b.setStyle("width", CKEDITOR.tools.cssLength(e));
        h && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h));
        b.disableContextMenu();
        CKEDITOR.env.webkit && b.on("focus", function() {
          a.focus()
        });
        a.fireOnce("uiReady")
      }
      CKEDITOR.replace = function(b, f) {
        return a(b, f, null, CKEDITOR.ELEMENT_MODE_REPLACE)
      };
      CKEDITOR.appendTo = function(b, f, e) {
        return a(b, f, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
      };
      CKEDITOR.replaceAll = function() {
        for(var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
          var e = null,
            h = a[b];
          if(h.name || h.id) {
            if("string" == typeof arguments[0]) {
              if(!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(h.className)) continue
            } else if("function" == typeof arguments[0] && (e = {}, !1 === arguments[0](h, e))) continue;
            this.replace(h, e)
          }
        }
      };
      CKEDITOR.editor.prototype.addMode = function(a, b) {
        (this._.modes || (this._.modes = {}))[a] = b
      };
      CKEDITOR.editor.prototype.setMode = function(a, b) {
        var e = this,
          h = this._.modes;
        if(a != e.mode && h && h[a]) {
          e.fire("beforeSetMode", a);
          if(e.mode) {
            var d = e.checkDirty(),
              h = e._.previousModeData,
              k, m = 0;
            e.fire("beforeModeUnload");
            e.editable(0);
            e._.previousMode = e.mode;
            e._.previousModeData = k = e.getData(1);
            "source" == e.mode && h == k && (e.fire("lockSnapshot", {
              forceUpdate: !0
            }), m = 1);
            e.ui.space("contents").setHtml("");
            e.mode = ""
          } else e._.previousModeData = e.getData(1);
          this._.modes[a](function() {
            e.mode = a;
            void 0 !== d && !d &&
              e.resetDirty();
            m ? e.fire("unlockSnapshot") : "wysiwyg" == a && e.fire("saveSnapshot");
            setTimeout(function() {
              e.fire("mode");
              b && b.call(e)
            }, 0)
          })
        }
      };
      CKEDITOR.editor.prototype.resize = function(a, b, e, h) {
        var d = this.container,
          k = this.ui.space("contents"),
          m = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
        h = h ? this.container.getFirst(function(a) {
          return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
        }) : d;
        h.setSize("width", a, !0);
        m && (m.style.width = "1%");
        var g = (h.$.offsetHeight || 0) - (k.$.clientHeight ||
            0),
          d = Math.max(b - (e ? 0 : g), 0);
        b = e ? b + g : b;
        k.setStyle("height", d + "px");
        m && (m.style.width = "100%");
        this.fire("resize", {
          outerHeight: b,
          contentsHeight: d,
          outerWidth: a || h.getSize("width")
        })
      };
      CKEDITOR.editor.prototype.getResizable = function(a) {
        return a ? this.ui.space("contents") : this.container
      };
      CKEDITOR.domReady(function() {
        CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
      })
    }(), CKEDITOR.config.startupMode = "wysiwyg",
    function() {
      function a(a) {
        var b = a.editor,
          d = a.data.path,
          g = d.blockLimit,
          f = a.data.selection,
          m = f.getRanges()[0],
          k;
        if(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
          if(f = e(f, d)) f.appendBogus(), k = CKEDITOR.env.ie;
        h(b, d.block, g) && m.collapsed && !m.getCommonAncestor().isReadOnly() && (d = m.clone(), d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(d), g.guard = function(a) {
          return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
        }, !g.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) && (b = m.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller ||
          (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), k = 1, a.cancel());
        k && m.select()
      }

      function e(a, b) {
        if(a.isFake) return 0;
        var d = b.block || b.blockLimit,
          g = d && d.getLast(c);
        if(!(!d || !d.isBlockBoundary() || g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || d.is("pre") || d.getBogus())) return d
      }

      function b(a) {
        var b = a.data.getTarget();
        b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
      }

      function c(a) {
        return g(a) &&
          n(a)
      }

      function f(a, b) {
        return function(c) {
          var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
          (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
        }
      }

      function l(a) {
        function b(a) {
          return function(b, g) {
            g && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b);
            if(!(g || !c(b) || a && t(b))) return !1
          }
        }
        var d, g = a.getRanges()[0];
        a = a.root;
        var f = {
          table: 1,
          ul: 1,
          ol: 1,
          dl: 1
        };
        if(g.startPath().contains(f)) {
          var e = g.clone();
          e.collapse(1);
          e.setStartAt(a,
            CKEDITOR.POSITION_AFTER_START);
          a = new CKEDITOR.dom.walker(e);
          a.guard = b();
          a.checkBackward();
          if(d) return e = g.clone(), e.collapse(), e.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(e), a.guard = b(!0), d = !1, a.checkForward(), d
        }
        return null
      }

      function h(a, b, c) {
        return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
      }

      function d(a) {
        return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ?
          a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
      }

      function k(a) {
        var b = a.editor;
        b.getSelection().scrollIntoView();
        setTimeout(function() {
          b.fire("saveSnapshot")
        }, 0)
      }

      function m(a, b, c) {
        var d = a.getCommonAncestor(b);
        for(b = a = c ? b : a;
          (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
        b.remove()
      }
      var g, n, p, t, A, u, r, v, w, B;
      CKEDITOR.editable = CKEDITOR.tools.createClass({
        base: CKEDITOR.dom.element,
        $: function(a, b) {
          this.base(b.$ || b);
          this.editor = a;
          this.status = "unloaded";
          this.hasFocus = !1;
          this.setup()
        },
        proto: {
          focus: function() {
            var a;
            if(CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
              a.focus();
              return
            }
            CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
            try {
              if(!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document))
                if(CKEDITOR.env.chrome) {
                  var b = this.$.scrollTop;
                  this.$.focus();
                  this.$.scrollTop = b
                } else this.$.focus();
              else this.$.setActive()
            } catch(c) {
              if(!CKEDITOR.env.ie) throw c;
            }
            CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
          },
          on: function(a, b) {
            var c = Array.prototype.slice.call(arguments, 0);
            CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = f(b, this), c[0] = a, c[1] = b);
            return CKEDITOR.dom.element.prototype.on.apply(this, c)
          },
          attachListener: function(a) {
            !this._.listeners && (this._.listeners = []);
            var b = Array.prototype.slice.call(arguments,
                1),
              b = a.on.apply(a, b);
            this._.listeners.push(b);
            return b
          },
          clearListeners: function() {
            var a = this._.listeners;
            try {
              for(; a.length;) a.pop().removeListener()
            } catch(b) {}
          },
          restoreAttrs: function() {
            var a = this._.attrChanges,
              b, c;
            for(c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
          },
          attachClass: function(a) {
            var b = this.getCustomData("classes");
            this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a))
          },
          changeAttr: function(a, b) {
            var c = this.getAttribute(a);
            b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
          },
          insertText: function(a) {
            this.editor.focus();
            this.insertHtml(this.transformPlainTextToHtml(a), "text")
          },
          transformPlainTextToHtml: function(a) {
            var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
            return CKEDITOR.tools.transformPlainTextToHtml(a, b)
          },
          insertHtml: function(a, b, c, beFocus) {
            var d = this.editor;
            if (beFocus) {
              d.focus();
            }
            d.fire("saveSnapshot");
            c || (c = d.getSelection().getRanges()[0]);
            u(this, b || "html", a, c);
            if (beFocus) {
              c.select();
            }
            k(this);
            this.editor.fire("afterInsertHtml", {})
          },
          insertHtmlIntoRange: function(a, b, c) {
            u(this, c || "html", a, b);
            this.editor.fire("afterInsertHtml", {
              intoRange: b
            })
          },
          insertElement: function(a, b) {
            var d = this.editor;
            d.focus();
            d.fire("saveSnapshot");
            var g = d.activeEnterMode,
              d = d.getSelection(),
              f = a.getName(),
              f = CKEDITOR.dtd.$block[f];
            b || (b = d.getRanges()[0]);
            this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f =
              a.getNext(function(a) {
                return c(a) && !t(a)
              })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || g == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, g == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f))));
            d.selectRanges([b]);
            k(this)
          },
          insertElementIntoSelection: function(a) {
            this.insertElement(a)
          },
          insertElementIntoRange: function(a, b) {
            var c = this.editor,
              d = c.config.enterMode,
              g = a.getName(),
              f = CKEDITOR.dtd.$block[g];
            if(b.checkReadOnly()) return !1;
            b.deleteContents(1);
            b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({
              tr: 1,
              table: 1,
              tbody: 1,
              thead: 1,
              tfoot: 1
            }) ? r(b) : b.startContainer.is(CKEDITOR.dtd.$list) && v(b));
            var e, m;
            if(f)
              for(;
                (e = b.getCommonAncestor(0, 1)) && (m = CKEDITOR.dtd[e.getName()]) && (!m || !m[g]);) e.getName() in CKEDITOR.dtd.span ? b.splitElement(e) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(e), b.collapse(!0), e.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
            b.insertNode(a);
            return !0
          },
          setData: function(a,
            b) {
            b || (a = this.editor.dataProcessor.toHtml(a));
            this.setHtml(a);
            this.fixInitialSelection();
            "unloaded" == this.status && (this.status = "ready");
            this.editor.fire("dataReady")
          },
          getData: function(a) {
            var b = this.getHtml();
            a || (b = this.editor.dataProcessor.toDataFormat(b));
            return b
          },
          setReadOnly: function(a) {
            this.setAttribute("contenteditable", !a)
          },
          detach: function() {
            this.removeClass("cke_editable");
            this.status = "detached";
            var a = this.editor;
            this._.detach();
            delete a.document;
            delete a.window
          },
          isInline: function() {
            return this.getDocument().equals(CKEDITOR.document)
          },
          fixInitialSelection: function() {
            function a() {
              var b = c.getDocument().$,
                d = b.getSelection(),
                g;
              a: if(d.anchorNode && d.anchorNode == c.$) g = !0;
                else {
                  if(CKEDITOR.env.webkit && (g = c.getDocument().getActive()) && g.equals(c) && !d.anchorNode) {
                    g = !0;
                    break a
                  }
                  g = void 0
                }
              g && (g = new CKEDITOR.dom.range(c), g.moveToElementEditStart(c), b = b.createRange(), b.setStart(g.startContainer.$, g.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b))
            }

            function b() {
              var a = c.getDocument().$,
                d = a.selection,
                g = c.getDocument().getActive();
              "None" ==
              d.type && g.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
            }
            var c = this;
            if(CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
            else if(this.hasFocus) this.focus(), a();
            else this.once("focus", function() {
              a()
            }, null, null, -999)
          },
          getHtmlFromRange: function(a) {
            if(a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
            a = {
              doc: this.getDocument(),
              range: a.clone()
            };
            w.eol.detect(a, this);
            w.bogus.exclude(a);
            w.cell.shrink(a);
            a.fragment = a.range.cloneContents();
            w.tree.rebuild(a, this);
            w.eol.fix(a, this);
            return new CKEDITOR.dom.documentFragment(a.fragment.$)
          },
          extractHtmlFromRange: function(a, b) {
            var c = B,
              d = {
                range: a,
                doc: a.document
              },
              g = this.getHtmlFromRange(a);
            if(a.collapsed) return a.optimize(), g;
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            c.table.detectPurge(d);
            d.bookmark = a.createBookmark();
            delete d.range;
            var f = this.editor.createRange();
            f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
            d.targetBookmark = f.createBookmark();
            c.list.detectMerge(d, this);
            c.table.detectRanges(d, this);
            c.block.detectMerge(d, this);
            d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
            a.moveToBookmark(d.targetBookmark);
            a.optimize();
            c.fixUneditableRangePosition(a);
            c.list.merge(d, this);
            c.table.purge(d, this);
            c.block.merge(d, this);
            if(b) {
              c = a.startPath();
              if(d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
                a: {
                  var d = c.block.getElementsByTag("span"),
                    f = 0,
                    e;
                  if(d)
                    for(; e = d.getItem(f++);)
                      if(!n(e)) {
                        d = !0;
                        break a
                      }
                  d = !1
                }
                d = !d
              }
              d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove())
            } else c.autoParagraph(this.editor, a), p(a.startContainer) && a.startContainer.appendBogus();
            a.startContainer.mergeSiblings();
            return g
          },
          setup: function() {
            var a = this.editor;
            this.attachListener(a, "beforeGetData", function() {
              var b =
                this.getData();
              this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(A, function(a, b) {
                return b
              }));
              a.setData(b, null, 1)
            }, this);
            this.attachListener(a, "getSnapshot", function(a) {
              a.data = this.getData(1)
            }, this);
            this.attachListener(a, "afterSetData", function() {
              this.setData(a.getData(1))
            }, this);
            this.attachListener(a, "loadSnapshot", function(a) {
              this.setData(a.data, 1)
            }, this);
            this.attachListener(a, "beforeFocus", function() {
                var b = a.getSelection();
                (b = b && b.getNative()) && "Control" == b.type || this.focus()
              },
              this);
            this.attachListener(a, "insertHtml", function(a) {
              this.insertHtml(a.data.dataValue, a.data.mode, a.data.range, a.data.beFocus)
            }, this);
            this.attachListener(a, "insertElement", function(a) {
              this.insertElement(a.data)
            }, this);
            this.attachListener(a, "insertText", function(a) {
              this.insertText(a.data)
            }, this);
            this.setReadOnly(a.readOnly);
            this.attachClass("cke_editable");
            a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO ||
              this.attachClass("cke_editable_themed");
            this.attachClass("cke_contents_" + a.config.contentsLangDirection);
            a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
            a.keystrokeHandler.attach(this);
            this.on("blur", function() {
              this.hasFocus = !1
            }, null, null, -1);
            this.on("focus", function() {
              this.hasFocus = !0
            }, null, null, -1);
            if(CKEDITOR.env.webkit) this.on("scroll", function() {
              a._.previousScrollTop = a.editable().$.scrollTop
            }, null, null, -1);
            if(CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
              var d = function() {
                var b = a.editable();
                null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
              };
              this.on("scroll", d)
            }
            a.focusManager.add(this);
            this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function() {
              a.focusManager.focus(this)
            }, this));
            this.isInline() && this.changeAttr("tabindex", a.tabIndex);
            if(!this.is("textarea")) {
              a.document = this.getDocument();
              a.window = this.getWindow();
              var f = a.document;
              this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
              var e = a.config.contentsLangDirection;
              this.getDirection(1) != e && this.changeAttr("dir", e);
              var k = CKEDITOR.getCss();
              if(k) {
                var e = f.getHead(),
                  h = e.getCustomData("stylesheet");
                h ? k != h.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? h.$.styleSheet.cssText = k : h.setText(k)) : (k = f.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), e.setCustomData("stylesheet", k), k.data("cke-temp", 1))
              }
              e = f.getCustomData("stylesheet_ref") || 0;
              f.setCustomData("stylesheet_ref",
                e + 1);
              this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
              this.attachListener(this, "click", function(a) {
                a = a.data;
                var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                b && 2 != a.$.button && b.isReadOnly() && a.preventDefault()
              });
              var n = {
                8: 1,
                46: 1
              };
              this.attachListener(a, "key", function(b) {
                if(a.readOnly) return !0;
                var c = b.data.domEvent.getKey(),
                  d;
                b = a.getSelection();
                if(0 !== b.getRanges().length) {
                  if(c in n) {
                    var f, e = b.getRanges()[0],
                      m = e.startPath(),
                      k, h, r, c = 8 == c;
                    CKEDITOR.env.ie &&
                      11 > CKEDITOR.env.version && (f = b.getSelectedElement()) || (f = l(b)) ? (a.fire("saveSnapshot"), e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove(), e.select(), a.fire("saveSnapshot"), d = 1) : e.collapsed && ((k = m.block) && (r = k[c ? "getPrevious" : "getNext"](g)) && r.type == CKEDITOR.NODE_ELEMENT && r.is("table") && e[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), e[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && k.remove(), e["moveToElementEdit" + (c ? "End" : "Start")](r), e.select(), a.fire("saveSnapshot"),
                        d = 1) : m.blockLimit && m.blockLimit.is("td") && (h = m.blockLimit.getAscendant("table")) && e.checkBoundaryOfElement(h, c ? CKEDITOR.START : CKEDITOR.END) && (r = h[c ? "getPrevious" : "getNext"](g)) ? (a.fire("saveSnapshot"), e["moveToElementEdit" + (c ? "End" : "Start")](r), e.checkStartOfBlock() && e.checkEndOfBlock() ? r.remove() : e.select(), a.fire("saveSnapshot"), d = 1) : (h = m.contains(["td", "th", "caption"])) && e.checkBoundaryOfElement(h, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                  }
                  return !d
                }
              });
              a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller &&
                this.attachListener(this, "keyup", function(b) {
                  b.data.getKeystroke() in n && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select())
                });
              this.attachListener(this, "dblclick", function(b) {
                if(a.readOnly) return !1;
                b = {
                  element: b.data.getTarget()
                };
                a.fire("doubleclick", b)
              });
              CKEDITOR.env.ie && this.attachListener(this, "click", b);
              CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function(b) {
                var c = b.data.getTarget();
                c.is("img", "hr",
                  "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
              });
              CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
                (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
              });
              CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                if(2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(A, ""))) {
                  var c = a.createRange();
                  c.moveToElementEditStart(b);
                  c.select(!0)
                }
              });
              CKEDITOR.env.webkit &&
                (this.attachListener(this, "click", function(a) {
                  a.data.getTarget().is("input", "select") && a.data.preventDefault()
                }), this.attachListener(this, "mouseup", function(a) {
                  a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                }));
              CKEDITOR.env.webkit && this.attachListener(a, "key", function(b) {
                if(a.readOnly) return !0;
                var c = b.data.domEvent.getKey();
                if(c in n && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                  var c = 8 == c,
                    d = b.getRanges()[0];
                  b = d.startPath();
                  if(d.collapsed) a: {
                    var g = b.block;
                    if(g && d[c ? "checkStartOfBlock" :
                        "checkEndOfBlock"]() && d.moveToClosestEditablePosition(g, !c) && d.collapsed) {
                      if(d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                        var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                        if(f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) {
                          a.fire("saveSnapshot");
                          f.remove();
                          b = !0;
                          break a
                        }
                      }
                      d = d.startPath().block;
                      if(!d || d && d.contains(g)) b = void 0;
                      else {
                        a.fire("saveSnapshot");
                        var e;
                        (e = (c ? d : g).getBogus()) && e.remove();
                        e = a.getSelection();
                        f = e.createBookmarks();
                        (c ? g : d).moveChildren(c ? d : g, !1);
                        b.lastElement.mergeSiblings();
                        m(g, d, !c);
                        e.selectBookmarks(f);
                        b = !0
                      }
                    } else b = !1
                  }
                  else c = d, e = b.block, d = c.endPath().block, e && d && !e.equals(d) ? (a.fire("saveSnapshot"), (g = e.getBogus()) && g.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(e, !1), b.lastElement.mergeSiblings(), m(e, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
                  if(!b) return;
                  a.getSelection().scrollIntoView();
                  a.fire("saveSnapshot");
                  return !1
                }
              }, this, null, 100)
            }
          }
        },
        _: {
          detach: function() {
            this.editor.setData(this.editor.getData(), 0, 1);
            this.clearListeners();
            this.restoreAttrs();
            var a;
            if(a = this.removeCustomData("classes"))
              for(; a.length;) this.removeClass(a.pop());
            if(!this.is("textarea")) {
              a = this.getDocument();
              var b = a.getHead();
              if(b.getCustomData("stylesheet")) {
                var c = a.getCustomData("stylesheet_ref");
                --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
              }
            }
            this.editor.fire("contentDomUnload");
            delete this.editor
          }
        }
      });
      CKEDITOR.editor.prototype.editable = function(a) {
        var b = this._.editable;
        if(b && a) return 0;
        arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
        return b
      };
      CKEDITOR.on("instanceLoaded", function(b) {
        var c = b.editor;
        c.on("insertElement", function(a) {
          a = a.data;
          a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
            "true" : "1"), a.setAttribute("contentEditable", !1))
        });
        c.on("selectionChange", function(b) {
          if(!c.readOnly) {
            var d = c.getSelection();
            d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
          }
        })
      });
      CKEDITOR.on("instanceCreated", function(a) {
        var b = a.editor;
        b.on("mode", function() {
          var a = b.editable();
          if(a && a.isInline()) {
            var c = b.title;
            a.changeAttr("role", "textbox");
            a.changeAttr("aria-label", c);
            c && a.changeAttr("title", c);
            var d = b.fire("ariaEditorHelpLabel", {}).label;
            if(d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
              var g = CKEDITOR.tools.getNextId(),
                d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
              c.append(d);
              a.changeAttr("aria-describedby", g)
            }
          }
        })
      });
      CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
      g = CKEDITOR.dom.walker.whitespaces(!0);
      n = CKEDITOR.dom.walker.bookmark(!1, !0);
      p = CKEDITOR.dom.walker.empty();
      t = CKEDITOR.dom.walker.bogus();
      A = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
      u = function() {
        function a(b) {
          return b.type == CKEDITOR.NODE_ELEMENT
        }

        function b(c, d) {
          var g, f, e, m, k = [],
            h = d.range.startContainer;
          g = d.range.startPath();
          for(var h = l[h.getName()], n = 0, r = c.getChildren(), w = r.count(), D = -1, p = -1, v = 0, y = g.contains(l.$list); n < w; ++n) g = r.getItem(n), a(g) ? (e = g.getName(), y && e in CKEDITOR.dtd.$list ? k = k.concat(b(g, d)) : (m = !!h[e],
            "br" != e || !g.data("cke-eol") || n && n != w - 1 || (v = (f = n ? k[n - 1].node : r.getItem(n + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && l.$block[f.getName()]), -1 != D || m || (D = n), m || (p = n), k.push({
              isElement: 1,
              isLineBreak: v,
              isBlock: g.isBlockBoundary(),
              hasBlockSibling: f,
              node: g,
              name: e,
              allowed: m
            }), f = v = 0)) : k.push({
            isElement: 0,
            node: g,
            allowed: 1
          }); - 1 < D && (k[D].firstNotAllowed = 1); - 1 < p && (k[p].lastNotAllowed = 1);
          return k
        }

        function g(b, c) {
          var d = [],
            f = b.getChildren(),
            e = f.count(),
            m, k = 0,
            h = l[c],
            n = !b.is(l.$inline) || b.is("br");
          for(n && d.push(" "); k < e; k++) m =
            f.getItem(k), a(m) && !m.is(h) ? d = d.concat(g(m, c)) : d.push(m);
          n && d.push(" ");
          return d
        }

        function f(b) {
          return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1)
        }

        function e(b) {
          return b && a(b) && (b.is(l.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
        }

        function m(b, c, d, g) {
          var f = b.clone(),
            e, k;
          f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
          (e = (new CKEDITOR.dom.walker(f)).next()) && a(e) && n[e.getName()] && (k = e.getPrevious()) && a(k) && !k.getParent().equals(b.startContainer) && d.contains(k) && g.contains(e) && e.isIdentical(k) &&
            (e.moveChildren(k), e.remove(), m(b, c, d, g))
        }

        function k(b, c) {
          function d(b, c) {
            if(c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1
          }
          var g = c.endContainer.getChild(c.endOffset),
            f = c.endContainer.getChild(c.endOffset - 1);
          g && d(g, b[b.length - 1]);
          f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
        }
        var l = CKEDITOR.dtd,
          n = {
            p: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            ul: 1,
            ol: 1,
            li: 1,
            pre: 1,
            dl: 1,
            blockquote: 1
          },
          r = {
            p: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1
          },
          w = CKEDITOR.tools.extend({},
            l.$inline);
        delete w.br;
        return function(n, F, p, v) {
          var t = n.editor,
            B = !1;
          "unfiltered_html" == F && (F = "html", B = !0);
          if(!v.checkReadOnly()) {
            var A = (new CKEDITOR.dom.elementPath(v.startContainer, v.root)).blockLimit || v.root;
            n = {
              type: F,
              dontFilter: B,
              editable: n,
              editor: t,
              range: v,
              blockLimit: A,
              mergeCandidates: [],
              zombies: []
            };
            F = n.range;
            v = n.mergeCandidates;
            var u, I;
            "text" == n.type && F.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (u = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", F.document), F.insertNode(u),
              F.setStartAfter(u));
            B = new CKEDITOR.dom.elementPath(F.startContainer);
            n.endPath = A = new CKEDITOR.dom.elementPath(F.endContainer);
            if(!F.collapsed) {
              var t = A.block || A.blockLimit,
                fa = F.getCommonAncestor();
              t && !t.equals(fa) && !t.contains(fa) && F.checkEndOfBlock() && n.zombies.push(t);
              F.deleteContents()
            }
            for(;
              (I = f(F)) && a(I) && I.isBlockBoundary() && B.contains(I);) F.moveToPosition(I, CKEDITOR.POSITION_BEFORE_END);
            m(F, n.blockLimit, B, A);
            u && (F.setEndBefore(u), F.collapse(), u.remove());
            u = F.startPath();
            if(t = u.contains(e, !1,
                1)) F.splitElement(t), n.inlineStylesRoot = t, n.inlineStylesPeak = u.lastElement;
            u = F.createBookmark();
            (t = u.startNode.getPrevious(c)) && a(t) && e(t) && v.push(t);
            (t = u.startNode.getNext(c)) && a(t) && e(t) && v.push(t);
            for(t = u.startNode;
              (t = t.getParent()) && e(t);) v.push(t);
            F.moveToBookmark(u);
            if(u = p) {
              u = n.range;
              if("text" == n.type && n.inlineStylesRoot) {
                I = n.inlineStylesPeak;
                F = I.getDocument().createText("{cke-peak}");
                for(v = n.inlineStylesRoot.getParent(); !I.equals(v);) F = F.appendTo(I.clone()), I = I.getParent();
                p = F.getOuterHtml().split("{cke-peak}").join(p)
              }
              I =
                n.blockLimit.getName();
              if(/^\s+|\s+$/.test(p) && "span" in CKEDITOR.dtd[I]) {
                var O = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
                p = O + p + O
              }
              p = n.editor.dataProcessor.toHtml(p, {
                context: null,
                fixForBody: !1,
                protectedWhitespaces: !!O,
                dontFilter: n.dontFilter,
                filter: n.editor.activeFilter,
                enterMode: n.editor.activeEnterMode
              });
              I = u.document.createElement("body");
              I.setHtml(p);
              O && (I.getFirst().remove(), I.getLast().remove());
              if((O = u.startPath().block) && (1 != O.getChildCount() || !O.getBogus())) a: {
                var P;
                if(1 ==
                  I.getChildCount() && a(P = I.getFirst()) && P.is(r) && !P.hasAttribute("contenteditable")) {
                  O = P.getElementsByTag("*");
                  u = 0;
                  for(v = O.count(); u < v; u++)
                    if(F = O.getItem(u), !F.is(w)) break a;
                  P.moveChildren(P.getParent(1));
                  P.remove()
                }
              }
              n.dataWrapper = I;
              u = p
            }
            if(u) {
              P = n.range;
              u = P.document;
              var L;
              I = n.blockLimit;
              v = 0;
              var T, O = [],
                S, X;
              p = t = 0;
              var V, Y;
              F = P.startContainer;
              var B = n.endPath.elements[0],
                Z, A = B.getPosition(F),
                fa = !!B.getCommonAncestor(F) && A != CKEDITOR.POSITION_IDENTICAL && !(A & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
              F = b(n.dataWrapper, n);
              for(k(F, P); v < F.length; v++) {
                A = F[v];
                if(L = A.isLineBreak) {
                  L = P;
                  V = I;
                  var W = void 0,
                    aa = void 0;
                  A.hasBlockSibling ? L = 1 : (W = L.startContainer.getAscendant(l.$block, 1)) && W.is({
                    div: 1,
                    p: 1
                  }) ? (aa = W.getPosition(V), aa == CKEDITOR.POSITION_IDENTICAL || aa == CKEDITOR.POSITION_CONTAINS ? L = 0 : (V = L.splitElement(W), L.moveToPosition(V, CKEDITOR.POSITION_AFTER_START), L = 1)) : L = 0
                }
                if(L) p = 0 < v;
                else {
                  L = P.startPath();
                  !A.isBlock && h(n.editor, L.block, L.blockLimit) && (X = d(n.editor)) && (X = u.createElement(X), X.appendBogus(), P.insertNode(X),
                    CKEDITOR.env.needsBrFiller && (T = X.getBogus()) && T.remove(), P.moveToPosition(X, CKEDITOR.POSITION_BEFORE_END));
                  if((L = P.startPath().block) && !L.equals(S)) {
                    if(T = L.getBogus()) T.remove(), O.push(L);
                    S = L
                  }
                  A.firstNotAllowed && (t = 1);
                  if(t && A.isElement) {
                    L = P.startContainer;
                    for(V = null; L && !l[L.getName()][A.name];) {
                      if(L.equals(I)) {
                        L = null;
                        break
                      }
                      V = L;
                      L = L.getParent()
                    }
                    if(L) V && (Y = P.splitElement(V), n.zombies.push(Y), n.zombies.push(V));
                    else {
                      V = I.getName();
                      Z = !v;
                      L = v == F.length - 1;
                      V = g(A.node, V);
                      for(var W = [], aa = V.length, da = 0, ia = void 0,
                          ja = 0, ea = -1; da < aa; da++) ia = V[da], " " == ia ? (ja || Z && !da || (W.push(new CKEDITOR.dom.text(" ")), ea = W.length), ja = 1) : (W.push(ia), ja = 0);
                      L && ea == W.length && W.pop();
                      Z = W
                    }
                  }
                  if(Z) {
                    for(; L = Z.pop();) P.insertNode(L);
                    Z = 0
                  } else P.insertNode(A.node);
                  A.lastNotAllowed && v < F.length - 1 && ((Y = fa ? B : Y) && P.setEndAt(Y, CKEDITOR.POSITION_AFTER_START), t = 0);
                  P.collapse()
                }
              }
              1 != F.length ? T = !1 : (T = F[0], T = T.isElement && "false" == T.node.getAttribute("contenteditable"));
              T && (p = !0, L = F[0].node, P.setStartAt(L, CKEDITOR.POSITION_BEFORE_START), P.setEndAt(L,
                CKEDITOR.POSITION_AFTER_END));
              n.dontMoveCaret = p;
              n.bogusNeededBlocks = O
            }
            T = n.range;
            var ga;
            Y = n.bogusNeededBlocks;
            for(Z = T.createBookmark(); S = n.zombies.pop();) S.getParent() && (X = T.clone(), X.moveToElementEditStart(S), X.removeEmptyBlocksAtEnd());
            if(Y)
              for(; S = Y.pop();) CKEDITOR.env.needsBrFiller ? S.appendBogus() : S.append(T.document.createText(" "));
            for(; S = n.mergeCandidates.pop();) S.mergeSiblings();
            T.moveToBookmark(Z);
            if(!n.dontMoveCaret) {
              for(S = f(T); S && a(S) && !S.is(l.$empty);) {
                if(S.isBlockBoundary()) T.moveToPosition(S,
                  CKEDITOR.POSITION_BEFORE_END);
                else {
                  if(e(S) && S.getHtml().match(/(\s|&nbsp;)$/g)) {
                    ga = null;
                    break
                  }
                  ga = T.clone();
                  ga.moveToPosition(S, CKEDITOR.POSITION_BEFORE_END)
                }
                S = S.getLast(c)
              }
              ga && T.moveToRange(ga)
            }
          }
        }
      }();
      r = function() {
        function a(b) {
          b = new CKEDITOR.dom.walker(b);
          b.guard = function(a, b) {
            if(b) return !1;
            if(a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent)
          };
          b.evaluator = function(a) {
            return a.type == CKEDITOR.NODE_ELEMENT
          };
          return b
        }

        function b(a, c, d) {
          c = a.getDocument().createElement(c);
          a.append(c,
            d);
          return c
        }

        function c(a) {
          var b = a.count(),
            d;
          for(b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
        }
        return function(d) {
          var g = d.startContainer,
            f = g.getAscendant("table", 1),
            e = !1;
          c(f.getElementsByTag("td"));
          c(f.getElementsByTag("th"));
          f = d.clone();
          f.setStart(g, 0);
          f = a(f).lastBackward();
          f || (f = d.clone(), f.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), e = !0);
          f || (f = g);
          f.is("table") ? (d.setStartAt(f,
            CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), f.remove()) : (f.is({
            tbody: 1,
            thead: 1,
            tfoot: 1
          }) && (f = b(f, "tr", e)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", e)), (g = f.getBogus()) && g.remove(), d.moveToPosition(f, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
        }
      }();
      v = function() {
        function a(b) {
          b = new CKEDITOR.dom.walker(b);
          b.guard = function(a, b) {
            if(b) return !1;
            if(a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem)
          };
          b.evaluator = function(a) {
            return a.type ==
              CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem)
          };
          return b
        }
        return function(b) {
          var c = b.startContainer,
            d = !1,
            g;
          g = b.clone();
          g.setStart(c, 0);
          g = a(g).lastBackward();
          g || (g = b.clone(), g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), d = !0);
          g || (g = c);
          g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) : ((c = g.getBogus()) && c.remove(), b.moveToPosition(g, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
        }
      }();
      w = {
        eol: {
          detect: function(a,
            b) {
            var c = a.range,
              d = c.clone(),
              g = c.clone(),
              f = new CKEDITOR.dom.elementPath(c.startContainer, b),
              e = new CKEDITOR.dom.elementPath(c.endContainer, b);
            d.collapse(1);
            g.collapse();
            f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1);
            e.block && g.checkBoundaryOfElement(e.block, CKEDITOR.START) && (c.setEndBefore(e.block), a.appendEolBr = 1)
          },
          fix: function(a, b) {
            var c = b.getDocument(),
              d;
            a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
            !a.prependEolBr || d && !d.getPrevious() ||
              a.fragment.append(this.createEolBr(c), 1)
          },
          createEolBr: function(a) {
            return a.createElement("br", {
              attributes: {
                "data-cke-eol": 1
              }
            })
          }
        },
        bogus: {
          exclude: function(a) {
            var b = a.range.getBoundaryNodes(),
              c = b.startNode,
              b = b.endNode;
            !b || !t(b) || c && c.equals(b) || a.range.setEndBefore(b)
          }
        },
        tree: {
          rebuild: function(a, b) {
            var c = a.range,
              d = c.getCommonAncestor(),
              g = new CKEDITOR.dom.elementPath(d, b),
              f = new CKEDITOR.dom.elementPath(c.startContainer, b),
              c = new CKEDITOR.dom.elementPath(c.endContainer, b),
              e;
            d.type == CKEDITOR.NODE_TEXT && (d =
              d.getParent());
            if(g.blockLimit.is({
                tr: 1,
                table: 1
              })) {
              var m = g.contains("table").getParent();
              e = function(a) {
                return !a.equals(m)
              }
            } else if(g.block && g.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
              var k = g.contains(CKEDITOR.dtd.$list).getParent();
              e = function(a) {
                return !a.equals(k)
              }
            }
            e || (e = function(a) {
              return !a.equals(g.block) && !a.equals(g.blockLimit)
            });
            this.rebuildFragment(a, b, d, e)
          },
          rebuildFragment: function(a, b, c, d) {
            for(var g; c && !c.equals(b) &&
              d(c);) g = c.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, c = c.getParent()
          }
        },
        cell: {
          shrink: function(a) {
            a = a.range;
            var b = a.startContainer,
              c = a.endContainer,
              d = a.startOffset,
              g = a.endOffset;
            b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == g && a.shrink(CKEDITOR.SHRINK_TEXT)
          }
        }
      };
      B = function() {
        function a(b, c) {
          var d = b.getParent();
          if(d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d)
        }

        function b(c, d, g) {
          a(d);
          a(g, 1);
          for(var f; f = g.getNext();) f.insertAfter(d), d = f;
          p(c) && c.remove()
        }

        function c(a, b) {
          var d =
            new CKEDITOR.dom.range(a);
          d.setStartAfter(b.startNode);
          d.setEndBefore(b.endNode);
          return d
        }
        return {
          list: {
            detectMerge: function(a, b) {
              var d = c(b, a.bookmark),
                g = d.startPath(),
                f = d.endPath(),
                e = g.contains(CKEDITOR.dtd.$list),
                m = f.contains(CKEDITOR.dtd.$list);
              a.mergeList = e && m && e.getParent().equals(m.getParent()) && !e.equals(m);
              a.mergeListItems = g.block && f.block && g.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem);
              if(a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode),
                d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
            },
            merge: function(a, c) {
              if(a.mergeListBookmark) {
                var d = a.mergeListBookmark.startNode,
                  g = a.mergeListBookmark.endNode,
                  f = new CKEDITOR.dom.elementPath(d, c),
                  e = new CKEDITOR.dom.elementPath(g, c);
                if(a.mergeList) {
                  var m = f.contains(CKEDITOR.dtd.$list),
                    k = e.contains(CKEDITOR.dtd.$list);
                  m.equals(k) || (k.moveChildren(m), k.remove())
                }
                a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), e = e.contains(CKEDITOR.dtd.$listItem), f.equals(e) || b(e, d, g));
                d.remove();
                g.remove()
              }
            }
          },
          block: {
            detectMerge: function(a, b) {
              if(!a.tableContentsRanges && !a.mergeListBookmark) {
                var c = new CKEDITOR.dom.range(b);
                c.setStartBefore(a.bookmark.startNode);
                c.setEndAfter(a.bookmark.endNode);
                a.mergeBlockBookmark = c.createBookmark()
              }
            },
            merge: function(a, c) {
              if(a.mergeBlockBookmark && !a.purgeTableBookmark) {
                var d = a.mergeBlockBookmark.startNode,
                  g = a.mergeBlockBookmark.endNode,
                  f = new CKEDITOR.dom.elementPath(d, c),
                  e = new CKEDITOR.dom.elementPath(g, c),
                  f = f.block,
                  e = e.block;
                f && e && !f.equals(e) &&
                  b(e, d, g);
                d.remove();
                g.remove()
              }
            }
          },
          table: function() {
            function a(c) {
              var g = [],
                f, e = new CKEDITOR.dom.walker(c),
                m = c.startPath().contains(d),
                k = c.endPath().contains(d),
                h = {};
              e.guard = function(a, e) {
                if(a.type == CKEDITOR.NODE_ELEMENT) {
                  var l = "visited_" + (e ? "out" : "in");
                  if(a.getCustomData(l)) return;
                  CKEDITOR.dom.element.setMarker(h, a, l, 1)
                }
                if(e && m && a.equals(m)) f = c.clone(), f.setEndAt(m, CKEDITOR.POSITION_BEFORE_END), g.push(f);
                else if(!e && k && a.equals(k)) f = c.clone(), f.setStartAt(k, CKEDITOR.POSITION_AFTER_START), g.push(f);
                else {
                  if(l = !e) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!m || b(a, m)) && (!k || b(a, k));
                  if(!l && (l = e))
                    if(a.is(d)) var l = m && m.getAscendant("table", !0),
                      n = k && k.getAscendant("table", !0),
                      r = a.getAscendant("table", !0),
                      l = l && l.contains(r) || n && n.contains(r);
                    else l = void 0;
                  l && (f = c.clone(), f.selectNodeContents(a), g.push(f))
                }
              };
              e.lastForward();
              CKEDITOR.dom.element.clearAllMarkers(h);
              return g
            }

            function b(a, c) {
              var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                g = a.getPosition(c);
              return g === CKEDITOR.POSITION_IDENTICAL ?
                !1 : 0 === (g & d)
            }
            var d = {
              td: 1,
              th: 1,
              caption: 1
            };
            return {
              detectPurge: function(a) {
                var b = a.range,
                  c = b.clone();
                c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                var c = new CKEDITOR.dom.walker(c),
                  g = 0;
                c.evaluator = function(a) {
                  a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++g
                };
                c.checkForward();
                if(1 < g) {
                  var c = b.startPath().contains("table"),
                    f = b.endPath().contains("table");
                  c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark =
                    b.createBookmark())
                }
              },
              detectRanges: function(g, f) {
                var e = c(f, g.bookmark),
                  m = e.clone(),
                  k, h, l = e.getCommonAncestor();
                l.is(CKEDITOR.dtd.$tableContent) && !l.is(d) && (l = l.getAscendant("table", !0));
                h = l;
                l = new CKEDITOR.dom.elementPath(e.startContainer, h);
                h = new CKEDITOR.dom.elementPath(e.endContainer, h);
                l = l.contains("table");
                h = h.contains("table");
                if(l || h) l && h && b(l, h) ? (g.tableSurroundingRange = m, m.setStartAt(l, CKEDITOR.POSITION_AFTER_END), m.setEndAt(h, CKEDITOR.POSITION_BEFORE_START), m = e.clone(), m.setEndAt(l, CKEDITOR.POSITION_AFTER_END),
                  k = e.clone(), k.setStartAt(h, CKEDITOR.POSITION_BEFORE_START), k = a(m).concat(a(k))) : l ? h || (g.tableSurroundingRange = m, m.setStartAt(l, CKEDITOR.POSITION_AFTER_END), e.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange = m, m.setEndAt(h, CKEDITOR.POSITION_BEFORE_START), e.setStartAt(h, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = k ? k : a(e)
              },
              deleteRanges: function(a) {
                for(var b; b = a.tableContentsRanges.pop();) b.extractContents(), p(b.startContainer) && b.startContainer.appendBogus();
                a.tableSurroundingRange &&
                  a.tableSurroundingRange.extractContents()
              },
              purge: function(a) {
                if(a.purgeTableBookmark) {
                  var b = a.doc,
                    c = a.range.clone(),
                    b = b.createElement("p");
                  b.insertBefore(a.purgeTableBookmark.startNode);
                  c.moveToBookmark(a.purgeTableBookmark);
                  c.deleteContents();
                  a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                }
              }
            }
          }(),
          detectExtractMerge: function(a) {
            return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem))
          },
          fixUneditableRangePosition: function(a) {
            a.startContainer.getDtd()["#"] ||
              a.moveToClosestEditablePosition(null, !0)
          },
          autoParagraph: function(a, b) {
            var c = b.startPath(),
              g;
            h(a, c.block, c.blockLimit) && (g = d(a)) && (g = b.document.createElement(g), g.appendBogus(), b.insertNode(g), b.moveToPosition(g, CKEDITOR.POSITION_AFTER_START))
          }
        }
      }()
    }(),
    function() {
      function a(a, b) {
        if(0 === a.length) return !1;
        var c, d;
        if((c = !b && 1 === a.length) && !(c = a[0].collapsed)) {
          var g = a[0];
          c = g.startContainer.getAscendant({
            td: 1,
            th: 1
          }, !0);
          var f = g.endContainer.getAscendant({
            td: 1,
            th: 1
          }, !0);
          d = CKEDITOR.tools.trim;
          c && c.equals(f) &&
            !c.findOne("td, th, tr, tbody, table") ? (g = g.cloneContents(), c = g.getFirst() ? d(g.getFirst().getText()) !== d(c.getText()) : !0) : c = !1
        }
        if(c) return !1;
        for(d = 0; d < a.length; d++)
          if(c = a[d]._getTableElement(), !c) return !1;
        return !0
      }

      function e(a) {
        function b(a) {
          a = a.find("td, th");
          var c = [],
            d;
          for(d = 0; d < a.count(); d++) c.push(a.getItem(d));
          return c
        }
        var c = [],
          d, g;
        for(g = 0; g < a.length; g++) d = a[g]._getTableElement(), d.is && d.is({
          td: 1,
          th: 1
        }) ? c.push(d) : c = c.concat(b(d));
        return c
      }

      function b(a) {
        a = e(a);
        var b = "",
          c = [],
          d, g;
        for(g = 0; g < a.length; g++) d &&
          !d.equals(a[g].getAscendant("tr")) ? (b += c.join("\t") + "\n", d = a[g].getAscendant("tr"), c = []) : 0 === g && (d = a[g].getAscendant("tr")), c.push(a[g].getText());
        return b += c.join("\t")
      }

      function c(a) {
        var c = this.root.editor,
          d = c.getSelection(1);
        this.reset();
        B = !0;
        d.root.once("selectionchange", function(a) {
          a.cancel()
        }, null, null, 0);
        d.selectRanges([a[0]]);
        d = this._.cache;
        d.ranges = new CKEDITOR.dom.rangeList(a);
        d.type = CKEDITOR.SELECTION_TEXT;
        d.selectedElement = a[0]._getTableElement();
        d.selectedText = b(a);
        d.nativeSel = null;
        this.isFake =
          1;
        this.rev = r++;
        c._.fakeSelection = this;
        B = !1;
        this.root.fire("selectionchange")
      }

      function f() {
        var b = this._.fakeSelection,
          c;
        if(b) {
          c = this.getSelection(1);
          var d;
          if(!(d = !c) && (d = !c.isHidden())) {
            d = b;
            var g = c.getRanges(),
              f = d.getRanges(),
              e = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0),
              m = f.length && f[0]._getTableElement() && f[0]._getTableElement().getAscendant("table", !0),
              k = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"),
              h = 1 === f.length && f[0]._getTableElement() &&
              f[0]._getTableElement().is("table"),
              l = 1 === g.length && g[0].collapsed,
              f = a(g, !!CKEDITOR.env.webkit) && a(f);
            e = e && m ? e.equals(m) || m.contains(e) : !1;
            e && (l || f) ? (k && !h && d.selectRanges(g), d = !0) : d = !1;
            d = !d
          }
          d && (b.reset(), b = 0)
        }
        if(!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return;
        this.fire("selectionCheck", b);
        c = this.elementPath();
        c.compare(this._.selectionPreviousPath) || (d = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), CKEDITOR.env.webkit && !d &&
          (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", {
            selection: b,
            path: c
          }))
      }

      function l() {
        z = !0;
        q || (h.call(this), q = CKEDITOR.tools.setTimeout(h, 200, this))
      }

      function h() {
        q = null;
        z && (CKEDITOR.tools.setTimeout(f, 0, this), z = !1)
      }

      function d(a) {
        return y(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
      }

      function k(a) {
        function b(c, d) {
          return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1
        }
        if(!(a.root instanceof CKEDITOR.editable)) return !1;
        var c = a.startContainer,
          g = a.getPreviousNode(d, null, c),
          f = a.getNextNode(d, null, c);
        return b(g) || b(f, 1) || !(g || f || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
      }

      function m(a) {
        g(a, !1);
        var b = a.getDocument().createText(v);
        a.setCustomData("cke-fillingChar", b);
        return b
      }

      function g(a, b) {
        var c = a && a.removeCustomData("cke-fillingChar");
        if(c) {
          if(!1 !== b) {
            var d = a.getDocument().getSelection().getNative(),
              g = d && "None" != d.type && d.getRangeAt(0),
              f = v.length;
            if(c.getLength() >
              f && g && g.intersectsNode(c.$)) {
              var e = [{
                node: d.anchorNode,
                offset: d.anchorOffset
              }, {
                node: d.focusNode,
                offset: d.focusOffset
              }];
              d.anchorNode == c.$ && d.anchorOffset > f && (e[0].offset -= f);
              d.focusNode == c.$ && d.focusOffset > f && (e[1].offset -= f)
            }
          }
          c.setText(n(c.getText(), 1));
          e && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(e[0].node, e[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(e[1].node, e[1].offset))
        }
      }

      function n(a, b) {
        return b ? a.replace(w, function(a, b) {
            return b ? " " : ""
          }) :
          a.replace(v, "")
      }

      function p(a, b) {
        var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document);
        a.fire("lockSnapshot");
        a.editable().append(c);
        var d = a.getSelection(1),
          g = a.createRange(),
          f = d.root.on("selectionchange", function(a) {
            a.cancel()
          }, null, null, 0);
        g.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
        g.setEndAt(c,
          CKEDITOR.POSITION_BEFORE_END);
        d.selectRanges([g]);
        f.removeListener();
        a.fire("unlockSnapshot");
        a._.hiddenSelectionContainer = c
      }

      function t(a) {
        var b = {
          37: 1,
          39: 1,
          8: 1,
          46: 1
        };
        return function(c) {
          var d = c.data.getKeystroke();
          if(b[d]) {
            var g = a.getSelection().getRanges(),
              f = g[0];
            1 == g.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
          }
        }
      }

      function A(a) {
        for(var b =
            0; b < a.length; b++) {
          var c = a[b];
          c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
          if(!c.collapsed) {
            if(c.startContainer.isReadOnly())
              for(var d = c.startContainer, g; d && !((g = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) g && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
            d = c.startContainer;
            g = c.endContainer;
            var f = c.startOffset,
              e = c.endOffset,
              m = c.clone();
            d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? m.setStartAfter(d) : m.setStartBefore(d));
            g && g.type == CKEDITOR.NODE_TEXT &&
              (e ? m.setEndAfter(g) : m.setEndBefore(g));
            d = new CKEDITOR.dom.walker(m);
            d.evaluator = function(d) {
              if(d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
                var g = c.clone();
                c.setEndBefore(d);
                c.collapsed && a.splice(b--, 1);
                d.getPosition(m.endContainer) & CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(d), g.collapsed || a.splice(b + 1, 0, g));
                return !0
              }
              return !1
            };
            d.next()
          }
        }
        return a
      }
      var u = "function" != typeof window.getSelection,
        r = 1,
        v = CKEDITOR.tools.repeat("​", 7),
        w = new RegExp(v + "( )?", "g"),
        B, q, z, y = CKEDITOR.dom.walker.invisible(1),
        x = function() {
          function a(b) {
            return function(a) {
              var c = a.editor.createRange();
              c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
              return !1
            }
          }

          function b(a) {
            return function(b) {
              var c = b.editor,
                d = c.createRange(),
                g;
              (g = d.moveToClosestEditablePosition(b.selected, a)) || (g = d.moveToClosestEditablePosition(b.selected, !a));
              g && c.getSelection().selectRanges([d]);
              c.fire("saveSnapshot");
              b.selected.remove();
              g || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
              c.fire("saveSnapshot");
              return !1
            }
          }
          var c = a(),
            d = a(1);
          return {
            37: c,
            38: c,
            39: d,
            40: d,
            8: b(),
            46: b(1)
          }
        }();
      CKEDITOR.on("instanceCreated", function(a) {
        function b() {
          var a = c.getSelection();
          a && a.removeAllRanges()
        }
        var c = a.editor;
        c.on("contentDom", function() {
          function a() {
            v = new CKEDITOR.dom.selection(c.getSelection());
            v.lock()
          }

          function b() {
            m.removeListener("mouseup", b);
            n.removeListener("mouseup", b);
            var a = CKEDITOR.document.$.selection,
              c = a.createRange();
            "None" != a.type && c.parentElement() && c.parentElement().ownerDocument ==
              e.$ && c.select()
          }

          function d(a) {
            if(CKEDITOR.env.ie) {
              var b = (a = a.getRanges()[0]) ? a.startContainer.getAscendant(function(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && ("false" == a.getAttribute("contenteditable") || "true" == a.getAttribute("contenteditable"))
              }, !0) : null;
              return a && "false" == b.getAttribute("contenteditable") && b
            }
          }
          var e = c.document,
            m = CKEDITOR.document,
            k = c.editable(),
            h = e.getBody(),
            n = e.getDocumentElement(),
            r = k.isInline(),
            w, v;
          CKEDITOR.env.gecko && k.attachListener(k, "focus", function(a) {
            a.removeListener();
            0 !==
              w && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == k.$ && (a = c.createRange(), a.moveToElementEditStart(k), a.select())
          }, null, null, -2);
          k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
            w && CKEDITOR.env.webkit && (w = c._.previousActive && c._.previousActive.equals(e.getActive())) && null != c._.previousScrollTop && c._.previousScrollTop != k.$.scrollTop && (k.$.scrollTop = c._.previousScrollTop);
            c.unlockSelection(w);
            w = 0
          }, null, null, -1);
          k.attachListener(k, "mousedown", function() {
            w = 0
          });
          if(CKEDITOR.env.ie ||
            r) u ? k.attachListener(k, "beforedeactivate", a, null, null, -1) : k.attachListener(c, "selectionCheck", a, null, null, -1), k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
            c.lockSelection(v);
            w = 1
          }, null, null, -1), k.attachListener(k, "mousedown", function() {
            w = 0
          });
          if(CKEDITOR.env.ie && !r) {
            var p;
            k.attachListener(k, "mousedown", function(a) {
              2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (p = c.window.getScrollPosition()))
            });
            k.attachListener(k, "mouseup", function(a) {
              2 ==
                a.data.$.button && p && (c.document.$.documentElement.scrollLeft = p.x, c.document.$.documentElement.scrollTop = p.y);
              p = null
            });
            if("BackCompat" != e.$.compatMode) {
              if(CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                var q, y;
                n.on("mousedown", function(a) {
                  function b(a) {
                    a = a.data.$;
                    if(q) {
                      var c = h.$.createTextRange();
                      try {
                        c.moveToPoint(a.clientX, a.clientY)
                      } catch(d) {}
                      q.setEndPoint(0 > y.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
                      q.select()
                    }
                  }

                  function c() {
                    n.removeListener("mousemove", b);
                    m.removeListener("mouseup",
                      c);
                    n.removeListener("mouseup", c);
                    q.select()
                  }
                  a = a.data;
                  if(a.getTarget().is("html") && a.$.y < n.$.clientHeight && a.$.x < n.$.clientWidth) {
                    q = h.$.createTextRange();
                    try {
                      q.moveToPoint(a.$.clientX, a.$.clientY)
                    } catch(d) {}
                    y = q.duplicate();
                    n.on("mousemove", b);
                    m.on("mouseup", c);
                    n.on("mouseup", c)
                  }
                })
              }
              if(7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) n.on("mousedown", function(a) {
                a.data.getTarget().is("html") && (m.on("mouseup", b), n.on("mouseup", b))
              })
            }
          }
          k.attachListener(k, "selectionchange", f, c);
          k.attachListener(k, "keyup",
            l, c);
          k.attachListener(k, "keydown", function(a) {
            var b = this.getSelection(1);
            d(b) && (b.selectElement(d(b)), a.data.preventDefault())
          }, c);
          k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
            c.forceNextSelectionCheck();
            c.selectionChange(1)
          });
          if(r && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
            var A;
            k.attachListener(k, "mousedown", function() {
              A = 1
            });
            k.attachListener(e.getDocumentElement(), "mouseup", function() {
              A && l.call(c);
              A = 0
            })
          } else k.attachListener(CKEDITOR.env.ie ? k : e.getDocumentElement(), "mouseup",
            l, c);
          CKEDITOR.env.webkit && k.attachListener(e, "keydown", function(a) {
            switch(a.data.getKey()) {
              case 13:
              case 33:
              case 34:
              case 35:
              case 36:
              case 37:
              case 39:
              case 8:
              case 45:
              case 46:
                k.hasFocus && g(k)
            }
          }, null, null, -1);
          k.attachListener(k, "keydown", t(c), null, null, -1)
        });
        c.on("setData", function() {
          c.unlockSelection();
          CKEDITOR.env.webkit && b()
        });
        c.on("contentDomUnload", function() {
          c.unlockSelection()
        });
        if(CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9);
        c.on("dataReady", function() {
          delete c._.fakeSelection;
          delete c._.hiddenSelectionContainer;
          c.selectionChange(1)
        });
        c.on("loadSnapshot", function() {
          var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
            b = c.editable().getLast(a);
          b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
        }, null, null, 100);
        c.on("key", function(a) {
          if("wysiwyg" == c.mode) {
            var b = c.getSelection();
            if(b.isFake) {
              var d = x[a.data.keyCode];
              if(d) return d({
                editor: c,
                selected: b.getSelectedElement(),
                selection: b,
                keyEvent: a
              })
            }
          }
        })
      });
      if(CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function(a) {
        var b = a.editor;
        b.on("selectionChange", function() {
          var a = b.editable(),
            c = a.getCustomData("cke-fillingChar");
          c && (c.getCustomData("ready") ? (g(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
        }, null, null, -1);
        b.on("beforeSetMode", function() {
          g(b.editable())
        }, null, null, -1);
        b.on("getSnapshot", function(a) {
          a.data && (a.data = n(a.data))
        }, b, null, 20);
        b.on("toDataFormat", function(a) {
          a.data.dataValue = n(a.data.dataValue)
        }, null, null, 0)
      });
      CKEDITOR.editor.prototype.selectionChange =
        function(a) {
          (a ? f : l).call(this)
        };
      CKEDITOR.editor.prototype.getSelection = function(a) {
        return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
      };
      CKEDITOR.editor.prototype.lockSelection = function(a) {
        a = a || this.getSelection(1);
        return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
      };
      CKEDITOR.editor.prototype.unlockSelection = function(a) {
        var b = this._.savedSelection;
        return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1
      };
      CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
        delete this._.selectionPreviousPath
      };
      CKEDITOR.dom.document.prototype.getSelection = function() {
        return new CKEDITOR.dom.selection(this)
      };
      CKEDITOR.dom.range.prototype.select = function() {
        var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
        a.selectRanges([this]);
        return a
      };
      CKEDITOR.SELECTION_NONE = 1;
      CKEDITOR.SELECTION_TEXT = 2;
      CKEDITOR.SELECTION_ELEMENT = 3;
      CKEDITOR.dom.selection = function(a) {
        if(a instanceof CKEDITOR.dom.selection) {
          var b = a;
          a = a.root
        }
        var c = a instanceof CKEDITOR.dom.element;
        this.rev = b ? b.rev : r++;
        this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
        this.root = c ? a : this.document.getBody();
        this.isLocked = 0;
        this._ = {
          cache: {}
        };
        if(b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
        a = this.getNative();
        var d, g;
        if(a)
          if(a.getRangeAt) d = (g = a.rangeCount && a.getRangeAt(0)) &&
            new CKEDITOR.dom.node(g.commonAncestorContainer);
          else {
            try {
              g = a.createRange()
            } catch(f) {}
            d = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement())
          }
        if(!d || d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
        return this
      };
      var C = {
        img: 1,
        hr: 1,
        li: 1,
        table: 1,
        tr: 1,
        td: 1,
        th: 1,
        embed: 1,
        object: 1,
        ol: 1,
        ul: 1,
        a: 1,
        input: 1,
        form: 1,
        select: 1,
        textarea: 1,
        button: 1,
        fieldset: 1,
        thead: 1,
        tfoot: 1
      };
      CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
        _removeFillingCharSequenceString: n,
        _createFillingCharSequenceNode: m,
        FILLING_CHAR_SEQUENCE: v
      });
      CKEDITOR.dom.selection.prototype = {
        getNative: function() {
          return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = u ? this.document.$.selection : this.document.getWindow().$.getSelection()
        },
        getType: u ? function() {
          var a = this._.cache;
          if(a.type) return a.type;
          var b = CKEDITOR.SELECTION_NONE;
          try {
            var c = this.getNative(),
              d = c.type;
            "Text" == d && (b = CKEDITOR.SELECTION_TEXT);
            "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
            c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT)
          } catch(g) {}
          return a.type = b
        } : function() {
          var a = this._.cache;
          if(a.type) return a.type;
          var b = CKEDITOR.SELECTION_TEXT,
            c = this.getNative();
          if(!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
          else if(1 == c.rangeCount) {
            var c = c.getRangeAt(0),
              d = c.startContainer;
            d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset -
              c.startOffset && C[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
          }
          return a.type = b
        },
        getRanges: function() {
          var a = u ? function() {
            function a(b) {
              return(new CKEDITOR.dom.node(b)).getIndex()
            }
            var b = function(b, c) {
              b = b.duplicate();
              b.collapse(c);
              var d = b.parentElement();
              if(!d.hasChildNodes()) return {
                container: d,
                offset: 0
              };
              for(var g = d.children, f, e, m = b.duplicate(), k = 0, h = g.length - 1, l = -1, n, r; k <= h;)
                if(l = Math.floor((k + h) / 2), f = g[l], m.moveToElementText(f), n = m.compareEndPoints("StartToStart",
                    b), 0 < n) h = l - 1;
                else if(0 > n) k = l + 1;
              else return {
                container: d,
                offset: a(f)
              };
              if(-1 == l || l == g.length - 1 && 0 > n) {
                m.moveToElementText(d);
                m.setEndPoint("StartToStart", b);
                m = m.text.replace(/(\r\n|\r)/g, "\n").length;
                g = d.childNodes;
                if(!m) return f = g[g.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? {
                  container: d,
                  offset: g.length
                } : {
                  container: f,
                  offset: f.nodeValue.length
                };
                for(d = g.length; 0 < m && 0 < d;) e = g[--d], e.nodeType == CKEDITOR.NODE_TEXT && (r = e, m -= e.nodeValue.length);
                return {
                  container: r,
                  offset: -m
                }
              }
              m.collapse(0 < n ? !0 : !1);
              m.setEndPoint(0 <
                n ? "StartToStart" : "EndToStart", b);
              m = m.text.replace(/(\r\n|\r)/g, "\n").length;
              if(!m) return {
                container: d,
                offset: a(f) + (0 < n ? 0 : 1)
              };
              for(; 0 < m;) try {
                e = f[0 < n ? "previousSibling" : "nextSibling"], e.nodeType == CKEDITOR.NODE_TEXT && (m -= e.nodeValue.length, r = e), f = e
              } catch(w) {
                return {
                  container: d,
                  offset: a(f)
                }
              }
              return {
                container: r,
                offset: 0 < n ? -m : r.nodeValue.length + m
              }
            };
            return function() {
              var a = this.getNative(),
                c = a && a.createRange(),
                d = this.getType();
              if(!a) return [];
              if(d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root),
                d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a];
              if(d == CKEDITOR.SELECTION_ELEMENT) {
                for(var d = [], g = 0; g < c.length; g++) {
                  for(var f = c.item(g), e = f.parentNode, m = 0, a = new CKEDITOR.dom.range(this.root); m < e.childNodes.length && e.childNodes[m] != f; m++);
                  a.setStart(new CKEDITOR.dom.node(e), m);
                  a.setEnd(new CKEDITOR.dom.node(e),
                    m + 1);
                  d.push(a)
                }
                return d
              }
              return []
            }
          }() : function() {
            var a = [],
              b, c = this.getNative();
            if(!c) return a;
            for(var d = 0; d < c.rangeCount; d++) {
              var g = c.getRangeAt(d);
              b = new CKEDITOR.dom.range(this.root);
              b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset);
              b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset);
              a.push(b)
            }
            return a
          };
          return function(b) {
            var c = this._.cache,
              d = c.ranges;
            d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)));
            return b ? A(new CKEDITOR.dom.rangeList(d.slice())) : d
          }
        }(),
        getStartElement: function() {
          var a =
            this._.cache;
          if(void 0 !== a.startElement) return a.startElement;
          var b;
          switch(this.getType()) {
            case CKEDITOR.SELECTION_ELEMENT:
              return this.getSelectedElement();
            case CKEDITOR.SELECTION_TEXT:
              var c = this.getRanges()[0];
              if(c) {
                if(c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                else {
                  for(c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
                  b = c.startContainer;
                  if(b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                  if((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
                    for(c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
                  else b = c.startContainer
                }
                b = b.$
              }
          }
          return a.startElement = b ? new CKEDITOR.dom.element(b) : null
        },
        getSelectedElement: function() {
          var a = this._.cache;
          if(void 0 !== a.selectedElement) return a.selectedElement;
          var b = this,
            c = CKEDITOR.tools.tryThese(function() {
              return b.getNative().createRange().item(0)
            }, function() {
              for(var a = b.getRanges()[0].clone(), c, d, g = 2; g && !((c = a.getEnclosedNode()) &&
                  c.type == CKEDITOR.NODE_ELEMENT && C[c.getName()] && (d = c)); g--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
              return d && d.$
            });
          return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
        },
        getSelectedText: function() {
          var a = this._.cache;
          if(void 0 !== a.selectedText) return a.selectedText;
          var b = this.getNative(),
            b = u ? "Control" == b.type ? "" : b.createRange().text : b.toString();
          return a.selectedText = b
        },
        lock: function() {
          this.getRanges();
          this.getStartElement();
          this.getSelectedElement();
          this.getSelectedText();
          this._.cache.nativeSel = null;
          this.isLocked = 1
        },
        unlock: function(b) {
          if(this.isLocked) {
            if(b) var d = this.getSelectedElement(),
              g = this.getRanges(),
              f = this.isFake;
            this.isLocked = 0;
            this.reset();
            b && (b = d || g[0] && g[0].getCommonAncestor()) && b.getAscendant("body", 1) && (a(g) ? c.call(this, g) : f ? this.fake(d) : d ? this.selectElement(d) : this.selectRanges(g))
          }
        },
        reset: function() {
          this._.cache = {};
          this.isFake = 0;
          var a = this.root.editor;
          if(a && a._.fakeSelection)
            if(this.rev == a._.fakeSelection.rev) {
              delete a._.fakeSelection;
              var b = a._.hiddenSelectionContainer;
              if(b) {
                var c =
                  a.checkDirty();
                a.fire("lockSnapshot");
                b.remove();
                a.fire("unlockSnapshot");
                !c && a.resetDirty()
              }
              delete a._.hiddenSelectionContainer
            } else CKEDITOR.warn("selection-fake-reset");
          this.rev = r++
        },
        selectElement: function(a) {
          var b = new CKEDITOR.dom.range(this.root);
          b.setStartBefore(a);
          b.setEndAfter(a);
          this.selectRanges([b])
        },
        selectRanges: function(b) {
          var d = this.root.editor,
            f = d && d._.hiddenSelectionContainer;
          this.reset();
          if(f)
            for(var f = this.root, e, h = 0; h < b.length; ++h) e = b[h], e.endContainer.equals(f) && (e.endOffset = Math.min(e.endOffset,
              f.getChildCount()));
          if(b.length)
            if(this.isLocked) {
              var l = CKEDITOR.document.getActive();
              this.unlock();
              this.selectRanges(b);
              this.lock();
              l && !l.equals(this.root) && l.focus()
            } else {
              var n;
              a: {
                var r, w;
                if(1 == b.length && !(w = b[0]).collapsed && (n = w.getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT && (w = w.clone(), w.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (r = w.getEnclosedNode()) && r.type == CKEDITOR.NODE_ELEMENT && (n = r), "false" == n.getAttribute("contenteditable"))) break a;n = void 0
              }
              if(n) this.fake(n);
              else if(d && d.plugins.tableselection &&
                CKEDITOR.plugins.tableselection.isSupportedEnvironment && a(b) && !B) c.call(this, b);
              else {
                if(u) {
                  r = CKEDITOR.dom.walker.whitespaces(!0);
                  n = /\ufeff|\u00a0/;
                  w = {
                    table: 1,
                    tbody: 1,
                    tr: 1
                  };
                  1 < b.length && (d = b[b.length - 1], b[0].setEnd(d.endContainer, d.endOffset));
                  d = b[0];
                  b = d.collapsed;
                  var v, p, q;
                  if((f = d.getEnclosedNode()) && f.type == CKEDITOR.NODE_ELEMENT && f.getName() in C && (!f.is("a") || !f.getText())) try {
                    q = f.$.createControlRange();
                    q.addElement(f.$);
                    q.select();
                    return
                  } catch(t) {}
                  if(d.startContainer.type == CKEDITOR.NODE_ELEMENT &&
                    d.startContainer.getName() in w || d.endContainer.type == CKEDITOR.NODE_ELEMENT && d.endContainer.getName() in w) d.shrink(CKEDITOR.NODE_ELEMENT, !0), b = d.collapsed;
                  q = d.createBookmark();
                  w = q.startNode;
                  b || (l = q.endNode);
                  q = d.document.$.body.createTextRange();
                  q.moveToElementText(w.$);
                  q.moveStart("character", 1);
                  l ? (n = d.document.$.body.createTextRange(), n.moveToElementText(l.$), q.setEndPoint("EndToEnd", n), q.moveEnd("character", -1)) : (v = w.getNext(r), p = w.hasAscendant("pre"), v = !(v && v.getText && v.getText().match(n)) && (p ||
                    !w.hasPrevious() || w.getPrevious().is && w.getPrevious().is("br")), p = d.document.createElement("span"), p.setHtml("\x26#65279;"), p.insertBefore(w), v && d.document.createText("﻿").insertBefore(w));
                  d.setStartBefore(w);
                  w.remove();
                  b ? (v ? (q.moveStart("character", -1), q.select(), d.document.$.selection.clear()) : q.select(), d.moveToPosition(p, CKEDITOR.POSITION_BEFORE_START), p.remove()) : (d.setEndBefore(l), l.remove(), q.select())
                } else {
                  l = this.getNative();
                  if(!l) return;
                  this.removeAllRanges();
                  for(q = 0; q < b.length; q++) {
                    if(q <
                      b.length - 1 && (v = b[q], p = b[q + 1], n = v.clone(), n.setStart(v.endContainer, v.endOffset), n.setEnd(p.startContainer, p.startOffset), !n.collapsed && (n.shrink(CKEDITOR.NODE_ELEMENT, !0), d = n.getCommonAncestor(), n = n.getEnclosedNode(), d.isReadOnly() || n && n.isReadOnly()))) {
                      p.setStart(v.startContainer, v.startOffset);
                      b.splice(q--, 1);
                      continue
                    }
                    d = b[q];
                    p = this.document.$.createRange();
                    d.collapsed && CKEDITOR.env.webkit && k(d) && (n = m(this.root), d.insertNode(n), (v = n.getNext()) && !n.getPrevious() && v.type == CKEDITOR.NODE_ELEMENT && "br" ==
                      v.getName() ? (g(this.root), d.moveToPosition(v, CKEDITOR.POSITION_BEFORE_START)) : d.moveToPosition(n, CKEDITOR.POSITION_AFTER_END));
                    p.setStart(d.startContainer.$, d.startOffset);
                    try {
                      p.setEnd(d.endContainer.$, d.endOffset)
                    } catch(y) {
                      if(0 <= y.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) d.collapse(1), p.setEnd(d.endContainer.$, d.endOffset);
                      else throw y;
                    }
                    l.addRange(p)
                  }
                }
                this.reset();
                this.root.fire("selectionchange")
              }
            }
        },
        fake: function(a, b) {
          var c = this.root.editor;
          void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
          this.reset();
          p(c, b);
          var d = this._.cache,
            g = new CKEDITOR.dom.range(this.root);
          g.setStartBefore(a);
          g.setEndAfter(a);
          d.ranges = new CKEDITOR.dom.rangeList(g);
          d.selectedElement = d.startElement = a;
          d.type = CKEDITOR.SELECTION_ELEMENT;
          d.selectedText = d.nativeSel = null;
          this.isFake = 1;
          this.rev = r++;
          c._.fakeSelection = this;
          this.root.fire("selectionchange")
        },
        isHidden: function() {
          var a = this.getCommonAncestor();
          a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
          return !(!a || !a.data("cke-hidden-sel"))
        },
        isInTable: function(b) {
          return a(this.getRanges(),
            b)
        },
        isCollapsed: function() {
          var a = this.getRanges();
          return 1 === a.length && a[0].collapsed
        },
        createBookmarks: function(a) {
          a = this.getRanges().createBookmarks(a);
          this.isFake && (a.isFake = 1);
          return a
        },
        createBookmarks2: function(a) {
          a = this.getRanges().createBookmarks2(a);
          this.isFake && (a.isFake = 1);
          return a
        },
        selectBookmarks: function(b) {
          for(var c = [], d, g = 0; g < b.length; g++) {
            var f = new CKEDITOR.dom.range(this.root);
            f.moveToBookmark(b[g]);
            c.push(f)
          }
          b.isFake && (d = a(c) ? c[0]._getTableElement() : c[0].getEnclosedNode(), d && d.type ==
            CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), b.isFake = 0));
          b.isFake && !a(c) ? this.fake(d) : this.selectRanges(c);
          return this
        },
        getCommonAncestor: function() {
          var a = this.getRanges();
          return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null
        },
        scrollIntoView: function() {
          this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
        },
        removeAllRanges: function() {
          if(this.getType() != CKEDITOR.SELECTION_NONE) {
            var a = this.getNative();
            try {
              a && a[u ? "empty" : "removeAllRanges"]()
            } catch(b) {}
            this.reset()
          }
        }
      }
    }(),
    "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3,
    function() {
      function a(a, b) {
        for(var c, d;
          (a = a.getParent()) && !a.equals(b);)
          if(a.getAttribute("data-nostyle")) c = a;
          else if(!d) {
          var g = a.getAttribute("contentEditable");
          "false" == g ? c = a : "true" == g && (d = 1)
        }
        return c
      }

      function e(a, b, c, d) {
        return(a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a))
      }

      function b(c) {
        var d = c.document;
        if(c.collapsed) d = v(this, d), c.insertNode(d), /* zxt - 20171011 失去焦点回来的问题*/d.$.innerHTML = '&#8203;'/* zxt - 20171011 */, c.moveToPosition(d, CKEDITOR.POSITION_BEFORE_END);
        else {
          var g =
            this.element,
            m = this._.definition,
            k, h = m.ignoreReadonly,
            l = h || m.includeReadonly;
          null == l && (l = c.root.getCustomData("cke_includeReadonly"));
          var n = CKEDITOR.dtd[g];
          n || (k = !0, n = CKEDITOR.dtd.span);
          c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
          c.trim();
          var r = c.createBookmark(),
            w = r.startNode,
            p = r.endNode,
            q = w,
            t;
          if(!h) {
            var y = c.getCommonAncestor(),
              h = a(w, y),
              y = a(p, y);
            h && (q = h.getNextSourceNode(!0));
            y && (p = y)
          }
          for(q.getPosition(p) == CKEDITOR.POSITION_FOLLOWING && (q = 0); q;) {
            h = !1;
            if(q.equals(p)) q = null, h = !0;
            else {
              var B = q.type == CKEDITOR.NODE_ELEMENT ?
                q.getName() : null,
                y = B && "false" == q.getAttribute("contentEditable"),
                z = B && q.getAttribute("data-nostyle");
              if(B && q.data("cke-bookmark")) {
                q = q.getNextSourceNode(!0);
                continue
              }
              if(y && l && CKEDITOR.dtd.$block[B])
                for(var u = q, x = f(u), C = void 0, D = x.length, da = 0, u = D && new CKEDITOR.dom.range(u.getDocument()); da < D; ++da) {
                  var C = x[da],
                    H = CKEDITOR.filter.instances[C.data("cke-filter")];
                  if(H ? H.check(this) : 1) u.selectNodeContents(C), b.call(this, u)
                }
              x = B ? !n[B] || z ? 0 : y && !l ? 0 : e(q, p, m, J) : 1;
              if(x)
                if(C = q.getParent(), x = m, D = g, da = k, !C || !(C.getDtd() ||
                    CKEDITOR.dtd.span)[D] && !da || x.parentRule && !x.parentRule(C)) h = !0;
                else {
                  if(t || B && CKEDITOR.dtd.$removeEmpty[B] && (q.getPosition(p) | J) != J || (t = c.clone(), t.setStartBefore(q)), B = q.type, B == CKEDITOR.NODE_TEXT || y || B == CKEDITOR.NODE_ELEMENT && !q.getChildCount()) {
                    for(var B = q, G;
                      (h = !B.getNext(I)) && (G = B.getParent(), n[G.getName()]) && e(G, w, m, M);) B = G;
                    t.setEndAfter(B)
                  }
                }
              else h = !0;
              q = q.getNextSourceNode(z || y)
            }
            if(h && t && !t.collapsed) {
              for(var h = v(this, d), y = h.hasAttributes(), z = t.getCommonAncestor(), B = {}, x = {}, C = {}, D = {}, ea, E, ha; h &&
                z;) {
                if(z.getName() == g) {
                  for(ea in m.attributes) !D[ea] && (ha = z.getAttribute(E)) && (h.getAttribute(ea) == ha ? x[ea] = 1 : D[ea] = 1);
                  for(E in m.styles) !C[E] && (ha = z.getStyle(E)) && (h.getStyle(E) == ha ? B[E] = 1 : C[E] = 1)
                }
                z = z.getParent()
              }
              for(ea in x) h.removeAttribute(ea);
              for(E in B) h.removeStyle(E);
              y && !h.hasAttributes() && (h = null);
              h ? (t.extractContents().appendTo(h), t.insertNode(h), A.call(this, h), h.mergeSiblings(), CKEDITOR.env.ie || h.$.normalize()) : (h = new CKEDITOR.dom.element("span"), t.extractContents().appendTo(h), t.insertNode(h),
                A.call(this, h), h.remove(!0));
              t = null
            }
          }
          c.moveToBookmark(r);
          c.shrink(CKEDITOR.SHRINK_TEXT);
          c.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }
      }

      function c(a) {
        function b() {
          for(var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(l.getParent()), g = null, f = null, e = 0; e < a.elements.length; e++) {
            var m = a.elements[e];
            if(m == a.block || m == a.blockLimit) break;
            n.checkElementRemovable(m, !0) && (g = m)
          }
          for(e = 0; e < c.elements.length; e++) {
            m = c.elements[e];
            if(m == c.block || m == c.blockLimit) break;
            n.checkElementRemovable(m, !0) &&
              (f = m)
          }
          f && l.breakParent(f);
          g && d.breakParent(g)
        }
        a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
        var c = a.createBookmark(),
          d = c.startNode,
          g = this._.definition.alwaysRemoveElement;
        if(a.collapsed) {
          for(var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), e, m = 0, k; m < f.elements.length && (k = f.elements[m]) && k != f.block && k != f.blockLimit; m++)
            if(this.checkElementRemovable(k)) {
              var h;
              !g && a.collapsed && (a.checkBoundaryOfElement(k, CKEDITOR.END) || (h = a.checkBoundaryOfElement(k, CKEDITOR.START))) ? (e = k, e.match = h ? "start" : "end") : (k.mergeSiblings(),
                k.is(this.element) ? t.call(this, k) : u(k, q(this)[k.getName()]))
            }
          if(e) {
            g = d;
            for(m = 0;; m++) {
              k = f.elements[m];
              if(k.equals(e)) break;
              else if(k.match) continue;
              else k = k.clone();
              k.append(g);
              g = k
            }
            g["start" == e.match ? "insertBefore" : "insertAfter"](e)
          }
        } else {
          var l = c.endNode,
            n = this;
          b();
          for(f = d; !f.equals(l);) e = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? t.call(this, f) : u(f, q(this)[f.getName()]), e.type == CKEDITOR.NODE_ELEMENT && e.contains(d) && (b(), e = d.getNext())),
            f = e
        }
        a.moveToBookmark(c);
        a.shrink(CKEDITOR.NODE_ELEMENT, !0)
      }

      function f(a) {
        var b = [];
        a.forEach(function(a) {
          if("true" == a.getAttribute("contenteditable")) return b.push(a), !1
        }, CKEDITOR.NODE_ELEMENT, !0);
        return b
      }

      function l(a) {
        var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
        (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && w(a, this)
      }

      function h(a) {
        var b = a.getCommonAncestor(!0, !0);
        if(a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
          var b = this._.definition,
            c = b.attributes;
          if(c)
            for(var d in c) a.removeAttribute(d, c[d]);
          if(b.styles)
            for(var g in b.styles) b.styles.hasOwnProperty(g) && a.removeStyle(g)
        }
      }

      function d(a) {
        var b = a.createBookmark(!0),
          c = a.createIterator();
        c.enforceRealBlocks = !0;
        this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
        for(var d, g = a.document, f; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = v(this, g, d), m(d, f));
        a.moveToBookmark(b)
      }

      function k(a) {
        var b = a.createBookmark(1),
          c = a.createIterator();
        c.enforceRealBlocks = !0;
        c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
        for(var d, g; d = c.getNextParagraph();) this.checkElementRemovable(d) && (d.is("pre") ? ((g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(g), m(d, g)) : t.call(this, d));
        a.moveToBookmark(b)
      }

      function m(a, b) {
        var c = !b;
        c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
        var d = b && b.is("pre"),
          f = a.is("pre"),
          e = !d && f;
        if(d && !f) {
          f = b;
          (e = a.getBogus()) && e.remove();
          e = a.getHtml();
          e = n(e, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
          e = e.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
          e = e.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
          e = e.replace(/<br\b[^>]*>/gi, "\n");
          if(CKEDITOR.env.ie) {
            var m = a.getDocument().createElement("div");
            m.append(f);
            f.$.outerHTML = "\x3cpre\x3e" + e + "\x3c/pre\x3e";
            f.copyAttributes(m.getFirst());
            f = m.getFirst().remove()
          } else f.setHtml(e);
          b = f
        } else e ? b = p(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b);
        b.replace(a);
        if(d) {
          var c = b,
            k;
          (k = c.getPrevious(G)) && k.type == CKEDITOR.NODE_ELEMENT &&
            k.is("pre") && (d = n(k.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" : c.setHtml(d), k.remove())
        } else c && r(b)
      }

      function g(a) {
        var b = [];
        n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
          return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e"
        }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
          b.push(c)
        });
        return b
      }

      function n(a, b, c) {
        var d = "",
          g = "";
        a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,
          function(a, b, c) {
            b && (d = b);
            c && (g = c);
            return ""
          });
        return d + a.replace(b, c) + g
      }

      function p(a, b) {
        var c;
        1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
        for(var d = 0; d < a.length; d++) {
          var g = a[d],
            g = g.replace(/(\r\n|\r)/g, "\n"),
            g = n(g, /^[ \t]*\n/, ""),
            g = n(g, /\n$/, ""),
            g = n(g, /^[ \t]+|[ \t]+$/g, function(a, b) {
              return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
            }),
            g = g.replace(/\n/g, "\x3cbr\x3e"),
            g = g.replace(/[ \t]{2,}/g, function(a) {
              return CKEDITOR.tools.repeat("\x26nbsp;",
                a.length - 1) + " "
            });
          if(c) {
            var f = b.clone();
            f.setHtml(g);
            c.append(f)
          } else b.setHtml(g)
        }
        return c || b
      }

      function t(a, b) {
        var c = this._.definition,
          d = c.attributes,
          c = c.styles,
          g = q(this)[a.getName()],
          f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
          e;
        for(e in d)
          if("class" != e && !this._.definition.fullMatch || a.getAttribute(e) == z(e, d[e])) b && "data-" == e.slice(0, 5) || (f = a.hasAttribute(e), a.removeAttribute(e));
        for(var m in c) this._.definition.fullMatch && a.getStyle(m) != z(m, c[m], !0) || (f = f || !!a.getStyle(m), a.removeStyle(m));
        u(a, g, C[a.getName()]);
        f && (this._.definition.alwaysRemoveElement ? r(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? r(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
      }

      function A(a) {
        for(var b = q(this), c = a.getElementsByTag(this.element), d, g = c.count(); 0 <= --g;) d = c.getItem(g), d.isReadOnly() || t.call(this, d, !0);
        for(var f in b)
          if(f != this.element)
            for(c = a.getElementsByTag(f), g = c.count() - 1; 0 <= g; g--) d = c.getItem(g), d.isReadOnly() || u(d, b[f])
      }

      function u(a,
        b, c) {
        if(b = b && b.attributes)
          for(var d = 0; d < b.length; d++) {
            var g = b[d][0],
              f;
            if(f = a.getAttribute(g)) {
              var e = b[d][1];
              (null === e || e.test && e.test(f) || "string" == typeof e && f == e) && a.removeAttribute(g)
            }
          }
        c || r(a)
      }

      function r(a, b) {
        if(!a.hasAttributes() || b)
          if(CKEDITOR.dtd.$block[a.getName()]) {
            var c = a.getPrevious(G),
              d = a.getNext(G);
            !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({
              br: 1
            }) || a.append("br", 1);
            !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({
              br: 1
            }) || a.append("br");
            a.remove(!0)
          } else c = a.getFirst(), d = a.getLast(),
            a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
      }

      function v(a, b, c) {
        var d;
        d = a.element;
        "*" == d && (d = "span");
        d = new CKEDITOR.dom.element(d, b);
        c && c.copyAttributes(d);
        d = w(d, a);
        b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
        return d
      }

      function w(a, b) {
        var c = b._.definition,
          d = c.attributes,
          c = CKEDITOR.style.getStyleText(c);
        if(d)
          for(var g in d) a.setAttribute(g,
            d[g]);
        c && a.setAttribute("style", c);
        return a
      }

      function B(a, b) {
        for(var c in a) a[c] = a[c].replace(E, function(a, c) {
          return b[c]
        })
      }

      function q(a) {
        if(a._.overrides) return a._.overrides;
        var b = a._.overrides = {},
          c = a._.definition.overrides;
        if(c) {
          CKEDITOR.tools.isArray(c) || (c = [c]);
          for(var d = 0; d < c.length; d++) {
            var g = c[d],
              f, e;
            "string" == typeof g ? f = g.toLowerCase() : (f = g.element ? g.element.toLowerCase() : a.element, e = g.attributes);
            g = b[f] || (b[f] = {});
            if(e) {
              var g = g.attributes = g.attributes || [],
                m;
              for(m in e) g.push([m.toLowerCase(),
                e[m]
              ])
            }
          }
        }
        return b
      }

      function z(a, b, c) {
        var d = new CKEDITOR.dom.element("span");
        d[c ? "setStyle" : "setAttribute"](a, b);
        return d[c ? "getStyle" : "getAttribute"](a)
      }

      function y(a, b) {
        function c(a, b) {
          return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a
        }
        "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a));
        "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
        for(var d in a)
          if(!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1;
        return !0
      }

      function x(a, b, c) {
        var d = a.document,
          g = a.getRanges();
        b = b ? this.removeFromRange : this.applyToRange;
        var f, e;
        if(a.isFake && a.isInTable())
          for(f = [], e = 0; e < g.length; e++) f.push(g[e].clone());
        for(var m = g.createIterator(); e = m.getNextRange();) b.call(this, e, c);
        a.selectRanges(f || g);
        d.removeCustomData("doc_processing_style")
      }
      var C = {
          address: 1,
          div: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          p: 1,
          pre: 1,
          section: 1,
          header: 1,
          footer: 1,
          nav: 1,
          article: 1,
          aside: 1,
          figure: 1,
          dialog: 1,
          hgroup: 1,
          time: 1,
          meter: 1,
          menu: 1,
          command: 1,
          keygen: 1,
          output: 1,
          progress: 1,
          details: 1,
          datagrid: 1,
          datalist: 1
        },
        D = {
          a: 1,
          blockquote: 1,
          embed: 1,
          hr: 1,
          img: 1,
          li: 1,
          object: 1,
          ol: 1,
          table: 1,
          td: 1,
          tr: 1,
          th: 1,
          ul: 1,
          dl: 1,
          dt: 1,
          dd: 1,
          form: 1,
          audio: 1,
          video: 1
        },
        H = /\s*(?:;\s*|$)/,
        E = /#\((.+?)\)/g,
        I = CKEDITOR.dom.walker.bookmark(0, 1),
        G = CKEDITOR.dom.walker.whitespaces(1);
      CKEDITOR.style = function(a, b) {
        if("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
        var c = a.attributes;
        c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
        b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles,
          b));
        c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*";
        this.type = a.type || (C[c] ? CKEDITOR.STYLE_BLOCK : D[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
        "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
        this._ = {
          definition: a
        }
      };
      CKEDITOR.style.prototype = {
        apply: function(a) {
          if(a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection());
          if(this.checkApplicable(a.elementPath(), a)) {
            var b = this._.enterMode;
            b || (this._.enterMode = a.activeEnterMode);
            x.call(this, a.getSelection(), 0, a);
            this._.enterMode = b
          }
        },
        remove: function(a) {
          if(a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection(), 1);
          if(this.checkApplicable(a.elementPath(), a)) {
            var b = this._.enterMode;
            b || (this._.enterMode = a.activeEnterMode);
            x.call(this, a.getSelection(), 1, a);
            this._.enterMode = b
          }
        },
        applyToRange: function(a) {
          this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? l : null;
          return this.applyToRange(a)
        },
        removeFromRange: function(a) {
          this.removeFromRange =
            this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? k : this.type == CKEDITOR.STYLE_OBJECT ? h : null;
          return this.removeFromRange(a)
        },
        applyToObject: function(a) {
          w(a, this)
        },
        checkActive: function(a, b) {
          switch(this.type) {
            case CKEDITOR.STYLE_BLOCK:
              return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
            case CKEDITOR.STYLE_OBJECT:
            case CKEDITOR.STYLE_INLINE:
              for(var c = a.elements, d = 0, g; d < c.length; d++)
                if(g = c[d], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) {
                  if(this.type == CKEDITOR.STYLE_OBJECT) {
                    var f =
                      g.getName();
                    if(!("string" == typeof this.element ? f == this.element : f in this.element)) continue
                  }
                  if(this.checkElementRemovable(g, !0, b)) return !0
                }
          }
          return !1
        },
        checkApplicable: function(a, b, c) {
          b && b instanceof CKEDITOR.filter && (c = b);
          if(c && !c.check(this)) return !1;
          switch(this.type) {
            case CKEDITOR.STYLE_OBJECT:
              return !!a.contains(this.element);
            case CKEDITOR.STYLE_BLOCK:
              return !!a.blockLimit.getDtd()[this.element]
          }
          return !0
        },
        checkElementMatch: function(a, b) {
          var c = this._.definition;
          if(!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
          var d = a.getName();
          if("string" == typeof this.element ? d == this.element : d in this.element) {
            if(!b && !a.hasAttributes()) return !0;
            if(d = c._AC) c = d;
            else {
              var d = {},
                g = 0,
                f = c.attributes;
              if(f)
                for(var e in f) g++, d[e] = f[e];
              if(e = CKEDITOR.style.getStyleText(c)) d.style || g++, d.style = e;
              d._length = g;
              c = c._AC = d
            }
            if(c._length) {
              for(var m in c)
                if("_length" != m)
                  if(d = a.getAttribute(m) || "", "style" == m ? y(c[m], d) : c[m] == d) {
                    if(!b) return !0
                  } else if(b) return !1;
              if(b) return !0
            } else return !0
          }
          return !1
        },
        checkElementRemovable: function(a, b, c) {
          if(this.checkElementMatch(a,
              b, c)) return !0;
          if(b = q(this)[a.getName()]) {
            var d;
            if(!(b = b.attributes)) return !0;
            for(c = 0; c < b.length; c++)
              if(d = b[c][0], d = a.getAttribute(d)) {
                var g = b[c][1];
                if(null === g) return !0;
                if("string" == typeof g) {
                  if(d == g) return !0
                } else if(g.test(d)) return !0
              }
          }
          return !1
        },
        buildPreview: function(a) {
          var b = this._.definition,
            c = [],
            d = b.element;
          "bdo" == d && (d = "span");
          var c = ["\x3c", d],
            g = b.attributes;
          if(g)
            for(var f in g) c.push(" ", f, '\x3d"', g[f], '"');
          (g = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', g, '"');
          c.push("\x3e", a || b.name,
            "\x3c/", d, "\x3e");
          return c.join("")
        },
        getDefinition: function() {
          return this._.definition
        }
      };
      CKEDITOR.style.getStyleText = function(a) {
        var b = a._ST;
        if(b) return b;
        var b = a.styles,
          c = a.attributes && a.attributes.style || "",
          d = "";
        c.length && (c = c.replace(H, ";"));
        for(var g in b) {
          var f = b[g],
            e = (g + ":" + f).replace(H, ";");
          "inherit" == f ? d += e : c += e
        }
        c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
        return a._ST = c + d
      };
      CKEDITOR.style.customHandlers = {};
      CKEDITOR.style.addCustomHandler = function(a) {
        var b = function(a) {
          this._ = {
            definition: a
          };
          this.setup && this.setup(a)
        };
        b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
          assignedTo: CKEDITOR.STYLE_OBJECT
        }, a, !0);
        return this.customHandlers[a.type] = b
      };
      var J = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
        M = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    }(), CKEDITOR.styleCommand = function(a, e) {
      this.requiredContent = this.allowedContent = this.style = a;
      CKEDITOR.tools.extend(this, e, !0)
    },
    CKEDITOR.styleCommand.prototype.exec = function(a) {
      a.focus();
      this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
    }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(a, e, b) {
      CKEDITOR.stylesSet.addExternal(a, e, "");
      CKEDITOR.stylesSet.load(a, b)
    }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      attachStyleStateChange: function(a,
        e) {
        var b = this._.styleStateChangeCallbacks;
        b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
          for(var f = 0; f < b.length; f++) {
            var e = b[f],
              h = e.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
            e.fn.call(this, h)
          }
        }));
        b.push({
          style: a,
          fn: e
        })
      },
      applyStyle: function(a) {
        a.apply(this)
      },
      removeStyle: function(a) {
        a.remove(this)
      },
      getStylesSet: function(a) {
        if(this._.stylesDefinitions) a(this._.stylesDefinitions);
        else {
          var e = this,
            b = e.config.stylesCombo_stylesSet || e.config.stylesSet;
          if(!1 === b) a(null);
          else if(b instanceof Array) e._.stylesDefinitions = b, a(b);
          else {
            b || (b = "default");
            var b = b.split(":"),
              c = b[0];
            CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
            CKEDITOR.stylesSet.load(c, function(b) {
              e._.stylesDefinitions = b[c];
              a(e._.stylesDefinitions)
            })
          }
        }
      }
    }), CKEDITOR.dom.comment = function(a, e) {
      "string" == typeof a && (a = (e ? e.$ : document).createComment(a));
      CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
      type: CKEDITOR.NODE_COMMENT,
      getOuterHtml: function() {
        return "\x3c!--" + this.$.nodeValue + "--\x3e"
      }
    }), "use strict",
    function() {
      var a = {},
        e = {},
        b;
      for(b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
      for(b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (e[b] = 1);
      CKEDITOR.dom.elementPath = function(b, f) {
        var l = null,
          h = null,
          d = [],
          k = b,
          m;
        f = f || b.getDocument().getBody();
        k || (k = f);
        do
          if(k.type == CKEDITOR.NODE_ELEMENT) {
            d.push(k);
            if(!this.lastElement && (this.lastElement = k, k.is(CKEDITOR.dtd.$object) ||
                "false" == k.getAttribute("contenteditable"))) continue;
            if(k.equals(f)) break;
            if(!h && (m = k.getName(), "true" == k.getAttribute("contenteditable") ? h = k : !l && e[m] && (l = k), a[m])) {
              if(m = !l && "div" == m) {
                a: {
                  m = k.getChildren();
                  for(var g = 0, n = m.count(); g < n; g++) {
                    var p = m.getItem(g);
                    if(p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) {
                      m = !0;
                      break a
                    }
                  }
                  m = !1
                }
                m = !m
              }
              m ? l = k : h = k
            }
          }
        while(k = k.getParent());
        h || (h = f);
        this.block = l;
        this.blockLimit = h;
        this.root = f;
        this.elements = d
      }
    }(), CKEDITOR.dom.elementPath.prototype = {
      compare: function(a) {
        var e =
          this.elements;
        a = a && a.elements;
        if(!a || e.length != a.length) return !1;
        for(var b = 0; b < e.length; b++)
          if(!e[b].equals(a[b])) return !1;
        return !0
      },
      contains: function(a, e, b) {
        var c = 0,
          f;
        "string" == typeof a && (f = function(b) {
          return b.getName() == a
        });
        a instanceof CKEDITOR.dom.element ? f = function(b) {
          return b.equals(a)
        } : CKEDITOR.tools.isArray(a) ? f = function(b) {
          return -1 < CKEDITOR.tools.indexOf(a, b.getName())
        } : "function" == typeof a ? f = a : "object" == typeof a && (f = function(b) {
          return b.getName() in a
        });
        var l = this.elements,
          h = l.length;
        e &&
          (b ? c += 1 : --h);
        b && (l = Array.prototype.slice.call(l, 0), l.reverse());
        for(; c < h; c++)
          if(f(l[c])) return l[c];
        return null
      },
      isContextFor: function(a) {
        var e;
        return a in CKEDITOR.dtd.$block ? (e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!e.getDtd()[a]) : !0
      },
      direction: function() {
        return(this.block || this.blockLimit || this.root).getDirection(1)
      }
    }, CKEDITOR.dom.text = function(a, e) {
      "string" == typeof a && (a = (e ? e.$ : document).createTextNode(a));
      this.$ = a
    }, CKEDITOR.dom.text.prototype =
    new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
      type: CKEDITOR.NODE_TEXT,
      getLength: function() {
        return this.$.nodeValue.length
      },
      getText: function() {
        return this.$.nodeValue
      },
      setText: function(a) {
        this.$.nodeValue = a
      },
      split: function(a) {
        var e = this.$.parentNode,
          b = e.childNodes.length,
          c = this.getLength(),
          f = this.getDocument(),
          l = new CKEDITOR.dom.text(this.$.splitText(a), f);
        e.childNodes.length == b && (a >= c ? (l = f.createText(""), l.insertAfter(this)) : (a = f.createText(""), a.insertAfter(l), a.remove()));
        return l
      },
      substring: function(a, e) {
        return "number" != typeof e ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, e)
      }
    }),
    function() {
      function a(a, c, f) {
        var e = a.serializable,
          h = c[f ? "endContainer" : "startContainer"],
          d = f ? "endOffset" : "startOffset",
          k = e ? c.document.getById(a.startNode) : a.startNode;
        a = e ? c.document.getById(a.endNode) : a.endNode;
        h.equals(k.getPrevious()) ? (c.startOffset = c.startOffset - h.getLength() - a.getPrevious().getLength(), h = a.getNext()) : h.equals(a.getPrevious()) && (c.startOffset -= h.getLength(),
          h = a.getNext());
        h.equals(k.getParent()) && c[d]++;
        h.equals(a.getParent()) && c[d]++;
        c[f ? "endContainer" : "startContainer"] = h;
        return c
      }
      CKEDITOR.dom.rangeList = function(a) {
        if(a instanceof CKEDITOR.dom.rangeList) return a;
        a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
        return CKEDITOR.tools.extend(a, e)
      };
      var e = {
        createIterator: function() {
          var a = this,
            c = CKEDITOR.dom.walker.bookmark(),
            f = [],
            e;
          return {
            getNextRange: function(h) {
              e = void 0 === e ? 0 : e + 1;
              var d = a[e];
              if(d && 1 < a.length) {
                if(!e)
                  for(var k = a.length - 1; 0 <= k; k--) f.unshift(a[k].createBookmark(!0));
                if(h)
                  for(var m = 0; a[e + m + 1];) {
                    var g = d.document;
                    h = 0;
                    k = g.getById(f[m].endNode);
                    for(g = g.getById(f[m + 1].startNode);;) {
                      k = k.getNextSourceNode(!1);
                      if(g.equals(k)) h = 1;
                      else if(c(k) || k.type == CKEDITOR.NODE_ELEMENT && k.isBlockBoundary()) continue;
                      break
                    }
                    if(!h) break;
                    m++
                  }
                for(d.moveToBookmark(f.shift()); m--;) k = a[++e], k.moveToBookmark(f.shift()), d.setEnd(k.endContainer, k.endOffset)
              }
              return d
            }
          }
        },
        createBookmarks: function(b) {
          for(var c = [], f, e = 0; e < this.length; e++) {
            c.push(f = this[e].createBookmark(b, !0));
            for(var h = e + 1; h < this.length; h++) this[h] =
              a(f, this[h]), this[h] = a(f, this[h], !0)
          }
          return c
        },
        createBookmarks2: function(a) {
          for(var c = [], f = 0; f < this.length; f++) c.push(this[f].createBookmark2(a));
          return c
        },
        moveToBookmarks: function(a) {
          for(var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c])
        }
      }
    }(),
    function() {
      function a() {
        return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
      }

      function e(b) {
        var c = CKEDITOR.skin["ua_" + b],
          d = CKEDITOR.env;
        if(c)
          for(var c = c.split(",").sort(function(a, b) {
                return a > b ? -1 : 1
              }), f = 0,
              e; f < c.length; f++)
            if(e = c[f], d.ie && (e.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == e) && (e = "ie"), d[e]) {
              b += "_" + c[f];
              break
            }
        return CKEDITOR.getUrl(a() + b + ".css")
      }

      function b(a, b) {
        l[a] || (CKEDITOR.document.appendStyleSheet(e(a)), l[a] = 1);
        b && b()
      }

      function c(a) {
        var b = a.getById(h);
        b || (b = a.getHead().append("style"), b.setAttribute("id", h), b.setAttribute("type", "text/css"));
        return b
      }

      function f(a, b, c) {
        var d, f, e;
        if(CKEDITOR.env.webkit)
          for(b = b.split("}").slice(0, -1), f = 0; f < b.length; f++) b[f] = b[f].split("{");
        for(var k =
            0; k < a.length; k++)
          if(CKEDITOR.env.webkit)
            for(f = 0; f < b.length; f++) {
              e = b[f][1];
              for(d = 0; d < c.length; d++) e = e.replace(c[d][0], c[d][1]);
              a[k].$.sheet.addRule(b[f][0], e)
            } else {
              e = b;
              for(d = 0; d < c.length; d++) e = e.replace(c[d][0], c[d][1]);
              CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[k].$.styleSheet.cssText += e : a[k].$.innerHTML += e
            }
      }
      var l = {};
      CKEDITOR.skin = {
        path: a,
        loadPart: function(c, d) {
          CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
            b(c, d)
          }) : b(c, d)
        },
        getPath: function(a) {
          return CKEDITOR.getUrl(e(a))
        },
        icons: {},
        addIcon: function(a, b, c, d) {
          a = a.toLowerCase();
          this.icons[a] || (this.icons[a] = {
            path: b,
            offset: c || 0,
            bgsize: d || "16px"
          })
        },
        getIconStyle: function(a, b, c, d, f) {
          var e;
          a && (a = a.toLowerCase(), b && (e = this.icons[a + "-rtl"]), e || (e = this.icons[a]));
          a = c || e && e.path || "";
          d = d || e && e.offset;
          f = f || e && e.bgsize || "16px";
          a && (a = a.replace(/'/g, "\\'"));
          return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + f + ";"
        }
      };
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        getUiColor: function() {
          return this.uiColor
        },
        setUiColor: function(a) {
          var b = c(CKEDITOR.document);
          return(this.setUiColor = function(a) {
            this.uiColor = a;
            var c = CKEDITOR.skin.chameleon,
              e = "",
              m = "";
            "function" == typeof c && (e = c(this, "editor"), m = c(this, "panel"));
            a = [
              [k, a]
            ];
            f([b], e, a);
            f(d, m, a)
          }).call(this, a)
        }
      });
      var h = "cke_ui_color",
        d = [],
        k = /\$color/g;
      CKEDITOR.on("instanceLoaded", function(a) {
        if(!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
          var b = a.editor;
          a = function(a) {
            a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
            if(!a.getById("cke_ui_color")) {
              a = c(a);
              d.push(a);
              var e = b.getUiColor();
              e && f([a], CKEDITOR.skin.chameleon(b, "panel"), [
                [k, e]
              ])
            }
          };
          b.on("panelShow", a);
          b.on("menuShow", a);
          b.config.uiColor && b.setUiColor(b.config.uiColor)
        }
      })
    }(),
    function() {
      if(CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
      else {
        var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
        a.appendTo(CKEDITOR.document.getHead());
        try {
          var e = a.getComputedStyle("border-top-color"),
            b = a.getComputedStyle("border-right-color");
          CKEDITOR.env.hc = !(!e || e != b)
        } catch(c) {
          CKEDITOR.env.hc = !1
        }
        a.remove()
      }
      CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
      CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
      CKEDITOR.status = "loaded";
      CKEDITOR.fireOnce("loaded");
      if(a = CKEDITOR._.pending)
        for(delete CKEDITOR._.pending, e = 0; e < a.length; e++) CKEDITOR.editor.prototype.constructor.apply(a[e][0], a[e][1]), CKEDITOR.add(a[e][0])
    }(), CKEDITOR.skin.name =
    "moono-lisa", CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8", CKEDITOR.skin.chameleon = function() {
      var a = function() {
          return function(a, c) {
            for(var f = a.match(/[^#]./g), e = 0; 3 > e; e++) {
              var h = e,
                d;
              d = parseInt(f[e], 16);
              d = ("0" + (0 > c ? 0 | d * (1 + c) : 0 | d + (255 - d) * c).toString(16)).slice(-2);
              f[h] = d
            }
            return "#" + f.join("")
          }
        }(),
        e = {
          editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
          panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
      return function(b, c) {
        var f = a(b.uiColor, .4),
          f = {
            id: "." + b.id,
            defaultBorder: a(f, -.2),
            toolbarElementsBorder: a(f, -.25),
            defaultBackground: f,
            lightBackground: a(f, .8),
            darkBackground: a(f, -.15),
            ckeButtonOn: a(f, .4),
            ckeResizer: a(f, -.4),
            ckeColorauto: a(f, .8),
            dialogBody: a(f, .7),
            dialogTab: a(f, .65),
            dialogTabSelected: "#FFF",
            dialogTabSelectedBorder: "#FFF",
            elementsPathColor: a(f, -.6),
            menubuttonHover: a(f, .1),
            menubuttonIcon: a(f, .5),
            menubuttonIconHover: a(f, .3)
          };
        return e[c].output(f).replace(/\[/g, "{").replace(/\]/g, "}")
      }
    }(),
    CKEDITOR.plugins.add("dialogui", {
      onLoad: function() {
        var a = function(a) {
            this._ || (this._ = {});
            this._["default"] = this._.initValue = a["default"] || "";
            this._.required = a.required || !1;
            for(var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]);
            b.push(!0);
            CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
            return this._
          },
          e = {
            build: function(a, b, c) {
              return new CKEDITOR.ui.dialog.textInput(a, b, c)
            }
          },
          b = {
            build: function(a, b, c) {
              return new CKEDITOR.ui.dialog[b.type](a, b, c)
            }
          },
          c = {
            isChanged: function() {
              return this.getValue() !=
                this.getInitValue()
            },
            reset: function(a) {
              this.setValue(this.getInitValue(), a)
            },
            setInitValue: function() {
              this._.initValue = this.getValue()
            },
            resetInitValue: function() {
              this._.initValue = this._["default"]
            },
            getInitValue: function() {
              return this._.initValue
            }
          },
          f = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
            onChange: function(a, b) {
              this._.domOnChangeRegistered || (a.on("load", function() {
                this.getInputElement().on("change", function() {
                    a.parts.dialog.isVisible() && this.fire("change", {
                      value: this.getValue()
                    })
                  },
                  this)
              }, this), this._.domOnChangeRegistered = !0);
              this.on("change", b)
            }
          }, !0),
          l = /^on([A-Z]\w+)/,
          h = function(a) {
            for(var b in a)(l.test(b) || "title" == b || "type" == b) && delete a[b];
            return a
          },
          d = function(a) {
            a = a.data.getKeystroke();
            a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
          };
        CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
          labeledElement: function(b, c, d, e) {
            if(!(4 > arguments.length)) {
              var f = a.call(this, c);
              f.labelId = CKEDITOR.tools.getNextId() +
                "_label";
              this._.children = [];
              var h = {
                role: c.role || "presentation"
              };
              c.includeLabel && (h["aria-labelledby"] = f.labelId);
              CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "div", null, h, function() {
                var a = [],
                  d = c.required ? " cke_required" : "";
                "horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" ', ' id\x3d"' + f.labelId + '"', f.inputId ? ' for\x3d"' + f.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                  c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', e.call(this, b, c), "\x3c/div\x3e") : (d = {
                  type: "hbox",
                  widths: c.widths,
                  padding: 0,
                  children: [{
                    type: "html",
                    html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" id\x3d"' + f.labelId + '" for\x3d"' + f.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e"
                  }, {
                    type: "html",
                    html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
                      '"' : "") + "\x3e" + e.call(this, b, c) + "\x3c/span\x3e"
                  }]
                }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, a));
                return a.join("")
              })
            }
          },
          textInput: function(b, c, g) {
            if(!(3 > arguments.length)) {
              a.call(this, c);
              var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                e = {
                  "class": "cke_dialog_ui_input_" + c.type,
                  id: f,
                  type: c.type
                };
              c.validate && (this.validate = c.validate);
              c.maxLength && (e.maxlength = c.maxLength);
              c.size && (e.size = c.size);
              c.inputStyle && (e.style = c.inputStyle);
              var h = this,
                l = !1;
              b.on("load", function() {
                h.getInputElement().on("keydown",
                  function(a) {
                    13 == a.data.getKeystroke() && (l = !0)
                  });
                h.getInputElement().on("keyup", function(a) {
                  13 == a.data.getKeystroke() && l && (b.getButton("ok") && setTimeout(function() {
                    b.getButton("ok").click()
                  }, 0), l = !1);
                  h.bidi && d.call(h, a)
                }, null, null, 1E3)
              });
              CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function() {
                var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"'];
                c.width && a.push('style\x3d"width:' + c.width + '" ');
                a.push("\x3e\x3cinput ");
                e["aria-labelledby"] = this._.labelId;
                this._.required &&
                  (e["aria-required"] = this._.required);
                for(var b in e) a.push(b + '\x3d"' + e[b] + '" ');
                a.push(" /\x3e\x3c/div\x3e");
                return a.join("")
              })
            }
          },
          textarea: function(b, c, g) {
            if(!(3 > arguments.length)) {
              a.call(this, c);
              var e = this,
                f = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                h = {};
              c.validate && (this.validate = c.validate);
              h.rows = c.rows || 5;
              h.cols = c.cols || 20;
              h["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || "");
              "undefined" != typeof c.inputStyle && (h.style = c.inputStyle);
              c.dir && (h.dir = c.dir);
              if(e.bidi) b.on("load",
                function() {
                  e.getInputElement().on("keyup", d)
                }, e);
              CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function() {
                h["aria-labelledby"] = this._.labelId;
                this._.required && (h["aria-required"] = this._.required);
                var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', f, '" '],
                  b;
                for(b in h) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(h[b]) + '" ');
                a.push("\x3e", CKEDITOR.tools.htmlEncode(e._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                return a.join("")
              })
            }
          },
          checkbox: function(b,
            c, d) {
            if(!(3 > arguments.length)) {
              var e = a.call(this, c, {
                "default": !!c["default"]
              });
              c.validate && (this.validate = c.validate);
              CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "span", null, null, function() {
                var a = CKEDITOR.tools.extend({}, c, {
                    id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                  }, !0),
                  d = [],
                  g = CKEDITOR.tools.getNextId() + "_label",
                  f = {
                    "class": "cke_dialog_ui_checkbox_input",
                    type: "checkbox",
                    "aria-labelledby": g
                  };
                h(a);
                c["default"] && (f.checked = "checked");
                "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, f);
                d.push(' \x3clabel id\x3d"', g, '" for\x3d"', f.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e");
                return d.join("")
              })
            }
          },
          radio: function(b, c, d) {
            if(!(3 > arguments.length)) {
              a.call(this, c);
              this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]);
              c.validate && (this.validate = c.validate);
              var e = [],
                f = this;
              c.role = "radiogroup";
              c.includeLabel = !0;
              CKEDITOR.ui.dialog.labeledElement.call(this,
                b, c, d,
                function() {
                  for(var a = [], d = [], g = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < c.items.length; l++) {
                    var v = c.items[l],
                      w = void 0 !== v[2] ? v[2] : v[0],
                      B = void 0 !== v[1] ? v[1] : v[0],
                      q = CKEDITOR.tools.getNextId() + "_radio_input",
                      z = q + "_label",
                      q = CKEDITOR.tools.extend({}, c, {
                        id: q,
                        title: null,
                        type: null
                      }, !0),
                      w = CKEDITOR.tools.extend({}, q, {
                        title: w
                      }, !0),
                      y = {
                        type: "radio",
                        "class": "cke_dialog_ui_radio_input",
                        name: g,
                        value: B,
                        "aria-labelledby": z
                      },
                      x = [];
                    f._["default"] == B && (y.checked = "checked");
                    h(q);
                    h(w);
                    "undefined" != typeof q.inputStyle &&
                      (q.style = q.inputStyle);
                    q.keyboardFocusable = !0;
                    e.push(new CKEDITOR.ui.dialog.uiElement(b, q, x, "input", null, y));
                    x.push(" ");
                    new CKEDITOR.ui.dialog.uiElement(b, w, x, "label", null, {
                      id: z,
                      "for": y.id
                    }, v[0]);
                    a.push(x.join(""))
                  }
                  new CKEDITOR.ui.dialog.hbox(b, e, a, d);
                  return d.join("")
                });
              this._.children = e
            }
          },
          button: function(b, c, d) {
            if(arguments.length) {
              "function" == typeof c && (c = c(b.getParentEditor()));
              a.call(this, c, {
                disabled: c.disabled || !1
              });
              CKEDITOR.event.implementOn(this);
              var e = this;
              b.on("load", function() {
                var a = this.getElement();
                (function() {
                  a.on("click", function(a) {
                    e.click();
                    a.data.preventDefault()
                  });
                  a.on("keydown", function(a) {
                    a.data.getKeystroke() in {
                      32: 1
                    } && (e.click(), a.data.preventDefault())
                  })
                })();
                a.unselectable()
              }, this);
              var f = CKEDITOR.tools.extend({}, c);
              delete f.style;
              var h = CKEDITOR.tools.getNextId() + "_label";
              CKEDITOR.ui.dialog.uiElement.call(this, b, f, d, "a", null, {
                  style: c.style,
                  href: "javascript:void(0)",
                  title: c.label,
                  hidefocus: "true",
                  "class": c["class"],
                  role: "button",
                  "aria-labelledby": h
                }, '\x3cspan id\x3d"' + h + '" class\x3d"cke_dialog_ui_button"\x3e' +
                CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
            }
          },
          select: function(b, c, d) {
            if(!(3 > arguments.length)) {
              var e = a.call(this, c);
              c.validate && (this.validate = c.validate);
              e.inputId = CKEDITOR.tools.getNextId() + "_select";
              CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                var a = CKEDITOR.tools.extend({}, c, {
                    id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                  }, !0),
                  d = [],
                  g = [],
                  f = {
                    id: e.inputId,
                    "class": "cke_dialog_ui_input_select",
                    "aria-labelledby": this._.labelId
                  };
                d.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                  c.type, '" role\x3d"presentation"');
                c.width && d.push('style\x3d"width:' + c.width + '" ');
                d.push("\x3e");
                void 0 !== c.size && (f.size = c.size);
                void 0 !== c.multiple && (f.multiple = c.multiple);
                h(a);
                for(var l = 0, v; l < c.items.length && (v = c.items[l]); l++) g.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== v[1] ? v[1] : v[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(v[0]));
                "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                e.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null,
                  f, g.join(""));
                d.push("\x3c/div\x3e");
                return d.join("")
              })
            }
          },
          file: function(b, c, d) {
            if(!(3 > arguments.length)) {
              void 0 === c["default"] && (c["default"] = "");
              var e = CKEDITOR.tools.extend(a.call(this, c), {
                definition: c,
                buttons: []
              });
              c.validate && (this.validate = c.validate);
              b.on("load", function() {
                CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")
              });
              CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                  e.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void('
                ];
                a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                a.push(')"\x3e\x3c/iframe\x3e');
                return a.join("")
              })
            }
          },
          fileButton: function(b, c, d) {
            var e = this;
            if(!(3 > arguments.length)) {
              a.call(this, c);
              c.validate && (this.validate = c.validate);
              var f = CKEDITOR.tools.extend({}, c),
                h = f.onClick;
              f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button";
              f.onClick = function(a) {
                var d =
                  c["for"];
                h && !1 === h.call(this, a) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
              };
              b.on("load", function() {
                b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(e)
              });
              CKEDITOR.ui.dialog.button.call(this, b, f, d)
            }
          },
          html: function() {
            var a = /^\s*<[\w:]+\s+([^>]*)?>/,
              b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
              c = /\/$/;
            return function(d, e, f) {
              if(!(3 > arguments.length)) {
                var h = [],
                  l = e.html;
                "\x3c" != l.charAt(0) && (l = "\x3cspan\x3e" + l + "\x3c/span\x3e");
                var r = e.focus;
                if(r) {
                  var v = this.focus;
                  this.focus = function() {
                    ("function" ==
                      typeof r ? r : v).call(this);
                    this.fire("focus")
                  };
                  e.isFocusable && (this.isFocusable = this.isFocusable);
                  this.keyboardFocusable = !0
                }
                CKEDITOR.ui.dialog.uiElement.call(this, d, e, h, "span", null, null, "");
                h = h.join("").match(a);
                l = l.match(b) || ["", "", ""];
                c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]);
                f.push([l[1], " ", h[1] || "", l[2]].join(""))
              }
            }
          }(),
          fieldset: function(a, b, c, d, e) {
            var f = e.label;
            this._ = {
              children: b
            };
            CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function() {
              var a = [];
              f && a.push("\x3clegend" +
                (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + f + "\x3c/legend\x3e");
              for(var b = 0; b < c.length; b++) a.push(c[b]);
              return a.join("")
            })
          }
        }, !0);
        CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
        CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          setLabel: function(a) {
            var b = CKEDITOR.document.getById(this._.labelId);
            1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
            return this
          },
          getLabel: function() {
            var a =
              CKEDITOR.document.getById(this._.labelId);
            return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText()
          },
          eventProcessors: f
        }, !0);
        CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          click: function() {
            return this._.disabled ? !1 : this.fire("click", {
              dialog: this._.dialog
            })
          },
          enable: function() {
            this._.disabled = !1;
            var a = this.getElement();
            a && a.removeClass("cke_disabled")
          },
          disable: function() {
            this._.disabled = !0;
            this.getElement().addClass("cke_disabled")
          },
          isVisible: function() {
            return this.getElement().getFirst().isVisible()
          },
          isEnabled: function() {
            return !this._.disabled
          },
          eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
            onClick: function(a, b) {
              this.on("click", function() {
                b.apply(this, arguments)
              })
            }
          }, !0),
          accessKeyUp: function() {
            this.click()
          },
          accessKeyDown: function() {
            this.focus()
          },
          keyboardFocusable: !0
        }, !0);
        CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
          getInputElement: function() {
            return CKEDITOR.document.getById(this._.inputId)
          },
          focus: function() {
            var a = this.selectParentTab();
            setTimeout(function() {
              var b = a.getInputElement();
              b && b.$.focus()
            }, 0)
          },
          select: function() {
            var a = this.selectParentTab();
            setTimeout(function() {
              var b = a.getInputElement();
              b && (b.$.focus(), b.$.select())
            }, 0)
          },
          accessKeyUp: function() {
            this.select()
          },
          setValue: function(a) {
            if(this.bidi) {
              var b = a && a.charAt(0);
              (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1));
              this.setDirectionMarker(b)
            }
            a || (a = "");
            return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
          },
          getValue: function() {
            var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
            if(this.bidi && a) {
              var b = this.getDirectionMarker();
              b && (a = ("ltr" == b ? "‪" : "‫") + a)
            }
            return a
          },
          setDirectionMarker: function(a) {
            var b = this.getInputElement();
            a ? b.setAttributes({
              dir: a,
              "data-cke-dir-marker": a
            }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
          },
          getDirectionMarker: function() {
            return this.getInputElement().data("cke-dir-marker")
          },
          keyboardFocusable: !0
        }, c, !0);
        CKEDITOR.ui.dialog.textarea.prototype =
          new CKEDITOR.ui.dialog.textInput;
        CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
          getInputElement: function() {
            return this._.select.getElement()
          },
          add: function(a, b, c) {
            var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
              e = this.getInputElement().$;
            d.$.text = a;
            d.$.value = void 0 === b || null === b ? a : b;
            void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(d.$) : e.add(d.$, null) : e.add(d.$, c);
            return this
          },
          remove: function(a) {
            this.getInputElement().$.remove(a);
            return this
          },
          clear: function() {
            for(var a = this.getInputElement().$; 0 < a.length;) a.remove(0);
            return this
          },
          keyboardFocusable: !0
        }, c, !0);
        CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          getInputElement: function() {
            return this._.checkbox.getElement()
          },
          setValue: function(a, b) {
            this.getInputElement().$.checked = a;
            !b && this.fire("change", {
              value: a
            })
          },
          getValue: function() {
            return this.getInputElement().$.checked
          },
          accessKeyUp: function() {
            this.setValue(!this.getValue())
          },
          eventProcessors: {
            onChange: function(a,
              b) {
              if(!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return f.onChange.apply(this, arguments);
              a.on("load", function() {
                var a = this._.checkbox.getElement();
                a.on("propertychange", function(b) {
                  b = b.data.$;
                  "checked" == b.propertyName && this.fire("change", {
                    value: a.$.checked
                  })
                }, this)
              }, this);
              this.on("change", b);
              return null
            }
          },
          keyboardFocusable: !0
        }, c, !0);
        CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          setValue: function(a, b) {
            for(var c = this._.children, d, e = 0; e < c.length && (d = c[e]); e++) d.getElement().$.checked =
              d.getValue() == a;
            !b && this.fire("change", {
              value: a
            })
          },
          getValue: function() {
            for(var a = this._.children, b = 0; b < a.length; b++)
              if(a[b].getElement().$.checked) return a[b].getValue();
            return null
          },
          accessKeyUp: function() {
            var a = this._.children,
              b;
            for(b = 0; b < a.length; b++)
              if(a[b].getElement().$.checked) {
                a[b].getElement().focus();
                return
              }
            a[0].getElement().focus()
          },
          eventProcessors: {
            onChange: function(a, b) {
              if(!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return f.onChange.apply(this, arguments);
              a.on("load", function() {
                for(var a =
                    this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                  a = a.data.$;
                  "checked" == a.propertyName && this.$.checked && b.fire("change", {
                    value: this.getAttribute("value")
                  })
                })
              }, this);
              this.on("change", b);
              return null
            }
          }
        }, c, !0);
        CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
          getInputElement: function() {
            var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
            return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
              this.getElement()
          },
          submit: function() {
            this.getInputElement().getParent().$.submit();
            return this
          },
          getAction: function() {
            return this.getInputElement().getParent().$.action
          },
          registerEvents: function(a) {
            var b = /^on([A-Z]\w+)/,
              c, d = function(a, b, c, d) {
                a.on("formLoaded", function() {
                  a.getInputElement().on(c, d, a)
                })
              },
              e;
            for(e in a)
              if(c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
            return this
          },
          reset: function() {
            function a() {
              c.$.open();
              var k = "";
              d.size && (k = d.size - (CKEDITOR.env.ie ? 7 : 0));
              var w = b.frameId + "_input";
              c.$.write(['\x3chtml dir\x3d"' + l + '" lang\x3d"' + r + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + l + '" lang\x3d"' + r + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', w, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label),
                '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', w, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < k ? k : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}", "\x3c/script\x3e"
              ].join(""));
              c.$.close();
              for(k = 0; k < e.length; k++) e[k].enable()
            }
            var b = this._,
              c = CKEDITOR.document.getById(b.frameId).getFrameDocument(),
              d = b.definition,
              e = b.buttons,
              f = this.formLoadedNumber,
              h = this.formUnloadNumber,
              l = b.dialog._.editor.lang.dir,
              r = b.dialog._.editor.langCode;
            f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
              this.fire("formLoaded")
            }, this), h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
              this.getInputElement().clearCustomData()
            }, this), this.getDialog()._.editor.on("destroy", function() {
              CKEDITOR.tools.removeFunction(f);
              CKEDITOR.tools.removeFunction(h)
            }));
            CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
          },
          getValue: function() {
            return this.getInputElement().$.value || ""
          },
          setInitValue: function() {
            this._.initValue = ""
          },
          eventProcessors: {
            onChange: function(a, b) {
              this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                this.getInputElement().on("change", function() {
                  this.fire("change", {
                    value: this.getValue()
                  })
                }, this)
              }, this), this._.domOnChangeRegistered = !0);
              this.on("change", b)
            }
          },
          keyboardFocusable: !0
        }, !0);
        CKEDITOR.ui.dialog.fileButton.prototype =
          new CKEDITOR.ui.dialog.button;
        CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
        CKEDITOR.dialog.addUIElement("text", e);
        CKEDITOR.dialog.addUIElement("password", e);
        CKEDITOR.dialog.addUIElement("textarea", b);
        CKEDITOR.dialog.addUIElement("checkbox", b);
        CKEDITOR.dialog.addUIElement("radio", b);
        CKEDITOR.dialog.addUIElement("button", b);
        CKEDITOR.dialog.addUIElement("select", b);
        CKEDITOR.dialog.addUIElement("file", b);
        CKEDITOR.dialog.addUIElement("fileButton", b);
        CKEDITOR.dialog.addUIElement("html",
          b);
        CKEDITOR.dialog.addUIElement("fieldset", {
          build: function(a, b, c) {
            for(var d = b.children, e, f = [], h = [], l = 0; l < d.length && (e = d[l]); l++) {
              var r = [];
              f.push(r);
              h.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, r))
            }
            return new CKEDITOR.ui.dialog[b.type](a, h, f, c, b)
          }
        })
      }
    }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2,
    function() {
      function a() {
        for(var a = this._.tabIdList.length,
            b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
          if(this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
        return null
      }

      function e() {
        for(var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
          if(this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
        return null
      }

      function b(a, b) {
        for(var c = a.$.getElementsByTagName("input"), d = 0, g = c.length; d < g; d++) {
          var e = new CKEDITOR.dom.element(c[d]);
          "text" == e.getAttribute("type").toLowerCase() && (b ? (e.setAttribute("value", e.getCustomData("fake_value") || ""), e.removeCustomData("fake_value")) : (e.setCustomData("fake_value", e.getAttribute("value")), e.setAttribute("value", "")))
        }
      }

      function c(a, b) {
        var c = this.getInputElement();
        c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
        a || (this.select ? this.select() : this.focus());
        b && alert(b);
        this.fire("validated", {
          valid: a,
          msg: b
        })
      }

      function f() {
        var a = this.getInputElement();
        a && a.removeAttribute("aria-invalid")
      }

      function l(a) {
        var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", u).output({
            id: CKEDITOR.tools.getNextNumber(),
            editorId: a.id,
            langDir: a.lang.dir,
            langCode: a.langCode,
            editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
            closeTitle: a.lang.common.close,
            hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
          })),
          c = b.getChild([0, 0, 0, 0, 0]),
          d = c.getChild(0),
          g = c.getChild(1);
        a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
        !CKEDITOR.env.ie || CKEDITOR.env.quirks ||
          CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
        d.unselectable();
        g.unselectable();
        return {
          element: b,
          parts: {
            dialog: b.getChild(0),
            title: d,
            close: g,
            tabs: c.getChild(2),
            contents: c.getChild([3, 0, 0, 0]),
            footer: c.getChild([3, 0, 1, 0])
          }
        }
      }

      function h(a,
        b, c) {
        this.element = b;
        this.focusIndex = c;
        this.tabIndex = 0;
        this.isFocusable = function() {
          return !b.getAttribute("disabled") && b.isVisible()
        };
        this.focus = function() {
          a._.currentFocusIndex = this.focusIndex;
          this.element.focus()
        };
        b.on("keydown", function(a) {
          a.data.getKeystroke() in {
            32: 1,
            13: 1
          } && this.fire("click")
        });
        b.on("focus", function() {
          this.fire("mouseover")
        });
        b.on("blur", function() {
          this.fire("mouseout")
        })
      }

      function d(a) {
        function b() {
          a.layout()
        }
        var c = CKEDITOR.document.getWindow();
        c.on("resize", b);
        a.on("hide", function() {
          c.removeListener("resize",
            b)
        })
      }

      function k(a, b) {
        this._ = {
          dialog: a
        };
        CKEDITOR.tools.extend(this, b)
      }

      function m(a) {
        function b(c) {
          var h = a.getSize(),
            m = CKEDITOR.document.getWindow().getViewPaneSize(),
            l = c.data.$.screenX,
            n = c.data.$.screenY,
            r = l - d.x,
            w = n - d.y;
          d = {
            x: l,
            y: n
          };
          g.x += r;
          g.y += w;
          a.move(g.x + k[3] < f ? -k[3] : g.x - k[1] > m.width - h.width - f ? m.width - h.width + ("rtl" == e.lang.dir ? 0 : k[1]) : g.x, g.y + k[0] < f ? -k[0] : g.y - k[2] > m.height - h.height - f ? m.height - h.height + k[2] : g.y, 1);
          c.data.preventDefault()
        }

        function c() {
          CKEDITOR.document.removeListener("mousemove",
            b);
          CKEDITOR.document.removeListener("mouseup", c);
          if(CKEDITOR.env.ie6Compat) {
            var a = x.getChild(0).getFrameDocument();
            a.removeListener("mousemove", b);
            a.removeListener("mouseup", c)
          }
        }
        var d = null,
          g = null,
          e = a.getParentEditor(),
          f = e.config.dialog_magnetDistance,
          k = CKEDITOR.skin.margins || [0, 0, 0, 0];
        "undefined" == typeof f && (f = 20);
        a.parts.title.on("mousedown", function(e) {
          d = {
            x: e.data.$.screenX,
            y: e.data.$.screenY
          };
          CKEDITOR.document.on("mousemove", b);
          CKEDITOR.document.on("mouseup", c);
          g = a.getPosition();
          if(CKEDITOR.env.ie6Compat) {
            var f =
              x.getChild(0).getFrameDocument();
            f.on("mousemove", b);
            f.on("mouseup", c)
          }
          e.data.preventDefault()
        }, a)
      }

      function g(a) {
        function b(c) {
          var n = "rtl" == e.lang.dir,
            r = l.width,
            w = l.height,
            v = r + (c.data.$.screenX - m.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2),
            q = w + (c.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
            p = a._.element.getFirst(),
            p = n && p.getComputedStyle("right"),
            y = a.getPosition();
          y.y + q > h.height && (q = h.height - y.y);
          (n ? p : y.x) + v > h.width && (v = h.width - (n ? p : y.x));
          if(g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH) r = Math.max(d.minWidth ||
            0, v - f);
          if(g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH) w = Math.max(d.minHeight || 0, q - k);
          a.resize(r, w);
          a._.moved || a.layout();
          c.data.preventDefault()
        }

        function c() {
          CKEDITOR.document.removeListener("mouseup", c);
          CKEDITOR.document.removeListener("mousemove", b);
          n && (n.remove(), n = null);
          if(CKEDITOR.env.ie6Compat) {
            var a = x.getChild(0).getFrameDocument();
            a.removeListener("mouseup", c);
            a.removeListener("mousemove", b)
          }
        }
        var d = a.definition,
          g = d.resizable;
        if(g != CKEDITOR.DIALOG_RESIZE_NONE) {
          var e = a.getParentEditor(),
            f, k, h, m, l, n, r = CKEDITOR.tools.addFunction(function(d) {
              l = a.getSize();
              var g = a.parts.contents;
              g.$.getElementsByTagName("iframe").length && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), g.append(n));
              k = l.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
              f = l.width - a.parts.contents.getSize("width", 1);
              m = {
                x: d.screenX,
                y: d.screenY
              };
              h = CKEDITOR.document.getWindow().getViewPaneSize();
              CKEDITOR.document.on("mousemove", b);
              CKEDITOR.document.on("mouseup", c);
              CKEDITOR.env.ie6Compat && (g = x.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", c));
              d.preventDefault && d.preventDefault()
            });
          a.on("load", function() {
            var b = "";
            g == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
            b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + e.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(e.lang.common.resize) +
              '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + r + ', event )"\x3e' + ("ltr" == e.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
            a.parts.footer.append(b, 1)
          });
          e.on("destroy", function() {
            CKEDITOR.tools.removeFunction(r)
          })
        }
      }

      function n(a) {
        a.data.preventDefault(1)
      }

      function p(a) {
        var b = CKEDITOR.document.getWindow(),
          c = a.config,
          d = CKEDITOR.skinName || a.config.skin,
          g = c.dialog_backgroundCoverColor || ("moono-lisa" == d ? "black" : "white"),
          d = c.dialog_backgroundCoverOpacity,
          e = c.baseFloatZIndex,
          c = CKEDITOR.tools.genKey(g, d, e),
          f = y[c];
        f ? f.show() :
          (e = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", e, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + g, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (g = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + g + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", e.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), e.push("void((function(){" + encodeURIComponent("document.open();(" +
            CKEDITOR.tools.fixDomain + ")();document.write( '" + g + "' );document.close();") + "})())"), e.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), e.push("\x3c/div\x3e"), f = CKEDITOR.dom.element.createFromHtml(e.join("")), f.setOpacity(void 0 !== d ? d : .5), f.on("keydown", n), f.on("keypress", n), f.on("keyup", n), f.appendTo(CKEDITOR.document.getBody()), y[c] = f);
        a.focusManager.add(f);
        x = f;
        a = function() {
          var a = b.getViewPaneSize();
          f.setStyles({
            width: a.width + "px",
            height: a.height + "px"
          })
        };
        var k = function() {
          var a = b.getScrollPosition(),
            c = CKEDITOR.dialog._.currentTop;
          f.setStyles({
            left: a.x + "px",
            top: a.y + "px"
          });
          if(c) {
            do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
          }
        };
        z = a;
        b.on("resize", a);
        a();
        CKEDITOR.env.mac && CKEDITOR.env.webkit || f.focus();
        if(CKEDITOR.env.ie6Compat) {
          var h = function() {
            k();
            arguments.callee.prevScrollHandler.apply(this, arguments)
          };
          b.$.setTimeout(function() {
            h.prevScrollHandler = window.onscroll || function() {};
            window.onscroll = h
          }, 0);
          k()
        }
      }

      function t(a) {
        x && (a.focusManager.remove(x), a = CKEDITOR.document.getWindow(), x.hide(), a.removeListener("resize", z), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
          window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
        }, 0), z = null)
      }
      var A = CKEDITOR.tools.cssLength,
        u = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
        CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
      CKEDITOR.dialog = function(b, d) {
        function k() {
          var a = x._.focusList;
          a.sort(function(a, b) {
            return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
          });
          for(var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
        }

        function h(a) {
          var b = x._.focusList;
          a = a || 0;
          if(!(1 > b.length)) {
            var c = x._.currentFocusIndex;
            x._.tabBarMode && 0 > a && (c = 0);
            try {
              b[c].getInputElement().$.blur()
            } catch(d) {}
            var g = c,
              e = 1 < x._.pageCount;
            do {
              g += a;
              if(e && !x._.tabBarMode && (g == b.length || -1 == g)) {
                x._.tabBarMode = !0;
                x._.tabs[x._.currentTabId][0].focus();
                x._.currentFocusIndex = -1;
                return
              }
              g = (g + b.length) % b.length;
              if(g == c) break
            } while (a && !b[g].isFocusable());
            b[g].focus();
            "text" == b[g].type && b[g].select()
          }
        }

        function n(c) {
          if(x == CKEDITOR.dialog._.currentTop) {
            var d = c.data.getKeystroke(),
              g = "rtl" == b.lang.dir,
              f = [37, 38, 39, 40];
            t = A = 0;
            if(9 == d || d == CKEDITOR.SHIFT + 9) h(d == CKEDITOR.SHIFT + 9 ? -1 : 1), t = 1;
            else if(d == CKEDITOR.ALT + 121 && !x._.tabBarMode && 1 < x.getPageCount()) x._.tabBarMode = !0, x._.tabs[x._.currentTabId][0].focus(), x._.currentFocusIndex = -1, t = 1;
            else if(-1 != CKEDITOR.tools.indexOf(f,
                d) && x._.tabBarMode) d = -1 != CKEDITOR.tools.indexOf([g ? 39 : 37, 38], d) ? a.call(x) : e.call(x), x.selectPage(d), x._.tabs[d][0].focus(), t = 1;
            else if(13 != d && 32 != d || !x._.tabBarMode)
              if(13 == d) d = c.data.getTarget(), d.is("a", "button", "select", "textarea") || d.is("input") && "button" == d.$.type || ((d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d), t = 1), A = 1;
              else if(27 == d)(d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : !1 !== this.fire("cancel", {
              hide: !0
            }).hide && this.hide(), A = 1;
            else return;
            else this.selectPage(this._.currentTabId),
              this._.tabBarMode = !1, this._.currentFocusIndex = -1, h(1), t = 1;
            w(c)
          }
        }

        function w(a) {
          t ? a.data.preventDefault(1) : A && a.data.stopPropagation()
        }
        var v = CKEDITOR.dialog._.dialogDefinitions[d],
          p = CKEDITOR.tools.clone(r),
          y = b.config.dialog_buttonsOrder || "OS",
          B = b.lang.dir,
          z = {},
          t, A;
        ("OS" == y && CKEDITOR.env.mac || "rtl" == y && "ltr" == B || "ltr" == y && "rtl" == B) && p.buttons.reverse();
        v = CKEDITOR.tools.extend(v(b), p);
        v = CKEDITOR.tools.clone(v);
        v = new q(this, v);
        p = l(b);
        this._ = {
          editor: b,
          element: p.element,
          name: d,
          contentSize: {
            width: 0,
            height: 0
          },
          size: {
            width: 0,
            height: 0
          },
          contents: {},
          buttons: {},
          accessKeyMap: {},
          tabs: {},
          tabIdList: [],
          currentTabId: null,
          currentTabIndex: null,
          pageCount: 0,
          lastTab: null,
          tabBarMode: !1,
          focusList: [],
          currentFocusIndex: 0,
          hasFocus: !1
        };
        this.parts = p.parts;
        CKEDITOR.tools.setTimeout(function() {
          b.fire("ariaWidget", this.parts.contents)
        }, 0, this);
        p = {
          position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
          top: 0,
          visibility: "hidden"
        };
        p["rtl" == B ? "right" : "left"] = 0;
        this.parts.dialog.setStyles(p);
        CKEDITOR.event.call(this);
        this.definition = v = CKEDITOR.fire("dialogDefinition", {
          name: d,
          definition: v
        }, b).definition;
        if(!("removeDialogTabs" in b._) && b.config.removeDialogTabs) {
          p = b.config.removeDialogTabs.split(";");
          for(B = 0; B < p.length; B++)
            if(y = p[B].split(":"), 2 == y.length) {
              var u = y[0];
              z[u] || (z[u] = []);
              z[u].push(y[1])
            }
          b._.removeDialogTabs = z
        }
        if(b._.removeDialogTabs && (z = b._.removeDialogTabs[d]))
          for(B = 0; B < z.length; B++) v.removeContents(z[B]);
        if(v.onLoad) this.on("load", v.onLoad);
        if(v.onShow) this.on("show", v.onShow);
        if(v.onHide) this.on("hide", v.onHide);
        if(v.onOk) this.on("ok", function(a) {
          b.fire("saveSnapshot");
          setTimeout(function() {
            b.fire("saveSnapshot")
          }, 0);
          !1 === v.onOk.call(this, a) && (a.data.hide = !1)
        });
        this.state = CKEDITOR.DIALOG_STATE_IDLE;
        if(v.onCancel) this.on("cancel", function(a) {
          !1 === v.onCancel.call(this, a) && (a.data.hide = !1)
        });
        var x = this,
          C = function(a) {
            var b = x._.contents,
              c = !1,
              d;
            for(d in b)
              for(var g in b[d])
                if(c = a.call(this, b[d][g])) return
          };
        this.on("ok", function(a) {
          C(function(b) {
            if(b.validate) {
              var d = b.validate(this),
                g = "string" == typeof d || !1 === d;
              g && (a.data.hide = !1, a.stop());
              c.call(b, !g, "string" == typeof d ?
                d : void 0);
              return g
            }
          })
        }, this, null, 0);
        this.on("cancel", function(a) {
          C(function(c) {
            if(c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0
          })
        }, this, null, 0);
        this.parts.close.on("click", function(a) {
          !1 !== this.fire("cancel", {
            hide: !0
          }).hide && this.hide();
          a.data.preventDefault()
        }, this);
        this.changeFocus = h;
        var D = this._.element;
        b.focusManager.add(D, 1);
        this.on("show", function() {
          D.on("keydown", n, this);
          if(CKEDITOR.env.gecko) D.on("keypress", w, this)
        });
        this.on("hide",
          function() {
            D.removeListener("keydown", n);
            CKEDITOR.env.gecko && D.removeListener("keypress", w);
            C(function(a) {
              f.apply(a)
            })
          });
        this.on("iframeAdded", function(a) {
          (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0)
        });
        this.on("show", function() {
          k();
          var a = 1 < x._.pageCount;
          b.config.dialog_startupFocusTab && a ? (x._.tabBarMode = !0, x._.tabs[x._.currentTabId][0].focus(), x._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, v.onFocus ?
            (a = v.onFocus.call(this)) && a.focus() : h(1))
        }, this, null, 4294967295);
        if(CKEDITOR.env.ie6Compat) this.on("load", function() {
          var a = this.getElement(),
            b = a.getFirst();
          b.remove();
          b.appendTo(a)
        }, this);
        m(this);
        g(this);
        (new CKEDITOR.dom.text(v.title, CKEDITOR.document)).appendTo(this.parts.title);
        for(B = 0; B < v.contents.length; B++)(z = v.contents[B]) && this.addPage(z);
        this.parts.tabs.on("click", function(a) {
          var b = a.data.getTarget();
          b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
            this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, h(1)), a.data.preventDefault())
        }, this);
        B = [];
        z = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
          type: "hbox",
          className: "cke_dialog_footer_buttons",
          widths: [],
          children: v.buttons
        }, B).getChild();
        this.parts.footer.setHtml(B.join(""));
        for(B = 0; B < z.length; B++) this._.buttons[z[B].id] = z[B]
      };
      CKEDITOR.dialog.prototype = {
        destroy: function() {
          this.hide();
          this._.element.remove()
        },
        resize: function() {
          return function(a, b) {
            this._.contentSize && this._.contentSize.width ==
              a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
                dialog: this,
                width: a,
                height: b
              }, this._.editor), this.fire("resize", {
                width: a,
                height: b
              }, this._.editor), this.parts.contents.setStyles({
                width: a + "px",
                height: b + "px"
              }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                width: a,
                height: b
              })
          }
        }(),
        getSize: function() {
          var a = this._.element.getFirst();
          return {
            width: a.$.offsetWidth || 0,
            height: a.$.offsetHeight || 0
          }
        },
        move: function(a, b, c) {
          var d = this._.element.getFirst(),
            g = "rtl" == this._.editor.lang.dir,
            e = "fixed" == d.getComputedStyle("position");
          CKEDITOR.env.ie && d.setStyle("zoom", "100%");
          e && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
              x: a,
              y: b
            }, e || (e = CKEDITOR.document.getWindow().getScrollPosition(), a += e.x, b += e.y), g && (e = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - e.width - a), b = {
              top: (0 < b ? b : 0) + "px"
            },
            b[g ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1))
        },
        getPosition: function() {
          return CKEDITOR.tools.extend({}, this._.position)
        },
        show: function() {
          var a = this._.element,
            b = this.definition;
          a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
          this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
          this.reset();
          null ===
            this._.currentTabId && this.selectPage(this.definition.contents[0].id);
          null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
          this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
          null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex /
            2), CKEDITOR.dialog._.currentTop = this);
          a.on("keydown", D);
          a.on("keyup", H);
          this._.hasFocus = !1;
          for(var c in b.contents)
            if(b.contents[c]) {
              var a = b.contents[c],
                g = this._.tabs[a.id],
                e = a.requiredContent,
                f = 0;
              if(g) {
                for(var k in this._.contents[a.id]) {
                  var h = this._.contents[a.id][k];
                  "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++))
                }!f || e && !this._.editor.activeFilter.check(e) ? g[0].addClass("cke_dialog_tab_disabled") :
                  g[0].removeClass("cke_dialog_tab_disabled")
              }
            }
          CKEDITOR.tools.setTimeout(function() {
            this.layout();
            d(this);
            this.parts.dialog.setStyle("visibility", "");
            this.fireOnce("load", {});
            CKEDITOR.ui.fire("ready", this);
            this.fire("show", {});
            this._.editor.fire("dialogShow", this);
            this._.parentDialog || this._.editor.focusManager.lock();
            this.foreach(function(a) {
              a.setInitValue && a.setInitValue()
            })
          }, 100, this)
        },
        layout: function() {
          var a = this.parts.dialog,
            b = this.getSize(),
            c = CKEDITOR.document.getWindow().getViewPaneSize(),
            d =
            (c.width - b.width) / 2,
            g = (c.height - b.height) / 2;
          CKEDITOR.env.ie6Compat || (b.height + (0 < g ? g : 0) > c.height || b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
          this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : g)
        },
        foreach: function(a) {
          for(var b in this._.contents)
            for(var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
          return this
        },
        reset: function() {
          var a = function(a) {
            a.reset && a.reset(1)
          };
          return function() {
            this.foreach(a);
            return this
          }
        }(),
        setupContent: function() {
          var a = arguments;
          this.foreach(function(b) {
            b.setup && b.setup.apply(b, a)
          })
        },
        commitContent: function() {
          var a = arguments;
          this.foreach(function(b) {
            CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
            b.commit && b.commit.apply(b, a)
          })
        },
        hide: function() {
          if(this.parts.dialog.isVisible()) {
            this.fire("hide", {});
            this._.editor.fire("dialogHide", this);
            this.selectPage(this._.tabIdList[0]);
            var a = this._.element;
            a.setStyle("display", "none");
            this.parts.dialog.setStyle("visibility",
              "hidden");
            for(I(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
            if(this._.parentDialog) {
              var b = this._.parentDialog.getElement().getFirst();
              b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
            } else t(this._.editor);
            if(CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
            else {
              CKEDITOR.dialog._.currentZIndex = null;
              a.removeListener("keydown", D);
              a.removeListener("keyup", H);
              var c = this._.editor;
              c.focus();
              setTimeout(function() {
                c.focusManager.unlock();
                CKEDITOR.env.iOS && c.window.focus()
              }, 0)
            }
            delete this._.parentDialog;
            this.foreach(function(a) {
              a.resetInitValue && a.resetInitValue()
            });
            this.setState(CKEDITOR.DIALOG_STATE_IDLE)
          }
        },
        addPage: function(a) {
          if(!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
            for(var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                type: "vbox",
                className: "cke_dialog_page_contents",
                children: a.elements,
                expand: !!a.expand,
                padding: a.padding,
                style: a.style || "width: 100%;"
              }, b), g = this._.contents[a.id] = {}, e = d.getChild(), f = 0; d = e.shift();) d.notAllowed || "hbox" == d.type || "vbox" == d.type || f++, g[d.id] = d, "function" == typeof d.getChild && e.push.apply(e, d.getChild());
            f || (a.hidden = !0);
            b = CKEDITOR.dom.element.createFromHtml(b.join(""));
            b.setAttribute("role", "tabpanel");
            d = CKEDITOR.env;
            g = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
            c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
              0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', g, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"
            ].join(""));
            b.setAttribute("aria-labelledby", g);
            this._.tabs[a.id] = [c, b];
            this._.tabIdList.push(a.id);
            !a.hidden && this._.pageCount++;
            this._.lastTab = c;
            this.updateStyle();
            b.setAttribute("name", a.id);
            b.appendTo(this.parts.contents);
            c.unselectable();
            this.parts.tabs.append(c);
            a.accessKey &&
              (E(this, this, "CTRL+" + a.accessKey, J, G), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
          }
        },
        selectPage: function(a) {
          if(this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", {
              page: a,
              currentPage: this._.currentTabId
            })) {
            for(var c in this._.tabs) {
              var d = this._.tabs[c][0],
                g = this._.tabs[c][1];
              c != a && (d.removeClass("cke_dialog_tab_selected"), g.hide());
              g.setAttribute("aria-hidden", c != a)
            }
            var e = this._.tabs[a];
            e[0].addClass("cke_dialog_tab_selected");
            CKEDITOR.env.ie6Compat ||
              CKEDITOR.env.ie7Compat ? (b(e[1]), e[1].show(), setTimeout(function() {
                b(e[1], 1)
              }, 0)) : e[1].show();
            this._.currentTabId = a;
            this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
          }
        },
        updateStyle: function() {
          this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
        },
        hidePage: function(b) {
          var c = this._.tabs[b] && this._.tabs[b][0];
          c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), c.hide(), this._.pageCount--, this.updateStyle())
        },
        showPage: function(a) {
          if(a =
            this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
        },
        getElement: function() {
          return this._.element
        },
        getName: function() {
          return this._.name
        },
        getContentElement: function(a, b) {
          var c = this._.contents[a];
          return c && c[b]
        },
        getValueOf: function(a, b) {
          return this.getContentElement(a, b).getValue()
        },
        setValueOf: function(a, b, c) {
          return this.getContentElement(a, b).setValue(c)
        },
        getButton: function(a) {
          return this._.buttons[a]
        },
        click: function(a) {
          return this._.buttons[a].click()
        },
        disableButton: function(a) {
          return this._.buttons[a].disable()
        },
        enableButton: function(a) {
          return this._.buttons[a].enable()
        },
        getPageCount: function() {
          return this._.pageCount
        },
        getParentEditor: function() {
          return this._.editor
        },
        getSelectedElement: function() {
          return this.getParentEditor().getSelection().getSelectedElement()
        },
        addFocusable: function(a, b) {
          if("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new h(this, a, b));
          else {
            this._.focusList.splice(b, 0, new h(this, a, b));
            for(var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
          }
        },
        setState: function(a) {
          if(this.state != a) {
            this.state = a;
            if(a == CKEDITOR.DIALOG_STATE_BUSY) {
              if(!this.parts.spinner) {
                var b = this.getParentEditor().lang.dir,
                  c = {
                    attributes: {
                      "class": "cke_dialog_spinner"
                    },
                    styles: {
                      "float": "rtl" == b ? "right" : "left"
                    }
                  };
                c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
                this.parts.spinner = CKEDITOR.document.createElement("div", c);
                this.parts.spinner.setHtml("\x26#8987;");
                this.parts.spinner.appendTo(this.parts.title, 1)
              }
              this.parts.spinner.show();
              this.getButton("ok").disable()
            } else a ==
              CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
            this.fire("state", a)
          }
        }
      };
      CKEDITOR.tools.extend(CKEDITOR.dialog, {
        add: function(a, b) {
          this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b)
        },
        exists: function(a) {
          return !!this._.dialogDefinitions[a]
        },
        getCurrent: function() {
          return CKEDITOR.dialog._.currentTop
        },
        isTabEnabled: function(a, b, c) {
          a = a.config.removeDialogTabs;
          return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)",
            "i")))
        },
        okButton: function() {
          var a = function(a, b) {
            b = b || {};
            return CKEDITOR.tools.extend({
              id: "ok",
              type: "button",
              label: a.lang.common.ok,
              "class": "cke_dialog_ui_button_ok",
              onClick: function(a) {
                a = a.data.dialog;
                !1 !== a.fire("ok", {
                  hide: !0
                }).hide && a.hide()
              }
            }, b, !0)
          };
          a.type = "button";
          a.override = function(b) {
            return CKEDITOR.tools.extend(function(c) {
              return a(c, b)
            }, {
              type: "button"
            }, !0)
          };
          return a
        }(),
        cancelButton: function() {
          var a = function(a, b) {
            b = b || {};
            return CKEDITOR.tools.extend({
              id: "cancel",
              type: "button",
              label: a.lang.common.cancel,
              "class": "cke_dialog_ui_button_cancel",
              onClick: function(a) {
                a = a.data.dialog;
                !1 !== a.fire("cancel", {
                  hide: !0
                }).hide && a.hide()
              }
            }, b, !0)
          };
          a.type = "button";
          a.override = function(b) {
            return CKEDITOR.tools.extend(function(c) {
              return a(c, b)
            }, {
              type: "button"
            }, !0)
          };
          return a
        }(),
        addUIElement: function(a, b) {
          this._.uiElementBuilders[a] = b
        }
      });
      CKEDITOR.dialog._ = {
        uiElementBuilders: {},
        dialogDefinitions: {},
        currentTop: null,
        currentZIndex: null
      };
      CKEDITOR.event.implementOn(CKEDITOR.dialog);
      CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
      var r = {
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 600,
          minHeight: 400,
          buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        },
        v = function(a, b, c) {
          for(var d = 0, g; g = a[d]; d++)
            if(g.id == b || c && g[c] && (g = v(g[c], b, c))) return g;
          return null
        },
        w = function(a, b, c, d, g) {
          if(c) {
            for(var e = 0, f; f = a[e]; e++) {
              if(f.id == c) return a.splice(e, 0, b), b;
              if(d && f[d] && (f = w(f[d], b, c, d, !0))) return f
            }
            if(g) return null
          }
          a.push(b);
          return b
        },
        B = function(a, b, c) {
          for(var d = 0, g; g = a[d]; d++) {
            if(g.id == b) return a.splice(d, 1);
            if(c && g[c] && (g = B(g[c],
                b, c))) return g
          }
          return null
        },
        q = function(a, b) {
          this.dialog = a;
          for(var c = b.contents, d = 0, g; g = c[d]; d++) c[d] = g && new k(a, g);
          CKEDITOR.tools.extend(this, b)
        };
      q.prototype = {
        getContents: function(a) {
          return v(this.contents, a)
        },
        getButton: function(a) {
          return v(this.buttons, a)
        },
        addContents: function(a, b) {
          return w(this.contents, a, b)
        },
        addButton: function(a, b) {
          return w(this.buttons, a, b)
        },
        removeContents: function(a) {
          B(this.contents, a)
        },
        removeButton: function(a) {
          B(this.buttons, a)
        }
      };
      k.prototype = {
        get: function(a) {
          return v(this.elements,
            a, "children")
        },
        add: function(a, b) {
          return w(this.elements, a, b, "children")
        },
        remove: function(a) {
          B(this.elements, a, "children")
        }
      };
      var z, y = {},
        x, C = {},
        D = function(a) {
          var b = a.data.$.ctrlKey || a.data.$.metaKey,
            c = a.data.$.altKey,
            d = a.data.$.shiftKey,
            g = String.fromCharCode(a.data.$.keyCode);
          (b = C[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
        },
        H = function(a) {
          var b = a.data.$.ctrlKey || a.data.$.metaKey,
            c = a.data.$.altKey,
            d = a.data.$.shiftKey,
            g = String.fromCharCode(a.data.$.keyCode);
          (b = C[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
        },
        E = function(a, b, c, d, g) {
          (C[c] || (C[c] = [])).push({
            uiElement: a,
            dialog: b,
            key: c,
            keyup: g || a.accessKeyUp,
            keydown: d || a.accessKeyDown
          })
        },
        I = function(a) {
          for(var b in C) {
            for(var c = C[b], d = c.length - 1; 0 <= d; d--) c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1);
            0 === c.length && delete C[b]
          }
        },
        G = function(a,
          b) {
          a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
        },
        J = function() {};
      (function() {
        CKEDITOR.ui.dialog = {
          uiElement: function(a, b, c, d, g, e, f) {
            if(!(4 > arguments.length)) {
              var k = (d.call ? d(b) : d) || "div",
                h = ["\x3c", k, " "],
                m = (g && g.call ? g(b) : g) || {},
                l = (e && e.call ? e(b) : e) || {},
                n = (f && f.call ? f.call(this, a, b) : f) || "",
                r = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement";
              b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
              l.id = r;
              var w = {};
              b.type && (w["cke_dialog_ui_" +
                b.type] = 1);
              b.className && (w[b.className] = 1);
              b.disabled && (w.cke_disabled = 1);
              for(var v = l["class"] && l["class"].split ? l["class"].split(" ") : [], r = 0; r < v.length; r++) v[r] && (w[v[r]] = 1);
              v = [];
              for(r in w) v.push(r);
              l["class"] = v.join(" ");
              b.title && (l.title = b.title);
              w = (b.style || "").split(";");
              b.align && (v = b.align, m["margin-left"] = "left" == v ? 0 : "auto", m["margin-right"] = "right" == v ? 0 : "auto");
              for(r in m) w.push(r + ":" + m[r]);
              b.hidden && w.push("display:none");
              for(r = w.length - 1; 0 <= r; r--) "" === w[r] && w.splice(r, 1);
              0 < w.length && (l.style =
                (l.style ? l.style + "; " : "") + w.join("; "));
              for(r in l) h.push(r + '\x3d"' + CKEDITOR.tools.htmlEncode(l[r]) + '" ');
              h.push("\x3e", n, "\x3c/", k, "\x3e");
              c.push(h.join(""));
              (this._ || (this._ = {})).dialog = a;
              "boolean" == typeof b.isChanged && (this.isChanged = function() {
                return b.isChanged
              });
              "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
              "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                return function(c) {
                  a.call(this, b.setValue.call(this, c))
                }
              }));
              "function" == typeof b.getValue &&
                (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                  return function() {
                    return b.getValue.call(this, a.call(this))
                  }
                }));
              CKEDITOR.event.implementOn(this);
              this.registerEvents(b);
              this.accessKeyUp && this.accessKeyDown && b.accessKey && E(this, a, "CTRL+" + b.accessKey);
              var q = this;
              a.on("load", function() {
                var b = q.getInputElement();
                if(b) {
                  var c = q.type in {
                    checkbox: 1,
                    ratio: 1
                  } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                  b.on("focus", function() {
                    a._.tabBarMode = !1;
                    a._.hasFocus = !0;
                    q.fire("focus");
                    c && this.addClass(c)
                  });
                  b.on("blur", function() {
                    q.fire("blur");
                    c && this.removeClass(c)
                  })
                }
              });
              CKEDITOR.tools.extend(this, b);
              this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
                a._.currentFocusIndex = q.focusIndex
              }))
            }
          },
          hbox: function(a, b, c, d, g) {
            if(!(4 > arguments.length)) {
              this._ || (this._ = {});
              var e = this._.children = b,
                f = g && g.widths || null,
                k = g && g.height || null,
                h, m = {
                  role: "presentation"
                };
              g && g.align && (m.align = g.align);
              CKEDITOR.ui.dialog.uiElement.call(this,
                a, g || {
                  type: "hbox"
                }, d, "table", {}, m,
                function() {
                  var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
                  for(h = 0; h < c.length; h++) {
                    var b = "cke_dialog_ui_hbox_child",
                      d = [];
                    0 === h && (b = "cke_dialog_ui_hbox_first");
                    h == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                    a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
                    f ? f[h] && d.push("width:" + A(f[h])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                    k && d.push("height:" + A(k));
                    g && void 0 !== g.padding && d.push("padding:" + A(g.padding));
                    CKEDITOR.env.ie && CKEDITOR.env.quirks &&
                      e[h].align && d.push("text-align:" + e[h].align);
                    0 < d.length && a.push('style\x3d"' + d.join("; ") + '" ');
                    a.push("\x3e", c[h], "\x3c/td\x3e")
                  }
                  a.push("\x3c/tr\x3e\x3c/tbody\x3e");
                  return a.join("")
                })
            }
          },
          vbox: function(a, b, c, d, g) {
            if(!(3 > arguments.length)) {
              this._ || (this._ = {});
              var e = this._.children = b,
                f = g && g.width || null,
                k = g && g.heights || null;
              CKEDITOR.ui.dialog.uiElement.call(this, a, g || {
                type: "vbox"
              }, d, "div", null, {
                role: "presentation"
              }, function() {
                var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                b.push('style\x3d"');
                g && g.expand && b.push("height:100%;");
                b.push("width:" + A(f || "100%"), ";");
                CKEDITOR.env.webkit && b.push("float:none;");
                b.push('"');
                b.push('align\x3d"', CKEDITOR.tools.htmlEncode(g && g.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                b.push("\x3e\x3ctbody\x3e");
                for(var d = 0; d < c.length; d++) {
                  var h = [];
                  b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
                  f && h.push("width:" + A(f || "100%"));
                  k ? h.push("height:" + A(k[d])) : g && g.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                  g && void 0 !== g.padding && h.push("padding:" + A(g.padding));
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && e[d].align && h.push("text-align:" + e[d].align);
                  0 < h.length && b.push('style\x3d"', h.join("; "), '" ');
                  b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[d], "\x3c/td\x3e\x3c/tr\x3e")
                }
                b.push("\x3c/tbody\x3e\x3c/table\x3e");
                return b.join("")
              })
            }
          }
        }
      })();
      CKEDITOR.ui.dialog.uiElement.prototype = {
        getElement: function() {
          return CKEDITOR.document.getById(this.domId)
        },
        getInputElement: function() {
          return this.getElement()
        },
        getDialog: function() {
          return this._.dialog
        },
        setValue: function(a, b) {
          this.getInputElement().setValue(a);
          !b && this.fire("change", {
            value: a
          });
          return this
        },
        getValue: function() {
          return this.getInputElement().getValue()
        },
        isChanged: function() {
          return !1
        },
        selectParentTab: function() {
          for(var a = this.getInputElement();
            (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
          if(!a) return this;
          a = a.getAttribute("name");
          this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
          return this
        },
        focus: function() {
          this.selectParentTab().getInputElement().focus();
          return this
        },
        registerEvents: function(a) {
          var b = /^on([A-Z]\w+)/,
            c, d = function(a, b, c, d) {
              b.on("load", function() {
                a.getInputElement().on(c, d, a)
              })
            },
            g;
          for(g in a)
            if(c = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : d(this, this._.dialog, c[1].toLowerCase(), a[g]);
          return this
        },
        eventProcessors: {
          onLoad: function(a, b) {
            a.on("load", b, this)
          },
          onShow: function(a, b) {
            a.on("show", b, this)
          },
          onHide: function(a, b) {
            a.on("hide", b, this)
          }
        },
        accessKeyDown: function() {
          this.focus()
        },
        accessKeyUp: function() {},
        disable: function() {
          var a = this.getElement();
          this.getInputElement().setAttribute("disabled", "true");
          a.addClass("cke_disabled")
        },
        enable: function() {
          var a = this.getElement();
          this.getInputElement().removeAttribute("disabled");
          a.removeClass("cke_disabled")
        },
        isEnabled: function() {
          return !this.getElement().hasClass("cke_disabled")
        },
        isVisible: function() {
          return this.getInputElement().isVisible()
        },
        isFocusable: function() {
          return this.isEnabled() && this.isVisible() ? !0 : !1
        }
      };
      CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
        getChild: function(a) {
          if(1 > arguments.length) return this._.children.concat();
          a.splice || (a = [a]);
          return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
        }
      }, !0);
      CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
      (function() {
        var a = {
          build: function(a, b, c) {
            for(var d = b.children, g, e = [], f = [], k = 0; k < d.length && (g = d[k]); k++) {
              var h = [];
              e.push(h);
              f.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, h))
            }
            return new CKEDITOR.ui.dialog[b.type](a,
              f, e, c, b)
          }
        };
        CKEDITOR.dialog.addUIElement("hbox", a);
        CKEDITOR.dialog.addUIElement("vbox", a)
      })();
      CKEDITOR.dialogCommand = function(a, b) {
        this.dialogName = a;
        CKEDITOR.tools.extend(this, b, !0)
      };
      CKEDITOR.dialogCommand.prototype = {
        exec: function(a) {
          var b = this.tabId;
          a.openDialog(this.dialogName, function(a) {
            b && a.selectPage(b)
          })
        },
        canUndo: !1,
        editorFocus: 1
      };
      (function() {
        var a = /^([a]|[^a])+$/,
          b = /^\d*$/,
          c = /^\d*(?:\.\d+)?$/,
          d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
          g = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
          e = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
        CKEDITOR.VALIDATE_OR = 1;
        CKEDITOR.VALIDATE_AND = 2;
        CKEDITOR.dialog.validate = {
          functions: function() {
            var a = arguments;
            return function() {
              var b = this && this.getValue ? this.getValue() : a[0],
                c, d = CKEDITOR.VALIDATE_AND,
                g = [],
                e;
              for(e = 0; e < a.length; e++)
                if("function" == typeof a[e]) g.push(a[e]);
                else break;
              e < a.length && "string" == typeof a[e] && (c = a[e], e++);
              e < a.length && "number" == typeof a[e] && (d = a[e]);
              var f = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
              for(e = 0; e < g.length; e++) f = d == CKEDITOR.VALIDATE_AND ? f &&
                g[e](b) : f || g[e](b);
              return f ? !0 : c
            }
          },
          regex: function(a, b) {
            return function(c) {
              c = this && this.getValue ? this.getValue() : c;
              return a.test(c) ? !0 : b
            }
          },
          notEmpty: function(b) {
            return this.regex(a, b)
          },
          integer: function(a) {
            return this.regex(b, a)
          },
          number: function(a) {
            return this.regex(c, a)
          },
          cssLength: function(a) {
            return this.functions(function(a) {
              return g.test(CKEDITOR.tools.trim(a))
            }, a)
          },
          htmlLength: function(a) {
            return this.functions(function(a) {
              return d.test(CKEDITOR.tools.trim(a))
            }, a)
          },
          inlineStyle: function(a) {
            return this.functions(function(a) {
                return e.test(CKEDITOR.tools.trim(a))
              },
              a)
          },
          equals: function(a, b) {
            return this.functions(function(b) {
              return b == a
            }, b)
          },
          notEqual: function(a, b) {
            return this.functions(function(b) {
              return b != a
            }, b)
          }
        };
        CKEDITOR.on("instanceDestroyed", function(a) {
          if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
            for(var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
            for(var c in y) y[c].remove();
            y = {}
          }
          a = a.editor._.storedDialogs;
          for(var d in a) a[d].destroy()
        })
      })();
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        openDialog: function(a, b) {
          var c = null,
            d = CKEDITOR.dialog._.dialogDefinitions[a];
          null === CKEDITOR.dialog._.currentTop && p(this);
          if("function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
          else {
            if("failed" == d) throw t(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
            "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
              "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
              this.openDialog(a,
                b)
            }, this, 0, 1)
          }
          CKEDITOR.skin.loadPart("dialog");
          return c
        }
      })
    }(), CKEDITOR.plugins.add("dialog", {
      requires: "dialogui",
      init: function(a) {
        a.on("doubleclick", function(e) {
          e.data.dialog && a.openDialog(e.data.dialog)
        }, null, null, 999)
      }
    }),
    function() {
      CKEDITOR.plugins.add("a11yhelp", {
        requires: "dialog",
        availableLangs: {
          af: 1,
          ar: 1,
          az: 1,
          bg: 1,
          ca: 1,
          cs: 1,
          cy: 1,
          da: 1,
          de: 1,
          "de-ch": 1,
          el: 1,
          en: 1,
          "en-gb": 1,
          eo: 1,
          es: 1,
          "es-mx": 1,
          et: 1,
          eu: 1,
          fa: 1,
          fi: 1,
          fo: 1,
          fr: 1,
          "fr-ca": 1,
          gl: 1,
          gu: 1,
          he: 1,
          hi: 1,
          hr: 1,
          hu: 1,
          id: 1,
          it: 1,
          ja: 1,
          kk: 1,
          km: 1,
          ko: 1,
          ku: 1,
          lb: 1,
          lt: 1,
          lv: 1,
          mk: 1,
          mn: 1,
          nb: 1,
          nl: 1,
          no: 1,
          oc: 1,
          pl: 1,
          pt: 1,
          "pt-br": 1,
          ro: 1,
          ru: 1,
          si: 1,
          sk: 1,
          sl: 1,
          sq: 1,
          sr: 1,
          "sr-latn": 1,
          sv: 1,
          th: 1,
          ti: 1,
          tr: 1,
          tt: 1,
          ug: 1,
          uk: 1,
          vi: 1,
          zh: 1,
          "zh-cn": 1,
          "zh-tw": 1
        },
        init: function(a) {
          var e = this;
          a.addCommand("a11yHelp", {
            exec: function() {
              var b = a.langCode,
                b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
              CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function() {
                a.lang.a11yhelp = e.langEntries[b];
                a.openDialog("a11yHelp")
              })
            },
            modes: {
              wysiwyg: 1,
              source: 1
            },
            readOnly: 1,
            canUndo: !1
          });
          a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
          CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
          a.on("ariaEditorHelpLabel", function(b) {
            b.data.label = a.lang.common.editorHelp
          })
        }
      })
    }(), CKEDITOR.plugins.add("about", {
      requires: "dialog",
      init: function(a) {
        var e = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
        e.modes = {
          wysiwyg: 1,
          source: 1
        };
        e.canUndo = !1;
        e.readOnly = 1;
        a.ui.addButton && a.ui.addButton("About", {
          label: a.lang.about.title,
          command: "about",
          toolbar: "about"
        });
        CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
      }
    }), CKEDITOR.plugins.add("basicstyles", {
      init: function(a) {
        var e = 0,
          b = function(b, d, f, m) {
            if(m) {
              m = new CKEDITOR.style(m);
              var g = c[f];
              g.unshift(m);
              a.attachStyleStateChange(m, function(b) {
                !a.readOnly && a.getCommand(f).setState(b)
              });
              a.addCommand(f, new CKEDITOR.styleCommand(m, {
                contentForms: g
              }));
              a.ui.addButton && a.ui.addButton(b, {
                label: d,
                command: f,
                toolbar: "basicstyles," + (e += 10)
              })
            }
          },
          c = {
            bold: ["strong", "b", ["span", function(a) {
              a = a.styles["font-weight"];
              return "bold" ==
                a || 700 <= +a
            }]],
            italic: ["em", "i", ["span", function(a) {
              return "italic" == a.styles["font-style"]
            }]],
            underline: ["u", ["span", function(a) {
              return "underline" == a.styles["text-decoration"]
            }]],
            strike: ["s", "strike", ["span", function(a) {
              return "line-through" == a.styles["text-decoration"]
            }]],
            subscript: ["sub"],
            superscript: ["sup"]
          },
          f = a.config,
          l = a.lang.basicstyles;
        b("Bold", l.bold, "bold", f.coreStyles_bold);
        b("Italic", l.italic, "italic", f.coreStyles_italic);
        b("Underline", l.underline, "underline", f.coreStyles_underline);
        b("Strike",
          l.strike, "strike", f.coreStyles_strike);
        b("Subscript", l.subscript, "subscript", f.coreStyles_subscript);
        b("Superscript", l.superscript, "superscript", f.coreStyles_superscript);
        a.setKeystroke([
          [CKEDITOR.CTRL + 66, "bold"],
          [CKEDITOR.CTRL + 73, "italic"],
          [CKEDITOR.CTRL + 85, "underline"]
        ])
      }
    }), CKEDITOR.config.coreStyles_bold = {
      element: "strong",
      overrides: "b"
    }, CKEDITOR.config.coreStyles_italic = {
      element: "em",
      overrides: "i"
    }, CKEDITOR.config.coreStyles_underline = {
      element: "u"
    }, CKEDITOR.config.coreStyles_strike = {
      element: "s",
      overrides: "strike"
    }, CKEDITOR.config.coreStyles_subscript = {
      element: "sub"
    }, CKEDITOR.config.coreStyles_superscript = {
      element: "sup"
    },
    function() {
      function a(a, b, c, d) {
        if(!a.isReadOnly() && !a.equals(c.editable())) {
          CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1);
          d = a;
          for(var e = c.editable();
            (d = d.getParent()) && !d.equals(e);)
            if(d.getCustomData("bidi_processed")) {
              a.removeStyle("direction");
              a.removeAttribute("dir");
              return
            }
          d = "useComputedState" in c.config ? c.config.useComputedState : 1;
          (d ? a.getComputedStyle("direction") :
            a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), d ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), c.forceNextSelectionCheck())
        }
      }

      function e(a, b, c) {
        var d = a.getCommonAncestor(!1, !0);
        a = a.clone();
        a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
        if(a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
          for(var e; d && d.type == CKEDITOR.NODE_ELEMENT &&
            (e = d.getParent()) && 1 == e.getChildCount() && !(d.getName() in b);) d = e;
          return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d
        }
      }

      function b(b) {
        return {
          context: "p",
          allowedContent: {
            "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
              propertiesOnly: !0,
              attributes: "dir"
            }
          },
          requiredContent: "p[dir]",
          refresh: function(a, b) {
            var c = a.config.useComputedState,
              d, c = void 0 === c || c;
            if(!c) {
              d = b.lastElement;
              for(var g = a.editable(); d && !(d.getName() in h || d.equals(g));) {
                var e = d.getParent();
                if(!e) break;
                d = e
              }
            }
            d = d || b.block ||
              b.blockLimit;
            d.equals(a.editable()) && (g = a.getSelection().getRanges()[0].getEnclosedNode()) && g.type == CKEDITOR.NODE_ELEMENT && (d = g);
            d && (c = c ? d.getComputedStyle("direction") : d.getStyle("direction") || d.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
            c = (b.block || b.blockLimit || a.editable()).getDirection(1);
            c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged",
              c))
          },
          exec: function(c) {
            var d = c.getSelection(),
              k = c.config.enterMode,
              h = d.getRanges();
            if(h && h.length) {
              for(var m = {}, r = d.createBookmarks(), h = h.createIterator(), v, w = 0; v = h.getNextRange(1);) {
                var B = v.getEnclosedNode();
                B && (!B || B.type == CKEDITOR.NODE_ELEMENT && B.getName() in l) || (B = e(v, f, k));
                B && a(B, b, c, m);
                var q = new CKEDITOR.dom.walker(v),
                  z = r[w].startNode,
                  y = r[w++].endNode;
                q.evaluator = function(a) {
                  var b = k == CKEDITOR.ENTER_P ? "p" : "div",
                    c;
                  if(c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in f) {
                    if(b = a.is(b)) b = (b = a.getParent()) ?
                      b.type == CKEDITOR.NODE_ELEMENT : !1;
                    c = !(b && a.getParent().is("blockquote"))
                  }
                  return !!(c && a.getPosition(z) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(y) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                };
                for(; B = q.next();) a(B, b, c, m);
                v = v.createIterator();
                for(v.enlargeBr = k != CKEDITOR.ENTER_BR; B = v.getNextParagraph(k == CKEDITOR.ENTER_P ? "p" : "div");) a(B, b, c, m)
              }
              CKEDITOR.dom.element.clearAllMarkers(m);
              c.forceNextSelectionCheck();
              d.selectBookmarks(r);
              c.focus()
            }
          }
        }
      }

      function c(a) {
        var b =
          a == d.setAttribute,
          c = a == d.removeAttribute,
          e = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
        return function(d, f) {
          if(!this.isReadOnly()) {
            var k;
            if(k = d == (b || c ? "dir" : "direction") || "style" == d && (c || e.test(f))) {
              a: {
                k = this;
                for(var h = k.getDocument().getBody().getParent(); k;) {
                  if(k.equals(h)) {
                    k = !1;
                    break a
                  }
                  k = k.getParent()
                }
                k = !0
              }
              k = !k
            }
            if(k && (k = this.getDirection(1), h = a.apply(this, arguments), k != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), h
          }
          return a.apply(this, arguments)
        }
      }
      var f = {
          table: 1,
          ul: 1,
          ol: 1,
          blockquote: 1,
          div: 1
        },
        l = {},
        h = {};
      CKEDITOR.tools.extend(l, f, {
        tr: 1,
        p: 1,
        div: 1,
        li: 1
      });
      CKEDITOR.tools.extend(h, l, {
        td: 1
      });
      CKEDITOR.plugins.add("bidi", {
        init: function(a) {
          function c(b, d, e, f, k) {
            a.addCommand(e, new CKEDITOR.command(a, f));
            a.ui.addButton && a.ui.addButton(b, {
              label: d,
              command: e,
              toolbar: "bidi," + k
            })
          }
          if(!a.blockless) {
            var d = a.lang.bidi;
            c("BidiLtr", d.ltr, "bidiltr", b("ltr"), 10);
            c("BidiRtl", d.rtl, "bidirtl", b("rtl"), 20);
            a.on("contentDom", function() {
              a.document.on("dirChanged", function(b) {
                a.fire("dirChanged", {
                  node: b.data,
                  dir: b.data.getDirection(1)
                })
              })
            });
            a.on("contentDirChanged", function(b) {
              b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
              var c = a.ui.space(a.config.toolbarLocation);
              if(c) c[b]("cke_mixed_dir_content")
            })
          }
        }
      });
      for(var d = CKEDITOR.dom.element.prototype, k = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], m = 0; m < k.length; m++) d[k[m]] = CKEDITOR.tools.override(d[k[m]], c)
    }(),
    function() {
      var a = {
        exec: function(a) {
          var b = a.getCommand("blockquote").state,
            c = a.getSelection(),
            f = c && c.getRanges()[0];
          if(f) {
            var l = c.createBookmarks();
            if(CKEDITOR.env.ie) {
              var h =
                l[0].startNode,
                d = l[0].endNode,
                k;
              if(h && "blockquote" == h.getParent().getName())
                for(k = h; k = k.getNext();)
                  if(k.type == CKEDITOR.NODE_ELEMENT && k.isBlockBoundary()) {
                    h.move(k, !0);
                    break
                  }
              if(d && "blockquote" == d.getParent().getName())
                for(k = d; k = k.getPrevious();)
                  if(k.type == CKEDITOR.NODE_ELEMENT && k.isBlockBoundary()) {
                    d.move(k);
                    break
                  }
            }
            var m = f.createIterator();
            m.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
            if(b == CKEDITOR.TRISTATE_OFF) {
              for(h = []; b = m.getNextParagraph();) h.push(b);
              1 > h.length && (b = a.document.createElement(a.config.enterMode ==
                CKEDITOR.ENTER_P ? "p" : "div"), d = l.shift(), f.insertNode(b), b.append(new CKEDITOR.dom.text("﻿", a.document)), f.moveToBookmark(d), f.selectNodeContents(b), f.collapse(!0), d = f.createBookmark(), h.push(b), l.unshift(d));
              k = h[0].getParent();
              f = [];
              for(d = 0; d < h.length; d++) b = h[d], k = k.getCommonAncestor(b.getParent());
              for(b = {
                  table: 1,
                  tbody: 1,
                  tr: 1,
                  ol: 1,
                  ul: 1
                }; b[k.getName()];) k = k.getParent();
              for(d = null; 0 < h.length;) {
                for(b = h.shift(); !b.getParent().equals(k);) b = b.getParent();
                b.equals(d) || f.push(b);
                d = b
              }
              for(; 0 < f.length;)
                if(b =
                  f.shift(), "blockquote" == b.getName()) {
                  for(d = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();) d.append(b.getFirst().remove()), h.push(d.getLast());
                  d.replace(b)
                } else h.push(b);
              f = a.document.createElement("blockquote");
              for(f.insertBefore(h[0]); 0 < h.length;) b = h.shift(), f.append(b)
            } else if(b == CKEDITOR.TRISTATE_ON) {
              d = [];
              for(k = {}; b = m.getNextParagraph();) {
                for(h = f = null; b.getParent();) {
                  if("blockquote" == b.getParent().getName()) {
                    f = b.getParent();
                    h = b;
                    break
                  }
                  b = b.getParent()
                }
                f && h && !h.getCustomData("blockquote_moveout") &&
                  (d.push(h), CKEDITOR.dom.element.setMarker(k, h, "blockquote_moveout", !0))
              }
              CKEDITOR.dom.element.clearAllMarkers(k);
              b = [];
              h = [];
              for(k = {}; 0 < d.length;) m = d.shift(), f = m.getParent(), m.getPrevious() ? m.getNext() ? (m.breakParent(m.getParent()), h.push(m.getNext())) : m.remove().insertAfter(f) : m.remove().insertBefore(f), f.getCustomData("blockquote_processed") || (h.push(f), CKEDITOR.dom.element.setMarker(k, f, "blockquote_processed", !0)), b.push(m);
              CKEDITOR.dom.element.clearAllMarkers(k);
              for(d = h.length - 1; 0 <= d; d--) {
                f = h[d];
                a: {
                  k = f;
                  for(var m = 0, g = k.getChildCount(), n = void 0; m < g && (n = k.getChild(m)); m++)
                    if(n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
                      k = !1;
                      break a
                    }
                  k = !0
                }
                k && f.remove()
              }
              if(a.config.enterMode == CKEDITOR.ENTER_BR)
                for(f = !0; b.length;)
                  if(m = b.shift(), "div" == m.getName()) {
                    d = new CKEDITOR.dom.documentFragment(a.document);
                    !f || !m.getPrevious() || m.getPrevious().type == CKEDITOR.NODE_ELEMENT && m.getPrevious().isBlockBoundary() || d.append(a.document.createElement("br"));
                    for(f = m.getNext() && !(m.getNext().type == CKEDITOR.NODE_ELEMENT &&
                        m.getNext().isBlockBoundary()); m.getFirst();) m.getFirst().remove().appendTo(d);
                    f && d.append(a.document.createElement("br"));
                    d.replace(m);
                    f = !1
                  }
            }
            c.selectBookmarks(l);
            a.focus()
          }
        },
        refresh: function(a, b) {
          this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
        },
        context: "blockquote",
        allowedContent: "blockquote",
        requiredContent: "blockquote"
      };
      CKEDITOR.plugins.add("blockquote", {
        init: function(e) {
          e.blockless || (e.addCommand("blockquote", a), e.ui.addButton &&
            e.ui.addButton("Blockquote", {
              label: e.lang.blockquote.toolbar,
              command: "blockquote",
              toolbar: "blocks,10"
            }))
        }
      })
    }(), "use strict", CKEDITOR.plugins.add("notification", {
      init: function(a) {
        function e(a) {
          var c = new CKEDITOR.dom.element("div");
          c.setStyles({
            position: "fixed",
            "margin-left": "-9999px"
          });
          c.setAttributes({
            "aria-live": "assertive",
            "aria-atomic": "true"
          });
          c.setText(a);
          CKEDITOR.document.getBody().append(c);
          setTimeout(function() {
            c.remove()
          }, 100)
        }
        a._.notificationArea = new la(a);
        a.showNotification = function(b,
          c, e) {
          var l, h;
          "progress" == c ? l = e : h = e;
          b = new CKEDITOR.plugins.notification(a, {
            message: b,
            type: c,
            progress: l,
            duration: h
          });
          b.show();
          return b
        };
        a.on("key", function(b) {
          if(27 == b.data.keyCode) {
            var c = a._.notificationArea.notifications;
            c.length && (e(a.lang.notification.closed), c[c.length - 1].hide(), b.cancel())
          }
        })
      }
    }), ka.prototype = {
      show: function() {
        !1 !== this.editor.fire("notificationShow", {
          notification: this
        }) && (this.area.add(this), this._hideAfterTimeout())
      },
      update: function(a) {
        var e = !0;
        !1 === this.editor.fire("notificationUpdate", {
          notification: this,
          options: a
        }) && (e = !1);
        var b = this.element,
          c = b.findOne(".cke_notification_message"),
          f = b.findOne(".cke_notification_progress"),
          l = a.type;
        b.removeAttribute("role");
        a.progress && "progress" != this.type && (l = "progress");
        l && (b.removeClass(this._getClass()), b.removeAttribute("aria-label"), this.type = l, b.addClass(this._getClass()), b.setAttribute("aria-label", this.type), "progress" != this.type || f ? "progress" != this.type && f && f.remove() : (f = this._createProgressElement(), f.insertBefore(c)));
        void 0 !== a.message &&
          (this.message = a.message, c.setHtml(this.message));
        void 0 !== a.progress && (this.progress = a.progress, f && f.setStyle("width", this._getPercentageProgress()));
        e && a.important && (b.setAttribute("role", "alert"), this.isVisible() || this.area.add(this));
        this.duration = a.duration;
        this._hideAfterTimeout()
      },
      hide: function() {
        !1 !== this.editor.fire("notificationHide", {
          notification: this
        }) && this.area.remove(this)
      },
      isVisible: function() {
        return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this)
      },
      _createElement: function() {
        var a =
          this,
          e, b, c = this.editor.lang.common.close;
        e = new CKEDITOR.dom.element("div");
        e.addClass("cke_notification");
        e.addClass(this._getClass());
        e.setAttributes({
          id: this.id,
          role: "alert",
          "aria-label": this.type
        });
        "progress" == this.type && e.append(this._createProgressElement());
        b = new CKEDITOR.dom.element("p");
        b.addClass("cke_notification_message");
        b.setHtml(this.message);
        e.append(b);
        b = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + c + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');
        e.append(b);
        b.on("click", function() {
          a.editor.focus();
          a.hide()
        });
        return e
      },
      _getClass: function() {
        return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type
      },
      _createProgressElement: function() {
        var a = new CKEDITOR.dom.element("span");
        a.addClass("cke_notification_progress");
        a.setStyle("width", this._getPercentageProgress());
        return a
      },
      _getPercentageProgress: function() {
        return Math.round(100 * (this.progress || 0)) + "%"
      },
      _hideAfterTimeout: function() {
        var a = this,
          e;
        this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
        if("number" == typeof this.duration) e = this.duration;
        else if("info" == this.type || "success" == this.type) e = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3;
        e && (a._hideTimeoutId = setTimeout(function() {
          a.hide()
        }, e))
      }
    }, la.prototype = {
      add: function(a) {
        this.notifications.push(a);
        this.element.append(a.element);
        1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners());
        this._layout()
      },
      remove: function(a) {
        var e = CKEDITOR.tools.indexOf(this.notifications,
          a);
        0 > e || (this.notifications.splice(e, 1), a.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
      },
      _createElement: function() {
        var a = this.editor,
          e = a.config,
          b = new CKEDITOR.dom.element("div");
        b.addClass("cke_notifications_area");
        b.setAttribute("id", "cke_notifications_area_" + a.name);
        b.setStyle("z-index", e.baseFloatZIndex - 2);
        return b
      },
      _attachListeners: function() {
        var a = CKEDITOR.document.getWindow(),
          e = this.editor;
        a.on("scroll", this._uiBuffer.input);
        a.on("resize", this._uiBuffer.input);
        e.on("change", this._changeBuffer.input);
        e.on("floatingSpaceLayout", this._layout, this, null, 20);
        e.on("blur", this._layout, this, null, 20)
      },
      _removeListeners: function() {
        var a = CKEDITOR.document.getWindow(),
          e = this.editor;
        a.removeListener("scroll", this._uiBuffer.input);
        a.removeListener("resize", this._uiBuffer.input);
        e.removeListener("change", this._changeBuffer.input);
        e.removeListener("floatingSpaceLayout", this._layout);
        e.removeListener("blur", this._layout)
      },
      _layout: function() {
        function a() {
          e.setStyle("left",
            u(r + c.width - m - g))
        }
        var e = this.element,
          b = this.editor,
          c = b.ui.contentsElement.getClientRect(),
          f = b.ui.contentsElement.getDocumentPosition(),
          l, h, d = e.getClientRect(),
          k, m = this._notificationWidth,
          g = this._notificationMargin;
        k = CKEDITOR.document.getWindow();
        var n = k.getScrollPosition(),
          p = k.getViewPaneSize(),
          t = CKEDITOR.document.getBody(),
          A = t.getDocumentPosition(),
          u = CKEDITOR.tools.cssLength;
        m && g || (k = this.element.getChild(0), m = this._notificationWidth = k.getClientRect().width, g = this._notificationMargin = parseInt(k.getComputedStyle("margin-left"),
          10) + parseInt(k.getComputedStyle("margin-right"), 10));
        b.toolbar && (l = b.ui.space("top"), h = l.getClientRect());
        l && l.isVisible() && h.bottom > c.top && h.bottom < c.bottom - d.height ? e.setStyles({
          position: "fixed",
          top: u(h.bottom)
        }) : 0 < c.top ? e.setStyles({
          position: "absolute",
          top: u(f.y)
        }) : f.y + c.height - d.height > n.y ? e.setStyles({
          position: "fixed",
          top: 0
        }) : e.setStyles({
          position: "absolute",
          top: u(f.y + c.height - d.height)
        });
        var r = "fixed" == e.getStyle("position") ? c.left : "static" != t.getComputedStyle("position") ? f.x - A.x : f.x;
        c.width <
          m + g ? f.x + m + g > n.x + p.width ? a() : e.setStyle("left", u(r)) : f.x + m + g > n.x + p.width ? e.setStyle("left", u(r)) : f.x + c.width / 2 + m / 2 + g > n.x + p.width ? e.setStyle("left", u(r - f.x + n.x + p.width - m - g)) : 0 > c.left + c.width - m - g ? a() : 0 > c.left + c.width / 2 - m / 2 ? e.setStyle("left", u(r - f.x + n.x)) : e.setStyle("left", u(r + c.width / 2 - m / 2 - g / 2))
      }
    }, CKEDITOR.plugins.notification = ka,
    function() {
      var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") +
        ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' +
          (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
        a = a + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
        e = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
        b = CKEDITOR.addTemplate("button", a);
      CKEDITOR.plugins.add("button", {
        beforeInit: function(a) {
          a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
        }
      });
      CKEDITOR.UI_BUTTON = "button";
      CKEDITOR.ui.button = function(a) {
        CKEDITOR.tools.extend(this, a, {
          title: a.label,
          click: a.click || function(b) {
            b.execCommand(a.command)
          }
        });
        this._ = {}
      };
      CKEDITOR.ui.button.handler = {
        create: function(a) {
          return new CKEDITOR.ui.button(a)
        }
      };
      CKEDITOR.ui.button.prototype = {
        render: function(a, f) {
          function l() {
            var b = a.mode;
            b && (b = this.modes[b] ? void 0 !== v[b] ? v[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
          }
          var h = CKEDITOR.env,
            d = this._.id = CKEDITOR.tools.getNextId(),
            k = "",
            m = this.command,
            g, n, p;
          this._.editor = a;
          var t = {
              id: d,
              button: this,
              editor: a,
              focus: function() {
                CKEDITOR.document.getById(d).focus()
              },
              execute: function() {
                this.button.click(a)
              },
              attach: function(a) {
                this.button.attach(a)
              }
            },
            A = CKEDITOR.tools.addFunction(function(a) {
              if(t.onkey) return a = new CKEDITOR.dom.event(a), !1 !== t.onkey(t, a.getKeystroke())
            }),
            u = CKEDITOR.tools.addFunction(function(a) {
              var b;
              t.onfocus && (b = !1 !== t.onfocus(t, new CKEDITOR.dom.event(a)));
              return b
            }),
            r = 0;
          t.clickFn = g = CKEDITOR.tools.addFunction(function() {
            r && (a.unlockSelection(1), r = 0);
            t.execute();
            h.iOS && a.focus()
          });
          if(this.modes) {
            var v = {};
            a.on("beforeModeUnload", function() {
              a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (v[a.mode] = this._.state)
            }, this);
            a.on("activeFilterChange",
              l, this);
            a.on("mode", l, this);
            !this.readOnly && a.on("readOnly", l, this)
          } else m && (m = a.getCommand(m)) && (m.on("state", function() {
            this.setState(m.state)
          }, this), k += m.state == CKEDITOR.TRISTATE_ON ? "on" : m.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
          if(this.directional) a.on("contentDirChanged", function(b) {
            var d = CKEDITOR.document.getById(this._.id),
              g = d.getFirst();
            b = b.data;
            b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl");
            g.setAttribute("style", CKEDITOR.skin.getIconStyle(w,
              "rtl" == b, this.icon, this.iconOffset))
          }, this);
          m ? (n = a.getCommandKeystroke(m)) && (p = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, n)) : k += "off";
          var w = n = this.name || this.command;
          this.icon && !/\./.test(this.icon) && (w = this.icon, this.icon = null);
          k = {
            id: d,
            name: n,
            iconName: w,
            label: this.label,
            cls: this.className || "",
            state: k,
            ariaDisabled: "disabled" == k ? "true" : "false",
            title: this.title + (p ? " (" + p.display + ")" : ""),
            ariaShortcut: p ? a.lang.common.keyboardShortcut + " " + p.aria : "",
            titleJs: h.gecko && !h.hc ? "" : (this.title ||
              "").replace("'", ""),
            hasArrow: this.hasArrow ? "true" : "false",
            keydownFn: A,
            focusFn: u,
            clickFn: g,
            style: CKEDITOR.skin.getIconStyle(w, "rtl" == a.lang.dir, this.icon, this.iconOffset),
            arrowHtml: this.hasArrow ? e.output() : ""
          };
          b.output(k, f);
          if(this.onRender) this.onRender();
          return t
        },
        setState: function(a) {
          if(this._.state == a) return !1;
          this._.state = a;
          var b = CKEDITOR.document.getById(this._.id);
          return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"),
            this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
        },
        getState: function() {
          return this._.state
        },
        toFeature: function(a) {
          if(this._.feature) return this._.feature;
          var b = this;
          this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
          return this._.feature =
            b
        }
      };
      CKEDITOR.ui.prototype.addButton = function(a, b) {
        this.add(a, CKEDITOR.UI_BUTTON, b)
      }
    }(),
    function() {
      function a(a) {
        function b() {
          for(var g = c(), k = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), m = 0; m < k.length; m++) {
            var l = k[m];
            if("/" != l) {
              "string" == typeof l && (l = k[m] = {
                name: l
              });
              var u, r = l.groups;
              if(r)
                for(var v = 0; v < r.length; v++) u = r[v], (u = g[u]) && d(l, u);
              (u = g[l.name]) && d(l, u)
            }
          }
          return k
        }

        function c() {
          var b = {},
            d, g, e;
          for(d in a.ui.items) g = a.ui.items[d], e = g.toolbar || "others", e = e.split(","), g = e[0], e = parseInt(e[1] ||
            -1, 10), b[g] || (b[g] = []), b[g].push({
            name: d,
            order: e
          });
          for(g in b) b[g] = b[g].sort(function(a, b) {
            return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1
          });
          return b
        }

        function d(b, c) {
          if(c.length) {
            b.items ? b.items.push(a.ui.create("-")) : b.items = [];
            for(var d; d = c.shift();) d = "string" == typeof d ? d : d.name, m && -1 != CKEDITOR.tools.indexOf(m, d) || (d = a.ui.create(d)) && a.addFeature(d) && b.items.push(d)
          }
        }

        function k(a) {
          var b = [],
            c, g, e;
          for(c = 0; c < a.length; ++c) g = a[c], e = {}, "/" == g ? b.push(g) : CKEDITOR.tools.isArray(g) ?
            (d(e, CKEDITOR.tools.clone(g)), b.push(e)) : g.items && (d(e, CKEDITOR.tools.clone(g.items)), e.name = g.name, b.push(e));
          return b
        }
        var m = a.config.removeButtons,
          m = m && m.split(","),
          g = a.config.toolbar;
        "string" == typeof g && (g = a.config["toolbar_" + g]);
        return a.toolbar = g ? k(g) : b()
      }

      function e(a) {
        return a._.toolbarGroups || (a._.toolbarGroups = [{
            name: "document",
            groups: ["mode", "document", "doctools"]
          }, {
            name: "clipboard",
            groups: ["clipboard", "undo"]
          }, {
            name: "editing",
            groups: ["find", "selection", "spellchecker"]
          }, {
            name: "forms"
          }, "/",
          {
            name: "basicstyles",
            groups: ["basicstyles", "cleanup"]
          }, {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi"]
          }, {
            name: "links"
          }, {
            name: "insert"
          }, "/", {
            name: "styles"
          }, {
            name: "colors"
          }, {
            name: "tools"
          }, {
            name: "others"
          }, {
            name: "about"
          }
        ])
      }
      var b = function() {
        this.toolbars = [];
        this.focusCommandExecuted = !1
      };
      b.prototype.focus = function() {
        for(var a = 0, b; b = this.toolbars[a++];)
          for(var c = 0, d; d = b.items[c++];)
            if(d.focus) {
              d.focus();
              return
            }
      };
      var c = {
        modes: {
          wysiwyg: 1,
          source: 1
        },
        readOnly: 1,
        exec: function(a) {
          a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
            a.toolbox.focus()
          }, 100) : a.toolbox.focus())
        }
      };
      CKEDITOR.plugins.add("toolbar", {
        requires: "button",
        init: function(e) {
          var l, h = function(a, b) {
            var c, g = "rtl" == e.lang.dir,
              n = e.config.toolbarGroupCycling,
              p = g ? 37 : 39,
              g = g ? 39 : 37,
              n = void 0 === n || n;
            switch(b) {
              case 9:
              case CKEDITOR.SHIFT + 9:
                for(; !c || !c.items.length;)
                  if(c = 9 == b ? (c ? c.next : a.toolbar.next) || e.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || e.toolbox.toolbars[e.toolbox.toolbars.length - 1], c.items.length)
                    for(a =
                      c.items[l ? c.items.length - 1 : 0]; a && !a.focus;)(a = l ? a.previous : a.next) || (c = 0);
                a && a.focus();
                return !1;
              case p:
                c = a;
                do c = c.next, !c && n && (c = a.toolbar.items[0]); while (c && !c.focus);
                c ? c.focus() : h(a, 9);
                return !1;
              case 40:
                return a.button && a.button.hasArrow ? a.execute() : h(a, 40 == b ? p : g), !1;
              case g:
              case 38:
                c = a;
                do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1]); while (c && !c.focus);
                c ? c.focus() : (l = 1, h(a, CKEDITOR.SHIFT + 9), l = 0);
                return !1;
              case 27:
                return e.focus(), !1;
              case 13:
              case 32:
                return a.execute(), !1
            }
            return !0
          };
          e.on("uiSpace", function(c) {
            if(c.data.space == e.config.toolbarLocation) {
              c.removeListener();
              e.toolbox = new b;
              var k = CKEDITOR.tools.getNextId(),
                m = ['\x3cspan id\x3d"', k, '" class\x3d"cke_voice_label"\x3e', e.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + e.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', k, '" onmousedown\x3d"return false;"\x3e'],
                k = !1 !== e.config.toolbarStartupExpanded,
                g, l;
              e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
                m.push('\x3cspan class\x3d"cke_toolbox_main"' + (k ? "\x3e" : ' style\x3d"display:none"\x3e'));
              for(var p = e.toolbox.toolbars, t = a(e), A = t.length, u = 0; u < A; u++) {
                var r, v = 0,
                  w, B = t[u],
                  q = "/" !== B && ("/" === t[u + 1] || u == A - 1),
                  z;
                if(B)
                  if(g && (m.push("\x3c/span\x3e"), l = g = 0), "/" === B) m.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
                  else {
                    z = B.items || B;
                    for(var y = 0; y < z.length; y++) {
                      var x = z[y],
                        C;
                      if(x) {
                        var D = function(a) {
                          a = a.render(e, m);
                          H = v.items.push(a) - 1;
                          0 < H && (a.previous = v.items[H - 1], a.previous.next = a);
                          a.toolbar = v;
                          a.onkey =
                            h;
                          a.onfocus = function() {
                            e.toolbox.focusCommandExecuted || e.focus()
                          }
                        };
                        if(x.type == CKEDITOR.UI_SEPARATOR) l = g && x;
                        else {
                          C = !1 !== x.canGroup;
                          C = 1; /* zxt - 20170927 */
                          if(!v) {
                            r = CKEDITOR.tools.getNextId();
                            v = {
                              id: r,
                              items: []
                            };
                            w = B.name && (e.lang.toolbar.toolbarGroups[B.name] || B.name);
                            m.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (q ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e');
                            w && m.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, "\x3c/span\x3e");
                            m.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                            var H = p.push(v) - 1;
                            0 < H && (v.previous = p[H - 1], v.previous.next = v)
                          }
                          C ? g || (m.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), g = 1) : g && (m.push("\x3c/span\x3e"), g = 0);
                          l && (D(l), l = 0);
                          D(x)
                        }
                      }
                    }
                    g && (m.push("\x3c/span\x3e"), l = g = 0);
                    v && m.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                  }
              }
              e.config.toolbarCanCollapse && m.push("\x3c/span\x3e");
              if(e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                var E = CKEDITOR.tools.addFunction(function() {
                  e.execCommand("toolbarCollapse")
                });
                e.on("destroy", function() {
                  CKEDITOR.tools.removeFunction(E)
                });
                e.addCommand("toolbarCollapse", {
                  readOnly: 1,
                  exec: function(a) {
                    var b = a.ui.space("toolbar_collapser"),
                      c = b.getPrevious(),
                      d = a.ui.space("contents"),
                      g = c.getParent(),
                      e = parseInt(d.$.style.height, 10),
                      f = g.$.offsetHeight,
                      k = b.hasClass("cke_toolbox_collapser_min");
                    k ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                    b.getFirst().setText(k ? "▲" : "◀");
                    d.setStyle("height", e - (g.$.offsetHeight - f) + "px");
                    a.fire("resize", {
                      outerHeight: a.container.$.offsetHeight,
                      contentsHeight: d.$.offsetHeight,
                      outerWidth: a.container.$.offsetWidth
                    })
                  },
                  modes: {
                    wysiwyg: 1,
                    source: 1
                  }
                });
                e.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                m.push('\x3ca title\x3d"' + (k ? e.lang.toolbar.toolbarCollapse : e.lang.toolbar.toolbarExpand) + '" id\x3d"' + e.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                k || m.push(" cke_toolbox_collapser_min");
                m.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + E + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
              }
              m.push("\x3c/span\x3e");
              c.data.html += m.join("")
            }
          });
          e.on("destroy", function() {
            if(this.toolbox) {
              var a, b = 0,
                c, g, e;
              for(a = this.toolbox.toolbars; b < a.length; b++)
                for(g = a[b].items, c = 0; c < g.length; c++) e = g[c], e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn), e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn)
            }
          });
          e.on("uiReady", function() {
            var a =
              e.ui.space("toolbox");
            a && e.focusManager.add(a, 1)
          });
          e.addCommand("toolbarFocus", c);
          e.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
          e.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
          e.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
            create: function() {
              return {
                render: function(a, b) {
                  b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
                  return {}
                }
              }
            }
          })
        }
      });
      CKEDITOR.ui.prototype.addToolbarGroup = function(a, b, c) {
        var d = e(this.editor),
          k = 0 === b,
          m = {
            name: a
          };
        if(c) {
          if(c = CKEDITOR.tools.search(d, function(a) {
              return a.name ==
                c
            })) {
            !c.groups && (c.groups = []);
            if(b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) {
              c.groups.splice(b + 1, 0, a);
              return
            }
            k ? c.groups.splice(0, 0, a) : c.groups.push(a);
            return
          }
          b = null
        }
        b && (b = CKEDITOR.tools.indexOf(d, function(a) {
          return a.name == b
        }));
        k ? d.splice(0, 0, a) : "number" == typeof b ? d.splice(b + 1, 0, m) : d.push(a)
      }
    }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict",
    function() {
      function a(a, b, c) {
        b.type || (b.type = "auto");
        if(c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
        b.dataValue || (b.dataValue = "");
        if(CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function() {
          a.toolbox.focus()
        });
        return a.fire("paste", b)
      }

      function e(b) {
        function c() {
          var a = b.editable();
          if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
            var d = function(a) {
              b.readOnly && "cut" == a.name || C.initPasteDataTransfer(a, b);
              a.data.preventDefault()
            };
            a.on("copy", d);
            a.on("cut", d);
            a.on("cut", function() {
              b.readOnly || b.extractSelectedHtml()
            }, null, null, 999)
          }
          a.on(C.mainPasteEvent, function(a) {
            "beforepaste" ==
            C.mainPasteEvent && D || z(a)
          });
          "beforepaste" == C.mainPasteEvent && (a.on("paste", function(a) {
            H || (f(), a.data.preventDefault(), z(a), h("paste"))
          }), a.on("contextmenu", k, null, null, 0), a.on("beforepaste", function(a) {
            !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || k()
          }, null, null, 0));
          a.on("beforecut", function() {
            !D && m(b)
          });
          var e;
          a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function() {
            e = setTimeout(function() {
              y()
            }, 0)
          });
          b.on("destroy", function() {
            clearTimeout(e)
          });
          a.on("keyup", y)
        }

        function d(a) {
          return {
            type: a,
            canUndo: "cut" == a,
            startDisabled: !0,
            fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67,
            exec: function() {
              "cut" == this.type && m();
              var a;
              var c = this.type;
              if(CKEDITOR.env.ie) a = h(c);
              else try {
                a = b.document.$.execCommand(c, !1, null)
              } catch(d) {
                a = !1
              }
              a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
              return a
            }
          }
        }

        function e() {
          return {
            canUndo: !1,
            async: !0,
            fakeKeystroke: CKEDITOR.CTRL + 86,
            exec: function(b, c) {
              function d(c, f) {
                f = "undefined" !== typeof f ? f : !0;
                c ? (c.method = "paste", c.dataTransfer || (c.dataTransfer = C.initPasteDataTransfer()),
                  a(b, c, f)) : g && b.showNotification(h, "info", b.config.clipboard_notificationDuration);
                b.fire("afterCommandExec", {
                  name: "paste",
                  command: e,
                  returnValue: !!c
                })
              }
              c = "undefined" !== typeof c && null !== c ? c : {};
              var e = this,
                g = "undefined" !== typeof c.notification ? c.notification : !0,
                f = c.type,
                k = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)),
                h = "string" === typeof g ? g : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + k.aria + '"\x3e' + k.display + "\x3c/kbd\x3e"),
                k = "string" ===
                typeof c ? c : c.dataValue;
              f ? b._.nextPasteType = f : delete b._.nextPasteType;
              "string" === typeof k ? d({
                dataValue: k
              }) : b.getClipboardData(d)
            }
          }
        }

        function f() {
          H = 1;
          setTimeout(function() {
            H = 0
          }, 100)
        }

        function k() {
          D = 1;
          setTimeout(function() {
            D = 0
          }, 10)
        }

        function h(a) {
          var c = b.document,
            d = c.getBody(),
            e = !1,
            f = function() {
              e = !0
            };
          d.on(a, f);
          7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
          d.removeListener(a, f);
          return e
        }

        function m() {
          if(CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
            var a = b.getSelection(),
              c, d, e;
            a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], e = b.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function() {
              c.getParent() && (e.remove(), a.selectElement(c))
            }, 0))
          }
        }

        function l(a, c) {
          var d = b.document,
            e = b.editable(),
            f = function(a) {
              a.cancel()
            },
            k;
          if(!d.getById("cke_pastebin")) {
            var h = b.getSelection(),
              m = h.createBookmarks();
            CKEDITOR.env.ie && h.root.fire("selectionchange");
            var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit &&
              !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
            n.setAttributes({
              id: "cke_pastebin",
              "data-cke-temp": "1"
            });
            var w = 0,
              d = d.getWindow();
            CKEDITOR.env.webkit ? (e.append(n), n.addClass("cke_editable"), e.is("body") || (w = "static" != e.getComputedStyle("position") ? e : CKEDITOR.dom.element.get(e.$.offsetParent), w = w.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(n);
            n.setStyles({
              position: "absolute",
              top: d.getScrollPosition().y - w + 10 + "px",
              width: "1px",
              height: Math.max(1, d.getViewPaneSize().height -
                20) + "px",
              overflow: "hidden",
              margin: 0,
              padding: 0
            });
            CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
            (w = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px");
            b.on("selectionChange", f, null, null, 0);
            if(CKEDITOR.env.webkit || CKEDITOR.env.gecko) k = e.once("blur", f, null, null, -100);
            w && n.focus();
            w = new CKEDITOR.dom.range(n);
            w.selectNodeContents(n);
            var r = w.select();
            CKEDITOR.env.ie &&
              (k = e.once("blur", function() {
                b.lockSelection(r)
              }));
            var v = CKEDITOR.document.getWindow().getScrollPosition().y;
            setTimeout(function() {
              CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = v);
              k && k.removeListener();
              CKEDITOR.env.ie && e.focus();
              h.selectBookmarks(m);
              n.remove();
              var a;
              CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") && (n = a);
              b.removeListener("selectionChange", f);
              c(n.getHtml())
            }, 0)
          }
        }

        function B() {
          if("paste" == C.mainPasteEvent) return b.fire("beforePaste", {
            type: "auto",
            method: "paste"
          }), !1;
          b.focus();
          f();
          var a = b.focusManager;
          a.lock();
          if(b.editable().fire(C.mainPasteEvent) && !h("paste")) return a.unlock(), !1;
          a.unlock();
          return !0
        }

        function q(a) {
          if("wysiwyg" == b.mode) switch(a.data.keyCode) {
            case CKEDITOR.CTRL + 86:
            case CKEDITOR.SHIFT + 45:
              a = b.editable();
              f();
              "paste" == C.mainPasteEvent && a.fire("beforepaste");
              break;
            case CKEDITOR.CTRL + 88:
            case CKEDITOR.SHIFT + 46:
              b.fire("saveSnapshot"), setTimeout(function() {
                b.fire("saveSnapshot")
              }, 50)
          }
        }

        function z(c) {
          var d = {
            type: "auto",
            method: "paste",
            dataTransfer: C.initPasteDataTransfer(c)
          };
          d.dataTransfer.cacheData();
          var e = !1 !== b.fire("beforePaste", d);
          e && C.canClipboardApiBeTrusted(d.dataTransfer, b) ? (c.data.preventDefault(), setTimeout(function() {
            a(b, d)
          }, 0)) : l(c, function(c) {
            d.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
            e && a(b, d)
          })
        }

        function y() {
          if("wysiwyg" == b.mode) {
            var a = x("paste");
            b.getCommand("cut").setState(x("cut"));
            b.getCommand("copy").setState(x("copy"));
            b.getCommand("paste").setState(a);
            b.fire("pasteState", a)
          }
        }

        function x(a) {
          if(E &&
            a in {
              paste: 1,
              cut: 1
            }) return CKEDITOR.TRISTATE_DISABLED;
          if("paste" == a) return CKEDITOR.TRISTATE_OFF;
          a = b.getSelection();
          var c = a.getRanges();
          return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
        }
        var C = CKEDITOR.plugins.clipboard,
          D = 0,
          H = 0,
          E = 0;
        (function() {
          b.on("key", q);
          b.on("contentDom", c);
          b.on("selectionChange", function(a) {
            E = a.data.selection.getRanges()[0].checkReadOnly();
            y()
          });
          b.contextMenu && b.contextMenu.addListener(function(a, b) {
            E = b.getRanges()[0].checkReadOnly();
            return {
              cut: x("cut"),
              copy: x("copy"),
              paste: x("paste")
            }
          })
        })();
        (function() {
          function a(c, d, e, f, k) {
            var h = b.lang.clipboard[d];
            b.addCommand(d, e);
            b.ui.addButton && b.ui.addButton(c, {
              label: h,
              command: d,
              toolbar: "clipboard," + f
            });
            b.addMenuItems && b.addMenuItem(d, {
              label: h,
              command: d,
              group: "clipboard",
              order: k
            })
          }
          a("Cut", "cut", d("cut"), 10, 1);
          a("Copy", "copy", d("copy"), 20, 4);
          a("Paste", "paste", e(), 30, 8)
        })();
        b.getClipboardData = function(a, c) {
          function d(a) {
            a.removeListener();
            a.cancel();
            c(a.data)
          }
          c || (c = a, a = null);
          b.on("paste",
            d, null, null, 0);
          !1 === B() && (b.removeListener("paste", d), c(null))
        }
      }

      function b(a) {
        if(CKEDITOR.env.webkit) {
          if(!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
        } else if(CKEDITOR.env.ie) {
          if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
        } else if(CKEDITOR.env.gecko) {
          if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
        } else return "html";
        return "htmlifiedtext"
      }

      function c(a, b) {
        function c(a) {
          return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
        }
        b = b.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
        b = b.replace(/<\/?[A-Z]+>/g, function(a) {
          return a.toLowerCase()
        });
        if(b.match(/^[^<]$/)) return b;
        CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
          return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length +
            1)
        }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, ""));
        CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function(a) {
          return c(a.length / 4)
        }) + "\x3c/p\x3e"));
        return h(a, b)
      }

      function f() {
        function a() {
          var b = {},
            c;
          for(c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" != c && (b[c] = 1);
          return b
        }
        var b = {};
        return {
          get: function(c) {
            return "plain-text" ==
              c ? b.plainText || (b.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = b.semanticContent) || (c = new CKEDITOR.filter, c.allow({
                $1: {
                  elements: a(),
                  attributes: !0,
                  styles: !1,
                  classes: !1
                }
              }), c = b.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null
          }
        }
      }

      function l(a, b, c) {
        b = CKEDITOR.htmlParser.fragment.fromHtml(b);
        var d = new CKEDITOR.htmlParser.basicWriter;
        c.applyTo(b, !0, !1, a.activeEnterMode);
        b.writeHtml(d);
        return d.getHtml()
      }

      function h(a, b) {
        a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
          return CKEDITOR.tools.repeat("\x3cbr\x3e",
            a.length / 7 * 2)
        }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
        return b
      }

      function d(a) {
        a.data.preventDefault();
        a.data.$.dataTransfer.dropEffect = "none"
      }

      function k(b) {
        var c = CKEDITOR.plugins.clipboard;
        b.on("contentDom", function() {
          function d(c, e, f) {
            e.select();
            a(b, {
              dataTransfer: f,
              method: "drop"
            }, 1);
            f.sourceEditor.fire("saveSnapshot");
            f.sourceEditor.editable().extractHtmlFromRange(c);
            f.sourceEditor.getSelection().selectRanges([c]);
            f.sourceEditor.fire("saveSnapshot")
          }

          function e(d, f) {
            d.select();
            a(b, {
              dataTransfer: f,
              method: "drop"
            }, 1);
            c.resetDragDataTransfer()
          }

          function f(a, c, d) {
            var e = {
              $: a.data.$,
              target: a.data.getTarget()
            };
            c && (e.dragRange = c);
            d && (e.dropRange = d);
            !1 === b.fire(a.name, e) && a.data.preventDefault()
          }

          function k(a) {
            a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
            return a.getChildCount()
          }
          var h = b.editable(),
            m = CKEDITOR.plugins.clipboard.getDropTarget(b),
            l = b.ui.space("top"),
            B = b.ui.space("bottom");
          c.preventDefaultDropOnElement(l);
          c.preventDefaultDropOnElement(B);
          h.attachListener(m, "dragstart", f);
          h.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1);
          h.attachListener(b, "dragstart", function(a) {
            c.initDragDataTransfer(a, b)
          }, null, null, 2);
          h.attachListener(b, "dragstart", function() {
            var a = c.dragRange = b.getSelection().getRanges()[0];
            CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount = a ? k(a.startContainer) : null, c.dragEndContainerChildCount = a ? k(a.endContainer) : null)
          }, null, null, 100);
          h.attachListener(m, "dragend", f);
          h.attachListener(b, "dragend",
            c.initDragDataTransfer, c, null, 1);
          h.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100);
          h.attachListener(m, "dragover", function(a) {
            if(CKEDITOR.env.edge) a.data.preventDefault();
            else {
              var b = a.data.getTarget();
              b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault()
            }
          });
          h.attachListener(m, "drop", function(a) {
            if(!a.data.$.defaultPrevented) {
              a.data.preventDefault();
              var d = a.data.getTarget();
              if(!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) {
                var d = c.getRangeAtDropPosition(a, b),
                  e = c.dragRange;
                d && f(a, e, d)
              }
            }
          }, null, null, 9999);
          h.attachListener(b, "drop", c.initDragDataTransfer, c, null, 1);
          h.attachListener(b, "drop", function(a) {
            if(a = a.data) {
              var f = a.dropRange,
                k = a.dragRange,
                h = a.dataTransfer;
              h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() {
                c.internalDrop(k, f, h, b)
              }, 0) : h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(k, f, h) : e(f, h)
            }
          }, null, null, 9999)
        })
      }
      CKEDITOR.plugins.add("clipboard", {
        requires: "notification,toolbar",
        init: function(a) {
          var d, h = f();
          a.config.forcePasteAsPlainText ? d = "plain-text" : a.config.pasteFilter ? d = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (d = "semantic-content");
          a.pasteFilter = h.get(d);
          e(a);
          k(a);
          if(CKEDITOR.env.gecko) {
            var m = ["image/png", "image/jpeg", "image/gif"],
              A;
            a.on("paste", function(b) {
              var c = b.data,
                d = c.dataTransfer;
              if(!c.dataValue && "paste" == c.method && d && 1 == d.getFilesCount() && A != d.id && (d = d.getFile(0), -1 !=
                  CKEDITOR.tools.indexOf(m, d.type))) {
                var e = new FileReader;
                e.addEventListener("load", function() {
                  b.data.dataValue = '\x3cimg src\x3d"' + e.result + '" /\x3e';
                  a.fire("paste", b.data)
                }, !1);
                e.addEventListener("abort", function() {
                  a.fire("paste", b.data)
                }, !1);
                e.addEventListener("error", function() {
                  a.fire("paste", b.data)
                }, !1);
                e.readAsDataURL(d);
                A = c.dataTransfer.id;
                b.stop()
              }
            }, null, null, 1)
          }
          a.on("paste", function(b) {
            b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
            if(!b.data.dataValue) {
              var c =
                b.data.dataTransfer,
                d = c.getData("text/html");
              if(d) b.data.dataValue = d, b.data.type = "html";
              else if(d = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text"
            }
          }, null, null, 1);
          a.on("paste", function(a) {
            var b = a.data.dataValue,
              c = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
              return b.replace(/\t/g,
                "\x26nbsp;\x26nbsp; \x26nbsp;")
            })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
            if(b.match(/^<[^<]+cke_(editable|contents)/i)) {
              var d, e, g = new CKEDITOR.dom.element("div");
              for(g.setHtml(b); 1 == g.getChildCount() && (d = g.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));) g = e = d;
              e && (b = e.getHtml().replace(/<br>$/i, ""))
            }
            CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
              return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b
            }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
              return d in c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b
            }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
            a.data.dataValue = b
          }, null, null, 3);
          a.on("paste", function(d) {
            d = d.data;
            var e = a._.nextPasteType || d.type,
              f = d.dataValue,
              k, m = a.config.clipboard_defaultContentType ||
              "html",
              n = d.dataTransfer.getTransferType(a);
            k = "html" == e || "html" == d.preSniffing ? "html" : b(f);
            delete a._.nextPasteType;
            "htmlifiedtext" == k && (f = c(a.config, f));
            "text" == e && "html" == k ? f = l(a, f, h.get("plain-text")) : n == CKEDITOR.DATA_TRANSFER_EXTERNAL && a.pasteFilter && !d.dontFilter && (f = l(a, f, a.pasteFilter));
            d.startsWithEOL && (f = '\x3cbr data-cke-eol\x3d"1"\x3e' + f);
            d.endsWithEOL && (f += '\x3cbr data-cke-eol\x3d"1"\x3e');
            "auto" == e && (e = "html" == k || "html" == m ? "html" : "text");
            d.type = e;
            d.dataValue = f;
            delete d.preSniffing;
            delete d.startsWithEOL;
            delete d.endsWithEOL
          }, null, null, 6);
          a.on("paste", function(b) {
            b = b.data;
            b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function() {
              a.fire("afterPaste")
            }, 0))
          }, null, null, 1E3)
        }
      });
      CKEDITOR.plugins.clipboard = {
        isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
        isCustomDataTypesSupported: !CKEDITOR.env.ie,
        isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
        mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
        canClipboardApiBeTrusted: function(a, b) {
          return a.getTransferType(b) !=
            CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS ? !0 : !1
        },
        getDropTarget: function(a) {
          var b = a.editable();
          return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document
        },
        fixSplitNodesAfterDrop: function(a, b, c, d) {
          function e(a, c, d) {
            var g = a;
            g.type == CKEDITOR.NODE_TEXT && (g = a.getParent());
            if(g.equals(c) && d != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset -
              1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0
          }
          var f = b.startContainer;
          "number" == typeof d && "number" == typeof c && f.type == CKEDITOR.NODE_ELEMENT && (e(a.startContainer, f, c) || e(a.endContainer, f, d))
        },
        isDropRangeAffectedByDragRange: function(a, b) {
          var c = b.startContainer,
            d = b.endOffset;
          return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) &&
            a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1
        },
        internalDrop: function(b, c, d, e) {
          var f = CKEDITOR.plugins.clipboard,
            k = e.editable(),
            h, m;
          e.fire("saveSnapshot");
          e.fire("lockSnapshot", {
            dontUpdate: 1
          });
          CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, c, f.dragStartContainerChildCount, f.dragEndContainerChildCount);
          (m = this.isDropRangeAffectedByDragRange(b, c)) || (h = b.createBookmark(!1));
          f = c.clone().createBookmark(!1);
          m && (h = b.createBookmark(!1));
          b = h.startNode;
          c = h.endNode;
          m = f.startNode;
          c && b.getPosition(m) & CKEDITOR.POSITION_PRECEDING && c.getPosition(m) & CKEDITOR.POSITION_FOLLOWING && m.insertBefore(b);
          b = e.createRange();
          b.moveToBookmark(h);
          k.extractHtmlFromRange(b, 1);
          c = e.createRange();
          c.moveToBookmark(f);
          a(e, {
            dataTransfer: d,
            method: "drop",
            range: c
          }, 1);
          e.fire("unlockSnapshot")
        },
        getRangeAtDropPosition: function(a, b) {
          var c = a.data.$,
            d = c.clientX,
            e = c.clientY,
            f = b.getSelection(!0).getRanges()[0],
            k = b.createRange();
          if(a.data.testRange) return a.data.testRange;
          if(document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, e)) c = b.document.$.caretRangeFromPoint(d, e), k.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), k.collapse(!0);
          else if(c.rangeParent) k.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), k.collapse(!0);
          else {
            if(CKEDITOR.env.ie && 8 < CKEDITOR.env.version && f && b.editable().hasFocus) return f;
            if(document.body.createTextRange) {
              b.focus();
              c = b.document.getBody().$.createTextRange();
              try {
                for(var h = !1, m = 0; 20 > m && !h; m++) {
                  if(!h) try {
                    c.moveToPoint(d,
                      e - m), h = !0
                  } catch(l) {}
                  if(!h) try {
                    c.moveToPoint(d, e + m), h = !0
                  } catch(q) {}
                }
                if(h) {
                  var z = "cke-temp-" + (new Date).getTime();
                  c.pasteHTML('\x3cspan id\x3d"' + z + '"\x3e​\x3c/span\x3e');
                  var y = b.document.getById(z);
                  k.moveToPosition(y, CKEDITOR.POSITION_BEFORE_START);
                  y.remove()
                } else {
                  var x = b.document.$.elementFromPoint(d, e),
                    C = new CKEDITOR.dom.element(x),
                    D;
                  if(C.equals(b.editable()) || "html" == C.getName()) return f && f.startContainer && !f.startContainer.equals(b.editable()) ? f : null;
                  D = C.getClientRect();
                  d < D.left ? k.setStartAt(C,
                    CKEDITOR.POSITION_AFTER_START) : k.setStartAt(C, CKEDITOR.POSITION_BEFORE_END);
                  k.collapse(!0)
                }
              } catch(H) {
                return null
              }
            } else return null
          }
          return k
        },
        initDragDataTransfer: function(a, b) {
          var c = a.data.$ ? a.data.$.dataTransfer : null,
            d = new this.dataTransfer(c, b);
          c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d;
          a.data.dataTransfer = d
        },
        resetDragDataTransfer: function() {
          this.dragData = null
        },
        initPasteDataTransfer: function(a, b) {
          if(this.isCustomCopyCutSupported) {
            if(a &&
              a.data && a.data.$) {
              var c = new this.dataTransfer(a.data.$.clipboardData, b);
              this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = a.data.$.clipboardData) : this.copyCutData = c;
              return c
            }
            return new this.dataTransfer(null, b)
          }
          return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
        },
        preventDefaultDropOnElement: function(a) {
          a && a.on("dragover", d)
        }
      };
      var m = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
      CKEDITOR.plugins.clipboard.dataTransfer =
        function(a, b) {
          a && (this.$ = a);
          this._ = {
            metaRegExp: /^<meta.*?>/i,
            bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
            fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
            data: {},
            files: [],
            normalizeType: function(a) {
              a = a.toLowerCase();
              return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a
            }
          };
          this.id = this.getData(m);
          this.id || (this.id = "Text" == m ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
          if("Text" != m) try {
            this.$.setData(m, this.id)
          } catch(c) {}
          b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" ==
            m || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
        };
      CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
      CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
      CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
      CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
        getData: function(a, b) {
          a = this._.normalizeType(a);
          var c = this._.data[a],
            d;
          if(void 0 === c || null === c || "" === c) try {
            c = this.$.getData(a)
          } catch(e) {}
          if(void 0 === c || null === c || "" === c) c = "";
          "text/html" != a || b ? "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" ==
            c.substring(0, 7) && (c = "") : (c = c.replace(this._.metaRegExp, ""), (d = this._.bodyRegExp.exec(c)) && d.length && (c = d[1], c = c.replace(this._.fragmentRegExp, "")));
          "string" === typeof c && (d = c.indexOf("\x3c/html\x3e"), c = -1 !== d ? c.substring(0, d + 7) : c);
          return c
        },
        setData: function(a, b) {
          a = this._.normalizeType(a);
          this._.data[a] = b;
          if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) {
            "Text" == m && "Text" == a && (this.id = b);
            try {
              this.$.setData(a, b)
            } catch(c) {}
          }
        },
        getTransferType: function(a) {
          return this.sourceEditor ?
            this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
        },
        cacheData: function() {
          function a(c) {
            c = b._.normalizeType(c);
            var d = b.getData(c, !0);
            d && (b._.data[c] = d)
          }
          if(this.$) {
            var b = this,
              c, d;
            if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
              if(this.$.types)
                for(c = 0; c < this.$.types.length; c++) a(this.$.types[c])
            } else a("Text"), a("URL");
            d = this._getImageFromClipboard();
            if(this.$ && this.$.files || d) {
              this._.files = [];
              if(this.$.files && this.$.files.length)
                for(c =
                  0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
              0 === this._.files.length && d && this._.files.push(d)
            }
          }
        },
        getFilesCount: function() {
          return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
        },
        getFile: function(a) {
          return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0
        },
        isEmpty: function() {
          var a = {},
            b;
          if(this.getFilesCount()) return !1;
          for(b in this._.data) a[b] = 1;
          if(this.$)
            if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
              if(this.$.types)
                for(var c = 0; c < this.$.types.length; c++) a[this.$.types[c]] = 1
            } else a.Text = 1, a.URL = 1;
          "Text" != m && (a[m] = 0);
          for(b in a)
            if(a[b] && "" !== this.getData(b)) return !1;
          return !0
        },
        _getImageFromClipboard: function() {
          var a;
          if(this.$ && this.$.items && this.$.items[0]) try {
            if((a = this.$.items[0].getAsFile()) && a.type) return a
          } catch(b) {}
        }
      }
    }(), CKEDITOR.config.clipboard_notificationDuration = 1E4, CKEDITOR.plugins.add("panelbutton", {
      requires: "button",
      onLoad: function() {
        function a(a) {
          var b = this._;
          b.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(a), b.on ? b.panel.hide() : b.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
        }
        CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
          base: CKEDITOR.ui.button,
          $: function(e) {
            var b = e.panel || {};
            delete e.panel;
            this.base(e);
            this.document = b.parent && b.parent.getDocument() || CKEDITOR.document;
            b.block = {
              attributes: b.attributes
            };
            this.hasArrow = b.toolbarRelated = !0;
            this.click = a;
            this._ = {
              panelDefinition: b
            }
          },
          statics: {
            handler: {
              create: function(a) {
                return new CKEDITOR.ui.panelButton(a)
              }
            }
          },
          proto: {
            createPanel: function(a) {
              var b = this._;
              if(!b.panel) {
                var c = this._.panelDefinition,
                  f = this._.panelDefinition.block,
                  l = c.parent || CKEDITOR.document.getBody(),
                  h = this._.panel = new CKEDITOR.ui.floatPanel(a, l, c),
                  c = h.addBlock(b.id, f),
                  d = this;
                h.onShow = function() {
                  d.className && this.element.addClass(d.className + "_panel");
                  d.setState(CKEDITOR.TRISTATE_ON);
                  b.on = 1;
                  d.editorFocus && a.focus();
                  if(d.onOpen) d.onOpen()
                };
                h.onHide = function(c) {
                  d.className &&
                    this.element.getFirst().removeClass(d.className + "_panel");
                  d.setState(d.modes && d.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                  b.on = 0;
                  if(!c && d.onClose) d.onClose()
                };
                h.onEscape = function() {
                  h.hide(1);
                  d.document.getById(b.id).focus()
                };
                if(this.onBlock) this.onBlock(h, c);
                c.onHide = function() {
                  b.on = 0;
                  d.setState(CKEDITOR.TRISTATE_OFF)
                }
              }
            }
          }
        })
      },
      beforeInit: function(a) {
        a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
      }
    }), CKEDITOR.UI_PANELBUTTON = "panelbutton",
    function() {
      CKEDITOR.plugins.add("panel", {
        beforeInit: function(a) {
          a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
        }
      });
      CKEDITOR.UI_PANEL = "panel";
      CKEDITOR.ui.panel = function(a, b) {
        b && CKEDITOR.tools.extend(this, b);
        CKEDITOR.tools.extend(this, {
          className: "",
          css: []
        });
        this.id = CKEDITOR.tools.getNextId();
        this.document = a;
        this.isFramed = this.forceIFrame || this.css.length;
        this._ = {
          blocks: {}
        }
      };
      CKEDITOR.ui.panel.handler = {
        create: function(a) {
          return new CKEDITOR.ui.panel(a)
        }
      };
      var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
        e = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
        b = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
      CKEDITOR.ui.panel.prototype = {
        render: function(c,
          f) {
          this.getHolderElement = function() {
            var a = this._.holder;
            if(!a) {
              if(this.isFramed) {
                var a = this.document.getById(this.id + "_frame"),
                  c = a.getParent(),
                  a = a.getFrameDocument();
                CKEDITOR.env.iOS && c.setStyles({
                  overflow: "scroll",
                  "-webkit-overflow-scrolling": "touch"
                });
                c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                  this.isLoaded = !0;
                  if(this.onLoad) this.onLoad()
                }, this));
                a.write(b.output(CKEDITOR.tools.extend({
                  css: CKEDITOR.tools.buildStyleHtml(this.css),
                  onload: "window.parent.CKEDITOR.tools.callFunction(" +
                    c + ");"
                }, l)));
                a.getWindow().$.CKEDITOR = CKEDITOR;
                a.on("keydown", function(a) {
                  var b = a.data.getKeystroke(),
                    c = this.document.getById(this.id).getAttribute("dir");
                  this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                }, this);
                a = a.getBody();
                a.unselectable();
                CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
              } else a = this.document.getById(this.id);
              this._.holder = a
            }
            return a
          };
          var l = {
            editorId: c.id,
            id: this.id,
            langCode: c.langCode,
            dir: c.lang.dir,
            cls: this.className,
            frame: "",
            env: CKEDITOR.env.cssClass,
            "z-index": c.config.baseFloatZIndex + 1
          };
          if(this.isFramed) {
            var h = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
            l.frame = e.output({
              id: this.id + "_frame",
              src: h
            })
          }
          h = a.output(l);
          f && f.push(h);
          return h
        },
        addBlock: function(a, b) {
          b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
            b);
          this._.currentBlock || this.showBlock(a);
          return b
        },
        getBlock: function(a) {
          return this._.blocks[a]
        },
        showBlock: function(a) {
          a = this._.blocks[a];
          var b = this._.currentBlock,
            e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
          b && b.hide();
          this._.currentBlock = a;
          CKEDITOR.fire("ariaWidget", e);
          a._.focusIndex = -1;
          this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
          a.show();
          return a
        },
        destroy: function() {
          this.element && this.element.remove()
        }
      };
      CKEDITOR.ui.panel.block =
        CKEDITOR.tools.createClass({
          $: function(a, b) {
            this.element = a.append(a.getDocument().createElement("div", {
              attributes: {
                tabindex: -1,
                "class": "cke_panel_block"
              },
              styles: {
                display: "none"
              }
            }));
            b && CKEDITOR.tools.extend(this, b);
            this.element.setAttributes({
              role: this.attributes.role || "presentation",
              "aria-label": this.attributes["aria-label"],
              title: this.attributes.title || this.attributes["aria-label"]
            });
            this.keys = {};
            this._.focusIndex = -1;
            this.element.disableContextMenu()
          },
          _: {
            markItem: function(a) {
              -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
            },
            markFirstDisplayed: function(a) {
              for(var b = function(a) {
                  return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display")
                }, e = this._.getItems(), h, d, k = e.count() - 1; 0 <= k; k--)
                if(h = e.getItem(k), h.getAscendant(b) || (d = h, this._.focusIndex = k), "true" == h.getAttribute("aria-selected")) {
                  d = h;
                  this._.focusIndex = k;
                  break
                }
              d && (a && a(), CKEDITOR.env.webkit && d.getDocument().getWindow().focus(), d.focus(), this.onMark && this.onMark(d))
            },
            getItems: function() {
              return this.element.getElementsByTag("a")
            }
          },
          proto: {
            show: function() {
              this.element.setStyle("display", "")
            },
            hide: function() {
              this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
            },
            onKeyDown: function(a, b) {
              var e = this.keys[a];
              switch(e) {
                case "next":
                  for(var h = this._.focusIndex, e = this.element.getElementsByTag("a"), d; d = e.getItem(++h);)
                    if(d.getAttribute("_cke_focus") && d.$.offsetWidth) {
                      this._.focusIndex = h;
                      d.focus();
                      break
                    }
                  return d || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a,
                    1));
                case "prev":
                  h = this._.focusIndex;
                  for(e = this.element.getElementsByTag("a"); 0 < h && (d = e.getItem(--h));) {
                    if(d.getAttribute("_cke_focus") && d.$.offsetWidth) {
                      this._.focusIndex = h;
                      d.focus();
                      break
                    }
                    d = null
                  }
                  return d || b ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1));
                case "click":
                case "mouseup":
                  return h = this._.focusIndex, (d = 0 <= h && this.element.getElementsByTag("a").getItem(h)) && (d.$[e] ? d.$[e]() : d.$["on" + e]()), !1
              }
              return !0
            }
          }
        })
    }(), CKEDITOR.plugins.add("floatpanel", {
      requires: "panel"
    }),
    function() {
      function a(a,
        c, f, l, h) {
        h = CKEDITOR.tools.genKey(c.getUniqueId(), f.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", h || "");
        var d = e[h];
        d || (d = e[h] = new CKEDITOR.ui.panel(c, l), d.element = f.append(CKEDITOR.dom.element.createFromHtml(d.render(a), c)), d.element.setStyles({
          display: "none",
          position: "absolute"
        }));
        return d
      }
      var e = {};
      CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
        $: function(b, c, e, l) {
          function h() {
            g.hide()
          }
          e.forceIFrame = 1;
          e.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (c = CKEDITOR.document.getById("cke_" +
            b.name));
          var d = c.getDocument();
          l = a(b, d, c, e, l || 0);
          var k = l.element,
            m = k.getFirst(),
            g = this;
          k.disableContextMenu();
          this.element = k;
          this._ = {
            editor: b,
            panel: l,
            parentElement: c,
            definition: e,
            document: d,
            iframe: m,
            children: [],
            dir: b.lang.dir,
            showBlockParams: null
          };
          b.on("mode", h);
          b.on("resize", h);
          /* zxt - 20170927 */
          if(typeof b.hideAllFloatPanel === 'function') {
            var _hideAllFloatPanel = b.hideAllFloatPanel;
            b.hideAllFloatPanel = function() {
              h(); _hideAllFloatPanel();
            }
          }else{
            b.hideAllFloatPanel = h;
          }
          /* zxt - 20170927 */
          d.getWindow().on("resize", function() {
            this.reposition()
          }, this)
        },
        proto: {
          addBlock: function(a, c) {
            return this._.panel.addBlock(a, c)
          },
          addListBlock: function(a, c) {
            return this._.panel.addListBlock(a, c)
          },
          getBlock: function(a) {
            return this._.panel.getBlock(a)
          },
          showBlock: function(a, c, e, l, h, d) {
            var k = this._.panel,
              m = k.showBlock(a);
            this._.showBlockParams = [].slice.call(arguments);
            this.allowBlur(!1);
            var g = this._.editor.editable();
            this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
            this._.hideTimeout = 0;
            var n = this.element,
              g = this._.iframe,
              g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow),
              p = n.getDocument(),
              t = this._.parentElement.getPositionedAncestor(),
              A = c.getDocumentPosition(p),
              p = t ? t.getDocumentPosition(p) : {
                x: 0,
                y: 0
              },
              u = "rtl" == this._.dir,
              r = A.x + (l || 0) - p.x,
              v = A.y + (h || 0) - p.y;
            !u || 1 != e && 4 != e ? u || 2 != e && 3 != e || (r += c.$.offsetWidth - 1) : r += c.$.offsetWidth;
            if(3 == e || 4 == e) v += c.$.offsetHeight - 1;
            this._.panel._.offsetParentId = c.getId();
            n.setStyles({
              top: v + "px",
              left: 0,
              display: ""
            });
            n.setOpacity(0);
            n.getFirst().removeStyle("width");
            this._.editor.focusManager.add(g);
            this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function(a) {
              function b() {
                delete this._.returnFocus;
                this.hide()
              }
              this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET &&
                this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
            }, this), g.on("focus", function() {
              this._.focused = !0;
              this.hideChild();
              this.allowBlur(!0)
            }, this), CKEDITOR.env.iOS && (g.on("touchstart", function() {
              clearTimeout(this._.hideTimeout)
            }, this), g.on("touchend", function() {
              this._.hideTimeout = 0;
              this.focus()
            }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1);
            k.onEscape = CKEDITOR.tools.bind(function(a) {
              if(this.onEscape &&
                !1 === this.onEscape(a)) return !1
            }, this);
            CKEDITOR.tools.setTimeout(function() {
              var a = CKEDITOR.tools.bind(function() {
                var a = n;
                a.removeStyle("width");
                if(m.autoSize) {
                  var b = m.element.getDocument(),
                    b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? m.element : b.getBody()).$.scrollWidth;
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3);
                  a.setStyle("width", b + 10 + "px");
                  b = m.element.$.scrollHeight;
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight ||
                    0) + 3);
                  a.setStyle("height", b + "px");
                  k._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                } else a.removeStyle("height");
                u && (r -= n.$.offsetWidth);
                n.setStyle("left", r + "px");
                var b = k.element.getWindow(),
                  a = n.$.getBoundingClientRect(),
                  b = b.getViewPaneSize(),
                  c = a.width || a.right - a.left,
                  e = a.height || a.bottom - a.top,
                  f = u ? a.right : b.width - a.left,
                  g = u ? b.width - a.right : a.left;
                u ? f < c && (r = g > c ? r + c : b.width > c ? r - a.left : r - a.right + b.width) : f < c && (r = g > c ? r - c : b.width > c ? r - a.right + b.width : r - a.left);
                c = a.top;
                b.height -
                  a.top < e && (v = c > e ? v - e : b.height > e ? v - a.bottom + b.height : v - a.top);
                CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (r = CKEDITOR.env.ie8Compat ? r - 2 * n.getDocument().getDocumentElement().$.scrollLeft : r - (a.$.scrollWidth - a.$.clientWidth)));
                var a = n.getFirst(),
                  h;
                (h = a.getCustomData("activePanel")) && h.onHide && h.onHide.call(this, 1);
                a.setCustomData("activePanel", this);
                n.setStyles({
                  top: v + "px",
                  left: r + "px"
                });
                n.setOpacity(1);
                d && d()
              }, this);
              k.isLoaded ? a() : k.onLoad = a;
              CKEDITOR.tools.setTimeout(function() {
                  var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                  this.focus();
                  m.element.focus();
                  CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
                  this.allowBlur(!0);
                  CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function() {
                    m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed()
                  }, 0) : m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed();
                  this._.editor.fire("panelShow", this)
                },
                0, this)
            }, CKEDITOR.env.air ? 200 : 0, this);
            this.visible = 1;
            this.onShow && this.onShow.call(this)
          },
          reposition: function() {
            var a = this._.showBlockParams;
            this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
          },
          focus: function() {
            if(CKEDITOR.env.webkit) {
              var a = CKEDITOR.document.getActive();
              a && !a.equals(this._.iframe) && a.$.blur()
            }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
          },
          blur: function() {
            var a = this._.iframe.getFrameDocument().getActive();
            a && a.is("a") && (this._.lastFocused =
              a)
          },
          hide: function(a) {
            if(this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
              this.hideChild();
              CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
              this.element.setStyle("display", "none");
              this.visible = 0;
              this.element.getFirst().removeCustomData("activePanel");
              if(a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
              delete this._.lastFocused;
              this._.showBlockParams = null;
              this._.editor.fire("panelHide", this)
            }
          },
          allowBlur: function(a) {
            var c = this._.panel;
            void 0 !== a && (c.allowBlur = a);
            return c.allowBlur
          },
          showAsChild: function(a, c, e, l, h, d) {
            if(this._.activeChild != a || a._.panel._.offsetParentId != e.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function() {
              CKEDITOR.tools.setTimeout(function() {
                this._.focused || this.hide()
              }, 0, this)
            }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(c, e, l, h, d), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
              a.element.getChild(0).$.style.cssText += ""
            }, 100)
          },
          hideChild: function(a) {
            var c =
              this._.activeChild;
            c && (delete c.onHide, delete this._.activeChild, c.hide(), a && this.focus())
          }
        }
      });
      CKEDITOR.on("instanceDestroyed", function() {
        var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
          c;
        for(c in e) {
          var f = e[c];
          a ? f.destroy() : f.element.hide()
        }
        a && (e = {})
      })
    }(), CKEDITOR.plugins.add("colorbutton", {
      requires: "panelbutton,floatpanel",
      init: function(a) {
        function e(c, d, e, k, t) {
          var A = new CKEDITOR.style(l["colorButton_" + d + "Style"]),
            u = CKEDITOR.tools.getNextId() + "_colorBox",
            r;
          t = t || {};
          a.ui.add(c, CKEDITOR.UI_PANELBUTTON, {
            label: e,
            title: e,
            modes: {
              wysiwyg: 1
            },
            editorFocus: 0,
            toolbar: "colors," + k,
            allowedContent: A,
            requiredContent: A,
            contentTransformations: t.contentTransformations,
            panel: {
              css: CKEDITOR.skin.getPath("editor"),
              attributes: {
                role: "listbox",
                "aria-label": h.panelTitle
              }
            },
            onBlock: function(c, e) {
              r = e;
              e.autoSize = !0;
              e.element.addClass("cke_colorblock");
              e.element.setHtml(b(c, d, u));
              e.element.getDocument().getBody().setStyle("overflow", "hidden");
              CKEDITOR.ui.fire("ready", this);
              var f = e.keys,
                k = "rtl" == a.lang.dir;
              f[k ? 37 : 39] = "next";
              f[40] = "next";
              f[9] = "next";
              f[k ? 39 : 37] = "prev";
              f[38] = "prev";
              f[CKEDITOR.SHIFT + 9] = "prev";
              f[32] = "click"
            },
            refresh: function() {
              a.activeFilter.check(A) || this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            onOpen: function() {
              var b = a.getSelection(),
                c = b && b.getStartElement(),
                e = a.elementPath(c);
              if(e) {
                c = e.block || e.blockLimit || a.document.getBody();
                do e = c && c.getComputedStyle("back" == d ? "background-color" : "color") || "transparent"; while ("back" == d && "transparent" == e && c && (c = c.getParent()));
                e && "transparent" != e || (e = "#ffffff");
                !1 !== l.colorButton_enableAutomatic &&
                  this._.panel._.iframe.getFrameDocument().getById(u).setStyle("background-color", e);
                if(c = b && b.getRanges()[0]) {
                  for(var b = new CKEDITOR.dom.walker(c), k = c.collapsed ? c.startContainer : b.next(), c = ""; k;) {
                    k.type === CKEDITOR.NODE_TEXT && (k = k.getParent());
                    k = f(k.getComputedStyle("back" == d ? "background-color" : "color"));
                    c = c || k;
                    if(c !== k) {
                      c = "";
                      break
                    }
                    k = b.next()
                  }
                  b = c;
                  c = r._.getItems();
                  for(k = 0; k < c.count(); k++) {
                    var h = c.getItem(k);
                    h.removeAttribute("aria-selected");
                    b && b == f(h.getAttribute("data-value")) && h.setAttribute("aria-selected", !0)
                  }
                }
                return e
              }
            }
          })
        }

        function b(b, d, e) {
          b = [];
          var f = l.colorButton_colors.split(","),
            k = l.colorButton_colorsPerRow || 6,
            A = a.plugins.colordialog && !1 !== l.colorButton_enableMore,
            u = f.length + (A ? 2 : 1),
            r = CKEDITOR.tools.addFunction(function(b, d) {
              function e(b) {
                a.removeStyle(new CKEDITOR.style(l["colorButton_" + d + "Style"], {
                  color: "inherit"
                }));
                var f = l["colorButton_" + d + "Style"];
                f.childRule = "back" == d ? function(a) {
                  return c(a)
                } : function(a) {
                  return !(a.is("a") || a.getElementsByTag("a").count()) || c(a)
                };
                a.focus();
                a.applyStyle(new CKEDITOR.style(f, {
                  color: b
                }));
                a.fire("saveSnapshot")
              }
              a.focus();
              a.fire("saveSnapshot");
              if("?" == b) a.getColorFromDialog(function(a) {
                if(a) return e(a)
              });
              else return e(b)
            });
          !1 !== l.colorButton_enableAutomatic && b.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', r, ",null,'", d, "');return false;\" href\x3d\"javascript:void('", h.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', u, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd colspan\x3d"' +
            k + '" align\x3d"center"\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"', e, '"\x3e\x3c/span\x3e', h.auto, "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e");
          b.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e');
          for(e = 0; e < f.length; e++) {
            0 === e % k && b.push("\x3c/tr\x3e\x3ctr\x3e");
            var v = f[e].split("/"),
              w = v[0],
              B = v[1] || w;
            v[1] || (w = "#" + w.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
            v = a.lang.colorbutton.colors[B] || B;
            b.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
              v, '" onclick\x3d"CKEDITOR.tools.callFunction(', r, ",'", w, "','", d, "'); return false;\" href\x3d\"javascript:void('", v, '\')" data-value\x3d"' + B + '" role\x3d"option" aria-posinset\x3d"', e + 2, '" aria-setsize\x3d"', u, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', B, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
          }
          A && b.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d"' + k + '" align\x3d"center"\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.more, '" onclick\x3d"CKEDITOR.tools.callFunction(',
            r, ",'?','", d, "');return false;\" href\x3d\"javascript:void('", h.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', u, '" aria-setsize\x3d"', u, '"\x3e', h.more, "\x3c/a\x3e\x3c/td\x3e");
          b.push("\x3c/tr\x3e\x3c/table\x3e");
          return b.join("")
        }

        function c(a) {
          return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle")
        }

        function f(a) {
          return CKEDITOR.tools.convertRgbToHex(a || "").replace(/#/, "").toLowerCase()
        }
        var l = a.config,
          h = a.lang.colorbutton;
        if(!CKEDITOR.env.hc) {
          e("TextColor", "fore", h.textColorTitle,
            10, {
              contentTransformations: [
                [{
                  element: "font",
                  check: "span{color}",
                  left: function(a) {
                    return !!a.attributes.color
                  },
                  right: function(a) {
                    a.name = "span";
                    a.attributes.color && (a.styles.color = a.attributes.color);
                    delete a.attributes.color
                  }
                }]
              ]
            });
          var d = {},
            k = a.config.colorButton_normalizeBackground;
          if(void 0 === k || k) d.contentTransformations = [
            [{
              element: "span",
              left: function(a) {
                var b = CKEDITOR.tools;
                if("span" != a.name || !a.styles || !a.styles.background) return !1;
                a = b.style.parse.background(a.styles.background);
                return a.color &&
                  1 === b.objectKeys(a).length
              },
              right: function(b) {
                var c = (new CKEDITOR.style(a.config.colorButton_backStyle, {
                  color: b.styles.background
                })).getDefinition();
                b.name = c.element;
                b.styles = c.styles;
                b.attributes = c.attributes || {};
                return b
              }
            }]
          ];
          e("BGColor", "back", h.bgColorTitle, 20, d)
        }
      }
    }), CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000", CKEDITOR.config.colorButton_foreStyle = {
      element: "span",
      styles: {
        color: "#(color)"
      },
      overrides: [{
        element: "font",
        attributes: {
          color: null
        }
      }]
    }, CKEDITOR.config.colorButton_backStyle = {
      element: "span",
      styles: {
        "background-color": "#(color)"
      }
    }, CKEDITOR.plugins.colordialog = {
      requires: "dialog",
      init: function(a) {
        var e = new CKEDITOR.dialogCommand("colordialog");
        e.editorFocus = !1;
        a.addCommand("colordialog", e);
        CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
        a.getColorFromDialog = function(b, c) {
          var e, l, h;
          e = function(a) {
            l(this);
            a = "ok" == a.name ?
              this.getValueOf("picker", "selectedColor") : null;
            /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a) && (a = "#" + a);
            b.call(c, a)
          };
          l = function(a) {
            a.removeListener("ok", e);
            a.removeListener("cancel", e)
          };
          h = function(a) {
            a.on("ok", e);
            a.on("cancel", e)
          };
          a.execCommand("colordialog");
          if(a._.storedDialogs && a._.storedDialogs.colordialog) h(a._.storedDialogs.colordialog);
          else CKEDITOR.on("dialogDefinition", function(a) {
            if("colordialog" == a.data.name) {
              var b = a.data.definition;
              a.removeListener();
              b.onLoad = CKEDITOR.tools.override(b.onLoad,
                function(a) {
                  return function() {
                    h(this);
                    b.onLoad = a;
                    "function" == typeof a && a.call(this)
                  }
                })
            }
          })
        }
      }
    }, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog),
    function() {
      function a(a, b, c, e) {
        var f = new CKEDITOR.dom.walker(a);
        if(a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0))
          if(c(a), e) return;
        for(; a = f.next();)
          if(a = a.getAscendant(b, !0))
            if(c(a), e) break
      }

      function e(a, b) {
        var e = {
          ul: "ol",
          ol: "ul"
        };
        return -1 !== c(b, function(b) {
          return b.element === a || b.element === e[a]
        })
      }

      function b(a) {
        this.styles =
          null;
        this.sticky = !1;
        this.editor = a;
        this.filter = new CKEDITOR.filter(a.config.copyFormatting_allowRules);
        !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0);
        a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules)
      }
      var c = CKEDITOR.tools.indexOf,
        f = CKEDITOR.tools.getMouseButton,
        l = !1;
      CKEDITOR.plugins.add("copyformatting", {
        lang: "az,de,en,it,ja,nb,nl,oc,pl,pt-br,ru,sv,tr,zh,zh-cn",
        icons: "copyformatting",
        hidpi: !0,
        init: function(a) {
          var b = CKEDITOR.plugins.copyformatting;
          b._addScreenReaderContainer();
          l || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"), l = !0);
          a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css");
          a.copyFormatting = new b.state(a);
          a.addCommand("copyFormatting", b.commands.copyFormatting);
          a.addCommand("applyFormatting", b.commands.applyFormatting);
          a.ui.addButton("CopyFormatting", {
            label: a.lang.copyformatting.label,
            command: "copyFormatting",
            toolbar: "cleanup,0"
          });
          a.on("contentDom", function() {
            var b = a.editable(),
              c = b.isInline() ?
              b : a.document,
              d = a.ui.get("CopyFormatting");
            b.attachListener(c, "mouseup", function(b) {
              f(b) === CKEDITOR.MOUSE_BUTTON_LEFT && a.execCommand("applyFormatting")
            });
            b.attachListener(CKEDITOR.document, "mouseup", function(c) {
              var d = a.getCommand("copyFormatting");
              f(c) !== CKEDITOR.MOUSE_BUTTON_LEFT || d.state !== CKEDITOR.TRISTATE_ON || b.contains(c.data.getTarget()) || a.execCommand("copyFormatting")
            });
            d && (c = CKEDITOR.document.getById(d._.id), b.attachListener(c, "dblclick", function() {
                a.execCommand("copyFormatting", {
                  sticky: !0
                })
              }),
              b.attachListener(c, "mouseup", function(a) {
                a.data.stopPropagation()
              }))
          });
          a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting");
          a.on("key", function(b) {
            var c = a.getCommand("copyFormatting");
            b = b.data.domEvent;
            b.getKeystroke && 27 === b.getKeystroke() && c.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting")
          });
          a.copyFormatting.on("extractFormatting", function(c) {
            var e = c.data.element;
            if(e.contains(a.editable()) || e.equals(a.editable())) return c.cancel();
            e = b._convertElementToStyleDef(e);
            if(!a.copyFormatting.filter.check(new CKEDITOR.style(e), !0, !0)) return c.cancel();
            c.data.styleDef = e
          });
          a.copyFormatting.on("applyFormatting", function(f) {
            if(!f.data.preventFormatStripping) {
              var m = f.data.range,
                g = b._extractStylesFromRange(a, m),
                l = b._determineContext(m),
                p, t;
              if(a.copyFormatting._isContextAllowed(l))
                for(t = 0; t < g.length; t++) l = g[t], p = m.createBookmark(), -1 === c(b.preservedElements, l.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? g[t].removeFromRange(f.data.range,
                  f.editor) : g[t].remove(f.editor) : e(l.element, f.data.styles) && b._removeStylesFromElementInRange(m, l.element), m.moveToBookmark(p)
            }
          });
          a.copyFormatting.on("applyFormatting", function(b) {
            var c = CKEDITOR.plugins.copyformatting,
              d = c._determineContext(b.data.range);
            "list" === d && a.copyFormatting._isContextAllowed("list") ? c._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === d && a.copyFormatting._isContextAllowed("table") ? c._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") &&
              c._applyStylesToTextContext(b.editor, b.data.range, b.data.styles)
          }, null, null, 999)
        }
      });
      b.prototype._isContextAllowed = function(a) {
        var b = this.editor.config.copyFormatting_allowedContexts;
        return !0 === b || -1 !== c(b, a)
      };
      CKEDITOR.event.implementOn(b.prototype);
      CKEDITOR.plugins.copyformatting = {
        state: b,
        inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "),
        excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"],
        elementsForInlineTransform: ["li"],
        excludedElementsFromInlineTransform: ["table", "thead", "tbody",
          "ul", "ol"
        ],
        excludedAttributesFromInlineTransform: ["value", "type"],
        preservedElements: "ul ol li td th tr thead tbody table".split(" "),
        breakOnElements: ["ul", "ol", "table"],
        _initialKeystrokePasteCommand: null,
        commands: {
          copyFormatting: {
            exec: function(a, b) {
              var c = CKEDITOR.plugins.copyformatting,
                e = a.copyFormatting,
                f = b ? "keystrokeHandler" == b.from : !1,
                l = b ? b.sticky || f : !1,
                p = c._getCursorContainer(a),
                t = CKEDITOR.document.getDocumentElement();
              if(this.state === CKEDITOR.TRISTATE_ON) return e.styles = null, e.sticky = !1, p.removeClass("cke_copyformatting_active"),
                t.removeClass("cke_copyformatting_disabled"), t.removeClass("cke_copyformatting_tableresize_cursor"), c._putScreenReaderMessage(a, "canceled"), c._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF);
              e.styles = c._extractStylesFromElement(a, a.elementPath().lastElement);
              this.setState(CKEDITOR.TRISTATE_ON);
              f || (p.addClass("cke_copyformatting_active"), t.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && t.addClass("cke_copyformatting_disabled"));
              e.sticky = l;
              c._putScreenReaderMessage(a, "copied");
              c._attachPasteKeystrokeHandler(a)
            }
          },
          applyFormatting: {
            editorFocus: !1,
            exec: function(a, b) {
              var c = a.getCommand("copyFormatting"),
                e = b ? "keystrokeHandler" == b.from : !1,
                f = CKEDITOR.plugins.copyformatting,
                l = a.copyFormatting,
                p = f._getCursorContainer(a),
                t = CKEDITOR.document.getDocumentElement();
              if(e || c.state === CKEDITOR.TRISTATE_ON) {
                if(e && !l.styles) return f._putScreenReaderMessage(a, "failed"), f._detachPasteKeystrokeHandler(a), !1;
                e = f._applyFormat(a, l.styles);
                l.sticky || (l.styles =
                  null, p.removeClass("cke_copyformatting_active"), t.removeClass("cke_copyformatting_disabled"), t.removeClass("cke_copyformatting_tableresize_cursor"), c.setState(CKEDITOR.TRISTATE_OFF), f._detachPasteKeystrokeHandler(a));
                f._putScreenReaderMessage(a, e ? "applied" : "canceled")
              }
            }
          }
        },
        _getCursorContainer: function(a) {
          return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent()
        },
        _convertElementToStyleDef: function(a) {
          var b = CKEDITOR.tools,
            c = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes),
            b = b.parseCssText(a.getAttribute("style"), !0, !0);
          return {
            element: a.getName(),
            type: CKEDITOR.STYLE_INLINE,
            attributes: c,
            styles: b
          }
        },
        _extractStylesFromElement: function(a, b) {
          var e = {},
            f = [];
          do
            if(b.type === CKEDITOR.NODE_ELEMENT && !b.hasAttribute("data-cke-bookmark") && (e.element = b, a.copyFormatting.fire("extractFormatting", e, a) && e.styleDef && f.push(new CKEDITOR.style(e.styleDef)), b.getName && -1 !== c(CKEDITOR.plugins.copyformatting.breakOnElements, b.getName()))) break; while ((b = b.getParent()) && b.type === CKEDITOR.NODE_ELEMENT);
          return f
        },
        _extractStylesFromRange: function(a, b) {
          for(var c = [], e = new CKEDITOR.dom.walker(b), f; f = e.next();) c = c.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, f));
          return c
        },
        _removeStylesFromElementInRange: function(a, b) {
          for(var e = -1 !== c(["ol", "ul", "table"], b), f = new CKEDITOR.dom.walker(a), g; g = f.next();)
            if(g = g.getAscendant(b, !0))
              if(g.removeAttributes(g.getAttributes()), e) break
        },
        _getSelectedWordOffset: function(a) {
          function b(a, c) {
            return a[c ? "getPrevious" : "getNext"](function(a) {
              return a.type !==
                CKEDITOR.NODE_COMMENT
            })
          }

          function e(a) {
            return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText()
          }

          function f(a, g) {
            var h = a,
              l = /\s/g,
              n = "p br ol ul li td th div caption body".split(" "),
              z = !1,
              y = !1,
              x, p;
            do {
              for(x = b(h, g); !x && h.getParent();) {
                h = h.getParent();
                if(-1 !== c(n, h.getName())) {
                  y = z = !0;
                  break
                }
                x = b(h, g)
              }
              if(x && x.getName && -1 !== c(n, x.getName())) {
                z = !0;
                break
              }
              h = x
            } while (h && h.getStyle && ("none" == h.getStyle("display") || !h.getText()));
            for(h || (h = a); h.type !==
              CKEDITOR.NODE_TEXT;) h = !z || g || y ? h.getChild(0) : h.getChild(h.getChildCount() - 1);
            for(n = e(h); null != (y = l.exec(n)) && (p = y.index, g););
            if("number" !== typeof p && !z) return f(h, g);
            if(z) g ? p = 0 : (l = /([\.\b]*$)/, p = (y = l.exec(n)) ? y.index : n.length);
            else if(g && (p += 1, p > n.length)) return f(h);
            return {
              node: h,
              offset: p
            }
          }
          var g = /\b\w+\b/ig,
            l, p, t, A, u;
          t = A = u = a.startContainer;
          for(l = e(t); null != (p = g.exec(l));)
            if(p.index + p[0].length >= a.startOffset) return a = p.index, g = p.index + p[0].length, 0 === p.index && (p = f(t, !0), A = p.node, a = p.offset), g >= l.length &&
              (l = f(t), u = l.node, g = l.offset), {
                startNode: A,
                startOffset: a,
                endNode: u,
                endOffset: g
              };
          return null
        },
        _filterStyles: function(a) {
          var b = CKEDITOR.tools.isEmpty,
            c = [],
            e, f;
          for(f = 0; f < a.length; f++) e = a[f]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary, e.element) && (e.element = a[f].element = "span"), "span" === e.element && b(e.attributes) && b(e.styles) || c.push(a[f]);
          return c
        },
        _determineContext: function(a) {
          function b(c) {
            var d = new CKEDITOR.dom.walker(a),
              e;
            if(a.startContainer.getAscendant(c, !0) || a.endContainer.getAscendant(c, !0)) return !0;
            for(; e = d.next();)
              if(e.getAscendant(c, !0)) return !0
          }
          return b({
            ul: 1,
            ol: 1
          }) ? "list" : b("table") ? "table" : "text"
        },
        _applyStylesToTextContext: function(a, b, e) {
          var f = CKEDITOR.plugins.copyformatting,
            g = f.excludedAttributesFromInlineTransform,
            l, p;
          CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([b]);
          for(l = 0; l < e.length; l++)
            if(b = e[l], -1 === c(f.excludedElementsFromInlineTransform, b.element)) {
              if(-1 !== c(f.elementsForInlineTransform, b.element))
                for(b.element =
                  b._.definition.element = "span", p = 0; p < g.length; p++) b._.definition.attributes[g[p]] && delete b._.definition.attributes[g[p]];
              b.apply(a)
            }
        },
        _applyStylesToListContext: function(b, c, e) {
          var f, g, l;
          for(l = 0; l < e.length; l++) f = e[l], g = c.createBookmark(), "ol" === f.element || "ul" === f.element ? a(c, {
            ul: 1,
            ol: 1
          }, function(a) {
            var b = f;
            a.getName() !== b.element && a.renameNode(b.element);
            b.applyToObject(a)
          }, !0) : "li" === f.element ? a(c, "li", function(a) {
            f.applyToObject(a)
          }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, c, [f]), c.moveToBookmark(g)
        },
        _applyStylesToTableContext: function(b, d, e) {
          function f(a, b) {
            a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b));
            b.applyToObject(a)
          }
          var g, l, p;
          for(p = 0; p < e.length; p++) g = e[p], l = d.createBookmark(), -1 !== c(["table", "tr"], g.element) ? a(d, g.element, function(a) {
            g.applyToObject(a)
          }) : -1 !== c(["td", "th"], g.element) ? a(d, {
            td: 1,
            th: 1
          }, function(a) {
            f(a, g)
          }) : -1 !== c(["thead", "tbody"], g.element) ? a(d, {
            thead: 1,
            tbody: 1
          }, function(a) {
            f(a, g)
          }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b,
            d, [g]), d.moveToBookmark(l)
        },
        _applyFormat: function(a, b) {
          var c = a.getSelection().getRanges()[0],
            e = CKEDITOR.plugins.copyformatting,
            f, l;
          if(!c) return !1;
          if(c.collapsed) {
            l = a.getSelection().createBookmarks();
            if(!(f = e._getSelectedWordOffset(c))) return;
            c = a.createRange();
            c.setStart(f.startNode, f.startOffset);
            c.setEnd(f.endNode, f.endOffset);
            c.select()
          }
          b = e._filterStyles(b);
          if(!a.copyFormatting.fire("applyFormatting", {
              styles: b,
              range: c,
              preventFormatStripping: !1
            }, a)) return !1;
          l && a.getSelection().selectBookmarks(l);
          return !0
        },
        _putScreenReaderMessage: function(a, b) {
          var c = this._getScreenReaderContainer();
          c && c.setText(a.lang.copyformatting.notification[b])
        },
        _addScreenReaderContainer: function() {
          if(this._getScreenReaderContainer()) return this._getScreenReaderContainer();
          if(!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0)
        },
        _getScreenReaderContainer: function() {
          if(!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]")
        },
        _attachPasteKeystrokeHandler: function(a) {
          var b = a.config.copyFormatting_keystrokePaste;
          b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting"))
        },
        _detachPasteKeystrokeHandler: function(a) {
          var b = a.config.copyFormatting_keystrokePaste;
          b && a.setKeystroke(b, this._initialKeystrokePasteCommand ||
            !1)
        }
      };
      CKEDITOR.config.copyFormatting_outerCursor = !0;
      CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}";
      CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)";
      CKEDITOR.config.copyFormatting_allowedContexts = !0;
      CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67;
      CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
    }(), CKEDITOR.plugins.add("menu", {
      requires: "floatpanel",
      beforeInit: function(a) {
        for(var e = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, f = 0; f < e.length; f++) b[e[f]] = f + 1;
        a.addMenuGroup = function(a, c) {
          b[a] = c || 100
        };
        a.addMenuItem = function(a, e) {
          b[e.group] && (c[a] = new CKEDITOR.menuItem(this, a, e))
        };
        a.addMenuItems = function(a) {
          for(var b in a) this.addMenuItem(b, a[b])
        };
        a.getMenuItem = function(a) {
          return c[a]
        };
        a.removeMenuItem = function(a) {
          delete c[a]
        }
      }
    }),
    function() {
      function a(a) {
        a.sort(function(a, b) {
          return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order <
            b.order ? -1 : a.order > b.order ? 1 : 0
        })
      }
      var e = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');
      var e = e + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),
        b = CKEDITOR.addTemplate("menuItem", e + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
        c = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
        f = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');
      CKEDITOR.menu = CKEDITOR.tools.createClass({
        $: function(a, b) {
          b = this._.definition = b || {};
          this.id = CKEDITOR.tools.getNextId();
          this.editor = a;
          this.items = [];
          this._.listeners = [];
          this._.level = b.level || 1;
          var c = CKEDITOR.tools.extend({}, b.panel, {
              css: [CKEDITOR.skin.getPath("editor")],
              level: this._.level - 1,
              block: {}
            }),
            e = c.block.attributes = c.attributes || {};
          !e.role && (e.role = "menu");
          this._.panelDefinition = c
        },
        _: {
          onShow: function() {
            var a = this.editor.getSelection(),
              b = a && a.getStartElement(),
              c = this.editor.elementPath(),
              e = this._.listeners;
            this.removeAll();
            for(var f = 0; f < e.length; f++) {
              var g = e[f](b, a, c);
              if(g)
                for(var n in g) {
                  var p = this.editor.getMenuItem(n);
                  !p || p.command && !this.editor.getCommand(p.command).state || (p.state = g[n], this.add(p))
                }
            }
          },
          onClick: function(a) {
            this.hide();
            if(a.onClick) a.onClick();
            else a.command && this.editor.execCommand(a.command)
          },
          onEscape: function(a) {
            var b = this.parent;
            b ? b._.panel.hideChild(1) : 27 == a && this.hide(1);
            return !1
          },
          onHide: function() {
            this.onHide && this.onHide()
          },
          showSubMenu: function(a) {
            var b = this._.subMenu,
              c = this.items[a];
            if(c = c.getItems && c.getItems()) {
              b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                level: this._.level + 1
              }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
              for(var e in c) {
                var f =
                  this.editor.getMenuItem(e);
                f && (f.state = c[e], b.add(f))
              }
              var g = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a));
              setTimeout(function() {
                b.show(g, 2)
              }, 0)
            } else this._.panel.hideChild(1)
          }
        },
        proto: {
          add: function(a) {
            a.order || (a.order = this.items.length);
            this.items.push(a)
          },
          removeAll: function() {
            this.items = []
          },
          show: function(b, c, d, e) {
            if(!this.parent && (this._.onShow(), !this.items.length)) return;
            c = c || ("rtl" == this.editor.lang.dir ? 2 : 1);
            var f = this.items,
              g = this.editor,
              n = this._.panel,
              p = this._.element;
            if(!n) {
              n = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
              n.onEscape = CKEDITOR.tools.bind(function(a) {
                if(!1 === this._.onEscape(a)) return !1
              }, this);
              n.onShow = function() {
                n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
              };
              n.onHide = CKEDITOR.tools.bind(function() {
                this._.onHide && this._.onHide()
              }, this);
              p = n.addBlock(this.id, this._.panelDefinition.block);
              p.autoSize = !0;
              var t = p.keys;
              t[40] = "next";
              t[9] = "next";
              t[38] =
                "prev";
              t[CKEDITOR.SHIFT + 9] = "prev";
              t["rtl" == g.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
              t[32] = CKEDITOR.env.ie ? "mouseup" : "click";
              CKEDITOR.env.ie && (t[13] = "mouseup");
              p = this._.element = p.element;
              t = p.getDocument();
              t.getBody().setStyle("overflow", "hidden");
              t.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
              this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
                clearTimeout(this._.showSubTimeout);
                this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, g.config.menu_subMenuDelay ||
                  400, this, [a])
              }, this);
              this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                clearTimeout(this._.showSubTimeout)
              }, this);
              this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                var b = this.items[a];
                if(b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                else if(b.getItems) this._.showSubMenu(a);
                else this._.onClick(b)
              }, this)
            }
            a(f);
            for(var t = g.elementPath(), t = ['\x3cdiv class\x3d"cke_menu' + (t && t.direction() != g.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], A = f.length, u = A && f[0].group,
                r = 0; r < A; r++) {
              var v = f[r];
              u != v.group && (t.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), u = v.group);
              v.render(this, r, t)
            }
            t.push("\x3c/div\x3e");
            p.setHtml(t.join(""));
            CKEDITOR.ui.fire("ready", this);
            this.parent ? this.parent._.panel.showAsChild(n, this.id, b, c, d, e) : n.showBlock(this.id, b, c, d, e);
            g.fire("menuShow", [n])
          },
          addListener: function(a) {
            this._.listeners.push(a)
          },
          hide: function(a) {
            this._.onHide && this._.onHide();
            this._.panel && this._.panel.hide(a)
          }
        }
      });
      CKEDITOR.menuItem = CKEDITOR.tools.createClass({
        $: function(a,
          b, c) {
          CKEDITOR.tools.extend(this, c, {
            order: 0,
            className: "cke_menubutton__" + b
          });
          this.group = a._.menuGroups[this.group];
          this.editor = a;
          this.name = b
        },
        proto: {
          render: function(a, e, d) {
            var k = a.id + String(e),
              m = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
              g = "",
              n = this.editor,
              p, t, A = m == CKEDITOR.TRISTATE_ON ? "on" : m == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
            this.role in {
              menuitemcheckbox: 1,
              menuitemradio: 1
            } && (g = ' aria-checked\x3d"' + (m == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
            var u = this.getItems,
              r =
              "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
              v = this.name;
            this.icon && !/\./.test(this.icon) && (v = this.icon);
            this.command && (p = n.getCommand(this.command), (p = n.getCommandKeystroke(p)) && (t = CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard, p)));
            a = {
              id: k,
              name: this.name,
              iconName: v,
              label: this.label,
              cls: this.className || "",
              state: A,
              hasPopup: u ? "true" : "false",
              disabled: m == CKEDITOR.TRISTATE_DISABLED,
              title: this.label + (t ? " (" + t.display + ")" : ""),
              ariaShortcut: t ? n.lang.common.keyboardShortcut + " " + t.aria : "",
              href: "javascript:void('" + (this.label || "").replace("'") + "')",
              hoverFn: a._.itemOverFn,
              moveOutFn: a._.itemOutFn,
              clickFn: a._.itemClickFn,
              index: e,
              iconStyle: CKEDITOR.skin.getIconStyle(v, "rtl" == this.editor.lang.dir, v == this.icon ? null : this.icon, this.iconOffset),
              shortcutHtml: t ? f.output({
                shortcut: t.display
              }) : "",
              arrowHtml: u ? c.output({
                label: r
              }) : "",
              role: this.role ? this.role : "menuitem",
              ariaChecked: g
            };
            b.output(a, d)
          }
        }
      })
    }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
    CKEDITOR.plugins.add("contextmenu", {
      requires: "menu",
      onLoad: function() {
        CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
          base: CKEDITOR.menu,
          $: function(a) {
            this.base.call(this, a, {
              panel: {
                className: "cke_menu_panel",
                attributes: {
                  "aria-label": a.lang.contextmenu.options
                }
              }
            })
          },
          proto: {
            addTarget: function(a, e) {
              a.on("contextmenu", function(a) {
                a = a.data;
                var c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                if(!e || !c) {
                  a.preventDefault();
                  if(CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                    var c = this.editor,
                      h = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function(a) {
                        return a.hasAttribute("contenteditable")
                      }, !0);
                    h && "false" == h.getAttribute("contenteditable") && c.getSelection().fake(h)
                  }
                  var h = a.getTarget().getDocument(),
                    d = a.getTarget().getDocument().getDocumentElement(),
                    c = !h.equals(CKEDITOR.document),
                    h = h.getWindow().getScrollPosition(),
                    k = c ? a.$.clientX : a.$.pageX || h.x + a.$.clientX,
                    m = c ? a.$.clientY : a.$.pageY || h.y + a.$.clientY;
                  CKEDITOR.tools.setTimeout(function() {
                      this.open(d, null, k, m)
                    }, CKEDITOR.env.ie ?
                    200 : 0, this)
                }
              }, this);
              if(CKEDITOR.env.webkit) {
                var b, c = function() {
                  b = 0
                };
                a.on("keydown", function(a) {
                  b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
                });
                a.on("keyup", c);
                a.on("contextmenu", c)
              }
            },
            open: function(a, e, b, c) {
              !1 !== this.editor.config.enableContextMenu && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, e, b, c))
            }
          }
        })
      },
      beforeInit: function(a) {
        var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
        a.on("contentDom", function() {
          e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl)
        });
        a.addCommand("contextMenu", {
          exec: function() {
            a.contextMenu.open(a.document.getBody())
          }
        });
        a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
        a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
      }
    }),
    function() {
      function a(a) {
        var b = this.att;
        a = a && a.hasAttribute(b) && a.getAttribute(b) || "";
        void 0 !== a && this.setValue(a)
      }

      function e() {
        for(var a, b = 0; b < arguments.length; b++)
          if(arguments[b] instanceof CKEDITOR.dom.element) {
            a = arguments[b];
            break
          }
        if(a) {
          var b = this.att,
            e =
            this.getValue();
          e ? a.setAttribute(b, e) : a.removeAttribute(b, e)
        }
      }
      var b = {
        id: 1,
        dir: 1,
        classes: 1,
        styles: 1
      };
      CKEDITOR.plugins.add("dialogadvtab", {
        requires: "dialog",
        allowedContent: function(a) {
          a || (a = b);
          var e = [];
          a.id && e.push("id");
          a.dir && e.push("dir");
          var l = "";
          e.length && (l += "[" + e.join(",") + "]");
          a.classes && (l += "(*)");
          a.styles && (l += "{*}");
          return l
        },
        createAdvancedTab: function(c, f, l) {
          f || (f = b);
          var h = c.lang.common,
            d = {
              id: "advanced",
              label: h.advancedTab,
              title: h.advancedTab,
              elements: [{
                type: "vbox",
                padding: 1,
                children: []
              }]
            },
            k = [];
          if(f.id || f.dir) f.id && k.push({
            id: "advId",
            att: "id",
            type: "text",
            requiredContent: l ? l + "[id]" : null,
            label: h.id,
            setup: a,
            commit: e
          }), f.dir && k.push({
            id: "advLangDir",
            att: "dir",
            type: "select",
            requiredContent: l ? l + "[dir]" : null,
            label: h.langDir,
            "default": "",
            style: "width:100%",
            items: [
              [h.notSet, ""],
              [h.langDirLTR, "ltr"],
              [h.langDirRTL, "rtl"]
            ],
            setup: a,
            commit: e
          }), d.elements[0].children.push({
            type: "hbox",
            widths: ["50%", "50%"],
            children: [].concat(k)
          });
          if(f.styles || f.classes) k = [], f.styles && k.push({
              id: "advStyles",
              att: "style",
              type: "text",
              requiredContent: l ? l + "{cke-xyz}" : null,
              label: h.styles,
              "default": "",
              validate: CKEDITOR.dialog.validate.inlineStyle(h.invalidInlineStyle),
              onChange: function() {},
              getStyle: function(a, b) {
                var c = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i"));
                return c ? c[1] : b
              },
              updateStyle: function(a, b) {
                var d = this.getValue(),
                  e = c.document.createElement("span");
                e.setAttribute("style", d);
                e.setStyle(a, b);
                d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
                this.setValue(d, 1)
              },
              setup: a,
              commit: e
            }),
            f.classes && k.push({
              type: "hbox",
              widths: ["45%", "55%"],
              children: [{
                id: "advCSSClasses",
                att: "class",
                type: "text",
                requiredContent: l ? l + "(cke-xyz)" : null,
                label: h.cssClasses,
                "default": "",
                setup: a,
                commit: e
              }]
            }), d.elements[0].children.push({
              type: "hbox",
              widths: ["50%", "50%"],
              children: [].concat(k)
            });
          return d
        }
      })
    }(),
    function() {
      CKEDITOR.plugins.add("div", {
        requires: "dialog",
        init: function(a) {
          if(!a.blockless) {
            var e = a.lang.div,
              b = "div(*)";
            CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
            a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
              allowedContent: b,
              requiredContent: "div",
              contextSensitive: !0,
              contentTransformations: [
                ["div: alignmentToStyle"]
              ],
              refresh: function(a, b) {
                this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
              }
            }));
            a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", {
              requiredContent: "div"
            }));
            a.addCommand("removediv", {
              requiredContent: "div",
              exec: function(a) {
                function b(d) {
                  (d = CKEDITOR.plugins.div.getSurroundDiv(a,
                    d)) && !d.data("cke-div-added") && (m.push(d), d.data("cke-div-added"))
                }
                for(var e = a.getSelection(), h = e && e.getRanges(), d, k = e.createBookmarks(), m = [], g = 0; g < h.length; g++) d = h[g], d.collapsed ? b(e.getStartElement()) : (d = new CKEDITOR.dom.walker(d), d.evaluator = b, d.lastForward());
                for(g = 0; g < m.length; g++) m[g].remove(!0);
                e.selectBookmarks(k)
              }
            });
            a.ui.addButton && a.ui.addButton("CreateDiv", {
              label: e.toolbar,
              command: "creatediv",
              toolbar: "blocks,50"
            });
            a.addMenuItems && (a.addMenuItems({
              editdiv: {
                label: e.edit,
                command: "editdiv",
                group: "div",
                order: 1
              },
              removediv: {
                label: e.remove,
                command: "removediv",
                group: "div",
                order: 5
              }
            }), a.contextMenu && a.contextMenu.addListener(function(b) {
              return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
                editdiv: CKEDITOR.TRISTATE_OFF,
                removediv: CKEDITOR.TRISTATE_OFF
              } : null
            }));
            CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
            CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
          }
        }
      });
      CKEDITOR.plugins.div = {
        getSurroundDiv: function(a, e) {
          var b = a.elementPath(e);
          return a.elementPath(b.blockLimit).contains(function(a) {
            return a.is("div") &&
              !a.isReadOnly()
          }, 1)
        }
      }
    }(),
    function() {
      function a(a, b) {
        function h(b) {
          b = g.list[b];
          var c;
          b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (c = a.createRange(), c.selectNodeContents(b), c = c.select()) : (c = a.getSelection(), c.selectElement(b));
          CKEDITOR.env.ie && a.fire("selectionChange", {
            selection: c,
            path: new CKEDITOR.dom.elementPath(b)
          });
          a.focus()
        }

        function d() {
          m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
          delete g.list
        }
        var k = a.ui.spaceId("path"),
          m, g = a._.elementsPath,
          n = g.idBase;
        b.html += '\x3cspan id\x3d"' + k + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + k + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + k + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
        a.on("uiReady", function() {
          var b = a.ui.space("path");
          b && a.focusManager.add(b, 1)
        });
        g.onClick = h;
        var p = CKEDITOR.tools.addFunction(h),
          t = CKEDITOR.tools.addFunction(function(b, c) {
            var d = g.idBase,
              e;
            c = new CKEDITOR.dom.event(c);
            e = "rtl" == a.lang.dir;
            switch(c.getKeystroke()) {
              case e ? 39:
                37:
                  case 9:
                return(e = CKEDITOR.document.getById(d + (b + 1))) || (e = CKEDITOR.document.getById(d + "0")), e.focus(), !1;
              case e ? 37:
                39:
                  case CKEDITOR.SHIFT + 9:
                return(e = CKEDITOR.document.getById(d + (b - 1))) || (e = CKEDITOR.document.getById(d + (g.list.length - 1))), e.focus(), !1;
              case 27:
                return a.focus(), !1;
              case 13:
              case 32:
                return h(b), !1
            }
            return !0
          });
        a.on("selectionChange", function() {
          for(var b = [], d = g.list = [], e = [], h = g.filters, l = !0, B = a.elementPath().elements, q, z = B.length; z--;) {
            var y =
              B[z],
              x = 0;
            q = y.data("cke-display-name") ? y.data("cke-display-name") : y.data("cke-real-element-type") ? y.data("cke-real-element-type") : y.getName();
            (l = y.hasAttribute("contenteditable") ? "true" == y.getAttribute("contenteditable") : l) || y.hasAttribute("contenteditable") || (x = 1);
            for(var C = 0; C < h.length; C++) {
              var D = h[C](y, q);
              if(!1 === D) {
                x = 1;
                break
              }
              q = D || q
            }
            x || (d.unshift(y), e.unshift(q))
          }
          d = d.length;
          for(h = 0; h < d; h++) q = e[h], l = a.lang.elementspath.eleTitle.replace(/%1/, q), q = c.output({
            id: n + h,
            label: l,
            text: q,
            jsTitle: "javascript:void('" +
              q + "')",
            index: h,
            keyDownFn: t,
            clickFn: p
          }), b.unshift(q);
          m || (m = CKEDITOR.document.getById(k));
          e = m;
          e.setHtml(b.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
          a.fire("elementsPathUpdate", {
            space: e
          })
        });
        a.on("readOnly", d);
        a.on("contentDomUnload", d);
        a.addCommand("elementsPathFocus", e.toolbarFocus);
        a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
      }
      var e = {
          toolbarFocus: {
            editorFocus: !1,
            readOnly: 1,
            exec: function(a) {
              (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie ||
                CKEDITOR.env.air)
            }
          }
        },
        b = "";
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var c = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + b + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
      CKEDITOR.plugins.add("elementspath", {
        init: function(b) {
          b._.elementsPath = {
            idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
            filters: []
          };
          b.on("uiSpace", function(c) {
            "bottom" == c.data.space && a(b, c.data)
          })
        }
      })
    }(),
    function() {
      function a(a, b, c) {
        c = a.config.forceEnterMode || c;
        if("wysiwyg" == a.mode) {
          b || (b = a.activeEnterMode);
          var e = a.elementPath();
          e && !e.isContextFor("p") && (b = CKEDITOR.ENTER_BR, c = 1);
          a.fire("saveSnapshot");
          b == CKEDITOR.ENTER_BR ? h(a, b, null, c) : d(a, b, null, c);
          a.fire("saveSnapshot")
        }
      }

      function e(a) {
        a =
          a.getSelection().getRanges(!0);
        for(var b = a.length - 1; 0 < b; b--) a[b].deleteContents();
        return a[0]
      }

      function b(a) {
        var b = a.startContainer.getAscendant(function(a) {
          return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
        }, !0);
        if(a.root.equals(b)) return a;
        b = new CKEDITOR.dom.range(b);
        b.moveToRange(a);
        return b
      }
      CKEDITOR.plugins.add("enterkey", {
        init: function(b) {
          b.addCommand("enter", {
            modes: {
              wysiwyg: 1
            },
            editorFocus: !1,
            exec: function(b) {
              a(b)
            }
          });
          b.addCommand("shiftEnter", {
            modes: {
              wysiwyg: 1
            },
            editorFocus: !1,
            exec: function(b) {
              a(b, b.activeShiftEnterMode, 1)
            }
          });
          b.setKeystroke([
            [13, "enter"],
            [CKEDITOR.SHIFT + 13, "shiftEnter"]
          ])
        }
      });
      var c = CKEDITOR.dom.walker.whitespaces(),
        f = CKEDITOR.dom.walker.bookmark();
      CKEDITOR.plugins.enterkey = {
        enterBlock: function(a, d, l, p) {
          if((l = l || e(a)) && !a.notEnterNewLine) { /* zxt - 20170927 */
            l = b(l);
            var t = l.document,
              A = l.checkStartOfBlock(),
              u = l.checkEndOfBlock(),
              r = a.elementPath(l.startContainer),
              v = r.block,
              w = d == CKEDITOR.ENTER_DIV ? "div" : "p",
              B;
            if(A && u) {
              if(v && (v.is("li") || v.getParent().is("li"))) {
                v.is("li") || (v = v.getParent());
                l = v.getParent();
                B = l.getParent();
                p = !v.hasPrevious();
                var q = !v.hasNext(),
                  w = a.getSelection(),
                  z = w.createBookmarks(),
                  A = v.getDirection(1),
                  u = v.getAttribute("class"),
                  y = v.getAttribute("style"),
                  x = B.getDirection(1) != A;
                a = a.enterMode != CKEDITOR.ENTER_BR || x || y || u;
                if(B.is("li")) p || q ? (p && q && l.remove(), v[q ? "insertAfter" : "insertBefore"](B)) : v.breakParent(B);
                else {
                  if(a)
                    if(r.block.is("li") ? (B = t.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), x && B.setAttribute("dir", A), y && B.setAttribute("style", y), u && B.setAttribute("class", u), v.moveChildren(B)) :
                      B = r.block, p || q) B[p ? "insertBefore" : "insertAfter"](l);
                    else v.breakParent(l), B.insertAfter(l);
                  else if(v.appendBogus(!0), p || q)
                    for(; t = v[p ? "getFirst" : "getLast"]();) t[p ? "insertBefore" : "insertAfter"](l);
                  else
                    for(v.breakParent(l); t = v.getLast();) t.insertAfter(l);
                  v.remove()
                }
                w.selectBookmarks(z);
                return
              }
              if(v && v.getParent().is("blockquote")) {
                v.breakParent(v.getParent());
                v.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getPrevious().remove();
                v.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getNext().remove();
                l.moveToElementEditStart(v);
                l.select();
                return
              }
            } else if(v && v.is("pre") && !u) {
              h(a, d, l, p);
              return
            }
            if(A = l.splitBlock(w)) {
              d = A.previousBlock;
              v = A.nextBlock;
              r = A.wasStartOfBlock;
              a = A.wasEndOfBlock;
              v ? (z = v.getParent(), z.is("li") && (v.breakParent(z), v.move(v.getNext(), 1))) : d && (z = d.getParent()) && z.is("li") && (d.breakParent(z), z = d.getNext(), l.moveToElementEditStart(z), d.move(d.getPrevious()));
              if(r || a) {
                if(d) {
                  if(d.is("li") || !k.test(d.getName()) && !d.is("pre")) B = d.clone()
                } else v && (B = v.clone());
                B ? p && !B.is("li") && B.renameNode(w) :
                  z && z.is("li") ? B = z : (B = t.createElement(w), d && (q = d.getDirection()) && B.setAttribute("dir", q));
                if(t = A.elementPath)
                  for(p = 0, w = t.elements.length; p < w; p++) {
                    z = t.elements[p];
                    if(z.equals(t.block) || z.equals(t.blockLimit)) break;
                    CKEDITOR.dtd.$removeEmpty[z.getName()] && (z = z.clone(), B.moveChildren(z), B.append(z))
                  }
                B.appendBogus();
                B.getParent() || l.insertNode(B);
                B.is("li") && B.removeAttribute("value");
                !CKEDITOR.env.ie || !r || a && d.getChildCount() || (l.moveToElementEditStart(a ? d : B), l.select());
                l.moveToElementEditStart(r && !a ?
                  v : B)
              } else v.is("li") && (B = l.clone(), B.selectNodeContents(v), B = new CKEDITOR.dom.walker(B), B.evaluator = function(a) {
                return !(f(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
              }, (z = B.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? t.createElement("br") : t.createText(" ")).insertBefore(z)), v && l.moveToElementEditStart(v);
              l.select();
              l.scrollIntoView()
            }
          }
        },
        enterBr: function(a, b, c, f) {
          if(c = c || e(a) && !a.notEnterNewLine) { /* zxt - 20170927 */
            var h = c.document,
              l = c.checkEndOfBlock(),
              u = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
              r = u.block,
              v = r && u.block.getName();
            f || "li" != v ? (!f && l && k.test(v) ? (l = r.getDirection()) ? (h = h.createElement("div"), h.setAttribute("dir", l), h.insertAfter(r), c.setStart(h, 0)) : (h.createElement("br").insertAfter(r), CKEDITOR.env.gecko && h.createText("").insertAfter(r), c.setStartAt(r.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == v && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ?
              h.createText("\r") : h.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (h.createText("﻿").insertAfter(a), l && (r || u.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : d(a, b, c, f)
          }
        }
      };
      var l = CKEDITOR.plugins.enterkey,
        h = l.enterBr,
        d = l.enterBlock,
        k = /^h[1-6]$/
    }(),
    function() {
      function a(a, b) {
        var c = {},
          f = [],
          l = {
            nbsp: " ",
            shy: "­",
            gt: "\x3e",
            lt: "\x3c",
            amp: "\x26",
            apos: "'",
            quot: '"'
          };
        a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, d) {
          var e = b ? "\x26" + d + ";" : l[d];
          c[e] = b ? l[d] : "\x26" + d + ";";
          f.push(e);
          return ""
        });
        if(!b && a) {
          a = a.split(",");
          var h = document.createElement("div"),
            d;
          h.innerHTML = "\x26" + a.join(";\x26") + ";";
          d = h.innerHTML;
          h = null;
          for(h = 0; h < d.length; h++) {
            var k = d.charAt(h);
            c[k] = "\x26" + a[h] + ";";
            f.push(k)
          }
        }
        c.regex = f.join(b ? "|" : "");
        return c
      }
      CKEDITOR.plugins.add("entities", {
        afterInit: function(e) {
          function b(a) {
            return k[a]
          }

          function c(a) {
            return "force" !=
              f.entities_processNumerical && h[a] ? h[a] : "\x26#" + a.charCodeAt(0) + ";"
          }
          var f = e.config;
          if(e = (e = e.dataProcessor) && e.htmlFilter) {
            var l = [];
            !1 !== f.basicEntities && l.push("nbsp,gt,lt,amp");
            f.entities && (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
              f.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), f.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
              f.entities_additional && l.push(f.entities_additional));
            var h = a(l.join(",")),
              d = h.regex ? "[" + h.regex + "]" : "a^";
            delete h.regex;
            f.entities && f.entities_processNumerical && (d = "[^ -~]|" + d);
            var d = new RegExp(d, "g"),
              k = a("nbsp,gt,lt,amp,shy", !0),
              m = new RegExp(k.regex, "g");
            e.addRules({
              text: function(a) {
                return a.replace(m, b).replace(d, c)
              }
            }, {
              applyToAll: !0,
              excludeNestedEditable: !0
            })
          }
        }
      })
    }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0,
    CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      popup: function(a, e, b, c) {
        e = e || "80%";
        b = b || "70%";
        "string" == typeof e && 1 < e.length && "%" == e.substr(e.length - 1, 1) && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10));
        "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
        640 > e && (e = 640);
        420 > b && (b = 420);
        var f = parseInt((window.screen.height - b) / 2, 10),
          l = parseInt((window.screen.width -
            e) / 2, 10);
        c = (c || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + e + ",height\x3d" + b + ",top\x3d" + f + ",left\x3d" + l;
        var h = window.open("", null, c, !0);
        if(!h) return !1;
        try {
          -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (h.moveTo(l, f), h.resizeTo(e, b)), h.focus(), h.location.href = a
        } catch(d) {
          window.open(a, null, c, !0)
        }
        return !0
      }
    }),
    function() {
      function a(a, b) {
        var c = [];
        if(b)
          for(var d in b) c.push(d +
            "\x3d" + encodeURIComponent(b[d]));
        else return a;
        return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26")
      }

      function e(a) {
        a += "";
        return a.charAt(0).toUpperCase() + a.substr(1)
      }

      function b() {
        var b = this.getDialog(),
          c = b.getParentEditor();
        c._.filebrowserSe = this;
        var d = c.config["filebrowser" + e(b.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
          b = c.config["filebrowser" + e(b.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%",
          f = this.filebrowser.params || {};
        f.CKEditor = c.name;
        f.CKEditorFuncNum =
          c._.filebrowserFn;
        f.langCode || (f.langCode = c.langCode);
        f = a(this.filebrowser.url, f);
        c.popup(f, d, b, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
      }

      function c() {
        var a = this.getDialog();
        a.getParentEditor()._.filebrowserSe = this;
        return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
      }

      function f(b, c, d) {
        var e = d.params || {};
        e.CKEditor = b.name;
        e.CKEditorFuncNum = b._.filebrowserFn;
        e.langCode ||
          (e.langCode = b.langCode);
        c.action = a(d.url, e);
        c.filebrowser = d
      }

      function l(a, d, g, h) {
        if(h && h.length)
          for(var p, t = h.length; t--;)
            if(p = h[t], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(a, d, g, p.children), p.filebrowser)
              if("string" == typeof p.filebrowser && (p.filebrowser = {
                  action: "fileButton" == p.type ? "QuickUpload" : "Browse",
                  target: p.filebrowser
                }), "Browse" == p.filebrowser.action) {
                var A = p.filebrowser.url;
                void 0 === A && (A = a.config["filebrowser" + e(d) + "BrowseUrl"], void 0 === A && (A = a.config.filebrowserBrowseUrl));
                A && (p.onClick = b, p.filebrowser.url = A, p.hidden = !1)
              } else if("QuickUpload" == p.filebrowser.action && p["for"] && (A = p.filebrowser.url, void 0 === A && (A = a.config["filebrowser" + e(d) + "UploadUrl"], void 0 === A && (A = a.config.filebrowserUploadUrl)), A)) {
          var u = p.onClick;
          p.onClick = function(a) {
            var b = a.sender;
            if(u && !1 === u.call(b, a)) return !1;
            if(c.call(b, a)) {
              a = b.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement();
              if(b = new CKEDITOR.dom.element(a.$.form))(a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) :
                (a = new CKEDITOR.dom.element("input"), a.setAttributes({
                  name: "ckCsrfToken",
                  type: "hidden"
                }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken());
              return !0
            }
            return !1
          };
          p.filebrowser.url = A;
          p.hidden = !1;
          f(a, g.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
        }
      }

      function h(a, b, c) {
        if(-1 !== c.indexOf(";")) {
          c = c.split(";");
          for(var d = 0; d < c.length; d++)
            if(h(a, b, c[d])) return !0;
          return !1
        }
        return(a = a.getContents(b).get(c).filebrowser) && a.url
      }

      function d(a, b) {
        var c = this._.filebrowserSe.getDialog(),
          d = this._.filebrowserSe["for"],
          e = this._.filebrowserSe.filebrowser.onSelect;
        d && c.getContentElement(d[0], d[1]).reset();
        if("function" != typeof b || !1 !== b.call(this._.filebrowserSe))
          if(!e || !1 !== e.call(this._.filebrowserSe, a, b))
            if("string" == typeof b && b && alert(b), a && (d = this._.filebrowserSe, c = d.getDialog(), d = d.filebrowser.target || null))
              if(d = d.split(":"), e = c.getContentElement(d[0], d[1])) e.setValue(a), c.selectPage(d[0])
      }
      CKEDITOR.plugins.add("filebrowser", {
        requires: "popup",
        init: function(a) {
          a._.filebrowserFn = CKEDITOR.tools.addFunction(d, a);
          a.on("destroy", function() {
            CKEDITOR.tools.removeFunction(this._.filebrowserFn)
          })
        }
      });
      CKEDITOR.on("dialogDefinition", function(a) {
        if(a.editor.plugins.filebrowser)
          for(var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)
            if(c = b.contents[d]) l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !h(b, c.id, c.filebrowser))
      })
    }(), CKEDITOR.plugins.add("find", {
      requires: "dialog",
      init: function(a) {
        var e = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
        e.canUndo = !1;
        e.readOnly = 1;
        a.addCommand("replace",
          new CKEDITOR.dialogCommand("replace")).canUndo = !1;
        a.ui.addButton && (a.ui.addButton("Find", {
          label: a.lang.find.find,
          command: "find",
          toolbar: "find,10"
        }), a.ui.addButton("Replace", {
          label: a.lang.find.replace,
          command: "replace",
          toolbar: "find,20"
        }));
        CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
        CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
      }
    }), CKEDITOR.config.find_highlight = {
      element: "span",
      styles: {
        "background-color": "#004",
        color: "#fff"
      }
    },
    function() {
      function a(a, b) {
        var d = c.exec(a),
          e = c.exec(b);
        if(d) {
          if(!d[2] && "px" == e[2]) return e[1];
          if("px" == d[2] && !e[2]) return e[1] + "px"
        }
        return b
      }
      var e = CKEDITOR.htmlParser.cssStyle,
        b = CKEDITOR.tools.cssLength,
        c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
        f = {
          elements: {
            $: function(b) {
              var c = b.attributes;
              if((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
                var d = (new e(b)).rules;
                b = c.attributes;
                var f = d.width,
                  d = d.height;
                f && (b.width = a(b.width, f));
                d && (b.height = a(b.height,
                  d))
              }
              return c
            }
          }
        };
      CKEDITOR.plugins.add("fakeobjects", {
        init: function(a) {
          a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
        },
        afterInit: function(a) {
          (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(f, {
            applyToAll: !0
          })
        }
      });
      CKEDITOR.editor.prototype.createFakeElement = function(a, c, d, f) {
        var m = this.lang.fakeobjects,
          m = m[d] || m.unknown;
        c = {
          "class": c,
          "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
          "data-cke-real-node-type": a.type,
          alt: m,
          title: m,
          align: a.getAttribute("align") ||
            ""
        };
        CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
        d && (c["data-cke-real-element-type"] = d);
        f && (c["data-cke-resizable"] = f, d = new e, f = a.getAttribute("width"), a = a.getAttribute("height"), f && (d.rules.width = b(f)), a && (d.rules.height = b(a)), d.populate(c));
        return this.document.createElement("img", {
          attributes: c
        })
      };
      CKEDITOR.editor.prototype.createFakeParserElement = function(a, c, d, f) {
        var m = this.lang.fakeobjects,
          m = m[d] || m.unknown,
          g;
        g = new CKEDITOR.htmlParser.basicWriter;
        a.writeHtml(g);
        g = g.getHtml();
        c = {
          "class": c,
          "data-cke-realelement": encodeURIComponent(g),
          "data-cke-real-node-type": a.type,
          alt: m,
          title: m,
          align: a.attributes.align || ""
        };
        CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
        d && (c["data-cke-real-element-type"] = d);
        f && (c["data-cke-resizable"] = f, f = a.attributes, a = new e, d = f.width, f = f.height, void 0 !== d && (a.rules.width = b(d)), void 0 !== f && (a.rules.height = b(f)), a.populate(c));
        return new CKEDITOR.htmlParser.element("img", c)
      };
      CKEDITOR.editor.prototype.restoreRealElement = function(b) {
        if(b.data("cke-real-node-type") !=
          CKEDITOR.NODE_ELEMENT) return null;
        var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
        if(b.data("cke-resizable")) {
          var d = b.getStyle("width");
          b = b.getStyle("height");
          d && c.setAttribute("width", a(c.getAttribute("width"), d));
          b && c.setAttribute("height", a(c.getAttribute("height"), b))
        }
        return c
      }
    }(),
    function() {
      function a(a) {
        a = a.attributes;
        return "application/x-shockwave-flash" == a.type || b.test(a.src || "")
      }

      function e(a, b) {
        return a.createFakeParserElement(b, "cke_flash",
          "flash", !0)
      }
      var b = /\.swf(?:$|\?)/i;
      CKEDITOR.plugins.add("flash", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
          CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
        },
        init: function(a) {
          var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
          CKEDITOR.dialog.isTabEnabled(a,
            "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
          CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)");
          a.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
            allowedContent: b,
            requiredContent: "embed"
          }));
          a.ui.addButton && a.ui.addButton("Flash", {
            label: a.lang.common.flash,
            command: "flash",
            toolbar: "insert,20"
          });
          CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
          a.addMenuItems && a.addMenuItems({
            flash: {
              label: a.lang.flash.properties,
              command: "flash",
              group: "flash"
            }
          });
          a.on("doubleclick", function(a) {
            var b = a.data.element;
            b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash")
          });
          a.contextMenu && a.contextMenu.addListener(function(a) {
            if(a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return {
              flash: CKEDITOR.TRISTATE_OFF
            }
          })
        },
        afterInit: function(b) {
          var f = b.dataProcessor;
          (f = f && f.dataFilter) && f.addRules({
            elements: {
              "cke:object": function(f) {
                var h = f.attributes;
                if(!(h.classid && String(h.classid).toLowerCase() ||
                    a(f))) {
                  for(h = 0; h < f.children.length; h++)
                    if("cke:embed" == f.children[h].name) {
                      if(!a(f.children[h])) break;
                      return e(b, f)
                    }
                  return null
                }
                return e(b, f)
              },
              "cke:embed": function(f) {
                return a(f) ? e(b, f) : null
              }
            }
          }, 5)
        }
      })
    }(), CKEDITOR.tools.extend(CKEDITOR.config, {
      flashEmbedTagOnly: !1,
      flashAddEmbedTag: !0,
      flashConvertOnEdit: !1
    }),
    function() {
      function a(a) {
        var f = a.config,
          l = a.fire("uiSpace", {
            space: "top",
            html: ""
          }).html,
          h = function() {
            function d(a, c, e) {
              k.setStyle(c, b(e));
              k.setStyle("position", a)
            }

            function g(a) {
              var b = l.getDocumentPosition();
              switch(a) {
                case "top":
                  d("absolute", "top", b.y - w - z);
                  break;
                case "pin":
                  d("fixed", "top", x);
                  break;
                case "bottom":
                  d("absolute", "top", b.y + (r.height || r.bottom - r.top) + z)
              }
              m = a
            }
            var m, l, u, r, v, w, B, q = f.floatSpaceDockedOffsetX || 0,
              z = f.floatSpaceDockedOffsetY || 0,
              y = f.floatSpacePinnedOffsetX || 0,
              x = f.floatSpacePinnedOffsetY || 0;
            return function(d) {
              if(l = a.editable()) {
                var n = d && "focus" == d.name;
                n && k.show();
                a.fire("floatingSpaceLayout", {
                  show: n
                });
                k.removeStyle("left");
                k.removeStyle("right");
                u = k.getClientRect();
                r = l.getClientRect();
                v = e.getViewPaneSize();
                w = u.height;
                B = "pageXOffset" in e.$ ? e.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                m ? (w + z <= r.top ? g("top") : w + z > v.height - r.bottom ? g("pin") : g("bottom"), d = v.width / 2, d = f.floatSpacePreferRight ? "right" : 0 < r.left && r.right < v.width && r.width > u.width ? "rtl" == f.contentsLangDirection ? "right" : "left" : d - r.left > r.right - d ? "left" : "right", u.width > v.width ? (d = "left", n = 0) : (n = "left" == d ? 0 < r.left ? r.left : 0 : r.right < v.width ? v.width - r.right : 0, n + u.width > v.width && (d = "left" == d ? "right" : "left", n = 0)),
                  k.setStyle(d, b(("pin" == m ? y : q) + n + ("pin" == m ? 0 : "left" == d ? B : -B)))) : (m = "pin", g("pin"), h(d))
              }
            }
          }();
        if(l) {
          var d = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' :
              " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
            k = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(d.output({
              content: l,
              id: a.id,
              langDir: a.lang.dir,
              langCode: a.langCode,
              name: a.name,
              style: "display:none;z-index:" + (f.baseFloatZIndex - 1),
              topId: a.ui.spaceId("top"),
              voiceLabel: a.title
            }))),
            m = CKEDITOR.tools.eventsBuffer(500, h),
            g = CKEDITOR.tools.eventsBuffer(100, h);
          k.unselectable();
          k.on("mousedown",
            function(a) {
              a = a.data;
              a.getTarget().hasAscendant("a", 1) || a.preventDefault()
            });
          a.on("focus", function(b) {
            h(b);
            a.on("change", m.input);
            e.on("scroll", g.input);
            e.on("resize", g.input)
          });
          a.on("blur", function() {
            k.hide();
            a.removeListener("change", m.input);
            e.removeListener("scroll", g.input);
            e.removeListener("resize", g.input)
          });
          a.on("destroy", function() {
            e.removeListener("scroll", g.input);
            e.removeListener("resize", g.input);
            k.clearCustomData();
            k.remove()
          });
          a.focusManager.hasFocus && k.show();
          a.focusManager.add(k,
            1)
        }
      }
      var e = CKEDITOR.document.getWindow(),
        b = CKEDITOR.tools.cssLength;
      CKEDITOR.plugins.add("floatingspace", {
        init: function(b) {
          b.on("loaded", function() {
            a(this)
          }, null, null, 20)
        }
      })
    }(), CKEDITOR.plugins.add("listblock", {
      requires: "panel",
      onLoad: function() {
        var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),
          e = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
          b = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
          c = /\'/g;
        CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) {
          return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
        };
        CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
          base: CKEDITOR.ui.panel.block,
          $: function(a, b) {
            b = b || {};
            var c = b.attributes || (b.attributes = {});
            (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0);
            !c.role &&
              (c.role = "listbox");
            this.base.apply(this, arguments);
            this.element.setAttribute("role", c.role);
            c = this.keys;
            c[40] = "next";
            c[9] = "next";
            c[38] = "prev";
            c[CKEDITOR.SHIFT + 9] = "prev";
            c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
            CKEDITOR.env.ie && (c[13] = "mouseup");
            this._.pendingHtml = [];
            this._.pendingList = [];
            this._.items = {};
            this._.groups = {}
          },
          _: {
            close: function() {
              if(this._.started) {
                var b = a.output({
                  items: this._.pendingList.join("")
                });
                this._.pendingList = [];
                this._.pendingHtml.push(b);
                delete this._.started
              }
            },
            getClick: function() {
              this._.click ||
                (this._.click = CKEDITOR.tools.addFunction(function(a) {
                  var b = this.toggle(a);
                  if(this.onClick) this.onClick(a, b)
                }, this));
              return this._.click
            }
          },
          proto: {
            add: function(a, b, h) {
              var d = CKEDITOR.tools.getNextId();
              this._.started || (this._.started = 1, this._.size = this._.size || 0);
              this._.items[a] = d;
              var k;
              k = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'");
              a = {
                id: d,
                val: k,
                onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick",
                clickFn: this._.getClick(),
                title: CKEDITOR.tools.htmlEncodeAttr(h || a),
                text: b || a
              };
              this._.pendingList.push(e.output(a))
            },
            startGroup: function(a) {
              this._.close();
              var c = CKEDITOR.tools.getNextId();
              this._.groups[a] = c;
              this._.pendingHtml.push(b.output({
                id: c,
                label: a
              }))
            },
            commit: function() {
              this._.close();
              this.element.appendHtml(this._.pendingHtml.join(""));
              delete this._.size;
              this._.pendingHtml = []
            },
            toggle: function(a) {
              var b = this.isMarked(a);
              b ? this.unmark(a) : this.mark(a);
              return !b
            },
            hideGroup: function(a) {
              var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
              a && (a.setStyle("display",
                "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
            },
            hideItem: function(a) {
              this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
            },
            showAll: function() {
              var a = this._.items,
                b = this._.groups,
                c = this.element.getDocument(),
                d;
              for(d in a) c.getById(a[d]).setStyle("display", "");
              for(var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "")
            },
            mark: function(a) {
              this.multiSelect || this.unmarkAll();
              a = this._.items[a];
              var b = this.element.getDocument().getById(a);
              b.addClass("cke_selected");
              this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
              this.onMark && this.onMark(b)
            },
            markFirstDisplayed: function() {
              var a = this;
              this._.markFirstDisplayed(function() {
                a.multiSelect || a.unmarkAll()
              })
            },
            unmark: function(a) {
              var b = this.element.getDocument();
              a = this._.items[a];
              var c = b.getById(a);
              c.removeClass("cke_selected");
              b.getById(a + "_option").removeAttribute("aria-selected");
              this.onUnmark && this.onUnmark(c)
            },
            unmarkAll: function() {
              var a = this._.items,
                b = this.element.getDocument(),
                c;
              for(c in a) {
                var d = a[c];
                b.getById(d).removeClass("cke_selected");
                b.getById(d + "_option").removeAttribute("aria-selected")
              }
              this.onUnmark && this.onUnmark()
            },
            isMarked: function(a) {
              return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
            },
            focus: function(a) {
              this._.focusIndex = -1;
              var b = this.element.getElementsByTag("a"),
                c, d = -1;
              if(a)
                for(c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) {
                  if(a.equals(c)) {
                    this._.focusIndex = d;
                    break
                  }
                } else this.element.focus();
              c && setTimeout(function() {
                c.focus()
              }, 0)
            }
          }
        })
      }
    }), CKEDITOR.plugins.add("richcombo", {
      requires: "floatpanel,listblock,button",
      beforeInit: function(a) {
        a.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
      }
    }),
    function() {
      var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ?
        "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' :
          "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),
        e = CKEDITOR.addTemplate("combo", a);
      CKEDITOR.UI_RICHCOMBO = "richcombo";
      CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
        $: function(a) {
          CKEDITOR.tools.extend(this,
            a, {
              canGroup: !1,
              title: a.label,
              modes: {
                wysiwyg: 1
              },
              editorFocus: 1
            });
          a = this.panel || {};
          delete this.panel;
          this.id = CKEDITOR.tools.getNextNumber();
          this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
          a.className = "cke_combopanel";
          a.block = {
            multiSelect: a.multiSelect,
            attributes: a.attributes
          };
          a.toolbarRelated = !0;
          this._ = {
            panelDefinition: a,
            items: {}
          }
        },
        proto: {
          renderHtml: function(a) {
            var c = [];
            this.render(a, c);
            return c.join("")
          },
          render: function(a, c) {
            function f() {
              if(this.getState() != CKEDITOR.TRISTATE_ON) {
                var c =
                  this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED);
                this.setState(c);
                this.setValue("");
                c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
              }
            }
            var l = CKEDITOR.env,
              h = "cke_" + this.id,
              d = CKEDITOR.tools.addFunction(function(c) {
                p && (a.unlockSelection(1), p = 0);
                m.execute(c)
              }, this),
              k = this,
              m = {
                id: h,
                combo: this,
                focus: function() {
                  CKEDITOR.document.getById(h).getChild(1).focus()
                },
                execute: function(c) {
                  var d = k._;
                  if(d.state != CKEDITOR.TRISTATE_DISABLED)
                    if(k.createPanel(a),
                      d.on) d.panel.hide();
                    else {
                      k.commit();
                      var e = k.getValue();
                      e ? d.list.mark(e) : d.list.unmarkAll();
                      d.panel.showBlock(k.id, new CKEDITOR.dom.element(c), 4)
                    }
                },
                clickFn: d
              };
            a.on("activeFilterChange", f, this);
            a.on("mode", f, this);
            a.on("selectionChange", f, this);
            !this.readOnly && a.on("readOnly", f, this);
            var g = CKEDITOR.tools.addFunction(function(a, b) {
                a = new CKEDITOR.dom.event(a);
                var c = a.getKeystroke();
                switch(c) {
                  case 13:
                  case 32:
                  case 40:
                    CKEDITOR.tools.callFunction(d, b);
                    break;
                  default:
                    m.onkey(m, c)
                }
                a.preventDefault()
              }),
              n = CKEDITOR.tools.addFunction(function() {
                m.onfocus &&
                  m.onfocus()
              }),
              p = 0;
            m.keyDownFn = g;
            l = {
              id: h,
              name: this.name || this.command,
              label: this.label,
              title: this.title,
              cls: this.className || "",
              titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""),
              keydownFn: g,
              focusFn: n,
              clickFn: d
            };
            e.output(l, c);
            if(this.onRender) this.onRender();
            return m
          },
          createPanel: function(a) {
            if(!this._.panel) {
              var c = this._.panelDefinition,
                e = this._.panelDefinition.block,
                l = c.parent || CKEDITOR.document.getBody(),
                h = "cke_combopanel__" + this.name,
                d = new CKEDITOR.ui.floatPanel(a, l, c),
                c = d.addListBlock(this.id,
                  e),
                k = this;
              d.onShow = function() {
                this.element.addClass(h);
                k.setState(CKEDITOR.TRISTATE_ON);
                k._.on = 1;
                k.editorFocus && !a.focusManager.hasFocus && a.focus();
                if(k.onOpen) k.onOpen()
              };
              d.onHide = function(c) {
                this.element.removeClass(h);
                k.setState(k.modes && k.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                k._.on = 0;
                if(!c && k.onClose) k.onClose()
              };
              d.onEscape = function() {
                d.hide(1)
              };
              c.onClick = function(a, b) {
                k.onClick && k.onClick.call(k, a, b);
                d.hide()
              };
              this._.panel = d;
              this._.list = c;
              d.getBlock(this.id).onHide =
                function() {
                  k._.on = 0;
                  k.setState(CKEDITOR.TRISTATE_OFF)
                };
              this.init && this.init()
            }
          },
          setValue: function(a, c) {
            this._.value = a;
            var e = this.document.getById("cke_" + this.id + "_text");
            e && (a || c ? e.removeClass("cke_combo_inlinelabel") : (c = this.label, e.addClass("cke_combo_inlinelabel")), e.setText("undefined" != typeof c ? c : a))
          },
          getValue: function() {
            return this._.value || ""
          },
          unmarkAll: function() {
            this._.list.unmarkAll()
          },
          mark: function(a) {
            this._.list.mark(a)
          },
          hideItem: function(a) {
            this._.list.hideItem(a)
          },
          hideGroup: function(a) {
            this._.list.hideGroup(a)
          },
          showAll: function() {
            this._.list.showAll()
          },
          add: function(a, c, e) {
            this._.items[a] = e || a;
            this._.list.add(a, c, e)
          },
          startGroup: function(a) {
            this._.list.startGroup(a)
          },
          commit: function() {
            this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
            this._.committed = 1
          },
          setState: function(a) {
            if(this._.state != a) {
              var c = this.document.getById("cke_" + this.id);
              c.setState(a, "cke_combo");
              a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled");
              this._.state =
                a
            }
          },
          getState: function() {
            return this._.state
          },
          enable: function() {
            this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
          },
          disable: function() {
            this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
          }
        },
        statics: {
          handler: {
            create: function(a) {
              return new CKEDITOR.ui.richCombo(a)
            }
          }
        }
      });
      CKEDITOR.ui.prototype.addRichCombo = function(a, c) {
        this.add(a, CKEDITOR.UI_RICHCOMBO, c)
      }
    }(),
    function() {
      function a(a, c, f, l, h, d, k, m) {
        var g = a.config,
          n = new CKEDITOR.style(k),
          p = h.split(";");
        h = [];
        for(var t = {}, A = 0; A < p.length; A++) {
          var u = p[A];
          if(u) {
            var u = u.split("/"),
              r = {},
              v = p[A] = u[0];
            r[f] = h[A] = u[1] || v;
            t[v] = new CKEDITOR.style(k, r);
            t[v]._.definition.name = v
          } else p.splice(A--, 1)
        }
        a.ui.addRichCombo(c, {
          label: l.label,
          title: l.panelTitle,
          toolbar: "styles," + m,
          defaultValue: "cke-default",
          allowedContent: n,
          requiredContent: n,
          contentTransformations: [
            [{
              element: "font",
              check: "span",
              left: function(a) {
                return !!a.attributes.size || !!a.attributes.align || !!a.attributes.face
              },
              right: function(a) {
                var b = " x-small small medium large x-large xx-large 48px".split(" ");
                a.name = "span";
                a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size);
                a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align);
                a.attributes.face && (a.styles["font-family"] = a.attributes.face, delete a.attributes.face)
              }
            }]
          ],
          panel: {
            css: [CKEDITOR.skin.getPath("editor")].concat(g.contentsCss),
            multiSelect: !1,
            attributes: {
              "aria-label": l.panelTitle
            }
          },
          init: function() {
            var c;
            /* zxt - 20171017 */
            c = a.lang.common.optionDefault;
            this.startGroup(l.panelTitle);
            this.add(this.defaultValue,
              c, c);
            /* zxt - 20171017 */
            for(var d = 0; d < p.length; d++) c = p[d], this.add(c, t[c].buildPreview(), c)
          },
          onClick: function(c) {
            a.focus();
            a.fire("saveSnapshot");
            var d = this.getValue(),
              f = t[c],
              g, k, h, m, l, r;
            if(d && c != d)
              if(g = t[d], k = a.getSelection().getRanges()[0], k.collapsed) {
                if(h = a.elementPath(), m = h.contains(function(a) {
                    return g.checkElementRemovable(a)
                  })) {
                  l = k.checkBoundaryOfElement(m, CKEDITOR.START);
                  r = k.checkBoundaryOfElement(m, CKEDITOR.END);
                  if(l && r) {
                    for(l = k.createBookmark(); h = m.getFirst();) h.insertBefore(m);
                    m.remove();
                    k.moveToBookmark(l)
                  } else l ||
                    r ? k.moveToPosition(m, l ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END) : (k.splitElement(m), k.moveToPosition(m, CKEDITOR.POSITION_AFTER_END)), e(k, h.elements.slice(), m);
                  a.getSelection().selectRanges([k])
                }
              } else a.removeStyle(g);
            c === this.defaultValue ? g && a.removeStyle(g) : c !== d && a.applyStyle(f);
            a.fire("saveSnapshot")
          },
          onRender: function() {
            a.on("selectionChange", function(c) {
              var e = this.getValue();
              c = c.data.path.elements;
              for(var f = 0, g; f < c.length; f++) {
                g = c[f];
                for(var k in t)
                  if(t[k].checkElementMatch(g, !0, a)) {
                    k != e && this.setValue(k);
                    return
                  }
              }
              this.setValue("", d)
            }, this)
          },
          refresh: function() {
            a.activeFilter.check(n) || this.setState(CKEDITOR.TRISTATE_DISABLED)
          }
        })
      }

      function e(a, c, f) {
        var l = c.pop();
        if(l) {
          if(f) return e(a, c, l.equals(f) ? null : f);
          f = l.clone();
          a.insertNode(f);
          a.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
          e(a, c)
        }
      }
      CKEDITOR.plugins.add("font", {
        requires: "richcombo",
        init: function(b) {
          var c = b.config;
          /* zxt - 20190107 */
          c.font_defaultFamily && c.font_names.match(new RegExp(c.font_defaultFamily + ';')) && (c.font_defaultLabel = c.font_defaultFamily.split('/')[0]);
          c.fontSize_defaultSize && c.fontSize_sizes.match(new RegExp(c.fontSize_defaultSize + ';')) && (c.fontSize_defaultLabel = c.fontSize_defaultSize.split('/')[0]);
          /* zxt - 20190107 */
          a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
          a(b, "FontSize", "size",
            b.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
        }
      })
    }(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif", CKEDITOR.config.font_defaultLabel =
    "", CKEDITOR.config.font_style = {
      element: "span",
      styles: {
        "font-family": "#(family)"
      },
      overrides: [{
        element: "font",
        attributes: {
          face: null
        }
      }]
    }, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = {
      element: "span",
      styles: {
        "font-size": "#(size)"
      },
      overrides: [{
        element: "font",
        attributes: {
          size: null
        }
      }]
    }, CKEDITOR.plugins.add("format", {
      requires: "richcombo",
      init: function(a) {
        if(!a.blockless) {
          for(var e = a.config, b = a.lang.format, c = e.format_tags.split(";"), f = {}, l = 0, h = [], d = 0; d < c.length; d++) {
            var k = c[d],
              m = new CKEDITOR.style(e["format_" + k]);
            if(!a.filter.customConfig || a.filter.check(m)) l++, f[k] = m, f[k]._.enterMode = a.config.enterMode, h.push(m)
          }
          0 !== l && a.ui.addRichCombo("Format", {
            label: b.label,
            title: b.panelTitle,
            toolbar: "styles,20",
            allowedContent: h,
            panel: {
              css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
              multiSelect: !1,
              attributes: {
                "aria-label": b.panelTitle
              }
            },
            init: function() {
              this.startGroup(b.panelTitle);
              for(var a in f) {
                var c = b["tag_" + a];
                this.add(a, f[a].buildPreview(c), c)
              }
            },
            onClick: function(b) {
              a.focus();
              a.fire("saveSnapshot");
              b = f[b];
              var c = a.elementPath();
              b.checkActive(c, a) || a.applyStyle(b);
              setTimeout(function() {
                a.fire("saveSnapshot")
              }, 0)
            },
            onRender: function() {
              a.on("selectionChange", function(b) {
                  var c = this.getValue();
                  b = b.data.path;
                  this.refresh();
                  for(var d in f)
                    if(f[d].checkActive(b, a)) {
                      d != c && this.setValue(d, a.lang.format["tag_" + d]);
                      return
                    }
                  this.setValue("")
                },
                this)
            },
            onOpen: function() {
              this.showAll();
              for(var b in f) a.activeFilter.check(f[b]) || this.hideItem(b)
            },
            refresh: function() {
              var b = a.elementPath();
              if(b) {
                if(b.isContextFor("p"))
                  for(var c in f)
                    if(a.activeFilter.check(f[c])) return;
                this.setState(CKEDITOR.TRISTATE_DISABLED)
              }
            }
          })
        }
      }
    }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = {
      element: "p"
    }, CKEDITOR.config.format_div = {
      element: "div"
    }, CKEDITOR.config.format_pre = {
      element: "pre"
    }, CKEDITOR.config.format_address = {
      element: "address"
    },
    CKEDITOR.config.format_h1 = {
      element: "h1"
    }, CKEDITOR.config.format_h2 = {
      element: "h2"
    }, CKEDITOR.config.format_h3 = {
      element: "h3"
    }, CKEDITOR.config.format_h4 = {
      element: "h4"
    }, CKEDITOR.config.format_h5 = {
      element: "h5"
    }, CKEDITOR.config.format_h6 = {
      element: "h6"
    }, CKEDITOR.plugins.add("forms", {
      requires: "dialog,fakeobjects",
      onLoad: function() {
        CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
        CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") +
          ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
      },
      init: function(a) {
        var e = a.lang,
          b = 0,
          c = {
            email: 1,
            password: 1,
            search: 1,
            tel: 1,
            text: 1,
            url: 1
          },
          f = {
            checkbox: "input[type,name,checked,required]",
            radio: "input[type,name,checked,required]",
            textfield: "input[type,name,value,size,maxlength,required]",
            textarea: "textarea[cols,rows,name,required]",
            select: "select[name,size,multiple,required]; option[value,selected]",
            button: "input[type,name,value]",
            form: "form[action,name,id,enctype,target,method]",
            hiddenfield: "input[type,name,value]",
            imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
          },
          l = {
            checkbox: "input",
            radio: "input",
            textfield: "input",
            textarea: "textarea",
            select: "select",
            button: "input",
            form: "form",
            hiddenfield: "input",
            imagebutton: "input"
          },
          h = function(c, d, k) {
            var h = {
              allowedContent: f[d],
              requiredContent: l[d]
            };
            "form" == d && (h.context = "form");
            a.addCommand(d, new CKEDITOR.dialogCommand(d, h));
            a.ui.addButton && a.ui.addButton(c, {
              label: e.common[c.charAt(0).toLowerCase() + c.slice(1)],
              command: d,
              toolbar: "forms," + (b += 10)
            });
            CKEDITOR.dialog.add(d, k)
          },
          d = this.path + "dialogs/";
        !a.blockless && h("Form", "form", d + "form.js");
        h("Checkbox", "checkbox", d + "checkbox.js");
        h("Radio", "radio", d + "radio.js");
        h("TextField", "textfield", d + "textfield.js");
        h("Textarea", "textarea", d + "textarea.js");
        h("Select", "select", d + "select.js");
        h("Button", "button", d + "button.js");
        var k = a.plugins.image;
        k && !a.plugins.image2 && h("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") +
          "dialogs/image.js");
        h("HiddenField", "hiddenfield", d + "hiddenfield.js");
        a.addMenuItems && (h = {
          checkbox: {
            label: e.forms.checkboxAndRadio.checkboxTitle,
            command: "checkbox",
            group: "checkbox"
          },
          radio: {
            label: e.forms.checkboxAndRadio.radioTitle,
            command: "radio",
            group: "radio"
          },
          textfield: {
            label: e.forms.textfield.title,
            command: "textfield",
            group: "textfield"
          },
          hiddenfield: {
            label: e.forms.hidden.title,
            command: "hiddenfield",
            group: "hiddenfield"
          },
          button: {
            label: e.forms.button.title,
            command: "button",
            group: "button"
          },
          select: {
            label: e.forms.select.title,
            command: "select",
            group: "select"
          },
          textarea: {
            label: e.forms.textarea.title,
            command: "textarea",
            group: "textarea"
          }
        }, k && (h.imagebutton = {
          label: e.image.titleButton,
          command: "imagebutton",
          group: "imagebutton"
        }), !a.blockless && (h.form = {
          label: e.forms.form.menu,
          command: "form",
          group: "form"
        }), a.addMenuItems(h));
        a.contextMenu && (!a.blockless && a.contextMenu.addListener(function(a, b, c) {
          if((a = c.contains("form", 1)) && !a.isReadOnly()) return {
            form: CKEDITOR.TRISTATE_OFF
          }
        }), a.contextMenu.addListener(function(a) {
          if(a && !a.isReadOnly()) {
            var b =
              a.getName();
            if("select" == b) return {
              select: CKEDITOR.TRISTATE_OFF
            };
            if("textarea" == b) return {
              textarea: CKEDITOR.TRISTATE_OFF
            };
            if("input" == b) {
              var d = a.getAttribute("type") || "text";
              switch(d) {
                case "button":
                case "submit":
                case "reset":
                  return {
                    button: CKEDITOR.TRISTATE_OFF
                  };
                case "checkbox":
                  return {
                    checkbox: CKEDITOR.TRISTATE_OFF
                  };
                case "radio":
                  return {
                    radio: CKEDITOR.TRISTATE_OFF
                  };
                case "image":
                  return k ? {
                    imagebutton: CKEDITOR.TRISTATE_OFF
                  } : null
              }
              if(c[d]) return {
                textfield: CKEDITOR.TRISTATE_OFF
              }
            }
            if("img" == b && "hiddenfield" ==
              a.data("cke-real-element-type")) return {
              hiddenfield: CKEDITOR.TRISTATE_OFF
            }
          }
        }));
        a.on("doubleclick", function(b) {
          var d = b.data.element;
          if(!a.blockless && d.is("form")) b.data.dialog = "form";
          else if(d.is("select")) b.data.dialog = "select";
          else if(d.is("textarea")) b.data.dialog = "textarea";
          else if(d.is("img") && "hiddenfield" == d.data("cke-real-element-type")) b.data.dialog = "hiddenfield";
          else if(d.is("input")) {
            d = d.getAttribute("type") || "text";
            switch(d) {
              case "button":
              case "submit":
              case "reset":
                b.data.dialog = "button";
                break;
              case "checkbox":
                b.data.dialog = "checkbox";
                break;
              case "radio":
                b.data.dialog = "radio";
                break;
              case "image":
                b.data.dialog = "imagebutton"
            }
            c[d] && (b.data.dialog = "textfield")
          }
        })
      },
      afterInit: function(a) {
        var e = a.dataProcessor,
          b = e && e.htmlFilter,
          e = e && e.dataFilter;
        CKEDITOR.env.ie && b && b.addRules({
          elements: {
            input: function(a) {
              a = a.attributes;
              var b = a.type;
              b || (a.type = "text");
              "checkbox" != b && "radio" != b || "on" != a.value || delete a.value
            }
          }
        }, {
          applyToAll: !0
        });
        e && e.addRules({
          elements: {
            input: function(b) {
              if("hidden" == b.attributes.type) return a.createFakeParserElement(b,
                "cke_hidden", "hiddenfield")
            }
          }
        }, {
          applyToAll: !0
        })
      }
    }),
    function() {
      var a = {
        canUndo: !1,
        exec: function(a) {
          var b = a.document.createElement("hr");
          a.insertElement(b)
        },
        allowedContent: "hr",
        requiredContent: "hr"
      };
      CKEDITOR.plugins.add("horizontalrule", {
        init: function(e) {
          e.blockless || (e.addCommand("horizontalrule", a), e.ui.addButton && e.ui.addButton("HorizontalRule", {
            label: e.lang.horizontalrule.toolbar,
            command: "horizontalrule",
            toolbar: "insert,40"
          }))
        }
      })
    }(), CKEDITOR.plugins.add("htmlwriter", {
      init: function(a) {
        var e = new CKEDITOR.htmlWriter;
        e.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
        e.indentationChars = a.config.dataIndentationChars || "\t";
        a.dataProcessor.writer = e
      }
    }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
      base: CKEDITOR.htmlParser.basicWriter,
      $: function() {
        this.base();
        this.indentationChars = "\t";
        this.selfClosingEnd = " /\x3e";
        this.lineBreakChars = "\n";
        this.sortAttributes = 1;
        this._.indent = 0;
        this._.indentation = "";
        this._.inPre = 0;
        this._.rules = {};
        var a = CKEDITOR.dtd,
          e;
        for(e in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem,
            a.$tableContent)) this.setRules(e, {
          indent: !a[e]["#"],
          breakBeforeOpen: 1,
          breakBeforeClose: !a[e]["#"],
          breakAfterClose: 1,
          needsSpace: e in a.$block && !(e in {
            li: 1,
            dt: 1,
            dd: 1
          })
        });
        this.setRules("br", {
          breakAfterOpen: 1
        });
        this.setRules("title", {
          indent: 0,
          breakAfterOpen: 0
        });
        this.setRules("style", {
          indent: 0,
          breakBeforeClose: 1
        });
        this.setRules("pre", {
          breakAfterOpen: 1,
          indent: 0
        })
      },
      proto: {
        openTag: function(a) {
          var e = this._.rules[a];
          this._.afterCloser && e && e.needsSpace && this._.needsSpace && this._.output.push("\n");
          this._.indent ?
            this.indentation() : e && e.breakBeforeOpen && (this.lineBreak(), this.indentation());
          this._.output.push("\x3c", a);
          this._.afterCloser = 0
        },
        openTagClose: function(a, e) {
          var b = this._.rules[a];
          e ? (this._.output.push(this.selfClosingEnd), b && b.breakAfterClose && (this._.needsSpace = b.needsSpace)) : (this._.output.push("\x3e"), b && b.indent && (this._.indentation += this.indentationChars));
          b && b.breakAfterOpen && this.lineBreak();
          "pre" == a && (this._.inPre = 1)
        },
        attribute: function(a, e) {
          "string" == typeof e && (this.forceSimpleAmpersand &&
            (e = e.replace(/&amp;/g, "\x26")), e = CKEDITOR.tools.htmlEncodeAttr(e));
          this._.output.push(" ", a, '\x3d"', e, '"')
        },
        closeTag: function(a) {
          var e = this._.rules[a];
          e && e.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
          this._.indent ? this.indentation() : e && e.breakBeforeClose && (this.lineBreak(), this.indentation());
          this._.output.push("\x3c/", a, "\x3e");
          "pre" == a && (this._.inPre = 0);
          e && e.breakAfterClose && (this.lineBreak(), this._.needsSpace = e.needsSpace);
          this._.afterCloser = 1
        },
        text: function(a) {
          this._.indent &&
            (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a)));
          this._.output.push(a)
        },
        comment: function(a) {
          this._.indent && this.indentation();
          this._.output.push("\x3c!--", a, "--\x3e")
        },
        lineBreak: function() {
          !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
          this._.indent = 1
        },
        indentation: function() {
          !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
          this._.indent = 0
        },
        reset: function() {
          this._.output = [];
          this._.indent = 0;
          this._.indentation = "";
          this._.afterCloser =
            0;
          this._.inPre = 0;
          this._.needsSpace = 0
        },
        setRules: function(a, e) {
          var b = this._.rules[a];
          b ? CKEDITOR.tools.extend(b, e, !0) : this._.rules[a] = e
        }
      }
    }),
    function() {
      CKEDITOR.plugins.add("iframe", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
          CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
        },
        init: function(a) {
          var e = a.lang.iframe,
            b = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
          a.plugins.dialogadvtab && (b += ";iframe" + a.plugins.dialogadvtab.allowedContent({
            id: 1,
            classes: 1,
            styles: 1
          }));
          CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
          a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
            allowedContent: b,
            requiredContent: "iframe"
          }));
          a.ui.addButton && a.ui.addButton("Iframe", {
            label: e.toolbar,
            command: "iframe",
            toolbar: "insert,80"
          });
          a.on("doubleclick", function(a) {
            var b = a.data.element;
            b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe")
          });
          a.addMenuItems &&
            a.addMenuItems({
              iframe: {
                label: e.title,
                command: "iframe",
                group: "image"
              }
            });
          a.contextMenu && a.contextMenu.addListener(function(a) {
            if(a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return {
              iframe: CKEDITOR.TRISTATE_OFF
            }
          })
        },
        afterInit: function(a) {
          var e = a.dataProcessor;
          (e = e && e.dataFilter) && e.addRules({
            elements: {
              iframe: function(b) {
                return a.createFakeParserElement(b, "cke_iframe", "iframe", !0)
              }
            }
          })
        }
      })
    }(),
    function() {
      function a(a, c) {
        c || (c = a.getSelection().getSelectedElement());
        if(c && c.is("img") && !c.data("cke-realelement") &&
          !c.isReadOnly()) return c
      }

      function e(a) {
        var c = a.getStyle("float");
        if("inherit" == c || "none" == c) c = 0;
        c || (c = a.getAttribute("align"));
        return c
      }
      CKEDITOR.plugins.add("image", {
        requires: "dialog",
        init: function(b) {
          if(!b.plugins.image2) {
            CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
            var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
            CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
            b.addCommand("image", new CKEDITOR.dialogCommand("image", {
              allowedContent: c,
              requiredContent: "img[alt,src]",
              contentTransformations: [
                ["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
                ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
              ]
            }));
            b.ui.addButton && b.ui.addButton("Image", {
              label: b.lang.common.image,
              command: "image",
              toolbar: "insert,10"
            });
            b.on("doubleclick", function(a) {
              var b = a.data.element;
              !b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image")
            });
            b.addMenuItems &&
              b.addMenuItems({
                image: {
                  label: b.lang.image.menu,
                  command: "image",
                  group: "image"
                }
              });
            b.contextMenu && b.contextMenu.addListener(function(c) {
              if(a(b, c)) return {
                image: CKEDITOR.TRISTATE_OFF
              }
            })
          }
        },
        afterInit: function(b) {
          function c(c) {
            var l = b.getCommand("justify" + c);
            if(l) {
              if("left" == c || "right" == c) l.on("exec", function(h) {
                var d = a(b),
                  k;
                d && (k = e(d), k == c ? (d.removeStyle("float"), c == e(d) && d.removeAttribute("align")) : d.setStyle("float", c), h.cancel())
              });
              l.on("refresh", function(h) {
                var d = a(b);
                d && (d = e(d), this.setState(d == c ? CKEDITOR.TRISTATE_ON :
                  "right" == c || "left" == c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), h.cancel())
              })
            }
          }
          b.plugins.image2 || (c("left"), c("right"), c("center"), c("block"))
        }
      })
    }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0,
    function() {
      function a(a, f) {
        var l, h;
        f.on("refresh", function(a) {
          var c = [e],
            f;
          for(f in a.data.states) c.push(a.data.states[f]);
          this.setState(CKEDITOR.tools.search(c, b) ? b : e)
        }, f, null, 100);
        f.on("exec", function(b) {
          l = a.getSelection();
          h = l.createBookmarks(1);
          b.data || (b.data = {});
          b.data.done = !1
        }, f, null, 0);
        f.on("exec",
          function() {
            a.forceNextSelectionCheck();
            l.selectBookmarks(h)
          }, f, null, 100)
      }
      var e = CKEDITOR.TRISTATE_DISABLED,
        b = CKEDITOR.TRISTATE_OFF;
      CKEDITOR.plugins.add("indent", {
        init: function(b) {
          var e = CKEDITOR.plugins.indent.genericDefinition;
          a(b, b.addCommand("indent", new e(!0)));
          a(b, b.addCommand("outdent", new e));
          b.ui.addButton && (b.ui.addButton("Indent", {
            label: b.lang.indent.indent,
            command: "indent",
            directional: !0,
            toolbar: "indent,20"
          }), b.ui.addButton("Outdent", {
            label: b.lang.indent.outdent,
            command: "outdent",
            directional: !0,
            toolbar: "indent,10"
          }));
          b.on("dirChanged", function(a) {
            var e = b.createRange(),
              d = a.data.node;
            e.setStartBefore(d);
            e.setEndAfter(d);
            for(var f = new CKEDITOR.dom.walker(e), m; m = f.next();)
              if(m.type == CKEDITOR.NODE_ELEMENT)
                if(!m.equals(d) && m.getDirection()) e.setStartAfter(m), f = new CKEDITOR.dom.walker(e);
                else {
                  var g = b.config.indentClasses;
                  if(g)
                    for(var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++) m.hasClass(g[p] + n[0]) && (m.removeClass(g[p] + n[0]), m.addClass(g[p] + n[1]));
                  g = m.getStyle("margin-right");
                  n = m.getStyle("margin-left");
                  g ? m.setStyle("margin-left", g) : m.removeStyle("margin-left");
                  n ? m.setStyle("margin-right", n) : m.removeStyle("margin-right")
                }
          })
        }
      });
      CKEDITOR.plugins.indent = {
        genericDefinition: function(a) {
          this.isIndent = !!a;
          this.startDisabled = !this.isIndent
        },
        specificDefinition: function(a, b, e) {
          this.name = b;
          this.editor = a;
          this.jobs = {};
          this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
          this.isIndent = !!e;
          this.relatedGlobal = e ? "indent" : "outdent";
          this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
          this.database = {}
        },
        registerCommands: function(a,
          b) {
          a.on("pluginsLoaded", function() {
            for(var a in b)(function(a, b) {
              var c = a.getCommand(b.relatedGlobal),
                e;
              for(e in b.jobs) c.on("exec", function(c) {
                c.data.done || (a.fire("lockSnapshot"), b.execJob(a, e) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
              }, this, null, e), c.on("refresh", function(c) {
                c.data.states || (c.data.states = {});
                c.data.states[b.name + "@" + e] = b.refreshJob(a, e, c.data.path)
              }, this, null, e);
              a.addFeature(b)
            })(this, b[a])
          })
        }
      };
      CKEDITOR.plugins.indent.genericDefinition.prototype = {
        context: "p",
        exec: function() {}
      };
      CKEDITOR.plugins.indent.specificDefinition.prototype = {
        execJob: function(a, b) {
          var l = this.jobs[b];
          if(l.state != e) return l.exec.call(this, a)
        },
        refreshJob: function(a, b, l) {
          b = this.jobs[b];
          a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, l) : b.state = e;
          return b.state
        },
        getContext: function(a) {
          return a.contains(this.context)
        }
      }
    }(),
    function() {
      function a(a, b, c) {
        if(!a.getCustomData("indent_processed")) {
          var f = this.editor,
            g = this.isIndent;
          if(b) {
            f = a.$.className.match(this.classNameRegex);
            c = 0;
            f && (f = f[1], c = CKEDITOR.tools.indexOf(b, f) + 1);
            if(0 > (c += g ? 1 : -1)) return;
            c = Math.min(c, b.length);
            c = Math.max(c, 0);
            a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, ""));
            0 < c && a.addClass(b[c - 1])
          } else {
            b = e(a, c);
            c = parseInt(a.getStyle(b), 10);
            var l = f.config.indentOffset || 40;
            isNaN(c) && (c = 0);
            c += (g ? 1 : -1) * l;
            if(0 > c) return;
            c = Math.max(c, 0);
            c = Math.ceil(c / l) * l;
            a.setStyle(b, c ? c + (f.config.indentUnit || "px") : "");
            "" === a.getAttribute("style") && a.removeAttribute("style")
          }
          CKEDITOR.dom.element.setMarker(this.database,
            a, "indent_processed", 1)
        }
      }

      function e(a, b) {
        return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right"
      }
      var b = CKEDITOR.dtd.$listItem,
        c = CKEDITOR.dtd.$list,
        f = CKEDITOR.TRISTATE_DISABLED,
        l = CKEDITOR.TRISTATE_OFF;
      CKEDITOR.plugins.add("indentblock", {
        requires: "indent",
        init: function(h) {
          function d() {
            k.specificDefinition.apply(this, arguments);
            this.allowedContent = {
              "div h1 h2 h3 h4 h5 h6 ol p pre ul": {
                propertiesOnly: !0,
                styles: m ? null : "margin-left,margin-right",
                classes: m || null
              }
            };
            this.contentTransformations = [
              ["div: splitMarginShorthand"],
              ["h1: splitMarginShorthand"],
              ["h2: splitMarginShorthand"],
              ["h3: splitMarginShorthand"],
              ["h4: splitMarginShorthand"],
              ["h5: splitMarginShorthand"],
              ["h6: splitMarginShorthand"],
              ["ol: splitMarginShorthand"],
              ["p: splitMarginShorthand"],
              ["pre: splitMarginShorthand"],
              ["ul: splitMarginShorthand"]
            ];
            this.enterBr && (this.allowedContent.div = !0);
            this.requiredContent = (this.enterBr ? "div" : "p") + (m ? "(" + m.join(",") + ")" : "{margin-left}");
            this.jobs = {
              20: {
                refresh: function(a, c) {
                  var d = c.block ||
                    c.blockLimit;
                  if(!d.is(b)) var k = d.getAscendant(b),
                    d = k && c.contains(k) || d;
                  d.is(b) && (d = d.getParent());
                  if(this.enterBr || this.getContext(c)) {
                    if(m) {
                      var k = m,
                        d = d.$.className.match(this.classNameRegex),
                        h = this.isIndent,
                        k = d ? h ? d[1] != k.slice(-1) : !0 : h;
                      return k ? l : f
                    }
                    return this.isIndent ? l : d ? CKEDITOR[0 >= (parseInt(d.getStyle(e(d)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : f
                  }
                  return f
                },
                exec: function(b) {
                  var d = b.getSelection(),
                    d = d && d.getRanges()[0],
                    e;
                  if(e = b.elementPath().contains(c)) a.call(this, e, m);
                  else
                    for(d = d.createIterator(),
                      b = b.config.enterMode, d.enforceRealBlocks = !0, d.enlargeBr = b != CKEDITOR.ENTER_BR; e = d.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) e.isReadOnly() || a.call(this, e, m);
                  return !0
                }
              }
            }
          }
          var k = CKEDITOR.plugins.indent,
            m = h.config.indentClasses;
          k.registerCommands(h, {
            indentblock: new d(h, "indentblock", !0),
            outdentblock: new d(h, "outdentblock")
          });
          CKEDITOR.tools.extend(d.prototype, k.specificDefinition.prototype, {
            context: {
              div: 1,
              dl: 1,
              h1: 1,
              h2: 1,
              h3: 1,
              h4: 1,
              h5: 1,
              h6: 1,
              ul: 1,
              ol: 1,
              p: 1,
              pre: 1,
              table: 1
            },
            classNameRegex: m ? new RegExp("(?:^|\\s+)(" +
              m.join("|") + ")(?\x3d$|\\s)") : null
          })
        }
      })
    }(),
    function() {
      function a(a) {
        function c(e) {
          for(var k = l.startContainer, w = l.endContainer; k && !k.getParent().equals(e);) k = k.getParent();
          for(; w && !w.getParent().equals(e);) w = w.getParent();
          if(!k || !w) return !1;
          for(var B = [], q = !1; !q;) k.equals(w) && (q = !0), B.push(k), k = k.getNext();
          if(1 > B.length) return !1;
          k = e.getParents(!0);
          for(w = 0; w < k.length; w++)
            if(k[w].getName && h[k[w].getName()]) {
              e = k[w];
              break
            }
          for(var k = f.isIndent ? 1 : -1, w = B[0], B = B[B.length - 1], q = CKEDITOR.plugins.list.listToArray(e,
              g), z = q[B.getCustomData("listarray_index")].indent, w = w.getCustomData("listarray_index"); w <= B.getCustomData("listarray_index"); w++)
            if(q[w].indent += k, 0 < k) {
              for(var y = q[w].parent, x = w - 1; 0 <= x; x--)
                if(q[x].indent === k) {
                  y = q[x].parent;
                  break
                }
              q[w].parent = new CKEDITOR.dom.element(y.getName(), y.getDocument())
            }
          for(w = B.getCustomData("listarray_index") + 1; w < q.length && q[w].indent > z; w++) q[w].indent += k;
          k = CKEDITOR.plugins.list.arrayToList(q, g, null, a.config.enterMode, e.getDirection());
          if(!f.isIndent) {
            var C;
            if((C = e.getParent()) &&
              C.is("li"))
              for(var B = k.listNode.getChildren(), A = [], u, w = B.count() - 1; 0 <= w; w--)(u = B.getItem(w)) && u.is && u.is("li") && A.push(u)
          }
          k && k.listNode.replace(e);
          if(A && A.length)
            for(w = 0; w < A.length; w++) {
              for(u = e = A[w];
                (u = u.getNext()) && u.is && u.getName() in h;) CKEDITOR.env.needsNbspFiller && !e.getFirst(b) && e.append(l.document.createText(" ")), e.append(u);
              e.insertAfter(C)
            }
          k && a.fire("contentDomInvalidated");
          return !0
        }
        for(var f = this, g = this.database, h = this.context, l, t = a.getSelection(), t = (t && t.getRanges()).createIterator(); l =
          t.getNextRange();) {
          for(var A = l.getCommonAncestor(); A && (A.type != CKEDITOR.NODE_ELEMENT || !h[A.getName()]);) {
            if(a.editable().equals(A)) {
              A = !1;
              break
            }
            A = A.getParent()
          }
          A || (A = l.startPath().contains(h)) && l.setEndAt(A, CKEDITOR.POSITION_BEFORE_END);
          if(!A) {
            var u = l.getEnclosedNode();
            u && u.type == CKEDITOR.NODE_ELEMENT && u.getName() in h && (l.setStartAt(u, CKEDITOR.POSITION_AFTER_START), l.setEndAt(u, CKEDITOR.POSITION_BEFORE_END), A = u)
          }
          A && l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in h && (u = new CKEDITOR.dom.walker(l),
            u.evaluator = e, l.startContainer = u.next());
          A && l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in h && (u = new CKEDITOR.dom.walker(l), u.evaluator = e, l.endContainer = u.previous());
          if(A) return c(A)
        }
        return 0
      }

      function e(a) {
        return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
      }

      function b(a) {
        return c(a) && f(a)
      }
      var c = CKEDITOR.dom.walker.whitespaces(!0),
        f = CKEDITOR.dom.walker.bookmark(!1, !0),
        l = CKEDITOR.TRISTATE_DISABLED,
        h = CKEDITOR.TRISTATE_OFF;
      CKEDITOR.plugins.add("indentlist", {
        requires: "indent",
        init: function(b) {
          function c(b) {
            e.specificDefinition.apply(this,
              arguments);
            this.requiredContent = ["ul", "ol"];
            b.on("key", function(a) {
              var c = b.elementPath();
              if("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && c) {
                var d = this.getContext(c);
                !d || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, d) || (b.execCommand(this.relatedGlobal), a.cancel())
              }
            }, this);
            this.jobs[this.isIndent ? 10 : 30] = {
              refresh: this.isIndent ? function(a, b) {
                var c = this.getContext(b),
                  d = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c);
                return c && this.isIndent && !d ? h : l
              } : function(a,
                b) {
                return !this.getContext(b) || this.isIndent ? l : h
              },
              exec: CKEDITOR.tools.bind(a, this)
            }
          }
          var e = CKEDITOR.plugins.indent;
          e.registerCommands(b, {
            indentlist: new c(b, "indentlist", !0),
            outdentlist: new c(b, "outdentlist")
          });
          CKEDITOR.tools.extend(c.prototype, e.specificDefinition.prototype, {
            context: {
              ol: 1,
              ul: 1
            }
          })
        }
      });
      CKEDITOR.plugins.indentList = {};
      CKEDITOR.plugins.indentList.firstItemInPath = function(a, b, c) {
        var f = b.contains(e);
        c || (c = b.contains(a));
        return c && f && f.equals(c.getFirst(e))
      }
    }(),
    function() {
      function a(a, b) {
        b =
          void 0 === b || b;
        var e;
        if(b) e = a.getComputedStyle("text-align");
        else {
          for(; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
            e = a.getParent();
            if(!e) break;
            a = e
          }
          e = a.getStyle("text-align") || a.getAttribute("align") || ""
        }
        e && (e = e.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
        !e && b && (e = "rtl" == a.getComputedStyle("direction") ? "right" : "left");
        return e
      }

      function e(a, b, e) {
        this.editor = a;
        this.name = b;
        this.value = e;
        this.context = "p";
        b = a.config.justifyClasses;
        var h = a.config.enterMode == CKEDITOR.ENTER_P ?
          "p" : "div";
        if(b) {
          switch(e) {
            case "left":
              this.cssClassName = b[0];
              break;
            case "center":
              this.cssClassName = b[1];
              break;
            case "right":
              this.cssClassName = b[2];
              break;
            case "justify":
              this.cssClassName = b[3]
          }
          this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?\x3d$|\\s)");
          this.requiredContent = h + "(" + this.cssClassName + ")"
        } else this.requiredContent = h + "{text-align}";
        this.allowedContent = {
          "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
            propertiesOnly: !0,
            styles: this.cssClassName ? null : "text-align",
            classes: this.cssClassName ||
              null
          }
        };
        a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
      }

      function b(a) {
        var b = a.editor,
          e = b.createRange();
        e.setStartBefore(a.data.node);
        e.setEndAfter(a.data.node);
        for(var h = new CKEDITOR.dom.walker(e), d; d = h.next();)
          if(d.type == CKEDITOR.NODE_ELEMENT)
            if(!d.equals(a.data.node) && d.getDirection()) e.setStartAfter(d), h = new CKEDITOR.dom.walker(e);
            else {
              var k = b.config.justifyClasses;
              k && (d.hasClass(k[0]) ? (d.removeClass(k[0]), d.addClass(k[2])) : d.hasClass(k[2]) && (d.removeClass(k[2]), d.addClass(k[0])));
              k = d.getStyle("text-align");
              "left" == k ? d.setStyle("text-align", "right") : "right" == k && d.setStyle("text-align", "left")
            }
      }
      e.prototype = {
        exec: function(b) {
          var e = b.getSelection(),
            l = b.config.enterMode;
          if(e) {
            for(var h = e.createBookmarks(), d = e.getRanges(), k = this.cssClassName, m, g, n = b.config.useComputedState, n = void 0 === n || n, p = d.length - 1; 0 <= p; p--)
              for(m = d[p].createIterator(), m.enlargeBr = l != CKEDITOR.ENTER_BR; g = m.getNextParagraph(l == CKEDITOR.ENTER_P ? "p" : "div");)
                if(!g.isReadOnly()) {
                  var t = g.getName(),
                    A;
                  A = b.activeFilter.check(t +
                    "{text-align}");
                  if((t = b.activeFilter.check(t + "(" + k + ")")) || A) {
                    g.removeAttribute("align");
                    g.removeStyle("text-align");
                    var u = k && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))),
                      r = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(g, !0) != this.value);
                    k && t ? r ? g.addClass(k) : u || g.removeAttribute("class") : r && A && g.setStyle("text-align", this.value)
                  }
                }
            b.focus();
            b.forceNextSelectionCheck();
            e.selectBookmarks(h)
          }
        },
        refresh: function(b, e) {
          var l = e.block || e.blockLimit,
            h = l.getName(),
            d = l.equals(b.editable()),
            h = this.cssClassName ? b.activeFilter.check(h + "(" + this.cssClassName + ")") : b.activeFilter.check(h + "{text-align}");
          d && 1 === e.elements.length ? this.setState(CKEDITOR.TRISTATE_OFF) : !d && h ? this.setState(a(l, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
        }
      };
      CKEDITOR.plugins.add("justify", {
        init: function(a) {
          if(!a.blockless) {
            var f = new e(a, "justifyleft", "left"),
              l = new e(a, "justifycenter", "center"),
              h = new e(a, "justifyright", "right"),
              d = new e(a, "justifyblock", "justify");
            a.addCommand("justifyleft", f);
            a.addCommand("justifycenter", l);
            a.addCommand("justifyright", h);
            a.addCommand("justifyblock", d);
            a.ui.addButton && (a.ui.addButton("JustifyLeft", {
              label: a.lang.justify.left,
              command: "justifyleft",
              toolbar: "align,10"
            }), a.ui.addButton("JustifyCenter", {
              label: a.lang.justify.center,
              command: "justifycenter",
              toolbar: "align,20"
            }), a.ui.addButton("JustifyRight", {
              label: a.lang.justify.right,
              command: "justifyright",
              toolbar: "align,30"
            }), a.ui.addButton("JustifyBlock", {
              label: a.lang.justify.block,
              command: "justifyblock",
              toolbar: "align,40"
            }));
            a.on("dirChanged", b)
          }
        }
      })
    }(), CKEDITOR.plugins.add("menubutton", {
      requires: "button,menu",
      onLoad: function() {
        var a = function(a) {
          var b = this._,
            c = b.menu;
          b.state !== CKEDITOR.TRISTATE_DISABLED && (b.on && c ? c.hide() : (b.previousState = b.state, c || (c = b.menu = new CKEDITOR.menu(a, {
            panel: {
              className: "cke_menu_panel",
              attributes: {
                "aria-label": a.lang.common.options
              }
            }
          }), c.onHide = CKEDITOR.tools.bind(function() {
            var c = this.command ? a.getCommand(this.command).modes :
              this.modes;
            this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED);
            b.on = 0
          }, this), this.onMenu && c.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), b.on = 1, setTimeout(function() {
            c.show(CKEDITOR.document.getById(b.id), 4)
          }, 0)))
        };
        CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
          base: CKEDITOR.ui.button,
          $: function(e) {
            delete e.panel;
            this.base(e);
            this.hasArrow = !0;
            this.click = a
          },
          statics: {
            handler: {
              create: function(a) {
                return new CKEDITOR.ui.menuButton(a)
              }
            }
          }
        })
      },
      beforeInit: function(a) {
        a.ui.addHandler(CKEDITOR.UI_MENUBUTTON,
          CKEDITOR.ui.menuButton.handler)
      }
    }), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict",
    function() {
      CKEDITOR.plugins.add("language", {
        requires: "menubutton",
        init: function(a) {
          var e = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"],
            b = this,
            c = a.lang.language,
            f = {},
            l, h, d, k;
          a.addCommand("language", {
            allowedContent: "span[!lang,!dir]",
            requiredContent: "span[lang,dir]",
            contextSensitive: !0,
            exec: function(a, b) {
              var c = f["language_" + b];
              if(c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style)
            },
            refresh: function(a) {
              this.setState(b.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }
          });
          for(k = 0; k < e.length; k++) l = e[k].split(":"), h = l[0], d = "language_" + h, f[d] = {
            label: l[1],
            langId: h,
            group: "language",
            order: k,
            ltr: "rtl" != ("" + l[2]).toLowerCase(),
            onClick: function() {
              a.execCommand("language", this.langId)
            },
            role: "menuitemcheckbox"
          }, f[d].style = new CKEDITOR.style({
            element: "span",
            attributes: {
              lang: h,
              dir: f[d].ltr ? "ltr" : "rtl"
            }
          });
          f.language_remove = {
            label: c.remove,
            group: "language_remove",
            state: CKEDITOR.TRISTATE_DISABLED,
            order: f.length,
            onClick: function() {
              var c = b.getCurrentLangElement(a);
              c && a.execCommand("language", c.getAttribute("lang"))
            }
          };
          a.addMenuGroup("language", 1);
          a.addMenuGroup("language_remove");
          a.addMenuItems(f);
          a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
            label: c.button,
            allowedContent: "span[!lang,!dir]",
            requiredContent: "span[lang,dir]",
            toolbar: "bidi,30",
            command: "language",
            onMenu: function() {
              var c = {},
                d = b.getCurrentLangElement(a),
                e;
              for(e in f) c[e] = CKEDITOR.TRISTATE_OFF;
              c.language_remove = d ? CKEDITOR.TRISTATE_OFF :
                CKEDITOR.TRISTATE_DISABLED;
              d && (c["language_" + d.getAttribute("lang")] = CKEDITOR.TRISTATE_ON);
              return c
            }
          });
          a.addRemoveFormatFilter && a.addRemoveFormatFilter(function(a) {
            return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang"))
          })
        },
        getCurrentLangElement: function(a) {
          var e = a.elementPath();
          a = e && e.elements;
          var b;
          if(e)
            for(var c = 0; c < a.length; c++) e = a[c], !b && "span" == e.getName() && e.hasAttribute("dir") && e.hasAttribute("lang") && (b = e);
          return b
        }
      })
    }(), "use strict",
    function() {
      function a(a) {
        return a.replace(/'/g,
          "\\$\x26")
      }

      function e(a) {
        for(var b, c = a.length, d = [], e = 0; e < c; e++) b = a.charCodeAt(e), d.push(b);
        return "String.fromCharCode(" + d.join(",") + ")"
      }

      function b(b, c) {
        var d = b.plugins.link,
          e = d.compiledProtectionFunction.params,
          f, g;
        g = [d.compiledProtectionFunction.name, "("];
        for(var k = 0; k < e.length; k++) d = e[k].toLowerCase(), f = c[d], 0 < k && g.push(","), g.push("'", f ? a(encodeURIComponent(c[d])) : "", "'");
        g.push(")");
        return g.join("")
      }

      function c(a) {
        a = a.config.emailProtection || "";
        var b;
        a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/,
          function(a, c, d) {
            b.name = c;
            b.params = [];
            d.replace(/[^,\s]+/g, function(a) {
              b.params.push(a)
            })
          }));
        return b
      }
      CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
          function a(b) {
            return c.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
          }
          var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
            c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" +
            b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
          CKEDITOR.addCss(a("ltr") + a("rtl"))
        },
        init: function(a) {
          var b = "a[!href]";
          CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
          CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]"));
          a.addCommand("link", new CKEDITOR.dialogCommand("link", {
            allowedContent: b,
            requiredContent: "a[href]"
          }));
          a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
            allowedContent: "a[!name,id]",
            requiredContent: "a[name]"
          }));
          a.addCommand("unlink", new CKEDITOR.unlinkCommand);
          a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
          a.setKeystroke(CKEDITOR.CTRL + 76, "link");
          a.ui.addButton && (a.ui.addButton("Link", {
            label: a.lang.link.toolbar,
            command: "link",
            toolbar: "links,10"
          }), a.ui.addButton("Unlink", {
            label: a.lang.link.unlink,
            command: "unlink",
            toolbar: "links,20"
          }), a.ui.addButton("Anchor", {
            label: a.lang.link.anchor.toolbar,
            command: "anchor",
            toolbar: "links,30"
          }));
          CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
          CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
          a.on("doubleclick", function(b) {
            var c = b.data.element.getAscendant({
              a: 1,
              img: 1
            }, !0);
            c && !c.isReadOnly() && (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", b.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor"))
          }, null, null, 0);
          a.on("doubleclick", function(b) {
            b.data.dialog in {
              link: 1,
              anchor: 1
            } && b.data.link && a.getSelection().selectElement(b.data.link)
          }, null, null, 20);
          a.addMenuItems && a.addMenuItems({
            anchor: {
              label: a.lang.link.anchor.menu,
              command: "anchor",
              group: "anchor",
              order: 1
            },
            removeAnchor: {
              label: a.lang.link.anchor.remove,
              command: "removeAnchor",
              group: "anchor",
              order: 5
            },
            link: {
              label: a.lang.link.menu,
              command: "link",
              group: "link",
              order: 1
            },
            unlink: {
              label: a.lang.link.unlink,
              command: "unlink",
              group: "link",
              order: 5
            }
          });
          a.contextMenu && a.contextMenu.addListener(function(b) {
            if(!b ||
              b.isReadOnly()) return null;
            b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
            if(!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
            var c = {};
            b.getAttribute("href") && b.getChildCount() && (c = {
              link: CKEDITOR.TRISTATE_OFF,
              unlink: CKEDITOR.TRISTATE_OFF
            });
            b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF);
            return c
          });
          this.compiledProtectionFunction = c(a)
        },
        afterInit: function(a) {
          a.dataProcessor.dataFilter.addRules({
            elements: {
              a: function(b) {
                return b.attributes.name ? b.children.length ?
                  null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null
              }
            }
          });
          var b = a._.elementsPath && a._.elementsPath.filters;
          b && b.push(function(b, c) {
            if("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
          })
        }
      });
      var f = /^javascript:/,
        l = /^mailto:([^?]+)(?:\?(.+))?$/,
        h = /subject=([^;?:@&=$,\/]*)/i,
        d = /body=([^;?:@&=$,\/]*)/i,
        k = /^#(.*)$/,
        m = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
        g = /^(_(?:self|top|parent|blank))$/,
        n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
        p = /^javascript:([^(]+)\(([^)]+)\)$/,
        t = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
        A = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
        u = {
          id: "advId",
          dir: "advLangDir",
          accessKey: "advAccessKey",
          name: "advName",
          lang: "advLangCode",
          tabindex: "advTabIndex",
          title: "advTitle",
          type: "advContentType",
          "class": "advCSSClasses",
          charset: "advCharset",
          style: "advStyles",
          rel: "advRel"
        };
      CKEDITOR.plugins.link = {
        getSelectedLink: function(a, b) {
          var c = a.getSelection(),
            d = c.getSelectedElement(),
            e = c.getRanges(),
            f = [],
            g;
          if(!b && d && d.is("a")) return d;
          for(d = 0; d < e.length; d++)
            if(g = c.getRanges()[d], g.shrink(CKEDITOR.SHRINK_TEXT, !1, {
                skipBogus: !0
              }), (g = a.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) f.push(g);
            else if(g) return g;
          return b ? f : null
        },
        getEditorAnchors: function(a) {
          for(var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), d = [], e = 0, f; f = b.getItem(e++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && d.push({
            name: f.data("cke-saved-name") ||
              f.getAttribute("name"),
            id: f.getAttribute("id")
          });
          for(e = 0; f = c.getItem(e++);)(f = this.tryRestoreFakeAnchor(a, f)) && d.push({
            name: f.getAttribute("name"),
            id: f.getAttribute("id")
          });
          return d
        },
        fakeAnchor: !0,
        tryRestoreFakeAnchor: function(a, b) {
          if(b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
            var c = a.restoreRealElement(b);
            if(c.data("cke-saved-name")) return c
          }
        },
        parseLinkAttributes: function(a, b) {
          var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
            e = a.plugins.link.compiledProtectionFunction,
            q = a.config.emailProtection,
            z, y = {};
          c.match(f) && ("encode" == q ? c = c.replace(n, function(a, b, c) {
            c = c || "";
            return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'")
          }) : q && c.replace(p, function(a, b, c) {
            if(b == e.name) {
              y.type = "email";
              a = y.email = {};
              b = /(^')|('$)/g;
              c = c.match(/[^,\s]+/g);
              for(var d = c.length, f, g, k = 0; k < d; k++) f = decodeURIComponent, g = c[k].replace(b, "").replace(/\\'/g, "'"), g = f(g), f = e.params[k].toLowerCase(), a[f] = g;
              a.address = [a.name, a.domain].join("@")
            }
          }));
          if(!y.type)
            if(q = c.match(k)) y.type =
              "anchor", y.anchor = {}, y.anchor.name = y.anchor.id = q[1];
            else if(q = c.match(l)) {
            z = c.match(h);
            c = c.match(d);
            y.type = "email";
            var x = y.email = {};
            x.address = q[1];
            z && (x.subject = decodeURIComponent(z[1]));
            c && (x.body = decodeURIComponent(c[1]))
          } else c && (z = c.match(m)) && (y.type = "url", y.url = {}, y.url.protocol = z[1], y.url.url = z[2]);
          if(b) {
            if(c = b.getAttribute("target")) y.target = {
              type: c.match(g) ? c : "frame",
              name: c
            };
            else if(c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(t))
              for(y.target = {
                  type: "popup",
                  name: c[1]
                }; q =
                A.exec(c[2]);) "yes" != q[2] && "1" != q[2] || q[1] in {
                height: 1,
                width: 1,
                top: 1,
                left: 1
              } ? isFinite(q[2]) && (y.target[q[1]] = q[2]) : y.target[q[1]] = !0;
            null !== b.getAttribute("download") && (y.download = !0);
            var c = {},
              C;
            for(C in u)(q = b.getAttribute(C)) && (c[u[C]] = q);
            if(C = b.data("cke-saved-name") || c.advName) c.advName = C;
            CKEDITOR.tools.isEmpty(c) || (y.advanced = c)
          }
          return y
        },
        getLinkAttributes: function(c, d) {
          var f = c.config.emailProtection || "",
            g = {};
          switch(d.type) {
            case "url":
              var f = d.url && void 0 !== d.url.protocol ? d.url.protocol : "http://",
                k = d.url && CKEDITOR.tools.trim(d.url.url) || "";
              g["data-cke-saved-href"] = 0 === k.indexOf("/") ? k : f + k;
              break;
            case "anchor":
              f = d.anchor && d.anchor.id;
              g["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || f || "");
              break;
            case "email":
              var h = d.email,
                k = h.address;
              switch(f) {
                case "":
                case "encode":
                  var l = encodeURIComponent(h.subject || ""),
                    m = encodeURIComponent(h.body || ""),
                    h = [];
                  l && h.push("subject\x3d" + l);
                  m && h.push("body\x3d" + m);
                  h = h.length ? "?" + h.join("\x26") : "";
                  "encode" == f ? (f = ["javascript:void(location.href\x3d'mailto:'+",
                    e(k)
                  ], h && f.push("+'", a(h), "'"), f.push(")")) : f = ["mailto:", k, h];
                  break;
                default:
                  f = k.split("@", 2), h.name = f[0], h.domain = f[1], f = ["javascript:", b(c, h)]
              }
              g["data-cke-saved-href"] = f.join("")
          }
          if(d.target)
            if("popup" == d.target.type) {
              for(var f = ["window.open(this.href, '", d.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), k = n.length, l = function(a) {
                  d.target[a] && n.push(a + "\x3d" + d.target[a])
                }, h = 0; h < k; h++) n[h] += d.target[n[h]] ? "\x3dyes" : "\x3dno";
              l("width");
              l("left");
              l("height");
              l("top");
              f.push(n.join(","), "'); return false;");
              g["data-cke-pa-onclick"] = f.join("")
            } else "notSet" != d.target.type && d.target.name && (g.target = d.target.name);
          d.download && (g.download = "");
          if(d.advanced) {
            for(var p in u)(f = d.advanced[u[p]]) && (g[p] = f);
            g.name && (g["data-cke-saved-name"] = g.name)
          }
          g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]);
          p = {
            target: 1,
            onclick: 1,
            "data-cke-pa-onclick": 1,
            "data-cke-saved-name": 1,
            download: 1
          };
          d.advanced && CKEDITOR.tools.extend(p, u);
          for(var A in g) delete p[A];
          return {
            set: g,
            removed: CKEDITOR.tools.objectKeys(p)
          }
        },
        showDisplayTextForElement: function(a, b) {
          var c = {
              img: 1,
              table: 1,
              tbody: 1,
              thead: 1,
              tfoot: 1,
              input: 1,
              select: 1,
              textarea: 1
            },
            d = b.getSelection();
          return b.widgets && b.widgets.focused || d && 1 < d.getRanges().length ? !1 : !a || !a.getName || !a.is(c)
        }
      };
      CKEDITOR.unlinkCommand = function() {};
      CKEDITOR.unlinkCommand.prototype = {
        exec: function(a) {
          if(CKEDITOR.env.ie) {
            var b = a.getSelection().getRanges()[0],
              c = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) ||
              b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0),
              d;
            b.collapsed && c && (d = b.createBookmark(), b.selectNodeContents(c), b.select())
          }
          c = new CKEDITOR.style({
            element: "a",
            type: CKEDITOR.STYLE_INLINE,
            alwaysRemoveElement: 1
          });
          a.removeStyle(c);
          d && (b.moveToBookmark(d), b.select())
        },
        refresh: function(a, b) {
          var c = b.lastElement && b.lastElement.getAscendant("a", !0);
          c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
        },
        contextSensitive: 1,
        startDisabled: 1,
        requiredContent: "a[href]",
        editorFocus: 1
      };
      CKEDITOR.removeAnchorCommand = function() {};
      CKEDITOR.removeAnchorCommand.prototype = {
        exec: function(a) {
          var b = a.getSelection(),
            c = b.createBookmarks(),
            d;
          if(b && (d = b.getSelectedElement()) && (d.getChildCount() ? d.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d))) d.remove(1);
          else if(d = CKEDITOR.plugins.link.getSelectedLink(a)) d.hasAttribute("href") ? (d.removeAttributes({
              name: 1,
              "data-cke-saved-name": 1
            }), d.removeClass("cke_anchor")) :
            d.remove(1);
          b.selectBookmarks(c)
        },
        requiredContent: "a[name]"
      };
      CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
      })
    }(),
    function() {
      function a(a, b, c) {
        function d(c) {
          if(!(!(l = h[c ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({
              br: 1
            }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](l)
        }
        for(var e = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
          var k =
            b.contents[g];
          (k = k.getAscendant("li", !0)) && !k.getCustomData("list_item_processed") && (f.push(k), CKEDITOR.dom.element.setMarker(c, k, "list_item_processed", !0))
        }
        k = null;
        for(g = 0; g < f.length; g++) k = f[g].getCustomData("listarray_index"), e[k].indent = -1;
        for(g = k + 1; g < e.length; g++)
          if(e[g].indent > e[g - 1].indent + 1) {
            f = e[g - 1].indent + 1 - e[g].indent;
            for(k = e[g].indent; e[g] && e[g].indent >= k;) e[g].indent += f, g++;
            g--
          }
        var h = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
          l, m;
        d(!0);
        d();
        h.replace(b.root);
        a.fire("contentDomInvalidated")
      }

      function e(a, b) {
        this.name = a;
        this.context = this.type = b;
        this.allowedContent = b + " li";
        this.requiredContent = b
      }

      function b(a, b, c, d) {
        for(var e, f; e = a[d ? "getLast" : "getFirst"](t);)(f = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", f), e.remove(), c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d)
      }

      function c(a) {
        function c(d) {
          var e = a[d ? "getPrevious" : "getNext"](g);
          e && e.type == CKEDITOR.NODE_ELEMENT && e.is(a.getName()) && (b(a, e, null, !d), a.remove(),
            a = e)
        }
        c();
        c(1)
      }

      function f(a) {
        return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
      }

      function l(a, d, e) {
        a.fire("saveSnapshot");
        e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
        var f = e.extractContents();
        d.trim(!1, !0);
        var k = d.createBookmark(),
          l = new CKEDITOR.dom.elementPath(d.startContainer),
          m = l.block,
          l = l.lastElement.getAscendant("li", 1) || m,
          z = new CKEDITOR.dom.elementPath(e.startContainer),
          y = z.contains(CKEDITOR.dtd.$listItem),
          z = z.contains(CKEDITOR.dtd.$list);
        m ? (m = m.getBogus()) && m.remove() : z && (m = z.getPrevious(g)) && n(m) && m.remove();
        (m = f.getLast()) && m.type == CKEDITOR.NODE_ELEMENT && m.is("br") && m.remove();
        (m = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(m): d.startContainer.append(f);
        y && (f = h(y)) && (l.contains(y) ? (b(f, y.getParent(), y), f.remove()) : l.append(f));
        for(; e.checkStartOfBlock() && e.checkEndOfBlock();) {
          z = e.startPath();
          f = z.block;
          if(!f) break;
          f.is("li") && (l = f.getParent(), f.equals(l.getLast(g)) && f.equals(l.getFirst(g)) &&
            (f = l));
          e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
          f.remove()
        }
        e = e.clone();
        f = a.editable();
        e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
        e = new CKEDITOR.dom.walker(e);
        e.evaluator = function(a) {
          return g(a) && !n(a)
        };
        (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && c(e);
        d.moveToBookmark(k);
        d.select();
        a.fire("saveSnapshot")
      }

      function h(a) {
        return(a = a.getLast(g)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in d ? a : null
      }
      var d = {
          ol: 1,
          ul: 1
        },
        k = CKEDITOR.dom.walker.whitespaces(),
        m = CKEDITOR.dom.walker.bookmark(),
        g = function(a) {
          return !(k(a) || m(a))
        },
        n = CKEDITOR.dom.walker.bogus();
      CKEDITOR.plugins.list = {
        listToArray: function(a, b, c, e, f) {
          if(!d[a.getName()]) return [];
          e || (e = 0);
          c || (c = []);
          for(var g = 0, k = a.getChildCount(); g < k; g++) {
            var h = a.getChild(g);
            h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, b, c, e + 1);
            if("li" == h.$.nodeName.toLowerCase()) {
              var l = {
                parent: a,
                indent: e,
                element: h,
                contents: []
              };
              f ? l.grandparent = f : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() &&
                (l.grandparent = l.grandparent.getParent()));
              b && CKEDITOR.dom.element.setMarker(b, h, "listarray_index", c.length);
              c.push(l);
              for(var m = 0, n = h.getChildCount(), p; m < n; m++) p = h.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && d[p.getName()] ? CKEDITOR.plugins.list.listToArray(p, b, c, e + 1, l.grandparent) : l.contents.push(p)
            }
          }
          return c
        },
        arrayToList: function(a, b, c, e, f) {
          c || (c = 0);
          if(!a || a.length < c + 1) return null;
          for(var k, h = a[c].parent.getDocument(), l = new CKEDITOR.dom.documentFragment(h), n = null, x = c, p = Math.max(a[c].indent, 0), D =
              null, t, E, I = e == CKEDITOR.ENTER_P ? "p" : "div";;) {
            var G = a[x];
            k = G.grandparent;
            t = G.element.getDirection(1);
            if(G.indent == p) {
              n && a[x].parent.getName() == n.getName() || (n = a[x].parent.clone(!1, 1), f && n.setAttribute("dir", f), l.append(n));
              D = n.append(G.element.clone(0, 1));
              t != n.getDirection(1) && D.setAttribute("dir", t);
              for(k = 0; k < G.contents.length; k++) D.append(G.contents[k].clone(1, 1));
              x++
            } else if(G.indent == Math.max(p, 0) + 1) G = a[x - 1].element.getDirection(1), x = CKEDITOR.plugins.list.arrayToList(a, null, x, e, G != t ? t : null), !D.getChildCount() &&
              CKEDITOR.env.needsNbspFiller && 7 >= h.$.documentMode && D.append(h.createText(" ")), D.append(x.listNode), x = x.nextIndex;
            else if(-1 == G.indent && !c && k) {
              d[k.getName()] ? (D = G.element.clone(!1, !0), t != k.getDirection(1) && D.setAttribute("dir", t)) : D = new CKEDITOR.dom.documentFragment(h);
              var n = k.getDirection(1) != t,
                J = G.element,
                M = J.getAttribute("class"),
                F = J.getAttribute("style"),
                Q = D.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e != CKEDITOR.ENTER_BR || n || F || M),
                N, R = G.contents.length,
                K;
              for(k = 0; k < R; k++)
                if(N = G.contents[k], m(N) &&
                  1 < R) Q ? K = N.clone(1, 1) : D.append(N.clone(1, 1));
                else if(N.type == CKEDITOR.NODE_ELEMENT && N.isBlockBoundary()) {
                n && !N.getDirection() && N.setAttribute("dir", t);
                E = N;
                var U = J.getAttribute("style");
                U && E.setAttribute("style", U.replace(/([^;])$/, "$1;") + (E.getAttribute("style") || ""));
                M && N.addClass(M);
                E = null;
                K && (D.append(K), K = null);
                D.append(N.clone(1, 1))
              } else Q ? (E || (E = h.createElement(I), D.append(E), n && E.setAttribute("dir", t)), F && E.setAttribute("style", F), M && E.setAttribute("class", M), K && (E.append(K), K = null), E.append(N.clone(1,
                1))) : D.append(N.clone(1, 1));
              K && ((E || D).append(K), K = null);
              D.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && x != a.length - 1 && (CKEDITOR.env.needsBrFiller && (t = D.getLast()) && t.type == CKEDITOR.NODE_ELEMENT && t.is("br") && t.remove(), (t = D.getLast(g)) && t.type == CKEDITOR.NODE_ELEMENT && t.is(CKEDITOR.dtd.$block) || D.append(h.createElement("br")));
              t = D.$.nodeName.toLowerCase();
              "div" != t && "p" != t || D.appendBogus();
              l.append(D);
              n = null;
              x++
            } else return null;
            E = null;
            if(a.length <= x || Math.max(a[x].indent, 0) < p) break
          }
          if(b)
            for(a = l.getFirst(); a;) {
              if(a.type ==
                CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, h = f = e = void 0, e = c.getDirection()))) {
                for(f = c.getParent(); f && !(h = f.getDirection());) f = f.getParent();
                e == h && c.removeAttribute("dir")
              }
              a = a.getNextSourceNode()
            }
          return {
            listNode: l,
            nextIndex: x
          }
        }
      };
      var p = /^h[1-6]$/,
        t = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
      e.prototype = {
        exec: function(b) {
          this.refresh(b, b.elementPath());
          var e = b.config,
            f = b.getSelection(),
            k = f && f.getRanges();
          if(this.state == CKEDITOR.TRISTATE_OFF) {
            var h =
              b.editable();
            if(h.getFirst(g)) {
              var l = 1 == k.length && k[0];
              (e = l && l.getEnclosedNode()) && e.is && this.type == e.getName() && this.setState(CKEDITOR.TRISTATE_ON)
            } else e.enterMode == CKEDITOR.ENTER_BR ? h.appendBogus() : k[0].fixBlock(1, e.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), f.selectRanges(k)
          }
          for(var e = f.createBookmarks(!0), h = [], m = {}, k = k.createIterator(), n = 0;
            (l = k.getNextRange()) && ++n;) {
            var y = l.getBoundaryNodes(),
              x = y.startNode,
              C = y.endNode;
            x.type == CKEDITOR.NODE_ELEMENT && "td" == x.getName() && l.setStartAt(y.startNode, CKEDITOR.POSITION_AFTER_START);
            C.type == CKEDITOR.NODE_ELEMENT && "td" == C.getName() && l.setEndAt(y.endNode, CKEDITOR.POSITION_BEFORE_END);
            l = l.createIterator();
            for(l.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; y = l.getNextParagraph();)
              if(!y.getCustomData("list_block")) {
                CKEDITOR.dom.element.setMarker(m, y, "list_block", 1);
                for(var t = b.elementPath(y), x = t.elements, C = 0, t = t.blockLimit, H, E = x.length - 1; 0 <= E && (H = x[E]); E--)
                  if(d[H.getName()] && t.contains(H)) {
                    t.removeCustomData("list_group_object_" + n);
                    (x = H.getCustomData("list_group_object")) ? x.contents.push(y):
                      (x = {
                        root: H,
                        contents: [y]
                      }, h.push(x), CKEDITOR.dom.element.setMarker(m, H, "list_group_object", x));
                    C = 1;
                    break
                  }
                C || (C = t, C.getCustomData("list_group_object_" + n) ? C.getCustomData("list_group_object_" + n).contents.push(y) : (x = {
                  root: C,
                  contents: [y]
                }, CKEDITOR.dom.element.setMarker(m, C, "list_group_object_" + n, x), h.push(x)))
              }
          }
          for(H = []; 0 < h.length;)
            if(x = h.shift(), this.state == CKEDITOR.TRISTATE_OFF)
              if(d[x.root.getName()]) {
                k = b;
                n = x;
                x = m;
                l = H;
                C = CKEDITOR.plugins.list.listToArray(n.root, x);
                t = [];
                for(y = 0; y < n.contents.length; y++) E =
                  n.contents[y], (E = E.getAscendant("li", !0)) && !E.getCustomData("list_item_processed") && (t.push(E), CKEDITOR.dom.element.setMarker(x, E, "list_item_processed", !0));
                for(var E = n.root.getDocument(), I = void 0, G = void 0, y = 0; y < t.length; y++) {
                  var J = t[y].getCustomData("listarray_index"),
                    I = C[J].parent;
                  I.is(this.type) || (G = E.createElement(this.type), I.copyAttributes(G, {
                    start: 1,
                    type: 1
                  }), G.removeStyle("list-style-type"), C[J].parent = G)
                }
                x = CKEDITOR.plugins.list.arrayToList(C, x, null, k.config.enterMode);
                C = void 0;
                t = x.listNode.getChildCount();
                for(y = 0; y < t && (C = x.listNode.getChild(y)); y++) C.getName() == this.type && l.push(C);
                x.listNode.replace(n.root);
                k.fire("contentDomInvalidated")
              } else {
                C = b;
                l = x;
                y = H;
                t = l.contents;
                k = l.root.getDocument();
                n = [];
                1 == t.length && t[0].equals(l.root) && (x = k.createElement("div"), t[0].moveChildren && t[0].moveChildren(x), t[0].append(x), t[0] = x);
                l = l.contents[0].getParent();
                for(E = 0; E < t.length; E++) l = l.getCommonAncestor(t[E].getParent());
                I = C.config.useComputedState;
                C = x = void 0;
                I = void 0 === I || I;
                for(E = 0; E < t.length; E++)
                  for(G = t[E]; J = G.getParent();) {
                    if(J.equals(l)) {
                      n.push(G);
                      !C && G.getDirection() && (C = 1);
                      G = G.getDirection(I);
                      null !== x && (x = x && x != G ? null : G);
                      break
                    }
                    G = J
                  }
                if(!(1 > n.length)) {
                  t = n[n.length - 1].getNext();
                  E = k.createElement(this.type);
                  y.push(E);
                  for(I = y = void 0; n.length;) y = n.shift(), I = k.createElement("li"), G = y, G.is("pre") || p.test(G.getName()) || "false" == G.getAttribute("contenteditable") ? y.appendTo(I) : (y.copyAttributes(I), x && y.getDirection() && (I.removeStyle("direction"), I.removeAttribute("dir")), y.moveChildren(I), y.remove()), I.appendTo(E);
                  x && C && E.setAttribute("dir", x);
                  t ? E.insertBefore(t) :
                    E.appendTo(l)
                }
              }
          else this.state == CKEDITOR.TRISTATE_ON && d[x.root.getName()] && a.call(this, b, x, m);
          for(E = 0; E < H.length; E++) c(H[E]);
          CKEDITOR.dom.element.clearAllMarkers(m);
          f.selectBookmarks(e);
          b.focus()
        },
        refresh: function(a, b) {
          var c = b.contains(d, 1),
            e = b.blockLimit || b.root;
          c && e.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
        }
      };
      CKEDITOR.plugins.add("list", {
        requires: "indentlist",
        init: function(a) {
          a.blockless || (a.addCommand("numberedlist",
            new e("numberedlist", "ol")), a.addCommand("bulletedlist", new e("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", {
            label: a.lang.list.numberedlist,
            command: "numberedlist",
            directional: !0,
            toolbar: "list,10"
          }), a.ui.addButton("BulletedList", {
            label: a.lang.list.bulletedlist,
            command: "bulletedlist",
            directional: !0,
            toolbar: "list,20"
          })), a.on("key", function(b) {
            var c = b.data.domEvent.getKey(),
              e;
            if("wysiwyg" == a.mode && c in {
                8: 1,
                46: 1
              }) {
              var k = a.getSelection().getRanges()[0],
                m = k && k.startPath();
              if(k && k.collapsed) {
                var q =
                  8 == c,
                  z = a.editable(),
                  y = new CKEDITOR.dom.walker(k.clone());
                y.evaluator = function(a) {
                  return g(a) && !n(a)
                };
                y.guard = function(a, b) {
                  return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
                };
                c = k.clone();
                if(q) {
                  var x;
                  (x = m.contains(d)) && k.checkBoundaryOfElement(x, CKEDITOR.START) && (x = x.getParent()) && x.is("li") && (x = h(x)) ? (e = x, x = x.getPrevious(g), c.moveToPosition(x && n(x) ? x : e, CKEDITOR.POSITION_BEFORE_START)) : (y.range.setStartAt(z, CKEDITOR.POSITION_AFTER_START), y.range.setEnd(k.startContainer, k.startOffset), (x = y.previous()) &&
                    x.type == CKEDITOR.NODE_ELEMENT && (x.getName() in d || x.is("li")) && (x.is("li") || (y.range.selectNodeContents(x), y.reset(), y.evaluator = f, x = y.previous()), e = x, c.moveToElementEditEnd(e), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
                  if(e) l(a, c, k), b.cancel();
                  else {
                    var p = m.contains(d);
                    p && k.checkBoundaryOfElement(p, CKEDITOR.START) && (e = p.getFirst(g), k.checkBoundaryOfElement(e, CKEDITOR.START) && (x = p.getPrevious(g), h(e) ? x && (k.moveToElementEditEnd(x), k.select()) : a.execCommand("outdent"), b.cancel()))
                  }
                } else if(e =
                  m.contains("li")) {
                  if(y.range.setEndAt(z, CKEDITOR.POSITION_BEFORE_END), q = (z = e.getLast(g)) && f(z) ? z : e, m = 0, (x = y.next()) && x.type == CKEDITOR.NODE_ELEMENT && x.getName() in d && x.equals(z) ? (m = 1, x = y.next()) : k.checkBoundaryOfElement(q, CKEDITOR.END) && (m = 2), m && x) {
                    k = k.clone();
                    k.moveToElementEditStart(x);
                    if(1 == m && (c.optimize(), !c.startContainer.equals(e))) {
                      for(e = c.startContainer; e.is(CKEDITOR.dtd.$inline);) p = e, e = e.getParent();
                      p && c.moveToPosition(p, CKEDITOR.POSITION_AFTER_END)
                    }
                    2 == m && (c.moveToPosition(c.endPath().block,
                      CKEDITOR.POSITION_BEFORE_END), k.endPath().block && k.moveToPosition(k.endPath().block, CKEDITOR.POSITION_AFTER_START));
                    l(a, c, k);
                    b.cancel()
                  }
                } else y.range.setEndAt(z, CKEDITOR.POSITION_BEFORE_END), (x = y.next()) && x.type == CKEDITOR.NODE_ELEMENT && x.is(d) && (x = x.getFirst(g), m.block && k.checkStartOfBlock() && k.checkEndOfBlock() ? (m.block.remove(), k.moveToElementEditStart(x), k.select()) : h(x) ? (k.moveToElementEditStart(x), k.select()) : (k = k.clone(), k.moveToElementEditStart(x), l(a, c, k)), b.cancel());
                setTimeout(function() {
                  a.selectionChange(1)
                })
              }
            }
          }))
        }
      })
    }(),
    function() {
      CKEDITOR.plugins.liststyle = {
        requires: "dialog,contextmenu",
        init: function(a) {
          if(!a.blockless) {
            var e;
            e = new CKEDITOR.dialogCommand("numberedListStyle", {
              requiredContent: "ol",
              allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]",
              contentTransformations: [
                ["ol: listTypeToStyle"]
              ]
            });
            e = a.addCommand("numberedListStyle", e);
            a.addFeature(e);
            CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
            e = new CKEDITOR.dialogCommand("bulletedListStyle", {
              requiredContent: "ul",
              allowedContent: "ul{list-style-type}",
              contentTransformations: [
                ["ul: listTypeToStyle"]
              ]
            });
            e = a.addCommand("bulletedListStyle", e);
            a.addFeature(e);
            CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
            a.addMenuGroup("list", 108);
            a.addMenuItems({
              numberedlist: {
                label: a.lang.liststyle.numberedTitle,
                group: "list",
                command: "numberedListStyle"
              },
              bulletedlist: {
                label: a.lang.liststyle.bulletedTitle,
                group: "list",
                command: "bulletedListStyle"
              }
            });
            a.contextMenu.addListener(function(a) {
              if(!a || a.isReadOnly()) return null;
              for(; a;) {
                var c = a.getName();
                if("ol" == c) return {
                  numberedlist: CKEDITOR.TRISTATE_OFF
                };
                if("ul" == c) return {
                  bulletedlist: CKEDITOR.TRISTATE_OFF
                };
                a = a.getParent()
              }
              return null
            })
          }
        }
      };
      CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
    }(), "use strict",
    function() {
      function a(a, b, c) {
        return n(b) && n(c) && c.equals(b.getNext(function(a) {
          return !(Y(a) || Z(a) || p(a))
        }))
      }

      function e(a) {
        this.upper = a[0];
        this.lower = a[1];
        this.set.apply(this, a.slice(2))
      }

      function b(a) {
        var b = a.element;
        if(b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
          var c = h(b);
          if("true" == c.getAttribute("contenteditable")) return b;
          if(c.is(a.triggers)) return c
        }
        return null
      }

      function c(a, b, c) {
        q(a, b);
        q(a, c);
        a = b.size.bottom;
        c = c.size.top;
        return a && c ? 0 | (a + c) / 2 : a || c
      }

      function f(a, b, c) {
        return b = b[c ? "getPrevious" : "getNext"](function(b) {
          return b && b.type == CKEDITOR.NODE_TEXT && !Y(b) || n(b) && !p(b) && !g(a, b)
        })
      }

      function l(a, b, c) {
        return a > b && a < c
      }

      function h(a, b) {
        if(a.data("cke-editable")) return null;
        for(b || (a = a.getParent()); a && !a.data("cke-editable");) {
          if(a.hasAttribute("contenteditable")) return a;
          a = a.getParent()
        }
        return null
      }

      function d(a) {
        var b = a.doc,
          c = H('\x3cspan contenteditable\x3d"false" style\x3d"' + T + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b),
          d = CKEDITOR.getUrl(this.path + "images/" + (E.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
        C(c, {
          attach: function() {
            this.wrap.getParent() || this.wrap.appendTo(a.editable, !0);
            return this
          },
          lineChildren: [C(H('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',
            b), {
            base: T + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (E.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (E.hidpi ? "background-size: 9px 10px;" : ""),
            looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
          }), C(H(X, b), {
            base: S + "left:0px;border-left-color:" + a.boxColor + ";",
            looks: ["border-width:8px 0 8px 8px;top:-8px",
              "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"
            ]
          }), C(H(X, b), {
            base: S + "right:0px;border-right-color:" + a.boxColor + ";",
            looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
          })],
          detach: function() {
            this.wrap.getParent() && this.wrap.remove();
            return this
          },
          mouseNear: function() {
            q(a, this);
            var b = a.holdDistance,
              c = this.size;
            return c && l(a.mouse.y, c.top - b, c.bottom + b) && l(a.mouse.x, c.left - b, c.right + b) ? !0 : !1
          },
          place: function() {
            var b = a.view,
              c = a.editable,
              d = a.trigger,
              e = d.upper,
              f = d.lower,
              g = e || f,
              k = g.getParent(),
              h = {};
            this.trigger = d;
            e && q(a, e, !0);
            f && q(a, f, !0);
            q(a, k, !0);
            a.inInlineMode && z(a, !0);
            k.equals(c) ? (h.left = b.scroll.x, h.right = -b.scroll.x, h.width = "") : (h.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), h.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x, h.right = "");
            e && f ? h.top = e.size.margin.bottom === f.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom <
              f.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - f.size.margin.top : e ? f || (h.top = e.size.bottom + e.size.margin.bottom) : h.top = f.size.top - f.size.margin.top;
            d.is(R) || l(h.top, b.scroll.y - 15, b.scroll.y + 5) ? (h.top = a.inInlineMode ? 0 : b.scroll.y, this.look(R)) : d.is(K) || l(h.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (h.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(K)) : (a.inInlineMode && (h.top -= b.editable.top + b.editable.border.top),
              this.look(U));
            a.inInlineMode && (h.top--, h.top += b.editable.scroll.top, h.left += b.editable.scroll.left);
            for(var m in h) h[m] = CKEDITOR.tools.cssLength(h[m]);
            this.setStyles(h)
          },
          look: function(a) {
            if(this.oldLook != a) {
              for(var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
              this.oldLook = a
            }
          },
          wrap: new D("span", a.doc)
        });
        for(b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c);
        c.look(U);
        c.appendTo(c.wrap);
        c.unselectable();
        c.lineChildren[0].on("mouseup",
          function(b) {
            c.detach();
            k(a, function(b) {
              var c = a.line.trigger;
              b[c.is(M) ? "insertBefore" : "insertAfter"](c.is(M) ? c.lower : c.upper)
            }, !0);
            a.editor.focus();
            E.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
            b.data.preventDefault(!0)
          });
        c.on("mousedown", function(a) {
          a.data.preventDefault(!0)
        });
        a.line = c
      }

      function k(a, b, c) {
        var d = new CKEDITOR.dom.range(a.doc),
          e = a.editor,
          f;
        E.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(ca) : (f = (f = h(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new D(J[f],
          a.doc), f.is("br") || a.doc.createText(ca).appendTo(f));
        c && e.fire("saveSnapshot");
        b(f);
        d.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
        e.getSelection().selectRanges([d]);
        a.hotNode = f;
        c && e.fire("saveSnapshot")
      }

      function m(a, c) {
        return {
          canUndo: !0,
          modes: {
            wysiwyg: 1
          },
          exec: function() {
            function d(b) {
              var e = E.ie && 9 > E.version ? " " : ca,
                f = a.hotNode && a.hotNode.getText() == e && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
              k(a, function(d) {
                f && a.hotNode && a.hotNode.remove();
                d[c ? "insertAfter" : "insertBefore"](b);
                d.setAttributes({
                  "data-cke-magicline-hot": 1,
                  "data-cke-magicline-dir": !!c
                });
                a.lastCmdDirection = !!c
              });
              E.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
              a.line.detach()
            }
            return function(e) {
              e = e.getSelection().getStartElement();
              var g;
              e = e.getAscendant(P, 1);
              if(!u(a, e) && e && !e.equals(a.editable) && !e.contains(a.editable)) {
                (g = h(e)) && "false" == g.getAttribute("contenteditable") && (e = g);
                a.element = e;
                g = f(a, e, !c);
                var k;
                n(g) && g.is(a.triggers) && g.is(O) && (!f(a, g, !c) || (k = f(a, g, !c)) && n(k) && k.is(a.triggers)) ? d(g) : (k = b(a, e), n(k) && (f(a, k, !c) ? (e = f(a, k, !c)) &&
                  n(e) && e.is(a.triggers) && d(k) : d(k)))
              }
            }
          }()
        }
      }

      function g(a, b) {
        if(!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1;
        var c = a.line;
        return c.wrap.equals(b) || c.wrap.contains(b)
      }

      function n(a) {
        return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
      }

      function p(a) {
        if(!n(a)) return !1;
        var b;
        (b = t(a)) || (n(a) ? (b = {
          left: 1,
          right: 1,
          center: 1
        }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1);
        return b
      }

      function t(a) {
        return !!{
          absolute: 1,
          fixed: 1
        }[a.getComputedStyle("position")]
      }

      function A(a, b) {
        return n(b) ? b.is(a.triggers) :
          null
      }

      function u(a, b) {
        if(!b) return !1;
        for(var c = b.getParents(1), d = c.length; d--;)
          for(var e = a.tabuList.length; e--;)
            if(c[d].hasAttribute(a.tabuList[e])) return !0;
        return !1
      }

      function r(a, b, c) {
        b = b[c ? "getLast" : "getFirst"](function(b) {
          return a.isRelevant(b) && !b.is(fa)
        });
        if(!b) return !1;
        q(a, b);
        return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
      }

      function v(a) {
        var b = a.editable,
          c = a.mouse,
          d = a.view,
          f = a.triggerOffset;
        z(a);
        var k = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) /
            2),
          b = b[k ? "getLast" : "getFirst"](function(a) {
            return !(Y(a) || Z(a))
          });
        if(!b) return null;
        g(a, b) && (b = a.line.wrap[k ? "getPrevious" : "getNext"](function(a) {
          return !(Y(a) || Z(a))
        }));
        if(!n(b) || p(b) || !A(a, b)) return null;
        q(a, b);
        return !k && 0 <= b.size.top && l(c.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === d.scroll.y ? R : U, new e([null, b, M, N, a])) : k && b.size.bottom <= d.pane.height && l(c.y, b.size.bottom - f, d.pane.height) ? (a = a.inInlineMode || l(b.size.bottom, d.pane.height - f, d.pane.height) ? K : U, new e([b, null, F, N, a])) : null
      }

      function w(a) {
        var c =
          a.mouse,
          d = a.view,
          g = a.triggerOffset,
          k = b(a);
        if(!k) return null;
        q(a, k);
        var g = Math.min(g, 0 | k.size.outerHeight / 2),
          h = [],
          m, y;
        if(l(c.y, k.size.top - 1, k.size.top + g)) y = !1;
        else if(l(c.y, k.size.bottom - g, k.size.bottom + 1)) y = !0;
        else return null;
        if(p(k) || r(a, k, y) || k.getParent().is(ba)) return null;
        var x = f(a, k, !y);
        if(x) {
          if(x && x.type == CKEDITOR.NODE_TEXT) return null;
          if(n(x)) {
            if(p(x) || !A(a, x) || x.getParent().is(ba)) return null;
            h = [x, k][y ? "reverse" : "concat"]().concat([Q, N])
          }
        } else k.equals(a.editable[y ? "getLast" : "getFirst"](a.isRelevant)) ?
          (z(a), y && l(c.y, k.size.bottom - g, d.pane.height) && l(k.size.bottom, d.pane.height - g, d.pane.height) ? m = K : l(c.y, 0, k.size.top + g) && (m = R)) : m = U, h = [null, k][y ? "reverse" : "concat"]().concat([y ? F : M, N, m, k.equals(a.editable[y ? "getLast" : "getFirst"](a.isRelevant)) ? y ? K : R : U]);
        return 0 in h ? new e(h) : null
      }

      function B(a, b, c, d) {
        for(var e = b.getDocumentPosition(), f = {}, g = {}, k = {}, h = {}, l = aa.length; l--;) f[aa[l]] = parseInt(b.getComputedStyle.call(b, "border-" + aa[l] + "-width"), 10) || 0, k[aa[l]] = parseInt(b.getComputedStyle.call(b, "padding-" +
          aa[l]), 10) || 0, g[aa[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + aa[l]), 10) || 0;
        c && !d || y(a, d);
        h.top = e.y - (c ? 0 : a.view.scroll.y);
        h.left = e.x - (c ? 0 : a.view.scroll.x);
        h.outerWidth = b.$.offsetWidth;
        h.outerHeight = b.$.offsetHeight;
        h.height = h.outerHeight - (k.top + k.bottom + f.top + f.bottom);
        h.width = h.outerWidth - (k.left + k.right + f.left + f.right);
        h.bottom = h.top + h.outerHeight;
        h.right = h.left + h.outerWidth;
        a.inInlineMode && (h.scroll = {
          top: b.$.scrollTop,
          left: b.$.scrollLeft
        });
        return C({
            border: f,
            padding: k,
            margin: g,
            ignoreScroll: c
          },
          h, !0)
      }

      function q(a, b, c) {
        if(!n(b)) return b.size = null;
        if(!b.size) b.size = {};
        else if(b.size.ignoreScroll == c && b.size.date > new Date - L) return null;
        return C(b.size, B(a, b, c), {
          date: +new Date
        }, !0)
      }

      function z(a, b) {
        a.view.editable = B(a, a.editable, b, !0)
      }

      function y(a, b) {
        a.view || (a.view = {});
        var c = a.view;
        if(!(!b && c && c.date > new Date - L)) {
          var d = a.win,
            c = d.getScrollPosition(),
            d = d.getViewPaneSize();
          C(a.view, {
            scroll: {
              x: c.x,
              y: c.y,
              width: a.doc.$.documentElement.scrollWidth - d.width,
              height: a.doc.$.documentElement.scrollHeight -
                d.height
            },
            pane: {
              width: d.width,
              height: d.height,
              bottom: d.height + c.y
            },
            date: +new Date
          }, !0)
        }
      }

      function x(a, b, c, d) {
        for(var f = d, g = d, k = 0, h = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + k < m && 0 < n.y - k;) {
          h || (h = b(f, d));
          l || (l = b(g, d));
          !h && 0 < n.y - k && (f = c(a, {
            x: n.x,
            y: n.y - k
          }));
          !l && n.y + k < m && (g = c(a, {
            x: n.x,
            y: n.y + k
          }));
          if(h && l) break;
          k += 2
        }
        return new e([f, g, null, null])
      }
      CKEDITOR.plugins.add("magicline", {
        init: function(a) {
          var c = a.config,
            h = c.magicline_triggerOffset || 30,
            l = {
              editor: a,
              enterMode: c.enterMode,
              triggerOffset: h,
              holdDistance: 0 |
                h * (c.magicline_holdDistance || .5),
              boxColor: c.magicline_color || "#ff0000",
              rtl: "rtl" == c.contentsLangDirection,
              tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
              triggers: c.magicline_everywhere ? P : {
                table: 1,
                hr: 1,
                div: 1,
                ul: 1,
                ol: 1,
                dl: 1,
                form: 1,
                blockquote: 1
              }
            },
            r, x, q;
          l.isRelevant = function(a) {
            return n(a) && !g(l, a) && !p(a)
          };
          a.on("contentDom", function() {
            var h = a.editable(),
              n = a.document,
              p = a.window;
            C(l, {
              editable: h,
              inInlineMode: h.isInline(),
              doc: n,
              win: p,
              hotNode: null
            }, !0);
            l.boundary = l.inInlineMode ? l.editable :
              l.doc.getDocumentElement();
            h.is(G.$inline) || (l.inInlineMode && !t(h) && h.setStyles({
              position: "relative",
              top: null,
              left: null
            }), d.call(this, l), y(l), h.attachListener(a, "beforeUndoImage", function() {
              l.line.detach()
            }), h.attachListener(a, "beforeGetData", function() {
              l.line.wrap.getParent() && (l.line.detach(), a.once("getData", function() {
                l.line.attach()
              }, null, null, 1E3))
            }, null, null, 0), h.attachListener(l.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function(b) {
              if("wysiwyg" == a.mode)
                if(l.inInlineMode) {
                  var c = b.data.$.clientX;
                  b = b.data.$.clientY;
                  y(l);
                  z(l, !0);
                  var d = l.view.editable,
                    e = l.view.scroll;
                  c > d.left - e.x && c < d.right - e.x && b > d.top - e.y && b < d.bottom - e.y || (clearTimeout(q), q = null, l.line.detach())
                } else clearTimeout(q), q = null, l.line.detach()
            }), h.attachListener(h, "keyup", function() {
              l.hiddenMode = 0
            }), h.attachListener(h, "keydown", function(b) {
              if("wysiwyg" == a.mode) switch(b.data.getKeystroke()) {
                case 2228240:
                case 16:
                  l.hiddenMode = 1, l.line.detach()
              }
            }), h.attachListener(l.inInlineMode ? h : n, "mousemove", function(b) {
              x = !0;
              if("wysiwyg" == a.mode &&
                !a.readOnly && !q) {
                var c = {
                  x: b.data.$.clientX,
                  y: b.data.$.clientY
                };
                q = setTimeout(function() {
                  l.mouse = c;
                  q = l.trigger = null;
                  y(l);
                  x && !l.hiddenMode && a.focusManager.hasFocus && !l.line.mouseNear() && (l.element = V(l, !0)) && ((l.trigger = v(l) || w(l) || W(l)) && !u(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null, l.line.detach()), x = !1)
                }, 30)
              }
            }), h.attachListener(p, "scroll", function() {
              "wysiwyg" == a.mode && (l.line.detach(), E.webkit && (l.hiddenMode = 1, clearTimeout(r), r = setTimeout(function() {
                l.mouseDown || (l.hiddenMode =
                  0)
              }, 50)))
            }), h.attachListener(I ? n : p, "mousedown", function() {
              "wysiwyg" == a.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1)
            }), h.attachListener(I ? n : p, "mouseup", function() {
              l.hiddenMode = 0;
              l.mouseDown = 0
            }), a.addCommand("accessPreviousSpace", m(l)), a.addCommand("accessNextSpace", m(l, !0)), a.setKeystroke([
              [c.magicline_keystrokePrevious, "accessPreviousSpace"],
              [c.magicline_keystrokeNext, "accessNextSpace"]
            ]), a.on("loadSnapshot", function() {
              var b, c, d, e;
              for(e in {
                  p: 1,
                  br: 1,
                  div: 1
                })
                for(b = a.document.getElementsByTag(e),
                  d = b.count(); d--;)
                  if((c = b.getItem(d)).data("cke-magicline-hot")) {
                    l.hotNode = c;
                    l.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1;
                    return
                  }
            }), this.backdoor = {
              accessFocusSpace: k,
              boxTrigger: e,
              isLine: g,
              getAscendantTrigger: b,
              getNonEmptyNeighbour: f,
              getSize: B,
              that: l,
              triggerEdge: w,
              triggerEditable: v,
              triggerExpand: W
            })
          }, this)
        }
      });
      var C = CKEDITOR.tools.extend,
        D = CKEDITOR.dom.element,
        H = D.createFromHtml,
        E = CKEDITOR.env,
        I = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
        G = CKEDITOR.dtd,
        J = {},
        M = 128,
        F = 64,
        Q = 32,
        N = 16,
        R = 4,
        K = 2,
        U = 1,
        ca = " ",
        ba = G.$listItem,
        fa = G.$tableContent,
        O = C({}, G.$nonEditable, G.$empty),
        P = G.$block,
        L = 100,
        T = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
        S = T + "border-color:transparent;display:block;border-style:solid;",
        X = "\x3cspan\x3e" + ca + "\x3c/span\x3e";
      J[CKEDITOR.ENTER_BR] = "br";
      J[CKEDITOR.ENTER_P] = "p";
      J[CKEDITOR.ENTER_DIV] = "div";
      e.prototype = {
        set: function(a, b, c) {
          this.properties = a + b + (c || U);
          return this
        },
        is: function(a) {
          return(this.properties &
            a) == a
        }
      };
      var V = function() {
          function a(b, c) {
            var d = b.$.elementFromPoint(c.x, c.y);
            return d && d.nodeType ? new CKEDITOR.dom.element(d) : null
          }
          return function(b, c, d) {
            if(!b.mouse) return null;
            var e = b.doc,
              f = b.line.wrap;
            d = d || b.mouse;
            var k = a(e, d);
            c && g(b, k) && (f.hide(), k = a(e, d), f.show());
            return !k || k.type != CKEDITOR.NODE_ELEMENT || !k.$ || E.ie && 9 > E.version && !b.boundary.equals(k) && !b.boundary.contains(k) ? null : k
          }
        }(),
        Y = CKEDITOR.dom.walker.whitespaces(),
        Z = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
        W = function() {
          function b(e) {
            var f =
              e.element,
              g, k, h;
            if(!n(f) || f.contains(e.editable) || f.isReadOnly()) return null;
            h = x(e, function(a, b) {
              return !b.equals(a)
            }, function(a, b) {
              return V(a, !0, b)
            }, f);
            g = h.upper;
            k = h.lower;
            if(a(e, g, k)) return h.set(Q, 8);
            if(g && f.contains(g))
              for(; !g.getParent().equals(f);) g = g.getParent();
            else g = f.getFirst(function(a) {
              return d(e, a)
            });
            if(k && f.contains(k))
              for(; !k.getParent().equals(f);) k = k.getParent();
            else k = f.getLast(function(a) {
              return d(e, a)
            });
            if(!g || !k) return null;
            q(e, g);
            q(e, k);
            if(!l(e.mouse.y, g.size.top, k.size.bottom)) return null;
            for(var f = Number.MAX_VALUE, m, y, r, z; k && !k.equals(g) && (y = g.getNext(e.isRelevant));) m = Math.abs(c(e, g, y) - e.mouse.y), m < f && (f = m, r = g, z = y), g = y, q(e, g);
            if(!r || !z || !l(e.mouse.y, r.size.top, z.size.bottom)) return null;
            h.upper = r;
            h.lower = z;
            return h.set(Q, 8)
          }

          function d(a, b) {
            return !(b && b.type == CKEDITOR.NODE_TEXT || Z(b) || p(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"))
          }
          return function(c) {
            var d = b(c),
              e;
            if(e = d) {
              e = d.upper;
              var f = d.lower;
              e = !e || !f || p(f) || p(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ?
                !1 : A(c, e) && A(c, f) && a(c, e, f) ? !0 : !1
            }
            return e ? d : null
          }
        }(),
        aa = ["top", "left", "right", "bottom"]
    }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52,
    function() {
      function a(a) {
        if(!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
        for(var b = [], c = ["style", "className"], e = 0; e < c.length; e++) {
          var f = a.$.elements.namedItem(c[e]);
          f && (f = new CKEDITOR.dom.element(f), b.push([f, f.nextSibling]), f.remove())
        }
        return b
      }

      function e(a, b) {
        if(a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length)
          for(var c = b.length - 1; 0 <= c; c--) {
            var e = b[c][0],
              f = b[c][1];
            f ? e.insertBefore(f) : e.appendTo(a)
          }
      }

      function b(b, c) {
        var d = a(b),
          f = {},
          m = b.$;
        c || (f["class"] = m.className || "", m.className = "");
        f.inline = m.style.cssText || "";
        c || (m.style.cssText = "position: static; overflow: visible");
        e(d);
        return f
      }

      function c(b, c) {
        var d = a(b),
          f = b.$;
        "class" in c && (f.className = c["class"]);
        "inline" in c && (f.style.cssText = c.inline);
        e(d)
      }

      function f(a) {
        if(!a.editable().isInline()) {
          var b =
            CKEDITOR.instances,
            c;
          for(c in b) {
            var e = b[c];
            "wysiwyg" != e.mode || e.readOnly || (e = e.document.getBody(), e.setAttribute("contentEditable", !1), e.setAttribute("contentEditable", !0))
          }
          a.editable().hasFocus && (a.toolbox.focus(), a.focus())
        }
      }
      CKEDITOR.plugins.add("maximize", {
        init: function(a) {
          function e() {
            var b = m.getViewPaneSize();
            a.resize(b.width, b.height, null, !0)
          }
          if(a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
            var d = a.lang,
              k = CKEDITOR.document,
              m = k.getWindow(),
              g, n, p, t = CKEDITOR.TRISTATE_OFF;
            a.addCommand("maximize", {
              modes: {
                wysiwyg: !CKEDITOR.env.iOS,
                source: !CKEDITOR.env.iOS
              },
              readOnly: 1,
              editorFocus: !1,
              exec: function() {
                var A = a.container.getFirst(function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
                  }),
                  u = a.ui.space("contents");
                if("wysiwyg" == a.mode) {
                  var r = a.getSelection();
                  g = r && r.getRanges();
                  n = m.getScrollPosition()
                } else {
                  var v = a.editable().$;
                  g = !CKEDITOR.env.ie && [v.selectionStart, v.selectionEnd];
                  n = [v.scrollLeft, v.scrollTop]
                }
                if(this.state == CKEDITOR.TRISTATE_OFF) {
                  m.on("resize", e);
                  p = m.getScrollPosition();
                  for(r = a.container; r = r.getParent();) r.setCustomData("maximize_saved_styles", b(r)), r.setStyle("z-index", a.config.baseFloatZIndex - 5);
                  u.setCustomData("maximize_saved_styles", b(u, !0));
                  A.setCustomData("maximize_saved_styles", b(A, !0));
                  u = {
                    overflow: CKEDITOR.env.webkit ? "" : "hidden",
                    width: 0,
                    height: 0
                  };
                  k.getDocumentElement().setStyles(u);
                  !CKEDITOR.env.gecko && k.getDocumentElement().setStyle("position", "fixed");
                  CKEDITOR.env.gecko && CKEDITOR.env.quirks || k.getBody().setStyles(u);
                  CKEDITOR.env.ie ? setTimeout(function() {
                    m.$.scrollTo(0,
                      0)
                  }, 0) : m.$.scrollTo(0, 0);
                  A.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                  A.$.offsetLeft;
                  A.setStyles({
                    "z-index": a.config.baseFloatZIndex - 5,
                    left: "0px",
                    top: "0px"
                  });
                  A.addClass("cke_maximized");
                  e();
                  u = A.getDocumentPosition();
                  A.setStyles({
                    left: -1 * u.x + "px",
                    top: -1 * u.y + "px"
                  });
                  CKEDITOR.env.gecko && f(a)
                } else if(this.state == CKEDITOR.TRISTATE_ON) {
                  m.removeListener("resize", e);
                  for(var r = [u, A], w = 0; w < r.length; w++) c(r[w], r[w].getCustomData("maximize_saved_styles")), r[w].removeCustomData("maximize_saved_styles");
                  for(r = a.container; r = r.getParent();) c(r, r.getCustomData("maximize_saved_styles")), r.removeCustomData("maximize_saved_styles");
                  CKEDITOR.env.ie ? setTimeout(function() {
                    m.$.scrollTo(p.x, p.y)
                  }, 0) : m.$.scrollTo(p.x, p.y);
                  A.removeClass("cke_maximized");
                  CKEDITOR.env.webkit && (A.setStyle("display", "inline"), setTimeout(function() {
                    A.setStyle("display", "block")
                  }, 0));
                  a.fire("resize", {
                    outerHeight: a.container.$.offsetHeight,
                    contentsHeight: u.$.offsetHeight,
                    outerWidth: a.container.$.offsetWidth
                  })
                }
                this.toggleState();
                if(r =
                  this.uiItems[0]) u = this.state == CKEDITOR.TRISTATE_OFF ? d.maximize.maximize : d.maximize.minimize, r = CKEDITOR.document.getById(r._.id), r.getChild(1).setHtml(u), r.setAttribute("title", u), r.setAttribute("href", 'javascript:void("' + u + '");');
                "wysiwyg" == a.mode ? g ? (CKEDITOR.env.gecko && f(a), a.getSelection().selectRanges(g), (v = a.getSelection().getStartElement()) && v.scrollIntoView(!0)) : m.$.scrollTo(n.x, n.y) : (g && (v.selectionStart = g[0], v.selectionEnd = g[1]), v.scrollLeft = n[0], v.scrollTop = n[1]);
                g = n = null;
                t = this.state;
                a.fire("maximize",
                  this.state)
              },
              canUndo: !1
            });
            a.ui.addButton && a.ui.addButton("Maximize", {
              label: d.maximize.maximize,
              command: "maximize",
              toolbar: "tools,10"
            });
            a.on("mode", function() {
              var b = a.getCommand("maximize");
              b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : t)
            }, null, null, 100)
          }
        }
      })
    }(), CKEDITOR.plugins.add("newpage", {
      init: function(a) {
        a.addCommand("newpage", {
          modes: {
            wysiwyg: 1,
            source: 1
          },
          exec: function(a) {
            var b = this;
            a.setData(a.config.newpage_html || "", function() {
              a.focus();
              setTimeout(function() {
                a.fire("afterCommandExec", {
                  name: "newpage",
                  command: b
                });
                a.selectionChange()
              }, 200)
            })
          },
          async: !0
        });
        a.ui.addButton && a.ui.addButton("NewPage", {
          label: a.lang.newpage.toolbar,
          command: "newpage",
          toolbar: "document,20"
        })
      }
    }), "use strict",
    function() {
      function a(a) {
        return {
          "aria-label": a,
          "class": "cke_pagebreak",
          contenteditable: "false",
          "data-cke-display-name": "pagebreak",
          "data-cke-pagebreak": 1,
          style: "page-break-after: always",
          title: a
        }
      }
      CKEDITOR.plugins.add("pagebreak", {
        requires: "fakeobjects",
        onLoad: function() {
          var a = ("background:url(" + CKEDITOR.getUrl(this.path +
            "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;");
          CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
        },
        init: function(a) {
          a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", {
            label: a.lang.pagebreak.toolbar,
            command: "pagebreak",
            toolbar: "insert,70"
          }), CKEDITOR.env.webkit && a.on("contentDom", function() {
            a.document.on("click",
              function(b) {
                b = b.data.getTarget();
                b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b)
              })
          }))
        },
        afterInit: function(e) {
          function b(b) {
            CKEDITOR.tools.extend(b.attributes, a(e.lang.pagebreak.alt), !0);
            b.children.length = 0
          }
          var c = e.dataProcessor,
            f = c && c.dataFilter,
            c = c && c.htmlFilter,
            l = /page-break-after\s*:\s*always/i,
            h = /display\s*:\s*none/i;
          c && c.addRules({
            attributes: {
              "class": function(a, b) {
                var c = a.replace("cke_pagebreak", "");
                if(c != a) {
                  var e = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
                  b.children.length = 0;
                  b.add(e);
                  e = b.attributes;
                  delete e["aria-label"];
                  delete e.contenteditable;
                  delete e.title
                }
                return c
              }
            }
          }, {
            applyToAll: !0,
            priority: 5
          });
          f && f.addRules({
            elements: {
              div: function(a) {
                if(a.attributes["data-cke-pagebreak"]) b(a);
                else if(l.test(a.attributes.style)) {
                  var c = a.children[0];
                  c && "span" == c.name && h.test(c.attributes.style) && b(a)
                }
              }
            }
          })
        }
      });
      CKEDITOR.plugins.pagebreakCmd = {
        exec: function(e) {
          var b = e.document.createElement("div", {
            attributes: a(e.lang.pagebreak.alt)
          });
          e.insertElement(b)
        },
        context: "div",
        allowedContent: {
          div: {
            styles: "!page-break-after"
          },
          span: {
            match: function(a) {
              return(a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"]
            },
            styles: "display"
          }
        },
        requiredContent: "div{page-break-after}"
      }
    }(),
    function() {
      function a(a, b, c) {
        var f = CKEDITOR.cleanWord;
        f ? c() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js"), CKEDITOR.scriptLoader.load(a, c, null, !0));
        return !f
      }
      CKEDITOR.plugins.add("pastefromword", {
        requires: "clipboard",
        init: function(e) {
          var b = 0,
            c = this.path;
          e.addCommand("pastefromword", {
            canUndo: !1,
            async: !0,
            exec: function(a, c) {
              b = 1;
              a.execCommand("paste", {
                type: "html",
                notification: c && "undefined" !== typeof c.notification ? c.notification : !0
              })
            }
          });
          e.ui.addButton && e.ui.addButton("PasteFromWord", {
            label: e.lang.pastefromword.toolbar,
            command: "pastefromword",
            toolbar: "clipboard,50"
          });
          e.on("paste", function(f) {
            var l = f.data,
              h = (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? l.dataTransfer.getData("text/html", !0) : null) || l.dataValue,
              d = {
                dataValue: h
              },
              k = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,
              k = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(h) || k.test(h);
            if(h && (b || k) && (!1 !== e.fire("pasteFromWord", d) || b)) {
              l.dontFilter = !0;
              var m = a(e, c, function() {
                if(m) e.fire("paste", l);
                else if(!e.config.pasteFromWordPromptCleanup || b || confirm(e.lang.pastefromword.confirmCleanup)) d.dataValue = CKEDITOR.cleanWord(d.dataValue, e), e.fire("afterPasteFromWord", d), l.dataValue = d.dataValue;
                b = 0
              });
              m && f.cancel()
            }
          }, null, null, 3)
        }
      })
    }(),
    function() {
      var a = {
        canUndo: !1,
        async: !0,
        exec: function(a,
          b) {
          var c = a.lang,
            f = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)),
            l = b && "undefined" !== typeof b.notification ? b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie,
            c = l && "string" === typeof l ? l : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + f.aria + '"\x3e' + f.display + "\x3c/kbd\x3e");
          a.execCommand("paste", {
            type: "text",
            notification: l ? c : !1
          })
        }
      };
      CKEDITOR.plugins.add("pastetext", {
        requires: "clipboard",
        init: function(e) {
          var b =
            CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86;
          e.addCommand("pastetext", a);
          e.setKeystroke(b, "pastetext");
          e.ui.addButton && e.ui.addButton("PasteText", {
            label: e.lang.pastetext.button,
            command: "pastetext",
            toolbar: "clipboard,40"
          });
          if(e.config.forcePasteAsPlainText) e.on("beforePaste", function(a) {
            "html" != a.data.type && (a.data.type = "text")
          });
          e.on("pasteState", function(a) {
            e.getCommand("pastetext").setState(a.data)
          })
        }
      })
    }(),
    function() {
      var a, e = {
        modes: {
          wysiwyg: 1,
          source: 1
        },
        canUndo: !1,
        readOnly: 1,
        exec: function(b) {
          var c, e = b.config,
            l = e.baseHref ? '\x3cbase href\x3d"' + e.baseHref + '"/\x3e' : "";
          if(e.fullPage) c = b.getData().replace(/<head>/, "$\x26" + l).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + b.lang.preview.preview);
          else {
            var e = "\x3cbody ",
              h = b.document && b.document.getBody();
            h && (h.getAttribute("id") && (e += 'id\x3d"' + h.getAttribute("id") + '" '), h.getAttribute("class") && (e += 'class\x3d"' + h.getAttribute("class") + '" '));
            e += "\x3e";
            c = b.config.docType + '\x3chtml dir\x3d"' + b.config.contentsLangDirection +
              '"\x3e\x3chead\x3e' + l + "\x3ctitle\x3e" + b.lang.preview.preview + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) + "\x3c/head\x3e" + e + b.getData() + "\x3c/body\x3e\x3c/html\x3e"
          }
          l = 640;
          e = 420;
          h = 80;
          try {
            var d = window.screen,
              l = Math.round(.8 * d.width),
              e = Math.round(.7 * d.height),
              h = Math.round(.1 * d.width)
          } catch(k) {}
          if(!1 === b.fire("contentPreview", b = {
              dataValue: c
            })) return !1;
          var d = "",
            m;
          CKEDITOR.env.ie && (window._cke_htmlToLoad = b.dataValue, m = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain +
            ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )", d = "");
          CKEDITOR.env.gecko && (window._cke_htmlToLoad = b.dataValue, d = CKEDITOR.getUrl(a + "preview.html"));
          d = window.open(d, null, "toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d" + l + ",height\x3d" + e + ",left\x3d" + h);
          CKEDITOR.env.ie && d && (d.location = m);
          CKEDITOR.env.ie || CKEDITOR.env.gecko ||
            (m = d.document, m.open(), m.write(b.dataValue), m.close());
          return !0
        }
      };
      CKEDITOR.plugins.add("preview", {
        init: function(b) {
          b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a = this.path, b.addCommand("preview", e), b.ui.addButton && b.ui.addButton("Preview", {
            label: b.lang.preview.preview,
            command: "preview",
            toolbar: "document,40"
          }))
        }
      })
    }(), CKEDITOR.plugins.add("print", {
      init: function(a) {
        a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", {
          label: a.lang.print.toolbar,
          command: "print",
          toolbar: "document,50"
        }))
      }
    }), CKEDITOR.plugins.print = {
      exec: function(a) {
        CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print")
      },
      canUndo: !1,
      readOnly: 1,
      modes: {
        wysiwyg: 1
      }
    }, CKEDITOR.plugins.add("removeformat", {
      init: function(a) {
        a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
        a.ui.addButton && a.ui.addButton("RemoveFormat", {
          label: a.lang.removeformat.toolbar,
          command: "removeFormat",
          toolbar: "cleanup,10"
        })
      }
    }), CKEDITOR.plugins.removeformat = {
      commands: {
        removeformat: {
          exec: function(a) {
            for(var e =
                a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), b = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, f = a.getSelection().getRanges(), l = f.createIterator(), h = function(a) {
                  return a.type == CKEDITOR.NODE_ELEMENT
                }, d; d = l.getNextRange();) {
              d.collapsed || d.enlarge(CKEDITOR.ENLARGE_ELEMENT);
              var k = d.createBookmark(),
                m = k.startNode,
                g = k.endNode,
                n = function(b) {
                  for(var d = a.elementPath(b),
                      f = d.elements, g = 1, k;
                    (k = f[g]) && !k.equals(d.block) && !k.equals(d.blockLimit); g++) e.test(k.getName()) && c(a, k) && b.breakParent(k)
                };
              n(m);
              if(g)
                for(n(g), m = m.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); m && !m.equals(g);)
                  if(m.isReadOnly()) {
                    if(m.getPosition(g) & CKEDITOR.POSITION_CONTAINS) break;
                    m = m.getNext(h)
                  } else n = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == m.getName() && m.data("cke-realelement") || !c(a, m) || (e.test(m.getName()) ? m.remove(1) : (m.removeAttributes(b), a.fire("removeFormatCleanup", m))), m = n;
              d.moveToBookmark(k)
            }
            a.forceNextSelectionCheck();
            a.getSelection().selectRanges(f)
          }
        }
      },
      filter: function(a, e) {
        for(var b = a._.removeFormatFilters || [], c = 0; c < b.length; c++)
          if(!1 === b[c](e)) return !1;
        return !0
      }
    }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(a) {
      this._.removeFormatFilters || (this._.removeFormatFilters = []);
      this._.removeFormatFilters.push(a)
    }, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",
    CKEDITOR.plugins.add("resize", {
      init: function(a) {
        function e(b) {
          var e = k.width,
            f = k.height,
            h = e + (b.data.$.screenX - d.x) * ("rtl" == l ? -1 : 1);
          b = f + (b.data.$.screenY - d.y);
          m && (e = Math.max(c.resize_minWidth, Math.min(h, c.resize_maxWidth)));
          g && (f = Math.max(c.resize_minHeight, Math.min(b, c.resize_maxHeight)));
          a.resize(m ? e : null, f)
        }

        function b() {
          CKEDITOR.document.removeListener("mousemove", e);
          CKEDITOR.document.removeListener("mouseup", b);
          a.document && (a.document.removeListener("mousemove", e), a.document.removeListener("mouseup",
            b))
        }
        var c = a.config,
          f = a.ui.spaceId("resizer"),
          l = a.element ? a.element.getDirection(1) : "ltr";
        !c.resize_dir && (c.resize_dir = "vertical");
        void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3E3);
        void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3E3);
        void 0 === c.resize_minWidth && (c.resize_minWidth = 750);
        void 0 === c.resize_minHeight && (c.resize_minHeight = 250);
        if(!1 !== c.resize_enabled) {
          var h = null,
            d, k, m = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth,
            g = ("both" == c.resize_dir || "vertical" ==
              c.resize_dir) && c.resize_minHeight != c.resize_maxHeight,
            n = CKEDITOR.tools.addFunction(function(f) {
              h || (h = a.getResizable());
              k = {
                width: h.$.offsetWidth || 0,
                height: h.$.offsetHeight || 0
              };
              d = {
                x: f.screenX,
                y: f.screenY
              };
              c.resize_minWidth > k.width && (c.resize_minWidth = k.width);
              c.resize_minHeight > k.height && (c.resize_minHeight = k.height);
              CKEDITOR.document.on("mousemove", e);
              CKEDITOR.document.on("mouseup", b);
              a.document && (a.document.on("mousemove", e), a.document.on("mouseup", b));
              f.preventDefault && f.preventDefault()
            });
          a.on("destroy",
            function() {
              CKEDITOR.tools.removeFunction(n)
            });
          a.on("uiSpace", function(b) {
            if("bottom" == b.data.space) {
              var c = "";
              m && !g && (c = " cke_resizer_horizontal");
              !m && g && (c = " cke_resizer_vertical");
              var d = '\x3cspan id\x3d"' + f + '" class\x3d"cke_resizer' + c + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == l ? "◢" : "◣") + "\x3c/span\x3e";
              "ltr" == l && "ltr" == c ? b.data.html += d : b.data.html = d + b.data.html
            }
          }, a, null, 100);
          a.on("maximize",
            function(b) {
              a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
            })
        }
      }
    }),
    function() {
      var a = {
        readOnly: 1,
        modes: {
          wysiwyg: 1,
          source: 1
        },
        exec: function(a) {
          if(a.fire("save") && (a = a.element.$.form)) try {
            a.submit()
          } catch(b) {
            a.submit.click && a.submit.click()
          }
        }
      };
      CKEDITOR.plugins.add("save", {
        init: function(e) {
          e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.addCommand("save", a).startDisabled = !e.element.$.form, e.ui.addButton && e.ui.addButton("Save", {
            label: e.lang.save.toolbar,
            command: "save",
            toolbar: "document,10"
          }))
        }
      })
    }(),
    "use strict", CKEDITOR.plugins.add("scayt", {
      requires: "menubutton,dialog",
      tabToOpen: null,
      dialogName: "scaytDialog",
      onLoad: function(a) {
        CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime();
        "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css");
        CKEDITOR.document.appendStyleSheet(this.path + "dialogs/dialog.css")
      },
      init: function(a) {
        var e = this,
          b = CKEDITOR.plugins.scayt;
        this.bindEvents(a);
        this.parseConfig(a);
        this.addRule(a);
        CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
        this.addMenuItems(a);
        var c = a.lang.scayt,
          f = CKEDITOR.env;
        a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
          label: c.text_title,
          title: a.plugins.wsc ? a.lang.wsc.title : c.text_title,
          modes: {
            wysiwyg: !(f.ie && (8 > f.version || f.quirks))
          },
          toolbar: "spellchecker,20",
          refresh: function() {
            var c = a.ui.instances.Scayt.getState();
            a.scayt && (c = b.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            a.fire("scaytButtonState", c)
          },
          onRender: function() {
            var b =
              this;
            a.on("scaytButtonState", function(a) {
              void 0 !== typeof a.data && b.setState(a.data)
            })
          },
          onMenu: function() {
            var c = a.scayt;
            a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state.scayt[a.name] ? "btn_disable" : "btn_enable"];
            var e = {
              scaytToggle: CKEDITOR.TRISTATE_OFF,
              scaytOptions: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
              scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
              scaytDict: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
              scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
              WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
            };
            a.config.scayt_uiTabs[0] || delete e.scaytOptions;
            a.config.scayt_uiTabs[1] || delete e.scaytLangs;
            a.config.scayt_uiTabs[2] || delete e.scaytDict;
            c && !CKEDITOR.plugins.scayt.isNewUdSupported(c) && (delete e.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage());
            return e
          }
        });
        a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function(b, c) {
          var d = a.scayt,
            f, m;
          d && (m = d.getSelectionNode()) && (f = e.menuGenerator(a,
            m), d.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
          return f
        }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function(b) {
          return function() {
            var c = a.scayt;
            c && c.hideBanner();
            return b.apply(this)
          }
        }))
      },
      addMenuItems: function(a) {
        var e = this,
          b = CKEDITOR.plugins.scayt;
        a.addMenuGroup("scaytButton");
        for(var c = a.config.scayt_contextMenuItemsOrder.split("|"), f = 0; f < c.length; f++) c[f] = "scayt_" + c[f];
        if((c = ["grayt_description", "grayt_suggest", "grayt_control"].concat(c)) &&
          c.length)
          for(f = 0; f < c.length; f++) a.addMenuGroup(c[f], f - 10);
        a.addCommand("scaytToggle", {
          exec: function(a) {
            var c = a.scayt;
            b.state.scayt[a.name] = !b.state.scayt[a.name];
            !0 === b.state.scayt[a.name] ? c || b.createScayt(a) : c && b.destroy(a)
          }
        });
        a.addCommand("scaytAbout", {
          exec: function(a) {
            a.scayt.tabToOpen = "about";
            a.lockSelection();
            a.openDialog(e.dialogName)
          }
        });
        a.addCommand("scaytOptions", {
          exec: function(a) {
            a.scayt.tabToOpen = "options";
            a.lockSelection();
            a.openDialog(e.dialogName)
          }
        });
        a.addCommand("scaytLangs", {
          exec: function(a) {
            a.scayt.tabToOpen =
              "langs";
            a.lockSelection();
            a.openDialog(e.dialogName)
          }
        });
        a.addCommand("scaytDict", {
          exec: function(a) {
            a.scayt.tabToOpen = "dictionaries";
            a.lockSelection();
            a.openDialog(e.dialogName)
          }
        });
        c = {
          scaytToggle: {
            label: a.lang.scayt.btn_enable,
            group: "scaytButton",
            command: "scaytToggle"
          },
          scaytAbout: {
            label: a.lang.scayt.btn_about,
            group: "scaytButton",
            command: "scaytAbout"
          },
          scaytOptions: {
            label: a.lang.scayt.btn_options,
            group: "scaytButton",
            command: "scaytOptions"
          },
          scaytLangs: {
            label: a.lang.scayt.btn_langs,
            group: "scaytButton",
            command: "scaytLangs"
          },
          scaytDict: {
            label: a.lang.scayt.btn_dictionaries,
            group: "scaytButton",
            command: "scaytDict"
          }
        };
        a.plugins.wsc && (c.WSC = {
          label: a.lang.wsc.toolbar,
          group: "scaytButton",
          onClick: function() {
            var b = CKEDITOR.plugins.scayt,
              c = a.scayt,
              d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
            (d = d.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
          }
        });
        a.addMenuItems(c)
      },
      bindEvents: function(a) {
        var e = CKEDITOR.plugins.scayt,
          b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE,
          c = function() {
            e.destroy(a)
          },
          f = function() {
            !e.state.scayt[a.name] || a.readOnly || a.scayt || e.createScayt(a)
          },
          l = function() {
            var c = a.editable();
            c.attachListener(c, "focus", function(c) {
              CKEDITOR.plugins.scayt && !a.scayt && setTimeout(f, 0);
              c = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt;
              var d, e;
              if((b || c) && a._.savedSelection) {
                c = a._.savedSelection.getSelectedElement();
                c = !c && a._.savedSelection.getRanges();
                for(var h = 0; h < c.length; h++) e = c[h], "string" === typeof e.startContainer.$.nodeValue && (d = e.startContainer.getText().length, (d < e.startOffset || d < e.endOffset) && a.unlockSelection(!1))
              }
            }, this, null, -10)
          },
          h = function() {
            b ? a.config.scayt_inlineModeImmediateMarkup ? f() : (a.on("blur", function() {
              setTimeout(c, 0)
            }), a.on("focus", f), a.focusManager.hasFocus && f()) : f();
            l();
            var d = a.editable();
            d.attachListener(d, "mousedown", function(b) {
              b = b.data.getTarget();
              var c = a.widgets && a.widgets.getByElement(b);
              c && (c.wrapper = b.getAscendant(function(a) {
                return a.hasAttribute("data-cke-widget-wrapper")
              }, !0))
            }, this, null, -10)
          };
        a.on("contentDom", h);
        a.on("beforeCommandExec", function(b) {
          var c = a.scayt,
            f = !1,
            g = !1,
            h = !0;
          b.data.name in e.options.disablingCommandExec && "wysiwyg" == a.mode ? c && (e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name &&
            "cut" !== b.data.name && "language" !== b.data.name || !c || ("cut" === b.data.name && (h = !1, g = !0), "language" === b.data.name && (g = f = !0), a.fire("reloadMarkupScayt", {
              removeOptions: {
                removeInside: h,
                forceBookmark: g,
                language: f
              },
              timeout: 0
            }))
        });
        a.on("beforeSetMode", function(b) {
          if("source" == b.data) {
            if(b = a.scayt) e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED);
            a.document && a.document.getBody().removeAttribute("_jquid")
          }
        });
        a.on("afterCommandExec", function(b) {
          "wysiwyg" != a.mode || "undo" != b.data.name && "redo" !=
            b.data.name || setTimeout(function() {
              e.reloadMarkup(a.scayt)
            }, 250)
        });
        a.on("readOnly", function(b) {
          var c;
          b && (c = a.scayt, !0 === b.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? e.reloadMarkup(c) : "wysiwyg" == b.editor.mode && !0 === e.state.scayt[b.editor.name] && (e.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
        });
        a.on("beforeDestroy", c);
        a.on("setData", function() {
          c();
          (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && h()
        }, this, null, 50);
        a.on("reloadMarkupScayt", function(b) {
          var c =
            b.data && b.data.removeOptions,
            f = b.data && b.data.timeout,
            g = b.data && b.data.language,
            h = a.scayt;
          h && setTimeout(function() {
            g && (c.selectionNode = a.plugins.language.getCurrentLangElement(a), c.selectionNode = c.selectionNode && c.selectionNode.$ || null);
            h.removeMarkupInSelectionNode(c);
            e.reloadMarkup(h)
          }, f || 0)
        });
        a.on("insertElement", function() {
          a.fire("reloadMarkupScayt", {
            removeOptions: {
              forceBookmark: !0
            }
          })
        }, this, null, 50);
        a.on("insertHtml", function() {
            a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0);
            a.fire("reloadMarkupScayt")
          },
          this, null, 50);
        a.on("insertText", function() {
          a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0);
          a.fire("reloadMarkupScayt")
        }, this, null, 50);
        a.on("scaytDialogShown", function(b) {
          b.data.selectPage(a.scayt.tabToOpen)
        })
      },
      parseConfig: function(a) {
        var e = CKEDITOR.plugins.scayt;
        e.replaceOldOptionsNames(a.config);
        "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1);
        e.state.scayt[a.name] = a.config.scayt_autoStartup;
        "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1);
        "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1);
        e.state.grayt[a.name] = a.config.grayt_autoStartup;
        a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignore|ignoreall|add");
        a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
        a.config.scayt_sLang || (a.config.scayt_sLang = "en_US");
        if(void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 >
          a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 5;
        if(void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 4;
        if(void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = "";
        if(void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null;
        if("string" ===
          typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
          var b = [],
            c = [];
          a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(",");
          CKEDITOR.tools.search(a.config.scayt_uiTabs, function(a) {
            1 === Number(a) || 0 === Number(a) ? (c.push(!0), b.push(Number(a))) : c.push(!1)
          });
          null === CKEDITOR.tools.search(c, !1) ? a.config.scayt_uiTabs = b : a.config.scayt_uiTabs = [1, 1, 1]
        } else a.config.scayt_uiTabs = [1, 1, 1];
        "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null);
        "string" != typeof a.config.scayt_serviceHost &&
          (a.config.scayt_serviceHost = null);
        "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null);
        "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null);
        a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on");
        "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
        "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-");
        "string" !==
        typeof a.config.scayt_srcUrl && (e = document.location.protocol, e = -1 != e.search(/https?:/) ? e : "http:", a.config.scayt_srcUrl = e + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");
        "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0);
        "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0);
        CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1;
        "boolean" !==
        typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1);
        "object" !== typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {});
        a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1);
        a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1);
        a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases &&
          (a.config.scayt_ignoreWordsWithMixedCases = !1);
        a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1);
        if(a.config.scayt_disableOptionsStorage) {
          var e = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0,
            f = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
            l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"],
            h = CKEDITOR.tools.search,
            d = CKEDITOR.tools.indexOf;
          a.config.scayt_disableOptionsStorage = function(a) {
            for(var b = [], c = 0; c < a.length; c++) {
              var e = a[c],
                p = !!h(a, "options");
              if(!h(f, e) || p && h(l, function(a) {
                  if("lang" === a) return !1
                })) return;
              h(l, e) && l.splice(d(l, e), 1);
              if("all" === e || p && h(a, "lang")) return [];
              "options" === e && (l = ["lang"])
            }
            return b = b.concat(l)
          }(e)
        }
      },
      addRule: function(a) {
        var e = CKEDITOR.plugins.scayt,
          b = a.dataProcessor,
          c = b && b.htmlFilter,
          f = a._.elementsPath && a._.elementsPath.filters,
          b = b && b.dataFilter,
          l = a.addRemoveFormatFilter,
          h = function(b) {
            if(a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute))) return !1
          },
          d = function(b) {
            var c = !0;
            a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute)) && (c = !1);
            return c
          };
        f && f.push(h);
        b && b.addRules({
          elements: {
            span: function(a) {
              var b = a.hasClass(e.options.misspelled_word_class) &&
                a.attributes[e.options.data_attribute_name],
                c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute];
              e && (b || c) && delete a.name;
              return a
            }
          }
        });
        c && c.addRules({
          elements: {
            span: function(a) {
              var b = a.hasClass(e.options.misspelled_word_class) && a.attributes[e.options.data_attribute_name],
                c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute];
              e && (b || c) && delete a.name;
              return a
            }
          }
        });
        l && l.call(a, d)
      },
      scaytMenuDefinition: function(a) {
        var e =
          this;
        a = a.scayt;
        return {
          scayt: {
            scayt_ignore: {
              label: a.getLocal("btn_ignore"),
              group: "scayt_control",
              order: 1,
              exec: function(a) {
                a.scayt.ignoreWord()
              }
            },
            scayt_ignoreall: {
              label: a.getLocal("btn_ignoreAll"),
              group: "scayt_control",
              order: 2,
              exec: function(a) {
                a.scayt.ignoreAllWords()
              }
            },
            scayt_add: {
              label: a.getLocal("btn_addWord"),
              group: "scayt_control",
              order: 3,
              exec: function(a) {
                var c = a.scayt;
                setTimeout(function() {
                  c.addWordToUserDictionary()
                }, 10)
              }
            },
            scayt_option: {
              label: a.getLocal("btn_options"),
              group: "scayt_control",
              order: 4,
              exec: function(a) {
                a.scayt.tabToOpen = "options";
                a.lockSelection();
                a.openDialog(e.dialogName)
              },
              verification: function(a) {
                return 1 == a.config.scayt_uiTabs[0] ? !0 : !1
              }
            },
            scayt_language: {
              label: a.getLocal("btn_langs"),
              group: "scayt_control",
              order: 5,
              exec: function(a) {
                a.scayt.tabToOpen = "langs";
                a.lockSelection();
                a.openDialog(e.dialogName)
              },
              verification: function(a) {
                return 1 == a.config.scayt_uiTabs[1] ? !0 : !1
              }
            },
            scayt_dictionary: {
              label: a.getLocal("btn_dictionaries"),
              group: "scayt_control",
              order: 6,
              exec: function(a) {
                a.scayt.tabToOpen =
                  "dictionaries";
                a.lockSelection();
                a.openDialog(e.dialogName)
              },
              verification: function(a) {
                return 1 == a.config.scayt_uiTabs[2] ? !0 : !1
              }
            },
            scayt_about: {
              label: a.getLocal("btn_about"),
              group: "scayt_control",
              order: 7,
              exec: function(a) {
                a.scayt.tabToOpen = "about";
                a.lockSelection();
                a.openDialog(e.dialogName)
              }
            }
          },
          grayt: {
            grayt_problemdescription: {
              label: "Grammar problem description",
              group: "grayt_description",
              order: 1,
              state: CKEDITOR.TRISTATE_DISABLED,
              exec: function(a) {}
            },
            grayt_ignore: {
              label: a.getLocal("btn_ignore"),
              group: "grayt_control",
              order: 2,
              exec: function(a) {
                a.scayt.ignorePhrase()
              }
            }
          }
        }
      },
      buildSuggestionMenuItems: function(a, e, b) {
        var c = {},
          f = {},
          l = b ? "word" : "phrase",
          h = b ? "startGrammarCheck" : "startSpellCheck",
          d = a.scayt;
        if(0 < e.length && "no_any_suggestions" !== e[0])
          if(b)
            for(b = 0; b < e.length; b++) {
              var k = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_");
              a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, h));
              b < a.config.scayt_maxSuggestions ? (a.addMenuItem(k, {
                label: e[b],
                command: k,
                group: "scayt_suggest",
                order: b + 1
              }), c[k] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(k, {
                label: e[b],
                command: k,
                group: "scayt_moresuggest",
                order: b + 1
              }), f[k] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
                label: d.getLocal("btn_moreSuggestions"),
                group: "scayt_moresuggest",
                order: 10,
                getItems: function() {
                  return f
                }
              }), c.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
            } else
              for(b = 0; b < e.length; b++) k = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"), a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],
                l, h)), a.addMenuItem(k, {
                label: e[b],
                command: k,
                group: "grayt_suggest",
                order: b + 1
              }), c[k] = CKEDITOR.TRISTATE_OFF;
          else c.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", {
            exec: function() {}
          }), a.addMenuItem("no_scayt_suggest", {
            label: d.getLocal("btn_noSuggestions") || "no_scayt_suggest",
            command: "no_scayt_suggest",
            group: "scayt_suggest",
            order: 0
          });
        return c
      },
      menuGenerator: function(a, e) {
        var b = a.scayt,
          c = this.scaytMenuDefinition(a),
          f = {},
          l = a.config.scayt_contextCommands.split("|"),
          h = e.getAttribute(b.getLangAttribute()) ||
          b.getLang(),
          d, k;
        d = b.isScaytNode(e);
        k = b.isGraytNode(e);
        d ? (c = c.scayt, f = e.getAttribute(b.getScaytNodeAttributeName()), b.fire("getSuggestionsList", {
          lang: h,
          word: f
        }), f = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d)) : k && (c = c.grayt, f = e.getAttribute(b.getGraytNodeAttributeName()), k = b.getProblemDescriptionText(f, h), c.grayt_problemdescription && k && (c.grayt_problemdescription.label = k), b.fire("getGrammarSuggestionsList", {
          lang: h,
          phrase: f
        }), f = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions,
          d));
        if(d && "off" == a.config.scayt_contextCommands) return f;
        for(var m in c) d && -1 == CKEDITOR.tools.indexOf(l, m.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || (f[m] = "undefined" != typeof c[m].state ? c[m].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof c[m].verification || c[m].verification(a) || delete f[m], a.addCommand(m, {
          exec: c[m].exec
        }), a.addMenuItem(m, {
          label: a.lang.scayt[c[m].label] || c[m].label,
          command: m,
          group: c[m].group,
          order: c[m].order
        }));
        return f
      },
      createCommand: function(a, e, b) {
        return {
          exec: function(c) {
            c =
              c.scayt;
            var f = {};
            f[e] = a;
            c.replaceSelectionNode(f);
            "startGrammarCheck" === b && c.removeMarkupInSelectionNode({
              grammarOnly: !0
            });
            c.fire(b)
          }
        }
      }
    }), CKEDITOR.plugins.scayt = {
      charsToObserve: [{
        charName: "cke-fillingChar",
        charCode: function() {
          var a = CKEDITOR.version.match(/^\d(\.\d*)*/),
            a = a && a[0],
            e;
          if(a) {
            e = "4.5.7";
            var b, a = a.replace(/\./g, "");
            e = e.replace(/\./g, "");
            b = a.length - e.length;
            b = 0 <= b ? b : 0;
            e = parseInt(a) >= parseInt(e) * Math.pow(10, b)
          }
          return e ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
        }()
      }],
      onLoadTimestamp: "",
      state: {
        scayt: {},
        grayt: {}
      },
      warningCounter: 0,
      suggestions: [],
      options: {
        disablingCommandExec: {
          source: !0,
          newpage: !0,
          templates: !0
        },
        data_attribute_name: "data-scayt-word",
        misspelled_word_class: "scayt-misspell-word",
        problem_grammar_data_attribute: "data-grayt-phrase",
        problem_grammar_class: "gramm-problem"
      },
      backCompatibilityMap: {
        scayt_service_protocol: "scayt_serviceProtocol",
        scayt_service_host: "scayt_serviceHost",
        scayt_service_port: "scayt_servicePort",
        scayt_service_path: "scayt_servicePath",
        scayt_customerid: "scayt_customerId"
      },
      alarmCompatibilityMessage: function() {
        5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."), this.warningCounter += 1)
      },
      isNewUdSupported: function(a) {
        return a.getUserDictionary ? !0 : !1
      },
      reloadMarkup: function(a) {
        var e;
        a && (e = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), e && e.ltr && e.rtl && a.fire("startSpellCheck, startGrammarCheck")))
      },
      replaceOldOptionsNames: function(a) {
        for(var e in a) e in this.backCompatibilityMap && (a[this.backCompatibilityMap[e]] = a[e], delete a[e])
      },
      createScayt: function(a) {
        var e = this,
          b = CKEDITOR.plugins.scayt;
        this.loadScaytLibrary(a, function(a) {
          function f(a) {
            return new SCAYT.CKSCAYT(a, function() {}, function() {})
          }
          var l = a.window && a.window.getFrame() || a.editable();
          if(l) {
            l = {
              lang: a.config.scayt_sLang,
              container: l.$,
              customDictionary: a.config.scayt_customDictionaryIds,
              userDictionaryName: a.config.scayt_userDictionaryName,
              localization: a.langCode,
              customer_id: a.config.scayt_customerId,
              customPunctuation: a.config.scayt_customPunctuation,
              debug: a.config.scayt_debug,
              data_attribute_name: e.options.data_attribute_name,
              misspelled_word_class: e.options.misspelled_word_class,
              problem_grammar_data_attribute: e.options.problem_grammar_data_attribute,
              problem_grammar_class: e.options.problem_grammar_class,
              "options-to-restore": a.config.scayt_disableOptionsStorage,
              focused: a.editable().hasFocus,
              ignoreElementsRegex: a.config.scayt_elementsToIgnore,
              ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore,
              minWordLength: a.config.scayt_minWordLength,
              multiLanguageMode: a.config.scayt_multiLanguageMode,
              multiLanguageStyles: a.config.scayt_multiLanguageStyles,
              graytAutoStartup: b.state.grayt[a.name],
              charsToObserve: b.charsToObserve
            };
            a.config.scayt_serviceProtocol && (l.service_protocol = a.config.scayt_serviceProtocol);
            a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost);
            a.config.scayt_servicePort && (l.service_port = a.config.scayt_servicePort);
            a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath);
            "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
            "boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames);
            "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases &&
              (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases);
            "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers);
            var h;
            try {
              h = f(l)
            } catch(d) {
              e.alarmCompatibilityMessage(), delete l.charsToObserve, h = f(l)
            }
            h.subscribe("suggestionListSend", function(a) {
              for(var b = {}, c = [], d = 0; d < a.suggestionList.length; d++) b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
              CKEDITOR.plugins.scayt.suggestions = c
            });
            h.subscribe("selectionIsChanged", function(b) {
              a.getSelection().isLocked && a.lockSelection()
            });
            h.subscribe("graytStateChanged", function(d) {
              b.state.grayt[a.name] = d.state
            });
            h.addMarkupHandler && h.addMarkupHandler(function(b) {
              var d = a.editable(),
                e = d.getCustomData(b.charName);
              e && (e.$ = b.node, d.setCustomData(b.charName, e))
            });
            a.scayt = h;
            a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
          } else b.state.scayt[a.name] = !1
        })
      },
      destroy: function(a) {
        a.scayt &&
          a.scayt.destroy();
        delete a.scayt;
        a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF)
      },
      loadScaytLibrary: function(a, e) {
        var b, c = function() {
          CKEDITOR.fireOnce("scaytReady");
          a.scayt || "function" === typeof e && e(a)
        };
        "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (b = a.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(b, function(a) {
          a && c()
        })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && c()
      }
    }, CKEDITOR.on("dialogDefinition", function(a) {
      var e = a.data.name;
      a = a.data.definition.dialog;
      if("scaytDialog" === e) a.on("cancel", function(a) {
        return !1
      }, this, null, -1);
      if("checkspell" === e) a.on("cancel", function(a) {
        a = a.sender && a.sender.getParentEditor();
        var c = CKEDITOR.plugins.scayt,
          e = a.scayt;
        e && c.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1);
        a.unlockSelection()
      }, this, null, -2);
      if("link" === e) a.on("ok", function(a) {
        var c = a.sender && a.sender.getParentEditor();
        c && setTimeout(function() {
          c.fire("reloadMarkupScayt", {
            removeOptions: {
              removeInside: !0,
              forceBookmark: !0
            },
            timeout: 0
          })
        }, 0)
      })
    }), CKEDITOR.on("scaytReady", function() {
      if(!0 === CKEDITOR.config.scayt_handleCheckDirty) {
        var a = CKEDITOR.editor.prototype;
        a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function(a) {
          return function() {
            var c = null,
              e = this.scayt;
            if(CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
              if(c = "ready" == this.status) var l = e.removeMarkupFromString(this.getSnapshot()),
                e = e.removeMarkupFromString(this._.previousValue),
                c = c && e !== l
            } else c = a.call(this);
            return c
          }
        });
        a.resetDirty =
          CKEDITOR.tools.override(a.resetDirty, function(a) {
            return function() {
              var c = this.scayt;
              CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = c.removeMarkupFromString(this.getSnapshot()) : a.call(this)
            }
          })
      }
      if(!0 === CKEDITOR.config.scayt_handleUndoRedo) {
        var a = CKEDITOR.plugins.undo.Image.prototype,
          e = "function" == typeof a.equalsContent ? "equalsContent" : "equals";
        a[e] = CKEDITOR.tools.override(a[e], function(a) {
          return function(c) {
            var e = c.editor.scayt,
              l = this.contents,
              h = c.contents,
              d = null;
            CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[c.editor.name] && c.editor.scayt && (this.contents = e.removeMarkupFromString(l) || "", c.contents = e.removeMarkupFromString(h) || "");
            d = a.apply(this, arguments);
            this.contents = l;
            c.contents = h;
            return d
          }
        })
      }
    }),
    function() {
      CKEDITOR.plugins.add("selectall", {
        init: function(a) {
          a.addCommand("selectAll", {
            modes: {
              wysiwyg: 1,
              source: 1
            },
            exec: function(a) {
              var b = a.editable();
              if(b.is("textarea")) a = b.$, CKEDITOR.env.ie && a.createTextRange ? a.createTextRange().execCommand("SelectAll") :
                (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus();
              else {
                if(b.is("body")) a.document.$.execCommand("SelectAll", !1, null);
                else {
                  var c = a.createRange();
                  c.selectNodeContents(b);
                  c.select()
                }
                a.forceNextSelectionCheck();
                a.selectionChange()
              }
            },
            canUndo: !1
          });
          a.ui.addButton && a.ui.addButton("SelectAll", {
            label: a.lang.selectall.toolbar,
            command: "selectAll",
            toolbar: "selection,10"
          })
        }
      })
    }(),
    function() {
      var a = {
        readOnly: 1,
        preserveState: !0,
        editorFocus: !1,
        exec: function(a) {
          this.toggleState();
          this.refresh(a)
        },
        refresh: function(a) {
          if(a.document) {
            var b =
              this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass";
            a.editable()[b]("cke_show_blocks")
          }
        }
      };
      CKEDITOR.plugins.add("showblocks", {
        onLoad: function() {
          var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "),
            b, c, f, l, h = CKEDITOR.getUrl(this.path),
            d = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version),
            k = d ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "",
            m, g;
          for(b = c = f = l = ""; m = a.pop();) g = a.length ? "," : "", b += ".cke_show_blocks " +
            m + k + g, f += ".cke_show_blocks.cke_contents_ltr " + m + k + g, l += ".cke_show_blocks.cke_contents_rtl " + m + k + g, c += ".cke_show_blocks " + m + k + "{background-image:url(" + CKEDITOR.getUrl(h + "images/block_" + m + ".png") + ")}";
          CKEDITOR.addCss((b + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(c, f + "{background-position:top left;padding-left:8px}", l + "{background-position:top right;padding-right:8px}"));
          d || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
        },
        init: function(e) {
          function b() {
            c.refresh(e)
          }
          if(!e.blockless) {
            var c = e.addCommand("showblocks", a);
            c.canUndo = !1;
            e.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON);
            e.ui.addButton && e.ui.addButton("ShowBlocks", {
              label: e.lang.showblocks.toolbar,
              command: "showblocks",
              toolbar: "tools,20"
            });
            e.on("mode", function() {
              c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e)
            });
            e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (e.on("focus", b), e.on("blur", b));
            e.on("contentDom", function() {
              c.state != CKEDITOR.TRISTATE_DISABLED &&
                c.refresh(e)
            })
          }
        }
      })
    }(),
    function() {
      var a = {
        preserveState: !0,
        editorFocus: !1,
        readOnly: 1,
        exec: function(a) {
          this.toggleState();
          this.refresh(a)
        },
        refresh: function(a) {
          if(a.document) {
            var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
            a.editable()[b]("cke_show_borders")
          }
        }
      };
      CKEDITOR.plugins.add("showborders", {
        modes: {
          wysiwyg: 1
        },
        onLoad: function() {
          var a;
          a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : none/*#d3d3d3 1px dotted zxt - 20180201*/;}".split(";")).join("").replace(/%2/g,
            "cke_show_border").replace(/%1/g, "cke_show_borders ");
          CKEDITOR.addCss(a)
        },
        init: function(e) {
          var b = e.addCommand("showborders", a);
          b.canUndo = !1;
          !1 !== e.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
          e.on("mode", function() {
            b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
          }, null, null, 100);
          e.on("contentDom", function() {
            b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
          });
          e.on("removeFormatCleanup", function(a) {
            a = a.data;
            e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
              0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
          })
        },
        afterInit: function(a) {
          var b = a.dataProcessor;
          a = b && b.dataFilter;
          b = b && b.htmlFilter;
          a && a.addRules({
            elements: {
              table: function(a) {
                a = a.attributes;
                var b = a["class"],
                  e = parseInt(a.border, 10);
                e && !(0 >= e) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border")
              }
            }
          });
          b && b.addRules({
            elements: {
              table: function(a) {
                a = a.attributes;
                var b = a["class"];
                b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                  ""))
              }
            }
          })
        }
      });
      CKEDITOR.on("dialogDefinition", function(a) {
        var b = a.data.name;
        if("table" == b || "tableProperties" == b)
          if(a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function(a) {
              return function(b, e) {
                a.apply(this, arguments);
                var h = parseInt(this.getValue(), 10);
                e[!h || 0 >= h ? "addClass" : "removeClass"]("cke_show_border")
              }
            }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function(a) {
            return function() {
              a.apply(this,
                arguments);
              this.setValue(this.getValue().replace(/cke_show_border/, ""))
            }
          }), a.commit = CKEDITOR.tools.override(a.commit, function(a) {
            return function(b, e) {
              a.apply(this, arguments);
              parseInt(e.getAttribute("border"), 10) || e.addClass("cke_show_border")
            }
          })
      })
    }(), CKEDITOR.plugins.add("smiley", {
      requires: "dialog",
      init: function(a) {
        a.config.smiley_path = a.config.smiley_path || this.path + "images/";
        a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
          allowedContent: "img[alt,height,!src,title,width]",
          requiredContent: "img"
        }));
        a.ui.addButton && a.ui.addButton("Smiley", {
          label: a.lang.smiley.toolbar,
          command: "smiley",
          toolbar: "insert,50"
        });
        CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
      }
    }), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
    CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"),
    function() {
      CKEDITOR.plugins.add("sourcearea", {
        init: function(e) {
          function b() {
            var a = f && this.equals(CKEDITOR.document.getActive());
            this.hide();
            this.setStyle("height", this.getParent().$.clientHeight + "px");
            this.setStyle("width", this.getParent().$.clientWidth + "px");
            this.show();
            a && this.focus()
          }
          if(e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
            var c =
              CKEDITOR.plugins.sourcearea;
            e.addMode("source", function(c) {
              var f = e.ui.space("contents").getDocument().createElement("textarea");
              f.setStyles(CKEDITOR.tools.extend({
                width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                height: "100%",
                resize: "none",
                outline: "none",
                "text-align": "left"
              }, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4)));
              f.setAttribute("dir", "ltr");
              f.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
              e.ui.space("contents").append(f);
              f = e.editable(new a(e,
                f));
              f.setData(e.getData(1));
              CKEDITOR.env.ie && (f.attachListener(e, "resize", b, f), f.attachListener(CKEDITOR.document.getWindow(), "resize", b, f), CKEDITOR.tools.setTimeout(b, 0, f));
              e.fire("ariaWidget", this);
              c()
            });
            e.addCommand("source", c.commands.source);
            e.ui.addButton && e.ui.addButton("Source", {
              label: e.lang.sourcearea.toolbar,
              command: "source",
              toolbar: "mode,10"
            });
            e.on("mode", function() {
              e.getCommand("source").setState("source" == e.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            });
            var f = CKEDITOR.env.ie && 9 ==
              CKEDITOR.env.version
          }
        }
      });
      var a = CKEDITOR.tools.createClass({
        base: CKEDITOR.editable,
        proto: {
          setData: function(a) {
            this.setValue(a);
            this.status = "ready";
            this.editor.fire("dataReady")
          },
          getData: function() {
            return this.getValue()
          },
          insertHtml: function() {},
          insertElement: function() {},
          insertText: function() {},
          setReadOnly: function(a) {
            this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
          },
          detach: function() {
            a.baseProto.detach.call(this);
            this.clearCustomData();
            this.remove()
          }
        }
      })
    }(), CKEDITOR.plugins.sourcearea = {
      commands: {
        source: {
          modes: {
            wysiwyg: 1,
            source: 1
          },
          editorFocus: !1,
          readOnly: 1,
          exec: function(a) {
            "wysiwyg" == a.mode && a.fire("saveSnapshot");
            a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
            a.setMode("source" == a.mode ? "wysiwyg" : "source")
          },
          canUndo: !1
        }
      }
    }, CKEDITOR.plugins.add("specialchar", {
      availableLangs: {
        af: 1,
        ar: 1,
        az: 1,
        bg: 1,
        ca: 1,
        cs: 1,
        cy: 1,
        da: 1,
        de: 1,
        "de-ch": 1,
        el: 1,
        en: 1,
        "en-au": 1,
        "en-ca": 1,
        "en-gb": 1,
        eo: 1,
        es: 1,
        "es-mx": 1,
        et: 1,
        eu: 1,
        fa: 1,
        fi: 1,
        fr: 1,
        "fr-ca": 1,
        gl: 1,
        he: 1,
        hr: 1,
        hu: 1,
        id: 1,
        it: 1,
        ja: 1,
        km: 1,
        ko: 1,
        ku: 1,
        lt: 1,
        lv: 1,
        nb: 1,
        nl: 1,
        no: 1,
        oc: 1,
        pl: 1,
        pt: 1,
        "pt-br": 1,
        ru: 1,
        si: 1,
        sk: 1,
        sl: 1,
        sq: 1,
        sv: 1,
        th: 1,
        ti: 1,
        tr: 1,
        tt: 1,
        ug: 1,
        uk: 1,
        vi: 1,
        zh: 1,
        "zh-cn": 1,
        "zh-tw": 1
      },
      requires: "dialog",
      init: function(a) {
        var e = this;
        CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
        a.addCommand("specialchar", {
          exec: function() {
            var b = a.langCode,
              b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
            CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function() {
              CKEDITOR.tools.extend(a.lang.specialchar, e.langEntries[b]);
              a.openDialog("specialchar")
            })
          },
          modes: {
            wysiwyg: 1
          },
          canUndo: !1
        });
        a.ui.addButton && a.ui.addButton("SpecialChar", {
          label: a.lang.specialchar.toolbar,
          command: "specialchar",
          toolbar: "insert,50"
        })
      }
    }), CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
    function() {
      CKEDITOR.plugins.add("stylescombo", {
        requires: "richcombo",
        init: function(a) {
          var e = a.config,
            b = a.lang.stylescombo,
            c = {},
            f = [],
            l = [];
          a.on("stylesSet", function(b) {
            if(b = b.data.styles) {
              for(var d, k, m, g = 0, n = b.length; g < n; g++)(d = b[g], a.blockless && d.element in CKEDITOR.dtd.$block || "string" == typeof d.type && !CKEDITOR.style.customHandlers[d.type] || (k = d.name, d = new CKEDITOR.style(d), a.filter.customConfig && !a.filter.check(d))) || (d._name = k, d._.enterMode = e.enterMode, d._.type = m = d.assignedTo || d.type, d._.weight =
                g + 1E3 * (m == CKEDITOR.STYLE_OBJECT ? 1 : m == CKEDITOR.STYLE_BLOCK ? 2 : 3), c[k] = d, f.push(d), l.push(d));
              f.sort(function(a, b) {
                return a._.weight - b._.weight
              })
            }
          });
          a.ui.addRichCombo("Styles", {
            label: b.label,
            title: b.panelTitle,
            toolbar: "styles,10",
            allowedContent: l,
            panel: {
              css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
              multiSelect: !0,
              attributes: {
                "aria-label": b.panelTitle
              }
            },
            init: function() {
              var a, c, e, l, g, n;
              g = 0;
              for(n = f.length; g < n; g++) a = f[g], c = a._name, l = a._.type, l != e && (this.startGroup(b["panelTitle" + String(l)]),
                e = l), this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c);
              this.commit()
            },
            onClick: function(b) {
              a.focus();
              a.fire("saveSnapshot");
              b = c[b];
              var d = a.elementPath();
              if(b.group && b.removeStylesFromSameGroup(a)) a.applyStyle(b);
              else a[b.checkActive(d, a) ? "removeStyle" : "applyStyle"](b);
              a.fire("saveSnapshot")
            },
            onRender: function() {
              a.on("selectionChange", function(b) {
                var d = this.getValue();
                b = b.data.path.elements;
                for(var e = 0, f = b.length, g; e < f; e++) {
                  g = b[e];
                  for(var l in c)
                    if(c[l].checkElementRemovable(g, !0, a)) {
                      l !=
                        d && this.setValue(l);
                      return
                    }
                }
                this.setValue("")
              }, this)
            },
            onOpen: function() {
              var e = a.getSelection(),
                e = e.getSelectedElement() || e.getStartElement() || a.editable(),
                e = a.elementPath(e),
                d = [0, 0, 0, 0];
              this.showAll();
              this.unmarkAll();
              for(var f in c) {
                var l = c[f],
                  g = l._.type;
                l.checkApplicable(e, a, a.activeFilter) ? d[g]++ : this.hideItem(f);
                l.checkActive(e, a) && this.mark(f)
              }
              d[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]);
              d[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
              d[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
            },
            refresh: function() {
              var b = a.elementPath();
              if(b) {
                for(var d in c)
                  if(c[d].checkApplicable(b, a, a.activeFilter)) return;
                this.setState(CKEDITOR.TRISTATE_DISABLED)
              }
            },
            reset: function() {
              c = {};
              f = []
            }
          })
        }
      })
    }(),
    function() {
      function a(a) {
        return {
          editorFocus: !1,
          canUndo: !1,
          modes: {
            wysiwyg: 1
          },
          exec: function(b) {
            if(b.editable().hasFocus) {
              var c = b.getSelection(),
                d;
              if(d = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                  td: 1,
                  th: 1
                }, 1)) {
                var c = b.createRange(),
                  e = CKEDITOR.tools.tryThese(function() {
                    var b = d.getParent().$.cells[d.$.cellIndex + (a ? -1 : 1)];
                    b.parentNode.parentNode;
                    return b
                  }, function() {
                    var b = d.getParent(),
                      b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                    return b.cells[a ? b.cells.length - 1 : 0]
                  });
                if(e || a)
                  if(e) e = new CKEDITOR.dom.element(e), c.moveToElementEditStart(e), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(e);
                  else return !0;
                else {
                  for(var m = d.getAscendant("table").$, e = d.getParent().$.cells, m =
                      new CKEDITOR.dom.element(m.insertRow(-1), b.document), g = 0, n = e.length; g < n; g++) m.append((new CKEDITOR.dom.element(e[g], b.document)).clone(!1, !1)).appendBogus();
                  c.moveToElementEditStart(m)
                }
                c.select(!0);
                return !0
              }
            }
            return !1
          }
        }
      }
      var e = {
          editorFocus: !1,
          modes: {
            wysiwyg: 1,
            source: 1
          }
        },
        b = {
          exec: function(a) {
            a.container.focusNext(!0, a.tabIndex)
          }
        },
        c = {
          exec: function(a) {
            a.container.focusPrevious(!0, a.tabIndex)
          }
        };
      CKEDITOR.plugins.add("tab", {
        init: function(f) {
          for(var l = !1 !== f.config.enableTabKeyTools, h = f.config.tabSpaces || 0,
              d = ""; h--;) d += " ";
          if(d) f.on("key", function(a) {
            9 == a.data.keyCode && (f.insertText(d), a.cancel())
          });
          if(l) f.on("key", function(a) {
            (9 == a.data.keyCode && f.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && f.execCommand("selectPreviousCell")) && a.cancel()
          });
          f.addCommand("blur", CKEDITOR.tools.extend(b, e));
          f.addCommand("blurBack", CKEDITOR.tools.extend(c, e));
          f.addCommand("selectNextCell", a());
          f.addCommand("selectPreviousCell", a(!0))
        }
      })
    }(), CKEDITOR.dom.element.prototype.focusNext = function(a, e) {
      var b =
        void 0 === e ? this.getTabIndex() : e,
        c, f, l, h, d, k;
      if(0 >= b)
        for(d = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); d;) {
          if(d.isVisible() && 0 === d.getTabIndex()) {
            l = d;
            break
          }
          d = d.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
        } else
          for(d = this.getDocument().getBody().getFirst(); d = d.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if(!c)
              if(!f && d.equals(this)) {
                if(f = !0, a) {
                  if(!(d = d.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                  c = 1
                }
              } else f && !this.contains(d) && (c = 1);
            if(d.isVisible() && !(0 > (k = d.getTabIndex()))) {
              if(c && k == b) {
                l =
                  d;
                break
              }
              k > b && (!l || !h || k < h) ? (l = d, h = k) : l || 0 !== k || (l = d, h = k)
            }
          }
      l && l.focus()
    }, CKEDITOR.dom.element.prototype.focusPrevious = function(a, e) {
      for(var b = void 0 === e ? this.getTabIndex() : e, c, f, l, h = 0, d, k = this.getDocument().getBody().getLast(); k = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
        if(!c)
          if(!f && k.equals(this)) {
            if(f = !0, a) {
              if(!(k = k.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
              c = 1
            }
          } else f && !this.contains(k) && (c = 1);
        if(k.isVisible() && !(0 > (d = k.getTabIndex())))
          if(0 >= b) {
            if(c && 0 === d) {
              l = k;
              break
            }
            d > h &&
              (l = k, h = d)
          } else {
            if(c && d == b) {
              l = k;
              break
            }
            d < b && (!l || d > h) && (l = k, h = d)
          }
      }
      l && l.focus()
    }, CKEDITOR.plugins.add("table", {
      requires: "dialog",
      init: function(a) {
        function e(a) {
          return CKEDITOR.tools.extend(a || {}, {
            contextSensitive: 1,
            refresh: function(a, b) {
              this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
            }
          })
        }
        if(!a.blockless) {
          var b = a.lang.table;
          a.addCommand("table", new CKEDITOR.dialogCommand("table", {
            context: "table",
            allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" +
              (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""),
            requiredContent: "table",
            contentTransformations: [
              ["table{width}: sizeToStyle", "table[width]: sizeToAttribute"],
              ["td: splitBorderShorthand"],
              [{
                element: "table",
                right: function(a) {
                  if(a.styles) {
                    var b;
                    if(a.styles.border) b = CKEDITOR.tools.style.parse.border(a.styles.border);
                    else if(CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                      var e = a.styles;
                      e["border-left"] && e["border-left"] === e["border-right"] && e["border-right"] === e["border-top"] &&
                        e["border-top"] === e["border-bottom"] && (b = CKEDITOR.tools.style.parse.border(e["border-top"]))
                    }
                    b && b.style && "solid" === b.style && b.width && 0 !== parseFloat(b.width) && (a.attributes.border = 1);
                    "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                  }
                }
              }]
            ]
          }));
          a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e()));
          a.addCommand("tableDelete", e({
            exec: function(a) {
              var b = a.elementPath().contains("table", 1);
              if(b) {
                var e = b.getParent(),
                  h = a.editable();
                1 != e.getChildCount() || e.is("td",
                  "th") || e.equals(h) || (b = e);
                a = a.createRange();
                a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                b.remove();
                a.select()
              }
            }
          }));
          a.ui.addButton && a.ui.addButton("Table", {
            label: b.toolbar,
            command: "table",
            toolbar: "insert,30"
          });
          CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
          CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
          a.addMenuItems && a.addMenuItems({
            table: {
              label: b.menu,
              command: "tableProperties",
              group: "table",
              order: 5
            },
            tabledelete: {
              label: b.deleteTable,
              command: "tableDelete",
              group: "table",
              order: 1
            }
          });
          a.on("doubleclick", function(a) {
            a.data.element.is("table") && (a.data.dialog = "tableProperties")
          });
          a.contextMenu && a.contextMenu.addListener(function() {
            return {
              tabledelete: CKEDITOR.TRISTATE_OFF,
              table: CKEDITOR.TRISTATE_OFF
            }
          })
        }
      }
    }),
    function() {
      function a(a, b) {
        function c(a) {
          return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0
        }

        function d(a) {
          0 < e.length || a.type != CKEDITOR.NODE_ELEMENT || !A.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(f, a, "selected_cell", !0), e.push(a))
        }
        var e = [],
          f = {};
        if(!a) return e;
        for(var g = a.getRanges(), k = 0; k < g.length; k++) {
          var h = g[k];
          if(h.collapsed)(h = h.getCommonAncestor().getAscendant({
            td: 1,
            th: 1
          }, !0)) && c(h) && e.push(h);
          else {
            var h = new CKEDITOR.dom.walker(h),
              l;
            for(h.guard = d; l = h.next();) l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({
              td: 1,
              th: 1
            }, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(f, l, "selected_cell", !0), e.push(l))
          }
        }
        CKEDITOR.dom.element.clearAllMarkers(f);
        return e
      }

      function e(b, c) {
        for(var d = u(b) ? b : a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), k = g.$.rowIndex, d = d[d.length - 1], h = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[h]), k = c ? k : h, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[k], k = c ? d[k - 1] : d[k + 1], d = d[0].length, e = e.createElement("tr"), h = 0; f[h] && h < d; h++) {
          var l;
          1 < f[h].rowSpan && k && f[h] == k[h] ? (l = f[h], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[h])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), e.append(l),
            l = l.$);
          h += l.colSpan - 1
        }
        c ? e.insertBefore(g) : e.insertAfter(g);
        return e
      }

      function b(c) {
        if(c instanceof CKEDITOR.dom.selection) {
          var d = c.getRanges(),
            e = a(c),
            f = e[0].getAscendant("table"),
            g = CKEDITOR.tools.buildTableMap(f),
            k = e[0].getParent().$.rowIndex,
            e = e[e.length - 1],
            h = e.getParent().$.rowIndex + e.$.rowSpan - 1,
            e = [];
          c.reset();
          for(c = k; c <= h; c++) {
            for(var l = g[c], m = new CKEDITOR.dom.element(f.$.rows[c]), n = 0; n < l.length; n++) {
              var p = new CKEDITOR.dom.element(l[n]),
                t = p.getParent().$.rowIndex;
              1 == p.$.rowSpan ? p.remove() : (--p.$.rowSpan,
                t == c && (t = g[c + 1], t[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(t[n - 1])) : (new CKEDITOR.dom.element(f.$.rows[c + 1])).append(p, 1)));
              n += p.$.colSpan - 1
            }
            e.push(m)
          }
          g = f.$.rows;
          d[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
          k = new CKEDITOR.dom.element(g[h + 1] || (0 < k ? g[k - 1] : null) || f.$.parentNode);
          for(c = e.length; 0 <= c; c--) b(e[c]);
          return f.$.parentNode ? k : (d[0].select(), null)
        }
        c instanceof CKEDITOR.dom.element && (f = c.getAscendant("table"), 1 == f.$.rows.length ? f.remove() : c.remove());
        return null
      }

      function c(a) {
        for(var b =
            a.getParent().$.cells, c = 0, d = 0; d < b.length; d++) {
          var e = b[d],
            c = c + e.colSpan;
          if(e == a.$) break
        }
        return c - 1
      }

      function f(a, b) {
        for(var d = b ? Infinity : 0, e = 0; e < a.length; e++) {
          var f = c(a[e]);
          if(b ? f < d : f > d) d = f
        }
        return d
      }

      function l(b, c) {
        for(var d = u(b) ? b : a(b), e = d[0].getAscendant("table"), g = f(d, 1), d = f(d), k = c ? g : d, h = CKEDITOR.tools.buildTableMap(e), e = [], g = [], d = [], l = h.length, m = 0; m < l; m++) e.push(h[m][k]), g.push(c ? h[m][k - 1] : h[m][k + 1]);
        for(m = 0; m < l; m++) e[m] && (1 < e[m].colSpan && g[m] == e[m] ? (h = e[m], h.colSpan += 1) : (k = new CKEDITOR.dom.element(e[m]),
          h = k.clone(), h.removeAttribute("colSpan"), h.appendBogus(), h[c ? "insertBefore" : "insertAfter"].call(h, k), d.push(h), h = h.$), m += h.rowSpan - 1);
        return d
      }

      function h(b) {
        function c(a) {
          var b, d, e;
          b = a.getRanges();
          if(1 !== b.length) return a;
          b = b[0];
          if(b.collapsed || 0 !== b.endOffset) return a;
          d = b.endContainer;
          e = d.getName().toLowerCase();
          if("td" !== e && "th" !== e) return a;
          for((e = d.getPrevious()) || (e = d.getParent().getPrevious().getLast()); e.type !== CKEDITOR.NODE_TEXT && "br" !== e.getName().toLowerCase();)
            if(e = e.getLast(), !e) return a;
          b.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
          return b.select()
        }
        CKEDITOR.env.webkit && !b.isFake && (b = c(b));
        var d = b.getRanges(),
          e = a(b),
          f = e[0],
          g = e[e.length - 1],
          e = f.getAscendant("table"),
          k = CKEDITOR.tools.buildTableMap(e),
          h, l, m = [];
        b.reset();
        var n = 0;
        for(b = k.length; n < b; n++)
          for(var p = 0, t = k[n].length; p < t; p++) void 0 === h && k[n][p] == f.$ && (h = p), k[n][p] == g.$ && (l = p);
        for(n = h; n <= l; n++)
          for(p = 0; p < k.length; p++) g = k[p], f = new CKEDITOR.dom.element(e.$.rows[p]), g = new CKEDITOR.dom.element(g[n]), g.$ && (1 == g.$.colSpan ? g.remove() : --g.$.colSpan,
            p += g.$.rowSpan - 1, f.$.cells.length || m.push(f));
        h = k[0].length - 1 > l ? new CKEDITOR.dom.element(k[0][l + 1]) : h && -1 !== k[0][h - 1].cellIndex ? new CKEDITOR.dom.element(k[0][h - 1]) : new CKEDITOR.dom.element(e.$.parentNode);
        m.length == b && (d[0].moveToPosition(e, CKEDITOR.POSITION_AFTER_END), d[0].select(), e.remove());
        return h
      }

      function d(a, b) {
        var c = a.getStartElement().getAscendant({
          td: 1,
          th: 1
        }, !0);
        if(c) {
          var d = c.clone();
          d.appendBogus();
          b ? d.insertBefore(c) : d.insertAfter(c)
        }
      }

      function k(b) {
        if(b instanceof CKEDITOR.dom.selection) {
          var c =
            b.getRanges(),
            d = a(b),
            e = d[0] && d[0].getAscendant("table"),
            f;
          a: {
            var g = 0;f = d.length - 1;
            for(var h = {}, l, n; l = d[g++];) CKEDITOR.dom.element.setMarker(h, l, "delete_cell", !0);
            for(g = 0; l = d[g++];)
              if((n = l.getPrevious()) && !n.getCustomData("delete_cell") || (n = l.getNext()) && !n.getCustomData("delete_cell")) {
                CKEDITOR.dom.element.clearAllMarkers(h);
                f = n;
                break a
              }
            CKEDITOR.dom.element.clearAllMarkers(h);g = d[0].getParent();
            (g = g.getPrevious()) ? f = g.getLast() : (g = d[f].getParent(), f = (g = g.getNext()) ? g.getChild(0) : null)
          }
          b.reset();
          for(b =
            d.length - 1; 0 <= b; b--) k(d[b]);
          f ? m(f, !0) : e && (c[0].moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), c[0].select(), e.remove())
        } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
      }

      function m(a, b) {
        var c = a.getDocument(),
          d = CKEDITOR.document;
        CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus());
        c = new CKEDITOR.dom.range(c);
        c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0));
        c.select(!0)
      }

      function g(a, b, c) {
        a = a[b];
        if("undefined" == typeof c) return a;
        for(b = 0; a && b < a.length; b++) {
          if(c.is && a[b] == c.$) return b;
          if(b == c) return new CKEDITOR.dom.element(a[b])
        }
        return c.is ? -1 : null
      }

      function n(b, c, d) {
        var e = a(b),
          f;
        if((c ? 1 != e.length : 2 > e.length) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1;
        var k;
        b = e[0];
        f = b.getAscendant("table");
        var h = CKEDITOR.tools.buildTableMap(f),
          l = h.length,
          m = h[0].length,
          n = b.getParent().$.rowIndex,
          p = g(h, n, b);
        if(c) {
          var t;
          try {
            var u = parseInt(b.getAttribute("rowspan"), 10) || 1;
            k = parseInt(b.getAttribute("colspan"), 10) || 1;
            t = h["up" == c ? n - u : "down" == c ? n + u : n]["left" == c ? p - k : "right" == c ? p + k : p]
          } catch(A) {
            return !1
          }
          if(!t || b.$ == t) return !1;
          e["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(t))
        }
        c = b.getDocument();
        var J = n,
          u = t = 0,
          M = !d && new CKEDITOR.dom.documentFragment(c),
          F = 0;
        for(c = 0; c < e.length; c++) {
          k = e[c];
          var Q = k.getParent(),
            N = k.getFirst(),
            R = k.$.colSpan,
            K = k.$.rowSpan,
            Q = Q.$.rowIndex,
            U = g(h, Q, k),
            F = F + R * K,
            u = Math.max(u, U - p + R);
          t = Math.max(t, Q - n + K);
          d || (R = k, (K = R.getBogus()) && K.remove(),
            R.trim(), k.getChildren().count() && (Q == J || !N || N.isBlockBoundary && N.isBlockBoundary({
              br: 1
            }) || (J = M.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !J || J.is && J.is("br") || M.append("br")), k.moveChildren(M)), c ? k.remove() : k.setHtml(""));
          J = Q
        }
        if(d) return t * u == F;
        M.moveChildren(b);
        b.appendBogus();
        u >= m ? b.removeAttribute("rowSpan") : b.$.rowSpan = t;
        t >= l ? b.removeAttribute("colSpan") : b.$.colSpan = u;
        d = new CKEDITOR.dom.nodeList(f.$.rows);
        e = d.count();
        for(c = e - 1; 0 <= c; c--) f = d.getItem(c), f.$.cells.length || (f.remove(), e++);
        return b
      }

      function p(b, c) {
        var d = a(b);
        if(1 < d.length) return !1;
        if(c) return !0;
        var d = d[0],
          e = d.getParent(),
          f = e.getAscendant("table"),
          k = CKEDITOR.tools.buildTableMap(f),
          h = e.$.rowIndex,
          l = g(k, h, d),
          m = d.$.rowSpan,
          n;
        if(1 < m) {
          n = Math.ceil(m / 2);
          for(var m = Math.floor(m / 2), e = h + n, f = new CKEDITOR.dom.element(f.$.rows[e]), k = g(k, e), p, e = d.clone(), h = 0; h < k.length; h++)
            if(p = k[h], p.parentNode == f.$ && h > l) {
              e.insertBefore(new CKEDITOR.dom.element(p));
              break
            } else p = null;
          p || f.append(e)
        } else
          for(m = n = 1, f = e.clone(), f.insertAfter(e), f.append(e = d.clone()),
            p = g(k, h), l = 0; l < p.length; l++) p[l].rowSpan++;
        e.appendBogus();
        d.$.rowSpan = n;
        e.$.rowSpan = m;
        1 == n && d.removeAttribute("rowSpan");
        1 == m && e.removeAttribute("rowSpan");
        return e
      }

      function t(b, c) {
        var d = a(b);
        if(1 < d.length) return !1;
        if(c) return !0;
        var d = d[0],
          e = d.getParent(),
          f = e.getAscendant("table"),
          f = CKEDITOR.tools.buildTableMap(f),
          k = g(f, e.$.rowIndex, d),
          h = d.$.colSpan;
        if(1 < h) e = Math.ceil(h / 2), h = Math.floor(h / 2);
        else {
          for(var h = e = 1, l = [], m = 0; m < f.length; m++) {
            var n = f[m];
            l.push(n[k]);
            1 < n[k].rowSpan && (m += n[k].rowSpan - 1)
          }
          for(f =
            0; f < l.length; f++) l[f].colSpan++
        }
        f = d.clone();
        f.insertAfter(d);
        f.appendBogus();
        d.$.colSpan = e;
        f.$.colSpan = h;
        1 == e && d.removeAttribute("colSpan");
        1 == h && f.removeAttribute("colSpan");
        return f
      }
      var A = /^(?:td|th)$/,
        u = CKEDITOR.tools.isArray;
      CKEDITOR.plugins.tabletools = {
        requires: "table,dialog,contextmenu",
        init: function(c) {
          function f(a) {
            return CKEDITOR.tools.extend(a || {}, {
              contextSensitive: 1,
              refresh: function(a, b) {
                this.setState(b.contains({
                  td: 1,
                  th: 1
                }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
              }
            })
          }

          function g(a,
            b) {
            var d = c.addCommand(a, b);
            c.addFeature(d)
          }
          var u = c.lang.table,
            q = CKEDITOR.tools.style.parse;
          g("cellProperties", new CKEDITOR.dialogCommand("cellProperties", f({
            allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
            requiredContent: "table",
            contentTransformations: [
              [{
                  element: "td",
                  left: function(a) {
                    return a.styles.background && q.background(a.styles.background).color
                  },
                  right: function(a) {
                    a.styles["background-color"] = q.background(a.styles.background).color
                  }
                },
                {
                  element: "td",
                  check: "td{vertical-align}",
                  left: function(a) {
                    return a.attributes && a.attributes.valign
                  },
                  right: function(a) {
                    a.styles["vertical-align"] = a.attributes.valign;
                    delete a.attributes.valign
                  }
                }
              ],
              [{
                element: "tr",
                check: "td{height}",
                left: function(a) {
                  return a.styles && a.styles.height
                },
                right: function(a) {
                  CKEDITOR.tools.array.forEach(a.children, function(b) {
                    b.name in {
                      td: 1,
                      th: 1
                    } && (b.attributes["cke-row-height"] = a.styles.height)
                  });
                  delete a.styles.height
                }
              }],
              [{
                element: "td",
                check: "td{height}",
                left: function(a) {
                  return(a =
                    a.attributes) && a["cke-row-height"]
                },
                right: function(a) {
                  a.styles.height = a.attributes["cke-row-height"];
                  delete a.attributes["cke-row-height"]
                }
              }]
            ]
          })));
          CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
          g("rowDelete", f({
            requiredContent: "table",
            exec: function(a) {
              a = a.getSelection();
              (a = b(a)) && m(a)
            }
          }));
          g("rowInsertBefore", f({
            requiredContent: "table",
            exec: function(b) {
              b = b.getSelection();
              b = a(b);
              e(b, !0)
            }
          }));
          g("rowInsertAfter", f({
            requiredContent: "table",
            exec: function(b) {
              b = b.getSelection();
              b = a(b);
              e(b)
            }
          }));
          g("columnDelete", f({
            requiredContent: "table",
            exec: function(a) {
              a = a.getSelection();
              (a = h(a)) && m(a, !0)
            }
          }));
          g("columnInsertBefore", f({
            requiredContent: "table",
            exec: function(b) {
              b = b.getSelection();
              b = a(b);
              l(b, !0)
            }
          }));
          g("columnInsertAfter", f({
            requiredContent: "table",
            exec: function(b) {
              b = b.getSelection();
              b = a(b);
              l(b)
            }
          }));
          g("cellDelete", f({
            requiredContent: "table",
            exec: function(a) {
              a = a.getSelection();
              k(a)
            }
          }));
          g("cellMerge", f({
            allowedContent: "td[colspan,rowspan]",
            requiredContent: "td[colspan,rowspan]",
            exec: function(a,
              b) {
              b.cell = n(a.getSelection());
              m(b.cell, !0)
            }
          }));
          g("cellMergeRight", f({
            allowedContent: "td[colspan]",
            requiredContent: "td[colspan]",
            exec: function(a, b) {
              b.cell = n(a.getSelection(), "right");
              m(b.cell, !0)
            }
          }));
          g("cellMergeDown", f({
            allowedContent: "td[rowspan]",
            requiredContent: "td[rowspan]",
            exec: function(a, b) {
              b.cell = n(a.getSelection(), "down");
              m(b.cell, !0)
            }
          }));
          g("cellVerticalSplit", f({
            allowedContent: "td[rowspan]",
            requiredContent: "td[rowspan]",
            exec: function(a) {
              m(t(a.getSelection()))
            }
          }));
          g("cellHorizontalSplit",
            f({
              allowedContent: "td[colspan]",
              requiredContent: "td[colspan]",
              exec: function(a) {
                m(p(a.getSelection()))
              }
            }));
          g("cellInsertBefore", f({
            requiredContent: "table",
            exec: function(a) {
              a = a.getSelection();
              d(a, !0)
            }
          }));
          g("cellInsertAfter", f({
            requiredContent: "table",
            exec: function(a) {
              a = a.getSelection();
              d(a)
            }
          }));
          c.addMenuItems && c.addMenuItems({
            tablecell: {
              label: u.cell.menu,
              group: "tablecell",
              order: 1,
              getItems: function() {
                var b = c.getSelection(),
                  d = a(b);
                return {
                  tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                  tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                  tablecell_delete: CKEDITOR.TRISTATE_OFF,
                  tablecell_merge: n(b, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                  tablecell_merge_right: n(b, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                  tablecell_merge_down: n(b, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                  tablecell_split_vertical: t(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                  tablecell_split_horizontal: p(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                  tablecell_properties: 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                }
              }
            },
            tablecell_insertBefore: {
              label: u.cell.insertBefore,
              group: "tablecell",
              command: "cellInsertBefore",
              order: 5
            },
            tablecell_insertAfter: {
              label: u.cell.insertAfter,
              group: "tablecell",
              command: "cellInsertAfter",
              order: 10
            },
            tablecell_delete: {
              label: u.cell.deleteCell,
              group: "tablecell",
              command: "cellDelete",
              order: 15
            },
            tablecell_merge: {
              label: u.cell.merge,
              group: "tablecell",
              command: "cellMerge",
              order: 16
            },
            tablecell_merge_right: {
              label: u.cell.mergeRight,
              group: "tablecell",
              command: "cellMergeRight",
              order: 17
            },
            tablecell_merge_down: {
              label: u.cell.mergeDown,
              group: "tablecell",
              command: "cellMergeDown",
              order: 18
            },
            tablecell_split_horizontal: {
              label: u.cell.splitHorizontal,
              group: "tablecell",
              command: "cellHorizontalSplit",
              order: 19
            },
            tablecell_split_vertical: {
              label: u.cell.splitVertical,
              group: "tablecell",
              command: "cellVerticalSplit",
              order: 20
            },
            tablecell_properties: {
              label: u.cell.title,
              group: "tablecellproperties",
              command: "cellProperties",
              order: 21
            },
            tablerow: {
              label: u.row.menu,
              group: "tablerow",
              order: 1,
              getItems: function() {
                return {
                  tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                  tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                  tablerow_delete: CKEDITOR.TRISTATE_OFF
                }
              }
            },
            tablerow_insertBefore: {
              label: u.row.insertBefore,
              group: "tablerow",
              command: "rowInsertBefore",
              order: 5
            },
            tablerow_insertAfter: {
              label: u.row.insertAfter,
              group: "tablerow",
              command: "rowInsertAfter",
              order: 10
            },
            tablerow_delete: {
              label: u.row.deleteRow,
              group: "tablerow",
              command: "rowDelete",
              order: 15
            },
            tablecolumn: {
              label: u.column.menu,
              group: "tablecolumn",
              order: 1,
              getItems: function() {
                return {
                  tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                  tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                  tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                }
              }
            },
            tablecolumn_insertBefore: {
              label: u.column.insertBefore,
              group: "tablecolumn",
              command: "columnInsertBefore",
              order: 5
            },
            tablecolumn_insertAfter: {
              label: u.column.insertAfter,
              group: "tablecolumn",
              command: "columnInsertAfter",
              order: 10
            },
            tablecolumn_delete: {
              label: u.column.deleteColumn,
              group: "tablecolumn",
              command: "columnDelete",
              order: 15
            }
          });
          c.contextMenu && c.contextMenu.addListener(function(a, b, c) {
            return(a = c.contains({
                td: 1,
                th: 1
              },
              1)) && !a.isReadOnly() ? {
              tablecell: CKEDITOR.TRISTATE_OFF,
              tablerow: CKEDITOR.TRISTATE_OFF,
              tablecolumn: CKEDITOR.TRISTATE_OFF
            } : null
          })
        },
        getCellColIndex: c,
        insertRow: e,
        insertColumn: l,
        getSelectedCells: a
      };
      CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(), CKEDITOR.tools.buildTableMap = function(a, e, b, c, f) {
      a = a.$.rows;
      b = b || 0;
      c = "number" === typeof c ? c : a.length - 1;
      f = "number" === typeof f ? f : -1;
      var l = -1,
        h = [];
      for(e = e || 0; e <= c; e++) {
        l++;
        !h[l] && (h[l] = []);
        for(var d = -1, k = b; k <= (-1 === f ? a[e].cells.length - 1 : f); k++) {
          var m =
            a[e].cells[k];
          if(!m) break;
          for(d++; h[l][d];) d++;
          for(var g = isNaN(m.colSpan) ? 1 : m.colSpan, m = isNaN(m.rowSpan) ? 1 : m.rowSpan, n = 0; n < m && !(e + n > c); n++) {
            h[l + n] || (h[l + n] = []);
            for(var p = 0; p < g; p++) h[l + n][d + p] = a[e].cells[k]
          }
          d += g - 1;
          if(-1 !== f && d >= f) break
        }
      }
      return h
    },
    function() {
      function a(a, b) {
        var c = a.getAscendant("table"),
          d = b.getAscendant("table"),
          e = CKEDITOR.tools.buildTableMap(c),
          f = k(a),
          g = k(b),
          h = [],
          l = {},
          m, n;
        c.contains(d) && (b = b.getAscendant({
          td: 1,
          th: 1
        }), g = k(b));
        f > g && (c = f, f = g, g = c, c = a, a = b, b = c);
        for(c = 0; c < e[f].length; c++)
          if(a.$ ===
            e[f][c]) {
            m = c;
            break
          }
        for(c = 0; c < e[g].length; c++)
          if(b.$ === e[g][c]) {
            n = c;
            break
          }
        m > n && (c = m, m = n, n = c);
        for(c = f; c <= g; c++)
          for(f = m; f <= n; f++) d = new CKEDITOR.dom.element(e[c][f]), d.$ && !d.getCustomData("selected_cell") && (h.push(d), CKEDITOR.dom.element.setMarker(l, d, "selected_cell", !0));
        CKEDITOR.dom.element.clearAllMarkers(l);
        return h
      }

      function e(a) {
        if(a) return a = a.clone(), a.enlarge(CKEDITOR.ENLARGE_ELEMENT), (a = a.getEnclosedNode()) && a.is && a.is(CKEDITOR.dtd.$tableContent)
      }

      function b(a) {
        return(a = a.editable().findOne(".cke_table-faked-selection")) &&
          a.getAscendant("table")
      }

      function c(a, b) {
        var c = a.editable().find(".cke_table-faked-selection"),
          d;
        a.fire("lockSnapshot");
        a.editable().removeClass("cke_table-faked-selection-editor");
        for(d = 0; d < c.count(); d++) c.getItem(d).removeClass("cke_table-faked-selection");
        0 < c.count() && c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table", !1);
        a.fire("unlockSnapshot");
        b && (u = {
          active: !1
        }, a.getSelection().isInTable() && a.getSelection().reset())
      }

      function f(a, b) {
        var c = [],
          d, e;
        for(e = 0; e < b.length; e++) d =
          a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d);
        a.getSelection().selectRanges(c)
      }

      function l(b) {
        var c = b.editable().find(".cke_table-faked-selection");
        1 > c.count() || (c = a(c.getItem(0), c.getItem(c.count() - 1)), f(b, c))
      }

      function h(b, d, e) {
        var g = v(b.getSelection(!0));
        d = d.is("table") ? null : d;
        var k;
        (k = u.active && !u.first) && !(k = d) && (k = b.getSelection().getRanges(), k = 1 < g.length || k[0] && !k[0].collapsed ? !0 : !1);
        if(k) u.first = d || g[0], u.dirty = d ? !1 : 1 !== g.length;
        else if(u.active && d && u.first.getAscendant("table").equals(d.getAscendant("table"))) {
          g =
            a(u.first, d);
          if(!u.dirty && 1 === g.length) return c(b, "mouseup" === e.name);
          u.dirty = !0;
          u.last = d;
          f(b, g)
        }
      }

      function d(a) {
        var b = (a = a.editor || a.sender.editor) && a.getSelection(),
          d = b && b.getRanges() || [],
          e;
        if(b && (c(a), b.isInTable() && b.isFake)) {
          1 === d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table") && (e = d[0]._getTableElement());
          e = v(b, e);
          a.fire("lockSnapshot");
          for(b = 0; b < e.length; b++) e[b].addClass("cke_table-faked-selection");
          0 < e.length && (a.editable().addClass("cke_table-faked-selection-editor"),
            e[0].getAscendant("table").data("cke-table-faked-selection-table", ""));
          a.fire("unlockSnapshot")
        }
      }

      function k(a) {
        return a.getAscendant("tr", !0).$.rowIndex
      }

      function m(a) {
        function d(a, b) {
          return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(r) : !1
        }

        function e(a) {
          return !a.getAscendant("table", !0) && a.getDocument().equals(g.document)
        }

        function f(a, b, c, g) {
          return("mousedown" !== a.name || CKEDITOR.tools.getMouseButton(a) !== CKEDITOR.MOUSE_BUTTON_LEFT && g) && ("mouseup" !== a.name || e(a.data.getTarget()) ||
            d(c, g)) ? !1 : !0
        }
        if(a.data.getTarget().getName) {
          var g = a.editor || a.listenerData.editor,
            k = g.getSelection(1),
            n = b(g),
            p = a.data.getTarget(),
            q = p && p.getAscendant({
              td: 1,
              th: 1
            }, !0),
            p = p && p.getAscendant("table", !0),
            r = {
              table: 1,
              thead: 1,
              tbody: 1,
              tfoot: 1,
              tr: 1,
              td: 1,
              th: 1
            };
          f(a, k, n, p) && c(g, !0);
          !u.active && "mousedown" === a.name && CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT && p && (u = {
            active: !0
          }, CKEDITOR.document.on("mouseup", m, null, {
            editor: g
          }));
          (q || p) && h(g, q || p, a);
          "mouseup" === a.name && (CKEDITOR.tools.getMouseButton(a) ===
            CKEDITOR.MOUSE_BUTTON_LEFT && (e(a.data.getTarget()) || d(n, p)) && l(g), u = {
              active: !1
            }, CKEDITOR.document.removeListener("mouseup", m))
        }
      }

      function g(a) {
        var b = a.data.getTarget().getAscendant({
          td: 1,
          th: 1
        }, !0);
        b && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault())
      }

      function n(a, b) {
        function c(a) {
          a.cancel()
        }
        var d = a.getSelection(),
          e = d.createBookmarks(),
          f = a.document,
          g = a.createRange(),
          k = f.getDocumentElement().$,
          h = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
          l = a.blockless || CKEDITOR.env.ie ? "span" :
          "div",
          m, n, p, q;
        f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({
          id: "cke_table_copybin",
          "data-cke-temp": "1"
        }), m.setStyles({
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden"
        }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), q = a.on("selectionChange", c, null, null, 0), h && (p = k.scrollTop), g.selectNodeContents(m), g.select(), h && (k.scrollTop =
          p), setTimeout(function() {
          n.remove();
          d.selectBookmarks(e);
          q.removeListener();
          a.fire("unlockSnapshot");
          b && (a.extractSelectedHtml(), a.fire("saveSnapshot"))
        }, 100))
      }

      function p(a) {
        var b = a.editor || a.sender.editor;
        b.getSelection().isInTable() && n(b, "cut" === a.name)
      }

      function t(a) {
        this._reset();
        a && this.setSelectedCells(a)
      }

      function A(a, b, c) {
        a.on("beforeCommandExec", function(c) {
          -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = v(a.getSelection()))
        });
        a.on("afterCommandExec", function(d) {
          -1 !==
            CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data)
        })
      }
      var u = {
          active: !1
        },
        r, v, w, B, q;
      t.prototype = {};
      t.prototype._reset = function() {
        this.cells = {
          first: null,
          last: null,
          all: []
        };
        this.rows = {
          first: null,
          last: null
        }
      };
      t.prototype.setSelectedCells = function(a) {
        this._reset();
        a = a.slice(0);
        this._arraySortByDOMOrder(a);
        this.cells.all = a;
        this.cells.first = a[0];
        this.cells.last = a[a.length - 1];
        this.rows.first = a[0].getAscendant("tr");
        this.rows.last = this.cells.last.getAscendant("tr")
      };
      t.prototype.getTableMap = function() {
        var a =
          w(this.cells.first),
          b;
        a: {
          b = this.cells.last;
          var c = b.getAscendant("table"),
            d = k(b),
            c = CKEDITOR.tools.buildTableMap(c),
            e;
          for(e = 0; e < c[d].length; e++)
            if((new CKEDITOR.dom.element(c[d][e])).equals(b)) {
              b = e;
              break a
            }
          b = void 0
        }
        return CKEDITOR.tools.buildTableMap(this._getTable(), k(this.rows.first), a, k(this.rows.last), b)
      };
      t.prototype._getTable = function() {
        return this.rows.first.getAscendant("table")
      };
      t.prototype.insertRow = function(a, b, c) {
        if("undefined" === typeof a) a = 1;
        else if(0 >= a) return;
        for(var d = this.cells.first.$.cellIndex,
            e = this.cells.last.$.cellIndex, f = c ? [] : this.cells.all, g, k = 0; k < a; k++) g = B(c ? this.cells.all : f, b), g = CKEDITOR.tools.array.filter(g.find("td, th").toArray(), function(a) {
          return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <= e
        }), f = b ? g.concat(f) : f.concat(g);
        this.setSelectedCells(f)
      };
      t.prototype.insertColumn = function(a) {
        function b(a) {
          a = k(a);
          return a >= e && a <= f
        }
        if("undefined" === typeof a) a = 1;
        else if(0 >= a) return;
        for(var c = this.cells, d = c.all, e = k(c.first), f = k(c.last), c = 0; c < a; c++) d = d.concat(CKEDITOR.tools.array.filter(q(d), b));
        this.setSelectedCells(d)
      };
      t.prototype.emptyCells = function(a) {
        a = a || this.cells.all;
        for(var b = 0; b < a.length; b++) a[b].setHtml("")
      };
      t.prototype._arraySortByDOMOrder = function(a) {
        a.sort(function(a, b) {
          return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1
        })
      };
      var z = {
        onPaste: function(b) {
          function c(a) {
            return Math.max.apply(null, CKEDITOR.tools.array.map(a, function(a) {
              return a.length
            }, 0))
          }

          function d(a) {
            var b = g.createRange();
            b.selectNodeContents(a);
            b.select()
          }
          var g = b.editor,
            k = g.getSelection(),
            h = v(k),
            l = this.findTableInPastedContent(g,
              b.data.dataValue),
            m = k.isInTable(!0) && this.isBoundarySelection(k),
            n, p;
          !h.length || 1 === h.length && !e(k.getRanges()[0]) && !m || m && !l || (h = h[0].getAscendant("table"), n = new t(v(k, h)), g.once("afterPaste", function() {
            var b;
            if(p) {
              b = new CKEDITOR.dom.element(p[0][0]);
              var c = p[p.length - 1];
              b = a(b, new CKEDITOR.dom.element(c[c.length - 1]))
            } else b = n.cells.all;
            f(g, b)
          }), l ? (b.stop(), m ? (n.insertRow(1, 1 === m, !0), k.selectElement(n.rows.first)) : (n.emptyCells(), f(g, n.cells.all)), b = n.getTableMap(), p = CKEDITOR.tools.buildTableMap(l),
            n.insertRow(p.length - b.length), n.insertColumn(c(p) - c(b)), b = n.getTableMap(), this.pasteTable(n, b, p), g.fire("saveSnapshot"), setTimeout(function() {
              g.fire("afterPaste")
            }, 0)) : (d(n.cells.first), g.once("afterPaste", function() {
            g.fire("lockSnapshot");
            n.emptyCells(n.cells.all.slice(1));
            f(g, n.cells.all);
            g.fire("unlockSnapshot")
          })))
        },
        isBoundarySelection: function(a) {
          a = a.getRanges()[0];
          var b = a.endContainer.getAscendant("tr", !0);
          if(b && a.collapsed) {
            if(a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1;
            if(a.checkBoundaryOfElement(b,
                CKEDITOR.END)) return 2
          }
          return 0
        },
        findTableInPastedContent: function(a, b) {
          var c = a.dataProcessor,
            d = new CKEDITOR.dom.element("body");
          c || (c = new CKEDITOR.htmlDataProcessor(a));
          d.setHtml(c.toHtml(b), {
            fixForBody: !1
          });
          return 1 < d.getChildCount() ? null : d.findOne("table")
        },
        pasteTable: function(a, b, c) {
          var d, e = w(a.cells.first),
            f = a._getTable(),
            g = {},
            k, h, l, m;
          for(l = 0; l < c.length; l++)
            for(k = new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < c[l].length; m++)
              if(h = new CKEDITOR.dom.element(c[l][m]), d = b[l] &&
                b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, h && !h.getCustomData("processed")) {
                if(d && d.getParent()) h.replace(d);
                else if(0 === m || c[l][m - 1])(d = 0 !== m ? new CKEDITOR.dom.element(c[l][m - 1]) : null) && k.equals(d.getParent()) ? h.insertAfter(d) : 0 < e ? k.$.cells[e] ? h.insertAfter(new CKEDITOR.dom.element(k.$.cells[e])) : k.append(h) : k.append(h, !0);
                CKEDITOR.dom.element.setMarker(g, h, "processed", !0)
              } else h.getCustomData("processed") && d && d.remove();
          CKEDITOR.dom.element.clearAllMarkers(g)
        }
      };
      CKEDITOR.plugins.tableselection = {
        getCellsBetween: a,
        keyboardIntegration: function(a) {
          function b(a) {
            var c = a.getEnclosedNode();
            c && c.is({
              td: 1,
              th: 1
            }) ? a.getEnclosedNode().setText("") : a.deleteContents();
            CKEDITOR.tools.array.forEach(a._find("td"), function(a) {
              a.appendBogus()
            })
          }
          var c = a.editable();
          c.attachListener(c, "keydown", function(a) {
            function c(b, d) {
              if(!d.length) return null;
              var f = a.createRange(),
                g = CKEDITOR.dom.range.mergeRanges(d);
              CKEDITOR.tools.array.forEach(g, function(a) {
                a.enlarge(CKEDITOR.ENLARGE_ELEMENT)
              });
              var k = g[0].getBoundaryNodes(),
                h = k.startNode,
                k = k.endNode;
              if(h && h.is && h.is(e)) {
                for(var l = h.getAscendant("table", !0), m = h.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function(a) {
                    return !h.contains(a) && a.is && a.is("td", "th")
                  }; m && !p(m);) m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l);
                !m && k && k.is && !k.is("table") && k.getNext() && (m = k.getNext().findOne("td, th"), n = !0);
                if(m) f["moveToElementEdit" + (n ? "Start" : "End")](m);
                else f.setStartBefore(h.getAscendant("table", !0)), f.collapse(!0);
                g[0].deleteContents();
                return [f]
              }
              if(h) return f.moveToElementEditablePosition(h), [f]
            }
            var d = {
                37: 1,
                38: 1,
                39: 1,
                40: 1,
                8: 1,
                46: 1
              },
              e = CKEDITOR.tools.extend({
                table: 1
              }, CKEDITOR.dtd.$tableContent);
            delete e.td;
            delete e.th;
            return function(e) {
              var f = e.data.getKey(),
                g, k = 37 === f || 38 == f,
                h, l, m;
              if(d[f] && (g = a.getSelection()) && g.isInTable() && g.isFake)
                if(h = g.getRanges(), l = h[0]._getTableElement(), m = h[h.length - 1]._getTableElement(), e.data.preventDefault(), e.cancel(), 8 < f && 46 > f) h[0].moveToElementEditablePosition(k ? l : m, !k), g.selectRanges([h[0]]);
                else {
                  for(e = 0; e < h.length; e++) b(h[e]);
                  (e = c(l, h)) ? h = e: h[0].moveToElementEditablePosition(l);
                  g.selectRanges(h);
                  a.fire("saveSnapshot")
                }
            }
          }(a), null, null, -1);
          c.attachListener(c, "keypress", function(c) {
            var d = a.getSelection(),
              e = c.data.$.charCode || 13 === c.data.getKey(),
              f;
            if(d && d.isInTable() && d.isFake && e && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
              c = d.getRanges();
              e = c[0].getEnclosedNode().getAscendant({
                td: 1,
                th: 1
              }, !0);
              for(f = 0; f < c.length; f++) b(c[f]);
              e && (c[0].moveToElementEditablePosition(e), d.selectRanges([c[0]]))
            }
          }, null, null, -1)
        },
        isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
      };
      CKEDITOR.plugins.add("tableselection", {
        requires: "clipboard,tabletools",
        onLoad: function() {
          r = CKEDITOR.plugins.tabletools;
          v = r.getSelectedCells;
          w = r.getCellColIndex;
          B = r.insertRow;
          q = r.insertColumn;
          CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
        },
        init: function(a) {
          CKEDITOR.plugins.tableselection.isSupportedEnvironment && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function() {
            var b = a.editable(),
              c = b.isInline() ? b : a.document,
              e = {
                editor: a
              };
            b.attachListener(c, "mousedown", m, null,
              e);
            b.attachListener(c, "mousemove", m, null, e);
            b.attachListener(c, "mouseup", m, null, e);
            b.attachListener(b, "dragstart", g);
            b.attachListener(a, "selectionCheck", d);
            CKEDITOR.plugins.tableselection.keyboardIntegration(a);
            CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", p), b.attachListener(b, "copy", p))
          }), a.on("paste", z.onPaste, z), A(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function(a,
            b) {
            f(a, b.selectedCells)
          }), A(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function(a, b) {
            f(a, [b.commandData.cell])
          }), A(a, ["cellDelete"], function(a) {
            c(a, !0)
          }))
        }
      })
    }(),
    function() {
      CKEDITOR.plugins.add("templates", {
        requires: "dialog",
        init: function(a) {
          CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
          a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
          a.ui.addButton && a.ui.addButton("Templates", {
            label: a.lang.templates.button,
            command: "templates",
            toolbar: "doctools,10"
          })
        }
      });
      var a = {},
        e = {};
      CKEDITOR.addTemplates = function(b, c) {
        a[b] = c
      };
      CKEDITOR.getTemplates = function(b) {
        return a[b]
      };
      CKEDITOR.loadTemplates = function(a, c) {
        for(var f = [], l = 0, h = a.length; l < h; l++) e[a[l]] || (f.push(a[l]), e[a[l]] = 1);
        f.length ? CKEDITOR.scriptLoader.load(f, c) : setTimeout(c, 0)
      }
    }(), CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")], CKEDITOR.config.templates_replaceContent = !0, "use strict",
    function() {
      var a = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT +
          90
        ],
        e = {
          8: 1,
          46: 1
        };
      CKEDITOR.plugins.add("undo", {
        init: function(c) {
          function e(a) {
            g.enabled && !1 !== a.data.command.canUndo && g.save()
          }

          function f() {
            g.enabled = c.readOnly ? !1 : "wysiwyg" == c.mode;
            g.onChange()
          }
          var g = c.undoManager = new b(c),
            h = g.editingHandler = new l(g),
            p = c.addCommand("undo", {
              exec: function() {
                g.undo() && (c.selectionChange(), this.fire("afterUndo"))
              },
              startDisabled: !0,
              canUndo: !1
            }),
            t = c.addCommand("redo", {
              exec: function() {
                g.redo() && (c.selectionChange(), this.fire("afterRedo"))
              },
              startDisabled: !0,
              canUndo: !1
            });
          c.setKeystroke([
            [a[0], "undo"],
            [a[1], "redo"],
            [a[2], "redo"]
          ]);
          g.onChange = function() {
            p.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
            t.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
          };
          c.on("beforeCommandExec", e);
          c.on("afterCommandExec", e);
          c.on("saveSnapshot", function(a) {
            g.save(a.data && a.data.contentOnly)
          });
          c.on("contentDom", h.attachListeners, h);
          c.on("instanceReady", function() {
            c.fire("saveSnapshot")
          });
          c.on("beforeModeUnload", function() {
            "wysiwyg" == c.mode &&
              g.save(!0)
          });
          c.on("mode", f);
          c.on("readOnly", f);
          c.ui.addButton && (c.ui.addButton("Undo", {
            label: c.lang.undo.undo,
            command: "undo",
            toolbar: "undo,10"
          }), c.ui.addButton("Redo", {
            label: c.lang.undo.redo,
            command: "redo",
            toolbar: "undo,20"
          }));
          c.resetUndo = function() {
            g.reset();
            c.fire("saveSnapshot")
          };
          c.on("updateSnapshot", function() {
            g.currentImage && g.update()
          });
          c.on("lockSnapshot", function(a) {
            a = a.data;
            g.lock(a && a.dontUpdate, a && a.forceUpdate)
          });
          c.on("unlockSnapshot", g.unlock, g)
        }
      });
      CKEDITOR.plugins.undo = {};
      var b = CKEDITOR.plugins.undo.UndoManager =
        function(a) {
          this.strokesRecorded = [0, 0];
          this.locked = null;
          this.previousKeyGroup = -1;
          this.limit = a.config.undoStackSize || 20;
          this.strokesLimit = 25;
          this.editor = a;
          this.reset()
        };
      b.prototype = {
        type: function(a, c) {
          var e = b.getKeyGroup(a),
            f = this.strokesRecorded[e] + 1;
          c = c || f >= this.strokesLimit;
          this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
          c ? (f = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
          this.strokesRecorded[e] = f;
          this.previousKeyGroup = e
        },
        keyGroupChanged: function(a) {
          return b.getKeyGroup(a) !=
            this.previousKeyGroup
        },
        reset: function() {
          this.snapshots = [];
          this.index = -1;
          this.currentImage = null;
          this.hasRedo = this.hasUndo = !1;
          this.locked = null;
          this.resetType()
        },
        resetType: function() {
          this.strokesRecorded = [0, 0];
          this.typing = !1;
          this.previousKeyGroup = -1
        },
        refreshState: function() {
          this.hasUndo = !!this.getNextImage(!0);
          this.hasRedo = !!this.getNextImage(!1);
          this.resetType();
          this.onChange()
        },
        save: function(a, b, e) {
          var f = this.editor;
          if(this.locked || "ready" != f.status || "wysiwyg" != f.mode) return !1;
          var h = f.editable();
          if(!h ||
            "ready" != h.status) return !1;
          h = this.snapshots;
          b || (b = new c(f));
          if(!1 === b.contents) return !1;
          if(this.currentImage)
            if(b.equalsContent(this.currentImage)) {
              if(a || b.equalsSelection(this.currentImage)) return !1
            } else !1 !== e && f.fire("change");
          h.splice(this.index + 1, h.length - this.index - 1);
          h.length == this.limit && h.shift();
          this.index = h.push(b) - 1;
          this.currentImage = b;
          !1 !== e && this.refreshState();
          return !0
        },
        restoreImage: function(a) {
          var b = this.editor,
            c;
          a.bookmarks && (b.focus(), c = b.getSelection());
          this.locked = {
            level: 999
          };
          this.editor.loadSnapshot(a.contents);
          a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
          this.locked = null;
          this.index = a.index;
          this.currentImage = this.snapshots[this.index];
          this.update();
          this.refreshState();
          b.fire("change")
        },
        getNextImage: function(a) {
          var b = this.snapshots,
            c = this.currentImage,
            e;
          if(c)
            if(a)
              for(e = this.index - 1; 0 <= e; e--) {
                if(a = b[e], !c.equalsContent(a)) return a.index = e, a
              } else
                for(e = this.index + 1; e < b.length; e++)
                  if(a = b[e], !c.equalsContent(a)) return a.index =
                    e, a;
          return null
        },
        redoable: function() {
          return this.enabled && this.hasRedo
        },
        undoable: function() {
          return this.enabled && this.hasUndo
        },
        undo: function() {
          if(this.undoable()) {
            this.save(!0);
            var a = this.getNextImage(!0);
            if(a) return this.restoreImage(a), !0
          }
          return !1
        },
        redo: function() {
          if(this.redoable() && (this.save(!0), this.redoable())) {
            var a = this.getNextImage(!1);
            if(a) return this.restoreImage(a), !0
          }
          return !1
        },
        update: function(a) {
          if(!this.locked) {
            a || (a = new c(this.editor));
            for(var b = this.index, e = this.snapshots; 0 < b && this.currentImage.equalsContent(e[b -
                1]);) --b;
            e.splice(b, this.index - b + 1, a);
            this.index = b;
            this.currentImage = a
          }
        },
        updateSelection: function(a) {
          if(!this.snapshots.length) return !1;
          var b = this.snapshots,
            c = b[b.length - 1];
          return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
        },
        lock: function(a, b) {
          if(this.locked) this.locked.level++;
          else if(a) this.locked = {
            level: 1
          };
          else {
            var e = null;
            if(b) e = !0;
            else {
              var f = new c(this.editor, !0);
              this.currentImage && this.currentImage.equalsContent(f) && (e = f)
            }
            this.locked = {
              update: e,
              level: 1
            }
          }
        },
        unlock: function() {
          if(this.locked && !--this.locked.level) {
            var a = this.locked.update;
            this.locked = null;
            if(!0 === a) this.update();
            else if(a) {
              var b = new c(this.editor, !0);
              a.equalsContent(b) || this.update()
            }
          }
        }
      };
      b.navigationKeyCodes = {
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        36: 1,
        35: 1,
        33: 1,
        34: 1
      };
      b.keyGroups = {
        PRINTABLE: 0,
        FUNCTIONAL: 1
      };
      b.isNavigationKey = function(a) {
        return !!b.navigationKeyCodes[a]
      };
      b.getKeyGroup = function(a) {
        var c = b.keyGroups;
        return e[a] ? c.FUNCTIONAL : c.PRINTABLE
      };
      b.getOppositeKeyGroup = function(a) {
        var c = b.keyGroups;
        return a ==
          c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL
      };
      b.ieFunctionalKeysBug = function(a) {
        return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL
      };
      var c = CKEDITOR.plugins.undo.Image = function(a, b) {
          this.editor = a;
          a.fire("beforeUndoImage");
          var c = a.getSnapshot();
          CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
          this.contents = c;
          b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
          a.fire("afterUndoImage")
        },
        f = /\b(?:href|src|name)="[^"]*?"/gi;
      c.prototype = {
        equalsContent: function(a) {
          var b =
          this.contents;
          a = a.contents;
          CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(f, ""), a = a.replace(f, ""));
          return b != a ? !1 : !0
        },
        equalsSelection: function(a) {
          var b = this.bookmarks;
          a = a.bookmarks;
          if(b || a) {
            if(!b || !a || b.length != a.length) return !1;
            for(var c = 0; c < b.length; c++) {
              var e = b[c],
                f = a[c];
              if(e.startOffset != f.startOffset || e.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(e.start, f.start) || !CKEDITOR.tools.arrayCompare(e.end, f.end)) return !1
            }
          }
          return !0
        }
      };
      var l = CKEDITOR.plugins.undo.NativeEditingHandler =
        function(a) {
          this.undoManager = a;
          this.ignoreInputEvent = !1;
          this.keyEventsStack = new h;
          this.lastKeydownImage = null
        };
      l.prototype = {
        onKeydown: function(d) {
          var e = d.data.getKey();
          if(229 !== e)
            if(-1 < CKEDITOR.tools.indexOf(a, d.data.getKeystroke())) d.data.preventDefault();
            else if(this.keyEventsStack.cleanUp(d), d = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new c(d.editor), b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e))
            if(d.strokesRecorded[0] || d.strokesRecorded[1]) d.save(!1,
              this.lastKeydownImage, !1), d.resetType()
        },
        onInput: function() {
          if(this.ignoreInputEvent) this.ignoreInputEvent = !1;
          else {
            var a = this.keyEventsStack.getLast();
            a || (a = this.keyEventsStack.push(0));
            this.keyEventsStack.increment(a.keyCode);
            this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
          }
        },
        onKeyup: function(a) {
          var e = this.undoManager;
          a = a.data.getKey();
          var f = this.keyEventsStack.getTotalInputs();
          this.keyEventsStack.remove(a);
          if(!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(e.editor, !0))))
            if(0 < f) e.type(a);
            else if(b.isNavigationKey(a)) this.onNavigationKey(!0)
        },
        onNavigationKey: function(a) {
          var b = this.undoManager;
          !a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor));
          b.resetType()
        },
        ignoreInputEventListener: function() {
          this.ignoreInputEvent = !0
        },
        activateInputEventListener: function() {
          this.ignoreInputEvent = !1
        },
        attachListeners: function() {
          var a = this.undoManager.editor,
            c = a.editable(),
            e = this;
          c.attachListener(c, "keydown", function(a) {
            e.onKeydown(a);
            /* zxt - 20171107 ie chinese onchange bug */
            if(b.ieFunctionalKeysBug(a.data.getKey()) || a.data.getKey() === 229 ) e.onInput()
          }, null, null, 999);
          c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", e.onInput, e, null, 999);
          c.attachListener(c, "keyup", e.onKeyup, e, null, 999);
          c.attachListener(c, "paste", e.ignoreInputEventListener, e, null, 999);
          c.attachListener(c, "drop", e.ignoreInputEventListener, e, null, 999);
          a.on("afterPaste", e.activateInputEventListener, e, null, 999);
          c.attachListener(c.isInline() ? c : a.document.getDocumentElement(),
            "click",
            function() {
              e.onNavigationKey()
            }, null, null, 999);
          c.attachListener(this.undoManager.editor, "blur", function() {
            e.keyEventsStack.remove(9)
          }, null, null, 999)
        }
      };
      var h = CKEDITOR.plugins.undo.KeyEventsStack = function() {
        this.stack = []
      };
      h.prototype = {
        push: function(a) {
          a = this.stack.push({
            keyCode: a,
            inputs: 0
          });
          return this.stack[a - 1]
        },
        getLastIndex: function(a) {
          if("number" != typeof a) return this.stack.length - 1;
          for(var b = this.stack.length; b--;)
            if(this.stack[b].keyCode == a) return b;
          return -1
        },
        getLast: function(a) {
          a = this.getLastIndex(a);
          return -1 != a ? this.stack[a] : null
        },
        increment: function(a) {
          this.getLast(a).inputs++
        },
        remove: function(a) {
          a = this.getLastIndex(a); - 1 != a && this.stack.splice(a, 1)
        },
        resetInputs: function(a) {
          if("number" == typeof a) this.getLast(a).inputs = 0;
          else
            for(a = this.stack.length; a--;) this.stack[a].inputs = 0
        },
        getTotalInputs: function() {
          for(var a = this.stack.length, b = 0; a--;) b += this.stack[a].inputs;
          return b
        },
        cleanUp: function(a) {
          a = a.data.$;
          a.ctrlKey || a.metaKey || this.remove(17);
          a.shiftKey || this.remove(16);
          a.altKey || this.remove(18)
        }
      }
    }(),
    CKEDITOR.plugins.add("wsc", {
      requires: "dialog",
      parseApi: function(a) {
        a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function() {};
        a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function() {}
      },
      parseConfig: function(a) {
        a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
        a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds ||
          CKEDITOR.config.wsc_customDictionaryIds || "";
        a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
        a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
        a.config.wsc_interfaceLang = a.config.wsc_interfaceLang;
        CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
        CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
        CKEDITOR.config.wsc_removeGlobalVariable = !0
      },
      onLoad: function(a) {
        "moono-lisa" ==
        (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")
      },
      init: function(a) {
        var e = CKEDITOR.env;
        this.parseConfig(a);
        this.parseApi(a);
        a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
          wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(e.ie && (8 > e.version || e.quirks))
        };
        "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
          label: a.lang.wsc.toolbar,
          click: function(a) {
            var c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
            (c = c.replace(/\s/g, "")) ? a.execCommand("checkspell"): alert("Nothing to check!")
          },
          toolbar: "spellchecker,10"
        });
        CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
      }
    }),
    function() {
      function a(a) {
        function b(a) {
          var c = !1;
          g.attachListener(g, "keydown", function() {
            var b = d.getBody().getElementsByTag(a);
            if(!c) {
              for(var e = 0; e < b.count(); e++) b.getItem(e).setCustomData("retain", !0);
              c = !0
            }
          }, null, null, 1);
          g.attachListener(g, "keyup", function() {
            var b = d.getElementsByTag(a);
            c && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), c = !1)
          })
        }
        var c = this.editor,
          d = a.document,
          k = d.body,
          m = d.getElementById("cke_actscrpt");
        m && m.parentNode.removeChild(m);
        (m = d.getElementById("cke_shimscrpt")) && m.parentNode.removeChild(m);
        (m = d.getElementById("cke_basetagscrpt")) &&
        m.parentNode.removeChild(m);
        k.contentEditable = !0;
        CKEDITOR.env.ie && (k.hideFocus = !0, k.disabled = !0, k.removeAttribute("disabled"));
        delete this._.isLoadingData;
        this.$ = k;
        d = new CKEDITOR.dom.document(d);
        this.setup();
        this.fixInitialSelection();
        var g = this;
        CKEDITOR.env.ie && !CKEDITOR.env.edge && d.getDocumentElement().addClass(d.$.compatMode);
        CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && c.enterMode != CKEDITOR.ENTER_DIV && b("div");
        if(CKEDITOR.env.webkit ||
          CKEDITOR.env.ie && 10 < CKEDITOR.env.version) d.getDocumentElement().on("mousedown", function(a) {
          a.data.getTarget().is("html") && setTimeout(function() {
            c.editable().focus()
          })
        });
        e(c);
        try {
          c.document.$.execCommand("2D-position", !1, !0)
        } catch(n) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
          var b = a.data.getKeystroke();
          if(33 == b || 34 == b)
            if(CKEDITOR.env.ie) setTimeout(function() {
              c.getSelection().scrollIntoView()
            }, 0);
            else if(c.window.$.innerHeight >
            this.$.offsetHeight) {
            var d = c.createRange();
            d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
            d.select();
            a.data.preventDefault()
          }
        });
        CKEDITOR.env.ie && this.attachListener(d, "blur", function() {
          try {
            d.$.selection.empty()
          } catch(a) {}
        });
        CKEDITOR.env.iOS && this.attachListener(d, "touchend", function() {
          a.focus()
        });
        k = c.document.getElementsByTag("title").getItem(0);
        k.data("cke-title", k.getText());
        CKEDITOR.env.ie && (c.document.$.title = this._.docTitle);
        CKEDITOR.tools.setTimeout(function() {
          "unloaded" == this.status &&
            (this.status = "ready");
          c.fire("contentDom");
          this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1);
          setTimeout(function() {
            c.fire("dataReady")
          }, 0)
        }, 0, this)
      }

      function e(a) {
        function b() {
          var d;
          a.editable().attachListener(a, "selectionChange", function() {
            var b = a.getSelection().getSelectedElement();
            b && (d && (d.detachEvent("onresizestart", c), d = null), b.$.attachEvent("onresizestart", c), d = b.$)
          })
        }

        function c(a) {
          a.returnValue = !1
        }
        if(CKEDITOR.env.gecko) try {
          var d = a.document.$;
          d.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
          d.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
        } catch(e) {} else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
      }

      function b() {
        var a = [];
        if(8 <= CKEDITOR.document.$.documentMode) {
          a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
          var b = [],
            c;
          for(c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]");
          a.push(b.join(",") + "{display:inline-block}")
        } else CKEDITOR.env.gecko &&
          (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
        a.push("html{cursor:text;*cursor:auto}");
        a.push("img,input,textarea{cursor:default}");
        return a.join("\n")
      }
      var c;
      CKEDITOR.plugins.add("wysiwygarea", {
        init: function(a) {
          a.config.fullPage && a.addFeature({
            allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
            requiredContent: "body"
          });
          a.addMode("wysiwyg", function(b) {
            function e(d) {
              d && d.removeListener();
              a.editable(new c(a, k.$.contentWindow.document.body));
              a.setData(a.getData(1), b)
            }
            var d = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
              d = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(d) + "}())" : "",
              k = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + d + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
            k.setStyles({
              width: "100%",
              height: "100%"
            });
            k.addClass("cke_wysiwyg_frame").addClass("cke_reset");
            d = a.ui.space("contents");
            d.append(k);
            var m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
            if(m) k.on("load", e);
            var g = a.title,
              n = a.fire("ariaEditorHelpLabel", {}).label;
            g && (CKEDITOR.env.ie && n && (g += ", " + n), k.setAttribute("title", g));
            if(n) {
              var g = CKEDITOR.tools.getNextId(),
                p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e");
              d.append(p, 1);
              k.setAttribute("aria-describedby", g)
            }
            a.on("beforeModeUnload", function(a) {
              a.removeListener();
              p && p.remove()
            });
            k.setAttributes({
              tabIndex: a.tabIndex,
              allowTransparency: "true"
            });
            !m && e();
            a.fire("ariaWidget", k)
          })
        }
      });
      CKEDITOR.editor.prototype.addContentsCss = function(a) {
        var b = this.config,
          c = b.contentsCss;
        CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []);
        b.contentsCss.push(a)
      };
      c = CKEDITOR.tools.createClass({
        $: function() {
          this.base.apply(this, arguments);
          this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(b) {
            CKEDITOR.tools.setTimeout(a, 0, this, b)
          }, this);
          this._.docTitle = this.getWindow().getFrame().getAttribute("title")
        },
        base: CKEDITOR.editable,
        proto: {
          setData: function(a, c) {
            var e = this.editor;
            if(c) this.setHtml(a), this.fixInitialSelection(), e.fire("dataReady");
            else {
              this._.isLoadingData = !0;
              e._.dataStore = {
                id: 1
              };
              var d = e.config,
                k = d.fullPage,
                m = d.docType,
                g = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
                k || (g += CKEDITOR.tools.buildStyleHtml(e.config.contentsCss));
                /* zxt - 20171031 */
                if(e.config.fullPageContentsCss)
                g += CKEDITOR.tools.buildStyleHtml(e.config.fullPageContentsCss);
              var n = d.baseHref ? '\x3cbase href\x3d"' + d.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
              k && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                e.docType =
                m = a;
                return ""
              }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                e.xmlDeclaration = a;
                return ""
              }).replace(/<link\s[^>]+\s\/>/g, function(a) {
                /* zxt - 20171031 */
                return ""
              }));
              a = e.dataProcessor.toHtml(a);
              k ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a =
                m + a) : a = d.docType + '\x3chtml dir\x3d"' + d.contentsLangDirection + '" lang\x3d"' + (d.contentsLanguage || e.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (d.bodyId ? ' id\x3d"' + d.bodyId + '"' : "") + (d.bodyClass ? ' class\x3d"' + d.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
              CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
              d = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
              CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (d += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
              n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (d += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
              a = a.replace(/(?=\s*<\/(:?head)>)/, d);
              this.clearCustomData();
              this.clearListeners();
              e.fire("contentDomUnload");
              var p = this.getDocument();
              try {
                p.write(a)
              } catch(t) {
                setTimeout(function() {
                  p.write(a)
                }, 0)
              }
            }
          },
          getData: function(a) {
            if(a) return this.getHtml();
            a = this.editor;
            var b = a.config,
              c = b.fullPage,
              d = c && a.docType,
              e = c && a.xmlDeclaration,
              m = this.getDocument(),
              c = c ? m.getDocumentElement().getOuterHtml() : m.getBody().getHtml();
            CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
            c = a.dataProcessor.toDataFormat(c);
            e && (c = e + "\n" + c);
            d && (c = d + "\n" + c);
            return c
          },
          focus: function() {
            this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this)
          },
          detach: function() {
            var a = this.editor,
              b = a.document,
              e;
            try {
              e = a.window.getFrame()
            } catch(d) {}
            c.baseProto.detach.call(this);
            this.clearCustomData();
            b.getDocumentElement().clearCustomData();
            CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
            e && e.getParent() ? (e.clearCustomData(), (a = e.removeCustomData("onResize")) && a.removeListener(), e.remove()) : CKEDITOR.warn("editor-destroy-iframe")
          }
        }
      })
    }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,wsc,wysiwygarea",
    CKEDITOR.config.skin = "moono-lisa",
    function() {
      var a = function(a, b) {
        var c = CKEDITOR.getUrl("plugins/" + b);
        a = a.split(",");
        for(var f = 0; f < a.length; f++) CKEDITOR.skin.icons[a[f]] = {
          path: c,
          offset: -a[++f],
          bgsize: a[++f]
        }
      };
      CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,copyformatting,432,,creatediv,456,,find-rtl,480,,find,504,,replace,528,,flash,552,,button,576,,checkbox,600,,form,624,,hiddenfield,648,,imagebutton,672,,radio,696,,select-rtl,720,,select,744,,textarea-rtl,768,,textarea,792,,textfield-rtl,816,,textfield,840,,horizontalrule,864,,iframe,888,,image,912,,indent-rtl,936,,indent,960,,outdent-rtl,984,,outdent,1008,,justifyblock,1032,,justifycenter,1056,,justifyleft,1080,,justifyright,1104,,language,1128,,anchor-rtl,1152,,anchor,1176,,link,1200,,unlink,1224,,bulletedlist-rtl,1248,,bulletedlist,1272,,numberedlist-rtl,1296,,numberedlist,1320,,maximize,1344,,newpage-rtl,1368,,newpage,1392,,pagebreak-rtl,1416,,pagebreak,1440,,pastefromword-rtl,1464,,pastefromword,1488,,pastetext-rtl,1512,,pastetext,1536,,preview-rtl,1560,,preview,1584,,print,1608,,removeformat,1632,,save,1656,,scayt,1680,,selectall,1704,,showblocks-rtl,1728,,showblocks,1752,,smiley,1776,,source-rtl,1800,,source,1824,,specialchar,1848,,table,1872,,templates-rtl,1896,,templates,1920,,redo-rtl,1944,,redo,1968,,undo-rtl,1992,,undo,2016,,spellchecker,2040,",
        "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,copyformatting,432,auto,creatediv,456,auto,find-rtl,480,auto,find,504,auto,replace,528,auto,flash,552,auto,button,576,auto,checkbox,600,auto,form,624,auto,hiddenfield,648,auto,imagebutton,672,auto,radio,696,auto,select-rtl,720,auto,select,744,auto,textarea-rtl,768,auto,textarea,792,auto,textfield-rtl,816,auto,textfield,840,auto,horizontalrule,864,auto,iframe,888,auto,image,912,auto,indent-rtl,936,auto,indent,960,auto,outdent-rtl,984,auto,outdent,1008,auto,justifyblock,1032,auto,justifycenter,1056,auto,justifyleft,1080,auto,justifyright,1104,auto,language,1128,auto,anchor-rtl,1152,auto,anchor,1176,auto,link,1200,auto,unlink,1224,auto,bulletedlist-rtl,1248,auto,bulletedlist,1272,auto,numberedlist-rtl,1296,auto,numberedlist,1320,auto,maximize,1344,auto,newpage-rtl,1368,auto,newpage,1392,auto,pagebreak-rtl,1416,auto,pagebreak,1440,auto,pastefromword-rtl,1464,auto,pastefromword,1488,auto,pastetext-rtl,1512,auto,pastetext,1536,auto,preview-rtl,1560,auto,preview,1584,auto,print,1608,auto,removeformat,1632,auto,save,1656,auto,scayt,1680,auto,selectall,1704,auto,showblocks-rtl,1728,auto,showblocks,1752,auto,smiley,1776,auto,source-rtl,1800,auto,source,1824,auto,specialchar,1848,auto,table,1872,auto,templates-rtl,1896,auto,templates,1920,auto,redo-rtl,1944,auto,redo,1968,auto,undo-rtl,1992,auto,undo,2016,auto,spellchecker,2040,auto",
        "icons.png")
    }())
})();