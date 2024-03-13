import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
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
            <SheetTrigger>
              <Button variant='outline'>Logout</Button>
            </SheetTrigger>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
