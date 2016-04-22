(function(kendo, $) {

  var Editable = kendo.ui.Editable;

  var NS = '.kendo-editable-cursor';

  var EnhancedEditable = Editable.extend({
    init: function(element, options) {
      $(element).on('focusin' + NS, ':text', $.proxy(this._focus, this));

      var target = options ? options.target : null;

      if (target && target.options.editable) {
        this._mode = target.options.editable.cursorMode || 'end';
      }

      Editable.prototype.init.call(this, element, options);
    },
    destroy: function() {
      Editable.prototype.destroy.call(this);

      this.element.off(NS);
    },
    _mode: 'end',
    _focus: function(e) {
      var target = e.currentTarget;

      this._select(target)
    },
    _select: function(target) {
      var mode = this._mode;

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
      name: 'Editable'
    }
  });

  kendo.ui.plugin(EnhancedEditable);

})(kendo, kendo.jQuery);
