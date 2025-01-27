export async function getSingleProduct(id) {
    const response = await fetch (`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product
}

export async function getProd() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;

}