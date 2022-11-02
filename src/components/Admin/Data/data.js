import PageHeader from "../PageHeader/pageHeader";

import "./data.css";

const Data = ({ children }) => {
  return (
    <div className="data-container">
      <PageHeader title="Dados" />
      {children}
    </div>
  );
};

export default Data;
