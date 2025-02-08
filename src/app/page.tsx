'use client'
import React, { useState } from "react";
import styles from '@/app/page.module.css'
import { useAppStore } from "./store/store";
import { useRouter } from 'next/navigation'

const NEXT_PUBLIC_PASSWORD = process.env.NEXT_PUBLIC_PASSWORD

export default function HomePage() {
    const router = useRouter()
    const [input, setInput] = useState("");
    const [showError, setShowError] = useState(false)
    const updateAllowed = useAppStore((state) => state.updateAllowed)
    const checkPassword = () => {
      if (input === NEXT_PUBLIC_PASSWORD) {
        updateAllowed(true)
        router.push('/jokes')
      } else {
        setShowError(true)
      }
    }

    return (
      <div>
        <div className={styles.outerContainer }>
          <h1 style={{color: "#222", fontWeight: "bold", fontSize: "32px"}}>Login</h1>
          {showError ? <p style={{color: "#444"}}>Incorrect password</p> : null}
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter password" 
            className={styles.input}
        />
        <br/>
        <button 
            onClick={checkPassword} 
            className={styles.submit}
        >
            { "Submit"}
        </button>
        </div>
    </div>
  );
}
