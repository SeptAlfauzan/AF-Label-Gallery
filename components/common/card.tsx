import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  id: number;
  imageSrc: string;
  imageAlt: string;
  nameProduct: string;
  price: number;
}

const Card: React.FC<CardProps> = ({
  id,
  imageSrc,
  imageAlt,
  nameProduct,
  price,
}) => {
  return (
    <Link href={`/collections/${id}`}>
      <div className="group hover:scale-105 transition-all duration-150 border border-dashed border-zinc-400 p-4 flex flex-col w-[48%] md:w-[23%] h-[267px] text-[14px] mb-[40px] cursor-pointer">
        <div className="relative w-full h-3/4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3>{nameProduct}</h3>
        <h3>Rp{price}</h3>
        <Link href={`/collections/${id}`}>
          <button className="bg-dark-blue text-white text-center py-1 mt-3 group-hover:bg-yellow-300 group-hover:text-dark-blue">
            Pre-order
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default Card;
