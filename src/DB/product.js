export async function getSingleProduct(ID) {
    const response = await fetch (`./productos.json${ID}`);
    const product = await response.json();
    return product
}

export async function getProd() {
    const response = await fetch("./productos.json");
    const data = await response.json();
    return data;

}