"use client";
import React from "react";
import "./addworkout.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeBanner2 from "@/components/Navbar/HomeBanner2/HomeBanner2";

interface Workout {
  name: string;
  description: string;
  durationInMinutes: number;
  exercises: Exercise[];
  imageURL: string;
  imageFile: File | null;
}

interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageURL: string;
  imageFile: File | null;
}

const page = () => {
  const [workout, setWorkout] = React.useState<Workout>({
    name: "",
    description: "",
    durationInMinutes: 0,
    exercises: [],
    imageURL: "",
    imageFile: null,
  });

  const [exercise, setExercise] = React.useState<Exercise>({
    name: "",
    description: "",
    sets: 0,
    reps: 0,
    imageURL: "",
    imageFile: null,
  });

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const addExerciseToWorkout = () => {
    if (
      exercise.name == "" ||
      exercise.description == "" ||
      exercise.sets == 0 ||
      exercise.reps == 0 ||
      exercise.imageFile == null
    ) {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
      return;
    }
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, exercise],
    });
    // setExercise({
    //   name: "",
    //   description: "",
    //   sets: 0,
    //   reps: 0,
    //   imageUrl: "",
    //   imageFile: null,
    // });
  };
  const deleteExerciseFromWorkout = (index: number) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter((exercise, i) => i !== index),
    });
  };
  const uploadImage = async (image: File, folderName: string) => {
    const formData = new FormData();
    formData.append("folderName", folderName);
    formData.append("myimage", image);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Image is uploaded successfully", data);
      return data.imageUrl;
    } else {
      console.error("Image upload failed ", response.statusText);
      return null;
    }
  };

  const checkLogin = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
      {
        method: "GET",
        headers: {
          "Content-Type": "applicatoin/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      console.log("Admin is authenticated");
    } else {
      console.error("Admin is not authenticated");
      window.location.href = "/adminauth/login";
    }
  };

  const saveWorkout = async () => {
    await checkLogin();

    if (
      workout.name == "" ||
      workout.description == "" ||
      workout.durationInMinutes == 0 ||
      workout.exercises.length == 0 ||
      workout.imageFile == null
    ) {
      toast.error("Please fill all the fields of workout ", {
        position: "top-center",
      });
      return;
    }

    const folderName = "Workouts";
    if (workout.imageFile) {
      const workoutImageUrl = await uploadImage(workout.imageFile, folderName);
      if (workoutImageUrl) {
        workout.imageURL = workoutImageUrl;
      }
    }

    for (let i = 0; i < workout.exercises.length; i++) {
      let tempImg = workout.exercises[i].imageFile;
      if (tempImg) {
        let imageurl = await uploadImage(tempImg, folderName);
        workout.exercises[i].imageURL = imageurl;
      }
    }

    console.log(workout);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(workout),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = response.json();
      console.log("Workout created successfully ", data);
      toast.success("Workout created successfully", {
        position: "top-center",
      });
    } else {
      console.log("Workout creation failed");
      toast.error("Workout creation failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <div className="formpage">
        <h1 className="title">Add Workout</h1>
        <input
          type="text"
          placeholder="workout name"
          name="name"
          value={workout.name}
          onChange={handleWorkoutChange}
        />
        <textarea
          placeholder="workout description"
          name="description"
          value={workout.description}
          onChange={(e) => {
            setWorkout({
              ...workout,
              description: e.target.value,
            });
          }}
          rows={10}
          cols={30}
        />
        <input
          type="numbers"
          placeholder="workout duration"
          name="durationInMinutes"
          value={workout.durationInMinutes}
          onChange={handleWorkoutChange}
        />
        <input
          type="file"
          placeholder="workout Image"
          name="workoutImage"
          onChange={(e) => {
            setWorkout({
              ...workout,
              imageFile: e.target.files![0],
            });
          }}
        />
        <div>
          <h2 className="title">Add Exercise to workout</h2>
          <input
            type="text"
            placeholder="exercise name"
            name="name"
            value={exercise.name}
            onChange={handleExerciseChange}
          />
          <textarea
            placeholder="exercise description"
            name="description"
            onChange={(e) => {
              setExercise({
                ...exercise,
                description: e.target.value,
              });
            }}
            rows={5}
            cols={5}
          />
          <label htmlFor="sets">Sets</label>
          <input
            type="number"
            placeholder="Sets"
            name="sets"
            value={exercise.sets}
            onChange={handleExerciseChange}
          />
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            placeholder="Reps"
            name="reps"
            value={exercise.reps}
            onChange={handleExerciseChange}
          />
          <input
            type="file"
            placeholder="exercise Image"
            name="exerciseImage"
            onChange={(e) => {
              setExercise({
                ...exercise,
                imageFile: e.target.files![0],
              });
            }}
          />

          <button
            onClick={(e) => {
              addExerciseToWorkout();
            }}
          >
            Add Exercise
          </button>
        </div>
        <div className="exercises">
          <h1 className="title">Exercises</h1>
          {workout.exercises.map((exercise, index) => (
            <div className="exercise" key={index}>
              <h2>{exercise.name}</h2>
              <p>{exercise.description}</p>
              <p>{exercise.sets}</p>
              <p>{exercise.reps}</p>

              <img
                src={
                  exercise.imageFile
                    ? URL.createObjectURL(exercise.imageFile)
                    : exercise.imageURL
                }
                alt=""
              />
              <button onClick={() => deleteExerciseFromWorkout(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <button onClick={saveWorkout}>save workout</button>
      </div>
      <div>
        <HomeBanner2 />
      </div>
    </div>
  );
};

export default page;
