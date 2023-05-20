import React, { Suspense, lazy } from "react";

const AdminComponent = lazy(
  () => import("../../components/RTCs/peerJS/AdminComponent")
);
const Admin = () => {
  // ROUGHLY MADE (Admin)
  const isSSR = typeof window === "undefined";
  return (
    <>
      {!isSSR && (
        <Suspense>
          {/* PeerJS only be executed in the browser environment */}
          <AdminComponent />
        </Suspense>
      )}
    </>
  );
};

export default Admin;
