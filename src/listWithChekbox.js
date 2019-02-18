import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import ReduceQuantityIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import _lodash from "lodash";
import Button from "@material-ui/core/Button";
import SelectReason from "./selectCancellationReason";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
    listValue: [
      { name: "ABC1", id: "ABC1", quantity: 3 },
      { name: "ABC2", id: "ABC2", quantity: 3 },
      { name: "ABC3", id: "ABC3", quantity: 3 },
      { name: "ABC4", id: "ABC4", quantity: 3 }
    ],
    deletedItems: []
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  reduceQuantity(id) {
    let listArray = Object.assign([], this.state.listValue);
    console.log("id ", id, "List Array ", listArray);
    console.log("Spread to Array ", [...listArray]);
    let selectedIndex = _lodash.findIndex([...listArray], { id: id });
    console.log("Selected Item ", selectedIndex);
    listArray[selectedIndex]["quantity"] =
      listArray[selectedIndex]["quantity"] == 1
        ? "Show Error"
        : --listArray[selectedIndex]["quantity"];
    listArray[selectedIndex]["isModified"] = true;
    console.log("Updated Selected Item ", listArray[selectedIndex]);
    this.setState(prevState => {
      console.log("Spreaded VAlue ", listArray);
      return {
        listValue: listArray
      };
    });
  }

  deleteItem(id) {
    let deletedItem = [];
    let listArray = [...this.state.listValue];
    let selectedIndex = _lodash.findIndex(listArray, { id: id });
    console.log("Array State Item B4 ", listArray);
    deletedItem.push(listArray[selectedIndex]);
    console.log("Selected Index ", selectedIndex);
    console.log("Deleted Item ", deletedItem);
    console.log("Array State Item After", listArray, selectedIndex);
    console.log("Spliced ", listArray.splice(selectedIndex, 1));
    console.log("Array State Item After Splice", listArray, selectedIndex);
    this.setState(
      prevState => {
        return {
          deletedItems: [...prevState.deletedItems, ...deletedItem],
          listValue: listArray
        };
      },
      () => {
        console.log("Updated State ", this.state);
      }
    );
  }

  tagReason() {
    let modifiedItem = _lodash.filter(this.state.listValue, {
      isModified: true
    });
    console.log("modifiedItem ", modifiedItem);
    let toBeItreated = [...modifiedItem, ...this.state.deletedItems];
    console.log("toBeItreated ", toBeItreated);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <h3>Select Item to Cancel</h3>
        <List className={classes.root}>
          {this.state.listValue.map(value => (
            <ListItem
              key={value.id}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value.id)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.name} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Quantity">{value.quantity}</IconButton>
                {value.quantity > 1 && (
                  <React.Fragment>
                    <IconButton
                      aria-label="Reduce Item"
                      onClick={() => {
                        this.reduceQuantity(value.id);
                      }}
                    >
                      <ReduceQuantityIcon />
                    </IconButton>
                  </React.Fragment>
                )}
                <IconButton
                  aria-label="Delete Item"
                  onClick={() => {
                    this.deleteItem(value.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => this.tagReason()}
        >
          Large
        </Button>
        <SelectReason />
      </React.Fragment>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);
