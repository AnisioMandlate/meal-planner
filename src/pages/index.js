import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { addDays, eachDayOfInterval, format } from "date-fns";
import styles from "@/styles/Home.module.css";
import { PlusCircle } from "feather-icons-react";
import { supabase } from "@/utils/supabase";

export default function Home() {
  const [meals, setMeals] = useState([]);

  const NUMBER_DAYS = 6;
  const ORDER = [
    "breakfast",
    "break lunch",
    "lunch",
    "snacks",
    "dinner",
    "late dinner",
  ];
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
      .then(({ data }) => {
        setMeals(
          data
            .reduce((prev, crr) => {
              const existingMeal = prev.find(
                (el) =>
                  el.meal_type.toLowerCase() === crr.meal_type.toLowerCase()
              );

              existingMeal
                ? (existingMeal.meals = [...existingMeal.meals, crr])
                : (prev = [
                    ...prev,
                    {
                      meal_type: crr.meal_type.toLowerCase(),
                      meals: [crr],
                    },
                  ]);

              return prev;
            }, [])
            .sort(
              (a, b) => ORDER.indexOf(a.meal_type) - ORDER.indexOf(b.meal_type)
            )
        );
      })
      .catch((err) => alert(err.message))
      .finally();
  };

  return (
    <>
      <Head>
        <title>Meal Planner App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Meal Plan</h1>
            <button onClick={() => console.log("I was clicked!!")}>
              <PlusCircle color="#017371" />
            </button>
          </header>
          <div className={styles.week_days_grid}>
            {days.map((day) => (
              <div
                className={`${styles.week_day} ${
                  presentDay.getDay() === day.getDay() && styles.active
                }`}
                key={day}
              >
                <p>{format(day, "EEE")}</p>
                <span>{format(day, "d")}</span>
              </div>
            ))}
          </div>

          <div className={styles.current_date}>
            <p>{format(presentDay, "EEEE, do LLLL")}</p>
          </div>

          <>
            {meals.map((mealGroup) => (
              <div key={mealGroup.meal_type} className={styles.meal_list}>
                <h2 className={styles.meal_type}>{mealGroup.meal_type}</h2>
                <ul className={styles.meals}>
                  {mealGroup.meals.map((meal) => (
                    <li className={styles.meal_details} key={meal.meal_name}>
                      <>
                        <Image
                          src={meal.meal_photo_url}
                          className={styles.meal_image}
                          alt={`Image of ${meal.meal_name}`}
                          width={60}
                          height={60}
                          priority={true}
                        />
                        <div className={styles.meal_description}>
                          <p className={styles.meal_name}>{meal.meal_name}</p>
                          <span className={styles.meal_calories}>
                            {meal.meal_calories}
                          </span>
                        </div>
                      </>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        </div>
      </main>
    </>
  );
}
