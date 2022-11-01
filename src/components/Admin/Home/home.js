import { CarOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import "./home.css";

const Home = () => {
  const menuItems = [
    {
      name: "Veículos",
      icon: <CarOutlined />,
      page: "/admin/vehicles",
    },
    {
      name: "Reservas",
      icon: <FileOutlined />,
      page: "/admin/reservations",
    },
    {
      name: "Usuários",
      icon: <UserOutlined />,
      page: "/admin/users",
    },
  ];

  return (
    <div className="admin-home-container">
      {menuItems.map((item) => (
        <a className="menu-item" key={item.name} href={item.page}>
          {item.icon} {item.name}
        </a>
      ))}
    </div>
  );
};

export default Home;
