import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { useState } from "react";
import { Code2, MessageSquare, Monitor, Rocket, Send, X } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Editor from "@monaco-editor/react";
const formatHTML = (html = "") => {
  try {
    return html
      .replace(/></g, ">\n<")
      .replace(/(<\/(head|body|html)>)/g, "$1\n")
      .replace(/(<(head|body|html)[^>]*>)/g, "\n$1\n")
      .replace(/\n\s*\n/g, "\n");
  } catch {
    return html;
  }
};
function WebsiteEditor() {
  const { id } = useParams();
  const [website, setwebsite] = useState(null);
  const [error, seterror] = useState("");
  const [code, setcode] = useState("");
  const [message, setmessage] = useState([]);
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);
  const [thinking, setthinking] = useState(0);
  const [showCode, setshowCode] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [showChat, setshowChat] = useState(false)
  const thinkingStep = [
    "Understanding your request…",
    "Planning layout changes…",
    "Improving responsiveness…",
    "Applying animations…",
    "Finalizing update…",
  ];
const chatEndRef = useRef(null);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message, loading]);
  const iframeRef = useRef(null);
  const handleupdate = async () => {
    if (!prompt) return;
    setloading(true);
    const text = prompt;
    setprompt("");
    setmessage((m) => [...m, { role: "user", content: prompt }]);
    try {
      const result = await axios.post(
        `${serverUrl}/api/web/update/${id}`,
        { prompt: text },
        { withCredentials: true },
      );
      console.log(result);
      setloading(false);
      setmessage((m) => [...m, { role: "ai", content: result.data.message }]);
setcode(formatHTML(result.data.code));
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!loading) return;
    const i = setInterval(() => {
      setthinking((i) => (i + 1) % thinkingStep.length);
    }, 1200);
    return () => clearInterval(i);
  }, [loading]);
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/web/get/${id}`, {
          withCredentials: true,
        });
        setwebsite(result.data.website);
setcode(formatHTML(result.data.website.code));
        setmessage(result.data.website.conversation);
      } catch (error) {
        console.log(error);
        seterror(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, [id]);
const handledeploy = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/web/deploy/${website._id}`, {
        withCredentials: true,
      });
      window.open(`${result.data.url}`, "_blank");
     


    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!code || !iframeRef.current) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }
  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">
        <Header />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overflow-hidden">
          {message.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] ${
                m.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-zinc-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="max-w-[85%] mr-auto">
              <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                {thinkingStep[thinking]}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <input
              placeholder="Describe Changes..."
              className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-outline-none"
              onChange={(e) => setprompt(e.target.value)}
              value={prompt}
            />
            <button
              className="px-4 py-3 rounded-2xl bg-white text-black"
              disabled={loading}
              onClick={handleupdate}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>
          <div className="flex items-center gap-3">
            {/* Deploy Button */}
            {website.deployed?"":
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-500/20"
            onClick={handledeploy}
            >
              <Rocket size={18} />
              <span className="text-sm font-medium">Deploy</span>
            </button>
            }
           
            <button className="p-2 lg:hidden rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
            onClick={()=>setshowChat(true)}
            >
              <MessageSquare size={18} />
            </button>

            {/* Code View Button */}
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
              onClick={() => setshowCode(true)}
            >
              <Code2 size={18} />
            </button>

            {/* Preview Button */}
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
              onClick={() => setshowPreview(true)}
            >
              <Monitor size={18} />
            </button>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          className="flex-1 w-full  bg-white"
      sandbox='allow-scripts allow-same-origin allow-forms'
        />
      </div>
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
          >
            <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
              <span className="text-sm font-medium">index.html</span>
              <button onClick={() => setshowCode(false)}>
                <X size={18} />
              </button>
            </div>
      <Editor
 theme="vs-dark"
 value={code}
 language="html"
 onChange={(c) => setcode(c)}
 options={{
   wordWrap: "on",
   automaticLayout: true,
   fontSize: 14
 }}
/>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
          >
            {/* Top Bar */}
            <div className="h-12 flex items-center justify-between px-4 bg-black border-b border-white/10">
              <span className="text-sm text-zinc-400">Preview Mode</span>
              <button
                onClick={() => setshowPreview(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview Iframe */}
            <iframe
              className="flex-1 w-full bg-white"
              srcDoc={code}
              sandbox='allow-scripts allow-same-origin allow-forms'
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {showChat && (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col lg:hidden"
    >
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-black/80">
        <span className="font-semibold">Chat</span>
        <button
          onClick={() => setshowChat(false)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {message.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] ${
              m.role === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-white text-black"
                  : "bg-white/5 border border-white/10 text-zinc-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="max-w-[85%] mr-auto">
            <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
              {thinkingStep[thinking]}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <input
            placeholder="Describe changes..."
            className="flex-1 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 outline-none text-sm"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
          />
          <button
            onClick={handleupdate}
            disabled={loading}
            className="px-4 py-3 rounded-2xl bg-white text-black active:scale-95 transition"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
  function Header() {
    return (
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <span className="font-semibold truncate">{website.title}</span>
      </div>
    );
  }
}

export default WebsiteEditor;
