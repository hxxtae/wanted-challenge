import { FC, memo } from "react"
import { MockData } from "../../services/mockAPI"
import { getDay } from "../../utils/days"
import "./style.css"

interface Params {
  product: MockData
}

export const ProductCard: FC<Params> = memo(({ product }) => {
  return (
    <li key={product.productId} className="product_item">
      <div className="image"></div>
      <div className="wrapper">
        <p className="name">{product.productName}</p>
        <p className="date">{getDay(product.boughtDate)}</p>
        <p className="price">$&nbsp;{product.price}</p>
      </div>
    </li>
  )
})
