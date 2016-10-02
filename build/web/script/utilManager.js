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