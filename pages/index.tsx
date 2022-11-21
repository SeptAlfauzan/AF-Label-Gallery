import type { InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/common/card";
import MainLayout from "../components/layouts/mainLayout";
import { prisma } from "../prisma/prisma";

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: { images: true },
  });
  return {
    props: {
      products,
    },
  };
}

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const Home = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(products);
  return (
    <MainLayout>
      <div id="home" className="flex flex-col gap-[7px] h-screen">
        <div className="w-full md:w-2/4">
          <h3 className=" text-[34px] md:text-[54px] font-bold">
            AF Label'c Collections
          </h3>
          {/* <h5 className=" text-zinc-400 md:text-[30px] text-[16px]  mt-[10px]">
            Lorem ipsum dolor sit emet.
          </h5> */}
        </div>
        <Link href={"/collections"}>
          <button className="w-fit mt-[36px] bg-dark-blue text-white px-[46px] py-[16px] z-10 hover:bg-yellow-300 hover:text-dark-blue font-bold hover:scale-105 transition-all duration-100">
            Check our collections
          </button>
        </Link>
        <div
          id="image-banner"
          className="absolute w-screen md:w-full left-0 h-1/2 md:h-3/4 bottom-0 overflow-x-clip flex justify-center items-end"
        >
          <StripBanner />
          <div className="w-52 h-3/4 md:w-1/4 md:h-2/4 lg:h-3/4 relative -bottom-10 md:absolute md:right-[200px] lg:right-[300px] lg:bottom-10">
            <Image
              src={dummyImgURL}
              objectFit="cover"
              alt="image cover"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>

      <div id="about-us" className="flex flex-col pt-[100px] -mt-[100px]">
        <h3 className="text-[24px]">ABOUT US</h3>
        <p className="text-zinc-400 text-[16px] mt-4 md:w-3/4">
          AF_lebell merupakan brand lokal yang berdiri dari tahun 2020. AF
          lebell ini merupakan brand atas nama gabungan dari owner-nya. kaos
          launching AF lebell pertama bernama triangle
        </p>
        <div className="w-52 h-60 relative self-end mt-10">
          <Image
            src={
              "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            objectFit="cover"
            alt="image about us"
            layout="fill"
          />
        </div>
      </div>

      <div id="collections" className="flex flex-col mt-10 mb-[200px]">
        <div className="flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px] grow">OUR NEW COLLECTIONS</h3>
          <Link href={"/collections"}>
            <div className="w-[100px] text-right self-end">see all</div>
          </Link>
        </div>
        <div id="card-container" className="flex flex-row flex-wrap gap-[16px]">
          {products.map((data, i) => (
            <Card
              key={i}
              id={data.id}
              imageSrc={data.images[0] ? data.images[0].url : dummyImgURL}
              imageAlt={`image from data-${i}`}
              nameProduct={data.name}
              price={10000}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

const StripBanner: React.FC = () => {
  return (
    <>
      <div
        id="banner-tag-1"
        className="py-5 block md:hidden  rotate-[10deg] bg-yellow-300 text-pink-400 absolute -left-20 top-36 text-clip whitespace-nowrap text-[16px]"
      >
        #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel
        #AFLabel #AFLabel
      </div>
      <div
        id="banner-tag-2"
        className="py-5  rotate-[-10deg] md:rotate-[-4deg] bg-violet text-pink-400 absolute -left-20 bottom-0 text-clip whitespace-nowrap z-10 text-[16px] md:w-[120vw]"
      >
        #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel
        #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel
        #AFLabel #AFLabel #AFLabel #AFLabel
      </div>
    </>
  );
};

export default Home;
