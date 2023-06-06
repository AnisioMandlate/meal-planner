import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
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

export default function Home({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
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

  const groupAndSortMeals = useCallback(
    (newMeals) => {
      const mealsArray = Array.isArray(newMeals) ? newMeals : [newMeals];
      let updatedMeals = [...meals];

      mealsArray.forEach((newMeal) => {
        const mealGroupIndex = updatedMeals.findIndex(
          (group) =>
            group.meal_type.toLowerCase() === newMeal.meal_type.toLowerCase()
        );

        if (mealGroupIndex !== -1) {
          updatedMeals[mealGroupIndex] = {
            ...updatedMeals[mealGroupIndex],
            meals: [...updatedMeals[mealGroupIndex].meals, newMeal],
          };
        } else {
          updatedMeals = [
            ...updatedMeals,
            {
              meal_type: newMeal.meal_type.toLowerCase(),
              meals: [newMeal],
            },
          ];
        }
      });

      const sortedMeals = updatedMeals.sort(
        (a, b) => ORDER.indexOf(a.meal_type) - ORDER.indexOf(b.meal_type)
      );

      return sortedMeals;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [meals]
  );

  useEffect(() => {
    router.isReady && setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (data && data.length) {
      setMeals(groupAndSortMeals(data));
    } else {
      setMeals([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-meals")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "meals" },
        (payload) => {
          setMeals(groupAndSortMeals(payload.new));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals, data]);

  const handleSelectedDate = (day) => {
    setIsLoading(true);
    router.replace(
      {
        pathname: "/",
        query: {
          day,
        },
      },
      "/"
    );
  };

  const handleEditMeal = (id) => {
    router.push(
      {
        pathname: "/add-meals",
        query: {
          id: id,
        },
      },
      "/add-meals"
    );
  };

  const handleDeleteMeal = (id) => {
    supabase
      .from("meals")
      .delete()
      .eq("id", id)
      .then(() => {})
      .catch(({ err }) => {
        alert(err.message);
      })
      .finally();
  };

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditMeal(id)}>
        <div className={`${styles.swipe_element} ${styles.edit}`}>
          <Edit2 size="20" />
          Edit
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDeleteMeal(id)}>
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
      <>
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
                handleSelectedDate(format(day, "y/L/d"));
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
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {meals == 0 ? (
                <div className={styles.empty_meal_list}>
                  <Image
                    src="/images/empty-results.svg"
                    alt="me"
                    width="128"
                    height="128"
                  />
                  <p>
                    There are no meals added for this day.
                    <br />
                    You can go ahead and add your meals
                  </p>

                  <Link
                    className={styles.empty_meal_list_add}
                    href="/add-meals"
                  >
                    Add my meals
                  </Link>
                </div>
              ) : (
                <>
                  {meals?.map((mealGroup) => (
                    <div key={mealGroup.meal_type} className={styles.meal_list}>
                      <h2 className={styles.meal_type}>
                        {mealGroup.meal_type}
                      </h2>

                      <SwipeableList
                        fullSwipe={false}
                        threshold={0.5}
                        type={ListType.IOS}
                      >
                        {mealGroup.meals?.map((meal) => (
                          <SwipeableListItem
                            key={meal.id}
                            leadingActions={leadingActions(meal.id)}
                            trailingActions={trailingActions(meal.id)}
                          >
                            <>
                              <div className={styles.meal_description}>
                                <p className={styles.meal_name}>
                                  {meal.meal_name}
                                </p>
                                <span className={styles.meal_calories}>
                                  {meal.meal_calories} kcal
                                </span>
                              </div>
                            </>
                          </SwipeableListItem>
                        ))}
                      </SwipeableList>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      </>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const presentDay = new Date();
  const today = `${presentDay.getFullYear()}/${
    presentDay.getMonth() + 1
  }/${presentDay.getDate()}`;
  let day = query.day;

  const { data } = await supabase
    .from("meals")
    .select("*")
    .eq("date", day ? day : today);

  return {
    props: { data },
  };
}
