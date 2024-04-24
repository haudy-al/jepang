import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLoading, IonFab, IonFabButton, IonFabList, IonThumbnail, IonSearchbar, IonRadioGroup, IonRadio } from '@ionic/react';
import { Redirect, Route, useHistory, useParams } from 'react-router-dom';
import '../pages/HomePage.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { add, addCircle, caretDownOutline, chevronUpCircle, colorPalette, document, globe, repeatOutline } from 'ionicons/icons';
import axios from 'axios';

const ViewUjian: React.FC = () => {
    const history = useHistory();
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

    interface Params {
        id: string;
    }

    interface UserAnswer {
        soalId: number;
        jawaban: string;
    }
    const { id } = useParams<Params>();

    const soal = [
        {
            id: 1,
            pertanyaan: "Apa ibu kota Indonesia?",
            pilihan: [
                { id: "a", teks: "Jakarta" },
                { id: "b", teks: "Bandung" },
                { id: "c", teks: "Surabaya" },
                { id: "d", teks: "Bali" }
            ],
            jawaban: "a"
        },

        {
            id: 2,
            pertanyaan: "Siapakah Presiden pertama Indonesia?",
            pilihan: [
                { id: "a", teks: "Soekarno" },
                { id: "b", teks: "Soeharto" },
                { id: "c", teks: "Megawati" },
                { id: "d", teks: "Jokowi" }
            ],
            jawaban: "a"
        },
        // Tambahkan soal lainnya di sini
    ];

    const handleSelect = (soalId: number, value: string) => {
        setSelectedAnswers(prev => ({ ...prev, [soalId]: value }));
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        const userAnswers: UserAnswer[] = []; // Use the interface here
        soal.forEach(s => {
            const userAnswer = selectedAnswers[s.id];
            if (userAnswer === s.jawaban) {
                correctAnswers++;
            }
            userAnswers.push({ soalId: s.id, jawaban: userAnswer });
        });
        console.log("Jawaban Pengguna:", userAnswers);
        alert(`Anda menjawab ${correctAnswers} dari ${soal.length} soal dengan benar.`);
    };

    useEffect(() => {


    }, []);

    return (
        <>
            <Sidebar></Sidebar>
            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={`/ujian`}></IonBackButton>
                        </IonButtons>
                        <IonTitle></IonTitle>
                        <IonButton onClick={handleSubmit} color='success' slot="end">
                            Selesai
                        </IonButton>
                    </IonToolbar>

                </IonHeader>
                <IonContent>
                    {soal.map((s) => (
                        <div key={s.id}>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>#{s.id}</IonCardTitle>
                                    <IonCardSubtitle>{s.pertanyaan}</IonCardSubtitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonRadioGroup value={selectedAnswers[s.id]} onIonChange={e => handleSelect(s.id, e.detail.value)}>
                                        {s.pilihan.map((pil) => (
                                            <IonItem key={pil.id}>
                                                <IonLabel>{pil.teks}</IonLabel>
                                                <IonRadio slot="start" value={pil.id} />
                                            </IonItem>
                                        ))}
                                    </IonRadioGroup>
                                </IonCardContent>
                            </IonCard>
                        </div>


                    ))}



                </IonContent>
                <Footer></Footer>
            </IonPage>
        </>
    );
};

export default ViewUjian;
