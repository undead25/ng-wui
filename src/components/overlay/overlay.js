import { Injectable } from '@angular/core';
export var UIOverlay = (function () {
    function UIOverlay() {
        var _this = this;
        this.eventHandlers = new Map();
        this.eventHandlers.set('click', function (event) {
            _this.handleClick(event);
        });
    }
    // 创建并显示遮罩层
    UIOverlay.prototype.create = function () {
        var overlayDiv = document.createElement('div');
        overlayDiv.classList.add('ui-overlay');
        overlayDiv.classList.add('fade');
        document.body.appendChild(overlayDiv);
        setTimeout(function () {
            overlayDiv.classList.add('active');
        }, 1);
        this.overlayElement = overlayDiv;
    };
    // 隐藏并移除遮罩层
    UIOverlay.prototype.remove = function () {
        var el = this.overlayElement;
        if (el) {
            el.classList.remove('active');
            el.addEventListener('transitionend', function (event) {
                if (event.propertyName === 'opacity') {
                    el.parentNode.removeChild(el);
                }
                ;
            });
        }
    };
    UIOverlay.prototype.handleClick = function (event) {
    };
    UIOverlay.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UIOverlay.ctorParameters = [];
    return UIOverlay;
}());
export var OVERLAY_PROVIDERS = UIOverlay;
