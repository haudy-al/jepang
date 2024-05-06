
import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonFooter, IonList, IonItem, IonLabel } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { exitOutline, home, homeOutline, informationCircleOutline, leafOutline, search, settingsOutline } from 'ionicons/icons';

import logo_mahkota from '../assets/images/mahkota.png';
import "../pages/HomePage.scss";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";




const Sidebar: React.FC = () => {
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        GoogleAuth.signOut();
        window.location.href = '/login';
    };

    return (

        <>
            <IonMenu side="end" contentId="main-content" type="overlay">
                <IonHeader>
                    <IonToolbar >
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" fullscreen={true}>
                    <IonList lines="none">
                        <IonItem button  className="menu-item">
                            <IonIcon slot="start" icon={homeOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">Home</IonLabel>
                        </IonItem>
                        <IonItem button  className="menu-item">
                            <IonIcon slot="start" icon={settingsOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">Settings</IonLabel>
                        </IonItem>
                        <IonItem button  className="menu-item">
                            <IonIcon slot="start" icon={informationCircleOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">About</IonLabel>
                        </IonItem>
                        <IonItem button onClick={handleLogout}  className="menu-item">
                            <IonIcon slot="start" icon={leafOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">Logout</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>


        </>
    );
};

export default Sidebar;
