import React, { FormEvent, FormEventHandler, useRef } from "react";
import FileDrop from "../../../components/common/FileDrop";
import AdminLayout from "../../../components/layouts/adminLayout";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import CollapseContainer, {
  CollapseHandle,
} from "../../../components/common/CollapseContainer";
import { useForm } from "react-hook-form";
import { Image, Product } from "@prisma/client";
import FormInput, { InputHooks } from "../../../components/common/InputHook";
import axios from "axios";

import { prisma } from "../../../prisma/prisma";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

interface ProductWithImage extends Product {
  image: string;
}

export async function getServerSideProps() {
  const products: Product[] = await prisma.product.findMany({
    include: { images: true },
  });

  return {
    props: {
      products,
    },
  };
}

const Products = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const collapseRef = useRef<CollapseHandle>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductWithImage>();

  const [triggerMenuIdx, setTriggerMenuIdx] = React.useState<number | null>(
    null
  );

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios.post("/api/products", data);
      alert("sukses menambahkan data baru!");
    } catch (error) {
      alert(error);
    }
  });

  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.classList.contains("menu-action")) setTriggerMenuIdx(null);
    };

    window.addEventListener("click", (e) => handleClick(e));

    return () => window.removeEventListener("click", (e) => handleClick(e));
  }, []);

  return (
    <AdminLayout>
      <CollapseContainer
        className="bg-white pb-10"
        ref={collapseRef}
        label="Add new product"
      >
        <form onSubmit={onSubmit}>
          <>
            <label className="text-zinc-300">Product&apos;s name</label>
            <FileDrop />
          </>
          <input
            id="firstName"
            // type="text"
            // name="name"
            placeholder="Name"
            className="mb-2"
            {...register("name", { required: true })}
            // errors={errors}
          />
          <input
            id="description"
            // type="text"
            // name="description"
            placeholder="Description"
            className="mb-2"
            {...register("description", { required: true })}
            // errors={errors}
          />
          <input
            id="description"
            // type="color"
            // name="color"
            placeholder="Color"
            className="mb-2"
            {...register("color", { required: true })}
            // errors={errors}
          />
          <input
            id="price"
            type="number"
            // name="price"
            placeholder="Price"
            className="mb-2"
            {...register("price", { required: true })}
            // errors={errors}
          />
          <div className="flex gap-3">
            <button
              type="reset"
              onClick={() => collapseRef.current?.setClose()}
              className="border border-black px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-3 py-1 rounded"
            >
              Add products
            </button>
          </div>
        </form>
      </CollapseContainer>
      {/* collapse componenet */}
      <ul className="w-full flex flex-col bg-white px-8 py-3 rounded border text-zinc-400 h-[500px] gap-5 pt-10 overflow-y-scroll">
        <li className=" flex justify-between w-full">
          <span className=" w-40 capitalize font-bold">name</span>
          <span className=" w-40 capitalize font-bold">price</span>
          <span className=" w-40 capitalize font-bold">description</span>
          <span className=" w-40 capitalize font-bold">color</span>
          <span className=" w-40 capitalize font-bold">category</span>
        </li>
        {products.map((product: Product, i) => (
          <li
            key={i}
            className="border-b-[0.1px] flex justify-between w-full relative pt-8"
          >
            <span className=" w-40">{product.name}</span>
            <span className=" w-40">{product.price}</span>
            <span className=" w-40">{product.description}</span>
            <span className=" w-40">{product.color}</span>
            <span className=" w-40">{product.category}</span>
            <button
              className="font-bold text-xl hover:text-black menu-action"
              onClick={() =>
                setTriggerMenuIdx((prev) => (prev === i ? null : i))
              }
            >
              ...
            </button>
            <div
              className={`menu-action absolute right-0 top-0 shadow-xl w-[140px] bg-white flex flex-col gap-3 border rounded-lg ${
                triggerMenuIdx === i ? null : "hidden"
              }`}
            >
              <Link href={`/admin/producs/edit/${product.id}`}>
                <span className=" cursor-pointer hover:bg-blue-50 hover:text-black px-5 py-3">
                  edit
                </span>
              </Link>
              <Link href={`/admin/producs/delete/${product.id}`}>
                <span className=" cursor-pointer  hover:bg-blue-50 hover:text-black px-5 py-3">
                  delete
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Products;
