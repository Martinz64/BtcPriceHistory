import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyDatePicker from './DateSelector'

class Home extends React.Component {
  static navigationOptions = {
    title: "₿ Price history"
  }

  StartDate = "2012-01-03"
  EndDate = "2013-01-03"


  loadPage = function(){
    const { navigation } = this.props;
    console.log('https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=' + this.StartDate + '&end=' + this.EndDate);
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=' + this.StartDate + '&end=' + this.EndDate,{method:'GET'}).then(function(r){
          return r.json();
        }).then(function(response){
          let responseJSON = response
          if (typeof responseJSON !== null){
            console.log(responseJSON)
            navigation.push('DataView', responseJSON);
          }
        }).catch(function(error){
          console.log(error.message);
          alert(error.message);
        });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bitcoin price history</Text>
        <View>
          <MyDatePicker onchange={(date) => {this.StartDate=date;}} />
          <Text>|</Text>
          <MyDatePicker onchange={(date) => {this.EndDate=date;}} />
        </View>
        <Text>.</Text>
        <Button title="Get history" style={styles.bigButton} onPress={() => {this.loadPage()}} />
      </View>
    );
  }
}

//hh

class Data extends React.Component {

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    if(this.params != null){
      this.state = {
        data: params.data.bpi
      }
    } else {
      this.state = {
        data:{
          bpi:{
            Error:"no paramz ¯\_(ツ)_/¯"
          }
        }
      }
      console.log("No paramz ¯\_(ツ)_/¯")
    }
  }

  renderData = () => {
    let data = this.state.data
    let ret = [];
    for (var d in data) {
      if(data[d]){
        ret.push({date:d,price:data[d]});
      }
    }

    return ret.map((item) => {
      return (<Text>{item.date} W {item.price}</Text>)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.renderData()}
        </View>
      </View>
    );
  }
}


module.exports = createStackNavigator({
  Start: {screen: Home},
  DataView: {screen: Data},
  initialRouteName: 'Start'
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bigButton: {
    marginTop:'10px',
    padding:'20px'
  }
});
