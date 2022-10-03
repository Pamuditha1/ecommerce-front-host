import Main from "./Main";
import "react-toastify/dist/ReactToastify.css";
import "./css/accept.css";

function App() {
  return (
    <>
      <Main />
      <button
        id="accept-btn"
        className="accept-btn"
        name="accept-btn"
        style={{ position: "fixed", bottom: 50, right: 50 }}
      >
        Accept
      </button>
    </>
  );
}

export default App;
