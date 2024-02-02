import React from "react";
import StartFirebase from "../../firebaseconfig";
import { ref, onValue, orderByKey, query, equalTo } from "firebase/database";
import {auth } from "../../firebase";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const db = StartFirebase();

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      tableData: [],
    };
  }

  componentDidMount() {
    this.subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userName: user.displayName });
      }
    });
  }

  componentDidUpdate() {
    const dbref = query(
      ref(db, "Accounts"),
      orderByKey(),
      equalTo(this.state.userName)
    );

    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerBox}>
          {this.state.tableData.map((row, index) => {
            return (
              <div>
                <h2>
                  Username - <span>{this.state.userName}</span>
                </h2>
                <br></br>
                <h2>
                  Fullname - <span>{row.data.Fullname}</span>
                </h2>
                <br></br>
                <h2>
                  Email - <span>{row.data.email}</span>
                </h2>
                <br></br>
                <h2>
                  PhoneNumber - <span>{row.data.Phonenumber}</span>
                </h2>
                <br></br>
                <h2>
                  Date of Birth - <span>{row.data.dateofbirth}</span>
                </h2>
                <br></br>
                <div className={styles.footer}>
                  <Link to={"/edit"}>
                    <button>Edit Details</button>
                  </Link>
                  <Link to={"/login"}>
                    <button>SignOut</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
