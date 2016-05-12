import { Injectable } from '@angular/core';

@Injectable()
export class BadTurnService {
  
  public quotes: string[] = [
    "Ouch! It's my turn!",
    "Hey, that's not fair.",
    "Wait your turn!",
    "I'm thinking, I'm thinking.",
    "Where's the fire?",
    "Stop that."
  ]

  constructor() {}

  public getBadTurn(): string {
    return this.quotes[Math.floor(Math.random()*this.quotes.length)];
  }

}
