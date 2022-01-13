import { UserEntity } from './User.entity';
import { getRepository, Repository } from "typeorm";
import bcrypt from 'bcrypt'
import {
    CHECK_USER_PASS,
    CREATE_FAIL,
    CREATE_SUCCESS,
    CREATE_USER_EXIST,
    DELETE_FAIL,
    DELETE_SUCCESS,
    ERR_NOT_FIND,
    getToken,
    IS_USER_NO_EXIST,
    LOGIN_SUCCESS,
    UPDATE_SUCCESS,
    USER_NO_EXIST
} from "../../common";
import { UserType } from "./User.interface";
const saltRounds: number = 10;
const salt = bcrypt.genSaltSync(saltRounds)

//danh sách All customers
export const getListUser = async (page = 0, number = 10) => {
    const UserRespository: any = await getRepository(UserEntity);
    try {
        let [result, total] = await UserRespository.findAndCount({
            take: number,
            skip: page * 10
        });
        if (result) {
            return {
                data: result,
                count: total
            }
        } else {
            return {
                data: [],
                count: 0
            }
        }
    } catch (error) {
        return {
            data: [],
            count: 0
        }
    }
}

//dang ki
export const onRegister = async (data: UserType) => {
    const UserRespository: any = await getRepository(UserEntity);
    let res = await UserRespository.findOne({
        where: {
            email: data.email
        }
    });
    try {
        if (!res) {
            const hashPass = bcrypt.hashSync(data.password, salt)
            const response = await UserRespository.create({
                name: data.name,
                email: data.email,
                role_id: 2,
                password: hashPass,
                phone: data.phone,
                avatar: data.avatar,
            });
            await UserRespository.save(response);
            return {
                status: true,
                messenger: CREATE_SUCCESS
            }
        } else {
            return {
                status: false,
                messenger: CREATE_USER_EXIST
            }
        }
    } catch (error) {
        return {
            status: false,
            messenger: CREATE_FAIL
        }
    }
}
export const onLogin = async (data: UserType) => {
    const UserRespository: any = await getRepository(UserEntity);
    try {
        let response = await UserRespository.findOne({
            where: {
                email: data.email,
            },
            relations: ["role_id"]
        });
        if (response) {
            response = { ...response }
            const checkPass: boolean = bcrypt.compareSync(data.password, response.password)
            if (response && checkPass) {
                const token = getToken({
                    id: response.id,
                    role: { ...response.role_id }
                });
                return {
                    status: true,
                    messenger: LOGIN_SUCCESS,
                    userInfor: {
                        id: response?.id,
                        name: response?.name,
                        email: response?.email,
                        token,
                        role: { ...response.role_id }
                    }
                }
            } else {
                return {
                    status: false,
                    messenger: CHECK_USER_PASS
                }
            }
        } else {
            return {
                status: false,
                messenger: IS_USER_NO_EXIST
            }
        }
    } catch (error) {
        return {
            status: false,
            messenger: USER_NO_EXIST
        }
    }
}


//cập nhật customers by id customers
export const onUpdateUser = async (id: string, req: UserType) => {
    const UsersRespository: any = await getRepository(UserEntity);
    try {
        let response: any = await UsersRespository.findOne({
            where: {
                id
            }
        });
        if (response) {
            response = { ...response }
            response.name = req.name,
                response.email = req.email,
                response.password = req.password,
                response.phone = req.phone,
                response.avatar = req.avatar,
                await UsersRespository.save(response);
            return {
                status: true,
                messenger: UPDATE_SUCCESS
            }
        } else {
            return {
                status: false,
                messenger: ERR_NOT_FIND
            }
        }
    } catch (error) {

    }
}


//Xóa user by id user
export const getDetailUser = async (id: string) => {
    const UserRespository: any = await getRepository(UserEntity);
    try {
        let response = await UserRespository.findOne({
            where: {
                id
            },
        });
        if (response) {
            response = { ...response }
            return response
        } else {
            return
        }
    } catch (error) {
        return ERR_NOT_FIND
    }
}

//Xóa user by id user
export const onDeleteUser = async (id: string) => {
    const CustomersRespository: any = await getRepository(UserEntity);
    try {
        let response: any = await CustomersRespository.findOne({
            where: {
                id
            }
        });
        if (response) {
            await CustomersRespository.remove(response);
            return {
                status: true,
                messenger: DELETE_SUCCESS
            }
        } else {
            return {
                status: false,
                messenger: DELETE_FAIL
            }
        }
    } catch (error) {
        return {
            status: false,
            messenger: ERR_NOT_FIND
        }
    }
}