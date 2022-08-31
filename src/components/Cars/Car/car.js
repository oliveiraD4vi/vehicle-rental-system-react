import "./car.css";

const Car = ({ data, img }) => {
  return (
    <div className="car-container">
      <div className="name">
        <h3>{data.brand} {data.model}</h3>
        <h3 id="value">R$ {data.value}</h3>
      </div>

      <img src={img} alt="white car" />
    </div>
  );
};

export default Car;
