import { CSSProperties } from "react";
import { BarLoader } from "react-spinners";
import colors from "tailwindcss/colors";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="text-3xl mb-5 text-grey">SightsFootball</div>
      <BarLoader
        id="spinner"
        color="#fffc00"
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
