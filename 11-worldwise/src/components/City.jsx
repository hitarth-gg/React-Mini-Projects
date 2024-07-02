import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams(); // here searchParams is used to read the search parameters from the url and setSearchParams is used to set / update the searchParams
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id); // Get city should be added in the dependency array to avoid the warning but doing so will result in an infinite loop because getCity will update the state and the component will re-render. See CitiesContext.js for the solution
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  // if (isLoading) return <Spinner />;

  // Conditionally render the component's content only when data is loaded
  if (isLoading ||  currentCity.id !== parseInt(id, 10)) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
