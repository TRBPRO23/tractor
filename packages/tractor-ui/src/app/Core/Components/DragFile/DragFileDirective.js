'use strict';

// Utilities:
var _ = require('lodash');

// Module:
var Core = require('../../Core');

var DragFileDirective = function () {
    return {
        restrict: 'A',

        link: link
    };

    function link ($scope, $element) {
        var element = _.first($element);

        element.draggable = true;
        element.addEventListener('dragstart', _.partial(dragstart, $scope));
        element.addEventListener('dragend', dragend);
    }

    function dragstart ($scope, event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('file', JSON.stringify($scope.item));
        this.classList.add('drag');
        return false;
    }

    function dragend () {
        this.classList.remove('drag');
        return false;
    }
};

Core.directive('tractorDragFile', DragFileDirective);
