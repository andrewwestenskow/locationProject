import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'

const width = Dimensions.get('screen').width

class Photo extends Component {

  state={
    selected: false
  }

  select = () => {
    let action
    if(!this.state.selected){
      action = 'add'
    } else {
      action = 'remove'
    }
    this.setState({
      selected: !this.state.selected
    })

    this.props.adjust(this.props.src, action)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.select}>
        <View style={styles.container}>
          <Image style={{position: 'absolute', height: (width / 3), width: (width / 3) }} source={{ uri: this.props.src }} />
          <View style={this.state.selected ? styles.box : styles.empty}>

          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
export default Photo

const styles = StyleSheet.create({
  container: {
    width: (width / 3),
    height: (width / 3)
  },

  box: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  empty: {
    height: '100%',
    width: '100%'
  }
})