import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import moment from "moment";
import DataComponent from "../../../../../components/Admin/Data/data";
import api from "../../../../../services/api";
import notification from "../../../../../services/notification";

const Data = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [insert, setInsert] = useState(false);
  const [userData, setUserData] = useState();

  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      setUserData(state.data);
    } else {
      setInsert(true);
    }
  }, [state]);

  const onSubmit = async (data) => {
    setLoading(true);
    setDisabled(true);

    try {
      if (state && state.data) {
        await api.put("/user", { ...data, id: state.data.id });
      } else {
        await api.post("/user/register", data);
      }

      setLoading(false);
      setDisabled(false);

      notification("success", "Operação realizada com sucesso!");
      navigate("/admin/users");
    } catch ({ response }) {
      setLoading(false);
      setDisabled(false);

      notification("error", response.data.message);
    }
  };

  const onChange = (checked) => {
    if (checked) {
      setInsert(true);
      setUserData(null);
    } else {
      setInsert(false);
      setUserData(state.data);
    }
  };

  return (
    <div className="page-container">
      <DataComponent title={state && state.data ? "Dados" : "Inserir usuário"}>
        {state && (
          <div className="editor-switch">
            <span>EDIÇÃO: </span>
            <Switch onChange={onChange} />
          </div>
        )}
        {userData ? (
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
        ) : insert ? (
          <Form form={form} className="form-container" onFinish={onSubmit}>
            <h4>Informações pessoais:</h4>
            <Form.Item
              name="name"
              label={
                <>
                  <span className="label-name"> Nome </span>
                </>
              }
              initialValue={state && state.data ? state.data.name : null}
              rules={[
                {
                  required: true,
                  message: "Digite seu nome",
                },
                {
                  pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                  message: "Apenas palavras!",
                },
              ]}
            >
              <Input disabled={disabled} placeholder="Nome" />
            </Form.Item>

            <div className="form-group-3">
              <Form.Item
                name="email"
                label={
                  <>
                    <span className="label-name"> Email </span>
                  </>
                }
                initialValue={state && state.data ? state.data.email : null}
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira seu email",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="cpf"
                label={
                  <>
                    <span className="label-name"> CPF </span>
                  </>
                }
                initialValue={state && state.data ? state.data.cpf : null}
                rules={[
                  {
                    required: true,
                    message: "Digite seu CPF",
                  },
                  {
                    min: 6,
                    message: "Esse não é um CPF válido",
                  },
                  {
                    pattern: /^[\d]+$/,
                    message: "Apenas números!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="CPF" />
              </Form.Item>

              <Form.Item
                name="bornAt"
                label={
                  <>
                    <span className="label-name"> Data de Nascimento </span>
                  </>
                }
                initialValue={
                  state && state.data ? moment(state.data.bornAt) : null
                }
                rules={[
                  {
                    required: true,
                    message: "Insira sua data de nascimento",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Data de nascimento"
                  disabled={disabled}
                  format={dateFormat}
                />
              </Form.Item>
            </div>

            <div className="form-group-2">
              <Form.Item
                name="phone"
                label={
                  <>
                    <span className="label-name"> Telefone </span>
                  </>
                }
                initialValue={state && state.data ? state.data.phone : null}
                rules={[
                  {
                    min: 10,
                    message: "Esse não é um número válido",
                  },
                  {
                    pattern: /^[\d]+$/,
                    message: "Apenas números!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Telefone" />
              </Form.Item>

              <Form.Item
                name="role"
                label={
                  <>
                    <span className="label-name"> ROLE </span>
                  </>
                }
                initialValue={state && state.data ? state.data.role : "CLIENT"}
                rules={[
                  {
                    required: true,
                    message: "Escolha a ROLE do usuário",
                  },
                ]}
              >
                <Select
                  disabled={disabled}
                  showSearch
                  placeholder="Role"
                  optionFilterProp="children"
                  options={[
                    {
                      value: "CLIENT",
                      label: "Cliente",
                    },
                    {
                      value: "ADMIN",
                      label: "Administrador",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <h4>Endereço:</h4>
            <div className="form-group-3">
              <Form.Item
                name="street"
                label={
                  <>
                    <span className="label-name"> Rua </span>
                  </>
                }
                initialValue={state && state.data ? state.data.street : null}
              >
                <Input disabled={disabled} placeholder="Rua" />
              </Form.Item>

              <Form.Item
                name="number"
                label={
                  <>
                    <span className="label-name"> Nº </span>
                  </>
                }
                initialValue={state && state.data ? state.data.number : null}
                rules={[
                  {
                    pattern: /^[\d]+$/,
                    message: "Apenas números!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Nº" />
              </Form.Item>

              <Form.Item
                name="neighborhood"
                label={
                  <>
                    <span className="label-name"> Bairro </span>
                  </>
                }
                initialValue={
                  state && state.data ? state.data.neighborhood : null
                }
              >
                <Input disabled={disabled} placeholder="Bairro" />
              </Form.Item>
            </div>

            <div className="form-group-3">
              <Form.Item
                name="city"
                label={
                  <>
                    <span className="label-name"> Cidade </span>
                  </>
                }
                initialValue={state && state.data ? state.data.city : null}
                rules={[
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Cidade" />
              </Form.Item>

              <Form.Item
                name="state"
                label={
                  <>
                    <span className="label-name"> Estado </span>
                  </>
                }
                initialValue={state && state.data ? state.data.state : null}
                rules={[
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Estado" />
              </Form.Item>

              <Form.Item
                name="country"
                label={
                  <>
                    <span className="label-name"> País </span>
                  </>
                }
                initialValue={state && state.data ? state.data.country : null}
                rules={[
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="País" />
              </Form.Item>
            </div>

            {!state && (
              <>
                <h4>Senha:</h4>
                <Form.Item
                  name="password"
                  label={
                    <>
                      <span className="label-name"> Senha </span>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira sua senha ",
                    },
                    {
                      min: 8,
                      message: "Essa não é uma senha válida",
                    },
                  ]}
                >
                  <Input.Password disabled={disabled} placeholder="Senha" />
                </Form.Item>
              </>
            )}

            <Form.Item className="btn">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                {state && state.data ? "SALVAR" : "CADASTRAR"}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <span>Carregando...</span>
        )}
      </DataComponent>
    </div>
  );
};

export default Data;
