"use strict";
var testing_1 = require('@angular/core/testing');
var matrix_service_1 = require('./matrix.service');
function mapTemplateToService(service, template) {
    var row = 0, col = 0, idx = 0;
    while (row < 3) {
        service.rows[row][col].state = template[idx];
        idx += 1;
        col += 1;
        if (col === 3) {
            col = 0;
            row += 1;
        }
    }
}
testing_1.describe('Matrix Service', function () {
    testing_1.beforeEachProviders(function () { return [matrix_service_1.MatrixService]; });
    testing_1.it('should initialize to game state of X-turn', testing_1.inject([matrix_service_1.MatrixService], function (service) { testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.XTurn); }));
    testing_1.it('should initialize all rows to State.None', testing_1.inject([matrix_service_1.MatrixService], function (service) {
        for (var idx = 0; idx < service.rows.length; idx += 1) {
            for (var col = 0; col < service.rows[idx].length; col += 1) {
                testing_1.expect(service.rows[idx][col].state).toBe(matrix_service_1.State.None);
            }
        }
    }));
    testing_1.describe("reset()", function () {
        testing_1.it('should initialize to game state of X-turn', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            service.gameState = matrix_service_1.GameState.Won;
            service.reset();
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.XTurn);
        }));
        testing_1.it('should initialize all rows to empty X-turn', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            service.rows[0][0].state = matrix_service_1.State.X;
            service.rows[1][1].state = matrix_service_1.State.O;
            service.reset();
            for (var idx = 0; idx < service.rows.length; idx += 1) {
                for (var col = 0; col < service.rows[idx].length; col += 1) {
                    testing_1.expect(service.rows[idx][col].state).toBe(matrix_service_1.State.None);
                }
            }
        }));
    });
    testing_1.describe("advanceBoardState()", function () {
        testing_1.it('should swap the turn', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.XTurn);
            service.advanceBoardState();
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.OTurn);
        }));
        testing_1.it('should call a draw when the board cannot be won', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.XTurn);
            mapTemplateToService(service, [matrix_service_1.State.X, matrix_service_1.State.O, matrix_service_1.State.None, matrix_service_1.State.O, matrix_service_1.State.O, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.O]);
            service.advanceBoardState();
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.Draw);
        }));
        testing_1.it('should call a win when there is a winning row', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.XTurn);
            mapTemplateToService(service, [matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.O, matrix_service_1.State.O, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.O]);
            service.advanceBoardState();
            testing_1.expect(service.gameState).toBe(matrix_service_1.GameState.Won);
        }));
        testing_1.it('should set the cell winningCell property to true when it is in a winning row', testing_1.inject([matrix_service_1.MatrixService], function (service) {
            mapTemplateToService(service, [matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.O, matrix_service_1.State.O, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.X, matrix_service_1.State.O]);
            service.advanceBoardState();
            testing_1.expect(service.rows[0][0].winningCell).toBe(true);
            testing_1.expect(service.rows[0][1].winningCell).toBe(true);
            testing_1.expect(service.rows[0][2].winningCell).toBe(true);
        }));
    });
});
//# sourceMappingURL=matrix.service.spec.js.map