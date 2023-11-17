import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import CodeEditorContext from "../context/CodeEditorContext";
const FriendCodeEditor = ({ friendText }) => {
    const { theme, language } = useContext(CodeEditorContext);

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    useEffect(() => {
        if (editorRef.current) editorRef.current.setValue(friendText);
    }, [friendText]);

    return (
        <>
            <Editor
                height="90vh"
                defaultLanguage={language}
                // defaultValue={`// write your code here in ${language}`}
                onMount={handleEditorDidMount}
                theme={`vs-${theme}`}
                sx={{
                    borderBottomLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                }}
            />
        </>
    );
};

export default FriendCodeEditor;
