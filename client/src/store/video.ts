const VIDEOS = [
  {
    id: '1',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislikes: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '2',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislikes: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '3',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislikes: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '4',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislikes: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '5',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislikes: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
];

import { createSlice } from '@reduxjs/toolkit';

export interface IVideo {
  id: string;
  thumbnail: string;
  title: string;
  sharedBy: string;
  likes: number;
  dislikes: number;
  description: string;
}

interface IVideoState {
  items: IVideo[];
}

const initialState: IVideoState = {
  items: VIDEOS,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
});

export const videoActions = videoSlice.actions;
