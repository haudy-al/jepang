import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/Home';
import HomeRoute from './pages/HomeRoute';
import ViewMessage from './pages/ViewMessage';
import { useCheckAuth } from './middlewares/authMiddleware';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import ViewSearch from './pages/ViewSearch';
import Leaderboard from './pages/Leaderboard';
import ViewKanji from './pages/ViewKanji';
import GradeKanji from './components/GradeKanji';
import ShowKanji from './components/ShowKanji';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LoginPage} exact />
          <PrivateRoute path="/home" component={HomePage} exact />
          <PrivateRoute path="/search" component={ViewSearch} exact />
          <PrivateRoute path="/leaderboard" component={Leaderboard} exact />
          <PrivateRoute path="/kanji" component={ViewKanji} exact />
          <PrivateRoute path="/kanji/:grade" component={GradeKanji} exact />
          <PrivateRoute path="/kanji/:grade/:kanji" component={ShowKanji} exact />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
