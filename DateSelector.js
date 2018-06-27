import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'


dateyyyymmdd = () => {
  var date = new Date();
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();
  return [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
}

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date: this.props.date}
  }

  

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2009-01-03"
        maxDate={dateyyyymmdd()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date});this.props.onchange(date);}}
      />
    )
  }
}