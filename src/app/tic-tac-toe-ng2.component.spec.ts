import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {TicTacToeNg2AppComponent} from '../app/tic-tac-toe-ng2.component';
import {MatrixService, IRow, ICell, State, GameState} from '../app/matrix.service';
import {StrategyService} from '../app/strategy.service';

beforeEachProviders(() => [TicTacToeNg2AppComponent, MatrixService, StrategyService]);

let drawBoard = {
  0: State.X,
  1: State.O,
  2: State.X,
  3: State.O,
  4: State.O,
  5: State.X,
  6: State.X,
  7: State.X,
  8: State.O
};

function triggerDraw(rows: IRow[]) {
  let x = true;
  for (let idx = 0; idx < 3; idx += 1) {
    let row = rows[idx];
    for (let col = 0; col < row.length; col += 1) {
      let cell = row[col];
      cell.state = drawBoard[cell.row * 3 + cell.col];
    }
  }
}

function triggerWin(rows: IRow[], targetState: State) {
  for (let idx = 0; idx < 3; idx += 1) {
    let row = rows[idx];
    for (let col = 0; col < row.length; col += 1) {
      let cell = row[col];
      cell.state = targetState;
    }
  }
}

function initApp(app: TicTacToeNg2AppComponent) {
  app.slowComputer = false;
  app.ngOnInit();
}

