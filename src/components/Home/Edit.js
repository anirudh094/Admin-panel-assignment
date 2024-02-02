import React from "react";
import StartFirebase from "../../firebaseconfig";
import { ref, update, get, child } from "firebase/database";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

import InputControl from "../InputControl/InputControl";
import styles from "../Signup/Signup.module.css";

export class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      userName: "",
      email: "",
      fullname: "",
      phonenumber: "",
      dob: "",
      errorMsg: "",
      home: false,
    };
    this.interface = this.interface.bind(this);
  }

  componentDidMount() {
    this.setState({
      db: StartFirebase(),
    });
    this.subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userName: user.displayName, email: user.email });
      } else {
        this.setState({ userName: "" });
      }
    });
  }

  //  componentDidUpdate(){
  //   this.selectData();
  //  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.innerBox}>
            <p>Edit details</p>

            <h3>
              Username - <span>{this.state.userName}</span>
            </h3>

            <InputControl
              type="text"
              label="FullName"
              placeholder="Enter FullName"
              id="namebox"
              value={this.state.fullname}
              onChange={(e) => {
                this.setState({ fullname: e.target.value });
              }}
            />

            <InputControl
              type="number"
              label="Phone Number"
              placeholder="Enter PhoneNumber"
              id="phonebox"
              value={this.state.phonenumber}
              onChange={(e) => {
                this.setState({ phonenumber: e.target.value });
              }}
            />

            <InputControl
              type="date"
              label="Date of Birth"
              placeholder="Enter Date of Birth"
              id="datebox"
              value={this.state.dob}
              onChange={(e) => {
                this.setState({ dob: e.target.value });
              }}
            />

            <div className={styles.footer}>
              <b className={styles.error}>{this.state.errorMsg}</b>
              <button id="selectBtn" onClick={this.interface}>
                Select Data
              </button>
              <button id="editBtn" onClick={this.interface}>
                Edit Data
              </button>
              {this.state.home ? <Navigate to="/home" replace={true} /> : <></>}
            </div>
          </div>
        </div>
      </>
    );
  }

  interface(event) {
    const id = event.target.id;

    if (id === "editBtn") {
      this.updateData();
    }
    else if (id === "selectBtn") {
      this.selectData();
    }
  }

  getAllInputs() {
    return {
      name: this.state.fullname,
      phone: Number(this.state.phonenumber),
      dob: this.state.dob,
    };
  }

  //To update the data
  updateData() {
    const db = this.state.db;
    const data = this.getAllInputs();
    if (data.name && data.phone && data.dob) {
      this.setState({
        home: true,
      });
      update(ref(db, "Accounts/" + this.state.userName), {
        Fullname: data.name,
        Phonenumber: data.phone,
        dateofbirth: data.dob,
        email: this.state.email,
      }).catch((error) => {
        this.setState({
          errorMsg: error,
        });
      });
    } else {
      this.setState({
        errorMsg: "Fill all fields",
      });
      return;
    }
  }


  //For Selecting Required Data
  selectData() {
    const dbref = ref(this.state.db);
    const username = this.state.userName;

    get(child(dbref, "Accounts/" + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            fullname: snapshot.val().Fullname,
            phonenumber: snapshot.val().Phonenumber,
            dob: snapshot.val().dateofbirth,
          });
        }
      })
      .catch((error) => {
        alert("there was an error, details: " + error);
      });
  }
}
