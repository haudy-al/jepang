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
import ViewForum from './components/ViewForum';
import ForumDetailPage from './components/ForumDetailPage';
import UjianPage from './pages/UjianPage';
import ViewUjian from './components/ViewUjian';
import Kotoba from './pages/Kotoba';
import FlashcardKaigo from './pages/FlashcardKaigo';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/flashcard-kaigo" component={FlashcardKaigo} exact />
          <PrivateRoute path="/search" component={ViewSearch} exact />
          <Route path="/kotoba" component={Kotoba} exact />
          <Route path="/leaderboard" component={Leaderboard} exact />
          <Route path="/kanji" component={ViewKanji} exact />
          <Route path="/kanji/:grade" component={GradeKanji} exact />
          <Route path="/kanji/:grade/:kanji" component={ShowKanji} exact />
          <PrivateRoute path="/forum" component={ViewForum} exact />
          <PrivateRoute path="/forum/:id" component={ForumDetailPage} exact />
          <PrivateRoute path="/ujian" component={UjianPage} exact />
          <PrivateRoute path="/ujian/:id/:token/:expiredDate" component={ViewUjian} exact />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
