"use strict";
var matrix_service_1 = require('./matrix.service');
(function (RowValue) {
    RowValue[RowValue["Draw"] = 0] = "Draw";
    RowValue[RowValue["Empty"] = 1] = "Empty";
    RowValue[RowValue["OneOpponent"] = 10] = "OneOpponent";
    RowValue[RowValue["OneMine"] = 50] = "OneMine";
    RowValue[RowValue["TwoOpponent"] = 100] = "TwoOpponent";
    RowValue[RowValue["TwoMine"] = 1000] = "TwoMine";
})(exports.RowValue || (exports.RowValue = {}));
var RowValue = exports.RowValue;
function hardStrategy(rows, targetState) {
    var idFunc = function (cell) { return cell.row * 3 + cell.col; }, rank = [];
    for (var x = 0; x < 9; x += 1) {
        rank.push({ id: x, weight: 0, cell: null });
    }
    for (var x = 0; x < rows.length; x += 1) {
        var row = rows[x], myCount = 0, theirCount = 0, value = RowValue.Draw;
        for (var y = 0; y < row.length; y += 1) {
            var cell_1 = row[y], id = idFunc(cell_1);
            if (rank[id].cell === null) {
                rank[id].cell = cell_1;
            }
            if (cell_1.state !== matrix_service_1.State.None) {
                rank[id].weight = -99999;
                if (cell_1.state === targetState) {
                    myCount += 1;
                }
                else {
                    theirCount += 1;
                }
            }
        }
        if (myCount === 0) {
            value = theirCount === 0 ? RowValue.Empty :
                (theirCount === 1 ? RowValue.OneOpponent : RowValue.TwoOpponent);
        }
        else {
            value =
                theirCount > 0 ? RowValue.Draw : (myCount === 1 ? RowValue.OneMine : RowValue.TwoMine);
        }
        for (var y = 0; y < row.length; y += 1) {
            var cell_2 = row[y], id = idFunc(cell_2);
            rank[id].weight += value;
        }
    }
    rank.sort(function (a, b) { return b.weight - a.weight; });
    var shortList = [], weight = rank[0].weight;
    shortList.push(rank[0].cell);
    for (var x = 1; x < rank.length; x += 1) {
        if (rank[x].weight === weight) {
            shortList.push(rank[x].cell);
        }
    }
    shortList.sort(function () { return 0.5 - Math.random(); });
    var cell;
    while (cell = shortList.pop()) {
        if (cell.state === matrix_service_1.State.None) {
            cell.state = targetState;
            break;
        }
    }
}
exports.hardStrategy = hardStrategy;
//# sourceMappingURL=strategy-hard.js.map