import { Directive, ElementRef, Input } from '@angular/core';

// from angular material2 https://github.com/angular/material2

@Directive({
  selector: 'textarea[autosize]',
  host: {
    '(input)': 'resizeToFitContent()',
    '[style.min-height]': '_minHeight',
    '[style.max-height]': '_maxHeight',
  }
})
export class TextareaAutosize {
  @Input() minRows: number;
  @Input() maxRows: number;

  private _cachedLineHeight: number;

  constructor(private _elementRef: ElementRef) { }

  get _minHeight() {
    return this.minRows ? `${this.minRows * this._cachedLineHeight}px` : null;
  }

  get _maxHeight() {
    return this.maxRows ? `${this.maxRows * this._cachedLineHeight}px` : null;
  }

  ngOnInit() {
    this._cacheTextareaLineHeight();
    this.resizeToFitContent();
  }

  resizeToFitContent() {
    let textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
    textarea.style.height = 'auto';

    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  private _cacheTextareaLineHeight(): void {
    let textarea = this._elementRef.nativeElement as HTMLTextAreaElement;

    let textareaClone = textarea.cloneNode(false) as HTMLTextAreaElement;
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
  }

}
