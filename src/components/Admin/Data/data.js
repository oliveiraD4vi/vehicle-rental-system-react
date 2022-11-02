import PageHeader from "../PageHeader/pageHeader";

import "./data.css";

const Data = ({ children }) => {
  return (
    <div className="data-container">
      <PageHeader title="Data" />
      {children}
    </div>
  );
};

export default Data;
