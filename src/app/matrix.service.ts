import { Injectable } from '@angular/core';

export enum State {
  None = 0,
  X = 1,
  O = 2
}

export enum GameState {
  XTurn = 0,
  OTurn = 1,
  Won = 2,
  Draw = 3
}

export interface ICell {
  row: number;
  col: number;
  state: State;
  winningCell: boolean;
}

export type IRow = ICell[];

@Injectable()
export class MatrixService {

  public rows: IRow[] = [];
  
  public gameState: GameState; 
  public computerTurn: GameState;
  public computerWon: boolean = false;
  
  public winLines: IRow[] = []; 
  private _cells: ICell[] = [];
  
  constructor() {    
    this.reset();  
  }
  
  public reset(): void {
    
    while(this.rows.pop());
    while(this._cells.pop());
    while(this.winLines.pop());
    
    this.gameState = GameState.XTurn;
    
    for (let row = 0; row < 3; row += 1) {
      let newRow = [];
      this.rows.push(newRow);
      for (let col = 0; col < 3; col += 1) {
        let newCell = { row: row, col: col, state: State.None, winningCell: false}; 
        newRow.push(newCell);
        this._cells.push(newCell);
      }
    }
    
    // construct all combinations of winning lines 

    // top row 
    let topRow = this.rows[0];
    this.winLines.push(topRow);

    // middle row
    let middleRow = this.rows[1];
    this.winLines.push(middleRow);

    // bottom row
    let bottomRow = this.rows[2];
    this.winLines.push(bottomRow);

    // left column
    let leftColumn = [this.rows[0][0], this.rows[1][0], this.rows[2][0]];
    this.winLines.push(leftColumn);
    
    // middle column
    let middleColumn = [this.rows[0][1], this.rows[1][1], this.rows[2][1]];
    this.winLines.push(middleColumn);
    
    // right column
    let rightColumn = [this.rows[0][2], this.rows[1][2], this.rows[2][2]];
    this.winLines.push(rightColumn);
    
    // middle column
    let leftTopDiagonal = [this.rows[0][0], this.rows[1][1], this.rows[2][2]];
    this.winLines.push(leftTopDiagonal);
    
    // middle column
    let leftBottomDiagonal = [this.rows[2][0], this.rows[1][1], this.rows[0][2]];
    this.winLines.push(leftBottomDiagonal);
    
    this.computerTurn = Math.random() < 0.5 ? GameState.XTurn : GameState.OTurn;
  }
  
  public advanceBoardState(): void {
    
    // check for win
    let won = false, 
      computerState = this.computerTurn === GameState.XTurn ? State.X : State.O;
    
    for (let x = 0; !won && x < this.winLines.length; x+= 1) {
      let row = this.winLines[x];
      if (this.won(row)) {
        won = true;
        for (let y = 0; y < row.length; y+= 1) {
          row[y].winningCell = true;
          this.computerWon = computerState === row[y].state;
        }
      }
    }
    
    if (won) {
      this.gameState = GameState.Won;
      return;
    }    
    
    let draw = true;
    
    // check for draw 
    for (let x = 0; draw && x < this._cells.length; x += 1) {
      if (this._cells[x].state === State.None) {
        draw = false;
      }
    }
    
    if (draw) {
      this.gameState = GameState.Draw;
      return;
    }
    
    // more comprehensive check for draw 
    draw = true; 
    
    for (let x = 0; draw && x < this.winLines.length; x+= 1) {
      draw = this.draw(this.winLines[x]);
    }
    
    if (draw) {
      this.gameState = GameState.Draw;
      return;
    }
    
    this.gameState = this.gameState === GameState.XTurn ? GameState.OTurn : GameState.XTurn; 
  }
  
  public draw(row: IRow): boolean {
    let hasX = false, hasO = false;
      for (let y = 0; y < row.length; y += 1) {
        hasX = hasX || row[y].state === State.X; 
        hasO = hasO || row[y].state === State.O;
      } 
      return hasX && hasO; 
  }
  
  public won(row: IRow): boolean {
    return row[0].state != State.None && 
      row[0].state === row[1].state &&
      row[1].state === row[2].state;
  }

}
