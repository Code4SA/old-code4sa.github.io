(function ($) {
    $.easy = {
       		
        rotate: function (_30) {
            var _31 = {
                selector: ".rotate",
                initPause: 0,
                pause: 7000,
                randomize: false,
                callback: function () {}
            };
            if (typeof _30 == "string") {
                _31.selector = _30;
            }
            var _30 = $.extend(_31, _30);
            return $(_30.selector).each(function () {
                var obj = $(this);
                var _32 = $(obj).children().length;
                var _33 = 0;

                function _34() {
                    var ran = Math.floor(Math.random() * _32) + 1;
                    return ran;
                };

                function _35() {
                    if (_30.randomize) {
                        var ran = _34();
                        while (ran == _33) {
                            ran = _34();
                        }
                        _33 = ran;
                    } else {
                        _33 = (_33 == _32) ? 1 : _33 + 1;
                    }
                    $(obj).children().hide();
                    $(obj).children(":nth-child(" + _33 + ")").fadeIn("slow", function () {
                        _30.callback();
                    });
                };

                function _36() {
                    _35();
                    setInterval(_35, _30.pause);
                };
                if (_32 > 1) {
                    setTimeout(_36, _30.initPause);
                }
            });
        }
    };
})(jQuery);

$(function(){	
	$.easy.rotate();
});
