
import {Injectable} from '@angular/core';
import {IRow, ICell, State} from './matrix.service';

enum RowValue {
  Draw = 0,
  Empty = 1,
  OneOpponent = 10,
  OneMine = 50,
  TwoOpponent = 100,
  TwoMine = 1000
}

interface IRank {
  id: number, weight: number, cell: ICell
}

@Injectable()
export class StrategyService {
  constructor() {}

  public easyMode: boolean = false;

  private easyStrategy(rows: IRow[], targetState: State): void {
    let candidates: ICell[] = [], xRef: {[id: number]: ICell} = {};
    for (let x = 0; x < rows.length; x += 1) {
      let row = rows[x];
      for (let y = 0; y < row.length; y += 1) {
        let cell = row[y], id = cell.row * 3 + cell.col;
        if (cell.state === State.None && xRef[id] === undefined) {
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

  private hardStrategy(rows: IRow[], targetState: State): void {
    let idFunc = (cell: ICell) => cell.row * 3 + cell.col, rank: IRank[] = [];

    for (let x = 0; x < 9; x += 1) {
      rank.push({id: x, weight: 0, cell: null});
    }

    for (let x = 0; x < rows.length; x += 1) {
      let row = rows[x], myCount = 0, theirCount = 0, value = RowValue.Draw;
      for (let y = 0; y < row.length; y += 1) {
        let cell = row[y], id = idFunc(cell);
        if (rank[id].cell === null) {
          rank[id].cell = cell;
        }
        if (cell.state !== State.None) {
          rank[id].weight = -99999;
          if (cell.state === targetState) {
            myCount += 1;
          } else {
            theirCount += 1;
          }
        }
      }
      if (myCount === 0) {
        value = theirCount === 0 ? RowValue.Empty :
                                   (theirCount === 1 ? RowValue.OneOpponent : RowValue.TwoOpponent);
      } else {
        value =
            theirCount > 0 ? RowValue.Draw : (myCount === 1 ? RowValue.OneMine : RowValue.TwoMine);
      }
      for (let y = 0; y < row.length; y += 1) {
        let cell = row[y], id = idFunc(cell);
        rank[id].weight += value;
      }
    }

    rank.sort((a, b) => b.weight - a.weight);

    let shortList: ICell[] = [], weight = rank[0].weight;
    shortList.push(rank[0].cell);
    for (let x = 1; x < rank.length; x += 1) {
      if (rank[x].weight === weight) {
        shortList.push(rank[x].cell);
      }
    }

    shortList[Math.floor(Math.random() * shortList.length)].state = targetState;
  }

  public executeStrategy(rows: IRow[], targetState: State) {
    let strategy: (rows: IRow[], targetState: State) => void =
        this.easyMode ? this.easyStrategy : this.hardStrategy;
    strategy(rows, targetState);
  }
}
