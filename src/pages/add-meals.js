import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import { format } from "date-fns";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import styles from "@/styles/AddMeals.module.css";
import { supabase } from "@/utils/supabase";

const AddMeals = () => {
  const date = new Date();
  const router = useRouter();
  const mealId = router.query.id;
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mealId) {
      supabase
        .from("meals")
        .select("*")
        .eq("id", mealId)
        .then(({ data }) => {
          setValue("meal_type", data[0].meal_type);
          setValue("meal_name", data[0].meal_name);
          setValue("meal_date", format(new Date(data[0].date), "d/LL/y"));
        })
        .catch((err) => alert(err.message))
        .finally();
    } else {
      setValue("meal_date", format(date, "d/LL/y"));
    }
  }, []);

  const onSubmit = (values) => {
    setLoading(true);
    const { meal_name, meal_type, meal_date } = values;
    const meal_data = {
      date: meal_date.split("/").reverse().join("/"),
      meal_type,
      meal_name,
    };

    if (mealId) {
      supabase
        .from("meals")
        .update([meal_data])
        .eq("id", mealId)
        .then((data) => {
          if (data.status === 400) {
            return alert("Error updating the meal");
          }
          return router.replace("/");
        })
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    } else {
      supabase
        .from("meals")
        .insert([meal_data])
        .then((data) => {
          if (data.status === 400) {
            return alert("Error registering the meal");
          }
          return router.replace("/");
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
      <>
        <header className={styles.header}>
          <Link href="/">
            <ArrowLeft size="26" />
          </Link>
          <h1 className={styles.title}>{mealId ? "Edit meal" : "Add Meal"}</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
          <div className={styles.meal_details_container}>
            <div className={styles.meal_details_container_group}>
              <div className={styles.meal_details_container_group_item}>
                <p>Date</p>
                <input
                  {...register("meal_date", { required: true })}
                  placeholder="DD/MM/YYYY"
                  className={styles.meal_details_container_group_item_input}
                />
              </div>

              <div className={styles.meal_details_container_group_item}>
                <p>Type</p>
                <select
                  {...register("meal_type", { required: true })}
                  className={styles.meal_details_container_group_item_input}
                >
                  <option value="" disabled hidden selected>
                    Meal type
                  </option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Snacks</option>
                  <option>Dinner</option>
                </select>
              </div>

              <div className={styles.meal_details_container_group_item}>
                <p>Name</p>
                <input
                  {...register("meal_name", { required: true })}
                  placeholder="Pão com ovo estrelado e queijo"
                  className={styles.meal_details_container_group_item_input}
                />
              </div>
            </div>
          </div>

          <div className={styles.button_container}>
            <div className={styles.mealButtonDiv}>
              {mealId && (
                <button
                  className={`${styles.add_meal_button} ${
                    mealId && styles.cancel
                  }`}
                  onClick={() => {
                    router.replace("/");
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                className={`${styles.add_meal_button} ${
                  mealId && styles.edit_meal_button
                }`}
                type="submit"
                disabled={loading}
              >
                {mealId ? "Save changes" : "Add new meal"}
              </button>
            </div>
          </div>
        </form>
      </>
    </>
  );
};

export default withRouter(AddMeals);
