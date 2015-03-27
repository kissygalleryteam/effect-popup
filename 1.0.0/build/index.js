KISSY.add('kg/effect-popup/1.0.0/index',["node"],function(S ,require, exports, module) {
 var $ = require('node').all;

function EffectPopup(settings) {
    var p = this,
        defaults = {
            backClass: 'popup_back',
            backOpacity: 0.7,
            containerClass: 'popup_cont',
            closeContent: '<div class="popup_close">&times;</div>',
            markup: '<div class="popup"></div>',
            speed: .3,
            modal: false,
            width: null,
            height: null,
            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {}
        },
        $back,
        $pCont,
        $close,
        $preloader,
        $p;

    p.container = undefined;
    p.o = S.merge(defaults, settings);

    /**
     * Opens a new popup window
     *
     * @param  {string} content
     * @return {void}
     */
    p.open = function(content) {

        // If we're not open already
        if ($back === undefined) {

            // Create back and fade in
            $back = $('<div class="' + p.o.backClass + '"/>')
                .appendTo($('body'));

            // If modal isn't specified, bind click event
            if (p.o.modal) {

                $back.on('click', function() {
                    p.close();
                });

            }

        }
        $back
            .css('opacity', 0)
            .show()
            .animate({
                opacity: p.o.backOpacity
            }, p.o.speed);

        // Do we have a width set?
        p.width = (p.o.width) ? p.o.width : null;

        // Do we have a height set?
        p.height = (p.o.height) ? p.o.height : null;

        // Callback
        p.o.beforeOpen.call(p);

        // Show the content based
        showContent(content);
    }

    /**
     * Centers the popup
     *
     * @return {Object}
     */
    p.center = function(){

        $pCont.css(p.getCenter());

        // Only need force for IE6
        $back.css({
            height : document.documentElement.clientHeight
        });

        return p;

    };

    /**
     * Get the center co-ordinates
     *
     * Returns the top/left co-ordinates to
     * put the popup in the center
     *
     * @return {Object} top/left keys
     */
    p.getCenter = function(){

        var pW = $pCont.children().outerWidth(true),
            pH = $pCont.children().outerHeight(true),
            wW = document.documentElement.clientWidth,
            wH = document.documentElement.clientHeight;

        return {
            top : wH * 0.5 - pH * 0.5,
            left : wW * 0.5 - pW * 0.5
        };

    };

    /**
     * Close the popup
     *
     * @return {Object}
     */
    p.close = function(){

        p.o.beforeClose.call(p);

        if( $back !== undefined && $pCont !== undefined ){

            // Fade out the content
            $pCont.animate({
                'opacity' : 0,
                'transform' : 'scale(0)'
            }, p.o.speed, 'easeInStrong', function(){});
            // Fade out the back
            $back.animate({
                'opacity' : 0
            }, p.o.speed,'easeNone',function(){
                $back.hide();
                p.o.afterClose.call(p);
            });

        }

        return p;

    };

    /**
     * Clean up the popup
     *
     * @return {Object}
     */
    p.cleanUp = function(){

        $back.add($pCont).remove();

        // $pCont = $back = undefined;

        // Unbind the resize event
        $(window).detach('resize', p.center);

        return p;

    };

    /**
     * Shows the content
     *
     * @param  {string} content
     * @return {void}
     */
    function showContent(content) {

        // If we're not open already
        if ($pCont === undefined) {

            // Create the container
            $pCont = $('<div class="' + p.o.containerClass + '">');

            // Add in the popup markup
            $p = $(p.o.markup)
                .appendTo($pCont);

            // Add in the close button
            $close = $(p.o.closeContent)
                .on('click', function() {
                    p.close();
                })
                .appendTo($pCont);

            // Bind the resize event
            $(window).on('resize',p.center);

            // Append the container to the body
            $pCont.appendTo($('body'));

            p.container = $pCont;
        }
        $pCont.css({
            'opacity': 0,
            'transform':'scale(0)'
        });

        // Do we have a set width/height?
        $p.css('width', p.width||'');
        $p.css('height', p.height||'');

        // Put the content in place!
        $p.html(content);

        // Center the popup
        p.center();

        // Animate in
        $pCont.animate({
            'opacity' : 1,
            'transform':'scale(1)'
        }, p.o.speed,'backOut', function(){
            // Call the open callback
            p.o.afterOpen.call(p);
        });

    }

}

module.exports = EffectPopup;
});