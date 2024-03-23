import { Home } from '@/src/screens';
import { IVideo } from '@/src/store';
import { render, initialState, fireEvent } from '@/tests/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const video: IVideo = {
  id: 1,
  title: 'Test Video',
  description: 'This video is for testing purpose',
  thumbnailUrl: 'dummy url',
  sourceUrl: 'dummy url',
  youtubeId: 'youtube-id',
  likes: [1, 2],
  dislikes: [],
  sharedBy: 'test@gmail.com',
};
const mockedNavigator = vi.fn();

describe('Home', () => {
  const preloadedState = {
    ...initialState,
    auth: {
      user: {
        id: 1,
        username: 'trung@gmail.com',
        token: 'testtoken',
      },
    },
  };

  beforeEach(() => {
    vi.mock('react-text-truncate', async (importOriginal) => {
      const mod = await importOriginal<typeof import('react-text-truncate')>();

      return {
        ...mod,
        default: ({ text }: { text: string }) => <div>{text}</div>,
      };
    });

    vi.mock('react-router-dom', async (importOriginal) => {
      const mod = await importOriginal<typeof import('react-router-dom')>();
      return {
        ...mod,
        useNavigate: () => mockedNavigator,
      };
    });
  });

  it('should render no videos with default state', () => {
    const rendered = render(<Home />, { preloadedState });
    expect(rendered.queryByText('No video found.')).toBeDefined();
  });

  it('should render videos with if exists in state', () => {
    const rendered = render(<Home />, {
      preloadedState: {
        ...initialState,
        video: {
          items: [video],
        },
      },
    });

    expect(rendered.container.getElementsByClassName('video-card').length).toBe(
      1
    );
  });

  it('should call click handler if click on video', () => {
    // const cardHandler = vi.fn()
    const rendered = render(<Home />, {
      preloadedState: {
        ...initialState,
        video: {
          items: [video],
        },
      },
    });

    const videoCard =
      rendered.container.getElementsByClassName('video-card')[0];
    const cardImg = videoCard.querySelector('img')!;
    expect(cardImg).toBeDefined();
    fireEvent.click(cardImg);
    expect(mockedNavigator).toHaveBeenCalledWith('/play/1');
  });
});
