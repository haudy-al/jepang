
import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonFooter, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
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
        localStorage.removeItem('userData');
        GoogleAuth.signOut();
        window.location.href = '/login';
    };

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const isLoggedIn = userData && Object.keys(userData).length > 0;


    // console.log(userData);

    return (

        <>
            <IonMenu side="end" contentId="main-content" type="overlay">
                <IonHeader>
                    <IonToolbar>
                        <IonRow className="avatar-row">
                        {isLoggedIn ? (
                                <>
                                    <IonCol size="auto">
                                        <IonAvatar>
                                            <img src={userData.image} alt="Avatar" className="avatar-image" />
                                        </IonAvatar>
                                    </IonCol>
                                    <IonCol className="user-info">
                                        <IonLabel className="user-name">Nama : {userData.name}</IonLabel>
                                        <IonLabel className="user-poin">Poin : <b>10</b></IonLabel>
                                    </IonCol>
                                </>
                            ) : (
                                <IonCol size="auto">
                                    <a className='login-btn-sidebar' href='/login'>
                                        Login
                                    </a>
                                </IonCol>
                            )}
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" fullscreen={true}>
                    <IonList lines="none">
                        <IonItem button className="menu-item">
                            <IonIcon slot="start" icon={homeOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">Home</IonLabel>
                        </IonItem>
                        <IonItem button className="menu-item">
                            <IonIcon slot="start" icon={settingsOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">Settings</IonLabel>
                        </IonItem>
                        <IonItem button className="menu-item">
                            <IonIcon slot="start" icon={informationCircleOutline} className="menu-icon"></IonIcon>
                            <IonLabel className="menu-label">About</IonLabel>
                        </IonItem>
                        {isLoggedIn && (
                            <IonItem button onClick={handleLogout} className="menu-item">
                                <IonIcon slot="start" icon={leafOutline} className="menu-icon"></IonIcon>
                                <IonLabel className="menu-label">Logout</IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                </IonContent>
            </IonMenu>


        </>
    );
};

export default Sidebar;
