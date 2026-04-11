import React from "react";
import { Editor, EditorState } from "draft-js";

export default function PageEditor() {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  return (
    <div>
      <h2>Page Editor</h2>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
