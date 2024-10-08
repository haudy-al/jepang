import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton, IonAvatar, IonText, IonGrid, IonRow, IonCol, IonButton, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonNote } from '@ionic/react';
import { chevronBack, thumbsUpOutline } from 'ionicons/icons';

const ForumDetailPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className='custom-header'>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/forum/`} />
                    </IonButtons>
                    <IonTitle>Judul Forum</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="forum-card">
                    <IonCardHeader>
                        <IonItemSliding>
                            <IonItem button={true}>
                                <IonAvatar aria-hidden="true" slot="start">
                                    <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                                <IonLabel>Wall-E</IonLabel>
                            </IonItem>

                        </IonItemSliding>
                        <IonCardTitle>judul forum</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>

                                <IonCol size="9">
                                    <p className="ion-text-wrap">Konten forum disini...</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
                <IonCard className="comment-card">
                    <IonCardContent>


                        <IonItem >
                            <IonLabel><b>Jajang</b>---<IonNote>od tempore assumenda.</IonNote><p><IonIcon icon={thumbsUpOutline} slot="start" /></p></IonLabel>

                        </IonItem>
                        <IonItem >
                            <IonLabel><b>Dandi sugandi</b>---<IonNote>facilis voluptate temporibus voluptatem error rerum amet. Quae recusandae iure exercitationem ratione a, corrupti alias architecto vel dolorem quod tempore assumenda.</IonNote><p><IonIcon icon={thumbsUpOutline} slot="start" /></p></IonLabel>

                        </IonItem>
                    </IonCardContent>
                </IonCard>
            </IonContent>

            <style>
                {`
                .forum-card, .comment-card {
                    --background: white;
                    --ion-color-primary: #b90404;
                    --ion-color-primary-contrast: #ffffff;
                }
                .ion-text-wrap {
                    white-space: normal !important;
                }
                .ion-text-center {
                    text-align: center !important;
                }
                `}
            </style>
        </IonPage>
    );
};

export default ForumDetailPage;
