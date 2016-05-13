import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {TicTacToeNg2AppComponent} from '../app/tic-tac-toe-ng2.component';
import {MatrixService} from '../app/matrix.service';
import {StrategyService} from '../app/strategy.service';

beforeEachProviders(() => [TicTacToeNg2AppComponent, MatrixService, StrategyService]);

describe('App: TicTacToeNg2', () => {
  it('should create the app',
     inject([TicTacToeNg2AppComponent],
            (app: TicTacToeNg2AppComponent) => { expect(app).toBeTruthy(); }));

  it('should initialize the matrix',
     inject([TicTacToeNg2AppComponent], (app: TicTacToeNg2AppComponent) => {
       expect(app.rows).toBeDefined();
       expect(app.rows.length).toBe(3);
       expect(app.rows[0].length).toBe(3);
     }));
});
