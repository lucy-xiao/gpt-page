'use client'
import React, { useState } from "react";
import { generateJoke } from "../api/gpt";
import { FemaleImages, FemaleImagesList, MaleImages, MaleImagesList, Models } from "../api/models";
import styles from '@/app/page.module.css'
import Image from "next/image";
import '@/app/page.module.css'
import Link from "next/link";
import { useAppStore } from "../store/store";

export default function JokePage() {
    const allowed = useAppStore((state) => state.allowed)
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false)
    const [model, setModel] = useState(Models.DEEPSEEK_R1_DISTILL_LLAMA_70B)
    const [maleOutput, setMaleOutput] = useState("");
    const [femaleOutput, setFemaleOutput] = useState("");
    const [maleImage, setMaleImage] = useState(MaleImages.neutral)
    const [femaleImage, setFemaleImage] = useState(FemaleImages.happy)
    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * max); // 3 -> 0,1,2
    }

    const getJoke = async () => {
      if (!input.trim()) return;
      setMaleImage(MaleImages.neutral)
      setFemaleImage(FemaleImages.happy)
      setMaleOutput("")
      setFemaleOutput("")
      try {
          setLoading(true)
          const response = await generateJoke(input, model);
          setLoading(false)
          const femaleInitiatesQuestion = Math.round(Math.random())
          if (femaleInitiatesQuestion) {
            setMaleOutput(response.question)
            setFemaleOutput(response.answer)
          } else {
            setFemaleOutput(response.question)
            setMaleOutput(response.answer)
          }
          const randomMaleImageIndex = getRandomInt(MaleImagesList.length)
          setMaleImage(MaleImagesList[randomMaleImageIndex])
          const randomFemaleImageIndex = getRandomInt(FemaleImagesList.length)
          setFemaleImage(FemaleImagesList[randomFemaleImageIndex])
      } catch (error) {
        console.log("Error calling gpt", error)
        setLoading(false)
      }
    }
      const maleSpeechBubbleCss = maleOutput === "" ? styles.manSpeechHidden : `${styles.speechBubble} ${styles.manSpeech}`
      const femaleSpeechBubbleCss = femaleOutput === "" ? styles.womanSpeechHidden : `${styles.speechBubble} ${styles.womanSpeech}`

      return !allowed ? <div className={styles.conversationContainer}>Not Allowed</div> : (
        <div>
          <div className={styles.outerContainer }>
          <div className={styles.conversationContainer}>
              <div className={styles.personContainer}>
                <div className={maleSpeechBubbleCss}>
                  <p>{maleOutput}</p>
                </div>
                <Image src={maleImage} alt="" width={100} height={100}/>
              </div>
              <div className={styles.personContainer}>
                <div className={femaleSpeechBubbleCss}>
                  <p>{femaleOutput}</p>
                </div>
                <Image src={femaleImage} alt="" width={100} height={100}/>
              </div>
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
