import { useLocation } from "react-router-dom";

export function AuthRoute() {
  const location = useLocation();
  console.log(location);
  return null;
}
