export function Q_getPosts(
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
