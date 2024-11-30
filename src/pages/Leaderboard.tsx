import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonLoading, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomePage.scss';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import mahkota1 from "../assets/images/mahkota-1.svg";
import mahkota2 from "../assets/images/mahkota-2.svg";
import mahkota3 from "../assets/images/mahkota-3.svg";

const Leaderboard: React.FC = () => {
  const history = useHistory();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const images = {
    1: mahkota1,
    2: mahkota2,
    3: mahkota3,
  };

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      fetchLeaderboard();
      event.detail.complete();
    }, 2000);
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`https://api.haudy.my.id/api/leaderboard`);
      const data = await response.json();
      setLeaderboardData(data.leaderboard); 
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    

    fetchLeaderboard();
  }, []); 

  return (
    <>
      <Sidebar />

      <IonPage id="main-content">
        <IonHeader className='custom-header'>
          <IonToolbar>
            <IonTitle>Belajar Bahasa Jepang</IonTitle>
            <button className='button-menu' slot="end">
              <IonMenuButton />
            </button>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">

          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {isLoading ? (
            <IonLoading
              isOpen={isLoading}
              message={'Memuat data...'}
              duration={5000}
            />
          ) : (
            <IonList className="custom-list">
              {leaderboardData.map((item, index) => (
                <IonItem key={item.user_id}>
                  {index < 3 ? (
                    <img
                      src={index === 0 ? mahkota1 : index === 1 ? mahkota2 : mahkota3}
                      className="custom-icon-leaderboard"
                      alt={`Mahkota ${index + 1}`}
                    />
                  ) : (
                    <span className="item-number">{index + 1}.</span>
                  )}
                  <IonLabel className="item-label">{item.name}</IonLabel>
                  <span className="item-score">{item.points}</span>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>

        <Footer />
      </IonPage>
    </>
  );
};

export default Leaderboard;
