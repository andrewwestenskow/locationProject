import React, { Component } from 'react'
import { View, Text, StyleSheet, CameraRoll, Button, PermissionsAndroid, FlatList, Image } from 'react-native'



class Photos extends Component {

  state = {
    photos: []
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
      first: 5,
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
        {this.state.photos.length > 0 &&
          <FlatList
            data={this.state.photos}
            renderItem={(item) => {
              console.log(item)
              return (
                <Image style={{height: 50, width: 50}} source={{ uri: item.item.node.image.uri }} />
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