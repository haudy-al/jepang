import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLoading } from '@ionic/react';
import { Redirect, Route, useHistory, useParams } from 'react-router-dom';
import '../pages/HomePage.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { caretDownOutline } from 'ionicons/icons';
import axios from 'axios';

interface KanjiData {
    grade: number;
    heisig_en: string;
    jlpt: number;
    kanji: string;
    kun_readings: string[];
    meanings: string[];
    name_readings: string[];
    notes: any[];
    on_readings: string[];
    stroke_count: number;
    unicode: string;
}

const ShowKanji: React.FC = () => {
    const history = useHistory();
    const [kanjiData, setKanjiData] = useState<KanjiData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    interface Params {
        grade: string;
        kanji: string;
    }
    const { grade, kanji } = useParams<Params>();

    const fetchData = async () => {
        try {
            const response = await axios.get<KanjiData>(`https://kanjiapi.dev/v1/kanji/${kanji}`);
            setKanjiData(response.data);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, []);

    return (
        <>
            <Sidebar></Sidebar>
            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={`/kanji/${grade}`}></IonBackButton>
                        </IonButtons>
                        <IonTitle>{kanji}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {isLoading ? (
                        <IonLoading
                            isOpen={isLoading}
                            message={'Fetching data...'}
                            duration={3000}
                        />
                    ) : (
                        kanjiData && (
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardSubtitle>Grade: {kanjiData.grade}</IonCardSubtitle>
                                    <IonCardTitle className='Kanji'>{kanjiData.kanji}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p>Heisig English: {kanjiData.heisig_en}</p>
                                    <p>JLPT Level: {kanjiData.jlpt}</p>
                                    <p>Kunyomi: {kanjiData.kun_readings.join(', ')}</p>
                                    <p>Meanings: {kanjiData.meanings.join(', ')}</p>
                                    <p>Onyomi: {kanjiData.on_readings.join(', ')}</p>
                                </IonCardContent>
                            </IonCard>
                        )
                    )}
                </IonContent>
                <Footer></Footer>
            </IonPage>
        </>
    );
};

export default ShowKanji;
