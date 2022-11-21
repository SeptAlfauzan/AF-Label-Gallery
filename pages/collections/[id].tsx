import { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Card from "../../components/common/card";
import MainLayout from "../../components/layouts/mainLayout";
import { prisma } from "../../prisma/prisma";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

export async function getStaticPaths() {
  const products = await prisma.product.findMany();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const selected = await prisma.product.findFirst({
    where: { id: params.id },
    include: { images: true },
  });
  const other = await prisma.product.findMany({
    where: {
      NOT: {
        id: params.id,
      },
    },
    include: {
      images: true,
    },
  });

  return {
    props: {
      selected,
      other,
    },
    revalidate: 10,
  };
}

function Collection({
  selected,
  other,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;

  const router = useRouter();
  const { pid } = router.query;
  console.log(other);
  return (
    <MainLayout>
      {/* <LinkPreview
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        width="400px"
      /> */}
      <div
        id="collections"
        className="flex flex-col mt-0 md:mt-10 mb-[200px] h-fit"
      >
        <div className="flex flex-wrap justify-between w-full">
          <div className="w-full  md:w-[300px] h-[400px] relative border">
            <Image
              src={selected?.images[0] ? selected.images[0].url : dummyImgURL}
              alt={`image product ${pid}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full md:w-1/2 relative h-full flex flex-col gap-5 md:gap-10">
            <div className="flex md:flex-col flex-row gap-5 md:justify-start justify-between mt-10 md:mt-0">
              <h3 className="text-xl md:text-4xl text-black font-bold">
                {selected?.name}
              </h3>
              <span>Rp{selected?.price}</span>
            </div>
            <p className="text-zinc-500">{selected?.description}</p>

            <a
              href={`https://api.whatsapp.com/send?phone=+6281331237275&text=${URL}%0a%0aHalo kak, permisi. Saya ingin order: %0a${selected?.name}%0aApakah bisa?`}
            >
              <button className="text-yellow-500 bg-dark-blue px-5 py-2 w-fit">
                Pre-order now
              </button>
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px]">OTHER COLLECTIONS</h3>
          <Link href={"/collections"}>see all</Link>
        </div>
        <div id="card-container" className="flex flex-row flex-wrap gap-[16px]">
          {other.map((data, i) => (
            <Card
              key={i}
              id={data.id}
              imageSrc={data.images[0] ? data.images[0].url : dummyImgURL}
              imageAlt={`image from data-${i}`}
              nameProduct={data.name}
              price={data.price}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Collection;
