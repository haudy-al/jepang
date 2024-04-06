
import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonFooter } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { home, search } from 'ionicons/icons';

import logo_mahkota from '../assets/images/mahkota.png';
import "./footer.css";



const Footer: React.FC = () => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);


  return (

    <>
      <IonFooter>
        <div className="custom-footer">
          <div onClick={() => history.push('/home')} className="footer-item">
            <img src={home} alt="Beranda" />
            <span>Beranda</span>
          </div>
          <div onClick={() => history.push('/leaderboard')} className="footer-item leaderboard">
            <div className="icon-wrapper">
              <img src={logo_mahkota} alt="Leaderboard" />
            </div>

          </div>

          <div onClick={() => history.push('/search')} className="footer-item">
            <img src={search} alt="Cari" />
            <span>Cari</span>
          </div>
        </div>
      </IonFooter>
    </>
  );
};

export default Footer;
