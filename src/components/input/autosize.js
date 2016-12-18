import { Directive, ElementRef, Input } from '@angular/core';
// from angular material2 https://github.com/angular/material2
export var TextareaAutosize = (function () {
    function TextareaAutosize(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(TextareaAutosize.prototype, "_minHeight", {
        get: function () {
            return this.minRows ? this.minRows * this._cachedLineHeight + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextareaAutosize.prototype, "_maxHeight", {
        get: function () {
            return this.maxRows ? this.maxRows * this._cachedLineHeight + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    TextareaAutosize.prototype.ngOnInit = function () {
        this._cacheTextareaLineHeight();
        this.resizeToFitContent();
    };
    TextareaAutosize.prototype.resizeToFitContent = function () {
        var textarea = this._elementRef.nativeElement;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + "px";
    };
    TextareaAutosize.prototype._cacheTextareaLineHeight = function () {
        var textarea = this._elementRef.nativeElement;
        var textareaClone = textarea.cloneNode(false);
        textareaClone.rows = 1;
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textarea.parentNode.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.offsetHeight;
        textarea.parentNode.removeChild(textareaClone);
    };
    TextareaAutosize.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[autosize]',
                    host: {
                        '(input)': 'resizeToFitContent()',
                        '[style.min-height]': '_minHeight',
                        '[style.max-height]': '_maxHeight',
                    }
                },] },
    ];
    /** @nocollapse */
    TextareaAutosize.ctorParameters = [
        { type: ElementRef, },
    ];
    TextareaAutosize.propDecorators = {
        'minRows': [{ type: Input },],
        'maxRows': [{ type: Input },],
    };
    return TextareaAutosize;
}());
