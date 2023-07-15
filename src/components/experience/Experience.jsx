import { useState, useEffect } from "react";
import "./Experience.css";
import { SlCalender } from "react-icons/sl";
import PropTypes from "prop-types";

const Experience = ({ state }) => {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const { contract } = state;

    const educationDetails = async () => {
      const education = await contract.methods.allEductationDetails().call();
      setEducation(education);
    };

    const experienceDetails = async () => {
      const experienceDetails = await contract.methods
        .allExperienceDetails()
        .call();
      setExperience(experienceDetails);
    };

    contract && experienceDetails();
    contract && educationDetails();
  }, [state]);

  return (
    <section className="exp-section">
      <h1 className="title">Experience & Education </h1>

      <div className="container">
        <div className="education">
          <h1 className="edu-title">Education</h1>
          {education !== "" &&
            education.map((edu, index) => {
              return (
                <div className="edu-card" key={index}>
                  <p className="card-text1">
                    <SlCalender className="icon" /> {edu.date}
                  </p>
                  <h3 className="card-text2">{edu.degree}</h3>
                  <p className="card-text3">{edu.knowledgeAcquired}</p>
                  <p className="card-text4">{edu.instutionName}</p>
                </div>
              );
            })}
        </div>

        {/*for experience */}

        <div className="education">
          <h1 className="edu-title">Experience</h1>
          {experience.length > 0 &&
            experience.map((exp, index) => (
              <div className="edu-card" key={index}>
                <p className="card-text1">
                  <SlCalender className="icon" /> {exp.date}
                </p>
                <h3 className="card-text2">{exp.post}</h3>
                <p className="card-text3">{exp.knowledgeAcquired}</p>
                <p className="card-text4">{exp.companyName}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
Experience.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Experience;

