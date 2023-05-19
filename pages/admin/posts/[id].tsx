import React from "react";
import moment from "moment";
import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import AdminLayout from "../../../components/AdminLayout";
import { NextPageWithLayout } from "../../_app";
import PostForm from "../../../components/forms/PostForm";
import fetch, { RequestInit } from "node-fetch";
import Loader from "../../../components/Loader";
import { searchQuery } from "../../../lib/imagekit";

type PostWithAuthor = Prisma.PostGetPayload<{ include: { author: true } }>;
type Props = {
  post?: PostWithAuthor;
  currentImage?: File | null;
};

const Page: NextPageWithLayout = ({ post, currentImage }: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleFormSubmit = async (data: any) => {
    const params: RequestInit = {
      headers: {},
      method: "PATCH",
      body: data,
    };
    const res = await fetch("/api/admin/posts", { ...params });
    setLoading(false);
    return;
  };

  return (
    <>
      <div className="font-medium text-xl">{post.heading}</div>
      <div className="container">
        <div className="my-10 grid grid-cols-12 gap-5">
          {/* LEFT PANEL */}
          <div className="col-span-12 lg:col-span-8 lg:border-e lg:border-midnight">
            {loading ? (
              <Loader />
            ) : (
              <PostForm
                post={post}
                currentImage={currentImage}
                handleSubmit={(data: any) => {
                  setLoading(true), handleFormSubmit(data);
                }}
              />
            )}
          </div>
          {/* RIGHT PANEL */}
          <div className="col-span-12 lg:col-span-4">
            {post.author && (
              <div className="block lg:fixed max-w-sm p-6 rounded-lg shadow-lg bg-gray-800">
                <div className="grid grid-cols-12 gap-5">
                  {/* Avatar */}
                  <div className="col-span-3">
                    <div className="relative w-20 h-20 overflow-hidden rounded-full bg-gray-600">
                      <svg
                        className="absolute w-22 h-22 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {/* User Info */}
                  <div className="col-span-9">
                    <span className="text-lightGrey">@author</span>
                    <h5 className="text-xl font-bold tracking-tight text-gray-200">
                      {post.author.firstName} {post.author.lastName}
                    </h5>
                    <span className="text-sm text-gray-400">{post.author.email}</span>
                  </div>
                </div>
                <div className="mt-10 font-normal text-gray-400 flex justify-center items-start flex-col">
                  <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                    Views: {post.views}
                  </span>
                  <span className="mt-3 text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-900 text-indigo-300">
                    Created: {moment(post.createdAt).format("MMM Do, YYYY")}
                  </span>
                  <span className="mt-3 text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-900 text-indigo-300">
                    Updated: {moment(post.createdAt).format("MMM Do, YYYY")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export async function getServerSideProps({ params }) {
  let currentImage = null;
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: true, // Return all fields
    },
  });
  if (post.image) {
    let url: string = post.image;
    let name: string | string[] = url.split("/");
    name = name[name.length - 1];
    const ikRes = await searchQuery(name);
    currentImage = ikRes.length >= 1 ? ikRes[0] : null;
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      currentImage: currentImage,
    },
  };
}

export default Page;
