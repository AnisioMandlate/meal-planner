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
          <h1>Meal Planner</h1>
        </div>
      </main>
    </>
  );
}
