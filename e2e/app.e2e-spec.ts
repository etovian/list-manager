import { ListManagerPage } from './app.po';

describe('list-manager App', function() {
  let page: ListManagerPage;

  beforeEach(() => {
    page = new ListManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
