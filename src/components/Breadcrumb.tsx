import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa6";

import type { BreadcrumbProps } from "../types";

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav>
      <ul className="list-none flex items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1 text-base md:text-xl">
            {item.to ? (
              <Link to={item.to} className="font-light">{item.label}</Link>
            ) : (
              <span className="font-medium">{item.label}</span>
            )}
            {i < items.length - 1 && <FaAngleRight size={10} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
