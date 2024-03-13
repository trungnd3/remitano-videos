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
import { authActions, useAppDispatch } from '@/src/store';

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    dispatch(authActions.logout());
  };

  return (
    <Sheet data-testid='sidebar'>
      <SheetTrigger>
        <Avatar data-testid='avatar'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>TN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='h-full'>
          <SheetTitle>
            <p>Welcome,</p>
            <p>trungnguyen@gmail.com</p>
          </SheetTitle>
          <Separator className='my-4' />
          <div className='pt-4 flex items-center justify-end gap-2'>
            <SheetTrigger asChild>
              <Button variant='outline' onClick={logoutHandler}>
                Logout
              </Button>
            </SheetTrigger>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
