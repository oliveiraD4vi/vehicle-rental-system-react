import PageHeader from "../PageHeader/pageHeader";

const Data = ({ data }) => {
  return (
    <div className="data-container">
      <PageHeader title="Data" />
      <h1>Data {data}</h1>
    </div>
  );
};

export default Data;
