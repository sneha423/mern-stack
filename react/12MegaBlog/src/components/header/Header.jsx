import React, { act } from "react";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "logIn",
      slug: "/logIn",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4 ">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li><LogoutBtn/></li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
