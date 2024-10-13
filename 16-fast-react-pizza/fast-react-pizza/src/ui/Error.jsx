import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const routeError = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{routeError.data || routeError.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
