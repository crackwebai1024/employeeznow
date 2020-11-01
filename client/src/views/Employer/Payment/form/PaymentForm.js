
import React from 'react';
import { TextField, Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StripeInput from '../components/StripeInput';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ actions, formValues} ) => {
    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];
    
    const inputHandle = (e) => {
        let key = e.target.name;
        let value = e.target.value
        let newFormValues = {
            ...formValues,
            [key]: value
        }
        actions.setFormValues(newFormValues)
    }

    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Data</Typography>
            </Grid>
            <Grid container item xs={12} sm={9} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={`./img/cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
            </Grid>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Autocomplete
                options={currencies}
                getOptionLabel={option => option.code}
                renderOption={option => <>{option.name} ({option.code})</>}
                renderInput={params =>
                    <TextField
                        label="Currency"
                        name="currency"
                        variant="outlined"
                        onChange={inputHandle}
                        fullWidth
                        {...params}
                    />
                }
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                onChange={inputHandle}
                required
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="Expiration Date"
                name="ccexp"
                variant="outlined"
                required
                onChange={inputHandle}
                InputProps={{
                    inputComponent :StripeInput,
                    inputProps: {
                        component : CardExpiryElement
                    }
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardCvcElement
                    }
                }}
                onChange={inputHandle}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
    </>
}

const mapStateToProps = ({
    employer: {
        formValues
    },
}) => ({
    formValues
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...employerActions,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);

const currencies = [
    {
        "symbol": "AED",
        "name": "United Arab Emirates Dirham",
        "symbol_native": "د.إ.‏",
        "decimal_digits": 2,
        "rounding": 0,
        "code": "AED",
        "name_plural": "UAE dirhams"
    }
]