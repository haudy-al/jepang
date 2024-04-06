import React, { useState } from 'react';
import {
    IonContent, IonHeader, IonSearchbar, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, RefresherEventDetail,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './HomePage.scss';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './HomePage.scss';


const ViewSearch: React.FC = () => {
    const history = useHistory();
    const [searchText, setSearchText] = useState('');

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    const handleSearch = (e: any) => {
        const query = e.target.value;
        setSearchText(query);

        // Di sini Anda bisa menambahkan logika pencarian sesuai dengan 'query'
        // Misalnya, mengambil data dari API berdasarkan query
    };

    return (
        <>
            <Sidebar></Sidebar>

            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonTitle>Belajar Bahasa Jepang</IonTitle>
                        <button className='button-menu' slot="end">
                            <IonMenuButton ></IonMenuButton>
                        </button>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>

                    <IonSearchbar
                        animated={true}
                        placeholder="Cari ..."
                        value={searchText}
                        onIonChange={handleSearch}
                    ></IonSearchbar>

                    {/* Di sini Anda bisa menampilkan hasil pencarian atau komponen lain sesuai kebutuhan */}
                </IonContent>
                <Footer></Footer>

            </IonPage>
        </>
    );
};

export default ViewSearch;
