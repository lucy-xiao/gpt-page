"use client"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from '@/app/page.module.css'
import { useEffect, useState } from "react";

export default function BirthdayPage() {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const router = useRouter();
  const [personOut, setPersonOut] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFireworks((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 },
      ]);
      setTimeout(() => {
        setFireworks((prev) => prev.slice(1));
      }, 2000);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  // Variants for the person image animation
  const personVariants = {
    initial: { x: "100%", y: "100%", opacity: 0 },
    visible: { x: "0%", y: "0%", opacity: 1 },
    exit: { x: "100%", y: "100%", opacity: 0 },
  };

  return (
    <div>
      <motion.img
        src="Lawson-anime-us.png"
        alt="lawson"
        className="w-screen"
      />
      <div className="flex flex-col items-center justify-center min-h-screen  px-4 bg-gradient-to-r from-teal-500 to-purple-500 relative overflow-hidden">
      {fireworks.map((fw) => (
        <motion.div
          key={fw.id}
          className="absolute w-10 h-10 bg-white rounded-full"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [1, 2, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 1 }}
        />
      ))}
        <motion.h1
          className="mt-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-[70%]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        Happy 30th Birthday Zac!! 🎉
        </motion.h1>
        <motion.div
          className="mt-5 text-xl md:text-3xl text-white max-w-[60%]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {`I love you, miss you, and I wish I were there to celebrate with you, but I can't wait to see you soon! 🎂🎈`}
        </motion.div>
        <motion.div
          className="w-28 h-28 md:w-40 md:h-40 absolute bottom-0 right-0 mb-4 mr-4 z-1000"
          onClick={() => setPersonOut(true)}
          variants={personVariants}
          initial="initial"
          animate={personOut ? "exit" : "visible"}
          transition={{ delay: personOut? 0 : 5, duration: 2, ease: personOut ? "easeIn" : "easeOut" }}
        >
          <div className={styles.conversationContainer} >
            <div className={styles.personContainer} >
              <div className={`${styles.speechBubble} ${styles.manSpeech}`}>
                <p>{`Congrats, you're old! But still a handsome silver fox ;)`}</p>
              </div>
              <motion.img
                src="Lucy6.jpg"
                alt="Person"
                width={300}
                className="rounded-md"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-5 text-xl md:text-3xl text-white max-w-[60%]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
        {` I'm proud of all the hard work you've been doing, from getting fit, to finishing classwork early, getting called into work in your free time, it hasn't been easy.`}
        </motion.div>
        <motion.div
          className="mt-5 text-xl md:text-3xl text-white max-w-[50%]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
        {`I made you a fun little GPT toy to make it easier to play around with different GPT models, I hope it brings you some amusement :)`}
        </motion.div>
        <motion.div className="flex flex-col md:flex-row items-center mt-5 space-y-5 md:space-x-5 md:space-y-0">
          <div className="flex mt-10 space-x-10">
            <div className="flex flex-col items-center">
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/6522/6522628.png"
                alt="Starberry Pocky"
                className="w-32 h-32 md:w-40 md:h-40 mt-5"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1], rotate: [5, 5, -5, 5] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/3173/3173522.png"
                alt="Starberry Pocky"
                className="w-32 h-32 md:w-40 md:h-40 mt-5"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/786/786954.png"
                alt="Starberry Pocky"
                className="w-32 h-32 md:w-40 md:h-40 mt-5"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1], rotate: [3, 5, -10, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>
        <motion.div className="flex flex-col md:flex-row items-center mt-10 space-y-10 md:space-y-0 md:space-x-10">
          <div className="flex mt-10 space-x-10">
            <div className="flex flex-col items-center">
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/1083/1083805.png"
                alt="Present 1"
                className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => router.push("/jokes")}
              />
              <motion.span className="text-white mt-2">Present 1</motion.span>
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/1179/1179870.png"
                alt="Present 2"
                className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => router.push("/gpt")}
              />
              <motion.span className="text-white mt-2">Present 2</motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    
  );
}