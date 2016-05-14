import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {MatrixService, GameState, State} from './matrix.service';

function mapTemplateToService(service: MatrixService, template: State[]) {
  let row = 0, col = 0, idx = 0;
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

describe('Matrix Service', () => {
  beforeEachProviders(() => [MatrixService]);

  it('should initialize to game state of X-turn',
     inject([MatrixService],
            (service: MatrixService) => { expect(service.gameState).toBe(GameState.XTurn); }));

  it('should initialize all rows to State.None',
     inject([MatrixService], (service: MatrixService) => {
       for (let idx = 0; idx < service.rows.length; idx += 1) {
         for (let col = 0; col < service.rows[idx].length; col += 1) {
           expect(service.rows[idx][col].state).toBe(State.None);
         }
       }
     }));

  describe("reset()", () => {
    it('should initialize to game state of X-turn',
       inject([MatrixService], (service: MatrixService) => {
         service.gameState = GameState.Won;
         service.reset();
         expect(service.gameState).toBe(GameState.XTurn);
       }));

    it('should initialize all rows to empty X-turn',
       inject([MatrixService], (service: MatrixService) => {
         service.rows[0][0].state = State.X;
         service.rows[1][1].state = State.O;
         service.reset();
         for (let idx = 0; idx < service.rows.length; idx += 1) {
           for (let col = 0; col < service.rows[idx].length; col += 1) {
             expect(service.rows[idx][col].state).toBe(State.None);
           }
         }
       }));
  });

  describe("advanceBoardState()", () => {
    it('should swap the turn', inject([MatrixService], (service: MatrixService) => {
         expect(service.gameState).toBe(GameState.XTurn);
         service.advanceBoardState();
         expect(service.gameState).toBe(GameState.OTurn);
       }));

    it('should call a draw when the board cannot be won',
       inject([MatrixService], (service: MatrixService) => {
         expect(service.gameState).toBe(GameState.XTurn);

         mapTemplateToService(
             service,
             [State.X, State.O, State.None, State.O, State.O, State.X, State.X, State.X, State.O]);

         service.advanceBoardState();

         expect(service.gameState).toBe(GameState.Draw);

       }));

    it('should call a win when there is a winning row',
       inject([MatrixService], (service: MatrixService) => {

         expect(service.gameState).toBe(GameState.XTurn);

         mapTemplateToService(
             service,
             [State.X, State.X, State.X, State.O, State.O, State.X, State.X, State.X, State.O]);

         service.advanceBoardState();

         expect(service.gameState).toBe(GameState.Won);

       }));

    it('should set the cell winningCell property to true when it is in a winning row',
       inject([MatrixService], (service: MatrixService) => {

         mapTemplateToService(
             service,
             [State.X, State.X, State.X, State.O, State.O, State.X, State.X, State.X, State.O]);

         service.advanceBoardState();

         expect(service.rows[0][0].winningCell).toBe(true);
         expect(service.rows[0][1].winningCell).toBe(true);
         expect(service.rows[0][2].winningCell).toBe(true);
       }));


  });

});
