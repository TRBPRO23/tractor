/*{"name":"tractor-confirm-dialog","elements":[{"name":"confirm message"},{"name":"ok button"},{"name":"cancel button"}],"actions":[{"name":"ok","parameters":[]},{"name":"cancel","parameters":[]},{"name":"get confirm message","parameters":[]}],"version":"0.5.2"}*/
module.exports = function () {
    var TractorConfirmDialog = function TractorConfirmDialog(parent) {
        var find = parent ? parent.element.bind(parent) : element;
        this.confirmMessage = find(by.css('.dialog__wrapper .dialog__content p'));
        this.okButton = find(by.css('.dialog__wrapper tractor-action[action="Ok"] button'));
        this.cancelButton = find(by.css('.dialog__wrapper tractor-action[action="Cancel"] button'));
    };
    TractorConfirmDialog.prototype.ok = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.okButton.click();
        });
        return result;
    };
    TractorConfirmDialog.prototype.cancel = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.cancelButton.click();
        });
        return result;
    };
    TractorConfirmDialog.prototype.getConfirmMessage = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.confirmMessage.getText();
        });
        return result;
    };
    return TractorConfirmDialog;
}();