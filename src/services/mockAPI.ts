export interface MockData {
  productId: string
  productName: string
  price: number
  boughtDate: string
}

const PRODUCT_URL = `${import.meta.env.BASE_URL}mockData.json` as const

export const productsAPI = async (): Promise<MockData[] | null> => {
  try {
    const data = await fetch(PRODUCT_URL)

    if (data.ok) {
      const list = await data.json()
      if (Array.isArray(list) && list.length > 0) {
        return list as MockData[]
      }
      return []
    }
    return null
  } catch (err: any) {
    console.error(`productAPI Fetch Error: ${err?.message}`)
    return null
  }
}
