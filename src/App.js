import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";
import { javascript } from "@codemirror/lang-javascript";

import CodeMirror from "@uiw/react-codemirror";
import { USER_COLOR } from "./constants";
import "./styles.css";

import * as random from "lib0/random";

const userColor = USER_COLOR[random.uint32() % USER_COLOR.length];
const ydoc = new Y.Doc();
const provider = new WebrtcProvider("my-room-name", ydoc);
const ytext = ydoc.getText("codemirror");
const undoManager = new Y.UndoManager(ytext);

provider.awareness.setLocalStateField("user", {
  name: "Anonymous " + Math.floor(Math.random() * 100),
  color: userColor.color,
  colorLight: userColor.light
});

export default function App() {
  return (
    <CodeMirror
      value=""
      height="500px"
      extensions={[
        javascript({ jsx: true }),
        yCollab(ytext, provider.awareness, { undoManager })
      ]}
    />
  );
}
