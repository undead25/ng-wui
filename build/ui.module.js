import { NgModule } from '@angular/core';
import { UIButtonModule } from './button';
import { UIDialogModule } from './dialog';
import { UIInputModule } from './input';
import { UIProgressCircleModule } from './progress-circle';
import './style/style.scss';
var MODULES = [
    UIButtonModule,
    UIDialogModule,
    UIInputModule,
    UIProgressCircleModule,
];
export var UIModule = (function () {
    function UIModule() {
    }
    UIModule.forRoot = function () {
        return {
            ngModule: UIModule,
        };
    };
    UIModule.decorators = [
        { type: NgModule, args: [{
                    exports: MODULES
                },] },
    ];
    /** @nocollapse */
    UIModule.ctorParameters = [];
    return UIModule;
}());
