import Header from "./Header";
import Nav from "./Nav";
import TopLeftImg from "./TopLeftImg";

const Layout = ({ children }) => {
  return (
    <main
      className="bg-site text-white bg-cover bg-no-repeat font-sora relative w-full min-h-screen overflow-x-hidden"
    >
      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
