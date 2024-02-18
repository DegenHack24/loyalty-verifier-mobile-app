import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';


import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { alertController } from '@ionic/core';
import { decodeQRCode } from '../helpers/decodeQRCode';
import { getCoupon, getDiscount } from '../services/loyaltyService';
import { useEffect, useState } from 'react';


interface DiscountCardData {
  couponId: string,
  name: string,
  description: string,
  shares: number,
  discount: number,
  image: string
}

const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'Permission denied',
    message: 'Please grant camera permission to use the barcode scanner.',
    buttons: ['OK'],
  });
  await alert.present();
}

const startScan = async (setDicountCardData: (data: DiscountCardData) => void) => {
  // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
  // However, this means that you have to hide all elements that should not be visible.
  // You can find an example in our demo repository.
  // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
  document.querySelector('body')?.classList.add('barcode-scanner-active');
  // Add the `barcodeScanned` listener
  // const listener = await BarcodeScanner.addListener(
  //   'barcodeScanned',
  //   async result => {
  //     console.log("result.barcode");
  //     console.log("Stop scanning pre")
  //     await stopScan();
  //   },
  // );

  const granted = await requestPermissions();
  if (!granted) {
    presentAlert();
    return;
  }
  console.log("XDXSASXSA");
  const barcodes = await scan();
  await processQRCode(barcodes[0]["displayValue"], setDicountCardData);
  console.log("12321323132123132132132132132213");
};

const stopScan = async () => {
  // Make all elements in the WebView visible again
  document.querySelector('body')?.classList.remove('barcode-scanner-active');
  // // Remove all listeners
  // await BarcodeScanner.removeAllListeners();

  // // Stop the barcode scanner
  // await BarcodeScanner.stopScan();
};

const scan = async () => {
  const { barcodes } = await BarcodeScanner.scan({
    formats: [BarcodeFormat.QrCode],
  });
  await stopScan();
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");

  return barcodes;
};

const processQRCode = async (qrCodeMessage: string, setDicountCardData: (data: DiscountCardData) => void) => {
  const qrData = decodeQRCode(qrCodeMessage);
  const couponData = await getCoupon(qrData["couponId"]);
  const discount = await getDiscount(qrCodeMessage);
  const discountCardData = {
    couponId: couponData.couponId,
    name: couponData.name,
    description: couponData.description,
    shares: discount.shares,
    discount: discount.discount,
    image: couponData.image
  }
  setDicountCardData(discountCardData);
}

const requestPermissions = async () => {
  const { camera } = await BarcodeScanner.requestPermissions();
  return camera;
};

const Tab1: React.FC = () => {
  const [dicountCardData, setDicountCardData] = useState<DiscountCardData | null>(null);
  // useEffect to re-render the component when value changes
  useEffect(() => {
    // Do something when the value changes, e.g., trigger a side effect
    console.log('Value changed:', dicountCardData);
  }, [dicountCardData]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButton onClick={() => startScan(setDicountCardData)} expand="block">Scan</IonButton>
          </IonToolbar>
        </IonHeader>
        {!!dicountCardData ?
          <IonCard>
            <img alt="" src={dicountCardData?.image} />
            <IonCardHeader>
              <IonCardTitle>{dicountCardData?.name}</IonCardTitle>
              <IonCardSubtitle>Discount: {dicountCardData?.discount}</IonCardSubtitle>
              <IonCardSubtitle>Shares: {dicountCardData?.shares}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{dicountCardData?.description}</IonCardContent>
          </IonCard>
          : null}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
