import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { addDays, eachDayOfInterval, format } from "date-fns";
// Styles
import styles from "@/styles/Home.module.css";
// Images/Icons
import { PlusCircle, Edit2 } from "feather-icons-react";
import Breakfast from "@/assets/breakfast.jpg";
import Beanstew from "@/assets/bean_stew.jpg";
import Picanha from "@/assets/picanha.jpeg";
import Snacks from "@/assets/snacks.jpeg";
// API
import { supabase } from "@/utils/supabase";

export default function Home() {
  const [meals, setMeals] = useState([]);

  // Date Manipulation
  const NUMBER_DAYS = 6;
  const presentDay = new Date();
  const after07Days = addDays(presentDay, NUMBER_DAYS);
  const days = eachDayOfInterval({ start: presentDay, end: after07Days });

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = () => {
    supabase
      .from("meals")
      .select("*")
      .then(({ data }) => setMeals(data))
      .catch((err) => alert(err.message))
      .finally();
  };

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
            {days.map((day) => (
              <div className={styles.week_day} key={day}>
                <p>{format(day, "EEE")}</p>
                <span>{format(day, "d")}</span>
              </div>
            ))}
          </div>

          <div className={styles.current_date}>
            <p>{format(presentDay, "EEEE, do LLLL")}</p>
            <button>
              <PlusCircle color="#017371" />
            </button>
          </div>

          <>
            <div className={styles.meal_list}>
              <h2 className={styles.meal_type}>Breakfast</h2>
              <ul className={styles.meals}>
                <li className={styles.meal_details}>
                  <>
                    <Image
                      src={Breakfast}
                      className={styles.meal_image}
                      alt="Image of the meal"
                    />
                    <div className={styles.meal_description}>
                      <p className={styles.meal_name}>
                        Pão com ovo estrelado e queijo
                      </p>
                      <span className={styles.meal_calories}>200 cal</span>
                    </div>
                  </>
                </li>
              </ul>
            </div>
            <div className={styles.meal_list}>
              <h2 className={styles.meal_type}>Lunch</h2>
              <ul className={styles.meals}>
                <li className={styles.meal_details}>
                  <>
                    <Image
                      src={Beanstew}
                      className={styles.meal_image}
                      alt="Image of the meal"
                    />
                    <div className={styles.meal_description}>
                      <p className={styles.meal_name}>Feijoada</p>
                      <span className={styles.meal_calories}>200 cal</span>
                    </div>
                    <button className={styles.edit_meal_button}>
                      <Edit2 color="#929CAD" />
                    </button>
                  </>
                </li>
                <li className={styles.meal_details}>
                  <>
                    <Image
                      src={Picanha}
                      className={styles.meal_image}
                      alt="Image of the meal"
                    />
                    <div className={styles.meal_description}>
                      <p className={styles.meal_name}>Picanha</p>
                      <span className={styles.meal_calories}>200 cal</span>
                    </div>
                    <button className={styles.edit_meal_button}>
                      <Edit2 color="#929CAD" />
                    </button>
                  </>
                </li>
              </ul>
            </div>

            <div className={styles.meal_list}>
              <h2 className={styles.meal_type}>Snacks</h2>
              <ul className={styles.meals}>
                <li className={styles.meal_details}>
                  <>
                    <Image
                      src={Snacks}
                      className={styles.meal_image}
                      alt="Image of the meal"
                    />
                    <div className={styles.meal_description}>
                      <p className={styles.meal_name}>Frutas</p>
                      <span className={styles.meal_calories}>200 cal</span>
                    </div>
                    <button className={styles.edit_meal_button}>
                      <Edit2 color="#929CAD" />
                    </button>
                  </>
                </li>
              </ul>
            </div>

            <div className={styles.meal_list}>
              <h2 className={styles.meal_type}>Dinner</h2>
              <ul className={styles.meals}>
                <li className={styles.meal_details}>
                  <>
                    <Image
                      src={Beanstew}
                      className={styles.meal_image}
                      alt="Image of the meal"
                    />
                    <div className={styles.meal_description}>
                      <p className={styles.meal_name}>Feijoada</p>
                      <span className={styles.meal_calories}>200 cal</span>
                    </div>
                    <button className={styles.edit_meal_button}>
                      <Edit2 color="#929CAD" />
                    </button>
                  </>
                </li>
              </ul>
            </div>
          </>
        </div>
      </main>
    </>
  );
}
