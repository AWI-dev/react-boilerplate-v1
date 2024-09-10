import { BreadcrumbItem } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
  name: any;
  path?: string;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  pageName: string;
};

const Breadcrumb = ({ items, pageName }: BreadcrumbProps) => {
  return (
    <div className="flex justify-between gap-3 md:flex-row pb-6 ">
      <h1 className="font-bold text-2xl font-body text-black dark:text-white">
        {pageName}
      </h1>
      <div className="flex items-center gap-x-2">
        <nav className="flex items-center md:ml-2">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {items && items.map((item, index) => (
              <li className="flex items-center" key={index}>
                {item.path ? (
                  <Link
                    className=""
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-cta dark:text-white">{item.name}</span>
                )}
                {index < items.length - 1 && (
                  <ChevronRight className="ml-2" size={18} />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
