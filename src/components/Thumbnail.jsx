import { useState, useRef, useEffect } from "react";
import { MENU } from "../constants";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { RiShoppingBasketFill } from "react-icons/ri";
import { PiUserList } from "react-icons/pi";
import autoAnimate from "@formkit/auto-animate";

const Thumbnail = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [visible, setVisible] = useState(null);
  const [mainBg, setmainBg] = useState(false);
  const parent = useRef(null);

  let changeClick = (color) => {
    setmainBg(!mainBg);
  };

  let bgColor = mainBg ? "opacity-100 z-10" : "opacity-0 -z-0";

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className={`grid grid-cols-4 gap-4`}>
      <section className={`${bgColor} fixed w-screen text-secondary text-[24px] flex flex-col items-center transition-all duration-500`}>
        <div className="container w-full flex justify-between items-center my-4">
          <div>
            <a href="#" className="text-[32px] font-semibold">
              Coffee
            </a>
          </div>
          <ul className="flex gap-16 font-light items-center">
            <li>
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">Reservation</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <a href="#">
              <RiShoppingBasketFill />
            </a>
            <a href="#" className="text-[30px]">
              <PiUserList />
            </a>
          </div>
        </div>
        <div>
          <h1 className="-translate-x-1/2 absolute text-[20rem] z-10 font-display-2 tracking-tighter">COFFEE</h1>
          <h1 className="-translate-x-1/2 absolute text-[20rem] z-30 font-display-2 tracking-tighter text-outline">COFFEE</h1>
        </div>
      </section>
      {MENU.filter((men) => visible === null || men.code === visible).map((menu, index) => {
        let handleClick = (code) => {
          setMenuActive(code === menuActive ? null : code);
          setVisible(code === visible ? null : code);
        };
        let isActive = menuActive === menu.code;
        let menuScreen = isActive ? `w-screen ${menu.bgcolor}` : menuActive ? "" : `w-full hover:${menu.bgcolor}`;
        let isImage = isActive ? "w-96 opacity-100" : "w-96 opacity-0 -translate-y-16  group-hover:-translate-y-8 ";
        let isDesc = isActive ? "h-3/5" : "h-full group-hover:h-1/2";
        let isNum = isActive ? "h-0" : "h-1/4  group-hover:h-0";
        let isTextColor = isActive ? "text-secondary ml-12" : "group-hover:text-secondary";
        let isShow = isActive ? "block" : "hidden";
        let isHidden = isActive ? "hidden" : "block";

        return (
          <section key={index} className={`${menuScreen} relative group h-screen  flex flex-col p-5 justify-center overflow-hidden transition-all duration-500`}>
            <img src={menu.image} alt="" className={`${isImage} z-20 m-auto group-hover:opacity-100 transition-all  duration-500`} />
            <div className={`${isDesc} absolute left-0 bottom-0 w-full flex flex-col p-5 justify-center  transition-all duration-500`}>
              <div className={`${isNum} transition-all  duration-500`}>
                <h1 className={`${isHidden} text-6xl ${menu.textcolor} group-hover:opacity-0 transition-all duration-500`}>{menu.number}</h1>
              </div>
              <div className={`${isTextColor} h-1/4 flex flex-col transition-[margin] duration-500`}>
                <h1 className="text-3xl font-bold">{menu.name}</h1>
                <p className={`${isHidden} text-[20px] ml-2 mt-1`}>{menu.subname}</p>
                <p className={`${isShow} w-1/4 text-base mt-1 transition-all duration-300`}>{menu.description}</p>
                <div className="mt-12 flex gap-4">
                  <div
                    onClick={() => {
                      changeClick(menu.color);
                    }}
                  >
                    <button
                      className={`flex w-fit items-center border  bg-${menu.color} gap-2 text-secondary rounded-2xl px-4 py-1 group-hover:border-secondary cursor-pointer`}
                      onClick={() => {
                        handleClick(menu.code);
                      }}
                    >
                      <span className={`${isHidden} text-[12px]`}>View more</span>
                      <IoIosArrowRoundForward className={`${isHidden} text-2xl`} />
                      <IoIosArrowRoundBack className={`${isShow} text-2xl`} />
                      <span className={`${isShow} text-[12px] mr-2`}>Back</span>
                    </button>
                  </div>
                  <a href="#" className={`${isShow} text-[12px] flex w-fit items-center border  bg-${menu.color} text-secondary rounded-2xl px-4 py-1 group-hover:border-secondary cursor-pointer]`}>
                    Book now
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      ;
    </div>
  );
};

export default Thumbnail;
