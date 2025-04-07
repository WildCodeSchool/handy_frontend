import { ClonePipe } from './author.pipe';

describe('ClonePipe', () => {
  it('create an instance', () => {
    const pipe = new ClonePipe();
    expect(pipe).toBeTruthy();
  });
});
