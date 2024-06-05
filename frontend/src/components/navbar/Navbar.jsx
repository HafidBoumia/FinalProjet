import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/User";
import "./Navbar.scss";
import { fetchLogout } from "../../redux/Auth";
import { fetchOrders, markOrdersAsSeen, pollOrder } from "../../redux/Order";

function Navbar() {
  const ords = useSelector(u => u.order.newOrder)
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('token'))
  const user = useSelector((i) => i.user);


  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    if (user.user) {
      const fetchOrders = () => {
        dispatch(pollOrder(user.user.id));
      };
      fetchOrders();

      const intervalId = setInterval(fetchOrders, 5000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, user.user]);



  const handleLogout = async () => {
    await dispatch(fetchLogout(auth))
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="left">
          <div className="logo">
            <Link className="link" to="/">
              <span className="text">liverr</span>
            </Link>
          </div>
          <div className="items">
            <Link>Liverr Business</Link>
            <Link>Explore</Link>
          </div>
        </div>

        {user?.user ? (
          <div className="user" onClick={() => setOpen(!open)}>
            <img
              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              alt=""
            />
            <span>{user?.user?.fname}</span>
            {open && (
              <div className="options">
                <Link className="link" to="/mygigs">
                  My Gigs
                </Link>
                <Link className="link" to="/gigs">
                  All Gigs
                </Link>
                <Link className="link" to="/add">
                  Add New Gig
                </Link>
                <Link className="link relative" to="/orders">
                  Orders
                  {ords?.length > 0 &&
                    <div
                      class="absolute bottom-auto left-11  top-2 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-1.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <span className="notification ">{ords?.length}</span>
                    </div>
                  }
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" to="/payment">
                  Payments
                </Link>
                <Link className="link" to="/MyProfile">
                  Profile
                </Link>
                <Link className="link" to="/settings">
                  Settings
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="links">
            <Link className="lnk sing-in" to="/register">
              <IoEnterOutline />
              <span>Sign in</span>
            </Link>
            <Link
              className={
                active || pathname !== "/"
                  ? "link lnk join active"
                  : "link lnk join"
              }
              to="/login"
            >
              <MdOutlineCreate />
              <button>Join</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
