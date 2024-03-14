import { View, Image } from 'react-native';

export default function EmojiSticker({ size, url }) {
  return (
    <View style={{ top: -350 }}>
      <Image source={url} resizeMode='contain' style={{ width: size, height: size }} />
    </View>
  )
}