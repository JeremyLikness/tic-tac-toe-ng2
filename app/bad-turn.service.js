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
var BadTurnService = (function () {
    function BadTurnService() {
        this.quotes = [
            "Ouch! It's my turn!",
            "Hey, that's not fair.",
            "Wait your turn!",
            "I'm thinking, I'm thinking.",
            "Where's the fire?",
            "Stop that."
        ];
    }
    BadTurnService.prototype.getBadTurn = function () { return this.quotes.sort(function () { return 0.5 - Math.random(); })[0]; };
    BadTurnService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BadTurnService);
    return BadTurnService;
}());
exports.BadTurnService = BadTurnService;
//# sourceMappingURL=bad-turn.service.js.map