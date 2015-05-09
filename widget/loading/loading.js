X.add({
    name: 'Loading',
    single: true,
    opt: {
        msg: '正在加载',
        className: 'xloading'
    },
    _init: function () {
        this.addStyle(this.getCss());
        this.on(document, "DOMContentLoaded", function (e) {
            var hasEl = true;
            this.el = this.$('.xloading');
            if (!this.el) {
                this.el = this.df('<div class="xloading"><div><span></span><label>正在加载</label></div></div>')
                hasEl = false;
            }
            this.elLabel = this.$('label', this.el);
            !hasEl && document.body.appendChild(this.el);
        });
    },
    show: function (time) {
        this.css({
            visibility: 'visible',
            opacity: 1
        });

        if (time) {
            setTimeout(function () {
                this.hide();
            }.bind(this), time * 1000);
        }
    },
    hide: function () {
        this.css({
            'opacity': 0,
            visibility: 'hidden'
        });
    },
    setMsg: function (msg) {
        this.elLabel.textContent = msg;
        return this;
    },
    getCss: function () {
        var s = '\
            .xloading{\
                position: fixed;\
                width: 100%;\
                height: 100%;\
                left: 0;\
                top: 0;\
                background: RGBA(0, 0, 0, 0.1);\
                text-align: center;\
                 -webkit-transition:  200ms ease;\
                -webkit-transition-property:opacity,visibility;\
                opacity:1;\
                z-index: 1001;\
            }\
            .xloading>div{\
                -webkit-box-sizing: border-box;\
                position: absolute;\
                left: 50%;\
                top: 50%;\
                min-width: 90px;\
                min-height: 80px;\
                margin-left: -45px;\
                margin-top: -40px;\
                padding: 9px 20px;\
                color: #fff;\
                background-color: rgba(0, 0, 0, .8);\
                font-size: 12px;\
                border-radius: 5px;\
            }\
            .xloading>div>span{\
                display: block;\
                -webkit-animation:xloading-rotate linear 2.6s infinite;\
            }\
            .xloading>div>span:before{\
                content: "";\
                display: block;\
                height: 35px;\
                width: 35px;\
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAABGCAYAAAC5bsoXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NkZDNUJFRkZBQzExMUUzQUUyOTlBRkYzOTk3QTIxOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NkZDNUJGMEZBQzExMUUzQUUyOTlBRkYzOTk3QTIxOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2RkM1QkVERkFDMTExRTNBRTI5OUFGRjM5OTdBMjE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk2RkM1QkVFRkFDMTExRTNBRTI5OUFGRjM5OTdBMjE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+n09dKgAAEEdJREFUeNrsXQmQ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) no-repeat;\
                -webkit-background-size: 105px auto;\
                background-size: 105px auto;\
                background-position: -70px 0;\
                margin: 5px auto 8px;\
            }\
            @-webkit-keyframes xloading-rotate{\
                0%{\
                    -webkit-transform:rotate(0deg);\
                }\
                100%{\
                    -webkit-transform:rotate(360deg);\
                }\
            }\
            ';
        return s;
    }

});