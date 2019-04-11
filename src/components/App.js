import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography/Typography"
import Grid from '@material-ui/core/Grid'
import SequenceInput from './SequenceInput'
import { Motion, spring} from 'react-motion';

import LocationTable from './LocationTable'
import Cite from './Cite'
import SequenceStatus from "./SequenceStatus";
import Features from "./Features";

const styles = theme => ({
    attribution: {
        textAlign: "center",
        marginTop: theme.spacing.unit * 2
    },
    root: {
        maxWidth: 1100,
        margin: "auto",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    search: {
        width: "100%"
    },
    textField: {
        width: "100%",
        textAlign: "center"
    },
    fadingComponents: {
        transition: '.5s'
    },
});

const uniprotRegex = /^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/;


class App extends React.Component {
    state = {
        query: '',
        valid: true,
        ready: false
    };

    timeout = null;

    onQueryChange = (query) => {
        if(uniprotRegex.test(query)){
            this.setState({
                valid: true,
                ready: true
            });
        } else {
            this.setState({
                valid: false,
            })
        }
    };

    onInputChange = (event) => {
        let value = event.target.value;

        if(uniprotRegex.test(value)){
            this.setState({
                query: value,
                ready: false
            });
            window.clearTimeout(this.timeout);
            this.onQueryChange(value)
        } else {
            this.setState({
                query: value,
                ready: false
            });

            window.clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                this.onQueryChange(value)
            }, 1000);
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={12}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item className={classes.search} xs={12}>
                            <SequenceInput />
                        </Grid>
                        <Grid item className={classes.search} xs={12}>
                            <SequenceStatus />
                        </Grid>
                        <Grid item className={classes.search} xs={12}>
                            <Features />
                        </Grid>
                        <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(20)}}>
                            {value =>
                                <Grid item className={classes.fadingComponents} style={{opacity: value.opacity}} xs={12} md={6} xl={6}>
                                    <LocationTable data={this.state} />
                                </Grid>
                            }
                        </Motion>
                        <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(20)}}>
                            {value =>
                                <Grid item className={classes.fadingComponents} style={{opacity: value.opacity}} xs={12} md={6} xl={6}>
                                    <LocationTable data={this.state} />
                                </Grid>
                            }
                        </Motion>
                        <Grid item className={classes.search} xs={12}>
                            <Cite/>
                        </Grid>
                        <Grid item className={classes.search} xs={12}>
                            <Typography variant={"caption"} className={classes.attribution}>
                                Website by <a rel="noopener noreferrer" href="https://christian.dallago.us" target="_blank">Christian Dallago</a>.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);