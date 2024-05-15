import CreateProductForm from '../components/CreateProductForm';
import Link from 'next/link';
import ProductsList from "../components/ProductsList";

function page (){
    return(
        <div >
            <h3 className='product-header'>Create product page</h3>
            <CreateProductForm/>
            <ProductsList/>
        </div>
      
    )
}
export default page;