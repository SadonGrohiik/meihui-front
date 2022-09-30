import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { formatNum } from "../util/util";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import RenderImage from "../components/render_img";
import { ProductCard } from "../components/productCard";

const query = gql`
  query Products {
    products {
      data {
        id
        attributes {
          Name
          Price
          slug
          Images {
            data {
              attributes {
                thumbnail: url
              }
            }
          }
        }
      }
    }
  }
`;

const Home: NextPage = ({ products }: any) => {
  return (
    <ul>
      {products &&
        products.map(
          (
            product: any //loops over and renders each product
          ) => (
            <ProductCard
              key={product.id}
              thumbnail={product.attributes.Images.data[0].attributes.thumbnail}
              name={product.attributes.Name}
              price={product.attributes.Price}
              link={"/product/" + product.attributes.slug}
            />
          )
        )}
    </ul>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({ query });

  return {
    props: {
      products: data.products.data,
    },
  };
}

export default Home;
