import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function NotFound() {
  const navigate = useNavigate();
  const routeError = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{routeError.data || routeError.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
