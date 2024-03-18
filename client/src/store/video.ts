import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkDispatch, RootState } from '.';
import { toast } from '../components/ui/use-toast';

export interface IVideo {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  sourceUrl: string;
  youtubeId: string;
  likes: number;
  dislikes: number;
  sharedBy: string;
}

export interface IVideoState {
  items: IVideo[];
}

const initialState: IVideoState = {
  items: [],
};

export function fetchVideos() {
  return async function (
    dispatch: AppThunkDispatch,
    getState: () => RootState
  ) {
    const state = getState();
    try {
      const response = await fetch('/api/videos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      });

      const data = await response.json();

      if (data.code === 200) {
        console.log(data);
        dispatch(videoActions.replace({ items: data.data }));
      } else {
        toast({
          title: 'Unable to fetch videos',
        });
      }
    } catch (error) {
      toast({
        title: 'Unexpected error',
      });
    }
  };
}

interface ResponseData<T> {
  code: number;
  status: string;
  data: T;
}

export function shareVideo(url: string, callback?: () => void) {
  return async function (
    dispatch: AppThunkDispatch,
    getState: () => RootState
  ) {
    const state = getState();
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
        body: JSON.stringify({ url }),
      });

      const data: ResponseData<IVideo> = await response.json();

      if (data.code === 200) {
        dispatch(videoActions.add(data.data));
        if (!!callback) callback();
      } else {
        toast({
          title: 'Unable to share video',
        });
      }
    } catch (error) {
      toast({
        title: 'Unexpected error',
      });
    }
  };
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    replace(state, action: PayloadAction<IVideoState>) {
      state.items = action.payload.items;
    },
    add(state, action: PayloadAction<IVideo>) {
      state.items = [...state.items, action.payload];
    },
  },
});

export const videoActions = videoSlice.actions;
