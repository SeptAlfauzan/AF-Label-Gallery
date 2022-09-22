import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import AdminLayout from "../../components/layouts/adminLayout";
import { prisma } from "../../prisma/prisma";

export async function getServerSideProps() {
  const productsCount: number | undefined = await prisma.product.count();

  return {
    props: {
      productsCount,
    },
  };
}

const Admin = ({
  productsCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AdminLayout>
      <div className="flex flex-wrap w-full h-[600px] content-start gap-[10px]">
        <Card
          label="Produtcs"
          count={productsCount || 0}
          url={"/admin/products"}
        />
        {/* <Card label="Categories" count={10} /> */}
      </div>
    </AdminLayout>
  );
};

interface CardProps {
  label: string;
  count: number;
  url?: string;
}
const Card: React.FC<CardProps> = ({ label, count, url }) => {
  return (
    <div className="rounded bg-white border md:w-[calc(50%_-_10px)] w-full h-fit py-10 px-5 text-xl relative">
      <p className="text-zinc-400 capitalize">{label}</p>
      <p className="text-right text-5xl font-bold">{count}</p>
      {url && (
        <Link href={url}>
          <span className="text-sm text-blue-500 cursor-pointer absolute right-5 mt-2">
            more info
          </span>
        </Link>
      )}
    </div>
  );
};

export default Admin;
