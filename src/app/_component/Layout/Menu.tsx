import MenuItem from "./MenuItem";

const Menu = ({ data }: any) => {
  return (
    <ul className="space-y-2 font-medium">
      {data.map((item: any) => {
        return (
          <MenuItem
            id={item.id}
            link={item.link}
            title={item.title}
            menueKey={item.menueKey}
            key={item.id}
            icon={item.icon}
          />
        );
      })}
    </ul>
  );
};

export default Menu;
