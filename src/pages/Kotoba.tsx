import React, { useState } from 'react';
import {
    IonContent, IonHeader, IonSearchbar, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, RefresherEventDetail,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonList,
    IonModal,
    IonButton,
    IonCardHeader,
    IonIcon,
    IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './HomePage.scss';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './HomePage.scss';

import jisho_logo from '../assets/images/by-jisho.png';
import { backspace, close } from 'ionicons/icons';


const Kotoba: React.FC = () => {
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [detailData, setDetailData] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    interface JapaneseWord {
        word: string;
        reading: string;
    }

    interface Links {
        text: string;
        url: string;
    }

    interface Sense {
        english_definitions: string[];
        links: Links[];
    }

    interface SearchResult {
        slug: string;
        japanese: JapaneseWord[];
        senses: Sense[];
        jlpt: string;
        tags: string[];
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    const handleResultClick = (result: SearchResult) => {
        setDetailData(result);
        setShowModal(true);
    };

    const handleSearch = async (e: any) => {
        const query = e.target.value;
        setSearchText(query);
        if (query.length > 0) {
            setIsLoading(true); 
            try {
                const response = await fetch(`https://api.haudy.my.id/api/jisho?keyword=${encodeURIComponent(query)}`);
                const data = await response.json();
                setSearchResults(data.data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            setIsLoading(false);  
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
            <Sidebar></Sidebar>

            <IonPage id="main-content">
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={`/home`}></IonBackButton>
                        </IonButtons>
                        <IonTitle>Kotoba</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="">
                    <img src={jisho_logo} alt="Jisho" className="jisho-logo" />
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>

                    <IonSearchbar
                        animated={true}
                        placeholder="Cari ..."
                        value={searchText}
                        onIonChange={handleSearch}
                    ></IonSearchbar>



                    {isLoading ? (
                        <center><IonSpinner /></center>
                    ) : (
                        searchText && (searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <IonCard>
                                    <IonCardContent>
                                        <div key={index} onClick={() => handleResultClick(result)}>
                                            <IonList>
                                                <p>{result.slug}</p>
                                                <p>{result.japanese.map(jp => jp.word + ' (' + jp.reading + ')').join(', ')}</p>
                                                <p>{result.senses.map(sense => sense.english_definitions.join(', ')).join('; ')}</p>
                                            </IonList>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            ))
                        ) : (
                            <center>kosong</center>
                        ))
                    )}


                </IonContent>
             

            </IonPage>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <IonCard>
                    <IonCardHeader>
                        <IonButtons onClick={() => setShowModal(false)} >
                            <img src={close} width={20} height={20} />
                        </IonButtons>
                    </IonCardHeader>
                    <IonCardContent>
                        {detailData ? (
                            <div>
                                <h2>{detailData.japanese.map(jp => jp.word + ' (' + jp.reading + ')').join(', ')}</h2>
                                <p dangerouslySetInnerHTML={{
                                    __html: detailData.senses.map(sense =>
                                        `${sense.english_definitions.join(', ')} ` + `<br/><br/>` +
                                        sense.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join(', ')
                                    ).join(' ')
                                }}></p>
                            </div>
                        ) : (
                            <p>Memuat...</p>
                        )}

                    </IonCardContent>
                </IonCard>
            </IonModal>
        </>
    );
};

export default Kotoba;
