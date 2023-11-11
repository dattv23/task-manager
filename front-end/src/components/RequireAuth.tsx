import { useAppSelector } from '../hook/redux'
import { Navigate } from 'react-router-dom';

type Props = {
      children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
      const app = useAppSelector(state => state.app);

      if (!app.isSigned) {
            return <Navigate to="/login" />;
      }

      return children;
}
