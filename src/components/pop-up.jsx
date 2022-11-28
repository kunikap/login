import "./pop-up.css";

const PopUp = ({ isLoggedIn, closePopUp }) => {
  const handleClosePopUp = () => {
    closePopUp(false);
  };

  return (
    <div className="overlay">
      <div className="wrapper">
        <div className="close-btn-wrapper">
          <span className="close-btn" onClick={handleClosePopUp}>
            X
          </span>
        </div>
        {isLoggedIn ? (
          <p className="notification-title">Successfully Logged In</p>
        ) : (
          <p className="notification-title">Invalid Email or password</p>
        )}
      </div>
    </div>
  );
};

export default PopUp;
