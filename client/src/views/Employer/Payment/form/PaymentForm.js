
import React from 'react';
import { TextField, Grid, Typography, Box, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StripeInput from '../components/StripeInput';
import { makeStyles } from '@material-ui/core/styles'
import { CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';

const useStyles = makeStyles(theme => ({
    mainBox: {
        position: "relative",
        marginTop: "-8px",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
}));

const PaymentForm = (props) => {
    const { actions, formValues, stripe } = props
    const classes = useStyles()
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
    const handleSubmit = (e) => {
        e.preventDefault()
        stripe.createToken({})
            .then(result => {
                console.log(result, "console.log")
            })
    }

    return <form onSubmit={handleSubmit}>
        <Box className={classes.mainBox}>
            <Grid
                container
                xs={12}
                spacing={3}
                // direction="column"
                justify="space-around"
                alignItems="center"
                style={{ height: "300px" }}
            >
                <Grid container item xs={12}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6">Payment Data</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} justify="space-between">
                        {cardsLogo.map(e => <img key={e} src={`./img/cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
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
                                inputComponent: StripeInput,
                                inputProps: {
                                    component: CardExpiryElement
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
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="secondary"
            >
                PAY
        </Button>
        </Box>
    </form>
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

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));

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