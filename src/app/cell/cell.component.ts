import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BadTurnService } from '../bad-turn.service';
import { QuotesService } from '../quotes.service';
import { State } from '../matrix.service'; 

@Component({
  moduleId: module.id,
  selector: 'cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css'],
  providers: [ BadTurnService, QuotesService ]
})
export class CellComponent implements OnInit {

  private static _counter: number = 1; 

  public id: number;

  @Input() 
  public row: number; 
  
  @Input() 
  public col: number;
  
  @Input()
  public cellState: State;
  
  @Input()
  public validTurn: boolean;
  
  @Input()
  public winningCell: boolean;
  
  @Output() public stateChangeRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  private cellQuote: string = "Zzzzz....";
  
  public score: number = 0;
  
  ngOnInit() {
    this.cellQuote = this.quoteService.getQuote();
  }
   
  public get cellText(): string {
    if (this.cellState == State.O) {
      return "O";
    }
    if (this.cellState == State.X) {
      return "X";
    }
    return this.cellQuote;
  }

  constructor(public quoteService: QuotesService, public badTurn: BadTurnService) {
    this.id = CellComponent._counter;
    CellComponent._counter += 1;
  }
  
  public set():void {
    if (this.cellState === State.None) {
      if (this.validTurn) {
        this.stateChangeRequested.emit(true);
      }
      else {
        this.cellQuote = this.badTurn.getBadTurn();
        setTimeout(() => this.cellQuote = this.quoteService.getQuote(), 2000);       
      }
    }
  }

}
