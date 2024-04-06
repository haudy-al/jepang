import React, { useEffect, useState } from 'react';
import { IonLoading, IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import { Redirect, Route, useHistory, useParams } from 'react-router-dom';

import '../pages/HomePage.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { caretDownOutline } from 'ionicons/icons';
import axios from 'axios';

const GradeKanji: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const history = useHistory();
    const [isActive, setIsActive] = useState(false);
    const { grade } = useParams<{ grade: string }>();

    const [kanjiList, setKanjiList] = useState<any[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kanjiapi.dev/v1/kanji/grade-${grade}`);
                setKanjiList(response.data);
                setErrorText(null); // Clear any previous errors
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setErrorText("Data tidak ditemukan");
                } else {
                    console.error("Error fetching data:", error);
                    setErrorText("Terjadi kesalahan");
                }
            } finally {
                setIsLoading(false); // Setelah selesai fetching data, set isLoading menjadi false
            }
        };

       

        fetchData();

    }, [grade]);

    return (
        <>
            <Sidebar></Sidebar>
            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/kanji"></IonBackButton>
                        </IonButtons>
                        <IonTitle>Grade {grade}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            {isLoading ? (
                                <IonLoading
                                    isOpen={isLoading}
                                    message={'Fetching data...'}
                                    duration={3000}
                                />
                            ) : errorText ? (
                                <IonCol className="menu-item">
                                    <div>
                                        {errorText}
                                    </div>
                                </IonCol>
                            ) : kanjiList.length > 0 ? (
                                kanjiList.map((kanji, index) => (
                                    <IonCol key={index} className="menu-item" onClick={() => history.push('/kanji/' + grade + "/" + kanji)}>
                                        <div>
                                            {kanji}
                                        </div>
                                    </IonCol>
                                ))
                            ) : (
                                <IonCol className="menu-item">
                                    <div>
                                        Data Kosong
                                    </div>
                                </IonCol>
                            )}
                        </IonRow>
                    </IonGrid>
                </IonContent>
                <Footer></Footer>
            </IonPage>
        </>
    );
};

export default GradeKanji;
