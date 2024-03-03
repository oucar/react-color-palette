import React, { ReactNode } from "react";
import "./styles/Page.scss";

interface PageProps {
  children: ReactNode;
}

// Pages wrap the different routes available in the app
const Page: React.FC<PageProps> = ({ children }) => {
  return <section className="page">{children}</section>;
};

export default Page;
