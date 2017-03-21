import { TextCliPage } from './app.po';

describe('text-cli App', () => {
  let page: TextCliPage;

  beforeEach(() => {
    page = new TextCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
