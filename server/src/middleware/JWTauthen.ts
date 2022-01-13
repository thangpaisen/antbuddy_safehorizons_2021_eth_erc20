import { getRepository } from 'typeorm';
import { decode } from '../common/tokenHelper'
import { UserEntity } from '../servers/User/User.entity';
export const JWTauthen = async (req: any, res: any, next: any) => {
    let jwt = req.headers['Authorization'] || req.headers['authorization'];
    if (!jwt) return next();
    let payload = decode(jwt)
    if (payload) {
        const UserRepository: any = await getRepository(UserEntity);
        let response = await UserRepository.findOne({
            where: { id: payload.data.id },
            relations: ["role_id"]
        })
        if (response && payload) {
            req.user = {
                id: response.id,
                email: response.email,
                role: { ...response.role_id }
            }
        }
        next();
    } else {
        res.status(400).send("Mã không hợp lệ!!");
    }
};
