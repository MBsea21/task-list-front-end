import PropTypes from 'prop-types';
import { useState } from 'react';

const TaskForm = ({addTaskData}) => {
  const [formField, setFormField] = useState({
    title: '',
    description: '',
    // isComplete: false,
  });

  const handleChange = (event) => {
    setFormField({ ...formField, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTaskData(formField);

    setFormField({ title: '', description: '' });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title"> Title </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formField.title}
        onChange={handleChange}
      />
      <label htmlFor="description"> Description </label>
      <input
        type="text"
        id="description"
        name="description"
        value={formField.description}
        onChange={handleChange}
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};

TaskForm.propTypes = {
  addTaskData: PropTypes.func.isRequired,
};
export default TaskForm;
