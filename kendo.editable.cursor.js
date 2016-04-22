(function(kendo, $) {

  var Editable = kendo.ui.Editable;

  var NS = '.kendo-editable-cursor';

  var EnhancedEditable = Editable.extend({
    init: function(element, options) {
      $(element).on('focusin' + NS, ':text', $.proxy(this._focus, this));

      Editable.prototype.init.call(this, element, options);
    },
    destroy: function() {
      Editable.prototype.destroy.call(this);

      this.element.off(NS);
    },
    _focus: function(e) {
      var target = e.currentTarget;

      this._select(target)
    },
    _select: function(target) {
      var mode = $('#selection').val();

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