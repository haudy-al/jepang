import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLoading, IonFab, IonFabButton, IonFabList, IonThumbnail, IonSearchbar, IonRadioGroup, IonRadio } from '@ionic/react';
import { Redirect, Route, useHistory, useParams } from 'react-router-dom';
import '../pages/HomePage.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { add, addCircle, caretDownOutline, chevronUpCircle, colorPalette, document, globe, repeatOutline, time } from 'ionicons/icons';
import axios from 'axios';
import { user } from '../data/user';

const ViewUjian: React.FC = () => {
    const history = useHistory();
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [countdown, setCountdown] = useState('');
    const tokenUjian = '';

    interface Params {
        id: string;
        token: string;
        expiredDate: string;
    }

    interface UserAnswer {
        soalId: number;
        jawaban: string;
    }

    const { id, token, expiredDate } = useParams<Params>();

    const soal = [
        {
            id: 1,
            type: 'text',
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
            type: 'text',
            pertanyaan: "Siapakah Presiden pertama Indonesia?",
            pilihan: [
                { id: "a", teks: "Soekarno" },
                { id: "b", teks: "Soeharto" },
                { id: "c", teks: "Megawati" },
                { id: "d", teks: "Jokowi" }
            ],
            jawaban: "a"
        },
        {
            id: 3,
            type: 'audio',
            pertanyaan: "dengarkan soal nya ",
            file: "https://api.haudy.my.id/test.mp3",
            pilihan: [
                { id: "a", teks: "test 1" },
                { id: "b", teks: "test2" },
                { id: "c", teks: "test 3" },
                { id: "d", teks: "test 4" }
            ],
            jawaban: "d"
        },
    ];

    const handleSelect = (soalId: number, value: string) => {
        if (countdown !== 'Waktu telah habis') {
            setSelectedAnswers(prev => ({ ...prev, [soalId]: value }));
        } else {
            alert('Waktu telah habis. Pilih jawaban sebelum waktu habis.');
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        const userAnswers: UserAnswer[] = [];
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

    // const CheckUjianToken = async (token: string) => {
    //     try {
    //         const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${token}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-api-key': 'dewa'
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // };

    function decodeDateFromURL(dateStr: string) {
        // Decode tanggal dari URL
        var decodedDate = decodeURIComponent(dateStr);
        // Ubah kembali menjadi objek tanggal
        return new Date(decodedDate);
    }

    // console.log("ini ex " + decodeDateFromURL(expiredDate));


    const calculateCountdown = async () => {
        const expiredTime = decodeDateFromURL(expiredDate);

        // Mendapatkan waktu saat ini dalam zona waktu yang tepat
        const now = new Date();
        const nowInJakartaTimezone = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));

        // Menghitung jarak waktu antara waktu kedaluwarsa dan waktu sekarang
        const distance = expiredTime.getTime() - nowInJakartaTimezone.getTime();
        const countdown = Math.max(0, distance); // Jarak waktu tidak boleh kurang dari 0
        const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        // Mengupdate countdown
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        // Mengembalikan jarak waktu untuk keperluan lain jika diperlukan
        return countdown;
    };



    useEffect(() => {
        const fetchData = async () => {
            const interval = setInterval(async () => {
                const distance = await calculateCountdown();
                if (distance <= 0) {
                    setCountdown('Waktu telah habis');
                    clearInterval(interval);
                }
            }, 1000);
        };

        fetchData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Waktu Ujian : {countdown}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard>
                                {/* <IonCardHeader>
                                    <IonCardSubtitle>Waktu Tersisa</IonCardSubtitle>
                                    <IonCardTitle>{countdown}</IonCardTitle>
                                </IonCardHeader> */}
                                <IonCardContent>
                                    {countdown !== 'Waktu telah habis' ? (
                                        soal.map(s => (
                                            <IonList key={s.id}>
                                                <IonItem>
                                                    <IonLabel>{s.pertanyaan}</IonLabel>

                                                </IonItem>
                                                {s.type === 'audio' && (
                                                    <IonItem>
                                                        <audio controls controlsList="nodownload noplaybackrate">
                                                            <source src={s.file} type="audio/mpeg" />
                                                            not support the audio element.
                                                        </audio>
                                                    </IonItem>
                                                )}
                                                <IonRadioGroup value={selectedAnswers[s.id]} onIonChange={e => handleSelect(s.id, e.detail.value)}>
                                                    {s.pilihan.map(pilihan => (
                                                        <IonItem key={pilihan.id}>
                                                            <IonRadio slot="start" value={pilihan.id} aria-label={pilihan.teks}></IonRadio>
                                                            <IonLabel>{pilihan.teks}</IonLabel>
                                                        </IonItem>
                                                    ))}
                                                </IonRadioGroup>
                                            </IonList>
                                        ))
                                    ) : (
                                        <IonItem>
                                            <IonLabel>Waktu telah habis. Anda tidak dapat menjawab soal lagi.</IonLabel>
                                        </IonItem>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            {countdown !== 'Waktu telah habis' && (
                                <IonButton color="dark" expand="block" onClick={handleSubmit}>Selesai</IonButton>
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ViewUjian;