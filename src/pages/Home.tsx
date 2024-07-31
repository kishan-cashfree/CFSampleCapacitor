import React from 'react';
import {
  IonButton,
  IonContent,
  IonPage
} from '@ionic/react';
import './Home.css';
import {CFEnvironment, CFPaymentGateway, CFSession, CFWebCheckoutPayment} from "@awesome-cordova-plugins/cashfree-pg";

const Home: React.FC = () => {
  const initiateWebPayment = () =>  {
    const callbacks = {
      onVerify: function (result:any) {
        console.log("This is in the Application Verify: " + JSON.stringify(result));

      },
      onError: function (error:any){
        console.log("This is in the Application Error: " + JSON.stringify(error));
      }
    };
    CFPaymentGateway.setCallback(callbacks)
    CFPaymentGateway.doWebCheckoutPayment(
        new CFWebCheckoutPayment(
            new CFSession("session_4XVrK_y25_lqUKIcln8TLzBYID1wBpcZqFXH9IywnEtVzPRheOW6D8OfGnCIIdTPmuYa-Rg77aDqE3rGB_XzHRZgtCLlhNDIfzWUsapmks_D",
                "order_70512k0SWYgH11qWZGfiA9RNXiPWPmk",
                CFEnvironment.SANDBOX
            ),
            null)
    )
  }
  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonButton onClick={initiateWebPayment}>
          Initiate Web Payment
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
