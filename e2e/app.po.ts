export class TicTacToeNg2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tic-tac-toe-ng2-app h1')).getText();
  }
}
