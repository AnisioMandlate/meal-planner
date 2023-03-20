import Head from "next/head";
import Image from "next/image";
// Styles
import styles from "@/styles/Home.module.css";

// Images/Icons
import { PlusCircle, Edit } from "feather-icons-react";
import Breakfast from "@/assets/breakfast.jpg";
import Beanstew from "@/assets/bean_stew.jpg";
import Picanha from "@/assets/picanha.jpg";
import Snacks from "@/assets/snacks.jpg";

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

          <div className={styles.current_date}>
            <p>Monday, 1st April</p>
            <button>
              <PlusCircle color="#017371" />
            </button>
          </div>

          <>
            <div className={styles.meal_list}>
              <div className={styles.meal}>
                <h2 className={styles.meal_type}>Breakfast</h2>
                <div className={styles.meal_details}>
                  <Image src={Breakfast} className={styles.meal_image} />
                  <div className={styles.meal_description}>
                    <p className={styles.meal_name}>
                      Pão com ovo estrelado e queijo
                    </p>
                    <span className={styles.meal_calories}>200 cal</span>
                  </div>
                  <button className={styles.edit_meal_button}>
                    <Edit color="#929CAD" />
                  </button>
                </div>
              </div>

              <div className={styles.meal}>
                <h2 className={styles.meal_type}>Lunch</h2>
                <div className={styles.meal_details}>
                  <Image src={Beanstew} className={styles.meal_image} />
                  <div className={styles.meal_description}>
                    <p className={styles.meal_name}>Feijoada</p>
                    <span className={styles.meal_calories}>200 cal</span>
                  </div>
                  <button className={styles.edit_meal_button}>
                    <Edit color="#929CAD" />
                  </button>
                </div>

                <div className={styles.meal_details}>
                  <Image src={Picanha} className={styles.meal_image} />
                  <div className={styles.meal_description}>
                    <p className={styles.meal_name}>Picanha</p>
                    <span className={styles.meal_calories}>200 cal</span>
                  </div>
                  <button className={styles.edit_meal_button}>
                    <Edit color="#929CAD" />
                  </button>
                </div>
              </div>

              <div className={styles.meal}>
                <h2 className={styles.meal_type}>Snacks</h2>
                <div className={styles.meal_details}>
                  <Image src={Snacks} className={styles.meal_image} />
                  <div className={styles.meal_description}>
                    <p className={styles.meal_name}>Frutas</p>
                    <span className={styles.meal_calories}>200 cal</span>
                  </div>
                  <button className={styles.edit_meal_button}>
                    <Edit color="#929CAD" />
                  </button>
                </div>
              </div>

              <div className={styles.meal}>
                <h2 className={styles.meal_type}>Dinner</h2>
                <div className={styles.meal_details}>
                  <Image src={Beanstew} className={styles.meal_image} />
                  <div className={styles.meal_description}>
                    <p className={styles.meal_name}>Feijoada</p>
                    <span className={styles.meal_calories}>200 cal</span>
                  </div>
                  <button className={styles.edit_meal_button}>
                    <Edit color="#929CAD" />
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </main>
    </>
  );
}
