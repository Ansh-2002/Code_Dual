import React, { useState } from "react";
import ProblemContext from "./ProblemContext";
import SearchFilter from "../components/problemListPage/filter/SearchFilter";

function ProblemProvider({ children }) {
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusList, setStatusList] = useState([]);
  const [attemptedList, setAttemptedList] = useState([]); 
  const value = {
    allProblems,
    setAllProblems,
    filteredProblems,
    setFilteredProblems,
    selectedDifficulty,
    setSelectedDifficulty,
    searchFilter,
    setSearchFilter,
    tagsFilter,
    setTagsFilter,
    statusFilter,
    setStatusFilter,
    statusList,
    setStatusList,
    attemptedList,
    setAttemptedList
  };

  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
}

export default ProblemProvider;
