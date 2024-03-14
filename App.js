import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { useState } from 'react';
import CircleButton from './components/CircleButton'
import IconButton from './components/IconButton'
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require('./assets/background-image.png');

export default function App() {
  // 选中贴图
  const [pickedEmoji, setPickedEmoji] = useState(null)
  // 控制模态框的显示与隐藏
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)
  
  const [showAppOptions, setShowAppOptions] = useState(true)

  /**
   * 关闭模态框
   */
  const onModalClose = () => {
    setIsModalVisible(false)
  }

  /**
   * 重置
   */
  const onReset = () => {
    // setShowAppOptions(false)
  }

  /**
   * 添加Emoji
   */
  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  /**
   * 保存
   */
  const onSave = () => {
    alert("点击了保存")
  }

  const pickerImageAsync = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // 用户可以在 Android 和 iOS 上的选择过程中裁剪图像，但不能在 Web 上裁剪图像
      quality: 1
    })
    if(!res.canceled) {
      setSelectedImage(res.assets[0].uri)
      setShowAppOptions(true)
      console.log(`res + ::>>`, res)
    }else {
      alert("用户没有选择图片")
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer url={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker size={40} url={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <IconButton label="Reset" icon="refresh" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton label="Save" icon="save-alt" onPress={onSave} />
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="选择一张图片" theme="primary" onPress={pickerImageAsync} />
          <Button label="使用当前图片" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: "center",
    paddingHorizontal: 60
  },
})
