import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonCard, IonCardContent, IonLoading, IonRadioGroup, IonRadio, IonToast, IonModal, IonCardTitle, IonCardHeader } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../pages/HomePage.scss';

const ViewUjian: React.FC = () => {
    const history = useHistory();
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [countdown, setCountdown] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [quizDone, setquizDone] = useState<boolean>(false);
    const [tokenVerified, setTokenVerified] = useState<boolean>(false);

    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [score, setScore] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    interface Params {
        id: string;
        token: string;
        expiredDate: string;
    }

    interface Soal {
        id: number;
        ujian_id: number;
        type: string;
        question: string;
        choices: { id: string; teks: string }[];
        correct_answer: string;
        audio_url: string;
        image_url: string;
        created_at: any;
        updated_at: any;
    }

    const { id, token, expiredDate } = useParams<Params>();

    const [soal, setSoal] = useState<Soal[]>([]);

    const [userId, setUserId] = useState<number | null>(null);


    const handleSelect = (soalId: number, value: string) => {
        if (countdown !== 'Waktu telah habis') {
            setSelectedAnswers(prev => ({ ...prev, [soalId]: value }));
        } else {
            alert('Waktu telah habis. Pilih jawaban sebelum waktu habis.');
        }
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;
        const userAnswers: any[] = [];

        soal.forEach(s => {
            let userAnswer = selectedAnswers[s.id];
            if (!userAnswer) {
                userAnswer = "";
            }

            if (userAnswer === s.correct_answer) {
                correctAnswers++;
            }

            userAnswers.push({ soalId: s.id, jawaban: userAnswer });
        });

        const ujian_id = id;

        const result = {
            user_id: userId,
            ujian_id: ujian_id,
            hasil_ujian: userAnswers
        };

        // Tidak perlu membungkus dalam 'resultJSON'
        try {
            const response = await axios.post('https://api.haudy.my.id/api/ujian/submit', result,  
                {
                    headers: {
                        'x-api-key': 'dewa',
                        'Content-Type': 'application/json'
                    }
                });



            if (response.data.message == 'Pengecekan selesai.') {
                // console.log("Response dari API: ", response.data);
                setScore(response.data.total_points);
                setShowModal(true);
                setquizDone(true);

            } else if (response.data.message == 'Hasil ujian sudah ada untuk user ini.') {
                setquizDone(true);
            }



        } catch (e: any) {
            // console.error(e.response?.data || e.message);
            setToastMessage('Gagal Mengirim Data');
            setShowToast(true);
        }
    };


    const fetchSoal = async () => {
        try {
            const response = await axios.get(`https://api.haudy.my.id/api/ujian/soal/${id}`, {
                headers: {
                    'x-api-key': 'dewa'
                }
            });
            setIsLoading(false);
            setSoal(response.data);
        } catch (error) {
            // console.log(error);
            setIsLoading(false);
        }


    };

    const CheckUjianToken = async (token: string) => {
        try {
            const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${token}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'dewa'
                },
            });

            // Jika token valid (data tidak kosong), lanjutkan dengan ujian
            if (Object.keys(response.data).length === 0) {
                history.push('/home');
                return null;
            } else {
                setUserId(response.data.user_id);
                return response.data;
            }
        } catch (error) {
            console.log(error);
            // Jika terjadi kesalahan, arahkan kembali ke halaman beranda
            history.push('/home');
            return null;
        }
    };



    useEffect(() => {

        const fetchData = async () => {
            if (!tokenVerified) {
                const dataToken = await CheckUjianToken(token);
                if (!dataToken) {
                    history.push('/home')
                    return;
                }

                setTokenVerified(true);
            }

        };

        fetchData();

        const interval = setInterval(async () => {
            const expiredTime = new Date(decodeURIComponent(expiredDate));
            const now = new Date();
            const distance = expiredTime.getTime() - now.getTime();
            const countdown = Math.max(0, distance);
            const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
            setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            if (distance <= 0) {
                setCountdown('Waktu telah habis');
                clearInterval(interval);
            }
        }, 1000);

        fetchSoal(); // Fetch questions when component mounts

        return () => clearInterval(interval); // Cleanup interval
    }, [expiredDate, id, token, tokenVerified]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    {!quizDone && (
                        <IonTitle>Waktu Ujian : {countdown}</IonTitle>
                    )}

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard>

                                <>
                                    {isLoading ? (
                                        <IonLoading
                                            isOpen={isLoading}
                                            message={'Fetching data...'}
                                            duration={1000}
                                        />
                                    ) : (
                                        quizDone ? (
                                            <IonItem>
                                                <IonLabel>Ujian Telah Diselesaikan</IonLabel>
                                            </IonItem>
                                        ) : (
                                            countdown !== 'Waktu telah habis' ? (
                                                soal.map(s => (
                                                    <IonList key={s.id} className='custom-list'>
                                                        {s.image_url && (
                                                            <IonItem className='border-0'>
                                                                <img src={`https://api.haudy.my.id/storage/${s.image_url}`} alt="Question related" style={{ maxWidth: '100%' }} />
                                                            </IonItem>
                                                        )}
                                                        {s.audio_url && (
                                                            <IonItem>
                                                                <audio controls>
                                                                    <source src={`https://api.haudy.my.id/storage/${s.audio_url}`} type="audio/mpeg" />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            </IonItem>
                                                        )}
                                                        <IonItem className='border-0'>
                                                            <IonLabel className='border-0'>{s.question}</IonLabel>
                                                        </IonItem>

                                                        <IonRadioGroup value={selectedAnswers[s.id]} onIonChange={e => handleSelect(s.id, e.detail.value)}>
                                                            {s.choices.map((c, index) => (
                                                                <IonItem className='border-0' key={index}>
                                                                    <IonRadio slot="start" value={c} aria-label={String(c)}></IonRadio>
                                                                    <IonLabel className='border-0'>{String(c)}</IonLabel>
                                                                </IonItem>
                                                            ))}
                                                        </IonRadioGroup>
                                                    </IonList>
                                                ))
                                            ) : (
                                                <IonItem>
                                                    <IonLabel>Waktu telah habis. Anda tidak dapat menjawab soal lagi.</IonLabel>
                                                </IonItem>
                                            )
                                        )
                                    )}

                                </>
                            </IonCard>
                        </IonCol>

                        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} backdropDismiss={false} >
                            <IonContent>
                                <IonCard>
                                    <IonCardContent>
                                        <IonCardTitle>Hasil Ujian Anda</IonCardTitle>

                                        <br />

                                        <p>Skor : {score}</p>
                                        <br />
                                        <button onClick={() => setShowModal(false)}>
                                            Tutup
                                        </button>
                                    </IonCardContent>
                                </IonCard>
                            </IonContent>
                        </IonModal>


                    </IonRow>

                    <IonRow>


                        <IonCol size="12">
                            {countdown !== 'Waktu telah habis' && !quizDone && (
                                <IonButton color="dark" expand="block" onClick={handleSubmit}>Selesai</IonButton>
                            )}
                        </IonCol>

                    </IonRow>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={2000}
                    ></IonToast>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ViewUjian;
