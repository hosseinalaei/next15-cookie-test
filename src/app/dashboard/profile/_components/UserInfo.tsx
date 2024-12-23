// "use client";
// import Card from "@/app/_component/Card";
// import { Apies } from "@/constant/apis";
// import { getData } from "@/core/http-service/http-service";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const UserInfo = ({ userData }: any) => {
//   const [images, setImages] = useState<{ [key: string]: string }>({});
//   //   const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
//   //     {
//   //       width: 0,
//   //       height: 0,
//   //     }
//   //   );

//   //   const handleImageLoad = (event: any) => {
//   //     const target = event.target as HTMLImageElement; // Ensure target is an HTMLImageElement
//   //     if (target) {
//   //       const { naturalWidth, naturalHeight } = target;
//   //       setImageSize({ width: naturalWidth, height: naturalHeight });
//   //     }
//   //   };
//   const fetchImage = async (file_id: string) => {
//     const blob = await getData<Blob>(
//       `${Apies.GetProfileAvatar}?file_id=${file_id}`,
//       undefined,
//       "blob"
//     );
//     return URL.createObjectURL(blob);
//   };

//   useEffect(() => {
//     const fetchAllImages = async () => {
//       const imagePromises = userData?.map(async (item: any) => {
//         const imageUrl = await fetchImage(item.file_id);
//         return { file_id: item.file_id, imageUrl };
//       });

//       const results = await Promise.all(imagePromises);

//       const imagesMap = results.reduce((acc: any, result: any) => {
//         acc[result.file_id] = result.imageUrl;
//         return acc;
//       }, {});

//       setImages(imagesMap);
//     };

//     if (userData?.length) {
//       fetchAllImages();
//     }
//   }, [userData]);

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {userData?.map((item: any) => (
//         <Card key={item.insert_date} className="bg-white relative">
//           <div
//             className={`${
//               images[item.file_id] ? "bg-cover bg-center" : "bg-white"
//             } w-full h-full absolute inset-0 opacity-20`}
//             style={{
//               backgroundImage: images[item.file_id]
//                 ? `url(${images[item.file_id]})`
//                 : "none",
//             }}
//           />
//           <div className="relative z-10 flex flex-col items-center">
//             <img
//               src={images[item.file_id] ?? "/images/default-avatar.png"}
//               alt="avatar"
//               className="rounded-lg"
//               // width={imageSize.width}
//               // height={imageSize.height}
//             />
//             <p>{item.platform}</p>
//             <p>{item.full_name}</p>
//             <p>{item.username}</p>
//             <p>{item.user_id}</p>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default UserInfo;

"use client";
import Card from "@/app/_component/Card";
import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import Image from "next/image";
import { useState } from "react";

interface UserData {
  file_id: string;
  platform: string;
  full_name: string;
  username: string;
  user_id: string;
  insert_date: string;
}

interface UserInfoProps {
  userData: UserData[];
}

const UserInfo = ({ userData }: any) => {
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchImage = async (item: UserData) => {
    if (loadingImages[item.file_id] || images[item.file_id]) return;

    setLoadingImages((prev) => ({ ...prev, [item.file_id]: true }));

    try {
      const blob = await getData<Blob>(
        `${Apies.GetProfileAvatar}?file_id=${item.file_id}`,
        undefined,
        "blob"
      );
      const imageUrl = URL.createObjectURL(blob);

      setImages((prev) => ({ ...prev, [item.file_id]: imageUrl }));
      setLoadingImages((prev) => ({ ...prev, [item.file_id]: false }));
    } catch (error) {
      console.error(`Error loading image for ${item.username}:`, error);
      setLoadingImages((prev) => ({ ...prev, [item.file_id]: false }));
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {userData?.map((item: any) => {
        if (!loadingImages[item.file_id] && !images[item.file_id]) {
          fetchImage(item);
        }

        return (
          <Card key={item.insert_date} className="bg-white relative">
            {/* <Image
              alt="icon"
              src={`/images/svg/${item?.platform}.svg`}
              width={30}
              height={30}
            /> */}
            <div
              className={`${
                images[item.file_id] ? "bg-cover bg-center" : "bg-white"
              } w-full h-full absolute inset-0 opacity-20 rounded-2xl`}
              style={{
                backgroundImage: images[item.file_id]
                  ? `url(${images[item.file_id]})`
                  : "none",
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full flex items-center justify-center">
                {images[item.file_id] ? (
                  <img
                    src={images[item.file_id]}
                    alt="avatar"
                    className="rounded-lg object-contain min-w-20 min-h-20"
                  />
                ) : (
                  <img
                    src="/images/default-avatar.png"
                    alt="loading avatar"
                    className="rounded-lg animate-pulse"
                  />
                )}
              </div>
              <p>{item.platform}</p>

              <p className="font-bold">{item.full_name}</p>
              <p>{item.username}</p>
              <p>{item.user_id}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default UserInfo;
