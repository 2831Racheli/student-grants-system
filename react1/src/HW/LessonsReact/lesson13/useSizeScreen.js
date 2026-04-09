import { useState, useEffect } from 'react'

// use חייב להתחיל ב 
export const useSizeScreen = () => {
    // של ריאקט hooks יכול להכיל את כל ה custom hooks
    // בפונקציה רגילה אין אפשרות להשתמש בהוקס

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth))
    }, [])

    return width

}