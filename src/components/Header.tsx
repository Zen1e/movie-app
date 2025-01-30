import { Dispatch, SetStateAction, useEffect } from "react";

type props = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: props) {
  const { dark, setDark } = props;

  const darkModeSwitch = () => {
    if (dark === true) {
      return "../../moon.svg";
    } else {
      return "../../day.svg";
    }
  };

  const switchDark = () => {
    setDark(!dark);
    localStorage.setItem('dark', JSON.stringify(!dark));
  }

  return (
    <div className="fixed top-0 w-full h-[60px] bg-inherit flex justify-center z-10">
      <div className="flex justify-between mt-[10px] w-[1200px]">
        <a href="../" className="flex gap-[10px]">
          <img src="../../film.svg" className="w-[25px] h-[25px]" />
          <p className="text-indigo-700 italic font-bold">Movie film</p>
        </a>
        <div className="flex gap-[10px] h-[35px]">
          <input
            type="button"
            className="w-[70px] outline-none border border-gray-400 rounded-[5px] hover:bg-gray-300/50 transition duration-[.3s]"
            value={"Genre"}
          />
          <input
            type="text"
            className="outline-none bg-inherit border border-gray-400 rounded-[5px] text-gray-400 px-[10px] w-[300px]"
            placeholder="Search..."
          />
        </div>
        <img
          src={darkModeSwitch()}
          className="w-[35px] h-[35px] border border-gray-400 rounded-[5px] p-[5px]"
          onClick={() => switchDark()}
        />
      </div>
    </div>
  );
}
