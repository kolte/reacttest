"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  checkAuthentication,
  removeLoginToken,
} from "../../../helper/checkAuthentication";
import Loader from "@/components/Loader";
import Pagination from "@/components/paggination";
import ProductTable, {
  columnProps,
  productProp,
} from "@/components/ProductTable";

const columns: columnProps[] = [
  { dataKey: "thumbnail", headTitle: "Thumbnail", type: "img" },
  { dataKey: "title", headTitle: "Title", type: "title" },
  { dataKey: "category", headTitle: "Category" },
  { dataKey: "brand", headTitle: "Brand" },
  { dataKey: "description", headTitle: "Description", type: "description" },
  { dataKey: "price", headTitle: "Price" },
];

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<productProp[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const defaultPageSize: number = 10;

  const getData = async (currentPage: number) => {
    setShowLoader(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/products?skip=${currentPage}&limit=${defaultPageSize}`
      );
      let data = await res.json();
      setProducts(data.products);
      setItemTotal(data.total);
      setShowLoader(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (err) {
      setShowLoader(false);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    getData(page);
  };

  const logout = () => {
    removeLoginToken();
    router.push("/login");
  };

  useEffect(() => {
    if (checkAuthentication()) getData(currentPage);
    else router.push("/login");
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <div
        className={`flex flex-col ${showLoader ? "bg-gray-600 opacity-5" : ""}`}
      >
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="relative">
            <h1 className="text-2xl text-gray-900 dark:text-white text-center my-4">
              Product Detail
            </h1>
            <button
              className="absolute right-4 top-0 py-1 px-2 rounded-sm bg-gray-600 cursor-pointer hover:bg-black text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <ProductTable columns={columns} data={products} />
          </div>
        </div>
      </div>
      <Pagination
        items={itemTotal}
        currentPage={currentPage}
        pageSize={defaultPageSize}
        onPageChange={onPageChange}
      />
    </>
  );
}
