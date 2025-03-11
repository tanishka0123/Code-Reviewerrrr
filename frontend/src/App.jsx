import React, { useEffect, useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`//Write Your Code For Review Here:

function sum() {
  return 1 + 2;
}`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    const res = await axios.post("http://localhost:3000/ai/get-response", {
      code,
    });
    setLoading(false);
    setReview(res.data);
  }
  return (
    <>
    <header className="header">Code Reviewer 
      <img src="./img2.png" className="image" />
    </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(c) => setCode(c)}
              highlight={(c) =>
                prism.highlight(c, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: "2px solid #555",
                borderRadius: "12px",
                height: "100%",
                width: "100%",
                overflow: "auto",
                backgroundColor: "#1f1f2e",
                color: "#e0e0e0",
              }}
            />
          </div>
          <div onClick={reviewCode} className="btn">
            {loading ? <div className="spinner"></div> : "Review"}
          </div>
        </div>
        <div className="right"><Markdown
        rehypePlugins={[rehypeHighlight]}>{review}</Markdown></div>
      </main>
    </>
  );
}

export default App;
