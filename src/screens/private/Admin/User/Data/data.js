import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataComponent from "../../../../../components/Admin/Data/data";

const Data = () => {
  const [userData, setUserData] = useState();

  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) setUserData(state.data);
  }, [state]);

  return (
    <div className="page-container">
      {userData ? (
        <DataComponent>
          <div className="card">
            <div className="info">
              <span>
                Nome: <p>{userData.name}</p>
              </span>
              <span>
                Email: <p>{userData.email}</p>
              </span>
              <span>
                Role: <p>{userData.role}</p>
              </span>
            </div>

            <div className="info">
              <span>
                CPF: <p>{userData.cpf}</p>
              </span>
              <span>
                Nascimento: <p>{moment(userData.bornAt).format("DD/MM/YY")}</p>
              </span>
              {userData.phone && (
                <span>
                  Telefone: <p>{userData.phone}</p>
                </span>
              )}
            </div>

            <div className="info">
              {userData.street && (
                <span>
                  Rua: <p>{userData.street}</p>
                </span>
              )}
              {userData.number && (
                <span>
                  Número: <p>{userData.number}</p>
                </span>
              )}
              {userData.neighborhood && (
                <span>
                  Bairro: <p>{userData.neighborhood}</p>
                </span>
              )}
            </div>

            <div className="info">
              {userData.city && (
                <span>
                  Cidade: <p>{userData.city}</p>
                </span>
              )}
              {userData.state && (
                <span>
                  Estado: <p>{userData.state}</p>
                </span>
              )}
              {userData.country && (
                <span>
                  País: <p>{userData.country}</p>
                </span>
              )}
            </div>
          </div>
        </DataComponent>
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
};

export default Data;
