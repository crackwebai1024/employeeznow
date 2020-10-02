import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../../store/actions/auth';

const ResetPasswordForm = ({
  resetPassword,
  errorMessage,
  isAuthenticated,
  slug,
  match,
}) => {
  // user is redirected to this route via email (forgotpassword)
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (formData) => {
    // get token from params and send it to backend
    resetPassword(formData, match.params.token);
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
          <label htmlFor="password">
            <span>password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="on"
              ref={register({
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at leaset 8 charactors',
                },
              })}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="passwordConfirm">
            <span>password confirm</span>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Password Confirm"
              autoComplete="on"
              ref={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
          </label>
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </div>

        <input type="submit" value="Confirm" onClick={handleSubmit(onSubmit)} />

        {/* If authorization was failed */}
        {errorMessage ? <div>{errorMessage}</div> : ''}
      </form>
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

export default connect(mapStateToProps, { resetPassword })(ResetPasswordForm);
