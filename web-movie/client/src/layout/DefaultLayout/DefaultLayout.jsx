import FooterLayout from "../FooterLayout/FooterLayout";
import HeaderLayout from "../HeaderLayout/HeaderLayout";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </div>
  );
};

export default DefaultLayout;
