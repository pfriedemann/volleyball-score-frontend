import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TestView() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/test-backend")
      .then((res) => res.json())
      .then(() => {
        navigate("/game/10");
      });
  }, [navigate]);

  return <></>;
}
