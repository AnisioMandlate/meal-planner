import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "feather-icons-react";
import styles from "@/styles/AddMeals.module.css";

const AddMeals = () => {
  const [mealDate, setMealDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const onChangeHandler = (e) => {
    setMealDate({ ...mealDate, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Meal Planner App</title>
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Link href="/">
            <ArrowLeft size="26" />
          </Link>
          <h1 className={styles.title}>Add Meal</h1>
        </header>
        <div className={styles.content}>
          <div className={styles.date_container}>
            <h2>When:-</h2>
            <div className={styles.date_container_group}>
              <div className={styles.date_container_group_item}>
                <p>Day</p>
                <input
                  name="day"
                  type="number"
                  value={mealDate.day}
                  className={styles.date_container_group_item_input}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.date_container_group_item}>
                <p>Month</p>
                <input
                  name="month"
                  type="number"
                  value={mealDate.month}
                  className={styles.date_container_group_item_input}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.date_container_group_item}>
                <p>Year</p>
                <input
                  name="year"
                  type="number"
                  value={mealDate.year}
                  className={styles.date_container_group_item_input}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddMeals;
