
import React, { useState } from 'react';
import axios from 'axios';

import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonThumbnail } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import './HomePage.scss';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { caretDownOutline } from 'ionicons/icons';




const ViewKanji: React.FC = () => {
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);
    const goToKanjiPage = (grade: number) => {
        history.push(`/kanji/${grade}`);
    };

    return (

        <>

            <Sidebar></Sidebar>

            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonTitle>Belajar 漢字</IonTitle>
                        <button className='button-menu' slot="end">
                            <IonMenuButton ></IonMenuButton>
                        </button>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">

                    <IonList>

                        <div>
                            {(() => {
                                const items = [];

                                for (let grade = 1; grade <= 8; grade++) {
                                    items.push(
                                        <IonItem key={grade} onClick={() => goToKanjiPage(grade)}>
                                            <IonLabel>Grade {grade}</IonLabel>
                                        </IonItem>
                                    );
                                }

                                return items;
                            })()}
                        </div>
                    </IonList>

                </IonContent>
                <Footer></Footer>

            </IonPage>

        </>
    );
};

export default ViewKanji;
