import Map from "../components/Map";
import Siidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Siidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
