import React, { useReducer } from 'react';
import styles from './form.module.css';

const INITAL_STATE = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'IDLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value };

    case 'updateStatus':
      return { ...state, status: action.status };

    case 'reset':
    default:
      return INITAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITAL_STATE);

  const setStatus = (status) => dispatch({ type: 'updateStatus', status });

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('PENDING');

    setTimeout(() => setStatus('SUCCESS'), 1000);
    console.log(state);
  };

  if (state.status === 'SUCCESS') {
    return (
      <p className={styles.success}>
        Message Sent{' '}
        <button
          type="reset"
          onClick={() => dispatch({ type: 'reset' })}
          className={`${styles.name} ${styles.centered}`}
        >
          reset
        </button>
      </p>
    );
  }

  return (
    <>
      {state.status === 'ERROR' && (
        <p className={styles.error}>Something went wrong, please try again</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === 'PENDING' && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={updateFieldValue('name')}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue('email')}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={state.subject}
            onChange={updateFieldValue('subject')}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.textarea}
            value={state.body}
            onChange={updateFieldValue('body')}
          ></textarea>
        </label>
        <button className={styles.button}>send</button>
      </form>
    </>
  );
};

export default Form;