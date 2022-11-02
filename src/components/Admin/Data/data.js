import PageHeader from "../PageHeader/pageHeader";

import "./data.css";

const Data = ({ title, children }) => {
  return (
    <div className="data-container">
      <PageHeader title={title ? title : "Dados"} />
      {children}
    </div>
  );
};

export default Data;
