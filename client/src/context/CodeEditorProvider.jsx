import React,{useState} from "react";
import  CodeEditorContext  from "./CodeEditorContext";


const CodeEditorProvider = ({ children }) => {
    
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("dark");
    const [output, setOutput] = useState(null);
    
    const value = {
        code,
        setCode,
        language,
        setLanguage,
        theme,
        setTheme,
        output,
        setOutput,
    };
    
    return (
        
            <CodeEditorContext.Provider value={value}>
                {children}
            </CodeEditorContext.Provider>
       
    );
}
export default CodeEditorProvider;
