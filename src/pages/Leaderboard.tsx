// src/pages/HomePage.tsx

import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonList, IonLabel, IonItem } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import './HomePage.scss';
import HomeRout from './HomeRoute';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { caretDownOutline } from 'ionicons/icons';

import mahkota1 from "../assets/images/mahkota-1.svg";
import mahkota2 from "../assets/images/mahkota-2.svg";
import mahkota3 from "../assets/images/mahkota-3.svg";



const Leaderboard: React.FC = () => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);

  const images = {
    1: mahkota1,
    2: mahkota2,
    3: mahkota3,
  };

  const data = [
    { id: 1, name: 'Pokémon Yellow', score: 100 },
    { id: 2, name: 'Mega Man X', score: 150 },
    { id: 3, name: 'The Legend of Zelda', score: 200 },
    { id: 4, name: 'Pac-Man', score: 50 },
    { id: 5, name: 'Super Mario World', score: 300 },
    { id: 6, name: 'Pokémon Yellow', score: 100 },
    { id: 7, name: 'Mega Man X', score: 150 },
    { id: 8, name: 'The Legend of Zelda', score: 200 },
    { id: 9, name: 'Pac-Man', score: 50 },
    { id: 10, name: 'Super Mario World', score: 300 },
  ];


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

          <IonList className="custom-list">
            {data.map((item, index) => (
              <IonItem key={item.id}>
                {index < 3 ? (
                  <img
                    src={index === 0 ? mahkota1 : index === 1 ? mahkota2 : mahkota3}
                    className="custom-icon-leaderboard"
                    alt={`Mahkota ${index + 1}`}
                  />
                ) : (
                  <span className="item-number">{item.id}.</span>
                )}
                <IonLabel className="item-label">{item.name}</IonLabel>
                <span className="item-score">{item.score}</span>
              </IonItem>
            ))}
          </IonList>

        </IonContent>
        <Footer></Footer>

      </IonPage>

    </>
  );
};

export default Leaderboard;
