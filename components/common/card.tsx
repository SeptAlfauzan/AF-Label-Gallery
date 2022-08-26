import Image from "next/image";
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
    <div className="border border-dashed border-zinc-400 p-1 flex flex-col w-[48%] h-[267px] text-[14px] mb-3">
      <div className="relative w-full h-3/4">
        <Image src={imageSrc} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>
      <h3>{nameProduct}</h3>
      <h3>Rp{price}</h3>
      <button className="bg-dark-blue text-white text-center py-1 mt-3">
        Pre-order
      </button>
    </div>
  );
};

export default Card;
