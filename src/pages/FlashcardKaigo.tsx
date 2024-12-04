import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonToggle, IonIcon } from '@ionic/react';
import Flashcard from '../components/Flashcard'; // Import komponen Flashcard
import data from '../kotobakaigo.json'; // Import data JSON


const FlashcardKaigo: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<Array<{ kanji: string, kana: string, arti: string }> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);

  // Fungsi untuk mengacak flashcard secara langsung
  const getRandomIndex = () => {
    if (flashcards) {
      return Math.floor(Math.random() * flashcards.length);
    }
    return 0;
  };

  // Handle perubahan kategori
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        return prevSelectedCategories.filter((category) => category !== categoryName);
      } else {
        return [...prevSelectedCategories, categoryName];
      }
    });
  };

  // Handle toggle acak kotoba
  const handleShuffleToggle = (event: CustomEvent) => {
    setIsShuffle(event.detail.checked);
  };

  // Handle tombol Start
  const handleStart = () => {
    let selectedFlashcards: Array<{ kanji: string, kana: string, arti: string }> = [];
    selectedCategories.forEach((categoryName) => {
      const category = data.categories.find((category) => category.jenis_kotoba === categoryName);
      if (category) {
        selectedFlashcards = [...selectedFlashcards, ...category.kata];
      }
    });

    setFlashcards(selectedFlashcards);
    setCurrentIndex(0); // Mulai dari indeks pertama
  };

  // Handle tombol "Next"
  const handleNextFlashcard = () => {
    if (flashcards) {
      const nextIndex = isShuffle ? getRandomIndex() : (currentIndex + 1) % flashcards.length;
      setCurrentIndex(nextIndex);
    }
  };

  // Handle ganti kategori
  const handleChangeCategory = () => {
    setSelectedCategories([]);
    setFlashcards(null);
  };

  return (
    <IonPage id="main-content">
      <IonHeader className='custom-header'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Flashcard Kaigo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!flashcards ? (
          <div>
            <h2>Pilih Kategori:</h2>
            <IonGrid>
              <IonRow className="ion-justify-content-start">
                {data.categories.map((category, index) => (
                  <IonCol size="6" key={index}>
                    <IonCheckbox
                      checked={selectedCategories.includes(category.jenis_kotoba)}
                      onIonChange={() => handleCategoryChange(category.jenis_kotoba)}
                    />
                    <IonLabel>{category.jenis_kotoba}</IonLabel>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            {/* Toggle untuk Acak Kotoba */}
            <IonRow className="ion-margin-top">
              <IonCol size="12">
                <IonLabel>Acak Kotoba</IonLabel>
                <IonToggle checked={isShuffle} onIonChange={handleShuffleToggle} />
              </IonCol>
            </IonRow>

            <IonButton expand="full" onClick={handleStart} disabled={selectedCategories.length === 0} color="success">
              Start
            </IonButton>
          </div>
        ) : (
          <div>
            {flashcards && flashcards.length > 0 ? (
              <div>
                <Flashcard
                  kanji={flashcards[currentIndex].kanji}
                  kana={flashcards[currentIndex].kana}
                  arti={flashcards[currentIndex].arti}
                />

                {/* Tombol hanya Next jika mode Acak aktif */}
                <div className="flashcard-buttons">
                  {isShuffle ? (
                    <IonButton color={'medium'} expand="full" onClick={handleNextFlashcard}>
                      Selanjutnya 
                    </IonButton>
                  ) : (
                    <>
                      <IonButton color={'medium'} expand="full" onClick={() => setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length)}>
                        Sebelumnya
                      </IonButton>
                      <IonButton color={'medium'} expand="full" onClick={handleNextFlashcard}>
                        Selanjutnya
                      </IonButton>
                    </>
                  )}
                </div>

                {/* Tombol Ganti Kategori */}
                <div className="change-category-button">
                  <IonButton color={'danger'} expand="full" onClick={handleChangeCategory}>
                    Ganti Kategori
                  </IonButton>
                </div>
              </div>
            ) : (
              <p>No flashcards available</p>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FlashcardKaigo;