function emulateGameMove(app: TicTacToeNg2AppComponent, matrix: MatrixService,
                         targetState: GameState) {
  matrix.gameState = targetState;
  app.stateChange(matrix.winLines[0][0]);
}

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

  it('should set your turn', inject([TicTacToeNg2AppComponent, MatrixService],
                                    (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {

                                      initApp(app);
                                      expect(app.yourTurn).toBe(true);

                                    }));

  it('should set whether or not you are "X"',
     inject([TicTacToeNg2AppComponent, MatrixService],
            (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {
              initApp(app);
              expect(app.youAreX).toBe(matrix.computerTurn === GameState.XTurn ? false : true);
            }));

  describe('updateStats()', () => {
    it('should set your turn to false when game is won',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {
                initApp(app);

                expect(app.won).toBe(false);
                expect(app.draw).toBe(false);
                expect(app.yourTurn).toBe(true);

                triggerWin(matrix.winLines, State.X);
                emulateGameMove(app, matrix, GameState.XTurn);

                expect(app.won).toBe(true);
                expect(app.draw).toBe(false);
                expect(app.yourTurn).toBe(false);
              }));

    it('should set your turn to false when the game is a draw',
       inject([TicTacToeNg2AppComponent, MatrixService], (app: TicTacToeNg2AppComponent,
                                                          matrix: MatrixService) => {
         initApp(app);

         expect(app.won).toBe(false);
         expect(app.yourTurn).toBe(true);
         triggerDraw(matrix.winLines);

         let cell = matrix.winLines[0][0];
         emulateGameMove(app, matrix, cell.state === State.X ? GameState.XTurn : GameState.OTurn);

         expect(app.won).toBe(false);
         expect(app.draw).toBe(true);
         expect(app.yourTurn).toBe(false);
       }));

    it('should set computer won to true when computer wins',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {
                initApp(app);

                expect(app.computerWon).toBe(false);
                expect(app.won).toBe(false);

                let computerState = matrix.computerTurn === GameState.XTurn ? State.X : State.O;
                triggerWin(matrix.winLines, computerState);
                emulateGameMove(app, matrix, matrix.computerTurn);

                expect(app.computerWon).toBe(true);
                expect(app.won).toBe(true);
              }));

    it('should set computer won to false when computer loses',
       inject([TicTacToeNg2AppComponent, MatrixService], (app: TicTacToeNg2AppComponent,
                                                          matrix: MatrixService) => {
         initApp(app);

         expect(app.computerWon).toBe(false);
         expect(app.won).toBe(false);

         let userState = matrix.computerTurn === GameState.OTurn ? State.X : State.O;
         triggerWin(matrix.winLines, userState);
         emulateGameMove(app, matrix, matrix.computerTurn === GameState.XTurn ? GameState.OTurn :
                                                                                GameState.XTurn);

         expect(app.computerWon).toBe(false);
         expect(app.won).toBe(true);
       }));

    it('should call the computer to execute a turn when it is the computer turn',
       inject([TicTacToeNg2AppComponent, StrategyService, MatrixService],
              (app: TicTacToeNg2AppComponent, strategy: StrategyService, matrix: MatrixService) => {
                initApp(app);

                spyOn(strategy, 'executeStrategy');
                expect(strategy.executeStrategy).not.toHaveBeenCalled();

                matrix.gameState = matrix.computerTurn;
                app.ngOnInit();  // fire the status update

                expect(strategy.executeStrategy).toHaveBeenCalled();
              }));

  });

  describe('stateChange()', () => {

    it('should set the state of the cell based on the current game state',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {
                initApp(app);

                let testCell = matrix.winLines[0][0];
                if (testCell.state != State.None) {
                  testCell = matrix.winLines[0][1];
                }

                expect(testCell.state).toBe(State.None);

                matrix.gameState = GameState.XTurn;
                app.stateChange(testCell);

                expect(testCell.state).toBe(State.X);


              }));

    it('should advance the board state on the matrix service',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {

                initApp(app);

                let testCell = matrix.winLines[0][0];
                if (testCell.state != State.None) {
                  testCell = matrix.winLines[0][1];
                }

                spyOn(matrix, 'advanceBoardState');
                expect(matrix.advanceBoardState).not.toHaveBeenCalled();

                app.stateChange(testCell);

                expect(matrix.advanceBoardState).toHaveBeenCalled();
              }));


  });

  describe('computerTurn()', () => {

    it('should exit immediately if it is not computer turn, or the game is won or drawn',
       inject([TicTacToeNg2AppComponent, StrategyService, MatrixService],
              (app: TicTacToeNg2AppComponent, strategy: StrategyService, matrix: MatrixService) => {

                initApp(app);

                spyOn(strategy, 'executeStrategy');
                expect(strategy.executeStrategy).not.toHaveBeenCalled();

                triggerDraw(matrix.winLines);
                matrix.gameState = matrix.computerTurn;
                app.stateChange(matrix.winLines[0][0]);

                expect(strategy.executeStrategy).not.toHaveBeenCalled();

              }));

    it('should call the strategy method on the strategy service',
       inject([TicTacToeNg2AppComponent, StrategyService, MatrixService],
              (app: TicTacToeNg2AppComponent, strategy: StrategyService, matrix: MatrixService) => {

                initApp(app);

                spyOn(strategy, 'executeStrategy');
                expect(strategy.executeStrategy).not.toHaveBeenCalled();

                matrix.gameState =
                    matrix.computerTurn === GameState.XTurn ? GameState.OTurn : GameState.XTurn;
                app.stateChange(matrix.winLines[0][0]);

                expect(strategy.executeStrategy).toHaveBeenCalled();

              }));

    it('should advance the board state',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {

                initApp(app);

                spyOn(matrix, 'advanceBoardState');
                expect(matrix.advanceBoardState).not.toHaveBeenCalled();

                matrix.gameState =
                    matrix.computerTurn === GameState.XTurn ? GameState.OTurn : GameState.XTurn;
                app.stateChange(matrix.winLines[0][0]);

                expect(matrix.advanceBoardState).toHaveBeenCalled();

              }));
  });

  describe("reset()", () => {

    it('should call reset on the matrix service',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {

                initApp(app);

                spyOn(matrix, 'reset');
                expect(matrix.reset).not.toHaveBeenCalled();

                app.reset();

                expect(matrix.reset).toHaveBeenCalled();

              }));

    it('should update yourAreX',
       inject([TicTacToeNg2AppComponent, MatrixService],
              (app: TicTacToeNg2AppComponent, matrix: MatrixService) => {

                initApp(app);

                app.reset();

                expect(app.youAreX).toBe(matrix.computerTurn === GameState.XTurn ? false : true);

              }));

  });

  describe("easyMode()", () => {

    it('should reflect the mode on the strategy service',
       inject([TicTacToeNg2AppComponent, StrategyService],
              (app: TicTacToeNg2AppComponent, strategy: StrategyService) => {

                initApp(app);

                expect(app.easyMode).toBe(strategy.easyMode);

                strategy.easyMode = !strategy.easyMode;

                expect(app.easyMode).toBe(strategy.easyMode);
              }));

    it('should set the mode on the strategy service',
       inject([TicTacToeNg2AppComponent, StrategyService],
              (app: TicTacToeNg2AppComponent, strategy: StrategyService) => {

                initApp(app);

                let targetMode = !strategy.easyMode;

                app.easyMode = targetMode;

                expect(strategy.easyMode).toBe(targetMode);
              }));

  });

});
