import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../../store/actions/auth';

const ForgotPasswordForm = ({
  forgotPassword,
  errorMessage,
  isAuthenticated,
  slug,
}) => {
  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (formData) => {
    forgotPassword(formData);
  };

  //Redirect to each account page after logged in
  if (isAuthenticated && localStorage.getItem('role') === 'employer') {
    return <Redirect to={`/employers/${slug}`} />;
  }

  if (isAuthenticated && localStorage.getItem('role') === 'employee') {
    return <Redirect to={`/employees/${slug}`} />;
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <p>Select your role</p>
          <label htmlFor="employer">
            <span>Employer</span>
            <input
              type="radio"
              name="role"
              id="employer"
              value="employer"
              ref={register}
            />
          </label>
        </div>
        <div>
          <label htmlFor="employee">
            <span>Employee</span>
            <input
              type="radio"
              name="role"
              id="employee"
              value="employee"
              ref={register}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </label>
          {errors.email && <p>Please enter a valid email</p>}
        </div>

        <input
          type="submit"
          value="Send Instructions"
          onClick={handleSubmit(onSubmit)}
        />

        {/* If authorization was failed */}
        {errorMessage ? <div>{errorMessage}</div> : ''}
      </form>

      <div>
        <Link to="/login">Go Back</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // error massage when auth was failed
    errorMessage: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    slug: state.auth.slug,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordForm);
