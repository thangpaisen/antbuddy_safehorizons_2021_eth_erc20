import jwt from 'jsonwebtoken';
let secret = '151adw154411dwfva7596484awqcqfq';
const EXPIRESTIME = 30;
export const getToken = (payload: any) => {
    let token = jwt.sign({
        data: payload
    }, secret,
        { expiresIn: 30 * 24 * 60 * 60 }
    );
    return token;
}
export const decode = (token) => {
    try {
        let decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }
}