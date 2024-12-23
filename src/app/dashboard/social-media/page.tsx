"use client";
import Card from "@/app/_component/Card";
import { formatNumberIntl } from "@/utils/formatNumber";
import Image from "next/image";
import { useGetSocialCount } from "./hooks/useGetSocialCount";
import { useGetTwitterWorcloud } from "./hooks/useGetTwitterWorcloud";
import { useGetInsWorcloud } from "./hooks/useGetInsWorcloud";
import WordCloud from "@/app/_component/Charts/Wordcloud";
import { useGetSocialTopAccount } from "./hooks/useGetSocialTopAccount";
import BarYChart from "@/app/_component/Charts/BarY";

const SocialMediaPage = () => {
  const { data: socialCount, isLoading: socialIsLoading } = useGetSocialCount();
  const { data: socialTopAccount, isLoading: socialTopAccountIsLoading } =
    useGetSocialTopAccount();
  const { data: twitterWordcloud, isLoading: twitterWordcloudIsLoading } =
    useGetTwitterWorcloud();
  const { data: insWordcloud, isLoading: insWordcloudIsLoading } =
    useGetInsWorcloud();

  const twitterTopAccount = socialTopAccount?.data.filter(
    (item: any) => item.plattform === "twitter"
  );
  const instagramTopAccount = socialTopAccount?.data.filter(
    (item: any) => item.plattform === "instagram"
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {!socialIsLoading &&
          socialCount?.data?.map((item: any) => {
            return (
              <Card
                key={item?.plattform}
                className="px-24 rounded-md bg-green-200"
              >
                <Image
                  alt="icon"
                  src={`/images/svg/${item?.plattform}.svg`}
                  width={40}
                  height={40}
                />

                <div className="grid grid-cols-2 items-center">
                  <h3 className="text-2xl text-gray-700 dark:text-gray-400 m-2">
                    تعداد پست
                  </h3>
                  <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
                    {formatNumberIntl(item.info.post_count) ?? "-"}
                  </p>
                  <h3 className="text-2xl text-gray-700 dark:text-gray-400 m-2">
                    تعداد پروفایل
                  </h3>
                  <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
                    {formatNumberIntl(item.info.profile_count) ?? "-"}
                  </p>
                </div>
              </Card>
            );
          })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white" title="ابرواژه محتوای توییتر">
          {!twitterWordcloudIsLoading && (
            <WordCloud
              title="ابرواژه هشتگ توییتر"
              data={twitterWordcloud?.data?.map((item: any) => {
                return {
                  value: item.doc_count,
                  name: item.key,
                };
              })}
            />
          )}
        </Card>

        <Card className="bg-white" title="ابرواژه محتوای اینستاگرام">
          {!insWordcloudIsLoading && (
            <WordCloud
              title="ابرواژه هشتگ اینستاگرام"
              data={insWordcloud?.data?.map((item: any) => {
                return {
                  value: item.doc_count,
                  name: item.key,
                };
              })}
            />
          )}
        </Card>

        <Card className="bg-white">
          {!socialTopAccountIsLoading && (
            <BarYChart
              // name="ّرترین کاربران"
              title="برترین کاربران توییتر"
              yAxisData={twitterTopAccount[0]?.info.map(
                (item: any) => item.username
              )}
              xAxisData={twitterTopAccount[0]?.info.map(
                (item: any) => item.followers_count
              )}
            />
          )}
        </Card>

        <Card className="bg-white">
          {!socialTopAccountIsLoading && (
            <BarYChart
              // name="ّرترین کاربران"
              title="برترین کاربران اینستاگرام"
              yAxisData={instagramTopAccount[0]?.info.map(
                (item: any) => item.username
              )}
              xAxisData={instagramTopAccount[0]?.info.map(
                (item: any) => item.followers_count
              )}
            />
          )}
        </Card>
      </div>
    </>
  );
};

export default SocialMediaPage;
