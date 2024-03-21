import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { isSocketOpen } from '@/src/lib/utils';
import { useAppDispatch, useAppSelector, videoActions } from '@/src/store';
import { toast } from '../components/ui/use-toast';

interface WebSocketContextProps {
  ready: boolean;
  value: any;
  send:
    | ((data: string | Blob | ArrayBufferView | ArrayBufferLike) => void)
    | undefined;
}

export const WebSocketContext = createContext<WebSocketContextProps>({
  ready: false,
  value: null,
  send: undefined,
});

export function WebSocketContextProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(null);
  const [received, setReceived] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const ws: React.MutableRefObject<WebSocket | null> = useRef(null);

  useEffect(() => {
    let socket: WebSocket;
    if (user.token) {
      socket = new WebSocket(`ws://${window.location.host}/ws`);

      socket.onopen = () => {
        console.log('Connection established');
        setReady(true);
        setReceived(false);
      };

      socket.onclose = () => {
        console.log('Connection closed');
        setReady(false);
        setReceived(false);
      };

      socket.onmessage = (event) => {
        setValue(event?.data);
        setReceived(true);
      };

      socket.onerror = (event) => console.log('Connection error: ', event);

      ws.current = socket;
    }

    return () => {
      if (socket && ws.current && isSocketOpen(socket)) {
        socket.close();
        setReceived(false);
      }
    };
  }, [user.token]);

  useEffect(() => {
    if (value && received) {
      const pValue = JSON.parse(value);
      if (pValue && pValue.type) {
        switch (pValue.type) {
          case 'SHARE':
            dispatch(videoActions.add(pValue.video));
            break;
          case 'LIKE':
          case 'DISLIKE':
            dispatch(
              videoActions.updatePrefer({
                id: pValue.video.id,
                likes: pValue.video.likes,
                dislikes: pValue.video.dislikes,
              })
            );
            break;
          default:
        }
        toast({
          description: (
            <div>
              <span className='font-semibold'>{pValue.username}</span>
              <span className='font-bold'> {pValue.type}D </span>
              <span className='font-medium'>{pValue.video.title}</span>
            </div>
          ),
        });
        setReceived(false);
      }
    }
  }, [received]);

  function send(data: any) {
    if (ws.current && isSocketOpen(ws.current)) {
      ws.current?.send(data);
    }
  }

  const contextValue = {
    ready,
    value,
    send,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}
