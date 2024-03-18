import { describe, expect, it } from 'vitest';
import { videoSlice } from '@/src/store/video';

describe('videoSlice', () => {
  it('should return the initial state', () => {
    expect(videoSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  // it('should login user', () => {
  //   const previousState: IVideoState = {
  //     items: [],
  //   };

  //   expect(
  //     videoSlice.reducer(previousState, videoActions.login({ user: USERNAME }))
  //   ).toEqual({ user: USERNAME });
  // });

  // it('should logout user', () => {
  //   const previousState: IVideoState = {
  //     user: USERNAME,
  //   };

  //   expect(videoSlice.reducer(previousState, videoActions.logout())).toEqual({
  //     user: '',
  //   });
  // });
});
