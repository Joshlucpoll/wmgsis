import {
  DiversityOptions,
  getDiversityData,
  getDiversityOptions,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import EditDiversity from "./editDiversity";

function stringToFloat(str: string) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return parseFloat("0." + hash.toString().replace("-", ""));
}

export default function Diversity() {
  const [diversityData, setDiversityData] = useState<object>({});
  const [attribute, setAttribute] = useState("gender");
  const [group, setGroup] = useState("WM161");
  const [options, setOptions] = useState<DiversityOptions>();

  const [editIsOpen, setEditIsOpen] = useState(false);

  useEffect(() => {
    getDiversityOptions(localStorage.getItem("access_token")).then(
      (options: DiversityOptions) => {
        setOptions(options);
      }
    );
    updateData({});
  }, []);

  async function updateData({
    newAttribute = attribute,
    newGroup = group,
  }: {
    newAttribute?: string;
    newGroup?: string;
  }) {
    const newDiversityData = await getDiversityData(
      newAttribute,
      newGroup,
      localStorage.getItem("access_token")
    );

    setDiversityData(newDiversityData);
  }

  return (
    <div className="text-white">
      {editIsOpen && (
        <EditDiversity close={() => setEditIsOpen(false)}></EditDiversity>
      )}
      <div className="flex flex-row justify-between items-start">
        <div>
          <h1 className="font-bold text-4xl">Diversity</h1>
          <p className="opacity-60 my-4">
            Support transparency with diversity and inclusion on campus
          </p>
        </div>
        <button
          className="font-semibold bg-slate-100 text-slate-900 py-2 px-6 rounded-md"
          type="button"
          onClick={() => setEditIsOpen(true)}
        >
          Edit Personal Diversity
        </button>
      </div>
      <p>
        Showing the
        <select
          name="attribute"
          id="attribute"
          className="bg-transparent border border-white rounded-md mx-2 px-1"
          value={attribute}
          onChange={(e) => {
            setAttribute(e.target.value);
            updateData({ newAttribute: e.target.value });
          }}
        >
          {options &&
            options.attributes.map((element) => (
              <option key={element} value={element}>
                {element[0].toUpperCase() + element.substring(1)}
              </option>
            ))}
        </select>
        diversity
      </p>
      <p className="mt-4">
        within
        <select
          name="groups"
          id="groups"
          className="bg-transparent border border-white rounded-md mx-2 px-1"
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
            updateData({ newGroup: e.target.value });
          }}
        >
          {options &&
            options.groups.map((element) => (
              <option key={element} value={element}>
                {element[0].toUpperCase() + element.substring(1)}
              </option>
            ))}
        </select>
        group
      </p>
      <section className="flex flex-col xl:flex-row justify-between items-center gap-24 mt-24">
        {diversityData && (
          <div className="bg-[#271B3C] p-8 rounded-lg min-w-[300px]">
            <h1 className="font-bold text-2xl mb-4">Results</h1>
            {diversityData &&
              Object.keys(diversityData).map((k) => (
                <div key={k} className="my-4">
                  <div className="inline">
                    <div
                      style={{
                        background:
                          "#" +
                          (0x1000000 + stringToFloat(k) * 0xffffff)
                            .toString(16)
                            .substr(1, 6),
                      }}
                      className={`float-left h-[1rem] w-[1rem] mt-1 mr-2 rounded-sm`}
                    ></div>
                    {k}
                  </div>
                  <code className="inline float-right mx-2">
                    {(
                      (diversityData[k] /
                        Object.values(diversityData).reduce(
                          (a, b) => a + b,
                          0
                        )) *
                      100
                    ).toFixed(2)}
                    %
                  </code>
                </div>
              ))}
          </div>
        )}
        {diversityData && (
          <PieChart
            className="relative max-w-xl flex-grow"
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{ fontSize: "0.2rem" }}
            data={Object.keys(diversityData).map((k) => {
              return {
                title: k.toString(),
                value: diversityData[k],
                color:
                  "#" +
                  (0x1000000 + stringToFloat(k) * 0xffffff)
                    .toString(16)
                    .substr(1, 6),
              };
            })}
          />
        )}
      </section>
    </div>
  );
}
