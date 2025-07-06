import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { Logo, LogoutBtn, Container } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "all blogs",
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "add blogs",
      slug: "/add-blogs",
      active: authStatus,
    },
  ];
  return (
    <header className=" py-3 shadow bg-gray-800">
      <Container>
        <nav className="flex ">
          <div className="mr-4">
            <Link to="/" className="flex items-center gap-3">
              <Logo />
              <h2 className="text-xl font-bold">BlogNest</h2>
            </Link>
          </div>
          <ul className="flex ml-auto  pt-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-green-600 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="inline-block px-6 py-2 duration-200 hover:bg-green-600 rounded-full" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
      <div className="w-full h-1 bg-green-600 mt-3"></div>
    </header>
  );
}

export default Header;
