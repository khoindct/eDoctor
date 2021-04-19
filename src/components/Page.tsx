import { Helmet } from "react-helmet";

interface PageProps {
  title: string;
  className: any;
}
const Page: React.FC<PageProps> = ({ children, title = "", className }) => {
  return (
    <div className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Page;
