const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos/1';

interface Coupon {
    couponId: string,
    name: string,
    description: string,
    image: string
}

interface Discount {
    shares: number,
    discount: number,
}


const getCoupon = async (couponId: string) : Promise<Coupon> => {
    try {
        // const response = await fetch(apiEndpoint);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const data = await response.json();
        // return data;
        return new Promise((resolve) => {
            resolve({
                couponId: "213213",
                name: "Koszulka adidas domowa",
                image: "https://sklep.legia.com/wp-content/uploads/2023/01/1K2022_Sklep_1-min.png",
                description: "Znika dla udziałowców"
            })
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle the error accordingly in your application
    }
}

const getDiscount = async (qrCodeMessage: string): Promise<Discount> => {
    try {
        // const response = await fetch(apiEndpoint);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const data = await response.json();
        // return data;
        return new Promise((resolve) => {
            resolve({
                shares: 40,
                discount: 20
            })
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle the error accordingly in your application
    }
}

export {
    getCoupon,
    getDiscount,
}

export type {
    Coupon,
    Discount
}