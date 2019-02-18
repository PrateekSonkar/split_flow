import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  }
});

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      reasonForCancellation: [
        "Guest Cancelled Order",
        "Guest Changed Order",
        "Guest Changed Quantity",
        "Wrong Order Punched By Waiter",
        "Order Delayed by Kitchen/Bar",
        "Any Other"
      ],
      itemDebitedTo: [
        "Debit to Guest",
        "Debit to Waiter",
        "Spoiled",
        "Complementary to Guest for public relation",
        "Complementary to Guest for sales promotion"
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleChange = event => {
    console.log("I was called");
    this.setState({ selectedValue: event.target.value });
  };

  handleListItemClick = (event, index, keyTo) => {
    this.setState({ [keyTo]: index });
  };

  saveDetail = () => {
    console.log("Object to be saved ", {
      isFoodPrepared: this.state.selectedValue,
      reasonOfCancellation: this.state.reasonForCancellation[
        this.state.selectedIndexReason
      ],
      debitedTo:
        this.state.selectedValue == "true"
          ? this.state.itemDebitedTo[this.state.selectedIndexDebit]
          : ""
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ background: "grey" }}>
        <Paper className={classes.root} elevation={1} color="secondary">
          <Typography variant="h5" component="h3">
            Select Reason
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12} lg={6}>
              Is Food Prepared ?
            </Grid>
            <Grid item xs={12} lg={6}>
              <React.Fragment>
                {"Yes"}
                <Radio
                  checked={this.state.selectedValue === "true"}
                  onChange={this.handleChange}
                  value={true}
                  name="radio-button-demo"
                  aria-label="Yes"
                />
                {"No"}
                <Radio
                  checked={this.state.selectedValue === "false"}
                  onChange={this.handleChange}
                  value={false}
                  name="radio-button-demo"
                  aria-label="No"
                />
              </React.Fragment>
            </Grid>
            <Grid item xs={12} lg={6}>
              Reason for cancellation
              <List component="nav">
                {this.state.reasonForCancellation.map((value, index) => {
                  return (
                    <ListItem
                      key={`${value}-${index}`}
                      button
                      selected={this.state.selectedIndexReason === index}
                      onClick={event =>
                        this.handleListItemClick(
                          event,
                          index,
                          "selectedIndexReason"
                        )
                      }
                    >
                      <ListItemText primary={value} />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            {this.state.selectedValue === "true" && (
              <React.Fragment>
                <Grid item xs={12} lg={6}>
                  Prepared Food to be debited to ?
                  {this.state.itemDebitedTo.map((value, index) => {
                    return (
                      <ListItem
                        key={`${value}-${index}`}
                        button
                        selected={this.state.selectedIndexDebit === index}
                        onClick={event =>
                          this.handleListItemClick(
                            event,
                            index,
                            "selectedIndexDebit"
                          )
                        }
                      >
                        <ListItemText primary={value} />
                      </ListItem>
                    );
                  })}
                </Grid>
              </React.Fragment>
            )}
          </Grid>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            onClick={() => this.saveDetail()}
          >
            Save
          </Button>
        </Paper>
      </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
