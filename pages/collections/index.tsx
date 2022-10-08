import type {
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Image from "next/image";
import Card from "../../components/common/card";
import MainLayout from "../../components/layouts/mainLayout";
import { prisma } from "../../prisma/prisma";

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

export async function getStaticProps() {
  const products = await prisma.product.findMany({
    include: { images: true },
  });
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}
const Collections = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <div id="collections" className="flex flex-col mt-10 mb-[200px]">
        <div className="flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px]">COLLECTIONS</h3>
        </div>
        <div id="card-container" className="flex flex-row flex-wrap gap-[16px]">
          {products.map((data, i) => (
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
};

export default Collections;
