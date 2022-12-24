import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import FileDrop from "../../../components/common/FileDrop";
import AdminLayout from "../../../components/layouts/adminLayout";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import CollapseContainer, {
  CollapseHandle,
} from "../../../components/common/CollapseContainer";
import { useForm } from "react-hook-form";
import { Category, Image, Product } from "@prisma/client";
import FormInput, { InputHooks } from "../../../components/common/InputHook";
import axios from "axios";

import { prisma } from "../../../prisma/prisma";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoEllipsisVerticalOutline,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import { getBase64string } from "../../../utils/base64";
import { FileWithPath } from "file-selector";
import Alert from "../../../components/common/Alert";

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

const CATEGORY: string[] = Object.values(Category);

const Products = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const collapseRef = useRef<CollapseHandle>(null);
  const formseRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductWithImage>();

  const [data, setData] = React.useState<Product[]>(products || []);
  const [imgFile, setImgFile] = React.useState<FileWithPath | null>(null);
  const [triggerMenuIdx, setTriggerMenuIdx] = React.useState<number | null>(
    null
  );

  const router = useRouter();

  const uploadImage = async (file: FileWithPath) => {
    try {
      const authentication = await axios.get("/api/imagekit");
      const { signature, expire, token } = authentication.data;

      const image = await getBase64string(file);
      const body = {
        file: image,
        publicKey: process.env.NEXT_PUBLIC_imagekit_pub!,
        fileName: "lorem ipsum",
        signature,
        expire,
        token,
      };
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const refetch = async () =>
    setData(await (await axios.get("/api/products")).data);
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!imgFile) return alert("Image must be added!");

      const product: Product = await (
        await axios.post("/api/products", data)
      ).data;

      const imagekitResponse = await uploadImage(imgFile);
      const imageProduct = await axios.post("/api/images", {
        url: imagekitResponse.url,
        id: imagekitResponse.fileId,
        productId: product.id,
      });

      alert("sukses menambahkan data baru!");
      router.replace(router.asPath);
      await refetch();
      collapseRef.current?.setClose();
      clearForm(formseRef.current!);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  });
  const clearForm = (form: HTMLFormElement) => {
    setImgFile(null);
    form.reset();
  };
  console.log(triggerMenuIdx);
  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.classList.contains("menu-action")) setTriggerMenuIdx(null);
    };

    window.addEventListener("click", (e) => handleClick(e));

    return () => window.removeEventListener("click", (e) => handleClick(e));
  }, []);
  return (
    <AdminLayout>
      {/* <Alert /> */}
      <CollapseContainer
        className="bg-white pb-10"
        ref={collapseRef}
        label="Add new product"
      >
        <form
          onSubmit={onSubmit}
          ref={formseRef}
          className="flex flex-col gap-3"
        >
          <>
            <label className="text-zinc-300">Product&apos;s name</label>
            <FileDrop onUpdate={setImgFile} />
          </>
          <div className="flex gap-[20px] w-full flex-wrap">
            <div className="w-[calc(25% - 5px)] flex flex-col">
              <label className="text-zinc-300">Product&apos;s name</label>
              <input
                id="firstName"
                // type="text"
                // name="name"
                placeholder="Name"
                className="mb-2 border px-3 rounded-lg bg-zinc-50 py-1"
                {...register("name", { required: true })}
                // errors={errors}
              />
            </div>
            <div className="w-[calc(25% - 5px)] flex flex-col">
              <label className="text-zinc-300">Description</label>
              <input
                // type="text"
                // name="description"
                placeholder="Description"
                className="mb-2 border px-3 rounded-lg bg-zinc-50 py-1"
                {...register("description", { required: true })}
                // errors={errors}
              />
            </div>
            <div className="w-[calc(25% - 5px)] flex flex-col">
              <label className="text-zinc-300">Price</label>
              <input
                id="price"
                type="number"
                // name="price"
                placeholder="Price"
                className="mb-2 border px-3 rounded-lg bg-zinc-50 py-1"
                {...register("price", { required: true })}
                // errors={errors}
              />
            </div>
            <div className="w-[calc(25% - 5px)] flex flex-col">
              <label className="text-zinc-300">Category</label>
              <select
                className="bg-zinc-50 border rounded-lg px-3 py-1"
                {...register("category", { required: true })}
              >
                {CATEGORY.map((data, i) => (
                  <option value={data} key={i}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[calc(25% - 5px)] flex flex-col">
              <label className="text-zinc-300">Color</label>
              <input
                id="description"
                // type="color"
                // name="color"
                type="color"
                placeholder="Color"
                className="mb-2 border rounded-lg bg-zinc-50"
                {...register("color", { required: true })}
                // errors={errors}
              />
            </div>
          </div>
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
      <table className="w-full flex flex-col bg-white px-8 py-3 rounded border text-zinc-400 h-[500px] gap-5 pt-10 overflow-y-scroll">
        <tbody>
          <tr className=" flex justify-between w-full px-5 text-left">
            <th className=" w-40 capitalize font-bold">name</th>
            <th className=" w-40 capitalize font-bold">price</th>
            <th className=" w-40 capitalize font-bold">description</th>
            <th className=" w-40 capitalize font-bold">color</th>
            <th className=" w-40 capitalize font-bold text-left border">
              category
            </th>
            <th>
              <small>action</small>
            </th>
          </tr>
          {data.map((product: Product, i) => (
            <tr
              key={i}
              className="border-b-[0.1px] flex justify-between w-full relative pt-8 hover:bg-blue-50 hover:text-black px-5"
            >
              <td className=" w-40">{product.name}</td>
              <td className=" w-40">{product.price}</td>
              <td className=" w-40">{product.description}</td>
              <td className=" w-40">{product.color}</td>
              <td className=" w-40">{product.category}</td>
              <td>
                <button
                  className="font-bold text-xl hover:text-black menu-action right-5 z-30 border"
                  onClick={() =>
                    setTriggerMenuIdx((prev) => (prev === i ? null : i))
                  }
                >
                  <IoEllipsisVerticalOutline className="menu-action" />
                </button>
                <div
                  className={`menu-action absolute right-0 top-0 shadow-xl w-[140px] bg-white flex flex-col gap-3 border rounded-lg z-10 ${
                    triggerMenuIdx === i ? null : "hidden"
                  }`}
                >
                  <Link href={`/admin/producs/edit/${product.id}`}>
                    <span className=" cursor-pointer flex justify-between items-center hover:bg-blue-50 hover:text-black px-5 py-3">
                      Edit
                      <IoPencil />
                    </span>
                  </Link>
                  <Link href={`/admin/producs/delete/${product.id}`}>
                    <span className=" cursor-pointer flex justify-between items-center  hover:bg-blue-50 hover:text-black px-5 py-3">
                      Delete
                      <IoTrashBin />
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Products;
