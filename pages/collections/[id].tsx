import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Card from "../../components/common/card";
import MainLayout from "../../components/layouts/mainLayout";

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const Collection: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <MainLayout>
      <div
        id="collections"
        className="flex flex-col mt-0 md:mt-10 mb-[200px] h-fit"
      >
        <div className="flex flex-wrap justify-between w-full">
          <div className="w-full  md:w-[300px] h-[400px] relative border">
            <Image
              src={dummyImgURL}
              alt={`image product ${pid}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full md:w-1/2 relative h-full flex flex-col gap-5 md:gap-10">
            <div className="flex md:flex-col flex-row gap-5 md:justify-start justify-between mt-10 md:mt-0">
              <h3 className="text-xl md:text-4xl text-black font-bold">
                Lorem ipsum
              </h3>
              <span>Rp10000</span>
            </div>
            <p className="text-zinc-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              nostrum distinctio quas ducimus quos sit necessitatibus ullam.
              Accusamus nemo praesentium perspiciatis provident, voluptate
              dolores minima optio commodi eius doloremque! Omnis.
            </p>
            <button className="text-yellow-500 bg-dark-blue px-5 py-2 w-fit">
              Pre-order now
            </button>
          </div>
        </div>
        <div className="mt-10 flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px]">COLLECTIONS</h3>
          <Link href={"/collections"}>see all</Link>
        </div>
        <div
          id="card-container"
          className="flex flex-row flex-wrap justify-between"
        >
          {new Array(4).fill(0).map((data, i) => (
            <Card
              key={i}
              id={i}
              imageSrc={dummyImgURL}
              imageAlt={`image from data-${i}`}
              nameProduct="Product name"
              price={10000}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Collection;
