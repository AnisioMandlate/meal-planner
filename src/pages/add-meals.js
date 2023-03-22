import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "feather-icons-react";
import styles from "@/styles/AddMeals.module.css";

const AddMeals = () => {
  return (
    <>
      <Head>
        <title>Meal Planner App</title>
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Link href="/">
            <ArrowLeft />
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
                  name="Day"
                  type="number"
                  placeholder="01"
                  value="01"
                  className={styles.date_container_group_item_input}
                  onChange={() => console.log("I'm changing day")}
                />
              </div>
              <div className={styles.date_container_group_item}>
                <p>Month</p>
                <input
                  name="Month"
                  type="month"
                  placeholder="January"
                  value="January"
                  className={styles.date_container_group_item_input}
                  onChange={() => console.log("I'm changing month")}
                />
              </div>
              <div className={styles.date_container_group_item}>
                <p>Year</p>
                <input
                  name="Year"
                  type="number"
                  placeholder="2023"
                  value="2023"
                  className={styles.date_container_group_item_input}
                  onChange={() => console.log("I'm changing year")}
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
