import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceNumber } from '../util';
export var UIPagination = (function () {
    function UIPagination() {
        // 总记录数
        this._totalRecords = 0;
        // 
        this.pageSize = 0;
    }
    Object.defineProperty(UIPagination.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (value) {
            this._totalRecords = coerceNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    // getPage():number {
    //   return Math.floor
    // }
    UIPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ui-pagination',
                    templateUrl: 'pagination.html'
                },] },
    ];
    /** @nocollapse */
    UIPagination.ctorParameters = [];
    UIPagination.propDecorators = {
        'totalRecords': [{ type: Input },],
        'pageSize': [{ type: Input },],
    };
    return UIPagination;
}());
export var UIPaginationModule = (function () {
    function UIPaginationModule() {
    }
    UIPaginationModule.forRoot = function () {
        return {
            ngModule: UIPaginationModule
        };
    };
    UIPaginationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [UIPagination],
                    declarations: [UIPagination]
                },] },
    ];
    /** @nocollapse */
    UIPaginationModule.ctorParameters = [];
    return UIPaginationModule;
}());
