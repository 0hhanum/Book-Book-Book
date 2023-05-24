import React, { Suspense, lazy } from "react";
import { checkIsSSR } from "../../components/utils";

const AdminComponent = lazy(
  () => import("../../components/RTCs/peerJS/AdminComponent")
);
const Admin = () => {
  // ROUGHLY MADE (Admin)
  const isSSR = checkIsSSR();
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
