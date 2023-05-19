import React from "react";
import { Post } from "@prisma/client";
import TinymceEditor from "../TinymceEditor";
import Link from "next/link";

const fieldStyles =
  "block px-5 py-3 w-full text-sm rounded-md bg-dark border-0 border-dark ring-0 outline-0 text-gray-400 placeholder-gray-400 focus:ring-0 focus:bg-moonlight focus:text-white focus:shadow-lg";
const fileFieldStyles =
  "block w-full text-sm rounded-md cursor-pointer text-blue-200 bg-dark border-pink-900 placeholder-grey";

type Props = {
  post?: Post | null;
  currentImage?: File | null;
  handleSubmit: (data: FormData) => void;
};

const getLabel = (value: string) => {
  return (
    <label
      htmlFor="category"
      className="block mb-2 text-sm font-bold text-gray-400"
    >
      {value}
    </label>
  );
};

export default ({ post, currentImage, handleSubmit }: Props) => {
  const [content, setContent] = React.useState("");
  const [formState, setFormState] = React.useState({});
  const [image, setImage] = React.useState<File>(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      console.log("updated image");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string
  ) => {
    let temp = formState;
    temp[field] = (event.target as HTMLInputElement).value;
    setFormState({ ...temp });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append("content", content);
    Object.keys(formState).map((el) => {
      body.append(el, formState[el]);
    });

    // If post.id is present then update, else create new record
    if (post.id) body.append("id", post.id);

    // Send image if new image is uploaded by user
    if (createObjectURL) body.append("image", image);

    handleSubmit(body);
  };

  React.useEffect(() => {
    if (post.content) setContent(post.content);
    if (currentImage) {
      setImage(currentImage);
    }
  }, []);

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} spellCheck={false}>
      {post && (
        <div className="mb-6 grid grid-cols-12">
          <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
            {getLabel("ID")}
          </div>
          <div className="col-span-12 lg:col-span-8">
            <span className="font-medium mr-2 p-3 px-4 rounded bg-dark text-gray-500">
              {post?.id}
            </span>
          </div>
        </div>
      )}
      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Category*")}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <select
            id="category"
            className={fieldStyles}
            defaultValue={post.category}
            onChange={(e) => handleChange(e, "category")}
          >
            <option value="default">Select Category</option>
            <option value="NEWS">News</option>
            <option value="TRANSFERS">Transfers</option>
            <option value="OFF_THE_PITCH">Off the pitch</option>
            <option value="PREMIER_LEAGUE">Premier League</option>
            <option value="LA_LIGA">La Liga</option>
            <option value="BUNDESLIGA">Bundesliga</option>
            <option value="SERIE_A">Serie A</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("URL*")}
        </div>
        <textarea
          id="url"
          rows={3}
          className={`col-span-12 lg:col-span-8 ${fieldStyles}`}
          defaultValue={post?.url}
          onChange={(e) => handleChange(e, "url")}
        ></textarea>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Heading*")}
        </div>
        <textarea
          id="heading"
          rows={3}
          className={`col-span-12 lg:col-span-8 block ${fieldStyles}`}
          defaultValue={post?.heading}
          onChange={(e) => handleChange(e, "heading")}
        ></textarea>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Sub Heading*")}
        </div>
        <textarea
          id="subHeading"
          rows={3}
          className={`col-span-12 lg:col-span-8 block ${fieldStyles}`}
          defaultValue={post?.subHeading}
          onChange={(e) => handleChange(e, "subHeading")}
        ></textarea>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Content*")}
        </div>
        <div className="w-full col-span-12 lg:col-span-8">
          <TinymceEditor value={content} onEditorChange={setContent} />
        </div>
      </div>

      <div className="mt-10 mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Image*")}
        </div>
        <div className="col-span-12 lg:col-span-8">
          {image && (
            <>
              <span className="text-lightGrey text-sm">Image Preview</span>
              <img
                className="max-w-full mb-5 p-5 border border-dashed border-lightGrey"
                src={createObjectURL ? createObjectURL : post.image}
              />
            </>
          )}
          <input
            className={fileFieldStyles}
            // aria-describedby="file_input_help"
            id="image"
            type="file"
            onChange={uploadToClient}
          />
          {!image && (
            <div className="col-span-12 lg:col-span-8 mt-2 text-sm break-normal font-bold">
              Current Image:{" "}
              <Link href={post?.image}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {post?.image}
                </a>
              </Link>
            </div>
          )}
          <p className="mt-1 text-xs text-lightGrey" id="file_input_help">
            PNG, JPG or WEBP.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Image Alt")}
        </div>
        <div className="col-span-12 lg:col-span-8">
          <input
            className={fieldStyles}
            id="imageAlt"
            type="text"
            defaultValue={post?.imageAlt}
            onChange={(e) => handleChange(e, "imageAlt")}
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("Keywords*")}
        </div>
        <div className="col-span-12 lg:col-span-8">
          <input
            className={fieldStyles}
            id="keywords"
            type="text"
            defaultValue={post?.keywords}
            onChange={(e) => handleChange(e, "keywords")}
          />
        </div>
      </div>

      <div className="mb-10 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 lg:flex lg:justify-end lg:items-start lg:mx-5">
          {getLabel("SEO Description*")}
        </div>
        <textarea
          id="seoDescription"
          rows={3}
          className={`col-span-12 lg:col-span-8 ${fieldStyles}`}
          defaultValue={post?.seoDescription}
          onChange={(e) => handleChange(e, "seoDescription")}
        ></textarea>
      </div>

      <div className="mt-10 flex justify-start items-center">
        <button
          type="submit"
          className="font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-800 hover:bg-blue-700 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
