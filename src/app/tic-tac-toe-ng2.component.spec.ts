import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TicTacToeNg2AppComponent } from '../app/tic-tac-toe-ng2.component';

beforeEachProviders(() => [TicTacToeNg2AppComponent]);

describe('App: TicTacToeNg2', () => {
  it('should create the app',
      inject([TicTacToeNg2AppComponent], (app: TicTacToeNg2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'tic-tac-toe-ng2 works!\'',
      inject([TicTacToeNg2AppComponent], (app: TicTacToeNg2AppComponent) => {
    expect(app.title).toEqual('tic-tac-toe-ng2 works!');
  }));
});
