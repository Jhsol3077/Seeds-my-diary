import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [diaryEntry, setDiaryEntry] = useState('');
  const [imageURL, setImageURL] = useState('');


  useEffect(() => {
    loadDiaryForDate(date);
  }, [date]);

  const loadDiaryForDate = (selectedDate) => {
    const savedDiary = localStorage.getItem(selectedDate.toISOString());
    if (savedDiary) {
      setDiaryEntry(savedDiary);
    } else {
      setDiaryEntry('');
    }
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    loadDiaryForDate(selectedDate);
  };

  const handleDiarySubmit = (event) => {
    event.preventDefault();
    console.log('일기 내용:', diaryEntry);

    if (diaryEntry) {
      localStorage.setItem(date.toISOString(), diaryEntry);
      alert('일기가 저장되었습니다!');
    }
  };

  const handleEmojiClick = (emoji) => {
    setDiaryEntry(diaryEntry + emoji);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
      setDiaryEntry(diaryEntry + `<img src="${reader.result}" alt="user uploaded" />`);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const getButtonWidth = (buttonText) => {
    const textLength = buttonText.length;
    return { width: `${textLength * 10}px` }; // 글자 길이에 따라 동적으로 가로 길이 조절
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">오늘의 일기</h1>
      </header>
      <div className="calendar-container">
        <Calendar onChange={onChange} value={date} />
      </div>
      <div className="diary-form">
        <h2>{date.toLocaleDateString()}</h2>
        <form onSubmit={handleDiarySubmit}>
          <textarea
            className="diary-textarea"
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            placeholder="오늘 하루는 어떠한 기분이었는지, 어떤 소소한 행복이 있었는지 적어 볼까요 =) "
            rows="20"
            cols="50"
          ></textarea>
          <div>
            <span role="img" aria-label="smile" onClick={() => handleEmojiClick('😊')}>
              😊
            </span>
        <span role="img" aria-label="cool" onClick={() => handleEmojiClick('😎')}>
          😎
        </span>
        <span role="img" aria-label="sick" onClick={() => handleEmojiClick('🤢')}>
          🤢
        </span>
        <span role="img" aria-label="angry" onClick={() => handleEmojiClick('😡')}>
          😡
        </span>
        <span role="img" aria-label="weather" onClick={() => handleEmojiClick('☀️')}>
          ☀️
        </span>
        <span role="img" aria-label="rain" onClick={() => handleEmojiClick('🌧️')}>
          🌧️
        </span>
        <span role="img" aria-label="storm" onClick={() => handleEmojiClick('⛈️')}>
          ⛈️
        </span>
        <span role="img" aria-label="love" onClick={() => handleEmojiClick('❤️')}>
          ❤️
        </span>
        <span role="img" aria-label="cake" onClick={() => handleEmojiClick('🍰')}>
          🍰
        </span>
        <span role="img" aria-label="coffee" onClick={() => handleEmojiClick('☕')}>
          ☕
        </span>
          </div>
          <div>
  <label htmlFor="image-upload" className="button" style={getButtonWidth("이미지 추가")}>
    이미지 
  </label>
  <input
    id="image-upload"
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handleImageUpload}
  />
</div>
          <button type="submit" className="button"> 일기 저장</button>
        </form>
      </div>
    </div>
  );
}

export default App;
