import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
