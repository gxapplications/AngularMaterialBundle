
/*global jQuery */
(function ($) {
    /* Strict mode for this plugin */
    "use strict";
    /*jslint browser: true */

    $.fn.gridStack = function (params) {
        var settings, gridStack, getLanes, setLanes, resizeItem, compileAngularElement;
        gridStack = $(this);

        /* Specify default settings */
        settings = {
            matrix: [
                {id: 1, w: 1, h: 1, x: 0, y: 0},
                {id: 2, w: 1, h: 2, x: 0, y: 1},
                {id: 3, w: 2, h: 2, x: 1, y: 0},
                {id: 4, w: 1, h: 1, x: 1, y: 2},
                {id: 5, w: 2, h: 1, x: 2, y: 2},
                {id: 6, w: 1, h: 1, x: 3, y: 0}
            ],
            widthHeightRatio: 264 / 294,
            lanes: 3,
            elementPrototype: 'li.position-card',
            elementLoaderUrl: false,
            onChange: function(changedItems, matrix) {},
            draggableParams: {},
        };
        /* Override default settings with provided params, if any */
        if (params !== undefined) {
            $.extend(settings, params);
        } else {
            params = settings;
        }

        /* Resize grid */
        getLanes = function() {
            return settings.lanes;
        };
        gridStack.getLanes = getLanes;
        setLanes = function(size) {
            settings.lanes = size;
            gridStack.gridList('resize', settings.lanes);
        };
        gridStack.setLanes = setLanes;

        /* Resize item */
        resizeItem = function(itemElement, w, h) {
            gridStack.gridList('resizeItem', itemElement, { w: w, h: h });
        };
        gridStack.resizeItem = resizeItem;

        /* Compile angular element after insertion into DOM */
        compileAngularElement = function(elSelector) {
            var elSelector = (typeof elSelector == 'string') ? elSelector : null ;
            // The new element to be added
            if (elSelector != null ) {
                var $div = $( elSelector );
                // The parent of the new element
                var $target = $("[ng-app]");
                angular.element($target).injector().invoke(['$compile', function ($compile) {
                    var $scope = angular.element($target).scope();
                    $compile($div)($scope);
                    // Finally, refresh the watch expressions in the new element
                    $scope.$apply();
                }]);
            }
        };
        gridStack.compileAngularElement = compileAngularElement;

        // TODO: fonctions angular, fonction de chargement auto apres init (ajax -> <li>.html() -> compileAngularElement): via un callback ? -> comme un 'tpl' dans ce cas !

        /* browser resized event */
        $( window ).resize(function(e) {
            gridStack.gridList('reflow');
        });

        /* init */
        var item, i, $item;
        for (i = 0; i < settings.matrix.length; i++) {
            item = settings.matrix[i];
            $item = $(settings.elementPrototype, gridStack).first().clone();
            $item.attr({
                'data-w': item.w,
                'data-h': item.h,
                'data-x': item.x,
                'data-y': item.y,
                'data-id': item.id
            });
            gridStack.append($item);
            // auto load inner content
            if (settings.elementLoaderUrl != false) {
                $('li.position-card[data-id="' + item.id + '"] > .inner', gridStack).first().load(
                    settings.elementLoaderUrl,
                    {id: item.id},
                    function () {
                        gridStack.compileAngularElement(this);
                    }
                );
            }
        }
        $(settings.elementPrototype, gridStack).first().remove(); // remove prototype element
        gridStack.gridList({
            direction: 'vertical',
            lanes: settings.lanes,
            widthHeightRatio: settings.widthHeightRatio,
            heightToFontSizeRatio: 0.25,
            onChange: function(changedItems) {

                // TODO: update settings.matrix:
                // loop over changedItems, use their id. then loop into matrix to find the same one and update them.
                settings.onChange(changedItems, settings.matrix);
            }
        }, settings.draggableParams );

        return gridStack;
    };

}(jQuery));
