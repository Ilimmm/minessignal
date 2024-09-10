import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

// Импорт фотографий
import mines1 from './images/mines1.jpg';
import mines2 from './images/mines2.jpg';

// Стили для заголовка
const Title = styled(animated.h1)`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
`;

// Стили для изображения
const Image = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto;
`;

// Стили для кнопки
const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [image, setImage] = useState(mines1);

  // Анимация заголовка
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  // Обработчик нажатия кнопки
  const handleButtonClick = () => {
    setImage(image === mines1 ? mines2 : mines1);
  };

  return (
    <div className="App">
      <Title style={titleAnimation}>HYDRA SIGNALS</Title>
      <Image src={image} alt="Hydra" />
      <Button onClick={handleButtonClick}>GET SIGNAL</Button>
    </div>
  );
}

export default App;
