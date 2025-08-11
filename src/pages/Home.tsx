import React, { version } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Home.css";
import { CFPaymentGateway } from "capacitor-plugin-cashfree-pg";
import {
  CFEnvironment,
  CFSession,
  CFSubscriptionCheckoutPayment,
  CFSubscriptionSession,
  CFWebCheckoutPayment,
} from "cashfree-pg-api-contract";

const Home: React.FC = () => {
  const [presentToast] = useIonToast();
  const showToast = (message: string, color: string = "primary") => {
    presentToast({
      message,
      duration: 3000,
      position: "top",
      color,
    });
  };
  const initiateWebPayment = async () => {
    let session = new CFSession(
      "session_A3ZifoLHfpO6GIRvakaY7odzncYVBI3wCeLO0fqKZ0-cshbbSZr0K0SUghHlgiSLOib-XcEfuFhNbGxEwX9DmwYIVJXmpwsJuUC9NltWqyV70W2d1FzwyFD-jD4payment",
      "devstudio_7359654598359059419",
      CFEnvironment.SANDBOX
    );
    let payment = new CFWebCheckoutPayment(session, null);
    try {
      let result = await CFPaymentGateway.doWebCheckoutPayment(payment);
      if (result.error) {
        console.log(
          "This is in the Application Error: " + JSON.stringify(result.error)
        );
        showToast("Payment failed: " + JSON.stringify(result.error), "danger");
      } else {
        console.log(
          "This is in the Application Verify: " + JSON.stringify(result)
        );
        showToast("Payment verified successfully!", "success");
      }
    } catch (error) {
      console.error(
        "This is in the Application Error: " + error
      );
      showToast("Payment failed: " + error, "danger");
    }
  };

  const initiateSubscriptionPayment = async () => {
    let subscriptionSession = new CFSubscriptionSession(
      "sub_session_E2ZZvtNv2U7PobKhRxonbDDxM1OsFbHN-SCuVqVdBHEB7RQq9VoWbRssF0upE9L75BdH_eNYvz_hKegtGL95W-z7Wv9mQ0oev7SU-2xQITKdbgwhGaBQ1EgipWvWRkEpayment",
      "devstudio_subs_7360624140226997342",
      CFEnvironment.PRODUCTION
    );
    let subscriptionPayment = new CFSubscriptionCheckoutPayment(
      subscriptionSession,
      null
    );
    let result = await CFPaymentGateway.doSubscriptionPayment(
      subscriptionPayment
    );
    if (result.error) {
      console.log(
        "This is in the Application Error: " + JSON.stringify(result.error)
      );
      showToast("Payment failed: " + JSON.stringify(result.error), "danger");
    } else {
      console.log(
        "This is in the Application Verify: " + JSON.stringify(result)
      );
      showToast("Payment verified successfully!", "success");
    }
  };
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
