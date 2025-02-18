import React, { Component } from "react";
import Navbar from "./Navbar";
import Progress from "./progressbar";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import firebase from "firebase/app";
import "./Attendance.css";

export default class Attendance extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "person_add", link: "/Train" },
    ],
    response: "Nope....",
    myname: "",
    myemail: "",
    myusername: "",
    ihtml: "Select File",
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");
        this.setState({ username: user.email });
        Axios.get(
          "https://myapi.radiantdaman.com/db/email/" + this.state.username
        ).then((res) => {
          this.setState({ myname: res.data.name });
          this.setState({ myemail: res.data.email });
          this.setState({ myusername: res.data.username });
          this.setState({ myuserid: res.data.userid });
          Axios.get(
            "https://myapi.radiantdaman.com/Attendance/" + this.state.myusername
          ).then((data) => {
            this.setState({ myweek: data.data.week });
            this.setState({ myattendance: data.data.attendance });
            this.setState({ mydates: data.data.dates });
            console.log(data.data);
            var mylist = ["Su", "M", "T", "W", "Th", "F", "S"];
            var m = 0;
            for (var i = 0; i < mylist.length; i++) {
              if (data.data.week[i] == true) {
                var holiweek = document.getElementById(mylist[i]);
                holiweek.classList.add("present");
                m = m + 1;
              }
              if (data.data.week[i] == false) {
                var holiweek = document.getElementById(mylist[i]);
                holiweek.classList.add("absent");
              }
            }
            this.setState({
              weekcent: ((m / data.data.week.length) * 100).toFixed(2),
            });
            var j = 0;
            var k = 0;
            for (
              var i = data.data.dates[0];
              i < data.data.dates.length + data.data.dates[0];
              i++
            ) {
              if (data.data.attendance[j] === true) {
                var holi = document.getElementById(i);
                holi.classList.add("present");
                k = k + 1;
              } else {
                var holi = document.getElementById(i);
                holi.classList.add("absent");
              }
              j = j + 1;
            }
            this.setState({ monthcent: ((k / j) * 100).toFixed(2) });
          });
        });
      }
    });
    var elem = document.querySelector(".modal");
    M.Modal.init(elem);

    setTimeout(() => {
      const progress = document.querySelector(".progress-done");
      progress.style.opacity = 1;
      progress.style.width = progress.getAttribute("data-done") + "%";
    }, 1500);

    setTimeout(() => {
      const progress = document.querySelector(".progress-done2");
      progress.style.opacity = 1;
      progress.style.width = progress.getAttribute("data-done") + "%";
    }, 2000);

    setTimeout(() => {
      const progress = document.querySelector(".progress-done3");
      progress.style.opacity = 1;
      progress.style.width = progress.getAttribute("data-done") + "%";
    }, 2500);
  }

  render() {
    return (
      <div
        className="bg-contact100"
        style={{ touchAction: "none", height: "100%" }}
      >
        <Navbar
          title="Voice Your ID"
          navicons={this.state.navdata}
          login="true"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
          color="rgba(0,0,0,0.75)"
          userid={this.state.myuserid}
        ></Navbar>
        <div className="background">
          <div className="darken">
            <ul className="collapsible attdbox">
              <li>
                <div className="collapsible-header ch">
                  <i className="material-icons">event_available</i>
                  <span className="T">Weekly</span>
                  <div className="progress">
                    <div
                      className="progress-done"
                      data-done={this.state.weekcent}
                    >
                      {this.state.weekcent}
                    </div>
                  </div>
                </div>
                <div className="collapsible-body weekly">
                  <table>
                    <tr>
                      <td className="Cent" id="Su">
                        Sun
                      </td>
                      <td className="Cent" id="M">
                        Mon
                      </td>
                      <td className="Cent" id="T">
                        Tue
                      </td>
                    </tr>
                    <tr>
                      <td className="Cent" id="W">
                        Wed
                      </td>
                      <td className="Cent" id="Th">
                        Thu
                      </td>
                      <td className="Cent" id="F">
                        Fri
                      </td>
                    </tr>
                    <tr>
                      <td className="CentN" id="">
                        Nan
                      </td>
                      <td className="Cent" id="S">
                        Sat
                      </td>
                      <td className="CentN" id="">
                        Nan
                      </td>
                    </tr>
                  </table>
                </div>
              </li>
              <li className="active">
                <div className="collapsible-header ch">
                  <i className="material-icons ">event</i>
                  <span className="T">Monthly</span>
                  <div className="progress2">
                    <div
                      className="progress-done2"
                      data-done={this.state.monthcent}
                    >
                      {this.state.monthcent}
                    </div>
                  </div>
                </div>
                <div className="collapsible-body monthly">
                  <table>
                    <tr>
                      <td id="1">1</td>
                      <td id="2">2</td>
                      <td id="3">3</td>
                      <td id="4">4</td>
                      <td id="5">5</td>
                      <td id="6">6</td>
                      <td id="7">7</td>
                    </tr>
                    <tr>
                      <td id="8">8</td>
                      <td id="9">9</td>
                      <td id="10">10</td>
                      <td id="11">11</td>
                      <td id="12">12</td>
                      <td id="13">13</td>
                      <td id="14">14</td>
                    </tr>
                    <tr>
                      <td id="15">15</td>
                      <td id="16">16</td>
                      <td id="17">17</td>
                      <td id="18">18</td>
                      <td id="19">19</td>
                      <td id="20">20</td>
                      <td id="21">21</td>
                    </tr>
                    <tr>
                      <td id="22">22</td>
                      <td id="23">23</td>
                      <td id="24">24</td>
                      <td id="25">25</td>
                      <td id="26">26</td>
                      <td id="27">27</td>
                      <td id="28">28</td>
                    </tr>
                    <tr>
                      <td id="29">29</td>
                      <td id="30">30</td>
                      <td id="31">31</td>
                      <td id="1"></td>
                      <td id="1"></td>
                      <td id="1"></td>
                      <td id="1"></td>
                    </tr>{" "}
                  </table>
                </div>
              </li>
              <li>
                <div className="collapsible-header ch">
                  <i className="material-icons">event_note</i>
                  <span className="T">Yearly</span>
                  <div className="progress3">
                    <div className="progress-done3" data-done="70">
                      70%
                    </div>
                  </div>
                </div>
                <div className="collapsible-body yearly">
                  <table>
                    <tr>
                      <Progress text="Jan"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Feb"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Mar"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Apr"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="May"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Jun"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Jul"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Aug"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Sep"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Oct"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Nov"> </Progress>
                    </tr>
                    <tr style={{ width: "100%" }}>
                      <Progress text="Dec"> </Progress>
                    </tr>
                  </table>
                </div>
              </li>
            </ul>
          </div>

          {/* <h1>{this.state.response}</h1>
        <div className="container">
          <button
            data-target="modal2"
            className="btn-floating waves-effect waves lighten right modal-trigger"
          >
            UP
          </button>
        </div> */}
          {/* <div id="modal2" className="modal">
          <div className="modal-content">
            <h4>Enter Username</h4>
            <div id="username" className="input-field">
              <input
                placeholder="Your Name"
                type="text"
                className="validate"
              ></input>
            </div>
            <div className="modal-footer">
              <button
                className="btn-floating waves-effect waves lighten modal-close"
                onClick={this.handleUpload}
              >
                Add User
              </button>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    );
  }
}
