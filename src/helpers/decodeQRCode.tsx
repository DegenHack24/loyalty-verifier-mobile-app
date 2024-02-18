const decodeQRCode = (qrCodeMessage: string) => {


    // Parse JSON from the decoded string
    try {
        // Decode Base64 string
        const decodedString = atob(qrCodeMessage);
        const jsonObject = JSON.parse(decodedString);
        return jsonObject;
    } catch (e) {
        console.log(e);
    }

}

export {
    decodeQRCode
}