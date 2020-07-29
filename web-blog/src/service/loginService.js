export function login() {
    return fetch('${process.env.REACT_APP_API_BASE_URL}common/listCategory')
        .then(response =>
            response.json()
        );
}