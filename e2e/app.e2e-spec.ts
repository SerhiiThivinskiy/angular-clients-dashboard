import { LakmusTestAppPage } from './app.po';

describe('lakmus-test-app App', () => {
  let page: LakmusTestAppPage;

  beforeEach(() => {
    page = new LakmusTestAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
