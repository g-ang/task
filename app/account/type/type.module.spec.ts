import { TypeModule } from './type.module';

describe('TypeModule', () => {
  let typeModule: TypeModule;

  beforeEach(() => {
    typeModule = new TypeModule();
  });

  it('should create an instance', () => {
    expect(typeModule).toBeTruthy();
  });
});
