"use strict";
var testing_1 = require('@angular/core/testing');
var tic_tac_toe_ng2_component_1 = require('../app/tic-tac-toe-ng2.component');
var matrix_service_1 = require('../app/matrix.service');
var strategy_service_1 = require('../app/strategy.service');
testing_1.beforeEachProviders(function () { return [tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService, strategy_service_1.StrategyService]; });
var drawBoard = {
    0: matrix_service_1.State.X,
    1: matrix_service_1.State.O,
    2: matrix_service_1.State.X,
    3: matrix_service_1.State.O,
    4: matrix_service_1.State.O,
    5: matrix_service_1.State.X,
    6: matrix_service_1.State.X,
    7: matrix_service_1.State.X,
    8: matrix_service_1.State.O
};
function triggerDraw(rows) {
    var x = true;
    for (var idx = 0; idx < 3; idx += 1) {
        var row = rows[idx];
        for (var col = 0; col < row.length; col += 1) {
            var cell = row[col];
            cell.state = drawBoard[cell.row * 3 + cell.col];
        }
    }
}
function triggerWin(rows, targetState) {
    for (var idx = 0; idx < 3; idx += 1) {
        var row = rows[idx];
        for (var col = 0; col < row.length; col += 1) {
            var cell = row[col];
            cell.state = targetState;
        }
    }
}
function initApp(app) {
    app.slowComputer = false;
    app.ngOnInit();
}
function emulateGameMove(app, matrix, targetState) {
    matrix.gameState = targetState;
    app.stateChange(matrix.winLines[0][0]);
}
testing_1.describe('App: TicTacToeNg2', function () {
    testing_1.it('should create the app', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent], function (app) { testing_1.expect(app).toBeTruthy(); }));
    testing_1.it('should initialize the matrix', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent], function (app) {
        testing_1.expect(app.rows).toBeDefined();
        testing_1.expect(app.rows.length).toBe(3);
        testing_1.expect(app.rows[0].length).toBe(3);
    }));
    testing_1.it('should set your turn', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
        initApp(app);
        testing_1.expect(app.yourTurn).toBe(true);
    }));
    testing_1.it('should set whether or not you are "X"', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
        initApp(app);
        testing_1.expect(app.youAreX).toBe(matrix.computerTurn === matrix_service_1.GameState.XTurn ? false : true);
    }));
    testing_1.describe('updateStats()', function () {
        testing_1.it('should set your turn to false when game is won', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            testing_1.expect(app.won).toBe(false);
            testing_1.expect(app.draw).toBe(false);
            testing_1.expect(app.yourTurn).toBe(true);
            triggerWin(matrix.winLines, matrix_service_1.State.X);
            emulateGameMove(app, matrix, matrix_service_1.GameState.XTurn);
            testing_1.expect(app.won).toBe(true);
            testing_1.expect(app.draw).toBe(false);
            testing_1.expect(app.yourTurn).toBe(false);
        }));
        testing_1.it('should set your turn to false when the game is a draw', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            testing_1.expect(app.won).toBe(false);
            testing_1.expect(app.yourTurn).toBe(true);
            triggerDraw(matrix.winLines);
            var cell = matrix.winLines[0][0];
            emulateGameMove(app, matrix, cell.state === matrix_service_1.State.X ? matrix_service_1.GameState.XTurn : matrix_service_1.GameState.OTurn);
            testing_1.expect(app.won).toBe(false);
            testing_1.expect(app.draw).toBe(true);
            testing_1.expect(app.yourTurn).toBe(false);
        }));
        testing_1.it('should set computer won to true when computer wins', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            testing_1.expect(app.computerWon).toBe(false);
            testing_1.expect(app.won).toBe(false);
            var computerState = matrix.computerTurn === matrix_service_1.GameState.XTurn ? matrix_service_1.State.X : matrix_service_1.State.O;
            triggerWin(matrix.winLines, computerState);
            emulateGameMove(app, matrix, matrix.computerTurn);
            testing_1.expect(app.computerWon).toBe(true);
            testing_1.expect(app.won).toBe(true);
        }));
        testing_1.it('should set computer won to false when computer loses', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            testing_1.expect(app.computerWon).toBe(false);
            testing_1.expect(app.won).toBe(false);
            var userState = matrix.computerTurn === matrix_service_1.GameState.OTurn ? matrix_service_1.State.X : matrix_service_1.State.O;
            triggerWin(matrix.winLines, userState);
            emulateGameMove(app, matrix, matrix.computerTurn === matrix_service_1.GameState.XTurn ? matrix_service_1.GameState.OTurn :
                matrix_service_1.GameState.XTurn);
            testing_1.expect(app.computerWon).toBe(false);
            testing_1.expect(app.won).toBe(true);
        }));
        testing_1.it('should call the computer to execute a turn when it is the computer turn', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, strategy_service_1.StrategyService, matrix_service_1.MatrixService], function (app, strategy, matrix) {
            initApp(app);
            spyOn(strategy, 'executeStrategy');
            testing_1.expect(strategy.executeStrategy).not.toHaveBeenCalled();
            matrix.gameState = matrix.computerTurn;
            app.ngOnInit(); // fire the status update
            testing_1.expect(strategy.executeStrategy).toHaveBeenCalled();
        }));
    });
    testing_1.describe('stateChange()', function () {
        testing_1.it('should set the state of the cell based on the current game state', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            var testCell = matrix.winLines[0][0];
            if (testCell.state != matrix_service_1.State.None) {
                testCell = matrix.winLines[0][1];
            }
            testing_1.expect(testCell.state).toBe(matrix_service_1.State.None);
            matrix.gameState = matrix_service_1.GameState.XTurn;
            app.stateChange(testCell);
            testing_1.expect(testCell.state).toBe(matrix_service_1.State.X);
        }));
        testing_1.it('should advance the board state on the matrix service', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            var testCell = matrix.winLines[0][0];
            if (testCell.state != matrix_service_1.State.None) {
                testCell = matrix.winLines[0][1];
            }
            spyOn(matrix, 'advanceBoardState');
            testing_1.expect(matrix.advanceBoardState).not.toHaveBeenCalled();
            app.stateChange(testCell);
            testing_1.expect(matrix.advanceBoardState).toHaveBeenCalled();
        }));
    });
    testing_1.describe('computerTurn()', function () {
        testing_1.it('should exit immediately if it is not computer turn, or the game is won or drawn', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, strategy_service_1.StrategyService, matrix_service_1.MatrixService], function (app, strategy, matrix) {
            initApp(app);
            spyOn(strategy, 'executeStrategy');
            testing_1.expect(strategy.executeStrategy).not.toHaveBeenCalled();
            triggerDraw(matrix.winLines);
            matrix.gameState = matrix.computerTurn;
            app.stateChange(matrix.winLines[0][0]);
            testing_1.expect(strategy.executeStrategy).not.toHaveBeenCalled();
        }));
        testing_1.it('should call the strategy method on the strategy service', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, strategy_service_1.StrategyService, matrix_service_1.MatrixService], function (app, strategy, matrix) {
            initApp(app);
            spyOn(strategy, 'executeStrategy');
            testing_1.expect(strategy.executeStrategy).not.toHaveBeenCalled();
            matrix.gameState =
                matrix.computerTurn === matrix_service_1.GameState.XTurn ? matrix_service_1.GameState.OTurn : matrix_service_1.GameState.XTurn;
            app.stateChange(matrix.winLines[0][0]);
            testing_1.expect(strategy.executeStrategy).toHaveBeenCalled();
        }));
        testing_1.it('should advance the board state', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            spyOn(matrix, 'advanceBoardState');
            testing_1.expect(matrix.advanceBoardState).not.toHaveBeenCalled();
            matrix.gameState =
                matrix.computerTurn === matrix_service_1.GameState.XTurn ? matrix_service_1.GameState.OTurn : matrix_service_1.GameState.XTurn;
            app.stateChange(matrix.winLines[0][0]);
            testing_1.expect(matrix.advanceBoardState).toHaveBeenCalled();
        }));
    });
    testing_1.describe("reset()", function () {
        testing_1.it('should call reset on the matrix service', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            spyOn(matrix, 'reset');
            testing_1.expect(matrix.reset).not.toHaveBeenCalled();
            app.reset();
            testing_1.expect(matrix.reset).toHaveBeenCalled();
        }));
        testing_1.it('should update yourAreX', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, matrix_service_1.MatrixService], function (app, matrix) {
            initApp(app);
            app.reset();
            testing_1.expect(app.youAreX).toBe(matrix.computerTurn === matrix_service_1.GameState.XTurn ? false : true);
        }));
    });
    testing_1.describe("easyMode()", function () {
        testing_1.it('should reflect the mode on the strategy service', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, strategy_service_1.StrategyService], function (app, strategy) {
            initApp(app);
            testing_1.expect(app.easyMode).toBe(strategy.easyMode);
            strategy.easyMode = !strategy.easyMode;
            testing_1.expect(app.easyMode).toBe(strategy.easyMode);
        }));
        testing_1.it('should set the mode on the strategy service', testing_1.inject([tic_tac_toe_ng2_component_1.TicTacToeNg2AppComponent, strategy_service_1.StrategyService], function (app, strategy) {
            initApp(app);
            var targetMode = !strategy.easyMode;
            app.easyMode = targetMode;
            testing_1.expect(strategy.easyMode).toBe(targetMode);
        }));
    });
});
//# sourceMappingURL=tic-tac-toe-ng2.component.spec.js.map