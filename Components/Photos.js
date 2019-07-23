import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, PermissionsAndroid, FlatList, Image } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import Photo from './Photo'



class Photos extends Component {

  state = {
    photos: [],
    first: 50
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Access Storage',
          'message': 'Access Storage for the pictures'
        }
      )

      console.log(granted)

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use read from the storage")
      } else {
        console.log("Storage permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getPhotos = () => {
    const options = {
      first: this.state.first,
      assetType: 'Photos',
    }
    CameraRoll.getPhotos(options).then(photos => {
      console.log(photos)
      this.setState({
        photos: photos.edges
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <View>
        <Button title='get photos' onPress={this.getPhotos} />
        <Button title='confirm' />
        {this.state.photos.length > 0 &&
          <FlatList
            numColumns={3}
            data={this.state.photos}
            renderItem={(item) => {
              return (
                <Photo src={item.item.node.image.uri} />
              )
            }}
          />}
      </View>
    )
  }
}
export default Photos

const styles = StyleSheet.create({

})