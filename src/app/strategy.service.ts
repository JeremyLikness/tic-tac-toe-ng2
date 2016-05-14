import {Injectable} from '@angular/core';
import {IRow, ICell, State} from './matrix.service';
import {easyStrategy} from './strategy-easy';
import {RowValue, IRank, hardStrategy} from './strategy-hard';

@Injectable()
export class StrategyService {
  constructor() {}

  public easyMode: boolean = false;

  public executeStrategy(rows: IRow[], targetState: State) {
    let strategy: (rows: IRow[], targetState: State) => void =
        this.easyMode ? easyStrategy : hardStrategy;
    strategy(rows, targetState);
  }
}