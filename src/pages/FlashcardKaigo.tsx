import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonText } from '@ionic/react';
import Flashcard from '../components/Flashcard'; // Import komponen Flashcard
import data from '../kotobakaigo.json'; // Import data JSON

const FlashcardKaigo: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Untuk menyimpan kategori yang dipilih
  const [flashcards, setFlashcards] = useState<Array<{ kanji: string, kana: string, arti: string }> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle perubahan kategori
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        return prevSelectedCategories.filter((category) => category !== categoryName); // Menghapus kategori
      } else {
        return [...prevSelectedCategories, categoryName]; // Menambahkan kategori
      }
    });
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

    setFlashcards(selectedFlashcards); // Menetapkan flashcards yang digabungkan
    setCurrentIndex(0); // Reset ke flashcard pertama
  };

  // Handle tombol "Next" dengan infinite loop
  const handleNextFlashcard = () => {
    if (flashcards) {
      const nextIndex = (currentIndex + 1) % flashcards.length;
      setCurrentIndex(nextIndex);
    }
  };

  // Handle tombol "Back" dengan infinite loop
  const handleBackFlashcard = () => {
    if (flashcards) {
      const prevIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
      setCurrentIndex(prevIndex);
    }
  };

  // Handle ganti kategori
  const handleChangeCategory = () => {
    setSelectedCategories([]); // Reset kategori yang dipilih
    setFlashcards(null); // Reset flashcards
  };

  return (
    <IonPage id="main-content">
      <IonHeader className='custom-header'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" /> {/* Tombol kembali ke halaman utama */}
          </IonButtons>
          <IonTitle>Flashcard Kaigo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!flashcards ? (
          // Jika flashcards belum ditampilkan, tampilkan pilihan kategori
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
            <IonButton expand="full" onClick={handleStart} disabled={selectedCategories.length === 0} color="success">
              Start
            </IonButton>
          </div>
        ) : (
          <div>
            {/* Menampilkan flashcard berdasarkan indeks */}
            {flashcards && flashcards.length > 0 ? (
              <div>
                <Flashcard
                  kanji={flashcards[currentIndex].kanji}
                  kana={flashcards[currentIndex].kana}
                  arti={flashcards[currentIndex].arti}
                />

                {/* Tombol Back dan Next berjejer */}
                <div className="flashcard-buttons">
                  <IonButton expand="full" onClick={handleBackFlashcard}>
                    Sebelumnya
                  </IonButton>
                  <IonButton expand="full" onClick={handleNextFlashcard}>
                    Selanjutnya
                  </IonButton>
                </div>

                {/* Tombol Ganti Kategori */}
                <div className="change-category-button">
                  <IonButton expand="full" onClick={handleChangeCategory}>
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
