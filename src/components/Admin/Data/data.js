import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../PageHeader/pageHeader";

import "./data.css";

const Data = ({ title, children }) => {
  const [goBack, setGoBack] = useState();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.goBack) setGoBack(state.goBack);
  }, [state]);

  return (
    <div className="data-container">
      <PageHeader
        title={title ? title : "Dados"}
        goBackHome={goBack ? () => navigate(goBack) : null}
      />
      {children}
    </div>
  );
};

export default Data;
