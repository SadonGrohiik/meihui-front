import type { NextPage } from "next";
import { ProductCard } from "../../components/productCard";
import { Context, gql } from "@apollo/client";
import client from "../../apollo-client";
import { Q_getPosts } from "../../util/queries";

const ProductList: NextPage = ({ products }: any) => {
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
              discount={
                product.attributes.discount ? product.attributes.discount : 0
              }
            />
          )
        )}
    </ul>
  );
};

export async function getServerSideProps(context: Context) {
  const query = await context.query;
  const sort = { field: await query.field, order: await query.order };

  let res = await getProductList(query.slug);
  console.log(await query.pussy);
  if (sort) {
    res = await getProductList(query.slug, [], sort);
  }

  const data = res.data;

  return {
    props: {
      products: data.categories.data[0].attributes.products.data,
    },
  };
}

async function getProductList(
  slug: String,
  postFilters: Array<string> = [],
  sort: { field: string; order: string } = { field: "id", order: "desc" }
) {
  const res = await client.query({
    query: gql`
  query getProducts{
    categories(filters:{
    slug:{
      eq: "${slug}"
    }
  }){
    ${Q_getPosts(postFilters, sort)}
  }
    }
    `,
  });
  return res;
}

export default ProductList;
