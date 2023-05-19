import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AdminLayout from "../../components/AdminLayout";
import routes from "../../lib/routes";
import prisma from "../../lib/prisma";
import type { NextPageWithLayout } from "../_app";

interface IPropType {
  postCount: number;
  viewCount: any;
}

const Page: NextPageWithLayout = ({ postCount, viewCount }: IPropType) => {
  const router = useRouter();
  const session = useSession();
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(routes.ADMIN_LOGIN);
    }
  }, [session]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-12 gap-7">
      <div className="col-span-10 lg:col-span-3">
        <div className="bg-dark p-10 rounded-md">
          <div className="text-lightGrey text-sm">TOTAL POSTS</div>
          <div className="mt-2 text-brand text-5xl">{postCount}</div>
        </div>
      </div>
      <div className="col-span-10 lg:col-span-3">
        <div className="bg-dark p-10 rounded-md">
          <div className="text-lightGrey text-sm">TOTAL VIEWS</div>
          <div className="mt-2 text-brand text-5xl">{viewCount._sum.views}</div>
        </div>
      </div>
      <div className="col-span-6"></div>
    </div>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export async function getServerSideProps(ctx) {
  const postCount = await prisma.post.count({});
  const viewCount = await prisma.post.aggregate({
    _sum: {
      views: true,
    },
  });
  return {
    props: {
      postCount,
      viewCount,
    },
  };
}

export default Page;
