import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLoading } from '@ionic/react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../components/ToastCustom';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const UjianPage: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const showToastWithColor = useToast();

    const [items, setItems] = useState<any[]>([]);
    const [displayItems, setDisplayItems] = useState<any[]>([]);
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadData = () => {
        setTimeout(() => {
            const batchSize = 5;
            const startIndex = displayItems.length;
            const endIndex = Math.min(startIndex + batchSize, items.length);
            const newItems = items.slice(startIndex, endIndex);
            const updatedDisplayItems = [...displayItems, ...newItems];
            setDisplayItems(updatedDisplayItems);

            if (updatedDisplayItems.length >= items.length) {
                setIsInfiniteDisabled(true);
            }
        }, 500);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.haudy.my.id/api/ujian', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newItems = response.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                start_time: new Date(item.start_time),
                end_time: new Date(item.end_time),
                imageUrl: "https://via.placeholder.com/150"
            }));
            setItems(newItems);
            let i = newItems.slice(0, 8);
            setDisplayItems(i);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const UjianToken = async (ujian_id: number, user_id: number) => {
        try {
            const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${ujian_id}/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const goToUjian = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmGoToUjian = async () => {
        try {
            const currentTime = toZonedTime(new Date(), 'Asia/Jakarta');

            // Find the selected item to get its end_time
            const selectedItem = items.find(item => item.id === selectedId);
            if (!selectedItem) {
                showToastWithColor("Item tidak ditemukan", "danger");
                setShowModal(false);
                return;
            }

            const endTime = toZonedTime(new Date(selectedItem.end_time), 'Asia/Jakarta');

            if (currentTime > endTime) {
                showToastWithColor("Ujian Telah Berakhir", "danger");
                setShowModal(false);
                return;
            }

            // Only request the token if the exam has not ended
            const tokenResponse = await UjianToken(selectedId!, userData.id);
            const token = tokenResponse.token;

            if (selectedId !== null) {
                history.push(`/ujian/${selectedId}/${token}/${encodeURIComponent(format(endTime, 'yyyy-MM-dd HH:mm:ss'))}`);
            }
            setShowModal(false);
        } catch (error) {
            showToastWithColor("Terjadi Kesalahan di sisi server", "danger");
            setShowModal(false);
        }
    };

    useEffect(() => {
        fetchData();

        const getUserData = async () => {
            const userData = await JSON.parse(`${localStorage.getItem('userData')}`);
            setUserData(userData);
        };

        getUserData();
    }, []);

    return (
        <>
            <Sidebar />
            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons>
                        <IonTitle>Ujian</IonTitle>
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
                        <IonList>
                            {displayItems.map(item => {
                                const currentTime = toZonedTime(new Date(), 'Asia/Jakarta');
                                const endTime = toZonedTime(new Date(item.end_time), 'Asia/Jakarta');
                                const isExamEnded = currentTime > endTime;

                                return (
                                    <IonItem
                                        key={item.id}
                                        onClick={() => !isExamEnded && goToUjian(item.id)}
                                        style={{
                                            opacity: isExamEnded ? 0.5 : 1,
                                            pointerEvents: isExamEnded ? 'none' : 'auto'
                                        }}
                                    >
                                        <IonThumbnail slot="start">
                                            <img src={item.imageUrl} alt={item.title} />
                                        </IonThumbnail>
                                        <IonLabel>
                                            <h2>{item.title}</h2>
                                            {isExamEnded ? (
                                                <p style={{ color: 'red' }}>
                                                    Ditutup
                                                </p>
                                            ) : (
                                                <>
                                                    <p>
                                                        Mulai: {format(item.start_time, 'dd/MM/yyyy HH:mm')}
                                                    </p>
                                                    <p>
                                                        Selesai: {format(item.end_time, 'dd/MM/yyyy HH:mm')}
                                                    </p>
                                                </>
                                            )}
                                        </IonLabel>

                                    </IonItem>
                                );
                            })}
                        </IonList>
                    )}
                    <IonInfiniteScroll
                        onIonInfinite={(ev) => {
                            loadData();
                            setTimeout(() => ev.target.complete(), 500);
                        }}
                        threshold="100px"
                        disabled={isInfiniteDisabled}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more items...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>
            </IonPage>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="danger">Penting!</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <ul>
                                <li>Pastikan Anda menyelesaikan ujian selama waktu yang di tentukan.</li>
                                <li>Jika waktu habis, jawaban Anda tidak akan terkirim.</li>
                            </ul>
                            <h4>Apakah anda yakin ingin memulai ujian?</h4>
                            <IonButton color="success" onClick={() => {
                                confirmGoToUjian();
                                setShowModal(false);
                            }}>Ya</IonButton>
                            <IonButton color="danger" onClick={() => setShowModal(false)}>Batal</IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonModal>
            <Footer />
        </>
    );
};

export default UjianPage;
