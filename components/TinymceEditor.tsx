import { Editor } from "@tinymce/tinymce-react";

export default function TinymceEditor({
  value,
  onEditorChange,
}: {
  value: string;
  onEditorChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Editor
      tinymceScriptSrc={`/tinymce/tinymce.min.js`}
      // onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={(a: string, editor: any) => onEditorChange(a)}
      init={{
        skin: "oxide-dark",
        content_css: "dark",
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        toolbar:
          "link | fontFamily | blocks | bullist | numlist | bold italic forecolor | " +
          "alignleft aligncenter alignright alignjustify | outdent indent | " +
          "removeformat | image | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
