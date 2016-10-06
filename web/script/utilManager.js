function getUtilManager() {
    return Object.seal({
        getScrollBarWidth: function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2)
                w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        },
        removeScrollbarAbsolute: function (element) {
            //WORKS BEST WITH NO MARGIN
            var scrollBarWidth = this.getScrollBarWidth();
            var originalPadding = Number($(element).css('padding-right').replace('px', ''));
            var newPadding = scrollBarWidth + originalPadding;
            $(element).css('padding-right', newPadding + 'px');

        }
    });
}
//function lightenColor(hex, lightIncrease) {
//    var rgb = hexToRgb(hex);
//    rgb.r = rgb.r + Math.round((255 - rgb.r) * lightIncrease);
//    rgb.g = rgb.g + Math.round((255 - rgb.g) * lightIncrease);
//    rgb.b = rgb.b + Math.round((255 - rgb.b) * lightIncrease);
//    return rgbToHex(rgb.r, rgb.g, rgb.b);
//}
//function componentToHex(c) {
//    console.log(c);
//    var hex = c.toString(16);
//    return hex.length == 1 ? "0" + hex : hex;
//}
//
//function rgbToHex(r, g, b) {
//    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//}
//
//function hexToRgb(hex) {
//    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//    return result ? {
//        r: parseInt(result[1], 16),
//        g: parseInt(result[2], 16),
//        b: parseInt(result[3], 16)
//    }
//    : null;
//}