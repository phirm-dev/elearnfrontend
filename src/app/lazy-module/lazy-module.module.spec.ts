import { LazyModuleModule } from './lazy-module.module';

describe('LazyModuleModule', () => {
  let lazyModuleModule: LazyModuleModule;

  beforeEach(() => {
    lazyModuleModule = new LazyModuleModule();
  });

  it('should create an instance', () => {
    expect(lazyModuleModule).toBeTruthy();
  });
});
