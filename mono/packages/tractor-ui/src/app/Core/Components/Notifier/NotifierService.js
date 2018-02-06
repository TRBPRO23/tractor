'use strict';

// Utilities:
var _ = require('lodash');

// Module:
var Core = require('../../Core');

var NotifierService = function (
    $interval
) {
    var NotificationTypes = {
        SUCCESS: 'success',
        INFO: 'info',
        ERROR: 'error'
    };

    var notifications = [];

    return {
        success: success,
        info: info,
        error: error,
        dismiss: dismiss,
        notifications: notifications
    };

    function addNotification (notification) {
        notifications.push(notification);
        $interval(_.noop, 0, 1);
        $interval(function () {
            dismiss(notification);
        }, 10000, 1);
    }

    function success (message) {
        addNotification({
            message: message,
            type: NotificationTypes.SUCCESS
        });
    }

    function info (message) {
        addNotification({
            message: message,
            type: NotificationTypes.INFO
        });
    }

    function error (message) {
        addNotification({
            message: message,
            type: NotificationTypes.ERROR
        });
    }

    function dismiss (toRemove) {
        _.remove(notifications, function (notification) {
            return notification === toRemove;
        });
    }
};

Core.service('notifierService', NotifierService);
