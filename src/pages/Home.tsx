import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast
} from '@ionic/react';
import './Home.css';
import {CFEnvironment, CFPaymentGateway, CFSession, CFSubscriptionPayment, CFSubscriptionSession, CFWebCheckoutPayment} from "@awesome-cordova-plugins/cashfree-pg";

const Home: React.FC = () => {
  const [presentToast] = useIonToast();
  const showToast = (message: string, color: string = 'primary') => {
    presentToast({
      message,
      duration: 3000,
      position: 'top',
      color
    });
  };
  const initiateWebPayment = () =>  {
    const callbacks = {
      onVerify: function (result:any) {
        console.log("This is in the Application Verify: " + JSON.stringify(result));
        showToast("Payment verified successfully!", "success");
      },
      onError: function (error:any){
        console.log("This is in the Application Error: " + JSON.stringify(error));
        showToast("Payment failed: " + JSON.stringify(error), "danger");
      }
    };
    CFPaymentGateway.setCallback(callbacks)
    CFPaymentGateway.doWebCheckoutPayment(
        new CFWebCheckoutPayment(
            new CFSession("session_A3ZifoLHfpO6GIRvakaY7odzncYVBI3wCeLO0fqKZ0-cshbbSZr0K0SUghHlgiSLOib-XcEfuFhNbGxEwX9DmwYIVJXmpwsJuUC9NltWqyV70W2d1FzwyFD-jD4payment",
                "devstudio_7359654598359059419",
                CFEnvironment.SANDBOX
            ),
            null)
    )
  }

  const initiateSubscriptionPayment = () =>  {
    const callbacks = {
      onVerify: function (result:any) {
        console.log("This is in the Application Verify: " + JSON.stringify(result));
        showToast("Payment verified successfully!", "success");
      },
      onError: function (error:any){
        console.log("This is in the Application Error: " + JSON.stringify(error));
        showToast("Payment failed: " + JSON.stringify(error), "danger");
      }
    };
    CFPaymentGateway.setCallback(callbacks)
    CFPaymentGateway.doSubscriptionPayment(
        new CFSubscriptionPayment(
            new CFSubscriptionSession("sub_session_IWvH0f8DiwkeiXNA_LPcZ6N39SScTJ66fmJe1ViVDO8oO-9vMsSUXo7QwO03DJaw7nT0vtqYErXMBvlx_VDgUEhtmyWJjFIZREZXWQFWfG276454rc2QSDPuUuJpFd4payment",
                "devstudio_subs_7359648847351794361",
                CFEnvironment.SANDBOX
            ))
    )
  }
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cashfree Payment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-padding-top">
          <IonButton onClick={initiateWebPayment}>
            Initiate Web Payment
          </IonButton>
        </div>

         <div className="ion-padding-top">
          <IonButton onClick={initiateSubscriptionPayment}>
            Initiate Subscription Payment
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
