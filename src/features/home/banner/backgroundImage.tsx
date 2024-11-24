import Image from "@/components/common/images/image";
import React from "react";

type BackgroundImageType = {
  image?: string;
};

export const BackgroundImage = ({ image }: BackgroundImageType) => {
  return (
    <Image
      src={image || "/assets/images/home/banner-plane.png"}
      alt="Plane Banner Image"
      className="absolute w-full h-[50rem] object-cover"
    />
  );
};
