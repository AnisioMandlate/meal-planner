import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { addDays, eachDayOfInterval, format } from "date-fns";
import styles from "@/styles/Home.module.css";
import { PlusCircle, Edit2, Trash } from "feather-icons-react";
import { supabase } from "@/utils/supabase";
import Loader from "@/components/Loader";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

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
    getMeals(
      `${presentDay.getFullYear()}/${
        presentDay.getMonth() + 1
      }/${presentDay.getDate()}`
    );
  }, []);

  const getMeals = (day) => {
    setLoading(!loading);
    supabase
      .from("meals")
      .select("*")
      .eq("date", day)
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
      .finally(() => setLoading(false));
  };

  const leadingActions = (name) => (
    <LeadingActions>
      <SwipeAction onClick={() => console.log(`Edit meal: ${name}`)}>
        <div className={`${styles.swipe_element} ${styles.edit}`}>
          <Edit2 size="20" />
          Edit
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (name) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.log(`Delete meal: ${name}`)}
      >
        <div className={`${styles.swipe_element} ${styles.delete}`}>
          <Trash size="20" />
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <Head>
        <title>Meal Planner App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Meal Plan</h1>
            <Link href="/add-meals">
              <PlusCircle color="#017371" />
            </Link>
          </header>
          <div className={styles.week_days_grid}>
            {days.map((day) => (
              <div
                className={`${styles.week_day} ${
                  selectedDate
                    ? selectedDate.getDay() === day.getDay() && styles.active
                    : presentDay.getDay() === day.getDay() && styles.active
                }`}
                key={day}
                onClick={() => {
                  getMeals(format(day, "y/L/d"));
                  setSelectedDate(day);
                }}
              >
                <p>{format(day, "EEE")}</p>
                <span>{format(day, "d")}</span>
              </div>
            ))}
          </div>

          <div className={styles.current_date}>
            <p>
              {selectedDate
                ? format(selectedDate, "EEEE, do LLLL")
                : format(presentDay, "EEEE, do LLLL")}
            </p>
          </div>
          {loading ? (
            <div className={styles.loading}>
              <Loader bigSize={true} />
            </div>
          ) : (
            <>
              {meals == 0 ? (
                <div className={styles.empty_meal_list}>
                  <p>
                    There are no meals added for this day.
                    <br />
                    You can go ahead and add your meals
                  </p>

                  <Link href="/add-meals">Add my meals</Link>
                </div>
              ) : (
                <>
                  {meals.map((mealGroup) => (
                    <div key={mealGroup.meal_type} className={styles.meal_list}>
                      <h2 className={styles.meal_type}>
                        {mealGroup.meal_type}
                      </h2>

                      <SwipeableList
                        fullSwipe={true}
                        threshold={0.5}
                        type={ListType.IOS}
                      >
                        {mealGroup.meals.map((meal) => (
                          <SwipeableListItem
                            key={meal.meal_name}
                            leadingActions={leadingActions(meal.meal_name)}
                            trailingActions={trailingActions(meal.meal_name)}
                            style={styles.meal_details}
                          >
                            <>
                              <Image
                                src={meal.meal_photo_url}
                                className={styles.meal_image}
                                alt={`Image of ${meal.meal_name}`}
                                width={60}
                                height={60}
                                placeholder="blur"
                                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsqa2pBwAE6AH2vfY2MAAAAABJRU5ErkJggg=="
                                style={{ width: "88px", height: "auto" }}
                              />
                              <div className={styles.meal_description}>
                                <p className={styles.meal_name}>
                                  {meal.meal_name}
                                </p>
                                <span className={styles.meal_calories}>
                                  {meal.meal_calories}
                                </span>
                              </div>
                            </>
                          </SwipeableListItem>
                        ))}
                      </SwipeableList>
                      {/* <ul className={styles.meals}>
                        {mealGroup.meals.map((meal) => (
                          <li
                            className={styles.meal_details}
                            key={meal.meal_name}
                          >
                            <>
                              <Image
                                src={meal.meal_photo_url}
                                className={styles.meal_image}
                                alt={`Image of ${meal.meal_name}`}
                                width={60}
                                height={60}
                                placeholder="blur"
                                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsqa2pBwAE6AH2vfY2MAAAAABJRU5ErkJggg=="
                                style={{ width: "88px", height: "auto" }}
                              />
                              <div className={styles.meal_description}>
                                <p className={styles.meal_name}>
                                  {meal.meal_name}
                                </p>
                                <span className={styles.meal_calories}>
                                  {meal.meal_calories}
                                </span>
                              </div>
                            </>
                          </li>
                        ))}
                      </ul> */}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
