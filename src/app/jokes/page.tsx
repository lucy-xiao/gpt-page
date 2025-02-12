'use client'
import React, { useState } from "react";
import { generateJoke } from "../api/gpt";
import { LucyImagesList, Models, ZacImagesList } from "../api/models";
import styles from '@/app/page.module.css'
import '@/app/page.module.css'
import Link from "next/link";
import { useAppStore } from "../store/store";
import { motion } from "framer-motion";

export default function JokePage() {
    const allowed = useAppStore((state) => state.allowed)
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false)
    const [model, setModel] = useState(Models.DEEPSEEK_V3)
    const [leftOutput, setLeftOutput] = useState("");
    const [rightOutput, setRightOutput] = useState("");
    const [leftImage, setLeftImage] = useState(ZacImagesList[0])
    const [rightImage, setRightImage] = useState(LucyImagesList[5])
    const [showError, setShowError] = useState(false)
    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * max); // 3 -> 0,1,2
    }

    const getJoke = async () => {
      if (!input.trim()) return;
      setShowError(false)
      setLeftOutput("")
      setRightOutput("")
      try {
          setLoading(true)
          const response = await generateJoke(input, model);
          setLoading(false)
          const femaleInitiatesQuestion = Math.round(Math.random())
          if (femaleInitiatesQuestion) {
            setLeftOutput(response.question)
            setRightOutput(response.answer)
          } else {
            setRightOutput(response.question)
            setLeftOutput(response.answer)
          }
          const randomLeftImageIndex = getRandomInt(ZacImagesList.length)
          setLeftImage(ZacImagesList[randomLeftImageIndex])
          const randomRightImageIndex = getRandomInt(LucyImagesList.length)
          setRightImage(LucyImagesList[randomRightImageIndex])
      } catch (error) {
        console.log("Error calling gpt", error)
        setLoading(false)
        setShowError(true)
      }
    }

      const maleSpeechBubbleCss = leftOutput === "" ? styles.manSpeechHidden : `${styles.speechBubble} ${styles.manSpeech}`
      const femaleSpeechBubbleCss = rightOutput === "" ? styles.womanSpeechHidden : `${styles.speechBubble} ${styles.womanSpeech}`

      return !allowed ? <div className={styles.conversationContainer}>Not Allowed</div> : (
        <div>
          <div className={styles.outerContainer }>
            <div className={styles.conversationContainer}>
              <motion.div 
                className={styles.personContainer} 
                initial={{ scale: 0 }}
                animate={leftOutput === "" ? {scale: [1]} : { scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className={maleSpeechBubbleCss}>
                  <p>{leftOutput}</p>
                </div>
                <motion.img src={leftImage} alt="" width={200} height={200}/>
              </motion.div>
              <motion.div 
                className={styles.personContainer} 
                initial={{ scale: 0 }}
                animate={rightOutput === "" ? {scale: [1]} : { scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className={femaleSpeechBubbleCss}>
                  <p>{rightOutput}</p>
                </div>
                <motion.img src={rightImage} alt="" width={200} height={200}/>
              </motion.div>
            </div>
            <h1 className={styles.title}>Random Joke Generator 😂</h1>
            {/* Dropdown to choose model type */}
            <div className={styles.selectContainer}>
              <label htmlFor="modelType" className={styles.selectLabel}>GPT Model </label>
              <select 
                  value={model} 
                  onChange={(e) => setModel(e.target.value as Models)} 
                  className={styles.select}
              >
                  {Object.entries(Models).map((keyValueList, index) => (
                    <option key={index} value={keyValueList[1]}>{keyValueList[0]}</option>
                  ))}
              </select>
            </div>
            {showError && <p style={{color: "#444"}}>Something went wrong, try a different model or topic.</p>}
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Set the joke topic..." 
                    className={styles.input}
                    disabled={loading}
                />
                <button 
                    onClick={getJoke} 
                    className={loading ? styles.submitLoading : styles.submit}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Generate Joke"}
                </button>
            </div>
            <Link
              key="/gpt"
              href="/gpt"
            >
              <button className={styles.navigateButton}>
                Go to GPT Tester
              </button>
            </Link>
        </div>
      </div>
    );
}
