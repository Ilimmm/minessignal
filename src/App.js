import React, { useState } from 'react';
import styled from 'styled-components';
import { GoStarFill } from "react-icons/go";

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* Обрезает видео по краям, сохраняя соотношение сторон */
  z-index: -1; /* Размещаем видео за другими элементами */
`;



// Стили для заголовка
const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
`;

// Стили для контейнера сетки
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 колонок */
  gap: 4px; /* Уменьшенные отступы между элементами */
  max-width: 500px; /* Ширина контейнера сетки */
  margin: 0 auto;
  background-color: #1c1b2b;
  border-radius: 20px;
  padding: 20px;
`;

// Стили для квадратов
const Square = styled.div`
  background-color: #2189A6;
  height: 80px; /* Высота квадратов */
  width: 80px; /* Ширина квадратов */
  border-radius: 12px; /* Скругление углов */
  position: relative; /* Для позиционирования звездочек внутри квадратов */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  opacity: 1;
  transition: opacity 0.5s ease-out; /* Плавное исчезновение квадрата */
`;

// Стили для звездочек
const Star = styled.div`
  color: gold; /* Цвет звездочек */
  font-size: 80px; /* Размер звездочек соответствует размеру квадратов */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Начальное значение opacity */
  animation: fadeIn 0.5s forwards; /* Анимация появления звезды */
`;



function App() {
  const [stars, setStars] = useState([]); // Состояние для звездочек
  const [squaresVisible, setSquaresVisible] = useState(Array(25).fill(true)); // Состояние видимости квадратов
  const [isGenerating, setIsGenerating] = useState(false); // Состояние генерации

  // Функция для сброса состояния (возврат всех квадратов и очистка звезд)
  const resetGrid = () => {
    setSquaresVisible(Array(25).fill(true)); // Возвращаем все квадраты
    setStars([]); // Очищаем звезды
  };

  // Функция для последовательного удаления квадратов и появления звезд
  const generateStars = () => {
    if (isGenerating) return; // Если уже идет процесс генерации, ничего не делать

    setIsGenerating(true); // Начинаем процесс генерации
    resetGrid(); // Сбрасываем все перед началом

    const numStars = Math.floor(Math.random() * 4) + 3; // От 3 до 6 звездочек
    const newStars = [];
    const newSquaresVisible = [...Array(25).fill(true)]; // Начальное состояние квадратов

    for (let i = 0; i < numStars; i++) {
      const index = Math.floor(Math.random() * 25); // Позиция квадратика для звезды
      newStars.push({
        index, // Позиция для звезды
        delay: i * 1000, // Задержка для каждой звездочки
      });

      // Убираем квадрат и показываем звезду по очереди через delay
      setTimeout(() => {
        newSquaresVisible[index] = false; // Убираем квадрат
        setSquaresVisible([...newSquaresVisible]); // Обновляем состояние видимости квадратов

        // Показываем звезду после удаления квадрата
        setTimeout(() => {
          setStars(stars => [...stars, { index }]); // Добавляем звезду
        }, 500); // Задержка после исчезновения квадрата
      }, i * 1000); // Задержка для исчезновения квадрата
    }

    // Завершаем процесс генерации через максимальное время появления звезд
    setTimeout(() => {
      setIsGenerating(false);
    }, numStars * 1000 + 1000); // Время на завершение анимации
  };

  return (
    <div className="App">
    <VideoBackground autoPlay muted loop>
        <source src="/videos/space.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </VideoBackground>
      <Title>HYDRA SIGNALS</Title>
      <GridContainer>
        {[...Array(25).keys()].map((_, index) => {
          const isStar = stars.some(star => star.index === index);
          return (
            squaresVisible[index] ? (
              <Square key={index} />
            ) : isStar ? (
              <Star
                key={index}
                style={{
                  animationDelay: `${stars.find(star => star.index === index).delay}ms`,
                }}
              >
                <GoStarFill />
              </Star>
            ) : (
              <Square key={index} style={{ opacity: 0 }} /> // Пустое место для неиспользуемых квадратов
            )
          );
        })}
      </GridContainer>
      <button
  onClick={generateStars}
  disabled={isGenerating} // Блокируем кнопку, пока идет генерация
  style={{
    width: 'calc(30% - 40px)', // Ширина кнопки с учетом отступов контейнера
    padding: '15px', // Вертикальные отступы для кнопки
    fontSize: '2rem',
    fontWeight: 'bold', // Жирный шрифт
    color: '#fff',
    backgroundColor: isGenerating ? 'rgba(33, 137, 166, 0.5)' : '#2189A6', // Прозрачный цвет кнопки при активности
    border: 'none',
    borderRadius: '12px', // Округленные углы
    cursor: isGenerating ? 'not-allowed' : 'pointer', // Изменяем курсор, когда кнопка заблокирована
    display: 'block',
    margin: '20px auto', // Центрируем кнопку по горизонтали
    boxSizing: 'border-box', // Учитываем отступы в ширину и высоту
    transition: 'background-color 0.3s ease' // Плавное изменение цвета фона
  }}
>
  {isGenerating ? 'GENERATING...' : 'GET SIGNAL'}
</button>
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
