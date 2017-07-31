import { OrientamentoUniboPage } from './app.po';

describe('orientamento-unibo App', () => {
  let page: OrientamentoUniboPage;

  beforeEach(() => {
    page = new OrientamentoUniboPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
