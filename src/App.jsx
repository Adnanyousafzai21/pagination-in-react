import React, { useDebugValue, useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [products, setProducts] = useState([])
  const  [page, setpage]= useState(1)
  console.log("products", products)
  const getporducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()
    console.log("data", data)
    setProducts(data.products)
  }

  useEffect(() => {
    getporducts()
  }, [])

  const handlepag=(pagination)=>{

    if(pagination>=1 && pagination<=products.length/10){
        setpage(pagination)
    }
  

  }
  return (
    <div className="container">  
     <h1>Pagination</h1>
      <div className='main'>
   

        {
          products && products.slice(page*8-8,page*8)?.map((product) => {
            return <div className="cart">
              <div className="title">{product.title}</div>
              <img src={product.thumbnail} alt="themnel img" />
              <div className='price'>
                <span>Category : : {product.category}</span> <span> Price : : {product.price}</span>
              </div>
            </div>
          })
        }

      </div>

      <div className="pagination">
      <span onClick={()=>handlepag(page-1)} className={page==1? "pagehide":""}>⏮</span>   
      {
        products&& products.slice(0,products.length/10).map((_,i)=>{
          return <span onClick={()=>setpage(i+1)} className={page==i+1?"selectedpage":""}>{i+1}</span>
        })
      }
      <span onClick={()=>handlepag(page+1)} className={page==products.length/10? "pagehide":""}>⏭</span>
      </div>
    </div>
  )
}

export default App
