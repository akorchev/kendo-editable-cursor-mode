# Cursor mode feature for editable Kendo UI widgets

This library adds the ability to specify the initial cursor position when the user focuses a text element inside an editable Kendo UI widget.

## Supported modes
- `start` puts the cursor at the start of the text.
- `end` puts the cursor at the end of the text (**default**)
- `select` selects the whole text.

## Usage

1. Include kendo.editable.cursor.js after **all** other Kendo UI JavaScript files.
2. Set the `editable.cursorMode` option of your editable Kendo UI widget.

```JavaScript
$('#grid').kendoGrid({
  /* other options */
  editable: {
    cursorMode: 'select'
  }
});
```
