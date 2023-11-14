import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import CodeEditorContext from "../context/CodeEditorContext";
const { io } = require("socket.io-client");

const CodeEditor = () => {
    const [socket, setSocket] = useState(null);
    const [userText, setUserText] = useState("");
    const [friendText, setFriendText] = useState("");
    const { theme, language } = useContext(CodeEditorContext);

    var user1 = 1;
    var user2 = 2;

    // function handleEditorChange(value, event) {
    //     setUserText(value);
    // }

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function submitCode() {
        alert(editorRef.current.getValue());
    }

    useEffect(() => {
        if (!editorRef.current) return;
        console.log("language changed to", language);
        if (language === "python") {
            editorRef.current.setValue(`# write your code here in ${language}`);
        } else {
            editorRef.current.setValue(
                `// write your code here in ${language}`
            );
        }

        if (!editorRef.current.getModel()) {
            return;
        }
        editorRef.current.getModel().setLanguage(language);
    }, [language]);

    useEffect(() => {
        const socket = io("http://localhost:3001");
        setSocket(socket);
        // socket.on("connect", () => {
        //     console.log("Connected!");
        // });
        socket.on("message", (message) => {
            // setUserText(message["text"]);

            if (message["id"] != user1) {
                setFriendText(message["text"]);
            } else {
                setUserText(message["text"]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            // socket.emit("message", text);
            //emit message and id

            socket.emit("message", {
                id: 2,
                text: userText,
            });
        }
    }, [userText]);

    return (
        <>
            <Editor
                height="90vh"
                defaultLanguage={language}
                defaultValue={`// write your code here in ${language}`}
                onMount={handleEditorDidMount}
                onChange={(value, event) => setUserText(value)}
                theme={`vs-${theme}`}
                sx={{
                    borderBottomLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                }}
            />
            <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={submitCode}
            >
                Submit
            </button>
        </>
    );
};

export default CodeEditor;