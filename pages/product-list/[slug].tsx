import type { NextPage } from "next";
import { ProductCard } from "../../components/productCard";
import { Context, gql } from "@apollo/client";
import client from "../../apollo-client";
import { Q_getProductsByCategory } from "../../util/queries";
import { sortNumbers, uniq } from "../../util/util";
import { useRouter } from "next/router";
import {
  Group,
  Badge,
  createStyles,
  UnstyledButton,
  Button,
} from "@mantine/core";
import Sidebar from "../../components/sidebar";
import { shallowEqual } from "@mantine/hooks";
import SortLink from "../../components/sortLink";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  productList: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: 0,
    },
  },
}));

const ProductList: NextPage = ({ products }: any) => {
  const router = useRouter();
  const { classes } = useStyles();
  const route = router.asPath;

  const priceList = sortNumbers(
    products.map((product: any) => product.attributes.Price)
  );
  route.substring(route.indexOf("?"), route.length);
  const productCard = (
    <ul className={classes.productList}>
      {products &&
        products.map(
          (
            product: any //loops over and renders each product
          ) => (
            <ProductCard
              thumbnail={product.attributes.Images.data[0].attributes.thumbnail}
              key={product.id}
              name={product.attributes.Name}
              price={product.attributes.Price}
              discount={product.attributes.discount ?? 0}
              stock={product.attributes.Stock}
              link={"/product/" + product.attributes.slug}
            />
          )
        )}
    </ul>
  );
  const sortLinks = (
    <Group pr={45}>
      <SortLink route={route} filter={"sort=Price+desc"} label="گران ترین" />
      <SortLink route={route} filter={"sort=Price+asc"} label="ارزان ترین" />
      <SortLink route={route} filter={"sort=Sales+desc"} label="پرفروش ترین" />
      <SortLink
        route={route}
        filter={"sort=createdAt+desc"}
        label="جدید ترین"
      />
    </Group>
  );

  return (
    <>
      {sortLinks}
      {productCard}
    </>
  );
};

export async function getServerSideProps(context: Context) {
  const query = await context.query;
  let res = await getProductList(query.slug);
  if (query.sort) {
    const sort = {
      field: query.sort.split(" ")[0],
      order: query.sort.split(" ")[1],
    };
    res = await getProductList(query.slug, [], sort);
    if (await query.filter) {
      const filters = await query.filter.split(" ");
      res = await getProductList(query.slug, [generateFilter(filters)], sort);
    }
  } else if (query.filter) {
    res = await getProductList(query.slug, [generateFilter(query.filter)]);
  }

  const data = res.data;
  return {
    props: {
      products: data.categories.data[0].attributes.products.data,
      slug: query.slug,
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
    ${Q_getProductsByCategory(postFilters, sort)}
  }
    }
    `,
  });
  return res;
}

function generateFilter(value: string[]) {
  let valueString = "";
  value.forEach((val) => {
    valueString += '"' + val + '",';
  });
  return `Details: {
      Value: {
        in: [${valueString}]
      }
    }`;
}
export default ProductList;
