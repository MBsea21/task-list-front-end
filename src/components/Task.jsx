import PropTypes from "prop-types";

import "./Task.css";

const Task = ({ id, title, isComplete, onComplete, onDelete }) => {
  // const [complete, setComplete] = useState(isComplete);

  const onClickComplete = () => {
    onComplete(id);
  };
  const onClickDelete = () => {
    onDelete(id);
  };
  const buttonClass = isComplete ? "tasks__item__toggle--completed" : "";

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onClickComplete}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={onClickDelete}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
