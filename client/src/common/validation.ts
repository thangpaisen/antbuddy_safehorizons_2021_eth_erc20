export const validateEmail = (emailAdress: string): boolean => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}
export const getToken = () => {
    const token = localStorage.getItem('USER');
    return token
}