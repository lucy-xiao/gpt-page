'use client'
import React, { useState } from "react";
import { gpt } from "../api/gpt";
import { Models } from "../api/models";
import styles from '@/app/page.module.css'
import Link from "next/link";
import { useAppStore } from "../store/store";

export default function GptPage() {
  const allowed = useAppStore((state) => state.allowed)
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(Models.DEEPSEEK_R1_DISTILL_LLAMA_70B)
  const sendMessage = async () => {
      if (!input.trim()) return;

      const newMessages = [...messages, { sender: "You", text: input }];
      setMessages(newMessages);
      setInput("");

      try {
          setLoading(true)
          const response = await gpt(input, model);
          setLoading(false)
          const reply = response || "Oops! Something went wrong. Try again later.";
          setMessages([...newMessages, { sender: "Bot", text: reply }]);
      } catch (error) {
        console.log("Error calling gpt", error)
        setLoading(false)
        setMessages([...newMessages, { sender: "Bot", text: "Oops! Something went wrong. Try again later." }]);
      }
    }

      return !allowed ? <div className={styles.conversationContainer}>Not Allowed</div> : (
        <div>
          <div className={styles.outerContainer}>
            <h1 className={styles.title}>GPT Tester 🤖</h1>
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

            <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                    ))}
            </div>

            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Say something..." 
                    className={styles.input}
                    disabled={loading}
                />
                <button 
                    onClick={sendMessage} 
                    className={loading ? styles.submitLoading : styles.submit}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
            <Link
              key="/jokes"
              href="/jokes"
            >
              <button className={styles.navigateButton}>
                Go to Jokes Page
              </button>
            </Link>
        </div>
      </div>
    );
}
