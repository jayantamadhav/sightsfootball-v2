import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import routes from "../lib/routes";
import Loader from "./Loader";

export const metadata = {
  title: "SightsFootball Admin Panel",
  description: "Admin Panel Console",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    if (session.status === "loading") setLoading(true);
    if (session.status === "unauthenticated") router.push(routes.ADMIN_LOGIN);

    setLoading(false);

    const handleRouteChange = (url, { shallow }) => {
      setLoading(true);
      return;
    };

    const handleRouteComplete = (url, { shallow }) => {
      setLoading(false);
      return;
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [session]);
  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} setOpen={handleSidebarOpen} />
      <main className="content">
        <Navbar open={sidebarOpen} setOpen={handleSidebarOpen} />
        <div className="p-6 w-full">
          {loading ? <Loader /> : children}
        </div>
      </main>
    </div>
  );
}
