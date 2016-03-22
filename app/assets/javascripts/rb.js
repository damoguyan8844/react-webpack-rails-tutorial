var RB = window.RB = window.RB?window.RB:{};
(function(){
    var cookies;

    RB.readCookie = function (name,c,C,i){
        if(cookies){ return cookies[name]; }

        c = document.cookie.split('; ');
        cookies = {};

        for(i=c.length-1; i>=0; i--){
            C = c[i].split('=');
            cookies[C[0]] = C[1];
        }

        return cookies[name];
    };

    //wiewport and Layout change
    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    };
    RB.viewport = viewport;
    RB.isMobileLayout = function(){
        return viewport().width < 768;
    }
    var _layoutListeners = [];
    var _sizeListeners = [];
    var _scrollListeners= [];
    var _preSize = viewport();
    RB.addChangeLayoutListener = function(listener){
        if(listener  && typeof(listener) == 'function'){
            _layoutListeners.push(listener);
            return function(){
                this.removeChangeLayoutListener(listener);
            }
        }
        return null;
    }
    RB.removeChangeLayoutListener = function(listener){
        if(listener){
            var index = _layoutListeners.indexOf(listener);
            if(index != -1){
                _layoutListeners.splice(index,1);
            }
        }
    }
    RB.addResizeListener = function(listener){
        if(listener  && typeof(listener) == 'function'){
            _sizeListeners.push(listener);
            return function(){
                this.removeResizeListener(listener);
            }
        }
        return null;
    }
    RB.removeResizeListener = function(listener){
        if(listener){
            var index = _sizeListeners.indexOf(listener);
            if(index != -1){
                _sizeListeners.splice(index,1);
            }
        }
    }
    RB.addScrollListener = function(listener){
        if(listener  && typeof(listener) == 'function'){
            _scrollListeners.push(listener);
            return function(){
                this.removeScrollListener(listener);
            }
        }
        return null;
    }
    RB.removeScrollListener = function(listener){
        if(listener){
            var index = _scrollListeners.indexOf(listener);
            if(index != -1){
                _scrollListeners.splice(index,1);
            }
        }
    }
    window.addEventListener('resize', function(e){
        var vp = viewport();
        var w = vp.width;
        var preWidth = _preSize.width;
        var becomeMobile = false;
        var becomeDesktop = false;
        if(preWidth >=768 && w<768){
            becomeMobile = true;
        }
        if(preWidth < 768 && w >= 768 ){
            becomeDesktop = true;
        }
        if(becomeMobile || becomeDesktop){
            for (var i=0; i<_layoutListeners.length; i++ ){
                _layoutListeners[i](becomeMobile,becomeDesktop);
            }
        }
        for (i=0; i<_sizeListeners.length; i++){
            _sizeListeners[i](_preSize,vp);
        }
        _preSize = vp;
    });

    window.addEventListener('scroll',function(e){
        for (var i=0; i<_scrollListeners.length; i++ ){
            _scrollListeners[i](e);
        }
    })

    // stop scrollbar event propagation
    RB.preventScrollPropagation = function(ev) {
            console.log('scrolling detail')
            var $this = $(this),
                scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = $this.height(),
                delta = ev.originalEvent.wheelDelta,
                up = delta > 0;

            var prevent = function() {
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                return false;
            }

            if (!up && -delta > scrollHeight - height - scrollTop) {
                // Scrolling down, but this will take us past the bottom.
                $this.scrollTop(scrollHeight);
                return prevent();
            } else if (up && delta > scrollTop) {
                // Scrolling up, but this will take us past the top.
                $this.scrollTop(0);
                return prevent();
            }
    }

    Dropzone.autoDiscover = false;
    //fix bugs for browser to crossdomain issue when cropper photos
    $.fn.cropper.setDefaults({
        checkCrossOrigin: false,
        checkOrientation:false
    });

   // window.socket = RB.socket = io({transports: ['polling'], 'force new connection': true});
})();



