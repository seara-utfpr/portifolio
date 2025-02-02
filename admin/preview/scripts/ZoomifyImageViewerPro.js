/*
 Zoomify Image Viewer, version on line 25 below. Copyright Zoomify, Inc., 1999-2016. All rights reserved. You may
use this file on private and public websites, for personal and commercial purposes, with or without modifications, so long as this
notice is included. Redistribution via other means is not permitted without prior permission. Additional terms apply. For complete
license terms please see the Zoomify License Agreement in this product and on the Zoomify website at www.zoomify.com.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
(function () {
    (function () {
        return this;
    }.call().Z = {});
})();
Z.version = "4.01 Pro";
Z.setCallback = function (a, b) {
    "undefined" === typeof Z.callbacks && (Z.callbacks = []);
    var c = Z.Utils.arrayIndexOfObjectTwoValues(Z.callbacks, "callbackEvent", a, null, "callbackFunction", b);
    -1 == c && (c = Z.callbacks.length);
    Z.callbacks[c] = { callbackEvent: a, callbackFunction: b };
};
Z.showImage = function (a, b, c) {
    if (Z.showImage.done)
        Z.Utils.declareGlobals(),
            (Z.pageContainerID = a),
            "undefined" !== typeof b && Z.Utils.stringValidate(b) ? (Z.imagePath = Z.Utils.stringRemoveTrailingSlashCharacters(b)) : (Z.imagePath = null),
            "undefined" !== typeof c && (Z.parameters = Z.Utils.parseParameters(c)),
            Z.initialize();
    else {
        Z.showImage.done = !0;
        Z.Utils.addCrossBrowserMethods();
        Z.Utils.addCrossBrowserEvents();
        Z.Utils.declareGlobals();
        Z.pageContainerID = a;
        Z.setEditPermissionFunction = function (a) {
            Z.externalEditPermissionFunction = a;
        };
        Z.clearCallback = function (a, b) {
            var c = Z.Utils.arrayIndexOfObjectTwoValues(Z.callbacks, "callbackEvent", a, null, "callbackFunction", b);
            -1 != c && (Z.callbacks = Z.Utils.arraySplice(Z.callbacks, c, 1));
        };
        a = "undefined" !== typeof b && Z.Utils.stringValidate(b);
        var d = "undefined" !== typeof c && (("string" === typeof c && -1 != c.indexOf("zIIIFServer")) || ("object" === typeof c && "undefined" !== typeof c.zIIIFServer));
        a && -1 != b.indexOf("zXMLParametersPath")
            ? ((b = b.substring(19, b.length)), (Z.xmlParametersPath = Z.Utils.stringRemoveTrailingSlashCharacters(b)))
            : (Z.imagePath = d ? "IIIFImageServer" : a ? Z.Utils.stringRemoveTrailingSlashCharacters(b) : null);
        "undefined" !== typeof c && ("string" === typeof c && ((c = unescape(c)), (c = Z.Utils.stringUnescapeAmpersandCharacters(c))), (Z.parameters = Z.Utils.parseParameters(c)));
        "complete" != document.readyState ? (Z.Utils.addEventListener(document, "DOMContentLoaded", Z.initialize), Z.Utils.addEventListener(window, "load", Z.initialize)) : Z.initialize();
    }
};
Z.initialize = function () {
    Z.Utils.removeEventListener(document, "DOMContentLoaded", Z.initialize);
    Z.Utils.removeEventListener(window, "load", Z.initialize);
    Z.Utils.detectBrowserFeatures();
    Z.xmlParametersPath && !Z.parameters
        ? Z.loadParametersXML()
        : null !== Z.parameters && "undefined" !== typeof Z.parameters.zXMLParametersPath
        ? Z.Utils.setParameters(Z.parameters)
        : (Z.Utils.setParameters(Z.parameters),
          (Z.Viewer = new Z.ZoomifyImageViewer()),
          Z.Utils.stringValidate(Z.copyrightPath) ? Z.Utils.enforceCopyright() : Z.Viewer.configureViewer(),
          (1 != Z.debug && 2 != Z.debug && 3 != Z.debug) || Z.Utils.trace(Z.Utils.getResource("z445"), !1, !0));
};
Z.loadParametersXML = function () {
    Z.xmlParametersParsing = !0;
    var a = new Z.NetConnector(),
        b = Z.Utils.cacheProofPath(Z.xmlParametersPath);
    a.loadXML(b);
};
Z.ZoomifyImageViewer = function () {
    function a() {
        Z.Utils.showMessage(Z.Utils.getResource("z291") + this.url, !0);
    }
    function b(a) {
        (a = Z.Utils.event(a)) &&
            y &&
            (Z.Utils.removeEventListener(y, "mousedown", b),
            Z.Utils.addEventListener(Z.ViewerDisplay, "mousemove", c),
            Z.Utils.addEventListener(Z.ViewerDisplay, "mouseup", d),
            (a = Z.Utils.getMousePosition(a)),
            (dragPtStart = new Z.Utils.Point(a.x, a.y)),
            new Z.Utils.Point(parseFloat(y.style.left), parseFloat(y.style.top)),
            (y.mouseXPrior = dragPtStart.x),
            (y.mouseYPrior = dragPtStart.y));
    }
    function c(a) {
        if ((a = Z.Utils.event(a)) && y) {
            a = Z.Utils.getMousePosition(a);
            dragPtCurrent = new Z.Utils.Point(a.x, a.y);
            var b = dragPtCurrent.x - y.mouseXPrior,
                c = dragPtCurrent.y - y.mouseYPrior;
            y.mouseXPrior = dragPtCurrent.x;
            y.mouseYPrior = dragPtCurrent.y;
            a = y.style;
            b = parseFloat(a.left) + b;
            c = parseFloat(a.top) + c;
            a.left = b + "px";
            a.top = c + "px";
        }
    }
    function d(a) {
        if ((a = Z.Utils.event(a)) && y) {
            a = Z.Utils.getMousePosition(a);
            a = Z.mouseOutDownPoint ? Z.mouseOutDownPoint : new Z.Utils.Point(a.x, a.y);
            Z.Utils.removeEventListener(Z.ViewerDisplay, "mousemove", c);
            Z.Utils.removeEventListener(Z.ViewerDisplay, "mouseup", d);
            Z.Utils.addEventListener(y, "mousedown", b);
            var e = a.x - y.mouseXPrior,
                g = a.y - y.mouseYPrior;
            a = y.style;
            e = parseFloat(a.left) + e;
            g = parseFloat(a.top) + g;
            a.left = e + "px";
            a.top = g + "px";
        }
    }
    function e(a) {
        if ((a = Z.Utils.event(a)))
            if ((a.preventDefault(), Z.interactive && y && (a = Z.Utils.getFirstTouch(a)))) (a = new Z.Utils.Point(a.pageX, a.pageY)), (dragPtStart = new Z.Utils.Point(a.x, a.y)), (y.mouseXPrior = a.x), (y.mouseYPrior = a.y);
    }
    function g(a) {
        if ((a = Z.Utils.event(a))) {
            a.preventDefault();
            if (!Z.interactive || !Z.mousePan) return;
            if (y && (a = Z.Utils.getFirstTouch(a))) {
                a = new Z.Utils.Point(a.pageX, a.pageY);
                var b = y.style,
                    c = parseFloat(b.left),
                    d = parseFloat(b.top);
                b.left = c + (a.x - y.mouseXPrior) + "px";
                b.top = d + (a.y - y.mouseYPrior) + "px";
                y.mouseXPrior = a.x;
                y.mouseYPrior = a.y;
            }
        }
        return !1;
    }
    function k(a) {
        if ((a = Z.Utils.event(a)))
            if ((a.preventDefault(), Z.interactive && y && (a = Z.Utils.getFirstTouch(a)))) {
                a = new Z.Utils.Point(a.pageX, a.pageY);
                a = new Z.Utils.Point(a.x, a.y);
                var b = a.x - y.mouseXPrior,
                    c = a.y - y.mouseYPrior;
                a = y.style;
                b = parseFloat(a.left) + b;
                c = parseFloat(a.top) + c;
                a.left = b + "px";
                a.top = c + "px";
            }
    }
    function q(a) {
        if ((a = Z.Utils.event(a)))
            if ((a.preventDefault(), Z.interactive && y && (a = Z.Utils.getFirstTouch(a)))) {
                a = new Z.Utils.Point(a.pageX, a.pageY);
                a = new Z.Utils.Point(a.x, a.y);
                var b = a.x - y.mouseXPrior,
                    c = a.y - y.mouseYPrior;
                a = y.style;
                b = parseFloat(a.left) + b;
                c = parseFloat(a.top) + c;
                a.left = b + "px";
                a.top = c + "px";
            }
    }
    function t(a) {
        function b() {
            Z.clearCallback("readyViewer", b);
            Z.viewportCurrent = Z.Viewport0;
            Z.overlays && (Z.imageSetStart = Z.imageSetLength - 1);
            N.viewportSelect(Z.imageSetStart);
        }
        Z.imagePath = "multiple";
        Z.tileSourceMultiple && Z.Utils.validateImagePath(a[0].media);
        Z.setCallback("readyViewer", b);
        for (var c = 0, d = a.length; c < d; c++) {
            Z["Viewport" + c.toString()] = new Z.ZoomifyViewport(
                c,
                a[c].media,
                Z.annotationFileShared ? Z.imageSetAnnotationPath : a[c].annotationPath,
                Z.hotspotFileShared ? Z.imageSetHotspotPath : a[c].hotspotPath,
                Z.trackingFileShared ? Z.imageSetTrackingPath : a[c].trackingPath,
                Z.imageListFileShared ? Z.imageSetImageListPath : a[c].imageListPath
            );
            var e = c == Z.imageSetStart;
            e && ((Z.viewportCurrent = Z["Viewport" + c.toString()]), N.viewportSelect(Z.imageSetStart));
            Z["Viewport" + c.toString()].setVisibility(e || Z.comparison || Z.overlays);
        }
    }
    function J(a, b) {
        if ("undefined" === typeof b || null === b) b = "0";
        var c = document.getElementById("HotspotList" + b);
        c && (c.style.visibility = a ? "visible" : "hidden");
    }
    function F(a, b) {
        this.id = a.getAttribute("ID");
        this.name = a.getAttribute("NAME");
        this.internalID = b;
        this.media = a.getAttribute("MEDIA");
        this.imageListPath = a.getAttribute("IMAGELIST");
        this.hotspotPath = a.getAttribute("HOTSPOTPATH");
        this.annotationPath = a.getAttribute("ANNOTATIONPATH");
        this.trackingPath = a.getAttribute("TRACKINGPATH");
        this.initialX = a.getAttribute("INITIALX");
        this.initialY = a.getAttribute("INITIALY");
        this.initialZoom = a.getAttribute("INITIALZOOM");
        this.minZoom = a.getAttribute("MINZOOM");
        this.maxZoom = a.getAttribute("MAXZOOM");
    }
    function Q(a, b, c, d) {
        switch (a) {
            case "0":
                d = a = -1e3;
                break;
            case "1":
                d = a = 15;
                break;
            case "2":
                a = c - b - 15 + 2;
                d = 10;
                break;
            case "3":
                a = c - b - 15;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 30 : d - 22.5;
                break;
            case "4":
                a = 15;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 30 : d - 22.5;
                break;
            default:
                (a = c - b), (d = 15);
        }
        return new Z.Utils.Point(a, d);
    }
    function W(a) {
        if ((a = Z.Utils.event(a)))
            if (((a = Z.Utils.target(a)), "null" != a.options[a.selectedIndex].value)) {
                var b = Z.Utils.stringValidate(Z.imageSetListTitle) && "none" != Z.imageSetListTitle ? 1 : 0;
                N.viewportSelect(a.selectedIndex - b);
            }
    }
    function O() {
        document.getElementsByTagName("body") ? (document.getElementsByTagName("body")[0].onorientationchange = ea) : window.setTimeout(O, 100);
    }
    function ea(a) {
        Z.interactive &&
            Z.fullView &&
            (Z.Toolbar && (Z.toolbarAutoShowHide && Z.Toolbar.show(!1), !Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!1)),
            Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!1)),
            Z.Gallery && Z.galleryAutoShowHide && Z.Gallery.setVisibility(!1),
            Z.Viewport && (Z.Viewport.toggleFullViewMode(!1), Z.Viewport.toggleFullViewMode(!0)),
            Z.Gallery && Z.galleryAutoShowHide && Z.Gallery.setVisibility(!0),
            Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!0), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!0)),
            Z.Toolbar && (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!0), Z.toolbarAutoShowHide && Z.Toolbar.show(!0)));
    }
    function v(a) {
        if (Z.interactive && Z.keys && "INPUT" != document.activeElement.tagName && "TEXTAREA" != document.activeElement.tagName) {
            a = Z.Utils.event(a);
            var b = a.altKey;
            18 == a.keyCode || a.altKey || (Z.viewportCurrent.zoomAndPanAllStop(!0, !0), Z.maskingSelection && Z.viewportCurrent.clearLabelMask());
            if (a) {
                var c = a.type,
                    d = a.keyCode;
                if ("keydown" == c) {
                    Z.keyIsDown = !0;
                    switch (d) {
                        case 90:
                            Z.viewportCurrent.zoom("out");
                            break;
                        case 17:
                            Z.viewportCurrent.zoom("out");
                            break;
                        case 65:
                            Z.viewportCurrent.zoom("in");
                            break;
                        case 16:
                            Z.viewportCurrent.zoom("in");
                            break;
                        case 37:
                            (!Z.tracking && !Z.animation) || Z.viewportCurrent.getZoom() != Z.minZ ? Z.viewportCurrent.pan("left") : Z.imageSet && N.viewportPrior();
                            break;
                        case 38:
                            (!Z.tracking && !Z.animation) || Z.viewportCurrent.getZoom() != Z.minZ ? Z.viewportCurrent.pan("up") : Z.imageSet && N.viewportNext();
                            break;
                        case 40:
                            (!Z.tracking && !Z.animation) || Z.viewportCurrent.getZoom() != Z.minZ ? Z.viewportCurrent.pan("down") : Z.imageSet && N.viewportPrior();
                            break;
                        case 39:
                            (!Z.tracking && !Z.animation) || Z.viewportCurrent.getZoom() != Z.minZ ? Z.viewportCurrent.pan("right") : Z.imageSet && N.viewportNext();
                            break;
                        case 27:
                            Z.fullView ? Z.viewportCurrent.toggleFullViewMode(!1) : Z.viewportCurrent.reset();
                            break;
                        case 190:
                            Z.rotationVisible && Z.viewportCurrent.rotate("clockwise", b);
                            break;
                        case 188:
                            Z.rotationVisible && Z.viewportCurrent.rotate("counterwise", b);
                            break;
                        case 33:
                            Z.imageSet && !Z.overlays && N.viewportNext();
                            break;
                        case 34:
                            Z.imageSet && !Z.overlays && N.viewportPrior();
                    }
                    !Z.imageSet || (33 != d && 34 != d) || (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
                } else
                    "keyup" == c &&
                        (((Z.keyIsDown = !1), 90 == d || 17 == d || 65 == d || 16 == d)
                            ? Z.viewportCurrent.zoom("stop")
                            : 37 == d || 39 == d || 38 == d || 40 == d
                            ? Z.tracking
                                ? 37 == d
                                    ? Z.viewportCurrent.goToNextCell("left")
                                    : 39 == d
                                    ? Z.viewportCurrent.goToNextCell("right")
                                    : 38 == d
                                    ? Z.viewportCurrent.goToNextCell("up")
                                    : 40 == d && Z.viewportCurrent.goToNextCell("down")
                                : 37 == d || 39 == d
                                ? Z.viewportCurrent.pan("horizontalStop")
                                : (38 != d && 40 != d) || Z.viewportCurrent.pan("verticalStop")
                            : !Z.rotationVisible || (190 != d && 188 != d)
                            ? !Z.imageSet || (33 != d && 34 != d) || (Z.imageSet && Z.viewportCurrent.updateView(!0), a.preventDefault ? a.preventDefault() : (a.returnValue = !1))
                            : Z.viewportCurrent.rotate("stop"));
            }
        }
    }
    function u(a) {
        a = Z.Utils.event(a);
        var b = a.type;
        if (a && b) {
            var c = Z.Utils.isRightMouseButton(a),
                d = a.altKey;
            if (!(("mouseover" != b && "mouseout" != b && !Z.interactive) || ("mousedown" == b && (!Z.interactive || (Z.coordinatesVisible && d))) || c)) {
                Z.touchSupport && !Z.clickZoomAndPanBlock && "touchmove" != b && "gesturechange" != b && a.preventDefault();
                switch (b) {
                    case "mouseover":
                        Z.fullView || "TEXTAREA" == document.activeElement.tagName || Z.Viewer.initializeViewerKeyDefaultListeners(!0);
                        break;
                    case "mouseout":
                        Z.tracking || Z.Viewer.initializeViewerKeyDefaultListeners(!1);
                }
                var e;
                e = Z.Utils.event(a);
                var g = e.type;
                if (e && g) {
                    var k;
                    a = Z.Utils.target(e);
                    c = Z.Utils.relatedTarget(e);
                    "resize" != g && (k = Z.Utils.getMousePosition(e));
                    d = e.altKey;
                    "DOMMouseScroll" == g && (g = "mousewheel");
                    switch (g) {
                        case "mouseover":
                            d = Z.Utils.nodeIsInViewer(a);
                            e = Z.Utils.nodeIsInViewer(c);
                            (d && e) ||
                                (Z.viewportCurrent && Z.viewportCurrent.showLists(!0),
                                Z.ToolbarDisplay && Z.toolbarAutoShowHide && Z.Toolbar.show(!0),
                                Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!0), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!0)),
                                Z.Gallery && Z.galleryAutoShowHide && Z.Gallery.setVisibility(!0),
                                Z.Ruler && 1 < Z.rulerVisible && Z.Ruler.setVisibility(!0),
                                Z.Toolbar &&
                                    (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!0),
                                    !Z.tracking || (2 != Z.trackingPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityTrackingPanel(!0),
                                    (2 != Z.userPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityUserPanel(!0)),
                                (Z.mouseOutDownPoint = null));
                            break;
                        case "mouseout":
                            d = Z.Utils.nodeIsInViewer(a);
                            e = Z.Utils.nodeIsInViewer(c);
                            (d && e) ||
                                "[object HTMLSelectElement]" == a ||
                                "[object HTMLOptionElement]" == a ||
                                "[object HTMLSelectElement]" == c ||
                                "[object HTMLOptionElement]" == c ||
                                (Z.mouseIsDown
                                    ? (Z.mouseOutDownPoint = new Z.Utils.Point(k.x, k.y))
                                    : (Z.viewportCurrent && Z.viewportCurrent.showLists(!1),
                                      Z.ToolbarDisplay && Z.toolbarAutoShowHide && Z.Toolbar.show(!1),
                                      Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!1)),
                                      Z.Gallery && Z.galleryAutoShowHide && Z.Gallery.setVisibility(!1),
                                      Z.Ruler && 1 < Z.rulerVisible && Z.Ruler.setVisibility(!1),
                                      Z.Toolbar &&
                                          (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!1),
                                          !Z.tracking || (2 != Z.trackingPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityTrackingPanel(!1),
                                          (2 != Z.userPanelVisible && 3 != Z.userPanelVisible) || Z.Toolbar.setVisibilityUserPanel(!1))));
                            break;
                        case "resize":
                            Ca || (Ca = window.setTimeout(w, U));
                            break;
                        case "mousewheel":
                            0 < Z.mouseWheel && ((k = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail))), Z.viewportCurrent.mouseWheelHandler(k, d));
                    }
                }
                if ("mousedown" == b || "mousemove" == b) return !1;
            }
        }
    }
    function w() {
        Ca && (window.clearTimeout(Ca), (Ca = null), wa());
    }
    function wa() {
        if (!Z.fullScreenEntering) {
            var a = Z.Utils.getContainerSize(Z.pageContainer, Z.ViewerDisplay),
                b = Z.viewportCurrent.calculateZoomForResize(Z.viewportCurrent.getZoom(), Z.viewerW, Z.viewerH, a.x, a.y);
            N.resizeViewer(a.x, a.y, b);
            if (Z.comparison) (a = 0 == Z.viewportCurrent.getViewportID() ? Z.Viewport1 : Z.Viewport0) && a.syncViewportResize(Z.imageX, Z.imageY, Z.imageZ, Z.imageR);
            else if (Z.overlays) for (a = 0, b = Z.imageSetLength - 1; a < b; a++) Z["Viewport" + a.toString()].syncViewportResize(Z.imageX, Z.imageY, Z.imageZ, Z.imageR);
        }
    }
    var N = this,
        ka = [];
    Z.ViewerDisplay = Z.Utils.createContainerElement("div", "ViewerDisplay", "inline-block", "relative", "hidden", "100%", "100%", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", "pointer");
    Z.pageContainer = document.getElementById(Z.pageContainerID);
    Z.Utils.getElementStyle(Z.pageContainer);
    Z.ViewerDisplay.style["-webkit-touch-callout"] = "none";
    Z.ViewerDisplay.style["-moz-user-select"] = "none";
    Z.ViewerDisplay.style["-khtml-user-select"] = "none";
    Z.ViewerDisplay.style["-webkit-user-select"] = "none";
    Z.ViewerDisplay.style["-ms-user-select"] = "none";
    Z.ViewerDisplay.style["-o-user-select"] = "none";
    Z.ViewerDisplay.style["user-select"] = "none";
    var aa = Z.Utils.getContainerSize(Z.pageContainer, Z.ViewerDisplay);
    Z.viewerW = aa.x;
    Z.viewerH = aa.y;
    Z.pageContainer.innerHTML = "";
    Z.pageContainer.appendChild(Z.ViewerDisplay);
    Z.autoResize = Z.autoResize || Z.Utils.isElementFluid(Z.pageContainer);
    var U = parseInt(Z.Utils.getResource("DEFAULT_AUTORESIZESKIPDURATION"), 10),
        Ca;
    Z.mouseWheelCompleteDuration = parseInt(Z.Utils.getResource("z165"), 10);
    if (Z.virtualPointerVisible)
        var Ba = Z.Utils.getResource("z232"),
            y,
            ga;
    if (Z.imageSet)
        var ua = [],
            M = null,
            S = [];
    this.configureViewer = function () {
        if (!Z.Viewer.getStatus("configureCalled")) {
            var a = function () {
                    Z.clearCallback("readyViewer", a);
                    (Z.Utils.getMessage() != Z.Utils.getResource("ALERT_LOADINGIMAGESET") && Z.Utils.getMessage() != Z.Utils.getResource("ALERT_LOADINGANNOTATIONS")) || Z.Utils.hideMessage();
                    Z.imageSet && !Z.comparison && z619Delayed();
                    Z.tracking && Z.viewportCurrent.syncTrackingToViewport();
                },
                b = function () {
                    Z.clearCallback(c, b);
                    N.initializeViewerKeyEventListeners(!0);
                    Z.Utils.addEventListener(Z.ViewerDisplay, "mouseover", u);
                    Z.Utils.addEventListener(Z.ViewerDisplay, "mouseout", u);
                    Z.Utils.addEventListener(Z.ViewerDisplay, "mousemove", Z.Utils.preventDefault);
                    Z.Utils.addEventListener(Z.ViewerDisplay, "mousewheel", u);
                    Z.Utils.addEventListener(Z.ViewerDisplay, "mousewheel", Z.Utils.preventDefault);
                    O();
                    Z.autoResize && Z.Utils.addEventListener(window, "resize", Z.Viewer.viewerEventsHandler);
                    Z.tracking && Z.Viewer.initializeViewerKeyDefaultListeners(!0);
                    var a = Z["Viewport" + (Z.imageSetLength - 1).toString()];
                    N.configureComponents(Z.overlays ? a : Z.viewportCurrent);
                };
            Z.Viewer.setStatus("configureCalled", !0);
            var c = Z.imageSet ? "initializedViewer" : "initializedViewport";
            Z.setCallback(c, b);
            Z.setCallback("readyViewer", a);
            if (Z.imageSet)
                if ((Z.Utils.showMessage(Z.Utils.getResource("ALERT_LOADINGIMAGESET"), !1, null, "center"), "undefined" !== typeof Z.overlayJSONObject && "object" === typeof Z.overlayJSONObject && null !== Z.overlayJSONObject)) {
                    var d = Z.Utils.jsonConvertObjectToXMLText(Z.overlayJSONObject),
                        d = Z.Utils.xmlConvertTextToDoc(d);
                    N.parseImageSetXML(d, "overlay");
                } else {
                    var e = new Z.NetConnector();
                    ".xml" != Z.imageSetPath.toLowerCase().substring(Z.imageSetPath.length - 4, Z.imageSetPath.length) && (Z.imageSetPath = Z.imageSetPath + "/" + Z.Utils.getResource("DEFAULT_IMAGESETXMLFILE"));
                    d = Z.Utils.cacheProofPath(Z.imageSetPath);
                    e.loadXML(d);
                }
            else (Z.Viewport = new Z.ZoomifyViewport()), (Z.viewportCurrent = Z.Viewport);
        }
    };
    this.configureComponents = function (a) {
        0 < Z.toolbarVisible && !Z.Toolbar && (Z.Toolbar = new Z.ZoomifyToolbar(a));
        0 < Z.navigatorVisible &&
            (Z.Navigator || ((Z.Navigator = new Z.ZoomifyNavigator(a)), Z.Navigator && Z.Navigator.z682()), Z.comparison && !Z.Navigator2 && ((Z.Navigator2 = new Z.ZoomifyNavigator(Z.Viewport1)), Z.Navigator2 && Z.Navigator2.z682()));
        0 < Z.galleryVisible && !Z.Gallery && ((Z.Gallery = new Z.ZoomifyGallery(a)), Z.Gallery && Z.Gallery.validateGalleryGlobals());
        0 < Z.rulerVisible && !Z.Ruler && (Z.Ruler = new Z.ZoomifyRuler(a));
        Z.helpCustom && new Z.NetConnector().loadHTML(Z.helpPath, N.receiveHelpHTML, null, "loadHTML");
    };
    this.receiveHelpHTML = function (a) {
        4 == a.readyState && 200 == a.status && Z.Utils.stringValidate(a.responseText) && (Z.helpContent = a.responseText);
    };
    this.getVersion = function () {
        return Z.version;
    };
    this.setSizeAndPosition = function (a, b, c, d, e) {
        Z.viewerW = a;
        Z.viewerH = b;
        Z.ViewerDisplay.style.width = a + "px";
        Z.ViewerDisplay.style.height = b + "px";
        Z.Viewport && Z.Viewport.getStatus("initializedViewport") && Z.Viewport.setSizeAndPosition(a, b, c, d);
        var g = 1 == Z.toolbarPosition ? b - Z.toolbarH : 0;
        Z.ToolbarDisplay && Z.Toolbar.getInitialized() && (Z.Toolbar.setSizeAndPosition(a, null, null, g), 0 != Z.toolbarVisible && 8 != Z.toolbarVisible && Z.Toolbar.show(!0));
        Z.Navigator &&
            Z.Navigator.getInitialized() &&
            (Z.Navigator.setSizeAndPosition(null, null, 0 == Z.navigatorL ? c : Z.navigatorL + Z.navigatorW > a ? a - Z.navigatorW : Z.navigatorL, 0 != Z.navigatorT ? Z.navigatorT : d, Z.navigatorFit),
            1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!0), Z.comparison && Z.Navigator2 && (Z.Navigator2.setSizeAndPosition(null, null, a - Z.navigatorW, d, Z.navigatorFit), Z.Navigator2.setVisibility(!0))));
        Z.imageList && Z.Viewport.getStatus("initializedImageList") && Z.Viewport.setSizeAndPositionImageList();
        Z.slideList && "undefined" !== typeof slideList && null !== slideList && ((g = Z.Viewport.calculateSlideListCoords(Z.viewerW, Z.viewerH)), (slideList.style.left = g.x + "px"), (slideList.style.top = g.y + "px"));
        Z.Gallery && Z.Gallery.getInitialized() && (Z.Gallery.setSizeAndPosition(a, b, c, d), Z.galleryAutoShowHide && Z.Gallery.setVisibility(!0));
        e && Z.Viewport.updateView(!0);
    };
    this.getImagePath = function () {
        return N.getImage();
    };
    this.getImage = function () {
        return Z.imagePath;
    };
    this.setImagePath = function (a, b) {
        "undefined" !== typeof b && Z.Utils.stringValidate(b) && (Z.imageProperties = b);
        N.setImage(a);
    };
    this.setImage = function (a, b, c, d) {
        if (Z.Viewport && (Z.Viewport.getStatus("initializedViewport") || c)) {
            Z.Viewport.zoomAndPanAllStop(!0);
            Z.maskingSelection && N.clearLabelMask();
            Z.overlays || Z.Utils.clearImageParameters();
            Z.imagePath = Z.Utils.stringRemoveTrailingSlashCharacters(a);
            Z.Utils.validateImagePath();
            var e;
            e = "undefined" === typeof d || null === d || 0 == d ? Z.Viewport : Z["Viewport" + d.toString()];
            e.setImagePath(Z.imagePath);
            "undefined" !== typeof b && null !== b && (Z.parameters = Z.Utils.parseParameters(b));
            c && Z.Utils.setParameters(Z.parameters);
            "unconverted" == Z.tileSource ? e.loadUnconvertedImage(a) : Z.imageProperties ? ((d = Z.Utils.xmlConvertTextToDoc(Z.imageProperties)), e.z602(d)) : ((a = new Z.NetConnector()), e.loadImageProperties(Z.imagePath, a, d));
        }
    };
    this.setImageWithFade = function (a, b, c, d) {
        if (Z.Viewport && (Z.Viewport.getStatus("initializedViewport") || c)) {
            if ("undefined" === typeof d || null === d) d = 50;
            Z.slideTransitionTimeout = window.setTimeout(function () {
                Z.Viewport.slideTransitionTimeoutHandler("out", a, b, c);
            }, 1);
        }
    };
    this.setTourPath = function (a, b) {
        Z.Viewport && Z.Viewport.getStatus("initializedViewport") && Z.Viewport.setHotspotPath(a, b);
    };
    this.setHotspotPath = function (a, b) {
        Z.Viewport && Z.Viewport.getStatus("initializedViewport") && Z.Viewport.setHotspotPath(a, b);
    };
    this.getStatus = function (a) {
        a = Z.Utils.arrayIndexOfObjectValue(ka, "state", a);
        return -1 == a ? !1 : ka[a].status;
    };
    this.setStatus = function (a, b) {
        var c = !1,
            d = Z.Utils.arrayIndexOfObjectValue(ka, "state", a);
        -1 == d ? ((c = b), (ka[ka.length] = { state: a, status: b })) : (!ka[d].status && b && (c = !0), (ka[d].status = b));
        c && (Z.Utils.validateCallback(a), N.validateViewerReady(a));
    };
    this.validateViewerStatus = function (a) {
        var b = !0;
        if (Z.imageSet)
            for (var c = 0, d = Z.imageSetLength; c < d; c++)
                if (!Z["Viewport" + c.toString()].getStatus(a)) {
                    b = !1;
                    break;
                }
        b && ((b = a.indexOf("Viewport")), -1 != b && (a = a.substring(0, b)), N.setStatus(a + "Viewer", !0));
    };
    this.validateViewerReady = function (a) {
        a =
            Z.Viewport &&
            Z.Viewport &&
            Z.Viewport.getStatus("initializedViewport") &&
            ("unconverted" == Z.tileSource || (Z.Viewport.getStatus("precacheLoadedViewport") && Z.Viewport.getStatus("backfillLoadedViewport") && Z.Viewport.getStatus("backfillDrawnViewport"))) &&
            Z.Viewport.getStatus("displayLoadedViewport") &&
            Z.Viewport.getStatus("displayDrawnViewport");
        var b = !Z.hotspots || (Z.Viewport && Z.Viewport.getStatus("hotspotsLoadedViewport")),
            c = !Z.annotations || (Z.Viewport && Z.Viewport.getStatus("annotationsLoadedViewport") && (!Z.annotationPanelVisible || Z.Viewport.getStatus("annotationPanelInitializedViewport"))),
            d = 0 == Z.ToolbarVisible || (Z.Toolbar && Z.Toolbar.getInitialized()),
            e = !Z.NavigatorVisible || (Z.Navigator && Z.Navigator.getInitialized()),
            g = !Z.GalleryVisible || (Z.Gallery && Z.Gallery.getInitialized()),
            k = !Z.RulerVisible || (Z.Ruler && Z.Ruler.getInitialized()),
            u =
                !Z.imageSet ||
                (Z.Viewer &&
                    Z.Viewer.getStatus("initializedViewer") &&
                    ("unconverted" == Z.tileSource || (Z.Viewer.getStatus("precacheLoadedViewer") && Z.Viewer.getStatus("backfillLoadedViewer") && Z.Viewer.getStatus("backfillDrawnViewer"))) &&
                    Z.Viewer.getStatus("displayLoadedViewer") &&
                    Z.Viewer.getStatus("displayDrawnViewer")),
            v = !Z.imageSet || !Z.hotspots || (Z.Viewer && Z.Viewer.getStatus("hotspotsLoadedViewer")),
            w = !Z.imageSet || !Z.annotations || (Z.Viewer && Z.Viewer.getStatus("annotationsLoadedViewer") && (!Z.annotationPanelVisible || Z.Viewer.getStatus("annotationPanelInitializedViewer")));
        (a = a && b && c && d && e && g && k && u && v && w) && Z.Viewer.setStatus("readyViewer", !0);
        return a;
    };
    this.createVirtualPointer = function () {
        if (ga) {
            var c = ga.width,
                d = ga.height,
                u = Z.viewerW / 2 + 100,
                v = Z.viewerH - 200,
                w = ga.cloneNode(!1);
            w.width = c;
            w.height = d;
            y = Z.Utils.createContainerElement("div", "piC", "inline-block", "absolute", "hidden", c + "px", d + "px", u + "px", v + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
            y.appendChild(w);
            Z.ViewerDisplay.appendChild(y);
            y.setAttribute("title", Z.Utils.getResource("z398"));
            y.style.zIndex = (Z.baseZIndex + 32).toString();
            Z.Utils.addEventListener(y, "mousedown", b);
            Z.Utils.addEventListener(y, "touchstart", e);
            Z.Utils.addEventListener(y, "touchmove", g);
            Z.Utils.addEventListener(y, "touchend", k);
            Z.Utils.addEventListener(y, "touchcancel", q);
            Z.Utils.addEventListener(w, "contextmenu", Z.Utils.preventDefault);
            Z.Utils.addEventListener(w, "mousedown", Z.Utils.preventDefault);
        } else (ga = new Image()), (ga.url = Ba), (ga.onload = N.createVirtualPointer), (ga.onerror = a), (ga.src = Ba);
    };
    this.setVirtualPointerVisibility = function (a) {
        y && (y.style.display = a ? "inline-block" : "none");
    };
    this.setVirtualPointerSizeAndPosition = function (a, b, c, d, e) {
        if (y) {
            if ("undefined" === typeof a || null === a) a = ga.width;
            if ("undefined" === typeof b || null === b) b = ga.height;
            ("undefined" !== typeof c && null !== c && !isNaN(c)) || ("undefined" !== typeof y.style.left && null !== y.style.left) || (c = Z.viewerW / 2 + 100);
            ("undefined" !== typeof d && null !== d && !isNaN(d)) || ("undefined" !== typeof y.style.top && null !== y.style.top) || (d = Z.viewerH - 200);
            "undefined" !== typeof e && null !== e && ((d = Z.Viewport.z478(c, d)), (c = d.x), (d = d.y));
            y.style.width = a + "px";
            y.style.height = b + "px";
            y.firstChild.width = a;
            y.firstChild.height = b;
            y.style.left = c + "px";
            y.style.top = d + "px";
        }
    };
    this.prez581s = function () {
        if (Z.Viewer.getStatus("readyViewer")) {
            Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADINGIMAGE-DATA"), !1, Z.messageDurationLong, "center");
            for (var a = 0, b = Z.imageSetLength; a < b; a++) Z["Viewport" + a.toString()].prez581s(!0);
        }
    };
    this.syncComparisonViewport = function (a) {
        if (Z.syncComparison && Z.Viewport && Z.Viewport0 && Z.Viewport0.getStatus("initializedViewport") && Z.Viewport1 && Z.Viewport1.getStatus("initializedViewport")) {
            var b = Z.Viewport.getViewportID(),
                c = 0 == b ? Z.Viewport0 : Z.Viewport1,
                d = 0 == b ? Z.Viewport1 : Z.Viewport0;
            if (a) (b = c.getCoordinatesFull(!0)), d.setView(b.x, b.y, b.z, b.r, null, null);
            else if (((a = c.getCoordinatesDisplayFull()), d.setViewNoUpdate(a.cLeft, a.cTop, a.vWidth, a.vHeight, a.vLeft, a.vTop, a.bWidth, a.bHeight, a.bLeft, a.bTop, a.cRotation), (b = 0 == b ? Z.Navigator2 : Z.Navigator)))
                "stop" != Z.zooming ? b.syncToViewport() : ((a = new Z.Utils.Point(parseFloat(a.cLeft), parseFloat(a.cTop))), (d = d.calculateCurrentCenterCoordinates(a, Z.imageZ, Z.imageR)), b.z658(d));
        }
    };
    this.syncOverlayViewports = function (a, b) {
        var c = Z["Viewport" + (Z.imageSetLength - 1).toString()];
        if (Z.overlays && c && c.getStatus("initializedViewport"))
            if (a) for (var d = c.getCoordinatesFull(!0), c = 0, e = Z.imageSetLength - 1; c < e; c++) b != c && Z["Viewport" + c.toString()].setView(d.x, d.y, d.z, d.r, null, null);
            else
                for (d = c.getCoordinatesDisplayFull(), c = 0, e = Z.imageSetLength - 1; c < e; c++)
                    Z["Viewport" + c.toString()].setViewNoUpdate(d.cLeft, d.cTop, d.vWidth, d.vHeight, d.vLeft, d.vTop, d.bWidth, d.bHeight, d.bLeft, d.bTop, d.cRotation);
    };
    this.parseImageSetXML = function (a, b) {
        Z.Utils.arrayClear(ua);
        Z.Utils.arrayClear(S);
        Z.imageSetListPosition = Z.Utils.getResource("DEFAULT_IMAGESETLISTPOSITION");
        var c = Z.Utils.getResource("DEFAULT_IMAGESETLISTSOURCE");
        Z.imageSetListTitle = Z.Utils.getResource("UI_IMAGESETLISTTITLE");
        Z.imageSetStart = parseInt(Z.Utils.getResource("UI_IMAGESETSTART"), 10);
        Z.imageSetLoop = "1" == Z.Utils.getResource("UI_IMAGESETLOOP");
        Z.sliderImageSetVisible = "1" == Z.Utils.getResource("UI_IMAGESETSLIDER");
        var d = a.getElementsByTagName("SETUP")[0];
        if (d) {
            var e = d.getAttribute("CHOICELIST");
            Z.Utils.stringValidate(e) && (Z.imageSetListPosition = e);
            e = d.getAttribute("LISTSOURCE");
            Z.Utils.stringValidate(e) && (c = e);
            e = d.getAttribute("LISTTITLE");
            Z.Utils.stringValidate(e) && (Z.imageSetListTitle = e);
            e = d.getAttribute("HOTSPOTPATH");
            Z.Utils.stringValidate(e) && ((Z.imageSetHotspotPath = e), (Z.hotspotFileShared = !0));
            e = d.getAttribute("ANNOTATIONPATH");
            Z.Utils.stringValidate(e) && ((Z.imageSetAnnotationPath = e), (Z.annotationFileShared = !0));
            e = d.getAttribute("IMAGELISTPATH");
            Z.Utils.stringValidate(e) && ((Z.imageSetImageListPath = e), (Z.imageListFileShared = !0));
            e = d.getAttribute("START");
            Z.Utils.stringValidate(e) && (Z.imageSetStart = parseInt(e, 10) - 1);
            e = d.getAttribute("LOOP");
            Z.Utils.stringValidate(e) && (Z.imageSetLoop = "1" == e);
            e = d.getAttribute("SLIDER");
            Z.Utils.stringValidate(e) && (Z.sliderImageSetVisible = "1" == e);
            Z.overlays && ((e = d.getAttribute("INITIALVISIBILITY")), (Z.overlaysInitialVisibility = Z.Utils.stringValidate(e) ? "1" == e || "true" == e : "1" == Z.Utils.getResource("DEFAULT_OVERLAYSVISIBLE")));
            Z.animation &&
                ((e = d.getAttribute("AXIS")),
                (Z.animationAxis = Z.Utils.stringValidate(e) ? e : null !== Z.animationAxis ? Z.animationAxis : Z.Utils.getResource("DEFAULT_ANIMATIONAXIS")),
                (e = d.getAttribute("ANIMATOR")),
                (Z.animator = Z.Utils.stringValidate(e) ? e : null !== Z.animator ? Z.animator : Z.Utils.getResource("DEFAULT_ANIMATOR")),
                (e = d.getAttribute("FLIP")),
                (Z.animationFlip = Z.Utils.stringValidate(e) ? "1" == e : null !== Z.animationFlip ? Z.animationFlip : "1" == Z.Utils.getResource("DEFAULT_ANIMATIONFLIP")));
            Z.comparison &&
                ((Z.initialSync = "1" == Z.Utils.getResource("DEFAULT_COMPARISONINITIALSYNC")),
                (Z.syncComparison = "1" == Z.Utils.getResource("DEFAULT_COMPARISONSYNC")),
                (e = d.getAttribute("INITIALSYNC")),
                Z.Utils.stringValidate(e) && ((Z.initialSync = "1" == e), Z.initialSync || (Z.syncComparison = !1)),
                (d = d.getAttribute("SYNCVISIBLE")),
                (Z.syncVisible = Z.Utils.stringValidate(d) ? "1" == d : "1" == Z.Utils.getResource("DEFAULT_COMPARISONSYNCVISIBLE")));
        }
        Z.overlays && ((e = a.createElement("OVERLAY")), e.setAttribute("MEDIA", Z.imagePath), e.setAttribute("NAME", "Base Image"), (d = a.getElementsByTagName("OVERLAY")), a.documentElement.insertBefore(e, d[0]));
        for (var d = a.getElementsByTagName("animation" == b || "comparison" == b ? "IMAGE" : "overlay" == b ? "OVERLAY" : "SLIDE"), e = 0, g = d.length; e < g; e++) {
            var k = new F(d[e], e);
            ua[ua.length] = k;
            var u = "NAME" == c ? k.name : k.media.substring(k.media.lastIndexOf("/") + 1, k.media.length);
            S[S.length] = { text: u, value: k.internalID };
        }
        Z.animationFlip && (ua.reverse(), S.reverse());
        Z.comparison && ((c = ua[0]), (d = ua[1]), c.initialX != d.initialX || c.initialY != d.initialY || c.initialZoom != d.initialZoom || c.minX != d.minX || c.maxX != d.maxX) && (Z.initialSync = !1);
        Z.imageSetLength = ua.length;
        Z.comparison ||
            Z.overlays ||
            ((k = Z.imageSetListPosition),
            (c = Z.imageSetListTitle),
            (d = S),
            (e = "0" == k ? "hidden" : "visible"),
            (g = parseInt(Z.Utils.getResource("DEFAULT_IMAGESETLISTWIDTH"), 10)),
            (k = Q(k, g, Z.viewerW, Z.viewerH)),
            "undefined" === typeof M || null === M
                ? ((M = new Z.Utils.createSelectElement("imageSetList", c, d, g, k.x, k.y, null, e, W, "change")),
                  Z.ViewerDisplay.appendChild(M),
                  (c = Z.Utils.stringValidate(Z.imageSetListTitle) && "none" != Z.imageSetListTitle ? 1 : 0),
                  (M.selectedIndex = c))
                : Z.Utils.arrayClear(d),
            (M.style.zIndex = (Z.baseZIndex + 24).toString()));
        t(ua);
    };
    z619Delayed = function () {
        for (var a = 0, b = Z.imageSetLength; a < b; a++) {
            var c = Z["Viewport" + a.toString()];
            c.getStatus("backfillPrecachedViewport") || c.z619(!0);
        }
    };
    this.viewportChange = function (a) {
        "stop" != a
            ? ("forward" == a ? Z.Viewer.viewportNext() : Z.Viewer.viewportPrior(),
              Z.animation &&
                  (Z.viewportChangeTimeout = window.setTimeout(function () {
                      Z.Viewer.viewportChange(a);
                  }, 10)))
            : Z.viewportChangeTimeout && (window.clearTimeout(Z.viewportChangeTimeout), (Z.viewportChangeTimeout = null));
    };
    this.viewportPrior = function (a) {
        a = "undefined" === typeof a || null === a ? 0 : Math.round(a);
        var b = Z.imageSetLength - 1;
        a = Z.viewportCurrentID - (1 - a);
        0 > a && (Z.imageSetLoop ? (a < -b && (a = -(-a % b)), 0 > a && (a += b + 1)) : (a = 0));
        N.viewportSelect(a);
    };
    this.viewportNext = function (a) {
        a = "undefined" === typeof a || null === a ? 0 : Math.round(a);
        var b = Z.imageSetLength - 1;
        a = Z.viewportCurrentID + (1 + a);
        a > b && (a = Z.imageSetLoop ? a % (b + 1) : b);
        N.viewportSelect(a);
    };
    this.viewportSelect = function (a, b) {
        var c = Z.mouseIsDown || Z.buttonIsDown || Z.keyIsDown,
            d = null === Z.Viewport;
        if ("undefined" === typeof a || null === a) a = 0;
        a = Math.abs(a);
        if (a != Z.viewportCurrentID || !c) {
            var e = a.toString(),
                g = Z["Viewport" + e],
                k = g == Z.viewportCurrent;
            "undefined" === typeof g ||
                (k && !d && c) ||
                ((c = Z.viewportCurrentID.toString()),
                (d = Z.viewportCurrent),
                (Z.viewportCurrent = g),
                (Z.viewportCurrentID = a),
                Z.comparison || Z.viewportCurrent.setVisibility(!0),
                (Z.Viewport = Z.viewportCurrent),
                k || Z.comparison || Z.overlays || d.setVisibility(!1),
                Z.Utils.validateCallback("viewportChanged"),
                Z.comparison &&
                    Z.Viewport0 &&
                    Z.Viewport1 &&
                    ((g = document.getElementById("viewportContainer0")),
                    (k = document.getElementById("viewportContainer1")),
                    Z.Utils.swapZIndices(g, k),
                    (g = a),
                    Z.Navigator && Z.Navigator.setSelected(0 == g),
                    Z.Navigator2 && Z.Navigator2.setSelected(1 == g)),
                Z.viewportCurrent &&
                    Z.viewportCurrent.getStatus("initializedViewport") &&
                    ((g = Z.viewportCurrent.getViewW() != Z.viewerW || Z.viewportCurrent.getViewH() != Z.viewerH),
                    Z.comparison || (g ? Z.viewportCurrent.syncViewportResize(Z.imageX, Z.imageY, Z.imageZ, Z.imageR) : (0 != Z.imageR && Z.viewportCurrent.rotateStep(Z.imageR, !1, !0), Z.viewportCurrent.updateView(!0))),
                    d && (Z.hotspotFileShared || Z.annotationFileShared) && (d = d.getHotspots()) && Z.viewportCurrent.setHotspots(d),
                    !Z.comparison && Z.Navigator && Z.Navigator.getInitialized() && 0 < Z.navigatorVisible && Z.Navigator.setViewport(Z.viewportCurrent),
                    !Z.comparison && Z.Gallery && Z.Gallery.getInitialized() && 0 < Z.galleryVisible && (Z.Gallery.setViewport(Z.viewportCurrent), Z.Gallery.syncGalleryToViewport(slideCurrentInList)),
                    Z.Toolbar &&
                        Z.Toolbar.getInitialized() &&
                        0 < Z.toolbarVisible &&
                        8 != Z.toolbarVisible &&
                        (Z.comparison || ("undefined" !== typeof b && null !== b && b) || Z.Toolbar.syncSliderToViewportImageSet(Z.viewportCurrentID), Z.Toolbar.setViewport(Z.viewportCurrent)),
                    Z.hotspots && (J(!1, c), J(!0, e)),
                    M && (M.blur(), (e = Z.Utils.stringValidate(Z.imageSetListTitle) && "none" != Z.imageSetListTitle ? 1 : 0), (M.selectedIndex = Z.viewportCurrentID + e))));
        }
    };
    this.setVisibilityHotspotChoiceList = function (a, b) {
        J(a, b);
    };
    this.sizeAndPositionImageSetList = function () {
        if (M) {
            var a = parseInt(Z.Utils.getResource("z65"), 10) + 2;
            "markup" == Z.editMode && ((a -= 20), (M.style.width = a + "px"));
            a = Q(Z.imageSetListPosition, a, Z.viewerW, Z.viewerH);
            M.style.left = a.x + "px";
            M.style.top = a.y + "px";
        }
    };
    this.setVisibilityImageSetChoiceList = function (a) {
        var b = document.getElementById("imageSetList");
        b && (b.style.visibility = a ? "visible" : "hidden");
    };
    this.syncToolbarImageSetSliderToViewport = function (a) {
        Z.ToolbarDisplay && Z.Toolbar.getInitialized() && Z.imageSet && Z.sliderImageSetVisible && ((a = Z["Viewport" + a].getZoom()), Z.Toolbar.syncSliderToViewportZoom(a));
    };
    this.initializeViewerKeyEventListeners = function (a) {
        a ? (Z.Utils.addEventListener(document, "keydown", v), Z.Utils.addEventListener(document, "keyup", v)) : (Z.Utils.removeEventListener(document, "keydown", v), Z.Utils.removeEventListener(document, "keyup", v));
    };
    this.initializeViewerKeyDefaultListeners = function (a) {
        a
            ? (Z.Utils.addEventListener(document, "keydown", Z.Utils.preventDefault), Z.Utils.addEventListener(document, "keyup", Z.Utils.preventDefault))
            : (Z.Utils.removeEventListener(document, "keydown", Z.Utils.preventDefault), Z.Utils.removeEventListener(document, "keyup", Z.Utils.preventDefault));
    };
    this.viewerEventsHandler = function (a) {
        u(a);
    };
    this.autoResizeViewer = function () {
        wa();
    };
    this.resizeViewer = function (a, b, c) {
        N.setSizeAndPosition(a, b, 0, 0, !1);
        Z.viewportCurrent.resizeViewport(Z.imageX, Z.imageY, c, Z.imageR);
        if (Z.comparison) {
            var d = 0 == Z.viewportCurrent.getViewportID() ? Z.Viewport1 : Z.Viewport0;
            d && (d.setSizeAndPosition(a, b, 0, 0, !1), d.resizeViewport(Z.imageX, Z.imageY, c, Z.imageR));
        }
    };
    this.z586 = function (a) {
        Z.mouseWheelIsDown = !1;
        Z.mouseWheelCompleteTimer && (window.clearTimeout(Z.mouseWheelCompleteTimer), (Z.mouseWheelCompleteTimer = null), (Z.zooming = "stop"), Z.viewportCurrent.updateView(!0));
    };
};
Z.ZoomifyViewport = function (a, b, c, d, e, g) {
    function k(l) {
        l = Z.Utils.getResource("DEFAULT_IMAGELISTXMLFILE");
        ".xml" != Z.imageListPath.toLowerCase().substring(Z.imageListPath.length - 4, Z.imageListPath.length) && (Z.imageListPath = Z.imageListPath + "/" + l);
        XMLPath = Z.Utils.cacheProofPath(Z.imageListPath);
        "undefined" !== typeof XMLPath && Z.Utils.stringValidate(XMLPath) && ((l = new Z.NetConnector()), l.loadXML(XMLPath, a));
    }
    function q(l) {
        l = Z.Utils.getResource("z209");
        ".xml" != Z.slidePath.toLowerCase().substring(Z.slidePath.length - 4, Z.slidePath.length) && (Z.slidePath = Z.slidePath + "/" + l);
        XMLPath = Z.Utils.cacheProofPath(Z.slidePath);
        "undefined" !== typeof XMLPath && Z.Utils.stringValidate(XMLPath) && ((l = new Z.NetConnector()), l.loadXML(XMLPath));
    }
    function t(l, a, b, E, c, f, d, e, m, g, n) {
        W();
        Z.imageW = l;
        Z.imageH = a;
        Z.imageCtrX = Z.imageW / 2;
        Z.imageCtrY = Z.imageH / 2;
        Z.imageD = Math.round(Math.sqrt(l * l + a * a));
        ld = f;
        zd = d;
        vc = e;
        Ec = c;
        Xa = b;
        Ra = E;
        null !== m && null !== g && null !== n && ((Z.sourceMagnification = m), (Z.focal = g), (Z.quality = n));
        u();
        O(Y, ba, lf, Td);
        h.validateXYZDefaults();
        tb > mf ? ((Ab = Da(Tb, Z.initialZ)), ha && La.scale(Ab, Ab)) : (La = Gb = ha = null);
        $b = Da(Ya, Z.initialZ);
        hc = va = Da(oa, Z.initialZ);
        if (Z.useCanvas)
            try {
                Qa.scale(va, va);
            } catch (k) {
                Z.Utils.showMessage(Z.Utils.getResource("ERROR_SCALINGCANVASFORUNCONVERTEDIMAGE"), !1, Z.messageDurationStandard, "center"), console.log("In function initializeViewportContinue scaling canvas:  " + k);
            }
        Ja && A();
        Z.screensaver &&
            (Z.Utils.validateCallback("screensaverStarting"),
            Z.Utils.functionCallWithDelay(function () {
                h.tourStart();
            }, 750));
        pa && (h.setDrawingColor("buttonColor0" + Ma, !0), (Z.tour || Z.hotspots || Z.annotations) && Hb(Ma));
        Z.virtualPointerVisible && Z.Viewer.createVirtualPointer();
        "unconverted" != Z.tileSource && h.z619();
        Vc(Z.initialX, Z.initialY, Z.initialZ, Z.initialR, null, !0);
        Z.coordinatesVisible && h.setCoordinatesDisplayVisibility(!0);
        Z.geoCoordinatesVisible && ub();
        Z.initialFullPage && h.toggleFullViewMode(!0);
        Z.Utils.addEventListener(sa, "mousedown", Ea);
        Z.Utils.addEventListener(sa, "mousemove", Z.Utils.preventDefault);
        Z.Utils.addEventListener(sa, "touchstart", Ea);
        Z.Utils.addEventListener(sa, "touchmove", Ea);
        Z.Utils.addEventListener(sa, "touchend", Ea);
        Z.Utils.addEventListener(sa, "touchcancel", Ea);
        Z.Utils.addEventListener(sa, "gesturestart", Ea);
        Z.Utils.addEventListener(sa, "gesturechange", Ea);
        Z.Utils.addEventListener(sa, "gestureend", Ea);
        Z.Utils.addEventListener(ta, "contextmenu", Z.Utils.preventDefault);
        Z.Utils.addEventListener(la, "contextmenu", Z.Utils.preventDefault);
        Ja && Z.Utils.addEventListener(Ja, "contextmenu", Z.Utils.preventDefault);
        pa && Z.Utils.addEventListener(pa, "contextmenu", Z.Utils.preventDefault);
        h.setStatus("initializedViewport", !0);
        h.syncViewportRelated();
        Z.slideshow &&
            ((l = Z.Utils.stringValidate(Z.slideListTitle) && "none" != Z.slideListTitle ? 1 : 0), "undefined" !== typeof Ub && (Ub.selectedIndex = l), Je && !Z.slideshowPlaying ? h.slideshowStart() : Z.slideshowPlaying && h.nextSlide());
        "multiple" == Z.imagePath &&
            ((l = Z.hotspots ? "hotspotsLoadedViewer" : Z.annotations ? "annotationsLoadedViewer" : null),
            null !== l &&
                Z.setCallback(l, function () {
                    window.setTimeout(function () {
                        Z.viewportCurrent.z623();
                    }, 1500);
                }));
    }
    function J(l, b, D, E, c, f, d, e, m, g, n) {
        h.setStatus("initializedViewport", !1);
        h.clearAll(!0, !1, !0, !0);
        Z.imageW = l;
        Z.imageH = b;
        Z.imageCtrX = Z.imageW / 2;
        Z.imageCtrY = Z.imageH / 2;
        Z.imageD = Math.round(Math.sqrt(l * l + b * b));
        ld = f;
        zd = d;
        vc = e;
        Ec = c;
        Xa = D;
        Ra = E;
        Z.Utils.setParameters(Z.parameters);
        Z.imageList && (Z.tileW != D && (Xa = Z.tileW), Z.tileH != E && (Ra = Z.tileH));
        u();
        null !== Z.hotspotPath && ((Ib = Z.hotspotPath), (ac = Z.hotspotFolder));
        null !== Z.annotationPath && ((mb = Z.annotationPath), (Sa = Z.annotationFolder));
        Q();
        W();
        h.validateXYZDefaults();
        tb > mf ? ((Ab = Da(Tb, Z.initialZ)), La.restore(), La.scale(Ab, Ab)) : (ha = Gb = La = null);
        $b = Da(Ya, Z.initialZ);
        hc = va = Da(oa, Z.initialZ);
        Z.useCanvas && (Qa.restore(), Qa.scale(va, va));
        Ja && A();
        pa && (h.setDrawingColor("buttonColor0" + Ma, !0), (Z.tour || Z.hotspots || Z.annotations) && Hb(Ma));
        Z.virtualPointerVisible && Z.Viewer.createVirtualPointer();
        "unconverted" != Z.tileSource && h.z619();
        Z.comparison && (Y *= 2);
        h.setSizeAndPosition(Y, ba, lf, Td);
        l = "undefined" !== typeof Z.parameters && null !== Z.parameters && ("undefined" !== typeof Z.parameters.zInitialX || "undefined" !== typeof Z.parameters.zInitialY || "undefined" !== typeof Z.parameters.zInitialZoom);
        (!Z.comparison && !Z.overlays) || l ? Vc(Z.initialX, Z.initialY, Z.initialZ, Z.initialR, null, !0) : Vc(Z.priorX, Z.priorY, Z.priorZ, Z.priorR, null, !0);
        h.setStatus("initializedViewport", !0);
        (l = 0 == a ? Z.Navigator : Z.Navigator2) && l.setImage(h.getImagePath());
        Z.comparison && ((l = (0 == h.getViewportID() ? Z.Viewport1 : Z.Viewport0).getCoordinatesFull(!0)), h.setView(l.x, l.y, l.z, l.r, null, null));
        h.syncViewportRelated();
        Z.slideshowPlaying && h.nextSlide();
    }
    function F() {
        tb = 1;
        Ya = oa = 0;
        nf = of = pf = Za = !1;
        "undefined" !== typeof Bb && Z.Utils.arrayClear(Bb);
        "undefined" !== typeof Mb && Z.Utils.arrayClear(Mb);
        "undefined" !== typeof nb && Z.Utils.arrayClear(nb);
        "undefined" !== typeof Vb && Z.Utils.arrayClear(Vb);
        "undefined" !== typeof Nb && Z.Utils.arrayClear(Nb);
        "undefined" !== typeof md && Z.Utils.arrayClear(md);
        "undefined" !== typeof tierTileOffsetsCount && Z.Utils.arrayClear(tierTileOffsetsCount);
        "undefined" !== typeof tierTileOffsetChunks && Z.Utils.arrayClear(tierTileOffsetChunks);
        "undefined" !== typeof tierTileOffsetLast && Z.Utils.arrayClear(tierTileOffsetLast);
        "undefined" !== typeof Wc && Z.Utils.arrayClear(Wc);
        "undefined" !== typeof tierTileByteCountsCount && Z.Utils.arrayClear(tierTileByteCountsCount);
        "undefined" !== typeof tierTileByteCountChunks && Z.Utils.arrayClear(tierTileByteCountChunks);
        "undefined" !== typeof tierTileByteCountLast && Z.Utils.arrayClear(tierTileByteCountLast);
        "undefined" !== typeof Jb && Z.Utils.arrayClear(Jb);
        "undefined" !== typeof Ke && Z.Utils.arrayClear(Ke);
    }
    function Q(l) {
        if ("undefined" === typeof l || null === l) l = 0;
        l = l.toString();
        Z.useCanvas &&
            !ha &&
            ((Xc = Z.Utils.createContainerElement("canvas", "oversizeDisplay" + l, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            Z.ViewerDisplay.appendChild(Xc),
            (ha = Xc),
            (Gb = ha.style));
        Z.comparison &&
            !Fc &&
            ((nd = Z.Utils.createContainerElement("div", "comparisonMaskContainer" + l, "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            Z.ViewerDisplay.appendChild(nd),
            (Fc = nd),
            (Gc = Fc.style));
        sa ||
            (($a = Z.Utils.createContainerElement("div", "viewportContainer" + l, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            Z.comparison ? nd.appendChild($a) : Z.ViewerDisplay.appendChild($a),
            (sa = $a),
            (I = sa.style));
        ta ||
            ((Ad = Z.Utils.createContainerElement(Z.useCanvas ? "canvas" : "div", "viewportBackfillDisplay" + l, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(Ad),
            (ta = Ad),
            (ca = ta.style));
        la ||
            ((Yc = Z.Utils.createContainerElement(Z.useCanvas ? "canvas" : "div", "viewportDisplay" + l, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(Yc),
            (la = Yc),
            (qa = la.style));
        Z.useCanvas &&
            (ob ||
                ((od = Z.Utils.createContainerElement("canvas", "transitionCanvas", "none", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
                $a.appendChild(od),
                (ob = od),
                (ic = ob.style)),
            Z.imageFilters &&
                (Bd ||
                    ((qf = Z.Utils.createContainerElement("canvas", "imageFilterBackfillCanvas", "none", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
                    $a.appendChild(qf),
                    (Bd = qf),
                    (rf = Bd.style)),
                Ud ||
                    ((sf = Z.Utils.createContainerElement("canvas", "imageFilterCanvas", "none", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
                    $a.appendChild(sf),
                    (Ud = sf))));
        Z.watermarks &&
            !Ja &&
            ((Cd = Z.Utils.createContainerElement("div", "watermarkDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(Cd),
            (Ja = Cd),
            (pc = Ja.style));
        Z.maskVisible &&
            (Z.hotspots || Z.annotations) &&
            !Oa &&
            ((tf = Z.Utils.createContainerElement("canvas", "maskCanvas", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(tf),
            (Oa = tf),
            (vb = Oa.style),
            (vb.display = "none"));
        l = Z.zoomRectangle || Z.measureVisible || (Z.tour && !Z.screensaver) || Z.hotspots || Z.annotations;
        var a = Z.useCanvas && (l || (Z.hotspots && Z.labelIconsInternal)),
            b = Z.useCanvas && (Z.zoomRectangle || Z.measureVisible || null !== Z.editMode),
            E = a && Z.saveImageHandlerProvided;
        a &&
            !cb &&
            ((bc = Z.Utils.createContainerElement("canvas", "drawingDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(bc),
            (cb = bc),
            (Cb = cb.style));
        b &&
            !Na &&
            ((uf = Z.Utils.createContainerElement("canvas", "editingDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(uf),
            (Na = uf),
            (Db = Na.style));
        l &&
            !pa &&
            ((Hc = Z.Utils.createContainerElement("div", "hotspotDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(Hc),
            (pa = Hc),
            (pb = pa.style),
            Z.Utils.addEventListener(Hc, "mousedown", Z.Utils.preventDefault));
        E &&
            !Vd &&
            ((vf = Z.Utils.createContainerElement("canvas", "savingDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")),
            $a.appendChild(vf),
            (Vd = vf),
            (Le = Vd.style),
            (Le.display = "none"));
        Z.useCanvas || ((ta.innerHTML = ""), (la.innerHTML = ""));
        Ja && (Ja.innerHTML = "");
        pa && (pa.innerHTML = "");
    }
    function W() {
        Z.useCanvas &&
            (ha && (La = ha.getContext("2d")),
            (jc = ta.getContext("2d")),
            (Qa = la.getContext("2d")),
            (qc = ob.getContext("2d")),
            cb && (Wd = cb.getContext("2d")),
            Na && (ab = Na.getContext("2d")),
            Oa && (Fa = Oa.getContext("2d")),
            Vd && (Me = Vd.getContext("2d")),
            Z.imageFilters && ((wf = Ud.getContext("2d")), (mg = Bd.getContext("2d"))));
    }
    function O(l, b, D, E) {
        if ("undefined" === typeof D || null === D) D = 0;
        if ("undefined" === typeof E || null === E) E = 0;
        Z.viewerW = Y = l;
        Z.viewerH = ba = b;
        Z.comparison && (Y = l / 2);
        xa = Y * ng;
        za = ba * ng;
        l = Z.imageSet ? gh : "unconverted" == Z.tileSource && Z.mobileDevice ? hh : "unconverted" == Z.tileSource && Z.browser == Z.browsers.FIREFOX ? ih : jh;
        b = Z.constrainPanStrict ? Z.imageW : 2 * Z.imageW;
        var c = Z.constrainPanStrict ? Z.imageH : 2 * Z.imageH;
        xa > l && (xa = l);
        za > l && (za = l);
        xa > b && (xa = b);
        za > c && (za = c);
        xa < Y && (xa = Y);
        za < ba && (za = ba);
        Ob = Z.Utils.roundToFixed(xa / 2, 4);
        Pb = Z.Utils.roundToFixed(za / 2, 4);
        ib = Z.Utils.roundToFixed(-((xa - Y) / 2) + D, 4);
        Z.Utils.roundToFixed((xa - Y) / 2 + D, 4);
        jb = Z.Utils.roundToFixed(-((za - ba) / 2) + E, 4);
        Z.Utils.roundToFixed((za - ba) / 2 + E, 4);
        ha && ((ha.width = Y), (ha.height = ba), (Gb.width = Y + "px"), (Gb.height = ba + "px"), (Gb.left = "0px"), (Gb.top = "0px"));
        Z.comparison && ((Fc.width = Y), (Fc.height = ba), (Gc.width = Y + "px"), (Gc.height = ba + "px"), (Gc.left = 0 == a ? "0px" : Y + "px"), (Gc.top = "0px"));
        sa.width = xa;
        sa.height = za;
        I.width = xa + "px";
        I.height = za + "px";
        I.left = ib + "px";
        I.top = jb + "px";
        la.width = xa;
        la.height = za;
        qa.width = xa + "px";
        qa.height = za + "px";
        Ja && ((Ja.width = xa), (Ja.height = za), (pc.width = xa + "px"), (pc.height = za + "px"));
        Oa && ((Oa.width = xa), (Oa.height = za), (vb.width = xa + "px"), (vb.height = za + "px"));
        pa && ((pa.width = xa), (pa.height = za), (pb.width = xa + "px"), (pb.height = za + "px"), Zc && ((D = parseInt(Z.Utils.getResource("z133"), 10)), (D = og(Ne, D, Y, ba)), (Ic.left = D.x + "px"), (Ic.top = D.y + "px")));
        cb && ((cb.width = xa), (cb.height = za), (Cb.width = xa + "px"), (Cb.height = za + "px"));
        Na && ((Na.width = xa), (Na.height = za), (Db.width = xa + "px"), (Db.height = za + "px"));
        $c && ((D = new h.calculateAnnotationPanelDimensions(kh, lh, mh, nh)), (E = h.calculateAnnotationPanelCoords(oh, D.w, D.h, Y, ba)), h.sizeAndPositionAnnotationPanel(Oe, D.w, D.h, E.x, E.y));
        Z.imageSet && Z.Viewer.sizeAndPositionImageSetList();
        if (Z.useCanvas) {
            ha && (La.translate(Y / 2, ba / 2), La.save());
            try {
                Qa.translate(Ob, Pb);
            } catch (f) {
                Z.Utils.showMessage(Z.Utils.getResource("ERROR_TRANSLATINGCANVASFORUNCONVERTEDIMAGE"), !1, Z.messageDurationStandard, "center");
            }
            Qa.save();
            Oa && (Fa.translate(Ob, Pb), Fa.save());
            cb && (Wd.translate(Ob, Pb), Wd.save());
            Na && (ab.translate(Ob, Pb), ab.save());
        }
    }
    function ea(l, a, b) {
        if ("ZoomifyImageFile" == Z.tileSource) {
            b = parseFloat(Z.Utils.getResource("z125"));
            var E = parseFloat(Z.Utils.getResource("z124"));
            a.loadByteRange(l, b, E, "header");
        } else if ("ZoomifyImageFolder" == Z.tileSource) (l = Z.Utils.cacheProofPath(l + "/ImageProperties.xml")), a.loadXML(l, b);
        else if ("ZoomifyPFFFile" == Z.tileSource) {
            var E = Z.Utils.getResource("z125"),
                c = Z.Utils.getResource("z123");
            l = l.replace(".", "%2E");
            a.loadXML(Z.tileHandlerPathFull + "?file=" + l + "&requestType=1&begin=" + E + "&end=" + c, b);
        }
    }
    function v(l, a) {
        F();
        if ("undefined" === typeof h.getStatus)
            window.setTimeout(function () {
                v(l, a);
            }, 100);
        else {
            var b = null,
                E = null,
                c = null,
                f = null,
                d = null,
                e = null,
                m = null,
                g = null,
                n = null,
                k = null,
                r = null;
            "ZoomifyImageFolder" == Z.tileSource
                ? ((b = parseInt(l.documentElement.getAttribute("WIDTH"), 10)),
                  (E = parseInt(l.documentElement.getAttribute("HEIGHT"), 10)),
                  (d = parseInt(l.documentElement.getAttribute("NUMTILES"), 10)),
                  parseInt(l.documentElement.getAttribute("NUMIMAGES"), 10),
                  (e = parseInt(l.documentElement.getAttribute("VERSION"), 10)),
                  (c = f = parseInt(l.documentElement.getAttribute("TILESIZE"), 10)))
                : "ZoomifyPFFFile" == Z.tileSource
                ? ((b = parseInt(l.documentElement.getAttribute("WIDTH"), 10)),
                  (E = parseInt(l.documentElement.getAttribute("HEIGHT"), 10)),
                  (c = f = parseInt(l.documentElement.getAttribute("TILESIZE"), 10)),
                  (d = parseInt(l.documentElement.getAttribute("NUMTILES"), 10)),
                  parseInt(l.documentElement.getAttribute("NUMIMAGES"), 10),
                  (e = parseInt(l.documentElement.getAttribute("VERSION"), 10)),
                  (m = parseInt(l.documentElement.getAttribute("HEADERSIZE"), 10)),
                  (g = 1060 + m))
                : "IIIFImageServer" == Z.tileSource
                ? ((b = parseInt(l.documentElement.getAttribute("WIDTH"), 10)), (E = parseInt(l.documentElement.getAttribute("HEIGHT"), 10)), (d = e = c = f = null))
                : "ImageServer" == Z.tileSource &&
                  ((b = parseInt(l.documentElement.getAttribute("WIDTH"), 10)),
                  (E = parseInt(l.documentElement.getAttribute("HEIGHT"), 10)),
                  (f = l.documentElement.getAttribute("TILESIZE")),
                  (c = Z.Utils.stringValidate(f) ? parseInt(f, 10) : Xa),
                  (f = Z.Utils.stringValidate(f) ? parseInt(f, 10) : Ra),
                  (n = l.documentElement.getAttribute("MAGNIFICATION")),
                  (n = Z.Utils.stringValidate(n) ? parseInt(n, 10) : Z.sourceMagnification),
                  (k = l.documentElement.getAttribute("FOCAL")),
                  (k = Z.Utils.stringValidate(k) ? parseInt(k, 10) : Z.focal),
                  (r = l.documentElement.getAttribute("QUALITY")),
                  (r = Z.Utils.stringValidate(r) ? parseInt(r, 10) : Z.quality));
            null !== Z.tileW && (c = Z.tileW);
            null !== Z.tileH && (f = Z.tileH);
            if ("ZoomifyImageFolder" == Z.tileSource || "IIIFImageServer" == Z.tileSource || "ImageServer" == Z.tileSource) {
                if (null === c || isNaN(c)) c = Xa;
                if (null === f || isNaN(f)) f = Ra;
                if (null === d || isNaN(d)) d = 1;
            }
            !isNaN(b) && 0 < b && !isNaN(E) && 0 < E && !isNaN(c) && 0 < c && !isNaN(f) && 0 < f && 0 < d
                ? h.getStatus("initializedViewport")
                    ? J(b, E, c, f, d, e, m, g, n, k, r, a)
                    : t(b, E, c, f, d, e, m, g, n, k, r, a)
                : "ZoomifyImageFolder" == Z.tileSource
                ? Z.Utils.showMessage(Z.Utils.getResource("z252"), !1, Z.messageDurationStandard, "center")
                : Z.Utils.showMessage(Z.Utils.getResource("z250"), !1, Z.messageDurationStandard, "center");
        }
    }
    function u() {
        if ("unconverted" == Z.tileSource){(Bb[0] = Z.imageW), (Mb[0] = Z.imageH), (nb[0] = 1), (Vb[0] = 1), (tb = Nb[0] = 1);}
        else if ("ZoomifyImageFile" == Z.tileSource) for (var l = tb - 1; 0 <= l; l--) (nb[l] = Math.ceil(Bb[l] / Xa)), (Vb[l] = Math.ceil(Mb[l] / Ra)), (Nb[l] = nb[l] * Vb[l]);
        else {
            for (var l = Z.imageW, a = Z.imageH; l > Xa || a > Ra; ) (l /= 2), (a /= 2), tb++;
            for (var l = Z.imageW, a = Z.imageH, b = 0, E = tb - 1; 0 <= E; E--) (Bb[E] = l), (Mb[E] = a), (nb[E] = Math.ceil(Bb[E] / Xa)), (Vb[E] = Math.ceil(Mb[E] / Ra)), (Nb[E] = nb[E] * Vb[E]), (l /= 2), (a /= 2), (b += Nb[E]);
            if (b != Ec && ("ZoomifyImageFolder" == Z.tileSource || "ZoomifyImageFile" == Z.tileSource || "ZoomifyPFFFile" == Z.tileSource)) {
                Bb = [];
                Mb = [];
                nb = [];
                Vb = [];
                tb = 1;
                l = Z.imageW;
                a = Z.imageH;
                for (b = 2; l > Xa || a > Ra; ) (l = Math.floor(Z.imageW / b)), (a = Math.floor(Z.imageH / b)), (b *= 2), l % 2 && l++, a % 2 && a++, tb++;
				
                l = Z.imageW;
                a = Z.imageH;
                b = 2;
                tileCounter = 0; 
                for (E = tb - 1; 0 <= E; E--)
                    (nb[E] = Math.floor(l / Xa)),
                        l % Xa && nb[E]++,
                        (Vb[E] = Math.floor(a / Ra)),
                        a % Ra && Vb[E]++,
                        (Nb[E] = nb[E] * Vb[E]),
                        (tileCounter += Nb[E]),
                        (Bb[E] = l),
                        (Mb[E] = a),
                        (l = Math.floor(Z.imageW / b)),
                        (a = Math.floor(Z.imageH / b)),
                        (b *= 2),
                        l % 2 && l++,
                        a % 2 && a++;
                l = tileCounter;
                l != Ec && Z.Utils.showMessage(Z.Utils.getResource("z254"), !1, Z.messageDurationStandard, "center");
            }
        }
    }
    function w(l, a) {
        for (var b = nb[l] - 1, E = Vb[l] - 1, c = 0; c <= b; c++) for (var f = 0; f <= E; f++) a[a.length] = l + "-" + c + "-" + f;
    }
    function wa(l) {
        if (l) {
            l = h.z542(Ya);
            Z.Utils.arrayClear(wb);
            Z.Utils.arrayClear(Jc);
            a = l.l;
            for (b = l.r; a <= b; a++) for (E = l.t, c = l.b; E <= c; E++) (f = Ya + "-" + a + "-" + E), (Jc[Jc.length] = f), (wb[wb.length] = f);
            Ba(wb, Aa, "simple", "image-backfill");
        } else {
            Z.Utils.arrayClear(Kc);
            Z.Utils.arrayClear(Lc);
            Z.Utils.arrayClear(wc);
            Z.Utils.arrayClear(ya);
            l = h.z542();
            for (var a = l.l, b = l.r; a <= b; a++)
                for (var E = l.t, c = l.b; E <= c; E++) {
                    var f = oa + "-" + a + "-" + E;
                    Kc[Kc.length] = f;
                    ya[ya.length] = f;
                }
            if (h.getStatus("initializedViewport") && 0 < Eb.length && (oa == Pe || oa == Qe || oa == Xd))
                for (a = 0, b = Eb.length; a < b; a++)
                    (E = Eb[a]) &&
                        E.t == oa &&
                        E.c >= l.l &&
                        E.c <= l.r &&
                        E.r >= l.t &&
                        E.r <= l.b &&
                        ((wc[wc.length] = E.name), (Lc[Lc.length] = E), (c = Z.Utils.arrayIndexOf(ya, E.name)), -1 != c && (ya = Z.Utils.arraySplice(ya, c, 1)));
            a = 0;
            for (b = Kb.length; a < b; a++)
                (E = Kb[a]) &&
                    E.t == oa &&
                    E.c >= l.l &&
                    E.c <= l.r &&
                    E.r >= l.t &&
                    E.r <= l.b &&
                    ((c = Z.Utils.arrayIndexOf(wc, E.name)), -1 == c && ((wc[wc.length] = E.name), (Lc[Lc.length] = E)), (E = Z.Utils.arrayIndexOf(ya, E.name)), -1 != E && (ya = Z.Utils.arraySplice(ya, E, 1)));
            if (0 != Yd) {
                a = 0;
                for (b = cc.length; a < b; a++) (E = cc[a]), (E.alpha = 1);
                Z.Utils.arrayClear(cc);
                Z.Utils.arrayClear(xc);
            }
            Zd = ya.length;
            h.traceDebugValues("tilesToDisplay", null, Kc.length, Kc);
            h.traceDebugValues("tilesInCache", null, wc.length, wc);
            h.traceDebugValues("tilesToLoad", null, ya.length, ya);
        }
    }
    function N(l, a, b, E, c, f) {
        c || Z.Utils.clearDisplay(l);
        if ("canvasCopy" == E) Z.Utils.clearDisplay(la), Qa.restore(), Qa.save(), Qa.scale(1, 1), Qa.drawImage(ob, -Ob, -Pb), Qa.restore(), Qa.save(), Qa.scale(va, va);
        else {
            c = h.z542(a);
            f = [];
            if (null === b) for (var d = 0, e = Lc.length; d < e; d++) f[d] = Lc[d];
            else if (0 < b.length)
                for (d = 0, e = b.length; d < e; d++) {
                    var m = b[d];
                    m && m.t == a && ((a == Ya && !Za) || (m.c >= c.l && m.c <= c.r && m.r >= c.t && m.r <= c.b)) && (f[f.length] = b[d]);
                }
            if (0 < f.length)
                if ((h.traceDebugValues("z622-" + l.id, null, null, f), "centerOut" == E)) for (d = Math.floor(f.length / 2), e = f.length; d < e; d++) X(l, a, f[d]), f.length - d - 1 != d && X(l, a, f[f.length - d - 1]);
                else for (d = 0, e = f.length; d < e; d++) X(l, a, f[d]);
            else h.traceDebugValues("No cached tiles in view");
            h.traceDebugValues("blankLine");
        }
    }
    function ka(l, a) {
        var b = h.z542();
        syncTransitionCanvas();
        for (var E = 0, c = a.length; E < c; E++) {
            var f = a[E];
            f && f.t == l && (l == Ya || (f.c >= b.l && f.c <= b.r && f.r >= b.t && f.r <= b.b)) && X(ob, l, f);
        }
    }
    function aa(l) {
        Qb = null;
        Qb = new Image();
        Qb.onload = U;
        Qb.onerror = Ca;
        Qb.src = l;
    }
    function U() {
        if ("undefined" !== typeof Qb) {
            var l = Z.Utils.createContainerElement("div", "testImageContainer", "inline-block", "absolute", "hidden", Y + "px", ba + "px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
            l.appendChild(Qb);
            l.removeChild(Qb);
            var l = null,
                l = Qb.width,
                a = Qb.height;
            0 != l && 0 != a
                ? t(l, a, l, a, null, null, null, null, null, null, null)
                : window.setTimeout(function () {
                      U();
                  }, 100);
        } else
            window.setTimeout(function () {
                U();
            }, 100);
    }
    function Ca() {
        Z.Utils.showMessage(Z.Utils.getResource("ERROR_UNCONVERTEDIMAGEPATHINVALID"));
    }
    function Ba(l, a, b, E) {
        var c = "undefined" !== typeof E && null !== E ? "-" + E : "";
        if (0 < l.length) {
            h.traceDebugValues("z577" + c, null, null, l);
            c = new Date().getTime();
            if ("centerOut" == b && 4 < l.length) {
                var f = [],
                    d = 0,
                    e = 0,
                    m = 0,
                    g = 0;
                for (b = 0; b < l.length; b++) {
                    var n = l[b];
                    n && ((n = new y(n, E)), (f[f.length] = n), 0 == b ? ((d = e = n.c), (m = g = n.r)) : (n.c < d ? (d = n.c) : n.c > e && (e = n.c), n.r < m ? (m = n.r) : n.r > g && (g = n.r)));
                }
                l = d + (e - d) / 2;
                E = m + (g - m) / 2;
                for (b = 0; b < f.length; b++) (f[b].r -= E), (f[b].c -= l);
                f.sort(function (l, a) {
                    return l.r * l.r + l.c * l.c - (a.r * a.r + a.c * a.c);
                });
                for (b = 0; b < f.length; b++) (f[b].r += E), (f[b].c += l), T(f[b], c, a);
            } else for (b = 0, f = l.length; b < f; b++) if ((n = l[b])) (n = new y(n, E)), T(n, c, a);
            h.traceDebugValues("blankLine");
        } else h.traceDebugValues("z577" + c, "No new tiles requested");
    }
    function y(l, a) {
        this.imagePath = Z.imagePath;
        this.name = l;
        var b = new ga(l);
        this.t = b.t;
        this.c = b.c;
        this.r = b.r;
        this.x = Math.floor(this.c * Xa);
        this.y = Math.floor(this.r * Ra);
        this.image = null;
        this.alpha = 0;
        this.url = h.formatTilePath(this.t, this.c, this.r, a);
        this.style = this.elmt = this.loadTime = null;
    }
    function ga(l) {
        this.t = parseInt(l.substring(0, l.indexOf("-")), 10);
        this.c = parseInt(l.substring(l.indexOf("-") + 1, l.lastIndexOf("-")), 10);
        this.r = parseInt(l.substring(l.lastIndexOf("-") + 1), 10);
    }
    function ua(l, a, b) {
        b = a + b * nb[l];
        a = 8 * b + md[l];
        b = Math.floor(b / kb);
        var E = b * kb,
            E = E + kb > Nb[l] ? 8 * (Nb[l] - E) : Dd;
        this.chunkStart = md[l] + b * Dd;
        this.chunkEnd = this.chunkStart + E;
        this.offsetStartInChunk = a - this.chunkStart;
        this.chunkID = l.toString() + "-" + b.toString();
    }
    function M(l, a, b) {
        b = a + b * nb[l];
        a = 4 * b + Wc[l];
        b = Math.floor(b / kb);
        var E = b * kb,
            E = E + kb > Nb[l] ? 4 * (Nb[l] - E) : $d;
        this.chunkStart = Wc[l] + b * $d;
        this.chunkEnd = this.chunkStart + E;
        this.bcStartInChunk = a - this.chunkStart;
        this.chunkID = l.toString() + "-" + b.toString();
    }
    function S(l, a, b) {
        Ke[l] = b;
        b = Wb.replace(".", "%2E");
        l = Z.tileHandlerPathFull + "?file=" + b + "&requestType=2&begin=" + l + "&end=" + a;
        new Z.NetConnector().loadXML(l);
    }
    function G(l, a) {
        for (var b = 0, E = Pa.length; b < E; b++) {
            var c = Pa[b].split(",");
            c[0] == l &&
                c[5] == a &&
                (void 0 !== c[4] && "image-display" == c[4] ? (db[db.length] = c[1] + "-" + c[2] + "-" + c[3]) : "image-backfill" == c[4] && (qb[qb.length] = c[1] + "-" + c[2] + "-" + c[3]), (Pa = Z.Utils.arraySplice(Pa, b, 1)), b--, E--);
        }
        0 < db.length && (db.sort(), (db = Z.Utils.arrayUnique(db)), h.traceDebugValues("z637", db), (b = h.getStatus("imageSaving") ? ia : V), K(db, b, "simple", "image-display"));
        0 < qb.length && (qb.sort(), (qb = Z.Utils.arrayUnique(qb)), (b = h.getStatus("imageSaving") ? z599ToSave : Aa), K(qb, b, "simple", "image-backfill"));
    }
    function K(l, a, b, c) {
        b = new Date().getTime();
        for (var d = 0, f = l.length; d < f; d++) {
            var e = null;
            if ((e = l[d]))
                (l = Z.Utils.arraySplice(l, d, 1)),
                    d--,
                    f--,
                    (index = Z.Utils.arrayIndexOfObjectValue(Mc, "name", e)),
                    -1 != index ? ((e = Mc[index]), (Mc = Z.Utils.arraySplice(Mc, index, 1)), (e.url = h.formatTilePath(e.t, e.c, e.r, c))) : (e = new y(e, c)),
                    null != e && -1 == e.url.indexOf("NaN")
                        ? (h.traceDebugValues("z577Retry", e.name + "  " + e.url), T(e, b, a))
                        : -1 == e.url.indexOf("NaN") && Z.Utils.showMessage(Z.Utils.getResource("z280-ZIF") + e.name + ".jpg", !1, Z.messageDurationShort, "center", !1);
        }
    }
    function T(l, a, b) {
        var c = l.name;
        if ("z647" == l.url.substr(0, 8)) {
            rb(l);
            a = l.name;
            b = Z.Utils.arrayIndexOf(ya, a);
            -1 != b && (ya = Z.Utils.arraySplice(ya, b, 1));
            if ("ZoomifyImageFile" == Z.tileSource || "ZoomifyPFFFile" == Z.tileSource) (b = Z.Utils.arrayIndexOf(db, a)), -1 != b && (db = Z.Utils.arraySplice(db, b, 1));
            cc[cc.length] = l;
            xc[xc.length] = a;
        } else if ("offsetLoading" == l.url) -1 == Z.Utils.arrayIndexOfObjectValue(Mc, "name", c) && (Mc[Mc.length] = l), h.traceDebugValues("z581DelayForOffset", c);
        else if ("offsetLoading" != l.url) {
            var d;
            if (b == V || b == ia) d = "image-display";
            else if (b == Aa || b == z599ToSave) d = "image-backfill";
            var f = (l.t == Pe && pf) || (l.t == Qe && of) || (l.t == Xd && nf);
            ("image-display" == d && f) || ((l.loadTime = a), h.traceDebugValues("z581-" + d, c), ph.loadImage(l.url, Z.Utils.createCallback(null, b, l), d, l));
        }
    }
    function V(l, a) {
        if (l && a && l.imagePath == Z.imagePath) {
            l.image = a;
            var b = l.name,
                c = Z.Utils.arrayIndexOf(ya, b);
            if (-1 != c) {
                ya = Z.Utils.arraySplice(ya, c, 1);
                rb(l);
                if (Z.preloadVisible && !Z.imageSet && l.t != oa) {
                    Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADING-STORINGORDRAWINGTILES") + "   Tile: " + b, !1, Z.messageDurationShort / 10, "center");
                    l.alpha = 1;
                    return;
                }
                -1 == Z.Utils.arrayIndexOf(xc, b) && ((xc[xc.length] = b), (cc[cc.length] = l));
                Z.preloadVisible &&
                    Z.imageSet &&
                    h.getViewportID() != Z.viewportCurrentID &&
                    ((b = (h.getViewportID() + 1).toString() + " of " + Z.imageSetLength.toString() + "   Tile: " + b),
                    Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADING-STORINGORDRAWINGTILES") + b, !1, Z.messageDurationShort / 10, "center"));
                Re || (Re = window.setInterval(H, 50));
                Yd = ya.length;
                if (0 == Yd) {
                    Z.useCanvas &&
                        0 < yc &&
                        (xf
                            ? (ka(oa, Kb),
                              N(la, oa, Kb, "canvasCopy", !1, "4. Updating view: all new tiles loaded"),
                              window.setTimeout(function () {
                                  Z.Utils.clearDisplay(ob);
                              }, 200),
                              (xf = !1))
                            : N(la, oa, Kb, "centerOut", !1, "4. Updating view: all new tiles loaded"));
                    for (; zc.length > yc && Kb.length > yc; ) (zc = Z.Utils.arraySplice(zc, 0, 1)), (Kb = Z.Utils.arraySplice(Kb, 0, 1));
                    Zd = 0;
                }
                h.traceDebugValues("onTileLoad", l.name, l.loadTime);
                h.updateProgress(Zd, Yd);
            }
            Se == Te + ad && h.setStatus("displayLoadedViewport", !0);
        } else ("undefined" !== typeof a && null !== a) || console.log(Z.Utils.getResource("z280") + l.name + ".jpg");
    }
    function Aa(l, a) {
        if (l && a && l.imagePath == Z.imagePath) {
            l.image = a;
            var b = l.name;
            Eb[Eb.length] = l;
            var c = Z.Utils.arrayIndexOf(wb, b);
            -1 != c && (wb = Z.Utils.arraySplice(wb, c, 1));
            if ("ZoomifyImageFile" == Z.tileSource || "ZoomifyPFFFile" == Z.tileSource) (b = Z.Utils.arrayIndexOf(qb, b)), -1 != b && (qb = Z.Utils.arraySplice(qb, b, 1));
            l.alpha = 1;
            l.t == Ya && X(ta, Ya, l);
            h.traceDebugValues("onTileBackfillPrecache", l.name);
            pg == yf && h.setStatus("precacheLoadedViewport", !0);
            h.traceDebugValues("z599", l.name);
            zf <= 0 + Af && h.setStatus("backfillLoadedViewport", !0);
            l.t == oa && V(l, a);
        } else if ("undefined" === typeof a || null === a) Z.mobileDevice ? console.log(Z.Utils.getResource("z280") + l.name + ".jpg") : Z.Utils.showMessage(Z.Utils.getResource("z280") + l.name + ".jpg");
    }
    function H() {
        for (var l = 0, a = 0, b = cc.length; a < b; a++) {
            var c = cc[a];
            c.t == oa
                ? (Z.fadeIn && 0 != Bf && 1 > c.alpha + Bf ? (c.alpha += Bf) : ((c.alpha = 1), l++), X(la, oa, c), l >= b && (window.clearInterval(Re), (Re = null), (a = b)))
                : ((cc = Z.Utils.arraySplice(cc, a, 1)), (xc = Z.Utils.arraySplice(xc, a, 1)), (c = Z.Utils.arrayIndexOf(ya, c.name)), -1 != c && (ya = Z.Utils.arraySplice(ya, c, 1)), b--);
        }
    }
    function X(l, a, b) {
        if ("z647" != b.url.substr(0, 8) && 0 != b.image.width && 0 != b.image.height) {
            var c = b.x,
                d = b.y;
            a = ja(a, 1);
            Ab = Da(Tb, h.getZoom());
            var f = 8 < Ab;
            Z.useCanvas
                ? (l == la || l == ob || (l == ta && Za) ? ((c -= Z.imageX * a), (d -= Z.imageY * a)) : l == ha && (Za || f) && ((f = h.calculateCurrentCenterCoordinates()), (c -= f.x * a), (d -= f.y * a)),
                  (a = l.getContext("2d")),
                  Z.alphaSupported && 1 > b.alpha && "transitionCanvas" != l.id && -1 == l.id.indexOf("oversizeDisplay") && "savingDisplay" != l.id && !Cf && (a.globalAlpha = b.alpha),
                  Z.imageFilters && 0 != qh.length
                      ? Cf
                          ? (-1 != l.id.indexOf("oversizeDisplay")
                                ? (a = La)
                                : -1 != l.id.indexOf("viewportDisplay")
                                ? (a = wf)
                                : -1 != l.id.indexOf("viewportBackfillDisplay")
                                ? (a = mg)
                                : -1 != l.id.indexOf("transitionCanvas")
                                ? (a = wf)
                                : "savingDisplay" == l.id && (a = Me),
                            a.drawImage(b.image, c, d))
                          : ((f = z456(b.name, b.image)), Z.Utils.clearDisplay(ob), qc.putImageData(f, 0, 0), a.drawImage(ob, c, d))
                      : a.drawImage(b.image, c, d),
                  Z.alphaSupported && 1 > b.alpha && "transitionCanvas" != l.id && "oversizeDisplay" != l.id && "savingDisplay" != l.id && !Cf && (a.globalAlpha = 1),
                  (2 != Z.debug && 4 != Z.debug) || P(l, b.name, c, d, va))
                : (l == la ? ((c -= Z.imageX * a - Ob / va), (d -= Z.imageY * a - Pb / va), (a = va)) : (a = $b),
                  b.elmt ||
                      ((b.elmt = Z.Utils.createContainerElement("img")),
                      (b.elmt.onmousedown = Z.Utils.preventDefault),
                      Z.Utils.addEventListener(b.elmt, "contextmenu", Z.Utils.preventDefault),
                      (b.elmt.src = b.url),
                      (b.style = b.elmt.style),
                      (b.style.position = "absolute"),
                      Z.Utils.renderQuality(b, Z.renderQuality),
                      Z.cssTransformsSupported && (b.style[Z.cssTransformProperty + "Origin"] = "0px 0px")),
                  b.elmt.parentNode != l && l.appendChild(b.elmt),
                  (f = b.style),
                  (f.display = "none"),
                  Z.cssTransformsSupported
                      ? (f[Z.cssTransformProperty] = [
                            "matrix(",
                            ((b.image.width / b.elmt.width) * a).toFixed(8),
                            ",0,0,",
                            ((b.image.height / b.elmt.height) * a).toFixed(8),
                            ",",
                            (c * a).toFixed(8),
                            Z.cssTransformNoUnits ? "," : "px,",
                            (d * a).toFixed(8),
                            Z.cssTransformNoUnits ? ")" : "px)",
                        ].join(""))
                      : ((f.width = b.image.width * a + "px"), (f.height = b.image.height * a + "px"), (f.left = c * a + "px"), (f.top = d * a + "px")),
                  (f.display = "inline-block"),
                  Z.Utils.setOpacity(b, b.alpha),
                  (2 != Z.debug && 4 != Z.debug) || P(l, b.name, c, d, a));
            l == la ? (h.traceDebugValues("z507", b.name), Se == ae && h.setStatus("displayDrawnViewport", !0)) : (h.traceDebugValues("displayBackfillTile", b.name), zf <= Df && h.setStatus("backfillDrawnViewport", !0));
        }
    }
    function P(l, a, b, c, d) {
        if (Z.useCanvas) {
            var f = parseInt(Z.Utils.getResource("z129"), 10),
                e = parseInt(Z.Utils.getResource("z160"), 10),
                h = parseInt(Z.Utils.getResource("z151"), 10),
                f = Math.round(f * d),
                e = 2 * (f < e ? e : f > h ? h : f);
            l = l.getContext("2d");
            l.font = e + "px verdana";
            l.textAlign = "left";
            l.textBaseline = "top";
            e = (Xa * d) / 2;
            d = (Ra * d) / 2;
            l.fillStyle = "#FFFFFF";
            l.fillText(a, b + e, c + d);
            l.fillStyle = "#000000";
            l.fillText(a, b + e + 1, c + d + 1);
        } else {
            var f = parseInt(Z.Utils.getResource("z129"), 10),
                e = parseInt(Z.Utils.getResource("z160"), 10),
                h = parseInt(Z.Utils.getResource("z151"), 10),
                f = Math.round(f * d),
                m = 2 * (f < e ? e : f > h ? h : f),
                e = parseInt(Z.Utils.getResource("z130"), 10) * d,
                h = Z.Utils.createContainerElement("div", "tileNameTextBox", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "none", "0px", "transparent none", "0px", e + "px", "nowrap"),
                f = document.createTextNode(a);
            h.appendChild(f);
            l.appendChild(h);
            Z.Utils.setTextNodeStyle(f, "white", "verdana", m + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
            var g = Z.Utils.createContainerElement("div", "tileNameTextBox2", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "none", "0px", "transparent none", "0px", e + "px", "nowrap"),
                n = document.createTextNode(a);
            g.appendChild(n);
            l.appendChild(g);
            Z.Utils.setTextNodeStyle(n, "black", "verdana", m + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
            e = parseFloat(h.style.padding);
            l = parseFloat(Z.Utils.getElementStyleProperty(h, "width"));
            isNaN(l) && ((l = parseFloat(Z.Utils.getResource("z115"))), (l = parseFloat(h.style.fontSize) / l), (l = Math.round(parseFloat(a.length * l))));
            a = (Xa * d) / 2;
            m = (Ra * d) / 2;
            h.style.left = b * d + (a - l / 2 - e) + "px";
            h.style.top = c * d + m + "px";
            g.style.left = 1 + b * d + (a - l / 2 - e) + "px";
            g.style.top = 1 + c * d + m + "px";
            Z.Utils.addEventListener(h, "contextmenu", Z.Utils.preventDefault);
            Z.Utils.disableTextInteraction(f);
            Z.Utils.addEventListener(g, "contextmenu", Z.Utils.preventDefault);
            Z.Utils.disableTextInteraction(n);
        }
    }
    function R(l, a) {
        var b = ja(a, 1),
            c = Math.floor((l.l * b) / Xa),
            d = Math.floor((l.r * b) / Xa),
            f = Math.floor((l.t * b) / Ra),
            b = Math.floor((l.b * b) / Ra);
        0 > c && (c = 0);
        d > nb[a] - 1 && (d = nb[a] - 1);
        0 > f && (f = 0);
        b > Vb[a] - 1 && (b = Vb[a] - 1);
        this.l = c;
        this.r = d;
        this.t = f;
        this.b = b;
    }
    function na(l, a, b, c, d, f, e, h, m) {
        "undefined" === typeof h || null === h
            ? ((this.l = l + b / e), (this.r = l + c / e), (this.t = a + d / e), (this.b = a + f / e))
            : ((e = Y / Bb[h]), (h = ba / Mb[h]), (this.l = l + b * e), (this.r = l + c * e), (this.t = a + d * h), (this.b = a + f * h));
        m && ((this.l -= 256 - (this.l % 256)), (this.r += 256 - (this.r % 256)), (this.t -= 256 - (this.t % 256)), (this.b += 256 - (this.b % 256)));
    }
    function ja(l, a) {
        return (Bb[l] / Z.imageW) * a;
    }
    function Da(l, a) {
        return a / (Bb[l] / Z.imageW);
    }
    function Ga(l, a, b, c, d) {
        if (Z.constrainPan) {
            b = "undefined" !== typeof b && null !== b ? b : Z.imageZ;
            c = "undefined" !== typeof c && null !== c ? Math.round(c) : Math.round(Z.imageR);
            0 > c && (c += 360);
            var f = l,
                e = a;
            "image" == d && ((a = h.convertImageCoordsToViewportEdgeCoords(l, a, b, c)), (l = a.x), (a = a.y));
            var m = Z.imageW,
                g = Z.imageH,
                n = Math.round(m * b),
                k = Math.round(g * b);
            Math.round((m * b) / 2);
            Math.round((g * b) / 2);
            var m = Y,
                g = ba,
                r = Math.round(0.1 * Y),
                p = Math.round(0.1 * ba),
                u = Math.round(0.5 * Y),
                A = Math.round(0.5 * ba),
                v,
                w;
            v = u - ib + (Z.imageCtrX - Z.imageX) * b + l;
            w = A - jb + (Z.imageCtrY - Z.imageY) * b + a;
            var lb = v + n / 2,
                q = w - k / 2,
                x = v + n / 2,
                t = w + k / 2,
                ia = v - n / 2,
                C = w + k / 2,
                B = Z.Utils.getPositionRotated(v - n / 2, w - k / 2, v, w, c),
                lb = Z.Utils.getPositionRotated(lb, q, v, w, c),
                x = Z.Utils.getPositionRotated(x, t, v, w, c),
                C = Z.Utils.getPositionRotated(ia, C, v, w, c);
            v = Math.min(B.x, lb.x, x.x, C.x);
            w = Math.min(B.y, lb.y, x.y, C.y);
            ia = Math.max(B.x, lb.x, x.x, C.x);
            B = Math.max(B.y, lb.y, x.y, C.y);
            ia - v > m || !Z.constrainPanStrict
                ? 3 == Z.constrainPanLimit
                    ? (l = 0 < v ? l - v : ia < m ? l - (ia - m) : l)
                    : 2 == Z.constrainPanLimit
                    ? (l = v > u ? l - (v - u) : ia < u ? l - (ia - u) : l)
                    : 1 == Z.constrainPanLimit && (l = v > 9 * r ? l - (v - 9 * r) : ia < r ? l - (ia - r) : l)
                : (l = v > u - n / 2 ? l - (v - (u - n / 2)) : ia < u + n / 2 ? l - (ia - (u + n / 2)) : l);
            B - w > g || !Z.constrainPanStrict
                ? 3 == Z.constrainPanLimit
                    ? (a = 0 < w ? a - w : B < g ? a - (B - g) : a)
                    : 2 == Z.constrainPanLimit
                    ? (a = w > A ? a - (w - A) : B < A ? a - (B - A) : a)
                    : 1 == Z.constrainPanLimit && (a = w > 9 * p ? a - (w - 9 * p) : B < p ? a - (B - p) : a)
                : (a = w > A - k / 2 ? a - (w - (A - k / 2)) : B < A + k / 2 ? a - (B - (A + k / 2)) : a);
            "image" == d && ((a = h.convertViewportEdgeCoordsToImageCoords(l, a, b, c)), (l = a.x), (a = a.y));
            if (l != f || a != e) (l = Math.round(l)), (a = Math.round(a)), Z.Utils.validateCallback("panConstrained");
        }
        return new Z.Utils.Point(l, a);
    }
    function Ta(l) {
        l > Z.maxZ ? ((l = Z.maxZ), Z.Utils.validateCallback("zoomConstrainedMax")) : l < Z.minZ && ((l = Z.minZ), Z.Utils.validateCallback("zoomConstrainedMin"));
        return l;
    }
    function Ua(l) {
        Z.rotationFree || (l = 90 * Math.round(Math.abs(l) / 90) * Z.Utils.getSign(l));
        -360 >= l ? (l += 360) : 360 <= l && (l -= 360);
        return l;
    }
    function eb() {
        Z.comparison && 0 != Ma ? Z.Navigator2 && Z.Navigator2.syncToViewport() : Z.Navigator && Z.Navigator.syncToViewport();
    }
    function rb(l) {
        if (0 < yc) {
            var a = Z.Utils.arrayIndexOf(zc, l.name);
            -1 != a && ((zc = Z.Utils.arraySplice(zc, a, 1)), (Kb = Z.Utils.arraySplice(Kb, a, 1)));
            zc[zc.length] = l.name;
            Kb[Kb.length] = l;
        }
    }
    function Ka() {
        window.clearTimeout(Ed);
        Ed = null;
        pd = (new Date().getTime() - tilesTimeStart) / 1e3;
        var a = Ue * pd,
            a = bd && ad < a,
            b = bd && ad >= be;
        if (2 == Z.debug || 3 == Z.debug)
            Z.Utils.trace("View validation-time elapsed: " + pd),
                0 < bd && (a ? Z.Utils.trace("Loading delay - re-calling updateView") : b ? Z.Utils.trace("Display delay - re-calling updateView") : Z.Utils.trace("Progress slow, resetting timer")),
                Z.Utils.trace(""),
                (Z.traces.scrollTop = Z.traces.scrollHeight),
                Z.Utils.traceTileSpeed(pd, Ue);
        0 < bd
            ? Ve < rh
                ? a || b
                    ? ((Ve += 1), h.updateView(!0))
                    : (Ed = window.setTimeout(Ka, qg))
                : console.log(Z.Utils.getResource("ERROR_VALIDATEVIEW"))
            : ((Ve = 0), Z.Utils.validateCallback("viewUpdateComplete"), Z.Utils.validateCallback("viewUpdateCompleteGetLabelIDs"));
    }
    function A() {
        cd = new Image();
        rg = parseFloat(Z.Utils.getResource("z234"));
        cd.url = Z.watermarkPath;
        cd.onload = Va;
        cd.onerror = p;
        cd.src = Z.watermarkPath;
    }
    function Va() {
        if (Ja)
            for (
                var a = parseFloat(Z.Utils.getResource("z235")),
                    b = parseFloat(Z.Utils.getResource("z237")),
                    D = parseFloat(Z.Utils.getResource("z236")),
                    c = h.getZoom(),
                    d = (Z.imageW * c - Ja.width) / 2,
                    f = (Z.imageH * c - Ja.height) / 2,
                    e = (Z.imageW / 2 - Z.imageX) * c,
                    m = (Z.imageH / 2 - Z.imageY) * c,
                    g = c < a ? a : c,
                    b = Math.round(Z.imageW / b),
                    D = Math.round(Z.imageH / D),
                    a = h.z541(),
                    n = cd.width * g,
                    g = cd.height * g,
                    k = 0,
                    r = 0,
                    p = 1;
                p <= b;
                p++
            )
                for (var u = 1; u <= D; u++) {
                    var A = Math.round((Z.imageW / (b + 1)) * p),
                        v = Math.round((Z.imageH / (D + 1)) * u);
                    if (A > a.l && A < a.r && v > a.t && v < a.b) {
                        var w = Math.round(A * c - n / 2 - d + e),
                            ia = Math.round(v * c - g / 2 - f + m);
                        if (4e3 < Z.imageW) {
                            v = r + 100;
                            if (w < k + 100 && ia < v) continue;
                            k = w;
                            r = ia;
                        }
                        var v = n,
                            A = g,
                            lb = ia,
                            ia = cd.cloneNode(!1);
                        Z.Utils.setOpacity(ia, rg);
                        ia.width = v;
                        ia.height = A;
                        v = Z.Utils.createContainerElement("div", "wiC", "inline-block", "absolute", "hidden", v + "px", A + "px", w + "px", lb + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
                        v.appendChild(ia);
                        Ja.appendChild(v);
                        Z.Utils.addEventListener(ia, "contextmenu", Z.Utils.preventDefault);
                        Z.Utils.addEventListener(ia, "mousedown", Z.Utils.preventDefault);
                    }
                }
    }
    function p() {
        Z.Utils.showMessage(Z.Utils.getResource("z292") + this.url);
    }
    function ia(a, b, D) {}
    function ub() {
        if (Z.Utils.stringValidate(Z.geoCoordinatesPath)) {
            var a = Z.Utils.cacheProofPath(Z.geoCoordinatesPath);
            new Z.NetConnector().loadXML(a);
        }
    }
    function Hb(a) {
        if (Z.Utils.stringValidate(Ib))
            if (Z.simplePath) dataPath = Ib;
            else {
                if (".xml" != Ib.toLowerCase().substring(Ib.length - 4, Ib.length)) {
                    var b = Z.tour ? Z.Utils.getResource("z227") : Z.Utils.getResource("z135");
                    Ib = Ib + "/" + b;
                }
                dataPath = Z.Utils.cacheProofPath(Ib);
            }
        else
            Z.Utils.stringValidate(mb) &&
                (Z.simplePath
                    ? (dataPath = mb)
                    : (".json" != mb.toLowerCase().substring(mb.length - 5, mb.length) && ".xml" != mb.toLowerCase().substring(mb.length - 4, mb.length) && (mb = mb + "/" + Z.Utils.getResource("z69")),
                      (dataPath = Z.Utils.cacheProofPath(mb))));
        "undefined" !== typeof dataPath && Z.Utils.stringValidate(dataPath)
            ? ((vpIDTemp = Z.imageSet ? a : null), (a = new Z.NetConnector()), -1 != dataPath.toLowerCase().indexOf(".xml") ? a.loadXML(dataPath, vpIDTemp) : -1 != dataPath.toLowerCase().indexOf(".json") && a.loadJSON(dataPath, vpIDTemp))
            : "string" === typeof Z.annotationXMLText && Z.Utils.stringValidate(Z.annotationXMLText)
            ? ((a = Z.Utils.xmlConvertTextToDoc(Z.annotationXMLText)), h.parseAnnotationsXML(a))
            : "undefined" !== typeof Z.annotationJSONObject && "object" === typeof Z.annotationJSONObject && null !== Z.annotationJSONObject
            ? ((a = Z.Utils.jsonConvertObjectToXMLText(Z.annotationJSONObject)), (a = Z.Utils.xmlConvertTextToDoc(a)), h.parseAnnotationsXML(a))
            : Z.measureVisible && null == Z.editMode && ((a = Z.Utils.xmlConvertTextToDoc("<ZAS></ZAS>")), h.parseAnnotationsXML(a));
    }
    function fa(a, b) {
        var D = Z.Utils.arrayIndexOfObjectValue(kc, "media", a.media);
        if (-1 != D) {
            var c = new Image();
            c.src = a.media;
            var d = c.width,
                c = c.height;
            kc[D].element && (a.image = kc[D].element.cloneNode(!1));
            a.iW = d;
            a.iH = c;
            b && ((D = new lc()), Nc(a, D));
        } else (kc[kc.length] = { media: a.media, element: null }), (D = new Date().getTime()), (d = a.media), sg.loadImage(d, Z.Utils.createCallback(null, lb, d, D), "hotspot");
    }
    function m(a) {
        var b;
        b = a.getAttribute("ID");
        this.id = "" != b ? b : dd("labelExternal");
        b = a.getAttribute("INTERNALID");
        this.internalID = isNaN(parseInt(b)) ? (ra ? dd("hotspot") : dd("label")) : b;
        this.poiID = a.getAttribute("POIID");
        b = a.getAttribute("NAME");
        this.name = "" != b ? b : this.id;
        this.mediaType = a.getAttribute("MEDIATYPE");
        this.media = a.getAttribute("MEDIA");
        this.image = null;
        b = parseFloat(a.getAttribute("X"));
        this.x = isNaN(b) ? 0 : b;
        b = parseFloat(a.getAttribute("Y"));
        this.y = isNaN(b) ? 0 : b;
        b = parseFloat(a.getAttribute("ZOOM"));
        this.z = isNaN(b) ? -1 : b;
        b = parseFloat(a.getAttribute("XSCALE"));
        this.xScale = isNaN(b) ? 100 : b;
        b = parseFloat(a.getAttribute("YSCALE"));
        this.yScale = isNaN(b) ? 100 : b;
        b = parseFloat(a.getAttribute("RADIUS"));
        this.radius = isNaN(b) ? null : b;
        b = this.media;
        var D = this.mediaType,
            c = !1,
            d = !1;
        b &&
            ((c =
                -1 != b.indexOf("/circle.") ||
                -1 != b.indexOf("/square.") ||
                -1 != b.indexOf("/triangle.") ||
                -1 != b.indexOf("/arrowDownLeft.") ||
                -1 != b.indexOf("/arrowDownRight.") ||
                -1 != b.indexOf("/arrowUpLeft.") ||
                -1 != b.indexOf("/arrowUpRight.") ||
                -1 != b.indexOf("/arrowUp.") ||
                -1 != b.indexOf("/arrowDown.") ||
                -1 != b.indexOf("/arrowLeft.") ||
                -1 != b.indexOf("/arrowRight.") ||
                -1 != b.indexOf("/lineHorizontal.") ||
                -1 != b.indexOf("/lineVertical.")),
            (d =
                "counter" == b ||
                "circle" == b ||
                "square" == b ||
                "triangle" == b ||
                "arrowDown" == b ||
                "arrowDownLeft" == b ||
                "arrowLeft" == b ||
                "arrowUpLeft" == b ||
                "arrowUp" == b ||
                "arrowUpRight" == b ||
                "arrowRight" == b ||
                "arrowDownRight" == b ||
                "lineHorizontal" == b ||
                "lineVertical" == b));
        ("counter" != D && "icon" != D) || (b && "External Graphics File" == b) || !(d || (c && Z.labelIconsInternal))
            ? (this.iH = this.iW = null)
            : ((this.iW = this.radius ? 2 * this.radius : tg), (this.iH = this.radius ? 2 * this.radius : ug));
        b = parseFloat(a.getAttribute("ZMIN"));
        this.zMin = isNaN(b) ? 0 : b;
        b = parseFloat(a.getAttribute("ZMAX"));
        this.zMax = isNaN(b) ? 0 : b;
        b = parseFloat(a.getAttribute("ROTATION"));
        this.rotation = isNaN(b) ? 0 : b;
        this.clickURL = a.getAttribute("CLICKURL");
        this.urlTarget = a.getAttribute("URLTARGET");
        b = a.getAttribute("ROLLOVER");
        this.rollover = "1" == b || "true" == b;
        this.caption = a.getAttribute("CAPTION");
        this.comment = a.getAttribute("COMMENT");
        this.tooltip = a.getAttribute("TOOLTIP");
        this.user = a.getAttribute("USER");
        this.initials = a.getAttribute("INITIALS");
        this.date = a.getAttribute("DATE");
        this.textColor = Z.Utils.stringValidateColorValue(a.getAttribute("TEXTCOLOR"));
        this.backColor = Z.Utils.stringValidateColorValue(a.getAttribute("BACKCOLOR"));
        this.lineColor = Z.Utils.stringValidateColorValue(a.getAttribute("LINECOLOR"));
        this.fillColor = Z.Utils.stringValidateColorValue(a.getAttribute("FILLCOLOR"));
        b = a.getAttribute("TEXTVISIBLE");
        this.textVisible = "false" != b && "0" != b && Z.captionTextVisible;
        b = a.getAttribute("BACKVISIBLE");
        this.backVisible = "false" != b && "0" != b && Z.captionBackVisible;
        b = a.getAttribute("LINEVISIBLE");
        this.lineVisible = "false" != b && "0" != b && Z.polygonLineVisible;
        b = a.getAttribute("FILLVISIBLE");
        this.fillVisible = ("false" != b && "0" != b) || Z.polygonFillVisible;
        b = a.getAttribute("CAPTIONPOSITION");
        this.captionPosition = Z.Utils.stringValidate(b) ? b : "8";
        b = a.getAttribute("SAVED");
        this.saved = null === b ? !0 : b;
        this.visibility = !0;
        b = a.getElementsByTagName("CAPTION");
        0 < b.length && (this.captionHTML = unescape(Z.Utils.xmlConvertDocToText(b[0])));
        b = a.getElementsByTagName("TOOLTIP");
        0 < b.length && (this.tooltipHTML = unescape(Z.Utils.xmlConvertDocToText(b[0])));
        this.popup = a.getAttribute("POPUP");
        this.popupImage = null;
        b = parseFloat(a.getAttribute("POPOFFSETX"));
        this.popupOffsetX = isNaN(b) ? 0 : b;
        b = parseFloat(a.getAttribute("POPOFFSETY"));
        this.popupOffsetY = isNaN(b) ? 0 : b;
        if (("freehand" == a.getAttribute("MEDIA") || "rectangle" == a.getAttribute("MEDIA") || "polygon" == a.getAttribute("MEDIA") || "measure" == a.getAttribute("MEDIA")) && 0 < a.getElementsByTagName("POLYGON").length) {
            b = a.getElementsByTagName("POLYGON")[0];
            this.polyClosed = "0" != b.getAttribute("CLOSED");
            b = b.getElementsByTagName("POINT");
            D = [];
            c = 0;
            for (d = b.length; c < d; c++) {
                var f = parseFloat(b[c].getAttribute("X")),
                    f = isNaN(f) ? 0 : f,
                    e = parseFloat(b[c].getAttribute("Y")),
                    e = isNaN(e) ? 0 : e;
                D[D.length] = { x: f, y: e };
            }
            this.polygonPts = D;
        }
        this.audio = a.getAttribute("AUDIO");
        Z.Utils.stringValidate(this.audio) && (Z.audioContent = !0);
        b = parseFloat(a.getAttribute("SHOWFOR"));
        this.showFor = isNaN(b) ? 0 : b;
        this.transition = a.getAttribute("TRANSITION");
        b = parseFloat(a.getAttribute("CHANGEFOR"));
        this.changeFor = isNaN(b) ? 0 : b;
        this.category = a.getAttribute("CATEGORY");
        this.zIndex = x.length.toString();
        b = a.getAttribute("EDITABLE");
        this.editable = "false" != b && "0" != b;
    }
    function n(a, b, D) {
        if (a && b && D) {
            b = new lc();
            for (var c = 0, d = x.length; c < d; c++) {
                var f = x[c];
                if (f.popup == a) {
                    var e = Z.Utils.arrayIndexOfObjectValue(mc, "popup", a);
                    -1 != e ? (mc[e].element = D) : (mc[mc.length] = { popup: a, element: D });
                    f.popupImage = D.cloneNode(!1);
                    Nc(f, b);
                }
            }
        } else Z.Utils.showMessage(Z.Utils.getResource("ERROR_HOTSPOTPOPUPPATHINVALID"), !0, null, "center");
    }
    function lb(a, b, D) {
        if (a && b && D) {
            b = new lc();
            for (var c = 0, d = x.length; c < d; c++) {
                var f = x[c];
                if (f.media == a) {
                    var e = Z.Utils.arrayIndexOfObjectValue(kc, "media", a);
                    -1 != e ? (kc[e].element = D) : (kc[kc.length] = { media: a, element: D });
                    f.image = D.cloneNode(!1);
                    f.iW = D.width;
                    f.iH = D.height;
                    Nc(f, b);
                }
            }
        } else Z.Utils.showMessage(Z.Utils.getResource("ERROR_HOTSPOTMEDIAPATHINVALID"), !0, null, "center");
    }
    function r() {
        pa && h.getStatus("initializedViewport") && (Z.Utils.clearDisplay(pa), cb && Z.Utils.clearDisplay(cb), Na && Z.Utils.clearDisplay(Na), "inline-block" == pb.display && Fd());
    }
    function Fd() {
        for (var a = new lc(), b = 0, D = x.length; b < D; b++) Nc(x[b], a);
        0 == pa.childNodes.length &&
            ((a = Z.Utils.createContainerElement("div", "hotspotImmortal", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal")), pa.appendChild(a));
    }
    function Nc(a, b) {
        if (0 < ce.length) {
            var D = Z.Utils.arrayIndexOf(ce, a.id);
            if (-1 == D) return;
        } else if (0 < de.length && ((D = Z.Utils.arrayIndexOf(de, a.internalID)), -1 == D)) return;
        var D = Math.round(100 * b.currentZ),
            c = -1 == a.zMin ? Math.round(100 * Z.initialZ) : Math.round(a.zMin),
            d = -1 == a.zMax ? Math.round(100 * Z.initialZ) : Math.round(a.zMax);
        if ((0 == c || c <= D) && (0 == d || d >= D)) {
            if (!Z.hotspotsDrawOnlyInView || (a.x + ed > b.box.l && a.x - ed < b.box.r && a.y + ed > b.box.t && a.y - ed < b.box.b)) {
                var D = a.media,
                    c = a.mediaType,
                    f = (d = !1);
                D &&
                    ((d =
                        -1 != D.indexOf("/circle.") ||
                        -1 != D.indexOf("/square.") ||
                        -1 != D.indexOf("/triangle.") ||
                        -1 != D.indexOf("/arrowDownLeft.") ||
                        -1 != D.indexOf("/arrowDownRight.") ||
                        -1 != D.indexOf("/arrowUpLeft.") ||
                        -1 != D.indexOf("/arrowUpRight.") ||
                        -1 != D.indexOf("/arrowUp.") ||
                        -1 != D.indexOf("/arrowDown.") ||
                        -1 != D.indexOf("/arrowLeft.") ||
                        -1 != D.indexOf("/arrowRight.") ||
                        -1 != D.indexOf("/lineHorizontal.") ||
                        -1 != D.indexOf("/lineVertical.")),
                    (f =
                        "counter" == D ||
                        "circle" == D ||
                        "square" == D ||
                        "triangle" == D ||
                        "arrowDown" == D ||
                        "arrowDownLeft" == D ||
                        "arrowLeft" == D ||
                        "arrowUpLeft" == D ||
                        "arrowUp" == D ||
                        "arrowUpRight" == D ||
                        "arrowRight" == D ||
                        "arrowDownRight" == D ||
                        "lineHorizontal" == D ||
                        "lineVertical" == D));
                ("counter" != c && "icon" != c) || (D && "External Graphics File" == D) || !(f || (d && Z.labelIconsInternal)) ? D && "polygon" == D && We(a) : vg(a, b);
            }
            (!Z.hotspotsDrawOnlyInView || (a.x > b.box.l && a.x < b.box.r && a.y > b.box.t && a.y < b.box.b)) && wg(a, b, null, Z.mouseIsDown || 0 == a.rollover);
        }
    }
    function wg(l, b, D, c) {
        -1 != Z.Utils.arrayIndexOfObjectValue(x, "internalID", l.internalID) && xg(l.internalID);
        Z.useCanvas && "polygon" == l.media && l.polygonPts && ((D = Z.Utils.polygonDimensions(l.polygonPts, D)), (l.iW = D.x), (l.iH = D.y));
        D = !Z.Utils.stringValidate(l.media);
        var d = !Z.Utils.stringValidate(l.caption) && !Z.Utils.stringValidate(l.captionHTML) && "measure" != l.mediaType,
            f = null === l.iW || null === l.iH,
            e = "polygon" != l.media;
        if (!(D && d && f && e)) {
            f = b.currentZ / ("polygon" != l.media ? l.z / 100 : 1);
            "polygon" != l.media && (0 < b.constrainedScaleMin && f < b.constrainedScaleMin && (f = b.constrainedScaleMin), 0 < b.constrainedScaleMax && f > b.constrainedScaleMax && (f = b.constrainedScaleMax));
            D = (l.xScale / 100) * f * l.iW;
            var f = (l.yScale / 100) * f * l.iH,
                m;
            "placeholder" != l.media && l.image && ((m = l.image), (m.align = "top"), (m.width = D), (m.height = f));
            var g = Math.round(l.x * b.currentZ - D / 2 - b.displayOffsetL + b.imageOffsetL),
                n = Math.round(l.y * b.currentZ - f / 2 - b.displayOffsetT + b.imageOffsetT),
                k = (e = null);
            d || (Z.captionBoxes || "measure" == l.mediaType ? (e = Ef(l, b)) : ((k = Ef(l, b, !0, !0)), (e = Ef(l, b, !0, !1))));
            b = Z.Utils.createContainerElement("div", "hCloak", "inline-block", "absolute", "visible");
            g = Z.Utils.createContainerElement(
                "div",
                "hot" + l.internalID.toString() + (Z.imageSet ? "-" + a.toString() : ""),
                "inline-block",
                "absolute",
                "visible",
                D + "px",
                f + "px",
                g + "px",
                n + "px",
                "none",
                "0px",
                "transparent none",
                "0px",
                "0px",
                "normal"
            );
            "undefined" === typeof Xe || null === Xe || "TOOLTIP" == Xe ? (g.title = Z.Utils.stringValidate(l.tooltip) ? l.tooltip : "") : "COMMENT" == Xe && (g.title = Z.Utils.stringValidate(l.comment) ? l.comment : "");
            if (!Z.labelClickSelect && Z.Utils.stringValidate(l.clickURL)) {
                if (null !== Z.editMode) Z.Utils.addEventListener(b, "mousedown", sh), Z.Utils.addEventListener(b, "touchstart", th);
                else if ("function" == l.clickURL)
                    (C = l.internalID),
                        Z.Utils.addEventListener(g, "mousedown", Ff),
                        Z.Utils.addEventListener(g, "touchstart", Ff),
                        Z.Utils.addEventListener(g, "touchmove", Ff),
                        Z.Utils.addEventListener(g, "mouseup", Gf),
                        Z.Utils.addEventListener(g, "touchend", Gf),
                        Z.Utils.addEventListener(g, "touchcancel", Gf);
                else {
                    if (m) {
                        var r = document.createElement("a");
                        r.setAttribute("href", l.clickURL);
                        r.setAttribute("target", l.urlTarget);
                        r.setAttribute("outline", "none");
                        r.appendChild(m);
                        m.style.cursor = "help";
                        m.style.border = "none";
                    }
                    if (e) {
                        var p = document.createElement("a");
                        p.setAttribute("href", l.clickURL);
                        p.setAttribute("target", l.urlTarget);
                        p.setAttribute("outline", "none");
                        k && (p.appendChild(k), (k.style.cursor = "help"));
                        p.appendChild(e);
                        e.style.cursor = "help";
                    }
                    b.style.border = "none";
                }
                null === Z.editMode && (Z.clickZoom || Z.clickPan) && (Z.Utils.addEventListener(g, "mousedown", uh), Z.Utils.addEventListener(g, "touchstart", vh));
            }
            !Z.labelClickSelect && Z.Utils.stringValidate(l.clickURL) && null === Z.editMode && "function" != l.clickURL
                ? (r && b.appendChild(r), p && b.appendChild(p))
                : (m && b.appendChild(m), k && b.appendChild(k), e && b.appendChild(e));
            "placeholder" != l.popup &&
                l.popupImage &&
                ((n = l.popupImage),
                (n.style.display = "none"),
                (n.id = "popup"),
                (r = Z.Utils.createContainerElement("div", "hPopupContainer", "inline-block", "absolute", "visible")),
                r.appendChild(n),
                b.appendChild(r),
                (p = -(n.width / 2) + D / 2),
                (n = -(n.height / 2) + f / 2),
                (p = 0 != l.popupOffsetX ? l.popupOffsetX + p : p),
                (n = 0 != l.popupOffsetY ? l.popupOffsetY + n : n),
                0 != p && 0 != n && ((r.style.left = p + "px"), (r.style.top = n + "px")));
            g.appendChild(b);
            pa.appendChild(g);
            g.zIndex = l.zIndex;
            d ||
                (!Z.captionBoxes && "measure" != l.mediaType) ||
                !(p = (Z.Utils.stringValidate(l.backColor) ? l.backColor : yg).toString()) ||
                ((d = Z.Utils.hexToRGB(p).r), (r = Z.Utils.hexToRGB(p).g), (p = Z.Utils.hexToRGB(p).b), (e.style.backgroundColor = "rgba(" + d + "," + r + "," + p + "," + wh + ")"));
            l.rollover && (b.rollover = l.rollover);
            g.internalID = l.internalID;
            c || h.setHotspotVisibility(g, !l.rollover && l.visibility);
            m && ((d = h.getRotation()), 0 != d && Z.Utils.rotateElement(m.style, -d), (c = this.rotation), "undefined" !== typeof c && null !== c && 0 != c && Z.Utils.rotateElement(g, c));
            k && Hf(l, k, D, f, !0);
            Hf(l, e, D, f);
            l.rollover && (Z.Utils.addEventListener(g, "mouseover", xh), Z.Utils.addEventListener(g, "mouseout", yh));
            l.popup && (Z.Utils.addEventListener(g, "mouseover", zh), Z.Utils.addEventListener(g, "mouseout", Ah));
            Z.Utils.addEventListener(g, "mousedown", Z.Utils.preventDefault);
            Z.Utils.addEventListener(g, "contextmenu", Z.Utils.preventDefault);
        }
    }
    function lc(a) {
        pa &&
            ((this.box = h.z541(a)),
            (this.currentZ = h.getZoom()),
            (this.constrainedScale = this.currentZ < ee ? ee : this.currentZ > fe ? fe : this.currentZ),
            (this.constrainedScaleMax = fe),
            (this.constrainedScaleMin = ee),
            (this.displayOffsetL = (Z.imageW * this.currentZ - pa.width) / 2),
            (this.displayOffsetT = (Z.imageH * this.currentZ - pa.height) / 2),
            (this.imageOffsetL = (Z.imageW / 2 - Z.imageX) * this.currentZ),
            (this.imageOffsetT = (Z.imageH / 2 - Z.imageY) * this.currentZ));
    }
    function nc(a) {
        if ("undefined" === typeof a || null === a) a = document.getElementById("progressTextBox");
        var b = null;
        -1 != a.id.indexOf("hot") && -1 == a.id.indexOf("hotspotDisplay")
            ? (b = a)
            : a.parentNode && -1 != a.parentNode.id.indexOf("hot") && -1 == a.parentNode.id.indexOf("hotspotDisplay")
            ? (b = a.parentNode)
            : a.parentNode.parentNode && -1 != a.parentNode.parentNode.id.indexOf("hot") && -1 == a.parentNode.parentNode.id.indexOf("hotspotDisplay")
            ? (b = a.parentNode.parentNode)
            : a.parentNode.parentNode.parentNode && -1 != a.parentNode.parentNode.parentNode.id.indexOf("hot") && -1 == a.parentNode.parentNode.parentNode.id.indexOf("hotspotDisplay") && (b = a.parentNode.parentNode.parentNode);
        return b;
    }
    function ge(a, b, D) {
        var c = b.id.substring(3, b.id.length),
            c = Z.Utils.arrayIndexOfObjectValue(x, "internalID", c);
        if (-1 != c) {
            var c = x[c],
                d = c.media,
                f = c.mediaType,
                e =
                    -1 != d.indexOf("/circle.") ||
                    -1 != d.indexOf("/square.") ||
                    -1 != d.indexOf("/triangle.") ||
                    -1 != d.indexOf("/arrowDownLeft.") ||
                    -1 != d.indexOf("/arrowDownRight.") ||
                    -1 != d.indexOf("/arrowUpLeft.") ||
                    -1 != d.indexOf("/arrowUpRight.") ||
                    -1 != d.indexOf("/arrowUp.") ||
                    -1 != d.indexOf("/arrowDown.") ||
                    -1 != d.indexOf("/arrowLeft.") ||
                    -1 != d.indexOf("/arrowRight.") ||
                    -1 != d.indexOf("/lineHorizontal.") ||
                    -1 != d.indexOf("/lineVertical."),
                f =
                    ("counter" == f || "icon" == f) &&
                    (!d || "External Graphics File" != d) &&
                    ("counter" == d ||
                        "circle" == d ||
                        "square" == d ||
                        "triangle" == d ||
                        "arrowDown" == d ||
                        "arrowDownLeft" == d ||
                        "arrowLeft" == d ||
                        "arrowUpLeft" == d ||
                        "arrowUp" == d ||
                        "arrowUpRight" == d ||
                        "arrowRight" == d ||
                        "arrowDownRight" == d ||
                        "lineHorizontal" == d ||
                        "lineVertical" == d ||
                        (e && Z.labelIconsInternal)),
                d = d && "polygon" == d;
            if ("mouseup" == a.type || ("mousemove" == a.type && (f || d))) {
                e = D.x -= b.mouseXOffset - parseFloat(b.style.width) / 2;
                b = D.y -= b.mouseYOffset - parseFloat(b.style.height) / 2;
                b = new Z.Utils.Point(e, b);
                a = h.getClickCoordsInImage(a, h.getZoom(), b);
                if (f || d) d && zg(c, a), he();
                c.x = a.x;
                c.y = a.y;
            }
        }
    }
    function zg(a, b) {
        for (var D = b.x - a.x, c = b.y - a.y, d = a.polygonPts.slice(0), f = 0, e = d.length; f < e; f++) (d[f].x += D), (d[f].y += c);
        a.polygonPts = d.slice(0);
    }
    function Ef(a, b, D, c) {
        var d = b.currentZ / (a.z / 100),
            f = "text" != a.mediaType ? 1 : (a.xScale + a.yScale) / 2 / 100;
        "text" == a.mediaType ? (d *= f) : (0 < b.constrainedScaleMin && d < b.constrainedScaleMin && (d = b.constrainedScaleMin), 0 < b.constrainedScaleMax && d > b.constrainedScaleMax && (d = b.constrainedScaleMax));
        b = Math.round(Bh * d);
        b = "text" == a.mediaType ? b : b < Ag ? Ag : b > Bg ? Bg : b;
        "counter" == a.mediaType && (b += 2);
        var d = Ch * d,
            f = d < Cg ? Cg : d > Dg ? Dg : d,
            e,
            h,
            d = Z.Utils.stringValidate(a.textColor) ? a.textColor : Oc;
        h = Z.Utils.stringValidate(a.backColor) ? a.backColor : yg;
        "undefined" !== typeof D && null !== D && D ? ((e = "0px"), (h = "transparent none"), (D = "counter" != a.mediaType ? "normal" : "bold")) : ((e = "1px"), (D = "normal"));
        "undefined" !== typeof c && null !== c && c && (d = a.backColor);
        a.textVisible || (d = "transparent none");
        Z.captionBoxes && Z.captionsColorsDefault && "measure" != a.mediaType && ((d = a.backColor), (h = a.textColor));
        d == h && ("#ffffff" == d ? (h = "#000000") : "#000000" == d && (h = "#ffffff"));
        c = Z.Utils.createContainerElement("div", "captionTextBox", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "solid", e, h, "0px", f + "px", "pre");
        "undefined" !== typeof a.captionHTML && Z.Utils.stringValidate(a.captionHTML)
            ? ((c.innerHTML = a.captionHTML), Z.Utils.setHTMLTextDefaultCaptionStyle(c, a.captionHTML, d, "verdana", b + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none"))
            : "transparent none" != d && "undefined" !== typeof a.caption && Z.Utils.stringValidate(a.caption)
            ? ((a = document.createTextNode(a.caption)), c.appendChild(a), Z.Utils.setTextNodeStyle(a, d, "verdana", b + "px", "none", "normal", "normal", "normal", D, "1em", "center", "none"), Z.Utils.disableTextInteraction(a))
            : "measure" == a.mediaType && ((b = new Z.Utils.Point(a.x, a.y)), Eg(a, b));
        Z.Utils.addEventListener(c, "contextmenu", Z.Utils.preventDefault);
        return c;
    }
    function Hf(a, b, c, d, e) {
        if (b) {
            var f,
                h = a.captionPosition;
            f = Z.imageR;
            var m,
                g = b.style,
                n = C == a.internalID && "polygon" == a.media && ("addLabel" == Z.editing || "editLabel" == Z.editing || (null === Z.editMode && "measure" == Z.labelMode)) ? 40 : 0,
                k = parseFloat(g.padding);
            0 > f && (f += 360);
            var r = new Dh(b);
            a = (c - r.w) / 2 - k;
            m = (d - r.h) / 2 - k;
            Z.Utils.rotateElement(g, -f);
            if (0 == f % 90) {
                g = f;
                h = parseInt(h, 10);
                0 > g && (g += 360);
                switch (h) {
                    case 1:
                        h = 0 == g ? h : 90 == g ? 7 : 180 == g ? 9 : 270 == g ? 3 : 5;
                        break;
                    case 2:
                        h = 0 == g ? h : 90 == g ? 4 : 180 == g ? 8 : 270 == g ? 6 : 5;
                        break;
                    case 3:
                        h = 0 == g ? h : 90 == g ? 1 : 180 == g ? 7 : 270 == g ? 9 : 5;
                        break;
                    case 4:
                        h = 0 == g ? h : 90 == g ? 8 : 180 == g ? 6 : 270 == g ? 2 : 5;
                        break;
                    case 6:
                        h = 0 == g ? h : 90 == g ? 2 : 180 == g ? 4 : 270 == g ? 8 : 5;
                        break;
                    case 7:
                        h = 0 == g ? h : 90 == g ? 9 : 180 == g ? 3 : 270 == g ? 1 : 5;
                        break;
                    case 8:
                        h = 0 == g ? h : 90 == g ? 6 : 180 == g ? 2 : 270 == g ? 4 : 5;
                        break;
                    case 9:
                        h = 0 == g ? h : 90 == g ? 3 : 180 == g ? 1 : 270 == g ? 7 : 5;
                }
                h = h.toString();
                h = parseInt(h, 10);
                c = c / 2 + r.w / 2 + k + n;
                d = d / 2 + r.h + k + n;
                if (90 == f || 270 == f) (f = c), (c = d), (d = f);
                switch (h) {
                    case 1:
                        a -= c;
                        m -= d;
                        break;
                    case 2:
                        m -= d;
                        break;
                    case 3:
                        a += c;
                        m -= d;
                        break;
                    case 4:
                        a -= c;
                        break;
                    case 6:
                        a += c;
                        break;
                    case 7:
                        a -= c;
                        m += d;
                        break;
                    case 8:
                        m += d;
                        break;
                    case 9:
                        (a += c), (m += d);
                }
            }
            if ((f = new Z.Utils.Point(a, m))) (e = e ? 1 : 0), (b.style.left = f.x + e + "px"), (b.style.top = f.y + e + "px");
        }
    }
    function Dh(a, b, c) {
        if ("undefined" === typeof b || null === b) b = 1;
        var d = a.style,
            e = h.getZoom(),
            f = parseFloat(Z.Utils.getElementStyleProperty(a, "width"));
        isNaN(f) && ((f = parseFloat(Z.Utils.getResource("z115"))), (f = parseFloat(d.fontSize) / f), (f = Math.round(parseFloat(a.firstChild.length * f))));
        a = parseInt(Z.Utils.getResource("z129"), 10);
        parseFloat(d.fontSize);
        var d = 2 * parseFloat(Z.Utils.getResource("z160")),
            m = 2 * parseFloat(Z.Utils.getResource("z151"));
        b = (1.7 * a * e) / b;
        c && (b < d ? (b = d) : b > m && (b = m));
        this.w = f;
        this.h = b;
    }
    function Eg(a, b) {
        var c = a.polyClosed,
            d = a.polygonPts.slice(0),
            e = d.length,
            f = "",
            h = 0,
            m = "",
            g = "pixels" == Z.units ? 0 : 4,
            n = "um" != Z.units ? Z.units : "\u03bcm";
        0 == e
            ? ((f = Eh), (h = Z.Utils.polygonPerimeter(d, c, b, g)), (captionText = f + h.toString() + "  " + n))
            : 0 < e && !c
            ? ((f = Fh), (h = Z.Utils.polygonPerimeter(d, c, b, g)), (captionText = f + h.toString() + "  " + n))
            : ((f = Gh), (h = Z.Utils.polygonPerimeter(d, c, b, g)), (m = Hh), (captionText = f + h.toString() + "  " + n), (f = Ih), (h = Z.Utils.polygonArea(d, c, b, g)), (captionText += "\n" + f + h.toString() + "  " + n + m));
        a.caption = captionText;
        Ye && Ye.firstChild && Ye.firstChild.value && (Ye.firstChild.value = da.caption);
    }
    function Jh(a, b, c, d) {
        if ("undefined" === typeof d || null === d) d = Ma;
        d = d.toString();
        var e = "0" == a || Z.imageSet ? "hidden" : "visible",
            f = parseInt(Z.Utils.getResource("z133"), 10),
            h = parseInt(Z.Utils.getResource("DEFAULT_IMAGESETLISTWIDTH"), 10),
            f = Z.imageSet ? h : f,
            h = og(a, f, Y, ba);
        "undefined" === typeof ra || null === ra
            ? ((Z["HotspotList" + d] = new Z.Utils.createSelectElement("HotspotList" + d, b, c, f, h.x, h.y, null, e, If, "mousedown")),
              (Zc = ra = Z["HotspotList" + d]),
              (Ic = Zc.style),
              "0" != a && Z.ViewerDisplay.appendChild(ra),
              Z.tour && (fd = 0),
              (a = Z.Utils.stringValidate(Z.hotspotListTitle) && "none" != Z.hotspotListTitle ? 1 : 0),
              (ra.selectedIndex = a))
            : Z.Utils.arrayClear(c);
    }
    function xg(b) {
        b = document.getElementById("hot" + b + (Z.imageSet ? "-" + a.toString() : ""));
        null !== b && b.parentNode.removeChild(b);
    }
    function og(a, b, c, d) {
        var e = Z.imageSet ? 13 : 25;
        switch (a) {
            case "0":
                d = a = 0;
                break;
            case "1":
                d = a = e;
                break;
            case "2":
                a = c - b - e;
                d = Z.imageSet ? 32 : 20;
                break;
            case "3":
                a = c - b - e;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 2 * e : d - 1.5 * e;
                break;
            case "4":
                a = e;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 2 * e : d - 1.5 * e;
                break;
            default:
                (a = c - b), (d = e);
        }
        return new Z.Utils.Point(a, d);
    }
    function Kh(a) {
        var b = a.getAttribute("MEDIATYPE"),
            c = a.getAttribute("MEDIA");
        if (c) {
            var d =
                    -1 != c.indexOf("/circle.") ||
                    -1 != c.indexOf("/square.") ||
                    -1 != c.indexOf("/triangle.") ||
                    -1 != c.indexOf("/arrowDownLeft.") ||
                    -1 != c.indexOf("/arrowDownRight.") ||
                    -1 != c.indexOf("/arrowUpLeft.") ||
                    -1 != c.indexOf("/arrowUpRight.") ||
                    -1 != c.indexOf("/arrowUp.") ||
                    -1 != c.indexOf("/arrowDown.") ||
                    -1 != c.indexOf("/arrowLeft.") ||
                    -1 != c.indexOf("/arrowRight.") ||
                    -1 != c.indexOf("/lineHorizontal.") ||
                    -1 != c.indexOf("/lineVertical."),
                e =
                    "circle" == c ||
                    "square" == c ||
                    "triangle" == c ||
                    "arrowDown" == c ||
                    "arrowDownLeft" == c ||
                    "arrowLeft" == c ||
                    "arrowUpLeft" == c ||
                    "arrowUp" == c ||
                    "arrowUpRight" == c ||
                    "arrowRight" == c ||
                    "arrowDownRight" == c ||
                    "lineHorizontal" == c ||
                    "lineVertical" == c,
                f = null;
            if (Z.labelIconsInternal)
                if (d) {
                    if ("symbol" == b || "icon" == b) f = c.substring(c.lastIndexOf("/") + 1, c.indexOf("."));
                } else "symbol" == b && (f = Sa + "/noSubstitutePlaceholder.png");
            else null === Z.labelIconsInternal || Z.labelIconsInternal || ("symbol" == b && (f = e ? Sa + "/" + c + ".png" : Sa + "/noSubstitutePlaceholder.png"));
            f && (a.setAttribute("MEDIATYPE", "icon"), a.setAttribute("MEDIA", f), (Jf = !0));
        }
        return a;
    }
    function dd(a) {
        var b = 0,
            c = [];
        switch (a) {
            case "image":
                if (Ac) {
                    a = 0;
                    for (var d = Ac.length; a < d; a++) c[c.length] = parseInt(Ac[a].value, 10);
                }
                break;
            case "slide":
                if (Fb) for (a = 0, d = Fb.length; a < d; a++) c[c.length] = parseInt(Fb[a].internalID, 10);
                break;
            case "hotspot":
                if (x) for (a = 0, d = x.length; a < d; a++) c[c.length] = parseInt(x[a].internalID, 10);
                break;
            case "poi":
                if (ie) for (a = 0, d = ie.length; a < d; a++) c[c.length] = parseInt(ie[a].value, 10);
                break;
            case "label":
                if (Ia) for (a = 0, d = Ia.length; a < d; a++) c[c.length] = parseInt(Ia[a].value, 10);
                break;
            case "labelExternal":
                if (x) for (a = 0, d = x.length; a < d; a++) c[c.length] = parseInt(x[a].id, 10);
                break;
            case "note":
                if (je) for (a = 0, d = je.length; a < d; a++) c[c.length] = parseInt(je[a].value, 10);
        }
        0 < c.length && ((c = Z.Utils.arraySortNumericAscending(c)), (b = c[c.length - 1] + 1));
        return b.toString();
    }
    function B() {
        if (Oa) {
            Z.Utils.clearDisplay(Oa);
            Fa.save();
            Fa.scale($b, $b);
            var a = ja(Ya, 1);
            Fa.translate(-(Z.imageX - Z.imageW / 2) * a, -(Z.imageY - Z.imageH / 2) * a);
            Fa.drawImage(ta, -ta.width / 2, -ta.height / 2, ta.width, ta.height);
            Fa.restore();
            Fa.drawImage(la, -la.width / 2, -la.height / 2, la.width, la.height);
            a = Fa.getImageData(0, 0, Oa.width, Oa.height);
            a = z527(a, "grayscale", "");
            Fa.putImageData(a, 0, 0);
        }
    }
    function xh(a) {
        if ((a = Z.Utils.event(a))) {
            var b = Z.Utils.target(a);
            a = Z.Utils.relatedTarget(a);
            var c = nc(b);
            null === c ||
                null === a ||
                ("captionTextBox" == a.id && -1 != b.id.indexOf("hot") && -1 == b.id.indexOf("hotspotDisplay")) ||
                ("captionTextBox" == b.id && -1 != a.id.indexOf("hot") && -1 == a.id.indexOf("hotspotDisplay")) ||
                h.setHotspotVisibility(c, !0);
        }
    }
    function zh(a) {
        if ((a = Z.Utils.event(a))) {
            var b = Z.Utils.target(a);
            a = Z.Utils.relatedTarget(a);
            var c = nc(b);
            null === c ||
                null === a ||
                ("captionTextBox" == a.id && -1 != b.id.indexOf("hot") && -1 == b.id.indexOf("hotspotDisplay")) ||
                ("captionTextBox" == b.id && -1 != a.id.indexOf("hot") && -1 == a.id.indexOf("hotspotDisplay")) ||
                h.setHotspotPopupVisibility(c, !0);
        }
    }
    function uh(a) {
        if ((a = Z.Utils.event(a))) Z.clickZoomAndPanBlock = !0;
    }
    function yh(a) {
        if ((a = Z.Utils.event(a))) {
            var b = Z.Utils.target(a);
            a = Z.Utils.relatedTarget(a);
            var c = nc(b);
            null === c ||
                null === a ||
                ("captionTextBox" == a.id && -1 != b.id.indexOf("hot") && -1 == b.id.indexOf("hotspotDisplay")) ||
                ("captionTextBox" == b.id && -1 != a.id.indexOf("hot") && -1 == a.id.indexOf("hotspotDisplay")) ||
                h.setHotspotVisibility(c, !1);
        }
    }
    function Ah(a) {
        if ((a = Z.Utils.event(a))) {
            var b = Z.Utils.target(a);
            a = Z.Utils.relatedTarget(a);
            var c = nc(b);
            null === c ||
                null === a ||
                ("captionTextBox" == a.id && -1 != b.id.indexOf("hot") && -1 == b.id.indexOf("hotspotDisplay")) ||
                ("captionTextBox" == b.id && -1 != a.id.indexOf("hot") && -1 == a.id.indexOf("hotspotDisplay")) ||
                h.setHotspotPopupVisibility(c, !1);
        }
    }
    function vh(a) {
        if ((a = Z.Utils.event(a))) Z.clickZoomAndPanBlock = !0;
    }
    function sh(a) {
        (a = Z.Utils.event(a)) &&
            !a.altKey &&
            ((a = Z.Utils.target(a)), (a = nc(a)), (a = a.id.substring(3, a.id.length)), Z.Utils.arrayIndexOfObjectValue(x, "internalID", a), (a = Z.Utils.getResource("z3")), Z.Utils.showMessage(a, !0, null, "center", !0));
    }
    function th(a) {
        (a = Z.Utils.event(a)) &&
            !a.altKey &&
            ((a = Z.Utils.target(a)), (a = nc(a)), (a = a.id.substring(3, a.id.length)), Z.Utils.arrayIndexOfObjectValue(x, "internalID", a), (a = Z.Utils.getResource("z3")), Z.Utils.showMessage(a, !0, null, "center", !0));
    }
    function Ff(a) {
        var b = a.type,
            c = Z.Utils.target(a);
        c && ((c = nc(c)), (C = c.id.substring(3, c.id.length)));
        "touchstart" == b
            ? ((a = Z.Utils.getFirstTouch(a)), "undefined" !== typeof a && ((ke = new Z.Utils.Point(a.pageX, a.pageY)), (le = new Date().getTime())))
            : "touchmove" == b
            ? ((a = Z.Utils.getFirstTouch(a)), "undefined" !== typeof a && (Gd = new Z.Utils.Point(a.pageX, a.pageY)))
            : ((ke = Z.Utils.getMousePosition(a)), (le = new Date().getTime()));
    }
    function Gf(a) {
        var b = a.type;
        "touchend" == b || "touchcancel" == b
            ? ((b = Z.Utils.getFirstTouch(a)), "undefined" !== typeof b ? (Gd = new Z.Utils.Point(b.pageX, b.pageY)) : null !== le && new Date().getTime() - le < qd && ((Gd = ke), (le = null)))
            : (Gd = Z.Utils.getMousePosition(a));
        b = Z.Utils.calculatePointsDistance(ke.x, ke.y, Gd.x, Gd.y);
        a = a ? a.altKey : null;
        b < Lh &&
            !a &&
            ((a = Z.Viewport.z538(this)), (a = a.id.substring(3, a.id.length)), (a = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a)), -1 != a && ((a = unescape(x[a].urlTarget)), (a = new Function(a)), window.setTimeout(a, 200)));
    }
    function If(a) {
        Z.Utils.removeEventListener(ra, "mousedown", If);
        if (!Z.hotspotListTitle || !Z.Utils.stringValidate(Z.hotspotListTitle) || "none" == Z.hotspotListTitle)
            if (((a = Z.Utils.getResource("UI_LISTMOUSEDOWNTEXT")), ra.options[0].text != a)) {
                var b = document.createElement("option");
                b.text = a;
                b.value = null;
                ra.add(b, 0);
            }
        ra.selectedIndex = 0;
        Z.Utils.addEventListener(ra, "change", Fg);
    }
    function Fg(a) {
        if ((a = Z.Utils.event(a)))
            Z.tourPlaying && h.tourStop(),
                (a = Z.Utils.target(a)),
                (a = a.options[a.selectedIndex].value),
                isNaN(parseInt(a), 10) || ((a = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a)), -1 != a && ((a = x[a]), (C = a.internalID), Z.Utils.playAudio(me, a.audio), h.zoomAndPanToView(a.x, a.y, a.z / 100, a.rotation))),
                Z.Utils.removeEventListener(ra, "change", Fg),
                window.setTimeout(function () {
                    Z.Utils.addEventListener(ra, "mousedown", If);
                }, 10);
    }
    function vg(a, b, c, d, e, f) {
        var h = a.media,
            m = a.mediaType,
            g =
                -1 != h.indexOf("/circle.") ||
                -1 != h.indexOf("/square.") ||
                -1 != h.indexOf("/triangle.") ||
                -1 != h.indexOf("/arrowDownLeft.") ||
                -1 != h.indexOf("/arrowDownRight.") ||
                -1 != h.indexOf("/arrowUpLeft.") ||
                -1 != h.indexOf("/arrowUpRight.") ||
                -1 != h.indexOf("/arrowUp.") ||
                -1 != h.indexOf("/arrowDown.") ||
                -1 != h.indexOf("/arrowLeft.") ||
                -1 != h.indexOf("/arrowRight.") ||
                -1 != h.indexOf("/lineHorizontal.") ||
                -1 != h.indexOf("/lineVertical."),
            h =
                ("counter" == m || "icon" == m) &&
                (!h || "External Graphics File" != h) &&
                ("counter" == h ||
                    "circle" == h ||
                    "square" == h ||
                    "triangle" == h ||
                    "arrowDown" == h ||
                    "arrowDownLeft" == h ||
                    "arrowLeft" == h ||
                    "arrowUpLeft" == h ||
                    "arrowUp" == h ||
                    "arrowUpRight" == h ||
                    "arrowRight" == h ||
                    "arrowDownRight" == h ||
                    "lineHorizontal" == h ||
                    "lineVertical" == h ||
                    (g && Z.labelIconsInternal));
        if (Z.useCanvas && (h || d)) {
            if (a.visibility || a.rollover || c)
                if ((c = d ? Fa : ("view" != Z.labelMode && a.internalID === C) || e ? (e ? Me : ab) : Wd)) {
                    var h = "undefined" !== typeof a.media && null !== a.media ? a.media : "circle",
                        n = a.iW,
                        k = a.iH,
                        g = a.x,
                        r = a.y,
                        p = a.r ? a.r : 0,
                        g = -1 != h.indexOf("arrow") ? "arrow" : -1 != h.indexOf("line") ? "line" : h;
                    if ("arrowUp" != h && "lineVertical" != h)
                        switch (h) {
                            case "arrowDownLeft":
                                p += 45;
                                break;
                            case "arrowLeft":
                                p += 90;
                                break;
                            case "arrowUpLeft":
                                p += 135;
                                break;
                            case "arrowUp":
                                p += 180;
                                break;
                            case "arrowUpRight":
                                p += 225;
                                break;
                            case "arrowRight":
                                p += 270;
                                break;
                            case "arrowDownRight":
                                p += 315;
                                break;
                            case "lineHorizontal":
                                p += 90;
                        }
                    h = g;
                    c.save();
                    c.translate((a.x - (f ? Z.imageW / 2 : Z.imageX)) * Z.imageZ, (a.y - (f ? Z.imageH / 2 : Z.imageY)) * Z.imageZ);
                    r = g = 0;
                    f = b.currentZ / (a.z / 100);
                    var A = f / (va / hc);
                    0 < b.constrainedScaleMin && A < b.constrainedScaleMin && (A = b.constrainedScaleMin);
                    0 < b.constrainedScaleMax && A > b.constrainedScaleMax && (A = b.constrainedScaleMax);
                    b = (a.xScale / 100) * A;
                    A *= a.yScale / 100;
                    1 != b && 1 != A && c.scale(b, A);
                    d ? (c.lineWidth = 1e-6) : ((d = Mh / f), (c.lineWidth = a.lineVisible ? (8 > d ? d : 8) : 0), (c.fillStyle = a.fillColor));
                    c.strokeStyle = a.lineColor;
                    0 != p && c.rotate(((p - Z.imageR) * Math.PI) / 180);
                    d = a.rotation;
                    "undefined" !== typeof d && null !== d && 0 != d && c.rotate((d * Math.PI) / 180);
                    c.globalAlpha = 1;
                    "arrow" != h && c.beginPath();
                    switch (h) {
                        case "counter":
                            d = a.radius ? a.radius : n / 2;
                            c.arc(g, r, d, 0, 2 * Math.PI);
                            break;
                        case "circle":
                            d = a.radius ? a.radius : n / 2;
                            c.arc(g, r, d, 0, 2 * Math.PI);
                            break;
                        case "triangle":
                            c.moveTo(g, r - k / 2);
                            c.lineTo(g + n / 2, r + k / 2);
                            c.lineTo(g - n / 2, r + k / 2);
                            break;
                        case "square":
                            c.moveTo(g - n / 2, r - k / 2);
                            c.lineTo(g + n / 2, r - k / 2);
                            c.lineTo(g + n / 2, r + k / 2);
                            c.lineTo(g - n / 2, r + k / 2);
                            break;
                        case "line":
                            c.moveTo(g, r - k / 2);
                            c.lineTo(g, r + k / 2);
                            break;
                        case "arrow":
                            (c.fillStyle = Z.polygonFillColor ? Z.polygonFillColor : "#FFFFFF"),
                                (d = g),
                                (k = r - k),
                                (b = Math.sqrt((d - g) * (d - g) + (k - r) * (k - r))),
                                (n = (b - 20 / 3) / b),
                                (b = Math.round(d + (g - d) * n)),
                                (n = Math.round(k + (r - k) * n)),
                                c.beginPath(),
                                c.moveTo(d, k),
                                c.lineTo(b, n),
                                c.stroke(),
                                (b = Math.atan2(k - r, 0)),
                                (n = Math.PI / 8),
                                (k = b + n),
                                (d = g + 30 * Math.cos(k)),
                                (k = r + 30 * Math.sin(k)),
                                (n = b - n),
                                (b = g + 30 * Math.cos(n)),
                                (n = r + 30 * Math.sin(n)),
                                (p = (d + g + b) / 3),
                                (f = (k + r + n) / 3),
                                c.save(),
                                c.beginPath(),
                                c.moveTo(b, n),
                                c.lineTo(g, r),
                                c.lineTo(d, k),
                                c.stroke(),
                                c.beginPath(),
                                c.lineTo(g, r),
                                c.lineTo(b, n),
                                c.quadraticCurveTo(p, f, d, k),
                                c.fill(),
                                c.restore();
                    }
                    "arrow" != h &&
                        (a.fillVisible &&
                            ((c.fillStyle = a.fillColor ? a.fillColor : Z.polygonFillColor ? Z.polygonFillColor : "#FFFFFF"),
                            (c.globalAlpha = "counter" == m ? parseFloat(Z.Utils.getResource("DEFAULT_TRACKINGALPHA")) : parseFloat(Z.Utils.getResource("DEFAULT_POLYGONALPHA"))),
                            c.fill()),
                        "line" != h && c.closePath(),
                        (c.globalAlpha = 1),
                        c.stroke());
                    c.restore();
                }
            e && validateDrawLabelCount();
        }
    }
    function We(a, b, c, d, e, f, m) {
        if (Z.useCanvas && ("polygon" == a.media || d)) {
            if (a.visibility || a.rollover || c) {
                c = a.internalID;
                if (("undefined" !== typeof a.polygonPts && null !== a.polygonPts && 0 < a.polygonPts.length) || d) {
                    m = d ? Fa : c === C || e ? (e ? Me : ab) : Wd;
                    m.save();
                    m.translate((a.x - (f ? Z.imageW / 2 : Z.imageX)) * Z.imageZ, (a.y - (f ? Z.imageH / 2 : Z.imageY)) * Z.imageZ);
                    var g = va / hc,
                        n = h.getZoom(),
                        k = (a.xScale + a.yScale) / 2 / 100,
                        r = (a.xScale / 100 / g) * n,
                        g = (a.yScale / 100 / g) * n;
                    1 != r && 1 != g && m.scale(r, g);
                    d ? (m.lineWidth = 1e-6) : "freehand" == a.mediaType ? (m.lineWidth = Nh / n) : ((m.lineWidth = a.lineVisible ? Gg / n / k : 0), (m.fillStyle = a.fillColor));
                    m.strokeStyle = a.lineColor;
                    r = a.x;
                    g = a.y;
                    m.beginPath();
                    if (a.polygonPts) {
                        var p = a.polygonPts.slice(0);
                        "measure" != Z.labelMode || a.polyClosed || Wa || "undefined" === typeof b || null === b || (p[p.length] = { x: b.x, y: b.y });
                        var A = p[0].x - r,
                            u = p[0].y - g;
                        m.moveTo(A, u);
                        for (var v = 1, w = p.length; v < w; v++) {
                            var ia = p[v].x - r,
                                lb = p[v].y - g;
                            m.lineTo(ia, lb);
                        }
                        "freehand" != a.mediaType &&
                            (a.polyClosed || (Z.mouseIsDown && 0 == Ha)) &&
                            (a.polyClosed && (m.lineTo(A, u), m.closePath()), d || !a.fillVisible || (!a.polyClosed && c == C) || ((m.globalAlpha = Oh), m.fill()), (m.globalAlpha = 1));
                    } else (v = (100 / a.z) * a.iW), (w = (100 / a.z) * a.iH), (r = 0), (g = -1 == a.media.indexOf("triangle") ? 0 : 0.23 * a.iH), (v = (Math.max(v, w) / 2) * 1.2), m.arc(r, g, v, 0, 2 * Math.PI);
                    m.stroke();
                    if (
                        !d &&
                        ((null === Z.editMode && "measure" == Z.labelMode) || "addLabel" == Z.editing || "editLabel" == Z.editing) &&
                        (("rectangle" == Z.labelMode && 4 == p.length) || "polygon" == Z.labelMode || "measure" == Z.labelMode) &&
                        a.internalID == C &&
                        "undefined" !== typeof a &&
                        null !== a &&
                        "freehand" != a.mediaType
                    )
                        for (n = 1 / n / k, v = 0, w = p.length; v < w; v++) (ia = p[v].x - r), (lb = p[v].y - g), Hg(ia, lb, !Wa && 0 == v, n);
                    m.restore();
                }
                e ? ((d = new lc()), drawCaptionOnCanvas(a, d, b, null, null, !0, f)) : !Z.mouseIsDown || (d && "polygon" != a.media) || null === c || "undefined" === typeof b || L || Hd(c, b, e, f);
            }
            e && validateDrawLabelCount();
        } else Ze || (Z.Utils.showMessage(Z.Utils.getResource("z9")), (Ze = !0));
    }
    function Hg(a, b, c, d) {
        var e = $e * d;
        ab.lineWidth = Ph * d;
        ab.strokeStyle = Ig;
        ab.fillStyle = c ? Qh : Rh;
        ab.beginPath();
        ab.arc(a, b, e, 0, 2 * Math.PI, !1);
        ab.closePath();
        ab.globalAlpha = 0.5;
        ab.fill();
        ab.globalAlpha = 1;
        ab.stroke();
    }
    function Jg(a, b, c) {
        Z.Utils.clearDisplay(Na);
        var d = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C);
        if (-1 != d) {
            d = x[d];
            We(d);
            var e = h.getZoom(),
                f = d.polygonPts;
            if (f) {
                var m = f[f.length - 1],
                    f = (m.x - Z.imageX) * e,
                    e = (m.y - Z.imageY) * e;
                d.polyClosed || ((ab.lineWidth = Gg), (ab.strokeStyle = lineStrokeColor), ab.beginPath(), ab.moveTo(f, e), ab.lineTo(a, b), ab.closePath(), ab.stroke());
            }
            ("polygon" != Z.labelMode && "measure" != Z.labelMode) || null === C || Hd(C, c);
        }
    }
    function he(a) {
        cb && Z.Utils.clearDisplay(cb);
        Na && Z.Utils.clearDisplay(Na);
        if ("inline-block" == pb.display)
            for (var b = new lc(), c = 0, d = x.length; c < d; c++) {
                var e = x[c],
                    f = Math.round(100 * b.currentZ),
                    h = -1 == e.zMin ? Math.round(100 * Z.initialZ) : Math.round(e.zMin),
                    m = -1 == e.zMax ? Math.round(100 * Z.initialZ) : Math.round(e.zMax);
                if ((0 == h || h <= f) && (0 == m || m >= f)) {
                    var f = e.media,
                        h = e.mediaType,
                        m =
                            -1 != f.indexOf("/circle.") ||
                            -1 != f.indexOf("/square.") ||
                            -1 != f.indexOf("/triangle.") ||
                            -1 != f.indexOf("/arrowDownLeft.") ||
                            -1 != f.indexOf("/arrowDownRight.") ||
                            -1 != f.indexOf("/arrowUpLeft.") ||
                            -1 != f.indexOf("/arrowUpRight.") ||
                            -1 != f.indexOf("/arrowUp.") ||
                            -1 != f.indexOf("/arrowDown.") ||
                            -1 != f.indexOf("/arrowLeft.") ||
                            -1 != f.indexOf("/arrowRight.") ||
                            -1 != f.indexOf("/lineHorizontal.") ||
                            -1 != f.indexOf("/lineVertical."),
                        g =
                            "counter" == f ||
                            "circle" == f ||
                            "square" == f ||
                            "triangle" == f ||
                            "arrowDown" == f ||
                            "arrowDownLeft" == f ||
                            "arrowLeft" == f ||
                            "arrowUpLeft" == f ||
                            "arrowUp" == f ||
                            "arrowUpRight" == f ||
                            "arrowRight" == f ||
                            "arrowDownRight" == f ||
                            "lineHorizontal" == f ||
                            "lineVertical" == f,
                        h = ("counter" == h || "icon" == h) && (!f || "External Graphics File" != f) && (g || (m && Z.labelIconsInternal)),
                        f = f && "polygon" == f;
                    e.visibility &&
                        (f || h) &&
                        (a || ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || "undefined" === typeof C || null === C || C !== c) &&
                        ((m = e.x), (g = e.y), !Z.hotspotsDrawOnlyInView || (m + ed > b.box.l && m - ed < b.box.r && g + ed > b.box.t && g - ed < b.box.b)) &&
                        (h ? vg(e, b, a, null, null, null) : f && We(e, null, a));
                }
            }
    }
    function Kf(a, b, c) {
        gd = !0;
        Z.Utils.clearDisplay(Na);
        a = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a);
        -1 != a && ((a = x[a]), (a.polygonPts[b] = c), 4 != a.polygonPts.length || (!Pc && "rectangle" != Z.labelMode) || (a.polygonPts = ne(a.polygonPts, b)), We(a, c));
    }
    function ne(a, b) {
        var c = a[b].x,
            d = a[b].y,
            e = b - 1;
        0 > e && (e += 4);
        var f = b + 1;
        3 < f && (f -= 4);
        1 == e || 3 == e ? ((a[e].x = c), (a[f].y = d)) : ((a[f].x = c), (a[e].y = d));
        return a;
    }
    function rc(a, b, c) {
        var d = (a = Z.Utils.event(a)) ? Z.Utils.isRightMouseButton(a) : null,
            e = a ? a.altKey : null;
        if ("undefined" === typeof C || null === C) sb(null, !0, b);
        else {
            var f = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C);
            -1 != f &&
                ((f = x[f]),
                (af = f.polygonPts),
                (f = f.polyClosed),
                null === af ? (sb(C, !0, b), Hd(C, b)) : ((Ha = Lf(a, b)), f ? null === Ha && sb(null, !0, b) : null === Ha ? (e || d || c ? (sb(C, !1, b), rd(C, !1)) : sb(C, !1, b)) : 0 == Ha && 2 < af.length && !Wa && rd(C, !0)));
        }
        (!e || ("measure" == Z.labelMode && null !== C)) && Hd(C, b);
    }
    function sb(a, b, c) {
        var d,
            e = !1,
            f = !1;
        "undefined" !== typeof a && null !== a && ((null !== Z.editing && "addLabel" != Z.editing) || !Wa || ("polygon" != Z.labelMode && "measure" != Z.labelMode))
            ? ((a = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a)), -1 != a && ((d = x[a]), (a = d.polygonPts ? d.polygonPts : []), (a[a.length] = { x: c.x, y: c.y }), (d.polyClosed = !1), (d.polygonPts = a), (d.saved = !1)))
            : (null === Z.editMode && "measure" == Z.labelMode && 0 < x.length && h.deleteAllMeasureHotspots(),
              (d = "freehand" == Z.labelMode || "rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode ? Z.labelMode : null),
              (e = []),
              (e[0] = { x: c.x, y: c.y }),
              (f = "undefined" !== typeof bb && 0 < bb.options.length ? (f = bb.options[bb.selectedIndex].value) : 1),
              (a = (100 * h.getZoom()).toString()),
              h.createHotspotFromParameters(
                  null,
                  null,
                  d,
                  "polygon",
                  null,
                  c.x.toString(),
                  c.y.toString(),
                  a,
                  null,
                  null,
                  null,
                  "0",
                  "0",
                  null,
                  null,
                  null,
                  null,
                  null,
                  Oc,
                  null,
                  lineStrokeColor,
                  null,
                  null,
                  null,
                  null,
                  null,
                  "8",
                  "0",
                  null,
                  f,
                  null,
                  null,
                  "0",
                  e,
                  null,
                  null,
                  null,
                  null,
                  "1",
                  null,
                  null,
                  null
              ),
              (d = x[x.length - 1]),
              (C = d.internalID),
              (e = d),
              (f = d.poiID),
              (Z.measureVisible && null === Z.editMode) ||
                  ((a = Z.Utils.arrayIndexOfObjectValue(Ia, "value", C)),
                  -1 != a
                      ? ((Ia[a] = { text: e.name, value: C, poiID: f }),
                        (a = Z.Utils.arrayIndexOfObjectValue(Xb, "value", C)),
                        -1 != a && ((Xb[a] = { text: e.name, value: C, poiID: f }), h.getStatus("XMLParsedViewport") && Z.Utils.updateSelectElement(Yb, Xb)))
                      : ((Ia[Ia.length] = { text: e.name, value: C, poiID: f }), (Xb[Xb.length] = { text: e.name, value: C, poiID: f })),
                  h.getStatus("XMLParsedViewport") && Yb && ((e = Ia[Ia.length - 1]), z611(e.poiID, e.value))),
              (e = f = !0));
        ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) ||
            "undefined" === typeof d ||
            null === d ||
            "freehand" == d.mediaType ||
            ((d = h.getZoom()), Hg((c.x - Z.imageX) * d, (c.y - Z.imageY) * d, e, 1));
        "rectangle" != Z.labelMode && "freehand" != Z.labelMode && (Wa = !1);
        f ? r() : b && he();
    }
    function Lf(a, b) {
        for (var c = null, d = ($e + 1) / Z.imageZ, e = 0, f = x.length; e < f; e++)
            if ("polygon" == x[e].media && x[e].internalID == C) {
                var h = x[e].polygonPts;
                if ("undefined" !== typeof h && null !== h) for (var m = 0, g = h.length; m < g; m++) Z.Utils.calculatePointsDistance(b.x, b.y, h[m].x, h[m].y) < d && (c = m);
            }
        return c;
    }
    function rd(a, b) {
        Z.Utils.clearDisplay(Na);
        var c = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a);
        x[c].polyClosed = b;
        Wa = !0;
        if (-1 != c) {
            var c = x[c],
                d = Z.Utils.polygonCenter(c.polygonPts, c.polyClosed);
            c.x = d.x;
            c.y = d.y;
            Pc || "view" == Z.labelMode || "freehand" == Z.labelMode || "" != c.caption || "undefined" !== typeof c.captionHTML || ((d = Z.Utils.getResource("z45")), (c.caption = d + a.toString()));
            d = new lc();
            Nc(c, d);
        }
    }
    function Hd(b, c, d, e) {
        var h = Z.Utils.arrayIndexOfObjectValue(x, "internalID", b);
        if (-1 != h) {
            h = x[h];
            if (!Pc && "view" != Z.labelMode)
                if ("measure" == Z.labelMode && "measure" == h.mediaType) Eg(h, c);
                else if ("freehand" != Z.labelMode && "freehand" != h.mediaType && "" == h.caption && "undefined" === typeof h.captionHTML) {
                    var f = Z.Utils.getResource("z45");
                    h.caption = f + b.toString();
                }
            f = h.polyClosed;
            b = h.polygonPts ? h.polygonPts.slice(0) : [];
            f = Z.Utils.polygonCenter(b, f, c);
            b = Z.Utils.polygonDimensions(b, c);
            h.x = f.x;
            h.y = f.y;
            h.iW = b.x;
            h.iH = b.y;
            b = new lc();
            L
                ? ((d = c = null),
                  (c = document.getElementById("hot" + h.id + (Z.imageSet ? "-" + a.toString() : ""))) && (d = Z.Utils.getChildElementByID(c, "captionTextBox")),
                  (c = d),
                  (d = Z.Utils.polygonDimensions(h.polygonPts)),
                  (e = b.currentZ / ("polygon" != h.media ? h.z / 100 : 1)),
                  Hf(h, c, (h.xScale / 100) * e * d.x, (h.yScale / 100) * e * d.y))
                : d
                ? drawCaptionOnCanvas(h, b, c, null, null, !0, e)
                : wg(h, b, c, !0);
        }
    }
    function Mf(a, b) {
        switch (b) {
            case "labels":
                var c = Z.Utils.arrayIndexOfObjectValue(x, "internalID", Kg);
                if ("save" == a) da && da.polygonPts && (bf = Z.Utils.arrayClone("polygon", da.polygonPts, bf)), (Nf = Z.Utils.arrayClone("labels", Ia, Nf)), (Of = Z.Utils.arrayClone("hotspots", x, Of)), (da = -1 != c ? x[c] : null);
                else if (((Ia = Z.Utils.arrayClone("labels", Nf, Ia)), (x = Z.Utils.arrayClone("hotspots", Of, x)), (da = -1 != c ? x[c] : null)))
                    0 < bf.length ? (da.polygonPts = Z.Utils.arrayClone("polygon", bf, da.polygonPts)) : "polygon" != da.media && Z.Utils.arrayClear(da.polygonPts);
        }
    }
    function hd(a, b, c) {
        if (h.getStatus("initializedViewport")) {
            var d = "0" == oe ? "hidden" : "visible";
            Pf = Z.tracking && Z.navigatorVisible && null !== Z.navigatorW ? Z.navigatorW + 2 : parseInt(Z.Utils.getResource("DEFAULT_IMAGELISTWIDTH"), 10);
            var e = h.calculateImageListCoords(Y, ba, c),
                f = "undefined" !== typeof c && Z.Utils.stringValidate(c) ? c.toString() : "";
            "undefined" === typeof sc || null === sc
                ? ((sc = new Z.Utils.createSelectElement("imageList" + f, a, b, Pf, e.x, e.y, null, d, pe, "change")),
                  Z.ViewerDisplay.appendChild(sc),
                  (sc.style.zIndex = (Z.baseZIndex + 8).toString()),
                  (sc.selectedIndex = 0),
                  h.setStatus("initializedImageList", !0))
                : Z.Utils.arrayClear(b);
        } else
            Z.imageListTimeout = window.setTimeout(function () {
                hd(a, b, c);
            });
    }
    function pe(b) {
        if ((b = Z.Utils.event(b))) {
            Z.Viewer.viewportSelect(a);
            b = Z.Utils.target(b);
            var c = Z.Utils.stringValidate(Z.imageListTitle) && "none" != Z.imageListTitle ? 1 : 0;
            b = b.selectedIndex - c;
            "null" != Ac[b].value && Z.Viewer.setImage(Ac[b].media, Ac[b].optionalParams, !1, a);
        }
    }
    function cf(a) {
        var b;
        this.id = a.getAttribute("ID");
        this.name = a.getAttribute("NAME");
        this.internalID = a.getAttribute("INTERNALID");
        isNaN(parseInt(this.internalID, 10)) && (this.internalID = dd("slide"));
        this.media = a.getAttribute("MEDIA");
        this.audio = a.getAttribute("AUDIO");
        Z.Utils.stringValidate(this.audio) && (Z.audioContent = !0);
        this.initialX = a.getAttribute("INITIALX");
        this.initialY = a.getAttribute("INITIALY");
        this.initialZoom = a.getAttribute("INITIALZOOM");
        this.minZoom = a.getAttribute("MINZOOM");
        this.maxZoom = a.getAttribute("MAXZOOM");
        this.hotspotPath = a.getAttribute("HOTSPOTPATH");
        this.annotationPath = a.getAttribute("ANNOTATIONPATH");
        b = parseFloat(a.getAttribute("SHOWFOR"));
        this.showFor = isNaN(b) ? 0 : b;
        this.transition = a.getAttribute("TRANSITION");
        b = parseFloat(a.getAttribute("CHANGEFOR"));
        this.changeFor = isNaN(b) ? 0 : b;
    }
    function jd(a) {
        if ((a = Z.Utils.event(a)))
            if ((Z.slideshowPlaying && h.slideshowStop(), (a = Z.Utils.target(a)), "null" != a.options[a.selectedIndex].value)) {
                var b = Z.Utils.stringValidate(Z.slideListTitle) && "none" != Z.slideListTitle ? 1 : 0;
                h.goToSlide(a.selectedIndex - b, null, !0);
            }
    }
    function Id(a) {
        if ("undefined" !== typeof Ub && null !== Ub && 0 < Ub.length) {
            var b = Z.slideshowPlaying ? Fb[Qc].showFor : 0;
            Z.Utils.stringValidate(Fb[Qc].audio) && (b += 500);
            var c = Zb(Qc, a, Fb.length - 1);
            null !== c
                ? Z.Utils.functionCallWithDelay(function () {
                      h.goToSlide(c, null, null, !0);
                  }, b)
                : h.slideshowStop();
        }
    }
    function Zb(a, b, c) {
        for (var d = Qf || Rf, e = "Skip"; "Skip" == e; )
            "next" == b ? ((a += 1), a > c && (a = d ? 0 : null)) : (--a, 0 > a && (a = d ? c : null)), (e = Z.hotspots ? (null !== a ? x[a].transition : null) : Z.slideshow ? (null !== a ? Fb[a].transition : null) : null);
        return a;
    }
    function Rc() {
        Z.preventDupCall || ((Z.priorX = Math.round(Z.imageX)), (Z.priorY = Math.round(Z.imageY)), (Z.priorZ = Z.imageZ), (Z.priorR = Math.round(Z.imageR)));
        Z.preventDupCall = "undefined" !== typeof called && null !== called;
    }
    function Vc(a, b, c, d, e, f) {
        f || h.zoomAndPanAllStop();
        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
        if ("undefined" === typeof a || null === a) a = Z.imageW / 2;
        if ("undefined" === typeof b || null === b) b = Z.imageH / 2;
        "undefined" === typeof c || null === c ? (c = Z.fitZ) : 1 < c && c > Z.maxZ && (c /= 100);
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        c = Ta(c);
        d = Ua(d);
        a = Ga(a, b, c, d, "image");
        Z.imageX = sd = a.x;
        Z.imageY = td = a.y;
        Z.imageZ = c;
        d != Z.imageR && Z.Utils.rotateElement(I, d);
        Z.imageR = d;
        h.updateView(!0);
        "function" === typeof e && e();
    }
    function Jd() {
        if (Sc && (0 != Rb || 0 != Sb || 0 != Lb))
            if (Z.tracking && 0 == Lb) h.zoomAndPanToView(h.getX() + Rb, h.getY() + Sb);
            else {
                var a = Rb,
                    b = Sb,
                    c = Lb,
                    d = h.getZoom();
                0 != c && ((d = ja(oa, va * (1 + c))), (d = Ta(d)), d != Z.imageZ && Kd(d));
                if (0 != a || 0 != b)
                    (a = parseFloat(I.left) + a),
                        (b = parseFloat(I.top) + b),
                        (d = Ga(a, b, d, Z.imageR, "container")),
                        (I.left = Math.round(d.x) + "px"),
                        (I.top = Math.round(d.y) + "px"),
                        (b = d.x - ib),
                        (d = d.y - jb),
                        ha && Za && (Z.mobileDevice || Math.abs(b) > Y / 2 || Math.abs(d) > ba / 2) && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display");
                x && 30 < x.length ? 0 == Sf % 2 && h.syncViewportRelated() : h.syncViewportRelated();
                Sf++;
                Sc = window.setTimeout(Jd, Tf);
            }
    }
    function Ld(a, b, c, d, e, f, m) {
        qe++;
        var g = e / f,
            n = qe * g,
            k = Z.Utils.easing(Z.imageX, a, n, e),
            r = Z.Utils.easing(Z.imageY, b, n, e),
            p = Z.Utils.easing(Z.imageZ, c, n, e),
            n = Z.Utils.easing(Z.imageR, d, n, e),
            r = h.convertImageCoordsToViewportEdgeCoords(k, r, p),
            k = r.x,
            r = r.y,
            A = !1,
            v = (syncOversize = !1);
        if (parseFloat(I.left) != k || parseFloat(I.top) != r) (I.left = k + "px"), (I.top = r + "px"), (v = !0), ha && Za && (syncOversize = !0);
        p != Z.imageZ && (Kd(p, !1), (A = v = !0), ha && Za && (La.restore(), La.save(), La.scale(Ab, Ab), (syncOversize = !0)));
        n != Z.imageR && (Z.Utils.rotateElement(I, n), ha && Za && (La.rotate(((n - Z.imageR) * Math.PI) / 180), (syncOversize = !0)), (Z.imageR = n), (v = !0));
        syncOversize && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display");
        h.syncViewportRelated(!1, x && 40 > x.length, !1, !1, !1);
        0 == qe % 2 && h.syncViewportRelated(!1, !1, A, v, A);
        p = Z.tour && Z.tourStop && 0 == Math.round(Z.imageR % 90);
        qe < f + 1 && !p
            ? (re = window.setTimeout(function () {
                  Ld(a, b, c, d, e, f, m);
              }, g))
            : (p && (Z.tourPlaying = !1), (Z.interactive = !0), ud(), h.updateView(), h.toggleWatermarks(!0), x && 39 < x.length && h.setHotspotsVisibility(!0), "function" === typeof m && m());
    }
    function se() {
        Sf = Lb = Sb = Rb = 0;
        Sc && (window.clearTimeout(Sc), (Sc = null));
    }
    function ud() {
        re && (window.clearTimeout(re), (re = null));
    }
    function Kd(a, b) {
        var c = !1,
            d = Da(oa, a);
        if (d != va) {
            va = d;
            var c = d / hc,
                e = xa * c,
                f = za * c,
                m = (xa - e) / 2,
                g = (za - f) / 2;
            d < hc && ((d = Ga(parseFloat(I.left), parseFloat(I.top), a, Z.imageR, "container")), (I.left = d.x + "px"), (I.top = d.y + "px"));
            if (Z.useCanvas)
                if (
                    ((qa.width = e + "px"),
                    (qa.height = f + "px"),
                    (qa.left = m + "px"),
                    (qa.top = g + "px"),
                    Oa && ((vb.width = e + "px"), (vb.height = f + "px"), (vb.left = m + "px"), (vb.top = g + "px")),
                    cb && ((Cb.width = e + "px"), (Cb.height = f + "px"), (Cb.left = m + "px"), (Cb.top = g + "px")),
                    Na && ((Db.width = e + "px"), (Db.height = f + "px"), (Db.left = m + "px"), (Db.top = g + "px")),
                    (Ab = Da(Tb, h.getZoom())),
                    (d = 8 < Ab),
                    Za || d)
                ) {
                    if ((null !== La && "undefined" === typeof b) || null === b || (b && ha && ("in" != Z.zooming || e > Z.scaleThreshold || f > Z.scaleThreshold)))
                        La.restore(), La.save(), La.scale(Ab, Ab), La.rotate((Z.imageR * Math.PI) / 180), N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display");
                    $b = c = Da(Ya, a);
                    e = c / tierBackfillScalePrior;
                    c = Bc * e;
                    e *= Cc;
                    f = dc + (Bc - c) / 2;
                    d = ec + (Cc - e) / 2;
                    ca.width = c + "px";
                    ca.height = e + "px";
                    ca.left = f + "px";
                    ca.top = d + "px";
                } else
                    ha && Z.Utils.clearDisplay(ha),
                        (e = Bc * c),
                        (f = Cc * c),
                        (m = dc + Z.imageX * (1 - c) * Z.imageZ),
                        (g = ec + Z.imageY * (1 - c) * Z.imageZ),
                        (ca.width = e + "px"),
                        (ca.height = f + "px"),
                        (ca.left = m + "px"),
                        (ca.top = g + "px");
            else
                N(la, oa, Kb, "centerOut", !1, "Scaling: non-canvas zoom"),
                    Za
                        ? ((c = Lg), (Bc = xa * c), (Cc = za * c), (dc = -(xa / c)), (ec = -(za / c)), (Uf = Ob * c), (Vf = Pb * c), (ta.width = Bc), (ta.height = Cc), (ca.width = ta.width + "px"), (ca.height = ta.height + "px"))
                        : ((c = Mb[Ya]), (ta.width = Bb[Ya]), (ta.height = c), (c = Z.imageY * a), (dc = Ob - Z.imageX * a), (ec = Pb - c)),
                    (ca.left = dc + "px"),
                    (ca.top = ec + "px"),
                    N(ta, Ya, Eb, "simple", !1, "Scaling: non-canvas zoom - backfill");
            c = !0;
        }
        return c;
    }
    function te() {
        h.toggleFullViewMode(!1);
    }
    function ue() {
        vd && 0 != wd && (h.rotateStep(wd, !1), (vd = window.setTimeout(ue, Mg)), h.syncViewportRelated(!1, x && 40 > x.length, !1, !0, !1));
    }
    function Ea(a) {
        a = Z.Utils.event(a);
        var b = a.type;
        if (a && b) {
            var c = !Wa && ("polygon" == Z.labelMode || "measure" == Z.labelMode),
                d = Z.Utils.isRightMouseButton(a),
                e = a.altKey;
            if (("mouseover" != b && "mouseout" != b && !Z.interactive) || ("mousedown" == b && (!Z.interactive || (Z.coordinatesVisible && e))) || (d && !c)) Z.tourStop = !0;
            else {
                if ("mousedown" == b || "touchstart" == b || (Z.tourPlaying && Z.tourStop)) h.zoomAndPanAllStop(), h.tourStop(), (Z.tourStop = !0), (Z.interactive = !0);
                Z.touchSupport && !Z.clickZoomAndPanBlock && "touchmove" != b && "gesturechange" != b && a.preventDefault();
                if ("mousedown" == b)
                    window.setTimeout(function () {
                        h.zoomAndPanAllStop(!1, !0);
                    }, 1),
                        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
                else if ("touchstart" == b || "gesturestart" == b)
                    (c = !1),
                        (touch = Z.Utils.getFirstTouch(a)),
                        "undefined" !== typeof touch &&
                            null !== touch &&
                            ((d = nc(touch.target)),
                            null === d ? (c = !0) : ((d = d.id.substring(3, d.id.length)), (d = Z.Utils.arrayIndexOfObjectValue(x, "internalID", d)), -1 != d && ((d = x[d]), null !== d && "function" == d.clickURL && (c = !0)))),
                        c && a.preventDefault(),
                        h.zoomAndPanAllStop(!1, !0),
                        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
                switch (b) {
                    case "mouseover":
                        Z.fullView || "TEXTAREA" == document.activeElement.tagName || Z.Viewer.initializeViewerKeyDefaultListeners(!0);
                        break;
                    case "mousedown":
                        !Z.fullView && document.activeElement && document.activeElement.blur();
                        Z.Viewer.initializeViewerKeyEventListeners(!0);
                        Z.Utils.addEventListener(document, "mousemove", Ea);
                        Z.Utils.addEventListener(document, "mouseup", Ea);
                        break;
                    case "mouseup":
                        Z.Utils.removeEventListener(document, "mousemove", Ea), Z.Utils.removeEventListener(document, "mouseup", Ea);
                }
                df(a);
                if ("mousedown" == b || "mousemove" == b) return !1;
            }
        }
    }
    function df(b) {
        var c = Ma.toString();
        b = Z.Utils.event(b);
        var d = b.type;
        if (b && d) {
            var e, m, f;
            if ("touchstart" == d || "touchmove" == d || "touchend" == d || "touchcancel" == d) (e = Z.Utils.getFirstTouch(b)), "undefined" !== typeof e && ((m = e.target), (f = new Z.Utils.Point(e.pageX, e.pageY)));
            else {
                m = Z.Utils.target(b);
                Z.Utils.relatedTarget(b);
                var g = Z.Utils.isRightMouseButton(b),
                    n = b.altKey;
                "resize" != d && (f = Z.Utils.getMousePosition(b));
                Z.smoothPan && (tc = f);
            }
            "DOMMouseScroll" == d && (d = "mousewheel");
            var k = h.getZoom(),
                r = (100 * k).toString(),
                p;
            "undefined" !== typeof f && null !== f && (p = h.getClickCoordsInImage(b, k, f));
            switch (d) {
                case "mousedown":
                    Z.mouseIsDown = !0;
                    Z.comparison && ((r = m.id), (c = r.substring(r.indexOf("viewportDisplay") + 15, r.length)), (Ma = Z.Utils.stringValidate(c) ? parseInt(c, 10) : 0), Z.Viewer.viewportSelect(Ma));
                    xb = new Z.Utils.Point(f.x, f.y);
                    ve = new Date().getTime();
                    sa.mouseXPrior = f.x;
                    sa.mouseYPrior = f.y;
                    if ((("rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode) && null !== C) || ("rectangle" == Z.labelMode && null === C)) Ha = Lf(b, p);
                    if (Z.zoomRectangle && n && !Z.measureVisible && "view" == Z.labelMode && null === Z.editing) {
                        if ("none" == pb.display || "none" == Db.display || "none" == Cb.display) (pb.display = Db.display = Cb.display = "inline-block"), Z.Utils.addEventListener(Hc, "mousedown", Z.Utils.preventDefault);
                        Pc = !0;
                        fb = !1;
                        f = 1;
                        sb(null, !1, p);
                        sb(C, !1, new Z.Utils.Point(p.x + f, p.y));
                        sb(C, !1, new Z.Utils.Point(p.x + f, p.y + f));
                        sb(C, !1, new Z.Utils.Point(p.x, p.y + f));
                        rd(C, !0);
                        Ha = 2;
                    } else if (!n && "view" != Z.labelMode && ("addLabel" == Z.editing || "editLabel" == Z.editing || (null === Z.editMode && "measure" == Z.labelMode))) {
                        Z.Utils.hideMessage();
                        if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction() && ("freehand" == Z.labelMode || "rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode))
                            break;
                        "addLabel" == Z.editing && ("freehand" == Z.labelMode || ("rectangle" == Z.labelMode && null === Ha)) && h.saveEditsLabel(!0, !1, !1);
                        fb = !1;
                        "freehand" == Z.labelMode && Z.mouseIsDown
                            ? ("editLabel" == Z.editing && da && Z.Utils.arrayClear(da.polygonPts), (b = "editLabel" == Z.editing ? C : null), sb(b, !1, p), (Md = (p.x - Z.imageX) * k), (Nd = (p.y - Z.imageY) * k), rd(C, !1), (fb = !0))
                            : "rectangle" == Z.labelMode &&
                              null === Ha &&
                              ((f = 1),
                              (b = null),
                              "editLabel" == Z.editing && ((b = C), da && null === Ha && Z.Utils.arrayClear(da.polygonPts)),
                              sb(b, !1, p),
                              sb(C, !1, new Z.Utils.Point(p.x + f, p.y)),
                              sb(C, !1, new Z.Utils.Point(p.x + f, p.y + f)),
                              sb(C, !1, new Z.Utils.Point(p.x, p.y + f)),
                              rd(C, !0),
                              (Ha = 2),
                              (fb = !0));
                        fb && !Z.annotationsAddMultiple && (Z.editing = "editLabel");
                    } else if ((!n && !Z.labelsClickDrag) || ("addLabel" != Z.editing && "editLabel" != Z.editing))
                        Z.smoothPan && !n && Z.mousePan && 1 < Z.smoothPanEasing && (Tc(void 0), (we = xb), null === xd && (xd = new Z.Utils.Point(parseFloat(I.left), parseFloat(I.top))), null === Dc && (Dc = window.setInterval(ef, 50)));
                    else if ((L = nc(m))) {
                        f = h.z480(b.clientX, b.clientY);
                        r = new Z.Utils.Point(parseFloat(L.style.left), parseFloat(L.style.top));
                        b = f.x - r.x;
                        f = f.y - r.y;
                        L.mouseXPrior = xb.x;
                        L.mouseYPrior = xb.y;
                        L.mouseXOffset = b;
                        L.mouseYOffset = f;
                        L.style.zIndex = x.length + 1;
                        b = L.id.substring(3, L.id.length);
                        if (C && C != b) {
                            if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                            Mf("save", "labels");
                            var A = Z.Utils.arrayIndexOfObjectValue(x, "internalID", b);
                            -1 != A && (b = x[A]);
                            Z.Utils.validateCallback("labelSelectedInViewportGetIDs");
                        }
                        ra && (Z.hotspotListTitle || Z.tourListTitle) && (ra.selectedIndex = 0);
                    }
                    break;
                case "mousemove":
                    gb = new Z.Utils.Point(f.x, f.y);
                    r = (p.x - Z.imageX) * k;
                    m = (p.y - Z.imageY) * k;
                    ma && (clearTimeout(ma), (ma = null), rc(b, p, v));
                    if (Z.zoomRectangle && n && "view" == Z.labelMode && null === Z.editing) Kf(C, Ha, p);
                    else if (n || Z.tracking || ((null !== Z.editMode || "measure" != Z.labelMode) && ("view" == Z.labelMode || ("addLabel" != Z.editing && "editLabel" != Z.editing))))
                        if (L) {
                            if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                            h.getLabelEditable(C) &&
                                ((n = L.style),
                                (f = gb.x - L.mouseXPrior),
                                (r = gb.y - L.mouseYPrior),
                                (f = parseFloat(n.left) + f),
                                (r = parseFloat(n.top) + r),
                                (n.left = f + "px"),
                                (n.top = r + "px"),
                                (L.mouseXPrior = gb.x),
                                (L.mouseYPrior = gb.y),
                                ge(b, L, gb));
                        } else
                            !n &&
                                Z.mousePan &&
                                (Dc
                                    ? (tc = f)
                                    : Z.animation && h.getZoom() == Z.minZ
                                    ? (f.x > sa.mouseXPrior ? Z.Viewer.viewportNext() : f.x < sa.mouseXPrior && Z.Viewer.viewportPrior(), (sa.mouseXPrior = f.x), (sa.mouseYPrior = f.y))
                                    : ((r = f.x - sa.mouseXPrior),
                                      (b = f.y - sa.mouseYPrior),
                                      isNaN(r) ||
                                          isNaN(b) ||
                                          ((r = parseFloat(I.left) + r),
                                          (b = parseFloat(I.top) + b),
                                          (n = Ga(r, b, Z.imageZ, Z.imageR, "container")),
                                          (I.left = n.x + "px"),
                                          (I.top = n.y + "px"),
                                          (sa.mouseXPrior = f.x),
                                          (sa.mouseYPrior = f.y),
                                          (r = n.x - ib),
                                          (b = n.y - jb),
                                          ha && Za && (Z.mobileDevice || Math.abs(r) > Y / 2 || Math.abs(b) > ba / 2) && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display"),
                                          (b = h.calculateCurrentCenterCoordinates(n, Z.imageZ, Z.imageR)),
                                          Z.Navigator && Z.Navigator.z658(b),
                                          Z.Utils.setBookmarksURL(),
                                          Z.Viewer.syncComparisonViewport(),
                                          Z.Viewer.syncOverlayViewports(null, a),
                                          Z.tracking && h.syncTrackingToViewport())));
                    else {
                        if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction() && ("freehand" == Z.labelMode || "rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode))
                            break;
                        b = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C);
                        b = -1 != b ? x[b].polyClosed : !1;
                        "freehand" == Z.labelMode && Z.mouseIsDown
                            ? (z511(Md, Nd, r, m, p), (Md = r), (Nd = m))
                            : (!Z.measureVisible && !h.getLabelEditable(C)) || ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || null === Ha || !Z.mouseIsDown
                            ? ("polygon" != Z.labelMode && "measure" != Z.labelMode) || b || (Z.mouseIsDown && (!Z.mouseIsDown || null === Ha)) || Jg(r, m, p)
                            : Kf(C, Ha, p);
                    }
                    break;
                case "mouseup":
                    Z.mouseIsDown = !1;
                    document.mousemove = null;
                    document.mouseup = null;
                    e = new Date().getTime();
                    Z.mouseOutDownPoint ? ((d = Z.mouseOutDownPoint), (p = h.getClickCoordsInImage(b, k, Z.mouseOutDownPoint))) : (d = new Z.Utils.Point(f.x, f.y));
                    f = Z.Utils.calculatePointsDistance(xb.x, xb.y, d.x, d.y);
                    k = e - ve;
                    if ((f < xe && k < ye) || (!n && ("freehand" == Z.labelMode || "rectangle" == Z.labelMode)))
                        if (!L && ((null === Z.editMode && "measure" == Z.labelMode) || ("view" != Z.labelMode && ("addLabel" == Z.editing || "editLabel" == Z.editing)))) {
                            if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                            "addLabel" != Z.editing || n || !Wa || ("text" != Z.labelMode && "icon" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || h.saveEditsLabel(!0, !1, !1);
                            if ((n && Wa && !g) || ("freehand" != Z.labelMode && "rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode))
                                if (n) n && ("text" == Z.labelMode || "icon" == Z.labelMode) && da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                else {
                                    b = "undefined" !== typeof bb && 0 < bb.options.length ? (b = bb.options[bb.selectedIndex].value) : 0;
                                    fb = !1;
                                    if ("text" == Z.labelMode)
                                        "addLabel" == Z.editing
                                            ? (h.createLabelFromParameters(
                                                  null,
                                                  null,
                                                  "text",
                                                  null,
                                                  null,
                                                  p.x.toString(),
                                                  p.y.toString(),
                                                  r,
                                                  null,
                                                  null,
                                                  null,
                                                  "0",
                                                  "0",
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  Oc,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  null,
                                                  "5",
                                                  "0",
                                                  null,
                                                  b
                                              ),
                                              (fb = !0))
                                            : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                    else if ("icon" == Z.labelMode) {
                                        if ((f = document.getElementById("labelIconList" + c))) {
                                            f = f[f.selectedIndex].value;
                                            var u;
                                            switch (f) {
                                                case "shim":
                                                    u = Z.labelIconsInternal ? "circle" : Sa + "/circle.png";
                                                    break;
                                                case "External Graphics File":
                                                    u = f;
                                                    break;
                                                default:
                                                    u = Z.labelIconsInternal ? f : Sa + "/" + f;
                                            }
                                            "addLabel" == Z.editing
                                                ? (h.createLabelFromParameters(
                                                      null,
                                                      null,
                                                      "icon",
                                                      u,
                                                      null,
                                                      p.x.toString(),
                                                      p.y.toString(),
                                                      r,
                                                      null,
                                                      null,
                                                      null,
                                                      "0",
                                                      "0",
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      Oc,
                                                      null,
                                                      lineStrokeColor,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      "0",
                                                      null,
                                                      b
                                                  ),
                                                  (fb = !0))
                                                : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                        }
                                    } else if ("counter" == Z.labelMode && "addLabel" == Z.editing) {
                                        n = Z.Utils.getResource("CONTENT_TRACKINGTEXTCOLOR");
                                        m = Z.Utils.getResource("CONTENT_TRACKINGLINECOLOR");
                                        var w = Z.Utils.getResource("CONTENT_TRACKINGFILLCOLOR"),
                                            d = Z.userName,
                                            c = Z.userInitials,
                                            k = dd("label");
                                        f = Math.round(p.x).toString();
                                        r = Math.round(p.y).toString();
                                        u = h.getTrackingCellIDFromCoordinates(f, r, "100");
                                        var ia = (e = g = null),
                                            A = Z.Utils.arrayIndexOfObjectValue(Ng, "value", Z.trackingTypeCurrent);
                                        -1 != A && ((w = Ng[A]), (g = w.text), (ia = w.text + " : " + Z.userName), (e = w.value), (w = w.fillColor));
                                        Z.Utils.stringPadFront(u, 6, "0");
                                        Z.Utils.stringPadFront(k, 6, "0");
                                        u = "circle";
                                        var A = Z.Utils.getResource("CONTENT_COUNTERCAPTIONPOSITION"),
                                            lb = Z.Utils.getCurrentUTCDateAsString();
                                        h.createLabelFromParameters(
                                            k,
                                            g,
                                            "counter",
                                            u,
                                            null,
                                            f,
                                            r,
                                            "100",
                                            null,
                                            null,
                                            40,
                                            "0",
                                            "0",
                                            null,
                                            null,
                                            null,
                                            c,
                                            null,
                                            ia,
                                            n,
                                            null,
                                            m,
                                            w,
                                            "1",
                                            "0",
                                            "1",
                                            "1",
                                            A,
                                            "0",
                                            null,
                                            b,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            e,
                                            null,
                                            null,
                                            null,
                                            null,
                                            d,
                                            Z.userInitials,
                                            lb
                                        );
                                        fb = !0;
                                        h.syncTrackingToViewport();
                                    }
                                    fb && ((b = Ia[Ia.length - 1]), z611(b.poiID, b.value), (fb = !1), Z.annotationsAddMultiple || (Z.editing = "editLabel"));
                                }
                            else if (n || g) rc(b, p), Wa || Z.Utils.addEventListener(document, "mousemove", Ea);
                            else {
                                Z.Utils.addEventListener(document, "mousemove", Ea);
                                var v = !1;
                                ma
                                    ? ((v = !0), clearTimeout(ma), (ma = null), rc(b, p, v), Z.Utils.removeEventListener(document, "mousemove", Ea))
                                    : ((ma = setTimeout(function (a) {
                                          ma = null;
                                          rc(a, p, v);
                                      }, Z.doubleClickDelay)),
                                      "polygon" != Z.labelMode && "measure" != Z.labelMode && Z.Utils.removeEventListener(document, "mousemove", Ea));
                            }
                        } else if (null !== L && (Z.measureVisible || Z.tour || Z.hotspots || Z.annotations)) L = null;
                        else {
                            if ((null === Z.editing || "view" == Z.labelMode) && !L)
                                if (((f = null), Z.labelClickSelect && (f = nc(m)), null !== f))
                                    (b = f.id.substring(3, f.id.length)),
                                        (A = Z.Utils.arrayIndexOfObjectValue(x, "internalID", b)),
                                        -1 != A && ((b = x[A]), h.zoomAndPanToView(b.x, b.y, b.z / 100, b.rotation), Z.Utils.validateCallback("labelSelectedInViewportGetIDs")),
                                        ra && (Z.hotspotListTitle || Z.tourListTitle) && (ra.selectedIndex = 0);
                                else {
                                    if (Z.clickZoom || Z.clickPan) {
                                        f = ma && Z.doubleClickZoom ? !0 : !1;
                                        var q = h.getClickZoomCoords3D(b, xb, oa, va, f);
                                    }
                                    Z.clickZoom
                                        ? Z.doubleClickZoom
                                            ? ma
                                                ? (clearTimeout(ma), (ma = null), h.zoomAndPanToView(q.x, q.y, q.z))
                                                : (ma = setTimeout(function (a) {
                                                      ma = null;
                                                      h.zoomAndPanToView(q.x, q.y, q.z);
                                                  }, Z.doubleClickDelay))
                                            : window.setTimeout(function () {
                                                  h.zoomAndPanToView(q.x, q.y, q.z);
                                              }, 1)
                                        : Z.clickPan && h.zoomAndPanToView(q.x, q.y, Z.imageZ);
                                    Z.zoomRectangle &&
                                        Pc &&
                                        ((b = x[C].polygonPts),
                                        h.deleteLabel(C),
                                        (Pc = null),
                                        Z.measureVisible || Z.tour || Z.hotspots || Z.annotations || ((pb.display = Db.display = Cb.display = "none"), Z.Utils.removeEventListener(Hc, "mousedown", Z.Utils.preventDefault)));
                                }
                        }
                    else {
                        if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                        Z.zoomRectangle && Pc && "view" == Z.labelMode && null === Z.editing
                            ? ((b = x[C].polygonPts),
                              h.deleteLabel(C, !0),
                              (Pc = null),
                              Z.measureVisible || Z.tour || Z.hotspots || Z.annotations || ((pb.display = Db.display = Cb.display = "none"), Z.Utils.removeEventListener(Hc, "mousedown", Z.Utils.preventDefault)),
                              h.zoomAndPanToZoomRectangle(b))
                            : ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || (!gd && (null !== Ha || Wa))
                            ? L &&
                              (h.getLabelEditable(C) && ((n = L.style), (f = d.x - L.mouseXPrior), (r = d.y - L.mouseYPrior), (f = parseFloat(n.left) + f), (r = parseFloat(n.top) + r), (n.left = f + "px"), (n.top = r + "px"), ge(b, L, d)),
                              (L.style.zIndex = L.zIndex),
                              (L = null))
                            : ((Ha = null),
                              (gd = !1),
                              (b = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C)),
                              -1 != b &&
                                  ((b = x[b]),
                                  (f = Z.Utils.polygonCenter(b.polygonPts, b.polyClosed)),
                                  (b.x = f.x),
                                  (b.y = f.y),
                                  Z.Utils.clearDisplay(Na),
                                  (f = new lc()),
                                  Nc(b, f),
                                  Wa || Z.Utils.addEventListener(document, "mousemove", Ea)));
                        gb = null;
                        Z.mousePan && !Z.smoothPan && h.updateView();
                    }
                    Z.mouseOutDownPoint &&
                        (Z.ToolbarDisplay && Z.toolbarAutoShowHide && Z.Toolbar.show(!1),
                        Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!1)),
                        Z.Toolbar &&
                            (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!1),
                            !Z.tracking || (2 != Z.trackingPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityTrackingPanel(!1),
                            (2 != Z.userPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityUserPanel(!1)));
                    break;
                case "touchstart":
                    if (e && !Uc) {
                        Z.mouseIsDown = !0;
                        ze = !1;
                        Z.comparison && ((r = m.id), (c = r.substring(r.indexOf("viewportDisplay") + 15, r.length)), (Ma = parseInt(c, 10)), Z.Viewer.viewportSelect(Ma));
                        xb = new Z.Utils.Point(f.x, f.y);
                        ve = new Date().getTime();
                        sa.mouseXPrior = f.x;
                        sa.mouseYPrior = f.y;
                        if ((("rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode) && null !== C) || ("rectangle" == Z.labelMode && null === C)) Ha = Lf(b, p);
                        if (!n && "view" != Z.labelMode && ("addLabel" == Z.editing || "editLabel" == Z.editing || (null === Z.editMode && "measure" == Z.labelMode))) {
                            "markup" != Z.editMode && h.toggleLabelColorPicker(!1);
                            h.toggleLabelIconPicker(!1);
                            Z.Utils.hideMessage();
                            if (
                                "function" === typeof Z.externalEditPermissionFunction &&
                                !Z.externalEditPermissionFunction() &&
                                ("freehand" == Z.labelMode || "rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode)
                            )
                                break;
                            "addLabel" == Z.editing && ("freehand" == Z.labelMode || ("rectangle" == Z.labelMode && null === Ha)) && h.saveEditsLabel(!0, !1, !1);
                            "freehand" == Z.labelMode && Z.mouseIsDown
                                ? ("editLabel" == Z.editing && da && Z.Utils.arrayClear(da.polygonPts), (b = "editLabel" == Z.editing ? C : null), sb(b, !1, p), (Md = (p.x - Z.imageX) * k), (Nd = (p.y - Z.imageY) * k), rd(C, !1))
                                : "rectangle" == Z.labelMode &&
                                  null === Ha &&
                                  ((f = 1),
                                  (b = null),
                                  "editLabel" == Z.editing && ((b = C), da && null === Ha && Z.Utils.arrayClear(da.polygonPts)),
                                  sb(b, !1, p),
                                  sb(C, !1, new Z.Utils.Point(p.x + f, p.y)),
                                  sb(C, !1, new Z.Utils.Point(p.x + f, p.y + f)),
                                  sb(C, !1, new Z.Utils.Point(p.x, p.y + f)),
                                  rd(C, !0),
                                  (Ha = 2));
                        } else if (n && ("addLabel" == Z.editing || "editLabel" == Z.editing) && (L = nc(m))) {
                            f = h.z480(b.clientX, b.clientY);
                            r = new Z.Utils.Point(parseFloat(L.style.left), parseFloat(L.style.top));
                            b = f.x - r.x;
                            f = f.y - r.y;
                            L.mouseXPrior = xb.x;
                            L.mouseYPrior = xb.y;
                            L.mouseXOffset = b;
                            L.mouseYOffset = f;
                            L.style.zIndex = x.length + 1;
                            b = L.id.substring(3, L.id.length);
                            if (C && C != b) {
                                if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                                Mf("save", "labels");
                                A = Z.Utils.arrayIndexOfObjectValue(x, "internalID", b);
                                -1 != A && (b = x[A]);
                                Z.Utils.validateCallback("labelSelectedInViewportGetIDs");
                            }
                            ra && (Z.hotspotListTitle || Z.tourListTitle) && (ra.selectedIndex = 0);
                        }
                    }
                    break;
                case "touchmove":
                    if (e && !Uc && !ze)
                        if (
                            ((gb = new Z.Utils.Point(f.x, f.y)),
                            (r = (p.x - Z.imageX) * k),
                            (m = (p.y - Z.imageY) * k),
                            ma && (clearTimeout(ma), (ma = null), rc(b, p, v)),
                            n || ((null !== Z.editMode || "measure" != Z.labelMode) && ("view" == Z.labelMode || ("addLabel" != Z.editing && "editLabel" != Z.editing))))
                        )
                            if (L) {
                                if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                                n = L.style;
                                f = gb.x - L.mouseXPrior;
                                r = gb.y - L.mouseYPrior;
                                f = parseFloat(n.left) + f;
                                r = parseFloat(n.top) + r;
                                n.left = f + "px";
                                n.top = r + "px";
                                L.mouseXPrior = gb.x;
                                L.mouseYPrior = gb.y;
                                ge(b, L, gb);
                            } else
                                !n &&
                                    Z.mousePan &&
                                    (Dc
                                        ? (tc = f)
                                        : ((r = f.x - sa.mouseXPrior),
                                          (b = f.y - sa.mouseYPrior),
                                          isNaN(r) ||
                                              isNaN(b) ||
                                              ((r = parseFloat(I.left) + r),
                                              (b = parseFloat(I.top) + b),
                                              (n = Ga(r, b, Z.imageZ, Z.imageR, "container")),
                                              (I.left = n.x + "px"),
                                              (I.top = n.y + "px"),
                                              (sa.mouseXPrior = f.x),
                                              (sa.mouseYPrior = f.y),
                                              (r = n.x - ib),
                                              (b = n.y - jb),
                                              ha && Za && (Z.mobileDevice || Math.abs(r) > Y / 2 || Math.abs(b) > ba / 2) && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display"),
                                              (b = h.calculateCurrentCenterCoordinates(n, Z.imageZ, Z.imageR)),
                                              Z.Navigator && Z.Navigator.z658(b),
                                              Z.Utils.setBookmarksURL(),
                                              Z.Viewer.syncComparisonViewport(),
                                              Z.Viewer.syncOverlayViewports(null, a),
                                              Z.tracking && h.syncTrackingToViewport())));
                        else {
                            if (
                                "function" === typeof Z.externalEditPermissionFunction &&
                                !Z.externalEditPermissionFunction() &&
                                ("freehand" == Z.labelMode || "rectangle" == Z.labelMode || "polygon" == Z.labelMode || "measure" == Z.labelMode)
                            )
                                break;
                            b = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C);
                            b = -1 != b ? x[b].polyClosed : !1;
                            "freehand" == Z.labelMode && Z.mouseIsDown
                                ? (z511(Md, Nd, r, m, p), (Md = r), (Nd = m))
                                : ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || null === Ha || !Z.mouseIsDown
                                ? ("polygon" != Z.labelMode && "measure" != Z.labelMode) || b || (Z.mouseIsDown && (!Z.mouseIsDown || null === Ha)) || Jg(r, m, p)
                                : Kf(C, Ha, p);
                        }
                    break;
                case "touchend":
                    if (!Uc && !ze) {
                        Z.mouseIsDown = !1;
                        document.mousemove = null;
                        document.mouseup = null;
                        e = new Date().getTime();
                        Z.mouseOutDownPoint
                            ? ((d = Z.mouseOutDownPoint), (p = h.getClickCoordsInImage(b, k, Z.mouseOutDownPoint)))
                            : (d = "undefined" !== typeof f && null !== f ? new Z.Utils.Point(f.x, f.y) : "undefined" !== typeof gb && null !== gb ? gb : xb);
                        f = Z.Utils.calculatePointsDistance(xb.x, xb.y, d.x, d.y);
                        k = e - ve;
                        if ((f < Od && k < qd) || (!n && ("rectangle" == Z.labelMode || "freehand" == Z.labelMode)))
                            if (L || ((null !== Z.editMode || "measure" != Z.labelMode) && ("view" == Z.labelMode || ("addLabel" != Z.editing && "editLabel" != Z.editing))))
                                null !== L && (Z.measureVisible || Z.tour || Z.hotspots || Z.annotations)
                                    ? (L = null)
                                    : (null !== Z.editing && "view" != Z.labelMode) ||
                                      L ||
                                      (Z.clickZoom
                                          ? ((f = ma && Z.doubleClickZoom ? !0 : !1),
                                            (q = h.getClickZoomCoords3D(b, xb, oa, va, f)),
                                            Z.doubleClickZoom
                                                ? ma
                                                    ? (clearTimeout(ma), (ma = null), h.zoomAndPanToView(q.x, q.y, q.z))
                                                    : (ma = setTimeout(function (a) {
                                                          ma = null;
                                                          h.zoomAndPanToView(q.x, q.y, q.z);
                                                      }, Z.doubleClickDelay))
                                                : window.setTimeout(function () {
                                                      h.zoomAndPanToView(q.x, q.y, q.z);
                                                  }, 1))
                                          : Z.clickPan && h.zoomAndPanToView(q.x, q.y, Z.imageZ));
                            else {
                                if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                                "addLabel" != Z.editing || n || !Wa || ("text" != Z.labelMode && "icon" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || h.saveEditsLabel(!0, !1, !1);
                                if ((n && Wa) || ("freehand" != Z.labelMode && "rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode))
                                    if (n) n && ("text" == Z.labelMode || "icon" == Z.labelMode) && da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                    else {
                                        b = "undefined" !== typeof bb && 0 < bb.options.length ? (b = bb.options[bb.selectedIndex].value) : 0;
                                        fb = !1;
                                        if ("text" == Z.labelMode)
                                            "addLabel" == Z.editing
                                                ? (h.createLabelFromParameters(
                                                      null,
                                                      null,
                                                      "text",
                                                      null,
                                                      null,
                                                      p.x.toString(),
                                                      p.y.toString(),
                                                      r,
                                                      null,
                                                      null,
                                                      null,
                                                      "0",
                                                      "0",
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      Oc,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      "5",
                                                      "0",
                                                      null,
                                                      b
                                                  ),
                                                  (fb = !0))
                                                : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                        else if ("icon" == Z.labelMode && (f = document.getElementById("labelIconList" + c))) {
                                            f = f[f.selectedIndex].value;
                                            switch (f) {
                                                case "shim":
                                                    u = Z.labelIconsInternal ? "circle" : Sa + "/circle.png";
                                                    break;
                                                case "External Graphics File":
                                                    u = f;
                                                    break;
                                                default:
                                                    u = Z.labelIconsInternal ? f : Sa + "/" + f;
                                            }
                                            "addLabel" == Z.editing
                                                ? (h.createLabelFromParameters(
                                                      null,
                                                      null,
                                                      "icon",
                                                      u,
                                                      null,
                                                      p.x.toString(),
                                                      p.y.toString(),
                                                      r,
                                                      null,
                                                      null,
                                                      null,
                                                      "0",
                                                      "0",
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      Oc,
                                                      null,
                                                      lineStrokeColor,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      null,
                                                      "0",
                                                      null,
                                                      b
                                                  ),
                                                  (fb = !0))
                                                : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0));
                                        }
                                        fb && ((b = Ia[Ia.length - 1]), z611(b.poiID, b.value), (fb = !1));
                                    }
                                else
                                    n || g
                                        ? (rc(b, p), Wa || Z.Utils.addEventListener(document, "mousemove", viewerEventsHandler))
                                        : (Z.Utils.addEventListener(document, "touchmove", Ea),
                                          (v = !1),
                                          ma
                                              ? ((v = !0), clearTimeout(ma), (ma = null), rc(b, p, v), Z.Utils.removeEventListener(document, "touchmove", Ea))
                                              : ((ma = setTimeout(function (a) {
                                                    ma = null;
                                                    rc(a, p, v);
                                                }, Z.doubleClickDelay)),
                                                "polygon" != Z.labelMode && "measure" != Z.labelMode && Z.Utils.removeEventListener(document, "touchmove", Ea)));
                                z638("label", Z.editing);
                            }
                        else {
                            if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                            ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || (!gd && (null !== Ha || Wa))
                                ? L &&
                                  ((n = L.style),
                                  (f = d.x - L.mouseXPrior),
                                  (r = d.y - L.mouseYPrior),
                                  (f = parseFloat(n.left) + f),
                                  (r = parseFloat(n.top) + r),
                                  (n.left = f + "px"),
                                  (n.top = r + "px"),
                                  ge(b, L, d),
                                  (L.style.zIndex = L.zIndex),
                                  (L = null))
                                : ((Ha = null),
                                  (gd = !1),
                                  (b = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C)),
                                  -1 != b &&
                                      ((b = x[b]),
                                      (f = Z.Utils.polygonCenter(b.polygonPts, b.polyClosed)),
                                      (b.x = f.x),
                                      (b.y = f.y),
                                      Z.Utils.clearDisplay(Na),
                                      (f = new lc()),
                                      Nc(b, f),
                                      Wa || Z.Utils.addEventListener(document, "touchmove", Ea)));
                            gb = null;
                            Z.mousePan && !Dc && h.updateView();
                        }
                        Z.mouseOutDownPoint &&
                            (Z.ToolbarDisplay && Z.toolbarAutoShowHide && Z.Toolbar.show(!1),
                            Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!1)),
                            Z.Toolbar &&
                                (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!1),
                                !Z.tracking || (2 != Z.trackingPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityTrackingPanel(!1),
                                (2 != Z.userPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityUserPanel(!1)));
                    }
                    break;
                case "touchcancel":
                    if (!Uc && !ze) {
                        Z.mouseIsDown = !1;
                        document.mousemove = null;
                        document.mouseup = null;
                        e = new Date().getTime();
                        Z.mouseOutDownPoint
                            ? ((d = Z.mouseOutDownPoint), (p = h.getClickCoordsInImage(b, k, Z.mouseOutDownPoint)))
                            : (d = "undefined" !== typeof f && null !== f ? new Z.Utils.Point(f.x, f.y) : "undefined" !== typeof gb && null !== gb ? gb : xb);
                        f = Z.Utils.calculatePointsDistance(xb.x, xb.y, d.x, d.y);
                        k = e - ve;
                        if ((f < Od && k < qd) || (!n && ("rectangle" == Z.labelMode || "freehand" == Z.labelMode)))
                            if (L || ((null !== Z.editMode || "measure" != Z.labelMode) && ("view" == Z.labelMode || ("addLabel" != Z.editing && "editLabel" != Z.editing))))
                                null !== L && (Z.measureVisible || Z.tour || Z.hotspots || Z.annotations)
                                    ? (L = null)
                                    : (null !== Z.editing && "view" != Z.labelMode) ||
                                      L ||
                                      (Z.clickZoom
                                          ? ((f = ma && Z.doubleClickZoom ? !0 : !1),
                                            (q = h.getClickZoomCoords3D(b, xb, oa, va, f)),
                                            Z.doubleClickZoom
                                                ? ma
                                                    ? (clearTimeout(ma), (ma = null), h.zoomAndPanToView(q.x, q.y, q.z))
                                                    : (ma = setTimeout(function (a) {
                                                          ma = null;
                                                          h.zoomAndPanToView(q.x, q.y, q.z);
                                                      }, Z.doubleClickDelay))
                                                : window.setTimeout(function () {
                                                      h.zoomAndPanToView(q.x, q.y, q.z);
                                                  }, 1))
                                          : Z.clickPan && h.zoomAndPanToView(q.x, q.y, Z.imageZ));
                            else {
                                if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                                "addLabel" != Z.editing || n || !Wa || ("text" != Z.labelMode && "icon" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || h.saveEditsLabel(!0, !1, !1);
                                (n && Wa) || ("freehand" != Z.labelMode && "rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode)
                                    ? n
                                        ? n && ("text" == Z.labelMode || "icon" == Z.labelMode) && da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0))
                                        : ((b = "undefined" !== typeof bb && 0 < bb.options.length ? (b = bb.options[bb.selectedIndex].value) : 0),
                                          (fb = !1),
                                          "text" == Z.labelMode
                                              ? "addLabel" == Z.editing
                                                  ? (h.createLabelFromParameters(
                                                        null,
                                                        null,
                                                        "text",
                                                        null,
                                                        null,
                                                        p.x.toString(),
                                                        p.y.toString(),
                                                        r,
                                                        null,
                                                        null,
                                                        null,
                                                        "0",
                                                        "0",
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        Oc,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        "5",
                                                        "0",
                                                        null,
                                                        b
                                                    ),
                                                    (fb = !0))
                                                  : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0))
                                              : "icon" == Z.labelMode &&
                                                (f = document.getElementById("labelIconList" + c)) &&
                                                ((f = f[f.selectedIndex].value),
                                                (u = "shim" == f ? "" : "External Graphics File" == f ? f : Sa + "/" + f),
                                                "addLabel" == Z.editing
                                                    ? (h.createLabelFromParameters(
                                                          null,
                                                          null,
                                                          "icon",
                                                          u,
                                                          null,
                                                          p.x.toString(),
                                                          p.y.toString(),
                                                          r,
                                                          null,
                                                          null,
                                                          null,
                                                          "0",
                                                          "0",
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          Oc,
                                                          null,
                                                          lineStrokeColor,
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          null,
                                                          "0",
                                                          null,
                                                          b
                                                      ),
                                                      (fb = !0))
                                                    : da && (h.modifyHotspot(C, "x", p.x, !0, !0), h.modifyHotspot(C, "y", p.y, !1, !0))),
                                          fb && ((b = Ia[Ia.length - 1]), z611(b.poiID, b.value), (fb = !1)))
                                    : n || g
                                    ? (rc(b, p), Wa || Z.Utils.addEventListener(document, "mousemove", viewerEventsHandler))
                                    : (Z.Utils.addEventListener(document, "touchmove", Ea),
                                      (v = !1),
                                      ma
                                          ? ((v = !0), clearTimeout(ma), (ma = null), rc(b, p, v), Z.Utils.removeEventListener(document, "touchmove", Ea))
                                          : ((ma = setTimeout(function (a) {
                                                ma = null;
                                                rc(a, p, v);
                                            }, Z.doubleClickDelay)),
                                            "polygon" != Z.labelMode && "measure" != Z.labelMode && Z.Utils.removeEventListener(document, "touchmove", Ea)));
                                z638("label", Z.editing);
                            }
                        else {
                            if ("function" === typeof Z.externalEditPermissionFunction && !Z.externalEditPermissionFunction()) break;
                            ("rectangle" != Z.labelMode && "polygon" != Z.labelMode && "measure" != Z.labelMode) || (!gd && (null !== Ha || Wa))
                                ? L &&
                                  ((n = L.style),
                                  (f = d.x - L.mouseXPrior),
                                  (r = d.y - L.mouseYPrior),
                                  (f = parseFloat(n.left) + f),
                                  (r = parseFloat(n.top) + r),
                                  (n.left = f + "px"),
                                  (n.top = r + "px"),
                                  ge(b, L, d),
                                  (L.style.zIndex = L.zIndex),
                                  (L = null))
                                : ((Ha = null),
                                  (gd = !1),
                                  (b = Z.Utils.arrayIndexOfObjectValue(x, "internalID", C)),
                                  -1 != b &&
                                      ((b = x[b]),
                                      (f = Z.Utils.polygonCenter(b.polygonPts, b.polyClosed)),
                                      (b.x = f.x),
                                      (b.y = f.y),
                                      Z.Utils.clearDisplay(Na),
                                      (f = new lc()),
                                      Nc(b, f),
                                      Wa || Z.Utils.addEventListener(document, "touchmove", Ea)));
                            gb = null;
                            Z.mousePan && !Dc && h.updateView();
                        }
                        Z.mouseOutDownPoint &&
                            (Z.ToolbarDisplay && Z.toolbarAutoShowHide && Z.Toolbar.show(!1),
                            Z.Navigator && 1 < Z.navigatorVisible && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2 && Z.Navigator2.setVisibility(!1)),
                            Z.Toolbar &&
                                (!Z.annotations || (2 != Z.annotationPanelVisible && 3 != Z.annotationPanelVisible) || Z.Toolbar.setVisibilityAnnotationPanel(!1),
                                !Z.tracking || (2 != Z.trackingPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityTrackingPanel(!1),
                                (2 != Z.userPanelVisible && 3 != Z.trackingPanelVisible) || Z.Toolbar.setVisibilityUserPanel(!1)));
                    }
                    break;
                case "gesturestart":
                    Ae(b);
                    Uc || (Uc = window.setInterval(ff, Sh));
                    break;
                case "gesturechange":
                    Wf = Math.round(100 * b.scale) / 100;
                    break;
                case "gestureend":
                    Uc && (window.clearInterval(Uc), (ze = !0), (Uc = null)), Z.mousePan && h.updateView();
            }
        }
    }
    function Tc(a) {
        null !== Dc && a && (window.clearInterval(Dc), (Dc = null));
        xd = Be = Ce = hb = null;
        yb = zb = fc = gc = 0;
    }
    function ef() {
        if (Z.animation && h.getZoom() == Z.minZ) {
            Z.animationCount++;
            null === De && (De = parseFloat(I.left));
            null === Ee && (Ee = parseFloat(I.top));
            var b = De,
                c = Ee;
            if (Z.mouseIsDown || hb) {
                var d = (hb ? Be : tc.x) - we.x,
                    e = (hb ? Ce : tc.y) - we.y,
                    m = b - xd.x,
                    f = c - xd.y;
                if (!(isNaN(d) || isNaN(e) || isNaN(m) || isNaN(f) || (0 == d && 0 == e && 0 == m && 0 == f))) {
                    var g = hb ? Z.smoothPanGlide : 1,
                        n = hb ? 1 : 100;
                    yb = Math.round((((d - m) / (Z.smoothPanEasing * g)) * n) / n);
                    zb = Math.round((((e - f) / (Z.smoothPanEasing * g)) * n) / n);
                    Z.mouseIsDown ? ((fc = yb), (gc = zb)) : (Math.abs(yb) > Math.abs(fc) && (yb = fc), Math.abs(zb) > Math.abs(gc) && (zb = gc));
                    c += zb;
                    De = b + yb;
                    Ee = c;
                    var p, r, k, A;
                    "motion" == Z.animator
                        ? ((p = "horizontal" == Z.animationAxis ? yb : zb), (dimensionAxis = "horizontal" == Z.animationAxis ? Y : ba), (r = Math.round(Th / Z.imageSetLength)), (k = p / 40), (A = 0))
                        : "position" == Z.animator &&
                          ((p = "horizontal" == Z.animationAxis ? m : f),
                          (dimensionAxis = "horizontal" == Z.animationAxis ? Y : ba),
                          (r = Math.max(0, Math.round((dimensionAxis / 2 - Math.abs(p)) / Uh))),
                          (k = 0),
                          (A = "horizontal" == Z.animationAxis ? Y / 10 : ba / 10));
                    0 == r && r++;
                    0 == Z.animationCount % r && (p < -A ? Z.Viewer.viewportPrior(k) : p > A && Z.Viewer.viewportNext(k));
                    hb && 0 == Math.round(yb * n) / n && 0 == Math.round(zb * n) / n && (hb = !1);
                }
            } else if (Z.mouseIsDown || null !== hb || 0 == yb || 0 == zb) Tc(!0), (Ee = De = null);
            else if (0 != fc || 0 != gc) (Be = tc.x + fc), (Ce = tc.y + gc), (hb = !0);
        } else if (((f = parseFloat(I.left)), (m = parseFloat(I.top)), Z.mouseIsDown || hb))
            (n = (hb ? Be : tc.x) - we.x),
                (p = (hb ? Ce : tc.y) - we.y),
                (r = f - xd.x),
                (k = m - xd.y),
                isNaN(n) ||
                    isNaN(p) ||
                    isNaN(r) ||
                    isNaN(k) ||
                    (0 == n && 0 == p && 0 == r && 0 == k) ||
                    ((A = hb ? Z.smoothPanGlide : 1),
                    (b = hb ? 1 : 100),
                    (yb = Math.round((((n - r) / (Z.smoothPanEasing * A)) * b) / b)),
                    (zb = Math.round((((p - k) / (Z.smoothPanEasing * A)) * b) / b)),
                    Z.mouseIsDown ? ((fc = yb), (gc = zb)) : (Math.abs(yb) > Math.abs(fc) && (yb = fc), Math.abs(zb) > Math.abs(gc) && (zb = gc)),
                    (f += yb),
                    (m += zb),
                    (n = Ga(f, m, Z.imageZ, Z.imageR, "container")),
                    (I.left = n.x + "px"),
                    (I.top = n.y + "px"),
                    (yb -= f - n.x),
                    (zb -= m - n.y),
                    ha && Za && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display"),
                    hb && 0 == Math.round(yb * b) / b && 0 == Math.round(zb * b) / b && (hb = !1),
                    (b = h.calculateCurrentCenterCoordinates(n, Z.imageZ, Z.imageR)),
                    Z.comparison && 0 != Ma ? Z.Navigator2 && Z.Navigator2.z658(b) : Z.Navigator && Z.Navigator.z658(b),
                    Z.Utils.setBookmarksURL(),
                    Z.Viewer.syncComparisonViewport(),
                    Z.Viewer.syncOverlayViewports(null, a),
                    Z.tracking && h.syncTrackingToViewport());
        else if (Z.mouseIsDown || null !== hb || 0 == yb || 0 == zb) Tc(!0), h.updateView();
        else if (((n = Ga(f + fc, m + gc, Z.imageZ, Z.imageR, "container")), (fc = n.x - f), (gc = n.y - m), 0 != fc || 0 != gc)) (Be = tc.x + fc), (Ce = tc.y + gc), (hb = !0);
    }
    function Ae(a) {
        a = Z.Utils.event(a);
        a.preventDefault();
        Wf = Math.round(100 * a.scale) / 100;
    }
    function ff(a) {
        if (Z.mousePan) {
            a = ja(oa, hc * Wf);
            var b = Ta(a);
            a != Z.imageZ && h.z633(b);
        }
    }
    function kd(a) {
        if ((a = Z.Utils.event(a))) {
            var b;
            if (Z.geoCoordinatesVisible) {
                if (((b = ""), Xf && Yf && Zf && $f)) {
                    var c = h.getClickCoordsInImage(a);
                    b = c;
                    c = Fe + b.x * Math.abs(Og / Z.imageW);
                    b = ag - b.y * Math.abs(Pg / Z.imageH);
                    var d = "E",
                        e = 1;
                    180 < c && (c -= 360);
                    -180 > c && (c += 360);
                    0 > c && ((d = "W"), (e = -1));
                    var f = (c - (c % 1)) * e,
                        c = Z.Utils.roundToFixed((c % 1) * 60 * e, 5),
                        c = f + ", " + c + ", " + d,
                        d = "N",
                        e = 1;
                    0 > b && ((d = "S"), (e = -1));
                    f = (b - (b % 1)) * e;
                    b = Z.Utils.roundToFixed((b % 1) * 60 * e, 5);
                    b = geoCoordsString = f + ", " + b + ", " + d + "    " + c;
                }
            } else
                "IIIFImageServer" == Z.tileSource
                    ? ((c = h.getClickCoordsInImage(a)), "mousemove" == a.type ? (b = h.getViewCoordinatesIIIFString(null, c, "show")) : "mousedown" == a.type && a.altKey && (b = h.getViewCoordinatesIIIFString(null, c, "save") + "\n"))
                    : ((c = Z.Utils.event(a)),
                      (b = h.getZoom()),
                      (d = h.getClickCoordsInImage(c, b)),
                      (c = Math.round(d.x).toString()),
                      (d = Math.round(d.y).toString()),
                      (b = (Math.round(1e3 * b) / 10).toString()),
                      (b = 'X="' + c + '"   Y="' + d + '"   ZOOM="' + b + '"'));
            "mousemove" == a.type ? Z.Utils.showCoordinates(b) : "mousedown" == a.type && a.altKey && Z.Utils.saveCoordinates(b);
        }
    }
    var Ib,
        ac,
        mb,
        Sa,
        sd = null,
        td = null,
        yd = 0,
        Ma = 0;
    "undefined" !== typeof a && null !== a && (Ma = a);
    var Wb;
    Wb = "undefined" !== typeof b && null !== b ? b : Z.imagePath;
    "undefined" === typeof d || null === d ? (ac = Ib = Z.hotspotPath) : ((ac = Ib = d), ".xml" == ac.toLowerCase().substring(ac.length - 4, ac.length) && (ac = ac.substring(0, ac.lastIndexOf("/"))));
    "undefined" === typeof c || null === c ? ((mb = Z.annotationPath), (Sa = Z.annotationFolder)) : ((Sa = mb = c), ".xml" == Sa.toLowerCase().substring(Sa.length - 4, Sa.length) && (Sa = Sa.substring(0, Sa.lastIndexOf("/"))));
    "undefined" === typeof e || null === e
        ? ((trackingPath = Z.trackingPath), (trackingFolder = Z.trackingFolder))
        : ((trackingFolder = trackingPath = e), ".xml" == trackingFolder.toLowerCase().substring(trackingFolder.length - 4, trackingFolder.length) && (trackingFolder = trackingFolder.substring(0, trackingFolder.lastIndexOf("/"))));
    "undefined" === typeof g || null === g
        ? ((imageListPath = Z.imageListPath), (imageListFolder = Z.imageListFolder))
        : ((imageListFolder = imageListPath = g), ".xml" == imageListFolder.toLowerCase().substring(imageListFolder.length - 4, imageListFolder.length) && (imageListFolder = imageListFolder.substring(0, imageListFolder.lastIndexOf("/"))));
    "undefined" !== typeof Ib && Z.Utils.stringValidate(Ib)
        ? ((Z.hotspots = !0), (Z.annotationPathProvided = !0), Z.imageSet && (Z.hotspotPath = "multiple"))
        : "undefined" !== typeof mb && Z.Utils.stringValidate(mb) && ((Z.annotations = !0), (Z.annotationPathProvided = !0), Z.imageSet && (Z.annotationPath = "multiple"));
    "undefined" !== typeof trackingPath && Z.Utils.stringValidate(trackingPath) && ((Z.tracking = !0), (Z.trackingPathProvided = !0));
    "undefined" !== typeof imageListPath && Z.Utils.stringValidate(imageListPath) && ((Z.imageListPath = imageListPath), (Z.imageList = !0));
    var h = this,
        uc = [],
        ld = -1,
        zd = 0,
        vc = 0,
        kb = parseInt(Z.Utils.getResource("z90"), 10),
        Dd = 8 * kb,
        $d = 4 * kb,
        Ec = 0,
        Xa = parseInt(Z.Utils.getResource("z221"), 10),
        Ra = parseInt(Z.Utils.getResource("z219"), 10),
        Pd = parseFloat(Z.Utils.getResource("z218")),
        Ge = Pd / 2,
        yc = parseInt(Z.Utils.getResource("z220"), 10),
        Qd = 1 == Z.toolbarVisible ? Z.toolbarH : 0,
        xe = parseInt(Z.Utils.getResource("DEFAULT_MOUSECLICKTHRESHOLDVIEWPORT"), 10),
        ye = parseInt(Z.Utils.getResource("DEFAULT_MOUSECLICKTHRESHOLDTIMEVIEWPORT"), 10),
        Od = parseInt(Z.Utils.getResource("DEFAULT_TOUCHTAPTHRESHOLDVIEWPORT"), 10),
        qd = parseInt(Z.Utils.getResource("DEFAULT_TOUCHTAPTHRESHOLDTIMEVIEWPORT"), 10),
        Xc,
        ha,
        Gb,
        La,
        nd,
        Fc,
        Gc,
        $a,
        sa,
        I,
        Ad,
        ta,
        ca,
        jc,
        Yc,
        la,
        qa,
        Qa,
        od,
        ob,
        ic,
        qc,
        Cd,
        Ja,
        pc,
        Hc,
        pa,
        pb,
        Zc,
        Ic,
        $c,
        Oe,
        bc,
        cb,
        Cb,
        Wd,
        uf,
        Na,
        Db,
        ab,
        sf,
        Ud,
        wf,
        qf,
        Bd,
        rf,
        mg,
        Md,
        Nd,
        tf,
        Oa,
        vb,
        Fa,
        vf,
        Vd,
        Le,
        Me;
    Q(Ma);
    var Qb,
        tb = 1,
        oa = 0,
        Ya = 0,
        Za = !1,
        Tb = 0,
        xf = !1,
        va,
        hc,
        $b,
        Ab,
        Bb = [],
        Mb = [],
        nb = [],
        Vb = [],
        Nb = [],
        md = [];
    tierTileOffsetsCount = [];
    tierTileOffsetChunks = [];
    tierTileOffsetLast = [];
    var Wc = [];
    tierTileByteCountsCount = [];
    tierTileByteCountChunks = [];
    tierTileByteCountLast = [];
    var Jc = [],
        Eb = [],
        wb = [],
        cc = [],
        xc = [],
        Zd = 0,
        Yd = 0,
        pg = 0,
        yf = 0,
        zf = 0,
        Af = 0,
        Df = 0,
        Qg,
        Se = 0,
        Te = 0,
        be = 0,
        ad = 0,
        ae = 0,
        bd = 0,
        pd = 0,
        Ue = 0,
        Kc = [],
        ya = [],
        Kb = [],
        zc = [],
        Lc = [],
        wc = [],
        Ed = null,
        Ve = 0,
        rh = parseInt(Z.Utils.getResource("DEFAULT_VALIDATEVIEWRETRYLIMIT"), 10),
        qg = parseInt(Z.Utils.getResource("DEFAULT_VALIDATEVIEWRETRYDELAY"), 10),
        Jb = [],
        Ke = [],
        db = [],
        Pa = [],
        Mc = [],
        qb = [],
        ph = new Z.NetConnector(),
        Rg = [],
        Sg = [],
        Tg = [],
        Ug = [],
        mf = parseInt(Z.Utils.getResource("z81"), 10),
        Vh = parseInt(Z.Utils.getResource("z78"), 10),
        Vg = parseInt(Z.Utils.getResource("z80"), 10),
        Xd = parseInt(Z.Utils.getResource("z77"), 10),
        Tb = Xd,
        Wg = parseInt(Z.Utils.getResource("z79"), 10),
        Qe = parseInt(Z.Utils.getResource("z76"), 10),
        Pe = parseInt(Z.Utils.getResource("z75"), 10),
        pf = null,
        of = null,
        nf = null,
        Wh = parseFloat(Z.Utils.getResource("z173UNCONVERTED"), 10),
        Xh = null !== Z.panBuffer ? Z.panBuffer : parseFloat(Z.Utils.getResource("z173"), 10),
        ng = "unconverted" != Z.tileSource ? Xh : Wh,
        Lg = parseFloat(Z.Utils.getResource("z74"), 10),
        jh = parseFloat(Z.Utils.getResource("DEFAULT_z310SIZEMAXBROWSER"), 10),
        ih = parseFloat(Z.Utils.getResource("DEFAULT_z310SIZEMAXFIREFOX"), 10),
        hh = parseFloat(Z.Utils.getResource("DEFAULT_z310SIZEMAXMOBILE"), 10),
        gh = parseFloat(Z.Utils.getResource("DEFAULT_z310SIZEMAXIMAGESET"), 10),
        Y,
        ba,
        lf,
        Td,
        xa,
        za,
        Ob,
        Pb,
        ib,
        jb,
        Bc,
        Cc,
        Uf,
        Vf,
        dc,
        ec;
    Y = Z.viewerW;
    ba = Z.viewerH;
    lf = Td = 0;
    ba -= Qd;
    0 == Z.toolbarPosition && (Td += Qd);
    var ma = null,
        xb,
        gb,
        ve,
        Uc = null,
        Wf = null,
        ze = !1,
        Sh = parseInt(Z.Utils.getResource("z122"), 10),
        gf = Math.round(parseFloat(Z.Utils.getResource("z176")) * Z.panSpeed),
        Rb = 0,
        Sb = 0,
        De = null,
        Ee = null,
        Th = parseInt(Z.Utils.getResource("DEFAULT_ANIMATIONOPTIMALMOTIONIMAGES"), 10),
        Uh = parseInt(Z.Utils.getResource("DEFAULT_ANIMATIONOPTIMALPOSITIONDELTA"), 10),
        Dc = null,
        we = null,
        xd = null,
        tc = null,
        yb = 0,
        zb = 0,
        fc = 0,
        gc = 0,
        hb = null,
        Be = null,
        Ce = null,
        Rd = parseFloat(Z.Utils.getResource("z242")) * Z.zoomSpeed;
    Z.mobileDevice && (Rd /= 2);
    var Lb = 0,
        Sc = null,
        Sf = 0,
        Tf = parseInt(Z.Utils.getResource("z238"), 10),
        Bf = parseFloat(Z.Utils.getResource("z112")) * Z.fadeInSpeed,
        Re = null,
        Xg = parseInt(Z.Utils.getResource("DEFAULT_ROTATIONSTEPDEGREES"), 10),
        Mg = parseInt(Z.Utils.getResource("DEFAULT_ROTATIONSTEPDURATION"), 10),
        wd = 0,
        vd = null,
        Yh = parseFloat(Z.Utils.getResource("z239")),
        bg = parseFloat(Z.Utils.getResource("z240"));
    Z.mobileDevice && (bg /= 2);
    var re = null,
        qe = 0;
    if (!Z.fullScreenVisible && !Z.fullPageVisible) var cg, dg, Yg, Zg, eg, $g, Sd, fg;
    Z.crosshairsVisible && Z.Utils.drawCrosshairs(Z.ViewerDisplay, Y, ba);
    if (Z.measureVisible || null !== Z.editMode) {
        var Eh = Z.Utils.getResource("z431"),
            Fh = Z.Utils.getResource("z431TOTAL"),
            Gh = Z.Utils.getResource("z433"),
            Ih = Z.Utils.getResource("z430"),
            Hh = Z.Utils.getResource("z434"),
            wh = parseFloat(Z.Utils.getResource("DEFAULT_MEASURECAPTIONBACKALPHA"));
        parseInt(Z.Utils.getResource("z154"), 10);
        parseInt(Z.Utils.getResource("z156"), 10);
    }
    if (Z.geoCoordinatesVisible) var Zf, $f, Xf, Yf, Fe, ag, Og, Pg;
    if (Z.imageFilters)
        var Cf = !1,
            qh = [];
    if (Z.watermarks)
        var cd,
            rg,
            ah = [],
            bh = [];
    if (Z.imageList)
        var sc,
            gg,
            Pf,
            hg,
            Ac = [];
    if (Z.tour) var fd, me, ig, Qf;
    null !== Z.imagePath &&
        (-1 != Z.imagePath.indexOf("zComparisonPath")
            ? ((Z.imageSetPath = Z.imagePath.substring(16, Z.imagePath.length)), (Z.imageSet = !0), (Z.comparison = !0))
            : -1 != Z.imagePath.indexOf("zSlidePath")
            ? ((Z.slidePath = Z.imagePath.substring(11, Z.imagePath.length)), (Z.slideshow = !0))
            : -1 != Z.imagePath.indexOf("zAnimationPath")
            ? ((Z.imageSetPath = Z.imagePath.substring(15, Z.imagePath.length)), (Z.imageSet = !0), (Z.animation = !0))
            : -1 != Z.imagePath.indexOf("zSlidestackPath") && ((Z.imageSetPath = Z.imagePath.substring(16, Z.imagePath.length)), (Z.imageSet = !0), (Z.slidestack = !0)));
    if (Z.slideshow) {
        var Fb = [],
            hf = [],
            Qc,
            Ub,
            oe,
            jg,
            kg,
            Je,
            Rf,
            ch = parseFloat(Z.Utils.getResource("z211")) * Z.slideTransitionSpeed;
        Z.slideTransitionTimeout = null;
        Z.slideOpacity = 0;
    }
    if (Z.zoomRectangle || Z.measureVisible || Z.tour || Z.hotspots || Z.annotations || Z.tracking) {
        var Pc = null,
            Jf = !1,
            x = [],
            kc = [],
            mc = [],
            ce = [],
            de = [],
            da = null,
            C = null,
            L = null,
            ke = null,
            Gd = null,
            le = null,
            dh = 0,
            Kg = null,
            Lh = parseInt(Z.Utils.getResource("DEFAULT_MOUSECLICKTHRESHOLDHOTSPOT"), 10),
            af = null,
            Ze = !1,
            Wa = !0,
            Ha = null,
            gd = !1,
            sg = new Z.NetConnector(),
            Mh = Z.Utils.getResource("DEFAULT_ICONLINEWIDTH"),
            Gg = Z.Utils.getResource("z177"),
            Oh = parseFloat(Z.Utils.getResource("DEFAULT_POLYGONALPHA")),
            ed = parseInt(Z.Utils.getResource("z180"), 10),
            Ph = Z.Utils.getResource("z96"),
            Ig = Z.Utils.getResource("z98"),
            Qh = Z.Utils.getResource("z113"),
            Rh = Z.Utils.getResource("z216"),
            $e = parseInt(Z.Utils.getResource("z97"), 10),
            Nh = Z.Utils.getResource("z177FREEHAND"),
            Oc = Z.captionTextColor ? Z.Utils.stringValidateColorValue(Z.captionTextColor) : Z.Utils.getResource("z89"),
            yg = Z.captionBackColor ? Z.Utils.stringValidateColorValue(Z.captionBackColor) : Z.Utils.getResource("DEFAULT_CAPTIONBACKCOLOR"),
            Bh = parseInt(Z.Utils.getResource("z129"), 10),
            Ag = parseInt(Z.Utils.getResource("z160"), 10),
            Bg = parseInt(Z.Utils.getResource("z151"), 10),
            Ch = parseInt(Z.Utils.getResource("z130"), 10),
            Cg = parseInt(Z.Utils.getResource("z161"), 10),
            Dg = parseInt(Z.Utils.getResource("z152"), 10);
        Z.mobileDevice && ($e *= 2);
        if (Z.maskVisible) {
            var He = [],
                eh = parseFloat(Z.Utils.getResource("DEFAULT_MASKFADESTEP")) * Z.maskFadeSpeed;
            Z.setCallback("viewUpdateComplete", function () {
                Z.maskingSelection && setMask();
            });
        }
        if (Z.tour || Z.hotspots)
            var ra,
                jf,
                Ne,
                lg,
                ee,
                fe,
                oc = [],
                tg = parseFloat(Z.Utils.getResource("DEFAULT_LABELICONWIDTH")),
                ug = parseFloat(Z.Utils.getResource("DEFAULT_LABELICONHEIGHT")),
                Ia = [],
                Xb = [];
        else if (Z.zoomRectangle || Z.measureVisible || Z.annotations || Z.tracking) {
            var oh,
                bb,
                kf,
                Yb,
                Ye,
                kh,
                lh,
                mh,
                nh,
                Xe,
                ie = [],
                je = [],
                fh = [],
                Ia = [],
                Xb = [];
            labelCaptionPositionListDP = [];
            labelTargetListDP = [];
            var Of = [],
                Nf = [],
                bf = [],
                fb = !1;
            parseFloat(Z.Utils.getResource("z147"));
            parseInt(Z.Utils.getResource("z148"), 10);
            tg = parseFloat(Z.Utils.getResource("DEFAULT_LABELICONWIDTH"));
            ug = parseFloat(Z.Utils.getResource("DEFAULT_LABELICONHEIGHT"));
            if (Z.tracking) var Ng = [];
        }
    }
    if (null !== Z.imagePath && "null" != Z.imagePath) {
        if (1 == Z.localUse && "ZoomifyImageFile" == Z.tileSource) {
            Z.Utils.showMessage(Z.Utils.getResource("z290"), !1, Z.messageDurationShort, "center");
            return;
        }
        if (1 == Z.localUse && "ZoomifyPFFFile" == Z.tileSource) {
            Z.Utils.showMessage(Z.Utils.getResource("z289"), !1, Z.messageDurationStort, "center");
            return;
        }
        1 == Z.localUse &&
            (Z.browser == Z.browsers.CHROME || Z.browser == Z.browsers.OPERA || (Z.browser == Z.browsers.IE && 11 == Z.browserVersion) || (Z.browser == Z.browsers.SAFARI && 7 <= Z.browserVersion)) &&
            Z.Utils.showMessage(Z.Utils.getResource("z288"), !1, Z.messageDurationStandard, "center");
        if (null !== Z.imageW && null !== Z.imageH && null !== Z.sourceMagnification)
            "undefined" !== typeof h.getStatus
                ? t(Z.imageW, Z.imageH, Xa, Ra, null, null, null, null, Z.sourceMagnification, Z.focal, Z.quality)
                : window.setTimeout(function () {
                      t(Z.imageW, Z.imageH, Xa, Ra, null, null, null, null, Z.sourceMagnification, Z.focal, Z.quality);
                  }, 100);
        else if (null !== Z.imageProperties) {
            var Zh = Z.Utils.xmlConvertTextToDoc(Z.imageProperties);
            v(Zh);
        } else if ("unconverted" == Z.tileSource) aa(Wb);
        else if (
            -1 == Z.imagePath.indexOf("zComparisonPath") &&
            -1 == Z.imagePath.indexOf("zSlidePath") &&
            -1 == Z.imagePath.indexOf("zOverlayPath") &&
            -1 == Z.imagePath.indexOf("zAnimationPath") &&
            -1 == Z.imagePath.indexOf("zSlidestackPath")
        ) {
            var Ie = new Z.NetConnector();
            ea(Wb, Ie, Ma);
        }
    }
    Z.imageList && ((Ie = new Z.NetConnector()), k(Ie));
    Z.slideshow && ((Ie = new Z.NetConnector()), q(Ie));
    this.clearAll = function (a, b, c, d) {
        a &&
            ((Yd = Zd = 0),
            "undefined" !== typeof Eb && Z.Utils.arrayClear(Eb),
            "undefined" !== typeof wb && Z.Utils.arrayClear(wb),
            "undefined" !== typeof Jc && Z.Utils.arrayClear(Jc),
            "undefined" !== typeof Kc && Z.Utils.arrayClear(Kc),
            "undefined" !== typeof ya && Z.Utils.arrayClear(ya),
            "undefined" !== typeof Kb && Z.Utils.arrayClear(Kb),
            "undefined" !== typeof zc && Z.Utils.arrayClear(zc),
            "undefined" !== typeof Lc && Z.Utils.arrayClear(Lc),
            "undefined" !== typeof wc && Z.Utils.arrayClear(wc),
            "undefined" !== typeof cc && Z.Utils.arrayClear(cc),
            "undefined" !== typeof xc && Z.Utils.arrayClear(xc),
            "undefined" !== typeof Mc && Z.Utils.arrayClear(Mc),
            "undefined" !== typeof Pa && Z.Utils.arrayClear(Pa),
            "undefined" !== typeof db && Z.Utils.arrayClear(db),
            "undefined" !== typeof qb && Z.Utils.arrayClear(qb),
            "undefined" !== typeof Ug && Z.Utils.arrayClear(Ug),
            "undefined" !== typeof Tg && Z.Utils.arrayClear(Tg),
            "undefined" !== typeof Sg && Z.Utils.arrayClear(Sg),
            "undefined" !== typeof Rg && Z.Utils.arrayClear(Rg),
            "undefined" !== typeof fullImageTilesAllCachedNames && Z.Utils.arrayClear(fullImageTilesAllCachedNames));
        b && F();
        c &&
            (Ja && ("undefined" !== typeof ah && Z.Utils.arrayClear(ah), "undefined" !== typeof bh && Z.Utils.arrayClear(bh)),
            pa &&
                ("undefined" !== typeof x && Z.Utils.arrayClear(x),
                "undefined" !== typeof kc && Z.Utils.arrayClear(kc),
                "undefined" !== typeof mc && Z.Utils.arrayClear(mc),
                null != ra
                    ? (ra.parentNode.removeChild(ra), (ra = null), "undefined" !== typeof oc && Z.Utils.arrayClear(oc))
                    : (null != bb && (bb.parentNode.removeChild(bb), (bb = null), "undefined" !== typeof ie && Z.Utils.arrayClear(ie)),
                      null != Yb && (Yb.parentNode.removeChild(Yb), (Yb = null), "undefined" !== typeof Ia && Z.Utils.arrayClear(Ia), "undefined" !== typeof Xb && Z.Utils.arrayClear(Xb)),
                      null != kf && (kf.parentNode.removeChild(kf), (kf = null), "undefined" !== typeof je && Z.Utils.arrayClear(je), "undefined" !== typeof fh && Z.Utils.arrayClear(fh)))));
        d &&
            (ha && Z.Utils.clearDisplay(ha),
            ta && Z.Utils.clearDisplay(ta),
            la && Z.Utils.clearDisplay(la),
            ob && Z.Utils.clearDisplay(ob),
            Ja && Z.Utils.clearDisplay(Ja),
            Oa && Z.Utils.clearDisplay(Oa),
            pa && (Z.Utils.clearDisplay(pa), (pa = null)),
            $c && (h.clearAnnotationPanel(Ma), h.setStatus("annotationPanelInitializedViewport", !1), ($c = null)),
            cb && Z.Utils.clearDisplay(cb),
            Na && Z.Utils.clearDisplay(Na),
            Ud && Z.Utils.clearDisplay(Ud),
            Bd && Z.Utils.clearDisplay(Bd));
    };
    this.setSizeAndPosition = function (a, b, c, d) {
        O(a, b, c, d);
    };
    this.syncViewportResize = function (a, b, c, d) {
        h.setSizeAndPosition(Z.viewerW, Z.viewerH, 0, 0);
        h.resizeViewport(a, b, c, d);
    };
    this.resizeViewport = function (a, b, c, d) {
        h.validateXYZDefaults();
        h.setView(a, b, c, d);
    };
    this.loadImageProperties = function (a, b, c) {
        ea(a, b, c);
    };
    this.parseZIFHeader = function (a) {
        F();
        if (73 == a[0] && 73 == a[1] && 43 == a[2] && 0 == a[3] && 8 == a[4] && 0 == a[5] && 0 == a[6] && 0 == a[7] && 16 == a[8] && 0 == a[9] && 0 == a[10] && 0 == a[11] && 0 == a[12] && 0 == a[13] && 0 == a[14] && 0 == a[15]) {
            for (var b = Z.Utils.longValue(a, 8), c = Z.Utils.longValue(a, b), d = 1, e = null, f = null, m = null, n = null, g = null, p = null, p = 2; 0 != b; ) {
                for (e = 0; e < c; e++)
                    switch (((f = b + 8 + 20 * e), Z.Utils.shortValue(a, f))) {
                        case 256:
                            Bb[d - 1] = Z.Utils.intValue(a, f + 12);
                            break;
                        case 257:
                            Mb[d - 1] = Z.Utils.intValue(a, f + 12);
                            break;
                        case 322:
                            m = Z.Utils.intValue(a, f + 12);
                            break;
                        case 323:
                            n = Z.Utils.intValue(a, f + 12);
                            break;
                        case 324:
                            var r = (tierTileOffsetsCount[d - 1] = Z.Utils.longValue(a, f + 4));
                            md[d - 1] = Z.Utils.longValue(a, f + 12);
                            g += r;
                            break;
                        case 325:
                            (r = tierTileByteCountsCount[d - 1] = Z.Utils.longValue(a, f + 4)),
                                (Wc[d - 1] = 1 == r ? Z.Utils.intValue(a, f + 12) : 2 == r ? Z.Utils.intValue(a, f + 12) + "," + Z.Utils.intValue(a, f + 16) : Z.Utils.longValue(a, f + 12));
                    }
                b = Z.Utils.longValue(a, b + 20 * c + 8);
                c = Z.Utils.longValue(a, b);
                d++;
            }
            e = Bb[0];
            f = Mb[0];
            tb = d - 1;
            Bb.reverse();
            Mb.reverse();
            tierTileOffsetsCount.reverse();
            md.reverse();
            tierTileByteCountsCount.reverse();
            Wc.reverse();
            !isNaN(e) && 0 < e && !isNaN(f) && 0 < f && !isNaN(m) && 0 < m && !isNaN(n) && 0 < n && 0 < g
                ? h.getStatus("initializedViewport")
                    ? J(e, f, m, n, g, p, null, null, null, null, null)
                    : t(e, f, m, n, g, p, null, null, null, null, null)
                : "ZoomifyImageFolder" == Z.tileSource
                ? Z.Utils.showMessage(Z.Utils.getResource("z252"), !1, Z.messageDurationStandard, "center")
                : Z.Utils.showMessage(Z.Utils.getResource("z250"), !1, Z.messageDurationStandard, "center");
        }
    };
    this.parseZIFOffsetChunk = function (a, b) {
        var c = Z.Utils.arrayIndexOfObjectValue(tierTileOffsetChunks, "chunkID", b);
        -1 != c && ((tierTileOffsetChunks[c].chunk = a), G(b, "offset"));
    };
    this.parseZIFByteCountChunk = function (a, b) {
        var c = Z.Utils.arrayIndexOfObjectValue(tierTileByteCountChunks, "chunkID", b);
        -1 != c && ((tierTileByteCountChunks[c].chunk = a), G(b, "byteCount"));
    };
    this.parseZIFImage = function (a, b, c) {
        a = "data:image/jpeg;base64," + Z.Utils.encodeBase64(a);
        var d;
        "image-display" == c
            ? (d = h.getStatus("imageSaving") ? ia : V)
            : "image-backfill" == c
            ? (d = h.getStatus("imageSaving") ? z599ToSave : Aa)
            : "navigator" == c
            ? (d = Z.Navigator.z556)
            : "gallery" == c && (d = Z.Gallery.initializeGallery);
        b = Z.Utils.createCallback(null, d, b);
        Z.Utils.createImageElementFromBytes(a, b);
    };
    this.z602 = function (a, b) {
        v(a, b);
    };
    this.validateXYZDefaults = function (a) {
        a && Z.Utils.resetParametersXYZ(Z.parameters);
        var b = parseFloat(Z.Utils.getResource("z143")),
            c = parseFloat(Z.Utils.getResource("z144")),
            d = parseFloat(Z.Utils.getResource("z145")),
            e = parseFloat(Z.Utils.getResource("DEFAULT_INITIALR")),
            f = parseFloat(Z.Utils.getResource("z163"));
        a = parseFloat(Z.Utils.getResource("z153"));
        b = isNaN(b) ? null : b;
        c = isNaN(c) ? null : c;
        d = isNaN(d) ? null : d;
        e = isNaN(e) ? null : e;
        f = isNaN(f) ? null : f;
        a = isNaN(a) ? null : a;
        Z.bookmarksGet
            ? (Z.initialX || (Z.initialX = b), Z.initialY || (Z.initialY = c), Z.initialZ || (Z.initialZ = d), Z.initialR || (Z.initialR = e), Z.minZ || (Z.minZ = f), Z.maxZ || (Z.maxZ = a))
            : "IIIFImageServer" == Z.tileSource
            ? Z.iiifRegion &&
              ((a = Z.iiifRegion.split(",")),
              (b = Z.iiifSize.split(",")),
              (Z.initialX = Math.round(parseFloat(a[0]) + parseFloat(a[2]) / 2)),
              (Z.initialY = Math.round(parseFloat(a[1]) + parseFloat(a[3]) / 2)),
              (Z.initialZ = Math.round((parseFloat(b[0]) / parseFloat(a[2])) * 100) / 100),
              (Z.initialR = parseInt(Z.iiifRotation, 10)))
            : Z.parameters
            ? (Z.parameters.zInitialX || (Z.initialX = b),
              Z.parameters.zInitialY || (Z.initialY = c),
              Z.parameters.zInitialZoom || (Z.initialZ = d),
              Z.parameters.zInitialRotation || (Z.initialR = e),
              Z.parameters.zMinZoom || (Z.minZ = f),
              Z.parameters.zMaxZoom || (Z.maxZ = a))
            : ((Z.initialX = b), (Z.initialY = c), (Z.initialZ = d), (Z.initialR = e), (Z.minZ = f), (Z.maxZ = a));
        null === Z.initialX && (Z.initialX = Z.imageW / 2);
        null === Z.initialY && (Z.initialY = Z.imageH / 2);
        Z.fitZ = h.z468(null, null, 0);
        Z.fillZ = h.calculateZoomToFill(null, null, 0);
        b = h.getStatus("initializedViewport") ? h.getRotation() : Z.initialR;
        a = h.z468(null, null, b);
        b = h.calculateZoomToFill(null, null, b);
        1 < Z.fitZ && (null !== Z.maxZ ? Z.fitZ > Z.maxZ && (Z.fitZ = Z.maxZ) : "unconverted" == Z.tileSource && (Z.fitZ = 1));
        1 < Z.fillZ && (null !== Z.maxZ ? Z.fillZ > Z.maxZ && (Z.fillZ = Z.maxZ) : "unconverted" == Z.tileSource && (Z.fillZ = 1));
        null === Z.minZ || -1 == Z.minZ ? (Z.minZ = Z.fitZ) : 0 == Z.minZ && (Z.minZ = Z.fillZ);
        if (null === Z.maxZ || -1 == Z.maxZ) Z.maxZ = 1;
        null === Z.initialZ || -1 == Z.initialZ ? (Z.initialZ = a) : 0 == Z.initialZ && (Z.initialZ = b);
        Z.initialZ < Z.minZ && (Z.initialZ = Z.minZ);
        Z.initialZ > Z.maxZ && (Z.initialZ = Z.maxZ);
    };
    this.getViewW = function () {
        return Y;
    };
    this.getViewH = function () {
        return ba;
    };
    this.getDisplayW = function () {
        return xa;
    };
    this.getDisplayH = function () {
        return za;
    };
    this.getImagePath = function () {
        return Wb;
    };
    this.setImagePath = function (a) {
        Wb = a;
    };
    this.getViewportID = function () {
        return Ma;
    };
    this.getTierCount = function () {
        return tb;
    };
    this.getTileW = function () {
        return Xa;
    };
    this.getTileH = function () {
        return Ra;
    };
    this.getTierCurrent = function () {
        return oa;
    };
    this.getTierBackfill = function () {
        return Ya;
    };
    this.getTierBackfillDynamic = function () {
        return Za;
    };
    this.getTierBackfillOversize = function () {
        return Tb;
    };
    this.getTierScale = function () {
        return va;
    };
    this.getX = function (a) {
        var b = parseFloat(I.left) - ib;
        a = h.getZoom(a);
        return sd - b / a;
    };
    this.getY = function (a) {
        var b = parseFloat(I.top) - jb;
        a = h.getZoom(a);
        return td - b / a;
    };
    this.getZoom = function (a) {
        var b = va;
        a && (b = (va * parseFloat(qa.width)) / xa);
        return ja(oa, b);
    };
    this.getRotation = function (a) {
        return Z.imageR;
    };
    this.getCoordinates = function () {
        new Z.Utils.Point(h.getX(), h.getY());
    };
    this.getCoordinatesBookmark = function (a, b) {
        var c = "";
        return (c = b ? "?" + h.getViewCoordinatesIIIFString(a, null, "bookmark") : "?" + h.getViewCoordinatesString(a));
    };
    this.getViewCoordinatesString = function (a) {
        var b = "x=" + Math.round(h.getX(a)).toString(),
            c = "&y=" + Math.round(h.getY(a)).toString(),
            d = "&z=" + Math.round(100 * h.getZoom(a)).toString();
        a = Math.round(h.getRotation(a));
        return b + c + d + (0 == a ? "" : "&r=" + a.toString());
    };
    this.getCoordinatesFull = function (a) {
        return new Z.Utils.Coordinates(h.getX(a), h.getY(a), h.getZoom(a), h.getRotation(a));
    };
    this.getCoordinatesDisplayFull = function () {
        return new Z.Utils.CoordinatesDisplayStyle(I.left, I.top, qa.width, qa.height, qa.left, qa.top, ca.width, ca.height, ca.left, ca.top, I.rotation);
    };
    this.getTiersScaleUpMax = function () {
        return Pd;
    };
    this.getTiersScaleDownMax = function () {
        return Ge;
    };
    this.getTilesCacheMax = function () {
        return yc;
    };
    this.getTierWs = function () {
        return Bb.join(",");
    };
    this.getTierHs = function () {
        return Mb.join(", ");
    };
    this.getTierTileCounts = function () {
        return Nb.join(", ");
    };
    this.getTilesToLoad = function () {
        return Zd;
    };
    this.getTilesLoadingNames = function () {
        return "" == ya.join(", ") ? "Current view loading complete" : ya.join(", ");
    };
    this.getTilesToDraw = function () {
        return bd;
    };
    this.getConstrainPan = function (a) {
        return Z.constrainPan;
    };
    this.setConstrainPan = function (a) {
        Z.constrainPan = "0" != a;
        Z.constrainPanLimit = parseInt(a, 10);
        Z.constrainPanStrict = "3" == a;
        Z.constrainPan && h.toggleConstrainPan(!0);
    };
    this.getSmoothPan = function () {
        return Z.smoothPan;
    };
    this.setSmoothPan = function (a) {
        Z.smoothPan = a;
    };
    this.getSmoothPanEasing = function () {
        return Z.smoothPanEasing;
    };
    this.setSmoothPanEasing = function (a) {
        Z.smoothPanEasing = a;
    };
    this.getSmoothPanGlide = function () {
        return Z.smoothPanGlide;
    };
    this.setSmoothPanGlide = function (a) {
        Z.smoothPanGlide = a;
    };
    this.getSmoothZoom = function () {
        return Z.smoothZoom;
    };
    this.setSmoothZoom = function (a) {
        Z.smoothZoom = a;
    };
    this.getSmoothZoomEasing = function () {
        return Z.smoothZoomEasing;
    };
    this.setSmoothZoomEasing = function (a) {
        Z.smoothZoomEasing = a;
    };
    this.setCoordinatesDisplayVisibility = function (a) {
        a
            ? (Z.Utils.addEventListener(document, "mousemove", kd), Z.Utils.addEventListener(document, "mousedown", kd))
            : ((Z.coordinatesVisible = !1), Z.Utils.removeEventListener(document, "mousemove", kd), Z.Utils.removeEventListener(document, "mousedown", kd));
    };
    this.setTourPath = function (a, b) {
        h.setHotspotPath(a, b);
    };
    this.setHotspotPath = function (a, b) {
        "undefined" === typeof a || Z.Utils.stringValidate(a)
            ? ((Z.hotspotPath = Z.Utils.stringRemoveTrailingSlashCharacters(a)),
              (Z.hotspotFolder = Z.hotspotPath),
              ".xml" == Z.hotspotPath.toLowerCase().substring(Z.hotspotPath.length - 4, Z.hotspotPath.length) && (Z.hotspotFolder = Z.hotspotFolder.substring(0, Z.hotspotFolder.lastIndexOf("/"))),
              b || (h.deleteAllHotspots(), Hb(Ma)))
            : ((Z.hotspotPath = null), (Z.hotspotFolder = null), h.deleteAllHotspots());
    };
    this.getHotspotCurrentID = function () {
        return C;
    };
    this.getHotspotCurrentIDExternal = function () {
        var a = h.getHotspotCurrentID();
        return (currIDExt = x[a].id);
    };
    this.getHotspots = function () {
        return x;
    };
    this.setHotspots = function (a) {
        x = a.slice(0);
    };
    this.setXMLCallbackFunction = function (a) {
        Z.xmlCallbackFunction = a;
    };
    this.setVisibility = function (a) {
        a = a ? "inline-block" : "none";
        Xc && !Gb && (Gb = Xc.style);
        Gb && (Gb.display = a);
        $a && !I && (I = $a.style);
        I && (I.display = a);
    };
    this.setOpacity = function (a) {
        Z.Utils.setOpacity($a, 2 <= a ? a / 100 : 0 > a ? 0 : 1 < a ? 1 : a);
    };
    this.showLists = function (a) {
        var b = a ? "visible" : "hidden";
        sc && (h.setImageListVisibilty(b), Z.comparison && Z.Viewport1.setImageListVisibilty(b));
        Z.hotspots && Z.Viewer.setVisibilityHotspotChoiceList(a, Ma.toString());
        Ub && (Ub.style.visibility = b);
        Z.imageSet && !Z.comparison && Z.Viewer.setVisibilityImageSetChoiceList(a);
    };
    this.z619 = function (b) {
        b || (w(Pe, wb), (pf = !0));
        (!Z.imageSet || Z.comparison || a == Z.imageSetStart || b) && tb > Wg && (w(Qe, wb), (of = !0), tb > Vg && (w(Xd, wb), (nf = !0)), h.setStatus("backfillPrecachedViewport", !0));
        wb.sort();
        wb = Z.Utils.arrayUnique(wb);
        Jc = wb.slice(0);
        h.traceDebugValues("tilesBackfillToPrecache", null, Jc.length);
        Ba(wb, Aa, "simple", "image-backfill");
    };
    this.prez581s = function (a) {
        if (Z.imageSet) Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADINGIMAGESET-LOADINGTILES"), !1, Z.messageDurationLong, "center"), h.updateView(!0, !0);
        else {
            Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADINGONEIMAGE-LOADINGTILES"), !1, Z.messageDurationLong, "center");
            Z.Utils.arrayClear(ya);
            a = 0;
            for (var b = tb; a < b; a++)
                for (var c = h.z542(a, null, !0, !0), d = c.l, e = c.r; d <= e; d++)
                    for (var f = c.t, m = c.b; f <= m; f++) {
                        var n = a + "-" + d + "-" + f;
                        ya[ya.length] = n;
                    }
            if (0 < ya.length) for (c = new Date().getTime(), a = 0, b = ya.length; a < b; a++) if ((n = ya[a])) (n = new y(n, "image-display")), T(n, c, V);
        }
    };
    this.updateView = function (b, c) {
        if ("undefined" === typeof a || null === a) a = 0;
        if (a != Z.viewportCurrentID && !b) {
            var d = Z["Viewport" + a.toString()];
            Z.imageX = d.getX(!0);
            Z.imageY = d.getY(!0);
            Z.imageZ = d.getZoom(!0);
            Z.imageR = d.getRotation(!0);
        }
        var e = Z.mouseIsDown || Z.buttonIsDown || Z.keyIsDown || Z.mouseWheelIsDown,
            d = va != hc || h.getZoom() != Z.imageZ || Z.imageZ != Z.priorZ,
            m = parseFloat(I.left) != ib || parseFloat(I.top) != jb || h.getX() != Z.imageX || h.getY() != Z.imageY,
            f = Z.fullViewPrior;
        if (d || m || f || ("undefined" !== typeof b && b && (!e || Z.animation)) || ("undefined" !== typeof c && c)) {
            Rc();
            if (Z.comparison || Z.overlays || !Z.imageSet || !Z.Viewer.getStatus("readyViewer") || (a > Z.viewportCurrentID - 1 && a < Z.viewportCurrentID + 1) || c) {
                var n = !1;
                if (b || parseFloat(qa.width) != la.width) {
                    if (Z.useCanvas) {
                        qa.width = la.width + "px";
                        qa.height = la.height + "px";
                        qa.left = "0px";
                        qa.top = "0px";
                        Qa.restore();
                        Qa.save();
                        try {
                            Qa.scale(va, va);
                        } catch (g) {
                            Z.Utils.showMessage(Z.Utils.getResource("ERROR_SCALINGCANVASFORUNCONVERTEDIMAGE")), console.log("In function z630 scaling canvas:  " + g);
                        }
                        Oa && ((vb.width = la.width + "px"), (vb.height = la.height + "px"), (vb.left = "0px"), (vb.top = "0px"));
                        cb && ((Cb.width = cb.width + "px"), (Cb.height = cb.height + "px"), (Cb.left = "0px"), (Cb.top = "0px"));
                        Na && ((Db.width = Na.width + "px"), (Db.height = Na.height + "px"), (Db.left = "0px"), (Db.top = "0px"));
                        ta &&
                            (Za
                                ? ((ca.width = ta.width + "px"), (ca.height = ta.height + "px"), (ca.left = dc + "px"), (ca.top = ec + "px"), jc.restore(), jc.save(), jc.scale($b, $b))
                                : ((ca.width = Bc + "px"), (ca.height = Cc + "px"), (ca.left = dc + "px"), (ca.top = ec + "px")));
                    }
                    n = !0;
                }
                if (b || parseFloat(I.left) != ib || parseFloat(I.top) != jb)
                    (n = parseFloat(I.left) - ib),
                        (e = parseFloat(I.top) - jb),
                        0 != Z.imageR && ((e = Z.Utils.rotatePoint(n, e, Z.imageR)), (n = e.x), (e = e.y)),
                        (I.left = ib + "px"),
                        (I.top = jb + "px"),
                        Za || ((dc = parseFloat(ca.left) + n), (ec = parseFloat(ca.top) + e), (ca.left = dc + "px"), (ca.top = ec + "px")),
                        (f = h.getZoom()),
                        (Z.imageX = sd = Z.imageX - n / f),
                        (Z.imageY = td = Z.imageY - e / f),
                        (n = !0);
                n && (N(la, oa, Kb, "centerOut", !1, "1a. Updating view: resetting display positions"), Z.maskingSelection && Oa && B(), Za && N(ta, Ya, Eb, "simple", !1, "1b. Updating view: resetting backfill positions"));
                n = !1;
                if (("undefined" !== typeof b && b) || va != hc || h.getZoom() != Z.imageZ || !h.getStatus("initializedViewport") || c) {
                    va != hc && (Z.imageZ = h.getZoom());
                    Z.imageZ < Z.minZ && (Z.imageZ = Z.minZ);
                    Z.imageZ > Z.maxZ && (Z.imageZ = Z.maxZ);
                    f = Pd;
                    for (e = tb; 0 < e && f / 2 >= Z.imageZ; ) e--, (f /= 2);
                    e = 0 > e - 1 ? 0 : e - 1;
                    f = Da(e, Z.imageZ);
                    if (e != oa || f != va) Z.useCanvas && (Qa.restore(), Qa.save(), Qa.scale(f, f)), oa != e && (xf = !0), (oa = e), (va = f);
                    hc = va;
                    if ("unconverted" != Z.tileSource) {
                        Za = !1;
                        oa > mf ? ((Ya = oa - Vh), (Za = !0)) : (Ya = oa > Vg ? Xd : oa > Wg ? Qe : Pe);
                        tierBackfillScalePrior = $b = Da(Ya, Z.imageZ);
                        var e = Bb[Ya],
                            f = Mb[Ya],
                            p = Z.imageX * Z.imageZ,
                            r = Z.imageY * Z.imageZ;
                        Za
                            ? ((e = Lg),
                              (Bc = xa * e),
                              (Cc = za * e),
                              (dc = -(xa / e)),
                              (ec = -(za / e)),
                              (Uf = Ob * e),
                              (Vf = Pb * e),
                              (ta.width = Bc),
                              (ta.height = Cc),
                              (ca.width = ta.width + "px"),
                              (ca.height = ta.height + "px"),
                              (ca.left = dc + "px"),
                              (ca.top = ec + "px"),
                              Z.useCanvas &&
                                  (ha && ((Ab = Da(Tb, Z.imageZ)), La.restore(), La.save(), La.scale(Ab, Ab), 0 != Z.imageR && La.rotate((Z.imageR * Math.PI) / 180)), jc.restore(), jc.translate(Uf, Vf), jc.save(), jc.scale($b, $b)))
                            : ((Bc = e * $b), (Cc = f * $b), (dc = Ob - p), (ec = Pb - r), (ta.width = e), (ta.height = f), Z.useCanvas && ((ca.width = Bc + "px"), (ca.height = Cc + "px")), (ca.left = dc + "px"), (ca.top = ec + "px"));
                        N(ta, Ya, Eb, "simple", !1, "2. Updating view: changing tier - backfill");
                    }
                    !b && 0 < yc && (n = !0);
                } else h.traceDebugValues("updateView-noChange");
                "unconverted" != Z.tileSource && Za ? wa(!0) : ha && Z.Utils.clearDisplay(ha);
            }
            a == Z.viewportCurrentID || Z.comparison || Z.overlays || !Z.imageSet || c
                ? ("unconverted" != Z.tileSource
                      ? (wa(), N(la, oa, null, "centerOut", n, "3. Updating view: prior to loading of any new tiles"))
                      : "undefined" !== typeof Qb &&
                        ((n = -Z.imageX),
                        (e = -Z.imageY),
                        Z.Utils.clearDisplay(la),
                        Qa.drawImage(Qb, n, e),
                        h.setStatus("displayLoadedViewport", !0),
                        h.setStatus("displayDrawnViewport", !0),
                        Z.Utils.validateCallback("viewUpdateComplete"),
                        Z.Utils.validateCallback("viewUpdateCompleteGetLabelIDs")),
                  Z.maskingSelection && setMask(),
                  0 < ya.length && Ba(ya, V, "centerOut", "image-display"),
                  h.syncViewportRelated(!0, !0, !0, !0, !0, !0, Z.comparison && a == Z.viewportCurrentID, Z.overlays && a == Z.viewportCurrentID, Z.bookmarksSet, Z.tracking))
                : (h.setStatus("displayLoadedViewport", !0), h.setStatus("displayDrawnViewport", !0));
            c && ((n = (h.getViewportID() + 1).toString() + " of " + Z.imageSetLength.toString()), Z.Utils.showMessage(Z.Utils.getResource("ALERT_PRELOADINGIMAGESET-UPDATINGVIEW") + "  " + n, !1, Z.messageDurationLong, "center"));
            m && Z.Utils.validateCallback("viewPanned");
            d && Z.Utils.validateCallback("viewZoomed");
            (m || d) && Z.Utils.validateCallback("viewChanged");
        }
    };
    syncTransitionCanvas = function () {
        ob && ic && qc && ((ob.width = la.width), (ob.height = la.height), (ic.width = qa.width), (ic.height = qa.height), (ic.left = qa.left), (ic.top = qa.top), qc.restore(), qc.save(), qc.translate(Ob, Pb), qc.scale(va, va));
    };
    this.loadUnconvertedImage = function (a) {
        aa(a);
    };
    this.getUnconvertedImage = function () {
        return Qb;
    };
    this.createUnconvertedImageThumbnail = function () {
        if (Z.useCanvas) {
            if ("undefined" !== typeof Qb) {
                var a = null,
                    a = 150 / Z.imageW,
                    b = Z.Utils.createContainerElement("canvas", "tempCanvas", "inline-block", "absolute", "visible", Z.imageW * a + "px", Z.imageH * a + "px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"),
                    c = b.getContext("2d");
                try {
                    c.scale(a, a), c.drawImage(Qb, 0, 0);
                } catch (d) {
                    console.log("In function initializeViewportContinue scaling canvas:  " + d);
                }
                a = new Image();
                a.src = b.toDataURL("image/jpeg", Z.saveImageCompression);
                return a;
            }
            window.setTimeout(function () {
                createUnconvertedImageThumbnail();
            }, 100);
        }
    };
    this.formatTilePath = function (a, b, c, d) {
        var e;
        if ("ZoomifyImageFile" == Z.tileSource) {
            e = "offsetLoading";
            var f = "loading",
                m = "loading",
                n;
            if (1 == tierTileOffsetsCount[a]) f = md[a];
            else {
                var g = new ua(a, b, c),
                    p = g.chunkID + "," + a + "," + b + "," + c + "," + d + ",offset";
                n = Z.Utils.arrayIndexOfObjectValue(tierTileOffsetChunks, "chunkID", g.chunkID);
                -1 == n
                    ? (h.traceDebugValues("z532", g.chunkID + "," + a + "," + b + "," + c + "," + d),
                      -1 == Z.Utils.arrayIndexOf(Pa, p) && (Pa[Pa.length] = p),
                      (tierTileOffsetChunks[tierTileOffsetChunks.length] = { chunkID: g.chunkID, chunk: "loading" }),
                      (n = new Z.NetConnector()),
                      n.loadByteRange(Wb, g.chunkStart, g.chunkEnd, "offset", null, g.chunkID))
                    : "loading" == tierTileOffsetChunks[n].chunk
                    ? -1 == Z.Utils.arrayIndexOf(Pa, p) && (Pa[Pa.length] = p)
                    : "loading" != tierTileOffsetChunks[n].chunk && ((n = tierTileOffsetChunks[n].chunk), (f = Z.Utils.longValue(n, g.offsetStartInChunk)));
            }
            1 == tierTileByteCountsCount[a]
                ? (m = Wc[a])
                : ((n = b + c * nb[a]),
                  2 == tierTileByteCountsCount[a]
                      ? ((a = Wc[a]), (m = 0 == n ? a.substring(0, a.indexOf(",")) : a.substring(a.indexOf(",") + 1, a.length)))
                      : ((g = new M(a, b, c)),
                        (a = g.chunkID + "," + a + "," + b + "," + c + "," + d + ",byteCount"),
                        (n = Z.Utils.arrayIndexOfObjectValue(tierTileByteCountChunks, "chunkID", g.chunkID)),
                        -1 == n
                            ? (-1 == Z.Utils.arrayIndexOf(Pa, a) && (Pa[Pa.length] = a),
                              (tierTileByteCountChunks[tierTileByteCountChunks.length] = { chunkID: g.chunkID, chunk: "loading" }),
                              (n = new Z.NetConnector()),
                              n.loadByteRange(Wb, g.chunkStart, g.chunkEnd, "byteCount", null, g.chunkID))
                            : "loading" == tierTileByteCountChunks[n].chunk
                            ? -1 == Z.Utils.arrayIndexOf(Pa, a) && (Pa[Pa.length] = a)
                            : "loading" != tierTileByteCountChunks[n].chunk && ((n = tierTileByteCountChunks[n].chunk), (m = Z.Utils.intValue(n, g.bcStartInChunk)))));
            "loading" == f || isNaN(f) || "loading" == m || isNaN(m) || (e = Wb + "?" + f.toString() + "," + m.toString());
        } else if ("ZoomifyImageFolder" == Z.tileSource) {
            d = c * nb[a] + b;
            for (e = 0; e < a; e++) d += Nb[e];
            a = Wb + "/TileGroup" + Math.floor(d / 256) + "/" + a + "-" + b + "-" + c + "." + Z.tileType;
            if ((Z.browser == Z.browsers.IE && 9 > Z.browserVersion) || 0 == yc) a = Z.Utils.cacheProofPath(a);
            e = a;
        } else if ("ZoomifyPFFFile" == Z.tileSource) {
            m = "offsetLoading";
            g = e = 0;
            for (f = tb - 1; f > a; f--) e += Nb[f];
            e += c * nb[a] + b;
            f = Math.floor(e / kb);
            g = -1 == e - 1 ? 0 : e - 1;
            n = Math.floor(g / kb);
            void 0 == Jb[f] || "offsetLoading" == Jb[f] || void 0 == Jb[n] || "offsetLoading" == Jb[n]
                ? ((e = f + "," + a + "," + b + "," + c + "," + d),
                  -1 == Z.Utils.arrayIndexOf(Pa, e) && (Pa[Pa.length] = e),
                  h.traceDebugValues("z531", f + "," + a + "," + b + "," + c + "," + d),
                  void 0 == Jb[f] && ((Jb[f] = "offsetLoading"), (a = vc + kb * f * 8), (b = a + 8 * kb), S(a, b, f)),
                  void 0 == Jb[n] && ((Jb[n] = "offsetLoading"), (a = vc + kb * n * 8), (b = a + 8 * kb), S(a, b, f)))
                : ((d = Math.floor(Jb[f][0])),
                  (m = Math.floor(Jb[n][0])),
                  (n = Jb[n][1]),
                  (f = Jb[f][1]),
                  (g = (g % kb) * 9),
                  (n = Math.floor(parseFloat(n.substring(g, g + 9)))),
                  (g = (e % kb) * 9),
                  (f = Math.floor(parseFloat(f.substring(g, g + 9)))),
                  (e = 0 == e ? vc + 8 * Ec : m + n),
                  (d += f),
                  (m = 0 < d - e ? Z.tileHandlerPathFull + "?file=" + Wb + "&requestType=0&begin=" + e.toString() + "&end=" + d.toString() + "&vers=" + ld.toString() + "&head=" + zd.toString() : "z647:" + a + "-" + b + "-" + c));
            e = m;
        } else "IIIFImageServer" == Z.tileSource ? (e = formatTilePathIIIFImageServer(a, b, c, d)) : "ImageServer" == Z.tileSource && (e = z530(a, b, c, d));
        return e;
    };
    this.parseOffsetChunk = function (a) {
        var b = parseInt(a.documentElement.getAttribute("BEGIN"), 10),
            c = a.documentElement.getAttribute("REPLYDATA");
        a = Ke[b];
        b = Math.floor((b - vc) / 8 / kb);
        Jb[b] = [];
        Jb[b] = c.split(",", 2);
        b = 0;
        for (c = Pa.length; b < c; b++) {
            var d = Pa[b].split(",");
            d[0] == a &&
                (void 0 !== d[4] && "image-display" == d[4] ? (db[db.length] = d[1] + "-" + d[2] + "-" + d[3]) : "image-backfill" == d[4] && (qb[qb.length] = d[1] + "-" + d[2] + "-" + d[3]), (Pa = Z.Utils.arraySplice(Pa, b, 1)), b--, c--);
        }
        0 < db.length && (db.sort(), (db = Z.Utils.arrayUnique(db)), h.traceDebugValues("z636", db), (a = h.getStatus("imageSaving") ? ia : V), K(db, a, "simple", "image-display"));
        0 < qb.length && (qb.sort(), (qb = Z.Utils.arrayUnique(qb)), (a = h.getStatus("imageSaving") ? z599ToSave : Aa), K(qb, a, "simple", "image-backfill"));
    };
    this.getClickCoordsAtZoom = function (a, b) {
        var c = this.getClickCoordsInImage(a, b);
        return new Z.Utils.Point(c.x * b, c.y * b);
    };
    this.getClickCoordsInImage = function (a, b, c) {
        a = Z.Utils.event(a);
        var d = null;
        if (a) {
            var e = a.type;
            if ("undefined" === typeof b || null == b) b = h.getZoom();
            if ("undefined" === typeof c || null === c)
                "touchstart" == e || "touchend" == e || "touchcancel" == e
                    ? ((touch = Z.Utils.getFirstTouch(a)), "undefined" !== typeof touch && ((target = touch.target), (c = new Z.Utils.Point(touch.pageX, touch.pageY))))
                    : ((target = Z.Utils.target(a)), (relatedTarget = Z.Utils.relatedTarget(a)), (c = Z.Utils.getMousePosition(a)));
            "undefined" !== typeof c && null !== c && ((a = h.z479(c.x, c.y)), (d = h.z485(a.x, a.y, b)));
        }
        return d;
    };
    this.getClickZoomCoords3D = function (a, b, c, d, e) {
        var f = parseFloat(Z.Utils.getResource("z93TIERSKIPTHRESHOLD"));
        b = h.z479(b.x, b.y);
        b = h.z485(b.x, b.y, Z.imageZ);
        var m = ja(c, d);
        a = a.altKey;
        e
            ? a
                ? (m = Z.fitZ)
                : ((e = Da(c, Z.fitZ)), d - e < f ? (m = Z.fitZ) : d > 1 + f ? (m = ja(c, 1)) : 0 < c ? (m = ja(c - 1, 1)) : "unconverted" == Z.tileSource && (m = Z.fitZ))
            : a
            ? (m = Z.maxZ)
            : d < 1 - f
            ? (m = ja(c, 1))
            : c < tb - 1
            ? (m = ja(c + 1, 1))
            : 1 < Z.maxZ && (m = Z.maxZ);
        return new Z.Utils.Point3D(b.x, b.y, m);
    };
    this.calculateCurrentCenterCoordinates = function (a, b, c) {
        if ("undefined" === typeof a || null === a) a = new Z.Utils.Point(parseFloat(I.left), parseFloat(I.top));
        if ("undefined" === typeof c || null === c) c = h.getRotation();
        0 > c && (c += 360);
        if ("undefined" === typeof b || null === b) b = h.getZoom();
        var d = Math.round(Z.imageX - (a.x - ib) / b);
        a = Math.round(Z.imageY - (a.y - jb) / b);
        c = Z.Utils.getPositionRotated(d, a, Z.imageX, Z.imageY, -c);
        return new Z.Utils.Point(c.x, c.y);
    };
    this.z542 = function (a, b, c, d) {
        if ("undefined" === typeof a || null === a) a = oa;
        if ("undefined" === typeof b || null === b) b = !1;
        return new R(h.z541(b, c ? a : null, d), a);
    };
    this.z541 = function (a, b, c) {
        var d = parseFloat(I.left) - ib,
            e = parseFloat(I.top) - jb;
        if (Z.useCanvas)
            var f = parseFloat(I.width) / sa.width,
                d = d / f,
                e = e / f;
        f = h.getZoom();
        0 != d && (d /= f);
        0 != e && (e /= f);
        var d = Z.imageX - d,
            e = Z.imageY - e,
            m,
            n,
            g;
        a ? ((a = -(Y / 2)), (n = Y / 2), (m = -(ba / 2)), (g = ba / 2)) : ((a = -(xa / 2)), (n = xa / 2), (m = -(za / 2)), (g = za / 2));
        return new na(d, e, a, n, m, g, f, b, c);
    };
    this.z480 = function (a, b) {
        var c = h.z479(a, b);
        return new Z.Utils.Point(c.x - ib, c.y - jb);
    };
    this.convertViewportDisplayCoordsToPageCoords = function (a, b) {
        var c = h.convertViewportCoordsToPageCoords(a + ib, b + jb);
        return new Z.Utils.Point(c.x, c.y);
    };
    this.z479 = function (a, b) {
        var c = Z.Utils.getElementPosition(Yc);
        return new Z.Utils.Point(a - c.x + ib, b - c.y + jb);
    };
    this.convertViewportCoordsToPageCoords = function (a, b) {
        var c = Z.Utils.getElementPosition(Yc);
        return new Z.Utils.Point(a + c.x - ib, b + c.y - jb);
    };
    this.convertPageCoordsToImageCoords = function (a, b) {
        var c = h.z479(a, b),
            c = h.z485(c.x, c.y, Z.imageZ);
        return new Z.Utils.Point(c.x, c.y);
    };
    this.convertImageCoordsToPageCoords = function (a, b, c, d) {
        a = h.z478(a, b, c, d);
        a = h.convertViewportCoordsToPageCoords(a.x, a.y, Z.imageZ);
        return new Z.Utils.Point(a.x, a.y);
    };
    this.z485 = function (a, b, c, d) {
        if ("undefined" === typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        var e = parseFloat(I.left) + Ob,
            f = parseFloat(I.top) + Pb;
        a -= e;
        b -= f;
        0 != Z.imageR && ((viewportClickPt = Z.Utils.rotatePoint(a, b, d)), (a = viewportClickPt.x), (b = viewportClickPt.y));
        return new Z.Utils.Point(a / c + Z.imageX, b / c + Z.imageY);
    };
    this.z478 = function (a, b, c, d) {
        if ("center" == a || isNaN(parseFloat(a))) a = Z.imageCtrX;
        if ("center" == b || isNaN(parseFloat(b))) b = Z.imageCtrY;
        if ("undefined" === typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        a = (a - Z.imageX) * c;
        b = (b - Z.imageY) * c;
        0 != Z.imageR && ((viewportClickPt = Z.Utils.rotatePoint(a, b, -d)), (a = viewportClickPt.x), (b = viewportClickPt.y));
        d = parseFloat(I.left) + Ob;
        c = parseFloat(I.top) + Pb;
        return new Z.Utils.Point(a + d, b + c);
    };
    this.convertImageCoordsToViewportEdgeCoords = function (a, b, c, d) {
        if ("undefined" === typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        a = (Z.imageX - a) * c;
        b = (Z.imageY - b) * c;
        0 != Z.imageR && ((viewportClickPt = Z.Utils.rotatePoint(a, b, -d)), (a = viewportClickPt.x), (b = viewportClickPt.y));
        return new Z.Utils.Point(ib + a, jb + b);
    };
    this.convertViewportEdgeCoordsToImageCoords = function (a, b, c, d) {
        if ("undefined" === typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        a -= ib;
        b -= jb;
        0 != Z.imageR && ((viewportClickPt = Z.Utils.rotatePoint(a, b, -d)), (a = viewportClickPt.x), (b = viewportClickPt.y));
        return new Z.Utils.Point(Z.imageX - a / c, Z.imageY - b / c);
    };
    this.z468 = function (a, b, c) {
        if ("undefined" === typeof a || null === a) a = Z.imageW;
        if ("undefined" === typeof b || null === b) b = Z.imageH;
        var d = a / b > Y / ba ? Y / a : ba / b;
        if (90 == c || 270 == c) d = a / b > Y / ba ? Y / b : ba / a;
        return d;
    };
    this.calculateZoomToFill = function (a, b, c) {
        if ("undefined" === typeof a || null === a) a = Z.imageW;
        if ("undefined" === typeof b || null === b) b = Z.imageH;
        var d = a / b > Y / ba ? ba / b : Y / a;
        if (90 == c || 270 == c) d = a / b > Y / ba ? ba / a : Y / b;
        return d;
    };
    this.calculateZoomForResize = function (a, b, c, d, e) {
        var f = a,
            m = Z.imageW * a,
            h = Z.imageH * a;
        b = d / b;
        c = e / c;
        m < d && h < e
            ? (f = a)
            : m == d && h < e
            ? (f = -1)
            : m < d && h == e
            ? (f = -1)
            : m > d && h <= e
            ? (f = a * b)
            : m <= d && h > e
            ? (f = a * c)
            : m > d && h > e && ((d = 1), 1 <= b && 1 <= c ? (d = b > c ? b : c) : 1 >= b && 1 >= c && (d = b < c ? b : c), (f = a * d));
        f < Z.minZ && (f = Z.minZ);
        f > Z.maxZ && (f = Z.maxZ);
        return f;
    };
    this.z482 = function (a, b) {
        return ja(a, b);
    };
    this.syncViewportToNavigator = function (b) {
        var c = Z.imageR;
        0 > c && (c += 360);
        var d = Ga(b.x, b.y, Z.imageZ, c, "image");
        b = Z.imageY;
        var e = d.y,
            d = (dX = Z.imageX - d.x);
        b = dY = b - e;
        0 != c && (270 <= c ? ((d = dY), (b = -dX)) : 180 <= c ? ((d = -dX), (b = -dY)) : 90 <= c && ((d = -dY), (b = dX)));
        c = d * Z.imageZ;
        b *= Z.imageZ;
        e = b + jb;
        I.left = c + ib + "px";
        I.top = e + "px";
        ha && Za && (Z.mobileDevice || Math.abs(c) > Y / 2 || Math.abs(b) > ba / 2) && N(ha, Tb, Eb, "simple", !1, "Updating backfill oversize display");
        Z.Viewer.syncComparisonViewport();
        Z.Viewer.syncOverlayViewports(null, a);
    };
    this.getStatus = function (a) {
        a = Z.Utils.arrayIndexOfObjectValue(uc, "state", a);
        return -1 == a ? !1 : uc[a].status;
    };
    this.setStatus = function (a, b) {
        var c = !1,
            d = Z.Utils.arrayIndexOfObjectValue(uc, "state", a);
        -1 == d ? ((c = b), (uc[uc.length] = { state: a, status: b })) : (!uc[d].status && b && (c = !0), (uc[d].status = b));
        c && (Z.Utils.validateCallback(a), Z.Viewer.validateViewerStatus(a));
    };
    this.traceDebugValues = function (a, b, c, d) {
        c = "undefined" !== typeof c && null !== c ? c : null;
        b = null !== b ? b : "";
        switch (a) {
            case "tilesToDisplay":
                Se = c;
                ae = ad = be = Te = 0;
                bd = c;
                pd = 0;
                tilesTimeStart = new Date().getTime();
                Ue = 0;
                window.clearTimeout(Ed);
                Ed = null;
                Ed = window.setTimeout(Ka, qg);
                break;
            case "tilesInCache":
                Te = c;
                break;
            case "z581-image-display":
                be += 1;
                break;
            case "onTileLoad":
                ad += 1;
                pd = (new Date().getTime() - c) / 1e3;
                Ue = ad / pd;
                break;
            case "z507":
                c = Z.Utils.arrayIndexOf(Kc, b);
                -1 != c && (Kc.splice(c, 1), (ae += 1), --bd);
                break;
            case "tilesBackfillToPrecache":
                pg = c;
                break;
            case "onTileBackfillPrecache":
                yf += 1;
                break;
            case "tilesBackfillToDisplay":
                Qg = zf = c;
                break;
            case "z599":
                Af += 1;
                break;
            case "displayBackfillTile":
                (c = Z.Utils.arrayIndexOf(Jc, b)), -1 != c && (Jc.splice(c, 1), (Df += 1), --Qg);
        }
        (2 != Z.debug && 3 != Z.debug) || Z.Utils.traceTileStatus(Se, Te, be, ad, ae, bd);
        if (2 == Z.debug) {
            var e = "undefined" !== typeof d && null !== d && 0 < d.length ? d.join(", ") : "none";
            c = !0;
            var f = "";
            switch (a) {
                case "updateView-noChange":
                    f = "Updating view: no change of tier.";
                    break;
                case "tilesToDisplay":
                    f = "Tiles to display: " + e;
                    break;
                case "tilesInCache":
                    f = "Tiles in cache: " + e;
                    break;
                case "tilesToLoad":
                    f = "Tiles to load: " + e;
                    break;
                case "tilesToLoad-backfill":
                    f = "Tiles to load-backfill: " + e;
                    break;
                case "z622-viewportDisplay":
                    a = [];
                    e = 0;
                    for (f = d.length; e < f; e++) a[a.length] = d[e].name;
                    f = "Tiles from cache-" + b + ": " + a.join(", ");
                    break;
                case "z622-backfillDisplay":
                    a = [];
                    e = 0;
                    for (f = d.length; e < f; e++) a[a.length] = d[e].name;
                    f = "Tiles from cache-" + b + ": " + a.join(", ");
                    break;
                case "z577-image-display":
                    f = "Tile requests for display: " + b + e;
                    break;
                case "z577-image-backfill":
                    f = "Tile requests for backfill: " + b + e;
                    break;
                case "imageRequestTimeout":
                    f = "Image request for " + b;
                    break;
                case "z581-image-display":
                    f = "Tile request-display: " + b;
                    c = !1;
                    break;
                case "z581-image-backfill":
                    f = "Tile request-backfill: " + b;
                    c = !1;
                    break;
                case "z581DelayForOffset":
                    f = "Tile not yet being loaded - offset chunk loading in progress: " + b;
                    break;
                case "onTileLoad":
                    f = "Tiles received-display: " + b;
                    c = !1;
                    break;
                case "z599":
                    f = "Tiles received-backfill: " + b;
                    0 == wb.length && (f += "\n\nTile loading complete for backfill: all requested tiles received.");
                    c = !1;
                    break;
                case "z532":
                    f = "Tile request recorded for after load offset chunk: " + b;
                    break;
                case "z637":
                    f = "Requesting tiles after offset chunk received: " + e;
                    break;
                case "z531":
                    f = "Tile request recorded for after load offset chunk: " + b;
                    c = !1;
                    break;
                case "z636":
                    f = "Requesting tiles after offset chunk received: " + e;
                    c = !1;
                    break;
                case "z577Retry":
                    f = b;
                    break;
                case "z507":
                    f = "Tile displaying: " + b;
                    c = !1;
                    break;
                case "blankLine":
                    f = " ";
            }
            "" != f && Z.Utils.trace(f, !1, c);
        }
    };
    this.updateProgress = function (a, b) {
        var c = Z,
            d;
        0 == a && 0 == b ? (Z.Utils.validateCallback("loadingTilesComplete"), Z.Utils.validateCallback("loadingTilesCompleteGetLabelIDs"), (d = void 0)) : ((d = Math.round(100 - (b / a) * 100)), (d = Math.round(d / 10)));
        c.updateViewPercent = d;
        Z.ToolbarDisplay && Z.Toolbar.getInitialized() && Z.Toolbar.updateProgress(a, b);
    };
    h.parseGeoCoordinatesXML = function (a) {
        if ((a = a.getElementsByTagName("SETUP")[0])) {
            Xf = a.getAttribute("GEOTOP");
            Yf = a.getAttribute("GEOBOTTOM");
            Zf = a.getAttribute("GEOLEFT");
            $f = a.getAttribute("GEORIGHT");
            var b = Zf,
                c = $f,
                d = Xf;
            a = Yf;
            var e = b.substring(0, b.indexOf(",", 0)),
                f = b.substring(b.indexOf(",", 0) + 1, b.indexOf(",", e.length + 1)),
                m = 1;
            "W" == b.substring(b.indexOf(",", e.length + 1 + f.length) + 1, b.length) && (m = -1);
            Fe = (parseFloat(e) + parseFloat(f) / 60) * m;
            b = c.substring(0, c.indexOf(",", 0));
            e = c.substring(c.indexOf(",", 0) + 1, c.indexOf(",", b.length + 1));
            f = 1;
            "W" == c.substring(c.indexOf(",", b.length + 1 + e.length) + 1, c.length) && (f = -1);
            c = (parseFloat(b) + parseFloat(e) / 60) * f;
            b = d.substring(0, d.indexOf(",", 0));
            e = d.substring(d.indexOf(",", 0) + 1, d.indexOf(",", b.length + 1));
            f = 1;
            "S" == d.substring(d.indexOf(",", b.length + 1 + e.length) + 1, d.length) && (f = -1);
            ag = (parseFloat(b) + parseFloat(e) / 60) * f;
            d = a.substring(0, a.indexOf(",", 0));
            b = a.substring(a.indexOf(",", 0) + 1, a.indexOf(",", d.length + 1));
            e = 1;
            "S" == a.substring(a.indexOf(",", d.length + 1 + b.length) + 1, a.length) && (e = -1);
            a = (parseFloat(d) + parseFloat(b) / 60) * e;
            Og = c < Fe ? 180 - Fe + (180 + c) : c - Fe;
            Pg = ag - a;
        }
    };
    this.parseHotspotsXML = function (b) {
        Z.Utils.arrayClear(oc);
        Z.Utils.arrayClear(kc);
        Z.Utils.arrayClear(mc);
        Jf = !1;
        h.setStatus("XMLParsedViewport", !1);
        ig = Z.Utils.getResource("z226");
        Qf = Z.Utils.getResource("z225");
        Ne = Z.Utils.getResource("z131");
        jf = Z.Utils.getResource("z132");
        hotspotListTitle = Z.tourPath ? Z.Utils.getResource("z444") : Z.Utils.getResource("z424");
        lg = Z.Utils.getResource("z134");
        ee = parseFloat(Z.Utils.getResource("DEFAULT_HOTSPOTSMINSCALE"));
        fe = parseFloat(Z.Utils.getResource("DEFAULT_HOTSPOTSMAXSCALE"));
        var c = b.getElementsByTagName("SETUP")[0];
        ("undefined" !== typeof c && Z.Utils.stringValidate(c)) ||
            ((c = b.getElementsByTagName("HOTSPOTSETUP")[0]), ("undefined" !== typeof c && Z.Utils.stringValidate(c)) || (c = Z.Utils.xmlConvertTextToDoc("<HOTSPOTSETUP />").getElementsByTagName("HOTSPOTSETUP")[0]));
        if (c) {
            var d = c.getAttribute("AUTOSTART");
            Z.Utils.stringValidate(d) && (ig = "0" != d && "false" != d);
            d = c.getAttribute("AUTOLOOP");
            Z.Utils.stringValidate(d) && (Qf = "0" != d && "false" != d);
            d = c.getAttribute("CHOICELIST");
            Z.Utils.stringValidate(d) && (Ne = d);
            d = c.getAttribute("LISTSOURCE");
            Z.Utils.stringValidate(d) && (jf = d);
            d = Z.Utils.xmlUnescapeMinimal(unescape(c.getAttribute("LISTTITLE")));
            Z.Utils.stringValidate(d) && (hotspotListTitle = d);
            d = c.getAttribute("INITIALVISIBILITY");
            Z.Utils.stringValidate(d) && (lg = "1" == d || "true" == d);
            d = parseFloat(c.getAttribute("MINSCALE"));
            isNaN(d) || (ee = 0 != d ? d : 1e-5);
            c = parseFloat(c.getAttribute("MAXSCALE"));
            isNaN(c) || (fe = 0 != c ? c : 1e4);
        }
        pb.visibility = lg ? "visible" : "hidden";
        Z.Utils.stringValidate(Z.hotspotListTitle) ? (hotspotListTitle = Z.hotspotListTitle) : Z.Utils.stringValidate(hotspotListTitle) && (Z.hotspotListTitle = hotspotListTitle);
        Jh(Ne, hotspotListTitle, oc, a);
        b = b.getElementsByTagName("HOTSPOT");
        c = 0;
        for (d = b.length; c < d; c++) {
            var e = b[c],
                e = Kh(e);
            h.createHotspotFromXML(e, !0);
        }
        2 == Z.debug && Jf && Z.Utils.trace(Z.Utils.getResource("z246"));
        h.setStatus("XMLParsedViewport", !0);
        r();
        Z.tour
            ? (h.initializeAudioMuteButtons(),
              Z.Utils.validateCallback("tourLoaded"),
              ig &&
                  !Z.tourStop &&
                  Z.Utils.functionCallWithDelay(function () {
                      h.tourStart();
                  }, 750))
            : (Z.Utils.validateCallback("hotspotsLoadedViewport"), h.setStatus("hotspotsLoadedViewport", !0));
    };
    this.createHotspotFromParameters = function (a, b, c, d, e, f, m, n, g, p, r, k, A, v, u, w, q, ia, lb, x, t, B, C, wa, S, Va, N, Fd, ub, y, K, H, Hb, I, U, L, J, G, F, M, T, P, Q, R, V) {
        c = Z.Utils.arrayToArrayOfStrings([a, b, c, d, e, f, m, n, g, p, r, k, A, v, u, w, q, ia, lb, x, t, B, C, wa, S, Va, N, Fd, ub, y, K, H, Hb, I, U, L, J, G, F, M, T, P, Q, R, V]);
        a = Z.Utils.xmlConvertTextToDoc(
            '<HOTSPOT ID="' +
                c[0] +
                '" NAME="' +
                c[1] +
                '" MEDIATYPE="' +
                c[2] +
                '" MEDIA="' +
                c[3] +
                '" AUDIO="' +
                c[4] +
                '" X="' +
                c[5] +
                '" Y="' +
                c[6] +
                '" ZOOM="' +
                c[7] +
                '" XSCALE="' +
                c[8] +
                '" YSCALE="' +
                c[9] +
                '" RADIUS="' +
                c[10] +
                '" ZMIN="' +
                c[11] +
                '" ZMAX="' +
                c[12] +
                '" CLICKURL="' +
                c[13] +
                '" URLTARGET="' +
                c[14] +
                '" ROLLOVER="' +
                c[15] +
                '" CAPTION="' +
                c[16] +
                '" TOOLTIP="' +
                c[17] +
                '" TEXTCOLOR="' +
                c[18] +
                '" BACKCOLOR="' +
                c[19] +
                '" LINECOLOR="' +
                c[20] +
                '" FILLCOLOR="' +
                c[21] +
                '" TEXTVISIBLE="' +
                c[22] +
                '" BACKVISIBLE="' +
                c[23] +
                '" LINEVISIBLE="' +
                c[24] +
                '" FILLVISIBLE="' +
                c[25] +
                '" CAPTIONPOSITION="' +
                c[26] +
                '" SAVED="' +
                c[27] +
                '" INTERNALID="' +
                c[28] +
                '" POIID="' +
                c[29] +
                '" SHOWFOR="' +
                c[34] +
                '" TRANSITION="' +
                c[35] +
                '" CHANGEFOR="' +
                c[36] +
                '" ROTATION="' +
                c[37] +
                '" EDITABLE="' +
                c[38] +
                '" POPUP="' +
                c[39] +
                '" POPOFFSETX="' +
                c[40] +
                '" POPOFFSETY="' +
                c[41] +
                '" COMMENT="' +
                c[42] +
                '" USER="' +
                c[43] +
                '" DATE="' +
                c[44] +
                '" ></HOTSPOT>'
        ).getElementsByTagName("HOTSPOT")[0];
        null === a.getAttribute("INTERNALID") && a.setAttribute("INTERNALID", dd("hotspot"));
        b = Z.Utils.xmlConvertTextToDoc("<TEMP></TEMP>");
        Z.Utils.stringValidate(c[30]) && ((K = Z.Utils.xmlConvertTextToDoc(K).getElementsByTagName("CAPTION")[0].innerHTML), (d = b.createElement("CAPTION")), (d.innerHTML = K), a.appendChild(d));
        Z.Utils.stringValidate(c[31]) && ((K = Z.Utils.xmlConvertTextToDoc(H).getElementsByTagName("TOOLTIP")[0].innerHTML), (H = b.createElement("TOOLTIP")), (H.innerHTML = K), a.appendChild(H));
        if (Z.Utils.stringValidate(c[33])) {
            H = b.createElement("POLYGON");
            H.setAttribute("CLOSED", c[32]);
            K = 0;
            for (c = I.length; K < c; K++) (d = b.createElement("POINT")), d.setAttribute("X", I[K].x), d.setAttribute("Y", I[K].y), H.appendChild(d);
            a.appendChild(H);
        }
        h.createHotspotFromXML(a, !0);
    };
    this.createHotspotFromXML = function (a, b) {
        var c = new m(a);
        if (Z.Utils.stringValidate(c.media) || Z.Utils.stringValidate(c.caption) || null !== Z.tourPath || Z.annotations) {
            x[x.length] = c;
            var d = "NAME" == jf ? c.name : "CAPTION" == jf ? c.caption : c.tooltip;
            if (ra) {
                var e = c.internalID;
                if (null != ra) {
                    var f = Z.Utils.arrayIndexOfObjectValue(oc, "value", e);
                    -1 != f
                        ? ((ra.options[f + ("none" != Z.hotspotListTitle && "none" != Z.tourListTitle ? 1 : 0)] = new Option(d, e.toString())), (oc[f] = { text: d, value: e }))
                        : ((ra.options[ra.options.length] = new Option(d, e.toString())), (oc[oc.length] = { text: d, value: e }));
                }
            }
        }
        Z.Utils.stringValidate(c.popup) &&
            ((d = Z.Utils.arrayIndexOfObjectValue(mc, "popup", c.popup)),
            -1 != d
                ? mc[d].element && (c.popupImage = mc[d].element.cloneNode(!1))
                : ((mc[mc.length] = { popup: c.popup, element: null }), (d = new Date().getTime()), (e = c.popup), sg.loadImage(e, Z.Utils.createCallback(null, n, e, d), "hotspot")));
        var d = new lc(),
            e = c.mediaType,
            f = c.media,
            h = !1,
            g = !1;
        f &&
            ((h =
                -1 != f.indexOf("/circle.") ||
                -1 != f.indexOf("/square.") ||
                -1 != f.indexOf("/triangle.") ||
                -1 != f.indexOf("/arrowDownLeft.") ||
                -1 != f.indexOf("/arrowDownRight.") ||
                -1 != f.indexOf("/arrowUpLeft.") ||
                -1 != f.indexOf("/arrowUpRight.") ||
                -1 != f.indexOf("/arrowUp.") ||
                -1 != f.indexOf("/arrowDown.") ||
                -1 != f.indexOf("/arrowLeft.") ||
                -1 != f.indexOf("/arrowRight.") ||
                -1 != f.indexOf("/lineHorizontal.") ||
                -1 != f.indexOf("/lineVertical.")),
            (g =
                "counter" == f ||
                "circle" == f ||
                "square" == f ||
                "triangle" == f ||
                "arrowDown" == f ||
                "arrowDownLeft" == f ||
                "arrowLeft" == f ||
                "arrowUpLeft" == f ||
                "arrowUp" == f ||
                "arrowUpRight" == f ||
                "arrowRight" == f ||
                "arrowDownRight" == f ||
                "lineHorizontal" == f ||
                "lineVertical" == f));
        h = "External Graphics File" != f && (g || (h && Z.labelIconsInternal));
        !Z.Utils.stringValidate(f) || "text" == e || "polygon" == f || h ? Nc(c, d) : fa(c, !0);
        Z.Viewer.getStatus("readyViewer") && (Z.Utils.validateCallback("labelCreated"), Z.Utils.validateCallback("labelCreatedGetInternalID"));
    };
    this.modifyHotspot = function (a, b, c, d, e) {
        var f = -1,
            f = e ? Z.Utils.arrayIndexOfObjectValue(x, "internalID", a) : Z.Utils.arrayIndexOfObjectValue(x, "id", a.toString());
        if (-1 != f) {
            a = x[f];
            "polygon" != a.media || ("x" != b && "y" != b) || ((e = new Z.Utils.Point("x" == b ? c : a.x, "y" == b ? c : a.y)), zg(a, e));
            if ("polygon" != a.media || ("xScale" != b && "yScale" != b)) a[b] = c;
            else {
                e = c / 100;
                for (var f = a.polygonPts.slice(0), m = "xScale" == b ? "x" : "y", h = a[m] - a[m] * e, n = 0, g = f.length; n < g; n++) f[n][m] = f[n][m] * e + h;
                a.polygonPts = f.slice(0);
            }
            "rollover" == b && 0 == c && (a.visibility = !0);
            "media" != b || "icon" != a.mediaType || ("External Graphics File" != a.media && Z.labelIconsInternal) || fa(a, !1);
            ("undefined" !== typeof d && null !== d && d) || r();
        }
    };
    this.deleteHotspot = function (a, b, c) {
        var d = -1;
        c ? (d = Z.Utils.arrayIndexOfObjectValue(x, "internalID", a)) : ((d = Z.Utils.arrayIndexOfObjectValue(x, "id", a.toString())), -1 != d && (a = x[d].internalID));
        -1 != d &&
            ((x = Z.Utils.arraySplice(x, d, 1)),
            xg(a),
            !b &&
                Z.hotspots &&
                null != ra &&
                ((a = Z.Utils.arrayIndexOfObjectValue(oc, "value", a)), -1 != a && ((oc = Z.Utils.arraySplice(oc, a, 1)), Z.Utils.updateSelectElement(ra, oc), (b = ra.length), 0 != b && (ra.selectedIndex = a > b - 1 ? b - 1 : a))));
    };
    this.deleteAllHotspots = function () {
        Z.Utils.arrayClear(x);
        pa && (pa.innerHTML = "");
        ra.options.length = 0;
    };
    this.deleteAllMeasureHotspots = function () {
        var a = x.length;
        if (0 < a && pa && 0 < pa.childNodes.length) {
            for (var b = 0; b < a; b++) "measure" == x[b].mediaType && (x = Z.Utils.arraySplice(x, b, 1));
            r();
        }
    };
    this.z623 = function () {
        r();
    };
    this.getLabelsVisibility = function () {
        return h.getHotspotsVisibility();
    };
    this.setLabelsVisibility = function (a) {
        h.setLabelsVisibility(a);
    };
    this.setLabelVisibility = function (a, b) {
        h.setHotspotVisibility(a, b);
    };
    this.setLabelsVisibilityByFilter = function (a, b, c) {
        h.setHotspotsVisibilityByFilter(a, b, c);
        return c;
    };
    this.setLabelVisibilityByID = function (a, b, c) {
        h.setHotspotVisibilityByID(a, b, c);
    };
    this.setLabelFilterByDisplayList = function (a, b) {
        h.setHotspotFilterByDisplayList(a, b);
    };
    this.setHotspotFilterByDisplayList = function (a, b) {
        pa && Z.Utils.clearDisplay(pa);
        cb && Z.Utils.clearDisplay(cb);
        Na && Z.Utils.clearDisplay(Na);
        "undefined" !== typeof a && null !== a && 0 < a.length && (b ? (de = a) : (ce = a));
        "inline-block" == pb.display && Fd();
    };
    this.clearLabelFilterByDisplayList = function () {
        h.clearHotspotFilterByDisplayList();
    };
    this.clearHotspotFilterByDisplayList = function () {
        "undefined" !== typeof ce && Z.Utils.arrayClear(ce);
        "undefined" !== typeof de && Z.Utils.arrayClear(de);
        "inline-block" == pb.display && r();
    };
    this.z538 = function (a) {
        return nc(a);
    };
    this.getHotspots = function () {
        return x;
    };
    this.getHotspotsVisibility = function () {
        return "inline-block" == pb.display;
    };
    this.setHotspotsVisibility = function (a) {
        pb.display = a ? "inline-block" : "none";
        r();
    };
    this.setHotspotPopupVisibility = function (a, b) {
        var c;
        c = a.firstChild.childNodes;
        var d = null;
        if (a.firstChild)
            for (var e = 0, f = c.length; e < f; e++) {
                var m = c[e].firstChild;
                m && m.id && "popup" == m.id && (d = m);
            }
        (c = d) && c.style && ((c.style.display = b ? "inline-block" : "none"), (c.style.visibility = b ? "visible" : "hidden"), dh++, (a.style.zIndex = dh.toString()));
    };
    this.setHotspotVisibility = function (a, b) {
        var c = a.firstChild;
        if (c && c.style) {
            c.style.visibility = "visible";
            var d = b ? "visible" : "hidden";
            c.style.backgroundColor = b ? "" : "#FFFFFF";
            Z.Utils.setOpacity(c, b ? 1 : 0.01);
            (c = a.firstChild.childNodes[1]) && c.style && (c.style.visibility = d);
            d = a.id.substring(3, a.id.length);
            d = Z.Utils.arrayIndexOfObjectValue(x, "internalID", d);
            if (-1 != d) {
                c = x[d];
                c.visibility = b;
                var d = c.media,
                    c = c.mediaType,
                    e =
                        -1 != d.indexOf("/circle.") ||
                        -1 != d.indexOf("/square.") ||
                        -1 != d.indexOf("/triangle.") ||
                        -1 != d.indexOf("/arrowDownLeft.") ||
                        -1 != d.indexOf("/arrowDownRight.") ||
                        -1 != d.indexOf("/arrowUpLeft.") ||
                        -1 != d.indexOf("/arrowUpRight.") ||
                        -1 != d.indexOf("/arrowUp.") ||
                        -1 != d.indexOf("/arrowDown.") ||
                        -1 != d.indexOf("/arrowLeft.") ||
                        -1 != d.indexOf("/arrowRight.") ||
                        -1 != d.indexOf("/lineHorizontal.") ||
                        -1 != d.indexOf("/lineVertical.");
                ((!(("counter" != c && "icon" != c) || (d && "External Graphics File" == d)) &&
                    ("counter" == d ||
                        "circle" == d ||
                        "square" == d ||
                        "triangle" == d ||
                        "arrowDown" == d ||
                        "arrowDownLeft" == d ||
                        "arrowLeft" == d ||
                        "arrowUpLeft" == d ||
                        "arrowUp" == d ||
                        "arrowUpRight" == d ||
                        "arrowRight" == d ||
                        "arrowDownRight" == d ||
                        "lineHorizontal" == d ||
                        "lineVertical" == d ||
                        (e && Z.labelIconsInternal))) ||
                    (d && "polygon" == d)) &&
                    he(!0);
            }
        }
    };
    this.setHotspotsVisibilityByFilter = function (b, c, d) {
        if (0 < x.length)
            if (pa && 0 < pa.childNodes.length) {
                for (var e = 0, m = x.length; e < m; e++)
                    if (x[e][b] == c) {
                        var f = x[e];
                        f.visibility = d;
                        f = document.getElementById("hot" + f.internalID + (Z.imageSet ? "-" + a.toString() : ""));
                        null !== f && h.setHotspotVisibility(f, d);
                    }
                yd = 0;
            } else
                10 > yd &&
                    (yd++,
                    window.setTimeout(function () {
                        h.setHotspotsVisibilityByFilter(b, c, d);
                    }, 100));
        return d;
    };
    this.setHotspotVisibilityByID = function (b, c, d) {
        d = d ? "internalID" : "id";
        0 < x.length &&
            (pa && 0 < pa.childNodes.length
                ? ((d = Z.Utils.arrayIndexOfObjectValue(x, d, b)), -1 != d && ((d = document.getElementById("hot" + x[d].internalID + (Z.imageSet ? "-" + a.toString() : ""))), null != d && h.setHotspotVisibility(d, c)))
                : window.setTimeout(function () {
                      setHotspotVisibilityByID(b, c);
                  }, 100));
    };
    this.createLabelFromParameters = function (a, b, c, d, e, f, m, n, g, p, r, k, A, v, u, w, q, ia, lb, x, t, B, C, wa, S, Va, N, K, Fd, H, ub, y, I, Hb, U, L, J, G, F, M, T, P, Q, R, V, fa, O) {
        a = Z.Utils.arrayToArrayOfStrings([a, b, c, d, e, f, m, n, g, p, r, k, A, v, u, w, q, ia, lb, x, t, B, C, wa, S, Va, N, K, Fd, H, ub, y, I, Hb, U, L, J, G, F, M, T, P, Q, R, V, fa, O]);
        a = Z.Utils.xmlConvertTextToDoc(
            '<LABEL ID="' +
                a[0] +
                '" NAME="' +
                a[1] +
                '" MEDIATYPE="' +
                a[2] +
                '" MEDIA="' +
                a[3] +
                '" AUDIO="' +
                a[4] +
                '" X="' +
                a[5] +
                '" Y="' +
                a[6] +
                '" ZOOM="' +
                a[7] +
                '" XSCALE="' +
                a[8] +
                '" YSCALE="' +
                a[9] +
                '" RADIUS="' +
                a[10] +
                '" ZMIN="' +
                a[11] +
                '" ZMAX="' +
                a[12] +
                '" CLICKURL="' +
                a[13] +
                '" URLTARGET="' +
                a[14] +
                '" ROLLOVER="' +
                a[15] +
                '" CAPTION="' +
                a[16] +
                '" COMMENT="' +
                a[17] +
                '" TOOLTIP="' +
                a[18] +
                '" TEXTCOLOR="' +
                a[19] +
                '" BACKCOLOR="' +
                a[20] +
                '" LINECOLOR="' +
                a[21] +
                '" FILLCOLOR="' +
                a[22] +
                '" TEXTVISIBLE="' +
                a[23] +
                '" BACKVISIBLE="' +
                a[24] +
                '" LINEVISIBLE="' +
                a[25] +
                '" FILLVISIBLE="' +
                a[26] +
                '" CAPTIONPOSITION="' +
                a[27] +
                '" SAVED="' +
                a[28] +
                '" INTERNALID="' +
                a[29] +
                '" POIID="' +
                a[30] +
                '" POLYGONCLOSED="' +
                a[33] +
                '" SHOWFOR="' +
                a[35] +
                '" TRANSITION="' +
                a[36] +
                '" CHANGEFOR="' +
                a[37] +
                '" ROTATION="' +
                a[38] +
                '" CATEGORY="' +
                a[39] +
                '" EDITABLE="' +
                a[40] +
                '" POPUP="' +
                a[41] +
                '" POPOFFSETX="' +
                a[42] +
                '" POPOFFSETY="' +
                a[43] +
                '" USER="' +
                a[44] +
                '" INITIALS="' +
                a[45] +
                '" DATE="' +
                a[46] +
                '" ></LABEL>'
        );
        b = a.getElementsByTagName("LABEL")[0];
        Z.Utils.stringValidate(b.getAttribute("INTERNALID")) || b.setAttribute("INTERNALID", dd("label"));
        Z.Utils.stringValidate(y) && ((y = Z.Utils.xmlConvertTextToDoc(y).getElementsByTagName("CAPTION")[0].innerHTML), (c = a.createElement("CAPTION")), (c.innerHTML = y), b.appendChild(c));
        y = I;
        Z.Utils.stringValidate(y) && ((y = Z.Utils.xmlConvertTextToDoc(y).getElementsByTagName("TOOLTIP")[0].innerHTML), (I = a.createElement("TOOLTIP")), (I.innerHTML = y), b.appendChild(I));
        if (null != U) {
            I = a.createElement("POLYGON");
            y = 0;
            for (c = U.length; y < c; y++) (d = a.createElement("POINT")), d.setAttribute("X", U[y].x), d.setAttribute("Y", U[y].y), I.appendChild(d);
            b.appendChild(I);
        }
        h.z495(b, !0);
    };
    this.z495 = function (a, b) {
        b && (a = z676(a, "label"));
        var c = a.getAttribute("INTERNALID"),
            d = a.getAttribute("EDITABLE"),
            d = "0" != d && "false" != d,
            e = Z.Utils.arrayIndexOfObjectValue(Ia, "value", c);
        -1 == e && (e = Ia.length);
        Ia[e] = { text: a.getAttribute("NAME"), value: c, poiID: a.getAttribute("POIID"), editable: d };
        h.createHotspotFromXML(a);
    };
    this.setLabelMaskByDisplayID = function (a, b) {
        var c = [];
        c[0] = a;
        h.setHotspotMaskByDisplayList(c, b);
    };
    this.setLabelMaskByDisplayList = function (a, b) {
        h.setHotspotMaskByDisplayList(a, b);
    };
    this.setHotspotMaskByDisplayList = function (a, b) {
        if (Oa && "undefined" !== typeof a && null !== a && 0 < a.length)
            if (Z.maskingSelection) {
                var c = function () {
                    setMask(a, b);
                    Z.Viewport.maskFadeTimeoutHandler("in");
                    Z.clearCallback("maskClear", c);
                };
                Z.setCallback("maskClear", c);
                Z.Viewport.clearMask();
            } else setMask(a, b), Z.Viewport.maskFadeTimeoutHandler("in");
    };
    setMask = function (a, b) {
        ("undefined" === typeof a || null === a) && "undefined" !== typeof He && null !== He && 0 < He.length && (a = He);
        if ("undefined" !== typeof a && null !== a && 0 < a.length) {
            He = a.slice(0);
            if ("undefined" === typeof b || null === b) b = !1;
            Oa && ((Oa.width = la.width), (Oa.height = la.height), (vb.width = qa.width), (vb.height = qa.height), (vb.left = qa.left), (vb.top = qa.top), Fa.restore(), Fa.save(), Fa.translate(Ob, Pb));
            B();
            for (var c = a, d = b, e = 0, f = x.length; e < f; e++) {
                var m = x[e],
                    n = d ? m.internalID : m.id,
                    g = Z.Utils.arrayMap(c, String);
                if (-1 != Z.Utils.arrayIndexOf(g, n))
                    if (Z.useCanvas) {
                        if (m.visibility || m.rollover || rollover) {
                            Fa.save();
                            Fa.globalCompositeOperation = "xor";
                            Fa.translate((m.x - Z.imageX) * Z.imageZ, (m.y - Z.imageY) * Z.imageZ);
                            Fa.lineWidth = 1e-6;
                            Fa.strokeStyle = m.lineColor;
                            Fa.globalAlpha = 1;
                            var g = va / hc,
                                p = h.getZoom(),
                                n = (m.xScale / 100 / g) * p,
                                g = (m.yScale / 100 / g) * p;
                            1 != n && 1 != g && Fa.scale(n, g);
                            n = m.x;
                            g = m.y;
                            Fa.beginPath();
                            if (m.polygonPts) {
                                var p = m.polygonPts.slice(0),
                                    r = p[0].x - n,
                                    k = p[0].y - g;
                                Fa.moveTo(r, k);
                                for (var A = 1, v = p.length; A < v; A++) Fa.lineTo(p[A].x - n, p[A].y - g);
                                "freehand" != m.mediaType && m.polyClosed && (Fa.lineTo(r, k), Fa.closePath());
                            } else (p = (100 / m.z) * m.iW), (r = (100 / m.z) * m.iH), (n = 0), (g = -1 == m.media.indexOf("triangle") ? 0 : 0.23 * m.iH), (m = (Math.max(p, r) / 2) * 1.2), Fa.arc(n, g, m, 0, 2 * Math.PI);
                            Fa.fill();
                            Fa.restore();
                        }
                    } else Ze || (Z.Utils.showMessage(Z.Utils.getResource("z9")), (Ze = !0));
            }
        }
    };
    this.clearMask = function () {
        Oa && Z.Viewport.maskFadeTimeoutHandler("out");
    };
    this.maskFadeTimeoutHandler = function (a) {
        if (Oa) {
            Z.maskingSelection || null === a || ((Z.maskingSelection = !0), (vb.display = "inline-block"));
            if ("in" == a) (Z.maskOpacity += eh), 1 < Z.maskOpacity && ((Z.maskOpacity = 1), (a = null), Z.Utils.validateCallback("maskSet"));
            else if ("out" == a || "outIn" == a)
                (Z.maskOpacity -= eh), 0 >= Z.maskOpacity && ((Z.maskOpacity = 0), "outIn" == a ? (a = "In") : ((Z.maskingSelection = !1), Z.Utils.clearDisplay(Oa), (vb.display = "none"), (a = null), Z.Utils.validateCallback("maskClear")));
            Z.Utils.setOpacity(Oa, Z.maskOpacity);
            null !== a && 0 < Z.maskOpacity && 1 > Z.maskOpacity
                ? (Z.maskFadeTimeout = window.setTimeout(function () {
                      Z.Viewport.maskFadeTimeoutHandler(a);
                  }, 50))
                : (window.clearTimeout(Z.maskFadeTimeout), (Z.maskFadeTimeout = null));
        } else (a = null), (Z.maskingSelection = !1);
    };
    this.setEditModeLabel = function (a, b, c, d) {
        d = Ma.toString();
        c = Z.labelMode;
        Z.labelMode = a;
        Z.Utils.removeEventListener(document, "mousemove", Ea);
        Z.Utils.removeEventListener(document, "touchmove", Ea);
        ("view" == a && null === Z.editMode) || Z.Utils.showMessage(Z.Utils.getResource("ALERT_HOWTOEDITMODE" + a.toUpperCase()), !1, Z.messageDurationLong, "center", !0);
        Z.overlayMessage && (Z.overlayMessage.parentNode.style.display = "none");
        if ("edit" == Z.editMode && "editLabel" == Z.editing)
            if ((h.modifyHotspot(C, "mediaType", a, !0, !0), "freehand" == a))
                "freehand" != c && h.modifyHotspot(C, "polygonPts", null, !0, !0), h.modifyHotspot(C, "image", null, !0, !0), h.modifyHotspot(C, "closed", "false", !0, !0), h.modifyHotspot(C, "media", "polygon", !1, !0);
            else if ("text" == a) h.modifyLabel(C, "image", null, !0, !0), h.modifyLabel(C, "captionPosition", "5", !0, !0), h.modifyLabel(C, "media", null, !1, !0);
            else if ("icon" == a) {
                if ((c = document.getElementById("labelIconList" + d))) {
                    c = c[c.selectedIndex].value;
                    switch (c) {
                        case "shim":
                            c = Z.labelIconsInternal ? "circle" : Sa + "/circle.png";
                            break;
                        case "External Graphics File":
                            break;
                        default:
                            c = Z.labelIconsInternal ? c : Sa + "/" + c;
                    }
                    h.modifyHotspot(C, "media", c, !1, !0);
                }
            } else if ("rectangle" == a) {
                da && da.polygonPts && 4 == da.polygonPts.length && ("polygon" == c || "measure" == c)
                    ? ((c = ne(da.polygonPts, 0)),
                      h.modifyHotspot(C, "polygonPts", c, !0, !0),
                      (c = ne(da.polygonPts, 1)),
                      h.modifyHotspot(C, "polygonPts", c, !0, !0),
                      (c = ne(da.polygonPts, 2)),
                      h.modifyHotspot(C, "polygonPts", c, !0, !0),
                      (c = ne(da.polygonPts, 3)),
                      h.modifyHotspot(C, "polygonPts", c, !0, !0))
                    : h.modifyHotspot(C, "polygonPts", null, !0, !0);
                h.modifyHotspot(C, "image", null, !0, !0);
                h.modifyHotspot(C, "media", "polygon", !1, !0);
                var e = da && da.polygonPts && 0 < da.polygonPts.length;
                e && ((c = new Z.Utils.Point(da.polygonPts[0].x, da.polygonPts[0].y)), Hd(C, c));
            } else
                "polygon" == a
                    ? ("view" != c && "rectangle" != c && "polygon" != c && "measure" != c && h.modifyHotspot(C, "polygonPts", null, !0, !0), h.modifyHotspot(C, "image", null, !0, !0), h.modifyHotspot(C, "media", "polygon", !1, !0))
                    : "measure" == a &&
                      ((e = da && da.polygonPts && 0 < da.polygonPts.length) && "rectangle" != c && "polygon" != c && "measure" != c && h.modifyHotspot(C, "polygonPts", null, !0, !0),
                      h.modifyHotspot(C, "image", null, !0, !0),
                      h.modifyHotspot(C, "media", "polygon", !1, !0),
                      e && ((c = new Z.Utils.Point(da.polygonPts[0].x, da.polygonPts[0].y)), Hd(C, c)));
        Z.Toolbar &&
            0 != Z.annotationPanelVisible &&
            (null !== Z.editMode
                ? ((c = "view" == a ? "buttonViewMode" + d : "buttonEditMode" + Z.Utils.stringUpperCaseFirstLetter(a) + d), Z.Toolbar.positionButtonBorder(c))
                : Z.measureVisible &&
                  ((c = document.getElementById("buttonMeasure" + d)),
                  (e = document.getElementById("buttonMeasureExit" + d)),
                  c && e && ((c.style.display = "measure" == Z.labelMode ? "none" : "inline-block"), (e.style.display = "measure" == Z.labelMode ? "inline-block" : "none"))),
            b && "icon" == a && "undefined" !== typeof iconMedia && Z.Utils.stringValidate(iconMedia) && (c = document.getElementById("labelIconList" + d))) &&
            ((a = iconMedia.lastIndexOf("/") + 1),
            (b = iconMedia.lastIndexOf(".")),
            -1 != a && -1 != b && ((a = iconMedia.substring(a, b).toLowerCase()), (a = Z.Utils.arrayIndexOfObjectValueSubstring(c, "value", a, null, !0)), -1 != a && (c.selectedIndex = a)));
        af = Ha = null;
        gd = !1;
        Wa = !0;
        L ? he() : r();
    };
    this.setDrawingColor = function (a, b) {
        var c = Z.annotationFileShared ? "0" : Ma.toString(),
            d;
        switch (a) {
            case "buttonColor0" + c:
                d = "#FFFFFF";
                break;
            case "buttonColor1" + c:
                d = "#FFFF00";
                break;
            case "buttonColor2" + c:
                d = "#00FFFF";
                break;
            case "buttonColor3" + c:
                d = "#800080";
                break;
            case "buttonColor4" + c:
                d = "#008000";
                break;
            case "buttonColor5" + c:
                d = "#FF0000";
                break;
            case "buttonColor6" + c:
                d = "#0000FF";
                break;
            case "buttonColor7" + c:
                d = "#000000";
        }
        Ig = lineStrokeColor = d;
        if (Z.markupMode || Z.editMode) Oc = d;
        c = "#FFFFFF" == d ? "#000000" : "#FFFFFF";
        b ||
            null === C ||
            "edit" != Z.editMode ||
            ("addLabel" != Z.editing && "editLabel" != Z.editing) ||
            (h.modifyHotspot(C, "textColor", d, !0, !0), h.modifyHotspot(C, "backColor", c, !0, !0), h.modifyHotspot(C, "lineColor", d, !1, !0));
    };
    this.deleteLabel = function (a, b) {
        if ("undefined" !== typeof b && null !== b && !b)
            for (var c = 0, d = x.length; c < d; c++)
                if (x[c].id == a) {
                    a = x[c].internalID;
                    break;
                }
        "undefined" !== typeof a &&
            null !== a &&
            "undefined" !== typeof Ia &&
            null !== Ia &&
            ((c = a.toString()),
            (d = Z.Utils.arrayIndexOfObjectValue(Ia, "value", c)),
            -1 != d &&
                ((Ia = Z.Utils.arraySplice(Ia, d, 1)),
                (d = Z.Utils.arrayIndexOfObjectValue(Xb, "value", c)),
                -1 != d && (Xb = Z.Utils.arraySplice(Xb, d, 1)),
                h.deleteHotspot(c, null, !0),
                0 < Xb.length && "undefined" !== typeof Yb && null !== Yb && 0 < Yb.options.length ? ((c = -1 != Yb.selectedIndex ? Yb.selectedIndex : 0), (d = Xb.length - 1), (a = Xb[c <= d ? c : d].value)) : (a = null),
                Pc || Z.tracking ? he() : (z611(bb.options[bb.selectedIndex].value, a), (Kg = 0 < Yb.options.length ? Yb.options[Yb.selectedIndex].value : "0"), Mf("save", "labels"), h.saveAnnotations(!0, !1, "label"))));
    };
    this.tourStart = function () {
        h.tourStop();
        if (!Z.tourStop) {
            Z.tourPlaying = !0;
            var a = document.getElementById("buttonTourStop"),
                b = document.getElementById("buttonTourStart");
            a && b && ((a.style.display = "inline-block"), (b.style.display = "none"));
            Z.screensaver ? Z.constrainPanStrict || (Z.constrainPanStrict = !0) : Z.Utils.playAudio(me, x[fd].audio);
            var c = Z.screensaver ? 0 : Zb(fd, "next", x.length - 1);
            null !== c &&
                Z.Utils.functionCallWithDelay(function () {
                    h.goToDestination(c);
                }, 1500);
        }
    };
    this.tourStop = function () {
        Z.tourPlaying = !1;
        var a = document.getElementById("buttonTourStop"),
            b = document.getElementById("buttonTourStart");
        a && b && ((a.style.display = "none"), (b.style.display = "inline-block"));
    };
    this.priorDestination = function (a) {
        Z.tourPlaying && a && h.tourStop();
        Z.screensaver ? h.zoomAndPanToView(Z.priorX, Z.priorY, Z.priorZ, Z.priorR) : destinationChange("prior");
    };
    this.nextDestination = function (a) {
        Z.tourPlaying && a && h.tourStop();
        destinationChange("next");
    };
    destinationChange = function (a) {
        var b;
        if (Z.screensaver)
            Z.Utils.functionCallWithDelay(
                function () {
                    h.goToDestination(0);
                },
                0 < Z.screensaverSpeed ? 8e3 / Z.screensaverSpeed : 3e3
            );
        else if ("undefined" !== typeof ra && null !== ra && 0 < ra.length) {
            Z.Utils.playAudio(me, x[fd].audio);
            var c = Z.tourPlaying ? x[fd].showFor : 0;
            Z.Utils.stringValidate(x[fd].audio) && (c += 500);
            b = Zb(fd, a, x.length - 1);
            null !== b
                ? (Z.screensaver || Z.Utils.loadAudio(x[b].audio),
                  Z.Utils.functionCallWithDelay(function () {
                      h.goToDestination(b);
                  }, c))
                : h.tourStop();
        }
    };
    this.goToDestination = function (a) {
        if (Z.tourStop) h.tourStop(), (Z.tourStop = !1);
        else {
            var b,
                c,
                d,
                e = Z.tourPlaying ? h.nextDestination : null;
            if (Z.screensaver) {
                a = Z.Utils.getRandomInt(1, Z.imageW);
                b = Z.Utils.getRandomInt(1, Z.imageH);
                c = Z.Utils.getRandomInt(100 * Z.minZ, 100 * Z.maxZ) / 100;
                500 > Z.imageX - a && ((a += 500), a > Z.imageW && (a -= 1e3));
                500 > Z.imageY - b && ((b += 500), b > Z.imageH && (b -= 1e3));
                0.3 > Z.imageZ - c && ((c += 0.3), c > Z.maxZ && (c -= 0.6));
                d = 0;
                var f = 0 < Z.screensaverSpeed ? 8e3 / Z.screensaverSpeed : null;
                null !== f ? h.zoomAndPanToView(a, b, c, d, f, null, e) : h.setView(a, b, c, d, e);
            } else {
                fd = a;
                var m = x[a];
                a = m.x;
                b = m.y;
                c = m.z / 100;
                d = m.rotation;
                f = m.changeFor;
                switch (x.transition) {
                    case "ZoomAndPanToView":
                        h.zoomAndPanToView(a, b, c, d, f, null, e);
                        break;
                    case "SetView":
                        h.setView(a, b, c, d, e);
                        break;
                    default:
                        h.zoomAndPanToView(a, b, c, d, f, null, e);
                }
                e = Z.Utils.arrayIndexOfObjectValue(ra.options, "value", m.internalID.toString());
                -1 != e && (ra.selectedIndex = e);
            }
        }
    };
    this.parseImageListXML = function (a, b) {
        Z.Utils.arrayClear(Ac);
        gg = Z.Utils.getResource("DEFAULT_IMAGELISTPOSITION");
        hg = Z.Utils.getResource("DEFAULT_IMAGELISTSOURCE");
        var c = a.getElementsByTagName("SETUP")[0];
        if (c) {
            var d = c.getAttribute("LISTPOSITION");
            Z.Utils.stringValidate(d) && (gg = d);
            d = c.getAttribute("LISTSOURCE");
            Z.Utils.stringValidate(d) && (hg = d);
            c = c.getAttribute("LISTTITLE");
            Z.Utils.stringValidate(c) && (Z.imageListTitle = c);
        }
        for (var c = a.getElementsByTagName("IMAGE"), d = 0, e = c.length; d < e; d++) {
            for (var f = c[d], m = f.getAttribute("NAME"), h = f.getAttribute("MEDIA"), m = "NAME" == hg ? m : h.substring(h.lastIndexOf("/") + 1, h.length), n = dd("image"), g = "", p = 0, r = f.attributes.length; p < r; p++) {
                var k = f.attributes[p];
                if ("MEDIA" != k.name && "NAME" != k.name && Z.Utils.stringValidate(k.value)) {
                    var A = "";
                    switch (k.name) {
                        case "INITIALX":
                            A = "zInitialX";
                            break;
                        case "INITIALY":
                            A = "zInitialY";
                            break;
                        case "INITIALZOOM":
                            A = "zInitialZoom";
                            break;
                        case "MINZOOM":
                            A = "zMinZoom";
                            break;
                        case "MAXZOOM":
                            A = "zMaxZoom";
                            break;
                        case "INITIALROTATION":
                            A = "zInitialRotation";
                            break;
                        case "RULERLISTTYPE":
                            A = "zRulerListType";
                            break;
                        case "UNITS":
                            A = "zUnits";
                            break;
                        case "UNITSPERIMAGE":
                            A = "zUnitsPerImage";
                            break;
                        case "PIXELSPERUNIT":
                            A = "zPixelsPerUnit";
                            break;
                        case "SOURCEMAGNIFICATION":
                            A = "zSourceMagnification";
                            break;
                        case "IMAGEPROPERTIES":
                            A = "zImageProperties";
                            break;
                        case "TILESPNG":
                            A = "zTilesPNG";
                            break;
                        case "TILEW":
                            A = "zTileW";
                            break;
                        case "TILEH":
                            A = "zTileH";
                            break;
                        case "IMAGEW":
                            A = "zImageW";
                            break;
                        case "IMAGEH":
                            A = "zImageH";
                            break;
                        case "MAGNIFICATION":
                            A = "zMagnification";
                            break;
                        case "FOCAL":
                            A = "zFocal";
                            break;
                        case "QUALITY":
                            A = "zQuality";
                            break;
                        case "HOTSPOTS":
                            A = "zHotspotPath";
                            break;
                        case "ANNOTATIONS":
                            A = "zAnnotationPath";
                            break;
                        case "TRACKING":
                            A = "zTrackingPath";
                    }
                    g += A + "=" + k.value;
                    p < r - 1 && (g += "&");
                }
            }
            null === f.getAttribute("TILEW") && (g += "&zTileW=256");
            null === f.getAttribute("TILEH") && (g += "&zTileH=256");
            Ac[Ac.length] = { text: m, value: n, media: h, optionalParams: g };
        }
        hd(Z.imageListTitle, Ac, b);
    };
    this.setSizeAndPositionImageList = function (b, c, d) {
        if ("undefined" === typeof b || null === b) b = Z.tracking && Z.navigatorVisible && null !== Z.navigatorW ? Z.navigatorW + 2 : parseInt(Z.Utils.getResource("DEFAULT_IMAGELISTWIDTH"), 10);
        var e = h.calculateImageListCoords(Y, ba, a);
        if ("undefined" === typeof c || null === c) c = e.x;
        if ("undefined" === typeof d || null === d) d = e.y;
        sc.style.width = b + "px";
        sc.style.left = c + "px";
        sc.style.top = d + "px";
    };
    this.calculateImageListCoords = function (a, b, c) {
        var d = gg,
            e = Pf;
        Z.tracking && "1" == d && (e += 2);
        var f;
        switch (d) {
            case "0":
                b = f = 0;
                break;
            case "1":
                Z.tracking ? ((b = parseInt(Z.Utils.getResource("DEFAULT_USERPANELHEIGHT"), 10)), (f = Z.navigatorL), (b = Z.navigatorT + Z.navigatorH + Z.rulerH + b + 6)) : (b = f = 25);
                break;
            case "2":
                f = a - e - 25;
                b = 20;
                break;
            case "3":
                f = a - e - 25;
                b = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? b - 50 : b - 37.5;
                break;
            case "4":
                f = 25;
                b = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? b - 50 : b - 37.5;
                break;
            default:
                (f = a - e), (b = 25);
        }
        Z.comparison && "undefined" !== typeof c && null !== c && (0 != c || ("2" != d && "3" != d) ? 1 != c || ("1" != d && "4" != d) || (f = 2 * a - (25 + e)) : (f = a - 25));
        return new Z.Utils.Point(f, b);
    };
    this.setImageListVisibilty = function (a) {
        sc.style.visibility = a;
    };
    this.parseSlidesXML = function (a) {
        Z.Utils.arrayClear(Fb);
        Z.Utils.arrayClear(hf);
        Je = Z.Utils.getResource("DEFAULT_SLIDESHOWAUTOSTART");
        Rf = Z.Utils.getResource("DEFAULT_SLIDESHOWAUTOLOOP");
        oe = Z.Utils.getResource("z202");
        jg = parseInt(Z.Utils.getResource("z204"), 10);
        kg = Z.Utils.getResource("z203");
        null === Z.slideListTitle && (Z.slideListTitle = Z.Utils.getResource("z443"));
        var b = a.getElementsByTagName("SETUP")[0];
        if (b) {
            var c = b.getAttribute("AUTOSTART");
            Z.Utils.stringValidate(c) && (Je = "0" != c && "false" != c);
            c = b.getAttribute("AUTOLOOP");
            Z.Utils.stringValidate(c) && (Rf = "0" != c && "false" != c);
            c = b.getAttribute("CHOICELIST");
            Z.Utils.stringValidate(c) && (oe = c);
            c = b.getAttribute("LISTSOURCE");
            Z.Utils.stringValidate(c) && (kg = c);
            b = b.getAttribute("LISTTITLE");
            Z.Utils.stringValidate(b) && (Z.slideListTitle = b);
        }
        a = a.getElementsByTagName("SLIDE");
        b = 0;
        for (c = a.length; b < c; b++) {
            var d = new cf(a[b]);
            Fb[Fb.length] = d;
            var e = "NAME" == kg ? d.name : d.media.substring(d.media.lastIndexOf("/") + 1, d.media.length);
            hf[hf.length] = { text: e, value: d.internalID };
        }
        a = Z.slideListTitle;
        b = hf;
        c = "0" == oe ? "hidden" : "visible";
        d = h.calculateSlideListCoords(Y, ba);
        "undefined" === typeof Ub || null === Ub
            ? ((Ub = new Z.Utils.createSelectElement("slideList", a, b, jg, d.x, d.y, null, c, jd, "change")),
              Z.ViewerDisplay.appendChild(Ub),
              (Z.slideList = !0),
              (Qc = 0),
              (a = Z.Utils.stringValidate(Z.slideListTitle) && "none" != Z.slideListTitle ? 1 : 0),
              (Ub.selectedIndex = a))
            : Z.Utils.arrayClear(b);
        h.initializeAudioMuteButtons();
        null === Z.imagePath || "null" == Z.imagePath || -1 != Z.imagePath.indexOf("zSlidePath") ? h.goToSlide(0, !0) : Je && h.slideshowStart();
    };
    this.calculateSlideListCoords = function (a, b) {
        var c = jg,
            d;
        switch (oe) {
            case "0":
                d = c = 0;
                break;
            case "1":
                d = c = 25;
                break;
            case "2":
                c = a - c - 25;
                d = 20;
                break;
            case "3":
                c = a - c - 25;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? b - 50 : b - 37.5;
                break;
            case "4":
                c = 25;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? b - 50 : b - 37.5;
                break;
            default:
                (c = a - c), (d = 25);
        }
        return new Z.Utils.Point(c, d);
    };
    this.slideshowStart = function (a) {
        h.slideshowStop();
        Z.slideshowPlaying = !0;
        var b = document.getElementById("buttonSlideshowStop"),
            c = document.getElementById("buttonSlideshowStart");
        b && c && ((b.style.display = "inline-block"), (c.style.display = "none"));
        Z.Utils.playAudio(me, Fb[Qc].audio);
        var b = Z.slideshowPlaying ? Fb[Qc].showFor : 0,
            d = a ? 0 : Zb(Qc, "next", Fb.length - 1);
        null !== d &&
            (Z.Utils.loadAudio(Fb[d].audio),
            Z.Utils.functionCallWithDelay(function () {
                h.goToSlide(d, null, null, !0);
            }, b));
    };
    this.slideshowStop = function () {
        Z.slideshowPlaying = !1;
        var a = document.getElementById("buttonSlideshowStop"),
            b = document.getElementById("buttonSlideshowStart");
        a && b && ((a.style.display = "none"), (b.style.display = "inline-block"));
    };
    this.priorSlide = function (a) {
        Z.slideshowPlaying && a && h.slideshowStop();
        Id("prior");
    };
    this.nextSlide = function (a) {
        Z.slideshowPlaying && a && h.slideshowStop();
        Id("next");
    };
    this.goToSlide = function (a, b, c, d) {
        if (Z.slideshowPlaying || b || c || d) {
            Qc = a;
            a = Fb[a];
            c = Z.Utils.parametersToDelimitedString(Z.parameters, "&");
            temp = a.initialX;
            var e = Z.Utils.stringValidate(temp) ? ("center" == temp ? "zInitialX=" + (Z.imageW / 2).toString() : isNaN(parseFloat(temp)) ? null : "zInitialX=" + temp) : null;
            temp = a.initialY;
            d = Z.Utils.stringValidate(temp) ? ("center" == temp ? "zInitialY=" + (Z.imageH / 2).toString() : isNaN(parseFloat(temp)) ? null : "zInitialY=" + temp) : null;
            temp = a.initialZoom;
            var f = Z.Utils.stringValidate(temp) ? (isNaN(parseFloat(temp)) ? null : "zInitialZoom=" + temp) : null;
            temp = a.minZoom;
            var m = Z.Utils.stringValidate(temp) ? (isNaN(parseFloat(temp)) ? null : "zMinZoom=" + temp) : null;
            temp = a.maxZoom;
            var h = Z.Utils.stringValidate(temp) ? (isNaN(parseFloat(temp)) ? null : "zMaxZoom=" + temp) : null;
            temp = a.hotspotPath;
            var n = Z.Utils.stringValidate(temp) ? "zHotspotPath=" + temp : null;
            temp = a.annotationPath;
            var g = Z.Utils.stringValidate(temp) ? "zAnnotationPath=" + temp : null,
                e = null !== e ? e : null,
                e = null !== d ? (null !== e ? e + "&" + d : d) : null,
                e = null !== f ? (null !== e ? e + "&" + f : f) : null,
                e = null !== m ? (null !== e ? e + "&" + m : m) : null,
                e = null !== h ? (null !== e ? e + "&" + h : h) : null,
                e = null !== n ? (null !== e ? e + "&" + n : n) : null;
            d = null !== g ? (null !== e ? e + "&" + g : g) : null;
            f = Z.Utils.stringValidate(d) ? "&" : "";
            c = c + f + d;
            switch (a.transition) {
                case "Fade":
                    Z.Viewer.setImageWithFade(a.media, c, b, a.changeFor);
                    break;
                case "None":
                    Z.Viewer.setImage(a.media, c, b);
                    break;
                default:
                    Z.Viewer.setImageWithFade(a.media, c, b);
            }
            b = Z.Utils.arrayIndexOfObjectValue(Ub.options, "value", a.internalID.toString());
            -1 != b && (Ub.selectedIndex = b);
            Z.Gallery && Z.Gallery.getInitialized() && Z.Gallery.syncGalleryToViewport(b - 1);
        }
    };
    this.getSlides = function () {
        return Fb;
    };
    this.slideTransitionTimeoutHandler = function (a, b, c, d, e) {
        if ("undefined" === typeof e || null === e) e = 50;
        d && (Z.Viewer.setImage(b, c, d), (a = "in"));
        window.clearTimeout(Z.slideTransitionTimeout);
        Z.slideTransitionTimeout = null;
        "out" == a
            ? 0 <= Z.slideOpacity
                ? ((Z.slideOpacity -= ch), (a = "out"))
                : ((Z.slideOpacity = 0),
                  (a = "in"),
                  Z.setCallback("viewUpdateComplete", function () {
                      Z.slideTransitionTimeout = window.setTimeout(function () {
                          Z.Viewport.slideTransitionTimeoutHandler(a, b, c);
                      }, e);
                  }),
                  Z.Viewer.setImage(b, c, null))
            : (0 == Z.slideOpacity &&
                  (Z.Utils.playAudio(me, Fb[Qc].audio),
                  Z.clearCallback("viewUpdateComplete", function () {
                      Z.slideTransitionTimeout = window.setTimeout(function () {
                          Z.Viewport.slideTransitionTimeoutHandler(a, b, c);
                      }, e);
                  })),
              1 >= Z.slideOpacity ? ((Z.slideOpacity += ch), (a = "in")) : ((Z.slideOpacity = 1), (a = null)));
        sa && Z.Utils.setOpacity(sa, Z.slideOpacity);
        Z.NavigatorDisplay && Z.Utils.setOpacity(Z.NavigatorDisplay, Z.slideOpacity);
        Z.GalleryDisplay && Z.Utils.setOpacity(Z.GalleryDisplay, Z.slideOpacity);
        null !== a &&
            0 != Z.slideOpacity &&
            (Z.slideTransitionTimeout = window.setTimeout(function () {
                Z.Viewport.slideTransitionTimeoutHandler(a, b, c);
            }, e));
    };
    this.initializeAudioMuteButtons = function () {
        if (Z.audioContent) {
            var a = document.getElementById("buttonAudioOn");
            a && (a.style.display = "inline-block");
        }
    };
    this.audioMute = function (a) {
        Z.audioMuted = a;
        var b = document.getElementById("buttonAudioMuted"),
            c = document.getElementById("buttonAudioOn");
        b && c && (a ? ((b.style.display = "inline-block"), (c.style.display = "none")) : ((b.style.display = "none"), (c.style.display = "inline-block")));
    };
    this.setViewNoUpdate = function (a, b, c, d, e, f, m, h, n, g, p) {
        I.left = a;
        I.top = b;
        qa.width = c;
        qa.height = d;
        qa.left = e;
        qa.top = f;
        ca.width = m;
        ca.height = h;
        ca.left = n;
        ca.top = g;
        I.rotation = p;
    };
    this.setView = function (a, b, c, d, e, f) {
        Vc(a, b, c, d, e, f);
    };
    this.zoom = function (a) {
        if ("stop" != a || "stop" != Z.zooming) {
            switch (a) {
                case "out":
                    0 <= Lb && (Lb -= Rd);
                    break;
                case "in":
                    0 >= Lb && (Lb += Rd);
                    break;
                case "stop":
                    Lb = 0;
            }
            Z.zooming = 0 == Lb ? "stop" : 0 < Lb ? "in" : "out";
            if (0 != Lb) {
                if (!Sc) {
                    if ((0 > Lb && Z.imageZ > Z.minZ) || (0 < Lb && Z.imageZ < Z.maxZ)) h.toggleWatermarks(!1), x && 39 < x.length && h.setHotspotsVisibility(!1);
                    Z.useCanvas || Z.Utils.clearDisplay(Ja);
                    Sc = window.setTimeout(Jd, Tf);
                }
            } else se(), h.updateView(), h.toggleWatermarks(!0), x && 39 < x.length && h.setHotspotsVisibility(!0);
        }
    };
    this.pan = function (a) {
        if ("horizontalStop" != a || "stop" != Z.panningX)
            if ("verticalStop" != a || "stop" != Z.panningY) {
                if (!Z.tracking)
                    switch (a) {
                        case "left":
                            0 >= Rb && (Rb += gf);
                            break;
                        case "up":
                            0 >= Sb && (Sb += gf);
                            break;
                        case "down":
                            0 <= Sb && (Sb -= gf);
                            break;
                        case "right":
                            0 <= Rb && (Rb -= gf);
                            break;
                        case "horizontalStop":
                            Rb = 0;
                            break;
                        case "verticalStop":
                            Sb = 0;
                            break;
                        case "stop":
                            Sb = Rb = 0;
                    }
                Z.panningX = 0 == Rb ? "stop" : 0 < Rb ? "left" : "right";
                Z.panningY = 0 == Sb ? "stop" : 0 < Sb ? "up" : "down";
                ja(oa, 1);
                ja(oa, 1);
                0 != Rb || 0 != Sb
                    ? Sc || (h.toggleWatermarks(!1), Z.useCanvas || Z.Utils.clearDisplay(Ja), x && 39 < x.length && h.setHotspotsVisibility(!1), (Sc = window.setTimeout(Jd, Tf)))
                    : (se(), h.updateView(), h.toggleWatermarks(!0), x && 39 < x.length && h.setHotspotsVisibility(!0));
            }
    };
    this.zoomAndPanToView = function (a, b, c, d, e, f, m) {
        h.zoomAndPanAllStop();
        if (Z.clickZoomAndPanBlock) Z.clickZoomAndPanBlock = !1;
        else {
            if ("undefined" === typeof a || null === a) a = Z.imageX;
            if ("undefined" === typeof b || null === b) b = Z.imageY;
            if ("undefined" === typeof c || null === c) c = Z.imageZ;
            if ("undefined" === typeof d || null === d) d = Z.imageR;
            if ("undefined" === typeof e || null === e) e = Yh;
            if ("undefined" === typeof f || null === f) f = bg;
            if ("center" == a || isNaN(parseFloat(a))) a = Z.imageCtrX;
            if ("center" == b || isNaN(parseFloat(b))) b = Z.imageCtrY;
            if (-1 == c || isNaN(parseFloat(c))) c = Z.fitZ;
            h.toggleWatermarks(!1);
            Z.useCanvas || Z.Utils.clearDisplay(Ja);
            x && 39 < x.length && h.setHotspotsVisibility(!1);
            if ("undefined" === typeof a || null === a) a = Z.initialX;
            if ("undefined" === typeof b || null === b) b = Z.initialY;
            if ("undefined" === typeof d || null === d) d = Z.imageR;
            "undefined" === typeof c || null === c ? (c = Z.initialZ) : 100 < c ? (c /= 100) : c > Z.maxZ ? (c = Z.maxZ) : c < Z.maxZ && c > Z.maxZ - 0.01 && (c = Z.maxZ);
            b = Ga(a, b, c, d, "image");
            a = b.x;
            b = b.y;
            c = Ta(c);
            if (Math.round(a) != Math.round(Z.imageX) || Math.round(b) != Math.round(Z.imageY) || Math.round(1e5 * c) != Math.round(1e5 * Z.imageZ) || Math.round(d) != Math.round(Z.imageR))
                (Z.interactive = !1), (qe = 0), Ld(a, b, c, d, e, f, m);
        }
    };
    this.zoomAndPanAllStop = function (a, b) {
        Z.interactive && (re && ud(), Z.tourPlaying && b && (h.tourStop(), (a = !1)), Z.slideshowPlaying && b && (h.slideshowStop(), (a = !1)), Z.smoothPan && null !== Dc && (Z.mouseIsDown || Tc(!0), (a = !0)), a || h.updateView());
    };
    this.syncViewportRelated = function (b, c, d, e, m, f, n, g, p, k) {
        Z.watermarks && ("undefined" === typeof b || null === b || b) && Ja && (Z.Utils.clearDisplay(Ja), Va());
        x && ("undefined" === typeof c || null === c || c) && r();
        Z.sliderZoomVisible &&
            ("undefined" === typeof d || null === d || d) &&
            (Z.ToolbarDisplay && Z.Toolbar.getInitialized() && ((b = h.getZoom()), Z.Toolbar.syncSliderToViewportZoom(b)), Z.Utils.validateCallback("viewZoomingGetCurrentZoom"));
        Z.Navigator && ("undefined" === typeof e || null === e || e) && eb();
        Z.Ruler && ("undefined" === typeof m || null === m || m) && Z.Ruler && Z.Ruler.getInitialized() && Z.Ruler.syncToViewport();
        Z.sliderImageSetVisible && "undefined" !== typeof f && f && Z.Viewer.syncToolbarImageSetSliderToViewport(Z.viewportCurrentID);
        Z.comparison && ("undefined" === typeof n || null === n || n) && Z.Viewer.syncComparisonViewport(n);
        Z.overlays && ("undefined" === typeof g || null === g || g) && Z.Viewer.syncOverlayViewports(g, a);
        Z.bookmarksSet && ("undefined" === typeof p || null === p || p) && Z.Utils.setBookmarksURL();
        Z.tracking && ("undefined" === typeof k || null === k || k) && h.syncTrackingToViewport();
        Z.Utils.validateCallback("viewChanging");
    };
    this.z633 = function (a, b) {
        Kd(a, b) && h.syncViewportRelated();
    };
    this.reset = function (a) {
        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
        a ? (Z.Utils.setButtonDefaults(buttonReset), h.zoomAndPanToView(Z.priorX, Z.priorY, Z.priorZ, Z.priorR)) : h.zoomAndPanToView(Z.initialX, Z.initialY, Z.initialZ, Z.initialR);
        Rc(!0);
    };
    this.toggleWatermarks = function (a) {
        if (pc) {
            var b = "inline-block" == pc.display;
            pc.display = ("undefined" !== typeof a && null !== a ? a : !b) ? "inline-block" : "none";
        }
    };
    this.toggleConstrainPan = function (a) {
        Z.constrainPan = "undefined" !== typeof a && null !== a ? a : !Z.constrainPan;
        if (Z.constrainPan) {
            a = parseFloat(qa.left);
            var b = parseFloat(qa.top);
            a = Ga(a, b, Z.imageZ, Z.imageR, "container");
            I.left = a.x + "px";
            I.top = a.y + "px";
            h.updateView();
        }
    };
    this.toggleSmoothPan = function () {
        Tc();
        Z.smoothPan = !Z.smoothPan;
    };
    this.toggleSmoothZoom = function () {
        ud();
        Z.smoothZoom = !Z.smoothZoom;
    };
    this.buttonToggleBackfillHandler = function () {
        h.toggleBackfill();
    };
    this.toggleBackfill = function (a) {
        var b = document.getElementById("viewportBackfillDisplay" + Ma.toString());
        if (b) {
            var b = b.style,
                c = "inline-block" == b.display;
            b.display = ("undefined" !== typeof a && null !== a ? a : !c) ? "inline-block" : "none";
        }
    };
    this.buttonToggleDisplayHandler = function () {
        h.toggleDisplay();
    };
    this.toggleDisplay = function (a) {
        var b = document.getElementById("viewportDisplay" + Ma.toString());
        b && ((qa = b.style), (b = "inline-block" == qa.display), (qa.display = ("undefined" !== typeof a && null !== a ? a : !b) ? "inline-block" : "none"));
    };
    this.toggleDisplaysOther = function (a) {
        a = a ? "inline-block" : "none";
        Gb && (Gb.display = a);
        ca && (ca.display = a);
        ic && (ic.display = a);
        rf && (rf.display = a);
        pc && (pc.display = a);
        Cb && (Cb.display = a);
        Db && (Db.display = a);
        pb && (pb.display = a);
        Le && (Le.display = a);
    };
    this.zoomAndPanToZoomRectangle = function (a) {
        var b = Math.min(a[0].x, a[1].x, a[2].x, a[3].x),
            c = Math.max(a[0].x, a[1].x, a[2].x, a[3].x),
            d = Math.min(a[0].y, a[1].y, a[2].y, a[3].y);
        a = Math.max(a[0].y, a[1].y, a[2].y, a[3].y);
        c -= b;
        a -= d;
        var b = b + c / 2,
            d = d + a / 2,
            e = h.getRotation(),
            c = h.z468(c, a, e);
        h.zoomAndPanToView(b, d, c);
    };
    this.toggleFullViewModeExternal = function () {
        fg = !0;
        h.toggleFullViewMode();
    };
    this.toggleFullViewMode = function (a, b) {
        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
        Z.ToolbarDisplay && Z.Toolbar.show(!1);
        var c = null,
            d = null;
        Z.fullViewPrior = Z.fullView;
        Z.fullView = "undefined" !== typeof a && null !== a ? a : !Z.fullView;
        var e = document.body.style,
            f = document.documentElement.style,
            m = Z.ViewerDisplay.style,
            c = Z.Utils.getElementStyle(Z.pageContainer);
        Z.fullView
            ? ((d = Z.Utils.getContainerSize(Z.pageContainer, Z.ViewerDisplay)),
              (cg = d.x),
              (dg = d.y),
              (Yg = e.overflow),
              (Zg = f.overflow),
              (eg =
                  Z.Utils.stringValidate(c.backgroundColor) && "transparent" != c.backgroundColor
                      ? c.backgroundColor
                      : Z.Utils.stringValidate(e.backgroundColor) && "transparent" != e.backgroundColor
                      ? e.backgroundColor
                      : Z.Utils.getResource("z120")),
              ($g = m.zIndex),
              Z.fullScreenSupported && !Z.fullPageVisible
                  ? ((d = Z.Utils.getScreenSize()), (Z.fullScreenEntering = !0), Z.Utils.fullScreenView(Z.ViewerDisplay, !0))
                  : ((d = Z.Utils.getWindowSize()), Z.mobileDevice ? ((e.width = d.x), (e.height = d.y)) : ((e.width = "100%"), (e.height = "100%"))),
              (c = d.x),
              (d = d.y),
              (e.overflow = "hidden"),
              (f.overflow = "hidden"),
              (m.backgroundColor = eg),
              (m.position = "fixed"),
              (m.zIndex = "99999999"),
              Z.autoResize && Z.Utils.removeEventListener(window, "resize", Z.Viewer.viewerEventsHandler))
            : ((e.overflow = Yg),
              (f.overflow = Zg),
              (m.backgroundColor = eg),
              (m.position = "relative"),
              (m.zIndex = $g),
              Z.fullScreenSupported && !Z.fullPageVisible && Z.Utils.fullScreenView(Z.ViewerDisplay, !1, b),
              (e.width = cg),
              (e.height = dg),
              (c = cg),
              (d = dg),
              isNaN(c) && (c = Z.ViewerDisplay.clientWidth),
              isNaN(d) && (d = Z.ViewerDisplay.clientHeight),
              (fg = !1),
              Z.autoResize && Z.Utils.addEventListener(window, "resize", Z.Viewer.viewerEventsHandler));
        Z.initialFullPage && h.setSizeAndPosition(c, d);
        e = Z.viewportCurrent.calculateZoomForResize(Z.viewportCurrent.getZoom(), Z.viewerW, Z.viewerH, c, d);
        Z.Viewer.resizeViewer(c, d, e);
        e = null;
        if (Z.comparison) (e = 0 == h.getViewportID() ? Z.Viewport1 : Z.Viewport0) && e.syncViewportResize(Z.imageX, Z.imageY, Z.imageZ, Z.imageR);
        else if (Z.overlays) for (f = 0, m = Z.imageSetLength - 1; f < m; f++) Z["Viewport" + f.toString()].syncViewportResize(Z.imageX, Z.imageY, Z.imageZ, Z.imageR);
        Z.imageList && h.getStatus("initializedImageList") && (h.setSizeAndPositionImageList(), e && e.getStatus("initializedImageList") && e.setSizeAndPositionImageList());
        e = Z.fullView;
        f = document.getElementById("buttonFullView");
        m = document.getElementById("buttonFullViewExit");
        f && m && ((f.style.display = e ? "none" : "inline-block"), (m.style.display = e ? "inline-block" : "none"));
        fg
            ? (Sd ||
                  ((e = Z.Utils.getResource("z420")),
                  (f = parseFloat(Z.viewerW) - 54),
                  (m = parseFloat(Z.viewerH) - 54),
                  (c = Z.Utils.getResource("DEFAULT_FULLVIEWEXITEXTERNALBUTTONCOLOR")),
                  (Sd = new Z.Utils.Button("buttonFullViewExitExternal", e, null, null, null, null, "34px", "34px", f + "px", m + "px", "mousedown", te, "z391EXITEXTERNAL", "solid", "1px", c, "0px", "0px")),
                  Z.ViewerDisplay.appendChild(Sd.elmt)),
              (Sd.elmt.style.display = "inline-block"))
            : Sd && (Sd.elmt.style.display = "none");
        Z.fullViewPrior = !1;
    };
    this.rotate = function (a, b) {
        Rc();
        if (!Z.rotationFree || b) 0 != Z.imageR % 90 && (Z.imageR = 90 * Math.round(Z.imageR / 90)), h.rotateStep("clockwise" == a ? 90 : -90, !0);
        else if ("stop" != a || "stop" != Z.rotating)
            (wd = "stop" == a ? 0 : "clockwise" == a ? Xg : -Xg),
                (Z.rotating = 0 == wd ? "stop" : 0 < wd ? "clockwise" : "counterwise"),
                0 != wd ? vd || (vd = window.setTimeout(ue, Mg)) : ((wd = 0), vd && (window.clearTimeout(vd), (vd = null)), h.updateView());
    };
    this.rotateStep = function (a, b, c) {
        if (Z.interactive)
            if (Z.rotationSupported)
                if (((a = Z.imageR + a), Z.rotationFree)) Z.Utils.rotateElement(I, a), (Z.imageR = a), eb();
                else {
                    Z.interactive = !1;
                    var d = Ua(a);
                    b
                        ? h.zoomAndPanToView(Z.imageX, Z.imageY, Z.imageZ, a, 600, 12, function () {
                              Z.imageR = d;
                          })
                        : c
                        ? (Z.Utils.rotateElement(I, Z.imageR, !0), (Z.interactive = !0))
                        : (Z.Utils.rotateElement(I, a), ha && 0 != Z.imageR && La.rotate(((a - Z.imageR) * Math.PI) / 180), (Z.imageR = d), h.zoomAndPanToView(Z.imageX, Z.imageY, Z.imageZ));
                }
            else Z.Utils.showMessage(Z.Utils.getResource("z12"));
    };
    this.toggleEditModeMeasure = function (a) {
        h.zoomAndPanAllStop();
        Z.maskingSelection && Z.maskClearOnUserAction && h.clearMask();
        ("undefined" !== typeof a && !a) || "measure" == Z.labelMode
            ? (null === Z.editMode && "measure" == Z.labelMode && 0 < x.length && (h.deleteAllMeasureHotspots(), (C = null)), h.setEditModeLabel("view"))
            : h.setEditModeLabel("measure");
    };
    this.getSmoothPanGliding = function () {
        return hb;
    };
    this.setSmoothPanGliding = function (a) {
        hb = a;
    };
    this.fullScreenEscapeHandler = function (a) {
        Z.fullScreenEntering ? (Z.fullScreenEntering = !1) : h.toggleFullViewMode(!1, !0);
    };
    this.mouseWheelHandler = function (a, b) {
        Z.mouseWheelIsDown = !0;
        Z.mouseWheelCompleteTimer && window.clearTimeout(Z.mouseWheelCompleteTimer);
        Z.mouseWheelCompleteTimer = window.setTimeout(Z.Viewer.z586, Z.mouseWheelCompleteDuration);
        if (!("zoom" != Z.sliderFocus || (Z.imageSet && b))) {
            var c = h.z482(oa, va * (1 + (0 < a ? Rd : -Rd)));
            constrainedZ = Ta(c);
            constrainedZ != Z.imageZ && ((Z.zooming = 0 < a ? "in" : 0 > a ? "out" : "stop"), h.z633(constrainedZ));
        } else if ("imageSet" == Z.sliderFocus || b) 0 < a ? Z.Viewer.viewportNext() : 0 > a && Z.Viewer.viewportPrior();
    };
};
Z.ZoomifyToolbar = function (a) {
    function b() {
        var a = parseFloat(Z.Utils.getResource("UI_TOOLBARINTERNALBACKGROUNDALPHA")),
            b = Z.Utils.getResource("UI_TOOLBARINTERNALBACKGROUNDCOLOR"),
            c = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONUPCOLOR"),
            d = Z.viewerW / 2 - 50,
            g = Z.viewerH - 25 - 10,
            p = Math.round(25),
            k = Math.round(25 / 1.5),
            A = (100 - 3 * p) / 4,
            u = (25 - k) / 2;
        Z.ToolbarDisplay = Z.Utils.createContainerElement("div", "ToolbarDisplay", "inline-block", "absolute", "visible", "100px", "25px", d + "px", g + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
        T = Z.ToolbarDisplay.style;
        d = Z.Utils.createContainerElement("div", "toolbarBackgroundInternal", "inline-block", "absolute", "visible", "100px", "25px", "0px", "0px", "solid", "1px", b, "0px", "0px", "normal");
        Z.Utils.setOpacity(d, a, b);
        Z.ToolbarDisplay.appendChild(d);
        a = Z.Utils.createContainerElement("div", "buttonZoomOutInternal", "inline-block", "absolute", "visible", p + "px", k + "px", A + 1 + "px", u + 1 + "px", "none", "0px", c, "0px", "0px", "normal");
        Z.Utils.setOpacity(a, 0.4, b);
        d = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONZOOMOUTTEXT");
        d = document.createTextNode(d);
        a.appendChild(d);
        Z.ToolbarDisplay.appendChild(a);
        ua = a.style;
        Z.Utils.setTextNodeStyle(d, "black", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(d);
        d = Z.Utils.createContainerElement("div", "buttonResetInternal", "inline-block", "absolute", "visible", p + "px", k + "px", 2 * A + p + 1 + "px", u + 1 + "px", "none", "0px", c, "0px", "0px", "normal");
        Z.Utils.setOpacity(d, 0.4, b);
        g = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONRESETTEXT");
        g = document.createTextNode(g);
        d.appendChild(g);
        Z.ToolbarDisplay.appendChild(d);
        ga = d.style;
        Z.Utils.setTextNodeStyle(g, "blue", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(g);
        c = Z.Utils.createContainerElement("div", "buttonZoomInInternal", "inline-block", "absolute", "visible", p + "px", k + "px", 3 * A + 2 * p + 1 + "px", u + 1 + "px", "none", "0px", c, "0px", "0px", "normal");
        Z.Utils.setOpacity(c, 0.4, b);
        b = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONZOOMINTEXT");
        b = document.createTextNode(b);
        c.appendChild(b);
        Z.ToolbarDisplay.appendChild(c);
        y = c.style;
        Z.Utils.setTextNodeStyle(b, "black", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(b);
        Z.Utils.addEventListener(a, "mouseover", v);
        Z.Utils.addEventListener(a, "mousedown", v);
        Z.Utils.addEventListener(a, "mouseup", v);
        Z.Utils.addEventListener(a, "mouseout", v);
        Z.Utils.addEventListener(d, "mouseover", v);
        Z.Utils.addEventListener(d, "mousedown", v);
        Z.Utils.addEventListener(d, "mouseup", v);
        Z.Utils.addEventListener(d, "mouseout", v);
        Z.Utils.addEventListener(c, "mouseover", v);
        Z.Utils.addEventListener(c, "mousedown", v);
        Z.Utils.addEventListener(c, "mouseup", v);
        Z.Utils.addEventListener(c, "mouseout", v);
        T.zIndex = (Z.baseZIndex + 2).toString();
        Z.ViewerDisplay.appendChild(Z.ToolbarDisplay);
        Z.Utils.addEventListener(Z.ToolbarDisplay, "mouseover", Z.Utils.stopPropagation);
        e(!0);
    }
    function c() {
        Z.Gallery && Z.Gallery.getInitialized() ? Z.Gallery.setSizeAndPosition() : window.setTimeout(c, 100);
    }
    function d() {
        window.clearInterval(ja);
        ja = null;
        var a = document.getElementById("progressTextBoxCenteredDiv");
        a && (a = a.firstChild) && (a.nodeValue = "");
    }
    function e(a) {
        !Ca && a && ((Ca = !0), Z.Utils.validateCallback("toolbarInitialized"), Z.Viewer.validateViewerReady("toolbarInitialized"));
    }
    function g(a) {
        (4 > Z.toolbarVisible && !Z.mobileDevice) || 8 == Z.toolbarVisible || Z.toolbarInternal ? k(a) : q(!a);
    }
    function k(a) {
        T && (T.display = a ? "inline-block" : "none");
    }
    function q(a) {
        Z.ToolbarMinimized = a;
        if (T) {
            var b = document.getElementById("buttonContainer"),
                c = document.getElementById("toolbarBackground"),
                d = document.getElementById("buttonMinimize"),
                e = document.getElementById("buttonExpand"),
                g = document.getElementById("logoDivider"),
                p = 0;
            e && !Ua && (p = parseFloat(e.style.left) + parseFloat(e.style.width) + 4);
            if (Z.imageFilters)
                var k = document.getElementById("imageFilterPanelBackground"),
                    A = document.getElementById("buttonContainerImageFilter");
            var v = Z.toolbarCurrentW;
            a
                ? (b && (b.style.display = "none"),
                  d && e && !Ua && (g && (g.style.display = "none"), (d.style.display = "none"), (e.style.display = "inline-block")),
                  (T.width = p + "px"),
                  c && (c.style.width = p + "px"),
                  k && A && ((k.style.width = "0px"), (A.style.display = "none")))
                : (b && (b.style.display = "inline-block"), d && e && !Ua && (g && (g.style.display = "inline-block"), (d.style.display = "inline-block"), (e.style.display = "none")), (T.width = v + "px"), c && (c.style.width = v + "px"));
        }
    }
    function t(a) {
        if ("undefined" !== typeof trszS && "undefined" !== typeof btszS) {
            a = (a - Z.minZ) / (Z.maxZ - Z.minZ);
            var b = parseFloat(trszS.left),
                c = parseFloat(trszS.left) + parseFloat(trszS.width) - parseFloat(btszS.width) - b;
            btszS.left = a * c + b + "px";
        }
    }
    function J(a) {
        "undefined" !== typeof btsZ && ((P = !0), (a = Z.Utils.getMousePosition(a)), (btsZ.mouseXPrior = a.x), (btsZ.mouseYPrior = a.y));
    }
    function F() {
        if ("undefined" !== typeof trszS && "undefined" !== typeof btsZ && "undefined" !== typeof btszS) {
            var b = parseFloat(trszS.left),
                c = parseFloat(trszS.left) + parseFloat(trszS.width) - parseFloat(btszS.width),
                d = parseFloat(btszS.left) + (na.x - btsZ.mouseXPrior);
            d < b ? (d = b) : d > c ? (d = c) : (btsZ.mouseXPrior = na.x);
            btszS.left = d + "px";
            b = Z.minZ + ((d - b) / (c - b)) * (Z.maxZ - Z.minZ);
            c = b - a.getZoom();
            Z.zooming = 0 < c ? "in" : 0 > c ? "out" : "stop";
            a.z633(b);
        }
    }
    function Q(a) {
        btsiS && ((A = !0), (a = Z.Utils.getMousePosition(a)), (btsiS.mouseXPrior = a.x), (btsiS.mouseYPrior = a.y));
    }
    function W() {
        if (trsiS && btsiS && btsiS) {
            var a = parseFloat(trsisS.left),
                b = parseFloat(trsisS.left) + parseFloat(trsisS.width) - parseFloat(btsisS.width),
                c = parseFloat(btsisS.left) + (p.x - btsiS.mouseXPrior);
            c < a ? (c = a) : c > b ? (c = b) : (btsiS.mouseXPrior = p.x);
            btsisS.left = c + "px";
            a = Math.round(((c - a) / (b - a)) * (Z.imageSetLength - 1));
            a != Z.viewportCurrentID && Z.Viewer.viewportSelect(a, !0);
        }
    }
    function O(a) {
        p = new Z.Utils.Point(a.clientX, a.clientY);
    }
    function ea(a) {
        (a = Z.Utils.getFirstTouch(a)) && (p = new Z.Utils.Point(a.pageX, a.pageY));
    }
    function v(b) {
        if ((b = Z.Utils.event(b))) {
            var c = b.type,
                d = Z.Utils.target(b);
            if (d) {
                ua.background = G;
                ga.background = G;
                y.background = G;
                var e = d.id;
                b = b.altKey;
                switch (c) {
                    case "mouseover":
                        d.style.background = M;
                        break;
                    case "mousedown":
                        d.style.background = S;
                        "buttonZoomInInternal" == e ? b || a.zoom("in") : "buttonZoomOutInternal" == e && (b || a.zoom("out"));
                        break;
                    case "mouseup":
                        (d.style.background = M), a.zoom("stop"), "buttonResetInternal" == e && a.reset(b);
                }
            }
        }
    }
    function u(b) {
        if ((b = Z.Utils.event(b))) {
            var c = b.type,
                d = Z.Utils.target(b);
            if (d) {
                var e = d.parentNode;
                if (e) {
                    var g = e;
                    tbID = e.id;
                }
            }
            d = Z.Utils.relatedTarget(b);
        }
        "mousedown" == c && a && "buttonAudioOn" != tbID && "buttonAudioMuted" != tbID && (a.zoomAndPanAllStop(!1, !0), Z.maskingSelection && Z.maskClearOnUserAction && a.clearMask());
        if (
            (Z.interactive || ("mousedown" != c && "mouseup" != c) || "buttonRotateClockwise" == tbID || "buttonRotateCounterwise" == tbID) &&
            (!d || ("[object HTMLSelectElement]" != d && "[object HTMLOptionElement]" != d)) &&
            !Z.Utils.isRightMouseButton(b)
        ) {
            Z.touchSupport && b.preventDefault();
            if ((tbID && -1 != tbID.indexOf("viewportContainer")) || P || Hb || A) P ? (e = document.getElementById("buttonSliderZoom")) : A && (e = document.getElementById("buttonSliderImageSet")), e && (tbID = e.id);
            aa(e, c);
            if (tbID && "buttonBackground" != tbID && c)
                switch (c) {
                    case "click":
                        c = -1 != tbID.toLowerCase().indexOf("checkbox");
                        a && c && w(b, tbID);
                        break;
                    case "mouseover":
                        if ("trackSliderZoom" != tbID && "trackSliderImageSet" != tbID)
                            if (
                                (Z.Utils.removeEventListener(e.childNodes[0], "mouseover", u),
                                Z.Utils.addEventListener(e.childNodes[1], "mousedown", u),
                                Z.Utils.addEventListener(e.childNodes[1], "mouseout", u),
                                P && g && Z.Utils.addEventListener(g.childNodes[0], "mouseup", u),
                                A && g && Z.Utils.addEventListener(g.childNodes[0], "mouseup", u),
                                "buttonZoomIn" == tbID || "buttonSliderZoom" == tbID || "buttonZoomOut" == tbID)
                            )
                                Z.sliderFocus = "zoom";
                            else {
                                if ("buttonImageSetPrior" == tbID || "buttonSliderImageSet" == tbID || "buttonImageSetNext" == tbID) Z.sliderFocus = "imageSet";
                            }
                        else Z.Utils.addEventListener(e.childNodes[0], "mouseout", u), (Z.sliderFocus = "trackSliderImageSet" == tbID ? "imageSet" : "zoom");
                        break;
                    case "mousedown":
                        Z.buttonIsDown = !0;
                        !Z.fullView && document.activeElement && document.activeElement.blur();
                        "trackSliderZoom" != tbID && "trackSliderImageSet" != tbID && -1 == tbID.indexOf("trackSliderFilter")
                            ? (Z.Utils.removeEventListener(e.childNodes[1], "mousedown", u),
                              Z.Utils.removeEventListener(e.childNodes[1], "mouseout", u),
                              Z.Utils.addEventListener(e.childNodes[2], "mouseup", u),
                              Z.Utils.addEventListener(e.childNodes[2], "mouseout", u),
                              "buttonSliderZoom" == tbID
                                  ? (J(b), N(b), Z.Utils.addEventListener(document, "mousemove", N), R || (R = window.setInterval(F, X)), Z.Utils.addEventListener(document, "mouseup", u))
                                  : -1 != tbID.indexOf("buttonSliderFilter")
                                  ? (imageFilterEventsManager(b, tbID, "sliderStart"),
                                    z650Filter(b, tbID),
                                    Z.Utils.addEventListener(document, "mousemove", z650Filter),
                                    fa ||
                                        (fa = window.setInterval(function () {
                                            imageFilterEventsManager(b, tbID, "sliderSlide");
                                        }, ub)),
                                    Z.Utils.addEventListener(document, "mouseup", u))
                                  : "buttonSliderImageSet" == tbID && (Q(b), O(b), Z.Utils.addEventListener(document, "mousemove", O), Va || (Va = window.setInterval(W, Ka)), Z.Utils.addEventListener(document, "mouseup", u)))
                            : Z.Utils.addEventListener(document, "mouseup", u);
                        a && w(b, tbID);
                        break;
                    case "mouseup":
                        Z.buttonIsDown = !1;
                        "trackSliderZoom" != tbID && "trackSliderImageSet" != tbID && -1 == tbID.indexOf("trackSliderFilter")
                            ? (Z.Utils.removeEventListener(e.childNodes[2], "mouseup", u),
                              Z.Utils.removeEventListener(e.childNodes[2], "mouseout", u),
                              Z.Utils.addEventListener(e.childNodes[1], "mousedown", u),
                              Z.Utils.addEventListener(e.childNodes[1], "mouseout", u),
                              g && (P || Hb || A) && Z.Utils.removeEventListener(g.childNodes[0], "mouseup", u))
                            : Z.Utils.addEventListener(document, "mouseup", u);
                        a && w(b, tbID);
                        break;
                    case "mouseout":
                        if ("trackSliderZoom" != tbID && -1 == tbID.indexOf("trackSliderFilter") && "trackSliderImageSet" != tbID) {
                            if (
                                (Z.Utils.removeEventListener(e.childNodes[1], "mousedown", u),
                                Z.Utils.removeEventListener(e.childNodes[1], "mouseout", u),
                                Z.Utils.addEventListener(e.childNodes[0], "mouseover", u),
                                a && w(b, tbID),
                                "buttonImageSetPrior" == tbID ||
                                    "buttonSliderImageSet" == tbID ||
                                    "trackSliderImageSet" == tbID ||
                                    "buttonImageSetNext" == tbID ||
                                    "buttonZoomIn" == tbID ||
                                    "buttonSliderZoom" == tbID ||
                                    "buttonZoomOut" == tbID)
                            )
                                Z.sliderFocus = 2 == Z.mouseWheel ? "imageSet" : "zoom";
                        } else Z.Utils.removeEventListener(e.childNodes[0], "mouseout", u), (Z.sliderFocus = 2 == Z.mouseWheel ? "imageSet" : "zoom");
                        break;
                    case "touchstart":
                        "buttonSliderZoom" == tbID
                            ? (J(b), ka(b), Z.Utils.addEventListener(document, "touchmove", ka), R || (R = window.setInterval(F, X)))
                            : -1 != tbID.indexOf("buttonSliderFilter")
                            ? (imageFilterEventsManager(b, tbID, "sliderStart"),
                              z654Filter(b, tbID),
                              Z.Utils.addEventListener(document, "touchmove", z654Filter),
                              fa ||
                                  (fa = window.setInterval(function () {
                                      imageFilterEventsManager(b, tbID, "sliderSlide");
                                  }, ub)))
                            : "buttonSliderImageSet" == tbID && (Q(b), ea(b), Z.Utils.addEventListener(document, "touchmove", ea), Va || (Va = window.setInterval(W, Ka)));
                        Z.Utils.addEventListener(e, "touchend", u);
                        Z.Utils.addEventListener(e, "touchcancel", u);
                        a && w(b, tbID);
                        break;
                    case "touchend":
                        Z.Utils.addEventListener(e, "touchstart", u);
                        a && w(b, tbID);
                        break;
                    case "touchcancel":
                        Z.Utils.addEventListener(e, "touchstart", u);
                        a && w(b, tbID);
                        break;
                    case "MSPointerDown":
                        "buttonSliderZoom" == tbID
                            ? (J(b), ka(b), Z.Utils.addEventListener(document, "MSPointerMove", ka), R || (R = window.setInterval(F, X)))
                            : -1 != tbID.indexOf("SliderFilter")
                            ? (imageFilterEventsManager(b, tbID, "sliderStart"),
                              z654Filter(b, tbID),
                              Z.Utils.addEventListener(document, "MSPointerMove", z654Filter),
                              fa ||
                                  (fa = window.setInterval(function () {
                                      imageFilterEventsManager(b, tbID, "sliderSlide");
                                  }, ub)))
                            : "buttonSliderImageSet" == tbID && (Q(b), ea(b), Z.Utils.addEventListener(document, "MSPointerMove", ea), Va || (Va = window.setInterval(W, Ka)));
                        Z.Utils.addEventListener(e, "MSPointerUp", u);
                        a && w(b, tbID);
                        break;
                    case "MSPointerUp":
                        Z.Utils.addEventListener(e, "MSPointerDown", u), a && w(b, tbID);
                }
        }
    }
    function w(b, c) {
        var d = b.type,
            e = Z.annotationFileShared ? "0" : Ba,
            g = b.altKey;
        if ("click" == d)
            Z.comparison && -1 != c.indexOf("Sync")
                ? ((e = Z.Utils.target(b)), (Z.syncComparison = e.checked), Z.Viewer.syncComparisonViewport(!0))
                : Z.tracking && -1 != c.indexOf("Count")
                ? a.trackingEventsManager(b, c)
                : Z.userLogging && -1 != c.indexOf("User")
                ? a.trackingEventsManager(b, c)
                : Z.imageFilters && -1 != c.indexOf("Filter") && imageFilterEventsManager(b, c, "checkbox");
        else if ("mousedown" == d || "touchstart" == d)
            switch (
                ((d = document.activeElement.id),
                !Z.Utils.stringValidate(d) ||
                    (d != "poiNameTextElement" + Ba &&
                        d != "labelNameTextElement" + Ba &&
                        "captionTextElement" != d &&
                        "commentTextElement" != d &&
                        "tooltipTextElement" != d &&
                        "clickURLTextElement" != d &&
                        d != "noteNameTextElement" + Ba &&
                        d != "noteTextElement" + Ba) ||
                    document.getElementById(d).blur(),
                U.positionButtonBorder(c),
                Z.tracking && -1 != c.indexOf("buttonCounterListShow") && (c = "buttonCounterListShow"),
                c)
            ) {
                case "buttonMinimize":
                    g ? a.setHotspotsVisibility(!a.getHotspotsVisibility()) : (U.minimize(!0), Z.Navigator && (Z.Navigator.setVisibility(!1), Z.comparison && Z.Navigator2.setVisibility(!1)), Z.Gallery && Z.Gallery.setVisibility(!1));
                    break;
                case "buttonExpand":
                    g ? a.setHotspotsVisibility(!a.getHotspotsVisibility()) : (U.minimize(!1), Z.Navigator && (Z.Navigator.setVisibility(!0), Z.comparison && Z.Navigator2.setVisibility(!0)), Z.Gallery && Z.Gallery.setVisibility(!0));
                    break;
                case "buttonZoomOut":
                    g || a.zoom("out");
                    break;
                case "buttonZoomIn":
                    g || a.zoom("in");
                    break;
                case "buttonPanLeft":
                    a.pan("left");
                    break;
                case "buttonPanUp":
                    a.pan("up");
                    break;
                case "buttonPanDown":
                    a.pan("down");
                    break;
                case "buttonPanRight":
                    a.pan("right");
                    break;
                case "buttonReset":
                    a.reset(g);
                    break;
                case "buttonFullView":
                    break;
                case "buttonFullViewExit":
                    break;
                case "buttonMeasure":
                    a.toggleEditModeMeasure(!0);
                    break;
                case "buttonMeasureExit":
                    a.toggleEditModeMeasure(!1);
                    break;
                case "buttonHelp":
                    Z.annotations && null === Z.editMode ? Z.Utils.showHelp(Z.Utils.getResource("z32") + Z.Utils.getResource("z30") + Z.Utils.getResource("z29")) : Z.Utils.showHelp(Z.Utils.getResource("z32"));
                    break;
                case "buttonHelpMarkup" + e:
                    Z.Utils.showHelp(Z.Utils.getResource("z31"));
                    break;
                case "buttonHelpAnnotation" + e:
                    Z.Utils.showHelp(Z.Utils.getResource("z28"));
                    break;
                case "buttonRotateClockwise":
                    a.rotate("clockwise", g);
                    break;
                case "buttonRotateCounterwise":
                    a.rotate("counterwise", g);
                    break;
                case "buttonTourPrior":
                    a.priorDestination(!0);
                    break;
                case "buttonTourNext":
                    a.nextDestination(!0);
                    break;
                case "buttonTourStart":
                    a.tourStart();
                    break;
                case "buttonTourStop":
                    a.tourStop();
                    break;
                case "buttonSlideshowPrior":
                    a.priorSlide(!0);
                    break;
                case "buttonSlideshowNext":
                    a.nextSlide(!0);
                    break;
                case "buttonSlideshowStart":
                    a.slideshowStart();
                    break;
                case "buttonSlideshowStop":
                    a.slideshowStop();
                    break;
                case "buttonAudioOn":
                    a.audioMute(!0);
                    break;
                case "buttonAudioMuted":
                    a.audioMute(!1);
                    break;
                case "buttonImageSetPrior":
                    Z.animation && Z.Viewer.viewportChange("backward");
                    break;
                case "buttonImageSetNext":
                    Z.animation && Z.Viewer.viewportChange("forward");
                    break;
                case "buttonPreload":
                    Z.imageSet ? Z.Viewer.prez581s() : Z.Viewport.prez581s();
                    break;
                case "buttonEditModeMeasure" + e:
                    a.setEditModeLabel("measure");
                    break;
                default:
                    "buttonColor" == c.substr(0, 11) && a.setDrawingColor(c);
            }
        else if ("mouseup" == d || "touchend" == d || "touchcancel" == d)
            if ("buttonSliderZoom" == c || P) R && (window.clearInterval(R), (R = null)), wa(), (P = !1), (Z.zooming = "stop"), a.updateView();
            else if ("trackSliderZoom" == c)
                "undefined" !== typeof trsZ &&
                    "undefined" !== typeof trszS &&
                    ((e = Z.Utils.getElementPosition(trsZ)),
                    (e = Z.Utils.getMousePosition(b).x - e.x),
                    (g = parseFloat(trszS.width)),
                    (e = Z.minZ + ((e - 0) / (g - 0)) * (Z.maxZ - Z.minZ)),
                    e < Z.minZ + 0.1 && (e = Z.minZ),
                    e > Z.maxZ - 0.1 && (e = Z.maxZ),
                    (g = e - a.getZoom()),
                    (Z.zooming = 0 < g ? "in" : 0 > g ? "out" : "stop"),
                    a.z633(e),
                    (Z.zooming = "stop"),
                    a.updateView());
            else if (-1 != c.indexOf("buttonSliderFilter") || Hb) fa && (window.clearInterval(fa), (fa = null)), wa(), imageFilterEventsManager(b, c, "sliderEnd");
            else if (-1 != c.indexOf("trackSliderFilter")) imageFilterEventsManager(b, c, "z653");
            else if ("buttonImageFilterPlus" == c || "buttonImageFilterMinus" == c) imageFilterEventsManager(b, c);
            else if ("buttonSliderImageSet" == c || A) Va && (window.clearInterval(Va), (Va = null)), wa(), (A = !1), Z.Viewer.viewportSelect(Z.viewportCurrentID, !0);
            else if ("buttonZoomOut" == c || "buttonZoomIn" == c) a.zoom("stop"), "buttonZoomOut" == c && g && a.toggleSmoothZoom(), "buttonZoomIn" == c && g && a.toggleEditMode();
            else if ("buttonPanLeft" == c || "buttonPanRight" == c)
                Z.tracking ? ("buttonPanLeft" == c ? Z.viewportCurrent.goToNextCell("left") : Z.viewportCurrent.goToNextCell("right")) : a.pan("horizontalStop"), "buttonPanLeft" == c && g && a.toggleSmoothPan();
            else if ("buttonPanUp" == c || "buttonPanDown" == c) Z.tracking ? ("buttonPanUp" == c ? Z.viewportCurrent.goToNextCell("up") : Z.viewportCurrent.goToNextCell("down")) : a.pan("verticalStop");
            else if ("buttonHelp" == c) 0 == Z.debug && g && Z.Utils.showGlobals();
            else if ("buttonRotateClockwise" == c || "buttonRotateCounterwise" == c) Z.rotationFree && a.rotate("stop");
            else if (c == "buttonLabelScaleDown" + e || c == "buttonLabelScaleUp" + e) a.labelScale("stop");
            else if ("buttonFullView" == c) a.toggleFullViewMode(!0);
            else if ("buttonFullViewExit" == c) a.toggleFullViewMode(!1);
            else {
                if ("buttonImageSetPrior" == c || "buttonImageSetNext" == c)
                    Z.animation ? Z.Viewer.viewportChange("stop") : Z.slidestack && ("buttonImageSetPrior" == c ? Z.Viewer.viewportChange("backward") : "buttonImageSetNext" == c && Z.Viewer.viewportChange("forward"));
            }
        else
            "mouseout" == d &&
                ("buttonZoomOut" == c || "buttonZoomIn" == c
                    ? a.zoom("stop")
                    : "buttonPanLeft" == c || "buttonPanRight" == c
                    ? a.pan("horizontalStop")
                    : "buttonPanUp" == c || "buttonPanDown" == c
                    ? a.pan("verticalStop")
                    : c == "buttonLabelScaleDown" + e || c == "buttonLabelScaleUp" + e
                    ? a.labelScale("stop")
                    : ("buttonImageSetPrior" != c && "buttonImageSetNext" != c) || Z.Viewer.viewportChange("stop"));
    }
    function wa() {
        P
            ? (Z.Utils.removeEventListener(document, "mousemove", N), Z.Utils.removeEventListener(document, "mouseup", u), Z.Utils.removeEventListener(document, "touchmove", ka))
            : Hb
            ? (Z.Utils.removeEventListener(document, "mousemove", z650Filter), Z.Utils.removeEventListener(document, "mouseup", u), Z.Utils.removeEventListener(document, "touchmove", z654Filter))
            : A && (Z.Utils.removeEventListener(document, "mousemove", O), Z.Utils.removeEventListener(document, "mouseup", u), Z.Utils.removeEventListener(document, "touchmove", ea));
        for (var a = Z.ToolbarDisplay.childNodes, b = 0, c = a.length; b < c; b++) {
            var d = a[b],
                e = d.id;
            if (e && -1 != e.indexOf("button"))
                if ("buttonContainer" != e && "buttonContainerImageFilter" != e) Z.Utils.setButtonDefaults(d);
                else
                    for (var d = d.childNodes, e = 0, g = d.length; e < g; e++) {
                        var p = d[e],
                            k = p.id;
                        k && -1 != k.indexOf("button") && Z.Utils.setButtonDefaults(p);
                    }
        }
    }
    function N(a) {
        na = new Z.Utils.Point(a.clientX, a.clientY);
    }
    function ka(a) {
        (a = Z.Utils.getFirstTouch(a)) && (na = new Z.Utils.Point(a.pageX, a.pageY));
    }
    function aa(a, b) {
        if (-1 != a.id.indexOf("button") && -1 == a.id.indexOf("buttonContainer")) {
            var c = a.firstChild,
                d = a.childNodes[1],
                e = a.childNodes[2];
            if (c && d && e)
                if (((c = c.style), (d = d.style), (e = e.style), (c.visibility = d.visibility = e.visibility = "hidden"), "mouseover" == b && "buttonSliderZoom" == a.id && P)) e.visibility = "visible";
                else if ("mouseover" == b && -1 != a.id.indexOf("buttonSliderFilter") && Hb) e.visibility = "visible";
                else if ("mouseover" == b && "buttonSliderImageSet" == a.id && A) e.visibility = "visible";
                else if ("mouseover" == b || "mouseup" == b) d.visibility = "visible";
                else if ("mousedown" == b || "mousemove" == b || "touchstart" == b || "MSPointerDown" == b) e.visibility = "visible";
                else if ("mouseout" == b || "touchend" == b || "touchcancel" == b || "MSPointerUp" == b) c.visibility = "visible";
        }
    }
    var U = this,
        Ca = !1,
        Ba = a.getViewportID().toString();
    if (Z.toolbarInternal) {
        var y,
            ga,
            ua,
            M = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONOVERCOLOR"),
            S = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONDOWNCOLOR"),
            G = Z.Utils.getResource("UI_TOOLBARINTERNALBUTTONUPCOLOR");
        b();
    } else {
        Z.skinPath = Z.Utils.stringRemoveTrailingSlashCharacters(Z.skinPath);
        new Z.NetConnector().loadXML(Z.skinPath + "/" + Z.Utils.getResource("z200"));
        var K,
            T,
            V = [],
            Aa = [],
            H = [],
            X = parseInt(Z.Utils.getResource("z205ZOOM"), 10),
            P = !1,
            R = null,
            na = null,
            ja = null,
            Da = null,
            Ga,
            Ta,
            Ua,
            eb,
            rb;
        if (Z.imageSet)
            var Ka = parseInt(Z.Utils.getResource("z205IMAGESET"), 10),
                A = !1,
                Va = null,
                p = null,
                ia;
        if (Z.imageFilters)
            var ub = parseInt(Z.Utils.getResource("z205FILTER"), 10),
                Hb = !1,
                fa = null;
    }
    this.getInitialized = function () {
        return Ca;
    };
    this.getSkinArray = function () {
        return V;
    };
    this.getSkinSizes = function () {
        return H;
    };
    this.show = function (a) {
        g(a);
    };
    this.setVisibility = function (a) {
        k(a);
    };
    this.minimize = function (a) {
        q(a);
    };
    this.showProgress = function () {
        var a = document.getElementById("progressTextBox");
        a && (a = a.style) && (a.display = "inline-block");
    };
    this.hideProgress = function () {
        var a = document.getElementById("progressTextBox");
        a && (a = a.style) && (a.display = "none");
    };
    this.updateProgress = function (a, b) {
        if (Z.progressVisible) {
            ja && window.clearInterval(ja);
            var c,
                e = document.getElementById("progressTextBoxCenteredDiv");
            e &&
                (e = e.firstChild) &&
                (0 == a || 0 == b
                    ? ((e.nodeValue = "llllllllll"), (ja = window.setInterval(d, parseInt(Z.Utils.getResource("z182")), 10)))
                    : ((c = Math.round(100 - (b / a) * 100)), (c = Math.round(c / 10)), (e.nodeValue = Z.Utils.stringMultiply("l", c))));
        }
    };
    this.setViewport = function (b) {
        a = b;
        Ba = a.getViewportID().toString();
    };
    this.parseSkinXML = function (b) {
        Z.skinMode = b.getElementsByTagName("SETUP")[0].attributes.getNamedItem("SKINMODE").nodeValue;
        var d, p;
        1 == Z.skinMode || (0 == Z.skinMode && !Z.mobileDevice)
            ? ((d = b.getElementsByTagName("SETUP")[0].attributes.getNamedItem("FOLDERSTANDARD").nodeValue), (p = "SIZESSTANDARD"))
            : ((d = b.getElementsByTagName("SETUP")[0].attributes.getNamedItem("FOLDERLARGE").nodeValue), (p = "SIZESLARGE"));
        var k = b.getElementsByTagName("SETUP")[0].attributes.getNamedItem("PROGRESSCOLOR");
        "undefined" !== typeof k && null !== k && (Da = b.getElementsByTagName("SETUP")[0].attributes.getNamedItem("PROGRESSCOLOR").nodeValue);
        k = [];
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("TOOLBARW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("TOOLBARH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("LOGOW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("LOGOH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("DIVIDERW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("DIVIDERH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("BUTTONW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("BUTTONH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("BUTTONSPAN").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("SLIDERBUTTONW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("SLIDERBUTTONH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("SLIDERTRACKW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("SLIDERTRACKH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("SLIDERSPAN").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("PROGRESSW").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("PROGRESSH").nodeValue);
        k[k.length] = parseFloat(b.getElementsByTagName(p)[0].attributes.getNamedItem("PROGRESSFONTSIZE").nodeValue);
        var A, v, w;
        p =
            "edit" == Z.trackingEditMode
                ? 176
                : Z.tracking
                ? 164
                : "edit" == Z.editMode || "edit" == Z.trackingEditMode
                ? 161
                : "markup" == Z.editMode
                ? 152
                : Z.imageFilters
                ? 100
                : Z.screensaver || Z.preloadVisible || Z.tourPath || Z.slidePath || Z.imageSetPath
                ? 77
                : Z.rotationVisible
                ? 58
                : Z.measureVisible
                ? 51
                : 0 < Z.helpVisible
                ? 45
                : Z.fullScreenVisible || Z.fullPageVisible
                ? 45
                : Z.resetVisible
                ? 35
                : Z.panButtonsVisible
                ? 32
                : Z.sliderZoomVisible
                ? 19
                : Z.minimizeVisible
                ? 14
                : Z.logoVisible
                ? 8
                : 6;
        A = b.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN0");
        null !== A && (v = A.nodeValue);
        A = b.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN" + p.toString());
        null !== A && (w = A.nodeValue);
        if ("undefined" !== typeof v && Z.Utils.stringValidate(v) && "undefined" !== typeof w && Z.Utils.stringValidate(w)) {
            v = !1;
            w = 0;
            for (p += 1; w < p; w++) (A = b.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN" + w).nodeValue), Z.Utils.stringValidate(A) ? (Aa[w] = d + "/" + A) : ((Aa[w] = "null"), (v = !0));
            v && Z.Utils.showMessage(Z.Utils.getResource("z279"));
            V = b = Aa;
            Z.ToolbarDisplay = Z.Utils.createContainerElement("div", "ToolbarDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "1px", "none", "0px", "transparent none", "0px", "0px", "normal");
            T = Z.ToolbarDisplay.style;
            T.textAlign = "left";
            T.zIndex = (Z.baseZIndex + 2).toString();
            d = new Z.Utils.Graphic("toolbarBackground", Z.skinPath, b[0], "1px", "1px", "0px", "0px");
            parseFloat(Z.Utils.getResource("z82"));
            Z.Utils.getResource("z83NOALPHA");
            Z.ToolbarDisplay.appendChild(d.elmt);
            H = k;
            Z.logoVisible &&
                (Z.Utils.stringValidate(Z.logoCustomPath)
                    ? ((k = Z.Utils.cacheProofPath(Z.logoCustomPath)), (k = new Z.Utils.Graphic("toolbarLogo", k, null, "1px", "1px", "1px", "1px")))
                    : (k = new Z.Utils.Graphic("toolbarLogo", Z.skinPath, b[7], "1px", "1px", "1px", "1px")),
                Z.Utils.stringValidate(Z.logoLinkURL)
                    ? ((d = document.createElement("a")),
                      d.setAttribute("href", Z.logoLinkURL),
                      d.setAttribute("target", Z.Utils.getResource("z427TARGET")),
                      d.setAttribute("title", Z.Utils.getResource("z360")),
                      d.setAttribute("outline", "none"),
                      d.appendChild(k.elmt),
                      Z.ToolbarDisplay.appendChild(d))
                    : (k.elmt.setAttribute("title", Z.Utils.getResource("z427DISPLAY")), Z.ToolbarDisplay.appendChild(k.elmt)),
                0 == Z.toolbarVisible || 1 == Z.toolbarVisible) &&
                ((k = new Z.Utils.Graphic("logoDivider", Z.skinPath, b[8], "1px", "1px", "1px", "1px")), Z.ToolbarDisplay.appendChild(k.elmt));
            k = Z.Utils.createContainerElement("div", "buttonContainer", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", "default");
            Z.ToolbarDisplay.appendChild(k);
            Z.Utils.addEventListener(k, "mousedown", Z.Utils.preventDefault);
            Z.Utils.addEventListener(k, "mouseover", U.backgroundEventsHandler);
            Z.Utils.addEventListener(k, "touchstart", Z.Utils.preventDefault);
            d = new Z.Utils.Graphic("buttonBackground", Z.skinPath, b[0], "1px", "1px", "0px", "0px");
            k.appendChild(d.elmt);
            Z.Utils.setOpacity(d.elmt, "0", "#FBFAFA");
            ((0 != Z.toolbarVisible && 1 != Z.toolbarVisible) || Z.mobileDevice) &&
                Z.minimizeVisible &&
                ((d = new Z.Utils.Button("buttonMinimize", null, Z.skinPath, b[9], b[10], b[11], "1px", "1px", "1px", "1px", "mouseover", u, "z363")),
                Z.ToolbarDisplay.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonExpand", null, Z.skinPath, b[12], b[13], b[14], "1px", "1px", "1px", "1px", "mouseover", u, "z341")),
                Z.ToolbarDisplay.appendChild(d.elmt));
            Z.zoomButtonsVisible && ((d = new Z.Utils.Button("buttonZoomOut", null, Z.skinPath, b[1], b[2], b[3], "1px", "1px", "1px", "1px", "mouseover", u, "z400")), k.appendChild(d.elmt));
            Z.sliderZoomVisible &&
                ((d = new Z.Utils.Graphic("trackSliderZoom", Z.skinPath, b[15], "1px", "1px", "0px", "0px", "z385ZOOM")),
                k.appendChild(d.elmt),
                Z.Utils.addEventListener(d.elmt, "mousedown", u),
                Z.Utils.addEventListener(d.elmt, "touchstart", u),
                Z.Utils.addEventListener(d.elmt, "mouseover", u),
                (d = new Z.Utils.Button("buttonSliderZoom", null, Z.skinPath, b[17], b[18], b[19], "1px", "1px", "1px", "1px", "mouseover", u, "z385ZOOM")),
                k.appendChild(d.elmt));
            Z.zoomButtonsVisible && ((d = new Z.Utils.Button("buttonZoomIn", null, Z.skinPath, b[4], b[5], b[6], "1px", "1px", "1px", "1px", "mouseover", u, "z399")), k.appendChild(d.elmt));
            if (Z.panButtonsVisible) {
                if (Z.zoomButtonsVisible || Z.sliderZoomVisible) (d = new Z.Utils.Graphic("panDivider", Z.skinPath, b[20], "1px", "1px", "1px", "1px")), k.appendChild(d.elmt);
                d = new Z.Utils.Button("buttonPanLeft", null, Z.skinPath, b[21], b[22], b[23], "1px", "1px", "1px", "1px", "mouseover", u, "z370");
                k.appendChild(d.elmt);
                d = new Z.Utils.Button("buttonPanUp", null, Z.skinPath, b[24], b[25], b[26], "1px", "1px", "1px", "1px", "mouseover", u, "z372");
                k.appendChild(d.elmt);
                d = new Z.Utils.Button("buttonPanDown", null, Z.skinPath, b[27], b[28], b[29], "1px", "1px", "1px", "1px", "mouseover", u, "z369");
                k.appendChild(d.elmt);
                d = new Z.Utils.Button("buttonPanRight", null, Z.skinPath, b[30], b[31], b[32], "1px", "1px", "1px", "1px", "mouseover", u, "z371");
                k.appendChild(d.elmt);
            }
            Z.resetVisible && ((d = new Z.Utils.Button("buttonReset", null, Z.skinPath, b[33], b[34], b[35], "1px", "1px", "1px", "1px", "mouseover", u, "z378")), k.appendChild(d.elmt));
            if (Z.fullScreenVisible || Z.fullPageVisible)
                null === Z.editMode && ((d = new Z.Utils.Graphic("fullViewDivider", Z.skinPath, b[36], "1px", "1px", "1px", "1px")), k.appendChild(d.elmt)),
                    (d = new Z.Utils.Button("buttonFullViewExit", null, Z.skinPath, b[40], b[41], b[42], "1px", "1px", "1px", "1px", "mouseover", u, "z391EXIT")),
                    k.appendChild(d.elmt),
                    (d = new Z.Utils.Button("buttonFullView", null, Z.skinPath, b[37], b[38], b[39], "1px", "1px", "1px", "1px", "mouseover", u, "z391")),
                    k.appendChild(d.elmt);
            Z.measureVisible &&
                null === Z.editMode &&
                (Z.fullScreenVisible || Z.fullPageVisible || ((d = new Z.Utils.Graphic("measureDivider", Z.skinPath, b[36], "1px", "1px", "1px", "1px")), k.appendChild(d.elmt)),
                null === Z.editMode && ((d = new Z.Utils.Button("buttonMeasureExit", null, Z.skinPath, b[49], b[50], b[51], "1px", "1px", "1px", "1px", "mouseover", u, "z392EXIT")), k.appendChild(d.elmt)),
                (d = new Z.Utils.Button("buttonMeasure", null, Z.skinPath, b[46], b[47], b[48], "1px", "1px", "1px", "1px", "mouseover", u, "z392")),
                k.appendChild(d.elmt));
            Z.rotationVisible &&
                ((d = new Z.Utils.Graphic("rotateDivider", Z.skinPath, b[52], "1px", "1px", "1px", "1px")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonRotateCounterwise", null, Z.skinPath, b[53], b[54], b[55], "1px", "1px", "1px", "1px", "mouseover", u, "z381")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonRotateClockwise", null, Z.skinPath, b[56], b[57], b[58], "1px", "1px", "1px", "1px", "mouseover", u, "z380")),
                k.appendChild(d.elmt));
            Z.tour &&
                ((d = new Z.Utils.Graphic("tourDivider", Z.skinPath, b[59], "1px", "1px", "1px", "1px")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonTourPrior", null, Z.skinPath, b[60], b[61], b[62], "1px", "1px", "1px", "1px", "mouseover", u, "z394")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonTourNext", null, Z.skinPath, b[63], b[64], b[65], "1px", "1px", "1px", "1px", "mouseover", u, "z393")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonTourStart", null, Z.skinPath, b[66], b[67], b[68], "1px", "1px", "1px", "1px", "mouseover", u, "z395")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonTourStop", null, Z.skinPath, b[69], b[70], b[71], "1px", "1px", "1px", "1px", "mouseover", u, "z396")),
                k.appendChild(d.elmt));
            Z.slideshow &&
                ((d = new Z.Utils.Graphic("slideshowDivider", Z.skinPath, b[59], "1px", "1px", "1px", "1px")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonSlideshowPrior", null, Z.skinPath, b[60], b[61], b[62], "1px", "1px", "1px", "1px", "mouseover", u, "z384")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonSlideshowNext", null, Z.skinPath, b[63], b[64], b[65], "1px", "1px", "1px", "1px", "mouseover", u, "z383")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonSlideshowStart", null, Z.skinPath, b[66], b[67], b[68], "1px", "1px", "1px", "1px", "mouseover", u, "z386")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonSlideshowStop", null, Z.skinPath, b[69], b[70], b[71], "1px", "1px", "1px", "1px", "mouseover", u, "z387")),
                k.appendChild(d.elmt));
            if (Z.tour || Z.slideshow)
                (d = new Z.Utils.Button("buttonAudioOn", null, Z.skinPath, b[72], b[73], b[74], "1px", "1px", "1px", "1px", "mouseover", u, "z321")),
                    k.appendChild(d.elmt),
                    (d = new Z.Utils.Button("buttonAudioMuted", null, Z.skinPath, b[75], b[76], b[77], "1px", "1px", "1px", "1px", "mouseover", u, "z322")),
                    k.appendChild(d.elmt);
            Z.imageSet &&
                !Z.overlays &&
                (1 < k.childNodes.length && ((d = new Z.Utils.Graphic("imageSetDivider", Z.skinPath, b[59], "1px", "1px", "1px", "1px")), k.appendChild(d.elmt)),
                (d = new Z.Utils.Button("buttonImageSetPrior", null, Z.skinPath, b[60], b[61], b[62], "1px", "1px", "1px", "1px", "mouseover", u, "TIP_IMAGESETPRIOR")),
                k.appendChild(d.elmt),
                Z.sliderImageSetVisible &&
                    ((d = new Z.Utils.Graphic("trackSliderImageSet", Z.skinPath, b[15], "1px", "1px", "0px", "0px", "z385IMAGESET")),
                    k.appendChild(d.elmt),
                    Z.Utils.addEventListener(d.elmt, "mousedown", u),
                    Z.Utils.addEventListener(d.elmt, "touchstart", u),
                    Z.Utils.addEventListener(d.elmt, "mouseover", u),
                    (d = new Z.Utils.Button("buttonSliderImageSet", null, Z.skinPath, b[17], b[18], b[19], "1px", "1px", "1px", "1px", "mouseover", u, "z385IMAGESET")),
                    k.appendChild(d.elmt)),
                (d = new Z.Utils.Button("buttonImageSetNext", null, Z.skinPath, b[63], b[64], b[65], "1px", "1px", "1px", "1px", "mouseover", u, "TIP_IMAGESETNEXT")),
                k.appendChild(d.elmt));
            Z.preloadVisible &&
                ((d = new Z.Utils.Graphic("preloadDivider", Z.skinPath, b[59], "1px", "1px", "1px", "1px")),
                k.appendChild(d.elmt),
                (d = new Z.Utils.Button("buttonPreload", null, Z.skinPath, b[69], b[70], b[71], "1px", "1px", "1px", "1px", "mouseover", u, "TIP_PRELOAD")),
                k.appendChild(d.elmt));
            Z.comparison &&
                ((d = Z.Utils.createContainerElement("div", "labelSyncTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0)),
                (p = document.createTextNode(Z.Utils.getResource("UI_TOOLBARLABELSYNC"))),
                d.appendChild(p),
                (p = new Z.Utils.Checkbox("checkboxSyncComparison", "test", "1px", "1px", "1px", "1px", "click", u, "TIP_SYNC")),
                k.appendChild(d),
                k.appendChild(p));
            if (1 == Z.helpVisible || 3 == Z.helpVisible) (b = new Z.Utils.Button("buttonHelp", null, Z.skinPath, b[43], b[44], b[45], "1px", "1px", "1px", "1px", "mouseover", u, "z342")), k.appendChild(b.elmt);
            Z.progressVisible &&
                ((b = Z.Utils.createContainerElement("div", "progressTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "1px", "1px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0)),
                (d = H[16]),
                k.appendChild(b),
                (k = document.createTextNode(Z.Utils.getResource("z183"))),
                b.appendChild(Z.Utils.createCenteredElement(k, "progressTextBoxCenteredDiv")),
                null === Da && (Da = Z.Utils.getResource("z183COLOR")),
                Z.Utils.setTextNodeStyle(k, Da, "verdana", d + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none"),
                Z.Utils.disableTextInteraction(k));
            Z.ViewerDisplay.appendChild(Z.ToolbarDisplay);
            Z.toolbarW = H[0];
            Z.toolbarCurrentW = -1 == Z.toolbarW ? Z.viewerW : Z.toolbarW;
            Z.toolbarH = K = H[1];
            U.setSizeAndPosition(Z.toolbarCurrentW, Z.toolbarH, 0, 1 == Z.toolbarPosition ? Z.viewerH - Z.toolbarH : 0);
            a &&
                a.getStatus("initializedViewport") &&
                (1 == Z.toolbarVisible && (a.setSizeAndPosition(Z.viewerW, Z.viewerH - Z.toolbarH, 0, 0), a.validateXYZDefaults(!0)), (b = a.getZoom()), t(b), a.setDrawingColor("buttonColor0" + Ba, !0));
            g(1 == Z.toolbarVisible || 2 == Z.toolbarVisible || 4 == Z.toolbarVisible || 7 == Z.toolbarVisible);
            Z.Utils.addEventListener(Z.ToolbarDisplay, "mouseover", Z.Utils.stopPropagation);
            e(!0);
            c();
        } else Z.Utils.showMessage(Z.Utils.getResource("z278"));
    };
    this.setSizeAndPosition = function (b, c, d, e) {
        "undefined" === typeof b || null === b ? (b = 0 < Z.toolbarVisible ? Z.toolbarCurrentW : 0) : (Z.toolbarCurrentW = b);
        if ("undefined" === typeof c || null === c) c = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? K : 0;
        if ("undefined" === typeof d || null === d) d = 0;
        if ("undefined" === typeof e || null === e) e = 1 == Z.toolbarPosition ? Z.viewerH - K : 0;
        T = Z.ToolbarDisplay.style;
        T.width = b + "px";
        T.height = c + "px";
        T.left = d + "px";
        T.top = e + "px";
        var g = b,
            p = c,
            k = H[2],
            A = H[3],
            v = H[4],
            u = H[5],
            w = H[6],
            q = H[7],
            t = H[8],
            wa = H[9],
            S = H[10],
            Va = H[11],
            N = H[12],
            y = H[13],
            ub = H[14],
            U = H[15],
            B = 0,
            Hb = (p - A) / 2 + 1,
            J = (p - u) / 2,
            G = (p - q) / 2,
            F = 1.3 * G,
            M = G + 4,
            P = G + 2,
            Q = 1 == Z.logoVisible ? 0 : t / 2,
            R = 1 == Z.logoVisible ? 0 : t / 2,
            V = t - (w - v),
            fa = 0,
            O = 0;
        Z.zoomButtonsVisible && (fa += 2);
        Z.panButtonsVisible && ((fa += 4), (O += 1));
        Z.resetVisible && (fa += 1);
        if (Z.fullScreenVisible || Z.fullPageVisible) (fa += 1), (O += 1);
        Z.helpVisible && ((fa += 1), Z.fullScreenVisible || Z.fullPageVisible || (O += 1));
        Z.measureVisible && (Z.fullScreenVisible || Z.fullPageVisible || (O += 1), (fa += 1));
        Z.rotationVisible && ((fa += 2), (O += 1));
        if (Z.tour || Z.slideshow) (fa += 3), (O += 1), Z.audioContent && (fa += 1);
        Z.imageFilters && ((fa += 1), (O += 1));
        Z.preloadVisible && ((fa += 1), (O += 1));
        Z.comparison && Z.syncVisible && ((fa += 1), (O += 1));
        if (Z.imageSet && Z.sliderImageSetVisible) {
            var ka = y,
                X = Va,
                W = N;
            ia = !1;
            fa += 2;
        }
        Z.progressVisible || (ub = 0);
        var aa = fa * t + O * V;
        Z.sliderZoomVisible && (aa += y);
        Z.imageSet && Z.sliderImageSetVisible && (aa += ka);
        Ga = Ta = Ua = eb = overrideZoom = !1;
        var ga = (1 == Z.logoVisible ? k + 2 : 0) + (0 != Z.toolbarVisible && 1 != Z.toolbarVisible && 0 != Z.minimizeVisible ? t : 0),
            ea = 1 == Z.panButtonsVisible ? 4 * t + V : 0,
            Aa = 1 == Z.zoomButtonsVisible ? 2 * t : 0,
            ua = 1 == Z.resetVisible ? t : 0,
            ja = ga + 20 + aa + 20 + ub;
        ja > g &&
            ((Ga = !0),
            ja - y > g &&
                ((Ta = !0),
                ja - y - ub > g && ((Ua = !0), ja - y - ub - ga > g && ((rb = !0), ja - y - ub - ga - ua > g && ((eb = !0), (aa -= ea), ja - y - ub - ga - ua - ea > g && ((overrideZoom = !0), (aa -= Aa))), (aa -= ua)), (ga = 0)),
                (ub = 0)),
            (aa -= y));
        var Ca = (g - aa) / 2 - 20 + 3,
            na = document.getElementById("toolbarBackground");
        na && ((na.style.width = g + "px"), (na.style.height = p + "px"), (na.firstChild.style.width = g + "px"), (na.firstChild.style.height = p + "px"));
        var Ba = document.getElementById("buttonContainer");
        Ba && ((Ba.style.width = aa + 40 + "px"), (Ba.style.height = p + "px"), (Ba.style.left = Ca + "px"));
        var Da = document.getElementById("buttonBackground");
        Da && ((Da.style.width = g + "px"), Z.Utils.graphicSize(Da, parseFloat(Ba.style.width), parseFloat(Ba.style.height)), (Da.style.left = "0px"));
        var Ka = document.getElementById("toolbarLogo");
        if (Ka) {
            var hd = Ka.style;
            if (hd)
                if (Ua) hd.display = "none";
                else {
                    hd.display = "inline-block";
                    Z.Utils.graphicSize(Ka, k, A);
                    hd.left = B + "px";
                    hd.top = Hb + "px";
                    var B = B + (k + 2),
                        pe = document.getElementById("logoDivider");
                    if (pe) {
                        Z.Utils.graphicSize(pe, v, u);
                        var cf = pe.style;
                        cf.left = B + "px";
                        cf.top = J + "px";
                    }
                }
        }
        if (0 != Z.toolbarVisible && 1 != Z.toolbarVisible) {
            var jd = document.getElementById("buttonMinimize"),
                Id = document.getElementById("buttonExpand");
            if (jd && Id) {
                var Zb = jd.style,
                    Rc = Id.style;
                Zb &&
                    Rc &&
                    (Ua
                        ? ((Zb.display = "none"), (Rc.display = "none"))
                        : ((Zb.display = "inline-block"),
                          (Rc.display = "inline-block"),
                          Z.Utils.buttonSize(jd, w, q),
                          Z.Utils.buttonSize(Id, w, q),
                          (Zb.left = B + Q + "px"),
                          (Zb.top = F + "px"),
                          (Rc.left = B + R + "px"),
                          (Rc.top = F + "px")));
            }
        }
        B = 20;
        if (!overrideZoom) {
            var Vc = document.getElementById("buttonZoomOut");
            if (Vc) {
                Z.Utils.buttonSize(Vc, w, q);
                var Jd = Vc.style;
                Jd.left = B + "px";
                Jd.top = G + "px";
                B += t;
            }
            trsZ = document.getElementById("trackSliderZoom");
            btsZ = document.getElementById("buttonSliderZoom");
            trsZ &&
                btsZ &&
                ((trszS = trsZ.style),
                (btszS = btsZ.style),
                trszS &&
                    btszS &&
                    (Ga
                        ? ((trszS.display = "none"), (btszS.display = "none"))
                        : ((trszS.display = "inline-block"),
                          (btszS.display = "inline-block"),
                          Z.Utils.graphicSize(trsZ, Va, N),
                          (trszS.left = B - 2 + "px"),
                          (trszS.top = M + "px"),
                          Z.Utils.buttonSize(btsZ, wa, S),
                          (btszS.left = parseFloat(trszS.left) + "px"),
                          (btszS.top = P + "px"),
                          (B += y))));
            var Ld = document.getElementById("buttonZoomIn");
            if (Ld) {
                Z.Utils.buttonSize(Ld, w, q);
                var se = Ld.style;
                se.left = B + "px";
                se.top = G + "px";
                B += t + 1;
            }
        }
        if (!eb) {
            var ud = document.getElementById("panDivider");
            if (ud) {
                Z.Utils.graphicSize(ud, v, u);
                var Kd = ud.style;
                Kd.left = B + "px";
                Kd.top = J + "px";
                B += V;
            }
            var te = document.getElementById("buttonPanLeft");
            if (te) {
                Z.Utils.buttonSize(te, w, q);
                var ue = te.style;
                ue.left = B + "px";
                ue.top = G + "px";
                B += t;
            }
            var Ea = document.getElementById("buttonPanUp");
            if (Ea) {
                Z.Utils.buttonSize(Ea, w, q);
                var df = Ea.style;
                df.left = B + "px";
                df.top = G + "px";
                B += t;
            }
            var Tc = document.getElementById("buttonPanDown");
            if (Tc) {
                Z.Utils.buttonSize(Tc, w, q);
                var ef = Tc.style;
                ef.left = B + "px";
                ef.top = G + "px";
                B += t;
            }
            var Ae = document.getElementById("buttonPanRight");
            if (Ae) {
                Z.Utils.buttonSize(Ae, w, q);
                var ff = Ae.style;
                ff.left = B + "px";
                ff.top = G + "px";
                B += t;
            }
        }
        if (!rb) {
            var kd = document.getElementById("buttonReset");
            if (kd) {
                Z.Utils.buttonSize(kd, w, q);
                var Ib = kd.style;
                Ib.left = B + "px";
                Ib.top = G + "px";
                B += t + 1;
            }
        }
        var ac = document.getElementById("fullViewDivider");
        if (ac) {
            Z.Utils.graphicSize(ac, v, u);
            var mb = ac.style;
            mb.left = B + "px";
            mb.top = J + "px";
            B += V;
        }
        var Sa = document.getElementById("buttonFullViewExit");
        if (Sa) {
            Z.Utils.buttonSize(Sa, w, q);
            var sd = Sa.style;
            sd.left = B + "px";
            sd.top = G + "px";
            sd.display = Z.fullView ? "inline-block" : "none";
        }
        var td = document.getElementById("buttonFullView");
        if (td) {
            Z.Utils.buttonSize(td, w, q);
            var yd = td.style;
            yd.left = B + "px";
            yd.top = G + "px";
            B += t + 1;
            yd.display = Z.fullView ? "none" : "inline-block";
        }
        var Ma = document.getElementById("measureDivider");
        if (Ma) {
            Z.Utils.graphicSize(Ma, v, u);
            var Wb = Ma.style;
            Wb.left = B + "px";
            Wb.top = J + "px";
            B += V;
        }
        if (null === Z.editMode) {
            var h = document.getElementById("buttonMeasureExit");
            if (h) {
                Z.Utils.buttonSize(h, w, q);
                var uc = h.style;
                uc.left = B + "px";
                uc.top = G + "px";
                uc.display = "measure" == Z.labelMode ? "inline-block" : "none";
            }
        }
        if ((jd = document.getElementById("buttonMeasure"))) Z.Utils.buttonSize(jd, w, q), (Zb = jd.style), (Zb.left = B + "px"), (Zb.top = G + "px"), (B += t + 1), (Zb.display = "measure" == Z.labelMode ? "none" : "inline-block");
        var ld = document.getElementById("rotateDivider");
        if (ld) {
            Z.Utils.graphicSize(ld, v, u);
            var zd = ld.style;
            zd.left = B + "px";
            zd.top = J + "px";
            var B = B + V,
                vc = document.getElementById("buttonRotateCounterwise");
            if (vc) {
                Z.Utils.buttonSize(vc, w, q);
                var kb = vc.style;
                kb.left = B + "px";
                kb.top = G + "px";
                B += t;
            }
            var Dd = document.getElementById("buttonRotateClockwise");
            if (Dd) {
                Z.Utils.buttonSize(Dd, w, q);
                var $d = Dd.style;
                $d.left = B + "px";
                $d.top = G + "px";
                B += t + 1;
            }
        }
        if (Z.tour) {
            var Ec = document.getElementById("tourDivider");
            if (Ec) {
                Z.Utils.graphicSize(Ec, v, u);
                var Xa = Ec.style;
                Xa.left = B + "px";
                Xa.top = J + "px";
                var B = B + V,
                    Ra = document.getElementById("buttonTourPrior");
                if (Ra) {
                    Z.Utils.buttonSize(Ra, w, q);
                    var Pd = Ra.style;
                    Pd.left = B + "px";
                    Pd.top = G + "px";
                    B += t + 1;
                }
                var Ge = document.getElementById("buttonTourNext");
                if (Ge) {
                    Z.Utils.buttonSize(Ge, w, q);
                    var yc = Ge.style;
                    yc.left = B + "px";
                    yc.top = G + "px";
                    B += t + 1;
                }
                var Qd = document.getElementById("buttonTourStop");
                if (Qd) {
                    Z.Utils.buttonSize(Qd, w, q);
                    var xe = Qd.style;
                    xe.left = B + "px";
                    xe.top = G + "px";
                    xe.display = Z.tourPlaying ? "inline-block" : "none";
                }
                var ye = document.getElementById("buttonTourStart");
                if (ye) {
                    Z.Utils.buttonSize(ye, w, q);
                    var Od = ye.style;
                    Od.left = B + "px";
                    Od.top = G + "px";
                    B += t + 1;
                    Od.display = Z.tourPlaying ? "none" : "inline-block";
                }
            }
        } else if (Z.slideshow) {
            var qd = document.getElementById("slideshowDivider");
            if (qd) {
                Z.Utils.graphicSize(qd, v, u);
                var Xc = qd.style;
                Xc.left = B + "px";
                Xc.top = J + "px";
                var B = B + V,
                    ha = document.getElementById("buttonSlideshowPrior");
                if (ha) {
                    Z.Utils.buttonSize(ha, w, q);
                    var Gb = ha.style;
                    Gb.left = B + "px";
                    Gb.top = G + "px";
                    B += t + 1;
                }
                var La = document.getElementById("buttonSlideshowNext");
                if (La) {
                    Z.Utils.buttonSize(La, w, q);
                    var nd = La.style;
                    nd.left = B + "px";
                    nd.top = G + "px";
                    B += t + 1;
                }
                var Fc = document.getElementById("buttonSlideshowStop");
                if (Fc) {
                    Z.Utils.buttonSize(Fc, w, q);
                    var Gc = Fc.style;
                    Gc.left = B + "px";
                    Gc.top = G + "px";
                    Gc.display = Z.slideshowPlaying ? "inline-block" : "none";
                }
                var $a = document.getElementById("buttonSlideshowStart");
                if ($a) {
                    Z.Utils.buttonSize($a, w, q);
                    var sa = $a.style;
                    sa.left = B + "px";
                    sa.top = G + "px";
                    B += t + 1;
                    sa.display = Z.slideshowPlaying ? "none" : "inline-block";
                }
            }
        } else if (null !== Z.imageSetPath && !Z.comparison) {
            var I = document.getElementById("imageSetDivider");
            if (I) {
                Z.Utils.graphicSize(I, v, u);
                var Ad = I.style;
                Ad.left = B + "px";
                Ad.top = J + "px";
                B += V;
            }
            var ta = document.getElementById("buttonImageSetPrior");
            if (ta) {
                Z.Utils.buttonSize(ta, w, q);
                var ca = ta.style;
                ca.left = B + "px";
                ca.top = G + "px";
                B += t + 1;
            }
            trsiS = document.getElementById("trackSliderImageSet");
            btsiS = document.getElementById("buttonSliderImageSet");
            trsiS &&
                btsiS &&
                ((trsisS = trsiS.style),
                (btsisS = btsiS.style),
                trsisS &&
                    btsisS &&
                    (ia
                        ? ((trsisS.display = "none"), (btsisS.display = "none"))
                        : ((trsisS.display = "inline-block"),
                          (btsisS.display = "inline-block"),
                          Z.Utils.graphicSize(trsiS, X, W),
                          (trsisS.left = B - 2 + "px"),
                          (trsisS.top = M + "px"),
                          Z.Utils.buttonSize(btsiS, wa, S),
                          (btsisS.left = parseFloat(trsisS.left) + "px"),
                          (btsisS.top = P + "px"),
                          (B += ka))));
            var jc = document.getElementById("buttonImageSetNext");
            if (jc) {
                Z.Utils.buttonSize(jc, w, q);
                var Yc = jc.style;
                Yc.left = B + "px";
                Yc.top = G + "px";
                B += t + 1;
            }
        }
        if (Z.tour || Z.slideshow) {
            var la = document.getElementById("buttonAudioMuted");
            if (la) {
                Z.Utils.buttonSize(la, w, q);
                var qa = la.style;
                qa.left = B + "px";
                qa.top = G + "px";
                qa.display = "none";
            }
            var Qa = document.getElementById("buttonAudioOn");
            if (Qa) {
                Z.Utils.buttonSize(Qa, w, q);
                var od = Qa.style;
                od.left = B + "px";
                od.top = G + "px";
                B += t + 1;
                od.display = "none";
            }
            a.initializeAudioMuteButtons();
        }
        if (Z.preloadVisible) {
            var ob = document.getElementById("preloadDivider"),
                ic = document.getElementById("buttonPreload");
            if (ob && ic) {
                Z.Utils.graphicSize(ob, v, u);
                var qc = ob.style;
                qc.top = J + "px";
                Z.imageSet || ((qc.left = B + "px"), (B += V));
                Z.Utils.buttonSize(ic, w, q);
                var Cd = ic.style;
                Cd.left = B + "px";
                Cd.top = G + "px";
                B += t;
                Z.imageSet && ((qc.left = B + "px"), (B += V));
                B += 8;
            }
        }
        if (1 == Z.helpVisible || 3 == Z.helpVisible) {
            var Ja = document.getElementById("buttonHelp");
            if (Ja) {
                Z.Utils.buttonSize(Ja, w, q);
                var pc = Ja.style;
                pc.left = B + "px";
                pc.top = G + "px";
                B += t + 8;
            }
        }
        if (Z.comparison && Z.syncVisible) {
            var Hc = parseInt(Z.Utils.getResource("DEFAULT_TOOLBARLABELFONTSIZE"), 10),
                pa = document.getElementById("labelSyncTextBox"),
                pb = document.getElementById("containerFor-checkboxSyncComparison"),
                Zc = document.getElementById("checkboxSyncComparison");
            if (pa && pb && Zc) {
                var Ic = pa.style;
                Ic.width = "28px";
                Ic.height = "20px";
                Ic.left = B + "px";
                Ic.top = G + 3 + "px";
                Ic.visibility = "visible";
                Z.Utils.setTextNodeStyle(pa, "black", "verdana", Hc + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
                var $c = pb.style;
                $c.width = 1.5 * w + "px";
                $c.height = 1.5 * q + "px";
                $c.left = B + 28 + 3 + "px";
                $c.top = G - 3 + "px";
                Zc.width = w;
                Zc.height = q;
                Zc.checked = Z.initialSync;
            }
        }
        var Oe = document.getElementById("progressTextBox");
        if (Oe) {
            var bc = Oe.style;
            bc &&
                (Ta
                    ? (bc.display = "none")
                    : ((bc.display = "inline-block"), (bc.width = ub + "px"), (bc.height = U + "px"), (bc.left = g - parseFloat(Ba.style.left) - parseFloat(bc.width) + "px"), (bc.top = (p - parseFloat(bc.height)) / 2 + "px")));
        }
    };
    this.syncSliderToViewportZoom = function (a) {
        t(a);
    };
    this.syncSliderToViewportImageSet = function (a) {
        if ("undefined" !== typeof trsisS && "undefined" !== typeof btsisS) {
            a = Z.viewportCurrentID / (Z.imageSetLength - 1);
            var b = parseFloat(trsisS.left),
                c = parseFloat(trsisS.left) + parseFloat(trsisS.width) - parseFloat(btsisS.width) - b;
            btsisS.left = a * c + b + "px";
        }
    };
    this.z457 = function (a) {
        u(a);
    };
    this.backgroundEventsHandler = function (a) {
        a = Z.Utils.event(a);
        if ((a = Z.Utils.relatedTarget(a))) {
            var b = a.parentNode;
            b && (b = b.id) && (P || Hb || A || -1 == b.indexOf("button") || -1 != b.indexOf("buttonContainer") || Z.Utils.setButtonDefaults(a.parentNode));
        }
    };
    this.positionButtonBorder = function (a) {
        var b = Z.annotationFileShared ? "0" : Ba;
        if ("buttonColor" == a.substr(0, 11)) var c = document.getElementById("buttonBorderSm" + b);
        else if (
            a == "buttonViewMode" + b ||
            a == "buttonEditModeFreehand" + b ||
            a == "buttonEditModeText" + b ||
            a == "buttonEditModeIcon" + b ||
            a == "buttonEditModeRectangle" + b ||
            a == "buttonEditModePolygon" + b ||
            a == "buttonEditModeMeasure" + b
        )
            c = document.getElementById("buttonBorderLg" + b);
        var d = document.getElementById(a);
        c && d && (a == "buttonClearAll" + b && (d = document.getElementById("buttonViewMode" + tbViewportID)), (a = c.style), (d = d.style), (a.left = parseFloat(d.left) - 2 + "px"), (a.top = parseFloat(d.top) - 2 + "px"));
    };
};
Z.ZoomifyNavigator = function (a) {
    function b(c, d) {
        var e = "undefined" !== typeof d && null !== d ? !1 : !0,
            g = e ? a : d;
        if ("unconverted" != Z.tileSource)
            "ZoomifyImageFile" == Z.tileSource
                ? (Ka = g.formatTilePath(0, 0, 0))
                : "ZoomifyImageFolder" == Z.tileSource
                ? (Ka = Z.Utils.cacheProofPath(g.getImagePath() + "/TileGroup0/0-0-0." + Z.tileType))
                : "ZoomifyPFFFile" == Z.tileSource
                ? (Ka = g.formatTilePath(0, 0, 0))
                : "IIIFImageServer" == Z.tileSource
                ? (Ka = g.formatTilePath(0, 0, 0))
                : "ImageServer" == Z.tileSource && (Ka = g.formatTilePath(0, 0, 0)),
                (R = null),
                (R = new Image()),
                (R.onload = c),
                (R.onerror = u),
                "offsetLoading" != Ka
                    ? (e || (na[na.length] = { id: d.getViewportID().toString(), image: R }), "ZoomifyImageFile" == Z.tileSource ? new Z.NetConnector().loadImage(Ka, Z.Utils.createCallback(null, c), "navigator", null) : (R.src = Ka))
                    : window.setTimeout(function () {
                          b(c);
                      }, 100);
        else {
            var k = g.getUnconvertedImage();
            "undefined" !== typeof k && null !== k
                ? ((R = g.createUnconvertedImageThumbnail(k)), e && "function" === typeof c ? c() : (na[na.length] = "undefined" !== typeof d ? { id: d.getViewportID().toString(), image: R } : { id: null, image: null }))
                : window.setTimeout(function () {
                      b(c, d);
                  }, 100);
        }
    }
    function c(a) {
        for (var c = 0, d = Z.imageSetLength; c < d; c++) b(null, Z["Viewport" + c.toString()]);
        a();
    }
    function d(a, b) {
        "ZoomifyImageFile" == Z.tileSource && (R = b);
        var c = Z.Utils.createContainerElement("div", "testImageContainer", "inline-block", "absolute", "hidden", Ga + "px", Ta + "px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
        c.appendChild(R);
        c.removeChild(R);
        c = null;
        c = R.height;
        if (0 != R.width && 0 != c) {
            M = Z.Utils.createContainerElement("div", "navigatorDisplay" + ga, "inline-block", "absolute", "hidden", Ga + "px", Ta + "px", Ua + "px", eb + "px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
            S = Z.NavigatorDisplay = M;
            G = S.style;
            Z.slideshow && Z.Utils.setOpacity(Z.NavigatorDisplay, 0);
            G.zIndex = (Z.baseZIndex + 4).toString();
            var c = parseFloat(Z.Utils.getResource("z82")),
                e = Z.Utils.getResource("z83"),
                g = Z.Utils.getResource("z83NOALPHA"),
                e = Z.Utils.createContainerElement("div", "navigatorBackground", "inline-block", "absolute", "hidden", Ga + "px", Ta + "px", "0px", "0px", "none", "0px", e, "0px", "0px", "normal", null, !0);
            Z.Utils.setOpacity(e, c, g);
            M.appendChild(e);
            K = e;
            T = K.style;
            c = Z.Utils.createContainerElement("div", "navigatorImageContainer", "inline-block", "absolute", "hidden", Ga + "px", Ta + "px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
            c.appendChild(R);
            R.alt = Z.Utils.getResource("z439");
            M.appendChild(c);
            V = c;
            Aa = V.style;
            H = R;
            c = H.width;
            g = H.height;
            //e = Z.Utils.createContainerElement("div", "navigatorRectangle", "inline-block", "absolute", "hidden", Ga + 1 + "px", Ta + 1 + "px", Ua + "px", eb + "px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
			e = Z.Utils.createContainerElement("div", "navigatorRectangle", "inline-block", "absolute", "hidden", Ga + 1 + "px", Ta + 1 + "px", 200 + "px", eb + "px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
            e.style.borderColor = Z.Utils.stringValidateColorValue(Z.navigatorRectangleColor);
            M.appendChild(e);
            X = e;
            P = X.style;
            if (Z.comparison) {
                var e = Z.Utils.getResource("DEFAULT_NAVIGATORBORDERCOLOR"),
                    k = Z.Utils.createContainerElement(
                        "div",
                        "navigatorBorder" + ga,
                        "inline-block",
                        "absolute",
                        "hidden",
                        Ga + 1 + "px",
                        Ta + 1 + "px",
                        Ua + "px",
                        eb + "px",
                        "solid",
                        "1px",
                        "transparent none",
                        "0px",
                        "0px",
                        "normal",
                        null,
                        !0
                    );
                k.style.borderColor = Z.Utils.stringValidateColorValue(e);
                M.appendChild(k);
                nBO = k;
                nboS = K.style;
            }
            Z.ViewerDisplay.appendChild(M);
            q(Ga, Ta, Ua, eb, rb, c, g);
            F(1 == Z.navigatorVisible || 2 == Z.navigatorVisible);
            Z.Utils.addEventListener(S, "mouseover", Z.Utils.stopPropagation);
            Z.Utils.addEventListener(S, "mousedown", w);
            Z.Utils.addEventListener(S, "touchstart", ka);
            Z.Utils.addEventListener(S, "touchmove", aa);
            Z.Utils.addEventListener(S, "touchend", U);
            Z.Utils.addEventListener(S, "touchcancel", Ca);
            y || ((y = !0), Z.Utils.validateCallback("navigatorInitialized"), Z.Viewer.validateViewerReady("navigatorInitialized"));
            Q();
        } else
            window.setTimeout(function () {
                d(a, b);
            }, 100);
    }
    function e() {
        if (na && 0 < na.length && null !== na[0] && 0 < na[0].image.width) {
            var a = Z.Utils.arrayIndexOfObjectValue(na, "id", "0");
            if (-1 != a) {
                a = na[a].image;
                R = a.cloneNode(!1);
                a = null;
                if ("undefined" === typeof b) var b = null;
                d(b, R);
            } else
                window.setTimeout(function () {
                    e();
                }, 100);
        } else
            window.setTimeout(function () {
                e();
            }, 100);
    }
    function g(a) {
        if (M)
            if ((Z.slideshow && Z.Utils.setOpacity(M, 0), "ZoomifyImageFile" == Z.tileSource && (R = a), V && R && 0 < R.width && 0 < R.height)) {
                a = R.width;
                var b = R.height;
                V.appendChild(R);
                H = M.childNodes[1].firstChild;
                q(Ga, Ta, Ua, eb, rb, a, b);
                a = (Z.ToolbarDisplay && "inline-block" == Z.ToolbarDisplay.style.display && !Z.ToolbarMinimized) || ("undefined" !== typeof slideList && null !== slideList && "visible" == slideList.style.visibility);
                F((1 == Z.navigatorVisible || 2 == Z.navigatorVisible) && a);
                M.style.zIndex = (Z.baseZIndex + 4).toString();
                Q();
            } else
                window.setTimeout(function () {
                    g();
                }, 100);
    }
    function k() {
        y &&
            (ua && (window.clearInterval(ua), (ua = null)),
            (S && G && K && T && V && Aa && H && X && P) || ((S = M), (G = S.style), (K = M.firstChild), (T = K.style), (V = M.childNodes[1]), (Aa = V.style), (H = M.childNodes[1].firstChild), (X = M.childNodes[2]), (P = X.style)));
    }
    function q(a, b, c, d, e, g, k) {
        e || (e = rb);
        if ("undefined" === typeof a || null === a) a = Z.navigatorW;
        if ("undefined" === typeof b || null === b) b = Z.navigatorH;
        if ("undefined" === typeof c || null === c) c = 0;
        if ("undefined" === typeof d || null === d) d = 0;
        S || (S = M);
        G || (G = S.style);
        H = S.childNodes[1].firstChild;
        0 == H.width && "undefined" !== g && null !== g && (H.width = g);
        0 == H.height && "undefined" !== k && null !== k && (H.height = k);
        S &&
            G &&
            H &&
            (Z.tracking && (e = 0),
            "undefined" !== typeof e && null !== e && ((g = H.width / H.height), (k = Z.viewerW / Z.viewerH), (e = 0 == e ? k : g), 1 < g ? (b = a / e) : ((a = b), (a *= e))),
            (G.width = a + "px"),
            (G.height = b + "px"),
            (G.left = c + "px"),
            (G.top = d + "px"),
            t(a, b));
        Z.navigatorW = a;
        Z.navigatorH = b;
    }
    function t(a, b) {
        H || (H = M.childNodes[1].firstChild);
        if (H && 0 != H.width && 0 != H.height) {
            if (
                (T || (T = M.firstChild.style),
                Aa || (Aa = M.childNodes[1].style),
                T && Aa && ((T.width = a + "px"), (T.height = b + "px"), J(a, b), (Aa.width = H.width + "px"), (Aa.height = H.height + "px"), (Aa.left = (a - H.width) / 2 + "px"), (Aa.top = (b - H.height) / 2 + "px"), Q(), Z.comparison))
            ) {
                if (!c) var c = document.getElementById("navigatorBorder" + ga);
                c && ((c = c.style), (c.width = a - 2 + "px"), (c.height = b - 2 + "px"), (c.left = parseFloat(T.left) + "px"), (c.top = parseFloat(T.top) + "px"), (c.display = ga == Z.viewportCurrentID ? "inline-block" : "none"));
            }
        } else
            window.setTimeout(function () {
                t(a, b);
            }, 100);
    }
    function J(a, b) {
        H || (H = M.childNodes[1].firstChild);
        if (H) {
            var c = H.width,
                d = H.height,
                e = c / d,
                g = a / c,
                k = b / d;
            g <= k ? ((c = a), (d = a / e), (navImageT = (b - (a / c) * d) / 2)) : k < g && ((d = b), (c = b * e), (navImageL = (a - (b / d) * c) / 2));
            H.width = c;
            H.height = d;
        }
    }
    function F(a) {
        !G && M && (G = M.style);
        G && (G.display = a ? "inline-block" : "none");
    }
    function Q() {
        if (a && a.getStatus("initializedViewport")) {
            O();
            W();
            var b = a.calculateCurrentCenterCoordinates();
            ea(b);
        }
    }
    function W() {
        if (H && P) {
            var b = H.width / Z.imageW,
                c = H.height / Z.imageH,
                d = a.getZoom(Z.comparison && ga != Z.viewportCurrentID),
                b = (Z.viewerW * b) / d;
            Z.comparison && (b /= 2);
            c = (Z.viewerH * c) / d;
            P.width = b + "px";
            P.height = c + "px";
        }
    }
    function O() {
        !Aa && M && (Aa = M.childNodes[1].style);
        if (Aa) {
            var b = a.getRotation();
            Z.Utils.rotateElement(Aa, b, !0);
        }
    }
    function ea(a) {
        if (H && P && Aa) {
            if ("undefined" === typeof a || null === a || (0 == a.x && 0 == a.y)) a = new Z.Utils.Point(Z.imageX, Z.imageY);
            if ("undefined" === typeof z || null === z) z = Z.imageZ;
            var b = Z.imageR;
            0 > b && (b += 360);
            var c = parseFloat(H.width),
                d = parseFloat(H.height),
                b = Z.Utils.rotatePoint((c / Z.imageW) * a.x - c / 2, (d / Z.imageH) * a.y - d / 2, -b);
            a = b.x - parseFloat(P.width) / 2;
            c = b.y - parseFloat(P.height) / 2;
            b = parseFloat(G.width) / 2;
            c = parseFloat(G.height) / 2 + c - 1;
            P.left = b + a + (Z.comparison ? -1 : 0) + "px";
            P.top = c + "px";
        }
    }
    function v(b) {
        if (H && P && Aa) {
            var c = Z.imageZ,
                d = Z.imageR;
            0 > d && (d += 360);
            var e = parseFloat(H.width),
                g = parseFloat(H.height),
                k = e / Z.imageW,
                v = g / Z.imageH,
                m = Z.imageX * k,
                n = Z.imageY * v,
                w = Z.Utils.getPageScroll(),
                u = b ? w.x : 0,
                w = b ? w.y : 0,
                u = parseFloat(P.left) + u,
                w = parseFloat(P.top) + w,
                e = u - parseFloat(G.width) / 2 + parseFloat(P.width) / 2 + e / 2,
                g = w - parseFloat(G.height) / 2 + parseFloat(P.height) / 2 + g / 2,
                m = Z.Utils.getPositionRotated(e, g, m, n, -d),
                k = Math.round(m.x / k),
                v = Math.round(m.y / v);
            b ? a.zoomAndPanToView(k, v, c, d) : ((b = new Z.Utils.Point(k, v)), a.syncViewportToNavigator(b));
            Z.tracking && a.syncTrackingToViewport();
        }
    }
    function u() {
        Z.Utils.showMessage(Z.Utils.getResource("z271"));
    }
    function w(b) {
        Z.interactive &&
            (a.zoomAndPanAllStop(!1, !0),
            (Z.mouseIsDown = !0),
            Z.comparison && Z.Viewer.viewportSelect(parseInt(ga, 10)),
            Z.maskingSelection && Z.maskClearOnUserAction && a.clearMask(),
            S &&
                X &&
                P &&
                ((b = Z.Utils.event(b)),
                (X.mouseXPrior = b.clientX),
                (X.mouseYPrior = b.clientY),
                (dragPtStart = new Z.Utils.Point(b.clientX, b.clientY)),
                Z.Utils.addEventListener(S, "mousemove", wa),
                Z.Utils.addEventListener(S, "mouseup", N),
                Z.Utils.addEventListener(document, "mouseup", N)));
    }
    function wa(a) {
        if (Z.interactive && X && P) {
            var b = parseFloat(P.left),
                c = parseFloat(P.top);
            P.left = b + (a.clientX - X.mouseXPrior) + "px";
            P.top = c + (a.clientY - X.mouseYPrior) + "px";
            X.mouseXPrior = a.clientX;
            X.mouseYPrior = a.clientY;
            v(!1);
            return !1;
        }
    }
    function N(b) {
        if (Z.interactive && ((Z.mouseIsDown = !1), S && X && P)) {
            document.mousemove = null;
            document.mouseup = null;
            Z.Utils.removeEventListener(S, "mousemove", wa);
            Z.Utils.removeEventListener(S, "mouseup", N);
            Z.Utils.removeEventListener(document, "mouseup", N);
            b = Z.Utils.event(b);
            var c = new Z.Utils.Point(b.clientX, b.clientY);
            if ((c = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, c.x, c.y) < ja)) {
                var d = Z.Utils.getElementPosition(M);
                P.left = b.clientX - d.x - parseFloat(P.width) / 2 + "px";
                P.top = b.clientY - d.y - parseFloat(P.height) / 2 + "px";
            }
            v(c);
            (Z.comparison && c) || a.updateView();
        }
    }
    function ka(a) {
        Z.interactive &&
            ((Z.mouseIsDown = !0), a.preventDefault(), S && X && P && (a = Z.Utils.getFirstTouch(a))) &&
            ((a = new Z.Utils.Point(a.pageX, a.pageY)), (dragPtStart = new Z.Utils.Point(a.x, a.y)), (X.mouseXPrior = a.x), (X.mouseYPrior = a.y));
    }
    function aa(a) {
        if (Z.interactive && (a.preventDefault(), Z.mousePan)) {
            if (X && P && (a = Z.Utils.getFirstTouch(a))) {
                a = new Z.Utils.Point(a.pageX, a.pageY);
                var b = parseFloat(P.left),
                    c = parseFloat(P.top);
                P.left = b + (a.x - X.mouseXPrior) + "px";
                P.top = c + (a.y - X.mouseYPrior) + "px";
                X.mouseXPrior = a.x;
                X.mouseYPrior = a.y;
                v(!1);
            }
            return !1;
        }
    }
    function U(b) {
        if (Z.interactive && ((Z.mouseIsDown = !1), S && X && P)) {
            if ((b = Z.Utils.getFirstTouch(b))) {
                b = new Z.Utils.Point(b.pageX, b.pageY);
                var c = new Z.Utils.Point(b.x, b.y);
                if ((c = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, c.x, c.y) < Da)) {
                    var d = Z.Utils.getElementPosition(M);
                    P.left = b.x - d.x - parseFloat(P.width) / 2 + "px";
                    P.top = b.y - d.y - parseFloat(P.height) / 2 + "px";
                }
            }
            v(c);
            a.updateView();
        }
    }
    function Ca(b) {
        if (Z.interactive && ((Z.mouseIsDown = !1), S && X && P)) {
            if ((b = Z.Utils.getFirstTouch(b))) {
                b = new Z.Utils.Point(b.pageX, b.pageY);
                var c = new Z.Utils.Point(b.x, b.y);
                if ((c = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, c.x, c.y) < Da)) {
                    var d = Z.Utils.getElementPosition(M);
                    P.left = b.x - d.x - parseFloat(P.width) / 2 + "px";
                    P.top = b.y - d.y - parseFloat(P.height) / 2 + "px";
                }
            }
            v(c);
            a.updateView();
        }
    }
    var Ba = this,
        y = !1,
        ga = a.getViewportID().toString(),
        ua,
        M,
        S,
        G,
        K,
        T,
        V,
        Aa,
        H,
        X,
        P,
        R,
        na = [],
        ja = parseInt(Z.Utils.getResource("DEFAULT_MOUSECLICKTHRESHOLDNAVIGATOR"), 10),
        Da = parseInt(Z.Utils.getResource("DEFAULT_TOUCHTAPTHRESHOLDNAVIGATOR"), 10),
        Ga = Z.navigatorW,
        Ta = Z.navigatorH,
        Ua = Z.navigatorL,
        eb = Z.navigatorT,
        rb = Z.navigatorFit;
    Z.comparison && "1" == ga && (Ua = Z.viewerW - Ga - 1);
    var Ka;
    "multiple" != Z.imagePath || Z.comparison || (Z.overlays && "0" == a.getViewportID()) ? b(d) : c(e);
    this.z556 = function (a, b) {
        d(a, b);
    };
    this.setImage = function (a) {
        V && R && 0 < V.childNodes.length && (Z.tracking && M.removeChild(navigatorTrackingOverlay), (V.innerHTML = ""));
        "undefined" === typeof na || null === na || 0 == na.length ? b(g) : ((a = Z.Utils.arrayIndexOfObjectValue(na, "id", ga)), -1 != a && ((R = na[a].image), g(R)));
    };
    this.getInitialized = function () {
        return y;
    };
    this.setVisibility = function (a) {
        F(a);
    };
    this.setSelected = function (a) {
        if (!b) var b = document.getElementById("navigatorBorder" + ga);
        b && (b.style.display = a ? "inline-block" : "none");
    };
    this.syncToViewport = function () {
        Q();
    };
    this.z657 = function () {
        W();
    };
    this.z659 = function () {
        O();
    };
    this.z658 = function (a) {
        ea(a);
    };
    this.setViewport = function (b) {
        a = b;
        ga = a.getViewportID().toString();
        Z.overlays || Ba.setImage(a.getImagePath());
    };
    this.drawNavigatorTrackingOverlay = function (b, c) {
        var d = document.getElementById("navigatorTrackingOverlay");
        if ("undefined" === typeof d || null === d)
            (d = Z.Utils.createContainerElement("div", "navigatorTrackingOverlay", "none", "absolute", "visible", Ga + 1 + "px", Ta + 1 + "px", Ua + "px", eb + "px", "none", "0px", "transparent-none", "0px", "0px", "normal", null, !0)),
                M.appendChild(d);
        if (d) {
            for (; d.hasChildNodes(); ) d.removeChild(d.lastChild);
            if ("undefined" === typeof c || null === c) c = Z.Navigator.getSizeAndPositionNavigatorImage();
            if (c)
                for (var e = c.height / Z.imageH, g = Math.round((c.width / Z.imageW) * Z.viewerW), e = Math.round(Z.viewerH * e), k = 0, v = b.length; k < v; k++) {
                    if (b[k].complete) {
                        var m = a.getCoordinatesFromTrackingCellID(b[k].id);
                        if (null !== m.x && null !== m.y && null !== m.z) {
                            var n = m.z / 100,
                                w = g / n,
                                u = e / n,
                                q = Math.floor(m.x * w),
                                m = Math.floor(m.y * u),
                                w = q + w <= c.width ? w : c.width - q,
                                u = m + u <= c.height ? u : c.height - m,
                                t = "cellComp" + k.toString(),
                                n = getTrackingOverlayColor(n);
                            d[t] = Z.Utils.createContainerElement("div", t, "inline-block", "absolute", "visible", w + "px", u + "px", q + "px", m + "px", "solid", "1px", n, "0px", "0px", "normal", null, !0);
                            d.appendChild(d[t]);
                            Z.Utils.setOpacity(d[t], 0.25);
                        }
                    }
                }
            else
                window.setTimeout(function () {
                    Ba.drawNavigatorTrackingOverlay(b);
                }, 10);
        }
    };
    getTrackingOverlayColor = function (a) {
        a = Z.Utils.convertZoomPercentToMagnification(100 * a, Z.sourceMagnification, !0);
        return Z.Utils.stringValidateColorValue(
            Z.Utils.getResource("UI_TRACKINGNAVIGATOROVERLAYCOLOR_UNDER" + (2 > a ? "1" : 4 > a ? "2" : 10 > a ? "4" : 16 > a ? "10" : 25 > a ? "16" : 40 > a ? "25" : 60 > a ? "40" : 100 > a ? "60" : "INFINITY"))
        );
    };
    this.z682 = function () {
        y ? k() : (ua = window.setInterval(k, 300));
    };
    this.setSizeAndPosition = function (a, b, c, d, e, g, k) {
        q(a, b, c, d, e, g, k);
    };
    this.getSizeAndPositionNavigatorImage = function () {
        H || (H = M.childNodes[1].firstChild);
        var a = null;
        "undefined" !== typeof H.parentNode && null !== H.parentNode && ((a = H.parentNode.style), (a = { width: H.width, height: H.height, left: parseFloat(a.left) - 1, top: parseFloat(a.top) - 1 }));
        return a;
    };
};
Z.ZoomifyGallery = function (a) {
    function b(a) {
        P = Z.viewportCurrent.getSlides();
        for (var b = 0, c = P.length; b < c; b++) d(null, null, P[b]);
        a();
    }
    function c(a) {
        for (var b = 0, c = Z.imageSetLength; b < c; b++) d(null, Z["Viewport" + b.toString()]);
        a();
    }
    function d(b, c, e) {
        var g = "undefined" !== typeof c && null !== c ? !1 : !0,
            k = g ? a : c,
            m = Z.slideshow && "undefined" !== typeof e && null !== e;
        if ("unconverted" != Z.tileSource) {
            if (
                ("ZoomifyImageFile" == Z.tileSource
                    ? (na = m ? null : k.formatTilePath(0, 0, 0))
                    : "ZoomifyImageFolder" == Z.tileSource
                    ? (na = m ? Z.Utils.cacheProofPath(e.media + "/TileGroup0/0-0-0." + Z.tileType) : (na = Z.Utils.cacheProofPath(k.getImagePath() + "/TileGroup0/0-0-0." + Z.tileType)))
                    : "ZoomifyPFFFile" == Z.tileSource
                    ? (na = m ? null : k.formatTilePath(0, 0, 0))
                    : "ImageServer" == Z.tileSource && (na = m ? null : k.formatTilePath(0, 0, 0)),
                null !== na)
            )
                if (((ja = null), (ja = new Image()), (ja.onload = b), (ja.onerror = Q), "offsetLoading" != na)) {
                    if (Z.slideshow || !g) (g = m ? e.internalID : c.getViewportID().toString()), (e = m ? e.name : c.getViewportID().toString()), (R[R.length] = { internalID: g, image: ja, name: e });
                    "ZoomifyImageFile" == Z.tileSource ? new Z.NetConnector().loadImage(na, Z.Utils.createCallback(null, b), "gallery", null) : (ja.src = na);
                } else
                    window.setTimeout(function () {
                        d(b);
                    }, 100);
        } else
            "undefined" !== typeof unconvertedImage && null !== unconvertedImage
                ? ((ja = k.createUnconvertedImageThumbnail(unconvertedImage)), g && "function" === typeof b ? b() : (R[R.length] = "undefined" !== typeof c ? { id: c.getViewportID().toString(), image: ja } : { id: null, image: null }))
                : window.setTimeout(function () {
                      d(b, c);
                  }, 100);
    }
    function e() {
        var a = R && P && R.length == P.length;
        a && (a = Z.Utils.arrayImageLoadingValidate(R));
        a
            ? k()
            : window.setTimeout(function () {
                  e();
              }, 100);
    }
    function g() {
        var a = R && P && R.length == P.length;
        a && (a = Z.Utils.arrayImageLoadingValidate(R));
        if (a)
            if (((a = Z.Utils.arrayIndexOfObjectValue(R, "internalID", "0")), -1 != a)) {
                a = R[a].image;
                ja = a.cloneNode(!1);
                a = null;
                if ("undefined" === typeof b) var b = null;
                k();
            } else
                window.setTimeout(function () {
                    g();
                }, 100);
        else
            window.setTimeout(function () {
                g();
            }, 100);
    }
    function k(a, b) {
        "undefined" !== typeof b && null !== b && (ja = b);
        S = Z.Utils.createContainerElement("div", "galleryDisplay", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
        K = Z.GalleryDisplay = S;
        T = K.style;
        Z.slideshow && Z.Utils.setOpacity(Z.GalleryDisplay, 0);
        T.zIndex = (Z.baseZIndex + 10).toString();
        var c = parseFloat(Z.Utils.getResource("DEFAULT_GALLERYBACKGROUNDALPHA")),
            d = Z.Utils.getResource("DEFAULT_GALLERYBACKGROUNDCOLOR"),
            e = Z.Utils.getResource("DEFAULT_GALLERYBACKGROUNDCOLORNOALPHA"),
            d = Z.Utils.createContainerElement("div", "galleryBackground", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", d, "0px", "0px", "normal", null, !0);
        Z.Utils.setOpacity(d, c, e);
        S.appendChild(d);
        gB = d;
        V = gB.style;
        c = Z.Utils.createContainerElement("div", "galleryScrollPanel", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
        Z.GalleryScrollPanel = c;
        ja.alt = Z.Utils.getResource("UI_GALLERYACCESSIBILITYALTATTRIBUTE");
        S.appendChild(c);
        Aa = c;
        gspS = Aa.style;
        c = Z.Utils.createContainerElement("div", "galleryRectangle", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "solid", "2px", "transparent none", "0px", "0px", "normal", null, !0);
        c.style.borderColor = Z.Utils.stringValidateColorValue(Z.galleryRectangleColor);
        S.appendChild(c);
        H = c;
        X = H.style;
        Z.ViewerDisplay.appendChild(S);
        t();
        J(1 == Z.galleryVisible || 2 == Z.galleryVisible);
        Z.Utils.addEventListener(K, "mouseover", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(K, "mousedown", W);
        Z.Utils.addEventListener(document, "touchstart", u);
        Z.Utils.addEventListener(document, "touchmove", w);
        Z.Utils.addEventListener(document, "touchend", wa);
        Z.Utils.addEventListener(document, "touchcancel", N);
        for (var g, k, d = parseFloat(Z.GalleryDisplay.style.height), q = parseFloat(Z.GalleryDisplay.style.width), r = Z.galleryM, A = r, y = r, G = 0, U = R.length; G < U; G++) {
            var F = Z.Utils.createContainerElement("div", "imgContainer" + G.toString(), "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
            F.appendChild(R[G].image);
            e = F.firstChild;
            g = e.width;
            k = e.height;
            Z.GalleryScrollPanel.appendChild(F);
            giC = F;
            gicS = giC.style;
            e.title = R[G].name;
            c = Math.round(d - 2 * r);
            k = c / k;
            g = Math.round(g * k);
            e.width = g;
            e.height = c;
            F.style.width = g + "px";
            F.style.height = c + "px";
            F.style.left = y + "px";
            F.style.top = r + "px";
            A += g + r;
            y += g + r;
            Z.Utils.addEventListener(F, "mouseup", v);
            Z.Utils.addEventListener(F, "touchend", ka);
            Z.Utils.addEventListener(F, "touchcancel", aa);
        }
        gspS.width = A + "px";
        gspS.height = d + "px";
        gspS.left = A < q ? (q - A) / 2 + "px" : "0px";
        ga.syncGalleryToViewport(Z.slideshow ? 0 : Z.imageSet ? Z.viewportCurrentID : 0);
        Z.Utils.setOpacity(Z.GalleryDisplay, 1);
        J(!0);
        ua || ((ua = !0), Z.Utils.validateCallback("galleryInitialized"), Z.Viewer.validateViewerReady("galleryInitialized"));
    }
    function q() {
        ua && (M && (window.clearInterval(M), (M = null)), (K && T && gB && V && H && X) || ((K = S), (T = K.style), (gB = S.firstChild), (V = gB.style), (H = S.childNodes[2]), (X = H.style)));
    }
    function t(a, b, c, d) {
        var e = Z.ToolbarDisplay && Z.Toolbar.getInitialized() && Z.toolbarPosition == Z.galleryPosition ? Z.toolbarH + 2 : 0;
        if ("undefined" === typeof a || null === a) a = -1 != Z.galleryW ? Z.galleryW : Z.viewerW;
        if ("undefined" === typeof b || null === b) b = Z.galleryH;
        if ("undefined" === typeof c || null === c) c = 0;
        if ("undefined" === typeof d || null === d) d = -1 != Z.galleryT ? Z.galleryT : 0 == Z.galleryPosition ? e : Z.viewerH - e - Z.galleryH;
        K || (K = S);
        T || (T = K.style);
        K && T && ((T.width = a + "px"), (T.height = b + "px"), (T.left = c - 1 + "px"), (T.top = d + "px"), V || (V = S.firstChild.style), V && ((V.width = 2 * a + "px"), (V.height = b + "px"), (V.left = "0px")));
    }
    function J(a) {
        !T && S && (T = S.style);
        T && (T.display = a ? "inline-block" : "none");
    }
    function F(a) {
        if ((a = Z.Utils.event(a)))
            if ((a = Z.Utils.target(a))) {
                a = a.parentNode.id;
                var b = a.indexOf("imgContainer");
                -1 != b &&
                    ((a = a.substring(b + 12, a.length)), Z.slideshow ? (Z.slideshowPlaying && Z.viewportCurrent.slideshowStop(), Z.viewportCurrent.goToSlide(a, null, null, !0)) : Z.imageSet && Z.Viewer.viewportSelect(parseInt(a, 10)));
            }
    }
    function Q() {
        Z.Utils.showMessage(Z.Utils.getResource("ERROR_GALLERYIMAGEPATHINVALID"));
    }
    function W(b) {
        if ((b = Z.Utils.event(b)))
            a.zoomAndPanAllStop(!1, !0),
                Z.maskingSelection && Z.maskClearOnUserAction && a.clearMask(),
                (Z.mouseIsDownGallery = !0),
                (dragPtStart = Z.Utils.getMousePosition(b)),
                (eb = dragPtStart.x),
                Z.Utils.removeEventListener(K, "mousedown", W),
                Z.Utils.addEventListener(document, "mousemove", O),
                Z.Utils.addEventListener(document, "mouseup", ea),
                U();
    }
    function O(a) {
        if ((a = Z.Utils.event(a))) eb = Z.Utils.getMousePosition(a).x;
    }
    function ea(a) {
        if ((a = Z.Utils.event(a))) (Z.mouseIsDownGallery = !1), Z.Utils.removeEventListener(document, "mousemove", O), Z.Utils.removeEventListener(document, "mouseup", ea), Z.Utils.addEventListener(K, "mousedown", W);
    }
    function v(a) {
        if ((a = Z.Utils.event(a))) {
            var b = Z.Utils.getMousePosition(a),
                b = Z.mouseOutDownPointGallery ? Z.mouseOutDownPointGallery : new Z.Utils.Point(b.x, b.y);
            Math.abs(b.x - dragPtStart.x) < Da && F(a);
        }
    }
    function u(b) {
        if ((b = Z.Utils.event(b)))
            if ((b.preventDefault(), (b = Z.Utils.getFirstTouch(b))))
                a.zoomAndPanAllStop(!1, !0),
                    Z.maskingSelection && Z.maskClearOnUserAction && a.clearMask(),
                    (Z.mouseIsDownGallery = !0),
                    (b = new Z.Utils.Point(b.pageX, b.pageY)),
                    (dragPtStart = new Z.Utils.Point(b.x, b.y)),
                    (eb = dragPtStart.x),
                    U();
    }
    function w(a) {
        if ((a = Z.Utils.event(a))) if ((a.preventDefault(), (a = Z.Utils.getFirstTouch(a)))) eb = a.pageX;
        return !1;
    }
    function wa(a) {
        if ((a = Z.Utils.event(a))) a.preventDefault(), (Z.mouseIsDownGallery = !1);
    }
    function N(a) {
        if ((a = Z.Utils.event(a))) a.preventDefault(), (Z.mouseIsDownGallery = !1);
    }
    function ka(a) {
        if ((a = Z.Utils.event(a))) {
            a.preventDefault();
            var b = Z.Utils.getFirstTouch(a);
            b && ((b = new Z.Utils.Point(b.pageX, b.pageY)), (b = Z.mouseOutDownPointGallery ? Z.mouseOutDownPointGallery : new Z.Utils.Point(b.x, b.y)), Math.abs(b.x - dragPtStart.x) < Da && F(a));
        }
    }
    function aa(a) {
        if ((a = Z.Utils.event(a))) {
            a.preventDefault();
            var b = Z.Utils.getFirstTouch(a);
            b && ((b = new Z.Utils.Point(b.pageX, b.pageY)), (b = Z.mouseOutDownPointGallery ? Z.mouseOutDownPointGallery : new Z.Utils.Point(b.x, b.y)), Math.abs(b.x - dragPtStart.x) < Da && F(a));
        }
    }
    function U() {
        1 < Z.smoothPanEasing && (Ca(), (Ta = dragPtStart.x), null === Ua && (Ua = parseFloat(gspS.left)), null === Ga && (Ga = window.setInterval(Ba, 50)));
    }
    function Ca() {
        null !== Ga && (window.clearInterval(Ga), (eb = Ua = Ta = Ga = null), (Ka = rb = 0), (Va = A = null));
    }
    function Ba() {
        var a = parseFloat(gspS.left);
        if (Z.mouseIsDownGallery || A) {
            var b = (A ? Va : eb) - Ta,
                c = a - Ua;
            if (!(isNaN(b) || isNaN(c) || (0 == b && 0 == c))) {
                var d = A ? 1 : 100;
                rb = Math.round((((b - c) / (Z.smoothPanEasing * (A ? Z.smoothPanGlide : 1))) * d) / d);
                Z.mouseIsDownGallery ? (Ka = rb) : Math.abs(rb) > Math.abs(Ka) && (smoothPanDeltaX = Ka);
                a += rb;
                b = y(a);
                gspS.left = b + "px";
                rb -= a - b;
                a = Z.GalleryScrollPanel.childNodes[G].style;
                X.left = parseFloat(gspS.left) + parseFloat(a.left) - 1 + "px";
                A && 0 == Math.round(rb * d) / d && (A = !1);
            }
        } else Z.mouseIsDownGallery || null !== A || 0 == rb ? Ca() : ((b = y(a + Ka)), (Ka = b - a), 0 != Ka && ((Va = eb + Ka), (A = !0)));
    }
    function y(a) {
        parseFloat(Z.GalleryScrollPanel.childNodes[G].style.width);
        var b = parseFloat(T.width),
            c = parseFloat(gspS.width);
        c < b ? (0 > a ? (a = 0) : a >= b - c ? (a = b - c) : Z.mouseIsDownGallery || A || (a = (b - c) / 2)) : 0 < a ? (a = 0) : a <= b - c && (a = b - c);
        return a;
    }
    var ga = this,
        ua = !1;
    a.getViewportID();
    var M,
        S,
        G,
        K,
        T,
        V,
        Aa,
        H,
        X,
        P = [],
        R = [],
        na,
        ja,
        Da = parseInt(Z.Utils.getResource("DEFAULT_MOUSECLICKTHRESHOLDVIEWPORT"), 10),
        Ga = null,
        Ta = null,
        Ua = null,
        eb = null,
        rb = 0,
        Ka = 0,
        A = null,
        Va = null;
    Z.slideshow ? b(e) : Z.imageSet ? c(g) : d(k);
    this.initializeGallery = function (a, b) {
        k(a, b);
    };
    this.getInitialized = function () {
        return ua;
    };
    this.setVisibility = function (a) {
        J(a);
    };
    this.syncGalleryToViewport = function (a) {
        if (Z.GalleryScrollPanel) {
            G = a;
            a = Z.GalleryScrollPanel.childNodes[a].style;
            var b = parseFloat(T.width),
                c = parseFloat(gspS.left),
                d = parseFloat(a.left),
                e = parseFloat(a.top),
                g = parseFloat(a.width),
                k = parseFloat(a.height),
                v = d;
            0 > d + c && (v = -d + 1);
            d + g + c > b && (console.log(b, c, d, g), (v = -(d + g + 1 - b)));
            v != d && ((b = y(v)), (gspS.left = b + "px"), (c = b), (d = parseFloat(a.left)));
            X.width = g - 2 + "px";
            X.height = k - 3 + "px";
            X.left = d - 1 + c + "px";
            X.top = e + "px";
        }
    };
    this.setViewport = function (b) {
        a = b;
        a.getViewportID();
    };
    this.validateGalleryGlobals = function () {
        ua ? q() : (M = window.setInterval(q, 300));
    };
    this.setSizeAndPosition = function (a, b, c, d) {
        t(a, b, c, d);
    };
};
Z.ZoomifyRuler = function (a) {
    function b(a, b, c, d) {
        if ("undefined" === typeof a || null === a) a = Z.rulerW;
        if ("undefined" === typeof b || null !== b) b = Z.rulerH;
        if ("undefined" === typeof c || null !== c) c = -1 == Z.rulerL && Z.Navigator ? Z.navigatorL : Z.rulerL;
        if ("undefined" === typeof d || null !== d) d = -1 == Z.rulerT && Z.Navigator ? Z.navigatorT + Z.navigatorH + 1 : Z.rulerT;
        q.width = a + "px";
        q.height = b + "px";
        q.left = c + "px";
        q.top = d + "px";
    }
    function c(a) {
        q || (q = Z.RulerDisplay.style);
        q && (q.display = a ? "inline-block" : "none");
    }
    function d(b) {
        if (a && a.getStatus("initializedViewport")) {
            b = a.getZoom();
            var c = "pixels" == Z.units ? 0 : 4;
            if (N) {
                N.visibility = "visible";
                var d;
                d = 0 != ka ? ka * b : 100 * b;
                1 > d ? Math.round(100 * d) : Math.round(d);
            }
            d = 0;
            for (var e = ga.length; d < e; d++) ga[d].symbol == Z.units && (ua = d);
            y = null !== Ba && 0 != Ba ? Ba : null !== Ca && 0 != Ca ? Z.imageW / Ca : 1;
            b = Z.Utils.roundToFixed(M / y / b, c);
            ea.firstChild.nodeValue = b.toString();
            w.visibility = "visible";
            u.firstChild.nodeValue = "um" != ga[ua].symbol ? ga[ua].symbol : "\u03bcm";
            if (N) {
                var g, k;
                b = Math.round(100 * a.getZoom()) == (Math.round(1e3 * a.getZoom()) / 1e3) * 100 ? "" : "~";
                2 == Z.rulerListType
                    ? ((g = Math.round(100 * a.getZoom())), (g = Math.round(g)), (k = "%"))
                    : 1 == Z.rulerListType && 0 != ka && ((g = 100 * Z.Utils.convertZoomPercentToMagnification(a.getZoom(), ka)), (g = Math.round(g)), (k = "x"));
                k = g.toString() + k + b;
                for (b = insertIndex = 0; g > U[b].value; ) b++;
                insertIndex = b;
                if (g == U[insertIndex].value) Z.Utils.updateSelectElement(wa, U);
                else {
                    var v = Z.Utils.arrayClone("magnifications", U, v),
                        v = Z.Utils.arraySplice(v, insertIndex, 0, { text: k, value: g.toString() });
                    Z.Utils.updateSelectElement(wa, v);
                }
                wa.selectedIndex = insertIndex;
            }
        }
    }
    function e(b) {
        var c = 0;
        if ((b = Z.Utils.event(b))) (b = Z.Utils.target(b)), (c = parseInt(b.options[b.selectedIndex].value, 10)), isNaN(c) || a.zoomAndPanToView(a.viewX, a.viewY, (1 == Z.rulerListType ? (100 * c) / ka : c) / 100);
    }
    var g = !1,
        k,
        q,
        t,
        J,
        F,
        Q,
        W,
        O,
        ea,
        v,
        u,
        w,
        wa,
        N;
    Z.Utils.getResource("z442");
    var ka = Z.sourceMagnification,
        aa,
        U = [],
        Ca = Z.unitsPerImage,
        Ba = Z.pixelsPerUnit,
        y = 1,
        ga = [],
        ua = -1,
        M = 1;
    (function () {
        Z.RulerDisplay = Z.Utils.createContainerElement("div", "RulerDisplay", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "solid", "1px", "transparent none", "0px", "0px", "normal");
        k = Z.RulerDisplay;
        q = k.style;
        var y = parseFloat(Z.Utils.getResource("z82")),
            G = Z.Utils.getResource("z83"),
            K = Z.Utils.getResource("z83NOALPHA"),
            G = Z.Utils.createContainerElement("div", "rulerBackground", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", G, "0px", "0px", "normal", null, !0);
        Z.Utils.setOpacity(G, y, K);
        Z.RulerDisplay.appendChild(G);
        t = G;
        J = t.style;
        y = Z.Utils.getResource("z198");
        K = Z.Utils.createContainerElement("div", "rulerScaleBar", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", y, "0px", "0px", "normal", null, !0);
        Z.RulerDisplay.appendChild(K);
        F = K;
        Q = F.style;
        Q.zIndex = (Z.baseZIndex + 6).toString();
        K = Z.Utils.createContainerElement("div", "rulerScaleBarNotchL", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", y, "0px", "0px", "normal", null, !0);
        Z.RulerDisplay.appendChild(K);
        rSBNL = K;
        rsbnlS = rSBNL.style;
        y = Z.Utils.createContainerElement("div", "rulerScaleBarNotchR", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", y, "0px", "0px", "normal", null, !0);
        Z.RulerDisplay.appendChild(y);
        rSBNR = y;
        rsbnrS = rSBNR.style;
        y = parseInt(Z.Utils.getResource("z194"), 10);
        K = Z.Utils.createContainerElement("div", "errorTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0);
        G = document.createTextNode("");
        K.appendChild(G);
        Z.Utils.setTextNodeStyle(G, "black", "verdana", y + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
        Z.RulerDisplay.appendChild(K);
        W = K;
        O = W.style;
        K = Z.Utils.createContainerElement("div", "scaleTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0);
        G = document.createTextNode("");
        K.appendChild(G);
        Z.Utils.setTextNodeStyle(G, "black", "verdana", y + "px", "none", "normal", "normal", "normal", "normal", "1em", "right", "none");
        Z.RulerDisplay.appendChild(K);
        ea = K;
        v = ea.style;
        K = Z.Utils.createContainerElement("div", "unitTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0);
        G = document.createTextNode("");
        K.appendChild(G);
        Z.Utils.setTextNodeStyle(G, "black", "verdana", y + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
        Z.RulerDisplay.appendChild(K);
        u = K;
        w = u.style;
        if (0 != Z.rulerListType) {
            U =
                1 == Z.rulerListType && 0 != ka
                    ? Z.tracking
                        ? [
                              { text: "1.25x", value: 1.25 },
                              { text: "1.5x", value: 1.5 },
                              { text: "2x", value: 2 },
                              { text: "2.5x", value: 2.5 },
                              { text: "4x", value: 4 },
                              { text: "5x", value: 5 },
                              { text: "10x", value: 10 },
                              { text: "16x", value: 16 },
                              { text: "20x", value: 20 },
                              { text: "25x", value: 25 },
                              { text: "32x", value: 32 },
                              { text: "40x", value: 40 },
                              { text: "50x", value: 50 },
                              { text: "60x", value: 60 },
                              { text: "100x", value: 100 },
                              { text: "150x", value: 150 },
                              { text: "250x", value: 250 },
                          ]
                        : [
                              { text: "1.25x", value: 1.25 },
                              { text: "2.5x", value: 2.5 },
                              { text: "5x", value: 5 },
                              { text: "10x", value: 10 },
                              { text: "20x", value: 20 },
                              { text: "40x", value: 40 },
                              { text: "60x", value: 60 },
                              { text: "100x", value: 100 },
                          ]
                    : [
                          { text: "10%", value: 10 },
                          { text: "20%", value: 20 },
                          { text: "30%", value: 30 },
                          { text: "40%", value: 40 },
                          { text: "50%", value: 50 },
                          { text: "60%", value: 60 },
                          { text: "70%", value: 70 },
                          { text: "80%", value: 80 },
                          { text: "90%", value: 90 },
                          { text: "100%", value: 100 },
                      ];
            aa = new Z.Utils.createSelectElement("magnificationList", "", U, 1, 1, 1, null, !0, e, "change");
            Z.RulerDisplay.appendChild(aa);
            wa = aa;
            N = wa.style;
            var y = 100 * Z.minZ,
                K = 100 * Z.maxZ,
                G = Math.round(y),
                T = Math.round(K),
                V = "%";
            -1 == y && (y = Math.round(100 * a.calcZoomDecimalToFitDisplay()));
            1 == Z.rulerListType && 0 != ka && ((y = Z.Utils.convertZoomPercentToMagnification(y, ka)), (G = Math.round(y)), (V = "x"));
            for (; U[0].value <= G; ) U = Z.Utils.arraySplice(U, 0, 1);
            -1 == K && (K = Math.round(100 * a.calcZoomDecimalToFitDisplay()));
            1 == Z.rulerListType && 0 != ka && ((K = Z.Utils.convertZoomPercentToMagnification(K, ka)), (T = Math.round(K)), (V = "x"));
            for (; U[U.length - 1].value >= T; ) U = Z.Utils.arraySplice(U, U.length - 1, 1);
            U = Z.Utils.arraySplice(U, 0, 0, { text: G.toString() + V + (G == y ? "" : "~") + "", value: G });
            U[U.length] = { text: T.toString() + V + (T == K ? "" : "~") + "", value: K };
            Z.Utils.updateSelectElement(wa, U);
            wa.selectedIndex = 0;
        }
        ga = [
            { magnitude: Math.pow(10, 24), symbol: "Ym" },
            { magnitude: Math.pow(10, 21), symbol: "Zm" },
            { magnitude: Math.pow(10, 18), symbol: "Em" },
            { magnitude: Math.pow(10, 15), symbol: "Pm" },
            { magnitude: Math.pow(10, 12), symbol: "Tm" },
            { magnitude: Math.pow(10, 9), symbol: "Gm" },
            { magnitude: Math.pow(10, 6), symbol: "Mm" },
            { magnitude: Math.pow(10, 3), symbol: "km" },
            { magnitude: Math.pow(10, 2), symbol: "hm" },
            { magnitude: Math.pow(10, 1), symbol: "dam" },
            { magnitude: Math.pow(10, 0), symbol: "m" },
            { magnitude: Math.pow(10, -1), symbol: "dm" },
            { magnitude: Math.pow(10, -2), symbol: "cm" },
            { magnitude: Math.pow(10, -3), symbol: "mm" },
            { magnitude: Math.pow(10, -6), symbol: "um" },
            { magnitude: Math.pow(10, -9), symbol: "nm" },
            { magnitude: Math.pow(10, -12), symbol: "pm" },
            { magnitude: Math.pow(10, -15), symbol: "fm" },
            { magnitude: Math.pow(10, -18), symbol: "am" },
            { magnitude: Math.pow(10, -21), symbol: "zm" },
            { magnitude: Math.pow(10, -24), symbol: "ym" },
            { magnitude: Math.pow(10, -24), symbol: "pixels" },
        ];
        y = Z.rulerW;
        K = Z.rulerH;
        G = -1 == Z.rulerL && Z.Navigator ? Z.navigatorL : Z.rulerL;
        T = -1 == Z.rulerT && Z.Navigator ? Z.navigatorT + Z.navigatorH + 1 : Z.rulerT;
        M = 0 != Z.rulerListType ? y - 60 - 16 : y - 10;
        var V = (K - 1 + 5) / 2,
            ua = M / 2 - 5,
            H = V - 10,
            X = "pixels" == Z.units ? 7 : 0;
        J &&
            Q &&
            rsbnlS &&
            rsbnrS &&
            W &&
            O &&
            ea &&
            v &&
            u &&
            w &&
            (b(y, K, G, T),
            (J.width = y + "px"),
            (J.height = K + "px"),
            (J.left = "0px"),
            (J.top = "0px"),
            N && ((N.width = "60px"), (N.left = y - 60 - 3 + "px"), (N.top = (K - 20) / 2 + "px"), (N.visibility = "visible")),
            (Q.width = M + "px"),
            (Q.height = "1px"),
            (Q.left = "5px"),
            (Q.top = V + 3 + "px"),
            (rsbnlS.width = "1px"),
            (rsbnlS.height = "6px"),
            (rsbnlS.left = "5px"),
            (rsbnlS.top = V + "px"),
            (rsbnrS.width = "1px"),
            (rsbnrS.height = "6px"),
            (rsbnrS.left = 5 + M + "px"),
            (rsbnrS.top = V + "px"),
            (O.width = M + "px"),
            (O.height = "15px"),
            (O.left = "12px"),
            (O.top = H + "px"),
            (v.width = ua + "px"),
            (v.height = "15px"),
            (v.left = 15 - X + "px"),
            (v.top = H + "px"),
            (w.width = ua + "px"),
            (w.height = "15px"),
            (w.left = M / 2 + 15 - X + "px"),
            (w.top = H + "px"));
        Z.ViewerDisplay.appendChild(Z.RulerDisplay);
        c(Z.rulerVisible);
        Z.Utils.addEventListener(k, "mouseover", Z.Utils.stopPropagation);
        g || ((g = !0), Z.Utils.validateCallback("rulerInitialized"), Z.Viewer.validateViewerReady("rulerInitialized"));
        d();
    })();
    this.getInitialized = function () {
        return g;
    };
    this.setVisibility = function (a) {
        c(a);
    };
    this.setSizeAndPosition = function (a, c, d, e, g) {
        b(a, c, d, e, g);
    };
    this.syncToViewport = function (a) {
        d();
    };
};
Z.NetConnector = function () {
    function a(a, c, d) {
        var g = a.substring(0, a.indexOf("?")),
            k = parseFloat(a.substring(a.indexOf("?") + 1, a.indexOf(",")));
        a = parseFloat(a.substring(a.indexOf(",") + 1, a.length));
        k = new Z.Utils.Range(k, k + a);
        b(g, e, k, c, d);
    }
    function b(a, b, e, g, k, q, t) {
        var F = c();
        if (null === F) Z.Utils.showMessage(Z.Utils.getResource("z295"));
        else {
            var J = "function" === typeof b;
            if (J) {
                var O = b;
                b = function () {
                    window.setTimeout(Z.Utils.createCallback(null, O, F), 1);
                };
                F.onreadystatechange = function () {
                    4 == F.readyState && ((F.onreadystatechange = new Function()), b());
                };
            }
            try {
                if ("undefined" === typeof e || null === e) F.open("GET", a, J), "loadHTML" == g && F.setRequestHeader("Content-Type", "text/html"), F.send(null);
                else if ("undefined" !== typeof g && null !== g)
                    if (!Z.localUse || ("postXML" != g && "postImage" != g))
                        if ("postXML" == g)
                            if (
                                ((k = null),
                                "annotation" != t || ("undefined" !== typeof Z.annotationPath && Z.Utils.stringValidate(Z.annotationPath))
                                    ? "tracking" != t || ("undefined" !== typeof Z.trackingPath && Z.Utils.stringValidate(Z.trackingPath)) || (k = Z.Utils.getResource("ERROR_TRACKINGPATHMISSING"))
                                    : (k = Z.Utils.getResource("ERROR_ANNOTATIONPATHMISSING")),
                                null !== k)
                            )
                                Z.Utils.showMessage(k, !1, Z.messageDurationStandard, "center");
                            else {
                                var y, Q, W, M, S;
                                "annotation" == t
                                    ? ((y = Z.annotationPath), (W = y.toLowerCase()), (S = Z.Utils.getResource("z69")))
                                    : "tracking" == t && ((y = Z.trackingPath), (W = y.toLowerCase()), (S = Z.Utils.getResource("DEFAULT_TRACKINGXMLFILE")));
                                Q = W.length;
                                ".json" != W.substring(Q - 5, Q) && ".xml" != W.substring(Q - 4, Q) && (M = "/" + S);
                                t = y + M;
                                Z.postingXML = !0;
                                F.open("POST", a + "?file=" + t, !0);
                                Z.Utils.defineObjectProperty(F, "file", { value: t, writable: !1, enumerable: !1, configurable: !1 });
                                F.setRequestHeader("Content-Type", "application/xml");
                                F.send(e);
                            }
                        else if ("postImage" == g) {
                            Z.Utils.showMessage(Z.Utils.getResource("ALERT_IMAGESAVEUPLOADING"), !1, "none", "center");
                            Z.postingImage = !0;
                            var G = new FormData();
                            G.append("fileToUpload", e);
                            Z.Utils.addEventListener(F.upload, "progress", Z.Utils.uploadProgress);
                            F.open("POST", a, !0);
                            Z.Utils.defineObjectProperty(F, "zType", { value: "postingImage", writable: !1, enumerable: !1, configurable: !1 });
                            F.setRequestHeader("Content-Type", "application/upload");
                            F.send(G);
                        } else
                            "ZoomifyImageFile" == Z.tileSource &&
                                ("tile" != g && (a = Z.Utils.cacheProofPath(a)),
                                F.open("GET", a, !0),
                                (F.responseType = "arraybuffer"),
                                Z.Utils.defineObjectProperty(F, "zType", { value: g, writable: !1, enumerable: !1, configurable: !1 }),
                                Z.Utils.defineObjectProperty(F, "zTile", { value: k, writable: !1, enumerable: !1, configurable: !1 }),
                                Z.Utils.defineObjectProperty(F, "zChunkNumber", { value: q, writable: !1, enumerable: !1, configurable: !1 }),
                                Z.browser == Z.browsers.SAFARI && F.setRequestHeader("If-Modified-Since", "Thu, 01 Dec 1994 16:00:00 GMT"),
                                F.setRequestHeader("Range", "bytes=" + e.start.toString() + "-" + e.end.toString()),
                                F.send(null));
                    else Z.Utils.showMessage(Z.Utils.getResource("ERROR_UNSUPPORTEDLOCALSAVING"), !1, Z.messageDurationStandard, "center", !0);
            } catch (K) {
                d(K, a, g), (F = null), console.log(K);
            }
        }
    }
    function c() {
        var a = null;
        switch (Z.xmlHttpRequestSupport) {
            case "XMLHttpRequest":
                a = new XMLHttpRequest();
                break;
            case "Msxml2.XMLHTTP.6.0":
                a = new ActiveXObject("Msxml2.XMLHTTP.6.0");
                break;
            case "Msxml2.XMLHTTP.3.0":
                a = new ActiveXObject("Msxml2.XMLHTTP.3.0");
                break;
            case "Microsoft.XMLHTTP":
                a = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return a;
    }
    function d(a, b, c) {
        1 == Z.localUse && (Z.browser == Z.browsers.CHROME || Z.browser == Z.browsers.OPERA || (Z.browser == Z.browsers.IE && 11 == Z.browserVersion) || (Z.browser == Z.browsers.SAFARI && 7 <= Z.browserVersion))
            ? Z.Utils.showMessage(Z.Utils.getResource("z288"), !1, Z.messageDurationStandard, "center")
            : 1 == Z.localUse && "ZoomifyImageFile" == Z.tileSource
            ? Z.Utils.showMessage(Z.Utils.getResource("z290"), !1, Z.messageDurationShort, "center")
            : 1 == Z.localUse && "ZoomifyPFFFile" == Z.tileSource
            ? Z.Utils.showMessage(Z.Utils.getResource("z289"), !1, Z.messageDurationShort, "center")
            : -1 != b.toLowerCase().indexOf(".zif")
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-ZIFBYTERANGE") + c + ".", !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf("ImageProperties.xml")
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGEXML"), !0, null, "left")
            : -1 != b.toLowerCase().indexOf(".pff")
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGEHEADER"), !1, Z.messageDurationShort, "center")
            : -1 != b.toLowerCase().indexOf("reply_data")
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGEOFFSET"), !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf(Z.Utils.getResource("z200"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-TOOLBARSKINSXML"), !0, null, "left")
            : -1 != b.indexOf(Z.Utils.getResource("DEFAULT_IMAGELISTXMLFILE"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGELISTXML"), !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf(Z.Utils.getResource("DEFAULT_COMPARISONXMLFILE"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-COMPARISONXML"), !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf(Z.Utils.getResource("z209"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-SLIDESXML"), !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf(Z.Utils.getResource("z135"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-HOTSPOTSXML"), !1, Z.messageDurationShort, "center")
            : -1 != b.indexOf(Z.Utils.getResource("z69"))
            ? (Z.Utils.showMessage(Z.Utils.getResource("z256-CREATINGANNOTATIONSXMLFILE"), !1, Z.messageDurationShort, "center"), Z.Viewport.createAnnotationsXMLFile())
            : -1 != b.indexOf(Z.Utils.getResource("z68"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-ANNOTATIONSJSON"), !1, Z.messageDurationShort, "center")
            : -1 != b.toLowerCase().indexOf(Z.Utils.getResource("z70")) || -1 != b.toLowerCase().indexOf(Z.Utils.getResource("z70"))
            ? Z.Utils.showMessage(Z.Utils.getResource("z256-ANNOTATIONSSAVEHANDLER"), !1, Z.messageDurationShort, "center")
            : Z.Utils.showMessage(Z.Utils.getResource("z256"), !1, Z.messageDurationShort, "center");
    }
    function e(a, b) {
        var c, d, e;
        if (a)
            if (200 !== a.status && 0 !== a.status && 206 !== a.status)
                (c = a.status),
                    (d = 404 == c ? "Not Found" : a.statusText),
                    Z.xmlParametersParsing
                        ? Z.Utils.showMessage(Z.Utils.getResource("z256-PARAMETERSXML"), !0, null, "left")
                        : Z.Toolbar && !Z.Toolbar.getInitialized()
                        ? Z.Utils.showMessage(Z.Utils.getResource("z256-TOOLBARSKINSXML"), !0, null, "left")
                        : "ZoomifyImageFile" == Z.tileSource
                        ? Z.Utils.showMessage(Z.Utils.getResource("z273RANGEREQUESTS") + c + " - " + d, !0, null, "left")
                        : Z.Utils.showMessage(Z.Utils.getResource("z273") + c + " - " + d, !1, Z.messageDurationShort, "center");
            else if (
                ((c = null),
                (d = "undefined" !== typeof Z.annotationPath && Z.Utils.stringValidate(Z.annotationPath) && ".json" == Z.annotationPath.toLowerCase().substring(Z.annotationPath.length - 5, Z.annotationPath.length)),
                Z.postingImage && a.zType && "postingImage" == a.zType)
            )
                (Z.postingImage = !1), Z.Utils.showMessage(Z.Utils.getResource("ALERT_IMAGESAVESUCCESSFUL"), !1, Z.messageDurationShort, "center");
            else if (a.response && a.zType && "ZoomifyImageFile" == Z.tileSource) {
                if (Z.Viewport)
                    if (((c = new Z.Utils.createUint8Array(a.response, 0)), "header" == a.zType))
                        if ("undefined" === typeof b || null === b) Z.Viewport.parseZIFHeader(c);
                        else for (d = 0, e = Z.imageSetLength; d < e; d++) b == d && Z["Viewport" + d.toString()].parseZIFHeader(c);
                    else if ("offset" == a.zType)
                        if ("undefined" === typeof b || null === b) Z.Viewport.parseZIFOffsetChunk(c, a.zChunkNumber);
                        else for (d = 0, e = Z.imageSetLength; d < e; d++) b == d && Z["Viewport" + d.toString()].parseZIFOffsetChunk(c, a.zChunkNumber);
                    else if ("byteCount" == a.zType)
                        if ("undefined" === typeof b || null === b) Z.Viewport.parseZIFByteCountChunk(c, a.zChunkNumber);
                        else for (d = 0, e = Z.imageSetLength; d < e; d++) b == d && Z["Viewport" + d.toString()].parseZIFByteCountChunk(c, a.zChunkNumber);
                    else if ("image" == a.zType.substring(0, 5)) J--, Z.Viewport.parseZIFImage(c, a.zTile, a.zType);
                    else if ("navigator" == a.zType)
                        if ("undefined" === typeof b || null === b) Z.viewportCurrent.parseZIFImage(c, a.zTile, a.zType);
                        else for (d = 0, e = Z.imageSetLength; d < e; d++) b == d && Z["Viewport" + d.toString()].parseZIFImage(c, a.zTile, a.zType);
                    else if ("gallery" == a.zType)
                        if ("undefined" === typeof b || null === b) Z.viewportCurrent.parseZIFImage(c, a.zTile, a.zType);
                        else for (d = 0, e = Z.imageSetLength; d < e; d++) b == d && Z["Viewport" + d.toString()].parseZIFImage(c, a.zTile, a.zType);
                    else Z.Utils.showMessage(Z.Utils.getResource("z256-ZIFBYTES"), !1, Z.messageDurationShort, "center");
            } else if (a.responseXML && a.responseXML.documentElement && !d) (c = a.responseXML), g(c, b);
            else {
                if (a.responseText)
                    if (((c = a.responseText), -1 != c.indexOf("ZAS") && d)) {
                        d = null;
                        try {
                            d = JSON.parse(c);
                        } catch (k) {
                            Z.Utils.showMessage(k.name + Z.Utils.getResource("z276") + k.message);
                        }
                        if (d)
                            if (Z.overlays) (Z.overlayJSONObject = d), (c = Z.Utils.jsonConvertObjectToXMLText(d)), (e = Z.Utils.xmlConvertTextToDoc(c)), Z.Viewer && Z.Viewer.parseImageSetXML(e, "overlay");
                            else if (((Z.annotationJSONObject = d), (c = Z.Utils.jsonConvertObjectToXMLText(d)), (e = Z.Utils.xmlConvertTextToDoc(c)), "undefined" === typeof b || null === b)) Z.Viewport && Z.Viewport.parseAnnotationsXML(e);
                            else for (d = 0, c = Z.imageSetLength; d < c; d++) b == d && Z["Viewport" + d.toString()].parseAnnotationsXML(e);
                    } else "ZoomifyImageFolder" == Z.tileSource ? ((c = Z.Utils.xmlConvertTextToDoc(c)), g(c, b)) : "ZoomifyImageFile" == Z.tileSource && ((c = Z.Utils.xmlConvertTextToDoc(c)), g(c, b));
            }
        else Z.Utils.showMessage(Z.Utils.getResource("z272"), !1, Z.messageDurationShort, "center");
    }
    function g(a, b) {
        if (a && a.documentElement) {
            var c = a.documentElement.tagName;
            if (Z.xmlParametersParsing) Z.Utils.parseParametersXML(a);
            else if ("USERDATA" == c) Z.Utils.parseUsersXML(a);
            else if ("COPYRIGHT" == c) {
                var c = a.documentElement.getAttribute("STATEMENTTEXT"),
                    d = a.documentElement.getAttribute("DECLINEDTEXT");
                Z.Utils.stringValidate(c) ? Z.Utils.showCopyright(c, d) : Z.Utils.showMessage(Z.Utils.getResource("z255"), !0);
            } else if ("IMAGE_PROPERTIES" == c || "ZIFHEADER" == c || "PFFHEADER" == c) {
                if ("ZoomifyImageFile" == Z.tileSource || "ZoomifyImageFolder" == Z.tileSource || "ZoomifyPFFFile" == Z.tileSource || "ImageServer" == Z.tileSource)
                    if ("multiple" != Z.imagePath) (c = "undefined" === typeof b || null === b || 0 == b ? Z.Viewport : Z["Viewport" + b.toString()]), c.z602(a);
                    else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].z602(a);
            } else if ("PFFOFFSET" == c)
                if ("multiple" != Z.imagePath) (c = "undefined" === typeof b || null === b || 0 == b ? Z.Viewport : Z["Viewport" + b.toString()]), c.parseOffsetChunk(a);
                else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].parseOffsetChunk(a);
            else if ("SKINDATA" == c) "function" === typeof Z.xmlCallbackFunction ? Z.xmlCallbackFunction(a) : Z.Toolbar && Z.Toolbar.parseSkinXML(a);
            else if ("GEODATA" == c) Z.Viewport && Z.Viewport.parseGeoCoordinatesXML(a);
            else if ("IMAGELISTDATA" == c)
                if ("undefined" === typeof b || null === b) Z.Viewport && Z.Viewport.parseImageListXML(a);
                else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].parseImageListXML(a, b);
            else if ("SLIDEDATA" == c) Z.Viewport && Z.Viewport.parseSlidesXML(a);
            else if ("HOTSPOTDATA" == c)
                if ("undefined" === typeof b || null === b) Z.Viewport && Z.Viewport.parseHotspotsXML(a);
                else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].parseHotspotsXML(a);
            else if ("ZAS" == c)
                if ("undefined" === typeof b || null === b) Z.Viewport && Z.Viewport.parseAnnotationsXML(a);
                else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].parseAnnotationsXML(a, b);
            else if ("COMPARISONDATA" == c) Z.Viewer && Z.Viewer.parseImageSetXML(a, "comparison");
            else if ("OVERLAYDATA" == c) Z.Viewer && Z.Viewer.parseImageSetXML(a, "overlay");
            else if ("ANIMATIONDATA" == c) Z.Viewer && Z.Viewer.parseImageSetXML(a, "animation");
            else if ("SLIDESTACKDATA" == c) Z.Viewer && Z.Viewer.parseImageSetXML(a, "slidestack");
            else if ("TRACKINGDATA" == c)
                if ("undefined" === typeof b || null === b) Z.Viewport && Z.Viewport.parseTrackingXML(a);
                else for (c = 0, d = Z.imageSetLength; c < d; c++) b == c && Z["Viewport" + c.toString()].parseTrackingXML(a, b);
            else Z.postingImage ? Z.Utils.showMessage(Z.Utils.getResource("ERROR_SAVEIMAGEHANDLERPATHINVALID"), !0) : Z.Utils.showMessage(Z.Utils.getResource("z296"), !0);
        } else Z.Utils.showMessage(Z.Utils.getResource("z293"), !0);
    }
    function k(b, c, d, e) {
        if (J < F) return J++, "ZoomifyImageFile" == Z.tileSource && (("undefined" !== typeof e && null !== e) || "navigator" == d) ? a(b, d, e) : ((c = Z.Utils.createCallback(null, q, c)), new t(b, c, d).start()), !0;
        -1 == Z.Utils.arrayIndexOfObjectValue(ea, "sc", b) &&
            ((ea[ea.length] = { sc: b, cb: c, ct: d, t: e }),
            O ||
                (O = window.setInterval(function () {
                    var a = ea[0];
                    k(a.sc, a.cb, a.ct, a.t) && (ea = Z.Utils.arraySplice(ea, 0, 1));
                    0 == ea.length && O && (window.clearInterval(O), (O = null));
                }, W)));
        return !1;
    }
    function q(a, b, c) {
        J--;
        if ("function" === typeof a)
            try {
                a(c);
            } catch (d) {
                Z.Utils.showMessage(d.name + Z.Utils.getResource("z245") + b + " " + d.message, !0);
            }
    }
    function t(a, b, c) {
        function d(c) {
            e.onload = null;
            e.onabort = null;
            e.onerror = null;
            g && window.clearTimeout(g);
            window.setTimeout(function () {
                b(a, c ? e : null);
            }, 1);
        }
        var e = null,
            g = null;
        this.start = function () {
            e = new Image();
            var b = function () {
                d(!1);
            };
            e.onload = function () {
                d(!0);
            };
            e.onabort = b;
            e.onerror = b;
            g = window.setTimeout(function () {
                console.log(Z.Utils.getResource("z253"));
                d(!1);
                Z.Viewport.traceDebugValues("imageRequestTimeout", c + " timeout: " + a);
            }, Q);
            e.src = a;
        };
    }
    var J = 0,
        F = parseInt(Z.Utils.getResource("z140"), 10),
        Q = parseFloat(Z.Utils.getResource("z139")),
        W = Z.Utils.getResource("DEFAULT_IMAGELOADQUEUEDELAY"),
        O,
        ea = [];
    this.loadHTML = function (a, c) {
        b(a, c, null);
    };
    this.loadXML = function (a, c) {
        "undefined" === typeof c || null === c
            ? b(a, e, null)
            : b(
                  a,
                  function (a) {
                      e(a, c);
                  },
                  null
              );
    };
    this.loadJSON = function (a) {
        b(a, e, null);
    };
    this.loadByteRange = function (a, c, d, g, k, q) {
        c = new Z.Utils.Range(c, d);
        b(a, e, c, g, k, q);
    };
    this.postXML = function (a, c, d) {
        b(a, e, c, "postXML", null, null, d);
    };
    this.postImage = function (a, c) {
        b(a, e, c, "postImage");
    };
    this.loadImage = function (a, b, c, d) {
        k(a, b, c, d);
    };
};
Z.Utils = {
    addCrossBrowserMethods: function () {
        document.addEventListener
            ? ((this.disableTextInteraction = function (a) {
                  if (a) {
                      var b = a.parentNode.style;
                      b && ((a.parentNode.unselectable = "on"), (b.userSelect = "none"), (b.MozUserSelect = "none"), (b.webkitUserSelect = "none"), (b.webkitTouchCallout = "none"), (b.webkitTapHighlightColor = "transparent"));
                  }
              }),
              (this.renderQuality = function (a, b) {
                  b && a.style.setProperty("image-rendering", "high" == b ? "optimizeQuality" : "optimizeSpeed", null);
              }),
              (this.setOpacity = function (a, b, c) {
                  Z.alphaSupported ? (a.style.opacity = b) : c && (a.style.backgroundColor = c);
              }))
            : document.attachEvent &&
              ((this.disableTextInteraction = function (a) {
                  a &&
                      ((a.parentNode.unselectable = "on"),
                      (a.parentNode.onselectstart = function () {
                          return !1;
                      }));
              }),
              (this.renderQuality = function (a, b) {
                  b && (a.style.msInterpolationMode = "high" == b ? "bicubic" : "nearest-neighbor");
              }),
              (this.setOpacity = function (a, b, c) {
                  Z.alphaSupported
                      ? ((b *= 100), (a.style.zoom = 1), (a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + b + ")"), (a.style.filter = "alpha(opacity=" + b + ")"), 100 == b && (a.style.filter = ""))
                      : c && (a.style.backgroundColor = c);
              }));
    },
    addCrossBrowserEvents: function () {
        document.addEventListener
            ? ((this.addEventListener = function (a, b, c) {
                  a && ("mousewheel" == b && a.addEventListener("DOMMouseScroll", c, !1), a.addEventListener(b, c, !1));
              }),
              (this.removeEventListener = function (a, b, c) {
                  a && ("mousewheel" == b && a.removeEventListener("DOMMouseScroll", c, !1), a.removeEventListener(b, c, !1));
              }),
              (this.event = function (a) {
                  return a;
              }),
              (this.target = function (a) {
                  return a.target;
              }),
              (this.relatedTarget = function (a) {
                  return a.relatedTarget;
              }),
              (this.isRightMouseButton = function (a) {
                  var b = !1;
                  if (2 == a.which || 3 == a.which) b = !0;
                  return b;
              }),
              (this.preventDefault = function (a) {
                  a.preventDefault();
              }),
              (this.stopPropagation = function (a) {
                  a.stopPropagation();
              }))
            : document.attachEvent &&
              ((this.addEventListener = function (a, b, c) {
                  if (-1 == this._findListener(a, b, c)) {
                      var d = function () {
                          var b = window.event;
                          Function.prototype.call ? c.call(a, b) : ((a._currentListener = c), a._currentListener(b), (a._currentListener = null));
                      };
                      a.attachEvent("on" + b, d);
                      b = { target: a, eventName: b, handler: c, handler2: d };
                      var d = (a.document || a).parentWindow,
                          e = "l" + this._listenerCounter++;
                      d._allListeners || (d._allListeners = {});
                      d._allListeners[e] = b;
                      a._listeners || (a._listeners = []);
                      a._listeners[a._listeners.length] = e;
                      d._unloadListenerAdded || ((d._unloadListenerAdded = !0), d.attachEvent("onunload", this._removeAllListeners));
                  }
              }),
              (this.removeEventListener = function (a, b, c) {
                  if (a && ((c = this._findListener(a, b, c)), -1 != c)) {
                      var d = (a.document || a).parentWindow,
                          e = a._listeners[c];
                      a.detachEvent("on" + b, d._allListeners[e].handler2);
                      a._listeners = Z.Utils.arraySplice(a._listeners, c, 1);
                      delete d._allListeners[e];
                  }
              }),
              (this.event = function (a) {
                  return window.event;
              }),
              (this.target = function (a) {
                  return a.srcElement;
              }),
              (this.relatedTarget = function (a) {
                  var b = null;
                  "mouseover" == a.type ? (b = a.fromElement) : "mouseout" == a.type && (b = a.toElement);
                  return b;
              }),
              (this.isRightMouseButton = function (a) {
                  var b = !1;
                  2 == a.button && (b = !0);
                  return b;
              }),
              (this.preventDefault = function (a) {
                  a && (a.returnValue = !1);
              }),
              (this.stopPropagation = function (a) {
                  a.cancelBubble = !0;
              }),
              (this._findListener = function (a, b, c) {
                  var d = a._listeners;
                  if (!d) return -1;
                  a = (a.document || a).parentWindow;
                  for (var e = d.length - 1; 0 <= e; e--) {
                      var g = a._allListeners[d[e]];
                      if (g && g.eventName == b && g.handler == c) return e;
                  }
                  return -1;
              }),
              (this._removeAllListeners = function () {
                  for (id in this._allListeners) {
                      var a = this._allListeners[id];
                      a.target.detachEvent("on" + a.eventName, a.handler2);
                      delete this._allListeners[id];
                  }
              }),
              (this._listenerCounter = 0));
    },
    declareGlobals: function () {
        Z.pageContainerID = null;
        Z.imagePath = null;
        Z.imagePath2 = null;
        Z.parameters = null;
        Z.xmlParametersPath = null;
        Z.xMLParametersPath = null;
        Z.xmlParametersParsing = null;
        Z.xMLParametersParsing = null;
        Z.skinPath = null;
        Z.skinMode = null;
        Z.cacheProofCounter = 0;
        Z.timerCounter = 0;
        Z.browsers = null;
        Z.browser = null;
        Z.browserVersion = null;
        Z.scaleThreshold = null;
        Z.canvasSupported = null;
        Z.cssTransformsSupported = null;
        Z.cssTransformProperty = null;
        Z.cssTransformNoUnits = null;
        Z.alphaSupported = null;
        Z.renderQuality = null;
        Z.rotationSupported = null;
        Z.fullScreenSupported = null;
        Z.arrayMapSupported = null;
        Z.arraySpliceSupported = null;
        Z.float32ArraySupported = null;
        Z.uInt8ArraySupported = null;
        Z.xmlHttpRequestSupport = null;
        Z.definePropertySupported = null;
        Z.responseArraySupported = null;
        Z.responseArrayPrototyped = !1;
        Z.touchSupport = null;
        Z.mobileDevice = null;
        Z.localUse = null;
        Z.zifSupported = null;
        Z.onReady = null;
        Z.onAnnotationReady = null;
        Z.initialX = null;
        Z.initialY = null;
        Z.initialZ = null;
        Z.initialZoom = null;
        Z.minZ = null;
        Z.minZoom = null;
        Z.maxZ = null;
        Z.maxZoom = null;
        Z.zoomSpeed = null;
        Z.panSpeed = null;
        Z.smoothPan = null;
        Z.smoothPanEasing = null;
        Z.smoothZoom = null;
        Z.smoothZoomEasing = null;
        Z.smoothPanGlide = null;
        Z.autoResize = null;
        Z.fadeIn = null;
        Z.fadeInSpeed = null;
        Z.toolbarInternal = null;
        Z.toolbarVisible = null;
        Z.toolbarAutoShowHide = null;
        Z.toolbarW = null;
        Z.toolbarH = null;
        Z.toolbarPosition = null;
        Z.navigatorVisible = null;
        Z.navigatorW = null;
        Z.navigatorWidth = null;
        Z.navigatorH = null;
        Z.navigatorHeight = null;
        Z.navigatorL = null;
        Z.navigatorLeft = null;
        Z.navigatorT = null;
        Z.navigatorTop = null;
        Z.navigatorFit = null;
        Z.navigatorRectangleColor = null;
        Z.GalleryScrollPanel = null;
        Z.galleryVisible = null;
        Z.galleryAutoShowHide = null;
        Z.galleryW = null;
        Z.galleryH = null;
        Z.galleryL = null;
        Z.galleryT = null;
        Z.galleryPosition = null;
        Z.galleryRectangleColor = null;
        Z.mouseIsDownGallery = null;
        Z.clickZoom = null;
        Z.doubleClickZoom = null;
        Z.doubleClickDelay = null;
        Z.clickPan = null;
        Z.clickZoomAndPanBlock = !1;
        Z.mousePan = null;
        Z.keys = null;
        Z.constrainPan = null;
        Z.constrainPanLimit = null;
        Z.constrainPanStrict = null;
        Z.panBuffer = null;
        Z.tooltipsVisible = null;
        Z.helpVisible = 0;
        Z.helpPath = null;
        Z.helpCustom = !1;
        Z.helpContent = null;
        Z.helpW = null;
        Z.helpWidth = null;
        Z.helpH = null;
        Z.helpHeight = null;
        Z.helpL = null;
        Z.helpLeft = null;
        Z.helpT = null;
        Z.helpTop = null;
        Z.minimizeVisible = null;
        Z.sliderZoomVisible = null;
        Z.sliderVisible = null;
        Z.panButtonsVisible = null;
        Z.resetVisible = null;
        Z.fullViewVisible = null;
        Z.fullScreenVisible = null;
        Z.fullPageVisible = null;
        Z.initialFullPage = null;
        Z.fullPageInitial = null;
        Z.fullScreenEntering = null;
        Z.progressVisible = null;
        Z.messagesVisible = null;
        Z.logoVisible = null;
        Z.logoLink = null;
        Z.logoLinkURL = null;
        Z.logoCustomPath = null;
        Z.bookmarksGet = null;
        Z.bookmarksSet = null;
        Z.copyrightPath = null;
        Z.watermarkPath = null;
        Z.watermarks = null;
        Z.virtualPointerVisible = null;
        Z.crosshairsVisible = null;
        Z.zoomRectangle = null;
        Z.rulerVisible = null;
        Z.units = null;
        Z.unitsPerImage = null;
        Z.pixelsPerUnit = null;
        Z.sourceMagnification = null;
        Z.magnification = null;
        Z.rulerListType = null;
        Z.rulerW = null;
        Z.rulerWidth = null;
        Z.rulerH = null;
        Z.rulerHeight = null;
        Z.rulerL = null;
        Z.rulerLeft = null;
        Z.rulerT = null;
        Z.rulerTop = null;
        Z.measureVisible = !1;
        Z.rotationVisible = null;
        Z.rotationFree = null;
        Z.initialR = null;
        Z.initialRotation = null;
        Z.imageListPath = null;
        Z.imageList = null;
        Z.imageListTitle = null;
        Z.imageListFolder = null;
        Z.imageListFileShared = !1;
        Z.imageSetImageListPath = null;
        Z.imageListTimeout = null;
        Z.screensaver = !1;
        Z.screensaverSpeed = null;
        Z.tour = !1;
        Z.tourPath = null;
        Z.tourListTitle = null;
        Z.tourPlaying = null;
        Z.tourStop = !1;
        Z.comparison = !1;
        Z.comparisonPath = null;
        Z.syncVisible = null;
        Z.initialSync = null;
        Z.syncComparison = null;
        Z.slideshow = !1;
        Z.slidePath = null;
        Z.slideListTitle = null;
        Z.slideshowPlaying = null;
        Z.slideTransitionTimeout = null;
        Z.slideTransitionSpeed = null;
        Z.slideOpacity = 0;
        Z.audioContent = !1;
        Z.audioMuted = !1;
        Z.hotspots = !1;
        Z.hotspotPath = null;
        Z.hotspotFolder = null;
        Z.hotspotListTitle = null;
        Z.hotspotsDrawOnlyInView = !0;
        Z.captionBoxes = !1;
        Z.captionsColorsDefault = !0;
        Z.annotations = !1;
        Z.annotationPath = null;
        Z.annotationFolder = null;
        Z.annotationXMLText = null;
        Z.annotationJSONObject = null;
        Z.annotationsAddMultiple = null;
        Z.annotationsAutoSave = null;
        Z.annotationPanelVisible = null;
        Z.annotationPanelVisibleState = !1;
        Z.saveButtonVisible = null;
        Z.labelClickSelect = null;
        Z.simplePath = !1;
        Z.noPost = !1;
        Z.noPostDefaults = !1;
        Z.unsavedEditsTest = !0;
        Z.maskVisible = null;
        Z.maskingSelection = !1;
        Z.maskFadeTimeout = null;
        Z.maskFadeSpeed = null;
        Z.maskOpacity = 0;
        Z.maskClearOnUserAction = null;
        Z.externalEditPermissionFunction = null;
        Z.annotationSort = "none";
        Z.saveHandlerPath = null;
        Z.saveImageHandlerPath = null;
        Z.saveImageFull = null;
        Z.postingXML = !1;
        Z.postingImage = !1;
        Z.coordinatesVisible = null;
        Z.geoCoordinatesPath = null;
        Z.geoCoordinatesVisible = null;
        Z.geoCoordinatesFolder = null;
        Z.preloadVisible = null;
        Z.imageFilters = null;
        Z.imageFiltersVisible = null;
        Z.initialImageFilters = null;
        Z.brightnessVisible = null;
        Z.contrastVisible = null;
        Z.sharpnessVisible = null;
        Z.blurrinessVisible = null;
        Z.colorRedVisible = null;
        Z.colorGreenVisible = null;
        Z.colorBlueVisible = null;
        Z.colorRedRangeVisible = null;
        Z.colorGreenRangeVisible = null;
        Z.colorBlueRangeVisible = null;
        Z.colorRedRangeMin = null;
        Z.colorRedRangeMax = null;
        Z.colorGreenRangeMin = null;
        Z.colorGreenRangeMax = null;
        Z.colorBlueRangeMin = null;
        Z.colorBlueRangeMax = null;
        Z.saveImageFull = null;
        Z.saveImageFilename = null;
        Z.saveImageFormat = null;
        Z.saveImageCompression = null;
        Z.saveImageBackColor = null;
        Z.tracking = !1;
        Z.trackingPath = null;
        Z.trackingFolder = null;
        Z.trackingPathProvided = !1;
        Z.trackingEditMode = !1;
        Z.trackingFileShared = !1;
        Z.imageSetTrackingPath = null;
        Z.trackingPanelPosition = null;
        Z.trackingCounts = [];
        Z.trackingTypeCurrent = "0";
        Z.trackingOverlayVisible = !1;
        Z.initialTrackingOverlayVisible = null;
        Z.trackingCellCurrent = null;
        Z.trackingPanelVisible = null;
        Z.trackingPanelVisibleState = !1;
        Z.userName = null;
        Z.userInitials = null;
        Z.userLogin = null;
        Z.userNamePrompt = null;
        Z.userNamePromptRetry = null;
        Z.userPath = null;
        Z.userFolder = null;
        Z.userPathProvided = !1;
        Z.userList = [];
        Z.userLogging = !1;
        Z.UserPanel = null;
        Z.userPanelVisible = null;
        Z.userPanelVisibleState = !1;
        Z.canvas = null;
        Z.baseZIndex = null;
        Z.debug = null;
        Z.imageProperties = null;
        Z.serverIP = null;
        Z.serverPort = null;
        Z.tileHandlerPath = null;
        Z.tileHandlerPathFull = null;
        Z.iiifInfoJSONObject = null;
        Z.iiifScheme = null;
        Z.iIIFScheme = null;
        Z.iiifServer = null;
        Z.iIIFServer = null;
        Z.iiifPrefix = null;
        Z.iIIFPrefix = null;
        Z.iiifIdentifier = null;
        Z.iIIFIdentifier = null;
        Z.iiifRegion = null;
        Z.iIIFRegion = null;
        Z.iiifSize = null;
        Z.iIIFSize = null;
        Z.iiifRotation = null;
        Z.iIIFRotation = null;
        Z.iiifQuality = null;
        Z.iIIFQuality = null;
        Z.iiifFormat = null;
        Z.iIIFFormat = null;
        Z.tileW = null;
        Z.tileH = null;
        Z.tileType = "jpg";
        Z.tilesPNG = null;
        Z.freehandVisible = null;
        Z.textVisible = null;
        Z.iconVisible = null;
        Z.rectangleVisible = null;
        Z.polygonVisible = null;
        Z.captionTextColor = null;
        Z.captionBackColor = null;
        Z.polygonLineColor = null;
        Z.polygonFillColor = null;
        Z.captionTextVisible = !0;
        Z.captionBackVisible = !0;
        Z.polygonFillVisible = !1;
        Z.polygonLineVisible = !0;
        Z.annotationPathProvided = !1;
        Z.saveHandlerProvided = !1;
        Z.imageSetPathProvided = !1;
        Z.slidePathProvided = !1;
        Z.saveImageHandlerProvided = !1;
        Z.tileSource = null;
        Z.tileSourceMultiple = null;
        Z.focal = null;
        Z.quality = null;
        Z.markupMode = null;
        Z.editMode = null;
        Z.editAdmin = !1;
        Z.editing = null;
        Z.labelMode = "view";
        Z.editModePrior = Z.editMode;
        Z.xmlCallbackFunction = null;
        Z.labelsClickDrag = !1;
        Z.sliderFocus = "zoom";
        Z.overlayPath = null;
        Z.overlays = !1;
        Z.overlayJSONObject = null;
        Z.overlaysInitialVisibility = null;
        Z.animation = !1;
        Z.animationPath = null;
        Z.animationCount = 0;
        Z.animationAxis = null;
        Z.animator = null;
        Z.animationFlip = null;
        Z.slidestack = !1;
        Z.slidestackPath = null;
        Z.imageSet = !1;
        Z.imageSetPath = null;
        Z.imageSetLength = null;
        Z.imageSetListPosition = null;
        Z.imageSetListTitle = null;
        Z.imageSetStart = null;
        Z.imageSetLoop = null;
        Z.sliderImageSetVisible = null;
        Z.mouseWheelParmeterProvided = null;
        Z.mouseWheel = null;
        Z.imageSetHotspotPath = null;
        Z.hotspotFileShared = !1;
        Z.imageSetAnnotationPath = null;
        Z.annotationFileShared = !1;
        Z.messageDurationLong = parseInt(Z.Utils.getResource("DEFAULT_MESSAGEDURATIONLONG"), 10);
        Z.messageDurationStandard = parseInt(Z.Utils.getResource("DEFAULT_MESSAGEDURATIONSTANDARD"), 10);
        Z.messageDurationShort = parseInt(Z.Utils.getResource("DEFAULT_MESSAGEDURATIONSHORT"), 10);
        Z.messageDurationVeryShort = parseInt(Z.Utils.getResource("DEFAULT_MESSAGEDURATIONVERYSHORT"), 10);
        Z.Viewer = null;
        Z.ViewerDisplay = null;
        Z.Viewport = null;
        Z.Toolbar = null;
        Z.ToolbarDisplay = null;
        Z.ToolbarMinimized = !1;
        Z.TooltipDisplay = null;
        Z.Navigator = null;
        Z.Navigator2 = null;
        Z.NavigatorDisplay = null;
        Z.MessageDisplay = null;
        Z.messages = null;
        Z.messageDisplayList = [];
        Z.overlayMessage = null;
        Z.CoordinatesDisplay = null;
        Z.coordinates = null;
        Z.coordinatesSave = null;
        Z.CopyrightDisplay = null;
        Z.AnnotationPanelDisplay = null;
        Z.imageW = null;
        Z.imageH = null;
        Z.imageD = null;
        Z.imageCtrX = null;
        Z.imageCtrY = null;
        Z.imageX = 0;
        Z.imageY = 0;
        Z.imageZ = 0;
        Z.imageR = 0;
        Z.priorX = 0;
        Z.priorY = 0;
        Z.priorZ = 0;
        Z.priorR = 0;
        Z.preventDupCall = !1;
        Z.fitZ = null;
        Z.fillZ = null;
        Z.zooming = "stop";
        Z.panningX = "stop";
        Z.panningY = "stop";
        Z.rotating = "stop";
        Z.fullView = !1;
        Z.fullViewPrior = !1;
        Z.interactive = !0;
        Z.useCanvas = !0;
        Z.expressParamsEnabled = null;
        Z.proParamsEnabled = null;
        Z.specialStorageEnabled = null;
        Z.enterpriseParamsEnabled = null;
        Z.updateViewPercent = 0;
        Z.TraceDisplay = null;
        Z.traces = null;
        Z.mouseIsDown = !1;
        Z.buttonIsDown = !1;
        Z.keyIsDown = !1;
        Z.mouseWheelIsDown = !1;
        Z.mouseWheelCompleteDuration = null;
        Z.mouseWheelCompleteTimer = null;
        Z.mouseOutDownPoint = null;
        Z.viewportCurrentID = 0;
        Z.viewportCurrent = null;
        Z.viewportChangeTimeout = null;
    },
    detectBrowserFeatures: function () {
        Z.browsers = { UNKNOWN: 0, IE: 1, FIREFOX: 2, SAFARI: 3, CHROME: 4, OPERA: 5, EDGE: 6 };
        var a = Z.browsers.UNKNOWN,
            b = 0,
            c = 1e4,
            d = navigator.appName,
            e = navigator.appVersion,
            g = !1,
            k = !1,
            q = navigator.userAgent.toLowerCase();
        if (-1 != q.indexOf("edge")) (a = Z.browsers.EDGE), (b = e);
        else if ("Microsoft Internet Explorer" == d && window.attachEvent && window.ActiveXObject)
            (b = q.indexOf("msie")), (a = Z.browsers.IE), (b = parseFloat(q.substring(b + 5, q.indexOf(";", b)))), (g = "undefined" !== typeof document.documentMode);
        else if ("Netscape" == d && -1 != q.indexOf("trident")) (a = Z.browsers.IE), (b = 11);
        else if ("Netscape" == d && window.addEventListener) {
            var t = q.indexOf("firefox"),
                d = q.indexOf("safari"),
                e = q.indexOf("chrome");
            0 <= t
                ? ((a = Z.browsers.FIREFOX), (b = parseFloat(q.substring(t + 8))), (c = 1e4))
                : 0 <= d && ((c = q.substring(0, d).lastIndexOf("/")), (a = 0 <= e ? Z.browsers.CHROME : Z.browsers.SAFARI), (b = parseFloat(q.substring(c + 1, d))), (c = 1e4));
            d = new Image();
            d.style.getPropertyValue && (k = d.style.getPropertyValue("image-rendering"));
        } else "Opera" == d && window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera) && ((a = Z.browsers.OPERA), (b = parseFloat(e)));
        var J;
        if (window.XMLHttpRequest) (netReq = new XMLHttpRequest()), (J = "XMLHttpRequest");
        else if (window.ActiveXObject)
            for (d = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"], e = 0, t = d.length; e < t; e++)
                try {
                    netReq = new ActiveXObject(d[e]);
                    J = d[e];
                    break;
                } catch (F) {}
        var d = "response" in XMLHttpRequest.prototype || "mozResponseArrayBuffer" in XMLHttpRequest.prototype || "mozResponse" in XMLHttpRequest.prototype || "responseArrayBuffer" in XMLHttpRequest.prototype,
            e = document.createElement("canvas"),
            e = !(!e.getContext || !e.getContext("2d")),
            t = !((a == Z.browsers.SAFARI && 4 > b) || (a == Z.browsers.CHROME && 2 > b)),
            e = e && t,
            t = !(a == Z.browsers.CHROME && 2 > b),
            k = g || k ? "high" : null,
            Q = (document.documentElement || {}).style || {},
            g = !1,
            W = ["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"],
            O,
            ea;
        for (; (O = W.shift()); )
            if ("undefined" !== typeof Q[O]) {
                g = !0;
                ea = /webkit/i.test(O);
                break;
            }
        var Q = g,
            W = "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints,
            v = -1 < q.indexOf("iphone") || -1 < q.indexOf("ipad") || -1 < q.indexOf("ipod"),
            q = -1 < q.indexOf("android") || v,
            v = !1;
        if (
            "undefined" !== typeof document.cancelFullScreen ||
            "undefined" !== typeof document.webkitCancelFullScreen ||
            "undefined" !== typeof document.mozCancelFullScreen ||
            "undefined" !== typeof document.oCancelFullScreen ||
            "undefined" !== typeof document.msCancelFullScreen ||
            "undefined" !== typeof document.msExitFullscreen
        )
            v = !0;
        var u = Array.prototype.map,
            w = Array.prototype.splice,
            wa = !1;
        try {
            new Float32Array(1), (wa = !0);
        } catch (F) {}
        var N = !1;
        try {
            new Uint8Array(1), (N = !0);
        } catch (F) {}
        var ka = !1;
        if ("function" == typeof Object.defineProperty)
            try {
                Object.defineProperty({}, "x", {}), (ka = !0);
            } catch (F) {}
        var aa;
        switch (window.location.protocol) {
            case "http:":
                aa = !1;
                break;
            case "https:":
                aa = !1;
                break;
            case "file:":
                aa = !0;
                break;
            default:
                aa = null;
        }
        var U = !(
            (Z.browser == Z.browsers.IE && 9 > Z.browserVersion) ||
            (Z.browser == Z.browsers.OPERA && 15 > Z.browserVersion) ||
            (Z.browser == Z.browsers.CHROME && 25 > Z.browserVersion && Z.browser == Z.browsers.FIREFOX && 20 > Z.browserVersion && Z.browser == Z.browsers.SAFARI && 5 > Z.browserVersion)
        );
        Z.browser = a;
        Z.browserVersion = b;
        Z.scaleThreshold = c;
        Z.xmlHttpRequestSupport = J;
        Z.responseArraySupported = d;
        Z.canvasSupported = e;
        Z.useCanvas = Z.canvasSupported;
        Z.imageFilters = !Z.useCanvas && Z.imageFilters ? !1 : Z.imageFilters;
        Z.cssTransformsSupported = g;
        Z.cssTransformProperty = O;
        Z.cssTransformNoUnits = ea;
        Z.alphaSupported = t;
        Z.renderQuality = k;
        Z.rotationSupported = Q;
        Z.fullScreenSupported = v;
        Z.arrayMapSupported = u;
        Z.arraySpliceSupported = w;
        Z.float32ArraySupported = wa;
        Z.uInt8ArraySupported = N;
        Z.definePropertySupported = ka;
        Z.touchSupport = W;
        Z.mobileDevice = q;
        Z.localUse = aa;
        Z.zifSupported = U;
    },
    getBookmarksURL: function () {
        if (Z.bookmarksGet) {
            var a = window.location.href,
                b = a.indexOf("?");
            if (-1 != b) {
                var c = "",
                    d = -1,
                    e = -1,
                    g = -1,
                    k = -1,
                    q = Z.imageW / 2,
                    t = Z.imageH / 2,
                    J = -1,
                    F = 0,
                    c = a.substring(b + 1, a.length);
                if ("IIIFImageServer" != Z.tileSource)
                    (d = c.indexOf("x=")),
                        (e = c.indexOf("y=")),
                        (g = c.indexOf("z=")),
                        (k = c.indexOf("r=")),
                        -1 == k && (k = c.length + 1),
                        -1 != d && (q = parseFloat(c.substring(d + 2, e - 1))),
                        -1 != e && (t = parseFloat(c.substring(e + 2, g - 1))),
                        -1 != g && (J = parseFloat(c.substring(g + 2, k - 1))),
                        k != c.length + 1 && (F = parseFloat(c.substring(k + 2, c.length)));
                else {
                    for (var Q, W, O, a = c.split("/"), b = a.length - 1; -1 < b; b--)
                        if (((c = a[b]), -1 != c.indexOf(","))) {
                            O = parseInt(a[b + 1], 10);
                            if (isNaN(O) || 0 > O || 360 < O) O = 0;
                            W = c.split(",");
                            Q = a[b - 1].split(",");
                            break;
                        }
                    q = Math.round(parseFloat(Q[0]) + parseFloat(Q[2]) / 2);
                    t = Math.round(parseFloat(Q[1]) + parseFloat(Q[3]) / 2);
                    J = Math.round((parseFloat(W[0]) / parseFloat(Q[2])) * 100) / 100;
                    F = O;
                }
            }
            Z.initialX = q;
            Z.initialY = t;
            Z.initialZ = J;
            Z.initialR = F;
        }
    },
    setBookmarksURL: function () {
        if (Z.bookmarksSet) {
            var a = Z.Viewport.getCoordinatesBookmark(null, "IIIFImageServer" == Z.tileSource);
            window.history.pushState({ id: "zBookmark" }, "", a);
        }
    },
    enforceCopyright: function () {
        this.readCookie("zoomifyImageCopyright") ? Z.Viewer.configureViewer() : this.loadCopyrightText();
    },
    loadCopyrightText: function () {
        new Z.NetConnector().loadXML(Z.copyrightPath);
    },
    showCopyright: function (a, b) {
        var c = this.getResource("z102"),
            d = this.getResource("z101");
        Z.CopyrightDisplay = this.createContainerElement("div", "CopyrightDisplay", "inline-block", "absolute", "hidden", Z.viewerW - 2 + "px", Z.viewerH - 2 + "px", "0px", "0px", "solid", "1px", c, "0px", "0px", "normal", null, !0);
        Z.ViewerDisplay.appendChild(Z.CopyrightDisplay);
        Z.CopyrightDisplay.style.zIndex = (Z.baseZIndex + 36).toString();
        var e = parseFloat(Z.CopyrightDisplay.style.width) / 2 - 220,
            c = parseFloat(Z.CopyrightDisplay.style.height) / 2 - 100,
            g = this.createContainerElement("div", "textBox", "inline-block", "absolute", "hidden", "440px", "200px", e + "px", c + "px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0);
        g.id = "textBox";
        Z.CopyrightDisplay.appendChild(g);
        var k = document.createTextNode(a);
        g.appendChild(this.createCenteredElement(k, "copyrightTextNode"));
        this.setTextNodeStyle(k, "black", "verdana", "16px", "none", "normal", "normal", "normal", "normal", "1em", "justify", "none");
        var k = this.createContainerElement("div", "declinedTextContainer", "hidden", "absolute", "hidden", "0px", "0px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", null, !0),
            q = document.createTextNode(b);
        k.appendChild(q);
        g.appendChild(k);
        e = e + 220 - 95;
        c = c + 200 + 20;
        g = this.getResource("z418");
        g = new Z.Utils.Button("buttonAgree", g, null, null, null, null, "80px", "20px", e + "px", c + "px", "mousedown", this.copyrightAgreeButtonHandler, "z332", "solid", "1px", d, "0px", "0px");
        Z.CopyrightDisplay.appendChild(g.elmt);
        e += 110;
        g = this.getResource("z419");
        d = new Z.Utils.Button("buttonExit", g, null, null, null, null, "80px", "20px", e + "px", c + "px", "mousedown", this.copyrightExitButtonHandler, "z333", "solid", "1px", d, "0px", "0px");
        Z.CopyrightDisplay.appendChild(d.elmt);
    },
    hideCopyright: function () {
        var a = document.getElementById("copyrightTextNode").firstChild,
            b = document.getElementById("declinedTextContainer").firstChild.nodeValue;
        a.nodeValue = b;
        a = document.getElementById("buttonAgree");
        Z.Utils.removeEventListener(a, "mousedown", this.copyrightAgreeButtonHandler);
        Z.CopyrightDisplay.removeChild(a);
        a = document.getElementById("buttonExit");
        Z.Utils.removeEventListener(a, "mousedown", this.copyrightExitButtonHandler);
        Z.CopyrightDisplay.removeChild(a);
    },
    copyrightAgreeButtonHandler: function (a) {
        Z.ViewerDisplay.removeChild(Z.CopyrightDisplay);
        document.cookie = "zoomifyImageCopyright=confirmed";
        Z.Viewer.configureViewer();
    },
    copyrightExitButtonHandler: function (a) {
        Z.Utils.hideCopyright();
    },
    parseParametersXML: function (a) {
        Z.xmlParametersParsing = !1;
        var b = "";
        a = a.getElementsByTagName("ZOOMIFY")[0];
        zImagePath = a.getAttribute("IMAGEPATH");
        zImagePath2 = a.getAttribute("IMAGEPATH2");
        "undefined" !== typeof zImagePath && Z.Utils.stringValidate(zImagePath) && (Z.imagePath = zImagePath);
        "undefined" !== typeof zImagePath2 && Z.Utils.stringValidate(zImagePath2) && (Z.imagePath2 = zImagePath2);
        for (var c = Z.Utils.getResource("DEFAULT_PARAMETERLISTTEXT").split(","), d = 0, e = c.length; d < e; d++) {
            var g = c[d],
                k = Z.Utils.stringLowerCaseFirstLetter(g.substr(1)).toUpperCase(),
                k = a.getAttribute(k);
            "undefined" !== typeof k && Z.Utils.stringValidate(k) && (b += g + "=" + k + "&");
        }
        c = a.getAttribute("FULLPAGEINITIAL");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zInitialFullPage=" + c + "&");
        c = a.getAttribute("TOOLBARSKINXMLPATH");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zSkinPath=" + c + "&");
        c = a.getAttribute("TOOLBARTOOLTIPS");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zTooltipsVisible=" + c + "&");
        c = a.getAttribute("SHOWTOOLTIPS");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zTooltipsVisible=" + c + "&");
        c = a.getAttribute("WATERMARKMEDIA");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zWatermarkPath=" + c + "&");
        c = a.getAttribute("SLIDESXMLPATH");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zSlidePath=" + c + "&");
        c = a.getAttribute("HOTSPOTSXMLPATH");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zHotspotPath=" + c + "&");
        c = a.getAttribute("ANNOTATIONSXMLPATH");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zAnnotationPath=" + c + "&");
        c = a.getAttribute("SAVETOFILE");
        "undefined" !== typeof c && Z.Utils.stringValidate(c) && (b += "zSaveImageHandlerPath=" + c + "&");
        b = "&" == b.slice(-1, b.length) ? b.slice(0, b.length - 1) : b;
        b = unescape(b);
        b = Z.Utils.stringUnescapeAmpersandCharacters(b);
        Z.Utils.arrayClear(Z.parameters);
        Z.parameters = Z.Utils.parseParameters(b);
        Z.initialize();
    },
    parseParameters: function (a) {
        var b = [];
        if ("object" === typeof a) b = a;
        else if ("string" === typeof a) {
            a = a.split("&");
            for (var c = 0, d = a.length; c < d; c++) {
                var e = a[c],
                    g = e.indexOf("=");
                if (0 < g) {
                    var k = e.substring(0, g),
                        e = e.substring(g + 1);
                    b[k] = e;
                }
            }
        }
        return b;
    },
    parametersToDelimitedString: function (a, b) {
        var c = "",
            d;
        for (d in a) c += d + "=" + a[d].toString() + b;
        return (c = c.slice(0, -1));
    },
    setParameters: function (a) {
        var b = this.getResource("z110"),
            c = this.getResource("z109"),
            d = this.getResource("z108");
        Z.expressParamsEnabled = b != c ? !0 : !1;
        Z.expressParamsEnabled || ((Z.toolbarInternal = !0), (Z.logoLinkURL = Z.Utils.getResource("z427")));
        var c = this.getResource("z187"),
            e = this.getResource("z186"),
            b = this.getResource("z185");
        Z.proParamsEnabled = c != e ? !0 : !1;
        c = this.getResource("z215");
        e = this.getResource("z214");
        this.getResource("z213");
        Z.specialStorageEnabled = c != e ? !0 : !1;
        var e = this.getResource("z107"),
            g = this.getResource("z106"),
            c = this.getResource("z105");
        Z.enterpriseParamsEnabled = e != g ? !0 : !1;
        Z.skinPath = this.getResource("z201");
        Z.skinMode = this.getResource("z199");
        isNaN(parseFloat(this.getResource("z143"))) || (Z.initialX = parseFloat(this.getResource("z143")));
        isNaN(parseFloat(this.getResource("z144"))) || (Z.initialY = parseFloat(this.getResource("z144")));
        isNaN(parseFloat(this.getResource("z145"))) || (Z.initialZ = parseFloat(this.getResource("z145")));
        isNaN(parseFloat(this.getResource("z163"))) || (Z.minZ = parseFloat(this.getResource("z163")));
        isNaN(parseFloat(this.getResource("z153"))) || (Z.maxZ = parseFloat(this.getResource("z153")));
        isNaN(parseFloat(this.getResource("z241"))) || (Z.zoomSpeed = parseFloat(this.getResource("z241")));
        isNaN(parseFloat(this.getResource("z175"))) || (Z.panSpeed = parseFloat(this.getResource("z175")));
        isNaN(parseFloat(this.getResource("z111"))) || (Z.fadeInSpeed = parseFloat(this.getResource("z111")));
        Z.fadeIn = 0 < Z.fadeInSpeed;
        Z.navigatorVisible = parseInt(this.getResource("z171"), 10);
        null === Z.navigatorW && (Z.navigatorW = parseInt(this.getResource("z172"), 10));
        null === Z.navigatorH && (Z.navigatorH = parseInt(this.getResource("z167"), 10));
        null === Z.navigatorL && (Z.navigatorL = parseInt(this.getResource("z168"), 10));
        null === Z.navigatorT && (Z.navigatorT = parseInt(this.getResource("z170"), 10));
        null === Z.navigatorFit && (Z.navigatorFit = this.getResource("z166"));
        null === Z.navigatorRectangleColor && (Z.navigatorRectangleColor = this.getResource("z169"));
        Z.galleryVisible = parseInt(this.getResource("DEFAULT_GALLERYVISIBLE"), 10);
        Z.galleryAutoShowHide = 2 == Z.galleryVisible;
        Z.galleryW = parseInt(this.getResource("DEFAULT_GALLERYWIDTH"), 10);
        Z.galleryH = parseInt(this.getResource("DEFAULT_GALLERYHEIGHT"), 10);
        Z.galleryM = parseInt(this.getResource("DEFAULT_GALLERYMARGIN"), 10);
        Z.galleryL = parseInt(this.getResource("DEFAULT_GALLERYLEFT"), 10);
        Z.galleryT = parseInt(this.getResource("DEFAULT_GALLERYTOP"), 10);
        Z.galleryPosition = parseFloat(this.getResource("DEFAULT_GALLERYPOSITION"));
        Z.galleryRectangleColor = this.getResource("DEFAULT_GALLERYRECTANGLECOLOR");
        Z.clickZoom = "0" != this.getResource("z93");
        Z.doubleClickZoom = "0" != this.getResource("DEFAULT_DOUBLECLICKZOOM");
        Z.doubleClickDelay = parseFloat(this.getResource("DEFAULT_DOUBLECLICKDELAY"));
        Z.clickPan = "0" != this.getResource("z92");
        Z.mousePan = "0" != this.getResource("z164");
        Z.constrainPan = "0" != this.getResource("z95");
        Z.constrainPanLimit = parseInt(this.getResource("z95LIMIT"), 10);
        Z.constrainPanStrict = "0" != this.getResource("z95STRICT");
        Z.panBuffer = parseFloat(this.getResource("z173"));
        Z.smoothPan = Z.useCanvas && !Z.comparison && "0" != this.getResource("DEFAULT_SMOOTHPAN");
        Z.smoothPanEasing = parseInt(this.getResource("DEFAULT_SMOOTHPANEASING"), 10);
        Z.smoothPanGlide = parseInt(this.getResource("DEFAULT_SMOOTHPANGLIDE"), 10);
        Z.smoothZoom = "0" != this.getResource("DEFAULT_SMOOTHZOOM");
        Z.smoothZoomEasing = parseInt(this.getResource("DEFAULT_SMOOTHZOOMEASING"), 10);
        Z.keys = "0" != this.getResource("z146");
        Z.canvas = "0" != this.getResource("z88");
        Z.baseZIndex = parseInt(this.getResource("DEFAULT_BASEZINDEX"), 10);
        Z.debug = parseInt(this.getResource("z104"), 10);
        Z.toolbarVisible = parseInt(this.getResource("z223"), 10);
        Z.toolbarAutoShowHide = 0 != Z.toolbarVisible && 1 != Z.toolbarVisible && 6 != Z.toolbarVisible && 7 != Z.toolbarVisible && 8 != Z.toolbarVisible;
        Z.toolbarPosition = parseFloat(this.getResource("z222"));
        Z.logoVisible = "0" != this.getResource("z150");
        Z.logoCustomPath = this.getResource("z149");
        Z.minimizeVisible = "0" != this.getResource("z162");
        Z.sliderZoomVisible = "0" != this.getResource("DEFAULT_SLIDERZOOMVISIBLE");
        Z.mouseWheel = parseInt(this.getResource("DEFAULT_MOUSEWHEEL"), 10);
        Z.zoomButtonsVisible = "0" != this.getResource("DEFAULT_ZOOMBUTTONSVISIBLE");
        Z.panButtonsVisible = "0" != this.getResource("z174");
        Z.resetVisible = "0" != this.getResource("DEFAULT_RESETVISIBLE");
        Z.tooltipsVisible = "0" != this.getResource("z224");
        Z.helpVisible = parseInt(this.getResource("z128"), 10);
        Z.helpW = parseInt(this.getResource("z422"), 10);
        Z.helpH = parseInt(this.getResource("z421"), 10);
        Z.progressVisible = "0" != this.getResource("z184");
        Z.messagesVisible = "0" != this.getResource("DEFAULT_MESSAGESVISIBLE");
        Z.fullViewVisible = "0" != this.getResource("z121");
        Z.fullScreenVisible = "0" != this.getResource("z119");
        Z.fullPageVisible = "0" != this.getResource("z118");
        Z.initialFullPage = "0" != this.getResource("z141");
        null === Z.bookmarksGet && (Z.bookmarksGet = "0" != this.getResource("DEFAULT_BOOKMARKSGET"));
        null === Z.bookmarksSet && (Z.bookmarksSet = "0" != this.getResource("DEFAULT_BOOKMARKSSET"));
        Z.measureVisible = "0" != this.getResource("z157");
        Z.rotationVisible = "0" != this.getResource("z190");
        Z.rotationFree = "0" != this.getResource("DEFAULT_ROTATIONFREE");
        Z.initialR = this.getResource("DEFAULT_INITIALR");
        isNaN(parseFloat(this.getResource("DEFAULT_SCREENSAVERSPEED"))) || (Z.screensaverSpeed = parseFloat(this.getResource("DEFAULT_SCREENSAVERSPEED")));
        isNaN(parseFloat(this.getResource("DEFAULT_MASKFADESPEED"))) || (Z.maskFadeSpeed = parseFloat(this.getResource("DEFAULT_MASKFADESPEED")));
        Z.maskClearOnUserAction = "0" != this.getResource("DEFAULT_MASKCLEARONUSERACTION");
        Z.units = this.getResource("z231");
        Z.sourceMagnification = parseInt(this.getResource("z212"), 10);
        null === Z.virtualPointerVisible && (Z.virtualPointerVisible = "0" != this.getResource("z233"));
        null === Z.crosshairsVisible && (Z.crosshairsVisible = "0" != this.getResource("z103"));
        null === Z.zoomRectangle && (Z.zoomRectangle = "0" != this.getResource("DEFAULT_ZOOMRECTANGLE"));
        null === Z.rulerVisible && (Z.rulerVisible = parseInt(this.getResource("z196"), 10));
        null === Z.rulerListType && (Z.rulerListType = this.getResource("z193"));
        null === Z.rulerW && (Z.rulerW = parseInt(this.getResource("z197"), 10));
        null === Z.rulerH && (Z.rulerH = parseInt(this.getResource("z191"), 10));
        null === Z.rulerL && (Z.rulerL = parseInt(this.getResource("z192"), 10));
        null === Z.rulerT && (Z.rulerT = parseInt(this.getResource("z195"), 10));
        isNaN(parseFloat(this.getResource("z210"))) || (Z.slideTransitionSpeed = parseFloat(this.getResource("z210")));
        null === Z.coordinatesVisible && (Z.coordinatesVisible = "0" != this.getResource("z100"));
        null === Z.geoCoordinatesVisible && (Z.geoCoordinatesVisible = "0" != this.getResource("DEFAULT_GEOCOORDINATESVISIBLE"));
        null === Z.preloadVisible && (Z.preloadVisible = "0" != this.getResource("DEFAULT_PRELOADVISIBLE"));
        Z.saveImageFull = "0" != this.getResource("DEFAULT_SAVEIMAGEFULL");
        Z.saveImageFilename = this.getResource("DEFAULT_SAVEIMAGEFILENAME");
        Z.saveImageFormat = this.getResource("DEFAULT_SAVEIMAGEFORMAT");
        Z.saveImageCompression = parseFloat(this.getResource("DEFAULT_SAVEIMAGECOMPRESSION"));
        var k, q;
        document.body && ((k = document.body.style), (k = k.backgroundColor));
        if ((e = document.getElementById(Z.pageContainerID))) (q = Z.Utils.getElementStyle(e)), (q = q.backgroundColor);
        Z.freehandVisible = "0" != this.getResource("z116");
        Z.textVisible = "0" != this.getResource("z217");
        Z.iconVisible = "0" != this.getResource("z136");
        Z.rectangleVisible = "0" != this.getResource("z189");
        Z.polygonVisible = "0" != this.getResource("z181");
        Z.annotationPanelVisible = parseInt(this.getResource("DEFAULT_ANNOTATIONPANELVISIBLE"), 10);
        Z.labelIconsInternal = "0" != this.getResource("DEFAULT_LABELICONSINTERNAL");
        Z.annotationsAddMultiple = "0" != this.getResource("DEFAULT_ANNOTATIONSADDMULTIPLE");
        Z.annotationsAutoSave = "0" != this.getResource("DEFAULT_ANNOTATIONSAUTOSAVE");
        Z.saveButtonVisible = "0" != this.getResource("DEFAULT_ANNOTATIONSAVEBUTTONVISIBLE");
        Z.labelClickSelect = "0" != this.getResource("DEFAULT_LABELCLICKSELECT");
        Z.focal = parseInt(this.getResource("z114"), 10);
        Z.quality = parseInt(this.getResource("z188"), 10);
        Z.saveImageBackColor = Z.Utils.stringValidate(q) && "transparent" != q ? q : Z.Utils.stringValidate(k) && "transparent" != k ? k : Z.Utils.getResource("DEFAULT_SAVEIMAGEBACKCOLOR");
        Z.sliderImageSetVisible = "0" != this.getResource("DEFAULT_IMAGESETSLIDERVISIBLE");
        if ("object" === typeof a && null !== a) {
            k = this.getResource("z287");
            Z.annotationPathProvided = void 0 !== a.zHotspotPath || void 0 !== a.zAnnotationPath || void 0 !== a.zAnnotationXMLText || void 0 !== a.zAnnotationJSONObject;
            Z.saveHandlerProvided = void 0 !== a.zSaveHandlerPath || (void 0 !== a.zNoPost && "1" == a.zNoPost);
            Z.imageSetPathProvided = void 0 !== a.zAnimationPath || void 0 !== a.zSlidestackPath;
            Z.saveImageHandlerProvided = void 0 !== a.zSaveImageHandlerPath;
            Z.mouseWheelParmeterProvided = void 0 !== a.zMouseWheel;
            Z.trackingPathProvided = void 0 !== a.zTrackingPath || void 0 !== a.zTrackingXMLText || void 0 !== a.zTrackingJSONObject;
            Z.userPathProvided = void 0 !== a.zUserPath || void 0 !== a.zUserXMLText || void 0 !== a.zUserJSONObject;
            Z.slidePathProvided = (Z.imagePath && -1 != Z.imagePath.indexOf("zSlidePath")) || void 0 !== a.zSlidePath;
            q = Z.slidePathProvided || Z.comparison || Z.overlays || Z.slideshow || Z.imageSetPathProvided || Z.animation || Z.slidestack;
            for (var t in a)
                if (
                    !(
                        ("function" === typeof a[t] && "zOnAnnotationReady" !== t && "zOnReady" !== t) ||
                        (q &&
                            ("each" == t ||
                                "eachSlice" == t ||
                                "all" == t ||
                                "any" == t ||
                                "collect" == t ||
                                "detect" == t ||
                                "findAll" == t ||
                                "select" == t ||
                                "grep" == t ||
                                "include" == t ||
                                "member" == t ||
                                "inGroupsOf" == t ||
                                "inject" == t ||
                                "invoke" == t ||
                                "max" == t ||
                                "min" == t ||
                                "partition" == t ||
                                "pluck" == t ||
                                "reject" == t ||
                                "sortBy" == t ||
                                "toArray" == t ||
                                "zip" == t ||
                                "size" == t ||
                                "inspect" == t ||
                                "_reverse" == t ||
                                "_each" == t ||
                                "clear" == t ||
                                "first" == t ||
                                "last" == t ||
                                "compact" == t ||
                                "flatten" == t ||
                                "without" == t ||
                                "uniq" == t ||
                                "intersect" == t ||
                                "clone" == t)) ||
                        -1 != t.indexOf("this.indexOf")
                    )
                )
                    if ("undefined" === typeof Z[Z.Utils.stringLowerCaseFirstLetter(t.substr(1))]) q ? console.log(k + " " + t) : alert(k + " " + t);
                    else if (((pValue = a[t]), Z.expressParamsEnabled || "zNavigatorVisible" == t))
                        switch (t) {
                            case "zOnAnnotationReady":
                                "function" === typeof pValue && Z.setCallback("annotationPanelInitializedViewer", pValue);
                                break;
                            case "zOnReady":
                                "function" === typeof pValue && Z.setCallback("readyViewer", pValue);
                                break;
                            case "zInitialX":
                                isNaN(parseFloat(pValue)) || (Z.initialX = parseFloat(pValue));
                                break;
                            case "zInitialY":
                                isNaN(parseFloat(pValue)) || (Z.initialY = parseFloat(pValue));
                                break;
                            case "zInitialZoom":
                                "fit" == pValue && (pValue = "-1");
                                "fill" == pValue && (pValue = "0");
                                isNaN(parseFloat(pValue)) || ((Z.initialZ = parseFloat(pValue)), Z.initialZ && 0 < Z.initialZ && 100 >= Z.initialZ && (Z.initialZ /= 100));
                                break;
                            case "zMinZoom":
                                "fit" == pValue && (pValue = "-1");
                                "fill" == pValue && (pValue = "0");
                                isNaN(parseFloat(pValue)) || ((Z.minZ = parseFloat(pValue)), Z.minZ && 0 < Z.minZ && 100 >= Z.minZ && (Z.minZ /= 100));
                                break;
                            case "zMaxZoom":
                                isNaN(parseFloat(pValue)) || ((Z.maxZ = parseFloat(pValue)), Z.maxZ && -1 != Z.maxZ && (Z.maxZ /= 100));
                                break;
                            case "zNavigatorVisible":
                                Z.navigatorVisible = parseInt(pValue, 10);
                                break;
                            case "zNavigatorRectangleColor":
                                Z.navigatorRectangleColor = pValue;
                                break;
                            case "zToolbarInternal":
                                Z.toolbarInternal = pValue;
                                break;
                            case "zToolbarVisible":
                                Z.toolbarVisible = parseInt(pValue, 10);
                                Z.toolbarAutoShowHide = 0 != Z.toolbarVisible && 1 != Z.toolbarVisible && 6 != Z.toolbarVisible && 7 != Z.toolbarVisible && 8 != Z.toolbarVisible;
                                break;
                            case "zLogoVisible":
                                "0" == pValue && (Z.logoVisible = !1);
                                break;
                            case "zMinimizeVisible":
                                "0" == pValue && (Z.minimizeVisible = !1);
                                break;
                            case "zSliderVisible":
                                "0" == pValue && (Z.sliderZoomVisible = !1);
                                break;
                            case "zZoomButtonsVisible":
                                "0" == pValue && (Z.zoomButtonsVisible = !1);
                                break;
                            case "zPanButtonsVisible":
                                "0" == pValue && (Z.panButtonsVisible = !1);
                                break;
                            case "zResetVisible":
                                "0" == pValue && (Z.resetVisible = !1);
                                break;
                            case "zFullViewVisible":
                                "1" == pValue ? ((Z.fullScreenVisible = !0), (Z.fullPageVisible = !1)) : "0" == pValue && ((Z.fullScreenVisible = !1), (Z.fullPageVisible = !1));
                                break;
                            case "zFullScreenVisible":
                                "0" == pValue && ((Z.fullScreenVisible = !1), (Z.fullPageVisible = !1));
                                break;
                            case "zFullPageVisible":
                                "1" == pValue && ((Z.fullScreenVisible = !1), (Z.fullPageVisible = !0));
                                break;
                            case "zInitialFullPage":
                                "1" == pValue && (Z.initialFullPage = !0);
                                break;
                            case "zFullPageInitial":
                                alert(Z.Utils.getResource("z275") + " zFullPageInitial is now zInitialFullPage");
                                break;
                            case "zSkinPath":
                                Z.skinPath = pValue;
                                break;
                            case "zTooltipsVisible":
                                "0" == pValue && (Z.tooltipsVisible = !1);
                                break;
                            case "zHelpVisible":
                                Z.helpVisible = parseInt(pValue, 10);
                                break;
                            case "zHelpPath":
                                Z.helpPath = pValue;
                                Z.helpCustom = !0;
                                break;
                            case "zHelpWidth":
                                isNaN(parseInt(pValue, 10)) || (Z.helpW = parseInt(pValue, 10));
                                break;
                            case "zHelpHeight":
                                isNaN(parseInt(pValue, 10)) || (Z.helpH = parseInt(pValue, 10));
                                break;
                            case "zHelpLeft":
                                isNaN(parseInt(pValue, 10)) || (Z.helpL = parseInt(pValue, 10));
                                break;
                            case "zHelpTop":
                                isNaN(parseInt(pValue, 10)) || (Z.helpT = parseInt(pValue, 10));
                                break;
                            case "zProgressVisible":
                                "0" == pValue && (Z.progressVisible = !1);
                                break;
                            case "zMessagesVisible":
                                "0" == pValue && (Z.messagesVisible = !1);
                                break;
                            default:
                                if (Z.proParamsEnabled)
                                    switch (t) {
                                        case "zXMLParametersPath":
                                            Z.xmlParametersPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.loadParametersXML();
                                            break;
                                        case "zZoomSpeed":
                                            Z.zoomSpeed = parseInt(pValue, 10);
                                            break;
                                        case "zPanSpeed":
                                            Z.panSpeed = parseInt(pValue, 10);
                                            break;
                                        case "zFadeInSpeed":
                                            Z.fadeInSpeed = parseInt(pValue, 10);
                                            Z.fadeIn = 0 < Z.fadeInSpeed && !Z.imageFilters;
                                            break;
                                        case "zInteractive":
                                            "0" == pValue && ((Z.interactive = !1), (Z.navigatorVisible = !1), (Z.toolbarVisible = !1), (Z.clickZoom = !1), (Z.doubleClickZoom = !1), (Z.clickPan = !1), (Z.mousePan = !1), (Z.keys = !1));
                                            break;
                                        case "zClickZoom":
                                            "0" == pValue && (Z.clickZoom = !1);
                                            break;
                                        case "zDoubleClickZoom":
                                            "0" == pValue && (Z.doubleClickZoom = !1);
                                            break;
                                        case "zDoubleClickDelay":
                                            Z.doubleClickDelay = parseInt(pValue, 10);
                                            break;
                                        case "zClickPan":
                                            "0" == pValue && (Z.clickPan = !1);
                                            break;
                                        case "zMousePan":
                                            "0" == pValue && (Z.mousePan = !1);
                                            break;
                                        case "zKeys":
                                            "0" == pValue && (Z.keys = !1);
                                            break;
                                        case "zConstrainPan":
                                            Z.constrainPan = "0" != pValue;
                                            Z.constrainPanLimit = parseInt(pValue, 10);
                                            Z.constrainPanStrict = "3" == pValue;
                                            break;
                                        case "zPanBuffer":
                                            e = parseFloat(pValue);
                                            isNaN(e) || (Z.panBuffer = e);
                                            break;
                                        case "zSmoothPan":
                                            "0" == pValue && (Z.smoothPan = !1);
                                            break;
                                        case "zSmoothPanEasing":
                                            e = parseInt(pValue, 10);
                                            1 <= e && 5 >= e && (Z.smoothPanEasing = e);
                                            break;
                                        case "zSmoothPanGlide":
                                            e = parseInt(pValue, 10);
                                            1 <= e && 5 >= e && (Z.smoothPanGlide = e);
                                            break;
                                        case "zSmoothZoom":
                                            "0" == pValue && (Z.smoothZoom = !1);
                                            break;
                                        case "zSmoothZoomEasing":
                                            e = parseInt(pValue, 10);
                                            1 <= e && 4 >= e && (Z.smoothZoomEasing = e);
                                            break;
                                        case "zAutoResize":
                                            "1" == pValue && (Z.autoResize = !0);
                                            break;
                                        case "zCanvas":
                                            "0" == pValue && (Z.canvas = !1);
                                            (Z.canvasSupported && Z.canvas) || (Z.useCanvas = !1);
                                            break;
                                        case "zBaseZIndex":
                                            Z.baseZIndex = parseInt(pValue, 10);
                                            break;
                                        case "zDebug":
                                            Z.debug = parseInt(pValue, 10);
                                            break;
                                        case "zImageProperties":
                                            Z.imageProperties = pValue;
                                            break;
                                        case "zNavigatorWidth":
                                            !isNaN(parseInt(pValue, 10)) && ((Z.navigatorW = parseInt(pValue, 10)), (0 < Z.rulerVisible && null === Z.rulerW) || -1 == Z.rulerW) && (Z.rulerW = Z.navigatorW);
                                            break;
                                        case "zNavigatorHeight":
                                            isNaN(parseInt(pValue, 10)) || (Z.navigatorH = parseInt(pValue, 10));
                                            break;
                                        case "zNavigatorLeft":
                                            isNaN(parseInt(pValue, 10)) || (Z.navigatorL = parseInt(pValue, 10));
                                            break;
                                        case "zNavigatorTop":
                                            isNaN(parseInt(pValue, 10)) || (Z.navigatorT = parseInt(pValue, 10));
                                            break;
                                        case "zNavigatorFit":
                                            isNaN(parseFloat(pValue)) || (Z.navigatorFit = parseInt(pValue, 10));
                                            break;
                                        case "zGalleryVisible":
                                            Z.galleryVisible = parseInt(pValue, 10);
                                            Z.galleryAutoShowHide = 2 == Z.galleryVisible;
                                            break;
                                        case "zGalleryWidth":
                                            isNaN(parseInt(pValue, 10)) || (Z.galleryW = parseInt(pValue, 10));
                                            break;
                                        case "zGalleryHeight":
                                            isNaN(parseInt(pValue, 10)) || (Z.galleryH = parseInt(pValue, 10));
                                            break;
                                        case "zGalleryLeft":
                                            isNaN(parseInt(pValue, 10)) || (Z.galleryL = parseInt(pValue, 10));
                                            break;
                                        case "zGalleryTop":
                                            isNaN(parseInt(pValue, 10)) || (Z.galleryT = parseInt(pValue, 10));
                                            break;
                                        case "zGalleryPosition":
                                            Z.galleryPosition = parseInt(pValue, 10);
                                            break;
                                        case "zToolbarPosition":
                                            Z.toolbarPosition = parseInt(pValue, 10);
                                            break;
                                        case "zLogoCustomPath":
                                            Z.logoCustomPath = pValue;
                                            break;
                                        case "zBookmarksGet":
                                            "1" == pValue && (Z.bookmarksGet = !0);
                                            break;
                                        case "zBookmarksSet":
                                            "1" == pValue && (Z.bookmarksSet = !0);
                                            break;
                                        case "zCopyrightPath":
                                            Z.copyrightPath = pValue;
                                            break;
                                        case "zWatermarkPath":
                                            Z.watermarkPath = pValue;
                                            Z.watermarks = !0;
                                            break;
                                        case "zVirtualPointerVisible":
                                            "1" == pValue && (Z.virtualPointerVisible = !0);
                                            break;
                                        case "zCrosshairsVisible":
                                            "1" == pValue && (Z.crosshairsVisible = !0);
                                            break;
                                        case "zZoomRectangle":
                                            "0" == pValue && (Z.zoomRectangle = !1);
                                            break;
                                        case "zRulerVisible":
                                            Z.rulerVisible = parseInt(pValue, 10);
                                            break;
                                        case "zRulerListType":
                                            this.stringValidate(pValue) && (Z.rulerListType = pValue);
                                            break;
                                        case "zRulerWidth":
                                            isNaN(parseInt(pValue, 10)) || (Z.rulerW = parseInt(pValue, 10));
                                            break;
                                        case "zRulerHeight":
                                            isNaN(parseInt(pValue, 10)) || (Z.rulerH = parseInt(pValue, 10));
                                            break;
                                        case "zRulerLeft":
                                            isNaN(parseInt(pValue, 10)) || (Z.rulerL = parseInt(pValue, 10));
                                            break;
                                        case "zRulerTop":
                                            isNaN(parseInt(pValue, 10)) || (Z.rulerT = parseInt(pValue, 10));
                                            break;
                                        case "zUnits":
                                            this.stringValidate(pValue) && (Z.units = pValue);
                                            break;
                                        case "zUnitsPerImage":
                                            isNaN(parseFloat(pValue)) || (Z.unitsPerImage = parseFloat(pValue));
                                            break;
                                        case "zPixelsPerUnit":
                                            isNaN(parseFloat(pValue)) || (Z.pixelsPerUnit = parseFloat(pValue));
                                            break;
                                        case "zSourceMagnification":
                                            isNaN(parseInt(pValue, 10)) || (Z.sourceMagnification = parseInt(pValue, 10));
                                            break;
                                        case "zMagnification":
                                            alert(Z.Utils.getResource("z275") + " zMagnification is now zSourceMagnification");
                                            break;
                                        case "zMeasureVisible":
                                            Z.measureVisible = "1" == pValue;
                                            break;
                                        case "zRotationVisible":
                                            "0" != pValue && ((Z.rotationVisible = !0), (Z.rotationFree = "1" == pValue));
                                            break;
                                        case "zInitialRotation":
                                            isNaN(parseFloat(pValue)) || (Z.initialR = parseInt(pValue, 10));
                                            break;
                                        case "zImageListPath":
                                            Z.imageListPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.imageList = !0;
                                            break;
                                        case "zScreensaver":
                                            "1" == pValue && ((Z.screensaver = !0), (Z.tour = !0));
                                            break;
                                        case "zScreensaverSpeed":
                                            Z.screensaverSpeed = parseInt(pValue, 10);
                                            break;
                                        case "zTourPath":
                                            Z.tourPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.hotspotPath = Z.tourPath;
                                            Z.hotspotFolder = Z.hotspotPath;
                                            ".xml" == Z.hotspotPath.toLowerCase().substring(Z.hotspotPath.length - 4, Z.hotspotPath.length) && (Z.hotspotFolder = Z.hotspotFolder.substring(0, Z.hotspotFolder.lastIndexOf("/")));
                                            Z.tour = !0;
                                            break;
                                        case "zTourListTitle":
                                            Z.tourListTitle = pValue;
                                            break;
                                        case "zComparisonPath":
                                            Z.imageSetPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.imageSet = !0;
                                            Z.comparison = !0;
                                            Z.smoothPan = !1;
                                            break;
                                        case "zSyncVisible":
                                            "0" == pValue && (Z.syncVisible = !1);
                                            break;
                                        case "zInitialSync":
                                            "0" == pValue && (Z.initialSync = !1);
                                            break;
                                        case "zSlidePath":
                                            Z.slidePath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.slideshow = !0;
                                            break;
                                        case "zSlideListTitle":
                                            Z.slideListTitle = pValue;
                                            break;
                                        case "zHotspotPath":
                                            Z.hotspotPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.hotspotFolder = Z.hotspotPath;
                                            ".xml" == Z.hotspotPath.toLowerCase().substring(Z.hotspotPath.length - 4, Z.hotspotPath.length) && (Z.hotspotFolder = Z.hotspotFolder.substring(0, Z.hotspotFolder.lastIndexOf("/")));
                                            Z.hotspots = !0;
                                            break;
                                        case "zHotspotListTitle":
                                            Z.hotspotListTitle = pValue;
                                            break;
                                        case "zHotspotsDrawOnlyInView":
                                            "0" == pValue && (Z.hotspotsDrawOnlyInView = !1);
                                            break;
                                        case "zCaptionBoxes":
                                            "1" == pValue && (Z.captionBoxes = !0);
                                            break;
                                        case "zCaptionTextColor":
                                            Z.captionTextColor = Z.Utils.stringValidateColorValue(pValue);
                                            Z.captionsColorsDefault = !1;
                                            break;
                                        case "zCaptionBackColor":
                                            Z.captionBackColor = Z.Utils.stringValidateColorValue(pValue);
                                            Z.captionsColorsDefault = !1;
                                            break;
                                        case "zPolygonLineColor":
                                            Z.polygonLineColor = Z.Utils.stringValidateColorValue(pValue);
                                            break;
                                        case "zPolygonFillColor":
                                            Z.polygonFillColor = Z.Utils.stringValidateColorValue(pValue);
                                            break;
                                        case "zCaptionTextVisible":
                                            "0" == pValue && (Z.captionTextVisible = !1);
                                            break;
                                        case "zCaptionBackVisible":
                                            "0" == pValue && (Z.captionBackVisible = !1);
                                            break;
                                        case "zPolygonLineVisible":
                                            "0" == pValue && (Z.polygonLineVisible = !1);
                                            break;
                                        case "zPolygonFillVisible":
                                            "1" == pValue && (Z.polygonFillVisible = !0);
                                            break;
                                        case "zCoordinatesVisible":
                                            "1" == pValue && (Z.coordinatesVisible = !0);
                                            break;
                                        case "zGeoCoordinatesPath":
                                            Z.geoCoordinatesPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.geoCoordinatesFolder = Z.geoCoordinatesPath;
                                            ".xml" == Z.geoCoordinatesPath.toLowerCase().substring(Z.geoCoordinatesPath.length - 4, Z.geoCoordinatesPath.length) &&
                                                (Z.geoCoordinatesFolder = Z.geoCoordinatesFolder.substring(0, Z.geoCoordinatesFolder.lastIndexOf("/")));
                                            Z.geoCoordinatesVisible = !0;
                                            Z.coordinatesVisible = !0;
                                            break;
                                        case "zPreloadVisible":
                                            "1" == pValue && (Z.preloadVisible = !0);
                                            break;
                                        case "zOverlayPath":
                                            Z.imageSetPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.imageSet = !0;
                                            Z.overlays = !0;
                                            break;
                                        case "zOverlayJSONObject":
                                            Z.overlayJSONObject = pValue;
                                            Z.imageSet = !0;
                                            Z.overlays = !0;
                                            break;
                                        case "zAnimationPath":
                                            Z.imageSetPath = Z.Utils.stringRemoveTrailingSlashCharacters(pValue);
                                            Z.imageSet = !0;
                                            Z.animation = !0;
                                            Z.mouseWheelParmeterProvided || ((Z.mouseWheel = parseInt(this.getResource("DEFAULT_MOUSEWHEELANIMATION"), 10)), (Z.sliderFocus = 2 == Z.mouseWheel ? "imageSet" : "zoom"));
                                            Z.constrainPanStrict || (Z.constrainPanStrict = !0);
                                            break;
                                        case "zAnimationAxis":
                                            Z.animationAxis = this.stringValidate(pValue) && "vertical" == pValue ? "vertical" : "horizontal";
                                            break;
                                        case "zAnimator":
                                            Z.animator = this.stringValidate(pValue) && "motion" == pValue ? "motion" : "position";
                                            break;
                                        case "zAnimationFlip":
                                            "1" == pValue && (Z.animationFlip = !0);
                                            break;
                                        case "zImageSetSliderVisible":
                                            "0" == pValue && (Z.sliderImageSetVisible = !1);
                                            break;
                                        case "zMouseWheel":
                                            Z.mouseWheel = parseInt(pValue, 10);
                                            Z.sliderFocus = 2 == Z.mouseWheel ? "imageSet" : "zoom";
                                            break;
                                        case "zTilesPNG":
                                            "1" == pValue && (Z.tileType = "png");
                                            break;
                                        case "zTileW":
                                            Z.tileW = parseInt(pValue, 10);
                                            break;
                                        case "zTileH":
                                            Z.tileH = parseInt(pValue, 10);
                                            break;
                                        default:
                                            Z.enterpriseParamsEnabled || alert(c + " " + t);
                                    }
                                else alert(b + " " + t);
                        }
                    else alert(d + " " + t);
        }
        Z.Utils.getBookmarksURL();
        if (Z.Utils.stringValidate(Z.annotationPath) || Z.Utils.stringValidate(Z.saveHandlerPath) || Z.Utils.stringValidate(Z.saveImageHandlerPath))
            Z.enterpriseParamsEnabled ? Z.Utils.stringValidate(Z.saveHandlerPath) && (Z.saveHandlerPath = Z.saveHandlerPath) : ((Z.annotationPath = ""), alert(c));
        Z.Utils.validateImagePath();
    },
    resetParametersXYZ: function (a) {
        isNaN(parseFloat(this.getResource("z143"))) || (Z.initialX = parseFloat(this.getResource("z143")));
        isNaN(parseFloat(this.getResource("z144"))) || (Z.initialY = parseFloat(this.getResource("z144")));
        isNaN(parseFloat(this.getResource("z145"))) || (Z.initialZ = parseFloat(this.getResource("z145")));
        isNaN(parseFloat(this.getResource("z163"))) || (Z.minZ = parseFloat(this.getResource("z163")));
        isNaN(parseFloat(this.getResource("z153"))) || (Z.maxZ = parseFloat(this.getResource("z153")));
        if (this.stringValidate(a))
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b],
                    e = d.indexOf("=");
                if (0 < e) {
                    var g = d.substring(0, e),
                        d = d.substring(e + 1);
                    if (this.stringValidate(d))
                        switch (g) {
                            case "zInitialX":
                                isNaN(parseFloat(d)) || (Z.initialX = parseFloat(d));
                                break;
                            case "zInitialY":
                                isNaN(parseFloat(d)) || (Z.initialY = parseFloat(d));
                                break;
                            case "zInitialZoom":
                                "fit" == d && (d = "-1");
                                "fill" == d && (d = "0");
                                isNaN(parseFloat(d)) || ((Z.initialZ = parseFloat(d)), Z.initialZ && 0 < Z.initialZ && 100 >= Z.initialZ && (Z.initialZ /= 100));
                                break;
                            case "zMinZoom":
                                "fit" == d && (d = "-1");
                                "fill" == d && (d = "0");
                                isNaN(parseFloat(d)) || ((Z.minZ = parseFloat(d)), Z.minZ && 0 < Z.minZ && 100 >= Z.minZ && (Z.minZ /= 100));
                                break;
                            case "zMaxZoom":
                                isNaN(parseFloat(d)) || ((Z.maxZ = parseFloat(d)), Z.maxZ && -1 != Z.maxZ && (Z.maxZ /= 100));
                        }
                }
            }
    },
    readCookie: function (a) {
        a += "=";
        for (var b = document.cookie.split(";"), c = 0, d = b.length; c < d; c++) {
            for (var e = b[c]; " " == e.charAt(0); ) e = e.substring(1, e.length);
            if (0 == e.indexOf(a)) return e.substring(a.length, e.length);
        }
        return null;
    },
    validateImagePath: function (a) {
        a = "undefined" !== typeof a && Z.Utils.stringValidate(a) ? a : Z.imagePath;
        if (null !== a) {
            var b = this.getResource("z213");
            if (-1 != a.toLowerCase().indexOf(".zif")) Z.zifSupported ? ((Z.tileSource = "ZoomifyImageFile"), Z.Utils.validateResponseArrayFunctionality()) : alert(this.getResource("z16"));
            else if (-1 != a.toLowerCase().indexOf(".jpg") || -1 != a.toLowerCase().indexOf(".png")) Z.tileSource = "unconverted";
            else if (-1 != a.toLowerCase().indexOf(".pff")) Z.specialStorageEnabled ? ((Z.tileSource = "ZoomifyPFFFile"), (a = Z.tileHandlerPath), (Z.tileHandlerPathFull = a)) : alert(b);
            else if (Z.Utils.stringValidate(Z.iiifServer)) {
                Z.tileSource = "IIIFImageServer";
                a = "undefined" != typeof Z.iiifScheme && Z.Utils.stringValidate(Z.iiifScheme) ? Z.iiifScheme + "://" : "https://";
                var b = "undefined" != typeof Z.iiifServer && Z.Utils.stringValidate(Z.iiifServer) ? Z.iiifServer + "/" : null,
                    c = "undefined" != typeof Z.iiifPrefix && Z.Utils.stringValidate(Z.iiifPrefix) ? Z.iiifPrefix + "/" : null,
                    d = "undefined" != typeof Z.iiifIdentifier && Z.Utils.stringValidate(Z.iiifIdentifier) ? Z.iiifIdentifier : null;
                Z.imagePath = a && b && d ? a + b + c + d : Z.Utils.getResource("ERROR_SETTINGIIIFIMAGEPATH");
            } else
                Z.Utils.stringValidate(Z.tileHandlerPath)
                    ? Z.Utils.stringValidate(Z.tileHandlerPath) && (Z.specialStorageEnabled ? ((Z.tileSource = "ImageServer"), (a = Z.tileHandlerPath), (Z.tileHandlerPathFull = a)) : alert(b))
                    : (Z.tileSource = "ZoomifyImageFolder");
        } else if (Z.imageSet || Z.slideshow) Z.tileSourceMultiple = !0;
    },
    clearImageParameters: function () {
        Z.imagePath = null;
        Z.imagePath2 = null;
        Z.parameters = null;
        Z.xmlParametersPath = null;
        Z.xmlParametersParsing = null;
        Z.initialX = null;
        Z.initialY = null;
        Z.initialZ = null;
        Z.minZ = null;
        Z.maxZ = null;
        Z.geoCoordinatesPath = null;
        Z.geoCoordinatesVisible = null;
        Z.geoCoordinatesFolder = null;
        Z.tour = !1;
        Z.tourPath = null;
        Z.tourPlaying = null;
        Z.tourStop = !1;
        Z.hotspots = !1;
        Z.hotspotPath = null;
        Z.hotspotFolder = null;
        Z.annotations = !1;
        Z.annotationPath = null;
        Z.annotationPanelVisible = null;
        Z.annotationFolder = null;
        Z.annotationJSONObject = null;
        Z.annotationXMLText = null;
        Z.labelIconsInternal = null;
        Z.annotationsAddMultiple = null;
        Z.annotationsAutoSave = null;
        Z.postingXML = !1;
        Z.postingImage = !1;
        Z.initialR = null;
        Z.unitsPerImage = null;
        Z.pixelsPerUnit = null;
        Z.sourceMagnification = null;
        Z.imageProperties = null;
        Z.annotationPathProvided = !1;
        Z.imageSetPathProvided = !1;
        Z.slidePathProvided = !1;
        Z.tileSource = null;
        Z.tileSourceMultiple = null;
        Z.focal = null;
        Z.quality = null;
        Z.tracking || ((Z.markupMode = null), (Z.editMode = null), (Z.editAdmin = !1), (Z.editing = null), (Z.labelMode = "view"), (Z.editModePrior = Z.editMode));
        Z.sliderFocus = "zoom";
        Z.animation = !1;
        Z.animationPath = null;
        Z.animationCount = 0;
        Z.animationAxis = null;
        Z.animator = null;
        Z.animationFlip = null;
        Z.slidestack = !1;
        Z.slidestackPath = null;
        Z.brightnessVisible = null;
        Z.contrastVisible = null;
        Z.sharpnessVisible = null;
        Z.blurrinessVisible = null;
        Z.colorRedVisible = null;
        Z.colorGreenVisible = null;
        Z.colorBlueVisible = null;
        Z.colorRedRangeVisible = null;
        Z.colorGreenRangeVisible = null;
        Z.colorBlueRangeVisible = null;
        Z.colorRedRangeMin = null;
        Z.colorRedRangeMax = null;
        Z.colorGreenRangeMin = null;
        Z.colorGreenRangeMax = null;
        Z.colorBlueRangeMin = null;
        Z.colorBlueRangeMax = null;
        Z.gammaVisible = null;
        Z.gammaRedVisible = null;
        Z.gammaGreenVisible = null;
        Z.gammaBlueVisible = null;
        Z.hueVisible = null;
        Z.saturationVisible = null;
        Z.lightnessVisible = null;
        Z.whiteBalanceVisible = null;
        Z.grayscaleVisible = null;
        Z.thresholdVisible = null;
        Z.inversionVisible = null;
        Z.normalizeVisible = null;
        Z.equalizeVisible = null;
        Z.edgesVisible = null;
        Z.sepiaVisible = null;
        Z.mouseWheelParmeterProvided = null;
        Z.mouseWheel = null;
        Z.imageSetHotspotPath = null;
        Z.hotspotFileShared = !1;
        Z.imageSetAnnotationPath = null;
        Z.annotationFileShared = !1;
        Z.imageW = null;
        Z.imageH = null;
        Z.imageD = null;
        Z.imageCtrX = null;
        Z.imageCtrY = null;
        Z.imageX = 0;
        Z.imageY = 0;
        Z.imageZ = 0;
        Z.imageR = 0;
        Z.fitZ = null;
        Z.fillZ = null;
        Z.zooming = "stop";
        Z.panningX = "stop";
        Z.panningY = "stop";
        Z.rotating = "stop";
        Z.fullView = !1;
        Z.fullViewPrior = !1;
        Z.iiifInfoJSONObject = null;
        Z.iiifIdentifier = null;
        Z.iiifRegion = null;
        Z.iiifSize = null;
        Z.iiifRotation = null;
        Z.iiifQuality = null;
        Z.iiifFormat = null;
    },
    getResource: function (a) {
        var b = "";
        switch (a) {
            case "z110":
                b = "Enable Express parameters";
                break;
            case "z109":
                b = "Changing This Violates License Agreement";
                break;
            case "z108":
                b = "Support for this parameter is enabled only in the Zoomify Image Viewer included in the Zoomify HTML5 Express, Pro, and Enterprise editions: ";
                break;
            case "z187":
                b = "Enable Pro parameters";
                break;
            case "z186":
                b = "Changing This Violates License Agreement";
                break;
            case "z185":
                b = "Support for this parameter is enabled only in the Zoomify Image Viewer included in the Zoomify HTML5 Pro and Enterprise editions: ";
                break;
            case "z215":
                b = "Changing this violates License Agreement";
                break;
            case "z214":
                b = "Changing this violates License Agreement";
                break;
            case "z213":
                b = "Support for Zoomify Image File (PFF) storage and other special storage options is enabled only in the Zoomify Image Viewer included in the Zoomify HTML5 Enterprise edition.";
                break;
            case "z107":
                b = "Changing this violates License Agreement";
                break;
            case "z106":
                b = "Changing this violates License Agreement";
                break;
            case "z105":
                b = "Support for this parameter is enabled only in the Zoomify Image Viewer included in the Zoomify HTML5 Enterprise edition: ";
                break;
            case "DEFAULT_PARAMETERLISTTEXT":
                b =
                    "zImagePath,zImagePath2,zOnAnnotationReady,zOnReady,zInitialX,zInitialY,zInitialZoom,zMinZoom,zMaxZoom,zNavigatorVisible,zToolbarInternal,zToolbarVisible,zLogoVisible,zMinimizeVisible,zSliderVisible,zZoomButtonsVisible,zPanButtonsVisible,zResetVisible,zFullViewVisible,zFullScreenVisible,zFullPageVisible,zInitialFullPage,zSkinPath,zTooltipsVisible,zHelpVisible,zHelpPath,zHelpWidth,zHelpHeight,zHelpLeft,zHelpTop,zProgressVisible,zMessagesVisible,zZoomSpeed,zPanSpeed,zFadeInSpeed,zInteractive,zClickZoom,zDoubleClickZoom,zDoubleClickDelay,zClickPan,zMousePan,zKeys,zConstrainPan,zPanBuffer,zSmoothPan,zSmoothPanEasing,zSmoothPanGlide,zSmoothZoom,zSmoothZoomEasing,zAutoResize,zCanvas,zBaseZIndex,zDebug,zImageProperties,zNavigatorWidth,zNavigatorHeight,zNavigatorLeft,zNavigatorTop,zNavigatorFit,zNavigatorRectangleColor,zGalleryVisible,zGalleryWidth,zGalleryHeight,zGalleryLeft,zGalleryTop,zGalleryPosition,zToolbarPosition,zLogoCustomPath,zBookmarksGet,zBookmarksSet,zCopyrightPath,zWatermarkPath,zVirtualPointerVisible,zCrosshairsVisible,zZoomRectangle,zRulerVisible,zRulerListType,zRulerWidth,zRulerHeight,zRulerLeft,zRulerTop,zUnits,zUnitsPerImage,zPixelsPerUnit,zSourceMagnification,zMagnification,zMeasureVisible,zRotationVisible,zInitialRotation,zImageListPath,zScreensaver,zScreensaverSpeed,zTourPath,zTourListTitle,zComparisonPath,zSyncVisible,zInitialSync,zSlidePath,zSlideListTitle,zHotspotPath,zHotspotListTitle,zHotspotsDrawOnlyInView,zCaptionBoxes,zCaptionTextColor,zCaptionBackColor,zPolygonLineColor,zPolygonFillColor,zCaptionTextVisible,zCaptionBackVisible,zPolygonLineVisible,zPolygonFillVisible,zCoordinatesVisible,zGeoCoordinatesPath,zPreloadVisible,zOverlayPath,zOverlayJSONObject,zAnimationPath,zAnimationAxis,zAnimator,zAnimationFlip,zImageSetSliderVisible,zMouseWheel,zTilesPNG,zTileW,zTileH,zImageFiltersVisible,zInitialImageFilters,zBrightnessVisible,zContrastVisible,zSharpnessVisible,zBlurrinessVisible,zColorRedVisible,zColorGreenVisible,zColorBlueVisible,zColorRedRangeVisible,zColorGreenRangeVisible,zColorBlueRangeVisible,zGammaVisible,zGammaRedVisible,zGammaGreenVisible,zGammaBlueVisible,zHueVisible,zSaturationVisible,zLightnessVisible,zWhiteBalanceVisible,zNormalizeVisible,zEqualizeVisible,zNoiseVisible,zGrayscaleVisible,zThresholdVisible,zInversionVisible,zEdgesVisible,zSepiaVisible,zAnnotationPath,zAnnotationPanelVisible,zAnnotationXMLText,zLabelIconsInternal,zAnnotationJSONObject,zAnnotationsAddMultiple,zAnnotationsAutoSave,zSaveButtonVisible,zLabelClickSelect,zSimplePath,zNoPost,zNoPostDefaults,zUnsavedEditsTest,zAnnotationSort,zMaskVisible,zMaskFadeSpeed,zMaskClearOnUserAction,zFreehandVisible,zTextVisible,zIconVisible,zRectangleVisible,zPolygonVisible,zMarkupMode,zEditMode,zSlidestackPath,zSaveHandlerPath,zSaveImageHandlerPath,zSaveImageFull,zSaveImageFilename,zSaveImageFormat,zSaveImageCompression,zSaveImageBackColor,zTrackingPath,zTrackingEditMode,zTrackingAuto,zTrackingPanelVisible,zInitialTrackingOverlayVisible,zUserLogin,zUserNamePrompt,zUserPath,zUserPanelVisible,zServerIP,zServerPort,zTileHandlerPath,zIIIFScheme,zIIIFServer,zIIIFPrefix,zIIIFIdentifier,zIIIFRegion,zIIIFSize,zIIIFRotation,zIIIFQuality,zIIIFFormat,zImageW,zImageH,zFocal,zQuality";
                break;
            case "z125":
                b = "0";
                break;
            case "z124":
                b = "8192";
                break;
            case "z123":
                b = "1060";
                break;
            case "z90":
                b = "ZoomifyImageFile" == Z.tileSource ? "1024" : "256";
                break;
            case "z90-PFF":
                b = "256";
                break;
            case "z221":
                b = "IIIFImageServer" != Z.tileSource ? "256" : "512";
                break;
            case "z219":
                b = "IIIFImageServer" != Z.tileSource ? "256" : "512";
                break;
            case "z140":
                b = "300";
                break;
            case "z139":
                b = "60000";
                break;
            case "DEFAULT_IMAGELOADQUEUEDELAY":
                b = "100";
                break;
            case "z218":
                b = "1.15";
                break;
            case "z220":
                b = "300";
                break;
            case "z81":
                b = "6";
                break;
            case "z78":
                b = "3";
                break;
            case "z80":
                b = "5";
                break;
            case "z77":
                b = "3";
                break;
            case "z79":
                b = "3";
                break;
            case "z76":
                b = "2";
                break;
            case "z75":
                b = "0";
                break;
            case "z173":
                b = Z.mobileDevice ? "1" : "1.5";
                Z.rotationVisible && (b = "2");
                break;
            case "z173UNCONVERTED":
                b = Z.mobileDevice ? (Z.rotationVisible ? "2" : "1") : "10";
                break;
            case "DEFAULT_z310SIZEMAXBROWSER":
                b = "10000";
                break;
            case "DEFAULT_z310SIZEMAXFIREFOX":
                b = "4000";
                break;
            case "DEFAULT_z310SIZEMAXMOBILE":
                b = "3000";
                break;
            case "DEFAULT_z310SIZEMAXIMAGESET":
                b = "1000";
                break;
            case "z74":
                reTxt = Z.mobileDevice ? "1" : "2";
                break;
            case "z88":
                b = "1";
                break;
            case "DEFAULT_BASEZINDEX":
                b = "2000";
                break;
            case "DEFAULT_VALIDATEVIEWRETRYLIMIT":
                b = "2";
                break;
            case "DEFAULT_VALIDATEVIEWRETRYDELAY":
                b = "1000";
                break;
            case "z104":
                b = "0";
                break;
            case "DEFAULT_MOUSECLICKTHRESHOLDVIEWPORT":
                b = 4;
                break;
            case "DEFAULT_MOUSECLICKTHRESHOLDTIMEVIEWPORT":
                b = 500;
                break;
            case "DEFAULT_MOUSECLICKTHRESHOLDHOTSPOT":
                b = 4;
                break;
            case "DEFAULT_TOUCHTAPTHRESHOLDVIEWPORT":
                b = Z.mobileDevice ? 6 : 4;
                break;
            case "DEFAULT_TOUCHTAPTHRESHOLDTIMEVIEWPORT":
                b = 500;
                break;
            case "DEFAULT_MOUSECLICKTHRESHOLDNAVIGATOR":
                b = 4;
                break;
            case "DEFAULT_TOUCHTAPTHRESHOLDNAVIGATOR":
                b = Z.mobileDevice ? 6 : 3;
                break;
            case "z175":
                b = "5";
                break;
            case "z176":
                b = "10";
                break;
            case "z241":
                b = "5";
                break;
            case "z242":
                b = "0.02";
                break;
            case "z238":
                b = "30";
                break;
            case "z240":
                b = "20";
                break;
            case "z239":
                b = "800";
                break;
            case "z93TIERSKIPTHRESHOLD":
                b = "0.2";
                break;
            case "DEFAULT_ROTATIONSTEPDEGREES":
                b = "1";
                break;
            case "DEFAULT_ROTATIONSTEPDURATION":
                b = "1";
                break;
            case "z122":
                b = "10";
                break;
            case "DEFAULT_AUTORESIZESKIPDURATION":
                b = "10";
                break;
            case "DEFAULT_MOUSEWHEEL":
                b = "1";
                break;
            case "DEFAULT_MOUSEWHEELANIMATION":
                b = "1";
                break;
            case "DEFAULT_MOUSEWHEELSLIDESTACK":
                b = "1";
                break;
            case "z165":
                b = "300";
                break;
            case "z111":
                b = "5";
                break;
            case "z112":
                b = "0.067";
                break;
            case "z146":
                b = "1";
                break;
            case "z164":
                b = "1";
                break;
            case "z92":
                b = "1";
                break;
            case "z93":
                b = "1";
                break;
            case "DEFAULT_DOUBLECLICKZOOM":
                b = "1";
                break;
            case "DEFAULT_DOUBLECLICKDELAY":
                b = "250";
                break;
            case "z95":
                b = "1";
                break;
            case "z95LIMIT":
                b = "2";
                break;
            case "z95STRICT":
                b = "1";
                break;
            case "DEFAULT_SMOOTHPAN":
                b = "1";
                break;
            case "DEFAULT_SMOOTHPANEASING":
                b = "2";
                break;
            case "DEFAULT_SMOOTHPANGLIDE":
                b = "2";
                break;
            case "DEFAULT_SMOOTHZOOM":
                b = "1";
                break;
            case "DEFAULT_SMOOTHZOOMEASING":
                b = "2";
                break;
            case "z143":
                b = null;
                break;
            case "z144":
                b = null;
                break;
            case "z145":
                b = null;
                break;
            case "z163":
                b = null;
                break;
            case "z153":
                b = "1";
                break;
            case "z83":
                b = "#FBFAFA";
                break;
            case "z83NOALPHA":
                b = "#FBFAFA";
                break;
            case "z83LIGHT":
                b = "#FEFEFE";
                break;
            case "z82":
                b = "0.75";
                break;
            case "DEFAULT_BACKGROUNDSMALLDALPHA":
                b = "0.75";
                break;
            case "z87":
                b = "#C0C0C0";
                break;
            case "z200":
                b = "skinFiles.xml";
                break;
            case "z201":
                b = "Assets/Skins/Default";
                break;
            case "z199":
                b = "0";
                break;
            case "z171":
                b = "2";
                break;
            case "z172":
                b = "150";
                break;
            case "z167":
                b = "100";
                break;
            case "z168":
                b = "-1";
                break;
            case "z170":
                b = "-1";
                break;
            case "z166":
                b = null;
                break;
            case "z169":
                b = "#0000FF";
                break;
            case "DEFAULT_NAVIGATORBORDERCOLOR":
                b = "#FFFFFF";
                break;
            case "DEFAULT_GALLERYVISIBLE":
                b = Z.slideshow ? "2" : "0";
                break;
            case "DEFAULT_GALLERYWIDTH":
                b = "-1";
                break;
            case "DEFAULT_GALLERYHEIGHT":
                b = "70";
                break;
            case "DEFAULT_GALLERYMARGIN":
                b = "1";
                break;
            case "DEFAULT_GALLERYLEFT":
                b = "0";
                break;
            case "DEFAULT_GALLERYTOP":
                b = "-1";
                break;
            case "DEFAULT_GALLERYPOSITION":
                b = "1";
                break;
            case "DEFAULT_GALLERYBACKGROUNDALPHA":
                b = "0.5";
                break;
            case "DEFAULT_GALLERYBACKGROUNDCOLOR":
                b = "#696969";
                break;
            case "DEFAULT_GALLERYBACKGROUNDCOLORNOALPHA":
                b = "#696969";
                break;
            case "DEFAULT_GALLERYRECTANGLECOLOR":
                b = "#DDDDDD";
                break;
            case "z223":
                b = "4";
                break;
            case "z222":
                b = "1";
                break;
            case "z224":
                b = "1";
                break;
            case "z128":
                b = "1";
                break;
            case "z150":
                b = "1";
                break;
            case "z149":
                b = null;
                break;
            case "z162":
                b = "1";
                break;
            case "DEFAULT_SLIDERZOOMVISIBLE":
                b = "1";
                break;
            case "z205ZOOM":
                b = "10";
                break;
            case "DEFAULT_ZOOMBUTTONSVISIBLE":
                b = "1";
                break;
            case "z174":
                b = "1";
                break;
            case "DEFAULT_RESETVISIBLE":
                b = "1";
                break;
            case "z121":
                b = "1";
                break;
            case "z119":
                b = "1";
                break;
            case "z120":
                b = "white";
                break;
            case "z118":
                b = "0";
                break;
            case "z141":
                b = "0";
                break;
            case "DEFAULT_BOOKMARKSGET":
                b = "0";
                break;
            case "DEFAULT_BOOKMARKSSET":
                b = "0";
                break;
            case "z232":
                b = "Assets/VirtualPointer/virtualPointer.png";
                break;
            case "DEFAULT_ZOOMRECTANGLE":
                a =
                    Z.comparison ||
                    (null !== Z.imagePath && -1 != Z.imagePath.indexOf("zComparisonPath")) ||
                    ("undefined" !== typeof Z.parameters && null !== Z.parameters && "undefined" !== typeof Z.parameters.zComparisonPath && ("undefined" === typeof Z.parameters.zZoomRectangle || 0 != Z.parameters.zZoomRectangle));
                b = Z.mobileDevice || a || (!Z.proParamsEnabled && !Z.enterpriseParamsEnabled) ? "0" : "1";
                break;
            case "z157":
                b =
                    "undefined" === typeof Z.parameters ||
                    null === Z.parameters ||
                    ("undefined" !== typeof Z.parameters.zMeasureVisible && "0" == Z.parameters.zMeasureVisible) ||
                    (("undefined" === typeof Z.parameters.zMarkupMode || ("1" != Z.parameters.zMarkupMode && "2" != Z.parameters.zMarkupMode)) &&
                        ("undefined" === typeof Z.parameters.zEditMode || ("1" != Z.parameters.zEditMode && "2" != Z.parameters.zEditMode)))
                        ? "0"
                        : "1";
                break;
            case "DEFAULT_FULLVIEWEXITEXTERNALBUTTONCOLOR":
                b = "\t#F8F8F8";
                break;
            case "z190":
                b = "0";
                break;
            case "DEFAULT_ROTATIONFREE":
                b = "0";
                break;
            case "DEFAULT_INITIALR":
                b = "0";
                break;
            case "z184":
                b = "1";
                break;
            case "z182":
                b = "500";
                break;
            case "z183":
                b = " ";
                break;
            case "z183COLOR":
                b = "#000000";
                break;
            case "DEFAULT_MESSAGESVISIBLE":
                b = "1";
                break;
            case "z102":
                b = "#D3D3D3";
                break;
            case "z101":
                b = "#FFFFFF";
                break;
            case "z234":
                b = "0.6";
                break;
            case "z235":
                b = "0.33";
                break;
            case "z237":
                b = "512";
                break;
            case "z236":
                b = "384";
                break;
            case "z233":
                b = "0";
                break;
            case "z103":
                b = "0";
                break;
            case "z196":
                b = "0";
                break;
            case "z193":
                b = "2";
                break;
            case "z194":
                b = "10";
                break;
            case "z198":
                b = "#696969";
                break;
            case "z197":
                b = "150";
                break;
            case "z191":
                b = "30";
                break;
            case "z192":
                b = "-1";
                break;
            case "z195":
                b = "-1";
                break;
            case "z212":
                b = "40";
                break;
            case "z231":
                b = "pixels";
                break;
            case "z156":
                b = "170";
                break;
            case "z155":
                b = "12";
                break;
            case "DEFAULT_MEASURECAPTIONBACKALPHA":
                b = "0.3";
                break;
            case "z154":
                b = "11";
                break;
            case "z100":
                b = "0";
                break;
            case "DEFAULT_GEOCOORDINATESVISIBLE":
                b = "0";
                break;
            case "DEFAULT_PRELOADVISIBLE":
                b = "0";
                break;
            case "DEFAULT_SCREENSAVERSPEED":
                b = "5";
                break;
            case "DEFAULT_MASKFADESPEED":
                b = "5";
                break;
            case "DEFAULT_MASKFADESTEP":
                b = "0.05";
                break;
            case "DEFAULT_MASKCLEARONUSERACTION":
                b = "1";
                break;
            case "DEFAULT_IMAGELISTXMLFILE":
                b = "imageList.xml";
                break;
            case "DEFAULT_IMAGELISTPOSITION":
                b = "2";
                break;
            case "DEFAULT_IMAGELISTSOURCE":
                b = "NAME";
                break;
            case "DEFAULT_IMAGELISTWIDTH":
                b = "200";
                break;
            case "z227":
                b = "destinations.xml";
                break;
            case "z226":
                b = !0;
                break;
            case "z225":
                b = !0;
                break;
            case "DEFAULT_COMPARISONXMLFILE":
                b = "comparison.xml";
                break;
            case "DEFAULT_COMPARISONSYNCVISIBLE":
                b = "1";
                break;
            case "DEFAULT_COMPARISONINITIALSYNC":
                b = "1";
                break;
            case "DEFAULT_COMPARISONSYNC":
                b = "1";
                break;
            case "DEFAULT_TOOLBARLABELFONTSIZE":
                b = "11";
                break;
            case "z209":
                b = "slides.xml";
                break;
            case "DEFAULT_SLIDESHOWAUTOSTART":
                b = !0;
                break;
            case "DEFAULT_SLIDESHOWAUTOLOOP":
                b = !0;
                break;
            case "z203":
                b = "NAME";
                break;
            case "z204":
                b = "200";
                break;
            case "z202":
                b = "2";
                break;
            case "z210":
                b = "2";
                break;
            case "z211":
                b = "0.05";
                break;
            case "z135":
                b = "hotspots.xml";
                break;
            case "z130":
                b = "6";
                break;
            case "z130CANVAS":
                b = "12";
                break;
            case "z161":
                b = "2";
                break;
            case "z152":
                b = "7";
                break;
            case "z129":
                b = "14";
                break;
            case "z160":
                b = "3";
                break;
            case "z151":
                b = "14";
                break;
            case "z115":
                b = "1.8";
                break;
            case "z134":
                b = !0;
                break;
            case "DEFAULT_HOTSPOTSMINSCALE":
                b = "0.2";
                break;
            case "DEFAULT_HOTSPOTSMAXSCALE":
                b = "2";
                break;
            case "z132":
                b = "NAME";
                break;
            case "z133":
                b = "200";
                break;
            case "z131":
                b = "2";
                break;
            case "z116":
                b = "1";
                break;
            case "z217":
                b = "1";
                break;
            case "z136":
                b = "1";
                break;
            case "z189":
                b = "1";
                break;
            case "z181":
                b = "1";
                break;
            case "DEFAULT_ANNOTATIONPANELVISIBLE":
                b = "2";
                break;
            case "DEFAULT_LABELICONSINTERNAL":
                b = "1";
                break;
            case "DEFAULT_ANNOTATIONSADDMULTIPLE":
                b = "1";
                break;
            case "DEFAULT_ANNOTATIONSAUTOSAVE":
                b = "1";
                break;
            case "DEFAULT_ANNOTATIONSAVEBUTTONVISIBLE":
                b = "1";
                break;
            case "DEFAULT_LABELCLICKSELECT":
                b = "0";
                break;
            case "z69":
                b = "annotations.xml";
                break;
            case "z68":
                b = "annotations.json";
                break;
            case "z57":
                b = Z.labelIconsInternal ? "circle" : "circle.png";
                break;
            case "z57TYPE":
                b = "icon";
                break;
            case "z70":
                b = "save";
                break;
            case "z71":
                b = "upload";
                break;
            case "z67":
                b = !0;
                break;
            case "z65":
                b = "220";
                break;
            case "z61":
                b = "257";
                break;
            case "z62":
                b = "11";
                break;
            case "z63":
                b = "11";
                break;
            case "z64":
                b = "11";
                break;
            case "z72SMALL":
                b = "2";
                break;
            case "z72":
                b = "3";
                break;
            case "z53":
                b = "50";
                break;
            case "z51":
                b = "122";
                break;
            case "z55":
                b = "160";
                break;
            case "z54":
                b = "88";
                break;
            case "z56":
                b = "10";
                break;
            case "DEFAULT_ANNOTATIONCOMMENTHEIGHT":
                b = "82";
                break;
            case "z59":
                b = "82";
                break;
            case "z66":
                b = "0";
                break;
            case "z52":
                b = "1";
                break;
            case "z60":
                b = "0";
                break;
            case "DEFAULT_ANNOTATIONCOMMENTVISIBILITY":
                b = "1";
                break;
            case "DEFAULT_LABELICONWIDTH":
                b = "200";
                break;
            case "DEFAULT_LABELICONHEIGHT":
                b = "200";
                break;
            case "DEFAULT_ICONLINEWIDTH":
                b = 3;
                break;
            case "z177":
                b = 2;
                break;
            case "DEFAULT_POLYGONALPHA":
                b = 0.3;
                break;
            case "z180":
                b = 300;
                break;
            case "z96":
                b = "1";
                break;
            case "z98":
                b = "#FFFFFF";
                break;
            case "z89":
                b = "#FFFFFF";
                break;
            case "DEFAULT_CAPTIONBACKCOLOR":
                b = "#000000";
                break;
            case "z177FREEHAND":
                b = 2;
                break;
            case "z113":
                b = "#FFFFFF";
                break;
            case "z216":
                b = "#999999";
                break;
            case "z97":
                b = "10";
                break;
            case "DEFAULT_IMAGESETLISTSOURCE":
                b = "NAME";
                break;
            case "DEFAULT_IMAGESETLISTWIDTH":
                b = "222";
                break;
            case "DEFAULT_IMAGESETLISTPOSITION":
                b = "2";
                break;
            case "DEFAULT_IMAGESETSLIDERVISIBLE":
                b = "1";
                break;
            case "z205IMAGESET":
                b = "10";
                break;
            case "DEFAULT_OVERLAYSVISIBLE":
                b = "1";
                break;
            case "DEFAULT_ANIMATIONOPTIMALMOTIONIMAGES":
                b = "30";
                break;
            case "DEFAULT_ANIMATIONOPTIMALPOSITIONDELTA":
                b = "50";
                break;
            case "DEFAULT_ANIMATIONAXIS":
                b = "horizontal";
                break;
            case "DEFAULT_ANIMATOR":
                b = "motion";
                break;
            case "DEFAULT_ANIMATIONFLIP":
                b = "0";
                break;
            case "z159":
                b = "lightgray";
                break;
            case "z158":
                b = "white";
                break;
            case "DEFAULT_MESSAGEDURATIONLONG":
                b = "5000";
                break;
            case "DEFAULT_MESSAGEDURATIONSTANDARD":
                b = "3000";
                break;
            case "DEFAULT_MESSAGEDURATIONSHORT":
                b = "1500";
                break;
            case "DEFAULT_MESSAGEDURATIONVERYSHORT":
                b = "750";
                break;
            case "z99":
                b = "lightgray";
                break;
            case "DEFAULT_TRACEDISPLAYTEXTFONTSIZE":
                b = "11";
                break;
            case "DEFAULT_TRACEDISPLAYTEXTPADDINGSMALL":
                b = "2";
                break;
            case "z229":
                b = "#D3D3D3";
                break;
            case "z228":
                b = "#FFFFFF";
                break;
            case "DEFAULT_IMAGESETXMLFILE":
                b = Z.animation ? "animation.xml" : Z.overlay ? "overlays.xml" : "slidestack.xml";
                break;
            case "z9":
                b = "Displaying or editing polygon hotspots requires a browser that supports the HTML5 canvas feature.";
                break;
            case "z12":
                b = "Rotation requires a newer browser version. Please consider upgrading to the current release of your browser.";
                break;
            case "z16":
                b = "Viewing Zoomify Images stored in the ZIF format requires a newer browser version. Please consider upgrading to the current release of your browser.";
                break;
            case "z8":
                b = "\nClick the '?' button for help.";
                break;
            case "ALERT_HOWTOEDITMODERECTANGLE":
                b = "\nClick-drag in image to create rectangle.";
                break;
            case "ALERT_HOWTOEDITMODEMEASURE":
                b = "Click in image to measure length.\nAdditional clicks measure perimeter.\nRe-click starting point to measure area.";
                break;
            case "ALERT_PRELOADINGIMAGE-DATA":
                b = "\nPreloading image content...";
                break;
            case "ALERT_PRELOADINGONEIMAGE-LOADINGTILES":
                b = "\nPreloading current view for all zoom levels...";
                break;
            case "ALERT_PRELOADINGIMAGESET-LOADINGTILES":
                b = Z.animation ? "\nPreloading current view for all images:" : "\nPreloading current view for all slides:";
                break;
            case "ALERT_PRELOADINGIMAGESET-UPDATINGVIEW":
                b = Z.animation ? "\nUpdating current view for all images:" : "\nUpdating current view for all slides:";
                break;
            case "ALERT_PRELOADING-STORINGORDRAWINGTILES":
                b = Z.imageSet ? (Z.animation ? "\nDrawing animation:   Image " : "\nDrawing slidestack:   Slide ") : "\nStoring preloaded image:";
                break;
            case "ALERT_LOADINGIMAGESET":
                b = Z.comparison ? "\nLoading comparison images..." : Z.overlays ? "\nLoading overlays..." : Z.animation ? "\nLoading animation images..." : "\nLoading slides...";
                break;
            case "ERROR_ERROR":
                b = "error";
                break;
            case "z287":
                b = "Parameter unrecognized or deprecated - see the Parameters List documentation: ";
                break;
            case "z275":
                b = "Parameter deprecated - please replace: ";
                break;
            case "ERROR_UNSUPPORTEDLOCALSAVING":
                b = "Standard browser security prevents local saving of edits.\nFor details see Developer Resources/Testing Tools/Local Host.";
                break;
            case "z288":
                b = "Use Firefox for local viewing or see READ ME FIRST\nfile for optional settings for other browsers.";
                break;
            case "z290":
                b = "Browsers allow ZIF file viewing only from a web server.\nPlease use Zoomify Image folders for local viewing.";
                break;
            case "z289":
                b = "Browsers allow PFF file viewing only from a web server.\nPlease use Zoomify Image folders for local viewing.";
                break;
            case "z249":
                b = "Image failed to load: possible invalid path, missing image, or network error.";
                break;
            case "z280":
                b = "Sorry!  Part of this view is not refreshing.  The network may be slow, or the website may be missing a file:  ";
                break;
            case "ERROR_VALIDATEVIEW":
                b = "Sorry!  Part of this view is not refreshing. The network\nmay be slow, or the website may be missing a file.  ";
                break;
            case "z280-ZIF":
                b = "Sorry!  Part of this view is not refreshing.  The network may be slow, or the ZIF file may be faulty:  ";
                break;
            case "ERROR_HOTSPOTPOPUPPATHINVALID":
                b = "Hotspot popup graphic failed to load: possible invalid path or missing file.";
                break;
            case "ERROR_HOTSPOTMEDIAPATHINVALID":
                b = "Hotspot media failed to load: possible invalid path, missing file, or legacy hotspot media such as library clip of Flash-based viewer.";
                break;
            case "z246":
                b = "Media of one or more hotspots unsupported: hotspot media of type 'symbol' depend on internal Library of Flash-based viewers.";
                break;
            case "z298":
                b = "Attempt to initiate Edit mode without providing path to Save Handler - server side script or other resource to post XML data.";
                break;
            case "z297":
                b = "Annotations cannot be saved: missing or incorrect save\nhandler path parameter, or missing file on server.";
                break;
            case "z256-ZIFBYTERANGE":
                b = "Error loading image: ZIF file data request failed. Request content type: ";
                break;
            case "z256-ZIFBYTES":
                b = "Error loading image: ZIF file invalid.";
                break;
            case "z295":
                b = "Browser does not support XMLHttpRequest.";
                break;
            case "z256-IMAGEXML":
                b = "Error loading image: please make sure image path in web page matches image folder location on webserver.";
                break;
            case "z256-PFFIMAGEHEADER":
                b = "Error loading image: image header request invalid.";
                break;
            case "z256-PFFIMAGEOFFSET":
                b = "Error loading image: image offset request invalid.";
                break;
            case "z256-PARAMETERSXML":
                b = "Error loading parameters XML: please make sure the zXMLParametersPath value is correct.";
                break;
            case "z256-IMAGELISTXML":
                b = "Error loading image list images: please make sure image list path in web page matches image list folder location on webserver.";
                break;
            case "z256-TOOLBARSKINSXML":
                b =
                    "Error loading toolbar - skin files not found: please verify that the folders 'Assets/Skins/Default' are in same folder as the web page displaying the Viewer, or add zSkinPath parameter to web page. The zSkinPath parameter may be required if using a content management system such as Drupal, Joomla, or WordPress.";
                break;
            case "z256-COMPARISONXML":
                b = "Error loading comparison images: please make sure comparison path in web page matches comparison folder location on webserver.";
                break;
            case "z256-SLIDESXML":
                b = "Error loading slides: please make sure slide path in web page matches slides folder location on webserver.";
                break;
            case "z256-HOTSPOTSXML":
                b = "Error loading hotspots: please make sure hotspot path in web page matches hotspots folder location on webserver.";
                break;
            case "z256-CREATINGANNOTATIONSXMLFILE":
                b = "Error finding annotations XML at location provided.\nCreating new file.";
                break;
            case "z256-ANNOTATIONSXML":
                b = "Error loading annotations: please make sure annotation XML path in web page matches annotation folder location on webserver.";
                break;
            case "z256-ANNOTATIONSJSON":
                b = "Error loading annotations: please make sure annotation JSON path in web page matches annotation folder location on webserver.";
                break;
            case "z256-ANNOTATIONSSAVEHANDLER":
                b = "Error saving annotations: please make sure save handler path in web page matches save handler file location on webserver.";
                break;
            case "z256":
                b = "Error making network request:\npossible invalid path or network error.";
                break;
            case "z272":
                b = "Error related to network security: ";
                break;
            case "z273":
                b = "Error related to network status: ";
                break;
            case "z273RANGEREQUESTS":
                b = "Network error. If using ZIF storage, setting MIME type on web server may be necessary. See READ ME FIRST file in ZIF Storage folder or contact Support: ";
                break;
            case "z244":
                b = " converting XML text to XML doc (DOMParser): ";
                break;
            case "z243":
                b = " converting XML doc to XML text (DOMParser): ";
                break;
            case "z276":
                b = " parsing JSON file to JSON object: ";
                break;
            case "z277":
                b = " parsing JSON label to JSON object: ";
                break;
            case "z294":
                b = "Browser does not support XML DOM.";
                break;
            case "z293":
                b = "XML Doc invalid.";
                break;
            case "z296":
                b = "XML invalid.";
                break;
            case "z255":
                b = "Image XML invalid.";
                break;
            case "z252":
                b = "Image properties XML invalid.";
                break;
            case "z250":
                b = "Image properties invalid.";
                break;
            case "z251":
                b = "Image properties parameter invalid.";
                break;
            case "z254":
                b = "Image tile count does not match value in image XML. If the count is invalid display problems can result.";
                break;
            case "z245":
                b = " while executing callback: ";
                break;
            case "z253":
                b = "\nImage tile request not fulfilled within time period expected";
                break;
            case "ERROR_UNCONVERTEDIMAGEPATHINVALID":
                b = "Unconverted JPEG or PNG image failed to load: possible invalid path, missing image, or network error.";
                break;
            case "ERROR_TRANSLATINGCANVASFORUNCONVERTEDIMAGE":
                b = "\nTranslation of canvas failed";
                break;
            case "ERROR_SCALINGCANVASFORUNCONVERTEDIMAGE":
                b = "\nScaling of canvas failed";
                break;
            case "ERROR_SETTINGTRANSFORMONCANVASFORUNCONVERTEDIMAGE":
                b = "\nTransform on canvas failed";
                break;
            case "z271":
                b = "Navigator image failed to load: possible invalid path, missing image, or network error.";
                break;
            case "z278":
                b = "Skin XML invalid.";
                break;
            case "z279":
                b = "The skin XML file has one or more faulty name lines.";
                break;
            case "z291":
                b = "Virtual pointer graphic failed to load: ";
                break;
            case "z292":
                b = "Watermark image failed to load: ";
                break;
            case "z283":
                b = "Unknown element style - no known method to identify.";
                break;
            case "z284":
                b = "Unknown mouse position - no known method to calculate.";
                break;
            case "z285":
                b = "Unknown mouse scroll - no known method to calculate.";
                break;
            case "z286":
                b = "Unknown window size - no known method to calculate.";
                break;
            case "z360":
                b = "Launch Zoomify Website";
                break;
            case "z363":
                a = Z.hotspots ? "\nAlt-Click: Toggle Hotspot Visibility" : Z.annotations ? "\nAlt-Click: Toggle Label Visibility" : "";
                b = "Minimize Toolbar" + a;
                break;
            case "z341":
                a = Z.hotspots ? "\nAlt-Click: Toggle Hotspot Visibility" : Z.annotations ? "\nAlt-Click: Toggle Label Visibility" : "";
                b = "Expand Toolbar" + a;
                break;
            case "z400":
                b = "Zoom Out";
                break;
            case "z385ZOOM":
                b = "Zoom In And Out";
                break;
            case "z399":
                b = "Zoom In";
                break;
            case "z370":
                b = "Pan Left";
                break;
            case "z372":
                b = "Pan Up";
                break;
            case "z369":
                b = "Pan Down";
                break;
            case "z371":
                b = "Pan Right";
                break;
            case "z378":
                b = "Reset Initial View\nAlt-Click: Prior View";
                break;
            case "z391":
                b = "Enter Full View";
                break;
            case "z391EXIT":
                b = "Exit Full View";
                break;
            case "z391EXITEXTERNAL":
                b = "Exit Full View";
                break;
            case "z342":
                b = "Show Help";
                break;
            case "z342MARKUP":
                b = "Show Markup Help";
                break;
            case "z342ANNOTATION":
                b = "Show Annotation Help";
                break;
            case "z380":
                b = "Rotate Clockwise 90 Degrees";
                break;
            case "z381":
                b = "Rotate Counterwise 90 Degrees";
                break;
            case "TIP_GALLERYSCROLLBUTTONLEFT":
                b = "Scroll Gallery Left";
                break;
            case "TIP_GALLERYSCROLLBUTTONRIGHT":
                b = "Scroll Gallery Right";
                break;
            case "z398":
                b = "Click-Drag To Position";
                break;
            case "z392":
                b = "Begin Measuring";
                break;
            case "z392EXIT":
                b = "Stop Measuring";
                break;
            case "z394":
                b = "Prior Destination";
                break;
            case "z393":
                b = "Next Destination";
                break;
            case "z395":
                b = "Start Tour";
                break;
            case "z396":
                b = "Stop Tour";
                break;
            case "z384":
                b = "Prior Slide";
                break;
            case "z383":
                b = "Next Slide";
                break;
            case "z386":
                b = "Start Slideshow";
                break;
            case "z387":
                b = "Stop Slideshow";
                break;
            case "z321":
                b = "Mute Sound";
                break;
            case "z322":
                b = "Enable Sound";
                break;
            case "TIP_IMAGESETPRIOR":
                b = Z.animation ? "Prior Image" : "Prior Slide";
                break;
            case "z385IMAGESET":
                b = Z.animation ? "Change Image" : "Change Slide";
                break;
            case "TIP_IMAGESETNEXT":
                b = Z.animation ? "Next Image" : "Next Slide";
                break;
            case "TIP_PRELOAD":
                b = Z.imageSet ? (Z.animation ? "Preload Current View For All Images" : "Preload Current View For All Slides") : "Preload All Zoom Levels For Current View";
                break;
            case "TIP_POIGO":
                b = "Go To Point Of Interest";
                break;
            case "TIP_LABELGO":
                b = "Go To Label";
                break;
            case "z337":
                b = "Measurements";
                break;
            case "z342OK":
                b = "Close Help Display";
                break;
            case "z362":
                b = "Accept And Close Message";
                break;
            case "z361":
                b = "Decline And Close Message";
                break;
            case "z332":
                b = "Agree To Copyright And View Images";
                break;
            case "z333":
                b = "Exit And Do Not View Images";
                break;
            case "z382":
                b = "Toggle Full Page View";
                break;
            case "z390":
                b = "Toggle Viewport Display";
                break;
            case "z388":
                b = "Toggle Viewport Backfill";
                break;
            case "z389":
                b = "Toggle Constrain Pan";
                break;
            case "TIP_SYNC":
                b = "Synchronize Viewports";
                break;
            case "z427DISPLAY":
                b = "www.zoomify.com";
                break;
            case "z427":
                b = "http://www.zoomify.com";
                break;
            case "z427TARGET":
                b = "_blank";
                break;
            case "UI_TOOLBARINTERNALBACKGROUNDALPHA":
                b = "0.75";
                break;
            case "UI_TOOLBARINTERNALBACKGROUNDCOLOR":
                b = "lightgray";
                break;
            case "UI_TOOLBARINTERNALBUTTONUPCOLOR":
                b = "white";
                break;
            case "UI_TOOLBARINTERNALBUTTONOVERCOLOR":
                b = "lightgray";
                break;
            case "UI_TOOLBARINTERNALBUTTONDOWNCOLOR":
                b = "darkgray";
                break;
            case "UI_TOOLBARINTERNALBUTTONZOOMINTEXT":
                b = "+";
                break;
            case "UI_TOOLBARINTERNALBUTTONRESETTEXT":
                b = "Z";
                break;
            case "UI_TOOLBARINTERNALBUTTONZOOMOUTTEXT":
                b = "-";
                break;
            case "z439":
                b = "Navigator Bird's Eye View";
                break;
            case "z420":
                b = "X";
                break;
            case "UI_GALLERYACCESSIBILITYALTATTRIBUTE":
                b = "Scrolling Gallery Of Image Thumbnails";
                break;
            case "z441":
                b = " min";
                break;
            case "z440":
                b = " max";
                break;
            case "z442":
                b = "units in %s";
                break;
            case "z431":
                b = "Length: ";
                break;
            case "z431TOTAL":
                b = "Total length: ";
                break;
            case "z433":
                b = "Perimeter: ";
                break;
            case "z430":
                b = "Area: ";
                break;
            case "z434":
                b = "\u00b2";
                break;
            case "z418":
                b = "Agree";
                break;
            case "z419":
                b = "Exit";
                break;
            case "UI_LISTMOUSEDOWNTEXT":
                b = "Select an item...";
                break;
            case "z444":
                b = "Tour Destinations";
                break;
            case "z443":
                b = "Slides";
                break;
            case "z424":
                b = "Hotspots";
                break;
            case "UI_TOOLBARLABELSYNC":
                b = "Sync";
                break;
            case "UI_IMAGESETLISTTITLE":
                b = Z.comparison || Z.overlays ? "" : "ImageSet Slide List";
                break;
            case "UI_IMAGESETSTART":
                b = "0";
                break;
            case "UI_IMAGESETLOOP":
                b = "1";
                break;
            case "UI_IMAGESETSLIDER":
                b = Z.comparison || Z.overlays ? "0" : "1";
                break;
            case "z422":
                b = "430";
                break;
            case "z421":
                b = "300";
                break;
            case "z423":
                b = "OK";
                break;
            case "UI_HELPSCREENCOLOR":
                b = "lightgray";
                break;
            case "UI_HELPBUTTONCOLOR":
                b = "white";
                break;
            case "z437":
                b = "430";
                break;
            case "z436":
                b = "84";
                break;
            case "z435":
                b = "Cancel";
                break;
            case "z438":
                b = "OK";
                break;
            case "z417":
                b = "290";
                break;
            case "z415":
                b = "200";
                break;
            case "z416":
                b = "Mouse Coordinates\nAlt-click, select in list, right-click, Copy";
                break;
            case "UI_GEOCOORDINATESDISPLAYTEXT":
                b = "Latitude & Longitude\nAlt-click, select in list, right-click, Copy";
                break;
            case "UI_IIIFCOORDINATESDISPLAYTEXT":
                b = "IIIF Values For View\nAlt-click, select in list, right-click, Copy";
                break;
            case "UI_TRACEDISPLAYTITLE":
                b = "Trace Values\n\n";
                break;
            case "z445":
                b =
                    "This panel is enabled using the HTML parameter 'zDebug=1' (basic) or 'zDebug=2' (adds tile tracing). It can be called in JavaScript as follows:\n\n   Z.Utils.trace('value to display');  \n\nThe buttons below display or modify important state values.  Web designers new to JavaScript will also benefit from the console, trace, profiling, and other debugging features of leading browsers.";
                break;
            case "UI_TRACEDISPLAYTILESTATUSTEXT":
                b = "Required Cached Requested Loaded Displayed Waiting";
                break;
            case "UI_TRACEDISPLAYELAPSEDTIMETEXT":
                b = "Seconds";
                break;
            case "UI_TRACEDISPLAYTILESPERSECONDTEXT":
                b = "Loads / Second";
                break;
            case "z446":
                b = "Show Globals";
                break;
            case "z449":
                b = "Toggle Display";
                break;
            case "z447":
                b = "Toggle Backfill";
                break;
            case "z448":
                b = "Toggle Constrain Pan";
                break;
            case "z32":
                b =
                    "<p align=%22center%22><font face=%22Arial,Helvetica,sans-serif%22><strong>Viewer Help</strong></font></p><p align=%22justify%22><font face=%22Arial,Helvetica,sans-serif%22>To explore this image, simply <strong>click</strong> the image to zoom, <strong>double-click</strong> to zoom out, or <strong>click-drag</strong> to pan.<br><br>Shortcuts:<br>&nbsp;&nbsp;&nbsp;<strong>Alt-click-drag</strong> to create a <i>zoom-rectangle</i>.<br>&nbsp;&nbsp;&nbsp;<strong>Alt-click</strong> / <strong>Alt-double-click</strong> to zoom fully in / out.<br>&nbsp;&nbsp;&nbsp;<strong>Alt-click-Reset</strong> button to return to the prior view.<br>&nbsp;&nbsp;&nbsp;(Alt is Option on Macintosh).<br><br>The Navigator thumbnail overview can also be clicked or click-dragged to pan.<br><br>Use the Toolbar for exact navigation - if using a mouse, hold it over any button to see a helpful tip.<br><br>Keyboard shortcuts:<br>&nbsp;&nbsp;&nbsp;<strong>a</strong> or <strong>Shift</strong> to zoom in.<br>&nbsp;&nbsp;&nbsp;<strong>z</strong> or <strong>Ctrl</strong> to zoom out.<br>&nbsp;&nbsp;&nbsp;<strong>Arrows</strong> change image in slideshow/animation.<br>&nbsp;&nbsp;&nbsp;<strong>Escape</strong> to reset initial view or exits fullscreen.<br>&nbsp;&nbsp;&nbsp;<strong>&lt;</strong> or <strong>&gt;</strong> to rotate image if rotation buttons visible.<br>&nbsp;&nbsp;&nbsp;<strong>Page Up/Down</strong> change image in slidestack.</font></p>";
                break;
            case "z27":
                b = "Whole Image";
                break;
            case "z34":
                b = "New Hotspot ";
                break;
            case "z33":
                b = "Caption for hotspot ";
                break;
            case "z25":
                b = Z.captionTextColor ? Z.captionTextColor : "#FFFFFF";
                break;
            case "z22":
                b = Z.captionBackColor ? Z.captionBackColor : "#000000";
                break;
            case "z48":
                b = Z.polygonLineColor ? Z.polygonLineColor : "#FFFFFF";
                break;
            case "z46":
                b = Z.polygonFillColor ? Z.polygonFillColor : "#FFFFFF";
                break;
            case "z26":
                b = Z.captionTextVisible ? "1" : "0";
                break;
            case "z23":
                b = Z.captionBackVisible ? "1" : "0";
                break;
            case "z49":
                b = Z.polygonLineVisible ? "1" : "0";
                break;
            case "z47":
                b = Z.polygonFillVisible ? "1" : "0";
                break;
            case "z24":
                b = "8";
                break;
            case "CONTENT_EDITABLE":
                b = "1";
                break;
            default:
                b = "Unexpected resource request";
        }
        return b;
    },
    clearDisplay: function (a) {
        if (a)
            if (Z.useCanvas && "CANVAS" == a.tagName) Z.Utils.clearCanvas(a);
            else for (; a.hasChildNodes(); ) a.removeChild(a.lastChild);
    },
    clearCanvas: function (a) {
        a = a.getContext("2d");
        a.save();
        try {
            a.setTransform(1, 0, 0, 1, 0, 0);
        } catch (b) {
            Z.Utils.showMessage(Z.Utils.getResource("ERROR_SETTINGTRANSFORMONCANVASFORUNCONVERTEDIMAGE")), console.log("In function clearCanvas setting transform on canvas:  " + b);
        }
        a.clearRect(0, 0, a.canvas.width, a.canvas.height);
        a.restore();
    },
    colorCanvas: function (a, b) {
        var c = a.getContext("2d");
        c.save();
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.fillStyle = b;
        //c.fillRect(0, 0, c.canvas.width, c.canvas.height);
		c.fillRect(0, 0, c.canvas.width, c.canvas.height);
        c.restore();
    },
    deleteDiv: function (a) {
        if ((a = document.getElementById(a))) {
            for (; a.hasChildNodes(); ) a.removeChild(a.lastChild);
            a.parentNode.removeChild(a);
        }
    },
    createCallback: function (a, b) {
        for (var c = [], d = 2, e = arguments.length; d < e; d++) c[c.length] = arguments[d];
        return function () {
            for (var d = c.concat([]), e = 0, q = arguments.length; e < q; e++) d[d.length] = arguments[e];
            return b.apply(a, d);
        };
    },
    validateCallback: function (a) {
        "undefined" === typeof Z.callbacks && (Z.callbacks = []);
        var b = Z.callbacks.slice(0);
        Z.Utils.functionCallWithDelay(function () {
            Z.Utils.validateCallbackDelayed(a, b);
        }, 10);
    },
    validateCallbackDelayed: function (a, b) {
        for (var c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            if (e && e.callbackEvent == a && "object" === typeof e && "function" === typeof e.callbackFunction)
                switch (a) {
                    case "viewChanging":
                        e.callbackFunction();
                        break;
                    case "viewPanningGetCurrentCoordinates":
                        var g = Z.Viewport.getCoordinates();
                        e.callbackFunction(g);
                        break;
                    case "viewZoomingGetCurrentZoom":
                        g = Z.Viewport.getZoom();
                        e.callbackFunction(g);
                        break;
                    case "viewChangingGetCurrentCoordinatesFull":
                        g = Z.Viewport.getCoordinatesFull();
                        e.callbackFunction(g);
                        break;
                    default:
                        e.callbackFunction();
                }
        }
        Z.Utils.arrayClear(b);
    },
    getContainerSize: function (a, b) {
        var c = Z.Utils.getElementStyle(a),
            d = parseFloat(c.width),
            e = parseFloat(c.height);
        Z.Utils.stringValidate(c.width) && -1 != c.width.indexOf("%") && (d = parseFloat(Z.Utils.getElementStyleProperty(a, "width")));
        Z.Utils.stringValidate(c.height) && -1 != c.height.indexOf("%") && (e = parseFloat(Z.Utils.getElementStyleProperty(a, "height")));
        isNaN(d) && (d = b.clientWidth);
        isNaN(e) && (e = b.clientHeight);
        if (0 == d || 0 == e)
            (winDimensions = Z.Utils.getWindowSize()), 0 == d && ((a.parentNode.style.width = winDimensions.x + "px"), (d = a.clientWidth)), 0 == e && ((a.parentNode.style.height = winDimensions.y + "px"), (e = a.clientHeight));
        if (isNaN(d) || 0 == d) d = 800;
        if (isNaN(e) || 0 == e) e = 400;
        return new Z.Utils.Point(d, e);
    },
    createContainerElement: function (a, b, c, d, e, g, k, q, t, J, F, Q, W, O, ea, v, u) {
        var w = document.createElement(a);
        this.stringValidate(b) && (w.id = b);
        b = w.style;
        b.display = this.stringValidate(c) ? c : "inline-block";
        b.position = this.stringValidate(d) ? d : "static";
        b.overflow = this.stringValidate(e) ? e : "hidden";
        "canvas" == a ? (this.stringValidate(g) && w.setAttribute("width", g), this.stringValidate(k) && w.setAttribute("height", k)) : (this.stringValidate(g) && (b.width = g), this.stringValidate(k) && (b.height = k));
        this.stringValidate(q) && (b.left = q);
        this.stringValidate(t) && (b.top = t);
        b.borderStyle = this.stringValidate(J) ? J : "none";
        b.borderWidth = this.stringValidate(F) ? F : "0px";
        b.borderColor = "#696969";
        b.background = this.stringValidate(Q) ? Q : "transparent none";
        b.margin = this.stringValidate(W) ? W : "0px";
        b.padding = this.stringValidate(O) ? O : "0px";
        b.whiteSpace = this.stringValidate(ea) ? ea : "normal";
        this.stringValidate(v) && (b.cursor = v);
        "undefined" !== u && u && (Z.Utils.addEventListener(w, "touchstart", Z.Utils.preventDefault), Z.Utils.addEventListener(w, "mousedown", Z.Utils.preventDefault), Z.Utils.addEventListener(w, "contextmenu", Z.Utils.preventDefault));
        return w;
    },
    createCenteredElement: function (a, b) {
        var c = this.createContainerElement("div"),
            d = [];
        d[d.length] = '<div style="#position:relative; display:table; height:100%; width:100%; border:none; margin:0px; padding:0px; overflow:hidden; text-align:left;">';
        d[d.length] = '<div style="#position:absolute; display:table-cell; #top:50%; width:100%; border:none; margin:0px; padding:0px; vertical-align:middle;">';
        d[d.length] = '<div id="' + b + '"; style="#position:relative; width:100%; #top:-50%; border:none; margin:0px; padding:0px; text-align:center;"></div></div></div>';
        c.innerHTML = d.join("");
        for (var d = (c = c.firstChild), e = c.getElementsByTagName("div"); 0 < e.length; ) (d = e[0]), (e = d.getElementsByTagName("div"));
        d.appendChild(a);
        return c;
    },
    createTextElement: function (a, b, c, d, e, g, k, q, t, J, F, Q, W, O, ea, v, u, w) {
        c = Z.Utils.createContainerElement("div", "textBoxFor-" + a, "inline-block", "absolute", "hidden", c, d, e, g, q, t, "white", "0px", k, "normal");
        d = document.createElement("textarea");
        c.appendChild(d);
        e = d.style;
        d.id = a;
        d.value = b;
        d.readOnly = J;
        e.width = "100%";
        e.height = "100%";
        e.margin = "0";
        e.border = "0";
        this.stringValidate(F) && (e.fontFamily = F);
        this.stringValidate(Q) && (e.fontSize = Q);
        this.stringValidate(W) && (e.resize = W);
        this.stringValidate(O) && (d.columns = O);
        this.stringValidate(ea) && (d.rows = ea);
        this.stringValidate(v) && (e.overflowX = v);
        this.stringValidate(u) && (e.overflowY = u);
        this.stringValidate(w) && ((d.wrap = w), "off" == w && (e.whiteSpace = "nowrap"));
        return c;
    },
    createSelectElement: function (a, b, c, d, e, g, k, q, t, J) {
        var F = document.createElement("select");
        F.id = a;
        Z.Utils.stringValidate(b) && "none" != b && (F.options[0] = new Option(b, null));
        a = 0;
        for (b = c.length; a < b; a++) F.options[F.options.length] = new Option(c[a].text, c[a].value);
        Z.Utils.addEventListener(F, "undefined" !== typeof J && null !== J ? J : "change", t);
        c = F.style;
        c.width = d + "px";
        c.position = "absolute";
        c.left = e + "px";
        c.top = g + "px";
        c.fontSize = null == k ? "11px" : k + "px";
        c.fontFamily = "verdana";
        c.visibility = q;
        return F;
    },
    updateSelectElement: function (a, b, c) {
        if (a) {
            var d = -1 != a.selectedIndex ? a.selectedIndex : 0;
            a.innerHTML = "";
            for (var e = 0, g = b.length; e < g; e++) a.options[a.options.length] = new Option(b[e].text, b[e].value.toString());
            "undefined" !== typeof c && null !== c && ((b = parseInt(Z.Utils.arrayIndexOfObjectValue(b, "value", c), 10)), -1 != b && (d = b));
            b = a.options.length - 1;
            a.selectedIndex = d <= b ? d : b;
        }
    },
    getChildElementByID: function (a, b) {
        for (var c = null, d = 0, e = a.childNodes.length; d < e && ((c = a.childNodes[d]), c.id != b) && ((c = Z.Utils.getChildElementByID(c, b)), null === c); d++);
        return c;
    },
    getElementPosition: function (a) {
        for (var b = 0, c = 0, d = "fixed" == this.getElementStyle(a).position, e = this.getOffsetParent(a, d); e; )
            (b += a.offsetLeft), (c += a.offsetTop), d && ((a = this.getPageScroll()), (b += a.x), (c += a.y)), (a = e), (d = "fixed" == this.getElementStyle(a).position), (e = this.getOffsetParent(a, d));
        return new this.Point(b, c);
    },
    getOffsetParent: function (a, b) {
        return b && a != document.body ? document.body : a.offsetParent;
    },
    getElementSize: function (a) {
        return new this.Point(a.clientWidth, a.clientHeight);
    },
    getElementStyle: function (a) {
        if (a.currentStyle) return a.currentStyle;
        if (window.getComputedStyle) return window.getComputedStyle(a, "");
        this.showMessage(this.getResource("z283"));
    },
    getElementStyleProperty: function (a, b) {
        if (window.getComputedStyle) return window.getComputedStyle(a, null).getPropertyValue(b);
        if (a.currentStyle) return a.currentStyle[b];
        this.showMessage(this.getResource("z283"));
    },
    getElementStylePropertyZIndex: function (a) {
        var b = 0;
        window.document.defaultView.getComputedStyle ? (b = window.document.defaultView.getComputedStyle(a, null).getPropertyValue("z-index")) : a.currentStyle ? (b = a.currentStyle["z-index"]) : this.showMessage(this.getResource("z283"));
        return b;
    },
    isElementFluid: function (a) {
        var b = null,
            c = a.cloneNode(!1),
            d = !1,
            e = !1,
            g = null,
            k = null,
            q = 0,
            t = 0,
            J = Z.Utils.getElementStyle(a);
        J && ((q = J.width), (t = J.height), (b = -1 != q.indexOf("px") && -1 != t.indexOf("px")));
        if (Z.browser != Z.browsers.IE || (9 <= Z.browserVersion && !b))
            window.getComputedStyle ? (value = window.getComputedStyle(c, null).width) : c.currentStyle && (value = c.currentStyle.width),
                "undefined" !== typeof value && null !== value && "" !== value && (d = -1 != value.toString().indexOf("%") || "auto" == value),
                d ||
                    (window.getComputedStyle ? (value = window.getComputedStyle(c, null).height) : c.currentStyle && (value = c.currentStyle.height),
                    "undefined" !== typeof value && null !== value && "" != value && (e = -1 != value.toString().indexOf("%") || "auto" == value)),
                d || e || (g = Z.Utils.isElementFluidNew(a)),
                d || e || (k = 0 != parseFloat(q) % 1 || 0 != parseFloat(t) % 1);
        return d || e || g || k;
    },
    isElementFluidNew: function (a) {
        var b = a.cloneNode(!1),
            c,
            d,
            e,
            g,
            k;
        e = d = !1;
        b.style.margin = "0";
        b.style.padding = "0";
        b.style.maxWidth = "none";
        b.style.minWidth = "none";
        c = document.createElement("testContainer");
        c.style.display = "block";
        c.style.width = "800px";
        c.style.padding = "0";
        c.style.margin = "0";
        c.appendChild(b);
        a.parentNode.insertBefore(c, a);
        d = b.offsetWidth;
        c.style.width = "900px";
        b.offsetWidth == d ? (a.parentNode.removeChild(c), (d = !1)) : ((g = Math.floor(0.125 * d)), (k = Math.floor((100 / 900) * b.offsetWidth)), a.parentNode.removeChild(c), (d = g == k ? !0 : !1));
        d ||
            ((b.style.margin = "0"),
            (b.style.padding = "0"),
            (b.style.maxHeight = "none"),
            (b.style.minHeight = "none"),
            (c = document.createElement("testContainer")),
            (c.style.display = "block"),
            (c.style.height = "800px"),
            (c.style.padding = "0"),
            (c.style.margin = "0"),
            c.appendChild(b),
            a.parentNode.insertBefore(c, a),
            (e = b.offsetHeight),
            (c.style.height = "900px"),
            b.offsetHeight == e ? (a.parentNode.removeChild(c), (e = !1)) : ((g = Math.floor(0.125 * e)), (k = Math.floor((100 / 900) * b.offsetHeight)), a.parentNode.removeChild(c), (e = g == k ? !0 : !1)));
        return d || e;
    },
    getEventTargetCoords: function (a) {
        return getElementPosition(Z.Utils.target(a));
    },
    getFirstTouch: function (a) {
        var b = null,
            c = a.touches;
        a = a.changedTouches;
        "undefined" !== typeof c ? (b = c[0]) : "undefined" !== typeof a && (b = a[0]);
        return b;
    },
    getMousePosition: function (a) {
        var b = 0,
            c = 0;
        "DOMMouseScroll" == a.type && Z.browser == Z.browsers.FIREFOX && 3 > Z.browserVersion
            ? ((b = a.screenX), (c = a.screenY))
            : "number" === typeof a.pageX
            ? ((b = a.pageX), (c = a.pageY))
            : "number" === typeof a.clientX
            ? ((b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft), (c = a.clientY + document.body.scrollTop + document.documentElement.scrollTop))
            : console.log(this.getResource("z284"));
        return new this.Point(b, c);
    },
    getMouseScroll: function (a) {
        var b = 0;
        "number" === typeof a.wheelDelta ? (b = a.wheelDelta) : "number" === typeof a.detail ? (b = -1 * a.detail) : this.showMessage(this.getResource("z285"));
        return b ? b / Math.abs(b) : 0;
    },
    getPageScroll: function () {
        var a = 0,
            b = 0,
            c = document.documentElement || {},
            d = document.body || {};
        if ("number" === typeof window.pageXOffset) (a = window.pageXOffset), (b = window.pageYOffset);
        else if (d.scrollLeft || d.scrollTop) (a = d.scrollLeft), (b = d.scrollTop);
        else if (c.scrollLeft || c.scrollTop) (a = c.scrollLeft), (b = c.scrollTop);
        return new this.Point(a, b);
    },
    getScreenSize: function () {
        return new this.Point(screen.width, screen.height);
    },
    getWindowSize: function () {
        var a = 0,
            b = 0,
            c = document.documentElement || {},
            d = document.body || {};
        "number" === typeof window.innerWidth
            ? ((a = window.innerWidth), (b = window.innerHeight))
            : c.clientWidth || c.clientHeight
            ? ((a = c.clientWidth), (b = c.clientHeight))
            : d.clientWidth || d.clientHeight
            ? ((a = d.clientWidth), (b = d.clientHeight))
            : this.showMessage(this.getResource("z286"));
        return new this.Point(a, b);
    },
    Button: function (a, b, c, d, e, g, k, q, t, J, F, Q, W, O, ea, v, u, w, wa, N) {
        a = Z.Utils.createContainerElement("span", a, "inline-block", "absolute", "hidden", k, q, t, J, O, ea, v, u, w, wa, N);
        if (Z.Utils.stringValidate(b)) {
            var ka = document.createTextNode(b);
            a.appendChild(Z.Utils.createCenteredElement(ka));
            Z.Utils.setTextNodeStyle(ka, "black", "verdana", "13px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
        } else {
            c = Z.Utils.stringRemoveTrailingSlashCharacters(c);
            var aa = Z.Utils.createGraphicElement(c + "/" + d),
                U = Z.Utils.createGraphicElement(c + "/" + e),
                Ca = Z.Utils.createGraphicElement(c + "/" + g);
            aa.style.width = U.style.width = Ca.style.width = k;
            aa.style.height = U.style.height = Ca.style.height = q;
            aa.style.position = U.style.position = Ca.style.position = "absolute";
            Z.browser == Z.browsers.FIREFOX && 3 > Z.browserVersion && (aa.style.top = U.style.top = Ca.style.top = "");
            U.style.visibility = Ca.style.visibility = "hidden";
            aa.alt = U.alt = Ca.alt = "";
            "undefined" !== typeof W && Z.Utils.stringValidate(W) && (aa.alt = Z.Utils.getResource(W));
            a.appendChild(aa);
            a.appendChild(U);
            a.appendChild(Ca);
        }
        Z.Utils.addEventListener(a, "mousedown", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "mouseover", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a, "mousedown", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a, "mouseup", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a, "mouseout", Z.Utils.stopPropagation);
        "undefined" !== typeof imageUp &&
            (Z.Utils.addEventListener(aa, "contextmenu", Z.Utils.preventDefault), Z.Utils.addEventListener(U, "contextmenu", Z.Utils.preventDefault), Z.Utils.addEventListener(Ca, "contextmenu", Z.Utils.preventDefault));
        Z.Utils.addEventListener(a, "touchstart", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "touchend", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "touchcancel", Z.Utils.preventDefault);
        Z.Utils.stringValidate(b) || (Z.Utils.disableTextInteraction(ka), Z.Utils.addEventListener(a, "contextmenu", Z.Utils.preventDefault));
        Z.tooltipsVisible && Z.Utils.stringValidate(W) && (a.title = Z.Utils.getResource(W));
        Z.Utils.setButtonHandler(a, F, Q);
        this.elmt = a;
    },
    buttonSize: function (a, b, c) {
        var d = a.style;
        d.width = b + "px";
        d.height = c + "px";
        c = a.firstChild;
        d = a.childNodes[1];
        a = a.childNodes[2];
        c && d && a && ((c.style.width = d.style.width = a.style.width = b + "px"), (c.style.height = d.style.height = a.style.height = b + "px"));
    },
    setButtonDefaults: function (a) {
        Z.Utils.clearButtonSettings(a);
        Z.Utils.setButtonState(a, "up");
        Z.Utils.setButtonHandler(a, "mouseover", Z.Toolbar.z457);
    },
    clearButtonSettings: function (a) {
        var b = a.firstChild,
            c = a.childNodes[1],
            d = a.childNodes[2];
        b &&
            c &&
            d &&
            ((b.style.visibility = c.style.visibility = d.style.visibility = "hidden"),
            Z.Utils.removeEventListener(b, "mouseover", Z.Toolbar.z457),
            Z.Utils.removeEventListener(c, "mousedown", Z.Toolbar.z457),
            Z.Utils.removeEventListener(c, "mouseout", Z.Toolbar.z457),
            Z.Utils.removeEventListener(d, "mouseup", Z.Toolbar.z457),
            Z.Utils.removeEventListener(a, "touchstart", Z.Toolbar.z457),
            Z.Utils.removeEventListener(a, "touchend", Z.Toolbar.z457),
            Z.Utils.removeEventListener(a, "touchcancel", Z.Toolbar.z457));
        Z.Utils.removeEventListener(a, "mouseover", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mousedown", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mouseout", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mouseup", Z.Toolbar.z457);
    },
    setButtonState: function (a, b) {
        var c = "up" == b ? a.firstChild : "down" == b ? a.childNodes[1] : a.childNodes[2];
        c && (c.style.visibility = "visible");
    },
    setButtonHandler: function (a, b, c) {
        c = "undefined" !== c ? c : Z.Toolbar.z457;
        var d = "undefined" !== b ? b : "mouseover";
        if ("mouseover" == b && "undefined" !== typeof a.firstChild) a = a.firstChild;
        else if ("mousedown" != b || "undefined" === typeof a.childNodes[1])
            "mouseup" == b && "undefined" !== typeof a.childNodes[2] ? (a = a.childNodes[2]) : "mouseout" == b && "undefined" !== typeof a.childNodes[1] && (a = a.childNodes[1]);
        Z.Utils.addEventListener(a, "mousedown" == b ? "touchstart" : "touchend", c);
        Z.Utils.addEventListener(a, d, c);
    },
    Checkbox: function (a, b, c, d, e, g, k, q, t) {
        var J = Z.Utils.createContainerElement("div", "containerFor-" + a, "inline-block", "absolute", "hidden", c, d, e, g, "none", "0px", "transparent none", "0px", "0px", "normal"),
            F = document.createElement("input");
        J.appendChild(F);
        F.type = "checkbox";
        F.id = a;
        F.value = b;
        F.width = c;
        F.height = d;
        a = J.style;
        a.width = c + "px";
        a.height = d + "px";
        a.left = e + "px";
        a.top = g + "px";
        Z.Utils.addEventListener(F, k, q);
        Z.Utils.addEventListener(F, "touchstart", q);
        Z.tooltipsVisible && Z.Utils.stringValidate(t) && (F.title = Z.Utils.getResource(t));
        return J;
    },
    Graphic: function (a, b, c, d, e, g, k, q) {
        b = Z.Utils.stringRemoveTrailingSlashCharacters(b);
        b = Z.Utils.createGraphicElement(c ? b + "/" + c : b);
        c = b.style;
        c.width = d;
        c.height = e;
        "undefined" !== typeof q && Z.Utils.stringValidate(q) ? (b.alt = Z.Utils.getResource(q)) : (b.alt = "");
        c = Z.Utils.createContainerElement("span", a, "inline-block", "absolute", "hidden", d, e, g, k, "none", "0px", "transparent none", "0px", "0px", "normal");
        c.appendChild(b);
        this.elmt = c;
        Z.Utils.addEventListener(b, "mousedown", Z.Utils.preventDefault);
        Z.Utils.addEventListener(b, "touchstart", Z.Utils.preventDefault);
        Z.Utils.addEventListener(b, "contextmenu", Z.Utils.preventDefault);
    },
    createGraphicElement: function (a) {
        var b = this.createContainerElement("img"),
            c = null;
        Z.browser == Z.browsers.IE && 7 > Z.browserVersion
            ? ((c = this.createContainerElement("span", null, "inline-block")),
              (b.onload = function () {
                  c.style.width = c.style.width || b.width + "px";
                  c.style.height = c.style.height || b.height + "px";
                  b = b.onload = null;
              }),
              (c.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '", sizingMethod="scale")'))
            : ((c = b), (c.src = a));
        return c;
    },
    graphicSize: function (a, b, c) {
        var d = a.style;
        d.width = b + "px";
        d.height = c + "px";
        a = a.firstChild.style;
        a.width = b + "px";
        a.height = c + "px";
    },
    Point: function (a, b) {
        this.x = "number" === typeof a ? a : 0;
        this.y = "number" === typeof b ? b : 0;
    },
    Point3D: function (a, b, c) {
        this.x = "number" === typeof a ? a : 0;
        this.y = "number" === typeof b ? b : 0;
        this.z = "number" === typeof c ? c : 0;
    },
    Coordinates: function (a, b, c, d) {
        this.x = "number" === typeof a ? a : 0;
        this.y = "number" === typeof b ? b : 0;
        this.z = "number" === typeof c ? c : 0;
        this.r = "number" === typeof d ? d : 0;
    },
    CoordinatesDisplayStyle: function (a, b, c, d, e, g, k, q, t, J, F) {
        this.cLeft = a;
        this.cTop = b;
        this.vWidth = c;
        this.vHeight = d;
        this.vLeft = e;
        this.vTop = g;
        this.bWidth = k;
        this.bHeight = q;
        this.bLeft = t;
        this.bTop = J;
        this.cRotation = F;
    },
    Pair: function (a, b) {
        this.a = a;
        this.b = b;
    },
    Trio: function (a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    },
    Range: function (a, b) {
        this.start = "number" === typeof a ? a : 0;
        this.end = "number" === typeof b ? b : 0;
    },
    RangeScale: function (a, b) {
        this.min = "number" === typeof a ? a : 0;
        this.max = "number" === typeof b ? b : 0;
    },
    swapZIndices: function (a, b) {
        var c = Z.Utils.getElementStylePropertyZIndex(a),
            d = Z.Utils.getElementStylePropertyZIndex(b);
        if ("auto" == c || "auto" == d) (c = (Z.baseZIndex - 101).toString()), (d = (Z.baseZIndex - 100).toString());
        a.style.zIndex = d;
        b.style.zIndex = c;
    },
    stringValidate: function (a) {
        return "undefined" !== typeof a && null !== a && "" !== a && "null" !== a;
    },
    stringReadable: function (a) {
        return a.replace(RegExp("%20", "g"), " ");
    },
    stringGetInitials: function (a) {
        var b = "";
        a &&
            (b = a
                .replace(/[^a-zA-Z- ]/g, "")
                .match(/\b\w/g)
                .join("")
                .toUpperCase());
        return b;
    },
    stringLowerCaseFirstLetter: function (a) {
        return a.charAt(0).toLowerCase() + a.slice(1);
    },
    stringUpperCaseFirstLetter: function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
    },
    stringMultiply: function (a, b) {
        var c = Math.ceil(Math.log(b) / Math.LN2),
            d = a;
        do d += d;
        while (0 < --c);
        return d.slice(0, a.length * b);
    },
    stringPadFront: function (a, b, c) {
        return (a = Z.Utils.stringMultiply(c, b - a.length) + a);
    },
    stringRemoveTrailingSlashCharacters: function (a) {
        return "/" == a.slice(-1, a.length) ? a.slice(0, a.length - 1) : a;
    },
    stringRemoveFileExtension: function (a) {
        var b = a.length;
        "." == a.slice(b - 4, b - 3) && (a = a.slice(0, b - 4));
        return a;
    },
    stringRemoveTabAndLineWrapCharacters: function (a) {
        a = a.replace(/\n/g, "");
        a = a.replace(/\r/g, "");
        return (a = a.replace(/\t/g, ""));
    },
    stringUnescapeAmpersandCharacters: function (a) {
        a = a.replace(/\n/g, "");
        a = a.replace(/&#38;/g, "&");
        a = a.replace(/&#038;/g, "&");
        return (a = a.replace(/&amp;/g, "&"));
    },
    setHTMLTextDefaultCaptionStyle: function (a, b, c, d, e, g, k, q, t, J, F, Q, W) {
        a = a.style;
        -1 == b.indexOf("color=") && (a.color = c);
        -1 == b.indexOf("font-family=") && (a.fontFamily = d);
        -1 == b.indexOf("font-size=") && (a.fontSize = e);
        -1 == b.indexOf("font-size-adjust=") && (a.fontSizeAdjust = g);
        -1 == b.indexOf("font-style=") && (a.fontStyle = k);
        -1 == b.indexOf("font-stretch=") && (a.fontStretch = q);
        -1 == b.indexOf("font-variant=") && (a.fontVariant = t);
        -1 == b.indexOf("font-weight=") && (a.fontWeight = J);
        -1 == b.indexOf("line-height=") && (a.lineHeight = F);
        -1 == b.indexOf("text-align=") && (a.textAlign = Q);
        -1 == b.indexOf("text-decoration=") && (a.textDecoration = W);
    },
    setHTMLTextStyle: function (a, b, c, d, e, g, k, q, t, J, F, Q) {
        a = a.style;
        a.color = b;
        a.fontFamily = c;
        a.fontSize = d;
        a.fontSizeAdjust = e;
        a.fontStyle = g;
        a.fontStretch = k;
        a.fontVariant = q;
        a.fontWeight = t;
        a.lineHeight = J;
        a.textAlign = F;
        a.textDecoration = Q;
    },
    setTextAreaStyle: function (a, b, c, d, e, g, k, q, t, J, F, Q, W) {
        a = a.firstChild.style;
        a.color = b;
        a.fontFamily = c;
        a.fontSize = d;
        a.fontSizeAdjust = e;
        a.fontStyle = g;
        a.fontStretch = k;
        a.fontVariant = q;
        a.fontWeight = t;
        a.lineHeight = J;
        a.textAlign = F;
        a.textDecoration = Q;
        a.padding = W;
    },
    setTextNodeStyle: function (a, b, c, d, e, g, k, q, t, J, F, Q) {
        a = a.parentNode.style;
        a.color = b;
        a.fontFamily = c;
        a.fontSize = d;
        a.fontSizeAdjust = e;
        a.fontStyle = g;
        a.fontStretch = k;
        a.fontVariant = q;
        a.fontWeight = t;
        a.lineHeight = J;
        a.textAlign = F;
        a.textDecoration = Q;
    },
    stringValidateColorValue: function (a) {
        Z.Utils.stringValidate(a) || (a = "#000000");
        0 != a.indexOf("#") && (a = "#" + a);
        return a;
    },
    hexToRGB: function (a) {
        a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, e) {
            return c + c + d + d + e + e;
        });
        return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? { r: parseInt(a[1], 16), g: parseInt(a[2], 16), b: parseInt(a[3], 16) } : null;
    },
    xmlConvertTextToDoc: function (a) {
        var b = null;
        if (window.ActiveXObject)
            try {
                (b = new ActiveXObject("Microsoft.XMLDOM")), (b.async = !1), b.loadXML(a);
            } catch (c) {
                this.showMessage(c.name + this.getResource("z244") + c.message);
            }
        else if (window.DOMParser)
            try {
                b = new DOMParser().parseFromString(a, "text/xml");
            } catch (c) {
                this.showMessage(c.name + this.getResource("z244") + c.message);
            }
        else this.showMessage(this.getResource("z294"));
        return b;
    },
    xmlConvertDocToText: function (a) {
        var b = null;
        if (window.ActiveXObject)
            try {
                b = a.xml;
            } catch (c) {
                this.showMessage(c.name + this.getResource("z243") + c.message);
            }
        else if (window.DOMParser)
            try {
                b = new XMLSerializer().serializeToString(a);
            } catch (c) {
                this.showMessage(c.name + this.getResource("z243") + c.message);
            }
        else this.showMessage(this.getResource("z294"));
        return b;
    },
    xmlEscapeMinimal: function (a) {
        var b = null;
        "undefined" !== typeof a && null !== a && (b = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\r?\n/g, "%0A"));
        return b;
    },
    xmlUnescapeMinimal: function (a) {
        var b = null;
        "undefined" !== typeof a &&
            null !== a &&
            (b = a
                .replace(/%0A/g, "\n")
                .replace(/&apos;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&gt;/g, ">")
                .replace(/&lt;/g, "<")
                .replace(/&amp;/g, "&"));
        return b;
    },
    jsonConvertObjectToXMLText: function (a) {
        var b = function (a, c) {
                var d = "";
                if (a instanceof Array) for (var q = 0, t = a.length; q < t; q++) d += b(a[q], c) + "\n";
                else if ("object" === typeof a) {
                    q = !1;
                    d += "<" + c;
                    for (t in a) "object" !== typeof a[t] ? (d += " " + t + '="' + a[t].toString() + '"') : (q = !0);
                    d += ">";
                    if (q) for (t in a) "#text" == t ? (d += a[t]) : "object" === typeof a[t] && (d += b(a[t], t));
                    d += "</" + c + ">";
                } else d += "<" + c + ">" + a.toString() + "</" + c + ">";
                return d;
            },
            c = "",
            d;
        for (d in a) c += b(a[d], d);
        return c.replace(/&/g, "&amp;").replace(/\t|\n/g, "");
    },
    jsonConvertXMLTextToJSONText: function (a) {
        var b = {
            convertToObject: function (a) {
                var d = {};
                if (1 == a.nodeType) {
                    if (a.attributes.length) for (var e = 0, g = a.attributes.length; e < g; e++) d[a.attributes[e].nodeName] = (a.attributes[e].nodeValue || "").toString();
                    if (a.firstChild) {
                        for (var e = 0, g = !1, k = a.firstChild; k; k = k.nextSibling) 1 == k.nodeType ? (g = !0) : 3 == k.nodeType && k.nodeValue.match(/[^ \f\n\r\t\v]/) && e++;
                        if (g)
                            if (2 > e)
                                for (b.reduceWhitespace(a), k = a.firstChild; k; k = k.nextSibling)
                                    3 == k.nodeType
                                        ? (d["#text"] = b.escapeMinimal(k.nodeValue))
                                        : d[k.nodeName]
                                        ? d[k.nodeName] instanceof Array
                                            ? (d[k.nodeName][d[k.nodeName].length] = b.convertToObject(k))
                                            : (d[k.nodeName] = [d[k.nodeName], b.convertToObject(k)])
                                        : (d[k.nodeName] = b.convertToObject(k));
                            else a.attributes.length ? (d["#text"] = b.escapeMinimal(b.innerXML(a))) : (d = b.escapeMinimal(b.innerXML(a)));
                        else e && (a.attributes.length ? (d["#text"] = b.escapeMinimal(b.innerXML(a))) : (d = b.escapeMinimal(b.innerXML(a))));
                    }
                    a.attributes.length || a.firstChild || (d = null);
                } else 9 == a.nodeType ? (d = b.convertToObject(a.documentElement)) : alert("This node type not supported : " + a.nodeType);
                return d;
            },
            convertToJSONText: function (a, d) {
                var e = d ? '"' + d + '"' : "";
                if (a instanceof Array) {
                    for (var g = 0, k = a.length; g < k; g++) a[g] = b.convertToJSONText(a[g], "", "\t");
                    e += (d ? ":[" : "[") + (1 < a.length ? "\n\t" + a.join(",\n\t") + "\n" : a.join("")) + "]";
                } else if (null == a) e += (d && ":") + "null";
                else if ("object" === typeof a) {
                    g = [];
                    for (k in a) g[g.length] = b.convertToJSONText(a[k], k, "\t");
                    e += (d ? ":{" : "{") + (1 < g.length ? "\n\t" + g.join(",\n\t") + "\n" : g.join("")) + "}";
                } else e = "string" == typeof a ? e + ((d && ":") + '"' + a.toString() + '"') : e + ((d && ":") + a.toString());
                return e;
            },
            reduceWhitespace: function (a) {
                a.normalize();
                for (var d = a.firstChild; d; )
                    if (3 == d.nodeType)
                        if (d.nodeValue.match(/[^ \f\n\r\t\v]/)) d = d.nextSibling;
                        else {
                            var e = d.nextSibling;
                            a.removeChild(d);
                            d = e;
                        }
                    else 1 == d.nodeType && b.reduceWhitespace(d), (d = d.nextSibling);
                return a;
            },
            escapeMinimal: function (a) {
                return a.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r");
            },
            innerXML: function (a) {
                var b = "";
                if ("innerHTML" in a) b = a.innerHTML;
                else {
                    var e = function (a) {
                        var b = "";
                        if (1 == a.nodeType) {
                            for (var b = b + ("<" + a.nodeName), c = 0, d = a.attributes.length; c < d; c++) b += " " + a.attributes[c].nodeName + "='" + (a.attributes[c].nodeValue || "").toString() + "'";
                            if (a.firstChild) {
                                b += ">";
                                for (c = a.firstChild; c; c = c.nextSibling) b += e(c);
                                b += "</" + a.nodeName + ">";
                            } else b += "/>";
                        } else 3 == a.nodeType && (b += a.nodeValue);
                        return b;
                    };
                    for (a = a.firstChild; a; a = a.nextSibling) b += e(a);
                }
                return b;
            },
        };
        9 == a.nodeType && (xml = xml.documentElement);
        return (jsonTextOut = "{\n  " + b.convertToJSONText(b.convertToObject(b.reduceWhitespace(a)), a.nodeName, "\t").replace(/\t/g, "  ") + "\n}");
    },
    arrayClear: function (a) {
        if (a) for (; 0 < a.length; ) a.pop();
    },
    arrayClearObjectValue: function (a, b) {
        for (var c = 0, d = a.length; c < d; c++) a[c][b] = null;
    },
    arrayClone: function (a, b, c) {
        c = [];
        switch (a) {
            case "pois":
                a = 0;
                for (var d = b.length; a < d; a++) c[c.length] = { text: b[a].text, value: b[a].value, id: b[a].id, x: b[a].x, y: b[a].y, z: b[a].z, user: b[a].user, date: b[a].date, editable: b[a].editable };
                break;
            case "labels":
                a = 0;
                for (d = b.length; a < d; a++) c[c.length] = { text: b[a].text, value: b[a].value, poiID: b[a].poiID, editable: b[a].editable };
                break;
            case "hotspots":
                a = 0;
                for (d = b.length; a < d; a++)
                    c[c.length] = {
                        id: b[a].id,
                        name: b[a].name,
                        mediaType: b[a].mediaType,
                        media: b[a].media,
                        audio: b[a].audio,
                        x: b[a].x,
                        y: b[a].y,
                        z: b[a].z,
                        xScale: b[a].xScale,
                        yScale: b[a].yScale,
                        radius: b[a].radius,
                        zMin: b[a].zMin,
                        zMax: b[a].zMax,
                        clickURL: b[a].clickURL,
                        urlTarget: b[a].urlTarget,
                        rollover: b[a].rollover,
                        caption: b[a].caption,
                        tooltip: b[a].tooltip,
                        textColor: b[a].textColor,
                        backColor: b[a].backColor,
                        lineColor: b[a].lineColor,
                        fillColor: b[a].fillColor,
                        textVisible: b[a].textVisible,
                        backVisible: b[a].backVisible,
                        lineVisible: b[a].lineVisible,
                        fillVisible: b[a].fillVisible,
                        captionPosition: b[a].captionPosition,
                        saved: b[a].saved,
                        visibility: b[a].visibility,
                        internalID: b[a].internalID,
                        poiID: b[a].poiID,
                        captionHTML: b[a].captionHTML,
                        tooltipHTML: b[a].tooltipHTML,
                        polyClosed: b[a].polyClosed,
                        polygonPts: b[a].polygonPts,
                        showFor: b[a].showFor,
                        transition: b[a].transition,
                        changeFor: b[a].changeFor,
                        rotation: b[a].rotation,
                        editable: b[a].editable,
                        popup: b[a].popup,
                        popupOffsetX: b[a].popupOffsetX,
                        popupOffsetY: b[a].popupOffsetY,
                        comment: b[a].comment,
                        user: b[a].user,
                        date: b[a].date,
                        iW: b[a].iW,
                        iH: b[a].iH,
                        image: b[a].image,
                    };
                break;
            case "polygon":
                a = 0;
                for (d = b.length; a < d; a++) c[c.length] = { x: b[a].x, y: b[a].y };
                break;
            case "notes":
                a = 0;
                for (d = b.length; a < d; a++) c[c.length] = { text: b[a].text, value: b[a].value, noteText: b[a].noteText, poiID: b[a].poiID, id: b[a].id, user: b[a].user, date: b[a].date, editable: b[a].editable };
                break;
            case "magnifications":
                for (a = 0, d = b.length; a < d; a++) c[c.length] = { text: b[a].text, value: b[a].value };
        }
        return c;
    },
    arrayImageLoadingValidate: function (a) {
        var b = !1;
        if (a && 0 < a.length) for (var b = !0, c = 0, d = a.length; c < d; c++) if (null === a[c] || 0 == a[c].image.width || 0 == a[c].image.height) b = !1;
        return b;
    },
    arrayIndexOf: function (a, b, c) {
        c ? 0 > c && (c = Math.max(0, a.length + c)) : (c = 0);
        for (var d = a.length; c < d; c++) if (a[c] === b) return c;
        return -1;
    },
    arrayIndexOfObjectValue: function (a, b, c, d) {
        if ("undefined" !== typeof a) {
            d ? 0 > d && (d = Math.max(0, a.length + d)) : (d = 0);
            for (var e = a.length; d < e; d++) if (a[d][b] === c) return d;
        }
        return -1;
    },
    arrayIndexOfObjectTwoValues: function (a, b, c, d, e, g) {
        if ("undefined" !== typeof a) {
            d ? 0 > d && (d = Math.max(0, a.length + d)) : (d = 0);
            for (var k = a.length; d < k; d++) if (a[d][b] === c && a[d][e].toString() === g.toString()) return d;
        }
        return -1;
    },
    arrayIndexOfSubstring: function (a, b, c) {
        c ? 0 > c && (c = Math.max(0, a.length + c)) : (c = 0);
        for (var d = a.length; c < d; c++) if (-1 != a[c].indexOf(b)) return c;
        return -1;
    },
    arrayIndexOfObjectValueSubstring: function (a, b, c, d, e) {
        d ? 0 > d && (d = Math.max(0, a.length + d)) : (d = 0);
        for (var g = a.length; d < g; d++)
            if (e) {
                if (-1 != a[d][b].toLowerCase().indexOf(c)) return d;
            } else if (-1 != a[d][b].indexOf(c)) return d;
        return -1;
    },
    arrayIntersect: function (a, b) {
        for (var c, d, e, g = [], k = 0, q = a.length; k < q; k++) {
            c = a[k];
            e = !1;
            for (var t = 0, J = b.length; t < J && c >= (d = b[t]); t++)
                if (d == c) {
                    e = !0;
                    break;
                }
            e && (g[g.length] = a[k]);
        }
        return g;
    },
    arrayMap: function (a, b) {
        var c = [];
        if (Z.arrayMapSupported) c = a.map(b);
        else for (var d = 0, e = a.length; d < e; d++) c[d] = b(a[d]);
        return c;
    },
    arraySplice: function (a, b, c) {
        if (Z.arraySpliceSupported)
            if (3 < arguments.length) for (var d = 3, e = arguments.length; d < e; d++) a.splice(b, c, arguments[d]);
            else a.splice(b, c);
        else {
            0 > c && (c = 0);
            var g = [];
            if (3 < arguments.length) for (d = 3, e = arguments.length; d < e; d++) g[g.length] = arguments[d];
            for (var d = Z.Utils.arraySubarray(a, 0, b), k = Z.Utils.arraySubarrayLen(a, b, c), e = Z.Utils.arraySubarray(a, b + c), g = d.concat(g, e), d = (a.length = 0), e = g.length; d < e; d++) a[a.length] = g[d];
            a = k;
        }
        return a;
    },
    arraySubarraySimple: function (a, b) {
        return this.slice(a, b);
    },
    arraySortNumericAscending: function (a, b, c) {
        a.sort(function (a, b) {
            return a - b;
        });
        return a;
    },
    arraySortNumericDescending: function (a, b, c) {
        a.sort(function (a, b) {
            return b - a;
        });
        return a;
    },
    arraySortByObjectValue: function (a, b, c, d) {
        a.sort(function (a, c) {
            return a[b] > c[b];
        });
        return a;
    },
    arraySubarray: function (a, b, c) {
        0 > b && (b = 0);
        if (!c || c > a.length) c = a.length;
        if (b == c) return [];
        for (var d = []; b < c; b++) d[d.length] = a[b];
        return d;
    },
    arraySubarrayLen: function (a, b, c) {
        if (b >= a.length || (c && 0 >= c)) return [];
        0 > b && (b = Math.abs(b) > a.length ? 0 : a.length + b);
        if (!c || c + b > a.length) c = a.length - b;
        for (var d = [], e = b; e < b + c; e++) d[d.length] = a[e];
        return d;
    },
    arraySubtract: function (a, b) {
        for (var c = a.slice(0), d = 0, e = c.length; d < e; d++) {
            for (var g = c[d], k = !1, q = 0, t = b.length; q < t && g >= (elmt2 = b[q]); q++)
                if (elmt2 == g) {
                    k = !0;
                    break;
                }
            k && (c = Z.Utils.arraySplice(c, d--, 1));
        }
        return c;
    },
    arrayToArrayOfStrings: function (a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = "undefined" !== typeof a[c] && "undefined" != a[c] && null !== a[c] ? a[c].toString() : "";
        return b;
    },
    arrayUnique: function (a) {
        for (var b = 1; b < a.length; ) a[b - 1] == a[b] ? (a = Z.Utils.arraySplice(a, b, 1)) : b++;
        return a;
    },
    arrayUniqueByObjectValue: function (a, b) {
        if ("undefined" !== typeof a) for (var c = 1; c < a.length; ) a[c - 1][b] == a[c][b] ? (a = Z.Utils.arraySplice(a, c, 1)) : c++;
        return a;
    },
    playAudio: function (a, b) {
        Z.audioMuted || ("undefined" !== typeof a && null !== a ? a.play() : Z.Utils.stringValidate(b) && new Audio(b).play());
    },
    loadAudio: function (a) {
        Z.Utils.stringValidate(a) && new Audio(a).load();
    },
    convertZoomPercentToMagnification: function (a, b, c) {
        a = (a * b) / 100;
        c &&
            (a =
                1.5 > a
                    ? 1.25
                    : 2 > a
                    ? 1.5
                    : 2.5 > a
                    ? 2
                    : 4 > a
                    ? 2.5
                    : 5 > a
                    ? 4
                    : 10 > a
                    ? 5
                    : 16 > a
                    ? 10
                    : 20 > a
                    ? 16
                    : 25 > a
                    ? 20
                    : 32 > a
                    ? 25
                    : 40 > a
                    ? 32
                    : 50 > a
                    ? 40
                    : 60 > a
                    ? 50
                    : 100 > a
                    ? 60
                    : 150 > a
                    ? 100
                    : 250 > a
                    ? 150
                    : 250);
        return a;
    },
    calculatePointsDistance: function (a, b, c, d) {
        return Math.sqrt((a -= c) * a + (b -= d) * b);
    },
    convertPixelsToUnits: function (a, b, c) {
        var d = 1;
        "undefined" !== typeof b && null !== b && 0 != b ? (d = b) : "undefined" !== typeof c && null !== c && 0 != c && (d = Z.imageW / c);
        return a / d;
    },
    polygonArea: function (a, b, c, d) {
        if ("undefined" === typeof d || null === d) d = 4;
        a = a.slice(0);
        b ? (a[a.length] = { x: a[0].x, y: a[0].y }) : "undefined" !== typeof c && null !== c && (a[a.length] = { x: c.x, y: c.y });
        for (var e = (c = b = 0), g = a.length - 1; e < g; e++) (b += a[e].x * a[e + 1].y), (c += a[e].y * a[e + 1].x);
        a = Z.Utils.convertPixelsToUnits((b - c) / 2, Z.pixelsPerUnit, Z.unitsPerImage);
        a = Z.Utils.convertPixelsToUnits(a, Z.pixelsPerUnit, Z.unitsPerImage);
        return (a = Z.Utils.roundToFixed(Math.abs(a), d));
    },
    polygonCenter: function (a, b, c) {
        var d = 0,
            e = 0;
        if ("undefined" !== typeof a && null !== a && 0 < a.length) {
            d = a.slice(0);
            b ? (d[d.length] = { x: d[0].x, y: d[0].y }) : "undefined" !== typeof c && null !== c && (d[d.length] = { x: c.x, y: c.y });
            a = d[0];
            e = a.x;
            b = a.y;
            var g = a.x;
            c = a.y;
            for (var k = 1, q = d.length; k < q; k++) (a = d[k]), (e = Math.min(e, a.x)), (b = Math.min(b, a.y)), (g = Math.max(g, a.x)), (c = Math.max(c, a.y));
            d = e + (g - e) / 2;
            e = b + (c - b) / 2;
        }
        return new Z.Utils.Point(d, e);
    },
    polygonDimensions: function (a, b) {
        var c = 0,
            d = 0;
        if ("undefined" !== typeof a && null !== a && 0 < a.length) {
            c = a.slice(0);
            "undefined" !== typeof b && null !== b && (c[c.length] = { x: b.x + 0.1 * (c[c.length - 1].x - b.x), y: b.y + 0.1 * (c[c.length - 1].y - b.y) });
            for (var e = c[0].x, d = c[0].y, g = c[0].x, k = c[0].y, q = 1, t = c.length; q < t; q++) c[q].x < e && (e = c[q].x), c[q].x > g && (g = c[q].x), c[q].y < d && (d = c[q].y), c[q].y > k && (k = c[q].y);
            c = g - e;
            d = k - d;
        }
        return new Z.Utils.Point(c, d);
    },
    polygonPerimeter: function (a, b, c, d) {
        if ("undefined" === typeof d || null === d) d = 5;
        a = a.slice(0);
        b ? (a[a.length] = { x: a[0].x, y: a[0].y }) : "undefined" !== typeof c && null !== c && (a[a.length] = { x: c.x, y: c.y });
        c = b = 0;
        for (var e = a.length - 1; c < e; c++) b += Z.Utils.calculatePointsDistance(a[c].x, a[c].y, a[c + 1].x, a[c + 1].y);
        b = Z.Utils.convertPixelsToUnits(b, Z.pixelsPerUnit, Z.unitsPerImage);
        return (b = Z.Utils.roundToFixed(Math.abs(b), d));
    },
    fullScreenView: function (a, b, c) {
        if ("undefined" === typeof c || null === c) c = !1;
        if (b) {
            b = document.documentElement;
            var d = null;
            b.requestFullScreen
                ? (a.requestFullScreen(), (d = "fullscreenchange"))
                : b.mozRequestFullScreen
                ? (a.mozRequestFullScreen(), (d = "mozfullscreenchange"))
                : b.webkitRequestFullScreen
                ? (a.webkitRequestFullScreen(), (d = "webkitfullscreenchange"))
                : b.msRequestFullscreen && (a.msRequestFullscreen(), (d = "MSFullscreenChange"));
            d && Z.Utils.addEventListener(document, d, Z.Viewport.fullScreenEscapeHandler);
        } else
            document.cancelFullScreen
                ? (c || document.cancelFullScreen(), (d = "fullscreenchange"))
                : document.mozCancelFullScreen
                ? (c || document.mozCancelFullScreen(), (d = "mozfullscreenchange"))
                : document.webkitCancelFullScreen
                ? (c || document.webkitCancelFullScreen(), (d = "webkitfullscreenchange"))
                : document.msExitFullscreen && (c || document.msExitFullscreen(), (d = "MSFullscreenChange")),
                d && Z.Utils.removeEventListener(document, d, Z.Viewport.fullScreenEscapeHandler);
    },
    rotatePoint: function (a, b, c) {
        var d = (Math.PI / 180) * -c;
        c = a * Math.cos(d) - b * Math.sin(d);
        a = a * Math.sin(d) + b * Math.cos(d);
        return new Z.Utils.Point(c, a);
    },
    rotateElement: function (a, b, c) {
        if (b != Z.imageR || c) (b = "rotate(" + b.toString() + "deg)"), (a.transform = b), (a.msTransform = b), (a.mozTransform = b), (a.webkitTransform = b), (a.oTransform = b);
    },
    getPositionRotated: function (a, b, c, d, e) {
        if ("undefined" === typeof e || null === e) e = Z.imageR;
        0 > e && (e += 360);
        e = (e * Math.PI) / 180;
        a -= c;
        var g = b - d;
        b = a * Math.cos(e) - g * Math.sin(e);
        e = a * Math.sin(e) + g * Math.cos(e);
        c = Math.round(b + c);
        d = Math.round(e + d);
        return new Z.Utils.Point(c, d);
    },
    getDisplayPositionRotated: function (a, b) {
        if ("undefined" === typeof b || null === b) b = Z.imageR;
        0 > b && (b += 360);
        var c = parseFloat(a.left),
            d = parseFloat(a.top),
            e = parseFloat(a.width),
            g = parseFloat(a.height);
        return Z.Utils.getPositionRotated(c, d, c + e / 2, d + g / 2, b);
    },
    translateElement: function (a, b, c) {
        b = "translate(" + b.toString() + "px," + c.toString() + "px)";
        a.transform = b;
        a.msTransform = b;
        a.mozTransform = b;
        a.webkitTransform = b;
        a.oTransform = b;
    },
    scaleElement: function (a, b) {
        var c = "scale(" + b.toString() + ")";
        a.transform = c;
        a.msTransform = c;
        a.mozTransform = c;
        a.webkitTransform = c;
        a.oTransform = c;
    },
    intValue: function (a, b) {
        return ((a[b] + (a[b + 1] << 8)) | (a[b + 2] << 16)) + 16777216 * a[b + 3];
    },
    longValue: function (a, b) {
        var c = ((a[b] + (a[b + 1] << 8)) | (a[b + 2] << 16)) + 16777216 * a[b + 3];
        0 != a[b + 4] && (c += 4294967296 * a[b + 4]);
        return c;
    },
    shortValue: function (a, b) {
        return a[b] + (a[b + 1] << 8);
    },
    createUint8Array: function (a, b) {
        return Z.uInt8ArraySupported ? new Uint8Array(a, b) : new Z.Utils.TypedArray(a, b);
    },
    TypedArray: function (a) {
        var b;
        if ("number" === typeof a) {
            b = Array(a);
            for (var c = 0; c < a; ++c) b[c] = 0;
        } else b = a.slice(0);
        b.subarray = Z.Utils.arraySubarraySimple;
        b.buffer = b;
        b.byteLength = b.length;
        b.set = Z.Utils.setSimple;
        "object" === typeof a && a.buffer && (b.buffer = a.buffer);
        return b;
    },
    setSimple: function (a, b) {
        2 > arguments.length && (b = 0);
        for (var c = 0, d = a.length; c < d; ++c, ++b) this[b] = a[c] & 255;
    },
    encodeBase64: function (a) {
        var b,
            c,
            d,
            e,
            g = 0,
            k = 0,
            q = "",
            q = [];
        if (!a) return a;
        do
            (b = a[g++]),
                (c = a[g++]),
                (d = a[g++]),
                (e = (b << 16) | (c << 8) | d),
                (b = (e >> 18) & 63),
                (c = (e >> 12) & 63),
                (d = (e >> 6) & 63),
                (e &= 63),
                (q[k++] =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e));
        while (g < a.length);
        q = q.join("");
        a = a.length % 3;
        return (a ? q.slice(0, a - 3) : q) + "===".slice(a || 3);
    },
    validateResponseArrayFunctionality: function () {
        "ZoomifyImageFile" != Z.tileSource ||
            Z.responseArraySupported ||
            Z.responseArrayPrototyped ||
            (Z.Utils.defineObjectProperty(XMLHttpRequest.prototype, "response", {
                get: function () {
                    return new VBArray(this.responseBody).toArray();
                },
            }),
            (Z.responseArrayPrototyped = !0));
    },
    defineObjectProperty: function (a, b, c) {
        Z.definePropertySupported
            ? Object.defineProperty(a, b, c)
            : (delete a[b],
              "get" in c && a.__defineGetter__(b, c.get),
              "set" in c && a.__defineSetter__(b, c.set),
              "value" in c &&
                  (a.__defineSetter__(b, function (a) {
                      this.__defineGetter__(b, function () {
                          return a;
                      });
                      return a;
                  }),
                  (a[b] = c.value)));
    },
    createImageElementFromBytes: function (a, b) {
        function c(a) {
            d.onload = null;
            d.onabort = null;
            d.onerror = null;
            e && window.clearTimeout(e);
            window.setTimeout(function () {
                b(d);
            }, 1);
        }
        var d = new Image(),
            e = null,
            g = parseFloat(this.getResource("z139")),
            k = function () {
                c(!1);
            };
        d.onload = function () {
            c(!0);
        };
        d.onabort = k;
        d.onerror = k;
        e = window.setTimeout(function () {
            console.log(Z.Utils.getResource("z253"));
            c(!1);
        }, g);
        d.src = a;
    },
    getCurrentUTCDateAsString: function () {
        var a = new Date(),
            b = (10 > a.getUTCMonth() + 1 ? "0" : "") + (a.getUTCMonth() + 1),
            c = (10 > a.getUTCDate() ? "0" : "") + a.getUTCDate(),
            d = (10 > a.getUTCHours() ? "0" : "") + a.getUTCHours(),
            e = (10 > a.getUTCMinutes() ? "0" : "") + a.getUTCMinutes(),
            g = (10 > a.getUTCSeconds() ? "0" : "") + a.getUTCSeconds();
        return a.getUTCFullYear() + b + c + d + e + g;
    },
    cacheProofPath: function (a) {
        a += "?t" + new Date().getTime().toString() + "n" + Z.cacheProofCounter.toString();
        Z.cacheProofCounter += 1;
        return a;
    },
    easing: function (a, b, c, d, e) {
        if ("undefined" === typeof e || null === e) e = Z.smoothZoomEasing;
        var g = b;
        if (Z.smoothZoom && 1 < e)
            switch (e) {
                case 2:
                    c /= d;
                    c--;
                    g = (b - a) * (c * c * c * c * c + 1) + a;
                    break;
                case 3:
                    g = (b - a) * (-Math.pow(2, (-10 * c) / d) + 1) + a;
                    break;
                case 4:
                    (b -= a), (g = 1 > (c /= d / 2) ? (b / 2) * c * c * c * c * c + a : (b / 2) * ((c -= 2) * c * c * c * c + 2) + a);
            }
        return g;
    },
    functionCallWithDelay: function (a, b) {
        window.setTimeout(a, b);
    },
    nodeIsInViewer: function (a) {
        for (var b = !1; 0 == b; )
            if (a) a.id ? ("ViewerDisplay" == a.id ? (b = !0) : (a = a.parentNode)) : (a = a.parentNode);
            else break;
        return b;
    },
    roundToFixed: function (a, b) {
        var c = Math.round(a).toString().length,
            c = b - c,
            c = Math.pow(10, 0 > c ? 0 : c);
        return (a = Math.round(a * c) / c);
    },
    getRandomInt: function (a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    },
    getSign: function (a) {
        return a ? (0 > a ? -1 : 1) : 0;
    },
    drawCrosshairs: function (a, b, c) {
        var d = Z.Utils.createContainerElement("div", "viewportCenterLineVertical", "inline-block", "absolute", "visible", "1px", c + "px", b / 2 + "px", "0px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
        b = Z.Utils.createContainerElement("div", "viewportCenterLineHorizontal", "inline-block", "absolute", "visible", b + "px", "1px", "0px", c / 2 + "px", "solid", "1px", "transparent none", "0px", "0px", "normal", null, !0);
        a.appendChild(b);
        a.appendChild(d);
    },
    configureHelpDisplay: function () {
        var a = Z.helpW,
            b = Z.helpH;
        a >= Z.viewerW && (a = Z.viewerW - 80);
        b >= Z.viewerH && (b = Z.viewerH - 80);
        var c = Z.helpL ? Z.helpL : (Z.viewerW - a) / 2,
            d = Z.helpT ? Z.helpT : (Z.viewerH - b) / 2,
            e = this.getResource("UI_HELPSCREENCOLOR"),
            g = this.getResource("UI_HELPBUTTONCOLOR");
        Z.HelpDisplay = this.createContainerElement("div", "HelpDisplay", "inline-block", "absolute", "hidden", a + "px", b + "px", c + "px", d + "px", "solid", "1px", e, "0px", "0px", "normal", null, !0);
        Z.ViewerDisplay.appendChild(Z.HelpDisplay);
        c = Z.Utils.createContainerElement("div", "helpTextBox", "inline-block", "absolute", "auto", a - 50 + "px", b - 74 + "px", "4px", "4px", "solid", "1px", "white", "0px", "20px", null);
        c.style.overflowY = "auto";
        Z.HelpDisplay.appendChild(c);
        Z.help = document.getElementById("helpTextBox");
        Z.HelpDisplay.style.zIndex = (Z.baseZIndex + 26).toString();
        b = b - 18 - 5;
        a -= 66;
        c = this.getResource("z423");
        g = new Z.Utils.Button("buttonHelpOk", c, null, null, null, null, "56px", "18px", a + "px", b + "px", "mousedown", this.helpOkButtonHandler, "z342OK", "solid", "1px", g, "0px", "0px");
        Z.HelpDisplay.appendChild(g.elmt);
    },
    helpOkButtonHandler: function (a) {
        Z.Utils.hideHelp();
        return !0;
    },
    showHelp: function (a) {
        Z.HelpDisplay || Z.Utils.configureHelpDisplay();
        Z.help && ((Z.help.innerHTML = Z.helpCustom ? Z.helpContent : unescape(a)), (Z.HelpDisplay.style.display = "inline-block"), (document.getElementById("buttonHelpOk").style.display = "inline-block"));
    },
    hideHelp: function () {
        Z.HelpDisplay.style.display = "none";
    },
    configureMessageDisplay: function () {
        var a = parseInt(this.getResource("z437"), 10),
            b = parseInt(this.getResource("z436"), 10),
            c = Z.Utils.getMessageDisplayCoords("6", a, Z.viewerW, Z.viewerH),
            d = this.getResource("z159"),
            e = this.getResource("z158");
        Z.MessageDisplay = this.createContainerElement("div", "MessageDisplay", "inline-block", "absolute", "auto", a + "px", b + "px", c.x + "px", c.y + "px", "solid", "1px", d, "0px", "0px", "normal", null, !0);
        Z.ViewerDisplay.appendChild(Z.MessageDisplay);
        Z.MessageDisplay.style.zIndex = (Z.baseZIndex + 30).toString();
        c = Z.Utils.createTextElement("messageBox", "", a - 18 + "px", b - 40 + "px", "4px", "4px", "4px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
        Z.MessageDisplay.appendChild(c);
        Z.messages = document.getElementById("messageBox");
        b = b - 18 - 5;
        a -= 66;
        c = this.getResource("z438");
        e = new Z.Utils.Button("buttonMessageOk", c, null, null, null, null, "56px", "18px", a + "px", b + "px", "mousedown", this.messageOkButtonHandler, "z362", "solid", "1px", e, "0px", "0px");
        Z.MessageDisplay.appendChild(e.elmt);
    },
    getMessageDisplayCoords: function (a, b, c, d) {
        switch (a) {
            case "1":
                d = a = 40;
                break;
            case "2":
                a = c / 2 - b / 2;
                d = 40;
                break;
            case "3":
                a = c - b - 80;
                d = 40;
                break;
            case "4":
                a = c - b - 40;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 120 : d - 80;
                break;
            case "5":
                a = c / 2 - b / 2;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 120 : d - 80;
                break;
            case "6":
                a = 40;
                d = 0 < Z.toolbarVisible && 8 != Z.toolbarVisible ? d - 120 : d - 80;
                break;
            default:
                (a = c - b), (d = 40);
        }
        return new Z.Utils.Point(a, d);
    },
    messageOkButtonHandler: function (a) {
        Z.Utils.hideMessage();
        Z.Viewport && Z.coordinatesVisible && Z.Viewport.setCoordinatesDisplayVisibility(!1);
        return !0;
    },
    messageCancelButtonHandler: function (a) {
        Z.Utils.hideMessage();
        return !1;
    },
    showMessage: function (a, b, c, d, e, g) {
        if (Z.messagesVisible) {
            Z.MessageDisplay || Z.Utils.configureMessageDisplay();
            if ("undefined" === typeof g || null === g) g = "6";
            var k = parseInt(this.getResource("z437"), 10);
            g = Z.Utils.getMessageDisplayCoords(g, k, Z.viewerW, Z.viewerH);
            Z.MessageDisplay.style.left = g.x + "px";
            Z.MessageDisplay.style.top = g.y + "px";
            Z.MessageDisplay.messageTimer && window.clearTimeout(MessageDisplay.messageTimer);
            g = !0;
            e && (-1 != Z.Utils.arrayIndexOf(Z.messageDisplayList, a) ? (g = !1) : (Z.messageDisplayList[Z.messageDisplayList.length] = a));
            if (
                g &&
                (Z.messages && (Z.messages.value = a),
                (Z.MessageDisplay.style.display = "inline-block"),
                "undefined" !== typeof d && null !== d && (a = document.getElementById("textBoxFor-messageBox")) && (a.firstChild.style.textAlign = d),
                (d = document.getElementById("buttonMessageOk")),
                (a = parseInt(this.getResource("z436"), 10)),
                "undefined" !== typeof b && null !== b && b ? ((d.style.display = "inline-block"), (Z.MessageDisplay.style.height = a + "px")) : ((d.style.display = "none"), (Z.MessageDisplay.style.height = a - 22 + "px")),
                "undefined" !== typeof c && null !== c && !isNaN(c))
            ) {
                "undefined" !== typeof Z.MessageDisplay.messageTimer && null !== Z.MessageDisplay.messageTimer && window.clearTimeout(Z.MessageDisplay.messageTimer);
                if ("undefined" === typeof c || null === c) c = 3e3;
                Z.MessageDisplay.messageTimer = window.setTimeout(Z.Utils.hideMessageTimerHandler, c);
            }
        }
    },
    getMessage: function () {
        var a = "";
        Z.messages && Z.Utils.stringValidate(Z.messages.value) && (a = Z.messages.value);
        return a;
    },
    hideMessage: function () {
        Z.MessageDisplay && (Z.MessageDisplay.style.display = "none");
    },
    hideMessageTimerHandler: function () {
        Z.MessageDisplay.messageTimer && (window.clearTimeout(Z.MessageDisplay.messageTimer), (Z.MessageDisplay.messageTimer = null));
        Z.Utils.hideMessage();
    },
    uploadProgress: function (a) {
        var b = Z.saveImageMessage;
        a.lengthComputable ? ((a = Math.round((100 * a.loaded) / a.total)), (b += a.toString() + "%")) : (b += Z.Utils.getResource("ERROR_IMAGESAVEUNABLETOCOMPUTEPROGRESS"));
        Z.Utils.showMessage(b, !1, "none", "center");
    },
    configureCoordinatesDisplay: function () {
        var a = parseInt(this.getResource("z417"), 10),
            b = parseInt(this.getResource("z415"), 10),
            c = Z.viewerW - a - 20,
            d = Z.viewerH - b - 30,
            e = this.getResource("z99");
        Z.CoordinatesDisplay = this.createContainerElement("div", "CoordinatesDisplay", "inline-block", "absolute", "auto", a + "px", b + "px", c + "px", d + "px", "solid", "1px", e, "0px", "0px", "normal");
        Z.ViewerDisplay.appendChild(Z.CoordinatesDisplay);
        Z.CoordinatesDisplay.style.zIndex = (Z.baseZIndex + 12).toString();
        c = Z.geoCoordinatesVisible ? Z.Utils.getResource("UI_GEOCOORDINATESDISPLAYTEXT") : "IIIFImageServer" == Z.tileSource ? Z.Utils.getResource("UI_IIIFCOORDINATESDISPLAYTEXT") : Z.Utils.getResource("z416");
        c = Z.Utils.createTextElement("coordsLabelBox", c, a - 18 + "px", "28px", "4px", "4px", "4px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
        Z.CoordinatesDisplay.appendChild(c);
        if ((c = document.getElementById("textBoxFor-coordsLabelBox"))) c.firstChild.style.textAlign = "center";
        c = Z.Utils.createTextElement("coordsDisplayBox", "", a - 18 + "px", "18px", "4px", "46px", "4px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
        Z.CoordinatesDisplay.appendChild(c);
        Z.coordinates = document.getElementById("coordsDisplayBox");
        if ((c = document.getElementById("textBoxFor-coordsDisplayBox"))) c.firstChild.style.textAlign = "center";
        a = Z.Utils.createTextElement("coordsSaveBox", "", a - 18 + "px", b - 92 + "px", "4px", "78px", "4px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
        Z.CoordinatesDisplay.appendChild(a);
        Z.coordinatesSave = document.getElementById("coordsSaveBox");
        if ((a = document.getElementById("textBoxFor-coordsSaveBox"))) a.firstChild.style.textAlign = "center";
    },
    showCoordinates: function (a) {
        Z.CoordinatesDisplay || Z.Utils.configureCoordinatesDisplay();
        Z.coordinates && (Z.coordinates.value = a);
    },
    saveCoordinates: function (a) {
        Z.CoordinatesDisplay || Z.Utils.configureCoordinatesDisplay();
        Z.coordinatesSave && (Z.coordinatesSave.value += a + "\n");
    },
    configureTraceDisplay: function () {
        if ("undefined" !== typeof Z.Viewport && null !== Z.Viewport) {
            var a = Z.viewerH - 330,
                b = this.getResource("z229");
            Z.TraceDisplay = this.createContainerElement("div", "TraceDisplay", "inline-block", "absolute", "auto", "280px", "280px", "10px", a + "px", "solid", "1px", b, "0px", "10px", "normal");
            Z.ViewerDisplay.appendChild(Z.TraceDisplay);
            Z.TraceDisplay.style.zIndex = (Z.baseZIndex + 28).toString();
            a = Z.Utils.getResource("UI_TRACEDISPLAYTITLE");
            a = Z.Utils.createTextElement("debugTraces", a, "265px", "155px", "10px", "10px", "5px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
            Z.TraceDisplay.appendChild(a);
            Z.traces = document.getElementById("debugTraces");
            var a = parseInt(Z.Utils.getResource("DEFAULT_TRACEDISPLAYTEXTFONTSIZE"), 10),
                b = parseInt(Z.Utils.getResource("DEFAULT_TRACEDISPLAYTEXTPADDINGSMALL"), 10),
                c = (textH = 16),
                d = a - 2,
                e = Z.Utils.createContainerElement("div", "labelTileStatusTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0),
                g = document.createTextNode(Z.Utils.getResource("UI_TRACEDISPLAYTILESTATUSTEXT"));
            e.appendChild(g);
            Z.TraceDisplay.appendChild(e);
            if ((e = document.getElementById("labelTileStatusTextBox")))
                (g = e.style),
                    (g.width = "275px"),
                    (g.height = c + "px"),
                    (g.left = "10px"),
                    (g.top = "183px"),
                    Z.Utils.setTextNodeStyle(e, "black", "verdana", d + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
            e = 17;
            g = Z.Utils.createTextElement("tilesRequiredTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesRequiredTextElement"))) {
                var k = g.style;
                k.width = "37px";
                k.height = textH + "px";
                k.left = e + "px";
                k.top = "198px";
                Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px");
                e += 45;
            }
            g = Z.Utils.createTextElement("tilesCachedTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesCachedTextElement")))
                (k = g.style),
                    (k.width = "37px"),
                    (k.height = textH + "px"),
                    (k.left = e + "px"),
                    (k.top = "198px"),
                    Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px"),
                    (e += 45);
            g = Z.Utils.createTextElement("tilesRequestedTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesRequestedTextElement")))
                (k = g.style),
                    (k.width = "37px"),
                    (k.height = textH + "px"),
                    (k.left = e + "px"),
                    (k.top = "198px"),
                    Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px"),
                    (e += 45);
            g = Z.Utils.createTextElement("tilesLoadedTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesLoadedTextElement")))
                (k = g.style),
                    (k.width = "37px"),
                    (k.height = textH + "px"),
                    (k.left = e + "px"),
                    (k.top = "198px"),
                    Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px"),
                    (e += 45);
            g = Z.Utils.createTextElement("tilesDisplayedTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesDisplayedTextElement")))
                (k = g.style),
                    (k.width = "37px"),
                    (k.height = textH + "px"),
                    (k.left = e + "px"),
                    (k.top = "198px"),
                    Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px"),
                    (e += 45);
            g = Z.Utils.createTextElement("tilesWaitingTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(g);
            if ((g = document.getElementById("textBoxFor-tilesWaitingTextElement")))
                (k = g.style),
                    (k.width = "37px"),
                    (k.height = textH + "px"),
                    (k.left = e + "px"),
                    (k.top = "198px"),
                    Z.Utils.setTextAreaStyle(g, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px");
            e = Z.Utils.createContainerElement("div", "labelElapsedTimeTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0);
            g = document.createTextNode(Z.Utils.getResource("UI_TRACEDISPLAYELAPSEDTIMETEXT"));
            e.appendChild(g);
            Z.TraceDisplay.appendChild(e);
            if ((e = document.getElementById("labelElapsedTimeTextBox")))
                (g = e.style),
                    (g.width = "85px"),
                    (g.height = c + "px"),
                    (g.left = "15px"),
                    (g.top = "224px"),
                    Z.Utils.setTextNodeStyle(e, "black", "verdana", d + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
            e = Z.Utils.createTextElement("tilesTimeElapsedTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(e);
            if ((e = document.getElementById("textBoxFor-tilesTimeElapsedTextElement")))
                (g = e.style),
                    (g.width = "50px"),
                    (g.height = textH + "px"),
                    (g.left = "67.5px"),
                    (g.top = "220px"),
                    Z.Utils.setTextAreaStyle(e, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px");
            e = Z.Utils.createContainerElement("div", "labelTilesPerSecondTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "nowrap", null, !0);
            g = document.createTextNode(Z.Utils.getResource("UI_TRACEDISPLAYTILESPERSECONDTEXT"));
            e.appendChild(g);
            Z.TraceDisplay.appendChild(e);
            if ((e = document.getElementById("labelTilesPerSecondTextBox")))
                (g = e.style),
                    (g.width = "85px"),
                    (g.height = c + "px"),
                    (g.left = "130px"),
                    (g.top = "224px"),
                    Z.Utils.setTextNodeStyle(e, "black", "verdana", d + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
            c = Z.Utils.createTextElement("tilesPerSecondTextElement", "", "1px", "1px", "1px", "1px", "0px", "solid", "1px", !1, "verdana", "1px", "none", null, 1, "hidden", "hidden", "off");
            Z.TraceDisplay.appendChild(c);
            if ((c = document.getElementById("textBoxFor-tilesPerSecondTextElement")))
                (d = c.style),
                    (d.width = "50px"),
                    (d.height = textH + "px"),
                    (d.left = "215px"),
                    (d.top = "220px"),
                    Z.Utils.setTextAreaStyle(c, "black", "verdana", a + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none", b + "px");
            a = 58;
            b = 10;
            c = this.getResource("z228");
            d = this.getResource("z446");
            d = new this.Button("buttonShowGlobals", d, null, null, null, null, a + "px", "42px", b + "px", "249px", "mousedown", this.showGlobals, "z382", "solid", "1px", c, "0px", "0px");
            Z.TraceDisplay.appendChild(d.elmt);
            b += a + 10;
            d = this.getResource("z449");
            d = new this.Button("buttonToggleDisplay", d, null, null, null, null, a + "px", "42px", b + "px", "249px", "mousedown", Z.Viewport.buttonToggleDisplayHandler, "z390", "solid", "1px", c, "0px", "0px");
            Z.TraceDisplay.appendChild(d.elmt);
            b += a + 10;
            d = this.getResource("z447");
            d = new this.Button("buttonToggleBackfill", d, null, null, null, null, a + "px", "42px", b + "px", "249px", "mousedown", Z.Viewport.buttonToggleBackfillHandler, "z388", "solid", "1px", c, "0px", "0px");
            Z.TraceDisplay.appendChild(d.elmt);
            b += a + 10;
            a += 12;
            d = this.getResource("z448");
            a = new this.Button("buttonToggleConstrainPan", d, null, null, null, null, a + "px", "42px", b + "px", "249px", "mousedown", Z.Viewport.toggleConstrainPan, "z389", "solid", "1px", c, "0px", "0px");
            Z.TraceDisplay.appendChild(a.elmt);
        } else
            window.setTimeout(function () {
                Z.Utils.configureTraceDisplay();
            }, 100);
    },
    showTraces: function () {
        Z.TraceDisplay ? (Z.TraceDisplay.style.display = "inline-block") : Z.Utils.configureTraceDisplay();
    },
    hideTraces: function () {
        Z.TraceDisplay.style.display = "none";
    },
    trace: function (a, b, c) {
        b = b ? "\n" : "";
        c = c ? "\n\n" : "\n";
        Z.TraceDisplay || Z.Utils.configureTraceDisplay();
        Z.traces && ((Z.traces.value += b + a + c), 2 == Z.debug && (Z.traces.scrollTop = Z.traces.scrollHeight));
    },
    traceTileStatus: function (a, b, c, d, e, g) {
        if (!(k && q && t && J && F && Q))
            var k = document.getElementById("tilesRequiredTextElement"),
                q = document.getElementById("tilesCachedTextElement"),
                t = document.getElementById("tilesRequestedTextElement"),
                J = document.getElementById("tilesLoadedTextElement"),
                F = document.getElementById("tilesDisplayedTextElement"),
                Q = document.getElementById("tilesWaitingTextElement");
        k &&
            q &&
            t &&
            J &&
            F &&
            Q &&
            ("undefined" !== typeof a && null !== a && (k.value = a.toString()),
            "undefined" !== typeof b && null !== b && (q.value = b.toString()),
            "undefined" !== typeof c && null !== c && (t.value = c.toString()),
            "undefined" !== typeof d && null !== d && (J.value = d.toString()),
            "undefined" !== typeof e && null !== e && (F.value = e.toString()),
            "undefined" !== typeof g && null !== g && (Q.value = g.toString()));
    },
    traceTileSpeed: function (a, b) {
        if (!c || !d)
            var c = document.getElementById("tilesTimeElapsedTextElement"),
                d = document.getElementById("tilesPerSecondTextElement");
        c && d && ("undefined" !== typeof a && null !== a && (c.value = a.toString()), "undefined" !== typeof b && null !== b && (d.value = Math.round(b).toString()));
    },
    showGlobals: function () {
        var a;
        a = "\n                            ZOOMIFY IMAGE VIEWER - CURRENT VALUES\n";
        a += "\n";
        a += "VIEW:    ";
        a += "Z.imageX=" + Z.imageX + ",   ";
        a += "Z.imageY=" + Z.imageY + ",   ";
        a += "Z.imageZ=" + Z.imageZ + ",   ";
        a += "Z.imageR=" + Z.imageR + ",   ";
        a += "Z.priorX=" + Z.priorX + ",   ";
        a += "Z.priorY=" + Z.priorY + ",   ";
        a += "Z.priorZ=" + Z.priorZ + ",   ";
        a += "Z.priorR=" + Z.priorR + ",   ";
        a += "\n";
        a += "IMAGE & SKIN:    ";
        a += "Z.imagePath=" + Z.imagePath + ",   ";
        a += "Z.skinPath=" + Z.skinPath + ",   ";
        a += "Z.skinMode=" + Z.skinMode + ",   ";
        a += "Z.imageW=" + Z.imageW + ",   ";
        a += "Z.imageH=" + Z.imageH + ",   ";
        a += "tierCount=" + Z.Viewport.getTierCount() + ",   ";
        a += "z320=" + Z.Viewport.getTileW() + ",   ";
        a += "z319=" + Z.Viewport.getTileH() + "\n";
        a += "\n";
        a += "PAGE & BROWSER:    ";
        a += "Z.pageContainer=" + Z.pageContainer + ",   ";
        a += "Z.browser=" + Z.browser + ",   ";
        a += "Z.browserVersion=" + Z.browserVersion + ",   ";
        a += "Z.canvasSupported=" + Z.canvasSupported + ",   ";
        a += "Z.cssTransformsSupported=" + Z.cssTransformsSupported + ",   ";
        a += "Z.cssTransformProperty=" + Z.cssTransformProperty + ",   ";
        a += "Z.cssTransformNoUnits=" + Z.cssTransformNoUnits + ",   ";
        a += "Z.alphaSupported=" + Z.alphaSupported + ",   ";
        a += "Z.renderQuality=" + Z.renderQuality + ",   ";
        a += "Z.rotationSupported=" + Z.rotationSupported + ",   ";
        a += "Z.fullScreenSupported=" + Z.fullScreenSupported + ",   ";
        a += "Z.float32ArraySupported=" + Z.float32ArraySupported + ",   ";
        a += "Z.uInt8ArraySupported=" + Z.uInt8ArraySupported + ",   ";
        a += "Z.xmlHttpRequestSupport=" + Z.xmlHttpRequestSupport + ",   ";
        a += "Z.definePropertySupported=" + Z.definePropertySupported + ",   ";
        a += "Z.responseArraySupported=" + Z.responseArraySupported + ",   ";
        a += "Z.responseArrayPrototyped=" + Z.responseArrayPrototyped + ",   ";
        a += "Z.mobileDevice=" + Z.mobileDevice + ",   ";
        a += "Z.zifSupported=" + Z.zifSupported + ",   ";
        a += "Z.localUse=" + Z.localUse + "\n";
        a += "\n";
        a += "VIEWER OPTIONS & DEFAULTS:    ";
        a += "Z.initialX=" + Z.initialX + ",   ";
        a += "Z.initialY=" + Z.initialY + ",   ";
        a += "Z.initialZ=" + Z.initialZ + ",   ";
        a += "Z.minZ=" + Z.minZ + ",   ";
        a += "Z.maxZ=" + Z.maxZ + ",   ";
        a += "Z.fitZ=" + Z.fitZ + ",   ";
        a += "Z.zoomSpeed=" + Z.zoomSpeed + ",   ";
        a += "Z.panSpeed=" + Z.panSpeed + ",   ";
        a += "Z.fadeInSpeed=" + Z.fadeInSpeed + ",   ";
        a += "Z.toolbarVisible=" + Z.toolbarVisible + ",   ";
        a += "Z.toolbarW=" + Z.toolbarW + ",   ";
        a += "Z.toolbarCurrentW=" + Z.toolbarCurrentW + ",   ";
        a += "Z.toolbarH=" + Z.toolbarH + ",   ";
        a += "Z.toolbarPosition=" + Z.toolbarPosition + ",   ";
        a += "Z.tooltipsVisible=" + Z.tooltipsVisible + ",   ";
        a += "Z.helpVisible=" + Z.helpVisible + ",   ";
        a += "Z.navigatorVisible=" + Z.navigatorVisible + ",   ";
        a += "Z.navigatorW=" + Z.navigatorW + ",   ";
        a += "Z.navigatorH=" + Z.navigatorH + ",   ";
        a += "Z.navigatorL=" + Z.navigatorL + ",   ";
        a += "Z.navigatorT=" + Z.navigatorT + ",   ";
        a += "Z.navigatorFit=" + Z.navigatorFit + ",   ";
        a += "Z.clickZoom=" + Z.clickZoom + ",   ";
        a += "Z.clickPan=" + Z.clickPan + ",   ";
        a += "Z.mousePan=" + Z.mousePan + ",   ";
        a += "Z.keys=" + Z.keys + ",   ";
        a += "Z.constrainPan=" + Z.constrainPan + ",   ";
        a += "Z.constrainPanStrict=" + Z.constrainPanStrict + ",   ";
        a += "Z.smoothPan=" + Z.smoothPan + ",   ";
        a += "Z.smoothPanEasing=" + Z.smoothPanEasing + ",   ";
        a += "Z.minimizeVisible=" + Z.minimizeVisible + ",   ";
        a += "Z.sliderZoomVisible=" + Z.sliderZoomVisible + ",   ";
        a += "Z.zoomButtonsVisible=" + Z.zoomButtonsVisible + ",   ";
        a += "Z.panButtonsVisible=" + Z.panButtonsVisible + ",   ";
        a += "Z.resetVisible=" + Z.resetVisible + ",   ";
        a += "Z.fullScreenVisible=" + Z.fullScreenVisible + ",   ";
        a += "Z.fullPageVisible=" + Z.fullPageVisible + ",   ";
        a += "Z.initialFullPage=" + Z.initialFullPage + ",   ";
        a += "Z.rulerW=" + Z.rulerW + ",   ";
        a += "Z.rulerH=" + Z.rulerH + ",   ";
        a += "Z.rulerL=" + Z.rulerL + ",   ";
        a += "Z.rulerT=" + Z.rulerT + ",   ";
        a += "Z.progressVisible=" + Z.progressVisible + ",   ";
        a += "Z.logoVisible=" + Z.logoVisible + ",   ";
        a += "Z.logoLinkURL=" + Z.logoLinkURL + ",   ";
        a += "Z.logoCustomPath=" + Z.logoCustomPath + ",   ";
        a += "Z.canvas=" + Z.canvas + ",   ";
        a += "Z.debug=" + Z.debug + ",   ";
        a += "Z.imageProperties=" + Z.imageProperties + ",   ";
        a += "Z.serverIP=" + Z.serverIP + ",   ";
        a += "Z.serverPort=" + Z.serverPort + ",   ";
        a += "Z.tileHandlerPath=" + Z.tileHandlerPath + ",   ";
        a += "Z.tileHandlerPathFull=" + Z.tileHandlerPathFull + ",   ";
        a += "Z.tileSource=" + Z.tileSource + ",   ";
        a += "Z.tileType=" + Z.tileType + ",   ";
        a += "\n";
        a += "INTERNAL VALUES:    ";
        a += "\n";
        a += "displayW=" + Z.Viewport.getDisplayW() + ",   ";
        a += "displayH=" + Z.Viewport.getDisplayH() + ",   ";
        a += "tierCurrent=" + Z.Viewport.getTierCurrent() + ",   ";
        a += "tierBackfill=" + Z.Viewport.getTierBackfill() + ",   ";
        a += "tierBackfillDynamic=" + Z.Viewport.getTierBackfillDynamic() + ",   ";
        a += "tierBackfillOversize=" + Z.Viewport.getTierBackfillOversize() + ",   ";
        a += "tierScale=" + Z.Viewport.getTierScale() + ",   ";
        a += "z315=" + Z.Viewport.getTiersScaleUpMax() + ",   ";
        a += "z314=" + Z.Viewport.getTiersScaleDownMax() + ",   ";
        a += "z316=" + Z.Viewport.getTilesCacheMax() + ",   ";
        a += "Z.useCanvas=" + Z.useCanvas + "\n";
        a += "Z.specialStorageEnabled=" + Z.specialStorageEnabled + "\n";
        a += "\n";
        a += "INTERNAL LISTS:    ";
        a += "tierWs=" + Z.Viewport.getTierWs() + ",   ";
        a += "tierHs=" + Z.Viewport.getTierHs() + ",   ";
        a += "tierTileCounts=" + Z.Viewport.getTierTileCounts() + ",   ";
        a += "tilesLoadingNames=" + Z.Viewport.getTilesLoadingNames() + "\n";
        a += "\n";
        alert(a);
    },
};
