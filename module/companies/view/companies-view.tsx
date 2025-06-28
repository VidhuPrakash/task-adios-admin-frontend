import React from "react";
import TitleSection from "../components/title-section/title-section";
import TableSection from "../components/table-section/table-section";

const CompaniesView = () => {
  return (
    <div className="flex flex-col ">
      <TitleSection />
      <TableSection />
    </div>
  );
};

export default CompaniesView;
