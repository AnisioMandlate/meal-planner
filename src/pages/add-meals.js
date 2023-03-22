import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Upload } from "feather-icons-react";
import styles from "@/styles/AddMeals.module.css";

const AddMeals = () => {
  const date = new Date();
  const mealPhotoRef = useRef(null);
  const [mealDate, setMealDate] = useState({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getUTCFullYear(),
  });
  const [mealDetails, setMealDetails] = useState({
    meal_photo: "",
    meal_type: "",
    meal_name: "",
    meal_calories: "",
  });

  const onChangeDateHandler = (e) => {
    setMealDate({ ...mealDate, [e.target.name]: e.target.value });
  };

  const onChangeMealDetails = (e) => {
    setMealDetails({ ...mealDetails, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    let images = [];

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setMealDetails({ ...mealDetails, meal_photo: images[0] });
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
          <div className={styles.meal_date_container}>
            <h2>When:-</h2>
            <div className={styles.meal_date_container_group}>
              <div className={styles.meal_date_container_group_item}>
                <p>Day</p>
                <input
                  name="day"
                  type="number"
                  placeholder="01"
                  value={mealDate.day}
                  className={styles.meal_date_container_group_item_input}
                  onChange={onChangeDateHandler}
                />
              </div>
              <div className={styles.meal_date_container_group_item}>
                <p>Month</p>
                <input
                  name="month"
                  type="number"
                  placeholder="01"
                  value={mealDate.month}
                  className={styles.meal_date_container_group_item_input}
                  onChange={onChangeDateHandler}
                />
              </div>
              <div className={styles.meal_date_container_group_item}>
                <p>Year</p>
                <input
                  name="year"
                  type="number"
                  placeholder="2023"
                  value={mealDate.year}
                  className={styles.meal_date_container_group_item_input}
                  onChange={onChangeDateHandler}
                />
              </div>
            </div>
          </div>

          <div className={styles.meal_details_container}>
            <h2>Meal Details:-</h2>
            <div className={styles.meal_details_container_group}>
              <div className={styles.meal_details_container_group_item}>
                <p>Photo</p>
                <div
                  className={
                    styles.meal_details_container_group_item_image_upload
                  }
                >
                  <input
                    name="meal_photo"
                    type="file"
                    accept="image/*"
                    className={styles.meal_details_image_upload_hidden}
                    multiple={false}
                    ref={mealPhotoRef}
                    onChange={onImageChange}
                  />
                  {mealDetails.meal_photo != "" ? (
                    <img
                      alt={`${mealDetails.meal_name} photo`}
                      src={mealDetails.meal_photo}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <p onClick={() => mealPhotoRef.current.click()}>
                      <Upload size="34" />
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.meal_details_container_group_item}>
                <p>Type</p>
                <select
                  name="meal_type"
                  className={styles.meal_details_container_group_item_input}
                  onChange={onChangeMealDetails}
                >
                  <option disabled selected>
                    Breakfast
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className={styles.meal_details_container_group_item}>
                <p>Name</p>
                <input
                  name="meal_name"
                  type="text"
                  placeholder="Pão com ovo estrelado e queijo"
                  value={mealDetails.meal_name}
                  className={styles.meal_details_container_group_item_input}
                  onChange={onChangeMealDetails}
                />
              </div>
              <div className={styles.meal_details_container_group_item}>
                <p>Calories</p>
                <input
                  name="meal_calories"
                  type="number"
                  placeholder="200"
                  value={mealDetails.meal_calories}
                  className={styles.meal_details_container_group_item_input}
                  onChange={onChangeMealDetails}
                />
              </div>
            </div>
          </div>

          <button className={styles.add_meal_button}>Add meal</button>
        </div>
      </main>
    </>
  );
};

export default AddMeals;
