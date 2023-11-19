/* eslint-disable eqeqeq */
import React, { useEffect,useContext } from "react";
import ProblemList from "./sub-components/ProblemList";
import ProblemContext from "../context/ProblemContext";
import problemsD from "../Data/problems";
import ProblemFilter from "./sub-components/ProblemFilter";

function ProblemSet() {
  const { allProblems, setAllProblems } = useContext(ProblemContext);
  const { filteredProblems, setFilteredProblems } = useContext(ProblemContext);

  useEffect(() => {
    setAllProblems(problemsD);
    setFilteredProblems(problemsD);
   
  }, []);

  const handleClick = () => {
    console.log("test handle click");
    const newData = allProblems.filter((problem) => problem.id === 22);
    setFilteredProblems(newData);
  };
  if(!allProblems || allProblems=="" ) return(<div>loading...</div>)

  return (
    <>
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        test
      </button> */}

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <ProblemFilter />
            <ProblemList />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemSet;
