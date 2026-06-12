import "./Activity.css";
import { useEffect, useState } from "react";
// import info from './../../../data/'

const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <section className="activity-section md:py-24 text-black mt-10 bg-cream1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="font-inter text-[12px] uppercase tracking-wide font-medium text-gold1">
          What We Do
        </p>

        <h2 className="font-cormorant text-black text-5xl my-6">
          Activities & Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8 pt-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-card shadow-md"
            >
              <h3>{activity.card_info.Title}</h3>

              <p className="font-poppins">
                {activity.card_info.description}
              </p>

              <h4 className="card-arrow">→</h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Activity;