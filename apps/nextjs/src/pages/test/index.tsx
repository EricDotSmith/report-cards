import { PageContainer } from "../../components/Page";
import Link from "next/link";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiSettings5Line, RiSettings5Fill } from "react-icons/ri";
import { useState } from "react";
import classNames from "../../utils/tailwind";
import { IconType } from "react-icons/lib";
import useColorStore from "../../store/colorStore";

interface BottomBarIconProps {
  CheckedIcon: IconType;
  UncheckedIcon: IconType;
  title: string;
}

const BottomBarIcon: React.FC<BottomBarIconProps> = ({
  CheckedIcon,
  UncheckedIcon,
  title,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="flex flex-col items-center p-1"
      onClick={() => setActive(!active)}
    >
      {active ? (
        <CheckedIcon color="yellow" size={25} />
      ) : (
        <UncheckedIcon color="white" size={25} />
      )}
      <span
        className={classNames(
          "text-sm",
          active ? "text-yellow-200" : "text-white",
        )}
      >
        {title}
      </span>
    </div>
  );
};

const SideBarIcon: React.FC<BottomBarIconProps> = ({
  CheckedIcon,
  UncheckedIcon,
  title,
}) => {
  const [active, setActive] = useState(false);
  const changeColor = useColorStore((state) => state.changeColor);

  return (
    <div
      className="flex flex-col  items-center p-1 lg:flex-row lg:space-x-2"
      onClick={() => {
        setActive(!active);
        if (title === "Settings") {
          changeColor("#5cc956");
          changeColor("#f08fa2");
          changeColor("#f2aa4b");
        } else if (title === "Home") {
          changeColor("#58c1fa");
        }
      }}
    >
      {active ? (
        <CheckedIcon color="yellow" size={30} />
      ) : (
        <UncheckedIcon color="white" size={30} />
      )}
      <span
        className={classNames(
          "text-sm lg:text-2xl",
          active ? "text-yellow-200" : "text-white",
        )}
      >
        {title}
      </span>
    </div>
  );
};

const PageLeftBar: React.FC = () => {
  const color = useColorStore((state) => state.color);

  return (
    <div
      className="flex h-full flex-col justify-start  space-y-4 p-2 px-4"
      style={{ backgroundColor: color }}
    >
      <SideBarIcon
        CheckedIcon={AiFillHome}
        UncheckedIcon={AiOutlineHome}
        title="Home"
      />
      <SideBarIcon
        CheckedIcon={RiSettings5Fill}
        UncheckedIcon={RiSettings5Line}
        title="Settings"
      />
    </div>
  );
};

const PageBottomBar: React.FC = () => {
  const color = useColorStore((state) => state.color);

  return (
    <div
      className="flex justify-evenly border-t  px-4"
      style={{ backgroundColor: color }}
    >
      <BottomBarIcon
        CheckedIcon={AiFillHome}
        UncheckedIcon={AiOutlineHome}
        title="Home"
      />
      <BottomBarIcon
        CheckedIcon={RiSettings5Fill}
        UncheckedIcon={RiSettings5Line}
        title="Settings"
      />
    </div>
  );
};

const TestPage: React.FC = () => {
  return (
    <PageContainer
      pageBottomBar={<PageBottomBar />}
      pageLeftBar={<PageLeftBar />}
      pageRightBar={
        <div className="flex h-full border-4 border-r-0 border-t-0 border-b-0 border-sky-400">
          some helpful card
        </div>
      }
      pageTopBar={
        <div className="w-full   border-b  p-4">some helpful card</div>
      }
    >
      <Link href="/">Go home</Link>
      <div className="flex w-full flex-col items-center">
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>{" "}
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>
      </div>
    </PageContainer>
  );
};

export default TestPage;
