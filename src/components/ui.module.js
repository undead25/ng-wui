import { NgModule } from '@angular/core';
import { UIButtonModule } from './button';
import { UIDialogModule } from './dialog';
import { OVERLAY_PROVIDERS } from './overlay';
import { UIInputModule } from './input';
import { UIPaginationModule } from './pagination';
import './style/style.scss';
var MODULES = [
    UIButtonModule,
    UIDialogModule,
    UIInputModule,
    UIPaginationModule
];
export var UIModule = (function () {
    function UIModule() {
    }
    UIModule.forRoot = function () {
        return {
            ngModule: UIModule,
            providers: [OVERLAY_PROVIDERS]
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
