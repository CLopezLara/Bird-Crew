import sanitizeHtml from "sanitize-html";

export const cleanContent = (req, res, next) => {
  const { content } = req.body;
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [
      "b",
      "i",
      "u",
      "s",
      "em",
      "strong",
      "a",
      "p",
      "ul",
      "ol",
      "li",
      "br",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "code",
      "span",
      "div",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      span: ["class", "style"],
      div: ["class", "style"],
      "*": ["style"],
    },
    allowedStyles: {
      "*": {
        color: [/^.*$/],
        "background-color": [/^.*$/],
        "text-align": [/^left$|^right$|^center$|^justify$/],
        "font-weight": [/^bold$|^normal$|^\d+$/],
        "font-style": [/^italic$|^normal$/],
        "text-decoration": [/^underline$|^line-through$|^none$/],
      },
    },
    selfClosing: ["img", "br"],

    allowCommentTag: false,
  });
  req.body.content = sanitizedContent;
  next();
};
