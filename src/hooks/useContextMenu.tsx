
import { useState, useEffect } from "react";
const useContextMenu = () => {
  const [ workoutId , setWorkoutId] = useState<any>("")
  const [clicked, setClicked] = useState<boolean>(false);
  const [points, setPoints] = useState<any>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => {
      setClicked(false)
      setWorkoutId("")
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    workoutId,
    setWorkoutId,
    clicked,
    setClicked,
    points,
    setPoints,
  };
};
export default useContextMenu;
