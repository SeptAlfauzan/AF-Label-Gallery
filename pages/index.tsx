import type { NextPage } from "next";
import Image from "next/image";
import Card from "../components/common/card";
import MainLayout from "../components/layouts/mainLayout";

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <div id="home" className="flex flex-col gap-[7px] h-screen">
        <h3 className=" text-[34px] font-bold">Lorem ipsum dolor sit emet.</h3>
        <h5 className=" text-zinc-400 text-[16px] mt-[10px]">
          Lorem ipsum dolor sit emet.
        </h5>
        <button className="w-[205px] mt-[36px] bg-dark-blue text-white px-[46px] py-[16px]">
          Pre-order now
        </button>
        <div
          id="image-banner"
          className="absolute w-screen left-0 h-1/2 bottom-0 overflow-x-clip flex justify-center items-end"
        >
          <div
            id="banner-tag-1"
            className="py-5  rotate-[10deg] bg-yellow-300 text-pink-400 absolute -left-20 top-36 text-clip whitespace-nowrap text-[16px]"
          >
            #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel
            #AFLabel #AFLabel #AFLabel
          </div>
          <div
            id="banner-tag-2"
            className="py-5  rotate-[-10deg] bg-violet text-pink-400 absolute -left-20 bottom-0 text-clip whitespace-nowrap z-10 text-[16px]"
          >
            #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel #AFLabel
            #AFLabel #AFLabel #AFLabel
          </div>
          <div className="w-52 h-3/4 relative">
            <Image
              src={dummyImgURL}
              objectFit="cover"
              alt="image cover"
              layout="fill"
            />
          </div>
        </div>
      </div>

      <div id="about-us" className="flex flex-col">
        <h3 className="text-[24px]">ABOUT US</h3>
        <p className="text-zinc-400 text-[16px] mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum minus
          nostrum ea accusantium quod sed nisi, sint fugiat facere inventore
          error quia? Soluta id, dolorum magnam eligendi iusto omnis sed.
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

      <div id="collections" className="flex flex-col mt-10">
        <div className="flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px]">COLLECTIONS</h3>
          <span>see all</span>
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

export default Home;
