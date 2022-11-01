import image from "../../../assets/about-us.svg";

import "./about.css";

const About = () => {
  return (
    <div className="page-container about-container">
      <img src={image} alt="man standing" width={400} height={400} />
      <div id="message">
        <h1>Olá!</h1>
        <p>
          Este é um projeto para a disciplina de Desenvolvimento de Software
          para Web. Visite{" "}
          <a
            href="https://github.com/oliveiraD4vi/vehicle-rental-system-app"
            target="_blank"
            rel="noreferrer"
          >
            nosso repositório
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
