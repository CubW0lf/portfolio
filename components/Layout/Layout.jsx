import NavModal from "../NavModal/NavModal";
import ToggleMenuIcon from "../ToggleMenuIcon/ToggleMenuIcon";

const Layout = ({ children }) => {
  return (
    <>
      <ToggleMenuIcon />
      <NavModal />
      {children}
    </>
  );
};

export default Layout;
