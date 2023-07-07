import { memo } from "react";
import styles from "./css/AboutUs.module.css";

function AboutUs() {
	return(
        <>
            <h1 className={styles.testing}>About Us</h1>
        </>
    );
}

export default memo(AboutUs);