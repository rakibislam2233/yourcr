import logo from "@/assets/logo/logo.png";
import { getMyProfile } from "@/services/user.service";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavbarClientContainer from "./NavbarClientContainer";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
  const user = await getMyProfile();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const dashboardHref =
    user?.role === "CR"
      ? "/dashboard/cr"
      : user?.role === "STUDENT"
        ? "/dashboard/student"
        : "/dashboard";

  return (
    <NavbarClientContainer>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="YourCR Logo"
              width={140}
              height={80}
              className="w-32 sm:w-40"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <UserDropdown user={user} dashboardHref={dashboardHref} />
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="h-10 sm:h-11 px-5 sm:px-6 border-primary text-primary hover:bg-primary/5 cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/cr-register">
                  <Button
                    size="default"
                    className="h-10 sm:h-11 px-5 sm:px-6 cursor-pointer"
                  >
                    Register as CR
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button & Content */}
          <NavbarMobileMenu
            user={user}
            navLinks={navLinks}
            dashboardHref={dashboardHref}
          />
        </div>
      </div>
    </NavbarClientContainer>
  );
};

export default Navbar;
