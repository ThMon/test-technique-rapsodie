import { ReactElement } from "react";
import Header from "./header";

const Container = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Container;
