import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { MobileMenu } from "./MobileMenu";
import { NavbarItem } from "./NavbarItem";
import { useState, useCallback, useEffect } from "react";
import { menuData } from "./data";
import { AccountMenu } from "./AccountMenu";
import { useRouter } from "next/router";
type Props = {};

const TOP_OFFSET = 66;

export const Navbar = (props: Props) => {
  const [showMobMenu, setShowMobMenu] = useState<boolean>(false);
  const [showAccMenu, setShowAccMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  const toggleMobMenu = useCallback(() => {
    setShowMobMenu((current) => !current);
  }, []);
  const toggleAccMenu = useCallback(() => {
    setShowAccMenu((current) => !current);
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = useCallback(() => {
    if (searchValue.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(searchValue)}`);
    }
  }, [searchValue, router]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row justify-between items-center transition duration-500 ${showBackground ? "bg-zing-900 bg-opacity-90" : ""
          } `}
      >
        <img className="h-6 lg:h-9" src="/images/dosflix.png" alt="dosflix" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {menuData.map((item) => (
            <NavbarItem label={item.text} key={item.id} href={item.href} />
          ))}
        </div>
        <div
          onClick={toggleMobMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">תפריט</p>
          <BsChevronDown
            className={`text-white transition ${showMobMenu ? "rotate-180" : "rotate-0"
              }`}
          />
          <MobileMenu visible={showMobMenu} />
        </div>
        <div className="flex flex-row gap-4 items-center">
          {/* Search field */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="חיפוש..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="bg-neutral-800 text-white text-sm rounded-md pl-10 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 transition w-48 lg:w-64"
            />
            <BsSearch
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition"
            />
          </div>

          {/* Account menu */}
          <div
            onClick={toggleAccMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="default-blue" />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccMenu ? "rotate-180" : "rotate-0"
                }`}
            />
            <AccountMenu visible={showAccMenu} />
          </div>
        </div>

      </div>
    </nav>
  );
};
