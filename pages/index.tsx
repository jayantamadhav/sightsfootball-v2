import React from "react";
import Loader from "../components/Loader";
import Layout from "../components/Layout";

export default () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false)
  })
  return loading ? (
    <Loader />
  ) : (
    <Layout>
      hello
    </Layout>
  );
};
