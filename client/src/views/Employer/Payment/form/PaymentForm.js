
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Grid, Typography, Box, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import StripeInput from '../components/StripeInput';
import { makeStyles } from '@material-ui/core/styles'
import { CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';

const useStyles = makeStyles(theme => ({
    mainBox: {
        position: "relative",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
    button: {
        width: "100%",
        margin: 'auto',
    },
    error: {
        color: 'red',
        fontSize: '12px'
    },
    buttonWrapper: {
        marginTop: '1rem',
        marginBottom: "1rem"
    }
}));

const PaymentForm = (props) => {
    const { actions, formValues, stripe, match, paid } = props
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const classes = useStyles()
    const cardsLogo = [
        "amex",
        "cirrus",
        // "diners",
        "dankort",
        // "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        // "visaelectron",
    ];

    const user = JSON.parse(getUser());
    const { slug } = match.params

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
        setError("")
        e.preventDefault()
        stripe.createToken({})
            .then(result => {
                if (!result.error) {
                    const data = {
                        token: result.token,
                        id: user._id,
                        employeeID: slug,
                        email: email
                    }
                    actions.payRequest(data)
                } else {
                    setError(result.error.message)
                }
            })
    }

    if(paid){
        history.push(`/candidate/${slug}`)
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
                    <Grid item xs={12} justify="space-between">
                        {cardsLogo.map(e => <img key={e} src={`../img/cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={email}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEmail(e.target.value)}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Credit Card Number"
                            name="ccnumber"
                            variant="outlined"
                            size="small"
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Expiration Date"
                            name="ccexp"
                            variant="outlined"
                            size="small"
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CVC"
                            name="cvc"
                            variant="outlined"
                            size="small"
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
                <Typography className={classes.error}>
                    {error}
                </Typography>
            </Grid>
            <Grid container item xs={12} spacing={3} className={classes.buttonWrapper}>
                <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                    >
                        cancel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >
                        PAY
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </form>
}

const mapStateToProps = ({
    employer: {
        formValues, paid
    },
}) => ({
    formValues, paid
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...employerActions,
    }, dispatch),
});

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));