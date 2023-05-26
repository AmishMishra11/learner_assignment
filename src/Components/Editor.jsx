import React, { useEffect, useRef, useState } from "react";

import { useNote } from "../Context/NotesContext";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Alert from "editorjs-alert";
import Paragraph from "@editorjs/paragraph";
import DragDrop from "editorjs-drag-drop";

const EDITTOR_HOLDER_ID = "editorjs";
function Editor({ content, id }) {
  const { stateNotes, dispatchNotes } = useNote();
  const { singleNote } = stateNotes;

  const ejInstance = useRef();

  // const [id, setid] = useState("temp");
  // useEffect(() => {
  //   if (id !== id) {
  //     setid(id);
  //   }
  // }, [id]);

  useEffect(() => {
    if (!ejInstance?.current && ejInstance.current !== undefined) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [id]);

  function detectTags(e) {
    if (e.target.tagName.toLowerCase() === "a") {
      window.open(e.target.href, "_blank");
    }
  }
  const clickHrefs = () => {
    //detect all blocks with classname
    const elemental = document.getElementsByClassName("ce-block");
    for (let j = 0, jl = elemental.length; j < jl; j++) {
      //selects <a> within the blocks
      const links = elemental[j].getElementsByTagName("a");
      for (let i = 0, il = links.length; i < il; i++) {
        links[i].removeEventListener("click", detectTags);
        links[i].addEventListener("click", detectTags);
      }
    }
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      // logLevel: "ERROR",
      data: content,
      placeholder: "Start Writing Here",
      onReady: () => {
        ejInstance.current = editor;
        new DragDrop(editor);
        clickHrefs();
      },
      onChange: async () => {
        try {
          const savedData = await editor.save();
          bodyChangeHandler(savedData);
          clickHrefs();
        } catch (error) {
          console.log("failed", error);
        }
      },
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            preserveBlank: true,
          },
        },
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
        },
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+A",
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },

        // textVariant: TextVariantTune,

        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },

        Marker: {
          class: Marker,
          // shortcut: "CMD+SHIFT+M",
        },

        underline: Underline,
      },

      // tunes: ["textVariant"],
    });
  };

  const bodyChangeHandler = (newBody) => {
    dispatchNotes({
      type: "EDIT_NOTE",
      payload: {
        id: id,
        newContent: {
          content: newBody,
        },
      },
    });
  };

  return (
    <div className="w-full h-full overflow-auto text-left   max-w-[100%] ">
      <div className="w-full " id={EDITTOR_HOLDER_ID}></div>
    </div>
  );
}

export default Editor;
