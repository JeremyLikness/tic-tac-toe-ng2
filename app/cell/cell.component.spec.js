"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var cell_component_1 = require('./cell.component');
var quotes_service_1 = require('../quotes.service');
var bad_turn_service_1 = require('../bad-turn.service');
testing_1.describe('Component: Cell', function () {
    var builder;
    testing_1.beforeEachProviders(function () { return [cell_component_1.CellComponent, quotes_service_1.QuotesService, bad_turn_service_1.BadTurnService]; });
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) { builder = tcb; }));
    testing_1.it('should inject the component', testing_1.inject([cell_component_1.CellComponent], function (component) { testing_1.expect(component).toBeTruthy(); }));
    testing_1.it('should create the component', testing_1.inject([], function () {
        return builder.createAsync(CellComponentTestController)
            .then(function (fixture) {
            var query = fixture.debugElement.query(platform_browser_1.By.directive(cell_component_1.CellComponent));
            testing_1.expect(query).toBeTruthy();
            testing_1.expect(query.componentInstance).toBeTruthy();
        });
    }));
    testing_1.it('should set the row and column', testing_1.inject([], function () {
        return builder.createAsync(CellComponentTestController)
            .then(function (fixture) {
            fixture.detectChanges();
            var query = fixture.debugElement.query(platform_browser_1.By.directive(cell_component_1.CellComponent));
            testing_1.expect(query).toBeTruthy();
            testing_1.expect(query.componentInstance).toBeTruthy();
            testing_1.expect(query.componentInstance.col).toBe(1);
            testing_1.expect(query.componentInstance.row).toBe(2);
        });
    }));
});
var CellComponentTestController = (function () {
    function CellComponentTestController() {
        this.col = 1;
        this.row = 2;
    }
    CellComponentTestController = __decorate([
        core_1.Component({
            selector: 'test',
            template: "\n    <cell [row]=\"row\" [col]=\"col\"></cell>\n  ",
            directives: [cell_component_1.CellComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CellComponentTestController);
    return CellComponentTestController;
}());
//# sourceMappingURL=cell.component.spec.js.map