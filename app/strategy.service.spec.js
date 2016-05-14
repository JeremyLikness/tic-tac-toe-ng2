"use strict";
var testing_1 = require('@angular/core/testing');
var strategy_easy_1 = require('./strategy-easy');
var strategy_hard_1 = require('./strategy-hard');
var matrix_service_1 = require('./matrix.service');
function emptyBoard() {
    return [
        [
            { row: 0, col: 0, state: matrix_service_1.State.None, winningCell: false },
            { row: 0, col: 1, state: matrix_service_1.State.None, winningCell: false },
            { row: 0, col: 2, state: matrix_service_1.State.None, winningCell: false }
        ]
    ];
}
function fillBoard(rows, targetFill) {
    for (var idx = 0; idx < rows.length; idx += 1) {
        for (var col = 0; col < rows[idx].length; col += 1) {
            rows[idx][col].state = targetFill;
        }
    }
    return rows;
}
function getCount(rows, stateToCount) {
    var count = 0;
    for (var idx = 0; idx < rows.length; idx += 1) {
        for (var col = 0; col < rows[idx].length; col += 1) {
            if (rows[idx][col].state == stateToCount) {
                count += 1;
            }
        }
    }
    return count;
}
function fillBoardWithTemplate(template) {
    var rows = [];
    var topRow = [
        { row: 0, col: 0, state: template[0], winningCell: false },
        { row: 0, col: 1, state: template[1], winningCell: false },
        { row: 0, col: 2, state: template[2], winningCell: false }
    ];
    rows.push(topRow);
    var middleRow = [
        { row: 1, col: 0, state: template[3], winningCell: false },
        { row: 1, col: 1, state: template[4], winningCell: false },
        { row: 1, col: 2, state: template[5], winningCell: false }
    ];
    rows.push(middleRow);
    var bottomRow = [
        { row: 2, col: 0, state: template[6], winningCell: false },
        { row: 2, col: 1, state: template[7], winningCell: false },
        { row: 2, col: 2, state: template[8], winningCell: false }
    ];
    rows.push(bottomRow);
    return rows;
}
testing_1.describe('Strategy Service', function () {
    testing_1.describe('Easy Strategy', function () {
        testing_1.it('should not update anything if the board is full', function () {
            var test = fillBoard(emptyBoard(), matrix_service_1.State.X);
            strategy_easy_1.easyStrategy(test, matrix_service_1.State.O);
            for (var idx = 0; idx < test.length; idx += 1) {
                for (var col = 0; col < test[idx].length; col += 1) {
                    testing_1.expect(test[idx][col].state).toBe(matrix_service_1.State.X);
                }
            }
        });
        testing_1.it('should fill any random remaining slot on the board', function () {
            var test = emptyBoard();
            strategy_easy_1.easyStrategy(test, matrix_service_1.State.O);
            testing_1.expect(getCount(test, matrix_service_1.State.O)).toBe(1);
            strategy_easy_1.easyStrategy(test, matrix_service_1.State.O);
            testing_1.expect(getCount(test, matrix_service_1.State.O)).toBe(2);
            strategy_easy_1.easyStrategy(test, matrix_service_1.State.O);
            testing_1.expect(getCount(test, matrix_service_1.State.O)).toBe(3);
        });
    });
    testing_1.describe('Hard Strategy', function () {
        testing_1.it('should do nothing if the board is full', function () {
            var test = fillBoard(emptyBoard(), matrix_service_1.State.X);
            strategy_hard_1.hardStrategy(test, matrix_service_1.State.O);
            for (var idx = 0; idx < test.length; idx += 1) {
                for (var col = 0; col < test[idx].length; col += 1) {
                    testing_1.expect(test[idx][col].state).toBe(matrix_service_1.State.X);
                }
            }
        });
        testing_1.it('should always go for the win', function () {
            var test = [
                matrix_service_1.State.X,
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.O,
                matrix_service_1.State.O,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.None
            ], testBoard = fillBoardWithTemplate(test);
            strategy_hard_1.hardStrategy(testBoard, matrix_service_1.State.X);
            testing_1.expect(testBoard[0][2].state).toBe(matrix_service_1.State.X);
        });
        testing_1.it('should always block the opponent if the win is not available', function () {
            var test = [
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.O,
                matrix_service_1.State.O,
                matrix_service_1.State.None,
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.None
            ], testBoard = fillBoardWithTemplate(test);
            strategy_hard_1.hardStrategy(testBoard, matrix_service_1.State.X);
            testing_1.expect(testBoard[1][2].state).toBe(matrix_service_1.State.X);
        });
        testing_1.it('should prefer building a winning row over blocking the opponent', function () {
            var test = [
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.O,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.None
            ], testBoard = fillBoardWithTemplate(test);
            strategy_hard_1.hardStrategy(testBoard, matrix_service_1.State.X);
            testing_1.expect(testBoard[0][1].state === matrix_service_1.State.X || testBoard[0][2].state === matrix_service_1.State.X).toBe(true);
        });
        testing_1.it('should ignore rows that are already a draw', function () {
            var test = [
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.O,
                matrix_service_1.State.X,
                matrix_service_1.State.None,
                matrix_service_1.State.None,
                matrix_service_1.State.O,
                matrix_service_1.State.X,
                matrix_service_1.State.None
            ], testBoard = fillBoardWithTemplate(test);
            strategy_hard_1.hardStrategy(testBoard, matrix_service_1.State.X);
            testing_1.expect(testBoard[1][1].state === matrix_service_1.State.X || testBoard[1][2].state === matrix_service_1.State.X).toBe(true);
        });
    });
});
//# sourceMappingURL=strategy.service.spec.js.map