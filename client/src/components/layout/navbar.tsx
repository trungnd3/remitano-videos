import { Link } from 'react-router-dom';
import { LucideImagePlus } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const routes = [
  {
    icon: LucideImagePlus,
    href: '/share',
    tooltip: 'Share a movie',
    color: 'text-red-700',
  },
];

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between gap-2'>
      {routes.map((route) => (
        <Link to={route.href} key={route.href} className='flex items-center'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <route.icon className={cn('h-9 w-9 mr-3', route.color)} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{route.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </nav>
  );
}
