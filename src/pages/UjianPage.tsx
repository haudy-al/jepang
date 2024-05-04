import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonAlert, IonToast } from '@ionic/react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; 
import { useHistory } from 'react-router-dom';

import './HomePage.scss';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { user } from '../data/user';
import axios from 'axios';


const UjianPage: React.FC = () => {
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');


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
            setDisplayItems(prevDisplayItems => {
                const updatedItems = [...prevDisplayItems, ...newItems];
                if (updatedItems.length >= items.length) {
                    setIsInfiniteDisabled(true);
                }
                return updatedItems;
            });

        }, 500);
    };

    const UjianToken = async (ujian_id: number, user_id: number) => {
   
        try {
            const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${ujian_id}/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key':'dewa'
                },
            });
    
            return response.data;
            
        } catch (error) {
            console.log(error);
            setToastMessage('Error...');
            setShowToast(true);
            return null;
        }
    };

    const goToUjian = (id: number) => {
        setSelectedId(id);
        setShowAlert(true); 
    };

    function encodeDateToURL(date: Date): string {
        // Mengubah waktu lokal ke UTC+7 (Jakarta)
        const jakartaDate = toZonedTime(date, 'Asia/Jakarta');
        // Format the date to string and then encode
        return encodeURIComponent(format(jakartaDate, 'yyyy-MM-dd HH:mm:ss'));
    }
    
    function decodeDateFromURL(dateStr: string) {
        // Decode tanggal dari URL
        var decodedDate = decodeURIComponent(dateStr);
        // Ubah kembali menjadi objek tanggal
        return new Date(decodedDate);
    }

    const confirmGoToUjian = async () => {
        const tokenResponse = await UjianToken(selectedId!, userData.id);
        const token = tokenResponse.token;
        const expired = encodeDateToURL(new Date(tokenResponse.expired));
        if (selectedId !== null) {
        
            history.push(`/ujian/${selectedId}/${token}/${expired}`);

            // console.log(decodeDateFromURL(encodeDateToURL(new Date(tokenResponse.expired))));
            
        }
        setShowAlert(false);
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
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={2000}
                    ></IonToast>
                </IonContent>
                <Footer />
            </IonPage>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                // header={'Konfirmasi'}
                message={'Apakah anda yakin ingin memulai ujian?'}
                buttons={[
                    {
                        text: 'Batal',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: blah => {
                            setShowAlert(false);
                        }
                    },
                    {
                        text: 'Ya',
                        handler: () => {
                            confirmGoToUjian();
                        }
                    }
                ]}
            />
        </>
    );
};

export default UjianPage;