// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonIcon, IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

import logo_mahkota from '../assets/images/mahkota.png';
import './HomePage.scss';
import { caretDownOutline, home, library, listCircle, search } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './LoginPage';
import HomePage from './Home';
import Leaderboard from './Leaderboard';
import ViewSearch from './ViewSearch';


const HomeRout: React.FC = () => {
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        history.push('/login');
    };

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (

        <>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/" to="/home" />
                        <Route path="/home" render={() => <HomePage />} exact={true} />
                        <Route path="/leaderboard" render={() => <Leaderboard />} exact={true} />
                        <Route path="/search" render={() => <ViewSearch />} exact={true} />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/home">
                            <IonIcon icon={home} />
                            <IonLabel>Beranda</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="leaderboard" href="/leaderboard" className="large-rounded-tab">
                            <div className="icon-wrapper">
                                <img src={logo_mahkota} className="icon-menu-img" />
                            </div>
                        </IonTabButton>

                        <IonTabButton tab="search" href="/search">
                            <IonIcon icon={search} />
                            <IonLabel>Cari</IonLabel>
                        </IonTabButton>

                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </>
    );
};

export default HomeRout;
