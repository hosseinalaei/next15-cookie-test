"use client";
import AllDataCount from "@/app/_component/AllDataCount/AllDataCount";
import Button from "@/app/_component/Button";
import Card from "@/app/_component/Card";
import Input from "@/app/_component/Form/Input";
import Loading from "@/app/_component/Loading";
import NoData from "@/app/_component/NoData";
import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import UserInfo from "./_components/UserInfo";
import { useGetProfileAllDataCount } from "./hooks/getProfileAllDataCount";
import ReactPaginate from "react-paginate";

interface UserData {
  id: number;
  username: string;
}

interface ApiResponse {
  data: {
    entity: UserData[];
    count: number;
  };
}

const ProfilePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 20;

  const { data: profileAllData, isLoading: profileAllDataIsLoading } =
    useGetProfileAllDataCount();

  const { mutate, data, isLoading, isError, error } = useMutation<
    ApiResponse,
    Error,
    { term: string; page: number }
  >({
    mutationFn: ({ term, page }) =>
      getData(
        `${Apies.GetProfileSearch}?search=${term}&page=${page}&page_size=${itemsPerPage}`
      ),

    onError: (error) => {
      console.error("Search failed:", error);
    },
    onSuccess: (response) => {
      setTotalCount(response?.data?.count || 0);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      mutate({ term: searchTerm, page: 1 }); // Reset to the first page on new search
      setPage(1); // Reset page number
    }
  };
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1; // React-Paginate is 0-indexed, so add 1
    setPage(newPage);
    mutate({ term: searchTerm, page: newPage }); // Fetch data for the new page
  };
  const mapedData = (data: any) => {
    return data?.map((item: any) => {
      let obj = {
        cat: item.key,
        detail: item.key,
        count: item.doc_count,
      };

      return obj;
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {!profileAllDataIsLoading ? (
          <AllDataCount data={mapedData(profileAllData?.data)} />
        ) : (
          <Loading />
        )}
      </div>
      <Card className="bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex items-baseline my-4 w-full justify-center"
        >
          <div className="flex w-full justify-between gap-2">
            <Input
              className="w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="نام کاربری"
            />
            <Button type="submit" disabled={isLoading} className="w-1/3">
              {isLoading ? "درحال ارسال..." : "جستجو"}
            </Button>
          </div>
        </form>
        {isError && (
          <p className="text-red-500">
            خطا: {error?.message || "An unexpected error occurred."}
          </p>
        )}

        {data?.data && data?.data?.entity?.length > 0 ? (
          <>
            <UserInfo userData={data?.data?.entity} />
            <div className="flex justify-between w-full">
              <p>تعداد کل: {totalCount}</p>

              <ReactPaginate
                // activeClassName={"item active "}
                // breakClassName={"item break-me "}
                breakLabel="..."
                nextLabel=" >>"
                previousLabel="<< "
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(totalCount / itemsPerPage)} // Total number of pages
                forcePage={page - 1} // Highlight current page (React-Paginate is 0-indexed)
                containerClassName="pagination"
                activeClassName="active"
                disabledClassName="disabled"
              />
            </div>
          </>
        ) : (
          data && <NoData title="داده‌ای یافت نشد" />
        )}
      </Card>
    </>
  );
};

export default ProfilePage;
