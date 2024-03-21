import { MouseEventHandler } from 'react';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

export interface PreferProps {
  handler: MouseEventHandler<HTMLButtonElement>;
  Icon: LucideIcon;
  count: number;
  active?: boolean;
}

export default function Prefer({
  handler,
  Icon,
  count,
  active = false,
}: PreferProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='group hover:bg-red-500 cursor-pointer flex items-center gap-2 px-1'
      onClick={handler}
    >
      <Icon className='group-hover:text-white' fill={active ? 'red' : 'none'} />
      <span className='group-hover:text-white'>{count}</span>
    </Button>
  );
}
