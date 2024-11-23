"use client";
import React from "react";
import MarkdownIt from "markdown-it";
import doMarkdownIt from "@digitalocean/do-markdownit";
import "@/app/style.scss";

const md = MarkdownIt({
  html: true,
  linkify: true,
}).use(doMarkdownIt, {
  plugins: {
    callout: true,
    youtube: true,
  },
});


const MarkdownPreview = ({ markdown }) => {
  return (
    <div>
      <div
        className="markdown markdown-preview"
        dangerouslySetInnerHTML={{
          __html: md.render(markdown || "No content available."),
        }}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      />
    </div>
  );
};

export default MarkdownPreview;
