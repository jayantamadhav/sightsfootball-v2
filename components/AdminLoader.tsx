import { CSSProperties } from "react";
import { BarLoader } from "react-spinners";
import colors from "tailwindcss/colors";
import AdminLayout from "./AdminLayout";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default () => {
  return (
    <AdminLayout>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="text-3xl mb-5 text-lightGrey">SightsFootball</div>
        <BarLoader
          id="adminSpinner"
          color="#E2703A"
          loading={true}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </AdminLayout>
  );
};
