/*global jQuery */

(function ($) {
    /* Strict mode for this plugin */
    "use strict";
    /*jslint browser: true */

    $.fn.gridStack = function (params) {
        var settings, gridStack;
        gridStack = $(this);

        /* Specify default settings */
        settings = {
            minValue: 17,
            maxValue: 25
        };

        /* Override default settings with provided params, if any */
        if (params !== undefined) {
            $.extend(settings, params);
        } else {
            params = settings;
        }

        /* features */


        $( window ).resize(function(e) {
            /* on resize, what ? */
        });

        /* init */

        return this;
    };

}(jQuery));