import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLoading, IonFab, IonFabButton, IonFabList, IonThumbnail, IonSearchbar, IonNote } from '@ionic/react';
import { Redirect, Route, useHistory, useParams } from 'react-router-dom';
import '../pages/HomePage.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { add, addCircle, caretDownOutline, chevronUpCircle, colorPalette, document, globe, repeatOutline } from 'ionicons/icons';
import axios from 'axios';

const ViewForum: React.FC = () => {
    const history = useHistory();



    useEffect(() => {


    }, []);

    return (
        <>
            <Sidebar></Sidebar>
            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={`/`}></IonBackButton>
                        </IonButtons>
                        <IonTitle>Forum Diskusi</IonTitle>
                    </IonToolbar>
                    <IonToolbar>
                        <IonSearchbar></IonSearchbar>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonCard>
                        <IonItem lines="none" onClick={() => history.push('/forum/1')}>
                            <IonLabel><b>Haudy al-Kautsar</b>---<IonNote>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis voluptate temporibus voluptatem error rerum amet. Quae recusandae iure exercitationem ratione a, corrupti alias architecto vel dolorem quod tempore assumenda.</IonNote></IonLabel>
                            <span slot='end'><IonIcon icon={repeatOutline}></IonIcon> 2</span>
                        </IonItem>
                        <IonItem lines="none" onClick={() => history.push('/forum/1')}>
                            <IonLabel><b>Dandi sugandi</b>---<IonNote>facilis voluptate temporibus voluptatem error rerum amet. Quae recusandae iure exercitationem ratione a, corrupti alias architecto vel dolorem quod tempore assumenda.</IonNote></IonLabel>
                            <span slot='end'><IonIcon icon={repeatOutline}></IonIcon> 2</span>
                        </IonItem>
                    </IonCard>
                    <IonFab slot="fixed" vertical="bottom" horizontal="end">
                        <IonFabButton className='custom-fab-button'>
                            <IonIcon icon={chevronUpCircle}></IonIcon>
                        </IonFabButton>
                        <IonFabList side="top">
                            <IonFabButton>
                                <IonIcon icon={document}></IonIcon>
                            </IonFabButton>

                            <IonFabButton>
                                <IonIcon icon={addCircle}></IonIcon>
                            </IonFabButton>
                        </IonFabList>
                    </IonFab>
                </IonContent>
                <Footer></Footer>
            </IonPage>
        </>
    );
};

export default ViewForum;
