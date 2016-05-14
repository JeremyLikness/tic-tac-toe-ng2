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
(function (State) {
    State[State["None"] = 0] = "None";
    State[State["X"] = 1] = "X";
    State[State["O"] = 2] = "O";
})(exports.State || (exports.State = {}));
var State = exports.State;
(function (GameState) {
    GameState[GameState["XTurn"] = 0] = "XTurn";
    GameState[GameState["OTurn"] = 1] = "OTurn";
    GameState[GameState["Won"] = 2] = "Won";
    GameState[GameState["Draw"] = 3] = "Draw";
})(exports.GameState || (exports.GameState = {}));
var GameState = exports.GameState;
var MatrixService = (function () {
    function MatrixService() {
        this.rows = [];
        this.computerWon = false;
        this.winLines = [];
        this._cells = [];
        this.reset();
    }
    MatrixService.prototype.reset = function () {
        while (this.rows.pop())
            ;
        while (this._cells.pop())
            ;
        while (this.winLines.pop())
            ;
        this.gameState = GameState.XTurn;
        for (var row = 0; row < 3; row += 1) {
            var newRow = [];
            this.rows.push(newRow);
            for (var col = 0; col < 3; col += 1) {
                var newCell = { row: row, col: col, state: State.None, winningCell: false };
                newRow.push(newCell);
                this._cells.push(newCell);
            }
        }
        // construct all combinations of winning lines
        // top row
        var topRow = this.rows[0];
        this.winLines.push(topRow);
        // middle row
        var middleRow = this.rows[1];
        this.winLines.push(middleRow);
        // bottom row
        var bottomRow = this.rows[2];
        this.winLines.push(bottomRow);
        // left column
        var leftColumn = [this.rows[0][0], this.rows[1][0], this.rows[2][0]];
        this.winLines.push(leftColumn);
        // middle column
        var middleColumn = [this.rows[0][1], this.rows[1][1], this.rows[2][1]];
        this.winLines.push(middleColumn);
        // right column
        var rightColumn = [this.rows[0][2], this.rows[1][2], this.rows[2][2]];
        this.winLines.push(rightColumn);
        // middle column
        var leftTopDiagonal = [this.rows[0][0], this.rows[1][1], this.rows[2][2]];
        this.winLines.push(leftTopDiagonal);
        // middle column
        var leftBottomDiagonal = [this.rows[2][0], this.rows[1][1], this.rows[0][2]];
        this.winLines.push(leftBottomDiagonal);
        this.computerTurn = Math.random() < 0.5 ? GameState.XTurn : GameState.OTurn;
    };
    MatrixService.prototype.advanceBoardState = function () {
        // check for win
        var won = false, computerState = this.computerTurn === GameState.XTurn ? State.X : State.O;
        for (var x = 0; !won && x < this.winLines.length; x += 1) {
            var row = this.winLines[x];
            if (this.won(row)) {
                won = true;
                for (var y = 0; y < row.length; y += 1) {
                    row[y].winningCell = true;
                    this.computerWon = computerState === row[y].state;
                }
            }
        }
        if (won) {
            this.gameState = GameState.Won;
            return;
        }
        var draw = true;
        // check for draw
        for (var x = 0; draw && x < this._cells.length; x += 1) {
            if (this._cells[x].state === State.None) {
                draw = false;
            }
        }
        if (draw) {
            this.gameState = GameState.Draw;
            return;
        }
        // more comprehensive check for draw
        draw = true;
        for (var x = 0; draw && x < this.winLines.length; x += 1) {
            draw = this.draw(this.winLines[x]);
        }
        if (draw) {
            this.gameState = GameState.Draw;
            return;
        }
        this.gameState = this.gameState === GameState.XTurn ? GameState.OTurn : GameState.XTurn;
    };
    MatrixService.prototype.draw = function (row) {
        var hasX = false, hasO = false;
        for (var y = 0; y < row.length; y += 1) {
            hasX = hasX || row[y].state === State.X;
            hasO = hasO || row[y].state === State.O;
        }
        return hasX && hasO;
    };
    MatrixService.prototype.won = function (row) {
        return row[0].state != State.None && row[0].state === row[1].state &&
            row[1].state === row[2].state;
    };
    MatrixService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MatrixService);
    return MatrixService;
}());
exports.MatrixService = MatrixService;
//# sourceMappingURL=matrix.service.js.map