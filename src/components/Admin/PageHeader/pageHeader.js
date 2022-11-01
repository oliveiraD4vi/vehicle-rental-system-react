import { Button } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./pageHeader.css";

const PageHeader = ({ title, goBackHome }) => {
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    if (typeof goBackHome === 'function') {
      goBackHome();
    } else if (goBackHome) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="page-header-container">
      <div className="page-header-title">
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => handleGoBackButton()}
          className="icon-back"
        />
        <h1 id="title">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
