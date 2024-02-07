"use client"
import { useState, useEffect } from 'react';

export default function MyComponent() {
    const words = ['better', 'healthier', 'safer'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(words[currentWordIndex]);
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentIndex < currentWord.length) {
                const currentChar = currentWord[currentIndex];
                setDisplayText((prevText) => prevText + currentChar);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(intervalId);
                setTimeout(() => {
                    setDisplayText('');
                    setCurrentIndex(0);
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                }, 500);
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [currentWord, currentIndex, currentWordIndex, words]);

    useEffect(() => {
        setCurrentWord(words[currentWordIndex]);
    }, [currentWordIndex, words]);

    return <div>{displayText}</div>;
}
