import React from "react";

export interface IPaginationType {
  take: number;
  skip: number;
  count: number;
  pages: number;
  current_page: number;
}

export interface IPaginatorType {
  pagination: IPaginationType;
  pageUrl: string;
}

export const paginationHelper = (ctx: any, count: number) => {
  let take = parseInt(process.env.NEXT_PAGINATION_TAKE);
  let skip = 0;
  if (ctx.query.page !== undefined && ctx.query.page != 1) {
    skip = (parseInt(ctx.query.page) - 1) * take;
  }
  const pages = Math.floor(count / take);
  const current_page = skip !== 0 ? skip / take : 1;
  return { take, skip, count, pages, current_page };
};

export const Paginator = ({ pagination, pageUrl }: IPaginatorType) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-light mb-3">
        Page {pagination.current_page} of {pagination.pages}
      </div>
      <nav>
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              href={
                pagination.current_page === 1
                  ? "#"
                  : `${pageUrl}?page=${pagination.current_page - 1}`
              }
              className="px-3 py-2 ml-0 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Previous
            </a>
          </li>
          {Array.from(Array(pagination.pages).keys()).map((el) => {
            return (
              <li key={el}>
                <a
                  href={`${pageUrl}?page=${el + 1}`}
                  className="px-3 py-2 leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {el + 1}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={
                pagination.current_page < pagination.pages
                  ? `${pageUrl}?page=${pagination.current_page + 1}`
                  : "#"
              }
              className="px-3 py-2 ml-0 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
