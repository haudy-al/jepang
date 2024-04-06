// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import {
  IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTabs, IonRouterOutlet, IonTabButton, IonTabBar, IonLabel, IonFooter, IonSegmentButton, IonSegment, IonInfiniteScroll, IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  IonRouterLink,
  IonThumbnail,
} from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import * as s from 'swiper';

// Mengaktifkan modul Autoplay

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';


import logo_kanji from '../assets/images/logo-kanji.png';
import logo_kotoba from '../assets/images/logo-kotoba.png';
import logo_ujian from '../assets/images/logo-ujian.png';
import './HomePage.scss';
import { home, repeatOutline, search } from 'ionicons/icons';
import logo_mahkota from '../assets/images/mahkota.png';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import SwiperNews from '../components/SwiperNews';

const HomePage: React.FC = () => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    history.push('/login');
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 3; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <>

      <Sidebar></Sidebar>

      <IonPage id="main-content" className=''>
        <IonHeader className='custom-header'>
          <IonToolbar>
            <IonTitle>Belajar Bahasa Jepang</IonTitle>
            <button className='button-menu' slot="end">
              <IonMenuButton ></IonMenuButton>
            </button>
          </IonToolbar>
        </IonHeader>
        <IonContent className=" ">
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <SwiperNews></SwiperNews>

          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol className="menu-item" onClick={() => history.push('/kanji')}>
                  <div className="custom-button-menu">
                    <img className="custom-icon-menu" src={logo_kanji} alt="Kanji Icon"></img>
                    <p>Kanji</p>
                  </div>
                </IonCol>
                <IonCol className="menu-item" onClick={() => console.log('Kotoba clicked')}>
                  <a className="custom-button-menu" href="">
                    <img className="custom-icon-menu" src={logo_kotoba}></img>
                    <p>Kotoba</p>
                  </a>
                </IonCol>
                <IonCol className="menu-item" onClick={() => console.log('Ujian clicked')}>
                  <a className="custom-button-menu" href="">
                    <img className="custom-icon-menu" src={logo_ujian}></img>
                    <p>Ujian</p>
                  </a>
                </IonCol>

              </IonRow>
            </IonGrid>
          </IonCard>
          {/* <h4 className='custom-judul-line'>Berita</h4> */}
          {/* <IonCard>
            {items.map((item, index) => (
              <IonCard key={index}>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            ))}
            <IonInfiniteScroll
              onIonInfinite={(ev) => {
                generateItems();
                setTimeout(() => ev.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonCard> */}

          <IonCard>
            <div className='custom-button-container'>
              <button className='custom-button-selengkapnya'>Selengkapnya</button>
            </div>
            <IonList>
              <IonItem>
                <IonThumbnail slot="start">
                  <img className='custom-forum-image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail>
                <IonLabel>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur sint </IonLabel>
                <span slot='end'><IonIcon icon={repeatOutline}></IonIcon> 2</span>
              </IonItem>

              <IonItem>
                <IonThumbnail slot="start">
                  <img className='custom-forum-image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail>
                <IonLabel>Item</IonLabel>
                <span slot='end'><IonIcon icon={repeatOutline}></IonIcon> 1</span>
              </IonItem>
            </IonList>
          </IonCard>




        </IonContent>
        <Footer></Footer>

      </IonPage>
    </>
  );
};

export default HomePage;
