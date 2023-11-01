import { Outlet } from "react-router-dom";

export function DefaultPage() {
  return (
    <div className="default-page">
      <Outlet />
    </div>
  );
}
