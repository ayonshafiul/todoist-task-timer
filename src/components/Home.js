import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "./Home.css";

function getTimeElapsed(item) {
  let start = new Date(item.date_added);
  let end =
    item.date_completed !== null ? new Date(item.date_completed) : Date.now();
  let duration = (end - start) / 1000;
  let seconds = Math.floor(duration % 60);
  let minutes = Math.floor((duration / 60) % 60);
  let hours = Math.floor((duration / 3600) % 24);
  let days = Math.floor(duration / 86400);
  return [days, hours, minutes, seconds];
}
const Home = (props) => {
  const { token } = props;
  const [allData, setAllData] = useState();
  const [barData, setBarData] = useState([]);
  const [barLabelData, setBarLabelData] = useState([]);
  const [projectID, setProjectID] = useState(null);
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  useEffect(() => {
    (async function getAllData() {
      const data = await axios.post(
        "https://api.todoist.com/sync/v8/sync",
        {
          sync_token: "*",
          resource_types: ["all"],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const response = data.data;
      setAllData(response);
    })();
  }, [token]);

  useEffect(() => {
    if (projectID !== null) {
      setBarData([]);
      setBarLabelData([]);
      allData.items
        .filter((item) => {
          return item.project_id === projectID;
        })
        .map((item) => {
          let [days, hours, minutes] = getTimeElapsed(item);
          let duration = days * 24 + hours + minutes / 60;
          setBarData((prevData) => {
            let newData = [...prevData];
            newData.push(duration);
            return newData;
          });
          setBarLabelData((prevData) => {
            let newData = [...prevData];
            newData.push(
              item.content.length > 10
                ? item.content.substring(0, 10) + "..."
                : item.content
            );
            return newData;
          });
        });
    }
  }, [projectID]);
  if (!token) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div className="home-wrapper">
      {typeof allData !== "undefined" ? (
        <>
          {allData.projects.map((project) => {
            return (
              <div
                className={
                  project.id === projectID
                    ? "project project-active"
                    : "project"
                }
                key={project.id}
                onClick={() => {
                  setProjectID(project.id);
                }}
              >
                {project.name}
              </div>
            );
          })}
          {projectID !== null ? (
            <>
              {allData.items
                .filter((item) => {
                  return item.project_id === projectID;
                })
                .map((item) => {
                  let [days, hours, minutes, seconds] = getTimeElapsed(item);
                  let timeElapsed =
                    days + "d " + hours + "h " + minutes + "m " + seconds + "s";
                  return (
                    <div className="item" key={item.id}>
                      <div>{item.content}</div>
                      <div>{timeElapsed}</div>
                    </div>
                  );
                })}
              <Bar
                data={{
                  labels: barLabelData,
                  datasets: [
                    {
                      label: "Task Duration",
                      data: barData,
                      backgroundColor: "tomato",
                    },
                  ],
                }}
                options={options}
              />
            </>
          ) : (
            "select a project to see all the tasks"
          )}
        </>
      ) : null}
    </div>
  );
};

export default Home;
