import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
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

import gambar1 from '../assets/images/n1.jpg';
import gambar2 from '../assets/images/n2.jpg';
import gambar3 from '../assets/images/n3.jpg';
import gambar4 from '../assets/images/n4.jpg';

const SwiperNews: React.FC = () => {
    return (
        <IonCard className='custom-ion-card-news' style={{ margin: '10px' }}>
            <Swiper
                modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
                autoplay={true}
                keyboard={false}
                pagination={{ clickable: false }}
                scrollbar={false}
                zoom={false}
                spaceBetween={0}
                slidesPerView={2}
                centeredSlides={false}
                loop={true}
            >
                <SwiperSlide className="custom-swiper-news">
                    <IonCard className='custom-card-swiper'>
                        <img alt="Gambar 1" src={gambar1} className="custom-image-news" />
                        <IonCardHeader>
                            <IonCardTitle className='custom-card-title-swiper'>Card Title</IonCardTitle>
                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                    </IonCard>
                </SwiperSlide>

                <SwiperSlide className="custom-swiper-news">
                    <IonCard className='custom-card-swiper'>
                        <img alt="Gambar 1" src={gambar2}className="custom-image-news" />
                        <IonCardHeader>
                            <IonCardTitle className='custom-card-title-swiper'>Card Title</IonCardTitle>
                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                    </IonCard>
                </SwiperSlide>

                <SwiperSlide className="custom-swiper-news">
                    <IonCard className='custom-card-swiper'>
                        <img alt="Gambar 1" src={gambar3} className="custom-image-news" />
                        <IonCardHeader>
                            <IonCardTitle className='custom-card-title-swiper'>Card Title</IonCardTitle>
                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                    </IonCard>
                </SwiperSlide>

                

                {/* <SwiperSlide className="custom-swiper-news">
                    <a className="custom-button-news" href="">
                        <img className="custom-image-news" src={gambar2} alt="Gambar 2"/>
                        <div className='custom-card-content'>
                            <div className='custom-card-lable'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. In sunt aperiam eos voluptate doloribus blanditiis, accusamus, excepturi maiores labore laboriosam neque molestiae quos. Expedita beatae quia earum exercitationem, corporis sit!
                            </div>
                        </div>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="custom-swiper-news">
                    <a className="custom-button-news" href="">
                        <img className="custom-image-news" src={gambar3} alt="Gambar 3"/>
                        <div className='custom-card-content'>
                            <div className='custom-card-title'>
                                test judul 1
                            </div>
                            <div className='custom-card-lable'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. In sunt aperiam eos voluptate doloribus blanditiis, accusamus, excepturi maiores labore laboriosam neque molestiae quos. Expedita beatae quia earum exercitationem, corporis sit!
                            </div>
                        </div>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="custom-swiper-news">
                    <a className="custom-button-news" href="">
                        <img className="custom-image-news" src={gambar4} alt="Gambar 4"/>
                        <div className='custom-card-content'>
                            <div className='custom-card-lable'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. In sunt aperiam eos voluptate doloribus blanditiis, accusamus, excepturi maiores labore laboriosam neque molestiae quos. Expedita beatae quia earum exercitationem, corporis sit!
                            </div>
                        </div>
                    </a>
                </SwiperSlide> */}
            </Swiper>
        </IonCard>
    );
};

export default SwiperNews;
