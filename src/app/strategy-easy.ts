import {ICell, IRow, State} from './matrix.service';

export function easyStrategy(rows: IRow[], targetState: State): void {
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