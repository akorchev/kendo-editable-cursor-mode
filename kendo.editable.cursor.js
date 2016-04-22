(function(kendo, $) {
  // Alias to the original kendo.ui.Editable because calling kendo.ui.plugin will replace it.
  var Editable = kendo.ui.Editable;

  var DEFAULT_MODE = 'end';

  // Namespace for easier event cleanup on destroy.
  var NS = '.kendo-editable-cursor';

  var EnhancedEditable = Editable.extend({
    init: function(element, options) {
      // Attach the handler before calling the base init method in order to get notified about initial focus.
      $(element).on('focusin' + NS, ':text', $.proxy(this._focus, this));

      Editable.prototype.init.call(this, element, options);
    },
    destroy: function() {
      Editable.prototype.destroy.call(this);

      // Detach all event handlers for this namespace.
      this.element.off(NS);
    },
    _focus: function(e) {
      this._applyCursorMode(e.currentTarget);
    },
    _applyCursorMode: function(target) {
      var mode = DEFAULT_MODE;

      var owner = this.options.target;

      if (owner && owner.options && owner.options.editable) {
        mode = owner.options.editable.cursorMode || DEFAULT_MODE;
      }

      setTimeout(function() {
        if (mode == 'start') {
          target.selectionStart = target.selectionEnd = 0;
        } else if (mode == 'end') {
          target.selectionStart = target.selectionEnd = target.value.length;
        } else if (mode == 'select') {
          target.selectionStart = 0;
          target.selectionEnd = target.value.length;
        }
      }, 0);
    },
    options: {
      // Use the same name as the original kendo.ui.Editable in order to replace it.
      name: 'Editable'
    }
  });

  // Register EnhancedEditable as jQuery.prototype.kendoEditable and kendo.ui.Editable.
  kendo.ui.plugin(EnhancedEditable);
})(kendo, kendo.jQuery);
