import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";
import { javascript } from "@codemirror/lang-javascript";

import {
  EditorState,
  EditorView,
  basicSetup
} from "@codemirror/next/basic-setup";

import CodeMirror from "@uiw/react-codemirror";

import "./styles.css";

import * as random from "lib0/random";

export const usercolors = [
  { color: "#30bced", light: "#30bced33" },
  { color: "#6eeb83", light: "#6eeb8333" },
  { color: "#ffbc42", light: "#ffbc4233" },
  { color: "#ecd444", light: "#ecd44433" },
  { color: "#ee6352", light: "#ee635233" },
  { color: "#9ac2c9", light: "#9ac2c933" },
  { color: "#8acb88", light: "#8acb8833" },
  { color: "#1be7ff", light: "#1be7ff33" }
];

// select a random color for this user
export const userColor = usercolors[random.uint32() % usercolors.length];

export default function App() {
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider("https://ku6ko.csb.app/", ydoc);
  const ytext = ydoc.getText("codemirror");

  const undoManager = new Y.UndoManager(ytext);

  provider.awareness.setLocalStateField("user", {
    name: "Anonymous " + Math.floor(Math.random() * 100),
    color: userColor.color,
    colorLight: userColor.light
  });

  return (
    <>
      <CodeMirror
        height="200px"
        extensions={[
          javascript({ jsx: true }),
          yCollab(ytext, provider.awareness, { undoManager })
        ]}
      />
    </>
  );
}
