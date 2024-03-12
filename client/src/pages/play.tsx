import { useParams } from 'react-router-dom';

export default function Play() {
  const params = useParams();

  console.log(params);

  return <div>Play</div>;
}
