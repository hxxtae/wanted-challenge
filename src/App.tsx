import { useEffect, useState } from "react"
import "./App.css"
import { IntersectionContainer } from "./components/IntersectionContainer"
import { ProductCard } from "./components/ProductCard"
import { MockData, productsAPI } from "./services/mockAPI"

const LIMIT = 10

function App() {
  const [products, setProducts] = useState<MockData[]>([])
  const [page, setPage] = useState<number>(1)
  const lastValidate = Math.ceil(products.length / LIMIT)
  const totalPrice = products
    .slice(0, page * LIMIT)
    .reduce((prev, product) => prev + product.price, 0)
  const totalCnt = products.slice(0, page * LIMIT).length

  const onNextList = () => {
    setPage((prev) => {
      return prev + 1
    })
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await productsAPI()
      if (data) {
        setProducts(() => [...data])
      }
    }
    getProducts()
  }, [])

  return (
    <main className="main">
      <div className="container">
        <article className="side_article pc">
          <div className="side_box">
            <div className="box_wrapper">
              <span>count:&nbsp;</span>
              <p>{totalCnt.toLocaleString()}</p>
            </div>
            <div className="box_wrapper">
              <span>price:&nbsp;</span>
              <p>${totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </article>
        <section className="product_section">
          <ul className="product_list">
            {products.length > 0 &&
              products
                .slice(0, page * LIMIT)
                .map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
            {lastValidate !== page && (
              <IntersectionContainer onReFetch={onNextList} />
            )}
          </ul>
        </section>
      </div>

      <article className="side_article mobile">
        <div className="side_box">
          <div className="box_wrapper">
            <span>count:&nbsp;</span>
            <p>{totalCnt.toLocaleString()}</p>
          </div>
          <div className="box_wrapper">
            <span>price:&nbsp;</span>
            <p>${totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </article>
    </main>
  )
}

export default App
