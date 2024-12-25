import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { Logo, LogoutBtn, Container } from "../index";


function Header() {
  const authStatus = useSelector((state) => state.isLogin);
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
      name: "all post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-800">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
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
              ) : (null)
            )}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
