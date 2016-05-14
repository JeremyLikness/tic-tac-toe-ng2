import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {easyStrategy} from './strategy-easy';
import {hardStrategy} from './strategy-hard';
import {IRow, ICell, State} from './matrix.service';

function emptyBoard(): IRow[] {
  return [
    [
      {row: 0, col: 0, state: State.None, winningCell: false},
      {row: 0, col: 1, state: State.None, winningCell: false},
      {row: 0, col: 2, state: State.None, winningCell: false}
    ]
  ]
}

function fillBoard(rows: IRow[], targetFill: State): IRow[] {
  for (let idx = 0; idx < rows.length; idx += 1) {
    for (let col = 0; col < rows[idx].length; col += 1) {
      rows[idx][col].state = targetFill;
    }
  }
  return rows;
}

function getCount(rows: IRow[], stateToCount: State): number {
  var count = 0;
  for (let idx = 0; idx < rows.length; idx += 1) {
    for (let col = 0; col < rows[idx].length; col += 1) {
      if (rows[idx][col].state == stateToCount) {
        count += 1;
      }
    }
  }
  return count;
}

function fillBoardWithTemplate(template: State[]) {
  var rows: IRow[] = [];
  let topRow: ICell[] = [
    {row: 0, col: 0, state: template[0], winningCell: false},
    {row: 0, col: 1, state: template[1], winningCell: false},
    {row: 0, col: 2, state: template[2], winningCell: false}
  ];
  rows.push(topRow);

  let middleRow: ICell[] = [
    {row: 1, col: 0, state: template[3], winningCell: false},
    {row: 1, col: 1, state: template[4], winningCell: false},
    {row: 1, col: 2, state: template[5], winningCell: false}
  ];
  rows.push(middleRow);

  let bottomRow: ICell[] = [
    {row: 2, col: 0, state: template[6], winningCell: false},
    {row: 2, col: 1, state: template[7], winningCell: false},
    {row: 2, col: 2, state: template[8], winningCell: false}
  ];
  rows.push(bottomRow);

  return rows;
}

describe('Strategy Service', () => {

  describe('Easy Strategy', () => {

    it('should not update anything if the board is full', () => {
      let test = fillBoard(emptyBoard(), State.X);
      easyStrategy(test, State.O);
      for (let idx = 0; idx < test.length; idx += 1) {
        for (let col = 0; col < test[idx].length; col += 1) {
          expect(test[idx][col].state).toBe(State.X);
        }
      }
    });

    it('should fill any random remaining slot on the board', () => {
      let test = emptyBoard();

      easyStrategy(test, State.O);
      expect(getCount(test, State.O)).toBe(1);

      easyStrategy(test, State.O);
      expect(getCount(test, State.O)).toBe(2);

      easyStrategy(test, State.O);
      expect(getCount(test, State.O)).toBe(3);
    });

  });

  describe('Hard Strategy', () => {

    it('should do nothing if the board is full', () => {

      let test = fillBoard(emptyBoard(), State.X);
      hardStrategy(test, State.O);
      for (let idx = 0; idx < test.length; idx += 1) {
        for (let col = 0; col < test[idx].length; col += 1) {
          expect(test[idx][col].state).toBe(State.X);
        }
      }

    });

    it('should always go for the win', () => {
      let test =
              [
                State.X,
                State.X,
                State.None,
                State.O,
                State.O,
                State.None,
                State.None,
                State.None,
                State.None
              ],
          testBoard = fillBoardWithTemplate(test);

      hardStrategy(testBoard, State.X);

      expect(testBoard[0][2].state).toBe(State.X);
    });

    it('should always block the opponent if the win is not available', () => {
      let test =
              [
                State.X,
                State.None,
                State.None,
                State.O,
                State.O,
                State.None,
                State.X,
                State.None,
                State.None
              ],
          testBoard = fillBoardWithTemplate(test);

      hardStrategy(testBoard, State.X);

      expect(testBoard[1][2].state).toBe(State.X);
    });

    it('should prefer building a winning row over blocking the opponent', () => {
      let test =
              [
                State.X,
                State.None,
                State.None,
                State.O,
                State.None,
                State.None,
                State.None,
                State.None,
                State.None
              ],
          testBoard = fillBoardWithTemplate(test);

      hardStrategy(testBoard, State.X);

      expect(testBoard[0][1].state === State.X || testBoard[0][2].state === State.X).toBe(true);
    });

    it('should ignore rows that are already a draw', () => {
      let test =
              [
                State.X,
                State.None,
                State.O,
                State.X,
                State.None,
                State.None,
                State.O,
                State.X,
                State.None
              ],
          testBoard = fillBoardWithTemplate(test);

      hardStrategy(testBoard, State.X);

      expect(testBoard[1][1].state === State.X || testBoard[1][2].state === State.X).toBe(true);
    });

  });

});
