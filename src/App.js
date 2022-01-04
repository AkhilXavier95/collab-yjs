import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";
import { javascript } from "@codemirror/lang-javascript";

import CodeMirror from "@uiw/react-codemirror";
import { USER_COLOR } from "./constants";
import "./styles.css";

import * as random from "lib0/random";

const userColor = USER_COLOR[random.uint32() % usercolors.length];
const ydoc = new Y.Doc();
const provider = new WebrtcProvider("https://ku6ko.csb.app/", ydoc);
const ytext = ydoc.getText("codemirror");
const undoManager = new Y.UndoManager(ytext);

provider.awareness.setLocalStateField("user", {
  name: "Anonymous " + Math.floor(Math.random() * 100),
  color: userColor.color,
  colorLight: userColor.light
});

// select a random color for this user

export default function App() {
  return (
    <>
      <CodeMirror
        value=""
        height="200px"
        extensions={[
          javascript({ jsx: true }),
          yCollab(ytext, provider.awareness, { undoManager })
        ]}
      />
    </>
  );
}
