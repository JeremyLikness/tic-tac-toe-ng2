"use strict";
var matrix_service_1 = require('./matrix.service');
function easyStrategy(rows, targetState) {
    var candidates = [], xRef = {};
    for (var x = 0; x < rows.length; x += 1) {
        var row = rows[x];
        for (var y = 0; y < row.length; y += 1) {
            var cell = row[y], id = cell.row * 3 + cell.col;
            if (cell.state === matrix_service_1.State.None && xRef[id] === undefined) {
                candidates.push(cell);
                xRef[id] = cell;
            }
        }
        if (candidates.length > 0) {
            candidates[Math.floor(Math.random() * candidates.length)].state = targetState;
            return;
        }
    }
}
exports.easyStrategy = easyStrategy;
//# sourceMappingURL=strategy-easy.js.map