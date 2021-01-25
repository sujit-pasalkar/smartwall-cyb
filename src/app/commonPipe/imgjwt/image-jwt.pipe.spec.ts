import { ImageJwtPipe } from './image-jwt.pipe';

describe('ImageJwtPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageJwtPipe();
    expect(pipe).toBeTruthy();
  });
});
