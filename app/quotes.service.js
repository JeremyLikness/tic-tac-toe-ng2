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
var QuotesService = (function () {
    function QuotesService() {
        this.quotes = [
            "This is a Hollywood square.",
            "Pick me! Ooh, ooh, pick me!",
            "Are you thinking hard?",
            "Tap. Tap. Tap.",
            "Row, row, row.",
            "I'm trying to think!",
            "Don't push too hard.",
            "Be very, very careful.",
            "I refuse to be punched.",
            "I'm feeling off-key today.",
            "Let's button this up.",
            "I have a nervous tic.",
            "This game is tac-key.",
            "It was the best of tiles, it was the worst of tiles...",
            "Sometimes things just seem to click.",
            "I'm very square.",
            "Watch out for tics."
        ];
    }
    QuotesService.prototype.getQuote = function () { return this.quotes.sort(function () { return 0.5 - Math.random(); })[0]; };
    QuotesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], QuotesService);
    return QuotesService;
}());
exports.QuotesService = QuotesService;
//# sourceMappingURL=quotes.service.js.map