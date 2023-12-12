import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import CodeEditorContext from "../context/CodeEditorContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { tempCode } from "../constants";
import { useParams } from "react-router-dom";
import problems from "../Data/problems";
import SubmitReport from "./sub-components/SubmitReport";

const CodeEditor = ({ socket, displayName, roomId }) => {
    const { theme, language } = useContext(CodeEditorContext);
    const { output1, setOutput1 } = useContext(CodeEditorContext);
    const { output2, setOutput2 } = useContext(CodeEditorContext);
    const { input1, setInput1 } = useContext(CodeEditorContext);
    const { input2, setInput2, runResponse, setRunResponse } = useContext(CodeEditorContext);
    const { setActiveComponent } = useContext(CodeEditorContext);
    const [showAccepted, setShowAccepted] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const { problemId } = useParams();
    let problemIndex = 0;
    for (let i = 0; i < problems.length; i++) {
        if (problems[i].id === parseInt(problemId)) {
            problemIndex = i;
            break;
        }
    }
    const problem = problems[problemIndex];

    let api_input1 = input1?.length.toString() + " ";
    for (let i = 0; i < input1?.length; i++) {
        api_input1 += input1[i].toString() + " ";
    }

    let api_input2 = input2?.length.toString() + " ";
    for (let i = 0; i < input2?.length; i++) {
        api_input2 += input2[i].toString() + " ";
    }


    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }


    async function runCode() {
        setActiveComponent('your output');
        setRunResponse(true);
        await makePostRequest(editorRef.current.getValue(), api_input1);
        await makePostRequest(editorRef.current.getValue(), api_input2);
        // alert(editorRef.current.getValue());
        setRunResponse(false);
    }

    const renderArray = (arr) => arr.join(" ");

    const renderMatrix = (matrix) => {
        let res = "";
        for (let i = 0; i < matrix.length; i++) {
            res += renderArray(matrix[i]);
            res += "\n";
        }
        return res;
    };

    async function submitCode() {
        // alert("Code submitted");
        let expected_op1 = problem['testCases'][0]['expectedOutput'];
        let expected_op2 = problem['testCases'][1]['expectedOutput'];

        const type = typeof expected_op1;

        switch (type) {
            case 'string':
                break;
            case 'number':
                expected_op1 = expected_op1.toString();
                expected_op2 = expected_op2.toString();

                break;
            case 'object':
                if (Array.isArray(expected_op1[0])) {
                    expected_op1 = renderMatrix(expected_op1);
                    expected_op2 = renderMatrix(expected_op2);
                } else {
                    expected_op1 = renderArray(expected_op1);
                    expected_op2 = renderArray(expected_op2);
                }
                break;
            default:
                // Handle other data types
                expected_op1 = expected_op1.toString();
                expected_op2 = expected_op2.toString();
        }

        // if(output1 == null && output2 == null) {
        await runCode();
        // }


        let your_op1 = output1.output;
        let your_op2 = output2.output;
        if (your_op1 == expected_op1 && your_op2 == expected_op2) {
            setAccepted(true);
            setShowAccepted(true);
            // alert("Correct Answer");
        }
        else {
            setAccepted(false);
            setShowAccepted(true);
            // alert("Wrong Answer");
        }
    }

    useEffect(() => {
        if (!editorRef.current) return;
        // console.log("language changed to", language);
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

    const makePostRequest = async (code, inp) => {
        var lang = language;
        if (language == "python") {
            lang = "python3";
        }

        // console.log("code is", code);
        // console.log("language is", lang);

        const options = {
            method: "POST",
            url: "https://online-code-compiler.p.rapidapi.com/v1/",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key":
                    '66a9b6e7efmsh8aa6861c18afda4p100301jsn9a62dc2544a0',
                // '3516332cffmshc0d34525892c996p1f3d4bjsn8c894003db61',
                "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
            },
            data: {
                language: lang,
                version: "latest",
                code: code,
                input: inp,
            },
        };

        try {
            const response = await axios.request(options);
            // Update the state with the response data
            if (inp == api_input1)
                setOutput1(response.data);
            else
                setOutput2(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="bg-gray-900 text-white ">
            <div className="bg-gray-900 h-[600edpx]">
                <SubmitReport accepted={accepted} showAccepted={showAccepted} setShowAccepted={setShowAccepted} />
                <Editor
                    height="90vh"
                    defaultLanguage={language}
                    defaultValue={`// write your code here in ${language}`}
                    // defaultValue= {tempCode}
                    onMount={handleEditorDidMount}
                    onChange={(value, event) => {
                        if (socket == null) return;

                        socket.emit("sendMessageToRoom", {
                            room: roomId,
                            message: value,
                            displayName,
                        });
                    }}
                    theme={`vs-${theme}`}
                    sx={{
                        borderBottomLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                    }}
                />
                <button
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-5 mr-5"
                    onClick={runCode}
                >
                    Run
                    <PlayArrowIcon />
                </button>
                <button
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-5"
                    onClick={submitCode}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;
