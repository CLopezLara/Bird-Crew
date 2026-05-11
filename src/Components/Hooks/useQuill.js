import { useEffect, useRef } from "react";
import Quill from "quill";

const SizeStyle = Quill.import("attributors/style/size");
const Custom_Font_Sizes = [
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "34px",
  "36px",
];
SizeStyle.whitelist = Custom_Font_Sizes;
Quill.register(SizeStyle, true);
export function useQuill({ onChange }) {
  const editor = useRef(null);
  const quill = useRef(null);
  useEffect(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "formula"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: Custom_Font_Sizes }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ];

    if (!editor.current || quill.current) {
      return;
    }

    quill.current = new Quill(editor.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Escribe tu publicación aquí",
    });

    quill.current.on("text-change", () => {
      const html = quill.current.getSemanticHTML();
      const delta = quill.current.getContents();
      onChange({ html, delta });
    });
  }, [onChange]);

  return { editor, quill };
}
