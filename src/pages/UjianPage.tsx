

import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useHistory } from 'react-router-dom';
import { user } from '../data/user';
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

    const [items, setItems] = useState([
        { id: 1, title: "Judul Item 1", date: new Date("2023-01-01T14:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 2, title: "Judul Item 2", date: new Date("2023-01-02T15:30:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 3, title: "Judul Item 3", date: new Date("2023-01-03T16:45:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 4, title: "Judul Item 4", date: new Date("2023-01-04T17:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 5, title: "Judul Item 5", date: new Date("2023-01-05T18:30:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 6, title: "Judul Item 6", date: new Date("2023-01-06T19:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 7, title: "Judul Item 7", date: new Date("2023-01-07T20:15:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 8, title: "Judul Item 8", date: new Date("2023-01-08T21:45:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 9, title: "Judul Item 9", date: new Date("2023-01-09T22:30:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 11, title: "Judul Item 10", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 12, title: "Judul Item 11", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 13, title: "Judul Item 12", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 14, title: "Judul Item 13", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 15, title: "Judul Item 14", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 16, title: "Judul Item 15", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 17, title: "Judul Item 16", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 18, title: "Judul Item 17", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 19, title: "Judul Item 18", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 20, title: "Judul Item 19", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" },
        { id: 21, title: "Judul Item 20", date: new Date("2023-01-10T23:00:00"), imageUrl: "https://via.placeholder.com/150" }
    ]);
    const [displayItems, setDisplayItems] = useState(items.slice(0, 8));
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

    const loadData = () => {
        setTimeout(() => {
            const newItems = items.slice(displayItems.length, displayItems.length + 8);
            setDisplayItems(prevDisplayItems => [...prevDisplayItems, ...newItems]);
            if (displayItems.length >= items.length) {
                setIsInfiniteDisabled(true);
            }
        }, 500);
    };

    const UjianToken = async (ujian_id: number, user_id: number) => {
        try {
            const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${ujian_id}/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'dewa'
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
            const tokenResponse = await UjianToken(selectedId!, userData.id);
            const token = tokenResponse.token;
            const expired = toZonedTime(new Date(tokenResponse.expired), 'Asia/Jakarta');
            if (selectedId !== null) {
                history.push(`/ujian/${selectedId}/${token}/${encodeURIComponent(format(expired, 'yyyy-MM-dd HH:mm:ss'))}`);
            }
            setShowModal(false);
        } catch (error) {
            showToastWithColor("Terjadi Kesalahan di sisi server", "danger");
            setShowModal(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = await user();
            setUserData(userData);
        };
        fetchData();
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
                    <IonList>
                        {displayItems.map(item => (
                            <IonItem key={item.id} onClick={() => goToUjian(item.id)}>
                                <IonThumbnail slot="start">
                                    <img src={item.imageUrl} alt={item.title} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h2>{item.title}</h2>
                                    <p>Tanggal Upload: {format(item.date, 'dd-MM-yyyy HH:mm')}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
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
                <Footer />
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonContent>
                        {/* <div>
                            <p>Apakah anda yakin ingin memulai ujian?</p>
                            <ul>
                                <li>Pastikan Anda menyelesaikan ujian selama waktu yang masih ada.</li>
                                <li>Jika waktu habis, jawaban Anda tidak akan terkirim.</li>
                            </ul>
                            <IonButton onClick={() => {
                                confirmGoToUjian();
                                setShowModal(false);
                            }}>Ya</IonButton>
                            <IonButton onClick={() => setShowModal(false)}>Batal</IonButton>
                        </div> */}
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
            </IonPage>
        </>
    );
};

export default UjianPage;
