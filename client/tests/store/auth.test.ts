import { describe, expect, it } from 'vitest';
import { authSlice, authActions, IAuthState } from '@/src/store/auth';

describe('authSlice', () => {
  const initialState = {
    user: {
      id: 0,
      username: '',
      token: '',
      tokenExpiresAt: 0,
    },
  };

  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should login user', () => {
    const previousState: IAuthState = initialState;

    expect(
      authSlice.reducer(
        previousState,
        authActions.login({
          user: {
            id: 1,
            username: 'test',
            token: 'testtoken',
            tokenExpiresAt: 1711174768928,
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
        tokenExpiresAt: 1711174768928,
      },
    };

    expect(
      authSlice.reducer(previousState, authActions.logout()).user.token
    ).toEqual('');
  });
});
