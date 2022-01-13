import React, { useState, useCallback } from "react";
import CryptoJS from "crypto-js";
export const SECRET_KEY = 'kjsdfoqweoirsldfjkhsfoiwfjhasdfjkhs';
export function setCookie(name, value, expires) {
    document.cookie =
        name + "=" + (value || "") + "; expires=" + expires + "; path=/";
}
export function setLocal(key, value) {
    localStorage.setItem(key, value);
}
export function getDataUser() {
    let data = null
    let resUser = localStorage.getItem('_us');
    if (resUser) {
        data = JSON.parse(
            CryptoJS.AES.decrypt(resUser, SECRET_KEY).toString(CryptoJS.enc.Utf8)
        );
    }
    return data;
}
export function getToken() {
    let token: any = null
    if (getCookie("token")) {
        token = getCookie("token");
    }
    return token;
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export const useAuth = () => {
    const [token, setToken] = useState<boolean | null>(false);
    const [user, setUser] = useState<any>({});
    const login = useCallback((token: any, userData: any) => {
        setToken(token);
        setUser(userData);
        const tokenExpirationDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        setCookie("token", token, tokenExpirationDate.toUTCString());
        const cryptoText = CryptoJS.AES.encrypt(
            JSON.stringify(userData),
            SECRET_KEY
        ).toString();
        setCookie("userData", cryptoText, tokenExpirationDate.toUTCString());
        setLocal('_us', cryptoText)

    }, []);
    const logout = useCallback(() => {
        setToken(null);
        eraseCookie("userData");

        eraseCookie("token");
    }, []);
    React.useLayoutEffect(() => {
        const token = getCookie("token");
        const userData = getCookie("userData");
        if (token && userData) {
            const data = JSON.parse(
                CryptoJS.AES.decrypt(userData, SECRET_KEY).toString(CryptoJS.enc.Utf8)
            );
            login(token, data);
        }
    }, []);
    return { token, login, logout, userData: user };
};
