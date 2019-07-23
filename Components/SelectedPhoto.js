import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class SelectedPhoto extends Component {

  state = {
    selected: false
  }

  select = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback style={!this.state.selected ? styles.container : styles.selected} onPress={this.select}>
        <View style={!this.state.selected ? styles.container : styles.selected}>
          <Image style={!this.state.selected ? styles.normal : styles.selected} source={{ uri: this.props.src }} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
export default SelectedPhoto

const styles = StyleSheet.create({
  container: {
    width: (width / 3),
    height: (width / 3)
  },
  normal: {
    width: (width / 3),
    height: (width / 3)
  },
  selected: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: 10
  }
})