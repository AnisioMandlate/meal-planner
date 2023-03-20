import Head from "next/head";

// Styles
import styles from "@/styles/Home.module.css";

// Fonts
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Meal Planner App</title>
        <meta
          name="description"
          content="An app to keep track of your meals and how much you consume."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Meal Plan</h1>
          <div className={styles.week_days_grid}>
            <div className={styles.week_day}>
              <p>Mon</p>
              <span>1</span>
            </div>
            <div className={styles.week_day}>
              <p>Tue</p>
              <span>2</span>
            </div>
            <div className={styles.week_day}>
              <p>Wed</p>
              <span>3</span>
            </div>
            <div className={styles.week_day}>
              <p>Thr</p>
              <span>4</span>
            </div>
            <div className={styles.week_day}>
              <p>Fri</p>
              <span>5</span>
            </div>
            <div className={styles.week_day}>
              <p>Sat</p>
              <span>6</span>
            </div>
            <div className={styles.week_day}>
              <p>Sun</p>
              <span>7</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
