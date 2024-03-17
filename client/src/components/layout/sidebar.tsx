import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { Separator } from '@/src/components/ui/separator';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { authActions, useAppDispatch, useAppSelector } from '@/src/store';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar data-testid='avatar'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>TN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent data-testid='sidebar'>
        <SheetHeader className='h-full'>
          <SheetTitle>
            <p>Welcome,</p>
            <p>{user.username}</p>
          </SheetTitle>
          <Separator className='my-4' />
          <div className='pt-4 flex items-center justify-end gap-2'>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                onClick={logoutHandler}
                data-testid='logout'
              >
                Logout
              </Button>
            </SheetTrigger>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
