import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HomeBanner2.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const HomeBanner2 = () => {


  const [data, setData] = React.useState<any[] | null>(null);


  const getData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/workoutplans/workouts",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.ok) {
        setData(data.data);
        console.log(data.data)
      } else {
        console.error("Error in generating the workout data");
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data && (
        <div className="workouts-list">
          <h1 className="mainhead1">WORKOUTS</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data &&
              data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="swiper-slide"
                      style={{
                        backgroundImage: `url(${item.imageURL})`,
                      }}
                      onClick={() => {
                        window.location.href = `/workout?id=${item._id}`;
                      }}
                    >
                      <div className="swiper-slide-content">
                        <h2>{item.name}</h2>
                        <p>{item.durationInMinutes}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default HomeBanner2;
