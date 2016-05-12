import { TicTacToeNg2Page } from './app.po';

describe('tic-tac-toe-ng2 App', function() {
  let page: TicTacToeNg2Page;

  beforeEach(() => {
    page = new TicTacToeNg2Page();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tic-tac-toe-ng2 works!');
  });
});
