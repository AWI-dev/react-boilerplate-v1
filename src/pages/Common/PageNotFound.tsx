import { NavLink } from "react-router-dom";
import PageNotFoundImage from "../../assets/Images/404.png";

function PageNotFound() {
  return (
    <div className="font-body light:bg-white dark:bg-[#1D2328] dark:text-csPrimary  sm:flex justify-center items-center my-auto min-h-screen">
      <div className="w-11/12 sm:flex">
        <div className="pl-32">
          <p className="text-7xl font-semibold leading-snug">
            <span className="font-bold text-csSecondary ">Sorry!, </span>
            this page isn`t available
          </p>
          <span className="block my-4 text-2xl font-semibold">
            the page you were looking for couldn`t be found
          </span>
          <span className="font-medium text-xl">
            Go back to the
            <NavLink to={"/"}>
              <a className="text-csSecondary "> Home page </a>
            </NavLink>
          </span>
        </div>
        <img src={PageNotFoundImage}  alt="" />
      </div>
    </div>
  );
}

export default PageNotFound;
