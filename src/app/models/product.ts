export type Product = {
    id: number,
    name: string,
    price: number,
    url: string,
    description: string
}

export type AddedProduct = Product & {addedToCart: boolean}

export type QuantityProduct = Product & {quantity: number}