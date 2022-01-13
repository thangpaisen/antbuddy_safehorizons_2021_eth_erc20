export interface ProductType {
    id: string,
    create_at: string,
    description: string,
    picture: string,
    price: number,
    product_name: string,
}

export interface detailProductType {
    id: string,
    create_at: string,
    description: string,
    picture: string,
    price: number,
    product_name: string,
    categories_id:categoriType
}

export interface categoriType {
    id: string,
    categoryName: string,
    description: string,
    price: number,
}

