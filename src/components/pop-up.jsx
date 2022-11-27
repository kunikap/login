const PopUp = ({ isLoggedIn }) => {
  return (
    <div className="notification-toast">
      {isLoggedIn ? (
        <p className="notification-title">Successfully Logged In</p>
      ) : (
        <p className="notification-message">Invalid Email or password</p>
      )}
    </div>
  );
};

export default PopUp;
