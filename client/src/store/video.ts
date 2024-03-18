import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '.';
import { toast } from '@/src/components/ui/use-toast';
import { getWithAuth, postWithAuth } from '../lib/utils';

export interface IVideo {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  sourceUrl: string;
  youtubeId: string;
  likes: number[];
  dislikes: number[];
  sharedBy: string;
}

export interface IVideoState {
  items: IVideo[];
}

const initialState: IVideoState = {
  items: [],
};

export function fetchVideos() {
  return async function (dispatch: AppThunkDispatch) {
    try {
      const data = await getWithAuth<IVideo[]>('videos');
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

export function shareVideo(url: string, callback?: () => void) {
  return async function (dispatch: AppThunkDispatch) {
    try {
      const data = await postWithAuth<IVideo>(
        'videos',
        JSON.stringify({ url })
      );
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

interface IPreferVideo {
  likes: number[];
  dislikes: number[];
}
interface IReplacePrefer {
  id: number;
  likes: number[];
  dislikes: number[];
}

export function preferVideo(id: number, liked: boolean) {
  return async function (dispatch: AppThunkDispatch) {
    try {
      const data = await postWithAuth<IPreferVideo>(
        'videos/prefer',
        JSON.stringify({ id, liked })
      );
      if (data.code === 200) {
        dispatch(
          videoActions.updatePrefer({
            id,
            likes: data.data.likes,
            dislikes: data.data.dislikes,
          })
        );
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
    updatePrefer(state, action: PayloadAction<IReplacePrefer>) {
      const updatedItems = [...state.items];
      const index = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        updatedItems[index] = {
          ...updatedItems[index],
          likes: [...action.payload.likes],
          dislikes: [...action.payload.dislikes],
        };
      }
      state.items = [...updatedItems];
    },
  },
});

export const videoActions = videoSlice.actions;
