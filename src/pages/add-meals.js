import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter, withRouter } from "next/router";
import { format, parseISO } from "date-fns";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { Upload } from "feather-icons-react/build/IconComponents";
import styles from "@/styles/AddMeals.module.css";
import { supabase } from "@/utils/supabase";
import Loader from "@/components/Loader";

const AddMeals = () => {
  const date = new Date();
  const router = useRouter();
  const mealId = router.query.id;
  const mealPhotoRef = useRef(null);
  const [mealImage, setMealImage] = useState();
  const [loading, setLoading] = useState(false);
  const [mealDate, setMealDate] = useState({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
  const [mealDetails, setMealDetails] = useState({
    meal_photo: "",
    meal_type: "",
    meal_name: "",
    meal_calories: "",
  });

  useEffect(() => {
    if (mealId) {
      supabase
        .from("meals")
        .select("*")
        .eq("id", mealId)
        .then(({ data }) => {
          setMealDetails((prevMealDetails) => ({
            ...prevMealDetails,
            meal_photo: data[0].meal_photo_url,
            meal_type: data[0].meal_type,
            meal_name: data[0].meal_name,
            meal_calories: data[0].meal_calories,
          }));

          return parseISO(data[0].date);
        })
        .then((data) => {
          setMealDate((prevMealData) => ({
            ...prevMealData,
            day: format(data, "d"),
            month: format(data, "L"),
            year: format(data, "y"),
          }));
        })
        .catch((err) => alert(err.message))
        .finally();
    }
  }, [mealId]);

  const onHandleDateChange = (e) => {
    setMealDate({ ...mealDate, [e.target.name]: e.target.value });
  };

  const onHandleMealDetailsChange = (e) => {
    setMealDetails({ ...mealDetails, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    let image = [];
    for (let i = 0; i < e.target.files.length; i++) {
      image.push(URL.createObjectURL(e.target.files[i]));
    }
    setMealDetails({ ...mealDetails, meal_photo: image[0] });
    setMealImage(e.target.files[0]);
  };

  const onHandleClearImage = () => {
    setMealDetails({ ...mealDetails, meal_photo: "" });
  };

  const onHandleSubmit = () => {
    setLoading(!loading);

    if (mealId && mealImage == undefined) {
      supabase
        .from("meals")
        .update([
          {
            date: `${mealDate.year}/0${mealDate.month}/${mealDate.day}`,
            meal_photo_url: mealDetails.meal_photo,
            meal_type: mealDetails.meal_type,
            meal_name: mealDetails.meal_name,
            meal_calories: mealDetails.meal_calories,
          },
        ])
        .eq("id", mealId)
        .then(() => router.replace("/"))
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    } else if (mealId && mealImage != undefined) {
      supabase.storage
        .from("images")
        .upload(`public/${mealImage?.name}`, mealImage)
        .then((res) => {
          const { data } = supabase.storage
            .from("images")
            .getPublicUrl(res.data.path);
          setMealDetails({ ...mealDetails, meal_photo: data.publicUrl });
          return data;
        })
        .then((data) => {
          supabase
            .from("meals")
            .update([
              {
                date: `${mealDate.year}/0${mealDate.month}/${mealDate.day}`,
                meal_photo_url: data.publicUrl,
                meal_type: mealDetails.meal_type,
                meal_name: mealDetails.meal_name,
                meal_calories: mealDetails.meal_calories,
              },
            ])
            .eq("id", mealId)
            .then(() => router.replace("/"));
        })
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    } else {
      supabase.storage
        .from("images")
        .upload(`public/${mealImage?.name}`, mealImage)
        .then((res) => {
          const { data } = supabase.storage
            .from("images")
            .getPublicUrl(res.data.path);
          setMealDetails({ ...mealDetails, meal_photo: data.publicUrl });
          return data;
        })
        .then((data) => {
          supabase
            .from("meals")
            .insert([
              {
                date: `${mealDate.year}/0${mealDate.month}/${mealDate.day}`,
                meal_photo_url: data.publicUrl,
                meal_type: mealDetails.meal_type,
                meal_name: mealDetails.meal_name,
                meal_calories: mealDetails.meal_calories,
              },
            ])
            .then(() => router.replace("/"));
        })
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    }
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
          <h1 className={styles.title}>{mealId ? "Edit meal" : "Add Meal"}</h1>
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
                  onChange={onHandleDateChange}
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
                  onChange={onHandleDateChange}
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
                  onChange={onHandleDateChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.meal_details_container}>
            <h2>Meal Details:-</h2>
            <div className={styles.meal_details_container_group}>
              <div className={styles.meal_details_container_group_item}>
                <div
                  className={styles.meal_details_container_group_item_header}
                >
                  <p>Photo</p>
                  {mealDetails.meal_photo != "" ? (
                    <button
                      type="button"
                      onClick={onHandleClearImage}
                      className={styles.clearImage}
                    >
                      Clear Image
                    </button>
                  ) : null}
                </div>
                <div
                  className={
                    styles.meal_details_container_group_item_image_upload
                  }
                  onClick={() => mealPhotoRef.current.click()}
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
                    <Image
                      alt={`${mealDetails.meal_name} photo`}
                      src={mealDetails.meal_photo}
                      height={100}
                      width={100}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <p>
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
                  onChange={onHandleMealDetailsChange}
                  value={
                    mealId || mealDetails.meal_type != ""
                      ? mealDetails.meal_type
                      : "Select meal type"
                  }
                >
                  <option disabled value="Select meal type">
                    Select meal type
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
                  onChange={onHandleMealDetailsChange}
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
                  onChange={onHandleMealDetailsChange}
                />
              </div>
            </div>
          </div>
          <>
            {mealId ? (
              <div className={styles.mealButtonDiv}>
                <button
                  className={`${styles.add_meal_button} ${
                    mealId && styles.cancel
                  }`}
                  onClick={() => {
                    alert("You will be redirected to the homepage");
                    router.replace("/");
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`${styles.add_meal_button} ${
                    mealId && styles.edit_meal_button
                  }`}
                  onClick={onHandleSubmit}
                >
                  {loading ? <Loader /> : "Save changes"}
                </button>
              </div>
            ) : (
              <button
                className={styles.add_meal_button}
                onClick={onHandleSubmit}
              >
                {loading ? <Loader /> : "Add meal"}
              </button>
            )}
          </>
        </div>
      </main>
    </>
  );
};

export default withRouter(AddMeals);
