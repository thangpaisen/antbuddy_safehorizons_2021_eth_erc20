import { getRepository } from "typeorm";
import { CategoriesEntity } from "./categories.entity";

export const getListCategory = async () => {
    const CategoryRespository: any = await getRepository(CategoriesEntity);
    try {
        let response = await CategoryRespository.find();
        return response
    } catch (error) {
        return {}
    }
}