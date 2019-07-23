import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, PermissionsAndroid, FlatList, Image } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import Photo from './Photo'
import SelectedPhoto from './SelectedPhoto'

class Photos extends Component {

  state = {
    photos: [],
    first: 50,
    selected: [],
    show: []
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

  adjustSelected = (photo, action) => {
    let selected = [...this.state.selected]
    action === 'add' ? selected.push(photo) : 
    selected.splice(selected.findIndex(element => element === photo), 1)

    this.setState({
      selected
    })
  }

  confirm = () => {
    this.setState({
      show: [...this.state.selected],
      photos: [],
      selected: []
    })
  }

  render() {
    return (
      <View>
        <FlatList
        numColumns={3}
        data={this.state.show}
        renderItem={(item) => {
          return (
            <SelectedPhoto
            src={item.item} />
          )
        }}
        />
        <Button title='get photos' onPress={this.getPhotos} />
        <Button title={this.state.show.length > 0 ? 'Cancel' : 'Confirm'} onPress={this.confirm}/>
        {this.state.photos.length > 0 &&
          <FlatList
            numColumns={3}
            data={this.state.photos}
            renderItem={(item) => {
              return (
                <Photo 
                adjust={this.adjustSelected}
                src={item.item.node.image.uri} />
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