import type { NextPage } from 'next';
import {gql} from '@apollo/client';
import client from '../apollo-client';

const query = gql`
query getCategories{
      categories{
    data{
      id,
      attributes{
        Name,
      }
    }
  }
}
`

const Categories : NextPage = ({categories} : any) => 
{

    return(
        <ul>
            {
                categories && categories.map((category : any)=>(
                    <li key={category.attributes.id}>
                        {category.attributes.Name}
                        </li>
                )) 
            }
        </ul>
    )
}

export async function  getStaticProps() {
    const {data} = await client.query({query});
  
  
    return{
      props: {
        categories : data.categories.data,
      },
      }
  }

  export default Categories;