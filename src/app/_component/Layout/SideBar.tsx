import { menuData } from "@/constant/menuData";
import Menu from "./Menu";

const SideBar = () => {
  //h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]
  return (
    <>
      <aside className=" overflow-auto py-4 w-64 transition-transform -translate-x-full bg-white border-l border-gray-200 sm:translate-x-0">
        <div className=" px-3 pb-4 overflow-y-auto bg-white ">
          <Menu data={menuData} />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
