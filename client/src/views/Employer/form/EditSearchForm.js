import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import {
  jobTypes,
  styles,
  cuisines,
  shifts,
  wineKnowledges,
  cocktailKnowledges,
  poss,
  reservations,
} from '../../Employee/professionTypes';
// import { searchAndSavefilterProfessions } from '../../../store/actions/professions';
// import { loadSearchQuery } from '../../../store/actions/searchQuery';

const EditSearchForm = ({
  // searchAndSavefilterProfessions,
  history,
  slug,
  employerId,
  currentQuery: {
    _id,
    searchAddress,
    primary,
    primaryYears,
    shift,
    style,
    cuisine,
    wineKnowledge,
    cocktailKnowledge,
    systems,
  },
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      _id,
      searchAddress,
      primary,
      primaryYears,
      shift,
      style,
      cuisine,
      wineKnowledge,
      cocktailKnowledge,
      systems,
    },
  });

  const onSubmit = (formData) => {
    // searchAndSavefilterProfessions(
    //   formData,
    //   history,
    //   slug,
    //   employerId,
    //   _id,
    //   true
    // );
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Please confirm the address where you are looking to hire:</h2>
          <label htmlFor="street1">
            <span>street</span>
            <input
              type="text"
              name="searchAddress.street"
              id="street"
              // placeholder="Street"
              ref={register}
            />
          </label>
          <ErrorMessage errors={errors} name="searchAddress.street1" as="p" />
        </div>

        <div>
          <label htmlFor="searchAddress.state">
            <span>state</span>

            <select
              name="searchAddress.state"
              id="state"
              ref={register({ required: 'Pleae select state' })}
            >
              <option value="">-- Select a State --</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
          <ErrorMessage errors={errors} name="searchAddress.state" as="p" />
        </div>

        <div>
          <label htmlFor="searchAddress.zipcode">
            <span>zip code</span>
            <input
              type="text"
              name="searchAddress.zipcode"
              id="zipcode"
              ref={register({
                required: true,
                minLength: 5,
                maxLength: 5,
                pattern: /^[0-9]*$/,
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="searchAddress.zipcode"
            as="p"
            message="Please enter valid zip code"
          />
        </div>

        <div>
          <p>Please select the open position that you would like to fill</p>
          {jobTypes.map((jobType, i) => (
            <label htmlFor={jobType} key={`${jobType}-${[i + 1]}`}>
              <input
                type="radio"
                name="primary"
                id="primary"
                value={jobType}
                ref={register}
              />
              <span>{jobType}</span>
            </label>
          ))}
        </div>
        <div>
          <p>
            What is the minimum years of experience required for this position
          </p>
          <label htmlFor="primaryYears">
            <input
              type="number"
              name="primaryYears"
              id="primaryYears"
              ref={register}
            />
          </label>
        </div>

        <div>
          <p>Select the style of service that best describes the work:</p>
          {styles.map((st, i) => (
            <label htmlFor={st} key={`${st}-${[i + 1]}`}>
              <input
                type="radio"
                name="style"
                id="style"
                value={st}
                ref={register}
              />
              <span>{st}</span>
            </label>
          ))}
        </div>

        <div>
          <p>Please indicate which shift(s) the position is for:</p>
          {shifts.map((sh, i) => (
            <label htmlFor={sh} key={`${sh}-${[i + 1]}`}>
              <input
                type="checkbox"
                name="shift"
                id="shift"
                value={sh}
                ref={register}
              />
              <span>{sh}</span>
            </label>
          ))}
        </div>

        <div>
          <p>Select the cuisine the best describes the business:</p>
          {cuisines.map((cu, i) => (
            <label htmlFor={cu} key={`${cu}-${[i + 1]}`}>
              <input
                type="radio"
                name="cuisine"
                id="cuisine"
                value={cu}
                ref={register}
              />
              <span>{cu}</span>
            </label>
          ))}
        </div>

        <div>
          <p>Select the wine desired level:</p>
          {wineKnowledges.map((wine, i) => (
            <label htmlFor={wine} key={`${wine}-${[i + 1]}`}>
              <input
                type="radio"
                name="wineKnowledge"
                id="wineKnowledge"
                value={wine}
                ref={register}
              />
              <span>{wine}</span>
            </label>
          ))}
        </div>

        {/* <div>
          <p>Is cocktail Knowledge a factor for this new hire?</p>
          <label htmlFor="yes">
            <input type="radio" name="cocktailcheck" id="yes" value="yes" />
            <span>Yes</span>
          </label>

          <label htmlFor="no">
            <input type="radio" name="cocktailcheck" id="no" value="no" />
            <span>No</span>
          </label>
        </div> */}

        <div>
          <p>Select the cocktail desired level:</p>
          {cocktailKnowledges.map((cocktail, i) => (
            <label htmlFor={cocktail} key={`${cocktail}-${[i + 1]}`}>
              <input
                type="radio"
                name="cocktailnowledge"
                id="cocktailKnowledge"
                value={cocktail}
                ref={register}
              />
              <span>{cocktail}</span>
            </label>
          ))}
        </div>

        <div>
          <p>Select the operation system will be used for the new hire:</p>
          {poss.map((pos, i) => (
            <label htmlFor={pos} key={`${pos}-${[i + 1]}`}>
              <input
                type="checkbox"
                name="systems"
                id="systems"
                value={pos}
                ref={register}
              />
              <span>{pos}</span>
            </label>
          ))}
        </div>

        <div>
          <p>Select the operation system will be used for the new hire:</p>
          {reservations.map((reservation, i) => (
            <label htmlFor={reservation} key={`${reservation}-${[i + 1]}`}>
              <input
                type="checkbox"
                name="systems"
                id="systems"
                value={reservation}
                ref={register}
              />
              <span>{reservation}</span>
            </label>
          ))}
        </div>

        <input type="submit" value="Submit" onClick={handleSubmit(onSubmit)} />

        {/* If authorization was failed */}
        {/* {errorMessage ? <div>{errorMessage}</div> : ''} */}
      </form>
    </div>
  );
};

const mapStateToProps = ({
  employer: {
    employerData, filter, searchLoading
  },
}) => ({
  employerData, filter, searchLoading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSearchForm);
