import type { NextPage } from "next";
import Image from "next/image";
import Card from "../../components/common/card";
import MainLayout from "../../components/layouts/mainLayout";

const dummyImgURL: string =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const Collections: NextPage = () => {
  return (
    <MainLayout>
      <div id="collections" className="flex flex-col mt-10 mb-[200px]">
        <div className="flex flex-row w-full justify-between mb-10">
          <h3 className="text-[24px]">COLLECTIONS</h3>
        </div>
        <div
          id="card-container"
          className="flex flex-row flex-wrap justify-between"
        >
          {new Array(40).fill(0).map((data, i) => (
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

export default Collections;
