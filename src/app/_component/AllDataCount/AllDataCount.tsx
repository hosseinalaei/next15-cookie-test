import Card from "@/app/_component/Card";
import { formatNumberIntl } from "@/utils/formatNumber";
import Image from "next/image";

const AllDataCount = ({ data }: any) => {
  return (
    <>
      {data?.map((item: any) => (
        <Card key={item?.cat} className="px-24 rounded-md bg-green-200">
          <Image
            alt="icon"
            src={`/images/svg/${item?.cat}.svg`}
            width={40}
            height={40}
          />

          <h3 className="text-2xl text-gray-700 dark:text-gray-400 my-4">
            {item.detail}
          </h3>
          <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
            {formatNumberIntl(item.count) ?? "-"}
          </p>
        </Card>
      ))}
    </>
  );
};

export default AllDataCount;
