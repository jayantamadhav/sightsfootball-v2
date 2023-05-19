import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import routes from "../../../lib/routes";
import prisma from "../../../lib/prisma";
import AdminLoader from "../../../components/AdminLoader";
import moment from "moment";
import {
  paginationHelper,
  IPaginationType,
  Paginator,
} from "../../../components/Pagination";
import { NextPageWithLayout } from "../../_app";

interface IProps {
  posts: any[];
  pagination: IPaginationType;
}

const Page: NextPageWithLayout = ({ posts, pagination }: IProps) => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <div className="text-2xl text-lightGrey">All Posts</div>
        <div className="font-medium rounded-md text-sm px-5 py-1 mr-2 mb-2 bg-blue-800 hover:bg-blue-700 focus:outline-none cursor-pointer">Add Post</div>
      </div>
      <div className="mt-3 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Heading
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Views
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((el) => {
                return (
                  <tr
                    key={el.id}
                    className="bg-dark hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      router.push(`${routes.ADMIN_POSTS_DETAILS}/${el.id}`);
                    }}
                  >
                    <td className="px-6 py-3 font-medium text-gray-300">
                      {el.heading}
                    </td>
                    <td className="px-6 py-3">
                      {moment(el.createdAt).format("MMM Do, YYYY")}
                    </td>
                    <td className="px-6 py-3">{el.views}</td>
                    <td className="px-6 py-3">
                      {el.author?.firstName} {el.author?.lastName}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {pagination.pages > 0 && (
        <div className="mt-10">
          <Paginator pagination={pagination} pageUrl={router.pathname} />
        </div>
      )}
    </div>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export async function getServerSideProps(ctx) {
  const count = await prisma.post.count({});
  const pagination = paginationHelper(ctx, count);
  const posts = await prisma.post.findMany({
    take: pagination.take,
    skip: pagination.skip,
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
    },
  });

  console.log(posts);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      pagination: pagination,
    },
  };
}

export default Page;
