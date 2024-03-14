import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ url, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : url

  return (
    <Image source={imageSource} style={imgStyle} />
  )
}

const imgStyle = {
  width: 320,
  height: 440,
  borderRadius: 18
}