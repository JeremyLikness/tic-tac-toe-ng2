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
var core_1 = require('@angular/core');
var bad_turn_service_1 = require('../bad-turn.service');
var quotes_service_1 = require('../quotes.service');
var matrix_service_1 = require('../matrix.service');
var CellComponent = (function () {
    function CellComponent(quoteService, badTurn) {
        this.quoteService = quoteService;
        this.badTurn = badTurn;
        this.stateChangeRequested = new core_1.EventEmitter();
        this.cellQuote = "Zzzzz....";
        this.score = 0;
        this.id = CellComponent._counter;
        CellComponent._counter += 1;
    }
    CellComponent.prototype.ngOnInit = function () { this.cellQuote = this.quoteService.getQuote(); };
    CellComponent.prototype.ngOnChanges = function () {
        if (Math.random() < 0.5) {
            this.cellQuote = this.quoteService.getQuote();
        }
    };
    Object.defineProperty(CellComponent.prototype, "cellText", {
        get: function () {
            if (this.cellState == matrix_service_1.State.O) {
                return "O";
            }
            if (this.cellState == matrix_service_1.State.X) {
                return "X";
            }
            return this.cellQuote;
        },
        enumerable: true,
        configurable: true
    });
    CellComponent.prototype.set = function () {
        if (this.cellState === matrix_service_1.State.None) {
            if (this.validTurn) {
                this.stateChangeRequested.emit(true);
            }
            else {
                this.cellQuote = this.badTurn.getBadTurn();
            }
        }
    };
    CellComponent._counter = 1;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CellComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CellComponent.prototype, "col", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CellComponent.prototype, "cellState", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CellComponent.prototype, "validTurn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CellComponent.prototype, "winningCell", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CellComponent.prototype, "stateChangeRequested", void 0);
    CellComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cell',
            templateUrl: 'cell.component.html',
            styleUrls: ['cell.component.css'],
            providers: [bad_turn_service_1.BadTurnService, quotes_service_1.QuotesService]
        }), 
        __metadata('design:paramtypes', [quotes_service_1.QuotesService, bad_turn_service_1.BadTurnService])
    ], CellComponent);
    return CellComponent;
}());
exports.CellComponent = CellComponent;
//# sourceMappingURL=cell.component.js.map