import { Injectable } from '@angular/core';

@Injectable()
export class QuotesService {
  
  public quotes: string[] = [
    "This is a Hollywood square.",
    "Pick me! Ooh, ooh, pick me!",
    "Are you thinking hard?",
    "Tap. Tap. Tap.",
    "Row, row, row.",
    "I'm trying to think!",
    "Don't push too hard.",
    "Be very, very careful.",
    "I refuse to be punched.",
    "I'm feeling off-key today.",
    "Let's button this up.",
    "I have a nervous tic.",
    "This game is tac-key.",
    "It was the best of tiles, it was the worst of tiles...",
    "Sometimes things just seem to click.",
    "I'm very square.",
    "Watch out for tics."
  ]

  constructor() {}

  public getQuote(): string {
    return this.quotes[Math.floor(Math.random()*this.quotes.length)];
  }

}
