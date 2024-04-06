import React from 'react';
import { IonCard, IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';

import './SwiperCustom.css';

import slide_1 from '../assets/images/slide-1.png';
import slide_2 from '../assets/images/slide-2.png';



const SwiperNews: React.FC = () => {

    return (
        <IonCard style={{margin: 0}}>
            <Swiper
                modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
                autoplay={true}
                keyboard={true}
                pagination={true}
                scrollbar={false}
                zoom={true}
            >
                <SwiperSlide className="custom-swiper-news">
                    <img src={slide_1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide className="custom-swiper-news">
                    <img src={slide_2} alt="Slide 2" />
                </SwiperSlide>
                
            </Swiper>
        </IonCard>
    );
};
export default SwiperNews;