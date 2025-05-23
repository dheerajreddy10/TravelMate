import React, { useContext } from "react";
import { Button } from "../ui/button.jsx";
import { LogInContext } from "@/Context/LogInContext/Login.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, Plane, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../constants/ThemeToggle.jsx";

function Header({ headerRef }) {
  const { user, isAuthenticated, logout, loginWithPopup } = useContext(LogInContext);

  const LogOut = () => logout();
  const LogIn = () => loginWithPopup();

  return (
    <div
      ref={headerRef}
      className="w-full flex items-center justify-between shadow-sm p-3 md:px-40 border-b"
    >
      <Link to="/">
        <div className="logo flex gap-2 items-center">
          <div className="img inline-block h-5 w-5 md:h-10 md:w-10">
            <img src="/logo.png" alt="Logo" />
          </div>
          <h1 className="text-lg md:text-3xl font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
            Travel Mate
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-5">
        <ThemeToggle />

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="user flex items-center gap-2 mr-3">
                <h2 className="hidden sm:block text-lg md:text-xl bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent capitalize">
                  Hi {user.given_name || user.nickname}
                </h2>
                <div className="userimg overflow-hidden h-10 w-10 rounded-full">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} />
                  ) : (
                    <User />
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="text-center sm:text-left w-56">
              <DropdownMenuLabel className="font-semibold text-xl flex items-center gap-2">
                <User /> My Account
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <Link to="/all-trips">
                <DropdownMenuItem className="text-lg flex items-center gap-2">
                  <Plane /> My Trips
                </DropdownMenuItem>
              </Link>

              <Link to="/plan-a-trip">
                <DropdownMenuItem className="text-lg flex items-center gap-2">
                  <Plus /> Create Trip
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <div className="p-2">
                <Button
                  variant="destructive"
                  className="w-full text-center"
                  onClick={LogOut}
                >
                  Log Out <LogOutIcon className="h-4 ml-2" />
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={LogIn}>
            Sign In
            <DropdownMenuShortcut>
              <LogInIcon className="h-4 ml-1" />
            </DropdownMenuShortcut>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
