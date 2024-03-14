import { describe, expect, it } from 'vitest';
import { authSlice, authActions, IAuthState } from '@/src/store/auth';

const USERNAME = 'trung@gmail.com';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      user: '',
    });
  });

  it('should login user', () => {
    const previousState: IAuthState = {
      user: '',
    };

    expect(
      authSlice.reducer(previousState, authActions.login({ user: USERNAME }))
    ).toEqual({ user: USERNAME });
  });

  it('should logout user', () => {
    const previousState: IAuthState = {
      user: USERNAME,
    };

    expect(authSlice.reducer(previousState, authActions.logout())).toEqual({
      user: '',
    });
  });
});
