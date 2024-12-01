const App = () => {  const [products, setProducts] = useState([])
  const [page, setpage] = useState(10)
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
  console.log("these are the products", products)
  return (
    <div className="container">
      <h1>Pagination</h1>
      <div className='main'>
        {products.slice(page * 10 - 10, page * 10).map((items) => (
          <div className="cart">
            <div className="title">{items.title} <span style={{ marginLeft: "20px", borderRadius: "50%", backgroundColor: "black", padding: "5px", width: "50px", height: "50px" }}>{items.id}</span></div>
            <img src={items?.images[0]} alt="themnel img" />
            <div className='price'>
              <span>Category : : {items.category} </span> <span> Price : :{items.price}</span>
            </div>
          </div>
        ))}


      </div>
      <div className="pagination">
        <span onClick={() => setpage(page - 1)} className={page == 1 && "pagehide"}>⏮</span>
        {

          products && (products?.slice(0, products.length / 10)).map((_, i) => {
            const shouldShow = Math.abs(page - 1 - i) <= 2;
            return (
              shouldShow && <span onClick={() => setpage(i + 1)} className={page == i + 1 && "selectedpage"}>{i + 1}</span>
            )
          })

        }
        <span onClick={() => setpage(page + 1)} className={page == products.length / 10 ? "pagehide" : ""}>⏭</span>
      </div>


    </div >

  )

}