export function Q_getProductsByCategory(
  filters: Array<string> = [],
  sort: { field: string; order: string } = { field: "id", order: "desc" }
) {
  const query = `
    data{
        attributes{
          products(
            filters:{
            ${filters.join()}
          }
          sort: "${sort.field}:${sort.order}"
          )
          
          {
            data{
              id,
              attributes{
                Name,
                Price,
                Stock,
                discount,
                slug,
                Details{
                  Name,
                  Value
                }
                Images{
            data{
              attributes{
                thumbnail:url
  
              }
            }
          }
              }
            }
          }
        }
      }
    `;

  return query;
}

export function Q_getProduct(slug: string) {
  return `
  
  products(filters:{
    slug:{
      eq: "${slug}"
    }
  }){
data{
attributes{
  Name,
  Description,
  Price,
  Stock,
  discount,
  Details{
    id,
    Name,
    Value
  },
  category{
    data{
      id
    }
  }
  Images{
    data{
      id,
      attributes{
        small:url
      }
    }
  }
}
}
}
  `;
}

export function Q_postColor() {}
