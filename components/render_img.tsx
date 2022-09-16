import React from "react";
import Image from "next/image";
import ImageWrapper from "../styles/components/basic_styles";

const ImageLoader = ({ src }: any) => {
  return `http://localhost:1337${src}`;
};

export default function RenderImage(props: any) {
  return (
    <ImageWrapper>
      <Image
        src={"http://localhost:1337" + props.src}
        alt={props.alt}
        layout="fill"
        objectFit="cover"
        quality={30}
      />
    </ImageWrapper>
  );
}
