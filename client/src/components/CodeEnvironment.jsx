import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import CodeEditor from "./codeDisplay/CodeEditor";

import Output from "./outputDisplay/Output";

// import problems from "../Data/problems";
import GlobalContext from "../context/GlobalContext";

import QuestionDataDisplay from "./questionDisplay/QuestionDataDisplay";
import CreateRoomButton from "./room/createRoom/CreateRoomButton";
import FriendCodeDrawer from "./room/createRoom/FriendCodeDrawer";
import loadingAnimation from "./loadingAnimation.json";

import Timer from "./timerComp/Timer";
import Lottie from "lottie-react";

const CodeEnviornment = () => {
  const { problemId } = useParams();
  const { problems, problemLoading } = useContext(GlobalContext);

  const { socket, roomId, displayName, membersList, friendText } =
    useContext(GlobalContext);

  let problemIndex = 0;
  for (let i = 0; i < problems.length; i++) {
    if (problems[i].id === parseInt(problemId)) {
      problemIndex = i;
      break;
    }
  }
  const problem = problems[problemIndex];

  useEffect(() => {
    (function () {
      // horizontal direction
      (function resizableX() {
        const resizer = document.querySelector(".resizer-x");
        resizer?.addEventListener("mousedown", onmousedown);
        resizer?.addEventListener("touchstart", ontouchstart);

        // for mobile
        function ontouchstart(e) {
          e.preventDefault();
          resizer?.addEventListener("touchmove", ontouchmove);
          resizer?.addEventListener("touchend", ontouchend);
        }
        function ontouchmove(e) {
          e.preventDefault();
          const clientX = e.touches[0].clientX;
          const deltaX = clientX - (resizer._clientX || clientX);
          resizer._clientX = clientX;
          const l = resizer.previousElementSibling;
          const r = resizer.nextElementSibling;
          // LEFT
          if (deltaX < 0) {
            const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
            l.style.flex = `0 ${w < 10 ? 0 : w}px`;
            r.style.flex = "1 0";
          }
          // RIGHT
          if (deltaX > 0) {
            const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
            r.style.flex = `0 ${w < 10 ? 0 : w}px`;
            l.style.flex = "1 0";
          }
        }
        function ontouchend(e) {
          e.preventDefault();
          resizer.removeEventListener("touchmove", ontouchmove);
          resizer.removeEventListener("touchend", ontouchend);
          delete e._clientX;
        }

        // for desktop
        function onmousedown(e) {
          e.preventDefault();
          document?.addEventListener("mousemove", onmousemove);
          document?.addEventListener("mouseup", onmouseup);
        }
        function onmousemove(e) {
          e.preventDefault();
          const clientX = e.clientX;
          const deltaX = clientX - (resizer._clientX || clientX);
          resizer._clientX = clientX;
          const l = resizer.previousElementSibling;
          const r = resizer.nextElementSibling;
          // LEFT
          if (deltaX < 0) {
            const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
            l.style.flex = `0 ${w < 10 ? 0 : w}px`;
            r.style.flex = "1 0";
          }
          // RIGHT
          if (deltaX > 0) {
            const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
            r.style.flex = `0 ${w < 10 ? 0 : w}px`;
            l.style.flex = "1 0";
          }
        }
        function onmouseup(e) {
          e.preventDefault();
          document.removeEventListener("mousemove", onmousemove);
          document.removeEventListener("mouseup", onmouseup);
          delete e._clientX;
        }
      })();

      // vertical direction
      // (function resizableY() {
      //   const resizer = document.querySelector(".resizer-y");
      //   resizer?.addEventListener("mousedown", onmousedown);
      //   resizer?.addEventListener("touchstart", ontouchstart);

      //   // for mobile
      //   function ontouchstart(e) {
      //     e.preventDefault();
      //     resizer?.addEventListener("touchmove", ontouchmove);
      //     resizer?.addEventListener("touchend", ontouchend);
      //   }
      //   function ontouchmove(e) {
      //     e.preventDefault();
      //     const clientY = e.touches[0].clientY;
      //     const deltaY = clientY - (resizer._clientY || clientY);
      //     resizer._clientY = clientY;
      //     const t = resizer.previousElementSibling;
      //     const b = resizer.nextElementSibling;
      //     // UP
      //     if (deltaY < 0) {
      //       const h = Math.round(parseInt(getComputedStyle(t).height) + deltaY);
      //       t.style.flex = `0 ${h < 10 ? 0 : h}px`;
      //       b.style.flex = "1 0";
      //     }
      //     // DOWN
      //     if (deltaY > 0) {
      //       const h = Math.round(parseInt(getComputedStyle(b).height) - deltaY);
      //       b.style.flex = `0 ${h < 10 ? 0 : h}px`;
      //       t.style.flex = "1 0";
      //     }
      //   }
      //   function ontouchend(e) {
      //     e.preventDefault();
      //     resizer.removeEventListener("touchmove", ontouchmove);
      //     resizer.removeEventListener("touchend", ontouchend);
      //     delete e._clientY;
      //   }

      //   // for desktop
      //   function onmousedown(e) {
      //     e.preventDefault();
      //     document?.addEventListener("mousemove", onmousemove);
      //     document?.addEventListener("mouseup", onmouseup);
      //   }
      //   function onmousemove(e) {
      //     e.preventDefault();
      //     const clientY = e.clientY;
      //     const deltaY = clientY - (resizer._clientY || clientY);
      //     resizer._clientY = clientY;
      //     const t = resizer.previousElementSibling;
      //     const b = resizer.nextElementSibling;
      //     // UP
      //     if (deltaY < 0) {
      //       const h = Math.round(parseInt(getComputedStyle(t).height) + deltaY);
      //       t.style.flex = `0 ${h < 10 ? 0 : h}px`;
      //       b.style.flex = "1 0";
      //     }
      //     // DOWN
      //     if (deltaY > 0) {
      //       const h = Math.round(parseInt(getComputedStyle(b).height) - deltaY);
      //       b.style.flex = `0 ${h < 10 ? 0 : h}px`;
      //       t.style.flex = "1 0";
      //     }
      //   }
      //   function onmouseup(e) {
      //     e.preventDefault();
      //     document.removeEventListener("mousemove", onmousemove);
      //     document.removeEventListener("mouseup", onmouseup);
      //     delete e._clientY;
      //   }
      // })();
    })();
  }, []);

  if (problemLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ height: 350 }}
        />
        <h1 className="text-2xl mt-4 tracking-widest text-gray-200 font-semibold">
          Loading...
        </h1>
      </div>
    );
  }
  return (
    <>
      <CreateRoomButton className="absolute right-0  p-1 px-4" />
      <div className="flex justify-center item-center">
        <div className="flex justify-center item-center">
          <Link to="#" onClick={() => window.history.back()}>
            <img
              src="/Back.png"
              alt="<"
              className=" absolute left-0 mt-3 ml-2 w-4"
            />
          </Link>
          <h3 className="text-3xl mt-1 mr-10 absolute left-8">
            {" "}
            {problem?.title}{" "}
          </h3>
          {/* {socket && (
            <h1 className="text-3xl mt-1 mx-10">
              {" "}
              Number of participants : {membersList.length}
            </h1>
          )} */}
        </div>
        <div className="flex justify-between item-center">
          <Timer />
        </div>
      </div>
      <div className="m-5 resizable-x">
        <div id="app">
          <div className="resizable-x">
            <div style={{ flex: "40%" }}>
              <QuestionDataDisplay />
            </div>
            <div className="resizer-x" />
            <div className="resizable-x" style={{ flex: "60%" }}>
              <div style={{ flex: "100%" }}>
                <CodeEditor
                  socket={socket}
                  roomId={roomId}
                  displayName={displayName}
                  friendText={friendText}
                />
                <Output />
                {/* <div className="resizer-y"></div>
                <div className="resizable-y" style={{ flex: "60%" }}>
               
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FriendCodeDrawer />
    </>
  );
};

export default CodeEnviornment;
