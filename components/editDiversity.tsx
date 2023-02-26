import { getPersonalDiversityData, setPersonalDiversityData } from "@/lib/api";
import { ReactPropTypes, useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function EditDiversity(props: { close: Function }) {
  const [personalDiversity, setPersonalDiversity] = useState();

  let attributes = {
    gender: ["Male", "Female", "Non-Binary", "Other"],
    race: ["White", "Asian", "Black", "Other"],
    religion: [
      "Christianity",
      "Islam",
      "Hinduism",
      "Buddhism",
      "Atheism",
      "Other",
    ],
    sexuality: ["Straight", "Gay", "Lesbian", "Asexual", "Bisexual", "Other"],
    disability: [true, false],
  };

  useEffect(() => {
    getPersonalDiversityData(localStorage.getItem("access_token")).then(
      (data) => {
        setPersonalDiversity(data);
      }
    );
  }, []);

  async function updatePersonalDiversity(event: any) {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    let newPersonalDiversityData: { [key: string]: any } = {};

    for (let attribute of Object.keys(attributes)) {
      if (target[attribute].value == "null") {
        alert(`Select a value for ${attribute}`);
        return;
      }
      newPersonalDiversityData[attribute] = target[attribute].value;
    }
    await setPersonalDiversityData(
      localStorage.getItem("access_token"),
      newPersonalDiversityData
    );
    alert("Successfully updated personal diversity data");
    props.close();
  }

  return (
    <div className="z-10 fixed top-[10vh] left-[10vw] w-[80vw] h-[80vh] bg-[#271B3C] rounded-xl shadow-xl p-12">
      <button
        className="float-right block"
        type="button"
        onClick={() => props.close()}
      >
        <IoCloseCircle className="text-3xl"></IoCloseCircle>
      </button>
      <h1 className="font-bold text-4xl text-center">
        Change Personal Diversity Information
      </h1>
      <p className="opacity-60 my-4 text-center">
        Data given here is anonymised and can only be viewed as part of a group
        data pool
      </p>
      {personalDiversity && (
        <form
          className="mt-16 max-w-sm mx-auto"
          onSubmit={(e) => updatePersonalDiversity(e)}
        >
          {Object.entries(attributes).map(([attribute, options]) => (
            <div key={attribute} className="my-6">
              <label htmlFor={attribute.toString()}>
                {attribute.toString()[0].toUpperCase() +
                  attribute.toString().substring(1)}
              </label>
              <select
                name={attribute}
                id={attribute}
                defaultValue={personalDiversity[attribute]}
                className="bg-transparent border border-white rounded-md mx-2 px-1 float-right"
              >
                <option disabled selected value={"null"}>
                  -- select an option --
                </option>
                {options.map((option) => (
                  <option key={option.toString()} value={option.toString()}>
                    {option.toString()[0].toUpperCase() +
                      option.toString().substring(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="font-semibold bg-slate-100 text-slate-900 py-2 px-6 rounded-md mx-auto block mt-12">
            Update
          </button>
        </form>
      )}
    </div>
  );
}
