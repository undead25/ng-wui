import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var UIProgressCircle = (function () {
    function UIProgressCircle() {
    }
    UIProgressCircle.decorators = [
        { type: Component, args: [{
                    selector: 'ui-progress-circle',
                    templateUrl: 'progress-circle.html'
                },] },
    ];
    /** @nocollapse */
    UIProgressCircle.ctorParameters = [];
    return UIProgressCircle;
}());
export var UIProgressCircleModule = (function () {
    function UIProgressCircleModule() {
    }
    UIProgressCircleModule.forRoot = function () {
        return {
            ngModule: UIProgressCircleModule,
            providers: []
        };
    };
    UIProgressCircleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [UIProgressCircle],
                    declarations: [UIProgressCircle],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    UIProgressCircleModule.ctorParameters = [];
    return UIProgressCircleModule;
}());
