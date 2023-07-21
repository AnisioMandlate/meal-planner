import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import { format, parseISO } from "date-fns";
import {
  ArrowDownCircle,
  ArrowLeft,
} from "feather-icons-react/build/IconComponents";
import styles from "@/styles/AddMeals.module.css";
import { supabase } from "@/utils/supabase";
import Select, { components, DropdownIndicator } from "react-select";

const AddMeals = () => {
  const date = new Date();
  const router = useRouter();
  const mealId = router.query.id;
  const [loading, setLoading] = useState(false);
  const [mealDate, setMealDate] = useState({
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    fullDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  });
  const [mealDetails, setMealDetails] = useState({
    meal_type: "",
    meal_name: "",
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
            meal_type: data[0].meal_type,
            meal_name: data[0].meal_name,
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
    const dateString = e.target.value.split("/");
    const fullDate = `${dateString[2]}/${dateString[1]}/${dateString[0]}`;

    setMealDate({
      day: dateString[0],
      month: dateString[1],
      year: dateString[2],
      fullDate,
    });
  };

  const onHandleMealDetailsChange = (e) => {
    setMealDetails({ ...mealDetails, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = () => {
    setLoading(!loading);
    if (mealId) {
      supabase
        .from("meals")
        .update([
          {
            date: mealDate.fullDate,
            meal_type: mealDetails.meal_type,
            meal_name: mealDetails.meal_name,
          },
        ])
        .eq("id", mealId)
        .then(() => router.replace("/"))
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    } else {
      supabase
        .from("meals")
        .insert([
          {
            date: mealDate.fullDate,
            meal_type: mealDetails.meal_type,
            meal_name: mealDetails.meal_name,
          },
        ])
        .then(() => router.replace("/"))
        .catch((err) => console.log(err.message))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDownCircle size="16" />
      </components.DropdownIndicator>
    );
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
        <div className={styles.content}>
          <div className={styles.meal_details_container}>
            <div className={styles.meal_details_container_group}>
              <div className={styles.meal_details_container_flex}>
                <div className={styles.meal_details_container_group_item}>
                  <p>Date</p>
                  <input
                    name="fullDate"
                    type="string"
                    placeholder="DD/MM/YYYY"
                    defaultValue={`${mealDate.day}/0${mealDate.month + 1}/${
                      mealDate.year
                    }`}
                    className={styles.meal_details_container_group_item_input}
                    onChange={onHandleDateChange}
                  />
                </div>
              </div>

              <div className={styles.meal_details_container_group_item}>
                <p>Type</p>
                <Select
                  options={[
                    { value: "Breakfast", label: "Breakfast" },
                    { value: "Lunch", label: "Lunch" },
                    { value: "Snacks", label: "Snacks" },
                    { value: "Dinner", label: "Dinner" },
                  ]}
                  onChange={(e) =>
                    onHandleMealDetailsChange({
                      target: { name: "meal_type", value: e.value },
                    })
                  }
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  value={
                    mealId && {
                      value: mealDetails.meal_type,
                      label: mealDetails.meal_type,
                    }
                  }
                  placeholder={"Meal type"}
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      paddingTop: "1.18rem",
                      paddingBottom: "1.18rem",
                      paddingLeft: "2.4rem",
                      paddingRight: "2.4rem",
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 13,
                    colors: {
                      ...theme.colors,
                      primary25: "#80cbc4",
                      primary: "#009688",
                    },
                  })}
                />
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
                onClick={onHandleSubmit}
                disabled={loading}
              >
                {mealId ? "Save changes" : "Add new meal"}
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default withRouter(AddMeals);
