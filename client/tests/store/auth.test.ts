import { describe, expect, it } from 'vitest';
import { authSlice, authActions, IAuthState } from '@/src/store/auth';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      user: '',
    });
  });

  it('should login user', () => {
    const previousState: IAuthState = {
      user: {
        id: 0,
        username: '',
        token: '',
      },
    };

    expect(
      authSlice.reducer(
        previousState,
        authActions.login({
          user: {
            id: 1,
            username: 'test',
            token: 'testtoken',
          },
        })
      ).user.token
    ).toEqual('testtoken');
  });

  it('should logout user', () => {
    const previousState: IAuthState = {
      user: {
        id: 1,
        username: 'test',
        token: 'testtoken',
      },
    };

    expect(
      authSlice.reducer(previousState, authActions.logout()).user.token
    ).toEqual('');
  });
});
