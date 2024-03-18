import TextCenter from './text-center';

interface ErrorProps {
  status: string;
  message: string;
}

export default function Error({ status, message }: ErrorProps) {
  return (
    <TextCenter
      title={status}
      description={message}
      direct={{ to: '/', text: 'Go back Home' }}
    />
  );
}
